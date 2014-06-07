// Version 1.0
// Released under the GPL
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           LOR threads builder
// @namespace      http://regolit.com
// @description    Constructs threads from plain messages list.
// @include        http://*.linux.org.ru/view-message.jsp?*page=-1
// ==/UserScript==

(function()
{
    var posts = [];
    var i, len;

    var a = document.getElementsByTagName("DIV");
    len = a.length;
    for (i=0; i<len; i++) {
        if (a[i].className == "msg") {
            posts.push(a[i]);
        }
    }
    
    var posts_map = [];

    // delete first element, it's a post itself
    posts.shift();

    len = posts.length;
    try {
        for (i=0; i<len; i++) {
            p = posts[i];
            p.innerHTML += "<blockquote id='bq-"+p.id+"'></blockquote>";
            if (-1 != p.innerHTML.search(/Ответ на: <a href="view-message.jsp\?msgid=[0-9]+&amp;lastmod=.+#(comment-[0-9]+)"/i)) 
            {
                par_id = RegExp.$1;
                par = posts_map[""+par_id];
                if (!par) {
                    alert(par_id, par);
                }
                par.appendChild(p);
            }
            posts_map[p.id] = document.getElementById("bq-"+p.id);
        }
    } catch (e) {
    }
})();
