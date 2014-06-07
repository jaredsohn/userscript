// ==UserScript==
// @name AmberCutieForums Better Quoter
// @version	0.1.7
// @description	Removes nested quotes when quoting a post and hides nested quotes when viewing a topic.
// @include	http://www.ambercutie.com/forums*
// @include	http://ambercutie.com/forums/*
// @match	http://www.ambercutie.com/forums/*
// @match	http://ambercutie.com/forums/*
// ==/UserScript==

if (0 === window.location.href.indexOf('http://www.ambercutie.com/forums/posting.php')) {

    var textArea = document.querySelector('textarea');
    var quotes = textArea.value.match(/\[quote="\w*"]/mg);
    if (1 < quotes.length) {
        var original = textArea.value;
        var mid = textArea.value.substring(quotes[0].length + 2); //get rid of the first quote
        mid = mid.substring(0, mid.length - 9); //get rid of the last quote
        mid = mid.substring(mid.lastIndexOf("[/quote]") + 9); //get rid of all subquotes
        textArea.value = quotes[0] + mid + "[/quote]"; //rebuild the string

        //add a button to restore the original quote
        var btn = document.createElement('input');
        btn.setAttribute('class', 'btnlite');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', 'Restore Quote');
        btn.addEventListener('click', function () {
            textArea.value = original;
        });
        var cat = document.querySelector('.cat');
        cat.appendChild(document.createTextNode('\u00a0\u00a0')); //add a non breaking space
        cat.appendChild(btn);
    }
}

if (0 === window.location.href.indexOf('http://www.ambercutie.com/forums/viewtopic.php')) {
    GM_addStyle('.toggle {float:right; margin-top:2px; cursor:pointer}');

    //hide all nested div's inside quotecontent    
    [ ].slice.call(document.querySelectorAll('div.quotecontent div')).forEach(function (e) {
        if (hasNonDIVChild(e.parentNode))
            hideElement(e); 
    });
    //hide br's at the start of quotecontent
    [ ].slice.call(document.querySelectorAll('div.quotecontent>br')).forEach(function (e) {
        if ("DIV" === e.previousSibling.tagName) {
            hideElement(e);
            //hide any other BR's that come before text
            while ("BR" === e.nextSibling.tagName) {
                hideElement(e.nextSibling);
                e = e.nextSibling;
            }
        }
    });

    //add expand/collapse icons to the titles of quotes where we have hidden nested quotes
    var expand = 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO5JREFUeNpi/P//P8P8zukJDAwMmUBsxoAbnALi6YnlmQsY53VMqxMR5W3UNpBjEBTixqnj/buvDFcvPGJ48/pzPQvIBmt7TQYOTjYGfEBCgo1BwJ6bYeOaU5lMIL6AIC8DBwc7Cu6uX4IhBlIHUg+yiYGJiQmr6TjFGcgALMicxtLZDLj49d2p2DUhS4A0IPMxbPr16xdWSVziYE3ff/zEKolLHKTp6dt3n6Q5OFhRJFKL/Rm+fvuOIvbjx28Q9RSkafrF0w9alDVFGVjZmHGG2O9ffxnuXn8NYk5nhKa9Omjak8AT0i+gaa8JIMAA5XtQMtjo33UAAAAASUVORK5CYII=';
    var collapse = 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANFJREFUeNpi/P//P8P8zukJDAwMmUBsxoAbnALi6YnlmQsY53VMqxMR5W3UNpBjEBTixqnj/buvDFcvPGJ48/pzPQvIBmt7TQYOTjYGfEBCgo1BwJ6bYeOaU5kgTRICgrwMxAAODnawfpAmBiYmJgZSAGmqoYAFmdNYOhunwvruVOyakCUI2vTr1y/Snff9x0+SNT19++6TNAcHK0HFP378BlFPQZqmXzz9oEVZU5SBlY0Zp4bfv/4y3L3+GsSczghNe3XQtCeBx6IX0LTXBBBgAK75P0Fw5RneAAAAAElFTkSuQmCC';
    var toggleImg = document.createElement('img');
    toggleImg.setAttribute('src', 'data:image/png;base64,' + expand);
    toggleImg.setAttribute('class', 'toggle');
    toggleImg.setAttribute('data-expanded','false');
    [ ].slice.call(document.querySelectorAll('div.postbody>div.quotetitle')).forEach(function (e) {
        if (0 < e.nextSibling.querySelectorAll('[data-hidden="true"]').length)
            e.appendChild(toggleImg.cloneNode(true));
    });

    function toggleExpanded(e) {
        var img = e.srcElement ? e.srcElement : e.target; //handle FF/Chrome differences

        //If this isnt a click from a toggle image, leave
        if (!("IMG" === img.tagName && 'toggle' === img.getAttribute('class')))
            return;

        var contentDiv = img.parentNode.nextSibling; //get the content div

        if ('true' === img.getAttribute('data-expanded')) {
            img.setAttribute('src', 'data:image/png;base64,' + expand); //swap the img
            //hide all the nested divs
            [ ].slice.call(contentDiv.querySelectorAll('[data-hidden="false"]')).forEach(function (e) {
                hideElement(e);
            });
            img.setAttribute('data-expanded', 'false'); //remember our state
        } else {
            img.setAttribute('src', 'data:image/png;base64,' + collapse); //swap the img
            //show all the nested divs
            [ ].slice.call(contentDiv.querySelectorAll('[data-hidden="true"]')).forEach(function (e) {
                showElement(e);
            });
            img.setAttribute('data-expanded', 'true'); //swap the img
        }
    }

    //add a click handler to the document to listen for toggle clicks
    document.addEventListener('click', toggleExpanded);
}

function hideElement(element) {
    element.style.display = 'none';
    element.setAttribute('data-hidden','true');
}
function showElement(element) {
    element.style.display = 'block';
    element.setAttribute('data-hidden','false');
}
function hasNonDIVChild(element) {
    return [].slice.call(element.childNodes).some(function (element) {
        return "DIV" !== element.tagName; //NODE.TEXT_NODE
    });
}

