// ==UserScript==
// @name          delicious star rater
// @namespace     http://thomd.net/userscript
// @description   Rate your most favourite bookmarks on delicious.com with stars. Rated bookmarks will be highlighted within the bookmarks list for easy recognition.
// @include       http://delicious.com/*
// @include       http://*.delicious.com/*
// @author        Thomas Duerr
// @version       0.11
// @date          2010-09-29
// @change        new highlight color 
// ==/UserScript==


//
// xpath helper
//
function $x(p, context){
    contextNode = context || document;
    var i, arr = [], xpr = document.evaluate(p, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}




//
// star rater class
//
var StarRater = function(type){

    // type of editing ["page" || "inline"]
    var editType = type || "page";

    // utf-8 (in hex) value of star-symbol
    var tag_utf8_hex = "%E2%98%85";

    // html entity (in hex) of star-symbol
    var tag_html_entity_hex = "&#x2605;";

    // maximum number of stars
    var max = 5;

    // current fieldset element
    var fieldset = null;

    // current tagfield element
    var tagfield = null;

    // contextNode 
    var contextId = "";

    // contextNode 
    var contextNode = document;

    // current rating
    var currentRating = 0;

    // styles for bookmark highlighting
    var css_highlight  = "ul.bookmarks li.post .bookmark{padding:4px 0 2px 4px;}";
        css_highlight += "ul.bookmarks li.post .flickr{min-height:85px;padding-left:95px;}";
        css_highlight += "ul.bookmarks .star{background: #EFF7FF;}";
        css_highlight += "ul.bookmarks .star div.data h4{font-weight:bold;}";
        css_highlight += "ul.bookmarks .star div.data div.description{font-weight:bold;}";
        css_highlight += "ul.bookmarks .star ul.tag-chain li.off a{color:#333;background:#DFEFFF;}";
        css_highlight += "ul.bookmarks .star ul.tag-chain li.off:hover a{color:#FFF;background:#1259C7;}";
        css_highlight += "#actions-list li #sidebar-actions-highlight {background-color: transparent; background-repeat: no-repeat; ";
        css_highlight += "background-position: 6px -1px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAA";
        css_highlight += "AQCAYAAADJViUEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALZJREFUeNpiNCq5yIAHGADxBWwSZ7v1GJjwaB";
        css_highlight += "QA4gX4TManOQCI9aGGkKUZmSZJswMhzSzQQEFXoADE/EiGNGDR28ACDU2Q5nocFvCjyX0E4gRkZ4NMDoRK4AMXoS7dgO7nDVAJXBE/ES";
        css_highlight += "r/AFeAgSQO4NB8gJjQDiAQdTg1g5wlD2UvBGJHJG84ENKcAA20RCj7AFTTQqihBujxjB6/DmiZ4QOSQQHIcoz///9nIBcwMVAAAAIMAG";
        css_highlight += "CGI2SpweGIAAAAAElFTkSuQmCC); outline: none;}";
        css_highlight += "#sidebar {margin-top: 20px;}";

    // styles for rater component
    var css_rater  = ".inlineeditor .ratingfield {height: 3em !important;}";
        css_rater += ".ratingfield ul {font-size: 144%; float: left; margin-right: 9px;}";
        css_rater += ".ratingfield li {display: inline; color: #D2D2D2; padding: 0 0 0 2px; cursor: pointer;}";
        css_rater += ".ratingfield li.ratinghigh {color: #3274D0;}";
        css_rater += ".ratingfield li.rated {color: #666;}";
        css_rater += "#saveitem .ratingfield label {padding: 4px 0 0;}";
        css_rater += ".ratingfield span.hint {color: #888; font-size: 84%; display: block; padding: 4px 0 0; width: 100%; height: 16px;}";
        css_rater += ".ratingfield span.remove {display: none; font-size: 84%; padding: 4px 0 0; float: left; cursor: pointer; color:#1462C1; margin-right: 11px;}";
        css_rater += ".inlineeditor .ratingfield label {padding: 1px 0 0;}";

    // get current rating
    var getCurrentRating = function() {
        return (encodeURI($x(".//input[@name='tags']", contextNode)[0].value).match(/%E2%98%85/g) || []).length;
    };

    // highlight stars with current rating
    var setHighlight = function() {
        document.getElementById("remove" + contextId).style.display = currentRating == 0 ? "none" : "block";
        for (var i = 0; i < currentRating; i++){
            document.getElementById("rating" + i + contextId).className = "rated";
        }
    };

    // show stars highlighted
    var showHighlight = function() {
        var choosen = parseInt(this.id.replace(/rating/, ""));
        resetHighlight();
        for (var i = 0; i <= choosen; i++){
            document.getElementById("rating" + i + contextId).className = "ratinghigh";
        }
        document.getElementById("hint" + contextId).innerHTML = "rate" + (currentRating != 0 ? " now" : "") + " with " + i + " star" + ((i > 1) ? "s" : "") + ((i == max) ? "!" : "");	
    };

    // reset highlighting of stars
    var resetHighlight = function() {
        for (var i = 0; i < max; i++){
            document.getElementById("rating" + i + contextId).className = "";
        }
        document.getElementById("hint" + contextId).innerHTML = "";	
        setHighlight();
    };

    // set new rating within tags-field
    var setRatingTags = function() {
        var choosen = parseInt(this.id.replace(/rating/, ""));
        var newRating = "";
        for (var i = 0; i <= choosen; i++){
            newRating += decodeURI(tag_utf8_hex);
        }
        var tagsField = $x(".//input[contains(@id, 'tags')]", contextNode)[0];
        var position = encodeURI(tagsField.value).indexOf(tag_utf8_hex);
        if(position == -1){
            tagsField.value = decodeURI(encodeURI(tagsField.value + " ") + newRating) + " ";
        } else {
            var tagsValue = encodeURI(tagsField.value).replace(/%E2%98%85/g, "");
            tagsField.value = decodeURI(tagsValue.substring(0, position) + newRating + tagsValue.substring(position, tagsValue.length));
        }
        tagsField.focus();
        currentRating = getCurrentRating();
    };

    // remove rating within tags-field
    var removeRatingTags = function() {
        var tagsField = $x(".//input[contains(@id, 'tags')]", contextNode)[0];
        tagsField.value = decodeURI(encodeURI(tagsField.value).replace(/%E2%98%85/g, ''));
        tagsField.value = tagsField.value.replace(/  /g, ' ');
        tagsField.focus();
        currentRating = getCurrentRating();
        resetHighlight();
    };

    // get text for highlight option
    var highlightText = function(){
        return GM_getValue("highlight", false) ? "Remove Highlighting" : "Highlight rated bookmarks";
    }

    // save highlighting state of rated bookmarks
    var toggleHighlightState = function(ev) {
        ev.preventDefault();
        var state = !GM_getValue("highlight", false);
        GM_setValue("highlight", state);
        bookmarks.highlightBookmarks(state);
        document.getElementById("sidebar-actions-highlight").innerHTML = highlightText();
    };


    //
    // public fields and methods
    //
    var constructor = function(){

        // add styles for bookmark highlighting
        this.addHighlightStyle = function() {
            GM_addStyle(css_highlight);
        };

        // add styles for rater component
        this.addRaterStyle = function() {
            GM_addStyle(css_rater);
        };

        // set fieldset element
        this.setFieldset = function(element) {
            fieldset = element;
        };

        // set tagfield element
        this.setTagfield = function(element) {
            tagfield = element;
        };

        // set contextNode
        this.setContextNode = function(node) {
            contextNode = node;
            contextId = node.id.replace(/editor-wrapper/, "");
        };

        // highlight all rated bookmarks within current page
        this.highlightBookmarks = function(doHighlight) {
            var bookmarks = $x("//a[contains(@href, '" + tag_utf8_hex + "')]//ancestor::div[contains(@class, 'bookmark')]");
            for (bookmark in bookmarks){
                if(doHighlight){
                    bookmarks[bookmark].className += " star";
                } else {
                    bookmarks[bookmark].className = bookmarks[bookmark].className.replace(/ star/, "");
                }
            }
        };

        // build options for enable/disable highlighting of rated bookmarks
        this.buildOptions = function(){
            var context = document.getElementById("actions-list");
            var li = document.createElement("li");
                li.id = "bookmark-highlight";
            var a = document.createElement("a");
                a.href = "";
                a.id = "sidebar-actions-highlight";
                a.addEventListener("click", toggleHighlightState, false);
                a.appendChild(document.createTextNode(highlightText()));
            li.appendChild(a);
            context.insertBefore(li, document.getElementById("actionTagOpts"));
        };

        // highlight a specific bookmark only
        this.highlightBookmark = function(context) {

            var bookmark = $x(".//a[contains(@href, '" + tag_utf8_hex + "')]//ancestor::div[contains(@class, 'bookmark')]", context)[0];
            if(typeof(bookmark) != 'undefined'){
                bookmark.className += " star";
            }
        };

        // build rater
        this.build = function() {

            currentRating = getCurrentRating();

            // generate container
            var ratingfield       = document.createElement("div");
            ratingfield.id        = "ratingfield";
            ratingfield.className = "field ratingfield";

            // generate label-element and append to container
            var label = document.createElement("label");
            if(editType == "inline"){
                label.appendChild(document.createTextNode("RATING"));
            } else {
                var strong = document.createElement("strong");
                strong.appendChild(document.createTextNode("RATING"));
                label.appendChild(strong);
            }
            ratingfield.appendChild(label);

            // generate rating-elements and append to container
            var ul = document.createElement("ul");
            var li = [];
            for(var i = 0; i < max; i++){
                li[i] = document.createElement("li");
                li[i].id = "rating" + i + contextId;
                li[i].innerHTML = tag_html_entity_hex;
                li[i].addEventListener("mouseover", showHighlight,  false);
                li[i].addEventListener("mouseout",  resetHighlight, false);
                li[i].addEventListener("click",     setRatingTags,   false);
                ul.appendChild(li[i]);
            }
            ratingfield.appendChild(ul);

            // generate remove-element and append to container
            var remove = document.createElement("span");
                remove.appendChild(document.createTextNode("remove?"));
                remove.className = "remove";
                remove.id = "remove" + contextId;
                remove.addEventListener("click", removeRatingTags, false);
            ratingfield.appendChild(remove);

            // generate hint-element and append to container
            var hint = document.createElement("span");
                hint.className = "hint";
                hint.id = "hint" + contextId;
            ratingfield.appendChild(hint);

            fieldset.insertBefore(ratingfield, tagfield.nextSibling);

            // pre-set a possible current rating
            setHighlight();
        };		
    }

    return new constructor();
}





var bookmarklist = document.getElementById("bookmarklist");

// ----- USECASE 1:  highlight rated bookmarks ------------------------------------------------------------------------
if(bookmarklist){

    // instanciate star rater für highlighting
    var bookmarks = new StarRater();
    bookmarks.addHighlightStyle();
    
    // set highliting depending on state
    var doHighlight = GM_getValue("highlight", false);
    bookmarks.highlightBookmarks(doHighlight);

    // build highlighting option    
    bookmarks.buildOptions();
}




// ----- USECASE 2:  add a star-rater within inline-edit --------------------------------------------------------------
if(bookmarklist){
    var injectInlineRater = function(evt){

        // remove this event listener to make sure it will only be accessed once
        bookmarklist.removeEventListener("DOMNodeInserted", injectInlineRater, true);

        // build star-rater
        var inlineStarRater = new StarRater("inline");
        inlineStarRater.setContextNode(evt.target);		
        inlineStarRater.setFieldset($x(".//fieldset", evt.target)[0]);
        inlineStarRater.setTagfield($x(".//fieldset//div[contains(@class, 'tagfield')]", evt.target)[0]);
        inlineStarRater.addRaterStyle();
        inlineStarRater.build();

        var save = $x(".//button[@name='save']", evt.target);
        save[0].addEventListener("click", function(){
            var highlight = function(saveEvt){
                bookmarklist.removeEventListener("DOMNodeInserted", highlight, true);

                // after inline save: highlight again and set click-event on EDIT because it is a new node
                inlineStarRater.highlightBookmark(saveEvt.target);
                var edit = $x(".//a[@class='action edit']", saveEvt.target)[0];
                edit.addEventListener("click", function(){
                    bookmarklist.addEventListener("DOMNodeInserted", injectInlineRater, true);
                }, true);
            }
            bookmarklist.addEventListener("DOMNodeInserted", highlight, true);
        }, true);
    }

    // find EDIT-link of all bookmarks and attach an DOMNodeInserted-event when clicking on it (because edit-form is ajax-loaded)
    var edits = $x("//a[@class='action edit']");
    for (edit in edits){
        edits[edit].addEventListener("click", function(){
            bookmarklist.addEventListener("DOMNodeInserted", injectInlineRater, true);
        }, true);
    }
}




// ----- USECASE 3:  add a star-rater in full-screen-edit page and bookmarklet ----------------------------------------
if(document.getElementById("newitem")){
    var pageStarRater = new StarRater("page");
    pageStarRater.setFieldset($x("//form[@id='saveitem']//fieldset")[0]);
    pageStarRater.setTagfield($x("//form[@id='saveitem']//fieldset//div[@id='tagfield']")[0]);
    pageStarRater.addRaterStyle();
    pageStarRater.build();

    // correct popup height
    if(/popup/.test(document.getElementById("newitem").className)){
        window.innerHeight += 60;
    }
}





//
// ChangeLog
// 2008-11-02 - 0.1    - created
// 2008-11-10 - 0.2    - refactoring: rating is now implemented with module-pattern (singleton).
// 2008-11-12 - 0.3    - problems with module-pattern fixed (delicious allowes multi inline-edits).
// 2008-11-14 - 0.4    - rating is now possible in inline-edit mode.
// 2008-11-20 - 0.5    - edit form shows now a remove-link if there is already a reating.
// 2009-01-04 - 0.6    - correct height of posting popup to make complete tag list visible.
// 2009-02-23 - 0.7    - integration of userscripts update notification.
// 2009-02-24 - 0.8    - highlighting of rated bookmarks is now optional.
// 2009-03-27 - 0.9    - minor layout bugfix for flickr bookmarks.
// 2009-08-04 - 0.10   - minor layout bugfix due to new feature for sending links.
// 2010-05-11 - 0.10.1 - changed url for script-updater-check and increased check interval.
// 2010-09-29 - 0.11   - new highlight color



//
// ---------- userscript updater --------------------------------------------------------------------------------------
//
var userscriptUpdater = function(){

    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 604800,                                    // default check interval: check once a day [in seconds]
        injectInto:    document.getElementsByTagName("body")[0],  // default dom-node for the updater-message to be inserted
        updaterCss:    css                                        // default styles of updater message
    };
    var lastCheck   = GM_getValue("lastCheck", 0);
    var lastVersion = GM_getValue("lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)[\r\n]/,
        change:     /@change\s+(.*)[\r\n]/,
        depricated: /@depricated\s+(.*)[\r\n]/
    };
    var updater;


    // check remote userscript for version
    var checkRemoteUserscript = function(){
        GM_xmlhttpRequest({
            method:  "GET",
            url:     "http://userscripts.org/scripts/source/" + config.scriptId + ".meta.js",
            headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue("lastCheck", currentTime);
                for(m in meta){meta[m] = (meta[m].exec(resp.responseText) ? meta[m].exec(resp.responseText)[1] : null);}
                if(isNewer(meta.version, config.currentVersion) && isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                }
            }
        });
    };


    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p){
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp){
            if(parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if(parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if(parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    };


    // skip current update until next
    var skipUpdate = function(ev){
        ev.preventDefault();
        GM_setValue("lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    };


    // initialization
    var initialize = function(options){

        // merge options into config
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}

        // already checked for an update today?
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };


    // build updater message and inject it into DOM
    var build = function(){
        var updater = document.createElement("div");
            updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
            hide.className = "greasemonkey_updater_link_to_hide";
        if(meta.depricated == null){
            var a_hide = document.createElement("a");
                a_hide.href = "";
                a_hide.addEventListener("click", skipUpdate, false);
            var a_span = document.createElement("span");
                a_span.appendChild(document.createTextNode("Skip until next Update!"));
            a_hide.appendChild(a_span);
            hide.appendChild(a_hide);
        }
        var h1 = document.createElement("h1");
            h1.appendChild(hide);
            h1.appendChild(document.createTextNode(meta.depricated == null ? "Greasemonkey UserScript Update Notification!" : "Depricated Greasemonkey UserScript!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if(meta.depricated == null){
            var text = "There is an update available for <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a>.<br>";
                text += meta.change ? "<br>" + meta.change + "<br><br>" : "";
                text += "You are currently running version <b>" + config.currentVersion + "</b>, the newest version on userscripts.org is <b>" + meta.version + "</b>!<br><a href=\"http://userscripts.org/scripts/source/" + config.scriptId + ".user.js\">Update to Version " + meta.version + "</a>";
        } else {
            var text = "The userscript <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> is now depricated.<br>";
                text += meta.depricated && meta.depricated != "true" ? "<br>" + meta.depricated + "<br><br>" : "";
                text += "Please remove your script! Thanks for using it.";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) : config.injectInto.appendChild(updater));
        return updater;
    };

    return { init: initialize };
}();


// initialize updater
userscriptUpdater.init({
    scriptId:       "36457",
    currentVersion: "0.11",
    injectInto:     document.getElementById("pagetitle")
});
