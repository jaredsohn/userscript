// ==UserScript==
// @name       405th Formatting Fixes
// @namespace  http://userscripts.org/users/220845
// @version    0.2
// @description  Fixes "&#39;", quoting, formatting, and removes smilies from older posts
// @include      http://405th.com/*
// @include      http://www.405th.com/*
// ==/UserScript==

//Base code from http://userscripts.org/scripts/show/105689
function replaceByClass(className, obj) {
    if(obj.getElementsByClassName) {
        var nodes = obj.getElementsByClassName(className);
        for(i in nodes) {
            if(typeof(nodes[i].innerHTML)=="string") {
                changeEmoticon(nodes[i]); 
            }
        }
    }
}

function changeEmoticon(node) {
    // See More Fix
    node.innerHTML = node.innerHTML
        .replace(/&quot;\)/gi, '&quot; )');
    node.innerHTML = node.innerHTML
        //Replacements
        .replace(/&amp;#39;/gi, "'")
        .replace(/\[img\].*\[\/img\]/gi, "")
        .replace(/<img src="http:\/\/405th.com\/forums\/public\/style_emoticons\/&lt;#EMO_DIR#&gt;\/.*" border="0" alt="">/gi, "")
        .replace(/&lt;div class='quotetop'&gt;QUOTE\(/gi, "<div class='bbcode_container'><div class='bbcode_quote'><div class='quote_container'><div class='bbcode_quote_container'></div><div class='bbcode_postedby'><img src='images/brave/misc/quote_icon.png' alt='Quote' /> Originally Posted by <strong>")
        .replace(/ @ .*\) <a href=".*" target="_blank">&lt;{POST_SNAPBACK}&gt;<\/a>&lt;\/div&gt;&lt;div class='quotemain'&gt;/gi, "</strong></div><div class='message'>")
        .replace(/&lt;\/div&gt;<br>/gi, "</div></div></div></div>")
        .replace(/\[quote name='/gi, "<div class='bbcode_container'><div class='bbcode_quote'><div class='quote_container'><div class='bbcode_quote_container'></div><div class='bbcode_postedby'><img src='images/brave/misc/quote_icon.png' alt='Quote' /> Originally Posted by <strong>")
        .replace(/' date='.*']/gi, "")
        .replace(/&lt;span style="/gi, "<span style='")
        .replace(/"&gt;/gi, "'>")
        .replace(/&lt;\/span&gt;/gi, "</span>")
        .replace(/&lt;u&gt;/gi, "<u>")
        .replace(/&lt;\/u&gt;/gi, "</u>")
        .replace(/\[\/quote]<br>/gi, "</div></div></div></div>");
            }

function commonInsert(obj) {
    if(typeof(obj)=="object") {
        replaceByClass('content', obj); //Various
    }
}

function nodeInserted(event) {
    commonInsert(event.target);
}



commonInsert(document);

document.addEventListener('DOMNodeInserted', function(event) {
    
    commonInsert(event.target);
    
}, false);