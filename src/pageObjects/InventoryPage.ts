import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menu = page.locator('[id="react-burger-menu-btn"]');
    this.logoutLink = page.locator('[id="logout_sidebar_link"]');
  }

  async addItemToCartByName(itemName: string) {
    // Converts "Sauce Labs Backpack" -> "add-to-cart-sauce-labs-backpack"
    const formattedId = itemName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="add-to-cart-${formattedId}"]`).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async assertPageLoaded() {
    await expect(this.title).toHaveText('Products');
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }

  async assertCartCount(expectedCount: number) {
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
  }

  async openmenu() {
    await this.menu.click();
  }

}