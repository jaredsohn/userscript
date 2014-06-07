// ==UserScript==
// @name        YouTube Fixes
// @namespace   Mogle
// @include     http*://*.youtube.com/*
// @version     1.6.8
// @changes     1.6.8: Had to push a graphical fix because of YouTube changing the layout. Experimenting with intelligent pause functionality.
// @changes     1.6.7: Bug fixes related to the Watch-page, including resize of HTML5-videos.
// @changes     1.6.6: Attempts to fix visual bug occurring for some.
// @changes     1.6.5: Performance increased. Enhanced Watched-detection.
// @changes     1.6.3: Minor fixees. Deleted deprecated code; can be found in old versions.
// @changes     1.6.2.1: Broke Spacebar so you couldn't comment. Whoops... Fixed it!
// @changes     1.6.2: Bound Enter and Spacebar to always Play/Pause the video (no scrolling on Spacebar). The work of commenting the code has begun!
// @changes     1.6.1: Some minor fixes to the previous additions.
// @changes     1.6: New feature: Define the width and height of the YouTube player! Also fixed broken "Uploaded X minutes ago".
// @changes     1.5: Checkboxes are remembered. Optional Regular Expression-based filtering added (beta function). Upgraded to JQuery 2.0.3
// @changes     1.2.2: Added LOAD ALL-button. Filter-list is now alphabetical.
// @changes     1.2.1: Fixes to hide Watched, since YouTube has changed some things.
// @changes     1.2: Increased performance, Watched-functionality.
// ==/UserScript==

// CTRL+F to access parts of the code quickly:
// Codepart 1: Global stuff - Adds link to the Inbox to the header again, redirects to HTTPS...
// Codepart 2: Subscriptions page - Adds all of the controls to the Subscriptions page
// Codepart 3: The Watch-page - Adds functionality for Watched-functionality, customize player size...
// Codepart 4: Playlist - Adds counter to the Playlist-pages that show the total number of views for all the videos in the playlist.



// Inserts code into the page including jQuery support
function doJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


// ----------------------------------------------------------------------------------------------------
// Codepart 1: Global stuff - Adds link to the Inbox to the header again, redirects to HTTPS...
function fixInbox(){
    $('#masthead-expanded-menu-list').append('<li class="masthead-expanded-menu-item"><a href="/inbox" class="yt-uix-sessionlink" data-sessionlink="' + $('a.yt-uix-sessionlink').attr("data-sessionlink") + '">Inbox</a></li>');
}
doJQuery(fixInbox);

// Redirects you from HTTP to HTTPS
if (location.href.match(/http:/) ){
    var newUrl = location.href.replace("http://","https://");
    
    if(top.location==location.href){
        window.location.href = newUrl;
        window.navigate(newUrl);
        self.location=newUrl;
        top.location=newUrl;
    }
}

if (location.href.match(/redirect\?q=/) ){
    function redirectThrough(){
        top.location = $('#baseDiv p').eq(0).children('a').eq(0).html();
    }
    
    doJQuery(redirectThrough);
}
// ----------------------------------------------------------------------------------------------------


// Codepart 2: Subscriptions page - Adds all of the controls to the Subscriptions page
if(location.href.match(/feed\/subscriptions/)){
    function initialStuff(){
        // Checkbox-settings
        var boxes = localStorage.getItem('boxes_hider'); //get list of hidden videos
        if(!boxes){
            //if not found, make it into an empty array
            boxes = {"hideWatched":true, "useRegex":false};
            localStorage.setItem('boxes_hider', JSON.stringify(boxes));
        }
        else{
            boxes = JSON.parse(boxes); //make our string-item into an array
        }
        
        $('.feed-item-main').css('margin','0');
        
        $('div.yt-lockup-description').remove();
        $('div.feed-header').remove();
        
        $('#page').css('width','90%');
        $('#content').css('width','80%');
        
        $('.feed-load-more-container').eq(0).html( $('.feed-load-more-container').eq(0).html()  + '<input type=submit value="LOAD ALL" id=loadALL>');
        $('#loadALL').click(function(){
            var r=confirm("Warning: Loading all videos will make the page run slow until it's done.\nPress OK to load, Cancel to abort.")
            if (r==true){
                var continues = true;
                setInterval(function(){
                    if(continues){
                        $('.feed-load-more').eq(0).attr('id','loadsMore');
                        document.getElementById('loadsMore').click();
                        
                        if( $('.feed-load-more-container').attr('style') == 'display: none;' )
                            continues = false;
                    }
                }, 2000);
            }
        });
        
        $('#feed').prepend('<table border=0 cellpadding=5 cellspacing=0><tr id=videoTR></tr></table>');
        
        
        // Watched-patch
        var watchedVideos = localStorage.getItem('watched_hider'); //get list of hidden videos
        if(!watchedVideos){
            //if not found, make it into an empty array
            watchedVideos = ['21'];
        }
        else{
            watchedVideos = watchedVideos.split(':'); //make our string-item into an array
        }
        
        var hidden = localStorage.getItem('video_hider'); //get list of hidden videos
        if(!hidden){
            //if not found, make it into an empty array
            hidden = [];
        }
        else{
            hidden = hidden.split(':'); //make our string-item into an array
        }
        
        var hiddenSeries = localStorage.getItem('series_hider');
        if(!hiddenSeries){
            hiddenSeries = ["thing i don't watch", "boring thing", "uninteresting thing"];
        }
        else{
            hiddenSeries = hiddenSeries.split('||');
        }
        
        var hideWatchedBox = 'Hide Watched videos <input type=checkbox id=hideWatched>';
        var useRegexBox = 'RegEx in filters (<a href="" id=whatIsRegex>?</a>) <input type=checkbox id=useRegex>';
        var unhideButton = '<button id="clear_hidden_list" class="yt-uix-button">Show manually hidden videos</button>';
        var seriesController = "<h2>Videos to filter</h2><textarea id=seriesControlTextarea cols=25 rows=4></textarea><br><input type=submit value=Filter id=seriesControlFilterButton>";
        $('#guide-subscriptions-section').eq(0).html( hideWatchedBox + "<p><br>" + useRegexBox + "<p><br>" + unhideButton + "<p><br>" + seriesController + $('#guide-subscriptions-section').html() );
        
        $('#seriesControlTextarea').css('display','block');
        $('#seriesControlTextarea').css('width','100%');
        $('#seriesControlTextarea').css('height','150px');
        $('#seriesControlTextarea').css('padding','0');
        $('#seriesControlTextarea').css('border','1px solid #000');
        $('#seriesControlTextarea').css('margin','0 auto');
        $('#seriesControlTextarea').css('margin-left','-40px');
        $('#seriesControlTextarea').css('overflow','auto');
        
        $('#whatIsRegex').click(function(){
            window.open("http://www.w3schools.com/jsref/jsref_obj_regexp.asp", '_blank');
            return false;
        });
        
        // Make the checkboxes correspond with the saved settings
        $('#hideWatched').prop('checked', boxes.hideWatched);
        $('#useRegex').prop('checked', boxes.useRegex);
        
        
        
        //make our unhide-button clickable
        $('#clear_hidden_list').click(function(){
            localStorage.setItem('video_hider', "");
            //$(this).after('Done. Refresh page to see all videos.');
            hidden = [];
            hideTheRightStuff();
            //$(this).hide();
        });
        
        for(i=0; i<hiddenSeries.length; i++){
            $('#seriesControlTextarea').val( $('#seriesControlTextarea').val() + hiddenSeries[i] + "\n" );
        }
        
        $('#seriesControlFilterButton').click(function(){
            var eachEnteredThing = $('#seriesControlTextarea').val().split("\n");
            
            hiddenSeries = [];
            
            for(i=0; i<eachEnteredThing.length; i++){
                if(eachEnteredThing[i] != ""){
                    hiddenSeries.push(eachEnteredThing[i]);
                }
            }
            hiddenSeries.sort();
            localStorage.setItem('series_hider', hiddenSeries.join('||'));
            hideTheRightStuff()
        });
        
        
        // Base function supplied by http://stackoverflow.com/users/331508/brock-adams
        function waitForKeyElements (selectorTxt,actionFunction,bWaitOnce,iframeSelector){
            var targetNodes, btargetsFound;
            
            if (typeof iframeSelector == "undefined")
                targetNodes     = $(selectorTxt);
            else
                targetNodes     = $(iframeSelector).contents ()
                .find (selectorTxt);
            
            if (targetNodes  &&  targetNodes.length > 0) {
                targetNodes.each ( function () {
                    var jThis        = $(this);
                    var alreadyFound = jThis.data ('alreadyFound')  ||  false;
                    
                    if (!alreadyFound) {
                        var userLink;
                        var timeAgo;
                        var views;
                        var imageLink;
                        var titleLink;
                        
                        // Old layout
                        userLink = $(this).children('.feed-item-header').children('.feed-item-actions-line').children('.feed-item-owner').html();
                        
                        // New, icon-based layout
                        userLink = "<a href='" + $(this).parent().children(".feed-author-bubble-container").children("a").attr("href") + "'>"
                        + $(this).parent().children(".feed-author-bubble-container").children("a").children("span").children("span").children("span").children("span").children("img").attr("alt") + "</a>";
                        
                        //timeAgo = $(this).children('.feed-item-header').children('.feed-item-time').html();
                        $(this).children('.feed-item-header').remove();
                        
                        imageLink = $(this).children('.feed-item-main-content').children('.yt-lockup').children('.yt-lockup-thumbnail').html();
                        titleLink = $(this).children('.feed-item-main-content').children('.yt-lockup').children('.yt-lockup-content').children('.yt-lockup-title').html();
                        timeAgo = $(this).children('.feed-item-main-content').children('.yt-lockup').children('.yt-lockup-content').children('.yt-lockup-meta').children('ul').children('li').eq(0).html();
                        views = $(this).children('.feed-item-main-content').children('.yt-lockup').children('.yt-lockup-content').children('.yt-lockup-meta').children('ul').children('li').eq(1).html();
                        
                        $('#videoTR').append( "<td style='width:185px;height:200px;margin-left:20px;margin-top:10px;margin-bottom:10px;float:left;'>" + imageLink + titleLink + "<br>" + timeAgo + " by " + userLink + "<br>" + views + "</td>" );
                        $(this).parent().parent().remove();
                        
                        hideTheRightStuff();
                        
                        jThis.data ('alreadyFound', true);
                    }
                } );
                btargetsFound   = true;
            }
            else {
                btargetsFound   = false;
            }
            
            var controlObj      = waitForKeyElements.controlObj  ||  {};
            var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
            var timeControl     = controlObj [controlKey];
            
            if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
                clearInterval (timeControl);
                delete controlObj [controlKey]
            }
            else {
                if ( ! timeControl) {
                    timeControl = setInterval ( function () {
                        waitForKeyElements (    selectorTxt, actionFunction, bWaitOnce, iframeSelector );
                    }, 500);
                    controlObj [controlKey] = timeControl;
                }
            }
            waitForKeyElements.controlObj   = controlObj;
        }
        
        function testIt(){
            
        }
        
        waitForKeyElements ("div.feed-item-main", testIt);
        
        function hideTheRightStuff(){
            $('#videoTR td').each(function(){
                var id = $(this).children("a.ux-thumb-wrap").attr('href').substr($(this).children("a.ux-thumb-wrap").attr('href').indexOf('=')+1); //get the ID
                
                if($.inArray(id, hidden)!=-1 || $.inArray('/watch?v=' + id, hidden)!=-1 || false){
                    //remove the video if it's in our array of stuff to hide
                    $(this).hide();
                } // 
                else if( ($('#hideWatched').prop('checked') && $(this).html().indexOf('watched-badge') > -1) || ($('#hideWatched').prop('checked') && ($.inArray(id, watchedVideos) != -1) || $(this).html().indexOf('watched-message') > -1 ) ){
                    // Watched looks
                    $(this).children('a').children('span').children('span').children('span').children('span').children('img').css('opacity', '0.2');
                    $(this).addClass('customWatched');
                    $(this).hide();
                }
                    else{
                        $(this).show();
                        // Get the title of the video
                        var title = $(this).children('a').eq(1).html();
                        
                        // Hide the series
                        for(var i=0; i<hiddenSeries.length; i++){
                            if( boxes.useRegex ){
                                var regex = new RegExp(hiddenSeries[i], "gim");
                                
                                if( title.match(regex) ){
                                    $(this).hide();
                                    break;
                                }
                            }
                            else if( title.toLowerCase().indexOf(hiddenSeries[i].toLowerCase()) > -1 ){
                                $(this).hide();
                                break;
                            }
                                }
                    }
                
                if( $(this).html().indexOf('&nbsp;X&nbsp;') == -1 ){
                    //add basic X button
                    $(this).append('<span class="hideButton"><b>&nbsp;X&nbsp;</b></span>');
                    
                    var button = $('.hideButton', this);
                    button.css('cursor', 'pointer'); //change cursor icon when hovering
                    button.css('background-color', 'lightgrey').css('float', 'right').css('margin','0px 30px 30px 0px'); //make it easier to see
                    
                    //make it clickable
                    button.click(function(){
                        hidden.push(id); //add ID to our array
                        localStorage.setItem('video_hider', hidden.join(':')); //store it
                        $(this).parent().hide(); //hide the video
                    });
                }
            });
            
            if( !boxes.hideWatched )
                $('.customWatched').show();
        }
        
        $('#hideWatched').mousedown(function() {
            if ($(this).is(':checked')) {
                // goes unchecked
                $('.customWatched').show();
                
                boxes.hideWatched = false;
            }
            else{
                // goes checked
                $('.customWatched').hide();
                
                boxes.hideWatched = true;
            }
            localStorage.setItem('boxes_hider', JSON.stringify(boxes) ); //store it
        });
        
        $('#useRegex').mousedown(function() {
            if ($(this).is(':checked')) {
                // goes unchecked
                boxes.useRegex = false;
            }
            else{
                // goes checked
                boxes.useRegex = true;
            }
            localStorage.setItem('boxes_hider', JSON.stringify(boxes) ); //store it
            hideTheRightStuff();
        });
        
        hideTheRightStuff();
    }
    doJQuery(initialStuff);
    
}
// ----------------------------------------------------------------------------------------------------

// Codepart 3: The Watch-page. Adds functionality for Watched-functionality, customize player size...
if (location.href.match(/watch\?/) ){
    window.scroll(55, 60);
    
    var firstCheckDone = false;
    
    ytplayer = document.getElementById("movie_player");
    
    //setInterval(pauseVideo,500);
    
    function pauseVideo(){
        if( ytplayer.getDuration()){
            if(ytplayer.getPlayerState() > 0 && (ytplayer.getCurrentTime() < (ytplayer.getDuration()-1)) ){
                
                if(!firstCheckDone)
                    ytplayer.pauseVideo(); // stop autoplay
                
                ytplayer.unMute();
                firstCheckDone = true;
            }
            else{
                ytplayer.mute();
                firstCheckDone = false;
            }
        }
    }
    
    function spacebarToPause(){
        $(document).keydown(function(evt) {
            if ((evt.keyCode == 13 || evt.keyCode == 32) && document.activeElement.tagName.toLowerCase() != "textarea" && document.activeElement.tagName.toLowerCase() != "input") {
                ytplayer = document.getElementById("movie_player");
                ytplayer.blur();
                
                if( ytplayer.getPlayerState() == 1 )
                    ytplayer.pauseVideo();
                else if( ytplayer.getPlayerState() == 2 )
                    ytplayer.playVideo();
                    
                    //alert(document.activeElement.tagName);
                    }
            
            return !(evt.keyCode == 32 && document.activeElement.tagName.toLowerCase() != "textarea" && document.activeElement.tagName.toLowerCase() != "input");
        });
    }
    doJQuery(spacebarToPause);
    
    function lookOnReddit(){
        $("#action-panel-details").prepend( "<a target=_blank href='http://www.reddit.com/search?q=" + $("#eow-title").attr('title').replace(/'/, '').replace(/  /,' ') + "'>Search on Reddit</a>" );
    }
    doJQuery(lookOnReddit);
    
    function checkAllStuff(){
        $("#action-panel-details").prepend( "<button id=checkStuff>Check</button>" );
        $('#checkStuff').click(function(){
            ytplayer = document.getElementById("movie_player");
            
            var info = "";
            info += "getCurrentTime(): " + ytplayer.getCurrentTime() + "\n";
            info += "getPlayerState(): " + ytplayer.getPlayerState() + "\n";
            info += "getDuration(): " + ytplayer.getDuration() + "\n";
            alert( info );
        });
    }
    doJQuery(checkAllStuff);
    
    function addChangePlayerSizeControls(){
        var playerWidth;
        var playerHeight;
        var savedCustomSize = localStorage.getItem('savedCustomSize');
        
        var fullVideoPlayerSelector = '#player-api, .video-stream.html5-main-video, video';
        
        if( !savedCustomSize ){
            playerWidth = $(fullVideoPlayerSelector).css('width').replace('px','');
            playerHeight = $(fullVideoPlayerSelector).css('height').replace('px','');
            savedCustomSize = playerWidth + ':' + playerHeight;
            localStorage.setItem('savedCustomSize', savedCustomSize);
        }
        else{
            playerWidth = savedCustomSize.split(':')[0];
            playerHeight = savedCustomSize.split(':')[1];
        }
        
        $('#eow-title').parent().parent().append( '<input type=checkbox id=autoUpdateSize> ' );
        $('#eow-title').parent().parent().append( '<input type=text id=customPlayerWidth size=3 value="' + playerWidth + '"> x <input type=text size=3 id=customPlayerHeight value="' + playerHeight + '"> px');
        $('#eow-title').parent().parent().append( ' <input type=submit id=customSizeSaveButton value="Save"> </p>' );
        
        $(fullVideoPlayerSelector).css('width', $('#customPlayerWidth').val() + 'px');
        $(fullVideoPlayerSelector).css('height', $('#customPlayerHeight').val() + 'px');
        
        setTimeout(function(){
            $(fullVideoPlayerSelector).css('width', $('#customPlayerWidth').val() + 'px');
            $(fullVideoPlayerSelector).css('height', $('#customPlayerHeight').val() + 'px');
            $(fullVideoPlayerSelector).css('left', '0px');
        }, 1000);
        
        $('#customSizeSaveButton').hide();
        
        $('#customPlayerWidth').keyup(function(){
            if( $('#autoUpdateSize').is(':checked') )
                $(fullVideoPlayerSelector).css('width', $(this).val() + 'px');
            $('#customSizeSaveButton').show();
        });
        $('#customPlayerHeight').keyup(function(){
            if( $('#autoUpdateSize').is(':checked') )
                $(fullVideoPlayerSelector).css('height', $(this).val() + 'px');
            $('#customSizeSaveButton').show();
        });
        $('#customSizeSaveButton').click(function(){
            $(fullVideoPlayerSelector).css('width', $('#customPlayerWidth').val() + 'px');
            $(fullVideoPlayerSelector).css('height', $('#customPlayerHeight').val() + 'px');
            
            savedCustomSize = $('#customPlayerWidth').val() + ':' + $('#customPlayerHeight').val();
            localStorage.setItem('savedCustomSize', savedCustomSize);
            
            $(this).hide();
        });
    }
    
    // There is a known bug on YouTube where the video suddenly just stops, setting Current Time = Total Duration of the video...
    // This function adds a Reload-button which reloads the page - starting at the current time, so you don't have to manually go there!
    function setUpReloadButton(){
        $('#eow-title').parent().parent().append( "<input type=submit value='Reload video' id=videoReloader>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" );
        $('#videoReloader').click( function(){
            ytplayer = document.getElementById("movie_player");
            hours = Math.floor( (ytplayer.getCurrentTime() / (60*60)) );
            minutes = Math.floor( ( (ytplayer.getCurrentTime()-(hours*60*60)) / 60) );
            seconds = Math.floor( (ytplayer.getCurrentTime() % 60) );
            
            baseURL = "https://www.youtube.com/watch?v=";
            
            // Thank you to http://stackoverflow.com/users/220819/jacob-relkin for this easy solution
            var video_id = window.location.search.split('v=')[1];
            var ampersandPosition = video_id.indexOf('&');
            if(ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
            }
            
            top.location = baseURL + video_id + "&t=" + ( hours + "h" + minutes + "m" + seconds + "s" );
        });
    }
    
    // Create a custom Watched-system.
    function watchedVideo(){
        // Get watched videos
        var watchedVideos = localStorage.getItem('watched_hider'); //get list of hidden videos
        if(!watchedVideos){
            //if not found, make it into an empty array
            watchedVideos = ['21'];
        }
        else{
            watchedVideos = watchedVideos.split(':'); //make our string-item into an array
        }
        
        var video_id = window.location.search.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        if( $.inArray(video_id,watchedVideos) == -1 ){
            watchedVideos.push(video_id); //add ID to our array
            localStorage.setItem('watched_hider', watchedVideos.join(':')); //store it
        }   
    }
    
    doJQuery(setUpReloadButton);
    doJQuery(watchedVideo);
    doJQuery(addChangePlayerSizeControls);
}
// ----------------------------------------------------------------------------------------------------

// Codepart 4: Playlist. Adds counter to the Playlist-pages that show the total number of views for all the videos in the playlist.
if (location.href.match(/playlist\?/) ){
    
    function viewCountOnPlaylist(){
        var total = 0;
        $('.header-stats:contains("video")').html($('.header-stats:contains("video")').html() + '<li><span class="stat-value" id=videoviews></span><span class="stat-name"> Video views</span></li></ul>');
        $('span.video-view-count').each(
            function(){
                total += parseInt($(this).html().replace(" ", "", 'g').replace("views","").replace(",","",'g').replace("No","0"));
            }
        );
        $('#videoviews').html(addCommas(total));
        
        function addCommas(nStr)
        {
            nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }
    }
    
    doJQuery(viewCountOnPlaylist);
}
