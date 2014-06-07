// ==UserScript==
// @name                /mu/ + Last.fm
// @namespace           http://pseudochron.com
// @description         Tools combining 4chan's /mu/ and last.fm
// @include             http://*.4chan.org/mu/*
// @version             1.6.1
// ==/UserScript==

/* CONFIGURATION */
/* 	You only need to edit these if you want to use
	the "Now Playing" feature and you are a namefag. */

var POST_NAME = "Anonymous";
var NP_STRING = " | now playing: ";
var POST_TRIP = ""; 			// remember to include the "#"

/* (END CONFIG) */



// global vars
var scoreList = [];
var userList = [];
var postList = [];
var commonArtistsList = [];
var compatCount = {"Super":0,"Very High":0,"High":0,"Medium":0,"Low":0,"Very Low":0,"Unknown":0};

Number.prototype.toFixed=function(x) {
   var temp=this;
   temp=Math.round(temp*Math.pow(10,x))/Math.pow(10,x);
   return temp;
}

Array.prototype.avg = function() {
	var sum = 0;
	var len = this.length;
	for (var i = 0; i < len; i++) {
		if (this[i] >= 0.0) {
			sum += parseFloat(this[i]);
		}
	}
	return sum/len;
}

function compareTaste(username,tdID,scriptUser,isDupe) {  
	// Get the taste-o-meter score and common artists
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ws.audioscrobbler.com/2.0/?method=tasteometer.compare&type1=user&type2=user&api_key=f27f59e52cce2ed5fd8bbd412c7165bf&limit=5&value1='+scriptUser+'&value2='+username,
		headers: { 
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml', 
		},
		onload: function(response) {
			elm = document.getElementById(tdID);
			var bq = elm.getElementsByTagName("blockquote")[0];
			
			var commArtistText = document.createElement('small');
			var messageDiv = document.getElementById(tdID+"_m");
			
			var tasteXML = new DOMParser().parseFromString(response.responseText, "application/xml");
			
			if (response.status==200 && tasteXML.getElementsByTagName('score').length) {
				var score = tasteXML.getElementsByTagName('score')[0].textContent;
				
				var compat = getCompatName(score);
				var compatColor = getCompatColor(score);
				
				var scoreDupe = score;
				if (isDupe) {scoreDupe = -2};
				
				var postID = tdID.split("_")[1];
				updateStats(scoreDupe,username,postID);
				messageDiv.textContent = '';
				bq.innerHTML = "Your musical compatibility with <a target='_blank' href='http://www.last.fm/user/"+username+"'>"+username+"</a> is <strong style='color:"+compatColor+"'>"+compat.toUpperCase()+"</strong><br>"; 
				
				// read common artists from the XML
				if ( tasteXML.getElementsByTagName('artists')[0].getElementsByTagName('name') ) {
					var artistList = tasteXML.getElementsByTagName('artists')[0].getElementsByTagName('name');
					var commonArtists = '';
					var commonArtistsArray = [];
					
					if (artistList.length > 0) {
						for (var i=0; i < artistList.length && i <5; i++) {
							commonArtistsArray[i] = artistList[i].textContent;
							commonArtists += artistList[i].textContent;
							if (i!=4 && (i<artistList.length-1))
							{
								if ( (i==3) || (i==artistList.length-2) )
								{
									commonArtists += " and ";
								} else {
									commonArtists += ", ";
								}
							}
						}
						commonArtists += ".";   
						commArtistText.textContent = "Music you have in common includes " + commonArtists;
		
						bq.appendChild(commArtistText);					
						
						commonArtistsList[tdID] = commonArtistsArray;
						
// 						createPlaycountButton(username,tdID,commonArtistsArray);
					}
					
					// cache scores and common artists for one week
					var d = new Date();
					var timestamp = d.getTime();
					try {
						localStorage["user:" + username.toLowerCase()] = score + "," + timestamp + "," + commonArtistsArray.join('\t');
					} catch (e) {
						// if "QUOTA_EXCEEDED_ERR" (cache too big), clear it
						unsafeWindow.localStorage.clear()
					}
					
				}
				createTopArtistButton(username,tdID);
			
			// if the xml didn't have a 'score' tag
			} else if (tasteXML.getElementsByTagName('error').length) {
				error = tasteXML.getElementsByTagName('error')[0].textContent;
				messageDiv.innerHTML = "<strong class='error'>Error:</strong> "+error;
				if ( ! error.match("Invalid username:") ) {
					createRetryButton(username,tdID,scriptUser);
				}
			} else {
				messageDiv.innerHTML = "<strong class='error'>Error loading data</strong>";
				createRetryButton(username,tdID,scriptUser);
			}
		},
		onerror: function(response) {
			messageDiv = document.getElementById(tdID+"_m");
			messageDiv.innerHTML = "<strong class='error'>Error loading data</strong>."
			if (response.status && response.statusText) {
				messageDiv.innerHTML += " (Status: " + response.status + " " + response.statusText + ")";
			}
			createRetryButton(username,tdID,scriptUser,isDupe);
		}
		 
	});
}

function compareTasteCached(username,tdID,score,isDupe) {
	elm = document.getElementById(tdID);
	var bq = elm.getElementsByTagName("blockquote")[0];
	
	var commArtistText = document.createElement('small');
	var messageDiv = document.getElementById(tdID+"_m");
						
	var compat = getCompatName(score);
	var compatColor = getCompatColor(score);
	
	var scoreDupe = score;
	if (isDupe) {scoreDupe = -2};
	
	var postID = tdID.split("_")[1];
	
// 	updateStats(score,username,postID);
	window.setTimeout(function() { updateStats(scoreDupe,username,postID) }, 10);
	
	messageDiv.textContent = '';
	bq.innerHTML = "Your musical compatibility with <a target='_blank' href='http://www.last.fm/user/"+username+"'>"+username+"</a> is <strong style='color:"+compatColor+"'>"+compat.toUpperCase()+"</strong><br>"; 
		
	// Now get the common artists.
	if ( unsafeWindow.localStorage["user:" + username.toLowerCase()] ) {
		var artistList = unsafeWindow.localStorage["user:" + username.toLowerCase()].split(",")[2].split("\t");
		if (artistList != '') {
			var commonArtists = '';
			
			commonArtistsList[tdID] = artistList;
		
			for (var i=0; i < artistList.length && i <5; i++) {
				commonArtists += artistList[i];
				if (i!=4 && (i<artistList.length-1))
				{
					if ( (i==3) || (i==artistList.length-2) )
					{
						commonArtists += " and ";
					} else {
						commonArtists += ", ";
					}
				}
			}
			commonArtists += ".";   
			commArtistText.textContent = "Music you have in common includes " + commonArtists;
	
			bq.appendChild(commArtistText);
		}
	}
	
// 	createPlaycountButton(username,tdID,artistList);
	createTopArtistButton(username,tdID);
}

function createRetryButton(username,id,scriptUser,isDupe) {
	messageDiv = document.getElementById(id+"_m");
	var retryButton = document.createElement('span');
	retryButton.setAttribute("style", "cursor: pointer;");
	retryButton.innerHTML = " [<a><u>retry</u></a>]";
	messageDiv.appendChild(retryButton);    
	retryButton.addEventListener('click', (function() { messageDiv.textContent="Loading..."; compareTaste(username,id,scriptUser,isDupe); }), false);
}

function createPlaycountButton(username,id,artistList) {
	elm = document.getElementById(id);
	var playcountButton = document.createElement('small');
	playcountButton.setAttribute("style", "cursor: pointer;");
	playcountButton.innerHTML = "<a><u>Show playcounts</u></a> | ";
	playcountButton.id = "pc_" + id;
	elm.appendChild(playcountButton);
	playcountButton.addEventListener('click', (function() { getPlaycounts(username,id,artistList); playcountButton.textContent=" Loading... ";}), false);
}

function getPlaycounts(username,id,artistList) {
	var elm = document.getElementById(id);
	var bq = elm.getElementsByTagName("blockquote")[0];
	var playcountButton = document.getElementById("pc_" + id);

	// to do
}

function createTopArtistButton(username,id) {
	elm = document.getElementById(id);
	var topArtistButton = document.createElement('small');
	topArtistButton.setAttribute("style", "cursor: pointer;");
	topArtistButton.innerHTML = "<a><u>Show top artists</u></a>";
	topArtistButton.id = "b_" + id;
	elm.appendChild(topArtistButton);   
	topArtistButton.addEventListener('click', (function() { getTopArtists(username,id); topArtistButton.textContent=" Loading...";}), false);
}

function getTopArtists(username,id) {
	elm = document.getElementById(id);
	bq = elm.getElementsByTagName("blockquote")[0];
// 	bq = elm.firstChild;
	
	GM_xmlhttpRequest({
		method: 'GET',
// 		url: 'http://ws.audioscrobbler.com/2.0/user/'+username+'/topartists.xml',
		url: 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&api_key=f27f59e52cce2ed5fd8bbd412c7165bf&limit=10&page=1&user='+username,
		headers: { 
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml', 
		},
		onload: function(response) {
			/*
			if ( document.getElementById("pc_" + id) ) {
				var playcountButton = document.getElementById("pc_" + id);
				playcountButton.innerHTML = "<a><u>Show playcounts</u></a>";
			}
			*/
			
			var topArtistButton = document.getElementById("b_" + id);
			topArtistButton.parentNode.removeChild(topArtistButton);
			
			var topArtistXML = new DOMParser().parseFromString(response.responseText, "application/xml");
			var topArtistList = topArtistXML.getElementsByTagName('name');
						
			var topArtistString = [];
			if (topArtistList.length) {
				for (var i=0; i < topArtistList.length && i <10; i++) {
					topArtistString[i] = ' ' + topArtistList[i].textContent;                        
				}
				
				bq.innerHTML += "<p><strong>"+username+"'s top artists:</strong> " + topArtistString;
			}
		}
	});
}

function checkFriendStatus(username,id,friendList) {
	var friendIcon = document.createElement('img');
// 	friendIcon.src = "http://cdn.last.fm/flatness/icons/profile/isfriend.png";
	friendIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAFbSURBVDiNrZLPSwJBFMc%2Fs8gy6zoXIRCCwEMEdewP6OpJCIL%2BhBjoWv%2BHFwe6d%2FYqdI0OgRB0KejUQTwJui3pqDMdNHBtQcXebd77vs%2B8X7Cjee8JdoUA%2FwMprBNorWvANXAKdICGMeZhWSPWAA6At3K5HIVhiLWWfr%2F%2FBRwaY3qw2UzO4ziOpJQEQYCUkmKxWALqy6J1kFIQZCWLd2kbyMtkMsk4rLUAj9tAOoskAJxzWGsHzAe8GcQY03PO9ZxzmSqMMbNtKgFop2mK957xeAzwsCpYeyfAbZIke0mSnAFt4G5VkHsnWut94AY4Aq6MMZ8rsXvgFWg0m82PPxCtdRV4UkpVhBAMh0MLtIB3oApcKKWiRewbOMlr51hKWVFKARDHcTgajS6n0ymFQgEpJULM%2F57NZlGapvU8yOB3GwBCCKIoyusa7z3AIA%2FSsda2u91uLTcza89A6wcItIOtH5MmiAAAAABJRU5ErkJggg%3D%3D";
	friendIcon.setAttribute('style','margin: 15px; position: absolute;');
	friendIcon.setAttribute('title','You are friends with this user');	
	
	elm = document.getElementById(id);
	
	if ( friendList.indexOf(username.toLowerCase()) != -1 )
	{
		elm.insertBefore(friendIcon,elm.firstChild);
	}
}

function lastfmInPost(element) {
//  var regexp = /last.fm\/user\/([\w-]+)/ ;  // didn't work on foreign lang domains
	var regexp = /last?.fm[\w.]*\/user\/([\w-]+)/;
	var found;
	if ( regexp.test(element.innerHTML) ) {
		found = regexp.exec(element.innerHTML)[1];
	}
	return (found);
}

function soundcloudPost(element) {
	var regexp = /soundcloud.com\/[\w-]+\/?([\w-]+)?(\/[\w-\/]+)?/;
	var result;
	if ( regexp.test(element.innerHTML) ) {
		result = regexp.exec(element.innerHTML);
		var url = result[0];
		url = "http://" + url;
		
		var playerHeight = "81";
		// if the link is to an artist page or a "set" page, rather than a track, use taller player
		if (! result[1] || result[2]) {
			playerHeight = "160";
		}
		
		// if the post is the OP, add extra <br> padding
		var isReply = (element.nodeName == "TD");
		if (!isReply) {
			element.appendChild( document.createElement('br') );
			element.appendChild( document.createElement('br') );
		}
		
		var s = element.appendChild( document.createElement('small') );
		var a = s.appendChild( document.createElement('a') );
		a.textContent = url;
		a.setAttribute('href',url);
		a.setAttribute('target','_blank');		
				
		if ( GM_getValue("embedSoundcloud",false) ) {
			createSoundcloud(element,url,false,playerHeight);
		} else {
			var playSpan = element.appendChild( document.createElement('span') );
			playSpan.setAttribute('class','soundcloud-play');
			playSpan.appendChild( document.createTextNode(" [") );
			var playLink = playSpan.appendChild( document.createElement('a') );
			playLink.textContent = "Play";
			playLink.setAttribute('href','javascript:void(0)');
			playSpan.appendChild( document.createTextNode("]") );
			playLink.addEventListener('click', ( function() {
				element.removeChild(playSpan);
				createSoundcloud(element,url,true,playerHeight);
			} ), false);
		}		
	}
}

function createSoundcloud(element,url,autoplay,playerHeight) {
	var color = "6666ee";
	var playerWidth = "400";
	var ap = autoplay.toString();
	var fullUrl = "http://player.soundcloud.com/player.swf?url="+url+"&auto_play="+ap+"&color="+color+"&show_artwork=false";
	
	// doing it this way instead of innerHTML so 4chan X works with the posts
	element.appendChild( document.createElement('br') );
	var object = document.createElement('object');
		object.setAttribute('height',playerHeight);
		object.setAttribute('width',playerWidth);
	var p_movie = object.appendChild( document.createElement('param') );
		p_movie.setAttribute('name','movie');
		p_movie.setAttribute('value',fullUrl);
	var p_script = object.appendChild( document.createElement('param') );
		p_movie.setAttribute('name','allowscriptaccess');
		p_movie.setAttribute('value','always');
	var embed = object.appendChild( document.createElement('embed') );
		embed.setAttribute('allowscriptaccess','always');
		embed.setAttribute('height',playerHeight);
		embed.setAttribute('width',playerWidth);
		embed.setAttribute('src',fullUrl);
		embed.setAttribute('type','application/x-shockwave-flash');
	
	element.appendChild(object);
}

function analyzePost(bqElm, postUser, scriptUser) {
	var username;
	var elm = bqElm;
	var isReply = (bqElm.parentNode.nodeName == "TD");
	if (isReply) {              // the parentNode of the OP is the whole thread, can't do that
		elm = bqElm.parentNode; // .parentNode to detect last.fm in email, subject, name
	}
		
	if ( username = lastfmInPost(elm) ) {
		// check for duplicates
		var isDupe = (postUser.toSource().search(new RegExp('"'+username+'"',"i")) > -1);
		
		var lastfmElm;
		// replies
		if (isReply) { 
			if (postUser) {
				postUser['l_'+elm.id] = username;
			}
			lastfmElm = document.createElement('td');
			lastfmElm.setAttribute('id', 'l_'+elm.id);
		// thread topic posts
		} else { 
			var threadId;
			var quoteA = elm.previousSibling;
			while ( quoteA && !threadId) {
				if (quoteA.childNodes[1] && quoteA.childNodes[1].getAttribute('class') == "quotejs") {
					threadId = quoteA.childNodes[1].textContent;
				} else {
					quoteA = quoteA.previousSibling;
				}
			}
			if (postUser) { 
				postUser['l_'+threadId] = username; 
			}
			lastfmElm = document.createElement('div');
			lastfmElm.setAttribute('class', 'reply lastfm');
			lastfmElm.setAttribute('id', 'l_'+threadId);
			lastfmElm.setAttribute('style', 'margin: auto; padding: 2px; width: 50%; clear: both;');
		}
		lastfmElm.innerHTML = "<blockquote><a target='_blank' href='http://www.last.fm/user/"+username+"'>"+username+"</a> </blockquote>";
		elm.parentNode.insertBefore(lastfmElm, elm.nextSibling);
		
		var messageDiv = document.createElement('div');
		messageDiv.setAttribute('id', lastfmElm.id + "_m");
		lastfmElm.appendChild(messageDiv);
		lastfmElm.setAttribute('class', 'reply lastfm');
		
		if (scriptUser) {
			// if it is your own last.fm, highlight it
			if (scriptUser.toLowerCase() == username.toLowerCase()) {
				lastfmElm.setAttribute('class', 'replyhl lastfm');
			} else {
				// check to see if we have a cached score for this user
				if (unsafeWindow.localStorage["user:" + username.toLowerCase()]) {
					// get the cache's age
					var timestamp = unsafeWindow.localStorage["user:" + username.toLowerCase()].split(",")[1];
					var d = new Date();
					var currenttime = d.getTime();
					// check to see if the cache is less than a week old
					if (currenttime - timestamp < 604800000) {
						var score = unsafeWindow.localStorage["user:" + username.toLowerCase()].split(",")[0];
						compareTasteCached(username,lastfmElm.id, score, isDupe);
					 } else {
						messageDiv.textContent = "Loading...";
						// load lastfm data
						compareTaste(username,lastfmElm.id, scriptUser, isDupe);
					}
				} else {
					messageDiv.textContent = "Loading...";
					// load lastfm data
					compareTaste(username,lastfmElm.id, scriptUser, isDupe);
				}
			}
		} else {
			createTopArtistButton(username,lastfmElm.id)
			messageDiv.innerHTML = "<blockquote><small><a style='cursor: pointer;' onClick=document.getElementById('usernameText').focus()><u>Set your Last.fm username</u></a> to determine compatibility.</small></blockquote>";
		}
	if (!postUser) {
		postUser = username;
		}
	}
	
	soundcloudPost(elm);
		
	return postUser;
}

function toggleList(event) {
	GM_setValue("listAllProfiles",event.target.checked);
	for (compat in compatCount) {
		if (compat != "Unknown") {
			var tr = document.getElementById("list " + compat.toLowerCase() ).parentNode;
			if (event.target.checked && compatCount[compat]) {
				tr.removeAttribute('style');
			} else {
				tr.setAttribute('style','display: none;');
			}
		}
	}
}

function updateStats(score,user,post) {
	if (String(window.location).match("/res")) {
	//  var profilesSpan = document.getElementById("profiles");
		var loadedSpan = document.getElementById("loaded");
		var averageTD = document.getElementById("average");
		var compat = getCompatName(score);
		
		if ( compat != "Unknown" ) {
			var bdownTD = document.getElementById( compat.toLowerCase() );
	//      bdownTD.textContent = ++compatCount[compat] + " (" + (compatCount[compat]/scoreList.length*100).toFixed(1) + "%)";
			bdownTD.textContent = ++compatCount[compat]; // percentages weren't correct anyway as scoreList.length became outdated
			
//          GM_log('>>'+post+'\t'+user);
			var listTD = document.getElementById( "list " + compat.toLowerCase() );
			listTD.firstChild.firstChild.innerHTML += '<A onclick="replyhl('+post+');" class="quotelink" href="#'+post+'">&gt;&gt;'+post+'</A> ' +
							'<a href="http://www.last.fm/user/'+user+'" target="_blank">'+user+'</a><br>';
			listTD.firstChild.firstChild.setAttribute('style','position: relative; left: 3em;');
// 			listTD.firstChild.setAttribute('style','max-height: 5em; overflow: auto;');
			listTD.setAttribute('style','border-bottom-width: 2px;');
			if ( document.getElementById("list_all").checked ) {
				listTD.parentNode.removeAttribute('style');
			}
		}
		
		var errors = document.evaluate("//strong[@class='error']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		errors = errors.snapshotLength;
		
		scoreList[scoreList.length] = score;
		userList[scoreList.length-1] = user;
		postList[scoreList.length-1] = post;
		
		var average = scoreList.avg();
		averageTD.innerHTML = (average*100).toFixed(2) + "% (<b>" +
			getCompatName(average).toUpperCase() + "</b>)";       
		
		if ( scoreList.length == loadedSpan.parentNode.textContent.split(" ")[0] ) {
			loadedSpan.innerHTML = "";
		} else {
			loadedSpan.innerHTML = "(" + scoreList.length + " loaded";
			if (errors) {
				loadedSpan.innerHTML += ", " + errors + " error";
				if (errors > 1) { loadedSpan.innerHTML += "s"; }
			}
			loadedSpan.innerHTML +=")";
		}
	}
}

function getCompatName(score) {
	var compat = "Unknown";
	if (score >= 0.00) {
		if (score < 0.10) {
			compat = "Very Low";
		} else if (score < 0.30) {
			compat = "Low";
		} else if (score < 0.50) {
			compat = "Medium";
		} else if (score < 0.70) {
			compat = "High";
		} else if (score < 0.90) {
			compat = "Very High";
		} else if (score <= 1.00) {
			compat = "Super";
		}
	}
	return compat;
}

function getCompatColor(score) {
	var compatColor = "#000000";
	if (score >= 0.00) {
		if (score < 0.10) {
			compatColor = "#9A9A9A";
		} else if (score < 0.30) {
			compatColor = "#453E45";
		} else if (score < 0.50) {
			compatColor = "#5336BD";
		} else if (score < 0.70) {
			compatColor = "#05BD4C";
		} else if (score < 0.90) {
			compatColor = "#E9C102";
		} else if (score <= 1.00) {
			compatColor = "#FF0101";
		}
	}
	return compatColor;
}

function setUsername(username) {
	if (username)
	{
		// analyze if it is a username or a link
		var regexp = /last.fm\/user\/([\w-]+)/ ;
		if ( regexp.test(username) ) {
			username = regexp.exec(username)[1];
		}
		GM_setValue("scriptUser",username);
		
		// remove the spacer tr
		var spacer = document.getElementById("spacer");
		spacer.parentNode.removeChild(spacer);
		buildUsername(username, true); // creates the tr that displays name and [change] link
// 		unsafeWindow.sessionStorage.clear()
		unsafeWindow.localStorage.clear()
	}
}

function buildUsername(username, reloader) {
	var label = document.getElementById('username').childNodes[1];
	var dataTd = document.getElementById('username').childNodes[2];
	label.innerHTML = "<small>Last.fm user:</small>";
	label.removeAttribute('class');
	dataTd.innerHTML = "<small><a href='http://www.last.fm/user/"+username+"' target='_blank'>"+username+"</a> [";
	changeLink = dataTd.firstChild.appendChild(document.createElement('a'));
	changeLink.textContent = "change";
	changeLink.setAttribute('href','#');
	dataTd.firstChild.appendChild( document.createTextNode("]") );
	
	changeLink.addEventListener('click', function(event) {
		event.stopPropagation();
		event.preventDefault();
		changeUsername();
		document.getElementById("usernameText").focus();
	}, false);
	
	if (reloader) {
//      dataTd.innerHTML += " [<a href=javascript:window.location.reload()>Reload page</a>]";
		dataTd.appendChild( document.createTextNode(" [") );
		var reloadLink = dataTd.appendChild(document.createElement('a'));
		reloadLink.textContent = "Reload page";
		reloadLink.setAttribute('href','javascript:window.location.reload()');
		reloadLink.setAttribute('style','font-weight: bold;');
		dataTd.appendChild( document.createTextNode("]") );     
	}
	
	createNpCheckbox(username);
// 	window.setTimeout(function() { createNpCheckbox(username) }, 10);
}

function changeUsername() {
	var label = document.getElementById('username').childNodes[1];
	var dataTd = document.getElementById('username').childNodes[2];
	dataTd.innerHTML= '';

	var spacerTr = document.createElement('tr');
	spacerTr.id = "spacer";
	spacerTr.innerHTML = "<td></td><td><br></td><td></td>";
	postTable.insertBefore(spacerTr, postTable.firstChild.nextSibling);
	
	label.setAttribute('class','postblock');
	label.innerHTML = "<b>Last.fm</b>";
	
	var dataForm = dataTd.appendChild(document.createElement('form'));
	dataForm.setAttribute('style', 'margin: 0px;');
	var usernameText = dataForm.appendChild(document.createElement('input'));
	var usernameButton = dataForm.appendChild(document.createElement('input'));
	usernameText.setAttribute('type','text');
	usernameText.setAttribute('class','inputtext');
	usernameText.setAttribute('size','14');
	usernameText.id = "usernameText";
	
	usernameButton.setAttribute('type','submit');
	usernameButton.setAttribute('value','Set username');
	
	dataForm.addEventListener('submit', function(event) {
		event.stopPropagation();
		event.preventDefault();
		if (document.getElementById('npSpan')) {
			var npSpan = document.getElementById('npSpan');
			npSpan.parentNode.removeChild( npSpan );
		}
		setUsername(usernameText.value);
	}, true);
}

function createNpCheckbox(scriptUser) {
	var tdname = document.getElementById('tdname');
	var npSpan = tdname.appendChild( document.createElement('span') );
	npSpan.id = "npSpan";
	
	var txt1 = npSpan.appendChild( document.createTextNode(" [") );
	var label = document.createElement('label');
	var npCheckbox = label.appendChild( document.createElement('input') );
	npCheckbox.setAttribute('type','checkbox');
	label.appendChild( document.createTextNode("Now Playing") );
	npSpan.appendChild(label);
	var txt2 = npSpan.appendChild( document.createTextNode("]") );
	

	var tdemail = document.getElementById('tdemail');
	var npConfig = tdemail.appendChild( document.createElement('small') );
	/*
	npConfig.appendChild( document.createTextNode("[") );
	configLink = npConfig.appendChild( document.createElement('a') );
	configLink.textContent = "config";
	configLink.href = "javascript:void(0)";
	configLink.addEventListener("click", configureNowPlaying, false);
	npConfig.appendChild( document.createTextNode("]") );
	*/
	npConfig.id = "np_config";
	npConfig.setAttribute('style','margin-left: 6.5em; position: relative; top: -10px; display:none');

	
	var nameText = tdname.parentNode.getElementsByTagName("input")[0];
	nameText.id = "name_text";
	npCheckbox.addEventListener("click", ( function() {
		GM_setValue("nowPlayingEnabled",npCheckbox.checked);
		if (npCheckbox.checked) {
			enableNp(scriptUser,true);
		} else {
 			nameText.removeAttribute('style');
 			npConfig.setAttribute('style','margin-left: 6.5em; position: relative; top: -10px; display:none');
 			
 			if (POST_NAME + POST_TRIP == "Anonymous") {
	 			nameText.value = "";
 			} else {
	 			nameText.value = POST_NAME + POST_TRIP;
 			}
 			
 			var textarea = document.getElementsByTagName("textarea")[0];
			textarea.removeEventListener('focus', getNowPlaying, false);
			var fileinput = textarea.parentNode.parentNode.parentNode.getElementsByTagName("input")[5];
			fileinput.removeEventListener('focus', getNowPlaying, false);
		}
	} ), false);
	npCheckbox.checked = GM_getValue("nowPlayingEnabled",false);
	
	if (npCheckbox.checked) {
		// this could be set to false and then doesn't update until text is entered
		// but that makes compat with extension harder
		enableNp(scriptUser,true);
	}
		
	// remove the "now playing" checkbox on page unload, to prevent comment box blanking
	window.addEventListener('unload', (function() {
// 		label.removeChild(npCheckbox);
		tdname.removeChild(npSpan);
// 		tdname.removeChild(txt1);
// 		tdname.removeChild(txt2);		
	}), false);
}

function enableNp(scriptUser, updateNow) {
	var chan_name = POST_NAME + POST_TRIP;
	if (POST_NAME + POST_TRIP == "Anonymous") {
		chan_name = "";
	}
	// alters the cookie saved, so other 4chan boards aren't affected
	var loc = 'javascript:void( createCookie("4chan_name","' + chan_name + '",7,".4chan.org") );';
	location.href = loc;
	
	var nameText = document.getElementById('name_text');
	var textarea = document.getElementsByTagName("textarea")[0];
	textarea.addEventListener('focus', getNowPlaying, false);
	var fileinput = textarea.parentNode.parentNode.parentNode.getElementsByTagName("input")[5];
	fileinput.addEventListener('focus', getNowPlaying, false);
	
	nameText.setAttribute('style','background-color: rgb(235, 233, 237); color: rgb(68, 68, 68);');
	
	npConfig = document.getElementById('np_config');
	npConfig.setAttribute('style','margin-left: 6.5em; position: relative; top: -10px;');
	
	if (updateNow) {
		getNowPlaying();
	}
}

function configureNowPlaying() {
	GM_getValue("npInSubject","false");
	GM_getValue("postName","");
	// to do	
}

function createPostHelper(scriptUser,isLastfmThread) {
	var commentTr = document.getElementsByTagName("form")[0].getElementsByTagName("tr")[4];
	commentTr.firstChild.setAttribute('style','width:13em;');
	commentTr.getElementsByTagName("textarea")[0].setAttribute('style','float: left;');
	var postHelper = document.createElement('div');
	postHelper.setAttribute('style','float: right; margin-left: 5px; width: 14em;');
	postHelper.setAttribute('id','postHelper');
// 	postHelper.appendChild( document.createTextNode("Insert: ") );

	var subjectTr = document.getElementsByTagName("form")[0].getElementsByTagName("tr")[3];
	var insertLabel = document.createElement('div');
	insertLabel.setAttribute('style','float: right; margin-left: 5px; margin-top: 8px; width: 14em;');
	insertLabel.appendChild( document.createTextNode("Insert: ") );
	subjectTr.getElementsByTagName("td")[2].appendChild(insertLabel);

// 	postHelper.appendChild( document.createElement('br') );
	postHelper.appendChild( document.createTextNode("[") );
	var chartLink = postHelper.appendChild( document.createElement('a') );
	chartLink.textContent = "Weekly artist chart";
	chartLink.setAttribute('href','javascript:void(0)');
	postHelper.appendChild( document.createTextNode("] ") );
	var chartSetting = postHelper.appendChild( document.createElement('select') );
	chartSetting.setAttribute('style','display:none');
	chartSetting.innerHTML = "<option value=10>10</option><option value=15>15</option><option value=20>20</option><option value=25>25</option><option value=30>30</option>";
	chartSetting.value = GM_getValue("weeklyChartAmount","10");
	postHelper.addEventListener('change', ( function() {GM_setValue("weeklyChartAmount",chartSetting.value);} ), false);
	
	var chartStatus = postHelper.appendChild( document.createElement('small') );
	chartLink.addEventListener('click', ( function() {getChart(scriptUser, chartSetting, chartStatus);} ), false);
	
	postHelper.appendChild( document.createElement('br') );
	postHelper.appendChild( document.createTextNode("[") );
	var allChartLink = postHelper.appendChild( document.createElement('a') );
	allChartLink.textContent = "Overall artist chart";
	allChartLink.setAttribute('href','javascript:void(0)');
	postHelper.appendChild( document.createTextNode("] ") );
	allChartLink.addEventListener('click', ( function() {getChart(scriptUser, chartSetting, chartStatus, 'overall');} ), false);
	
	postHelper.appendChild( document.createElement('br') );
	postHelper.appendChild( document.createTextNode("[") );
	var trackLink = postHelper.appendChild( document.createElement('a') );
	trackLink.textContent = "Current track";
	trackLink.setAttribute('href','javascript:void(0)');
	postHelper.appendChild( document.createTextNode("]") );
	var trackStatus = postHelper.appendChild( document.createElement('small') );
	trackLink.addEventListener('click', ( function() {insertPlaying(scriptUser,trackStatus);} ), false);
	
	postHelper.appendChild( document.createElement('br') );
	postHelper.appendChild( document.createTextNode("[") );
	var profileLink = postHelper.appendChild( document.createElement('a') );
	profileLink.textContent = "Profile link";
	profileLink.setAttribute('href','javascript:void(0)');
	postHelper.appendChild( document.createTextNode("]") );
	profileLink.addEventListener('click', ( function() {insertProfile(scriptUser);} ), false);
	
	if (isLastfmThread) {
		postHelper.appendChild( document.createElement('br') );
		postHelper.appendChild( document.createTextNode("[") );
		var statsLink = postHelper.appendChild( document.createElement('a') );
		statsLink.textContent = "Stats summary";
		statsLink.setAttribute('href','javascript:void(0)');
		postHelper.appendChild( document.createTextNode("]") );
// 		statsLink.addEventListener('click', insertStats, false);
		statsLink.addEventListener('click', ( function() {insertStats();} ), false);
		
		var label = document.createElement('label');
		var statsCheckbox = label.appendChild( document.createElement('input') );
		label.appendChild( document.createTextNode("Artists") );
		statsCheckbox.setAttribute('type','checkbox');
		postHelper.appendChild( label );
		label.setAttribute('title','List common artists for Supers and Very Highs');
		label.setAttribute('style','display:none');
		statsCheckbox.checked = GM_getValue("artistsInStats",false);
		postHelper.addEventListener('change', ( function() {GM_setValue("artistsInStats",statsCheckbox.checked);} ), false);
	}

	postHelper.addEventListener('mouseover', ( function() {
		if (chartSetting.getAttribute('class') != "hide") {
			chartSetting.setAttribute('style','height: 16px; font-size: 10px;');
		}
		if (isLastfmThread) {
			label.setAttribute('style','font-size: 10px; position: absolute;');
			// google chrome does things differently
			if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
				label.setAttribute('style','font-size: 10px;');
			}
		}		
	} ), false);
	postHelper.addEventListener('mouseout', ( function() {
		chartSetting.setAttribute('style','display:none');
		if (isLastfmThread) {
			label.setAttribute('style','display:none');
		}
	} ), false);
		
	
	commentTr.getElementsByTagName("td")[2].appendChild(postHelper);
}

function insertProfile(scriptUser, targetForm) {
	if (!targetForm) {
		targetForm = document;
	}
	textarea = targetForm.getElementsByTagName("textarea")[0];
	textarea.focus();
	if (textarea.value) {
		textarea.value += "\n";
	}
	textarea.value+="http://www.last.fm/user/"+scriptUser+"\n";
	textarea.scrollTop = textarea.scrollHeight;
}

function insertPlaying(scriptUser,trackStatusElm, targetForm) {
	if (!targetForm) {
		targetForm = document;
	}
	trackStatusElm.textContent = " Loading...";
	var d = new Date();
	var t = d.getTime(); //used to force un-cached xml
		GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ws.audioscrobbler.com/2.0/user/'+scriptUser+'/recenttracks.xml?limit=1&time='+t,
		headers: { 
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Cache-Control': 'no-cache',
		},
		onload: function(response) {
			var textarea = targetForm.getElementsByTagName("textarea")[0];
			var npXML = new DOMParser().parseFromString(response.responseText, "application/xml");
			artist = npXML.getElementsByTagName("artist")[0].textContent;
			songtitle = npXML.getElementsByTagName("name")[0].textContent;
			
			textarea.focus();
			if (textarea.value)
			{
				artist = "\n" + artist;
			}
			textarea.value += artist + " - " + songtitle + "\n";
			textarea.scrollTop = textarea.scrollHeight;
			trackStatusElm.textContent = "";
		}
	});
}

function getNowPlaying() {
	var scriptUser = GM_getValue("scriptUser");

	var d = new Date();
	var t = d.getTime(); //used to force un-cached xml
		GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ws.audioscrobbler.com/2.0/user/'+scriptUser+'/recenttracks.xml?limit=1&time='+t,
		headers: { 
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Cache-Control': 'no-cache',
		},
		onload: function(response) {
// 			var npText = document.getElementById('np_text');
 			var npText = document.getElementById('name_text');
 			
			var npXML = new DOMParser().parseFromString(response.responseText, "application/xml");
			var artist = npXML.getElementsByTagName("artist")[0].textContent;
			var songtitle = npXML.getElementsByTagName("name")[0].textContent;
			var nowp = (npXML.getElementsByTagName("track")[0].getAttribute("nowplaying") == "true");
						
			if (nowp) {
				songtitle = songtitle.replace("#",String.fromCharCode(9839),'g'); // so if # in title, doesn't trip - TURN OFF IF IN SUBJCT
				artist = artist.replace("#",String.fromCharCode(9839),'g');
				npText.value = POST_NAME + NP_STRING + artist + " - " + songtitle + POST_TRIP;
				npText.setAttribute("title", artist + " - " + songtitle);
			} else {
				if (POST_NAME + POST_TRIP == "Anonymous") {
		 			npText.value = "";
	 			} else {
		 			npText.value = POST_NAME + POST_TRIP;
	 			}
				npText.removeAttribute("title");
			}

		}
	});
}

function getChart(scriptUser, chartSetting, chartStatus, period, targetForm) {
	chartStatus.textContent = "Loading...";
//  chartSetting.parentNode.removeEventListener('mouseover', ( function() {chartSetting.setAttribute('style','height: 16px; font-size: 10px;');} ), false);
	chartSetting.setAttribute('style','display:none');
	chartSetting.setAttribute('class','hide');
	if (!targetForm) {
		targetForm = document;
	}
	var chartUrl = "http://ws.audioscrobbler.com/2.0/user/" + scriptUser;
	if (period) {
		chartUrl += "/topartists.xml?period=" + period;
	} else {
		chartUrl += "/weeklyartistchart.xml";
	}

		GM_xmlhttpRequest({
		method: 'GET',
		url: chartUrl,
		headers: { 
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml', 
		},
		onload: function(response) {
			chartStatus.textContent = "";
			chartSetting.removeAttribute('class');
			var chartText = "";
			var textarea = targetForm.getElementsByTagName("textarea")[0];
			var chartXML = new DOMParser().parseFromString(response.responseText, "application/xml");
			var artists = chartXML.getElementsByTagName("artist");
			for ( var i=0 ; i < artists.length && i < chartSetting.value; i++ ) {
				chartText += artists[i].getAttribute('rank') + "  ";
				chartText += artists[i].getElementsByTagName("name")[0].textContent + "    ";
				chartText += artists[i].getElementsByTagName("playcount")[0].textContent + "\n";                
			}
			textarea.focus();
			if (textarea.value)
			{
				chartText = "\n" + chartText;
			}
			textarea.value += chartText;
			textarea.setSelectionRange(textarea.value.length, textarea.value.length);
			textarea.scrollTop = textarea.scrollHeight;
		}
	});

}

function insertStats(targetForm) {
	if (!targetForm) {
		targetForm = document;
	}
	textarea = targetForm.getElementsByTagName("textarea")[0];
	textarea.focus();
	if (textarea.value) {
		textarea.value += "\n";
	}
	
	var average = scoreList.avg();
	var averageText = (average*100).toFixed(2) + "% (" + getCompatName(average).toUpperCase() + ")"; 
	
	textarea.value += "Average compatibility: " + averageText;
	
	textarea.value += "\nSuper: " + compatCount["Super"];
	for (var i=0; i < scoreList.length; i++) {
		if (getCompatName(scoreList[i]) == "Super") {
			textarea.value += '\n>>' + postList[i] + ' ' +  userList[i];
			if ( GM_getValue("artistsInStats",false) ) {
				textarea.value += ' [' + commonArtistsList[ "l_" + postList[i] ].join(', ') + ']';
			}
		}
	}
	
	textarea.value += "\nVery High: " + compatCount["Very High"];
	for (var i=0; i < scoreList.length; i++) {
		if (getCompatName(scoreList[i]) == "Very High") {
			textarea.value += '\n>>' + postList[i] + ' ' +  userList[i];
			if ( GM_getValue("artistsInStats",false) ) {
				textarea.value += ' [' + commonArtistsList[ "l_" + postList[i] ].join(', ') + ']';
			}
		}
	}
	
	textarea.value += "\nHigh: " + compatCount["High"];
	if (compatCount["High"]) {
		textarea.value += "\n> ";
	}
	var highList = [];
	for (var i=0; i < scoreList.length; i++) {
		if (getCompatName(scoreList[i]) == "High") {
			highList[highList.length] = userList[i];
		}
	}
	textarea.value += highList.join(', ');
	
	textarea.value += "\nMedium: " + compatCount["Medium"];
	if (compatCount["Medium"]) {
		textarea.value += "\n> ";
	}
	var medList = [];
	for (var i=0; i < scoreList.length; i++) {
		if (getCompatName(scoreList[i]) == "Medium") {
			medList[medList.length] = userList[i];
		}
	}
	textarea.value += medList.join(', ');
	
	textarea.value += "\nLow: " + compatCount["Low"];
	textarea.value += "\nVery Low: " + compatCount["Very Low"] + "\n";
	
	textarea.scrollTop = textarea.scrollHeight;
}

function searchButton(site) {
	var d = new Date();
	var t = d.getTime(); //used to force un-cached page
	var pagesremain = 15;
	
	var regexp;
	if (site == "MuMu Player") {
		regexp = /mumuplayer.com/;
	} else if (site == "SoundCloud") {
		regexp = /soundcloud.com/;
	} else {
		// maybe make this so "mailto:" doesn't match?
		regexp = /last?.fm[\w.]*\/user\/([\w-]+)/;
	}
		
	searchbox.innerHTML = "<br /><b>" + site + " threads:</b>";
	
	for ( var i=0 ; i <= 15; i++ ) {
		var page = i;
		if (i == 0) { 
			page = '';
		}
		
		GM_xmlhttpRequest({
		method: 'GET',
		url: "http://boards.4chan.org/mu/" + page + "?t=" + t,
		headers: { 
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html,application/atom+xml,application/xml,text/xml', 
		},
		onload: function(response) {
			// search each page
			if ( regexp.test(response.responseText) ) {
				// search each thread
				var threads = response.responseText.split('<span class="postername">');
				for ( var i=1 ; i <= threads.length; i++ ) {
					if ( regexp.test(threads[i]) ) {
						var resultthread = threads[i].match(threadrx)[1];
						searchbox.innerHTML += '<br><a href="res/' + resultthread + '" class="quotelink">&gt;&gt;' + resultthread + '</a>';
					}
				}
			} else {
				pagesremain--;
				if (pagesremain < 0) {
					searchbox.innerHTML += "<br /><b style='color: red;'>No " + site + " threads found</b>";
				}
			}					
		}
		});	
	}
}



// Now we start


// Get the script user's last.fm username
var scriptUser;
var standardPage = false;

if ( document.getElementsByTagName("form")[0] && ! String(window.location).match("report") ) {   // if it's a standard page
	standardPage = true;
	var postTable = document.getElementsByTagName("form")[0].getElementsByTagName("tr")[0].parentNode;
	var usernameTr = document.createElement('tr');
	usernameTr.appendChild(document.createElement('td'));
	usernameTr.id = "username";
	var label = usernameTr.appendChild(document.createElement('td'));
	var dataTd = usernameTr.appendChild(document.createElement('td'));
	postTable.insertBefore(usernameTr, postTable.firstChild);
	
// 	GM_deleteValue("scriptUser"); // used for testing
	
	if (scriptUser = GM_getValue("scriptUser")) {
		buildUsername(scriptUser);
	} else {
		changeUsername();
	}
	
	// Object to store post IDs with last.fm usernames
	var postUser = new Object();
	
	// get all posts
	var snapResults = document.evaluate("//form//blockquote", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	
	for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
		var bq = snapResults.snapshotItem(i);
		postUser = analyzePost(bq, postUser, scriptUser);
	}

	var replyArea = document.getElementsByTagName("form")[1];
	if (!scriptUser) {replyArea = document.getElementsByTagName("form")[2];	}
	
	// Search feature - finds all last.fm threads
	if ( String(window.location).match("mu/") && ! String(window.location).match("mu/res") ) {

		var searchbox = document.createElement('div');
		searchbox.setAttribute('align', 'center');
		var searchdiv = document.createElement('div');
		var lastfmbutton = document.createElement('button');
		var mumubutton = document.createElement('button');
		var soundcloudbutton = document.createElement('button');
		
		var threadrx = /\[<a href="res\/(\d+)">Reply<\/a>\]/;
		
		searchdiv.textContent = "Search: ";
		lastfmbutton.textContent = "Last.fm";
		mumubutton.textContent = "MuMu";
		soundcloudbutton.textContent = "SoundCloud";
		
		replyArea.parentNode.insertBefore(searchdiv, replyArea);
		searchdiv.appendChild(lastfmbutton);
		searchdiv.appendChild(mumubutton);
		searchdiv.appendChild(soundcloudbutton);
		searchdiv.setAttribute('align', 'center');
		searchdiv.setAttribute('style', 'font-weight: bold');
		replyArea.parentNode.insertBefore(searchbox, replyArea);
		replyArea.parentNode.insertBefore(document.createElement('hr'), replyArea);
		
		lastfmbutton.addEventListener('click', ( function() {searchButton("Last.fm");} ), false);
		mumubutton.addEventListener('click', ( function() {searchButton("MuMu Player");} ), false);
		soundcloudbutton.addEventListener('click', ( function() {searchButton("SoundCloud");} ), false);
	}
	
	if (document.body.textContent.match("soundcloud.com")) {
		var soundclouddiv = document.createElement('div');
		soundclouddiv.setAttribute('align', 'center');
		soundclouddiv.appendChild( document.createTextNode("[") );
		
		var label = document.createElement('label');
		var scCheckbox = label.appendChild( document.createElement('input') );
		scCheckbox.setAttribute('type','checkbox');
		label.appendChild( document.createTextNode("Auto-embed SoundCloud") );
		soundclouddiv.appendChild(label);
		soundclouddiv.appendChild( document.createTextNode("]") );
		
		replyArea.parentNode.insertBefore(soundclouddiv, replyArea);
		replyArea.parentNode.insertBefore(document.createElement('hr'), replyArea);
		
		scCheckbox.addEventListener("click", toggleSoundcloudEmbed, false);
		scCheckbox.checked = GM_getValue("embedSoundcloud",false);
	}
}

function toggleSoundcloudEmbed(event) {
	GM_setValue("embedSoundcloud",event.target.checked);
	// if it's checked, embed all soundclouds
	if (event.target.checked) {
		var snapResults = document.evaluate("//span[@class='soundcloud-play']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
			var playSpan = snapResults.snapshotItem(i);
			element = playSpan.parentNode;
			element.removeChild(playSpan);
			soundcloudPost(element);
		}
	}
}

// get all newly-created last.fm blocks
// snapResults = document.evaluate("//*[@class='reply lastfm']|//*[@class='replyhl lastfm']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
snapResults = document.evaluate("//*[@class='reply lastfm']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	
if (scriptUser && standardPage) {
	createPostHelper( scriptUser,( snapResults.snapshotLength && String(window.location).match("/res") ) );
}

var friendList = [];

// only runs this if there's at least one last.fm posted, and your username has been set
if (snapResults.snapshotLength && scriptUser) {

	// get list of friends and then checkFriendStatus
	//check for cached one
	if (unsafeWindow.sessionStorage.friendList) {
		friendList = unsafeWindow.sessionStorage.friendList.split(",");
		for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
			var elm = snapResults.snapshotItem(i);
			username = postUser[elm.id];
			checkFriendStatus(username,elm.id,friendList);
		}
	} else {
		// load the xml
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://ws.audioscrobbler.com/1.0/user/'+scriptUser+'/friends.xml', // using 1.0 cuz it's slightly smaller
			headers: { 
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml', 
			},
			onload: function(response) {
				var friendsXML = new DOMParser().parseFromString(response.responseText, "application/xml");
				users = friendsXML.getElementsByTagName("user");
				for ( var i=0 ; i < users.length; i++ ) {
					friendList[i] = users[i].getAttribute('username').toLowerCase();
				}
				for ( var i=0 ; i < snapResults.snapshotLength; i++ ) {
					var elm = snapResults.snapshotItem(i);
					username = postUser[elm.id];
					checkFriendStatus(username,elm.id,friendList);
				}
				// cache it
				sessionStorage.friendList = friendList.toString();
			}
		});
	}
	
// if it is a last.fm thread in reply mode, create the stats area
	if (String(window.location).match("/res") ) {
		var replyArea = document.getElementsByTagName("form")[1];
		var stats = document.createElement('div');
		// for (compat in compatCount) ...
		stats.innerHTML = '<table cellpadding=1 cellspacing=1>' +
		'<tr><td colspan=3 class="postblock" width="400" align="center"><b>Last.fm Thread Stats</b></td></tr>' + 
		'<tr><td class="postblock" width="50%" style="border: none"><b>Profiles</b></td>' + 
			'<td class="reply" colspan=2 align="center" style="border: none">'+ snapResults.snapshotLength +
				' <span id="loaded">(0 loaded)</span></td></tr>' +
		'<tr><td class="postblock" width="50%" style="border: none"><b>Average compatibility</b></td>' + 
			'<td id="average" class="reply" colspan=2 align="center" style="border: none"></td></tr>' +
			 
		'<tr><td class="postblock" rowspan=14 width="50%" style="border: none"><b>Compatibility breakdown</b></td>' + 
		
		'<td cellpadding=0 cellspacing=0><div style="max-height: 30em; overflow-y: auto; overflow-x: hidden"><table width=100% cellpadding=1 cellspacing=1><tr>' +
		
			'<td class="reply" width="50%" style="border: none">Super</td>' +
			'<td id="super" class="reply" style="border: none;">0</td></tr>' +
		'<tr style="display: none;"><td id="list super" class="reply" colspan=2><div><small></small></div></td></tr>' +
		'<tr> ' + 
			'<td class="reply" style="border: none">Very High</td>' +
			'<td id="very high" class="reply" style="border: none">0</td></tr>' +
		'<tr style="display: none;"><td id="list very high" class="reply" colspan=2><div><small></small></div></td></tr>' +
		'<tr> ' + 
			'<td class="reply" style="border: none">High</td>' +
			'<td id="high" class="reply" style="border: none">0</td></tr>' +
		'<tr style="display: none;"><td id="list high" class="reply" colspan=2><div><small></small></div></td></tr>' +
		'<tr> ' + 
			'<td class="reply" style="border: none">Medium</td>' +
			'<td id="medium" class="reply" style="border: none">0</td></tr>' +
		'<tr style="display: none;"><td id="list medium" class="reply" colspan=2><div><small></small></div></td></tr>' +
		'<tr> ' + 
			'<td class="reply" style="border: none">Low</td>' +
			'<td id="low" class="reply" style="border: none">0</td></tr>' +
		'<tr style="display: none;"><td id="list low" class="reply" colspan=2><div><small></small></div></td></tr>' +
		'<tr> ' + 
			'<td class="reply" style="border: none">Very Low</td>' +
			'<td id="very low" class="reply" style="border: none">0</td></tr>' +
		'<tr style="display: none;"><td id="list very low" class="reply" colspan=2><div><small></small></div></td></tr>' +
		
		'</tr></table></div></td>' + 
			
		'<tr><td class="reply" colspan=2 align="center">[<LABEL><INPUT id="list_all" type="checkbox"/>List all profiles</LABEL>]</td></tr>' +
		'</table>';
		
// 		stats.id = "stats";
		stats.setAttribute('align', 'center');
// 		stats.setAttribute('style', 'max-height: 17em; overflow: auto');

		replyArea.parentNode.insertBefore(stats, replyArea);
		replyArea.parentNode.insertBefore(document.createElement('hr'), replyArea);

		var listCheckbox = document.getElementById("list_all");
		listCheckbox.addEventListener("click", toggleList, false);
		listCheckbox.checked = GM_getValue("listAllProfiles",false);
	}
}



// For compatibility with the 4chan Firefox Extension

document.addEventListener("DOMNodeInserted", documentChanged, false);

function documentChanged(event) {
	if ( event.target.nodeName == "TABLE" ) {   // post expansion
	// need to make postUser known so analyzePost can check for dupes
		var tdElm = event.target.getElementsByTagName("td")[1];
		if ( tdElm ) {
			if ( bqElm = tdElm.getElementsByTagName("blockquote")[0] ) {
				username = analyzePost(bqElm, false, scriptUser);
				// friendlist will be blank if there wasn't a last.fm on the page before expansion. oh well.
				if (username) { checkFriendStatus(username,"l_"+tdElm.id,friendList); }
			}
		}
	} else if ( event.target.nodeName == "FORM" && event.target.parentNode.nodeName == "DIV") { // quick reply
		
		var toprow = event.target.getElementsByTagName("tr")[0];
		toprow.parentNode.removeChild(toprow);
		
		if (scriptUser) {
			// removes "now playing" box
			var npSpan = event.target.getElementsByTagName('span')[0];
			npSpan.parentNode.removeChild( npSpan );
			
			var subjectTr = event.target.getElementsByTagName("tr")[2];					
			var insertLabel = subjectTr.getElementsByTagName("div")[0];
			insertLabel.setAttribute('style','float: right; margin-left: 5px; margin-top: 8px; width: 9em;');
						
			var commentTr = event.target.getElementsByTagName("tr")[3];
			commentTr.firstChild.removeAttribute('style');
			
			var postHelper = event.target.getElementsByTagName("div")[1];
			postHelper.setAttribute('style','float: right; margin-left: 5px; width: 9em;');

			var chartSetting = document.getElementsByTagName("select")[0];
			var loadingStatus = insertLabel.appendChild( document.createElement('small') );
			var a = postHelper.getElementsByTagName("a");
			a[0].addEventListener('click', ( function() {getChart(scriptUser, chartSetting, loadingStatus, false, event.target);} ), false);
			a[1].addEventListener('click', ( function() {getChart(scriptUser, chartSetting, loadingStatus, 'overall', event.target);} ), false);
			a[2].addEventListener('click', ( function() {insertPlaying(scriptUser,loadingStatus, event.target);} ), false);
			a[3].addEventListener('click', ( function() {insertProfile(scriptUser, event.target);} ), false);
			a[4].addEventListener('click', ( function() {insertStats(event.target);} ), false);
		}
	}
}