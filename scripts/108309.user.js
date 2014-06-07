// ==UserScript==
// @author         Steven Irby
// @name           FixHackerNews
// @namespace      hacker news
// @description    Clean up some stuff on hacker news.
// @include        http://news.ycombinator.com*
// @include        https://news.ycombinator.com*
// @exclude        http://news.ycombinator.com/lists*
// @exclude        http://news.ycombinator.com/rss
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js
// ==/UserScript==


console = unsafeWindow.console;

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");

    if (typeof callback !== 'undefined') {
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
    }
    document.body.appendChild(script);
}

var main = function () {
        $(document).ready(function() {
            var $title = $('.title'),
                $anchor,
                $number,
                location,
                $css = $('<style type="text/css">' + 
                    '.lastVisited { background-color : #FFFFCC; }' +
                    '.upVote {' +
                    '    float : left;' +
                    '    border-color : transparent transparent #555555;' +
                    '    border-style : solid;' +
                    '    border-width : 0 7px 10px;' +
                    '    height : 0;' +
                    '    width : 0;' +
                    '    }'+
                '</style>'),
                $toggleNumbering = $('<div>' +
                    '<a href="#" class="toggleNumbering" rel="nofollow" style="font-size: 8pt; padding-left: 23px;">' +
                    '   hide/unhide numbering'+
                 '</a></div><br/><br/>');
                
            // add some CSS to the page
            $('head').append($css);
            
            // add button to and click event for toggling numbers
            location = window.location.href;
            
            if (window.location.href.search(/item/) == -1 && 
                window.location.href.search(/user/) == -1 && 
                window.location.href.search(/submit/) == -1 &&
                window.location.href.search(/newcomments/) == -1 &&
                window.location.href.search(/threads/) == -1) {
                $('table:eq(2)').before($toggleNumbering);
            }
        
            $toggleNumbering.find('.toggleNumbering').click(function (e) {
                $('.numbering').each(function () {
                    $number = $(this);
                    if ($number.css('visibility') === 'hidden') {
                        $number.css('visibility', '');
                    } else {
                        $number.css('visibility', 'hidden');            
                    }
                });
                e.preventDefault();
            });
            
            // change the background-color;    
            $('table')[0].bgColor = '#ffffff';
            
            // change those tiny triangles
            $('a').filter(function () {
                var id = $(this).attr('id');
                if (id) {
                    return id.match('up_');
                }
            }).each(function () {
                var $node = $(this);
                if ($node.find('img')) {
                    $node.find('img').hide();
                    $node.addClass('upVote');
                    $node.parents('td').css('padding-right', '5px');
                }
            });
            
            // add target="_blank" to all the articles
            $title.each(function () {
                $anchor = $(this).find('a');
                if ($anchor.length) {
                    if ($anchor.text() !== 'More') {
                        $anchor.attr('target', '_blank');
                    }
                } else {
                    $(this).addClass('numbering').css('visibility', 'hidden');
                }
            });
            
            // click event for showing the last story you read
            $('.title').delegate('a', 'click', function (e) {
                $('.lastVisited').removeClass();
                $(this).parents('.title').addClass('lastVisited');
            });
        });
};

if (typeof $ === 'undefined') {
    // no jQuery so add it (probably running in chrome
    addJQuery(main);
} else {
    main();
}