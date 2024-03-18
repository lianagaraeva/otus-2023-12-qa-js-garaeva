import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://demoqa.com/login')
  await page.locator('input[id=userName]').fill('test1603')
  await page.locator('input[id=password]').fill('test1603Pas$')
  await page.locator('button[id=login]').click()
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://demoqa.com/profile')
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.locator('#userName-value')).toBeVisible()

  // End of authentication steps.

  await page.context().storageState({ path: authFile })
})
