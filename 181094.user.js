// ==UserScript==
// @name remove ㅋ at twitter
// @namespace Kjwon15
// @description remove ㅋ in twitter
// @include http://twitter.com/*
// @include https://twitter.com/*
// ==/UserScript==

removeFunc = function(event){
    var pattern = /ㅋ/g;
    var count = 0;
    var tweets = document.querySelectorAll("p.tweet-text");
    for(var i=0; i<tweets.length; i++){
        count += (tweets[i].innerHTML.match(pattern)||[]).length;
        tweets[i].innerHTML = tweets[i].innerHTML.replace(pattern, '');
    };
    if(count > 0){
        //alert('removed ' + count + ' ㅋs');
    }
    event.preventDefault();
    return false;
}
 
window.addEventListener('load', removeFunc, false);
 
var li = document.createElement('li');
var button = document.createElement('a');
button.id = 'kuchen';
button.href = "/";
button.innerHTML = '<span class="text">remove</span>';
button.className = "js-nav";
button.onclick = removeFunc;
li.appendChild(button);
document.querySelector('ul#global-actions').appendChild(li);
