/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { AppDataSource } from '../config/database';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Product } from '../entities/Product';
import { generatePaginationLinks } from '../untils/pagenation';
import { PAGE_SIZE, calculateOffset } from '../untils/constants';

const cartRepository = AppDataSource.getRepository(Cart);
const cartItemRepository = AppDataSource.getRepository(CartItem);
const productRepository = AppDataSource.getRepository(Product);

const getUserCart = async (userId: number, res: Response) => {
  const cart = await cartRepository.findOne({
    where: { user: { id: userId } },
  });
  if (!cart) {
    res.redirect('/');
    return;
  }
  return cart;
};

// post add item in cart
export const postAddCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.session.user.id;
    const cart = await getUserCart(userId, res);
    const product = await productRepository.findOne({
      where: { id: parseInt(req.params.id) },
    });
    if (!product) {
      res.redirect('/');
      return;
    }
    const exsistItem = await cartItemRepository.findOne({
      where: { product: { id: parseInt(req.params.id) }, cart: { id: cart.id } },
    });
    if (exsistItem) {
      req.flash('product_exist', req.t('cart.product_exsist'));
      res.redirect('/')
      return;
    } else {
      const cartItem = new CartItem();
      cartItem.product = product;
      cartItem.cart = cart;
      cartItem.quantity = 1;
      await cartItemRepository.save(cartItem);
    }
    res.redirect('/cart/list');
  } catch (err) {
    console.error(err);
    next(err);
  }

};

// GET list item in cart
export const getListItemCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // @ts-ignore
    const userId = req.session.user.id;
    const cart = await getUserCart(userId, res);
    const page = parseInt(req.query.page as string) || 1;
    const offset = calculateOffset(page);
    const [cartItems, totalItems] = await cartItemRepository.findAndCount({
      where: { cart: { id: cart.id } },
      relations: ['product'],
      take: PAGE_SIZE,
      skip: offset,
    });
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    // Get total price
    const rawResult = await cartItemRepository
      .createQueryBuilder('cartItem')
      .select('count(cartItem.id) as items')
      .addSelect('sum(cartItem.quantity * product.price) as total')
      .leftJoin('cartItem.product', 'product')
      .where('cartItem.cartId = :cartId', { cartId: cart.id })
      .getRawOne();

    const { total, items } = rawResult;

    res.render('cart', {
      paginationItemsLinks: generatePaginationLinks(page, totalPages),
      total,
      items,
      cartItems,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }

};

export const updateListCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cartItemsData = req.body.cartItemsData;

    for (const cartItemData of cartItemsData) {
      const { cartITemId, quantity } = cartItemData;

      const cartItem = await cartItemRepository.findOne({
        where: { id: cartITemId },
      });
      if (!cartItem) {
        continue;
      }
      cartItem.quantity = quantity;
      await cartItemRepository.save(cartItem);
      res.send('');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await cartItemRepository.delete(parseInt(req.params.id));
    res.redirect('/cart/list');
  } catch (err) {
    console.error(err);
    next(err);
  }

};
