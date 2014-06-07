// ==UserScript==
// @name       Google+: Hide extra boxes
// @namespace  http://www.userscripts.org/
// @version    0.2
// @description  Hides 'TRENDING ON GOOGLE+', 'YOU MIGHT LIKE', 'FUN & INTERESTING', 'PLAY A GAME', 'INVITE FRIENDS', 'Not enough friends' boxes
// @match      https://plus.google.com/*
// @copyright  2012, Paweł Sołyga
// ==/UserScript==



function hideBoxes(){
  try{
      
    // Remove "TRENDING ON GOOGLE+"
    trending = document.evaluate("//div[@componentid=13]", document,null, 9).singleNodeValue
    if(trending){
      trending.style.display = 'none'
    }
    
    // Remove "YOU MIGHT LIKE"
    mightLike = document.evaluate("//div[@componentid=33]", document, null, 9).singleNodeValue
    if(mightLike) {
      mightLike.style.display = 'none'
    }
    
    // Remove "FUN & INTERESTING"
    funInteresting = document.evaluate("//div[@componentid=34]", document, null, 9).singleNodeValue
    if(funInteresting) {
      funInteresting.style.display = 'none'
    }

    // Remove "PLAY A GAME"
    playGame = document.evaluate("//div[@componentid=10]", document, null, 9).singleNodeValue
    if(playGame) {
      playGame.style.display = 'none'
    }
      
    // Remove "INVITE FRIENDS"
    inviteFriends = document.evaluate("//div[@componentid=45]", document, null, 9).singleNodeValue
    if(inviteFriends) {
      inviteFriends.style.display = 'none'
    }
    
    // Remove "Not enough friends" (shows up if you have less than 10 friends in circles)
    notEnoughFriends = document.evaluate("//div[@class='ZNa aS']", document,null, 9).singleNodeValue
    if(notEnoughFriends){
      notEnoughFriends.style.display = 'none'
    }
  } finally{
    setTimeout(hideBoxes, 0)
  }
}
hideBoxes()