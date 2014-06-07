// ==UserScript==
// @name        Stack Exchange timeline link
// @namespace   http://vyznev.net/
// @description Adds a link to the question timeline on Stack Exchange
// @include     *stackexchange.com/questions/*
// @include     *stackoverflow.com/questions/*
// @include     *superuser.com/questions/*
// @include     *serverfault.com/questions/*
// @include     *stackapps.com/questions/*
// @include     *mathoverflow.net/questions/*
// @include     *askubuntu.com/questions/*
// @version     1.0
// @grant       none
// ==/UserScript==

var qid = $('#question').data('questionid');
if (qid) {
    html = '<span class="lsep">|</span><a class="userscript-timeline"' +
	' href="/posts/' + Number(qid) + '/timeline"' +
	' title="timeline for this post">timeline</a>'
    $('#question .post-menu').append(html);
}
