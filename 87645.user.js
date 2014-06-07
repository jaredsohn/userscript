// ==UserScript==
// @name        Fluid Badge for Yammer Unread Messages
// @namespace   http://fluidapp.com
// @description Primitive script to update the docBadge with your unread message count.
// @include     *
// @author      Jim Halberg
// ==/UserScript==

(function () {
    window.setInterval(updateYammerBadge, 5000);
})();

function updateYammerBadge(){
    if (!document.getElementsByClassName){
        alert('UserScript:: "Fluid Badge for Yammer Unread Messages" thinks you should try a different user-agent.'); // yep, no effort to support others
    } 
    else{
        var yj_notices_container = document.getElementsByClassName("yj-notices-container");
        var dock_badge_value = '';
        if(yj_notices_container && yj_notices_container.length > 0){
          var new_messages = yj_notices_container[0];
          
          yj_new_messages_notice = new_messages.getElementsByClassName("yj-new-messages-notice");
          if(yj_new_messages_notice && yj_new_messages_notice.length > 0 && yj_new_messages_notice[0].style.display != 'none'){
          
            // var new_messages = document.getElementById("new-messages-notice");
            var elems = new_messages.getElementsByClassName("yj-notice-text");
            if(elems.length == 0){
                // normally this will mean you've navigated away from the feeds page -- if it seems busted though... maybe Yammer markup changed?
            }
            else{
                var message = elems[0].innerHTML;
                if(message != '' && new_messages.style.display != 'none'){
                  numeric_message = message.match(/.*(\d).*/);
              
                  if(numeric_message){
                   dock_badge_value = numeric_message[1];
                  }
                  else{
                    dock_badge_value = '!';
                  }
                }
            }
          }
        }
        window.fluid.dockBadge = dock_badge_value;
    }
}
