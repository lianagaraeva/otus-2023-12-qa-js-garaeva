import { config } from '../config'

export const deleteUser = async (userID, token) => {
  const response = await fetch(`${config.baseURL}/Account/v1/User/${userID}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return {
    headers: response.headers,
    status: response.status,
    data: response,
  }
}
