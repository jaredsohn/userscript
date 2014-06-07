// ==UserScript==

// @name           IMDB for TPB

// @namespace      http://example.com

// @include        http://thepiratebay.org/*

// ==/UserScript==

var nfo = $X("//div[@class='nfo']");



var details = document.getElementById('details');

if(nfo && details)

{

	var col1, dt;



	var str = $X("string(//div[@id='details']/dl/dd/a/text())");

	if(str.match(/Movies|Filmer|Filmar|Film|Elokuvat|Kvikmyndir|Films|Filme|Películas|Filmes|Filmy|Filmek|Filmler|Pel.lícules|Filmid|Filmi|Wayang|Filma|Ταινίες|Фильмы|סרטים| 映画|Филми|افلام|电影|Фільми|চলচ্চিত্র/))

	{

		col1 = details.childNodes[1];

		

		dt = document.createElement('dt');

		dt.textContent = 'More info:';

		col1.appendChild(dt);

		

		dt = document.createElement('dd');

		dt.textContent = 'Loading...';

		col1.appendChild(dt);

		

		findImdbId(function(ids)

		{

			col1.removeChild(dt);

		

			if(ids)

			{

				var imdbId = ids[0];

				var shortImdbId = ids[1];

					

				var dd = document.createElement('dd');

				var a = document.createElement('a');

				a.href = "#imdb";

				a.textContent = "Show IMDB section";

				dd.appendChild(a);

				col1.appendChild(dd);

		

				var dd = document.createElement('dd');

				a = document.createElement('a');

				a.href = "#rotten-tomatoes";

				a.textContent = "Show Rotten Tomatoes";

				dd.appendChild(a);

				col1.appendChild(dd);

					

				var poster = document.createElement("img");

				poster.style.cssFloat = 'left';

					

		

				generateImdb(ids, poster);

				generateRottenTomatoes(ids, poster);

			}

		});

	}

}



function findImdbId(callback)

{

	var nfo = $X("string(//div[@class='nfo'])");

	if(nfo)

	{

		var result = nfo.match(/imdb.com\/title\/(tt([0-9]+))/);



		if(result)

		{

			callback([ result[1], result[2] ]);



			return;;

		}

	}

	

	// Go through comments to check for IMDB-urls

	var urls = $x("//div[@class='comment']/a");



	for(var i in urls)

	{

		var link = urls[i];

		



		var result = link.href.match(/imdb.com\/title\/(tt([0-9]+))/);



		if(result)

		{

			callback([ result[1], result[2] ]);



			return;;

		}

	}



	// We need to perform a search for movies

	var str = $X("string(//div[@id='details']/dl/dd/a/text())");

	if(str.match(/Movies|Filmer|Filmar|Film|Elokuvat|Kvikmyndir|Films|Filme|Películas|Filmes|Filmy|Filmek|Filmler|Pel.lícules|Filmid|Filmi|Wayang|Filma|Ταινίες|Фильмы|סרטים| 映画|Филми|افلام|电影|Фільми|চলচ্চিত্র/))

	{

		var stopwords = [ "VOB", "CAM", "DVDRIP", "TS", "KVCD" ];



		// This is a movie

		var title = $X("string(//div[@id='title'])");

		title = title

		.replace(/^\s+/, '')

		.replace(/\s+$/, '')

		.replace(/\./g, ' ')

		.replace(/\s+/g, ' ')

		.replace(/\_/g, ' ')

		.replace(/\[.*?\]/g, '')

		.replace(/vob(-[a-z0-9]+)?/gi, '')

		.replace(/cam(-[a-z0-9]+)?/gi, '')

		.replace(/dvdrip(-[a-z0-9]+)?/gi, '')

		.replace(/dvdscr(-[a-z0-9]+)?/gi, '')

		.replace(/dvd(-[a-z0-9]+)?/gi, '')

		.replace(/r5(-[a-z0-9]+)?/gi, '')

		.replace(/ts(-[a-z0-9]+)?/gi, '')

		.replace(/kvcd(-[a-z0-9]+)?/gi, '')

		.replace(/xvid(-[a-z0-9]+)?/gi, '')

		.replace(/divx(-[a-z0-9]+)?/gi, '')

		.replace(/x264(-[a-z0-9]+)?/gi, '')

		.replace(/ts(-[a-z0-9]+)?/gi, '')

		.replace(/ws(-[a-z0-9]+)?/gi, '')

		.replace(/proper(-[a-z0-9]+)?/gi, '')

		.replace(/BluRay(-[a-z0-9]+)?/gi, '')

		.replace(/HD-DVD(-[a-z0-9]+)?/gi, '')

		.replace(/screener(-[a-z0-9]+)?/gi, '')

		.replace(/\S+-[a-z0-9]+/gi, '')

		.replace(/[0-9]{3,4}p(-[a-z0-9]+)?/gi, '')

		.replace(/\s[A-Z]+SUB/gi, '')

		.replace(/\([0-9]{4}\)/g, '')

		.replace(/[0-9]{4}/g, '');



		// http://www.imdb.com/find?s=all&q=The+Dark+Knight&x=4&y=10

		var link = "http://www.imdb.com/find?s=all&q=" + URLEncode(title) + "&x=4&y=10";

		wget(link, function(dom)

		{

			var parts = title.toLowerCase().split(" ");

			var bestCandidate = ""; var bestCount = 0;

			

			var links = $x("//a", dom);

			for(var i in links)

			{

				var link = links[i];



				var linkParts = link.textContent.toLowerCase().split(" ");



				var currentCount = 0;

				for(var j in parts)

				{

					for(var x in linkParts)

					{

						if(parts[x] == linkParts[j])

						{

							currentCount++;

							break;

						}

					}

				}



				if(currentCount > bestCount

					&& link.href.match(/title\/(tt([0-9]+))/))

				{

					bestCount = currentCount;

					bestCandidate = link.href;

				}

			}



			var result = bestCandidate.match(/title\/(tt([0-9]+))/);



			if(result)

			{

				callback([ result[1], result[2], true ]);

	

				return;

			}

			

			callback();

		});

	}



	return;

}



function generateImdb(ids, poster)

{

	var imdbId = ids[0];



	// Create the info-box

	var imdb = document.createElement("div");

	imdb.id = "imdb";

	var header = document.createElement("div");

	header.id = "title";

	header.textContent = "IMDB ";

	imdb.appendChild(header);



	nfo.parentNode.insertBefore(imdb, nfo.nextSibling);



	if(ids[2])

	{

		var potential = document.createElement("font");

		potential.color = "white";

		potential.textContent = " (potential match)";

		header.appendChild(potential);

	}



	var loading = document.createElement("font");

	loading.color = "white";

	loading.textContent = " Loading...";

	header.appendChild(loading);



	var t = "http://www.imdb.com/title/" + imdbId + "/";



	imdb.appendChild(poster);



	/*var img = document.createElement("img");

	imdb.appendChild(img);

	

	var poster = "http://posters.motechnet.com/covers/" + imdbId + "_smallCover.jpg";

	img.src = poster;*/



	// Request data from IMDB

	wget(t, function(dom, url, xhr)

	{

		// We now have information from IMDB

		header.removeChild(loading);

		

		var container = document.createElement("div");

		container.style.paddingLeft = "150px";

		imdb.appendChild(container);



		var c1 = document.createElement("dl");

		container.appendChild(c1);



		var title = $x("//div[@id='tn15title']/h1/text()", dom);

		add(c1, "Title", title);



		var year = $x("//div[@id='tn15title']/h1/span/a/text()", dom);

		add(c1, "Year", year);





		var rating = $x("//div[@class='general rating']/div/b/text()", dom);

		add(c1, "Rating", rating);



		var tagline = $x("//div[@class='info']/h5[.='Runtime:']/following-sibling::text()", dom);

		add(c1, "Runtime", tagline);





		var dt = document.createElement('dt');

		dt.textContent = 'Link:';

		c1.appendChild(dt);



		var dd = document.createElement('dd');

		var a = document.createElement('a');

		

		a.href = t;

		a.textContent = t;

		dd.appendChild(a);



		c1.appendChild(dd);



		var c2 = document.createElement("dl");

		container.appendChild(c2);



		var director = $x("//div[@class='info']/h5[.='Director:']/following-sibling::div/a/text()", dom);

		if(! director[0])

		{

			director = $x("//div[@class='info']/h5[.='Directors:']/following-sibling::div/a/text()", dom);

			add(c2, "Directors", director);

		}

		else

		{

			add(c2, "Director", director);

		}



		var tagline = $x("//div[@class='info']/h5[.='Tagline:']/following-sibling::div/text()", dom);

		add(c2, "Tagline", tagline);



		var genre = $x("//div[@class='info']/h5[.='Genre:']/following-sibling::div/a/text()", dom);

		add(c2, "Genre", genre);



		var cast = $x("//table[@class='cast']//td[@class='nm']/a/text()", dom);

		add(c2, "Cast", cast);



		var c3 = document.createElement("dl");

		container.appendChild(c3);



		var plot = $x("//div[@class='info']/h5[.='Plot:']/following-sibling::div/text()", dom);
		console.log($x("//div[@class='info']/h5[.='Plot:']/following-sibling::div", dom));

		add(c3, "Plot", plot);

		

		var d = document.createElement("div");

		d.style.clear = 'both';

		imdb.appendChild(d);

	});

}



function generateRottenTomatoes(ids, poster)

{

	var imdbId = ids[1];



	// Create the info-box

	var box = document.createElement("div");

	box.id = "rotten-tomatoes";

	var header = document.createElement("div");

	header.id = "title";

	header.textContent = "Rotten Tomatoes ";

	header.style.clear = 'both';

	box.appendChild(header);



	nfo.parentNode.insertBefore(box, nfo.nextSibling.nextSibling);



	if(ids[2])

	{

		var potential = document.createElement("font");

		potential.color = "white";

		potential.textContent = " (potential match) ";

		header.appendChild(potential);

	}



	var loading = document.createElement("font");

	loading.color = "white";

	loading.textContent = " Loading...";

	header.appendChild(loading);



	var rottenImg = document.createElement("img");

	rottenImg.style.verticalAlign = 'middle';

	header.appendChild(rottenImg);



	var t = "http://www.rottentomatoes.com/alias?type=imdbid&s=" + imdbId;



	// Request data from Rotten Tomatoes

	wget(t, function(dom, url, xhr)

	{

		header.removeChild(loading);



		

		

		var c1 = document.createElement("dl");

		box.appendChild(c1);



/*		var title = $x("string(//div[@id='tn15title']/h1)", dom);

		add(c1, "Title", title);*/



		var dt = document.createElement('dt');

		dt.textContent = 'Link:';

		c1.appendChild(dt);



		var dd = document.createElement('dd');

		var a = document.createElement('a');

		

		a.href = t;

		a.textContent = t;

		dd.appendChild(a);



		c1.appendChild(dd);



		var img = $x("//div[@class='movie_tools_area']//img/@src", dom);



		if(! img[0])

		{

			poster.src = 'http://images.rottentomatoes.com/images/poster_default.gif';

			return;

		}

		

		poster.src = img[0].nodeValue;



		var c1 = document.createElement("dl");

		box.appendChild(c1);



		var percentage = $x("//span[@class='percent']/text() | //span[@class='perfect']/text()", dom);

		add(c1, "Rating", percentage[0].nodeValue + "%");



		rottenImg.src = getRottenImage(percentage[0].nodeValue);



		var consensus = $x("//*[@id='consensus']/text()", dom);

		add(c1, "Consensus", consensus);



		var c1 = document.createElement("dl");

		box.appendChild(c1);



		var synopsis = $x("//span[@id='movie_synopsis_blurb']/text()", dom);

		add(c1, "Synopsis", synopsis, "rt-synopsis-blurb");



		

	});

}



function add(root, header, content, id)

{

	if(! content || ! content[0])

	{

		return;

	}



	var dt = document.createElement('dt');

	dt.textContent = header + ':';

	root.appendChild(dt);



	var dd = document.createElement('dd');

	if(id)

	{

		dd.id = id;

	}



	var con = "";

	if(typeof content != 'string')

	{	

		for(var c in content)

		{

	

			var trimmed = !! content[c].nodeValue ? content[c].nodeValue : content[c];

			trimmed = trimmed.replace(/^\s+/, '').replace(/\s+$/, '');

	

			if(trimmed != "more" && trimmed != "" && trimmed != "|")

			{

				if(con != "")

				{

					con += ", ";

				}

	

				con += trimmed;

			}

			

		}

	}

	else

	{

		con = content;

	}



	if(con == "")

	{

		con = "Unknown";

	}



	dd.textContent = con;



	root.appendChild(dd);

}



function getRottenImage(percentage)

{

	if (percentage >= 60) { // it's fresh

					return 'data:image/png;base64,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';

				}

				else { // it's rotten

					return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gHGAQ2MyTxzz0AAAMSSURBVDjLhZPra1tlHMe/z7nk0nPSpklz2WKTrra1J7Ht3FoliGJ1MMS51g3xnXgDwf0dDuYLwaHgfQr6SjfpXKkIKjjsVqKburZZ0NUu7Zo0adpkzTkn5zznPI8vpCLTzc+77w9+X35XglsYPirtj4W9x1zGjPWa8+7CF/RX3AHyT6FNyJ7RTLJ45MBzMcZcnPnmw/qlxVIyP0W3b2cg3aJ7wsH2mGXrAIBdXbGgsbE2BGBWm5AJgGEAAQBz+SlK/zbY+7Q8Gg2pz2w2jIvX14p5rXddEwUZ1Vod1avuljYhK1pv/PTQwOCjrmOKsz/npvPAYQCQMpOyNpq563ymb8S3Vik557679Hyoffb1+9IjkUpZLxs1XuhQybHsyNBBv08F0In+nt2Hbjyxendhml4TJInsj0cCPsZbiEc6pWiXV7vy+/WTLbuOZE9QHn8x8HJ/z+4XBJHBojdh0ZsggkO2SywFAESbkCN702runj3dKb+3A41tw7KpbUfDnQHOOWxKIcsyOHfhuBYazS3Mfl+y5740e10bNwgAaAc9w7Go5710OjiWTMQJEURQx4RNdQhEhEdWcOHiMvtt3ig2626psuS+Y+v8YwAQAAA+vlCYNx8/f2HjOOUmONEBwYTHK0DycDCio1ym3263nMcCveThnWQAINln1T5tIPSRqsi72vxSKBbxBwn5975blovaZqvW1J3V9apx7tofjTd/+bxVlgb7w8ezY4kH8T8oChAOBcIAwozxkctXKk/ZtDgmlCvGNCCxtjY/VlZM5OaqtiB6oKoKVFWBZRF89umSsVGjdCfW3q4ie38qLQpkXFou1j859f583NHJKwu5rRmryd/uekM9m30g2Q0A5XUTP/1QPSx2sH19fdHXfN6/jtcwKPQaU6T8FHWBzRMATuyUazsspyj+bgC4N5NAap8vsVzcOjmXW33ywPjAQy7jOHtmka3mnKvSf/X74+WVDzJaYjIWCQhfzRT44tdGqdXglrGxMDlzeunV5qajrRVap6iJ239qZFB8pDMlvCV5yUt3Gu6fwOFaILXvWhsAAAAASUVORK5CYII=';

				}

}



function URLEncode (clearString) {

  var output = '';

  var x = 0;

  clearString = clearString.toString();

  var regex = /(^[a-zA-Z0-9_.]*)/;

  while (x < clearString.length) {

    var match = regex.exec(clearString.substr(x));

    if (match != null && match.length > 1 && match[1] != '') {

    	output += match[1];

      x += match[1].length;

    } else {

      if (clearString[x] == ' ')

        output += '+';

      else {

        var charCode = clearString.charCodeAt(x);

        var hexVal = charCode.toString(16);

        output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();

      }

      x++;

    }

  }

  return output;

}



// Utility methods from http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js



// list nodes matching this expression, optionally relative to the node `root'

function $x( xpath, root ) {

  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;

  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];

  switch (got.resultType) {

    case got.STRING_TYPE:

      return got.stringValue;

    case got.NUMBER_TYPE:

      return got.numberValue;

    case got.BOOLEAN_TYPE:

      return got.booleanValue;

    default:

      while (next = got.iterateNext())

	result.push( next );

      return result;

  }

}



function $X( xpath, root ) {

  var got = $x( xpath, root );

  return got instanceof Array ? got[0] : got;

}





// Fetches url, $x slices it up, and then invokes cb(nodes, url, dom, xhr).

// If runGM is set to true and the url is on the same domain as location.href,

// the loaded document will first be processed by all GM scripts that apply. If

// div is set to true and runGM is not, the DOMization will be via a div instead

// of a frame (which munges the html, head and body tags), but saves resources.

// Note when using div: use xpath expressions starting in "./", not "/", as the

// root node is not connected. Also, the document passed to cb will be the div.

function wget$x( url, cb/*( [DOMNodes], url, dom, xhr )*/, xpath, runGM, div ) {

  wget(url, function(xml, url, xhr) {

    cb( $x( xpath, xml ), url, xml, xhr );

  }, runGM, div);

}



// Fetches url, $X slices it up, and then invokes cb(node, url, dom, xhr).

// If runGM is set to true and the url is on the same domain as location.href,

// the loaded document will first be processed by all GM scripts that apply.  If

// div is set to true and runGM is not, the DOMization will be via a div instead

// of a frame (which munges the html, head and body tags), but saves resources.

// Note when using div: use xpath expressions starting in "./", not "/", as the

// root node is not connected. Also, the document passed to cb will be the div.

function wget$X( url, cb/*( DOMNode, url, dom, xhr )*/, xpath, runGM, div ) {

  wget(url, function(xml, url, xhr) {

    cb( $X( xpath, xml ), url, xml, xhr );

  }, runGM, div);

}



// Fetches url, turns it into an HTML DOM, and then invokes cb(dom, url, xhr).

// If runGM is set to true and the url is on the same domain as location.href,

// the loaded document will first be processed by all GM scripts that apply.  If

// div is set to true and runGM is not, the DOMization will be via a div instead

// of a frame (which munges the html, head and body tags), but saves resources.

function wget( url, cb/*( dom, url, xhr )*/, runGM, div ) {

  //console.log("Loading %x", url);

  if (html2dom[url]) // cache hit?

    return html2dom(null, cb, url, null, runGM);

  var xhr = { method:'GET', url:url, onload:function( xhr ) {

    if (xhr.responseXML)

      cb( xhr.responseXML, url, xhr );

    else

      html2dom( xhr.responseText, cb, url, xhr, runGM, div );

  }};

  if (wget.xhr)

    wget.xhr(xhr);

  else

    GM_xmlhttpRequest(xhr);

}



function mayCommunicate(url1, url2) {

  function beforePath(url) {

    url = url.match(/^[^:]+:\/*[^\/]+/);

    return url && url[0].toLowerCase();

  }

  return beforePath(url1) == beforePath(url2);

}



// Well-behaved browers (Opera, maybe WebKit) could use this simple function:

// function html2dom( html, cb/*( xml, url, xhr )*/, url, xhr ) {

//   cb( (new DOMParser).parseFromString(html, "text/html"), url, xhr );

// }



// Firefox doesn't implement (new DOMParser).parseFromString(html, "text/html")

// (https://bugzilla.mozilla.org/show_bug.cgi?id=102699), so we need this hack:

function html2dom( html, cb/*( xml, url, xhr )*/, url, xhr, runGM, div ) {

  function loaded() {

    doc = cached.doc = iframe.contentDocument;

    iframe.removeEventListener("load", loaded, false);

    doc.removeEventListener("DOMContentLoaded", loaded, false);

    var callbacks = cached.onload;

    delete cached.onload;

    //console.log("DOMContentLoaded of %x: cb %x", url, callbacks);

    setTimeout(function() { // avoid racing with GM's DOMContentLoaded callback

      //console.log("Running %x callbacks", url);

      callbacks.forEach(function(cb,i) { cb( doc, url, xhr ); });

    }, 10);

  };

  function wipeJavascript(html) {

    var x = html.replace(/[\n\r]+/g, " "). // needed not freeze up(?!)

      replace(/<script.*?<\/script>/ig, ""). // no code execution on injection!

      replace(/<noscript.*?<\/noscript>/ig, ""). // no code execution on injection!

      replace(/<iframe.*?<\/iframe>/ig, ""). // no code execution on injection!

      replace(/<body(\s+[^="']*=("[^"]*"|'[^']*'|[^'"\s]\S*))*\s*onload=("[^"]*"|'[^']*'|[^"']\S*)/ig, "<body$1");

// 	console.log(x);

	return x;

  };



  if (div && !runGM) {

    var parent = document.createElement("div");

    parent.innerHTML = wipeJavascript(html);

    return setTimeout(cb, 10, parent, url); // hopefully render it first

  }



  var cached = html2dom[url]; // cache of all already loaded and rendered DOM:s

  if (cached)

    if (cached.onload)

      return cached.onload.push(cb);

    else

      return cb(cached.doc, url, cached.xhr);



  var iframe = document.createElement("iframe");

  iframe.style.height = iframe.style.left = "0";

  iframe.style.width = (innerWidth - 32)+"px";

  iframe.style.visibility = "hidden";

  iframe.style.position = "absolute";

  document.body.appendChild(iframe);



  iframe.addEventListener("load", loaded, false);

  html2dom[url] = cached = { onload:[cb], xhr:xhr };

  if (runGM && mayCommunicate(url, location.href))

    return iframe.src = url; // load through GM (should be cached due to xhr)



  //console.log("May not communicate / GM scripts unwanted! (%x)", runGM);

  html = wipeJavascript(html);

  iframe.contentWindow.location.href = location.href; // for cross domain issues

  var doc = iframe.contentDocument;

  doc.open("text/html");

  doc.addEventListener("DOMContentLoaded", loaded, false);

  doc.write(html); // this may throw weird errors we can't catch or silence :-|

  doc.close();

}



html2dom.destroy = function() {

  for (var url in html2dom)

    if (html2dom.hasOwnProperty(url)) {

      var cache = html2dom[url];

      cache.doc = cache.onload = cache.xhr = null;

      delete html2dom[url];

    }

};



// functionally belongs to html2dom above (see location.href line for details)

try { // don't run this script recursively on wget() documents on other urls

  if (window.frameElement &&

      window.parent.location.href.replace(/#.*/, "") == location.href)

    throw (new Error("wget.js: Avoiding double firing on " + location.href));

} catch(e) {

  //console.error("Double fire check error: %x", e);

}



window.addEventListener("unload", html2dom.destroy, false);
