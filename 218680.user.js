// ==UserScript==
// @name       osu! issue tracking v2
// @version    0.2
// @description  Issue tracking v2, use database of solutions!
// @match      *://osu.ppy.sh/forum/t/*
// @match      *://osu.ppy.sh/forum/p/*
// @copyright  2014+, Marcin
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var firstpost = "<table class='tablebgside' id='issuetracker' width='100%' cellspacing='10px' cellpadding='0' margin='10px'></table>";
var whatsubforum = 0;
var subforum = $("#fixable:first .breadcrumbs:first a:nth-child(3)");

if (subforum.attr("href") == "/forum/5")
    techsupport();
else if (subforum.attr("href") == "/forum/4")
    featurerequest();

function techsupport(){
    GM_log("forum:" + "tech support");
	GM_log("current forum:" + subforum.text());
    $("#pagecontent:first").prepend(firstpost);
    var content = "<tr><td>Tags:</td> </tr> <tr><td>Status:</td></tr>";
   	$("#issuetracker").html(content);
}
function featurerequest(){
    GM_log("forum: feature requests");
    $("#pagecontent .tablebgside:first").after(firstpost);
    var content = "<tr><td>Tags: HEHEHEHEH NO <div class='issue confirmed' style='float:none;'> your tag </div></td> </tr>"+
        "<tr> <td> <form action='http://mypage.com/action.php' method='get'><input type='text' name='user'><input type='submit' value='Add'> </form> </td> </tr>";
    $("#issuetracker").html(content);
}
function createTag(text){
    
}