
const dummy = (blogs) => {
    return 1
  }

const totalLikes = (list) => {
    let total = 0
    list.map(doc => total += doc.likes ||0)
    return total
    }

const favoriteBlog = (list) => {
  let max = 0
  list.forEach(obj => {
    if (obj.likes > max) {
        maxObject = obj
        max = obj.likes
    }
})

    delete maxObject.__v
    delete maxObject._id
    delete maxObject.url
  
    return maxObject 
}

  module.exports = {
    dummy, totalLikes, favoriteBlog
  }