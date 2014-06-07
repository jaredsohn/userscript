// ==UserScript==
// @name WaniKani hide mnemonics
// @namespace wkhidem
// @description Adds a possiblity to hide meaning and reading mnemonics.
// @version 1.8
// @author Niklas Barsk
// @include https://www.wanikani.com/review/session*
// @include https://www.wanikani.com/lesson/session*
// @include https://www.wanikani.com/radicals/*
// @include https://www.wanikani.com/kanji/*
// @include https://www.wanikani.com/vocabulary/*
// @run-at document-end
// @updateURL http://userscripts.org/scripts/source/184925.user.js
// ==/UserScript==

/*
 * This script is licensed under the MIT licence.
 */

if (isReview() || isLesson())
{
    // review/lessons quiz
    var mo = new MutationObserver(initQuiz);
    mo.observe(document.getElementById("item-info-col2"), {'childList': true});
}

if (isLesson())
{
    // Call init whenever the main-info class attribute is updated.
    // This happens whenever the user switch to a new item on the
    // lesson/learning part.
    var mo = new MutationObserver(init);
    mo.observe(document.getElementById("main-info"), {'attributes': true});
}

if (isLookup())
{
    if (document.getElementById("progress").style.display != "none")
    {
        // only run the script on items that has been unlocked since it's
        // not possible to add user mnemonics on locked items.
        init();
    }
}

function initQuiz(allmutations)
{
    if (allmutations[0].addedNodes.length > 0)
    {
        // Ignore the mutation if no nodes are added.
        // When going from one question to the next all elements in
        // item-info-col2 is first removed as one mutation and then
        // the new content is added as a second mutation. So mutations
        // without any added nodes should be ignored
        init();
    }
}

function init()
{
    if (!sanityCheckPassed())
    {
        // Don't try to run the script if the HTML can't be parsed.
        console.warn("WaniKani hide mnemonics need to be updated to support the latest version of WaniKani.");
        return;
    }

    setCorrectText();
    setCorrectVisibility();

    if (isQuiz())
    {
        // Update visibility state when the "Show All Information" button is pressed.
        document.getElementById("all-info").addEventListener("click", setCorrectVisibility);
    }

    // Setup listeners for changes to the note-meaning/reading.
    var mo = new MutationObserver(onNoteChanged);
    var options = {'childList': true};
    mo.observe(getNoteElement("meaning"), options);

    if (!isRadical())
    {
        mo.observe(getNoteElement("reading"), options);
    }
}


/**
 * Called whenever the note-reading or note-meaning elements children
 * are updated.
 */
function onNoteChanged(allmutations)
{
    // 1 children for the edit note form and 0 children when the
    // note is being displayed. Update visibility when form is closed
    // and note is shown again.
    if (allmutations[0].target.children.length == 0)
    {
        // example id for quiz: 'meaning-note'
        // example id for learning: 'supplement-voc-meaning-notes'
        var index = isLesson() && !isQuiz() ? 2 : 1;
        var which = allmutations[0].target.parentNode.id.split('-')[index];
        setCorrectVisibilityFor(which);
    }
}

/**
 * Set the correct text for the meaning and reading headers depending on
 * the current state.
 */
function setCorrectText()
{
    setCorrectTextFor("meaning");
    if (!isRadical())
    {
        setCorrectTextFor("reading");
    }
}

/**
 * Returns true if the mnemonic is hidden for the current character
 * and the given type.
 */
function isHidden(which)
{
    return isManuallyHidden(which) || isAutomaticallyHidden(which);
}

/**
 * Returns true if the user has hidden the mnemonic with the hide link.
 */
function isManuallyHidden(which)
{
    return localStorage.getItem(getStorageKey(which)) == "0";
}

/**
 * Returns true if the mnemonic has been hidden because there
 * is a note present.
 */
function isAutomaticallyHidden(which)
{
    return hasNote(which) &&
           localStorage.getItem(getStorageKey(which)) != "1";
}

/**
 * Set hidden status for the current character in the localStorage
 * for the give type.
 * @param which "reading" or "meaning" depending on which key is desired.
 * @param what new value for the current character:
 *             0: user has manually hidden the mnemonic.
 *             1: user has shown an automatically hidden mnemonic.
 */
function setStorage(which, what)
{
    localStorage.setItem(getStorageKey(which), what);
}

/**
 * Remove the stored information about the current character from
 * the localStorage for the give type.
 * @param which "reading" or "meaning" depending on which key is desired.
 */
function clearStorage(which)
{
    localStorage.removeItem(getStorageKey(which));
}

/**
 * Get the key that the removed state for the current character is
 * stored under in the localStorage.
 * @param "reading" or "meaning" depending on which key is desired.
 */
function getStorageKey(which)
{
    return getCharacterType() + "_" + getCharacter() + "_" + which;
}

/**
 * Return a textual representation of the current character.
 * For vocabulary, kanji and normal radicals it is the vocabulary,
 * kanji, or radical itself. For radicals that are just an image
 * it is the file name of the image.
 */
function getCharacter()
{
    var element;
    if (isLookup())
    {
        element = document.getElementsByClassName("japanese-font-styling-correction")[0];
    }
    else
    {
        element = document.getElementById("character");
    }

    var character = element.textContent.trim();
    if (character == "") // Radical with image instead of text.
    {
        var img = element.children[0];
        // During quiz the image is inside a span, during lessons
        // the image is directly under the character div.
        if (isQuiz())
        {
            img = img.children[0]
        }
        character = img.getAttribute("src").split("/").pop()
    }
    return character
}

/**
 * Return the type of the character the page is for: a string containing
 * "vocabulary", "kanji" or "radical".
 */
function getCharacterType()
{
    if (isLesson())
    {
        return document.getElementById("main-info").className.trim();
    }
    else if (isReview())
    {
        return document.getElementById("character").className.trim();
    }
    else if (isLookup())
    {
        var character = document.getElementsByClassName("japanese-font-styling-correction")[0];
        var cn = character.parentElement.className;
        return cn.substr(0, cn.indexOf("-"));
    }
}

/**
 * Return true if the current page is for a radical.
 */
function isRadical()
{
    return getCharacterType() == "radical";
}

/**
 * Return true if the current page is for vocabulary.
 */
function isVocabulary()
{
    return getCharacterType() == "vocabulary";
}

function isLookup()
{
    return document.URL.indexOf("/radicals/") != -1 ||
           document.URL.indexOf("/kanji/") != -1 ||
           document.URL.indexOf("/vocabulary/") != -1;
}

/**
 * Returns true if the current page is a lesson.
 */
function isLesson()
{
    return document.URL.indexOf("lesson") != -1;
}

/**
 * Returns true if the current page is a review.
 */
function isReview()
{
    return document.URL.indexOf("review") != -1;
}

/**
 * Returns true if the user is currently doing a quiz.
 */
function isQuiz()
{
    if (isReview())
    {
        return true;
    }
    if (isLesson())
    {
        var mainInfo = document.getElementById("main-info");
        return mainInfo.parentElement.className == "quiz";
    }
    return false;
}

/**
 * Returns true if the current item has a note set.
 * @param which specifies if it's the reading or meaning
 *              note that is of interest.
 */
function hasNote(which)
{
    return getNoteElement(which).textContent.trim() != "Click to add note";
}

/**
 * Set the correct visibility of the reading and meaning sections.
 */
function setCorrectVisibility()
{
    setCorrectVisibilityFor("meaning");
    if (!isRadical())
    {
        setCorrectVisibilityFor("reading");
    }
}

/**
 * Set the correct visibility for the specified header depending on the current state.
 * @param which The header that should be updated, either "reading" or "meaning".
 */
function setCorrectVisibilityFor(which)
{
    if (hiddenByWaniKani(which))
    {
        // Don't touch visibility for things hidden by WaniKani.
        return;
    }

    if (isHidden(which)) // In this case, should be hidden
    {
        hide(which);
    }
    else
    {
        show(which);
    }
}

/**
 * When doing a quiz WaniKani only shows the info that was being asked for
 * to see all info the user need to press a button to display it.
 * This method returns true if the given reading/meaning is currently hidden.
 *
 * @param which "reading" or "meaning"
 */
function hiddenByWaniKani(which)
{
    if (!isQuiz())
    {
        return false;
    }
    var infoHidden = document.getElementById("all-info").style.display != "none";
    var questionType = document.getElementById("question-type").className;
    return which != questionType && infoHidden;
}

/**
 * Set the correct state in local storage for the current item
 * and mnenemonic based on the given action.
 * @param action "hide" or "show"
 * @param which "reading" or "meaning"
 */
 function setCorrectStorage(action, which)
{
    var note = hasNote(which);
    if (action == "show" && !note ||
        action == "hide" && note)
    {
        // Default state, cleare any storage
        clearStorage(which);
    }
    else if (action == "show" && note)
    {
        // Force section to be visible
        setStorage(which, 1);
    }
    else if (action == "hide" && !note)
    {
        // Force section to be hidden
        setStorage(which, 0);
    }
}

/**
 * Hide the specified section.
 * @param which The section that should be hidden, either "reading" or "meaning".
 */
function hide(which)
{
    setCorrectStorage("hide", which);
    setDisplayStyle(which, "none");
    setCorrectText();
}

/**
 * Show the specified section.
 * @param which The section that should be shown, either "reading" or "meaning".
 */
function show(which)
{
    setCorrectStorage("show", which);
    setDisplayStyle(which, "");
    setCorrectText();
}

/**
 * Set the display style of the hidable section.
 * @param which The section that should be updated, either "reading" or "meaning".
 * @param display The new value of the display css property.
 */
function setDisplayStyle(which, display)
{
    var children = getHidableElements(which);
    for (i = 0; i < children.length; ++i)
    {
        children[i].style.display = display;
    }
}

/**
 * Returns an array with all elements that should be hidden or
 * shown when the hide/show link is clicked.
 * @param Specifies if it's the "reading" or "meaning" that should be hidden
 */
function getHidableElements(which)
{
    // return an array of items to hide/show
    var ret = [];
    if (isQuiz())
    {
        ret.push(getMnemonicContainer(which));
    }
    else if (isLesson())
    {
        var children = getLearningContainer(which).children;
        for (i = 0; i < children.length - 2; ++i) // note section is last 2 elements.
        {
            ret.push(children[i]);
        }
    }
    else if (isLookup())
    {
        if (isRadical())
        {
            ret.push(getLookupMnemonicContainer(which));
        }
        else
        {
            var children = getLookupMnemonicContainer(which).children;
            for (i = 0; i < children.length - 1; ++i) // note section is the last element.
            {
                ret.push(children[i]);
            }
        }
    }
    return ret;
}

/**
 * Set the correct text for reading/meaning/note header with the apropriate
 * show/hide link depending on what the current state is.
 *
 * @param which Specifies which header should be updated, the "reading" or "meaning" header.
 * @param action Specifies what happens when the header is pressed, either "show" or "hide".
 * @param headerID The ID of the header that should be updated.
 * @param header The DOM element which should have its text updated.
 */
function textForHeader(which, action, header)
{
    // Add the show/hide link to the header.
    header.innerHTML = header.firstChild.textContent + getLinkHTML(which, action);

    // Set either hide(which) or show(which) as onclick handler for the new link.
    document.getElementById(getLinkId(which, action)).onclick = function() 
    {
        if (action == "show")
        {
            show(which);
        }
        else
        {
            hide(which);
        }
    };
}

/**
 * Get the HTML for the show/hide link.
 * @param which Specifies if the link is for "reading" or "meaning".
 * @param action Specifies if the link is "hide" or "show".
 */
function getLinkHTML(which, action)
{
    // Examples of what the html looks like:
    // <span id="show-reading">(show original meaning)</span>
    // <span id="hide-meaning">(hide)</span>

    var linkText = action;
    if (action == "show")
    {
        if (isVocabulary())
        {
            linkText += " original explanation";
        }
        else
        {
            linkText += " original mnemonic";
        }
    }

    return "<span id=\"" + getLinkId(which, action) + "\"> (" + linkText + ")</span>";
}

/**
 * Return the id of the show/hide link.
 */
function getLinkId(which, action)
{
    var quiz = isQuiz() ? "-q" : "";
    return action + "-" + which + "-" + getCharacterType() + quiz;
}

/**
 * Set the correct text for the specified header depending on the current state.
 * @param which The header that should be updated, either "reading" or "meaning".
 */
function setCorrectTextFor(which)
{
    if (isHidden(which))
    {
        // Display the "show" link in the note.
        textForHeader(which, "show", getNoteHeader(which));
    }
    else
    {
        // Display the "hide" link in the header.
        textForHeader(which, "hide", getMnemonicHeader(which));

        // Make sure the default version of the Note header is displayed.
        var nh = getNoteHeader(which);
        nh.innerHTML = nh.firstChild.textContent;
    }
}

/**
 * Get the DOM element that contains the mnemonic.
 * @param which Specifies if the header for the reading or meaning should
 *              be returned. The parameter is ignored for radicals since
 *              they only have one mnemonic.
 */
function getMnemonicContainer(which)
{
    if (isRadical())
    {
        return document.getElementById("item-info-col2").children[0];
    }
    else
    {
        return document.getElementById("item-info-" + which + "-mnemonic");
    }
}

/**
 * Return the element that contains the mnemonics for the lookup pages.
 */
function getLookupMnemonicContainer(which)
{
    if (isRadical())
    {
        return document.getElementById("note-" + which).previousElementSibling;
    }
    else
    {
        return document.getElementById("note-" + which).parentElement;
    }
}

/**
 * Get the DOM element for the mnemonic header.
 * @param which Specifies if the header for the reading or meaning should
 *              be returned. The parameter is ignored for radicals since
 *              they only have one mnemonic.
 */
function getMnemonicHeader(which)
{
    if (isQuiz())
    {
        return getMnemonicContainer(which).children[0];
    }
    else if (isLesson())
    {
        return getLearningContainer(which).children[0];
    }
    else if(isLookup())
    {
        return getLookupMnemonicContainer(which).children[0];
    }
}

/**
 * Get the DOM element for the user notes header.
 * @param which Specifies if the notes header for the reading or meaning
 *              should be returned.
 */
function getNoteHeader(which)
{
    if (isQuiz() || isLookup())
    {
        return document.getElementById("note-" + which).children[0];
    }
    else if (isLesson())
    {
        var container = getLearningContainer(which);
        return container.children[container.children.length - 2];
    }
}

/**
 * Returns the DOM element that holds the user note.
* @param which Specifies if the notes element for the reading or meaning
 *              should be returned.
 */
function getNoteElement(which)
{
    var element;
    if (isLesson() && !isQuiz())
    {
        var id;
        if (isRadical())
        {
            id = "supplement-rad-name-notes";
        }
        else
        {
            id = "supplement-" + getCharacterType().substring(0,3) + "-" + which + "-notes";
        }
        element = document.getElementById(id).children[0];
    }
    else
    {
        element = document.getElementById("note-" + which).children[1];
    }
    return element;
}

/**
 * Get the container element of the mnemonics and notes in the learning
 * part of lessons. There is no id available for the actual headers and
 * mnemonics like in the quiz so the container element is the closest
 * we get.
 *
 * @param which Specifies if it's the container for "reading" or "meaning"
 *              that is desired.
 */
function getLearningContainer(which)
{
    var id = "supplement-" + getCharacterType().substring(0,3) + "-";
    var className = "pure-u-3-4";
    if (isRadical())
    {
        id += "name";
        className = "pure-u-1"
    }
    else
    {
        id += which;
    }

    return document.getElementById(id).getElementsByClassName(className)[0];
}

/**
 * Return true if critical assumptions made about the HTML code holds.
 */
function sanityCheckPassed()
{
    try
    {
        if (isLookup())
        {
            sanityCheckLookup();
        }

        if (isQuiz())
        {
            sanityCheckQuiz();
        }

        if (isLesson())
        {
            sanityCheckLesson();
        }

        // Make sure we can get a correct character type.
        var ct = getCharacterType();
        if (ct != "radical" && ct != "vocabulary" && ct != "kanji")
        {
            throw new Error("Unknown character type: " + ct);
        }

        // Make sure we can get a correct storage key
        var parts = getStorageKey("meaning").split("_");
        if (parts.length != 3 || parts[0] == "" ||
            parts[1] == ""    || parts[2] == "")
        {
            throw new Error("Unable to generate a correct storage key: " + key);
        }
    }
    catch (e)
    {
        console.error(e.toString());
        return false;
    }
    return true;
}

/**
 * Throws an exception if the critical assumptions made about the
 * HTML code in the lookup related code are wrong.
 */
function sanityCheckLookup()
{
    if (document.getElementsByClassName("japanese-font-styling-correction").length == 0)
    {
        throw new Error("No element with class 'japanese-font-styling-correction' exists");
    }

    ensureElementExists("note-meaning");
    if (!isRadical())
    {
        ensureElementExists("note-reading");
    }
}

/**
 * Throws an exception if the critical assumptions made about the
 * HTML code in the quiz related code are wrong.
 */
function sanityCheckQuiz()
{
    ensureElementExists("character");
    ensureElementExists("all-info");
    ensureElementExists("item-info-col2");
    ensureElementExists("note-meaning");
    var questionType = ensureElementExists("question-type");
    questionType = questionType.className;

    if (questionType != "reading" && questionType != "meaning")
    {
        throw new Error("'question-type' is neither \"reading\" nor \"meaning\", it is \"" + questionType + "\"");
    }

    if (!isRadical())
    {
        ensureElementExists("item-info-reading-mnemonic");
        ensureElementExists("item-info-meaning-mnemonic");
        ensureElementExists("note-reading");
    }
}

/**
 * Throws an exception if the critical assumptions made about the
 * HTML code in the lesson related code are wrong.
 */
function sanityCheckLesson()
{
    ensureElementExists("character");
    var mainInfo = ensureElementExists("main-info");

    // Make sure assumptions for lessons in isQuiz() holds.
    var cn = mainInfo.parentElement.className;
    if (cn != "" && cn != "quiz")
    {
        throw new Error("Parent of 'main-info' is neither empty nor \"quiz\"");
    }

    if (!isQuiz())
    {
        ensureElementExists("supplement-rad-name-notes");
        ensureElementExists("supplement-kan-meaning-notes");
        ensureElementExists("supplement-voc-meaning-notes");
        ensureElementExists("supplement-kan-reading-notes");
        ensureElementExists("supplement-voc-reading-notes");

        ensureElementExistsAndHasClass("supplement-voc-reading", "pure-u-3-4");
        ensureElementExistsAndHasClass("supplement-voc-meaning", "pure-u-3-4");
        ensureElementExistsAndHasClass("supplement-kan-reading", "pure-u-3-4");
        ensureElementExistsAndHasClass("supplement-kan-meaning", "pure-u-3-4");
        ensureElementExistsAndHasClass("supplement-rad-name", "pure-u-1");
    }
}

/**
 * Throws an exception if the given id doesn't exist in the DOM tree.
 * @return the element if it exist
 */
function ensureElementExists(id)
{
    var element = document.getElementById(id);
    if (element == null)
    {
        throw new Error(id + " does not exist");
    }
    return element;
}

/**
 * Throws an exception if the given id doesn't exist in the DOM tree.
 */
function ensureElementExistsAndHasClass(id, className)
{
    var element = ensureElementExists(id);
    if (element.getElementsByClassName(className)[0] == null)
    {
        throw new Error(id + " does not contain any element with class: " + className);
    }
}
