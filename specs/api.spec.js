import {
  authorized,
  generateUserCredentials,
  createUser,
  generateToken,
  getUserInfo,
  addBook,
  replaceBook,
  getBookInfo,
  deleteBook,
} from '../framework'
import { books } from '../framework/fixtures/books.json'

describe('Books', () => {
  let user, token
  const [book1, book2] = books
  const isbn = book1.isbn
  const isbn2 = book2.isbn
  console.log('isbn book1', isbn)
  console.log('isbn book2', isbn2)

  beforeAll(async () => {
    user = generateUserCredentials()
    console.log(user, '- сгенерированные данные')
    const responseCreateUser = await createUser(user)
    console.log('createUser', responseCreateUser)
    const responseToken = await generateToken(user)
    token = responseToken.data.token
    user = {
      ...user,
      userID: responseCreateUser.data.userID,
      token,
    }
    const response = await authorized(user)
    console.log('Авторизация', response)
    expect(response.status).toBe(200)
    expect(response.data).toBeTruthy()
  })

  it('Добавление книги', async () => {
    const response = await addBook(user, isbn)
    console.log('response - Добавление книги', response)
    expect(response.status).toBe(201)
    console.log('Добавленная книга', response.data)
    expect(response.data.books[0]).toEqual({ isbn })
    // Проверяем, что у пользователя есть добавленная книга
    const responseGetUserInfo = await getUserInfo(user.userID, token)
    console.log('Получение информации о пользователе', responseGetUserInfo)
    expect(responseGetUserInfo.data.books[0].isbn).toEqual(isbn)
  })

  it('Замена книги', async () => {
    const response = await replaceBook(user, isbn, isbn2)
    console.log('response - Замена книги', response)
    expect(response.status).toBe(200)
    console.log('Замененная книга', response.data.books[0].isbn)
    // Проверяем, что бэк вернул измененный isbn в response
    expect(response.data.books[0].isbn).toEqual(isbn2)
    // проверка, что у пользователя в списке книг изменилась книга
    const responseGetUserInfo = await getUserInfo(user.userID, token)
    expect(responseGetUserInfo.data.books[0].isbn).toEqual(isbn2)
  })

  it('Получение информации о книге', async () => {
    const response = await getBookInfo(user, isbn)
    console.log('response - Получение информации о книге', response)
    expect(response.status).toBe(200)
    expect(typeof response.data).toBe('object') // Проверяем, что это объект
    expect(response.data).toBeTruthy() // Проверяем, что бэк вернул не пустой объект
    // Проверяем, что в объекте есть isbn
    expect(response.data).toHaveProperty('isbn')
    // Проверяем, что запрашиваемый isbn === полученному isbn в объекте
    expect(response.data.isbn).toBe(isbn)
    // Проверяем, что все поля в объекте есть
    expect(response.data).toHaveProperty('title')
    expect(response.data).toHaveProperty('subTitle')
    expect(response.data).toHaveProperty('author')
    expect(response.data).toHaveProperty('publish_date')
    expect(response.data).toHaveProperty('publisher')
    expect(response.data).toHaveProperty('pages')
    expect(response.data).toHaveProperty('description')
    expect(response.data).toHaveProperty('website')
  })

  it('Удаление книги', async () => {
    const response = await deleteBook(user, isbn2)
    console.log('response - Удаление книги', response)
    expect(response.status).toBe(204)
    // Проверяем, что у пользователя в списке книг отсутствует указанная книга
    const responseGetUserInfo = await getUserInfo(user.userID, token)
    expect(
      responseGetUserInfo.data.books.find((obj) => obj.isbn === isbn2)
    ).toBeFalsy()
  })
})
