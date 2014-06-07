// ==UserScript==
// @name          Steam badges have/want BBCODE generator
// @description   This script adds a textarea with a BBCODE list of have/wants to the badge-summary page for any steam game
// @version       0.2
// @match         http://steamcommunity.com/*/gamecards/*
// ==/UserScript==

var gameTitle = document.getElementsByClassName('profile_small_header_location')[1].innerText;

var outputArea = document.createElement("textarea");
outputArea.name = "havewant";
outputArea.cols = "40";
outputArea.rows = "15";
outputArea.readOnly = true;
document.getElementsByClassName('badge_detail_tasks')[0].appendChild(outputArea);

outputArea.value += "[b]Have:[/b]\n";
printCards(gameTitle, 'owned', outputArea);
outputArea.value += "\n";
outputArea.value += "\n";
outputArea.value += "[b]Want:[/b]\n";
printCards(gameTitle, 'unowned', outputArea);

function printCards(gameTitle, className, outputArea)
{
    var cards = document.getElementsByClassName(className);
    
    var cardsList = new Array();
    for (var i = 0; i < cards.length; ++i)
    {
        var card = cards[i];
        var cardTextField = card.getElementsByClassName('badge_card_set_text')[0];
        var cardText = trim(cardTextField.innerText);
        
        // Text parsing puts the quantity at the front; we want skip it
        if (cardText[0] == '(')
        {
            cardText = cardText.split(' ').slice(1).join(' ');
        }
        
        cardsList.push(cardText);
    }
    
    var outputString = '[u]' + gameTitle + '[/u]:\n' + cardsList.join('\n');
    outputArea.value += outputString
}

function trim(str)
{
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}