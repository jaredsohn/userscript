// ==UserScript==
// @name        test
// @namespace   test
// @include     *plug.dj/*/*
// @version     1
// ==/UserScript==

window.onload = function(){
        window.document.body.onload = doThis();
    };

function doThis() {
	setTimeout(setUp,4000);
}

function callback(user){
API.sendChat(""+user.username+"Welcome to HardStyle Heaven!!!Like Hardstyle?And this Room? like us:https://www.facebook.com/HardstylePlugdj");
}

function setUp(){
   API.addEventListener(API.USER_JOIN, callback);
}
