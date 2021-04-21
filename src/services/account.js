export const loginService = (username, password) => {
  return {
    method: 'post',
    url: '/login',
    data: {
      username,
      password,
    },
  }
}
