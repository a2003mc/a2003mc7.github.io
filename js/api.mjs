if (!localStorage.getItem("gallery")) {
    localStorage.setItem("gallery", JSON.stringify({ next: 0, images:[], comments:[]}));
  }






/*  ******* Data types *******
    image objects must have at least the following attributes:
        - (String) imageId 
        - (String) title
        - (String) author
        - (String) url
        - (Date) date

    comment objects must have the following attributes
        - (String) commentId
        - (String) imageId
        - (String) author
        - (String) content
        - (Date) date

****************************** */


// add an image to the gallery
export function addImage(title, author, url) {
    const gallery = JSON.parse(localStorage.getItem("gallery"));
    const image = { id: gallery.next++, title: title, author:author, url:url };
    gallery.images.push(image);
    localStorage.setItem("gallery", JSON.stringify(gallery));
}

// delete an image from the gallery given its imageId
export function deleteImage(imageId) {
    const gallery = JSON.parse(localStorage.getItem("gallery"));
    const index = gallery.images.findIndex(function (image) {
      return image.id == imageId;
    });
    if (index == -1) return null;
    const image = gallery.images[index];
    gallery.images.splice(index, 1);
    gallery.comments = gallery.comments.filter(function (comment) {
      return comment.imageId !== imageId;
    });

    localStorage.setItem("gallery", JSON.stringify(gallery));
}

// add a comment to an image
export function addComment(imageId, author, content) {
    const gallery = JSON.parse(localStorage.getItem("gallery"));
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const comment = { id: gallery.next++, imageId: imageId, author:author, content:content, date:today};
    gallery.comments.push(comment);
    localStorage.setItem("gallery", JSON.stringify(gallery));
}

// delete a comment to an image
export function deleteComment(commentId) {
  const gallery = JSON.parse(localStorage.getItem("gallery")); // Use 'gallery' instead of 'talk'
  
  if (!gallery) return null; // Handle the case when 'gallery' is not found in local storage

  const index = gallery.comments.findIndex(function (comment) {
    return comment.id == commentId; // Fix the typo 'conmment' to 'comment'
  });

  if (index == -1) return null;

  gallery.comments.splice(index, 1);
  localStorage.setItem("gallery", JSON.stringify(gallery));
}


export function getImages() {
    const gallery = JSON.parse(localStorage.getItem("gallery"));
    console.log(gallery);
    return gallery.images;
    // return gallery;
  }


  export function getComments() {
    const gallery = JSON.parse(localStorage.getItem("gallery"));
    return gallery.comments;
  }

  // Define the prev function
export function previous(currentIndex, array) {
  if (currentIndex <= 0) {
    // If currentIndex is at the first element or below, wrap around to the last element
    return array.length - 1;
  } else {
    // Otherwise, just go to the previous element
    return currentIndex - 1;
  }
}

// Define the next function
export function next(currentIndex, array) {
  if (currentIndex >= array.length - 1) {
    // If currentIndex is at the last element or above, wrap around to the first element
    return 0;
  } else {
    // Otherwise, just go to the next element
    return currentIndex + 1;
  }
}

