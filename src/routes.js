import GamesNewPage from './components/pages/GamesNewPage';
import NotFoundPage from './components/pages/NotFoundPage';
import StartPage from './components/pages/StartPage';
import TemplatesDownloadPage from './components/pages/TemplatesDownloadPage';

export default [
  {
    path: '/',
    component: StartPage,
  },
  {
    path: '/games/new',
    component: GamesNewPage,
  },
  {
    path: '/templates/download',
    component: TemplatesDownloadPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
