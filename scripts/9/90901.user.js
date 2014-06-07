// =======[ La-Noire Post Wrapper]==================
// Created by nerner from a script orignially made by Edmachine
// helped by Gangsta Killa
// This script allows LANoire forum users to have Post
// Wrappers without server side interaction. Meaning, that
// you can have post wrappers without slowing the servers
// down, which was one of the causes why Post Wrappers were
// taken down in the first place.
// If you spot a bug, please PM me on http://www.la-noire.net/forums
// If you want to change something, PM me on http://www.la-noire.net/forums/index.php
// If you see someone else claiming to be the author
//  of this script, tell me and I'll see what I can do.
// (!) Will only work if there is no text in the textarea 
// once the page loads.
// =======[ TUTORIAL ]=====================================    
// Hello!
//
// Thank you for installing this Greasemonkey script. In
// this tutorial I will show you how this script works and
// how to make your own post wrapper. So, let's start!
// This script works by adding tags according to your
// preference to the text area when posting. The script
// also works with the fast-reply box.
// Now that you know that, I'll show you how to make your
// own Post Wrapper. First, decide what you want your Post
// Wrapper to be. Do you want it to be bold and green, and 
// in Arial? Simply change the BOLD value to 1 and COLOUR 
// value to "green" or, if you prefer HEX, 00FF00. Change
// FONT to Arial, and that's it.
// What? You want it to say "Cheers, Tom." at the bottom
// of your post? In that case change Post_wrapper to
// "Cheers, Tom.". If you want to add a new line before
// your signature, add "\n" to it, making it "\nCheers, 
// Tom.". Hmm, so you want it to be outside the Post
// Wrapper? Well, go down and find this:
// "// Post_wrapper = Post_wrapper + "";"
// And change it to this:
// "Post_wrapper = Post_wrapepr + "\nCheers, Tom.";"
// That will put the signature after the BBCode.
// Don't mix this signature with your GTAF signature,
// though.
// (New in 0.9) You can also choose if you want to have
// more colours and/or sizes in the respective dropdown
// menus. Simply change the values for variables
// ADD_MORE_COLOURS and ADD_MORE_SIZES to either 0 to
// disable or 1 to enable.
//
// ==UserScript==
// @name           LA Noire Post Wrapper
// @namespace      Josh/nerner but originally by Edmachine
// @description    A post wrapper script for the LA Noire forums
// @include        http://www.la-noire.net/forums/
// @include        http://www.la-noire.net/forums/*
// ==/UserScript==
// BB Codes - set value to 0 to disable.
var BOLD = 0;
var ITALIC = 0;
var U_LINE = 0;
var STRIKE = 0;
var FONT = "0";		// Must be in quotes!
var SIZE = 4;		// Default value 1 | Can't be set lower than -2 or higher than 4
var COLOUR = "0";	// Must be in quotes!
var JUSTIFY = 0;        // Justifies the text using the align function.   
var ADD_MORE_COLOURS = 1;
var ADD_MORE_SIZES = 1;
var Post_wrapper = "";
// DO NOT CHANGE BEYOND THIS POINT
if(COLOUR != 0 && COLOUR.length >= 3) {
	Post_wrapper = "[color=" + COLOUR + "]" + Post_wrapper + "[/color]";
}
if(FONT != 0) {
	Post_wrapper = "[font=" + FONT + "]" + Post_wrapper + "[/font]";
}
if(SIZE <= 4 && SIZE >= -2 && SIZE != 1) {
	Post_wrapper = "[size=" + SIZE + "]" + Post_wrapper + "[/size]";
}
if(BOLD == 1) {
	Post_wrapper = "[b]" + Post_wrapper + "[/b]";
}
if(ITALIC == 1) {
	Post_wrapper = "[i]" + Post_wrapper + "[/i]";
}
if(U_LINE == 1) {
	Post_wrapper = "[u]" + Post_wrapper + "[/u]";
}
if(STRIKE == 1) {
	Post_wrapper = "[s]" + Post_wrapper + "[/s]";
}
if(JUSTIFY == 1) {
	Post_wrapper = "[align=justify]" + Post_wrapper + "[/align]";
}
// EXCEPT HERE
// Post_wrapper = Post_wrapper + "";
// BUT DO NOT CHANGE AFTER THIS
function getURLParameter(name) { // Made by lobo235 at Netlobo.com
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null ) {
		return "";
	} else {
		return results[1];
	}
}
var textareas = document.getElementsByTagName("textarea");
var gup_act = getURLParameter("act");
if(textareas[0] != null && gup_act != "Msg" && gup_act != "report" && gup_act != "UserCP") {
	if(textareas[0].value.length == 0) {
		textareas[0].value = Post_wrapper;
	}
}

if(gup_act == "Post") {
	if(textareas[0].value.length == 0) {
		textareas[0].value = Post_wrapper;
	}
} else if(gup_act == "Msg") {
	textareas[0].value += Post_wrapper;
}
if((gup_act == "Post" || gup_act == "Msg") || textareas[0] != null) {
	if(ADD_MORE_COLOURS == 1) {
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: black;\" value=\"black\">Black</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: brown;\" value=\"brown\">Brown</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: cyan;\" value=\"cyan\">Cyan</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: indigo;\" value=\"indigo\">Indigo</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: lime;\" value=\"lime\">Lime</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: magenta;\" value=\"magenta\">Magenta</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: maroon;\" value=\"maroon\">Maroon</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: pink;\" value=\"pink\">Pink</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: silver;\" value=\"silver\">Silver</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: tan;\" value=\"tan\">Tan</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: violet;\" value=\"violet\">Violet</option>";
		document.getElementsByName("fcolor")[0].innerHTML += "<option style=\"color: white;\" value=\"white\">White</option>";
	}
	if(ADD_MORE_SIZES == 1) {
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"0\">----</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"-6\">-6</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"-5\">-5</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"-4\">-4</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"-3\">-3</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"-2\">-2</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"-1\">-1</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"0\">0</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"1\">1</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"2\">2</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"3\">3</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"4\">4</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"5\">5</option>";
		document.getElementsByName("fsize")[0].innerHTML += "<option value=\"6\">6</option>";
	}
}