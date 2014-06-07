// ==UserScript==
// @name           world-war alliance
// @namespace      Oliver
// @description    Invites a whole bunch of people to your alliance
// @include        http://wwar.storm8.com/group.php*
// ==/UserScript==
var numClick = GM_getValue('autoclicknum', 0);
var codes = ['J66JTN', 'NSGQC4', 'EAXTHK','4SA4BC', 'FW4PSP', 'D25EG5', 'KDEQF8', 'SPWR9D', '589K7V', 
'65W6FV', 'S5YAX6', '8AJ78P', 'T7P89D', 'S4XKNT', 'UHKGWT', 'R2DD2Y', 'V9MNKP', 'PWBMTV', 'Q6532U', 'CJ547X', '5X4D4X', 
'QM9RU8', 'P4BJ75', '7RRJXX', 'STYCMW', 'XKKMGQ', 'CJPN8J', 'NV57N8', 'XAQTDV', 'KYT225', 'N9DQ8C', 'SSN4PJ', '3GX98G', 
'YD679U', 'UTTF4R', 'BU73R4', 'HBVJ28', 'DKVE4U', 'GXTXW8', 'WHS92X', '3W3U7W', 'E2YASS', 'T6MW3W', 'VRF799', '3CGHRR', 
'6N3NSM', '7XYECR', '2YBV3B', 'EEGC9W', '4GA4S8', '6QKHYR', '9B355G', 'BUBY8R', '4SRJSE', 'FDV8XG', 'QK9JK3', 'AVWXY8', 
'FYK47Y', 'FYGYWM', 'KHUQ3C', 'QEUBCG', 'R9HFYF', 'GF2PU8', '5YRJ97', 'T33FVK', 'MUU33B', 'HFAXQ3', 'ASE3RJ',
'QRAGNN', '78JNSU', 'D9YHD3', '9YWBEB', '7CNUMX', 'FY29BF', '6DWDC4', '8DKRP7', 'J74R9V', 'WR8R4K', 'T6GB3N',
'UW35RV', 'RU4ESD', 'YQSB3G', 'BQJHBW', 'JHJA82', 'R5GM8W', 'AJ2JXQ', 'MEQ9T3', 'FGEE5U', 'SPF87B', 'G48PRB', '7X4GAD',
'7986FG', '6G7MYE', 'DPUCHX', '2C2JEK', 'VGKCPK', 'XUMK42', 'JBSCSX', 'K6HQPX', 'KBPJS2', 'M7DKXF', 'EAVMAH',
'AATGMK', 'BFBSRG', 'DRHGBY', 'H3BC73', 'XF9U98', 'SBMSBH', '9PWYUP', 'ENXWP2', 'ASD5G9', 'RS3G24', 'BXJWHF', 
'CAW3SR', 'SWUTSN', 'H8C8SW', '9KQE86', 'ESYHKM', '7J9MHS', 'JNKTFJ', 'CCR288', '3YSXSK', 'GUFMAX', 'VUF8WD',
'FKENUN', 'JNY964', '6F437A', 'YPD7WE', 'HHSMAA', 'FHQDVH', 'PETM4F', '8BCVTN', '8GEA7W', 'E2872E',
'NY5PW5', '2YPYX7', 'E2QCDK', 'UXTTYH', '3s96QB', 'GVAGSP', 'NH97XE', 'MJ3WCH', 'J535WG',
'8MY3S3', 'ECYJBH', 'N4VRE5', '36FQUF', 'M9UWVC', '9AHWVB', 'A3RSR5', 'AYUY3Q', '9YHDCT', 'SHDV58', 
'8UEYGY', 'JDF8AQ', 'NDADAT', 'RM9S54', 'DKDVK5', 'SUKQQA', 'GN2H28', 'XVE2WP', 'T9AH6T',
'V5B28P', 'E8PRHW', 'UX97U5', 'EURDK7', 'B4TX57', '9DYF6Y', 'S6AD9T', 'APBBB7', 'BM2X68', '8KPEW7', 
'HE6F5Q', '27YEGT', 'JB2C5W', 'FY6SWE', 'PJCCH7', 'WWQDKC', 'V9W98N', 'SYYUE6', 'reqfsw', 'qsq44c', 'yejqw5',
'6A2NCN', 'XHX56T', 'ECFYA9', 'TNFM5V', 'VMJGRD', '9XTFQJ' ];

var index = parseInt(GM_getValue("index", 0));

console.log(index+'/'+codes.length);
if (index < codes.length - 1)
{
	var f = document.forms[0];
	f.getElementsByTagName('input')[0].value = codes[index];
	f.addEventListener('submit',submitHandler,false);
}
else
{
	GM_setValue('index',codes.length-1);
	index = codes.length-1;
	if (numClick > 0)
	{
		numClick = 0;
		GM_setValue('autoclicknum', 0);
		alert("no more codes!\nBug the author with a donation and tell him you need more ;)");
	}
}

function submitHandler()
{
	var nc = parseInt(document.getElementById("acdn").value);
	if (nc > 0)
		GM_setValue('autoclicknum', nc-1);
	if (index < codes.length - 1)
		if (f.getElementsByTagName('input')[0].value == codes[index])
			GM_setValue('index',index+1);
}
function include(arr,obj) {
	return (arr.indexOf(obj) != -1);
}

// auto-click mechanism
var wwash = document.getElementsByClassName('inviteSectionHeader')[0];
wwash.innerHTML += '<br><p style="font-size: 10px; color: #0f0; padding: 5px 0">AutoClick <input id="acdn" type="text" value="'+numClick+'" style="background: #000; color: #0f0; border: #0f0 1px solid; width: 30px"> times</p>';
wwash.style.height = 'auto';
if (numClick > 0)
	click(document.getElementsByClassName('btnInvite')[0]);

// Click by JoeSimmons
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
if(!e) {return;}
if(typeof e=='string') e=document.getElementById(e);
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}