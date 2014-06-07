// by Manda_Chuva (23893) and ferdam (69821) 11/mar/2007

// ==UserScript==
// @name           Sokker Forum Organiser
// @description    Version 0.3 - This script allows to create stickers when using the sokker foruns
// @include        http://online.sokker.org/forum.php*
// @include        http://62.233.129.98/sokker/forum.php*
// @include        http://online.sokker.org/forum_search.php*
// @include        http://62.233.129.98/sokker/forum_search.php*
// @include        http://online.sokker.org/forum_topic.php*
// @include        http://62.233.129.98/sokker/forum_topic.php*
// ==/UserScript==

/******************************************************************************/
/* Set up Sticks                                                              */
/******************************************************************************/

function draw_sticks() {
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };

var head = document.getElementsByTagName("h1");
var head_trim = head[0].childNodes[0].nodeValue.trim();
var head_text = ArrayChooseLanguage(head_trim);
var div = document.createElement("div");

/* Header's Table */
var tbl_header = document.createElement("table");
tbl_header.width = 500;
var tbl_body_header = document.createElement("tbody");
var row = document.createElement("tr");
var cell = document.createElement("td");
cell.class = "titleBlock1";
cell.appendChild(document.createTextNode(head_text[0]));
row.appendChild(cell);
tbl_body_header.appendChild(row);
tbl_header.appendChild(tbl_body_header);
div.appendChild(tbl_header);
/* Find the 1st table and insert the header table before */
var tables = document.getElementsByTagName("table");
document.body.insertBefore(div, tables[0]);

/* Stick's Table */
var body  = document.getElementsByTagName("body").item(0);
var div = document.createElement("div");
var tbl_stick = document.createElement("table");
tbl_stick.width = 500;
tbl_stick.cellSpacing = 2;
var tbl_body_stick = document.createElement("tbody");
var row = document.createElement("tr");
tot_sticks = GM_getValue('tot_sticks',0);
i=1;
j=0;
while (i<=tot_sticks) {
	delIcon = "<img src='http://www.dammous.com/sok/pic/remove.gif' border=0 width=9>";
	stick = GM_getValue('stick'+i);
	if (stick != undefined && stick != 'free_slot') {
//		stick_txt = decodeURIComponent(GM_getValue('stick_txt'+i));
		stick_txt = GM_getValue('stick_txt'+i);
		var cell_icon = document.createElement("td");
		cell_icon.width = 10;
		var cell_text = document.createElement("td");
		var a_icon = document.createElement("a");
		var a_text = document.createElement("a");
		a_icon.href = stick;
		a_icon.href += "#FO_del_topic="+i;
		a_text.href = stick;
		a_icon.innerHTML = delIcon;
		cell_icon.appendChild(a_icon);
		a_text.appendChild(document.createTextNode(stick_txt));
		cell_text.appendChild(a_text);
		if((j%3)==0) {
			var row = document.createElement("tr");
			tbl_body_stick.appendChild(row);
		}
		row.appendChild(cell_icon);
		row.appendChild(cell_text);
		tbl_body_stick.appendChild(row);
		j=j+1;
	}
	i=i+1;
}
tbl_stick.appendChild(tbl_body_stick);
div.appendChild(tbl_stick);
var tables = document.getElementsByTagName("table");
document.body.insertBefore(div, tables[1]);
}

/******************************************************************************/
/* Save Topics                                                                */
/******************************************************************************/

function save_topic() {
	var loc = location.href;
	topic_text = loc.replace("&ID_topic","").replace("&pg","").replace("new","").replace("FO_add_topic","").split("=");
	location.href = "http://online.sokker.org/forum.php?ID_forum="+topic_text[1];
	topic_orig = loc.replace(/#FO_add_topic.*/,"");
	tot_sticks = GM_getValue('tot_sticks',0);
	next_stick = tot_sticks + 1;
	i=1;
 	while(i<=tot_sticks) {
		stick = GM_getValue('stick'+i);
		if (stick == 'free_slot') {
			next_stick = i;
			GM_setValue('stick'+next_stick,topic_orig);
			GM_setValue('stick_txt'+next_stick,decodeURIComponent(topic_text[4]));
			return;
		}
		i=i+1;
	}
	GM_setValue('stick'+next_stick,topic_orig);
 	GM_setValue('stick_txt'+next_stick,decodeURIComponent(topic_text[4]));
	GM_setValue('tot_sticks',next_stick);
}

/******************************************************************************/
/* Remove Topics                                                              */
/******************************************************************************/

function del_topic() {
	var loc = location.href;
	key_idx = loc.replace("&ID_topic","").replace("&pg","").replace("new","").replace("FO_del_topic","").split("=");
	location.href = "http://online.sokker.org/forum.php?ID_forum="+key_idx[1];
	GM_setValue('stick'+key_idx[4],'free_slot');
	GM_setValue('stick_txt'+key_idx[4],'free_slot');
	return;
}

/******************************************************************************/
/* Append Add Icons                                                           */
/******************************************************************************/

function append_add_icon() {
//	var addIcon = "<img src='http://www.mobipocket.com/dev/creatorhome/img/add.gif' border=0 width=9>";
	var addIcon = "<img src='http://www.dammous.com/sok/pic/add.gif' border=0 width=9>";
	var tables = document.getElementsByTagName("table");
	var table_topic = tables[4];
	var rows = table_topic.rows;
	var lk = document.getElementsByTagName("a");
	i=0;
	j=0;
	tot_rows = rows.length;
	tot_lk = lk.length;
	while(j<tot_rows) {
		var a = document.createElement("a");
		if(lk[i].className=="frTitleNew"||lk[i].className=="frTitle") {
			row = table_topic.rows[j];
			cells = table_topic.rows[j].childNodes;
            cell5_href = cells[5].getElementsByTagName("a");
			//cell_href = 'http://online.sokker.org/'+cells[5].innerHTML.replace(/ class=.*/,"").replace("<a href=","").replace(/\"/g,'').replace(/amp;/g,"");
	  		a.href = cell5_href[0];
			a.href += "#FO_add_topic=";
			// replace(/\(\+\d+\)?/,"") => remove the info about the new messages "(+nnn)"
			// replace(/  1.*/,"") => remove page numbers "  1 2 3 4 ..." - note : there are 2 spaces just before the first "1"
			topic_text = cells[5].textContent.replace(/\(\+\d+\)?/,"").replace(/\b\b1\b.*/,"");
			a.href += encodeURIComponent(topic_text).replace(/%0A/g,"").replace(/%09/g,"").replace(/(%20)+$/g,"");
			a.innerHTML = addIcon;
			cell_icon = row.insertCell(1);
			cell_icon.width = 10;
			cell_icon.appendChild(a);	
			j=j+1;
		}
		i=i+1;
	}
}


/******************************************************************************/
/* Translation Functions                                                      */
/******************************************************************************/

function ArrayChooseLanguage(word) {
  var arrayLanguage;
  if (word == "F\u00F3rum")
    arrayLanguage = ArrayPortuguese();
  else if (word == "Foro")
    arrayLanguage = ArraySpanish();
  else
    arrayLanguage = ArrayEnglish();
  return arrayLanguage;
}

function ArrayPortuguese() {
  var arrayText = new Array();
  arrayText[0] = decodeURI("Tópicos:");
  return arrayText;
}
function ArrayEnglish() {
  var arrayText = new Array();
  arrayText[0] = "Topics:";
  return arrayText;
}
function ArraySpanish() {
  var arrayText = new Array();
  arrayText[0] = decodeURI("Tópicos Fijos");
  return arrayText;
}

(function (){
	if (location.href.match("forum_topic.php.*FO_add_topic")) {
		save_topic();
	} 
	else if (location.href.match("forum_topic.php.*FO_del_topic")) {
		del_topic();
	}
	else if (location.href.match("forum.php.*ID_forum=")) {
		append_add_icon();
		draw_sticks();
	}
	else if (location.href.match("forum.php.*ID_forum=")||location.href.match("forum_search.php")) {
		draw_sticks();
	}
})();
