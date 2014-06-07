// ==UserScript==
// @name           amazon
// @description    duh
// @include        http*://*.amazon.*
// ==/UserScript==


// this is probably not needed, borrowed from someone on stackoverflow:
function getElementsStartsWithId( id ) {
  var children = document.body.getElementsByTagName('*');
  var elements = [], child;
  for (var i = 0, length = children.length; i < length; i++) {
    child = children[i];
    if (child.id.substr(0, id.length) == id)
      elements.push(child);
  }
  return elements;
}

function amazontracklist(what) {

var imgs,i,idcdv;
var mlnk = "";

if (document.getElementById("title_row")) {

imgs=document.querySelectorAll('[id^=dmusic_tracklist_track_name_]');

} else if (document.getElementById("dm_mp3Player")) {

imgs=document.getElementById("dm_mp3Player").getElementsByClassName("songTitle");

} else if (document.getElementById("albumTrackList")) {

imgs=document.getElementById("albumTrackList").getElementsByClassName("titleCol");

} else {

  if (location.href.indexOf("ref=dp_tracks_all") != -1) {
    imgs=document.getElementsByClassName("content")[0].getElementsByTagName("td");
	} else {

		for (var i = 0; i <= 10; i++) {
			if ((document.getElementsByClassName("content")[i]) && (document.getElementsByClassName("content")[i].innerHTML.indexOf("listRowEven") != -1)) {
				idcdv = i;
			}
		}

imgs=eval("document.getElementsByClassName('content')["+idcdv+"].getElementsByTagName('td')");

}

}

for(i in imgs){
if (imgs[i].innerText!=undefined)  {
 if (imgs[i].className != "listen")  {
	if (imgs[i].innerText != "")  {
		var track = imgs[i].innerText;
         //var hasnumbers = track.match(/^([0-9]+)\. /);
        //if (hasnumbers) {
    if ((track.indexOf("Video:") == -1) && (track.indexOf("Digital Booklet") == -1)) {
		track = track.replace(/\s/g, " ").replace(/  +/,"").replace(" [Explicit]","");
				if (!(document.getElementById("title_row"))) {
        		track = track.replace(/([^.*\\.]+)/,"");
				}
			if ((track != "Song") && (track != "MP3") && (track != undefined) ) {
				track = track.replace(/^\. /,"");
				mlnk += track.replace(/  +/,"").replace(/ $/,"")+'\n';
			}
		}

	  //}
		}
 }
}

}

if (what == "pop") {
alert(mlnk);
} else {
var phpurl = "http://your-server.com/amazon/?tracklist="
location.href = phpurl + escape(mlnk);
}
};

function amazontrackstart() {

	if (( document.title.indexOf(': Official Music') != -1) ||( document.title.indexOf(': Musi') != -1) || ( document.title.indexOf(': MP3 Downloads') != -1) || ( document.title.indexOf(': MP3-Downloads') !=-1) || ( document.title.indexOf(': Movie') != -1) || ( document.title.indexOf(': Filme') != -1)) {

			if (document.getElementById("btAsinTitle")) {

      var headertext = document.getElementById("btAsinTitle").innerHTML;

			document.getElementById("btAsinTitle").innerHTML = '<span class="nonexistent" id="showtracklist" style="font-size: 16px; font-weight:bold; color: orange;background-color:black;">tracklist <button type="button" style="border:none;vertical-align:middle;font-size: 16px; font-weight:bold; color: orange;background-color:white" onclick="amazontracklist(\'pop\')">show</button> <button type="button"  class="nonexistent" id="savetracklist" style="vertical-align:middle;font-size: 16px; font-weight:bold; color: orange;background-color:white" onclick="amazontracklist()">save</button>&nbsp;</span><br />' + headertext;

			} else if (document.getElementById("title_row")) {

			var headertext = document.getElementById("title_row").innerHTML;

      document.getElementById("title_row").innerHTML = '<span class="nonexistent" id="showtracklist" style="font-size: 16px; font-weight:bold; color: orange;background-color:black;">tracklist <button type="button" style="border:none;vertical-align:middle;font-size: 16px; font-weight:bold; color: orange;background-color:white" onclick="amazontracklist(\'pop\')">show</button> <button type="button"  class="nonexistent" id="savetracklist" style="vertical-align:middle;font-size: 16px; font-weight:bold; color: orange;background-color:white" onclick="amazontracklist()">save</button>&nbsp;</span><br />' + headertext;

			}



	}

};

window.addEventListener('load', amazontrackstart, false);
