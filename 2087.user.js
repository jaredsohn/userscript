// ==UserScript==
// @name          Delicious Duplicate Monster II
// @description   Removes all duplicate links on del.icio.us 
// @include       http://del.icio.us/*
// ==/UserScript==

var list_elements = document.getElementsByTagName('li');
var keys = "";

for(var i = 0; i < list_elements.length; i++) {
  if(list_elements[i].className.match(/post/)){

    // get the key of the posts
    var post_key = list_elements[i].getAttribute('key'); 

    //check to see if key has not been seen before, if not, add to keys
    if(keys.indexOf(post_key) == -1){
      keys += post_key;     
    }
    
    //if key has been seen before, hide post
    else{
      list_elements[i].style.display = "none";
    }
  }
}