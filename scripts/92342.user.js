// ==UserScript==
// @name          Grooveshark Youtube Search
// ==/UserScript==

window.onload = function(){ 
    window.addEventListener('keyup', function(e){
				var Code = e.keyCode;

				if(Code == 81) {
				    var row    = document.getElementById("playerDetails_nowPlaying");
				    if (row.children.length === 0)
					return false;
				    var song   = row.children[1].text;
				    var artist = row.children[2].text;
				    var album  = row.children[3].text;
				    if (confirm("Search for videclips for '"+ song + "', from " + artist + "?")) {
					window.open("http://www.youtube.com/results?search_query="+ song 
						    +"+" + artist + "&aq=f");
					return true;
				    }
				}
				return false;
			    },false);
};