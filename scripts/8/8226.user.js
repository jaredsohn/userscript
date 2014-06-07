// Google Groups random sig
// 
// by ironcladlou
// Code liberally borrowed from snop.com's Slashdot Random Sig script, then thrown up against the wall I was banging my head on
//
// ==UserScript==
// @name          Google Groups sig
// @description	  Appends a random signature when posting to Google Groups. You need to edit the script to put in your own signatures!
// @include       http://groups.google.com/group/*/post
// @include       http://groups.google.com/group/*/browse_thread/thread*
// @include       https://groups.google.com/group/*/post
// @include       https://groups.google.com/group/*/browse_thread/thread*
// ==/UserScript==

var NewPost = document.getElementById("body");

// The signature list

var mySig = [
			"Add your signatures here!", 
			"When you want to type a double-quote use \" instead",
			"You can create new lines here if you want",
			"but make sure that the last line",
			"HAS NO COMMA!"
	    ];

// Replace my name with yours here

var username = "ironcladlou";

// The format of the sig

var Sig = "\n\n--\n" + username + "\n" + mySig[Math.round(Math.random()*(mySig.length-1))];

// Insert the signature into a new post

NewPost.value = NewPost.value + Sig;

function insertSig(){
var Reply = document.getElementById("cmp_body");
Reply.value = Reply.value + Sig;
}


function loaded() {
if (document.getElementById("cmp_body") !== null){
insertSig();
}
else {
window.setTimeout(loaded(),100);
}
}


window.onload = loaded();