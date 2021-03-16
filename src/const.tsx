import Study from './Study';
import Review from './Review';

const Constants = {
  TITLE: 'Expression française courante',
  ROUTES: [
    {
      title: 'Study',
      link: '/expression/study',
      component: () => <Study />
    },
    {
      title: 'Review',
      link: '/expression/review',
      component: () => <Review />
    }
  ]
};

export default Constants;
