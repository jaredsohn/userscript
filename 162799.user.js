// ==UserScript==
// @name       TV Tropes Contributor Links
// @namespace  http://tvtropes.org/Tropers
// @version    0.2
// @description  Adds the contributor link to Troper/ pages even if the page doesn't exist
// @match      http://tvtropes.org/pmwiki/pmwiki.php/Tropers/*
// @copyright  2012+, 3Doubloons
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


$(document).ready(function() {
    var html;
    var name = /Tropers\/(.+)/.exec(document.location)[1];
    if ($(".contributorlead").length) {
        html = $(".contributorlead")
    } else {
    
        html = $('<div class="contributorlead"><form id="sendpm'+name+'" action="http://tvtropes.org/pmwiki/sendpm.php" method="post" style="display:inline;"><a class="forumbutton" href="javascript:object(\'sendpm'+name+'\').submit();"><img src="http://static.tvtropes.org/pmwiki/pub/smiles/email_go.png" height="16" width="16" title="send a private message to this troper" style="border:none;"><input type="hidden" name="to_troper" value="'+name+'">	</a>	</form><a href="http://tvtropes.org/pmwiki/el.php?findfor='+name+'" title="latest edits"> Contributor\'s Page </a></div>');
        $(".pagetitle").prepend(html);
    }
    
    var forumLink = $("<a href='http://tvtropes.org/pmwiki/forum_troper_posts.php?fortroper="+name+"'>Find forum contributions</a>")
    html.prepend(forumLink);
});