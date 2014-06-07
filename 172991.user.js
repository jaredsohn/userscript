// ==UserScript==
// @name        unreadfixer
// @namespace   http://www.reddit.com/r/toolbox
// @author      agentlame, creesch, LowSociety
// @description mark everything unread
// @include     http://reddit.com/message/moderator/unread*
// @include     http://*.reddit.com/message/moderator/unread*
// @version     1.0
// ==/UserScript==
 
function unreadfixer() {

// Make sure that people can fix the "unread" message sticking around in /unread/ by adding an "mark all unread" button
    
    $('.menuarea').after('<div class="tb-mark-unread">Mark all modmail as read</div>');
     $('body').delegate('.tb-mark-unread', 'click', function() {
    console.log('something has been clicked');
         
    if ($('.message')){
    $('.message').each(function() {
    
    var unreadmessageid = $(this).find('.bylink').attr('href');
        
        $.post('/api/read_message', {
                     id: 't4_'+unreadmessageid.match(/[^\/]+$/),
                     uh: reddit.modhash,
                     api_type: 'json'
                });
        
    
    }); 
    }
    }); 
   

}

document.addEventListener('DOMContentLoaded',function(e){var s=document.createElement('script');s.textContent="("+unreadfixer.toString()+')();';document.head.appendChild(s)});

(function addcss(){
    if( !document.head ) return setTimeout( addcss );

    // Add to all pages

var css = '\
.tb-mark-unread { \
width:100%;\
cursor:pointer;\
padding:5px;\
color:#369; \
font-size:200%;\
font-weight:bold;\
}\
.tb-mark-unread:hover { \
text-decoration:underline;\
}';

 s=document.createElement('style');s.type="text/css";s.textContent=css;document.head.appendChild(s);
})();