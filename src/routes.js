import NewGamePage from './components/pages/NewGamePage';
import NotFoundPage from './components/pages/NotFoundPage';
import StartPage from './components/pages/StartPage';

export default [
  {
    path: '/',
    component: StartPage,
  },
  {
    path: '/jogos/novo',
    component: NewGamePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
