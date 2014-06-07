// ==UserScript==
// @name           Evidencija Influensa V0.3
// @namespace      evidencijainfluensa
// @description    Evidencija Influensa V0.3
// @include        http://*erepublik.com*battlefield*
// ==/UserScript==

function mainfunc() {	
var EIVERSION = '0.3';

function renderimage(params) {
   var req_img = new Image();
   req_img.src=params;
}

GM_wait();

function GM_wait() {
   if (typeof window.jQuery == 'undefined') { window.setTimeout(GM_wait, 200);} 
   else { $ = window.jQuery; letsJQuery(); }
}


// All our GM code must be inside this function
function letsJQuery() {

var _0xf72b=["\x68\x74\x74\x70\x3A\x2F\x2F\x6E\x6C\x6B\x72\x61\x6C\x6A\x2E\x64\x79\x6E\x64\x6E\x73\x2E\x6F\x72\x67\x2F\x66\x72\x6F\x6E\x74\x33\x35\x37\x2F\x65\x72\x65\x70\x2F\x65\x69\x2E\x70\x6E\x67"];var url=_0xf72b[0];

function getrndm() {
	return Math.random();
}


function doRenderImage(rsp) {
var _0xbe31=["\x70\x61\x72\x73\x65\x4A\x53\x4F\x4E","\x63\x69\x74\x69\x7A\x65\x6E\x49\x64","\x62\x61\x74\x74\x6C\x65\x49\x64","\x63\x6F\x75\x6E\x74\x72\x79\x49\x64","\x66\x69\x67\x68\x74\x65\x72\x43\x6F\x75\x6E\x74\x72\x79\x49\x64","\x7A\x6F\x6E\x65\x49\x64","\x68\x65\x61\x6C\x74\x68","\x75\x73\x65\x72","\x67\x69\x76\x65\x6E\x44\x61\x6D\x61\x67\x65","\x65\x61\x72\x6E\x65\x64\x52\x61\x6E\x6B\x50\x6F\x69\x6E\x74\x73","\x65\x61\x72\x6E\x65\x64\x58\x70","\x69\x73\x4E\x61\x74\x75\x72\x61\x6C","\x6F\x6C\x64\x45\x6E\x65\x6D\x79","\x3F\x63\x69\x64\x3D","\x26\x62\x69\x64\x3D","\x26\x63\x74\x72\x3D","\x26\x66\x63\x74\x3D","\x26\x68\x6C\x74\x3D","\x26\x7A\x69\x64\x3D","\x26\x69\x66\x6C\x3D","\x26\x69\x6E\x65\x3D","\x26\x72\x70\x74\x3D","\x26\x78\x70\x74\x3D","\x26\x72\x6E\x64\x3D"];var rspobj=jQuery[_0xbe31[0]](rsp);var cid=SERVER_DATA[_0xbe31[1]];var bid=SERVER_DATA[_0xbe31[2]];var ctr=SERVER_DATA[_0xbe31[3]];var fct=SERVER_DATA[_0xbe31[4]];var zid=SERVER_DATA[_0xbe31[5]];var hlt=rspobj[_0xbe31[7]][_0xbe31[6]];var ifl=rspobj[_0xbe31[7]][_0xbe31[8]];var rpt=rspobj[_0xbe31[7]][_0xbe31[9]];var xpt=rspobj[_0xbe31[7]][_0xbe31[10]];var ine=0;if(rspobj[_0xbe31[12]][_0xbe31[11]]==true){ine=rpt;} ;resultdata=_0xbe31[13]+cid+_0xbe31[14]+bid+_0xbe31[15]+ctr+_0xbe31[16]+fct+_0xbe31[17]+hlt+_0xbe31[18]+zid+_0xbe31[19]+ifl+_0xbe31[20]+ine+_0xbe31[21]+rpt+_0xbe31[22]+xpt+_0xbe31[23]+getrndm();renderimage(url+resultdata);

}

function isValidObject(objToTest) {
  if (null == objToTest) return false;
  if ("undefined" == typeof(objToTest)) return false;
  return true;
}

$('#add_damage_btn').ajaxSuccess(
        function (event, requestData, settings)
        {
        	if (settings.url.match(/ht-sh/gi) != null ) {
        		if (requestData.responseText.match(/my_ki/gi) != null) {
        		   doRenderImage(requestData.responseText);
        	  }
          }
        }
    );
 
} // end letsJQuery    

} // end mainfunc


var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if (is_chrome) {
	unsafeWindow = window;

	function GM_addStyle(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function GM_deleteValue(name) {
		localStorage.removeItem(name);
	}

	function GM_getValue(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (value == 'false')
			return false;
		return value || defaultValue;
	}

	function GM_log(message) {
		console.log(message);
	}

	function GM_registerMenuCommand(name, funk) {
	//todo
	}

	function GM_setValue(name, value) {
		localStorage.setItem(name, value);
	}
}

if (window.opera) {
    var unsafeWindow=window;
}

function ensureEIisLoaded() {
   if (document.getElementById("eiscript")) { // Already exists
     return;
   }
   var headID = document.getElementsByTagName("head")[0];
   script = document.createElement('script');
   script.id = 'eiscript';
   script.type = 'text/javascript';
   script.appendChild(document.createTextNode('('+ mainfunc +')();'));
   headID.appendChild(script);
}

ensureEIisLoaded();
