// ==UserScript==
// @name       Show Deleted Chat Messages
// @namespace  http://userscripts.org/users/526006
// @version    0.2.1
// @description  show deleted messages on chat.*.stackexchange.com and chat.(*.\.)stackoverflow.com
// @match		*://chat.meta.stackoverflow.com/*
// @match		*://chat.stackexchange.com/*
// @match		*://chat.stackoverflow.com/*
// @copyright  2012+, Ben Collins

// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};
 
with_jquery(function($){
    $sidebar_widgets = $('#widgets');
    if ($sidebar_widgets.length == 0) {
        $('#sidebar-content').append($('<div id="widgets"></div>'));    
    }
    
    $sidebar_widgets = $('#widgets');
    $link = $('<a href="#">show deleted messages</a>').on('click', function(event, data) {
        event.preventDefault();
        $('.message').has('.deleted').each(function() {
            var mid = this.id.split('-')[1];
            var host = window.location.host;
            
            $.get('//' + host + '/messages/' + mid + '/history', function(data) {
                $('#message-'+mid).css('color','red').html($(data).find('.message:eq(0)').html());
            });
        });
    });
    $widget = $('<div class="sidebar-widget"></div>').append($link);
    
    $(function() {
        $sidebar_widgets.append($widget);
    });
});