// ==UserScript==
// @name           Twitter User Classify
// @namespace      http://www.splitbrain.org/greasemonkey/geocaching
// @description    Calculates what type of twitter user someone is
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==


window.addEventListener('load',function() {
    //var friends   = document.getElementById('friend_count').innerHTML+1;
    //var followers = document.getElementById('follower_count').innerHTML+1;

    var stats = document.evaluate(
        "//span[@class='numeric stats_count' or @class='stats_count numeric']",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);

    if(stats.snapshotLength){
        // add one to avoid divbyzero
        var friends = parseInt(stats.snapshotItem(0).innerHTML.replace(/,/,''))+1;
        var followers = parseInt(stats.snapshotItem(1).innerHTML.replace(/,/,''))+1;
        var ratio = friends/followers;
        // remove one again
        friends--;
        followers--;

        // prepare color and description
        var type  = '';
        var color = '';
        if(ratio <= 0.2){
            type  = 'a twitter caster';
            color = '#7FFF00';
        }else if(ratio <= 0.5){
            type  = 'notable';
            color = '#9ACD32';
        }else if(ratio <= 1){
            type = 'socially healthy';
            color = '#FFD700';
        }else if(ratio <= 2){
            type = 'a newbie or social climber';
            color = '#FF8C00';
        }else{
            type = 'a twitter spammer';
            color = '#B22222';
        }

        // add message
        var msg = document.createElement('div');
        msg.style.backgroundColor = color;
        msg.innerHTML = 'This user is '+type+'. ('+friends+' friends, '+followers+' followers, ratio: '+(Math.round(ratio*100)/100)+')';
        document.body.insertBefore(msg, document.body.firstChild);
    }
},true);
