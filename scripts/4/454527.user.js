// ==UserScript==
// @name           Yang test
// @namespace      http://userscripts.org/users/astojanov
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==
 
function parseUri (str) {
        var     o = parseUri.options,
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
        var yangProcessingTimeout = 2000;
 
        // Unfriend as an action as well ?
        var deleteActions = ["Hidden from Timeline", "Report/Remove Tag", "Delete Photo", "Unlike"];
 
        // Verify the delete action
        var isDeleteAction = function (actionType) {
                return (deleteActions.indexOf(actionType) >= 0);
        }
       
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
 
        // Mimic physical mouse click event (testing only)
        var physicalClick = function (obj) {
                var x = obj.offset().left + ( obj.width () / 2 );      
                var y = obj.offset().top  + ( obj.height() / 2 );      
                $(document.elementFromPoint(x, y)).click();
        }
 
        // Delete any ministory passed to this function
        var processMinistory = function (ministory, actionObj) {
                var ajaxify = parseUri("http://facebook.com" + actionObj.attr("ajaxify"));
                if ( ajaxify.file === "take_action_on_story.php" ) {
                        var data = {
                                        'fb_dtsg'  : fb_dtsg,
                                        'confirmed': "true",
                                        'ban_user' : "0"
                        };
                        for ( var key in ajaxify.queryKey ) {
                                data[key] = ajaxify.queryKey[key];
                        }
                        $.ajax({
                                type    : "POST",
                                url     : "https://www.facebook.com/ajax/timeline/take_action_on_story.php",
                                data    : data,
                                complete: function(jqXHR, textStatus) {
                                        if ( jqXHR.status === 200 ) {
                                                if ( $('#cmdYang').attr('deletecount') === undefined || $('#cmdYang').attr('deletecount') === null ) {
                                                        $('#cmdYang').attr('deletecount', '0');
                                                }
                                                var deleteCount = parseInt($('#cmdYang').attr('deletecount')) + 1;
                                                $('#cmdYang').html("Yang (" + deleteCount + ")");
                                                $('#cmdYang').attr('deletecount', '' + deleteCount);
                                                ministory.remove();
                                        }
                                        console.log("Deleting:", jqXHR);
                                }
                        });
                }
        }
 
 
        var onYangClick = function () {
                getConstantParameters ();
                console.log("Yang is starting ...");
                $("div > div > div > div.fbTimelineSection > div > div > div > div > ul > li").each(function() {
                        var ministory = $(this);
                        ministory.find('a').each(function(){
                                if ( $(this).attr("aria-label") === "Allowed on Timeline" ) {
                                        var editButton = $(this);
                                        editButton.mousemove();
                                        editButton.find('i').click();
                                        setTimeout ( function() { editButton.parent().find('a[ajaxify]').each (function() {    
                                                if ( isDeleteAction($(this).text()) ) {
                                                        // console.log(ministory, $(this).text());
                                                        processMinistory (ministory, $(this));
                                                }
                                        })}, yangProcessingTimeout);
                                }
                        });
                });
                $("html, body").animate({ scrollTop: $(document).height() }, "slow");
                console.log("Yang done ...: ", fb_dtsg);
                setTimeout(onYangClick, 3000);
        };
 
 
        // Include the
        $('<li id="navYang" class="navItem middleItem"><a id="cmdYang" class="navLink bigPadding" href="#">Yang</a></li>').insertAfter('#navHome');
        var pathname = window.location.pathname;    
        if ( pathname.indexOf('/allactivity') === -1 ) {
                $('#cmdYang').click(function () {
                        alert('You must navigate to "Activity Log" using the "Timeline" feature in order to use Yang');          
                });
        } else {
                $('#cmdYang').css("color", "#CC00CC");
                $('#cmdYang').click(function () {
                        onYangClick();
                });
        }
});
 
var parent=document.getElementsByTagName("html")[0];
var _body = document.getElementsByTagName('body')[0];
var _div = document.createElement('div');
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
 
body = document.body;
if(body != null)
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "100px";
 div.style.opacity= 0.90;
 div.style.bottom = "+60px";
 div.style.left = "+0px";
 div.style.backgroundColor = "rgba(0,0,0,0.5)";
 div.style.border = "1px solid rgba(0,0,0,0.5)";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#000099' href='https://www.facebook.com/yangnt1998' title='My profile'><blink><center>Admin</center></blink></a>"
 body.appendChild(div);
}