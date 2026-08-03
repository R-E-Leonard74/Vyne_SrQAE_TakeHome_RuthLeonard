import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButton = page.locator('[class="btn btn_secondary btn_small cart_button"]');
    
  }

  async assertItemInCart(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    await expect(item).toBeVisible();
  }

    async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
