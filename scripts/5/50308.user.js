// ==UserScript==
// @name Alternative Footer links
// @description Some new links for the Bungie.net footer

// @include *http://www.bungie.net*
// ==/UserScript==




//The Gallery = http://www.bungie.net/forums/topics.aspx?forumID=4

//Septagon = http://www.bungie.net/forums/topics.aspx?forumID=3


//element ID of footer = ctl00_footer_footerMenu



var footer, newcontent;
footer = document.getElementById('ctl00_footer_footerMenu');
if (footer)
{
footer.innerHTML = '<font size="15"><!-- --!><a href="http://www.bungie.net/forums/topics.aspx?forumID=4 ">The Gallery</a> <a href=http://www.bungie.net/Forums/topics.aspx?forumID=105242 ">Halo 3 Forum</a> <a href="http://www.bungie.net/Forums/topics.aspx?forumID=3 ">Septagon</a> <a href="http://www.bungie.net/Forums/MyTopics.aspx ">Saved Threads</a> <a href="http://www.bungie.net/stats/halo3/default.aspx ">Halo 3 Service Record</a> <a href="http://www.bungie.net/news/blog.aspx?mode=news ">Bungie Blog</a> <a href="http://www.bungie.net/Account/Profile.aspx?uid=104 &page=PostMsg ">(Click to) Blame Stosh</a> <a href="http://www.halowars.com/forums/default.aspx ">Halo Wars Forum</a> <a href="http://www.halowars.com/stats/globalstats.aspx t;>Halo Wars Stats</a> ';
}