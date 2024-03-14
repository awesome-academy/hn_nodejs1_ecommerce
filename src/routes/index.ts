import express from 'express';
import authRouter from './auth.route';
import productRouter from './product.route'
import cartRouter from './cart.route'
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Product } from '../entities/Product';
import { generatePaginationLinks } from '../untils/pagenation'
import { PAGE_SIZE, calculateOffset } from '../untils/constants';

const productRepository = AppDataSource.getRepository(Product);
const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const page = parseInt(req.query.page as string) || 1;
    const offset = calculateOffset(page);
    const [products, total] = await productRepository.findAndCount({
      take: PAGE_SIZE,
      skip: offset
    });
    const totalPages = Math.ceil(total / PAGE_SIZE);
  
    res.render('home', {
      product: products,
      totalPages: totalPages,
      currentPage: page,
      paginationLinks: generatePaginationLinks(page, totalPages),
      flash: {
        notfound: req.flash('notfound'),
        product_exist: req.flash('product_exist'),
      }
    });
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.use('/cart', cartRouter)
router.use('/product', productRouter)
router.use('/auth', authRouter);

export default router;
