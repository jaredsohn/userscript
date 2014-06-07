// ==UserScript==
// @name           Manga Reader
// @namespace      Manga Reader
// @description    Manga Reader Helper and Auto bookmark
// @include        *
// @version        3
// ==/UserScript==

// Configurations and Settings
var MR_Meta = {
	version : 3,
	meta : 'http://userscripts.org/scripts/source/61013.meta.js',
	src : 'http://userscripts.org/scripts/source/61013.user.js'
};

// Navigate keys
var Const_PrevKey = 37; // left
var Const_NextKey = 39; // right

// Autobookmark keys
var Const_BookmarkKey = 65; // a
var Const_DelBookmarkKey = 68; // d
var Const_EmptyBookmarkKey = 69; // e
var Const_TrackKey = 84; // t

var SITEKEY = null;
var SITEURL = top?top.location.href:location.href;
var MANGA = null;
var M = null;
var MR_Bookmark = new Array();

var GetValueAvailable = false;

// Manga Site Configurations
var Manga_Sites =
{
	'TM' :
	{
		Reg : /^http:\/\/www\.thaimanga\.net\/viewer\/.+$/,
		Init : ThaiManga_LoadWWWContent,
		Title : 'ThaiManga.net',
		Next : 'input[type=button][value=next]:first',
		Prev : 'input[type=button][value=prev]:first',
		Manga : ThaiManga_GetManga,
		PageList : "select[name=page]:first option[value!='']",
		NextChapter : ThaiManga_NextChapter,
		Home : 'http://www.thaimanga.net/'
	},
	'CN' :
	{
		Reg : /^http:\/\/cartooniverse\.professionalserverdedecatedhosting\.co\.uk\/mangaview\/.+$/,
		Init : null,
		Title : 'Cartooniverse.co.uk',
		Next : 'input[type=button][value=next]:first',
		Prev : 'input[type=button][value=back]:first',
		Manga : Cartooniverse_GetManga,
		PageList : "select[name=page]:first option[value!='']",
		NextChapter : Cartooniverse_NextChapter,
		Home : 'http://www.cartooniverse.co.uk/'
	},
	'CN2' :
	{
		Reg : /^http:\/\/www\.cartooniverse\.co\.uk\/mangaview\/.+$/,
		Init : null,
		Title : 'Cartooniverse.co.uk',
		Next : 'input[type=button][value=next]:first',
		Prev : 'input[type=button][value=back]:first',
		Manga : Cartooniverse_GetManga,
		PageList : "select[name=page]:first option[value!='']",
		NextChapter : Cartooniverse_NextChapter,
		Home : 'http://www.cartooniverse.co.uk/'
	},
	'CNX' :
	{
		Reg : /^http:\/\/www\.cartooniverse-x\.co\.uk\/dedicated1\/.+$/,
		Init : null,
		Title : 'Cartooniverse-X.co.uk',
		Next : 'input[type=button][value=next]:first',
		Prev : 'input[type=button][value=back]:first',
		Manga : CartooniverseX_GetManga,
		PageList : "select[name=page]:first option[value!='']",
		NextChapter : CartooniverseX_NextChapter,
		Home : 'http://www.cartooniverse.co.uk/'
	}
};

// Detector
function MR_GetSiteKey()
{
	for (key in Manga_Sites) if (Manga_Sites[key].Reg.exec(SITEURL)) return key;
	return null;
}

// Utilities
function MR_LoadScript(src)
{
	var MR_script = document.createElement('script');
	MR_script.type = 'text/javascript';
	MR_script.src = src;
	document.getElementsByTagName('head')[0].appendChild(MR_script);
}

function MR_Set(key, val)
{
	window.setTimeout(function(){GM_setValue(key, val);}, 0);
}

function MR_Get(key, deflt)
{
	rtn = GM_getValue(key);
	if (((typeof rtn) == 'undefined') && ((typeof deflt) != 'undefined'))
		return deflt;
	return rtn;
}

function MR_Del(key)
{
	window.setTimeout(function(){GM_deleteValue(key);}, 0);
}

function MR_LoadJQuery()
{
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(MR_LoadJQuery,100); }
	else { jQuery = unsafeWindow.jQuery; $jQ = jQuery.noConflict(true); MR_StartUp(); }
}

function MR_Attach()
{
	html = '<div id="mr_app" style="position:absolute;left:0px;top:0xp;padding:5px;background-color:#fff;border:1px solid #000;z-index:99999;font:10pt tahoma;color:#000;">'
	     + '<b><a href="http://userscripts.org/scripts/show/61013" target="_blank" style="color:#000">Manga Reader (r' + MR_Meta.version + ')</a> &gt; <a href="' + M.Home + '" target="_blank" style="color:#000">' + M.Title + '</a></b><br>'
		 + '<span style="font:8pt tahoma;color:#000;">'
		 + '<hr>'
		 + '<b>คีย์ลัด</b><br>'
		 + '<b>a</b> : ตั้งค่า Auto bookmark เรื่องนี้<br>'
		 + '<b>d</b> : ยกเลิก Auto bookmark เรื่องนี้<br>'
		 + '<b>e</b> : ยกเลิก Auto bookmark ทุกเรื่อง<br>'
		 + '<b>t</b> : สลับการตั้งค่า Auto bookmark เรื่องนี้<br>'
		 + '<b>&lt;-</b> : ไปหน้าก่อนหน้านี้<br>'
		 + '<b>-&gt;</b> : ไปหน้าถัดจากหน้านี้/ไปตอนถัดไป<br>'
		 + '<hr>'
		 + '<span id="mr_upgrade" style="color:#000;font:8pt tahoma;"></span> <a href="#" id="mr_autoupdate" style="color:#000;font:8pt tahoma;">อัพเดทเวอร์ชั่นใหม่</a><a href="#" id="mr_upgrade" style="display:none;color:#000;font:8pt tahoma;">คลิกเพื่ออัพเกรด</a><span id="mr_notify" style="color:#000;font:8pt tahoma;"></span></span>'
		 + '</span>'
		 + '</div>';
	$jQ('body > *:first').prepend(html);
	$jQ('#mr_app').fadeTo('fast', 0.7);
}

function MR_PageCount()
{
	return $jQ(M.PageList).size();
}

function MR_TrackManga()
{
	MR_MangaBookmark(true);
	alert('ตั้งค่า Auto Bookmark เรื่องนี้แล้ว');
}

function MR_UntrackManga()
{
	MR_RemoveCurrentBookmark(true);
	alert('ยกเลิก Auto Bookmark เรื่องนี้แล้ว');
}

function MR_LoadBookmark()
{
	bookmark = MR_Get('bookmark', '[]');
	if (bookmark == '') bookmark = '[]';
	bm = JSON.parse(bookmark);
	for(m in bm) { MR_Bookmark[bm[m]] = bm[m]; }
}

function MR_MangaBookmark(silence)
{
	MR_LoadBookmark();
	if (!MR_BookmarkExists()){MR_Bookmark[MANGA.key] = MANGA.id;}
	MR_Set(MANGA.id + '.title', MANGA.title);
	MR_Set(MANGA.id + '.url', MANGA.url);
	MR_SaveBookmark();
	if (!silence){alert('Bookmark ' + MANGA.title + ' ไว้แล้ว');}
}

function MR_RemoveCurrentBookmark(silence)
{
	if (silence)
	{
		MR_RemoveBookmark();
	}
	else
	{
		if (confirm('ต้องการยกเลิก Auto Bookmark ' + title + '?'))
		{
			MR_RemoveBookmark();
			alert('Auto Bookmark ' + title + ' ถูกยกเลิกแล้ว');
		}
	}
}

function MR_RemoveBookmark()
{
	MR_LoadBookmark();
	delete MR_Bookmark[MANGA.key];
	MR_Del(MANGA.id + '.title');
	MR_Del(MANGA.id + '.url');
	MR_SaveBookmark();
}

function MR_EmptyBookmark()
{
	if (confirm('ต้องการลบ Auto Bookmark ทั้งหมด?'))
	{
		MR_LoadBookmark();
		for (x in MR_Bookmark)
		{
			MR_Del(MR_Bookmark[x] + '.track');
			MR_Del(MR_Bookmark[x] + '.title');
			MR_Del(MR_Bookmark[x] + '.url');
		}
		MR_Del('bookmark');
		alert('Auto Bookmark ทั้งหมดถูกยกเลิกแล้ว');
	}
}

function MR_BookmarkExists()
{
	for (x in MR_Bookmark)
	{
		if (MR_Bookmark[x] == MANGA.id)
		{
			return true;
		}
	}
	return false;
}

function MR_SaveBookmark()
{
	bookmark = JSON.stringify(MR_Bookmark);
	MR_Set('bookmark', bookmark);
}

function MR_IsTracked()
{
	return MR_BookmarkExists();
}

function MR_LoadBookmarkMenu()
{
	for(x in MR_Bookmark)
	{
		mangaid = MR_Bookmark[x];
		title = MR_Get(mangaid + '.title');
		url = MR_Get(mangaid + '.url');
		fnname = 'goManga_' + mangaid.replace(/:/g, '');
		eval ('var ' + fnname + ' = function(){var lurl = "' + url + '";location.href=lurl;};');
		keymatch = /^([^_]+)_/.exec(mangaid);
		sitekey = keymatch[1];
		GM_registerMenuCommand('[Manga Reader/' + sitekey + '] - ' + title, eval(fnname));
	}
}

function MR_AutoUpdate(c)
{
	if (c == 0)
	{
		$jQ('a[id=mr_autoupdate]').hide();
		$jQ('a[id=mr_upgrade]').hide();
		$jQ('span[id=mr_upgrade]').html('เช็คเวอร์ชั่นล่าสุด...');
		$jQ('span[id=mr_notify]').html('');
		MR_xmlhttpRequest(
			{
				method:'get', 
				url: MR_Meta.meta, 
				onload:function(r)
					{
						s = r.responseText;
						if( m = /@version\s+(\S+)/.exec(s))
						{
							rV = parseInt(m[1]);
							if (rV <= MR_Meta.version)
							{
								$jQ('span[id=mr_upgrade]').html('คุณมีเวอร์ชั่นล่าสุดแล้ว ');
								$jQ('a[id=mr_autoupdate]').html('เช็คอีกรอบ').show();
							}
							else
							{
								$jQ('span[id=mr_upgrade]').html('มีเวอร์ชั่นใหม่ (release ' + rV + ')');
								$jQ('a[id=mr_autoupdate]').hide();
								$jQ('a[id=mr_upgrade]').show();
								$jQ('span[id=mr_notify]').html('<br><span style="color:red">* รีเฟรชหน้านี้เพื่อเรียกใช้ Manga Reader ที่เพิ่งติดตั้ง *</span>');
							}
						}
					}
			});
	}
	else
	{
		window.location.href = MR_Meta.src;
	}
	return false;
}

function MR_xmlhttpRequest(options)
{
	window.setTimeout(function(){GM_xmlhttpRequest(options);}, 0);
}


// External Helpers
var JSON=JSON||{};JSON.stringify=JSON.stringify||function(obj){var t=typeof(obj);if(t!="object"||obj===null){if(t=="string")obj='"'+obj+'"';return String(obj);}else{var n,v,json=[],arr=(obj&&obj.constructor==Array);for(n in obj){v=obj[n];t=typeof(v);if(t=="string")v='"'+v+'"';else if(t=="object"&&v!==null)v=JSON.stringify(v);json.push((arr?"":'"'+n+'":')+String(v));}return(arr?"[":"{")+String(json)+(arr?"]":"}");}};JSON.parse=JSON.parse||function(str){if(str==="")str='""';eval("var p="+str+";");return p;};
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}if(enc4!=64){output=output+String.fromCharCode(chr3);}}output=Base64._utf8_decode(output);return output;},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}return string;}};
var MD5=function(string){function RotateLeft(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits));}function AddUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8);}if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8);}else{return(lResult^0x40000000^lX8^lY8);}}else{return(lResult^lX8^lY8);}}function F(x,y,z){return(x&y)|((~x)&z);}function G(x,y,z){return(x&z)|(y&(~z));}function H(x,y,z){return(x^y^z);}function I(x,y,z){return(y^(x|(~z)));}function FF(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};function GG(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};function HH(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};function II(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);};function ConvertToWordArray(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));lByteCount++;}lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray;};function WordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);}return WordToHexValue;};function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;};var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=Utf8Encode(string);x=ConvertToWordArray(string);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD);}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase();};

// Bootstrap
SITEKEY = MR_GetSiteKey();
MR_LoadBookmark();
if (SITEKEY != null)
{
	M = Manga_Sites[SITEKEY];
	M.Key = SITEKEY;
	MR_LoadScript('http://code.jquery.com/jquery-latest.min.js');
	MR_LoadJQuery();
}
else
{
	window.setTimeout(MR_LoadBookmarkMenu, 0);
}

// The show begins
function MR_StartUp()
{
	MANGA = M.Manga();
	MR_Attach();
	$jQ('a[id=mr_autoupdate]').click(function(){MR_AutoUpdate(0);});
	$jQ('a[id=mr_upgrade]').click(function(){MR_AutoUpdate(1);});
	if ((M.Init !== null) && (typeof(M.Init) == 'function')) { M.Init(); }
	if (MR_IsTracked())
	{
		MR_MangaBookmark(true);
	}
	window.setTimeout(MR_LoadBookmarkMenu, 10);

	$jQ(document).keyup(function(e){
		switch(e.keyCode)
		{
			case Const_PrevKey:
				$jQ(M.Prev).click();
				return false;
				break;
			case Const_NextKey:
				if (parseInt(MANGA.page, 10) >= MR_PageCount())
					M.NextChapter();
				else
					$jQ(M.Next).click();
				return false;
				break;
			case Const_BookmarkKey:
				MR_TrackManga();
				return false;
				break;
			case Const_DelBookmarkKey:
				MR_UntrackManga();
				return false;
				break;
			case Const_EmptyBookmarkKey:
				MR_EmptyBookmark();
				return false;
				break;
			case Const_TrackKey:
				MR_ToggleTrackManga();
				return false;
			default:
			//	alert(e.keyCode);
		}
	}
	).dblclick(function(){
		if (parseInt(MANGA.page, 10) >= MR_PageCount())
			M.NextChapter();
		else
			$jQ(M.Next).click();
	});
}

// Site-Customized function
function ThaiManga_LoadWWWContent()
{
	val = /vckes=(.+)/.exec($jQ('object#cartwindow param[name=FlashVars]').val());
	vckes = unescape(val[1]);
	hash = MD5(vckes + 'zme2xs');
	enc = Base64.encode(vckes);
	src = '/fetch_image.php?xmb=' + hash + '&agv=' + enc;
	$jQ('object#cartwindow param[name=movie]').val(src);
	$jQ('object#cartwindow embed').attr('src', src);
}

function ThaiManga_GetManga()
{
	match = /viewer\/(\d+)\/([^\/]+)\/(\d+)\/(\d+)/.exec(SITEURL);
	key = match[1] + '/' + match[2];
	id = M.Key + '_' + match[1] + '_' + match[2];
	chapter = match[3];
	page = match[4];
	code = match[2];
	title = $jQ('div[class=reader_box] h3 a:first').next().text() + ' ตอนที่ ' + chapter + ' หน้า ' + page;
	return {key:key, code:code, id:id, chapter:chapter, page:page, title:title, url:SITEURL};
}

function ThaiManga_NextChapter()
{
	$jQ(M.Next).click();
}

function Cartooniverse_GetManga()
{
	match = /mangaview\/([^\/]+)\/(\d+)_([^_]+)_(\d+)/.exec(SITEURL);
	key = match[1];
	id = M.Key + '_' + match[1] + '_' + match[2];
	chapmatch = /Chapter (\d+)/.exec($jQ('select[name=chapter]:first option:selected').text());
	chapter = chapmatch[1];
	page = match[4];
	code = match[2];
	title = $jQ('div#content2 h1 a').text() + ' ตอนที่ ' + chapter + ' หน้า ' + page;
	return {key:key, code:code, id:id, chapter:chapter, page:page, title:title, url:SITEURL};
}

function Cartooniverse_NextChapter()
{
	window.location = $jQ("select[name=chapter]:first option:selected + option").attr('value');
}

function CartooniverseX_GetManga()
{
	match = /dedicated1\/([^\/]+)\/(\d+)\-([^\/]+)\/([^\/]*)/.exec(SITEURL);
	key = match[1];
	id = M.Key + '_' + match[1] + '_' + match[2];
	chapmatch = /Ch\.([^\:]+)/.exec($jQ('title').text());
	chapter = chapmatch[1];
	page = match[4]?match[4]:0;
	code = match[2];
	title = $jQ('div#content2 h1 a').text() + ' ตอนที่ ' + chapter + ' หน้า ' + page;
	return {key:key, code:code, id:id, chapter:chapter, page:page, title:title, url:SITEURL};
}

function CartooniverseX_NextChapter()
{
	window.location = $jQ("select[name=chapter]:first option:selected + option").attr('value');
}

