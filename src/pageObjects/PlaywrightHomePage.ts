import { type Locator, type Page } from '@playwright/test';

export class PlaywrightHomePage {
  readonly page: Page;
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async open() {
    await this.page.goto('https://playwright.dev/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openGettingStarted() {
    await this.getStartedLink.click();
  }

  heading(name: string) {
    return this.page.getByRole('heading', { name });
  }
}
