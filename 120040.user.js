// ==UserScript==
// @name           Hide videos on the youtube my_subscriptions page
// @namespace      http://www.youtube.com/user/WASDsweden
// @description    Allows you to hide videos from the my_subscriptions page on youtube
// @version        1.08
// @include        http://youtube.com/my_subscriptions*
// @include        http://*.youtube.com/my_subscriptions*
// @include        https://youtube.com/my_subscriptions*
// @include        https://*.youtube.com/my_subscriptions*
// ==/UserScript==
//Stay up to date about this script on http://userscripts.org/scripts/show/120040

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main(){
    var hidden = localStorage.getItem('video_hider'); //get list of hidden videos
    if(!hidden){
        //if not found, make it into an empty array
        hidden = [];
    }
    else{
        hidden = hidden.split(':'); //make our string-item into an array
    }
    
    $('#vm-playlist-video-list-ol li.vm-video-item').each(function(){
        var id = $(this).attr('id').substr(9); //get the ID
        if($.inArray(id, hidden)!=-1){
            //remove the video if it's in our array of stuff to hide
            $(this).remove();
        }
        else{
            //add basic X button
            $(this).append('<span class="hideButton"><b>&nbsp;X&nbsp;</b></span>');
            var button = $('.hideButton', this);
            button.css('cursor', 'pointer'); //change cursor icon when hovering
            button.css('background-color', 'lightgrey').css('float', 'right'); //make it easier to see
            //make it clickable
            button.click(function(){
                hidden.push(id); //add ID to our array
                localStorage.setItem('video_hider', hidden.join(':')); //store it
                $(this).parents('li.vm-video-item').remove(); //hide the video
            });
        }
    });
    
    //add button to unhide all
    $('#vm-playlist-copy-to').after(' <button id="clear_hidden_list" class="yt-uix-button">Unhide all videos</button>');
    
    //make our unhide-button clickable
    $('#clear_hidden_list').click(function(){
        localStorage.setItem('video_hider', "");
        $(this).after('Done. Refresh page to see all videos.');
        $(this).remove();
    });
    
}
addJQuery(main);
