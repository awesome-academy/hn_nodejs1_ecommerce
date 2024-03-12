import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Product } from '../entities/Product';

const productRepository = AppDataSource.getRepository(Product);

// GET product detail
export const getProductDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const product = await productRepository.findOne({
    where: { id: parseInt(req.params.id) },
    relations: ['category', 'productImages'],
  });
  if (!product) {
    req.flash('notfound', req.t('detail.notfound'));
    res.redirect('/');
    return;
  }
  res.render('detail', {product: product});
};