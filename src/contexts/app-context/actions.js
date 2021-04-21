export const UPDATE_STATUS = 'UPDATE_STATUS'
export const UPDATE_USER = 'UPDATE_USER'

export default (dispatch) => ({
  updateStatus: (status = 0) => {
    dispatch({
      type: UPDATE_STATUS,
      status,
    })
  },
  updateUser: (user = {}) => {
    dispatch({
      type: UPDATE_USER,
      user,
    })
  },
})
