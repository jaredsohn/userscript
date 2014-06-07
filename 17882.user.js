// ==UserScript==
// @name           Import CDBaby Releases into MusicBrainz
// @version        2.3.2
// @namespace      MBVA
// @include        http://cdbaby.com/cd/*
// @include        http://www.cdbaby.com/cd/*
// @include        http://musicbrainz.org/bare/cdlookup.html*
// @include        http://musicbrainz.org/edit/artist/add.html
// @include        http://musicbrainz.org/cdi/enter.html*
// @include        http://musicbrainz.org/show/release/*
// @include        http://musicbrainz.org/edit/relationship/addurl.html*
// @include        http://musicbrainz.org/show/release/relationships.html*
// @include        http://musicbrainz.org/cdi/selectrelease.html
// ==/UserScript==

// Figure out where we are
if(location.href.slice(0,21)=="http://cdbaby.com/cd/") LoadedatCDBaby();
if(location.href.slice(0,25)=="http://www.cdbaby.com/cd/") LoadedatCDBaby();
if(location.href.slice(0,41)=="http://musicbrainz.org/bare/cdlookup.html") ImportatMBTOCSearch();
if(location.href=="http://musicbrainz.org/edit/artist/add.html") ImportatMBArtistSearch();
if(location.href.slice(0,37)=="http://musicbrainz.org/cdi/enter.html") ImportatMBAddRelease();
if(location.href.slice(0,47)=="http://musicbrainz.org/show/release/?releaseid=") ImportatMBAddExtra();
if(location.href.slice(0,52)=="http://musicbrainz.org/edit/relationship/addurl.html") ImportatMBAddAR();
if(location.href.slice(0,54)=="http://musicbrainz.org/show/release/relationships.html") ImportatMBCleanup();
// Add cover to release if release already existed and we're just adding the toc
if(location.href=="http://musicbrainz.org/cdi/selectrelease.html") {
	if(GM_getValue("CDBabyImportStatus") == 1) {
		// Avoid re-adding the link if we started at MB in the first place
		if(GM_getValue("sourceurl").match("from/musicbrainz") != "from/musicbrainz") {
			fooLink ="http://musicbrainz.org/edit/relationship/addurl.html?id=";
			fooLink =fooLink+document.getElementsByTagName("table")[12].id.slice(9);
			fooLink = fooLink+"&linktype=34"+"&type=album&name="+GM_getValue("releaseName");
			location.href = fooLink+"&url="+GM_getValue("sourceurl"); 
			fUS1 = "http://musicbrainz.org/show/release/?releaseid=";
			fUS1 = fUS1+document.getElementsByTagName("table")[12].id.slice(9)+"&new=1";
			GM_setValue("finalURL", fUS1); 
		}
			GM_setValue("CDBabyImportStatus", 4);
	}
}
// Add the Import button to CD Baby
function LoadedatCDBaby() {
	scrapeInfo()
	var newLine1 = document.createElement('br');
	var newLine3 = document.createElement('br');
	var importButton = document.createElement('input');
		importButton.type = 'button';
		if(navigator.appName=="Netscape") {
			// Make GM listen for the click
			importButton.addEventListener("click", ImportatCDBaby, true);
		}
		if(navigator.userAgent.indexOf("Opera")!=-1) {
			var versionindex = navigator.userAgent.indexOf("Opera")+6;
			if (parseInt(navigator.userAgent.charAt(versionindex))>=8) {
				// Make USerJS listen for the click
				importButton.setAttribute("onclick", "ImportatCDBabyForOpera();");
			}
		}
	var newLine4 = document.createElement('br');
	var importText = document.createElement('span');
		if(navigator.appName=="Netscape") {
			importText.innerHTML = "You are using Firefox.  ";
			importText.innerHTML = importText.innerHTML+"The Import script will be fully ";		

		importText.innerHTML = importText.innerHTML+"functional for you.";
			importButton.value = 'Import Release into MusicBrainz';
		}
		if(navigator.userAgent.indexOf("Opera")!=-1) {
			var versionindex = navigator.userAgent.indexOf("Opera")+6;
			if (parseInt(navigator.userAgent.charAt(versionindex))>=8) {
				fUS2 = importText.innerHTML;
				fUS2 = "You are using Opera.  ";
				fUS2 = fUS2+"Please note that due to inherent limitations in ";
				fUS2 = fUS2+"UserJS, this script will NOT do everything for ";
				fUS2 = fUS2+"you.  You will still need to set the release ";
				fUS2 = fUS2+"event and CD Baby ARs manually.  You also ";
				fUS2 = fUS2+"need to remember to do Guess Case and such, ";
				fUS2 = fUS2+"as the script cannot do it for you.  It is also much";
				fUS2 = fUS2+"easier to add duplicate releases using this ";
				fUS2 = fUS2+"version.  Please be careful!";
				importButton.value = 'Import Release into MusicBrainz as NEW release';
				var importButton2 = document.createElement('input');
				importButton2.type = 'button';
				importButton2.setAttribute("onclick", "ImportatCDBaby();");
				fUS9 = "Import TOC into MusicBrainz ";
				importButton2.value = fUS9+"for EXISTING release";
			}
		}
	// Check for bad TOC
	if((rTOC.split(" ").length-3) > tTitle.length) {
		importText.innerHTML = "The TOC for this listing is invalid.  Please PM the CD Baby url ";
		importText.innerHTML = importText.innerHTML+"to brianfreud so that this can be corrected.";
	}
	if(rTOC.length == 0) {
		importText.innerHTML = "Note that there is no TOC attached to this listing.  Switching ";
		importText.innerHTML = importText.innerHTML+"to Opera-import mode.";
		if(navigator.appName=="Netscape") {
			importButton.addEventListener("click", ImportatCDBabyForOpera, true);
		}
	} else if((rTOC.split(" ").length-3) < tTitle.length) {
		importText.innerHTML = importText.innerHTML+" \n This is a multiple CD release, note ";
		importText.innerHTML = importText.innerHTML+"that only CD 1 is currently able to be ";
		importText.innerHTML = importText.innerHTML+"imported.  You will have to do the other ";
		importText.innerHTML = importText.innerHTML+"CDs manually";
		tTitle = tTitle+" (disc 1)";
	} else if(rTOC.split(" ")[2].length < rTOC.split(" ")[tTitle.length].length) {
		importText.innerHTML = "The TOC for this listing is invalid.  Please PM the CD Baby url ";
		importText.innerHTML = importText.innerHTML+"to brianfreud so that this can be corrected.";
	}
	document.getElementById("infoline").appendChild(newLine1);
	document.getElementById("infoline").appendChild(importButton);
	if(navigator.userAgent.indexOf("Opera")!=-1) {
		var versionindex = navigator.userAgent.indexOf("Opera")+6;
		if (parseInt(navigator.userAgent.charAt(versionindex))>=8) {
			document.getElementById("infoline").appendChild(importButton2);
		}
	}
	document.getElementById("infoline").appendChild(newLine3);
	document.getElementById("infoline").appendChild(importText);
	document.getElementById("infoline").appendChild(newLine4);
}
// Scrape all info from CD Baby
function scrapeInfo() {
	aName = document.getElementById('albuminfo').getElementsByTagName('h1')[0].innerHTML;
	aName = aName.replace(/&quot;/,"\"").replace(/&amp;/,"&").replace(/&lt;/,"<");
	aName = aName.replace(/&gt;/,">").replace(/&euro;/,"€").replace(/&#162;/,"¢");
	aName = aName.replace(/&#163;/,"£").replace(/&#165;/,"¥").replace(/&#169;/,"©");
	aName = aName.replace(/&#174;/,"®").replace(/&#176;/,"°");
	rName = document.getElementById('albuminfo').getElementsByTagName('h2')[0].innerHTML;
	rName = rName.replace(/&quot;/,"\"").replace(/&amp;/,"&").replace(/&lt;/,"<");
	rName = rName.replace(/&gt;/,">").replace(/&euro;/,"€").replace(/&#162;/,"¢");
	rName = rName.replace(/&#163;/,"£").replace(/&#165;/,"¥").replace(/&#169;/,"©");
	rName = rName.replace(/&#174;/,"®").replace(/&#176;/,"°");
	infoline = document.getElementById('infoline').innerHTML.slice(2);
	rYear = infoline.slice(0,4);
	rLabel = infoline.slice(5).split("(")[0];
	if(infoline.search(/\50/)>0) rUPC = infoline.slice(5).split("(")[1].split(")")[0];
	else rUPC = " ";
	if(rUPC == "format: CD-R") rUPC = "";
	trackData = document.getElementById('tracks');
	rTOC = document.getElementsByName('toc')[0].content;
	rTrackCount = trackData.getElementsByTagName("dd").length-1;
	tTitle = new Array(rTrackCount+1);
	for(i=0;i<=rTrackCount;i++) { 
		tTitle[i] = trackData.getElementsByTagName('dd')[i].innerHTML; 
		fUS5 = trackData.getElementsByTagName('dd')[i];
		if(fUS5.childNodes.length >1) {
			tTitle[i] =  fUS5.getElementsByTagName('a')[0].innerHTML;;
		} else {
			if(i<9) tTitle[i] = tTitle[i].slice(2, tTitle[i].length);
			else tTitle[i] = tTitle[i].slice(3, tTitle[i].length);
		}
		tTitle[i] = tTitle[i].replace(/&quot;/,"\"").replace(/&amp;/,"&").replace(/&lt;/,"<");
		tTitle[i] = tTitle[i].replace(/&gt;/,">").replace(/&euro;/,"€").replace(/&#162;/,"¢");
		tTitle[i] = tTitle[i].replace(/&#163;/,"£").replace(/&#165;/,"¥");
		tTitle[i] = tTitle[i].replace(/&#169;/,"©").replace(/&#174;/,"®").replace(/&#176;/,"°");

	}
	rMBDiscID = document.getElementsByName('mbdiscid')[0].content;
	sURL = location.href;
	GM_setValue("CDBabyImportStatus", 0);
}
// Store all info at CD Baby
function storeInfo() {
	GM_setValue("artistName", aName);
	GM_setValue("releaseName", rName);
	GM_setValue("releaseYear", rYear);
	GM_setValue("releaseLabel", rLabel);
	GM_setValue("releaseUPC", rUPC);
	GM_setValue("releaseTrackCount", rTrackCount);
	GM_setValue("releaseTOC", rTOC);
	GM_setValue("releaseDiscID", rMBDiscID);
	GM_setValue("sourceurl", sURL);
	trackTitles = "";
	for(i=0;i<rTrackCount;i++) { 
		trackTitles = trackTitles+tTitle[i]+"M-U-S-I-C-B-R-A-I-N-Z";
	}
	trackTitles = trackTitles+tTitle[rTrackCount];
	GM_setValue("releaseTrackTitles", trackTitles);
}
// User clicked the import button
function ImportatCDBaby() {
	storeInfo();
	longString = "http://musicbrainz.org/bare/cdlookup.html?id="+rMBDiscID+"&tracks=";
	longString = longString+(rTrackCount+1)+"&toc="+rTOC.replace(/ /,"+");
	location.href = longString;
}
function ImportatCDBabyForOpera() {
	var importOpera = "http://musicbrainz.org/cdi/enter.html?hasmultipletrackartists=0&artistid="
	if(aName=="Various Artists") var importOpera = importOpera+"1";
	else var importOpera = importOpera+"2";
	var importOpera = importOpera+"&artistedit=1&artistname=";
	var importOpera = importOpera+encodeURI(aName);
	var importOpera = importOpera+"&releasename=";
	var importOpera = importOpera+encodeURI(rName);
	var importOpera = importOpera+"&tracks=";
	var importOpera = importOpera+(rTrackCount+1);
	for(i=0;i<=rTrackCount;i++) {
		var importOpera = importOpera+"&track";
		var importOpera = importOpera+i;
		var importOpera = importOpera+"=";
		var importOpera = importOpera+encodeURI(tTitle[i]);
	}
	var importOpera = importOpera+"&discid=";
	var importOpera = importOpera+rMBDiscID;
	var importOpera = importOpera+"&toc=";
	var importOpera = importOpera+encodeURI(rTOC);
	location.href = importOpera;
}
// Populate search fields at MB in TOC add view
function ImportatMBTOCSearch() {
	if(GM_getValue("CDBabyImportStatus")==0) {
		longElement1 = document.getElementById("content-td");
		longElement1 = longElement1.getElementsByTagName('tr')[2];
		longElement2 = longElement1.getElementsByTagName('td')[1];
		longElement2 = longElement2.getElementsByTagName('form')[0];
		longElement3 = longElement2.getElementsByTagName('div')[0];
		longElement3 = longElement3.getElementsByTagName('input')[0];
		longElement3.value = GM_getValue('artistName');
		longElement4 = document.getElementById("content-td");
		longElement4 = longElement4.getElementsByTagName('tr')[4];
		longElement5 = longElement4.getElementsByTagName('td')[1];
		longElement5 = longElement5.getElementsByTagName('form')[0];
		longElement6 = longElement5.getElementsByTagName('div')[0];
		longElement6 = longElement6.getElementsByTagName('input')[0];
		longElement6.value = GM_getValue('releaseName');
		GM_setValue("CDBabyImportStatus", 1);
	}
}
// Why MB doesn't carry this over I have no idea...
function ImportatMBArtistSearch() {
	if(GM_getValue("CDBabyImportStatus")==1) {
		document.getElementById("id_artistfiltersearch").value = GM_getValue("artistName");
		document.getElementsByName('submitvalue')[0].click();
	}
}
// If 1, populate the release info
// If 2, populate the edit note
function ImportatMBAddRelease() {
 	if(GM_getValue("CDBabyImportStatus")==2) {
//		if(document.title = "Add New Label - MusicBrainz") {
//			document.getElementById('notetext').setAttribute('rows', 10);
//			document.getElementById('notetext').setAttribute('cols', 85);
//			MBnoteText = "Release listing this label is listed at CD Baby:
//				 "+GM_getValue("sourceurl");
//			document.getElementById('notetext').value = MBnoteText;
//		}
//		else {
			document.getElementById('notetext').setAttribute('rows', 10);
			document.getElementById('notetext').setAttribute('cols', 85);
			MBnoteText = "Release imported using the CD Baby import script, ";
			MBnoteText = MBnoteText+"available for free at: "; 
			MBnoteText = MBnoteText+"http://userscripts.org/scripts/show/17882";
			MBnoteText = MBnoteText+"\n\nTOC for this release is: ";
			MBnoteText = MBnoteText+GM_getValue("releaseTOC");
			MBnoteText = MBnoteText+"\nDiscID for this release is: ";
			MBnoteText = MBnoteText+GM_getValue("releaseDiscID");
			MBnoteText = MBnoteText+"\n\nRelease is listed at CD Baby at: ";
			MBnoteText = MBnoteText+GM_getValue("sourceurl");
			document.getElementById('notetext').value = MBnoteText;
//			GM_setValue("CDBabyImportStatus", 3);
//		}
	}
	if(GM_getValue("CDBabyImportStatus")==1) {
		document.getElementById("id_releasename").value = GM_getValue("releaseName");
		for(i=0;i<=GM_getValue("releaseTrackCount");i++) { 
			inputMBTrack = "id_t"+i;
			document.getElementById(inputMBTrack).value = 

GM_getValue("releaseTrackTitles").split("M-U-S-I-C-B-R-A-I-N-Z")[i];
		}
		document.getElementsByName('attr_type')[0].value = 1;
	document.getElementsByName('attr_status')[0].value = 100;
		document.getElementsByName('attr_language')[0].value = 120;
		document.getElementsByName('attr_script')[0].value = 28;
		document.getElementById('BTN_ALL').click();
		document.getElementsByName('rev_year-0')[0].value = GM_getValue("releaseYear");
		document.getElementsByName('rev_country-0')[0].value = 222;
		document.getElementsByName('rev_labelname-0')[0].value = GM_getValue("releaseLabel");
		document.getElementsByName('rev_barcode-0')[0].value = GM_getValue("releaseUPC");
		document.getElementsByName('rev_format-0')[0].value = 1;
		GM_setValue("CDBabyImportStatus", 2);
	}
}
function ImportatMBAddExtra() {
 	if(GM_getValue("CDBabyImportStatus")==4) {
		if(location.href==GM_getValue("finalURL")) {
			var returnBox = document.createElement('div');
			var returnLink = document.createElement('a');
			returnLink.href = GM_getValue("sourceurl");
			returnLink.innerHTML = "Return to "+GM_getValue("artistName")+": ";
			returnLink.innerHTML = returnLink.innerHTML+GM_getValue("releaseName");
			returnLink.innerHTML = returnLink.innerHTML+" at CD Baby";
			document.getElementById("BatchOp").parentNode.appendChild(returnBox);
			returnBox.appendChild(returnLink);
			GM_setValue("CDBabyImportStatus", 6);
		}

	}
	if(GM_getValue("CDBabyImportStatus")==2) {
		GM_setValue("finalURL", location.href);
		fooLink = "http://musicbrainz.org/edit/relationship/addurl.html?id=";
		fooLink = fooLink+location.href.slice(47,53)+"&linktype=34";
		fooLink = fooLink+"&type=album&name="+GM_getValue("releaseName");
		location.href = fooLink+"&url="+GM_getValue("sourceurl"); 
		GM_setValue("CDBabyImportStatus", 4);
	}
}
function ImportatMBAddAR() {
 	if(GM_getValue("CDBabyImportStatus")==4) {
			document.getElementById('btnYes').click();
			GM_setValue("CDBabyImportStatus", 7);
	}
}
function ImportatMBCleanup() {
 	if(GM_getValue("CDBabyImportStatus")==7) {
		GM_setValue("CDBabyImportStatus", 4);
		location.href = GM_getValue("finalURL");
	}
}