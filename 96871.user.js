// ==UserScript==
// @name           Betapet
// @namespace      se.betapet
// @description    Betapet counter
// @include        http://www.betapet.se/*
// ==/UserScript==

(function ()
{
	if (document.URL.search('client.php') == -1)
	{
		var a, link, href;
		a = document.evaluate(
			'//a[contains(@onclick, \'client.php\')]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var j = 0; j < a.snapshotLength; j++) {
			link = a.snapshotItem(j);
			onclick = link.getAttribute('onclick');
			if (onclick = onclick.replace(/height=600/gi, 'height=732')){
				link.setAttribute('onclick', onclick);
			}
		}
	}
	else
	{
	var myContent = document.getElementById('myContent');
	if (myContent != null)
	{
		myContent.setAttribute('height', '80%'); // Overridden by CSS!
	} 
	}
})();

if (document.URL.search('client.php') != -1) {
var letters = '_abcdefghijklmnoprstuvxyzåäö';
var string = '<table id="table2" border="0" cellpadding="0" cellspacing="0" width="462px" height="66px">';
string    += '<td id="td_" onclick="javascript:decrease(this.id.charAt(2),event)" background="http://www.betapet.se/ill/letters/46/joker.gif"/></td>';

for (var i = 1; i<(letters.length-3); i++)
{
	string += '<td id="td' + letters[i] + '" onclick="javascript:decrease(this.id.charAt(2), event)" background="http://www.betapet.se/ill/letters/46/' + letters[i] + '.gif"/></td>';	
	if (i== 13)
		string += '</tr><tr>';
}

string += '<td id="tdå" onclick="javascript:decrease(this.id.charAt(2),event)" background="http://www.betapet.se/ill/letters/46/aring.gif"/></td>';
string += '<td id="tdä" onclick="javascript:decrease(this.id.charAt(2),event)" background="http://www.betapet.se/ill/letters/46/auml.gif"/></td>';
string += '<td id="tdö" onclick="javascript:decrease(this.id.charAt(2),event)" background="http://www.betapet.se/ill/letters/46/ouml.gif"/></td></tr></table>';

var betaCount = document.createElement("div");
betaCount.innerHTML = '<style type="text/css">'
+'<!--'
+'#betacount #table1 {'
+'background-color: #CCCCCC !important;'
+'}'
+ 'a {'
+'text-decoration: none !important;'
+'color: #000000 !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 8px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+ '}'
+ 'div.small {'
+'text-decoration: none !important;'
+'color: #000000 !important;'
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'
+'font-size: 8px !important;'
+'font-weight: bold !important;'
+'font-style: normal !important;'
+ '}'
+'#table2 td {'
+' width:33px;'
+' height:33px;'
+' vertical-align: bottom !important;'
+' font-size:8px;'
+' font-family:Verdana;'
+'}'
+'textarea.Count {'
+'width:150px;'
+'height:50px;'
+'padding:5px;'
+'font-size:12px;'
+'font-family:Verdana;'
+'border-color:#959385;'
+'border-style:solid;'
+'}'
+'-->'
+'</style>'
+'<div style="position: fixed; width: 100%; height: 66px; z-index: 100; right; bottom: 0pt; left: 0pt" id="betacount">'
+'<table border="0" cellpadding="0" cellspacing="0" width="100%" height="66" id="table1" bgcolor="#C0C0C0">'
+'<tr><td width="462px" height="66px">'
+ string
+ '</td>'
+ '<td width="132px" height="66px"  background="http://www.betapet.se/ill/letters/46/blank.gif">'
+ '<form><textarea class="CountBox" id="bricktextarea" rows="1" '
+ 'onkeydown="if((event.which &amp;&amp; event.which == 13) || (event.keyCode &amp;&amp; event.keyCode == 13)){update(this, event);return false}else{return true}"'
+ 'onblur="this.value=\'\'"'
+ '></textarea><br></form>'
+ '</td>'
+ '</td><td width="132px" height="66px" background="http://www.betapet.se/ill/letters/46/blank.gif"><div id="history" class="small"></div></td>'
+ '<td valign="top" halign="top" width="33px" height="33px" background="http://www.betapet.se/ill/letters/46/joker.gif">'
+ '<a href=javascript:reset()>&nbsp;Reset</a><br/><br/>'
+ '<div id=sum class="small"></div>'
+ '</td></tr></table></div>'

document.body.appendChild(betaCount, document.body.firstChild);



var globals = "var letters = '_abcdefghijklmnoprstuvxyzåäö';"
	    + "var count = new Array(2,8,2,1,5,7,2,3,2,5,1,3,5,3,6,5,2,8,8,8,3,2,1,1,1,2,2,2);"
	    + "var currentcount = new Array(2,8,2,1,5,7,2,3,2,5,1,3,5,3,6,5,2,8,8,8,3,2,1,1,1,2,2,2);"
	    + "var point = new Array(0,1,4,8,1,1,3,2,2,1,7,2,1,2,1,2,4,1,1,1,4,3,8,7,10,4,3,4);"
	    + "var backups = new Array();"
	    + "var historyitems;"
	    + "var historycount = 0;";
	    
function reset() {
	for (var i=0; i<count.length; i++)
        { 
             var c = letters[i];
             if (currentcount[i] <= 0)
                  document.getElementById('td' + c ).style.background = backups['td' + c];
             currentcount[i] = count[i];
        } 
	
	for (var i=0; i<letters.length; i++)
	{
		var el = document.getElementById("td" + letters[i]);
		el.innerHTML = currentcount[i];
	}
	
	var sum = 0;
	for (var i=0; i<currentcount.length; i++) sum += currentcount[i];
	document.getElementById("sum").innerHTML = "<b>&nbsp;Kvar: <br\>&nbsp;" + sum + "</b>";
	
	historyitems = new Array();
	historycount = 0;
	document.getElementById("history").innerHTML = "Textrutan uppdaterar räkningen när du trycker retur.<br/>Håll shift intryckt för att ångra/räkna upp.<br/>";
}
	    
function decrease(c,e) { 
	var s = '';
	var count = currentcount[letters.indexOf(c)];
	if (e.shiftKey == 1) {
		if (count == 0)
			document.getElementById('td' + c ).style.background = backups['td' + c];
		count++;
	} else if (count > 0) {
		count--;
		if (count == 0) {
			backups['td' + c] = document.defaultView.getComputedStyle(document.getElementById('td' + c ),null).getPropertyValue('background-image');
			document.getElementById('td' + c ).style.background = 'url(http://www.betapet.se/ill/letters/46/blank.gif)';
		}
	}
		
	currentcount[letters.indexOf(c)] = count;
	
	if (count < 1) {
		document.getElementById('td' + c ).innerHTML = '&nbsp;'; //<img height=33 width=33 src="http://www.betapet.se/ill/letters/46/blank.gif"';
	} else 
		document.getElementById('td' + c ).innerHTML = count;
	
	var sum = 0;
	for (var i=0; i<currentcount.length; i++) sum += currentcount[i];
	document.getElementById("sum").innerHTML = "<b>&nbsp;Kvar:<br\>&nbsp;" + sum + "</b>";
	
	historyitems[historycount] = (e.shiftKey == 1)? '+' + c : c;
	historycount++;	
	
	var s = '';
	for (var i=6; i>0; i--)
	{
		if (historycount - i >= 0) 
			s += historyitems[historycount - i] + '<br/>';
	}
	document.getElementById("history").innerHTML = s;
}

function update(textbox, event) {
	var s = textbox.value;
	var i = 0;
	for (i=0; i<s.length; i++) {
		if (letters.indexOf(s[i]) != -1)
			decrease(s[i].toLowerCase(), event);
		else if (s[i] == ' ')
			decrease('_', event);
	}
	historycount -= i;
	
	historyitems[historycount] = (event.shiftKey == 1)? '+' + s : s;
	historycount++;	
	
	var s = '';
	for (i=6; i>0; i--)
	{
		if (historycount - i >= 0) s += historyitems[historycount - i] + '<br/>';
	}
	document.getElementById("history").innerHTML = s;
}

var init = "reset();";

var script = document.createElement('script');
script.innerHTML = globals + reset + decrease + update + init;
document.getElementsByTagName('head')[0].appendChild(script); 
}
