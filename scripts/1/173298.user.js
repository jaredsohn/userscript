// ==UserScript==
// @name          Steam Trading Cards Summary
// @description   This script inserts a summary of your owned and unowned cards at the top of each badge page for easy copy-and-pasting.
// @version       0.2
// @match         http*://steamcommunity.com/*/gamecards/*
// ==/UserScript==

var gameTitle = document.getElementsByClassName('profile_small_header_location')[1].innerText;

var summaryBox = createSummaryBox()
   
summaryBox.innerHTML += '<p>Owned:</p>';
summaryBox.innerHTML += '<p style=\"padding-left: 20px; padding-right: 20px;\">' + gameTitle + ': ' + getCards('owned') + '</p>';
summaryBox.innerHTML += '<p>Unowned:</p>';
summaryBox.innerHTML += '<p style=\"padding-left: 20px; padding-right: 20px;\">' + gameTitle + ': ' + getCards('unowned') + '</p>';

function createSummaryBox(str)
{
    var summaryContainer = document.createElement('div');
    summaryContainer.className = 'badge_detail_tasks';
    summaryContainer.style.paddingTop = "14px";
    summaryContainer.style.paddingBottom = "14px";
    
    var summaryBox = document.createElement('div');
    summaryBox.className = 'badge_card_to_collect_header';
    //summaryBox.className = 'badge_friends_have_earned_label';
    
    summaryBox.style.fontFamily='\"Courier New\", Courier, monospace'
    summaryBox.style.marginRight = "20px";
    summaryBox.style.marginLeft = "20px";
    
    summaryContainer.appendChild(summaryBox);

    document.getElementsByClassName('badge_row_inner')[0].insertBefore(summaryContainer, document.getElementsByClassName('badge_detail_tasks')[0])
    
    return summaryBox;
}

function getCards(className)
{
    var cards = document.getElementsByClassName(className);
    
    var cardsList = new Array();
    for (var i = 0; i < cards.length; ++i)
    {
        var card = cards[i];
        var cardName = trim(card.getElementsByClassName('badge_card_set_text')[0].innerText);
        
        if (className == 'owned')
        {
            // The card quantity is included at the front of the card name parsing puts the quantity at the front; we want it at the back.
            var splitCardName = cardName.split(' ');
            // Remove the quantity from the beginning of the card name.
            var cardQuantity = splitCardName.shift();
            // Strip non-numeric characters from the quantity.
            cardQuantity = cardQuantity.replace(/\D/g,'');
            // Convert quantity to an integer.
            cardQuantity = parseInt(cardQuantity, 10)
            
            if (cardQuantity > 1)
            {
                splitCardName.push('(' + cardQuantity + 'x)');
            }
            cardName = splitCardName.join(' ');
        }
        
        cardsList.push(cardName);
    }
    
    var outputString = cardsList.join(', ');
    return outputString;
}

function trim(str)
{
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}