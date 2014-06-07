// ==UserScript==
// @name           	Angriffsplaner_TwPlus
// @author			Sebastian Löscher
// @namespace      	Die-Stämme
// @version			1.1
// @include        	http://de*.die-staemme.de/game.php?village=*&screen=info_player&id=*
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////////////////////// 
// A L L G E M E I N E S
//////////////////////////////////////////////////////////////////////////////////////////////////
 
var version = '1.1';

var aktUrl 		= document.location.href;
var doc 		= document.getElementById('ds_body');
var _welchewelt = aktUrl.split(".");
var _meine_welt = _welchewelt[0].replace("http://", "");
var icon		= 'data:image/png;base64,' +
				  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG' + 
				  'XRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAq' + 
				  'FJREFUeNpsU0tMU0EUPa8tUtDWWok0GGVjZAW4MOrCaIKYYOJ' + 
				  'n5Qa3RIPBgJrokg07TUQlNH5icGOCEWOIEUNjF/hJK5ZCq1FK' + 
				  'IdpSaGl50Ja2vPbNPGcetBbhJOfdzMw9Z+69kycoigKO9xaDl' + 
				  'oXT6zzEuJexBmuYZAwxjjPaOJvCScIPBG4wZDG0Clptr+VUA8' + 
				  'xHDmPH/n0oMRqg31MBUIJ0cBZSNIqkfxqLrnGIbg8USq+eCSe' +
				  'tqsHbSqPn5JuB2lJjGWg8BhKbZTEKEvkDJZuBxmCGoC+HxlwF' + 
				  'zc4KpMUMHNduec9GEnU6XgYFanV0BRm3A8pqCu86n6Hp5gUos' +
				  'gwlJ0MOB2DrG0XjxRp2M4G+7oSq4VoN/xA2BpLJsGopHAMuNI' + 
				  'cW8NX2GyRHGQlcY1l1b2xSD5mtc4llVfPPAAIoZckyRdOQTT3' + 
				  'gcexLFG5XasOenJVZHlE1HLo1A0BhtyvMfXnwKUznWwqCYkS6' +
				  'O0AkGTRLVE1xC4RyV2aS9nkQ63+I/zF/7wYSTjuooMNqMs010' + 
				  'YKBDCG0Gl+Botmm9v2tb3CTwcSwFzmJQCkzISGmucZbXMF4Mr' + 
				  'wAlJbjx8jkptLz7QQy7BlNlRDnlrjGVjREvAiNTkCj375BHHz' + 
				  'QicDd2xtMCBvi/FSQa14VDFpiy/2+Dx/t4kwAseHXa+LeLsRd' + 
				  'n7DkHMFMV7u6F3pyB3NTISTFeB/T+AuvsN6G1fn8ZcNRQUHql' + 
				  'xcJz6g6Dz7cxc92SNcvIRkV4XP71dy8Tsj/TBw9u3ddLinTP6' + 
				  'o/14iK6ipIkRBoagVaownR6SB+Or9DlrJX2haXHm9pwHHfbD7' + 
				  'OQqvlQHXzwWP17M0l+BwTWAiEec/WdlG0F+dvMsij22xu40br' + 
				  'S2uHKPZslfdXgAEA8lFz6E73QNMAAAAASUVORK5CYII=';

var gm_name 	= "AP_TW_" + _meine_welt;
var _dorf 		= aktUrl.split("village=");
var _myDorfId 	= _dorf[1].split("&")[0]; // By Roman S. (Zombie74)
var rank_url 	= "http://" + document.location.host + "/game.php?village=" + _myDorfId + "&screen=ranking";
//////////////////////////////////////////////////////////////////////////////////////////////////
//UPDATE - VERSION
//////////////////////////////////////////////////////////////////////////////////////////////////

function checkVersion() {
	try {
		var xmlReq = GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://userscripts.org/scripts/source/55044.meta.js',
        onload: function(req) {
          if(req.status == 200){
			var aktScriptversion = /\/\/\s*@version\s*(.*)\s*\n/i.exec(req.responseText)[1];
				if(version != aktScriptversion) { version_string = 
				'Neue Version von DS FastAngriffsplaner TW+ ist verfügbar <a href="http://userscripts.org/scripts/source/55044.user.js" >[ Updaten ]</a>';
				var myupdatediv = document.createElement('div');
				myupdatediv.setAttribute('style',"position: absolute;height: 20px;text-align: center;top: 0;width: 100%;background: white;z-index: 1000;");
				myupdatediv.innerHTML = version_string;
				document.body.appendChild(myupdatediv);
			} else {
              GM_setValue(gm_name + '_UpdateCheck',new Date().getDate());
			}
          }
        }
      });
    }
    catch(err) { }
}


if((GM_getValue(gm_name + '_UpdateCheck') == undefined) || (GM_getValue(gm_name + '_UpdateCheck') != new Date().getDate())) {
	checkVersion();
}




////////////////////////////////////////////////////////////////////////////////////////////////// 
// N A M E    V O R H A N D E N ?
//////////////////////////////////////////////////////////////////////////////////////////////////
if(GM_getValue(gm_name) == undefined || GM_getValue(gm_name + '_NameCheck') == undefined || (GM_getValue(gm_name + '_NameCheck') != new Date().getDate())) {
	getAndSetMyNameByRanking(rank_url);
}

//DEBUG
//GM_log(GM_getValue(gm_name + '_UpdateCheck'));

////////////////////////////////////////////////////////////////////////////////////////////////// 
// M A K E     L I N K S
//////////////////////////////////////////////////////////////////////////////////////////////////
//GM_deleteValue(gm_name);
make_icon_links();

function getAndSetMyNameByRanking(rurl) {
	GM_xmlhttpRequest({
		method:"GET",
		url: rurl,
		headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},
		onload:function(response) {
				var res = document.createElement('div');
				res.innerHTML = response.responseText;
				var _trs = [];
				_trs = res.getElementsByTagName('tr');
		
				for(var i = 0; i < _trs.length;i++) {
					if(_trs[i].getAttribute('class') == "lit") {
						var name = _trs[i].getElementsByTagName('td')[1].firstChild.innerHTML;
					}
				}
				
				if(name != null) {
					GM_setValue(gm_name,name);
				}
				GM_setValue(gm_name + '_NameCheck',new Date().getDate());
		}
	});
}


function make_icon_links() {
	var _tb = doc.getElementsByClassName('vis');
	var _date = new Date();
	
	if(GM_getValue(gm_name) == undefined) { 
		getAndSetMyNameByRanking(rank_url);
		this.location.reload();
	}
	
	var tbidx = 0;
	for(var i = 0; i < _tb.length; i++) {
		var _tds = _tb[i].getElementsByTagName('td');
			for(var x = 0; x < _tds.length; x++ ) {
				if(_tds[x].getElementsByTagName('a').length != 0) {
					if(_tds[x].getElementsByTagName('a')[0].href.match('screen=info_village')) {
						var koord = _tds[x].parentNode.getElementsByTagName('td')[1].innerHTML.substr(0,7).split('|');
						var _aktLink = ' <a target="_blank" href="http://' + _meine_welt + '.twplus.org/attack/simple/?t_x='
							+ koord[0] + '&t_y='+ koord[1] +'&p=' + GM_getValue(gm_name) + 
							'&day=' + (_date.getDate() + 1) + 
							'&month=' + (_date.getMonth() + 1) + 
							'&year=' + _date.getFullYear() + 
							'&hour=' + _date.getHours() +
							'&minute=' + _date.getMinutes() + 
							'&second=0&submit=Weiter"><img height="12" src="' + icon + '" /></a>';
						var _new_td = document.createElement('td');
						_new_td.innerHTML = _aktLink;
						_new_td.setAttribute('style','text-align:center;');
						_tds[x].parentNode.appendChild(_new_td);
						tbidx = i;
					}
				}
			}
	}
	var _new_th = document.createElement('th');
	
	var _new_tw_link = document.createElement('a');
	_new_tw_link.href = "http://" + _meine_welt + ".twplus.org";
	_new_tw_link.innerHTML = "Tw";
	_new_tw_link.target = "_blank";
	
	_new_th.appendChild(_new_tw_link);
	_tb[tbidx].getElementsByTagName('tr')[0].appendChild(_new_th);
}

function addHours(akt, anz) {
	if(akt + anz < 24) return ((akt + anz) < 10) ? "0" + (akt + anz) : akt + anz ;
	else if(akt + anz > 23) return (anz - ( akt - 23 ) < 10 ) ? "0" + (anz - ( akt - 23 )) : anz - ( akt - 23 ) ;
}


