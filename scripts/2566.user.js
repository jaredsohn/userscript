// Copyright (C) 1997-2004  Daniel W. Crompton <daniel.crompton@gmail.com>
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307 USA
//
// CVSVERSION: $Id: $
//
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Roxen CMS", and click Uninstall.
//
// --------------------------------------------------------------------
//
// The images here in where created and all rights are owned by:
//		Eugene Commandeur <Eugene.Commandeur@adp.nl>
//
// ==UserScript==
// @name				Roxen CMS
// @namespace	  http://www.rphh.org/
// @description	  v0.8 Adds 'Commit', 'Undelete' and 'Discard Changes' Buttons to modified files and 'Edit' to all files. (New images.)
// @include	  http://*/edit/!!*/!!files!N!ct!!!!*/*
// @include   http://*/edit/!!/!!files!N!!!!!*/*
// @include   http://*/edit/!!!!files!N!!!!!*/*
// @exclude	  file:///*
// @exclude	  https://*
// @version	  0.8
// ==/UserScript==

// Images
var H_icon = "data:image/png;base64,R0lGODlhDgAQAMQfAOqDO+qCO+yCO++TWOuCO+qAOvCUWel/N/CTWPnDo/vCouyCPPnCoPvBoOt/Net/N/nCoux/OPrDo+p+N+l/Nep+NPGSVvvDo+l/NuqANu6SV+qAOOuBOxISEv///////yH5BAEAAB8ALAAAAAAOABAAAAVi4CeOJNmdaHqKnee+cMfCtCd/LSF4gMARBc6tVXt1DJsWYOEJFAKCwmKQSRCLBkcD1+R4OAEOx0CRzB4ImGXCGHoUEY1rgLnYZu8DYnBguNwAHgkVBxA8BG5FfywqjSWPJSEAOw==";
//"data:image/gif;base64,R0lGODlhDgAOAPcAAP%2F%2F%2F%2F%2F%2FzP%2F%2Fmf%2F%2FZv%2F%2FM%2F%2F%2FAP%2FM%2F%2F%2FMzP%2FMmf%2FMZv%2FMM%2F%2FMAP%2BZ%2F%2F%2BZzP%2BZmf%2BZZv%2BZM%2F%2BZAP9m%2F%2F9mzP9mmf9mZv9mM%2F9mAP8z%2F%2F8zzP8zmf8zZv8zM%2F8zAP8A%2F%2F8AzP8Amf8AZv8AM%2F8AAMz%2F%2F8z%2FzMz%2Fmcz%2FZsz%2FM8z%2FAMzM%2F8zMzMzMmczMZszMM8zMAMyZ%2F8yZzMyZmcyZZsyZM8yZAMxm%2F8xmzMxmmcxmZsxmM8xmAMwz%2F8wzzMwzmcwzZswzM8wzAMwA%2F8wAzMwAmcwAZswAM8wAAJn%2F%2F5n%2FzJn%2FmZn%2FZpn%2FM5n%2FAJnM%2F5nMzJnMmZnMZpnMM5nMAJmZ%2F5mZzJmZmZmZZpmZM5mZAJlm%2F5lmzJlmmZlmZplmM5lmAJkz%2F5kzzJkzmZkzZpkzM5kzAJkA%2F5kAzJkAmZkAZpkAM5kAAGb%2F%2F2b%2FzGb%2FmWb%2FZmb%2FM2b%2FAGbM%2F2bMzGbMmWbMZmbMM2bMAGaZ%2F2aZzGaZmWaZZmaZM2aZAGZm%2F2ZmzGZmmWZmZmZmM2ZmAGYz%2F2YzzGYzmWYzZmYzM2YzAGYA%2F2YAzGYAmWYAZmYAM2YAADP%2F%2FzP%2FzDP%2FmTP%2FZjP%2FMzP%2FADPM%2FzPMzDPMmTPMZjPMMzPMADOZ%2FzOZzDOZmTOZZjOZMzOZADNm%2FzNmzDNmmTNmZjNmMzNmADMz%2FzMzzDMzmTMzZjMzMzMzADMA%2FzMAzDMAmTMAZjMAMzMAAAD%2F%2FwD%2FzP%2F%2F%2FwD%2FZgD%2FMwD%2FAADM%2FwDMzADMmQDMZgDMMwDMAACZ%2FwCZzACZmQCZZgCZMwCZAABm%2FwBmzABmmQBmZgBmMwBmAAAz%2FwAzzAAzmQAzZgAzMwAzAAAA%2FwAAzAAAmQAAZgAAMwAAAP%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALYALAAAAAAOAA4AQAhUAG0JHHjtmsA1BgVeA8CwYEGGABLaulZgIUSKEi1GLFDx4kCFFTEiBKkRYsOKEy9y1CiR4EpbIz9iPFnQZUmaCk3qjJjzZMeGPTf%2B5DnRoVGjtgICADs%3D";
var C_icon = "data:image/png;base64,R0lGODlhDgAMAMQSAPCPUt5YAONoAONqAOuBNul/N99ZAOJnAOp+N+l/NOt/NemAN9pLAOt+Ne6PUuRoAORpACAgAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAOAAwAAAU6oCSOUkSeZGSioxoJKxo9CwQdcUs0DwIJkFwE4FAUHo9BrgRIuJQywErFijAMpmUrENCeIl3W1ysJAQA7";
//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAPCAIAAAADCfo6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAIhJREFUOE%2FFlIEKwCAIRLf%2F%2F2hnM5sYpMbRZLA2yKdn3U1E17FgmAsg2me234LhVlGPJuwQzqsrKMaW%2BzbQQl9F0pBaJh4qIbwdmFU7qfwHy5Q2ap%2BzJ7eLAk2IUIcFLLn3D1ipueSQXLuYA7JzGkvNOYMLZ%2BbvWb90xxzEWgnKHlfeOJsy9s8Dn1eIo5NII6MAAAAASUVORK5CYII%3D";

var D_icon = "data:image/png;base64,R0lGODlhDgAMAMQSAPCPUt5YAONoAONqAOuBNul/N99ZAOJnAOp+N+l/NOt/NemAN9pLAOt+Ne6PUuRoAORpACAgAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAOAAwAAAU5oCSO0WieUXmiQqqu0QFBy/OSkAAhT0Pcosjg8SgoHACgROhKJFdLVeQJLUUMDKUpEghoSV7o9hYCADs=";
//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAPCAIAAAADCfo6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAIJJREFUOE%2FNlIEKwCAIBdv%2Ff7RrWSYK9QqRyWBsDG8nLx8iKmlVYaYC0bazfmZMNY26esPBKALbYrwx%2BE9f51bjhtlo9aMxMO8eJrlC%2FCZsO0BpZ2xO5ZodNkOv8nsYLpcXkOvo8%2FxnGnE5JHvmG3vO%2BqFL2yB6lUStx9Vu9Es59s0LfwdK0%2BISyx8AAAAASUVORK5CYII%3D";
var S_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAPCAIAAAADCfo6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAItJREFUOE%2FFlI0OgCAIhOv9H5owfmI022GsmFvmkq%2BTk52Its%2BCYSka0TlzfBcMS%2B0allAhnNdmrZj4u6eAEfaASa6%2BdAbCq8EiaRGGb3tTVLHDsD7oiGhUcIt%2FVoalO1niKawkTgDV8%2FzJIHoJgMpJdddkXdZ3Hm4WpGDTDhJbSVd7fOqN96bcu3IAOECEp3nKatsAAAAASUVORK5CYII%3D";
var E_icon = "data:image/png;base64,R0lGODlhEQAQANUkAOVsCONqAN1VAPrLrv/8+/79+/zMseNqBu+OT//7+O+SVf76+dtTAPCRVfCSVv/7+v/79+6NTN1UANtLAPzMsv3Msv3MsP/9+f3NsuRrBvvNsu+OUd9UAO+QVO6NT/nCou+SVtpLAP///wAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACQALAAAAAARABAAAAZoQJJwSCwSRyOjkjT6hJLL48QTgUaFo0AGYUUuswcuk7KwFkcAwGakSYhE5uMBIICIQO/4cCQJMN4KeUojBhwCbyIOglhIBhdvDYhwZiMVBJIdeRZxIxgFknBMgwOXi1EjAwUPeoNeRUEAOw==";
//"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAPCAIAAAADCfo6AAAABGdBTUEAALGPC%2FxhBQAAAJFJREFUOE%2B9lAsOgDAIQ%2FX%2Bh0aUj7hFLYSMmDiN40Ht2IloWxYMG6IRPWaOz4LhVrsuS6gQzmsrADM3jZR1NXCG3QCS5I3d4zIIrw7DSVKiwrLbXExEQ%2F%2FGgLCGUcZUibpRzhleY9mx2lmKt84gNes%2FDKKHICMmLruTbus7L%2FX%2FfpGvEySOkq7x%2BDUb56Hc%2B%2BYAjh18r%2B2pL2YAAAAASUVORK5CYII%3D";

function RCMS_log(_value) {
		GM_log(_value);
//		alert(_value);
}

/* { _commit_code */
var _commit_code = "";
function commit_code(_path,_file) {
	var _uri = _path +"/"+ _file;
	return ("var _uri  = \""+ _uri +"\";\n"+
					"var _path = \""+ _path +"\";\n"+
					"var _file = \""+ _file +"\";\n"+
					_commit_code);
}

try {
	//_commit_code += "var URL = \"/edit/!!\"+ _uri +\"!!files!N!ct!!!!0%AE/\";\n";
	_commit_code += "var URL = \"/edit/!!\"+ _uri +\"!!files!N!ct!\"+ _path +\"!!!0%AE/wizards/?action=commit.pike\";\n";
	//_commit_code += "document.location = URL;\n";
	_commit_code += "document.getElementById(\"_in_\"+ _file).style.visibility = \"visible\";\n";
//	_commit_code += "alert(_uri +\"\\n\"+ URL);\n";
} catch (e) { alert(e); }
/* } */

/* { _call_commit_code */
var _call_commit_code = "";
function call_commit_code(_path,_file) {
	var _uri = _path +"/"+ _file;
	return ("var _uri  = \""+ _uri +"\";\n"+
					"var _path = \""+ _path +"\";\n"+
					"var _file = \""+ _file +"\";\n"+
					_call_commit_code);
}

try {
	_call_commit_code += "if( document.getElementById(\"_in_\"+ _file).style.visibility == \"visible\") document.getElementById(\"_in_\"+ _file).style.visibility = \"collapse\"; else document.getElementById(\"_in_\"+ _file).style.visibility = \"visible\";\n";
	_call_commit_code += "if( document.getElementById(\"_in_b_\"+ _file).style.visibility == \"visible\") document.getElementById(\"_in_b_\"+ _file).style.visibility = \"collapse\"; else document.getElementById(\"_in_b_\"+ _file).style.visibility = \"visible\";\n";
} catch (e) { alert(e); }
/* } */

var path = "";
function getPath() {
	if(path != "") return path;
	var _title = document.getElementsByTagName("TITLE").item(0);
	var _idx = _title.textContent.indexOf(" ",0);
	return (path = _title.textContent.substring(_idx+1, _title.textContent.length));
}
//alert("\""+ getPath() +"\"");

// Execute on page load
(function () {
		var table_box = document.getElementsByTagName("TABLE");
		var i, _tr_box, _td_box;
		RCMS_log("Roxen CMS module loaded");

		function run_site_button(elem) {
				//return run_button(elem);
				// TODO: Needs exists button for 'Edit'
				var _img = elem.getElementsByTagName("IMG");
				for( _i = 0; _i < _img.length; _i++ ) {
					if( _img.item(_i).getAttribute("title") == "exists")
						add_edit_button(elem, _img.item(_i), "exists");
			}
				return 0;
		}

		function add_edit_button(_elem, _img, _type) {
			var _anchors = _elem.parentNode.getElementsByTagName("A");
			var _anchor;
			var __but;

			//alert(":"+ _img +" - "+ _anchors.length);
			for( _i = 0; _i < _anchors.length; _i++) {
				//alert("\""+ _anchors.item(_i).getAttribute("href") +"\"");
				if( _anchors.item(_i).getAttribute("href")) {
					_anchor = _anchors.item(_i);
				}
			}
			// 3 nodes
			if(_anchor.parentNode.childNodes.length >= 4) return 4;

			__but		= document.createElement("IMG");
			__but.setAttribute("type","image");
			__but.setAttribute("name","ok");
			__but.setAttribute("alt","Edit");
			__but.setAttribute("src",E_icon);
			__but.setAttribute("onClick","document.location='/edit/!!"+ getPath() +"/"+ _anchor.text +"!!files!N!ct!"+ getPath() +"!!!0%AE/wizards/?action=edit_file.pike';");
			__but.setAttribute("id","_in_e_"+ _anchor.text);
			__but.style.visibility		= "visible"; //"hidden";
			__but.style.display				= "inline";
			__but.style.cursor				= "pointer";
			__but.style.float					= "right";
			//_img.parentNode.addBefore(_img,__but);
			_anchor.parentNode.appendChild(__but);
		}

		function run_you_button(_elem) {
				return run_button(_elem);
		}

		function run_button(_elem) {
		    var _i;
				var _img = _elem.getElementsByTagName("IMG");
				for( _i = 0; _i < _img.length; _i++ ) {
					//alert(str +" - "+ _img.item(_i));
					if( _img.item(_i).getAttribute("title") == "removed")
						add_buttons(_elem, _img.item(_i), "removed");
					if( _img.item(_i).getAttribute("title") == "added")
						add_buttons(_elem, _img.item(_i), "added");
					if( _img.item(_i).getAttribute("title") == "modified")
						add_buttons(_elem, _img.item(_i), "modified");
				}
		}

		function add_buttons(_elem, _img, _type) {
			/**	TODO: _block check
			 *		There is no need to traverse the page more than once if the _block
			 *	elements have been created. That would just be stupid.
			 */
			var _i;
			var _anchors = _elem.parentNode.getElementsByTagName("A");
			var _anchor;
			var __but, __block, __form;

			//alert(":"+ _img +" - "+ _anchors.length);
			for( _i = 0; _i < _anchors.length; _i++) {
				//alert("\""+ _anchors.item(_i).getAttribute("href") +"\"");
				if( _anchors.item(_i).getAttribute("href")) {
					_anchor = _anchors.item(_i);
				}
			}
			// 3 nodes
			if(_anchor.parentNode.childNodes.length >= 4) return 4;

			__block	=	document.createElement("DIV");
			__block.setAttribute("name","_block");
			__block.setAttribute("id","_block");
			__block.style.display			= "inline";
			__block.style.margin			= "0 0 0 0";
			__block.style.padding			= "0 0 0 0";

			// Create and Add form
			__form		= document.createElement("FORM");
			__form.setAttribute("method","post");
			__form.setAttribute("action","/edit/!!"+ getPath() +"/"+ _anchor.text +"!!files!N!ct!"+ getPath() +"!!!0%AE/wizards/?action=commit.pike");
			__form.setAttribute("id","_form_"+ _anchor.text);
			__form.style.visibility		= "collapse";
			__form.style.display			= "inline";
			__block.appendChild(__form);
			
			// Create and Add input field
			add_edit_button(_elem,_img,_type);

			if(_type != "added" ) {
				// Create and Add input field
				__but		= document.createElement("IMG");
				__but.setAttribute("type","image");
				__but.setAttribute("name","ok");
				__but.setAttribute("alt","Discard Changes");
				__but.setAttribute("src",D_icon);
				if( _type == "removed" )
					__but.setAttribute("onClick","document.location='/edit/!!"+ getPath() +"/"+ _anchor.text +"!!files!N!ct!"+ getPath() +"!!!0%AE/wizards/?action=undelete.pike';");
				else
					__but.setAttribute("onClick","document.location='/edit/!!"+ getPath() +"/"+ _anchor.text +"!!files!N!ct!"+ getPath() +"!!!0%AE/wizards/?action=discard.pike';");
				__but.setAttribute("id","_in_c_"+ _anchor.text);
				__but.style.visibility		= "visible"; //"hidden";
				__but.style.display				= "inline";
				__but.style.cursor				= "pointer";
				__but.style.float					= "right";
				__form.appendChild(__but);
			}

			// Create and Add hidden input field : _STATE
			__but		= document.createElement("INPUT");
			__but.setAttribute("type","text");
			__but.setAttribute("name","_state");
			__but.setAttribute("value","thisshouldprobablyberandom/");
			__but.style.visibility		= "collapse";
			__but.style.display				= "none";
			__form.appendChild(__but);

			// Create and Add hidden input field : _CLOSE_BUTTON
			__but		= document.createElement("INPUT");
			__but.setAttribute("type","text");
			__but.setAttribute("value","/_internal/gbutton!0/1t6w97xxrc$9ikwx2ov");
			__but.setAttribute("id","__close_button");
			__but.style.visibility		= "collapse";
			__but.style.display				= "none";
			__form.appendChild(__but);

			// Create and Add hidden input field : _MAGIC
			__but		= document.createElement("INPUT");
			__but.setAttribute("type","text");
			__but.setAttribute("name","magic_roxen_automatic_charset_variable");
			__but.setAttribute("value","åäö&#x829f;@UTF-8");
			__but.setAttribute("id","_hidden_magic_"+ _anchor.text);
			__but.style.visibility		= "collapse";
			__but.style.display				= "none";
			__form.appendChild(__but);

			// Create and Add hidden input field : _ACTION
			__but		= document.createElement("INPUT");
			__but.setAttribute("type","text");
			__but.setAttribute("name","action");
			__but.setAttribute("value","commit.pike");
			__but.setAttribute("id","_hidden_action_"+ _anchor.text);
			__but.style.visibility		= "collapse";
			__but.style.display				= "none";
			__form.appendChild(__but);

			// Create and Add hidden input field : _PAGE
			__but		= document.createElement("INPUT");
			__but.setAttribute("type","text");
			__but.setAttribute("name","_page");
			__but.setAttribute("value","1");
			__but.setAttribute("id","_hidden_page_"+ _anchor.text);
			__but.style.visibility		= "collapse";
			__but.style.display				= "none";
			__form.appendChild(__but);

			// Create and Add image
			__but		= document.createElement("IMG");
			__but.setAttribute("src", H_icon);
			__but.setAttribute("name","_commit");
			__but.setAttribute("alt","Show Commit Field");
			__but.setAttribute("id","_commit");
			__but.setAttribute("cheese",_anchor.text);
			__but.setAttribute("onClick",call_commit_code(getPath(),_anchor.text));
			__but.style.visibility		= "visible"; //"hidden";
			__but.style.display				= "inline";
			__but.style.cursor				= "pointer";
			__form.appendChild(__but);

			// Create and Add input field
			__but		= document.createElement("INPUT");
			__but.setAttribute("type","text");
			__but.setAttribute("name","msg");
			__but.setAttribute("value",_type+": ");
			__but.setAttribute("size","20");
			__but.setAttribute("id","_in_"+ _anchor.text);
			__but.setAttribute("cheese",_anchor.text);
			__but.style.visibility		= "collapse"; //"hidden";
			__but.style.display				= "inline";
			__but.style.float					= "right";
			__form.appendChild(__but);

			// Create and Add input field
			__but		= document.createElement("INPUT");
			__but.setAttribute("type","image");
			__but.setAttribute("name","ok");
			__but.setAttribute("alt","Commit");
			__but.setAttribute("src",C_icon);
			__but.setAttribute("id","_in_b_"+ _anchor.text);
			__but.style.visibility		= "collapse"; //"hidden";
			__but.style.display				= "inline";
			__but.style.float					= "right";
			__form.appendChild(__but);
			
			//alert(__form.childNodes.length);

		//	__but.setAttribute("onClick",commit_code(getPath(),_anchor.text));

			_anchor.parentNode.appendChild(__block);

			//_img.setAttribute("border","1");
		}

		for( i = 0; i < table_box.length; i++) {
				var it;

				_td_box = table_box.item(i).getElementsByTagName("TD");
//alert("X"+i+",0");

				for( it = 0; it < _td_box.length; it++) {
//alert("X"+ i +","+ it);
					// User Changes
					if(_td_box.item(it).className == "you_col")		{ run_you_button(_td_box.item(it)); }
					// CMS Changes
					if(_td_box.item(it).className == "site_col")	{ run_site_button(_td_box.item(it)); }
				}
		}
})(); 




