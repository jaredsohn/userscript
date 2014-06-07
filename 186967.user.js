// ==UserScript==
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @name AutoReport
// @include http://www.reddit.com/user/*
// @include http://www.reddit.com/r/*
// ==/UserScript==

var currentPage = document.URL;
var parsedPage = currentPage.split('/');
var modHash = null;
var currentUser = null;
var subreddit = null;
var commentIDs = [];
var topicIDs = [];
var subredditList = [];

function reportItem(index, num) {
	if(num == 3) {var fullname = topicIDs[index];}
	else{var fullname = commentIDs[index];}
	$.post('http://www.reddit.com/api/report', {'id': fullname, 'uh': modHash});
}

function getHash(callback) {
    var query = new XMLHttpRequest();
    query.onreadystatechange = function () {
        if (query.readyState == 4) {
            var info = JSON.parse(query.responseText);
            modHash = info.data.modhash;
            callback();
        }
    }
    query.open('GET', 'http://www.reddit.com/api/me.json', true);
    query.send(null);
}
function generateCommentsButton() {
    $('div.menuarea').append('<div id=REPORT></div>');
    var reportButton = document.createElement('button');
    var reportText = document.createTextNode('report');
    reportButton.appendChild(reportText);
    $('#REPORT').append(reportButton);
    $('#REPORT').css({'position':'absolute','top':'77px', 'left':'400px'});

    $('#REPORT').click(function() {
        for(var i = 0; i < 25; i++) {reportItem(i, null);}
		alert('All comments on this page were reported.');
    });	
}

function generateSubredditButton() {
    $('.side').append('<div id=REPORT></div>');
    var reportButton = document.createElement('button');
    var reportText = document.createTextNode('report');
    reportButton.appendChild(reportText);
    $('#REPORT').append(reportButton);
    $('#REPORT').css({'position':'relative'});

    $('#REPORT').click(function() {
        for(var i = 0; i < 25; i++) {reportItem(i, 3);}
		alert('All threads on this page were reported.');
    });		
}

function getCommentIDs(callback, param) {
    var query = new XMLHttpRequest();
    query.onreadystatechange = function() {
        if(query.readyState == 4) {
            var info = JSON.parse(query.responseText);
            for(i = 0; i < info.data.children.length; i++){
                commentIDs.push('t1_' + info.data.children[i].data.id);
                topicIDs.push(info.data.children[i].data.link_id);
                subredditList.push(info.data.children[i].data.subreddit);
            }
	
			callback(param);
        }
    }
    
    query.open('GET', 'http://www.reddit.com/user/' + currentUser + '/comments.json', true);
    query.send(null);
}

function getSubredditID(callback, param) {
	var query = new XMLHttpRequest();
	query.onreadystatechange = function() {
		if(query.readyState == 4) {
			var info = JSON.parse(query.responseText);
			//var subredditID = info.data.children[0].data.subreddit_id;
			for(i = 0; i < 25; i++) {topicIDs.push(('t3_' + info.data.children[i].data.id));}
			callback(param);
		}
	}

	query.open('GET', 'http://www.reddit.com/r/' + subreddit + '/hot.json', true);
	query.send(null);
}

if (parsedPage[3] == 'user') {
    currentUser = parsedPage[4];
    getCommentIDs(getHash, generateCommentsButton); 
}else if (parsedPage[3] == 'r') {
	subreddit = parsedPage[4];
	getSubredditID(getHash, generateSubredditButton);
}