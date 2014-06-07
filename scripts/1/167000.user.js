// ==UserScript==
// @name       talkhaus mouseover small text
// @namespace  http://talkha.us/
// @version    0.2
// @description  Looking at you, kobabeach
// @match      http://talkhaus.raocow.com/viewtopic.php*
// @copyright  2013+, BTYM
// ==/UserScript==

var posts = document.getElementsByClassName("content");
for (i = 0; i < posts.length; i++)
{
    var post = posts[i];
    var spans = post.getElementsByTagName("span");
    for (n = 0; n < spans.length; n++)
    {
        var span = spans[n];
        span.origfontsize = "100%";
        if (!span.onclick)
        span.onclick = function(){
            var tmp = this.origfontsize;
            this.origfontsize = this.style.fontSize;
            this.style.fontSize = tmp;
        }
    }
}