// ==UserScript==
// @name           Add Submit Buttons (CoH)
// @namespace      tag:stargazer.coh,2009
// @description    Adds Submit/Preview Reply buttons above the message editing window on the City of Heroes forums
// @include        http://boards.cityofheroes.com/newreply.php*
// @include        http://boards.cityofheroes.com/private.php?do=*
// @include        http://boards.cityofheroes.com/newthread.php*
// @include        http://boards.cityofvillains.com/newreply.php*
// @include        http://boards.cityofvillains.com/private.php?do=*
// @include        http://boards.cityofvillains.com/newthread.php*
// ==/UserScript==


var tds = document.getElementsByTagName('td');
var str1 = '<div align=\"center\"><input type=\"submit\" class=\"button\" name=\"sbutton\" value=\"Submit Reply\" tabindex=\"1\" /><input type=\"submit\" class=\"button\" name=\"preview\" value=\"Preview Post\" tabindex=\"1\" /></div>';
var str2 = '<div align=\"center\"><input type=\"submit\" class=\"button\" name=\"sbutton\" value=\"Submit Message\" tabindex=\"1\" /><input type=\"submit\" class=\"button\" name=\"preview\" value=\"Preview Message\" tabindex=\"1\" /></div>';
var str3 = '<div align=\"center\"><input type=\"submit\" class=\"button\" name=\"sbutton\" value=\"Submit New Thread\" tabindex=\"1\" /><input type=\"submit\" class=\"button\" name=\"preview\" value=\"Preview Post\" tabindex=\"1\" /></div>';

try {	
	for (var i = 0, len=tds.length; i < len; i++) {		
		if (tds[i].className.indexOf('tcat') == 0) {				
			if(tds[i].innerHTML.indexOf('Reply to Thread') > -1){
				tds[i].innerHTML = str1 + tds[i].innerHTML;
				i = len;
			}
			else if(tds[i].innerHTML.indexOf('Send New Private Message') > -1){
				tds[i].innerHTML = str2 + tds[i].innerHTML;
				i = len;
			}
			else if(tds[i].innerHTML.indexOf('Post New Thread') > -1){
				tds[i].innerHTML = str3 + tds[i].innerHTML;
				i = len;
			}


		}	
	}	

} catch (error) {}