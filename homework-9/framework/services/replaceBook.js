import { config } from '../config'

export const replaceBook = async (user, isbn, isbn2) => {
  const response = await fetch(`${config.baseURL}/BookStore/v1/Books/${isbn}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      userId: user.userID,
      isbn: isbn2,
    }),
  })
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json(),
  }
}
