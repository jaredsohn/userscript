// ==UserScript==
// @name        NewsBlur - Use Google Reader Keys
// @namespace   http://twitter.com/GDorn
// @include     *newsblur.com/*
// @version     3
// ==/UserScript==

function embed(){
    
    var unbind_keys = function(){
        var to_unbind = Array(); //collect things to unbind; can't modify during iteration as $._data is realtime
        
        //sooper-sekrit jquery internal, stores events and such.
        var keydowns = jQuery._data(document, 'events')['keydown'];
        
        //collect the ones matching the keys we don't like
        for(var i=0; i<keydowns.length; i++){
            obj = keydowns[i];
            var key = obj['data'];
            if (key == 'up' || key == 'down' || key == 'n' || key == 'p'){
                to_unbind.push(obj);
            }
        }
        
        jQuery.each(to_unbind, function(i, obj){
            unbind_event(obj);
        });
    }
    
    var unbind_event = function(what){
        jQuery(document).unbind('keydown', what['handler']);
    }
    
    
    
    //unbind the problem keys (runs upon injection)
    unbind_keys();
    
    //rebind n and p to what up/down used to do
    jQuery(document).bind('keydown', 'n', function(e){
        e.preventDefault();
        NEWSBLUR.reader.show_next_story(1);
        //try to focus on the top of the 'all site stories' frame to make arrows work immediately
        elem = jQuery('#story_pane');
        if (elem){
            elem.focus();   
        } 
    });
    jQuery(document).bind('keydown', 'p', function(e){
        e.preventDefault();
        NEWSBLUR.reader.show_next_story(-1);
    });
    
    //bind 'v' to open story in a new tab/window
    jQuery(document).bind('keypress', 'v', function(e) {
        e.preventDefault();
        var story_id = NEWSBLUR.reader.active_story;
        if (!story_id) return;
        var story = NEWSBLUR.reader.model.get_story(story_id);
        story.story_view.open_story_in_new_tab();
    });
    
}


jQuery = this.jQuery;
if(jQuery){
    console.log("jQuery available, registering ready handler.");
    jQuery(document).ready(embed);
} else {
    console.log("jQuery unavailable, injecting into page.");
    /*
    * Workaround for chrome's sandboxing.  
    * See http://stackoverflow.com/a/3602611/402605
    * Essentially replaces $(document).ready();
    */
    var inject = document.createElement("script");
    inject.setAttribute("type", "text/javascript");
    inject.appendChild(document.createTextNode("(" + embed + ")()"));
    document.body.appendChild(inject);
}