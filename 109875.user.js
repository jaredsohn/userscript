/* Hacker News Keyboard Navigation */
/* Simon Weber */
/* August 2011 */

// ==UserScript==
// @name           Hacker News Keyboard Navigation
// @namespace      http://userscripts.org/users/384231
// @description    Enable all hn navigation through arrows keys and wsad.
// @include        http://news.ycombinator.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/* Configuration. */

var markedColor = '#FAFAD2';

/* End configuration */


var $jq, curRow; 
var inMoreRow = false;

/*Script only enabled on pages with these titles. URLs are no help, they're all news.ycombinator.com. */
var enabled_titles = ["Hacker News", "Hacker News | New Links", "Hacker News | Ask"];

var main = function () {
    $jq = jQuery.noConflict();

    $jq(document).ready(function () {
        
        var title = $jq("title").text();
        if($jq.inArray(title, enabled_titles) == -1){
            return;
        }
    
        curRow = $jq("td.title").first().parent();
        mark();
    
        $jq(document).keydown(function (event) {
        
            /* Don't use shortcuts when people are typing normally. */
            
            if($jq("*:focus").is("input") || $jq("*:focus").is("textarea")) return;

            switch (event.which) {
                /* Arrow keys */
                case 38: moveUp(); break;
                case 40: moveDown(); break;
            
                /* WSAD */
                case 87: vote(); break;
                case 83: flag(); break;
                case 65: comment(); break;
                case 68: follow(); break;   
            }
        });
    
        function moveUp() {
            if (curRow.prev().length) {
                unMark();
            
                /* Need to jump one more out of More row. */
                if (curRow.next().length == 0) {
                    curRow = curRow.prev();
                    inMoreRow = false;
                }
            
                curRow = curRow.prev().prev().prev();
                mark();
            }
        }
    
        function moveDown() {
            if (curRow.next().length) {
                unMark();
            
                curRow = curRow.next().next().next();
            
                if (curRow.children().length == 0) {
                    curRow = curRow.next();
                    inMoreRow = true;
                }
              
                mark();
            }
        }
    
        function mark() {
            curRow.css('background-color', markedColor);
        }
    
        function unMark() {
            curRow.css('background-color', 'inherit');
        }
    
        function vote() {
            /* Select actual dom element ([0]) to use javascript's click instead of jquery's. */
            if (!inMoreRow) { 
                var voteLink = curRow.find('a[onclick="return vote(this)"]');
                
                if (voteLink.length) { 
                    voteLink[0].click(); 
                }
            }
        }
    
        function flag() {
            if (!inMoreRow) {
                var flagEl = curRow.next().find('a:contains("flag")').last();
            
                /* Ensure we have a flagging link. */
                if (!flagEl.length || flagEl.attr('href').indexOf('/r?fnid=') == -1) { 
                    return;
                }
            
                var contentURL = curRow.children().slice(2, 3).find('a');

                /* Flagging responds with the new page, which includes a new url for unflagging. */
                $jq.post(flagEl.attr('href'), function (data) {

                    /* Use both url of article and description to try and avoid ambiguity. */
                    var newFlag = $jq(data).find('a[href="' + contentURL.attr('href') + '"]:contains("' + contentURL.text() + '")')
                                .closest('tr')
                                .next().find('a:contains("flag")').last();
                
                    flagEl.attr('href', newFlag.attr('href'));
                    flagEl.text(newFlag.text());
                
                }, 'html'); 
            }
        }
    
        function follow() {
            if (!inMoreRow) { 
                var link = curRow.children().slice(2, 3).find('a');
            
                /* Actually follow the link. */
                window.open(link.attr('href')); 
            } else { 
                location.href = curRow.find('a').attr('href'); 
            }
        }
    
        function comment() {
            if (!inMoreRow) { 
                window.open(curRow.next().children('.subtext').children().last().attr('href')); 
            }
        }
    });
};

main();