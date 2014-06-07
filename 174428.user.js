// ==UserScript==
// @name       Steam: Card drops remaining
// @version    0.1
// @description  Get the number of card drops remaining, along with which games they drop from.
// @include         http*://steamcommunity.com/id/*/badges*
// @include         http*://steamcommunity.com/id/*/gamecards*
// @copyright  2013+, Jon Rush
// ==/UserScript==
/*
 * Don't judge me... I never use javascript and haven't cleaned this code up yet.
 */

var badgesHeader = document.getElementsByClassName('profile_badges_header')[0];

if (CheckDom(badgesHeader)) {
    ShowSteamBadges();
}


function ShowSteamBadges() {
    var progressInfo = document.getElementsByClassName('badge_row is_link');
    
    var length = progressInfo.length,
        cardDropsElement = null,
        cardTitleElement = null,
        badgesInfoArray = new Array();

    
    for (var i = 0; i < length; i++) {
        if (!CheckDom(progressInfo[i])) {
            continue;
        }
        
        //Make sure it's a badge we haven't gotten first.
        badgesRowOverlay = progressInfo[i].getElementsByClassName('badge_row_overlay')[0];
        if (badgesRowOverlay.href.indexOf("gamecards") === -1) {
            continue;
        }
            
        cardDropsElement = progressInfo[i].getElementsByClassName('progress_info_bold')[0];
        cardTitleElement = progressInfo[i].getElementsByClassName('badge_title')[0];
        
        if (!CheckDom(cardDropsElement) || !CheckDom(cardTitleElement)) {
            continue;
        }
        
        cardDropsElementString = (cardDropsElement.innerText || cardDropsElement.textContent).trim();
        cardTitleElementString = (cardTitleElement.innerText || cardTitleElement.textContent).replace("View details","").trim();
        
        //If it contains the text.
        if (cardDropsElementString.indexOf("No card drops") === -1 && cardDropsElementString.indexOf("card drop") !== -1) {
            var tmpObj = new Object();
            tmpObj.name = cardTitleElementString;
            tmpObj.cards = parseInt(cardDropsElementString, 10);
            badgesInfoArray.push(tmpObj);
        }
    }
    
    var divText = "";
    
    var arrThirds = Math.ceil(badgesInfoArray.length / 3);
    var arraySets = [];
    
    if (badgesInfoArray.length >= 3) {
        while (badgesInfoArray.length) {
            arraySets.push(badgesInfoArray.splice(0, arrThirds));
		}
    } else {
        arraySets[0] = badgesInfoArray;
    }
    
    divText = '<table style="line-height: 1.4em;""><tr style="margin: 0 auto; padding: 0px; vertical-align: top;">';
    for (k = 0; k < arraySets.length; k++) {
        var badgesLength = arraySets[k].length;
        divText += '<td>';
        //List design from: http://devsnippets.com/article/styling-your-lists.html
        divText += '<dl style="padding: 0.5em; line-height: 1.5em; width: 285px; overflow: hidden;">';
        for (u = 0; u < badgesLength; u++) {
            divText += '<dt style="text-align: left; font-weight: bold; color: green;">' + arraySets[k][u].name + ':</dt>';
            divText += '<dd style="margin: 0 0 0 40px; padding: 0;">' + arraySets[k][u].cards + ' card drops remaining.</dd>'
        }
        divText += "</dl>";
        divText += '</td>';
    }
    divText += '</tr></table>';
    
    //Thanks to Atreus for this.
    var extraPanel = document.createElement('div');
    extraPanel.innerHTML = divText;
    extraPanel.setAttribute('id', 'badgesInfoText');
    extraPanel.setAttribute('class', 'profile_xp_block');
    badgesHeader.appendChild(extraPanel);
}

//From http://stackoverflow.com/questions/1418050/string-strip-for-javascript
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

//From http://stackoverflow.com/questions/4754088/how-to-check-if-object-is-a-dom-element
function CheckDom(o) {
    if (o !== undefined) {
    	return (o.nodeName ? "true" : "false" );
    } else {
        return false;
    }
}