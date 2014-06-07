// ==UserScript==
// @name           What.cd album artists grabber
// @author         rattvis
// @namespace      http://what.cd/
// @include        https://ssl.what.cd/torrents.php?id=*
// @include        http://what.cd/torrents.php?id=*
// @version        0.1
// @date           2009-08-05
// ==/UserScript==

//Some code from the WhatWaffleBrainz script has been used as an example for this script

addFindButton();

var artistAddInputs	= 	document.getElementsByClassName("sidebar")[0]
								.getElementsByClassName("box")[2]
								.getElementsByTagName("div")[1]
								.getElementsByTagName("input");
artistAddInputs[artistAddInputs.length-1].addEventListener('click', test, false);

function test() {
	var artistid = 83; //Various artists ID
	var deleteLink = "torrents.php?action=delete_alias&groupid=233960&artistid=83&auth=19a7ea98507d6364c1618f9fc98ea62a";
	
	
	var artists	= 	document.getElementsByClassName("sidebar")[0]
							.getElementsByClassName("box")[1]
							.getElementsByTagName("ul")[0];
	var inner	=	artists.innerHTML;
	var innerSplitgroupid = inner.split("&amp;groupid=");
	innerSplitgroupid = innerSplitgroupid[1].split("&amp;");
	
	var groupid = innerSplitgroupid[0];

	var innerSplitauth = inner.split("&amp;auth=");
	innerSplitauth = innerSplitauth[1].split("\"");

	var auth = innerSplitauth[0];
	
	var urlSplit = document.location.href.split("/");
		
	xhr(urlSplit[0] + "//" + urlSplit[2] + "/torrents.php?action=delete_alias&groupid=" + groupid + "&artistid=" + artistid + "&auth=" + auth + "", function(data) {
		
    });
}


function addFindButton() {	
	var findButton 			= 	document.createElement("a");
	findButton.innerHTML	=	"Find album";
	findButton.style.cursor	=	"pointer";
	//findButton.type			=	"Button";
	findButton.id			=	"findButton";
	findButton.addEventListener('click', findAlbum, false);
	
	var findButtonBR		=	document.createElement("br");

	var artistStrong 		= 	document.getElementsByClassName("sidebar")[0]
										.getElementsByClassName("box")[2]
										.getElementsByTagName("div")[1]
										.getElementsByTagName("form")[0];

	artistStrong.appendChild(findButtonBR);
	artistStrong.appendChild(findButton);
}

function findAlbum() {
	var albumInfo			=	document.getElementById("content")
										.getElementsByClassName("thin")[0]
										.getElementsByTagName("h2")[0]
										.innerHTML;
	
	var albumInfoSplit = albumInfo.split("</a> -");
	if(albumInfoSplit.length > 1) {
		albumInfo = albumInfoSplit[1];
	}
	else{
		albumInfoSplit = albumInfo.split("Various Artists -");
		if(albumInfoSplit.length > 1) {
			albumInfo = albumInfoSplit[1];
		}
		else{
			albumInfo = albumInfo;
		}	
	}

	albumInfoSplit = albumInfo.split("[19");
	if(albumInfoSplit.length > 1) {
		albumInfo = albumInfoSplit[0];
	}
	else{
		albumInfoSplit = albumInfo.split("[20");
		if(albumInfoSplit.length > 1) {
			albumInfo = albumInfoSplit[0];
		}
		else{
			albumInfoSplit = albumInfo.split("[18");
			albumInfo = albumInfoSplit[0];
		}	
	}
	
	albumInfo = albumInfo.replace("&amp;", "&");
	
	xhr("http://musicbrainz.org/ws/1/release/?type=xml&title=" + escape(albumInfo), function(data) {
		processAlbumlist(data);
    });
}

function processAlbumlist(data) {
    var albums = new Array();
    var expression = /\<release(.*?)\<\/release\>/g;
    var release;
    while(release = expression.exec(data)) {
        var title = release[1].match(/\<title\>(.*?)\<\/title\>/)[1];
        var tracks = release[1].match(/\<track-list count="(.*?)"\/\>/)[1];
        var id = release[1].match(/id="(.*?)"/)[1];
            
        albums.push({title: title, tracks: tracks, id: id});
    }
	
	showAlbumList(albums);
}

function showAlbumList(albums) {
	document.getElementById("findButton").style.display = "none";

    var albumSelect		= 	document.createElement('select');
	albumSelect.id		=	"albumSelect";
	var selectButton	= 	document.createElement('input');
	selectButton.value	=	"Fetch";
	selectButton.type	=	"Button";
	selectButton.addEventListener('click', insertAlbumArtists, false);
	
    var string = new Array();

    for(i in albums){
        string.push('<option value="' + albums[i].id + '">' + albums[i].title + " (" + albums[i].tracks + "tracks)" + '</option>');
    }
    
	albumSelect.innerHTML = string.join('');

	var artistdiv	= 	document.getElementsByClassName("sidebar")[0]
										.getElementsByClassName("box")[2]
										.getElementsByTagName("div")[1]
										.getElementsByTagName("form")[0];
	/*
	var artistdiv	= 	document.getElementsByClassName("sidebar")[0]
								.getElementsByClassName("box")[2]
								.getElementsByTagName("div")[0];
	*/
	
	artistdiv.insertBefore(albumSelect, artistdiv.nextsibling);
	artistdiv.insertBefore(selectButton, artistdiv.nextsibling);
}

function insertAlbumArtists() {
	albimID = document.getElementById("albumSelect").options[document.getElementById("albumSelect").selectedIndex].value;

	xhr("http://musicbrainz.org/ws/1/release/"+ albimID + "/?type=xml&inc=tracks", function(data) {
		processAlbumArtists(data);
    });
}

function processAlbumArtists(data) {
	var artistInputs	= 	document.getElementsByClassName("sidebar")[0]
									.getElementsByClassName("box")[2]
									.getElementsByTagName("div")[1]
									.getElementsByTagName("input");
	
	if(artistInputs.length > 5) {
		for(var i=2; i < artistInputs.length-2; i++){
			artistInputs[i].value	=	"";
		}
	}


    var artists = new Array();
    var expression = /\<track id(.*?)\<\/track\>/g;
    var release;
	var i = 0;
    while(release = expression.exec(data)) {
		try {
			var artistName = release[1].match(/\<name\>(.*?)\<\/name\>/)[1];
			if(artistName=="[unknown]")
				continue;
			
			artistInputs	= 	document.getElementsByClassName("sidebar")[0]
										.getElementsByClassName("box")[2]
										.getElementsByTagName("div")[1]
										.getElementsByTagName("input");

			artistInputs[i+2].value	=	artistName.replace("&amp;", "&");
			i++;

			//alert((i+3) + " - " + artistInputs.length);
			
			if(artistInputs.length <= (i+4)) {
				unsafeWindow.AddArtistField();
			}
		}
		catch(err){}
    }
}

function xhr(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(result){
            // Check if we found anything
            if(result.status != 200)
                throwError();
            else
                callback(result.responseText);
        }//,
        //onerror: throwError
    });
}