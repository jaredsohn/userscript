// ==UserScript==
// @name           Author Filter for Slog and Line Out
// @description    Adds a list of authors to the right sidebar and allows you to hide posts by those authors
// @version        1.0.3
// @author         Jon Collins
// @copyright      2009 Jon Collins
// @namespace      http://joncollins.name/
// @attribution    Original idea inspired by Dennis Bratland
// @include        http://slog.thestranger.com/blogs/slog/
// @include        http://slog.thestranger.com/blogs/slog/?*
// @include        http://slog.thestranger.com/slog/archives/*/
// @include        http://slog.thestranger.com/slog/archives/*/?*
// @include        http://lineout.thestranger.com/blogs/lineout/
// @include        http://lineout.thestranger.com/blogs/lineout/?*
// @include        http://lineout.thestranger.com/lineout/archives/*/
// @include        http://lineout.thestranger.com/lineout/archives/*/?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=48591
// ==/UserScript==

// Version 1.0.3
//
// * Included sizzemctwizzle's auto update script
//
// Version 1.0.2
//
// * Removed unused variable
//
// Version 1.0.1
//
// * Added support for Line Out
//
// Version 1.0.0
//
// * Initial release


var authorStatus = getAuthorStatus();


$(document).ready(function() {
    hideIgnoredAuthors();
    setNewAuthorsAsVisible();
    injectAuthorCheckboxes();
});


function hideIgnoredAuthors() {
    $(".postedBy a").each(
        function(i) {
            var authorUp = $(this).html().toUpperCase();
            
            // hide the blog post if author is set to invisible
            if (authorStatus[authorUp] === true) {
                $(this).parent().parent().hide();
            }
            else {
                $(this).parent().parent().show();
            }
        }
    );
}


function setNewAuthorsAsVisible() {
    $(".postedBy a").each(
        function(i) {
            var authorUp = $(this).html().toUpperCase();
            
            // add to author status list as visible if not there
            if (authorStatus[authorUp] === undefined) {
                authorStatus[authorUp] = false;
            }
        }
    );
}


function injectAuthorCheckboxes() {
    // create a sorted author list array
    var authors = new Array();
    for (var author in authorStatus) {
        authors.push(author);
    }    
    authors.sort();
    
    //create the checkboxes and surrounding div
    var div = $(document.createElement('div'))
        .addClass('BlogDefault')
        .addClass('BlogrollWide')
        .css('width', '330px')
        .css('text-align', 'left');
    
    $(document.createElement('h2'))
        .addClass('sitesection')
        .text('Filter Authors')
        .appendTo(div);
    
    for (var i = 0; i < authors.length; i++) {
        getAuthorCheckbox(authors[i], authorStatus[authors[i]]).appendTo(div);
    }
    
    // append to right sidebar
    div.appendTo($('#gridSpanningIsland'));
}

function getAuthorCheckbox(author, status) {
    var div = $(document.createElement('div'));

    var input = $(document.createElement('input'))
        .attr('type', 'checkbox')
        .attr('value', author)
        .bind('change', function(e) {
            if (this.checked == true) {
                authorStatus[this.value] = true;
            }
            else {
                authorStatus[this.value] = false;
            }

            hideIgnoredAuthors();
            saveAuthorStatus();
        })
        
    
    if (status == true) {
        input.attr('checked', 'checked');
    }
    
    input.appendTo(div);
    $(document.createTextNode(' ' + author)).appendTo(div);
    
    return div;
}


function saveAuthorStatus() {
    GM_setValue('authorStatus', authorStatus.toSource());
}

function getAuthorStatus() {
    var authorStatus = GM_getValue('authorStatus');
    
    if (authorStatus === undefined) {
        authorStatus = new Object();
    }
    else {
        authorStatus = eval(authorStatus);
    }

    return authorStatus;
}