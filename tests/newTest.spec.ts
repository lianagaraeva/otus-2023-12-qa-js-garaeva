import { test, expect } from '@playwright/test'

test.describe('Auth test cases', async () => {
  //   test('Check login', async ({ page }) => {
  //     await page.goto('https://demoqa.com/login')
  //     await page.locator('input[id=userName]').fill('Myrtice21')
  //     await page.locator('input[id=password]').fill('test12345')
  //     // await page.locator('button[id=login]').click()
  //     // await expect(page.locator('#userForm')).toBeVisible()
  //     await expect(page).toHaveScreenshot('loginPage.png')
})

test('Check profile', async ({ page }) => {
  await page.goto('https://demoqa.com/profile')
  await expect(page.locator('#userName-value')).toBeVisible()
})
