// ==UserScript==
// @name           USOS Enhancer
// @namespace      http://arkbow.fm.interia.pl/main.html
// @description    Add some useful tricks to USOSweb
// @include        https://*usosweb.*.edu.pl/*
// @version        0.1.6
// @author         (c) Arkadiusz Bokowy
// ==/UserScript==


var USOSEnhancer = {
// size of displayed photos
photo_height: 125/2,
photo_width: 100/2,

// listing table information
listing_table: [0, 0], //[name, type: 1 - normal; 2 - board]

menu_divID: 'eXtraMenu',
menu_hided: true,

my_cookie: 'js_eXtras_', //with added id
menu_ids: ['uem_fp', 'uem_sos'], //menu's items IDs (UsosEnhancerMenu_*)
menu_options: [false, false], //fetch_photos, hide_no_student
menu_options_txt: ['fetch photos', 'show only students'],
engine_stat: [false, false], //engine status for menu_options

get_userID: function(str) {
	return str.match(/os_id:\d+/);
},

// it is used in simply search mode
get_usertable_tbody: function(maindiv) {
	var grey_class = maindiv.getElementsByClassName('grey');
	if(grey_class.length != 2) return null;

	return grey_class[1].tBodies[0];
},

get_usertable_tbody_boardstyle: function(maindiv) {
	var grey_class = maindiv.getElementsByClassName('wrnav');
	if(grey_class.length != 1) return null;

	// test if this table contains userID link in 3rd row (userlisting test)
	var a3 = grey_class[0].tBodies[0].rows[2].getElementsByTagName('a');
	if(USOSEnhancer.get_userID(a3[a3.length - 1].href) == null)
		return null;

	return grey_class[0].tBodies[0];
},

// style info - table managing:
// 1 - standard view
// 2 - board view
insert_photo: function(table, style) {
	for (xrow in table.rows) {
		var row = table.rows[xrow];
		if(!row) continue; //remove error msg

		// do not destroy header and footer in table
		if(style == 2 && (xrow == 0 || xrow == table.rows.length - 1)){
			row.cells[0].colSpan = row.cells[0].colSpan + 1;
			continue;}

		if(style == 2 && xrow == 1) { //add header info for photo
			var info_cell = document.createElement('th');
			info_cell.className = 'wrnavbarheader';
			info_cell.innerHTML = 'Zdjęcie';
			row.insertBefore(info_cell, row.cells[0]);
			continue;
		}

		var row_links = row.getElementsByTagName('a');
		// last <a> in row should be good one
		var user_page = row_links[row_links.length - 1].href;
		var userID = USOSEnhancer.get_userID(user_page);

		// we dont want to see NULL photo here :)
		if(userID == null) continue;

		var photo = new Image(USOSEnhancer.photo_width, USOSEnhancer.photo_height);
		photo.src = 'kontroler.php?_action=actionx:dodatki/' +
				'zdj_do_legitymacji/pokazZdjecie(' + userID + ')';

		// insert photo cell before user_name_cell
		var photo_cell = row.insertCell(style == 1 ? 1 : 0);
		photo_cell.appendChild(photo);
	}
},

// check if photo is loaded -> if not show PRIV message
check_photos: function(table) {
	for (xrow in table.rows) {
		var row = table.rows[xrow];
		if(!row) continue; //remove error msg

		var photo_cell = row.getElementsByTagName('img')[0];
		if(!photo_cell) continue; //remove error msg

		if(photo_cell.complete == false)
			photo_cell.innerHTML = '<center><b>PRIV</b></center>';
	}
},

// remove all except students from listing
disply_students_only: function(table, style) {
	var del_count = 0;
	for (xrow in table.rows) {
		var row = table.rows[xrow - del_count];
		if(row.cells.length < 4) continue;

		// do not destroy header in table view
		if(style == 2 && xrow == 1) continue;

		// user type and status is in 3rd cell (without photo :))
		if(USOSEnhancer.engine_stat[0] == false)
			var user_info = row.cells[2].innerHTML;
		else //we fetch photos before -> get next cell (4th)
			var user_info = row.cells[3].innerHTML;

		if(user_info.match(/^\s*student/) == null){
			table.deleteRow(xrow - del_count);
			del_count += 1;}
	}
},

insert_our_menu: function(mbar_class) {
	var menu_bar = document.getElementsByClassName(mbar_class)[0]
	menu_bar.innerHTML += '| <a class="" href="javascript: void(0)">eXtras</a>'

	// register click event to our menu_link
	menu_links = menu_bar.getElementsByTagName('a');
	var our_link = menu_links[menu_links.length - 1];
	our_link.addEventListener('click', USOSEnhancer.show_menu, false);

	// create our pop_menu
	var pop_menu = document.createElement('div');
	pop_menu.id = USOSEnhancer.menu_divID;
	pop_menu.style.cssText = 'left:0px; bottom:0px; padding:2px; z-index:101; \
			position:fixed; display:none; color:#000; text-align: left;';
	menu_bar.appendChild(pop_menu);

	// create menu items divs
	for(var x = 0; x < USOSEnhancer.menu_ids.length; x++)
		pop_menu.innerHTML += '<div id="' + USOSEnhancer.menu_ids[x] + '" \
				style="cursor: pointer;"></div>';

	USOSEnhancer.update_our_menu();

	// register click event for our menu items
	var dv = pop_menu.getElementsByTagName('div');
	for(var x = 0; x < dv.length; x++)
		dv[x].addEventListener('click', USOSEnhancer.menu_event, false);
},

// update our menu labels (keep +/- indicators up to date)
update_our_menu: function() {
	var pop_menu = document.getElementById(USOSEnhancer.menu_divID);
	var dv = pop_menu.getElementsByTagName('div');

	// update local variable and menu text for all entries
	for (x in dv){
		if(document.cookie.indexOf(USOSEnhancer.my_cookie +
				USOSEnhancer.menu_ids[x] + '=1') != -1){
			USOSEnhancer.menu_options[x] = true;
			dv[x].innerHTML = '+ ';}
		else{
			USOSEnhancer.menu_options[x] = false;
			dv[x].innerHTML = '- ';}
		dv[x].innerHTML += USOSEnhancer.menu_options_txt[x];}
},

// our menu event listener
menu_event: function() {
	if(this.innerHTML.match(/^\+ /) != null) //true when option is "checked"
		document.cookie=USOSEnhancer.my_cookie + this.id + '=0; path=/';
	else document.cookie=USOSEnhancer.my_cookie + this.id + '=1; path=/';

	USOSEnhancer.update_our_menu();
	USOSEnhancer.enhancer_engine();
},

// show/hide our menu items
show_menu: function() {
	var menu_div = document.getElementById(USOSEnhancer.menu_divID);

	if(USOSEnhancer.menu_hided == true){
		menu_div.style.display = 'block'
		USOSEnhancer.menu_hided = false;}
	else{
		menu_div.style.display = 'none'
		USOSEnhancer.menu_hided = true;}
},

enhancer_engine: function() {
	// only_students module
	if(USOSEnhancer.menu_options[1] == true &&
			USOSEnhancer.engine_stat[1] == false){
		USOSEnhancer.engine_stat[1] = true;
		USOSEnhancer.disply_students_only(USOSEnhancer.listing_table[0],
				USOSEnhancer.listing_table[1]);}

	// fetch_photos module
	if(USOSEnhancer.menu_options[0] == true &&
			USOSEnhancer.engine_stat[0] == false){
		USOSEnhancer.engine_stat[0] = true;
		USOSEnhancer.insert_photo(USOSEnhancer.listing_table[0],
				USOSEnhancer.listing_table[1]);
		USOSEnhancer.check_photos(USOSEnhancer.listing_table[0]);}
},

init: function() {
	// insert our menu to usos menu bar
	USOSEnhancer.insert_our_menu('topmenu');

	var maindiv = document.getElementById('maindiv');

	// get table body (for "normal" search display)
	var table_n = USOSEnhancer.get_usertable_tbody(maindiv);
	// get table body (for "board" search display)
	var table_b = USOSEnhancer.get_usertable_tbody_boardstyle(maindiv);

	if(table_b != null){
		USOSEnhancer.listing_table[0] = table_b;
		USOSEnhancer.listing_table[1] = 2;}
	else if(table_n != null){
		USOSEnhancer.listing_table[0] = table_n;
		USOSEnhancer.listing_table[1] = 1;}

	USOSEnhancer.enhancer_engine();
}
}

USOSEnhancer.init();
