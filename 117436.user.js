// ==UserScript==
// @name          Torrentz IMDB
// @description   Adds linkage to imdb.com on torrentz.eu for movies
// @include       *torrentz.eu/*
// ==/UserScript==



var siteString = window.location.toString();
if(siteString.indexOf('torrentz.eu') > 0)
{
	var results = document.getElementsByClassName("results")[0];
	var a_dt = results.getElementsByTagName('dt');
	for(i=0; i<a_dt.length; i++)
	{
		var a = document.createElement('a');
		
		var patt = /\d{4}/gi;
		
		if(a_dt[i].innerHTML.indexOf("movies") > 0){
			
			var replaceThis = ["<","dvdrip", "hdrip", "ac3", "h.264", "720p", "1080p", "1080i", "brrip", "xvid", "x264", "hq", "bdrip", "480p", "r5", "readnfo", "ts", "cam", "dvd rip", "rerip", "br2dvd"];
			
			var temp = a_dt[i].firstChild.innerHTML.toLowerCase();
			for(var k = 0; k < replaceThis.length; k++)
			{
				var idx = temp.indexOf(replaceThis[k]);
				if(idx > 0){
					temp = temp.substring(0, idx);
				}
			}
			temp = temp.replace(/\[/, ' (');
			temp = temp.replace(/\]/, ')');
			temp = temp.replace(/\./g, ' ');
			
			var years = temp.match(patt);
			
			var year = ""; 
			if(years != null){
				if(years[0] != null){
					year = years[0];
					temp = temp.replace(year, "");
				}
			}
			
			a.href = 'http://imdb.com/find?s=all&q='+unescape(temp);
			
			var img = document.createElement('img');
			img.src = 'http://skypher.com/Cipher/Greasemonkey/imdb.png';
			img.style.border = 'none';
			img.style.padding = '0 0 0 2px';
			a.id = "m"+i;
			a.target = '_blank';
			a.title = 'Lookup "'+temp+'" on imdb.com';
			a.appendChild(img);
			a_dt[i].appendChild(a);
			
			getRating(i, temp, year, function(index, data){
				if(data.ID){
					var link = document.getElementById("m" + index);
					link.href = 'http://imdb.com/title/'+data.ID+"/";
					link.title = 'Found '+data.Title+' from '+data.Year+'  on imdb.com';
					var span = document.createElement("span");
					span.innerHTML = data.Rating;
					span.style.padding = "0 0 0 5px";
					link.appendChild(span);
				}
			});
		}
	}
}



function getRating(index, movie, year, callback){
	var url = "http://www.imdbapi.com/?t=" + escape(movie); 
	if(year)
	{
		url +=  "&y=" + escape(year);
	}

	GM_xmlhttpRequest({
	  method:"GET",
	  url: url,
	  headers:{
		"User-Agent":"monkeyagent",
		"Accept":"text/monkey,text/xml",
		},
	  onload:function(details) {
		var imdbJSON = eval("(" + details.responseText + ")");
		callback(index, imdbJSON);
	  }
	});
}
