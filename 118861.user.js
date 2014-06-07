// ==UserScript==
// @name           lastfm-top-listener
// @namespace      http://userscripts.org/users/398905
// @include        http://www.lastfm.*/user/*
// @include        http://www.last.fm/user/*
// @exclude        http://www.lastfm.*/user/*/*
// @exclude        http://www.last.fm/user/*/*
// ==/UserScript==

//
//=====================================================================
//=====================================================================
//                  LICENCE & CONDITIONS OF USE	
//=====================================================================
//=====================================================================
//
//
//
//  This script and the code in it is may be used freely, except
//  for these restrictions:
//
//  1. The script shall not be modified in any way that causes its use
//     to breach the Last.FM API Terms of Service
//     (see http://www.last.fm/api/tos)
//
//	2. The script shall not be used to facilitate, aid or abet
//     competitive scrobbling or similar dishonest practices.
//
//
//
//=====================================================================
//=====================================================================
//


function getUserData() {
	
	if ( iArtist > nArtists ) {
		// no data on previous run
		// re-enable button for further requests
		button.removeAttribute("disabled");
		return;
	}
	
	var urlRQ=baseURL+"?method=user.getinfo&user="+userName+"&api_key="+apiKey;
	var rq = new XMLHttpRequest();
	rq.open('GET', urlRQ, true);
	rq.onreadystatechange = function (aEvt) {
		if (rq.readyState == 4) {
			if(rq.status == 200) {
				// good response to request
				
				//console.log('Response I');
				//clearTimeout(rTimerA);
				var string, cell="";
				var parser=new DOMParser();
				
				//console.log("Got user data");
				xmlDoc=parser.parseFromString(rq.responseText,"text/xml");
				string=xmlDoc.getElementsByTagName("name");
				if ( string[0].childNodes[0] ) cell=htmlEncode(string[0].childNodes[0].nodeValue);
				unameCell.innerHTML = cell;
				
				string=xmlDoc.getElementsByTagName("realname");
				if ( string[0].childNodes[0] ) cell="<i>"+htmlEncode(string[0].childNodes[0].nodeValue)+"</i>";
				cell=cell+"<br>";
				string=xmlDoc.getElementsByTagName("country");
				if ( string[0].childNodes[0] ) cell=cell+htmlEncode(string[0].childNodes[0].nodeValue.toLowerCase());
				cell=cell+"<br>";
				string=xmlDoc.getElementsByTagName("age");
				if ( string[0].childNodes[0] ) cell=cell+htmlEncode(string[0].childNodes[0].nodeValue);
				cell=cell+"<br>";
				string=xmlDoc.getElementsByTagName("gender");
				if ( string[0].childNodes[0] ) cell=cell+htmlEncode(string[0].childNodes[0].nodeValue);
				
				//console.log("Set user text: "+cell);
				messCell.innerHTML=cell;
				
				
				string=xmlDoc.getElementsByTagName("image");
				if ( (string.length > 2) && string[2].childNodes[0] ) {
					cell="<img src=\""+string[2].childNodes[0].nodeValue+"\" \>";
					avaCell.innerHTML=cell;
				}
			} else { 
				console.log("Error "+request.status+" text:'"+request.statusText+"'");
			}
			// re-enable button for further requests
			button.removeAttribute("disabled");
		}
	};
	
	// send the request
	rq.send(null);
}



function topArtistRow(place) {
	// fill in current row with aName & place
	if ( place > 1 )
		tlRow.innerHTML="<td align=\"right\">"+htmlEncode(aName)+"</td><td style=\"vertical-align:middle\">&#8195;"+place+"</td>";
	else
		tlRow.innerHTML="<td align=\"right\"><b>"+htmlEncode(aName)+"</b></td><td style=\"vertical-align:middle\">&#8195;<b>1</b></td>";
}


function htmlEncode(a) {
	return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
}


function failedGetA() {
	// arrive here after timeout on artist data get
	console.log("Get top fans timeout/error.");
	iArtist++;
	processArtists(0);
	if ( iArtist < nArtists ) getNextArtist();
}


function failedGetU() {
	// arrive here after timeout on user data get
	console.log("Get user chart timeout/error.");
	tlRow.innerHTML="<td align=\"right\">"+htmlEncode(langStr[4][lang])+"</td><td>&nbsp;</td>";
}


function hitSort(a,b) {
	// comparison of hit counters
	return b[1] - a[1];
}


function saveCookies() {
	var i, j, d, cookie, dataSize=0;
	var expDate=new Date();
	expDate.setDate(expDate.getDate() + 366);
	
	// artist & user cookies use the same format:
	// "name hits expiry data data ... data?name hits expiry data data ... data?...?name hits expiry data data ... data"
	// data in artist cookie is users; data in user cookie is artists
	// users names are stored in lower case
	// artist names are stored URI component encoded
	
	//console.log("Saving",nCacheA,"artists to cookie");
	
	// sort artist cache by hits descending
	aCache.sort(hitSort);
	// generate artists cookie
	cookie = "";
	for ( i=0 ; i<nCacheA ; i++ ) {
		//if ( i<50 ) console.log(aCache[i][1],aCache[i][0]);
		if ( aCache[i][2] || (i<softLimitA) ) {
			// smart? save : don't save expired entries beyond softLimitA
			cookie = cookie+encodeURIComponent(aCache[i][0])+" "+aCache[i][1]+" "+aCache[i][2];
			for (j=3 ; j<aCache[i].length ; j++ )
				cookie = cookie+" "+aCache[i][j];
			if ( i < (nCacheA - 1) ) cookie = cookie+"?";
		}
	}
	//console.log(cookie);
	localStorage.setItem("tlArtists",cookie);
	dataSize=dataSize+cookie.length;
	
	
	// sort user cache by hits descending
	uCache.sort(hitSort);
	// generate users cookie
	cookie = "";
	for ( i=0 ; i<nCacheU ; i++ ) {
		//console.log(uCache[i][1],uCache[i][0],uCache[i].length);
		if ( uCache[i][2] || (i<softLimitU) ) {
			// smart? save : don't save expired entries beyond softLimitU
			cookie = cookie+uCache[i][0]+" "+uCache[i][1]+" "+uCache[i][2];
			for (j=3 ; (j<uCache[i].length) ; j++ ) {
				cookie = cookie+" "+encodeURIComponent(uCache[i][j]);
			}
			if ( i < (nCacheU - 1) ) cookie = cookie+"?";
			//console.log("Saving user: "+uCache[i][0]+" "+uCache[i][2]+" "+uCache[i].length);
		}
	}
	//console.log(cookie);
	localStorage.setItem("tlUsers",cookie);
	dataSize=dataSize+cookie.length;
	
	// save run version
	localStorage.setItem("tlVersion",tlVersion.toString());
	dataSize=dataSize+tlVersion.toString().length;
	
	console.log("Cached data stored: "+dataSize+" chars");
}



function readCookies() {
	var i, j, cookie, dataSize=0, diagStr;
	
	diagStr="Running on:"+whereAreWe+" Current version:"+tlVersion;
	
	// load the version cookie & clear cache if necessary
	cookie = "";
	cookie = localStorage.getItem("tlVersion");
	if ( cookie ) {
		diagStr=diagStr+" Last run version:"+cookie;
		dataSize=dataSize+cookie.length;
		if ( (tlVersion > cookie) && autoClear ) {
			// clear the caches:
			localStorage.removeItem("tlArtists");
			localStorage.removeItem("tlUsers");
			console.log("Auto-cleared caches");
		}
	}
	
	// get the artists cookie
	cookie = "";
	nCacheA=0;
	iCacheA=0;
	cookie = localStorage.getItem("tlArtists");
	if ( cookie ) {
		//console.log(cookie);
		dataSize=dataSize+cookie.length;
		var expA="",expT=0;
		var perItem=cookie.split("?");
		//console.log(perItem[0]);
		//console.log(perItem[1]);
		for ( i=0 ; i<perItem.length ; i++ ) {
			//console.log(perItem[i]);
			aCache[nCacheA] = perItem[i].split(" ");
			aCache[nCacheA][0] = decodeURIComponent( aCache[nCacheA][0] );
			//console.log("Read: ",nCacheA, aCache[nCacheA][1], aCache[nCacheA][0]);
			if ( tlNow.valueOf() > aCache[nCacheA][2] ) {
				// cache entry is out of date: clear time item & remove all after
				//console.log("Expired: artist '"+aCache[nCacheA][0]+"'");
				aCache[nCacheA][2] = 0;
				while ( aCache[nCacheA].length > 3 ) aCache[nCacheA].pop();
			} else {
				// check expiry
				while ( aCache[nCacheA].length > (3+nArtists) ) aCache[nCacheA].pop();
				var toGo = aCache[nCacheA][2] - tlNow.valueOf();
				if ( (expT==0) || (toGo<expT) ) {
					expT=toGo;
					expA=aCache[nCacheA][0];
				}
			}

			nCacheA++;
		}
		//console.log("Expires next: artist '"+expA+"' in "+(expT/3600000)+"hours");
	}
	diagStr=diagStr+" #Artists:"+nCacheA;
	
	// now the users cookie
	cookie = "";
	nCacheU=0;
	iCacheU=0;
	cookie = localStorage.getItem("tlUsers");
	if ( cookie ) {
		//console.log(cookie);
		dataSize=dataSize+cookie.length;
	
		var perItem=cookie.split("?");
		for ( i=0 ; i<perItem.length ; i++ ) {
			//console.log(perItem[i]);
			uCache[nCacheU] = perItem[i].split(" ");
			//console.log("Read: user '"+uCache[nCacheU][0]+"' hits:"+uCache[nCacheU][1]);
			for ( j=3; j<uCache[nCacheU].length; j++ )
				uCache[nCacheU][j] = decodeURIComponent( uCache[nCacheU][j] );
			if ( tlNow.valueOf() > uCache[nCacheU][2] ) {
				// cahe entry is out of date: clear time item & remove all after
				//console.log("Expired: user '"+uCache[nCacheU][0]+"'");
				uCache[nCacheU][2] = 0;
				while ( uCache[nCacheU].length > 3 ) uCache[nCacheU].pop();
			} else
					while ( uCache[nCacheU].length > (3+maxPlace) ) uCache[nCacheU].pop();

			//console.log("Read user: "+uCache[nCacheU][0]+" "+uCache[nCacheU][2]+" "+uCache[nCacheU].length);
			nCacheU++;
		}
	}
	diagStr=diagStr+" #Users:"+nCacheU+" Datasize:"+dataSize+" chars";

	console.log(diagStr);
	
}






function artistIndex(itsName) {
	// returns the index of artist itsname in the cache, or -1 if not found
	var i,f=-1;
	
	for ( i=0 ; i < nCacheA ; i++ ) {
		if ( aCache[i][0] == itsName ) {
			f = i;
			break;
		}
	}
	return f;
}





function processArtists(newRow) {
	// process artists from the cache until one that needs new data downloaded
	
	//console.log("Enter proc artists "+iArtist+"/"+nArtists);
	
	while ( iArtist < nArtists ) {
		// there are more artists to check
		// if this row used, create a new one
		if ( newRow ) {
			tlRow = document.createElement("tr");
			//tlRow.setAttribute("style","vertical-align:middle");
		}
		
		aName = uCache[iCacheU][3+iArtist];
		//console.log("Checking artist: "+aName+" #"+iArtist);
		
		
		tlRow.innerHTML="<td align=\"right\">"+htmlEncode(aName)+"</td><td style=\"vertical-align:middle\"><img src=\""+busyGif+"\" width=\"12\" /></td>";
		if ( newRow ) tlTable.appendChild(tlRow);
		
		var indA = artistIndex(aName);
		//console.log("indA:"+indA);
		if ( indA < 0 ) {
			// this artist is new to us, add to cache
			//console.log("Artist new to cache '"+aName+"'");
			aCache[nCacheA] = [ aName, "1", "0" ];
			iCacheA = nCacheA;		// tell get where to put the listener data
			return;		// should pass on to get
		} else if ( aCache[indA][2] == 0 ) {
			// artist is known but previous data has expired
			//console.log("Artist data expired '"+aName+"'");
			iCacheA = indA;		// tell get where to put the listener data
			return;		// should pass on to get
		} else {
			// this artist is known
			//console.log("Artist '"+aName+"' is in cache, #listeners:"+(aCache[indA].length-3));
			aCache[indA][1]++;		//hits++
			newRow = 0;
			for(i=3; i<aCache[indA].length; i++){
				if ( userName == aCache[indA][i] ){
					//console.log(aName+" "+i);
					topArtistRow(i-2);
					isAtop=1;
					newRow=1;
					break;
				}
			}
			//console.log("Artist data from cache");
		}
		iArtist++;
	}
	
	
	// all artists are now processed, so make any changes needed to final table row
	if ( iArtist > nArtists ) {
		// if there were no data for this user
		tlRow.innerHTML="<td align=\"right\">"+htmlEncode(langStr[4][lang])+"</td><td>&nbsp;</td>";
	} else if ( isAtop == 0 ) {
		// user isn't near the top for any artist
		tlRow.innerHTML="<td align=\"right\">"+htmlEncode(langStr[1][lang])+"</td><td>&nbsp;</td>";
	} else if ( newRow == 0 ) {
		// wasn't near the top for last artist, this row should be removed
		// ...for some weird reason, removing the row sometimes doesn't change the display
		// so blank the row first, just in case
		tlRow.innerHTML="<td align=\"right\">&nbsp;</td><td>&nbsp;</td>";
		tlTable.removeChild(tlRow);
		//console.log("Done.",tlTable.innerHTML);
	}
	
	saveCookies();
	
	if ( whereAreWe == "local" ) {
		getUserData();
	}
	
}




function getNextArtist() {
	// get data for artist aName by download, store at position iCacheA in artist cache
	var rTimerA;
	
	//console.log("Enter getNextArtist");
	
	urlRQ=baseURL + "?method=artist.gettopfans&artist=" + encodeURIComponent(aName) + "&api_key=" + apiKey;
	//console.log(urlRQ);
	var rq = new XMLHttpRequest();
	rq.open('GET', urlRQ, true);
	rq.onreadystatechange = function (aEvt) {
		if (rq.readyState == 4) {
			if(rq.status == 200) {
				// good response to request
				
				//console.log('Response A');
				//clearTimeout(rTimerA);
				var parser=new DOMParser();
				xmlDoc=parser.parseFromString(rq.responseText,"text/xml");
				users=xmlDoc.getElementsByTagName("name");
				var n=users.length;
				if ( n > maxPlace ) n=maxPlace;
				var flag=0;
				aCache[iCacheA][2] = newExp.valueOf();
				//console.log("Got artist '"+aName+"' n="+n);
				for(i=0; i<n; i++){
					uName=users[i].childNodes[0].nodeValue;
					uName=uName.toLowerCase();
					//console.log(uName,iCacheA,i);
					aCache[iCacheA][3+i] = uName;
					if ( userName == uName ){
						//console.log(aName,i);
						topArtistRow(i+1);
						isAtop=1;
						flag=1;
					}
				}
				// increment nCacheA if we recorded at end
				if ( iCacheA==nCacheA ) nCacheA++;
				
				
				iArtist++;
				processArtists(flag);
				if ( iArtist < nArtists ) setTimeout(getNextArtist,delay);
			} else { 
				console.log("Error "+request.status+" text:'"+request.statusText+"'");
				failedGetA();
			}
		  }
	};
	
	// send the request
	rq.send(null);
}






function getUserChart() {
	
	nArtists = maxArtists;
	
	if ( whereAreWe == "web" ) {
		//console.log("Button was clicked");
		//	remove or disable button
		tlDiv.removeChild(button);
	}
		
	// get times: after button push, before reading cache
	// get the date now
	tlNow.getDate();
	// get the expiry date for new cache entries
	newExp.setDate(newExp.getDate() + daysInCache);
	
	tlRow = document.createElement("tr");
	tlRow.innerHTML="<td align=\"right\">"+htmlEncode(langStr[2][lang])+"</td><td style=\"vertical-align:middle\"><img src=\""+busyGif+"\" width=\"12\" /></td>";
	tlTable.appendChild(tlRow);

	readCookies();			// read the cached data
	
	iCacheU = nCacheU;		// default to putting new data at end of array
	
	// first check if user is in user cache
	var i;
	for ( i=0; i<nCacheU; i++ ){
		if ( uCache[i][0] == userName ) {
			// found user in the cache
			//console.log("Found user '"+userName+"' in cache #"+i+" with #"+(uCache[i].length-3)+" artists");
			uCache[i][1]++;		// update hit counter
			iCacheU = i;		// index of user in cache
			if ( uCache[i][2] == 0 ) {
				// cache entry has expired
				break;
			}
			if ( (uCache[i].length-3) < nArtists ) nArtists = uCache[i].length - 3;
			processArtists(0);
			if ( iArtist < nArtists ) setTimeout(getNextArtist,delay);
			return;
		}
	}
	// we didn't find the user, so get data
	
	
	//console.log(iCacheU==nCacheU ? "User '"+userName+"' is not in cache":"User '"+userName+"' cache entry expired");


	
	var urlRQ=baseURL+"?method=user.gettopartists&limit="+nArtists+"&period="+chartPeriod+"&user="+userName+"&api_key="+apiKey;
	//console.log(urlRQ);




	var request = new XMLHttpRequest();
	request.open('GET', urlRQ, true);
	request.onreadystatechange = function (aEvt) {  
		if (request.readyState == 4) {
			if(request.status == 200) {
				//console.log("Response U");
				//clearTimeout(rTimerU);
				parser=new DOMParser();
				xmlDoc=parser.parseFromString(request.responseText,"text/xml");
				artists=xmlDoc.getElementsByTagName("name");
				//console.log("User data returned, #artists: "+artists.length+", cache pos:#"+iCacheU);
				
				if ( artists.length>0 ) {
					// want to use this data
					if ( iCacheU==nCacheU ) {
						// new cache entry
						var userData = userName+" 1 0";
						uCache[iCacheU] = userData.split(" ");
					}
					uCache[iCacheU][2] = newExp.valueOf();
					for ( i=0; i<artists.length; i++ ) {
						uCache[iCacheU][3+i] = artists[i].childNodes[0].nodeValue;
					}
				
					// if added to end, increment user cache tally
					if ( iCacheU == nCacheU ) nCacheU++;
				
				
					if ( artists.length < nArtists ) nArtists=artists.length;
				} else {
					// not using this, so skip to end
					console.log("No data for this user");
					iArtist=nArtists+1;
				}
				
				
				processArtists(0);
				if ( iArtist < nArtists ) getNextArtist();

			} else {
				console.log("Error "+request.status+" text:'"+request.statusText+"'");
				failedGetU();
			}
		  }
	};

	request.send(null);
}



function tlActivated() {

	if ( !window.localStorage ) {
		// localStorage is not available
		button.setAttribute("disabled",true);
		alert("Can't run without localStorage!");
		return;
	}
	
	
	if ( whereAreWe == "web" ) {
		getUserChart();
	} else {
		//console.log("Local activation");
		if ( (text.value.length==0) || (text.value.length>15) || text.value.match(/[^A-Za-z0-9-_]/) ) {
			console.log("Invalid input");
			messCell.innerHTML="Invalid username...";
			return
		} else {
			userName=text.value.toLowerCase();
			//console.log("User="+userName);
			messCell.innerHTML="&nbsp;";
			avaCell.innerHTML="&nbsp;";
			unameCell.innerHTML="&nbsp;";
			button.setAttribute("disabled",true);
			// remove any rows from table
			var aRow=tlTable.lastChild;
			while ( aRow.tagName == "TR" ) {
				tlTable.removeChild(aRow);
				aRow=tlTable.lastChild;
			}
			iArtist=0;
			isATop=0;
			getUserChart();
		}
	}
}



var tlVersion=2;				// internal version number
var autoClear=0;				// =1 clears caches on first run after bumping version number

var maxPlace=25;				// number of places in top listener chart to check
var maxArtists=25;				// number of artists to check for current user
var softLimitA=1000;			// artists to be kept in cache, even after expiry
var softLimitU=100;				// users to be kept in cache, even after expiry
var delay=300;					// milliseconds before sending data request
var responseTimeout=20000;		// milliseconds before declaring request failure - not implemented
var chartPeriod = "3month"; 	//"7day","3month","6month","12month","overall"
var daysInCache = 8;			// how long cached data remains valid

var whereAreWe;					// determine whether running on lastfm or local page
if (window.location.protocol=="file:")
	whereAreWe="local";
else
	whereAreWe="web";
//console.log("Running on: "+whereAreWe);



var langStr = 	[	// en,ru
					[ "Top Listener","Топ-слушатель" ],
					[ "[ not a top-listener ]","[ не топ-слушатель ]" ],
					[ "[ loading ]","[ загружает ]" ],
					[ "Load","Загрузить" ],
					[ "[ no data ]","[ нет данных ]" ],
				];	//
var lang = ( window.location.host.match(/lastfm.ru$/) ? 1 : 0 );


var iArtist=0;		// index of current artist in user chart
var aName;			// name of current artist
var isAtop=0;		// true if a top-listener to any



var aCache = new Array();
var nCacheA=0;		// number of artists in artist cache
var iCacheA=0;		// index of artist in artist cache where new data will be added

var uCache = new Array();
var nCacheU=0;		// number of users in user cache
var iCacheU=0;		// index of user in user cache where new data will be added


//var rTimerA;		// response timeout for artist requests
//var rTimerU;		// response timeout for user request


var newExp=new Date();	// will store expiry time for new date
var tlNow=new Date();	// will store time after button press


var baseURL="http://ws.audioscrobbler.com/2.0/";
var apiKey="a6e82c00c84cda73944d2a49c25b8f16";
var busyGif="http://cdn.lst.fm/flatness/spinners/spinner_ffffff_870802.gif";

var userName;
if ( whereAreWe == "web" ) {
	userName=window.location.pathname.replace("/user/","");
	userName=userName.replace("/.*","");
	userName=userName.toLowerCase();

	// set up top listener area - top of right hand column, under ad if there is one
	var lastAd=document.getElementById("LastAd_mpu");
	var rtCol=lastAd.parentNode;

	//create new div for top-listener
	var tlDiv=document.createElement("div");
	tlDiv.setAttribute("id","toplistener");
	tlDiv.setAttribute("align","center");
	var myHTML="<left><h2 class=\"heading\" style=\"text-align:left\"><span class=\"h2Wrapper\">"+htmlEncode(langStr[0][lang])+"</span></h2></left>";
	myHTML=myHTML+"<input id=\"tlButton\" type=\"button\" value=\""+htmlEncode(langStr[3][lang])+"\" />";
	myHTML=myHTML+"<table id=\"tltable\" width=\"100%\"><colgroup><col width=\"65%\"><col width=\"35%\"></colgroup>";
	myHTML=myHTML+"</table>";
	//console.log(myHTML);
	tlDiv.innerHTML=myHTML;
	rtCol.insertBefore(tlDiv,lastAd.nextSibling);
}


var tlTable=document.getElementById("tltable");

function tlKeyed(event) {
	if ( event.keyCode == 13 ) tlActivated();
}


if ( whereAreWe == "local" ) {
	var avaCell = document.getElementById("tlAvatar");
	var text = document.getElementById("tlTxtField");
	text.value="";
	var messCell = document.getElementById("tlMessageCell");
	var unameCell = document.getElementById("tlUsername");
}


// set up the activate button
var button = document.getElementById("tlButton");
button.removeAttribute("disabled");
button.addEventListener("click", tlActivated, true);

