document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = `https://randopic.herokuapp.com/images/3198` //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imageCard = document.querySelector("#image_card")



  getImage()


  function getImage() {
    fetch(`${imageId}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        imageCard.insertAdjacentHTML("beforebegin", `
        <div id="image_card" class="card col-md-4">
          <img src=${data.url} id=${data.id} data-id=${data.id}/>
          <h4 id="name">${data.name}</h4>
        </div>
        `)
      })
  }
  imageCard.addEventListener("click", function (event) {
    console.log(event.target.parentNode)



    // let likes = parseInt(event.target.parentNode.likes_count)
    // likes += 1
    // fetch('https://randopic.herokuapp.com/likes', {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json"
    //     },
    //     body: JSON.stringify({
    //       image: image.dataset.dataId,
    //     })
    //   })
    //   .then(resp => resp.json())
    //   .then(json => {
    //     console.log(json)
    //   })
  })


})
