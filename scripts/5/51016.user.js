// ==UserScript==
// @name           Google music
// @namespace      heroboy
// @include        http://www.google.cn/music/*
// ==/UserScript==
function addurl(id,row)
{
	var url="http://psp-music.appspot.com/gmusic/mp3?id="+id;
	row.cells[2].innerHTML += "<small><a href='"+url+"'>download</a></small>";
}
function main(){
var song_list = document.getElementById("song_list");
if (!song_list) return;
for(var i=0;i<song_list.rows.length;++i)
{
	var row = song_list.rows[i];
	var id = row.id;
	if (id.slice(0,3)=='row')
	{
		id = id.slice(3);
		addurl(id,row);
	}
}
}
main();