// ==UserScript==
// @name          Netflix: IMDB Movie Times
// @namespace     http://userscripts.org/users/93326
// @description	  Check movie times from imdb
// @include       http://www.netflix.com/Movie/*
// @include       http://www.netflix.com/WiMovie*


// ==/UserScript==

var releaseyeardiv = document.getElementById('releaseyear');




if (releaseyeardiv != null) {
  var htmlcode = releaseyeardiv.innerHTML;


var IMDB_icon = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAYAAAB24g05AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAABGdB' +
	'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAu0lE' +
	'QVR42mL8DwQMYMDIQBqAaAMIIBa45rNppOk3ZgQbAhBATAjNs6AyRNJgPYwMAAHEBLOZ1YIFJ81qMQ/I' +
	'QlaHMAQggJgQJiMARAMC/D6RhCKGbAhAADHBTEbXgA9ADIS4ECCAmFD9hx2AbIcYOguNz8AAEECM/8+k' +
	'/UdVPosB4SpkNjqAyAEEEBPEb7MIaMYWE2lglwAEECMoIbGysqL5m7ArwN74/ZsBIIAYYSkRZAgpAKQZ' +
	'BAACDABFGEQjVBKm/gAAAABJRU5ErkJggg==';



///////////
  var titlename = document.title.substring(9,document.title.length).toLowerCase().replace(/ /g,'_').replace(/:/g,'');
  var prefix = titlename.substr(0,4);
  if ('the_' == prefix) {
    titlename = titlename.substr(4, titlename.length-4);
    }
///////////



}


//////////////////////////////
//IMDB CODE STARTS HERE//
//////////////////////////////



	var div = document.createElement("div");
	var IMDB_times1 = document.createElement("a");
	var IMDB_times2 = document.createElement("b");

	//IMDB_times1.href = 'http://www.imdb.com/showtimes/location/mycinemas'
	//wpLink1.style.marginRight = "70px";
	//wpLink1.title = "Technical Specs:";


	IMDB_times1.innerHTML = '<BR><BR> <P> <img src="' + IMDB_icon + '" alt="IMDB">  <a href= "http://www.imdb.com/showtimes/location/mycinemas"> <b>Local Movie Times: </b>  </a> </p>';



	IMDB_times2.innerHTML = '<P> <img src="' + IMDB_icon + '" alt="IMDB"> <span class="content" id="imdb_showtimes"> <b>Show Times: </b> checking... </span> </p>';

	div.appendChild(IMDB_times1);
	div.appendChild(IMDB_times2);


document.getElementById('synopsis').appendChild(div);

var imdb_showtimes_span = document.getElementById('imdb_showtimes');

titleWITHspaces = titlename.replace(/_/g, ' ');


var title = titlename 



title = titlename.replace(/_/g, " ");

url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + title + '+site:imdb.com';


//////////////////////////////

GM_xmlhttpRequest({
	method:"GET",
	url:url1,
	onload:function(details) {
		var res;
		res = eval('(' + details.responseText + ')');
		url2 = res.responseData.results[0].unescapedUrl;



		if (url2 == null) {

		imdb_showtimes_span.innerHTML = "<a href=\"http://www.imdb.com/search\"> IMDB entry not found </a>";


		}

		if (url2 != null) {

		imdb_showtimes_span.innerHTML = "<a href= '" + url2 + 'cinemashowtimes'+ "'> '" + titleWITHspaces + "' <b> Show Times: </b> </a>";

		}



	}
});

//////////////////////////////




//////////////////////////////
// the three functions below have been borrowed from Julien Couvreur's 
// Inline IMDB Ratings: http://userscripts.org/scripts/review/11360
//////////////////////////////

function findImdbID(url) {
	var m = url.match(/^http:\/\/(.*\.)?imdb.com\/title\/(tt\d*)/i);
	if (m) return m[2];
	return null;
}
///////////

function getMovieInfo(imdbUrl, index, callback) {
	var url = imdbUrl;
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(details) {
			callback(extractMovieInfo(details.responseText, index));
		}
	});
}
///////////

function extractMovieInfo(content, index) {
	// <b>User Rating:</b> 
	// <b>2.1/10</b> 
	var match = content.match(/<b>(\d.\d)\/10<\/b>/);

  var match2 = content.match(/([\d,]+ votes)/);
  return { rating: match[1], index: index, votecount: ""+match2[1] };

	//return { rating: match[1], index: index };
}

//////////////////////////////
//IMDB CODE ENDS HERE//
//////////////////////////////




//////////////////////////////
//FANDANGO CODE STARTS HERE//
//////////////////////////////



	var div = document.createElement("div");
	var addedDiv_FANDANGO = document.createElement("addedDiv_FANDANGO");


	addedDiv_FANDANGO.innerHTML = '<P> <img src="http://www.fandango.com/favicon.ico"> <span class="content" id="fandango_showtimes"> <b>Fandango Show Times: </b> checking... </span> </p>';


	div.appendChild(addedDiv_FANDANGO);



	document.getElementById('synopsis').appendChild(div);



	var fandango_showtimes_span = document.getElementById('fandango_showtimes');




	var title = titlename 



	titleWITHspaces = titlename.replace(/_/g, ' ');


	var FANDANGOURL = "http://www.fandango.com/GlobalSearch.aspx?tab=Movies+Video&repos=Movies&q=" + title ;



	fandango_showtimes_span.innerHTML = "<b> <a href= '" + FANDANGOURL + "'> '" + titleWITHspaces + "'  Show Times: </b> </a>";








//////////////////////////////
//FANDANGO CODE ENDS HERE//
//////////////////////////////





















