// ==UserScript==
// @name           CodeRanch highlight list
// @description    Highlight specific users on CodeRanch (http://www.coderanch.com). Threads and messages of the users matching the specified usernames will be highlighted red. Useful to know which users you initially want to ignore or know of that they are bad.
// @author         BalusC
// @namespace      http://www.coderanch.com
// @include        http://www.coderanch.com/forums/*
// @include        http://www.coderanch.com/t/*
// ==/UserScript==

// Specify your array of highlighted users here.
var highlightedUsers = new Array('username', 'anotherName', 'CaSeSeNsItIvE!');

// Highlight users in general forums.
if (window.location.href.indexOf('/forums') > -1) {
    var rows = document.getElementsByClassName('forumline')[0].getElementsByTagName('tr');
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var forumName = row.getElementsByClassName('name')[0].getElementsByTagName('a')[0].firstChild.nodeValue;
        if (highlightedUsers.indexOf(trim(forumName)) > -1) {
            var cells = row.getElementsByTagName('td');
            for (var j = 0; j < cells.length; j++) {
                cells[j].style.backgroundColor = '#ffaaaa';
            }
        }
    }
}

// Highlight users in threads.
else if (window.location.href.indexOf('/t') > -1) {
    var rows = document.getElementsByClassName('forumline')[0].getElementsByClassName('firstRowOfPost');
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var forumName = row.getElementsByTagName('a')[1].firstChild.nodeValue;
        if (highlightedUsers.indexOf(trim(forumName)) > -1) {
            var cell = row.getElementsByTagName('td')[0];
            cell.style.backgroundColor = '#ffaaaa';
        }
    }
}

// Link values in Javaranch are often trailed with spaces!!!
function trim(value) {
    return value.replace(/^\s*|\s*$/g, '');
}
