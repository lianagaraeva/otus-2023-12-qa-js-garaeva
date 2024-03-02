import {
  authorized,
  generateUserCredentials,
  createUser,
  generateToken,
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
    console.log('Добавленная книга', isbn)
  })
  it('Замена книги', async () => {
    const response = await replaceBook(user, isbn, isbn2)
    console.log('response - Замена книги', response)
    expect(response.status).toBe(200)
    console.log('Замененная книга', isbn2)
  })
  it('Получение информации о книге', async () => {
    const response = await getBookInfo(user, isbn)
    console.log('response - Получение информации о книге', response)
    expect(response.status).toBe(200)
  })
  it('Удаление книги', async () => {
    const response = await deleteBook(user, isbn2)
    console.log('response - Удаление книги', response)
    console.log('Удаленная книга', isbn2)
    expect(response.status).toBe(204)
  })
})
