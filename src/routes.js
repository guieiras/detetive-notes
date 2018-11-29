import DraftsNewPage from './components/pages/DraftsNewPage';
import GamesCurrentPage from './components/pages/GamesCurrentPage';
import GamesLoadPage from './components/pages/GamesLoadPage';
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
    path: '/games/current',
    component: GamesCurrentPage,
  },
  {
    path: '/games/load',
    component: GamesLoadPage,
  },
  {
    path: '/games/new',
    component: GamesNewPage,
  },
  {
    path: '/templates/:id/new',
    component: DraftsNewPage,
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
