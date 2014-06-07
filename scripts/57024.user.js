/* Dreamwidth Dynamic Reading Page Expand/Collapse

This script works on both reading and network pages.

Occasionally, you should clear the saved collapses and deletions, which persist
and will gradually take up more and more memory.

COPY, USE, MODIFY, and SPREAD as you see fit.

Note: This script *does* keep track of the user of the entry, for purposes
down the line, although it seems extraneous now.

TODO:

* Add collapsed and hidden to entry classes when they're in that state
* Add flagging
* Add autocollapse (or autoexpand) for listed journals
* Add autocollapse for Twitter posts

*/

// ==UserScript==
// @name           DW Post Expand/Collapse/Hide
// @version        0.2
// @namespace      dw
// @description    Adds the ability to expand/collapse posts on reading/network pages.  Works with core2 styles.
// @include        http://*.dreamwidth.org/*
// @exclude        http://*.dreamwidth.org/profile*
// @exclude        http://*.dreamwidth.org/calendar*
// @exclude        http://*.dreamwidth.org/tag*
// @exclude        http://*.dreamwidth.org/*.html
// ==/UserScript==

(function(){

// SCRIPT SETTINGS
// these should stay the same

// Values saved for different states
var EXPANDED = 0;  // Original entry
var COLLAPSED = 1; // Collapse entry, hides certain items from view
var HIDDEN = 2;   // Hidden entirely

// Set the names of states
var states = new Array();
states[EXPANDED] = "expanded";
states[COLLAPSED] = "collapsed";
states[HIDDEN] = "hidden";

// END SCRIPT SETTINGS //
        
// SCRIPT OPTIONS //

// Can change this to COLLAPSED if you want everything to be collapsed by default
// Don't set to HIDDEN, then you'll never see anything.
var default_state = EXPANDED;

// Lets you customize what classes inside entry-wrapper collapse
// See this for more info on classes in entries:
// http://wiki.dwscoalition.org/notes/S2_CSS:_Entry_ids_and_classes
// Don't collapse "entry-title", because that's where the controls go
var collapseables = new Array("entry-content", "metadata", "userpic", "entry-management-links");
// Other possible common choices: "datetime", "entry-interaction-links", "tags"

// This is so people can customize it to be [] or {}
var link_left_bracket = "(";
var link_right_bracket = ")";

// This is so people can customize to say "collapse" or "expand" or "delete"
var link_collapse = "-";
var link_expand = "+";
var link_hide = "x";

// END SCRIPT OPTIONS //

// Gets the desired state of an entry 
function getEntryState(user, entry_id) {
    // because expanded entries aren't saved, use that as the default value
    return GM_getValue(user+":"+entry_id, default_state);
}

// Gets the flag value of an entry
function getEntryFlag(user, entry_id) {
    return GM_getValue(user+":"+entry_id, false)
}

// Sets the desired state of an entry
function setEntryState(user, entry_id, state) {
     // delete the state if it is the default 
     if( state == default_state ) {
         GM_deleteValue(user+":" + entry_id);
     } else {
         // set the state otherwise
         GM_setValue(user+":" + entry_id, state);
     }
}

// Gets an entry on the page if it exists by the entry id
function getEntry(user, entry_id) {
    // gets an entry on the page if it exists
    return document.getElementById('entry-wrapper-' + entry_id);
}

// Sets the entry state link by the post title
function setEntryStateLink(user, entry_id) {
    var state = getEntryState(user, entry_id);
    var entry = getEntry(user, entry_id);
    
    // remove any existing entry state links
    var entry_state = document.getElementById("entryCollapseState-" + entry_id);
    if( entry_state ) {
        entry_state.parentNode.removeChild(entry_state);
    }
    
    var title = entry.getElementsByClassName("entry-title")[0];
    
    title.appendChild( document.createTextNode(" "));
    
    // Create a span containing the collapse and hide link
    var span, collapse_link, collapse_link_text, hide_link;
    link_span = document.createElement("span");
    link_span.className = "entryCollapseState";
    link_span.id = "entryCollapseState-" + entry_id;
    
    state_link = document.createElement("a");
    state_link.href = "#";
    
    // Figure out which action link to create -- collapse or expand
    if( state == EXPANDED ) {
        state_link.addEventListener('click', function(event) { collapseEntry(user, entry_id); event.stopPropagation(); event.preventDefault(); }, true);
        state_link_text = link_collapse;
        state_link.className = "entry-collapse-link";
        state_link.title = "Collapse entry";
    }
    else if( state == COLLAPSED ) {
        state_link.addEventListener('click', function(event) { expandEntry(user, entry_id); event.stopPropagation(); event.preventDefault(); }, true);
        state_link_text = link_expand;
        state_link.className = "entry-expand-link";
        state_link.title = "Expand entry";
    }
    
    state_link.appendChild( document.createTextNode(state_link_text) );
    
    link_span.appendChild( document.createTextNode(link_left_bracket) );
    link_span.appendChild( state_link );
    link_span.appendChild( document.createTextNode(link_right_bracket ));
    
    hide_link = document.createElement("a");
    hide_link.href = "#";
    hide_link.addEventListener('click', function(event) { hideEntry(user, entry_id); event.stopPropagation(); event.preventDefault(); }, true);
    hide_link.title = "Hide entry";
    hide_link.appendChild( document.createTextNode(link_hide) );
    
    link_span.appendChild( document.createTextNode(" "));
    link_span.appendChild( document.createTextNode(link_left_bracket) );
    link_span.appendChild( hide_link );
    link_span.appendChild( document.createTextNode(link_right_bracket ));
    
    title.appendChild( link_span );
}

// This collapses an entry according to the array of collapseables above. 
function collapseEntry(user, entry_id) {
    setEntryState(user, entry_id, COLLAPSED);
    var entry = getEntry(user, entry_id);
    // hide stuff
    if( entry ) {
        // collapse each class in our list
        for( var collapse_index in collapseables ) {
            var collapse = entry.getElementsByClassName(collapseables[collapse_index]);
            if( collapse.length > 0 ) {
                collapse[0].style.display = 'none';
            }
        }
        setEntryStateLink(user, entry_id);
    }
}

// Expands a collapsed entry
function expandEntry(user, entry_id) {
    setEntryState(user, entry_id, EXPANDED);
    // unhide stuff
    var entry = getEntry(user, entry_id);
    if( entry ) {
        for( var expand_index in collapseables ) {
            var expand = entry.getElementsByClassName(collapseables[expand_index]);
            if( expand.length > 0 ) {
                expand[0].style.display = '';
            }
        }
        setEntryStateLink(user, entry_id);
    } else {
        GM_log("Did not find this entry: " + entry_id);
    }
}
                               
// This hides an entry from showing up entirely. 
function hideEntry(user, entry_id) {
    setEntryState(user, entry_id, HIDDEN);
    // set entry to be hidden entirely
    var entry = getEntry(user, entry_id);
    if( entry ) {
        entry.style.display = 'none';
    } else {
        GM_log("Did not find this entry: " + entry_id);
    }
}

// deletes all collapsed or expanded values
function clearCollapsedValues() {
    GM_log("Clearing list of collapsed entries");
    for each(var val in GM_listValues()) {
        var state = GM_getValue(val);
        if(state == COLLAPSED || state == EXPANDED) GM_deleteValue(val);
    }
}

// deletes all deleted values
function clearHiddenValues() {
    for each(var val in GM_listValues()) {
        if(GM_getValue(val) == HIDDEN) GM_deleteValue(val);
    }
}

function clearAllValues() {
    for each(var val in GM_listValues()) {
        GM_deleteValue(val);
    }
}

// Sets the page up on load
function setupCollapsePage() {
    var entries = document.getElementsByClassName('entry-wrapper');
    var user_from_classes = new RegExp("journal-([a-z0-9_]+) ");
    var entry_from_id = new RegExp("entry-wrapper-([0-9]+)");
    
    for	( var entry_index in entries ) {
        var user, entry;
        
        classmatch = user_from_classes.exec(entries[entry_index].className);
        if( classmatch == null ) {
            GM_log("Error matching user: " + entries[entry_index].className);
            user = "(null)";
        } else {
            user = classmatch[1];
        }
        
        entrymatch = entry_from_id.exec(entries[entry_index].id);
        if( entrymatch == null ) {
            GM_log("Error matching entry id: " + entries[entry_index].id);
            entry_id = "(null)";
        } else {
            entry_id = entrymatch[1];
        }
        
        // make sure entry's state is correctly set
        var state = getEntryState( user, entry_id );
        
        if( state == COLLAPSED ) {
            collapseEntry( user, entry_id );
        } else if ( state == HIDDEN ) {
            hideEntry( user, entry_id );
        }
        
        if( state != HIDDEN ) {
            setEntryStateLink(user, entry_id)
        }
    }
}


// Register menu commands
GM_registerMenuCommand("Clear hidden entry values", clearHiddenValues);
GM_registerMenuCommand("Clear expanded/collapsed entry values", clearCollapsedValues);
GM_registerMenuCommand("Clear all DW Post data", clearAllValues);

// Set up the page
setupCollapsePage();
})();