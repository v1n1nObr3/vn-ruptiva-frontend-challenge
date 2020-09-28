interface UserRepositories {
  name: string
  url: string
  type: 'public' | 'private'
  description: string
}

interface UserData {
  newRepository: UserRepositories
  repositories: UserRepositories[]
}

export default UserData
