// ==UserScript==

// @name           Market Cleaner 1.0

// @namespace      http://myeve.eve-online.com

// @description    Removes unwanted drivel

// @include        http://myeve.eve-online.com/ingameboard.asp?a=topic*
// ==/UserScript==

/*
CAOD Cleaner
 v1.3

Created by Randell. 

Work in progress. Evemail for details/questions etc.

Ps. I'm sure the code isn't 'perfect' and it might even have leftover variables in it and it sure is bastard code. 
But well.... It works and I think just documenting the code is more then enough for something the boss doesn't pay me for. :-)

*/

var filterposter,filtercorp,filteralliance;

// Example who to filter. Names picked at random from 1 CAOD thread. Dont bother me if it's you/your corp/your alliance.
//filterposter=['Shoukei','Divus'];
//filtercorp=['HELLO KITTY'];
//filteralliance=['GoonSwarm'];

filterposter=['ForumPosterAlt','Morrigan Starlover','Minigin','Ezoran DuBlaidd'];
filtercorp=['HERRO KITTY','Moon Kitten','G00NFLEET','Glass House','NO BRAKES','theBEANman','dastommy79','Incontinentiana','Caldari Provisions','Deep Core Mining Inc.','The Scope','Imperial Academy','Federal Navy Academy','Viziam','Gnulpie','AmarrSecSlave','Yet Another CAOD Inspired 1 Woman Alt Corp','Central Intelligence Service','Gurbeta Corp','The ReeRee Brigade','Alt Corporation','Skullduggery Inc','Republic War Machine Industries','Station Gremlings','Alt Troll','Ragna Rok Corp'];
filteralliance=['GoonSwarm'];

// ==================================================================================================================
// ==================================================================================================================
// ==================================================================================================================
// ==========================DO NOT EDIT BELOW THIS PART UNLESS YOU KNOW WHAT YOU ARE DOING!!========================
// ==================================================================================================================
// ==================================================================================================================
// ==================================================================================================================


function get_all(xpath, node){
     return document.evaluate(    xpath,
             node,
             null,
             XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
             null );
}


function get_one(xpath, node){
     return document.evaluate(    xpath,
             node,
             null,
             XPathResult.FIRST_ORDERED_NODE_TYPE,
             null ).singleNodeValue;
}


function showpost(ev) {
     var a = get_one(".//div[@class='hide']", ev.parentNode.parentNode);
     if(a.style.display == "none"){
       a.style.display="";
        ev.textContent = " [Hide]";
     }
     else {
        a.style.display="none";
        ev.textContent = " [Show]";
     }
}

function popuppost(ev) {
	my_window= window.open ("", "mywindow1","status=1,scrollbars=1,toolbar=1,resizable=1,width=900,height=500,screenX=50,screenY=50");
	my_window.document.write("<head><style type='text/css'><!-- "); 
	my_window.document.write("body {BACKGROUND-COLOR:4D4D57; COLOR:white; FONT-FAMILY:Verdana; FONT-SIZE:11px;}");
	my_window.document.write(".quote { font-family:verdana,arial; font-size:7pt;}");
	my_window.document.write("--> </style></head><body>");
	my_window.document.write(ev); 
	my_window.document.write("</body>");
}
	

// Test to see if we are in CAOD subforum. Below is what we test on.
// <A href="?a=channel&channelID=3521"> == CAOD 
var CAOD, thisCAOD;
CAOD = document.evaluate("//a[@href='?a=channel&channelID=3515']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
thisCAOD = CAOD.snapshotItem(0);
if(thisCAOD.innerHTML=="Market Discussions"){


// ==================================================================================================================
// ================================== BLOCK OF OLD CODE. FOR REFERANCE ONLY =========================================
// ==================================================================================================================
/*
	// Filter whole threads based on poster. ! Not very useful as we can check on corp or alliance !
	// This part of the code is purely kept for referance only. It's not very useful.

	var allDivs, thisDiv;
	allDivs = document.evaluate("//td[@class='mbForum']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		// do something with thisDiv
		if(thisDiv.innerHTML=="CCP kieron"){
			//thisDiv.innerHTML=thisDiv.innerHTML.replace('CCP kieron',"<b>CCP kieron</b>");
			var rem = thisDiv.parentNode;
			rem.parentNode.removeChild(rem);
		}
	}
	
*/	

/*
	// Filter whole posts in a thread based on poster name
	// This part of the code allows us to remove/filter entire threads in the subforum thread overview page.
	// But like the above function it only works on charname and thus not very usefull if you dont want to see anything
	// from certain corps/alliances. Not used.

	posterDivs = document.evaluate("//span",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < posterDivs.snapshotLength; i++) {
		thisDiv = posterDivs.snapshotItem(i);
		// do something with thisDiv
		for(var t=0; t < filterposter.length; t++){
			if(thisDiv.innerHTML.match(filterposter[t])){
				thisDiv.innerHTML="Filtered";
			} // End If
		} // End For
	} // End For
*/	

// ==================================================================================================================

	// Filter whole posts in a thread based on charname, corp and alliance
	// The actual filtering takes place here.
	// A forum post is identified based on 3 TD classes.
	// mbForumFirst - First post in a thread. The starting post. (Only once per thread!)
	// mbForum - 2,4,6,8,etc post in a thread
	// mbForumAlt - 3,5,7,9, etc post in a thread
	//
	// First we cycle thruw all the even(mbForum) posts then the uneven(mbForumAlt).

	var j = 0;
	var allDivs, thisDiv, nextDiv;
	var copyTxt1,copyTxt2,copyTxt3,copyTxt4,copyTxt5,copyTxt6,copyTxt7,copyTxt8,copyTxt9,copyTxt10;
	var copyTxt11,copyTxt12,copyTxt13,copyTxt14,copyTxt15,copyTxt16,copyTxt17,copyTxt18,copyTxt19,copyTxt20;
	var copyTxt21,copyTxt22,copyTxt23,copyTxt24,copyTxt25,copyTxt26,copyTxt27,copyTxt28,copyTxt29,copyTxt30;
	var copyTxtPos=1;

	// The even(mbForum) posts

	allDivs = document.evaluate("//td[@class='mbForum']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		if(!thisDiv.innerHTML.match("Posted")) {

			// do something with thisDiv
			// Filter Posters
			for(var t=0; t < filterposter.length; t++){
				if(thisDiv.innerHTML.match(filterposter[t])){
					var copyMsg;
					copyMsg=thisDiv.innerHTML;

					thisDiv.innerHTML="Filtered";
					j = i+1;
					nextDiv = allDivs.snapshotItem(j);
					copyMsg+="<br>";
					copyMsg+=nextDiv.innerHTML;
					nextDiv.innerHTML="Filtered";

					var element=nextDiv;
     					element.appendChild(document.createElement('a'));
				       	element.lastChild.textContent = ' [Show]';
				     	element.lastChild.href = 'javascript:{}';

					switch(copyTxtPos) {
						case 1:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt1);
			        		           return false;
					                 } , false);
							break;
						case 2:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt2);
			        		           return false;
					                 } , false);
							break;
						case 3:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt3);
			        		           return false;
					                 } , false);
							break;
						case 4:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt4);
			        		           return false;
					                 } , false);
							break;
						case 5:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt5);
			        		           return false;
					                 } , false);
							break;
						case 6:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt6);
			        		           return false;
					                 } , false);
							break;
						case 7:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt7);
			        		           return false;
					                 } , false);
							break;
						case 8:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt8);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt9);
			        		           return false;
					                 } , false);
							break;
						case 10:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt10);
			        		           return false;
					                 } , false);
							break;
						case 11:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt11);
			        		           return false;
					                 } , false);
							break;
						case 12:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt12);
			        		           return false;
					                 } , false);
							break;
						case 13:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt13);
			        		           return false;
					                 } , false);
							break;
						case 14:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt14);
			        		           return false;
					                 } , false);
							break;
						case 15:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt15);
			        		           return false;
					                 } , false);
							break;
						case 16:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt16);
			        		           return false;
					                 } , false);
							break;
						case 17:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt17);
			        		           return false;
					                 } , false);
							break;
						case 18:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt18);
			        		           return false;
					                 } , false);
							break;
						case 19:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt19);
			        		           return false;
					                 } , false);
							break;
						case 20:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt20);
			        		           return false;
					                 } , false);
							break;
						case 21:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt21);
			        		           return false;
					                 } , false);
							break;
						case 22:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt22);
			        		           return false;
					                 } , false);
							break;
						case 23:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt23);
			        		           return false;
					                 } , false);
							break;
						case 24:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt24);
			        		           return false;
					                 } , false);
							break;
						case 25:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt25);
			        		           return false;
					                 } , false);
							break;
						case 26:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt26);
			        		           return false;
					                 } , false);
							break;
						case 27:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt27);
			        		           return false;
					                 } , false);
							break;
						case 28:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt28);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt29);
			        		           return false;
					                 } , false);
							break;
						case 30:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt30);
			        		           return false;
					                 } , false);
							break;
					}
					copyTxtPos++;

				}
			}// End For

			// Filter Corps
			for(var t=0; t < filtercorp.length; t++){
				if(thisDiv.innerHTML.match(filtercorp[t])){
					var copyMsg;
					copyMsg=thisDiv.innerHTML;

					thisDiv.innerHTML="Filtered";
					j = i+1;
					nextDiv = allDivs.snapshotItem(j);
					copyMsg+="<br>";
					copyMsg+=nextDiv.innerHTML;
					nextDiv.innerHTML="Filtered";

					var element=nextDiv;
     					element.appendChild(document.createElement('a'));
				       	element.lastChild.textContent = ' [Show]';
				     	element.lastChild.href = 'javascript:{}';

					switch(copyTxtPos) {
						case 1:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt1);
			        		           return false;
					                 } , false);
							break;
						case 2:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt2);
			        		           return false;
					                 } , false);
							break;
						case 3:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt3);
			        		           return false;
					                 } , false);
							break;
						case 4:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt4);
			        		           return false;
					                 } , false);
							break;
						case 5:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt5);
			        		           return false;
					                 } , false);
							break;
						case 6:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt6);
			        		           return false;
					                 } , false);
							break;
						case 7:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt7);
			        		           return false;
					                 } , false);
							break;
						case 8:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt8);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt9);
			        		           return false;
					                 } , false);
							break;
						case 10:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt10);
			        		           return false;
					                 } , false);
							break;
						case 11:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt11);
			        		           return false;
					                 } , false);
							break;
						case 12:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt12);
			        		           return false;
					                 } , false);
							break;
						case 13:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt13);
			        		           return false;
					                 } , false);
							break;
						case 14:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt14);
			        		           return false;
					                 } , false);
							break;
						case 15:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt15);
			        		           return false;
					                 } , false);
							break;
						case 16:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt16);
			        		           return false;
					                 } , false);
							break;
						case 17:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt17);
			        		           return false;
					                 } , false);
							break;
						case 18:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt18);
			        		           return false;
					                 } , false);
							break;
						case 19:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt19);
			        		           return false;
					                 } , false);
							break;
						case 20:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt20);
			        		           return false;
					                 } , false);
							break;
						case 21:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt21);
			        		           return false;
					                 } , false);
							break;
						case 22:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt22);
			        		           return false;
					                 } , false);
							break;
						case 23:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt23);
			        		           return false;
					                 } , false);
							break;
						case 24:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt24);
			        		           return false;
					                 } , false);
							break;
						case 25:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt25);
			        		           return false;
					                 } , false);
							break;
						case 26:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt26);
			        		           return false;
					                 } , false);
							break;
						case 27:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt27);
			        		           return false;
					                 } , false);
							break;
						case 28:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt28);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt29);
			        		           return false;
					                 } , false);
							break;
						case 30:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt30);
			        		           return false;
					                 } , false);
							break;
					}
					copyTxtPos++;

				}
			}// End For

			// Filter alliances
			for(var t=0; t < filteralliance.length; t++){
				if(thisDiv.innerHTML.match(filteralliance[t])){

					var copyMsg;
					copyMsg=thisDiv.innerHTML;
					thisDiv.innerHTML="Filtered";
					j = i+1;
					nextDiv = allDivs.snapshotItem(j);
					
					copyMsg+="<br>";
					copyMsg+=nextDiv.innerHTML;
					nextDiv.innerHTML="Filtered";

					var element=nextDiv;
     					element.appendChild(document.createElement('a'));
				       	element.lastChild.textContent = ' [Show]';
				     	element.lastChild.href = 'javascript:{}';

					switch(copyTxtPos) {
						case 1:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt1);
			        		           return false;
					                 } , false);
							break;
						case 2:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt2);
			        		           return false;
					                 } , false);
							break;
						case 3:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt3);
			        		           return false;
					                 } , false);
							break;
						case 4:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt4);
			        		           return false;
					                 } , false);
							break;
						case 5:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt5);
			        		           return false;
					                 } , false);
							break;
						case 6:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt6);
			        		           return false;
					                 } , false);
							break;
						case 7:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt7);
			        		           return false;
					                 } , false);
							break;
						case 8:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt8);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt9);
			        		           return false;
					                 } , false);
							break;
						case 10:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt10);
			        		           return false;
					                 } , false);
							break;
						case 11:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt11);
			        		           return false;
					                 } , false);
							break;
						case 12:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt12);
			        		           return false;
					                 } , false);
							break;
						case 13:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt13);
			        		           return false;
					                 } , false);
							break;
						case 14:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt14);
			        		           return false;
					                 } , false);
							break;
						case 15:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt15);
			        		           return false;
					                 } , false);
							break;
						case 16:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt16);
			        		           return false;
					                 } , false);
							break;
						case 17:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt17);
			        		           return false;
					                 } , false);
							break;
						case 18:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt18);
			        		           return false;
					                 } , false);
							break;
						case 19:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt19);
			        		           return false;
					                 } , false);
							break;
						case 20:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt20);
			        		           return false;
					                 } , false);
							break;
						case 21:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt21);
			        		           return false;
					                 } , false);
							break;
						case 22:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt22);
			        		           return false;
					                 } , false);
							break;
						case 23:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt23);
			        		           return false;
					                 } , false);
							break;
						case 24:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt24);
			        		           return false;
					                 } , false);
							break;
						case 25:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt25);
			        		           return false;
					                 } , false);
							break;
						case 26:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt26);
			        		           return false;
					                 } , false);
							break;
						case 27:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt27);
			        		           return false;
					                 } , false);
							break;
						case 28:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt28);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt29);
			        		           return false;
					                 } , false);
							break;
						case 30:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt30);
			        		           return false;
					                 } , false);
							break;

					}
					copyTxtPos++;


				} // End If
			} // End For
		} // End If
	} // End For

	// The uneven(mbForumAlt) posts

	allDivs = document.evaluate("//td[@class='mbForumAlt']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);

		if(!thisDiv.innerHTML.match("Posted")) {

			// do something with thisDiv
			// Filter Posters
			for(var t=0; t < filterposter.length; t++){
				if(thisDiv.innerHTML.match(filterposter[t])){

					var copyMsg;
					copyMsg=thisDiv.innerHTML;

					thisDiv.innerHTML="Filtered";
					j = i+1;
					nextDiv = allDivs.snapshotItem(j);
					copyMsg+="<br>";
					copyMsg+=nextDiv.innerHTML;
					nextDiv.innerHTML="Filtered";

					var element=nextDiv;
     					element.appendChild(document.createElement('a'));
				       	element.lastChild.textContent = ' [Show]';
				     	element.lastChild.href = 'javascript:{}';

					switch(copyTxtPos) {
						case 1:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt1);
			        		           return false;
					                 } , false);
							break;
						case 2:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt2);
			        		           return false;
					                 } , false);
							break;
						case 3:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt3);
			        		           return false;
					                 } , false);
							break;
						case 4:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt4);
			        		           return false;
					                 } , false);
							break;
						case 5:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt5);
			        		           return false;
					                 } , false);
							break;
						case 6:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt6);
			        		           return false;
					                 } , false);
							break;
						case 7:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt7);
			        		           return false;
					                 } , false);
							break;
						case 8:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt8);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt9);
			        		           return false;
					                 } , false);
							break;
						case 10:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt10);
			        		           return false;
					                 } , false);
							break;
						case 11:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt11);
			        		           return false;
					                 } , false);
							break;
						case 12:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt12);
			        		           return false;
					                 } , false);
							break;
						case 13:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt13);
			        		           return false;
					                 } , false);
							break;
						case 14:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt14);
			        		           return false;
					                 } , false);
							break;
						case 15:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt15);
			        		           return false;
					                 } , false);
							break;
						case 16:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt16);
			        		           return false;
					                 } , false);
							break;
						case 17:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt17);
			        		           return false;
					                 } , false);
							break;
						case 18:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt18);
			        		           return false;
					                 } , false);
							break;
						case 19:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt19);
			        		           return false;
					                 } , false);
							break;
						case 20:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt20);
			        		           return false;
					                 } , false);
							break;
						case 21:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt21);
			        		           return false;
					                 } , false);
							break;
						case 22:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt22);
			        		           return false;
					                 } , false);
							break;
						case 23:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt23);
			        		           return false;
					                 } , false);
							break;
						case 24:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt24);
			        		           return false;
					                 } , false);
							break;
						case 25:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt25);
			        		           return false;
					                 } , false);
							break;
						case 26:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt26);
			        		           return false;
					                 } , false);
							break;
						case 27:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt27);
			        		           return false;
					                 } , false);
							break;
						case 28:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt28);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt29);
			        		           return false;
					                 } , false);
							break;
						case 30:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt30);
			        		           return false;
					                 } , false);
							break;
					}
					copyTxtPos++;

				}
			}// End For

			// Filter Corps
			for(var t=0; t < filtercorp.length; t++){
				if(thisDiv.innerHTML.match(filtercorp[t])){
					var copyMsg;
					copyMsg=thisDiv.innerHTML;

					thisDiv.innerHTML="Filtered";
					j = i+1;
					nextDiv = allDivs.snapshotItem(j);
					copyMsg+="<br>";
					copyMsg+=nextDiv.innerHTML;
					nextDiv.innerHTML="Filtered";

					var element=nextDiv;
     					element.appendChild(document.createElement('a'));
				       	element.lastChild.textContent = ' [Show]';
				     	element.lastChild.href = 'javascript:{}';

					switch(copyTxtPos) {
						case 1:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt1);
			        		           return false;
					                 } , false);
							break;
						case 2:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt2);
			        		           return false;
					                 } , false);
							break;
						case 3:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt3);
			        		           return false;
					                 } , false);
							break;
						case 4:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt4);
			        		           return false;
					                 } , false);
							break;
						case 5:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt5);
			        		           return false;
					                 } , false);
							break;
						case 6:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt6);
			        		           return false;
					                 } , false);
							break;
						case 7:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt7);
			        		           return false;
					                 } , false);
							break;
						case 8:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt8);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt9);
			        		           return false;
					                 } , false);
							break;
						case 10:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt10);
			        		           return false;
					                 } , false);
							break;
						case 11:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt11);
			        		           return false;
					                 } , false);
							break;
						case 12:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt12);
			        		           return false;
					                 } , false);
							break;
						case 13:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt13);
			        		           return false;
					                 } , false);
							break;
						case 14:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt14);
			        		           return false;
					                 } , false);
							break;
						case 15:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt15);
			        		           return false;
					                 } , false);
							break;
						case 16:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt16);
			        		           return false;
					                 } , false);
							break;
						case 17:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt17);
			        		           return false;
					                 } , false);
							break;
						case 18:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt18);
			        		           return false;
					                 } , false);
							break;
						case 19:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt19);
			        		           return false;
					                 } , false);
							break;
						case 20:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt20);
			        		           return false;
					                 } , false);
							break;
						case 21:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt21);
			        		           return false;
					                 } , false);
							break;
						case 22:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt22);
			        		           return false;
					                 } , false);
							break;
						case 23:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt23);
			        		           return false;
					                 } , false);
							break;
						case 24:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt24);
			        		           return false;
					                 } , false);
							break;
						case 25:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt25);
			        		           return false;
					                 } , false);
							break;
						case 26:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt26);
			        		           return false;
					                 } , false);
							break;
						case 27:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt27);
			        		           return false;
					                 } , false);
							break;
						case 28:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt28);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt29);
			        		           return false;
					                 } , false);
							break;
						case 30:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt30);
			        		           return false;
					                 } , false);
							break;
					}
					copyTxtPos++;

				}
			}// End For

			// Filter alliances
			for(var t=0; t < filteralliance.length; t++){
				if(thisDiv.innerHTML.match(filteralliance[t])){
					var copyMsg;
					copyMsg=thisDiv.innerHTML;

					thisDiv.innerHTML="Filtered";
					j = i+1;
					nextDiv = allDivs.snapshotItem(j);
					copyMsg+="<br>";
					copyMsg+=nextDiv.innerHTML;
					nextDiv.innerHTML="Filtered";

					var element=nextDiv;
     					element.appendChild(document.createElement('a'));
				       	element.lastChild.textContent = ' [Show]';
				     	element.lastChild.href = 'javascript:{}';

					switch(copyTxtPos) {
						case 1:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt1);
			        		           return false;
					                 } , false);
							break;
						case 2:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt2);
			        		           return false;
					                 } , false);
							break;
						case 3:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt3);
			        		           return false;
					                 } , false);
							break;
						case 4:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt4);
			        		           return false;
					                 } , false);
							break;
						case 5:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt5);
			        		           return false;
					                 } , false);
							break;
						case 6:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt6);
			        		           return false;
					                 } , false);
							break;
						case 7:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt7);
			        		           return false;
					                 } , false);
							break;
						case 8:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt8);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt9);
			        		           return false;
					                 } , false);
							break;
						case 10:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt10);
			        		           return false;
					                 } , false);
							break;
						case 11:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt11);
			        		           return false;
					                 } , false);
							break;
						case 12:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt12);
			        		           return false;
					                 } , false);
							break;
						case 13:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt13);
			        		           return false;
					                 } , false);
							break;
						case 14:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt14);
			        		           return false;
					                 } , false);
							break;
						case 15:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt15);
			        		           return false;
					                 } , false);
							break;
						case 16:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt16);
			        		           return false;
					                 } , false);
							break;
						case 17:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt17);
			        		           return false;
					                 } , false);
							break;
						case 18:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt18);
			        		           return false;
					                 } , false);
							break;
						case 19:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt19);
			        		           return false;
					                 } , false);
							break;
						case 20:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt20);
			        		           return false;
					                 } , false);
							break;
						case 21:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt21);
			        		           return false;
					                 } , false);
							break;
						case 22:
							copyTxt2=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt22);
			        		           return false;
					                 } , false);
							break;
						case 23:
							copyTxt3=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt23);
			        		           return false;
					                 } , false);
							break;
						case 24:
							copyTxt4=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt24);
			        		           return false;
					                 } , false);
							break;
						case 25:
							copyTxt5=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt25);
			        		           return false;
					                 } , false);
							break;
						case 26:
							copyTxt6=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt26);
			        		           return false;
					                 } , false);
							break;
						case 27:
							copyTxt7=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt27);
			        		           return false;
					                 } , false);
							break;
						case 28:
							copyTxt8=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt28);
			        		           return false;
					                 } , false);
							break;
						case 9:
							copyTxt9=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt29);
			        		           return false;
					                 } , false);
							break;
						case 30:
							copyTxt1=copyMsg;
						     	element.lastChild.addEventListener('click', function(evt) {
							   popuppost(copyTxt30);
			        		           return false;
					                 } , false);
							break;
					}
					copyTxtPos++;

				} // End if
			} // End For
		} // End If
	} // End For

} //End CAOD

