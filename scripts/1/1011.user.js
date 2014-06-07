// ==UserScript==
// @name          pitchfork butler
// @namespace     http://www-personal.engin.umich.edu/~csmuda
// @description	  Collapses ads, adds an extraneous navbar on the front page, integrates google into search boxes, fills search box with artist/album info automatically.  version 1.0
// @include       *pitchforkmedia.com*
// ==/UserScript==

(function (){

	//ad removal
	scripts = document.evaluate("//script", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null); 
	currentscript = scripts.iterateNext();
	adnodes = new Array(0);
	while(currentscript != null){
		adnodes.push(currentscript.parentNode);
		currentscript = scripts.iterateNext();
	}
	for(i=0; i<adnodes.length; i++){
		if((adnodes[i].parentNode != null) && (adnodes[i].tagName == "TD")){
			adnodes[i].parentNode.parentNode.setAttribute("bgcolor", "#F2FCFE");
			adnodes[i].parentNode.removeChild(adnodes[i]);
	
		}
	}
	
	//add google into the search pane
	engines = document.getElementsByName("engine");
	text = document.createTextNode("Google");
	google = document.createElement("OPTION");
	google.appendChild(text);
	google.setAttribute("value", "Google|http://www.google.com/search?q=");
	engines[0].appendChild(google);
	
	page = document.URL
	
	//patch an undesirable hole on the front page with a navigator bar (or just a light blue cell)
	if(/.com\/$/.test(page)){
		spans = document.getElementsByTagName("SPAN");
		banner = spans[0].getElementsByTagName("A");
		if(banner[0] != null) spans[0].removeChild(banner[0]);
		bluetable = document.createElement("TD");
		bluetable.setAttribute("width", "730");
		bluetable.setAttribute("height", "93");
		bluetable.setAttribute("bgcolor", "#f2fcfe");
		bluetable.setAttribute("border","0");
		bluetable.setAttribute("style","text-align:justify");
		bluetable.setAttribute("class","featureauthor");
		spans[0].appendChild(bluetable);
			
		
		//generate navbar - comment out this block if it's annoying.
		letters = "abcdefghijklmnopqrstuvwxyz";
		linkletter = document.createElement("A");
		text=document.createTextNode("reviews: ");
		linkletter.appendChild(text);
		text="http://www.pitchforkmedia.com/record-reviews/";
		linkletter.setAttribute("href", text);
		bluetable.appendChild(linkletter);
		for(i=0; i<letters.length; i++){
			linkletter = document.createElement("A");
			linkletter.setAttribute('href', 'http://www.pitchforkmedia.com/record-reviews/' + letters[i] + '/');
			text = document.createTextNode(letters[i] + ' ');
			linkletter.appendChild(text);
			bluetable.appendChild(linkletter);
		}
		linebreak=document.createElement('BR');
		bluetable.appendChild(linebreak);
		para=document.createElement("P");
		bluetable.appendChild(para);
		currentname = new Array("features", "news", "track reviews", "free downloads", "best new music");
		currentitem = new Array("features", "news", "tracks", "mp3", "best");
		for(i=0; i < currentitem.length; i++) {
			linkletter = document.createElement("A");
			linkletter.setAttribute('href', 'http://www.pitchforkmedia.com/'+ currentitem[i]);
			text = document.createTextNode('[' + currentname[i] + '] ');
			linkletter.appendChild(text);
			bluetable.appendChild(linkletter);
		}
		//end navbar stuff
	}
	
	//automatically fill in search box with artist, album - goes well with google
	if(/record-reviews/.test(page)){
		r = /\ .*\n/g;
		box = document.getElementsByTagName("INPUT")[0];
		comments = document.evaluate("//comment()", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
		comment = comments.iterateNext();
		if(/1_artist/.test(comment.nodeValue)){
			items = comment.nodeValue.match(r);
			searchvals = items[0].replace(/^\s|\n/g, '"')  +' '+ items[1].replace(/^\s|\n/g, '"');
			box.setAttribute("value", searchvals);
			box.removeAttribute("onfocus");
			
		}

	}
		
})();