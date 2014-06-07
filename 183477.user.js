// ==UserScript==
// @name           Ice's Little Family
// @namespace      Ice
// @description    Invites all my givers to your family
// @include        http://wwar.storm8.com/group.php*
// ==/UserScript==
var numClick = GM_getValue('autoclicknum', 0);
var codes = ['5RHC4R' ,
'R3WMWC' ,
'W78JD3' ,
'63JBY7' ,
'QFF3PS' ,
'F3QAB4' ,
'SQRP9Q' ,
'Y32YYD' ,
'EP5UKK' ,
'RFKP4K' ,
'PDD4YP' ,
'9HWXQM' ,
'STUYWB' ,
'V4S23Q' ,
'HSB8F8' ,
'CX85R7' ,
'VGJDFT' ,
'WS668B' ,
'V74HH6' ,
'X5VBNR' ,
'65JJFH' ,
'EGQS7H' ,
'TKT3YS' ,
'CA9YEA' ,
'9HUU64' ,
'T6TAKW' ,
'YHJENF' ,
'K6V5J3' ,
'X464TQ' ,
'2UBJBE' ,
'BDND4P' ,
'TNK4KA' ,
'5PFG3F' ,
'FD9QEN' ,
'TVC3PH' ,
'WMEUXG' ,
'CNJWTK' ,
'E96PGF' ,
'4CV9DP' ,
'NKSY3M' ,
'CBU226' ,
'4UPQPB' ,
'W8VAUT' ,
'N532FC' ,
'8KRH2W' ,
'J9DFRU' ,
'728Q6F' ,
'2WDBFA' ,
'APPJFX' ,
'7VTDGR' ,
'2TM3SN' ,
'4D86XD' ,
'AJMKPF' ,
'8X3KDW' ,
'29Q2XN' ,
'R38225' ,
'WW8MBT' ,
'N9CGMT' ,
'GP2HWG' ,
'483682' ,
'U9HUP2' ,
'SP3PGY' ,
'52AE94' ,
'4HPRHK' ,
'7YYF96' ,
'QT4DJT' ,
'HBTHXD' ,
'3SSMBE' ,
'NH3FHH' ,
'DFUWY4' ,
'JRFPTA' ,
'J87N63' ,
'VHFTYQ' ,
'MFQGWV' ,
'WRTX3D' ,
'YYNB4N' ,
'M3N2YT' ,
'6GTU63' ,
'DAN5YD' ,
'WQMNWC' ,
'7HD2BM' ,
'MS4G4P' ,
'6GCQGH' ,
'YTJYY5' ,
'FFB47B' ,
'KMVA8R' ,
'JT4ED4' ,
'XF7HGX' ,
'UJE9J2' ,
'C6HM42' ,
'SWATDB' ,
'MJDAPG' ,
'8JTKCT' ,
'EN5J9E' ,
'7ANCFM' ,
'8N96S5' ,
'NFG3JX' ,
'AST2TG' ,
'GYDPC5' ,
'NHPJ5K' ,
'DY2JEP' ,
'J9YPSF' ,
'637EGD' ,
'CE2HVK' ,
'GKVDPP' ,
'VGYRTS' ,
'Y43G6U' ,
'YBWKR9' ,
'PT594D' ,
'2EJSNU' ,
'GDE3TW' ,
'8D2FJ4' ,
'P6DKKY' ,
'F4KDSQ' ,
'PJVXKW' ,
'9H3SYV' ,
'K8V56S' ,
'JCV9AD' ,
'CKMT65' ,
'FQT68S' ,
'E8QKDK' ,
'SQF3FU' ,
'QTHXM4' ,
'4TQJRG' ,
'SJYFNF' ,
'PQDAWB' ,
'FV2CKG' ,
'9W36M4' ,
'ECJPAJ' ,
'2F6E89' ,
'WE64VT' ,
'QNPYPW' ,
'KVCHPK' ,
'Q7VN2X' ,
'5WAG3K' ,
'U3QVH5' ,
'F4RNUG' ,
'SBTJC8' ,
'KFXPAV' ,
'5GVP44' ,
'UPV6DE' ,
'MFXUFN' ,
'U26VV8' ,
'BEAXXY' ,
'UVUFVH' ,
'N86T8V' ,
'E8JTUD' ,
'BW2X47' ,
'F4696B' ,
'4PWSST' ,
'RQE9K3' ,
'K4JQDB' ,
'P72NDG' ,
'43KG8R' ,
'FWKAVX' ,
'YEJQN7' ,
'DECRSD' ,

    ]

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
		alert("Congratulations!\nYou just invited all my wingivers to your acct. \nBe prepared to heal, b'cuz you fixin to lvl yo ass off ;)");
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
wwash.innerHTML += '<br><p style="font-size: 10px; color: #f00; padding: 5px 0">Click Invite <input id="acdn" type="text" value="'+numClick+'" style="background: #000; color: #f00; border: #00f 1px solid; width: 30px"> times</p>';
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
