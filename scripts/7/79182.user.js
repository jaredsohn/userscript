// ==UserScript==
// @name	passthepopcorn.org - Collection Building Helper
// @author	applebananas
// @namespace	http://userscripts.org/scripts/show/66746
// @include	http*passthepopcorn.me/torrents.php*
// @version	0.31
// @date	2010-01-26
// ==/UserScript==

/*------------------------------------------\
CHANGELOG:
0.31:	Added auto-sort alphabetically operation.  Changed image for adding something to a collage.
		Added support for most pages (artist, actor, snatched/uploaded/seeding/leeching lists).  

0.30:	Added a lot of stuff on the manage torrents page.  The much needed "Edit all" button has been added.
		There is also an "operation" button that allows you to perform operations on a selected range of torrents.
		Operations include +, -, *, /, reverse all, sort by year, and find missing torrents.

0.21:	Auto-scroll down the torrents.php page, so when you search for something it automatically goes towards the torrents.
		You can change this in the options menu: right click greasemonkey icon at bottom right, user script commands, "window jump"
		Note: updated version number to synchronize with what.cd version.	

0.01:	Initial release

\------------------------------------------*/

var fullActiveURL = document.URL;
var site_base_url = fullActiveURL.match(/^(https:\/\/www\.passthepopcorn\.org|http:\/\/www\.passthepopcorn\.org)/)[1];
var collageID, collName;
getCollageID();	

// allow preferences for window jump
GM_registerMenuCommand("passthepopcorn.org - Collection Building Helper - Window Jump", function() {
	var windowJumpNum;
	for (var i=1;i<=3 && isNaN(windowJumpNum);i++) {
		windowJumpNum = prompt("Enter how many pixels you want the torrents page to auto-scroll?\n250: default, 0: none, current: " + GM_getValue("winJump", "600"));
		if (windowJumpNum != null && windowJumpNum != '') {
			windowJumpNum = parseInt(windowJumpNum);
			if (isNaN(windowJumpNum)) { 
				if (i==3) { alert("Try harder!  Better luck next time!"); }
				else { alert("Please pick a valid number!"); }
			}
			else {
				GM_setValue("winJump", windowJumpNum);
			}
		}
	}
});

// preference for always showing checkboxes on manage page
GM_registerMenuCommand("passthepopcorn.org - Collection Building Helper - MathRange checkboxes", function() {
	var checkBoxQuestion;
	for (var zz=1;zz<=3 && isNaN(checkBoxQuestion);zz++) {
		checkBoxQuestion = prompt("Do you want the checkboxes to always appear on the manage collection page?\nType \"1\" for yes and \"0\" for no.\nCurrent selection is: " + GM_getValue("checkBoxAlwaysOn", "0") + " (0 is default)");
		if (checkBoxQuestion != null && checkBoxQuestion != '') {
			checkBoxQuestion = parseInt(checkBoxQuestion);
			if (isNaN(checkBoxQuestion)) { 
				if (zz==3) { alert("Try harder!  Better luck next time!"); }
				else { alert("Please pick \"1\" or \"0\" (no quotes)"); }
			}
			else if (checkBoxQuestion == 0 || checkBoxQuestion == 1){
				GM_setValue("checkBoxAlwaysOn", checkBoxQuestion);
			}
			else { alert("Please pick \"1\" or \"0\" (no quotes)"); }
		}
	}
});

// putting the "C" image on various pages (with an active collage)
if ((fullActiveURL.match(/torrents\.php/) || fullActiveURL.match(/actor\.php/) || fullActiveURL.match(/artist\.php/)) && (collageID != 0) ) {
	var imageLink, lx;
	var matchType;
	
	//special case for random torrent pages like user uploaded/snatched/etc
	if (fullActiveURL.match(/torrents\.php\?type/)) {
		lx = document.getElementById('content').getElementsByTagName('a');
		matchType = new RegExp(/torrents\.php\?id=([0-9]+)/);
	}
	
	// case for artists page
	else if (fullActiveURL.match(/actor\.php/) || fullActiveURL.match(/artist\.php/)) {
		lx = document.getElementById('discog_table').getElementsByTagName('a');
		matchType = new RegExp(/torrents\.php\?id=([0-9]+)$/);
	}
	
	// case for torrents on the search page
	else {
		lx = document.getElementById('torrent_table').getElementsByTagName('a');
		if (fullActiveURL.match(/disablegrouping=1/))
		{
			matchType = new RegExp(/torrents\.php\?id=([0-9]+)/);
		} else {
			matchType = new RegExp(/torrents\.php\?id=([0-9]+)$/);
		}
		
		//window jumping except on torrents.php main page & torrents.php advanced search main page (ie. when you actually search)
		var winJumpGet = GM_getValue("winJump", "650");
		if (winJumpGet > 0 && !fullActiveURL.match(/torrents\.php$/) && !fullActiveURL.match(/\=advanced\&$/)) {
			// if user "refreshes" the page, we will not scroll at all.
			if (window.pageYOffset == 0) { 
				window.scrollBy(0,winJumpGet);
			}
		}
	}
	
	for (var i in lx) {
		var match = lx[i].href.match(matchType);
		
		imageLink = document.createElement('img');
		//image data generated from: http://software.hixie.ch/utilities/cgi/data/data
		imageLink.src = "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr%2F2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr%2FwAARCAAQABADASIAAhEBAxEB%2F8QAFgABAQEAAAAAAAAAAAAAAAAABgME%2F8QAJBAAAQQCAgIBBQAAAAAAAAAAAgEDBAUGCAcREhMhAAkiJEH%2FxAAVAQEBAAAAAAAAAAAAAAAAAAAHCP%2FEACARAAICAQQDAQAAAAAAAAAAAAECAxEEAAUSIQYTQRT%2F2gAMAwEAAhEDEQA%2FAK7A7UbJbL8%2FY9q1qfkcGpDIYbkmdNsC7BllnwV90yJDMgFxxGwEPzJU7UvnpNWOamfdO4T5QxGtwbk2hn1TV%2FHdyG6ZuPTDchI5%2BwEqC6Ik6Sh5IighKhKPiQl8%2FRDk3h3n%2FSHZaHzhjnGt7kNVUuy0oLrFqV6zF%2BvkEnshzmWkNxlxFbFPYqIJqPmJIpECKq3efePZ3lfFaXWvXXK8djRr6M5lFjk1LJjVjcJHER8HHJbbYOqrakiNgJOKqov87QtwYHkyg%2BfjynIWQnkOXDtzxprr1hfldfRfeqa8lz5Ittkj8c3DFTaGxgFjkaIzE%2BtQ6yxlDN%2BkyXThibshgNf%2F2Q%3D%3D";
								
		if (match) {
			imageLink.setAttribute('torrent-url', lx[i].href);
			imageLink.setAttribute('torrent-name', lx[i].innerHTML);
			imageLink.setAttribute('iValue', i);
			imageLink.setAttribute('lxValue', lx);

			imageLink.addEventListener("click", image_click, false);

			lx[i].parentNode.insertBefore(imageLink, lx[i]);
		}
	}
	
}

else if (fullActiveURL.match(/collections/)	 && !fullActiveURL.match(/manage/)) {
	//update(); //only check for updates on collage pages
	var activeCollURL;
	
	// Getting collage # case when you click on an image from the collection
	if (fullActiveURL.match(/group/)) {
		activeCollURL = fullActiveURL.substring(fullActiveURL.indexOf('=')+1, fullActiveURL.indexOf('#'));
	}
	// Getting the collage #...standard case
	else if (fullActiveURL.match(/php\?id\=/)) {
		activeCollURL = fullActiveURL.substring(fullActiveURL.indexOf('=')+1, fullActiveURL.length);
	}
	// handle collage # case when you are in the edit description menu
	else if (fullActiveURL.match(/edit/)){
		activeCollURL = fullActiveURL.substring(fullActiveURL.indexOf('id=')+3, fullActiveURL.length);
	}
	/* handle collage # case when you are in the manage torrents menu, currently messing up remove/edit buttons, so just skip all manage pages
	else if (fullActiveURL.match(/manage/)){
		activeCollURL = fullActiveURL.substring(fullActiveURL.indexOf('id=')+3, fullActiveURL.length);
	}*/

	var cx = document.getElementsByTagName('h2')[0];

	var collageLink = document.createElement("a");
	collageLink.href = "JavaScript:void(0);";
	collageLink.textContent = "Make This Active Collection! ";

	var removeActColl = document.createElement("a");
	removeActColl.href = "JavaScript:void(0);";
	removeActColl.textContent = "Remove Active Collection!";	
	
	// if there is an active collage & the active collage is different than current page, use name + link
	if (collageID != 0 && collageID != activeCollURL) {
		cx.parentNode.innerHTML = "\<h3\>Active Collection Is: \<a href\=\"" + site_base_url + "\/collections.php\?id\=" + collageID + "\"\>" + collName + "\<\/a\>" + cx.parentNode.innerHTML;
	}
	// else just display name
	else {
		cx.parentNode.innerHTML = "\<h3\>Active Collection Is: " + collName + cx.parentNode.innerHTML;
	}
	
	var jx = document.getElementsByTagName('h2')[0];

	//use something different than cx maybe?
	// display "Make This Active Collage!"
	if (collageID != activeCollURL && !fullActiveURL.match(fullActiveURL) && !fullActiveURL.match(/page/) && !fullActiveURL.match(/search/)) {
		//standard torrent pages
		if (fullActiveURL.match(/php\?id\=/)) {
			collageLink.setAttribute('collage-url', activeCollURL);
			collageLink.setAttribute('collage-name', jx.innerHTML);
			collageLink.addEventListener("click", setCollageID, false);
			jx.parentNode.insertBefore(collageLink, jx);
		}
		//special case on manage and edit pages
		else if (fullActiveURL.match(/manage/) || fullActiveURL.match(/edit/)) {
			//note: problem retrieving name on these pages for collageID!=activeCollURL
			if (collageID == 0) {
				var cxSpecial = document.getElementById('content').getElementsByTagName('a');
				var match;
				
				for (var z in cxSpecial) {						
					if (fullActiveURL.match(/disablegrouping=1/))
					{
						match = cxSpecial[z].href.match(/torrents\.php\?id=([0-9]+)/);
					} else {
						match = cxSpecial[z].href.match(/collages\.php\?id=([0-9]+)$/);
					}
					if (match) {
						collageLink.setAttribute('collage-url', activeCollURL);
						collageLink.setAttribute('collage-name', cxSpecial[z].innerHTML);
						collageLink.addEventListener("click", setCollageID, false);
						jx.parentNode.insertBefore(collageLink, jx);
					}
				}
			}
		}
	}

	// display "Remove Active Collage"
	if (collageID != 0) {
		removeActColl.setAttribute('collage-url', "0");
		removeActColl.setAttribute('collage-name', "None");
		removeActColl.addEventListener("click", setCollageID, false);
		jx.parentNode.insertBefore(removeActColl, jx);
	}
}

else if(fullActiveURL.match(/manage/)) { manageStuff(); } //window.addEventListener("load", manageStuff(), false); }

function manageStuff() {
	var activeCollURL = fullActiveURL.substring(fullActiveURL.indexOf('id=')+3, fullActiveURL.length);
	//alert("no bugs");
	var allGroupNumbers=new Array();
	var allNewSortNumbers=new Array();
	var allOrigSortNumbers=new Array();
	var isUpdated = 0;	

	//get initial group numbers
	var jx = document.getElementsByName('groupid');
	for (var i in jx) {
		allGroupNumbers[i]=parseInt(jx[i].value); 
	}
	
	//get initial group sort numbers
	var kx = document.getElementsByName('sort');
	for (var i in kx) {
		allOrigSortNumbers[i]=parseInt(kx[i].value);
	}
	
	var editAllButton = document.createElement('img');

	//image data generated from: http://software.hixie.ch/utilities/cgi/data/data
	var editAllSrc = "data:image/gif;base64,R0lGODlhSwAdAPcAACQiJOSqZDw6jGSq5FxaXExKTKzm5DQ2NGQ6PDxmrMT%2B%2FPzKjKzKzIw%2BPOTmzDyKxMSKPDw%2BZPzGjDxirIzG%2FERCRGxCROTmrPz%2BzERCjERurOT%2B%2FERGbOSqbGyu5KxmPDw%2BPGQ%2BPDxqrMzKrMzK5IxGROTm5DyKzMyORDw%2BbDQyNDw%2BjGyq5ExOTMzm5Dw6PMz%2B%2FMzKzIxCRPzmzMyKPOTGrIzK%2FERGRGxGRPzmrPz%2B5ERGjPz%2B%2FOSubKxqRGw%2BPERqrOTKrESOzERCbF2iFAADAJGvAHwCAIUgAecAAIEAAHwAAACWAAADABXUAAAAAGABAAMAAAAAAAACANgBEJEAABgAAAAAAADZAGeLABVBAAB%2BAACINAAQAABHAAB%2BwH4uAQBnAABpAMBmAAAAQwDoOgASXAAARP88b%2F%2FCY%2F9Cdf9%2Bbf%2FpAP%2FBn%2F9CgP9%2BfADIAADzAAASAAAAAACQAACIAABGAAAAAAAAMAAA%2FhUAFQAAAJYAAKsA8AAAFQAAAFABAOcA8BIAFQAAAJ8ACOsA6YEAEnwAAEsIdOPob4EScnwAXOCwZAKB6VFDEgAAAADk2GfzmgESgwAAfGyPCAAEnwBEgAB%2BfIyW%2F%2Bar%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAMOkA%2FpAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMoADoABUSAAAAAAD0HwArAACDAAB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAMAwChAABPAAAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fABw%2F8K9%2FwBP%2F1AA%2FzicpdXI%2FxVPgAAAfEMAiDoBgQAAQgAAAACMMADo%2FgASFQAAAMQAAAMBAH8AAAAAAL64LZRk6kGDEn58AA0BZI4AZEIAg34AfKIAlgMwq68AAAJ%2BAEPEZDoDZAB%2FgwAAfFIuamVncXBpSGxmACH5BAAAAAAALAAAAABLAB0ABwj%2FAAkQKNCiBcGCCBMqVHhwYcOFECE%2BjNhCIIGCDwlqNMhx40aEHkFi7EgyJMeRIT8OLKCR5Q2DLFGWbFngJcmXLGOmLNnCps2dNGPe0KmzZ86jQokizclxKFOnSZc%2BPWo0qMucUK%2FW1MrVKdSsW4%2BCXQq2rFexWs%2BG3ar2a9q3YYfKjQvXbYWac%2FOyvepWr9%2B9d%2F8K3ju3wN21bfEqlnujMOPFLA8fPjs3sOKwk%2FE23nxjhwIeoEP3GFqB8Q0ODEbguAFkw2jSW0tznq1hA4YShhsXaN2jZu3Xs3NvvpvBxQUcpZNzVo5adePkBX7Lnj2bBWgUtF3fqPCb%2BvLtjYtf%2F7BAXfnmIanJD2etHXxy5RVQkzAx%2Fjn717zd6zdfQbyFCgAGCJ4Qoc0Qwwj%2FtdYBe6HxMNp07xHYgw06%2BADgdrwBqOB%2B7oFQgYf9GfdfgAB6%2BAAPC4DQmg5BJOiahxl6KOOHH25HoQ8nOFhiBRlWIIJrNM4IIon9wdAgaDQAOIQBDsgAYAIb5BACj0BSGQCRWPqXAQwYNBBga1daiWWAQlawgnFTltmaBDKmkNqUUHbgIZQ9lCmkdUmCMAAPKNBIJ4wvBimokGeOZyeUEtAYQWo%2FgPDjlY5uIOegijIpA6BsfvijnJFySikIoIZaKAKhlopoqIuOQGqcoEIZQKmwgv8A5ZE6ONBAq5LiymmsILzQ668CoOnrsL2m%2BoOvwV4Qwguu9noqsdAOoMMHv75w4qvMboBts9D%2BWm2vyZI6LLF7QtCrtEGsqm2vo347bLjVtuuqr%2FO62%2BsBB7yQLwgCfHbkAvnmS0GDOtSAwAETaBtwwqAFELC%2B1vLgMMQC8wABwtrqm3AAFIPw8AsgQxzyyCSXbPLJKKesssgh44uvvi7HLPPMNNds880456zzzjz3fLMKBwAtdNBED2100UgfrXTSTC%2FtNNNERw201PhObXXVWFOt9dVbZ3210VyH7fXYXZctttleq6D22ioAELTbbb8td9x0w2333HfXjffeevckvTYIbAcu%2BOCEF2744YirAGDbADTu%2BOOQRy755JRXbvnjigcEADs%3D";
	var editAllToUpdating = "data:image/gif;base64,R0lGODlhbgAdAPcAACQiJOSqZDQ2hGSq5KxiNOTixDQ2ZDQ2NKzi5GQ6PDxmrMTGxGxCRPzKjMSGNMT%2B%2FIzKzExKTDSGxOT%2BxDRirIQ2NFxaXDw%2BZERCROTmrPz%2B5OTGrDw%2BjIyq5KxqRPzmzMTm5ERurIxCRMyORIzG%2FESOzOSqbGyu5KxiPOTmzDw%2BPGQ%2BPDxqrPzGxMzKrMSKPERGbDyKzPz%2BxIw%2BPDw%2BbOT%2B%2FDQyNDw6jGyq5OTmxDw6ZDw6PKzm5MzKzGxGRMz%2B%2FKzKzExOTDyKxDxirIw6PERGRPzmrERCjMzm5IxGRIzK%2FOSubKxmPGw%2BPERqrOTKrMyKPPz%2BzERCbPz%2B%2FIABEDcAABkAAAAAAADZAGeLABVBAAB%2BAACINAAQAABHAAB%2BwH4uAQBnAABpAMBmAAAAQwDoOgASXAAARP88b%2F%2FCY%2F9Cdf9%2Bbf%2FpAP%2FBn%2F9CgP9%2BfADIAADzAAASAAAAAACQAACIAABGAAAAAAAAMAAA%2FhUAFQAAADQAAIQA8AAAFQAAAFABAOcA8BIAFQAAAJ8ACOsA6YEAEnwAAEsIdOPob4EScnwAXOCwZAKB6VFDEgAAAADk2GfzmgESgwAAfGyPCAAEnwBEgAB%2BfIw0%2F%2BaE%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAMOkA%2FpAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMoADoABUSAAAAAAD0HwArAACDAAB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAMAwChAABPAAAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fABw%2F8K9%2FwBP%2F1AA%2FzicpdXI%2FxVPgAAAfEMAiDoBgQAAQgAAAACMMADo%2FgASFQAAAHQAAAEBAA4AAAAAAL64LZRk6kGDEn58AA0BZI4AZEIAg34AfNgANAAwhDYAAAB%2BAEN0ZDoBZAAOgwAAfJguagFncbtpSABmACH5BAAAAAAALAAAAABuAB0ABwj%2FAC1YCEKwIMEIB4MgTGhQYcOHCxc%2BNIhQIsOIFyc2xOhQYsWCFQVa%2BNiRIciTDhN%2BJOlRZUmKKSGaxLgyI8ybB0cqRFhkZ4SKP3%2F65KmwZ0mgQoMS7Yg06MGfPSNETeo0asmpTbMO9Tn0Y5GkQb427arUK9WyPMGm1bp2q1ilDsXGBSuX6luoZe9KVfpWbN%2B8aPX65QuYMNq9eA0HFQz172DEj7%2F%2BRQw5seTKmPcOjmxZc2fMnClf9vwVg2fTm0mrHn259erOrl1Xjv2admmpkm%2BDxi0Z9enVtzfnloo69%2FAIponzxo04ufOfz5HjLUK9uvTi1bNbL45ce2nv3btn%2F78enrvp8%2BAvo%2FfOvj118dpD1FiSHQaCFEm0Y3BfH4gLH%2B3ttx978tHHX3UC6nfggtQliAEGBRYhIAw8pCBCgxJi6GCGEsLgHwMcJpidE%2FNtaGKGGyLIIYosnmjigAMWQaIJHErBQw4iPPighDu%2BuN8FH%2FLooI4YkEhfjzy2KOCQOgrpYotQLqkCBlOqYGSVGFxQ4QwPslDDFGBOEQWXD05ZQpgf9OBCEw8qEeYUS%2Bjo5ZtLWFminW9q4EGZGBzxwJtTjEDloFgWSuihWBJZZA0mECnFfTkuOoURDBzxQxQiTIlBDFM0sKgGTzCAgRCBPojDFAHoSGKqqtbAKomTMv9gYwpkWipDjm5O8YKivPbqq6GrEvoojlMqUAOlxbr6oJa0JmvECjqqMKUU%2FkGrgpcmYGlsnRgYawSbKpw5wpSnjkulm%2BYaqi6ihKprbKNV0rAllSQ2UCUHIGTQxLU12EulDv7tK%2B2mYY5Jr7JVzjjllVRymqoKECyQI7m6srvuxVRKq7EKxgaw8QUIFDCDtB1rDKQLK3Dcr8n%2BJaACBz%2BAaS8EPRBBMqMbv3tzttJyynPEI%2Fcc6MZEF220xjuokPTSxtqbtAoAo5x000vfkK%2FLVEsbdcoDaMCE1jfOMLWrT6vs8Q4dP%2B2w0hHbnPQAui6t9Nxy10033XbvgG8GCez%2F4HfWaB%2Fbt8oN%2BB1133ojwfcObf9dQxRuU73DASpQQLbZfu9AagBvTwFF5m5%2BrnTed5O%2B9OSoH7AD3C9kDjcUlB9gedw7kKABAaiz7nfXGyRwQNdM%2BN3BBAsQoboAV2eetuxkq%2B7w8Yr3bewUDqRuverYX2896pmDDijnqE8%2FRQsxf949CXn2vsMNfxZcfOZDfInqDvGDX3%2Fmm2c%2B%2B5ut76BDhUQwHAAFmIIAds9v2DuAAhfIwAYq0HIBkMAUZFABB1rwghjMYAZT97vbafCDIMQgBENIwhKC0AA8KEAFTXhBGxzAhTB8oQxjCMMR0nCGOLyhDnPIwx3GUADtC5MDg3zYwyLiUIZIdGESFajEJjLxiUuMohOlCMUpWrGKWKTiEmFogytq0YtgzGIYvyjGMpJRil1Mow0A8EI2rrGNcHyjHN1IxzjWcY52zCMe93jHPurRj3vsogrUSMhCGvKQiEykIhfJyEYi8kFrBIAkJ0nJSlrykpjMpCY3yclOetIGGAgIADs%3D";
	editAllButton.src = editAllSrc;
	
	var zx = document.getElementById('content').getElementsByTagName('h2')[0];
	zx.parentNode.insertBefore(editAllButton, zx);
	//document.body.insertBefore(editAllButton, document.body.nextSibling); 

	editAllButton.addEventListener("mouseover", function() { 
		if (isUpdated == 0) {
			editAllButton.src = "data:image/gif;base64,R0lGODlhSwAdAPcAABwaHOSmXKReLKTGxCwuXDQ2NOTixCxapKTi5OTipFwqLCwqhGQ2NOTi5MTGpFym5CyCxCwqLMSCLExOTDRirMT%2B%2FDQ2hDQ2ZDw%2BPMTi5PzirIQyNIQ2NPz%2B5OTGpMTG5CQiJPzGhMTGxPz%2BxCxepOTirFwyNDQyhITG%2FDQyNMSKPOT%2B%2FOSqZKxiNKzGxDQyXDw6PPzixKzi5FwuLCwuhGQ6PMTGrGSq5DSGxCwuLMSGNDxirDw6jDw6ZERCRMTm5Iw6POTGrCQmJDRepOTmrPz%2B%2FJEVEnwAAIUfPefhAIE9AHx3AAAAEAAAABUAAAAAAGAA%2BAMA%2BwAA%2FQAAf%2BBvPI4C6RgAEgAAABAXAD8AABkAAAAAAADkIADn6QASEgAAAH4uJgBnLABpkcBmfAAAQwDqOgASXAAARP8gb%2F%2FpY%2F%2BQdf98bf8oAP8Cn%2F%2BRgP98fAD%2FAAD%2FAAD%2FAAD%2FAAAiAAACAACRAAB8AACbmAAB%2FRWRFQB8ACTbAKsB8ACRFQB8AFAAAOcA8BIAFQAAAJ8wCOtG6YEWEnwAAEsAdOPwb4EAcnwAXODIZAJg6VEWEgAAABAY2D%2FomgESgwAAfGzoCADpnwASgAAAfIwk%2F%2Bar%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAmOkA%2FZAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMAADoABUSAAAAAAD0AAArAACDAAB8ABAAAT8AABkAAAAAAAAtRAHq6QASEgAAAAAMAAChAABPAAAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfBCdqD9k%2FxmDgAB8fB5w%2FyK9%2F9dP%2F1oA%2FwWcpQDI%2FwBPgAAAfAAAiAABgQAAQgAAAKuMmCzo%2FdcSFVoAAMgAALoBABUAAAAAABi4LQBk6gCDEgB8AAABZAAAZAAAgwAAfAAAJAAwqwAAAAAAAEM7ZDoAZAAAgwAAfFIuamVncXBpSGxmACH5BAAAAAAALAAAAABLAB0ABwj%2FACdM8IGBoMGCCA8qTMhwocOGBQ0qlAjRh8AJMAgi3KjxIMKMGDhiyNhxZEmRG1NqVBmy5ISCGWP6kAmzJc2ZOEGGrJnToMybP3sGjZlyp9GjK48qNcl0qdOnUItChRGS6lGrV59S3aqUa9SsRrmKzep1Z9mqI9MuPWvVq1u1aWHIjRtXLowCI8XivRt37968dgPvDby17VzAhQcLJszYboHAdRs%2Fljt5cuO7VC1jsExZMmYYFioUGU2aBebKMHoMsMEAxpAVpv12nv348Y4VI4A4hnGbhW3YqGufpszjB5HWwpNj7uHCRo3hBSjAhj5c7o3RKpL3vivd9Ofgdx9b%2F8iQoEaB2o9TfIdxoTny09vTKz%2Ff%2FkMDIuZrd3%2B8H3348OfdNV4JJmCmnnA4kBaDCKxFB5x0pBUR23kUqpcgCyh00MKBDvrWIYf%2FUVhACuedkMFxIo44YoIhONiBBwwU8JqHM55HYooUZtjChSJ2R2KNNqp4440j8iBahEXoQB8CBnAwonQaMJCCdAGkMOUKVVYo5IgW%2FFACA6GNwAGJV%2Fp2ZZVEimhlCjmweYKXJqxpZZuvhbDmC6vFSQJsVu7JwpxyyvlAkm0OqgObKfjZpp%2BAIspmm21aaWICMyAaaQ7ShRApAS44YAKmWLJJ5aWAtvkCkxtYmemcVIqKJamOrv8J6aSfWmplnXPi6WmisC3aq6Ok7olkBwakmsIBfB7LJ6yQ5uCsszSQV2sEj%2BZAwAAOzAAtedruGYCze4ZA7bPk5vBABwKQC0ER3%2BbgLbivlivvswtwW24Ezg4qAZvneqBADsi2Wy%2BlzuJL7sD%2F0sttBO%2B6i6XBBT%2BLbwQUR0DDkRFqWjEKEb74b8AUA7zCaN%2BGTPG6JU8cAccSiBwAxQHnMHHEKsssc80m46zzzTzn3PPOPgddsRAVR0A00UZTjPTSSjed9NNMQ%2B101FRPbfXQTQtx9NZGc61112B%2FLbbXZIdd9thmQ6312my37fbbcMct99x012333XjbDYIQe%2FdLzffffgcO%2BOCCF0744YYbDjgIiSPueOOQPy4545SnwDgAIGCueeacb%2B5556B%2FLnropI%2F%2BOQjnRQDA6qy37vrrsMcu%2B%2By0uy5EAQEBADs%3D";
		}
		else { editAllButton.src = editAllToUpdating; }
	}, false);
	editAllButton.addEventListener("mouseout", function() {
		if (isUpdated == 0) { editAllButton.src = editAllSrc; }
		else { editAllButton.src = editAllToUpdating; }
	}, false);
	
	//edit all button
	editAllButton.addEventListener("click", function(){
		var mx = document.getElementsByName('sort');
		var counter = 0;
		var i = 0;
		isUpdated = 1;
		editAllButton.src = editAllToUpdating;
		
		for (i in mx) {
			allNewSortNumbers[i]=parseInt(mx[i].value);
			
			//only update new numbers
			if (allNewSortNumbers[i] != allOrigSortNumbers[i]) {
				//counter++;
				GM_xmlhttpRequest({
					method: "POST",
					url: site_base_url + "/collections.php",
					data: "action=manage_handle&collageid=" + activeCollURL + "&groupid=" + allGroupNumbers[i] + "&sort=" + allNewSortNumbers[i],
					headers: { "Content-Type" : "application/x-www-form-urlencoded" },
					//onload: function(e) { document.location.href = document.location.href; },
					onerror: function(e) { 
						alert("some sort of error occured with the server.  Error occured with torrentID: \"" + allGroupNumbers[i] + "\" which had a new sort number of: \"" + allNewSortNumbers[i] + "\".  Recommend rechecking your values."); 
						return;
					}
				});
			}
		}
		// one more worthless request to reload the page after all previous requests finish
		GM_xmlhttpRequest({
			method: "POST",
			url: site_base_url + "/collections.php",
			data: "action=manage_handle&collageid=" + activeCollURL + "&groupid=" + allGroupNumbers[i] + "&sort=" + allNewSortNumbers[i],
			headers: { "Content-Type" : "application/x-www-form-urlencoded" },
			onload: function(e) { document.location.href = document.location.href; }
		});
		//document.location.href = document.location.href;
		//if (counter == 0) { alert("You have not changed any values."); }
	}, false);
	
	//insert blank space between edit all image and math range image
	var oNewP = document.createElement("b");
	var oText = document.createTextNode(" ");
	oNewP.appendChild(oText);
	var beforeMe = document.getElementsByTagName('h2')[0];
	beforeMe.parentNode.insertBefore(oNewP, beforeMe);
	
	if (GM_getValue("checkBoxAlwaysOn", "0") == 0) {
		var mathRangeButton = document.createElement('img');
		var mathRangeClickOnce; // used so I can remove the image after it's been clicked once
		var mathRangeSRC = "data:image/gif;base64,R0lGODlhdAAdAPcAACQiJOSqZDQ2hFxaXIzKzOTixDQ2ZDQ2NKzi5DxmrGQ6PMSGNGSq5MT%2B%2FGxCRPzKjDyKxExKTDxirKxiPIQ2NIzK%2FERCjOT%2BzERCRKzm%2FIxqrMyObIyq5Pz%2B5OTmrKxqPMTGxDw%2BZMTm5ERurMyOROSqbDw%2BjDw%2BPDxqrGQ%2BPMSKPGyu5IxCRMzKrDyKzERGbIw%2BPPz%2BxOT%2B%2FKxqRDQyNDw6jKzKzOTmzDw6ZDw6PKzm5Gyq5Mz%2B%2FGxGRExOTKxmPIw6PERGjERGRKyu5PzmrMzKzERCbMzm5OSubERqrGw%2BPMyKPOTKrESOzPz%2BzPz%2B%2FKxuRAMAAAAAAAACANABEDQAABkAAAAAAADZAGeLABVBAAB%2BAACINAAQAABHAAB%2BwH4uAQBnAABpAMBmAAAAQwDoOgASXAAARP88b%2F%2FCY%2F9Cdf9%2Bbf%2FpAP%2FBn%2F9CgP9%2BfADIAADzAAASAAAAAACQAACIAABGAAAAAAAAMAAA%2FhUAFQAAAJMAADoA8AAAFQAAAFABAOcA8BIAFQAAAJ8ACOsA6YEAEnwAAEsIdOPob4EScnwAXOCwZAKB6VFDEgAAAADk2GfzmgESgwAAfGyPCAAEnwBEgAB%2BfIyT%2F%2BY6%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAMOkA%2FpAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMOQDoUhUSkQAAfAD0kAAr6QCDEgB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAM1AChAABPEwAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fABw%2F8K9%2FwBP%2F1AA%2FzicpdXI%2FxVPgAAAfEMAiDoBgQAAQgAAAACMMADo%2FgASFQAAAEoAAAUBADoAAAAAAL64LZRk6kGDEn58AA0BZI4AZEIAg34AfDYAkwUwOiwAAAB%2BAENKZDoFZAA6gwAAfCIuagRncVRpSABmACH5BAAAAAAALAAAAAB0AB0ABwj%2FAAcM8EGwoI8IBgkiVHiQYcKFCSMWRAgxYkWJFCVq3DiRo8ABGTN2hFiRpMOGDUN2NKjSJEqRDkW2ZDhzZMqDIG9SjBBBiEKePnnyPCjUR9CeBH2mpBjUKFGdRIcqVSp0KNKqC3c61bmz6EysCIVY9fo07NiQYKWmNVtUbNe0Dd1ajXsWrlu6bauKlQtU6F6%2FWPny1bu2Z%2BDDiA2DdSuYsGLHgCErljuYcV%2FDlv9axjz58mbNkTNf9tyZ82fSPf%2Baxgy69erVrmN3li3a9evasGf%2FxcDZMG8hsX%2Bnnq2Yd4Tfp4Gb3quZ%2BXAhyFk%2FV678OE%2FjzIGL3fHkge8XGTpA%2FzkuljcG6OStl%2B%2BJYYQMJMrPa59%2FPAiPJ%2FifIBku33z5%2BOidl55%2FAf5nHXLzJajgCk90MIN2TTT4YIIIaucefOi5VwJ5CiZowREe9CAEgw5q9xuBJrLHIYUqdgjdiy6%2BeB4GDOo3YwUSyjjfjMBhkMR7PQrxI4Yw8shjECJ44AB0ESJhJIU6QvmkiTrKR%2BWTM2KgZY1EOIDBhzKUeGN%2BNmrpHpnw%2FUimg%2F3J%2BCWIXvoowwM84phfCTKqmZ%2BY0NlH5hMkaImBERnk5wQLU2p5gqAYMIAfmxA8OsOiJ0QY6AkMOonBCUNuuqmaD5xghA43wOAppVqaAKeWLnTnaaSXMv9YwqIYoCDDE12GQKqpJ1jAw6EY2Bnolw2w6euhqNLK6Jb5PTDqDUOwySitRtjQQgpa%2FhgAoz%2FSqaWlywr6oZKDhjfDstRaG%2BePRCjxLaBacreEoDiqEC%2BglLY6bLjJcrcBqRrMuUMHH5zKan4xsLBoAu%2BhyjASlEY4q8GLmnDfnpMajEGr%2BDnB648Tn9DqxASAoPCm3F1agbRyhkpxsjQ%2BoQJ3%2BKmwgoOUWoxfqAQU8bEMIdcKdL5PbAvzCap6oATSIC69qc7dndAzr7ZCvGmERk9N9BKL2vknnUefILbYjpLAcAdMKMFABz%2BMvXbboiJQqtgMBzD2CQzPKvbId9%2F%2FnbQCez%2Bh9wlvL6rr3HgPHbjeJSu8aNlilwxD35SLncMJl1%2FOnQo54BhADoVfPvXlDMcABOYMh5p53ZiLXHTmrV8uQJIKXI6D3DDkkMPoiZuOugyfY96q3aA%2FsUTm9WL%2BNuzMx%2B588VzDvrzybGPOwQVFnJ6DCbS3XnfmkRL%2F%2FN%2Bth3956Nf7TDrw4BeNOfceAM6w8es%2F0Lzuzh%2Bgu%2F4HOKoC%2FznoH9v4V4MGkCkGIAAC%2FyRwq6IdgIGf01%2F4AAjA2cWPfzgIzw8OUMADgoACAYRgAHMwwRA2MD8LGGGk%2FpRCCu5PdzCMoQxnSMMa2vCGOMyhDve3vB3CkH8HCKIQwodIxCIa8YhITKISl8hEA%2BigABRgohSnSMUqWlGKAjAgmRZwRRocwItg%2FKIYw0jGMZqxjGg8oxrTyMY1urGNcDSjHL0oxjrS8Y5BxKMd88jHPfpRj4DsYyD%2FKMhCEvKMNBikIg25yEM28pGMjKQjGZnIStIAAF%2FE5CUzyclNelKToOxkKD8pylKS8pSjTKUpVYnKTibyBJaMpSxnScta2vKWuMylLneppUsC4JfADKYwh0nMYhrzmMhMpjKXOUwaYCAgADs%3D";
		mathRangeButton.src = mathRangeSRC;
		mathRangeButton.addEventListener("mouseover", function() { 
			if (mathRangeClickOnce != 1) {
				mathRangeButton.src = "data:image/gif;base64,R0lGODlhdAAdAPcAABwaHOSmXKRaLITGxCwqXOTixDQ2NCxapKTi5FwqLPz%2B5OTipCwqhCyCxMSCLFym5GQ2NMT%2B%2FKTi%2FCwqLPzGjIRepIQqLKxiPDQ2ZExOTDRirDQ2hITG%2FKxiNDw%2BPMTi5PzirKyq5CQiJPzGhKReNKzGxDQyXOT%2BxCxepFwyNOT%2B%2FOTirDQyhDyKxMSGXISm5IQ2NKzm%2FDQyNMTGrIQyNOSqZKReLCwuXDw6PKzi5FwuLCwuhDSGxMSGNGSq5GQ6PKzi%2FCwuLIQuLDw6ZDxirDw6jERCRMTm5CQmJMTGxPz%2BxDRepPz%2B%2FOTmrOTGpAAAAGAA%2BAMA2wAA%2FQAAf8hvPAYC6RsAEgAAAAAXAGcAABUAAAAAAADkIADn6QASEgAAAH4uJgBnLABpkcBmfAAAQwDqOgASXAAARP8gb%2F%2FpY%2F%2BQdf98bf8oAP8Cn%2F%2BRgP98fAD%2FAAD%2FAAD%2FAAD%2FAAAiAAACAACRAAB8AACbmAAB%2FRWRFQB8ADHbADoB8ACRFQB8AFAAAOcA8BIAFQAAAJ9gCOtQ6YEWEnwAAEsAdOPwb4EAcnwAXOBQZAI%2B6VEWEgAAAAAY2GfomgESgwAAfGzoCADpnwASgAAAfIwx%2F%2BY6%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAmOkA%2FZAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMAADoABUSAAAAAAD0AAArAACDAAB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAMAAChAABPAAAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fB5w%2FyK9%2F9dP%2F1oA%2FwWcpQDI%2FwBPgAAAfAAAiAABgQAAQgAAAKuMmCzo%2FdcSFVoAAMgAALoBABUAAAAAABi4LQBk6gCDEgB8AAABZAAAZAAAgwAAfAAAMQAwOgAAAAAAAEM7ZDoAZAAAgwAAfAAuagBncQBpSABmACH5BAAAAAAALAAAAAB0AB0ABwj%2FADNkMOLBCMGDBRMiXKiw4MGFDxVGnMiwosSGFSdi3GjwosAMOAh6SEhSpMmRJ0OOVIlyJMmXImG6PKlQZUyCKlneRKmzZcmVOzPUNBKyKNGjRQviUKr0oNGnSKNCnerUA0umFaku5dn0adOuRF2KHUs2ZUyyaNOqRcsy59m1Lt2mfcvWKty4K8luvctXb9q9S7fu7TsWsF21ge0mTnw4r2DFjiEzXgy5MV7DeC9LjlzZcmQcoB9TBu3BwEocpgOTXkzaqmrXoRWzXpo6tevUoVXbfh1492rUsHOrFm4gdvHiuUsTX46admjkyHNHF04d9PTm1qlPvx59e%2FXu2B8w%2F6EQHUMMBRewQ88OvjkRFTWyNz%2BefUMEJviZxKe%2FXj17%2BfT5h92A8w0YYHE%2BMIFecy0o2EGB%2FM333n6oTRjhhThscMQCP%2BCQ4IIQhojhgSJCOCJ7xYmnnwHFcaDgBSwWGKIG8M1HI4Ux8ndcER%2BsAEFxPKwYoYwkFieDkSTO119zMqDIYpMGJMgECD8YUMQRKijQQZNNuphfDSwaQGN%2BK46ZH3rHGQBlkxt8sAAEFapAHg5dkglmmGbipyWdqBVxH5k9qIkDBkDkpwQMUIap6JMGqKilAUE6GGaQgTa64pFLwKdopkyMYAAGCBSA6KIstumjmkF6yiKlLIp3pwGcgv8AAQY5iFpqBIca4GWl9j1qX65hHqnmsCxKOR6tBYSg5ZHMDotBCTP8KKYKATArA40jyNAkq9o2K4OGp5q3LKPOQgvBkTTKeiS34vUgrIuBypBgpTJQ2uyw3QYhQxAJulBrBSqM4IMCJGirr7aRMqEEDdpmWkO3MqAAn8FB1nDwvt2y8KeeBRvcbcILayvxw9o2oJ%2B%2BAyTB8L7tasvBstrSSEG%2BNF%2FcropMOPAAwQdrjF%2B2KdOgr8TV6hsEjQEcHGS1GGMcBAsb6iADC26m0POfQKus7wHUYry0tkErnbPLZOY3gtEe19xupgo4kcLONmC8c8FBmBAqw0d3ffDIXp%2F%2FnLa%2BVC9gdb1MMB3E3PvaXQDeN4ptsQxBG9xyECkL4XTTTQeh%2BeaH5xyEi0nDvXnlQUwgsRJCaC7xCBPsGwTRm5ucNOeb7%2BCmDprfEGrqlCchROun8w675rJrLp4DpcvgIvKH89y60bRHb7znnItuvAI26PvCCUlYoDkDt2%2FO9exBFC89%2BAvgTnzh12cfxPbdq07tBOvPjj7uElO%2Fur70a94%2F5%2FSbgAAncLzS0Q8JOxNAABmwMYV1L4Bcw08AJjC%2BAMougBgMAvoSEEACSEABAtBgA5XgOwGOz4AXLF3%2ByOSAAZqsbMgTYOlmKMMM1tCGODSgDm%2B4wxzy8Ic%2BDGIP2Ac4wAQK8YYCRMIElLjEJDqxiVBkohSfOMUoUvGKVsxiFbeIRSYKkAChsoAWr%2BhFJSLBjGhcYhrPqMY2svGNa4yjG%2BUIxznasY5wZCAM8UjHJp7xj4AMpCAHSchCGvKQiEykIhfJyEY68pGQjOQfRYAESlqykpi8pCYzyclNerKToPykKENJylGa8oyWPKUqS8nKVbqylbA0pQhmKQIDiAAAt8wlLnepy17y8pe%2BDCYwhynMYhLzmMZMJi5raYAJAOCZ0IymNKdJzWpa85rYzKY2t0lNJBggIAA7";
			}
		}, false);
		mathRangeButton.addEventListener("mouseout", function() { 
			if (mathRangeClickOnce != 1) {
				mathRangeButton.src = mathRangeSRC;
			}
		}, false);
		
		mathRangeButton.addEventListener("click", function(){
			mathArray();
			mathRangeClickOnce = 1;
			mathRangeButton.src = "";
		}, false);
		
		var bx = document.getElementById('content').getElementsByTagName('h2')[0];
		bx.parentNode.insertBefore(mathRangeButton, bx);
	}
	else { mathArray(); }
}

// used for operations on manage page
function mathArray() {
	// math Array checkboxes
	var box=new Array();
	var lx = document.getElementsByName('sort');
	
	for (var i in lx) {
		box[i] = document.createElement("input");
		box[i].type="checkbox";
		box[i].setAttribute('realChecked', "0");
		box[i].setAttribute('arrayValue', i);
		lx[i].parentNode.insertBefore(box[i], lx[i]);
		
		//check for max of two boxes
		box[i].addEventListener("click", function() {
			var unclickCheck = 0;
			if (this.checked == true) { this.setAttribute('realChecked', "1"); }
			// if you unselect the box do the following:
			else  { 
				this.setAttribute('realChecked', "0"); 
				for (var m in lx) {
					if (box[m].getAttribute('realChecked') != "1") {
						box[m].checked = false;
						box[m].disabled = false;
					}
				}
			}
			var counter = 0;
						
			var firstValue, secondValue, thirdValue;
			for (var z in lx) {
				if (box[z].getAttribute('realChecked') == "1") { 
					counter++;
					if (counter == 1) {
						firstValue = parseInt(z);
					}
					else if (counter == 2) {
						secondValue = parseInt(z);
					}
					else if (counter == 3) {
						thirdValue = parseInt(z);
					}
				}
			}
			if (counter == 2) {
				//visibly show which boxes you checked
				for (var x = firstValue+1; x <= secondValue-1; x++) {
					box[x].checked = true;
					box[x].disabled = true;
				}
			}
			else if (counter == 3) {
				alert("You can only select TWO check boxes.  One for the top of your range, one for the bottom of your range.  Unselecting the checkbox.");
				// if you select below the current range
				if  (this.getAttribute('arrayValue') > secondValue) { 
					for (var x = firstValue+1; x <= secondValue+1; x++) {
						box[x].checked = false;
						box[x].disabled = false;
						box[x].setAttribute('realChecked', "0");
					}
					//uncheck current selection
					box[thirdValue].checked = false;
					box[thirdValue].setAttribute('realChecked', "0");

				}
				// if you select above the current range
				else if (this.getAttribute('arrayValue') < secondValue) {
					for (var y = secondValue; y <= thirdValue-1; y++) {
						
						box[y].checked = false;
						box[y].disabled = false;
						box[y].setAttribute('realChecked', "0");
					}
					//uncheck current selection
					box[firstValue].checked = false;
					box[firstValue].setAttribute('realChecked', "0");
				}
			}
		}, false);
	}
	
	//execute the math range button
	var operationImage = document.createElement('img');
	var operationImageSRC = "data:image/gif;base64,R0lGODlhYgAdAPcAACQiJOSqZDw6jFxaXGSq5OTmzExKTDQ2NGQ6PDxmrKzm5MTGxMSKPIw6PPz%2B5PzKjIzKzDyKxDw%2BZDRirKxiPERCRMT%2B%2FIyq5OT%2BzGxCRERurIxCROTmrERGbKxqPOSqbERCjGyu5Dw%2BPGQ%2BPDxqrKzm%2FPzGxMyOROT%2B%2FIzK%2FDyKzDw%2BbPz%2BxDQyNDw%2BjGyq5ExOTDw6PMzm5MzKzMyKPIw%2BPMzKrKzKzDxirKxmPERGRMz%2B%2FIxGRPzmrKxqROSubGw%2BPERqrPz%2B%2FESOzERCbPz%2BzJFpAHwEAIUgAecAAIEAAHwAAACSAAABABVPAAABAGABAAMAAAAAAAACANABECkAABkAAAAAAADZAGeLABVBAAB%2BAACINAAQAABHAAB%2BwH4uAQBnAABpAMBmAAAAQwDoOgASXAAARP88b%2F%2FCY%2F9Cdf9%2Bbf%2FpAP%2FBn%2F9CgP9%2BfADIAADzAAASAAAAAACQAACIAABGAAAAAAAAMAAA%2FhUAFQAAAKcAAJMA8AAAFQAAAFABAOcA8BIAFQAAAJ8ACOsA6YEAEnwAAEsIdOPob4EScnwAXOCwZAKB6VFDEgAAAADk2GfzmgESgwAAfGyPCAAEnwBEgAB%2BfIyn%2F%2BaT%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAMOkA%2FpAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMOQDoUhUSkQAAfAD0kAAr6QCDEgB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAM1AChAABPEwAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fABw%2F8K9%2FwBP%2F1AA%2FzicpdXI%2FxVPgAAAfEMAiDoBgQAAQgAAAACMMADo%2FgASFQAAAIgAAAIBAAwAAAEAAL64LZRk6kGDEn58AA0BZI4AZEIAg34AfLYApwAwk2kAAAR%2BAEOIZDoCZAAMgwABfJIuagFncU9pSAFmACH5BAAAAAAALAAAAABiAB0ABwj%2FAAcMgAHDQEGCCA0aRJiQoUOCCxc%2BnNiwYUSHCitK1MhQ4MCNCjcezAhxpMmDJjOqPFmyIsuWGFGCLDjAQEibMm3qLGlAB0%2BTPneuxDkyos2gQncW1OkTBtKmOm%2FizKhjKtOpB6tKNag1ataoO7t%2BLfqVqkqwS7FqLQu2a1Stbru67Xn17dG2YOnetcu37966deHqFXyXMOHBew1fraoYMWLGixNL7gmZLuTLhS1rxsw5s%2BLOVStsHj0adGHRlRmrNoD6MePWOjjHptwT9eXXpUNbxj27N%2BvCsX2nEEJcyInfoisEZx18NmznoaEj161cN%2BQKGlD8YE6ZunXu1ZuL%2F48dBIXx2MMfiEetPLx7HeGDJ08un7n47D%2FiN29vf3wF%2BuPJB58ORChQAA8DVhCCEPkN6KCAsenX3oP7rQefcuX9EKGD7204oX8XJtjef0MwKMJ%2F8IEgAwcZYGhecUVs8N9%2FHZQAo4zwlVecEAEoN1xxDeqgI5AVlPfBhUTYSJx67Q1JnAM%2BVCflfydW8IJxM1aZApQViKBjDxm4sEOM%2F4nJJQhjbnDily3%2BFwGWIiz4QZUkoDBnl0JqdyKaXL75QJdFmgemBAbKeGKVVf63ZZSJKigEA%2F%2BVB2akKPRopXGHqoBloJMCSuV%2FRNxgQ5sZzhjoB%2F9dScOMIXDJKRAkCv%2BxqqmfnrhlDrVeesKJCaDw54kurDhCBYvOWN6vvd6J6H%2BaEldEDV0aeWgFvf5gK5SZCnFnnaie%2BKaygE4rwqIiiHtrtJV2KYIEosL6445CPLBmuoeKIOaSIkCwALRe0ovunPnOUMOh5fXYbwDZWhuuuuWKoOmdMZS7goENlNurvBXEECwHI%2BS7b8Mgi5AsyBUQ4EAO5RJawMAiVwryyB6rWa6mCLcMsMPahlxuxBELICzPLcsbca89jDC0rxGbnAPQEVvsctMHQCDw0UVUHMPFIvDcK8IxECBr1iJ4zcDRXOMcANNgA%2F1m2QJYwILVV5tHQ9a3Zn0x0zEc0HLZSZ%2F%2FnPUFGHys8YoIgL310T0U7jMHhcd9dtZrp511DHlXfoDXO76dtwgH9EqcCTs8ekDlb8I79gETVDr66m1nvkADq6dOXACoV0r6jifHbvvoa69e%2Be%2BUBy%2B88KOnHsCbVQ%2Bv%2FPLMN%2B%2F889ATn%2FcB1Fdv%2FfWdq4799tx37%2F334IcvvvXGj2%2F%2B%2Beh738IB67fP%2Fvvuxw%2F%2F%2FPLXT%2F%2F99ueP%2F%2F72z%2F%2F%2B%2F%2BsDIPUCSMABGlCACCxgAg%2BowAYy8IH0a4EDF0jBCVoQghesIAYxKMEOtgAA7APhB0NIwhGaUIQoLGEKT6jCFrLwhSuMoQtFKEERePCGOMyhDnfIwx768Ic9%2FM8HGAFAxCIa8YhITKISl8jEJjrxiURsQQUCAgA7";
	operationImage.src = operationImageSRC;
	
	var yx = document.getElementById('content').getElementsByTagName('h2')[0];
	yx.parentNode.insertBefore(operationImage, yx);
	//yx.appendChild(operationImage);

	operationImage.addEventListener("mouseover", function() { 
		operationImage.src = "data:image/gif;base64,R0lGODlhYgAdAPcAABwaHOSmXKRaLITGxDQyXOTixDQ2NCxapFwuLKTi5PzGhMTGxFym5Pz%2B5OTipMSCLGQ2NCyCxCwqLCwqhExOTDRirIQqLMT%2B%2FITG%2FKxiNDw%2BPKzi%2FMTGpPzipDQyhCQiJKReNKTGxOT%2BxCxepMTi5ISm5OT%2B%2FMSKPDQyNIQyNOSqZKReLDQ2ZDw6PFwyNKzi5PzGjPzGxGSq5OTirMSGNIQ2NDSGxCwuLCwuhDxirIQuLIzG%2FERCRMTGrPzirDQ2hCQmJKzGxPz%2BxDRepPz%2B%2FAACAJHFAHwBAIUgAecAAIEAAHwAAABsAAABABWXAAABAGASAAMAAAAAAAACAJgBEFEAABsAAAAAAADZAGeLABVBAAB%2BAACINAAQAABHAAB%2BwH4uAQBnAABpAMBmAAAAQwDoOgASXAAARP88b%2F%2FCY%2F9Cdf9%2Bbf%2FpAP%2FBn%2F9CgP9%2BfADIAADzAAASAAAAAACQAACIAABGAAAAAAAAmAAA%2FRUAFQAAAOoAAH0A8AAAFQAAAFABAOcA8BIAFQAAAJ8ACOsA6YEAEnwAAEsIdOPob4EScnwAXOCwZAKB6VFDEgAAAADk2GfzmgESgwAAfGyPCAAEnwBEgAB%2BfIzq%2F%2BZ9%2FxIA%2FwAA%2FzRoAADonwASgMAAfAS1gPwrThKDgwB8fCAAmOkA%2FZAAFXwAAGAApQAA%2F5EAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJEAAHwAAOoZAPQsAICDAHx8AACMOQDoUhUSkQAAfAD0kAAr6QCDEgB8AAAAAWcAABUAAAAAAAAtRAHq6QASEgAAAAAM1AChAABPEwAAAPdaBPQA%2FIAAEnwAAHiQ2OjpmhISgwAAfACdqGdk%2FxWDgAB8fABw%2F8K9%2FwBP%2F1AA%2F6CcpdTI%2FxVPgAAAfEMAiDoBgQAAQgAAAACMmADo%2FQASFQAAAP4AAAEBACwAAAEAAL64LZRk6kGDEn58AA0BZI4AZEIAg34AfCwA6gIwfcUAAAF%2BAEP%2BZDoBZAAsgwABfGwuagFncZdpSAFmACH5BAAAAAAALAAAAABiAB0ABwj%2FAClQ4KGBB0GDBQseJJjwoMKHDSM6nChR4sKGFCdmrEhQIIUWDBNqECnSIMiRIRmaVIlSw8mIJRO%2BFDmTJUyCJ1%2Fa5EFBIsifPIC2GIlyaNCjRIsWPHlwqFCcSycCbfjU5VKlTa9qTcq168icIbviDJt0JlGzXtOeZahz7dexX60OVUv3bFyuc%2Bd21XuXr9y9XvX6tQs4r9W%2Ff53ejWvYrmLGix9D5iv58GHJLTJrdqlZcWarBuR2dtoiNGnSpjlnTr259ejEpUWzju3adGcNBkavHpp7c%2B%2FOv3cL1xycuHHeuksPRw48efHc0DPvIEKdyAnhvbMr1668e3ft3H%2BL%2Fy9dwYQK7Oi%2F7w6%2FvUUOE9ZzT1fQPrr99fXz39%2F%2FXsV%2B%2FQDe115p0LHwQgE1tIBCZgwQcZ6A4EWnngESQlhfeQ%2Fmh0KE%2BdWX24IULrigDQ4SSOEPJMwAAYXlVUeEECmUtiALG1QnRA0gtlidCgtOtyOFBuhInX8YUtgCjdXBAF2Q8FXXQAYKmghkiDIQQcOUFGLwJIVDwOcDBD9ccOOJF2wZ5phMEvElkCTSoGCD%2FnFp3pRd8mhAmFuSqACQLX5JQAIIYmnAhhsaoGUGKBA6aJU0JFrelxtimCijhLbpqAkdQJDooJxuyEIQPWjKZACbolAkCg02OmkDIAxaXgcujP9opaKEJnoDClqCkOiuqM6KwggmKGCrByQ4EGuuu5Yn7K%2Fm8XproiRSB2OidfIKrAq3IptoBA7eekCzKNxAIra8hmsuCjs0sIKt5mopQLgYPktAEBzE6qOLRAh7Q3kB3PqsBxdQJ%2BwAC6RwK7Ck%2BstvogSnYG6XpJpqQr%2FQEhGxv86iwG3Cu%2F5ZgMPM6osCDsW6cAPBOuyKMbM8PnsDA6yG67HD%2B0587rctN%2Fwst%2BRea%2B64Ltt6w9A3kGws0TcAqwDRwPqAgAQhDw0zCEiHOzTCSJ%2B8gA43SACsEFwnHSzUV08sNREPWN3gA2X3O%2FTGWcd9A9woSICDmGHf8C3adWv%2FuULZS9ed9bduEw3z3yiUIMICFgw9QbEIMD2xBGJ3ELnRkett9tsWx025BKCD3qCLQljwuebUxRDwA59LwC2%2BrGseAOhd2x2wjYzXDix1sxNe%2B%2BvUqUs74aFvTPvpx9eu%2FPGhE84t2K0vHz3z0ldP%2FfXTZ29966ADIYH333cvfvjhE08%2B%2BOiPn%2F756rfP%2Fvvrx98%2B%2BOED4b3939%2Bv%2F%2FeE4%2B%2F%2F%2Fv%2FLnwADSEAAGnCAByxg%2FfJnvwY68IEQjKAEJ0jBClrwghjMoAY3yMEOQvADQAChCENIwhGasIQoPKEKU8jCFbqwhTAcYQlfSMMY2rCGOLyhDj%2FAQx4a4AMAAKIQMYNIxCEasYhIPKISk8jEJTqxiVA04gcoJAEAWPGKWMyiFrfIxS568YtgDOMVgWCAgAAAOw%3D%3D";
	}, false);
	operationImage.addEventListener("mouseout", function() { 
			operationImage.src = operationImageSRC;
	}, false);
	
	operationImage.addEventListener("click", function(e){
		var upperRangeValue, lowerRangeValue;
		
		var counter = 0;
		// check if they have two check boxes
		for (var q in lx) {
			if (box[q].getAttribute('realChecked') == "1"){ 
				counter++;
				if (counter == 1) { upperRangeValue = parseInt(q); } 
				else if (counter == 2) { lowerRangeValue = parseInt(q); }	
			}
		}
		if (counter == 1) { alert("You must select two checkboxes to include your entire range.\nExample- select the 3rd checkbox and 6th checkbox to perform a math operation on torrents 3, 4, 5, 6\nAnother option is to select NO checkboxes.  When you perform an operation, it will perform on ALL torrents.\nRemember: click edit all to update the changes."); }
		
		// We are ready to do the math operations
		else {
			var userOperationMessage = "What operation do you want to perform:\nadd: +\nsubtract: -\nmultiply: *\ndivide: \/\nreverse: r\nsort by year: y\nsort alphabetically: a\nfind missing torrents: m\n\nRemember: click edit all to update the changes.";
			if (counter == 0) {	
				// check all the boxes so you can see you're doing stuff on everything
				for (var c in lx) {
					box[c].checked = true;
					box[c].disabled = true;
				}
				
				upperRangeValue = 0;
				//for (var j in lx) { ;}
				//lowerRangeValue = parseInt(j);
				lowerRangeValue = parseInt(c);
				
				var userOperation = prompt("Now performing an operation on ALL elements.\n\n" + userOperationMessage);
			}
			else {
				var userOperation = prompt(userOperationMessage);
			}
			
			if (userOperation != null && userOperation != '') {
				userOperation = userOperation.toUpperCase();
				if (userOperation == "+" || userOperation == "-" || userOperation == "*" || userOperation == "\/") {
				
					var adjustValue = prompt("Current operation: \"" + userOperation + "\".  Input an integer to adjust the selected range by the operation.\nRemember: click edit all to update the changes.");
					if (adjustValue != null && adjustValue != '') {
						adjustValue = parseInt(adjustValue);
						
						if (isNaN(adjustValue)) { 
							alert("Please pick a valid integer!"); 
							return;
						}
					}
					else { return; }
				}
				else if (userOperation == "R") {
				}
				else if (userOperation == "Y") {
				}
				else if (userOperation == "A") {
				}
				else if (userOperation == "M") {
					var diffValue = prompt("Current operation: \"Find Missing Torrents\".  Input the difference of sort numbers.\nExample: Input 10 if the collage sort numbers are 10, 20, 30, ...");
					if (diffValue != null && diffValue != '') {
						diffValue = parseInt(diffValue);
						if (isNaN(diffValue)) { 
							alert("Please pick a valid integer!"); 
							return;
						}
					}
					else { return; }
				}
				else { 
					// uncheck all the boxes assuming the user never selecting any
					if (counter == 0) {					
						for (var c in lx) {
							if (c >= upperRangeValue && c <= lowerRangeValue) {
								box[c].checked = false;
								box[c].disabled = false;
							}	
						}
					}
					alert("Please select only the following characters \"+\", \"-\", \"*\", \"\/\", \"r\", \"y\", \"a\", \"m\" (no quotes)");
					return; 
				}
			}
			// user hits cancel
			else { 
				// uncheck all the boxes assuming the user never selecting any
				if (counter == 0) {
					for (var c in lx) {
						if (c >= upperRangeValue && c <= lowerRangeValue) {
							box[c].checked = false;
							box[c].disabled = false;
						}	
					}
				}
				return; 
			}
						
			var allNewSortNumbers=new Array();
			// update the numbers in the range
			if (userOperation == "+") {
				for (var b in lx) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) + adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}
			}
			else if (userOperation == "-") {
				for (var b in lx) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) - adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}
			}
			else if (userOperation == "*") {
				for (var b in lx) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) * adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}			
			}
			else if (userOperation == "\/") {
				for (var b in lx) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) / adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}
			}
			else if (userOperation == "Y") {
				var items = document.getElementsByTagName("tr");
				var years = new Array();
				var year, tempYearChecker;
				
				for (var i=1; i<items.length; i++) { //Starts at one to skip the heading
					var info = items[i].getElementsByTagName("td");
					year = info[1].innerHTML;
					year = year.split("[");
					
					// check for no year listed
					if (year.length == 1) { year = 99999; }
					else {
						year = parseInt(year[year.length-1].split("]")[0]);
						if (isNaN(parseInt(year))) { year = 99999; }					
					}
					years.push(year);
				}
				for (var j in lx) {
					if (j >= upperRangeValue && j <= lowerRangeValue) {
							lx[j].value = years[j];
						}
						else if (years[j] == undefined) { alert("oops"); }
				}
			}

			//sort alphabetically
			else if (userOperation == "A") {				
				var items = document.getElementById("content").getElementsByTagName("a");
				var names = new Array();
				var artist, album;
				var artistMatch, artistMatchSecond, albumMatch;
				var combined;

				for (var i in items) { 
					albumMatch = items[i].href.match(/torrents\.php\?id=([0-9]+)$/);
					if (albumMatch) { 
						album = items[i].innerHTML;
						artistMatch = items[i-1].href.match(/artist\.php\?id=([0-9]+)$/);
						
						if (artistMatch) { 
							artist = items[i-1].innerHTML; 
							/*/check for 2 artists (eg. "Billy Bragg" and "Wilco" - "Mermaid Avenue")
							artistMatchSecond = items[i-2].href.match(/artist\.php\?id=([0-9]+)$/);
							if (artistMatchSecond) { artist = items[i-2].innerHTML + " and " + artist; }
							// sort by artist - album
							if (userOperation == "A" ) { combined = artist + " - " + album; }
							// sort by album - artist
							else {combined = album + " - " + artist; }*/
							combined = album + " - " + artist; 
						}
						// case for no artist found (ie pdf, audiobook, Various Artists etc)
						else { 
							combined = album; 
							
							/*/ super ugly way to handle Various Artists for sort by artist (if anyone has a better idea, I'm all ears :)
							if (userOperation == "A") {
								var itemsx = document.getElementById("content").getElementsByTagName("tr");
								outerLoop: for (var z in itemsx) {
									var match = itemsx[z].innerHTML.match(/torrents\.php/);
									if (match) { 
										if (itemsx[z].innerHTML.match(/Various Artists/)) { 
											var tempAlbumCheck = itemsx[z].innerHTML.substring(itemsx[z].innerHTML.indexOf("Torrent\">")+9, itemsx[z].innerHTML.indexOf("</a>"));
											if (album == tempAlbumCheck) {
												//handle case for a, an, the
												album = album.toLowerCase();
												if (album.substr(0,2) == "a ") { album = album.slice(2); }
												else if (album.substr(0,3) == "an ") { album = album.slice(3); }
												else if (album.substr(0,4) == "the ") { album = album.slice(4); }
												
												//put at end of sort list
												combined = "Ã©Ã©Ã©Ã©Ã© - " + album;
												break outerLoop;
											}
										}
									}
								}
							}*/
						}

						combined = combined.toLowerCase();
						
						//handle case for a, an, the
						if (combined.substr(0,2) == "a ") { combined = combined.slice(2); }
						else if (combined.substr(0,3) == "an ") { combined = combined.slice(3); }
						else if (combined.substr(0,4) == "the ") { combined = combined.slice(4); }
						
						names.push(combined); 
					}
				}
				var namesSorted = names.slice(upperRangeValue, lowerRangeValue+1);
				namesSorted.sort();
				
				var counter = 0;
				var counterRate = 10;
				if (upperRangeValue != 0) {
					counter = parseInt(lx[upperRangeValue-1].value);
					counterRate = prompt("Enter the difference in between each torrent sort number\neg. 10 if torrents are 10,20,30,.. or 1 if torrents are 1,2,3,..");
					if (counterRate != null && counterRate != '') {
						counterRate = parseInt(counterRate);
						if (isNaN(counterRate)) { alert("Please pick a valid number!"); return;}
						else {  }
					}
				}
			
				for (var i in namesSorted) {
					innerLoop: for (var j in names) {
						if (namesSorted[i] == names[j]) {
							counter += counterRate;
							lx[j].value = counter;
							break innerLoop;
						}
					
					}
				}
			}

			//reverse the numbers
			else if (userOperation == "R") { 
				var tempReverseNum=new Array();
				var theCount = 0;
				for (var b in lx) {
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						tempReverseNum[theCount] = parseInt(lx[b].value);
						theCount++;
					}				
				}
				tempReverseNum.reverse();
				var px = document.getElementsByName('sort');
				theCount = 0;
				for (var b in px) {
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						//alert(tempReverseNum[b]);
						px[b].value = tempReverseNum[theCount];
						theCount++;
					}
				}
			}
			//find missing numbers
			else if (userOperation == "M") {
				/*var nextNumber;
				var zzb = document.getElementsByName('sort');
				var firstNumber;
				var lastNumber = parseInt(zzb[lowerRangeValue].value);
				var missingValues=new Array();
				var extraValues=new Array();
				var isAMatch;
				var missingCount = -1;
				var checkNumber;
				for (var i = upperRangeValue; i < lowerRangeValue; i++) {
					isAMatch = 0;
					var tempCount = 0;
					firstNumber = parseInt(zzb[i].value);
					//alert("M");
					for (checkNumber = firstNumber; checkNumber < lastNumber; checkNumber += diffValue) {
						if (checkNumber != parseInt(zzb[tempCount].value)) { 
							//alert("L");
							isAMatch = checkNumber;
							missingCount++;
							//break;
						}
						tempCount++;
					}
					if (isAMatch != 0) { 
						missingValues[missingCount] = isAMatch;
					}
					//firstNumber += diffValue;

				}
				alert("LPL" + missingValues);*/
			
			
				
				var missingValues=new Array();
				var extraValues=new Array();
				var missingCount = 0;
				var extraCount = 0;
				var zzb = document.getElementsByName('sort');
				//var zzb = document.getElementById('content').getElementsByTagName('a');
				//alert(upperRangeValue);
				var checkNumber = parseInt(zzb[upperRangeValue].value);
				//alert(checkNumber);
				//var lastValue = parseInt(zzb[lowerRangeValue]);
				var nextNumber;
				for (var i = upperRangeValue; i < lowerRangeValue; i++) {
					//checkNumber = checkNumber + diffValue;
					checkNumber += diffValue;
					nextNumber = parseInt(zzb[(i+1)].value);
					//alert(checkNumber + " " + nextNumber);

					if (checkNumber != nextNumber) {
						//alert(checkNumber + " " + nextNumber);
						if (checkNumber < nextNumber) {
							i--;
							if (checkNumber != missingValues[missingCount-1]) {
								missingValues[missingCount] = checkNumber;
								missingCount++;
							}
						}
						else {
							extraValues[extraCount] = nextNumber;
							extraCount++;
							if (checkNumber != missingValues[missingCount-1]) {
								missingValues[missingCount] = checkNumber;
								missingCount++;
								checkNumber -= diffValue;
							}
						}
					}
					else {
						
						//var lolCount = missingCount - 1;
						//while (lolCount > 0) {
						//	if (checkNumber == missingValues[lolCount-1]) {
						//		missingCount--;
						//		missingValues.pop();
						//		alert("Hey");
						//	}
						//	else { break; }
						//}
						
						if (checkNumber == missingValues[missingCount-1]) {
								missingCount--;
								missingValues.pop();
						}
						
						//for (var lolCount = (missingCount - 1); checkNumber == missingValues[lolCount]; lolCount--) {
						//	if (checkNumber == missingValues[lolCount]) {
						//		missingCount--;
						//		missingValues.pop();
						//		alert("hey");
						//	}
						//	else { break; }
						//}
						else if (checkNumber == extraValues[extraCount-1]) {
							//i--;
						}
					}
				}
				if (missingCount == 0) { 
					if (extraCount == 0) {
						alert("No missing sort numbers.\nAlso, no extra sort numbers tucked inbetween.");
					}
					else {
						alert("No missing sort numbers.\nBut the extra sort numbers are: " + extraValues);
					}	
				}
				else {
					if (extraCount == 0) {
						alert("The missing sort numbers are: " + missingValues + "\nAlso, no extra sort numbers tucked inbetween.");
					}
					else { 
						alert("The missing sort numbers are: " + missingValues + "\nAnd the extra sort numbers are: " + extraValues);
					}
				}
			}



			// uncheck the boxes in the range (note: the above/below loops should be separate for speed issues
			for (var c in lx) {
				if (c >= upperRangeValue && c <= lowerRangeValue) {
					box[c].checked = false;
					box[c].disabled = false;
				}	
			}
			box[upperRangeValue].setAttribute('realChecked', "0");
			box[lowerRangeValue].setAttribute('realChecked', "0");
		}
	}, false);
}

// get the collage ID from stored file
function getCollageID() {
	collageID = GM_getValue("key", "0");
	collName = GM_getValue("keyName", "None");
}

// write the collage ID to the stored file
function setCollageID() {
	GM_setValue("keyName", this.getAttribute('collage-name'));
	GM_setValue("key", this.getAttribute('collage-url'));
	collName = this.getAttribute('collage-name');
	collageID = this.getAttribute('collage-url');
	document.location.reload();
}

function image_click(e) {
	//error checking on collageID in case user updates collage and doesn't refresh torrents.php page
	if (GM_getValue("key") != collageID) {
		window.location.reload();
		alert("Active collage has been changed to: \"" + GM_getValue("keyName") + "\".  Now refreshing the page.");
		return;
	}

	// use loading image
	this.src = "data:image/gif;base64,R0lGODlhEAAQAOf%2FAP8AAP8ACP8BFP8DHf8DJP8HMf8IK%2F8KN%2FgPJ%2FoSEPkRIPgQLfoSGfIYCtIfLeUaKvEYHPIZFfQbAP8RSeccJfAZMOkdH%2F8aAPIbJP8aCOAhIvIbKu8aQfAbPOMkC%2BwhEegfMtomGN4iNOEjKf0bKvsaO%2F8eCv8dFeYgQ%2FIeN%2F8dHf8dJMksMccsO98lQO8fTf4eMeIjUvciIOwkL%2BMnMdYpR8QxMPohNuslO%2FAnHeslQOMoPeklStUuLNsrOe0mNuInTeEoR94sLN0sNcwxOdssQNUvN9QvPNAvUcI2NvcnQf8sC9A2NtQzSf8sFt0xTusqa8g5P%2BgvRtoxXNcxZds1NuMvWtI3PdI1WewxN9I4Q8k6UMY9ReU1OvQwQdI5T888Pdw4RuUzYeM2S9k4V849SOU3Rr1DRvAyYb9DUOQ7NNg6Yuw2VslDU%2FE5R85BYOc8VORBVfc%2BRfVAUfVAXOtGR91LU%2BJJW%2BRJVuhHYvRJYfRLau9OXf9OWudWaPlRdv9TZtVfdd1gfv9aYv9cat1lde9hc%2F9dcMNxd%2F1gdf9ggv9jbOhrat9rjf9lc%2B1recd2h%2F9qaOdydOhyet5zlP9tc%2BtxjOZ0gOtylex3fv9yg997jOJ7iP92jOV%2Bmf96df96fP97iPZ%2Bl%2BGEnO6Dl%2FuCif9%2FnP6Ckf%2BCl9CRm8iTov2Eo%2F%2BFq%2FaIqeyLrdGWmPuHsfqJo%2BGPuO%2BQmPGQovmPpveQrvuPt%2F%2BUwP%2BYttmps%2F2euP%2Bes%2F%2Bfrv%2BhyP%2Biw92zvP%2BuyP%2Byxv%2B2wv%2B1z%2F%2B21f%2B6y%2F%2B70v%2B9xv%2B76%2F%2FAz%2F%2FA3f%2FC1%2F%2FB5P%2FEy%2F%2FF4P%2FH1P%2FJ3P%2FI6P%2FJ7%2FjO1v%2FM5P%2FP2v7P3%2F%2FP7evV9eTY7P7R5%2F%2FQ9P%2FU3fTV9e7Z7P%2FV8v%2FX5f%2FV%2F%2BLi7f%2Fa7vne9v%2Fd9%2F7e%2Fv%2Fg7P%2Fj6P%2Fi9Pzk%2F%2F%2Fk%2FP%2Fo%2BP%2Fp8%2FXr%2F%2F7q%2F%2FXv%2Ffzw9%2F%2Fw%2Fu73%2F%2Fv0%2F%2Fb2%2F%2Bn6%2F%2BT9%2F%2BL%2F%2Ff%2F3%2Fen%2B%2FfD9%2Fvz6%2Fvf8%2F%2FUZACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhFDcmVhdGVkIHdpdGggR0lNUAAh%2BQQACgD%2FACwAAAAAEAAQAAAI%2FgClGTFhIsAJgiZUqDgYoUYyFzRmDLnCRAOEDT9mRDBYAYmABb%2FAzUsXjQcPU6eMqBCgAkMAA1S45dtnzsoLYuSq3RkQIICTDVOm8dvHjoeCRdHmSTOTwEQDGqzAdaMWDUeABGfMsRNFwcSSK9LATbLRS8QAExEusXtm5MQSLvDYtVUgJcXBIezmRSEYZR67ISZOpHBBQoURdvC4BDbyjN2lCCYG7DhlY9I5aVecmKAgip25MwkC6IgGzBq4VTQ0JzAjbV60RQp4mNvHj9uUBQUDDLhTjRyxF1Zm55tGBYYJDCsNnzJlklm6eed8LQiApMKJABFm%2FNgAQQMTJkNmEoBwkawG5BMKTVwIfGK9EWkBAQAh%2BQQACgD%2FACwBAAAADgAQAAAI8gBzNDixgs2yTVcGCEgA4USADw4XrJHGDhkeDAFOCFiR4AQDHrfY2Zt3bU4AAQNKnNiQpxg4ffzm8fLRwcuMhl%2BwmYOmal64LiB8cStjQgUte9iKHDFW6QQGbPVmmdhwDJ4lAgMGCRGgYlM8YiRQVAsXRqEFDQMIfFGHjYdYdFEEBLBgIW0TctuALDhWj5OJEyMIDYCBid0xDSdG2Xu2sFMwI0SwzaPlxESbabduSNnWLpUzdtya%2FN0wBwWQXfX21QNHLA4ClAECrNBTTR6%2Fc7B0bCQhwISJABj4DGO7poCAExBMfPDgUEART8%2FgGBjAIEJAACH5BAAKAP8ALAIAAAAMABAAAAjTAAuYWGJCwEA1uKAUuKBCAAMaWsAwmQSu0Y4TJkgAubWtnTp29tJFUaECTjJx7NTB88cvHagEOpjBq5YoDKJ686QBUrGK3bc0AgSACvdLDIcH5dht2hAgQKQ4KDgoWrWvnJSgEEYoGFBh27x51RYMYKABg4kTNNDtq3Vowwwzjgw2kDRPmwgQV3qFCzVARRJq7FwlGHStnz1IcQxFa%2FeMTQBN7Pbxm2eO3bpneBAEaLLuXTt38LDZGiPjrIhG2EolAWMkCwMBGBHEyNUFo4mzAgYEBAAh%2BQQACgD%2FACwBAAAADQAQAAAI4wArMAhwQoWKEyYumFCxQoAJEycwHGmT5oiFFQgq3LigQoqpZ%2FPmNUPl48mvPQ3wSGOnjh27c%2BCsQTMnqAk2eOQk9Thiadu9fPMCxQIHLk2DJSdaXMO3r52fWscSYQiwsFc1c%2BCO9amBogQMGCl2SJGCAgWODX%2F%2B7NGjx4USEgMUpDiLzVy7cKUUqAjAwBEzVCn87eOniwXCE1yisavVIR%2B%2FedsK9RDC6Bq8al8QqCPWjNs5li6ljVFhglUMNKyetWM3bdUOAQBMVICBYAaLM22epBggQABphAqXGDwRgESKDQEBACH5BAAKAP8ALAAAAQAQAA0AAAjhAAUwUCAgwAkFPIBQOGHChAoZEHKcCIChDKlj4LYxo8XFgsETHibKqdavnjlz8Oxtw6MigICJAn7EYjbqDRlM1cgJA6FgRQAFc0RsWBGBQIEDRZyFa4WFjgA%2B0Hq5SeBywAAHr%2BzBk%2FZsjDF59bZpGpHDwiJl7fbxY%2BfJEzt%2F%2B%2BYFO2QhRJVO4ObJU%2FZk2jR29VR9IVDwxAI2vKzxIbBnDaxy0LQQCBAgAQYcLuZgGLAChgtl6K5pqiBikrKdAgRQPbHCDrl58K6Fg6evmheGH07o3oBFVjZ6%2FrLJevOAoYSAACH5BAAKAP8ALAAAAgAQAAwAAAjVAC8EGKDiBI1a8%2FZ9i4XDhIkBExD44FKJEI5E3dKpY8eszokBBqBQcufu2ZMZMoRw8vZumw8VA3CZi7dv3i4cAgRgSAPOXC0QAtRkasfPXrcxBgYMNMSu2hEBS5KwY4foUyUQCAQEMEKOHJETF7ScW6flhAkIDxZ9QgSPHRgnJsJMY2fIbAAFccjpo8cukxoTI3atu5ZERQACQXzN4zdvW64TKopEU9ftEQ4lPLBIU6euUYwIKvBWY8cZmyIdg0Jt2UGAxAkBCKy4GodvnigNoUmoABAQADs%3D";
	var lol = this;
	
	//add to collage
	GM_xmlhttpRequest({
		method: "POST",
		url: site_base_url + "/collections.php",
		data: "action=add_torrent&collageid=" + collageID + "&url=" + this.getAttribute('torrent-url'),
		headers: { "Content-Type" : "application/x-www-form-urlencoded" },
		onload: function(f) { 
			// add the checkmark image
			lol.src = "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr%2F2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr%2FwAARCAAQABADASIAAhEBAxEB%2F8QAFgABAQEAAAAAAAAAAAAAAAAACAcJ%2F8QAJRAAAQMDBAICAwAAAAAAAAAAAgEDBAUGEQcIEiEAExQxMkFR%2F8QAFQEBAQAAAAAAAAAAAAAAAAAABQf%2FxAAiEQACAQMEAgMAAAAAAAAAAAABAgMEETEABQYhEhMiQWH%2F2gAMAwEAAhEDEQA%2FANAGhV1wgaMSNtW0MBJFVtTTkGRRcjlPr%2B%2FaeH3ULcjfF5awUnTPbbcktufEm5h1OnOepBkNBl%2BU4Q5U2I480JC5C4qkKCXIecH3n0nc9tKvyt6qWve1fqtv3i86zKuunZ%2BUHyVXMGYIpxEkRfW24IoJCIoPrJOPiP2S7dajoxpw3d2oFNYbvC44bRy43alRoadtQUzhBNOjd%2FfLAr%2BHQtVSVFWqo58VuCxGWt2qrbAJ%2BRwR%2Bamc9fyPlW6Ls0tM1NFGzPM3ke1VrRiIjtfZkkG4z9X1%2F9k%3D";; 
		}
	});
}

//update Script yoinked from: http://userscripts.org/scripts/review/20145
function update() {
var SUC_script_num = 66746; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 172800000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}

/*chrome support, to be implemented
if (typeof GM_log == 'undefined') {
	unsafeWindow = window;

	function GM_addStyle(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function GM_deleteValue(name) {
		localStorage.removeItem(name);
	}

	function GM_getValue(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (value == 'false')
			return false;
		return value || defaultValue;
	}

	function GM_log(message) {
		console.log(message);
	}

	function GM_registerMenuCommand(name, funk) {
	//todo
	}

	function GM_setValue(name, value) {
		localStorage.setItem(name, value);
	}
}*/