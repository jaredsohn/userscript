// ==UserScript==
// @name GitHub match occurrences
// @description Lets you select a word or term and see matches within the page
// @author Matthias Dailey <matt@zeroriginal.com>
// @version 2
// @match https://github.com/*
// ==/UserScript==

(function(){
    
    'use strict';
    
    var checkUrl = function () {
        // match /<user>/<repo>/blob/*
        return location.pathname.match(/^\/[^\/?#]*\/[^\/?#]*\/blob\/.*$/);
    };
    
    // Array of code container elements
    var code_wrappers;
    // The element that shows the match next to the scrollbar
    var markerDisp;
    // The element that shows the mouse position over the markerDisp
    var markerLine;
    
    // Top offset to normal scrollTo (top edge of screen)
    var scrollOffset = 100; // px
    
    // Setup for global page
    var setup = function () {
        
        // create the marker diplay element
        markerDisp = document.createElement('div');
        markerDisp.className = 'userscript-match-occurrences-disp';
        document.body.appendChild(markerDisp);
        
        markerLine = document.createElement('div');
        markerLine.className = 'userscript-marker-line';
        document.body.appendChild(markerLine);
        
        var navListener = function(event) {
            var per = event.y / markerDisp.scrollHeight;
            window.scrollTo(null, document.body.scrollHeight * per - scrollOffset);
        }
        
        // handle markerDisp click
        markerDisp.addEventListener('click', navListener);
        
        var mousedown = false;
        markerDisp.addEventListener('mousedown', function(event) {
            mousedown = true;
            // prevent selection
            event.preventDefault();
        });
        markerDisp.addEventListener('mouseup', function(event) {
            mousedown = false;
        });
        
        // handle markerDisp mouseover
        markerDisp.addEventListener('mousemove', function(event) {
            var per = event.y / markerDisp.scrollHeight;
            // set marker line position
            markerLine.style.top = (per*document.body.scrollHeight)+'px';
            if (mousedown) {
                navListener(event);
            }
            // prevent selection
            event.preventDefault();
        });
        
        // handle markerDisp mouseout
        markerDisp.addEventListener('mouseout', function(event) {
            // hide marker line
            markerLine.style.top = '-1px';
        });
        
        var style = document.createElement('style');
        style.innerHTML = "\
        .userscript-match-occurrences-disp {\
            position: fixed;\
            top: 0; bottom: 0; right: 0;\
            width: 1.5em;\
            background-color: rgba(255,255,255,0.8);\
            border-left: 1px solid rgba(0,0,0,0.1);\
            z-index: 300;\
        }\
        .userscript-match-occurrences-disp > i {\
            display: block;\
            position: absolute;\
            left: 0; right: 0;\
            background-color: goldenrod;\
        }\
        .userscript-marker-line {\
            position: absolute;\
            left: 0; right: 0;\
            height: 1px;\
            background-color: blue;\
            z-index: 200;\
        }\
        \
        ";
        document.body.appendChild(style);
    };
    
    // Sets up for new page content
    var apply = function() {
        // act only on approved URLs
        if (!checkUrl()) {
            clearMarkers();
            return;
        }
        
        // get the code container elements
        code_wrappers = document.getElementsByClassName('blob-line-code');
        if (!code_wrappers) return;
        
        // set keyup event handlers
        for (var i = 0, l = code_wrappers.length; i < l; i++) {
            code_wrappers[i].addEventListener('dblclick', check);
        }
        
        clearMarkers();
        
    }
    
    // Called on double click within the code containers. Check for a selection and then match it
    function check (event) {
        var selectedText = window.getSelection().toString().trim();
        if (!selectedText) {
            clearMarkers();
            return;
        }
        
        // we have a selection
        showMatches(selectedText);
        
    };
    
    function clearMarkers () {
        markerDisp.innerHTML = '';
    };
    
    // show the markers in the display div
    function showMarkers (marks) {
        clearMarkers();
        
        var dmarks = document.createDocumentFragment();
        
        var bodyRect = document.body.getBoundingClientRect();
        var elemRect, offsetTop;
        
        // go through the mark elements
        var i, l, dmark;
        for (i = 0, l = marks.length; i < l; i++) {
            // make a display mark
            dmark = document.createElement('i');
            
            elemRect = marks[i].getBoundingClientRect();
            offsetTop = elemRect.top - bodyRect.top;
            
            // set its top position
            dmark.style.top = (offsetTop / bodyRect.height * 100)+'%';
            dmark.style.height = (elemRect.height / bodyRect.height * 100)+'%';
            
            dmarks.appendChild(dmark);
        }
        
        // add to page
        markerDisp.appendChild(dmarks);
        
    }
    
    // find and show all matches for a string
    function showMatches (text) {
        var matches = getMatches(text);
        showMarkers(matches);
    };
    
    // gets matches on the page by finding them, wrapping them in <mark> elements
    // returns an array of `HTMLMarkElement`s 
    function getMatches (text) {
        var matches = [];
        // do all the work on an invisible document fragment
        var frag;
        // go through all the code blocks
        var i, i2,  l, l2;
        var lines, lineMatches;
        for (i = 0, l = code_wrappers.length; i < l; i++) {
            
            frag = document.createDocumentFragment();
            // clone the code container
            // get the original element in the fragment
            frag.appendChild(
                code_wrappers[i].parentNode.replaceChild(
                    code_wrappers[i].cloneNode(true), // put this
                    code_wrappers[i] // instead of this (and return it)
                )
            );
            lines = frag.querySelectorAll('.line');
            // go through all the lines
            for (i2 = 0, l2 = lines.length; i2 < l2; i2++) {
                lineMatches = getMatchesInLine(text, lines[i2]);
                // lineMatches is an array of HTMLMarkElements
                if (lineMatches.length) {
                    lineMatches.forEach(function(lineMatch) {
                        matches.push(lineMatch);
                    });
                }
            }
            // replace the code container
            code_wrappers[i].parentNode.replaceChild(frag, code_wrappers[i]);
            
        }
        return matches;
    };
    
    // gets matches within a line
    // returns an array of `HTMLMarkElement`s
    function getMatchesInLine (text, lineEl) {
        var matches = [];
        
        // go through the spans
        var i, i2, i3, l, l2, l3;
        var span, mark, tempText, pieces;
        for (i = 0, l = lineEl.children.length; i < l; i++) {
            span = lineEl.children[i];
            // get flattened innerText, to remove previous marks
            tempText = span.innerText;
            // split the string on the matches
            pieces = tempText.split(text);
            
            // clear the span
            span.innerHTML = '';
            
            // add new span content
            // go through all the pieces except the last one 
            for (i3 = 0, l3 = pieces.length - 1; i3 < l3; i3++) {
                // add the piece
                span.appendChild(document.createTextNode(pieces[i3]));
                // add the mark
                mark = document.createElement('mark');
                mark.appendChild(document.createTextNode(text));
                span.appendChild(mark);
                // add the mark to the matches array
                matches.push(mark);
                
            }
            
            // add the last bit
            span.appendChild(document.createTextNode(pieces[pieces.length-1]));
        }
        
        return matches;
    };
    
    setup();
    
    // detect location changes
    (function() {
        var previousLoc;
        
        setInterval(function() {
            // check for change
            if (previousLoc !== location.pathname) {
                // it changed
                // update previous
                previousLoc = location.pathname;
                // trigger reapply
                setTimeout(apply, 1000);
            }
        }, 500);
        
    }());
    
}());