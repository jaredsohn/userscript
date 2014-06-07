// Netflix Notes user script
// version 1.2.5
// 2014-01-04
// Copyright (c) 2008-2014, Mike Morearty
// Released under the MIT license
// http://www.opensource.org/licenses/mit-license.php
//
// Except for the getElementsByClassName function, which is:
//   Developed by Robert Nyman, http://www.robertnyman.com
//   Code/licensing: http://code.google.com/p/getelementsbyclassname/
//
// --------------------------------------------------------------------
//
// This lets you add a short note to yourself for each movie in your
// Netflix queue.  Below each movie name, you will see the words
// "add note".
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "Netflix Notes", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Netflix Notes
// @namespace     http://www.morearty.com
// @description   Lets you add notes to your Netflix queue entries
// @include       http://*.netflix.com/Queue*
// @include       http://*.netflix.com/MyList*
// ==/UserScript==

var defaultNote = 'add note';  // displayed next to movies that don't have a note

var noteColor = 'black';       // text color for the note
var defaultNoteColor = 'gray'; // text color for "add note" default text

/*
    getElementsByClassName:
    Developed by Robert Nyman, http://www.robertnyman.com
    Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/    
var getElementsByClassName = function (className, tag, elm){
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
                nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                returnElements = [],
                current;
            for(var i=0, il=elements.length; i<il; i+=1){
                current = elements[i];
                if(!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = "",
                xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                returnElements = [],
                elements,
                node;
            for(var j=0, jl=classes.length; j<jl; j+=1){
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try    {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = [],
                elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                current,
                returnElements = [],
                match;
            for(var k=0, kl=classes.length; k<kl; k+=1){
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for(var l=0, ll=elements.length; l<ll; l+=1){
                current = elements[l];
                match = false;
                for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};

// This is called when the user begins editing a note, by clicking on it.
// It turns the <span> of text into an edit box.
function onEditMovieNote(event)
{
    var elem = event.currentTarget;
    var noteText = elem.textContent;
    if (noteText == defaultNote)
        noteText = '';
    elem = elem.parentNode;
    var input = document.createElement("input");

    // If the user clicks outside the edit box, he is done editing:
    input.addEventListener('blur', onDoneEditingMovieNote, true);

    // If the user presses Return, he is done editing:
    input.addEventListener('keydown',
        function(event) { 
            if (event.keyCode==13) 
                onDoneEditingMovieNote(event);
        }, true);

    input.value = noteText;
    elem.innerHTML = "";
    elem.appendChild(input);
    input.focus();
}

// This is called when the user is done editing a note, e.g. because they click
// outside of the note or they press Return.  It saves the new note, and turns
// the edit box back into a regular <span> of text.
function onDoneEditingMovieNote(event)
{
    var elem = event.currentTarget;

    // Figure out the movie title
    var title = null;
    for (var e = elem; title == null && e; e = e.parentNode)
    {
        var anchors = e.getElementsByTagName('a');
        if (anchors.length == 1)
        {
            title = anchors[0].text;
        }
    }

    var noteText = elem.value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    if (noteText == '')
        noteText = defaultNote;

    // Save the note
    saveNote(title, noteText);

    // Replace the edit box with a regular <span> of text
    elem = elem.parentNode;
    elem.innerHTML = "";
    elem.appendChild(makeNoteSpan(noteText));
}

// Given the text of a note (which might be the defaultNote text), return
// a <span> element representing that note, along with the proper
// color, click handler, etc.
function makeNoteSpan(noteText)
{
    var innerSpan = document.createElement("span");
    innerSpan.style.color = (noteText == defaultNote ? defaultNoteColor : noteColor);
    innerSpan.style.cursor = 'pointer';
    innerSpan.addEventListener('click', onEditMovieNote, true);
    innerSpan.innerHTML = noteText;
    return innerSpan;
}

function loadNote(movieTitle, defaultNote)
{
    return GM_getValue(movieTitle, defaultNote);
}

function saveNote(movieTitle, note)
{
    GM_setValue(movieTitle, note);
}

// The main initialization function.  Loops through all the movies on the page,
// and for each one, adds a <span> to the page showing its note.
function initialize()
{
    insertNotesByClass('qtbl');
}

function insertNotesByClass(className)
{
    var q = getElementsByClassName(className, null, document);
    if (q)
    {
        for each (var elem in q)
            insertNotesInElem(elem);
    }
}

function insertNotes(idOfSection)
{
    var q = document.getElementById(idOfSection);
    if (q)
        insertNotesInElem(q);
}

function insertNotesInElem(elem)
{
    // Each movie is inside <span class="title">
    var spans = elem.getElementsByTagName('span');
    var foundTitle = false;
    for (var s=0; s<spans.length; ++s)
    {
        if (spans[s].className.match(/\btitle\b/))
        {
            foundTitle = true;
            var anchors = spans[s].getElementsByTagName('a');
            if (anchors.length == 1)
            {
                // Load the movie's note
                var title = anchors[0].text;
                var noteText = loadNote(title, defaultNote);

                // Create a <span> and insert it
                var innerSpan = makeNoteSpan(noteText);

                var outerSpan = document.createElement("span");
                outerSpan.appendChild(innerSpan);

                spans[s].appendChild(document.createElement("br"));
                spans[s].appendChild(outerSpan);
            }
        }
    }
}

// this is executed when this script loads:
initialize();
