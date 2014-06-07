// Primary Sources
// version 0.1
// 2009-09-22
// Copyright (c) 2009, Christopher James (etcet.)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Primary Sources", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Primary Sources
// @namespace     http://etcet.net/
// @description   Adds primary sources to wikipedia
// @include       http://*.wikipedia.org/wiki/*
// ==/UserScript==

//CONFIGURE
//insert "Primary Sources" before this element id (e.g. 'catlink')
var insertLoc = document.getElementById('catlinks');
if (!insertLoc) { return; }
//default message shown when there are no sources
var defaultmsg = 'No sources found. Be the first to add a source to this article!';
//background colors for search highlighting
var hovercolor = "#9cf";
var normalcolor = "#fff";
//'+' image for adding search results
var searchaddbutton_data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH2QkXCBMDz86rgAAAAU1JREFUSIntlL1KA0EUhc/M7qxBLYV0PkCKYGunmAeQYK8hiD8RDKJPkWihTVCCgpJW30BMQIUYWzd5AUFbs9ndzM61EdHsEic2afYr75w75wwzd4CYccN0hbn8WiWzlFlWgUS90bg5O61u6vSZugYTCQupVCpJRHh6bnHdPm3hf4kN/iR0ybn86omVsGiw3uu5i4xxMBA+ut2FjcL68aDGd/vqvHpR/FkLPdNa7eo9nZ6biUojAwkAEEKAKJQBnbb9ls2uJIeewPN85fnerxr7iiGlBBFBqSDKH67nhRZCBg+P97fNVjPU7PSc+f29g1kihfJR6XVqcrpumoZrGrz/rXHcSGMtdouFSrtjk91+oe2drUvdPu1JBuewhAUCgXPtH0bfgIGDcQaQ/ubAOOZgGEIIgAA2wi+sbeA6znX5sESmYZhSBXejBIsZL593X3NaksmFVwAAAABJRU5ErkJggg==";
var alert_data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJlJREFUSMdjYKAxYGRgYGCIT4j9TwvDFy5YzMhAKwtgZrIQqyEtIwXFEbNmzGEkRh/RFmhqaDHY2NgyMDAwMBw5cphonzDROpJHLRi1YNQCOlhAdFFx/cY1hus3rtHOAmILN7ItQC/S4WU9tSwwMDBkcHJyYmBgYGDYt28fw0KGxUMski9cOM9w4cJ52llAbJjjtIBWFT/NAQBiVSh5XoBMcAAAAABJRU5ErkJggg==";
var votedown_data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wYNETE33cHAsAAAAP9JREFUOMutVDuKwzAQfTGCxb5ASOF7uEmhagtfYEqXPlKOMBcQZCsXaXyPFEEHSIIh8LbRBuVjr2zyKhXzPjNiBiRBsiG5J3lmOs6B05DEimQDYOdEvk59j9v1ihSYPMemqlCrDgDaFcm9E/k+dh2WoLQWtepPBmB76nssReBuDYAibic4jBKdCOL0gVuY58Ja9aX4ncluvX6c2TvXOFFMmJqjSYmf9ItzEs0W+kgiJzKaqPV+1ORF6Nh1d3JpLVrvkwaeTcWd0575r8CJoPX+/p4Supg8L8aWNW51bHkBXDIAh01VLd61wD1kALRWHUpr/9STz0hYmQGA4lOH7RftcvZYE2Z/7QAAAABJRU5ErkJggg==";
var voteup_data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wYNETIGpzKTSQAAAR9JREFUOMutlDFrwlAUhT9jtOAYwTEIQSd/QAadu/UvJFmke9Y3urqXLsXNOZPOOvgDOlkEcSzoppCWcrtEiSaG19CzPd47551z77sPEUFEfBGZichR9HFMOL6IUBERH3iZrMYP2/2a758vdFCr1mk3u3huGAPPFRGZTVbjx4/Pd8qg0+rhueHcAAbb/ZqySLgDE2jkxbEth2FfAfC6HLE7bHKFEm7DuHfTsK9QUYCKgotgEQzdCLblFO6bOiQVBYye3i7rvKgZoTNBRUFGLF27231TN1rakXa0PNw6Ki1U2pFtOVcF/bMjFQV3D6e7lid0qlXrV697d9hkulI0vMDJABbtZrf0rCXchQFMPTeMO63eWV3bSTL5MTDlvz62X0qK6lETGCnKAAAAAElFTkSuQmCC";

//BEGIN FUNCTIONS

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

//parse piratebay for output[0] = title, output[1] = seeds, output[2] = leeches, output[3] = size
function parse_piratebay(response) {
	var output = new Array();

	//grep title
	var regexp = /<div id="title">/;
	var titleloc = response.search(regexp) + 16;
	var title = response.substring(titleloc, response.indexOf('</div>', titleloc))
	output[0] = title.replace(/^\s+|\s+$/g, '');

	//grep seeders
	regexp = /<dt>Seeders:<\/dt>/;
	var seedersloc = response.search(regexp) + 24;
	var seedersendloc = response.indexOf('</dd>', seedersloc);
	output[1] = response.substring(seedersloc, seedersendloc)

	//grep leechers
	regexp = /<dt>Leechers:<\/dt>/;
	var leechersloc = response.search(regexp) + 25;
	var leechersendloc = response.indexOf('</dd>', leechersloc);
	output[2] = response.substring(leechersloc, leechersendloc)

	//grep size
	regexp = /<dt>Size:<\/dt>/;
	var sizeloc = response.search(regexp) + 21;
	var sizeendloc = response.indexOf('(', sizeloc);
	output[3] = response.substring(sizeloc, sizeendloc);

	return output;
}
	
function insertSource(url, rating, relationid) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(rd) {
			if (rd.status == 200) {

				var parseoutput = new Array();
				parseoutput = parse_piratebay(rd.responseText);
				
				//create title list element
				var sourceitem = document.createElement('li');
				sourceitem.innerHTML = "<a class='external text' href='"+url+"'>" + parseoutput[0] + "</a>";
				var votingsection = document.createElement('span');
				votingsection.setAttribute('class','editsection');
				//create element to display rating, will be updated when vote is cast
				var ratingDiv = document.createElement('p');
				ratingDiv.style.display = "inline";
				votingsection.appendChild(ratingDiv);

				//create vote up div
				var voteup = document.createElement('img');
				voteup.setAttribute('alt', 'Vote Up!');
				voteup.setAttribute('title', 'Vote Up!');
				voteup.style.cursor = 'pointer';
				voteup.src = voteup_data;
				//add ajax to vote up button, calls voteup.php?i=$relationid?v=[n(egative)|p(ositive)] which querys the DB and updates ratingDiv with the new rating
				voteup.addEventListener("click", 
							function(e) {
								if (e.currentTarget.getAttribute('voted') != 'true') {
									e.currentTarget.setAttribute('voted', 'true');
			
									GM_xmlhttpRequest({
										method: 'GET',
										url: 'http://etcet.net/primarysources/vote.php?i='+relationid+'&v=p',
										headers: {
											'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
											'Accept': 'application/atom+xml,application/xml,text/xml',
										},
										onload: function(voterequest) {
											if (voterequest.status==200) {
												if (voterequest.responseText)
													updateRating(voterequest.responseText);	
											}
										}
									});
								}
							}, 
							true);
				votingsection.appendChild(voteup);

				//create vote DOWN div TODO FUNCTIONIZE
				var votedown = document.createElement('img');
				votedown.setAttribute('alt', 'Vote Down!');
				votedown.setAttribute('title', 'Vote Down!');
				votedown.style.cursor = "pointer";
				votedown.src = votedown_data;
				//should probably make this a function too TODO
				votedown.addEventListener("click", 
							function(e) {
								if (e.currentTarget.getAttribute('voted') != 'true') {
									e.currentTarget.setAttribute('voted', 'true');

									GM_xmlhttpRequest({
										method: 'GET',
										url: 'http://etcet.net/primarysources/vote.php?i='+relationid+'&v=n',
										headers: {
											'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
											'Accept': 'application/atom+xml,application/xml,text/xml',
										},
										onload: function(voterequest) {
											if (voterequest.status==200) {
												if (voterequest.responseText)
													updateRating(voterequest.responseText);	
											}
										}
									});
								}
							}, 
							true);
				votingsection.appendChild(votedown);
				sourceitem.appendChild(votingsection);

				//create info list element
				var infolist = document.createElement('ul');
				var info = document.createElement('li');
				//all elements inside this <li> have to be "display: inline" to display on one line
				info.innerHTML = " <p style='display:inline;'>Seeders: " + parseoutput[1]
					+ " Leechers: " + parseoutput[2] + " Size: " + parseoutput[3] + "</p>";

				
				//update rating div with new score
				function updateRating(newscore) {
					ratingDiv.innerHTML = newscore + "&nbsp;";

					//set color of source list element, higher/lower rating = greener/reder
					var bgcolor;
					var colormod = (Math.abs(newscore) < 9) ? 12-Math.abs(newscore) : 0;
					if (colormod == '13') colormod = 'd';
					if (colormod == '12') colormod = 'c';
					if (colormod == '11') colormod = 'b';
					if (colormod == '10') colormod = 'a';
					if (newscore > 0) {
						bgcolor = "#"+colormod+"d"+colormod;
					}
					else if (newscore < 0) {
						bgcolor = "#d"+colormod+colormod;
					}
					else {
						bgcolor = "#fff";
					}

					sourceitem.style.backgroundColor = bgcolor;
				}
	
				//setup the rating the first time
				updateRating(rating);				

				infolist.appendChild(info);
				sourceitem.appendChild(infolist);
				sourceslist.appendChild(sourceitem);
			}
	    	}
	});	
}

//hide error dialog
function hideError(elem) {
	elem.style.display = 'none';
}

//show error dialog with $string
function showError(elem, string) {
	document.getElementById('ps_errormsg').innerHTML = "&nbsp;" + string;
	elem.style.display = 'block';
}

//SUBMIT action for tpb input box (enter key) and ok button
function submit_tpb() {
	//get errorstub
	var errorstub = document.getElementById('ps_msg');
	//get tpb input value
	var tpb_id = document.getElementById('ps_tpb').value;
	//CLIENT SIDE VALIDATION
	//must be 7 digits
	var regexp = /^([0-9]{7})$/;
	if (!regexp.test(tpb_id)) {
		showError(errorstub, "Pirate Bay ID must be 7 digits.");
		return;
	}
	//must actually exist, i.e. tpb_url returns 200 OK 
	var tpb_url = "http://thepiratebay.org/torrent/"+tpb_id;
	GM_xmlhttpRequest({
		method: 'GET',
		url: tpb_url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml' 
		},
		onload: function (check_rd) {
			if (check_rd.status == 200) {
				//seems to be a valid tpb link, 
				//START XMLHTTPREQUEST TO ADDSOURCE.PHP
				//takes a=$article & s=$tpb_id
				//returns ERROR:msg or SUCCESS:$relationid
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://etcet.net/primarysources/addsource.php',
					headers: {
						'Content-type':'application/x-www-form-urlencoded'
					},
					data: encodeURI('a='+article+'&s='+tpb_id),
					onload: function (get_rd) { 
						//parse php output
						var returnarray = new Array();
						returnarray = get_rd.responseText.split(":");
						var status = returnarray[0].substring(0,7);
						if (status == 'SUCCESS') {
							var relationid = returnarray[1];
							//insert newly created source into article
							insertSource(tpb_url,0,relationid);
							
							//remove add source dialog, hide error dialog, and change add link state from 'cancel' to 'add'
							addsource = document.getElementById('addsource');
							sourceslist.removeChild(addsource);
							hideError(errorstub);
							addlink.innerHTML = 'add';
						}
						else {	//ERROR
							showError(errorstub, returnarray[1]);
						}
					}
				});
			}
			else {	//HTTP status code != 200
				showError(errorstub, "That Pirate Bay ID does not exist.");
			}
		}
	});
}

//SEARCH for the pirate bay
function search_tpb() {
	//get errorstub
	var errorstub = document.getElementById('ps_msg');
	//get tpb search input value
	var searchterm = document.getElementById('ps_tpb_s').value;

	//remove old search results if neccessary
	var oldresults = document.getElementById('searchresults');
	if (oldresults != null)
		oldresults.parentNode.removeChild(oldresults);

	var searchurl = 'http://thepiratebay.org/search/'+searchterm+'/0/99/0';
	
	GM_xmlhttpRequest({
        	method: 'GET',
        	url: searchurl,
        	headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
                onload: function(rd) {
			if (rd.status == 200) {
			 	if (!(rd.responseText.match(/No hits. Try adding/))){
					rd.responseText = rd.responseText.replace(/\n|\r/g, "");
					rd.responseText = rd.responseText.replace(/.*?<table id=\"searchResult\">/,'<table id="searchResult">');
					rd.responseText = rd.responseText.replace(/<\/table>.*/,'</table>');
					rd.responseText = rd.responseText.replace(/href=\"\//g,'href=\"http://thepiratebay.org/');
					
					var searchresults = document.createElement('div');
					searchresults.setAttribute('id','searchresults');
					searchresults.innerHTML = rd.responseText;
				
					addsource = document.getElementById('addsource');
					addsource.appendChild(searchresults);

					//START MODIFY TABLE
					//modify table header
					var thead = document.getElementById('tableHead');
					var trheader = thead.getElementsByTagName('tr')[0];
					var firstth = trheader.getElementsByTagName('th')[0];
					//want to insert before first <th>
					var newheader = document.createElement('th');
					trheader.insertBefore(newheader, firstth);
					
					//modify table rows	
					//get all category <td>'s (will insert before these)
					var categorylinks = new Array();
					categorylinks = getElementsByClass('vertTh', searchresults, 'td');
					//get all detail link <a>'s (will grep tpb id from these)
					var detaillinks = new Array();
					detaillinks = getElementsByClass('detLink', addsource, 'a');

					//add new td to each row before category td
					for (var i in detaillinks) {
						//create new td for selecting search result row
						var newtd = document.createElement('td');
						newtd.setAttribute('result', i);
						var searchaddbutton = document.createElement('img')
						searchaddbutton.src = searchaddbutton_data;
						newtd.appendChild(searchaddbutton);
						
						//pretty colors
						newtd.addEventListener("mouseover",
								function(e) {
									e.currentTarget.style.backgroundColor = hovercolor;
									detaillinks[e.currentTarget.getAttribute('result')].parentNode.style.backgroundColor = hovercolor;
								},
								true);
						newtd.addEventListener("mouseout",
								function(e) {
									e.currentTarget.style.backgroundColor = normalcolor;
									detaillinks[e.currentTarget.getAttribute('result')].parentNode.style.backgroundColor = normalcolor;
								},
								true);
						//get id of search result on click
						newtd.addEventListener("click",
								function(e) {
									var index = e.currentTarget.getAttribute('result');
									var tpbinput = document.getElementById('ps_tpb');
									var tpburl = detaillinks[index];
									//grep tpb id from url
									var regexp = /(\d{7})+/;
									var urlre = regexp.exec(tpburl);

									var tpbid;
									if (urlre) 
										tpbid = urlre[0];
									else 
										showError(errorstub, "Cannot grep pirate bay id from link url");

									tpbinput.value = tpbid;
									searchresults.parentNode.removeChild(searchresults);
								},
								true);

						//insert add button before category column
						categorylinks[i].parentNode.insertBefore(newtd, categorylinks[i]);
					}
					//END MODIFY TABLE
				}
			}
		}
	});
}

function appendTPBInput(addsourcelist) {
	var addsourcelistitem = document.createElement('li');

	//create tpb id input
	var tpb_input = document.createElement('input');
	tpb_input.setAttribute('type','text');
	tpb_input.setAttribute('id','ps_tpb');
	//register call back for enter key press -> submit_tpb()
	tpb_input.addEventListener("keypress",
				function(e) {
					if (e.which == 13)
						submit_tpb();
				},
				true);

	//create ok button
	var okadd = document.createElement('input');
	okadd.setAttribute('type', 'button');
	okadd.setAttribute('value', 'OK!');
	//register click call back -> submit_tpb()
	okadd.addEventListener("click", submit_tpb, true);

	//create 'or'
	var orp = document.createElement('p');
	orp.innerHTML = '&nbsp;or enter ID: &nbsp;';
	orp.style.display = 'inline';

	//create search input
	var search_input = document.createElement('input');
	search_input.setAttribute('type','text');
	search_input.setAttribute('id','ps_tpb_s');
	var searchterm = article.replace(/_/g, " ");
	search_input.setAttribute('value', searchterm);
	search_input.addEventListener("keypress",
				function(e) {
					if (e.which == 13)
						search_tpb();
				},
				true);

	//create search button
	var searchbut = document.createElement('input');
	searchbut.setAttribute('type','button');
	searchbut.setAttribute('value','Search');
	//register click callback
	searchbut.addEventListener("click", search_tpb, true);

	//create 'how-to' search message
	var tpbmsg = document.createElement('p');
	tpbmsg.innerHTML = "Search for a torrent, or enter the 7 digit piratebay torrent identifier for a specific torrent (e.g. http://thepiratebay.org/torrent/<b>1234567</b>/)";

	//append new <li> to source <ul>
	addsourcelistitem.appendChild(tpbmsg);
	addsourcelistitem.appendChild(search_input);
	addsourcelistitem.appendChild(searchbut);
	addsourcelistitem.appendChild(orp);
	addsourcelistitem.appendChild(tpb_input);
	addsourcelistitem.appendChild(okadd);

	addsourcelist.appendChild(addsourcelistitem);
}

//END FUNCTIONS

//  ________
//  ENTRY    |
//  __POINT  |
//       _|  |_
//       \    /
//	  \  /
//         \/
/* START: get sources related to article
	-POST to lookup.php?a=[article name] (ex. lookup.php?a=Linux)
	 ->returns array of {source url, relationship rating, relationship id} triplets
		source url: used to link to source
		relationship rating: is displayed and used to calculate the background color
		relationship id: used when changing the relationship rate via ajaxy vote buttons
	-Call printSource for each element
	 ->adds source <li> to the dom structure

*/

//get current article from the url
var url = document.location.href;
var article = url.substring(url.lastIndexOf('/')+1);

//if article starts with "Special:", "Template:" just die
if ( /^(Special:).*/.test(article) || /^(Template:).*/.test(article) )
	exit(0);

//will be adding <li>'s to this in printSource and maybe appending it to the dom below (if sources exist)
var sourceslist = document.createElement('ul');

//START HEADER
//create header
var header = document.createElement('h2');

//START ADD LINK
var editbutton = document.createElement('span');
editbutton.setAttribute('class', 'editsection');
var addlink = document.createElement('a');
addlink.setAttribute('title','Add primary source');
addlink.style.cursor = 'pointer';
addlink.innerHTML = 'add';
//register click callback for add/cancel link
addlink.addEventListener("click", 
		function() {
			//add was clicked
			if (addlink.innerHTML == 'add') {
				//change state
				addlink.innerHTML = 'cancel';

				//create new <li> for the add source dialog
				var addsource = document.createElement('li');
				addsource.setAttribute('id','addsource');
				addsource.innerHTML = 'Add source from <select><option>ThePirateBay</option></select>';
	
				//append input & ok for piratebay
				var addsourcelist = document.createElement('ul');
				appendTPBInput(addsourcelist);

				addsource.appendChild(addsourcelist);
				sourceslist.appendChild(addsource);
				
				//set keyboard focus on new input box
				document.getElementById('ps_tpb').focus();
			}
			//cancel was clicked
			else {
				//change state
				addlink.innerHTML = 'add';

				//remove add source dialog
				addsource = document.getElementById('addsource');
				addsource.parentNode.removeChild(addsource);

				//hide any error messages that may have occured during adding
				//or display default message if there are no sources
				if (sourceslist.hasChildNodes()) 
					hideError(errorstub);
				else
					showError(errorstub, defaultmsg);
			}	
		}, 
		true);

//print []'s around the add
var leftbracket = document.createElement('p');
leftbracket.style.display = 'inline';
leftbracket.innerHTML = '[';
var rightbracket = document.createElement('p');
rightbracket.style.display = 'inline';
rightbracket.innerHTML = ']';

//attach to header
editbutton.appendChild(leftbracket);
editbutton.appendChild(addlink);
editbutton.appendChild(rightbracket);
header.appendChild(editbutton);
//END ADD LINK

//create title
var title = document.createElement('span');
title.setAttribute('class','mv-headline');
title.innerHTML = 'Primary Sources';
//attach to header
header.appendChild(title);

//insert header
insertLoc.parentNode.insertBefore(header, insertLoc);
//END HEADER

//START ERROR STUB
//create error stub, will use for user messages
var errorstub = document.createElement('p');
errorstub.setAttribute('id','ps_msg');
//attach '!' image
var alerticon = document.createElement('img');
alerticon.src = alert_data;
var errormsg = document.createElement('p');
errormsg.setAttribute('id','ps_errormsg');
errormsg.style.display = 'inline';

errorstub.appendChild(alerticon);
errorstub.appendChild(errormsg);
//insert error stub
insertLoc.parentNode.insertBefore(errorstub, insertLoc);

//set default message
showError(errorstub, defaultmsg);
//END ERROR STUB

//insert main source <ul>
insertLoc.parentNode.insertBefore(sourceslist, insertLoc);

//TODO check if <title> is worth looking up
//START XMLHTTPREQUEST TO LOOKUP.PHP
//lookup relationships: lookup.php?a=$article
//	returns:	array of {source url, relation rating, relation id} triplets for each source related to $article
//			"" when sources dne
//loop insertSource(): adds <li> for each source to main <ul>
GM_xmlhttpRequest({
	method: 'POST',
	url: 'http://etcet.net/primarysources/lookup.php',
	headers: {
		'Content-type':'application/x-www-form-urlencoded'
	},
	data: encodeURI('a='+article),
	onload: function(rd) {
		//strip leading and trailing spaces
		rd.responseText = rd.responseText.replace(/^\s+|\s+$/g, '');
		//remove last trailing comma (php output format is "url[0] rating[0] id[0], url[1] rating[1] id[1],")
		rd.responseText = rd.responseText.slice(0,-1);
	
		//if there are sources
		if (rd.responseText != "") {
			//hide default message
			hideError(errorstub);
		
			//parse php output &
			var sources = new Array();
			sources = rd.responseText.split(",");

			//.. insert every source
			for (var i in sources) {
				var incoming = sources[i].split(" ");
				var url = incoming[0];
				var rating = incoming[1];
				var relationid = incoming[2];
				insertSource(url, rating, relationid);
			}
			
		}

	}
});



