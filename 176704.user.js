// ==UserScript==
// @name            Hack Forums Context Menu Options
// @author          Snorlax (modified by Emylbus)
// @namespace       http://www.sublyme.net
// @description     Right click an username and it will give you different options
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         http://medialize.github.io/jQuery-contextMenu/src/jquery.contextMenu.js
// @require         http://medialize.github.io/jQuery-contextMenu/src/jquery.ui.position.js
// @include         *hackforums.net/showthread.php?tid=*
// @version         1.1
// ==/UserScript==

$("head").append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/s/wmeqe002sddby77/screen.css?token_hash=AAFyevfn16axgJWMvzKN2lAM1fvMN3jtLncgDPOsc6oAYA" type="text/css" class="test" />');

//$(".post_author > strong > .largetext > a").addClass("menu");
$("strong > .largetext > a").addClass("menu");

$(function(){
    $.contextMenu({
        selector: '.menu', 
        callback: function(key, options) {
        },
        items: {
            user: {name: "User Options:", disabled: true},
            activity: {name: "Post Activity", callback: function(key, opt){ 
                uid = $(this).attr("href").replace(/[^0-9]/g, '');
                window.open("http://www.hackforums.net/postactivity.php?uid="+uid,"_blank");
            }},
            usernameChange: {name: "Username Changes", callback: function(key, opt){ 
                uid = $(this).attr("href").replace(/[^0-9]/g, '');
                window.open("http://www.hackforums.net/misc.php?action=username_history&uhuid="+uid,"_blank");
            }},
            viewThreads: {name: "View Threads", callback: function(key, opt){ 
                uid = $(this).attr("href").replace(/[^0-9]/g, '');
                window.open("http://www.hackforums.net/search.php?action=finduserthreads&uid="+uid,"_blank");
            }},
            viewAwards: {name: "View Awards", callback: function(key, opt){ 
                uid = $(this).attr("href").replace(/[^0-9]/g, '');
                window.open("http://www.hackforums.net/myawards.php?uid="+uid,"_blank");
            }},
            giveRep: {name: "Give Reputation", callback: function(key, opt){ 
                uid = $(this).attr("href").replace(/[^0-9]/g, '');
                window.open('reputation.php?action=add&uid='+uid,'Reputation Page','width=350,height=350,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0')
            }}
            
        }
    });
    
    $('.menu').on('click', function(e){
        console.log('clicked', this);
    })
});