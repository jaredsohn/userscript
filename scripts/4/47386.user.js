//Forum Cop Tool Bar brought to you by Funkbrotha10
// ====================================================================================
// ==UserScript==
// @name Forum Cop Tool Bar
// @description A toolbar that assists forum cops in linking people to the correct thread
// @include http://www.bungie.net/*
// ==/UserScript==
//

var CopLegend = document.getElementById("ctl00_mainContent_postForm_skin_formattingLegendPanel");
if(CopLegend)
{
     CopLegend.innerHTML = '<h1>Forum Cop Tool Bar</h1>'+

     '<p><b>Halo 3 Forum = http://www.bungie.net/Forums/topics.aspx?forumID=105242</p><hr>'+

     '<p>Classifieds = http://www.bungie.net/Forums/topics.aspx?forumID=9</p><hr>'+

     '<p>Optimatch Forum = http://www.bungie.net/Forums/topics.aspx?forumID=5576</p><hr>'+

     '<p>Bungie General Forum = http://www.bungie.net/Forums/topics.aspx?forumID=1</p><hr>'+

     '<p>Bungie Community = http://www.bungie.net/Forums/topics.aspx?forumID=3';
}
//  ---Love Funkbrotha10