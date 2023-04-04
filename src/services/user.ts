import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const baseUrl = 'http://localhost:3001/users'

interface UserFormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  age: number
  address: string
}

const create = async (newObject: UserFormData) => {
  const id = uuidv4()
  const userWithId = { id, ...newObject }
  const request = axios.post(baseUrl, userWithId)
  const response = await request
  return response.data
}

export default {
  create
}
