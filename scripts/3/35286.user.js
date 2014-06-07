// ==UserScript==
// @name           POSsay
// @namespace      something_awful
// @include        http://forums.somethingawful.com/showthread.php*
// ==/UserScript==

GM_addStyle(
    "table.funbox {"
        +"border-width:0 !important;"
        +"border-padding:0 !important;"
    +"}"
    +"table.funbox td {"
        +"border-width:0 !important;"
        +"border-padding:0 !important;"
    +"}"
    +"table.funbox .complete_shit {"
        +"background-color:white !important;"
    +"}");

var crumbs = document.getElementsByClassName("breadcrumbs")[0]
    .getElementsByTagName("a");

if(!crumbs[crumbs.length-1].href.match("forumid=219"))
    return;


// Time to POSify dis shit!!!
var posts = document.getElementsByClassName("postbody");
for(var i=0; i<posts.length; i++)
{
    // This is stupid and gay and I just copied it from FYAD
    // Have fun, Firefox parser!!!
    // It would probably make more sense to load this into a DOM element and clone it but I'm lazy and fuck you
    var bubble = '<table class="funbox" border="0" cellpadding="0" cellspacing="0">'
        +'<tbody><tr>'
            +'<td width="27"><img src="http://i.somethingawful.com/images/funbox-9-top-left.gif" width="27" height="17"></td>'
            +'<td width="*" background="http://i.somethingawful.com/images/funbox-9-top-middle.gif"><img src="http://i.somethingawful.com/images/funbox-blank.gif" width="2" height="17"></td>'
            +'<td width="29"><img src="http://i.somethingawful.com/images/funbox-9-top-right.gif" width="29" height="17"></td>'
        +'</tr>'
        +'<tr>'
            +'<td width="27" background="http://i.somethingawful.com/images/funbox-9-middle-left.gif"><img src="http://i.somethingawful.com/images/funbox-blank.gif" width="27" height="2"></td>'
            +'<td class="complete_shit">'
                +posts[i].innerHTML
            +'</td>'
            +'<td width="29" background="http://i.somethingawful.com/images/funbox-9-middle-right.gif"><img src="http://i.somethingawful.com/images/funbox-blank.gif" width="2" height="2"></td>'
        +'</tr>'
        +'<tr>'
            +'<td width="27"><img src="http://i.somethingawful.com/images/funbox-9-bottom-left.gif" width="27" height="31"></td>'
            +'<td background="http://i.somethingawful.com/images/funbox-9-bottom-middle.gif"><img src="http://i.somethingawful.com/images/funbox-blank.gif" width="0" height="30"><img src="http://i.somethingawful.com/images/funbox-9-bottom-arrow.gif" width="27" height="31"></td>'
            +'<td width="29"><img src="http://i.somethingawful.com/images/funbox-9-bottom-right.gif" width="29" height="31"></td>'
        +'</tr>'
        +'</tbody></table>'
        +'<img src="http://img.waffleimages.com/70677100b3768609dab98bb10b38bc4a2e65aaef/emot-goonsay.gif" />';

    posts[i].innerHTML = bubble;
}