// ==UserScript==
// @name        YouTube Comment Quality Improver (with whitelist/blacklist)
// @description Improves the average quality of YouTube comments. Extended with whitelist/blacklist. 
// @include     http://www.youtube.com/watch?*
// ==/UserScript==

//Words that are used to improve quality of comments.
var words = ['herp', 'derp', 'hurr', 'hurr'];

//A list of usernames of uploaders.
var userlist = ['Add','usernames','like','this'];

//If true, does not run the script on videos uploaded by any user in the list.
//If false, only runs scripts on videos uploaded by any user in the list.
var is_whitelist = true; 

function main() {
    var uploader = getUploader();
    var is_listed = false;
    if (userlist) {
        for (var i = 0; i < (userlist.length); i++) {
            if (userlist[i] == uploader) {
                is_listed = true;
                GM_log("Uploader " + uploader + " is whitelisted");
                break;
            }
        }
    }
    
    if ((is_whitelist && !is_listed) || (!is_whitelist && is_listed)) {
        improveCommentQuality();
    }
}

function improveCommentQuality() {
    var wlen = words.length;
    var comments = document.getElementsByClassName("comment-text");
    var clen = comments.length;

    for (var i = 0; i < clen; i++)
    {
        var lines = comments[i].getElementsByTagName("p");
        var llen = lines.length;

        for (var j = 0; j < llen; j++)
        {
            var commentWords = lines[j].innerHTML.split(" ");
            var cwlen = commentWords.length;

            for (var k = 0; k < cwlen; k++)
                commentWords[k] = words[Math.floor(Math.random()*wlen)];

            lines[j].innerHTML = commentWords.join(" ");
        }
    }
}

function getUploader() {
    var elements = document.getElementsByClassName("yt-user-name author");
    if (elements.length > 0) {
        var uploaderName = elements[0].textContent.replace(/^\s+|\s+$/g,"");
        return uploaderName;
    }
    
    return "";
}

main();