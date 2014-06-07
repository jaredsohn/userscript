/********************************************************************
* Author: X.Free
* Helpers: Klay, Mickey, RefleXMec, Jacques, Link
* Special Thanks: 
*       Klay, Gunar Bastos, KillBill, Morgoth, Mickey, X.Jack, RefleX, Jacques, Perse,
*       Link (Formatting Bar Rox man! Thank You!), Kyllopardium (comming soon new emoticons and help),
*       Elsio Antunes, Rodrigo Lacerda and everybody that use the script.
======================||Usefull:||===================================
Formatting Bar - http://www.orkut.com/Community.aspx?cmm=8515367
Blackut - http://www.orkut.com/Community.aspx?cmm=10033319
======================||History:||===================================
* Version: 1.5 - 05/05/2006 01:13
* News: 
*       +Quotes bug Fixed 
*        Example: "[quote] The quoted message [/quote]"
*       +Quotes with the nick! 
*        Example: "[quote=nickname] The quoted message [/quote]"

* Version: 1.4 - 15/04/2006 18:08
* News: 
*       +Window Title bug fixed
*       +Quotes!!! [quote] message [/quote]
*       +FSOrkut Help in English.

* Version: 1.3 - 22/03/2006 18:29
* News: 
*       +Preview & captchaImage bug fixed (by Jacques)
*       +Compatible with X.Krapkiller console.
*       +FSOrkut Help in English.

* Version: 1.1[beta] - 12/03/2006 04:32
* News: 
*       +X.Tra Emoticons [^^], [¬¬] e [:/] (by X.Free)
*       +Notify updates
*
********************************************************************/
// ==UserScript==

// @name           FSOrkut
// @namespace      X.Free http://www.orkut.com/Profile.aspx?uid=11084727503075855961
// @description    Font color, bold, italic, underlinde, emoticons and links on your profile about and community description
// @include        http://www.orkut.com/*
// @exclude        *.js


// ==/UserScript==
/*-----### Begin of Atualization Request ###-----*/
			var FSOrkutAtualver = '1.5';
			GM_xmlhttpRequest({
  			  method: 'GET',
  			  url: 'http://www.auserver.net/xkriptz/vr.js',
  			  headers: {
  			      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
  			      'Accept': 'text/js',
 			   },
			    onload: function(str) {
				eval(str.responseText);
				var fso_atualization = document.getElementById('fso_atualization');
				if(FSOrkutAtualver<FSOrkut_ver)
				 	{
				 	if(!fso_atualization)return;
				 	else fso_atualization.innerHTML =    "<b><a class='H' href='" + FSOrkut_file +
											   	 "'title='Clique com o botýo direito e selecione *Install User Script* para atualizar sua vers\xE3o.'>[!]</a></b>";
					
					}
				else 
					{
					if(!fso_atualization)return; 
					else fso_atualization.innerHTML = '';												   	 
					}

				}
			});
/*-----### End of Atualization Request ###-----*/

/*Begin of Quote Style configuration ||by X.Free||*/
var quote_Type = new Array("fieldset", "div")
quote_Type = quote_Type[1]
// Let "" (none) as defaut (border, font and background color black, font verdana and fontsize 12)
var quote_bgColor = "#d4dded"
var quote_fontColor = "" 
var quote_borderColor = "#2242c0"
var quote_fontSize = "10"
var quote_fontFamily = "Verdana"
var quote_LegendColor = quote_fontColor
var quote_Link
if(window.location.href.match("CommMsgs.aspx")){quote_Link = "CommMsgPost.aspx?" + location.href.match(/cmm=\d*.tid=\d*/gi);} else {quote_Link = "Community.aspx?cmm=9133609";}
var quote_Legend = "<b><a style='text-decoration: none; color:" + quote_LegendColor + "'href='" + quote_Link + "'>FSOrkut Quote: </a></b>"
if(quote_Type=="fieldset"){quote_Legend = "<legend>" + quote_Legend + "</legend>"}
/*End of Quote Style configuration*/


var FSOrkut_replacer = document.body.innerHTML;


/*Begin of Preview & captchaImage bug fixer ||by Jacques||*/
if(FSOrkut_replacer.indexOf("textarea") > -1){
	var backup = new Array();
	backup = document.getElementsByTagName("textarea");
	var y=0;
	storage_textarea = new Array();
	while(backup[y] != null){
		storage_textarea[y]=escape(document.getElementsByTagName("textarea").item(y).value);
		y++;
	}
}
if(FSOrkut_replacer.indexOf("input") > -1){
	var backup_input = new Array();
	backup_input = document.getElementsByTagName("input");
	y=0;
	storage_input = new Array();
	while(backup_input[y] != null){
		storage_input[y] = escape(document.getElementsByTagName("input").item(y).value);
		y++;
	}
}
/*End of Preview & captchaImage bug fixer*/

/************************/

document.body.innerHTML = FSOrkut_replacer

/* -> Quotes!!!
*******************************************************/
.replace(/\[quote=(.*?)\]/gi, "<" + quote_Type + " style='font-family:" + quote_fontFamily + ";color:" + quote_fontColor + "; margin:10px 20px 10px 20px;padding:5px 10px 5px 10px; BACKGROUND-COLOR:"+ quote_bgColor + "; BORDER: " + quote_borderColor + " 1px solid;font-size:10px;'><legend><b>$1 disse:</b></legend>")
.replace(/\[quote\]/gi, "<" + quote_Type + " style='font-family:" + quote_fontFamily + ";color:" + quote_fontColor + "; margin:10px 20px 10px 20px;padding:5px 10px 5px 10px; BACKGROUND-COLOR:"+ quote_bgColor + "; BORDER: " + quote_borderColor + " 1px solid;font-size:10px;'>" + quote_Legend)
.replace(/\[\/quote\]/g, "</" + quote_Type + ">")
/* ->   (/\[quote=(.*?)[@](\d+)\]/gi, "<" + quote_Type + " style='font-family:" + quote_fontFamily + ";color:" + quote_fontColor + "; margin:10px 20px 10px 20px;padding:5px 10px 5px 10px; BACKGROUND-COLOR:"+ quote_bgColor + "; BORDER: " + quote_borderColor + " 1px solid;font-size:10px;'><legend><b><a href='Profile.aspx?uid=$2' class='N'>$1</a> disse:</b></legend>")
Desabilitado, bug caso haja mais de um quote no mesmo post com @
*******************************************************/
.replace(/\[code\]/gi, "<div style='position:static; z-index:1; overflow: auto; width:80%; margin:10px 20px 10px 20px;padding:5px 10px 5px 10px;'>")
.replace(/\[\/code\]/g, "</div>")
/* -> Fonts
*******************************************************/
.replace(/\[verdana\]/gi, "<font face='Verdana'>")
.replace(/\[\/verdana\]/gi, "</font>")
.replace(/\[arial\]/gi, "<font face='Arial'>")
.replace(/\[\/arial\]/gi, "</font>")
.replace(/\[georgia\]/gi, "<font face='Georgia'>")
.replace(/\[\/georgia\]/gi, "</font>")
.replace(/\[geneva\]/gi, "<font face='Geneva'>")
.replace(/\[\/geneva\]/gi, "</font>")
.replace(/\[csans\]/gi, "<font face='Comic Sans MS'>")
.replace(/\[\/csans\]/gi, "</font>")

/* -> Bold, Italic & Underline
*******************************************************/
.replace(/\[b\]|\$b\;/gi,"<b>")
.replace(/\[\/b\]/gi,"</b>")
.replace(/\[u\]|\$u\;/gi,"<u>")
.replace(/\[\/u\]/gi,"</u>")
.replace(/\[i\]|\$i\;/gi,"<i>")
.replace(/\[\/i\]/gi,"</i>")

/* -> Colors
*******************************************************/
//White
.replace(/\[white\]|\$0\;/gi, "<font color='white'>")
.replace(/\[\/white\]/gi, "</font>")
//Black
.replace(/\[black\]|\$1\;/gi, "<font color='black'>")
.replace(/\[\/black\]/gi, "</font>")
//Navy
.replace(/\[navy\]|\$2\;/gi, "<font color='navy'>")
.replace(/\[\/navy\]/gi, "</font>")
//Green
.replace(/\[green\]|\$3\;/gi, "<font color='green'>")
.replace(/\[\/green\]/gi, "</font>")
//Red
.replace(/\[red\]|\$4\;/gi, "<font color='red'>")
.replace(/\[\/red\]/gi, "</font>")
//Maroon
.replace(/\[maroon\]|\$5\;/gi, "<font color='maroon'>")
.replace(/\[\/maroon\]/gi, "</font>")
//Purple
.replace(/\[purple\]|\$6\;/gi, "<font color='purple'>")
.replace(/\[\/purple\]/gi, "</font>")
//Orange
.replace(/\[orange\]|\$7\;/gi, "<font color='orange'>")
.replace(/\[\/orange\]/gi, "</font>")
//Yellow
.replace(/\[yellow\]|\$8\;/gi, "<font color='yellow'>")
.replace(/\[\/yellow\]/gi, "</font>")
//Olive
.replace(/\[olive\]|\$9\;/gi, "<font color='olive'>")
.replace(/\[\/olive\]/gi, "</font>")
//Lime
.replace(/\[lime\]|\$10\;/gi, "<font color='lime'>")
.replace(/\[\/lime\]/gi, "</font>")
//Aqua
.replace(/\[aqua\]|\$11\;/gi, "<font color='aqua'>")
.replace(/\[\/aqua\]/gi, "</font>")
//Blue
.replace(/\[blue\]|\$12\;/gi, "<font color='blue'>")
.replace(/\[\/blue\]/gi, "</font>")
//Pink
.replace(/\[pink\]|\$13\;/gi, "<font color='pink'>")
.replace(/\[\/pink\]/gi, "</font>")
//Gray
.replace(/\[gray\]|\$14\;/gi, "<font color='gray'>")
.replace(/\[\/gray\]/gi, "</font>")
//Silver
.replace(/\[silver\]|\$15\;/gi, "<font color='silver'>")
.replace(/\[\/silver\]/gi, "</font>")
//Fuchsia
.replace(/\[fuchsia\]|\$16\;/gi, "<font color='fuchsia'>")
.replace(/\[\/fuchsia\]/gi, "</font>")
//Gold
.replace(/\[gold\]|\$17\;/gi, "<font color='gold'>")
.replace(/\[\/gold\]/gi, "</font>")
//Teal
.replace(/\[teal\]|\$18\;/gi, "<font color='teal'>")
.replace(/\[\/teal\]/gi, "</font>")
//Violet
.replace(/\[violet\]|\$19\;/gi, "<font color='violet'>")
.replace(/\[\/violet\]/gi, "</font>")

/* -> To close all tags (usefull on nick)
*******************************************************/
.replace(/\$c\;/gi, "</b></i></u></font></font>")

/* -> Emoticons
*******************************************************/
.replace(/\[8\)\]/gi, "<img  border='0' src='img/i_cool.gif'>")
.replace(/\[:\(\]/gi, "<img  border='0' src='img/i_sad.gif'>")
.replace(/\[:\)\]/gi, "<img  border='0' src='img/i_smile.gif'>")
.replace(/\[;\)\]/gi, "<img  border='0' src='img/i_wink.gif'>")
.replace(/\[:d\]/gi, "<img  border='0' src='img/i_bigsmile.gif'>")
.replace(/\[:o\]/gi, "<img  border='0' src='img/i_surprise.gif'>")
.replace(/\[:p\]/gi, "<img  border='0' src='img/i_funny.gif'>")
.replace(/\[:x\]/gi, "<img  border='0' src='img/i_angry.gif'>")
.replace(/\[\/\)\]/gi, "<img  border='0' src='img/i_confuse.gif'>")


/* -> X.Tra emoticons
*******************************************************/
//[olhinhos brilhando] - Dedicado ao Klay!!!//
.replace(/\[olhinhos brilhando\]|\[8\.8\]/gi, "<img  border='0' src='data:image/gif;base64,R0lGODlhEAAQANUAAAAAABMPBRUTCBoaGiUfCyYhCzQyL0MvFUc8ME1AFkpFPGlaNn1iJ0xLSG1VQnhtWXJwbpl7OLx%2FNoBzSYV%2Bc6x%2FTLJ%2FRrWVOL2kPI%2BFcpKMcrOMUqiScLaieMWNOMyWO9CWPdOqPsmSS8ObYtiqRceobMaqd8mxd9euaNaoe%2BucUO%2BxTPCzavLOSPrnS5CQj6%2BfhbiskLKyssq0j8i8ptXJsfrShubRr%2F3luM7Ozufbxvns1uTk5Pnx5fj4%2BAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFFAAAACwAAAAAEAAQAAAGxUCAUKiLwY6z3nCpg9VosejsqRzGaLSaTne7zUpTnfBa2%2FXOux3OxjppnzWIodFL7xQGxsrUKUJePgEIXQg5Mj8MIzMzGT8QMgIGCws%2FMi8DAxEdMBw%2FngIQk54%2FcxccHCkIDy8%2FBBgYBRQQPwkkpywiDgoCIS0uIQ0GByQtpyrHJMQuyy0tK88cJirPIB%2B%2Bv9bNezUlK8Qtvcq9LSY3HTMjJMwS6i4tIieLAF0oviIcG74kJzE3Qz0pPHiwoKGCQBH%2BhAQBACH5BAUUAAAALAIABQAMAAUAAAYpQErgN2gAAI0fMQJ5%2FHyyo2xg8EEaBsDrCIAIBlvAD8I9%2FsqHbFnADQIAIfkEBRQAAAAsAgAFAAwABQAABipAyE%2BWQwAAiEDuxRgMAL%2Ff0RCNHhvCI2AAUUgBOZ4WEPDJxo0xQLEABAEAIfkEBRQAAAAsAgAFAAwABQAABilAgDAgLMp%2BQgXRUFQABgOIzzCQCWW%2B3wOyHQQewu3PMBH%2BiMXA7wAIAgA7' border='0'>")
.replace(/\[\\o\/\]/gi, "<img  border='0' src='http://photobucket.com/albums/e242/xkriptz/th_d7e12690.gif'>")
.replace(/\[y\]/gi, "<img  border='0' src='http://i5.photobucket.com/albums/y186/gbpfm/up.png'>")
.replace(/\[n\]/gi, "<img  border='0' src='http://i5.photobucket.com/albums/y186/gbpfm/down.png'>")
.replace(/\[6\]/gi, "<img  border='0' src='http://i5.photobucket.com/albums/y186/gbpfm/devil.png'>")
.replace(/\[\xAC\xAC\]/g, "<img border='0' src='data:image/gif;base64,R0lGODlhDwAPAIcAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAANgALAAAAAAPAA8AAAiSALEJxMbKSowVK%2FSwGsjQihU%2FzKSl8uOQITYWoqRNk8axGbM%2FUAZaUcWxJEdmzAAFImjFGoCXAKTBBFANSkFUJmOWpPkn0AqTQKWhRGVlxcagJZk1Q4j0pFBmLKyMEgo0orRmfgIVREm1q9IY0bBJjUiWRExmWQeuEOURJUqsIRs%2B9JhKlJUrFgUWRLjCysKBAQEAOw%3D%3D'>")
.replace(/\[:\/\]/g, "<img border='0' src='data:image/gif;base64,R0lGODlhDwAPAIcAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAANgALAAAAAAPAA8AAAiPALEJxMbKSowVK%2FSwGsjQihU%2FzKSl8mOFC0NsK0RJmyatYzNmeawMtLKqozQAHQFEBBSIoBWTKGEyY2alIKqUJ3Gq9BNohcmfP5mJsrKCI1CTEZshPPpTJTMWVkZJixgUZTOeBWdO7cgMJbNmMaJhixqxrFdmPAdm%2FDhz5lUoFx36%2BZhq6JWLAgsiXFGTYUAAOw%3D%3D'>")
.replace(/\[\^\^\]/g, "<img border='0' src='data:image/gif;base64,R0lGODlhDwAPAIcAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAANgALAAAAAAPAA8AAAiSALEJxMbKSowVK%2FSwGsjQihU%2FzKSl8mOFC0NsK0RJmyatYzNmeawMtLKqI4CO0gBEBBSIoBWTKWOqZGalIKqYME0y8xNoBcqfKCOKsrKCI9CfzJohlMbsJNCmzFBBsTIKZ9CUzXgWZNaUqdeTzaq0wkY1IoCzZ7nyHJjxI1euWaFcdOjnY6qhVy4KLIhwRU2GAQEAOw%3D%3D'>");



if(FSOrkut_replacer.indexOf("<textarea") > -1){
	y=0;
	while(storage_textarea[y] != null){
		document.getElementsByTagName("textarea").item(y).value = unescape(storage_textarea[y]);
		y++;
	}
}
if(FSOrkut_replacer.indexOf("<input") > -1){
	y=0;
	while(storage_input[y] != null){
		document.getElementsByTagName("input").item(y).value = unescape(storage_input[y]);
		y++;
	}
}

/* -> HElp
*******************************************************/
var FSOrkut_Help = unescape("%20%7C%20%09%3Ca%20id%3D%22fso_help%22%20class%3D%22H%22%20href%3D%22%23%22onClick%3D%22javascript%3A%20window.open%28%27http%3A//xkriptz.vilabol.uol.com.br/fsOrkut_help.html%27%2C%20%27FSOrkut%20Help%27%2C%20%27menubar%3Dno%2Clocation%3Dno%2Cresizable%3Dno%2Cscrollbars%3Dyes%2Cstatus%3Dno%2Cwidth%3D400%2Cheight%3D350%27%29%22%3EFSOrkut%20Help%3C/a%3E%3Clabel%20id%3D%22fso_atualization%22%3E%3C/label%3E");
var FSOrkutAtualization = unescape("%3Cb%3E%3Ca%20class%3D%22H%22%20href%3D%22http%3A//auserver.net/xkriptz/FSOrkut.user.js%22%20title%3D%22Clique%20com%20o%20bot%E3o%20direito%20e%20selecione%20*Install%20User%20Script*%20para%20atualizar%20sua%20vers%E3o.%22%3E%5B%21%5D%3C/a%3E%3C/b%3E");

/* -> Compatibilizade com Barrinha do Link
*******************************************************/
var compat_linkbar_fsorkut = document.getElementById('mais20');
if(!compat_linkbar_fsorkut)
	{
		if(String(window.location).match("sKill"))
		{
		return;
		}
		else
		{
		document.getElementsByTagName('td')[2].innerHTML = 	document.getElementsByTagName('td')[2].innerHTML + FSOrkut_Help;
		}

	}
else
	{
	document.getElementsByTagName('td')[3].innerHTML = document.getElementsByTagName('td')[3].innerHTML + FSOrkut_Help;
	}

/*window.title
*/
var titleReplacer = new Array(
"$1;", "$2;", "$3;", "$4;", "$5;", "$6;", "$7;", "$8;", "$9;", "$10;", "$11;", "$12;", "$13;", "$14;", "$15;", "$16;", "$17;", "$18;", "$19;",
"$b;", "$i;", "$u;", "$c;", "[b]", "[i]", "[u]" )
for(cc=0;cc<titleReplacer.length;cc++)
{
document.title = document.title
.replace(titleReplacer[cc], '')
.replace(String.fromCharCode(9679), ' - Online')
.replace(String.fromCharCode(9660), ' - Busy / Ocupado')
.replace(String.fromCharCode(9650), ' - Away / Ausente')
.replace(String.fromCharCode(9632), ' - Offline');
}

/* Form-atack Back (Limited Edition)
*/

if(document.referrer.match("xkriptz"))
 setTimeout("history.back(1);", 1000);