// ==UserScript==
// @name          IMDB Details for torrentleech.org
// @namespace     http://whatever.org
// @description   Shows IMDB rating next to movie rating
// @include       http://www.torrentleech.org/*
// @include       http://torrentleech.org/*
// made by kane77, re-edited by Sandbird
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('a.imdb1 { font-size: 2em ! important; font-weight: bold; color: #F00; text-align: center; margin-top: 15px;}');
addGlobalStyle('a.imdb2 { font-size: 2em ! important; font-weight: bold; color: #D20; text-align: center; margin-top: 15px;}');
addGlobalStyle('a.imdb3 { font-size: 2em ! important; font-weight: bold; color: #C30; text-align: center; margin-top: 15px;}');
addGlobalStyle('a.imdb4 { font-size: 2em ! important; font-weight: bold; color: #A50; text-align: center; margin-top: 15px;}');
addGlobalStyle('a.imdb5 { font-size: 2em ! important; font-weight: bold; color: #860; text-align: center; margin-top: 15px;}');
addGlobalStyle('a.imdb6 { font-size: 2em ! important; font-weight: bold; color: #680; text-align: center; margin-top: 15px;}');
addGlobalStyle('a.imdb7 { font-size: 2em ! important; font-weight: bold; color: #5A0; text-align: center; margin-top: 15px;}');
addGlobalStyle('a.imdb8 { font-size: 2em ! important; font-weight: bold; color: #3C0; text-align: center; margin-top: 15px;}');
addGlobalStyle('a.imdb9 { font-size: 2em ! important; font-weight: bold; color: #2D0; text-align: center; margin-top: 15px;}');
addGlobalStyle('a.imdb9 { font-size: 2em ! important; font-weight: bold; color: #0F0; text-align: center; margin-top: 15px;}');

addGlobalStyle('a.title { font-size: 1.2em ! important; font-weight: bold; color: white; text-align: center; margin-top: 15px;}');

addGlobalStyle('.rating {/*width: 150px; height: 150px;*/ background: rgba(44,44,44, 0.5); position:fixed; left:50px; top:150px; padding: 20px;}');
addGlobalStyle('.label {color:white;}');



(function(){ try {
var notInTags=['head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'];
var res = document.evaluate("//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]",
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var i, el, l, m, p, span, txt, rating, genre, title, 
	urlRE=/((?:https?|ftp|hxxp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;

for (i=0; el=res.snapshotItem(i); i++) {
	//grab the text of this element and be sure it has a URL in it
	txt=el.textContent;
	span=null;
	p=0;
	while (m=urlRE.exec(txt)) {
		if (null==span) {
			//create a span to hold the new text with links in it
			span=document.createElement('span');
		}

		//get the link without trailing dots
		l=m[0].replace(/\.*$/, '');
		l=m[0].replace(/hxxp/, 'http');
				//put in text up to the link
		span.appendChild(document.createTextNode(txt.substring(p, m.index)));
		//create a link and put it in the span
		a=document.createElement('a');
		a.className='linkifyplus';
		a.appendChild(document.createTextNode(l));
		
		if (-1==l.indexOf('://')) l='mailto:'+l;
		a.setAttribute('href', "#");
		//getRating(a);
		span.appendChild(a);
		
		//span.insertBefore(document.createTextNode(rating), a.nextSibling);
		rating = document.createElement("a");
		rating.appendChild(document.createTextNode(""));
		rating.className='imdb';
    rating.setAttribute('href',l);
    var re = new RegExp("imdb");
    var x = re.exec(l);
    if(x!=null) {
      main = document.createElement("div");
      main.innerHTML = "<h1>IMDB Details<h1>";
      main.className="rating";

      var label = document.createElement("span");
      label.innerHTML = '<br />';
      label.appendChild(document.createTextNode("Title: "));
      label.className='label';
      main.appendChild(label);
      title = document.createElement("a");
		  title.appendChild(document.createTextNode(""));
		  title.className='title';
      title.setAttribute('href',l);
      getTitle(title);
      main.appendChild(title);

      var label = document.createElement("span");
      label.innerHTML = '<br />';
      label.appendChild(document.createTextNode("Rating: "));
      label.className='label';
      main.appendChild(label);
      getRating(rating);
      main.appendChild(rating);
      
      genre = document.createElement("a");
		  genre.appendChild(document.createTextNode(""));
		  genre.className='label';
      genre.setAttribute('href',l);
      var label = document.createElement("span");
      label.innerHTML = '<br />';
      label.appendChild(document.createTextNode("Genre: "));
      label.className='label';
      main.appendChild(label);
      getGenre(genre);
      main.appendChild(genre);
      
      genre.setAttribute('href',"#");
      rating.setAttribute('href',"#");
      title.setAttribute('href',"#");
  }
    
    
//    span.insertBefore(newElement, a.nextSibling);
		document.body.insertBefore(main, document.body.firstChild);
		
//appendChild(a);
		p=m.index+m[0].length;
	}
	if (span) {
		//take the text after the last link
		span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
		//replace the original text with the new span
		el.parentNode.replaceChild(span, el);
	}
}
} catch(e) {dump('Linkify Plus Error ('+e.lineNumber+'): '+e+'\n');} })();

function getGenre(link) {
    var m;
	GM_xmlhttpRequest({

		method: 'GET',

		url: link.href,

		onload: function (responseDetails) {

			if (responseDetails.status == 200) {

				var re = new RegExp("<a\\b[^>]*href=\"\/Sections\/Genres\/\\w+\/\">\\w+<\/a>","g");
  			var x = new RegExp(">(\\w+)");

				m = re.exec(responseDetails.responseText);
				link.appendChild(document.createTextNode(x.exec(m)[1]));

				while (m != null) {
  				m = re.exec(responseDetails.responseText);
  				link.appendChild(document.createTextNode(", "+x.exec(m)[1]));
					//m=null;

				}



			}

		}

	});
}

function getTitle(link) {
    var m;
	GM_xmlhttpRequest({

		method: 'GET',

		url: link.href,

		onload: function (responseDetails) {

			if (responseDetails.status == 200) {

				var re = new RegExp("id=\"tn15title\">[^>]*>([\\w -()]+)","g");
 			  m = re.exec(responseDetails.responseText)[1];
 			  re = new RegExp("\/Sections\/Years[^)]+([12]\\d\\d\\d)[^)]","g");  
 			  m += " ("+re.exec(responseDetails.responseText)[1]+")";			
  			if(m!=null){
          link.appendChild(document.createTextNode(m));
        }

			}

		}

	});
}


function getRating(link) {

	var m;
	GM_xmlhttpRequest({

		method: 'GET',

		url: link.href,

		onload: function (responseDetails) {

			if (responseDetails.status == 200) {

				var res = responseDetails.responseText;  
				var getRate = res.match(/<div class="meta">\s*<b>(\d\.\d)\/10<\/b>/);
				rating = getRate[1];


				if (rating != null) {
					link.appendChild(document.createTextNode(rating));
					link.className= "imdb"+rating[0];
				}

			}

		}

	});
}