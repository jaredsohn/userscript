// ==UserScript==
// @name            Mercurial: Easy-Read Repo List
// @namespace       http://scm.conde-dev.com/hg
// @description     Make the repo list easier to read
// @include         http://scm.conde-dev.com/hg
// @include         http://scm.conde-dev.com/hg#*
// @author          Katherine Semel
// @date            2011-03-14
// @version         1.0
// ==/UserScript==

// Add jQuery in a manner supported by both Chrome and Firefox
// loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://code.jquery.com/jquery-1.5.1.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
    //alert('jQuery Added');
}

// Add our new styling
function addStyles() {
    // Add our new styles to the header
    var style = document.getElementsByTagName('body')[0].appendChild(document.createElement('style'));
	style.setAttribute('type', 'text/css');
	style.textContent = '\
	#quicklinks {\
        list-style: none;\
        margin: 0;\
        padding: 10px;\
    }\
    #quicklinks li {\
        display: inline;\
        margin-right: 10px;\
    }\
    #quicklinks li a {\
        text-decoration: none;\
        padding: 3px 8px;\
        background-color: #999999;\
        color: #FFFFFF;\
        font-weight: bold;\
        font-size: 12px;\
    }\
    .repolinks {\
        width: 100px;\
    }\
    .repolinks a {\
        font-size: 10px;\
        text-decoration: none;\
        text-transform: uppercase;\
        letter-spacing: 0.1em;\
    }\
    .header h2 {\
        margin: 1px;\
        padding-top: 10px;\
        border-bottom: 1px solid #909989;\
        text-transform: uppercase;\
        font-size: 14px;\
    }\
    .sort td a {\
        font-size: 10px;\
        text-decoration: none;\
        text-transform: uppercase;\
        letter-spacing: 0.1em;\
    }\
    ';
    //alert('Styles Added');
}

// Clean up the display
function cleanHGDisplay() {
    var allLinks = jQuery('a.list');
    //console.log(allLinks.toString());

    var categoryName = '';

    // Grab the header row html, store it, and remove the top one
    var headerRow = jQuery('table tbody tr:first-child').html();
    headerRow = '<tr class="sort"><td>&nbsp;</td>' + headerRow + '</tr>';
    jQuery('table tbody tr:first-child').detach();
    //console.log(headerRow);

    // Get all the repo names
    jQuery('a.list').each(function(index){
        var thisCategory = $(this).text().split('/')[0];
        var thisName = $(this).text().split('/')[1];
        var thisURL = $(this).attr('href');

        // Move each group of repos to its own table
        if(thisCategory != categoryName) {
            // If this is a new group, add a header before the row
            categoryName = thisCategory;
            $(this).parent().parent().before('<tr id="' + categoryName + '" class="header"><th colspan="7"><h2>' + categoryName + '</h2></th></tr>' + headerRow );
        } else {
            //console.log(thisCategory);
        }

        // Add an id to make it easier to deal with this row
        //console.log($(this).parent().parent().html());
        $(this).parent().parent().attr('id', thisCategory + '_' + thisName);
        // Add the quick links to each repo
        $(this).parent().parent().prepend('<td class="repolinks"><a href="' + thisURL + 'graph">Graph</a> | <a href="' + thisURL + 'file">Files</a></td>');
        $(this).text(thisName);
    });

    // Make a list of quick links at the top to jump to each section
    var getAllHeaders = '<ul id="quicklinks">';
    jQuery('table tbody tr.header').each(function(index){
        getAllHeaders += '<li><a href="#' + $(this).attr('id') + '">' + $(this).text().trim() + '</a></li>';
    });
    getAllHeaders += '</ul>';
    jQuery('table').before(getAllHeaders);
}

// Add our new styles to the header
addStyles();
// load jQuery and execute the main function
addJQuery(cleanHGDisplay);

