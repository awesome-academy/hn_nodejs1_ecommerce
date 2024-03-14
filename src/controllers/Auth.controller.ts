/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';
import { AppDataSource } from '../config/database';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import i18next from 'i18next';
import { checkPassword, hashPassword, decodeJWT } from '../untils/auth';
import { Cart } from '../entities/Cart';

const userRepository = AppDataSource.getRepository(User);
const cartRepository = AppDataSource.getRepository(Cart);

// POST register
export const postRegister = [
  body('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage(() => i18next.t('register.passwordLengthError')),
  body('confirmPassword')
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(i18next.t('register.passwordMismatchError'));
      }
      return true;
    }),
  body('email')
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage(() => i18next.t('register.invalidEmailError')),
  body('fullName')
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage(() => i18next.t('register.fullNameLengthError')),
  asyncHandler(async (req: Request, res: Response,
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('register', {
        errors: errors.array(),
      });
      return;
    }

    const { fullName, password, email } = req.body;

    try {
      const user = await userRepository.findOne({
        where: { email: email },
      });
      if (user) {
        req.flash('existed', i18next.t('register.existed'));
        res.redirect('/auth/register')
      }
      const hashedPassword = await hashPassword(password);
      const newUser = new User();
      newUser.password = hashedPassword;
      newUser.email = email;
      newUser.fullName = fullName;
      newUser.role = 1;
      await userRepository.save(newUser);

      const cart = new Cart();
      cart.user = newUser;
      await cartRepository.save(cart);

      res.redirect('/auth/login');
    } catch (error) {
      console.error(error);
    }
  }),
];

// POST Login
export const postLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await userRepository.findOne({
        where: { email: email },
      });

      if (!user) {
        req.flash('notfound', req.t('login.notfound'));
        res.redirect('/auth/login');
        return;
      }

      const isMatch = await checkPassword(password, user.password);
      if (!isMatch) {
        req.flash('error', req.t('login.error'));
        res.redirect('/auth/login')
        return;
      }

      // const token = await generateToken(user.id);
      // res.cookie('token', token, { httpOnly: true });
      // @ts-ignore
      req.session.user = user;
      res.redirect('/');
    } catch (err) {
      console.error(err);
      next(err);
    }

  }
);

// GET Logout
export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Xóa cookie chứa JWT
    // res.clearCookie('token');
    res.clearCookie('connect.sid');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// GET register
export const getRegister = asyncHandler(
  async (req: Request, res: Response) => {
    res.render('register');
  },
);

// GET login
export const getLogin = asyncHandler(
  async (req: Request, res: Response) => {
    res.render('login', {
      flash: {
        notfound: req.flash('notfound'),
        error: req.flash('error'),
      }
    });
  },
);

// Middleware để xác thực và phân quyền JWT
export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;
  if (!token) {
    req.flash('error', i18next.t('login.notLogin'));
  }
  try {
    const decoded = await decodeJWT(token);
    if (decoded) {
      next();
    }
  } catch (error) {
    console.error(error.message);
    req.flash('error', i18next.t('login.invalid'));
  }
};
