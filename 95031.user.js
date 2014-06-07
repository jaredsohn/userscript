// ==UserScript==
// @name         PTP - iCheckPopcorn
// @author       applebananas - Minigeek
// @description	 iCheckMovies clone for PTP.  Display checks for all the movies you've seen on PTP.  Get Awards.  Rate Movies.	
// @match      http://passthepopcorn.me/user.php*
// @match      http://passthepopcorn.me/torrents.php*
// @match      http://passthepopcorn.me/collections.php?id=*
// @match      http://passthepopcorn.me/collages.php?id=*
// @match      http://passthepopcorn.me/actor.php?id=*
// @match      http://passthepopcorn.me/artist.php?id=*
// @match      http://passthepopcorn.me/top10.php
// @match      http://passthepopcorn.me/top10.php?type=torrents*
// @match      https://passthepopcorn.me/user.php*
// @match      https://passthepopcorn.me/torrents.php*
// @match      https://passthepopcorn.me/collections.php?id=*
// @match      https://passthepopcorn.me/collages.php?id=*
// @match      https://passthepopcorn.me/actor.php?id=*
// @match      https://passthepopcorn.me/artist.php?id=*
// @match      https://passthepopcorn.me/top10.php
// @match      https://passthepopcorn.me/top10.php?type=torrents*
// @version	     0.18
// @date         2011-01-20
// ==/UserScript==

/*------------------------------------------------------------------------------------\
CHANGELOG:

0.18 - (Minigeek) Updated to work in chrome

0.17 - fixed bug displaying boxes due to new rating display

0.16 - (pending) changed 'Hide Seen' to 'Hide Checked' 
		fixed bug for hide checked with no cover art
0.15 - added feature to hide seen movies for collages
		fixed bug on top10 writing totals
		
0.14 - fixed bug b/c of new PTP formatting.
		added top10 compatibility

0.13 - Added feature for rating on IMDb and PTP simultaneously.

0.12 - fixed bug when hiding collage cover art.

0.11 - Changed award pictures (made transparent).  
		Fixed bug with search results.  
		Made collage pages have checks on posters too.

0.10 - Changed pictures (made smaller).  Changed picture location and made bigger for a single movie page.  
		Fixed bugs on profile page due to layout change by PTP.  Fixed some other minor bugs.
		Added new features for Award Finder.  
		Added totals for Awards Page and for Bragging.

0.01 - Initial Release

\------------------------------------------------------------------------------------*/

var fullActiveURL = document.URL;
var site_base_url = fullActiveURL.match(/^(http:\/\/passthepopcorn\.me|https:\/\/passthepopcorn\.me)/)[1];
var imageLink = [];
var imageLinkColl=[];
/*var theDivArray = [];
var theLinkArray = [];
var theImageArray = [];*/
var theDiv = document.createElement('div');
//alert(GM_getValue('collagePageList','').split('#X#').sort());return;
//alert(GM_getValue('artistPageList','').split('#X#').length);return;
//GM_setValue('artistPageList','');GM_setValue('actorPageList','');GM_setValue('collagePageList','');return;

if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
}


if (fullActiveURL.match(/user\.php/)) {
	var userID = GM_getValue('userID', '');
	if (userID =='') {
		userID = getUserID();
	}
	var userIDRegExp = new RegExp(userID, "gi");

	if (fullActiveURL.match(/action\=ratings/)){
		if (fullActiveURL.match(userIDRegExp)) {ratingsImport();}
	}
	else if (fullActiveURL.match(/user\.php\?id\=/)){
		if (fullActiveURL.match(userIDRegExp)) {
			var theDiv = document.getElementById('content').getElementsByTagName('div')[0];
			var links = theDiv.getElementsByTagName('a');
			var aSpan = document.createElement('span');
			var link = document.createElement('a');
			var theText = document.createTextNode("] [");
			link.innerHTML = 'iCheckPopcorn Awards';
			link.href = 'JavaScript:void(0);';
			link.addEventListener("click", award_click, false);
			
			var link2 = document.createElement('a');
			var theText2 = document.createTextNode("] [");
			link2.innerHTML = 'Award Finder';
			link2.href = 'JavaScript:void(0);';
			link2.addEventListener("click", awardFinder, false);
			
			var link3 = document.createElement('a');
			var theText3 = document.createTextNode("] [");
			link3.innerHTML = 'Backup/Restore';
			link3.href = 'JavaScript:void(0);';
			link3.addEventListener("click", backupRestore, false);


			links[0].parentNode.insertBefore(aSpan, links[0].nextSibling);
			aSpan.appendChild(theText);
			aSpan.appendChild(link);
			aSpan.appendChild(theText2);
			aSpan.appendChild(link2);
			aSpan.appendChild(theText3);
			aSpan.appendChild(link3);

		}
	}
	else if (fullActiveURL.match(/edit/)) {
		brag();
	}
}
else if (fullActiveURL.match(/torrents\.php/) || fullActiveURL.match(/actor\.php/) || fullActiveURL.match(/artist\.php/) || fullActiveURL.match(/collages\.php/) || fullActiveURL.match(/top10\.php/) ){
	if (fullActiveURL.match(/action\=history/) || fullActiveURL.match(/action\=edit/) || fullActiveURL.match(/action\=imdb/) ) {
	}
	else{
		displayChecks();
	}
}

//import ratings from ptp
function ratingsImport() {
	var links = document.getElementById('content').getElementsByTagName('a');
	var allMovies = [];
	var allMovieNames = [];
	var temp, tempLink;
	//convert links
	for (var x in links) {
		tempLink = links[x].href;
		tempName = links[x].innerHTML;
		if (tempLink.match(/torrents\.php\?id\=/)) {
			temp = tempLink.substring(tempLink.indexOf('=')+1, tempLink.length);
			//temp = parseInt(temp);
			allMovies.push(temp);
			allMovieNames.push(tempName);
		}
	}
	
	//used for getting rid of previously unchecked entries...
	var deletedRatingsArray = GM_getValue('deletedRatingsURLs','').split('#X#');
	if (deletedRatingsArray.length!=1) {
		//alert(
		for (var x in deletedRatingsArray) {
			var allMoviesIdx = allMovies.indexOf(deletedRatingsArray[x]);
			if (allMoviesIdx != -1) {
				allMovies.splice(allMoviesIdx,1);
				allMovieNames.splice(allMoviesIdx,1);
			}
			else {
				deletedRatingsArray.splice(x,1); //deleted entry not in the array, so just get rid of it for future comparisons
			}
		}
	}

	for (var z in links) {
		var tempLink = links[z].href;
		
		var tempID = tempLink.substring(tempLink.indexOf('=')+1, tempLink.length);
		if (deletedRatingsArray.indexOf(tempID) != -1) {
			imageLink.push(document.createElement('img'));
			imageLink[imageLink.length-1].src = getImage('ratings', 'X');
			imageLink[imageLink.length-1].title = 'Movie has been unchecked and will not be updated in the future.  Click to re-add.';
			imageLink[imageLink.length-1].addEventListener("click", image_click, false);
			imageLink[imageLink.length-1].setAttribute('torrentURL',tempID);
			imageLink[imageLink.length-1].setAttribute('torrentName',links[z].innerHTML);
			imageLink[imageLink.length-1].setAttribute('checked', false);
			imageLink[imageLink.length-1].setAttribute('pageType', 'ratings');
			imageLink[imageLink.length-1].addEventListener("mouseover", function(e) {
				this.src = getImage('ratings', 'hover');
			}, false);
			imageLink[imageLink.length-1].addEventListener("mouseout", function(e) {
				this.src = getImage('ratings', 'X');
			}, false);

			links[z].parentNode.insertBefore(imageLink[imageLink.length-1],links[z]);
		}
	}
	
	var checkedArray = GM_getValue('checkedListURLs','').split('#X#');
	var checkedArrayNames = GM_getValue('checkedListNames','').split('#X#');
	for (var x in allMovies) {
		checkedArrayIdx = checkedArray.indexOf(allMovies[x]);
		if (checkedArrayIdx != -1) {
			checkedArray.splice(checkedArrayIdx,1);
			checkedArrayNames.splice(checkedArrayIdx,1);
		}
	}
		
	GM_setValue('ratedListURLs', arrayToStr(allMovies));
	GM_setValue('ratedListNames', arrayToStr(allMovieNames));
	GM_setValue('checkedListURLs', arrayToStr(checkedArray));
	GM_setValue('checkedListNames', arrayToStr(checkedArrayNames));
	GM_setValue('deletedRatingsURLs', arrayToStr(deletedRatingsArray));
	
	/*/used for example :)
	var checkedArray = [3232,120,1719,479,6984,''];
	var checkedArrayNames = ['Indiana Jones and the Temple of Doom', 'American Pie', 'American Pie 2', 'Boiler Room','Malcolm X',''];*/
	
	var table = document.getElementById('content').getElementsByTagName('table');

	var blankRow = document.createElement('tr');
	blankRow.className = "colhead_dark";
	var blankCellA = document.createElement('td');
	var blankCellB = document.createElement('td');
	var blankCellC = document.createElement('td');
	blankCellA.innerHTML = '<strong>Not-Rated Movies';
	blankRow.appendChild(blankCellA);
	blankRow.appendChild(blankCellB);
	blankRow.appendChild(blankCellC);
	table[0].appendChild(blankRow);
	

	//next section used for rating checked movies not yet rated
	var scoreBox = [];
	for (var x in checkedArray) {
		if (checkedArray[x] !='') {
			var newRow = document.createElement('tr');
			var firstCell = document.createElement('td');
			firstCell.innerHTML = '<a href='+site_base_url+'/torrents.php?id='+checkedArray[x]+'>'+checkedArrayNames[x]+'</a>';
			var secondCell = document.createElement('td');
			var thirdCell = document.createElement('td');
			scoreBox.push(document.createElement('input'));
			scoreBox[x].type = 'text';
			scoreBox[x].value = '0';
			scoreBox[x].size = 4;
			scoreBox[x].setAttribute('torrentID',checkedArray[x]);
			scoreBox[x].setAttribute('movieName',checkedArrayNames[x]);
			thirdCell.appendChild(scoreBox[x]);
			newRow.appendChild(firstCell);
			newRow.appendChild(secondCell);
			newRow.appendChild(thirdCell);
			table[0].appendChild(newRow);
		}
	}
	if (scoreBox.length >0){
		var body = document.getElementById('content');
		var submitButtonDiv = document.createElement('div');
		submitButtonDiv.align = 'right';
		submitButtonDiv.style.paddingRight = '24px';
		var submitButton = document.createElement('input');
		submitButton.type = 'submit';
		submitButton.value = 'Update Scores';
		submitButton.addEventListener("click", function(e) {
			var authkey;
			var authKeyFind = document.getElementsByTagName('head');
			for (var z in authKeyFind) {
				if (authKeyFind[z].innerHTML.match(/authkey/)) { 	
					var tempFindAuth = authKeyFind[z].innerHTML;
					tempFindAuth = tempFindAuth.split('authkey=')[1].split('"')[0];
					authkey = tempFindAuth;
				}
			}
			var tempCount =0;
			for (var x in scoreBox) {
				if (parseInt(scoreBox[x].value) > 0 && parseInt(scoreBox[x].value) <= 100) {
					if (tempCount ==0) {
						body.innerHTML +='<p><h2>Refresh the page to see the changes after all movies are rated.</h2>'+ 
							'<p>Only click "Update Scores" once.  Must refresh page before submitting more scores.';
					}
					tempCount++;
					var movieName = scoreBox[x].getAttribute('movieName')
					var groupID = scoreBox[x].getAttribute('torrentID');
					var votePercent = scoreBox[x].value;
					applyRating(groupID, votePercent, movieName, authkey);
				}
			}
		}, false);
		
		var submitIMDbButtonDiv = document.createElement('div');
		submitIMDbButtonDiv.align = 'right';
		submitIMDbButtonDiv.style.paddingRight = '24px';

		var submitIMDbButton = document.createElement('input');
		submitIMDbButton.type = 'submit';
		submitIMDbButton.value = 'Update Scores + IMDb';
		submitIMDbButton.addEventListener("click", function(e) {
			var authkey;
			var authKeyFind = document.getElementsByTagName('head');
			for (var z in authKeyFind) {
				if (authKeyFind[z].innerHTML.match(/authkey/)) { 	
					var tempFindAuth = authKeyFind[z].innerHTML;
					tempFindAuth = tempFindAuth.split('authkey=')[1].split('"')[0];
					authkey = tempFindAuth;
				}
			}
			var tempCount =0;
			for (var x in scoreBox) {
				if (parseInt(scoreBox[x].value) > 0 && parseInt(scoreBox[x].value) <= 100) {
					if (tempCount ==0) {
						body.innerHTML +='<p><h2>Refresh the page to see the changes after all movies are rated.</h2>'+ 
							'<p>Only click "Update Scores" once.  Must refresh page before submitting more scores.';
					}
					tempCount++;
					var movieName = scoreBox[x].getAttribute('movieName')
					var groupID = scoreBox[x].getAttribute('torrentID');
					var votePercent = scoreBox[x].value;
					var IMDbVotePercent = Math.round(votePercent/10);
					if (IMDbVotePercent == 0) {
						IMDbVotePercent = 1;
					}
					applyRating(groupID, votePercent, movieName, authkey);
					applyIMDbRating(groupID, IMDbVotePercent, movieName);
				}
			}
		}, false);

		
		submitButtonDiv.appendChild(submitButton);
		submitIMDbButtonDiv.appendChild(submitIMDbButton);
		body.appendChild(submitButtonDiv);
		body.appendChild(submitIMDbButtonDiv);
	}
}

function applyRating(groupID, votePercent, movieName, authkey) {
	var body = document.getElementById('content');
	var SRC = site_base_url + '/torrents.php?action=vote_torrent&groupid='+groupID+'&vote='+votePercent+'&auth='+authkey;
	if (typeof(GM_xmlhttpRequest) === 'function') {
		GM_xmlhttpRequest({
			method: 'GET',
			url: SRC,
			headers: {
				'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey'
			},
			onload: function (responseX) {
				if (responseX.responseText.match(/Invalid authorization key/)) {
					body.innerHTML += '<br><font color="red"><b>FAILED BECAUSE OF AUTH KEY ISSUE: ' + movieName +
						'</b> - PTP must have updated your authkey since you loaded the page.  Refresh the page and try again!</font>';
				}
				else {
					body.innerHTML += '<br>rated: <a href=' + site_base_url + '/torrents.php?id='+groupID +'>'+movieName+'</a> ('+votePercent+')';
				}
			}
		});
	}
}

//used to send IMDb Ratings
function applyIMDbRating(groupID, IMDbVotePercent, movieName) {
	var body = document.getElementById('content');
	getDOC(site_base_url + "/torrents.php?id="+groupID, function(doc) {

		var theTables = doc.getElementsByTagName('table');
		var theLinks;
		for (var x in theTables) {
			if (theTables[x].innerHTML.match(/x1_imdb/)) {
				theLinks = theTables[x].getElementsByTagName('a');
			}
		}
		if (theLinks != null) {
			getDOC(theLinks[0].href, function(imdbDoc) {
				var allIMDbLinks = imdbDoc.getElementsByTagName('a');
				thisLoop: for (var q in allIMDbLinks) {
					if (allIMDbLinks[q].href.match(/vote\?v\=5/)) {
						var thisLink = allIMDbLinks[q].href;
						var replaced = thisLink.replace('v=5','v='+IMDbVotePercent);
						thisLink = thisLink.split('v')[0];
						
						var SRC = "http://www.imdb.com" + replaced;
						var fullLink = "http://www.imdb.com" + thisLink;
						if (typeof(GM_xmlhttpRequest) === 'function') {
							GM_xmlhttpRequest({
								method: 'GET',
								url: SRC,
								headers: {
									'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey'
								},
								onload: function (responseX) {
									if (responseX.responseText.match(/was counted/)) {
										body.innerHTML += '<br>rated on IMDb: <a href=' + fullLink +'>'+movieName+'</a> ('+IMDbVotePercent+')';
									}
									else {
										body.innerHTML += '<font color="red"><br>problem on IMDb: <a href=' + fullLink +'>'+movieName+'</a></font>';
									}
								}
							});
						}		
					}
				}
			});
		}
		else {
			body.innerHTML += '<font color="red"><br>IMDb ID not found on PTP: <a href=' + site_base_url + '/torrents.php?id='+groupID +'>'+movieName+'</a></font>';
		}
	});
}

//display the checks
function displayChecks() {
	var ratedArray = GM_getValue('ratedListURLs','').split('#X#');
	var checkedArray = GM_getValue('checkedListURLs','').split('#X#');
	var globalArray = ratedArray.concat(checkedArray);
	
	/*/used for debugging
	var deletedRatingsArray = GM_getValue('deletedRatingsURLs','').split('#X#');
	var awardArrayURLs = GM_getValue('awardListURLs','').split('#X#');
	var awardArrayNames = GM_getValue('awardListNames','').split('#X#');
	var awardArrayRanks = GM_getValue('awardListRanks','').split('#X#');
	var ratedArrayNames = GM_getValue('ratedListNames','').split('#X#');
	var checkedArrayNames = GM_getValue('checkedListNames','').split('#X#');
	var temp = GM_getValue('ratedListNames','');
	document.body.innerHTML += 
		'<p>ra ' + ratedArray.length + ' ' +ratedArray + 
		'<p>raN ' + ratedArrayNames.length + ' ' +ratedArrayNames +
		'<p>raNStr ' + temp.length + 
		'<p>de ' + deletedRatingsArray.length + ' ' +deletedRatingsArray+
		'<p>ch ' + checkedArray.length + ' ' +checkedArray +
		'<p>chN ' + checkedArrayNames.length + ' ' +checkedArrayNames +
		'<p>awur ' + awardArrayURLs.length + ' ' +awardArrayURLs+
		'<p>awN ' + awardArrayNames.length + ' ' +awardArrayNames+
		'<p>awr ' + awardArrayRanks.length + ' ' +awardArrayRanks;	*/
	

	// putting the image on various pages
	var lx;
	var matchType; 
	var pageType = '';
	
	//used to remove checked movies, collages, etc that got removed from PTP's database
	var removedPageCheck = document.title;
	if (removedPageCheck.match(/Error 404 :: PassThePopcorn/)) {
		if (fullActiveURL.match(/torrents\.php\?id/)) {
			var tempLinkID = fullActiveURL.substring(fullActiveURL.indexOf('=')+1, fullActiveURL.length);

			var checkedArrayIdx = checkedArray.indexOf(tempLinkID);
			if (checkedArrayIdx != -1) {
				var checkedArrayNames = GM_getValue('checkedListNames','').split('#X#');
				checkedArray.splice(checkedArrayIdx,1);
				checkedArrayNames.splice(checkedArrayIdx,1);
				
				GM_setValue('checkedListURLs', arrayToStr(checkedArray));
				GM_setValue('checkedListNames', arrayToStr(checkedArrayNames));
			}
		}
		else if (fullActiveURL.match(/artist\.php/) || fullActiveURL.match(/actor\.php/) || fullActiveURL.match(/collages\.php\?id/)) {
			var awardArrayURLs = GM_getValue('awardListURLs','').split('#X#');
			
			var page_URL = fullActiveURL.substring(fullActiveURL.indexOf('rn.me/')+6,fullActiveURL.length);
			var theIndex = awardArrayURLs.indexOf(page_URL);
			if (theIndex != -1) {
				var awardArrayNames = GM_getValue('awardListNames','').split('#X#');
				var awardArrayRanks = GM_getValue('awardListRanks','').split('#X#');

				//delete award if match found
				awardArrayURLs.splice(theIndex,1);
				awardArrayNames.splice(theIndex,1);
				awardArrayRanks.splice(theIndex,1);
				
				GM_setValue('awardListURLs', arrayToStr(awardArrayURLs));
				GM_setValue('awardListNames', arrayToStr(awardArrayNames));
				GM_setValue('awardListRanks', arrayToStr(awardArrayRanks));
			}
		}
		return;
	}
	
	if (fullActiveURL.match(/torrents\.php/)) {
		//case for specific movie page
		if (fullActiveURL.match(/torrents\.php\?id/)) {
			lx = document.getElementById('content').getElementsByTagName('a');
			matchType = new RegExp(/artist\.php\?id=([0-9]+)$/);
			//lx = document.getElementsByTagName('h2');
			//matchType = new RegExp("n+");
			pageType = 'individual';
		}
		//special case for random torrent pages like user uploaded/snatched/etc
		else if (fullActiveURL.match(/type\=uploaded/) || fullActiveURL.match(/type\=seeding/) || fullActiveURL.match(/type\=leeching/) || fullActiveURL.match(/type\=snatched/) || fullActiveURL.match(/type\=downloaded/)) {
			lx = document.getElementById('content').getElementsByTagName('a');
			matchType = new RegExp(/torrents\.php\?id=([0-9]+)/);
		}
		// case for torrents on the search page
		else {
			//lx = document.getElementById('torrent_table').getElementsByTagName('tr')[1].getElementsByTagName('a');
			//alert(lx[2].innerHTML);return;
			lx = document.getElementById('torrent_table').getElementsByTagName('a');
			if (fullActiveURL.match(/disablegrouping=1/))
			{
				matchType = new RegExp(/torrents\.php\?id=([0-9]+)/);
			} else {
				matchType = new RegExp(/torrents\.php\?id=([0-9]+)$/);
			}
			pageType = 'search';
		}
	}
	
	// case for artists page
	else if (fullActiveURL.match(/artist\.php/)) {
		lx = document.getElementById('discog_table').getElementsByTagName('a');
		matchType = new RegExp(/torrents\.php\?id=([0-9]+)$/);
		pageType = 'artist';
	}
	
	// case for actors page
	else if (fullActiveURL.match(/actor\.php/)) {
		lx = document.getElementById('torrents_full-length_feature').getElementsByTagName('a');
		matchType = new RegExp(/torrents\.php\?id=([0-9]+)$/);
		pageType = 'actor';
	}
			
	//case for collages page
	else if (fullActiveURL.match(/collages\.php\?id/) || fullActiveURL.match(/collections\.php\?id/)) {
		lx = document.getElementById('discog_table').getElementsByTagName('a');
		matchType = new RegExp(/torrents\.php\?id=([0-9]+)$/);
		pageType = 'collage';
	}
	
	//case for top10
	else if (fullActiveURL.match(/top10\.php/)) {
		lx = document.getElementById('content').getElementsByTagName('a');
		matchType = new RegExp(/torrents\.php\?id=([0-9]+)/);
		pageType = 'top10';
		if (fullActiveURL.match(/torrents/)) {
			pageType = 'top10torrents';
		}
	}
			
	var total=0;
	//alert(lx.length);return;
	//if (lx.length > 0) {
	displayCheckLoop: for (var i=0;i<lx.length;i++) {
		
		var match = lx[i].href.match(matchType);
								
		if (match || pageType == 'individual') {
			//case to handle the posters on the left showing the checkbox too
			//if (pageType == 'search' && lx[i].innerHTML.match(/img src/)) {
			if (pageType == 'search' && lx[i].title != 'View Torrent') {
				continue;
			}

			imageLink.push(document.createElement('img'));

			//setting movie name and movie link
			if (pageType == 'individual') {
				var tempLinkID = fullActiveURL.substring(fullActiveURL.indexOf('=')+1, fullActiveURL.length);
				if (tempLinkID.match(/&/)) {
					tempLinkID = tempLinkID.substring(0,tempLinkID.indexOf('&'));
				}
				if (tempLinkID.match(/#/)) {
					tempLinkID = tempLinkID.substring(0,tempLinkID.indexOf('#'));
				}
				
				if (match) {
					var movieName = document.getElementById('content').getElementsByTagName('h2')[0].innerHTML;
					movieName = movieName.substring(0, movieName.indexOf('] by ')-6);
					imageLink[total].setAttribute('torrentName', movieName);
				}
				//used for individual pages without a director
				else {
					var movieName = document.getElementById('content').getElementsByTagName('h2')[0].innerHTML;
					movieName = movieName.substring(0,movieName.length-7);
					imageLink[total].setAttribute('torrentName', movieName);
				}
			}
			//case for all normal pages (searches, collages, etc)
			else {
				var tempLink = lx[i].href;
				tempLinkID = tempLink.substring(tempLink.indexOf('=')+1, tempLink.length);
				if (tempLinkID.match(/&/)){
					tempLinkID = tempLinkID.substring(0,tempLinkID.indexOf('&'));
				}
				imageLink[total].setAttribute('torrentName', lx[i].innerHTML);
			}
			
			//not checked
			if (globalArray.lastIndexOf(tempLinkID) == -1) {
				imageLink[total].src = getImage(pageType, 'blank');
				imageLink[total].setAttribute('checked', false);
				imageLink[total].addEventListener("mouseover", function(e) {
					this.src = getImage(pageType, 'hover');;
				}, false);
				imageLink[total].addEventListener("mouseout", function(e) {
					this.src = getImage(pageType, 'blank');;
				}, false);
			}
			//checked
			else {
				imageLink[total].src = getImage(pageType, 'check');
				imageLink[total].setAttribute('checked', true);
				imageLink[total].addEventListener("mouseover", function(e) {
					this.src = getImage(pageType, 'hoverBlank');;
				}, false);
				imageLink[total].addEventListener("mouseout", function(e) {
					this.src = getImage(pageType, 'check');;
				}, false);
			}

			imageLink[total].setAttribute('torrentURL', tempLinkID);
			imageLink[total].setAttribute('pageType', pageType);
			imageLink[total].setAttribute('count', total);
			imageLink[total].addEventListener("click", image_click, false);
			
			// help for two corresponding checks (eg. collage page)
			if (pageType == 'collage') {
				imageLink[total].setAttribute('multi', 'listClick');
			}
			else {
				imageLink[total].setAttribute('multi', 'normalClick'); 
			}


			//standard case for inserting the actual image
			if (match && pageType != 'individual') {
				
				lx[i].parentNode.insertBefore(imageLink[total], lx[i]);
			}
			//special case for individual page
			else {
				var theTables = document.getElementsByTagName('table');
				var theTDs;
				for (var x in theTables) {
					if (theTables[x].innerHTML.match(/<!-- User Rating \/-->/)) {
						theTDs = theTables[x].getElementsByTagName('td');
					}
				}
				var newTD = document.createElement('td');
				newTD.className= 'noborder';
				newTD.appendChild(imageLink[total]);
				theTDs[theTDs.length-1].parentNode.insertBefore(newTD, theTDs[theTDs.length-1].nextSibling);
				
				//only run through once on individual page to avoid multiple artists, no artists, etc
				break displayCheckLoop;
			}
			total+=1;
		}
	}
	
	// used for two corresponding images on collage page, runs for the poster section
	if (pageType == 'collage') {
		var dx = document.getElementById('collage_table');
		if (dx != null) {
			var mx = document.getElementById('collage_table').getElementsByTagName('a');
			for (var count=0;count<mx.length;count++) { 
				imageLinkColl.push(document.createElement('img'));
				var theDivArray=document.createElement('div');
				theDivArray.style.cssFloat="left";
				theDivArray.style.position="relative";
				theDivArray.appendChild(imageLinkColl[count]);
				imageLinkColl[count].style.position="absolute";
				imageLinkColl[count].style.bottom="3px";
				imageLinkColl[count].style.right="1px";
				imageLinkColl[count].setAttribute('torrentName', imageLink[count].getAttribute('torrentName'));
				imageLinkColl[count].setAttribute('torrentURL', imageLink[count].getAttribute('torrentURL'));
				imageLinkColl[count].setAttribute('pageType', 'collage');
				imageLinkColl[count].setAttribute('multi', 'collClick');
				imageLinkColl[count].setAttribute('count', count);
				// not checked
				if (globalArray.lastIndexOf(imageLink[count].getAttribute('torrentURL')) == -1) {
					imageLinkColl[count].src = getImage(pageType, 'blank');
					imageLinkColl[count].setAttribute('checked', false);
					imageLinkColl[count].addEventListener("mouseover", function(e) {
						this.src = getImage(pageType, 'hover');;
					}, false);
					imageLinkColl[count].addEventListener("mouseout", function(e) {
						this.src = getImage(pageType, 'blank');;
					}, false);
				}
				// checked
				else {
					imageLinkColl[count].src = getImage(pageType, 'check');
					imageLinkColl[count].setAttribute('checked', true);
					imageLinkColl[count].addEventListener("mouseover", function(e) {
						this.src = getImage(pageType, 'hoverBlank');;
					}, false);
					imageLinkColl[count].addEventListener("mouseout", function(e) {
						this.src = getImage(pageType, 'check');;
					}, false);
				}
				imageLinkColl[count].addEventListener("click", image_click, false);
				
				mx[count].parentNode.insertBefore(theDivArray, mx[count]);
				theDivArray.appendChild(mx[count]);	
			}
		}
		//no collage images
		else {
			for (var p in imageLink) {
				imageLink[p].setAttribute('multi', 'normalClick');
			}
		}

	}
	if (pageType != 'individual' && pageType != 'top10') {
	
		//following few lines used to get header
		var header;
		if (pageType == 'search') {
			header = document.getElementById('content').getElementsByTagName('h3');
		}
		else {
			header = document.getElementById('content').getElementsByTagName('h2');
		}
		var nameOfPage = header[0].innerHTML;
		theDiv.setAttribute('nameOfPage',nameOfPage);
		
		writeTotals(pageType);
	}
	
	//used for hiding seen movies
	if (pageType == 'collage') {
		var hide = document.createElement('a');
		hide.innerHTML = '[Hide Checked] ';
		hide.href = 'JavaScript:void(0);';
		var findFirstLink = document.getElementById('content').getElementsByTagName('a');
		var findFirstLinkNum=0;
		findFirstLinkLoop: for (var x in findFirstLink) {
			if (findFirstLink[x].href.match(/collages\.php/)) {
				findFirstLinkNum = x;
				break findFirstLinkLoop;
			}
		}
		
		findFirstLink[findFirstLinkNum].parentNode.insertBefore(hide, findFirstLink[findFirstLinkNum]);
		hide.addEventListener("click", function(e) {
			var collageTable = document.getElementById('collage_table');
			if (collageTable) {
				var allTRs = collageTable.getElementsByTagName('tr');
				var allTDs = collageTable.getElementsByTagName('td');
				
				//get rid of unwanted posters
				for (var n = imageLink.length-1; n>=0; n--) {
					if (imageLink[n].getAttribute('checked') == 'true') {
						allTDs[n].parentNode.removeChild(allTDs[n]);
					}
				}
				
				//rearrange posters so 5 per row
				var rowCounter = -1; //start at -1 to offset for 0 mod 5 = 0
				for (var q =0; q< allTDs.length; q++) {
					//allTRs[rowCounter].insertBefore(allTDs[q], allTRs[rowCounter].parentNode.lastChild);
					if (q % 5 === 0) {
						rowCounter++;
					}
					allTRs[rowCounter].appendChild(allTDs[q]);
				}
			}
			
			
			
			var discogTable = document.getElementById('discog_table');
			var allDiscogTRs = discogTable.getElementsByTagName('tr');
			var beginningTRNums =[];
			for (var r in allDiscogTRs) {
				if (allDiscogTRs[r].innerHTML.match('show_torrents_link')) {
					beginningTRNums.push(r);
				}
			}
			
			for (var s = imageLink.length-1; s>=0; s--) {
				if (imageLink[s].getAttribute('checked') == 'true') {
					if (s == imageLink.length-1) {
						for (var t = allDiscogTRs.length-1; t>= beginningTRNums[s]; t--) {
							allDiscogTRs[t].parentNode.removeChild(allDiscogTRs[t]);
						}
					}
					else {
						for (var t = (beginningTRNums[s+1]-1); t>= (beginningTRNums[s]); t--) {
							allDiscogTRs[t].parentNode.removeChild(allDiscogTRs[t]);
						}
					}
				}
			}

			
			hide.innerHTML = '';
		}, false);
	}

	//}
	
}

//write totals and trophy
function writeTotals(pageType) {
	var header, tempHeadCheck;
	if (pageType == 'search') {
		header = document.getElementById('content').getElementsByTagName('h3');
	}
	else {
		header = document.getElementById('content').getElementsByTagName('h2');
	}
	var nameOfPage = theDiv.getAttribute('nameOfPage','');
	
	var checkedTotal = 0;
	for (var x in imageLink) {
		if (imageLink[x].getAttribute('checked')=='true') {
			checkedTotal+=1;
		}
	}
	
	header[0].innerHTML = '';
	
	theDiv.align='center';
	
	if (pageType == 'search') {
		theDiv.align='left';
		theDiv.innerHTML='<h3>'+nameOfPage+ '</h3><h2>(' + checkedTotal + ' / ' + imageLink.length + ')</h2>';
	}
	else {
		theDiv.innerHTML='<h2>'+nameOfPage+ ' (' + checkedTotal + ' / ' + imageLink.length + ')</h2>';
	}

	//used for awards
	if (pageType == 'artist' || pageType == 'actor' || pageType == 'collage') {
		
		var percent = checkedTotal / imageLink.length;
		var rank =0;
		var awardImage = document.createElement('img');
		
		if (percent == 1) {
			rank = 1;
			awardImage.title = "Platinum";
			awardImage.src = getImage('award', 'platinum');
		}
		else if (percent >= .9) {
			rank = 2;
			awardImage.title = "Gold";
			awardImage.src = getImage('award', 'gold');;
		}
		else if (percent >=.75) {
			rank = 3;
			awardImage.title = "Silver";
			awardImage.src = getImage('award', 'silver');;
		}
		else if (percent >=.5) {
			rank = 4;
			awardImage.title = "Bronze";
			awardImage.src = getImage('award', 'bronze');;
		}
		//must have 4 or more movies in list to get award
		if (imageLink.length <= 3) { rank = 0;}
		
		//used for awards page
		var awardArrayURLs = GM_getValue('awardListURLs','').split('#X#');
		var awardArrayNames = GM_getValue('awardListNames','').split('#X#');
		var awardArrayRanks = GM_getValue('awardListRanks','').split('#X#');
		
		var page_URL = fullActiveURL.substring(fullActiveURL.indexOf('rn.me/')+6,fullActiveURL.length);
		
		//check to see if page exists
		var theIndex = awardArrayURLs.indexOf(page_URL);
		if (theIndex != -1) {
			//delete award if rank is 0
			if (rank==0) {
				awardArrayURLs.splice(theIndex,1);
				awardArrayNames.splice(theIndex,1);
				awardArrayRanks.splice(theIndex,1);
				
				GM_setValue('awardListURLs', arrayToStr(awardArrayURLs));
				GM_setValue('awardListNames', arrayToStr(awardArrayNames));
				GM_setValue('awardListRanks', arrayToStr(awardArrayRanks));
			}
			//assign new rank to existing page.
			else {
				awardArrayRanks[theIndex] = rank;
				GM_setValue('awardListRanks', arrayToStr(awardArrayRanks));
			}
		}
		//page doesn't exist, so add all info
		else {
			if (rank !=0) {
				awardArrayURLs.push(page_URL);
				awardArrayNames.push(nameOfPage);
				awardArrayRanks.push(rank);
				
				GM_setValue('awardListURLs', arrayToStr(awardArrayURLs));
				GM_setValue('awardListNames', arrayToStr(awardArrayNames));
				GM_setValue('awardListRanks', arrayToStr(awardArrayRanks));
			}
		}

		if (rank !=0){
			awardImage.addEventListener("click", award_click, false);
			theDiv.appendChild(awardImage);
		}
	}
	header[0].parentNode.insertBefore(theDiv, header[0].nextSibling);

	/*/used for building list of collage, director, and actor pages
	if (imageLink.length >= 4) {
		if (page_URL.match(/collage/)) {
			var thePageNum = page_URL.substring(page_URL.indexOf('id=')+3,page_URL.length);
			collagePageList = GM_getValue('collagePageList','').split('#X#');
			var thePageIndex = collagePageList.indexOf(thePageNum);
			if (thePageIndex == -1){
				collagePageList.push(thePageNum);
				GM_setValue('collagePageList',arrayToStr(collagePageList));
			}
		}
		else if (page_URL.match(/actor/)) {
			var thePageNum = page_URL.substring(page_URL.indexOf('id=')+3,page_URL.length);
			actorPageList = GM_getValue('actorPageList','').split('#X#');
			var thePageIndex = actorPageList.indexOf(thePageNum);
			if (thePageIndex == -1){
				actorPageList.push(thePageNum);
				GM_setValue('actorPageList',arrayToStr(actorPageList));
			}
		}
		else if (page_URL.match(/artist/)) {
			var thePageNum = page_URL.substring(page_URL.indexOf('id=')+3,page_URL.length);
			artistPageList = GM_getValue('artistPageList','').split('#X#');
			var thePageIndex = artistPageList.indexOf(thePageNum);
			if (thePageIndex == -1){
				artistPageList.push(thePageNum);
				GM_setValue('artistPageList',arrayToStr(artistPageList));
			}
		}

	}*/

}

//after clicking an image
function image_click() {	
	var checkedArrayNames = GM_getValue('checkedListNames','').split('#X#');
	var checkedArray = GM_getValue('checkedListURLs','').split('#X#');
	var ratedArray = GM_getValue('ratedListURLs','').split('#X#');
	var ratedArrayNames = GM_getValue('ratedListNames','').split('#X#');
	var deletedRatingsArray = GM_getValue('deletedRatingsURLs','').split('#X#');
	
	var thisURL = this.getAttribute('torrentURL');
	var thisName = this.getAttribute('torrentName');
	var thisChecked = this.getAttribute('checked');
	var pageType = this.getAttribute('pageType');
	var multi = this.getAttribute('multi'); //collClick, listClick, normalClick
	var count = this.getAttribute('count');
	
	var ratedArrayIdx = ratedArray.indexOf(thisURL);
	var deletedRatingsIdx = deletedRatingsArray.indexOf(thisURL);
	var checkedArrayIdx = checkedArray.indexOf(thisURL);
	
	//already checked so removing
	if (thisChecked == "true") {
		if (ratedArrayIdx != -1) {
			ratedArray.splice(ratedArrayIdx,1);
			ratedArrayNames.splice(ratedArrayIdx,1);
			
			GM_setValue('ratedListURLs', arrayToStr(ratedArray));
			GM_setValue('ratedListNames', arrayToStr(ratedArrayNames));
		}
		if (checkedArrayIdx != -1) {
			checkedArray.splice(checkedArrayIdx,1);
			checkedArrayNames.splice(checkedArrayIdx,1);
			
			GM_setValue('checkedListURLs', arrayToStr(checkedArray));
			GM_setValue('checkedListNames', arrayToStr(checkedArrayNames));
		}
		deletedRatingsArray.push(thisURL);
		GM_setValue('deletedRatingsURLs', arrayToStr(deletedRatingsArray));
		
		this.src = getImage(pageType, 'blank');
		this.setAttribute('checked', false);
		this.addEventListener("mouseout", function(e) {
			this.src = getImage(pageType, 'blank');
		}, false);
		this.addEventListener("mouseover", function(e) {
			this.src = getImage(pageType, 'hover');
		}, false);
		this.addEventListener("click", image_click, false);
		
		if (multi == 'collClick') {
			imageLink[count].src = getImage(pageType, 'blank');
			imageLink[count].setAttribute('checked', false);
			imageLink[count].addEventListener("mouseout", function(e) {
				imageLink[count].src = getImage(pageType, 'blank');
			}, false);
			imageLink[count].addEventListener("mouseover", function(e) {
				imageLink[count].src = getImage(pageType, 'hover');
			}, false);
			imageLink[count].addEventListener("click", image_click, false);
		}
		else if (multi == 'listClick') {
			imageLinkColl[count].src = getImage(pageType, 'blank');
			imageLinkColl[count].setAttribute('checked', false);
			imageLinkColl[count].addEventListener("mouseout", function(e) {
				imageLinkColl[count].src = getImage(pageType, 'blank');
			}, false);
			imageLinkColl[count].addEventListener("mouseover", function(e) {
				imageLinkColl[count].src = getImage(pageType, 'hover');
			}, false);
			imageLinkColl[count].addEventListener("click", image_click, false);
		}
	}
	
	//not checked so adding
	else {
		if (deletedRatingsIdx != -1) {
			deletedRatingsArray.splice(deletedRatingsIdx,1);
			
			GM_setValue('deletedRatingsURLs', arrayToStr(deletedRatingsArray));
		}
		if (checkedArrayIdx == -1) {
			checkedArray.push(thisURL);
			checkedArrayNames.push(thisName);
			
			GM_setValue('checkedListURLs', arrayToStr(checkedArray));
			GM_setValue('checkedListNames', arrayToStr(checkedArrayNames));
		}
		
		this.src = getImage(pageType, 'check');
		this.setAttribute('checked', true);
		this.addEventListener("mouseout", function(e) {
			this.src = getImage(pageType, 'check');
		}, false);
		this.addEventListener("mouseover", function(e) {
			this.src = getImage(pageType, 'hoverBlank');
		}, false);
		this.addEventListener("click", image_click, false);
		
		if (multi == 'collClick') {
			imageLink[count].src = getImage(pageType, 'check');
			imageLink[count].setAttribute('checked', true);
			imageLink[count].addEventListener("mouseout", function(e) {
				imageLink[count].src = getImage(pageType, 'check');
			}, false);
			imageLink[count].addEventListener("mouseover", function(e) {
				imageLink[count].src = getImage(pageType, 'hoverBlank');
			}, false);
			imageLink[count].addEventListener("click", image_click, false);
		}
		else if (multi == 'listClick') {
			imageLinkColl[count].src = getImage(pageType, 'check');
			imageLinkColl[count].setAttribute('checked', true);
			imageLinkColl[count].addEventListener("mouseout", function(e) {
				imageLinkColl[count].src = getImage(pageType, 'check');
			}, false);
			imageLinkColl[count].addEventListener("mouseover", function(e) {
				imageLinkColl[count].src = getImage(pageType, 'hoverBlank');
			}, false);
			imageLinkColl[count].addEventListener("click", image_click, false);
		}

	}
	
	if (pageType != 'individual' && pageType != 'ratings' && pageType != 'top10') {
		writeTotals(this.getAttribute('pageType'));
	}
}

//write awards page...
function award_click(){
	var awardArrayURLs = GM_getValue('awardListURLs','').split('#X#');
	var awardArrayNames = GM_getValue('awardListNames','').split('#X#');
	var awardArrayRanks = GM_getValue('awardListRanks','').split('#X#');
	
	var imageArray =[getImage('award', 'platinum'), getImage('award', 'gold'), getImage('award', 'silver'), getImage('award', 'bronze')];
	var imageNames =['Platinums','Golds','Silvers','Bronzes'];
	var imageNamesForHover =['Platinum','Gold','Silver','Bronze'];

	var imagePercents = [' (100%)',' (90%+)',' (75%+)',' (50%+)'];
	

	var totals =[0,0,0,0,0]; //used for total of each award
	var grandTotal = 0;
	for (var x in awardArrayRanks) {
		if (awardArrayRanks[x] >= 1 && awardArrayRanks[x] <= 4) {
			totals[awardArrayRanks[x]]++;
			grandTotal++;
		}
	}

	
	//get rid of the plural in case of 1 for the total
	for (var y in totals) {
		if (totals[y] == 1) {
			imageNames[y-1] = imageNames[y-1].slice(0,-1);
		}
	}

	var theString = '<h2>iCheckPopcorn Awards ('+grandTotal+')</h2>';

	for (var rankCheck = 1; rankCheck<5; rankCheck++) {
		theString += '<div style="padding-left: 420px; padding-top: 10px; padding-bottom:3px;"><strong><h3><img src="' + imageArray[rankCheck-1] + '" title="' + imageNamesForHover[rankCheck-1]+'" /> - '+
			totals[rankCheck] + ' ' +imageNames[rankCheck-1]+ ' '+ imagePercents[rankCheck-1]+'</h3></stong></div>';
		theString += '<table class="torrent_table"><tr class="colhead_dark"><td width="40%"><strong>Collages<td width="30%"><strong>Directors<td width="30%"><strong>Actors';
		
		var collageArray = [];
		var artistArray = [];
		var actorArray = [];
		var total=0;
		for (var x in awardArrayURLs) {
			if (awardArrayURLs[x].match(/collage/) && awardArrayRanks[x] == rankCheck) {
				collageArray.push("&nbsp;&nbsp;&raquo;&nbsp; <a href="+site_base_url+'/'+awardArrayURLs[x]+'>'+awardArrayNames[x]+'</a>');
				total+=1;
			}
			else if (awardArrayURLs[x].match(/artist/) && awardArrayRanks[x] == rankCheck) {
				artistArray.push("&nbsp;&nbsp;&raquo;&nbsp; <a href="+site_base_url+'/'+awardArrayURLs[x]+'>'+awardArrayNames[x]+'</a>');
				total+=1;
			}
			else if (awardArrayURLs[x].match(/actor/) && awardArrayRanks[x] == rankCheck) {
				actorArray.push("&nbsp;&nbsp;&raquo;&nbsp; <a href="+site_base_url+'/'+awardArrayURLs[x]+'>'+awardArrayNames[x]+'</a>');
				total+=1;
			}
		}
		
		var rows = Math.max(collageArray.length,artistArray.length,actorArray.length);
		for (var j =0;j<rows;j++) { 
			theString += '<tr>';
			if (collageArray[j]==undefined) {
				theString += '<td>';
			}
			else {
				theString += '<td>' + collageArray[j];
			}
			if (artistArray[j]==undefined) {
				theString += '<td>';
			}
			else {
				theString += '<td>' + artistArray[j];
			}
			if (actorArray[j]==undefined) {
				theString += '<td>';
			}
			else {
				theString += '<td>' + actorArray[j];
			}			
		}
		theString += '</table>'
	}
	theString += '<p align="left"> * Pages must contain 4 or more movies to be eligible for an award.</p>';
	theString += '<p><p align="left">Brag about it in your profile.  Just click "BRAG!", then save on <a href='+site_base_url+'/user.php?action=edit&userid='+getUserID()+'>your edit profile page</a>.';
	
	var body = document.getElementById('content');
	document.title = "iCheckPopcorn Awards :: PassThePopcorn";
	body.innerHTML = theString;
}

//brag on user page
function brag() {
	//brag area
	var totals =[0,0,0,0,0]; //used for total of each award
	var globalTotal = 0;
	var awardArrayRanks = GM_getValue('awardListRanks','').split('#X#');

	for (var x in awardArrayRanks) {
		if (awardArrayRanks[x] >= 1 && awardArrayRanks[x] <= 4) {
			totals[awardArrayRanks[x]]++;
			globalTotal++;
		}
	}

	var theTextAreaBody ='[n][b][url=http://passthepopcorn.me/forums.php?action=viewthread&threadid=8593]iCheckPopcorn Awards ('+globalTotal+')[/url]:[/b]';
	var anS;
	if (totals[1]!=0){
		if (totals[1]>1) {anS='s';}
		else {anS='';}
		theTextAreaBody += '\n[img]http://imgur.com/f9Bzw.gif[/img] [b]' + totals[1] + ' [color=#e5e5e5]Platinum'+anS+'[/color][/b]'
	}
	if (totals[2]!=0){
		if (totals[2]>1) {anS='s';}
		else {anS='';}
		theTextAreaBody += '\n[img]http://imgur.com/51Pw8.gif[/img] [b]' + totals[2] + ' [color=#fdf2b9]Gold'+anS+'[/color][/b]'
	}
	if (totals[3]!=0){
		if (totals[3]>1) {anS='s';}
		else {anS='';}
		theTextAreaBody += '\n[img]http://imgur.com/O165j.gif[/img] [b]' + totals[3] + ' [color=#9b9b9b]Silver'+anS+'[/color][/b]'
	}
	if (totals[4]!=0){
		if (totals[4]>1) {anS='s';}
		else {anS='';}
		theTextAreaBody += '\n[img]http://imgur.com/SmW8T.gif[/img] [b]' + totals[4] + ' [color=#d9b480]Bronze'+anS+'[/color][/b]'
	}
	theTextAreaBody += '[n]';

	var head = document.getElementById('content').getElementsByTagName('h2');
	var button = document.createElement('a');
	head[0].parentNode.insertBefore(button, head[0].nextSibling);
	button.innerHTML = 'BRAG!';
	button.href = 'JavaScript:void(0);';
	button.addEventListener("click", function(e) {
		var lol = document.getElementById('content').getElementsByTagName('textarea');
		for (var x in lol) {
			if (lol[x].name == 'info'){
				if (lol[x].value.match(/\[n\]\[b\]\[url\=/)) {
					var tempStart = lol[x].value.substring(0,lol[x].value.indexOf('[n][b][url='));
					var tempMiddle = lol[x].value.substring(lol[x].value.indexOf('[n][b][url='), lol[x].value.indexOf('[/b][n]')+7);
					var tempEnd = lol[x].value.substring(lol[x].value.indexOf('[/b][n]')+7, lol[x].value.length);
					lol[x].value = tempStart +theTextAreaBody + tempEnd;
				}
				else {
					lol[x].value += '\n\n'+theTextAreaBody;
				}
			}
		}
		window.scrollBy(0,1000);
	
	}, false);
			
}

//used for finding awards (by opening many pages at once)
function awardFinder(){
	var body = document.getElementById('content');
	body.innerHTML = '';
	var openingDiv = document.createElement('div');
	openingDiv.innerHTML = "<p>This page is used to open up all the collages/actors/directors and see what awards you have.<p>" +
		"The alert boxes are setting up clickable links for you.  No links will open automatically until you click the generated links.<p>";
	body.parentNode.insertBefore(openingDiv, body);

	document.title = "iCheckPopcorn - Award Finder :: PassThePopcorn";
	
	var page; // what page to open the collages on
	var thisPageName; // the name of the page for displaying purposes
	var maxNum; // the maximum amount of pages for each specific type of page
	var whichPage = prompt("What type of awards do you want to discover?\n\n1 = Collages\n2 = Directors\n3 = Actors",'1');
	if (whichPage != null && whichPage != '') {
		if (whichPage == '1') {
			page = '/collages.php?id=';
			thisPageName = "Collages";
			maxNum = 725;
		}
		else if (whichPage == '2') {
			page = '/artist.php?id=';
			thisPageName = "Directors";
			maxNum = 12900;
		}
		else if (whichPage == '3') {
			page = '/actor.php?id=';
			thisPageName = "Actors";
			maxNum = 124965;
		}
		else {
			alert("Please pick a valid number!");return;
		}
	}
	else return;
	
	var multiplier = prompt("How many pages do you want each link to open at once?\nI recommend around 100 for slower computers, 200-300 for medium speed computers, and 500+ for faster computers.",'200');
	if (multiplier != null && multiplier != '') {
		multiplier = parseInt(multiplier);
		if (isNaN(multiplier)) { 
			alert("Please pick a valid number!");return;
		}
	}
	else return;
	
	var offset = prompt('What number do you want to start at?\nMost people should pick "1", unless they want to start at a specific number','1');
	if (offset != null && offset != '') {
		offset = parseInt(offset);
		if (isNaN(offset)) { 
			alert("Please pick a valid number!");return;
		}
	}
	else return;

	openingDiv.innerHTML = "<p>I heartily recommend turning off automatic image loading (under Tools:Options:Content) before clicking any of the generated links, otherwise you're computer might blow up.<p>"+
		"I also recommend clicking only one of these links at a time and letting all tabs load completely.<p>";
	if (thisPageName != "Collages") {
		openingDiv.innerHTML += "<p>One more consideration is that for actor and director pages, the higher the ID number (in the URL), the less likely an award will be possible.  Remember, an actor or director must have 4 movies to be eligble for an award.  So for example, if a director wasn't added to the PTP database until two days ago (ie. a high ID number), it's unlikely that director has more than one movie in the database.<p>";
	}
	
	
	var links = [];
	var numOfLinks = parseInt(Math.ceil(maxNum / multiplier));
	for (var y=0;y < numOfLinks; y++) {
		links.push(document.createElement('a'));
		links[y].innerHTML = '&nbsp;&nbsp;&raquo;&nbsp; Open All '+thisPageName+' in Tabs -> '+ (y*multiplier+offset)+' - '+ Math.min(((y+1)*multiplier+offset-1),maxNum);
		links[y].href = 'JavaScript:void(0);';
	}
	for (var a=0; a < numOfLinks; a++) {
		links[a].setAttribute('num',a);
		links[a].setAttribute('multiplier',multiplier);
		links[a].setAttribute('offset',offset);
		links[a].setAttribute('page',page);
		links[a].setAttribute('maxNum',maxNum);
		links[a].addEventListener("click", appendLinks, false);
	}
	
	var aDiv=[];
	for (var z=0; z<numOfLinks; z++) {
		aDiv.push(document.createElement('div'));
		aDiv[z].appendChild(links[z]);
		body.parentNode.insertBefore(aDiv[z], body);
	}		
}

//helper function for award finder function
function appendLinks() {
	var num = parseInt(this.getAttribute('num'));
	var multiplier = parseInt(this.getAttribute('multiplier'));
	var offset = parseInt(this.getAttribute('offset'));
	var page = this.getAttribute('page');
	var maxNum = this.getAttribute('maxNum');

	//used so you don't open links past the maximum number
	if ((((num+1)*multiplier)+offset) >= maxNum) {
		for (var x = ((num*multiplier)+offset);x <= maxNum;x++ ) {
			var url = site_base_url + page + x;
			GM_openInTab(url);
		}
	}
	else {
		for (var x = ((num*multiplier)+offset);x < (((num+1)*multiplier)+offset);x++ ) {
			var url = site_base_url + page + x;
			GM_openInTab(url);
		}
	}
}

//function to import/export your data
function backupRestore(){
	var body = document.getElementById('content');
	document.title = "iCheckPopcorn - Backup/Restore :: PassThePopcorn";
	
	body.innerHTML = '';
	var textArea = document.createElement('textarea');
	textArea.cols='60';
	textArea.rows='9';
	textArea.value = '';
	
	var button = document.createElement('input');
	button.value= 'Import Data';
	button.type='button';
	button.addEventListener("click", function(e) {	
		var answer = confirm ("This will override existing data.  Are you sure?");
		if (answer) {
			var backup = textArea.value.split('#-#BIGSPLIT#-#');
			if (backup[0] == "reset") {
				resetVariables();
				alert("reset variables ZOMG!");
			}
			else if (backup.length != 8) {
				alert('Invalid Data.  Sorry :(');
			}
			else {
				GM_setValue('awardListURLs',backup[0]);
				GM_setValue('awardListNames',backup[1]);
				GM_setValue('awardListRanks',backup[2]);
				GM_setValue('checkedListURLs',backup[3]);
				GM_setValue('checkedListNames',backup[4]);
				GM_setValue('deletedRatingsURLs',backup[5]);
				GM_setValue('ratedListURLs',backup[6]);
				GM_setValue('ratedListNames',backup[7]);
				alert('Restore Successful.');
			}
		}
	}, false);
	
		
	var openingDiv = document.createElement('div');
	openingDiv.innerHTML = "<h3>Copy/paste and save this data on your computer for backing up:</h3><br><h6>"+
		GM_getValue('awardListURLs')+'#-#BIGSPLIT#-#'+
		GM_getValue('awardListNames')+'#-#BIGSPLIT#-#'+
		GM_getValue('awardListRanks')+'#-#BIGSPLIT#-#'+
		GM_getValue('checkedListURLs')+'#-#BIGSPLIT#-#'+
		GM_getValue('checkedListNames')+'#-#BIGSPLIT#-#'+
		GM_getValue('deletedRatingsURLs')+'#-#BIGSPLIT#-#'+
		GM_getValue('ratedListURLs')+'#-#BIGSPLIT#-#'+
		GM_getValue('ratedListNames');
	
	
	var aDiv=[];
	for (var z=0;z<6;z++) {
		aDiv.push(document.createElement('div'));
	}		
	aDiv[0].appendChild(textArea);
	aDiv[0].appendChild(button);
	body.parentNode.insertBefore(aDiv[0], body);
	body.parentNode.insertBefore(openingDiv, body);
}

//convert arrays to string for GM storage
function arrayToStr (theArray) {
	//get rid of blank elements in array due to lousy programming :(
	var tempArray = theArray.filter(function(value) {
		return value!='';
	});

	/*var theString = '';
	for (var zz = 0; zz < tempArray.length; zz++) {
		theString += tempArray[zz] + '#X#';
	}
	return theString;*/
	return tempArray.join("#X#");
}

//get userID
function getUserID(){
	var getUserID = document.getElementById('userinfo').getElementsByTagName('a');
	
	for (var x in getUserID) {
		var tempURL = getUserID[x].href;
		if (tempURL.match(/user\.php\?id\=/)){
			var userID = tempURL.substring(tempURL.indexOf('=')+1, tempURL.length);
			GM_setValue('userID', userID);
			return userID;
		}
	}
}

//used to get the images
function getImage(pageType, imageType) {
	//check images (generated from: http://software.hixie.ch/utilities/cgi/data/data )	
	if (pageType == 'award') {
		if (imageType == 'platinum') {
			//return "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7%2F2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7%2FwAARCAAlAB4DASIAAhEBAxEB%2F8QAGgAAAgMBAQAAAAAAAAAAAAAABwgABAYDBf%2FEADQQAAEDAwEFBAcJAAAAAAAAAAECAwQFBhEABxITITEIIkFRCRUWYYGRsRcjJkJSZXGy0v%2FEABYBAQEBAAAAAAAAAAAAAAAAAAABAv%2FEABcRAQEBAQAAAAAAAAAAAAAAAAABIRH%2F2gAMAwEAAhEDEQA%2FAHDqcxinU6TUJSt1iM0p1w4zhKRk%2FTWViUyozHHJ1bq1QW68d5uLGkrYZip%2FQOGUlZ81LJOc4wOWtJcED1pQ51OCggyWFtBR6AkEA68ONV2XUlLyCxIb7rzCj3m1eR93kfHQVONJtipMy3qvKkUWS81GcYlrLpjuOLCELQ4crIK1JSQokDIIxg52uhvc0xu5KhCtKmAvvqmRpU9xBBTEjtPJdJWfBSy3uJHXKs4wk6JGg4SJsOOvckS2GlYzurcCTj46Hm1Gow0T4MuLNjLcDLjat15OMFSTz5%2B766VvbTdG0m7u09cdpWJW1NIiFLTTRUEoTwmkBzJwfzlWq32e9pfez7Qsfx6wRj%2BuriabPYvVaGza8iA1NgtyI854yPvEBS1OLLoUo57xwvG947uiBHfYkIK47zbqQcEoUFDPw0hLth9pWMy4%2BqvtLCEFRAmpWSAM8hu8zom%2Bj%2Fvuv3Mq8KPcdTcmvxFRn2C5jeAVxErHLwylHz0w0u1yOXDR9r1z3PRrgXBqMmqTCtaI6VDC3lEpwokEdOo8Bq17f7Uef47e5ft7H%2BdTU1eRntcpd77TJUd2M%2FfL6mlpKFgQGRkHkeYGdb7sSxJlu7UKvJYnB7j0ZxK0KbwCeOyQrr16%2FPU1NOEtf%2F%2FZ";
			return "data:image/gif;base64,R0lGODlhHgAlAOf1ANPT09DQ0GxsbJqamre3t%2Brq6uTk5NXV1b%2FDyO7u7uvr67i4uPn5%2Befn57q6uvHx8ba2tqivtsnJyfLy8lNTU4iIiLGxsauvt6uwt7Kyst7d3TE2OP7%2B%2Fqenp%2B%2Fv7%2Fv7%2B4%2BPj6moqMfHx7m5uXR0dOHh4aampuPj48TExImJiYWFhd%2Fe3vb29rS0tHh4eMzMzMrKyqGhoaettK6urpaWlsXHzZCQkC0tLaqwt8HEyMXFxcvLy%2BXl5TU1NYCAgAgLDUZGRqyxuS40Nnt7e6Ojoy0yNUpKSlhlalNaX9LS0pmZmQQGBzI4On9%2FfwkNDgMGBwcLDd3d3fr6%2BrS0tbOzszA1NgUICqyyuQkJCgkOD8bGxqqutoeHh19scV1rcVpobMDAwHJycm5ubjI4OaalpQoOD0lJSQUICJOTkwQEBCkpKUxMTbCwsFVdYlZcYKmvttfX1%2Bbm5nd3dwIFBgkMDoOGh9ja3mNvdScpKiwyM7W1taeutQMGBgYKCgYGBqeutDE1OB4eHh8fHwkNDwIFBRgYGF1dXcHEyauxuVtoblVbYK2trVRcYC82OFZbYPf39%2Bjo6AUICcPGy8nN0CwxNKmutcXIztbW1i0zNioqKmNwdXp6elZWVpSUlAUFBi0zNFxeXlVcYPj4%2BIyMjDc3N8LCwru7uzo6Ounp6f7%2F%2FvPz8y80NgcLDHNzcy81N4GBgTA1OAcHB7y%2FwlFTVKurqyUmJy4zNf39%2FYiIidHR0c%2FPzwYGBysxNFliZpeXl19fXzI2OPT09NLT0zc8PuHg4FpobZWVlVlna1ZeY8THzGBscrGwsJ2dnQcLC6mrrNjY2L6%2BvsbJzfn5%2Bs7Oz6Chodra2oODg7a5vM7OzsHFyc3NzYuLi5ieop6enqCgoDI3OZGRkauvtubl5d7e3t%2Ff387P0BwdHvDx8gMHCODg4DI2OS41N1BQUFRbX6SkpCwyNL%2B%2Fv1hhZVpnbPDw8AAAAP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEAAP8ALAAAAAAeACUAAAj%2BAP8JHEiwoMGDCA0OqWDDRoUhCSMO7KEiSoKLCaKo6CERoYsF80KKDLmARMeCSrSNXDlvR4qTA6GxZKkH5j8fBmauLGEEZpMHOlcCgTkKaFCRFGCCm3AUKUxjqpqGHHpSCSSjQcfdsAkhgYICYMOKbWLzXwwtqOLwMMC2LQ8iW8uy0SGO2AoNeFekI8Op7EAiFpLAOUBYAhczfglK8BbgxYtSpAYkLlhBAgoUKTZNLkgDjAMHtAxtJthhRIbTLkYPbLEshGsaqgWOmNGhg4kY7mJbMAUBQosZrWBGqyHpUA4EyK91QwMCxDY5FOogz5EtWY1JBmVcwHCh0p4IEXD0BEG0%2FUqQN%2BD%2FbMGBIZyMgkeOfJGnTFOiNkhCOWLUK147N4oggYwXd3RxTDHxEYRHH3T8UMYgUESyBB%2BEoMNKM0%2FM8cQSVkCRhRM%2FOHEGKASlQc%2BJKKao4oooqkEQizDGSA8WAwmBYiZhCKDjjjz2KAA7saBYI4q%2FLALAkUgmqSQAJBSCohAC2XiiD8%2FkEsCVWGaZpS46CPKkQOag6AsVDhBg5plongmBBWIE8uU%2FnqB4ignMDGDnnXje2Yk1RviBYi0CySjoirv8M%2BihKg4DiBBMVKHOJ7Zs4EoR7zTCBC%2BYfLMOJUXAAkweq2ywwRhCDDNMQAA7";
		}
		if (imageType == 'gold') {
			//return "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7%2F2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7%2FwAARCAAlAB4DASIAAhEBAxEB%2F8QAGgAAAgMBAQAAAAAAAAAAAAAABwgABAYDBf%2FEADAQAAEDAgUDAQUJAAAAAAAAAAECAwQFEQAGEiExBwgTFBZBUYGRIiZDZHGhpdHS%2F8QAGQEBAAIDAAAAAAAAAAAAAAAAAwACAQQF%2F8QAIBEAAgMAAgEFAAAAAAAAAAAAAQIAAxEEEgUTITJRcf%2FaAAwDAQACEQMRAD8AcSoy2KfT5M%2BUsojxmlPOqAJslIJJsOdhjLx6bUJrrs2tVWepx1WpqLGkrjtRU2H2AWylSztcqWTuTbSNsaOuQjUqJOpwWEGVGcZCiLhOpJF7fPHhN1mOQpEhJjyWzpfYWRqaVbg%2FEfA8EbjHJ8m9i9epwTZ46g79ysl6TlqosyHqtKkUaU81FUxKUXVRnXFhDa0OG6yFLWlJSskC4IKQCDssDjMM9rMtTgZVpIMh8Tosye6ixRDYZeS9dZvspwteNI5uoqtZJwR8N45rGqJc%2FkreAGnN19lo2debQebKUBgVdfKgI6KVKp7zbkgB1tQQ4L6SUHf5j9zhbutub%2Bp%2Bau57MOT%2Bn%2BYX2mYmhplgKSlCPGyjy3Nj%2BIV84qew%2FdBe%2FtN%2FII%2FzheXZSV9N3wytIsB7BdjV9v1WpTmQvRNPR2pcWY%2BJaSpIWVrWXApXvNwsDUedJwSG3EOJ1NrSscXSbjCEu5N7n4zLkhWZFLDaCogTULJAF9hp3P6YJ%2FYB1AzJmxnOFKzNV3Kg9CXFfjeW2sBYcS5wOAUI%2BuE49lbJ1RtyVsVw2sM2Lpm1eYKN1nzXmei19dPqMirzipbbAVYLeUSmyiQRxyPcMWD1C6pi%2FwB%2FpO35Fn%2BsTEwzUVudZQYQtdRgM5TM9dTZcV6NIz5JW04koWn0bQuDsRcDBI7DqbIonVesPIm%2BZD1DcC21N2BPnZsrnkb%2FAFOJiYytSJ8RkhsZj7mf%2F9k%3D";
			return "data:image/gif;base64,R0lGODlhHgAlAOfVAAAAAAABAxQHABwPABUXGCkiCCEiIy8hCyUmJzcqEzwsFCkwNCowNCoyMysyNSszNywzNSw0NzwyHS81Ny81OS43OTA3OTI3OzI5PDg%2BQU48HlJAI1REHF1JJVxNFF9LK1NTVG1WMGxbMFpcXVxlbF9mbV9obWBobV9pb2BqcX9pKmhqaoNtIGRvdYVvLGNzeodvSGR2e2V2fGV3fot1J4xyRot1O2l7g453UW18hJB6QI15VJF7TXGAiJZ7TnGCiJR%2FWJZ%2FV5qCSpmCT5mDXZuDWJSEZZ2FQZqEXJCHdZ2HYJuJX6SIWJ2MXaKNZaaNY6qNXKaOZaaOaKqSPaSSX6iRaq2UYJqXjK2VaZeXl7GWXLSVZLGXaraabbibY7ObcrmdY6Cgor2earifdbygZbmidaujl72mU8Gjc8Kmdb6ner%2BnecGqaMerbsWtgMexZbmwosuxccuzf8yzhNG1hNG5btC4ibW9wtW6i9W9cte9jr%2FBwd3Cd9zDlN7Fid7FkODFlOXLlsvOz%2BTMmubMm8jQ2ebOl%2BnPh8jR28vR28zR3OrQm8rT3MvT3M7T3M7T3czU3c7U3c7V4O7Tl%2BrTo8%2FV4O7Vp9zYz%2FDXotnZ2%2BHZyPLYo%2FfclfjbnvTcp%2FPcq%2Bves%2Fnemfveo%2Fzeo%2BHh4fzgo%2F3hpvTlzOTn6%2F%2Fmrf%2FnsP%2FpsP%2FrtOft8%2Fjtxfvr0eru8%2F%2Futuru9Orv9P%2FwuPPv6e3w9%2F%2FyuP%2Fzue7y%2BO%2Fy%2BfTy6%2F%2F0uf%2F0uvby6%2F%2Fzyu%2Fz%2B%2Ffz7fD0%2Bf%2F3vv%2F3wv%2F7wfT5%2Ff%2F9yP%2F%2Fw%2F%2F%2Fx%2Fv7%2FP%2F%2Fyv%2F%2FzP%2F%2F0P%2F87v%2F%2F0f%2F%2F0%2Fv8%2Ff%2F%2F1%2F%2F%2F8%2F%2F%2F%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEAAP8ALAAAAAAeACUAAAj%2BAP8JHEiwoMGDCA0aaUKFShMjCSMOTLDk1rKLy24tSSARoQ4%2FGEMu82OjY8EzoUSK5DTF5MBDzFSK5OPy35BiMkXy4uAySLOcIjW4fPITKMYPLrE8M3rUJRdpMZkKNdmlWVGgtA7U7AMtGbKvYMMGqfkPjaVjw3rhWru2V681WsnSoUQslqpUeFexUoOUrMA0dj55woRp0yAkG%2FwSPDWGECBAeBTAUVywiJ45c3AkoVzQipsyZbCI4EyQzZcoqF2QHljHCZDXR1YLzKNkh20eb2TH%2BVKlihQiKlwK02VLFqxWyC%2BJsQIFCpMaHa4ghzUrly5jBgs9ivQoESJGjCDfVZK0vVKlRuARKYIUyVGhgiRezJCR48cMFCRMlDDRokWJEyWQkMINPeQQwwwvkEAQAgAE4KCDAEQYYQASSvgghCsQVOGGHHYoIQIaeiiihwNNIGEBNLCg4oostsiCBxWWKGEIcnRi44045tgJDAJIOIFAJkboAyumlGLkkUgeOYookwzgo0AESLgFIIsYYuWVWF4ZyB8wOBnhj%2F9UKEEbZIBh5plomumFFkJwUKEBAo0oZ4dhzmlnhRlQEAEGE1wAAQQWUOBAAxVgsMADF0TAgAMUXNBABBZYgEEEGWQQEAA7";
		}
		if (imageType == 'silver') {
			//return "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7%2F2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7%2FwAARCAAlAB4DASIAAhEBAxEB%2F8QAGQAAAwEBAQAAAAAAAAAAAAAAAAcIBQIG%2F8QALxAAAQQBAwIEBAYDAAAAAAAAAQIDBAURAAYSITEHE1FhCBUiQSQlNWKBk6Gx4f%2FEABYBAQEBAAAAAAAAAAAAAAAAAAABAv%2FEABURAQEAAAAAAAAAAAAAAAAAAAAR%2F9oADAMBAAIRAxEAPwCvb%2ByZp6SbaSOPlxWVOkKVx5EDonPqTgD3Op7urK6v5Tsm4tZiw455iIrT6m2GOmAEpSR2H3OT39dPnfFSq92jZ1SOXmPx1BoJIGVj6kjJ6Y5AZ9vTU9Lf8pxbMhtbD7aih1pYwpCh3BGg9LsLdVpt68isy7R%2BVTyHG4zjUx8qEbKglK0LVkpAJGQTjHpjIfOplqIK90bhg7fhtOvc5DTsxbWPw7CFhSlEnoCQMD3I6HVNaDPm3lJCkKjzLivjPJxybdkoQoZGRkE50jvHeXVzN1xJdbOhPpMMB1bDqVBSuZ7kHvgDv9saUfilb3194y7giU1l5jaJS0tHnlPBGB0PXI9PbGsr5HvzP6g3%2Fd%2FzQUr8P9%2Ft2FtKRXyZ9VDmR5aw4tS0NLeQolaVKUT9ZHJSc%2FYAfy06%2ByrrELNfPiTA3jmWHkucc9s4PTsdQsql34hKlmeg4Gcebk%2F602fgyv7Kbfbgq5soupEdDwSQM5CuPf2z%2FnQI2wM6NuewsIs5TL7kh0lSUZ6FRJHXXfzncPX86c%2FqTo0arNcu2t%2B42ptdy6UkYI8tIyNbXhK27B3DJcQ9z5xVAgp%2Fenr30aNFr%2F%2FZ";
			return "data:image/gif;base64,R0lGODlhHgAlAOcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4%2BPj8%2FP0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5%2Bfn9%2Ff4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo%2BPj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp%2Bfn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq%2Bvr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6%2Bvr%2B%2Fv8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs%2FPz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t%2Ff3%2BDg4OHh4eLi4uPj4%2BTk5OXl5ebm5ufn5%2Bjo6Onp6erq6uvr6%2Bzs7O3t7e7u7u%2Fv7%2FDw8PHx8fLy8vPz8%2FT09PX19fb29vf39%2Fj4%2BPn5%2Bfr6%2Bvv7%2B%2Fz8%2FP39%2Ff7%2B%2Fv%2F%2F%2FyH5BAEAAP8ALAAAAAAeACUAAAj%2BAP8JHEiwoMGDCA2aWePGzRozCSMOrEKn0qaLmyrRqSIRIR1FnUKKDKlITseCgSZ9WsmypaQ9Jwc6AkWzpk2aimL%2B%2B9Pppk9QnNzE3BPqp080MfMUNWpzTEw9S5nSBDNUlNSaW2L26RTVaCYoOhOB8kS2rFlPJnUCesRpk6a3cN8CAqvzn6FGmS5ZqsTXkqU%2FVOsKDFQoUiRIiBnN4SKYYKQ%2BjBQpMlTFT%2BOCcxAVKvTmzWXMmgv5sfKZYJ7QhQKX%2FncINczV%2FxIpOkR7kOXVhSA52s0I6clkx4wRIzaseC5Pkx49WnRnSqHiw48dY2aQ1avrrVq5cvUqFqzrsWLjbXel%2FforVgXHjClTRo0bM1yybNGyBcwX%2BlqydEHTRg2ZMuoRlEICDCzQAAMKHGBAAQQYoIACDBZgAAIKHLgAAwd4QRABAHTo4YcghuhhCgSJaOKJACQw0AweqkCHHDDGKOOMcpBxgIcrevjFIZL06OOPQEpCBwYeziAQix0CcgklkzTp5JNQPvJBkQJ14OElijjCyJZcdtmlIm14QOU%2FBXioAx942KHmmmyuOYcaVBjgoQkCoWhniAb8c%2BeeIO5Awww30FCDDDLUQEMMMdRwAwwy2EADDDEIGsMMNSg6ww47BAQAOw%3D%3D";
		}
		if (imageType == 'bronze') {
			//return "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7%2F2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7%2FwAARCAAlAB4DASIAAhEBAxEB%2F8QAGgAAAwADAQAAAAAAAAAAAAAAAAcIAgMFCf%2FEADMQAAEDAwIEAgYLAAAAAAAAAAECAwQFBhEAEgchMUEIExUiUXGBkQkUFiZCUmWxssHR%2F8QAGQEBAAIDAAAAAAAAAAAAAAAAAwABAgQF%2F8QAIREAAgMAAQQDAQAAAAAAAAAAAQIAAxEEBRIhMRMiMoH%2F2gAMAwEAAhEDEQA%2FALCq06PS6XKqUteyPFZU86rGcJSCT%2B2kjPrFw1Sc%2FMn1yoNBxZLMWLIUw1HT2SNhBWfapRPPOMDlpzXPTfTFu1GlBYQZcZxkKPQFSSAfnpGT3zEkOMy2lR321bXWln1kK9h%2Fo99cvqT2LgU%2BJvcJUYnu9zvWfdVToVdjtVSsyZlHmPNxiiWrzFR3XFhCFJcPrEFSkpIUSBkEYwcubU50xhy6rmptv01tTuyZHmT3k80xWGnUu5UeyllGxI65VnGEnVGabp7O1ev%2FACHy1RX%2Bs0SJsOOvZIlsNKxnatwJOPjpIeJiS04qkSaY%2By%2B%2BEuIUG3AfVJSeePdpAcd7y4h3F4lbltqzK4thiGpDTbWQEI8tpAcycH8ZVrh%2BhOP%2B7P2oR7vrXL%2BOk5T0lfjdsMOkWBu9V2Vz4bq1Rxw6TTzIhxpkOW8mUlSkoWpS1FwKV%2BY4UBu77dNSO%2BxIQVx3m3Ug4JQoKGfhrzwXSePzDa3jcyVhKSSBI3E49g2czpzfR%2FX5X7nN4Ui4qm5NfiqjPxy5jcArzErHLtlKPnpKHrZO1G3JjYrhtYZsnO6hXabxbue5KXXlQ58mqTFLWmOFDC3lEpwokEdO3YazN3cROf30c5fp7P8AmjRpWprY6ygwhY6%2BAZrlXRxAkx3Y715OKbWNqgILQyDyPMDTG8EkSZbnE%2BryWJweD9GcStCmsAnz2SD169fno0ata0T8jJC7N7M%2F%2F9k%3D";
			return "data:image/gif;base64,R0lGODlhHgAlAOf%2FAMbJzlhlaqKLZm5bLCcoKVpobYFsSayxuQgMDl1rcXhkQy40NgYJCVNaX6eutVliZr2ecy0yNYVpRndbOwQFBTI2OVVcYFVbYDI4OiEXBjA1OLKRY3FgJLKWa7aWaZuFWMeleb%2FDyMiqfaivtsCfc%2F7%2B%2FoNlQ6uvt3lcO6uwt8jFwDE2OLqec45zUDAlFPn39UIyG%2Bvm2IBxTvz58fv37DYsGtXT0IR0Tvb29E07IsGhdcyrfq6OZnRgQe%2Fv76KGWo5wTINnRqettMCgdH5yWsHEyM2sf5l6VMXHzbq0p6SEXbiXbKqwt495U7aZbsaofWNvdfLy8isxNKuxufLy8Kmvtp6GXo99Oy82ONra2tGwhJCKgaePa8vIwzoyIr%2BgdczDpPDr251%2BWOfj3LazrHxoR8PGy7GcYYx3VNW3jCwyM%2B%2Fq2redd%2BPd1LiYa6ChobKZYcnN0JmDYJN7WfDx8pN9VsHEybaVaHJfMkw%2FIoOBeFZeY5qEWHt0ZrqZbmBscq2NYGBOMefh16iLZC0zNq%2BPZ6uMZZuUiZ6MTNLIqMKleE9QUV9SMVxeXqmrrMK4lt%2Ff35ieoqmutU5AIFREKK2WccGgdKaQYamTYauTa4NrNc7OzzA1Nry%2FwhsRA87Crvn5%2Bvv7%2B8SkeSsmErS0tbq6uoJwSdfTyIGBgYiIibGUacnHwo95T8rHwvn49It1UFNHG451UoNwRdC1jZ2IWnFeKqeNU6KEXgMGB%2BTe1OTg1pWAU%2Fn5%2BTouG%2BHb0uvm39LT06CKV3BaPKaVWq2XXXdmKrWYYs7P0IxxT9ja3oxyT%2F39%2FY5xTpJ8WJd%2FWff28vT09Ovp421WNsemetKyhmZQMcqpftK0inBYN9PPxEs9J089JDc8PlVdYribZVZcYBwdHqqutmNwdauvtsisgrGXbrOUbHpfOVpnbLmYbbqab5d7V7aWaJh9Vcuug8HFyayOY%2Bfg1vHw7%2Bfh1v7%2F%2FtCwhIdxUNGxhfj4%2BJh7ViwxNMm9qi4zNcyqfQAAAP%2F%2F%2FyH5BAEAAP8ALAAAAAAeACUAAAj%2BAP8JHEiwoMGDCA0SkXHjhgwiCSMOrNGDhYiLIlj0qCERIZ4f%2FUKKDPljQMeCiLyNXNnP2JWTA%2BEYYbnSFsx%2Fpp7QXDlkEswyWnauhAHT3j2hI3PARENtB9KQSk82SzPzKdGTcmbVcyoUgoubla5ZmwairFmzwm7%2BE8DGnSgdJOKSGGJJh7KvajOxIffFz5Il6dRBiLVN7UABXNiY48Gj0CAF2gwT3DfHkBIlYnodklzQwK0jR7D14VyQVT4gQCQwIk0wGDMTsGuxHkhMAorbmmYLPBNkgu9zw3RjWteiBbIgJk8CQGLGTpEQ0MlYqdOkySsFlPRAL%2FIOCZI4BoX3nEhxQpKDESOYHJgy%2FsCBKugdhGOSYpyQggECFED3R1yBbg1YcIEFDzxwwTcXNLBHAlD8gU4B%2BRFEAAMIVFghA7jgQgEuCGCYIS4UWthhIwRR4M%2BJKKao4oooEkAQizDG6A8DAy2A4ijFcKDjjjz2yAEsJp5YI4qBtLPBkUgmqeQG1XiC4gIC2XiiAYq44cGVWGaJJTt3AJLBkwKBg6Iz5TjRwZlopommKvBI8%2BWJUP4TpD9eXELLB3jmqSeefOwiSx5zuviPjISuSMGghSaa4gIaLIABJxXww88KGkSgBhYYSEFIBQvoE4EGFaixwAorYLAANwsEBAA7";
		}
	}
	else if (imageType == 'check') {
		if (pageType == 'individual') {
			return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAgCAMAAACijUGCAAAAAXNSR0IArs4c6QAAAvpQTFRFyXmH1dXRra2pNDQ0CAgIjSk9mZmWBAQEKysrMDAwqqqn7%2B%2FqfHx6S0tLQ0NDhYWFg4OBAAAAfn58dHRzbW1qoR86EhISmUhZTk5NDAwMuLi4nJycnZ2dubm5mpqam5ubcHBwgYGBnp6et7e3n5%2Bftra2oKCgJSUlJiYmKCgoJCQkU1NTUVFRc3NzUlJSVFRUoaGhoqKiDg4OdHR0o6OjtbW1paWlra2tKSkps7OztLS0srKysLCwq6urT09PqqqqLCwsrq6up6enr6%2BvpqamqampTk5OLi4u8ObieHh4eXl5R0dH6MrLMjIyenp6fHx83KCoRUVFSUlJ8u3o1ouXODg4Pz8%2FPT097NjXe3t7Ojo6PDw8uSJB6OjjNjY22JKdQUFB2NjUTExM7t%2Fd5LzA8vLsxUxjvTBMjIyL8%2FPt4K60zs7L3qeuzMzK0tLOyVpvwT5Y4%2BPftWR15sPF2pmjtWV11NTPcnJxtmV24uLetWR0tbCx7e3nq6uo19fTy8vIw8PAfX18nJyYwcG9Xl5dgICA4%2BPevLy6z8%2FLU0hLo6OfyMjGyMjH0NDNurq53d3ZmpqY6urlNDQy1dXSsbGxwsK%2F4uLd6tHR2dnWrq6t39%2Fbubm2tGN0UFBQ5eXg5ubh5%2BfixcXDsLCst7e1dXV0jY2Nj4%2BP2dnVycnHqamotXOB09PO0dHN4ODc4eHd1tbSwsLBtra139%2Fa2trWxsbDurq4zWh74ODb0ICOuTZQw7m3ua%2Bxt3aD0I%2Baxaeph4eEXAwccXFvSEhHump6pqajgYF%2Bv7%2B7uJ6jiYmG4rW6ISEhto6WYGBe2crJoiA6t2t6tbWyGA4Q4dzZtX2JcD5IgjFCycnEy8vHqxQzrxg3fnl60XaGgYGAlZWRlCY8wMC%2Fp6ekvLy4TEJEx8fDtmZ2tIKMOjo5xcXBg1pij4%2BMs4CLsKusoKCdtoOOtLSxhISCt7eyXkpOxnaE29vW0dHMl0xb6OjiwMC8wcG8pKSh1ISRtRQ1urq69PTuQEN2EQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2goUBRAeXLygWQAAAcRJREFUOMt9lLtLA0EQh1eNJjFe8BniX%2BAjwYCVlViZQE5QQQ16qIjeQZpY2VkYbEwl6dMEO3tFKxUREREEn4XiAxRBUFHwcRw4s7tzSYrcVxw78%2Fu4m9uFZYx5G8riYcSRP1KWoU7GTIAF4iEHcjtcYu4uBz5OhMTc4fKcXQsHrF6bcGPt5fr642%2BTrM%2FBuRLDu%2FuJw01LUrGEdTVILafSmhFEfqwiKnMrLSDdrrRKS%2BGEFqwStlGqVhSyhjnfpVJsHiXokxVH3kolS0cJA7KGgPhnqbQB0tYDJmT5gTX4xpSuq1KaAsmILWNC1jSwb6ka7vIgl2ZhpanWCyZkjQLPlmqYpMU0sVjEhKwxYEH%2BlWmqYvIU2AeYkDUBfNHPm1pMDAWNe0zIGgcOcJwEH03H5yzWd5i4pDUCpPnUSVOS4mU9BE9kTQLLYgdSQtISWMztYUJWFXLBrYSw%2FniR5wFZA8hxYc9Ngy99Cg%2FI8nJW7ZcZ4gQaRZ%2BsKMebF9v%2BlxRvrRHtKFl9kpui0%2FbVUZcsDxF8l87cot9uktVT4Gn3NZNJN1cVtchq73DCthwhq80Rt7CCgU4HAll552Rd3WVxyavpH3zJ2EgumktsAAAAAElFTkSuQmCC";
		}
		else {
			return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA%2BUO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oKFAsWNazE05UAAAJESURBVCjPjZJBSJNhHMZ%2F77dv6pxRynChc1OckrPpRAdpBAV67BBdIjyEihV4iCgiukQFdctjnaJuBd27ZJca1XTiSK3NQqeFNDalfaKb3%2Fu%2BHVRC6tBzf3ie%2F%2F%2F5ieHhC28nJ6eP27bN%2F8g0TdpbW9%2BJUCikw%2BGwVkoJAKUUpumgrKwcgGKxiJQSYRgAuEtSH51ZEaYQglKpJKSUaK3x%2B%2F1EIp34fD601mQyGWaSSVZWvlNX2ObkwrrIF0uYSils20ZKSTTaw9DQEH5%2FYF%2B9VDrFq3sPORyLk%2FW4eepax1BKUSqVqK%2BvY3h09C8TgGf1Fx3vv7JUZfC6wcWG08CQUgLQGYlwcPkn8fNXWHz2EgCNxlpcJnHxFocibdhnT2EJjZJyJ9EwDHwNPrZWc6x9SPJp7C7fnrxAIEiO3QEEzddGCPZFMcTuA%2FduVLZN7Zl%2Bmn%2Bskr7%2FmLmrDyjMplmLJQjevMSBaJjtdBLblsi9RMuySKUWAGi%2BPEjNiR6Ew0Hm0XMOdrfTPDYIQDq9gGVZf4ybm5vEYjHm5mYBaLkxSnltDVWhIMHrI5guF4nEFPH4R4rFIkopHG63%2B3ZlZSW5XI6lpSWamhpp7AhT0xak8dxpqvu6mZqaZHx8nPn5zwgh2NjYQHi9Xu3xeFBKoZQiEAjQ1RWhJXQELRWp%2BS9MT0%2BTyWRwOBwYhkE%2Bn0dUV1drr9eL1po95IQQVFTsILe1VURrjbGLnBCCbDaLOTDQz8TEG5xO577RC4XCPyG3bZve3mP8BlkiEm1onjOnAAAAAElFTkSuQmCC";
		}
	}
	else if (imageType == 'hover') {
		if (pageType == 'individual') {
			return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAgCAMAAACijUGCAAAAAXNSR0IArs4c6QAAAvdQTFRFCAgI1dXRjSk9h4eHmZmWBAQEKysrMDAwqqqn7%2B%2FqfHx6S0tLyXmHQ0NDhYWFg4OBAAAAfn58dHRzbW1qoR86EhISmUhZTk5NDAwMuLi4nJycnZ2dubm5mpqam5ubcHBwgYGBnp6et7e3n5%2Bftra2oKCgJSUlJiYmKCgoJCQkU1NTUVFRc3NzUlJSVFRUoaGhoqKiDg4OdHR0o6OjtbW1paWlra2tKSkps7OztLS0srKysLCwq6urT09PqqqqLCwsrq6up6enr6%2BvpqamqampTk5OLi4u8ObieHh4eXl5R0dH6MrLMjIyenp6fHx83KCoRUVFSUlJ8u3o1ouXODg4Pz8%2FPT097NjXe3t7Ojo6PDw8uSJB6OjjNjY22JKdQUFB2NjUTExM7t%2Fd5LzA8vLsxUxjvTBMjIyL8%2FPt4K60zs7L3qeuzMzK0tLOyVpvwT5Y4%2BPftWR15sPF2pmjtWV11NTPcnJxtmV24uLetWR0tbCx7e3nq6uo19fTy8vIw8PAfX18nJyYwcG9Xl5dgICA4%2BPevLy6z8%2FLU0hLo6OfyMjGyMjH0NDNurq53d3ZmpqY6urlNDQy1dXSsbGxwsK%2F4uLd6tHR2dnWrq6t39%2Fbubm2tGN0UFBQ5eXg5ubh5%2BfixcXDsLCst7e1dXV0jY2Nj4%2BP2dnVycnHqamotXOB09PO0dHN4ODc4eHd1tbSwsLBtra139%2Fa2trWxsbDurq4zWh74ODb0ICOuTZQw7m3ua%2Bxt3aD0I%2Baxaeph4eEXAwccXFvSEhHump6pqajgYF%2Bv7%2B7uJ6jiYmG4rW6ISEhto6WYGBe2crJoiA6t2t6tbWyGA4Q4dzZtX2JcD5IgjFCycnEy8vHqxQzrxg3fnl60XaGgYGAlZWRlCY8wMC%2Fp6ekvLy4TEJEx8fDtmZ2tIKMOjo5xcXBg1pij4%2BMs4CLsKusoKCdtoOOtLSxhISCt7eyXkpOxnaE29vW0dHMl0xb6OjiwMC8wcG8pKSh1ISRtRQ1urq69PTuhGTmfQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2goUBjE7mWHfpAAAAexJREFUOMt9lD1IW1EUx29xL3QRYhvbRrsJkdgEoyJaC0koNZA32CGE8CJojUKjwRilukgL%2FbBi6xdBW6pVg7Z%2BdWo7dejgUGi34qggLV0KLhff0HPOvScmQ95veNxz%2Fj%2FuO%2B9eeEKIw6tluSSY1ZazsvjeCXEKiFDzmQ2uE5KE54oNnz5XkiQ8jvJ8%2B35UeUpjeVwFHE%2FXlqLRBw%2Ff6Pogk8koSXhqmf4xSxN9gvXfdDqd%2F6WtmwrHe6uI%2BdrRfCqV%2BjnaqS0%2F4YpaJfzIZ7PZY7%2BfrUZiq1SKDP3L5Y6hz1YTsl4qWWEpv%2F7GgK1m4OV0qXRfSvnlDyb3tHUL2IZ3DIbDppYGQYpFnmPCVhvwwTINSOQdkrpgZZhWPyZs%2BYBZy4xJ1iKGWsQx0VZdC%2FAav4o0kyaXSbB3MbmrrVZg2WLNiKihoDGFCVu3gUUcJ0CjhfHZhfUMJmy1A89o6jmpSVK5jwlbHcBbdQJJJRkBLHp9mLDlRUbICigrQUWcgpC2GpCd8zOXMVp2%2Byhgq57oK2wWUzcwofpsuYn6uDr2xJzatU%2B13Wzd0IwX3Xb3K%2B4GtVXDLOxpp%2FfCRqHJ1vVzvI82BwYef2woarF12Ra2qmzR1rCz2o4VZb246LShokf%2Fc3qCk9fKEapQzn94xvE6%2BJvLMgAAAABJRU5ErkJggg%3D%3D";
		}
		else {
			return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oKFAsaJoTP3UcAAAHLSURBVCjPfZJdaxNREIbnnD1tkt2EbLL5qBpKTaxoJAYVxAhe%2BmP9AxVRihQsiCiG4tqq9MLasNl8uLvZ3WZ7zpnxYtU7fe%2BGeZln3mHY%2Fv4r1%2F3MuQH%2FFiLe6HaF6x73%2B3cQEQCIiDFmGBwAtMa8BACWycnea2EYhpQSEYnIskzbrlpWCQDiOA3CKE0vYB6wD8ewvhSIiIhaa8ep9Xo75bL1lxtFq68H78LDMW87yU6DE5FSqlQs9HavV%2Bo2cYZ%2FJIK48uWMtx096FFhg%2Bdou2aLRTR59nz18QQYAwAVxrO9g%2Br2ldqT%2B7hhEKIgIiKyyqZOLtbnfvrtOxGVB7uzF28AwH40TPXl9GSFiPw3TGPl7s3aaMgLm%2FOXh8v9t%2BvzaWV4y%2Bx2tFS5hSNilmVBEKKU1YeD0vYWMBa%2Bd4tbjeqDvpYqDMMsyxCRE5GU0vP85eInB7BH90TZ3GzW7NFQmMWZP%2FP9uVKKiEQeK4qi8fjTYHC7da3VevrYMIvFTtubeEdHbhStDMPAPFa%2BiudNkyRxnLpdtylIg9PTxWIZxwljTGtNREJrnQ%2FObx5FK3H2AwCU0gDAGMtbSinR6Vz1PF8I8Z930Vo3m41fNEU3MVisQNgAAAAASUVORK5CYII%3D";
		}
	}
	else if (imageType == 'blank') {
		if (pageType == 'individual') {
			return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAgCAMAAACijUGCAAAAAXNSR0IArs4c6QAAAvpQTFRFNDQ01dXRCAgIjSk9h4eHmZmWBAQEKysrMDAwqqqn7%2B%2FqfHx6S0tLyXmHQ0NDhYWFg4OBAAAAfn58dHRzbW1qoR86EhISmUhZTk5NDAwMuLi4nJycnZ2dubm5mpqam5ubcHBwgYGBnp6et7e3n5%2Bftra2oKCgJSUlJiYmKCgoJCQkU1NTUVFRc3NzUlJSVFRUoaGhoqKiDg4OdHR0o6OjtbW1paWlra2tKSkps7OztLS0srKysLCwq6urT09PqqqqLCwsrq6up6enr6%2BvpqamqampTk5OLi4u8ObieHh4eXl5R0dH6MrLMjIyenp6fHx83KCoRUVFSUlJ8u3o1ouXODg4Pz8%2FPT097NjXe3t7Ojo6PDw8uSJB6OjjNjY22JKdQUFB2NjUTExM7t%2Fd5LzA8vLsxUxjvTBMjIyL8%2FPt4K60zs7L3qeuzMzK0tLOyVpvwT5Y4%2BPftWR15sPF2pmjtWV11NTPcnJxtmV24uLetWR0tbCx7e3nq6uo19fTy8vIw8PAfX18nJyYwcG9Xl5dgICA4%2BPevLy6z8%2FLU0hLo6OfyMjGyMjH0NDNurq53d3ZmpqY6urlNDQy1dXSsbGxwsK%2F4uLd6tHR2dnWrq6t39%2Fbubm2tGN0UFBQ5eXg5ubh5%2BfixcXDsLCst7e1dXV0jY2Nj4%2BP2dnVycnHqamotXOB09PO0dHN4ODc4eHd1tbSwsLBtra139%2Fa2trWxsbDurq4zWh74ODb0ICOuTZQw7m3ua%2Bxt3aD0I%2Baxaeph4eEXAwccXFvSEhHump6pqajgYF%2Bv7%2B7uJ6jiYmG4rW6ISEhto6WYGBe2crJoiA6t2t6tbWyGA4Q4dzZtX2JcD5IgjFCycnEy8vHqxQzrxg3fnl60XaGgYGAlZWRlCY8wMC%2Fp6ekvLy4TEJEx8fDtmZ2tIKMOjo5xcXBg1pij4%2BMs4CLsKusoKCdtoOOtLSxhISCt7eyXkpOxnaE29vW0dHMl0xb6OjiwMC8wcG8pKSh1ISRtRQ1urq69PTuBiM0OgAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2goUBQ8alotq3gAAAVBJREFUOMt91MlLw0AUx%2FEIvddz1LrEehNabBvUFHE7NAc9e8ghB6FSWuipFMTlIAruuKAeXHAH9%2BXv8R9pwHkz76VpM5nv8f0%2BMOQSTdPifZF1atR9vhGZ%2BYDIthqKjJpQIz3K5lHpytZRGX76zuOl41RXbpong1SSKi97mLPtH%2BnFrEh%2F8wKdJfFMaoxnOF5L9ay4kxrlvXptueJOahx68kL98YGUxTo%2BDKsqDNYCqmnWhydpDxZSk6x3mSrDQspkncqUCwuq4TzrWqa%2BYJlDNcG6kql9WEjNsi5k6ggWUlOsXZn6gYXUDOtWgpZMWEjloLrkE%2Flgo8pAnyG0aPKBVJpXaldr4k4qxUu7ragkzilSQ9hq8LkTuhZQDVLn3%2FR1Hc%2F%2BkdRAs9zmS6Wy9ZsJnEh1KyPVpQxVLdGr6k6og3hCUayIv5NiYaM%2FKjsmzD%2FEmPx3zqnZ9AAAAABJRU5ErkJggg%3D%3D";
		}
		else {
			return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oKFAscD5An4q0AAAFUSURBVCjPfVI7T8NADLbvjEp7DSkUVkDJ1v8%2FIv4DSDw6MABLSV%2Fp9YGinG0GVxELeLmz9Z2%2Fhw7v7%2B9eXqaICH%2BXqpZlQc%2FPr5PJRERshIjeOwBgFmsBwDk3nb6S975tWxFR1RAGo1EeQh8AdrtDXW8Oh29EdM4RnZCIiAgzj8fnZXk7HIaON8bt29v7el2rqog4VU0p9funRXETwsCeMbOIZNmwKK57vZ61zqhHo7MsG6qq6UNEu%2Bf5WZ5nhnE2CmHQ2TJ2QyNCCP2jADmW%2FpUUsxrCiUjTNHW96TZ1WSKiKmw2ddM0R1tt285m1Wq1ds51Ki2j%2BXxRVYuUkqoebcUYHx6eFoul956IiMh7V1Xzx8enGLemlewQkdnsa7%2Ffj8cXeZ4BQF3H5XK12%2B0RkZlVlWy5SYxxG%2BOWyANASvxbfUqJyrL4%2BPgkon%2B%2BCzNfXV3%2BAEYPJ0HfxSAhAAAAAElFTkSuQmCC";
		}
	}
	else if (imageType == 'hoverBlank') {
		if (pageType == 'individual') {
			return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAgCAYAAACVU7GwAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oKFAUhFQ0zfmMAAALTSURBVFjDzZjPSxtREMe%2FWRezNWISzcEUMckGE0XzO%2FiD1HNpzi05FU%2BCQfIXeMk%2FIEo9KPXQs%2FQivQlFipBaevJHEiFk3VyEFLMJBoSNJru9KIjuJrtm3XZgTu%2FtzId582Z2HnAnwWBQBKCL3vmSFQMAuFwukaZpWK1W6CG1Wg3n5%2BdgWdYgtU4ODg6KHo8H%2Ff39EEVRFyiLxQKPx4OrqyuxWq0%2BASPr9TpMJpNuQPdiMplQr9cl10gAugN1EhIABEFQtJkgCPh8k5iamoTL5QRFGQEAPN8Ay5aQzeZweppTbK8tlJJIxWKzSCQ%2BwGYbklyfmPAiHn%2BLSoXDzs5XZDK%2FXi5SFEUhlVpCJBJWZNBmG8Ly8hJmZ6exsbEFnudVQxH3kZJSo9GIdHpFMdBDiUTCSKdXYDQaZe23hRIEQVJTqSScTsezj8HpdCCVSsraVw0Vi80hGg13fZOi0TBisbnuoQAgkXiv2RW%2Ft9UVlN%2Fvg90%2BrBmU3T4Mv9%2FXHVQoFNC8IIZCAcVQkiXB4RjVHMrhGFVcVCWhzOYBzaHM5gHlnUOqTrVaLc2hyuU%2FT%2FxQFKU8p6rVmuZQl5eVJ36azaZyKIZhNIcqFplHSa6yoh8cZDQFEgQBmczPR1FqqYPK58%2BQy%2BU1g9rf%2F4FKheu%2BzWxuftYE6Pa2ie3tL9r0vqOjExQK3efW2tonXFxcqIJq%2Bz%2BVzZ6hr%2B8VRkZePwuoUGCwu%2FtN9XcGkiTF8fHxtpuSyUUsLHxUdWSrq%2BsdgYrFInieN0hCeb3ejo7cbhrJ5CLm59%2B0vWV7e9%2BxtbWNcrnc0SbDMPJQY2NjiqNgtVowMzONQMCPnh4CANBoNHB8fILDw9%2B4vr5WbItlWXkomqZBEITuo1SpVJKEIh%2BG%2Fr%2Ba%2B%2F7VMCrb%2B%2BLxd%2BA4TnbieCnlOA7BoF%2F%2B1SUaDYvZbB69vb26ROjm5gZutxu5XE7y1eUvWyzN1vGTBSoAAAAASUVORK5CYII%3D";
		}
		else {
			return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oKFAsbE8tnKCUAAAHRSURBVCjPdZJPaxNRFMXv%2B5OXFybQRUIwlkySMahgUixkYz%2BAdK24d6FbQT%2BFdNGFK11I8XMU921CdDGpOLEQSoVKqEQGJpnMvHuvi2gVwbO6d3M4v3uP2Nt7eXDwTkoJ%2FxczP3j0UHQ6nX6%2F75wDAERUSllrASBN0%2FUqAKCgPw5HulgsrlYrRCSizc3rW1td328ww3R6Fo7HFxffClpLImMKmogQXZbl29t3nz553Gq3EBEAtFaTL6dvXr8Nw7G1VgihKpVKuVyu1689f%2FHMD9rpcuFy55zLsrxarQRB%2B%2BTk03z%2BI45jiYjM3OveCZr%2BarEA%2FkOTZXmnc6PdbjnnEFGvs%2Ft%2BwznHzMAshLgCl0o2W00pJSJKIkJEYhZKAfPfBxJKCVDockRERE1EcRxH0UQpDQBCCGb%2BNSACUBSdxnFMhJKI0jQ9OjoOw9Bay7%2BNmdlaOxgMR6MPzjlEUp7neZ53efl9Oj0LglazGRhjjTHG2MFguL%2F%2FKoomSqkkSUStVqtWq0TknPP9Rq%2FXvXX7JhFFnydhOD4%2F%2F2qMEULM53OxsbFRr9eJaP1YACiVSgCwXC4BQCm1zj2bzfTu7v3Dw%2FfGmCv2JEn%2BqUue5zs7934CrVwEXz7go6IAAAAASUVORK5CYII%3D";
		}
	}
	else if (imageType == 'X') {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oKFAsdBB7uCmQAAAIoSURBVCjPfdLdS1NhHMDx523nbM3jVlOnppvGAiWiSFIJjLpIJBDEEiG9KOwqygvvJIMgKPWqsCjoQrwugozsRYxSwguLCF92tDm3xV7aaumOZxvnnN%2FzdB%2FU90%2F48MXj46OTk1OEEPTvhBDdPedwIBBoPtZUspM3GdEkghmTZRkhVCwWTctyK4pTN34xsbyywiRZVgy4msBqePNtrePwlb76%2BjohxNZWJBqNtTn2BaaXJqoFQohxgJxMNzqbKl%2FAyY1QRUpvv9ZpWUXKaOTJ6%2Fitx8Fw1PQFMMHU4%2FEwSdJLHR0Xe60lNflq4WtIbexqTzyfCw9PxDYjiw1lqVJbdnubAQBGyO%2F3%2BbrOIEzMwdGdZ%2FM%2FLyyqg2PpdKZ8qL%2BihAffLwAAAQBKqd9XC5ZVfrat8eGIoijLl27kdB33t3fcGamrr8MYAwDhnAMAFwIz%2BpcRphQhxC0LAACAcc5zuZy6vk4JzczMqYNjmqadeHp39fLN9NTMu6qqoJHNaRrnQBVFYTYbIeSIJUWv30%2FGE%2Bb5U81DA44D%2B%2BHTevLlh89boaydaLpOnU5ntdfb13DUNvXmezhSMzzQde82I8jdeDDvkvd8S%2Fh%2F7H5x8kx%2Bl3HOnXnj%2BHxoLRaf3su92Vjw0QPOQQ1uxOPx7tOHWj7a8e9VLgR2uVw13soyA5kMZzE3BXfY7QihQqHAhfC43S6Dp4xCIpPGvb09s7NzkiT9ZxfTNFtbW%2F4ATWUSvlA6kn8AAAAASUVORK5CYII%3D";
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

function resetVariables() {
	var keys = GM_listValues();
	for (var i=0, key=null; key=keys[i]; i++) {
		GM_deleteValue(key);
	}
}