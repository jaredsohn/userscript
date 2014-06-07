// ==UserScript==
// @name            Sidereel Tracker Clean-up
// @author          transce080
// @description     Remove distractions, widen Shows, add search links to Calendar
// @include         http://www.sidereel.com/tracker*
// @include         https://www.sidereel.com/tracker*
// @namespace       transcendence
// @grant           GM_addStyle
// ==/UserScript==


console.log('-----------------');
console.log('Script Loading');

// ===== CONSTANTS =====

// site title
const siteTitle = 'sidereel';

// list of annoying document elements
const annoyingElements = 
[
    '.facebooklike-header'
    , '.socialIcons'
    , '.profile-blocks'
    , '.profile-sidebar'
    , '.twitter-follow-button'
    , '.connect-buttons'
    , '.your-timezone'
    , '.global-message'
];

// list of elements to resize
const resizeElements = 
[
    '#tracked-shows'
    , '.tracked-show-main'
    , '.tracked-guide-content'
    , '.profile-showcard-wrapper'
];

// ===== GENERAL FUNCTIONS =====

function $(selector)
{
    return document.querySelectorAll(selector);
}

function RemoveElement(selector)
{
    var target = $(selector)[0];
    
    if (target != null)
    {
        target.parentNode.removeChild(target);
        console.log(' removed:\t' + selector);
    }
    else
    {
        console.log(' not found:\t' + selector);
    }
}

function ResizeElement(selector, value)
{
    GM_addStyle(selector + ' { width: ' + value + '% !important; }');
    console.log(' resized:\t' + selector);
}

function CreateLink(url, name, target)
{
    var link = document.createElement('a');
    link.setAttribute('target', target);
    link.setAttribute('href', url);
    link.appendChild(document.createTextNode(name));
    
    return link;
}

// ===== SPECIFIC FUNCTIONS =====

function CreateSearchLink(link, search, text)
{
    var linkPieces = link['href'].replace('season-', '').replace('episode-', '').split('/');
    var url = search + FormatShowName(linkPieces[3]) + '+S' + PadToTwoDigits(linkPieces[4]) + 'E' + PadToTwoDigits(linkPieces[5]);

    link.parentNode.appendChild(document.createTextNode(' '));
    link.parentNode.appendChild(CreateLink(url, text, 'searchLinks'));

    console.log(' linked:\t' + linkPieces[3]);
}

function FormatShowName(name)
{
    return name
        .replace('Special_Victims_Unit', 'SVU')
        // you may add additional common abbreviations here
        .replace('and_', '')
        .replace(/&_/gi, '')
        .replace(/_/gi, '+')
    ;
}

function PadToTwoDigits(number)
{
    return (number < 10 ? '0' : '') + number;
}

console.log('Script Executing');

// ===== SCRIPT =====

// clean up title
document.title = siteTitle;

// remove annoying elements
for (i in annoyingElements)
    RemoveElement(annoyingElements[i]);

// adjust width directly
for (i in resizeElements)
    ResizeElement(resizeElements[i], 100);

// adjust width via style
GM_addStyle('.show-name' + ' { width: 93% !important; }');

// add search links to Calendar
var links = $('.episode-title');

for (i in links)
{
    if (links[i]['href'] !== undefined)
    {
        CreateSearchLink(links[i], 'http://www.generalfiles.net/files-t/', '[D');
        CreateSearchLink(links[i], 'http://www.google.com/search?q=', 'G');
        CreateSearchLink(links[i], 'https://kickass.to/usearch/?q=', 'T]');
    }
        
}

// rename tracker header
document.querySelectorAll('div.profile-header h1')[0].textContent = "Your Tracker";

console.log('Script Ending');
console.log('-----------------');