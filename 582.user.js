// ==UserScript==
// @name          Netflix Queue Manager
// @namespace     http://netflix.badsegue.org/
// @description	  Netflix Queue Manager enhances queue functionality
// @include       http://*netflix.com/Queue*
// @exclude       http://*netflix.com/QueueAdd*
// ==/UserScript==
//
// Netflix Queue Manager Userscript from http://badsegue.org
// version 3.01 - copyright 2005
//
// This is a Userscript-specific (Greasemonkey, Turnabout, et. al) version of the Netflix Queue Manager.
// It embeds two script files that were hosted externally.  This helps improve performance, as there is no
// need to load the scripts at runtime.  The drawback is that any new features that are added will require 
// the user to update their installation.  As the scripts have stabilized, the frequency of updates had 
// decreased, which makes this embedded version viable.  
//  
// This is being called version 3.0, to hopefully reduce confusion.  It's really the 2nd version of the 
// userscript, which makes use of version 2.2 of the bookmarklet upon which the userscript is based. 
//
// Userscript revision history
// v3.01 - don't use the onload event, which doesn't seem to work in GM .51
// v3.0 - embedded version, removed external hosting (except for .css loading).  
//        ** based on version 2.2 of the bookmarklet codebase **
// v1.1 - auto start
//

/* --------------- Begin code from http://badsegue.org/samples/netflix-manager.js ------------------ */

/*
 Netflix manager from http://badsegue.org 
 version 2.2 -  copyright 2005
 
 Changes since last version:
  2.2 - Left-justified title
 	Shortened unreleased availability text
	Restructured movie detail row to accomodate easier CSS selections
  2.1 - Ratings (PG, TV-MA, ...) now displayed (contributed by herrin again!), and sortable 
	Bonus Materials properly placed in title sort (usually)
	Replaced TOP/END/X links with Netflix graphics
	Added position indicators
  2.0 - Look-and-feel changes (contributed by herrin of http://viewwerx.com)
	Fixed stars sort (broken by adding BOB icon)
  1.9 - Changed BOB trigger area
	Ignore some words at the start of titles when sorting
	Fixed undelete for IE

  1.8 - Add sort by title, genre, availability

  1.7 - Add BOB (mouseover movie info) support

  1.6 - Add Genre and Availability

  1.5 - Add bug mode to switch between Manager and regular mode
      - Added update option

  1.4 - hide original body form
      - added delete capability

 This script makes use of the ToolMan javascript library for the drag-n-drop capability.
 The ToolMan library is covered by its own copyright terms.
 For more on this library visit http://tool-man.org

*/


(function(){

var NQM  = {

nqmversion : "nqm-3.01",

makebug : function (){
	var d = document;
	var z = document.createElement("div");
	
	z.id = "managebox";
	z.className="bug";
	z.innerHTML = "<a id=\"buglink\">Switch to Badsegue's Netflix Queue Manager <img src='http://badsegue.org/favicon.ico' height='20' width='20' border='0'/></a>";
	d.body.appendChild(z);
	d.getElementById("buglink").addEventListener("click", NQM.switchmode, false);
},

switchmode : function (){
   var d = document;
   var z;
   if (z = d.getElementById("managebox")) {
      d.body.removeChild(z);
      NQM.makediv();
   } else if (z = d.getElementById("moviebox")) {
      z.parentNode.removeChild(z); 
      NQM.makebug();
   }
},

sRatingImgSrc : "",
sRatingImgAlt : "",
imgRoot : "http://cdn.nflximg.com/us/pages/",
img1 : "http://cdn.nflximg.com/us/labels/1px.gif",
makediv : function () {
	var d=document;

	// hide normal body
	var b = d.MainQueueForm;
	b.style.display = 'none';

	var z=document.createElement("div");
	b.parentNode.insertBefore(z,b);

	var styleObject = d.getElementsByTagName("HEAD")[0].appendChild(d.createElement("link"));
	styleObject.rel="Stylesheet";
	styleObject.type="text/css";
	styleObject.href="http://badsegue.org/samples/badsegue.css";
	styleObject.id="sst_css";

	z.id = "moviebox";
	z.style.width = "100%";
	z.style.zIndex = "1000";

	var t="<div class=\"nqmcontainer\" id=\"nqmcontainer\">";
	t+="<div class=\"nqmheader\">";
	t+="<span class=\"nqmtitle\">";
	t+="<a href=\"javascript:loadabout()\">Netflix Queue Manager</a>";
	t+="<a href=\"http://badsegue.org/samples/netflix-manager-gm-emb.user.js\">";
	t+="<img src=\"http://badsegue.org/images/" + NQM.nqmversion + ".png\" border=\"0\" title=\"";
	t+="An update is available! Click to get latest version, then Tools/Install User Script.\"";
	t+=" alt=\"Update!\"></a> from <a href='http://badsegue.org'>Badsegue.org</a>";
	t+="</span>";		
	t+="</div>";
	t+="<div class=\"nqmcontainerinner\">";

        var idinst = "-1";
	m="<div class=\"nqminstructions\">";
	m+="<strong>Instructions:</strong> Use the buttons and drag-and-drop to change the ordering of your queue.  Perform your queue edits, then:";
	m+="<ul style='margin:0'>";
	m+="<li>&nbsp;&nbsp;<strong>Close</strong> to switch to the regular Netflix page and review the changes <strong>OR</strong></li>";
	m+="<li>&nbsp;&nbsp;<strong>Save Your Changes</strong> to commit the changes without review</li>";
	m+="</ul>";
	m+="</div>";
	
	m+="<div class=\"nqmmenucontainer\">";
	m+="<ul class=\"menubar\">";
	m+="<li class=\"menubar\"><input type=\"button\" value=\"Save Your Changes\" class=\"nqmcore-button commitbutton\" style=\"color: #339900; float: right\"></li>";
	m+="<li class=\"menubar\"><input type=\"button\" value=\"Sort by\" class=\"nqmcore-button sortbutton\"><select class=\"sortsel\"><option id=\"1\">Stars</option><option id=\"2\">Title</option><option id=\"3\">Genre</option><option id=\"4\">Available</option><option id=\"5\">Rating</option></select></li>";
	m+="<li class=\"menubar\"><input type=\"button\" value=\"Shuffle\" class=\"nqmcore-button shufflebutton\"></li>";
	m+="<li class=\"menubar\"><input type=\"button\" value=\"Reverse\" class=\"nqmcore-button reversebutton\"></li>";
	m+="<li class=\"menubar\"><input type=\"button\" value=\"Close\" class=\"nqmcore-button closebutton\" ></li>";
	m+="</ul>";
	m+="</div>";
	
	t+=m;
	t+='<ul id="movielist" class="boxy">';
	
	var items=document.forms[1].getElementsByTagName("input");
	var total=(items.length-2)/3;
 	var n, title, id, imgs, star, rating, genre, avail, ss, nid, sRatingImg;
	
	for(var i=0;i<total;i++){
		a=i*3+1;
		// find element that has title (should work for main and secondary queues)	
		p = items[a].parentNode.parentNode;
		n = p.getElementsByTagName("a")[0];
		nid = n.id + '0';
		title = n.innerHTML;
		rating = p.getElementsByTagName("td")[3].innerHTML;	
		genre = p.getElementsByTagName("td")[4].innerHTML;	
		avail = p.getElementsByTagName("td")[5].firstChild.innerHTML.replace(/Releases on DVD /, "");
		imgs = p.getElementsByTagName('img');
		
		NQM.getrating(rating);	
		sRatingImg = "<img src=\"" + sRatingImgSrc + "\" alt=\"" + rating + "\" title=\"" + sRatingImgAlt + "\" class=\"xrating\">";
		// default to series
		star = NQM.imgRoot + "widget/series.gif";
        	for (var indx = 1; indx < imgs.length; indx++) {
            		if (imgs[indx].className == "star") {star = imgs[indx].src};
        	}
		id = 'movie_' + i;
		// genre and availability block
		ss = '<span class="xtraw">' + sRatingImg + '<img src="' + NQM.img1 + '" />' + 
		     '<span class="xdetail">' + genre + '</span><span class="xdetail xavail">' + avail + '</span></span>';
                // images and buttons block
                bb = '<a class="bob" id="' + nid + 
                     '" onmouseover="dB(event,this)"><img src="' + NQM.imgRoot + 'bob/bob-icon.gif"></a>' + 
                     ss + '<span class="cntrl"><img src="'+star+'" class="nqmstar"/>' +	
		     '<a class="movetopq"><img src="' + NQM.imgRoot + 'browse/t100_up.gif" alt="Move this movie to the top of your queue" title="Move this movie to the top of your queue" class="nqmcontrols"></a>' + 
		     '<a class="movebottomq"><img src="' + NQM.imgRoot + 'browse/t100_down.gif"  alt="Move this movie to the bottom of your queue" title="Move this movie to the bottom of your queue" class="nqmcontrols"></a>' + 
		     '<a class="removeq"><img src="' + NQM.imgRoot + 'queue/remove.gif"  alt="Remove this movie from your queue" title="Remove this movie from your queue" class="nqmcontrols"></a></span>';
                // movie row 
		t+= '<li id="' + id + '"><img class="lispacer" src="' + NQM.img1 + '" />' + 
		       '<span class="movierow">' +
		       '<span class="pos-title">' +
                       '<span class="pos">' + (i+1) + '</span>' +
		       '<span class="title"><img src="' + NQM.img1 + '" />' + title + '</span></span>' +
		       '<span class="bob-buttons">' +  bb + '</span></span>' + '</li>';
	}
	t+="</ul>";	
	m.replace("-1", "-2");
	t+=m+'</div></div>';
	z.innerHTML = t;
	
	dragsort.makeListSortable(document.getElementById("movielist"), NQM.verticalOnly, NQM.dragend);

	NQM.registerAll(NQM.getElementsByClass(document.getElementById("nqmcontainer"), "input", "closebutton"), NQM.closebox, "click");
	NQM.registerAll(NQM.getElementsByClass(document.getElementById("nqmcontainer"), "input", "commitbutton"), NQM.commitqueue, "click");
	NQM.registerAll(NQM.getElementsByClass(document.getElementById("nqmcontainer"), "input", "shufflebutton"), NQM.shuffle, "click");
	NQM.registerAll(NQM.getElementsByClass(document.getElementById("nqmcontainer"), "input", "reversebutton"), NQM.reverse, "click");
	NQM.registerAll(NQM.getElementsByClass(document.getElementById("nqmcontainer"), "input", "sortbutton"), NQM.dosort, "click");
	NQM.registerAll(NQM.getElementsByClass(document.getElementById("nqmcontainer"), "select", "sortsel"), NQM.dosort, "change");

	NQM.registerAll(NQM.getElementsByClass(document.getElementById("movielist"), "a", "movetopq"), NQM.movetopq, "click");
	NQM.registerAll(NQM.getElementsByClass(document.getElementById("movielist"), "a", "movebottomq"), NQM.movebottomq, "click");
	NQM.registerAll(NQM.getElementsByClass(document.getElementById("movielist"), "a", "removeq"), NQM.removeq, "click");

},

registerAll : function (l, f, e) {
    for (var i = 0; i < l.length; i++) {
        l[i].addEventListener(e, f, false); 
    }
},
getElementsByClass : function (e,t,c) {
    var l = e.getElementsByTagName(t);  	
    var arr = new Array();
    for (var i = 0; i < l.length; i++) {
       if (l[i].className.match(c)) { arr[arr.length] = l[i]; }
    } 
    return arr;
},
updatequeue : function () {
    var qitems=document.forms[1].getElementsByTagName("input");
    var items = document.getElementById("movielist").getElementsByTagName("li");    
    for (var i = 0, n = items.length; i < n; i++) {
		var src = items[i].id.replace("movie_","");
		qitems[src*3+1].value = i+1;
		qitems[src*3+3].checked = (items[i].style.backgroundColor == "pink");
    }
},

shuffle : function () {
	var list =document.getElementById("movielist");
	var items=list.getElementsByTagName("li");
	
	for(var i=0, n = items.length;i<n;i++){
		var item=items[Math.floor(Math.random()*n)];
		list.removeChild(item);
		list.insertBefore(item,items[0]);		
	}
	NQM.renumber();
},

reverse : function () {
	var list =document.getElementById("movielist");
	var items=list.getElementsByTagName("li");
	
	for(var i=items.length-1; i >= 0 ;i--){
		var item=items[i];
		list.removeChild(item);
		list.insertBefore(item, null);				
	}
	NQM.renumber();
},

dosort : function () {
	var s;
	if (this.className.match("sortsel")) { 
	    s = this; 
	} else {
	    s = this.nextSibling;
	}
	var list = document.getElementById("movielist");
	var items=list.getElementsByTagName("li");
	// sort only works on true arrays, so copy the list collection to an array
	var copy = new Array();
	for(var i=items.length-1; i >= 0 ;i--){
		var item=items[i];
		copy.push(item);
		list.removeChild(item);
	}
	copy.sort(NQM.cmparr(s.selectedIndex));	
	// restore the collection
	for(var i=copy.length-1; i >= 0 ;i--){
		var item=copy[i];		
		list.insertBefore(item, null);				
	}
	NQM.renumber();
},

cmparr : function (a) {
   var f = new Array( NQM.cmpstars , NQM.cmptitle , NQM.cmpgenre , NQM.cmpavail , NQM.cmprate);
   return f[a];
},

cmpstars : function (a,b) {
   return (a.getElementsByTagName('img')[5].src >= b.getElementsByTagName('img')[5].src) ? 1 : -1;
},

cmptitle : function (a,b) {  
   var aa, bb;
   aa = a.getElementsByTagName("span")[3].childNodes[1].nodeValue;
   bb = b.getElementsByTagName("span")[3].childNodes[1].nodeValue;

   // handle discs prepended with Bonus Material: by moving it to the end
   var bon = /^(Bonus Material: ) *(.*)/;
   aa = aa.replace(bon, "$2 $1"); 
   bb = bb.replace(bon, "$2 $1"); 

   // handle discs (long titles) that may have been abbreviated
   var sped = /Sp\. Ed\./;
   aa = aa.replace(sped, "Special Edition");
   bb = bb.replace(sped, "Special Edition");

   // ignore leading The, A, An
   var ign = /^(the|a|an) /i;
   aa = aa.replace(ign,"");
   bb = bb.replace(ign,"");

   return (aa < bb) ? 1 : -1;
},

cmpgenre : function (a,b) {   
   return (a.getElementsByTagName('span')[6].childNodes[0].nodeValue < b.getElementsByTagName('span')[6].childNodes[0].nodeValue) ? 1 : -1;
},

collseq : function (a) {
   switch (a.charAt(0)) {
     case "<" : return 0; break; // Now
     case "S" : return 1; break; // Short Wait
     case "L" : return 2; break; // Long Wait
     case "V" : return 3; break; // Very Long Wait
     default  : return 4; break; // Unreleased
   }
},

cmpavail : function (a,b) {   
  var aa = a.getElementsByTagName('span')[7].innerHTML;
  var bb = b.getElementsByTagName('span')[7].innerHTML;
   
  aa = NQM.collseq(aa) + aa; bb = NQM.collseq(bb) + bb;
       
  return (aa < bb) ? 1 : -1;
},

collseqrate : function (a) {
   switch (a) {
     case "NC-17" : return "00"; break;
     case "R" : return "01"; break;
     case "TV-MA" : return "02"; break;
     case "TV-14" : return "03"; break;
     case "PG-13" : return "04"; break;
     case "PG" : return "05"; break;
     case "TV-PG" : return "06"; break;
     case "TV-Y7-FV" : return "07"; break;
     case "TV-Y7" : return "08"; break;
     case "TV-Y" : return "09"; break;
     case "G" : return "10"; break;
     case "TV-G" : return "11"; break;
     case "UR" : return "12"; break;
     case "NR" : return "13"; break;
     default : return "14"; break;
   }
},

cmprate : function (a,b) {
  var aa = a.getElementsByTagName('img')[3].alt;
  var bb = b.getElementsByTagName('img')[3].alt;
   
  aa = NQM.collseqrate(aa) + aa; bb = NQM.collseqrate(bb) + bb;
       
  return (aa < bb) ? 1 : -1;
},

getrating : function (rating) {
	// Grab the proper image for the rating.
	// Available ratings. PG, PG-13, NR, R, NC-17, G, TV-14, UR, TVY, TVY7, TVY7FV, TV G, TV PG, TV MA
	// Ratings descriptions: http://www.netflix.com/Help?id=1632
	switch (rating)
	{
		case "PG":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_PG.gif";
			sRatingImgAlt = "PARENTAL GUIDANCE SUGGESTED: Some material may not be suitable for children.";
		break;	
			
		case "PG-13":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_PG-13.gif";
			sRatingImgAlt = "PARENTS STRONGLY CAUTIONED: Some material may be inappropriate for children under 13.";
		break;
		
		case "NR":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_NR.gif";
			sRatingImgAlt = "NOT RATED: This film has not been rated by the MPAA (example: programs originally aired on television)";
		break;
		
		case "R":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_R.gif";
			sRatingImgAlt = "RESTRICTED: Under 17 requires accompanying parent or adult guardian.";
		break;
			
		case "NC-17":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_NC-17.gif";
			sRatingImgAlt = "RESTRICTED: Under 17 requires accompanying parent or adult guardian.";
		break;
			
		case "G":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_G.gif";
			sRatingImgAlt = "GENERAL AUDIENCES: All ages admitted.";
		break;
			
		case "TV-14":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_TV-14.gif";
			sRatingImgAlt = "PARENTS STRONGLY CAUTIONED: This program contains some material that many parents would find unsuitable for children under 14 years of age.";
		break;

		case "UR":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_UR.gif";
			sRatingImgAlt = "UNRATED: This film has not been rated by the MPAA (example: classic films, films whose DVD content differs from the original theatrical release)";
		break;
			
		case "TV-Y":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_TV-Y.gif";
			sRatingImgAlt = "ALL CHILDREN: This program is designed to be appropriate for all children.";
		break;
			
		case "TV-Y7":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_TV-Y7.gif";
			sRatingImgAlt = "DIRECTED TO OLDER CHILDREN: This program is designed for children age 7 and above.";
		break;
			
		case "TV-G":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_TV-G.gif";
			sRatingImgAlt = "GENERAL AUDIENCE: Most parents would find this program suitable for all ages.";
		break;
			
		case "TV-PG":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_TV-PG.gif";
			sRatingImgAlt = "PARENTAL GUIDANCE SUGGESTED: This program contains material that parents may find unsuitable for younger children.";
		break;
			
		case "TV-MA":
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_TV-MA.gif";
			sRatingImgAlt = "MATURE AUDIENCES ONLY: This program is specifically designed to be viewed by adults and therefore may be unsuitable for children under 17.";
		break;
			
		case "TV-Y7-FV":
			// Could not find the image for this one, feel free to let me know if you do!
			sRatingImgSrc = NQM.imgRoot + "parental_ratings/rating_TV-Y7.gif";
			sRatingImgAlt = "DIRECTED TO OLDER CHILDREN - FANTASY VIOLENCE: For those programs where fantasy violence may be more intense or more combative than other programs in this category, such programs will be designated TV-Y7-FV.";
		break;
			
		default:
			sRatingImgSrc = NQM.imgRoot + "community/friends-glyph-tiny.gif";
			sRatingImgAlt = "The manager was unable to figure out this rating.";
		break;
					
	}
},

movebottomq : function () {
	var item = this.parentNode.parentNode.parentNode.parentNode;
	var list = item.parentNode;
	list.removeChild(item);
	list.insertBefore(item,null);
	NQM.renumber();
},

movetopq : function () {
	var item = this.parentNode.parentNode.parentNode.parentNode;
	var list = item.parentNode;
	list.removeChild(item);
	var first = list.getElementsByTagName("li")[0];
	list.insertBefore(item,first);
	NQM.renumber();
},

removeq : function () {
    var item = this.parentNode.parentNode.parentNode.parentNode;
    var s = this.style;
    if (s.backgroundColor != "white") {
		this.style.backgroundColor = "white"; 
		this.style.color= "white";
		item.style.backgroundColor = "pink";
	} else {
		this.style.backgroundColor = "transparent";
		this.style.color = "black";
		item.style.backgroundColor = "transparent";
	}
},

verticalOnly : function(item) {item.toolManDragGroup.verticalOnly();},

renumber : function () {
	var nums = document.getElementById("movielist").getElementsByTagName("span");
	var pos = 1;
	for (var i = 0; i < nums.length; i++) {
		if (nums[i].className == "pos") { nums[i].childNodes[0].nodeValue = pos++; }	
	}		
},

_dragend : function (evt){ 
	NQM.renumber();
},

dragend : function (item) { item.toolManDragGroup.register ('dragend', NQM._dragend); },

closebox : function () { 
	NQM.updatequeue(); 
	document.MainQueueForm.style.display = 'inline';
	NQM.switchmode();
},

commitqueue : function () {
	NQM.closebox();
	if (confirm("Are you sure you want to commit these changes?")) {
		document.MainQueueForm.updateQueueBtn[0].click();
	}
},

loadabout : function () { alert("Netflix Queue Manager\nPresented by http://badsegue.org"); }

} 
/* end NQM class */
/* --------------- End code from http://badsegue.org/samples/netflix-manager.js ------------------ */

/* --------------- Begin code from http://badsegue.org/samples/toolman.js ------------------ */
/*
Copyright (c) 2005 Tim Taylor Consulting <http://tool-man.org/>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/

/*
   This is a consolidated version of the toolman library, assembled
   to simplify its inclusion in other scripts.  The contents are unmodified.
*/

var ToolMan = {
	events : function() {
		if (!ToolMan._eventsFactory) throw "ToolMan Events module isn't loaded";
		return ToolMan._eventsFactory
	},

	css : function() {
		if (!ToolMan._cssFactory) throw "ToolMan CSS module isn't loaded";
		return ToolMan._cssFactory
	},

	coordinates : function() {
		if (!ToolMan._coordinatesFactory) throw "ToolMan Coordinates module isn't loaded";
		return ToolMan._coordinatesFactory
	},

	drag : function() {
		if (!ToolMan._dragFactory) throw "ToolMan Drag module isn't loaded";
		return ToolMan._dragFactory
	},

	dragsort : function() {
		if (!ToolMan._dragsortFactory) throw "ToolMan DragSort module isn't loaded";
		return ToolMan._dragsortFactory
	},

	helpers : function() {
		return ToolMan._helpers
	},

	cookies : function() {
		if (!ToolMan._cookieOven) throw "ToolMan Cookie module isn't loaded";
		return ToolMan._cookieOven
	},

	junkdrawer : function() {
		return ToolMan._junkdrawer
	}

}

ToolMan._helpers = {
	map : function(array, func) {
		for (var i = 0, n = array.length; i < n; i++) func(array[i])
	},

	nextItem : function(item, nodeName) {
		if (item == null) return
		var next = item.nextSibling
		while (next != null) {
			if (next.nodeName == nodeName) return next
			next = next.nextSibling
		}
		return null
	},

	previousItem : function(item, nodeName) {
		var previous = item.previousSibling
		while (previous != null) {
			if (previous.nodeName == nodeName) return previous
			previous = previous.previousSibling
		}
		return null
	},

	moveBefore : function(item1, item2) {
		var parent = item1.parentNode
		parent.removeChild(item1)
		parent.insertBefore(item1, item2)
	},

	moveAfter : function(item1, item2) {
		var parent = item1.parentNode
		parent.removeChild(item1)
		parent.insertBefore(item1, item2 ? item2.nextSibling : null)
	}
}

/** 
 * scripts without a proper home
 *
 * stuff here is subject to change unapologetically and without warning
 */
ToolMan._junkdrawer = {
	serializeList : function(list) {
		var items = list.getElementsByTagName("li")
		var array = new Array()
		for (var i = 0, n = items.length; i < n; i++) {
			var item = items[i]

			array.push(ToolMan.junkdrawer()._identifier(item))
		}
		return array.join('|')
	},

	inspectListOrder : function(id) {
		alert(ToolMan.junkdrawer().serializeList(document.getElementById(id)))
	},

	restoreListOrder : function(listID) {
		var list = document.getElementById(listID)
		if (list == null) return

		var cookie = ToolMan.cookies().get("list-" + listID)
		if (!cookie) return;

		var IDs = cookie.split('|')
		var items = ToolMan.junkdrawer()._itemsByID(list)

		for (var i = 0, n = IDs.length; i < n; i++) {
			var itemID = IDs[i]
			if (itemID in items) {
				var item = items[itemID]
				list.removeChild(item)
				list.insertBefore(item, null)
			}
		}
	},

	_identifier : function(item) {
		var trim = ToolMan.junkdrawer().trim
		var identifier

		identifier = trim(item.getAttribute("id"))
		if (identifier != null && identifier.length > 0) return identifier;
		
		identifier = trim(item.getAttribute("itemID"))
		if (identifier != null && identifier.length > 0) return identifier;
		
		// FIXME: strip out special chars or make this an MD5 hash or something
		return trim(item.innerHTML)
	},

	_itemsByID : function(list) {
		var array = new Array()
		var items = list.getElementsByTagName('li')
		for (var i = 0, n = items.length; i < n; i++) {
			var item = items[i]
			array[ToolMan.junkdrawer()._identifier(item)] = item
		}
		return array
	},

	trim : function(text) {
		if (text == null) return null
		return text.replace(/^(\s+)?(.*\S)(\s+)?$/, '$2')
	}
}

ToolMan._eventsFactory = {
	fix : function(event) {
		if (!event) event = window.event

		if (event.target) {
			if (event.target.nodeType == 3) event.target = event.target.parentNode
		} else if (event.srcElement) {
			event.target = event.srcElement
		}

		return event
	},

	register : function(element, type, func) {
		if (element.addEventListener) {
			element.addEventListener(type, func, false)
		} else if (element.attachEvent) {
			if (!element._listeners) element._listeners = new Array()
			if (!element._listeners[type]) element._listeners[type] = new Array()
			var workaroundFunc = function() {
				func.apply(element, new Array())
			}
			element._listeners[type][func] = workaroundFunc
			element.attachEvent('on' + type, workaroundFunc)
		}
	},

	unregister : function(element, type, func) {
		if (element.removeEventListener) {
			element.removeEventListener(type, func, false)
		} else if (element.detachEvent) {
			if (element._listeners 
					&& element._listeners[type] 
					&& element._listeners[type][func]) {

				element.detachEvent('on' + type, 
						element._listeners[type][func])
			}
		}
	}
}
ToolMan._cssFactory = {
	readStyle : function(element, property) {
		if (element.style[property]) {
			return element.style[property]
		} else if (element.currentStyle) {
			return element.currentStyle[property]
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			var style = document.defaultView.getComputedStyle(element, null)
			return style.getPropertyValue(property)
		} else {
			return null
		}
	}
}

ToolMan._coordinatesFactory = {

	create : function(x, y) {
		// FIXME: Safari won't parse 'throw' and aborts trying to do anything with this file
		//if (isNaN(x) || isNaN(y)) throw "invalid x,y: " + x + "," + y
		return new _ToolManCoordinate(this, x, y)
	},

	origin : function() {
		return this.create(0, 0)
	},

	/*
	 * FIXME: Safari 1.2, returns (0,0) on absolutely positioned elements
	 */
	topLeftPosition : function(element) {
		var left = parseInt(ToolMan.css().readStyle(element, "left"))
		var left = isNaN(left) ? 0 : left
		var top = parseInt(ToolMan.css().readStyle(element, "top"))
		var top = isNaN(top) ? 0 : top

		return this.create(left, top)
	},

	bottomRightPosition : function(element) {
		return this.topLeftPosition(element).plus(this._size(element))
	},

	topLeftOffset : function(element) {
		var offset = this._offset(element) 

		var parent = element.offsetParent
		while (parent) {
			offset = offset.plus(this._offset(parent))
			parent = parent.offsetParent
		}
		return offset
	},

	bottomRightOffset : function(element) {
		return this.topLeftOffset(element).plus(
				this.create(element.offsetWidth, element.offsetHeight))
	},

	scrollOffset : function() {
		if (window.pageXOffset) {
			return this.create(window.pageXOffset, window.pageYOffset)
		} else if (document.documentElement) {
			return this.create(
					document.body.scrollLeft + document.documentElement.scrollLeft, 
					document.body.scrollTop + document.documentElement.scrollTop)
		} else if (document.body.scrollLeft >= 0) {
			return this.create(document.body.scrollLeft, document.body.scrollTop)
		} else {
			return this.create(0, 0)
		}
	},

	clientSize : function() {
		if (window.innerHeight >= 0) {
			return this.create(window.innerWidth, window.innerHeight)
		} else if (document.documentElement) {
			return this.create(document.documentElement.clientWidth,
					document.documentElement.clientHeight)
		} else if (document.body.clientHeight >= 0) {
			return this.create(document.body.clientWidth,
					document.body.clientHeight)
		} else {
			return this.create(0, 0)
		}
	},

	/**
	 * mouse coordinate relative to the window (technically the
	 * browser client area) i.e. the part showing your page
	 *
	 * NOTE: in Safari the coordinate is relative to the document
	 */
	mousePosition : function(event) {
		event = ToolMan.events().fix(event)
		return this.create(event.clientX, event.clientY)
	},

	/**
	 * mouse coordinate relative to the document
	 */
	mouseOffset : function(event) {
		event = ToolMan.events().fix(event)
		if (event.pageX >= 0 || event.pageX < 0) {
			return this.create(event.pageX, event.pageY)
		} else if (event.clientX >= 0 || event.clientX < 0) {
			return this.mousePosition(event).plus(this.scrollOffset())
		}
	},

	_size : function(element) {
	/* TODO: move to a Dimension class */
		return this.create(element.offsetWidth, element.offsetHeight)
	},

	_offset : function(element) {
		return this.create(element.offsetLeft, element.offsetTop)
	}
}

function _ToolManCoordinate(factory, x, y) {
	this.factory = factory
	this.x = isNaN(x) ? 0 : x
	this.y = isNaN(y) ? 0 : y
}

_ToolManCoordinate.prototype = {
	toString : function() {
		return "(" + this.x + "," + this.y + ")"
	},

	plus : function(that) {
		return this.factory.create(this.x + that.x, this.y + that.y)
	},

	minus : function(that) {
		return this.factory.create(this.x - that.x, this.y - that.y)
	},

	min : function(that) {
		return this.factory.create(
				Math.min(this.x , that.x), Math.min(this.y , that.y))
	},

	max : function(that) {
		return this.factory.create(
				Math.max(this.x , that.x), Math.max(this.y , that.y))
	},

	constrainTo : function (one, two) {
		var min = one.min(two)
		var max = one.max(two)

		return this.max(min).min(max)
	},

	distance : function (that) {
		return Math.sqrt(Math.pow(this.x - that.x, 2) + Math.pow(this.y - that.y, 2))
	},

	reposition : function(element) {
		element.style["top"] = this.y + "px"
		element.style["left"] = this.x + "px"
	}
}

/* Copyright (c) 2005 Tim Taylor Consulting (see LICENSE.txt) */

ToolMan._dragFactory = {
	createSimpleGroup : function(element, handle) {
		handle = handle ? handle : element
		var group = this.createGroup(element)
		group.setHandle(handle)
		group.transparentDrag()
		group.onTopWhileDragging()
		return group
	},

	createGroup : function(element) {
		var group = new _ToolManDragGroup(this, element)

		var position = ToolMan.css().readStyle(element, 'position')
		if (position == 'static') {
			element.style["position"] = 'relative'
		} else if (position == 'absolute') {
			/* for Safari 1.2 */
			ToolMan.coordinates().topLeftOffset(element).reposition(element)
		}

		// TODO: only if ToolMan.isDebugging()
		group.register('draginit', this._showDragEventStatus)
		group.register('dragmove', this._showDragEventStatus)
		group.register('dragend', this._showDragEventStatus)

		return group
	},

	_showDragEventStatus : function(dragEvent) {
		window.status = dragEvent.toString()
	},

	constraints : function() {
		return this._constraintFactory
	},

	_createEvent : function(type, event, group) {
		return new _ToolManDragEvent(type, event, group)
	}
}

function _ToolManDragGroup(factory, element) {
	this.factory = factory
	this.element = element
	this._handle = null
	this._thresholdDistance = 0
	this._transforms = new Array()
	// TODO: refactor into a helper object, move into events.js
	this._listeners = new Array()
	this._listeners['draginit'] = new Array()
	this._listeners['dragstart'] = new Array()
	this._listeners['dragmove'] = new Array()
	this._listeners['dragend'] = new Array()
}

_ToolManDragGroup.prototype = {
	/*
	 * TODO:
	 *   - unregister(type, func)
	 *   - move custom event listener stuff into Event library
	 *   - keyboard nudging of "selected" group
	 */

	setHandle : function(handle) {
		var events = ToolMan.events()

		handle.toolManDragGroup = this
		events.register(handle, 'mousedown', this._dragInit)
		handle.onmousedown = function() { return false }

		if (this.element != handle)
			events.unregister(this.element, 'mousedown', this._dragInit)
	},

	register : function(type, func) {
		this._listeners[type].push(func)
	},

	addTransform : function(transformFunc) {
		this._transforms.push(transformFunc)
	},

	verticalOnly : function() {
		this.addTransform(this.factory.constraints().vertical())
	},

	horizontalOnly : function() {
		this.addTransform(this.factory.constraints().horizontal())
	},

	setThreshold : function(thresholdDistance) {
		this._thresholdDistance = thresholdDistance
	},

	transparentDrag : function(opacity) {
		var opacity = typeof(opacity) != "undefined" ? opacity : 0.75;
		var originalOpacity = ToolMan.css().readStyle(this.element, "opacity")

		this.register('dragstart', function(dragEvent) {
			var element = dragEvent.group.element
			element.style.opacity = opacity
			element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')'
		})
		this.register('dragend', function(dragEvent) {
			var element = dragEvent.group.element
			element.style.opacity = originalOpacity
			element.style.filter = 'alpha(opacity=100)'
		})
	},

	onTopWhileDragging : function(zIndex) {
		var zIndex = typeof(zIndex) != "undefined" ? zIndex : 100000;
		var originalZIndex = ToolMan.css().readStyle(this.element, "z-index")

		this.register('dragstart', function(dragEvent) {
			dragEvent.group.element.style.zIndex = zIndex
		})
		this.register('dragend', function(dragEvent) {
			dragEvent.group.element.style.zIndex = originalZIndex
		})
	},

	_dragInit : function(event) {
		event = ToolMan.events().fix(event)
		var group = document.toolManDragGroup = this.toolManDragGroup
		var dragEvent = group.factory._createEvent('draginit', event, group)

		group._isThresholdExceeded = false
		group._initialMouseOffset = dragEvent.mouseOffset
		group._grabOffset = dragEvent.mouseOffset.minus(dragEvent.topLeftOffset)
		ToolMan.events().register(document, 'mousemove', group._drag)
		document.onmousemove = function() { return false }
		ToolMan.events().register(document, 'mouseup', group._dragEnd)

		group._notifyListeners(dragEvent)
	},

	_drag : function(event) {
		event = ToolMan.events().fix(event)
		var coordinates = ToolMan.coordinates()
		var group = this.toolManDragGroup
		if (!group) return
		var dragEvent = group.factory._createEvent('dragmove', event, group)

		var newTopLeftOffset = dragEvent.mouseOffset.minus(group._grabOffset)

		// TODO: replace with DragThreshold object
		if (!group._isThresholdExceeded) {
			var distance = 
					dragEvent.mouseOffset.distance(group._initialMouseOffset)
			if (distance < group._thresholdDistance) return
			group._isThresholdExceeded = true
			group._notifyListeners(
					group.factory._createEvent('dragstart', event, group))
		}

		for (i in group._transforms) {
			var transform = group._transforms[i]
			newTopLeftOffset = transform(newTopLeftOffset, dragEvent)
		}

		var dragDelta = newTopLeftOffset.minus(dragEvent.topLeftOffset)
		var newTopLeftPosition = dragEvent.topLeftPosition.plus(dragDelta)
		newTopLeftPosition.reposition(group.element)
		dragEvent.transformedMouseOffset = newTopLeftOffset.plus(group._grabOffset)

		group._notifyListeners(dragEvent)

		var errorDelta = newTopLeftOffset.minus(coordinates.topLeftOffset(group.element))
		if (errorDelta.x != 0 || errorDelta.y != 0) {
			coordinates.topLeftPosition(group.element).plus(errorDelta).reposition(group.element)
		}
	},

	_dragEnd : function(event) {
		event = ToolMan.events().fix(event)
		var group = this.toolManDragGroup
		var dragEvent = group.factory._createEvent('dragend', event, group)

		group._notifyListeners(dragEvent)

		this.toolManDragGroup = null
		ToolMan.events().unregister(document, 'mousemove', group._drag)
		document.onmousemove = null
		ToolMan.events().unregister(document, 'mouseup', group._dragEnd)
	},

	_notifyListeners : function(dragEvent) {
		var listeners = this._listeners[dragEvent.type]
		for (i in listeners) {
			listeners[i](dragEvent)
		}
	}
}

function _ToolManDragEvent(type, event, group) {
	this.type = type
	this.group = group
	this.mousePosition = ToolMan.coordinates().mousePosition(event)
	this.mouseOffset = ToolMan.coordinates().mouseOffset(event)
	this.transformedMouseOffset = this.mouseOffset
	this.topLeftPosition = ToolMan.coordinates().topLeftPosition(group.element)
	this.topLeftOffset = ToolMan.coordinates().topLeftOffset(group.element)
}

_ToolManDragEvent.prototype = {
	toString : function() {
		return "mouse: " + this.mousePosition + this.mouseOffset + "    " +
				"xmouse: " + this.transformedMouseOffset + "    " +
				"left,top: " + this.topLeftPosition + this.topLeftOffset
	}
}

ToolMan._dragFactory._constraintFactory = {
	vertical : function() {
		return function(coordinate, dragEvent) {
			var x = dragEvent.topLeftOffset.x
			return coordinate.x != x
					? coordinate.factory.create(x, coordinate.y) 
					: coordinate
		}
	},

	horizontal : function() {
		return function(coordinate, dragEvent) {
			var y = dragEvent.topLeftOffset.y
			return coordinate.y != y
					? coordinate.factory.create(coordinate.x, y) 
					: coordinate
		}
	}
}

/* Copyright (c) 2005 Tim Taylor Consulting (see LICENSE.txt) */

ToolMan._dragsortFactory = {
	makeSortable : function(item) {
		var group = ToolMan.drag().createSimpleGroup(item)

		group.register('dragstart', this._onDragStart)
		group.register('dragmove', this._onDragMove)
		group.register('dragend', this._onDragEnd)

		return group
	},

	/** 
	 * Iterates over a list's items, making them sortable, applying
	 * optional functions to each item.
	 *
	 * example: makeListSortable(myList, myFunc1, myFunc2, ... , myFuncN)
	 */
	makeListSortable : function(list) {
		var helpers = ToolMan.helpers()
		var coordinates = ToolMan.coordinates()
		var items = list.getElementsByTagName("li")

		helpers.map(items, function(item) {
			var dragGroup = dragsort.makeSortable(item)
			dragGroup.setThreshold(4)
			var min, max
			dragGroup.addTransform(function(coordinate, dragEvent) {
				return coordinate.constrainTo(min, max)
			})
			dragGroup.register('dragstart', function() {
				var items = list.getElementsByTagName("li")
				min = max = coordinates.topLeftOffset(items[0])
				for (var i = 1, n = items.length; i < n; i++) {
					var offset = coordinates.topLeftOffset(items[i])
					min = min.min(offset)
					max = max.max(offset)
				}
			})
		})
		for (var i = 1, n = arguments.length; i < n; i++)
			helpers.map(items, arguments[i])
	},

	_onDragStart : function(dragEvent) {
	},

	_onDragMove : function(dragEvent) {
		var helpers = ToolMan.helpers()
		var coordinates = ToolMan.coordinates()

		var item = dragEvent.group.element
		var xmouse = dragEvent.transformedMouseOffset
		var moveTo = null

		var previous = helpers.previousItem(item, item.nodeName)
		while (previous != null) {
			var bottomRight = coordinates.bottomRightOffset(previous)
			if (xmouse.y <= bottomRight.y && xmouse.x <= bottomRight.x) {
				moveTo = previous
			}
			previous = helpers.previousItem(previous, item.nodeName)
		}
		if (moveTo != null) {
			helpers.moveBefore(item, moveTo)
			return
		}

		var next = helpers.nextItem(item, item.nodeName)
		while (next != null) {
			var topLeft = coordinates.topLeftOffset(next)
			if (topLeft.y <= xmouse.y && topLeft.x <= xmouse.x) {
				moveTo = next
			}
			next = helpers.nextItem(next, item.nodeName)
		}
		if (moveTo != null) {
			helpers.moveBefore(item, helpers.nextItem(moveTo, item.nodeName))
			return
		}
	},

	_onDragEnd : function(dragEvent) {
		ToolMan.coordinates().create(0, 0).reposition(dragEvent.group.element)
	}
}

/* --------------- End code from http://badsegue.org/samples/toolman.js ------------------ */


   /* instantiate toolman objects */
   var dragsort = ToolMan.dragsort();
   var junkdrawer = ToolMan.junkdrawer();
   var nqm = NQM;

   /* startup once the page is ready */
   // this isn't working in GM .51
   // window.addEventListener("load", nqm.makediv, false);
   nqm.makediv();

}
)()
