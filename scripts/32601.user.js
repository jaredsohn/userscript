// ==UserScript==
// @name           MSSlideShow_v2
// @namespace      http://mywebsite.com/myscripts
// @include        http://www.malibustrings.com/competition/*gal1.html
// @include        http://www.malibustrings.com/competition/*gal2.html
// @include        http://www.malibustrings.com/competition/*gal3.html
// @include        http://www.malibustrings.com/competition/*gal4.html
// @include        http://www.malibustrings.com/competition/*gal5.html
// @include        http://www.malibustrings.com/competition/*gal6.html
// @include        http://www.malibustrings.com/competition/*gal7.html
// @include        http://www.malibustrings.com/competition/*gal8.html
// @include        http://www.malibustrings.com/competition/*gal9.html
// @include        http://www.malibustrings.com/competition/*gal10.html
// @include        http://www.1sexynight.com/customergallery/20*/*gal1.html 
// @include        http://www.1sexynight.com/customergallery/20*/*gal2.html 
// @include        http://www.1sexynight.com/customergallery/20*/*gal3.html 
// @include        http://www.1sexynight.com/customergallery/20*/*gal4.html 
// @include        http://www.1sexynight.com/customergallery/20*/*gal5.html 
// @include        http://www.1sexynight.com/customergallery/20*/*gal6.html 
// @include        http://www.1sexynight.com/customergallery/20*/*gal7.html 
// @include        http://www.1sexynight.com/customergallery/20*/*gal8.html 
// @include        http://www.1sexynight.com/customergallery/20*/*gal9.html 
// @include        http://www.1sexynight.com/customergallery/20*/*gal10.html 
// ==/UserScript==

window.addEventListener("load", function(e) {

	// window.alert("begin");

// Gallery page 
//   http://www.malibustrings.com/competition/2007/tracygal1.html
// Contains multiple images
//   http://www.malibustrings.com/competition/2007/pictures/tracy1a.jpg
// with a hyperlink to:
//   http://www.malibustrings.com/competition/2007/tracy1.html
// HTML
// <a href="/competition/2007/tracy1.html">
//   <img style="width: 95px; height: 134px;" src="/competition/2007/pictures/tracy1a.jpg" 
//     alt="tracy in a malibu strings bikini" border="1" height="134" width="95">
// </a>

// Detail page 
//   http://www.malibustrings.com/competition/2007/tracy1.html
// Contains an image:
//   http://www.malibustrings.com/competition/2007/pictures/tracy1.jpg
// with a hyperlink to:
//   http://www.malibustrings.com/order/MS10131.html
// HTML
// <a href="/order/MS10137.html">
//   <img style="width: 425px; height: 600px;" src="/competition/2007/pictures/tracy11.jpg" 
//     alt="Tracy in a Malibu Strings bikini." border="1" height="600" width="425">
// </a>

	// ... onclick="javascript:openPopup('/models/julie/default.asp?popup=6', 634, 974, 0);">next
	var debug=false;
	if(debug) window.alert("begin");

	var tables=document.getElementsByTagName("table");
	var last_table_elm=tables[tables.length];

	var images=document.getElementsByTagName("img");
	for(i=0;i<images.length;i++) {
		var img=images[i];
		if(debug && i<5) window.alert(i+"="+img.src);
		if(img.src && (img.src.indexOf("competition")!=-1 || img.src.indexOf("customergallery")!=-1)) {
			var pos=img.src.lastIndexOf("a.jpg");
			if(pos!=-1) {
				if(debug) window.alert("Image ("+i+") hit "+img.src);
				var re = /a.jpg$/;
				var newsrc = img.src.replace(re, ".jpg");
				if(debug) window.alert("Image ("+i+") hit "+img.src+" ==> "+newsrc);

				var newimg = document.createElement("img");
				newimg.setAttribute("src", newsrc);
				newimg.setAttribute("vspace", 5);
				newimg.setAttribute("hspace", 5);
				document.body.appendChild(newimg);
			}
			
		}
	}

	var para = document.createElement("center");

	var dirs = location.href.split("/");   
	//window.alert("0="+dirs[0]+"\n1="+dirs[1]+"\n2="+dirs[2]+"\n3="+dirs[3]+"\n4="+dirs[4]+"\n5="+dirs[5]);
	var gallery = dirs[5];
	var len=gallery.length;
	var year = Number(dirs[4]);
	var firstyear = 2004;
	var thisyear = new Date().getFullYear();
	var nextyear = (year<thisyear? year+1: thisyear);
	var prevyear = (year>firstyear? year-1: firstyear);
	var contributor = gallery.slice(0,-9);

	var galnum=Number(gallery.slice(len-6,-5));
	var nextgalnum=(galnum<9? galnum+1: 9);
	var prevgalnum=(galnum>1? galnum-1: 1);
	//if(debug) window.alert("year="+year+"\ncontributor="+contributor+"\ngallery="+gallery+"\nprevgalnum="+prevgalnum+"\ngalnum="+galnum+"\nnextgalnum="+nextgalnum);

	var re = /gal[0-9].html$/;

	// Make the Next Gallery hyperlink
	var nextgallink = null;
	if(galnum<9) {
		nextgallink = document.createElement("a");
		var nextgalhref = new String(location.href);
		nextgalhref = nextgalhref.replace(re, "gal"+nextgalnum+".html");
		nextgallink.setAttribute("href", nextgalhref);
		nextgallink.style.textDecoration="underline";
		nextgallink.title=contributor+": "+year+"-"+nextgalnum;
	} else {
		nextgallink = document.createElement("span");
		nextgallink.style.color="Silver";
	}
	nextgallink.style.paddingRight="15px";
	nextgallink.appendChild(document.createTextNode("Next Gallery >"));

	// Make the Previous Gallery hyperlink
	var prevgallink = null;
	if(galnum>1) {
		prevgallink = document.createElement("a");
		var prevgalhref = new String(location.href);
		prevgalhref = prevgalhref.replace(re, "gal"+prevgalnum+".html");
		prevgallink.setAttribute("href", prevgalhref);
		prevgallink.style.textDecoration="underline";
		prevgallink.title=contributor+": "+year+"-"+prevgalnum;
	} else {
		prevgallink = document.createElement("a");
		prevgallink.style.color="Silver";
	}
	prevgallink.style.paddingRight="15px";
	prevgallink.appendChild(document.createTextNode("< Prev Gallery"));

	if(debug) window.alert("p="+prevgalhref+"\n"+"c="+location.href+"\n"+"n="+nextgalhref);

	// Make the Next Year hyperlink
	var nextyearlink = null;
	if(year<thisyear) {
		nextyearlink = document.createElement("a");
		//var nextyearhref = "http://"+dirs[2]+"/"+dirs[3]+"/"+nextyear+"/"+gallery;
		var nextyearhref = "http://"+dirs[2]+"/"+dirs[3]+"/"+nextyear+"/"+contributor+"gal1.html";
		nextyearlink.setAttribute("href", nextyearhref);
		nextyearlink.style.textDecoration="underline";
		nextyearlink.title=contributor+": "+nextyear+"-1";
	} else {
		nextyearlink = document.createElement("span");
		nextyearlink.style.color="Silver";
	}
	nextyearlink.style.paddingRight="15px";
	nextyearlink.appendChild(document.createTextNode("Next Year >>"));

	// Make the Previous Year hyperlink
	var prevyearlink = null;
	if(year>firstyear) {
		prevyearlink = document.createElement("a");
		//var prevyearhref = "http://"+dirs[2]+"/"+dirs[3]+"/"+prevyear+"/"+gallery;
		var prevyearhref = "http://"+dirs[2]+"/"+dirs[3]+"/"+prevyear+"/"+contributor+"gal1.html";
		prevyearlink.setAttribute("href", prevyearhref);
		prevyearlink.style.textDecoration="underline";
		prevyearlink.title=contributor+": "+prevyear+"-1";
	} else {
		prevyearlink = document.createElement("span");
		prevyearlink.style.color="Silver";
	}
	prevyearlink.style.paddingRight="15px";
	prevyearlink.appendChild(document.createTextNode("<< Prev Year"));

	// Make the Index hyperlink
	var indexlink = document.createElement("a");
	var indexhref = null;
	if(year==thisyear) {
		indexhref = "http://www.malibustrings.com/competition.html";
	} else {
		indexhref = "http://www.malibustrings.com/"+year+"competition.html";
	}
	indexlink.setAttribute("href", indexhref);
	indexlink.style.textDecoration="underline";
	indexlink.style.paddingRight="15px";
	indexlink.title=year+" Index";
	indexlink.appendChild(document.createTextNode(year+" Index"));

	// Append the new hyperlinks
	para.appendChild(prevyearlink);
	para.appendChild(prevgallink);
	para.appendChild(indexlink);
	para.appendChild(nextgallink);
	para.appendChild(nextyearlink);

	document.body.insertBefore(para, document.body.firstChild);
	document.body.appendChild(para.cloneNode(true));

	// window.alert("end");

}, false);


