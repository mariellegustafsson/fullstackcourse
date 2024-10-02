
const dummy = (blogs) => {
    return 1
  }

const totalLikes = (list) => {
    let total = 0
    list.map(doc => total += doc.likes ||0)
    return total
    }

  module.exports = {
    dummy, totalLikes
  }