import {
  addImage,
  deleteImage,
  addComment,
  previous,
  next,
  getImages,
  getComments,
  deleteComment,
} from "./api.mjs";

//dom elements
const showButton = document.getElementById("show");
const addImageForm = document.getElementById("add_image_form");
const imageDiv = document.querySelector("#image");
const commentsDiv = document.querySelector("#comments");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const deleteButton = document.querySelector("#delete");
const addImageFormElement = document.getElementById("add_image_form");
const createCommentFormElement = document.getElementById("create_comment_form");
const moveUpButton = document.getElementById("moveUpButton");
const moveDownButton = document.getElementById("moveDownButton");


let currentImageIndex = 0
let index1=0;


// Event listeners
showButton.addEventListener("click", toggleImageForm);
previousButton.addEventListener("click", handlePrevious);
nextButton.addEventListener("click", handleNext);
deleteButton.addEventListener("click", handleDelete);
addImageFormElement.addEventListener("submit", handleAddImage);
createCommentFormElement.addEventListener("submit", handleAddComment);
moveUpButton.addEventListener("click", moveCommentUp);
moveDownButton.addEventListener("click", moveCommentDown);

updateGallery()



function updateGallery(){
  const images = getImages()
  const comments = getComments()
  let index=getComments().length

  if (index1<0&&index+index1>=10)
    index=index+index1
  else {
    index1=0
  }

  console.log(index,index1)
  clearGallery()
  
  if(images.length === 0){
    const p = document.createElement("p");
    p.innerText = "No Image";
    p.style.color = "white";
    imageDiv.appendChild(p);
  }else{
    const currentImage = images[currentImageIndex]
    if(currentImage){
      
      const imagetitle = document.createElement("div");
      imagetitle.className = "image-item";
      const imageItem = document.createElement("img")
      imageItem.src = currentImage.url
      imageItem.alt = currentImage.title
      imageItem.style.height = '300px'
      imageDiv.appendChild(imageItem)

      

      let count=0

      comments.slice(0,index).reverse().forEach((comment) => {
        if (comment.imageId === currentImage.id && count<10) {
          const commentItem = document.createElement("div");
          commentItem.className = "comment";
          commentItem.innerHTML = `
            <div class="comment_user">
              <div class="comment_username">${comment.author}</div>
            </div>
            <div class="comment_content">${comment.content}</div>
            <div class="date">${comment.date}</div>
            <button class="comment-delete" data-comment-id="${comment.id}">delete</button>
          `;
          commentsDiv.appendChild(commentItem);

          const deleteCommentButton = commentItem.querySelector(".comment-delete");
          deleteCommentButton.addEventListener("click", () => {
            const commentIdToDelete = deleteCommentButton.getAttribute("data-comment-id");
            deleteComment(commentIdToDelete);
            commentItem.remove(); // Remove the comment element
            count--;
            updateGallery();
          });
        } 
        
        count++
      });
      
    }
  }
}



function handleAddImage(e) {
  e.preventDefault();
  const username = document.getElementById("post_name").value;
  const title = document.getElementById("post_title").value;
  const url = document.getElementById("post_url").value;
  document.getElementById("add_image_form").reset();
  addImage(username, title, url);
  updateGallery();
}

function handleAddComment(e){
  e.preventDefault()
  const author = document.getElementById("comment_name").value;
  const content = document.getElementById("post_content").value;
  const images = getImages();
  document.getElementById("create_comment_form").reset();
  addComment(images[currentImageIndex].id, author, content);
  updateGallery();
}

function handleNext(e){
  e.preventDefault();
  currentImageIndex = next(currentImageIndex, getImages());
  updateGallery();
}

function handlePrevious(e) {
  e.preventDefault();
  currentImageIndex = previous(currentImageIndex, getImages());
  updateGallery();
}

function handleDelete(e) {
  e.preventDefault();
  const images = getImages();
  deleteImage(images[currentImageIndex].id);
  updateGallery();
}



function toggleImageForm() {
  addImageForm.style.display = addImageForm.style.display === "flex" ? "none" : "flex";
}

function clearGallery(){
  imageDiv.innerHTML = ""
  commentsDiv.innerHTML = ""
}



function moveCommentUp() {
  
    index1++;
  updateGallery();
}

function moveCommentDown() {
    index1--;
  updateGallery();
}






