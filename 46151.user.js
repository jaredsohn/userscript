// ==UserScript==
// @name           Reddit Sponsored Link Details
// @namespace      Reddit
// @description    Display score details for sponsored links.
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

// TODO:
// - Display submitted time

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery;
        GM_run();
    }
}
GM_wait();

function GM_run() {
    if ($('div.promoted').length) { $('div.promoted').ready(function() {
        var api_path = location.href + '.json';
        $.getJSON(api_path,
            function(raw_data) {
                data = raw_data[0].data.children[0].data;
                submitted = new Date(data.created * 1000);
                months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                date = (String(submitted.getDay()).length > 1) ? submitted.getDay() : '0' + submitted.getDay()
                // 
                template = 'submitted ' + 
                            'by <a class="author" href="/user/' + data.author + '/">' + data.author + '</a> ' + 
                            'to <a class="subreddit hover" href="/r/' + data.subreddit + '/">' + data.subreddit + '</a>';
                $('div.promoted div.score').text(data.score);
                $('div.promoted p.tagline').html(template);
                $('div.side div.subreddit-info').parent().before(
                    '<div class="spacer"><div class="raisedbox linkinfo thing">' +
                        '<table class="details">' +
                        '<tr><th>submitted on</th><td>' +
                            date + ' ' + 
                            months[submitted.getMonth()] + ' ' +
                            submitted.getFullYear() +
                        '</td>' +
                        '<tr><th>points</th><td>' + data.score + '</td>' +
                        '<tr><th>up votes</th><td>' + data.ups + '</td>' +
                        '<tr><th>down votes</th><td>' + data.downs + '</td>' +
                        '</table>' +
                    '</div></div>'
                );
            }
        );
    }); }
}