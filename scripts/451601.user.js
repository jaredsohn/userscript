// ==UserScript==
// @name           H0RD3
// @namespace      K!LL3R KL0WN
// @include        http://zl.storm8.com/group.php*
// ==/UserScript==
var numClick = GM_getValue('autoclicknum', 0);
var codes = ['1' ,
'NVMX4N',
//missing a code
'WK3DY9',
'FU3HE6',
'8XG39T',
'PVQJ89',
'JN2MPN',
'83UEEG',
'HUY9N3',
'3GVGU6',
'HJ3AVU',
'8GMWNQ',
'CF8W5C',
'XY742N',
'AEM95T',
'TF3D5E',
'KAUDUE',
'632HAP',
'2D3BPH',
'N3BQK7',
'PAX4T8',
'QB7889',
'EQYEBF',
'GN2ARX',
'T4FFX5',
'F9W843',
'F74A2K',
'G8YVQD',
'H4M4VK',
'WSFU6N',
'DCTH3X',
'HKTNQJ',
'PXS783',
'JQHM5M',
'P8Q5CG',
'WQE4CG',
'M9DTH6',
'V2E44J',
'PEU86H',
'VBVBRH',
'KXMU44',
'GUBAJP',
'MDB5QE',
'SK3R56',
'PPANW5',
'NQ6C48',
'8UFB8W',
'J3N37Y',
'J87S8R',
'XY6USF',
'PXSP25',
'THMCHK',
'GFR8K7',
'KP6SE9',
'C53YER',
'5F8GKK',
'9UUHR2',
'QQRBC4',
'R9C6UU',
'V798A6',
'EEV5FM',
'A3D72J',
'YMKMYW',
'38S7JN',
'EYRARA',
'TCRATE',
'9ABF7J',
'4FHWFA',
'3FMU5J',
'UKYK3N',
'39EWFT',
'CGA64P',
'CSXJ5U',
'SPARMY',
'WCK8F8',
'42KTGP',
'KMH3KW',
'VFBC6S',
'VDTGKT',
'D88V3W',
'JXJN6N',
//*******C0D3S********
'3FQGCV',
'HNBA4X',
'B3GMSF',
'EU95UC',
'HBDANS',
'4E93AA',
'UTGHX6',
'R6N9NU',
'S7USGX',
'QWFHB8',
'KQDGS9',
'S55U7Q',
'YM5N7H',
'R2DT9N',
'RXPDV4',
'N3AKSJ',
'JM9HBR',
'4XY8QR',
'A9KAVP',
'2YFGCN',
'Whpx8r', 
'Ucp2vq', 
'Nc7px6', 
'Hbuakd', 
'Fqdcg4',
'sunpys',
'axd9yu', 
'wjtg34',
//****devil codes****
'AHWXGV',	//war👿deadite 		Z
'C3RQ4X',	//war👿Janer 		Z
'C5HKJC',	//war👿cider			Z
'GDK62X',	//war👿arsenal 		Z
'7CJB5S',	//war👿farin			Z
'URUBR4',	//war👿sarcastic 	Z
'ENQQYC',	//war👿chaos 		Z
'CUPAHT',	//war👿main 			Z
'WSKN63',	//war👿spartan 		Z
'JH5TJR',	//war👿black			V
'WDRN72',	//war👿RaGod 		V
'S9R8PV',	//Janer🐷🐮🐗17		Z
'VKBB3W',	//adolf👨hitlister	Z
'KC97UJ',	//Wacko VI
'HNBA4X',	//wacko
'2BAYBP',	//war👿groupie		Z
'DTEYXU',	//war👿groupie		Z
'45T2MN',	//war👿biscuit 		Z
'QA2762',	//war👿gubbies		z
'3FRQPG',	//war👿ㄗϋՏՏㄚ		z
'FQDCG4',	//war👿deviant		z
'A2GXPG',	//war👿wicked		z
'S7USGX',	//war👿sith			z
'XCFFVN',	//war👿baby			Z
'AXD9YU',	//war👿scouser		Z
'4E93AA',	//war👿wacko 		Z
'HBDANS',	//War👿Wacko 		Z
'M8P46P',	//war👿recksie		Z
'D2VP64',	//war👿eve			Z
'TEUXMY',	//war👿cobra			Z
'FNTPKX',	//war👿shÏz			Z
'G9WBCS',	//war👿hulk			Z
'JX43KY',	//war👿skarr			Z
'7EV8BB',	//war👿skarr			Z
'WQ2Y8G',	//war👿skarr			Z
'V8SV7C',	//war👿ghost			Z
'54PUE9',	//war👿godless		Z
'BTH64E',	//war👿scotty		Z
'TRERUV',	//war👿butcher		Z
'WSKN63',	//war👿spartan		Z
'WG7437',	//war👿maestro		Z
'PQXSR2',	//war👿maestro		Z
'S9NB55',	//war👿maestro		Z
'SHJNRY',	//war👿machine		Z
'UHN5AP',	//war👿mental		Z
'FJ9DPD',	//war👿boom			Z
'HQJHJR',	//war👿trauma		Z
'UMJNJH',	//war👿duchess		Z
'KWRAAD',	//war👿 duchess		Z
'K8VEMT',	//war👿 wildnwicked	Z
'GRXVM9',	//war 👿madman		Z
'QMV6TH',	//war👿 madman		Z
'8K4CGW',	//war👿 Bengal 		Z
'X5TH8C',	//war👿 jammer		Z
'CFKWS4',	//war👿 mezza		Z
'5QNW9S',	//BLOODY JEFF		Z
'K7XU45',	//SMASHER DOA 		Z 			
'J28HTX',	//JANER 19			Z
'W43M3C',	//JANER🐰🐮🐷21		Z
'EGFJ44',	//JANER KITTY3		Z
'U8HC5W',	//7Shotgun			Z
'PXTGYS',	//JANER🐰🐮🐷11		Z
'RU424F',	//JANER🐷🐮🐰13		Z
'T9NXTN',	//JANER 15 			Z
'2UKCY3',	//JANER 15			Z
'S9R8PV',	//JANER🐰🐮🐷17		Z
'C3RQ4X',	//War👿Janer			Z
'AEBM3K',	//War👿Janer5		Z
'TN9QTG',	//War👿Kitty			Z
'97FRTR',	//JANER🐶🐱🐰4				?
'85VN3B',	//War👿Torn			Z
'GAPFAE',	//War👿Deadite✨		Z
'QVMD56',	//War👿Wacko✨		Z
'MTN776',	//War👿Snake✨		Z
'WDRN7',	//war👿RaGod					?
'N7K7P2',	//War👿Exo			Z
'B6A7SG', 	//War👿Exo			Z
'9PQ36B',	//War👿Exo			Z
'28XD27',
'PJFDRW',
'GE66F7',
'65KARB',
'QKTQCR',


'end' ]

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
