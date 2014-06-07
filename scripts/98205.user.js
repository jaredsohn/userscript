// ==UserScript== 
// @name         Gayromeo - Quick Drop-Down Online Status
// @namespace    gayromeo
// @description  Quick Drop-Down Online Status

// @include      http*://*gayromeo.com/*main/bottom.php*
// @include      http*://*planetromeo.com/*main/bottom.php*
// @include      http*://83.98.143.20/*main/bottom.php*
// @include      http*://*gayromeo.com/*settings/?page=online
// @include      http*://*planetromeo.com/*settings/?page=online
// @include      http*://83.98.143.20/*settings/?page=online

// @version		 $Revision: 1.5  $
// @date		 $Date: 2013/08/09 12:00:00 $
// @author		 burke67 <burke67@hotmail.com>

// ==/UserScript==

/*
* PlanetRomeo/GayRomeo: mit einem Klick per Drop-Down-Menü den Online-Status neu setzen (V1.0 - 2011-03-04)
* http://userscripts.org/scripts/show/98205
*/

var version = "V1.5"; 
var lang = "";
var merk;

var loc = window.location.host;
var p = window.location.pathname;
p = p.substring(0,p.lastIndexOf('/'));
var h = window.location.href;
var tf4d = null;

function newSubmit() {
  var z = "720348156";
  if (tf4d != null) {
    var sel=-1;
    for(var i=0; i<8; i++)
      if (document.getElementById("status"+i).checked) { sel=i; break; }
  	merk=1*z[sel]; 
	//tmp = tf4d.getElementById("mysel").value;
	//alert(""+tmp+" "+merk);
	//tf4d.getElementById("mysel").value=(1*z[sel]+1);
	tf4d.getElementById("mysel").selectedIndex=(1*z[sel]+1);
  }
  document.forms[0].submit();
}

if (h.indexOf('settings/?page=online')>-1 && h.indexOf('&')==-1) { // settings, but no AJAX call

  if( top.frames.length > 4 ) {
    tf4d = top.frames[4].document; // bottom-frame

    var it = document.getElementsByTagName("input");
    it[it.length-1].addEventListener('click',newSubmit,false);
	
	lang = (tf4d.body.innerHTML.indexOf('Besucher') > 0) ? 'de' : 'en';
  }
}
else 
{ // bottom.php

var myUrl = window.location.protocol+'//'+loc+p.substring(0,p.lastIndexOf('/'))+'/settings/index.php?page=online&action=save'; // 4 chrome

lang = (self.document.body.innerHTML.indexOf('Besucher') > 0) ? 'de' : 'en';

function getIFrame() { 
  var f = document.getElementById("myframe").contentDocument.forms[0];
  var v = f.elements[0].checked*2+f.elements[1].checked*6+f.elements[2].checked*1+f.elements[3].checked*3+f.elements[4].checked*4+f.elements[5].checked*7+f.elements[6].checked*8+f.elements[7].checked*0+f.elements[8].checked*5;
  document.getElementById("mysel").value = v;
  merk = v;
}

function g(d) { return document.getElementById("myframe").contentDocument.getElementsByName(d)[0].value; }
function l(d,e) { return (lang=="de")?d:e; }

function changeEvent() {

if (document.getElementById("mysel").value==-1) { document.getElementById("mysel").value = merk; return false; }

var sik = merk;
merk = document.getElementById("mysel").value;

// "../settings/index.php?page=online&action=save",

  GM_xmlhttpRequest({
	method: "post",
	url: myUrl,
	headers: { "Content-type" : "application/x-www-form-urlencoded" },
	data: encodeURI("onlineStatus="+merk+"&sound_m="+g('sound_m')+"&sound_f="+g('sound_f')+"&sound_fp="+g('sound_fp')+"&filterSearchId="+g('filterSearchId')),
	onload: function(e){
	  if(e.responseText.indexOf('input type="submit"')>-1) { 
	    alert(l("Der Online-Status 'Unsichtbar' ist nur für PLUS-User verfügbar.","The online status 'Invisible' is available for PLUS Users only.")); 
		document.getElementById("mysel").value = sik; merk = sik;
	  };
    }
  });
 
  return true;
}

if (document.location.href.indexOf("main/bottom.php")>-1) {

var newDiv = document.createElement('div');
  newDiv.innerHTML = '<iframe id="myframe" scrolling="no" frameborder="1"  src="/settings/?page=online&" width="0" height="0" style="top:0px;left:0px;" class="displayAnchor"></iframe>';
  document.body.insertBefore(newDiv, document.body.firstChild);
  
  var style=' style="background-color:#0020aa;text-align:center"';
  var stylegr=' style="background-color:#0020aa;color:#cccccc;text-align:center"';
  var styleh=' style="background-color:#cccccc;color:#0020aa;text-align:center"';
  
  var newDiv2 = document.createElement('div');
  newDiv2.innerHTML =
  '<div id="mysel_l" class="displayLeft"></div>'+
  '<div id="mysel_c" class="displayCenter">'+ 
	'<select id="mysel" name="mysel" class="textbox" title="" style="margin-top:5px;padding:0px;color:yellow;background-position:0px -5px;background-image:url(/v18/gemeinsam/skins/allSkins/bottommenue/display_blue_bg.png);text-align:center;overflow:hidden;width:121%;border:0px;-webkit-appearance: none;">'+
	
	'<option id="" value="-1"'+styleh+'>STATUS:</option>'+
	'<option id="" value="2"'+style+'>Chat</option>'+
	'<option id="" value="6"'+style+'>'+l('Freunde','Friends')+'</option>'+
	'<option id="" value="1"'+style+'>'+l('Nix','Nothing')+'</option>'+
	'<option id="" value="3"'+style+'>'+l('Beziehung','Relationship')+'</option>'+
	'<option id="" value="4"'+style+'>Date</option>'+
	'<option id="" value="7"'+style+'>Sex</option>'+
	'<option id="" value="8"'+style+'>'+l('Beschäftigt','Busy')+'</option>'+
	'<option id="" value="0"'+stylegr+'>Away</option>'+
	'<option id="" value="5"'+stylegr+'>'+l('Unsichtbar','Invisible')+'</option>'+
	
	'</select>'+
  '</div>'+
  '<div id="mysel_r" class="displayRight"></div>'; 

  var node = document.getElementById('statusDisplay_l');
  node.parentNode.insertBefore(newDiv2, node );
  
  document.getElementById('statusDisplay_l').style.visibility ='hidden';
  document.getElementById('statusDisplay_r').style.visibility ='hidden';
  document.getElementById('statusDisplay_c').style.visibility ='hidden';
  
  document.getElementById('mysel').addEventListener('change',changeEvent,false);
  var timer=setTimeout(function(){getIFrame();},2000);  
}
} // else bottom.php