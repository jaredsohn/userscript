// ==UserScript==
// @name           Word Highlighter
// @namespace      http://zeb.fuhost.net
// @include        http://*
// @description    Highlight a predefined list of words on any webpage
// ==/UserScript==

// Change the "wordcount" variable to reflect the exact number of words
// in your list:

var wordcount = 3

var word = new Array(wordcount)
var color = new Array(wordcount)

// Edit the list of word/color combinations below. Words are not case
// sensitive. Colors can be either standard labels (red, green, etc.)
// or HEX values (#FF000, #0000FF, etc.) If adding words that might
// also be HTML tags (script, table, etc.), put a space before them:

word[0] = "GreaseMonkey"
color[0] = "#FF0000"

word[1] = " script"
color[1] = "green"

word[2] = "highlight"
color[2] = "blue"

// The code below does the actual highlighting:

var body = document.body.innerHTML
var i = 0

for (i = 0; i < (word.length); i++) {

	var w = new RegExp( word[i], "gi" )
	var body = body.replace(w, "<font color='" + color[i] +"'>"+ word[i] + "</font>")

}

document.body.innerHTML = body


