// ==UserScript==
// @name Last.fm - Opera: Displays personal count on Artist's Similiar Artists page - Oct 2012
// @namespace
// @description Displays artist track count on Similar Artists page
// @include http://www.last.fm/music/*/+similar
// ==/UserScript==
(function() {
    username = getLastfmUsername();
    if (username == "") { return; }//not logged in
    gatherArtistData();
})();


function getLastfmUsername() {
	var usernameLink = document.evaluate('//a[@id="idBadgerUser"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (usernameLink.snapshotLength > 0) {
		var userNameLoc = usernameLink.snapshotItem(0).innerHTML;
		userNameLoc = userNameLoc.replace(/<[^<>]*>/g,'');
		return(userNameLoc);
	} else {
		return('');
	}
}

function gatherArtistData() {
	thisArtistTrackCount = new Object();
	//artistLinks = document.evaluate('//ul[@class=\"artistsWithInfo\"]/li/a[@class=\"artist\"]/@href', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    //statsCell = document.evaluate('//ul[@class=\"artistsWithInfo\"]/li/p[@class=\"stats\"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	
	artistLinks = document.evaluate('//ul[@class=\"r artist-list similar-artists\"]/li/a/@href', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);			
	statsCell = document.evaluate('//ul[@class=\"r artist-list similar-artists\"]/li/div/p[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	
   
	var i = 0, limit = artistLinks.snapshotLength, busy = false; 
	var processor = setInterval(function(){//setInterval is used to avoid irresponsive page while the script is running
       if(!busy){
            busy = true; 
            var cur = statsCell.snapshotItem(i);
            var url = artistLinks.snapshotItem(i).text;                                      
            updateTrackData(cur, url);
            if(++i == limit){
                clearInterval(processor);
            }
     
            busy = false;
        }   
    }, 5);
}

function updateTrackData(track, url){
    var trackCount = getTrackCount(url);
	
    if(trackCount == 0){
        updateUserTrackCount(0, track, "orange");          //not scrobbled, but in library
    }     
    else if(trackCount > 0){
        updateUserTrackCount(trackCount, track, "green");          
    }
    else{
        updateUserTrackCount("n/a", track, "red");    
    }      
}

function updateUserTrackCount(trackCount, track, color){
    track.innerHTML = '<font color="' + color + '">(' + trackCount + ') </font>' +  track.innerHTML;
}

function getTrackCount(url){
try{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, false);
    xmlhttp.send(null);
    if (xmlhttp.readyState == 4) { 
       if(xmlhttp.status == 200) {
            var regEx = /class="user-scrobbles">/;
            xmlText = xmlhttp.responseText;
            if(xmlText.match(regEx)){
                xmlText = xmlText.split(regEx)[1];
                xmlText = xmlText.split(/<\/b>/)[0];

                var count;
                if(xmlText){
                    count = xmlText.split('<b>')[1];
                    return count;                                          
                }
            }
       }
    }
    return -1;
}
catch(e){
   // alert(e);
}
}

