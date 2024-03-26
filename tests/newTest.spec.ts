import { test, expect } from '@playwright/test'
test.describe('Взаимодействие с таблицей книг', async () => {
  test('Отображение таблицы и книг на странице 1', async ({ page }) => {
    await page.goto('https://demoqa.com/profile')
    await expect(page.locator('.ReactTable')).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: 'Image' })
    ).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: 'Title' })
    ).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: 'Author' })
    ).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: 'Publisher' })
    ).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: 'Action' })
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible()
    await expect(page.locator('.-pageInfo')).toBeVisible()
    await expect(page.locator('[id="see-book-Git Pocket Guide"]')).toBeVisible()
    await expect(
      page.locator('[id="see-book-Learning JavaScript Design Patterns"]')
    ).toBeVisible()
    await expect(
      page.locator('[id="see-book-Designing Evolvable Web APIs with ASP.NET"]')
    ).toBeVisible()
    await expect(
      page.locator('[id="see-book-Speaking JavaScript"]')
    ).toBeVisible()
    await expect(
      page.locator(`[id="see-book-You Don't Know JS"]`)
    ).toBeVisible()
  })

  test('Переход на следующую и предыдущую страницу', async ({ page }) => {
    await page.goto('https://demoqa.com/profile')
    const pageNumber = page.locator('input[type=number]')
    await expect(pageNumber).toHaveValue(/[1]/)
    await page.getByRole('button', { name: 'Next' }).click()
    await expect(pageNumber).toHaveValue(/[2]/)
    await page.getByRole('button', { name: 'Previous' }).click()
    await expect(pageNumber).toHaveValue(/[1]/)
  })

  test('Изменение количества отображаемых строк в таблице', async ({
    page,
  }) => {
    await page.goto('https://demoqa.com/profile')
    const list1 = page.locator('.mr-2')
    await expect(list1).toHaveCount(5)
    await page.selectOption('[aria-label="rows per page"]', '10 rows')
    const list2 = page.locator('.mr-2')
    await expect(list2).toHaveCount(8)
  })

  test('Поиск книги по названию', async ({ page }) => {
    await page.goto('https://demoqa.com/profile')
    await expect(page.locator('#searchBox')).toBeVisible()
    await page.locator('input[id=searchBox]').fill('know js')
    await expect(
      page.locator(`[id="see-book-You Don't Know JS"]`)
    ).toBeVisible()
    const list = page.locator('.mr-2')
    await expect(list).toHaveCount(1)
  })

  test('Сортировка книг по столбцу Автор', async ({ page }) => {
    await page.goto('https://demoqa.com/profile')
    await expect(page.locator('.-sort-asc')).not.toBeVisible()
    await page.getByRole('columnheader', { name: 'Author' }).click()
    await expect(page.locator('.-sort-asc')).toBeVisible()
    await expect(
      page.getByRole('gridcell', { name: 'Addy Osmani' })
    ).toBeVisible()
    await expect(
      page.getByRole('gridcell', { name: 'Axel Rauschmayer' })
    ).toBeVisible()
    await expect(
      page.getByRole('gridcell', { name: 'Eric Elliott' })
    ).toBeVisible()
    await expect(
      page.getByRole('gridcell', { name: 'Glenn Block et al.' })
    ).toBeVisible()
    await expect(
      page.getByRole('gridcell', { name: 'Kyle Simpson' })
    ).toBeVisible()
  })
})
