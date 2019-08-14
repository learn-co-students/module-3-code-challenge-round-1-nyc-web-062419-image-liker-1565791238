document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");
  let images = [];

  let imageId = 3205; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  const likeBtn = document.getElementById("like_button");

  const commentForm = document.getElementById("comment_form");

  const commentSection = document.getElementById("comments");

  //load page with image
  fetch(imageURL)
    .then(res => res.json())
    .then(data => {
      images = data;
      document.getElementById("likes").innerText = images.like_count;
      document.getElementById("name").innerText = images.name;
      document.getElementById("image").src = images.url;
      images.comments.forEach(renderComments);
    });

  //event listener for clicks
  likeBtn.addEventListener("click", e => {
    ++images.like_count;
    document.getElementById("likes").innerText = images.like_count;
    postLikes(images);
  });

  //posting likes to backend
  function postLikes(images) {
    fetch(likeURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: images.id
      })
    })
      .then(res => res.json())
      .then(data => {});
  }

  //function to get most recent comment id for optimistic rendering
  function mostRecentComment(images) {
    if (images.comments.length > 0) {
      return images.comments[images.comments.length - 1];
    } else {
      return 100000;
    }
  }

  // event listener for comment submoission
  commentForm.addEventListener("submit", e => {
    e.preventDefault();
    let comment = e.target.comment.value;
    commentSection.insertAdjacentHTML(
      "afterbegin",
      `<li ${++mostRecentComment(images)
        .id}>${comment} <button>delete</button></li> `
    );
    e.target.reset();
    postComment(comment, images);
  });

  // post comments using image Arr and comment from event listner
  function postComment(comment, image) {
    fetch(commentsURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: image.id,
        content: comment
      })
    })
      .then(res => res.json())
      .then(data => {});
  }

  //function to render coments on load
  function renderComments(comment) {
    commentSection.insertAdjacentHTML(
      "afterbegin",
      `<li data-comment-id="${comment.id}">${
        comment.content
      } <button>delete</button></li> `
    );
  }

  //listener for delete click
  commentSection.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON" && e.target.innerText === "delete") {
      comment = e.target.parentElement;
      deleteComment(comment);
    }
  });

  //Delete comment on backend then removes from frontend
  function deleteComment(comment) {
    fetch(`${commentsURL}${comment.dataset.commentId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => {
        comment.remove();
      });
  }
});
