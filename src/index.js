document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3199 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.getElementById("image_card")
  const form = document.getElementById("comment_form")
  const comments = document.getElementById("comments")
  const likeButton = document.getElementById("like_button")
  const likes = document.getElementById("likes")

  ////get fetch //////////////
  fetch(`${imageURL}`)
  .then(response => response.json())
  .then(data => {
    debugger
    renderImage(data)
    likeImage(data)
  })

/////// render image/////////////
  function renderImage(data){
    imageCard.insertAdjacentHTML("beforeend", `
      <img src="${data.url}" id="image" data-id="${data.id}"/>
      <h4 id="name">${data.name}</h4>
      <span>Likes:
        <span id="likes">${data.like_count}</span>
      </span>
      <button id="${data.id}">Like</button>
      <form id="comment_form">
        <input id="comment_input" type="text" name="${data.comments}" placeholder="Add Comment"/>
        <input type="submit" value="Submit"/>
      </form>
      <ul id="comments">
      </ul>
      `)
    }
  
    ////// comment form ////////////

    form.addEventListener("submit", (e)=> {
        e.preventDefault()
        console.log("its working") // its not working!
        createComment(e.target)
      })
      
    function createComment(form) {
      return fetch(`${commentsURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({name: form.name.value }) // could not get the form to cooperate
      })
      .then(response => response.json())
      .then(image => {
        comments.insertAdjacentHTML("beforeend", `
        <li>${image.comments}</li>
        `)
        })
    }
    
    //// Like Image Function
    function likeImage(data){
      likeButton.addEventListener("click", (e) => {
        likes.innerText = `${data.like_count}`+1
          return fetch(`${likeURL}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              imageId: `${imageId}`,
              content: likes
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
      })
    }
    
    
    ///// The page was acting extremely strange on me-
    ////// for some reason my page is not responding well to what i am trying to implement :(
    
    ///// I am getting duplicate information on the page
    
    ///// The top counter will increment by 1 but will not persist or go beyond 1
    ///// The comment box will post but as undefined and will not persist

})
