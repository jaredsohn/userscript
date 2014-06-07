//Sort reddit by date
//Version 1.0
//By Jeremy Satterfield
//I am in no way associated with digg.com for rorr.im.
//Released under
//Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License
//http://creativecommons.org/licenses/by-nc-sa/3.0/

//Adds links to the top of the "hot", "controversial"
//and top pages on the front page and reddits which
//will allow you to sort the pages by date.

//Changelog:
//1.0 - 7/29/2010 - Initial build and release

// ==UserScript==
// @name           Sort reddit by date
// @namespace      jsatt.blogspot.com
// @description    Adds links to sort by date submitted
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// @exclude        http://*.reddit.com/new/*
// @exclude        http://reddit.com/new/*
// @exclude        http://*.reddit.com/saved/*
// @exclude        http://reddit.com/saved/*
// ==/UserScript==

var $ = unsafeWindow.jQuery,
    console = unsafeWindow.console,
    sitetable = $('.sitetable'),
    links = sitetable.find('.thing').get();

page = $('.tabmenu').find('.selected').text();
label = (/hot/.test(page))?"hot":(/controversial/.test(page))?"controversial":(/top/.test(page))?"top":"other";

if(label != "other"){
    for( l in links ){
	var date = $(links[l]).find('.tagline').text().match(/submitted (\d+) (\S+) ago/);
	if(date[2].match(/second[s]?/)){
	    links[l].date = date[1];
	}else if(date[2].match(/minute[s]?/)){
	    links[l].date = date[1]*60;
	}else if(date[2].match(/hour[s]?/)){
	    links[l].date = date[1]*3600;
	}else if(date[2].match(/day[s]?/)){
	    links[l].date = date[1]*86400;
	}else if(date[2].match(/month[s]?/)){
	    links[l].date = date[1]*2592000;
	}else if(date[2].match(/year[s]?/)){
	    links[l].date = date[1]*31536000;
	}
    };

    function sortit(){
	sorter = $(this);

	container.find('a').removeClass('selected');
	sorter.addClass('selected');

	// sort the rows
	links.sort(function(a, b){
	    if(sorter.attr('rel') === "hot"){
		return $(a).find('.rank').text()-$(b).find('.rank').text();
	    }else{
		return a.date-b.date;
	    }
	});

	// re-attach the rows in the new, sorted order
	sitetable.append(links);
    }

    container = $('<div class="menuarea spacer"/>').insertBefore(sitetable);
    datesort = $('<a href="#" rel="date">new</a>').click(sortit).appendTo(container).after(" | ");
    $('<a href="#" rel="hot" class="selected">'+label+'</a>').click(sortit).appendTo(container);

    //Uncomment the next line to default sorting by date
    //datesort.click();
}
