// ==UserScript==
// @name                Bytes Menu Inserter
// @description	        A script to insert the navigation menu on bytes.com on pages that doesn't have one.
// @include		http://bytes.com/*
// @include		http://www.bytes.com/*
// ==/UserScript==

var strMenu = '<img src="/images/sidecolumn.gif" height="1px" border="0" style="margin: 0px; padding: 0px;">'+ //removed width attribute from img
			'<div class="navbox">'+
			'	<h3>/bytes/development</h3>'+
			'	<ul class="navbox_list">'+
			'		<li><a href="/topic/algorithms/">algorithms</a></li>'+
			'		<li><a href="/topic/asp-classic/">asp</a></li>'+
			'		<li><a href="/topic/asp-net/">asp.net</a></li>'+
			'		<li><a href="/topic/c/">c / c++</a></li>'+
			'		<li><a href="/topic/coldfusion/">coldfusion</a></li>'+
			'		<li><a href="/topic/c-sharp/">c#</a></li>'+
			'		<li><a href="/topic/flash/">flash</a></li>'+
			'		<li><a href="/topic/html-css/">html/css</a></li>'+
			'		<li><a href="/topic/java/">java</a></li>'+
			'		<li><a href="/topic/javascript/">javascript</a></li>'+
			'		<li><a href="/topic/mobile-development/">mobile dev</a></li>'+
			'		<li><a href="/topic/net/">.net</a></li>'+
			'		<li><a href="/topic/perl/">perl</a></li>'+
			'		<li><a href="/topic/php/">php</a></li>'+
			'		<li><a href="/topic/python/">python</a></li>'+
			'		<li><a href="/topic/ruby/">ruby</a></li>'+
			'		<li><a href="/topic/software-development/">software dev</a></li>'+
			'		<li><a href="/topic/visual-basic-net/">vb.net</a></li>'+
			'		<li><a href="/topic/visual-basic/">visual basic</a></li>'+
			'		<li><a href="/topic/xaml">xaml / wpf</a></li>'+
			'		<li><a href="/topic/xml/">xml</a></li>'+
			'	</ul>'+
			'	<div style="clear:both;"></div>'+
			'</div>'+
			'<div class="navbox">'+
			'	<h3>/bytes/it</h3>'+
			'	<ul class="navbox_list">'+
			'		<li><a href="/topic/access/">access</a></li>'+
			'		<li><a href="/topic/apache/">apache</a></li>'+
			'		<li><a href="/topic/careers/">careers</a></li>'+
			'		<li><a href="/topic/cms/">cms</a></li>'+
			'		<li><a href="/topic/db2/">db2</a></li>'+
			'		<li><a href="/topic/iis/">iis</a></li>'+
			'		<li><a href="/topic/macosx/">macosx</a></li>'+
			'		<li><a href="/topic/mysql/">mysql</a></li>'+
			'		<li><a href="/topic/networking/">networking</a></li>'+
			'		<li><a href="/topic/oracle/">oracle</a></li>'+
			'		<li><a href="/topic/postgresql/">postgresql</a></li>'+
			'		<li><a href="/topic/sql-server/">sql server</a></li>'+
			'		<li><a href="/topic/unix/">unix</a></li>'+
			'		<li><a href="/topic/windows/">windows</a></li>'+
			'	</ul>'+
			'	<div style="clear:both;"></div>'+
			'</div>'+
			'<div class="navbox">'+
			'	<h3>/bytes/other</h3>'+
			'	<ul class="navbox_list">'+
			'		<li><a href="/topic/misc/">misc</a></li>'+
			'	</ul>'+
			'	<div style="clear:both;"></div>'+
			'</div>'+
			'<div class="navbox">'+
			'	<h3><a href="/forums/">/bytes/forums</a></h3>'+
			'	<ul class="navbox_list">'+
			'		<li><a href="/forums/lounge/">lounge/cafe</a></li>'+
			'		<li><a href="/forums/mental-stamina/">puzzles</a></li>'+ //mental stamina is too long
			'		<li><a href="/forums/feedback/">feedback</a></li>'+
			'		<li><a href="/forums/milestones/">milestones</a></li>'+
			'		<li><a href="/forums/writing-room/">writing room</a></li>'+
			'	</ul>'+
			'	<div style="clear:both;"></div>'+
			'</div>'+
			'<div class="navbox">'+
			'	<h3>/bytes/account</h3>'+
			'	<ul class="navbox_list">'+
			'		<li><a href="/subscription.php?do=viewsubscription">subscriptions</a></li>'+
			'		<li><a href="/private.php">inbox</a></li>'+
			'		<li><a href="/profile.php?do=editoptions">options</a></li>'+
			'	</ul>'+
			'	<div style="clear:both;"></div>'+
			'</div>';

function needsMenu() {
	var arCells=document.getElementsByClassName("navbox");
	if (0 < arCells.length) {
		return false;
	}
	return true;
}

function removeMenu() {
	var arCells=document.getElementsByClassName("navbox");
	if (arCells.length == 0) {
		return;
	}
	var menuCell = arCells[0].parentNode;
	menuCell.innerHTML = '';
	menuCell.width = '0px';
}

function getMaintable() {
	var maintable = document.getElementsByClassName("maintable")[0]; //if there's no maintable the script will probably crash, but pages without one probably don't need it anyway
	return maintable;
}

function changeContentWidth() {
	if (GM_getValue("bytes_popupmenu")=="true") {
	//i tried making the community forums look like the rest in normal menu mode, but someone forgot to give maintable an ending tag on those pages
	
	//	var maintable = getMaintable();
	//	var contenttable = maintable.getElementsByTagName("table")[0];
	//	contenttable.width = "625px";
	//	var contentcel = maintable.getElementsByTagName("td")[0];
	//	contentcel.width = "625px";
	//} else {
		var maintable = getMaintable();
		var contenttable = maintable.getElementsByTagName("table")[0];
		contenttable.width = "100%";
		
		//(this piece of code comes from Dormilich's script to adjust pagewidth (and the rest of this function is based on it as well), so kudos to him for that)
		// get the code blocks and widen them too
		//var code_box = new_size - 100 + "px";
		var code = document.getElementsByClassName('codeContent');
		var k = code.length;
		for (var j=0; j<k; j++)	{ // set box size (enclosed in table)
			code[j].style.width = "800px"; //a little change here compared to Dorm's original
			code[j].style.maxWidth = "800px" //Atli apparently worked on this stuff too? Well, thanks to anyone who contributed in any way.
		}
	}
}

function menuPopOut() {
	var menuDiv = document.getElementById("bytes_menu");
	menuDiv.style.right = "0px";
}

function menuPopIn() {
	var menuDiv = document.getElementById("bytes_menu");
	menuDiv.style.right = "-250px";
}

function toggleMenu() {
	if (GM_getValue("bytes_popupmenu")=="true") {
		GM_setValue("bytes_popupmenu","false");
	} else {
		GM_setValue("bytes_popupmenu","true");
	}
}

GM_registerMenuCommand("Toggle menu style", toggleMenu);
window.addEventListener("load", changeContentWidth, false);

if (GM_getValue("bytes_popupmenu")!="true") {
	if (needsMenu()) {
		var bmn_td = document.createElement('td');
		//bmn_td.width = '300px';
		bmn_td.valign = 'top';
		bmn_td.style.verticalAlign = 'top';
		bmn_td.innerHTML = '<div id="bytes_menu">'+strMenu+'</div>';
		
		var maintable = getMaintable();
		maintable.rows[0].appendChild(bmn_td);	
	}
} else {
	removeMenu() //remove the already existing menu
	var bmn_div = document.createElement('td');
	//bmn_div.height = "1000px";
	bmn_div.width = "300px";
	bmn_div.innerHTML = strMenu;
	bmn_div.id = "bytes_menu";
	bmn_div.style.backgroundColor = "#d0d0d0";
	bmn_div.style.position = "fixed";
	bmn_div.style.right = "-250px";
	bmn_div.style.top = "75px";
	bmn_div.addEventListener("mouseover", menuPopOut , true);
	bmn_div.addEventListener("mouseout", menuPopIn , true);
	
	document.body.appendChild(bmn_div);
}
