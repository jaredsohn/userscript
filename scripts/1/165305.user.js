// ==UserScript==
// @name        GitHub JIRA Links
// @namespace   http://evan.pro/
// @description Link JIRA issues by patterns
// @include     https://github.com/*
// @include     https://*.github.com/*
// @version     1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

function replaceInElement(element, find, replace) {
    for (var i= element.childNodes.length; i-->0;) {
        var child= element.childNodes[i];
        if (child.nodeType==1) {
            var tag= child.nodeName.toLowerCase();
            if (tag!='style' && tag!='script')
                replaceInElement(child, find, replace);
        } else if (child.nodeType==3) { // TEXT_NODE
            replaceInText(child, find, replace);
        }
    }
}

function replaceInText(text, find, replace) {
    var match;
    var matches= [];
    while (match= find.exec(text.data))
        matches.push(match);
    for (var i= matches.length; i-->0;) {
        match= matches[i];
        text.splitText(match.index);
        text.nextSibling.splitText(match[0].length);
        text.parentNode.replaceChild(replace(match), text.nextSibling);
    }
}

setTimeout(function() {
    var find = new RegExp('\\b\(' + localStorage['issue-patterns'] + '\)\\b', 'gi');

    replaceInElement(document.body, find, function(match) {
        var link= document.createElement('a');
        link.href= localStorage['jira-url'] + 'browse/' + match[0].replace(/([A-Z]+)(\d+)/,'\$1-\$2');
        link.appendChild(document.createTextNode(match[0]));
        return link;
    });
}, 1000);

$('#page-settings .settings-content').append('<div class="boxed-group clearfix"><h3>JIRA Link Detection</h3><div class="boxed-group-inner clearfix"><dl class="form"><dt><label>Issue Pattern(s)</label></dt><dd><input class="autosavelocal" type="text" name="issue-patterns" value="' + localStorage['issue-patterns'] + '"></dd></dl><dl class="form"><dt><label>JIRA URL</label></dt><dd><input class="autosavelocal" type="text" name="jira-url" value="' + localStorage['jira-url'] + '"></dd></dl>');

var changeValue = function() {
    localStorage[$(this).attr('name')] = $(this).val();
}
$('input.autosavelocal').keypress(changeValue).change(changeValue);