// ==UserScript==
// @name     _Add a Sidebar to a page with auto fade and keyboard shortcut
// @include  http://stackoverflow.com/questions/14722302/*
// @include  *
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant    GM_addStyle
// ==/UserScript==

var toAppend1 = '                                                    \
    <div id="gmRightSideBar">                                       \
        <p>F9 toggles visibility</p>                                \
        <ul>                                                        \
';
var toAppend2 = '                                                   \
        </ul>                                                       \
    </div>                                                          \
';

function generateLink(theString){
	return "<a href = '"+theString+"'>"+theString+"</a><br />";
}

function generateLinks(theStrings){
    var toReturn = "";
    for(var i = 0; i < theStrings.length; i++){
    	toReturn += generateLink(theStrings[i]);
    }
    return toReturn;
}

function generateOnPage(thePage, theStrings){
    if(window.location.href == (thePage)){
    	return generateLinks(theStrings);
    }
    else{
    	return "";
    }
}

function generateOnAllPages(theStrings){
    var toReturn = "";
    for(var i = 0; i < theStrings.length; i++){
    	toReturn += generateOnPage(theStrings[i], theStrings);
    }
    return toReturn;
}

function generateOnAllPageGroups(theStrings){
    var toReturn = "";
    for(var i = 0; i < theStrings.length; i++){
    	toReturn += generateOnAllPages(theStrings[i]);
    }
    return toReturn;
}

$("body").append(toAppend1 + generateOnAllPageGroups([["https://www.facebook.com/", "https://www.google.com/"], ["http://www.minecraftforum.net/", "http://www.minecraftwiki.net/wiki/Minecraft_Wiki"]]) + toAppend2);

//-- Fade panel when not in use
var kbShortcutFired = false;
var rightSideBar    = $('#gmRightSideBar');
rightSideBar.hover (
    function () {
        $(this).stop (true, false).fadeTo (50,  1  );
        kbShortcutFired = false;
    },
    function () {
        if ( ! kbShortcutFired ) {
            $(this).stop (true, false).fadeTo (900, 0.1);
        }
        kbShortcutFired = false;
    }
);
rightSideBar.fadeTo (2900, 0.1);

//-- Keyboard shortcut to show/hide our sidebar
$(window).keydown (keyboardShortcutHandler);

function keyboardShortcutHandler (zEvent) {
    //--- On F9, Toggle our panel's visibility
    if (zEvent.which == 120) {  // F9
        kbShortcutFired = true;

        if (rightSideBar.is (":visible") ) {
            rightSideBar.stop (true, false).hide ();
        }
        else {
            //-- Reappear opaque to start
            rightSideBar.stop (true, false).show ();
            rightSideBar.fadeTo (0, 1);
            rightSideBar.fadeTo (2900, 0.1);
        }

        zEvent.preventDefault ();
        zEvent.stopPropagation ();
        return false;
    }
}

GM_addStyle ( "                                                     \
    #gmRightSideBar {                                               \
        position:               fixed;                              \
        top:                    0;                                  \
        right:                  0;                                  \
        margin:                 1ex;                                \
        padding:                1em;                                \
        background:             orange;                             \
        width:                  100px;                              \
        z-index:                6666;                               \
        opacity:                0.9;                                \
    }                                                               \
    #gmRightSideBar p {                                             \
        font-size:              80%;                                \
    }                                                               \
    #gmRightSideBar ul {                                            \
        margin:                 0ex;                                \
    }                                                               \
    #gmRightSideBar a {                                             \
        color:                  blue;                               \
    }                                                               \
" );