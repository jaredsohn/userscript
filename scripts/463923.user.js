// ==UserScript==
// @name        ESL Admin Tools WoT
// @description Useful tools
// @namespace   http://www.esl.eu/pl/wot/player/4964063/
// @match       http://www.esl.eu/pl/wot/*/*/admin_leaguejoins/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @version     1.0
// @run-at      document-end
// @grant       none
// ==/UserScript==
var jq = document.createElement('script');
jq.src = '//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js';
document.getElementsByTagName('head') [0].appendChild(jq);
// ... give time for script to load, then type.
jQuery.noConflict();
function PhotoLogoShow() {
    var i = 0;
    var Wzor_1on1 = /https?\:\/\/www\.esl\.eu\/pl\/wot\/1on1\/[^\/]{1,}\/admin_leaguejoins\//gi;
    var Wzor_gracz = /https?\:\/\/www\.esl\.eu\/pl\/wot\/1on1\/[^\/]{1,}\/player\/[0-9]{1,}\//gi;
    var Wzor_gracz2 = /https?\:\/\/www\.esl\.eu\/pl\/wot\/1on1\/[^\/]{1,}\/player\/[0-9]{1,}\/\?/gi;
    var Wzor_team = /https?\:\/\/www\.esl\.eu\/pl\/wot\/[2-9]on[2-9]\/[^\/]{1,}\/team\/[0-9]{1,}\//gi;
    var Wzor_team2 = /https?\:\/\/www\.esl\.eu\/pl\/wot\/[2-9]on[2-9]\/[^\/]{1,}\/team\/[0-9]{1,}\/\?/gi;
    if (document.baseURI.match(Wzor_1on1))
    {
        for (var z; document.getElementsByTagName('table') [0].getElementsByTagName('a') .length; z++)
        {
            if (Wzor_gracz.test(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href) && !Wzor_gracz2.test(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href))
            {
                var PlayerID0 = '';
                PlayerID0 += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 8);
                PlayerID0 += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 7);
                PlayerID0 += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 6);
                PlayerID0 += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 5);
                var PlayerID = PlayerID0;
                PlayerID0 += '000';
                PlayerID += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 4);
                PlayerID += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 3);
                PlayerID += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 2);
                document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].innerHTML += '<br><img width=100px height=133px src=http://eslgfx.net/gfx/logos/playerphotos/' + PlayerID0 + '/' + PlayerID + '_medium.jpg>';
            }
            i++;
        }
    } else
    {
        for (var z; document.getElementsByTagName('table') [0].getElementsByTagName('a') .length; z++)
        {
            if (Wzor_team.test(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href) && !Wzor_team2.test(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href))
            {
                var PlayerID0 = '';
                PlayerID0 += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 8);
                PlayerID0 += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 7);
                PlayerID0 += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 6);
                PlayerID0 += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 5);
                var PlayerID = PlayerID0;
                PlayerID0 += '000';
                PlayerID += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 4);
                PlayerID += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 3);
                PlayerID += document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.charAt(document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].href.length - 2);
                document.getElementsByTagName('table') [0].getElementsByTagName('a') [i].innerHTML += '<br><img width=100px height=100px src=http://eslgfx.net/gfx/logos/teams/' + PlayerID0 + '/' + PlayerID + '_small.jpg>';
            }
            i++;
        }
    }
}
function startuj() {
    $('.TitleM') .after('<button id="ESLPhotoLogoShow" style="width: 150px; height: 35px;">Show Photo/Logo</button>');
    var Wzor_1on1 = /https?\:\/\/www\.esl\.eu\/pl\/wot\/1on1\/[^\/]{1,}\/admin_leaguejoins\//gi;
    if (document.baseURI.match(Wzor_1on1))
    $('.TitleM') .after('<button id="ESLCheckAccounts" style="width: 150px; height: 35px;">Check Accounts</button>');
    var i = 0;
    function jakas() {
        var SearchUrl = 'http://api.worldoftanks.eu/wot/account/list/?application_id=1dc60019fe7b97d6a5bbe948b7ecdcdc&fields=nickname&limit=1&search=';
        var AccountLength = $('a.TextVSblack') .length;
        var HrefLength = $('a.TextVSblack') .eq(i) .attr('href') .length;
        var AccountFirstIndex = $('a.TextVSblack') .eq(i) .attr('href') .indexOf('wot_eu&value=') + 13;
        var Account = $('a.TextVSblack') .eq(i) .attr('href') .slice(AccountFirstIndex, HrefLength);
        var IsValid;
        $.get(SearchUrl + Account, function (data) {
            $('body');
            IsValid = data.count;
        }, 'json') .then(function () {
            if (IsValid == 1)
            $('a.TextVSblack') .eq(i) .append('<img src=http://gfx.esl.eu/gfx/media/de/news/famfamfam/accept.png>');
             else
            $('a.TextVSblack') .eq(i) .append('<img src=http://gfx.esl.eu/gfx/media/de/news/famfamfam/delete.png>');
        }) .then(function () {
            i++;
            if (i < AccountLength)
            jakas();
        });
    }
    $('#ESLCheckAccounts') .click(function () {
        jakas();
    });
    $('#ESLPhotoLogoShow') .click(function () {
        PhotoLogoShow();
    });
}
window.addEventListener('load', startuj, false);
