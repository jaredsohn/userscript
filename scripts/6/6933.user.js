// ==UserScript==
// @name          Plaxo4Gmail
// @version	  1.0 (beta)
// @date	  2006-12-31
// @namespace	  http://plaxo4gmail.blogspot.com/
// @description   Adds Plaxo sync capabilities in Gmail 
// @include       http*://mail.google.com/mail/*
// @author	  Greg Bays
// ==/UserScript==

/*
 	Plaxo4Gmail is an AJAX routine that connects Plaxo(tm) to Gmail's(tm) website
 	You may contact the author using his vcard; 
 	http://vcardplus.info/show.asp?uid=z9959

	Copyright (c) 2007  Greg Bays

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

/**
 * ----------------
 * BROWSER DETECT // used in plaxo xmlhttp req only headers require it
 * 
 * ----------------
 */
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return dataString.substring(index+this.versionSearchString.length+1);
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

/**
 * ----------------
 * GLOBAL VARIABLES
 * "G_..." = gmail, "P_..." = plaxo, "B_..." = both
 * ----------------
 */

const B_HTTP_ACCEPT = 'application/x-www-form-urlencoded';


var G_IK = "";
var G_ZX = gmail_proxy_defeat('nodash');
var G_HTTP_LOCATION = window.location.protocol + '//' + window.location.host + '/mail/';
const G_CONTACTS = "GmailContacts";

var G_SIMPLE_CONTACTS_ARRAY=[];
var G_CONTACTS_LENGTH = 0;

const G_LANG_SYNC_NOW = "Sync";
const G_LANG_PLAXO_LOGIN = "Plaxo Login";
const G_LANG_ALL_CONTACTS = "All Contacts";
const G_LANG_SYNC_MSG = "Sync in progress...";



var P_IDENTIFIER = "";//plaxo login name
var P_AUTHMETHOD = "";//plaxo or aol or all
var P_PASSWORD = "";//plaxo password for login name
var P_REMEMBER_ME = false;
var P_ERROR = false;

var P_HEX_CHECK = "";
var P_CONTACTS_COUNT = 0;
var P_CONTACTS_LENGTH = 0;

const P_PROTOVER = 1;
const P_CLIENT = "Greasemonkey for Gmail/1.0";
var P_OS = BrowserDetect.OS; 
var P_PLATFORM = BrowserDetect.browser+"/"+BrowserDetect.version;
//var P_WEB_LOCATION = window.location.protocol + '//testapi.plaxo.com/';
var P_WEB_LOCATION = window.location.protocol + '//www.plaxo.com/';
var P_HTTP_LOCATION = P_WEB_LOCATION + 'rest?package=';

// the plaxo logo graphic
	const loginImg = 	'data:image/gif;base64,R0lGODlh8AAhAPcAAObx%2BwAAAB16yYi55LDR7lOa1m2q3SqCzDiK0Nnp%2BGCi2qPJ6svh9Huy4EWS05bB577Z8QEBAeXw%2BgICAhUWF3%2BFiwUGBnyCiNji6%2BHs9tzn8E6BwgMDA%2BPu%2BKiwtx0eHxgaG8TN1uDq9AoKC9Da4wYHBxQVFggJCQsLDJmhpxwdH97o8gcICDc6PNXf6OTv'+
 				'%2BcnT3B8gIdjj7Nrl7nh%2Bg6WttIGHjQQEBFtfY%2BHr9Q4OD6evtoOJj4KIjo6Um1pfYlxgZCAhIhscHtfh6hESExMUFRITFLnCytHb5NTe58LL1MPM1dnk7U5SVs%2FY4bvEzCUnKLW%2BxsbQ2cjS22SRyiQmJ8XO15KZnyosLlNXW8%2FZ4oqRlywuMISKkHuBhqOrssfR2lhdYAUFBQkJCnZ8gb7H0G5zeA0NDmhtcUZKTZSboZOaoA8QEcz'+
 				'W3s7X4DU4Ojg7PUxPUz1AQ%2BLt96KqsWVqbrO7w8HK07K6wjk8PqCnrr%2FI0YWLkdfm9qu0u5ado2%2BZzqGpsKautd3q9n2DiTY5OzAyNGFlaWBkaIeOlMbP2Dw%2FQjM2OK%2B3v11hZZeepE6AwsrU3EtOUkJFSL3GzigqK9Pj9EpNUU9TVx4fIFVZXa21vd%2Fp8zw%2BQUVJTCIkJdLc5UVISxkaHLjByTI0NrC4wGKPyVdbXpujqaqyuVBU'+
 				'WAwMDWpwdGtwdY%2BWnZ6lrIuSmBYXGCEjJGyXzXV7gIWMknyBh9Pd5mxxdiYoKZigplFVWV9jZ3J3fCkrLb3Gz83X3xcZGnN5fkNGSU5RVScpKnd9gqGor8rU3SstL9Tk9FJWWrzFzXB1etLi9KmxuFZaXqqzumt1fjEzNW1ydz5BRGRpbWJna9no%2BA4PEKjE5dbg6U%2BBwi8xM0BDRrjP6khMT8nb8LvS7bfAyF2MyM7h9i0vMTs9QKSss56yx'+
 				'290eXl%2FhIKn1nyl1mFmanWe0cvV3eXx%2B4CGjG2f21iIxiAiI93r%2BIiPldHh81dcX9fk8Nvp95ykqt3o8YmQlk1QVCH5BAAAAAAALAAAAADwACEAAAj%2FAAEIHEiwoMGBO2h4WdfooMOHECNKFCCxosWLGDNq3Mixo8Q3AULy8EhyYsmTKFOqXJmRCYWQAZ6wTElxps2bOHNCtGMhpBAZOjvWDEq0qFGO9yKEDJXhKMahTqNKleoIphkJU01m'+
 				'3coVJ8iQKbo%2BhCq2rFkJoMBMgScwhB4fr%2B40JShFRcgRMgfKOJLCVaAQAjXAiDQliQQ3UiKBwWBQmTNL%2BCzFG9hvyY4rV1KBeaHVrGexGJoI%2BSAnhLBYMIn8gEGwxpmQXNwMRDeJBUwQXiT4iBHkw4UO6igEEZJFA8FvVEyZoqdNoIRAcUzADKCCl5KIZD9rjypFVMgqkqbD%2F2QEbGAFpQGaiAAggdAI8SHXnILJD8AmNiEnXBkYjtyGD'+
 				'dywYw8ASWTRE3wBBLEDRNlt5yBReHAQ0oFGxDLBdLgMNF9IZAjkg4QwmSBdgiCEZMQUAl0zngsA9AEIJP%2B9MwiB3kxXAghGTBfDHmM96KNRPkw3wgUurKBLMDDVQwIAMrSQX1gwvBQSBf7MwAQf78HUwhAClSFlAK4M0s4GMJpSDnthwBSBKkeIMEQXq8BUB2cHNThQAgsMMAAEACQwQAIcLbDAj9pJUAdMYmxBEA83wBQFAEp8EJIJj7ICUwnHEE'+
 				'TNdDjMBcAhMFWSzjyzzAKIOAJ5wClWA6EBUzFL1v%2F5EAQHHFAAAgoAMIAAA3BUa0UP9EroSQzsCREncsA0TAcELVEETKgAsEOjAfjiggYlhpRFQXa8FlItBLVBBEzS6INNH%2FsMVA1MVcxQkAdZinGdrA4ZIAADAgEKAAEdMYDvRAUMe9Ku%2FD6UhJRihEWQE9kG8AgAPcCUBgCCgBhAKQUpkcmEqRTUDExCIFPQHTrAZINBTzwb0i8O2QmAAgL'+
 				'wORABvPZpLwIEA1BAAQ0cgMADBRVAEc0DOCCAAvoKJMDSAvD7gNE4E7SAAA0IBHMCfiIggAMFCxCwzjVRbcDXAhmgtQMyJ2DAAUcLNIDWCGD99tYFC%2B120zrz7DPQuy7%2FXUACCgBdUBSpgVKQFSMG8AUAP1gFAA0wycJEQXsIEdIHSxTkRgwwIVKQGgdacIdB44wbUhktP0SzAAYUTDTYAyzANr9CGyD7AUEPLcABC9grrEA0c53AA0cTAPPvAC'+
 				'CAgNK5%2Br6A0Xx6LZDdAOxegOBuC4oA7gA4cMAABAzaANUEAO089GDfTTvrtwPAgO8Q0Ez2QFvAZIhBfsQZwASUrPCVBX8AABBgAo71EGQTKAhJC9xFEA3kASZFGAVBvICeXLCoIHqwTQBOABh6OQQCMKsZ0RLAOoGMb32AOiFB7EazqpFwftX7mvIGMsOB7AoCU3sAA0rovhJKL33VW55B%2FwgwAKHhsGb5aptAdmiAJZaQejkTWgrxljNdyYwgi'+
 				'IDJJAxCiAsF4AO3IEHJApANSgAgDjAJwxwKYoM0GsRV08lHDgZCC5gUAigFwQVMcqGF1EWEAVpjANFepyu8QRFvA2EhEn84kB8yknpObEDP9oXEGFoSiIzMl%2FcaIDQiIpKSvyOkJQ%2B5PvUVsmAOYYSWCoIsmGDiBX6IXFP%2BAZMmeAoAGHBSSE5GEFh4ESYswJhAeuBFLDCGICTgAkygwSwPQoRgRGOiCQ1ZkypOT3fCyuQla5g8IQ5EAcproj'+
 				'R72MStXVNpMNzVoAhGvN%2FtMFdObCI5wQaoKFaTioj8F0G0oP%2ByAFBgGwRJAYgisAYAXAAmlxAIqEICBeMMhAcwQUENCOIB%2FASAA9QKQBrWCIAvlCAkJWBGQYyhJj30yCF6Kp%2FPQAk72VHTlInEJjoLsr0F%2BKl4MMOeQKaGSKHFznt88mnfZkoQ4tludgmoFfgGJbQGlK%2BlQC3kUV96SgAYFQLjHIgHTqCmVqxRAh7gXEgMcQsALAMmH'+
 				'QIALKYDLgDMIBFjuA1r2vIJmFiDDNOhg0CGYJeQeMIJApFBF7gakjSs4KQHaYDWDmAAfL2OAUJzAMxKWdWYsvSSA3mA1vg0NwfotJHeTEDPiicQCBhNAeMjKkHs5YCcgXBpTVQb2xyAtdH%2FKqBggNuaPU2ZWwUw4ABVI0gFLhSBC3HgEqyIg7cCwAK95qAKMFkcALSQo5CcIAtoWERI0EMKOmGgEDCBAwZyIKmQdOOwAKjAdMzhjjo8ECafUASDSn'+
 				'K1qOzqswKziCZc%2BaXpRKAHAlmCBk%2FQBjoiKABQgMkPBoIDmGTCCgKBKEwUBYAVeOLAIanEEbDDkQEoYAD2Cu5RYAbP%2FGKkA9OASQ3UkKXtxkANA%2FnDBJSCBQMCQAQ4%2BChMxtCLJgSguHwAwAsgFxIUPGMgLsDCjxEMWFwCIYHi0YEjkNCZjBCAk4GTigH%2BZOKMKKKvOthwNH5wjjwQwwaxEsgoKlCBC9CBm1XOScEu4LAIIHgAAI%2B'+
 				'4QAV6wBoNJMIWFbDFRAmCBxq0WR4QHkgjWhEKOHRCFRdAXUVc1uVKS0QQUE5GgQfSTI10eiYZgLNFKG3pUh%2BkCzCRhI1NbRBSs%2FrVAwyJGV7tR1rbmiBM6ER%2BCnprgri61yYOQV%2FZgAdgN9LYt7bDGEpwAy6kGdi%2FRjahcoCEanNJ2tGWtrbzm%2B1tbycgADs%3D';
 
// the little [x] graphic
	const closeImg =	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAMAAACuAq9NAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURaCgpP%2F%2F%2Fw7rn%2FcAAABRSURBVHjaYmBAAQABxMDAiAQYAAIIjQsQQCAuRAjMAgggMBMuxgAQQDAZKA0QQFC9MAogg'+
 				'NBkAQIITS9AAKGZDBBAaPYCBBAaFyCA0FwMEGAAKSIAawK9O28AAAAASUVORK5CYII%3D';
// animated sync arrows
	const syncImg = 	'data:image/gif;base64,R0lGODlhEAAQAMQZABtQzKO785ey8r7Q90l453CV7RxY2LDF9SJg4nyh7mKO6y5k5FWF6VWB6Ul856O98xtUzDtu5iJb4nye7hlOv2KL6xxU2L7P9xlKv%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJCAAZACwAAAAAEAAQAAAFUGAmjmRpnuWA'+
				'UCwlMspgqq0IUcaTGnWW8AbZSIFbjQY8BWmVUJESFASJhaKOrClshkly%2BKIkYvDqSJKQuISoNSY9eJA1CyE8KxjyeR3F749CACH5BAkIABkALAAAAAAQABAAAAVoYCaKAVCMaCpamCSo6FUBWB3AWcDWGJFdh9SFZSlgAIeLxHJBVTDMjKTyY1FHEsxEtOW2UDXYJTyqNVVkUbZ76U6%2Bo2e0IqlirqKh70ArEM8jQRkEPF'+
				'A3MAE8ABWAMAJZFjgqBQCHIyEAIfkECQgAGQAsAAAAABAAEAAABWBgJo7jsZAoWmBTKl6VhGEAfaWBNe9zhV46S0swA7RIFYzllkkSmCTZsRnIXCa%2B0cyV2WoxrotXVJncAtnMBCNJXQiYLDCOmtQwgmsQSubtLFU%2FNXcSFXwkawVcKQsHiyEAIfkECQgAGQAsAAAAABAAEAAABVJgJo5kaZ7ZdZVXJWGYVKmSQAYWrGPW'+
				'a4uXnGUimuRgv0yFtwK%2BkKMGgDh6QlHYjGC7baJ2BNIE0CDpwqMgpmKGDVVGpjly3FkCpXDrKfNm%2F4AhACH5BAkIABkALAAAAAAQABAAAAVgYCaOZGme6FVJGCZV13lYbY1ZwUlYUzzRltgolxGKLrRKJifAEA6mAgZgAWRYU5hogm0VpDXJZFQBtCQZqrlgOhAwgmWmcjMWY8QjsHf5SewiATQ2N1AmKlgvgCiMjSQhAC'+
				'H5BAUIABkALAAAAAAQABAAAAVfYCaOZGmeqFhhmFRd5lUV2cSyVkBOAAZcsJoFYwkubhgC6TKsiA6FHks3sklILEHFicV0g6qKgEWSYCakwA1QOKiI4AwBuRAxiRMYsAdAjwJDN2gTLzEVZhhcKYuMJiEAOw%3D%3D';
//opaque background
	const clearPNG =	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH1gUVARoAFnvtowAAABZJREFUeNpjZGBgaGDAApgYcAB6SAAATRoAjEbt8W4AAAAASUVORK5CYII%3D';

/**
 * ----------------
 * EVENT LISTENERS
 * 
 * ----------------
 */

window.addEventListener('load', 
	
	function(event) {

		gmail_get_IK();
		gmail_make_sync_link();

		if(self.name == 'main'){
			var plaxo_pinging;
			my_gmail_ping();
		}

		// load the ping event 
		if(self.name=='mi'){
			if(parent.plaxo_pinging==null){
				GM_log("ping loaded");				
				parent.plaxo_pinging = window.setInterval(function(){ 
										my_plaxo_ping();
										my_gmail_ping();
										 },
									60000);
			}else{
				clearInterval(parent.plaxo_pinging);
			}
		}

		// settings related

		gmail_create_plaxo_settings();

		// only works to get edit when clicking on address book
		// in the google talk version, suppresses the pop up quick look
		// changeIDs();

	},
true);

document.addEventListener('mousedown', 

	function(event) {
		if(event.target.id=='sv'){
			gmail_replace_sync();			
		}
	},
true);

document.addEventListener('click', 

	function(event) {

    // event.target is the element that was clicked

	// a gmail tab in Contacts : "All Contacts"
		if(event.target.id=='cpm_a'){
			window.setTimeout(function() { gmail_make_sync_link() },50);
		}
		if(event.target.id=='cpm_p'){
			// layout is different on gmail with "talk"
			window.setTimeout(function() { gmail_make_sync_link() },50);
			window.setTimeout(function() { gmail_fix_layout() },100);
			
		}
		if(event.target.id=='cpm_l'){
			// layout is different on gmail with "talk"
			window.setTimeout(function() { gmail_fix_layout() },100);
			
		}
		if(event.target.id=='my_plaxo_sync'){
				my_gmail_ping();
				window.setTimeout(function() { both_sync("Slow") },1000);			
		}
		if(event.target.id=='my_plaxo_login'){
			// the dialog box
			GM_addStyle('.rtop, .rbottom{display:block;background: #e6f1fb}.rtop *, .rbottom *{display: block; height: 1px; overflow: hidden;background: #f6f9fd}.r1{margin: 0 5px}.r2{margin: 0 3px}.r3{margin: 0 2px}.r4{margin: 0 1px; height: 2px}.p_form_input{width: 200px; font-style: normal; font-variant: normal; font-weight: normal; font-size: 13px; font-family: Arial}.p_form_text{font-family: Verdana, Arial, Helvetica, SunSans-Regular, sans-serif; font-size: 11px; line-height: 16px}');
			gmail_create_popup_dialog();
			initmb();
			sm('box', 350, 260);
		}
	// the delete button
		if(event.target.id=='ac_dcal'){
			if(confirm('Deleteing these contacts will also delete them in Plaxo.')){
				setCookie("CHK_GMAIL","true",expdate,"/");
				window.setTimeout( function() { 
					gmail_make_sync_link();				
			 	},1000);
			}else{
				event.stopPropagation();
    				event.preventDefault();
				return false;

			}
		}

	// login popup screen
		if(event.target.id=='dialog_close_x'){
			// x in the dialog box
			hm('box');
		}
		if(event.target.id=='dialog_sign_in'){
			// sign in button on the dialog box
			plaxo_sign_in();
		}
		if(event.target.id=='dialog_cancel'){
			// sign in button on the dialog box
			hm('box');
		}

	//a gmail tab in Settings : "General"
		if(event.target.id=='pp_g'){
			window.setTimeout(function() { gmail_create_plaxo_settings() },50);
		}
		if(event.target.id=='settings_sign_out'){
			plaxo_sign_out();
		}
		if(event.target.id=='settings_update_contacts'){
			GM_openInTab(P_WEB_LOCATION+"signin?cl=1&r=/request_updates?filternone=on&filtersent=on&filterreplied=on&filterbounced=on&filtermember=on");
		}
		if(event.target.id=='settings_my_plaxo'){
			GM_openInTab(P_WEB_LOCATION+"signin?cl=1&r=/my_plaxo");
		}
		if(event.target.id=='settings_about'){
			if(confirm("Plaxo4GMail Sync, (c)2007 Greg Bays, All Rights Reserved\n\nWould you like to view the authors vCard?")){
				GM_openInTab("http://vcardplus.info/show.asp?uid=z9959");
			}
		}
	}, 
true);

// keep the background gmail page from bleeding 
// through if the user tries to scoll

window.addEventListener('resize', fixBoth, true);
checking = window.setInterval(fixBoth, 150);

/**
 * ---------------------
 * create a random string to beat gmail.
 *
 * [type]       nodash eliminates the dash 
 * ---------------------
 */
function gmail_proxy_defeat(type) {
	if(!type){
		type='';
	}
	var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	var string_length = '13';
	var randomstring = '';
	 	 
	// Generate
	if (type == "nodash") {
		for (var i = 0; i<string_length; i++) {
			var rnum = Math.floor(Math.random()*chars.length-1);
			randomstring += chars.substring(rnum,rnum+1);
		}
	} else {
		for (var i = 0; i<string_length; i++) {
			var rnum = Math.floor(Math.random()*chars.length-1);
			randomstring += chars.substring(rnum,rnum+1);
			if (i == 5) {
				randomstring += "-";
			}
		}
	}
	return randomstring;
}




/**
 * ----------------
 * get identification key
 * required functions(): 
 *	xpath()
 * get the IK so we know who is logged in -- unique to each user on gmail.
 * it is located in the "af" form action so lets look for the form and strip out the IK and
 * put in in a cookie for later
 * ----------------
 */

function gmail_get_IK(){
	var formEntries, thisIK;
	var ik='';
	formEntries = xpath('//form[@name="af"]');
		
	for (var i=0; i<formEntries.snapshotLength; i++){
		thisIK = formEntries.snapshotItem(i).action;

		if(thisIK.indexOf('ik=') && ik==''){
			var start = thisIK.lastIndexOf('ik=')+3;
			var end = thisIK.lastIndexOf('ik=')+13;
			thisIK = thisIK.substring(start,end);
			ik = thisIK;
		}
	}
	if(ik!="" && getCookie("GMAIL_IK")!=ik){
		setCookie("GMAIL_IK", ik);
	}
}
/*
iv'e left this here for ts on the new entries only in google talk
for some odd reason the photo does not get entered when we add a new entry
from a sync source, is there a photo upload I'm missing?

function changeIDs(){
	var div_cp_a,cp_a,thisID,newID,myID;

	div_cp_a = document.getElementById("cp_a");
	if(div_cp_a){
		cp_a = xpath('//span[@id]',div_cp_a);
	
		for(var i=0; i<cp_a.snapshotLength; i++){
			myID = cp_a.snapshotItem(i);
			thisID = cp_a.snapshotItem(i).getAttribute("id");
			if(thisID.indexOf('_pro_')!=-1){
				newID = thisID.substring(thisID.lastIndexOf('_')+1,thisID.length);
				newID = "pickp_"+newID;
				myID.setAttribute("id",newID);
			}
		}
	}
}
*/
function gmail_make_sync_link(){
	if(document.getElementById("my_plaxo_sync")||document.getElementById("my_plaxo_login")){return;}

	var ctm, inner_ctsum, class_ctsum, td_ctm;
		
	td_ctm = document.getElementById("ctm");
	if(td_ctm){
		ctm = xpath("//span[@class]", td_ctm);

		for (var i=0; i<ctm.snapshotLength; i++){
			
			class_ctsum = ctm.snapshotItem(i).getAttribute("class");

			if(class_ctsum == "ctsm"){

				var nctl, syncSpan, syncText, dash;
				nctl = document.getElementById("nctl");
				if (nctl) {
					dash = document.createTextNode(" - ");
					nctl.parentNode.insertBefore(dash, nctl);

    					syncSpan = document.createElement("span");
    					dash.parentNode.insertBefore(syncSpan, dash);
					syncSpan.setAttribute("class", "lk");

					if(getCookie("PLAXO_UHID")==null||getCookie("PLAXO_UHID")==""){
						syncSpan.setAttribute("id", "my_plaxo_login");
						syncSpan.setAttribute("style", "font-weight: bold");
						syncText = document.createTextNode(G_LANG_PLAXO_LOGIN);
					}else{
						syncSpan.setAttribute("id", "my_plaxo_sync");
						syncSpan.setAttribute("style", "font-weight: bold");
						syncText = document.createTextNode(G_LANG_SYNC_NOW);
					}
					syncSpan.appendChild(syncText);
				}
				both_get_globals();
			}
		}
		gmail_fix_layout();
	}
}

/**
 * ----------------
 * Fix layout issue
 * required functions(): none
 *	fixes a layout error in chat enabled version of gmail where our
 * 	"sync now" link goes
 * ----------------
 */
function gmail_fix_layout(){
	var clbtl, clbtl_inner, sic;
	clbtl = document.getElementById("clbtl");
	if(clbtl){
		if(clbtl.innerHTML==""){return;}
		sic = document.getElementById("sic");
		if(sic){
			if(document.getElementById("nvq")){
				clbtl_inner = clbtl.innerHTML + " - ";
			}else{
				clbtl_inner = clbtl.innerHTML;
			}
			clbtl.innerHTML = "";
			sic.parentNode.innerHTML = clbtl_inner + sic.parentNode.innerHTML;
		}
	}
}

/**
 * ----------------
 * Create All Global Variables
 * required functions(): 
 *	setCookie(), getCookie() 
 * ----------------
 */
function both_get_globals(){


	if(getCookie("GMAIL_IK")!=null || getCookie("GMAIL_IK")!=""){
		G_IK = getCookie("GMAIL_IK");	
	}
	if(getCookie("PLAXO_IDENTIFIER")!=null || getCookie("PLAXO_IDENTIFIER")!=""){
		P_IDENTIFIER = getCookie("PLAXO_IDENTIFIER");
	}
	if(getCookie("PLAXO_AUTHMETHOD")!=null || getCookie("PLAXO_AUTHMETHOD")!=""){
		P_AUTHMETHOD = getCookie("PLAXO_AUTHMETHOD");
	}
	if(getCookie("PLAXO_PASSWORD")!=null || getCookie("PLAXO_PASSWORD")!=""){
		P_PASSWORD = getCookie("PLAXO_PASSWORD");
	}
	if(getCookie("PLAXO_REMEMBER_ME")!=null || getCookie("PLAXO_REMEMBER_ME")!=""){
		P_REMEMBER_ME = getCookie("PLAXO_REMEMBER_ME");
	}
}

/**
 * ----------------
 * make Plaxo dialog
 * required functions(): 
 *	getCookie()
 * ----------------
 */
function gmail_create_popup_dialog(){

	var p_is_checked,p_identifier,p_password;
	
	var p_remember = getCookie("PLAXO_REMEMBER_ME");

	if(p_remember=="true"){
		p_identifier = getCookie("PLAXO_IDENTIFIER");
		p_password = getCookie("PLAXO_PASSWORD");
		p_is_checked = ' checked="checked"';
	}else{
		p_identifier = "";
		p_password = "";
		p_is_checked = "";
	}
 
	var dialogbody = document.createElement("div");
	dialogbody.setAttribute("id", "box");
	dialogbody.style.display="none";
	
	dialogbody.innerHTML = ''+
	'<form name="plaxo_login" id="plaxo_login" onsubmit="return false;">'+
	'    <table>'+
	'      <tbody>'+
	'        <tr valign="top">'+
	'          <td style="border: 1px solid rgb(29, 122, 201); padding:10px;background: rgb(230, 241, 251) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;" width="350">'+
	'            <table>'+
	'              <tbody>'+
	'                <tr>'+
	'                  <td rowspan="2"><img src="'+loginImg+'" height="33" width="240"></td>'+
	'                  <td width="96">&nbsp;</td>'+
	'                  <td><img id="dialog_close_x" border="0" src="'+closeImg+'" height="13" width="14" alt="Close button" title="Close Sign In Dialog"></td>'+
	'                </tr>'+
	'                <tr>'+
	'                  <td colspan="2" width="110">&nbsp;</td>'+
	'                </tr>'+
	'		 <tr>'+
	'                  <td nowrap="nowrap" colspan="3" width="350" style="color: red; font-family: Verdana, Arial, Helvetica, SunSans-Regular, sans-serif; '+
	'			 font-size: 11px; line-height: 16px"><div id="p_login_alert"><br></div></td>'+
	'		</tr>'+
	'              </tbody>'+
	'            </table>'+
	'		   <div id="container">'+
	'		    <b class="rtop">'+
	'		    <b class="r1"></b> <b class="r2"></b> <b class="r3"></b> <b class="r4"></b></b>'+
	'            <table bgcolor="#f6f9fd" width="360">'+
	'              <tbody>'+
	'                <tr>'+
	'                  <td align="right" nowrap="nowrap" width="120" class="p_form_text"><label for="signin_email"><span id="signin_label">E-mail / AOL Login</span>:</label></td>'+
	'                  <td><input size="30" id="signin_email" name="signin_email" class="p_form_input" type="text" value="'+p_identifier+'"></td>'+
	'                </tr>'+
	'                <tr>'+
	'                  <td align="right" class="p_form_text"><label for="signin_password"><span id="password_label">Password</span>:</label></td>'+
	'                  <td><input size="30" id="signin_password" name="signin_password" class="p_form_input" type="password" value="'+p_password+'"></td>'+
	'                </tr>'+
	'                <tr>'+
	'                   <td align="right" class="p_form_text"><input name="signin_keeplive" id="signin_keeplive" value="1" type="checkbox"'+p_is_checked+'></td>'+
	'                   <td class="p_form_text"><label for="keeplive">Remember me on this computer.</label></td>'+
	'                 </tr>'+
	'                 <tr>'+
	'                    <td>&nbsp;</td>'+
	'                    <td><button id="dialog_sign_in">Sign In</button>&nbsp;<button id="dialog_cancel">Cancel</button></td>'+
	'                 </tr>'+
	'              </tbody>'+
	'            </table>'+
	'		    <b class="rbottom">'+
	'		    <b class="r4"></b> <b class="r3"></b> <b class="r2"></b> <b class="r1"></b></b>'+
	'		   </div>'+
	'          </td>'+
	'        </tr>'+
	'    </table>'+
	'</form>';

	document.body.insertBefore(dialogbody,document.body.firstChild);
}
/**
 * ----------------
 * checks login for mistakes, sets most of the connection cookies
 * required functions(): 
 *	plaxo_guid_login(),plaxo_uhid_login(),plaxo_get_folders()
 * ----------------
 */

function plaxo_sign_in(){
	
	var p_login_form = document.getElementById('plaxo_login');

	if(p_login_form){

		var siLogintype ='';
		// form will always be the first form on this page because we inject it
		var siEmail=document.forms[0].elements[0].value;
		var siPW=document.forms[0].elements[1].value;
		var siRemember=document.forms[0].elements[2].checked;
		var siEmailchk = siEmail.toLowerCase();

		if(siEmailchk==''){
			document.getElementById('p_login_alert').innerHTML='Enter your AOL screen name or registered e-mail address.';
			return false;

		}else if(siPW==''){
			document.getElementById('p_login_alert').innerHTML='Please enter your password.';
			return false;
		}else{
			if(siEmailchk.indexOf('@')==-1){			
				siLogintype = "AOL";
			}else{
				siLogintype = "Plaxo";
			}
			if(getCookie("PLAXO_GUID")==null && getCookie("PLAXO_UHID")==null){
				plaxo_guid_login(siEmail,siLogintype,siPW,siRemember);
			}else if(getCookie("PLAXO_GUID")!=null && (getCookie("PLAXO_UHID")==null||getCookie("PLAXO_UHID")=="")){
				plaxo_uhid_login(siEmail,siLogintype,siPW,siRemember);
			}else{
				plaxo_get_folders();
			}
		}
	}
}


function plaxo_guid_login(identifier,authmethod,password,remember){
// use current login
	P_IDENTIFIER = identifier;
	P_AUTHMETHOD = authmethod;
	P_PASSWORD = password;
	P_REMEMBER_ME = remember;
		
	if(getCookie("PLAXO_GUID")==null){
		var Url = 	"['Header','ProtoVer','"+P_PROTOVER+"','Client','"+P_CLIENT+"','OS','"+P_OS+"','Platform','"+P_PLATFORM+"']%0a"+
				"['/Header']%0a"+
				"['CreateGUID']%0a"+
				"['/CreateGUID']";


		plaxo_xmlhttpRequest(Url,1);

		Url = null;
	}
}


function plaxo_uhid_login(identifier,authmethod,password,remember){
	if(P_IDENTIFIER!=identifier || P_PASSWORD!=password){
		if(getCookie("PLAXO_UHID")!=null){
			deleteCookie("PLAXO_UHID");
		}
		if(getCookie("PLAXO_FOLDER_ID")!=null){
			deleteCookie("PLAXO_FOLDER_ID");
		}
		if(getCookie("PLAXO_FOLDER_DISPLAYNAME")!=null){
			deleteCookie("PLAXO_FOLDER_DISPLAYNAME");
		}
		if(getCookie("PLAXO_LASTANCHOR")!=null){
			deleteCookie("PLAXO_LASTANCHOR");
			deleteCookie("PLAXO_NEXTANCHOR");
		}
	}

	// use current login
	P_IDENTIFIER = identifier;
	P_AUTHMETHOD = authmethod;
	P_PASSWORD = password;
	P_REMEMBER_ME = remember;
		
	if(getCookie("PLAXO_UHID")==null||getCookie("PLAXO_UHID")==""){
		var Url = 	"['Header','ProtoVer','"+P_PROTOVER+"','ClientID','"+getCookie("PLAXO_GUID")+"','Identifier','"+P_IDENTIFIER+"','AuthMethod','"+P_AUTHMETHOD+"','Password','"+P_PASSWORD+"','Client','"+P_CLIENT+"','OS','"+P_OS+"','Platform','"+P_PLATFORM+"']%0a"+
				"['/Header']";	

		plaxo_xmlhttpRequest(Url,0);

		Url = null;
	}	
}


function plaxo_get_folders(){
	if(getCookie("PLAXO_FOLDER_ID")==null||getCookie("PLAXO_FOLDER_ID")==""){
		var Url = 	"['Header','ProtoVer','"+P_PROTOVER+"','ClientID','"+getCookie("PLAXO_GUID")+"','Uhid','"+getCookie("PLAXO_UHID")+"','Password','"+getCookie("PLAXO_PASSWORD")+"','Client','"+P_CLIENT+"','OS','"+P_OS+"','Platform','"+P_PLATFORM+"']%0a"+
				"['/Header']%0a"+
				"['Get','Type','folder','Target','folders']['/Get']";

		plaxo_xmlhttpRequest(Url,1);


		// if logging in from settings screen
		var tr2 = document.getElementById("tr2")
		if(tr2){
			tr2.innerHTML = SETTINGS_SIGNED_IN;
		}
		Url = null;
	}
}

function plaxo_map_results(PlaxoID,GmailID){
		var Url= 	"['Header','ProtoVer','"+P_PROTOVER+"','ClientID','"+getCookie("PLAXO_GUID")+"','Uhid','"+getCookie("PLAXO_UHID")+"','Password','"+getCookie("PLAXO_PASSWORD")+"','Client','"+P_CLIENT+"','OS','"+P_OS+"','Platform','"+P_PLATFORM+"']%0a"+
				"['/Header']%0a"+
				"['Map','Target','"+getCookie("PLAXO_FOLDER_DISPLAYNAME")+"','Source','"+G_CONTACTS+"']%0a"+
				"['MapItem','Type','contact','ServerItemID','"+PlaxoID+"','ItemID','"+GmailID+"']%0a"+
				"['/Map']";

		plaxo_xmlhttpRequest(Url,3);
		Url = null;
}

function my_plaxo_ping(){
	if(getCookie("PLAXO_UHID")==null||getCookie("PLAXO_UHID")==""){
		GM_log("PLAXO PING: Not logged in to Plaxo.");
		return false;
	}else if(getCookie("PLAXO_FOLDER_ID")==null||getCookie("PLAXO_FOLDER_ID")==""){
		GM_log("PLAXO PING: Not logged in to Plaxo.");
		return false;
	}else if(getCookie("PLAXO_NEEDS_SLOW_SYNC")==1||getCookie("PLAXO_NEEDS_SLOW_SYNC")==null){
		GM_log("PLAXO PING: Can only ping after initial slow sync is performed.");
		return false;
	}else if(getCookie("CHK_GMAIL")=="false"){
		GM_log("PLAXO PING: Bypassing...");
		return false;
	}else{

		var Url= 	"['Header','ProtoVer','"+P_PROTOVER+"','ClientID','"+getCookie("PLAXO_GUID")+"','Uhid','"+getCookie("PLAXO_UHID")+"','Client','"+P_CLIENT+"','OS','"+P_OS+"','Platform','"+P_PLATFORM+"']%0a"+
				"['/Header']%0a"+
				"['Ping','Target','"+getCookie("PLAXO_FOLDER_DISPLAYNAME")+"','Source','"+G_CONTACTS+"']%0a"+
				"['/Ping']";
	
		plaxo_xmlhttpRequest(Url,5);

		Url = null;
	}
}

function my_gmail_ping(){

		var Url = "?&ik="+getCookie("GMAIL_IK")+"&view=cl&search=contacts&pnl=a&zx="+gmail_proxy_defeat();

		gmail_get_contact_list(Url);

		Url = null;
	
}

function both_sync(type,hex){
	var hex = hex;
	if(!hex||hex==null){var hex="";}

	//here is where we start
	if(type.toLowerCase()=="slow"){
		
		if(getCookie("PLAXO_NEEDS_SLOW_SYNC")==1){
			if(confirm('WARNING! This may change your Gmail contacts data, and customized fields to make it compatable with Plaxo. We recommend you export a copy of your contacts before continuing.\n\n\nClick "OK" to begin sync with Plaxo.')){

				gmail_start_animation();

				setCookie("PLAXO_LASTANCHOR",0,expdate,"/");
				setCookie("PLAXO_NEXTANCHOR",1,expdate,"/");

				setCookie("PLAXO_NEEDS_SLOW_SYNC",0,expdate,"/");


				// if we have not left a page where the sync has previously happened
				// reset all the variables for initial slow sync
				P_CONTACTS_COUNT = 0;
				P_CONTACTS_LENGTH = 0;
				P_HEX_CHECK = "";

				var Url= 	"['Header','ProtoVer','"+P_PROTOVER+"','ClientID','"+getCookie("PLAXO_GUID")+"','Uhid','"+getCookie("PLAXO_UHID")+"','Password','"+getCookie("PLAXO_PASSWORD")+"','Client','"+P_CLIENT+"','OS','"+P_OS+"','Platform','"+P_PLATFORM+"']%0a"+
						"['/Header']%0a"+
						"['Sync','Target','"+getCookie("PLAXO_FOLDER_DISPLAYNAME")+"','Source','"+G_CONTACTS+"','LastAnchor','"+getCookie("PLAXO_LASTANCHOR")+"','NextAnchor','"+getCookie("PLAXO_NEXTANCHOR")+"']%0a"+
						"['/Sync']";
			
							
				GM_log("Plaxo INITIAL SUBMIT: " + Url);
		
				plaxo_xmlhttpRequest(Url,4);			
				Url = null;
			}else{
				setCookie("PLAXO_NEEDS_SLOW_SYNC",0,expdate,"/");
				return false;
			}
			
		}else{
			setCookie("PLAXO_NEEDS_SLOW_SYNC",1,expdate,"/");
			both_sync("Slow");
		}
	}
	if(type.toLowerCase()=="ping"){

		// stop the ping & send the blank!!
		P_CONTACTS_COUNT = 0;
		P_CONTACTS_LENGTH = 0;

		plaxo_anchor_advance();

		Url= 	"['Header','ProtoVer','"+P_PROTOVER+"','ClientID','"+getCookie("PLAXO_GUID")+"','Uhid','"+getCookie("PLAXO_UHID")+"','Password','"+getCookie("PLAXO_PASSWORD")+"','Client','"+P_CLIENT+"','OS','"+P_OS+"','Platform','"+P_PLATFORM+"']%0a"+
			"['/Header']%0a"+
			"['Sync','Target','"+getCookie("PLAXO_FOLDER_DISPLAYNAME")+"','Source','"+G_CONTACTS+"','LastAnchor','"+getCookie("PLAXO_LASTANCHOR")+"','NextAnchor','"+getCookie("PLAXO_NEXTANCHOR")+"']%0a"+
			"['/Sync']";
												
		GM_log("Plaxo PING SUBMIT: " + Url);
		
		plaxo_xmlhttpRequest(Url,4);
		Url = null;

	}
	if( (type.toLowerCase()=="add" || type.toLowerCase()=="replace") && hex!=""){

		Url = "?&ik="+getCookie("GMAIL_IK")+"&search=contacts&ct_id="+hex+"&cvm=2&view=ct&zx="+gmail_proxy_defeat();
		
		GM_log("Gmail Gather Data: "+type.toUpperCase()+" SUBMIT: " + Url);

		gmail_process_sync(Url,type);
		
		Url = null;
		

	}
	if(type.toLowerCase()=="delete" && hex!=""){

		plaxo_anchor_advance();

		Url= 	"['Header','ProtoVer','"+P_PROTOVER+"','ClientID','"+getCookie("PLAXO_GUID")+"','Uhid','"+getCookie("PLAXO_UHID")+"','Password','"+getCookie("PLAXO_PASSWORD")+"','Client','"+P_CLIENT+"','OS','"+P_OS+"','Platform','"+P_PLATFORM+"']%0a"+
			"['/Header']%0a"+
			"['Sync','Target','"+getCookie("PLAXO_FOLDER_DISPLAYNAME")+"','Source','"+G_CONTACTS+"','LastAnchor','"+getCookie("PLAXO_LASTANCHOR")+"','NextAnchor','"+getCookie("PLAXO_NEXTANCHOR")+"']%0a"+
			"['Delete','Type','Contact','ItemID','"+hex+"']%0a"+
			"['/Sync']";

		GM_log("Plaxo DELETE SUBMIT: " + Url);
			
		plaxo_xmlhttpRequest(Url,2);
		Url = null;

	}
}

function gmail_replace_sync(){
	var formEntries, hex;
	formEntries = xpath('//input[@name="ct_id"]');
		
	for (var i=0; i<formEntries.snapshotLength; i++){
		hex = formEntries.snapshotItem(i).value;		
	}
	if(hex!="" && hex!=-1){
		window.setTimeout( function(){ both_sync("Replace",hex) },1000);
	}
}

/**
 * ----------------
 * processing plaxo xmlhttp requests
 * ----------------
 */

function plaxo_xmlhttpRequest(Url,num){
	if (!GM_xmlhttpRequest) {
    		alert('Please upgrade to the latest version of Greasemonkey.\n\nhttp://diveintogreasemonkey.org/');
    		return;
	}
	GM_xmlhttpRequest({
		method: 'POST',
		url: P_HTTP_LOCATION+Url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatable) Greasemonkey',
			'Accept': B_HTTP_ACCEPT,
		},
		onload: function(responseDetails) {

			if(responseDetails.status==200){
				if(num == 4 || num == 3){
					if(getCookie("CHK_GMAIL")!="false"){
						setCookie("CHK_GMAIL","false",expdate,"/");
					}
				}
				plaxo_translate_to_gmail(responseDetails.responseText,num);
			}else{
				GM_log("Error: "+responseDetails.responseText)
			}		
		}
	});
}
/**
 * ----------------
 * my little plaxo parsing workhorse
 * ----------------
 */
function plaxo_translate_to_gmail(response,num){
	var fixed = [];
	var final = [];

	response = response.split("\n");
	for (i=0;i<response.length;i++){
		response[i] = replaceStr(response[i],"], ['Data'","");
		response[i] = replaceStr(response[i],"'Item', 'Type'","'Item', 'TypeID'");
		fixed[i] = eval(response[i]);
		if(fixed[i]!="/Header"&&fixed[i]!="/Status"&&fixed[i]!="/Sync"&&fixed[i]!="/Item"&&fixed[i]!=undefined){
			final[final.length] = fixed[i];
		}
	}
	response = null;
	fixed = null;

	var _header,_status,_sync,_item,_add,_delete;	
	for(i=0;i<final.length;i++){
		if(final[i][0].toLowerCase()=="header"){
			_header = eval("_header={" + returnObjReady(final[i],false) + "};");
		}
		if(final[i][0].toLowerCase()=="status"){
			_status= eval("_status={" + returnObjReady(final[i],false) + "};");
			if(num!=5){
				GM_log("Plaxo4Gmail "+num+"..."+_status.Message);
			}
			if(_status.Code==200){
				if(num==5){//pinging
					GM_log("PLAXO PING: "+_status.Message)
				}
				if(num==4){//slow sync-fast sync initial check

				}
				if(num==3){//add - mapping new back to plaxo

					P_CONTACTS_COUNT++;

					GM_log("P_CONTACTS_COUNT:"+P_CONTACTS_COUNT +" == P_CONTACTS_LENGTH:"+ P_CONTACTS_LENGTH);
					window.status = "Gmail matched contacts. Mapping "+P_CONTACTS_COUNT+" of "+P_CONTACTS_LENGTH+" contacts with Plaxo...";

					if(P_CONTACTS_COUNT == P_CONTACTS_LENGTH){
						window.setTimeout(function() {
							gmail_reset_plaxo_link();							
							window.status = "Sync Complete";
							GM_log("sync complete");					

							window.setTimeout(function(){
								window.status = "Done";
								if(self.name.indexOf('v')!=-1){
									self.location.reload(true);
								}								
							},2000);

							P_CONTACTS_COUNT = 0;
							P_CONTACTS_LENGTH = 0;

						},2000);
					}
				}
				
			}
			if(_status.Code==205){// ping returned need update
				if(num==5){
					GM_log("PLAXO PING: "+_status.Message);
					both_sync("Ping");
				}
			}
			if(_status.Code==412){// bad anchor
				GM_log("Bad Anchor");
				if(num==4){
					deleteCookie("PLAXO_LASTANCHOR");
					deleteCookie("PLAXO_NEXTANCHOR");
				}
				if(num==3){
					P_CONTACTS_COUNT++;
					if(P_CONTACTS_COUNT == P_CONTACTS_LENGTH){
						window.setTimeout(function() {
							gmail_reset_plaxo_link();							
							window.status = "Sync Could not complete. " + _status.Message;
							GM_log("sync complete");

							P_CONTACTS_COUNT = 0;
							P_CONTACTS_LENGTH = 0;
						},2000);
					}
				}
				return false;
			}
			if(_status.Code==500){
				if(num==3){
					P_CONTACTS_COUNT++;
					if(P_CONTACTS_COUNT == P_CONTACTS_LENGTH){
						window.setTimeout(function() {
							gmail_reset_plaxo_link();							
							window.status = "Sync Could not complete. " + _status.Message;
							GM_log("sync complete");					

							P_CONTACTS_COUNT = 0;
							P_CONTACTS_LENGTH = 0;
						},2000);
					}
				}
			}
			if(num==0){//log in
				if(_status.Code!=200){
					var plaxo_failed = _status.Message;
					plaxo_failed = replaceStr(plaxo_failed,"401: ","");
					plaxo_failed = replaceStr(plaxo_failed,"404: ","");
					plaxo_failed = replaceStr(plaxo_failed,"Authentication failed.","Please try again.");
					plaxo_failed = replaceStr(plaxo_failed,"Operation Forbidden.","Please try again.");
					document.getElementById('p_login_alert').innerHTML = plaxo_failed;
					return false;
				}else{
					if(P_REMEMBER_ME==true){
						setCookie("PLAXO_UHID",_header.Uhid,expdate,"/");
						setCookie("PLAXO_IDENTIFIER",P_IDENTIFIER,expdate);
						setCookie("PLAXO_AUTHMETHOD",P_AUTHMETHOD,expdate);
						setCookie("PLAXO_PASSWORD",P_PASSWORD,expdate);
						setCookie("PLAXO_REMEMBER_ME",P_REMEMBER_ME,expdate,"/");
					}else{
						setCookie("PLAXO_UHID",_header.Uhid);
						setCookie("PLAXO_IDENTIFIER",P_IDENTIFIER);
						setCookie("PLAXO_AUTHMETHOD",P_AUTHMETHOD);	
						setCookie("PLAXO_PASSWORD",P_PASSWORD);
						setCookie("PLAXO_REMEMBER_ME",P_REMEMBER_ME, expdate,"/");
					}
					document.getElementById('p_login_alert').innerHTML = "<br>";
					if(document.getElementById('my_plaxo_login')){
						var plaxoLogin = document.getElementById('my_plaxo_login');
						plaxoLogin.innerHTML = G_LANG_SYNC_NOW;
						plaxoLogin.setAttribute("id", "my_plaxo_sync");
								
						hm('box');
						plaxo_get_folders();
						return false;
					}
				}
			}
			_status = null;
		}
		if(final[i][0].toLowerCase()=="sync"){
			_sync = eval("_sync={" + returnObjReady(final[i],false) + "};");
				// code here really not needed but for sake of continuity
			_sync = null;
		}
		if(final[i][0].toLowerCase()=="item"){
			var _item;
			_item = eval("_item={" + returnObjReady(final[i],false) + "};");
			if(_item.TypeID=="GUID"){
				setCookie("PLAXO_GUID",_item.GUID,expdate,"/");
				plaxo_uhid_login(P_IDENTIFIER,P_AUTHMETHOD,P_PASSWORD,P_REMEMBER_ME);
			}
			if(_item.TypeID=="Folder"){
				if(_item.Type==0 && _item.IsDefault==1){
					if(P_REMEMBER_ME==true){
						setCookie("PLAXO_FOLDER_ID", _item.FolderID, expdate, "/");
						setCookie("PLAXO_FOLDER_DISPLAYNAME", _item.DisplayName, expdate, "/");
					}else{
						setCookie("PLAXO_FOLDER_ID", _item.FolderID);
						setCookie("PLAXO_FOLDER_DISPLAYNAME", _item.DisplayName);
					}
				}
			}
			_item = null;
		}
		if(num==4){			
			if(final[i][0].toLowerCase()=="add"||final[i][0].toLowerCase()=="replace"){				
/*-----------------------------------------------------------*/
				P_CONTACTS_LENGTH++;
/*-----------------------------------------------------------*/
				_add = eval("_add={" + returnObjReady(final[i],true) + "};");				
				Url = makeGmailAddRemoveUrl(_add.ItemID,_add.DisplayName,_add.Notes,_add.PersonalPhoto,_add.BusinessPhoto,_add.PersonalEmail,_add.PersonalEmail2,_add.PersonalEmail3,
								_add.PersonalMobilePhone,_add.HomePhone,_add.HomePhone2,_add.HomeFax,_add.PersonalIM,
								_add.PersonalWebPage,_add.SpouseName,_add.Anniversary,_add.Birthday,_add.HomeAddress,
								_add.HomeAddress2,_add.HomeAddress3,_add.HomeCity,_add.HomeState,_add.HomeZipCode,
								_add.HomeCountry,_add.Company,_add.Department,_add.JobTitle,_add.BusinessEmail,
								_add.BusinessEmail2,_add.BusinessEmail3,_add.BusinessMobilePhone,_add.WorkPhone,_add.WorkPhone2,
								_add.WorkFax,_add.WorkPager,_add.BusinessIM,_add.BusinessWebPage,_add.AssistantName,_add.AssistantPhone,
								_add.ManagerName,_add.WorkAddress,_add.WorkAddress2,_add.WorkAddress3,_add.WorkCity,_add.WorkState,
								_add.WorkZipCode,_add.WorkCountry,_add.OtherPhone,_add.OtherFax,_add.NickName,_add.Category,
								_add.AIMScreenName,_add.SkypeID,_add.SkypeIn,_add.ServerItemID,_add.OtherAddress,_add.OtherAddress2,
								_add.OtherAddress3,_add.OtherCity,_add.OtherState,_add.OtherZipCode,_add.OtherCountry);
				
				Url = Url.split("|");
				var GmailID  = Url[1];
				var PlaxoID = Url[2];
				if(GmailID!=-1 && GmailID!=""){
			/*--------------------REPLACEMENT------------------------*/
					GM_log("replacing or adding:" + GmailID);
					
					P_HEX_CHECK+=GmailID+"|";

					parent.document.getElementById('hst').src = Url[0];
					
					if(final[i][0].toLowerCase()=="add"){
						plaxo_map_results(PlaxoID,GmailID);
					}else if(final[i][0].toLowerCase()=="replace"){
						P_CONTACTS_LENGTH--;
					}
				}else{
			/*--------------------   ADD and map  --------------------*/
					GM_log("adding:"+GmailID);
					
					// the contact does not exist
					// we need to get its GmailID for mapping

					gmail_process_sync(Url[0],"GetID");
						
				}			
				_add = null;
			}
			if(final[i][0].toLowerCase()=="delete"){
			/*--------------------   DELETING ------------------------*/
				_delete = eval("_delete={" + returnObjReady(final[i],false) + "};");

				GM_log("deleting: "+_delete.ItemID);
	
				var Url = "?ik=" + getCookie("GMAIL_IK") +
					"&ik=" + getCookie("GMAIL_IK") +
					"&view=cl" +
					"&search=contacts"+
					"&pnl=a"+
					"&zx=" + gmail_proxy_defeat('nodash') +
					"&act=dc" +
					"&c="+ _delete.ItemID +
					"&at=" + getCookie("GMAIL_AT") +
					"&zx=" + gmail_proxy_defeat('nodash');
					
				parent.document.getElementById('hst').src = Url;
				
				_delete = null;
			}		
		}
	}
	if(num==4){
		// this insures after a plaxo initiated change is done, the gmail ping ignores doing the next check
		setCookie("CHK_GMAIL","true",expdate,"/");
		// if plaxo is empty...
		if(P_CONTACTS_LENGTH==0){
			gmail_reset_plaxo_link();							
			window.status = "Done";
			GM_log("done");
		}
		// if this is a slow sync, run the ping check, this will make sure all plaxo entries are in 
		// gmail and all gmail entries are in plaxo
		if(getCookie("PLAXO_LASTANCHOR")==0){
			setCookie("CHK_GMAIL","false",expdate,"/");
			// were adding or removing
			var _plaxo = "";
			if(P_HEX_CHECK!=""){
				_plaxo = P_HEX_CHECK.substring(0,P_HEX_CHECK.lastIndexOf('|'));
			}
			GM_log("PLAXO HEXS:"+_plaxo);
			var _gmail = getCookie("GMAIL_HEX_CHECK");
			if(_gmail==null){_gmail=""}
			GM_log("GMAIL HEXS:"+_gmail);
			if(G_CONTACTS_LENGTH>P_CONTACTS_LENGTH){
				gmail_update_plaxo(_plaxo,_gmail);
			}
		}
	}
}
/*-----------------------------------------------------------*/


/**
 * ----------------
 * gmail process sync makes sure our last gmail req is finished before trying to send the next one, faster processing
 * ----------------
 */
function gmail_process_sync(url,type){
	if(WINDOW_CLOSED == false){
			gmail_xmlhttpRequest(url,type);
	}else{
		window.setTimeout(function(){ gmail_process_sync(url,type) },50);
	}
}

/**
 * ----------------
 * plaxo_process_sync waits until there is a sending gap with gmail to slip in a req to plaxo
 * ----------------
 */
function plaxo_process_sync(syncbody){
	if(WINDOW_CLOSED == false){
		plaxo_anchor_advance();			

		Url=		"['Header','ProtoVer','"+P_PROTOVER+"','ClientID','"+getCookie("PLAXO_GUID")+"','Uhid','"+getCookie("PLAXO_UHID")+"','Password','"+getCookie("PLAXO_PASSWORD")+"','Client','"+P_CLIENT+"','OS','"+P_OS+"','Platform','"+P_PLATFORM+"']%0a"+
				"['/Header']%0a"+
				"['Sync','Target','"+getCookie("PLAXO_FOLDER_DISPLAYNAME")+"','Source','"+G_CONTACTS+"','LastAnchor','"+getCookie("PLAXO_LASTANCHOR")+"','NextAnchor','"+getCookie("PLAXO_NEXTANCHOR")+"']%0a"+syncbody;

		GM_log("Plaxo SUBMIT: " + Url);

		plaxo_xmlhttpRequest(Url,2);

		Url=null;
	}else{
		window.setTimeout(function(){ plaxo_process_sync(syncbody) },50);
	}
}


/**
 * ----------------
 * gmail_xmlhttpRequest is used primarily to deconstruct gmail address book entries and create the proper plaxo response
 * the getID function is particularly clever as we make a new entry into gmail, retrieve its assigned hex ID and map it back to plaxo, make an adj
 * to the gmail data and resubmit it back to gmail. Gmail "all contacts" wont open the new entry when clicked on if new contact just added by xmlhttp method 
 * alone. However when we resubmit it with a change it fixes that issue. 
 * ----------------
 */
var WINDOW_CLOSED = false;
function gmail_xmlhttpRequest(Url,type){
var xUrl = Url;
	GM_xmlhttpRequest({
		method: 'GET',
		url: G_HTTP_LOCATION+Url,
		headers: {
			'User-agent': 'Mozilla/5.0 (compatable) Greasemonkey',
			'Accept': B_HTTP_ACCEPT,
		},
		onreadystatechange: function(responseDetails){
			if(responseDetails.readyState==1){
				//loading
				WINDOW_CLOSED = true;
			}
		},
		onload: function(responseDetails) {

			if(responseDetails.status==200){				

				var datapack = "";
				datapack = gmail_response_snip(responseDetails.responseText);
				//GM_log("Datapack: "+datapack);

				var rDrT = eval(datapack);

				var _gmailObj = {ItemID:"",DisplayName:"",Title:"",DefaultEmail:"",Notes:"",PersonalAddress:"",PersonalAddress2:"",PersonalCity:"",PersonalState:"",PersonalZipCode:"",PersonalCountry:"",PersonalEmail:"",PersonalEmail2:"",PersonalEmail3:"",PersonalIM:"",PersonalPhone:"",PersonalPhone2:"",PersonalMobilePhone:"",PersonalFax:"",PersonalWebpage:"",SkypeID:"",SkypeIn:"",WorkAddress:"",WorkAddress2:"",WorkCity:"",WorkState:"",WorkZipCode:"",WorkCountry:"",WorkEmail:"",WorkEmail2:"",WorkEmail3:"",WorkIM:"",WorkPhone:"",WorkPhone2:"",WorkMobilePhone:"",WorkPager:"",WorkFax:"",Company:"",JobTitle:"",WorkWebpage:"",OtherAddress:"",OtherAddress2:"",OtherCity:"",OtherState:"",OtherZipCode:"",OtherCountry:"",OtherPhone:"",OtherFax:"",OtherEmail:"",Aim:"",Anniversary:"",Birthday:"",SpouseName:"",AssistantName:"",AssistantPhone:"",Department:"",ManagerName:"",NickName:"",Category:"",PlaxoID:""};
				// these can have multiple items in gmail
				var hAddrLineCount = 0;
				var wAddrLineCount = 0;
				var oAddrLineCount = 0;

				var hEmailCount = 1;
				var wEmailCount = 1;
				var hPhoneCount = 1;
				var wPhoneCount = 1;

				// only can have 1 of the following for Plaxo
				var hIm = 0;
				var hMobilePhone = 0;
				var hFax = 0;
				var hWebpage = 0;

				var wIm = 0;
				var wMobilePhone = 0;
				var wPager = 0;
				var wFax = 0;
				var wWebpage = 0;

				var oCompany = 0;
				var oJobTitle = 0;
				var oPhone = 0;
				var oFax = 0;
				var oPhoto = 0;

				var oAnniversary = 0;
				var oBirthday = 0;
				var oTitle = 0;
				var oSpouse = 0;
				var oAim = 0;
				var oAssistant = 0;
				var oAssistantPhone = 0;
				var oDepartment = 0;
				var oManager = 0;
				var oSkypeID = 0;
				var oSkypeIn = 0;
				var oNickname = 0;
				var oCategories = 0;
				var oPlaxoID = 0;

				for(i=0;i<rDrT.length;i++){
					if(i==1){
						_gmailObj.ItemID = rDrT[i];
					}else if(i==2){
						_gmailObj.DisplayName = rDrT[i];
					}else if(i==4){
						_gmailObj.DefaultEmail = rDrT[i];
					}else if(i==7){
						if(rDrT[i].length == 2){
							var a;
						// gmail uses notes as a catch all
						// this field will need to be parsed and paired, compaired with accepted fields and made into the gmail object
						// Notes
							a = rDrT[i][1].split('\r\n');
							if(a.length==1){
								a="";
								a = rDrT[i][1].split('\n');
							}
							if(a.length==1){
								if(a[0].indexOf(":")==-1){
									_gmailObj.Notes += a[0];
								}else{
									a[0] = replaceStr(a[0],": ",":");
									a[0] = replaceStr(a[0]," :",":");
									var note = a[0].split(":");
									if(note[0].toLowerCase()=="notes"){_gmailObj.Notes = note[1];}
									if(note[0].toLowerCase()=="web page"){if(wWebpage==0){if(note.length==3){_gmailObj.WorkWebpage = note[1]+":"+note[2];}else{_gmailObj.WorkWebpage = note[1];}wWebpage = 1;}else{if(hWebpage==0){if(note.length==3){_gmailObj.PersonalWebpage = note[1]+":"+note[2];}else{_gmailObj.PersonalWebpage = note[1];}hWebpage = 1;}}}
									if(note[1].toLowerCase()=="web page"){if(wWebpage==0){if(note.length==4){_gmailObj.WorkWebpage = note[2]+":"+note[3];}else{_gmailObj.WorkWebpage = note[2];}wWebpage = 1;}else{if(hWebpage==0){if(note.length==4){_gmailObj.PersonalWebpage = note[2]+":"+note[3];}else{_gmailObj.PersonalWebpage = note[2];}hWebpage = 1;}}}
									if(note[0].toLowerCase()=="screen name"){if(oAim == 0){_gmailObj.Aim = note[1];oAim = 1;}}
									if(note[1].toLowerCase()=="screen name"){if(oAim == 0){_gmailObj.Aim = note[2];oAim = 1;}}
									if(note[0].toLowerCase()=="anniversary"){if(oAnniversary==0){_gmailObj.Anniversary = processDate(note[1]);oAnniversary = 1;}}
									if(note[1].toLowerCase()=="anniversary"){if(oAnniversary==0){_gmailObj.Anniversary = processDate(note[2]);oAnniversary = 1;}}
									if(note[0].toLowerCase()=="birthday"){if(oBirthday==0){_gmailObj.Birthday = processDate(note[1]);oBirthday = 1;}}
									if(note[1].toLowerCase()=="birthday"){if(oBirthday==0){_gmailObj.Birthday = processDate(note[2]);oBirthday = 1;}}
									if(note[0].toLowerCase()=="title"){if(oTitle==0){_gmailObj.Title = note[1]+" ";oTitle = 1;}}
									if(note[1].toLowerCase()=="title"){if(oTitle==0){_gmailObj.Title = note[2]+" ";oTitle = 1;}}
									if(note[0].toLowerCase()=="spouse"){if(oSpouse==0){_gmailObj.SpouseName = note[1];oSpouse = 1;}}
									if(note[1].toLowerCase()=="spouse"){if(oSpouse==0){_gmailObj.SpouseName = note[2];oSpouse = 1;}}
									if(note[0].toLowerCase()=="assistant"){if(oAssistant==0){_gmailObj.AssistantName = note[1];oAssistant = 1;}}
									if(note[1].toLowerCase()=="assistant"){if(oAssistant==0){_gmailObj.AssistantName = note[2];oAssistant = 1;}}
									if(note[0].toLowerCase()=="asst. phone"){if(oAssistantPhone==0){_gmailObj.AssistantPhone = note[1];oAssistantPhone = 1;}}
									if(note[1].toLowerCase()=="asst. phone"){if(oAssistantPhone==0){_gmailObj.AssistantPhone = note[2];oAssistantPhone = 1;}}
									if(note[0].toLowerCase()=="department"){if(oDepartment==0){_gmailObj.Department = note[1];oDepartment = 1;}}
									if(note[1].toLowerCase()=="department"){if(oDepartment==0){_gmailObj.Department = note[2];oDepartment = 1;}}
									if(note[0].toLowerCase()=="manager"){if(oManager == 0){_gmailObj.ManagerName = note[1];oManager = 1;}}
									if(note[1].toLowerCase()=="manager"){if(oManager == 0){_gmailObj.ManagerName = note[2];oManager = 1;}}
									if(note[0].toLowerCase()=="skype id"){if(oSkypeID == 0){_gmailObj.SkypeID = note[1];oSkypeID = 1;}}
									if(note[1].toLowerCase()=="skype id"){if(oSkypeID == 0){_gmailObj.SkypeID = note[2];oSkypeID = 1;}}
									if(note[0].toLowerCase()=="skype in"){if(oSkypeIn == 0){_gmailObj.SkypeIn = note[1];oSkypeIn = 1;}}
									if(note[1].toLowerCase()=="skype in"){if(oSkypeIn == 0){_gmailObj.SkypeIn = note[2];oSkypeIn = 1;}}
									if(note[0].toLowerCase()=="nickname"){if(oNickname == 0){_gmailObj.NickName = note[1];oNickname = 1;}}
									if(note[1].toLowerCase()=="nickname"){if(oNickname == 0){_gmailObj.NickName = note[2];oNickname = 1;}}
									if(note[0].toLowerCase()=="categories"){if(oCategories == 0){_gmailObj.Category = note[1];oCategories = 1;}}
									if(note[1].toLowerCase()=="categories"){if(oCategories == 0){_gmailObj.Category = note[2];oCategories = 1;}}
									if(note[0].toLowerCase()=="plaxo id"){_gmailObj.PlaxoID = note[1];}
									if(note[1].toLowerCase()=="plaxo id"){_gmailObj.PlaxoID = note[2];}
									if(note[0].toLowerCase()=="work - email"){if(wEmailCount == 1){_gmailObj.WorkEmail3 = note[1];wEmailCount++;}}
									if(note[0].toLowerCase()=="personal - email"){if(hEmailCount == 1){_gmailObj.PersonalEmail3 = note[1];hEmailCount++;}}

								}
							}else{
								for(x=0;x<a.length;x++){
								//GM_log("notes line "+x+":" + a[x]);
									if(a[x].indexOf(":")==-1){
										_gmailObj.Notes += a[x] + "\\x0d\\x0a";
									}else{
										a[x] = replaceStr(a[x],": ",":");
										a[x] = replaceStr(a[x]," :",":");
										var note = a[x].split(":");
										if(note[0].toLowerCase()=="notes"){_gmailObj.Notes = note[1];}
										if(note[0].toLowerCase()=="web page"){if(wWebpage==0){if(note.length==3){_gmailObj.WorkWebpage = note[1]+":"+note[2];}else{_gmailObj.WorkWebpage = note[1];}wWebpage = 1;}else{if(hWebpage==0){if(note.length==3){_gmailObj.PersonalWebpage = note[1]+":"+note[2];}else{_gmailObj.PersonalWebpage = note[1];}hWebpage = 1;}}}
										if(note[1].toLowerCase()=="web page"){if(wWebpage==0){if(note.length==4){_gmailObj.WorkWebpage = note[2]+":"+note[3];}else{_gmailObj.WorkWebpage = note[2];}wWebpage = 1;}else{if(hWebpage==0){if(note.length==4){_gmailObj.PersonalWebpage = note[2]+":"+note[3];}else{_gmailObj.PersonalWebpage = note[2];}hWebpage = 1;}}}
										if(note[0].toLowerCase()=="screen name"){if(oAim == 0){_gmailObj.Aim = note[1];oAim = 1;}}
										if(note[1].toLowerCase()=="screen name"){if(oAim == 0){_gmailObj.Aim = note[2];oAim = 1;}}
										if(note[0].toLowerCase()=="anniversary"){if(oAnniversary==0){_gmailObj.Anniversary = processDate(note[1]);oAnniversary = 1;}}
										if(note[1].toLowerCase()=="anniversary"){if(oAnniversary==0){_gmailObj.Anniversary = processDate(note[2]);oAnniversary = 1;}}
										if(note[0].toLowerCase()=="birthday"){if(oBirthday==0){_gmailObj.Birthday = processDate(note[1]);oBirthday = 1;}}
										if(note[1].toLowerCase()=="birthday"){if(oBirthday==0){_gmailObj.Birthday = processDate(note[2]);oBirthday = 1;}}
										if(note[0].toLowerCase()=="title"){if(oTitle==0){_gmailObj.Title = note[1]+" ";oTitle = 1;}}
										if(note[1].toLowerCase()=="title"){if(oTitle==0){_gmailObj.Title = note[2]+" ";oTitle = 1;}}
										if(note[0].toLowerCase()=="spouse"){if(oSpouse==0){_gmailObj.SpouseName = note[1];oSpouse = 1;}}
										if(note[1].toLowerCase()=="spouse"){if(oSpouse==0){_gmailObj.SpouseName = note[2];oSpouse = 1;}}
										if(note[0].toLowerCase()=="assistant"){if(oAssistant==0){_gmailObj.AssistantName = note[1];oAssistant = 1;}}
										if(note[1].toLowerCase()=="assistant"){if(oAssistant==0){_gmailObj.AssistantName = note[2];oAssistant = 1;}}
										if(note[0].toLowerCase()=="asst. phone"){if(oAssistantPhone==0){_gmailObj.AssistantPhone = note[1];oAssistantPhone = 1;}}
										if(note[1].toLowerCase()=="asst. phone"){if(oAssistantPhone==0){_gmailObj.AssistantPhone = note[2];oAssistantPhone = 1;}}
										if(note[0].toLowerCase()=="department"){if(oDepartment==0){_gmailObj.Department = note[1];oDepartment = 1;}}
										if(note[1].toLowerCase()=="department"){if(oDepartment==0){_gmailObj.Department = note[2];oDepartment = 1;}}
										if(note[0].toLowerCase()=="manager"){if(oManager == 0){_gmailObj.ManagerName = note[1];oManager = 1;}}
										if(note[1].toLowerCase()=="manager"){if(oManager == 0){_gmailObj.ManagerName = note[2];oManager = 1;}}
										if(note[0].toLowerCase()=="skype id"){if(oSkypeID == 0){_gmailObj.SkypeID = note[1];oSkypeID = 1;}}
										if(note[1].toLowerCase()=="skype id"){if(oSkypeID == 0){_gmailObj.SkypeID = note[2];oSkypeID = 1;}}
										if(note[0].toLowerCase()=="skype in"){if(oSkypeIn == 0){_gmailObj.SkypeIn = note[1];oSkypeIn = 1;}}
										if(note[1].toLowerCase()=="skype in"){if(oSkypeIn == 0){_gmailObj.SkypeIn = note[2];oSkypeIn = 1;}}
										if(note[0].toLowerCase()=="nickname"){if(oNickname == 0){_gmailObj.NickName = note[1];oNickname = 1;}}
										if(note[1].toLowerCase()=="nickname"){if(oNickname == 0){_gmailObj.NickName = note[2];oNickname = 1;}}
										if(note[0].toLowerCase()=="categories"){if(oCategories == 0){_gmailObj.Category = note[1];oCategories = 1;}}
										if(note[1].toLowerCase()=="categories"){if(oCategories == 0){_gmailObj.Category = note[2];oCategories = 1;}}
										if(note[0].toLowerCase()=="plaxo id"){_gmailObj.PlaxoID = "";}
										if(note[1].toLowerCase()=="plaxo id"){_gmailObj.PlaxoID = "";}
										if(note[0].toLowerCase()=="work - email"){if(wEmailCount == 1){_gmailObj.WorkEmail3 = note[1];wEmailCount++;}}
										if(note[0].toLowerCase()=="personal - email"){if(hEmailCount == 1){_gmailObj.PersonalEmail3 = note[1];hEmailCount++;}}
									}
								}
							}
						}
					}else if(i==8){
						for(j=0; j<rDrT[i].length; j++){
							if(rDrT[i][j].length > 1){
								if(rDrT[i][j].length == 2){
									var contact_category = rDrT[i][j][0];
									var items = rDrT[i][j][1];
									for(k=0; k<items.length; k++){
										if(k % 2 == 0){
											if(contact_category.toLowerCase()=="personal"){
												if(items[k]=="a"){//address
													var a = items[k+1];
													var b, b1, c;
													var haddress="";
													var haddress2="";
													var hzip="";
													var hstate="";
													var hcity="";
													var hcountry = "";
													a = a.split('\r\n');
													for(x=0;x<a.length;x++){if(a[x]!=""){hAddrLineCount++;}}
													if(hAddrLineCount==1){hAddrLineCount=0;a = items[k+1];a=a.split('\n');for(x=0;x<a.length;x++){if(a[x]!=""){hAddrLineCount++;}}}
													haddress = a[0];
													if(hAddrLineCount==2){b = replaceStr(a[1],",","");b = b.split(" ");}
													if(hAddrLineCount==3){b = replaceStr(a[1],",","");b1 = b.split(" ");c = replaceStr(a[2],",","");if(b1.length==2){haddress2 = a[1];b=c.split(" ");}else{hcountry = a[2];b=b.split(" ");}}
													if(hAddrLineCount==4){haddress2 = a[1];c = replaceStr(a[2],",","");b = c.split(" ");hcountry = a[3];}
													for(l=0; l<b.length; l++){if(hzip==""){hzip = b[b.length-1];b.pop();}if(hstate=="" && hzip!=""){hstate = b[b.length-1];b.pop();}if(hcity=="" && hstate!="" && hzip!=""){hcity = b.join(" ");b.pop();}}
													_gmailObj.PersonalAddress = haddress;
													_gmailObj.PersonalAddress2 = haddress2;
													_gmailObj.PersonalCity = hcity;
													_gmailObj.PersonalState = hstate;
													_gmailObj.PersonalZipCode = hzip;
													_gmailObj.PersonalCountry = hcountry;
												}	
												if(items[k]=="e"){//email														
													if(hEmailCount==1 && _gmailObj.PersonalEmail3==""){_gmailObj.PersonalEmail = items[k+1];}
													if(hEmailCount==2 && _gmailObj.PersonalEmail3==""){_gmailObj.PersonalEmail2 = items[k+1];}else if(hEmailCount==2 && _gmailObj.PersonalEmail3!=""){_gmailObj.PersonalEmail = items[k+1];}
													if(hEmailCount==3 && _gmailObj.PersonalEmail3==""){_gmailObj.PersonalEmail3 = items[k+1];}else if(hEmailCount==3 && _gmailObj.PersonalEmail3!=""){_gmailObj.PersonalEmail2 = items[k+1];}
													hEmailCount++;
												}
												if(items[k]=="i"){//im
													if(hIm==0){_gmailObj.PersonalIM = items[k+1];hIm = 1;}
												}
												if(items[k]=="p"){//phone
													if(hPhoneCount==1){_gmailObj.PersonalPhone = items[k+1];}
													if(hPhoneCount==2){_gmailObj.PersonalPhone2 = items[k+1];}
													hPhoneCount++;
												}
												if(items[k]=="m"){//mobile
													if(hMobilePhone==0){_gmailObj.PersonalMobilePhone = items[k+1];hMobilePhone = 1;}
												}
												if(items[k]=="b"){//pager
													if(wPager==0){_gmailObj.WorkPager = items[k+1];wPager = 1;}
												}
												if(items[k]=="f"){//fax
												if(hFax==0){_gmailObj.PersonalFax = items[k+1];hFax = 1;}
												}
												if(items[k]=="d"){//company
													if(oCompany==0){_gmailObj.Company = items[k+1];oCompany = 1;}
												}
												if(items[k]=="t"){//title
													if(oJobTitle==0){_gmailObj.JobTitle = items[k+1];oJobTitle = 1;}
												}
												if(items[k]=="o"){//other
													items[k+1] = replaceStr(items[k+1],": ",":");
													items[k+1] = replaceStr(items[k+1]," :",":");
													var other = items[k+1].split(":");
													if(other[0].toLowerCase()=="web page"){if(hWebpage == 0){if(other.length==3){_gmailObj.PersonalWebpage = other[1]+":"+other[2];}else{_gmailObj.PersonalWebpage = other[1];}hWebpage = 1;}}
													if(other[0].toLowerCase()=="screen name"){if(oAim == 0){_gmailObj.Aim = other[1];oAim = 1;}}
													if(other[0].toLowerCase()=="anniversary"){if(oAnniversary == 0){_gmailObj.Anniversary = processDate(other[1]);oAnniversary = 1;}}
													if(other[0].toLowerCase()=="birthday"){if(oBirthday == 0){_gmailObj.Birthday = processDate(other[1]);oBirthday = 1;}}
													if(other[0].toLowerCase()=="spouse"){if(oSpouse == 0){_gmailObj.SpouseName = other[1];oSpouse = 1;}}
													if(other[0].toLowerCase()=="assistant"){if(oAssistant == 0){_gmailObj.AssistantName = other[1];oAssistant = 1;}}
													if(other[0].toLowerCase()=="asst. phone"){if(oAssistantPhone == 0){_gmailObj.AssistantPhone = other[1];oAssistantPhone = 1;}}
													if(other[0].toLowerCase()=="department"){if(oDepartment == 0){_gmailObj.Department = other[1];oDepartment = 1;}}
													if(other[0].toLowerCase()=="manager"){if(oManager == 0){_gmailObj.ManagerName = other[1];oManager = 1;}}
													if(other[0].toLowerCase()=="skype id"){if(oSkypeID == 0){_gmailObj.SkypeID = other[1];oSkypeID = 1;}}
													if(other[0].toLowerCase()=="skype in"){if(oSkypeIn == 0){_gmailObj.SkypeIn = other[1];oSkypeIn = 1;}}
													if(other[0].toLowerCase()=="nickname"){if(oNickname == 0){_gmailObj.NickName = other[1];oNickname = 1;}}
													if(other[0].toLowerCase()=="categories"){if(oCategories == 0){_gmailObj.Category = other[1];oCategories = 1;}}
													if(other[0].toLowerCase()=="plaxo id"){if(oPlaxoID == 0){_gmailObj.PlaxoID = other[1];oPlaxoID = 1;}}
												}
											}else if(contact_category.toLowerCase()=="work"){
												if(items[k]=="a"){//address
													var a = items[k+1];
													var b, b1, c;
													var waddress="";
													var waddress2="";
													var wzip="";
													var wstate="";
													var wcity="";
													var wcountry = "";
													a = a.split('\r\n');
													for(x=0;x<a.length;x++){if(a[x]!=""){wAddrLineCount++;}}
													if(wAddrLineCount==1){wAddrLineCount=0;a = items[k+1];a=a.split('\n');for(x=0;x<a.length;x++){if(a[x]!=""){wAddrLineCount++;}}}
													waddress = a[0];
													if(wAddrLineCount==2){b = replaceStr(a[1],",","");b = b.split(" ");}
													if(wAddrLineCount==3){b = replaceStr(a[1],",","");b1 = b.split(" ");c = replaceStr(a[2],",","");if(b1.length==2){waddress2 = a[1];b=c.split(" ");}else{wcountry = a[2];b=b.split(" ");}}
													if(wAddrLineCount==4){waddress2 = a[1];c = replaceStr(a[2],",","");b = c.split(" ");wcountry = a[3];}
													for(l=0; l<b.length; l++){if(wzip==""){wzip = b[b.length-1];b.pop();}if(wstate=="" && wzip!=""){wstate = b[b.length-1];b.pop();}if(wcity=="" && wstate!="" && wzip!=""){wcity = b.join(" ");b.pop();}}
													_gmailObj.WorkAddress = waddress;
													_gmailObj.WorkAddress2 = waddress2;
													_gmailObj.WorkCity = wcity;
													_gmailObj.WorkState = wstate;
													_gmailObj.WorkZipCode = wzip;
													_gmailObj.WorkCountry = wcountry;
												}
												if(items[k]=="e"){//email
													if(wEmailCount==1 && _gmailObj.WorkEmail3==""){_gmailObj.WorkEmail = items[k+1];}
													if(wEmailCount==2 && _gmailObj.WorkEmail3==""){_gmailObj.WorkEmail2 = items[k+1];}else if(wEmailCount==2 && _gmailObj.WorkEmail3!=""){_gmailObj.WorkEmail = items[k+1];}
													if(wEmailCount==3 && _gmailObj.WorkEmail3==""){_gmailObj.WorkEmail3 = items[k+1];}else if(wEmailCount==3 && _gmailObj.WorkEmail3!=""){_gmailObj.WorkEmail2 = items[k+1];}
													wEmailCount++;
												}
												if(items[k]=="i"){//im
													if(wIm==0){_gmailObj.WorkIM = items[k+1];wIm = 1;}
												}
												if(items[k]=="p"){//phone
													if(wPhoneCount==1){_gmailObj.WorkPhone = items[k+1];}
													if(wPhoneCount==2){_gmailObj.WorkPhone2 = items[k+1];}
													wPhoneCount++;
												}
												if(items[k]=="m"){//mobile
													if(wMobilePhone==0){_gmailObj.WorkMobilePhone = items[k+1];wMobilePhone = 1;}
												}
												if(items[k]=="b"){//pager
													if(wPager==0){_gmailObj.WorkPager = items[k+1];wPager = 1;}
												}
												if(items[k]=="f"){//fax
													if(wFax==0){_gmailObj.WorkFax = items[k+1];wFax = 1;}
												}
												if(items[k]=="d"){//company
													if(oCompany==0){_gmailObj.Company = items[k+1];oCompany = 1;}
												}
												if(items[k]=="t"){//title
													if(oJobTitle==0){_gmailObj.JobTitle = items[k+1];oJobTitle = 1;}
												}
												if(items[k]=="o"){//other
													items[k+1] = replaceStr(items[k+1],": ",":");
													items[k+1] = replaceStr(items[k+1]," :",":");
													var other = items[k+1].split(":");
													if(other[0].toLowerCase()=="web page"){if(wWebpage == 0){if(other.length==3){_gmailObj.WorkWebpage = other[1]+":"+other[2];}else{_gmailObj.WorkWebpage = other[1];}wWebpage = 1;}}
													if(other[0].toLowerCase()=="screen name"){if(oAim == 0){_gmailObj.Aim = other[1];oAim = 1;}}
													if(other[0].toLowerCase()=="anniversary"){if(oAnniversary == 0){_gmailObj.Anniversary = processDate(other[1]);oAnniversary = 1;}}
													if(other[0].toLowerCase()=="birthday"){if(oBirthday == 0){_gmailObj.Birthday = processDate(other[1]);oBirthday = 1;}}
													if(other[0].toLowerCase()=="spouse"){if(oSpouse == 0){_gmailObj.SpouseName = other[1];oSpouse = 1;}}
													if(other[0].toLowerCase()=="assistant"){if(oAssistant == 0){_gmailObj.AssistantName = other[1];oAssistant = 1;}}
													if(other[0].toLowerCase()=="asst. phone"){if(oAssistantPhone == 0){_gmailObj.AssistantPhone = other[1];oAssistantPhone = 1;}}
													if(other[0].toLowerCase()=="department"){if(oDepartment == 0){_gmailObj.Department = other[1];oDepartment = 1;}}
													if(other[0].toLowerCase()=="manager"){if(oManager == 0){_gmailObj.ManagerName = other[1];oManager = 1;}}
													if(other[0].toLowerCase()=="skype id"){if(oSkypeID == 0){_gmailObj.SkypeID = other[1];oSkypeID = 1;}}
													if(other[0].toLowerCase()=="skype in"){if(oSkypeIn == 0){_gmailObj.SkypeIn = other[1];oSkypeIn = 1;}}
													if(other[0].toLowerCase()=="nickname"){if(oNickname == 0){_gmailObj.NickName = other[1];oNickname = 1;}}
													if(other[0].toLowerCase()=="categories"){if(oCategories == 0){_gmailObj.Category = other[1];oCategories = 1;}}
													if(other[0].toLowerCase()=="plaxo id"){if(oPlaxoID == 0){_gmailObj.PlaxoID = other[1];oPlaxoID = 1;}}
												}
											}else if(contact_category.toLowerCase()=="other"){
												if(items[k]=="a"){//address
													var a = items[k+1];
													var b, b1, c;
													var oaddress="";
													var oaddress2="";
													var ozip="";
													var ostate="";
													var ocity="";
													var ocountry = "";
													a = a.split('\r\n');
													for(x=0;x<a.length;x++){if(a[x]!=""){oAddrLineCount++;}}
													if(oAddrLineCount==1){oAddrLineCount=0;a = items[k+1];a=a.split('\n');for(x=0;x<a.length;x++){if(a[x]!=""){oAddrLineCount++;}}}
													oaddress = a[0];
													if(oAddrLineCount==2){b = replaceStr(a[1],",","");b = b.split(" ");}
													if(oAddrLineCount==3){b = replaceStr(a[1],",","");b1 = b.split(" ");c = replaceStr(a[2],",","");if(b1.length==2){oaddress2 = a[1];b=c.split(" ");}else{ocountry = a[2];b=b.split(" ");}}
													if(oAddrLineCount==4){oaddress2 = a[1];c = replaceStr(a[2],",","");b = c.split(" ");ocountry = a[3];}
													for(l=0; l<b.length; l++){if(ozip==""){ozip = b[b.length-1];b.pop();}if(ostate=="" && ozip!=""){ostate = b[b.length-1];b.pop();}if(ocity=="" && ostate!="" && ozip!=""){ocity = b.join(" ");b.pop();}}
													_gmailObj.OtherAddress = oaddress;
													_gmailObj.OtherAddress2 = oaddress2;
													_gmailObj.OtherCity = ocity;
													_gmailObj.OtherState = ostate;
													_gmailObj.OtherZipCode = ozip;
													_gmailObj.OtherCountry = ocountry;
												}
												if(items[k]=="p"){//phone
													// OtherPhone
													if(oPhone==0){_gmailObj.OtherPhone = items[k+1];oPhone = 1;}
												}
												if(items[k]=="b"){//pager
													// WorkPager
													if(wPager==0){_gmailObj.WorkPager = items[k+1];wPager = 1;}
												}
												if(items[k]=="f"){//fax
													// OtherFax
													if(oFax==0){_gmailObj.OtherFax = items[k+1];oFax = 1;}
												}
												if(items[k]=="d"){//company
													// Company
													if(oCompany==0){_gmailObj.Company = items[k+1];oCompany = 1;}
												}
												if(items[k]=="t"){//title
													// JobTitle
													if(oJobTitle==0){_gmailObj.JobTitle = items[k+1];oJobTitle = 1;}
												}
												if(items[k]=="o"){//other
													items[k+1] = replaceStr(items[k+1],": ",":");
													items[k+1] = replaceStr(items[k+1]," :",":");
													var other = items[k+1].split(":");
													if(other[0].toLowerCase()=="screen name"){if(oAim == 0){_gmailObj.Aim = other[1];oAim = 1;}}
													if(other[0].toLowerCase()=="anniversary"){if(oAnniversary == 0){_gmailObj.Anniversary = processDate(other[1]);oAnniversary = 1;}}
													if(other[0].toLowerCase()=="birthday"){if(oBirthday == 0){_gmailObj.Birthday = processDate(other[1]);oBirthday = 1;}}
													if(other[0].toLowerCase()=="spouse"){if(oSpouse == 0){_gmailObj.SpouseName = other[1];oSpouse = 1;}}
													if(other[0].toLowerCase()=="assistant"){if(oAssistant == 0){_gmailObj.AssistantName = other[1];oAssistant = 1;}}
													if(other[0].toLowerCase()=="asst. phone"){if(oAssistantPhone == 0){_gmailObj.AssistantPhone = other[1];oAssistantPhone = 1;}}
													if(other[0].toLowerCase()=="department"){if(oDepartment == 0){_gmailObj.Department = other[1];oDepartment = 1;}}
													if(other[0].toLowerCase()=="manager"){if(oManager == 0){_gmailObj.ManagerName = other[1];oManager = 1;}}
													if(other[0].toLowerCase()=="skype id"){if(oSkypeID == 0){_gmailObj.SkypeID = other[1];oSkypeID = 1;}}
													if(other[0].toLowerCase()=="skype in"){if(oSkypeIn == 0){_gmailObj.SkypeIn = other[1];oSkypeIn = 1;}}
													if(other[0].toLowerCase()=="nickname"){if(oNickname == 0){_gmailObj.NickName = other[1];oNickname = 1;}}
													if(other[0].toLowerCase()=="categories"){if(oCategories == 0){_gmailObj.Category = other[1];oCategories = 1;}}
													if(other[0].toLowerCase()=="plaxo id"){if(oPlaxoID == 0){_gmailObj.PlaxoID = other[1];oPlaxoID = 1;}}
												}
											}
										}										
									}
								}
							}
						}
					}
					if(_gmailObj.DefaultEmail!=""){
						if(_gmailObj.WorkEmail=="" && _gmailObj.PersonalEmail==""){															
							_gmailObj.WorkEmail = _gmailObj.DefaultEmail;
						}else if((_gmailObj.WorkEmail!="" && _gmailObj.PersonalEmail=="") && (_gmailObj.WorkEmail!=_gmailObj.DefaultEmail)){
							_gmailObj.PersonalEmail = _gmailObj.DefaultEmail;
						}else if((_gmailObj.WorkEmail==""  && _gmailObj.PersonalEmail!="") && (_gmailObj.PersonalEmail!=_gmailObj.DefaultEmail)){
							_gmailObj.WorkEmail = _gmailObj.DefaultEmail;
						}else if(_gmailObj.WorkEmail!="" && _gmailObj.PersonalEmail!=""){
							if(_gmailObj.WorkEmail!=_gmailObj.DefaultEmail && _gmailObj.PersonalEmail!=_gmailObj.DefaultEmail){
								if(_gmailObj.WorkEmail3!=""){
									_gmailObj.Notes += "\\x0d\\x0aOther Email:"+ _gmailObj.WorkEmail3;
								}
								if(_gmailObj.WorkEmail2!=""){
									_gmailObj.WorkEmail3 = _gmailObj.WorkEmail2;
								}
								_gmailObj.WorkEmail2 = _gmailObj.WorkEmail;
								_gmailObj.WorkEmail = _gmailObj.DefaultEmail;
							}					
						}
					}
				}
				rDrT = null;
				if(type.toLowerCase()=="getid"){
					// gmail already added this new contact(-1) when the this Url was submitted					
					GM_log("GETID");

					P_HEX_CHECK += _gmailObj.ItemID+"|";

					var new_ct_id = "&ct_id="+ _gmailObj.ItemID;

					// gmail wont add an identical entry so make a slight change
					// xUrl this Url we submitted, the results above have the newly assigned gmail id

					xUrl = replaceStr(xUrl,"&ct_id=-1",new_ct_id);
					xUrl = replaceStr(xUrl,"&ct_id=&",new_ct_id+"&");
					xUrl = replaceStr(xUrl,"_o=Plaxo+ID+%3A","_o=Plaxo+ID%3A+");
					
					// resubmit to history frame with the change
					parent.document.getElementById('hst').src = xUrl;
					plaxo_map_results(_gmailObj.PlaxoID,_gmailObj.ItemID);
					WINDOW_CLOSED = false;

				}else if(type.toLowerCase()=="add" || type.toLowerCase()=="replace"){

					var _syncbody = ""+					
					"['"+type+"','Type','Contact','ItemID','"+_gmailObj.ItemID+"'],"+
					"['Data','AIMScreenName','"+encode4plaxo(_gmailObj.Aim)+"',"+
					"'Anniversary','"+encode4plaxo(_gmailObj.Anniversary)+"',"+
					"'AssistantName','"+encode4plaxo(_gmailObj.AssistantName)+"',"+
					"'AssistantPhone','"+encode4plaxo(_gmailObj.AssistantPhone)+"',"+
					"'Birthday','"+encode4plaxo(_gmailObj.Birthday)+"',"+
					"'BusinessEmail','"+encode4plaxo(_gmailObj.WorkEmail)+"',"+
					"'BusinessEmail2','"+encode4plaxo(_gmailObj.WorkEmail2)+"',"+
					"'BusinessEmail3','"+encode4plaxo(_gmailObj.WorkEmail3)+"',"+
					"'BusinessIM','"+encode4plaxo(_gmailObj.WorkIM)+"',"+
					"'BusinessMobilePhone','"+encode4plaxo(_gmailObj.WorkMobilePhone)+"',"+
					"'BusinessWebPage','"+encode4plaxo(_gmailObj.WorkWebpage)+"',"+
					"'Category','"+encode4plaxo(_gmailObj.Category)+"',"+
					"'Company','"+encode4plaxo(_gmailObj.Company)+"',"+
					"'Department','"+encode4plaxo(_gmailObj.Department)+"',"+
					"'DisplayName','"+encode4plaxo(_gmailObj.Title)+encode4plaxo(_gmailObj.DisplayName)+"',"+
					"'HomeAddress','"+encode4plaxo(_gmailObj.PersonalAddress)+"',"+
					"'HomeAddress2','"+encode4plaxo(_gmailObj.PersonalAddress2)+"',"+
					"'HomeCity','"+encode4plaxo(_gmailObj.PersonalCity)+"',"+
					"'HomeCountry','"+encode4plaxo(_gmailObj.PersonalCountry)+"',"+
					"'HomeFax','"+encode4plaxo(_gmailObj.PersonalFax)+"',"+
					"'HomePhone','"+encode4plaxo(_gmailObj.PersonalPhone)+"',"+
					"'HomePhone2','"+encode4plaxo(_gmailObj.PersonalPhone2)+"',"+
					"'HomeState','"+encode4plaxo(_gmailObj.PersonalState)+"',"+
					"'HomeZipCode','"+encode4plaxo(_gmailObj.PersonalZipCode)+"',"+
					"'JobTitle','"+encode4plaxo(_gmailObj.JobTitle)+"',"+
					"'ManagerName','"+encode4plaxo(_gmailObj.ManagerName)+"',"+
					"'NickName','"+encode4plaxo(_gmailObj.NickName)+"',"+
					"'Notes','"+encode4plaxo(_gmailObj.Notes)+"',"+
					"'OtherAddress','"+encode4plaxo(_gmailObj.OtherAddress)+"',"+
					"'OtherAddress2','"+encode4plaxo(_gmailObj.OtherAddress2)+"',"+
					"'OtherCity','"+encode4plaxo(_gmailObj.OtherCity)+"',"+
					"'OtherCountry','"+encode4plaxo(_gmailObj.OtherCountry)+"',"+
					"'OtherFax','"+encode4plaxo(_gmailObj.OtherFax)+"',"+
					"'OtherPhone','"+encode4plaxo(_gmailObj.OtherPhone)+"',"+
					"'OtherState','"+encode4plaxo(_gmailObj.OtherState)+"',"+
					"'OtherZipCode','"+encode4plaxo(_gmailObj.OtherZipCode)+"',"+
					"'PersonalEmail','"+encode4plaxo(_gmailObj.PersonalEmail)+"',"+
					"'PersonalEmail2','"+encode4plaxo(_gmailObj.PersonalEmail2)+"',"+
					"'PersonalEmail3','"+encode4plaxo(_gmailObj.PersonalEmail3)+"',"+
					"'PersonalIM','"+encode4plaxo(_gmailObj.PersonalIM)+"',"+
					"'PersonalMobilePhone','"+encode4plaxo(_gmailObj.PersonalMobilePhone)+"',"+
					"'PersonalWebPage','"+encode4plaxo(_gmailObj.PersonalWebpage)+"',"+
					"'SkypeID','"+encode4plaxo(_gmailObj.SkypeID)+"',"+
					"'SkypeIn','"+encode4plaxo(_gmailObj.SkypeIn)+"',"+
					"'SpouseName','"+encode4plaxo(_gmailObj.SpouseName)+"',"+
					"'WorkAddress','"+encode4plaxo(_gmailObj.WorkAddress)+"',"+
					"'WorkAddress2','"+encode4plaxo(_gmailObj.WorkAddress2)+"',"+
					"'WorkCity','"+encode4plaxo(_gmailObj.WorkCity)+"',"+
					"'WorkCountry','"+encode4plaxo(_gmailObj.WorkCountry)+"',"+
					"'WorkFax','"+encode4plaxo(_gmailObj.WorkFax)+"',"+
					"'WorkPager','"+encode4plaxo(_gmailObj.WorkPager)+"',"+
					"'WorkPhone','"+encode4plaxo(_gmailObj.WorkPhone)+"',"+
					"'WorkPhone2','"+encode4plaxo(_gmailObj.WorkPhone2)+"',"+
					"'WorkState','"+encode4plaxo(_gmailObj.WorkState)+"',"+
					"'WorkZipCode','"+encode4plaxo(_gmailObj.WorkZipCode)+"']%0a"+
					"['/Sync']";				
					
					plaxo_process_sync(_syncbody);

					_syncbody = null;
					WINDOW_CLOSED = false;
				}
				_gmailObj = null;
			}else{
				GM_log("GMail xmlhttp error: " + responseDetails.status);
			}
		}
	});
}


/**
 * ----------------
 * plaxo_anchor_advance is called before we make any changes to the plaxo contacts db
 * ----------------
 */
function plaxo_anchor_advance(){
	if(getCookie("PLAXO_LASTANCHOR")!=null && getCookie("PLAXO_LASTANCHOR")!=""){
		var l,n,f;

		l = (getCookie("PLAXO_LASTANCHOR")*1);
		n = (l)+1;
		f = (l)+2;

		setCookie("PLAXO_LASTANCHOR",(n),expdate,"/");
		setCookie("PLAXO_NEXTANCHOR",(f),expdate,"/");

		l = null;
		n = null;
		f = null;
	}else{
		//GM_log("Wheres the cookie?");
		setCookie("PLAXO_LASTANCHOR",0,expdate,"/");
		setCookie("PLAXO_NEXTANCHOR",1,expdate,"/");
	}
}


/**
 * ----------------
 * gmail_get_contact_list is my gmail workhorse
 * ----------------
 */
var SCREEN_CLOSED = false;

function gmail_get_contact_list(Url){
	GM_xmlhttpRequest({
		method: 'GET',
		url: G_HTTP_LOCATION+Url,
		headers: {
			'User-agent': 'Mozilla/5.0 (compatable) Greasemonkey',
			'Accept': B_HTTP_ACCEPT,
		},
		onreadystatechange: function(responseDetails){
			if(responseDetails.readyState==1){
				//loading
				SCREEN_CLOSED = true;
			}
		},
		onload: function(responseDetails) {

			if(responseDetails.status==200){

				// our response is a datapack from the 'all contacts' tab
				// it does not contain all detailed data but just 
				// the first few fields...
				
				G_SIMPLE_CONTACTS_ARRAY = [];
				G_CONTACTS_LENGTH = 0;
				var dp = "";
				var sa=[];
				
				var rDrT = gmail_contact_list_cleanup(responseDetails.responseText);						
				rDrT = rDrT.split(']);D(["cl",');

				for(i=0;i<rDrT.length;i++){
					if(rDrT[i].indexOf('["ce"')!=-1){
						if(rDrT[i].indexOf('["cld"')!=-1){								
							sa[sa.length]=rDrT[i].substring(0,rDrT[i].lastIndexOf('["cld"')-5);
						}else{
							sa[sa.length]=rDrT[i];
						}
					}
				}
				rDrT = null;
				dp = sa.join();
				dp = eval("["+dp+"]");
				// collect all the Gmail entries and save them, we will check against this later on 
				var _now = "";				

				for(i=0;i<dp.length;i++){
					if(dp[i][0]=="ce"){
/*-----------------------------------------------------------*/
						G_CONTACTS_LENGTH++;
/*-----------------------------------------------------------*/	
						_now += dp[i][1]+"|";					
						if(getCookie("CHK_GMAIL")=="true"||getCookie("CHK_GMAIL")==null){
							G_SIMPLE_CONTACTS_ARRAY.push(dp[i][1]);
							G_SIMPLE_CONTACTS_ARRAY.push(encode4gmail(dp[i][2]));
							G_SIMPLE_CONTACTS_ARRAY.push(dp[i][4]);
							//GM_log("hex:"+dp[i][1]+", name:"+encode4gmail(dp[i][2])+", email:"+dp[i][4]);
						}
					}
				}
				dp = null;
				var _last = "";

				if(_now!=""){
					_now = _now.substring(0,_now.lastIndexOf('|'));
					if(getCookie("GMAIL_HEX_CHECK")=="" || getCookie("GMAIL_HEX_CHECK")==null){
						_last = _now;
					}else{
						_last = getCookie("GMAIL_HEX_CHECK");
					}
			
					//set the new "now"	
					setCookie("GMAIL_HEX_CHECK",_now,expdate,"/");
				}

				if(getCookie("PLAXO_UHID")==null||getCookie("PLAXO_UHID")==""){
					GM_log("GMAIL PING: Not logged in to Plaxo.");
					return false;
				}else if(getCookie("PLAXO_FOLDER_ID")==null||getCookie("PLAXO_FOLDER_ID")==""){
					GM_log("GMAIL PING: Not logged in to Plaxo.");
					return false;
				}else if(getCookie("PLAXO_NEEDS_SLOW_SYNC")==1||getCookie("PLAXO_NEEDS_SLOW_SYNC")==null){
					GM_log("GMAIL PING: Can only ping after initial slow sync is performed.");
					return false;
				}else if(getCookie("CHK_GMAIL")=="false"){
					GM_log("GMAIL PING: Bypassing...");
					setCookie("CHK_GMAIL","true",expdate,"/");
					return false;
				}else{
					if(getCookie("CHK_GMAIL")=="true"){				
						gmail_ping = "200";
						if(_now!=_last){
							gmail_ping = "205";
						}						
					}

					GM_log("GMAIL PING: "+gmail_ping);

					if(gmail_ping=="205"){
						gmail_update_plaxo(_last,_now);						
					}
				}									
				SCREEN_CLOSED = false;
			}
		}
	});
}

/**
 * ----------------
 * this code checks if we are adding or replacing new entries into gmail or plaxo
 * ----------------
 */
function gmail_update_plaxo(A,B){
	var _add = check_gmail(A,B);
	var _delete = check_gmail(B,A);

	_add = _add.split("|");
	_delete = _delete.split("|");						

	if(_add[0]!=""){
		for(w=0;w<_add.length;w++){									
			both_sync("Add",_add[w]);
		}						
	}
		
	if(_delete[0]!=""){
		for(x=0;x<_delete.length;x++){
			both_sync("Delete",_delete[x]);
		}						
	}						
	_add = null;
	_delete = null;
}

/**
 * ----------------
 * used by gmail_update_plaxo this script deletes matched items from the array
 * so what remains has to be added or subtracted from plaxo or gmail 
 * ----------------
 */
function check_gmail(_orig,_new){
	_orig = _orig.split("|");
	_new = _new.split("|");

	for(i=0;i<_orig.length;i++){
		for(j=0;j<_new.length;j++){
			if(_orig[i]==_new[j]){
				_new.splice(j,1);
			}
		}		
	}
	_orig = null;
	_new = _new.toString();
	_new = replaceStr(_new,",","|");
	return _new;
}

/**
 * ----------------
 * simple script to get gmails address book response into a state where we can parse it
 * ----------------
 */
function gmail_contact_list_cleanup(a){
	a = replaceStr(a,"//--></script><script><!--","");
	a = gmail_fix_response(a,"]");
	a = replaceStr(a,"\n","");
	return a;
}

/**
 * ----------------
 * this parses the plaxo response into an object format for easy manipulation
 * ----------------
 */
function returnObjReady(_in,b){
	var _out = "";
	for(var j=0;j<_in.length;j++){
		if(j % 2 != 0){
			if(b){
				_out +=  _in[j] + ": \"" + encode4gmail(_in[j+1]) + "\"" ;
			}else{
				_out +=  _in[j] + ": \"" + _in[j+1] + "\"" ;
			}
			if(_in[j+2]!=undefined){
				_out += ", ";
			}
		}
	}
	return _out;
}

/**
 * ----------------
 * this script takes plaxo contact info and preps it into url form for entry into gmail
 * ----------------
 */
function makeGmailAddRemoveUrl(II,DN,N,PP,BP,PE,PE2,PE3,PMP,HP,HP2,HF,PI,PWP,SN,A,B,HA,HA2,HA3,HC,HS,HZC,HCO,C,D,JT,BE,BE2,BE3,BMP,WP,WP2,WF,WB,BI,BWP,AN,AP,MN,WA,WA2,WA3,WC,WS,WZC,WCO,OP,OF,NN,CAT,AIM,SID,SIN,SI,OA,OA2,OA3,OC,OS,OZC,OCO){
	var w = 0;
	var h = 0;
	var o = 0;
	var z = 0;
	var GmailID = II;
	var PlaxoID = SI;

	// make our gmail string, this mimics as if you were sending it from gmail page
	var Url = "" + 
	"?ik=" + getCookie("GMAIL_IK") +
	"&view=up" +
	"&act=ec"+
	"&at=" + getCookie("GMAIL_AT");

	// gmail id
	var II2 = get_ii(II,DN,BE,PE);
	if(II!=""){
		Url += "&ct_id=" + II;
	}else{		
		Url += "&ct_id=" + II2;
		GmailID = II2;
	}

	// display name
	Url += "&ct_nm=" + DN;

	// email
	var tDE = "";
	if(BE!=""&&PE==""){tDE = encodeURIComponent(BE);}else if(PE!=""&&BE==""){tDE = encodeURIComponent(PE);}else if(BE!=""&&PE!=""){tDE = encodeURIComponent(BE);}
	Url += "&ct_em="+tDE;

	// notes
	N = replaceStr(N,"Personal - Other: ","");
	N = replaceStr(N,"Work - Other: ","");
	N = replaceStr(N,"Other - Other: ","");
	Url += "&ctf_n=" + N;

	
	// photo 
	// this works for session but the image wont be there (sometimes?...)
	// the next time you log in and without the image
	// the info that has been added will not be accessable in gmail - stupid
	if(tDE.indexOf('%40')!=-1){
		Url += "&ct_pd=1&ct_ph=photos/"+tDE;		
	}else if(tDE.indexOf('gmail')!=-1){
		Url += "&ct_pd=0&ct_ph=photos/"+tDE;
	}else{
		Url += "&ct_pd=1&ct_ph=";
	}

	if(PE!=""||PE2!=""||PE3!=""||PMP!=""||HP!=""||HP2!=""||HF!=""||PI!=""||PWP!=""||SN!=""||A!=""||B!=""||HA!=""||PP!=""){
		Url += "&ctsn_"+addZero(z)+"=Personal";
		if(PE!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_e=" + encodeURIComponent(PE);h++;}
		if(PE2!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_e=" + encodeURIComponent(PE2);h++;}
		if(PE3!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_e=" + encodeURIComponent(PE3);h++;}
		if(PMP!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_m=" + PMP;h++;}
		if(HP!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_p=" + HP;h++;}
		if(HP2!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_p=" + HP2;h++;}
		if(HF!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_f=" + HF;h++;}
		if(PI!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_i=" + PI;h++;}
		if(PWP!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_o=Web+Page%3A+"+ PWP;h++;}
		if(SN!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_o=Spouse%3A+" + SN;h++;}
		if(A!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_o=Anniversary%3A+" + unprocessDate(A);h++;}
		if(B!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_o=Birthday%3A+" + unprocessDate(B);h++;}
		if(PP!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_o=Photo+Url%3A+http%3A%2F%2F" + PP;h++;}								
		Url += "&ctsf_"+addZero(z)+"_"+addZero(h)+"_a=" + makeAddress(HA,HA2,HA3,HC,HS,HZC,HCO);
		z++;
	}
	if(C!=""||D!=""||JT!=""||BE!=""||BE2!=""||BE3!=""||BMP!=""||WP!=""||WP2!=""||WF!=""||WP!=""||BI!=""||BWP!=""||AN!=""||AP!=""||MN!=""||WA!=""||BP!=""){
		Url += "&ctsn_"+addZero(z)+"=Work";
		if(C!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_d=" + C;w++;}
		if(D!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_o=Department%3A+" + D;w++;}
		if(JT!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_t=" + JT;w++;}
		if(BE!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_e=" + encodeURIComponent(BE);w++;}							
		if(BE2!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_e=" + encodeURIComponent(BE2);w++;}
		if(BE3!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_e=" + encodeURIComponent(BE3);w++;}
		if(BMP!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_m=" + BMP;w++;}
		if(WP!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_p=" + WP;w++;}
		if(WP2!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_p=" + WP2;w++;}
		if(WF!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_f=" + WF;w++;}
		if(WB!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_b=" + WB;w++;}
		if(BI!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_i=" + BI;w++;}
		if(BWP!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_o=Web+Page%3A+"+ BWP;w++;}
		if(AN!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_o=Assistant%3A+" + AN;w++;}
		if(AP!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_o=Asst.+Phone%3A+" + AP;w++;}
		if(MN!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_o=Manager%3A+" + MN;w++;}
		if(BP!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(w)+"_o=Photo+Url%3A+http%3A%2F%2F" + BP;w++;}
		Url += 	"&ctsf_"+addZero(z)+"_"+addZero(w)+"_a=" + makeAddress(WA,WA2,WA3,WC,WS,WZC,WCO);
		z++;
	}
	if(OP!=""||OF!=""||NN!=""||CAT!=""||AIM!=""||SID!=""||SIN!=""||SI!=""||OA!=""){
		Url += "&ctsn_"+addZero(z)+"=Other&ctsf_"+addZero(z)+"_"+addZero(o)+"_e=";
		o++;
		if(OP!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(o)+"_p=" + OP;o++;}
		if(OF!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(o)+"_f=" + OF;o++;}
		if(NN!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(o)+"_o=Nickname%3A+" + NN;o++;}
		if(CAT!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(o)+"_o=Categories%3A+" + CAT;o++;}
		if(AIM!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(o)+"_o=Screen+Name%3A+" + AIM;o++;}
		if(SID!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(o)+"_o=Skype+ID%3A+" + SID;o++;}
		if(SIN!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(o)+"_o=Skype+In%3A+" + SIN;o++;}
		// ...if this is a new entry, we'll need a change to resubmit with GetId
		if(GmailID==-1){
			if(SI!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(o)+"_o=Plaxo+ID+%3A" + SI;o++;}
		}else{
			if(SI!=""){Url += "&ctsf_"+addZero(z)+"_"+addZero(o)+"_o=Plaxo+ID%3A+" + SI;o++;}
		}
		Url += "&ctsf_"+addZero(z)+"_"+addZero(o)+"_a=" + makeAddress(OA,OA2,OA3,OC,OS,OZC,OCO);
	}
	//GM_log("Gmail Check will try...: "+Url)
	return Url+"|"+GmailID+"|"+PlaxoID;
	
}

/**
 * ----------------
 * gmail hates duplicate email addresses so we check to see if the contact possibly exists before we create a new entry
 * this eliminates duplicates for gmail, used by makeGmailAddRemoveUrl, G_SIMPLE_CONTACTS_ARRAY is recreated every 60 sec 
 * by the my_gmail_ping(), if a match is found, we do a replace using the existing gmailID
 * ----------------
 */
function get_ii(II,DN,BE,PE){
	if(II==""){
		for(k=0;k<G_SIMPLE_CONTACTS_ARRAY.length;k++){
			if(G_SIMPLE_CONTACTS_ARRAY[k]!=""){
				if( G_SIMPLE_CONTACTS_ARRAY[k].toLowerCase()==BE.toLowerCase() ){
					II = G_SIMPLE_CONTACTS_ARRAY[k-2];
				}else if( G_SIMPLE_CONTACTS_ARRAY[k].toLowerCase()==PE.toLowerCase()){
					II = G_SIMPLE_CONTACTS_ARRAY[k-2];
				}else if( G_SIMPLE_CONTACTS_ARRAY[k].toLowerCase()==DN.toLowerCase() ){	
					II = G_SIMPLE_CONTACTS_ARRAY[k-1];
				}
			}
		}
		if(II==""){
			II = -1;
		}	
	}
	return II;
}

/**
 * ----------------
 * part of creating the gmail url is getting the submit str in sequence
 * ----------------
 */
function addZero(i){
	i = i.toString();
	if(i.length==1){
		i = "0"+i;
	}
	return i;
}

/**
 * ----------------
 * addresses need some work before we send them into gmail
 * ----------------
 */
function makeAddress(a1,a2,a3,aC1,aS,aZ,aC2){
	if(!a1){a1=""}
	if(!a2){a2=""}
	if(!a3){a3=""}
	if(!aC1){aC1=""}
	if(!aS){aS=""}
	if(!aZ){aZ=""}
	if(!aC2){aC2=""}

	var aStr="";
	var LL = "%0D%0A";
	const sp = "+";
	const nL = "%0D%0A";
	if(a1!=""){aStr+=a1;}
	aStr+=nL;
	if(a2!=""){aStr+=a2;if(a3!=""){aStr+=sp+a3;}aStr+=nL;LL ="";}
	if(aC1!=""){aStr+=aC1+"%2C"+sp;}
	if(aS!=""){aStr+=aS+sp;}
	if(aZ!=""){aStr+=aZ;}
	aStr+=nL;	
	if(aC2!=""){aStr+=aC2;}
	aStr+=LL;
	return aStr;
}

/**
 * ----------------
 * plaxo needs us to escape all the text on entries going its way and do the funky \u00 thing for spec chars
 * ----------------
 */
function encode4plaxo(t){
	t = escape(t);
	t = replaceStr(t,"%20"," ");
	t = replaceStr(t,"%","\\u00");	
	return t;
}

/**
 * ----------------
 * gmail expects its spaces to be "+" and hex style spec chars
 * ----------------
 */
function encode4gmail(t){
	t = escape(t);
	t = replaceStr(t," ","+");
	t = replaceStr(t,"\\u00","%");
	return t;
}

/**
 * ----------------
 * get our dates into a readable format
 * ----------------
 */
function unprocessDate(z){
	
	var y = z.substring(0,4);
	var m = z.substring(4,6);
	var d = z.substring(6,8);
	if(z!=""){
		z = m+"%2F"+d+"%2F"+y;
	}
	return z;
}

/**
 * ----------------
 * get our dates into a common univerdal date format
 * ----------------
 */
function processDate(mdy){
	if(!mdy){return}
	var a = mdy.split("/");
	if(a.length == 1){
		a = "";
		a = mdy.split("-");
	}
	if(a[0].length==1){
		a[0]= "0"+a[0];
	}
	if(a[1].length==1){
		a[1]= "0"+a[1];
	}
	if(a[2].length==2){
		a[2] = a[2]*1;
		if(a[2]+2000>=2006){
			a[2]=a[2]+1900;
		}else{
			a[2]=a[2]+2000;
		}
	}
	mdy = a[2]+a[0]+a[1];
	return mdy;	
}

/**
 * ----------------
 * start the little sync animation (slow sync only)
 * ----------------
 */
function gmail_start_animation(){
	var a = document.getElementById("my_plaxo_sync");
	var b = document.getElementById("settings_sync");
	var c = '<span><img src="'+syncImg+'" align="texttop" alt="'+G_LANG_SYNC_MSG+'" height="16" width="16" border="0"></span>';
	if(a){
		a.innerHTML = c;
		window.status = G_LANG_SYNC_MSG;
	}
	if(b){		
		b.innerHTML = c;
		window.status = G_LANG_SYNC_MSG;
	}
}

/**
 * ----------------
 * set the little sync animation back to sync link
 * ----------------
 */
function gmail_reset_plaxo_link(){
	window.setTimeout(function() {			
		var a = document.getElementById("my_plaxo_sync");
		var b = document.getElementById("settings_sync");
		if(a){
			if(a.innerHTML!=G_LANG_SYNC_NOW){
				a.innerHTML = G_LANG_SYNC_NOW;
			}
		}
		if(b){
			if(b.innerHTML!=G_LANG_SYNC_NOW){
				b.innerHTML = G_LANG_SYNC_NOW;
			}
		}
		window.status="Done"; 
	},500);
}

function gmail_response_snip(str){
	var a, b, c, d;	
	a = gmail_fix_response(str,",");
	a = gmail_fix_response(a,"]");
	b = a.lastIndexOf('["ce"');
	if(b!=-1){
		if(a.indexOf(',1]]]')!=-1){
			c = a.lastIndexOf(',1]]]')+4;
			d = a.substring(b,c);
		}else if(a.indexOf(',0]]]')!=-1){
			c = a.lastIndexOf(',0]]]')+4;
			d = a.substring(b,c);
		}
	}
	a = null;
	return d;
}

function gmail_fix_response(a,b){
	var c = '';
	var d = a.split(b);
 
	for(var i=0;i<d.length;i++){
		if(i!=d.length-1){
			c += d[i].replace('\n', '')+b;
		}else{
			c += d[i].replace('\n', '');
		}
	}
	return c;
}

/**
 * ----------------
 * hide dialog
 * required functions(): 
 *	inf()
 * ----------------
 */
function hm(){
	var v='visible';
	var n='none';
	document.getElementById('ol').style.display=n;
	document.getElementById('mbox').style.display=n;
	inf(v);
	document.onkeypress='';
}

/**
 * ----------------
 * hide underlying element that override
 * required functions(): 
 *	-none
 * ----------------
 */
function inf(h){
	tag=document.getElementsByTagName('body');
		for(i=tag.length-1;i>=0;i--)tag[i].style.overflow=h;
	tag=document.getElementsByTagName('select');
		for(i=tag.length-1;i>=0;i--)tag[i].style.visibility=h;
	tag=document.getElementsByTagName('iframe');
		for(i=tag.length-1;i>=0;i--)tag[i].style.visibility=h;
	tag=document.getElementsByTagName('object');
		for(i=tag.length-1;i>=0;i--)tag[i].style.visibility=h;
}

function initmb(){
	var ab='absolute';
	var n='none';
	var p='px';
 
	var obody=document.getElementsByTagName('body')[0];
	var frag=document.createDocumentFragment();
	var obol=document.createElement('div');
	obol.setAttribute('id','ol');
	obol.style.setProperty('background-image','url('+clearPNG+')',null);
	obol.style.display=n;
	obol.style.position=ab;
	obol.style.top=0;
	obol.style.left=0;
	obol.style.zIndex=998;
	obol.style.width='100%';
	frag.appendChild(obol);
	var obbx=document.createElement('div');
	obbx.setAttribute('id','mbox');
	obbx.style.border=0+p;
	obbx.style.display=n;
	obbx.style.position=ab;
	obbx.style.zIndex=999;
	var obl=document.createElement('span');
	obbx.appendChild(obl);
	var obbxd=document.createElement('div');
	obbxd.setAttribute('id','mbd');
	obl.appendChild(obbxd);
	frag.insertBefore(obbx,obol.nextSibling);
	obody.insertBefore(frag,obody.firstChild);	
}

function sm(obl, wd, ht){
	var h='hidden';
	var b='block';
	var p='px';
	var obol=document.getElementById('ol');
	var obbxd = document.getElementById('mbd');
	obbxd.innerHTML = document.getElementById(obl).innerHTML;
	obol.style.height=pageHeight()+p;
	obol.style.width=pageWidth()+p;
	obol.style.top=posTop()+p;
	obol.style.left=posLeft()+p;
	obol.style.display=b;
	var tp=posTop()+((pageHeight()-ht)/2)-12;
	var lt=posLeft()+((pageWidth()-wd)/2)-12;
	var obbx=document.getElementById('mbox');
	obbx.style.top=(tp<0?0:tp)+p;
	obbx.style.left=(lt<0?0:lt)+p;
	obbx.style.width=wd+p;
	obbx.style.height=ht+p;
	inf(h);
	obbx.style.display=b;

	return false;

}

function fixBoth(){
	var obol=document.getElementById('ol');
	
	if(!obol){return;}
	if(obol.style.display!='block'){clearInterval(checking);}	

	if(obol.style.display=='block'){
		obol.style.height=pageHeight()+'px';
		obol.style.width=pageWidth()+'px';
		obol.style.top=posTop()+'px';
		obol.style.left=posLeft()+'px';
	}	
}

function pageWidth() {
	return window.innerWidth != null? window.innerWidth: document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth:document.body != null? document.body.clientWidth:null;
}

function pageHeight() {
	return window.innerHeight != null? window.innerHeight: document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight:document.body != null? document.body.clientHeight:null;
}

function posLeft() {
	return typeof window.pageXOffset != 'undefined' ? window.pageXOffset:document.documentElement && document.documentElement.scrollLeft? document.documentElement.scrollLeft:document.body.scrollLeft? document.body.scrollLeft:0;
}

function posTop() {
	return typeof window.pageYOffset != 'undefined' ? window.pageYOffset:document.documentElement && document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop?document.body.scrollTop:0;
}

/**
 * ----------------
 * xpath is in the greasemonkey guide
 * read it if you need to know whats happening
 * [docItem] 
 * ----------------
 */
function xpath(query, docItem) {
	if(!docItem){
		docItem = document;
	}
	return document.evaluate(query, docItem, null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


var expdate = new Date();
expdate.setTime (expdate.getTime() +  (24 * 60 * 60 * 1000 * 365 * 10));

/**
 * ---------------------
 * Sets a Cookie with the given name and value.
 *
 * name       Name of the cookie
 * value      Value of the cookie
 * [expires]  Expiration date of the cookie (default: end of current session)
 * [path]     Path where the cookie is valid (default: path of calling document)
 * [domain]   Domain where the cookie is valid (default: domain of calling document)
 * [secure]   Boolean value indicating if the cookie transmission requires a
 *              secure transmission
 * ---------------------
 */
function setCookie(name, value, expires, path, domain, secure) {
	document.cookie= name + "=" + escape(value) +
		((expires) ? "; expires=" + expires.toGMTString() : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
}

/**
 * ---------------------
 * Gets the value of the specified cookie.
 *
 * name  Name of the desired cookie.
 *
 * Returns a string containing value of specified cookie,
 *   or null if cookie does not exist.
 * ---------------------
 */

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0)	return null;
	} else {
		begin += 2;
	}
    	var end = document.cookie.indexOf(";", begin);
    	if (end == -1) {
        	end = dc.length;
    	}
    	return unescape(dc.substring(begin + prefix.length, end));
}

/**
 * ---------------------
 * Deletes the specified cookie.
 *
 * name      name of the cookie
 * [path]    path of the cookie (must be same as path used to create cookie)
 * [domain]  domain of the cookie (must be same as domain used to create cookie)
 * ---------------------
 */
function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
		document.cookie = name + "=" +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

/**
 * ---------------------
 * replaces char(s) in a string with a different char(s).
 *
 * str		original string
 * r		string char(s) to replace
 * b		string char(s) to insert
 * ---------------------
 */
function replaceStr(str,r,b){
	var s=String(str);
	var t=String(r);
	var sL=s.length;
	var tL=t.length;
	if((sL==0)||(tL==0)){
		return s;
	}
	var i=s.indexOf(t);
	if((!i)&&(t!=s.substring(0,tL))){
		return s;
	}
	if(i==-1){
		return s;
	}
	var nS=(s.substring(0,i)+b);
	if(i+tL<sL){
		nS+=replaceStr(s.substring(i+tL,sL),t,b);
	}
	return nS;
}

/*------------------------Settings page -----------------------*/


var SETTINGS_SIGNED_IN = '<td><b>Plaxo content:</b><br>'+
			'<a href="http://www.plaxo.com/products/plaxo_2" class="lc" target="_blank">Learn more</a></td>'+
			'<td></td>'+
			'<td>'+
			'<b><span id="settings_update_contacts" class="lk">Update Contacts</span> | <span id="settings_my_plaxo" class="lk">My Plaxo</span> | <span id="settings_about" class="lk">About</span></b> <br>'+
			'<b>You are currently signed in';
			if(getCookie("PLAXO_IDENTIFIER")!=null){
				SETTINGS_SIGNED_IN +=' as &lt;'+getCookie("PLAXO_IDENTIFIER")+'&gt;</b> <br>';
			}else{
				SETTINGS_SIGNED_IN +='.</b> <br>';
			}
			SETTINGS_SIGNED_IN +='<button class="ab" id="settings_sign_out">Sign Out</button><br>'+
			'</td>';

var SETTINGS_SIGNED_OUT ='<td><b>Plaxo content:</b><br>'+
			'<a href="http://www.plaxo.com/products/plaxo_2" class="lc" target="_blank">Learn more</a></td>'+
			'<td></td>'+
			'<td><b>You are currently '+
			'signed out</b> - <br>To sign in, go to <span id="cont" class="lk"><b>Contacts</b></span> or <b id="my_plaxo_login" class="lk">'+G_LANG_PLAXO_LOGIN+'</b>.</td>';

function gmail_create_plaxo_settings(){
	tr0 = document.getElementById("tr0");
	if(tr0){
		var settings_hr = '<td colspan="3" class="pr" style="padding:0pt;" height="2"></td>';
		var tr1, tr2;
			if(getCookie("PLAXO_UHID")!=null){
				tr2_inner = SETTINGS_SIGNED_IN;
			}else{
				tr2_inner = SETTINGS_SIGNED_OUT;
			}
		tr1 = document.createElement("tr");
		tr1.setAttribute("id", "tr1");
		tr0.parentNode.insertBefore(tr1, tr0);
		tr1.innerHTML = settings_hr;	

		tr2 = document.createElement("tr");
		tr2.setAttribute("id", "tr2");
		tr1.parentNode.insertBefore(tr2, tr1);			
		tr2.innerHTML = tr2_inner;
		both_get_globals();
	}else{
		var div_g;
		div_g = document.getElementById("g");
		if(div_g){
			var table_pe, tr0;
			table_pe = xpath("//table", div_g);

			for(var i=0; i<table_pe.snapshotLength; i++){
				var table_class = table_pe.snapshotItem(i).getAttribute("class");			
				if(table_class=="pe"){
					table_pe.snapshotItem(i).firstChild.firstChild.setAttribute("id", "tr0");
				}
			}
		gmail_create_plaxo_settings();
		}
	}
}

/**
 * ----------------
 * sign out of Plaxo
 * required functions(): 
 *	deleteCookie()
 * ----------------
 */
function plaxo_sign_out(){
	deleteCookie("PLAXO_UHID","/");
	deleteCookie("PLAXO_FOLDER_ID","/");
	deleteCookie("GMAIL_HEX_CHECK","/");
	if(getCookie("PLAXO_REMEMBER_ME")=="false"){
		deleteCookie("PLAXO_IDENTIFIER");
		deleteCookie("PLAXO_PASSWORD");
	}

	var tr2 = document.getElementById("tr2");
	tr2.innerHTML = SETTINGS_SIGNED_OUT;
}