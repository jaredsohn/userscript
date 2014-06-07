// ==UserScript==
// @name       TradeMe Killfile
// @namespace  http://drsr/
// @version    2.7
// @updateURL  http://userscripts.org/scripts/source/123364.meta.js
// @description  Killfile for Trademe Message board using blacklist. Messages by users on the Trademe blacklist are given a special style
// @include    http://www.trademe.co.nz/Community/MessageBoard/*
// @include    http://www.trademe.co.nz/MyTradeMe/BlackList.aspx*
// @include    http://www.trademe.co.nz/Members/Listings.aspx*
// @include    http://www.trademe.co.nz/Members/Logout.aspx*
// @include    http://www.trademe.co.nz/MyTradeMe/Favourites.aspx?pv=3
// @grant      GM_getResourceURL
// @grant      GM_registerMenuCommand
// @grant      GM_addStyle
// @grant      unsafeWindow

// @copyright  public domain
// ==/UserScript==

/* Changes:
v2.7: work with changes to favorite sellers list
v2.6: work with TradeMe changes to a couple of pages
v2.5: gave up on free hosting, all resources inline now
v2.4: make killed threads a bit greyer, faster JS loading, don't load extra jQuery
v2.3: add notes to sellers in Favourites too
v2.2: fix blacklist bar icon height for new look CSS, make auction links in messages underlined
v2.1: add grants for Greasemonkey 1.0
v2.0:
 * Added settings dialog
 * New "Blacklist bar" option by TM poster "king1"
 * Click on greyed text to show original
 * Change greyed text to "herp derp" (idea from www.tannr.com/herp-derp-youtube-comments)
 * Change killed post icon to trollface
 * New "hidden" option for messages and threads

v1.0:
 * Add "Mine" link to the search box to search for your username in all topics. When this link is used,
   sort the search results in descending order of last message time. Normally they are sorted
   by relevance, and the "Newest first" option sorts by the time of your posts, not the last message time.
*/


// TODO:
//  When adding to blacklist scroll down and open the note for edit.
//  Delete saved notes for users that are not on the blacklist
//  Blacklist note import and export
//  Reddit-like link markup [text](url) ?

// replace trademe's JS error handler
window.onerror=function(msg, url, linenumber){
    // console.log('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
        return true;
            };

var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
var GM_config = null;

GM_registerMenuCommand('TradeMe Killfile: Settings',openGMConfig);
    
// TODO make icons configurable?
// trollface.png
var troll_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA6ZJREFUOE+NVGdPm2cURfAFCYl/U5U2HxASXxqSDyjTdWNGiAPUahIUVIwTgRw1UBLTxhbDYWOmQCyxpxhiCrH3EHsKEHtz+p6bkihqQmrp0fv6eZ/n3HvPOffa2V3xy7Il4S9TBKxxZrwKf4Hfg5/i2ZNfZT0P+g1GZS85IRZXYci3/Nx0BPg/gsEQisjISKSnpyMtLQ3l5eWoqKhAVVUV6urqUFNTg/7+fgwMDKCoqAj37939OvjbP/9AXFwcJiYmsLi4iJmZGaytrWF9fR0rKyuYnZ0VoL6+PgHt7OzE/Pw8jo+P0dLSAh/vB18Gt1jMOD09FZDl5WVsbW1JEO5dXFxgaWkJh4eHODs7w+7uLqampiQI909OTmA0GhH95vXn4JGvjVIiLxGwt7cXg4ODEuT8/FyANzY2UFZWhpiYGAQFBSErKwurq6uSMc+Mj4/j+vWfPgHbUt/DbH73kYLR0VEkJydLBlqtFh0dHXKRfBcXFyMnJwcWiwXZ2dnybWRkBMPDw2hoaEBGRga8vTUfwP21D4UjClRdXY3m5mZMT09L9twnx8x4f38fm5ubst/e3i7Z805paancqa2tlSoZOOCxH+x8FdKbmppEqLa2NoyNjYkoFIiKE4gZLywsoLGxUUTkWXLP9/z8fISFhQl9lZWVGBoawg8u38HOpBAeHx8vYBqNRriam5uT0pgRueUegzNLOoZ2y8zMFCvyP+9Tm/r6ehQWFuJn1b/20z7yE6XVajUiIiJgs9k+0kPeeIElk2eWyowZNDw8HHq9XvShiAzo4eGB+Ni/P/DsqxDOiJ6enoiKioLVapXDFInUpKSkiEO6u7sRGBgoriAFdAbdRKq2t7ehUqlgCHn+yRm+Pl7Y29uDm5sbnJycYG9vDwcHB3k6OjrC2dkZOp0OJSUl4hhmR3pyc3OFawLn5eXhF7Xqcx/7PfTB0dGRlJqYmIjU1FTFgmYkJSUJQFdXlzQNhWRbk192HrNkQhT92rUf/9t5Af5a6Z6dnR2xDQNER0cL1wUFBVI2M6Lqra2tEuyytTkGXFy+R0riF4ZRqD5EotOnk5OT4l36lhajpcgv1aeVenp65Ekabt+6pZR//+sDSKcLxMHBgQDRdlwUj4OIi/OAVPCdgO7u7spEuw1r7LurR2bYSz0SEhIka/J4uRiMATgyTSYTXF1d4aVRI1uZ09+cwZcHDPpg3Lt7B/qQEGUeG8RWHCo3b3jAz9cLL0KD/z+YAvoPq0rRAALR3w0AAAAASUVORK5CYII=";
var blacklist_bar_icon = troll_icon;
// note_delete_left.png
var	note_delete_icon = "data:image/gif;base64,R0lGODlhFgAVAPcAAAAAAJmZmZ+fmL6/luPlk+Tmk/Dykvz/kf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAWABUAAAiAAP8JHEjwgMGDCA0SFJiwYcKCDiMqZChRIsWKEf85NDBAQAABAww41JiQgMcAKD8SwHjAwMmUKAWIrDgAJYKUNwMMwPjyZs6PGGEG+ImSJ86hKQVgrInUJsqdFV0KjTmzYoGXMQs0JJmQo0eQVRFyZbl1LNmDA88+TKt2IsSzAQEAOw==";

// Change the post to a blacklist bar, based on code contributed by "king1" on TM
function blacklistBar(post) {
    var poster = $(".MessageAuthor > a > b", post).text();
    var postid = $(".MessageAuthor > small > span", post).text();
    
    var blacklistCode = $("<div>", {
         "class": "BLBC",
         "click": 
             function(){ $(post).toggleClass("hiddenpost"); }
    }).html(
            '<div class="BLBS">' + postid + '</div>'+
            '<div class="BLBSC">Blacklist' +
                (settings.showPosterName ? ' (' + poster + ')' : '') +
            '</div>'+
            '<div class="BLBS">' +
            (settings.useIconBlacklistBar ? '<img src="' + blacklist_bar_icon + '" height="20">' : '&nbsp') + 
             '</div>');
    $(post).addClass("hiddenpost")
        .before(blacklistCode);
}


// replace all text with random "herp derp"
function herpDerp(post) {
    
    var postBody = $(".MessageBody", post);
    var postText = postBody.text();
    
    // make new text roughly the same length
    // TODO: preserve paragraphs and punctuation
    var herpCount = Math.floor(postText.length / 5);
    var derpText = "";
    for (var i=0; i<herpCount; i++) {
        derpText += (Math.random() > 0.5) ? "herp " : "derp ";
    }
    
    // save the underped version
    postBody[0].oldHtml = postBody.html();
    
    derpText = derpText.charAt(0).toUpperCase() + derpText.substr(1).trim() + ".";
    postBody.text(derpText);
}


var GREY_KILL_POST = ".killedpost {background-color:#eeeeee !important; color: #999999 !important; font-size:12px !important;} \
.killedpost p {font-size:12px !important; color:#999999 !important;}";
var GREY_KILL_THREAD = ".killedthread {background-color:#eeeeee !important; color: #999999 !important; font-size:12px !important;} \
.killedthread .title {font-size:12px !important; color:#999999 !important;}\
.killedthread a {color:#999999 !important; font-weight:normal;}";

var KILL_OPTIONS = {
    
    // Grey: threads and posts remain visible but with a grey background and smaller, faded text 
    'Grey': {
           cssPost: GREY_KILL_POST,
           cssThread: GREY_KILL_THREAD,
           textVisible: true
    },
    
    // Invisible: threads and posts are not shown at all, have to turn the script off to read them 
    'Invisible': {
           cssPost: '.killedpost {display:none}',
           cssThread: '.killedthread {display:none}',
           invisible: true
    },

    // Blacklist bar: a placeholder blacklist bar is shown in place of the message. Click to show or hide the message
    'Blacklist bar': {
           cssPost:
".BLBC {border-top:1px solid #eeeeee; border-bottom:1px solid #eeeeee; background-color:#ffffff; display:block; margin-bottom:5px;} \
.BLB {text-align:center; line-height:20px !important; vertical-align:middle; background-color:#eeeeee; width:100%; font-size:10px !important; font-weight:bold; color:silver; display:inline-block; margin:2px 0;} \
.BLBSC {text-align:center; line-height:20px !important; vertical-align:middle; background-color:#eeeeee; width:70%;font-size:10px !important; font-weight:bold; color:silver; display:inline-block; margin:2px 0;} \
.BLBS {text-align:center; line-height:20px !important; height:20px; vertical-align:middle; background-color:#eeeeee; width:15%; font-size:10px !important; font-weight:bold; color:silver; display:inline-block; margin: 2px 0 ; } \
.hiddenpost { display:none; } \
.killedpost {  border-bottom:1px solid silver; padding-bottom:20px; margin-bottom:10px; background-color:#eeeeee !important; color: #999999 !important; font-size:12px !important;} \
.killedpost p {  color:#999999 !important;}", 
           cssThread: "",
           customKill: blacklistBar
    }
};
var KILL_OPTION_DEFAULT = 'Grey';

var settings;

var BLACKLIST_STORAGE_ITEM = "trademeblacklist";

var USERNAME_STORAGE_ITEM = "trademeusername";

var blackList = Object.create(null); // just in case there's a user called "constructor"

function toggleKillPost(post) {
    if ($(post).hasClass("killedpost")) {
        unkillPost(post);
    } else {
        killPost(post);
    }
}

function killPost(post) {
    if (settings.postKill.customKill) {
        settings.postKill.customKill(post);
    } else {
        $(post).addClass("killedpost");
        
        if (!settings.postKill.invisible) {
            
            var messageBody = $(".MessageBody", post);
            // unbind() for repeated clicks after unkill()
            messageBody.unbind('click').click(function() {toggleKillPost(post);});

            if (settings.useTrollIcon) {
                messageBody.css({"background-image": "url('" + troll_icon + "')",
                                 "background-position": "4px 4px"});
            }
            
            if (settings.postKill.textVisible && settings.useHerpDerp) {
                herpDerp(post);
            }
            
        }
    }
}

function unkillPost(post) {
    if (!settings.postKill.customKill) { // custom kill funcs handle their own unkilling
        // unkill the text
        var messageBody = $(".MessageBody", post);
        var oldHtml = messageBody[0].oldHtml;
        if (oldHtml) {
            $(messageBody).html(oldHtml);
            messageBody[0].oldHtml = null;
        }
        $(post).removeClass("killedpost");
    }
}

function killPosts() {
    $("#MessageBoard .MessagePost").each(function(index, post) {
        var poster = $(".nick", post).text();
        if (blackList[poster]) {
            killPost(post);
        } 
    });
}

function decoratePosts() {
    // Hyperlink 9-digit auction numbers, only on child text nodes.
    GM_addStyle(".tmkflink {text-decoration: underline;}");
    $("#MessageBoard .MessageBody > p").contents().each(function(index, text) {
        if (text.nodeType == 3) { 
            var auctionNoRegex = /\b([1-9]\d{8})\b/g;
            var contents = text.textContent; 
            if (auctionNoRegex.test(contents)) {
                $(text).replaceWith($('<span>' + contents.replace(auctionNoRegex, 
                      '<a href="/Browse/Listing.aspx?id=$1" title="Auction link (Killfile script)" class="tmkflink">$1</a>') + '</span>'));
            }
        }
    });
}

function clearBlacklist() {
    sessionStorage.removeItem(BLACKLIST_STORAGE_ITEM);
}

// Do a function that uses the blacklist, with cached loading of the blacklist
// If the blacklist isn't cached the function will only fire after the blacklist page is loaded
function withBlacklist(blacklistFunc) {
    var cachedBlacklist = sessionStorage.getItem(BLACKLIST_STORAGE_ITEM);
    if (cachedBlacklist) {

        blackList = JSON.parse(cachedBlacklist);
        // blackList.__proto__ = null; // just in case there's a user called "constructor"
        blacklistFunc();
        
    } else {
        
        // Chrome caches get() so add unique param
        $.get("http://www.trademe.co.nz/MyTradeMe/BlackList.aspx?unique=" + new Date().getTime(),
              function(data) {
                  $("#theList .nick > a", data).each(function(index, atag) {
                      // href is "/Members/Listings.aspx?member=nnnnnnn
                      var memberId = atag.href.split("member=")[1];
                      if (atag.text!=='__proto__') { // would override the object's prototype
                          blackList[atag.text]=memberId;
                      }
                  });

                  sessionStorage.setItem(BLACKLIST_STORAGE_ITEM, JSON.stringify(blackList));
                  
                  blacklistFunc();
              });
    }
}

function loadBlacklistAndKillPosts() {
    GM_addStyle(settings.postKill.cssPost);
    withBlacklist(killPosts);
}

function killThreads() {
    $("#ThreadListContainer .byline").each(function(index, byline) {
        var bylineText = $(byline).text();
        // in All Threads mode the board name comes before "Started by xxxxx"
        if (bylineText.indexOf("Started") > 0) {
            bylineText = bylineText.substring(bylineText.indexOf("Started"));
        }
        var userName = bylineText.split(" ")[2];
        if (userName && blackList[userName]) {
            $(byline).parent().parent().addClass("killedthread");
        }
    });
}
                          
function loadBlacklistAndKillThreads() {
    GM_addStyle(settings.threadKill.cssThread);
    withBlacklist(killThreads);
}

function addBlacklistLink(params, content) {
    $("#mainContent h3:first").after("<p style='margin-top:-5px; margin-bottom:7px'><a href='/MyTradeMe/BlackList.aspx?" + params + 
                               "' id='blacklistLink' title='This link was added by the TradeMe Killfile script'>" + 
                               content + "</a></p>");
}

function blacklistWithNewNote(userName) {
    var note = new BlacklistNote(userName);
    addNewNoteAndEdit(note, item, "#blacklistLink");
}

function addBlacklistLinkToListingsPage() {
    withBlacklist(function() {
        var userName = $("#MemberLink").text();
        if (blackList[userName]) {
            // use member ID saved by withBlacklist()
            addBlacklistLink("member="+blackList[userName]+"&nick="+userName+"&action=delete", "Remove from Blacklist");
        } else {
            addBlacklistLink("memberToBlacklist="+userName+"&tehSubmit=Add%20to%20Blacklist&action=add", "Add to Blacklist");
        }
    });
}

//----- Notes Start -----------------------------------------------------------------------------------------------
function BlacklistNote(memberName) {
    this.id = "tmkfblNote_" + memberName;
    this.text = null;
	this.load();
}    
BlacklistNote.prototype.load = function() { this.text = localStorage.getItem(this.id); return this.text; };
BlacklistNote.prototype.save = function() { localStorage.setItem(this.id, this.text); };
BlacklistNote.prototype.remove = function() { localStorage.removeItem(this.id); this.text = null;};
BlacklistNote.prototype.defaultText = function() { return this.text || ' '; };
BlacklistNote.prototype.html = function() {
	// TODO linkify links and auction numbers
	return this.defaultText().replace(/\n/g,"<br/>");
};


function NoteEditor(note, container) {
    this.note = note;
    this.container = container;
}    
NoteEditor.prototype.noteUniqueId = function(suffix) {return this.note.id + suffix;};
NoteEditor.prototype.ctrId = function() {return this.noteUniqueId("_ctr");};
NoteEditor.prototype.textId = function() {return this.noteUniqueId("_text");};
NoteEditor.prototype.deleteId = function() {return this.noteUniqueId("_del");};
NoteEditor.prototype.addId = function() {return this.noteUniqueId("_add");};
NoteEditor.prototype.addIconId = function() {return this.noteUniqueId("_addicon");};
	
// JQuery selector prefix for this note's ID, with "#" added and dots escaped
// Trademe allows dots in user IDs which are valid in HTML IDs, but JQuery treats them as class selectors
// Only valid characters in TradeMe IDs are letters, numbers or the characters '.', '_', or '-' (no spaces)
NoteEditor.prototype.jqFindId = function(id) {
	return $("#" + id.replace(/\./g, "\\.")); 
};

NoteEditor.prototype.removeNoteEditDiv = function() {this.jqFindId(this.ctrId()).remove();};

NoteEditor.prototype.addNoteEditDiv = function(positionSelector) {
    if (this.jqFindId(this.textId()).length > 0) {
        return;
    }
    
    $(positionSelector, this.container).after(
        '<div class="blacklistNote blacklistNotePosition" id="' + this.ctrId() +'">\
<div class="blacklistNoteDelete">\
<a class="blacklistNoteDeleteIcon" id="' + this.deleteId() + '" title="Delete this note"><img src="' + note_delete_icon +'"/></a>\
</div>\
<div class="blacklistNoteText" id="' + this.textId() +'">' + this.note.html() + '</div>\
</div>');
    
    // make it editable using Jeditable
    var _noteEditor = this; // for jQuery context problem
    this.jqFindId(this.textId()).editable(function(value, settings) { 
        // TODO delete note if text is empty?
        _noteEditor.note.text = value;
        _noteEditor.note.save();
        _noteEditor.removeNoteAddIcon(this.note);
        return(_noteEditor.note.html());
    }, { 
        type    : 'textarea',
        submit  : 'OK',
        cancel  : 'Cancel',
        // TODO more rows if text is longer?
        rows : 3,
        width: 410,
        tooltip   : 'Click to edit note',
        // on edit start, use plain text rather than the HTML text in the editable div
        data : function (value, settings) { return _noteEditor.note.defaultText(); },
        // on cancel or blur, remove the note div if the note hasn't been saved
        onreset : function (editable, value) { if (!_noteEditor.note.text) { _noteEditor.removeNoteEditDiv(); return false; } },
        cssclass : 'blacklistNoteEditable'
    });
    
    // delete icon click
    this.jqFindId(this.deleteId()).click( function() { 
        _noteEditor.note.remove();
        _noteEditor.removeNoteEditDiv(); 
        _noteEditor.addNoteAddIcon();
    });
};

	
NoteEditor.prototype.addNoteAddIcon = function() {
	// don't add if it's already there
	if (this.jqFindId(this.addIconId()).length==0) { 
		
		this.jqFindId(this.addId()).append(
			'<a id="' + this.addIconId() + '" title="Add note">\
<img src="/images/my_trademe/ajax/note_left_off_white.gif"></a>');
	
		var _noteEditor = this; // for jQuery context problem
		this.jqFindId(this.addIconId()).click(function() {
			_noteEditor.addNewNoteAndEdit(".delete");
		});
	}
};
	
NoteEditor.prototype.removeNoteAddIcon = function() {
	this.jqFindId(this.addIconId()).remove();
};

	// holder for the "Add note" icon
NoteEditor.prototype.addNoteIconHolder = function(selector, useSpan) {
	var iconHolder = $(useSpan ? "<span>" : "<div>", 
					 {class: "blacklistNoteIcon", id: this.addId()});
	$(selector, this.container).after(iconHolder);
};


NoteEditor.prototype.addNewNoteAndEdit= function(positionSelector) {
	if (!this.note.text) {
		this.addNoteEditDiv(positionSelector);
	}
	// start editing the new editable
	this.jqFindId(this.textId()).trigger("click");
};

function addNoteStyles() {
        GM_addStyle(
            ".blacklistNoteIcon {float:left; margin-right:10px; cursor:pointer;}\
.blacklistNote {clear:both; cursor:pointer; background-color:#FCFF91; width:500px;}\
.blacklistNoteText {float:left; background-color:#FCFF91; max-width:415px; overflow:hidden;  margin-top:2px; padding:3px 10px 5px 5px;\
border-top-right-radius:10px; border-bottom-right-radius:10px; font-size:11px; }\
.blacklistNoteEditable TEXTAREA { background-color:#FCFF91; font-size:11px;}\
.blacklistNoteDelete {float:left;}\
");
}

function addNotesToList(notesSelectors) {
 
    $(notesSelectors.item).each(function(index, item) {
        
        var memberName = $(notesSelectors.member, item).text();

        var note = new BlacklistNote(memberName);
		
		var noteEditor = new NoteEditor(note, item);
        noteEditor.addNoteIconHolder(notesSelectors.iconPosition, notesSelectors.useSpan);
 
        if (note.text) {
            noteEditor.addNoteEditDiv(".delete");
        } else {
            noteEditor.addNoteAddIcon();
        }
    });

}

function addNotesToBlacklist() {
    addNoteStyles();

    addNotesToList({item: "#theList .item, #theList .altItem", 
                    member: ".nick > a", 
                    iconPosition: ".memberRating"});
}

function addNotesToSellers() {
    addNoteStyles();
    
    GM_addStyle(
    ".blacklistNoteIcon {float:none; margin-right:10px; cursor:pointer;}\
.blacklistNotePosition {margin-top:5px; margin-left:-4px;}");
    
    addNotesToList({item: ".tre tr", 
                    member: ".nick", 
                    iconPosition: ".title > span",
                    useSpan: true});
}
    
// ---- Notes end -------------------------------------------------------------------------------------

function withUsername(usernameFunc) {
    var userName = sessionStorage.getItem(USERNAME_STORAGE_ITEM);
    if (!userName) {
        var myTrademePage = $.get("/MyTradeMe/Default.aspx", function(data) {
            userName = $('#MemberLink', data).text();
            sessionStorage.setItem(USERNAME_STORAGE_ITEM, userName);
            usernameFunc(userName);
        });
    } else {
        usernameFunc(userName);
    }
}    
    
function searchMyMessages() {
    withUsername(function(userName) {
        $("#MbSearchForm").attr("action", $("#MbSearchForm").attr("action") + "?searchMine=1");
        $("#MbSearchTopicSelect").val(-1); // all topics
        $("#SiteHeader_MessageBoardSearch_MbSearchKeywordInput").val(userName);
        // change "Date posted" to "7 days" if it's "24 hours"
        if ($("#SiteHeader_MessageBoardSearch_MbSearchTimeSelect").val()==="10") {
            $("#SiteHeader_MessageBoardSearch_MbSearchTimeSelect").val("20");
        }
        $("#MbSearchForm").submit();
    });
}

function modifySearchBox() {
    $(".reset-link").html($("<a/>", 
        {href:"javascript:void(0)", 
         click: searchMyMessages, 
         text: "Mine", 
         class:"ResetSearchForm", 
         title:"Search all topics for my messages (Killfile script)"}));
}

// convert dates in format used in Trademe search results to a JS date
// "n min(s) ago", "n hour(s) ago", or "textday nday textmonth" 
function trademeDateToJSDate(trademeDate) {
    var jsDate;

    if (trademeDate.indexOf("min") > 0) {
        jsDate = new Date($.now() - ((trademeDate.split(" ")[0]) * 60000));
    } else if (trademeDate.indexOf("hour") > 0) {
        jsDate = new Date($.now() - ((trademeDate.split(" ")[0]) * 3600000));
    } else {
        var datePrefix = trademeDate.substr(trademeDate.indexOf(" ")+1);
        var thisYear = (new Date()).getFullYear();
        jsDate = new Date(datePrefix + " " + thisYear);
        if (jsDate > $.now()) { // thread date is from previous year
            thisYear--;
            jsDate = new Date(datePrefix + " " + thisYear);
        }
    }
    return jsDate;
}

function sortSearchResults() {
	// only sort if page was loaded from the "Mine" link
    // note this is limited to the 50 results shown on the first page of search results, 
    // which are sorted by relevance so may not include all the latest threads if user posts a lot
    if (window.location.href.indexOf("searchMine") != -1) {
        var results = $("#MbThreadList tr[id*='SearchResultsRepeater']");
        results.detach();
        results.sort(function(a,b) {
            var lastMessageA = $(".lastMessage",a).text();
            var lastMessageB = $(".lastMessage",b).text();
            return trademeDateToJSDate(lastMessageB) - trademeDateToJSDate(lastMessageA);
        });
        results.removeClass("lastrow");
        if (results.length > 0) {
            $(results[results.length-1]).addClass("lastrow");
        }
        results.appendTo($("#MbThreadList"));
    }
}

function initSettings() {
    // TODO not working except .config_var, CSS is generated in iframe but ignored, iframe issue?
    var configCSS = 
        '\n' + " #GM_config_wrapper {margin-left: auto !important; margin-right: auto !important; width:30em !important} " + '\n' +
        "#GM_config_buttons_holder  {margin-left: 25% !important; margin-right: 25% !important; } " + '\n' + 
        "#GM_config .config_var {margin-top: 1em; margin-bottom: 1em; margin-left:10%; margin-right:10%}"; 
    
    settings = {
        postKill: KILL_OPTIONS[KILL_OPTION_DEFAULT],
        useHerpDerp: false,
        useTrollIcon: false,
        showPosterName: false,
        useIconBlacklistBar: true,
        threadKill: KILL_OPTIONS[KILL_OPTION_DEFAULT]
    };

    // hack alert: don't include Blacklist bar in thread settings as it isn't implemented
    var threadOptions = Object.keys(KILL_OPTIONS);
    threadOptions.pop();
        
    GM_config.init('TradeMe Killfile Settings',
    {
        'postKill': {
            'section': ['Killed message settings'],
            'label': '',
                'type': 'radio', 
                'options': Object.keys(KILL_OPTIONS),
                'default': KILL_OPTION_DEFAULT
         },
        
        'useHerpDerp': {
            'label': 'Change text to "herp derp"',
            'type': 'checkbox',
            'default': false
        },
        
        'useTrollIcon': {
            'label': 'Change post icon to trollface',
            'type': 'checkbox',
            'default': false
        },

            
        'showPosterName': {
            'label': 'Show poster name in blacklist bar',
            'type': 'checkbox',
            'default': false
        },
        
        'useIconBlacklistBar': {
            'label': 'Show icon in blacklist bar',
            'type': 'checkbox',
            'default': true
        },
        
        'threadKill': {
            'section': ['Killed thread settings'],
            'label': '',
                'type': 'radio', 
                'options': threadOptions,
                'default': KILL_OPTION_DEFAULT
        },
    }, configCSS);
    
    // for..in doesn't officially work in GreaseMonkey
    var settingKeys = Object.keys(settings);
    for (var i=0; i<settingKeys.length; i++) {
        settings[settingKeys[i]] = GM_config.get(settingKeys[i]);
    }
    
    // convert kill option name to option
    settings.postKill = KILL_OPTIONS[settings.postKill];
    if (!settings.postKill) {
        // happens when the saved config option is not one of the available options any more, should fix this in GM_config really
        settings.postKill = KILL_OPTIONS[KILL_OPTION_DEFAULT];
    }
    settings.threadKill = KILL_OPTIONS[settings.threadKill];
    if (!settings.threadKill) {
        settings.threadKill = KILL_OPTIONS[KILL_OPTION_DEFAULT];
    }
    
}

function openGMConfig() {
      
    // Code included from GM_config Extender http://userscripts.org/scripts/review/50018
    GM_config.resizeFrame = function(wid,hei) {
        this.frame.style.width = wid;
        this.frame.style.height = hei;
    };
    // end of GM_config Extender code 
        
    GM_config.onSave = function() {GM_config.close(); window.location.reload();}; // so the "Save" button also closes the dialog and reloads the page
    
    GM_config.open();
    GM_config.resizeFrame('40em', '40em');
    
    // TODO Tampermonkey leaves the settings menu open on top of this frame, why?
}

// ---------------------------------------------------------------------------------------
function scriptMain() {

    initSettings();
    
    var trademePage = window.location.toString().toLowerCase();
    if (trademePage.indexOf("blacklist")>0) {
        // clear the cached blacklist when the blacklist update page is visited
        clearBlacklist();
        addNotesToBlacklist();
    }
    else if (trademePage.indexOf("favourites")>0) {
        addNotesToSellers();
    }
    else if (trademePage.indexOf("messages")>0) {
        loadBlacklistAndKillPosts();
        decoratePosts();
        modifySearchBox();
    }
    else if (trademePage.indexOf("listings") > 0) {
        addBlacklistLinkToListingsPage();
    }
    else if (trademePage.indexOf("threads") > 0) {
        loadBlacklistAndKillThreads();
        modifySearchBox();    
    }
    else if (trademePage.indexOf("default") > 0) {
        modifySearchBox();    
    }
    else if (trademePage.indexOf("searchresults") > 0) {
        modifySearchBox();    
        sortSearchResults();
    }
    else if (trademePage.indexOf("logout") > 0) {
        clearBlacklist();
        sessionStorage.removeItem(USERNAME_STORAGE_ITEM);
    }
}
//----------------- Includes
/*
 * Jeditable - jQuery in place edit plugin
 *
 * Copyright (c) 2006-2009 Mika Tuupola, Dylan Verheul
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 *
 * Based on editable by Dylan Verheul <dylan_at_dyve.net>:
 *    http://www.dyve.net/jquery/?editable
 *
 */

/**
  * Version 1.7.2-dev
 */

(function($){$.fn.editable=function(target,options){if('disable'==target){$(this).data('disabled.editable',true);return;}
if('enable'==target){$(this).data('disabled.editable',false);return;}
if('destroy'==target){$(this).unbind($(this).data('event.editable')).removeData('disabled.editable').removeData('event.editable');return;}
var settings=$.extend({},$.fn.editable.defaults,{target:target},options);var plugin=$.editable.types[settings.type].plugin||function(){};var submit=$.editable.types[settings.type].submit||function(){};var buttons=$.editable.types[settings.type].buttons||$.editable.types['defaults'].buttons;var content=$.editable.types[settings.type].content||$.editable.types['defaults'].content;var element=$.editable.types[settings.type].element||$.editable.types['defaults'].element;var reset=$.editable.types[settings.type].reset||$.editable.types['defaults'].reset;var callback=settings.callback||function(){};var onedit=settings.onedit||function(){};var onsubmit=settings.onsubmit||function(){};var onreset=settings.onreset||function(){};var onerror=settings.onerror||reset;if(settings.tooltip){$(this).attr('title',settings.tooltip);}
settings.autowidth='auto'==settings.width;settings.autoheight='auto'==settings.height;return this.each(function(){var self=this;var savedwidth=$(self).width();var savedheight=$(self).height();$(this).data('event.editable',settings.event);if(!$.trim($(this).html())){$(this).html(settings.placeholder);}
$(this).bind(settings.event,function(e){if(true===$(this).data('disabled.editable')){return;}
if(self.editing){return;}
if(false===onedit.apply(this,[settings,self])){return;}
e.preventDefault();e.stopPropagation();if(settings.tooltip){$(self).removeAttr('title');}
if(0==$(self).width()){settings.width=savedwidth;settings.height=savedheight;}else{if(settings.width!='none'){settings.width=settings.autowidth?$(self).width():settings.width;}
if(settings.height!='none'){settings.height=settings.autoheight?$(self).height():settings.height;}}
if($(this).html().toLowerCase().replace(/(;|"|\/)/g,'')==settings.placeholder.toLowerCase().replace(/(;|"|\/)/g,'')){$(this).html('');}
self.editing=true;self.revert=$(self).html();$(self).html('');var form=$('<form />');if(settings.cssclass){if('inherit'==settings.cssclass){form.attr('class',$(self).attr('class'));}else{form.attr('class',settings.cssclass);}}
if(settings.style){if('inherit'==settings.style){form.attr('style',$(self).attr('style'));form.css('display',$(self).css('display'));}else{form.attr('style',settings.style);}}
var input=element.apply(form,[settings,self]);var input_content;if(settings.loadurl){var t=setTimeout(function(){input.disabled=true;content.apply(form,[settings.loadtext,settings,self]);},100);var loaddata={};loaddata[settings.id]=self.id;if($.isFunction(settings.loaddata)){$.extend(loaddata,settings.loaddata.apply(self,[self.revert,settings]));}else{$.extend(loaddata,settings.loaddata);}
$.ajax({type:settings.loadtype,url:settings.loadurl,data:loaddata,async:false,success:function(result){window.clearTimeout(t);input_content=result;input.disabled=false;}});}else if(settings.data){input_content=settings.data;if($.isFunction(settings.data)){input_content=settings.data.apply(self,[self.revert,settings]);}}else{input_content=self.revert;}
content.apply(form,[input_content,settings,self]);input.attr('name',settings.name);buttons.apply(form,[settings,self]);$(self).append(form);plugin.apply(form,[settings,self]);$(':input:visible:enabled:first',form).focus();if(settings.select){input.select();}
input.keydown(function(e){if(e.keyCode==27){e.preventDefault();reset.apply(form,[settings,self]);}});var t;if('cancel'==settings.onblur){input.blur(function(e){t=setTimeout(function(){reset.apply(form,[settings,self]);},500);});}else if('submit'==settings.onblur){input.blur(function(e){t=setTimeout(function(){form.submit();},200);});}else if($.isFunction(settings.onblur)){input.blur(function(e){settings.onblur.apply(self,[input.val(),settings]);});}else{input.blur(function(e){});}
form.submit(function(e){if(t){clearTimeout(t);}
e.preventDefault();if(false!==onsubmit.apply(form,[settings,self])){if(false!==submit.apply(form,[settings,self])){if($.isFunction(settings.target)){var str=settings.target.apply(self,[input.val(),settings]);$(self).html(str);self.editing=false;callback.apply(self,[self.innerHTML,settings]);if(!$.trim($(self).html())){$(self).html(settings.placeholder);}}else{var submitdata={};submitdata[settings.name]=input.val();submitdata[settings.id]=self.id;if($.isFunction(settings.submitdata)){$.extend(submitdata,settings.submitdata.apply(self,[self.revert,settings]));}else{$.extend(submitdata,settings.submitdata);}
if('PUT'==settings.method){submitdata['_method']='put';}
$(self).html(settings.indicator);var ajaxoptions={type:'POST',data:submitdata,dataType:'html',url:settings.target,success:function(result,status){if(ajaxoptions.dataType=='html'){$(self).html(result);}
self.editing=false;callback.apply(self,[result,settings]);if(!$.trim($(self).html())){$(self).html(settings.placeholder);}},error:function(xhr,status,error){onerror.apply(form,[settings,self,xhr]);}};$.extend(ajaxoptions,settings.ajaxoptions);$.ajax(ajaxoptions);}}}
$(self).attr('title',settings.tooltip);return false;});});this.reset=function(form){if(this.editing){if(false!==onreset.apply(form,[settings,self])){$(self).html(self.revert);self.editing=false;if(!$.trim($(self).html())){$(self).html(settings.placeholder);}
if(settings.tooltip){$(self).attr('title',settings.tooltip);}}}};});};$.editable={types:{defaults:{element:function(settings,original){var input=$('<input type="hidden"></input>');$(this).append(input);return(input);},content:function(string,settings,original){$(':input:first',this).val(string);},reset:function(settings,original){original.reset(this);},buttons:function(settings,original){var form=this;if(settings.submit){if(settings.submit.match(/>$/)){var submit=$(settings.submit).click(function(){if(submit.attr("type")!="submit"){form.submit();}});}else{var submit=$('<button type="submit" />');submit.html(settings.submit);}
$(this).append(submit);}
if(settings.cancel){if(settings.cancel.match(/>$/)){var cancel=$(settings.cancel);}else{var cancel=$('<button type="cancel" />');cancel.html(settings.cancel);}
$(this).append(cancel);$(cancel).click(function(event){if($.isFunction($.editable.types[settings.type].reset)){var reset=$.editable.types[settings.type].reset;}else{var reset=$.editable.types['defaults'].reset;}
reset.apply(form,[settings,original]);return false;});}}},text:{element:function(settings,original){var input=$('<input />');if(settings.width!='none'){input.attr('width',settings.width);}
if(settings.height!='none'){input.attr('height',settings.height);}
input.attr('autocomplete','off');$(this).append(input);return(input);}},textarea:{element:function(settings,original){var textarea=$('<textarea />');if(settings.rows){textarea.attr('rows',settings.rows);}else if(settings.height!="none"){textarea.height(settings.height);}
if(settings.cols){textarea.attr('cols',settings.cols);}else if(settings.width!="none"){textarea.width(settings.width);}
$(this).append(textarea);return(textarea);}},select:{element:function(settings,original){var select=$('<select />');$(this).append(select);return(select);},content:function(data,settings,original){if(String==data.constructor){eval('var json = '+data);}else{var json=data;}
for(var key in json){if(!json.hasOwnProperty(key)){continue;}
if('selected'==key){continue;}
var option=$('<option />').val(key).append(json[key]);$('select',this).append(option);}
$('select',this).children().each(function(){if($(this).val()==json['selected']||$(this).text()==$.trim(original.revert)){$(this).attr('selected','selected');}});if(!settings.submit){var form=this;$('select',this).change(function(){form.submit();});}}}},addInputType:function(name,input){$.editable.types[name]=input;}};$.fn.editable.defaults={name:'value',id:'id',type:'text',width:'auto',height:'auto',event:'click.editable',onblur:'cancel',loadtype:'GET',loadtext:'Loading...',placeholder:'Click to edit',loaddata:{},submitdata:{},ajaxoptions:{}};})(jQuery);

/*
Slightly modified version by drsr of :

GM_config.js from http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
Copyright 2009-2010, GM_config Contributors
All rights reserved.

GM_config Contributors:
    Mike Medley <medleymind@gmail.com>
    Joe Simmons
    Izzy Soft
    Marti Martz

GM_config is distributed under the terms of the GNU Lesser General Public License.

    GM_config is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function GM_configStruct(){if(arguments.length)
GM_configInit(this,arguments);}
function GM_configInit(config,args){if(typeof config.fields=="undefined"){config.fields={};config.onInit=function(){};config.onOpen=function(){};config.onSave=function(){};config.onClose=function(){};config.onReset=function(){};config.isOpen=false;config.title='User Script Settings';config.css={basic:"#GM_config * { font-family: arial,tahoma,myriad pro,sans-serif; }\
             #GM_config { background: #FFF; }\
             #GM_config input[type='radio'] { margin-right: 8px; }\
             #GM_config .indent40 { margin-left: 40%; }\
             #GM_config .field_label { font-weight: bold; font-size: 12px; margin-right: 6px; }\
             #GM_config .block { display: block; }\
             #GM_config .saveclose_buttons { margin: 16px 10px 10px; padding: 2px 12px; }\
             #GM_config .reset, #GM_config .reset a,\
             #GM_config_buttons_holder { text-align: right; color: #000; }\
             #GM_config .config_header { font-size: 20pt; margin: 0; }\
             #GM_config .config_desc, #GM_config .section_desc, #GM_config .reset { font-size: 9pt; }\
             #GM_config .center { text-align: center; }\
             #GM_config .section_header_holder { margin-top: 8px; }\
             #GM_config .config_var { margin: 0 0 4px; }\
             #GM_config .section_header { font-size: 13pt; background: #414141; color: #FFF;\
              border: 1px solid #000; margin: 0; }\
             #GM_config .section_desc { font-size: 9pt; background: #EFEFEF; color: #575757;\
             border: 1px solid #CCC; margin: 0 0 6px; }",stylish:""};}
if(typeof config.id=="undefined")
config.id='GM_config';var settings=null;if(config.id!='GM_config')
config.css.basic=config.css.basic.replace(/#GM_config/gm,'#'+config.id);var oldInitCb=config.onInit;for(var i=0,l=args.length,arg;i<l;++i){arg=args[i];if(typeof arg.appendChild=="function"){config.frame=arg;continue;}
switch(typeof arg){case'object':for(var j in arg){if(typeof arg[j]!="function"){settings=arg;break;}
config["on"+j.charAt(0).toUpperCase()+j.slice(1)]=arg[j];}
break;case'function':config.onOpen=arg;break;case'string':if(arg.indexOf('{')!=-1&&arg.indexOf('}')!=-1)
config.css.stylish=arg;else
config.title=arg;break;}}
if(settings){var stored=config.read();for(var id in settings)
config.fields[id]=new GM_configField(settings[id],stored[id],id);}
if(config.onInit===oldInitCb)
config.onInit=function(){};oldInitCb();}
GM_configStruct.prototype={init:function(){GM_configInit(this,arguments);},open:function(){var match=document.getElementById(this.id);if(match&&(match.tagName=="IFRAME"||match.childNodes.length>0))return;var config=this;function buildConfigWin(body,head){var create=config.create,fields=config.fields,configId=config.id,bodyWrapper=create('div',{id:configId+'_wrapper'});head.appendChild(create('style',{type:'text/css',textContent:config.css.basic+config.css.stylish}));bodyWrapper.appendChild(create('div',{id:configId+'_header',className:'config_header block center',innerHTML:config.title}));var section=bodyWrapper,secNum=0;for(var id in fields){var field=fields[id].settings;if(field.section){section=bodyWrapper.appendChild(create('div',{className:'section_header_holder',id:configId+'_section_'+secNum}));if(typeof field.section[0]=="string")
section.appendChild(create('div',{className:'section_header center',id:configId+'_section_header_'+secNum,innerHTML:field.section[0]}));if(typeof field.section[1]=="string")
section.appendChild(create('p',{className:'section_desc center',id:configId+'_section_desc_'+secNum,innerHTML:field.section[1]}));++secNum;}
section.appendChild(fields[id].toNode(configId));}
bodyWrapper.appendChild(create('div',{id:configId+'_buttons_holder'},create('button',{id:configId+'_saveBtn',textContent:'Save',title:'Save settings',className:'saveclose_buttons',onclick:function(){config.save()}}),create('button',{id:configId+'_closeBtn',textContent:'Cancel',title:'Cancel changes and close settings',className:'saveclose_buttons',onclick:function(){config.close()}}),create('div',{className:'reset_holder block'},create('a',{id:configId+'_resetLink',textContent:'Reset to defaults',href:'#',title:'Reset fields to default values',className:'reset',onclick:function(e){e.preventDefault();config.reset()}}))));body.appendChild(bodyWrapper);config.center();window.addEventListener('resize',config.center,false);config.onOpen(config.frame.contentDocument||config.frame.ownerDocument,config.frame.contentWindow||window,config.frame);window.addEventListener('beforeunload',function(){config.close();},false);config.frame.style.display="block";config.isOpen=true;}
var defaultStyle='position:fixed; top:0; left:0; opacity:0; display:none; z-index:999;'+'width:75%; height:75%; max-height:95%; max-width:95%;'+'border:1px solid #000000; overflow:auto; bottom: auto;'+'right: auto; margin: 0; padding: 0;';if(this.frame){this.frame.id=this.id;this.frame.setAttribute('style',defaultStyle);buildConfigWin(this.frame,this.frame.ownerDocument.getElementsByTagName('head')[0]);}else{document.body.appendChild((this.frame=this.create('iframe',{id:this.id,style:defaultStyle})));this.frame.src='about:blank';this.frame.addEventListener('load',function(e){var frame=config.frame;var body=frame.contentDocument.getElementsByTagName('body')[0];body.id=config.id;buildConfigWin(body,frame.contentDocument.getElementsByTagName('head')[0]);},false);}},save:function(){var fields=this.fields;for(id in fields)
if(fields[id].toValue()===null)
return;this.write();this.onSave();},close:function(){if(this.frame.contentDocument){this.remove(this.frame);this.frame=null;}else{this.frame.innerHTML="";this.frame.style.display="none";}
var fields=this.fields;for(var id in fields)
fields[id].node=null;this.onClose();this.isOpen=false;},set:function(name,val){this.fields[name].value=val;},get:function(name){return this.fields[name].value;},write:function(store,obj){if(!obj){var values={},fields=this.fields;for(var id in fields){var field=fields[id];if(field.settings.type!="button")
values[id]=field.value;}}
try{this.setValue(store||this.id,this.stringify(obj||values));}catch(e){this.log("GM_config failed to save settings!");}},read:function(store){try{var rval=this.parser(this.getValue(store||this.id,'{}'));}catch(e){this.log("GM_config failed to read saved settings!");var rval={};}
return rval;},reset:function(){var fields=this.fields,doc=this.frame.contentDocument||this.frame.ownerDocument,type;for(id in fields){var node=fields[id].node,field=fields[id].settings,noDefault=typeof field['default']=="undefined",type=field.type;switch(type){case'checkbox':node.checked=noDefault?GM_configDefaultValue(type):field['default'];break;case'select':if(field['default']){for(var i=0,len=node.options.length;i<len;++i)
if(node.options[i].value==field['default'])
node.selectedIndex=i;}else
node.selectedIndex=0;break;case'radio':var radios=node.getElementsByTagName('input');for(var i=0,len=radios.length;i<len;++i)
if(radios[i].value==field['default'])
radios[i].checked=true;break;case'button':break;default:node.value=noDefault?GM_configDefaultValue(type):field['default'];break;}}
this.onReset();},create:function(){switch(arguments.length){case 1:var A=document.createTextNode(arguments[0]);break;default:var A=document.createElement(arguments[0]),B=arguments[1];for(var b in B){if(b.indexOf("on")==0)
A.addEventListener(b.substring(2),B[b],false);else if(",style,accesskey,id,name,src,href,which,for".indexOf(","+
b.toLowerCase())!=-1)
A.setAttribute(b,B[b]);else
A[b]=B[b];}
for(var i=2,len=arguments.length;i<len;++i)
A.appendChild(arguments[i]);}
return A;},center:function(){var node=this.frame,style=node.style,beforeOpacity=style.opacity;if(style.display=='none')style.opacity='0';style.display='';style.top=Math.floor((window.innerHeight/2)-(node.offsetHeight/2))+'px';style.left=Math.floor((window.innerWidth/2)-(node.offsetWidth/2))+'px';style.opacity='1';},remove:function(el){if(el&&el.parentNode)el.parentNode.removeChild(el);}};(function(){var isGM=typeof GM_getValue!='undefined'&&typeof GM_getValue('a','b')!='undefined',setValue,getValue,stringify,parser;if(!isGM){setValue=function(name,value){return localStorage.setItem(name,value);};getValue=function(name,def){var s=localStorage.getItem(name);return s==null?def:s};stringify=JSON.stringify;parser=JSON.parse;}else{setValue=GM_setValue;getValue=GM_getValue;stringify=typeof JSON=="undefined"?function(obj){return obj.toSource();}:JSON.stringify;parser=typeof JSON=="undefined"?function(jsonData){return(new Function('return '+jsonData+';'))();}:JSON.parse;}
GM_configStruct.prototype.isGM=isGM;GM_configStruct.prototype.setValue=setValue;GM_configStruct.prototype.getValue=getValue;GM_configStruct.prototype.stringify=stringify;GM_configStruct.prototype.parser=parser;GM_configStruct.prototype.log=isGM?GM_log:(window.opera?opera.postError:console.log);})();function GM_configDefaultValue(type){var value;if(type.indexOf('unsigned ')==0)
type=type.substring(9);switch(type){case'radio':case'select':value=settings.options[0];break;case'checkbox':value=false;break;case'int':case'integer':case'float':case'number':value=0;break;default:value='';}
return value;}
function GM_configField(settings,stored,id){this.settings=settings;this.id=id;var value=typeof stored=="undefined"?typeof settings['default']=="undefined"?GM_configDefaultValue(settings.type):settings['default']:stored;this.value=value;}
GM_configField.prototype={create:GM_configStruct.prototype.create,node:null,toNode:function(configId){var field=this.settings,value=this.value,options=field.options,id=this.id,create=this.create;var retNode=create('div',{className:'config_var',id:configId+'_'+this.id+'_var',title:field.title||''}),firstProp;for(var i in field){firstProp=i;break;}
var label=create('label',{innerHTML:field.label,id:configId+'_'+this.id+'_field_label',for:configId+'_field_'+this.id,className:'field_label'});switch(field.type){case'textarea':retNode.appendChild((this.node=create('textarea',{id:configId+'_field_'+this.id,innerHTML:value,cols:(field.cols?field.cols:20),rows:(field.rows?field.rows:2)})));break;case'radio':var wrap=create('div',{id:configId+'_field_'+id});this.node=wrap;for(var i=0,len=options.length;i<len;++i){var radLabel=wrap.appendChild(create('span',{innerHTML:options[i]}));var rad=wrap.appendChild(create('input',{value:options[i],type:'radio',name:id,checked:options[i]==value?true:false}));if(firstProp=="options")
wrap.insertBefore(radLabel,rad);else
wrap.appendChild(radLabel);}
retNode.appendChild(wrap);break;case'select':var wrap=create('select',{id:configId+'_field_'+id});this.node=wrap;for(var i in options)
wrap.appendChild(create('option',{innerHTML:options[i],value:i,selected:options[i]==value?true:false}));retNode.appendChild(wrap);break;case'checkbox':retNode.appendChild((this.node=create('input',{id:configId+'_field_'+id,type:'checkbox',value:value,checked:value})));break;case'button':var btn=create('input',{id:configId+'_field_'+id,type:'button',value:field.label,size:(field.size?field.size:25),title:field.title||''});this.node=btn;if(field.script)
btn.addEventListener('click',function(){var scr=field.script;typeof scr=='function'?setTimeout(scr,0):eval(scr);},false);retNode.appendChild(btn);break;case'hidden':retNode.appendChild((this.node=create('input',{id:configId+'_field_'+id,type:'hidden',value:value})));break;default:retNode.appendChild((this.node=create('input',{id:configId+'_field_'+id,type:'text',value:value,size:(field.size?field.size:25)})));}
if(field.type!="hidden"&&field.type!="button"&&typeof field.label=="string"){if(firstProp=="label")
retNode.insertBefore(label,retNode.firstChild);else
retNode.appendChild(label);}
return retNode;},toValue:function(){var node=this.node,field=this.settings,type=field.type,unsigned=false,rval;if(type.indexOf('unsigned ')==0){type=type.substring(9);unsigned=true;}
switch(type){case'checkbox':this.value=node.checked;break;case'select':this.value=node[node.selectedIndex].value;break;case'radio':var radios=node.getElementsByTagName('input');for(var i=0,len=radios.length;i<len;++i)
if(radios[i].checked)
this.value=radios[i].value;break;case'button':break;case'int':case'integer':var num=Number(node.value);var warn='Field labeled "'+field.label+'" expects a'+
(unsigned?' positive ':'n ')+'integer value';if(isNaN(num)||Math.ceil(num)!=Math.floor(num)||(unsigned&&num<0)){alert(warn+'.');return null;}
if(!this._checkNumberRange(num,warn))
return null;this.value=num;break;case'float':case'number':var num=Number(node.value);var warn='Field labeled "'+field.label+'" expects a '+
(unsigned?'positive ':'')+'number value';if(isNaN(num)||(unsigned&&num<0)){alert(warn+'.');return null;}
if(!this._checkNumberRange(num,warn))
return null;this.value=num;break;default:this.value=node.value;break;}
return this.value;},_checkNumberRange:function(num,warn){var field=this.settings;if(typeof field.min=="number"&&num<field.min){alert(warn+' greater than or equal to '+field.min+'.');return null;}
if(typeof field.max=="number"&&num>field.max){alert(warn+' less than or equal to '+field.max+'.');return null;}
return true;}};var GM_config=new GM_configStruct();
//------------- includes end
scriptMain();
