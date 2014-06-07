// ==UserScript==
// @name           SO Show Today's Reputation
// @namespace      SO_TODAY_REP
// @description    Shows today's reputation score and time till new session begins. Written by Nick Craver, maintained by Matt Ball. http://meta.stackoverflow.com/questions/12053#57813
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// ==/UserScript==
(function() {
    function topBar() {
        $(function() {
            var nav_link = $("#hlinks-nav a:first");

            if (nav_link.length) {
                $("#topbar").css('max-width', '1000px');
                
                var ajaxOpts = {
                    dataType: 'text',
                    timeout: 5000
                };
                $.ajax('/reputation', ajaxOpts).success(function(data) {
                    
                    var today_rep = data.match(/\*\* rep today: (-?\d*)/i)[1];
                        today_rep_int = 0;
                    
                    if (today_rep) {
                        today_rep_int = parseInt(today_rep, 10);
                    }

                    var separator = nav_link.parent().prev().find('span:last');
                    separator.clone().insertBefore(separator);

                    var rep_score = $('<span class="reputation-score"></span>').text(' ' + today_rep_int).insertBefore(separator);

                    var time_score = $('<span class="badgecount"></span>').insertBefore(separator);

                    if (today_rep_int >= 200) {
                        rep_score.css('color', '#BB0000');
                        time_score.css('color', '#BB8888');
                    }

                    function timer() {
                        var now = new Date();
                        var nextSess = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0 - now.getTimezoneOffset(), 0);

                        if (nextSess.getTime() <= now.getTime()) {
                            nextSess.setDate(nextSess.getDate() + 1);
                        }

                        var diff = parseInt((nextSess.getTime() - now.getTime()) / 1000, 10);

                        var hours = parseInt((diff / 3600) % 24, 10);
                        var minutes = parseInt((diff % 3600) / 60, 10);
                        var seconds = diff % 60;

                        var settext = GM_fixNumber(hours) + ':' + GM_fixNumber(minutes) + '.' + GM_fixNumber(seconds);

                        time_score.text(' - ' + settext + ' ');
                    }

                    timer();

                    setInterval(timer, 1000);
                });
            }
        });

        function GM_fixNumber(num) {
            return num < 10 ? '0' + num : num;
        }
    }
    
    var script = document.createElement("script");
    script.textContent = "(" + topBar.toString() + ")();";
    document.body.appendChild(script);
})();