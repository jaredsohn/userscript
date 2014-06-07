// ==UserScript==
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include http://www.reddit.com/user/*
// @name updownuser
// ==/UserScript==

var currentPage = document.URL;
var parsedPage = currentPage.split('/');
var modHash = null;
var currentUser = null;
var commentIDs = [];
var topicIDs = [];
var subredditList = [];

function upVote(index) {
    var fullname = commentIDs[index];
     $.post('http://www.reddit.com/api/vote', {'id': fullname, 'dir': 1, 'uh': modHash});
}
function neutralVote(index) {
    var fullname = commentIDs[index];
     $.post('http://www.reddit.com/api/vote', {'id': fullname, 'dir': 0, 'uh': modHash});
}
function downVote(index) {
    var fullname = commentIDs[index];
    $.post('http://www.reddit.com/api/vote', {'id': fullname, 'dir': -1, 'uh': modHash});
}
function getHash(callback) {
    var query = new XMLHttpRequest;
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
function init() {
    $('div.menuarea').append('<div id=UPVOTE></div>');
    $('div.menuarea').append('<div id=NEUTRAL></div>');
    $('div.menuarea').append('<div id=DOWNVOTE></div>');
    var upButton = document.createElement('button');
    var downButton = document.createElement('button');
    var neutral = document.createElement('button');
    var upText = document.createTextNode('upvote');
    var nText = document.createTextNode('neutral');
    var downText = document.createTextNode('downvote');
    upButton.appendChild(upText);
    neutral.appendChild(nText);
    downButton.appendChild(downText);
    $('#UPVOTE').append(upButton);
    $('#NEUTRAL').append(neutral);
    $('#DOWNVOTE').append(downButton);
    $('#UPVOTE').css({'position':'absolute','top':'77px', 'left':'150px'});
    $('#NEUTRAL').css({'position':'absolute','left':'218px','top':'77px'});
    $('#DOWNVOTE').css({'position':'absolute','left':'286px','top':'77px'});

    $('#UPVOTE').click(function() {
        for(var i = 0; i < 25; i++) {
            upVote(i);
            var strippedTopic = topicIDs[i].split('_');
            var strippedComment = commentIDs[i].split('_');
            var url = 'http://www.reddit.com/r/' + subredditList[i] + '/comments/' + strippedTopic[1] + '/xml/' + strippedComment[1];
            window.open(url);
        }
    });

    $('#DOWNVOTE').click(function() {
        for(var i = 0; i < 25; i++) {
            downVote(i);
            var strippedTopic = topicIDs[i].split('_');
            var strippedComment = commentIDs[i].split('_');
            var url = 'http://www.reddit.com/r/' + subredditList[i] + '/comments/' + strippedTopic[1] + '/xml/' + strippedComment[1];
            window.open(url);
        }
    });

    $('#NEUTRAL').click(function() {
        for(var i = 0; i < 25; i++) {
            neutralVote(i);
            var strippedTopic = topicIDs[i].split('_');
            var strippedComment = commentIDs[i].split('_');
            var url = 'http://www.reddit.com/r/' + subredditList[i] + '/comments/' + strippedTopic[1] + '/xml/' + strippedComment[1];
            window.open(url);
        }

    });

}

function getIDs() {
    var query = new XMLHttpRequest();
    query.onreadystatechange = function() {
        if(query.readyState == 4) {
            var info = JSON.parse(query.responseText);
            for(i = 0; i < info.data.children.length; i++){
                commentIDs.push('t1_' + info.data.children[i].data.id);
                topicIDs.push(info.data.children[i].data.link_id);
                subredditList.push(info.data.children[i].data.subreddit);

            }
        }
    }

    query.open('GET', 'http://www.reddit.com/user/' + currentUser + '/comments.json', true);
    query.send(null);
}

if (parsedPage[3] == 'user') {
    currentUser = parsedPage[4];
    getIDs();
    getHash(init);

}    