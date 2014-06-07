// ==UserScript==
// @name       Retweet with Comment
// @namespace  http://userscripts.org/users/jtowers
// @version    1.1
// @description  Add retweet with comment button
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include      https://twitter.com/*
// @include      http://twitter.com/*
// @run-at         document-end
// ==/UserScript==

// Adds the RT links
addLinks = function(){
    $('div.content').each(function(index){
        $tweetActions = $(this).children('.stream-item-footer').children('ul.tweet-actions.js-actions');
        // Checks for an existing RT link, adds one if it doesn't find it. 
        if($tweetActions.children('.comments').length === 0){
            //Appends the link to the end of the action list.
            $tweetActions.append($('<li class="comments retweet action-rt-container RTwC"><a href="#" class="js-action-reply RTwC">RT <i class="sm-rt"></i></a></li>'));}
        
    });
    
    //Waits for a link click
$('.RTwC').click(function(event){
    //Sets the target
    $target = $(event.target);
    //Selects the content div
    $container = $target.parents('div.content');
    //Selects the parent div
    $parentDiv = $container.parents('.tweet')
        //Gets the ID of the parent div (this is necessary to put the existing tweet text into the reply box under the tweet).
        $replyTo = $parentDiv.attr('data-tweet-id');
    //Trims the whitespace around the tweet
    $tweetText = $container.children('p.js-tweet-text').text().trim();
    // Grabs the username to add to the RT.
    $username = $container.children('.stream-item-header').children('a.account-group').children('span.username').text()
     // Combines all of the above data into a single RT. 
    $RT = "RT " + $username + " " + $tweetText
        //Waits for a second to give the reply box time to expand and then inserts the RT into the box.
    setTimeout(function () {                 
        $tweetBox = $('#tweet-box-reply-to-' + $replyTo); 
        $tweetBox.val($RT);
    }, 1000);
});
//Runs the insert link function every second to attach the RT link and handler to new tweets.
setTimeout(addLinks, 1000);
};



// Adds links on the initial load.
addLinks();
