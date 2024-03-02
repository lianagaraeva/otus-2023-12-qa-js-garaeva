import { config } from '../config'

export const getBookInfo = async (user, isbn) => {
  const response = await fetch(
    `${config.baseURL}/BookStore/v1/Book?ISBN=${isbn}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json(),
  }
}
