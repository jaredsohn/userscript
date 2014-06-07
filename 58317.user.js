// ==UserScript==%
// @name           Reddit Personal Bar
// @namespace      hirak99
// @include        http://www.reddit.com/*
// ==/UserScript==

// Found it here: http://www.reddit.com/tb/9n5xi

links = {
    'Bullshit': 'http://www.reddit.com/r/lolcats+redditchan+wtf+pics+videos+nsfw+funny+humour+fffffffuuuuuuuuuuuu+offbeat+aww+happy+marijuana',
    'News': 'http://www.reddit.com/r/news+politics+worldnews+canada+worldpolitics+economy+Libertarian+health',
    'Geekness': 'http://www.reddit.com/r/gadgets+apple+technology+space+science+geek',
    'Goodfood': 'http://www.reddit.com/r/food+recipes+cooking',
    'Photos': 'http://www.reddit.com/r/photography+itookapicture+photocritique',
    'Mind': 'http://www.reddit.com/r/wikipedia+philosophy+history+cogsci+psychology+skeptic'
};

$ = unsafeWindow.jQuery;


personal = $('<div></div>');
personal
    .insertAfter('#sr-header-area')
    .attr('id','personal-header')
    .css({
        'background': '#EAEAEA',
        'border-bottom': '1px solid gray',
        'font-size': '90%',
        'overflow': 'hidden',
        'padding': '3px 0 3px 5px',
        'white-space': 'nowrap'
    });


personalTitle = $('<div></div>').addClass('dropdown').addClass('srdrop').text('PERSONAL').appendTo(personal).css({'margin-right':'40px'});

linksList = $('<ul></ul>').addClass('flat-list').addClass('hover').appendTo(personal).css('text-transform','uppercase');
seperator = $("<span> - </span>").addClass('seperator');

i = 0;
for (title in links) {
        href = links[title];
        newItem = $('<li></li>');
        newLink = $('<a></a>').text(title).attr('href',href);
        if (href == document.location) {
            newLink.addClass('selected');
        }

        if (i > 0) {
            seperator.clone().appendTo(newItem);
        }
        newLink.appendTo(newItem);
        newItem.appendTo(linksList);
        ++i;
    }
