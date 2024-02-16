import { config } from '../config'

export const deleteUser = async (userID) => {
  const response = await fetch(`${config.baseURL}/Account/v1/User/${userID}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json(),
  }
}
