import { config } from '../config'

export const addBook = async (user, isbn) => {
  console.log('user, isbn', user, isbn)
  const response = await fetch(`${config.baseURL}/BookStore/v1/Books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      userId: user.userID,
      collectionOfIsbns: [
        {
          isbn: isbn,
        },
      ],
    }),
  })
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json(),
  }
}
