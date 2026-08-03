import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/PageObjects/LoginPage';
import { InventoryPage } from '../src/PageObjects/InventoryPage';
import { CartPage } from '../src/PageObjects/CartPage';

test.describe('SauceDemo E2E Suite', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
  });

  test('standard_user -Successful login with valid credentials', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.assertPageLoaded();
  });

    test('standard_user - login with invalid credentials', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.assertErrorMessage("Epic sadface: Username and password do not match any user in this service");
  });

  test('Failed login shows error message', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Add product to cart and verify in cart page', async () => {
    const itemToAdd = 'Sauce Labs Backpack';
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCartByName(itemToAdd);
    await inventoryPage.assertCartCount(1);
    await inventoryPage.goToCart();
    await cartPage.assertItemInCart(itemToAdd);
  });

  test('Remove product from cart and verify in cart page', async () => {
    const itemToAdd = 'Sauce Labs Backpack';
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCartByName(itemToAdd);
    await inventoryPage.assertCartCount(1);
    await inventoryPage.goToCart();
    await cartPage.assertItemInCart(itemToAdd);
    await cartPage.removeButton.click();    
    await expect(cartPage.cartItems.filter({ hasText: itemToAdd })).toHaveCount(0);
  });

  test('standard_user - Logout', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.assertPageLoaded();
    await inventoryPage.openmenu();   
    await inventoryPage.logoutLink.click();
    await loginPage.assertPageLoaded();
  });

});