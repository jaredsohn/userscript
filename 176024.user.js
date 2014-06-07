// ==UserScript==
// @name       CommunityToolkitAuto
// @namespace  https://my.utest.com/u/
// @version    0.1
// @description  Automatically activate the utest community toolkit as soon as it's possible technically
// @match      https://my.utest.com/*
// @copyright  2013+, Alexander Waldmann
// ==/UserScript==

function check_and_load_toolkit(){
    if(Utest && Utest.currentUser && Utest.currentUser.id && typeof $ === "function"){
        var s=document.createElement("script");
s.src="https://www.businessmindcenter.com/ut.js?"+(new Date().getTime());
document.getElementsByTagName("head")[0].appendChild(s);
    }else{
 	setTimeout(function(){	check_and_load_toolkit(); },100);
    }
}

setTimeout(function(){	check_and_load_toolkit(); },500); // utest rarely loads faster than within 1 second... so wait until then, then start to query fast if we are ready to deploy the magic.