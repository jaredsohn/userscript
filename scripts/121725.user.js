// ==UserScript==
// @name           ignorechatter
// @namespace      www.jedipedia.net/wiki/Benutzer:Deus_Figendi
// @description    erlaubt es Chatter zu ignorieren
// @include        http://webchat.quakenet.org/*
// ==/UserScript==


function hide_lines() {
	
	
	
	if (document.getElementsByClassName("lastpos")[0]) {
		var line2display = document.getElementsByClassName("lastpos")[0];
	} else {
		var line2display = document.getElementsByClassName("colourline")[0];
	}
	if (line2display) {
		var ignored_nicks = GM_getValue('ignoredNicks','-').split(',');
		var is_ignored = false;
		var this_nickname = 'niiiiiiiiiiiiimand';
		var i = 0;
		
		while (line2display) {
			if (line2display.getElementsByClassName("hyperlink-whois").length > 0) {
				if (line2display.classList.contains("colourline")) {
					this_nickname = line2display.getElementsByClassName("hyperlink-whois")[0].firstChild.data;
				
					is_ignored = false;
					for (i = 0; i < ignored_nicks.length; i++) {
						if (ignored_nicks[i] == this_nickname) {
							is_ignored=true;
						}
					}			
					if (is_ignored) {
						line2display.parentNode.removeChild(line2display);
					}
				}
			}
			line2display = line2display.nextSibling;
		}
	}
	
	
}

function add_ignored_list() {
	if (!document.getElementById("ignorelist")) {
		if (document.getElementsByClassName("nicklist").length > 0) {
			var ignore_ul = document.createElement("ul");
			var ignored_nicks = GM_getValue('ignoredNicks','-').split(',');
			var ignore_li = document.createElement("li");
			var ignore_header = document.createElement("h4");
			ignore_header.appendChild(document.createTextNode("Ignoriert:"));
			ignore_li.appendChild(ignore_header);
			ignore_ul.appendChild(ignore_li);
			for (var i = 0; i < ignored_nicks.length; i++) {
				ignore_li = document.createElement("li");
				ignore_li.appendChild(document.createTextNode(ignored_nicks[i]));
				ignore_li.addEventListener("click", function f() { var old_ignored = GM_getValue('ignoredNicks','-').split(','); var remove_no = -1; for (var i = 0; i < old_ignored.length; i++) { if (old_ignored[i] == this.firstChild.data) { remove_no = i; } } if (remove_no >= 0) { old_ignored.splice(remove_no,1); this.parentNode.parentNode.removeChild(this.parentNode); } GM_setValue('ignoredNicks',old_ignored.join(',')); },false);
				ignore_ul.appendChild(ignore_li);
			}
			ignore_ul.id = "ignorelist";
			document.getElementsByClassName("nicklist")[0].appendChild(ignore_ul);
		}
	}
}

function extend_menu() {
	if (document.getElementsByClassName("menu").length > 0) {
		var this_nickname = document.getElementsByClassName("menu")[0].parentNode.getElementsByTagName("span")[0].firstChild.data;
		var ignored_nicks = GM_getValue('ignoredNicks','-').split(',');
		var is_ignored = false;
		for (var i = 0; i < ignored_nicks.length; i++) {
			if (ignored_nicks[i] == this_nickname) {
				is_ignored=true;
			}
		}
		if (!document.getElementById("ignoreButton")) {
			var ignoreButton = document.createElement("a");
			ignoreButton.href="#";
			ignoreButton.id="ignoreButton";
			if (is_ignored) {
				ignoreButton.addEventListener("click", function f() { var old_ignored = GM_getValue('ignoredNicks','-').split(','); var remove_no = -1; for (var i = 0; i < old_ignored.length; i++) { if (old_ignored[i] == this.parentNode.parentNode.getElementsByTagName("span")[0].firstChild.data) { remove_no = i; } } if (remove_no >= 0) { old_ignored.splice(remove_no,1); document.getElementById("ignorelist").parentNode.removeChild(document.getElementById("ignorelist")); } GM_setValue('ignoredNicks',old_ignored.join(',')); },false);
				ignoreButton.appendChild(document.createTextNode("- wieder anzeigen"));
			} else {
				ignoreButton.addEventListener("click", function f() { var nick2ignore = this.parentNode.parentNode.getElementsByTagName("span")[0].firstChild.data; nick2ignore=nick2ignore.replace(/^\W/,""); GM_setValue('ignoredNicks',GM_getValue('ignoredNicks','krrrrrrrr')+','+nick2ignore);  document.getElementById("ignorelist").parentNode.removeChild(document.getElementById("ignorelist")); },false);
				ignoreButton.appendChild(document.createTextNode("- ignorieren"));
			}
			document.getElementsByClassName("menu")[0].appendChild(ignoreButton);
			//alert(GM_getValue('ignoredNicks','nix...'));
		}
	}
}


function do_every_second() {
	hide_lines();
	extend_menu();
	add_ignored_list();
}




window.setInterval(do_every_second, 600);
