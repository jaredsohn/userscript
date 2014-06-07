// ==UserScript==
// @name           Apnicommunity
// @namespace      apnicommunity.com
// @description    Broswer Apnicommunity
// @include        http://www.apnicommunity.com/*
// @exclude        http://www.apnicommunity.com/india-forum/
// ==/UserScript==

var DEBUG=0;
function debug(str) {
    if(DEBUG) GM_log(str);
}

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
    var e = document.createElement(tag);
    if (on) on.appendChild(e);
    return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
    var e = document.createTextNode(text);
    if (on) on.appendChild(e);
    return e;
}

function insertAfter(newNode,target) {
    var parent   = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild) parent.insertBefore(newNode, refChild);
    else parent.appendChild(newNode);  
}

function newFunction(_a) {
    var a = _a;
    return function(details) {
        if (details.responseText) {	
            //<a href="uploads/images/e65fd95961cb4a3c.jpg" target="rbpic">
            //<a rel="nofollow" href="http://www.apnicommunity.com/media.html?http://www.desishare.org/zshare.php?code=561611360709b496/" target="_blank">Click Here to watch online - pt1</a>
            //debug("Response:"+ details.responseText);
            if (m = details.responseText.match(/<a rel=.*http:.*apnicommunity.*desishare.*<\/a>/gi)) {
                // Go thru the links
                // div will hold the new div below the links parent
                var div;
                var linksMap={};
                for (var j=0; j<m.length; j++) {
                    s = m[j];
                    if (!s) continue;
                    //debug("RegExp:"+s);
                     s = s.replace(/http:\/\/www.apnicommunity.com\/media.html\?/g,"");//remove cloaking
                    debug("RegExp:"+s);
                    if (!div) { //create div for first time to hold links.
                        var div = $n("div");
                        insertAfter(div,a);
                    }
                    if(!linksMap[s]){ //make sure to not repeat a link
                        div.innerHTML = div.innerHTML + "<br>"+s; //add link to div.
                        linksMap[s]="1";
                    }
                }
            }
        }
    };
}


function removeCrap() {
    //remove side bar - very dependent of the dom layout.
    var forumElem = document.getElementById("inlinemodform");
    var postsElem = document.getElementById("posts");
    var divs = document.getElementsByTagName("div");
    for ( var i=0; i<divs.length;i++ ){
        if(divs[i].className=="page"){
            divs[i].parentNode.removeChild(divs[i]);
        }
   }
   if(forumElem)document.body.insertBefore(forumElem, document.body.firstChild);
   if(postsElem)document.body.insertBefore(postsElem, document.body.firstChild);
}

function main() {
    removeCrap();
    var links = document.getElementsByTagName("a");
    for (var i=0; i<links.length; i++) {
        //make it uniqiue
        var link = links[i];
        if (link.href.match(/.*update\.html$/)&& link.firstChild.nodeValue && link.firstChild.nodeValue.match(/update/i)){
            //debug("Link:" + link.href + link.firstChild.nodeValue);
            GM_xmlhttpRequest({
                method:"GET",
                url: link.href,
                headers:{
                    "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1b2) Gecko/20081201 Firefox/3.1b2",
                    "Accept":"text/html,text/monkey,text/xml,text/plain",
                },
                onload: newFunction(link)
            });
        }
    }
}


main();
