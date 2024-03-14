import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Product } from '../entities/Product';

const productRepository = AppDataSource.getRepository(Product);

// GET product detail
export const getProductDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['category', 'productImages'],
    });
    if (!product) {
      req.flash('notfound', req.t('detail.notfound'));
      res.redirect('/');
      return;
    }
    res.render('detail', { product: product });
  } catch (err) {
    console.error(err);
    next(err);
  }

};
