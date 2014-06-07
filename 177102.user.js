// ==UserScript==
// @name       MetaFL 
// @namespace  http://
// @version    0.2
// @description  Augment FetLife functionality
// @match      htt*://*fetlife.com/home/*
// @run-at document-start
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require    http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @copyright  2013+, You
// @updateURL  http://userscripts.org/scripts/source/177102.meta.js
// ==/UserScript==

$.noConflict();
var $_ = jQuery;


$_(function () {
    
    var k,
        fl = window.unsafeWindow,
        $ = fl.$,
        STORY_TYPE = {
            imageComment: "comment_created",
            imageLove: "like_created",
            friendAdd: "friend_created",
            groupPostComment: "group_comment_created",
            groupPost: "group_post_created",
            writingComment: "post_comment_created",
            profileUpdate: "profile_updated",
            eventRSVP: "rsvp_created",
            status: "status_created",
            wall: "wall_post_created",
            suggestionVote: "vote_created"
        },
        suppressedStories,
        suppressedKeywords,
        isSuppressedType;
    
    var getSuppressedStories = function () {
        suppressedStories = $_.map(GM_getValue("suppressedStories", "").split(","),
                                   function (s) { return $_.trim(s); });
        isSuppressedType = {};
        $.each(suppressedStories, function (index, v) {
            isSuppressedType[STORY_TYPE[v]] = true;
        });
    };
    
    var getSuppressedKeywords = function () {
        suppressedKeywords = $_.map(GM_getValue("suppressedKeywords", "").split(","),
                                   function (s) { return $_.trim(s); });
    };

    getSuppressedStories();
    getSuppressedKeywords();
    
    $("aside section").remove();
    
    $_('<li><a href="#" id="options_button">MetaFL</a></li>')
    .find('#options_button')
    .button()
    .click(function( event ) {
        event.preventDefault();
        $_("#options_dialog").dialog("open");
    })
    .end()
    .prependTo("#notification_counts");
    
    $_('<div id="options_dialog" title="MetaFL options">' +
       '  <form>' +
       '	<p>Acceptable story types: imageComment, imageLove, friendAdd, groupPostComment, ' +
       '	groupPost, writingComment, profileUpdate, eventRSVP, status, wall, suggestionVote</p>' +
       '    <fieldset>' +
       '      <label for="storyTypes">Suppressed story types</label>' +
       '      <input type="text" name="storyTypes" id="storyTypes" class="text ui-widget-content ui-corner-all" />' +
       '      <label for="keywords">Suppressed keywords</label>' +
       '      <input type="text" name="keywords" id="keywords" class="text ui-widget-content ui-corner-all" />' +       
       '    </fieldset></form></div>')
    .appendTo(document.body);
    $_('html > head').append('<style>.no-close.ui-dialog .ui-dialog-titlebar .ui-dialog-titlebar-close { display: none; }</style>');
    $_('#options_dialog').dialog({
        autoOpen: false,
        closeOnEscape: true,
        dialogClass: "no-close",
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Save": function() {
                GM_setValue("suppressedKeywords", $_("#keywords")[0].value);
                GM_setValue("suppressedStories", $_("#storyTypes")[0].value);
                getSuppressedKeywords();
                getSuppressedStories();
                fl.activityFeed.loadFeed();
                $_(this).dialog("close");
            },
            "Cancel": function() {
                $_(this).dialog("close");
            }
        },
        open: function () {
            $_("#keywords")[0].value = suppressedKeywords.join(", ");
            $_("#storyTypes")[0].value = suppressedStories.join(", ");        
        },
        close: function () {
        }
    });
    
    $('#options_dialog form input').keydown(function(e) {
        if (e.keyCode == 13) {
            $('#form').submit();
        }
    });
    
    var toJSON = function (text) {
        try {
            return $.parseJSON(text);
        } catch (invalidJson) {
            return null;
        }
    };
    
    var pageLogic = {
        getText: function (jq) {
            return jq.find(".mbn, .pts").text();
        },
        
        getUserId: function (jq) {
            var userId = 0;
            jq.find("td.user a").each(function () {
                userId = (this.href || "").match(/(?:\/users\/)([0-9]+)/)[1] || 0;
            });
            return userId;
        },
        
        getStoryType: function (jq) {
        	return jq[0].className.split(" ")[0];
        }
    };
    
    var isSuppressedKeyword = function (jq) {
        // Return first keyword that matches the text in dom
        var i, text = pageLogic.getText(jq).toLowerCase();
        if( !text ) { return; }

        for( i = 0; i < suppressedKeywords.length; i++ ) {
            if( text.match(suppressedKeywords[i].toLowerCase()) ) {
                return suppressedKeywords[i];
            }
        }
    };
    
    $.ajaxSetup({dataFilter: function (responseText, responseType) {
        console.log("dataFilter processed.");
        
        var json, stories,
            filteredStories = [],
            numFiltered = 0,
            filteredCounts = {},
            increment = function (text) {
                filteredCounts[text] = filteredCounts[text] ? filteredCounts[text] + 1 : 1;
            },
            getFilterText = function () {
                var text = [], k;
                for( k in filteredCounts ) {
                    if(filteredCounts.hasOwnProperty(k)) {
                        text.push( filteredCounts[k] + " " + k);
                    }
                }
                return text.join(", ");
            };
        
        if( !responseType.match(/json/) ) {
            return;
        }
        
        json = toJSON(responseText);
        if( !json ) { return; }
        stories = json.stories;
        
        if( !stories || !stories.length ) { return responseText; }
        
        $.each(stories, function (i, vHTML) {
            var obj = $_(vHTML),
                userId = pageLogic.getUserId(obj),
                keyword,
                storyType = pageLogic.getStoryType(obj);
           
            if( isSuppressedType[storyType] ) {
                console.log("Suppressing " + storyType + " by user " + userId);
                numFiltered++;
                increment("by type");
                return;
            }
            
            keyword = isSuppressedKeyword(obj);
            if( keyword ) {
                console.log("Suppressing " + storyType + " by user " + userId +
                            " containing keyword '" + keyword + "'");
            	numFiltered++;
                increment("by keyword '" + keyword + "'");
                return;
            }
            
            filteredStories.push(vHTML);
        });
        
        if( numFiltered > 0 ) {
            GM_notification(numFiltered + " news feed items were suppressed: " + getFilterText(),
                            null, null, null, 5000);
        }
        
        json.stories = filteredStories;
        return JSON.stringify(json);
    }});
    
    
    if (fl.Stream) {
        fl.Stream.poll = function () {};
    } else if( fl && fl.FetLife && fl.FetLife.currentUser) {
        fl.FetLife.currentUser.shouldGetStream = false;
    }
        });



