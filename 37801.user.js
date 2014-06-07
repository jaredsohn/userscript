// ==UserScript==
// @name           Yigg Smilies
// @namespace      zmarn
// @include        *.yigg.de/*
// ==/UserScript==
if(document.getElementsByTagName('textarea')[0]) {
var ham = "document.getElementsByTagName('textarea')[0].value = document.getElementsByTagName('textarea')[0].value + '";

var oharry = 
'<style>#wrapsc {border: thin solid #BBBBBB;background: #CCCCCC;padding: 3px;margin: 2px;height: 194px;width: 120px;overflow: auto;} .scmile{cursor: pointer;border: thin solid #CCCCCC;background: #EEEEEE;text-align: center;padding: 3px;margin: 2px;} .scmile: hover{border: thin solid #CCEECC;background: #EECCEE;}</style>' +
'<div id="wrapsc" style="visibility: hidden; position:absolute; margin-top: -285px; margin-left: 500px;">' +
'	<div class="row">' +
'		<div class="scmile" onclick="' + ham +' :) ' + "'" + '" )>' +
'			<img alt="smile.png" src="http://www.yigg.de/images/smilies/smile.png"><br>' +
'			:)' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' :( ' + "'" + '" )>' +
'			<img alt="frown.png" src="http://www.yigg.de/images/smilies/frown.png"><br>' +
'			:(' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' :* ' + "'" + '" )>' +
'			<img alt="kiss.png" src="http://www.yigg.de/images/smilies/kiss.png"><br>' +
'			:*' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' ;) ' + "'" + '" )>' +
'			<img alt="wink.png" src="http://www.yigg.de/images/smilies/wink.png"><br>' +
'			;)' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' :0 ' + "'" + '" )>' +
'			<img alt="suprised.png" src="http://www.yigg.de/images/smilies/suprised.png"><br>' +
'			:0' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' 8) ' + "'" + '" )>' +
'			<img alt="cool.png" src="http://www.yigg.de/images/smilies/cool.png"><br>' +
'			8)' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' :[ ' + "'" + '" )>' +
'			<img alt="embarrassed.png" src="http://www.yigg.de/images/smilies/embarrassed.png"><br>' +
'			:[' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' 0:) ' + "'" + '" )>' +
'			<img alt="innocent.png" src="http://www.yigg.de/images/smilies/innocent.png"><br>' +
'			0:)' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' :/ ' + "'" + '" )>' +
'			<img alt="undecided.png" src="http://www.yigg.de/images/smilies/undecided.png"><br>' +
'			:/' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *rofl* ' + "'" + '" )>' +
'			<img alt="rofl.gif" src="http://www.yigg.de/images/smilies/rofl.gif"><br>' +
'			rofl ' +
'		</div>' +
'	</div>' +
'	<div class="row">' +
'		<div class="scmile" onclick="' + ham +' *popcorn* ' + "'" + '" )>' +
'			<img alt="popcorn.gif" src="http://www.yigg.de/images/smilies/popcorn.gif"><br>' +
'			popcorn' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *keks* ' + "'" + '" )>' +
'			<img alt="keks.gif" src="http://www.yigg.de/images/smilies/keks.gif"><br>' +
'			keks' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *horse* ' + "'" + '" )>' +
'			<img alt="horse.gif" src="http://www.yigg.de/images/smilies/horse.gif"><br>' +
'			horse ' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *zeitung* ' + "'" + '" )>' +
'			<img alt="zeitung.gif" src="http://www.yigg.de/images/smilies/zeitung.gif"><br>' +
'			zeitung' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *hammer* ' + "'" + '" )>' +
'			<img alt="hammer.gif" src="http://www.yigg.de/images/smilies/hammer.gif"><br>' +
'			hammer ' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *motzen* ' + "'" + '" )>' +
'			<img alt="motzen.gif" src="http://www.yigg.de/images/smilies/motzen.gif"><br>' +
'			motzen' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *kotzen* ' + "'" + '" )>' +
'			<img alt="kotzen.gif" src="http://www.yigg.de/images/smilies/kotzen.gif"><br>' +
'			kotzen ' +
'		</div>' +
'' +
'		<div class="scmile" onclick="' + ham +' *bomb* ' + "'" + '" )>' +
'			<img alt="bomb.gif" src="http://www.yigg.de/images/smilies/bomb.gif"><br>' +
'			bomb' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *mail* ' + "'" + '" )>' +
'			<img alt="mail.gif" src="http://www.yigg.de/images/smilies/mail.gif"><br>' +
'			mail ' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *blink* ' + "'" + '" )>' +
'			<img alt="blink.gif" src="http://www.yigg.de/images/smilies/blink.gif"><br>' +
'			blink' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *schocker* ' + "'" + '" )>' +
'			<img alt="schocker.gif" src="http://www.yigg.de/images/smilies/schocker.gif"><br>' +
'			schocker ' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *rolleyes* ' + "'" + '" )>' +
'			<img alt="rolleyes.gif" src="http://www.yigg.de/images/smilies/rolleyes.gif"><br>' +
'			rolleyes' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *dance* ' + "'" + '" )>' +
'			<img alt="dance.gif" src="http://www.yigg.de/images/smilies/dance.gif"><br>' +
'			dance ' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *pirate* ' + "'" + '" )>' +
'			<img alt="pirate.gif" src="http://www.yigg.de/images/smilies/pirate.gif"><br>' +
'			pirate' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *streber* ' + "'" + '" )>' +
'			<img alt="streber.gif" src="http://www.yigg.de/images/smilies/streber.gif"><br>' +
'			streber ' +
'		</div>' +
'' +
'		<div class="scmile" onclick="' + ham +' *mrpotato* ' + "'" + '" )>' +
'			<img alt="mrpotato.png" src="http://www.yigg.de/images/smilies/mrpotato.png"><br>' +
'			mrpotato' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *bug* ' + "'" + '" )>' +
'			<img alt="bug.png" src="http://www.yigg.de/images/smilies/bug.png"><br>' +
'			bug ' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *coffee* ' + "'" + '" )>' +
'			<img alt="coffee.png" src="http://www.yigg.de/images/smilies/coffee.png"><br>' +
'			coffee' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *atomic* ' + "'" + '" )>' +
'			<img alt="atomic.png" src="http://www.yigg.de/images/smilies/atomic.png"><br>' +
'			atomic' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *game* ' + "'" + '" )>' +
'			<img alt="game.png" src="http://www.yigg.de/images/smilies/game.png"><br>' +
'			game' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *peace* ' + "'" + '" )>' +
'			<img alt="peace.gif" src="http://www.yigg.de/images/smilies/peace.gif"><br>' +
'			peace' +
'		</div>' +
'		<div class="scmile" onclick="' + ham +' *party* ' + "'" + '" )>' +
'			<img alt="party.gif" src="http://www.yigg.de/images/smilies/party.gif"><br>' +
'			party' +
'		</div>' +
'' +
'</div>';
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = document.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
var ep = 'document.getElementsByTagName("textarea")[0].style.width = "360px";' + 
'document.getElementById("wrapsc").style.visibility = "visible"; ';

var hokuspokus = getElementsByClass('editor','document','div')[0].innerHTML;
var spliteronie = hokuspokus.split("<br>");
getElementsByClass('editor','document','div')[0].innerHTML = spliteronie[0] + "<div style='margin-top: -27px; margin-left: 120px; float: left; background:url(http://zmarn.de/smiles/smiles.png) no-repeat; width:24px; height:24px;' onclick='" + ep + "'></div><br>" + spliteronie[1];

document.getElementById("Pagination").innerHTML = oharry;
}