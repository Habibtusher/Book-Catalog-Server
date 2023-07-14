import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { BookRoutes } from '../modules/book/book.routes';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
];
moduleRoutes.map(route => {
  router.use(route.path, route.route);
});

export default router;
