// ==UserScript==
// @name       C&H filter
// @namespace  http://eepp.ca/
// @version    0.1.2
// @description  Filter C&H comics (new previous/next links)
// @match      *://*.explosm.net/comics/*
// @copyright  2012+, Philippe Proulx
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var gChFilterConfig = {
    filter: {
        /* Put any combination of authors into this array.
         * 
         * Examples:
         *     ['Rob']                 // only Rob
         *     ['Rob', 'Dave']         // Rob and Dave
         *     ['Kris', 'Matt', 'Rob'] // Kris, Matt and Rob
         * 
         * The author names are case sensitive.
         */
        authors: ['Rob']
    }
};

function chFilterLog(txt) {
    $('#rob-status').append(txt + "\n");
}

function chFilterLogClear() {
    $('#rob-status').text('');
};

function chFilterMatch(htmlData) {
    for (var i in gChFilterConfig.filter.authors) {
        var author = gChFilterConfig.filter.authors[i];
        var matchStr = '/author/' + author;
        if (htmlData.search(matchStr) != -1) {
            chFilterLog('matched author <strong>' + author + '</strong>');
            
            return true;
        }
    }
    
    return false;
}

function chFilterSearch(url, matchRe) {
    chFilterLog("fetching page: " + url);
    $.get(url, function(data) {
        chFilterLog("fetched page:  " + url);
        if (chFilterMatch(data)) {
            chFilterLog("match!         " + url);
            document.location = url;
        } else {
            chFilterLog("no match:      " + url);
            var link = data.match(matchRe);
            if (!link) {
                chFilterLog("got end of range...");
            } else {
            	chFilterSearch(link[1], matchRe);
            }
        }
	}, 'html');
}

$(document).ready(function() {
    // log box
    $($('table')[0]).after('<pre id="rob-status" style="padding: 0px 15px 0px 15px; text-align: left;"></pre>');
    
    // addon links
    var prevFilteredHtml = '';
    var nextFilteredHtml = '';
    if ($('a[rel="prev"]').length != 0) {
        prevFilteredHtml = '<a style="font-size: 14px; color: #ff850b;" href="javascript:void(0);" id="prev-rob">&larr; Previous <strong>filtered</strong></a>';
    }
    if ($('a[rel="next"]').length != 0) {
        nextFilteredHtml = '<a style="font-size: 14px; color: #ff850b;" href="javascript:void(0);" id="next-rob">Next <strong>filtered</strong> &rarr;</a>';
    }
    var sep = '';
    if (prevFilteredHtml.length > 0 && nextFilteredHtml.length > 0) {
        sep = ' | ';
    }
    $('td[align="right"] nobr').after('<br />' + prevFilteredHtml + sep + nextFilteredHtml);
    
    // addon links actions
    $('#prev-rob').attr('data-href', $('a[rel="prev"]').attr('href')).click(function() {
		var url = $(this).attr('data-href');
        chFilterLogClear();
        chFilterSearch(url, /<a\s+rel="prev"\s+href="([^"]+)"/);
        
        return false;
    });
    $('#next-rob').attr('data-href', $('a[rel="next"]').attr('href')).click(function() {
        var url = $(this).attr('data-href');
        chFilterLogClear();
        chFilterSearch(url, /<a\s+rel="next"\s+href="([^"]+)"/);
       
        return false;
    });
});
