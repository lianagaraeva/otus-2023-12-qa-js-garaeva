import { config } from '../config'

export const deleteBook = async (user, isbn2) => {
  const response = await fetch(`${config.baseURL}/BookStore/v1/Book`, {
    method: 'DELETE',
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
  }
}
