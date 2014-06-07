// ==UserScript==
// @name          Pre-written pull request comments for GitHub
// @version       1.0
// @description   Provies a few common responses to be left on GitHub pull requests and issues.
// @author        Evan Coury
// @namespace     http://evan.pro/
// @include       https://github.com/*
// ==/UserScript==

var comments = [
    {
        'name'    : 'PR branch',
        'comment' : 'Please remember to create specific branches for your PRs: http://blog.evan.pro/keeping-a-clean-github-fork-part-1',
    },
    {
        'name'    : 'Unit tests',
        'comment' : 'Thanks. Could you please add unit tests for your changes?',
    },
];

$(document).ready(function(){
    p = $('<p><span class="default">Common responses: </span></p>');
    $(comments).each(function(i, val) {
        link = $('<a href="#">'+val.name+'</a>');
        link.data('comment', val.comment);
        link.on('click', function(e){
            e.preventDefault();
            $("textarea[name='comment[body]']").val($(this).data('comment'));
        });
        link.appendTo(p);
        if (comments.length > i+1) {
            p.append(', ');
        }
    });
    p.appendTo($('div.write-content'));
});