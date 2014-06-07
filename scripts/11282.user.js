// --[greasemonkey meta data start]--
// title: Puretna Reddwarf Extra
// version: 2.0 beta
// created: 2007-08-01
// copyright: (c) 2007, reddwarf
// license: [url=GPL license]http://www.gnu.org/copyleft/gpl.html[/url]
// --[greasemonkey meta data stop]--
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Puretna Reddwarf Extra
// @description   Adds improvements to puretna website.
// @include       *.puretna.com/browse.php*
// @include       *.puretna.com/my.php*
// @include       *.puretna.com/wishlist.php*
// @include       *.puretna.com/dlpage.php*
// ==/UserScript==

/* added greasemonkey variables:
tna_threshold: contains filter threshold number, saved for next browse pages
tna_ratio: contains ratio of profile, saved for next browse pages
tna_history: contains last X downloaded torrents
tna_my_wishlist: contains keywords that are to be highlighted and included in filtered mode
tna_my_wl_colors: contains color for highlighted keywords
tna_my_banlist: contains keywords that are to be excluded in filtered mode
*/

var history_limit = 20; // how many torrents in your history

var savedCode1; //unfiltered table

var threshold; // filter theshold
var ratio;

var tables = document.getElementsByTagName("TABLE");

var my_banlist=new Array(); // excluded keywords list

var my_wishlist=new Array(); // included keywords list
var my_wishlist_colors=new Array(); // included keywords colors list

	/*** filters browse torrents table ***/
	function filter() {

		var row = tables[12].rows;
		
		var b = 1;
		for(var i = 0; i < 30 ; i++) {
			var seeders = row[b].cells[7].textContent;
			var name = row[b].cells[1].textContent;
			
			if(seeders < threshold && !testInclude(name)) {
				tables[12].deleteRow(b); 
				tables[12].deleteRow(b);				
			}
			if(seeders < threshold && testInclude(name)) {
				var j = testInclude2(name);
				row[b].style.backgroundColor = my_wishlist_colors[j];
				b+=2;
			}
			if(seeders >= threshold && testExclude(name) && !testInclude(name)) {
				tables[12].deleteRow(b); 
				tables[12].deleteRow(b);				
			}
			if(seeders >= threshold && testInclude(name)) {	
				var j = testInclude2(name);
				row[b].style.backgroundColor = my_wishlist_colors[j];
				b+=2;		
			}
			if(seeders >= threshold && !testInclude(name) && !testExclude(name)) {
				b+=2;
			}			
		}		
	}
		
	/*** checks if name contains a keyword from includelist ***/
	function testInclude(includetext) {	
		var a,b,c;
		for(var i=0; i< my_wishlist.length; i++) {
			a = includetext.toLowerCase().indexOf(my_wishlist[i]);
			b = my_wishlist[i].length;
			if(a >=0 && b != 0) {
				c =includetext.toLowerCase().charAt(a+b); 
				d = (/[a-z]/);
				if(c.match(d)) {
					return false;					
				}
				return true;
			}
		}
		return false;
	}
	
	/*** returns array index for color array ***/
	function testInclude2(includetext) {	
		for(var i=0; i< my_wishlist.length; i++) {
			if(my_wishlist[i].length != 0) {
				if(includetext.toLowerCase().indexOf(my_wishlist[i]) >=0) {
				return i;
				}
			}
		}		
	}
	
	/*** checks if name contains a keyword from excludelist ***/	
	function testExclude(excludetext) {	
		var a,b,c;
		for(var i=0; i< my_banlist.length; i++) {
			a = excludetext.toLowerCase().indexOf(my_banlist[i]);
			b = my_banlist[i].length;
			if(a >=0 && b != 0) {
				c=excludetext.toLowerCase().charAt(a+b);
				d=(/[a-z]/);
				if(c.match(d)) {
					return false;
				}
				return true;
			}
		}
		return false;
	}
		
	/*** reverts the torrents table to unfiltered mode ***/
	function unfilter() {
		tables[12].innerHTML = savedCode1;
	}
	
	function filterfunction(filter_pressed) {
		if(filter_pressed) {
			filter();
		} else {
			unfilter();
		}
	}
	
	/*** adds extra row below searchrow ***/
	function addSecondRow() {
		var inputElements = document.getElementsByTagName('input'); 		
		var subButton;
		
		for (var x in inputElements) { 
			el = inputElements[x]; 
			if (el.type == 'submit' && el.value == "Search!") {
				subButton = el; 
				break;
			}
		}
		
		secondRow = document.createElement('tr'); // create secondrow below search row
		secondRow.bgColor = "#0055A4"; // dark blue

		firstData = document.createElement('td');
		
		filterButton = document.createElement('input'); 		
		filterButton.type = "checkbox";
		filterButton.checked = false;
		filterButton.addEventListener('click', function() {filterfunction(filterButton.checked);}, false); //press filter button calls filterfunction
		
		firstData.appendChild(filterButton);		
		
		/******* other layout numberbox*******/
		/*filterInput = document.createElement('input'); 
		filterInput.type = "number";
		filterInput.size = 4;
		filterInput.value = threshold;
		filterInput.step = 10;
		filterInput.min = 0;
		filterInput.max = 150;
		filterInput.addEventListener('change', function() {changeThreshold(filterInput.value);}, false); */
		
		/******* current layout textbox*******/
		filterInput = document.createElement('input');
		filterInput.type = "text";
		filterInput.size = 2;
		filterInput.value = threshold;
		filterInput.addEventListener('change', function() {changeThreshold(filterInput.value);}, false); 
		
		firstData.appendChild(filterInput);
		
		secondRow.appendChild(firstData);
		
		secondData = document.createElement('td');	
		
		openButton = document.createElement('input');
		openButton.type = "button";		
		openButton.value = "Open all detail pages!";	
		openButton.addEventListener('click', openAllDetailPages, false); 
		
		secondData.appendChild(openButton);
		
		secondRow.appendChild(secondData);
		
		thirdData = document.createElement('td');
		thirdData.id = 'threshold_cell';
		thirdData.innerHTML = "Fetching...";
		
		secondRow.appendChild(thirdData);
		subButton.parentNode.parentNode.parentNode.appendChild(secondRow); 
		
		var threshold_cell = document.getElementById('threshold_cell');
		threshold_cell.innerHTML = GM_getValue('tna_ratio');
	}	
	
	/*** opens all detailpages on browse page ***/
	function openAllDetailPages() { 
		var links = document.getElementsByTagName('A'); 
		var linkcount = 0;
		for (i=0; i < links.length; i++) { 
			var a = links[i];

			if (a.href.match(/\/details.php\?id=\d*$/)) { 
					linkcount++;
			} 
		}
	
		var where_to = confirm("Do you really want to open these " + linkcount + " pages?");
			
		if (!where_to) return;
 
		for (i=0; i < links.length; i++) { 
			var a = links[i];

			if (a.href.match(/\/details.php\?id=\d*$/)) { 
					window.open(a.href);
			} 
		}
	}	
	
	/*** updates filter theshold when it is changed in the inputbox ***/
	function changeThreshold(threshold_value) {
		var blankRE=/^\s*$/;
		if (isNaN(threshold_value) || (blankRE.test(threshold_value))) { // not a number
			threshold = 0;
			GM_setValue("tna_threshold", 0);			
		}
		else {
			threshold = parseInt(threshold_value);
			GM_setValue("tna_threshold", threshold);			
		}	
	}
	
	/*** fetches your ratio from profile page ***/
	function updateRatio() {
		var profile_url = "http://www.puretna.com/my.php";

		hidden_iframe = document.createElement('iframe');
		hidden_iframe.style.width = "0px";
		hidden_iframe.style.height = "0px"; 
		hidden_iframe.style.border = "0px"; 
		hidden_iframe.name = "profile";
		hidden_iframe.id = "profile";
		
		document.body.appendChild(hidden_iframe);
		
		profile_frame = document.getElementById("profile");

		GM_xmlhttpRequest({ 
			method: 'GET', 
			url: profile_url, 
			onreadystatechange: function(responseDetails) { 
				if (responseDetails.readyState==4) {
					profile_frame.innerHTML = responseDetails.responseText;
					parseRatio(profile_frame);
				}
			}
		});
	}
	
	/*** parses ratio from profile page ***/
	function parseRatio(value) {
		var threshold_cell = document.getElementById('threshold_cell');
		var your_ratio = value.innerHTML.match(/\d\.\d\d\d/);
		
		if(your_ratio>1) {
			threshold_cell.innerHTML = '<td colspan=2 align="left"  bgcolor=#00FF00><font color=#FFFFFF><b>'+your_ratio+'</b></font></td>';
		}
		if(your_ratio<1) {
			threshold_cell.innerHTML = '<td colspan=2 align="left"  bgcolor=#FF0000><font color=#FFFFFF><b>'+your_ratio+'</b></font></td>';		
		}
		GM_setValue("tna_ratio", threshold_cell.innerHTML);		
	}
	
	/*** initialise the threshold for filtering ***/
	function initThreshold() {
		get_threshold_value = GM_getValue("tna_threshold");
		if(get_threshold_value != undefined) {	
			threshold = parseInt(get_threshold_value); 
			return;
		}
		threshold = 100;
		GM_setValue("tna_threshold", 100);	
	}
	
	/*** initialise the ratio field ***/	
	function initRatio() {
		var your_ratio = GM_getValue("tna_ratio");
		current_url = document.documentURI;
		if(current_url.indexOf("page=") > -1) {
			if(your_ratio == undefined) {	
				updateRatio();
				return;
				}
			return;
		}
		updateRatio();
	}	
	
	/***	adds downloaded torrent to your history ***/
	function addToHistory(name, id) {
	
		var new_download = '<A STYLE="text-decoration: none"; color: #ffffff href="http://www.puretna.com/details.php?id='+id+'"><B><U>'+name+'</U></B></A>';
		
		var last_ten_torrents_string = GM_getValue("tna_history");
		
		if(last_ten_torrents_string != 'null') {
			last_ten_torrents_string += ("@@@" + new_download);
		}		

		if(last_ten_torrents_string == 'null') {
			last_ten_torrents_string = new_download;
		}
		
		var history_array = last_ten_torrents_string.split("@@@");
		var history_count = history_array.length;
		var new_history_array = '';
		if(last_ten_torrents_string != 'null' && history_count > history_limit) {
			new_history_array += history_array[1];
			for(var i = 2; i < history_count; i++) {
				new_history_array += '@@@' + history_array[i];
			}
			last_ten_torrents_string = new_history_array;
		}
		
		GM_setValue("tna_history", last_ten_torrents_string);	
	}
	
	/*** adds history table to the profile page ***/
	function addHistoryTorrents() {
		var history = getHistoryTorrents();
	
		deleteButton = document.createElement('input');
		deleteButton.type = "button";		
		deleteButton.value = "Delete History!";	
		deleteButton.addEventListener('click', function() {deleteHistory(history.length);}, false);		

		if(history!='null') {
			var x = tables[4].insertRow(5);
			var y=x.insertCell(0)
			y.setAttribute('align', 'right');
			y.setAttribute('colspan', 2);
			y.appendChild(deleteButton);
			
			for (var i = 0; i < history.length; i++) {
				var x = tables[4].insertRow(i+6);
				x.innerHTML = '<td colspan=2 class=rowhead align="right">'+history[i]+'</td>';		
			}
		}
	}
	
	/*** deletes history ***/
	function deleteHistory(valuei) {
		var where_to = confirm('Delete history of last '+ valuei +' torrents?');
		if (!where_to) return;
		GM_setValue("tna_history", "null");
	}
	
	/*** retrieves history ***/
	function getHistoryTorrents() {
		var history = GM_getValue("tna_history");
		if(history != undefined) {
			return history.split("@@@");
		}
		return null;		
	}
	
	/*** retrieves excluded keywords list ***/
	function getBanlist() {
		var banlist = GM_getValue("tna_my_banlist");
		if(banlist != undefined) {
			return banlist.split("@@@");
		}
		return new Array();		
	}
	
	/*** retrieves included keywords list ***/
	function getWishlist() {
		var wishlist = GM_getValue("tna_my_wishlist");
		if(wishlist != undefined) {
			return wishlist.split("@@@");
		}
		return new Array();		
	}
	
	/*** retrieves included keywords colors list ***/	
	function getWishlistColors() {
		var wishlistcolors = GM_getValue("tna_my_wl_colors");
		if(wishlistcolors != undefined) {
			return wishlistcolors.split("@@@");
		}
		return new Array();		
	}	
	
	/*** adds keyword to included list ***/
	function addIncludedKeyword() {
		var row = document.getElementsByTagName('input');
		var new_download = row[10].value;
		var new_color = "";
		
		var column = document.getElementsByTagName('select');
		for(var i = 0; i < column[1].childNodes.length; i++) {
			if(column[1].childNodes[i].selected) {
				new_color = column[1].childNodes[i].value;
			}
		}	
		
		var asd = GM_getValue("tna_my_wishlist");
		var asd1 = GM_getValue("tna_my_wl_colors");
		
		alert('Added '+new_download+' to list');
		
		if(asd != 'null') {
			new_download = "@@@" + new_download;
			asd += new_download;		
		}
		
		if(asd1 != 'null') {
			new_color = "@@@" + new_color;
			asd1 += new_color;		
		}
		
		if(asd == 'null') {
			asd = new_download;
		}
		if(asd1 == 'null') {
			asd1 = new_color;
		}
				
		GM_setValue("tna_my_wishlist", asd);
		GM_setValue("tna_my_wl_colors", asd1);	
	}

	/*** adds keyword to excluded list ***/	
	function addExcludedKeyword() {

		var row = document.getElementsByTagName('input');
		var new_download = row[6].value;
		
		var asd = GM_getValue("tna_my_banlist");
		
		alert('Added '+new_download+' to list');
		
		if(asd != 'null') {
			new_download = "@@@" + new_download;
			asd += new_download;		
		}
		
		if(asd == 'null') {
			asd = new_download;
		}
		GM_setValue("tna_my_banlist", asd);	
	}
	
	/*** clears excluded list ***/
	function clearExcludedList() {
		var where_to = confirm("Delete list?");
		if (!where_to) return;
		GM_setValue("tna_my_banlist", 'null');		
	}
	
	/*** clears included list ***/
	function clearIncludedList() {
		var where_to = confirm("Delete list?");
		if (!where_to) return;
		GM_setValue("tna_my_wishlist", 'null');		
		GM_setValue("tna_my_wl_colors", 'null');		
	}
	
	/*** removes keyword and color from included list***/
	function removeIncludedKeyword() {
		var where_to = confirm("Delete selected keyword?");
		if (!where_to) return;
		var row = document.getElementsByTagName('select');
		
		for(var i = 0; i < row[2].length; i++) {
			if(row[2].childNodes[i].selected) {
				removeInclWord(i);
				removeInclColor(i);
				return;
			}
		}
	}
	
	/*** subfunction to remove keyword from included list**/
	function removeInclWord(valuei) {
		var asd = getWishlist();
		var def = "";
		
		if(valuei != 0) {
			def += asd[0];
		}
				
		for (var i = 1; i < asd.length; i++) {
			if(valuei !=0) {
				if(i != valuei) {
					def += "@@@";
					def += asd[i];
				}
			}
			if(valuei == 0) {
				if(i == 1) {
					def += asd[1];
				}
				if(i != 1) {
					def += "@@@";
					def += asd[i];
				}
			}			
		}
		if(valuei == 0 && asd.length == 1) {
			GM_setValue("tna_my_wishlist", 'null');
			return;
		}
		GM_setValue("tna_my_wishlist", def);	
	}

	/*** subfunction to remove color from included list**/
	function removeInclColor(valuei) {
		var asd = getWishlistColors(); // asd gesplit
		var def = "";
		
		if(valuei != 0) {
			def += asd[0];
		}
				
		for (var i = 1; i < asd.length; i++) {
			if(valuei !=0) {
				if(i != valuei) {
					def += "@@@";
					def += asd[i];
				}
			}
			if(valuei == 0) {
				if(i == 1) {
					def += asd[1];
				}
				if(i != 1) {
					def += "@@@";
					def += asd[i];
				}
			}			
		}
		if(valuei == 0 && asd.length == 1) {
			GM_setValue("tna_my_wl_colors", 'null');
			return;
		}
		GM_setValue("tna_my_wl_colors", def);	
	}
	
	/*** removes keyword from excluded list***/
	function removeExcludedKeyword() {
		var where_to = confirm("Delete selected keyword?");
		if (!where_to) return;
	
		var row = document.getElementsByTagName('option');
		
		for(var i = 0; i < row.length; i++) {
			if(row[i].selected) {
				remove(i);
				return;
			}
		}
	}
	
	/*** subfunction to remove keyword from excluded list**/	
	function remove(valuei) {
		var asd = getBanlist();
		var def = "";
		
		if(valuei != 0) {
			def += asd[0];
		}
				
		for (var i = 1; i < asd.length; i++) {
			if(valuei !=0) {
				if(i != valuei) {
					def += "@@@";
					def += asd[i];
				}
			}
			if(valuei == 0) {
				if(i == 1) {
					def += asd[1];
				}
				if(i != 1) {
					def += "@@@";
					def += asd[i];
				}
			}			
		}
		if(valuei == 0 && asd.length == 1) {
			GM_setValue("tna_my_banlist", 'null');
			return;
		}
		GM_setValue("tna_my_banlist", def);	
	}
	
	/*** initialise keywords lists ***/
	function initKeywordsList() {
		my_banlist = getBanlist();
		my_wishlist = getWishlist();
		my_wishlist_colors = getWishlistColors();
	}
	
	/*** adds user interface for managing keywords to the wishlist page ***/
	function addWishlist() {
		
		var table_cells = document.getElementsByTagName('td');

		var banlist = getBanlist();
		var wishlist = getWishlist();
		var wishlist_colors = getWishlistColors();
		
		/*** adds original keywords form to new table ***/
		var tbl_cell1 = document.createElement('td');
		var new_table = document.createElement('table');
		var tbl_row = document.createElement('tr');
		tbl_cell1.appendChild(table_cells[31].childNodes[3]);
		tbl_row.appendChild(tbl_cell1);

		var element1 = document.createElement('td');
		element1.innerHTML = '<b>Add to exclude list</b><BR><BR>';
		
		inputExclText = document.createElement('input'); 		
		inputExclText.type = "text";
		inputExclText.value = "";
		
		inputAddButton1 = document.createElement('input'); 		
		inputAddButton1.type = "button";
		inputAddButton1.value = "Add keyword";
		inputAddButton1.addEventListener('click', function() {addExcludedKeyword();}, false);		
		
		element1.appendChild(inputExclText);
		element1.appendChild(inputAddButton1);

		text_fragment1 = document.createElement('b'); 		
		text_fragment1.innerHTML = '<BR><BR><b>Exclude list:</b><BR><BR>';
		
		element1.appendChild(text_fragment1);
		
		select1 = document.createElement('select');
		select1.id = 'excl_list';
		
		if(banlist != 'null') {
			for (var i = 0; i < banlist.length; i++) {
				option1 = document.createElement('option');
				option1.value = banlist[i];
				option1.text = banlist[i];
				select1.appendChild(option1);
			}
		}
		
		element1.appendChild(select1);
		
		inputDelButton1 = document.createElement('input'); 		
		inputDelButton1.type = "button";
		inputDelButton1.value = "Delete keyword";
		inputDelButton1.addEventListener('click', function() {removeExcludedKeyword();}, false);		
		
		inputDelButton2 = document.createElement('input'); 		
		inputDelButton2.type = "button";
		inputDelButton2.value = "Clear exclude list";
		inputDelButton2.addEventListener('click', function() {clearExcludedList();}, false);		
		
		element1.appendChild(inputDelButton1);
		element1.appendChild(inputDelButton2);
		
		tbl_row.appendChild(element1);
		
		
		element2 = document.createElement('td');
		element2.innerHTML = '<b>Add to include list</b><BR><BR>';
		
		inputInclText = document.createElement('input');
		inputInclText.type = "text";
		inputInclText.value = "";

		select2 = document.createElement('select');

		var option_colorlist ="";
		option_colorlist += '<option value="#5555FF" style="background-color: #5555FF;color: #FFFFFF;">Pure TnA blue</option>';
		option_colorlist += '<option value="#969BA8" style="background-color: #969BA8;color: #FFFFFF;">Pure TnA grey</option>';
		option_colorlist += '<option value="#000000" style="background-color: Black;color: #FFFFFF;">Black</option>';
		option_colorlist += '<option value="#808080" style="background-color: Gray;">Gray</option>';
		option_colorlist += '<option value="#A9A9A9" style="background-color: DarkGray;">DarkGray</option>';
		option_colorlist += '<option value="#D3D3D3" style="background-color: LightGrey;">LightGray</option>';
		option_colorlist += '<option value="#FFFFFF" style="background-color: White;">White</option>';
		option_colorlist += '<option value="#7FFFD4" style="background-color: Aquamarine;">Aquamarine</option>';
		option_colorlist += '<option value="#0000FF" style="background-color: Blue;color: #FFFFFF;">Blue</option>';
		option_colorlist += '<option value="#000080" style="background-color: Navy;color: #FFFFFF;">Navy</option>';
		option_colorlist += '<option value="#800080" style="background-color: Purple;color: #FFFFFF;">Purple</option>';
		option_colorlist += '<option value="#FF1493" style="background-color: DeepPink;">DeepPink</option>';
		option_colorlist += '<option value="#EE82EE" style="background-color: Violet;">Violet</option>';
		option_colorlist += '<option value="#FFC0CB" style="background-color: Pink;">Pink</option>';
		option_colorlist += '<option value="#006400" style="background-color: DarkGreen;color: #FFFFFF;">DarkGreen</option>';
		option_colorlist += '<option value="#008000" style="background-color: Green;color: #FFFFFF;">Green</option>';
		option_colorlist += '<option value="#9ACD32" style="background-color: YellowGreen;">YellowGreen</option>';
		option_colorlist += '<option value="#FFFF00" style="background-color: Yellow;">Yellow</option>';
		option_colorlist += '<option value="#FFA500" style="background-color: Orange;">Orange</option>';
		option_colorlist += '<option value="#FF0000" style="background-color: Red;">Red</option>';
		option_colorlist += '<option value="#A52A2A" style="background-color: Brown;">Brown</option>';
		option_colorlist += '<option value="#DEB887" style="background-color: BurlyWood;">BurlyWood</option>';
		option_colorlist += '<option value="#F5F5DC" style="background-color: Beige;">Beige</option>';

		select2.innerHTML = option_colorlist;
		
		inputAddButton2 = document.createElement('input'); 		
		inputAddButton2.type = "button";
		inputAddButton2.value = "Add keyword";
		inputAddButton2.addEventListener('click', function() {addIncludedKeyword();}, false);				
		
		element2.appendChild(inputInclText);
		element2.appendChild(select2);
		element2.appendChild(inputAddButton2);
		
		text_fragment2 = document.createElement('b'); 		
		text_fragment2.innerHTML = '<BR><BR><b>Include list:</b><BR><BR>';
		
		element2.appendChild(text_fragment2);		

		select3 = document.createElement('select');
		select3.id = 'incl_list';
		
		if((wishlist_colors != 'null') && (wishlist != 'null')) {
			for (var i = 0; i < wishlist.length; i++) {
				option1 = document.createElement('option');
				option1.value = wishlist[i];
				option1.text = wishlist[i];
				option1.style.backgroundColor = wishlist_colors[i];
				select3.appendChild(option1);
			}
		}
		
		element2.appendChild(select3);

		inputDelButton3 = document.createElement('input'); 		
		inputDelButton3.type = "button";
		inputDelButton3.value = "Delete keyword";
		inputDelButton3.addEventListener('click', function() {removeIncludedKeyword();}, false);		
		
		inputDelButton4 = document.createElement('input'); 		
		inputDelButton4.type = "button";
		inputDelButton4.value = "Clear include list";
		inputDelButton4.addEventListener('click', function() {clearIncludedList();}, false);		
		
		element2.appendChild(inputDelButton3);
		element2.appendChild(inputDelButton4);		
		
		tbl_row.appendChild(element2);
		
		new_table.appendChild(tbl_row);
		table_cells[31].replaceChild(new_table, table_cells[31].childNodes[3]);
	}
	
	/*** adds functionality to add a torrent to the history ***/
	function addToDownloadNowLink() {
		var table_cell = document.getElementsByTagName('td');
		var filename = table_cell[32].textContent;
		
		var window_url = document.documentURI;
		var id = window_url.substring(window_url.length-6);
		
		var formElements = document.getElementsByTagName('form');
		
		downloadButton = document.createElement('input'); 		
		downloadButton.type = "submit";
		downloadButton.value = "Download Now";
		downloadButton.addEventListener('click', function() {addToHistory(filename, id);}, false);

		formElements[0].replaceChild(downloadButton,formElements[0].childNodes[3])
	}
	
	function main() {
		var url1 = ".puretna.com/browse.php";
		var url2 = ".puretna.com/my.php";
		var url3 = ".puretna.com/wishlist.php";
		var url4 = ".puretna.com/dlpage.php";
		
		if(document.documentURI.indexOf(url1) > -1) {		
			initThreshold();
			initRatio();
			initKeywordsList();
		
			addSecondRow();	
		
			savedCode1 = tables[12].innerHTML;
			
		}
		
		if(document.documentURI.indexOf(url2) > -1) {
			addHistoryTorrents();		
		}
		
		if(document.documentURI.indexOf(url3) > -1) {
			addWishlist();
		}
		
		if(document.documentURI.indexOf(url4) > -1) {
			addToDownloadNowLink();
		}	
	}
	
	main();