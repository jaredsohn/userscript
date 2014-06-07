// ==UserScript==
// @name        AkimboKittenz Like All Comments
// @description Like All The Comments On A Facebook Post
// @match       http://www.facebook.com/*
// @include     http://www.facebook.com/*
// @version     1.0
// @author      AkimboKittenz
// ==/UserScript==
/*
    I Like Everything
    Author: Feross Aboukhadijeh
    Read more: http://www.feross.org/like-everything-on-facebook/
*/

var sad = document.getElementsByTagName('button'),
    happy = [],
    halt = false;
    
// Select only the Like buttons.
// Convert the sad NodeList to a happy Array.
for (var i = 0; i < sad.length; i++) {
    if (sad[i] && (sad[i].title == 'Like this comment' || sad[i].title == 'Like this item')) {
        happy.push(sad[i]);
    }
}

var happyDiv = document.createElement('div');
happyDiv.innerHTML = '<div id=\'happy\' style=\'background-color:#ddd;font-size:16px;text-align:center;position:fixed;top:40px;right:40px;width:200px;height:100px;border:4px solid black;z-index:9999;padding-top:15px;\'><span>0</span> of '+happy.length+' items liked.<div id=\'happyStatus\' style=\'margin-top:30px;\'><a id=\'happyButton\' href=\'#\' style=\'display:block;\' onclick=\'haltFn();\'>Stop it.</a></div></div>';
document.getElementsByTagName('body')[0].appendChild(happyDiv);

function happyFn(happy) {
    if (halt || !happy || !happy.length) {
        document.getElementById('happyStatus').innerHTML = 'Done!';
        return;
    }
    happy[0].click();
    happy[0].style.color='#FF0000';
    var countSpan = document.querySelector('#happy span');
    countSpan.innerHTML = parseInt(countSpan.innerHTML) + 1;
    
    // Wait for each Like to be processed before trying the next.
    // Facebook enforces this requirement.
    window.setTimeout(function() {
        happyFn(happy.splice(1));
    }, 800);
}

function haltFn() {
    halt = true;
    return false; // prevent default event
}

happyFn(happy);