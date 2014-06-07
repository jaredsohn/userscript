// ==UserScript==
// @name           HomerJ.de Forum Ignore User
// @description    Man kann Benutzer auf eine Blacklist setzen dessen Posts dann in Spoiler-Tags gebaut werden.
// @version        0.1
// @include        http://www.homerj.de/index.php?show=forum&forum=*&thread=*
// ==/UserScript==
var ignore = new Array();

// HIER KOMMEN DIE BENUTZERNAMEN REIN, GROSS- UND KLEINSCHREIBUNG BEACHTEN z.B. ignore = ['user1', 'user2'];
ignore = ['HomerJ'];

var users = document.evaluate('//td/span/a[@class="tdn"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var posts = document.evaluate('//div[@class="w735 c_b o_a ml5 pt5 pb5"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < users.snapshotLength; ++i) {
    var user = users.snapshotItem(i);
    for (var j = 0; j < ignore.length; ++j) {
        if (user.innerHTML == ignore[j]) {
            var post = posts.snapshotItem(i);
            post.innerHTML = spoilerContent(post.innerHTML);
        }
    }
}

function spoilerContent(post) {
    var random = randomString();
    var returnString = '<form class="m_0" action="#"><input type="button" onclick="';

    returnString += "if(document.getElementById('spoiler_"+random+"').style.display=='block') { document.getElementById('spoiler_"+random+"').style.display='none';} else { document.getElementById('spoiler_"+random+"').style.display='block'; } return false;";
    
    returnString += '"value="Blocklist"></form><div id="spoiler_' + random + '" class="db_1 p_5" style="display:none;">' + post + '</div>';
    
    return returnString;
}

function randomString() {
    var length = 20;
    var chars = '0123456789abcdefghiklmnopqrstuvwxyz'.split('');
    var str = '';
    for (var i = 0; i < length; ++i) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}