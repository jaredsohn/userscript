// ==UserScript==
// @name           eBay.com invoice (Item Description Keyword Locator)
// @namespace      Seifer - http://userscripts.org/users/33118
// @description    Displays any lines from the item description that have a specified keyword in it.
// @include        http://payments.ebay.com.au/ws/eBayISAPI.dll?UnifiedCheckOutSummary*
// ==/UserScript==



/*	===============================
	Specify any keywords in the item description that you want the script to pick up on.
	Seperate the words with a comma (,) ONLY.
	-----------------------------*/

var keywords = "bonus,free";

	// Specify the style of the added text on the invoice page.
	// This can be any STYLE attribute(s).
var style = "font-size:8px;text-align:left;padding-left:20px";

// ================================




keywords = keywords.split(',');

if ($('GM_Script_Links') && ($('GM_Script_Links').innerHTML.match('scripts/show/12405">GM') !== false)) {
	itemcell = 1;
} else {
	itemcell = 0;
}

var itemcells = new Array();
function sortNumber(a,b) { return a - b; }

function reverseIndexOf(haystack, needle, start){
	if(!start) { start=haystack.length; } else if(start < 0) { start = haystack.length + start; }
	needlelen = needle.length; haystacklen = haystack.length;
	i=0; while((haystack.substring((start-i)-needlelen,(start-i)) !== needle) && ((start-i)-needlelen) > -1) { i++; }
	return (start-i)-needlelen;
}

function stripHtml(s) {
	return s.replace(/(<([^>]+)>)/ig,"");
}

orderdetails = document.getElementById('orderdetails');
if(orderdetails.childNodes.length == 17) {
	itemtable = orderdetails.childNodes[9].rows[1].cells[1].childNodes[3].childNodes[3];
} else {
	itemtable = orderdetails.childNodes[11].rows[1].cells[1].childNodes[3].childNodes[3];
}
totalitems=0;
loadeditems=0;
faileditems=0;
itemno = new String();
finish = document.createElement('tr');
finish1 = document.createElement('td');
if(itemcell==1) {
	finish1.setAttribute('colspan','6');
} else {
	finish1.setAttribute('colspan','5');
}
finish1.setAttribute('style','text-align:center');
finish1.setAttribute('id','checkstatus');
finish = itemtable.appendChild(finish);
finish.appendChild(finish1);
$('checkstatus').innerHTML = 'Checking items for keywords...';


for (i=2; i<itemtable.rows.length ;i=i+2)
	{
	itemlink = itemtable.rows[i].cells[itemcell].getElementsByTagName('table')[0].rows[0].cells[1].getElementsByTagName('a')[0].getAttribute('href');
	itemno = itemlink.split('item=')[1].split('&')[0];
	itemcells[itemno] = itemtable.rows[i].cells[itemcell];
	totalitems++;
	GM_xmlhttpRequest({
		method: 'GET',
		url: itemlink,
		onload: function(responseDetails) {
			var text = responseDetails.responseText;
			loadeditems++;
			$('checkstatus').innerHTML = 'Checking items for keywords... ('+loadeditems+'/'+totalitems+')';
			itemno = "none";

			temp1 = text.split('Item number: \r\n								');
			if(temp1.length == 2) {
				itemno = temp1[1].split('</td>')[0];
			}
			if(!itemcells[itemno]) {
				faileditems++;
			} else {
				scrollingdiv = document.createElement('div');
				scrollingdiv.setAttribute('style',style);
				scrollingdiv.innerHTML = "";
				var ii = 0;
				while(word=keywords[ii]) {
					lastfind = text.indexOf('<!-- Begin Description -->');
					endofdes = text.indexOf('<!-- End Description -->');
					while(text.toLowerCase().indexOf(word,lastfind) > 0) {
						spos = text.toLowerCase().indexOf(word,lastfind);
						lastfind=spos+1;
						if(spos < endofdes) {
							var startpos = new Array();
							startpos[0]= reverseIndexOf(text.toLowerCase(),'<br',spos-1);
							startpos[1]= reverseIndexOf(text.toLowerCase(),'<p',spos-1);
							startpos[2]= reverseIndexOf(text.toLowerCase(),'<td',spos-1);
							startpos[3]= reverseIndexOf(text.toLowerCase(),'<tr',spos-1);
							startpos.sort(sortNumber);
							spos=startpos[startpos.length-1];

							var endpos = new Array();
							endpos[0]= text.toLowerCase().indexOf('<br',spos+1);
							endpos[1] = text.toLowerCase().indexOf('</p',spos+1);
							endpos[2] = text.toLowerCase().indexOf('</td',spos+1);
							endpos.sort(sortNumber);
							if(endpos[0] > 0) {
								string = text.substring(spos,endpos[0]);
							} else if(endpos[1] > 0) {
								string = text.substring(spos,endpos[1]);
							} else if(endpos[2] > 0) {
								string = text.substring(spos,endpos[2]);
							}
							string = stripHtml(string);
							if(string == "") {
								faileditems++;
							}
							if(scrollingdiv.innerHTML.indexOf(string) == -1) {
								scrollingdiv.innerHTML +=string+"<br>";
							}
						}
					}
					ii++;
				}
				itemcells[itemno].appendChild(scrollingdiv);
			}
			if(loadeditems == totalitems) {
				$('checkstatus').innerHTML = 'Finished checking items for keywords ('+faileditems+' failed)';
			}
		}
	});
}

	////////////////////////////////
    // Create script link-back (Concept by InsaneNinja)
    //
        if (!$('GM_Script_Links')) { var gsl = document.createElement('p'); gsl.setAttribute('id','GM_Script_Links');
            if ($('glbfooter')) $('glbfooter').appendChild(gsl); GM_addStyle('#GM_Script_Links a {display:block;color:#AAA!important;text-align: center}') }

        $('GM_Script_Links').innerHTML += '<a href="http://userscripts.org/scripts/show/xxxxx">GM - Item Description Keyword Locator)</a>';
    //
    // if ($('GM_Script_Links') && $('GM_Script_Links').innerHTML.match('scripts/show/xxxxx">GM')) (
    ////////////////////////////////


function $( elementId ) { return document.getElementById( elementId ); } // shortcut from "Prototype Javascript Framework"
function $$( elementName ) { return document.getElementsByName( elementName ); }


// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
// This auto update-notification script was made by Seifer
// You can find it at http://userscripts.org/scripts/show/12193
// ========================================================
// === Edit the next four lines to suit your script. ===
scriptName='eBay.com invoice (Item Description Keyword Locator)';
scriptId='13548';
scriptVersion=1.00;
scriptUpdateText='First release.';
// === Stop editing here. ===


var lastCheck = GM_getValue('lastCheck', 0);
var lastVersion = GM_getValue('lastVersion', 0);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds

if (currentTime > (lastCheck + 86400)) { //24 hours after last check
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
		onload: function(responseDetails) {
			var text = responseDetails.responseText;
   	 		var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
    		var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
    		if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
	    		GM_addStyle('#gm_update_alert {'
				+'	position: relative;'
				+'	z-index: 99;'
				+'	top: 0px;'
				+'	left: 0px;'
				+'	width: 100%;'
				+'	background-color: yellow;'
				+'	text-align: center;'
				+'	font-size: 11px;'
				+'	font-family: Tahoma;'
				+'}'
				+'#gm_update_alert_buttons {'
				+'	position: relative;'
				+'	top: -5px;'
				+'	margin: 7px;'
				+'}'
				+'#gm_update_alert_button_close {'
				+'	position: absolute;'
				+'	right: 0px;'
				+'	top: 0px;'
				+'	padding: 3px 5px 3px 5px;'
				+'	border-style: outset;'
				+'	border-width: thin;'
				+'	z-index: inherit;'
				+'	background-color: #FF0000;'
				+'	color: #FFFFFF;'
				+'	cursor:pointer'
				+'}'
				+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
				+'	text-decoration:underline;'
				+'	color: #003399;'
				+'	font-weight: bold;'
				+'	cursor:pointer'
				+'}'
				+'#gm_update_alert_buttons span a:hover  {'
				+'	text-decoration:underline;'
				+'	color: #990033;'
				+'	font-weight: bold;'
				+'	cursor:pointer'
				+'}');
	    		newversion = document.createElement("div");
	    		newversion.setAttribute('id', 'gm_update_alert');
	    		newversion.innerHTML = '<div id="gm_update_alert">'
				+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
				+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
				+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
				+'	<br>'
				+'	<div id="gm_update_alert_button_close">'
				+'		Close</div>'
				+'	<b>What do you want to do?</b><br>'
				+'	<div id="gm_update_alert_buttons">'
				+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show Update Info</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go To Script Homepage</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade to version '+onSiteVersion+'</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t remind me again until tomorrow</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t remind me again'
				+'		until the next new version</a></span> </div>'
				+'</div>';
				document.body.insertBefore(newversion, document.body.firstChild);
				document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) { alert(onSiteUpdateText); }, true);
				document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) { GM_setValue('lastCheck', currentTime); alert("You will not be reminded again until tomorrow."); document.body.removeChild(document.getElementById('gm_update_alert')); }, true);
       			document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) { GM_getValue('lastVersion', onSiteVersion); alert("You will not be reminded again until the next new version is released."); document.body.removeChild(document.getElementById('gm_update_alert')); }, true);
				document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) { document.body.removeChild(document.getElementById('gm_update_alert')); }, true);
	    	}
	    }
	});
}