// ==UserScript==
// @name           CodeRanch Favourites
// @description    Only display specified forums on the forum index and the 'Recent Topics' page. Useful if you want to hide forums out of interest. Hidden forums are still accessible via 'Categories' page.
// @author         BalusC
// @namespace      http://www.coderanch.com
// @include        http://www.coderanch.com/forums*
// @exclude        http://www.coderanch.com/forums/c*
// @exclude        http://www.coderanch.com/forums/f*
// @exclude        http://www.coderanch.com/forums/p*
// ==/UserScript==

// Specify your array of favourite forums here.
var favouriteForums = new Array(
    'Servlets',
    'JSP',
    'JSF',
    'Object Relational Mapping',
    'JDBC',
    'OO, Patterns, UML and Refactoring',
    'IDEs, Version Control and other tools',
    'HTML and JavaScript',
    'Ranch Office',
    'CaSeSeNsItIvE!!!');

// Hide non-specified forums in 'Recent Topics' page.
if (window.location.href.indexOf('/forums/recentTopics') > -1) {
    var table = document.getElementsByClassName('forumline')[0];
    var rows = table.getElementsByTagName('tr');
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.getElementsByTagName('td');
        var forumLink = cells[0].getElementsByTagName('a')[0];
        var forumName = forumLink.firstChild.nodeValue;
        if (favouriteForums.indexOf(trim(forumName)) == -1) {
            row.style.display = 'none';
        }
    }
}

// Hide non-specified forums in forum index.
else if (window.location.href.indexOf('/forums') > -1) {
    var table = document.getElementsByClassName('forumline')[0];
    var rows = table.getElementsByTagName('tr');
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.getElementsByTagName('td');
        if (cells.length != 1) {
            var forumLink = cells[1].getElementsByTagName('a')[1];
            var forumName = forumLink.firstChild.nodeValue;
            if (favouriteForums.indexOf(trim(forumName)) == -1) {
                row.style.display = 'none';
            }
        }
    }
}

// Link values in Javaranch are often trailed with spaces!!!
function trim(value) {
    return value.replace(/^\s*|\s*$/g, '');
}
