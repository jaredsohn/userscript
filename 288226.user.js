// ==UserScript==
// @name         Trello Tweaks
// @namespace    http://www.stormpoopersmith.com/
// @version      1.0
// @description  Various useful tweaks for Trello - show card numbers, highlight cards, flatten and disable visual effects, etc.
// @match        https://trello.com/*
// @match        https://*.trello.com/*
// @copyright    2013+, Daniel Smith
// @grant        GM_addStyle
// @require      https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_log
// @grant        GM_registerMenuCommand
// ==/UserScript==

// use custom getElementsByClassName if there is no native implementation
function getElementsByClassName(node,classname) {
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(classname);
    } else {
        return (function getElementsByClass(searchClass,node) {
            if ( node == null ) {
                node = document;
            }
            var classElements = [],
                els = node.getElementsByTagName("*"),
                elsLen = els.length,
                pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;
            
            for (i = 0, j = 0; i < elsLen; i++) {
                if ( pattern.test(els[i].className) ) {
                    classElements[j] = els[i];
                    j++;
                }
            }
            return classElements;
        })(classname, node);
    }
}

GM_config.init(
    {
        'id': 'GM_config',
        'title': 'Trello Tweaks',
        'fields':
        {
            'ShowCardNumbers':
            {
                'label': 'Show card numbers',
                'type': 'checkbox',
                'default': true
            },
            'ColourCards':
            {
                'label': 'Highlight cards with the colour of the first label',
                'type': 'checkbox',
                'default': true
            },
            'BackgroundEnabled':
            {
                'label': 'Enable background images',
                'type': 'checkbox',
                'default': true
            },
            'Flatten':
            {
                'label': 'Flatten elements (quicker loading)',
                'type': 'checkbox',
                'default': true
            },
            'DisableEffects':
            {
                'label': 'Disable visual effects (quicker loading)',
                'type': 'checkbox',
                'default': false
            }
        },
        'css': '\
#GM_config * {font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;}\
#GM_config{padding: 0px; margin: 0px; background-color: #f0f0f0; color: #393939;}\
#GM_config_header{background-color: #27709b; color: #fff; font-size: 18px; font-weight: bold; padding: 10px}\
#GM_config_buttons_holder, .config_var{padding: 5px;}\
#GM_config .field_label, input[type="checkbox"], input[type="button"] {font-weight: normal; cursor: pointer; }\
#GM_config .saveclose_buttons {background: linear-gradient(to bottom, #fff 0, #f3f3f3 100%); border: 1px solid #cecece; border-bottom-color: #a0a0a0; font-weight: bold; height: 30px; max-width: 250px; margin: 0px 0px 0px 5px;}\
#GM_config .saveclose_buttons:hover {background: linear-gradient(to bottom, #318ec4 0, #2b7cab 100%); border-color: #2e85b8; color: #fff;}\
'});

var accountSettingsLink = null;//getElementsByClassName(document, 'js-account');
if(accountSettingsLink != null) {
    var list = accountSettingsLink.parentNode;
    console.log(list);
    var settingsLink = document.createElement('a');
    settingsLink.innerText = "Trello Tweaks";
    settingsLink.onclick = "GM_config.open()";
    var settingsListItem = document.createElement('li');
    settingsListItem.appendChild(settingsLink);
    list.appendItem(settingsListItem);
}

GM_registerMenuCommand("Trello Tweaks: Settings", function() {GM_config.open();});

if(GM_config.get('Flatten')) {
    GM_addStyle ( "\
* {\
border-radius: 0 !important;\
box-shadow: none !important;\
text-shadow: none !important;\
}\
");
}

if(document.body.getAttribute("style").indexOf("background-image: url(") != -1 && GM_config.get('BackgroundEnabled'))
{    
    GM_addStyle ( "\
#header, #header-search, .header-btn {\
background: rgba(0,0,0,0.80) !important;\
}\
#board-header {\
background: rgba(0,0,0,0.50) !important;\
}\
#board {\
background: transparent !important;\
background-color: #27709b;\
}\
");
}

if(GM_config.get('DisableEffects'))
{    
    GM_addStyle ( "\
.progress-current {\
background-image: none !important;\
background-color: #2b7cab !important;\
}\
.button-link {\
background-image: none !important;\
background-color: #fff !important;\
}\
.button-link:hover {\
background-color: #2b7cab !important;\
}\
input[type='button'], input[type='submit'] {\
background-image: none !important;\
background-color: #cfcfcf !important;\
}\
input[type='button']:hover, input[type='submit']:hover {\
background-image: none !important;\
background-color: #c2c2c2 !important;\
}\
input[type='button'].primary, input[type='submit'].primary {\
background-image: none !important;\
background-color: #24a828 !important;\
}\
input[type='button'].primary:hover, input[type='submit'].primary:hover {\
background-image: none !important;\
background-color: #1b7e1e !important;\
}\
thead {\
background-image: none !important;\
background-color: #f3f3f3 !important;\
}");
}

if(GM_config.get('ShowCardNumbers'))
{    
    GM_addStyle ( "\
.card-short-id {\
display: inline-block !important;\
padding: 2px !important;\
margin-right: 5px !important;\
font-size: 12px !important;\
font-weight: bold !important;\
}");
}

function updateCards() {
    var cards = [].slice.call(document.getElementsByClassName('list-card'));
    cards.forEach(function(card) {
        var cardLabel = card.firstChild.firstChild;
        var badgeTexts = [].slice.call(card.getElementsByClassName('badge-text'));
        var badgeIcons = [].slice.call(card.getElementsByClassName('badge-icon'));
        if(cardLabel != null && GM_config.get('ColourCards')) {
            var cardColour = window.getComputedStyle(cardLabel).backgroundColor.replace('rgb', 'rgba').replace(')', ',0.50)');
            card.style.backgroundColor = cardColour;
            cardLabel.style.color = cardColour;
            badgeTexts.forEach(function(badgeText) {badgeText.style.color = '#000';});
            badgeIcons.forEach(function(badgeIcon) {badgeIcon.style.color = '#000';});
        }
        else {
            card.style.backgroundColor = '#fff';
            badgeTexts.forEach(function(badgeText) {badgeText.style.color = '#b3b3b3';});
            badgeIcons.forEach(function(badgeIcon) {badgeIcon.style.color = '#b3b3b3';});
        }
    });
}

$(document).ready(function(){
    updateCards();
    $(document).ajaxSuccess(function(e, xhr, opt) {
        updateCards();
    });
});