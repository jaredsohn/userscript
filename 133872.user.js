// ==UserScript==
// @name       Group Post Count
// @namespace  http://gm.bungie.co/
// @version    0.1
// @description  Displays the number of posts in a group (as well as its posts per day) in the group summary table.
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @match      http://*.bungie.net/fanclub/*
// @match      https://*.bungie.net/fanclub/*
// @copyright  2012, ctjl96
// ==/UserScript==
String.prototype.minus = function (what) { var p = this.substring(0, this.indexOf(what)) + this.substr(this.indexOf(what) + what.length); return p.toString() || this.toString(); };

function isGroupHome() {
    if ($('#ctl00_groupHomeLink')) {
        return true;
    }
    else {
        return false;
    }
}

function isMember() {
    if (!$('#ctl00_MainContentArea_membershipLink')) {
        return true;
    }
    else {
        return false;
    }
}

function daysSinceFounded() {
    var s = $('.groupstatus')[0].innerHTML;
    var o = s.slice(s.indexOf(/[\d]{1,2}\.[\d]{1,2}\.[\d]{4}/.exec(s)),s.indexOf(/[\d]{1,2}\.[\d]{1,2}\.[\d]{4}/.exec(s)[0]) + /[\d]{1,2}\.[\d]{1,2}\.[\d]{4}/.exec(s)[0].length);
    var then = new Date(o.split('.')[2], o.split('.')[0] - 1, o.split('.')[1]);
    var m = new Date();
    var today = new Date(m.getFullYear(), m.getMonth(), m.getDate());
    return (today - then) / (1000 * 60 * 60 * 24);
}

function returnTotalPostCount() {
    function getPostCountOnPage(forumLink, pageNum) {
        if (!pageNum || typeof(pageNum) !== 'number') {
            pageNum = 1;
        }
        var k = $.ajax({
            url: forumLink + '&topicRepeater1-p=' + pageNum,
            dataType: 'html',
            async: false
        });
        var p = $(k.responseText).find('div.list-h h5 span');
        var postCount = 0;
        for (var i = 0; i < p.length; i++) {
            postCount += (p.get(i).innerHTML.minus(' replies') * 1) || (p.get(i).innerHTML.minus(' reply') * 1) || 0;
        }
        return postCount;
    }
    var o = $.ajax({
        url: $('#ctl00_groupForumsLink').attr('href'),
        dataType: 'html',
        async: false
    });
    var pageCount = ($($(o.responseText).find('.chunk')[2]).text().minus(' of ') * 1) || 1;
    var p = 0;
    var link = $('#ctl00_groupForumsLink').attr('href');
    for (var i = 1; i <= pageCount; i++) {
        p += getPostCountOnPage(link, i);
    }
    return p;
}

if (isGroupHome() && isMember()) {
    $('.group_summary_table').append('<tr><td>Posts:</td><td id="postCount"><a id="calculatePostCount" style="cursor:pointer">Calculate</a></td></tr>');
    $('#calculatePostCount').click(function() {
        $('#calculatePostCount').fadeOut('slow');
        $('#postCount').text('Loading...');
        var c = returnTotalPostCount();
        $('#postCount').fadeOut('slow');
        $('#postCount').text(c.toString());
        $('#postCount').fadeIn('slow');
        var p = (c / daysSinceFounded()).toString().indexOf('.') !== -1 ? (c / daysSinceFounded()).toString().substring(0, (c / daysSinceFounded()).toString().indexOf('.') + 2) : c / 

daysSinceFounded();
        $('.group_summary_table').append('<tr style="display:none" id="activityRow"><td>Activity:</td><td>' + p + ' posts per day</td></tr>');
        $('#activityRow').fadeIn('slow');
    });
}