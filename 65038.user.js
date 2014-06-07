// ==UserScript==
// @name           reddit expand comments
// @namespace      http://reddit.com
// @include        http://www.reddit.com/r/programming/
// ==/UserScript==

var config = { maxComments: 5 };

$ = unsafeWindow.jQuery; 
$(document).ready(function(){
    var max = config.maxComments;
    $('#siteTable > .thing > .entry').each(function(){
        var entry = $(this);
        var comments = $('<div>');
        var clicked = false; // Only do this once
        var toggle = $('<a href="javascript:">(toggle)</a>');
        entry.find('.buttons > .first').append(toggle);
        toggle.click(function(){
            if (clicked) {
                comments.toggle();
                return false;
            }
            clicked = true;
            var rss = $(this).prev().attr('href') + '.rss';
            $.get(rss,function(text){
                var skip = false;
                var counter = 0;
                $(text).find('item').each(function(){
                    // Skip the first item (don't know how to do this in jQuery)
                    if (!skip) { skip = true; return; }
                    // We limit the number of comments displayed for our sanity
                    if (counter == max) return false;

                    // Add a new comment
                    var comment = $('<div>').css('padding','0.5em 0 0.5em 0').addClass('comment');
                    comments.append(comment);

                    // Get the author
                    var title = $(this).find('title').text().match(/^[^ ]+/).toString();
                    var author = $('<p class="tagline"><a class="author">' + title + '</a></p>');
                    comment.append(author);

                    // Get the comment content
                    var description = $(this).find('description').text();
                    var content = $('<p>' + description + '</p>').css('padding','0.5em');
                    comment.append(content);

                    // Add action buttons
                    var buttons = $('<ul class="flat-list buttons">');
                    comment.append(buttons);
                    {
                        var permalink = $(this).find('guid').text();
                        /// Quicklink button
                        var quicklink = $('<a class="bylink">quicklink</a>');
                        quicklink.attr('href',permalink.replace(/([^\/]+)$/,'#$1'));
                        buttons.append($('<li>').append(quicklink));
                        /// Permalink button
                        var perma = $('<a class="bylink">permalink</a>');
                        perma.attr('href',permalink);
                        buttons.append($('<li class="first">').append(perma));
                    }

                    //
                    counter++;
                });
                entry.append(comments);
            });
            return false;
        });
    });
});
