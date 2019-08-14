let imageId = 3196 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imageCardContainer = document.querySelector(".container")


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  fetchImage()
})

function fetchImage() {
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(resp => resp.json())
    .then(image => renderImage(image))
}

function renderImage(image) {
  imageCardContainer.innerText = ""
  imageCardContainer.insertAdjacentHTML("beforeend",
    `<div id="image_card" class="card col-md-4">
    <img src=${image.url} id=${image.id} data-id=${image.id}/>
    <h4 id="name">${image.name}</h4>
    <span id="counter">${image.like_count}</span>
    <button id="like_button">Like</button>
    <form id="comment_form">
    <input id="comment_input" type="text" name="comment" placeholder="Add Comment" />
    <input type="submit" value="Submit"/></form>
    <ul id="comments"></ul></div>`)
  const commentContainer = document.getElementById("comments")
  image.comments.forEach(comment => {
    commentContainer.insertAdjacentHTML("beforeend",
      `<li id=${comment.id}>${comment.content}<button class="delete-btn">X</button></li>`)
  })


  const likeButton = document.getElementById("like_button")
  likeButton.addEventListener("click", function (e) {
    let likeCount = counter.innerText++
    fetch(`https://randopic.herokuapp.com/likes/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ image_id: imageId, like_count: likeCount })
    })
  })

  const commentFormContainer = document.getElementById("comment_form")


  commentFormContainer.addEventListener("submit", function (e) {
    e.preventDefault()
    addComment(e.target)
  })


  function addComment(contents) {
    commentContainer.insertAdjacentHTML("beforeend", `<li id=${comment.id}>${comment.content}<button class="delete-btn">X</button></li>`)
    fetch('https://randopic.herokuapp.com/comments', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ image_id: imageId, content: contents.comment.value })
    })
    contents.reset()

  }
}







// postData('http://example.com/answer', { answer: 42 })
//   .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
//   .catch(error => console.error(error));

// function postData(url = '', data = {}) {
//   // Default options are marked with *
//   return fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, cors, *same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrer: 'no-referrer', // no-referrer, *client
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   })
//     .then(response => response.json()); // parses JSON response into native JavaScript objects 
// }


// {
//   "id": 1,
//   "url": "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg",
//   "name": "The Internet!",
//   "like_count": 0,
//   "comments": [
//     {
//       "id": 5941,
//       "content": "first comment!",
//       "image_id": 1158,
//       "created_at": "2018-10-18T17:06:14.859Z",
//       "updated_at": "2018-10-18T17:06:14.859Z"
//     }
//   ]
// }