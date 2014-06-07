// ==UserScript==
// @name           last.fm
// @namespace      last.fm
// @description    artist - title
// @include        http://www.last.fm/user/*
// ==/UserScript==


var recent_tracks_tbl = document.getElementById("recentTracks");
var tr = recent_tracks_tbl.getElementsByTagName("tr");

for(i=0; i<tr.length; i++) {

	var el = tr[i];

	var row = el.getElementsByClassName("subjectCell");

	var track_clone  = row[0].childNodes[1].cloneNode(true); //track

	if ( row[0].childNodes[4].innerHTML != undefined) 
		var artist_clone = row[0].childNodes[4].cloneNode(true); //artist (dziala dla 1)
	else
		var artist_clone = row[0].childNodes[3].cloneNode(true); //artist (dziala dla reszty)

	removeChildrenFromNode( row[0] );

	//artist_clone.innerHTML = artist_clone.innerHTML.substring(1);
	row[0].appendChild(artist_clone);

	var space = document.createElement("span");
	space.innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;";
	row[0].appendChild( space );

	row[0].appendChild(track_clone);

}



function getElementsByClassName(cn){
  var arr = new Array(); 
  var els = document.getElementsByTagName("*");
  var exp= new RegExp("^(.* )?"+cn+"( .*)?$", "g");
  for (var i = 0; i < els.length; i++ ){
    if (exp.test(els[i].className)){
      arr.push(els[i]);
    }
  }
  return arr;
}

function removeChildrenFromNode(node)
{
   if(node != undefined && node != null) {
     
   var len = node.childNodes.length;

	while (node.hasChildNodes()) {
	  node.removeChild(node.firstChild);
	}
}
}

