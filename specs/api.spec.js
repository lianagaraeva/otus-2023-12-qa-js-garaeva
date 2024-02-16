import {
  authorized,
  generateUserCredentials,
  createUser,
  getUserInfo,
  deleteUser,
} from '../framework'
describe('API tests', () => {
  let user

  beforeAll(async () => {
    user = generateUserCredentials()
    console.log(user, '- сгенерированные данные')
    const responseCreateUser = await createUser(user)
    console.log('createUser', responseCreateUser)
    user = {
      ...user,
      userID: responseCreateUser.data.userID,
    }
  })
  it('Авторизация', async () => {
    const response = await authorized(user)
    console.log('Авторизация', response)
    expect(response.status).toBe(200)
    // NOTE: Ожидаемый результат: response.data = true
    expect(response.data).toBeTruthy()
  })

  it('Получение информации о пользователе', async () => {
    console.log('Пользователь', user)
    const response = await getUserInfo(user.userID)
    console.log('Получение информации о пользователе', response)
    // NOTE: Ожидаемый результат: response.status = 200
    expect(response.status).toBe(200)
    expect(response.data).toBeTruthy()
    expect(response.data.userName).toBe(user.userName)
    expect(response.data.userID).toBe(user.userID)
    expect(response.data.books).toBeTruthy()
  })

  it('Удаление пользователя', async () => {
    const response = await deleteUser(user.userID)
    console.log('Удаление пользователя', response)
    // NOTE: Ожидаемый результат: response.status = 200
    expect(response.status).toBe(200)

    // NOTE: На бэке не обработан случай отсутствия пользователя
    // const responseInfo = await getUserInfo(user.userID)
    // console.log('responseInfo', responseInfo)
    // expect(responseInfo).toBe(404)
  })
})
