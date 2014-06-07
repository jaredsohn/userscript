// GDQuoter (GreaseMonkey v0.3.3)
// by kevmo

// ==UserScript==
// @name          gamedevQuoter
// @description	  Adds a "quote" link to GDNet Reply screens
// @author        Kevmo
// @include       http://www.gamedev.net/community/forums/post.asp?*method=reply*

// ==/UserScript==


(function() {


gdquoter = function(node1, node2) {
    var messagetext = node2.innerHTML.replace(/<br>/g, "");
    messagetext = messagetext.replace(/<!--QUOTE-->.*<!--STARTQUOTE-->/g,"[quote]");
    messagetext = messagetext.replace(/<!--QUOTE-->.*<!--ENDQUOTE-->/g,"[/quote]");
    messagetext = messagetext.replace(/<!--EDIT-->.*<!--\/EDIT-->.*<!--\/EDIT-->/g,"");
    messagetext = "\n\n[quote][i]Original post by "+node1+"[/i]\n"+messagetext+"\n[/quote]\n\n";
    void(document.forms[0].message.value=document.forms[0].message.value + messagetext);
}

    var i = 0;
    var tables = document.getElementsByTagName("table");
    for (i=9,l=tables.length; i<l; i++) {
        var tds = tables[i].getElementsByTagName("td");
	if (tds[0].className=="ForumCell" || tds[0].className=="AltForumCell") {
            var quote_link = document.createElement("span");
            var name = tds[0].innerHTML;
            var html_insert = "<br><a href=\'#\' onClick=\"gdquoter(\'"+name+"\',this.parentNode.parentNode.parentNode.childNodes[3]); return false;\">quote</a>";
            quote_link.innerHTML = html_insert;
            tds[0].appendChild(quote_link);
        }
    }

})();