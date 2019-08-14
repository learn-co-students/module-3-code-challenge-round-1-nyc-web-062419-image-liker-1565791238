document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
//  have to get the place for the title image
  let imageId = 3203 //Enter the id from the fetched image here
// didnt undertstand where to get the info from at First
// was trying to grab elements by id and append them on the class but it didnt appear
// source image and gave id
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function getImages(){
    fetch(imageURL)
    .then(data => data.json())
    .then(json => renderPage(json))
  }

  function renderPage(json){
    const getName = document.getElementById('image_card')

    // const  makeContainer
    json.forEach(prop => {
      const getName = document.getElementById('image_card')
    // const createImage = document.createElement('img')
    // createImage.src = `${prop.url}`
    // getName.append(createImage)
    const createName = document.getElementById("name")
    createName.innerHTML = prop.name
    getName.append(createName)

    const getImage = document.getElementById('image')
    getImage.id = prop.id
    getImage.src = `${prop.url}`
    getName.append(getImage)

    const getNumberLikes = document.getElementById('likes')
    getNumberLikes.innerHTML = prop.like_count
    getNumberLikes.addEventListener('click', (e) => {
      let numberLikes =console.log(e.target)
      debugger
    })
    getName.append(getNumberLikes)

    const getLike = document.getElementById('likes')
    const createLi = document.createElement('li')
    createLi.innerHTML = prop.comments
    getLike.append(createLi)


})

}

// const image = (prop)=>{
//   `<div id="image_card" class="card col-md-4">
//       <img src="" id="image" data-id=""/>
//       <h4 id="name">`${prop.name}`</h4>
//       <span>Likes:
//         <span id="likes">Likes Go Here</span>
//       </span>
//       <button id="like_button">Like</button>
//       <form id="comment_form">
//         <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
//         <input type="submit" value="Submit"/>
//       </form>
//       <ul id="comments">
//            <!-- <li> for each comment goes here -->
//       </ul>
//     </div>`
// }
getImages()
})
