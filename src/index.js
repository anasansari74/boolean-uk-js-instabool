const containerEl = document.querySelector(".image-container")

// Create a single card
function createCard(imageData) {
    console.log("Inside createCard",imageData)

    const articleEl = document.createElement("article")
    articleEl.setAttribute('class','image-card')

    const h2El = document.createElement("h2")
    h2El.setAttribute('class','title')
    h2El.innerText = imageData.title

    articleEl.append(h2El)
    
    const imageEl = document.createElement("img")
    imageEl.setAttribute('src', imageData.image)
    h2El.setAttribute('class','image')

    articleEl.append(imageEl)

    const divEl = document.createElement("div")
    divEl.setAttribute('class','likes-section')

    const spanEl = document.createElement('span')
    spanEl.setAttribute('class','likes')
    spanEl.innerText = imageData.likes

    divEl.append(spanEl)

    const buttonEl = document.createElement('button')
    buttonEl.setAttribute('class','like-button')
    buttonEl.innerText = '♥'

    // Build event listener
    buttonEl.addEventListener('click', function(){
      // Step 1: Build a fetch fucntion; for like it will be a "PATCH" request
      const likes = Number(spanEl.innerText) + 1
      fetch(`http://localhost:3000/images/${imageData.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes : likes
        }),
      })
        .then(function(response){
          return response.json()
      })    
      .then(function(data){
          console.log("inside Patch request", data)
          // Step 2: Render the updates to the page
          console.log(spanEl)
          spanEl.innerText = data.likes
             
      })

    })

    divEl.append(buttonEl)

    articleEl.append(divEl)

    // <ul>
    const ulEl = document.createElement('ul')
    ulEl.setAttribute('class','comments')

    for (const comment of imageData.comments){
      const liEl = document.createElement('li')
      liEl.innerText = comment.content
      ulEl.append(liEl)
    }

    articleEl.append(ulEl)
    // console.log(ulEl)

    // <form>
    const formEl = document.createElement('form')
    formEl.setAttribute = ('class','comment-form')

    const inputEl = document.createElement('input')
    inputEl.setAttribute = ('class','comment-input')
    inputEl.setAttribute = ('type','text')
    inputEl.setAttribute = ('name','comment')
    inputEl.setAttribute = ('placeholder','Add a comment...')

    formEl.append(inputEl)

    const btnEl = document.createElement('button')
    btnEl.setAttribute = ('class','comment-button')
    btnEl.setAttribute = ('type','submit')
    btnEl.innerText = "Post"

    formEl.addEventListener("submit", function(event) {
      event.preventDefault()
      const userCommentOnPost = {
        imageId: imageData.id,
        content: inputEl.value
      }
      fetch(`http://localhost:3000/comments`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCommentOnPost),
      })
        .then(function(response){
          return response.json()
      })    
      .then(function(newDataFromServer){
          // Step 2: Render the updates to the page
          const liEl = document.createElement('li')
          liEl.innerText = newDataFromServer.content
          ulEl.append(liEl)
      })
    })

    formEl.append(btnEl)

    articleEl.append(formEl)

    containerEl.append(articleEl)
}

// createCard()

// Fetch image
function getImages(){
    fetch("http://localhost:3000/images")
        .then(function(response){
            return response.json()
        })    
        .then(function(data){
            console.log(data)
            // createCard(data[0])
            // createCard(data[1])
            for (const imageData of data){
              createCard(imageData)
            }
        })
}    
getImages()

