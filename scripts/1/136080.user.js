// ==UserScript==
// @name       ASCII SEARCH ON DOUBLE CLICK
// @namespace  http://use.i.E.your.homepage/
// @version    1.8
// @description  find and navigate with all words matched (jshint & jslint  approved with some options)
// @match      http://*/*
// @copyright  2012+, Axel DUCH
// ==/UserScript==


// @TODO jQuery support

function getX(oElement) {
    "use strict";
    var iReturnValue = 0;
    while (oElement !== null) {
        iReturnValue += oElement.offsetLeft;
        oElement = oElement.offsetParent;
    }
    return iReturnValue;
}

function getY(oElement) {
    "use strict";
    var iReturnValue = 0;
    while (oElement !== null) {
        iReturnValue += oElement.offsetTop;
        oElement = oElement.offsetParent;
    }
    return iReturnValue;
}

function removeElement(element, completely) {
    "use strict";
    if (completely) {
        element.parentNode.removeChild(element);
        return;
    }
    var parent = element.parentNode;
    while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
}

function anchorClickHandler(e) {
    "use strict";
    e.stopPropagation();
    removeElement(e.currentTarget.parentNode.parentNode.parentNode, true);
}

String.prototype.toUint8Array128 = function () {
    "use strict";
    var charBuffer, i, n, val;
    charBuffer = [];
    n = this.length;
    for (i = 0; i < n; i = i + 1) {
        val = this.charCodeAt(i);
        if (val >= 128) {
            charBuffer.push(128);
        } else {
            charBuffer.push(val);
        }
    }
    return new Uint8Array(charBuffer);
};

Uint8Array.prototype.seek = function (ui8a, htmlmode) {
    "use strict";
    if (!(ui8a instanceof Uint8Array)) {
        throw new Error('Wrong type parameter: ' + typeof (ui8a) + ' given, Uint8Array expected');
    }

    // ENTRY POINT
    // Only non-overlapping
    var avoidTags, i, max, ui8aIndex, ui8aMax, openingTagEncountered, sequences;
    avoidTags = ~~htmlmode ? true : false;
    ui8aIndex = 0;
    ui8aMax = ui8a.length - 1;
    sequences = { startIndices: [], wordLength: ui8a.length };
    max = this.length;
    openingTagEncountered = false;

    if (avoidTags) {
        for (i = 0; i < max; i = i + 1) {
            if (avoidTags) {
                //60 = '<'
                //62 = '>'
                if (!openingTagEncountered && this[i] === 60) {
                    openingTagEncountered = true;
                    ui8aIndex ^= ui8aIndex;
                    continue;
                }
                if (openingTagEncountered && this[i] === 62) {
                    openingTagEncountered = false;
                    ui8aIndex ^= ui8aIndex;
                    continue;
                }
            }
            if (!openingTagEncountered && this[i] === ui8a[ui8aIndex]) {
                if (ui8aIndex === ui8aMax) {
                    sequences.startIndices.push(i - ui8aMax);
                    ui8aIndex ^= ui8aIndex;
                    continue;
                }
                ui8aIndex = ui8aIndex + 1;
                continue;
            }
            ui8aIndex ^= ui8aIndex;
        }
    } else {
        for (i; i < max; i = i + 1) {
            if (this[i] === ui8a[ui8aIndex]) {
                if (ui8aIndex === ui8aMax) {
                    sequences.startIndices.push(i - ui8aMax);
                    ui8aIndex ^= ui8aIndex;
                    continue;
                }
                ui8aIndex = ui8aIndex + 1;
                continue;
            }
            ui8aIndex ^= ui8aIndex;
        }
    }
    return sequences;
};

function buildContextMenu(element) {
    "use strict";
    var i, li, a, bCurrentElementEncountered, contextMenuShell, matches, contextMenuContentContainer, oContextMenuContentList;
    if (document.getElementById(element.id.replace('anchor', 'div'))) {
        return;
    }
    matches = document.getElementsByClassName("found_word_dblclick");
    if (matches.length <= 1) {
        return;
    }
    contextMenuShell = document.createElement('div');
    contextMenuShell.className = 'context_menu_shell';
    contextMenuShell.id = element.id.replace('anchor', 'div');
    // gradient
    contextMenuShell.style.position = 'absolute';
    contextMenuShell.style.left = getX(element) + 'px';
    contextMenuShell.style.top = (getY(element) + 15) + 'px';
    contextMenuShell.style.width = '100px';
    contextMenuShell.style.background = '#FFFFBB';
    contextMenuShell.style.color = '#000000';
    contextMenuShell.addEventListener('mouseout', function (e) {
        e.stopPropagation();
        if (e.target.tagName === 'DIV') {
            removeElement(this, true);
        }
    }, false);

    contextMenuContentContainer = document.createElement('ul');
    contextMenuContentContainer.style.listStyleType = 'none';
    contextMenuContentContainer.style.position = 'relative';
    oContextMenuContentList = {
        lowerPart: [],
        upperPart: []
    };
    bCurrentElementEncountered = false;
    for (i = matches.length - 1; i >= 0; i = i - 1) {
        if ('found_word_dblclick_anchor_' + i !== element.id) {
            if (bCurrentElementEncountered) {
                oContextMenuContentList.lowerPart.push(matches[i].id);
            } else {
                oContextMenuContentList.upperPart.push(matches[i].id);
            }
        } else {
            bCurrentElementEncountered  = true;
        }
    }
    for (i = oContextMenuContentList.lowerPart.length - 1; i >= 0; i = i - 1) {
        li = document.createElement('li');
        a = document.createElement('a');
        a.href = '#' + oContextMenuContentList.lowerPart[i];
        a.innerText = 'index ' + (oContextMenuContentList.lowerPart.length - i);
        a.addEventListener('click', anchorClickHandler);
        li.appendChild(a);
        contextMenuContentContainer.appendChild(li);
    }
    li = document.createElement('li');
    li.innerText = 'Current';
    contextMenuContentContainer.appendChild(li);
    for (i = oContextMenuContentList.upperPart.length - 1; i >= 0; i = i - 1) {
        li = document.createElement('li');
        a = document.createElement('a');
        a.href = '#' + oContextMenuContentList.upperPart[i];
        a.innerText = 'index ' + (oContextMenuContentList.lowerPart.length + 1 + oContextMenuContentList.upperPart.length - i);
        a.addEventListener('click', anchorClickHandler);
        li.appendChild(a);
        contextMenuContentContainer.appendChild(li);
    }
    contextMenuShell.appendChild(contextMenuContentContainer);
    document.body.appendChild(contextMenuShell);
}

function mouseOverHandler(e) {
    "use strict";
    e.stopPropagation();
    buildContextMenu(e.currentTarget, e.clientX, e.clientY);
}

function highLightMatchesForSelection() {
    "use strict";
    var i, ui8aBody, ui8aWord, sequences, text, start, end, sequence, leftHTML, rightHTML, finalHTML, openingSpan, closingSpan;
    ui8aWord = window.getSelection()
                               .toString()
                               .trim()
                               .toLowerCase()
                               .toUint8Array128();
    ui8aBody = document.body.innerHTML.toLowerCase().toUint8Array128();
    sequences = ui8aBody.seek(ui8aWord, true);
    text = '';

    if (sequences.startIndices.length) {
        // little trick to keep integrity of indices: start from the last sequence
        finalHTML = document.body.innerHTML;
        openingSpan = '<span class="found_word_dblclick" style="background: #FFFF00; color: #80400">';
        closingSpan = '</span>';
        for (i = sequences.startIndices.length - 1; i >= 0; i = i - 1) {
            start = sequences.startIndices[i];
            end = sequences.startIndices[i] + sequences.wordLength;
            sequence = finalHTML.substring(start, end);
            leftHTML = finalHTML.substring(0, start);
            rightHTML = finalHTML.substring(end, finalHTML.length - 1);
            finalHTML = leftHTML + openingSpan + sequence + closingSpan + rightHTML;
        }
        document.body.innerHTML = finalHTML;
        return true;
    }
    return false;
}

function buildGUIForResults() {
    "use strict";
    var i, matches;
    matches = document.getElementsByClassName("found_word_dblclick");
    for (i = matches.length - 1; i >= 0; i = i - 1) {
        matches[i].title = matches.length - 1 + (matches.length <= 2 ? ' match ' : ' matches ') + 'for this word';
        matches[i].id = "found_word_dblclick_anchor_" + i;
        matches[i].onmouseover = mouseOverHandler;
    }
}

function clearMatches() {
    "use strict";
    // clear last matches
    var contextMenuShells, highlightedSequences;
    highlightedSequences = document.getElementsByClassName('found_word_dblclick');
    while (highlightedSequences.length) {
        removeElement(highlightedSequences[0]);
    }
    contextMenuShells = document.getElementsByClassName('context_menu_shell');
    while (contextMenuShells.length) {
        removeElement(contextMenuShells[0], true);
    }
}

document.ondblclick = function () {
    "use strict";
    clearMatches();
    highLightMatchesForSelection();
    buildGUIForResults();
};