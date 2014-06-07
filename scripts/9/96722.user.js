// ==UserScript==
// @name           Discogs Extractor
// @namespace      http://userscripts.org/users/52197
// @author         darkip
// @version        1.0
// @description    Adds a button which generates a formatted string containing a release's information
// @include        http*://www.discogs.com/*/release/*
// ==/UserScript==

// BEGIN CONFIGURATION
var formatStr = '%artist% - %year% - %release% [%label% %catalog%]';
// END CONFIGURATION

function findMainDiv() {
    divs = document.getElementById('page').getElementsByTagName('div');
    
    for (divId in divs) {
        if (divs[divId].className == 'profile') {
            return divs[divId];
        }
    }
}

function getHeader(mainDiv) {
    return mainDiv.getElementsByTagName('h1')[0];
}

function extractArtist(mainDiv) {
    return getHeader(mainDiv).getElementsByTagName('a')[0].textContent;
}

function extractRelease(mainDiv) {
    return getHeader(mainDiv).getElementsByTagName('a')[0].nextSibling.textContent.replace(/\s*?-\s*/, '');
}

function extractInfoDiv(mainDiv, name) {
    divs = mainDiv.getElementsByTagName('div');
    
    labelDiv = null;
    
    for (divID in divs) {
        if (divs[divID].textContent == name) {
            labelDiv = divs[divID];
            break;
        }
    }
    
    if (labelDiv == null) {
        return null;
    } else {
        return labelDiv.nextSibling.textContent;
    }
}

function extractCatalog(mainDiv) {
    return extractInfoDiv(mainDiv, 'Catalog#:');
}

function extractYear(mainDiv) {
    if ((yearStr = extractInfoDiv(mainDiv, 'Released:')) == null) {
        return null;
    } else {
        return yearStr.substr(yearStr.length - 4);
    }
}

function extractLabel(mainDiv) {
    return extractInfoDiv(mainDiv, 'Label:');
}

function buildString() {
    mainDiv = findMainDiv();
    
    outputStr = formatStr;
    
    if ((tempStr = extractArtist(mainDiv)) != null) {
        outputStr = outputStr.replace(/%artist%/ig, tempStr);
    } else {
        outputStr = outputStr.replace(/[^%]*%artist%[^%]*/ig, '');
    }
    
    if ((tempStr = extractYear(mainDiv)) != null) {
        outputStr = outputStr.replace(/%year%/ig, tempStr);
    } else {
        outputStr = outputStr.replace(/[^%]*%year%[^%]*/ig, '');
    }
    
    if ((tempStr = extractRelease(mainDiv)) != null) {
        outputStr = outputStr.replace(/%release%/ig, tempStr);
    } else {
        outputStr = outputStr.replace(/[^%]*%release%[^%]*/ig, '');
    }
    
    if ((tempStr = extractLabel(mainDiv)) != null) {
        outputStr = outputStr.replace(/%label%/ig, tempStr);
    } else {
        outputStr = outputStr.replace(/[^%]*%label%[^%]*/ig, '');
    }
    
    if ((tempStr = extractCatalog(mainDiv)) != null) {
        outputStr = outputStr.replace(/%catalog%/ig, tempStr);
    } else {
        outputStr = outputStr.replace(/[^%]*%catalog%[^%]*/ig, '');
    }
    
    prompt('Discogs Extractor', outputStr);
}

function insertButton() {
    header = getHeader(findMainDiv());
    
    button = document.createElement('input');
    button.type = 'button';
    button.value = 'Discogs Extractor';
    button.addEventListener('click', buildString, false);
    
    header.innerHTML += ' ';
    header.appendChild(button);
}

insertButton();