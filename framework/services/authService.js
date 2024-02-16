import { config } from '../config'

export const authorized = async ({ userName, password }) => {
  const response = await fetch(`${config.baseURL}/Account/v1/Authorized`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password }),
  })
  return {
    headers: response.headers,
    status: response.status,
    data: await response.json(),
  }
}
