// ==UserScript==

// @name MusicBrainz - Import Last.FM Similar Artists 

// @namespace Cooper

// @description hmns

// @include http://*musicbrainz.org/*artist*

// ==/UserScript==



GM_xmlhttpRequest({

  method:"GET",

  url:'http://ws.audioscrobbler.com/1.0/artist/' + document.title.substr(8, (document.title.lastIndexOf('-')) - 9) +'/similar.xml',

  headers:{

    "User-Agent":"monkeyagent",

    "Accept":"text/monkey,text/xml",

    },

  onload:function(details) {

	var xmlDoc=new DOMParser().parseFromString(details.responseText,"text/xml");

	var names = xmlDoc.documentElement.getElementsByTagName("name");

	//var urls = xmlDoc.documentElement.getElementsByTagName("url");

	var mbids = xmlDoc.documentElement.getElementsByTagName("mbid");

	var divs = document.getElementsByTagName("div")



	for (var j =0; j < divs.length; j++) {

		if (divs[j].className == "RelationshipBox") {

			divs[j].innerHTML += "<br /><h3>Imported Last.FM Similar Artists:</h3>";

			for (var i = 0; i < 20; i++) {

				if (mbids[i].childNodes[0]) {

					divs[j].innerHTML += '<nobr><a href="http://musicbrainz.org/artist/' + mbids[i].childNodes[0].nodeValue + '.html">' + names[i].childNodes[0].nodeValue + '</nobr></a>, ';

				}
			}

		}

	}

  }

});

