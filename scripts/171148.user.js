// ==UserScript==
// @name           passthepopcorn.me - Criticker Ratings Exporter (to PTP User Ratings)
// @namespace      applebananas
// @description    export ratings from Criticker to PTP
// @include        http://www.criticker.com/?fl*
// @include        http*://passthepopcorn.me/user.php?action=ratings*
// @date           2011-05-23
// @version        0.06
// ==/UserScript==

/*-------------------------------------------------------------------------------------\
CHANGELOG:
0.06 - fix for Firefox 4

0.05 - fixed bug causing script to not rate

0.04 - small bugfix in with multiplier

0.03 - made criticker vote history only show up on own profile ratings (not others)
		made search by IMDb for match errors for more accurate results
		changed to work on all the personal votes pages
		
0.02 - added "multiplier" option, so you can multiply all ratings by any number       

0.01 - Initial Release
\-------------------------------------------------------------------------------------*/


var site_base_url = 'http://passthepopcorn.me';
if (document.URL.match(/passthepopcorn/)) {
	var userID = GM_getValue('userID', '');
	if (userID =='') {
		userID = getUserID();
	}
	var userIDRegExp = new RegExp(userID, "gi");

	if (document.URL.match(userIDRegExp)) {
		var cx = document.getElementsByTagName('h2')[0];
		var critickerLink = document.createElement("a");
		critickerLink.href = 'http://www.criticker.com/?fl&view=prs&filter=ot';
		critickerLink.textContent = " My Criticker Vote History ";
		cx.parentNode.insertBefore(critickerLink, cx);
		//get the userID direct link once
		/*if (GM_getValue('critickerLink','') == '') {
			getDOC("http://www.criticker.com/?fl&view=prs", function(doc) {
				//var links = doc.getElementById('fi_view_contents').getElementsByTagName('a');
				var links = doc.getElementsByTagName('a');
				for (var x in links) {
					if (links[x].href.match(/rankings.html/)) {
						critickerLink.href = links[x].href;
						GM_setValue('critickerLink',links[x].href);
					}
				}
			});
		}
		else {
			critickerLink.href = GM_getValue('critickerLink','');
		}*/
	}
}

else {
	var yearsArray = [];
	var namesArray = [];
	var fullCritickerLinks = [];
	var ratingsArray = [];

	updateTheScript();
	addStartLink();
}

//add a link to start the script
function addStartLink() {
	var lol = document.getElementsByTagName('body');
	
	var reviewUpdateLink = document.createElement("a");
		reviewUpdateLink.href = "JavaScript:void(0);";
		reviewUpdateLink.textContent = "[Update Ratings on PTP.me] ";
	reviewUpdateLink.addEventListener("click", parseCriticker, false);
	lol[0].parentNode.insertBefore(reviewUpdateLink, lol[0]);
}

//create arrays of movie links and ratings
function parseCriticker() {
	var doc = document.getElementById('fl_filmlist_films');
	var links = doc.getElementsByTagName('a');
	var spans = doc.getElementsByTagName('span');
	var tempName;
	
	//get movie name + year
	for (var x=0; x<links.length; x++) {
		tempName = links[x].innerHTML;
		if (tempName.match(/<span/)) {
		}
		else if (links[x].href.match(/com\/film/)){
			namesArray.push(links[x].title);
			yearsArray.push(tempName.substring(tempName.length-5,tempName.length-1));
			fullCritickerLinks.push(links[x].href);
		}
	}
	
	//get scores
	for (var y=0; y<spans.length; y++) {
		ratingsArray.push(spans[y].innerHTML);
	}
		
	/*/purge end of array if user wants...
	var endNumber = GM_getValue('endAtNumber',0);
	if (endNumber != 0 && endNumber < ratingsArray.length) {
		ratingsArray = ratingsArray.slice(0,endNumber);
		linksArray = linksArray.slice(0,endNumber);
		linkNamesArray = linkNamesArray.slice(0,endNumber);
		fullCritickerLinks = fullCritickerLinks.slice(0,endNumber);
		
		//reset
		GM_setValue('endAtNumber',0);
	}*/
	
	//case for multiplier
	var mult = parseFloat(GM_getValue('multiplier',1));
	if (mult != 1 ) {
		for (var z=0;z<ratingsArray.length;z++) {
			ratingsArray[z] = parseInt(ratingsArray[z] * mult + 0.5);
			if (ratingsArray[z]>100 || ratingsArray[z]<0) {
				alert('Multiplier is either too big or too small.  Try again ('+ratingsArray[z]+' on '+namesArray[z]+')');
				return;
			}
		}
	}
	
	//handle case since PTP is 1-100 and criticker is 0-100
	for (var z=0;z<ratingsArray.length;z++) {
		if (ratingsArray[z] == 0) {
			ratingsArray[z] = 1;
		}
	}
	
	updateAll(GM_getValue('startAtNumber',0), '');
	//updateAll(0);

}

//find links
function updateAll(count, imdbAddy) {
	if (count == GM_getValue('startAtNumber',0) && imdbAddy == '') {
		var totalNum = namesArray.length - GM_getValue('startAtNumber',0);
		
		document.body.innerHTML = "<p>Now Starting!" + 
			"<br>....Don't navigate away from this page until it's done =P" +
			/*'<p>Note: you can start and/or end at any given number, by clicking '+
			'<br><i>Tools: Greasemonkey: User Script Commands: '+
			'<br>passthepopcorn.me - IMDb Ratings Exporter:...</i>' +*/
			'<p>Total # of Movies: ' + totalNum;
	}
	if (typeof(GM_xmlhttpRequest) === 'function') {
		if (imdbAddy  != '') {
			theURL = site_base_url + '/torrents.php?imdb=' + imdbAddy;
		}
		else {
			theURL = site_base_url + '/torrents.php?groupname=' + namesArray[count] + '&year=' + yearsArray[count];
		}
		GM_xmlhttpRequest({
			method: 'GET',
			url: theURL,
			headers: {
				'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey'
			},
			onload: function (response) {
				
				var PTPSearchResults = response.responseText;
				
				//get authkey
				if (count == GM_getValue('startAtNumber',0)) {
					if (PTPSearchResults.match('authkey=')) {
						GM_setValue("authkey", PTPSearchResults.split('authkey=')[1].split('"')[0]);
						GM_setValue('startAtNumber',0);
					}
					
					else {
						document.body.innerHTML = document.body.innerHTML + 
							"<p><h1>ERROR: Could not find authkey on PTP.  Make sure you are logged into PTP.</h1>" +
							"<p>Debug code:"+
							"<p>status: "+ response.status + 
							"<p>statusText: "+ response.statusText + 
							"<p>responseHeaders: "+ response.responseHeaders + 
							"<p>responseText: "+ response.responseText;
						return;
					}
				}
				
				//no match
				if (PTPSearchResults.match('Your search did not match anything')) {
					if (count < ratingsArray.length) {
						if (imdbAddy != '') {
							document.body.innerHTML = document.body.innerHTML + 
							'<br>'+count+'. ' + namesArray[count] + ' (' + yearsArray[count] + '): not found';
							count = count + 1;
							updateAll(count, '');
						}
						else {
							/*document.body.innerHTML = document.body.innerHTML + 
							'<br>'+count+'. ' + namesArray[count] + ' (' + yearsArray[count] + '): (not found) grabbing IMDb ID...';*/
							fetchIMDb(count);
						}
					}
				}
				//PTP match
				else if (PTPSearchResults.match('groupid=')) {
					//alert(response.responseHeaders);return;
					/*document.body.innerHTML = document.body.innerHTML + 
					"<p><h1>URL </h1>" + PTPSearchResults.url +
					"<p>Debug code:"+
					"<p>status: "+ response.status + 
					"<p>statusText: "+ response.statusText + 
					"<p>responseHeaders: "+ response.responseHeaders + 
					"<p>responseText: "+ response.responseText;
					return;*/

					var groupIDFind = PTPSearchResults.split("&amp;groupid=")[1].split('"')[0];
					applyRating(groupIDFind, ratingsArray[count], namesArray[count], yearsArray[count], count);
					if (count < ratingsArray.length) {
						count = count + 1;
						updateAll(count, '');
					}
				}
				//more than 1 match
				else {
					if (count < ratingsArray.length) {
						if (imdbAddy != '') {
							document.body.innerHTML = document.body.innerHTML + 
							'<br>'+count+'. ' + namesArray[count] + ' (' + yearsArray[count] + '): multiple matches';
							count = count + 1;
							updateAll(count, '');
						}
						else {
							/*document.body.innerHTML = document.body.innerHTML + 
							'<br>'+count+'. ' + namesArray[count] + ' (' + yearsArray[count] + '): (multiple matches) grabbing IMDb ID...';*/
							fetchIMDb(count);
						}
					}
				}
			},
			onerror: function(response) {
				document.body.innerHTML = document.body.innerHTML + 
					"<p><h1>ERROR: Could not load page on PTP.  Make sure you are logged into PTP!</h1>" +
					"<p>Debug code:"+
					"<p>status: "+ response.status + 
					"<p>statusText: "+ response.statusText + 
					"<p>responseHeaders: "+ response.responseHeaders + 
					"<p>responseText: "+ response.responseText;
					return;
			}
		});
	}
}

//add the rating to PTP and write info on the screen
function applyRating(groupID, votePercent, movieName, year, count) {
	authkey = GM_getValue('authkey', '0');
	var SRC = site_base_url + '/torrents.php?action=vote_torrent&groupid='+groupID+'&vote='+votePercent+'&auth='+authkey;
	if (typeof(GM_xmlhttpRequest) === 'function') {
		GM_xmlhttpRequest({
			method: 'GET',
			url: SRC,
			headers: {
				'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey'
			},
			onload: function (responseX) {
				var temp = responseX.responseText;
				document.body.innerHTML = document.body.innerHTML + 
					'<br>' + count + '. ' + '<a href="http://passthepopcorn.me/torrents.php?id=' + groupID + '">'+ movieName+ ' ('+year+')</a>' + ': '+votePercent;
			}
		});
	}
}

//used in case no exact match
function fetchIMDb(count) {
	getDOC(fullCritickerLinks[count], function(doc) {
		var link = doc.getElementById('fi_info_imdb').getElementsByTagName('a');
		var shortLink = link[0].href.split('title/tt')[1];
		updateAll(count, shortLink);
	});

}

/*GM_registerMenuCommand('passthepopcorn.me - IMDb Ratings Exporter: Start at X#', function(){
	var x = prompt('What # would you like to start at??\n' + 
		'eg. "200" starts at movie #200  (default "0")');	
	if (x != null && x != '') {
		x = parseInt(x);
		if (x == NaN) { alert('Pick a valid integer'); }
		else {
			alert('starting at: ' + x);
			GM_setValue('startAtNumber',x);
			window.location.href = window.location.href;
		}
	}
	else { 
		alert('Pick a valid integer');
	}
});


GM_registerMenuCommand('passthepopcorn.me - Criticker Ratings Exporter: End at X#', function(){
	var y = prompt('What # would you like to end at??\n' + 
		'eg. "200" ends at movie #200\n' +
		'Choose "0" to run to the end (default "0")');	
	if (y != null && y != '') {
		y = parseInt(y);
		if (y == NaN) { alert('Pick a valid integer'); }
		else {
			alert('ending at: ' + y);
			y = y + 1;
			GM_setValue('endAtNumber',y);
			window.location.href = window.location.href;
		}
	}
	else { 
		alert('Pick a valid integer');
	}
});*/

GM_registerMenuCommand('passthepopcorn.me - Criticker Ratings Exporter: Multiplier', function(){
	var y = prompt('What would you like to multiplier to be?\n' + 
		'eg. "10" changes 1s to 10s, 2s to 20s, etc\n' +
		'Choose "1" to run normal (default "1")\n' +
		'Current: ' + GM_getValue('multiplier',1));	
	if (y != null && y != '') {
		var x = parseFloat(y);
		if (x == NaN) { alert('Pick a valid number'); }
		else {
			GM_setValue('multiplier',y);
			alert('multiplying by: ' + y);
			window.location.href = window.location.href;
		}
	}
	else { 
		alert('Pick a valid number');
	}
});

//get userID
function getUserID(){
	var getUserID = document.getElementById('userinfo').getElementsByTagName('a');
	
	for (var x=0;x<getUserID.length;x++) {
		var tempURL = getUserID[x].href;
		if (tempURL.match(/user\.php\?id\=/)){
			var userID = tempURL.substring(tempURL.indexOf('=')+1, tempURL.length);
			GM_setValue('userID', userID);
			return userID;
		}
	}
}

function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
            var doc = document.implementation.createDocument('', '', null),
                html = document.createElement('html');
            html.innerHTML = responseDetails.responseText;
            doc.appendChild(html);
            callback(doc);
        }
    });
}

	
function updateTheScript() {
var SUC_script_num = 85380; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}