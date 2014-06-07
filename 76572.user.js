// ==UserScript==
// @name           Card Whisperer
// @namespace      http://www.userscripts.org/angelans
// @include        http://www.conquerclub.com/game.php*
// ==/UserScript==

function getColor(span) {
    var color = getColorName(span.className);
   
    if(span.parentNode.nodeName == 'B')
        color = color.toUpperCase();
       
    return "(" + color + ")";
}

function getColorName(className) {
    if(className == 'card0')
        return 'red';
    else if(className == 'card1')
        return 'green';
    else if(className == 'card2')
        return 'blue';
    else
        return '';
}

function whisper() {
    var cards = cardContainer.getElementsByTagName("span");
    var whisperCards = new Array();

    for (var cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        whisperCards[cardIndex] = " " + cards[cardIndex].innerHTML + " " + getColor(cards[cardIndex]);
    }
    
    var whisperText = "** CARDS:" + whisperCards + ".";
     document.getElementById('message').value = whisperText;
     document.getElementById('team').checked = true;
     document.getElementById('submit2').click();
}

var whisperButton = document.createElement('button');
whisperButton.innerHTML = "Whisper";
whisperButton.id = "whisperButton";

var cardContainer = document.getElementById("cards");

if (cardContainer != null) {
    if (cardContainer.innerHTML.length > 0) {
        cardContainer.appendChild(whisperButton);
        whisperButton.addEventListener("click", whisper, false);
    }
}

function addButton() { 
    if (cardContainer.getElementsByTagName("span").length > 0) {
        document.getElementById("cards").appendChild(whisperButton);
    } 
}

cardContainer.addEventListener("DOMSubtreeModified", addButton, false);