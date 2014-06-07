// ==UserScript==
// @name           (Sryth) Reset Time Display v1.2
// @namespace      none
// @include        http://www.sryth.com/game/ci.php?f_c=border_top.inc
// @description    Displays reset timers for the game www.sryth.com
// ==/UserScript==

// This is an updated (corrected) copy of the 1.0 version which is here: http://userscripts.org/scripts/show/56424. I just modified the minimum to make it work again. 

// 2011-05-24 v1.2 Updated the design of the donation box. 

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

function getMinutes(name){
	var now = new Date();
	var minutes = Math.round((getCookie(name) - now.getTime())/60000);
	if (minutes > 0 )
		return minutes+" minute(s)"
	else
		return '<font color="lawngreen">Ready</font>'
}

function constructRow(location){
	var textColour='white';
	var row;
	if (getCookie('watch')==location){
		textColour='gold';
		if (getMinutes(location).match('Ready')){
			alert ("Time to go to "+location)
			document.cookie = 'watch=null';
		}
	}
	row='<tr><td style="color:'+textColour+';font-size:75%"><b>'+location+'</b>:</td>'+
					'<td style="color:'+textColour+';font-size:75%">'+ getMinutes(location)+'</td></tr>'
	return row
}

function showSchedule(){
	var schedule=document.createElement("td");
	schedule.innerHTML='<td><table width=0% height=0% align="right">'+
		'<tr><td><table>'+
		constructRow('Archery')+
		constructRow('BoneHorde')+
		constructRow('Ogredom')+
		constructRow('Tarn')+
		'</table></td><td><table>'+
		constructRow('Axepath')+
		constructRow('BatCave')+
		constructRow('Jadefang')+
		constructRow('YirTanon')+
		'</table></td></tr>'+
	'</table><font color="white">'	+
	'<br/><a href="/game/ci.php?f_c=donate.inc" target="fmain" style="color:#ffffff;">Donate</a> to support Sryth&trade; and reward yourself.'+
	'<br/>Earn valuable <a href="/game/ci.php?f_c=donate.inc" target="fmain" style="color:#ffffff;">Adventurer Tokens</a> for your donation!'+
	'</font></td>';

	cells[i].parentNode.replaceChild(schedule,cells[i])
	
	var bolds=document.getElementsByTagName('b')
	for(var j=0;j<bolds.length;j++){
		bolds[j].addEventListener('click',clickScript,true);
	}
	
	window.setTimeout(showSchedule,5000);
}

function clickScript(event){
	if (getCookie('watch')==event.target.innerHTML)
		document.cookie = 'watch=null';
	else
		document.cookie = 'watch='+event.target.innerHTML;
	showSchedule();
}

var cells=document.getElementsByTagName('td')

for(var i=0;i<cells.length;i++){
	if (cells[i].width=='100%' && cells[i].align=='right')
		break;
}

showSchedule();