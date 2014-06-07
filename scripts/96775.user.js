// ==UserScript==
// @name           Laufzeitenrechner
// @namespace      Original by Ikariam-tools.com
// @include        http://*.ikariam.com/index.php*
// ==/UserScript==

var seite = document.getElementsByTagName('body')[0].id;

if (seite == "worldmap_iso"){
  var srcx = GM_getValue('srcx');
  var srcy = GM_getValue('srcy');
  var destx = 0;
  var desty = 0;
  var form = document.getElementById('mapCoordInput').getElementsByTagName('input')[2];
  form.addEventListener('click',function(e){ReadKoos();},true);
  
}else{
  
  var div = document.getElementById('breadcrumbs');
  var Weltkarte = div.getElementsByTagName('a')[0].href;
  
  if (Weltkarte.length == "74"){
    var srcx = Weltkarte.substring(61,63);
    var srcy = Weltkarte.substring(72,74);
    GM_setValue('srcx', srcx);
    GM_setValue('srcy', srcy);
    
  }else if (Weltkarte.length == "75"){
    var srcx = Weltkarte.substring(62,64);
    var srcy = Weltkarte.substring(73,75);
    GM_setValue('srcx', srcx);
    GM_setValue('srcy', srcy);
    
  }else if (Weltkarte.length == "76"){
    var srcx = Weltkarte.substring(63,65);
    var srcy = Weltkarte.substring(74,76);
    GM_setValue('srcx', srcx);
    GM_setValue('srcy', srcy);
    
  }
}

function ReadKoos(){
  destx = document.getElementById('inputXCoord').value;
  desty = document.getElementById('inputYCoord').value;
  calctime(srcx, srcy, destx, desty, 60);

}  
  
function calctime(srcx, srcy, destx, desty, lowestunit) {
//lowestunit = Reisezeit (60 bei HS)
	var time = 0;
	
	if (srcx == destx && srcy == desty) {
		time = 60 * 600 / lowestunit;
	} else {
		var range = Math.sqrt(Math.pow((srcx - destx), 2) + Math.pow((srcy - desty), 2));
		time = 60 * (1200 * range) / lowestunit;
	}

	var days    = 0;
	var hours   = 0;
	var minutes = 0;
	var sec     = 0;
	
	//Tage
	var days_in_sec = 24 * 60 * 60;
	if(time >= days_in_sec) {
		days = Math.floor(time / days_in_sec);
		time -= days * days_in_sec;
	}
	//Stunden
    if(time >= 3600) {
		hours = Math.floor(time / 3600);
		time -= hours * 3600;
	}
	//Minuten
    if(time >= 60) {
		minutes = Math.floor(time / 60);
		time -= minutes * 60;
	}
	//Sekunden
    sec = Math.ceil(time);
    
    var first = false;
    var result = '';
    
	//Tage
    if(days > 0 || first == true) {
    	result += days + ' T, ';
    	first = true;
    }
    //Stunden
    if(hours > 0 || first == true) {
    	result += hours + ' S, ';
    	first = true;
    }
    //Minuten
    if(minutes > 0 || first == true) {
    	result += minutes + ' min, ';
    	first = true;
    }
    //Sekunden
    result += sec + ' sek ';
    
    output(result);
}

function output(result){
  var table = document.getElementById('islandInfos');
  var outtable = document.createElement('tr');
  outtable.innerHTML = '<tr><th>Entfernung ['+srcx+':'+srcy+'] - ['+destx+':'+desty+']:</th><br><th id="Traveltime" class=label><b>'+result+'</b></th></tr>';
  table.appendChild(outtable);
}

var SUC_script_num = 96775; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}