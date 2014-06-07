var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
// ==UserScript==
// @name Reddit inbox search
// @namespace redditinboxsearch
// @description searches reddit inbox
// @include http://reddit.com/*
// @include https://reddit.com/*
// @include http://*.reddit.com/*
// @include https://*.reddit.com/*
// @version 0.6
// ==/UserScript==

function redditinboxsearch() {
var idneeded = 0;
var aftervariable = 0;

function getinbox2() {
    var afterid = localStorage.getItem('afterid') || '';


    $.getJSON('http://www.reddit.com/message/inbox.json?limit=100&after=' + afterid, null, function (objArray) {
        var str = localStorage.getItem('str') || 'sep=; \r\n message body; comment(true or false); author; subject; created_utc (unix timestamp); subreddit; context \r\n';


        var line = '';


        for (var i = 0; i < objArray.data.children.length; i++) {

          var body_text = objArray.data.children[i].data.body;
			body_text = body_text.replace(/\;/g,"");
            body_text = body_text.replace(/(\r\n|\n|\r)/gm, "");
			
			var comment_context = objArray.data.children[i].data.context;
			if (! comment_context) { 
			comment_context = 'http://www.reddit.com/message'; 
			} else {
			comment_context = 'http://www.reddit.com'+comment_context;
			} 
			
			var comment_subject = objArray.data.children[i].data.subject
			comment_subject = comment_subject.replace(/\;/g,"");
			if (! comment_subject) { 
			comment_subject = 'no subject'; 
			} else {} 			

            line = '' + body_text + '; ' + objArray.data.children[i].data.was_comment + '; ' + objArray.data.children[i].data.author + '; ' + comment_subject + '; ' + objArray.data.children[i].data.created_utc + '; ' + objArray.data.children[i].data.subreddit + '; ' + comment_context + '';
            str = str + line + '\r\n';

            localStorage.setItem('str', str);

        }
        afterid = objArray.data.after;
        localStorage.setItem('afterid', afterid);

    }).complete(function () {

        console.log("afterid:" + afterid);
        if (! afterid) {


    if (navigator.appName != 'Microsoft Internet Explorer')
    {
        window.open('data:text/csv;charset=utf-8,' + escape(localStorage.getItem('str') || 'sep=, \r\n'));
    }
    else
    {
        var popup = window.open('','csv','');
        popup.document.body.innerHTML = '<pre>' + localStorage.getItem('str') || 'sep=; \r\n' + '</pre>';
    }   

            return afterid;
        } else {
		getinbox();
            return afterid;
        }

    });

}

function getinbox() {
    var afterid = localStorage.getItem('afterid') || '';


        $.getJSON('http://www.reddit.com/message/inbox.json?limit=100&after=' + afterid, null, function (objArray) {
        var str = localStorage.getItem('str') || 'sep=; \r\n message body; comment(true or false); author; subject; created_utc (unix timestamp); subreddit; context \r\n';


        var line = '';


        for (var i = 0; i < objArray.data.children.length; i++) {

            var body_text = objArray.data.children[i].data.body;
			body_text = body_text.replace(/\;/g,"");
            body_text = body_text.replace(/(\r\n|\n|\r)/gm, "");
			
			var comment_context = objArray.data.children[i].data.context;
			if (! comment_context) { 
			comment_context = 'http://www.reddit.com/message'; 
			} else {
			comment_context = 'http://www.reddit.com'+comment_context;
			} 
			
			var comment_subject = objArray.data.children[i].data.subject
			comment_subject = comment_subject.replace(/\;/g,"");
			if (! comment_subject) { 
			comment_subject = 'no subject'; 
			} else {} 			

            line = '' + body_text + '; ' + objArray.data.children[i].data.was_comment + '; ' + objArray.data.children[i].data.author + '; ' + comment_subject + '; ' + objArray.data.children[i].data.created_utc + '; ' + objArray.data.children[i].data.subreddit + '; ' + comment_context + '';
            str = str + line + '\r\n';

            localStorage.setItem('str', str);

        }
        afterid = objArray.data.after;
        localStorage.setItem('afterid', afterid);

    }).complete(function () {

        console.log("afterid:" + afterid);
        if (! afterid) {


    if (navigator.appName != 'Microsoft Internet Explorer')
    {
        window.open('data:text/csv;charset=utf-8,' + escape(localStorage.getItem('str') || 'sep=, \r\n'));
    }
    else
    {
        var popup = window.open('','csv','');
        popup.document.body.innerHTML = '<pre>' + localStorage.getItem('str') || 'sep=; \r\n' + '</pre>';
    }   

            return afterid;
        } else {
		getinbox2();
            return afterid;
        }

    });

}
getinbox();

}

// Add script to the page
document.addEventListener('DOMContentLoaded', function(e) {
    var s = document.createElement('script');
    s.textContent = "(" + redditinboxsearch.toString() + ')();';
    document.head.appendChild(s)
});