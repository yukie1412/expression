import Study from './Study';
import Review from './Review';

const Constants = {
  TITLE: 'Expression française courante',
  ROUTES: [
    {
      title: 'Study',
      link: '/study',
      component: () => <Study />
    },
    {
      title: 'Review',
      link: '/review',
      component: () => <Review />
    }
  ]
};

export default Constants;
