// ==UserScript==
// @name           Facebook Activity Wiper
// @description    Developed by Mete Ercan Pakdil
// @namespace      http://userscripts.org/scripts/show/155813
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==

function parseUri (str) {
    var	o   = parseUri.options,
        m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

window.addEventListener('load', function()  {

    var fb_dtsg = null;

    // Get the value of fb_dtsg
    var getConstantParameters = function () {
        if ( fb_dtsg !== null ) {
            return true;
        } else {

            if ( fb_dtsg === null ) {
                $('input[name="fb_dtsg"]').each(function(){
                    fb_dtsg = $(this).attr("value");
                });
            }
            return (fb_dtsg !== null);
        }
    }

    var generatePhstamp = function(qs, dtsg) {
        var input_len = qs.length;
        numeric_csrf_value='';

        for(var ii=0;ii<dtsg.length;ii++) {
            numeric_csrf_value+=dtsg.charCodeAt(ii);
        }
        return '1' + numeric_csrf_value + input_len;
    };


    var deleteActivities = function (actions) {

        var cache = new Array();

        getConstantParameters();

        $('li.timelineLogStory').each( function() {

            var wipe_item = $(this);
            if ( wipe_item.attr('wipe') !== 'dismiss' || wipe_item.attr('wipe') === undefined) {
                wipe_item.find('a.uiPopoverButton').each(function () {
                        var evt = document.createEvent("MouseEvents");
                        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        $(this).context.dispatchEvent(evt);
                        wipe_item.attr('wipe', 'considered');
                });
            }
            // Now try to remove the actual action
            if ( wipe_item.attr('wipe') === 'considered' ) {

                $(".uiContextualLayerPositioner").find('a[ajaxify]').each(function () {

                    var ajaxify = parseUri("http://facebook.com" + $(this).attr("ajaxify"));
                    if ( ajaxify.file === "take_action_on_story.php" ) {

                        if ($.inArray(ajaxify.queryKey["action"], actions) === -1 ) {
                            wipe_item.attr('wipe', 'dismiss');
                        } else {

                            var remove = true;
                            var keys = ['profile_id', 'story_fbid', 'story_row_time', 'story_dom_id'];
                            for ( var i = 0; i < keys.length; ++i ) {
                                if ( ajaxify.queryKey[keys[i]] === undefined ) {
                                    remove = false;
                                }
                            }

                            if ( remove ) {

                                var story_fbid = ajaxify.queryKey['story_fbid'];

                                if ($.inArray(story_fbid, cache) == -1)
                                {
                                    var data = {
                                        'fb_dtsg'			  : fb_dtsg,
                                        'confirmed'			  : "true",
                                        'ban_user'			  : "0"
                                    };
                                    for ( var key in ajaxify.queryKey ) {
                                        data[key] = ajaxify.queryKey[key];
                                    }

                                    data['phstamp'] = generatePhstamp($.param(data), fb_dtsg);

                                    $.ajax({
                                        type    : "POST",
                                        url     : "http://www.facebook.com/ajax/timeline/take_action_on_story.php",
                                        data    : data,
                                        complete: function(jqXHR, textStatus) {
                                            if ( jqXHR.status === 200 ) {
                                                if ( $('#cmdFBW').attr('deletecount') === undefined || $('#cmdFBW').attr('deletecount') === null ) {
                                                    $('#cmdFBW').attr('deletecount', '0');
                                                }
                                                var deleteCount = parseInt($('#cmdFBW').attr('deletecount')) + 1;
                                                $('#cmdFBW').html("Facebook Activity Wiper (" + deleteCount + ")");
                                                $('#cmdFBW').attr('deletecount', '' + deleteCount);
                                                wipe_item.remove();
                                            }

                                            console.log("Deleting:", jqXHR);
                                            cache.push(story_fbid);
                                        }
                                    });
                                }

                            } else {
                                wipe_item.attr('wipe', 'dismiss');
                            }
                        }

                    }

                });


            }
        });
    };

    var deleteLikes = function () {
        $('#menuFBW').css('display', 'none');
        var likes = new Array();
        likes.push("unlike");
        deleteActivities (likes);
    };

    var deleteComments = function () {
        $('#menuFBW').css('display', 'none');
        var comments = new Array();
        comments.push("remove_comment");
        deleteActivities (comments);
    };

    var deleteContent = function () {
        $('#menuFBW').css('display', 'none');
        var content = new Array();
        content.push("remove_content");
        deleteActivities (content);
    };

    var deleteAll = function () {
        $('#menuFBW').css('display', 'none');
        var all = new Array();
        all.push("unlike");
        all.push("remove_comment");
        all.push("remove_content");
        deleteActivities (all);
    };

    // Include the
    $('<li id="navFBW" class="topNavLink middleLink"><a id="cmdFBW" href="#">Facebook Activity Wiper</a></li>').insertBefore('#navHome');

    var pathname = window.location.pathname;
    if ( pathname.indexOf('/allactivity') === -1 ) {
        $('#cmdFBW').click(function () {
            alert('You must navigate to "Activity Log" using the "Timeline" feature in order to use Facebook Activity Wiper');
        });
    } else {
        $('#cmdFBW').css("color", "red");
        $('<ul id="menuFBW" aria-label="Facebook Activity Wiper" role="navigation" id="FBWNavigation" class="navigation">' +
            '<li><a id="FBWDeleteLikes" href="#" class="navSubmenu">Delete Likes</a></li>' +
            '<li><a id="FBWDeleteComments" href="#" class="navSubmenu">Delete Comments</a></li>' +
            '<li><a id="FBWDeleteContent" href="#" class="navSubmenu">Delete Content</a></li>' +
            '<li><a id="FBWDeleteAll" href="#" class="navSubmenu">Delete All</a></li>' +
            '</ul>').appendTo('#navAccount');
        $('#menuFBW').css('z-index', '-1');

        $('#FBWDeleteLikes').click(function (){ deleteLikes(); });
        $('#FBWDeleteComments').click(function (){ deleteComments();});
        $('#FBWDeleteContent').click(function (){ deleteContent(); });
        $('#FBWDeleteAll').click(function (){ deleteAll(); });

        $('#cmdFBW').click(function () {
            if ( $('#menuFBW').css('display') === 'block' ) {
                $('#menuFBW').css('display', 'none');
            } else {
                $('#menuFBW').css('display', 'block');
            }
        });
    }
});