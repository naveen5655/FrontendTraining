const root = document.getElementById('root');

const likedTweet = document.createElement('button');
likedTweet.className = 'hidden';
likedTweet.innerHTML = 'Go to liked';

const addTweetPage = document.createElement('div');
addTweetPage.id = 'newTweetInput';
addTweetPage.classList = 'hidden';
root.append(addTweetPage);
const addTweetHeader = document.createElement('h1')
addTweetHeader.innerHTML = 'Add Tweet';
addTweetPage.append(addTweetHeader);
const addTweetTextArea = document.createElement('textarea');
addTweetTextArea.id = 'addNewTweetInput';
addTweetTextArea.rows = 5;
addTweetPage.append(addTweetTextArea);
const addTweetDivButton = document.createElement('div');
addTweetDivButton.className = 'formButtons';
addTweetPage.append(addTweetDivButton);
const buttonCancel = document.createElement('button');
buttonCancel.id = 'cancelNewTweet';
buttonCancel.innerHTML = 'Cancel';
const buttonSave = document.createElement('button');
buttonSave.id = 'saveNewTweet';
buttonSave.innerHTML = 'Save Changes';
addTweetDivButton.append(buttonCancel);
addTweetDivButton.append(buttonSave)

// LIKED TWEETS Page
const likeTweetPage = document.createElement('div');
likeTweetPage.id = 'likeTweetInput';
likeTweetPage.classList = 'hidden';
root.append(likeTweetPage);
const likeTweetHeader = document.createElement('h1')
likeTweetHeader.innerHTML = 'Liked Tweets';
likeTweetPage.append(likeTweetHeader);
const likeTweetDivButton = document.createElement('div');
likeTweetDivButton.className = 'formButtons';
likeTweetPage.append(likeTweetDivButton);
const buttonBack = document.createElement('button');
buttonBack.id = 'backPage';
buttonBack.innerHTML = 'back';
likeTweetDivButton.append(buttonBack);
const likedTweetList = document.createElement('ul');
likedTweetList.id = 'listLiked';
likeTweetPage.append(likedTweetList);

// DECLARATION PART
let uniqueId = 0;
let htmlTweetsList = '';
let tweetItem = 'listPage';
let hidden = 'hidden';
let editingTweetId = '';


const mainPage = document.getElementById('tweetItems');
const navigationButtons = document.getElementById('navigationButtons');
const tweetsList = document.querySelector('#list');
const addTweet = document.querySelector('.addTweet');
navigationButtons.append(likedTweet);

const editTweetPage = document.getElementById('modifyItem');

const cancelModification = document.querySelector('#cancelModification');
const saveModifiedItem = document.querySelector('#saveModifiedItem');

const alertMessageText = document.getElementById('alertMessageText');
const alertMessage = document.getElementById('alertMessage');
const listLiked = document.getElementById('listLiked');

const backButton = document.getElementById('backPage');
// DEFINATION PART

function generateUniqueId(){
    uniqueId += 1;
    return uniqueId;
}

function updateTweetsInList() {
    if (localStorage.getItem('savedTweets')) {
      const tweets = JSON.parse(localStorage.getItem('savedTweets'));
      let htmlParsedTweets = '';
      for(let tweet of tweets){
        htmlParsedTweets += '<li onclick="navigateToEditTweetPage(' +"'" +tweet.id +"'" + ')" class="listItem" id=' +
            tweet.id +
            '><div class="contentItem">' +
            tweet.content +
            "</div></li><div><button onclick='removeTweet(" +
            '"' +
            tweet.id +
            '"' +
            ")'>Remove</button>" +
            "<button onclick='toggleTweetLike(" +
            '"' +
            tweet.id +
            '"' +
            ")'>" +
            `${tweet.likedByThisUser ? 'Unlike' : 'Like'}` +
            '</button></div>';
      }
      console.log(htmlParsedTweets);
      tweetsList.innerHTML = htmlParsedTweets;
    }
  }
updateTweetsInList();

function addClickListenerToAllTweetItems() {
  document.querySelectorAll('#tweetItems').forEach((item) =>
    item.addEventListener('click', () => {
      console.log(item.id);
    })
  );
}
addClickListenerToAllTweetItems();

addTweet.addEventListener('click',() => {
    mainPage.classList = 'hidden';
    addTweetPage.classList.remove('hidden')
    addTweetPage.classList.add('modifyItem');
    addTweetTextArea.value = '';
});

buttonCancel.addEventListener('click',() => {
    mainPage.classList = tweetItem;
    addTweetPage.classList = hidden;
});

buttonSave.addEventListener('click',() => {
    const tweetContent = document.querySelector('#addNewTweetInput').value;
  if(tweetContent){
  const timestamp = new Date();
  const id = `${generateUniqueId()}`;
  const tweet = {
    id: id,
    content: tweetContent,
    timestamp: timestamp,
    likedByThisUser: false
  };
  const savedTweets = localStorage.getItem('savedTweets');
  if (!savedTweets) {
    localStorage.setItem('savedTweets', JSON.stringify([tweet]));
  } else {
    const tweets = JSON.parse(savedTweets);
    for (let t of tweets) {
      if (t.content === tweet.content) {
        alertMessageText.innerHTML = "Error! You can't tweet about that";
        alertMessageText.classList = 'alertMessage';
        document.getElementById('alertMessage').classList = '';
        setTimeout(() => {
          document.getElementById('alertMessage').classList = 'hidden';
        //   alertMessageText.classList = 'hidden';
        }, 2000);
        return;
      }
    }
    tweets.push(tweet);
    localStorage.setItem('savedTweets', JSON.stringify(tweets));
  }
}else{
  tweetContent.value = '';
  return;
}
    updateTweetsInList();
    mainPage.classList = tweetItem;
    addTweetPage.classList = hidden;
});

function removeTweet(id) {
  editTweetPage.classList = hidden;
  const savedTweets = JSON.parse(localStorage.getItem('savedTweets'));
  const updated = savedTweets.filter((t) => t.id !== id);
  localStorage.setItem('savedTweets', JSON.stringify(updated));
  updateTweetsInList();
}


function navigateToEditTweetPage(id) {
  editingTweetId = id;
  let content = '';
  editTweetPage.classList.remove(hidden);
  editTweetPage.classList.add('modifyItem');
  mainPage.classList = hidden;
  const savedTweets = JSON.parse(localStorage.getItem('savedTweets'));
  for(let tweet of savedTweets){
    if(tweet.id === id){
      content = tweet.content;
    }
  }
  document.querySelector('#modifyItemInput').value = content;
}

cancelModification.addEventListener('click',() => {
  mainPage.classList = tweetItem;
  editTweetPage.classList = hidden;
})

saveModifiedItem.addEventListener('click',() => {
  const newContent = document.querySelector('#modifyItemInput').value;
  const savedTweets = JSON.parse(localStorage.getItem('savedTweets'));
  savedTweets.forEach((t) => {
    if (t.id === editingTweetId) {
      t.content = newContent;
    }
  });
  localStorage.setItem('savedTweets', JSON.stringify(savedTweets));
  updateTweetsInList();
  editTweetPage.classList = hidden;
  mainPage.classList = tweetItem;
  editingTweetId = '';
})

function toggleTweetLike(id) {
  editTweetPage.classList = hidden;
  const savedTweets = JSON.parse(localStorage.getItem('savedTweets'));
  console.log(savedTweets);
  likedTweet.classList = '';
  savedTweets.forEach((t) => {
    if (t.id === id) {
      t.likedByThisUser = !t.likedByThisUser;
      alertMessageText.innerText = !t.likedByThisUser
        ? `Sorry you no longer like tweet with id ${t.id}`
        : `Hooray! You liked tweet with id ${t.id}!`;
      alertMessageText.classList = '';
      document.getElementById('alertMessage').classList = '';
      setTimeout(() => {
        document.getElementById('alertMessage').classList = hidden;
        alertMessageText.classList = hidden;
      }, 2000);
    }
  });
  localStorage.setItem('savedTweets', JSON.stringify(savedTweets));
  updateTweetsInList();
}

likedTweet.addEventListener('click',() => {
  likedTweetsList();
  mainPage.classList = hidden;
  likeTweetPage.classList = tweetItem;
})
function likedTweetsList() {
  if (localStorage.getItem('savedTweets')) {
    const tweets = JSON.parse(localStorage.getItem('savedTweets'));
    console.log('saved tweets', tweets);
    let likedhtmlParsedTweets = '';
    for(let tweet of tweets){
      if(tweet.likedByThisUser === true){
        likedhtmlParsedTweets += '<li onclick="navigateToEditTweetPage(' +"'" +tweet.id +"'" 
        + ')" class="listItem" id=' +
            tweet.id +
            '><div class="contentItem">' +
            tweet.content +
            "<button onclick='removeTweet(" +
            '"' +
            tweet.id +
            '"' +
            ")'>Remove</button>" +
            "<button onclick='toggleTweetLike(" +
            '"' +
            tweet.id +
            '"' +
            ")'>" +
            `${tweet.likedByThisUser ? 'Unlike' : 'Like'}`+
            '</button></div></li>'
      }
    }
    console.log('liked tweets',likedhtmlParsedTweets);
    likedTweetList.innerHTML = likedhtmlParsedTweets;
  }
}
backButton.addEventListener('click',() => {
  likeTweetPage.classList = hidden;
  updateTweetsInList();
  mainPage.classList = tweetItem;
})