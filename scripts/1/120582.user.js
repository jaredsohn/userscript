// ==UserScript==
// @name           SJ Nur Downloads
// @namespace      SJ Nur Downloads
// @description    Entfernt die Streams
// @include        http://serienjunkies.org/*
// ==/UserScript==
// Script Update Checker http://userscripts.org/scripts/show/20145 http://www.crappytools.net
var SUC_script_num = 120582;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


if (location.href == 'http://serienjunkies.org/'){

GM_addStyle("#streams { text-align:left;top:30px;z-Index:10;background-color:#fff !important;position:absolute;width:800px;height:355px;overflow:auto;display:block;margin:-10px;padding:10px;border:1px grey solid;font-size:100%;vertical-align:baseline;background:transparent;line-height:1;color: #444;width: 800px;font: 12px/15px Arial, sans-serif;visibility:hidden;}#streams table td.dl{background-image: url('/media/img/stream/dl.png');}#streams table td.english{background-image: url('/media/img/stream/english.png');}#streams table td.eng{background-image: url('/media/img/stream/eng.png');}#streams table td.info{background-image: url('/media/img/stream/add.png');}#streams option.geropt {background-image:url('/media/img/stream/german.png');background-repeat: no-repeat; background-position: 3px center; padding-left: 24px;}#streams option.engopt {background-image:url('/media/img/stream/english.png');background-repeat: no-repeat; background-position: 3px center; padding-left: 24px;}#streams option.intopt {background-image:url('/media/img/stream/eng.png');background-repeat: no-repeat;background-position: 3px center;padding-left: 24px;}#streams option.dl {background-image:url('/media/img/stream/dl.png');background-repeat: no-repeat; background-position: 3px center; padding-left: 24px;}#streams table td.lang{background-repeat:no-repeat;background-position: 8px center;text-indent: -999px;}#streams table td.german{background-image: url('/media/img/stream/german.png');} #streams option.geropt {background-image:url('/media/img/stream/german.png');background-repeat: no-repeat; background-position: 3px center; padding-left: 24px;}#streams .gtable th {text-align: left;padding: 5px 5px;} #streams .gtable thead tr {color: #333;border: 1px solid #ccc;} #streams .gtable thead tr .sortable{cursor: pointer;} #streams .gtable thead th {background: #efefef;}streams .gtable thead th {background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#efefef));background: -moz-linear-gradient(#fff, #efefef);background: linear-gradient(#fff, #efefef);-pie-background: linear-gradient(#fff, #efefef);}#streams .gtable tbody tr td {border-bottom: 1px solid #eee;}#streams .gtable .clickable {cursor: hand; cursor: pointer;}#streams #table1 tbody tr.odd td {background-color: #f7f7f7;}#streams #table1 tbody tr.even td {background-color: #fff;}#streams .gtable tbody tr:hover td {background-color: #FFFAE3;}#streams .gtable td {padding: 5px 5px;}#streams .gtable input {vertical-align: middle;}#streams .gtable a img {vertical-align: middle;margin-right: 5px;}#streams .gtable span.scroll_next img, #streams .gtable span.scroll_prev img {vertical-align: middle;}#streams .gtable span.scroll_next img {margin:0;}");
GM_addStyle("#listbtn { text-align:left;top:200px;z-Index:10;background-color:#fff !important;position:absolute;width:800px;height:10px;display:block;}");
GM_addStyle(".listbtn { background-color:#f3f3f3;color:#888888;border:none;padding:5px 5px 3px 3px;font-weight:bolt;}");

// hide&show serien
function showlist(){
if (document.getElementById('streams').style.visibility == 'visible'){
document.getElementById('streams').style.visibility = 'hidden';
}else{
document.getElementById('streams').style.visibility = 'visible';
}
}

cal = document.getElementById('calendar').innerHTML;


   var bttns = '';
       bttns += "<input type='button' id='bttnj' class='listbtn' value='Serienkalender'>";
       divb = document.createElement('div');
       divb.id = 'listbtn';
       divb.style.display = "block";
       divb.innerHTML = bttns;

diX = document.createElement('div');
diX.id = 'streams';
diX.style.display = "block";
diX.innerHTML = cal;
divb.appendChild(diX);
document.getElementById('header').appendChild(divb);

document.getElementById('bttnj').addEventListener('click', showlist,false);

}

var div = document.getElementsByClassName('streams')[0];
if (div){
div.parentNode.removeChild(div);
}