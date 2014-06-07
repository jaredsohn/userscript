// ==UserScript==
// @name          Autocompletter: Simple Twitter auto-complete.
// @description	  Cycle through the different tweet authors on the current page as you type Esc on a word beginning with @
// @namespace     http://www.mamata.com.br/greasemonkey
// @include       http://twitter.com/*
// @include       http://www.twitter.com/*

//by Fabricio Zuardi (http://fabricio.org)
// ==/UserScript==
(function() {
    window.addEventListener("load", function(e) {
        
        function createAutoCompleteTable(){
            var table = [];
            var author_links = [];
            var authors = [];
            var timeline_tweets = document.getElementById('timeline_body').getElementsByTagName('TR');
            var friends_links = document.getElementById('friends').getElementsByTagName('A');
            //<a> links to users in the timeline
            for (var i in timeline_tweets){
                author_links.push(timeline_tweets[i].getElementsByTagName('A')[0]);
            }
            //<a> links to users in the friends grid
            for (var i in friends_links){
                author_links.push(friends_links[i]);
            }
            for (var i in author_links){
                var tweetAuthorUrl = author_links[i].getAttribute('href'); 
                var tweetAuthor = tweetAuthorUrl.substring('http://twitter.com/'.length, tweetAuthorUrl.length);
                if (!authors[tweetAuthor]) {
                    authors[tweetAuthor] = true;
                } else {
                    continue;
                }
                for (var j=0; j <= tweetAuthor.length; j++){
                    var slug = tweetAuthor.substring(0,j).toLowerCase();
                    if (!table[slug]) table[slug] = [];
                    table[slug].push(tweetAuthor);
                }
            }
            return table;
        }

        var autoCompTable = createAutoCompleteTable();
        var autoCompleteMode = false;
        var lastTweetLength = 0;
        var cycleCounter = 0;
        var optionsNumber = 0;

        document.getElementById("status").addEventListener("keyup", function(event) {
            var tweetText = event.target.value;
            var lastTypedChar = tweetText.substring(event.target.selectionStart-1, event.target.selectionStart);
            var caretPosition = event.target.selectionStart;

            switch (lastTypedChar){
                case '@':
                    autoCompleteMode = true;
                    break;
                case '':
                case ' ':
                case ',':
                    autoCompleteMode = false;
                    break;
            }

            // 27 = Esc key
            //  8 = Backspace
            // 46 = Delete
            if (((tweetText.length == lastTweetLength)&&(event.which != 27))  || event.which == 8 || event.which == 46) {
                return false;
            }
            

            //delete selection
            event.target.value = tweetText.substring(0, caretPosition) +
                tweetText.substring(event.target.selectionEnd, tweetText.length);
            tweetText = event.target.value;
                        
            if (autoCompleteMode) {
                var atStart = tweetText.substring(0, caretPosition).lastIndexOf('@')+1;
                if (atStart == 0) return false;
                var slug = tweetText.substring(atStart, caretPosition).toLowerCase();
                if (slug.indexOf(' ')!=-1) return false;
                if (slug.length > 0 && autoCompTable[slug]){
                    optionsNumber = autoCompTable[slug].length;
                    if (event.which == 27) {
                        //Esc pressed = cycle through the options
                        if (cycleCounter+1 < optionsNumber){
                            cycleCounter++;
                        } else {
                            cycleCounter = 0;
                        }
                    } else {
                        cycleCounter = 0;
                    }
                    event.target.value = tweetText.substring(0, atStart) +
                        autoCompTable[slug][cycleCounter] + 
                        tweetText.substring(atStart + slug.length, tweetText.length);
                    event.target.selectionStart = atStart + slug.length;
                    event.target.selectionEnd = atStart + autoCompTable[slug][cycleCounter].length;
                }
            }

            lastTweetLength = event.target.value.length;
        }, true);

        document.getElementById("status").addEventListener("blur", function(event) {
            if(autoCompleteMode){
                autoCompleteMode = false;
                setTimeout(function(){
                    var maintf = document.getElementById("status");
                    var tweetText = maintf.value;
                    var selectionEnd = maintf.selectionEnd
                    maintf.value = tweetText.substring(0, selectionEnd) + ' ' + tweetText.substring(selectionEnd, tweetText.length)
                    maintf.selectionStart = maintf.selectionEnd = selectionEnd+1;
                    maintf.focus();
                },0);
            }
        }, true);
    }, false);
})();