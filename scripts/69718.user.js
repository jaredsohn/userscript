// ==UserScript==
// @name           Card Whisper
// @namespace      Card Whisper
// @include        http://www.conquerclub.com/*
// ==/UserScript==

//Hmm, I feel like creating a button, hehe!
var button = document.createElement('button');
button.innerHTML = "Whisper";
button.id = "button"

//A thing I'm going to be using a lot will be the element of the cardcounter, so let's use a variable for it!
var cards = document.getElementById("cards");

//Sweet! Let's add it to the cards! But only if the number of cards is greater than 0 (No need to post having 0 cards!)
if (cards.getElementsByTagName("span").length > 0) {
document.getElementById("cards").appendChild(button);
}

//Okay so when the button is clicked, we want my script to gogo!
document.getElementById('button').addEventListener("click", gogo, false);

//But, what is gogo anyway?
function gogo() 
{
//cardSpans will put all of the card-elements in an array so I can use ".length" to count them for instance, and also to see what kind of colour they are with ".className", which I will:
var cardSpans = cards.getElementsByTagName("span");
var colors = new Array();
var territories = new Array();
var message = new Array();

//The following loop will make sure that we get the classNames of the individual cards, and add them together in an Array.
for(var cardnumber = 0;cardnumber<cardSpans.length;cardnumber++) {colors[cardnumber]=cardSpans[cardnumber].className;
//Next, still inside the loop, we will go through each of the elements in the array, and translate the className (which, in CC, is either card0, card1, or card2) to the colours they describe:
if (colors[cardnumber]=="card0") {colors[cardnumber]="(red)"}
if (colors[cardnumber]=="card1") {colors[cardnumber]="(green)"}
if (colors[cardnumber]=="card2") {colors[cardnumber]="(blue)"}

//Now all we have to do is tell the script what exactly he needs to send in chat!
//First, let's make the colors of the cards in our array go UPPERCASE if we own them, by checking if conquerclub displays them bold:
if (cardSpans[cardnumber].parentNode.nodeName == "B") {colors[cardnumber]=colors[cardnumber].toUpperCase()}

//Now, still looping, let's go through the names of territories on the cards, and put them in an array!
territories[cardnumber]=cardSpans[cardnumber].innerHTML

//Now let's put the array of the territories and the numbers together!
message[cardnumber]=" "+territories[cardnumber]+" "+colors[cardnumber]}

//And fill out the form using variable 'x' as the thing we want to write:
 var x = "*"+message+"."
 document.getElementById('message').value = x;
 document.getElementById('team').checked = "checked";
 document.getElementById('submit2').click();
 document.getElementById('team').checked = oldcheck
} //This is the end of function gogo!

//This is a trick to fix the button disappearing when doing an action on the page.
function x() { if (cards.getElementsByTagName("span").length > 0) {
document.getElementById("cards").appendChild(button)} };
cards.addEventListener("DOMSubtreeModified", x, false);