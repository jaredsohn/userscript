// ==UserScript==
// @name       Vorbesitzer TWStats
// @version    0.2
// @description  Export der Vorbesitzer von TW-Stats für den VillageRenamer
// @author		Harpstennah
// @include    http://de.twstats.com/de*/index.php?page=player&mode=conquers&*
// @include    http://beta.twstats.com/zz2/index.php?page=player&mode=conquers&*
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
function gid(id){return document.getElementById(id);}

var main = gid('main');
var tr = main.getElementsByTagName('tr');
var player_id = getURLParam('id');

var eButton = document.createElement("input"); // Button
			eButton.setAttribute("type","button");
			eButton.setAttribute("value","Export VillageRenamer");
			eButton.addEventListener("click",function(){fEroberungen();},false);
gid("main").appendChild(eButton);

function fEroberungen(){
	var ausgabe = new String();
	var owner;
	var ownerID;
	for (var i = tr.length - 1; i >= 1; --i){
		var trclass = tr[i].className;
		if (trclass == "r1" || trclass == "r2"){
			var td = tr[i].getElementsByTagName('td');
			var le = td.length;
			var neuA = td[le - 2].getElementsByTagName('a');
			var nID = getURLParam('id', neuA[0].href);
			if (nID == player_id) {
				var altA = td[le - 3].getElementsByTagName('a'); 
				if ( typeof altA[0] != 'undefined') {
					owner = altA[0].innerHTML;
					ownerID = getURLParam('id', altA[0].href);
				}else{
					owner = "Baba"; // hier Name für Grauadelungen 
					ownerID = 99999; // hier die eigene ID einsetzen, wenn Grauadelungen ausgelassen werden sollen
				}
				if(player_id != ownerID){
					var dorfA = td[1].getElementsByTagName('a');
					var dorfName =  dorfA[0].innerHTML;
					dorfName = dorfName.replace(/[,;]/g , '');
					ausgabe += ('<tr><td>' + getURLParam('id', dorfA[0].href) + ',' + owner + ',' + dorfName +  ';</td></tr>');
				}
			}
		}
	}
	$('div#main table.vis').eq(3).after('</table><table id="Doerfer"class="vis" width="500">' + ausgabe );
}

 /* nach dem Script Inc-Renamer - Autor: SlowTarget, angepasst von RokKeT; ist aber auch sonst im I-Net zu finden; von mir modifiziert */
function getURLParam(strParamName, strHref){
   var strReturn = "";
   if(typeof strHref == 'undefined'){var strHref = window.location.href;}
   if ( strHref.indexOf("?") > - 1 )
   {
	  var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
	  var aQueryString = strQueryString.split("&");
	  for ( var iParam = 0; iParam < aQueryString.length;
	  iParam ++ )
	  {
		 if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > - 1 )
		 {
			var aParam = aQueryString[iParam].split("=");
			strReturn = aParam[1];
			break;
		 }
	  }
   }
   return unescape(strReturn)
 }	
 