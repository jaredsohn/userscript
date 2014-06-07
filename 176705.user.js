// ==UserScript==
// @name            Hack Forums Context Menu Options = Staff Version
// @author          D3xus
// @description     Modified version of Snorlax's original script to add an "Edit User" and "Ban User" feature.
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         http://medialize.github.io/jQuery-contextMenu/src/jquery.contextMenu.js
// @require         http://medialize.github.io/jQuery-contextMenu/src/jquery.ui.position.js
// @include         *hackforums.net/showthread.php?tid=*
// @version         1.0
// ==/UserScript==

$("head").append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/s/wmeqe002sddby77/screen.css?token_hash=AAFyevfn16axgJWMvzKN2lAM1fvMN3jtLncgDPOsc6oAYA" type="text/css" class="test" />');

$(".post_author > strong > .largetext > a").addClass("menu");

$(function(){
    $.contextMenu({
        selector: '.menu', 
        callback: function(key, options) {
        },
        items: {
            staff: {name: "Staff Options:", disabled: true},
            editUser: {name: "Edit User", callback: function(key, opt){ 
                uid = $(this).attr("href").replace(/[^0-9]/g, '');
                window.open("http://www.hackforums.net/modcp.php?action=editprofile&uid="+uid,"_blank");
            }},
            banUser: {name: "Ban", callback: function(key, opt){ 
                uid = $(this).attr("href").replace(/[^0-9]/g, '');
                window.open("http://www.hackforums.net/modcp.php?action=banuser&uid="+uid,"_blank");
            }},
            user: {name: "User Options:", disabled: true},
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