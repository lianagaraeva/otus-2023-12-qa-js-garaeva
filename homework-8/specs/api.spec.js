import {
  authorized,
  generateUserCredentials,
  createUser,
  getUserInfo,
  deleteUser,
  generateToken,
} from '../framework'
describe('API tests', () => {
  let user, token

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

  it('Получение информации о пользователе', async () => {
    console.log('Пользователь', user)
    const response = await getUserInfo(user.userID, token)
    console.log('Получение информации о пользователе', response)
    // NOTE: Ожидаемый результат: response.status = 200
    expect(response.status).toBe(200)
    expect(response.data).toBeTruthy()
    expect(response.data.username).toBe(user.userName)
    expect(response.data.userId).toBe(user.userID)
    expect(response.data.books).toBeTruthy()
  })

  it('Удаление пользователя', async () => {
    const response = await deleteUser(user.userID, token)
    console.log('Удаление пользователя', response)
    expect(response.status).toBe(204)
    const responseInfo = await getUserInfo(user.userID)
    console.log('responseInfo ', responseInfo)
    expect(responseInfo.status).toBe(401)
    expect(responseInfo.data.message).toBe('User not found!')
  })
})
