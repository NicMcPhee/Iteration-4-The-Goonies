import {AppPage} from './app.po';

describe('Iteration 4', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should load', () => {
    page.navigateTo();
  });
});
