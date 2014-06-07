// ==UserScript==
// @name           IMDb + Clipland
// @version        1.1.1
// @namespace      http://www.clipland.com/
// @description    IMDb + Clipland enhances IMDb with data from Clipland
// @copyright      2009-2010, Clipland GmbH (http://www.clipland.com/imdbplus)
// @license        CC Attribution-No Derivative Works 3.0; http://creativecommons.org/licenses/by-nd/3.0/;
// @include        http://*imdb.com/name/*
// ==/UserScript==


	/*
	IMDb + Clipland: 
	The Internet Movie Database is an invaluable resource regarding information about long form films,
	still, it is not as strong on the short form front.
	Clipland, in turn, is strong in knowing stuff about short form films and not so good in the domain of feature films.

	A no-brainer to combine the two:
	With this script, visits to the IMDb get enhanced with data from Clipland so you finally
	get the complete picture.
	*/


var imdbName = document.title;
var imdbId = location.href.match(/imdb.com\/name\/(nm([0-9]+))/)[1];
var subUrl = location.href.match(/imdb.com\/name\/nm[0-9]+\/(.*)/)[1];


if(subUrl == '' || subUrl == 'maindetails'){
	getCliplandData();
}else{
	// don't run this on, for example .../bio, etc.
	return;
}


function getCliplandData(cliplandLink){
	var cliplandUrl = "http://www.clipland.com/xml/api/addon-imdb-name?version=1.1&imdbName="+ encodeURIComponent(imdbName) +"&imdbId="+ imdbId;

	GM_xmlhttpRequest({
		method: 'GET',
		url: cliplandUrl,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function (responseDetails){
			var CliplandData = responseDetails.responseText;

			if (CliplandData == ''){
				// do nothing on empty responses! (means no match or error)
				return;
			}

			var DataSegment = CliplandData.split("##")

			// inform the user that this add-on was active
			document.title = document.title +" at IMDb + Clipland";

			var divs = document.getElementsByTagName('div');
			var lastFilmoNextSibling;

			for (var i = 0; i < divs.length; i++){
				if (divs[i].className  == 'strip jump'){
					// add a 'Jump to Clipland data' link
					divs[i].innerHTML = divs[i].innerHTML + "; Jump to: <a href='#clipland'>Clipland Data</a>";
				}
				if (divs[i].className  == 'filmo'){
					// remeber the position of the last 'filmo' div
					lastFilmoNextSibling = divs[i].nextSibling;
				}
			}

			// append the Clipland div imdb style
			var cliplandDiv = document.createElement("div");
			cliplandDiv.className = 'filmo clipland';
			cliplandDiv.innerHTML =  '<h5><a name="clipland">Clipland:</a></h5>\n'
				+ DataSegment[0]
//				+'<ul class="label">\n<li><a href="#clipland2000">2000s</a></li>\n<li><a href="#clipland1990">1990s</a></li>\n</ul>'
//				+'\n<ol>\n<li><a href="http://www.clipland.com/">Entry 1</a> .... Role<br/></li>\n<li><a href="http://www.clipland.com/">Entry 2</a> .... Role<br/></li>\n<li><a href="http://www.clipland.com/">Entry 3</a> .... Role<br/></li>\n</ol>'
				+'<div style="text-align: right;"><small>This section added by IMDb + Clipland</small></div>';
			document.getElementById("tn15content").insertBefore(cliplandDiv,lastFilmoNextSibling);

			// append a Clipland css style set (green)
			var cliplandcss = document.createElement("style");
			cliplandcss.setAttribute("type", "text/css");
			cliplandcss.setAttribute("media", "screen");
			cliplandcss.appendChild(document.createTextNode(".clipland { color: #375; }"));
		        document.getElementsByTagName("head")[0].appendChild(cliplandcss);

			// reflect modified copyright in the footer
			document.getElementById("footer").childNodes[3].innerHTML += "<br>Content partially copyright &copy; Clipland GmbH <a href='http://www.clipland.com/'>www.clipland.com</a>.";



			// add a link to Clipland on films that are in IMDb and in Clipland 
			// (what a mess of splits...)
			var a = document.getElementsByTagName("A");
			var films = DataSegment[1].split("\n");
			var filmId = new Array();
			for(var i=0;i<films.length;i++){
				var bit = films[i].split("\t");
				filmId[bit[0]] = bit[1];
			}

			var test;
			for(var i=0;i<a.length;i++){
				var thisfilm = a[i].href.match(/\/title\/tt(\d+)\//);
				if(thisfilm){
					var thisfilmId = 'tt'+thisfilm[1];
					test += thisfilmId +"\n";
					if( filmId[thisfilmId] ){
						a[i].parentNode.innerHTML = a[i].parentNode.innerHTML + '  (<a href="http://www.clipland.com/Summary/'+ filmId[thisfilmId] +'/">on Clipland</a>)'
					}
				}
			}
		}
	});
}



// alert('Debug: IMDb + Clipland okay.')

