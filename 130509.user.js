// ==UserScript==
// @name           HobbyKing Order Colors
// @namespace      http://www.multitralhas.net
// @description    Apply colors into order itens
// @include http://www.hobbyking.com/*
// @include http://hobbyking.com/*
// @include https://www.hobbyking.com/*
// @include https://hobbyking.com/*
// @include http://www1.hobbyking.com/*
// @include https://www1.hobbyking.com/*
// @include http://www2.hobbyking.com/*
// @include https://www2.hobbyking.com/* 
// ==/UserScript==


// Change the "wordcount" variable to reflect the exact number of words
// in your list:
var wordcount = 4

var word = new Array(wordcount)
var color = new Array(wordcount)
var style = new Array(wordcount)

// Edit the list of word/color combinations below. Words are not case
// sensitive. Colors can be either standard labels (red, green, etc.)
// or HEX values (#FF000, #0000FF, etc.) If adding words that might
// also be HTML tags (script, table, etc.), put a space before them:

word[0] = "Reserved"
color[0] = "green"

word[1] = "Unreserved"
color[1] = "red"

word[2] = "Backorder"
color[2] = "orange"

word[3] = "JIT-item"
color[3] = "blue"


// The code below does the actual highlighting:

var body = document.body.innerHTML
var i = 0

for (i = 0; i < (word.length); i++) {

	var w = new RegExp( word[i], "g" )
	var body = body.replace(w, "<font color='" + color[i] +"'><b>" + word[i] + "</b></font>")

}

document.body.innerHTML = body