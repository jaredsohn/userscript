// ==UserScript==
// @name           Twitter upgrade
// @namespace      com.remysharp.twitterUpgrade
// @description    Adds: twitter keys, search (via @joshr's script), lat/long conversion to real location and adds offline convesation link, now includes hashtags
// @include        *twitter.com/*
// ==/UserScript==

// Twitter keys, Twitter locations, offline link
// Version 1.1
// 2008-09-19
// Copyright (c) 2008, Left Logic
// Author Remy Sharp - http://twitter.com/rem
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// Twitter Search script
// version 0.2
// 2008-09-19
// Copyright (c) 2008, Dash Labs
// Author David Stone - http://twitter.com/builtbydave
// Author Josh Russell - http://twitter.com/joshr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// Twitter hashtags
// http://userscripts.org/scripts/review/24528
// http://knoedeldealer.de/
// Copyright (c) 2008, KnoedelDealer
// Author KnoedelDealer - http://knoedeldealer.de/

// Follower
// Shows in an obvious way if a certain twitter user is following you
// http://icant.co.uk/sandbox/follower.user.js
// http://www.wait-till-i.com/2008/10/22/greasemonkey-script-to-show-if-a-twitter-user-follows-you-or-not/
// Author Chris Heilmann - http://www.wait-till-i.com/

function tweetStatusChange() {
    var timeline = document.getElementById('timeline'),
        statuses, i, j, id, tweet, spans, buttons,
        replyImg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAAACXBIWXMAAAsTAAALEwEAmpwYAAACiUlEQVQokU2SQU8bVxSFvzczQSM8HWywGwfkQQ5Vm7TBiEWUqKnYtKISUtW/0T/SXX9H2QDKFqk7REQqUxRBpIIJQXbwyIJoxp7aaDzz3u0GS9z9d8659x7FvRGREvCN1vqViKwAj4wxrogMgY+O4zRt234LtJRSKYC6Bz8DXmRZ9gp4qrWe7/f7xdvb2weu66ae5312XfejZVknlmXtA38rpdrOHVwBvs+y7NfhcPi82WzOJkli+b6vCoUCcRy7vV6vWKvVgtXV1a89z3uolBqLyGDi/vN4PP6z2+1+3tnZkW63K8YYSZJEer2e5HkuSZJIp9OR7e1t0+/3P6Vp+oeIvLQAjDEvtdZP9/b2Smtra1SrVU5OTtjd3SUMQ5rNJltbW1QqFer1urq4uPjStu0G8MwC0Fp/d3NzszA9Pc3s7CxxHHNwcMD6+jqNRgMRoVwuMzU1he/7RFFkG2MW8zx/7NzdsBLHsVcsFhXA5eUl5XIZz/MAiKKIWq0GwPX1NYVCQYnIDFCaJMiUUsYYw91K+L4PQJZlhGHIwsICIkKn0yEIAgFyIHcAHMf5UCwWn7RarWlABUHA8fExZ2dnhGFItVrl/PycwWDA/Pw8lUolN8aEtm13JgJv5+bmHgOP2u22HQSB2tjYoN1us7Kygm3btFotlpaWqNfrRms9sCzrvWVZ7ydv/DZN09+vrq7+3dzc1Kenp0ZrLVprMcaI1lrSNJXDw0N9dHQ0HI/HeyLym4jU7zfxpzzPfxkOhz/u7+9/NRqNHszMzEyKxGg0MouLi/8tLy8fO47zl+M4r5VS7+4LfAEEwGqWZT9orRtRFAVZlrmlUqnvuu4HpdQ/juO8Ad4B10qp0f9ttWhk8iW3zAAAAABJRU5ErkJggg==" />';

    // hashtag variables
	var tagsiteurl = GM_getValue('tagsiteurl');
	if (!tagsiteurl || tagsiteurl == 'undefined' || tagsiteurl == '') tagsiteurl = 'http://www.hashtags.org/tag/$1/';

    statuses = findEntries();
    
    // single status page
    if ((/statuses/).test(window.location.pathname)) {
        tweet = (statuses[0].getElementsByTagName('p')[0].textContent || "").replace(/^\s+|\s+$/g, '');
        id = window.location.pathname.split('/').pop();
        buttons = document.getElementById('status_actions_' + id);

        buttons.innerHTML += '<a title="Take tweet offline" href="mailto:?body=Tweet: ' + tweet.replace(/"/g, '%22') + '">' + replyImg + '</a>';
        
        // now do the hashtag
        tweet = statuses[0].getElementsByTagName('p')[0];
        tweet.innerHTML = tweet.innerHTML.replace(/#([\d\w\-]+)/g, '#<a href="' + tagsiteurl + '" title="tag: $1" class="hashtaglink">$1</a>');
    } else {
        for (i = 0; i < statuses.length; i++) {
            spans = statuses[i].getElementsByTagName('span');
            for (j = 0; j < spans.length; j++) {
                if (spans[j].className.indexOf('entry-content') !== -1) {
                    tweet = (spans[j].textContent || "").replace( /^\s+|\s+$/g, "" );
                    spans[j].innerHTML = spans[j].innerHTML.replace(/#([\d\w\-]+)/g, '#<a href="' + tagsiteurl + '" title="tag: $1" class="hashtaglink">$1</a>');
                    break;
                }
            }
            
            // insert offline link
            buttons = Array.prototype.slice.apply(statuses[i].getElementsByTagName('div')).pop();
            
            buttons.innerHTML += '<a title="Take tweet offline" href="mailto:?body=Tweet: ' + tweet.replace(/"/g, '%22') + '">' + replyImg + '</a>';
        }
    }
}

function tweetLocation() {
    var sidebar = document.getElementById('side'),
        spans, i, latlong, adr, script;
        
    if (sidebar) {
        spans = sidebar.getElementsByTagName('span');
        
        for (i = 0; i < spans.length; i++) {
            if (spans[i].className == 'adr') {
                adr = spans[i].textContent;
                break;
            }
        }

        if (adr && adr.indexOf('iPhone: ') !== -1) {
            latlong = adr.replace(/iPhone: /, '').replace(/,/, '%2C');
            loadLocationFromLatLong(latlong);
        }
    }
}

function loadLocationFromLatLong(latlong) {
    var code = function () {
        window.__tweetLocationDetailed = function (o) {
            var sidebar = window.parent.document.getElementById('side'),
                spans, i, adr;

            if (sidebar) {
                spans = sidebar.getElementsByTagName('span');
                
                // blur the location a little
                adr = o.Placemark[0].address.split(/,/);
                adr.shift();
                adr = adr.join(',');

                // reverse would be faster, but I know the span I'm looking for is higher up
                for (i = 0; i < spans.length; i++) {
                    if (spans[i].className == 'adr') {
                        spans[i].innerHTML = '<a href="http://maps.google.com/maps?q=' + o.Placemark[0].Point.coordinates[1] + '%2C' + o.Placemark[0].Point.coordinates[0] + '">' + adr + '</a>';
                        break;
                    }
                }
            }
        };
    };
    
    
    var apikey = 'ABQIAAAApp0H5C9pbTZl2ieJL3B98xSnhvsz13Tv4UkZBHR3eJwOymtuUxTX0Sc8LHhxJCe_ZUkapoD9UL07vw';
    // requires two hits to google's map api

    var url = 'http://maps.google.com/maps/geo?output=json&oe=utf-8&ll=' + latlong + '&key=' + apikey + '&callback=__tweetLocationDetailed';
    
    var iframeTemplate = [
        '<!' + 'DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"', 
        '    "http://www.w3.org/TR/html4/loose.dtd">', 
        '<' + 'html>', 
        '<' + 'head>', 
        '<' + 'script>',
        '%script%',
        '<' + '/script>',
        '<' + 'script src="' + url + '"><' + '/script>', 
        '<' + '/head>', 
        '<' + 'body>', 
        '<' + '/body>', 
        '<' + '/html>'
    ].join("\n");
    
    var frame = document.createElement('iframe');
    frame.id = '__twitterLocationCheck';
    frame.style.display = 'none';
    document.getElementsByTagName('body')[0].appendChild(frame);
    
    var win = frame.contentDocument || frame.contentWindow.document; 
    
    // I could use unsafeWindow - but I'm happier (I guess in my head), 
    // with the iframe injection
    // doing the '(' + code.toString() + ')()' was the only way I could
    // get code to run inside the *real* window 
    win.write(iframeTemplate.replace(/%script%/, '(' + code.toString() + ')()'));
    win.close();
    
}

function addSearch() {
    var side = document.getElementById('side');
    
    if (side) {
        var section_header = side.getElementsByTagName('div')[0];
        var sections = side.getElementsByTagName('div');

        // this means we have search for any page
        var insertPoint = document.getElementById('friends').parentNode.getElementsByTagName('div')[0];

        /* build div container */
        var main = document.createElement('div');
        main.className = 'section';
        main.style.padding = '0px 0px 15px 0px';

        var sh = document.createElement('div');
        sh.className = 'section-header';

        var a = document.createElement('a');
        a.href = 'http://search.twitter.com/advanced';
        a.className = 'section-links';
        a.innerHTML = 'advanced';

        var h1 = document.createElement('h1');
        h1.innerHTML = 'Search';

        var form = document.createElement('form');
        form.action = 'http://search.twitter.com/search';
        form.id = 'searchForm';
        form.method = 'get';
        form.name = 'searchForm';

        var se = document.createElement('div');
        se.id = 'searchEntry';

        var input = document.createElement('input');
        input.autosave = 'com.twitter.search';
        input.size = 11;
        input.id = 'searchBox';
        input.name = 'q';
        input.placeholder = 'Enter your query';
        input.results = 10;
        input.type = 'search';


        var submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Search';
        submit.style.margin = '0px 0px 0px 13px';

        sh.appendChild(a);
        sh.appendChild(h1);
        se.appendChild(input);
        se.appendChild(submit);
        form.appendChild(se);
        main.appendChild(sh);
        main.appendChild(form);

        /* insert */
        insertPoint.parentNode.insertBefore(main, insertPoint);
    }
}

// used by both offline and hashtags
function findEntries() {
    var entries = [], i;
    
    var timeline = document.getElementById('timeline');
    if (timeline) {
        var el = timeline.getElementsByTagName('tr');
        for (i in el) {
            if (el[i].className && el[i].className.indexOf('hentry') > -1) {
                entries.push(el[i]);
            }
        }
    }

    el = document.getElementsByTagName('p');
    for (i in el) {
        if (el[i].className && el[i].className.indexOf('entry-content') > -1) {
            entries.push(el[i]);
        }
    }

    var permalink = document.getElementById('permalink');
    if (permalink) {
        entries.push(permalink);
    }
    
    return entries;
}

function TwitterHashtags() {

    var entries = new Array();
    var tagsiteurl = GM_getValue('tagsiteurl');

    if (!tagsiteurl || tagsiteurl == 'undefined' || tagsiteurl == '') tagsiteurl = 'http://search.twitter.com/search?q=%23$1';

    this.useHashtagsOrg = function() {
        GM_setValue('tagsiteurl', 'http://www.hashtags.org/tag/$1/');
        document.location.reload();
    };


    this.useTwemesCom = function() {
        GM_setValue('tagsiteurl', 'http://twemes.com/$1');
        document.location.reload();
    };

    this.useSearchTwitterComWithHash = function() {
        GM_setValue('tagsiteurl', 'http://search.twitter.com/search?q=%23$1');
        document.location.reload();
    };

    this.useSearchTwitterComWithoutHash = function() {
        GM_setValue('tagsiteurl', 'http://search.twitter.com/search?q=$1');
        document.location.reload();
    };

}

function hashTags() {
    // note that I've moved the hashtag replacing in the tweetStatusChange function because they need to run politely together
    var twitterhashtags = new TwitterHashtags();

    GM_registerMenuCommand('Hastags: use hashtags.org', twitterhashtags.useHashtagsOrg);
    GM_registerMenuCommand('Hastags: use twemes.com',   twitterhashtags.useTwemesCom);
    GM_registerMenuCommand('Hastags: use search.twitter.com (with hash)',    twitterhashtags.useSearchTwitterComWithHash);
    GM_registerMenuCommand('Hastags: use search.twitter.com (without hash)', twitterhashtags.useSearchTwitterComWithoutHash);
}

function twitterKeys() {
    var keys = { 
        love : "♥",
        plane : "✈",
        smile : "☺",
        ':-)' : "☺",
        ':)' : "☺",
        music : "♬",
        boxtick : "☑",
        spade : "♠",
        phone : "☎",
        darksmile : "☻",
        song : "♫",
        box : "☒",
        whitespade : "♤",
        carrot : "☤",
        sad :  "☹",
        ':-(' : "☹",
        ':(' : "☹",
        note : "♪",
        female : "♀",
        star : "✩",
        letter : "✉",
        pirate : "☠",
        tick : "✔",
        male : "♂",
        darkstar : "★",
        wheel : "✇",
        recycle : "♺",
        retweet : "♺",
        rt : "♺",
        cross : "✖",
        cook : "♨",
        random1 : "❦",
        cloud : "☁",
        peaceout : "✌",
        king : "♛",
        rose : "❁",
        islam : "☪",
        umbrella : "☂",
        pen : "✏",
        bishop : "♝",
        flower : "❀",
        tools : "☭",
        snowman : "☃",
        right : "☛",
        darkknight : "♞",
        darkflower : "✿",
        peace : "☮",
        sun : "☼",
        left : "☚",
        knight : "♘",
        random2 : "✾",
        ying : "☯",
        moon : "☾",
        up : "☝",
        rook : "♖",
        snow : "✽",
        christ : "✝",
        comet : "☄",
        down : "☟",
        pawn : "♟",
        random3 : "✺",
        prince : "☥",
        cut : "✂",
        write : "✍",
        queen : "♕",
        darkstar2 : "✵",
        copy : "©",
        tm : "™",
        euro : "€",
        "<<" : "«",
        ">>" : "»",
        "yen" : "¥",
        "radioactive" : "☢"
        
    },
    status = document.getElementById('status'),
    completeMethod = GM_getValue('tk_autoCompletion') == 'false' ? 'tab' : 'auto',
    text, i, word, timer, autoComplete;
        
    // create a fast lookup regexp of all the terms used in a .test() later on
    var keyMatch = [];
    for (i in keys) {
        keyMatch.push(i.replace(/[\(\)\-]/g, function (m) {
            return '\\' + m;
        }));
    }
    
    keyMatch = new RegExp('(\\s*|^)' + keyMatch.join('|') + '(\\s+|$)');

    function useTabCompletion() {
        GM_setValue('tk_autoCompletion', 'false');
        document.location.reload();
    }
    
    function useAutoComplete() {
        GM_setValue('tk_autoCompletion', 'true');
        document.location.reload();        
    }
    
    GM_registerMenuCommand('Twitter keys: auto complete as I type', useAutoComplete);
    GM_registerMenuCommand('Twitter keys: tab completion', useTabCompletion);
    
    if (!status) return;
    
	if (completeMethod == 'tab') {
        status.addEventListener('keydown', function (event) {
            if (event.keyCode == 9) {
                // different function because we're only completing the last word in the tweet
                text = status.value;
                i = text.lastIndexOf(' ');
                word = text.substr(i + 1, text.length - i).toLowerCase();
                if (word.length) {
                    if (keys[word]) {
                        status.value = text.substr(0, i + 1) + keys[word];
                        event.preventDefault(); // prevent the tabbing away
                    }
                }
            } 
        }, true);	    
	} else {
	    autoComplete = function (event) {
	        clearTimeout(timer); // we do it twice, but it's because we might be called via the blur
	        
	        // do a fast .test to see if we need to run
	        if (keyMatch.test(status.value.toLowerCase())) {
                status.value = status.value.replace(/(\s*|^)([\S]*)(\s+|$)/g, function (m, c1, c2, c3) {
                    return (c2 && keys[c2.toLowerCase()]) ? keys[c2.toLowerCase()] + c3 : m;
                });
	        }
        };
        
	    status.addEventListener('keydown', function () {
	        clearTimeout(timer);
            timer = setTimeout(autoComplete, 100);
	    }, true);
	    
	    status.addEventListener('blur', autoComplete, true);
	    
	}
}

// @description    Shows in an obvious way if a certain twitter user is following you
function following() {
    // profile link means we're logged in
    if (document.getElementById('profile_link')) {
        var you = document.getElementById('profile_link').href.replace(/.*\//,''),
            friends = document.getElementById('friends'),
            header = document.getElementsByTagName('h2')[0],
            side = null,
            user = window.location.pathname.replace(/(^\/|\/$)/g, '');
            url = '';
        
        // better and faster to check the friends on the sidebar first,
        // but makes sure we're on their profile page
        if (user.split('/').length === 1 && friends.innerHTML.indexOf('/'+you)!==-1) {
            side = document.getElementById('friends');

            header.innerHTML += ' (follows you)';
        } else {
            // this will now check the most recent 100 friends - otherwise you're screwed - change by Remy Sharp
            url = 'http://twitter.com/statuses/friends/' + user + '.json';
            GM_xmlhttpRequest({ 
                method: 'GET', 
                url : url, 
                onload: function(responseDetails) { 
                    if (responseDetails.responseText.indexOf('"screen_name":"' + you + '"')!==-1) {
                        header.innerHTML += ' (follows you)';
                    }
                } 
            });
        }
      }
}

// main
try { following(); } catch (e) {}
try { twitterKeys(); } catch (e) {}
try { tweetStatusChange(); } catch (e) {}
try { tweetLocation(); } catch (e) {}
try { addSearch(); } catch (e) {}
try { hashTags(); } catch (e) {}