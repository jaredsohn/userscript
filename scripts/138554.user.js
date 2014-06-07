// ==UserScript==
// @name           Reddit Hide Read Comments
// @namespace      Misael.K
// @description    Saves which comments have been collapsed in each Reddit thread, and re-collapses them if you visit the thread later.
// @include        http://www.reddit.com/r/*/comments/*
// @require        http://pastebin.com/raw.php?i=UAfz8TrP
// @require        http://pastebin.com/raw.php?i=NdY2DLVE
// @grant          none
// ==/UserScript==

/*! 
 * PersistJS library by Paul Duncan
 * http://pablotron.org/software/persist-js/
 *
 * jQuery compatibility technique by wiz722
 * http://forum.jquery.com/topic/importing-jquery-1-4-1-into-greasemonkey-scripts-generates-an-error#14737000001031881
 */

// options
var DAYS_TO_KEEP_STORE = 7;

 // shared variables
var store;
var comments = [];
var DAYS_IN_MS = 1000.0 * 60 * 60 * 24;

// ###############
var debug = false;
// ###############

// loads the data when the DOM is ready,
// and saves whenever the user collapses or
// uncollapses a comment
$(document).ready(function() {

    loadData();

    // the saveData function receives the ID of the collapsed
    // or uncollapsed comment
    $("body").on("click", "a.expand", function(event) {
        saveData($(this)
            .parents("div.entry")
            .find("li.first a.bylink")
            .attr("href").slice(-7));
    });
});

function initStore() {
// using PersistJS, a new Store is generated each time
// a new thread is visited

    var threadID = window.location + "";
    threadID = threadID.split("/")[6];
    var currentStoreID = "Reddit Thread " + threadID;

    // the store works as a persistant dictionary, where
    // all the data saved is saved with a key.
    // the values are saved as a string, thus making the use
    // of JSON optimal when saving JS objects directly.
    store = new Persist.Store(currentStoreID);
    
    // maintenance work
    emptyOldStores(currentStoreID);
}

function emptyOldStores(currentStoreID) {
// adds the current store to the stores list, and empties
// old stores (store removal is not available in PersistJS)

    var time = Number(new Date());

    // old store cleanup
    var metaStore;
    var stores = [];
    var oldStore;
    var timePassed = 0;
    var storesToDelete = [];
    var currentStoreExists = false;
    
    // creates a meta-store that saves the store ID and date,
    // which allows the purge of old stores
    metaStore = new Persist.Store("stores");
    var currentStoreInformation = {
            "store_id": currentStoreID,
            "creation_date": JSON.stringify(new Date())
    };
    metaStore.get("stores", function(ok, val) {
        if (ok && !!val) {
            stores = JSON.parse(val);
            if (debug) console.log(stores.length, "store(s) found");
        }
    });
    // if the current store hasn't been added yet, add it
    for (var i = 0; i < stores.length; i++) {
        if (stores[i]["store_id"] == currentStoreID) {
            currentStoreExists = true;
            break;
        }
    }
    if (!currentStoreExists) {
        stores.push(currentStoreInformation);
    }
    
    // empties stores older than DAYS_TO_KEEP_STORE
    i = stores.length - 1;
    while (i >= 0) {
        timePassed = new Date() - new Date(JSON.parse(stores[i]["creation_date"]));
        if (timePassed / DAYS_IN_MS >= DAYS_TO_KEEP_STORE) {
            oldStore = new Persist.Store(stores[i]["store_id"])
            try {
                oldStore.remove("comments");
            } catch(e) {
                if (debug) console.log(e.name, e.message)//, e.fileName, e.lineNumber, e.stack);
            }
            stores.splice(i, 1);
            if (debug) console.log("deleted:", i, stores.length);
        }
        i--;
    }

    metaStore.set("stores", JSON.stringify(stores));
    if (debug) console.log(stores.length, "store(s) remain");
    
    if (debug) console.log ("emptyOldStores: " + (Number(new Date()) - time) + "ms");
    
}

function loadData() {
// hides (collapses) each saved comment

    initStore();

    var time = Number(new Date());

    // gets the list of saved comments from the store
    store.get("comments", function(ok, val) {
        if (ok && !!val) {
            comments = JSON.parse(val);
            if (debug) console.log(comments.length + " comments");
        }
    });
    
    // cycles through each saved comment and hides it
    for (var i = 0; i < comments.length; i++) {
        var thing = $("div.commentarea .thing.id-t1_" + comments[i]);
        $(thing).find("div.noncollapsed:first").hide();
        $(thing).find("div.midcol:first").hide();
        $(thing).find("div.collapsed:first").show();
        $(thing).find("div.child:first").hide();
        if (debug) console.log("get " + comments[i]);
    }

    if (debug) console.log ("loadData: " + (Number(new Date()) - time) + "ms");

}

function saveData(newCommentID) {
// saves the current state of the comment's ID passed as
// an argument, and then updates the saved comments list

    // if the comment is visible, saves its comment ID,
    // otherwise deletes it from the saved comments list
    var commentStyle = $("div.commentarea .thing.id-t1_" + 
            newCommentID + " div.noncollapsed:first").attr("style");
    // checking for "display:none" rather than ":visible"
    // allows checking independently from the parent's state
    // (that is, ":visible" returns false if the parent is hidden
    // but the child is not, because the child is, in fact, 
    // not visible)
    if (commentStyle == "display: none;") {
        comments.push(newCommentID);
    } else {
        if (comments.indexOf(newCommentID) >= 0) {
            comments.splice(comments.indexOf(newCommentID), 1);
        }
    }

    // saves the comments list to the store
    store.set("comments", JSON.stringify(comments));

    if (debug) console.log("saveData", newCommentID, commentStyle);
}