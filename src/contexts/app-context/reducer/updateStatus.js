const updateStatus = (state, { status = 0 } = {}) => {
  return { ...state, status }
}

export default updateStatus
