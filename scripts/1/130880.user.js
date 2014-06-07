// ==UserScript==
// @name			Specialized Tools(English)
// @namespace		spcltools(english)
// @version			05.13.2012.2
// @updateURL		http://userscripts.org/scripts/source/125381.user.js
// @downloadURL		http://userscripts.org/scripts/source/125381.user.js
// @description		Tools MOD
// @author			Dethbecometh
// @include			*globalwarfaregame.com/*main_src.php*
// @include			*globalwarfaregame.com/*fb.php*
// @include			*apps.facebook.com/globalwarfaregame/*
// @include			*globalwarefaregame*
// @email			Dethbecomethii@gmail.com
// @license			GNU GPL
// @icon			http://imgur.com/gallery/KcWPF
// ==/UserScript==

// Orginal by jontey - Thanks

var Version = '05.13.2012.2';

// Tab-Switches
var ENABLE_OVERVIEW = true;
var ENABLE_TOWER = true;
var ENABLE_TRANSPORT = true;
var ENABLE_FARM = true;
var ENABLE_ARTIFACTS = true;
var ENABLE_SEARCH = true;
var ENABLE_PLAYER = true;
var ENABLE_BUILD = true;
var ENABLE_TRAIN = true;
var ENABLE_OPTIONS = true;
var ENABLE_FAKE_TAB = true;
var ENABLE_SCOUT = true;
//End Tab-Switches

// Debug Switches
var ENABLE_HELP = true;
var ENABLE_DEBUG = false;
var DEBUG_TRACE = false;
var ENABLE_GENERAL = true;
var ENABLE_INFO = true;
// End Debug Switches

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if (is_chrome) {
	window.unsafeWindow || (unsafeWindow = (function() {
		var el = document.createElement('p');
			el.setAttribute('onclick', 'return window;');
			return el.onclick();
		}())
	);
if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {
		GM_getValue=function (key,def) {
			return localStorage[key] || def;
		};
		GM_setValue=function (key,value) {
			return localStorage[key]=value;
		};
		GM_deleteValue=function (key) {
			return delete localStorage[key];
		};
	}
}

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

var DEFAULT_ALERT_SOUND_URL = 'http://koc.god-like.info/alarm.mp3';
var SWF_PLAYER_URL = 'http://koc.god-like.info/alarmplayer.swf';
var CHAT_BG_IMAGE = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QNSRXhpZgAATU0AKgAAAAgABVEAAAQAAAABAAAAAFEBAAMAAAABAAEAAFECAAEAAAMAAAAASlEDAAEAAAABAAAAAFEEAAEAAAAB/AAAAAAAAAAAAAAAADMAAGYAAJkAAMwAAP8AKwAAKzMAK2YAK5kAK8wAK/8AVQAAVTMAVWYAVZkAVcwAVf8AgAAAgDMAgGYAgJkAgMwAgP8AqgAAqjMAqmYAqpkAqswAqv8A1QAA1TMA1WYA1ZkA1cwA1f8A/wAA/zMA/2YA/5kA/8wA//8zAAAzADMzAGYzAJkzAMwzAP8zKwAzKzMzK2YzK5kzK8wzK/8zVQAzVTMzVWYzVZkzVcwzVf8zgAAzgDMzgGYzgJkzgMwzgP8zqgAzqjMzqmYzqpkzqswzqv8z1QAz1TMz1WYz1Zkz1cwz1f8z/wAz/zMz/2Yz/5kz/8wz//9mAABmADNmAGZmAJlmAMxmAP9mKwBmKzNmK2ZmK5lmK8xmK/9mVQBmVTNmVWZmVZlmVcxmVf9mgABmgDNmgGZmgJlmgMxmgP9mqgBmqjNmqmZmqplmqsxmqv9m1QBm1TNm1WZm1Zlm1cxm1f9m/wBm/zNm/2Zm/5lm/8xm//+ZAACZADOZAGaZAJmZAMyZAP+ZKwCZKzOZK2aZK5mZK8yZK/+ZVQCZVTOZVWaZVZmZVcyZVf+ZgACZgDOZgGaZgJmZgMyZgP+ZqgCZqjOZqmaZqpmZqsyZqv+Z1QCZ1TOZ1WaZ1ZmZ1cyZ1f+Z/wCZ/zOZ/2aZ/5mZ/8yZ///MAADMADPMAGbMAJnMAMzMAP/MKwDMKzPMK2bMK5nMK8zMK//MVQDMVTPMVWbMVZnMVczMVf/MgADMgDPMgGbMgJnMgMzMgP/MqgDMqjPMqmbMqpnMqszMqv/M1QDM1TPM1WbM1ZnM1czM1f/M/wDM/zPM/2bM/5nM/8zM////AAD/ADP/AGb/AJn/AMz/AP//KwD/KzP/K2b/K5n/K8z/K///VQD/VTP/VWb/VZn/Vcz/Vf//gAD/gDP/gGb/gJn/gMz/gP//qgD/qjP/qmb/qpn/qsz/qv//1QD/1TP/1Wb/1Zn/1cz/1f///wD//zP//2b//5n//8z///8AAAAAAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCALYAagDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8J6KKK9g88KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArV8KeBdb8d3b2+h6NquszxAM8djaSXDoD0JCAkV+rf8AwSQ/4INz+MX0/wAbfFS2jjWQLdWGlSMNgjyCJpiQV24GcccZr0H/AIKEf8FEvhh+xdc6n4F/Zy8M+GLbxLFi31rxJBYxuAQMOkZPHHPY171HJUkniZ8vkldnys+KITryw+Eg5tddkfkH/wAM2fEX/oQfGv8A4I7r/wCIo/4Zs+Iv/Qg+Nf8AwR3X/wARX1t/w+N+OA/5me0P/bhF/hSD/gsf8cScDxHb5P8A04Rf4V0f2dlf/P8Al/4D/wAEv+0sz/58x/8AAv8AgHyV/wAM2fEX/oQfGv8A4I7r/wCIo/4Zs+Iv/Qg+Nf8AwR3X/wARX1v/AMPifjn/ANDFa/8AgHD/AIUH/gsV8cwOfEVqB6/YoeP0pf2dlf8Az+l/4D/wR/2lmf8Az5j/AOBf8A+SD+zb8RQMnwD41AH/AFA7r/4iue1rwRrXhuZ49R0jVLCSMZdbm1kiKj3DAYr7YX/gsf8AHFGBHie1yORiwiB/lXPeKP8Agp38SfG83ma1/wAIzq8nUNe6DaTsD9WQmoeXZbbStL/wH/glrMsxvrRj/wCBf8A+NKK+tB+334uJ40fwMT6f8Irp/P8A5Cpf+G+PGH/QD8D/APhMaf8A/Gq5P7Pw3/P7/wAlf+Z1/X8V/wA+f/Jl/kfJVFfWv/DfHjD/AKAfgf8A8JjT/wD41R/w3x4wP/MD8Dj/ALljT/8A41R9Qw3/AD+/8l/4JH9p4n/nz/5Mv8j5Kor62P7evjADnR/AgHr/AMIvp/H/AJCpv/DfHi3/AKBngL/wlLD/AONUf2fhv+f3/kr/AMwWZ4n/AJ8/+TL/ACPkuivrX/hvjxb20vwGx9B4VsOf/IVH/DfHjA/8wPwOP+5Y0/8A+NUfUMN/z9f/AID/AME0+v4n/nz/AOTL/I+SqK+tv+G9fGA/5g3gQ/8Acsaf/wDGqQft8+MAc/2J4GXHc+F9P4/8hUfUMN/z9f8A4D/wQ+v4n/nz/wCTL/I+SqK+uF/b+8XFgP7M8Bc/9SpYf/G6k/4b48W/9AzwF/4Slh/8ao+oYb/n6/8AwH/gh9fxP/Pn/wAmX+R8h0V9ej9vjxaTxpfgMn0/4RWw5/8AIVD/ALevjDYf+JN4E6f9Cxp//wAao+oYb/n9/wCS/wDBD6/if+fP/ky/yPkKivrb/hvXxgP+YN4EP/csaf8A/GqT/hvjxgf+YH4HH/csaf8A/Gqf9n4b/n9/5K/8w+v4n/nz/wCTL/I+SqK+tv8AhvXxh/0BvAn/AITGn/8Axqj/AIb18Yf9AbwJ/wCExp//AMapf2fhv+f3/kr/AMw+v4n/AJ8/+TL/ACPkmivrb/hvXxh/0BvAn/hMaf8A/GqP+G9fGH/QG8Cf+Exp/wD8ao+oYb/n6/8AwH/gh9fxP/Pn/wAmX+R8k0V9bf8ADevjD/oDeBP/AAmNP/8AjVH/AA3r4w/6A3gT/wAJjT//AI1R9Qw3/P1/+A/8EPr+J/58/wDky/yPkmivrb/hvXxh/wBAbwJ/4TGn/wDxqj/hvXxh/wBAbwJ/4TGn/wDxqj6hhv8An6//AAH/AIIfX8T/AM+f/Jl/kfJNFfW3/DevjD/oDeBP/CY0/wD+NUf8N6+MP+gN4E/8JjT/AP41R9Qw3/P1/wDgP/BF/aGJ/wCfP/ky/wAj5Jor61P7e3i9R82k+A1Hr/wi2nn/ANpUo/b28XkcaR4EYev/AAi+nj/2lR9Qw3/P1/8AgP8AwQWYYnrR/wDJl/kfJNFfWNz/AMFAPFtpu36R4EGyPzCD4X08EDOOhiyR7gUN+394wViBo/gFgP4l8L2OD7j9zWscppS+Go3/ANu/8El5nXW9L/yZf5HydRX1qv7fPixHHmaV4HAZcjPhKwUZ9MmPn8qh/wCHgXi0DH9l+Ai+CSp8LaepABxkfu/mPsDk9cdqbyikmk6jV/7j/wAwjmdaW1L/AMmX+R8oUV9ZTft9+MYpWU6L4EBUkYPhaxBH4GCpLT9v3xdu50PwGT/2LNl/8aqZZVRi7Sqv/wABf+YpZpWW1Jf+BL/I+SaK+6Nc+G2g/wDBQD4fyaj4d0q00f4o6BabtR0K2iSCHW4AvNzbLj5ZOrEAFcn5VAwK+J/FHhu68Ja7cafeRSxT2zlGWSNo2GDjlWAIIOQR2IIrmx+WzwyUr3i+p04DM6eJbja0lujPooorzT0gooooAKKKKACiiigAooooA/az/gq1/wAFP7v4L/DXT/gT8MZbnT47bSLWDWtejJ33eYhujjbPCsp9O9fkjr2qPqF5K8xaWRi0hJJyzHqTzyfrX0j/AMFJHeH9oRm3u5/sewHJ64s4xXzFfJ+8LhJd2M9a+zzhyp4iUFsj5HIKVOOEhOKs2VhcPn7so9/SnG4kYYMjkHqM9aYJXYgFZsH/AD6VJ5f/AEzlrwbH0HLHsR8D+HPtk/40B8H/AFLj3yeKk8vHSOUUuGPVZz+X+FFg5Y9hnnOOQWyPTrR9sm/6b/5/CnCPBH7uUU/A/wCnj8x/hU8yDliRG7mI5E5H1pvnt/zzm/M1Pgf9PH5j/CjA/wCnj8x/hRzIVmQee3/POb8zR5zHgpLg+pNTvwhI8/IHqP8ACoPOc9VmP+fpRzIfLHsKCAeBg/U/40vnMO7H2pm8/wDPKSjeR0jkFLmBRj2HrO5IGyXn3p+CeqTH/gVRxzvvXKzYz7f4VZMxxx52fqP8KfMjo5Y9iLywOkMo/E0ozn7sw9yelO8+T+7N+n+FHnOeqzH/AD9KOZByx7CAEHO5uPepFlYsBuPNR7if+Wcg96cn3x9aOZByx7ErghDyzcdM9agLAjHkyc+5qw5whIzkDt1qDz5P7s36f4UcyDlj2GeWB0hlH4mhshT8kx4/vU/z5P7s36f4UjzybD8s3T2/wo5kHLHsV9//AEwk/M0b/wDphJ+ZpRO+eVmx+H+FOMxxx52fqP8AClzByx7DN/8A0wk/M0b/APphJ+ZpfPk/uzfp/hR58n92b9P8KfMg5Y9hN/8A0wk/M0b/APphJ+ZpRO+eVmx+H+FK0z54E2Pw/wAKOZByx7Dd/wD0wk/M0b/+mEn5ml8+T+7N+n+FKszfxCYfl/hRzIOWPYbv/wCmEn5mjf8A9MJPzNP87/rv+Y/wo87/AK7/AJj/AAo5kHLHsNEpU/LFID9TQZNxyYZCfXJp3nf9d/zH+FAmOTxNjtyP8KOZByx7HpHhDxhqXwy+B0ms+H7y60bWdR1lrOW/tJniuVhjhjYRq4OVGWOceg6VnN+0t8Rsn/i4Hjo+51+7JP4mSpra2W//AGb4N5YbfEc+Mdf9RDXNHT4lOME44r2Xg6zjCdN2TXc8pTheSkr6m/H+0z8SIpVYfEHxwdhyA2tXDD9Wr0aXxFLY6Zd+OI4ol8UP4Mh1E3+X3/bX1Q2hu8bsGfyxneQSWJY5zXjX2CP+7XsGp2at8H7lOQD4Dtf/AE/murC4Ko+b2kr9tbmVarBW5FY89/4aV+Iy8f8ACwPHRx3/ALeuuf8Ax+nx/tL/ABKQ5HxA8b/+D67/APjlc9/Z8S8Yzij7AnvXLPA4iSfvHR7Shyp8p6rafFnX5vh94b8XXGqXdx4m0zXp4YtTmlaW5ZI4oJFVnYksMysD6jHfJPQft069oXx//Z88PfFNNEOjeMTrh0HXHgIW21CT7N5/2gJjIZyNx+bHzcAV55fxiD9nvTAqSH/iorzn/t0tj/7KK1viAcf8E+kG1xn4iAksc5xpmP6VeJ9p7KdKpraN/uscNHDwhWhVhpeX5nzrRRRXyB9MFFFFABRRRQAUUUUAFFFFAH2f/wAFJ8/8NBnHB/siw/8ASSOvmS4eV5WUs2AK+nf+CjiPcftG7FjZz/ZOngAHGT9kj4zXlvgn9n++8Y2j3xntbK0VgPNuZDGH9Qo2HOK/R8blOJx+NqU8NHmaZ8NlmY4fDZfCVWVrHl2HHIaTIoEs2eS1e3n9mmBHA/t7SgfT94f/AGSpD+zUhGP7b0rn3k/+Iq/9Qc0/59/iv8x/654D+f8AB/5Hh3mP/ek/KjzH/vSflXt3/DMkf/Qb0v8AN/8A4ij/AIZkj/6Del/m/wD8RS/1CzL/AJ9/ig/1zwP8/wCDPEd8jcbpOaUQSZ5eWvbl/ZmjVgf7b0vg56yf/EVKf2cVIx/bWk8+8n/xFY/8Q/zP+T8UH+ueB/n/AAZ4d9nP9+b9P8KPs5/vzfp/hXt3/DNaf9BvSvzk/wDiKP8AhmtP+g3pX5yf/EUf8Q/zP+T8UH+ueB/n/BniDwsqE75uB7f4VBvc9DLXu6/s1IWA/tvSufeT/wCIqT/hmSL/AKDWlfnJ/wDEUf8AEPs0/k/FB/rngf5/wZ4KqylgMvzUn2eT+9J+le7H9maNRn+29L456yf/ABFIv7OKlgDrWk4z6yf/ABFH/EPs17fiv8xrjPA/z/gzwr7PJ/ek/SlEMgP3pK96/wCGa4P+g5pf5v8A/EUf8M1wf9BzS/zf/wCIo/4h/mf8n4o1/wBdsB/P+DPB9svq9AWXPLPXvH/DNcH/AEHNL/N//iKD+zXARj+3NL593/8AiKP+If5n/J+KD/XbAfz/AIM8J2MerSGhYfmGA1e5/wDDMtv/ANBzTPzf/wCIpV/Zmt1YH+3NM4Oer/8AxFH/ABD/ADP+T8UH+u2A/n/Bnh7RMAeCKj2t/elr3h/2cImQj+29K5GOsn/xFQD9mSLPOt6Xj6v/APEUf8Q/zP8Ak/FB/rtgP5/wZ4cVfHDSU0rKRjL817r/AMMywDka5pmfq/8A8RSn9mxAM/23pXHvJ/8AEUf8Q+zT+T8UH+u2A/n/AAZ4MbaQj70n6Uw2bqM75eOe3+Fe9L+zjEWA/tzSufeT/wCIp8n7NkAjb/ie6WOOuZP/AIij/iH2a9vxX+Yf67YD+f8ABngG2X1egLLnlnr3Ufs3Qk8eINJJ9NsvP/jlKf2akIx/belc+8n/AMRR/wAQ/wAz/k/FB/rtgP5/wZ4WUYj70tN2SLwGkI969z/4Zkj/AOg3pf5v/wDEU5f2ao1GBrmlEjqP3nH/AI5R/wAQ/wAz/k/FB/rtgP5/wZ4Wqyd2koaJm/jlH5V7m/7M8b9db0rj3k/+IpP+GZI/+g3pf5v/APEUf8Q/zP8Ak/FB/rtgP5/wZ4W0D9nl/SgwPtGHlz+Fe6p+zPGmca3pXPvJ/wDEUL+zPGrE/wBt6Vz7yf8AxFH/ABD/ADP+T8UH+u2A/n/BnhHkSf3paeIWKgF5cj6V7t/wzWn/AEG9K/OT/wCIprfszRsc/wBt6X+cn/xFH/EP8z/k/FB/rtgP5/wZzfwy0ZPHnwevNBsbq1Os6Zqp1FrSeYQNPDJEikq7DbkFRT/+Gf8AxMfvW1kD3xqNsR/6MH8q6Nf2bQHBOu6Y23bgMXIABzj7nQ+lJ/wzTH/0GtJ/8f8A/iK9+jwzm0KcacqN7Luv8zy5cRYDmlKNTd9mc6v7PXiqa5RI7C12t1kk1K0RR+PmV02pajp2y98GDVLNtWj8JQ6T5hOy2a9TUjeG3WQ/KzbSEDD5SwJDEYqEfsyRKTjWtKweoJkIP5pSt+zLEUAGtaUu07gytIGB7fNszgdhnHtVvhvN9PZ0bfNBHiDL5aTqfgzAf9n3xOrkf2ZDwf8AoK2f/wAcqI/s/wDivJxpltj/ALClp/8AHK6SX9my2H3NZ0pf9kb8D2HyVCf2XvOBEWt6Q8rcqpeRQP8AyHVS4bzZR/ha+qFDPMA217QwviHAfBPww0bw5e3EX9tPqN3qTwQSLOLaNoUiTcV4yWToDWl8RBn/AIJ7QtukIb4iA4YYP/IMPbtXHeKvhrfeCdcuLa5UfNwWGTHKAMAqcA443D6/hXY/Ecyf8O+IN/O74hAknqT/AGYa+Mx8a0KlaNaPK1BrX5H0FGpSapOnK95I+caKKK+LPpwooooAKKKKACiiigAooooA/Sb9qP4XWni/4+SX94zNp0em6fChiAd7pxbKrKo/3gB+NV/iv43+Hf7NlvHo/i/Rrnxp4oTYb7StO8Qx6bp/hgH7tq8/lyCW6IBMiJxGoPLMrqmR8XdeudNv/GQglaL+z7SYQMrENF86LkHPBAPBHSvjTXpH1zxDKjogispJIIUUHaihzzg9WO0HceeBjGBj924zzb+wKEVgFadTVv03PxPhfI3nFfmxUvchbQ+hPiB+1Z4L1RrP/hF/AdnoEe1vtYv/ABY+ohj/AAhDGkO3Pvn8K5z/AIaPs/8AoBeG/wDway//AB+vGRoiq6sqFWXqQSd31zUn9nv7/wDfI/wr81/4iJmvc/SP9RMs7P73/mexf8NIWf8A0AvDf/g1l/8Aj1H/AA0hZ/8AQC8Nj/uKy/8Ax6vHf7Pf3/75H+FH9nMff/gI/wAKP+IiZt/MvuF/qHlvZ/e/8z2H/ho+z/6Avhf/AMGsv/x+j/ho+z/6Avhf/wAGsv8A8frx7+zP9hf++RR/Zn+wv/fIo/4iJm38y+4P9Q8t7P73/mexf8NH2f8A0BfDB/7isv8A8fo/4aQs/wDoBeG//BrL/wDHq8d/swj+BR/wEUf2e/v/AN8j/Cj/AIiJm38y+4P9Q8t7P73/AJnsQ/aRswc/2F4b4/6isv8A8ep//DS9p/0AfDX/AINZf/j9eNf2e/v/AN8j/Cj+z39/++R/hR/xETNv5l9wf6h5Z2f3v/M9lP7S1oRj+wfDXP8A1FZf/j9M/wCGkLP/AKAXhv8A8Gsv/wAerx3+z39/++R/hR/Z7+//AHyP8KP+IiZt/MvuD/UPLOz+9/5nsX/DSNp/0AvDf/g1l/8Aj1H/AA0jaf8AQC8N/wDg1l/+PV47/Z7+/wD3yP8ACj+z39/++R/hR/xETNv5l9wf6h5b2f3v/M9i/wCGkbT/AKAfhsf9xWX/AOPUD9pGzz/yBfDJ+mqzf/H68d/s5j7/APAR/hQdM4+4o/4CKP8AiImbfzL7g/1Dy3s/vf8Amey/8NIWP/QD8O/+DWX/AOPUf8NIWP8A0A/Dv/g1l/8Aj1eMf2W3q3/fI/wo/stvVv8Avkf4Uf8AERM2/mX3B/qHlvZ/e/8AM9nH7SNiD/yA/Dv/AINZf/j1Ob9pWyKn/iReGx/3FZf/AI9Xi39lt6t/3yP8KUaW2e5/4CP8KP8AiImbfzL7g/1Dyzs/vf8Amexj9pG0B/5Avhg/9xWb/wCP05v2lbRlI/sHw1z/ANRWX/4/Xjf9mEfwKP8AgIo/s9/f/vkf4Uf8REzb+ZfcH+oeWdn97/zPYB+0ZZg/8gLw5/4NZf8A49T/APhpK0H/ADA/Dg/7isv/AMerxz+z39/++R/hR/Z7+/8A3yP8KP8AiImbfzL7g/1Dy3s/vf8Amex/8NJ2x66L4dI/7Csv/wAepP8AhpCz/wCgF4b/APBrL/8AHq8d/s9/f/vkf4Uf2e/v/wB8j/Cj/iImbfzL7g/1Dyzs/vf+Z7F/w0hZ/wDQC8N/+DWX/wCPUf8ADSNoRj+wvDZA6D+1ZeP/ACNXjv8AZ7+//fI/wo/s9/f/AL5H+FH/ABETNv5l9wf6h5Z2f3v/ADPYv+GkLP8A6AXhv/way/8Ax6j/AIaQs/8AoBeG/wDway//AB6vHf7Pf3/75H+FH9nv7/8AfI/wo/4iJm38y+4P9Q8t7P73/mexf8NIWf8A0AvDf/g1l/8Aj1H/AA0hZ/8AQC8N/wDg1l/+PV47/Z7+/wD3yP8ACj+z39/++R/hR/xETNv5l9wf6h5b2f3v/M9i/wCGkLP/AKAXhv8A8Gsv/wAeo/4aQs/+gF4b/wDBrL/8erx3+z39/wDvkf4Uf2e/v/3yP8KP+IiZt/MvuD/UPLez+9/5nrEn7UVnHIy/8IzorbTjI1C5IP5SYpP+GorU/wDMraT/AOB1z/8AHa8MvL54buVN7jY5H3iOhqE6gxP3v0Br24cb45xTcjz5cH4JOyj+L/zPef8AhqSzH/Mr6P8A+B91/wDHKX/hqK1/6FbSf/A65/8AjteDDUnA++//AH0RSHUGJ+9+gNN8b4/pIn/VDBfy/i/8z3gftUWFscv4V0g/9v11/wDHK77Qv24/h6LWyhu/gtpF9NHEizXH/CT6jH5zgAM+0HC5OTjtmvktdTdf4mI9CTipbLUmRyQx5OaUeLsfWdnO1uxE+EcCl8Gvq/8AM+8/Fvh7wL8evhRH4n8K3CWllEUtNS0i7n3Xfhq7b/VqJGGZ7N/4JMbkGFcs2WPkP7TXg+bwL+w8NOuFIkj+IYZG6B1/s+Rc/wDjteTfCb4naj4C8R29/YXBSZCY2VwHjdSBlWU9Qcng161+3FqssnwPisVYrZw+ILaSKPJITNpcDHPPA4559zX1OY1qOZ5FXxNRfvacd++qPncBgq2W5vSw8XenN6eR8k0UUV+Hn64FFFFABRRRQAUUUUAFFFFAH3z8Zm83UvH+MDdZTYycfMJY8/hivk9IkTXNSdXAVb2ZSGGWGW4/MsefpX1V8cNZTRvHmtGW3guLW4aeC4hkJCSRs43DI6cDr2zXLeOv2IdR+JaReJvgzZeI/GmiTytDe2Nrbx3uu6HMcFra8t4iMqT/AKudBtcYUhTzX7H4o4WpXVJ0lflvf5n5VwFmFHDKXtnbmSt8u54Ts/3KNn+5XYeL/wBlX4p/D9bf+2/hz8SdN+2BjD53hiZSwHqN3WsE/CHxsB/yJnxB/wDCZn/+Kr8Z/s7EvaD+4/VVmuFe0196M3Z/uUbP9ytH/hUnjX/oS/iF/wCEvP8A/FUf8Kk8a/8AQl/EL/wmJ/8A4qn/AGbiv+fcvuf+Rp9fw/8AOvvX+ZnbP9yjZ/uVon4R+NgOPBfxB/HwzOB/6FTP+FTeOP8AoSvHn/hOzf40f2biv+fcvuf+RH9p4b+dfev8yjs/3KNn+5V7/hU3jj/oSvHn/hOzf40o+EvjgnnwX48/Dw7OT/Oj+zcV/wA+5fc/8g/tPC/zr71/mUNn+5Rs/wBytH/hUfjX/oS/iF/4TE//AMVR/wAKj8a/9CX8Qv8AwmJ//iqP7NxX/PuX3P8AyH/aWG/nX3r/ADM7Z/uUbP8AcrR/4VH41/6Ev4hf+ExP/wDFUf8ACo/Gv/Ql/EL/AMJif/4qj+zcV/z7f3P/ACD+0sN/OvvX+ZnbP9yjZ/uVo/8ACpPGv/Ql/EL/AMJef/4qj/hUnjX/AKEv4hf+ExP/APFU/wCy8V/I/uf+RX1/D/zr71/mZ2z/AHKNn+5Wl/wqLxsf+ZM+II/7lif/AOKo/wCFQ+Nh/wAyf4/P/csT/wDxVL+zcV/z7f3P/In+0sN/OvvX+Zm7P9ylWPLAfLzWh/wqTxqf+ZM+IQ/7lef/AOKpf+FReNl5Hg7x8SO3/CL3HP8A49T/ALLxX8j+5/5FfX8P/OvvX+ZSa2AUn5eKi2f7laX/AAqnxyeD4K+IGP8AsV5//iqQ/CTxtjjwX8Qs/wDYrz//ABVH9l4r+R/c/wDIPr+H/nX3r/Mztn+5Rs/3Kvj4R+OM8+C/iCB6/wDCLz//ABVP/wCFQ+Nf+hP8fn/uV5//AIql/ZuK/wCfcvuf+Qf2hhv5196/zM3Z/uUbP9ytH/hUfjX/AKEv4hf+ExP/APFUN8JPGwUn/hC/iDx/1LE//wAVR/ZuK/59v7n/AJE/2lhv5196/wAzO2f7lGz/AHKuf8Kq8b/9CX8Qf/CXn/8AiqP+FVeN/wDoS/iD/wCExP8A/FU/7LxX8j+5/wCRX1/D/wA6+9f5lPZ/uUbP9yrn/CqfG/8A0JfxB/8ACYn/APiqP+FVeN/+hL+IP/hMT/8AxVH9mYr+R/c/8hLMcM/tr71/mU9n+5Rs/wByrn/CqvG//Ql/EH/wmJ//AIqj/hVPjf8A6Ev4g/8AhMT/APxVH9mYr+R/c/8AIHmOGX2196/zKez/AHKNn+5Vz/hVPjf/AKEv4g/+ExP/APFUf8Kp8b/9CX8Qf/CYn/8AiqP7MxX8j+5/5C/tLDfzr71/mU9n+5Rs/wByrn/CqfG//Ql/EH/wmJ//AIqj/hVPjf8A6Ev4g/8AhMT/APxVH9mYr+R/c/8AIP7Sw386+9f5nluuTsut3g44nf8A9CNVPtDe1dtqH7PPxAur+eVfA3jMrJIzAtos6kgnPIwcfTNQ/wDDOXxB/wChG8Y/+Caf/wCJrvjhMXbSnL7mYPFYW9+dfev8zlFYlQc9aMn1NdX/AMM/fEJOP+EE8Y8cf8gaf/CnD9nj4isMjwL4ux76PP8A4USw2KSv7OX3MX1rCrea+9HJZPqantGO7r3rqof2cviLLKsY8B+Mdzd/7Fucf+gV2ujf8E9fj3qMcEsHwX+Ktzb3SLLDND4S1F45UYZVlIhIIIIII4Na0sPXjJe1i4+qsRPE4XX31ou5w/hVGuL2GNF3OWT5AMvyQMj1HH4V7p+2wXPwhXftVl122R0HJRha3AI/CuhsP2edM/ZZ8LWEPiWaVvizqWyQ6K0eE8J2bLuY3QZQwu3J/wBUcGI5VhkVx/7VUrXH7PkUj48xvENuWDffB+y3HX3r9SwlONPh3Frq4/qj89xWMeJznDOC91S3+R8yUUUV+NH6WFFFFABRRRQAUUUUAFFFFAH3T+0NaiXx/qkDugL3cyY2FjjcT0HX6Vh/ErwZ8Of2ZNG0+z+Jdt4k8QeOtUVbqfQPD+u2elDw1A3KLdTy2t0HmkBB8mNU8sHJz0rb/ao8cN8LJPE/iS2tln1KHVRaWrv92FpBITIP9pSoK9vUGviTX9fufEuqTXl3K8007tIzu252JJJLMeWPucngelfsviBmdPC1VhVrO1/kz8n4MyuWLoqrPSC0820ex+OPid8Irny/7D8FfEPThDkXDX/jmzvRk9Agj0yLGffNc0fiH4BP/MveL/8AwooP/kKvNKaUJP3nH41+aUc9r09kn8j9CWTYdbX+9npp+IXgAdfD/i7H/Yxwf/IVJ/wsb4fHp4f8X5/7GOD/AOQa8z2H++/50u33Nbf6x4j+WP8AXzL/ALKo93956YPiF4BBz/wj/i7/AMKKD/5Cp3/CyPAX/Qv+LP8AwoLb/wCQa8w2H++/50bD/ff86P8AWPEfyx/r5lf2Rhu7+89P/wCFkeAv+hf8Wf8AhQW3/wAg0D4jeAmOD4f8W88f8jBb/wDyDXmGw/33/OgIQc73496P9Y8R/LH+vmH9kYbu/vPUf+E78Af9C/4w/wDCjg/+QqP+E78Af9C/4w/8KOD/AOQq8x3t/eb86N7f3m/Oj/WPEfyx/r5h/ZGH7v7z07/hO/AH/Qv+MP8Awo4P/kKg+PPAABP/AAj/AIw/8KOD/wCQq8x3t/eb86C7EY3tz70f6x4j+WP9fMP7Iw/d/eelL8QPABIH/CP+Lv8Awo4P/kKpD488AKCf+Ef8X8f9THB/8g15cEIOd78e9PLsRje3PvS/t+v2X3P/ADJ/smj3f3npQ+IHgFjj/hH/ABdz/wBTHB/8hU7/AITnwAOnh3xaP+5jg/8AkKvMUUq4O9+DnrU32n3en/rHiP5V/XzK/sjD93956R/wnfgL/oX/ABd/4UcH/wAhUDx14ABz/wAI74t4/wCpjg/+Qq83+0+70fafd6n+363Zfd/wSf7Ko93956V/wn/gI9fD3i3/AMKOD/5CoHjvwAD/AMi/4v8A/Cjg/wDkGvNTcZH3npu//ak/On/b9fsvuf8AmH9k0e7+89OPj74fkY/4R7xf/wCFHB/8hUxvHXw+UEjw74uyP+pjg/8AkKvNC/H3pPzppdiMb2596f8ArHiP5Y/18wWU0e7+89J/4WD4B/6F/wAX/wDhRwf/ACFQfiD4BI/5F/xf/wCFHB/8hV5nsP8Aff8AOjYf77/nR/rHiP5V/XzK/sjD93956V/wnngD/oAeMP8Awo4P/kKj/hPPAH/QA8Yf+FHB/wDIVea7D/ff86Nh/vv+dT/b9bsvu/4Iv7Ko9397PSv+E88Af9ADxh/4UcH/AMhUf8J54A/6AHjD/wAKOD/5CrzXYf77/nRsP99/zo/t+t2X3f8ABG8pw/Rv72elf8J54A/6AHjD/wAKOD/5Co/4TzwB/wBADxh/4UcH/wAhV5rsP99/zo2H++/50f2/W7L7v+CCynD9W/vZ6V/wnngD/oAeMP8Awo4P/kKj/hPPAH/QA8Yf+FHB/wDIVea7D/ff86Nh/vv+dH9v1uy+7/gj/snDd397PSv+E88Af9ADxh/4UcH/AMhUf8J54A/6AHjD/wAKOD/5CrzXYf77/nRsP99/zo/t+t2X3f8ABD+ycN3f3s9JPxA8CA8eH/GmPbxHb/8AyFU1h8RPh5FdwtdeGvHc8AfMqReKLWJ2X0VjYMAfcqfpXmQ4HrRWTz7F7RaXohf2XQ8/vZ9CWHxa/Z5u76GGb4ffGi0gZ/3ky/ELTLiVU6bli/sZN7DOdu8ZAPI61m/tEfA+T4NX9jqeja1b+JvA3iaI3fh7X4WCJdwggtHNGMmKeLIWaM/NGwJAZcGvDGXdjkjByMHBzXe/AzxjMfEFh4T1ASXPhjXLyK2ubZjn7PI7ALcQ/wByZRxv5yOG3DinhMbUq1OWrN66L1Zz18DGgvbU9VHVp63S/UopczNKcFeDwWUbse/vWlphkaXcwjZvUjmqV/p62Gs3cCicrDM6DoOAxHYYq5pUWX+7P+Y/wrWHtXWcKkm7PqEoQlTUklaSvt3PQfBRllMQyoKkOCOucYH1x+la37TsWz9nO2OxVH9v23TJP/HrceprJ8DRZdPlm6DuPT6VrftOD/jHG2OJB/xUFsPm6f8AHrcV+kqLWQ4n/B+qPimrZvQjFaKX6HzTRRRX4ufpwUUUUAFFFFABRRRQAUUUUAfZn7fyn/hAfEo3NtHiWJsduUlr4zr7N/b/AP8AkQvE3/Yxw/8AoEtfGVfo3ih/yOF/gj+bPhfD1Wytr+/L9Aooor85PugooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACul+DrFPiv4ZbcTjVbZsHpxIBXNV0vwhOPin4a/7Clt/wCjRXVgv94p/wCKP5nLjf8Ad6i/uv8AI1fEUzx+LNTUO2Fu5R/4+ataTI5IO9uapeKGRfGGq5kAP2yXjaePnNWtIkj4/fL0/uGvYuli5+r/ADOCk74en/hX5I9E8DO4ZPnboK0/2nSzfs2W5LMceI7cYP8A163FZXgZ03p+9HQfwGtj9pyMf8MywMCT/wAVHbfra3X+FfpDkv7AxP8Ag/VHxn/M3o/4v0PmSiiivxU/TAooooAKKKKACiiigAooooA+zv8AgoKPK8D+J0wWx4miAcfdICz/AOAr4xr7L/b0kMnw08REng+IrdsdhlJjXxpX6N4of8jlf4I/mz4bw+f/AAmS/wAcv0Ciiivzk+5CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6T4Q/8lT8M/8AYUtv/Rorm66T4Q/8lT8M/wDYUtv/AEaK6sF/vFP/ABR/M5sZ/Aqf4X+RqeKJ9vjDVB5+3F3Lxszj5zVzSJnIGJCRjrgc/pVXxOz/APCX6piZVH2uXjA4+c1a0hdxGZYzkV60v96n6v8AM86h/u0PRfkj0HwNK+5PnPQdh/hWz+09z+zFB3/4qO1/9JbusbwKmWT95H0FbH7TnP7L8JyDjxJajj/r1u6/Rv8AmQYn/B+qPjf+ZvR/xfofMVFFFfjJ+mBRRRQAUUUUAFFFFABRRRQB9lft6/J8NvEIHQ+Ibb/0XNXxrX2V+3uP+LceIf8AsYbb/wBFzV8a1+i+J/8AyOV/gj+bPhvD9NZZJP8Anl+gUUUV+dH3IUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXSfCH/kqfhn/ALClt/6NFc3XSfCH/kqfhn/sKW3/AKNFdWC/3in/AIo/mc2M/gVP8L/I0vFEefGOqn9z/wAfkvUHP3z71d0aFMrzB0HY/wCNVvE+3/hL9U/1P/H3L1Bz98+9WdIVMj5EP06V60/96n6v8zzqH+7Q9F+SO98DlRKozBwB2P8AjW9+02gX9lyHDIf+Kkszgds2l2a57wREhmXmEdOxro/2mIl/4ZXRgACPE1kuR3H2O7Nfo3/MgxP+D9UfHf8AM4or+9+h8v0UUV+Mn6WFFFFABRRRQAUUUUAFFFFAH2Z+32uz4feIlHQeIYf0WUV8Z19nft/rjwL4mHZPEMOPxWWvjGv0bxQX/Cyv8EfzZ8TwErZfP/HL9Aooor85PtgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EP/ACVPwz/2FLb/ANGiubrpPhD/AMlT8M/9hS2/9GiurBf7xT/xR/M5sZ/Aqf4X+RqeJ1U+MNUyik/bJf8A0M1b0gYx24qr4nR/+Ev1TEZI+2S87hz85q3pEcnH7lun98V60v8Aep+r/M86h/u0PRfkjufBKr5qnYpNdP8AtMIB+ycpHH/FU2Ix/wBuV3XNeCY380fuj/32K6f9plWH7JSkxlR/wlNjzuB/5cryv0b/AJkGJ/wfqj45K+cUf8X6HyzRRRX4yfpYUUUUAFFFFABRRRQAUUUUAfZv/BQNtvg/xSvb/hIID/47LXxlX2j/AMFCIQng/wAUEZydfg/9Blr4ur9H8Uf+RxH/AK9x/NnxXAn/ACL5/wCOX6BRRRX5wfahRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdJ8If+Sp+Gf8AsKW3/o0VzddJ8If+Sp+Gf+wpbf8Ao0V1YL/eKf8Aij+ZzYz+BU/wv8jT8URofGGq5QE/bJe5/vmrWkRR8fIvT1P+NVvE7Y8Yar8jn/TJeR/vmrWjvkj93J0r1pf71P1f5nnUP92h6L8kd14JiTzV+Qfmf8a6j9pdFX9ktcKAf+Epse5/58ruuX8EPmVf3cldT+0sd37JAOMf8VTY8f8Abnej+lfo3/MgxP8Ag/VHyEP+RvS9f0Plqiiivxk/SQooooAKKKKACiiigAooooA+0/8AgoadvhLxSvYa/B/6DLXxZX2n/wAFEfl8LeK/bxHCv4bZTXxZX6P4o/8AI4j/ANe4/mz4vgT/AJF8/wDHL9Aooor84PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EP/JU/DP8A2FLb/wBGiubrpPhFx8UvDP8A2FLb/wBGiurA/wC8U/8AFH8znxavQqf4X+RreJ5MeL9U/wBd/wAfcvQjH3z7Vb0iXkf6/p6j/CqHijd/wmOq/wCu/wCPyXoRj759qt6OWJH+v6eo/wAK9af+9T9X+Z51GLWGh6L8kd54JlfzhgTfmP8ACup/aT+b9kTJVwR4p0/k982mof4VzXgYMXT/AF/Qdx/hXVftLIR+x5uLOc+KtPGD2/0TUa/Rb/8ACDiP8H6o+Ph/yN6Xr+h8qUUUV+NH6SFFFFABRRRQAUUUUAFFFFAH2n/wUT/5FfxZ/wBjLF/6BJXxZX2n/wAFE/8AkV/Fn/Yyxf8AoElfFlfo3ig75vF/9O4/mz4vgT/kXz/xy/QKKKK/OT7QKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhF/wAlS8M/9hS2/wDRorm66X4QjPxT8Nf9hS2/9GiurA/7xT/xR/MxxP8AAqP+6/yNLxPPjxfqvzuMXk3/AKGauaRcjI+eTp7VU8TEf8Jfqnyj/j8l/wDQzVzSCOPlXp6V60/96n6v8zz4K2GpryX5I7vwPfFZVG9+grrP2k5RL+xrnnd/wllhnP8A16ajXLeB41LqcDkV1f7SoA/Y0IAAx4tsP/STUa/RH/yIcR/g/VHxsFfN6Xr+h8pUUUV+Nn6QFFFFABRRRQAUUUUAFFFFAH2n/wAFFvl8N+LB2/4SWL/0CSviyvtb/go5EE8N+LCM/wDIzRf+gSV8U1+i+J3/ACNof9e4/nI+L4F/5F8/8cv0Ciiivzo+0CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6X4Qf8AJU/DX/YTtv8A0aK5quk+ERx8U/DP/YUtv/RorqwP+8U/8UfzMcT/ALvVX91/kaviZH/4S/VMRkj7ZLzvHPzmrekRycfuW6f3xVHxPGjeMNVygJ+2S9z/AHzVvSIo+PkXp6n/ABr1p/71P1f5nBF3w1N/3V+SPRfA0b70/dHoP4xXT/tK/wDJmpyMH/hLbDj0/wBE1GuV8DRJuT5B0Hc/411f7S6BP2NOP+htsP8A0k1Gv0R/8iHEf4P1R8dS/wCRvT9f0PlGiiivxs/RgooooAKKKKACiiigAooooA+2P+Cj3/IteLP+xmi/9Akr4nr7a/4KPoB4e8Yj+54mhx+KSV8S1+i+J3/I2h/17j+cj4vgT/kXz/xy/QKKKK/Oj7QKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhF/yVLwz/2FLb/0aK5uuk+EX/JUvDP/AGFLb/0aK68D/vNP/FH8zHEfwKn+F/kafiZseMNV/duf9Ml/9DNW9HfJH7uTpVbxNJjxfqn+u/4/JehGPvn2q5pEvI/1/T1H+FerP/ep+r/M8+n/ALrD0X5I7/wMclOMcCus/aYGf2MmP93xdp4/8k9RNcn4HfMi/u5DwOa6z9pds/sYyfIy/wDFX6dyf+vLUa/RH/yIcR/g/VHx9L/kb0/X9D5Pooor8bP0YKKKKACiiigAooooAKKKKAPtv/gpB/yAPGf/AGM0H/oElfElfbf/AAUg/wCQB4z/AOxmg/8ARclfElfoniY75tD/AK9x/OR8XwJ/yL5/45foFFFFfnZ9oFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV0nwi/5Kl4Z/7Clt/wCjRXN10nwi/wCSpeGf+wpbf+jRXXgf95p/4o/mY4j+BU/wv8jS8T7v+Ex1X/Xf8fk3QjH3z7Vb0csSP9f09R/hVbxMzf8ACX6p87D/AEyUf+PmrmkO+R87dK9Wf+9T9X+Z59P/AHWHovyR6B4FlcMnE3Qdx/hXW/tLuzfsYuCJMf8ACX6d97p/x5ajXJ+BncMnzt0FdZ+0uzH9jBwWJH/CX6d1/wCvLUa/RH/yIcR/g/VHx9L/AJG9P1/Q+TqKKK/Gz9GCiiigAooooAKKKKACiiigD7b/AOCkH/IA8Z/9jNB/6Lkr4kr7Z/4KPtnw54uPd/E0OfwSSviav0LxLVs1h/17j+bPi+BP+RfP/HL9Aooor89PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/JUvDP/YUtv/Rorm66T4Rf8lS8M/8AYUtv/RorrwP+80/8UfzMcR/Aqf4X+RpeJ3QeMNV/egH7ZLxsPHzmrekSR8fvl6f3DVfxNI//AAl+qfOQPtko6D++at6RLJx87dPQf4V6s/8Aep+r/M8+n/usPRfkjv8AwM6b0/ejoP4DXW/tLHP7GD85/wCKv07n/ty1GuU8DSvuT5z0HYf4V1n7S/P7GMnf/ir9O/8ASLUa/RH/AMiHEf4P1R8fS/5G9P1/Q+TqKKK/Gz9GCiiigAooooAKKKKACiiigD7Y/wCCj3/IteLP+xmi/wDQJK+J6+1f+Cjcpfw54sBx/wAjLF/6BJXxVX6L4nq2bwX/AE7j+cj4vgX/AJF8/wDHL9Aooor86PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/JUvDP8A2FLb/wBGiubrpPhF/wAlS8M/9hS2/wDRorrwP+80/wDFH8zHEfwKn+F/kaniZP8AisNU/eIP9MlP/j5q5o6ZI/eR9Kp+J41PjDVcmLP2uXrnP3zVvR4UyOYenof8a9Wf+9T9X+Z59P8A3WHovyR6F4FTLJ+8j6Cur/aYOP2MyODu8W6eSf8At01EVx/gcqJVGYOAOx/xrrf2lG3fsZduPFmn9On/AB6ajX6I/wDkQ4j/AAfqj4+l/wAjen6/ofKVFFFfjZ+jBRRRQAUUUUAFFFFABRRRQB9m/t/Ot38P/EsxBMjeJIXLdmysx/rXxlX2V+3l8vwz8Qg9f+Ehtv8A0XNXxrX6L4of8jlf4I/mz4bw+/5Fkv8AHL9Aooor86PuQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACul+EP/JU/DX/AGFLb/0aK5quk+EP/JU/DP8A2FLb/wBGiurBf7xT/wAUfzObGfwKn+F/kafie3J8YaqfLzm8l54/vmrmkWrcfuu3t/jVTxRBu8YaofI3Zu5ed+M/OataTGgIzCAcf3zXryf+1T9X+Z51Ft4aHovyR6B4Hscuv7nnA7j/ABrd/aanmi/ZZitwwEDeJbRymB1FreY59tzfnWH4GRN6fuh0H8Zra/adGP2YYOMf8VHa8f8Abrd1+i3/AOEDE/4P1R8ddrN6Nv5v0PmKiiivxk/SwooooAKKKKACiiigAooooA+yv29/+Sc+IP8AsYbb/wBFzV8a19l/t8KV+HXiEHqPENv+iSg/rXxpX6L4n/8AI5X+CP5s+I4AVstkv78v0Ciiivzo+3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6T4Q/8lT8M/wDYUtv/AEaK5uuk+EP/ACVPwz/2FLb/ANGiurBf7xT/AMUfzObGfwKn+F/kafiiIHxhqv7gt/pcvO7r85q5o6NwBGwGOnpVLxRu/wCEx1XHnf8AH3L0Ax98+9XdGic7eZ+g7D/GvWl/vU/V/medQ/3aHovyR6F4GRyyfI3QVsftO8/swQHpjxJaj/yVu6w/AxYSKP3/AAB2H+Nbv7TSMv7LkOQwH/CSWhye+bW7r9G/5kGJ/wAH6o+N/wCZvR/xfofMNFFFfjJ+mBRRRQAUUUUAFFFFABRRRQB9m/t/AjwH4kHdfEMWfbiWvjKvs7/goCceC/FK9/8AhIYD/wCOy18Y1+jeKC/4WI/4I/mz4rgNWy+a/vy/QKKKK/OT7UKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhD/yVPwz/wBhS2/9GiubrpPhD/yVPwz/ANhS2/8ARorqwX+8U/8AFH8zmxn8Cp/hf5Gt4njz4v1T/Xf8fcvQDH3z71Z0hMMP3kg/Cqnidc+MNV+dx/pkvA/3zVvRxgLznivWl/vU/V/medQ/3aHovyR3XgiJvNXBmPTsK6L9pmI/8MtRtuYgeJbJcH1+x3ZrnfBK/vgfMcV037TEZH7KCnOR/wAJRYj3/wCPK7r9G/5kGJ/wfqj47/mcUV/e/Q+XKKKK/GT9LCiiigAooooAKKKKACiiigD7O/4KDRMvhHxSSODr8H/oMtfGNfaf/BQw48HeKB3Gvwf+gy18WV+j+KP/ACOI/wDXuP5s+K4E/wCRfP8Axy/QKKKK/OD7UKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhD/yVPwz/ANhS2/8ARorm66T4Q/8AJU/DP/YUtv8A0aK6sF/vFP8AxR/M5sZ/Aqf4X+Rp+KJEHjDVcuAftkvY/wB81a0iWPj516eh/wAKr+J3f/hL9UxIQPtkvG0cfOat6RJJx++bp/cFetL/AHqfq/zPOof7tD0X5I7jwTKnmr84/I/4V1H7S7q37Ja4YE/8JTY9j/z5Xdc14JkfzR+9P/fArp/2mWY/slKDIWH/AAlNjxtA/wCXK8r9G/5kGJ/wfqj5CKvnFL1/Q+WaKKK/GT9JCiiigAooooAKKKKACiiigD7T/wCCiHHhXxVnt4hgX8dstfFlfaf/AAUT/wCRX8Wf9jLF/wCgSV8WV+j+KP8AyOI/9e4/mz4vgT/kXz/xy/QKKKK/OD7QKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhD/wAlT8M/9hS2/wDRorm66T4Q/wDJU/DP/YUtv/RorqwX+8U/8UfzObGfwKn+F/kanidlHjDVMuoP2yX/ANDNWtIdOPnTpVfxPt/4S/VP9T/x9y9Sc/fPtVvRyuR/qOnqf8K9aX+9T9X+Z51D/doei/JHb+CXTzV+da6n9pc7v2SQR0/4Smx/9Ir0f0rl/BMqCYcQ/mf8K6j9pPDfsi5DKceKbDge9pf/AOFfo3/MgxP+D9UfIQ/5G9L1/Q+WqKKK/GT9JCiiigAooooAKKKKACiiigD7T/4KJ/8AIr+LP+xli/8AQJK+LK+0/wDgop8vhnxYD1/4SWL/ANAkr4sr9F8T3fN4P/p3H82fF8C/8i+f+OX6BRRRX50faBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdJ8IuPin4Z/7Clt/wCjRXN10nwi/wCSpeGf+wpbf+jRXVgf94p/4o/mYYlXoVP8L/I0vFEmPGOq/wCp/wCPyXqTn759qt6RL0/1HT1P+FV/ExH/AAl+qfLEf9Lm6n/bNXNHYAj5YenrXrT/AN6n6v8AM8+lFLDQ9F+SO78DAGRT+45A7n/Cup/aVQ/8Mf7tqAf8JVp4yv8A16ajXM+Bp1WRRsi4A711X7SxD/sbbgR/yNmn8Dt/omo1+iN/8IOI/wAH6o+Nh/yN6Xr+h8pUUUV+Nn6SFFFFABRRRQAUUUUAFFFFAH2p/wAFGoyvhzxWSP8AmZYv/QJK+K6+2P8Ago9/yLXiz/sZov8A0CSviev0XxO/5G0P+vcfzkfF8C/8i+f+OX6BRRRX50faBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdJ8Ihn4p+Gf+wpbf+jRXN10vwg/5Kn4a/wCwnbf+jRXVgf8AeKf+KP5mOJ/3eq/7r/I0vE0SHxhqvXJvJv8A0M1b0iGPj73SqfieRF8YarlwD9sl7H++at6RLHx869PQ/wCFetP/AHqfq/zOCKthqa/ur8kd94ItFMinJ5FdZ+0lEsf7GhxnP/CW2AP/AICajXL+BpU3J846Dsf8K6r9pQ5/Y1JHT/hLbD/0k1Gv0R/8iHEf4P1R8bTV83pev6HylRRRX42fo4UUUUAFFFFABRRRQAUUUUAfbP8AwUfU/wDCOeLh3TxNDn2+SSviavtv/gpB/wAgDxn/ANjNB/6BJXxJX6L4nf8AI2h/17j+cj4vgT/kXz/xy/QKKKK/Oj7QKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpfhCcfFPw1/2FLb/ANGiuarpPhF/yVLwz/2FLb/0aK6sD/vFP/FH8zHE/wACov7r/I1fEzv/AMJfqmJCB9sl42Dj5zVvSJJOP3zdP7gql4mZR4w1XLqP9Ml/9DNW9IdOPnTpXrT/AN6n6v8AM8+Dvhqb8l+SPRPA0j70/enoP4BXUftLqV/Y1OTnPi2w5/7dNRrlfAxyyY54FdZ+0wM/sZk/3fFunj/yU1E1+iP/AJEOI/wfqj4+l/yN6fr+h8n0UUV+Nn6MFFFFABRRRQAUUUUAFFFFAH23/wAFIP8AkAeM/wDsZoP/AECSviSvtv8A4KQf8gDxn/2M0H/ouSviSv0PxLd81h/17j+bPi+BP+RfP/HL9Aooor88PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/ACVLwz/2FLb/ANGiubrpPhF/yVLwz/2FLb/0aK68D/vNP/FH8zHEfwKn+F/ka3iYr/wl+qf6n/j7l6k5++farejlcj/UdPU/4VQ8TyY8YaqP3P8Ax+TdSc/fPtVvSJen+o6ep/wr1Z/71P1f5nn0/wDdYei/JHofgdl3qN6DgdOldZ+0uyn9jKTDAn/hL9O6f9eWo1yfgWVN6cQ5wO5rrf2l5Fb9jFwBHn/hL9O+71/48tRr9Ef/ACIcR/g/VHx9L/kb0/X9D5Oooor8bP0YKKKKACiiigAooooAKKKKAPtr/gpAwPh/xiezeJoMe/7uSviWvtX/AIKKymfwv4qJwM+IoX49Ssor4qr9E8TY8ubQX/TuP5s+L4E/5F8/8cv0Ciiivzs+0CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6T4Rf8AJUvDP/YUtv8A0aK5uuk+EXPxT8M/9hS2/wDRorqwP+8U/wDFH8zDEu1Cp/hf5Gp4mf8A4rDVP3aH/TJR/wCPmrmjvgj93H0ql4nU/wDCYarhk/4/Jep/2zVvSFPHzJ09a9af+9T9X+Z59KSeGh6L8keh+BXwyfu4+grrP2l2z+xg/wAir/xV+ncj/ry1GuO8DmTzFAMWOK6r9pWWQfseMjeWVbxXpz8dc/ZNRFfojX/CDiP8H6o+Ppu2b0vX9D5Vooor8bP0cKKKKACiiigAooooAKKKKAPtP/gonx4X8Wf9jLCPw2S18WV9p/8ABRP/AJFfxZ/2MsX/AKBJXxZX6P4o/wDI4j/17j+bPi+BP+RfP/HL9Aooor84PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/ACVLwz/2FLb/ANGiubrpPhF/yVLwz/2FLb/0aK6sD/vFP/FH8zHE/wACp/hf5Gn4nty3jDVTiHm7l6gZ++at6PbNkcQdP7oqn4nJ/wCEw1X92p/0ybt/tmrekM3H7pen92vWn/vU/V/mefT/AN1h6L8keheBbZt6cQdB/CK6j9peJU/Y7ztUN/wlengkD/p01GuQ8ESMJV+QdPSuv/aRdm/Yz5UDHizT+cf9Omo1+iP/AJEOI/wfqj4yH/I3pev6HypRRRX42fpIUUUUAFFFFABRRRQAUUUUAfaf/BRP/kV/Fn/Yyxf+gSV8WV9p/wDBRjjw54rHb/hJYv8A0CSviyv0XxO/5G0P+vcfzkfF8C/8i+f+OX6BRRRX50faBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdL8IP+Sp+Gv+wnbf+jRXNV0vwg/5Kn4a/wCwnbf+jRXVgv8AeKf+KP5mOK/3ar/hZp+JWP8Awl+qcn/j8l/9DNXNIc8cnp61S8TyKPGGq/vgP9Ml48vOPnNWtIlXj9+vT/nlXrT/AN6n6v8AM4F/u9P/AAr8keh+B/vJ9BXU/tKkn9jU/wDY22H/AKSajXK+BpV3p+/HQf8ALKuq/aUOf2NDzn/irbDnGM/6JqNfoj/5EOI/wfqj46l/yN6fr+h8pUUUV+Nn6MFFFFABRRRQAUUUUAFFFFAH2x/wUeUDw34swB/yM0X/AKBJXxPX2x/wUe/5FrxZ/wBjNF/6BJXxPX6L4nf8jaH/AF7j+cj4vgX/AJF8/wDHL9Aooor86PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/JUvDP8A2FLb/wBGiubrpPhF/wAlS8M/9hS2/wDRorqwP+8U/wDFH8zHEfwKn+F/kaviV2/4S/VOT/x+S9/9s1b0iRuPmbp61U8TJJ/wl+qYMePtcvUf7Zq3o6S5HzRdPQV60/8Aep+r/M8+n/usPRfkj0HwNI25PmPQd66r9pkf8YafXxbYf+kmo1yngbIZM4zgdK6z9pf/AJMyf28X6d/6R6jX6I/+RDiP8H6o+Ppf8jen6/ofJ9FFFfjZ+jBRRRQAUUUUAFFFFABRRRQB9t/8FHwP+Ef8ZD08TQY9vkkr4kr7b/4KQf8AIA8Z/wDYzQf+gSV8SV+i+J3/ACNof9e4/nI+L4E/5F8/8cv0Ciiivzo+0CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6T4Rf8AJUvDP/YUtv8A0aK5uuk+EX/JUvDP/YUtv/RorrwP+80/8UfzMcR/Aqf4X+RqeJif+Ev1TiH/AI/JeqjP3zVzSCcjiD/vkVS8T25bxhqpxDzdy9QM/fNW9HtmyOIOn90V6s/96n6v8zz6f+6w9F+SPQ/AqSF0wYsYHYV1n7TCOP2MXLFCP+Ev07p/15ajXJeBYH3p/qeg7Cut/aXjZP2MXJ8vH/CX6d90c/8AHlqNfoj/AORDiP8AB+qPj6X/ACN6fr+h8nUUUV+Nn6MFFFFABRRRQAUUUUAFFFFAH23/AMFIP+QB4z/7GaD/ANFyV8SV9t/8FIP+QB4z/wCxmg/9FyV8SV+heJX/ACNYf9e4/mz4vgT/AJF8/wDHL9Aooor89PtAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/JUvDP8A2FLb/wBGiubrpPhF/wAlS8M/9hS2/wDRorrwP+80/wDFH8zHEfwKn+F/kaXiZAfGGq8D/j8l7f7Zq5pCLxwOnpVbxPGx8X6p+5J/0yXnzMZ+c1b0iJuP3DdP+eterP8A3qfq/wAzz6f+6w9F+SO/8DIu5OB0Haut/aWUD9jGTAA/4q/Tv/SLUa5XwNE29P3B6D/lrXVftL8fsYycY/4q/TuM5x/oWo1+iP8A5EOI/wAH6o+Ppf8AI3p+v6HyfRRRX42fowUUUUAFFFFABRRRQAUUUUAfbP8AwUfP/FN+LT3PiaLPv8klfE1fbH/BR7/kWvFn/YzRf+gSV8T1+ieJv/I2h/17j+cj4vgT/kXz/wAcv0Ciiivzs+0CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK6T4Rf8lS8M/8AYUtv/Rorm66T4Rf8lS8M/wDYUtv/AEaK68D/ALzT/wAUfzMcR/Aqf4X+RpeJkU+MNV4H/H5L2/2zVvSI14+VenpVXxO8Y8YarkSZ+2TdD/tmrejvHkfLL09TXqz/AN6n6v8AM8+n/usPRfkj0HwNGu5PlHQdq639pcY/Yxk/7G/Tv/SLUa5LwK8e9Pll6DvXWftMH/jDMYzg+LNPPP8A16ajX6I/+RDiP8H6o+Ppf8jen6/ofKFFFFfjZ+jBRRRQAUUUUAFFFFABRRRQB9pf8FF5hJ4c8V4JI/4SaIf+OS/4Gvi2vsz9veUzfDXxETjB8RwMPUZSY9a+M6/RvFD/AJHC/wAEfzZ8RwBPmy2T/vy/QKKKK/OT7cKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhF/yVLwz/wBhS2/9GiubrpfhCcfFPw1/2FLb/wBGiurA/wC8U/8AFH8zDFStQqf4X+Rp+J5VHjDVR+94u5ehOPvmrejzpkf67p6mqfihkXxhquZAD9sl42nj5zVrSJI+P3y9P7hr15W+tT9X+Z51KV8ND0X5I73wPcr5q8z9v4jXXftJtu/Yyzkn/irNP69f+PTUa5bwM6b0/ejoP4DWx+05GP8AhmWBgSf+Kjtv1tbr/Cv0Vpf2DiP8H6o+OjPlzel5y/Q+ZKKKK/GT9JCiiigAooooAKKKKACiiigD7K/b0Oz4a+IV658Q23/ouavjWvsr9vf/AJJz4h/7GG2/9FzV8a1+i+J//I5X+CP5s+G8PlbLJJ/zy/QKKKK/Oj7kKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhD/wAlT8M/9hS2/wDRorm66T4Q/wDJU/DP/YUtv/RorqwX+8U/8UfzObGfwKn+F/kaniifb4w1Qeftxdy8bM4+c1c0iZyBiQkY64HP6VV8Ts//AAl+qYmVR9rl4wOPnNWtIXcRmWM5FetL/ep+r/M86h/u0PRfkj0HwNK+5PnPQdh/hWz+09z+zFB3/wCKjtf/AElu6xvAqZZP3kfQVsftOc/svwnIOPElqOP+vW7r9G/5kGJ/wfqj43/mb0f8X6HzFRRRX4yfpgUUUUAFFFFABRRRQAUUUUAfZf7fS7Ph74iXrjxDB+iSivjSvs39v9ceBPEy/wBzxDF+ORLXxlX6N4oL/hYX+CP5s+J4C/5F0/8AHL9Aooor85PtgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EP/JU/DP/AGFLb/0aK5uuk+EP/JU/DP8A2FLb/wBGiurBf7xT/wAUfzObGfwKn+F/kaXiiPPjHVT+5/4/JeoOfvn3q7o0KZXmDoOx/wAareJ9v/CX6p/qf+PuXqDn7596s6QqZHyIfp0r1p/71P1f5nnUP92h6L8kd74HKiVRmDgDsf8AGt79ptAv7LkOGQ/8VJZnA7ZtLs1z3giJDMvMI6djXR/tMRL/AMMrowABHiayXI7j7Hdmv0b/AJkGJ/wfqj47/mcUV/e/Q+X6KKK/GT9LCiiigAooooAKKKKACiiigD7N/wCCgTbfBvilP+pggOf+Ay18ZV9of8FB4dnhDxS2c51+Dt/sy18X1+j+KP8AyOI/9e4/mz4rgT/kXz/xy/QKKKK/OD7UKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpPhD/wAlT8M/9hS2/wDRorm66T4Q/wDJU/DP/YUtv/RorqwX+8U/8UfzObGfwKn+F/kanidVPjDVMopP2yX/ANDNW9IGMduKq+J0f/hL9UxGSPtkvO4c/Oat6RHJx+5bp/fFetL/AHqfq/zPOof7tD0X5I7nwSq+ap2KTXT/ALTCAfsnKRx/xVNiMf8Abld1zXgmN/NH7o/99iun/aZVh+yUpMZUf8JTY87gf+XK8r9G/wCZBif8H6o+OSvnFH/F+h8s0UUV+Mn6WFFFFABRRRQAUUUUAFFFFAH2n/wUNO3wj4pX01+D/wBBlr4sr7R/4KAuNS8H+KJID5iPr8LKemVCTNnn2B4r4ur9I8UU/wC14v8A6dx/NnxXAbTy+dv55foFFFFfm59qFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV0nwh/wCSp+Gf+wpbf+jRXN10nwi/5Kn4Z/7Clt/6NFdWC/3in/ij+ZzYtfuKn+F/kafiiND4w1XKAn7ZL3P981a0iKPj5F6ep/xqv4mVv+Ew1T925/0uU5H++ataQ+CMxydPUV60v96n6v8AM86gn9WhfsvyR3PgmJPNX5B+Z/xrqP2l0Vf2S1woB/4Smx7n/nyu65nwQrGVf3Un5iuo/aXQ/wDDI+SMY8U2GR6Zs77/AOJr9G/5kGJ/wfqj5CLSzelf+b9D5Zooor8ZP0kKKKKACiiigAooooAKKKKAPsz9s1vO+GuuMeraqhOPaC4r4zr7L/bH/wCSZ61/2FE/9EXFfGlfpfij/wAjOH+FHwXh675fP/Gwooor80PvQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/JUvDP/AGFLb/0aK5uuk+EX/JUvDP8A2FLb/wBGiuvA/wC80/8AFH8zHEfwKn+F/ka/iW4ceLtUAYgC8lH/AI+an0oMzA+Y/PPWqfid0HjDVf3oB+2S8bDx85q3pEkfH75en9w16s/96n6v8zz6f+6w9F+SPQ/ArOGT526Cuk/aZct+yO2e/irT/wBLO/Fc14GdN6fvR0H8Bro/2l2z+ySMHIPimxP1/wBEv6/Rl/yIcT/g/VHw9R/8K1H/ABo+WaKKK/GT9OCiiigAooooAKKKKACiiigD7L/bH/5Jnrf/AGFE/wDRFxXxpX2X+2P/AMkz1v8A7Cif+iLivjSv0vxR/wCRnD/Cj4Hw7/5F0/8AGwooor80PvgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACuk+EX/ACVLwz/2FLb/ANGiubrpPhF/yVLwz/2FLb/0aK6sD/vFP/FH8zLEfwKn+F/kanidrj/hMNU2oxX7ZLg7l/vn2q7o/nkL8+OOmBxVTxMn/FX6p/o4b/S5ed+M/OasaSpyOWX2z09q9WpK2Knfu/zPPpRbw0PRfkjv/BF1KsijfyOOgrpf2lvm/ZHDHr/wlFgfztdR/wAK5rwPCC68npXTftLDH7I+PTxRp/8A6TajX6LGSeQ4n/B+qPhq0Ws3of40fLFFFFfjZ+nBRRRQAUUUUAFFFFABRRRQB9lftjuG+GGslec6on/oi4r41r7IujZftSfB65+w30Fnc6g6T7WbcttciN1aB+AeshwxwPunpXyd448Bav8ADbxJdaTrdhc6dqFnIYpYZkKsrDHGD7EH6Eetfp/iVSdevRzCj71KcVaS2+fb5n59wHUjRpVcDVdqsZO8ev8AwTIooor8wP0EKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArpfg4PM+LHhlf+opbf+jVrmq9U/Z6+Euoy6pp3jPUIZrTw1pd15qT7Tu1CaPLCGEY+Yhgu89EUlj2B9HKaFSrjKcKav7yfyT3OHM68KWGnKbtdNLzbWyMzxVpCjxZqbbMk3cp7/3zTtJUowXaRjiun1LQn1PUbi5KMhuJGkK9cbiTj9am03wwVnUbDz7V9RPKK88TJxj1f5nh08xhDDxjJ2aS/I0vBcojKcHOBXQftKzuf2UWjaMoP+En09gSc5H2O+b/ANmP6VrfC74X33i7XLDT9NsLm8vL2YQRxR4LOSccDHAHrXsH/BU79kmP9kj9hvwfaazcSSeMPE3imG8mhVgYrW3isrkbOmd26VR1x8vSvssZS+q5JXhV0co2X3o+L+v0p53h6Sl7zlt8j856KKK/FD9eCiiigAooooAKKKKACiiigDtfgn8Y774T+IgySs2mXTAXcBG5WHrj19cdR+GPqn4mftMfAb9qHwppUfxPuPFD69o0SW9rq+hj7PeTQLwIrrzbeRJdgJCsoDc/MzYGPiGivosBxNicNhXgpRjUpvpNN29LNHzuP4ZwuKxUcapSp1F1g0r+t07n0F458K/s2M9l/wAI34j+JEa7WN0NR8qQ7v4Qmy1XA9c5rnz4V+CmOPEnivP+4P8A5Hrx2iiOf01/zB0f/AZ//Jlf2FU/6C6v3x/+QPX/APhFvgt/0Mfiv/vgf/I9H/CLfBb/AKGPxX/3wP8A5HryCitP9YqX/QFR/wDAZ/8Aywf9hVP+gur98f8A5A9f/wCEW+C3/Qx+K/8Avgf/ACPR/wAIt8Fv+hj8V/8AfA/+R68goqf9YaX/AEB0fun/APJh/YVT/oLq/fH/AOQPX/8AhFvgt/0Mfiv/AL4H/wAj0f8ACLfBb/oY/Ff/AHwP/kevIKKP9YaX/QHR+6f/AMmH9hVP+gur98f/AJA9f/4Rb4Lf9DH4r/74H/yPR/wi3wW/6GPxX/3wP/kevIKKP9YaX/QHR+6f/wAmP+w6n/QVV++P/wAgev8A/CLfBb/oY/Ff/fA/+R6P+EW+C3/Qx+K/++B/8j15BRR/rDS/6A6P3T/+TF/YVT/oLq/fH/5A9gHhb4LZ58R+K8f7g/8Akenf8Ir8E/8AoZfFn/fsf/I9eO0Uf6w0v+gOj90//kw/sKp/0F1fvj/8gexf8Ir8E/8AoZfFn/fsf/I9H/CK/BP/AKGXxZ/37H/yPXjtFH+sNL/oDo/dP/5MP7Cqf9BdX74//IHsX/CK/BP/AKGXxZ/37H/yPR/wivwT/wChl8Wf9+x/8j147RR/rDS/6A6P3T/+TD+wqn/QXV++P/yB7F/wivwT/wChl8Wf9+x/8j0f8Ir8E/8AoZfFn/fsf/I9eO0Uf6w0v+gOj90//kw/sKp/0F1fvj/8gexf8Ir8E/8AoZfFn/fsf/I9H/CK/BP/AKGXxZ/37H/yPXjtFH+sNL/oDo/dP/5MP7Cqf9BdX74//IHsR8K/BTHHiTxXn/cH/wAj0z/hFvgt/wBDH4r/AO+B/wDI9eQUUf6w0v8AoDo/dP8A+TD+wqn/AEF1fvj/APIHr/8Awi3wW/6GPxX/AN8D/wCR6P8AhFvgt/0Mfiv/AL4H/wAj15BRVf6xUv8AoCo/+Az/APlgf2FU/wCgur98f/kD1/8A4Rb4Lf8AQx+K/wDvgf8AyPR/wi3wW/6GPxX/AN8D/wCR68gopLiGkv8AmCo/+Az/APkw/sKp/wBBdX74/wDyB6//AMIt8Fv+hj8V/wDfA/8Akej/AIRb4Lf9DH4r/wC+B/8AI9eQUUnxDS/6AqP/AIDP/wCTD+wqn/QXV++P/wAgev8A/CLfBb/oY/Ff/fA/+R6P+EW+C3/Qx+K/++B/8j15BRR/rDS/6A6P3T/+TD+wqn/QXV++P/yB6/8A8It8Fv8AoY/Ff/fA/wDkej/hFvgt/wBDH4r/AO+B/wDI9eQUUf6w0v8AoDo/dP8A+TD+wqn/AEF1fvj/APIHsX/CK/BMHnxL4sxt7RA8/wDfin6X4V+B51G2+2+JvGS2m8ef5ECtJt/2cwgA/nXjVFS8/pf9AdH7p/8AyYPI6j/5iqv3x/8AkD6kTwd+x/FKHbxb8aZky37lba0jJGOP3nktjn/YNbHxl/a78HfF7ULKJLu20Tw5odsLHQ9FtbS4WDSbcdFB2EvI2AZHYkuc/wAOFHyHRW2D4olhZupQw9KLflP/AOTMJ8M06koyr16k+XbmcdP/ACVH0M/xU8Ds5I1oAE8AWs+B/wCQ6ltfi34JjmQ/24q8gZNpOQOepxHnAH1r50ort/15xfNzKlTT9Jf/ACZMuFMO017SevnH/wCRP2H/AGG/20v2Q/2WPDq6vqvxHi1jxlLGWMq+GtVK2fH+rjzagFu27OO/FfJP/BXb/gpzYft6+ItK0nw9pz2vhfw5cyTWtxOrLPcsQU3MD0BHOMAjNfF1FeZmfE+Mx0XCrZJ9r/q2cmV8C5fgsYsepSnUWzk07elooKKKK+dPswooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9k=";
var FOOD_IMAGE = 'http://i.imgur.com/NCa7F.gif';
var OIL_IMAGE = 'http://i.imgur.com/hAa2O.gif';
var STONE_IMAGE = 'http://i.imgur.com/HBcYW.gif';
var STEEL_IMAGE = 'http://i.imgur.com/wkoeb.gif';
var GRAPH_IMAGE = 'http://i.imgur.com/NGWbv.gif';
var TITA_IMAGE = 'http://i.imgur.com/lDIaU.gif';
var GOLD_IMAGE ='http://i.imgur.com/Jw6Hg.gif';
var URL_CASTLE_BUT = "data:image/png;base64,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";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,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";

var Options = {
	ptWinIsOpen	:	true,
	ptWinDrag	:	true,
	ptWinPos	:	{},
	ptTrackOpen	:	true,
	ptsoundoff : true,

	infWinIsOpen : true,
	infWinDrag   : true,
	infWinPos    : {},
	infTrackOpen :	true,

	ptWinWidth : 650,
	overviewFontSize :	10,

	pbgoldenable	:	true,
	pblastgoldcollect : [0,0,0,0,0,0,0,0],
	pbGoldLimit	:	100,
	pboilenable : true,
	pblastoilcollect : 0,
	pbfoodenable : true,
	pblastfoodcollect : 0,	
	pbnukeenable : true,	
	pblastnukecollect : 0,		
	pblauncherenable : true,	
	pblastlaunchercollect : 0,
	pbradarenable : true,
	pblastradarcollect : 0,
	pbmissileenable : true,
	pblastmissilecollect : 0,

	pbcity8enable : true,
	pblastcity8collect : 0,
	pbcity9enable : true,
	pblastcity9collect : 0,

	pbdailyenable : true,
	pblastdailycollect : 0,
	pbgiftenable : true,
	pblastgiftcollect : 0,

	pbahelpenable : true,
	pbahelphide : true,
	pbrmmotdEnable : true,
	pbiconsEnable : true,
	pbitemuse : true,
	pbtrcrateuse : true,
	pblucrateuse : true,

	pbcratesuse : true,
	pbfarmcityall : {}, 
	pbfarmtype : "w", // w -> Wave of Attacks, f -> Farm for artifacts
	pbfarmEW : "a", // Radio for one City/Wave of attacks. a -> Auto, m - > Manual
	pbfarmEW_atype : "t1", // t1...t10, w1...w5
	pbfarmAW_ats : {}, 	
	pbfarmEF : "a", // Radio for One city/Farm. a -> Auto, m - > Manual
	pbfarmEF_atype : "t1", // t1...t10
	pbfarmAF_ats : {}, 	
	pbfarmklist : "", //List of coordinates to farm
	pbfarmx : 0,
	pbfarmy : 0,
	pbfarminterval : 2,
	pbfarmenergysave : 0,
	pbfarmhidemodal : true,
	pbfarmdeletereport : true,
	pbfarmhidewait : true,
	pbfarmu1 : 0,
	pbfarmu2 : 0,
	pbfarmu3 : 0,
	pbfarmu4 : 0,
	pbfarmu5 : 0,
	pbfarmu6 : 0,
	pbfarmu7 : 0,
	pbfarmu8 : 0,
	pbfarmu9 : 0,
	pbfarmu10 : 0,
	pbfarmu11 : 0,
	pbfarmu12 : 0,
	pbfarmu13 : 0,
	pbfarmu14 : 0,
	pbfarmu15 : 0,
	pbfarmu16 : 0,
	pbfarmu17 : 0,
	pbfarmu18 : 0,	
	pbfarmu19 : 0,		
	pbfarmu20 : 0,
	pbfarmu21 : 0,
	pbfarmu22 : 0,
	pbfarmu23 : 0,
	pbfarmu24 : 0,
	terrorcoords : {},
	pbfarmprot : 100,
	pbfarmprow : 20,
	pbfarmblockmax : 100,

	pbartactive : false,
	pbartonly : 0,
	pbarthidemodal : true,
	pbartcity : true,
	pbartcoordlistpointer : 0,

	attackConfig : {
	attackboost : false,
	healthboost : false,
	},

	pbsctcity : "",
	pbscttype : "w", // w -> Wave Attack, f -> Farm for raw materials
	pbsctklist : "", // List of Coordinates to Farm
	pbsctx : 0,
	pbscty : 0,
	pbsctinterval : 6,

	pbsctcoordlistpointer : 0,

	pbsearchtype : 'u', // u -> search radius, s -> search sector, g -> Complete Map
	pbsearchx : 0,
	pbsearchy : 0,
	pbsearchradius : 20,
	pbsearchsector : 's1',
	pbsearchblockmax : 100,
	pbsearchterrormin : '7',
	pbsearchterrormax : '10',
	pbsearchterrorclick : true,
	pbsearchwildmin : '7',
	pbsearchwildmax : '10',
	pbsearchwildgrass : true,
	pbsearchwildriver : true,	
	pbsearchwildoil : false,	
	pbsearchwildstone : false,
	pbsearchwildsteel : false,
	pbsearchwildplain : false,
	pbsearchwildwaste : false,
	pbsearchwildsr : false,
	pbsearchwildfree : true,
	pbsearchwildoccupied : true,
	pbsearchwildnoalli : false,	
	pbsearchwildplayer : '',
	pbsearchwildalliance : '',
	pbsearchwildhostile : true,	
	pbsearchwildfriendly : true,	
	pbsearchwildneutral : true,
	pbsearchwildfryou : true,
	pbsearchwildfrthem : true,
	pbsearchwildselfalli : true,
	pbsearchwilddiplnoa : true,	
	pbsearchwildclick : true,	
	pbsearchcityplayer : '',
	pbsearchcityalliance : '',	
	pbsearchcityminmight : '',
	pbsearchcitymaxmight : '',
	pbsearchcityhostile : true,	
	pbsearchcityfriendly : true,	
	pbsearchcityneutral : true,
	pbsearchcityfryou : true,
	pbsearchcityfrthem : true,
	pbsearchcityselfalli : true,
	pbsearchcitydiplnoa : true,
	pbsearchcitynormal: true,
	pbsearchcitybeginner: true,
	pbsearchcitypeace: true,	
	pbsearchcityclick : true,
	Opacity : 0.9,
	pbtrain : {},

	alertSound : {
		enabled: true, 
		soundUrl: DEFAULT_ALERT_SOUND_URL, 
		repeat: true, 
		playLength: 20, 
		repeatDelay: 0.5, 
		volume: 50, 
		alarmActive: false, 
		expireTime: 0,
	},
	alertConfig : {
		aChat: true, 
		aPrefix:'I am being Attacked!', 
		scouting: true, 
		wilds: true, 
		defend: true, 
		minTroops: 1, 
		lastAttack: 0, 
		hireGeneral: true,
		useBoostAttack: false,
		useBoostHealth: false,
	},
	encRemaining: true,	

	pbFoodAlert: true,

	pbChatOnRight: true,

	pbEveryEnable: false, //auto reload
    pbEveryMins : 45,

	transportinterval: 15,
	minwagons: 50,
	lasttransport: 0,
	deletetransports: true,
};
//saveOptions();

var Logs = {
	globallog : [],
	farmlog : [],
	artlog : [],
	searchlog : [],
	buildlog : [],
	trainlog : [],
	translog : [],
	sctlog : [],
}

//saveLogs();
var r = GM_getValue('pbReloadNow');
if (r == null) {
	GM_setValue('pbReloadNow','0');
}

if (document.URL.search(/apps.facebook.com\/globalwarfaregame/i) >= 0){
	facebookInstance ();
	//return;
}
if (document.URL.search(/globalwarfaregame.com\/fb.php/i) >= 0){
	GWwideScreen ();
	//return;
}

function GWwideScreen(){
	//Check to see if there was an active reload
	var r = GM_getValue('pbReloadNow');
	if (r != '0') {
		var div = document.getElementsByTagName('div');	
		if (div) {	
			for(var i = 0; i < div.length; i++) {
				var a = div[i].className;
				if (a == 'kb-gw-gift-items') {
					GM_setValue('pbReloadHit', 'OK');
					reloadGW(r);
				}
			}		
		}
	}
	var frames = document.getElementsByTagName('IFRAME');
	if (frames) {
		for(var i = 0; i < frames.length; i++) {
			var frame = frames[i];
			frame.style.width = '100%';
		}
	}
	var style = document.createElement('style');
	style.innerHTML = 'body {margin:0; width:100%;}';
	var head = document.getElementsByTagName('head');
	head[0].appendChild(style);
}
/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
	function setWide (){
		var iFrame = document.getElementById('iframe_canvas');
		if (!iFrame){
			setTimeout (setWide, 500);
			return;
		}
		iFrame.style.width = '100%';

		while ( (iFrame=iFrame.parentNode) != null) {
			if (iFrame.tagName=='DIV') {
				iFrame.style.width = '100%';
				iFrame.style.border = '0';
				iFrame.style.padding = '0';
				iFrame.style.margin = '0';
			}
		}

		var gC = document.getElementById('globalContainer');
		gC.style.left = '0px';

		try{    
			document.getElementById('rightCol').style.display = 'none';
			document.getElementById('leftColContainer').style.display = 'none';
			document.getElementById('pagelet_canvas_footer_content').style.display = 'none';
			document.getElementById('globalContainer').parentNode.style.overflowX = "hidden";
    } catch (e){}

		var e = document.getElementById('mainContainer');
		if(e) {
			e.parentNode.style.width = '100%';	
			for(i=0; i<e.childNodes.length; i++){
				if(e.childNodes[i].id == 'contentCol'){
					e.childNodes[i].style.margin = '0px';
					break;
				}
			}
		}

		var e = document.getElementById('pageHead');
		if(e){
			e.style.width = '100%';
			e.style.margin = '0 10px';
		}
		var e = document.getElementById('bottomContent');
		if(e){
			e.style.padding = "0";
		}
	};

	setWide();
}

var Seed = unsafeWindow.seed;
var Tabs = {};
var Tabs2 = {};
var mainPop;
var infoPop;
var Cities = {};
var ptStartupTimer = null;
var CPopUpTopClass = 'ptPopTop';
var uW = unsafeWindow;

function ptStartup (){
  clearTimeout (ptStartupTimer);
  if (unsafeWindow.ptLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    ptStartupTimer = setTimeout (ptStartup, 1000);
    return;
  }
  unsafeWindow.ptLoaded = true;

	//Hide the Promo-bar
	document.getElementById('gw-promo-main').style.display = "none";

  Seed = unsafeWindow.seed;
  var styles = '.ptTabs {color:black; font-size:12px; font-family: arial,verdana;}\
		.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
	.xtabBR {padding-right: 5px; border:none; background:none;}\
	table.ptTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
	.hostile td { background:red; }.friendly td{background:lightgreen; }.ally td{background:lightblue; }\
	table.ptTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
	table.ptTabBR tr td {border:none; background:none;}\
	table.ptTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
	table.ptOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
	table.ptSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
	table.ptTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
	table.ptTabBR tr td {border:none; background:none;}\
	table.ptTabLined tr td {border:1px none none solid none;}\
	table.ptTabOverview tr td {border-left:1px solid #ccc; white-space:nowrap; padding: 1px 2px;}\
	table.ptTabOverview {border:1px solid #ccc; border-collapse: collapse}\
	table.ptTabOverview tr.odd {background-color:#e8e8e8;}\
	table.ptTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
	table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
	.ptDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
	.ptOddrow {background-color:#eee}\
	table.ptStat{border:1px solid green; border-collapse: collapse}\
	table.ptStat tr td {padding: 2px 2px;}\
	.ptStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:green;  -moz-border-radius:5px;}\
	.ptStatLight {color:#ddd}\
	table td.nobr {white-space:nowrap;}\
	.ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
	.ptErrText {font-weight:bold; color:#600000}\
	button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
	span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
	span.boldRed {color:#800; font-weight:bold}\
	.ptcastleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
	.ptcastleBut:hover {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\	.ptcastleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
	.ptcastleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
	input.ptDefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
	input.ptDefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
    input.ptButton20 {height:27px; width:80px}\
    table.ptMainTab {empty-cells:show; border-collapse: separate; border-spacing:2px}\
	table.ptMainTab tr td {padding: 4px 5px 3px 5px; text-align: center;}\
    table.ptMainTab tr td a {color:inherit }\
    table.ptMainTab tr td {font-family:arial,verdana,sans-serif; empty-cells:show; white-space:nowrap; border: 1px solid blue;}\
    table.ptMainTab tr td.sel    {font-weight:bold; font-size:12px; background-color:#eed; color:black}\
    table.ptMainTab tr td.notSel {font-weight:bold; font-size:12px; background-color:#330066; color:white; border-color:black;}\
    tr.ptPopTop td { background-color:#ded; border:none; height: 21px;  padding:0px; }\
    tr.ptretry_ptPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.ptMainPopTop td { background-color:#ded; border:none; height: 42px;  padding:0px; }\
    tr.ptretry_ptMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
	table.infMainTab {empty-cells:show; margin-top:5px }\
    table.infMainTab tr td a {color:inherit }\
    table.infMainTab tr td   {font-family:georgia,arial,sans-serif; height:60%; empty-cells:show; padding: 0px 5px 0px 5px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.infMainTab tr td.spacer {padding: 0px 3px;}\
    table.infMainTab tr td.sel    {font-weight:bold; font-size:11px; border: 1px solid; border-style: solid solid none solid; background-color:#eed; color:black}\
    table.infMainTab tr td.notSel {font-weight:bold; font-size:11px; border: 1px solid; border-style: solid solid none solid; background-color:#1e66bd; color:white; border-color:black;}\
    tr.infPopTop td { background-color:#ded; border:none; height: 21px;  padding:0px; }\
    tr.infretry_ptPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.infMainPopTop td { background-color:#5f8aee; border:none; height: 42px;  padding:0px; }\
    tr.infretry_ptMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px; overflow:auto;}\
    .CPopup  {border:2px ridge #666}\
    span.ptTextFriendly {color: #080}\
    span.ptTextHostile {color: #800}\
	td.ptcoords:hover {background-color: blue; cursor:pointer;}\
	td.ptcoordslist:hover {background-color: maroon; color: white;cursor:pointer;}\
	table.ptTrain td {padding: 1px 2px 1px 2px;}\
	.ptButCancel {background-color:#a00; font-weight:bold; color:#fff}\
	div#font11 {font: normal 10px arial}\
    div.indent25 {padding-left:25px}\
		div.pbhelp {font: normal 12px arial; line-height: 14px; color: black;}\
		div.pbhelp h2 {border-bottom: 1px solid black; color: maroon; font-size: 13px; font-weight: bold; margin: 10px 3px 5px 0;}\
		div.pbhelp p {margin-bottom: 5px; padding-left: 10px; padding-right: 3px;}';

  window.name = 'PT';
  readOptions();
  readLogs();
  setCities();

  if (Options.ptWinPos==null || Options.ptWinPos.x==null|| Options.ptWinPos.x=='' || isNaN(Options.ptWinPos.x)){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    Options.ptWinPos.x = c.x+4;
    Options.ptWinPos.y = c.y;
    saveOptions ();
  }
  if (Options.infWinPos==null || Options.infWinPos.x==null|| Options.infWinPos.x=='' || isNaN(Options.infWinPos.x)){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    Options.infWinPos.x = c.x+4;
    Options.infWinPos.y = c.y;
    saveOptions ();
  }

  mainPop = new CPopup ('pt', Options.ptWinPos.x, Options.ptWinPos.y, Options.ptWinWidth,1200, Options.ptWinDrag,
    function (){
      tabManager.hideTab();
      Options.ptWinIsOpen=false;
      saveOptions()
    });
 infoPop = new CPopup ('inf', Options.infWinPos.x, Options.infWinPos.y, Options.ptWinWidth,1200, Options.infWinDrag,
      function (){
        tabManager2.hideTab();
        Options.infWinIsOpen=false;
        saveOptions()
      });
  mainPop.autoHeight (true);
  mainPop.getMainDiv().innerHTML = '<style type="text/css">'+ styles +'</style>';
  infoPop.autoHeight (true);
  infoPop.getMainDiv().innerHTML = '<style type="text/css">'+ styles +'</style>';

  AddMainTabLink('TOOLS', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  tabManager2.init(infoPop.getMainDiv());


  if (Options.ptWinIsOpen && Options.ptTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
   if (Options.infWinIsOpen && Options.infTrackOpen){
    infoPop.show (true);
    tabManager2.showTab();
  }
  window.addEventListener('beforeunload', onUnload, false);

	ChatPane.init();
	Tabs.Options.onoffMotd();
	Tabs.Options.onoffIcons();
	Tabs.Options.sound();
	AutoEvents.init();	
	FoodAlerts.init();
	Gifts.init();
	ItemUse.init();
	ChatOnRight.init();
	RefreshEvery.init();
	CratesUse.init();
	NewButton();
	setInterval (Buildcheck, 5000);
	if (GM_getValue('pbReloadHit') == 'OK') {
		GM_setValue('pbReloadHit', '');
		Logbook.entry(Logs.globallog,'Send gifts page reload prevented');
	}
	GM_setValue('pbReloadNow','0');
	var gwversion = unsafeWindow.Constant.Version.VERSION_NUMBER;
	gwversion = gwversion.split('_').join('.');
	Logbook.entry(Logs.globallog,'Tools started - Version ' + Version +' (GW Version: '+gwversion+')');
}
//Bugfix For build Failures
function Buildcheck() {
	var now = unixTime();
	for (var city in Seed.queue_con) {
		var q = Seed.queue_con[city][0];
		var cid = city.substr(4);
		if (q != null) {
			if (parseInt(q[4]) < now) {
				var typ = q[0];
				var level = q[1];
				var id = q[2];
				var pos = q[7];
				var baupos = Seed.buildings[city]['pos'+pos];
				if (baupos[3] == id && baupos[0] == typ && parseInt(level) > parseInt(baupos[1])) {
					baupos[1] = level;
					Seed.queue_con[city] = [];
					if (cid == unsafeWindow.currentcityid) 
						unsafeWindow.update_bdg();
				} 
			}
		}
	}
}

/**************************** Overview Tab ******************************/
Tabs.Overview = {
  tabOrder : 1,
	tabLabel: 'Overview',
  cont : null,
  displayTimer : null,
  tabDisabled : !ENABLE_OVERVIEW,

  Overview : function (){
  },

  init : function (div){
    this.cont = div;
  },

  hide : function (){
    clearTimeout (Tabs.Overview.displayTimer);
  },

  show : function (){
    var rownum = 0;
    var t = Tabs.Overview;

	clearTimeout (t.displayTimer);

		//Update March Info
		t.updatemarches();

    function _row (name, row, noTotal){
      if (rownum++ % 2) {
        style = '';
        style2 = ' style="background-color:#ffc;text-align:right;"';
				style3 = ' style="text-align:right;"';
			} else {
        style = ' style="background-color:#e8e8e8;"';
        style2 = ' style="background-color:#eea;text-align:right;"';
        style3 = ' style="background-color:#e8e8e8;text-align:right;"';				
			}
      var tot = 0;
      var m = [];
      m.push ('<tr style="background-color:#fff;"');
      m.push (style);
      m.push ('><td');
      m.push (style);
      m.push ('><b>');
      m.push (name);
      m.push (' &nbsp; </td>');
      if (noTotal){
        m.push ('<td');
        m.push (style2);
        m.push ('>&nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        m.push ('<td'+style2+'>'); 
				if (tot < 0) {
					m.push ('<span class="boldRed">' + addCommas(tot) + '</span>');
				} else {
					m.push (addCommas(tot));
				}
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<td');
        m.push (style3);
        m.push ('>');   
				if (row[i] < 0) {
					m.push ('<span class="boldRed">' + addCommas(row[i]) + '</span>');
				} else {
					m.push (addCommas(row[i]));
				}
        m.push ('</td>');
      }
      m.push ('</tr>');
      return m.join('');
    }

		function _rowbl () {
			return '<tr><td colspan="'+(Cities.numCities+2)+'">&nbsp;</td></tr>';
    }

		try {
		  var now = unixTime();
      str = '<div class="ptstat" style="margin-top:5px; margin-bottom:5px;">\
				<table cellspacing="0" cellpadding="0" class="ptTab ptStat" width="100%">\
				<tr>\
					<td colspan="8" style="text-align:center;"><b>Test Tools for Global Warfare Version: ' + Version + '</b></td></tr><tr>\
					<td><span class="ptStatLight">Power:</span> ' + addCommas(Seed.player.might) +'</td>\
					<td style="text-align:center;"><span class="ptStatLight">Level:</span> ' + Seed.player.title +'</td>\
					<td style="text-align:right;"><span class="ptStatLight">Alliance:</span> ' + getMyAlliance()[1] +'</td>\
					<td style="text-align:right;"><span class="ptStatLight">Server:</span> ' + unsafeWindow.domainName +'</td>\
				</tr>\
				</table></div>';
				str += '<div id="overMainDiv" style="font-size:'+ Options.overviewFontSize +'px">\
				<table class="ptTabOverview" cellpadding="0" cellspacing="0">\
				<tr valign="top" align="right">\
					<td width="65"></td>\
					<td width="88" style="background: #ffc; text-align:right;"><b>Total</b></td>';
      for(i=0; i<Cities.numCities; i++) {
        str += '<td width="81" style="text-align:right;"><b>'+ Cities.cities[i].name.substring(0,11) +'</b><br>'+ Cities.cities[i].x +','+ Cities.cities[i].y +'<br>'+ unsafeWindow.provincenames['p'+ Cities.cities[i].provId] +'</td>';
      }
			str += '</tr>';
			str += '<tr valign="top"><td></td><td style="background-color: #ffc"></td>';
			for(i=0; i<Cities.numCities; i++){
				cityID = 'city'+Cities.cities[i].id;
				Gate = parseInt(Seed.citystats[cityID].gate);
			if(Gate == 0)
				str += '<td style="text-align:right;">Hiding</td>';
			else
				str += '<td style="text-align:right;"><span class="boldRed"><blink>Defending</blink></span></td>';
			}

      rows = [];
      rows[0] = [];
      for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        rows[0][i] = parseInt(Seed.citystats[cityID].gold[0]);
      }
      for (r=1; r<9; r++){
        rows[r] = [];
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
          rows[r][i] = parseInt(Seed.resources[cityID]['rec'+r][0] / 3600);
        }
      }
      str += _row ('Gold', rows[0]);
      str += _row ('Food', rows[1]);
      str += _row ('Oil', rows[2]);
      str += _row ('Stone', rows[3]);
      str += _row ('Steel', rows[4]);
      str += _row ('Titanium', rows[5]);
      str += _row ('Graphene', rows[6]);
      //str += _row ('Uranium', rows[7]);
      //str += _row ('Diamond', rows[8]);
	  str += _rowbl();

			for (r=1; r<25; r++){
				rows[r] = [];
				for(i=0; i<Cities.numCities; i++) {
					cityID = 'city'+ Cities.cities[i].id;
					if (Seed.units[cityID]['unt'+r]) {
						rows[r][i] = parseInt(Seed.units[cityID]['unt'+r]);
					} else {
						rows[r][i] = 0;
					}
				}
			}

      rownum = 0;
	  str += _row ('Truck', rows[1]);
      str += _row ('Infantry', rows[5]);
      str += _row ('Sniper', rows[6]);
      str += _row ('Anti-Tank Infantry', rows[4]);
	  str += _row ('Special Forces', rows[18]);
      str += _row ('Mobile SAM', rows[7]);
      str += _row ('Tank', rows[8]);
      str += _row ('Predator-Drone', rows[17]);
      str += _row ('Supply-Helicopter', rows[9]);
      str += _row ('Gunship', rows[11]);
      str += _row ('Fighter', rows[10]);
      str += _row ('Bomber', rows[12]);
	  str += _row ('Cargo Transport', rows[19]);
      str += _row ('Hellfire-Tank', rows[16]);
      str += _row ('Stealth-Bomber', rows[13]);
	  str += _row ('Tactical Nuke', rows[15]);
	  str += _row ('Orbital Ion Cannon', rows[20]);
	  str += _row ('Sam Elite', rows[21]);
	  str += _row ('Gunship Elite', rows[24]);
	  str += _row ('Anti-Tank Elite', rows[22]);
      str += _rowbl();
			//End Troops

			//Walls
	  for (r=52; r<=57; r++){
        rows[r] = [];			
        for(i=0; i<Cities.numCities; i++) {
          cityID = 'city'+ Cities.cities[i].id;
					if (Seed.fortifications[cityID]['fort'+r]) {
						rows[r][i] = parseInt(Seed.fortifications[cityID]['fort'+r]);
					} else {
						rows[r][i] = 0;
			}
		 }
      }
	  rownum = 0;
	  str += _row ('Mines', rows[53]);
      str += _row ('Stinger Missiles', rows[52]);
      str += _row ('Artillery', rows[54]);
      str += _row ('Anti-Aircraft Guns', rows[55]);
      str += _row ('Rail Guns', rows[56]);
      str += _row ('Laser Turrets', rows[57]);
      str += _rowbl();
			//End Wall

      row = [];
      row2 = [];
      row3 = [];
      row4 = []; //Oil
      row5 = []; //Stone
      row6 = []; //Steel

      for(i=0; i<Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var usage = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
				//Ration Active?
				var ration = 1;
				if (Seed.bonus.bC1150.bT1151 > now) ration = 2;
				usage = parseInt(usage / ration);
				row3[i] = usage;
				row2[i] = rp[1];
				row[i] = rp[1] - usage;
				row4[i] = rp[2]; //Oil
				row5[i] = rp[3]; //Stone
				row6[i] = rp[4]; //Steel
      }
			rownum = 0;
      str += _row ('Food Prod./h', row2);        
	  str += _row ('Food Used/h', row3);
      str += _row ('Food &plusmn;/h', row);
      
      for(i=0; i<Cities.numCities; i++) {
        if (row[i] >= 0)
          row[i] = '&infin;';
        else {
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-row[i]) * 3600;
		  if (timeLeft < 14400){
				row[i] = '<span background-color="blue" class="boldRed"><blink>'+timestrShort(timeLeft)+'</blink></span>'
			}
          else if (timeLeft > 31536000){ //>1 year
            row[i] = '> 1 Year';
		  }
          else {
            row[i] = timestrShort(timeLeft);
          }
        }
      }
      str += _row ('Food left:', row, true);
      str += _row ('Oil Prod.:', row4);
      str += _row ('Stone Prod.:', row5);
      str += _row ('Steel Prod.:', row6);
      str += _rowbl();

      row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totWilds = 0;
        dat = Seed.wilderness['city'+ Cities.cities[i].id];
        if (dat!=null && matTypeof(dat)=='object')
          for (k in dat)
            ++totWilds;
        var castle = parseInt(Seed.buildings['city'+ Cities.cities[i].id].pos0[1]);
				if (castle == 11) castle = 13;
        if (totWilds < castle)
          row[i] = '<span class="boldRed">'+ totWilds +'/'+ castle +'</span>';
        else
          row[i] = totWilds +'/'+ castle;
      }
			rownum = 0;
      str += _row ('Wilds', row, true);

			//Generals

      row = [];
      for(i=0; i<Cities.numCities; i++) {
        totKnights = 0;
        dat = Seed.knights['city'+ Cities.cities[i].id];
        for (k in dat) {
          ++totKnights;
		  	}
				//Determine the level of Generals quarters
				GLevel = 0;
				var bau = Seed.buildings['city'+ Cities.cities[i].id];
				for (var g in bau) {
					b = bau[g];
					if (parseInt(b[0]) == 7) { // Generals quarters
						GLevel = parseInt(b[1]); // Determine level
					}						
				}
				GMax = GLevel*2;
				if (totKnights < GMax) {
					row[i] = '<span class="boldRed">'+ totKnights + "/" + GMax + '</span>';
				} else {
					row[i] = totKnights + "/" + GMax;				
			}
      }
      str += _row ('Generals', row, true);
      str += _rowbl();
			//End Generals

			//Determine Construction Time
      var now = unixTime();
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.queue_con['city'+ Cities.cities[i].id][0]; 
        if (q!=null) {
          totTime = parseInt(q[4]) - now;
					if (totTime < 0) totTime = 0;
					row[i] = timestr(totTime);
        } else {
					row[i] = timestr(0);
				}   
      }
			rownum = 0;
			str += _row ('Construction time', row, true);
      //End construction time

			//Determine Research Level
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.queue_tch['city'+ Cities.cities[i].id][0]; 			
        if (q!=null) {
          totTime = parseInt(q[3]) - now;
					if (totTime < 0) totTime = 0;
					row[i] = timestr(totTime);
        } else {
					row[i] = ' ';
				}   
      }
			str += _row ('Research', row, true);
      //End End Research

			//Wall & Troops
      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.training_queue['c'+Cities.cities[i].id]; 
        for (qs in q) {
					qe = q[qs];
					if (parseInt(qe.status) != 0 && parseInt(qe.eta) > now) {
						if (parseInt(qe.ticker) < now) {
							totTime += parseInt(qe.eta)-now;
						} else {
							totTime += parseInt(qe.eta)-parseInt(qe.ticker);
						}
					}
				}
				if (totTime < 21600) {
					row[i] = '<span class="boldRed"><blink>'+timestr(totTime)+'</blink></span>';
				} else {
				row[i] = timestr(totTime);
			}
      }
      str += _row ('Training', row, true);

      var row = [];
      for(i=0; i<Cities.numCities; i++) {
        var totTime = 0;
        var q = Seed.fortify_queue['c'+Cities.cities[i].id]; 
        for (qs in q) {
					qe = q[qs];
					if (parseInt(qe.status) != 0 && parseInt(qe.eta) > now) {
						if (parseInt(qe.ticker) < now) {
							totTime += parseInt(qe.eta)-now;
						} else {
							totTime += parseInt(qe.eta)-parseInt(qe.ticker);
						}
					}
				}
			  row[i] = timestr(totTime);
      }    
      str += _row ('Defenses', row, true);
			//End Walls & Troops

			str += '<tr></table>';
			str += '<br><div style="text-align:center;">Font: ' + 
						htmlSelector ({9:9, 10:10, 11:11, 12:12}, Options.overviewFontSize, 'id="ptoverfont"') +
						'&nbsp;&nbsp;'+
						'Menu Width: ' + 
						htmlSelector ({600:600, 650:650, 700:700, 750:750, 800:800, 850:850}, Options.ptWinWidth, 'id="ptWinWidth"')+
						'</div></div>';
				
			Tabs.Overview.cont.innerHTML = str;
      document.getElementById('ptoverfont').addEventListener('change', e_fontSize, false);
	  document.getElementById('ptWinWidth').addEventListener('change', e_winwidth, false);
    } catch (e){
			Tabs.Overview.cont.innerHTML = '<pre>'+ e.name +' : '+ e.message +' : Line:'+e.lineNumber+'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);

    function e_fontSize(evt){
      document.getElementById('overMainDiv').style.fontSize = evt.target.value +'px'; 
      Options.overviewFontSize = evt.target.value;
			saveOptions();
    }
	function e_winwidth(evt){
      mainPop.div.style.width = evt.target.value +'px';
      Options.ptWinWidth = evt.target.value;
			saveOptions();
    }

  },

	updatemarches: function() {
		var now = unixTime();
		for(var i=0; i<Cities.numCities; i++) {
			var cityId = Cities.cities[i].id;
			var marches = Seed.outgoing_marches['c'+cityId];
			for (var m in marches) {
				var march = marches[m];
				if (march.marchStatus != 0 && (march.marchType == 1 || march.marchType == 4) && march.returnUnixTime < now) {
					//March is over
					march.marchStatus = 0;
					//General release
					if (march.knightId != 0 && Seed.knights['city'+cityId]['knt'+march.knightId]) {
						Seed.knights['city'+cityId]['knt'+march.knightId].knightStatus = 1;
					}
					//Reassign Troops
					if (march.marchType == 1) { // Transport
						var post = "Count";
					} else { //Attack
						var post = "Return";					
					}
					for (var r = 1; r < 25; r++){
						Seed.units['city'+cityId]['unt'+r] += parseInt(march['unit'+r+post]);
					}
				}
				//General release - Game Bug!
				if (march.marchStatus == 0) {
					if (march.knightId != 0 && Seed.knights['city'+cityId]['knt'+march.knightId]) {
						Seed.knights['city'+cityId]['knt'+march.knightId].knightStatus = 1;
						march.knightId = 0;					
					}
				}	

			}
	}
	},

};

/**************************** Tower Tab ******************************/
Tabs.tower = {
	tabOrder: 2,
	tabLabel: 'Tower',
	myDiv: null,
	generateIncomingFunc : null,
	fixTargetEnabled : false,
	secondTimer : null,
	soundPlaying : false,
	defMode : {},  
	soundRepeatTimer : null,
	soundStopTimer : null,
	towerMarches: [],
	tabDisabled : !ENABLE_TOWER,
	uu: {
		'u1'  : 'Trucks',
		'u2'  : 'Unknown',
		'u3'  : 'Unknown',
		'u4'  : 'Anti-tank Infantry',
		'u5'  : 'Infantry',
		'u6'  : 'Sniper',
		'u7'  : 'Mobile SAM',
		'u8'  : 'Tank',
		'u9'  : 'Supply-Helicopter',
		'u10' : 'Fighter',
		'u11' : 'Gunship',
		'u12' : 'Bomber',
		'u13' : 'Stealth-Bomber',
		'u14' : 'Unknown',
		'u15' : 'Tactical Nuke',
		'u16' : 'Hellfire-Tank',
		'u17' : 'Predator-Drone',
		'u18' : 'Special Forces',
		'u19' : 'Cargo Transport',	
		'u20' : 'Orbital Ion Cannon',
		'u21' : 'Sam Elite',
		'u22' : 'Anti-Tank Elite',
		'u23' : 'Not Used',
		'u24' : 'Gunship Elite',
	},

  init: function(div){
		var t = Tabs.tower;
		// Check if an .MP3 needs to be loaded
		if (Options.alertSound.soundUrl.substr(Options.alertSound.soundUrl.length-4,4) == '.mp3') {
			Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL;
		}
    t.myDiv = div;
    var now = unixTime();
		var out = [];
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');	
		out.push('<b>Alliance Attack Alarm</b>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		out.push('<table class="pbTab" width="100%">');
		out.push('<tr>');
		out.push('<td>&nbsp;</td>'); 
	  for (var i=0; i<Cities.cities.length; i++) {
			out.push('<td style="text-align:center"><span id="pbtacity_'+ i +'"><b>' + Cities.cities[i].name + '</b></span></td>');
    }
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Defense:</b>&nbsp;</td>');
	  for (var cityId in Cities.byID) {
			out.push('<td style="text-align:center"><input type="submit" id="pbtabut_'+ cityId +'" value=""></td>');
		}
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Attack:</b>&nbsp;</td>');
	  for (var cityId in Cities.byID) {
			out.push('<td style="text-align:center"><input id="pbattackqueue_' + cityId + '" type="submit" value="Details"></td>');
		}
		out.push('</tr>');	
		out.push('<tr>');
		out.push('<td>&nbsp;<br><b>Camouflage:</b>&nbsp;</td>'); 
	  for (var cityId in Cities.byID) {
			out.push('<td style="text-align:center" id="camo'+cityId+'"></td>');			
		}
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>General:</b>&nbsp;</td>'); 
	  for (var cityId in Cities.byID) {
			out.push('<td style="text-align:center" id="gen'+cityId+'"></td>');			
		}
		out.push('</tr>');			
		out.push('</table>');
		out.push('<br>');
		out.push('<b>Note:</b> "Detail #" indicates the number of attacks on your city.  Camouflage = Anti-Scout Camouflage which can be purchased for $5 at the Satellite Station and is active for 24 hours.  The General refers to the Chief of Staff in the city.');
		out.push('<br><hr>');
		out.push('<div id="pbitems"></div>');
		out.push('<hr><br>');	
		out.push('<div style="text-align:center;">');
		out.push('<input id="pbSoundStop" type="submit" value="Alarm Sound Stop">');
		out.push('</div>');
		out.push('<br>');
		out.push('<div class="pbStat">&nbsp;<b>Options</b></div><br>');
		out.push('<table class="pbTab">');
		out.push('<tr>');		
		out.push('<td>');		
		out.push('<input id="pbalertEnable" type="checkbox" ' + (Options.alertConfig.aChat?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('<td>Automatically post in Alliance Chat<br>&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td>&nbsp;</td>');
		out.push('<td>');
		out.push('<table>');	
		out.push('<tr>');			
		out.push('<td>Message begins with:</td>');
		out.push('<td>');
		out.push('<input id="pbalertPrefix" type="text" size="40" value="'+ Options.alertConfig.aPrefix +'">');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');			
		out.push('<td>Alarm when Wilds are attacked:</td>');
		out.push('<td>');
		out.push('<input id="pbalertWild" type="checkbox" '+ (Options.alertConfig.wilds?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');			
		out.push('<td>Include Defense Status:&nbsp;&nbsp;</td>');
		out.push('<td>');
		out.push('<input id="pbalertDefend" type="checkbox" '+ (Options.alertConfig.defend?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');			
		out.push('<td>Minimum number of troops to alert on:</td>');
		out.push('<td>');
		out.push('<input id="pbalertTroops" type="text" size="5" value="'+ Options.alertConfig.minTroops +'">');
		out.push('&nbsp;&nbsp;<span id="pbalerterr"></span>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr><td><br></td></tr>');
		out.push('<tr>');
		out.push('<td>');
		out.push('<input id="pbSoundEnable" type="checkbox" '+ (Options.alertSound.enabled?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('<td>Play alarm sound during an incoming attack.<br>&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td>&nbsp;</td>');
		out.push('<td>');
		out.push('<div id="pbSoundOpts">');
		out.push('<table>');	
		out.push('<tr>');			
		out.push('<td>Sound:&nbsp;</td>');
		out.push('<td>');
		out.push('<input id="pbsoundFile" type="text" style="width:220px;" value="'+ Options.alertSound.soundUrl +'">&nbsp;');
		out.push('<input id="pbSoundLoad" type="submit" value="Load">&nbsp;');
		out.push('<input id="pbSoundDefault" type="submit" value="Default">&nbsp;<span id="pbLoadStat">Loading...</span><br>&nbsp;');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');			
		out.push('<td><span style="position:relative; top:-6px;">Volume:</span>&nbsp;</td>');
		out.push('<td>');
		out.push('<table><tr>');
		out.push('<td style="vertical-align: middle;"><span style="display:inline;" id="pbVolSlider"></span></td>');
		out.push('<td style="vertical-align: middle;">&nbsp;&nbsp;&nbsp;<span id="pbVolOut">0</span>&nbsp;&nbsp;&nbsp;');
		out.push('</td>');
		out.push('</tr></table>');		
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');			
		out.push('<td>&nbsp;</td>');
		out.push('<td>&nbsp;<br>');		
		out.push('<input id="pbSoundRepeat" type="checkbox" '+ (Options.alertSound.repeat?'checked="checked"':'') +'>');
		out.push('&nbsp;Repeat every <input style="text-align:center;" id="pbSoundEvery" type="text" size="2" value="'+ Options.alertSound.repeatDelay +'"> Minutes');		
		out.push('<br>');
		out.push('Play for <input style="text-align:center;" id="pbSoundLength" type="text" size="3" value="'+ Options.alertSound.playLength +'"> Seconds');
		out.push('<br><br>');		
		out.push('<input type="submit" value="Play Now" id="pbPlayNow">');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('</div><br>&nbsp;');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td>');
		out.push('<input id="pbTowerGeneral" type="checkbox" '+ ( Options.alertConfig.hireGeneral?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('<td>Appoint Chief of Staff (The highest level general with at least two points of energy is chosen.)</td>');
		out.push('</tr>');
		
		out.push('<tr>');
		out.push('<td>');
		out.push('<input id="pbTowerAttackBoost" type="checkbox" '+ ( Options.alertConfig.useBoostAttack?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('<td>Use Attack Boost (Extra Ammo or Additional Weapons). Only used when necessary and available.</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td>');
		out.push('<input id="pbTowerHealthBoost" type="checkbox" '+ ( Options.alertConfig.useBoostHealth?'checked="checked" ':'') +'>');
		out.push('</td>');
		out.push('<td>Use Defense Boost (Kevlar Vest or Body Armor). Only used when necessary and available.</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		m = out.join('');

  	t.myDiv.innerHTML = m;

    t.mss = new Sound(Options.alertSound.soundUrl, t.e_soundFileLoaded, t.e_soundFileLoaded);

    t.volSlider = new SliderBar (document.getElementById('pbVolSlider'), 200, 21, 0);
    t.volSlider.setChangeListener(t.e_volChanged);

    t.volSlider.setValue(Options.alertSound.volume/100);
    t.mss.set('volume', Options.alertSound.volume/100);

    document.getElementById('pbTowerGeneral').addEventListener ('change', function (e){Options.alertConfig.hireGeneral = e.target.checked}, false);
    document.getElementById('pbTowerAttackBoost').addEventListener ('change', function (e){Options.alertConfig.useBoostAttack = e.target.checked}, false);
    document.getElementById('pbTowerHealthBoost').addEventListener ('change', function (e){Options.alertConfig.useBoostHealth = e.target.checked}, false);

    document.getElementById('pbPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
    document.getElementById('pbSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
    document.getElementById('pbSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked}, false);
    document.getElementById('pbSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value}, false);
    document.getElementById('pbSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value}, false);
    document.getElementById('pbSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked}, false);
    document.getElementById('pbSoundStop').disabled = true;
    document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);

    document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertDefend').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbsoundFile').addEventListener ('change', function (){
			Options.alertSound.soundUrl = document.getElementById('pbsoundFile').value;
			t.loadUrl (Options.alertSound.soundUrl);
    }, false);
    document.getElementById('pbSoundDefault').addEventListener ('click', function (){
			document.getElementById('pbsoundFile').value = DEFAULT_ALERT_SOUND_URL;
			Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL;
			t.loadUrl (DEFAULT_ALERT_SOUND_URL);
    }, false);

    for (var cityId in Cities.byID){
  	  var but = document.getElementById ('pbtabut_'+ cityId);
  	  addListener (but, cityId);
  	  t.defMode[cityId] =  parseInt(Seed.citystats["city" + cityId].gate);
  	  t.displayDefMode (cityId);
			var btnNameT = 'pbattackqueue_' + cityId;
      addTowerEventListener(cityId, btnNameT);
	  }
    function addListener (but, i){
      but.addEventListener ('click', function (){t.butToggleDefMode(i)}, false);
    }
		function addTowerEventListener(cityId, name){
			document.getElementById(name).addEventListener('click', function(){
				t.showTowerIncoming(cityId);
			}, false);
    }	
		if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime()) {
      t.soundTheAlert();
		}
    setInterval (t.eachSecond, 2000);
		t.items();
    setInterval (t.items, 20000);		
  },      

  show : function (){
  },
  
  hide : function (){
  },

	items : function() {
		var out = document.getElementById('pbitems');
		var now = unixTime();
		var m = '<b>Combat Boosts & Peace Treaties</b><br><br>';
		m += '<table><tr>';
		m += '<td><img title="Extra Ammo" height=30 src=http://i.imgur.com/hQn3x.png><b>(+20%)=</b>&nbsp;&nbsp;&nbsp;</td>';
		if (parseInt(Seed.bonus.bC2600.bT2601) > now) {
			var time = parseInt(Seed.bonus.bC2600.bT2601)	- now;
			m += '<td>'+timestr(time)+'&nbsp;&nbsp;&nbsp;</td>';
		} else {
			m += '<td>-----&nbsp;&nbsp;&nbsp;</td>';		
		}
		m += '<td>Extra Ammunition, Additional Weapons</td>';	
		m += '</tr>';
		m += '<tr>';
		m += '<td><img title="Kevlar Vest" height=30 src=http://i.imgur.com/z9lVP.png><b>(+20%)=</b>&nbsp;&nbsp;&nbsp;</td>';
		if (parseInt(Seed.bonus.bC2700.bT2701) > now) {
			var time = parseInt(Seed.bonus.bC2700.bT2701)	- now;
			m += '<td>'+timestr(time)+'&nbsp;&nbsp;&nbsp;</td>';
		} else {
			m += '<td>-----&nbsp;&nbsp;&nbsp;</td>';		
		}
		m += '<td>Kevlar Vest, Body Armor</td>';	
		m += '</tr>';	
		m += '<tr>';
		m += '<td><img title="Peace Treaty" height=30 src=http://i.imgur.com/992P1.png><b>Only=</b>&nbsp;&nbsp;&nbsp;</td>';
		if (Seed.player.warStatus == 3 && parseInt(Seed.player.truceExpireUnixTime) > now) {
			var time = parseInt(Seed.player.truceExpireUnixTime)	- now;
			m += '<td>'+timestr(time)+'&nbsp;&nbsp;&nbsp;</td>';
		} else {
			m += '<td>-----&nbsp;&nbsp;&nbsp;</td>';		
		}
		m += '<td>12 Hour Peace Treaty, 7 Day Peace Treaty</td>';	
		m += '</tr>';	
		m += '<tr>';
		m += '<td><img title="Rations" height=30 src=http://i.imgur.com/aRnxz.png><b>(-50%)=</b>&nbsp;&nbsp;&nbsp;</td>';
		if (parseInt(Seed.bonus.bC1150.bT1151) > now) {
			var time = parseInt(Seed.bonus.bC1150.bT1151)	- now;
			m += '<td>'+timestr(time)+'&nbsp;&nbsp;&nbsp;</td>';
		} else {
			m += '<td>-----&nbsp;&nbsp;&nbsp;</td>';		
		}
		m += '<td>8 Hour Rations, 24 Hour Rations, 3 Day Rations</td>';
		m += '</tr>';			
		m += '</table>';		
		out.innerHTML = m;
		
		// Bug in Game - The Level of the leader is not Updated

		for (var cityId in Cities.byID) {
			var c = document.getElementById('camo'+cityId);
			//Anti-Scouting
			if (parseInt(Seed.antiscouting['city'+cityId]) > now) {
				var time = parseInt(Seed.antiscouting['city'+cityId])	- now;			
				c.innerHTML = '&nbsp;<br>'+timestr(time);			
			} else {
				c.innerHTML = '&nbsp;<br>AUS';		
			}
			//Chief of Staff
			var c = document.getElementById('gen'+cityId);
			if (Seed.leaders['city'+cityId].combatKnightId != 0) {		
				c.innerHTML = 'Lvl: '+Seed.knights['city'+cityId]['knt'+Seed.leaders['city'+cityId].combatKnightId].knightLevel;			
			} else {
				c.innerHTML = '---';		
			}			
		}
		
	},
	
  loadUrl : function (url){
    var t = Tabs.tower;
    t.mss.load(url, t.e_soundFileLoaded);
    document.getElementById('pbLoadStat').innerHTML = 'Loading...';
  },
 
  e_alertOptChanged : function (){
    var t = Tabs.tower;
    Options.alertConfig.aChat = document.getElementById('pbalertEnable').checked;
    Options.alertConfig.aPrefix=document.getElementById('pbalertPrefix').value;      
    Options.alertConfig.scouting=document.getElementById('pbalertScout').checked;      
    Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
    Options.alertConfig.defend=document.getElementById('pbalertDefend').checked;
    var mt = parseInt(document.getElementById('pbalertTroops').value);
    if (mt<1 || mt>100000){
      document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;
      document.getElementById('pbalerterr').innerHTML = '<b style="color:#600000;">invalid</b>';
      setTimeout (function (){document.getElementById('pbalerterr').innerHTML =''}, 2000);
      return;
    }
    Options.alertConfig.minTroops = mt;
		saveOptions();
  },
  
  e_volChanged : function (val){
    var t = Tabs.tower;
    document.getElementById('pbVolOut').innerHTML = parseInt(val*100);
    Options.alertSound.volume = parseInt(val*100);
    t.mss.set('volume', Options.alertSound.volume/100);
  },
  
  butToggleDefMode : function (cityId){
    var t = Tabs.tower;
    var mode = 1;
    if (Seed.citystats["city" + cityId].gate != 0) {
      mode = 0;
		}
    t.ajaxSetDefMode (cityId, mode, function (newMode){
			t.defMode[cityId] = newMode;
			t.displayDefMode (cityId);
    });
  },
      
  displayDefMode : function (cityId){
    var t = Tabs.tower;
    var but = document.getElementById('pbtabut_'+ cityId);
    if (t.defMode[cityId]){
      but.className = 'pbDefButOn';
      but.value = 'EIN';  
    } else {
      but.className = 'pbDefButOff';
      but.value = 'AUS';  
    }  
  },
    
  eachSecond : function (){
		var t = Tabs.tower;
		for (var cityId in Cities.byID){
			if (Seed.citystats["city" + cityId].gate != t.defMode[cityId]){ // user changed def mode
        t.defMode[cityId] = Seed.citystats["city"+ cityId].gate;
        t.displayDefMode (cityId);
      }
    }
  	var now = unixTime();
		var incomming = false;
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (var k in Seed.queue_atkinc){//check each incoming march
        var m = Seed.queue_atkinc[k];
        if (parseIntNan(m.arrivalTime)>now){
          if (m.departureTime > Options.alertConfig.lastAttack){
            Options.alertConfig.lastAttack = m.departureTime;  
            t.newIncoming (m);
					}
					incomming = true;
        }
      }
    }
    if (Options.alertSound.alarmActive && (now > Options.alertSound.expireTime)) {
			t.stopSoundAlerts();
		}

    t.towerMarches = [];
    for (var i = 0; i < Cities.cities.length; i++) {
			var cId = Cities.cities[i].id;
			t['attackCount_' + cId] = 0;
			t['scoutCount_' + cId] = 0;
		}
    if (matTypeof(Seed.queue_atkinc) != 'array') {
			for (var k in Seed.queue_atkinc) {
				var m = Seed.queue_atkinc[k];
				if (parseIntNan(m.arrivalTime) > now) {
					t.handleTowerData(m);
				}
			}
    }
    for (var i = 0; i < Cities.cities.length; i++) {
			var cId = Cities.cities[i].id;
			document.getElementById('pbattackqueue_' + cId).value = 'Details' + t['attackCount_' + cId];
    }
  },   
  
  e_soundFinished : function (chan){//called by SWF when sound finishes playing
    var t = Tabs.tower;
    if (!Options.alertSound.alarmActive){
      document.getElementById('pbSoundStop').disabled = true;
    }
  },

  e_soundFileLoaded : function (){//called by SWF when sound file finishes loading
	  var t = Tabs.tower;
		if (t.mss.err)  
      document.getElementById('pbLoadStat').innerHTML = '<span class="boldRed">Error!</span>';
    else
      document.getElementById('pbLoadStat').innerHTML = 'Loaded';
  },  
  
  playSound : function (doRepeats){
    var t = Tabs.tower;
    document.getElementById('pbSoundStop').disabled = false;
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer);
    t.mss.play();
    t.soundStopTimer = setTimeout (function(){t.mss.stop(); t.e_soundFinished()}, Options.alertSound.playLength*1000);
    if (doRepeats && Options.alertSound.repeat)
      t.soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Options.alertSound.repeatDelay*60000);
    else
      Options.alertSound.alarmActive = false;
  },
        
  soundTheAlert : function (){
    var t = Tabs.tower;
    Options.alertSound.alarmActive = true;
    t.playSound(true);
  },
     
  stopSoundAlerts : function (){
    var t = Tabs.tower;
    document.getElementById('pbSoundStop').disabled = true;		
    t.mss.stop();
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer);
    Options.alertSound.alarmActive = false;
    Options.alertSound.expireTime = 0;
  },

  newIncoming : function (m){
    var t = Tabs.tower;
		
		//Check that chief of staff is necessary
		var city = m.toCityId;
		if (Options.alertConfig.hireGeneral && 
				Seed.leaders['city'+city].combatKnightId == 0) {
			t.hireGeneral(city);
		}
		var now = unixTime();
		//Check that attack booster is needed
		if (Options.alertConfig.useBoostAttack &&
				parseInt(Seed.bonus.bC2600.bT2601) < now) {		
			t.attackBoost(city);
		}
		//Check that health booster is needed
		if (Options.alertConfig.useBoostHealth &&
				parseInt(Seed.bonus.bC2700.bT2701) < now) {		
			t.attackHealth(city);
		}
		//Post in Chat
    t.postToChat (m);
  },

	attackHealth : function(city) {
		i24h = Seed.items.i271;
		i7d = Seed.items.i272;  
		if (i24h == 0 && i7d == 0) {
			Logbook.entry(Logs.globallog,'You could use a Health Booster. You have neither <b>Kevlar Vest</b> or <b>Body Armor</b>.');
			return;
		}
		if (i24h > 0) {
			var item = 271;
		} else {
			var item = 272;
		}
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = city;			
		params.iid = item;	
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "boostCombat.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					var expire = parseInt(rslt.expire, 10);
					if (Seed.playerEffects.length === 0) Seed.playerEffects = {};
					if (item === 261 || item === 262) Seed.bonus.bC2600.bT2601 = expire;
					else if (item === 271 || item === 272) Seed.bonus.bC2700.bT2701 = expire;
					Seed.items['i'+item]--;
					unsafeWindow.update_boosts();
					if (item == 271) {
						var iname = "Kevlar Vest";
					} else {
						var iname = "Body Armor";
					}
					Logbook.entry(Logs.globallog,'Health booster <b>'+iname+'</b> was used.');		
				} else {
					var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
					Logbook.entry(Logs.globallog,'Failed to use a health booster.<br><span class="boldRed">'+error+'</span>');			
				}
			},
			onFailure: function () {alert("Failed to use a health booster");}
		});			
	},
	
	attackBoost : function(city) {
		i24h = Seed.items.i261;
		i7d = Seed.items.i262;  
		if (i24h == 0 && i7d == 0) {
			Logbook.entry(Logs.globallog,'You could use an Attack booster. You do not have <b>Extra Ammo</b> or <b>Additional Weapons</b>.');
			return;
		}
		if (i24h > 0) {
			var item = 261;
		} else {
			var item = 262;
		}
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = city;			
		params.iid = item;	
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "boostCombat.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					var expire = parseInt(rslt.expire, 10);
					if (Seed.playerEffects.length === 0) Seed.playerEffects = {};
					if (item === 261 || item === 262) Seed.bonus.bC2600.bT2601 = expire;
					else if (item === 271 || item === 272) Seed.bonus.bC2700.bT2701 = expire;
					Seed.items['i'+item]--;
					unsafeWindow.update_boosts();
					if (item == 261) {
						var iname = "Extra Ammo";
					} else {
						var iname = "Additional Weapons";
					}
					Logbook.entry(Logs.globallog,'Attack Booster <b>'+iname+'</b> was used.');		
				} else {
					var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
					Logbook.entry(Logs.globallog,'Failed to use Attack Booster.<br><span class="boldRed">'+error+'</span>');			
				}
			},
			onFailure: function () {alert("Failed to use Attack Booster");}
		});			
	},
	
	hireGeneral : function(city) {
		var l1 = Seed.leaders['city'+city].resourcefulnessKnightId;
		var l2 = Seed.leaders['city'+city].politicsKnightId;		
		var l3 = Seed.leaders['city'+city].combatKnightId;		
		var l4 = Seed.leaders['city'+city].intelligenceKnightId;				
		var generals = Seed.knights['city'+city];
		var kid = 0;
		var experience = 0;
		for (var g in generals) {
			//Leader override
			if (generals[g].knightId == l1 || generals[g].knightId == l2 || generals[g].knightId == l3 || generals[g].knightId == l4) continue;
			//General Must have at least 2 Energy points
			if (generals[g].knightEnergy < 2) continue;
			//Find the best Free General
			if (generals[g].knightStatus == 1 && parseInt(generals[g].experience) > experience) {
				kid = generals[g].knightId;
				experience = parseInt(generals[g].experience);
			}
		}	
		if (kid == 0) {
			//No General Found
			Logbook.entry(Logs.globallog,'There was no free General in '+Cities.byID[city].name+' to be appointed Chief of Staff.');			
		} else {
			//General Found and set to Chief of Staff
			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			params.cid = city;			
			params.kid = kid;	
			params.pos = 13; //Chief of Staff
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "assignknight.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					if (rslt.ok) {
						var general = Seed.knights["city" + city];
						general["knt" + kid].knightEnergy--;
						Seed.leaders["city" + city].combatKnightId = kid.toString();
						Seed.leaders["city" + city].leaderCombat = general["knt" + kid].knightLevel;
						Logbook.entry(Logs.globallog,'General '+general["knt" + kid].knightName+' was '+Cities.byID[city].name+' set to Chief of Staff.');			
					} else {
						var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
						Logbook.entry(Logs.globallog,'Failed to set the Chief of Staff in '+Cities.byID[city].name+'.<br><span class="boldRed">'+error+'</span>');			
					}
				},
				onFailure: function () {alert("Failed to assign general");}
			});	
		}
	},
	
  sendalert : function (m){
    var t = Tabs.tower;
    var now = unixTime();
    if (Options.alertSound.enabled){
      t.soundTheAlert(m);
      if (m.arrivalTime > Options.alertSound.expireTime)
        Options.alertSound.expireTime = m.arrivalTime;
    }
  },

  ajaxSetDefMode : function (cityId, state, notify){
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cityId;
		params.state = state;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "gate.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					Seed.citystats["city" + cityId].gate = state;
					notify (state);
				}
			},
			onFailure: function () { alert("Error Setting Troops to Defend");}
		})
  },
  
  onUnload : function (){
  },

  postToChat : function (m){
    var t = Tabs.tower;
    var target, atkType, who;		
    if (m.marchType == 4){
      atkType = 'under attack';
    } else {
			return;
    }
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId ) {
      target = 'City at ('+ city.x +','+ city.y + ')';
	  } else {
      if (!Options.alertConfig.wilds)
        return;
      target = 'Wild';
	    for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' at ('+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord + ')';
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid]) {
      who = Seed.players['u'+m.pid].n;
			var alli = Seed.players['u'+m.pid].a;
    } else if (m.players && m.players['u'+m.pid]) {
      who = m.players['u'+m.pid].n;
			var alli = m.players['u'+m.pid].a;
    } else {
      who = 'Unknown';
			var alli = 'Unknown';
	}
    if (m.fromXCoord) {
      who += ' from ('+ m.fromXCoord +','+ m.fromYCoord + ')';
		}
		
		if (alli != 'Uknown' && Seed.allianceNames['a'+alli]) 
				var allianceName = Seed.allianceNames['a'+alli]+', ';
			else 
				var allianceName = '';
		who += ' ('+allianceName + getDiplomacy(alli)+')';
	
    var msg = Options.alertConfig.aPrefix +' ';
		msg += 'My '+ target +' is '+ atkType  +' from '+ who +'. Incoming Troops (arriving in '+ unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';
    var totTroops = 0;
		if (m.unts) {
			for (k in m.unts){
				var uid = parseInt(k.substr (1));
				msg += addCommas(m.unts[k]) + ' ' + t.uu[k] + ', ';
				totTroops += m.unts[k];
			}
			if (totTroops < Options.alertConfig.minTroops)
				return;
				
			msg = msg.slice (0, -2);
			msg += '.';
		} else {
			msg += 'Unknown.';
		}
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 17); //Message
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
        msg += ' My embassy has '+ availSlots +' of '+ emb.maxLevel +' slots free.';
			} else {
				msg += ' I have no Embassy in this City';
			}
      if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
      {
          msg+= ' My Troops are Hiding!';
      }
      if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
      {
          msg+= ' My Troops are Defending!';
      }
    }
		try {
			t.sendalert(m);
		} catch (e) {}
    if (!Options.alertConfig.aChat) return;
    sendChat("/a " + msg);//Alliance chat
	},
  
	handleTowerData: function(m){
		var t = Tabs.tower;
		var now = unixTime();
		var target, atkType, who, attackermight, allianceId, allianceName, diplomacy;
		var city = Cities.byID[m.toCityId];
        
    //ATKTYPE
		if (m.marchType == 4) {
			atkType = 'Attack';
      t['attackCount_' + m.toCityId]++;
    } else {
			return;
    }
	//Target
    if (city.tileId == m.toTileId)
			target = 'City at ' + city.x + ',' + city.y;
    else {
			target = 'Wilds';
			for (k in Seed.wilderness['city' + m.toCityId]) {
				if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
					target += ' at ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord;
					break;
				}
			}
		}
		//City Name
		var cityName = Cities.byID[m.toCityId].name;
		//Troops
		var units = [];
		for (i = 1; i < 25; i++) {
			units[i] = 0;
		}
		if (m.unts) {
			for (k in m.unts) {
				var uid = parseInt(k.substr(1));
				units[uid] = parseIntNan(m.unts[k]);
			}
		}
		//Attackers Information
		if (Seed.players['u' + m.pid]) {
			who = Seed.players['u' + m.pid].n;
			attackermight = Seed.players['u' + m.pid].m;
			if (Seed.players['u' + m.pid].a) 
				allianceId = ['a' + Seed.players['u' + m.pid].a ];
			else 
				allianceId = 'a0';			
			if (Seed.allianceNames[allianceId]) 
				allianceName = Seed.allianceNames[allianceId];
			else 
				allianceName = 'None.';
			diplomacy = getDiplomacy(allianceId);
		} else if (m.players && m.players['u' + m.pid]) {
			who = m.players['u' + m.pid].n;
			attackermight = parseInt(m.players['u' + m.pid].m);
			if (m.players['u' + m.pid].a) 
				allianceId = 'a' + m.players['u' + m.pid].a;
			else 
				allianceId = 'a0';			
			if (Seed.allianceNames[allianceId]) 
				allianceName = Seed.allianceNames[allianceId];
			else 
				allianceName = 'None.';
			diplomacy = getDiplomacy(allianceId);
		} else {
			who = 'None.';
			attackermight = 'None.';
			allianceId = 'None.';
			allianceName = 'None.';
			diplomacy = 'None.';
		}
	//Source
    if (m.fromXCoord) {
			var source = m.fromXCoord + ',' + m.fromYCoord;
		} else {
			var source = 'None.';
    }    
		var arrivingDatetime = new Date();
		arrivingDatetime.setTime(m.arrivalTime * 1000);
		var count = t.towerMarches.length + 1;
		t.towerMarches[count] = {
			added: now,
			cityId: m.toCityId,
			target: target,
			arrival: parseIntNan(m.arrivalTime),
			atkType: atkType,
			who: who,
			attackermight: attackermight,
			allianceName: allianceName,
			diplomacy: diplomacy,
			rtime: unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())),
			arrivingDatetime: arrivingDatetime,
			source:source,
			units: units,
		};
	},
	
	showTowerIncoming: function (cityId) {
		var t = Tabs.tower;
		var popTowerIncoming = null;
		var cityName = Tabs.build.getCityNameById(cityId);
		if (t.popTowerIncoming == null) {
			t.popTowerIncoming = new CPopup('pbtower_' + cityId, 0, 0, 1200, 500, true, function () {
				clearTimeout(t.timer);
			});
		}
		t.popTowerIncoming.show(false);
		var m = '<div id="pbCityTowerContent" style="max-height:460px; height:460px; overflow-y:auto">';
		t.popTowerIncoming.getMainDiv().innerHTML = m + '</div>';
		t.popTowerIncoming.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Attack Detail for ' + cityName + '</b>';
		t.addCityData2Pop(cityId);
		t.popTowerIncoming.show(true);
		clearTimeout(t.timer);
		t.timer = setTimeout(function () {t.showTowerIncoming(cityId)}, 5000);
	},
	
	addCityData2Pop: function (cityId) {
		var t = Tabs.tower;
		var rownum = 0;
		var names = ['Truck', 'AntiTank', 'Infantry', 'Sniper', 'SAM', 'Tank', 'Supply-H.', 'Fighter', 'Gunship', 'Bomber', 'Stealth', 'Nuke', 'Hellfire', 'Drone', 'SpecForces.', 'Transport','Ion','Sam Elite','Anti-tank Elite','X','Gunship Elite'];
		enc = {};
		numSlots = 0;
		var row = document.getElementById('pbCityTowerContent').innerHTML = "";
		if (matTypeof(Seed.queue_atkinc) != 'array') {
			for (k in Seed.queue_atkinc) {
				var march = Seed.queue_atkinc[k];
				if (march.marchType == 2) {
					numSlots++;
					city = march.toCityId;
					from = march.fromPlayerId;
					if (!enc[city]) enc[city] = {};
					if (!enc[city][from]) enc[city][from] = [];
					k = [];
					k[0] = parseInt(march.knightCombat);
					for (i = 1; i < 25; i++) {
						if (Options.encRemaining) 
							k[i] = parseInt(march['unit' + i + 'Return']);
						else 
							k[i] = parseInt(march['unit' + i + 'Count']);
					}
					k[100] = parseInt(march.marchStatus);
					var now = unixTime();
					k[101] = parseInt(march.destinationUnixTime) - now;
					enc[city][from].push(k);
				}
			}
		}
		var s1 = '';
		var s2 = '';
		var s3 = '';
		var tot = [];
		var atk = [];
		for (i = 0; i < 25; i++) {
			tot[i] = 0;
			atk[i] = 0;
		}

		s1 += '<style> .oben{background:white; padding: 2px;} .tot{background:#f0e0f8; padding: 2px;} .city1{background:#ffffaa; padding: 2px;} .attack{background:#FF9999; padding: 2px;} .own{background:#66FF66; padding: 2px;}</style>';
		s1 += '<table width="100%"><tr><td class="oben">&nbsp;</td>';

		for (k = 0; k < names.length; k++)
		s1 += '<td style="text-align:right;" class="oben" width="5%"><b>' + names[k] + '</b></td>';
		s1 += '</tr>';
		dest = cityId;
		if (enc[dest]) {
			for (p in enc[dest]) {
				try {
					player = Seed.players['u' + p].n;
				} catch (err) {
					player = '???';
				}
				for (m = 0; m < enc[dest][p].length; m++) {
					knight = '';
					if (enc[dest][p][m][0] > 0)
						knight = ' (Gen.: ' + enc[dest][p][m][0] + ')';
					stat = 'x';
					if (enc[dest][p][m][100] == 1) {
						stat = ' (' + timestr(enc[dest][p][m][101]) + ')';
						if (enc[dest][p][m][101] < 0) 
							stat = ' (Defended)';
						else 
							stat = ' (' + timestr(enc[dest][p][m][101]) + ')';
					}
					if (enc[dest][p][m][100] == 2) {
						stat = ' (Defended)';
					}
					s1 += '<tr><td class="city1">';
					//s1 += '<input id="sendhome_' + m + '" type="submit" value="X" title="Troops sent home">&nbsp;';
					s1 += '<b>' + player + '</b>' + stat + knight;
					s1 += '</td>'
					var ii = 0;
					for (i = 1; i < 25; i++) {
						if (i == 2 || i == 3 || i == 14 || i == 23) continue;
						num = enc[dest][p][m][i];
						s1 += '<td style="text-align:right;" class="city1">' + addCommas(num) + '</td>';
						tot[i] += num;
					}
					s1 += '</tr>';

				}
			}
		} else {
			s1 += '<tr><td class="city1"><b>Reinforcements (No):</b></td>'
			for (i = 1; i < 25; i++) {
				if (i == 2 || i == 3 || i == 14 || i == 23) continue;
				s1 += '<td style="text-align:right;" class="city1">0</td>';
			}
			s1 += '</tr>';
		}
		s1 += '<tr><td colspan="25"><br></tr>';
		s1 += '<tr><td class="own"><B>Your Troops:</b></td>';
		//OWNTROOPS
		var ownTroops = "";
		for (r = 1; r < 25; r++) {
			if (r == 2 || r == 3 || r == 14 || r == 23) continue;
			cityString = 'city' + cityId;
			num = parseInt(Seed.units[cityString]['unt' + r]);
			s1 += '<td style="text-align:right;" class="own">' + addCommas(num) + '</td>';
			tot[r] += num;
		}

		s3 += '<td class="city"></td><tr><td colspan="18"><br></td></tr><tr><td class="tot"><b>Incoming Attacks (single):</b></td>';

		if (t.towerMarches.length > 0) {
			for (k in t.towerMarches) {
				if (typeof t.towerMarches[k].atkType != 'undefined') {
					if (t.towerMarches[k].cityId == cityId) {
						s3 += '<table>';
						s3 += '<tr><td colspan="2">&nbsp;</td></tr>';
						s3 += '<tr>';
						s3 += '<td><b>To:&nbsp;&nbsp;</b></td>';
						s3 += '<td>' + t.towerMarches[k].target + '</td>';
						s3 += '</tr>'
						
						s3 += '<tr>';						
						s3 += '<td><b>General:&nbsp;&nbsp;</b></td>';
						s3 += '<td>' + t.towerMarches[k].who + '</td>';						
						s3 += '</tr>'
						
						s3 += '<tr>';							
						s3 += '<td><b>Source:&nbsp;&nbsp;</b></td>'
						s3 += '<td>' + t.towerMarches[k].source + '</td>';	
						s3 += '</tr>'

						s3 += '<tr>';							
						s3 += '<td><b>Power:&nbsp;&nbsp;</b></td>'
						s3 += '<td>' + addCommas(t.towerMarches[k].attackermight) + '</td>';						
						s3 += '</tr>'
						
						s3 += '<tr>';
						s3 += '<td><b>Alliance:&nbsp;&nbsp;</b></td>'
						s3 += '<td>' + t.towerMarches[k].allianceName + '</td>';
						s3 += '</tr>'
						
						s3 += '<tr>';
						s3 += '<td><b>Diplomacy:&nbsp;&nbsp;</b></td>';
						s3 += '<td>' + t.towerMarches[k].diplomacy + '</td>';						
						s3 += '</tr>'
						
						s3 += '<tr>';						
						s3 += '<td><b>Arriving:&nbsp;&nbsp;</b></td>'
						s3 += '<td>' + t.towerMarches[k].rtime + '</td>';						
						s3 += '</tr>'
						s3 += '</table>';
						
						s3 += '<table cellspacing="0" width="100%"><tr><td style="text-align:left;">&nbsp;</td>';
						for (n = 0; n < names.length; n++)
						s3 += '<td style="text-align:right;" width="5%"><b>' + names[n] + '</b></td>';
						s3 += '</tr><tr><td class="attack" style="text-align:left;"><b>Units:</b></td>';
						var m = Seed.queue_atkinc;
						for (u = 1; u < 25; u++) {
							if (u == 2 || u == 3 || u == 14 || u == 23) continue;
							num = t.towerMarches[k].units[u];
							s3 += '<td class="attack" style="text-align:right;">' + addCommas(parseInt(num)) + '</td>';
							atk[u] += parseInt(num);
						}
						s3 += '</tr></table>';
					}
				}
			}
		}
		s2 += '<tr><td colspan="18"><br></td></tr><tr><td class="attack"><b>Attack (total):</b></td>';
		for (a = 1; a < 25; a++) {
			if (a == 2 || a == 3 || a == 14 || a == 23) continue;
			s2 += '<td class="attack" style="text-align:right;">' + addCommas(atk[a]) + '</td>';
		}
		var html = s1 + s2 + s3;
		document.getElementById('pbCityTowerContent').innerHTML = html;
		//Buttons Send Home to bind
	},
	//Function not in use yet
	sendReinforcmentHome: function (mid, cid, fromUid, fromCid, upkeep) { 
	//mid, cid, fromUid, fromCid, upkeep
   	var params = Object.clone(g_ajaxparams);
   	params.mid = mid;
   	params.cid = cid;
   	params.fromUid = fromUid;
   	params.fromCid = fromCid;
   	new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
   		method: "post",
   		parameters: params,
   		onSuccess: function (transport) {
   			var rslt = eval("(" + transport.responseText + ")");
   			if (rslt.ok) {
   				Modal.showAlert(g_js_strings.kickout_allies.troopshome);
   				seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;
   				if (parseInt(fromUid) == parseInt(tvuid)) {
   					var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];
   					var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));
   					curmarch.returnUnixTime = unixTime() + marchtime;
   					curmarch.marchStatus = 8
   				}
   				delete seed.queue_atkinc["m" + mid]
   			} else {
   				Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
   			}
   		},
   		onFailure: function () {}
   	})
	},	
}

/**************************** Transport Tab *******************************/
Tabs.transport = {
  tabOrder: 3,
  tabLabel: 'Transport',
	tabDisabled : !ENABLE_TRANSPORT,
  myDiv: null,
  timer: null,
  traderState: [],
  lTR: [],
  tradeRoutes: [],
  checkdotradetimeout: null,
  count:0,
  check:false,
	uu: {
		'u1'  : 'Trucks',
		'u9'  : 'Supply-Helicopter',
		'u19' : 'Cargo Transport',								
	},
	reportTimer: null,
	init: function(div){
		var t = Tabs.transport;
		t.myDiv = div;
		t.traderState = {running: false,};
		t.readTraderState();
	  	t.readTradeRoutes();
		var out = [];
		//Header
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>Automatic Transport</b>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');
		out.push('<table width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');
		if (t.traderState.running == false) {
			out.push('<input id="pbTraderState" type="submit" value="Transport = Off">');
		} else {	
			out.push('<input id="pbTraderState" type="submit" value="Transport = On">');	
			t.report();
		}
		out.push('&nbsp;&nbsp;&nbsp;<input id="pbShowRoutes" type="submit" value="Display Transport Routes">');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');
		out.push('<br>');
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>Options for Transport Routes</b>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');
		out.push('<table width="100%">');
		out.push('<tr>');		
		out.push('<td>');		
		out.push('Interval Between Transports: ');
		out.push('<input id="pbtransportinterval" style="text-align:center;" type="text" size="2" value="'+Options.transportinterval+'"> Minutes');
		out.push('</td>');
		out.push('</tr>');	
		out.push('<tr>');		
		out.push('<td>');		
		out.push('Do not send if less than ');
		out.push('<input id="pbminwagons" style="text-align:center;" type="text" size="2" value="'+Options.minwagons+'"> Troops are needed. ');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td>');		
		out.push('<input id="ptdeletereports" type="checkbox"'+(Options.deletetransports?' checked="checked"':'')+'>&nbsp;');
		out.push('Delete transport reports (between your cities.)');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');			
		out.push('<br>');
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>Transport routes Set</b>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');
		out.push('When the "Troops" = 0, send the maximum amount of resources, less the "Min. Stock".<br>');
		out.push('Transport Gold if there is Room.');
		out.push('<br>');		
		out.push('<br>');
		out.push('<table id="pbaddtraderoute">');
		out.push('<tr>');	
		out.push('<td>From City:&nbsp;</td>');
		out.push('<td><span id="ptrescity"></span></td>');
		out.push('</tr>');
		out.push('<tr>');			
		out.push('<td>To the City:&nbsp;</td>');
		out.push('<td><span id="ptcityTo"></span></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td>Or to the Coords (x,y):&nbsp;</td>');
		out.push('<td>');
		out.push('<input id="ptcityX" style="text-align:center;" type="text" value="474" size="3">&nbsp;/&nbsp;');
		out.push('<input id="ptcityY" style="text-align:center;" type="text" value="602" size="3">')
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		out.push('<table id="pbaddtraderoute">');
		out.push('<tr>');
		out.push('<td>Type:&nbsp;</td>');
		out.push('<td>');
		out.push('<select id="TransportTroop">');
		for (y in t.uu) {
			var troop = t.uu[y];
			out.push('<option value="'+findoptvalue(y)+'">');
			out.push(troop);
			out.push('</option>');
		}
		out.push('</select>');
		out.push('</td>');		
		out.push('<td>&nbsp;&nbsp;Available:&nbsp;');
		out.push('<span id="TroopAmount"></span>');
		out.push('&nbsp;/&nbsp;Capacity:&nbsp;');
		out.push('<span id="CarryAmount"></span>');
		out.push('</td>');		
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td>Troops:&nbsp;</td>');
		out.push('<td>');
		out.push('<input id="TroopsToSend" style="text-align:center;" type="text" size="6" maxlength="6" value="0">');
		out.push('&nbsp;&nbsp;');
		out.push('<input id="MaxTroops" type="submit" value="Max">');
		out.push('</td>');
		out.push('<td>');
		out.push('&nbsp;&nbsp;<input id="FillInMax" type="submit" value="-">&nbsp;');
		out.push('<span id="Calc"></span>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');		
		//Resources
		out.push('<table id="pbaddtraderoute" width="100%">');
		out.push('<tr>');			
		out.push('<td><b>Resources&nbsp;</b></td>');
		out.push('<td style="text-align:right;"><b>Source</b></td>');
		out.push('<td style="text-align:right;"><b>Target</b></td>');
		out.push('<td style="text-align:center;">&nbsp;<b>Enabled?</b>&nbsp;</td>');
		out.push('<td><b>Min. Inventory</b></td>');
		out.push('<td><b>Max. Amount</b></td>');
		out.push('<td>&nbsp;</td>');
		out.push('</tr>');
		//Food
		out.push('<tr>');			
		out.push('<td>Food:&nbsp;</td>');
		out.push('<td id="TransRec1" style="text-align:right;"></td>');
		out.push('<td id="HaveRec1" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipFood" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountFood" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountFood" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxFood" type="submit" value="Max"></td>');
		out.push('</tr>');
		//Oil
		out.push('<tr>');			
		out.push('<td>Oil:&nbsp;</td>');
		out.push('<td id="TransRec2" style="text-align:right;"></td>');
		out.push('<td id="HaveRec2" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipOil" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountOil" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountOil" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxOil" type="submit" value="Max."></td>');
		out.push('</tr>');	
		//Stone
		out.push('<tr>');			
		out.push('<td>Stone:&nbsp;</td>');
		out.push('<td id="TransRec3" style="text-align:right;"></td>');
		out.push('<td id="HaveRec3" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipStone" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountStone" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountStone" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxStone" type="submit" value="Max"></td>');
		out.push('</tr>');	
		//Steel
		out.push('<tr>');			
		out.push('<td>Steel:&nbsp;</td>');
		out.push('<td id="TransRec4" style="text-align:right;"></td>');
		out.push('<td id="HaveRec4" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipSteel" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountSteel" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountSteel" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxSteel" type="submit" value="Max"></td>');
		out.push('</tr>');	
		//Titanium
		out.push('<tr>');			
		out.push('<td>Titanium:&nbsp;</td>');
		out.push('<td id="TransRec5" style="text-align:right;"></td>');
		out.push('<td id="HaveRec5" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipTita" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountTita" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountTita" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxTita" type="submit" value="Max"></td>');
		out.push('</tr>');
		//Graphene
		out.push('<tr>');
		out.push('<td>Graphene:&nbsp;</td>');
		out.push('<td id="TransRec6" style="text-align:right;"></td>');
		out.push('<td id="HaveRec6" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipGraph" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountGraph" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountGraph" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxGraph" type="submit" value="Max"></td>');
		out.push('</tr>');
		//Gold
		out.push('<tr>');
		out.push('<td>Gold:&nbsp;</td>');
		out.push('<td id="TransGold" style="text-align:right;"></td>');
		out.push('<td id="HaveGold" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbshipGold" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetamountGold" type="text" size="9" maxlength="15" value="0" disabled="true"></td>');
		out.push('<td><input id="pbtradeamountGold" type="text" size="9" maxlength="15" value="0"></td>');
		out.push('<td><input id="MaxGold" type="submit" value="Max"></td>');
		out.push('</tr>');
		out.push('</table>');
		//Name
		out.push('<tr>');
		out.push('<td>Name:&nbsp;</td>');
		out.push('<td id="inputName" style="text-align:right;"></td>');
		out.push('<td style="text-align:center;"><input id="pbName" type="checkbox" unchecked="true"></td>');
		out.push('<td><input id="pbtargetName" type="text" size="9" maxlength="15" value="Set Name" disabled="true"></td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');		
		//Buttons
		out.push('<div id="pbTraderDivDRoute" style="text-align:center;">');
		out.push('<input id="pbSaveRoute" type="submit" value="Add Route">&nbsp;&nbsp;');	
		out.push('<input id="pbManualSend" type="submit" value="Manual Transport">');
		out.push('</div>');
		out.push('<br>');
		out.push('<div id="errorSpace"></div>');
		//Logbook
		out.push('<hr>');
		out.push('<table width="100%">');
		out.push('<tr>');
		out.push('<td><b>Transport Log:</b><br><br></td>');
		out.push('<td style="text-align: right;">');
		out.push('<input id="ptButClearTransLog" type="submit" name="ClearBLog" value="Clear Transport Log">');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td colspan="2">');
		out.push('<div id="pbtranslog" style="height: 150px; overflow: auto;"></div>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');

    t.myDiv.innerHTML = out.join('');

		try {	
			t.e_tradeRoutes();
		} catch (e) { }	

		document.getElementById('TransportTroop').value = 'unt19';
      
		t.tcp = new CdispCityPicker ('pttrader', document.getElementById('ptrescity'), true, t.updateResources, 0);
		t.tcpto = new CdispCityPicker ('pttraderTo', document.getElementById('ptcityTo'), true, t.clickCitySelect).bindToXYboxes(document.getElementById ('ptcityX'), document.getElementById ('ptcityY'));

		document.getElementById('ptdeletereports').addEventListener('click', function(){
			if (document.getElementById('ptdeletereports').checked == true) {
				document.getElementById('ptdeletereports').checked = true;
				Options.deletetransports = true;
			} else {
				document.getElementById('ptdeletereports').checked = false;
				Options.deletetransports = false;
			}
			saveOptions();
		},false);

		document.getElementById('TransportTroop').addEventListener('change', function(){t.updateTroops();}, false);
		document.getElementById('pbTraderState').addEventListener('click', function(){t.toggleTraderState(this);}, false);
		document.getElementById('pbSaveRoute').addEventListener('click', function(){t.addTradeRoute();}, false);
		document.getElementById('pbManualSend').addEventListener('click', function(){t.ManualTransport();}, false);
		document.getElementById('pbShowRoutes').addEventListener('click', function(){t.showTradeRoutes();}, false);
		document.getElementById('FillInMax').addEventListener('click', function(){document.getElementById('TroopsToSend').value = t.TroopsNeeded;}, false);

		document.getElementById('MaxTroops').addEventListener('click', function(){
			var rallypointlevel = t.getRallypoint('city' + t.tcp.city.id);
			var max = t.Troops;
			if (t.Troops > (rallypointlevel*10000) ) max = (rallypointlevel*10000);
			document.getElementById('TroopsToSend').value = max;
	  }, false);
		
		document.getElementById('MaxFood').addEventListener('click', function(){
			t.Food = 0;
			document.getElementById('pbtradeamountFood').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);
		
		document.getElementById('MaxOil').addEventListener('click', function(){
			t.Oil = 0;
			document.getElementById('pbtradeamountOil').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);
		
		document.getElementById('MaxStone').addEventListener('click', function(){
			t.Stone = 0;
			document.getElementById('pbtradeamountStone').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);
		
		document.getElementById('MaxSteel').addEventListener('click', function(){
			t.Steel = 0;
			document.getElementById('pbtradeamountSteel').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);

		document.getElementById('MaxGraph').addEventListener('click', function(){
			t.Graph = 0;
			document.getElementById('pbtradeamountGraph').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);

		document.getElementById('MaxTita').addEventListener('click', function(){
			t.Tita = 0;
			document.getElementById('pbtradeamountTita').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);
		
		document.getElementById('MaxGold').addEventListener('click', function(){
			t.Gold = 0;
			document.getElementById('pbtradeamountGold').value = t.MaxLoad - (t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita);
		}, false);
      
		document.getElementById('pbtransportinterval').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtransportinterval').value)){ 
				document.getElementById('pbtransportinterval').value = 60;
			}
			Options.transportinterval = document.getElementById('pbtransportinterval').value;
			saveOptions();
		}, false);
      
		document.getElementById('pbtargetamountFood').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountFood').value)) 
				document.getElementById('pbtargetamountFood').value = 0;
		}, false);
		
		document.getElementById('pbtargetamountOil').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountOil').value)) 
				document.getElementById('pbtargetamountOil').value = 0;
		}, false);
		
		document.getElementById('pbtargetamountStone').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountStone').value)) 
				document.getElementById('pbtargetamountStone').value = 0;
		}, false);
		
		document.getElementById('pbtargetamountSteel').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountSteel').value)) 
				document.getElementById('pbtargetamountSteel').value = 0;
		}, false);

		document.getElementById('pbtargetamountGraph').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountGraph').value)) 
				document.getElementById('pbtargetamountGraph').value = 0;
		}, false);

		document.getElementById('pbtargetamountTita').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountTita').value)) 
				document.getElementById('pbtargetamountTita').value = 0;
		}, false);
		
		document.getElementById('pbtargetamountGold').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtargetamountGold').value)) 
				document.getElementById('pbtargetamountGold').value = 0;
		}, false);

		
		document.getElementById('pbtradeamountFood').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountFood').value)) 
				document.getElementById('pbtradeamountFood').value = 0;
		}, false);
		
		document.getElementById('pbtradeamountOil').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountOil').value)) 
				document.getElementById('pbtradeamountOil').value = 0;
		}, false);
			
		document.getElementById('pbtradeamountStone').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountStone').value)) 
				document.getElementById('pbtradeamountStone').value= 0;
		}, false);
		
		document.getElementById('pbtradeamountSteel').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountSteel').value)) 
				document.getElementById('pbtradeamountSteel').value = 0;
		}, false);

		document.getElementById('pbtradeamountGraph').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountGraph').value)) 
				document.getElementById('pbtradeamountGraph').value = 0;
		}, false);
		
		document.getElementById('pbtradeamountTita').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountTita').value)) 
				document.getElementById('pbtradeamountTita').value = 0;
		}, false);
		
		document.getElementById('pbtradeamountGold').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbtradeamountGold').value)) 
				document.getElementById('pbtradeamountGold').value = 0;
		}, false);
		
		document.getElementById('pbtargetName').addEventListener('change', function(){document.getElementById('pbtargetName').value;}, false);
			
			
		document.getElementById('pbminwagons').addEventListener('keyup', function(){
			if (isNaN(document.getElementById('pbminwagons').value)) 
				document.getElementById('pbminwagons').value = 100;
			Options.minwagons = parseInt(document.getElementById('pbminwagons').value);
			saveOptions();
		}, false)
      
		document.getElementById('pbshipFood').addEventListener('click', function(){
			if (document.getElementById('pbshipFood').checked == false) {
				document.getElementById('pbtargetamountFood').disabled = true;
			} else {
				document.getElementById('pbtargetamountFood').disabled = false;
			}
		},false);
		
		document.getElementById('pbshipOil').addEventListener('click', function(){
			if (document.getElementById('pbshipOil').checked == false) {
				document.getElementById('pbtargetamountOil').disabled = true;
			} else {
				document.getElementById('pbtargetamountOil').disabled = false;
			}
		},false);
		
		document.getElementById('pbshipStone').addEventListener('click', function(){
			if (document.getElementById('pbshipStone').checked == false) {
				document.getElementById('pbtargetamountStone').disabled = true;
			} else {
				document.getElementById('pbtargetamountStone').disabled = false;
			}
		},false);
		
		document.getElementById('pbshipSteel').addEventListener('click', function(){
			if (document.getElementById('pbshipSteel').checked == false) {
				document.getElementById('pbtargetamountSteel').disabled = true;
			} else {
				document.getElementById('pbtargetamountSteel').disabled = false;
			}
		},false);

		document.getElementById('pbshipGraph').addEventListener('click', function(){
			if (document.getElementById('pbshipGraph').checked == false) {
				document.getElementById('pbtargetamountGraph').disabled = true;
			} else {
				document.getElementById('pbtargetamountGraph').disabled = false;
			}
		},false);
		
		document.getElementById('pbshipTita').addEventListener('click', function(){
			if (document.getElementById('pbshipTita').checked == false) {
				document.getElementById('pbtargetamountTita').disabled = true;
			} else {
				document.getElementById('pbtargetamountTita').disabled = false;
			}
		},false);
		
		document.getElementById('pbshipGold').addEventListener('click', function(){
			if (document.getElementById('pbshipGold').checked==false) {
				document.getElementById('pbtargetamountGold').disabled = true;
			} else {
				document.getElementById('pbtargetamountGold').disabled = false;
			}
		},false);
		
		document.getElementById('pbName').addEventListener('click', function(){
			if (document.getElementById('pbName').checked==false) {
				document.getElementById('pbtargetName').disabled = true;
			} else {
				document.getElementById('pbtargetName').disabled = false;
			}
		},false);

		document.getElementById('ptButClearTransLog').addEventListener('click', function(){
			Logs.translog = [];
			saveLogs();
			t.Logbook();
		},false);
		
		if (!Logs.translog) {
			Logs.translog = [];
			saveLogs();		
		}
		
		t.Logbook();
	},

	Logbook: function() {
    var t = Tabs.transport;
		var log = Logbook.output(Logs.translog);
		document.getElementById('pbtranslog').innerHTML = log;
	},
	
	updateResources : function (){
		var t = Tabs.transport;
		var ToCity = null;
		for (var i=1;i<=6;i++) {
			document.getElementById('TransRec'+i).innerHTML = addCommas(parseInt(Seed.resources["city" + t.tcp.city.id]['rec'+i][0]/3600));
		}
		document.getElementById('TransGold').innerHTML = addCommas(parseInt(Seed.citystats["city" + t.tcp.city.id]['gold'][0]));
		for (ii in Seed.cities) {
			if (Seed.cities[ii][2] == document.getElementById ('ptcityX').value && 
					Seed.cities[ii][3] == document.getElementById ('ptcityY').value) {
				ToCity = Seed.cities[ii][0];
			}
		}
		for (var i=1;i<=6;i++) {
			if (ToCity != null) {
				document.getElementById('HaveRec'+i).innerHTML = addCommas(parseInt(Seed.resources["city" + ToCity]['rec'+i][0]/3600));
			} else {
				document.getElementById('HaveRec'+i).innerHTML = "----";
			}
		}
		if (ToCity != null) {
			document.getElementById('HaveGold').innerHTML = addCommas(parseInt(Seed.citystats["city" + ToCity]['gold'][0]));
		} else {
			document.getElementById('HaveGold').innerHTML =  "----"; 
		}
	},
    
	updateTroops : function (city){
		var t = Tabs.transport;
		var fontcolor = 'black';
		t.Food = parseInt(document.getElementById('pbtradeamountFood').value);
		t.Oil = parseInt(document.getElementById('pbtradeamountOil').value);
		t.Stone = parseInt(document.getElementById('pbtradeamountStone').value);
		t.Steel = parseInt(document.getElementById('pbtradeamountSteel').value);
		t.Graph = parseInt(document.getElementById('pbtradeamountGraph').value);
		t.Tita = parseInt(document.getElementById('pbtradeamountTita').value);
		t.Gold = parseInt(document.getElementById('pbtradeamountGold').value);
		var unit = document.getElementById('TransportTroop').value;
		t.Troops = parseInt(Seed.units['city' + t.tcp.city.id][unit]);
		var tch10 = parseInt(Seed.tech.tch10);
		if (tch10 == 11) tch10 = 13;
		if (tch10 == 10) tch10 = 11;		
		var Load = parseInt(unsafeWindow.unitstats[unit]['5'])
		var LoadUnit = (tch10 * ((Load/100)*10)) + Load;
		var GlobalMaxLoad = t.Troops * LoadUnit;
		t.MaxLoad = parseInt(document.getElementById('TroopsToSend').value) * LoadUnit;
		t.TroopsNeeded = (t.Food + t.Oil + t.Stone + t.Steel + t.Graph + t.Tita + t.Gold) / LoadUnit;
		t.TroopsNeeded = t.TroopsNeeded.toFixed(0);	
		if (t.TroopsNeeded < ((t.Food + t.Oil + t.Stone + t.Steel + t.Graph + t.Tita + t.Gold) / LoadUnit)) {
			t.TroopsNeeded++;	
    }    
		if ( t.TroopsNeeded > t.Troops) {
			fontcolor = 'red';
		}
		if (t.Troops > 0) {
			document.getElementById('TroopAmount').innerHTML = '<span style="color:'+fontcolor+'">' + addCommas(t.Troops) + '</span>';
    } else {
			document.getElementById('TroopAmount').innerHTML = 0;
		}
		if (GlobalMaxLoad > 0) {
			document.getElementById('CarryAmount').innerHTML = addCommas(GlobalMaxLoad);
		} else {
			document.getElementById('CarryAmount').innerHTML = 0;
    }	
		document.getElementById('Calc').innerHTML = 'Resources: ' +  addCommas(t.Food + t.Oil + t.Stone + t.Steel + t.Gold + t.Graph + t.Tita) + ' / ' + addCommas(t.MaxLoad) + '&nbsp;(Troops: ' + addCommas(t.TroopsNeeded) + ')';
	},    
    
	getRallypoint: function(cityId){
		var t = Tabs.transport;
		for (var o in Seed.buildings[cityId]) {
			var buildingType = parseInt(Seed.buildings[cityId][o][0]);
			var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
			if (buildingType == 12){
				return parseInt(buildingLevel);
				break;
			}
		}
		return 0;
	},

	e_tradeRoutes: function(){
		var t = Tabs.transport;
		var now = new Date();
		if (t.traderState.running == true) {
			var now = new Date().getTime()/1000.0;
			now = now.toFixed(0);
			var last = Options.lasttransport;
			if (now > (parseInt(last) + (Options.transportinterval*60))) {
				t.checkdoTrades();
			}
    }
	  setTimeout(function(){ t.e_tradeRoutes(); }, Options.transportinterval*1000);	  
	},
    	
	delTradeRoutes: function() {
		var t = Tabs.transport;	
		t.tradeRoutes= [];
	},
	
	checkcoords : function (obj){
		var t = Tabs.transport;
		if (obj.id == 'pbok') {
			t.check = true;
			t.addTradeRoute();
		}
		return;			
	},
	
	addTradeRoute: function () {
		var valid = true;
		var t = Tabs.transport;
		var city = t.tcp.city.id;
		if (document.getElementById('ptcityX').value == 0 && 
				document.getElementById('ptcityY').value == 0 && 
				!t.check) {
			document.getElementById('errorSpace').innerHTML = '<span class="boldRed">You can not transport to 0,0!</span>';
			setTimeout(function(){ (document.getElementById('errorSpace').innerHTML = ''); }, 5000);
			return;
		}
		var ship_Food = document.getElementById('pbshipFood').checked;
		var ship_Oil = document.getElementById('pbshipOil').checked;
		var ship_Stone = document.getElementById('pbshipStone').checked;
		var ship_Steel = document.getElementById('pbshipSteel').checked;
		var ship_Graph = document.getElementById('pbshipGraph').checked;
		var ship_Tita = document.getElementById('pbshipTita').checked;
		var ship_Gold = document.getElementById('pbshipGold').checked;
		var target_Food = document.getElementById('pbtargetamountFood').value;
		var target_Oil = document.getElementById('pbtargetamountOil').value;
		var target_Stone = document.getElementById('pbtargetamountStone').value;
		var target_Steel = document.getElementById('pbtargetamountSteel').value;
		var target_Graph = document.getElementById('pbtargetamountGraph').value;
		var target_Tita = document.getElementById('pbtargetamountTita').value;		
		var target_Gold = document.getElementById('pbtargetamountGold').value;
		var trade_Food = document.getElementById('pbtradeamountFood').value;
		var trade_Oil = document.getElementById('pbtradeamountOil').value;
		var trade_Stone = document.getElementById('pbtradeamountStone').value;
		var trade_Steel = document.getElementById('pbtradeamountSteel').value;
		var trade_Graph = document.getElementById('pbtradeamountGraph').value;
		var trade_Tita = document.getElementById('pbtradeamountTita').value;
		var trade_Gold = document.getElementById('pbtradeamountGold').value;
		var target_x = document.getElementById('ptcityX').value;
		var target_y = document.getElementById('ptcityY').value;
		var TroopType = document.getElementById('TransportTroop').value;
		var ship_Name = document.getElementById('pbtargetName').value;
		var route_state = true;
				
		if (valid == true) {
			var lTR = t.tradeRoutes;
			lTR.push({
				city:			city,
				ship_Food:		ship_Food,
				target_Food:	target_Food,
				trade_Food:		trade_Food,
				ship_Oil:		ship_Oil,
				target_Oil:		target_Oil,
				trade_Oil:		trade_Oil,
				ship_Stone:		ship_Stone,
				target_Stone:	target_Stone,
				trade_Stone:	trade_Stone,
				ship_Steel:		ship_Steel,
				target_Steel:	target_Steel,
				trade_Steel:	trade_Steel,
				ship_Graph:		ship_Graph,
				target_Graph:	target_Graph,
				trade_Graph:	trade_Graph,
				ship_Tita:		ship_Tita,
				target_Tita:	target_Tita,
				trade_Tita:		trade_Tita,
				ship_Gold:		ship_Gold,
				target_Gold:	target_Gold,
				trade_Gold:		trade_Gold,
				target_x:		target_x,
				target_y:		target_y,
				TroopType:		TroopType,
				route_state:	route_state,
				ship_Name:		ship_Name
			});
		}
		document.getElementById('pbTraderDivDRoute').style.background = 'maroon';
		setTimeout(function(){ (document.getElementById('pbTraderDivDRoute').style.background =''); }, 1000);
	},
	
	showTradeRoutes: function () {
		var t = Tabs.transport;
		var popTradeRoutes = null;
		t.popTradeRoutes = new CPopup('pbShowTrade', 0, 0, 550, 500, true, function() {clearTimeout (1000);});
		var m = '<div style="max-height:460px; height:460px; overflow-y:auto">';
		m += '<table width="100%"><tr><td id="pbRoutesQueue"></td></tr></table></div>';      
		t.popTradeRoutes.getMainDiv().innerHTML = m;
		t.popTradeRoutes.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Transport Route:</b>';
		t.paintTradeRoutes();
		t.popTradeRoutes.show(true)	;
	},
	
	paintTradeRoutes: function(){
		var t = Tabs.transport;
		var r = t.tradeRoutes;
		var cityname;
		var citynameTo = null;
		var m = '<br><table id="paintRoutes" width="99%">'; 
		for (var i=0;i<(r.length);i++) {
			citynameTo = null;
			for (var y=0; y< Seed.cities.length;y++) {
				if (parseInt(Seed.cities[y][0]) == r[i].city) {
					var cityname = Seed.cities[y][1];
				}
				if (parseInt(Seed.cities[y][2]) == r[i].target_x && 
						parseInt(Seed.cities[y][3]) == r[i].target_y) {
					var citynameTo = Seed.cities[y][1];
				}
			}    
			var queueId = i;
			var name = t.lTR.ship_name;
			if (citynameTo == null) {
				var TO = r[i].target_x +','+ r[i].target_y;
			} else {
				var TO = citynameTo;
			}
			if (r[i].route_state) {
				var status = '<span style="color:green;">Enabled</span>';
			} else {
				var status = '<span style="color:red;">Disabled</span>';
			}
			if (r[i].TroopType == undefined) {
				var unit = 'unt9';
			} else {
				var unit = r[i].TroopType;
			}
			var unit = 'u' + unit.substring(3)
			m += '<tr><td style="width:20px; border-top:1px solid silver;padding-top:10px;">'+(i+1)+'</td>';
			m += '<td style="border-top:1px solid silver;padding-top:10px;"><input type="submit" onclick="traceEdit('+queueId+')" value="Edit">&nbsp;&nbsp;';
			m += '<input type="submit" onclick="traceDelete('+queueId+')" value="Delete">&nbsp;&nbsp;';
			m += status+'&nbsp;&nbsp;';
			m += r[i].ship_Name+'</td>';
			m += '<td style="border-top:1px solid silver;padding-top:10px;">&nbsp;</td>';	
			m += '</tr>';
			
			m += '<tr>';
			m += '<td>&nbsp;</td>';
			m += '<td>';
			
			m += '<br><table>';
			m += '<tr><td style="padding-bottom:5px;"><b>Resource&nbsp;</b></td><td style="text-align:right;padding-bottom:5px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Min. Inventory</b></td><td style="text-align:right;padding-bottom:5px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Max. Amount</b></td></tr>';
			if (r[i].ship_Food) 
				m += '<tr><td>Food:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Food) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Food)+'</td></tr>';
			if (r[i].ship_Oil) 
				m += '<tr><td>Oil:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Oil) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Oil)+'</td></tr>';
			if (r[i].ship_Stone) 
				m += '<tr><td>Stone:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Stone) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Stone)+'</td><tr>';
			if (r[i].ship_Steel) 
				m += '<tr><td>Steel:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Steel) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Steel)+'</td></tr>';
			if (r[i].ship_Tita) 
				m += '<tr><td>Titanium:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Tita) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Tita)+'</td></tr>';
			if (r[i].ship_Graph) 
				m += '<tr><td>Graphene:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Graph) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Graph)+'</td></tr>';
			if (r[i].ship_Gold) 
				m += '<tr><td>Gold:&nbsp;</td><td style="text-align:right;">'+ addCommas(r[i].target_Gold) +'</td><td style="text-align:right;">'+ addCommas(r[i].trade_Gold)+'</td></tr>';
			m += '</table><br>';			
			
			m += '</td>';
			m += '<td style="padding-left:50px;">';
			
			m += '<br><table>';
			m += '<tr><td><b>From:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>'+ cityname +'</td></tr>';
			m += '<tr><td><b>To:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>'+ TO +'</td></tr>';
			m += '<tr><td><b>Troops:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>'+t.uu[unit]+'</td></tr>';
			m += '</table><br>';	
			
			m += '</td>';			
			m += '</tr>';		
			
		}
		m +='</table>';
		document.getElementById('pbRoutesQueue').innerHTML = m; 
		unsafeWindow.traceEdit = t.editQueueElement;
		unsafeWindow.traceDelete = t.cancelQueueElement;
	},
	  
	cancelQueueElement: function(queueId){
		var t = Tabs.transport;
		var queueId = parseInt(queueId);
		t.tradeRoutes.splice(queueId, 1);
		t.showTradeRoutes();
	},
	 
	editQueueElement: function(queueId){
		var t = Tabs.transport;
		var r = t.tradeRoutes;
		var queueId = parseInt(queueId);
		var cityname;
		var citynameTo = null;
		for (var y=0; y< Seed.cities.length;y++) {
			if (parseInt(Seed.cities[y][0]) == r[queueId].city) {
				var cityname = Seed.cities[y][1];
			}
			if (parseInt(Seed.cities[y][2]) == r[queueId].target_x && 
					parseInt(Seed.cities[y][3]) == r[queueId].target_y) {
				var citynameTo = Seed.cities[y][1];
			}
		}
		if (citynameTo == null) {
			var TO = r[queueId].target_x +','+ r[queueId].target_y;
		} else {
			var TO = citynameTo; 
		}
		
		var n = '<div><b>Route Edit:</b>&nbsp;&nbsp;<b>Name:</b><input type="text" id="pbshipname" size="9" maxlength="15" value=""</div><br><table id="editRoutes">';
		
		n += '<tr><td><b>From:</b>&nbsp;</td>';
		n += '<td>'+ cityname +'</td></tr>';
		
		n += '<tr><td><b>To:</b>&nbsp;</td>';
		n += '<td>'+ TO +'</td></tr>';
		
		n += '<tr><td><b>Enabled:</b>&nbsp;&nbsp;&nbsp;</td>';
		n += '<td><input id="TradeStatus" type="checkbox"></td></tr>';
		
		n += '<tr><td><b>Troop Type:</b>&nbsp;&nbsp;&nbsp;</td>';
		n += '<td><select id="pbbTransportTroop">';
		for (y in t.uu) {
			var troop = t.uu[y];
			n += '<option value="'+findoptvalue(y)+'">';
			n += troop;
			n += '</option>';
		}
		n += '</select></td></tr>';
		n += '</table><br><br>';
		
		n += '<table id="editRoutes">';

		n += '<tr><td style="padding-bottom:5px;"><b>Resource</b>&nbsp;&nbsp;</td>';
		n += '<td style="text-align:center;padding-bottom:5px;">&nbsp;&nbsp;<b>Enabled?</b>&nbsp;&nbsp;</td>';
		n += '<td style="padding-bottom:5px;"><b>Min. Inventory</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
		n += '<td style="padding-bottom:5px;"><b>Max. Amount:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>';

		n += '<tr><td>Food:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipfood" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountfood" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountfood" type="text" size="9" maxlength="15" value="0"></td></tr>';
		
		n += '<tr><td>Oil:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipOil" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountOil" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountOil" type="text" size="9" maxlength="15" value="0"></td></tr>';
         
		n += '<tr><td>Stone:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipstone" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountstone" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountstone" type="text" size="9" maxlength="15" value="0"></td></tr>';
         
		n += '<tr><td>Steel:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipSteel" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountSteel" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountSteel" type="text" size="9" maxlength="15" value="0"></td></tr>';
		 
		n += '<tr><td>Titanium:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshiptita" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamounttita" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamounttita" type="text" size="9" maxlength="15" value="0"></td></tr>';

		n += '<tr><td>Graphene:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipgraph" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountgraph" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountgraph" type="text" size="9" maxlength="15" value="0"></td></tr>';

		n += '<tr><td>Gold:&nbsp;</td>';
		n += '<td style="text-align:center;"><input id="pbbshipgold" type="checkbox"></td>';
		n += '<td><input id="pbbtargetamountgold" type="text" size="9" maxlength="15" value="0"></td>';
		n += '<td><input id="pbbtradeamountgold" type="text" size="9" maxlength="15" value="0"></td></tr>'
       
		n += '</table><BR>';
		n += '<table id="editRoutes"><tr><td>';
		n += '<input id="Cancel" type="submit" value="Cancel">&nbsp;&nbsp;&nbsp;';
		n += '<input id="Save" type="submit" value="Save"></td></tr>';
		n += '</table>';
       
		document.getElementById('pbRoutesQueue').innerHTML = n;
		document.getElementById('TradeStatus').checked = r[queueId].route_state;
		if (r[queueId].TroopType == undefined) {
			var unit = 'unt19';
		} else {
			var unit = r[queueId].TroopType;
		}
		document.getElementById('pbbTransportTroop').value = unit;
		
		document.getElementById('pbbshipfood').checked = r[queueId].ship_Food;
		document.getElementById('pbbshipOil').checked = r[queueId].ship_Oil;
		document.getElementById('pbbshipstone').checked = r[queueId].ship_Stone;
		document.getElementById('pbbshipSteel').checked = r[queueId].ship_Steel;
		document.getElementById('pbbshipgraph').checked = r[queueId].ship_Graph;
		document.getElementById('pbbshiptita').checked = r[queueId].ship_Tita;
		document.getElementById('pbbshipgold').checked = r[queueId].ship_Gold;
		
		document.getElementById('pbbtargetamountfood').value = r[queueId].target_Food;
		document.getElementById('pbbtargetamountOil').value = r[queueId].target_Oil;
		document.getElementById('pbbtargetamountstone').value = r[queueId].target_Stone;
		document.getElementById('pbbtargetamountSteel').value = r[queueId].target_Steel;
		document.getElementById('pbbtargetamountgraph').value = r[queueId].target_Graph;
		document.getElementById('pbbtargetamounttita').value = r[queueId].target_Tita;
		document.getElementById('pbbtargetamountgold').value = r[queueId].target_Gold;
		
		document.getElementById('pbbtradeamountfood').value = r[queueId].trade_Food;
		document.getElementById('pbbtradeamountOil').value = r[queueId].trade_Oil;
		document.getElementById('pbbtradeamountstone').value = r[queueId].trade_Stone;
		document.getElementById('pbbtradeamountSteel').value = r[queueId].trade_Steel;
		document.getElementById('pbbtradeamountgraph').value = r[queueId].trade_Graph;
		document.getElementById('pbbtradeamounttita').value = r[queueId].trade_Tita;	   
		document.getElementById('pbbtradeamountgold').value = r[queueId].trade_Gold;
		
		document.getElementById('pbshipname').value = r[queueId].ship_Name;
		
		document.getElementById('Cancel').addEventListener('click', function(){t.showTradeRoutes();}, false);
		
		document.getElementById('Save').addEventListener('click', function(){
			r[queueId].route_state = document.getElementById('TradeStatus').checked;
			r[queueId].TroopType = document.getElementById('pbbTransportTroop').value;
			
			r[queueId].ship_Food = document.getElementById('pbbshipfood').checked;
			r[queueId].ship_Oil = document.getElementById('pbbshipOil').checked;
			r[queueId].ship_Stone = document.getElementById('pbbshipstone').checked;
			r[queueId].ship_Steel = document.getElementById('pbbshipSteel').checked;
			r[queueId].ship_Graph = document.getElementById('pbbshipgraph').checked;  
			r[queueId].ship_Tita = document.getElementById('pbbshiptita').checked;  
			r[queueId].ship_Gold = document.getElementById('pbbshipgold').checked;
			
			r[queueId].target_Food = document.getElementById('pbbtargetamountfood').value;
			r[queueId].target_Oil = document.getElementById('pbbtargetamountOil').value;
			r[queueId].target_Stone = document.getElementById('pbbtargetamountstone').value;
			r[queueId].target_Steel = document.getElementById('pbbtargetamountSteel').value;
			r[queueId].target_Graph = document.getElementById('pbbtargetamountgraph').value;
			r[queueId].target_Tita = document.getElementById('pbbtargetamounttita').value;
			r[queueId].target_Gold = document.getElementById('pbbtargetamountgold').value;
			
			r[queueId].trade_Food = document.getElementById('pbbtradeamountfood').value;
			r[queueId].trade_Oil = document.getElementById('pbbtradeamountOil').value;
			r[queueId].trade_Stone = document.getElementById('pbbtradeamountstone').value;
			r[queueId].trade_Steel = document.getElementById('pbbtradeamountSteel').value;
			r[queueId].trade_Graph = document.getElementById('pbbtradeamountgraph').value;
			r[queueId].trade_Tita = document.getElementById('pbbtradeamounttita').value;
			r[queueId].trade_Gold = document.getElementById('pbbtradeamountgold').value;
			
			r[queueId].ship_Name = document.getElementById('pbshipname').value;

			t.showTradeRoutes();
		}, false);
	},
	   
	saveTradeRoutes: function() {
		var t = Tabs.transport;
		var serverID = getServerId();
		GM_setValue('tradeRoutes_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(t.tradeRoutes));
	},
		
	readTradeRoutes: function() {
		var t = Tabs.transport;
		var serverID = getServerId();
		s = GM_getValue('tradeRoutes_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
		if (s != null) {
			route = JSON2.parse(s);
			for (k in route)
				t.tradeRoutes[k] = route[k];
		}
	},
	
	saveTraderState: function() {
		var t = Tabs.transport;
		var serverID = getServerId();
		GM_setValue('traderState_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(t.traderState));
	},
	
	readTraderState: function(){
		var t = Tabs.transport;
		var serverID = getServerId();
		s = GM_getValue('traderState_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
		if (s != null) {
			state = JSON2.parse(s);
			for (k in state)
				t.traderState[k] = state[k];
		}
	},
	
	toggleTraderState: function(obj){
		var t = Tabs.transport;
		if (t.traderState.running == true) {
			t.traderState.running = false;
			obj.value = "Transport = Off";
			clearTimeout(t.checkdotradetimeout);
			t.count = 0;
		} else {
			t.traderState.running = true;
			obj.value = "Transport = On";
			t.e_tradeRoutes();
			t.checkdoTrades();
			t.report();
		}
	},
	
	checkdoTrades: function() {
		var t = Tabs.transport;
		if (t.tradeRoutes.length == 0)
			return;
		t.doTrades(t.count);
		t.count++;
		if (t.count < t.tradeRoutes.length) {
			t.checkdotradetimeout = setTimeout(function() { t.checkdoTrades(); }, 15000);
		} else {
			var now = new Date().getTime()/1000.0;
			now = now.toFixed(0);
			Options.lasttransport = now;
			saveOptions();	
			t.count = 0;
		}
	},
    
	doTrades: function(count){
		var t = Tabs.transport;
		if (t.tradeRoutes.length == 0) 
			return;
		if (!t.tradeRoutes[count]["route_state"]) 
			return;
		
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.gold = 0;
		params.r1 = 0;
		params.r2 = 0;
		params.r3 = 0;
		params.r4 = 0;
		params.r5 = 0;
		params.r6 = 0;
		params.kid = 0;
		
		var carry_amount = 0;
		var wagons_needed = 0;
		var citymax = 0;
		var city = t.tradeRoutes[count]["city"];
		var cityID = 'city' + city;
		
		if (!Cities.byID[city]) 
			return;
			
		var xcoord = t.tradeRoutes[count]["target_x"];
		var ycoord = t.tradeRoutes[count]["target_y"];
		
		var trade_Food = t.tradeRoutes[count]["trade_Food"];
		var trade_Oil = t.tradeRoutes[count]["trade_Oil"];
		var trade_Stone = t.tradeRoutes[count]["trade_Stone"];
		var trade_Steel = t.tradeRoutes[count]["trade_Steel"];
		var trade_Graph = t.tradeRoutes[count]["trade_Graph"];
		var trade_Tita = t.tradeRoutes[count]["trade_Tita"];
		var trade_Gold = t.tradeRoutes[count]["trade_Gold"];
			
		var target_Food = t.tradeRoutes[count]["target_Food"];
		var target_Oil = t.tradeRoutes[count]["target_Oil"];
		var target_Stone = t.tradeRoutes[count]["target_Stone"];
		var target_Steel = t.tradeRoutes[count]["target_Steel"];
		var target_Graph = t.tradeRoutes[count]["target_Graph"];
		var target_Tita = t.tradeRoutes[count]["target_Tita"];
		var target_Gold = t.tradeRoutes[count]["target_Gold"];
			
		var ship_Food = t.tradeRoutes[count]["ship_Food"];
		var ship_Oil = t.tradeRoutes[count]["ship_Oil"];
		var ship_Stone = t.tradeRoutes[count]["ship_Stone"];
		var ship_Steel = t.tradeRoutes[count]["ship_Steel"];
		var ship_Graph = t.tradeRoutes[count]["ship_Graph"];
		var ship_Tita = t.tradeRoutes[count]["ship_Tita"];
		var ship_Gold = t.tradeRoutes[count]["ship_Gold"];
			
		var citymax_Food = parseInt(Seed.resources[cityID]['rec1'][0] / 3600);
		var citymax_Oil = parseInt(Seed.resources[cityID]['rec2'][0] / 3600);
		var citymax_Stone = parseInt(Seed.resources[cityID]['rec3'][0] / 3600);
		var citymax_Steel = parseInt(Seed.resources[cityID]['rec4'][0] / 3600);
		var citymax_Tita = parseInt(Seed.resources[cityID]['rec5'][0] / 3600);
		var citymax_Graph = parseInt(Seed.resources[cityID]['rec6'][0] / 3600);
		var citymax_Gold = parseInt(Seed.citystats[cityID]['gold']);
		
		var carry_Food = (citymax_Food - target_Food);
		var carry_Oil = (citymax_Oil - target_Oil);
		var carry_Stone = (citymax_Stone - target_Stone);
		var carry_Steel = (citymax_Steel - target_Steel);
		var carry_Graph = (citymax_Graph - target_Graph);
		var carry_Tita = (citymax_Tita - target_Tita);
		var carry_Gold = 0;

		if (carry_Food < 0 || ship_Food==false) 
			carry_Food = 0;
		if (carry_Oil < 0 || ship_Oil==false) 
			carry_Oil = 0;
		if (carry_Stone < 0 || ship_Stone==false) 
			carry_Stone = 0;
		if (carry_Steel < 0 || ship_Steel==false) 
			carry_Steel = 0;
		if (carry_Graph < 0 || ship_Graph==false) 
			carry_Graph = 0;
		if (carry_Tita < 0 || ship_Tita==false) 
			carry_Tita = 0;
			
		if (trade_Food > 0 && (carry_Food > trade_Food)) 
			carry_Food = parseInt(trade_Food);
		if (trade_Oil > 0 && (carry_Oil > trade_Oil)) 
			carry_Oil = parseInt(trade_Oil);
		if (trade_Stone > 0 && (carry_Stone > trade_Stone)) 
			carry_Stone = parseInt(trade_Stone);
		if (trade_Steel > 0 && (carry_Steel > trade_Steel)) 
			carry_Steel = parseInt(trade_Steel);
		if (trade_Graph > 0 && (carry_Graph > trade_Graph)) 
			carry_Graph = parseInt(trade_Graph);
		if (trade_Tita > 0 && (carry_Tita > trade_Tita)) 
			carry_Tita = parseInt(trade_Tita);

		if (t.tradeRoutes[count]['TroopType'] == undefined) {
			var wagons = parseInt(Seed.units[cityID]['unt'+ 19]); 
		} else {
			var wagons = parseInt(Seed.units[cityID][t.tradeRoutes[count]['TroopType']]);
		}
		
		var rallypointlevel = t.getRallypoint(cityID);	
		if (parseInt(wagons) > parseInt(rallypointlevel*10000)) { 
			wagons = (rallypointlevel*10000); 
		}
    	
		if (t.tradeRoutes[count]['TroopType'] == undefined) {
			var unit = 'unt19';
		} else {
			var unit = t.tradeRoutes[count]['TroopType'];
		}
			
		var Troops = parseInt(Seed.units[cityID][unit]);
	  if (parseInt(Troops)>parseInt(wagons)) {
			Troops = wagons;
		}
		
		var tch10 = parseInt(Seed.tech.tch10);
		if (tch10 == 11) tch10 = 13;
		if (tch10 == 10) tch10 = 11;		
		var Load = parseInt(unsafeWindow.unitstats[unit]['5'])
		var maxloadperwagon = (tch10 * ((Load/100)*10)) + Load;
		var maxload = (maxloadperwagon * Troops) - 1;
		if (wagons <= 0) 
			return;
	  
		for (var s = 0; s < Seed.cities.length; s++) {
			if (parseInt(Seed.cities[s][0]) == city) {
				var cityname = Seed.cities[s][1];
			}
		}                     
		
		var shift_Food = (maxload / 6);
		var shift_Oil = (maxload / 6);
		var shift_Stone = (maxload / 6);
		var shift_Steel = (maxload / 6);
		var shift_Graph = (maxload / 6);
		var shift_Tita = (maxload / 6);		  
		if ((maxload - carry_Food - carry_Oil - carry_Stone - carry_Steel - carry_Graph - carry_Tita) < 0) {
			var shift_num = 0;
			var shift_spare = 0;
			
			// Check: See if load/6 is to big for some resources...
			if (carry_Food < shift_Food) {
				shift_spare += (shift_Food - carry_Food);
				shift_Food = carry_Food;
			}
			if (carry_Oil < shift_Oil) {
				shift_spare += (shift_Oil - carry_Oil);
				shift_Oil = carry_Oil;	
			}
			if (carry_Stone < shift_Stone) {
				shift_spare += (shift_Stone - carry_Stone);
				shift_Stone = carry_Stone;
			}
			if (carry_Steel < shift_Steel) {
				shift_spare += (shift_Steel - carry_Steel);
				shift_Steel = carry_Steel;
			}			
			if (carry_Graph < shift_Graph) {
				shift_spare += (shift_Graph - carry_Graph);
				shift_Graph = carry_Graph;
			}
			if (carry_Tita < shift_Tita) {
				shift_spare += (shift_Tita - carry_Tita);
				shift_Tita = carry_Tita;
			}
			
			while (shift_spare > 1) {
				if (carry_Food < (shift_Food + shift_spare)) {
					shift_spare = shift_spare - carry_Food;;
					shift_Food = carry_Food;
				} else {
					shift_Food = (shift_Food + shift_spare);
					shift_spare = shift_spare - shift_spare;
				}
				if (carry_Oil < (shift_Oil + shift_spare)) {
					shift_spare = shift_spare - carry_Oil;;
					shift_Oil = carry_Oil;
				} else {
					shift_Oil = shift_Oil + shift_spare;
					shift_spare = shift_spare - shift_spare;
				} 
				if (carry_Stone < (shift_Stone + shift_spare)) {
					shift_spare = shift_spare - carry_Stone;
					shift_Stone = carry_Stone;
				} else {
					shift_Stone = shift_Stone + shift_spare;
					shift_spare = shift_spare - shift_spare;
				}
				if (carry_Steel < (shift_Steel + shift_spare)) {
					shift_spare = shift_spare - carry_Steel;
					shift_Steel = carry_Steel;
				} else {
					shift_Steel = shift_Steel + shift_spare;
					shift_spare = shift_spare - shift_spare;
				}
				if (carry_Graph < (shift_Graph + shift_spare)) {
					shift_spare = shift_spare - carry_Graph;
					shift_Graph = carry_Graph;
				} else {
					shift_Graph = shift_Graph + shift_spare;
					shift_spare = shift_spare - shift_spare;
				}
				if (carry_Tita < (shift_Tita + shift_spare)) {
					shift_spare = shift_spare - carry_Tita;
					shift_Tita = carry_Tita;
				} else {
					shift_Tita = shift_Tita + shift_spare;
					shift_spare = shift_spare- shift_spare;
				}
			}

			carry_Food = parseInt(shift_Food);
			carry_Oil = parseInt(shift_Oil);
			carry_Stone = parseInt(shift_Stone);
			carry_Steel = parseInt(shift_Steel);
			carry_Graph = parseInt(shift_Graph);
			carry_Tita = parseInt(shift_Tita);
		}

		if (maxload > (carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita) && ship_Gold == true) {
			if ((maxload - (carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita)) > (citymax_Gold - target_Gold)) {
				carry_Gold = (citymax_Gold - target_Gold);
				if (carry_Gold < 0 ) {
					carry_Gold = 0;
				}
			} else {
				carry_Gold = (maxload - (carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita));
			}		  
			if (trade_Gold > 0 && (carry_Gold > trade_Gold)) {
				carry_Gold = parseInt(trade_Gold);
			}
		}
		
		wagons_needed = ((carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita + carry_Gold) / maxloadperwagon);
		wagons_needed = wagons_needed.toFixed(0);	
		if (wagons_needed < ((carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita + carry_Gold) / maxloadperwagon)) {
			wagons_needed++;
		}
		if (wagons_needed < Options.minwagons) { 
			Logbook.entry(Logs.translog,'Small Transport Skipped');
			t.Logbook();
			return; 
		}
		
		//Get March ID
    var e = unsafeWindow.Object.values(Seed.outgoing_marches["c"+city]).detect(function(a){return a.marchId&&parseInt(a.marchStatus,10)===unsafeWindow.Constant.MarchStatus.INACTIVE});   

		params.cid = city;
		params.mid = e.marchId;
		params.type = "1";
		params.kid = "0";
		params.xcoord = xcoord;
		params.ycoord = ycoord;
		params.r1 = carry_Food;
		params.r2 = carry_Oil;
		params.r3 = carry_Stone;
		params.r4 = carry_Steel;
		params.r5 = carry_Tita;
		params.r6 = carry_Graph;
		params.gold = carry_Gold;

		switch (unit){
			case 'unt1': params.u1 = wagons_needed;break; //Truck
			case 'unt9': params.u9 = wagons_needed;break; //Supply Helicopter
			case 'unt19': params.u19 = wagons_needed;break; //Cargo Transport
		}
		var startnow = unixTime();
		
		if ((carry_Food + carry_Oil + carry_Stone + carry_Steel + carry_Graph + carry_Tita + carry_Gold) > 0) {   
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "march.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					if (rslt.ok) {
						//Name of the Target City (Determine if Own city)
						var city2 = '';
						for (var s = 0; s < Seed.cities.length; s++) {
							if (parseInt(Seed.cities[s][2]) == xcoord && 
									parseInt(Seed.cities[s][3]) == ycoord) {
								city2 = Seed.cities[s][1];
							}
						}    
						if (city2 != '') {
							var m = 'Automatic Transport from <b>' + cityname + "</b> to <b>"+ city2 +"</b><br>" + addCommas(wagons_needed) + ' '+ t.uu['u'+unit.substr(3)]+' sent '+addCommas(params.r1+params.r2+params.r3+params.r4+params.r5+params.r6+params.gold) + ' Resources transported.';
						} else {
							var m = 'Automatic Transport from <b>' + cityname + "</b> to <b>" + xcoord + ',' + ycoord + "</b><br>" + addCommas(wagons_needed) + ' '+ t.uu['u'+unit.substr(3)]+' sent '+addCommas(params.r1+params.r2+params.r3+params.r4+params.r5+params.r6+params.gold) + ' Resources transported.';
						}
						Logbook.entry(Logs.translog,m);
						t.Logbook();
						
						//Reduce Transport Troops
						for (var r = 1; r < 25; r++){
							if (params['u' + r]) {
								Seed.units['city' + params.cid]['unt' + r] -= params['u' + r];
							}
						}
						//Update March Data
						var now = unixTime();
						var q = {
							destinationUnixTime: now * 2 - startnow + rslt.oneway,
							marchUnixTime: now,
							returnUnixTime: rslt.returnEta,
							toXCoord: params.xcoord,
							toYCoord: params.ycoord,
							marchType: 1,
							knightId: 0,
							marchStatus: 1,
							marchId: params.mid,
						};
						//Resources
						q.gold = params.gold;
						for (var r = 1; r < 7; r++) {
							q["resource" + r] = params['r'+r];			
						}
						//Units
						for (var u = 1; u < 25; u++) {
							if (params['u' + u]) {
								q["unit" + u + "Count"] = params['u' + u];
							} else {
								q["unit" + u + "Count"] = 0;
							}
							q["unit" + u + "Return"] = 0;		
						}
						//General
						if (rslt.tileId) {
							q.toTileId = rslt.tileId;
							q.toTileType = rslt.tileType;
							q.toTileLevel = rslt.tileLevel;
						}
						Seed.outgoing_marches["c" + params.cid]["m" + params.mid] = q;
		
          } else {
						var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
            Logbook.entry(Logs.translog,'Transport Failed: '+ cityname + '<br><span class="boldRed">' +errorcode+'</span>');
						t.Logbook();
					}
				},
				onFailure: function () {alert("Error during Transport");}
			});
		}
	},
	
	ManualTransport: function() {
		var t = Tabs.transport;
		if (document.getElementById ('ptcityX').value == "" || 
				document.getElementById ('ptcityY').value == "") return;
		if (t.TroopsNeeded > t.Troops) return;
		var city = t.tcp.city.id;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		var unitType = document.getElementById('TransportTroop').value;
		var tch10 = parseInt(Seed.tech.tch10);
		if (tch10 == 11) tch10 = 13;
		if (tch10 == 10) tch10 = 11;	
		var LoadUnit = (tch10 * ((parseInt(unsafeWindow.unitstats[unitType]['5'])/100)*10)) + parseInt(unsafeWindow.unitstats[unitType]['5']);
		var MaxLoad =  parseInt(Seed.units['city' + city][unitType]) * LoadUnit;
		document.getElementById ('errorSpace').innerHTML = '';

		if (document.getElementById ('TroopsToSend').value == 0) {
			document.getElementById ('errorSpace').innerHTML = '<span style="color:red;">Troops not Specified</span>';
			setTimeout(function(){ (document.getElementById('errorSpace').innerHTML = ''); }, 5000);
			return;
		}
		
		var e = unsafeWindow.Object.values(Seed.outgoing_marches["c"+city]).detect(function(a){return a.marchId&&parseInt(a.marchStatus,10)===unsafeWindow.Constant.MarchStatus.INACTIVE})       	
		params.cid = city;
		params.mid = e.marchId;
		params.kid = 0;
		params.type = "1";	
		params.xcoord = parseInt(document.getElementById ('ptcityX').value);
		params.ycoord = parseInt(document.getElementById ('ptcityY').value);
		params.r1 = parseInt(document.getElementById ('pbtradeamountFood').value);
		params.r2 = parseInt(document.getElementById ('pbtradeamountOil').value);
		params.r3 = parseInt(document.getElementById ('pbtradeamountStone').value);
		params.r4 = parseInt(document.getElementById ('pbtradeamountSteel').value);
		params.r5 = parseInt(document.getElementById ('pbtradeamountTita').value);
		params.r6 = parseInt(document.getElementById ('pbtradeamountGraph').value);
		params.gold = parseInt(document.getElementById ('pbtradeamountGold').value);
		
		var wagons_needed = parseInt(document.getElementById ('TroopsToSend').value);
		switch (unitType) {
			case 'unt1': params.u1 = wagons_needed;break;
			case 'unt9': params.u9 = wagons_needed;break;
			case 'unt19': params.u19 = wagons_needed;break;
	  }
		var startnow = unixTime();
		if ((params.r1 + params.r2 + params.r3 + params.r4 + params.r5 + params.r6 + params.gold) > 0) {
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "march.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					if (rslt.ok) { 
						//Quelle
						for (var s = 0; s < Seed.cities.length; s++) {
							if (parseInt(Seed.cities[s][0]) == params.cid) {
								var cityname = Seed.cities[s][1];
							}
						} 
						//Name of Target City (Determine if Own city)
						var city2 = '';
						for (var s = 0; s < Seed.cities.length; s++) {
							if (parseInt(Seed.cities[s][2]) == params.xcoord && 
									parseInt(Seed.cities[s][3]) == params.ycoord) {
								city2 = Seed.cities[s][1];
							}
						}    
						if (city2 != '') {
							var m = 'Manual Transport From <b>' + cityname + "</b> to <b>"+ city2 +"</b><br>" + addCommas(wagons_needed) + ' '+ t.uu['u'+unitType.substr(3)]+' sent '+addCommas(params.r1+params.r2+params.r3+params.r4+params.r5+params.r6+params.gold) + ' Resources transported.';
						} else {
							var m = 'Manual Transport from <b>' + cityname + "</b> to <b>" + params.xcoord + ',' + params.ycoord + "</b><br>" + addCommas(wagons_needed) + ' '+ t.uu['u'+unitType.substr(3)]+' sent '+addCommas(params.r1+params.r2+params.r3+params.r4+params.r5+params.r6+params.gold) + ' Resources transported.';
						}						
						
						Logbook.entry(Logs.translog,m);
						t.Logbook();
						
						//Reduce Transport Troops
						for (var r = 1; r < 25; r++){
							if (params['u' + r]) {
								Seed.units['city' + params.cid]['unt' + r] -= params['u' + r];
							}
						}
						//Update March Data
						var now = unixTime();
						var q = {
							destinationUnixTime: now * 2 - startnow + rslt.oneway,
							marchUnixTime: now,
							returnUnixTime: rslt.returnEta,
							toXCoord: params.xcoord,
							toYCoord: params.ycoord,
							marchType: 1,
							knightId: 0,
							marchStatus: 1,
							marchId: params.mid,
						};
						//Resources
						q.gold = params.gold;
						for (var r = 1; r < 7; r++) {
							q["resource" + r] = params['r'+r];			
						}
						//Units
						for (var u = 1; u < 25; u++) {
							if (params['u' + u]) {
								q["unit" + u + "Count"] = params['u' + u];
							} else {
								q["unit" + u + "Count"] = 0;
							}
							q["unit" + u + "Return"] = 0;		
						}
						//General
						if (rslt.tileId) {
							q.toTileId = rslt.tileId;
							q.toTileType = rslt.tileType;
							q.toTileLevel = rslt.tileLevel;
						}
						Seed.outgoing_marches["c" + params.cid]["m" + params.mid] = q;
						
						document.getElementById ('pbtradeamountFood').value = 0;
						document.getElementById ('pbtradeamountOil').value = 0;
						document.getElementById ('pbtradeamountStone').value = 0;
						document.getElementById ('pbtradeamountSteel').value = 0;
						document.getElementById ('pbtradeamountGold').value = 0;
						document.getElementById ('pbtradeamountGraph').value = 0;
						document.getElementById ('pbtradeamountTita').value = 0;
						document.getElementById ('TroopsToSend').value = 0;
					} else {
						var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
						var m = '<span style="color:red;">Error: ' + errorcode+'</span>';
						Logbook.entry(Logs.translog,m);
						t.Logbook();
					}
				},
				onFailure: function () {alert('Error when Transporting');}
			});
		}
	},
	
	show: function(){
		var t = Tabs.transport;
		clearTimeout (t.timer);
		t.updateTroops();
		t.updateResources();  
		t.timer = setTimeout (t.show, 1000); 
	},
		
	hide: function(){
		var t = Tabs.transport;
		clearTimeout (t.timer);
	},
	
	report : function() {
		var t = Tabs.transport;
		clearTimeout (t.reportTimer);
		if (Options.deletetransports && t.traderState.running) {
			//Get the first page of Battle reports
			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			params.pageNo = 1;
			params.showAll = 0;
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "listMarchReport.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					t.reportlist(rslt);
				},
				onFailure: function (rslt) {
					t.reportlist(rslt);
				}
			});
		}
		t.reportTimer = setTimeout (t.report, 600000); //all 10 Minutes
	},
	reportlist : function(rslt) {
		var t = Tabs.transport;
		//Proccessing the first page of the Battle Reports
		if (rslt.ok) {
			var rid = [];
			for(var r in rslt.arReports) {
				var report = rslt.arReports[r];
				//Transport to my self?
				if (report.marchType == '1' && 
						report.side1PlayerId == unsafeWindow.g_ajaxsuffix.substr(3) &&
						report.side0PlayerId == unsafeWindow.g_ajaxsuffix.substr(3)) {
					rid.push(report.marchReportId);
				}
			}
			if (rid.length > 0) {
				//Delete Reports
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.s0rids = '';
				params.eventids = '';
				params.s1rids = rid.join(',');
				var count = rid.length;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) {
						t.deletereports(rslt,count);
					},
					onFailure: function (rslt) {
						t.deletereports(rslt,count);
					}
				});
			}

		} 
	},
	deletereports : function (rslt,count) {
		var t = Tabs.transport;
		if (rslt.ok) {
			Seed.newReportCount = parseInt(Seed.newReportCount) - count;
			if (count == 1) {
				Logbook.entry(Logs.translog,count + ' Transport report deleted');
			} else {
				Logbook.entry(Logs.translog,count + ' Transport reports deleted');
			}
			t.Logbook();
		}
	},
}
/*********************************** Farm tab ****************************/
Tabs.Farm = {
  tabOrder : 3,
	tabLabel: 'Farm',
  cont : null,
  tabDisabled : !ENABLE_FARM,
	displayTimer : null,
	attackTimer : null,
	modalTimer : null,
	reportTimer : null,
	startUnixTime : 0,
	coords : {},
	coordlist : {},
	blocklist : [],
	blockpointer : 0,
	blockread : false,
	mapread : false,
	blockreadtimer : null,
	blocks : [],
	tcoords : {},
	wcoords : {},
	targettype : {},
	targetlevel : {},
	fend : [],
	fcity : [],
	fcitypointer : 0,
	klistpointers : {},
	attack: true,
	started : false,
	startvalue : "Run Attacks",
	id : {},
	read : true,
	wildtypes : {
		'0' : 'Wasteland',
		'10' : 'Grassland',
		'11' : 'Lake', // Not Used
		'12' : 'River',
		'20' : 'Oil Field',
		'30' : 'Hill',
		'40' : 'Mountain',
		'50' : 'Plain',
		'51' : 'City/Terrorist camp',
		'52' : 'Ruin', //Not Used
		'53' : 'Hidden City', // Not Used
		'201' : 'Titanium',
		'202' : 'Graphene',
		'203' : 'Uranium',
		'204' : 'Diamond',
	},
	terror : {
		't1' : 'Terroristcamp Level 1',
		't2' : 'Terroristcamp Level 2',
		't3' : 'Terroristcamp Level 3',
		't4' : 'Terroristcamp Level 4',	
		't5' : 'Terroristcamp Level 5',
		't6' : 'Terroristcamp Level 6',	
		't7' : 'Terroristcamp Level 7',
		't8' : 'Terroristcamp Level 8',	
		't9' : 'Terroristcamp Level 9',
		't10' : 'Terroristcamp Level 10',			
	},
	terrorwild : {
		't1' : 'Terroristcamp Level 1',
		't2' : 'Terroristcamp Level 2',
		't3' : 'Terroristcamp Level 3',
		't4' : 'Terroristcamp Level 4',	
		't5' : 'Terroristcamp Level 5',
		't6' : 'Terroristcamp Level 6',	
		't7' : 'Terroristcamp Level 7',
		't8' : 'Terroristcamp Level 8',	
		't9' : 'Terroristcamp Level 9',
		't10' : 'Terroristcamp Level 10',	
		'w1' : 'Wilds Level 1',
		'w2' : 'Wilds Level 2',
		'w3' : 'Wilds Level 3',
		'w4' : 'Wilds Level 4',
		'w5' : 'Wilds Level 5',
		'w6' : 'Wilds Level 6',
		'w7' : 'Wilds Level 7',
		'w8' : 'Wilds Level 8',
		'w9' : 'Wilds Level 9',
		'w10' : 'Wilds Level 10',
	},	
	stopreload : false,
	pophelp : null,
	tready : false,
	
  init : function (div){
    var t = Tabs.Farm;
    t.cont = div;

		var out = [];	
		//Header
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>Automatic Attacks on Targets</b>');
		out.push('</td>');
		out.push('<td style="text-align:right; width: 20px;">');	
		out.push('<input id="ptfarmhelp" type="submit" value="Help"> ');
		out.push('</td>');	
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');
		//Buttons
		out.push('<table class="ptTab" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');
		out.push('<input id="ptfarmstart" type="submit" name="FarmButton" value="' + t.startvalue + '">');	
		out.push('</td>');
		out.push('<td style="text-align:right; width:30px;">');
		out.push('Pro-Options ');
		out.push('<input id="ptfarmpro" type="checkbox">');		
		out.push('</td>');		
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		//Pro Option
		out.push('<div id="ptboxPro" style="margin-bottom: 5px; border: 1px solid gray; padding: 5px 5px 6px 5px; background-color:#f0f0f0; display:none;">');
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td style="width:70px;"><b>T-Search:</b></td>');
		out.push('<td><input id="ptfarmprot" type="text" size="2" maxlength="3" style="text-align: center;"></td>');
		out.push('<td>Search radius for Terrist camps');
		out.push('&nbsp;&nbsp;<input id="ptfarmterror" type="submit" value="Clear stored coordinates"></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td style="width:70px;"><b>W-Search:</b></td>');
		out.push('<td><input id="ptfarmprow" type="text" size="2" maxlength="3" style="text-align: center;">');
		out.push('<td>Search radius for free wilds.</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td style="width:70px;"><b>Blocks:</b></td>');
		out.push('<td>');		
		out.push(htmlSelector ({9:9, 20:20, 50:50, 75:75, 100:100, 150:150}, Options.pbfarmblockmax, 'id="ptfarmblockmax"'));		
		out.push('&nbsp;&nbsp;</td>');
		out.push('<td>Number of Tiles to be queried at once from the server.</td>');				
		out.push('</tr>');		
		out.push('</table>');
		out.push('</div>');		
	
		//Choose a City
		out.push('<div style="margin-bottom: 5px; border: 1px solid gray; padding: 5px 5px 6px 5px; background-color:#f0f0f0;">');
		out.push('<table class="ptTab">');
		for(i=0; i<Cities.numCities; i++) {
			out.push('<tr>');
			if (i == 0) {
				out.push('<td style="width:70px;"><b>Cities:</b></td>');
				out.push('<td style="width:25px;"><input id="ptfarmcityall_'+Cities.cities[i].id+'" type="checkbox"></td>');
			} else {
				out.push('<td>&nbsp;</td>');
				out.push('<td><input id="ptfarmcityall_'+Cities.cities[i].id+'" type="checkbox"></td>');
			}
			out.push('<td>&nbsp;<b>'+Cities.cities[i].name+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
			out.push('<td id="ptenergy_'+Cities.cities[i].id+'"></td>');
			out.push('<td id="ptfattack_'+Cities.cities[i].id+'"></td>');
			out.push('</tr>');
    }
		out.push('</table>');
		out.push('<table class="ptTab" style="display:none;" id="ptboxMessage">');
		out.push('<tr>');	
		out.push('<td style="width:70px;">&nbsp;</td>');
		out.push('<td>&nbsp;<br>&nbsp;<span class="boldRed">Please Select At least One City!</span></td>');
		out.push('</tr>');			
		out.push('</table>');
		out.push('</div>');
		//Select the Type of Attack
		out.push('<div id="ptboxType" style="margin-bottom: 5px; border: 1px solid gray; padding: 5px 5px 6px 5px; background-color:#f0f0f0;">');
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td style="width:70px;"><b>Attack type:</b></td>');
		out.push('<td style="width:25px;"><input type="radio" name="pbcitytype" id="pbfarmtype1" value="w"></td>');
		out.push('<td>&nbsp;A wave of attacks on a single Target&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td>&nbsp;</td>');
		out.push('<td><input type="radio" name="pbcitytype" id="pbfarmtype2" value="f"></td>');
		out.push('<td>&nbsp;Attacks on a list of targets&nbsp;</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('</div>');
		//One City, Wave Attack
		out.push('<div id="ptboxEW" style="margin-bottom: 5px; border: 1px solid gray; padding: 5px 5px 6px 5px; background-color:#f0f0f0;">');
		out.push('<table class="ptTab" width="100%">');
		out.push('<tr>');
		out.push('<td style="width:70px;"><b>Target:</b></td>');
		out.push('<td style="width:25px;"><input type="radio" name="pbfarmEW" id="pbfarmEW1" value="a"></td>');
		out.push('<td style="width:100px;">'+htmlSelector(t.terrorwild, Options.pbfarmEW_atype, 'id="ptfarmEWatype"')+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
		out.push('<td>Searches for Target Automatically</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td>&nbsp;</td>');
		out.push('<td><input type="radio" name="pbfarmEW" id="pbfarmEW2" value="m"></td>');
		out.push('<td><input id="ptfarmx" type="text" size="2" maxlength="3" style="text-align: center;">');
		out.push(' / <input id="ptfarmy" type="text" size="2" maxlength="3" style="text-align: center;">');
		out.push(' (x / y)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
		out.push('<td id="ptdist"></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td>&nbsp;</td>');
		out.push('<td>&nbsp;</td>');
		out.push('<td colspan="2" id="ptfieldinfo"></td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('</div>');
		//Several Cities, Wave of Attacks
		out.push('<div id="ptboxAW" style="margin-bottom: 5px; border: 1px solid gray; padding: 5px 5px 6px 5px; background-color:#f0f0f0;">');
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td style="width:70px;"><b>Targets for<br>Art.-Search:</b></td>');
		out.push('<td style="width:25px;">&nbsp;</td>');
		out.push('<td>');
		out.push('<table class="ptTab">');
		for(i=0; i<Cities.numCities; i++) {
			out.push('<tr id="ptfarmAWr_'+Cities.cities[i].id+'">');
			out.push('<td>&nbsp;<b>'+Cities.cities[i].name+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
			out.push('<td>');
			if (!Options.pbfarmAW_ats['c'+Cities.cities[i].id]) Options.pbfarmAW_ats['c'+Cities.cities[i].id] = 't1';
			out.push(htmlSelector(t.terrorwild, Options.pbfarmAW_ats['c'+Cities.cities[i].id], 'id="ptfarmAWats_'+Cities.cities[i].id+'"'));			
			out.push('</td>');
			out.push('</tr>');
    }
		out.push('</table>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('</div>');		
		//One City, Farm Attack
		out.push('<div id="ptboxEF" style="margin-bottom: 5px; border: 1px solid gray; padding: 5px 5px 6px 5px; background-color:#f0f0f0;">');
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td style="width:70px;"><b>Targets:</b></td>');
		out.push('<td style="width:25px;"><input type="radio" name="pbfarmEF" id="pbfarmEF1" value="a"></td>');
		out.push('<td>'+htmlSelector(t.terror, Options.pbfarmEF_atype, 'id="ptfarmEFatype"')+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
		out.push('<td>Searches for Targets Automatically.</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td style="vertical-align:top;">&nbsp;</td>');
		out.push('<td style="vertical-align:top;"><input type="radio" name="pbfarmEF" id="pbfarmEF2" value="m"></td>');
		out.push('<td style="vertical-align:top;"><textarea id="ptfarmklist" rows="5" cols="15"></textarea></td>');
		out.push('<td style="vertical-align:middle;"><input id="ptfarmkcheck" type="submit" name="CoordCheck" value="Check Coordinate List">');
		out.push('<br><input id="ptclearlistpos" type="submit" value="Start from begining of Target list">');
		out.push('<br><br><span id="ptcheckinfo">Invalid Coordinates Will Be Deleted</span></td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('</div>');
		//Several Cities, Farm Attacks
		out.push('<div id="ptboxAF" style="margin-bottom: 5px; border: 1px solid gray; padding: 5px 5px 6px 5px; background-color:#f0f0f0;">');
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td style="width:70px;"><b>Targets to<br>Farm:</b></td>');
		out.push('<td style="width:25px;">&nbsp;</td>');
		out.push('<td>');
		out.push('<table class="ptTab">');
		for(i=0; i<Cities.numCities; i++) {
			out.push('<tr id="ptfarmAFr_'+Cities.cities[i].id+'">');
			out.push('<td>&nbsp;<b>'+Cities.cities[i].name+'</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
			out.push('<td>');
			if (!Options.pbfarmAF_ats['c'+Cities.cities[i].id]) Options.pbfarmAF_ats['c'+Cities.cities[i].id] = 't1';
			out.push(htmlSelector(t.terror, Options.pbfarmAF_ats['c'+Cities.cities[i].id], 'id="ptfarmAFats_'+Cities.cities[i].id+'"'));			
			out.push('</td>');
			out.push('</tr>');
    }
		out.push('</table>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('</div>');
		//Options
		out.push('<div id="ptboxOptions" style="margin-bottom: 5px; border: 1px solid gray; padding: 5px 5px 6px 5px; background-color:#f0f0f0;">');
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td style="width:70px;"><b>Pause:</b></td>');
		out.push('<td style="width:25px;">&nbsp;</td>');
		out.push('<td><input id="ptfarminterval" type="text" size="2" maxlength="3" style="text-align: center;"> Seconds between attacks</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Reserve:</b></td>');
		out.push('<td>&nbsp;</td>');
		out.push('<td><input id="ptfarmenergysave" type="text" size="2" maxlength="3" style="text-align: center;"> Energy points of generals to conserve (<b>Total for Each City</b>)</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Window:</b></td>');
		out.push('<td>&nbsp;</td>');		
		out.push('<td><input id="ptfarmhidemodal" type="checkbox"> Close the "Found Artifact" window.</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Reports:</b></td>');
		out.push('<td>&nbsp;</td>');
		out.push('<td><input id="ptfarmdeletereport" type="checkbox"> Automatically Delete Reports(Only for Terrorist Camps and Wilds)</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><img title="Attack Booster" height=30 src=http://i.imgur.com/hQn3x.png>:</b></td>');
		out.push('<td>&nbsp;</td>');
		out.push('<td><input id="ptchkattackboost" type="checkbox"');
		out.push('<td>Automatically Use Extra Ammo  <input id="ptfarmattackboost" type="submit" value="Manual"></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><img title="Health Booster" height=30 src=http://i.imgur.com/z9lVP.png>:</td>');
		out.push('<td>&nbsp;</td>');
		out.push('<td><input id="ptchkhealthboost" type="checkbox"');
		out.push('<td>Automatically Use Kevlar Vest <input id="ptfarmhealthboost" type="submit" value="Manual"></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Logbook:</b></td>');
		out.push('<td>&nbsp;</td>');	
		out.push('<td><input id="ptfarmhidewait" type="checkbox"> "Waiting to return" Messages not entered in the Logbook.</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('</div>');		
		//Troops
		out.push('<div id="ptboxTroops" style="margin-bottom: 5px; border: 1px solid gray; padding: 5px 5px 6px 5px; background-color:#f0f0f0;">');
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td><b>Supply Truck:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu1" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Infantry:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu5" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');	
		out.push('<td><b>Sniper:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu6" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td><b>Anti-Tank Infantry:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu4" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Special Forces:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu18" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Mobile SAM:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu7" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td><b>Tank:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu8" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');		
		out.push('<td><b>Hellfire-Tank:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu16" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Predator-Drone:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu17" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Supply-Helicopter:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu9" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Gunship:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu11" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Fighter:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu10" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Bomber:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu12" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Stealth-Bomber:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu13" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Cargo Transport:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu19" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Sam Elite:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu21" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Gunship Elite:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu24" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Anti-tank Elite:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfarmu22" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td>&nbsp;</td>');
		out.push('<td>&nbsp;</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('</div>');			
		//Logbook
		out.push('<hr>');
		out.push('<table width="100%">');
		out.push('<tr>');
		out.push('<td><b>Attack log:</b><br><br></td>');
		out.push('<td style="text-align: right;">');
		out.push('<input id="ptButClearALog" type="submit" name="ClearFarmLog" value="Clear Attack Log">');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td colspan="2">');
		out.push('<div id="ptfarmlog" style="height: 120px; overflow: auto;">');
		out.push('</div>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		//Output
		t.cont.innerHTML = out.join('');
		//IDs search
		t.id.ptfarmstart = document.getElementById('ptfarmstart');	
		
		t.id.ptfarmcityall = [];
		t.id.ptenergy = [];
		t.id.ptfattack = [];
		t.id.ptfarmAWr = [];
		t.id.ptfarmAWats = [];	
		t.id.ptfarmAFr = [];
		t.id.ptfarmAFats = [];	
		for(i=0; i<Cities.numCities; i++) {
			t.id.ptfarmcityall.push(document.getElementById('ptfarmcityall_'+Cities.cities[i].id));
			t.id.ptenergy.push(document.getElementById('ptenergy_'+Cities.cities[i].id));	
			t.id.ptfattack.push(document.getElementById('ptfattack_'+Cities.cities[i].id));		
			t.id.ptfarmAWr.push(document.getElementById('ptfarmAWr_'+Cities.cities[i].id));	
			t.id.ptfarmAWats.push(document.getElementById('ptfarmAWats_'+Cities.cities[i].id));	
			t.id.ptfarmAFr.push(document.getElementById('ptfarmAFr_'+Cities.cities[i].id));	
			t.id.ptfarmAFats.push(document.getElementById('ptfarmAFats_'+Cities.cities[i].id));		
		}
		
		for (var i = 0; i < t.id.ptfarmcityall.length; i++) {
			if (Options.pbfarmcityall['c'+Cities.cities[i].id]) {
				t.id.ptfarmcityall[i].checked = true;
			} 
			t.id.ptfarmcityall[i].addEventListener ('change', function () {
				var cid = this.id.split('_')[1];
				Options.pbfarmcityall['c'+cid] = this.checked;
				saveOptions();
				t.show();
			}, false);
		}

		t.id.ptfarmtype = [];
		t.id.ptfarmtype.push(document.getElementById('pbfarmtype1'));	
		t.id.ptfarmtype.push(document.getElementById('pbfarmtype2'));
		for (var i = 0; i < t.id.ptfarmtype.length; i++) {
			t.id.ptfarmtype[i].addEventListener('click', function() {
				Options.pbfarmtype = this.value;
				saveOptions();
				t.show();
			}, false);	
		}
		t.radioselect(t.id.ptfarmtype, Options.pbfarmtype);		
		
		t.id.ptfarmEW = [];
		t.id.ptfarmEW.push(document.getElementById('pbfarmEW1'));	
		t.id.ptfarmEW.push(document.getElementById('pbfarmEW2'));	
		for (var i = 0; i < t.id.ptfarmEW.length; i++) {
			t.id.ptfarmEW[i].addEventListener('click', function() {
				Options.pbfarmEW = this.value;
				saveOptions();
				t.show();
			}, false);	
		}
		t.radioselect(t.id.ptfarmEW, Options.pbfarmEW);		
		t.id.ptfarmEWatype = document.getElementById('ptfarmEWatype');		
		t.id.ptfarmx = document.getElementById('ptfarmx');
		t.id.ptfarmy = document.getElementById('ptfarmy');		
		t.id.ptdist = document.getElementById('ptdist');			
		t.id.ptfieldinfo = document.getElementById('ptfieldinfo');			
	
		t.id.ptfarmEF = [];
		t.id.ptfarmEF.push(document.getElementById('pbfarmEF1'));	
		t.id.ptfarmEF.push(document.getElementById('pbfarmEF2'));	
		for (var i = 0; i < t.id.ptfarmEF.length; i++) {
			t.id.ptfarmEF[i].addEventListener('click', function() {
				Options.pbfarmEF = this.value;
				saveOptions();
				t.show();
			}, false);	
		}
		t.radioselect(t.id.ptfarmEF, Options.pbfarmEF);		
		t.id.ptfarmEFatype = document.getElementById('ptfarmEFatype');	
		t.id.ptfarmklist = document.getElementById('ptfarmklist');
		t.id.ptfarmkcheck = document.getElementById('ptfarmkcheck');
		t.id.ptcheckinfo = document.getElementById('ptcheckinfo');			

		t.id.ptfarminterval = document.getElementById('ptfarminterval');
		t.id.ptfarmenergysave = document.getElementById('ptfarmenergysave');		
		t.id.ptfarmhidemodal = document.getElementById('ptfarmhidemodal');
		t.id.ptfarmdeletereport = document.getElementById('ptfarmdeletereport');
		t.id.ptfarmhidewait = document.getElementById('ptfarmhidewait');
		t.id.ptchkattackboost = document.getElementById('ptchkattackboost');
		t.id.ptchkhealthboost = document.getElementById('ptchkhealthboost');
		
		t.id.ptfarmu1 = document.getElementById('ptfarmu1');
		//t.id.ptfarmu2 = document.getElementById('ptfarmu2');
		//t.id.ptfarmu3 = document.getElementById('ptfarmu3');
		t.id.ptfarmu4 = document.getElementById('ptfarmu4');
		t.id.ptfarmu5 = document.getElementById('ptfarmu5');
		t.id.ptfarmu6 = document.getElementById('ptfarmu6');
		t.id.ptfarmu7 = document.getElementById('ptfarmu7');
		t.id.ptfarmu8 = document.getElementById('ptfarmu8');
		t.id.ptfarmu9 = document.getElementById('ptfarmu9');
		t.id.ptfarmu10 = document.getElementById('ptfarmu10');
		t.id.ptfarmu11 = document.getElementById('ptfarmu11');
		t.id.ptfarmu12 = document.getElementById('ptfarmu12');
		t.id.ptfarmu13 = document.getElementById('ptfarmu13');
		//t.id.ptfarmu14 = document.getElementById('ptfarmu14');
		//t.id.ptfarmu15 = document.getElementById('ptfarmu15');
		t.id.ptfarmu16 = document.getElementById('ptfarmu16');
		t.id.ptfarmu17 = document.getElementById('ptfarmu17');
		t.id.ptfarmu18 = document.getElementById('ptfarmu18');
		t.id.ptfarmu19 = document.getElementById('ptfarmu19');
		//t.id.ptfarmu20 = document.getElementById('ptfarmu20');
		t.id.ptfarmu21 = document.getElementById('ptfarmu21');
		t.id.ptfarmu22 = document.getElementById('ptfarmu22');
		//t.id.ptfarmu23 = document.getElementById('ptfarmu23');
		t.id.ptfarmu24 = document.getElementById('ptfarmu24');

		t.id.ptButClearALog = document.getElementById('ptButClearALog');
		t.id.ptfarmattackboost = document.getElementById('ptfarmattackboost');
		t.id.ptfarmhealthboost = document.getElementById('ptfarmhealthboost');
		t.id.ptclearlistpos = document.getElementById('ptclearlistpos');
		t.id.ptfarmlog = document.getElementById('ptfarmlog');

		t.id.ptboxMessage = document.getElementById('ptboxMessage');
		t.id.ptboxType = document.getElementById('ptboxType');			
		t.id.ptboxEW = document.getElementById('ptboxEW');		
		t.id.ptboxAW = document.getElementById('ptboxAW');		
		t.id.ptboxEF = document.getElementById('ptboxEF');		
		t.id.ptboxAF = document.getElementById('ptboxAF');
		t.id.ptboxOptions = document.getElementById('ptboxOptions');			
		t.id.ptboxTroops = document.getElementById('ptboxTroops');	
		t.id.ptfarmhelp = document.getElementById('ptfarmhelp');
		
		//Probox
		t.id.ptfarmpro = document.getElementById('ptfarmpro');			
		t.id.ptboxpro = document.getElementById('ptboxPro');
		t.id.ptfarmprot = document.getElementById('ptfarmprot');
		t.id.ptfarmprow = document.getElementById('ptfarmprow');
		t.id.ptfarmterror = document.getElementById('ptfarmterror');
		t.id.ptfarmblockmax = document.getElementById('ptfarmblockmax');
		
		//Determine Information about the Target
		t.finfo();

		//Bind Events
		t.id.ptfarmEWatype.addEventListener('change', function (evt) {
			Options.pbfarmEW_atype = evt.target.value;
			saveOptions();
			t.show();
		}, false);		

		for (var i = 0; i < t.id.ptfarmAWats.length; i++) {
			t.id.ptfarmAWats[i].addEventListener ('change', function (evt) {
				var cid = this.id.split('_')[1];
				Options.pbfarmAW_ats['c'+cid] = evt.target.value;
				saveOptions();
				t.show();
			}, false);
		}

		for (var i = 0; i < t.id.ptfarmAFats.length; i++) {
			t.id.ptfarmAFats[i].addEventListener ('change', function (evt) {
				var cid = this.id.split('_')[1];
				Options.pbfarmAF_ats['c'+cid] = evt.target.value;
				saveOptions();
				t.show();
			}, false);
		}
		
		t.id.ptfarmEFatype.addEventListener('change', function (evt) {
			Options.pbfarmEF_atype = evt.target.value;
			saveOptions();
			t.show();
		}, false);	

		t.changeOpt (t.id.ptfarmprot, 'pbfarmprot');		
		t.changeOpt (t.id.ptfarmprow, 'pbfarmprow');
		t.id.ptfarmblockmax.addEventListener('change', function (evt) {
			Options.pbfarmblockmax = evt.target.value;
			saveOptions();
		}, false);
		t.id.ptfarmpro.addEventListener('click', function (evt) {
			if (this.checked) {
				t.id.ptboxpro.style.display = "block";
			} else {
				t.id.ptboxpro.style.display = "none";			
			}
		}, false);
		
		t.changeOpt (t.id.ptfarmklist, 'pbfarmklist');
		t.changeOpt (t.id.ptfarmx, 'pbfarmx');
		t.changeOpt (t.id.ptfarmy, 'pbfarmy');
		
		t.changeOpt (t.id.ptfarminterval, 'pbfarminterval');
		t.changeOpt (t.id.ptfarmenergysave, 'pbfarmenergysave');	
		t.togOpt (t.id.ptfarmhidemodal, 'pbfarmhidemodal');
		t.togOpt (t.id.ptfarmdeletereport, 'pbfarmdeletereport');		
		t.togOpt (t.id.ptfarmhidewait, 'pbfarmhidewait');
		t.togOpt (t.id.ptchkattackboost, 'Options.attackConfig.attackboost');
		t.togOpt (t.id.ptchkhealthboost, 'Options.attackConfig.healthboost');
		
		t.changeOpt (t.id.ptfarmu1, 'pbfarmu1');			
		//t.changeOpt (t.id.ptfarmu2, 'pbfarmu2');	
		//t.changeOpt (t.id.ptfarmu3, 'pbfarmu3');	
		t.changeOpt (t.id.ptfarmu4, 'pbfarmu4');	
		t.changeOpt (t.id.ptfarmu5, 'pbfarmu5');	
		t.changeOpt (t.id.ptfarmu6, 'pbfarmu6');	
		t.changeOpt (t.id.ptfarmu7, 'pbfarmu7');	
		t.changeOpt (t.id.ptfarmu8, 'pbfarmu8');	
		t.changeOpt (t.id.ptfarmu9, 'pbfarmu9');	
		t.changeOpt (t.id.ptfarmu10, 'pbfarmu10');	
		t.changeOpt (t.id.ptfarmu11, 'pbfarmu11');	
		t.changeOpt (t.id.ptfarmu12, 'pbfarmu12');	
		t.changeOpt (t.id.ptfarmu13, 'pbfarmu13');	
		//t.changeOpt (t.id.ptfarmu14, 'pbfarmu14');	
		//t.changeOpt (t.id.ptfarmu15, 'pbfarmu15');	
		t.changeOpt (t.id.ptfarmu16, 'pbfarmu16');	
		t.changeOpt (t.id.ptfarmu17, 'pbfarmu17');	
		t.changeOpt (t.id.ptfarmu18, 'pbfarmu18');	
		t.changeOpt (t.id.ptfarmu19, 'pbfarmu19');	
		//t.changeOpt (t.id.ptfarmu20, 'pbfarmu20');			
		t.changeOpt (t.id.ptfarmu21, 'pbfarmu21');	
		t.changeOpt (t.id.ptfarmu22, 'pbfarmu22');	
		//t.changeOpt (t.id.ptfarmu23, 'pbfarmu23');	
		t.changeOpt (t.id.ptfarmu24, 'pbfarmu24');

		t.id.ptfarmhealthboost.addEventListener('click', t.BoostHealth, false);
		t.id.ptfarmattackboost.addEventListener('click', t.BoostAttack, false);

		t.id.ptclearlistpos.addEventListener('click', t.ClearListPos, false);
		
		t.id.ptButClearALog.addEventListener('click', t.ClearALog, false);	
		t.id.ptfarmstart.addEventListener('click', t.AttackOnOff, false);	
		t.id.ptfarmkcheck.addEventListener('click', t.klistcheck, false);	
		t.id.ptfarmhelp.addEventListener('click', t.farmhelp, false);
		t.id.ptfarmterror.addEventListener('click', function() {
			Options.terrorcoords = {};
			saveOptions();
			alert('The Target List has been Cleared.');
		}, false);
		
		setInterval(t.fAttack, 2000);
		
		t.show();
	},

	farmhelp : function () {
		var t = Tabs.Farm;	
    if (t.pophelp == null){  
      t.pophelp = new CPopup('farmhelp', 50, 50, 500,550, true);
      t.pophelp.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Farm Tab Help</b>';
			var content = [];
			content.push('<div style="height: 500px; overflow: auto;" class="pbhelp">');
			content.push('<h2>Stay Tuned for a Help Section.</h2>');
			content.push('</div>');
      t.pophelp.getMainDiv().innerHTML = content.join('');
		}
		t.pophelp.show (true);
	},

  show : function (){
    var t = Tabs.Farm;

		//Button to enter text
		t.id.ptfarmstart.value = t.startvalue;

		//Hide the Boxes
		var citycount = 0;
		for (var i = 0; i < Cities.numCities; i++) {
			if (Options.pbfarmcityall['c'+Cities.cities[i].id]) {
				citycount++;
			}
		}

		if (citycount == 0) {
				t.id.ptboxEW.style.display = "none";		
				t.id.ptboxAW.style.display = "none";		
				t.id.ptboxEF.style.display = "none";		
				t.id.ptboxAF.style.display = "none";	
				t.id.ptboxMessage.style.display = "block";		
				t.id.ptboxType.style.display = "none";		
				t.id.ptboxOptions.style.display = "none";		
				t.id.ptboxTroops.style.display = "none";					
		} else {
				t.id.ptboxEW.style.display = "none";		
				t.id.ptboxAW.style.display = "none";		
				t.id.ptboxEF.style.display = "none";		
				t.id.ptboxAF.style.display = "none";	
				t.id.ptboxMessage.style.display = "none";		
				t.id.ptboxType.style.display = "block";		
				t.id.ptboxOptions.style.display = "block";		
				t.id.ptboxTroops.style.display = "block";				
		}
		
		if (citycount > 1) {
			if (Options.pbfarmtype == "w") {
				t.id.ptboxEW.style.display = "none";		
				t.id.ptboxAW.style.display = "block";		
				t.id.ptboxEF.style.display = "none";		
				t.id.ptboxAF.style.display = "none";			
			} else {
				t.id.ptboxEW.style.display = "none";		
				t.id.ptboxAW.style.display = "none";		
				t.id.ptboxEF.style.display = "none";		
				t.id.ptboxAF.style.display = "block";					
			}
		} else if (citycount == 1) {
			if (Options.pbfarmtype == "w") {
				t.id.ptboxEW.style.display = "block";		
				t.id.ptboxAW.style.display = "none";		
				t.id.ptboxEF.style.display = "none";		
				t.id.ptboxAF.style.display = "none";				
			} else {
				t.id.ptboxEW.style.display = "none";		
				t.id.ptboxAW.style.display = "none";		
				t.id.ptboxEF.style.display = "block";		
				t.id.ptboxAF.style.display = "none";	
			}		
		}

		//If no attacks are running, show elements
		if (!t.started) t.elementdisplay(false);

		//Make sure not to Send Unused units.
		Options.pbfarmu2 = "0";
		Options.pbfarmu3 = "0";
		Options.pbfarmu14 = "0";		
		Options.pbfarmu15 = "0";
		Options.pbfarmu20 = "0";			
		Options.pbfarmu23 = "0";				
	
		//Determine the Amount of Generals Energy
		t.freeEnergy();
			
		//Determine the Distance from the City.
		if (citycount == 1) {
			var index = 0;
			for(var i = 0; i < Cities.numCities; i++) {
				if (Options.pbfarmcityall['c'+Cities.cities[i].id]) {
					index = i;
				}
			}
			var x1 = parseInt(Seed.cities[index][2]);
			var y1 = parseInt(Seed.cities[index][3]);
			var x2 = parseInt(Options.pbfarmx);
			var y2 = parseInt(Options.pbfarmy);
			var dist = (Math.round(Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))*100)/100).toString();
			t.id.ptdist.innerHTML = 'Distance: <b>' + dist + '</b> to <b>' + Seed.cities[index][1] + '</b>';
		} else {
			t.id.ptdist.innerHTML = '';
		}

		//Logbook output
		t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);

		//If attacks are running, Hide elements
		if (t.started) t.elementdisplay(true);
  },

	elementdisplay : function(tf) {
		var t = Tabs.Farm;
		for (var i = 0; i < t.id.ptfarmcityall.length; i++) {
			t.id.ptfarmcityall[i].disabled = tf;
			t.id.ptfarmAWats[i].disabled = tf;
			t.id.ptfarmAFats[i].disabled = tf;
		}
		t.id.ptfarmtype[0].disabled = tf;
		t.id.ptfarmtype[1].disabled = tf;

		t.id.ptfarmEW[0].disabled = tf;
		t.id.ptfarmEW[1].disabled = tf;
		t.id.ptfarmEWatype.disabled = tf;
		t.id.ptfarmx.disabled = tf;
		t.id.ptfarmy.disabled = tf;

		t.id.ptfarmEF[0].disabled = tf;
		t.id.ptfarmEF[1].disabled = tf;
		t.id.ptfarmEFatype.disabled = tf;
		t.id.ptfarmklist.disabled = tf;
		t.id.ptfarmkcheck.disabled = tf;

		t.id.ptfarminterval.disabled = tf;
		t.id.ptfarmenergysave.disabled = tf;

		t.id.ptfarmu1.disabled = tf;
		//t.id.ptfarmu2.disabled = tf;
		//t.id.ptfarmu3.disabled = tf;
		t.id.ptfarmu4.disabled = tf;
		t.id.ptfarmu5.disabled = tf;
		t.id.ptfarmu6.disabled = tf;
		t.id.ptfarmu7.disabled = tf;
		t.id.ptfarmu8.disabled = tf;
		t.id.ptfarmu9.disabled = tf;
		t.id.ptfarmu10.disabled = tf;
		t.id.ptfarmu11.disabled = tf;
		t.id.ptfarmu12.disabled = tf;
		t.id.ptfarmu13.disabled = tf;
		//t.id.ptfarmu14.disabled = tf;
		//t.id.ptfarmu15.disabled = tf;
		t.id.ptfarmu16.disabled = tf;
		t.id.ptfarmu17.disabled = tf;
		t.id.ptfarmu18.disabled = tf;
		t.id.ptfarmu19.disabled = tf;
		//t.id.ptfarmu20.disabled = tf;
		t.id.ptfarmu21.disabled = tf;
		t.id.ptfarmu22.disabled = tf;
		//t.id.ptfarmu23.disabled = tf;
		t.id.ptfarmu24.disabled = tf;
	},

	radioselect : function(radioids, option) {
		for (var i = 0; i < radioids.length; i++) {
			if (radioids[i].value == option) radioids[i].checked = true;
		}
	},

	klistcheck : function() {
		var t = Tabs.Farm;
		var counter = 0;
		var ktemp = [];
		var u_coords = Options.pbfarmklist.split("\n");
		for (var i = 0; i < u_coords.length; i++) {
			var xy = u_coords[i].split(',');
			var x = parseInt(xy[0],10);
			var y = parseInt(xy[1],10);
			if (isNaN(x) || isNaN(y)) continue;
			if (x < 1 || x > 800) continue;
			if (y < 1 || y > 800) continue;
			ktemp.push(x+","+y);
			counter++;
		};
		Options.pbfarmklist = ktemp.join("\n");
		saveOptions();
		t.id.ptcheckinfo.innerHTML = counter + ' Valid Coordinates Found';
		t.id.ptfarmklist.value = Options.pbfarmklist;
		if (counter > 0) {
			return true;
		} else {
			return false;
		}
	},

	modal : function() {
		var t = Tabs.Farm;
		clearTimeout (t.modalTimer);
		if (t.started) {
			if (Options.pbfarmhidemodal) unsafeWindow.Modal.hideModalAll();
			t.modalTimer = setTimeout (t.modal, 2500);
		}
	},

	freeEnergy : function() {
		var t = Tabs.Farm;
		for(var i=0; i<Cities.numCities; i++) {
			var energy = 0;
			var cid = "city" + Cities.cities[i].id;
			var l1 = Seed.leaders[cid].resourcefulnessKnightId;
			var l2 = Seed.leaders[cid].politicsKnightId;
			var l3 = Seed.leaders[cid].combatKnightId;
			var l4 = Seed.leaders[cid].intelligenceKnightId;
			var generals = Seed.knights[cid];
			//Determine Stock of generals
			var stock = [];
			for (var m in Seed.outgoing_marches["c" + Cities.cities[i].id]) {
				var march = Seed.outgoing_marches["c" + Cities.cities[i].id][m];
				if (march.marchType == 2 && march.marchStatus == 2 && march.knightId != 0) {
					stock.push(march.knightId);
				}
			}
			//Add up Energy points
			for (var g in generals) {
				if (generals[g].knightId == l1 || generals[g].knightId == l2 || generals[g].knightId == l3 || generals[g].knightId == l4) continue;
				//stock General?
				if (stock.length > 0) {
					if (stock.exists(g.substr(3))) continue;
				}
				energy += parseInt(generals[g].knightEnergy);
			}
			t.id.ptenergy[i].innerHTML = energy + ' Attacks Possible';
		}
	},

	fAttack : function() {
		function status(ms) {
			var ret = {};
			ret.s = '';
			ret.l = '';
			switch (parseInt(ms)) {
				case 1: ret.s = 'Z'; ret.l = 'On the Way to Target'; break;
				case 2: ret.s = 'L'; ret.l = 'Encamped'; break;
				case 5: ret.s = 'W'; ret.l = 'Waiting for Report'; break;
				case 7: ret.s = 'S'; ret.l = 'Situation Changed'; break;
				case 8: ret.s = 'R'; ret.l = 'Returned'; break;
				case 9: ret.s = 'A'; ret.l = 'Abort'; break;
				default: ret.s = 'U'; ret.l = 'martch Status Unknown'; break;
			}
			return ret;
    }

		var t = Tabs.Farm;
		//Update Marches.
		t.updatemarches();
		for(var i=0; i<Cities.numCities; i++) {
			var out = '<table><tr>';
			for (var m in Seed.outgoing_marches["c" + Cities.cities[i].id]) {
				var march = Seed.outgoing_marches["c" + Cities.cities[i].id][m];
				var st = status(march.marchStatus);
				//Transport
				if (march.marchType == 1 && march.marchStatus != 0) {
					out += '<td style="border:1px solid white; padding: 2px; width: 20px; background-color: blue; text-align: center; color: white; font-weight: bold; font-size: 9px;" title="Transport - '+st.l+'">T-'+st.s+'</td>';
				}	
				//Reinforce
				if (march.marchType == 2 && march.marchStatus != 0) {
					out += '<td style="border:1px solid white; padding: 2px; width: 20px; background-color: orange; text-align: center; color: white; font-weight: bold; font-size: 9px;" title="Reinforce - '+st.l+'">V-'+st.s+'</td>';
				}	
				//Attack
				if (march.marchType == 4 && march.marchStatus != 0) {
					out += '<td style="border:1px solid white; padding: 2px; width: 20px; background-color: maroon; text-align: center; color: white; font-weight: bold; font-size: 9px;" title="Attack - '+st.l+'">A-'+st.s+'</td>';
				}
				//Reassigning
				if (march.marchType == 5 && march.marchStatus != 0) {
					out += '<td style="border:1px solid white; padding: 2px; width: 20px; background-color: green; text-align: center; color: white; font-weight: bold; font-size: 9px;" title="Reassigning - '+st.l+'">Z-'+st.s+'</td>';
				}	
			}
			out += '</tr></table>';
			t.id.ptfattack[i].innerHTML = out;
		}
	},
	
	ClearALog : function () {
		var t = Tabs.Farm;
		Logs.farmlog = [];
		saveLogs();
		clearTimeout (t.displayTimer);
		t.show();
	},
	
	ClearListPos : function () {
		var t = Tabs.Artifacts;
		Options.pbfarmcoordlistpointer = 0;
		saveOptions();
		Logbook.entry(Logs.farmlog, 'Target List Position Reset.');
		t.show();
	},

	AttackOnOff : function () {
		var t = Tabs.Farm;
		if (t.started) {
			t.started = false;
			t.startvalue = "Stop Attacks";
			clearTimeout (t.attackTimer);
			clearTimeout (t.blockreadtimer);
			clearTimeout (t.modalTimer);
			clearTimeout (t.reportTimer);	
			if (t.stopreload) {
				t.stopreload = false; 
				Options.pbEveryEnable = true;
				RefreshEvery.setEnable(true);
				Logbook.entry(Logs.farmlog,'Auto-Reload of GW Stopped.');
				t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
			}
			//Check that attack booster is needed
			if (Options.attackConfig.attackBoost == true &&
				parseInt(Seed.bonus.bC2600.bT2601) < now) {
					t.BoostAttack();
			}
			//Check that health booster is needed
			if (Options.attackConfig.healthBoost == true &&
				parseInt(Seed.bonus.bC2700.bT2701) < now) {
					t.BoostHealth();
			}
		} else {
			//Attacks Possible?
			var ok = true;
			var emsg = "";
			//Determine the Number of Cities
			t.fcity = [];
			t.fend = [];
			t.klistpointers = {};
			var citycount = 0;
			for (var i = 0; i < Cities.numCities; i++) {
				if (Options.pbfarmcityall['c'+Cities.cities[i].id]) {
					t.fcity.push('c'+Cities.cities[i].id);
					t.fend.push(true);
					t.klistpointers['c'+Cities.cities[i].id] = 0;
					citycount++;
				}
			}
			
			if (citycount == 0) {
				emsg+= 'Please Select at least one City.<br>';
				ok = false;			
			} else {
				if (citycount == 1 && Options.pbfarmtype == "w" && Options.pbfarmEW == "m") {
					//Admissible Coordinates
					Options.pbfarmx = parseInt(Options.pbfarmx);
					Options.pbfarmy = parseInt(Options.pbfarmy);
					if (Options.pbfarmx < 1 || Options.pbfarmx > 800) {
						emsg+= 'The X Coordinate must be Between 1 and 800.<br>';
						ok = false;
					}
					if (Options.pbfarmy < 1 || Options.pbfarmy > 800) {
						emsg+= 'The Y Coordinate must be Between 1 and 800.<br>';
						ok = false;
					}				
				}
				
				if (citycount == 1 && Options.pbfarmtype == "f" && Options.pbfarmEF == "m") {
					//Coordinates Valid?
					if (!t.klistcheck()) {
						emsg+= 'You must enter at least one Valid set of coordinates in the list.<br>';
						ok = false;				
					}			
				}
				
				//Min. 2 Second Interval
				Options.pbfarminterval = parseInt(Options.pbfarminterval);
				if (Options.pbfarminterval < 2) {
					emsg+= 'The interval between attacks must be at least 2 seconds.<br>';
					ok = false;				
				}
				Options.pbfarmenergysave = parseInt(Options.pbfarmenergysave);

				//Any troops entered?
				var troops = false;
				for (var r = 1; r < 25; r++){
					Options['pbfarmu' + r] = parseInt(Options['pbfarmu' + r]);
					if (Options['pbfarmu' + r] > 0) {
						troops = true;				
					}
				}
				if (!troops) {
					emsg+= 'You Must enter some Troops!<br>';
					ok = false;				
				}
				
				//Enough troops?
				for (var i = 0; i < Cities.numCities; i++) {
					if (Options.pbfarmcityall['c'+Cities.cities[i].id]) {
						var troops = true;
						var c = "city" + Cities.cities[i].id;
						for (var r = 1; r < 25; r++){
							if (Seed.units[c]['unt' + r] < Options['pbfarmu' + r]) {
								troops = false;
								ok = false;				
							}
						}
						if (!troops) emsg+= 'You do not have enough troops in <b>'+Cities.cities[i].name+'!</b><br>';
					
					}
				}
			}
	
			//No Errors?
			if (ok) {
				//Relaod verhindern
				if (Options.pbEveryEnable) {
					t.stopreload = true;
					Options.pbEveryEnable = false;
					RefreshEvery.setEnable(false);
					Logbook.entry(Logs.farmlog,'Auto-reload GW Stopped.');
					t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
				}
			
				t.coordlist = {};
				//What are the Coordinates to be searched?
				t.targettype = {};
				t.targetlevel = {};
				var autosearch = false;
				
				if (citycount == 1 && Options.pbfarmtype == "w" && Options.pbfarmEW == "a") {
					//One City, Wave Attack, Automatic Coordinate Search
					autosearch = true;
					for (var i = 0; i < Cities.numCities; i++) {
						if (Options.pbfarmcityall['c'+Cities.cities[i].id]) {
							t.targettype['c'+Cities.cities[i].id] = Options.pbfarmEW_atype.substring(0,1);
							t.targetlevel['c'+Cities.cities[i].id] = Options.Options.pbfarmEW_atype.substring(1);
						}
					}
				}
				if (citycount > 1 && Options.pbfarmtype == "w") {
					//Several Cities, Wave Attack, Automatic Coordinate Search
					autosearch = true;
					for (var i = 0; i < Cities.numCities; i++) {
						if (Options.pbfarmcityall['c'+Cities.cities[i].id]) {
							t.targettype['c'+Cities.cities[i].id] = Options.pbfarmAW_ats['c'+Cities.cities[i].id].substring(0,1);
							t.targetlevel['c'+Cities.cities[i].id] = Options.pbfarmAW_ats['c'+Cities.cities[i].id].substring(1);
						}
					}
				}				
				if (citycount == 1 && Options.pbfarmtype == "f" && Options.pbfarmEF == "a") {
					//One City, Farm Attack, Automatic Coordinate Search
					autosearch = true;
					for (var i = 0; i < Cities.numCities; i++) {
						if (Options.pbfarmcityall['c'+Cities.cities[i].id]) {
							t.targettype['c'+Cities.cities[i].id] = Options.pbfarmEF_atype.substring(0,1);
							t.targetlevel['c'+Cities.cities[i].id] = Options.pbfarmEF_atype.substring(1);
						}
					}
				}
				if (citycount > 1 && Options.pbfarmtype == "f") {
					//Several Cities, Farm Attack, Automatic Coordinate Search
					autosearch = true;
					for (var i = 0; i < Cities.numCities; i++) {
						if (Options.pbfarmcityall['c'+Cities.cities[i].id]) {
							t.targettype['c'+Cities.cities[i].id] = Options.pbfarmAF_ats['c'+Cities.cities[i].id].substring(0,1);
							t.targetlevel['c'+Cities.cities[i].id] = Options.pbfarmAF_ats['c'+Cities.cities[i].id].substring(1);
						}
					}
				}
				
				t.mapread = false;
				t.fcitypointer = 0;
				if (autosearch) {
					t.coordread();
					t.readmap();
				} else {
					t.klistpointers[t.fcity[0]] = 0;
					t.coords[t.fcity[0]] = parseInt(Options.pbfarmx)+','+parseInt(Options.pbfarmy);
					t.coordlist[t.fcity[0]] = [];
					var u_coords = Options.pbfarmklist.split("\n");
					for (var i = 0; i < u_coords.length; i++) {
						var xy = u_coords[i].split(',');
						var x = parseInt(xy[0],10);
						var y = parseInt(xy[1],10);
						if (isNaN(x) || isNaN(y)) continue;
						if (x < 1 || x > 800) continue;
						if (y < 1 || y > 800) continue;			
						t.coordlist[t.fcity[0]].push(x+","+y);
					}
				}
				
				t.started = true;
				t.startvalue = "Stop Attacks";			
				
				//Attacks Started
				t.attackStart();
				t.modal();
				t.startUnixTime = unixTime();
				t.reportTimer = setTimeout (t.report, 10000);
			} else {
				Logbook.entry(Logs.farmlog,emsg);
				t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
			}
		}
		t.show();
	},

	readmap : function () {
    var t = Tabs.Farm;	
		clearTimeout (t.blockreadtimer);
		if (t.mapread && t.blockread && t.blockpointer < t.blocklist.length) {
			
			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			params.blocks = t.blocklist[t.blockpointer];
			t.blockread = false;
			Logbook.entry(Logs.farmlog,'Map Section '+(t.blockpointer+1)+' / '+t.blocklist.length+' Queried by the server.');		
			t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);		
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					t.mapres(rslt);
				},
				onFailure: function (rslt) {
					t.mapres(rslt);
				}
			});
		}
		if (t.blockpointer >= t.blocklist.length) {
			Logbook.entry(Logs.farmlog,'Map Data Complete');		
			t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);	
			t.mapfinal();
			t.mapread = false;
			return;
		}

		t.blockreadtimer = setTimeout (t.readmap, 250);
	},

	mapres : function (rslt){
    var t = Tabs.Farm;
		if (rslt.ok) {
			//Data Processing
			for (var e in rslt.data) {
				var element = rslt.data[e];
				//element.xCoord;
				//element.yCoord;	
				//element.tileType;
				//element.tileLevel;
				//element.tileUserId;
				if (element.tileType == '51' && element.tileUserId == '0') {
					//Terroristen
					var tc = {};
					tc.d = 0;
					tc.x = element.xCoord;
					tc.y = element.yCoord;
					t.tcoords['t'+element.tileLevel].push(tc);
				}
				if ((element.tileType == '10' || element.tileType == '12' || 
						element.tileType == '20' || element.tileType == '30' ||
						element.tileType == '40' || element.tileType == '50') && 
						element.tileUserId == '0') {
					//Free Wilds
					var wc = {};
					wc.d = 0;
					wc.x = element.xCoord;
					wc.y = element.yCoord;
					t.wcoords['w'+element.tileLevel].push(wc);
				}	
			}
			
			Logbook.entry(Logs.farmlog,'Map Section '+(t.blockpointer+1)+' / '+t.blocklist.length+' was loaded successfully');		
			t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);				
			t.blockpointer++;
		} else {
			Logbook.entry(Logs.farmlog,'Failed to retrieve map section '+(t.blockpointer+1)+'/'+t.blocklist.length);		
			t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);			
		}
		t.blockread = true;		
	},

	mapfinal : function () {
		var t = Tabs.Farm;
		for (var c = 0; c < Cities.numCities; c++) {
			if (Options.pbfarmcityall['c'+Cities.cities[c].id]) {	
				if (t.targettype['c'+Cities.cities[c].id] == 't') {
				
					//Coordinates already there?
					if (t.coordlist['c'+Cities.cities[c].id] && 
							t.coordlist['c'+Cities.cities[c].id].length > 0) {
						//Data already available for this city.
						
					} else {
						//Proccessing Terrorist Data
						for (var l = 1 ; l < 11 ; l++) {
							if (t.tcoords['t'+l].length > 80) {
								for (var i = 0; i < t.tcoords['t'+l].length; i++) {
									//Determine Distances.
									t.tcoords['t'+l][i].d = t.distcity(t.tcoords['t'+l][i].x, t.tcoords['t'+l][i].y, Cities.cities[c].x, Cities.cities[c].y);
								}						
								//Sort
								t.tcoords['t'+l].sort(function(a,b) {return (a.d > b.d) ? 1 : ((b.d > a.d) ? -1 : 0);} );	
								//Transferred to Options.terrorcoords
								Options.terrorcoords['c'+Cities.cities[c].id+'_'+l] = '';
								for (var i = 0; i < t.tcoords['t'+l].length; i++) {
									if (i == 80) break;
									Options.terrorcoords['c'+Cities.cities[c].id+'_'+l] += t.tcoords['t'+l][i].x+','+t.tcoords['t'+l][i].y+'/';
								}
							} else {
								//Not Enough terrorist camps.
								Logbook.entry(Logs.farmlog,'<span class="boldRed">To few terrorist camps found<br>Change the "T-Search" option in the Pro-options to be a wider radius.</span>');
								t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
								t.started = false;
								t.startvalue = "Run Attacks";
								clearTimeout (t.attackTimer);
								clearTimeout (t.blockreadtimer);
								clearTimeout (t.modalTimer);
								clearTimeout (t.reportTimer);	
								if (t.stopreload) {
									t.stopreload = false; 
									Options.pbEveryEnable = true;
									RefreshEvery.setEnable(true);
									Logbook.entry(Logs.farmlog,'Auto-Reload GW Started');
									t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
								}	
								t.blocks = [];
								t.blocklist = [];
								t.tcoords = {};
								t.wcoords = {};
								t.show();
								return;				
							}
						}
						Options.terrorcoords['c'+Cities.cities[c].id+'_0'] = Cities.cities[c].x+','+Cities.cities[c].y;
						//Coordinates of Terrorist Camps
						t.coordlist['c'+Cities.cities[c].id] = Options.terrorcoords['c'+Cities.cities[c].id+'_'+t.targetlevel['c'+Cities.cities[c].id]].split('/');
						t.coords['c'+Cities.cities[c].id] = t.coordlist['c'+Cities.cities[c].id][0];	
					}
				} else {
					//Proccessing Wilds Data
					if (t.wcoords['w'+t.targetlevel['c'+Cities.cities[c].id]].length > 0) {
						for (var i = 0; i < t.wcoords['w'+t.targetlevel['c'+Cities.cities[c].id]].length; i++) {
							//Determine the Distance
							t.wcoords['w'+t.targetlevel['c'+Cities.cities[c].id]][i].d = t.distcity(t.wcoords['w'+t.targetlevel['c'+Cities.cities[c].id]][i].x, t.wcoords['w'+t.targetlevel['c'+Cities.cities[c].id]][i].y, Cities.cities[c].x, Cities.cities[c].y);
						}						
						//Sort
						t.wcoords['w'+t.targetlevel['c'+Cities.cities[c].id]].sort(function(a,b) {return (a.d > b.d) ? 1 : ((b.d > a.d) ? -1 : 0);} );	
						//Wilds Coordinates Provided.
						t.coords['c'+Cities.cities[c].id] = t.wcoords['w'+t.targetlevel['c'+Cities.cities[c].id]][0].x + ',' + t.wcoords['w'+t.targetlevel['c'+Cities.cities[c].id]][0].y; 
					} else {
						//No Free wilds Found
						Logbook.entry(Logs.farmlog,'<span class="boldRed">No free wilds found.<br>Change the "W-Search" option in the Pro-options to be a wider radius!</span>');
						t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
						t.started = false;
						t.startvalue = "Run Attacks";
						clearTimeout (t.attackTimer);
						clearTimeout (t.blockreadtimer);
						clearTimeout (t.modalTimer);
						clearTimeout (t.reportTimer);	
						if (t.stopreload) {
							t.stopreload = false; 
							Options.pbEveryEnable = true;
							RefreshEvery.setEnable(true);
							Logbook.entry(Logs.farmlog,'Auto-Reload GW Started');
							t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
						}	
						t.blocks = [];
						t.blocklist = [];
						t.tcoords = {};
						t.wcoords = {};
						t.show();
						return;				
					}
				}
			}
		}
		saveOptions();
		//Delete Temporary Data
		t.blocks = [];
		t.blocklist = [];
		t.tcoords = {};
		t.wcoords = {};
	},
	
	distcity: function(x, y, xc, yc) {	
		var xcenter = parseInt(xc);
		var ycenter = parseInt(yc);
		var xdist = xcenter - x;
		var ydist = ycenter - y;
		var dist = Math.sqrt(xdist * xdist + ydist * ydist);
		return dist;
	},
	
	coordread : function () {
		var t = Tabs.Farm;
		t.blocks = [];
		t.coordlist = {};
		t.coords = {};
		for (var i = 0; i < Cities.numCities; i++) {
			var kread = false;
			if (Options.pbfarmcityall['c'+Cities.cities[i].id]) {
				//Terrorists
				if (t.targettype['c'+Cities.cities[i].id] == 't') {
					//City Coordinates Exsist?
					if (Options.terrorcoords['c'+Cities.cities[i].id+'_0'] && 
							Options.terrorcoords['c'+Cities.cities[i].id+'_0'].length > 0) {
						var coords = Options.terrorcoords['c'+Cities.cities[i].id+'_0'].split(',');
						//Coordinates of the city remained the same?
						if (parseInt(coords[0]) == Cities.cities[i].x &&
								parseInt(coords[1]) == Cities.cities[i].y) {
							//Coordinates of Terrorists available?
							if (Options.terrorcoords['c'+Cities.cities[i].id+'_'+t.targetlevel['c'+Cities.cities[i].id]] &&
									Options.terrorcoords['c'+Cities.cities[i].id+'_'+t.targetlevel['c'+Cities.cities[i].id]].length >0) {
									
								//Terrorist Camp Coordinates Provided?
								t.coordlist['c'+Cities.cities[i].id] = Options.terrorcoords['c'+Cities.cities[i].id+'_'+t.targetlevel['c'+Cities.cities[i].id]].split('/');
								t.coords['c'+Cities.cities[i].id] = t.coordlist['c'+Cities.cities[i].id][0];
								kread = false;
								
							} else {
								kread = true;
							}
						} else {
							kread = true;						
						}
					} else {
						kread = true;	
					}
				//Wilds
				} else {
					kread = true;
				}
				if (kread) {
					if (t.targettype['c'+Cities.cities[i].id] == 't') {
						t.addblocks(Cities.cities[i].x, Cities.cities[i].y, Options.pbfarmprot);
					} else {
						t.addblocks(Cities.cities[i].x, Cities.cities[i].y, Options.pbfarmprow);					
					}
				}
			}
		}
		
		if (t.blocks.length > 0) {	
			//Zu lesende Bl&ouml;cke bilden
			var b = []; //Bl&ouml;cke
			var counter = 1; //Z&auml;hler f&uuml;r Bl&ouml;cke je Abfrage
			t.blocklist = []; //Gesamtblockliste leeren
			for (var i = 0; i < t.blocks.length; i++) {
				b.push(t.blocks[i]);
				counter++;
				if (counter > Options.pbfarmblockmax) {
					t.blocklist.push(b.join(','));
					b = [];
					counter = 1;
				}
			}
			if (b.length > 0) {
				t.blocklist.push(b.join(','));			
			}		

			//Einlesen der Kartendaten starten
			t.mapread = true;
			t.blockpointer = 0;
			t.blockread = true; //Block kann gelesen werden
			t.tcoords = {};
			t.tcoords.t1 = [];
			t.tcoords.t2 = [];
			t.tcoords.t3 = [];
			t.tcoords.t4 = [];
			t.tcoords.t5 = [];
			t.tcoords.t6 = [];
			t.tcoords.t7 = [];
			t.tcoords.t8 = [];
			t.tcoords.t9 = [];
			t.tcoords.t10 = [];		
			t.wcoords = {};
			t.wcoords.w1 = [];
			t.wcoords.w2 = [];
			t.wcoords.w3 = [];
			t.wcoords.w4 = [];
			t.wcoords.w5 = [];
			t.wcoords.w6 = [];
			t.wcoords.w7 = [];
			t.wcoords.w8 = [];
			t.wcoords.w9 = [];
			t.wcoords.w10 = [];	
		} 
	},
	
	addblocks : function (cx, cy, radius) {
		var t = Tabs.Farm;	
		var x = parseInt(cx)-1;
		var y = parseInt(cy)-1;
		var r = parseInt(radius);
		var xstart = parseInt((x - r)/5)*5;
		var xend = parseInt((x + r)/5)*5;
		if (xstart < 0) {
			xend = xend - xstart;		
			xstart = 0;
		}
		if (xend > 795) {
			xstart = xstart - (xend - 795);		
			xend = 795;
		}
		var ystart = parseInt((y - r)/5)*5;
		var yend = parseInt((y + r)/5)*5;
		if (ystart < 0) {
			yend = yend - ystart;		
			ystart = 0;
		}
		if (yend > 795) {
			ystart = ystart - (yend - 795);		
			yend = 795;
		}
		
		for (var xcoord = xstart; xcoord <= xend; xcoord +=5) {
			for (var ycoord = ystart; ycoord <= yend; ycoord +=5) {
				var b = 'bl_'+xcoord+'_bt_'+ycoord;
				//Block schon vorhanden?
				if (!t.blocks.exists(b)) {
					t.blocks.push(b);
				}
			}
		}
	},
	
	attackStart : function () {
		var t = Tabs.Farm;
    clearTimeout (t.attackTimer);
		if (t.mapread) {
			Logbook.entry(Logs.farmlog,'Waiting for Map Data');
			t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);		
			t.attackTimer = setTimeout (t.attackStart, 500);	
			return;
		}
		
		//M&auml;rsche aktualiseren, auch wenn Spieler nicht in aktueller Stadt ist.
		t.updatemarches();
		
		//Sind alle Angriffe beendet (alle St&auml;dte)
		var e = true;
		for (var i = 0; i <= t.fend.length; i++) {
			if (t.fend[i]) e = false;
		}
		if (e) {
			Logbook.entry(Logs.farmlog,'Attacks Ended');
			t.started = false;
			t.startvalue = "Run Attacks";
			clearTimeout (t.attackTimer);
			clearTimeout (t.blockreadtimer);
			clearTimeout (t.modalTimer);
			clearTimeout (t.reportTimer);	
			if (t.stopreload) {
				t.stopreload = false; 
				Options.pbEveryEnable = true;
				RefreshEvery.setEnable(true);
				Logbook.entry(Logs.farmlog,'Auto-Reload GW Started');
				t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
			}		
			t.show();
			return;					
		}
		
		//Stadtpointer zu gro&szlig;?
		if (t.fcitypointer >= t.fcity.length) t.fcitypointer = 0;
		
		//Aktuelle Stadt schon beendet?
		if (!t.fend[t.fcitypointer]) {
			t.fcitypointer++;
			t.attackTimer = setTimeout (t.attackStart, 100);
			return;			
		}
		
		if (t.started) {
			if (t.attack) {
				var cid = t.fcity[t.fcitypointer].substr(1);
				var c = "city" + cid;		
				var now = unixTime();
				//MarchID search
				var mid = 0;
				var mlist = Seed.outgoing_marches['c'+ cid];
				for (var m in mlist) {
					if (parseInt(mlist[m].marchStatus) == 0) {
						mid = mlist[m].marchId;
						break;
					}
				}
				//Keine MarchID free?
				if (mid == 0) {
					if (!Options.pbfarmhidewait) {
						Logbook.entry(Logs.farmlog,'No march possible in <b>'+Cities.byID[cid].name+'</b>. Waiting for return.');
						t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
					}
					if (t.fcity.length > 1) {
						t.fcitypointer++;
						t.attackTimer = setTimeout (t.attackStart, 100);									
					} else {
						t.attackTimer = setTimeout (t.attackStart, 2000);						
					}
					return;
				}
				
				var energy = 0;		
				var l1 = Seed.leaders[c].resourcefulnessKnightId;
				var l2 = Seed.leaders[c].politicsKnightId;		
				var l3 = Seed.leaders[c].combatKnightId;		
				var l4 = Seed.leaders[c].intelligenceKnightId;				
				var generals = Seed.knights[c];
				//stock Gener&auml;le ermitteln
				var stock = [];
				for (var m in Seed.outgoing_marches['c'+ cid]) {
					var march = Seed.outgoing_marches['c'+ cid][m];
					if (march.marchType == 2 && march.marchStatus == 2 && march.knightId != 0) {
						stock.push(march.knightId);
					}
				}
				//Energiepunkte summieren
				for (var g in generals) {
					if (generals[g].knightId == l1 || generals[g].knightId == l2 || generals[g].knightId == l3 || generals[g].knightId == l4) continue;
					//stocker General?
					if (stock.length > 0) {
						if (stock.exists(g.substr(3))) continue;
					}
					energy += parseInt(generals[g].knightEnergy);
				}

				//Energiereserve erreicht?
				if (energy > Options.pbfarmenergysave) {
					//Freien General suchen
					var kid = 0;
					var maxenergy = 0;
					var experience = 0;
					var wait = 0;

					for (var g in generals) {
						//Leader &uuml;bergehen
						if (generals[g].knightId == l1 || generals[g].knightId == l2 || generals[g].knightId == l3 || generals[g].knightId == l4) continue;
						//stock Gener&auml;le &uuml;berspringen
						if (stock.length > 0) {
							if (stock.exists(g.substr(3))) continue;
						}
						//General mit h&ouml;chsten Energiepunkten suchen
						if (generals[g].knightStatus == 1 && generals[g].knightEnergy > maxenergy) {
							maxenergy = generals[g].knightEnergy;
							kid = generals[g].knightId;
							experience = generals[g].experience;
						}
						//Schw&auml;chsten General suchen
						if (generals[g].knightStatus == 1 && 
								maxenergy == generals[g].knightEnergy && 
								parseInt(generals[g].experience) < parseInt(experience)) {
							kid = generals[g].knightId;
							experience = generals[g].experience;
						}
						if (generals[g].knightStatus != 1 && generals[g].knightEnergy > 0) {
							wait = 1;
						}
					}
					//Kein General gefunden?
					if (kid == 0) {
						if (wait == 0) {
							//Ende der Angriffe
							if (!Options.pbfarmhidewait) {
								Logbook.entry(Logs.farmlog,'The Generals in <b>'+Cities.byID[cid].name+'</b> no energy. Waiting for return.');
								t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
							}
							//Truppen zur&uuml;ck?
							var ret = true;
							var ml = Seed.outgoing_marches['c'+ cid];
							for (var m in ml) {
								//Laufende Angriffe
								if (ml[m].marchType == 4 && ml[m].marchStatus != 0) ret = false;
							}
							if (ret) {
								Logbook.entry(Logs.farmlog,'Troops returned home to <b>'+Cities.byID[cid].name+'</b>.');
								t.fend[t.fcitypointer] = false;
							} 
							if (t.fcity.length > 1) {
								t.fcitypointer++;
								t.attackTimer = setTimeout (t.attackStart, 100);									
							} else {
								t.attackTimer = setTimeout (t.attackStart, 2000);						
							}							
							return;								
						} else {
							if (!Options.pbfarmhidewait) {
								Logbook.entry(Logs.farmlog,'No generals to release <b>'+Cities.byID[cid].name+'</b>. Waiting for return.');
								t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
							}
							if (t.fcity.length > 1) {
								t.fcitypointer++;
								t.attackTimer = setTimeout (t.attackStart, 100);									
							} else {
								t.attackTimer = setTimeout (t.attackStart, 2000);						
							}	
							return;
						}
					}
				} else {
					//End of Attacks
					if (!Options.pbfarmhidewait) {
						Logbook.entry(Logs.farmlog,'The generals in <b>'+Cities.byID[cid].name+'</b> have no energy. Waiting for return');
						t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
					}
					//Truppen zur&uuml;ck?
					var ret = true;
					var ml = Seed.outgoing_marches['c'+ cid];
					for (var m in ml) {
						//Laufende Angriffe
						if (ml[m].marchType == 4 && ml[m].marchStatus != 0) ret = false;
					}
					if (ret) {
						Logbook.entry(Logs.farmlog,'Troops returned to <b>'+Cities.byID[cid].name+'</b>.');
						t.fend[t.fcitypointer] = false;
					}	
					if (t.fcity.length > 1) {
						t.fcitypointer++;
						t.attackTimer = setTimeout (t.attackStart, 100);									
					} else {
						t.attackTimer = setTimeout (t.attackStart, 2000);						
					}				
					return;			
				}
				
				//Genug Truppen?
				var tr = false;
				for (var r = 1; r < 25; r++){
					//Zu wenig Truppen?
					if (Seed.units[c]['unt' + r] && Seed.units[c]['unt' + r] < Options['pbfarmu' + r]) {
						tr = true;
						break;
					}
				}
				if (tr) {
					if (!Options.pbfarmhidewait) {
						Logbook.entry(Logs.farmlog,'Not enough troops in <b>'+Cities.byID[cid].name+'</b>. Waiting for return.');
						t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
					}
					if (t.fcity.length > 1) {
						t.fcitypointer++;
						t.attackTimer = setTimeout (t.attackStart, 100);									
					} else {
						t.attackTimer = setTimeout (t.attackStart, 2000);						
					}	
					return;
				}
				

				//Bei Farmangriffen... ist Liste abgearbeitet?
				if (Options.pbfarmtype == "f" && t.klistpointers['c'+cid] >= t.coordlist['c'+cid].length) {
					//Ende der Angriffe
					if (!Options.pbfarmhidewait) {
						Logbook.entry(Logs.farmlog,'Coordinate list for <b>'+Cities.byID[cid].name+'</b> processed. Waiting for return');
						t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
					}
					//Truppen zur&uuml;ck?
					var ret = true;
					var ml = Seed.outgoing_marches['c'+cid];
					for (var m in ml) {
						//Laufende Angriffe
						if (ml[m].marchType == 4 && ml[m].marchStatus != 0) ret = false;
					}
					if (ret) {
						Logbook.entry(Logs.farmlog,'Troops returned to <b>'+Cities.byID[cid].name+'</b>.');
						t.fend[t.fcitypointer] = false;
					}	
					if (t.fcity.length > 1) {
						t.fcitypointer++;
						t.attackTimer = setTimeout (t.attackStart, 100);									
					} else {
						t.attackTimer = setTimeout (t.attackStart, 2000);						
					}				
					return;			
				}
				
				//coordinaten bereitstellen
				if (Options.pbfarmtype == "w") {
					var coord = t.coords['c'+cid].split(',');
					var x = parseInt(coord[0]);
					var y = parseInt(coord[1]);
				} else {
					var coord = t.coordlist['c'+cid][t.klistpointers['c'+cid]].split(',');
					var x = parseInt(coord[0]);
					var y = parseInt(coord[1]);
				}
				
				//Angriff aussenden
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = cid; //CityID
				params.type = 4; //Attack
				params.kid = kid; //GeneralID
				params.mid = mid; //MarschID
				params.xcoord = x; //X Coordinate
				params.ycoord = y; //Y Coordinate
				for (var r = 1; r < 25; r++){
					if (parseInt(Options['pbfarmu' + r]) > 0) {
						params['u' + r] = Options['pbfarmu' + r]; // Troops
					}
				}
				
				//Resis hinzuf&uuml;gen
				params.gold = 0;
				for (var r = 1; r < 7; r++) {
					params['r' + r] = 0;
				}
				t.attack = false;
				var now = unixTime();
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "march.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function(rslt) {
						t.marchout(rslt, params, now);
					},
					onFailure: function(rslt) {
						Logbook.entry(Logs.farmlog,'<span class="boldRed">Error when Sending out March</span>');		
						t.attack = true;
						t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
					},
				});
			} 
			//N&auml;chster Angriff...
			var next =  (parseInt(1000*Options.pbfarminterval) + parseInt(1000*Math.random() * ( Options.pbfarminterval * 1.5 - Options.pbfarminterval )));
			if (t.fcity.length > 1) {
				t.fcitypointer++;
			}
			t.attackTimer = setTimeout (t.attackStart,next);	
		}
	},

	marchout : function (rslt, params, startnow) {
	  var t = Tabs.Farm;
		if (rslt.ok) {	
			//General einen Energiepunkt weg nehmen
			var k = Seed.knights['city'+params.cid]['knt'+params.kid];
			k.knightStatus = 10;
			k.knightEnergy -= 1;
					
			//Truppen reduzieren um Angriffstruppen
			for (var r = 1; r < 25; r++){
				if (params['u' + r]) {
					Seed.units['city' + params.cid]['unt' + r] -= params['u' + r];
				}
			}

			//Marschdaten aktualisieren
			var now = unixTime();
			var q = {
				destinationUnixTime: now * 2 - startnow + rslt.oneway,
				marchUnixTime: now,
				returnUnixTime: rslt.returnEta,
				toXCoord: params.xcoord,
				toYCoord: params.ycoord,
				marchType: 4,
				knightId: params.kid,
				marchStatus: 1,
				gold: 0,
				marchId: params.mid,
			};
			for (var r = 0; r < 9; r++) {
				q["resource" + r] = 0;			
			}
			for (var u = 1; u < 25; u++) {
				if (params['u' + u]) {
					q["unit" + u + "Count"] = params['u' + u];
				} else {
					q["unit" + u + "Count"] = 0;
				}
				q["unit" + u + "Return"] = 0;		
			}			
			if (rslt.tileId) {
				q.toTileId = rslt.tileId;
				q.toTileType = rslt.tileType;
				q.toTileLevel = rslt.tileLevel;
			}
			Seed.outgoing_marches["c" + params.cid]["m" + params.mid] = q;
		
			//N&auml;chste coords beim Farmen
			if (Options.pbfarmtype == "f") {
				t.klistpointers['c'+params.cid]++;
			}
			
			//Logentry
			var m = 'Attacks on <b>'+params.xcoord+","+params.ycoord+'</b> from <b>'+Cities.byID[params.cid].name+'</b> started. General: '+Seed.knights['city'+params.cid]['knt'+params.kid].knightName;
			Logbook.entry(Logs.farmlog,m);
		} else {
			//Log Entry Errors
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m = 'Failed to attack <b>'+params.xcoord+","+params.ycoord+'</b> from <b>'+Cities.byID[params.cid].name+'</b>. General: '+Seed.knights['city'+params.cid]['knt'+params.kid].knightName+'<br><span class="boldRed">'+errorcode+'</span>';
			Logbook.entry(Logs.farmlog,m);
		}
		t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
		t.attack = true;
		//Energie der Gener&auml;le aktualisieren
		t.freeEnergy();
	},

	updatemarches: function() {
		var now = unixTime();
		for(var i=0; i<Cities.numCities; i++) {
			var cityId = Cities.cities[i].id;
			var marches = Seed.outgoing_marches['c'+cityId];
			for (var m in marches) {
				var march = marches[m];
				if (march.marchStatus != 0 && (march.marchType == 1 || march.marchType == 4) && march.returnUnixTime < now) {
					//March ist beendet
					march.marchStatus = 0;
					//General freigeben
					if (march.knightId != 0 && Seed.knights['city'+cityId]['knt'+march.knightId]) {
						Seed.knights['city'+cityId]['knt'+march.knightId].knightStatus = 1;
					}
					//Truppen der Stadt zuordnen
					if (march.marchType == 1) { // Transport
						var post = "Count";
					} else { //Angriff
						var post = "Return";
					}
					for (var r = 1; r < 25; r++){
						Seed.units['city'+cityId]['unt'+r] += parseInt(march['unit'+r+post]);
					}
				}
				//Generaele freigeben - Game Bug!
				if (march.marchStatus == 0) {
					if (march.knightId != 0 && Seed.knights['city'+cityId]['knt'+march.knightId]) {
						Seed.knights['city'+cityId]['knt'+march.knightId].knightStatus = 1;
						march.knightId = 0;
					}
				}
			}
    }
	},

  hide : function (){
    clearTimeout (Tabs.Farm.displayTimer);
  },

	togOpt : function (checkboxId, optionName){
    var t = Tabs.Farm;
    var checkbox = checkboxId;
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
    }
  },

  changeOpt : function (valueId, optionName){
    var t = Tabs.Farm;
    var e = valueId;
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
			if (optionName == "pbfarmx" || optionName == "pbfarmy") {
				t.finfo();
				t.show();
			}
    }
  },

	finfo : function() {
	  var t = Tabs.Farm;
		var fieldinfo = t.id.ptfieldinfo;
		if (Options.pbfarmx < 1 || Options.pbfarmx > 800 || Options.pbfarmy < 1 || Options.pbfarmy > 800) {
			fieldinfo.style.padding = '6px';
			fieldinfo.style.backgroundColor = '#dddddd';
			fieldinfo.innerHTML = '<b>The coordinates ('+Options.pbfarmx+','+Options.pbfarmy+'):</b> are invalid!';
			return;
		} else {
			fieldinfo.style.padding = '6px';
			fieldinfo.style.backgroundColor = '#dddddd';
			fieldinfo.innerHTML = '<b>Waiting for information on ('+Options.pbfarmx+','+Options.pbfarmy+'):</b> from the server.';
		}
		if (!t.read) return;
		//Daten holen
		var x = parseInt((parseInt(Options.pbfarmx)-1)/5)*5;
		var y = parseInt((parseInt(Options.pbfarmy)-1)/5)*5;
		var block = 'bl_'+x+'_bt_'+y;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.blocks = block;
		t.read = false;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) { t.mapresult(rslt); },
			onFailure: function (rslt) {
				Logbook.entry(Logs.farmlog,'<span class="boldRed">Error retrieving map data.</span>');
				t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
			}
		});
	},

	mapresult : function(rslt) {
		var t = Tabs.Farm;
		if (rslt.ok) {
			//Daten verarbeiten
			//rslt.data, rslt.userInfo, rslt.allianceNames, rslt.allianceMights
			var info = '<table><tr><td><b>Target ('+Options.pbfarmx+','+Options.pbfarmy+'):</b>&nbsp;&nbsp;</td><td>';
			for (var e in rslt.data) {
				var element = rslt.data[e];
				if (element.xCoord != Options.pbfarmx || element.yCoord != Options.pbfarmy) continue;
				if (element.tileType == '51') {
					if (element.tileUserId == '0') {
						info += 'Terrorist camp Level '+element.tileLevel+'</td>';
					} else {
						info += 'City Level '+element.tileLevel+'</td>';
						info += '</tr><tr><td><b>Name:</b></td><td>'+element.cityName+'</td>';
						info += '</tr><tr><td><b>General:</b></td><td>'+rslt.userInfo['u'+element.tileUserId].n;
						info += ' (Power: '+addCommas(rslt.userInfo['u'+element.tileUserId].m)+', Level: '+rslt.userInfo['u'+element.tileUserId].t+')</td>';
						if (element.tileAllianceId == '0') {
							info += '</tr><tr><td><b>Alliance:</b></td><td>None</td>';
						} else {
							info += '</tr><tr><td><b>Alliance:</b></td><td>'+rslt.allianceNames['a'+element.tileAllianceId];
							info += ' (Power: '+addCommas(rslt.allianceMights['a'+element.tileAllianceId])+')</td>';
						}
					}
				}	else {
					info += t.wildtypes[element.tileType]+' Level '+element.tileLevel+'</td>';
					if (element.tileType != '0') {
						if (element.tileUserId == '0') {
							info += '</tr><tr><td><b>Status:</b></td><td>Free</td>';
						} else {
							info += '</tr><tr><td><b>Status:</b></td><td>Occupied</td>';
							info += '</tr><tr><td><b>General:</b></td><td>'+rslt.userInfo['u'+element.tileUserId].n;
							info += ' (Power: '+addCommas(rslt.userInfo['u'+element.tileUserId].m)+', Level: '+rslt.userInfo['u'+element.tileUserId].t+')</td>';
							if (element.tileAllianceId == '0') {
								info += '</tr><tr><td><b>Alliance:</b></td><td>None';
							} else {
								info += '</tr><tr><td><b>Alliance:</b></td><td>'+rslt.allianceNames['a'+element.tileAllianceId];
								info += ' (Power: '+addCommas(rslt.allianceMights['a'+element.tileAllianceId])+')</td>';
							}
						}
					}
				}
			}
			info += '</tr></table>';
			t.id.ptfieldinfo.innerHTML = info;

		} else {
			t.id.ptfieldinfo.innerHTML = '<b>Target ('+Options.pbfarmx+','+Options.pbfarmy+'):</b> Could not map data from server.';
		}
		t.read = true;
	},

	report : function() {
		var t = Tabs.Farm;
		clearTimeout (t.reportTimer);
		if (t.started) {
			if (Options.pbfarmdeletereport) {
				//Abrufen der 1. Seite von den Kampfberichten
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.pageNo = 1;
				params.showAll = 0;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "listMarchReport.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) { t.reportlist(rslt); },
					onFailure: function (rslt) {
						Logbook.entry(Logs.farmlog,'<span class="boldRed">Error getting reports</span>');
						t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
					}
				});
			}
			t.reportTimer = setTimeout (t.report, 15000);
		}
	},

	reportlist : function(rslt) {
		var t = Tabs.Farm;
		//Verarbeiten der 1. Seite von den Kampfberichten
		if (rslt.ok) {
			var rid = [];
			for(var r in rslt.arReports) {
				var report = rslt.arReports[r];
				//Neuer Bericht und Angriff und hab ich angegriffen?
				if (report.marchType == '4' && report.side1PlayerId == unsafeWindow.g_ajaxsuffix.substr(3)) {
				//if (parseInt(report.reportUnixTime) > t.startUnixTime && report.marchType == '4' && report.side1PlayerId == unsafeWindow.g_ajaxsuffix.substr(3)) {
					//Terrorcamp?
					if (report.side0TileType == '51' && report.side0CityId == '0' && report.side0PlayerId == '0') {
						rid.push(report.marchReportId);
					}
					//Wilds?
					if (report.side0TileType == '10' || report.side0TileType == '12' ||
							report.side0TileType == '20' || report.side0TileType == '30' ||
							report.side0TileType == '40' || report.side0TileType == '50') {
						rid.push(report.marchReportId);
					}
				}
			}
			if (rid.length > 0) {
				//Berichte L&ouml;schen
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.s0rids = '';
				params.eventids = '';
				params.s1rids = rid.join(',');
				var count = rid.length;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) { t.deletereports(rslt,count); },
					onFailure: function (rslt) {
						Logbook.entry(Logs.farmlog,'<span class="boldRed">Error when deleting reports.</span>');
						t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
					}
				});
			}
		}
	},

	deletereports : function (rslt,count) {
		var t = Tabs.Farm;
		if (rslt.ok) {
			Seed.newReportCount = parseInt(Seed.newReportCount) - count;
			if (count == 1) {
				Logbook.entry(Logs.farmlog,count + ' Battle Report Deleted');
			} else {
				Logbook.entry(Logs.farmlog,count + ' Battle Reports Deleted');
			}
			t.id.ptfarmlog.innerHTML = Logbook.output(Logs.farmlog);
		}
	},

	BoostHealth : function(city) {
		i24h = Seed.items.i271;
		i7d = Seed.items.i272;  
		if (i24h == 0 && i7d == 0) {
			Logbook.entry(Logs.farmlog,'Unable to boost health. You have neither <b>Kevlar Vest</b> or <b>Body Armor</b>.');
			return;
		}
		if (i24h > 0) {
			var item = 271;
		} else {
			var item = 272;
		}
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = city;			
		params.iid = item;	
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "boostCombat.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					var expire = parseInt(rslt.expire, 10);
					if (Seed.playerEffects.length === 0) Seed.playerEffects = {};
					if (item === 261 || item === 262) Seed.bonus.bC2600.bT2601 = expire;
					else if (item === 271 || item === 272) Seed.bonus.bC2700.bT2701 = expire;
					Seed.items['i'+item]--;
					unsafeWindow.update_boosts();
					if (item == 271) {
						var iname = "Kevlar Vest";
					} else {
						var iname = "Body Armor";
					}
					Logbook.entry(Logs.farmlog,'Health Booster <b>'+iname+'</b> was used.');		
				} else {
					var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
					Logbook.entry(Logs.farmlog,'Failed to use a health booster.<br><span class="boldRed">'+error+'</span>');			
				}
			},
			onFailure: function () {alert("Failed to use a health booster");}
		});			
	},

	BoostAttack : function(city) {
		i24h = Seed.items.i261;
		i7d = Seed.items.i262;  
		if (i24h == 0 && i7d == 0) {
			Logbook.entry(Logs.farmlog,'Could not use an Attack booster. You do not have <b>Extra Ammo</b> or <b>Additional Weapons</b>.');
			return;
		}
		if (i24h > 0) {
			var item = 261;
		} else {
			var item = 262;
		}
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = city;			
		params.iid = item;	
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "boostCombat.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					var expire = parseInt(rslt.expire, 10);
					if (Seed.playerEffects.length === 0) Seed.playerEffects = {};
					if (item === 261 || item === 262) Seed.bonus.bC2600.bT2601 = expire;
					else if (item === 271 || item === 272) Seed.bonus.bC2700.bT2701 = expire;
					Seed.items['i'+item]--;
					unsafeWindow.update_boosts();
					if (item == 261) {
						var iname = "Extra Ammo";
					} else {
						var iname = "Additional Weapons";
					}
					Logbook.entry(Logs.farmlog,'Attack Booster <b>'+iname+'</b> was used.');		
				} else {
					var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
					Logbook.entry(Logs.farmlog,'Failed to use Attack Booster.<br><span class="boldRed">'+error+'</span>');			
				}
			},
			onFailure: function () {alert("Failed to use Attack Booster");}
		});			
	},
}

/*********************************** Artifact Tab ****************************/
Tabs.Artifacts = {
  tabOrder : 4,
	tabLabel: 'Artifacts',
  cont : null,
  tabDisabled : !ENABLE_ARTIFACTS,
	artifactTimer : null,
	modalTimer : null,
	setstarted : false,
	id : {},
	read : true,
	popart : null,
	popaarttimer : null,
	setonly : 0,
	
  init : function (div){
    var t = Tabs.Artifacts;
    t.cont = div;
		var out = [];	
		//Header
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>Combine Artifact Sets</b>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');
		//Buttons
		out.push('<table class="ptTab" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');
		out.push('<input id="ptartset" type="submit" name="ArtSet" value=""> ');
		out.push('<input id="ptartsetview" type="submit" name="ArtSetView" value="Inventory Function">');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		//Form
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td><input id="ptarthidemodal" type="checkbox"> Automatically Close the "Artifact Created" Window.</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><input id="ptartcity" type="checkbox"> Also combine City Deeds? (For more XP)</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');

		//Logbook
		out.push('<hr>');
		out.push('<table width="100%">');
		out.push('<tr>');
		out.push('<td><b>Artifact Set Log:</b><br><br></td>');
		out.push('<td style="text-align: right;">');
		out.push('<input id="ptButClearArtLog" type="submit" name="ClearArtLog" value="Clear Artifact Log">');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td colspan="2">');
		out.push('<div id="ptartlog" style="height: 120px; overflow: auto;">');
		out.push('</div>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		
		//Output
		t.cont.innerHTML = out.join('');
		
		//IDs search
		t.id.ptarthidemodal = document.getElementById('ptarthidemodal');
		t.id.ptartcity = document.getElementById('ptartcity');
		t.id.ptButClearALog = document.getElementById('ptButClearArtLog');		
		t.id.ptartset = document.getElementById('ptartset');	
		t.id.ptartsetview = document.getElementById('ptartsetview');			
		t.id.ptartlog = document.getElementById('ptartlog');		
		
		//Bind Events
		t.togOpt (t.id.ptarthidemodal, 'pbarthidemodal');
		t.togOpt (t.id.ptartcity, 'pbartcity');		
		t.id.ptButClearALog.addEventListener('click', t.ClearALog, false);	
		t.id.ptartset.addEventListener('click', function() {
			t.setonly = 0;
			Options.pbartonly = 0;
			saveOptions();
			t.setcollectinit(); 
		}, false);				
		t.id.ptartsetview.addEventListener('click', t.popartview, false);			
		
		if (Options.pbartactive) {
			t.setstarted = true;
			t.setonly = Options.pbartonly;
			t.setcollect();
			t.modal();
		} 
		t.show();
	},
	
  show : function (){
    var t = Tabs.Artifacts;
		if (t.setstarted) {
			t.id.ptartset.value = 'Stop Combining Artifacts';
		} else {
			t.id.ptartset.value = 'Combine Artifacts';
		}
		t.id.ptartlog.innerHTML = Logbook.output(Logs.artlog);
  },

	popartview: function() {
		var t = Tabs.Artifacts;	
    if (t.popart == null){  
      t.popart = new CPopup('popartview', 50, 50, 1000,1000, true);
      t.popart.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Artifact Inventory View</b>';
			//ArtefaktSets anzeigen
			t.popartlive();
		}
		t.popart.show (true);
	},
	
	popartlive: function() {
		var t = Tabs.Artifacts;

		if (t.popart == null){  
			//Liveanzeige stoppen
			t.poparttimer = null;			
		} else {
			//Anzeigen der Artefakte
			var content = [];
			content.push('<table width="100%" style="border:1px solid silver; border-collapse: collapse;"><tr>');
			content.push('<td style="background-color: #e0e0e0; border:1px solid silver; padding: 2px;text-align:center;"><b>&nbsp;</b></td>');
			content.push('<td style="background-color: #e0e0e0; border:1px solid silver; padding: 2px;"><b>Set</b></td>');
			content.push('<td style="background-color: #e0e0e0; border:1px solid silver; padding: 2px;text-align:center;"><b>Qty</b></td>');
			content.push('<td style="background-color: #e0e0e0; border:1px solid silver; padding: 2px;"><b>Requirements</b></td>');
			content.push('<td style="background-color: #e0e0e0; border:1px solid silver; padding: 2px;text-align:center;"><b>Redeemed</b></td>');
			content.push('</tr>');
			var aset = unsafeWindow.artifactData.artifactSets;
			var asetnames = unsafeWindow.arStrings.artifactPieceName;
			var astrings = unsafeWindow.arStrings;
			var sets = [];
			for (var snumber in aset) {
				sets.push(snumber);
			}
			sets.sort();
			sets.reverse();
			for (var i = 0; i<sets.length; i++) {
				content.push('<tr>');
				var snumber = sets[i];
				var set = aset[snumber];
				var setname = astrings.artifactSetName['a'+snumber];

				var max = 100000;
				for (var a = 0; a < set.length; a++) {
					var item = set[a];
					if (!Seed.items['i'+item]) {
						var count = 0;
					} else {
						var count = Seed.items['i'+item];
					}
					if (parseInt(count) < max) max = count;
				}
				var req = 1;
				//Sonderfall f&uuml;r Sprengkopf von Terrorcamps Level 2 (je 5 Teile)
				if (parseInt(snumber) == 20360) {
					max = parseInt(max/5);
					req = 5;
				}
				//Sonderfall f&uuml;r Launcher von Terrorcamps Level 3 (je 10 Teile)
				if (parseInt(snumber) == 20380) {
					max = parseInt(max/10);
					req = 10;
				}
				//Sonderfall f&uuml;r Targeting Radar Crate von Terrorcamps Level 4 (je 3 Teile)
				if (parseInt(snumber) == 20395) {
					max = parseInt(max/3);
					req = 3;
				}
				//Sonderfall f&uuml;r Launch Unit Crate von Terrorcamps Level 5 (je 3 Teile)
				if (parseInt(snumber) == 20398) {
					max = parseInt(max/3);
					req = 3;
				}
				var id = 'pbfarms_'+snumber;
				if (max > 0) {
					if (t.setstarted) {
						content.push('<td style="vertical-align:middle; border:1px solid silver; padding: 2px;"><input id="'+id+'" type="submit" value="&nbsp;" style="padding:0 1px;margin:0;font-size:10px;height:16px; width:16px;" disabled="disabled"></td>');
					} else {
						content.push('<td style="vertical-align:middle; border:1px solid silver; padding: 2px;"><input id="'+id+'" type="submit" value="&nbsp;" title="Combine these Sets" style="padding:0 1px;margin:0;font-size:10px;height:16px; width:16px;"></td>');
					}
					content.push('<td style="vertical-align:middle; border:1px solid silver; padding: 2px;"><span class="boldRed">'+setname+'</span></td>');
					content.push('<td style="vertical-align:middle; border:1px solid silver; padding: 2px;text-align:center;"><span class="boldRed">'+max+'</span></td>');
				} else {
					content.push('<td style="vertical-align:middle; border:1px solid silver; padding: 2px;"><input id="'+id+'" type="submit" value="&nbsp;" style="padding:0 1px;margin:0;font-size:10px; height:16px; width:16px;" disabled="disabled"></td>');
					content.push('<td style="vertical-align:middle; border:1px solid silver; padding: 2px;">'+setname+'</td>');
					content.push('<td style="vertical-align:middle; border:1px solid silver; padding: 2px;text-align:center;">'+max+'</td>');
				}
				content.push('<td style="vertical-align:middle; border:1px solid silver; padding: 2px;">');
				var text = '';
				for (var a = 0; a < set.length; a++) {
					var item = set[a];
					if (!Seed.items['i'+item]) {
						var count = 0;
					} else {
						var count = Seed.items['i'+item];
					}
					if (count >= req) {
						text += asetnames['a'+item] + ' (<span class="boldRed">' + count + '/' + req + '</span>), ';
					} else {
						text += asetnames['a'+item] + ' (' + count + '/' + req + '), ';
					}
				}
				content.push(text.slice (0, -2));
				content.push('</td>');
				if (Seed.artifactSets.inventory['as'+snumber])
					var done = Seed.artifactSets.inventory['as'+snumber];
				else
					var done = 0;
				content.push('<td style="vertical-align:middle; border:1px solid silver; padding: 2px;text-align:center;">'+done+'</td>');
				content.push('</tr>');
			}
			content.push('</table>');
			content.push('<br>The Table is updated every 2 seconds. RED means collectible and there are enough artifacts present.<br>');
			content.push('Click on the button in front of the red set, only to redeem these sets (in this case is also possible to combine multiple documents from the city).<br>');
			content.push('The <b> Redeemed </ b> column shows the previously redeemed sets. Double sets such as warhead, rocket and radar targeting Crate are counted in only one category.');
			t.popart.getMainDiv().innerHTML = content.join('');
			//Klickevents an Buttons binden
			for (var i = 0; i<sets.length; i++) {
				document.getElementById('pbfarms_'+sets[i]).addEventListener('click', function() {
					t.setonly = this.id.split('_')[1];
					Options.pbartonly = t.setonly;
					saveOptions();
					t.setcollectinit();
				}, false);
			}
			//neu aufrufen in 3 Sekunden
			t.poparttimer = setTimeout (t.popartlive, 2000);
		}
	},

	modal : function() {
		var t = Tabs.Artifacts;
		clearTimeout (t.modalTimer);
		if (t.setstarted) {
			if (Options.pbarthidemodal) unsafeWindow.Modal.hideModalAll();
			t.modalTimer = setTimeout (t.modal, 2500);
		}
	},

	setcollectinit : function() {
		var t = Tabs.Artifacts;
		if (t.setstarted) {
			t.setstarted = false;
			Options.pbartactive = false;
			Options.pbartonly = 0;
			saveOptions();
			clearTimeout (t.artifactTimer);
			clearTimeout (t.modalTimer);
		} else {
			t.setstarted = true;
			Options.pbartactive = true;
			saveOptions();
			t.setcollect();
			t.modal();
		}
		t.show();
	},

	setcollect : function() {
		var t = Tabs.Artifacts;
		clearTimeout (t.artifactTimer);
		var aset = unsafeWindow.artifactData.artifactSets;
		var astrings = unsafeWindow.arStrings;
		var sets = [];
		if (t.setonly == 0) {
			for (var snumber in aset) {
				sets.push(snumber);
			}
		} else {
			sets.push(t.setonly);
		}
		sets.sort();
		sets.reverse();
		for (var i = 0; i<sets.length; i++) {
			var snumber = sets[i];
			//Bei Stadturkunden pr&uuml;fen, ob schon vorhanden
			if (!Options.pbartcity) {
				if (t.setonly == 0) {
					if (snumber == 20410 && Seed.items.i1203 && parseInt(Seed.items.i1203) >= 1) continue;
					if (snumber == 20430 && Seed.items.i1204 && parseInt(Seed.items.i1204) >= 1) continue;
					if (snumber == 20440 && Seed.items.i1205 && parseInt(Seed.items.i1205) >= 1) continue;
					if (snumber == 20450 && Seed.items.i1206 && parseInt(Seed.items.i1206) >= 1) continue;
					if (snumber == 20460 && Seed.items.i1207 && parseInt(Seed.items.i1207) >= 1) continue;
				}
			}
			var set = aset[snumber];
			var setname = astrings.artifactSetName['a'+snumber];
			var max = 100000;
			for (var a = 0; a < set.length; a++) {
				var item = set[a];
				if (!Seed.items['i'+item]) {
					var count = 0;
				} else {
					var count = Seed.items['i'+item];
				}
				if (parseInt(count) < max) max = count;
			}
			//Sonderfall f&uuml;r Sprengkopf von Terrorcamps Level 2 (je 5 Teile)
			if (parseInt(snumber) == 20360) {
				max = parseInt(max/5);
			}

			//Sonderfall f&uuml;r Launcher von Terrorcamps Level 3 (je 10 Teile)
			if (parseInt(snumber) == 20380) {
				max = parseInt(max/10);
			}

			//Sonderfall f&uuml;r Targeting Radar Crate von Terrorcamps Level 4 (je 3 Teile)
			if (parseInt(snumber) == 20395) {
				max = parseInt(max/3);
			}

			//Sonderfall f&uuml;r Launch Unit Crate von Terrorcamps Level 5 (je 3 Teile)
			if (parseInt(snumber) == 20398) {
				max = parseInt(max/3);
			}

			//Set einsammeln wenn >0
			if (max > 0) {

				//Set holen...
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.setid = snumber;

				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "completeArtifactSet.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) {
						t.artsetrslt(rslt, snumber);
					},
					onFailure: function (rslt) {
						t.artsetrslt(rslt, snumber);
					}
				});

				t.artifactTimer = setTimeout (t.setcollect, 30000);
				return;
			}
		}
		//Kein Set einl&ouml;sbar und weiteres kombinieren stoppen.
		Logbook.entry(Logs.artlog,'No more artifacts can be redeemed.');
		t.setstarted = false;
		Options.pbartactive = false;
		Options.pbartonly = 0;
		saveOptions();
		t.show();
		return;
	},

	artsetrslt : function(rslt, snumber) {
		var t = Tabs.Artifacts;
		var aset = unsafeWindow.artifactData.artifactSets;
		var axp = unsafeWindow.artifactData.artifactSetsMightRewards;
		var astrings = unsafeWindow.arStrings;
		var setname = astrings.artifactSetName['a'+snumber];
		var xp = axp[snumber];
		if (rslt.ok) {
			//Artefaktteile im Seed reduzieren
			var set = aset[snumber];
			var dec = 1;
			if (parseInt(snumber) == 20360) dec = 5;
			if (parseInt(snumber) == 20380) dec = 10;
			if (parseInt(snumber) == 20395) dec = 3;
			if (parseInt(snumber) == 20398) dec = 3;

			for (var a = 0; a < set.length; a++) {
				if (Seed.items['i'+a] && Seed.items['i'+a] > 0) {
					Seed.items['i'+a] -= dec;
				}
			}

			//Logentry
			var m = 'Set: <b>' + setname + '</b> combined. More sets to follow.<br>You get <b>'+addCommas(xp)+' XP for this set</b>. Wait 30 Seconds.';
			Logbook.entry(Logs.artlog,m);
			t.id.ptartlog.innerHTML = Logbook.output(Logs.artlog);
		} else {
			//Log entry Error
			var m = 'Failed to combine the Artifact Set: '+setname+'<br>';
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			m += '<span class="boldRed">'+errorcode+'</span>';
			Logbook.entry(Logs.artlog,m);
			t.id.ptartlog.innerHTML = Logbook.output(Logs.artlog);
		}
	},

	ClearALog : function () {
		var t = Tabs.Artifacts;
		Logs.artlog = [];
		saveLogs();
		t.show();
	},

  hide : function (){},

	togOpt : function (checkboxId, optionName){
    var t = Tabs.Artifacts;
    var checkbox = checkboxId;
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
    }
  },
}
/*********************************** Scout tab ****************************/
Tabs.Scout = {
  tabOrder : 30,
	tabLabel: 'Scout',
  cont : null,
  tabDisabled : !ENABLE_SCOUT,
	displayTimer : null,
	scoutTimer : null,
	reportTimer : null,
	startUnixTime : 0,
	coordlist : [],
	scout: true,
	started : false,
	startvalue : "Run Scouts",
	id : {},
	read : true,
	stopreload : false,

  init : function (div){
    var t = Tabs.Scout;
    t.cont = div;
/*		var c2 = {};
		var c3 = "";
		for(i=0; i<Cities.numCities; i++) {
			c2['c'+Cities.cities[i].id] = Cities.cities[i].name;
			if (i==0) c3 = 'c'+Cities.cities[i].id;
     }
		if (!Options.pbsctcity || Options.pbsctcity == "") {
			Options.pbsctcity = c2;
			saveOptions();
		}		
*/		var out = [];	
		//Header
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>Scout Enemies</b>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');
		//Buttons
		out.push('<table class="ptTab" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');
		out.push('<input id="ptsctstart" type="submit" name="SctButton" value="' + t.startvalue + '"> ');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		//Form
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td><b>Target (X,Y):</b></td>');
		out.push('<td><input id="ptsctx" type="text" size="2" maxlength="3" style="text-align: center;">');
		out.push(' / ');
		out.push('<input id="ptscty" type="text" size="2" maxlength="3" style="text-align: center;">&nbsp;&nbsp;');
		out.push('<span id="ptdist"></span>');
		out.push('<span id="ptfieldinfo"></span></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td style="vertical-align: top;"><b style="position: relative; top: 5px;">Target (List):&nbsp;</b>');
		out.push('<br><br>x,y<br>x,y<br>x,y<br>...</td>');
		out.push('<td><textarea id="ptsctklist" rows="5" cols="20"></textarea> <input id="ptclearlistpos" type="submit" value="Start from begining of Target list">');
		out.push('<br><input id="ptsctkcheck" type="submit" name="coordCheck" value="Check Coordinate List">&nbsp;');
		out.push('<span id="ptcheckinfo">Invalid Coordinates will be deleted</span></td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Pause:</b></td>');
		out.push('<td><input id="ptsctinterval" type="text" size="2" maxlength="3" style="text-align: center;"> Seconds between scouts</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		//Logbook
		out.push('<hr>');
		out.push('<table width="100%">');
		out.push('<tr>');
		out.push('<td><b>Scout Log:</b><br><br></td>');
		out.push('<td style="text-align: right;">');
		out.push('<input id="ptButClearSLog" type="submit" name="ClearELog" value="Clear Scout Log">');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td colspan="2">');
		out.push('<div id="ptsctlog" style="height: 120px; overflow: auto;">');
		out.push('</div>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		//output
		t.cont.innerHTML = out.join('');
		//IDs Search
//		t.id.ptsctcity = document.getElementById('ptsctcity');
//		t.id.ptscttype = document.getElementById('ptscttype');
		t.id.ptsctklist = document.getElementById('ptsctklist');
		t.id.ptsctx = document.getElementById('ptsctx');
		t.id.ptscty = document.getElementById('ptscty');
		t.id.ptsctinterval = document.getElementById('ptsctinterval');

		t.id.ptButClearSLog = document.getElementById('ptButClearSLog');
		t.id.ptclearlistpos = document.getElementById('ptclearlistpos');
		t.id.ptsctstart = document.getElementById('ptsctstart');
		t.id.ptsctkcheck = document.getElementById('ptsctkcheck');
		t.id.ptdist = document.getElementById('ptdist');
//		t.id.pttypehint = document.getElementById('pttypehint');	
		t.id.ptsctlog = document.getElementById('ptsctlog');
		t.id.ptcheckinfo = document.getElementById('ptcheckinfo');
		t.id.ptfieldinfo = document.getElementById('ptfieldinfo');
		//Determine Information about the Target
		t.finfo();

		//Bind Events

		t.changeOpt (t.id.ptsctklist, 'pbsctklist');
		t.changeOpt (t.id.ptsctx, 'pbsctx');
		t.changeOpt (t.id.ptscty, 'pbscty');
		t.changeOpt (t.id.ptsctinterval, 'pbsctinterval');

		t.id.ptclearlistpos.addEventListener('click', t.ClearListPos, false);

		t.id.ptButClearSLog.addEventListener('click', t.ClearSLog, false);	
		t.id.ptsctstart.addEventListener('click', t.ScoutOnOff, false);
		t.id.ptsctkcheck.addEventListener('click', t.klistcheck, false);
		t.show();

	},

  show : function (){
    var t = Tabs.Scout;

		t.id.ptsctstart.value = t.startvalue;

		//Form Elements Disabled when Scouts are running
		if (!t.started) {
			//t.id.ptsctcity.disabled = false;
			t.id.ptsctx.disabled = false;
			t.id.ptscty.disabled = false;
			//t.id.ptscttype.disabled = false;
			t.id.ptsctklist.disabled = false;
			t.id.ptsctkcheck.disabled = false;
			t.id.ptsctinterval.disabled = false;
		}
	
		//Determine the Distance to the City
/*		var index = 0;
		for(var i=0; i<Cities.numCities; i++) {
			if (Cities.cities[i].id == Options.pbsctcity.substr(1)) {
				index = i;
			}
    }
		var x1 = parseInt(Seed.cities[index][2]);
		var y1 = parseInt(Seed.cities[index][3]);
		var x2 = parseInt(Options.pbsctx);
		var y2 = parseInt(Options.pbscty);
		var dist = (Math.round(Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))*100)/100).toString();
		t.id.ptdist.innerHTML = 'Distance: ' + dist + ' To ' + Seed.cities[index][1];
*/
		t.id.ptsctlog.innerHTML = Logbook.output(Logs.sctlog);

		if (t.started) {
//			t.id.ptsctcity.disabled = true;
			t.id.ptsctx.disabled = true;
			t.id.ptscty.disabled = true;
//			t.id.ptscttype.disabled = true;
			t.id.ptsctklist.disabled = true;
			t.id.ptsctkcheck.disabled = true;
			t.id.ptsctinterval.disabled = true;
		} 
  },

	klistcheck : function() {
		var t = Tabs.Scout;
		var counter = 0;
		t.coordlist = [];
		var u_coords = Options.pbsctklist.split("\n");
		for (var i = 0; i < u_coords.length; i++) {
			var xy = u_coords[i].split(',');
			var x = parseInt(xy[0],10);
			var y = parseInt(xy[1],10);
			if (isNaN(x) || isNaN(y)) continue;
			if (x < 1 || x > 800) continue;
			if (y < 1 || y > 800) continue;
			t.coordlist.push(x+","+y);
			counter++;
		};
		Options.pbsctklist = t.coordlist.join("\n");
		saveOptions();
		t.id.ptcheckinfo.innerHTML = counter + ' Valid Coordinates Found.';
		t.id.ptsctklist.value = Options.pbsctklist;
		if (counter > 0) {
			return true;
		} else {
			return false;
		}
	},

	ClearSLog : function () {
		var t = Tabs.Scout;
		Logs.sctlog = [];
		saveLogs();
		clearTimeout (t.displayTimer);
		t.show();
	},

	ClearListPos : function () {
		var t = Tabs.Scout;
		Options.pbsctcoordlistpointer = 0;
		saveOptions();
		Logbook.entry(Logs.sctlog, 'Target List Position Reset.');
		t.show();
	},

	ScoutOnOff : function () {
		var t = Tabs.Scout;
		if (t.started) {
			t.started = false;
			t.startvalue = "Run Scouts";
			if (Options.pbsctcoordlistpointer >= t.coordlist.length) {
				Options.pbsctcoordlistpointer = 0;
				Logbook.entry(Logs.sctlog, 'Target list Position Reset.');
				t.show();
			}
			saveOptions();
			clearTimeout (t.scoutTimer);
			if (t.stopreload) {
				t.stopreload = false; 
				Options.pbEveryEnable = true;
				RefreshEvery.setEnable(true);
				Logbook.entry(Logs.sctlog,'Auto-Reload GW Stopped.');
				t.id.ptsctlog.innerHTML = Logbook.output(Logs.sctlog);
			}
		} else {
			//Scouts Possible?
			var ok = true;
			var emsg = "";
			//Admissible Coordinates?
			Options.pbsctx = parseInt(Options.pbsctx);
			Options.pbscty = parseInt(Options.pbscty);
			
			if (!t.klistcheck()) {
					emsg+= 'You must enter at least one Valid set of coordinates in the list.<br>';
					ok = false;
				}

			//Min. 6 Second Interval
			Options.pbsctinterval = parseInt(Options.pbsctinterval);
			if (Options.pbsctinterval < 6) {
				emsg+= 'The interval between scouts must be at least 6 seconds.<br>';
				ok = false;
			}

			//No Errors? Search Here
			if (ok) {
				t.started = true;
				t.startvalue = "Stop Scouts";
				//Launch scouts
				if (Options.pbEveryEnable) {
					t.stopreload = true; 
					Options.pbEveryEnable = false;
					RefreshEvery.setEnable(false);
					Logbook.entry(Logs.sctlog,'Auto-reload GW Stopped.');
					t.id.ptsctlog.innerHTML = Logbook.output(Logs.sctlog);
				}
				t.scoutStart();
				t.startUnixTime = unixTime();
			} else {
				Logbook.entry(Logs.sctlog,emsg);
				t.id.ptsctlog.innerHTML = Logbook.output(Logs.sctlog);
			}
		}
		t.show();
	},

	scoutStart : function () {
		var t = Tabs.Scout;
		clearTimeout (t.scoutTimer);
		
		//Reload Marches.
		t.updatemarches();
		
		if (t.started) {
			if (t.scout) {
				for (i=0; i<Cities.cities.length; i++) {
					var cid = Cities.cities[i].id;
					var c = "city" + cid;		
					var now = unixTime();
					//Find March ID
					var mid = 0;
					var mlist = Seed.outgoing_marches['c'+Cities.cities[i].id];
					for (var m in mlist) {
						if (parseInt(mlist[m].marchStatus) == 0) {
							mid = mlist[m].marchId;
							break;
						}
					}
					//No Free March ID?
					if (mid == 3 || mid == 0) {
						Logbook.entry(Logs.sctlog,'No march possible. Waiting for Troops to return.');
						t.scoutTimer = setTimeout (t.scoutStart, 10000);	
						t.id.ptsctlog.innerHTML = Logbook.output(Logs.sctlog);
						return;
					}
					//In Farm scouts... List is Proccessed?
					if (Options.pbsctcoordlistpointer >= t.coordlist.length) {
						//End of scouts
						Logbook.entry(Logs.sctlog,'Coordinate List Processed. Waiting for return.');
						t.id.ptsctlog.innerHTML = Logbook.output(Logs.sctlog);
						//Troops back?
						var ret = true;
						var ml = Seed.outgoing_marches['c'+Cities.cities[i].id];
						for (var m in ml) {
							if (ml[m].marchStatus != 0) {
								ret = false;
							}
						}
						if (ret) {
							Logbook.entry(Logs.sctlog,'Troops Returned. Scouts complete.');
							t.started = false;
							t.startvalue = "Run Scouts";
							Options.pbsctcoordlistpointer = 0;
							Logbook.entry(Logs.sctlog, 'Target list position reset.');
							t.show();
							return;
						} else {
							t.scoutTimer = setTimeout (t.scoutStart, 5000);
							return;
						}
					}

					//Provide Coordinates
					var coord = t.coordlist[Options.pbsctcoordlistpointer].split(',');
					var x = parseInt(coord[0],10);
					var y = parseInt(coord[1],10);

					//Send scout
					var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
					params.cid = cid; //CityID
					params.instant = false;
					params.txcoord = x; //X coordinate
					params.tycoord = y; //Y coordinate
					params.useitem = false;

					t.scout = false;
					var now = unixTime();
					new MyAjaxRequest(unsafeWindow.g_ajaxpath + "scouting.php" + unsafeWindow.g_ajaxsuffix, {
						method: "post",
						parameters: params,
						onSuccess: function(rslt) {t.marchout(rslt, params, now);},
						onFailure: function(rslt) {alert('Error Sending out March');},
					});
				
					//Next scout
					var next =  (parseInt(1000*Options.pbsctinterval) + parseInt(1000*Math.random() * ( Options.pbsctinterval * 1.5 - Options.pbsctinterval )));
					t.scoutTimer = setTimeout (t.scoutStart,next);
				}
			}
		}
	},

	marchout : function (rslt, params, startnow) {
	  var t = Tabs.Scout;
		if (rslt.ok) {
			//Next Coords in farm
				Options.pbsctcoordlistpointer++;
				saveOptions();
			//Update March Data
			var now = unixTime();
			var q = {
				destinationUnixTime: now * 2 - startnow + rslt.oneway,
				marchUnixTime: now,
				returnUnixTime: rslt.returnEta,
				toXCoord: params.txcoord,
				toYCoord: params.tycoord,
				marchType: 3,
				marchStatus: 1,
				gold: 0,
				marchId: params.mid,
			};
			for (var r = 0; r < 9; r++) {
				q["resource" + r] = 0;
			}
			if (rslt.tileId) {
				q.toTileId = rslt.tileId;
				q.toTileType = rslt.tileType;
				q.toTileLevel = rslt.tileLevel;
			}
			Seed.outgoing_marches["c" + params.cid]["m" + params.mid] = q;


			//Log Entry
			var m = 'Scout on '+params.txcoord+","+params.tycoord+' started.';
			Logbook.entry(Logs.sctlog,m);
		} else {
			//Log Entry for Error
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m = 'Failed to Scout '+params.txcoord+","+params.tycoord+'. <br><span class="boldRed">'+errorcode+'</span>';
			Logbook.entry(Logs.sctlog,m);
		}
		t.id.ptsctlog.innerHTML = Logbook.output(Logs.sctlog);
		t.scout = true;
	},

	updatemarches: function() {
		var now = unixTime();
		for(var i=0; i<Cities.numCities; i++) {
			var cityId = Cities.cities[i].id;
			var marches = Seed.outgoing_marches['c'+cityId];
			for (var m in marches) {
				var march = marches[m];
				if (march.marchStatus != 0 && (march.marchType == 1 || march.marchType == 4 || march.marchType == 3) && march.returnUnixTime < now) {
					//March is Over
					march.marchStatus = 0;
					//Troops assigned to the City
					if (march.marchType == 1) { //Transport
						var post = "Count";
					} else {//Attack or scout
						var post = "Return";
					}
					for (var r = 1; r < 25; r++){
						Seed.units['city'+cityId]['unt'+r] += parseInt(march['unit'+r+post]);
					}
				}
				//Release General - Game Bug!
				if (march.marchStatus == 0) {
					if (march.knightId != 0 && Seed.knights['city'+cityId]['knt'+march.knightId]) {
						Seed.knights['city'+cityId]['knt'+march.knightId].knightStatus = 1;
						march.knightId = 0;					
					}
				}	
				
			}
    }
	},
	
  hide : function (){
    clearTimeout (Tabs.Scout.displayTimer);
  },	
	
	togOpt : function (checkboxId, optionName){
    var t = Tabs.Scout;
    var checkbox = checkboxId;
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
    }
  },
  
  changeOpt : function (valueId, optionName){
    var t = Tabs.Scout;
    var e = valueId;
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
			if (optionName == "pbsctx" || optionName == "pbscty") {
				t.finfo();
				t.show();
			}
    }
  },
	
	finfo : function() {
	  var t = Tabs.Scout;
		var fieldinfo = t.id.ptfieldinfo;
		if (Options.pbsctx < 1 || Options.pbsctx > 800 || 
				Options.pbscty < 1 || Options.pbscty > 800) {
			fieldinfo.style.display = 'block';
			fieldinfo.style.width = '540px';
			fieldinfo.style.whiteSpace = 'normal';
			fieldinfo.style.padding = '6px';
			fieldinfo.style.backgroundColor = '#dddddd';					
			fieldinfo.innerHTML = '<b>Target ('+Options.pbsctx+','+Options.pbscty+'):</b> The coordinates are invalid!';			
			return;
		} else {
			fieldinfo.style.display = 'block';
			fieldinfo.style.width = '540px';
			fieldinfo.style.whiteSpace = 'normal';
			fieldinfo.style.padding = '6px';	
			fieldinfo.style.backgroundColor = '#dddddd';				
			fieldinfo.innerHTML = '<b>Target ('+Options.pbsctx+','+Options.pbscty+'):</b> Waiting for Data from the server...';			
		}
		if (!t.read) return;
		//Get Data
		var x = parseInt((parseInt(Options.pbsctx)-1)/5)*5;
		var y = parseInt((parseInt(Options.pbscty)-1)/5)*5;
		var block = 'bl_'+x+'_bt_'+y;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.blocks = block;
		t.read = false;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) { t.mapresult(rslt); },
			onFailure: function (rslt) {alert('Failed to query the map for data');}
		});	
	},

	mapresult : function(rslt) {
		var t = Tabs.Scout;
		if (rslt.ok) {
			//Process Data
			var info = '<table><tr><td><b>Target ('+Options.pbsctx+','+Options.pbscty+'):</b>&nbsp;&nbsp;</td><td>';
			for (var e in rslt.data) {
				var element = rslt.data[e];
				if (element.xCoord != Options.pbsctx || element.yCoord != Options.pbscty) continue;
				if (element.tileType == '51') {
					if (element.tileUserId == '0') {
						info += 'Terrorist camp Level '+element.tileLevel+'</td>';
					} else {
						info += 'City Level '+element.tileLevel+'</td>';
						info += '</tr><tr><td><b>Name:</b></td><td>'+element.cityName+'</td>';
						info += '</tr><tr><td><b>General:</b></td><td>'+rslt.userInfo['u'+element.tileUserId].n;
						info += ' (Power: '+addCommas(rslt.userInfo['u'+element.tileUserId].m)+', Level: '+rslt.userInfo['u'+element.tileUserId].t+')</td>';
						if (element.tileAllianceId == '0') {
							info += '</tr><tr><td><b>Alliance:</b></td><td>None</td>';
						} else {
							info += '</tr><tr><td><b>Alliance:</b></td><td>'+rslt.allianceNames['a'+element.tileAllianceId];
							info += ' (Power: '+addCommas(rslt.allianceMights['a'+element.tileAllianceId])+')</td>';
						}
					}
				}	else {
					info += t.wildtypes[element.tileType]+' Level '+element.tileLevel+'</td>';
					if (element.tileType != '0') {
						if (element.tileUserId == '0') {
							info += '</tr><tr><td><b>Status:</b></td><td>Free</td>';	
						} else {
							info += '</tr><tr><td><b>Status:</b></td><td>Occupied</td>';
							info += '</tr><tr><td><b>General:</b></td><td>'+rslt.userInfo['u'+element.tileUserId].n;
							info += ' (Power: '+addCommas(rslt.userInfo['u'+element.tileUserId].m)+', Level: '+rslt.userInfo['u'+element.tileUserId].t+')</td>';
							if (element.tileAllianceId == '0') {
								info += '</tr><tr><td><b>Alliance:</b></td><td>None';
							} else {
								info += '</tr><tr><td><b>Alliance:</b></td><td>'+rslt.allianceNames['a'+element.tileAllianceId];
								info += ' (Power: '+addCommas(rslt.allianceMights['a'+element.tileAllianceId])+')</td>';
							}
						}
					}
				}
			}
			info += '</tr></table>';
			t.id.ptfieldinfo.innerHTML = info;

		} else {
			t.id.ptfieldinfo.innerHTML = '<b>Target ('+Options.pbsctx+','+Options.pbscty+'):</b> Could not map data from the server.';
		}
		t.read = true;	
	},
}
/*********************************** Search Tab ***********************************/
Tabs.Search = {
  tabOrder : 5,
  tabLabel: 'Search',
  cont : null,
  tabDisabled : !ENABLE_SEARCH,
	id : {},
	sectors : {
		s1 : 'Alpha',
		s2 : 'Bravo',
		s3 : 'Charlie',
		s4 : 'Delta',
		s5 : 'Echo',
		s6 : 'Foxtrot',
		s7 : 'Golf',
		s8 : 'Hotel',
		s9 : 'India',
		s10 : 'Juliet',
		s11 : 'Kilo',
		s12 : 'Lima',
		s13 : 'Mike',
		s14 : 'November',
		s15 : 'Oscar',
		s16 : 'Papa',	
	},
	sectorcoords : {
		s1 : { x : 0, y : 0, },
		s2 : { x : 200, y : 0, },
		s3 : { x : 400, y : 0, },
		s4 : { x : 600, y : 0, },
		s5 : { x : 0, y : 200, },
		s6 : { x : 200, y : 200, },
		s7 : { x : 400, y : 200, },
		s8 : { x : 600, y : 200, },		
		s9 : { x : 0, y : 400, },
		s10 : { x : 200, y : 400, },
		s11 : { x : 400, y : 400, },
		s12 : { x : 600, y : 400, },		
		s13 : { x : 0, y : 600, },
		s14 : { x : 200, y : 600, },
		s15 : { x : 400, y : 600, },
		s16 : { x : 600, y : 600, },				
	},
	blocklist : [],
	blockmax : 100,
	blockpointer : 0,
	blockread : false,
	mapread : false,
	blockreadtimer : null,
	map : {
		data : {},
		userInfo : {},
		allianceNames: {},
		allianceMights: {},
	},
	counter : {
		terror : 0,
		wasteland : 0,
		grassland : 0,
		riverlake : 0,
		oil : 0,
		hills : 0,
		mountain : 0,
		plain : 0,
		sr : 0,
		city : 0,
		user : 0,
		alliance : 0,
		fields : 0,
		timer : 0,
	},
	popterror : null,
	popwild : null,
	popcity : null,
	popganda : null,
	wildtypes : {
		'0' : 'Wasteland',
		'10' : 'Grassland',
		'11' : 'Lake', //Not Used
		'12' : 'River',
		'20' : 'Oil field',
		'30' : 'Hill',
		'40' : 'Mountain',
		'50' : 'Plain',
		'51' : 'City/Terrorist Camp',
		'52' : 'Ruins', //Not Used
		'53' : 'City in the Mist', //Not Used
		'201' : 'Titanium',
		'202' : 'Graphene',
		'203' : 'Uranium',
		'204' : 'Diamond',
	},
	diplomacyNames : {
		'0' : 'Neutral',
		'1' : 'Friendly',
		'2' : 'Hostile',
		'3' : 'TBD',
		'4' : 'Pending',
		'5' : 'Own Alliance',		
	},
	warstatus : {
		'1' : 'Normal',
		'2' : 'Beginner Protection',
		'3' : 'Peace Treaty',		
	},
	
  init : function (div){
    var t = Tabs.Search;
		Logs.searchlog =[];
		t.cont = div;
		var out = [];
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');	
		out.push('<b>Search for Terrorist camps, wilds, and Cities.</b>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		out.push('<table class="ptTab" width="100%">');
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Search at:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');
		out.push(htmlSelector ({'u':'Search Radius','s':'Search Sector','g':'Entire Map'}, Options.pbsearchtype, 'id="ptsearchtype"'));
		out.push('&nbsp;<span id="ptsearchhint"></span>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Center of Search (x,y):&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push('<input id="ptsearchx" type="text" size="2" maxlength="3" style="text-align: center;">');		
		out.push(' / ');
		out.push('<input id="ptsearchy" type="text" size="2" maxlength="3" style="text-align: center;">');
		//Cities Buttons for Coords
		out.push('&nbsp;City:');
		for(var i=0; i<Cities.numCities; i++) {
			out.push('&nbsp;<input id="ptcity'+i+'" type="submit" name="c'+i+'" value="'+(i+1)+'" title="'+Cities.cities[i].name+'" style="padding-left:2px;padding-right:2px;">');
		}
		out.push('&nbsp;&nbsp;<b><span id="ptsearchcityhint"></span></b></td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Search Radius:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push('<input id="ptsearchradius" type="text" size="2" maxlength="3" style="text-align: center;">&nbsp;(10-200)');		
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Sector:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push(htmlSelector (t.sectors, Options.pbsearchsector, 'id="ptsearchsector"'));		
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');
		out.push('<td>');
		out.push('<b>Block Search:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push(htmlSelector ({9:9, 20:20, 50:50, 75:75, 100:100, 150:150}, Options.pbsearchblockmax, 'id="ptsearchblockmax"'));		
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td colspan="2" style="white-space:normal;">');
		out.push('<br>Block Search Parameters:  The smaller value, the more detailed the search.<br>Choose the value that suits your needs.<br>');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td colspan="2">');
		out.push('<br><input id="ptsearchbutton" type="submit" name="search" value="Search"><br><br>');
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td colspan="2">');
		out.push('<div id="ptsearchlog" style="height:70px; overflow:auto;"></div>');
		out.push('</td>');
		out.push('</tr>');			
		out.push('</table>');		
		out.push('<hr>');			
		out.push('<div id="ptsearchstat"></div>');				
		out.push('<hr>');	
		out.push('<div style="text-align:center;">');
		out.push('<input id="ptsearchterror" type="submit" name="terror" value="Show Terrorist Camps">&nbsp;&nbsp;&nbsp;');
		out.push('<input id="ptsearchwild" type="submit" name="wild" value="Show Wilds">&nbsp;&nbsp;&nbsp;');
		out.push('<input id="ptsearchcity" type="submit" name="city" value="Show Cities">');
		// out.push('<input id="ptsearchuanda" type="submit" name="Alliance" value="Generals & Alliance">');
		out.push('</div>');
		t.cont.innerHTML = out.join('');		
		t.id.ptsearchtype = document.getElementById('ptsearchtype');
		t.id.ptsearchx = document.getElementById('ptsearchx');
		t.id.ptsearchy = document.getElementById('ptsearchy');
		t.id.ptsearchhint = document.getElementById('ptsearchhint');
		for(i=0; i<Cities.numCities; i++) {
			var ptc = 'ptcity'+i;
			t.id[ptc] = document.getElementById(ptc);
		}
		t.id.ptsearchradius = document.getElementById('ptsearchradius');
		t.id.ptsearchsector = document.getElementById('ptsearchsector');
		t.id.ptsearchblockmax = document.getElementById('ptsearchblockmax');
		t.id.ptsearchbutton = document.getElementById('ptsearchbutton');
		t.id.ptsearchlog = document.getElementById('ptsearchlog');
		t.id.ptsearchstat = document.getElementById('ptsearchstat');
		t.id.ptsearchterror = document.getElementById('ptsearchterror');
		t.id.ptsearchwild = document.getElementById('ptsearchwild');
		t.id.ptsearchcity = document.getElementById('ptsearchcity');
		t.id.ptsearchcityhint = document.getElementById('ptsearchcityhint');
		//Read Map Data
		/*
		var local = true;
		var serverID = getServerId();
		//counter
		s = GM_getValue ('Counter_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
		if (s != null){
			opts = JSON2.parse (s);
			for (k in opts){
				if (matTypeof(opts[k]) == 'object')
					for (kk in opts[k])
						t.counter[k][kk] = opts[k][kk];
				else
					t.counter[k] = opts[k];
			}
		} else {
			local = false;
		}		
		//map
		s = GM_getValue ('Map_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
		if (s != null){
			opts = JSON2.parse (s);
			for (k in opts){
				if (matTypeof(opts[k]) == 'object') {
					t.map[k] = {};
					for (kk in opts[k]) {
						if (matTypeof(opts[k][kk]) == 'object') {
							t.map[k][kk] = {};						
							for (kkk in opts[k][kk]) {
								t.map[k][kk][kkk] = opts[k][kk][kkk];
							}
						} else t.map[k][kk] = opts[k][kk];
					}
				} else t.map[k] = opts[k];
			}
		} else {
			local = false;
		}
		if (local) {
			Logbook.entry(Logs.searchlog,'Map data has been loaded from local storage');		
			t.Logbook();				
		}
		*/
		t.shortstat();
		t.show();
	},

  hide : function (){
  },

  show : function (){
    var t = Tabs.Search;	
		t.changeOpt(t.id.ptsearchtype, 'pbsearchtype');
		t.changeOpt(t.id.ptsearchx, 'pbsearchx');		
		t.changeOpt(t.id.ptsearchy, 'pbsearchy');
		t.changeOpt(t.id.ptsearchradius, 'pbsearchradius');		
		t.changeOpt(t.id.ptsearchsector, 'pbsearchsector');
        t.changeOpt(t.id.ptsearchblockmax, 'pbsearchblockmax');
		
		//which search method?
		if (Options.pbsearchtype == "u") {
			t.id.ptsearchhint.innerHTML = 'The radius search searches on center around the area in a given radius. This search is to find Wilds or terrorist camps in the vicinity of your cities';
			t.id.ptsearchhint.style.display = 'block';
			t.id.ptsearchhint.style.width = '400px';
			t.id.ptsearchhint.style.whiteSpace = 'normal';
			t.id.ptsearchhint.style.padding = '6px';
			t.id.ptsearchx.disabled = false;
			t.id.ptsearchy.disabled = false;
			for(i=0; i<Cities.numCities; i++) {
				var ptc = 'ptcity'+i;
				t.id[ptc].disabled = false;
			}
			t.id.ptsearchradius.disabled = false;
			t.id.ptsearchsector.disabled = true;
			t.id.ptsearchblockmax.disabled = false;
		} 
		if (Options.pbsearchtype == "s") {
			t.id.ptsearchhint.innerHTML = 'The sector search is for searching a large area on the map. The map has 16 sectors (alpha - Papa). Each sector is 200 x 200. This search method is to locate the Strategic Resource, since the game only shows the sector in which there are these resource-Plains.';
			t.id.ptsearchhint.style.display = 'block';
			t.id.ptsearchhint.style.width = '400px';
			t.id.ptsearchhint.style.whiteSpace = 'normal';
			t.id.ptsearchhint.style.padding = '6px';
			t.id.ptsearchx.disabled = true;
			t.id.ptsearchy.disabled = true;
			for(i=0; i<Cities.numCities; i++) {
				var ptc = 'ptcity'+i;
				t.id[ptc].disabled = true;
			}
			t.id.ptsearchradius.disabled = true;
			t.id.ptsearchsector.disabled = false;
			t.id.ptsearchblockmax.disabled = false;
		} 
		if (Options.pbsearchtype == "g") {
			t.id.ptsearchhint.innerHTML = 'The search of the entire map is very long and should only be used in the most exceptional of cercumstances. It has a large amount of requests to the server.<br><br><span class="boldRed">Warning: Kabam does not like such a heavy load on its server and this could result in something being done about this tool along with the ban of the user using it!</span>';
			t.id.ptsearchhint.style.display = 'block';
			t.id.ptsearchhint.style.width = '400px';
			t.id.ptsearchhint.style.whiteSpace = 'normal';
			t.id.ptsearchhint.style.padding = '6px';
			t.id.ptsearchx.disabled = true;
			t.id.ptsearchy.disabled = true;
			for(i=0; i<Cities.numCities; i++) {
				var ptc = 'ptcity'+i;
				t.id[ptc].disabled = true;
			}
			t.id.ptsearchradius.disabled = true;
			t.id.ptsearchsector.disabled = true;
			t.id.ptsearchblockmax.disabled = false;
		} 
		
		//City Button
		for(i=0; i<Cities.numCities; i++) {
			var ptc = 'ptcity'+i;
			t.id[ptc].addEventListener ('click', t.city, false);
		}
		
		//Search button
		t.id.ptsearchbutton.addEventListener ('click', t.startsearch, false);
		
		//Display Buttons
		t.id.ptsearchterror.addEventListener ('click', t.terrorview, false);
		t.id.ptsearchwild.addEventListener ('click', t.wildview, false);
		t.id.ptsearchcity.addEventListener ('click', t.cityview, false);
	},

	wildview: function() {

		function togOpt(checkboxId, optionName){
			var t = Tabs.Search;
			var checkbox = checkboxId;
			if (Options[optionName])
				checkbox.checked = true;
			checkbox.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.checked;
				saveOptions();
				t.tableview('wild',t.id.wildlist,t.id.wildcomment);
			}
		}
		
		function changeOpt(valueId, optionName){
			var t = Tabs.Search;
			var e = valueId;
			e.value = Options[optionName];
			e.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.value.trim();
				this.value = this.value.trim();
				if (optionName == "pbsearchwildmin" && parseInt(Options.pbsearchwildmin) > parseInt(Options.pbsearchwildmax)) {
					Options.pbsearchwildmax = Options.pbsearchwildmin;
					t.id.ptsearchwildmax.value = Options.pbsearchwildmax;
				}
				if (optionName == "pbsearchwildmax" && parseInt(Options.pbsearchwildmax) < parseInt(Options.pbsearchwildmin)) {
					Options.pbsearchwildmin = Options.pbsearchwildmax;
					t.id.ptsearchwildmin.value = Options.pbsearchwildmin;
				}
				saveOptions();
				t.tableview('wild',t.id.wildlist,t.id.wildcomment);
			}
		}
		
		function wildchange() { }
		
	  var t = Tabs.Search;	

    if (t.popwild == null){  
      t.popwild = new CPopup('wild', 50, 50, 1000,600, true);
      t.popwild.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Displaying Wilds and Strategic Resources.</b>';
			var content = [];
			content.push('<table><tr><td style="vertical-align:top; padding-right:10px;">');
			content.push('<table><tr><td colspan="2" style="padding-bottom:3px;"><b>Level:</b></td></tr><tr><td>Min&nbsp;</td><td style="padding-bottom:3px;">');
			content.push(htmlSelector ({'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}, Options.pbsearchwildmin, 'id="ptsearchwildmin"'));
			content.push('</td></tr><tr><td>Max&nbsp;</td><td>');
			content.push(htmlSelector ({'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}, Options.pbsearchwildmax, 'id="ptsearchwildmax"'));
			content.push('</td></tr></table></td>');
			
			content.push('<td style="vertical-align:top; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table><tr><td colspan="4" style="padding-bottom:3px;"><b>&nbsp;Wild Type:</b></td></tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildgrass"></td><td>Grassland&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildriver"></td><td>River&nbsp;&nbsp;</td>');
			content.push('</tr>');			
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildoil"></td><td>Oil Field&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildstone"></td><td>Hill&nbsp;&nbsp;</td>');
			content.push('</tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildsteel"></td><td>Mountain&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildplain"></td><td>Plains&nbsp;&nbsp;</td>');
			content.push('</tr>');	
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildsr"></td><td>Titanium & Graphene&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildwaste"></td><td>Wasteland</td>');
			content.push('<tr>');			
			content.push('</table></td>');

			content.push('<td style="vertical-align:top; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table><tr><td colspan="2" style="padding-bottom:3px;"><b>&nbsp;Owner:</b></td></tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildfree"></td><td>Free</td>');
			content.push('</tr>');			
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildoccupied"></td><td>Owned</td>');
			content.push('</tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildnoalli"></td><td>No Alliance</td>');
			content.push('</tr>');			
			content.push('</table></td>');

			content.push('<td style="vertical-align:middle; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>Alliance:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchwildalliance" style="width:120px;"></td>');
			content.push('</tr>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>General:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchwildplayer" style="width:120px;"></td>');
			content.push('</tr>');	
			content.push('<tr>');
			content.push('<td>&nbsp;</td>');
			content.push('<td><input type="submit" id="ptsearchwildchange" value="Update"></td>');
			content.push('</tr>');	
			content.push('</table></td>');

			content.push('<td style="vertical-align:top; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table><tr><td colspan="6" style="padding-bottom:3px;"><b>&nbsp;Alliance Diplomacy:</b></td></tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildhostile"></td><td>Hostile&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildfriendly"></td><td>Friendly&nbsp;&nbsp;</td>');			
			content.push('</tr>');			
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchwildneutral"></td><td>Neutral&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildfryou"></td><td>Pending&nbsp;&nbsp;</td>');
			content.push('</tr>');
			content.push('<tr>');			
			content.push('<td><input type="checkbox" id="ptsearchwildselfalli"></td><td>Own Alliance&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchwildfrthem"></td><td>Friendly to Them</td>');
			content.push('</tr>');	
			content.push('<tr>');	
			content.push('<td><input type="checkbox" id="ptsearchwilddiplnoa"></td><td>no Alliance&nbsp;&nbsp;</td>');
			content.push('<td>&nbsp;</td><td>&nbsp;</td>');
			content.push('</tr>');			
			content.push('</table></td>');
			
			content.push('<td style="vertical-align:middle; padding-left:10px; border-left:1px dotted black;"><input type="checkbox" id="ptsearchwildclick">&nbsp;Clickable Coordinates</td>');			

			content.push('</tr></table>');
			content.push('<hr>');
			content.push('<div id="wildlist" style="max-height:435px; height:435px; overflow-y:auto;"></div>');
			content.push('<hr>');
			content.push('<div id="wildcomment"></div>');

      t.popwild.getMainDiv().innerHTML = content.join('');
			t.id.ptsearchwildmin = document.getElementById('ptsearchwildmin');      
			t.id.ptsearchwildmax = document.getElementById('ptsearchwildmax');  

			t.id.ptsearchwildgrass = document.getElementById('ptsearchwildgrass');      
			t.id.ptsearchwildriver = document.getElementById('ptsearchwildriver');
			t.id.ptsearchwildsr = document.getElementById('ptsearchwildsr');      
			t.id.ptsearchwildoil = document.getElementById('ptsearchwildoil');  			
			t.id.ptsearchwildstone = document.getElementById('ptsearchwildstone');      
			t.id.ptsearchwildsteel = document.getElementById('ptsearchwildsteel');
			t.id.ptsearchwildplain = document.getElementById('ptsearchwildplain');      
			t.id.ptsearchwildwaste = document.getElementById('ptsearchwildwaste'); 			

			t.id.ptsearchwildfree = document.getElementById('ptsearchwildfree');
			t.id.ptsearchwildoccupied = document.getElementById('ptsearchwildoccupied');      
			t.id.ptsearchwildnoalli = document.getElementById('ptsearchwildnoalli'); 			

			t.id.ptsearchwildalliance = document.getElementById('ptsearchwildalliance');
			t.id.ptsearchwildplayer = document.getElementById('ptsearchwildplayer');      
			t.id.ptsearchwildchange = document.getElementById('ptsearchwildchange'); 			
			
			t.id.wildlist = document.getElementById('wildlist');
			t.id.wildcomment = document.getElementById('wildcomment');

			t.id.ptsearchwildhostile = document.getElementById('ptsearchwildhostile');      
			t.id.ptsearchwildfriendly = document.getElementById('ptsearchwildfriendly'); 			
			t.id.ptsearchwildneutral = document.getElementById('ptsearchwildneutral');
			t.id.ptsearchwildfryou = document.getElementById('ptsearchwildfryou');      
			t.id.ptsearchwildfrthem = document.getElementById('ptsearchwildfrthem'); 
			t.id.ptsearchwildselfalli = document.getElementById('ptsearchwildselfalli');      
			t.id.ptsearchwilddiplnoa = document.getElementById('ptsearchwilddiplnoa'); 

			t.id.ptsearchwildclick = document.getElementById('ptsearchwildclick'); 
			
			changeOpt(t.id.ptsearchwildmin, 'pbsearchwildmin');
			changeOpt(t.id.ptsearchwildmax, 'pbsearchwildmax');
			
			togOpt(t.id.ptsearchwildgrass, 'pbsearchwildgrass');
			togOpt(t.id.ptsearchwildriver, 'pbsearchwildriver');
			togOpt(t.id.ptsearchwildsr, 'pbsearchwildsr');
			togOpt(t.id.ptsearchwildoil, 'pbsearchwildoil');
			togOpt(t.id.ptsearchwildstone, 'pbsearchwildstone');
			togOpt(t.id.ptsearchwildsteel, 'pbsearchwildsteel');
			togOpt(t.id.ptsearchwildplain, 'pbsearchwildplain');
			togOpt(t.id.ptsearchwildwaste, 'pbsearchwildwaste');

			togOpt(t.id.ptsearchwildfree, 'pbsearchwildfree');
			togOpt(t.id.ptsearchwildoccupied, 'pbsearchwildoccupied');
			togOpt(t.id.ptsearchwildnoalli, 'pbsearchwildnoalli');

			changeOpt(t.id.ptsearchwildalliance, 'pbsearchwildalliance');
			changeOpt(t.id.ptsearchwildplayer, 'pbsearchwildplayer');

			togOpt(t.id.ptsearchwildhostile, 'pbsearchwildhostile');
			togOpt(t.id.ptsearchwildfriendly, 'pbsearchwildfriendly');
			togOpt(t.id.ptsearchwildneutral, 'pbsearchwildneutral');
			togOpt(t.id.ptsearchwildfryou, 'pbsearchwildfryou');
			togOpt(t.id.ptsearchwildfrthem, 'pbsearchwildfrthem');
			togOpt(t.id.ptsearchwildselfalli, 'pbsearchwildselfalli');
			togOpt(t.id.ptsearchwilddiplnoa, 'pbsearchwilddiplnoa');
			
			togOpt(t.id.ptsearchwildclick, 'pbsearchwildclick');	
			
			t.id.ptsearchwildchange.addEventListener ('click', wildchange, false);			

		}
		t.popwild.show (true);
		t.tableview('wild',t.id.wildlist,t.id.wildcomment);
	},
	
	cityview: function() {

		function togOpt(checkboxId, optionName){
			var t = Tabs.Search;
			var checkbox = checkboxId;
			if (Options[optionName])
				checkbox.checked = true;
			checkbox.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.checked;
				saveOptions();
				t.tableview('city',t.id.citylist,t.id.citycomment);
			}
		}
		
		function changeOpt(valueId, optionName){
			var t = Tabs.Search;
			var e = valueId;
			e.value = Options[optionName];
			e.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.value.trim();
				this.value = this.value.trim();
				saveOptions();
				t.tableview('city',t.id.citylist,t.id.citycomment);
			}
		}
		
		function citychange() { }
		
	  var t = Tabs.Search;	

    if (t.popcity == null){  
      t.popcity = new CPopup('city', 50, 50, 1200,600, true);
      t.popcity.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Displaying Cities</b>';
			var content = [];
			content.push('<table><tr>');

			content.push('<td style="vertical-align:middle; padding-right:10px;"><table>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>Alliance:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchcityalliance" style="width:120px;"></td>');
			content.push('</tr>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>General:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchcityplayer" style="width:120px;"></td>');
			content.push('</tr>');	
			content.push('<tr>');
			content.push('<td>&nbsp;</td>');
			content.push('<td><input type="submit" id="ptsearchcitychange1" value="Update"></td>');
			content.push('</tr>');	
			content.push('</table></td>');

			content.push('<td style="vertical-align:middle; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>Min. Power:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchcityminmight" style="width:120px;"></td>');
			content.push('</tr>');
			content.push('<tr>');
			content.push('<td style="padding-bottom:3px;"><b>Max Power:&nbsp;</b></td>');
			content.push('<td style="padding-bottom:3px;"><input type="text" id="ptsearchcitymaxmight" style="width:120px;"></td>');
			content.push('</tr>');	
			content.push('<tr>');
			content.push('<td>&nbsp;</td>');
			content.push('<td><input type="submit" id="ptsearchcitychange2" value="Update"></td>');
			content.push('</tr>');	
			content.push('</table></td>');
			
			content.push('<td style="vertical-align:top; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table><tr><td colspan="6" style="padding-bottom:3px;"><b>&nbsp;Alliance Diplomacy:</b></td></tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchcityhostile"></td><td>Hostile&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchcityfriendly"></td><td>Friendly&nbsp;&nbsp;</td>');			
			content.push('</tr>');			
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchcityneutral"></td><td>Neutral&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchcityfryou"></td><td>Pending&nbsp;&nbsp;</td>');
			content.push('</tr>');
			content.push('<tr>');			
			content.push('<td><input type="checkbox" id="ptsearchcityselfalli"></td><td>Own Alliance&nbsp;&nbsp;</td>');
			content.push('<td><input type="checkbox" id="ptsearchcityfrthem"></td><td>Friendly to them</td>');
			content.push('</tr>');	
			content.push('<tr>');	
			content.push('<td><input type="checkbox" id="ptsearchcitydiplnoa"></td><td>no Alliance&nbsp;&nbsp;</td>');
			content.push('<td>&nbsp;</td><td>&nbsp;</td>');
			content.push('</tr>');			
			content.push('</table></td>');

			content.push('<td style="vertical-align:top; padding-right:10px; padding-left:10px; border-left:1px dotted black;"><table><tr><td colspan="2" style="padding-bottom:3px;"><b>&nbsp;Status:</b></td></tr>');
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchcitynormal"></td><td>Normal&nbsp;&nbsp;</td>');
			content.push('</tr>');			
			content.push('<tr>');
			content.push('<td><input type="checkbox" id="ptsearchcitybeginner"></td><td>Beginners Protection&nbsp;&nbsp;</td>');
			content.push('</tr>');
			content.push('<tr>');			
			content.push('<td><input type="checkbox" id="ptsearchcitypeace"></td><td>Peace Treaty&nbsp;&nbsp;</td>');
			content.push('</tr>');	
			content.push('</table></td>');

			content.push('<td style="vertical-align:middle; padding-left:10px; border-left:1px dotted black;"><input type="checkbox" id="ptsearchcityclick">&nbsp;Clickable Coordinates</td>');

			content.push('</tr></table>');
			content.push('<hr>');
			content.push('<div id="citylist" style="max-height:435px; height:435px; overflow-y:auto;"></div>');
			content.push('<hr>');
			content.push('<div id="citycomment"></div>');

      t.popcity.getMainDiv().innerHTML = content.join('');

			t.id.ptsearchcityalliance = document.getElementById('ptsearchcityalliance');
			t.id.ptsearchcityplayer = document.getElementById('ptsearchcityplayer');      
			t.id.ptsearchcitychange1 = document.getElementById('ptsearchcitychange1'); 

			t.id.ptsearchcityminmight = document.getElementById('ptsearchcityminmight');
			t.id.ptsearchcitymaxmight = document.getElementById('ptsearchcitymaxmight');      
			t.id.ptsearchcitychange2 = document.getElementById('ptsearchcitychange2'); 			
			
			t.id.citylist = document.getElementById('citylist');
			t.id.citycomment = document.getElementById('citycomment');

			t.id.ptsearchcityhostile = document.getElementById('ptsearchcityhostile');      
			t.id.ptsearchcityfriendly = document.getElementById('ptsearchcityfriendly'); 			
			t.id.ptsearchcityneutral = document.getElementById('ptsearchcityneutral');
			t.id.ptsearchcityfryou = document.getElementById('ptsearchcityfryou');      
			t.id.ptsearchcityfrthem = document.getElementById('ptsearchcityfrthem'); 
			t.id.ptsearchcityselfalli = document.getElementById('ptsearchcityselfalli');      
			t.id.ptsearchcitydiplnoa = document.getElementById('ptsearchcitydiplnoa'); 

			t.id.ptsearchcitynormal = document.getElementById('ptsearchcitynormal'); 
			t.id.ptsearchcitybeginner = document.getElementById('ptsearchcitybeginner');      
			t.id.ptsearchcitypeace = document.getElementById('ptsearchcitypeace'); 

			t.id.ptsearchcityclick = document.getElementById('ptsearchcityclick'); 
			
			changeOpt(t.id.ptsearchcityalliance, 'pbsearchcityalliance');
			changeOpt(t.id.ptsearchcityplayer, 'pbsearchcityplayer');
			changeOpt(t.id.ptsearchcityminmight, 'pbsearchcityminmight');
			changeOpt(t.id.ptsearchcitymaxmight, 'pbsearchcitymaxmight');			
			
			togOpt(t.id.ptsearchcityhostile, 'pbsearchcityhostile');
			togOpt(t.id.ptsearchcityfriendly, 'pbsearchcityfriendly');
			togOpt(t.id.ptsearchcityneutral, 'pbsearchcityneutral');
			togOpt(t.id.ptsearchcityfryou, 'pbsearchcityfryou');
			togOpt(t.id.ptsearchcityfrthem, 'pbsearchcityfrthem');
			togOpt(t.id.ptsearchcityselfalli, 'pbsearchcityselfalli');
			togOpt(t.id.ptsearchcitydiplnoa, 'pbsearchcitydiplnoa');
			
			togOpt(t.id.ptsearchcitynormal, 'pbsearchcitynormal');
			togOpt(t.id.ptsearchcitybeginner, 'pbsearchcitybeginner');
			togOpt(t.id.ptsearchcitypeace, 'pbsearchcitypeace');
			
			togOpt(t.id.ptsearchcityclick, 'pbsearchcityclick');			
			
			t.id.ptsearchcitychange1.addEventListener ('click', citychange, false);			
			t.id.ptsearchcitychange2.addEventListener ('click', citychange, false);	
			
		}
		t.popcity.show (true);
		t.tableview('city',t.id.citylist,t.id.citycomment);
	},

	terrorview: function() {
		
		function togOpt(checkboxId, optionName){
			var t = Tabs.Search;
			var checkbox = checkboxId;
			if (Options[optionName])
				checkbox.checked = true;
			checkbox.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.checked;
				saveOptions();
				t.tableview('terror',t.id.terrorlist,t.id.terrorcomment);
			}
		}

		function changeOpt(valueId, optionName){
			var t = Tabs.Search;
			var e = valueId;
			e.value = Options[optionName];
			e.addEventListener ('change', eventHandler, false);
			function eventHandler (){
				Options[optionName] = this.value;
				if (optionName == "pbsearchterrormin" && parseInt(Options.pbsearchterrormin) > parseInt(Options.pbsearchterrormax)) {
					Options.pbsearchterrormax = Options.pbsearchterrormin;
					t.id.ptsearchterrormax.value = Options.pbsearchterrormax;
				}
				if (optionName == "pbsearchterrormax" && parseInt(Options.pbsearchterrormax) < parseInt(Options.pbsearchterrormin)) {
					Options.pbsearchterrormin = Options.pbsearchterrormax;
					t.id.ptsearchterrormin.value = Options.pbsearchterrormin;
				}
				saveOptions();
				t.tableview('terror',t.id.terrorlist, t.id.terrorcomment);
			}
		}
		
	  var t = Tabs.Search;	

    if (t.popterror == null){  
      t.popterror = new CPopup('terror', 50, 50, 450,600, true);
      t.popterror.getTopDiv().innerHTML = '<b style="position:relative; top:4px; left: 6px;">Displaying Terrorist Camps</b>';
			var content = [];
			content.push('<table><tr><td style="vertical-align:middle;">');
			content.push('Level (min/max): ');
			content.push(htmlSelector ({'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}, Options.pbsearchterrormin, 'id="ptsearchterrormin"'));
			content.push(' / ');
			content.push(htmlSelector ({'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}, Options.pbsearchterrormax, 'id="ptsearchterrormax"'));
			content.push('</td>');
			content.push('<td>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="ptsearchterrorclick">&nbsp;Clickable Coordinates</td>');			
			content.push('</tr></table>');
			content.push('<hr>');
			content.push('<div id="terrorlist" style="max-height:480px; height:480px; overflow-y:auto;"></div>');
			content.push('<hr>');
			content.push('<div id="terrorcomment"></div>');
      t.popterror.getMainDiv().innerHTML = content.join('');
			t.id.ptsearchterrormin = document.getElementById('ptsearchterrormin');      
			t.id.ptsearchterrormax = document.getElementById('ptsearchterrormax');  
			t.id.terrorlist = document.getElementById('terrorlist');
			t.id.terrorcomment = document.getElementById('terrorcomment');	
			t.id.ptsearchterrorclick = document.getElementById('ptsearchterrorclick');				
			changeOpt(t.id.ptsearchterrormin, 'pbsearchterrormin');
			changeOpt(t.id.ptsearchterrormax, 'pbsearchterrormax');
			togOpt(t.id.ptsearchterrorclick, 'pbsearchterrorclick');	
		}
		t.popterror.show (true);
		t.tableview('terror',t.id.terrorlist, t.id.terrorcomment);
	},

	tableview: function(type,outid,commentid) {

	  var t = Tabs.Search;		
		outid.innerHTML = 'Data is Filtered and processed...';
		commentid.innerHTML = 'Please wait ...';		
		//Terrorists
		if (type == 'terror') {
			//Build Data tables for Terrorists
			var tabelle = [];
			tabelle.push('<table id="pbterrortable" width="100%" class="zebra ptTabOverview" cellpadding="0" cellspacing="0">');
			tabelle.push('<thead>');				
			tabelle.push('<tr style="background-color:#eea;">');
			tabelle.push('<td style="text-align:left;" class="no_sort"><b>Type</b></td>');
			tabelle.push('<td style="text-align:center;"><b>Level</b></td>');
			if (Options.pbsearchterrorclick) {
				tabelle.push('<td class="ptcoordslist no_sort" id="searchcoordslistT" title="Click to transfer the list of coordinates from the Farm-Tab." style="text-align:center;"><b>Coordinates</b></td>');
			} else {
				tabelle.push('<td class="no_sort" style="text-align:center;"><b>Coordinates</b></td>');
			}
			if (Options.pbsearchtype == "u") {
				tabelle.push('<td style="text-align:center;"><b>Distance</b></td>');
			}
			tabelle.push('</tr>');
			tabelle.push('</thead>');
			tabelle.push('<tbody>');			
			var anzahl = 0;
			//Filter Map Data
			for (var e in t.map.data) {
				var d = t.map.data[e];
				//Stop Conditions
				if (d.type != '51') continue;
				if (d.userid != '0') continue;
				if (parseInt(d.level) < parseInt(Options.pbsearchterrormin) || parseInt(d.level) > parseInt(Options.pbsearchterrormax)) continue;
				var dist = t.distance(parseInt(d.x),parseInt(d.y));
				if (Options.pbsearchtype == "u" && dist > parseInt(Options.pbsearchradius)) continue;
				
				//Line Output
				if (anzahl++ % 2) {
					style = 'odd';
				} else {
					style = '';
				}
				if (anzahl > 3000) continue;
				tabelle.push('<tr class="'+style+'">');
				tabelle.push('<td style="text-align:left;"><b>Terrorist Camp</b></td>');	
				tabelle.push('<td style="text-align:center;">'+parseInt(d.level)+'</td>');	
				if (Options.pbsearchterrorclick) {
					tabelle.push('<td class="ptcoords" title="Click to transfer to the Farm-Tab" style="text-align:center;" id="search'+anzahl+'T">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				} else {
					tabelle.push('<td style="text-align:center;">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				}				
				if (Options.pbsearchtype == "u") {					
					tabelle.push('<td my_key="'+dist+'" style="text-align:center;">'+formatZahl(dist,2,true)+'</td>');					
				}
				tabelle.push('</tr>');	
				
			}
			tabelle.push('</tbody>');						
			tabelle.push('</table>');
			if (anzahl == 0) {
				outid.innerHTML = 'There is no relevant Data.';
				commentid.innerHTML = 'Change your Selection.';
				return;
			}
			outid.innerHTML = tabelle.join('');
			if (anzahl <= 3000) {
				commentid.innerHTML = 'There was '+addCommas(anzahl)+' Data found.';
			} else {
				commentid.innerHTML = '<span class="boldRed">For Performance Reasons, only 3,000 of '+addCommas(anzahl)+' Data shown. Refine your Selection!</span>';
			}
			if (Options.pbsearchterrorclick) {
				for(var el = 1; el <= anzahl; el++) {
					var element = document.getElementById('search'+el+'T');
					element.addEventListener ('click', function() {
						var coords = this.innerHTML.split(',');
						var x = parseInt(coords[0],10);
						var y = parseInt(coords[1],10);
						Options.pbfarmx = x;
						Options.pbfarmy = y;	
						document.getElementById('ptfarmx').value = x;
						document.getElementById('ptfarmy').value = y;
						saveOptions();
						Tabs.Farm.finfo();							
						alert("The coordinate "+x+","+y+" was transfered to the Farm-Tab");
					}, false);		
				}
				
				var klist = document.getElementById('searchcoordslistT');
				klist.addEventListener ('click', function() {
					var tb = document.getElementById('pbterrortable').tBodies[0];
					var tr = tb.rows;
					var trl = tb.rows.length;
					var coords = [];
					for (var i = 0; i < trl; i++) {
						coords.push(tr[i].cells[2].innerHTML);
					}
					Options.pbfarmklist = coords.join("\n");
					Tabs.Farm.klistcheck();
					alert(addCommas(trl) + " Coordinates were transfered to the Farm-Tab");
					//Options.pbfarmcoordlistpointer = 0;
					//saveOptions();
					//Logbook.entry(Logs.artlog, 'Coordinate List Position reset');
					Tabs.Farm.show();
				}, false);	
			}
			var tsort = new SortTable(document.getElementById('pbterrortable'));
		}
		//Wilds
		if (type == 'wild') {
			//Compile Diplomacy
			var diplomacy = t.diplomacy();
			//Build Data Table For Wilds
			var tabelle = [];
			tabelle.push('<table id="pbwildtable" width="100%" class="zebra ptTabOverview" cellpadding="0" cellspacing="0">');
			tabelle.push('<thead>');				
			tabelle.push('<tr style="background-color:#eea;">');
			tabelle.push('<td style="text-align:left;"><b>Type</b></td>');
			tabelle.push('<td style="text-align:center;"><b>Level</b></td>');
			if (Options.pbsearchwildclick) {			
				tabelle.push('<td class="ptcoordslist no_sort" id="searchcoordslistW" title="Click to transfer the List of Coordinates to the Farm-tab" style="text-align:center;"><b>Coordinates</b></td>');
			} else {
				tabelle.push('<td class="no_sort" style="text-align:center;"><b>Coordinates</b></td>');
			}
			if (Options.pbsearchtype == "u") {
				tabelle.push('<td style="text-align:center;"><b>Distance</b></td>');
			}
			tabelle.push('<td class="sort_string" style="text-align:left;" ignore_case="ignore_case"><b>General</b></td>');	
			tabelle.push('<td style="text-align:right;"><b>Power</b></td>');	
			tabelle.push('<td class="sort_string" style="text-align:left;" ignore_case="ignore_case"><b>Alliance</b></td>');
			tabelle.push('<td style="text-align:right;"><b>A-Power</b></td>');
			if (diplomacy) {
				tabelle.push('<td style="text-align:left;"><b>Diplomacy</b></td>');				
			}
			tabelle.push('<td style="text-align:left;"><b>Sector</b></td>');	
			tabelle.push('</tr>');
			tabelle.push('</thead>');
			tabelle.push('<tbody>');			
			var anzahl = 0;
			//Player Name Search
			var general = '';
			if (Options.pbsearchwildplayer != "") {
				var sname = Options.pbsearchwildplayer.toLowerCase();
				for (var u in t.map.userInfo) {
					var name = t.map.userInfo[u].name.toLowerCase();
					if (name == sname) {
						general = u.substr(1); //Cut off the First Character
						break;
					}
				}
			}
			//Search for Alliance Name
			var alliance = '';
			if (Options.pbsearchwildalliance != "") {
				var sname = Options.pbsearchwildalliance.toLowerCase();
				for (var a in t.map.allianceNames) {
					var name = t.map.allianceNames[a].toLowerCase();
					if (name == sname) {
						alliance = a.substr(1); //Cut off the First Character
						break;
					}
				}
			}

			//Filter Map Data
			for (var e in t.map.data) {
				var d = t.map.data[e];
				//Termination criteria
				if (Options.pbsearchwildplayer != "" && d.userid != general) continue;
				if (Options.pbsearchwildalliance != "" && d.allianceid != alliance) continue;
				if (d.type == '51') continue; //City or Terror Camp
				if (!Options.pbsearchwildwaste && d.type == '0') continue; //Wasteland not wanted
				if (!Options.pbsearchwildgrass && d.type == '10') continue; //Grassland not wanted
				if (!Options.pbsearchwildriver && d.type == '12') continue; //River not wanted
				if (!Options.pbsearchwildoil && d.type == '20') continue; //Oilfield not wanted
				if (!Options.pbsearchwildstone && d.type == '30') continue; //Hill not wanted
				if (!Options.pbsearchwildsteel && d.type == '40') continue; //Mountain not wanted
				if (!Options.pbsearchwildplain && d.type == '50') continue; //Plain not wanted
				if (!Options.pbsearchwildsr && 
						(d.type == '201' || d.type == '202' || 
						 d.type == '203' || d.type == '204')) continue; //Strategic Resource not wanted
				if (parseInt(d.level) < parseInt(Options.pbsearchwildmin) || parseInt(d.level) > parseInt(Options.pbsearchwildmax)) continue;
				if (!Options.pbsearchwildfree && d.userid == "0") continue;
				if (!Options.pbsearchwildoccupied && d.userid != "0") continue;
				if (d.allianceid != "0") {
					if (Options.pbsearchwildnoalli) continue
					var dipl = t.map.allianceDiplomacy['a'+d.allianceid];
					if (!Options.pbsearchwildneutral && dipl == 0) continue;					
					if (!Options.pbsearchwildfriendly && dipl == 1) continue;
					if (!Options.pbsearchwildhostile && dipl == 2) continue;
					if (!Options.pbsearchwildfrthem && dipl == 3) continue;	
					if (!Options.pbsearchwildfryou && dipl == 4) continue;
					if (!Options.pbsearchwildselfalli && dipl == 5) continue;					
				} else {
					if (!Options.pbsearchwilddiplnoa) continue; 
				}
				var dist = t.distance(parseInt(d.x),parseInt(d.y));
				if (Options.pbsearchtype == "u" && dist > parseInt(Options.pbsearchradius)) continue;
				//Line Output
				if (anzahl++ % 2) {
					style = 'odd';
				} else {
					style = '';
				}
				if (anzahl > 3000) continue;
				tabelle.push('<tr class="'+style+'">');
				tabelle.push('<td style="text-align:left;"><b>'+t.wildtypes[d.type]+'</b></td>');	
				tabelle.push('<td style="text-align:center;">'+parseInt(d.level)+'</td>');	
				if (Options.pbsearchwildclick) {
					tabelle.push('<td class="ptcoords" title="Click to transfer Coordinates to Farm-Tab" style="text-align:center;" id="search'+anzahl+'W">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				} else {
					tabelle.push('<td style="text-align:center;">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				}
				if (Options.pbsearchtype == "u") {					
					tabelle.push('<td  my_key="'+dist+'" style="text-align:center;">'+formatZahl(dist,2,true)+'</td>');					
				}
				if (d.userid != "0") {
					var u = t.map.userInfo['u'+d.userid];
					tabelle.push('<td style="text-align:left;">'+u.name+'</td>');
					tabelle.push('<td my_key="'+u.might+'" style="text-align:right;">'+addCommas(u.might)+'</td>');											
				} else {
					tabelle.push('<td style="text-align:left;">---</td>');
					tabelle.push('<td my_key="-1" style="text-align:right;">---</td>');
				}
				if (d.allianceid != "0") {
					var a = t.map.allianceNames['a'+d.allianceid];
					var m = t.map.allianceMights['a'+d.allianceid];
					tabelle.push('<td style="text-align:left;">'+a+'</td>');
					tabelle.push('<td my_key="'+m+'" style="text-align:right;">'+addCommas(m)+'</td>');
					if (diplomacy) {					
						tabelle.push('<td style="text-align:left;">'+t.diplomacyNames[dipl]+'</td>');
					}
				} else {
					tabelle.push('<td style="text-align:left;">---</td>');
					tabelle.push('<td my_key="-1" style="text-align:right;">---</td>');
					if (diplomacy) {					
						tabelle.push('<td style="text-align:left;">---</td>');
					}
				}	
				tabelle.push('<td style="text-align:left;">'+t.sectors['s'+d.sectorid]+'</td>');
				tabelle.push('</tr>');	
			}

			tabelle.push('</tbody>');						
			tabelle.push('</table>');
			if (anzahl == 0) {
				outid.innerHTML = 'There is no Relevant Data.';
				commentid.innerHTML = 'Refine your search.';	
				return;
			}
			outid.innerHTML = tabelle.join('');
			if (anzahl <= 3000) {
				commentid.innerHTML = 'There were '+addCommas(anzahl)+' Data Found.';
			} else {
				commentid.innerHTML = '<span class="boldRed">For Performance Reasons only 3,000 '+addCommas(anzahl)+' Data is shown. Refine your Selection!</span>';
			}
			if (Options.pbsearchwildclick) {
				for(var el = 1; el <= anzahl; el++) {
					var element = document.getElementById('search'+el+'W');
					element.addEventListener ('click', function() {
						var coords = this.innerHTML.split(',');
						var x = parseInt(coords[0],10);
						var y = parseInt(coords[1],10);
						Options.pbfarmx = x;
						Options.pbfarmy = y;	
						document.getElementById('ptfarmx').value = x;
						document.getElementById('ptfarmy').value = y;
						saveOptions();
						Tabs.Farm.finfo();							
						alert("The Coordinates "+x+","+y+" were transfered to the Farm-Tab");
					}, false);		
				}
				
				var klist = document.getElementById('searchcoordslistW');
				klist.addEventListener ('click', function() {
					var tb = document.getElementById('pbwildtable').tBodies[0];
					var tr = tb.rows;
					var trl = tb.rows.length;
					var coords = [];
					for (var i = 0; i < trl; i++) {
						coords.push(tr[i].cells[2].innerHTML);
					}
					Options.pbfarmklist = coords.join("\n");
					Tabs.Farm.klistcheck();
					alert(addCommas(trl) + "Coordinates were transfered to the Farm-Tab");
				}, false);	
			}
			var tsort = new SortTable(document.getElementById('pbwildtable'));
		}

		//Cities
		if (type == 'city') {
			//Compile Diplomacy
			var diplomacy = t.diplomacy();
			//Build Data Table for Cities
			var tabelle = [];
			tabelle.push('<table id="pbcitytable" width="100%" class="zebra ptTabOverview" cellpadding="0" cellspacing="0">');
			tabelle.push('<thead>');				
			tabelle.push('<tr style="background-color:#eea;">');
			tabelle.push('<td style="text-align:left;"><b>Type</b></td>');
			tabelle.push('<td style="text-align:center;"><b>Level</b></td>');	
			tabelle.push('<td style="text-align:left;"><b>Name</b></td>');
			if (Options.pbsearchcityclick) {
				tabelle.push('<td class="ptcoordslist no_sort" id="searchcoordslistC" title="Click to transfer the Coordinates to the Farm-Tab" style="text-align:center;"><b>coordinates</b></td>');
			} else {
				tabelle.push('<td class="no_sort" istyle="text-align:center;"><b>coordinates</b></td>');
			}
			if (Options.pbsearchtype == "u") {
				tabelle.push('<td style="text-align:center;"><b>Distance</b></td>');
			}
			tabelle.push('<td class="sort_string" style="text-align:left;" ignore_case="ignore_case"><b>General</b></td>');	
			tabelle.push('<td style="text-align:right;"><b>Power</b></td>');
			tabelle.push('<td style="text-align:center;"><b>G-Level</b></td>');			
			tabelle.push('<td class="sort_string" style="text-align:left;" ignore_case="ignore_case"><b>Alliance</b></td>');
			tabelle.push('<td style="text-align:right;"><b>A-Power</b></td>');
			if (diplomacy) {
				tabelle.push('<td style="text-align:left;"><b>Diplomacy</b></td>');				
			}
			tabelle.push('<td style="text-align:left;"><b>Status</b></td>');				
			tabelle.push('<td style="text-align:left;"><b>Sector</b></td>');	
			tabelle.push('</tr>');
			tabelle.push('</thead>');
			tabelle.push('<tbody>');			
			var anzahl = 0;
			//Player Name Search
			var general = '';
			if (Options.pbsearchcityplayer != "") {
				var sname = Options.pbsearchcityplayer.toLowerCase();
				for (var u in t.map.userInfo) {
					var name = t.map.userInfo[u].name.toLowerCase();
					if (name == sname) {
						general = u.substr(1); //Remove the First Character
						break;
					}
				}
			}
			//Alliance Name Search
			var alliance = '';
			if (Options.pbsearchcityalliance != "") {
				var sname = Options.pbsearchcityalliance.toLowerCase();
				for (var a in t.map.allianceNames) {
					var name = t.map.allianceNames[a].toLowerCase();
					if (name == sname) {
						alliance = a.substr(1); //Remove The First Character
						break;
					}
				}
			}

			//Filter Map Data
			for (var e in t.map.data) {
				var d = t.map.data[e];
				//Termination Criteria
				if (Options.pbsearchcityplayer != "" && d.userid != general) continue;
				if (Options.pbsearchcityalliance != "" && d.allianceid != alliance) continue;
				if (d.type != '51') continue; //not a City or Terror Camp
				if (d.userid == '0') continue; //not a terror Camp
				var u = t.map.userInfo['u'+d.userid];
				if (Options.pbsearchcityminmight != "" && parseInt(u.might) < parseInt(Options.pbsearchcityminmight)) continue;
				if (Options.pbsearchcitymaxmight != "" && parseInt(u.might) > parseInt(Options.pbsearchcitymaxmight)) continue;
				if (!Options.pbsearchcitynormal && u.warstatus == "1") continue;
				if (!Options.pbsearchcitybeginner && u.warstatus == "2") continue;
				if (!Options.pbsearchcitypeace && u.warstatus == "3") continue;				
				if (d.allianceid != "0") {
					var dipl = t.map.allianceDiplomacy['a'+d.allianceid];
					if (!Options.pbsearchcityneutral && dipl == 0) continue;					
					if (!Options.pbsearchcityfriendly && dipl == 1) continue;
					if (!Options.pbsearchcityhostile && dipl == 2) continue;
					if (!Options.pbsearchcityfrthem && dipl == 3) continue;	
					if (!Options.pbsearchcityfryou && dipl == 4) continue;
					if (!Options.pbsearchcityselfalli && dipl == 5) continue;					
				} else {
					if (!Options.pbsearchcitydiplnoa) continue; 
				}
				var dist = t.distance(parseInt(d.x),parseInt(d.y));
				if (Options.pbsearchtype == "u" && dist > parseInt(Options.pbsearchradius)) continue;
				//Line Output
				if (anzahl++ % 2) {
					style = 'odd';
				} else {
					style = '';
				}
				if (anzahl > 3000) continue;
				tabelle.push('<tr class="'+style+'">');
				tabelle.push('<td style="text-align:left;"><b>City</b></td>');	
				tabelle.push('<td style="text-align:center;">'+parseInt(d.level)+'</td>');
				tabelle.push('<td style="text-align:left;">'+d.cityname+'</td>');	
				if (Options.pbsearchcityclick) {
					tabelle.push('<td class="ptcoords" title="Click to transfer Coordinates to the Farm-Tab" style="text-align:center;" id="search'+anzahl+'C">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				} else {
					tabelle.push('<td style="text-align:center;">'+parseInt(d.x)+' , '+parseInt(d.y)+'</td>');
				}				
				if (Options.pbsearchtype == "u") {					
					tabelle.push('<td my_key="'+dist+'" style="text-align:center;">'+formatZahl(dist,2,true)+'</td>');					
				}
				tabelle.push('<td style="text-align:left;">'+u.name+'</td>');
				tabelle.push('<td my_key="'+u.might+'" style="text-align:right;">'+addCommas(u.might)+'</td>');	
				tabelle.push('<td style="text-align:center;">'+u.level+'</td>');
				
				if (d.allianceid != "0") {
					var a = t.map.allianceNames['a'+d.allianceid];
					var m = t.map.allianceMights['a'+d.allianceid];
					tabelle.push('<td style="text-align:left;">'+a+'</td>');
					tabelle.push('<td my_key="'+m+'" style="text-align:right;">'+addCommas(m)+'</td>');
					if (diplomacy) {					
						tabelle.push('<td style="text-align:left;">'+t.diplomacyNames[dipl]+'</td>');
					}
				} else {
					tabelle.push('<td style="text-align:left;">---</td>');
					tabelle.push('<td my_key="-1" style="text-align:right;">---</td>');
					if (diplomacy) {					
						tabelle.push('<td style="text-align:left;">---</td>');
					}
				}	
				tabelle.push('<td style="text-align:left;">'+t.warstatus[u.warstatus]+'</td>');
				tabelle.push('<td style="text-align:left;">'+t.sectors['s'+d.sectorid]+'</td>');
				tabelle.push('</tr>');	
			}
			tabelle.push('</tbody>');						
			tabelle.push('</table>');
			if (anzahl == 0) {
				outid.innerHTML = 'There is no  Relevant Data.';
				commentid.innerHTML = 'Change your Selection.';	
				return;
			}
			outid.innerHTML = tabelle.join('');
			if (anzahl <= 3000) {
				commentid.innerHTML = 'There were '+addCommas(anzahl)+' records found.';
			} else {
				commentid.innerHTML = '<span class="boldRed">For Performance reasons only 3,000 of '+addCommas(anzahl)+' Data is shown. Refine your choice!</span>';
			}
			if (Options.pbsearchcityclick) {
				for(var el = 1; el <= anzahl; el++) {
					var element = document.getElementById('search'+el+'C');
					element.addEventListener ('click', function() {
						var coords = this.innerHTML.split(',');
						var x = parseInt(coords[0],10);
						var y = parseInt(coords[1],10);
						Options.pbfarmx = x;
						Options.pbfarmy = y;	
						document.getElementById('ptfarmx').value = x;
						document.getElementById('ptfarmy').value = y;
						saveOptions();
						Tabs.Farm.finfo();							
						alert("The coordinates "+x+","+y+" was Transfered to the Farm-Tab");
					}, false);		
				}
				
				var klist = document.getElementById('searchcoordslistC');
				klist.addEventListener ('click', function() {
					var tb = document.getElementById('pbcitytable').tBodies[0];
					var tr = tb.rows;
					var trl = tb.rows.length;
					var coords = [];
					for (var i = 0; i < trl; i++) {
						coords.push(tr[i].cells[3].innerHTML);
					}
					Options.pbfarmklist = coords.join("\n");
					Tabs.Farm.klistcheck();
					alert(addCommas(trl) + "Coordinates were Transfered to the Farm-Tab");
				}, false);	
			}
			var tsort = new SortTable(document.getElementById('pbcitytable'));
		}
		
	},
	
	diplomacy: function() {
		// 0 neutral
		// 1 Friendly
		// 2 Hostile
		// 3 Friendly to Alliance
		// 4 Friendly to you
		// 5 No Alliance

    var t = Tabs.Search;
		
		var ad = Seed.allianceDiplomacies;
		t.map.allianceDiplomacy = {};
		try {
			var own = ad.allianceId;
		} catch (e) {
			return false;
		}
		for (var a in t.map.allianceNames) {
			var found = false;
			t.map.allianceDiplomacy[a] = 0; //neutral
			for (var alli in ad.friendly) {
				if (a == alli) {
					t.map.allianceDiplomacy[a] = 1;
					found = true;
				}
			}
			if (!found) {
				for (var alli in ad.hostile) {
					if (a == alli) {
						t.map.allianceDiplomacy[a] = 2;
						found = true;
					}
				}			
			}
			if (!found) {
				for (var alli in ad.friendlyToThem) {
					if (a == alli) {
						t.map.allianceDiplomacy[a] = 3;
						found = true;
					}
				}			
			}
			if (!found) {
				for (var alli in ad.friendlyToYou) {
					if (a == alli) {
						t.map.allianceDiplomacy[a] = 4;
						found = true;
					}
				}			
			}
			if (!found && a == 'a'+own) {
				t.map.allianceDiplomacy[a] = 5;		
			}
		}
		return true;
	},
	
	startsearch: function () {
    var t = Tabs.Search;
		var error = '';
		//Errors in the Input Data?
		//Error checking of overall sector and search is not necessary
		if (Options.pbsearchtype == "u") {
			Options.pbsearchx = parseInt(Options.pbsearchx);
			Options.pbsearchy = parseInt(Options.pbsearchy);
			Options.pbsearchradius = parseInt(Options.pbsearchradius);	
			if (Options.pbsearchx < 1 || Options.pbsearchx > 800) {
				error += 'The X-Coordinate must be between 1 and 800.<br>';
			}
			if (Options.pbsearchy < 1 || Options.pbsearchy > 800) {
				error += 'The Y-Coordinate must be between 1 and 800.<br>';
			}
			if (Options.pbsearchradius < 10 || Options.pbsearchradius > 200) {
				error += 'The Search Radius must be between 10 and 200.<br>';
			}
		}
		//Error Occurred?
		if (error.length > 0) {
			Logbook.entry(Logs.searchlog,error);		
			t.Logbook();
			return;
		}
		
		//From here everything is ok
		if (t.mapread) {
			//Map should not be read
			t.mapread = false;
			t.id.ptsearchtype.disabled = false;
			t.id.ptsearchbutton.value = 'Get Map data from server';
			t.show();
			return;
		} else {
			//Map should be read
			t.mapread = true;			
			t.id.ptsearchtype.disabled = true;
			t.id.ptsearchx.disabled = true;
			t.id.ptsearchy.disabled = true;
			for(i=0; i<Cities.numCities; i++) {
				var ptc = 'ptcity'+i;
				t.id[ptc].disabled = true;
			}
			t.id.ptsearchradius.disabled = true;
			t.id.ptsearchsector.disabled = true;
			t.id.ptsearchblockmax.disabled = true;
			t.id.ptsearchbutton.value = 'Data being requested ... (click to stop)';
			//Logbook Empty
			Logs.searchlog = [];
			saveLogs();
			//Delete Map Data, Counter reset
			t.map.data = {};
			t.map.userInfo = {};
			t.map.allianceNames = {};
			t.map.allianceMights = {};
			t.counter.terror = 0;
			t.counter.wasteland = 0;
			t.counter.grassland = 0;
			t.counter.riverlake = 0;
			t.counter.oil = 0;
			t.counter.hills = 0;
			t.counter.mountain = 0;
			t.counter.plain = 0;
			t.counter.sr = 0;
			t.counter.city = 0;
			t.counter.user = 0;
			t.counter.alliance = 0;
			t.counter.fields = 0;
			t.counter.timer = 0;			
			t.shortstat();
		}		
		
		//Build Table for Map Query
		if (Options.pbsearchtype == "u") {
			var x = parseInt(Options.pbsearchx)-1;
			var y = parseInt(Options.pbsearchy)-1;
			var r = parseInt(Options.pbsearchradius);
			var xstart = parseInt((x - r)/5)*5;
			var xend = parseInt((x + r)/5)*5;
			if (xstart < 0) xstart = 0;
			if (xend > 795) xend = 795;
			var ystart = parseInt((y - r)/5)*5;
			var yend = parseInt((y + r)/5)*5;
			if (ystart < 0) ystart = 0;
			if (yend > 795) yend = 795;	
			t.buildblocks(xstart, ystart, xend, yend);
		}

		if (Options.pbsearchtype == "s") {
			var xstart = t.sectorcoords[Options.pbsearchsector].x;
			var ystart = t.sectorcoords[Options.pbsearchsector].y;
			var xend = xstart + 195;
			var yend = ystart + 195;
			t.buildblocks(xstart, ystart, xend, yend);
		}
		
		if (Options.pbsearchtype == "g") {		

			var xstart = 0;
			var ystart = 0;
			var xend = 795;
			var yend = 795;
			t.buildblocks(xstart, ystart, xend, yend);			
		}

		//Retrieve Data
		t.blockpointer = 0;
		t.blockread = true; //Block can be Read
		t.readmap();
	},

	readmap : function () {
    var t = Tabs.Search;	
		clearTimeout (t.blockreadtimer);
		if (t.mapread && t.blockread && t.blockpointer < t.blocklist.length) {
			
			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			params.blocks = t.blocklist[t.blockpointer];
			t.blockread = false;
			Logbook.entry(Logs.searchlog,'Map section '+(t.blockpointer+1)+' / '+t.blocklist.length+' is queried from the server.');		
			t.Logbook();			
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + "fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					t.mapresult(rslt);
				},
				onFailure: function (rslt) {
					t.mapresult(rslt);
				}
			});
		}
		if (t.blockpointer >= t.blocklist.length) {
			Logbook.entry(Logs.searchlog,'Map data complete');		
			t.Logbook();			
			t.mapread = false;
			t.id.ptsearchtype.disabled = false;
			t.id.ptsearchbutton.value = 'Get Map data from server';

			//Storing the Data
			/*
			var Write = new Date();
			t.counter.timer = Write.toLocaleString();
			var serverID = getServerId();
			setTimeout (function (){
				GM_setValue ('Counter_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(t.counter));
			}, 0);
			setTimeout (function (){
				GM_setValue ('Map_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(t.map));
			}, 0);
			Logbook.entry(Logs.searchlog,'Map Data has been cached locally');				t.Logbook();
			*/
			t.show();
			return;
		}

		t.blockreadtimer = setTimeout (t.readmap, 250);
	},

	mapresult : function (rslt){
    var t = Tabs.Search;
		if (rslt.ok) {
			//Processing Data
			//rslt.data, rslt.userInfo, rslt.allianceNames, rslt.allianceMights
			/*
				t.map.data = {};
				t.map.userInfo = {};
				t.map.allianceNames = {};
				t.map.allianceMights = {};	
			*/

			//Data...
			for (var e in rslt.data) {
				var element = rslt.data[e];
				if (Options.pbsearchtype == 'u' && t.distance(parseInt(element.xCoord), parseInt(element.yCoord)) > parseInt(Options.pbsearchradius)) continue; 
				if (!t.map.data[e]) {
					t.map.data[e] = {};
					t.counter.fields++;
				}
				var d = t.map.data[e];
				d.x = element.xCoord;
				d.y = element.yCoord;	
				d.type = element.tileType;
				d.level = element.tileLevel;
				d.userid = element.tileUserId;
				d.allianceid = element.tileAllianceId;	
				d.sectorid = element.tileProvinceId;
				d.cityname = element.cityName;	
				//counter
				if (d.type == '51') {
					if (d.userid == '0') {
						t.counter.terror++;
					} else {
						t.counter.city++;
					}
				}
				if (d.type == '201' || d.type == '202' || d.type == '203' || d.type == '204') {
					t.counter.sr++;
				}	
				if (d.type == '0') {
					t.counter.wasteland++;
				}
				if (d.type == '10') {
					t.counter.grassland++;
				}
				if (d.type == '12') {
					t.counter.riverlake++;
				}
				if (d.type == '20') {
					t.counter.oil++;
				}
				if (d.type == '30') {
					t.counter.hills++;
				}
				if (d.type == '40') {
					t.counter.mountain++;
				}
				if (d.type == '50') {
					t.counter.plain++;
				}
			}
			//userInfo
			for (var e in rslt.userInfo) {
				var element = rslt.userInfo[e];
				if (!t.map.userInfo[e]) {
					t.map.userInfo[e] = {};
					t.counter.user++;
				}
				var u = t.map.userInfo[e];
				u.name = element.n;
				u.level = element.t;					
				u.might = element.m;		
				u.warstatus = element.w;					
				u.allianceId = element.a;
			}

			//allianceNames
			for (var e in rslt.allianceNames) {
				var element = rslt.allianceNames[e];
				if (!t.map.allianceNames[e]) {
					t.map.allianceNames[e] = element;
					t.counter.alliance++;
				}
			}

			//allianceMights
			for (var e in rslt.allianceMights) {
				var element = rslt.allianceMights[e];
				if (!t.map.allianceMights[e]) {
					t.map.allianceMights[e] = element;
				}
			}
			
			Logbook.entry(Logs.searchlog,'Map section '+(t.blockpointer+1)+' / '+t.blocklist.length+' was loaded successfully');		
			t.Logbook();			
			t.blockpointer++;
			t.shortstat();
		} else {
			Logbook.entry(Logs.searchlog,'Error Loading Map Section '+(t.blockpointer+1)+'/'+t.blocklist.length);		
			t.Logbook();			
		}
		t.blockread = true;		
	},

	shortstat: function() {
	  var t = Tabs.Search;	
		var s = [];
		s.push('<table width="100%"><tr><td colspan="10"><b>Search Statistics</b></td></tr>');
		s.push('<tr><td colspan="10">&nbsp;</td></tr>');
		s.push('<tr>');
		s.push('<td>Terrorists:&nbsp;&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.terror)+'</td>');
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Cities:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.city)+'</td>');		
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Grassland:&nbsp;&nbsp;&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.grassland)+'</td>');
		s.push('</tr>');
		s.push('<tr>');
		s.push('<td>River:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.riverlake)+'</td>');		
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Oil field:&nbsp;&nbsp;&nbsp;&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.oil)+'</td>');
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Hills:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.hills)+'</td>');		
		s.push('</tr>');
		s.push('<tr>');
		s.push('<td>Mountain:&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.mountain)+'</td>');
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Plains:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.plain)+'</td>');		
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Wasteland:&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.wasteland)+'</td>');
		s.push('</tr>');
		s.push('<tr>');
		s.push('<td>Titanium/Graphene:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.sr)+'</td>');		
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Generals:&nbsp;</td>');
		s.push('<td style="text-align:right;">'+addCommas(t.counter.user)+'</td>');
		s.push('<td width="20" style="border-right:1px dotted black;">&nbsp;</td>');
		s.push('<td width="20">&nbsp;</td>');
		s.push('<td>Alliances:&nbsp;</td>');	
		s.push('<td style="text-align:right;">'+addCommas(t.counter.alliance)+'</td>');		
		s.push('</tr>');
		s.push('<tr>');	
		s.push('<td colspan="10">&nbsp;</td>');			
		s.push('</tr>');
		s.push('<tr>');	
		s.push('<td colspan="10">There was '+addCommas(t.counter.fields)+' ('+parseInt(t.counter.fields/640000*1000)/10+'%) Fields on the Entire Map.</td>');			
		s.push('</tr>');
		if (t.counter.timer != 0) {
			s.push('<tr>');	
			s.push('<td colspan="10">&nbsp;</td>');			
			s.push('</tr>');			
			s.push('<tr>');	
			s.push('<td colspan="10">Inventory of Data: '+t.counter.timer+'</td>');			
			s.push('</tr>');
		}
		s.push('</table');
		t.id.ptsearchstat.innerHTML = s.join('');
	},
	
	buildblocks: function(xstart, ystart, xend, yend) {
	  var t = Tabs.Search;
		var b = []; //Blocks
		var counter = 1; //Counter for blocks per query
		t.blocklist = []; //Total block list empty
		for (var xcoord = xstart; xcoord <= xend; xcoord +=5) {
			for (var ycoord = ystart; ycoord <= yend; ycoord +=5) {
				b.push('bl_'+xcoord+'_bt_'+ycoord);
				counter++;
				if (counter > Options.pbsearchblockmax) {
					t.blocklist.push(b.join(','));
					b = [];
					counter = 1;
				}
			}
		}
		if (b.length > 0) {
			t.blocklist.push(b.join(','));			
		}		
	},
	
	Logbook: function() {
    var t = Tabs.Search;
		var log = Logbook.output(Logs.searchlog);
		t.id.ptsearchlog.innerHTML = log;
	},
	
	distance: function(x,y) {	
		var xcenter = parseInt(Options.pbsearchx);
		var ycenter = parseInt(Options.pbsearchy);
		var xdist = xcenter - x;
		var ydist = ycenter - y;
		var dist = parseInt(Math.sqrt(xdist * xdist + ydist * ydist)*100)/100;
		return dist;
	},
	
	city: function () {
    var t = Tabs.Search;			
		var cid = parseInt(this.value)-1;
		var x = Cities.cities[cid].x;
		var y = Cities.cities[cid].y;	
		Options.pbsearchx = x;
		Options.pbsearchy = y;
		t.id.ptsearchcityhint.innerHTML = Cities.cities[cid].name;
		saveOptions();
		t.show();
	},
	
	togOpt : function (checkboxId, optionName){
    var t = Tabs.Search;
    var checkbox = checkboxId;
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
    }
  },
  
  changeOpt : function (valueId, optionName){
    var t = Tabs.Search;
    var e = valueId;
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
			t.show();			
    }
  },
}

/**************************** Build Tab ******************************/
Tabs.build = {
  tabOrder: 10,
  tabLabel: 'Build',
  myDiv: null,
  timer: null,
  buildTab: null,
  koc_buildslot: null,
  koc_buildmenu: null,
  currentBuildMode: null,
  buildStates: [],
  loaded_bQ: [],
  lbQ: [],
  tabDisabled : !ENABLE_BUILD,
	errorcounter : 0,

	init: function(div){
		var t = Tabs.build;
		t.myDiv = div;
		t.koc_buildslot = unsafeWindow.Building.buildSlot; //save original koc function
		t.koc_buildmenu = unsafeWindow.Building.buildMenu; //save original koc function
		t.currentBuildMode = "build";
		t.buildStates = {
			running: false,
			help: false,
		};
		t.readBuildStates();
	
		for (var i = 0; i < Cities.cities.length; i++) {
			t["bQ_" + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + unsafeWindow.g_ajaxsuffix.substr(3)+"_"+ Cities.cities[i].id, '[]'));
			if (typeof t["bQ_" + Cities.cities[i].id] == 'undefined' || (t["bQ_" + Cities.cities[i].id]) == "") {
				t["bQ_" + Cities.cities[i].id] = [];
			}
		}
	
		var m = '<DIV id=pbBuildDivF class=ptStat>Build Function</div><TABLE id=pbbuildfunctions width=100% height=0% class=ptTab><TR>';
		if (t.buildStates.running == false) {
			m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = Off"></td>';
		} else {
			m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = On"></td>';
		}
		m += '<TD><INPUT id=pbBuildMode type=submit value="Build Mode = Off"></td>';
		m += '<TD>Mode: <SELECT id="pbBuildType">\
					<OPTION value="build">Level +1</option>\
					<OPTION value="max">Level to 9</option>\
					<OPTION value="destruct">Demolish</option>\
					</select></td>';
		m += '<TD><INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>With Help?</td>';
		m += '</tr></table></div>';
		
		m += '<div id="pbBuildDivQ" class="ptStat">Building Queue</div><table id="pbbuildqueues" width="100%" class="ptentry"><tr>';
		m += '<td>&nbsp</td>';
		for (var i = 0; i < Cities.cities.length; i++) {
			m += '<td style="text-align:center;"><b>' + Cities.cities[i].name + '</b></td>';
		}
		m += '</tr><tr>';
		m += '<td>&nbsp</td>';		
		for (var i = 0; i < Cities.cities.length; i++) {
			m += '<TD style="text-align:center;"><input id="pbbuild_' + Cities.cities[i].id + '" type="submit" value="Show"></td>';
		}
		m += '</tr><tr>';
		m += '<td>&nbsp</td>';		
		for (var i = 0; i < Cities.cities.length; i++) {
			m += '<td>&nbsp;</td>';
		}
		m += '</tr><tr>';
		m += '<td><b>Amount:</b>&nbsp;</td>';			
		for (var i = 0; i < Cities.cities.length; i++) {
			m += '<td style="text-align:center;" id="pbbuildcount_' + Cities.cities[i].id + '">' + t["bQ_" + Cities.cities[i].id].length + '</td>';
		}
		m += '</tr><tr>';
		m += '<td><b>Build Time:</b>&nbsp;</td>';			
		for (var i = 0; i < Cities.cities.length; i++) {
			t['totalTime_' + Cities.cities[i].id] = 0;
			cbQ = t["bQ_" + Cities.cities[i].id];
			if (typeof cbQ != 'undefined') {
				for (var j = 0; j < cbQ.length; j++) {
					t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].id]) + parseInt(cbQ[j].buildingTime);
				}
				timestring = timestr(t['totalTime_' + Cities.cities[i].id]);
			}
			m += '<td style="text-align:center;" id="pbbuildtotal_' + Cities.cities[i].id + '">' + timestring + '</td>';
		}
		m += '</tr>';
		m += '<tr>';
		m += '<td>&nbsp;</td>';			
		for (var i = 0; i < Cities.cities.length; i++) {
			m += '<td>&nbsp;</td>';
		}
		m += '</tr>';			
		var now = unixTime();
		m += '<tr>';
		m += '<td><b>Current Build:</b>&nbsp;</td>';			
		for (var i = 0; i < Cities.cities.length; i++) {
		  var totTime = 0;
      var q = Seed.queue_con['city'+ Cities.cities[i].id][0]; 
      if (q!=null) {
        totTime = parseInt(q[4]) - now;
				if (totTime < 0) totTime = 0;
				var contime = timestr(totTime);
      } else {
				var contime = timestr(0);
			}
			m += '<td style="text-align:center;" id="pbbuildcurrent_' + Cities.cities[i].id + '">' + contime + '</td>';
		}
		m += '</tr>';		
		m += '</table><span class="boldRed" id="pbbuildError"></span>';
		m += '<hr><table width="100%">\
					<tr><td><b>Build Log:</b><br><br></td>\
					<td style="text-align: right;"><input id="ptButClearBLog" type="submit" name="ClearBLog" value="Clear Build Log"></td></tr>\
					<tr><td colspan="2"><div id="pbbuildlog" style="height: 250px; overflow: auto;"></div></td></tr></table>';

		t.myDiv.innerHTML = m;
    t.Logbook();  
		
		for (var i = 0; i < Cities.cities.length; i++) {
			var cityId = Cities.cities[i].id;
			var btnName = 'pbbuild_' + cityId;
			addQueueEventListener(cityId, btnName);
			t.showBuildQueue(cityId, false);
		}

		t.e_autoBuild(); //start checking if we can build someting
		document.getElementById('ptButClearBLog').addEventListener('click', function(){
			Logs.buildlog = [];
			saveLogs();
			t.Logbook(); 		
		}, false);
		
		document.getElementById('pbBuildType').addEventListener('change', function(){
			t.setBuildMode(this.value);
		}, false);
		document.getElementById('pbBuildRunning').addEventListener('click', function(){
			t.toggleStateRunning(this);
		}, false);
		document.getElementById('pbBuildMode').addEventListener('click', function(){
			t.toggleStateMode(this);
		}, false);

		document.getElementById('pbHelpRequest').addEventListener ('change', function (){
			t.buildStates.help = (document.getElementById('pbHelpRequest').checked);
			t.saveBuildStates();
		}, false);
    
		setInterval(t.actualBuildTime, 10000);
    
		function addQueueEventListener(cityId, name){
			document.getElementById(name).addEventListener('click', function(){
				t.showBuildQueue(cityId, true);
			}, false);
		}
	},
	
	actualBuildTime: function () {
		for (var i = 0; i < Cities.cities.length; i++) {
		  var totTime = 0;
      var q = Seed.queue_con['city'+ Cities.cities[i].id][0]; 
      if (q!=null) {
        totTime = parseInt(q[4]) - now;
				if (totTime < 0) totTime = 0;
				var contime = timestr(totTime);
      } else {
				var contime = timestr(0);
			}
			document.getElementById('pbbuildcurrent_' + Cities.cities[i].id).innerHTML = contime;
		}
	},
	
	setBuildMode: function (type) {
		var t = Tabs.build;
		t.currentBuildMode = type;
	},
	
	e_autoBuild: function(){
		var t = Tabs.build;
		document.getElementById('pbbuildError').innerHTML = '';
		if (t.buildStates.running == true) {
			var now = unixTime();
			for (var i = 0; i < Cities.cities.length; i++) {
				var cityId = Cities.cities[i].id;
				var isBusy = false;
				var qcon = Seed.queue_con["city" + cityId];
				if (matTypeof(qcon)=='array' && qcon.length>0) {
					if (parseInt(qcon[0][4]) > now)
						isBusy = true;
					else
						qcon.shift(); //remove expired build from queue
				}              
				if (isBusy) {
				//TODO add info of remaining build time and queue info
				} else {
					if (t["bQ_" + cityId].length > 0) { //something to do?
						var bQi = t["bQ_" + cityId][0]; //take first queue item to build
						t.doOne(bQi);;
					}
				}       	
			}
		}
		setTimeout(t.e_autoBuild, 10000); //should be at least 10
	}, 
	
	doOne : function (bQi) {
		var t = Tabs.build;
		var currentcityid = parseInt(bQi.cityId);
		var cityName = t.getCityNameById(currentcityid);
		var time = parseInt(bQi.buildingTime);
		var mult = parseInt(bQi.buildingMult);
		var attempt = parseInt(bQi.buildingAttempt);
		var mode = bQi.buildingMode;
		var citpos = parseInt(bQi.buildingPos);

		if (Seed.buildings['city' + currentcityid]["pos" + citpos] != undefined && 
				Seed.buildings['city' + currentcityid]["pos" + citpos][0] != undefined) {	
			var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
			var bdgid = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][0]);
			var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
			var curlvl = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][1]);
			var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
			var bid = parseInt(Seed.buildings["city" + currentcityid]["pos" + citpos][3]);
			if (curlvl > 8 && mode == 'build') {
				t.cancelQueueElement(0, currentcityid, time, false);
				//Level 9 or higher
				return;
			};
			if (isNaN(curlvl)) {
				t.cancelQueueElement(0, currentcityid, time, false);
				//Not the correct Level
				return;
			}
			if (l_bdgid != bdgid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				//Building is false
				return;
			}
			if (l_bid != bid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				//ID is Wrong
				return;
			}
			if (l_curlvl < curlvl) {
				t.cancelQueueElement(0, currentcityid, time, false);
				//Level Higher
				return;
			}
			if (l_curlvl > curlvl && mode == 'build') {
				t.requeueQueueElement(bQi);
				return;
			}

			if (mode == 'destruct') {
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = currentcityid;
				params.bid = "";
				params.pos = citpos;
				params.lv = curlvl - 1;
				if (curlvl >= 1) {
					params.bid = bid;
				}
				params.type = bdgid;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "destruct.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function(rslt){
						if (rslt.ok) {
							Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
							if (params.cid == unsafeWindow.currentcityid)
								unsafeWindow.update_bdg();
							t.cancelQueueElement(0, currentcityid, time, false);
							msg = 'Demolition in <b>'+Cities.byID[currentcityid].name+'</b> started (<b>'+unsafeWindow.arStrings.buildingName['b'+bdgid]+'</b>)';
							Logbook.entry(Logs.buildlog,msg);
							t.Logbook();
							saveLogs();							
						} else {
							var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
							t.requeueQueueElement(bQi);
							msg = 'Error trying to Demolish in <b>'+Cities.byID[currentcityid].name+'</b> (<b>'+unsafeWindow.arStrings.buildingName['b'+bdgid]+'</b>)<br><span class="boldRed">'+errmsg+'</span>';
							Logbook.entry(Logs.buildlog,msg);
							t.Logbook();
							saveLogs();	
							//Reload after 5 Failed attempts
							t.errorcounter++;
							if (!Tabs.Farm.started && t.errorcounter >= 5) {
								msg = '<span class="boldRed">More than 5 Errors occurred While trying to build. GW reloaded</span>';
								Logbook.entry(Logs.buildlog,msg);
								t.Logbook();
								saveLogs();	
								reloadGW();									
							}							
						}
					},
					onFailure: function(){
						document.getElementById('pbbuildError').innerHTML = "Connection error while building or demolishing! Try again later.";
					}
				})
			}
			
			if (mode == 'build') {
				var invalid = false;
				var chk = unsafeWindow.checkreq("b", bdgid, curlvl); //check if all requirements are met
				for (var c = 0; c < chk[3].length; c++) {
					if (chk[3][c] == 0) {
						invalid = true;
					}
				}
				if (invalid == false) {							
					var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
					params.cid = currentcityid;
					//params.bid = "";
					params.pos = citpos;
					params.lv = curlvl + 1;
					if (params.lv > 9){ //make sure that no level 10+ is built
						t.cancelQueueElement(0, currentcityid, time, false);
						//logit("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!");
						return;
					}
					if (params.lv > 1) {
						params.bid = bid;
					}
					params.type = bdgid;
					
					new MyAjaxRequest(unsafeWindow.g_ajaxpath + "construct.php" + unsafeWindow.g_ajaxsuffix, {
						method: "post",
						parameters: params,
						onSuccess: function(rslt){
							if (rslt.ok) {
								Seed.resources["city" + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][1]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][2]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][3]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][4]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec5[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][5]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec6[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][6]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec7[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][7]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec8[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][8]) * mult * 3600;
								Seed.queue_con["city" + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(),  unsafeWindow.unixtime() + time, 0, time, citpos]);						
								if (params.cid == unsafeWindow.currentcityid)
									unsafeWindow.update_bdg();
								t.cancelQueueElement(0, currentcityid, time, false);
								msg = 'Construction in <b>'+Cities.byID[currentcityid].name+'</b> started (<b>'+unsafeWindow.arStrings.buildingName['b'+bdgid]+'</b> Level <b>'+params.lv+'</b>)';
								Logbook.entry(Logs.buildlog,msg);
								t.Logbook();
								saveLogs();
								if (document.getElementById('pbHelpRequest').checked == true) {
									try {
										t.bot_gethelp(params.bid, currentcityid);
									} catch (e) {
										msg = '<span class="boldRed">The help request post on your Facebook page does not exist. Either Facebook or Kabam are to blame.</span>';
										Logbook.entry(Logs.buildlog,msg);
										Logbook.entry(Logs.buildlog,e.name +' : '+ e.message +' : Line:'+e.lineNumber);
										t.Logbook();
										saveLogs();
									}
								}								
							} else {
								var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
								t.requeueQueueElement(bQi);
								msg = 'Failed to Build in <b>'+Cities.byID[currentcityid].name+'</b> (<b>'+unsafeWindow.arStrings.buildingName['b'+bdgid]+'</b> Level <b>'+params.lv+'</b>)<br><span class="boldRed">'+errmsg+'</span>';
								Logbook.entry(Logs.buildlog,msg);
								t.Logbook();
								saveLogs();
								//Reload after 5 Failures
								t.errorcounter++;	
								if (!Tabs.Farm.started && t.errorcounter >= 5) {
									msg = '<span class="boldRed">More than 5 Errors have occurred trying to build. GW is reloading.</span>';
									Logbook.entry(Logs.buildlog,msg);
									t.Logbook();
									saveLogs();	
									reloadGW();									
								}
								
							}
						},
						onFailure: function(){
							document.getElementById('pbbuildError').innerHTML = "Failed to build. Try again later.";
						}
					});
				} else {
					t.requeueQueueElement(bQi); //requeue item if check is invalid
				}
			}
		} else {
			t.cancelQueueElement(0, currentcityid, time, false);
			//logit("Queue item deleted: Building does not exist!!!");
		}
	},

	Logbook: function() {
    var t = Tabs.build;
		var log = Logbook.output(Logs.buildlog);
		document.getElementById('pbbuildlog').innerHTML = log;
	},
	
	requeueQueueElement: function (bQi) {
		var t = Tabs.build;
		var cityId = bQi.cityId;
		var buildingPos = parseInt(bQi.buildingPos);
		var buildingId = parseInt(bQi.buildingId);
		var buildingLevel = parseInt(bQi.buildingLevel);
		var buildingType = parseInt(bQi.buildingType);
		var buildingTime = parseInt(bQi.buildingTime);
		var buildingMult = parseInt(bQi.buildingMult);
		var buildingAttempts = parseInt(bQi.buildingAttempts);
		var buildingMode = bQi.buildingMode;
		
		t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts + 1, buildingMult, buildingMode); // requeue item
		t.cancelQueueElement(0, cityId, buildingTime, false); //delete Queue Item
	},
	
	show: function() {
		var t = Tabs.build;
	},
	
	bot_buildslot: function(c, a) {
		var t = Tabs.build;
		var cityId = t.getCurrentCityId();
		var buildingPos   = c;
		var buildingType  = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][0]);
		var buildingLevel = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
		var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
		var loaded_bQ = t["bQ_" + cityId];
		var buildingAttempts = 0;
		if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
			var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
		} else {
			var current_construction_pos = "";
		}

		if (loaded_bQ.length == 0 && current_construction_pos != "" ) { //check anyway if there is currently build in progress for this specific building
			if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
		} else {
			if (current_construction_pos != "" && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
			for (var i = 0; i < loaded_bQ.length; i++) { //check if there are already queue items for this building or the building is currently building
				var loadedCity = loaded_bQ[i].cityId;
				var loadedSlot = loaded_bQ[i].buildingPos;
				if (loadedSlot == buildingPos && loadedCity == cityId) {
					buildingLevel += 1;
				}
				if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { //check if destruction is already in queue
					t.modalmessage('Demolition is already in queue!');
					return;
				}
			}
		}	

		if (t.currentBuildMode == "build") {
			if (buildingLevel >= 9) {
				t.modalmessage('Level 10 and 11 can only be built manually.');
				return;
			}
			var buildingMode = "build";

			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);			
			var buildingMult = result[0];
			var buildingTime = result[1];
	
			var queueId = loaded_bQ.length;
	
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
		}

		if (t.currentBuildMode == "max") {
			var buildingMode = "build";
			for (var bL = buildingLevel; bL <9; bL++) {
				var queueId = loaded_bQ.length;
				var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
				var buildingMult = result[0];
				var buildingTime = result[1];
				queueId = queueId ;
				t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
				t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
			}
		}
		if (t.currentBuildMode == "destruct") {
			var buildingMode = "destruct";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
		}
	},
	
	calculateQueueValues: function (cityId, buildingLevel, buildingType, buildingMode) {
		var t = Tabs.build;
	
		var now = unixTime();
		if (buildingMode == 'build') {
			var buildingMult = Math.pow(2, buildingLevel);
		} 
		if (buildingMode == 'destruct') {
			var buildingMult = Math.pow(2, buildingLevel - 2);
		}
		var buildingTime = unsafeWindow.constructionData["b" + buildingType].c[10] * buildingMult;
    if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
			buildingTime = 5;
		}
		
		if (buildingMode == 'build') {
			buildingTime = parseInt(buildingTime / (1 + unsafeWindow.General.politicsBonus() + unsafeWindow.Research.bonusForType(unsafeWindow.Constant.Research.CRANES)));
		} 
	
		if (buildingMode == 'destruct') {
			buildingTime = buildingTime / (1 + unsafeWindow.General.politicsBonus() + unsafeWindow.Research.bonusForType(unsafeWindow.Constant.Research.CRANES));
			if (buildingTime % 1 > 0) {
				buildingTime = parseInt(buildingTime);
			}
		}
		var result = new Array(buildingMult, buildingTime);
		return result;
	},

	bot_gethelp: function (f, currentcityid) {
		if (!Seed.allianceDiplomacies.allianceId) return;
	  var a = qlist = Seed.queue_con["city" + currentcityid];
	  var e = 0;
	  var d = 0;
	  for (var c = 0; c < a.length; c++) {
			if (parseInt(a[c][2]) == parseInt(f)) {
				e = parseInt(a[c][0]);
				d = parseInt(a[c][1]);
				break;
			}
	  }
		b = [
			["REPLACE_LeVeLbUiLdInG", d],
			["REPLACE_BuIlDiNgNaMe", unsafeWindow.arStrings.buildingName['b'+ e]],
			["REPLACE_LeVeLiD", d],
			["REPLACE_AsSeTiD", f]
		];

		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.level = d;
		params.id = f;
		params.name = unsafeWindow.arStrings.buildingName['b'+ e];
		params.type = "building";
		params.cid = currentcityid;	
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "sendAllianceHelpBuildMessage.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					var a = rslt.newChat;
					unsafeWindow.Chat.addToChat(a[0], a[1].comment, !0);
				} else {
					var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
					Logbook.entry(Logs.buildlog,'Failed to request help<br><span class="boldRed">'+errmsg+'</span>');
					t.Logbook();
					saveLogs();									
				}
			},
			onFailure: function () {alert('Failed to request help');}
		});
		unsafeWindow.common_postToProfile("95", b, null, "95_helpbuild");
	},
	
	addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
		var t = Tabs.build;
		var lbQ = t["bQ_" + cityId];
		lbQ.push({
			cityId: 					cityId,
			buildingPos:			buildingPos,
			buildingType: 		buildingType,
			buildingId: 			buildingId,
			buildingTime: 		buildingTime,
			buildingLevel: 		buildingLevel,
			buildingAttempts: buildingAttempts,
			buildingMult: 		buildingMult,
			buildingMode: 		buildingMode,
		});
		t.modifyTotalTime(cityId, 'increase', buildingTime); //adjust total Time
	},
	
	modalmessage: function(message){
		var t = Tabs.build;
		unsafeWindow.Modal.showAlert(message);
	},
	
	modifyTotalTime: function (cityId, type, buildingTime) {
		var t = Tabs.build;
		var element = document.getElementById('pbbuildcount_' + cityId);
		var currentCount = parseInt(element.innerHTML);
		if (type == "increase") {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] + buildingTime;
			var currentCount = currentCount + 1;
		}
		if (type == "decrease") {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] - buildingTime;
			var currentCount = currentCount - 1;
		}
		element.innerHTML = currentCount;
		document.getElementById('pbbuildtotal_' + cityId).innerHTML = timestr(t['totalTime_' + cityId]);
	},
	
	hide: function(){
		var t = Tabs.build;
	},
	
	onUnload: function(){
		var t = Tabs.build;
		for (var i = 0; i < Cities.cities.length; i++) {
			GM_setValue('bQ_' + getServerId() + '_' + unsafeWindow.g_ajaxsuffix.substr(3)+"_"+ Cities.cities[i].id, JSON2.stringify((t["bQ_" + Cities.cities[i].id])));
		}
		t.saveBuildStates();
	},
	
	_addTab: function(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode) {
		var t = Tabs.build;
		var row = document.getElementById('pbCityQueueContent').insertRow(0);
		row.vAlign = 'top';
		row.insertCell(0).innerHTML = queueId;
		if (buildingMode == "destruct") {
			row.insertCell(1).innerHTML = 'Demolition';
		} else {
			row.insertCell(1).innerHTML = 'Build';
		}
		row.insertCell(2).innerHTML = unsafeWindow.arStrings.buildingName['b'+buildingType];
		row.insertCell(3).innerHTML = timestr(buildingTime);
		if (buildingMode == "destruct") {
			row.insertCell(4).innerHTML = 0;
		} else {
			row.insertCell(4).innerHTML = buildingLevel + 1; //=>target Level
		}
		row.insertCell(5).innerHTML = buildingAttempts;
		row.insertCell(6).innerHTML = '<input type=button id="queuecancel_' + queueId + '" value="Cancel">';
		document.getElementById('queuecancel_' + queueId).addEventListener('click', function(){
			t.cancelQueueElement(queueId, cityId, buildingTime, true);
		}, false);
	},
	
	cancelQueueElement: function(queueId, cityId, buildingTime, showQueue){
		var t = Tabs.build;
		var queueId = parseInt(queueId);
		t["bQ_" + cityId].splice(queueId, 1);
		t.modifyTotalTime(cityId, 'decrease', buildingTime); //adjust total Time
		if (showQueue == true) {
			t.showBuildQueue(cityId, false);
		}
	},
	
	showBuildQueue: function(cityId, focus){
		var t = Tabs.build;
		clearTimeout (t.timer);
		var popBuildQueue = null;
		var cityName = t.getCityNameById(cityId);
		if (t.popBuildQueue == null) {
			t.popBuildQueue = new CPopup('pbbuild_' + cityId, 0, 0, 450, 500, true, function() {clearTimeout (t.timer);});
		}
		var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE width="100%" id="pbCityQueueContent">';       
		t.popBuildQueue.getMainDiv().innerHTML = m+ '</table></div>';
		t.popBuildQueue.getTopDiv().innerHTML = '<TD width="200px">&nbsp;<B>Build Queue of ' + cityName + '</b></td><TD>&nbsp;<INPUT id=pbOptimizeByTime type=submit value="Optimize by Time"></td>';
		t.paintBuildQueue(cityId);
		if (focus)
			t.popBuildQueue.show(true);
		document.getElementById('pbOptimizeByTime').addEventListener('click', function(){t.clearBuildQueue();t.paintBuildQueue(cityId, true);}, false);
		t.timer = setTimeout (function() {t.showBuildQueue(cityId, false)}, 5000);  
	},
	
	paintBuildQueue: function(cityId, optimize){
		var t = Tabs.build;
		var lbQ = t["bQ_" + cityId];
		if (optimize == true) {
		lbQ.sort(function(a,b){return a.buildingTime - b.buildingTime});

		}
		t["bQ_" + cityId] = lbQ;
		for (var i = 0; i < lbQ.length; i++) {
			var queueId = i;
			t._addTab(queueId, lbQ[i].cityId, lbQ[i].buildingType, lbQ[i].buildingTime, lbQ[i].buildingLevel, lbQ[i].buildingAttempts, lbQ[i].buildingMode);
		}
	},
	
	clearBuildQueue: function() {
		var t = Tabs.build;
		var table = document.getElementById('pbCityQueueContent');
		var rows = table.rows;
		while(rows.length)
			table.deleteRow(rows.length-1);
	},
	
	getCurrentCityId: function(){ //TODO maybe move as global function to the core application
		if (!unsafeWindow.currentcityid)
			return null;
		return unsafeWindow.currentcityid;
	},
	
	saveBuildStates: function(){
		var t = Tabs.build;
		var serverID = getServerId();
		GM_setValue('buildStates_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(t.buildStates));
	},
	
	readBuildStates: function(){
		var t = Tabs.build;
		var serverID = getServerId();
		s = GM_getValue('buildStates_' + serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
		if (s != null) {
			states = JSON2.parse(s);
		for (k in states)
			t.buildStates[k] = states[k];
		}
	},
		
	toggleStateRunning: function(obj){
		var t = Tabs.build;
		if (t.buildStates.running == true) {
			t.buildStates.running = false;
			t.saveBuildStates();
			obj.value = "Auto Build = Off";
		} else {
			t.buildStates.running = true;
			t.saveBuildStates();
			obj.value = "Auto Build = On";
		}
	},
	
	toggleStateMode: function(obj){
		var t = Tabs.build;
		if (obj.value == 'Build Mode = Off') {
			unsafeWindow.Building.buildSlot = t.bot_buildslot; // overwrite original gw function
			unsafeWindow.Building.buildMenu = t.bot_buildslot; // overwrite original gw function
			obj.value = "Build Mode = On";
		} else {
			unsafeWindow.Building.buildSlot = t.koc_buildslot; //restore original gw function
			unsafeWindow.Building.buildMenu = t.koc_buildmenu; //restore original gw function
			obj.value = "Build Mode = Off";
		}
	},
	
	getCityNameById: function (cityId) {
		return Cities.byID[cityId].name;  	
	},
}
/****************************  Player Tab ******************************/

Tabs.Player = {
  tabOrder : 8,
  tabLabel : 'Player',
  cont : null,
  TabDisabled : !ENABLE_PLAYER,
  dat : [],



fetchTEST : function (pageNum, notify){    
  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  params.pageNo = 1;
  params.numPerPage = 100;
  params.perPage = 100;
  params.results = 100;
  params.numResults = 100;
  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + unsafeWindow.g_ajaxsuffix, {
    method: "post",
    parameters: params,
    onSuccess: function (rslt) {
//actionLog ("ajax/allianceGetMembersInfo.php:\n"+ inspect (rslt, 5, 1));      
      notify (rslt);
    },
    onFailure: function (rslt) {
      notify ({errorMsg:'AJAX error'});
    },
  });
},
   init : function (div){
    var t = Tabs.Player;
    t.cont = div;
	var out = [];
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');	
		out.push('<b>City, Wild, and Terrorist Camps Search</b>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		out.push('<table class="ptTab" width="100%">');
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Search for:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');
		out.push(htmlSelector ({'u':'Search Radius','s':'Search Sector','g':'Entire Map'}, Options.pbsearchtype, 'id="ptsearchtype"'));
		out.push('&nbsp;<span id="ptsearchhint"></span>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Search Center:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push('<input id="ptsearchx" type="text" size="2" maxlength="3" style="text-align: center;">');		
		out.push(' / ');
		out.push('<input id="ptsearchy" type="text" size="2" maxlength="3" style="text-align: center;">');		
		out.push('&nbsp;Cities:');
		for(var i=0; i<Cities.numCities; i++) {
			out.push('&nbsp;<input id="ptcity'+i+'" type="submit" name="c'+i+'" value="'+(i+1)+'" title="'+Cities.cities[i].name+'" style="padding-left:2px;padding-right:2px;">');
		}
		out.push('&nbsp;&nbsp;<b><span id="ptsearchcityhint"></span></b></td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Search Radius:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push('<input id="ptsearchradius" type="text" size="2" maxlength="3" style="text-align: center;">&nbsp;(20 - 100)');		
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td>');
		out.push('<b>Vilayet:&nbsp;</b>');
		out.push('</td>');
		out.push('<td>');		
		out.push(htmlSelector (t.sectors, Options.pbsearchsector, 'id="ptsearchsector"'));		
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td colspan="2">');
		out.push('<br><input id="ptsearchbutton" type="submit" name="search" value="SEARCH"><br><br>');
		out.push('</td>');
		out.push('</tr>');			
		out.push('<tr>');		
		out.push('<td colspan="2">');
		out.push('<div id="ptsearchlog" style="height:70px; overflow:auto;"></div>');
		out.push('</td>');
		out.push('</tr>');			
		out.push('</table>');		
		out.push('<hr>');			
		out.push('<div id="ptsearchstat"></div>');				
		out.push('<hr>');	
		out.push('<div style="text-align:center;">');
		out.push('<input id="ptsearchterror" type="submit" name="terror" value="Terrorist Camp">&nbsp;&nbsp;&nbsp;');
		out.push('<input id="ptsearchwild" type="submit" name="wild" value="Wild">&nbsp;&nbsp;&nbsp;');
		out.push('<input id="ptsearchcity" type="submit" name="city" value="City">');
		// out.push('<input id="ptsearchuanda" type="submit" name="uanda" value="General & Alliance">');
		out.push('</div>');
    unsafeWindow.PTgetMembers = t.eventGetMembers;
    unsafeWindow.PTpd = t.clickedPlayerDetail;
    unsafeWindow.PTpl = t.clickedPlayerLocator;
    unsafeWindow.PTalClickPrev = t.eventListPrev;
    unsafeWindow.PTpl2 = t.clickedPlayerLeaderboard;
    unsafeWindow.PTalClickNext = t.eventListNext;
    unsafeWindow.PCplo = t.clickedPlayerGetLastLogin;
    Lastlogin=0;
    t.show();
  },
 

  hide : function (){
  },
  
  show : function (){
    var t = Tabs.Player;
    if (t.state == null){
      if (getMyAlliance()[0] == 0) {
        t.cont.innerHTML = '<BR><BR><CENTER>You must be a member of the Alliance in order to use this feature.</center>';
        t.state = 1;
        return;
      }
      var m = '<DIV class=ptentry><TABLE width=100% cellpadding=0>\
          <TR><TD class=xtab align=right></td><TD class=xtab>Player Name:&nbsp;</td>\
            <TD width=80% class=xtab><INPUT id=allPlayName size=20 type=text /> &nbsp; <INPUT id=playSubmit type=submit value="SEARCH" /></td>\
            <TD class="xtab ptErrText"><SPAN id=ptplayErr></span></td></tr>\
          <TR><TD class=xtab></td><TD class=xtab> Alliance: &nbsp;</td>\
            <TD class=xtab><INPUT id=allAllName type=text /> &nbsp; <INPUT id=allSubmit type=submit value="SEARCH" /></td>\
           <TD class="xtab ptErrText"><SPAN id=ptallErr></span></td></tr>\
           <TR><TD class=xtab></td><TD class=xtab> &nbsp;\</td>\
           <TD class=xtab><INPUT align=right id=idMyAllSubmit type=submit value="'+ getMyAlliance()[1] +'"/>\
           <TD class=xtab><span align=right <b>Distance Calculation: </b></span></td>\
           <TD class=xtab ><div><select id="idFindETASelect">\
	   <option value="0,250"> - Select - </ option> \
	   <option value="0,180"> Supply Truck </ option> \
	   <option value="0,200"> Infantry </ option> \
	   <option value="0,320"> Sniper </ option> \
	   <option value="0,300"> Anti-Tank Infantry</ option> \
	   <option value="0,275"> Special Forces </ option> \
	   <option value="0,250"> Mobile SAM </ option> \
	   <option value="1,1000"> Tank </ option> \
	   <option value="1,750"> Predator Drone </ option> \
	   <option value="1,150"> Supply Helicopter </ option> \
	   <option value="1,100"> Gunship </ option> \
	   <option value="1,120"> Fighter </ option> \
	   <option value="1,280"> Bomber </ option> \
	   <option value="1,85"> Cargo Transport </ option> \
	   <option value="1,90"> Hell Fire Tank </ option> \
	   <option value="1,80"> Stealth Bomber </ option> \
	   <option value="1,380"> Nuclear Warhead </ option> \
	   <option value="1,680"> Orbital Ion Cannon </ option> \
       </select></div>\
        </td></tr>\
         </table><span style="vertical-align:middle;" id=altInput></span></div><SPAN id=allListOut></span>';
      t.cont.innerHTML = m;
      document.getElementById('allSubmit').addEventListener ('click', t.eventSubmit, false);
      document.getElementById('playSubmit').addEventListener ('click', t.eventPlayerSubmit, false);
      document.getElementById('allAllName').addEventListener ('focus', function (){document.getElementById('ptallErr').innerHTML='';}, false);
      document.getElementById('allPlayName').addEventListener ('focus', function (){document.getElementById('ptplayErr').innerHTML='';}, false);
      document.getElementById('idMyAllSubmit').addEventListener ('click', t.showMyAlliance, false);
      document.getElementById('idFindETASelect').addEventListener ('click', t.handleEtaSelect, false);
     // document.getElementById('allGotoPage').disabled = true;
      document.getElementById('idFindETASelect').disabled = true;
      t.ModelCity=Cities.cities[0];
      t.curPage = 0;
      t.MaxPage = -1;
      t.state = 1;
    }
  },

  pName : '',
  eventPlayerSubmit : function (){
    var t = Tabs.Player;
    document.getElementById('ptplayErr').innerHTML='';
    var name = document.getElementById('allPlayName').value;
    t.pName = name;
    if (name.length < 3){
      document.getElementById('ptplayErr').innerHTML = 'Search should be at least 3 characters.';
      return;
    }
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching....</center>';
    t.fetchPlayerList (name, t.eventGotPlayerList);
  },
  
  eventGotPlayerList : function (rslt){
    var t = Tabs.Player;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    t.playerList = rslt.matchedUsers;
    var uList = [];
    for (k in rslt.matchedUsers)
      uList.push (rslt.matchedUsers[k].userId);     
    t.fetchPlayerStatus (uList, function(r){t.eventGotPlayerOnlineList(r)});    
  },    
    
  eventGotPlayerOnlineList : function (rslt){
    var t = Tabs.Player;
    if (!rslt.ok){
      document.getElementById('allListOut').innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<DIV class=ptstat>Showing Players: <B>"'+ t.pName +'"</b></div>\
      <DIV style="height:575px; max-height:575px; overflow-y:auto">\
      <TABLE width=100% align=center class=ptTab cellspacing=5>\
	  <TR style="font-weight:bold">\
	  <TD width=25%>Player Name</td><TD align=right width=15%>Power</td><TD width=15%> &nbsp; Online</td><TD width=15%>Facebook Profile&nbsp;</td><TD width=75%>Details</td></tr>';
    var row=0;
    var cl='';
    for (k in t.playerList){
      var u = t.playerList[k];
      if (++row % 2)
        cl = 'class=ptOddrow ';
      else
       cl = '';
          m += '<TR '+ cl +'valign=top>\
	      <TD><SPAN onclick="PTpl(this, '+ u.userId +')"><A style="color:#1D0AF2">'+ u.genderAndName +'</a></td><TD align=right>'+ addCommasInt(u.might) +'</td>\
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldRed><blink><b>ONLINE</b></blink></span>":"") +'</td>\
          <div style="width:100%;filter:Glow(color=#F20A15, strength=12)">\
		  <TD align=center><A style="color:#1D0AF2" target="_tab" href="http://www.facebook.com/profile.php?id='+ u.Fbuid +'">Facebook Profile</a></div></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A style="color:#1D0AF2">Details</a> &nbsp; <BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A style="color:#1D0AF2">Last Login</a></span></td></tr>';
    }
    m += '</table></div>';
    document.getElementById('allListOut').innerHTML = m;
  },
  clickedPlayerDetail : function (span, uid){
    var t = Tabs.Player;
    span.onclick = '';
    span.innerHTML = "Getting Player Details...";
    t.fetchPlayerInfo (uid, function (r) {t.gotPlayerDetail(r, span)});
  },
  clickedPlayerLocator : function (span, uid){
    var t = Tabs.Player;
    t.fetchPlayerInfo2 (uid, function (r) {t.gotPlayerInfo2(r, span)});
  },  
  clickedPlayerGetLastLogin : function (span, uid){
     var t = Tabs.Player;
     span.onclick = '';
     span.innerHTML = "Getting Last Login...";
     t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
   },
  gotPlayerInfo2 : function (rslt, span) {
  var t = Tabs.Player;
      if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Leaderboard:</b> Not found! (misted?)';
      return;
    }
    var myA = getMyAlliance ();
    t.dat = [];
    actionLog ("gotPlayerLeaderboard -1 "+JSON2.stringify(rslt));
    var p = rslt.data;
    for(var k in rslt.data.cities) { alert(k) }     
    for (var c=0; c<p.cities.length; c++){
         t.dat.push ([p.player.generalName, parseInt(p.player.power), 'xx', parseInt(p.numCities), parseInt(p.cities[c].tileLevel),
              'xx', 'xx', p.cities[c].cityName, 0, 1,0,p.userId]);
        }
		alert(p.cities[1].progress)
        t.setDistances (Cities.cities[0].x, Cities.cities[0].y);
        t.ModelCity=Cities.cities[0];
        t.setEta();
        t.fetchPlayerLastLogin (uid, function (r) {t.displayPlayer(p.allianceName,r)});
        t.fetchPlayerLastLogin();
        t.displayPlayer (p.allianceId);
  },
clickedPlayerLeaderboard : function (span, uid){
      var t = my.Player;
      span.onclick = '';
      span.innerHTML = "Getting Details...";
      t.fetchLeaderboard (uid, function (r) {t.gotPlayerLeaderboard(r, span)});
  },
  fetchLeaderboard : function (uid, notify) {
    unsafeWindow.AjaxCall.gPostRequest("getUserLeaderboard.php",{action:"view_player_detail", player_id:uid},
    function(rslt){
        notify (rslt);
   	},function(rslt){
   	        notify (rslt);
    	});
  },

   
 gotPlayerDetail : function (rslt, span){
    var t = Tabs.Player;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var u = rslt.userInfo[0];
    var a = 'None';
    if (u.allianceName)
      a = u.allianceName +' ('+ getDiplomacy(u.allianceId) + ')';
    var m = '<TABLE cellspacing=0 class=ptTab><TR><TD>Alliance: '+ a +' &nbsp; Cities: '
          + u.cities +' &nbsp; Population: '+ u.population +'</td></tr><TR><TD>Sectors: ';
    var pids = u.provinceIds.split (',');
    var p = [];
    for (var i=0; i<pids.length; i++)
      p.push(unsafeWindow.provincenames['p'+pids[i]]);
    span.innerHTML = m + p.join (', ') +'</td></tr></table>';
  },

  eventMyAllianceSubmit : function (){
    var t = Tabs.Player;
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching...</center>';
    t.fetchAllianceMemberList (getMyAlliance()[0], null, t.eventGotMemberList);
  },  
    
  aName : '',
  eventSubmit : function (){
    var t = Tabs.Player;
    document.getElementById('ptallErr').innerHTML='';
    t.aName = document.getElementById('allAllName').value;
    if (t.aName.length < 3){
      document.getElementById('ptallErr').innerHTML = 'Search should be at least 3 characters.';
      return;
    }
    var myA = getMyAlliance ();
    document.getElementById('altInput').innerHTML = '';
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER>Searching...</center>';
    if (myA[0]!=0 && myA[1].toLowerCase().indexOf(t.aName.toLowerCase())>=0 )
      t.fetchAllianceList (t.aName, myA[0], t.eventGotAllianceList);
    else
      t.fetchAllianceList (t.aName, null, t.eventGotAllianceList);
  },

  showMyAlliance : function (){
    var t = Tabs.Player;
    var myA = getMyAlliance ();
    document.getElementById('allListOut').innerHTML = '<BR><BR><CENTER> ...</center>';
    if (myA[0]!=0  ) {
       t.eventGetMembers(myA[0]);
    }
    else {
       document.getElementById('allListOut').innerHTML = 'To use this feature you must be a member of the Alliance ..!';
    }
  },
  fetchPlayerInfo2 : function (uid, notify) { 
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.tvuid = uid;
    params.uid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getSeed.php?u=" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
    	},
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
  fetchMapTiles : function (cid, notify) {
    var t = Tabs.Player;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	params.action = "show_all_players"
	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
	  alert(rslt)
		},
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
	  alert(rslt)
		},
    });
  },
  fetchAllianceList : function (allianceName, myAid, notify) {   // at least 3 chars :)
    var t = Tabs.Player;
    function combineResults (rsltA, rsltM, notify){
      if (!rsltA.ok){
        if (rsltA.msg.indexOf("Please join an alliance...!!")!=0 || !rsltM.ok){
          notify (rsltA);
          return;
        }
        rsltA.ok = true;
        rsltA.count = 0;
        rsltA.alliancesMatched = {};
      }
      if (rsltM.ok){
        rsltA.alliancesMatched['a'+rsltM.allianceInfo.allianceId] = {allianceId: rsltM.allianceInfo.allianceId, allianceName: rsltM.allianceInfo.allianceName,
              membersCount: rsltM.allianceInfo.members, relation: null, might: rsltM.allianceInfo.might, ranking: rsltM.allianceInfo.ranking};
        ++rsltA.count;
      }
      notify (rsltA);
    }
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.allianceName = allianceName;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "allianceGetSearchResults.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (myAid!=null && myAid>0)
          t.fetchMyAllianceInfo  (function (r){ combineResults (rslt, r, notify)});
        else
          notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchOtherAllianceInfo : function (pageNum, notify){    
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.pageNo = pageNum;
    params.cityId = unsafeWindow.currentcityid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "allianceGetOtherInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchMyAllianceInfo : function (notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "allianceGetInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchPlayerList : function (name, notify){  
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.searchName = name;
    params.subType = "ALLIANCE_INVITE";
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "searchPlayers.php" + unsafeWindow.g_ajaxsuffix, {
	 method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },

  fetchPlayerInfo : function (uid, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.uid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  fetchPlayerStatus : function (uidArray, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = uidArray.join(',');
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getOnline.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
   fetchPlayerGetLastLogin : function (span, uid){
        var t = my.Player;
        span.onclick = '';
        span.innerHTML = "Searching...";
        t.fetchPlayerLastLogin (uid, function (r) {t.gotPlayerLastLogin(r, span)});
  },
  fetchPlayerLastLogin : function (uid, notify){
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.pid = uid;
      new MyAjaxRequest(unsafeWindow.g_ajaxpath + "viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (rslt) {
          notify (rslt);
        },
        onFailure: function (rslt) {
          notify ({errorMsg:'AJAX error'});
        },
      });
    },
    
    gotPlayerLastLogin : function (rslt, span){
        var t = Tabs.Player;
        if (!rslt.ok){
          span.innerHTML = rslt.errorMsg;
          return;
        }
    
        var p = rslt.playerInfo;
        var lastLogin = rslt.playerInfo.lastLogin;
    
        if (lastLogin) {
          m = '<span style="color:black">Last Login: '+lastLogin+'</span>';
        } else {
           m = '<span style="color:red">Last available Login: '+lastLogin+'</span>';
        }
        span.innerHTML = m + '';
      },
	    displayPlayer : function (allName,rslt){
    var t = Tabs.Player;
    function alClickSort (e){
      var t = Tabs.Player;
      var newColNum = e.id.substr(8);
      document.getElementById('clickCol'+t.sortColNum).className = 'clickable';
      e.className='clickable clickableSel';
      if (newColNum == t.sortColNum)
        t.sortDir *= -1;
      else
        t.sortColNum = newColNum;
      t.reDisp();
    }
    unsafeWindow.PTalClickSort = alClickSort;
    var m = '<STYLE>.clickable{background-color:#ddd; border:2px outset; border-color:#555; padding-left:5px; padding-right:5px}\
            .clickableSel{background-color:#AFF;}\
            .xxtab{background-color:none; padding-left:5px; padding-right:5px;} </style>\
            <DIV class=ptstat ><TABLE id=tabAllMembers cellpadding=0  width=100%><TR font-weight:bold"><TD class=xtab>Alliance: '+ allName +'</td>\
            <TD class=xtab width=80% align=center>Last login: <SPAN id=lastlogin>'+  rslt.playerInfo.lastLogin+'</span></td><TD class=xtab align=right></td></tr></table></div>\
            <div style="max-height:470px; height:470px; overflow-y:auto;"><TABLE id=tabAllMembers align=center cellpadding=0 cellspacing=0><THEAD style="overflow-y:hidden;">\
            <TR style="font-weight:bold"><TD id=clickCol0 onclick="PTalClickSort(this)" class=clickable><A><DIV>Oyuncu</div></a></td>\
            <TD id=clickCol1 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Power</a></div></td>\
            <TD id=clickCol3 onclick="PTalClickSort(this)" class=clickable><A><DIV>Cities</a></div></td>\
            <TD id=clickCol2 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Order</a></div></td>\
            <TD id=clickCol9 onclick="PTalClickSort(this)" class=clickable align=center><A><DIV>Online</a></div></td>\
            <TD id=clickCol7 onclick="PTalClickSort(this)" class=clickable><A><DIV>City Name</a></div></td>\
            <TD id=clickCol4 onclick="PTalClickSort(this)" class=clickable><A><DIV>Level</a></div></td>\
            <TD id=clickCol5 onclick="PTalClickSort(this)" class=clickable><A><DIV>Coordinates</a></div></td>\
            <TD id=clickCol8 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance</a></div></td>\
            <TD id=clickCol10 onclick="PTalClickSort(this)" class=clickable><A><DIV>Distance Hsp.</a></div></td>\
		    <TD class=clickable><A><DIV>Last Login</a></div></td></tr></thead>\
            <TBODY id=allBody style="background-color:#ffffff;"></tbody></table></div>\
            <DIV  width:100%; style="top:670px; left:0px; position:absolute; background-color:#ffffff; border-top:1px solid; margin-top:8px; color:#700; font-weight:bold;">';
    document.getElementById('allListOut').innerHTML = m;  //style="top:670px; left:0px; position:absolute;
    document.getElementById('altInput').innerHTML = '<HR><TABLE width=100% cellpaddding=0><TR align=center>\
        <TD class=xtab>Distance Calculation: &nbsp; X: <INPUT size=2 type=text id=plyrX /> Y: <INPUT size=2 type=text id=plyrY /> &nbsp; OR, City Selection: <span id=dmcoords></span></td></tr></table>';
    document.getElementById('clickCol'+t.sortColNum).className = 'clickable clickableSel';
    t.reDisp();
 //   new CdispCityPicker ('plyrdcp', document.getElementById ('dmcoords'), true, t.eventCoords, 0).bindToXYboxes(document.getElementById('plyrX'), document.getElementById('plyrY'));
  //  document.getElementById('idFindETASelect').disabled = false;
  },
  
  reDisp : function (){
    var t = Tabs.Player;
    function sortFunc (a, b){
      var t = Tabs.Player;
      if (typeof(a[t.sortColNum]) == 'number'){
        if (t.sortDir > 0)
          return a[t.sortColNum] - b[t.sortColNum];
        else
          return b[t.sortColNum] - a[t.sortColNum];
      } else if (typeof(a[t.sortColNum]) == 'boolean'){
//TODO!!
return 0;        
      } else {
        if (t.sortDir > 0)
          return a[t.sortColNum].localeCompare(b[t.sortColNum]);
        else
          return b[t.sortColNum].localeCompare(a[t.sortColNum]);
      }
    }
    t.dat.sort (sortFunc);
    var m = '';
    for (var i=0; i<t.dat.length; i++){
     m += '<TR '+ cl +'valign=top>\
	      <TD><SPAN onclick="PTpl(this, '+ u.userId +')"><A style="color:#1D0AF2">'+ u.genderAndName +'</a></td><TD align=right>'+ addCommasInt(u.might) +'</td>\
          <TD>'+ (rslt.data[u.userId]?"&nbsp;<SPAN class=boldDarkRed><blink>ONLINE</blink></span>":"") +'</td>\
          <div style="width:100%;filter:Glow(color=#F20A15, strength=12)">\
		  <TD align=center><A style="color:#1D0AF2" target="_tab" href="http://www.facebook.com/profile.php?id='+ u.Fbuid +'">Facebook Profile</a></div></td>\
          <TD><SPAN onclick="PTpd(this, '+ u.userId +')"><A style="color:#1D0AF2">Details</a> &nbsp; <BR></span><SPAN onclick="PCplo(this, \''+ u.userId +'\')"><A style="color:#1D0AF2">Last Login</a></span></td></tr>';
    }
    var tbody = document.getElementById('allBody');
    tbody.style.maxHeight = '';
    tbody.innerHTML = m;


    if (parseInt(tbody.clientHeight) > 470){
      tbody.style.height = '470px';
      tbody.style.maxHeight = '470px';
    }
//new CtableToText('tabAllMembers').toText();
  },
};

/*********************************** Debug tab ***********************************/
Tabs.Debug = {
  tabOrder : 200,
  cont : null,
  tabDisabled : !ENABLE_DEBUG,

  init : function (div){
    var t = Tabs.Debug;
		t.cont = div;
		var m = '<input id="ptButDebug" type="submit" name="SEED" value="DEBUG"><hr>';
		m += '<div style="width:240px;height:650px;scroll:auto;"><pre>'+inspect (unsafeWindow.arStrings, 8, 1)+'</pre></div>';
		
		t.cont.innerHTML = m;
		document.getElementById('ptButDebug').addEventListener('click', function (){debugWin.doit()}, false);	
	},

  hide : function (){
  },

  show : function (){
  },

}
/***************************** Help Tab **************************************/
Tabs2.Help = {
  tabOrder : 300,
	tabLabel: 'Help',
  cont : null,
  tabDisabled : !ENABLE_HELP,

  init : function (div){
    var t = Tabs2.Help;
		t.cont = div;
		var m = '<table class="ptTab ptStat" width="100%">\
        <tr>\
					<td style="text-align:center;"><b>A little help for the tool</b></td>\
				</tr></table><br><div style="width:100%;height:700px;scroll:auto;line-height: 15px; font-size: 13px; font-family: arial;">';
		
		m+= '<b> First, a warning: </ b> The use of tools in the Global War against the rules of Kabam. If you overdo it or get out trumpeting great, or is even the stupid questions about support tools, it can happen that you lock the account. So a little thought and cook on low heat! I would not know that this tool ends up on the user side script - because that will eventually lead to countermeasures by Kabam . \
			<br> The base of the tool was originally called "Lazy GW Tools" and has been programmed by someone else. The turn was the basis for a tool Kingdoms of Camelot. Unfortunately, the Lazy tools do not work really well, so I finally struggled through to have to create this tool. \
			 </ b>: <br> <b style="color: maroon;"> explanations of each tab\
			<br> <b style="color: maroon;"> The Overview </ b> \
			Above you will find <br> the version of the tools, your power, your level, your Alliance and the server on which you play. \
			<br> Next, your cities are listed by name, coordinates, sector, and whether your troops to defend the city or whether they are hiding. If your troops will defend the signals to red. \
			<br> <br> your Commodityreserven follow with a total offset. \
			Then you find <br> your troops in every city and  units defending your defenses\
			<br> Among them are the production values ??of the 4 main raw materials. When the food you also get a hint about your usage and the length of time your food enough yet. If you consume more food than you produce, which is shown in red. For the 3rd City will be charged the food production in ways that the game does it. The tool here in the calculated value is closer to reality. The game comes on much too small value - not so surprised about this difference in the 3rd City. \
			<br> Next follow the wilderness and generals. If you have less wilderness and generals as possible, which is also indicated in red. Especially for the artifact search you should be careful not to have taken the maximum number of wilderness areas. \
			<br> includes four lines of time are listed. The construction is based on the construction of the building, the research time available for the duration of the research contracts, training times are based on the training of troops and the line of defense shows the construction time of Schutzwallverteidung. The times for the training troops and defense systems for the defense are summed. So if you have two courses in a city, the total time is shown. \
			<br> At the bottom you can still adjust the font size for the presentation of this table. \
			<br> <b style="color: maroon;"> The events: </ b> \
			<br> In every city you can trigger events at regular intervals while collecting gold, oil and food as well as build a tactical bomb. To make this by hand is tedious, so you can set here what events should trigger the tool for you. \
			<br> simply setting the hook and let it set. The rest happens by itself. \
			<br> <b style="color: maroon;"> The artifact search </ b> \
			Find <br> artifacts is difficult, especially if they are the artifacts of the city charters. Here you can automate it. \
			<br> place before you want to use this feature ensures that you have enough generals and also the maximum number of wilderness areas have taken. \
			<br> For maximum results you should also level up your assembly point and the Quartermaster General. \
			<br> For the benefit of automatic artifact search, you choose the city you want to attack from. Then you type in the Coordinates of the target, which will damage the tool. \
			<br> Eighth at the target coordinates to the fact that you are angry with anyone accidentally Constant attacks! \
			<br> The interval between the attacks you can leave at 6 seconds. In order to simulate a reasonably human behavior, the period is varied. So 6-9 seconds (+50%) .\
			<br> If you want to save some energy points of your generals, you can set in the reserve. If you are there, such as a einstellst 8, at the end are left eight generals who each have a power point. \
			<br> The check mark in the window is used to close the notes, if an artifact was found. These windows would otherwise stacked one above the other. Every 2.5 seconds, trying to close such a window. Therefore, the popping artifact discoveries on only briefly. If you want to close the window rather own, take out the check. \
			<br> Now you put your troops still one with which you want to attack the target. Make sure however that you have more than enough troops in the city. If your meeting point is at level 9 and you send 200 Fighter in the fight, would you need fighter 1800 plus loss reserves - or about 2,000. It is also working with fewer troops, but then the tool must often wait for the return of the troops, and so a total of more. \
			<br> If everything is set up you click on the "attacks ..." \
			<br> in attack log you can monitor the emitted marches. \
			<br> In game you can click on the city and watch the march-Tab your attacks as well. \
			If you have enough artifacts <br>have collected, "Redeem artifact sets" on the button you can combine the sets. Since the game when the cash is set very slowly, once every 30 seconds, a set is redeemed. If you have a lot of sets, bring some patience. You can count on about 120 sets per hour. But this is still better than click through the amount of hand in the R & D Center. \
			<br> <b style="color: maroon;"> Build (Build) functions </ b> \
			These functions are still <br> 1:1 from the Lazy and tools are also entirely in English. Eventually I will replace this with another building module completely - but that still takes a while (no priority) . \
			<br> To Build The principle is: You have to build level 1 and the tool can then level up. \
			<br> for each city is the tool you can fill a queue and the queue or edit. \
			<br> To fill the queue does your button "Build Mode" to ON. Then you click in turn on the building, which will level up the tool. You can also click on a building several times. It is then applied level by level in the queue. \
			<br> If you have clicked enough building. Turns your the build mode to OFF and is the "Auto Build" to ON. The tool is now handling the construction. \
			<br> The queue in each city you can by clicking the "Show" to edit, for example, to delete entries. \
			Unfortunately, this has <br> Build Tool more problems than I can enumerate. The queue is often associated, and they have to fill your empty hand and new. Sometimes the wrong buildings leveled or even demolished. \
			<br> That is why I want to replace the Build Tool some point by a self-development. \
			<br> <b style="color: maroon;"> Options </ b> \
			<br> In options can make you some basic tool settings. \
			<br> With the first check you can move or fix the tool window. You can drag the tool window on the title bar. \
			Next, you can <br> help you in the chat. So, in construction and research jobs. Whenever a member asks for buidl help Alliance, the tool automatically clicks for you. When using this tool the others, click the course for your help requests. \
			If you disrupt this <br> help requests in the chat, because you can read the chat no longer sheer help, you can make hide these help requests. Help is of course still automatically - you do not see more just. \
			<br> Among the buttons for the cities always appears a message box with useless information, this window covering a part of the game, which is annoying. In the "Event / Hide Note Window" you can remove this annoying window. \
			<br> The background music is quite nice, but in the long run also annoying. Unfortunately, the game turned the music from time to time by itself. With a tick in the options each time you start trying to turn off the juice of this music. \
			<br> Among the hooks you can find even a listing of special events in the game. This list is for informational purposes only. They should give you an indication how long the actions are run.';
		
		m += '<br><br></div>';
		
		t.cont.innerHTML = m;

	},

  hide : function (){
  },

  show : function (){
  },

}

/****************************  General Tab ******************************/

Tabs2.General = {
  tabOrder : 11,
  tabLabel : 'General',
  cont : null,
  displayTimer : null,
  tabDisabled : !ENABLE_GENERAL,
  General : function (){
  },
  init : function (div){
    this.cont = div;
  },
  hide : function (){
    clearTimeout (Tabs2.General.displayTimer);
  },
  show : function (){
    var rownum = 0;
    var t = Tabs2.General;
    clearTimeout (t.displayTimer);
    function _row (name, row, noTotal){
      if (rownum++ % 2)
        style = '';
      else
        style = ' style = "background: #4682B4"';
      var tot = 0;
      var m = [];
      m.push ('<TR style="background: #ACD1E9" align=right');
      m.push (style);
      m.push ('><TD');
      m.push (style);
      m.push ('><B>');
      m.push (name);
      m.push (' &nbsp; </td>');
      if (noTotal){
        m.push ('<TD');
        m.push (style);
        m.push ('> &nbsp;</td>');
      } else {
        for (i=0; i<row.length; i++)
          tot += row[i];
        m.push ('<TD style="background: #ACD1E9">');      
        m.push (addCommas(tot));
        m.push ('</td>');
      }
      for (i=0; i<row.length; i++){
        m.push ('<TD');
        m.push (style);
        m.push ('>');     
        m.push (addCommas(row[i]));
        m.push ('</td>');
      }
      m.push ('</tr>');
      return m.join('');
    }
    function parseNaN (n) {
      x = parseInt(n,10);
      if (isNaN(n)) 
        return 0;
      return x;
    }
//DebugTimer.start(); 
    try {
      dt = new Date ();
      dt.setTime (Seed.player.datejoinUnixTime * 1000);
      str = '<DIV class=ptstat style="margin-top:5px; margin-bottom:5px;">';
      str += "<DIV id=overMainDiv style='font-size:12px'><TABLE class=ptTabOverview cellpadding=0 cellspacing=0></td>";
      str += "<TD width=100><B>City:"
      for(i=0; i<Cities.numCities; i++) {
        str += "<TD width=81><span class='red'><b><u>"+ Cities.cities[i].name.substring(0,11) + "</u></span>" +'</b><BR><BR>' +"</td>";
      }
      str += "</tr><TD width=81><B>Gold:<BR>Tax Rate:<BR>Income:<BR>Salary:<BR><BR>Production(1%):<BR>Training(0.5%):<BR>Research(0.5%):<BR>Construction(0.5%):</B>";
      Gold=[];
      Tax=[];
      Revenue=[];
      for(i=0; i<Cities.numCities; i++) {
        cityID = 'city'+ Cities.cities[i].id;
        Gold[i] = addCommas(Seed.citystats[cityID].gold[0]);
        Tax[i] = Seed.citystats[cityID].gold[1];
        Revenue[i]  = parseInt(parseInt(Seed.citystats["city" + Cities.cities[i].id]["pop"][0]) * Tax[i] / 100 + "n");
      }      
      for(i=0; i<Cities.numCities; i++) {
        var officer = "";       
        officers = Seed.knights["city" + Cities.cities[i].id];
        if (officers) {
          var RESOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].resourcefulnessKnightId];
          var TRNOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].combatKnightId];
          var BLDOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].politicsKnightId];
          var RDOfficer = officers["knt" + Seed.leaders["city" + Cities.cities[i].id].intelligenceKnightId];
          if (RESOfficer)
            var RESOfficer = parseNaN(RESOfficer.knightLevel);
          else
            var RESOfficer = 0; 
          if (TRNOfficer)
            var TRNOfficer = parseNaN(TRNOfficer.knightLevel);
          else
            var TRNOfficer = 0; 
          if (RDOfficer)
            var RDOfficer = parseNaN(RDOfficer.knightLevel);
          else
            var RDOfficer = 0; 
          if (BLDOfficer)
            var BLDOfficer = parseNaN(BLDOfficer.knightLevel);
          else
            var BLDOfficer = 0; 
          var Wage = (RESOfficer+TRNOfficer+RDOfficer+BLDOfficer)*20;
        }
        str += "<TD width=81><B>" + Gold[i] + "<BR></B><B>"+ Tax[i] + "%<BR></B><B>"+ Revenue[i] + "<BR></B><B>"+ Wage + "<BR><BR></B><B>"+ RESOfficer + "%<BR></B><B>" + TRNOfficer/2 +'%<BR></B><B>'+ RDOfficer/2 +'%<BR></B><B>'+ BLDOfficer/2 +"%</B></td>";
      }
        str += '<TR><TD colspan=12><BR></td></tr>';  
			rows = [];
			rows[0] = [];
			var maxunit=20;
			for (r=1; r<maxunit; r++){
				rows[r] = [];
	 	    for(i=0; i<Cities.numCities; i++) {
				rows[r][i] = 0;
			}
	    }
      str += '<TR><TD colspan=12><BR></td></tr>';
	  Tabs2.General.cont.innerHTML = str;
    } catch (e){
      Tabs2.General.cont.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';
    }   
    t.displayTimer = setTimeout (t.show, 5000);
	  },
};
/*********************************** Info Tab ***********************************/
Tabs2.INFO = {
  tabOrder : 10,
  tabLabel :'Information',
  cont : null,
  tabDisabled : !ENABLE_INFO,

  init : function (div){
    var t = Tabs2.INFO;
	t.cont = div;
    t.ThisMany = 1;
    t.TrainTimeRef = Options.pbTrainTimeRef;
    t.show(t.cont);
  },
  show : function (div){
    var t = Tabs2.INFO;
    fortmight = {
        u52: "1",
        u53: "1",
        u54: "1",
        u55: "1",
		u56: "1",
        u57: "1",
    };
    rownum = 0;
    var m = '\
        <STYLE type="text/css">\
            table.t1  {margin-left:auto; margin-right:auto; border-spacing:0px; width:50%; padding:1px;}\
            table.t1 td {padding:1px 1px 1px 3px; text-align:right; white-space:nowrap;}\
            td.xHeader{background:#ffffff; text-align:center; font-weight:bold; border:none;}\
            .xtabH    {background:#ffffff; text-align:center; font-weight:bold; border:none;}\
            .xtabHL   {background:#ffffff; font-weight:bold; text-align:center; border-width:1px; border-style:none none none solid;}\
            .xtabby     {font-weight:bold;}\
            .xtabR    {border-width:1px; border-style: none none none solid; padding-left:5px; margin-left:10px;}\
            .xtabL    {border-width:1px; border-style: none none none solid; padding-left:5px; margin-left:10px;}\
            .xtabLine {padding:0px; border-spacing:0px; height:3px; background:black;}\
            \
            .oddrow   {background:#ffffff;}\
            .evenrow  {background:#e8e8e8;}\
            .oddrowB  {background:#ffffff;}\
            .evenrowB {background:#e8e8e8;}\
        </style>\
    ';
    //m='';
    // xHeader= Header for section columns     (bold, center, no border, background color)
    // xtabH  = Header for column              (bold, center, no border, background color)
    // xtabHL = Header for column, new section (bold, center, left border, background color)
    // xtab   = First Column (y-axis)          (bold, rightj, no border)
    // xtabR  = Subsequent "normal" columns    (no border)
    // xtabL  = Normal column, new section     (left border strong)
    var COSTCOLS=7;
    var STATCOLS=4;
    var EachVal = "Number of Troops";
    if(t.ThisMany>1) { EachVal=t.ThisMany; }
    m += '\
        <DIV style="overflow-y:auto; overflow-x:hidden">\
        <DIV class=ptStat>General Information</div>\
        <TABLE class=t1>\
        <TR>\
            <TD class=xHeader> </td>\
            <TD class=xHeader colspan=' + COSTCOLS + '>Unit Requrements <==> ' + EachVal + '</td>\
            <TD class=xHeader colspan=' + STATCOLS + '>Unit Statistics &nbsp&nbsp&nbsp</td>\
        </tr>\
        <TR>\
            <TD class=xHeader> </td>\
            <TD class=xtabHL>Food</td>\
            <TD class=xtabH>Oil</td>\
            <TD class=xtabH>Stone</td>\
            <TD class=xtabH>Steel</td>\
			<TD class=xtabH>Titanium</td>\
            <TD class=xtabH>Graphene</td>\
            <TD class=xtabH>Population</td>\
            <TD class=xtabH>Training Time</td>\
            <TD class=xtabHL>Life</td>\
            <TD class=xtabH>Attack</td>\
            <TD class=xtabH>Speed</td>\
            <TD class=xtabH>Load</td>\
            <TD class=xtabHL>Upkeep</td>\
        </tr>\
    ';
    m += '<TR class=xtabLine><TD colspan=' + (COSTCOLS+STATCOLS+2) + ' class=xtabLine></td></tr>';


    // 1=Ikmal Kamyonu
    // 2= ---
    // 3= ---
    // 4=TankSavar
    // 5=Piyade
    // 6=Keskin Nisanci
    // 7=MobilSAM
    // 8=Tank
    // 9=Ikmal Helikopteri
    // 10=Avci Uçagi
    // 11=Savas Helikopteri
    // 12=Bombardiman Uçagi
    // 13=Görünmez Bombardiman Uçagi
    // 14= ---
    // 15=Nükleer Silah
    // 16=Cehennem Atesi Tanki
    // 17=Insansiz Uçak
    // 18=Özel Kuvvetler
	// 19=Kargo Uçagi
	// 20=Orbital Iyon Topu
    // 21=Elit MobilSAM
	// 22=Elit TankSavar
	// 23= ---
	// 24=Elit Savas Helikopteri
    var WeaponList=[1,5,6,4,18,7,8,17,9,11,10,12,19,16,13,15,20];
    var WeaponPower=[1,4,3,4,6,6,16,24,0,16,16,24,0,160,240,20000,20000];
    var WeaponTime=[];
    for (var i=0; i<WeaponList.length; i++) {
        ui=WeaponList[i];
        cost  = unsafeWindow.unitcost['unt'+ui];
        stats = unsafeWindow.unitstats['unt'+ui];
        food  = unsafeWindow.unitupkeeps[ui];
        troopname = unsafeWindow.arStrings.unitName['u'+ui];
        if (++rownum % 2) { rsty = 'evenrow'; } else { rsty = 'oddrow'; }
        if (stats[3]>=1000)
            if (rownum % 2) { rsty = 'evenrowB'; } else { rsty = 'oddrowB'; }
        m += '<TR class="xtabR '+rsty+'">';
		m += '<TR class="xtabR +troops+">';
        m += '<TD class=xtabby>'+ troopname;
        m += '</td><TD class="xtabL">'+ addCommas(cost[2] * t.ThisMany);
        m += '</td><TD>'+ addCommas(cost[3] * t.ThisMany);
        m += '</td><TD>'+ addCommas(cost[4] * t.ThisMany);
        m += '</td><TD>'+ addCommas(cost[5] * t.ThisMany);
        m += '</td><TD>'+ addCommas((cost[6]) * t.ThisMany );
		m += '</td><TD>'+ addCommas((cost[7]) * t.ThisMany );
        m += '</td><TD>'+ addCommas(cost[10] * t.ThisMany);
        if (t.TrainTimeRef == 1) {
            m += '</td><TD>'+ addCommas( Math.floor(cost[11]/60*t.ThisMany) );
        } else {
            m += '</td><TD>'+ timestrShort( Math.floor(t.ThisMany*t.TrainTimeRef) );
        }
        m += '</td><TD class="xtabL">'+ addCommas(stats[0] * t.ThisMany);
        m += '</td><TD>'+ addCommas(stats[1] * t.ThisMany);
        m += '</td><TD>'+ addCommas(stats[3] * t.ThisMany);
        m += '</td><TD>'+ addCommas(stats[5] * t.ThisMany);
        //m += '</td><TD class=xtabL>'+ AbbrNum(WeaponPower[i] * t.ThisMany);
        m += '</td><TD class="xtabL">'+ addCommas(food * t.ThisMany);
        m += '</td>';
        m += '</tr>';

    }
	//  "Mines",150,760,50,0,0,0,8,
    //  fortstats=[0,1000,0,0,0,1]
    m += '<TR class=xtabLine><TD colspan=' + (COSTCOLS+STATCOLS+2) + ' class=xtabLine></td></tr>';
    for (k in unsafeWindow.fortcost){
        if (++rownum % 2) { rsty = 'evenrow'; } else { rsty = 'oddrow'; }
        cost  = unsafeWindow.fortcost[k];
        fi    = k.substring(3);
        stats = unsafeWindow.fortstats['unt'+fi];
        food  = 0;
        might = fortmight['u'+fi];
        name  = cost[0].replace ('Defensive','');
	//  name = name.replace ('Wall-Mounted','');
        m += '<TR class="xtabR '+rsty+'">';
        m += '<TD class=xtabby>'+ name;
        m += '</td><TD class=xtabL>'+ addCommas(cost[1] * t.ThisMany);
        m += '</td><TD>'+ addCommas(cost[2] * t.ThisMany);
        m += '</td><TD>'+ addCommas(cost[3] * t.ThisMany);
        m += '</td><TD>'+ addCommas(cost[4] * t.ThisMany);
        //if(parseInt(cost[4])>1000) cost[5]=40;
        m += '</td><TD>'+ addCommas(cost[5] * t.ThisMany);
        m += '</td><TD>'+ addCommas(cost[6] * t.ThisMany);
        m += '</td><TD>'+ addCommas(cost[7] * 0 * t.ThisMany);
        if (t.TrainTimeRef == 1) {
            m += '</td><TD>'+ AbbrNum( Math.floor(cost[12]/60*t.ThisMany) );
        } else {
            m += '</td><TD>'+ timestrShort( Math.floor(t.ThisMany*t.TrainTimeRef) );
        }
        m += '</td><TD class=xtabL>'+ addCommas(stats[0] * t.ThisMany);
        m += '</td><TD>'+ addCommas(stats[1] * t.ThisMany);
        m += '</td><TD>'+ addCommas(stats[2]);
        m += '</td><TD>'+ addCommas(stats[3] * t.ThisMany);
        m += '</td><TD class=xtabL>'+ addCommas(food * t.ThisMany);
        m += '</td></tr>';
    }
    m += '<TR class=xtabLine><TD colspan=' + (COSTCOLS+STATCOLS+2) + ' class=xtabLine></td></tr>';

    m += '<TR><TD colspan=100%>Troop Training Time (Set Manually) (Seconds): ';
//  m += '<INPUT id=pdTruckBuildTime type=text size=6 maxlength=10 value=' + t.TrainTimeRef + ' />';
    m += '<INPUT id=pdTruckBuildTime type=text size=6 maxlength=10 value=99 />';

    m += ' &nbsp; &nbsp; &nbsp; &nbsp; Number of Troops: ';
//  m += htmlSelector ({1:1, 10:10, 100:100, 1000:1000}, t.ThisMany, 'id=pdTroopCount');
    m += '<INPUT id=pdTroopCount type=text size=6 maxlength=10 value=' + t.ThisMany + ' />';
    m += '</td>';
    m += '<TR></table></div><BR>';
var WILDCOLS=10;
m += '<BR>\
    <DIV style="overflow-y:auto; overflow-x:hidden">\
    <DIV class=ptStat>Unit Information for Wilds/Camps</div>\
    <TABLE class=t1>\
    <TR class=xtabH>\
	<TD> </td>\
    <TD class=xtabby> Level-1 </td>\
    <TD class=xtabby> Level-2 </td>\
    <TD class=xtabby> Level-3 </td>\
    <TD class=xtabby> Level-4 </td>\
    <TD class=xtabby> Level-5 </td>\
    <TD class=xtabby> Level-6 </td>\
    <TD class=xtabby> Level-7 </td>\
    <TD class=xtabby> Level-8 </td>\
    <TD class=xtabby> Level-9 </td>\
    <TD class=xtabby> Level-10 </td>\
	</tr>\
';
m += '<TR class=xtabLine><TD colspan=' + (WILDCOLS+1) + ' class=xtabLine></td></tr>';
var WildData = {
    type : [ "Infantry","Sniper","Anti-Tank","Mobile SAM","Tank","Gunship","Fighter","Bomber" ],
    1 : [ 50 ],
    2 : [ 100 ],
    3 : [ 80, 40, 40 ],
    4 : [ 80, 40, 40, 35, 24 ],
    5 : [ 160, 80, 80, 70, 48 ],
    6 : [ 320, 160, 160, 140, 96 ],
    7 : [ 320, 160, 160, 140, 96, 110, 110, 60 ],
    8 : [ 640, 320, 320, 280, 192, 220, 220, 120 ],
    9 : [ 1280, 640, 340, 560, 384, 440, 440, 240 ],
    10: [ 3840, 1920, 1920, 1680, 1152, 1320, 1320, 720 ]
}
for (var i=0; i<WildData.type.length; i++) {
    if (i % 2) { rsty = 'evenrow'; } else { rsty = 'oddrow'; }
    if (i>4)
        if (i % 2) { rsty = 'evenrowB'; } else { rsty = 'oddrowB'; }
	m += '<TR class="' + rsty + '">';
    for (j in WildData) {
            var ThisData = WildData[j][i] || '-';
       		m += '<TD style="border-width:1px; border-style: none solid none none;" class="'
            if(j=="type") m += 'xtabby';
            m += '">' + addCommas(ThisData) + '</td>';
    }
   	m += '</tr>';
}
	m += '<TR class=xtabLine><TD colspan=' + (WILDCOLS+1) + ' class=xtabLine></td></tr>';
	m += '</table></div><BR>';
    m += '<DIV style="text-align:left;">';  
    m += '<span id="PeaceTimeDiv" style="text-align:right;"></span>';
    t.cont.innerHTML = m +'</div>';   
    t.MakePeaceTime();
    function ChangeNumber(){
        var t = Tabs2.INFO;
        t.ThisMany = document.getElementById('pdTroopCount').value;
        t.TrainTimeRef = document.getElementById('pdTruckBuildTime').value;
        t.show (t.cont);
    }
    t.changeOpt ('pdTruckBuildTime', 'pbTrainTimeRef');
    document.getElementById('pdTroopCount').addEventListener('change', ChangeNumber, false);
    document.getElementById('pdTruckBuildTime').addEventListener('change', ChangeNumber, false);
  },
    MakePeaceTime : function() {
        var t = Tabs2.INFO;
        var s = ' Peace Treaty Remaining Cooldown Time = ';
        var PeaceTime = parseInt(Seed.player.truceExpireUnixTime) - unixTime() + 43200;
        if (PeaceTime>0) {
            s += timestr(PeaceTime);
        } else {
            s += 'None';
        }
        document.getElementById("PeaceTimeDiv").innerHTML = s;
        t.timer = setTimeout(t.MakePeaceTime,60*1000);
    },
    hide : function (){
    },
    changeOpt : function (valueId, optionName, callOnChange) {
        var t = Tabs.Options;
        var e = document.getElementById(valueId);
        e.value = Options[optionName];
        e.addEventListener ('change', eventHandler, false);
        function eventHandler (){
            Options[optionName] = this.value;
            saveOptions();
            if (callOnChange)
                callOnChange (this.value);
       }
   },
}

/*********************************** Train Tab ***********************************/
Tabs.Train = {
  tabOrder : 11,
	tabLabel: 'Training',
  cont : null,
  displayTimer : null,
  tabDisabled : !ENABLE_TRAIN,
	id : {},
	uu: {
/*		'u1'  : '<img title="Trucks" height=20 src=http://i.imgur.com/NvWyS.png>',
		'u5'  : '<img title="Infantry" height=20 src=http://i.imgur.com/up5Sj.png>',
		'u6'  : '<img title="Snipers" height=20 src=http://i.imgur.com/PDY5r.png>',
		'u4'  : '<img title="Anti-Tank Infantry" height=20 src=http://i.imgur.com/Y5NKP.png>',
		'u22'  : '<img title="Anti-Tank Elite" height=20 src=http://i.imgur.com/Y5NKP.png>',
		'u18'  : '<img title="Special Forces" height=20 src=http://i.imgur.com/aAFTx.png>',
		'u7'  : '<img title="Mobile SAM" height=20 src=http://i.imgur.com/kP9JD.png>',
		'u21'  : '<img title="SAM Elite" height=20 src=http://i.imgur.com/Lnwv4.png>',
		'u8'  : '<img title="Tank" height=20 src=http://i.imgur.com/7yyVQ.png>',
		'u17'  : '<img title="Predator Drone" height=20 src=http://i.imgur.com/pqJia.png>',
		'u9'  : '<img title="Supply Helicopter" height=20 src=http://i.imgur.com/A7rpl.png>',
		'u11'  : '<img title="Gunship" height=20 src=http://i.imgur.com/HW1Qu.png>',
		'u24'  : '<img title="Gunship Elite" height=20 src=http://i.imgur.com/DqXfd.png>',
		'u10'  : '<img title="Fighter" height=20 src=http://i.imgur.com/PbosE.png>',
		'u12'  : '<img title="Bombers" height=20 src=http://i.imgur.com/uVrLe.png>',
		'u19'  : '<img title="Cargo transport" height=20 src=http://i.imgur.com/ISSxu.png>',
		'u16'  : '<img title="Hellfire-Tank" height=20 src=http://i.imgur.com/5LcC7.png>',
		'u13'  : '<img title="Stealth Bomber" height=20 src=http://i.imgur.com/ZNqBV.png>',
		'u15'  : '<img title="Tactical Nuke" height=20 src=http://i.imgur.com/waH56.png>',
		'u20'  : '<img title="Orbital Ion Cannon" height=20 src=http://i.imgur.com/VYByq.png>',
		'f53' : '<img title="Mines" height=20 src=http://i.imgur.com/W7A2R.png>',
		'f52' : '<img title="Stinger Missiles" height=20 src=http://i.imgur.com/E8GbT.png>',
	    'f54' : '<img title="Artillery" height=20 src=http://i.imgur.com/CtP3T.png>',
		'f55' : '<img title="Anti-Aircraft Guns" height=20 src=http://i.imgur.com/NdoMP.png>',
		'f56' : '<img title="Rail Guns" height=20 src=http://i.imgur.com/JGx7F.png>',
		'f57' : '<img title="Laser Turrets" height=20 src=http://i.imgur.com/1voUY.png>',
		},*/
		'u1'  : 'Supply Trucks',
		'u5'  : 'Infantry',	
		'u6'  : 'Sniper',		
		'u4'  : 'Anti-Tank Infantry',
		'u18' : 'Special Forces',
		'u7'  : 'Mobile SAM',
		'u8'  : 'Tank',
		'u17' : 'Predator-Drone',
		'u9'  : 'Supply-Heli',
		'u11' : 'Gunship',		
		'u10' : 'Fighter',
		'u12' : 'Bomber',
		'u19' : 'Cargo Transport',	
		'u16' : 'Hellfire-Tank',		
		'u13' : 'Stealth-Bomber',
		'u15' : 'Tactical Nuke',
		'u20' : 'Orb. IonCannon',
		'u21' : 'SAM Elite',
		'u24' : 'Gunship Elite',
		'u22' : 'Anti-tank Elite',
		'f53' : 'Mine',
		'f52' : 'Stinger-Missle',
		'f54' : 'Artillery',
		'f55' : 'Anti-Aircraft Guns',
		'f56' : 'Railguns',
		'f57' : 'Laser Turrets',
	},
	trData : unsafeWindow.trainingData,
	foData : unsafeWindow.fortifyingData,
	gr : {},
	trainqueue : [],

	init : function (div) {
    var t = Tabs.Train;
		t.cont = div;
		var out = [];
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');	
		out.push('<b>Automatic military training and automatic defense building</b>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		out.push('<b>Note:</b> GREEN = These can be built, RED = Requirements not met, BLUE = Maximum built.');		
		out.push('<br><br>');	
		out.push('<table class="ptTrain" style="border:1px solid silver; border-collapse:collapse;">');
		//Header
		out.push('<tr>');
		out.push('<td style="border-right:1px solid silver;border-left:1px solid silver;">&nbsp;</td>');
	  for (var i=0; i<Cities.cities.length; i++) {
			out.push('<td style="text-align:center;border-right:1px solid silver;">&nbsp;<br><b>' + Cities.cities[i].name + '</b></td>');
	 }
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td style="border-right:1px solid silver;border-left:1px solid silver;">&nbsp;</td>');
	  for (var i=0; i<Cities.cities.length; i++) {
			out.push('<td style="text-align:center;border-right:1px solid silver;">');
			if (!Options.pbtrain['c'+i]) Options.pbtrain['c'+i] = 0;
			if (Options.pbtrain['c'+i] == 0) {
				out.push('&nbsp;<input type="submit" id="pttc'+i+'" value=" Enable " >&nbsp;');
			} else {
				out.push('&nbsp;<input type="submit" id="pttc'+i+'" value=" Disable " >&nbsp;');
			}
			out.push('<br>&nbsp;</td>');
    }
		out.push('</tr>');
		
		//Troops
		for (var unit in t.uu) {
			var u = t.uu[unit];
			if (unit == 'f53') {
				out.push('<tr><td  style="border-right:1px solid silver;border-left:1px solid silver;" colspan="'+(Cities.cities.length+1)+'">&nbsp;</td></tr>');
			}
			out.push('<tr>');	
			out.push('<td style="border-right:1px solid silver;border-left:1px solid silver;"><b>'+u+':</b>&nbsp;&nbsp;</td>');
			for (var i=0; i<Cities.cities.length; i++) {
				out.push('<td style="text-align:center;border-right:1px solid silver;">');
				out.push('&nbsp;<input type="text" id="pttc'+(i)+(unit)+'" value="" style="width:50px; text-align:center; padding:0;">&nbsp;');
				out.push('</td>');				
			}
			out.push('</tr>');			
		}
		out.push('</table>');	
		out.push('<hr>');
		//LogBook
		out.push('<table width="100%">');
		out.push('<tr>');
		out.push('<td><b>Training Log:</b><br><br></td>');
		out.push('<td style="text-align: right;">');
		out.push('<input id="ptButClearTRLog" type="submit" name="ClearTRLog" value="Clear Training Log">');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td colspan="2">');
		out.push('<div id="pttrainlog" style="height: 120px; overflow: auto;">');
		out.push('</div>');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');		
		t.cont.innerHTML = out.join('');
		//Seek IDs and Bind Events
		for (var i=0; i<Cities.cities.length; i++) {
			t.id['pttc'+i] = document.getElementById('pttc'+i);
			if (Options.pbtrain['c'+i] == 0){
				 document.getElementById('pttc'+i).style.backgroundColor="red";
			} else {
				document.getElementById('pttc'+i).style.backgroundColor="green";
			}
			t.id['pttc'+i].addEventListener('click', function(){
				var city = this.id.substr(-1);
				if (Options.pbtrain['c'+city] == 0) {
					Options.pbtrain['c'+city] = 1;
					this.value = " Disable ";
					Logbook.entry(Logs.trainlog, 'Automatic training was enabled in <b>'+Cities.cities[city].name+'</b>');
					t.id.pttrainlog.innerHTML = Logbook.output(Logs.trainlog);
					this.style.backgroundColor = "green";
				} else {
					Options.pbtrain['c'+city] = 0;
					this.value = " Enable ";	
					Logbook.entry(Logs.trainlog, 'Automatic Training in <b>'+Cities.cities[city].name+'</b> was disabled.');
					t.id.pttrainlog.innerHTML = Logbook.output(Logs.trainlog);
					this.style.backgroundColor = "red";
				}
				saveOptions();
			},false);
		}
		for (var unit in t.uu) {
			var u = t.uu[unit];		
			for (var i=0; i<Cities.cities.length; i++) {		
				t.id['pttc'+(i)+(unit)] = document.getElementById('pttc'+(i)+(unit));
				t.changeOpt(t.id['pttc'+(i)+(unit)], 'c'+(i)+(unit));
			}
		}
		t.id.pttrainlog = document.getElementById('pttrainlog');	
		t.id.pttrainlog.innerHTML = Logbook.output(Logs.trainlog);		
		t.id.ptButClearTRLog = document.getElementById('ptButClearTRLog');
		t.id.ptButClearTRLog.addEventListener('click', t.ClearTRLog, false);

		t.greenred();
		setInterval(t.training, 10000);
		setInterval(t.gotrain, 3000);
	},

  hide : function (){
  },

  show : function (){
	},

  changeOpt : function (valueId, optionName){
    var t = Tabs.Train;
    var e = valueId;
		if (!Options.pbtrain[optionName]) Options.pbtrain[optionName] = 0;
    e.value = parseInt(Options.pbtrain[optionName]);
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
			this.value = parseIntNan(this.value);
      Options.pbtrain[optionName] = this.value;
      saveOptions();			
    }
  },

	ClearTRLog : function () {
		var t = Tabs.Train;
		Logs.trainlog = [];
		t.id.pttrainlog.innerHTML = Logbook.output(Logs.trainlog);		
		saveLogs();
	},

	greenred : function() {
	  var t = Tabs.Train;
		//What forces are possible in each City
		//is to examine required building, research, player level, and number of cities
	  var plevel = parseInt(Seed.player.title);
		var countcities = Cities.cities.length;
		for (var i = 0; i < Cities.cities.length; i++) {
			var cid = Cities.cities[i].id;
			var building = {};
			for (var unit in t.uu) {
				var ok = true;	
				if (unit.substr(0,1) == "u") {
					//Troops
					//Building Level Requirement
					if (!building['b13']) {
						var aktLevel = getCityBuilding(cid, '13');
						building['b13'] = parseInt(aktLevel.maxLevel);
					}
					if (building['b13'] == 0) ok = false;
					//Building Check
					var bs = t.trData[unit].r[0].r1;
					for (var b in bs) {
						var reqLevel = parseInt(bs[b][1]);
						if (!building[b]) {
							var aktLevel = getCityBuilding(cid, b.substr(1));
							building[b] = parseInt(aktLevel.maxLevel);
						}
						if (reqLevel > building[b]) ok = false;
					}
					//Research Requirement
					var ts = t.trData[unit].r.r2;					
					for (var te in ts) {	
						var reqLevel = parseInt(ts[te][1]);
						if (reqLevel > parseInt(Seed.tech['tch'+te.substr(1)])) ok = false;
					}
					//Player's Level Requirement
					if (t.trData[unit].r[0].r11.p2) {
						var pl = t.trData[unit].r[0].r11.p2[1];
						if (pl > plevel) ok = false;
					}
					//Number of Cities Check
					if (t.trData[unit].r[0].r11.p3) {
						var st = t.trData[unit].r[0].r11.p3[1];	
						if (st > countcities) ok = false;
					}
					//Warhead Check
					if (t.trData[unit].r[0].r8.i1401) {
						var st = t.trData[unit].r[0].r8.i1401[1];	
						if (!Seed.items.i1401 || st > Seed.items.i1401) ok = false;
					}
					//Launch Vehicle Check
					if (t.trData[unit].r[0].r8.i1402) {
						var st = t.trData[unit].r[0].r8.i1402[1];	
						if (!Seed.items.i1402 || st > Seed.items.i1402) ok = false;
					}
					//Targeting Radar Check
					if (t.trData[unit].r[0].r8.i1403) {
						var st = t.trData[unit].r[0].r8.i1403[1];	
						if (!Seed.items.i1403 || st > Seed.items.i1403) ok = false;
					}
					//Launch Unit Check
					if (t.trData[unit].r[0].r8.i1404) {
						var st = t.trData[unit].r[0].r8.i1404[1];	
						if (!Seed.items.i1404 || st > Seed.items.i1404) ok = false;
					}							
					
				} else {
					//Defense Walls
					//Building Requirement
					var bs = t.foData[unit].r[0].r1;
					for (var b in bs) {
						var reqLevel = parseInt(bs[b][1]);
						if (!building[b]) {
							var aktLevel = getCityBuilding(cid, b.substr(1));
							building[b] = parseInt(aktLevel.maxLevel);
						}
						if (reqLevel > building[b]) ok = false;
					}
					//Research Requirement
					var ts = t.foData[unit].r[0].r2;					
					for (var te in ts) {	
						var reqLevel = parseInt(ts[te][1]);
						if (reqLevel > parseInt(Seed.tech['tch'+te.substr(1)])) ok = false;
					}
					//Player's Level Requirement
					if (t.foData[unit].r[0].r11.p2) {
						var pl = t.foData[unit].r[0].r11.p2[1];
						if (pl > plevel) ok = false;
					}
					//Number of Cities
					if (t.foData[unit].r[0].r11.p3) {
						var st = t.foData[unit].r[0].r11.p3[1];	
						if (st > countcities) ok = false;
					}					
				}
				//All Requirements Met?
				if (ok === true) {
					t.gr['c'+(i)+(unit)] = true; 
					t.id['pttc'+(i)+(unit)].style.backgroundColor = '#ccffcc';
					t.id['pttc'+(i)+(unit)].style.border = '1px solid silver';					
				} else {
					t.gr['c'+(i)+(unit)] = false;
					t.id['pttc'+(i)+(unit)].style.backgroundColor = '#ffcccc';	
					t.id['pttc'+(i)+(unit)].style.border = '1px solid silver';							
				}
			}
			//Maximum Number of Defenses Reached?
			var slevel = building['b19'];
			var maxwall = unsafeWindow.Constant.Building.DEFENSE.WALL[slevel];
			var maxfield = unsafeWindow.Constant.Building.DEFENSE.FIELD[slevel];
			var maxcity = unsafeWindow.Constant.Building.DEFENSE.CITY[slevel];
			var curwall = parseInt(Seed.fortifications['city'+cid].fort53) + parseInt(Seed.fortifications['city'+cid].fort52);
			var curfield = parseInt(Seed.fortifications['city'+cid].fort54) + parseInt(Seed.fortifications['city'+cid].fort55);
			var curcity = parseInt(Seed.fortifications['city'+cid].fort56) + parseInt(Seed.fortifications['city'+cid].fort57);
			//Maximums Reached?
			if (maxwall <= curwall) {
				if (t.gr['c'+(i)+'f52'] === true) {
					t.gr['c'+(i)+'f52'] = false;
					t.id['pttc'+(i)+'f52'].style.backgroundColor = '#ccccff';			
				}
				if (t.gr['c'+(i)+'f53'] === true) {				
					t.gr['c'+(i)+'f53'] = false;
					t.id['pttc'+(i)+'f53'].style.backgroundColor = '#ccccff';	
				}
			}
			if (maxfield <= curfield) {
				if (t.gr['c'+(i)+'f54'] === true) {
					t.gr['c'+(i)+'f54'] = false;
					t.id['pttc'+(i)+'f54'].style.backgroundColor = '#ccccff';	
				}
				if (t.gr['c'+(i)+'f55'] === true) {
					t.gr['c'+(i)+'f55'] = false;
					t.id['pttc'+(i)+'f55'].style.backgroundColor = '#ccccff';
				}
			}	
			if (maxcity <= curcity) {
				if (t.gr['c'+(i)+'f56'] === true) {
					t.gr['c'+(i)+'f56'] = false;
					t.id['pttc'+(i)+'f56'].style.backgroundColor = '#ccccff';	
				}
				if (t.gr['c'+(i)+'f57'] === true) {					
					t.gr['c'+(i)+'f57'] = false;
					t.id['pttc'+(i)+'f57'].style.backgroundColor = '#ccccff';
				}
			}						
		}
	},

	training : function() {
    var t = Tabs.Train;
		t.greenred();
		var now = unixTime();
		//Train and Perform Check
		for (var i = 0; i < Cities.cities.length; i++) {
			//Is Autotraining Off?
			if (Options.pbtrain['c'+i] == 0) continue;
			//Is the troop Queue empty?
			var walkingU = false;
			var q = Seed.training_queue['c'+Cities.cities[i].id];
			for (qs in q) {
				qe = q[qs];
				if (parseInt(qe.status) <= 2 && parseInt(qe.eta) > now) {
					walkingU = true;
					break;
				}
			}
			//Is the Defense Queue Empty?
			var walkingF = false;
			var q = Seed.fortify_queue['c'+Cities.cities[i].id];
      for (qs in q) {
				qe = q[qs];
				if (parseInt(qe.status) <= 2 && parseInt(qe.eta) > now) {
					walkingF = true;
					break;
				}
			}
			//Training?
			for (var unit in t.uu) {
				if (t.gr['c'+(i)+(unit)] === false) continue;
				var anzahl = Options.pbtrain['c'+(i)+(unit)];
				if (anzahl == 0) continue;

				if (unit.substr(0,1) == "u") {
					if (walkingU === false) {
						t.trainqueue.push({
							'cid' : Cities.cities[i].id,
							'type' : unit,
							'quant' : anzahl,
							'start' : now,
						});
					}
				} else {
					if (walkingF === false) {
						t.trainqueue.push({
							'cid' : Cities.cities[i].id,
							'type' : unit,
							'quant' : anzahl,
							'start' : now,
						});					
					}				
				}
			}
		}
	},

	gotrain : function() {
    var t = Tabs.Train;
		var now = unixTime();
		if (t.trainqueue.length > 0) {
			//Pick Job
			var train = t.trainqueue.shift();
			//More than one minute?
			if ((train.now + 60) < now) return;
			//Troops or Defenses?
			var UorF = train.type.substr(0,1);
			//Enough Resources and Population?
			//Minimum 1 million for each resource, SR is depleted

			if (UorF == 'u') {
				var cost = t.trData[train.type].c;	
				var food = parseInt(Seed.resources['city'+ train.cid]['rec1'][0] / 3600);
				if (food < (cost[1] * train.quant + 1000000)) return;
				var oil = parseInt(Seed.resources['city'+ train.cid]['rec2'][0] / 3600);
				if (oil < (cost[2] * train.quant + 1000000)) return;	
				var stone = parseInt(Seed.resources['city'+ train.cid]['rec3'][0] / 3600);
				if (stone < (cost[3] * train.quant + 1000000)) return;	
				var steel = parseInt(Seed.resources['city'+ train.cid]['rec4'][0] / 3600);
				if (steel < (cost[4] * train.quant + 1000000)) return;
				var Titanium = parseInt(Seed.resources['city'+ train.cid]['rec5'][0] / 3600);
				if (Titanium < (cost[5] * train.quant)) return;	
				var Graphene = parseInt(Seed.resources['city'+ train.cid]['rec6'][0] / 3600);
				if (Graphene < (cost[6] * train.quant)) return;	
				var uran = parseInt(Seed.resources['city'+ train.cid]['rec7'][0] / 3600);
				if (uran < (cost[7] * train.quant)) return;
				var diamonds = parseInt(Seed.resources['city'+ train.cid]['rec8'][0] / 3600);
				if (diamonds < (cost[8] * train.quant)) return;
				var population = parseInt(Seed.citystats["city" + train.cid]["pop"][0]);
				var worker = parseInt(Seed.citystats["city" + train.cid]["pop"][3]);		
				if ((population - worker) < (cost[9] * train.quant)) return;
			} else {
				var cost = t.foData[train.type].c;				
				var food = parseInt(Seed.resources['city'+ train.cid]['rec1'][0] / 3600);
				if (food < (cost[1] * train.quant + 1000000)) return;
				var oil = parseInt(Seed.resources['city'+ train.cid]['rec2'][0] / 3600);
				if (oil < (cost[2] * train.quant + 1000000)) return;	
				var stone = parseInt(Seed.resources['city'+ train.cid]['rec3'][0] / 3600);
				if (stone < (cost[3] * train.quant + 1000000)) return;	
				var steel = parseInt(Seed.resources['city'+ train.cid]['rec4'][0] / 3600);
				if (steel < (cost[4] * train.quant + 1000000)) return;
				var Titanium = parseInt(Seed.resources['city'+ train.cid]['rec5'][0] / 3600);
				if (Titanium < (cost[5] * train.quant)) return;	
				var Graphene = parseInt(Seed.resources['city'+ train.cid]['rec6'][0] / 3600);
				if (Graphene < (cost[6] * train.quant)) return;	
				var uran = parseInt(Seed.resources['city'+ train.cid]['rec7'][0] / 3600);
				if (uran < (cost[7] * train.quant)) return;	
				var diamonds = parseInt(Seed.resources['city'+ train.cid]['rec8'][0] / 3600);
				if (diamonds < (cost[8] * train.quant)) return;			
			}
			//Free space in the Queue?
			//Get the Queue ID
			if (UorF == 'u') {
				var tid = 0;
				var q = Seed.training_queue['c'+train.cid]; 
				for (var qs in q) {
					var qe = q[qs];
					if (parseInt(qe.status) == 0 && parseInt(qe.eta) <= now) {
						tid = qe.id;
						break;
					}
				}	
				if (tid == 0) return;
				train.tid = tid;
			} else {
				var fid = 0;
				var q = Seed.fortify_queue['c'+train.cid];
				for (var qs in q) {
					var qe = q[qs];
					if (parseInt(qe.status) == 0 && parseInt(qe.eta) <= now) {
						fid = qe.id;
						break;
					}
				}	
				if (fid == 0) return;	
				train.fid = fid;				
			}
			//Start Training
			var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
			params.cid = train.cid;
			params.type = train.type.substr(1);
			params.quant = train.quant;
			params.items = 0;
			if (UorF == 'u') { 
				params.tid = train.tid;
				var ajaxfile = 'train.php';
			} else {
				params.fid = train.fid;			
				var ajaxfile = 'fortify.php';			
			}
			new MyAjaxRequest(unsafeWindow.g_ajaxpath + ajaxfile + unsafeWindow.g_ajaxsuffix, {
				method: "post",
				parameters: params,
				onSuccess: function (rslt) {
					if (rslt.ok) { 
						//Reload Queues
						if (UorF == 'u') { 
							var q = Seed.training_queue['c'+params.cid]['t'+params.tid];
							q.eta = parseInt(rslt.initTS, 10) + parseInt(rslt.timeNeeded, 10);
							q.needed = rslt.ticksNeeded;
							q.progress = 0;
							q.quant = params.quant;
							q.status = rslt.status;
							q.ticker = rslt.initTS;
							q.type = params.type;
							//Logbook Entry OK
							Logbook.entry(Logs.trainlog, 'Troops started training in <b>'+Cities.byID[params.cid].name+'</b> (<b>'+addCommas(params.quant)+' '+t.uu['u'+params.type]+', '+timestr(parseInt(rslt.timeNeeded, 10))+'</b>)');
						} else {
							var q = Seed.fortify_queue['c'+params.cid]['f'+params.fid];
							q.eta = parseInt(rslt.initTS, 10) + parseInt(rslt.timeNeeded, 10);
							q.needed = rslt.ticksNeeded;
							q.progress = 0;
							q.quant = params.quant;
							q.status = rslt.status;
							q.ticker = rslt.initTS;
							q.type = params.type;
							//Logbook Entry OK
							Logbook.entry(Logs.trainlog, 'Construction of Defenses started in <b>'+Cities.byID[params.cid].name+'</b> (<b>'+addCommas(params.quant)+' '+t.uu['f'+params.type]+', '+timestr(parseInt(rslt.timeNeeded, 10))+'</b>)');
						}
						t.id.pttrainlog.innerHTML = Logbook.output(Logs.trainlog);							
					} else {
						var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
						var e = '<span class="boldRed">'+errorcode+'</span>';
						//Logbook entry for Errors
						if (UorF == 'u') { 
							Logbook.entry(Logs.trainlog, 'Errors training troops in <b>'+Cities.byID[params.cid].name+'</b> (<b>'+addCommas(params.quant)+' '+t.uu['f'+params.type]+'</b>)<br>'+e);
						} else {
							Logbook.entry(Logs.trainlog, 'Errors Building Defenses in <b>'+Cities.byID[params.cid].name+'</b> (<b>'+addCommas(params.quant)+' '+t.uu['f'+params.type]+'</b>)<br>'+e);
						}
						t.id.pttrainlog.innerHTML = Logbook.output(Logs.trainlog);								
					}
				},
				onFailure: function () {alert('Errors Training Occured');}
			});
		}
	},
}

/*********************************** Options Tab ***********************************/
Tabs.Options = {
  tabOrder : 99,
	tabLabel: 'Options',
  cont : null,
	displayTimer : null,
  tabDisabled : !ENABLE_OPTIONS,
	
  init : function (div){
	  var t = Tabs.Options;
    t.cont = div;
    var m = '<table class="ptTab ptStat" width="100%">\
        <tr>\
					<td style="text-align:center;"><b>Options</b></td>\
				</tr></table><br><table class="ptTab" width="100%">\
				<tr>\<td style="text-align:left;"></td>\
<td colspan="2">&nbsp;</td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D4%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>MacArthur4</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D5%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Montgomerry5</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D6%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>DeGaulle6</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D7%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Bismarck7</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D8%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Genghis8</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D19%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Garibaldi9</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D10%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Isabella10</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D11%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Nimitz11</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D12%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Cortez12</u></a></b></td>\<tr>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D13%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Wellington13</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D14%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Napoleon14</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D15%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Frederick15</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D16%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Pizarro16</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D17%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Ceasar17</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D18%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Nelson18</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D19%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Bolivar19</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D20%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>ElCid20</u></a></b></td>\<tr>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D21%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>HenryV21</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D22%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>SanMartin22</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D23%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Leonidas23</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D24%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Montezuma24</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D25%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Trujillo25</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D26%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Alexander26</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D27%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Balboa27</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D28%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>CaoCao28</u></a></b></td>\<tr>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D29%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Cromwall29</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D30%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Dewey30</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D31%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Churchill31</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D32%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>SunTzu32</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D33%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Scipio33</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D34%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Joan34</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D35%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>PanchoVilla35</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D36%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Leopold36</u></a></b></td>\<tr>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D37%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Antony37</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D38%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Charlemagne38</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D39%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>SantaAnna39</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D40%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Bradley40</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D41%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>PonceDeLeon41</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D42%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Cunningham42</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D43%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Hannibal43</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D44%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Marshall44</u></a></b></td>\<tr>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D46%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Hummel46</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D47%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Wayne47</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D48%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Hammond48</u></a></b></td>\
<td colspan="2">&nbsp;&nbsp;</td>\
<td style="text-align:left;"></td>\
<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fapps.facebook.com%2Fglobalwarfaregame%2F%3Fpage%3DclaimStuff%26s%3D49%26step%3D2%26lang%253Tr%26lp%3D12&h=qAQD4NfQv"><FONT COLOR="green"><b><u>Forjaz49</u></a></b></td>\</tr>\
				<tr>\
				<table class="ptTab ptStat" width="100%">\
        		<tr>\
				<td style="text-align:center;"></td>\
				</tr></table><br><table class="ptTab">\
				</tr>\
				<tr>\
				<td colspan="2">&nbsp;<b>General Settings</b></td>\
				</tr>\
				<tr>\
				<td><input id="ptAllowWinMove" type="checkbox" />&nbsp;</td>\
				<td>Allow Window move (drag the title bar with the mouse)</td>\
				</tr>\
				<tr>\
				<td><input id="pbEveryEnable" type="checkbox" /></td>\
				<td>Reload Global Warfare every <input id="pbeverymins" type="text" size="2" maxlength="3" style="text-align:center;"> Minutes</td>\
				</tr>\
				<tr>\
				<td colspan="2">&nbsp;<br>&nbsp;<b>Chat Options</b></td>\
				</tr>\
				<tr>\
				<td><input id="ptahelpenable" type="checkbox" /></td>\
				<td>Automatically Help Allies with Builds and Researching</td>\
				</tr>\
				<tr>\
				<td><input id="ptahelphide" type="checkbox" /></td>\
				<td>Hide Chat Help Requests</td>\
				</tr>\
				<tr>\
				<td><input id="ptfoodtoggle" type="checkbox" /></td>\
				<td>Post in alliance chat when little food is available <br> (less than 4 hours, every 10 minutes)</td>\
				</tr>\
				<tr>\
				<td><input id="pbChatREnable" type="checkbox" /></td>\
				<td>Put chat to the right. (reload required.)</td>\
				</tr>\
				<tr>\
				<td colspan="2">&nbsp;<br>&nbsp;<b>Item Collecting</b></td>\
				</tr>\
				<tr>\
				<td><input id="ptgoldenable" type="checkbox" /></td>\
				<td>Automatically collect Gold from Casinos when morale reaches <input id="ptgoldLimit" type="text" size="2" maxlength="3" style="text-align: center;" \> %</td>\
				</tr>\
				<tr>\
				<td><input id="ptoilenable" type="checkbox" /></td>\
				<td>Automatically collect oil from Petroleum Lab (2nd City)</td>\
				</tr>\
				<tr>\
				<td><input id="ptfoodenable" type="checkbox" /></td>\
				<td>Automatically collect Food from greenhouse(3rd City)</td>\
				</tr>\
				<tr>\
				<td><input id="ptnukeenable" type="checkbox" /></td>\
				<td>Automatically collect Warheads from Factory(4th City)</td>\
				</tr>\
				<tr>\
				<td><input id="ptlauncherenable" type="checkbox" /></td>\
				<td>Automatically collect Launch Vehicles from Mission Control(5th City)</td>\
				</tr>\
				<tr>\
				<td><input id="ptradarenable" type="checkbox" /></td>\
				<td>Automatically collect Targeting Radar(6th City)</td>\
				</tr>\
				<tr>\
				<td><input id="ptmissileenable" type="checkbox" /></td>\
				<td>Automatically collect Launch Unit Crate(7th City)</td>\
				</tr>\
				<tr>\
				<td><input id="ptcity8enable" type="checkbox" /></td>\
				<td>Automatically collect city8 Special(8th City)</td>\
				</tr>\
				<tr>\
				<td><input id="ptcity9enable" type="checkbox" /></td>\
				<td>Automatically collect city9 Special</td>\
				</tr>\
				<tr>\
				<td><input id="ptdailyenable" type="checkbox" /></td>\
				<td>Automatically Collect Daily Reward.</td>\
				</tr>\
				<tr>\
				<td><input id="ptgiftenable" type="checkbox" /></td>\
				<td>Automatically Accept Gifts.</td>\
				</tr>\
				<tr>\
				<td><input id="ptitemuse" type="checkbox" /></td>\
				<td>Automatically use Production Boosters from Inventory?<br>Note: Items collected will be transferred to your main city.</td>\
				</tr>\
				<tr>\
				<td><input id="pttrcrateuse" type="checkbox" /></td>\
				<td>Targeting Radar Crates automaticlly Collected.</td>\
				</tr>\
				<tr>\
				<td><input id="ptlucrateuse" type="checkbox" /></td>\
				<td>Launch Unit Crates automatically Collected.</td>\
				</tr>\
				<tr>\
				<td colspan="2">&nbsp;<br>&nbsp;<b>Hide Icons</b></td>\
				</tr>\
				<tr>\
					<td><input id="ptrmmotdEnable" type="checkbox" /></td>\
					<td>Hide Event / Info window (under the cities buttons)</td>\
				</tr>\
				<tr>\
					<td><input id="pticonsEnable" type="checkbox" /></td>\
					<td>Hide icons on the left side</td>\
				</tr>\
				<tr>\
					<td><input id="ptsoundoff" type="checkbox" /></td>\
					<td>Background music off (not used at the moment)</td>\
				</tr>\
				<tr>\
					<td><input id=togOpacity type=text size=3 maxlength=3 value="'+Options.Opacity+'"/></td>\
					<td>Adjust The Opacity</td>\
				</tr>\
				<table class="ptTab ptStat" width="100%">\
				<tr>\
					<td style="text-align:center;"></td>\
				<td style="text-align:center;"></td>\
					<td><a target=_blank href="http://www.facebook.com/l.php?u=http%3A%2F%2Fwww.facebook.com%2Fl.php%3Fu%3Dhttp%253A%252F%252Fapps.facebook.com%252Fglobalwarfaregame%252F%253Fpage%253DclaimStuff%2526s%253D46%2526step%253D2%2526lang%253Den%2526lp%253D12%26h%3DqAQD4NfQv&h=KAQErkLii"><b><u>Click for Extra Airdrop token.</b></a></u></td>\
					</tr></table><br><table class="ptTab">\
				</tr>\
					<td colspan="2">&nbsp;</td>\
				</tr>\
				<tr>\
					<td colspan="2" style="text-align:right;"><input id="ptButDebug" type="submit" name="SEED" value="DEBUG"></td>\
				</tr>\
				</table>';
			
		m += '<hr><table width="100%">\
					<tr><td><b>Tool Log:</b><br><br></td>\
					<td style="text-align: right;"><input id="ptButClearGLog" type="submit" name="ClearELog" value="Clear Log"></td></tr>\
					<tr><td colspan="2"><div id="ptoptlog" style="height: 150px; overflow: auto;">';

		m += '</div></td></tr></table>';
		t.cont.innerHTML = m;
		
		t.togOpt ('ptAllowWinMove', 'ptWinDrag', mainPop.setEnableDrag);
		t.togOpt ('ptahelpenable', 'pbahelpenable');
		t.togOpt ('ptahelphide', 'pbahelphide');
		t.togOpt ('ptrmmotdEnable', 'pbrmmotdEnable', t.onoffMotd);
		t.togOpt ('pticonsEnable', 'pbiconsEnable', t.onoffIcons);
		t.togOpt ('ptsoundoff', 'ptsoundoff', t.sound);
		t.togOpt ('ptgoldenable', 'pbgoldenable');
		t.changeOpt ('ptgoldLimit', 'pbGoldLimit');
		t.togOpt ('ptoilenable', 'pboilenable');
		t.togOpt ('ptfoodenable', 'pbfoodenable');
		t.togOpt ('ptnukeenable', 'pbnukeenable');
		t.togOpt ('ptlauncherenable', 'pblauncherenable');
		t.togOpt ('ptradarenable', 'pbradarenable');
		t.togOpt ('ptmissileenable', 'pbmissileenable');
		//t.togOpt ('ptcity8enable', 'pbcity8enable');
		//t.togOpt ('ptcity9enable', 'pbcity9enable');
		t.togOpt ('ptdailyenable', 'pbdailyenable');
		t.togOpt ('ptgiftenable', 'pbgiftenable');
		t.togOpt ('ptitemuse', 'pbitemuse');
		t.togOpt ('pttrcrateuse', 'pbtrcrateuse');
		t.togOpt ('ptlucrateuse', 'pblucrateuse');
		t.togOpt ('ptfoodtoggle', 'pbFoodAlert');
		t.togOpt ('pbChatREnable', 'pbChatOnRight');

		t.changeOpt ('pbeverymins', 'pbEveryMins' , RefreshEvery.setTimer);
		t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
		document.getElementById('ptButClearGLog').addEventListener('click', function (){t.ClearGLog()}, false);
		document.getElementById('ptButDebug').addEventListener('click', function (){debugWin.doit()}, false);
		document.getElementById('togOpacity').addEventListener('change', function(){Options.Opacity = document.getElementById('togOpacity').value;t.Layout()}, false);
		t.show();
	},

  hide : function (){
  },

  show : function (){
    var t = Tabs.Options;
 		clearTimeout (t.displayTimer);
		
		//Global log Output
		document.getElementById('ptoptlog').innerHTML = Logbook.output(Logs.globallog);

		t.displayTimer = setTimeout(t.show, 10000);
  },

	togOpt : function (checkboxId, optionName, callOnChange){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },

  changeOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
      if (callOnChange)
        callOnChange (this.value);
    }
  },

	sound : function() {
		if(Options.ptsoundoff) {
			try {
				unsafeWindow.bgMusic.setVolume(0);
				var soundbutton = document.getElementById('btn-sound-toggle');
				soundbutton.setAttribute('class', 'off');
			} catch (e) {}
		} else {
			try {		
				unsafeWindow.bgMusic.setVolume(100);
				var soundbutton = document.getElementById('btn-sound-toggle');
				soundbutton.setAttribute('class', '');				
			} catch (e) {}				
		}	
	},
	
	onoffMotd : function() {
		if(Options.pbrmmotdEnable) {
			document.getElementById('motd-widget').style.display = "none";
		} else {
			document.getElementById('motd-widget').style.display = "block";
		}
	},

	onoffIcons : function() {
		if(Options.pbiconsEnable) {
			document.getElementById('gw-notification').style.display = "none";
			document.getElementById("trialpay_dealspot").style.display = "none";
		} else {
			document.getElementById('gw-notification').style.display = "block";
			document.getElementById("trialpay_dealspot").style.display = "block";
		}
	},

	ClearGLog : function () {
		Logs.globallog = [];
		saveLogs();
		clearTimeout (Tabs.Options.displayTimer);
		Tabs.Options.show();
	},

}

/************ Fake Attack Tab ****************************************/
Tabs2.F = {
  tabLabel : 'Fake Attack',
  tabOrder : 100,
  tabDisabled : !ENABLE_FAKE_TAB,
  cont : null,

  init : function (div){
    var t = Tabs2.F;
    t.cont = div;
		var citySelect = '<select id="ptfakecity">';
    for (var c=0; c<Cities.numCities; c++) {
      aCity = Cities.cities[c].name + ' ('+Cities.cities[c].x + ','+ Cities.cities[c].y+')';
      citySelect += '<option value="'+c+'">'+aCity+'</option>';
    }
    citySelect += '</select>';
		
		var out = [];	
		//Header
		out.push('<table class="ptTab ptStat" width="100%">');
		out.push('<tr>');
		out.push('<td style="text-align:center;">');		
		out.push('<b>Fake Attack to test Alarms</b>');
		out.push('</td>');
		out.push('</tr>');		
		out.push('</table>');			
		out.push('<br>');
		
		out.push('Fake an attack to test if the alarms are working as desired.  If the message is posted in chat, etc.');
		out.push('<br>');
		out.push('<br>');
		
		//Form
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td><b>Attack Type:</b></td>');
		out.push('<td>');
		//out.push(htmlSelector({1:'Attack on a City', 2:'Attack on a Wild', 3:'Scout City', 4:'Scout Wild'}, '', 'id="ptfaketype"'));
		out.push(htmlSelector({1:'Attack on a City', 2:'Attack on a Wild'}, '', 'id="ptfaketype"'));
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>City:</b></td>');
		out.push('<td>');
		out.push(citySelect);
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Arriving In:</b></td>');
		out.push('<td>');
		out.push('<input type="text" id="ptfakeseconds" value="300" size="4"> Seconds');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Attackers Name:</b></td>');
		out.push('<td>');
		out.push('<input type="text" id="ptfakename" value="FakeGeneral" size="13">');
		out.push('</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Attackers Alliance:</b>&nbsp;&nbsp;</td>');
		out.push('<td>');
		out.push('<input type="text" id="ptfakealliance" value="FakeAlliance" size="13">');
		out.push('</td>');
		out.push('</tr>');
		out.push('</table>');
		out.push('<br>');
		
		//Troops
		out.push('<table class="ptTab">');
		out.push('<tr>');
		out.push('<td colspan="8"><b><u>Troops:</u></b><br>&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Supply Truck:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu1" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Infantry:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu5" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');	
		out.push('<td><b>Sniper:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu6" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td><b>Anti-Tank Infantry:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu4" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Special Forces:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu18" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');		
		out.push('<td><b>Mobile SAM:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu7" value="1000" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');		
		out.push('<td><b>Tank:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu8" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');		
		out.push('<td><b>Hellfire-Tank:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu16" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Predator-Drone:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu17" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Supply-Helicopter:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu9" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Gunship:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu11" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Fighter:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu10" value="2000" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Bomber:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu12" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Stealth-Bomber:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu13" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Cargo Transport:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu19" value="500" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('</tr>');
		out.push('<tr>');
		out.push('<td><b>Tactical Nuke:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu15" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Ion Cannon:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu20" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Sam Elite:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu21" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Gunship Elite:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptfakeu24" value="0" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td><b>Anti-tank Elite:</b>&nbsp;</td>');
		out.push('<td>&nbsp;<input id="ptartu22" type="text" size="5" maxlength="6" style="text-align: center;">&nbsp;</td>');
		out.push('<td width="50">&nbsp;</td>');
		out.push('<td>&nbsp;</td>');
		out.push('<td>&nbsp;</td>');
		out.push('</tr>');		
		out.push('</table>');
		out.push('<br>');
		
		out.push('<input type="submit" id="ptfakestart" value="Fake Attack">&nbsp;&nbsp;');
		out.push('<input type="submit" id="ptfakestop" value="Fake Attack(s) Stop">');
		out.push('<br>');
		out.push('<br>');
		
    t.cont.innerHTML = out.join('');
    document.getElementById('ptfakestart').addEventListener ('click', t.clickFakeAttack, false);
    document.getElementById('ptfakestop').addEventListener ('click', t.clickFakeStop, false);
	},

	clickFakeStop : function () {
		for (m in Seed.queue_atkinc) {
			var march = Seed.queue_atkinc[m];
			if (march.fake) {
				Seed.queue_atkinc[m] = {};
				delete Seed.queue_atkinc[m];
			}
		}
		Tabs.tower.stopSoundAlerts();
	},

  hide : function (){
  },

  show : function (){
  },
  
  createFakeAttack : function (type, cityNum, secs, name, alliance, units) {
    var marchId = 'm'+ (88888 + Math.floor(Math.random()*11111));
    var march = {};
		march.fake = 1;
    if (matTypeof(Seed.queue_atkinc)=='array')
      Seed.queue_atkinc = {};
    march.marchType = 4;

    march.toCityId = Cities.cities[cityNum].id;
    if (type == 2) {
      keys = unsafeWindow.Object.keys(Seed.wilderness['city'+Cities.cities[cityNum].id]);
      march.toTileId = Seed.wilderness['city'+Cities.cities[cityNum].id][keys[0]].tileId;
    } else {
      march.toTileId = Cities.cities[cityNum].tileId;
    }
    secs = parseInt(secs);
    march.arrivalTime = unixTime() + secs;
    march.departureTime = unixTime() - 10;
    march.unts = {};
		for (var u = 1; u < 25; u++) {
			if (u == 2 || u == 3 || u == 14 || u == 23) continue;
			if (units[u] > 0) {
				march.unts['u'+u] = units[u];
			}
		}
		var pid = (15000000 + Math.floor(Math.random()*11111111));
		var aid = (100000 + Math.floor(Math.random()*100000));
    march.pid = pid;
    march.score = 9;
    march.mid = marchId.substr(1);
    march.players = {};
    march.players['u'+pid] = {};
    march.players['u'+pid].n = name;
    march.players['u'+pid].t = 100;
    march.players['u'+pid].m = 12345678;
    march.players['u'+pid].s = 'M';
    march.players['u'+pid].w = 1;
    march.players['u'+pid].a = aid;
    march.players['u'+pid].i = 5;
    Seed.queue_atkinc[marchId] = march;
    Seed.players['u'+pid] = march.players['u'+pid];
		Seed.allianceNames['a'+aid]	= alliance;
  },

  clickFakeAttack : function (){
    var t = Tabs2.F;
		var type = document.getElementById('ptfaketype').value;
		var city = document.getElementById('ptfakecity').value;
		var secs = parseInt(document.getElementById('ptfakeseconds').value);
		var name = document.getElementById('ptfakename').value;	
		var alliance = document.getElementById('ptfakealliance').value;	
		var units = [];
		units[1] = parseInt(document.getElementById('ptfakeu1').value);
		units[4] = parseInt(document.getElementById('ptfakeu4').value);
		units[5] = parseInt(document.getElementById('ptfakeu5').value);
		units[6] = parseInt(document.getElementById('ptfakeu6').value);
		units[7] = parseInt(document.getElementById('ptfakeu7').value);
		units[8] = parseInt(document.getElementById('ptfakeu8').value);
		units[9] = parseInt(document.getElementById('ptfakeu9').value);
		units[10] = parseInt(document.getElementById('ptfakeu10').value);
		units[11] = parseInt(document.getElementById('ptfakeu11').value);
		units[12] = parseInt(document.getElementById('ptfakeu12').value);
		units[13] = parseInt(document.getElementById('ptfakeu13').value);
		units[15] = parseInt(document.getElementById('ptfakeu15').value);
		units[16] = parseInt(document.getElementById('ptfakeu16').value);
		units[17] = parseInt(document.getElementById('ptfakeu17').value);
		units[18] = parseInt(document.getElementById('ptfakeu18').value);
		units[19] = parseInt(document.getElementById('ptfakeu19').value);
		units[20] = parseInt(document.getElementById('ptfakeu20').value);
		units[21] = parseInt(document.getElementById('ptfakeu21').value);
		units[22] = parseInt(document.getElementById('ptfakeu22').value);
		units[24] = parseInt(document.getElementById('ptfakeu24').value);
		if (type == 1 || type == 2) {
			t.createFakeAttack (type, city, secs, name, alliance, units);
		} 
  },
}

/************************ AutoEvents Collector ************************/
var AutoEvents = {
  timer : null,
	colCityName : null,   
	colCityNumber : 0,
	
  init : function (){
    var t = AutoEvents;
		clearTimeout (t.timer);
    t.tick();
	},
	
	tick : function (){
		var t = AutoEvents;
		clearTimeout (t.timer);
		var now = unixTime();
		for (var c=0; c<Cities.numCities; c++){
			var city = Cities.cities[c];

			//Gold check
			if (t.casino(city.id) && Options.pbgoldenable && Options.pblastgoldcollect[c] < now-300) {
				var happy = Seed.citystats['city'+ city.id].pop[2];
				var ready = Seed.coliseumEvents['city'+ city.id]["1"].finish - now;
				if (happy >= Options.pbGoldLimit && ready <= 0) {
					t.colCityName = city.name;
					t.ajaxCollectGold (city, t.e_ajaxDoneGold);
					break;
				}
			}
			
			//Oil check
			if (Options.pboilenable && Options.pblastoilcollect < now-300) {
				var finish = Seed.petroleumLabEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectOil (city, t.e_ajaxDoneOil);
						break;
					}
				}
			}
		
			//Food check
			if (Options.pbfoodenable && Options.pblastfoodcollect < now-300) {
				var finish = Seed.greenhouseEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectFood (city, t.e_ajaxDoneFood);
						break;
					}
				}
			}
			
			//Warhead check
			if (Options.pbnukeenable && Options.pblastnukecollect < now-300) {
				var finish = Seed.warheadFactoryEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectNuke (city, t.e_ajaxDoneNuke);
						break;
					}
				}
			}

			//Launcher check
			if (Options.pblauncherenable && Options.pblastlaunchercollect < now-300) {
				var finish = Seed.missionControlEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectLauncher (city, t.e_ajaxDoneLauncher);
						break;
					}
				}
			}
			//Radar Check
			if (Options.pbradarenable && Options.pblastradarcollect < now-300) {
				var finish = Seed.radarStationEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectRadar (city, t.e_ajaxDoneRadar);
						break;
					}
				}
			}
			//Missile Factory Check
			if (Options.pbmissileenable && Options.pblastmissilecollect < now-300) {
				var finish = Seed.missileFactoryEvents['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollectMissile (city, t.e_ajaxDoneMissile);
						break;
					}
				}
			}
			//Eighth City Check
		/*				if (Options.pbcity8enable && Options.pblastcity8collect < now-300) {
				var finish = Seed.Events['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollect (city, t.e_ajaxDone);
						break;
					}
				}
			}
			//Ninth City Check
						if (Options.pbcity9enable && Options.pblastcity9collect < now-300) {
				var finish = Seed.Events['city'+ city.id]["1"].finish;
				if (finish > 0) {
					var ready = finish - now;
					if (ready <= 0) {
						t.colCityName = city.name;
						t.ajaxCollect (city, t.e_ajaxDone);
						break;
					}
				}
			}*/
			//Daily Reward Check
			if (Options.pbdailyenable && Options.pblastdailycollect < now-300 && 
					Seed.dailyResourceRewardStatus === true && c == 0) {
				t.colCityName = city.name;
				t.ajaxCollectDaily(city, t.e_ajaxDoneDaily);
				break;
			}
		}
		t.timer = setTimeout (t.tick, 10000);    
	},

	e_ajaxDoneGold : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	addCommas(rslt.gained.gold) + ' Gold collected in ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'Failed to Collect Gold in '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastgoldcollect[t.colCityNumber] = unixTime();
		Logbook.entry(Logs.globallog,m);
	},
  
	ajaxCollectGold : function (city, notify){
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = city.id;
		params.eventid = 1;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "coliseumEvent.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (notify) notify (rslt);
			},
			onFailure: function (rslt) {
				if (notify) notify (rslt);
			}
		});
	},

  e_ajaxDoneOil : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	addCommas(rslt.gained.resource2) + ' Oil Collected in ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'Failed to Collect oil in '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastoilcollect = unixTime();
		Logbook.entry(Logs.globallog,m);
  },
  
  ajaxCollectOil : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
		params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "petroleumLabEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },	

  e_ajaxDoneFood : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	addCommas(rslt.gained.resource1) + ' Food collected in ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'Failed to collect food in '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastfoodcollect = unixTime();
		Logbook.entry(Logs.globallog,m);
  },
  
  ajaxCollectFood : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
		params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "greenhouseEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },	

	e_ajaxDoneNuke : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	'Nuclear Warhead Collected in ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'Failed to collect nuclear warhead in '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastnukecollect = unixTime();
		Logbook.entry(Logs.globallog,m);
  },
  
  ajaxCollectNuke : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
		params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "warheadFactoryEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },	

 e_ajaxDoneLauncher : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m =	'Launch Vehicle collected in ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m =	'Failed to collect Launch Vehicle in '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastlaunchercollect = unixTime();
		Logbook.entry(Logs.globallog,m);
  },
  
  ajaxCollectLauncher : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
		params.eventid = 1;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "missionControlEvent.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify) notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify) notify (rslt);
      }
    });
  },
  //Radar Ajax Function
	e_ajaxDoneRadar : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m = 'Radar Crate collected in ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m = 'Failed to collect Radar Crate in '+ t.colCityName +'!<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastradarcollect = unixTime();
		Logbook.entry(Logs.globallog,m);
  },
  
  ajaxCollectRadar : function (city, notify){
	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	params.cid = city.id;
	params.eventid = 1;
	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "radarStationEvent.php" + unsafeWindow.g_ajaxsuffix, {
		method: "post",
		parameters: params,
		onSuccess: function (rslt) {
			if (notify) notify (rslt);
		},
		onFailure: function (rslt) {
			if (notify) notify (rslt);
		}
	});
  },
  //Missile Ajax Function
	e_ajaxDoneMissile : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m = 'Launch Unit Crate collected in ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m = 'Failed to collect Launch Unit Crate in '+ t.colCityName +'!<br><span class="boldRed">'+ errorcode +'</span>';
		}
		Options.pblastmissilecollect = unixTime();
		Logbook.entry(Logs.globallog,m);
	},

	ajaxCollectMissile : function (city, notify){
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = city.id;
		params.eventid = 1;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "missileFactoryEvent.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (notify) notify (rslt);
			},
			onFailure: function (rslt) {
				if (notify) notify (rslt);
			}
		});
	},
  //City 8 Ajax Function
  /*e_ajaxDonecity8 : function (rslt) {
	  var t = AutoEvents;
	  if (rslt.ok) {
		  var m = 'Radar Crate collected in ' + t.colCityName;
	  } else {
		  var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
		  var m = 'Failed to collect Radar Crate in '+ t.colCityName +'!<br><span class="boldRed">'+ errorcode +'</span>';
	  }
	  Options.pblastradarcollect = unixTime();
	  Logbook.entry(Logs.globallog,m);
  },
  
  ajaxCollectcity8 : function (city, notify){
	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	params.cid = city.id;
	params.eventid = 1;
	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "radarStationEvent.php" + unsafeWindow.g_ajaxsuffix, {
		  method: "post",
		  parameters: params,
		  onSuccess: function (rslt) {
			  if (notify) notify (rslt);
		  },
		  onFailure: function (rslt) {
			  if (notify) notify (rslt);
		  }
	  });
  },  
  //City 9 Ajax Function
  e_ajaxDonecity9 : function (rslt) {
	  var t = AutoEvents;
	  if (rslt.ok) {
		  var m = 'Radar Crate collected in ' + t.colCityName;
	  } else {
		  var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
		  var m = 'Failed to collect Radar Crate in '+ t.colCityName +'!<br><span class="boldRed">'+ errorcode +'</span>';
	  }
	  Options.pblastradarcollect = unixTime();
	  Logbook.entry(Logs.globallog,m);
  },
  
  ajaxCollectcity9 : function (city, notify){
	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	params.cid = city.id;
	params.eventid = 1;
	new MyAjaxRequest(unsafeWindow.g_ajaxpath + "radarStationEvent.php" + unsafeWindow.g_ajaxsuffix, {
		  method: "post",
		  parameters: params,
		  onSuccess: function (rslt) {
			  if (notify) notify (rslt);
		  },
		  onFailure: function (rslt) {
			  if (notify) notify (rslt);
		  }
	  });
  },*/
	//Daily Ajax Function
	e_ajaxDoneDaily : function (rslt){
		var t = AutoEvents;
		if (rslt.ok) {
			var m ='Daily Reward collected in ' + t.colCityName;
		} else {
			var errorcode = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
			var m ='Failed to collect Daily Reward! '+ t.colCityName +'<br><span class="boldRed">'+ errorcode +'</span>';
	  }
		Seed.dailyResourceRewardStatus = false;
		Options.pblastdailycollect = unixTime();
		Logbook.entry(Logs.globallog,m);
  },
  
  ajaxCollectDaily : function (city, notify){
	  var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
	  params.cid = city.id;
	  new MyAjaxRequest(unsafeWindow.g_ajaxpath + "claimDailyReward.php" + unsafeWindow.g_ajaxsuffix, {
		  method : "post",
		  parameters: params,
		  onSuccess: function (rslt) {
			  if (notify) notify (rslt);
		  },
		  onFailure: function (rslt) {
			  if (notify) notify (rslt);
		  }
	  });
  },

	casino : function(cid) {
		var Casino = false;
		var bau = Seed.buildings['city'+ cid];
		for (var g in bau) {
			b = bau[g];
			if (parseInt(b[0]) == 6) { // Casino?
				Casino = true; // Determine Level
			}						
		}
		return Casino;
	},

}
/************************* Logbook ************************************/
var Logbook = {
	max : 100,
	
	entry : function (log, msg){
		var d = new Date();
		var t = d.toLocaleTimeString();
		var l = '<tr><td class="nobr">' + t + 'Time&nbsp;-&nbsp;</td><td>' + msg + '</td></tr>';
		log.push(l);
		while (log.length > Logbook.max) {
			log.shift();
		}
		saveLogs();
	},
	
	output : function(log){
		var a = '';
		if (log.length > 0 ) {
			var l = log.slice();
				l.reverse();
				a += '<table>' + l.join('') + '</table>';
		} else {
				a += '<table><tr><td>The Log is empty.</td></tr></table>';
		}	
		return a;
	},
}
/************************ Chat Right *************************/
var ChatOnRight = {
  
  init : function () {
    t = ChatOnRight;
    if (Options.pbChatOnRight){
      var chat = document.getElementById('kocmain_bottom').childNodes[5];
			var chat2 = document.getElementById('kocmain').childNodes[16];

			if (!chat || chat.className != 'mod_comm')
				setTimeout (function (){t.init()}, 1000);

			chat.style.top = '-548px';
			chat.style.left = '760px';
			chat.style.height = '700px';
			chat.style.width = '350px';
			chat.style.background = 'url("'+ CHAT_BG_IMAGE +'")';		

			chat2.style.top = '55px';
			chat2.style.left = '769px';
			chat2.style.height = '573px';	
			chat2.style.width = '338px';

			document.getElementById('mod_comm_list1').style.height = '3000px';
			document.getElementById('mod_comm_list2').style.height = '3000px';
		}
  },
}
/************************ Food Alerts *************************/
var FoodAlerts = {

	init : function (){
		var f = FoodAlerts;
		f.e_eachMinute();
	},

	minuteTimer : null,

	e_eachMinute : function (){  
		var f = FoodAlerts;
		var now = unixTime();
		row = [];
		for(i=0; i < Cities.numCities; i++) {
			var rp = getResourceProduction (Cities.cities[i].id);
			var foodleft = parseInt(parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600);
			var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
			row[i] = rp[1] - usage;
			var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
			var msg = '';
			if (usage < 0) {
				if (Options.pbFoodAlert && timeLeft < (4*3600)) {
					msg += 'HELP: My city ' + Cities.cities[i].name + ' (' +
						Cities.cities[i].x +','+ Cities.cities[i].y + ')';
					msg += 'has very little food. It has only '+addCommas(foodleft)+'. This will provide '+timestrShort(timeLeft)+
						'supply. My hourly consumption is '+addCommas(usage)+'.';
					sendChat("/a " + msg); // in Allichat
					Logbook.entry(Logs.globallog,msg);
				}
			}
		}
		f.minuteTimer = setTimeout (f.e_eachMinute, 600000);
  },
}
function sendChat(msg){
  document.getElementById("mod_comm_input").value = msg;
  setTimeout(unsafeWindow.Chat.sendChat, 250);
}
/************************ Accept Gifts Function *************************/
var Gifts = {
	user_gifts : [],
	gTimer : null,
	
	init : function (){
		var f = Gifts;
		setInterval (f.checkGifts, 600000);//Every 10 Minutes
	},

	checkGifts : function (){  
		if (!Options.pbgiftenable) return;
		var f = Gifts;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "getRequests.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
				if (rslt.ok) {
					//Logbook.entry(Logs.globallog, 'Looking at the inventory');
					f.user_gifts = [];
					if (rslt.gifts.length > 0) {
						for (var g = 0; g < rslt.gifts.length; g++) {
							var gift = rslt.gifts[g];
							f.user_gifts.push(gift);
						}
						//Start Redeeming
						clearInterval(f.gTimer);
						f.gTimer = setInterval(f.claimGifts, 7000);//Every 7 Seconds
					} else {
						//Logbook.entry(Logs.globallog, '.............');					
					}
				} else {
					var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
					Logbook.entry(Logs.globallog, 'Error: There was a problem retrieving a Gift!<br><span class="boldRed">'+error+'</span>');
				}
      },
      onFailure: function (rslt) {
				Logbook.entry(Logs.globallog, 'Error: There was a problem getting a gift!');
      }
    });
  },
	
	claimGifts : function() {
		var f = Gifts;
		if (f.user_gifts.length == 0) {
			clearInterval(f.gTimer);
			return;
		}
		var gift = f.user_gifts.shift();
		if (!gift.giftInviteId) return;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.accepted = 1;
		params.giid = gift.giftInviteId;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "acceptGift.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
				if (rslt.ok) {
					Logbook.entry(Logs.globallog, 'Gift: <b>' + unsafeWindow.arStrings.itemName['i' + gift.itemId] + '</b>Accepted from: ' + gift.firstname + ' ' + gift.lastname );
				} else {
					var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
					Logbook.entry(Logs.globallog, 'Gift: <b>' + unsafeWindow.arStrings.itemName['i' + gift.itemId] + '</b> Unable to accept from Sender: ' + gift.firstname + ' ' + gift.lastname + '<br><span class="boldRed">'+error+'</span>');
				}
      },
      onFailure: function (rslt) {
				Logbook.entry(Logs.globallog, 'Error: Problem encountered while accepting a gift!');
      }
    });		
	},
}
/************************ Items Use Function *************************/
var ItemUse = {
	iTimer : null,
	itemlist : [101,103,
				111,113,
				121,123,
				131,133,
				141,143,
				1001,1002,1003,1004,1005,
				1011,1012,1013,1014,1015,
				1021,1022,1023,1024,1025,
				1031,1032,1033,1034,1035,
				1041,1042,1043,1044,1045,
				10030,10032],
	
	init : function (){
		var f = ItemUse;
		setInterval(f.checkItems, 60000);//Every Minute
	},

	checkItems : function (){
		var f = ItemUse;
		var rbid = unsafeWindow.Constant.ResorceBoostIds;
		var item = 0;
		for (i = 0; i < f.itemlist.length; i++) {
			var item = f.itemlist[i];
			if (Seed.items['i'+item] && Seed.items['i'+item] > 0) break;
		}
		if (item > 0) {
			if (item == 10030) {
				if (!Options.pbtrcrateuse) return;			
				//Targeting Radar Crate
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.iid = item;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "itemChest.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) {
						if (rslt.ok) {
							Logbuch.eintrag(Logs.globallog, 'Targeting Radar Crate ge&ouml;ffnet. Du erh&auml;ltst: <b>1.000 Targeting Radar</b>');
							unsafeWindow.MyItems.subtractItem(item);
							if (Seed.items.i1403) 
								Seed.items.i1403 = parseInt(Seed.items.i1403) + 1000;
							else 
								Seed.items.i1403 = 1000;
						} else {
							var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
							Logbuch.eintrag(Logs.globallog, 'Targeting Radar Crate konnte nicht ge&ouml;ffnet werden<br><span class="boldRed">'+error+'</span>');
						}
					},
					onFailure: function (rslt) {
						Logbuch.eintrag(Logs.globallog, 'Fehler beim &ouml;ffnen einer Targeting Radar Crate');
					}
				});	
			} else if (item == 10032) {
				if (!Options.pblucrateuse) return;			
				//Launch Unit Crate
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.iid = item;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "itemChest.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) {
						if (rslt.ok) {
							Logbuch.eintrag(Logs.globallog, 'Launch Unit Crate ge&ouml;ffnet. Du erh&auml;ltst: <b>1.000 Launch Unit</b>');
							unsafeWindow.MyItems.subtractItem(item);
							if (Seed.items.i1404) 
								Seed.items.i1404 = parseInt(Seed.items.i1404) + 1000;
							else 
								Seed.items.i1404 = 1000;
						} else {
							var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
							Logbuch.eintrag(Logs.globallog, 'Launch Unit Crate konnte nicht ge&ouml;ffnet werden<br><span class="boldRed">'+error+'</span>');
						}
					},
					onFailure: function (rslt) {
						Logbuch.eintrag(Logs.globallog, 'Fehler beim &ouml;ffnen einer Launch Unit Crate');
					}
				});	
			} else if (item < 1000) {
				//Boosts
				if (!Options.pbitemuse) return;
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = Cities.cities[0].id;
				params.iid = item;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "boostProduction.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) {
						if (rslt.ok) {
							Logbook.entry(Logs.globallog, 'Extra: <b>'+unsafeWindow.arStrings.itemName['i' + item]+'</b> Was used.');
							var e = parseInt(rslt.expire, 10);
							if (Seed.playerEffects.length === 0) Seed.playerEffects = {};
							if (rbid.GOLD.include(item)) Seed.bonus.bC1000.bT1001 = e;
							if (rbid.FOOD.include(item)) Seed.bonus.bC1100.bT1101 = e;
							if (rbid.LUMBER.include(item)) Seed.bonus.bC1200.bT1201 = e;
							if (rbid.STONE.include(item)) Seed.bonus.bC1300.bT1301 = e;
							if (rbid.IRON.include(item)) Seed.bonus.bC1400.bT1401 = e;
							unsafeWindow.MyItems.subtractItem(item);
							unsafeWindow.update_boosts();
						} else {
							var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
							Logbook.entry(Logs.globallog, 'Extra Item: <b>'+unsafeWindow.arStrings.itemName['i' + item]+'</b>Error: Could not be used!<br><span class="boldRed">'+error+'</span>');
						}
					},
					onFailure: function (rslt) {
						Logbook.entry(Logs.globallog, 'Error: Item Could not be used!');
					}
				});					
			} else {
				//Raw Materials
				if (!Options.pbitemuse) return;
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = Cities.cities[0].id;
				params.iid = item;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "resourceCrate.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function (rslt) {
						if (rslt.ok) {
							Logbook.entry(Logs.globallog, 'Raw Material: <b>'+unsafeWindow.arStrings.itemName['i' + item]+'</b> has been used.');
							unsafeWindow.Resource.addToSeed(rslt.rtype, rslt.amt); 
							unsafeWindow.MyItems.subtractItem(item); 
						} else {
							var error = printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
							Logbook.entry(Logs.globallog, 'Raw Material: <b>'+unsafeWindow.arStrings.itemName['i' + item]+'</b> Error: Could not be used!<br><span class="boldRed">'+error+'</span>');
						}
					},
					onFailure: function (rslt) {
						Logbook.entry(Logs.globallog, 'Error: Item could not be used!');
					}
				});			
			}
		}
  },
}
/*******************Chat Pane*****************/
var ChatPane = {
  init : function(){
    var t = ChatPane;
		setInterval(t.HandleChatPane, 2500);
  },
	
  HandleChatPane : function() {
		var t = ChatPane;
		if(Options.pbahelpenable) {
			var AllianceChatBox = document.getElementById('mod_comm_list2');
			//Help Build Links & Research Help Links in Alliance chat search
			var alist = AllianceChatBox.getElementsByTagName('a');
			for (var i = 0; i < alist.length ; i++) {
				var element = alist[i];
				var classes = element.getAttribute('class');
				if (classes != 'helpBuild' && classes != 'helpResearch') continue;
				var alreadyClicked = element.getAttribute("clicked");
				if(!alreadyClicked){
					element.setAttribute('clicked', 'true');
					var myregexp = /(Building.helpBuild\(.*\);)/;
					var match = myregexp.exec(element.getAttribute("onclick"));
					if (match != null) {
						var onclickCode = match[0];
						t.ajaxhelpBuild(element,onclickCode);
						return;
					}
					var myregexp = /(Research.helpResearch\(.*\);)/;
					var match = myregexp.exec(element.getAttribute("onclick"));
					if (match != null) {
						var onclickCode = match[0];
						t.ajaxhelpResearch(element,onclickCode);
						return;
					}
				}
			}
		}
		//Hide Help Requests in the Alliance Chat
		if(Options.pbahelphide) {
			var ChatBox1 = document.getElementById('mod_comm_list1');			
			var ChatBox2 = document.getElementById('mod_comm_list2');			
			var alist1 = ChatBox1.getElementsByTagName('a');
			var alist2 = ChatBox2.getElementsByTagName('a');
			for (var i = 0; i < alist1.length ; i++) {
				var element = alist1[i];
				var classes = element.getAttribute('class');
				if (classes != 'helpBuild' && classes != 'helpResearch') continue;
				element.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode.parentNode);			
			}
			for (var i = 0; i < alist2.length ; i++) {
				var element = alist2[i];
				var classes = element.getAttribute('class');
				if (classes != 'helpBuild' && classes != 'helpResearch') continue;
				element.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode.parentNode);			
			}			
		}
	},
	
  ajaxhelpBuild : function (e, clickcode){
		var p = clickcode.split(",");
		//My help request?
		if (parseInt(p[1]) == unsafeWindow.g_ajaxsuffix.substr(3)) return;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = parseInt(p[4]);
		params.id = parseInt(p[2]);
		params.level = parseInt(p[3]);
		params.inviterId = parseInt(p[1]);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "helpAllianceFriendBuild.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
				e.innerHTML = rslt.msg;
      },
      onFailure: function (rslt) {
				e.innerHTML = rslt.msg;
      }
    });
  },	

  ajaxhelpResearch : function (e, clickcode){
		var p = clickcode.split(",");
		//My Help Request?
		if (parseInt(p[1]) == unsafeWindow.g_ajaxsuffix.substr(3)) return;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = parseInt(p[4]);
		params.id = parseInt(p[2]);
		params.level = parseInt(p[3]);
		params.inviterId = parseInt(p[1]);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "helpAllianceFriendResearch.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
				e.innerHTML = rslt.msg;
      },
      onFailure: function (rslt) {
				e.innerHTML = rslt.msg;
      }
    });
  },	
}
/************************ Refresh Every X minutes ************************/
var RefreshEvery  = {
  timer : null,
  PaintTimer : null,
  NextRefresh : 0,
  box : null,
  target : null,
  
  init : function (){
		var t = RefreshEvery;
		t.creatediv();
		if (Options.pbEveryMins < 1) Options.pbEveryMins = 1;
		RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  creatediv : function(){
    var t = RefreshEvery;
		t.target = document.getElementById('comm_tabs');
		if(t.target == null){
			setTimeout(t.creatediv, 2000);
			return;
		}
		t.box = document.createElement('div');
		t.box.id = 'font11'
		t.target.appendChild(t.box);
  },
  
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf) {
      t.NextRefresh = unixTime() + (Options.pbEveryMins*60); 
      t.timer = setTimeout (t.Paint, 1000);
    } else {
			t.timer = null;
			t.NextRefresh = 0;
			t.box.innerHTML = '<br><b style="color:white;">&nbsp;&nbsp;'+ getMyAlliance()[1] +'</b>';
		}
  },
  
  doit : function (){
    Logbook.entry(Logs.globallog, 'Reload of GW (in '+ Options.pbEveryMins +' Minutes)');
    reloadGW();
  },
  
  setTimer : function (){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (Options.pbEveryMins < 1) Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  Paint : function(){
		var t = RefreshEvery;
		if(t.timer == null) return;
		now = unixTime();
		var text = '';
		var Left = parseInt(t.NextRefresh - now);
		if ( Left < 0){
			Left = 0;
			t.doit();
		}
		if ( Left < 60) 
			text += '<br>&nbsp;&nbsp;<span style="color:white;">Reload in: </span><b style="color:red;">'+ timestr(Left) +'</b>';
		else 
			text += '<br>&nbsp;&nbsp;<span style="color:white;">Reload in: </span><b style="color: white;">'+ timestr(Left) +'</b>';
			
		t.box.innerHTML = text;
    t.timer = setTimeout (t.Paint, 1000);
  },
}
function reloadGW (server){
	
	if (server) { 
		var serverId = server; 
	} else {
		var serverId = getServerId();
	}
	GM_setValue('pbReloadNow',serverId);
  if (serverId == '??') {
		window.location.reload(true);
	}
  var g = window.location.protocol+'//apps.facebook.com/globalwarfaregame/?s='+serverId;
  var t = '<form target="_top" action="'+ g +'" method="post"><input id="xxpbButReload" type="submit" value="RELOAD"><input type="hidden" name="s" value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 100);
}

function findoptvalue (y) {
	var unit2 = y.substring(1)
	var unit3 = 'unt' + unit2
  return unit3;
}
//returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if (Seed.allianceDiplomacies == null)
    return 'Neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'Friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'Hostile';
  if (aid == Seed.allianceDiplomacies.allianceId)
    return 'My own Alliance';
	return 'Neutral';
};

function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i<200; i++){
    if (b['pos'+i] && b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
    }
  }
	// returns {count, maxlevel}
  return ret;
}

function SliderBar (container, width, height, value, classPrefix, margin){
  var self = this;
  this.listener = null;
  if (value==null)
    value = 0;
  if (!margin)
    margin = parseInt(width*.05);
  this.value = value;
  if (width<20) width=20;
  if (height<5) height=5;
  if (classPrefix == null){
    classPrefix = 'slider';
    var noClass = true;
  }      
  var sliderHeight = parseInt(height/2);  
  var sliderTop = parseInt(height/4);
  this.sliderWidth = width - (margin*2);
    
  this.div = document.createElement ('div');  
  this.div.style.height = height +'px';
  this.div.style.width = width +'px';
  this.div.className = classPrefix +'Cont';
  if (noClass)
    this.div.style.backgroundColor='#ddd';
  
  this.slider = document.createElement ('div');
  this.slider.setAttribute ('style', 'position:relative;');
  this.slider.style.height = sliderHeight + 'px'
  this.slider.style.top = sliderTop + 'px';
  this.slider.style.width = this.sliderWidth +'px';
  this.slider.style.left = margin +'px';
  this.slider.className = classPrefix +'Bar';
  this.slider.draggable = true;
  if (noClass)
    this.slider.style.backgroundColor='#fff';
  
  this.sliderL = document.createElement ('div');
  this.sliderL.setAttribute ('style', 'width:100px; height:100%; position:relative; ');
  this.sliderL.className = classPrefix +'Part';
  this.sliderL.draggable = true;
  if (noClass)
    this.sliderL.style.backgroundColor='#0c0';
  
  this.knob = document.createElement ('div');
  this.knob.setAttribute ('style', 'width:3px; position:relative; left:0px; background-color:#222');
  this.knob.style.height = height +'px';
  this.knob.style.top = (0-sliderTop) +'px';
  this.knob.className = classPrefix +'Knob';
  this.knob.draggable = true;
  this.slider.appendChild(this.sliderL);
  this.sliderL.appendChild (this.knob);
  this.div.appendChild (this.slider);
  container.appendChild (this.div);
  this.div.addEventListener('mousedown',  mouseDown, false);

  this.getValue = function (){
    return self.value;
  }

  this.setValue = function (val){ //todo: range check
    var relX = (val * self.sliderWidth);
    self.sliderL.style.width = relX + 'px';
    self.knob.style.left =  relX + 'px';
    self.value = val;
    if (self.listener)
      self.listener(self.value);
  }
  
  this.setChangeListener = function (listener){
    self.listener = listener;
  }

  function moveKnob (me){
    var relX = me.clientX - self.divLeft;
    if (relX < 0)
      relX = 0;
    if (relX > self.sliderWidth)
      relX = self.sliderWidth;
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px'; //-half knob width!?!?
    self.sliderL.style.width = relX + 'px';
    self.value =  relX / self.sliderWidth;   
    if (self.listener)
      self.listener(self.value);
  }
  function doneMoving (){
    self.div.removeEventListener('mousemove', mouseMove, true);
    document.removeEventListener('mouseup', mouseUp, true);
  }  
  function mouseUp (me){
    moveKnob (me);
    doneMoving();
  }
  
  function mouseDown(me){
    var e = self.slider;
    self.divLeft = 0;
    while (e.offsetParent){ //determine actual clientX
      self.divLeft += e.offsetLeft;
      e = e.offsetParent;
    }
    moveKnob (me);
    document.addEventListener('mouseup',  mouseUp, true);
    self.div.addEventListener('mousemove',  mouseMove, true);
  }
  function mouseMove(me){
    moveKnob (me);
  }
}

function getResourceProduction (cityId){
  var ret = [0,0,0,0,0,0,0,0,0];
  var now = unixTime();
  
  var wilds = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var w = Seed.wilderness["city" + cityId];
  for (var k in w){
    var type = parseInt(w[k].tileType);
    if (type==10 || type==11 || type==12)
      wilds[1] += parseInt(w[k].tileLevel);
    else 
      wilds[type/10] += parseInt(w[k].tileLevel);
  }  
  
  knight = 0;       
  var s = Seed.knights["city" + cityId];
  if (s) {
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];
    if (s){
      var knight = parseInt(s.knightLevel);
    }
  }
  var workerFactor = 1;
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]); //Population
  var w = parseInt(Seed.citystats["city" + cityId]["pop"][3]); //Labor Force
  if (w > c)
    workerFactor = c / w;
  
	//Bonus for Petroleum Laboratory and greenhouse?
	var ELevel = 0;
	var TLevel = 0;
	var bau = Seed.buildings['city'+ cityId];
	for (var g in bau) {
		var b = bau[g];
		if (parseInt(b[0]) == 22) {//Petroleum Lab?
			ELevel = parseInt(b[1]);//Determine Level
		}						
		if (parseInt(b[0]) == 23) {//Greenhouse?
			TLevel = parseInt(b[1]);//Determine Level
		}					
	}	
	if (ELevel == 10) ELevel = 12;
	if (TLevel == 10) TLevel = 12;	
	
  for (var i=1; i<5; i++){
    var usage = Seed.resources["city" + cityId]["rec" + i];
    var items = 0;
    if (parseInt(Seed.bonus["bC1" + i + "00"]["bT1" + i + "01"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
		if (tech == 11) tech = 13;
		if (tech == 10) tech = 11;
		
		var spezial = 0;
		if (ELevel > 0 && i == 2) spezial = ELevel;
		if (TLevel > 0 && i == 1) spezial = TLevel;		
				
		consumption = usage[2];
			
		ret[i] = parseInt((consumption * (1 + tech/10 + knight/100 + items + spezial/10 + wilds[i]/20) * workerFactor));
		
	}
  return ret;  
}
/************ DEBUG WIN *************/
var debugWin = {
  popDebug : null,
  dbDefaultNot : '',
  dbSelect : {},

  doit : function (){ 
    var t = debugWin;    

    function syncBoxes (){
      var div = document.getElementById('dbpoplist');
      for (var i=0; i<div.childNodes.length; i++){
        if (div.childNodes[i].type && div.childNodes[i].type=='checkbox'){
          var name=div.childNodes[i].name.substr(6);
          div.childNodes[i].checked = t.dbSelect[name];
        }
      } 
    }
    function clickedAll (){
      for (var k in t.dbSelect)
        t.dbSelect[k] = true;
      syncBoxes();
    }
    function clickedNone (){
      for (var k in t.dbSelect)
        t.dbSelect[k] = false;
      syncBoxes();
    }
    function clickedDefaults (){
      for (k in t.dbSelect)
        t.dbSelect[k] = false;
      var not = t.dbDefaultNot.split(',');
      for (var i=0; i<not.length; i++)
        t.dbSelect[not[i]] = false;
      syncBoxes();
    }
    function clickedShow (){
      var now = new Date();
      var myseed = unsafeWindow.Object.clone (Seed);
      var div = document.getElementById('dbpoplist');
      for (var i=0; i<div.childNodes.length; i++){
        if (div.childNodes[i].type && div.childNodes[i].type=='checkbox'){
          var name=div.childNodes[i].name.substr(6);
          if (!div.childNodes[i].checked)
            delete myseed[name];
        }
      } 
      WinLog.write ("seed @ "+ unixTime()  +" ("+ now +")\n\n"+ inspect (myseed, 8, 1));
      myseed=null;
    }
    
    function clickedShowScripts (){
      var scripts = document.getElementsByTagName('script');
      for (var i=0; i<scripts.length; i++){
        if (scripts[i].src!=null && scripts[i].src!='')
          WinLog.write ('<A style="color:black; text-decoration:underline;" TARGET=_tab HREF="'+ scripts[i].src +'">'+ scripts[i].src +'</a>');
      }
    }
    
    if (t.popDebug == null){  
      t.popDebug = new CPopup ('db', 0, 0, 400,500, true);
      t.popDebug.getTopDiv().innerHTML = 'DEBUG';
      t.popDebug.getMainDiv().innerHTML = '<DIV><INPUT type=submit id=dbsuball value=ALL> &nbsp; <INPUT type=submit id=dbsubnone value=NONE> &nbsp; \
        <INPUT type=submit id=dbdefaults value=DEFAULTS> &nbsp; <INPUT type=submit id=dbsubdo value=SHOW> &nbsp; <INPUT type=submit id=dbsubscripts value=SCRIPTS></div>\
        <DIV id=dbpoplist style="max-height:400px; height:400px; overflow-y:auto"></div>';
      var div = document.getElementById('dbpoplist');
      for (var k in Seed)
        t.dbSelect[k] = false;
      var not = t.dbDefaultNot.split(',');
      for (var i=0; i<not.length; i++)
        t.dbSelect[not[i]] = false;
      var m = [];
      for (k in t.dbSelect){
        m.push ('<INPUT type=checkbox ');
        m.push ('name="dbpop_');
        m.push (k);
        m.push ('"> &nbsp; ');
        m.push (k);
        m.push ('<BR>');
      }
      div.innerHTML = m.join ('');
      document.getElementById('dbsuball').addEventListener('click', clickedAll, false);
      document.getElementById('dbsubnone').addEventListener('click', clickedNone, false);
      document.getElementById('dbdefaults').addEventListener('click', clickedDefaults, false);
      document.getElementById('dbsubdo').addEventListener('click', clickedShow, false);
      document.getElementById('dbsubscripts').addEventListener('click', clickedShowScripts, false);
      syncBoxes();
    }
    t.popDebug.show (true);
  },
}

function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('Options_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          Options[k][kk] = opts[k][kk];
      else
        Options[k] = opts[k];
    }
  }
}

function readLogs (){
  var serverID = getServerId();
  s = GM_getValue ('Logs_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3));
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          Logs[k][kk] = opts[k][kk];
      else
        Logs[k] = opts[k];
    }
  }
}

function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){
		GM_setValue ('Options_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(Options));
	}, 0);
}

function saveLogs (){
  var serverID = getServerId();
  setTimeout (function (){
		GM_setValue ('Logs_'+serverID+"_"+unsafeWindow.g_ajaxsuffix.substr(3), JSON2.stringify(Logs));
	}, 0);
}

function onUnload (){
  Options.ptWinPos = mainPop.getLocation();
  Options.infWinPos = infoPop.getLocation();
  saveOptions();
	saveLogs();
	Tabs.transport.saveTradeRoutes();
	Tabs.transport.saveTraderState();
	Tabs.build.onUnload();
}

/************  LIB classes/functions .... **************/

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetLeft;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

function formatZahl(zahl, k, fix) {
	if(!k) k = 0;
	var neu = '';
	var dec_point = ',';
	var thousands_sep = '.';
	//Round
	var f = Math.pow(10, k);
	zahl = '' + parseInt(zahl * f + (.5 * (zahl > 0 ? 1 : -1)) ) / f ;
	//Detect Comma
	var idx = zahl.indexOf('.');
	//Add Missing Zeros
	if (fix) {
		zahl += (idx == -1 ? '.' : '' ) + f.toString().substring(1);
  }
	var sign = zahl < 0;
	if (sign) zahl = zahl.substring(1);
	idx = zahl.indexOf('.');
	//Determine Decimal Place
  if  (idx == -1) {
		idx = zahl.length;
	} else {
		neu = dec_point + zahl.substr(idx + 1, k);
	}
  while (idx > 0) {
		if (idx - 3 > 0) {
			neu = thousands_sep + zahl.substring( idx - 3, idx) + neu;
		} else {
			neu = zahl.substring(0, idx) + neu;
		}
		idx -= 3;

	}
	return (sign ? '-' : '') + neu;
}
function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x;
}
function parseIntZero (n){
  n = n.trim();
  if (n == '')
    return 0;
  return parseInt(n, 10);
}

var WinManager = {
  wins : {}, //prefix : CPopup obj
  didHide : [],
  
  
  get : function (prefix){
    var t = WinManager;
    return t.wins[prefix];
  },
  
  add : function (prefix, pop){
    var t = WinManager;
    t.wins[prefix] = pop;
    if (unsafeWindow.cpopupWins == null)
      unsafeWindow.cpopupWins = {};
    unsafeWindow.cpopupWins[prefix] = pop;
  },
  
  hideAll : function (){
    var t = WinManager;
    t.didHide = [];
    for (k in t.wins){
      if (t.wins[k].isShown()){
        t.didHide.push (t.wins[k]);
        t.wins[k].show (false);
      }
    }
  },
  restoreAll : function (){
    var t = WinManager;
    for (var i=0; i<t.didHide.length; i++)
      t.didHide[i].show (true);
  },
  
  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
    delete unsafeWindow.cpopupWins[prefix];
  }    
}

function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 200000;
    
  //protos
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainDiv = getMainDiv;
  this.getLayer = getLayer;
  this.setLayer = setLayer;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.focusMe = focusMe;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;
  this.autoHeight = autoHeight;

  //object vars
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'CPopup ptTabs '+ prefix +'_CPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX 
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = '';
  this.div.style.maxHeight = height + 'px';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;

	var m = [];
	m.push('<table cellspacing="0" width="100%" height="100%">');
  m.push('<tr id="'+ prefix +'_bar" class="'+ topClass +'">');
	m.push('<td valign="bottom">');
	m.push('<span id="'+ prefix +'_top"></span>');
	m.push('</td>');
	m.push('<td id='+ prefix +'_X valign="top" onmouseover="this.style.cursor=\'pointer\'" style="width:13px; text-align:center; color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td>');
	m.push('</tr>');
	m.push('<tr>');
	m.push('<td height="100%" valign="top" class="'+ prefix +'_CPopMain" colspan="2">');
	m.push('<div class="CPopMain '+ prefix +'_CPopMain" id="'+ prefix +'_main"></div>');
	m.push('</td>');
	m.push('</tr>');
	m.push('</table>');
  document.body.appendChild(this.div);
  this.div.innerHTML = m.join('');
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);
  
  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);
  
  function e_divClicked (){
    t.focusMe();
  }  
  function e_XClose (){
    t.show(false);
    if (t.onClose != null)
      t.onClose();
  }
  function autoHeight (onoff){
    if (onoff)
      t.div.style.height = '';  
    else
      t.div.style.height = t.div.style.maxHeight;
  }
  function focusMe (){
    t.setLayer(5);
    for (k in unsafeWindow.cpopupWins){
      if (k != t.prefix)
        unsafeWindow.cpopupWins[k].unfocusMe(); 
    }
  }
  function unfocusMe (){
    t.setLayer(-5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }
  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }
  function destroy (){
    document.body.removeChild(t.div);
    WinManager.delete (t.prefix);
  }
  function centerMe (parent){
    if (parent == null){
      var coords = getClientCoords(document.body);
    } else
      var coords = getClientCoords(parent);
    var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
    var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
    if (x<0)
      x = 0;
    if (y<0)
      y = 0;
    t.div.style.left = x +'px';
    t.div.style.top = y +'px';
  }
  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }
  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }
  function show(tf){
    if (tf){
      t.div.style.display = 'block';
      t.focusMe ();
    } else {
      t.div.style.display = 'none';
    }
    return tf;
  }
  function toggleHide(t){
    if (t.div.style.display == 'block') {
      return t.show (false);
    } else {
      return t.show (true);
    }
  }
}

function CWinDrag (clickableElement, movingDiv, enabled) {
  var t=this;
  this.setEnable = setEnable;
  this.setBoundRect = setBoundRect;
  this.debug = debug;
  this.dispEvent = dispEvent;
  this.lastX = null;
  this.lastY = null;
  this.enabled = true;
  this.moving = false;
  this.theDiv = movingDiv;
  this.body = document.body;
  this.ce = clickableElement;
  this.moveHandler = new CeventMove(this).handler;
  this.outHandler = new CeventOut(this).handler;
  this.upHandler = new CeventUp(this).handler;
  this.downHandler = new CeventDown(this).handler;
  this.clickableRect = null;
  this.boundRect = null;
  this.bounds = null;
  this.enabled = false;
  if (enabled == null)
    enabled = true;
  this.setEnable (enabled);

  function setBoundRect (b){ //this rect (client coords) will not go outside of current body
    this.boundRect = boundRect;
    this.bounds = null;
  }

  function setEnable (enable){
    if (enable == t.enabled)
      return;
    if (enable){
      clickableElement.addEventListener('mousedown',  t.downHandler, false);
      t.body.addEventListener('mouseup', t.upHandler, false);
    } else {
      clickableElement.removeEventListener('mousedown', t.downHandler, false);
      t.body.removeEventListener('mouseup', t.upHandler, false);
    }
    t.enabled = enable;
  }

  function CeventDown (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.bounds == null){
        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
      }
      if (me.button==0 && t.enabled){
        t.body.addEventListener('mousemove', t.moveHandler, true);
        t.body.addEventListener('mouseout', t.outHandler, true);
        t.lastX = me.clientX;
        t.lastY = me.clientY;
        t.moving = true;
      }
    }
  }

  function CeventUp  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0){
        t.moveHandler (me);
      }
    }
  }

  function CeventMove (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.enabled && !t.wentOut){
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
        if (newTop < t.bounds.top){ //if out-of-bounds
          newTop = t.bounds.top;
          _doneMoving(t);
        } else if (newLeft < t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } else if (newLeft > t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } else if (newTop > t.bounds.bot){
          newTop = t.bounds.bot;
          _doneMoving(t);
        }
        t.theDiv.style.top = newTop + 'px';
        t.theDiv.style.left = newLeft + 'px';
        t.lastX = me.clientX;
        t.lastY = me.clientY;
      }
    }
  }

  function debug  (msg, e){
    logit ("*************** "+ msg +" ****************");
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
  }

  function dispEvent (msg, me){
    logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
  }
}

function inspect(obj, maxLevels, level, doFunctions){
  var str = '', type, msg;
  if(level == null)  level = 0;
  if(maxLevels == null) maxLevels = 1;
  if(maxLevels < 1)
      return 'Inspect Error: Levels number must be > 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i<level; i++)
    indent += '  ';
  for(property in obj) {
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);//recurse
    }
    catch(err) {
	  //Is there some properties in obj we can't access? Print it red.
      if(typeof(err) == 'string') msg = err;
      else if(err.message)        msg = err.message;
      else if(err.description)    msg = err.description;
      else                        msg = 'Unknown';
      str += '(Error) ' + property + ': ' + msg +"\n";
    }
  }
  str += "\n";
  return str;
}

Array.prototype.compare = function(testArr) {
	if (this.length != testArr.length) return false;
	for (var i = 0; i < testArr.length; i++) {
		if (this[i].compare) {
			if (!this[i].compare(testArr[i])) return false;
		}
		if (this[i] !== testArr[i]) return false;
	}
	return true;
}
Array.prototype.exists = function(o) {
	for(var i = 0; i < this.length; i++)
		if(this[i] === o)
			return true;
	return false;
}
String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039' };
String.prototype.htmlSpecialChars = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}
String.prototype.htmlSpecialCharsDecode = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret = ret.split(this.entityTrans[k]).join(k);
  return ret;
}
String.prototype.trim = function (ws) {
    if(!this.length) return "";
    var tmp = this.stripNL().ltrim().rtrim();
    if(ws) return tmp.replace(/ +/g, ' ');
    else return tmp;
}
String.prototype.rtrim = function () {
    if(!this.length) return "";
    return this.replace(/\s+$/g, '');
}

String.prototype.ltrim = function () {
    if(!this.length) return "";
    return this.replace(/^\s+/g, '');
}
String.prototype.stripNL = function () {
    if(!this.length) return "";
    return this.replace(/[\n\r]/g, '');
}
String.prototype.stripTags =  function(){
	var tmp = this.replace(/(<.*['"])([^'"]*)(['"]>)/g, function(x, p1, p2, p3) { return  p1 + p3;});
	return tmp.replace(/<\/?[^>]+>/gi, '');
}

function mouseMainTab (me){//right-click on main button resets window location
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('gor_menu_bar'));
    mainPop.setLocation ({x: c.width +4, y: 0});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    tabManager.showTab();
    Options.ptWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.ptWinIsOpen = false;
  }
  saveOptions();
}
function eventHideShow2() {
	GM_log('hideshow2'+inspect(infoPop.div));
  if (infoPop.toggleHide(infoPop)){
    tabManager2.showTab();
    Options.infWinIsOpen = true;
  } else {
    tabManager2.hideTab();
    Options.infWinIsOpen = false;
  }
  saveOptions();
}

function createButton (label){
  var a=document.createElement('a');
  a.className='tab buttontab';
  a.innerHTML='<span class="left"></span><span class="right"></span>';
  a.innerHTML+='<span class="mid">'+ label +'</span>';
  a.style.width='78px';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var tabs=document.getElementById('kochead');
  if(!tabs) {
    tabs=document.getElementById('gor_menu_bar');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if(!tabs){
	setTimeout(function(){ AddMainTabLink(text, eventListener, mouseListener);}, 200);
  }
  if (tabs) {
    var a = createButton (text);
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      tabs.parentNode.insertBefore(gmTabs, tabs);			
      gmTabs.style.whiteSpace = 'nowrap';
      gmTabs.style.width = '78px';
	  gmTabs.style.height = '20px';
      gmTabs.style.padding = '0';
	  gmTabs.style.position = 'absolute';
	  gmTabs.style.top = '3px';
	  gmTabs.style.left = '320px';
	  gmTabs.style.zIndex = '160000';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}
function NewButton() {
  AddSubTabLink('INFO', eventHideShow2, 'pbinfo');
}
function AddSubTabLink (text, eventListener, id) {
  var a = createButton (text);
  var tabs=document.getElementById('kochead');
  if(!tabs) {
    tabs=document.getElementById('gor_menu_bar');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
	  gmTabs.styl.background = 'red'
      //tabs.parentNode.insertBefore(gmTabs, tabs);
      gmTabs.style.whiteSpace = 'nowrap';
      gmTabs.style.width = '70px';
	  gmTabs.style.height = '20px';
      gmTabs.style.padding = '0 25px 0 25px';
	  gmTabs.style.position = 'absolute';
	  gmTabs.style.top = '3px';
	  gmTabs.style.left = '320px';
	  gmTabs.style.marginLeft = '640px';
	  gmTabs.style.zIndex = '160000';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
	a.style.padding = '0';
	a.style.position = 'absolute';
	a.style.top = '0px';
	a.style.left = "80px";
    if (id != null)
      a.id = id;
    return a;
  }
  return null;
}
function searchDOM (node, condition, maxLevel, doMult){
    var found = [];
    eval ('var compFunc = function (node) { return ('+ condition +') }');
    doOne(node, 1);
    if(!doMult){
      if (found.length==0)
        return null;
      return found[0];
    }
    return found;
    function doOne (node, curLevel){
      try {
        if (compFunc(node))
          found.push(node);
      } catch (e){
      }      
      if (!doMult && found.length>0)
        return;
      if (++curLevel<maxLevel && node.childNodes!=undefined)
        for (var c=0; c<node.childNodes.length; c++)
          doOne (node.childNodes[c], curLevel);
    }
}


/******************************************************************************************/
/*  Ajax Functions                                                                       */
/******************************************************************************************/
function AjaxRequest (url, opts, timeout){
	var headers = {
		'X-Requested-With': 'XMLHttpRequest',
		'X-Prototype-Version': unsafeWindow.Prototype.Version,
		'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
		'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
	};
	if (!timeout) var timeout = 30000;
	var toTimer = null;
	var ajax = null;
	ajax = new XMLHttpRequest();
  
	ajax.onreadystatechange = function(){
		if (ajax.readyState == 4) {
			clearTimeout(toTimer);		
			if (ajax.status >= 200 && ajax.status < 305) 
				if (opts.onSuccess) opts.onSuccess(ajax);				
			else
				if (opts.onFailure) opts.onFailure(ajax);
		} else {
			if (opts.onChange) opts.onChange (ajax);
		}
	}  
    
	ajax.open('POST', url, true);

	for (var k in headers) {
		ajax.setRequestHeader (k, headers[k]);
	}
  
	if (matTypeof(opts.requestHeaders)=='object') {
		for (var k in opts.requestHeaders) {
			ajax.setRequestHeader (k, opts.requestHeaders[k]);
		}
	}    

	var a = [];
	for (var k in opts.parameters) {
		if (matTypeof(opts.parameters[k]) == 'object') {
			for (var h in opts.parameters[k]) {
				a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
			}
		}	else {
			a.push (k +'='+ opts.parameters[k]);
		}
	}
	var toTimer = setTimeout(onTimeout, timeout);
	ajax.send(a.join ('&'));
	
	function onTimeout() {
		ajax = null;
		Logbook.entry(Logs.globallog,'AJAX Error: <span class="boldRed">The server is taking too long to send a reply.</span>');
		if (opts.onFailure) opts.onFailure(ajax);		
	}
}

function MyAjaxRequest (url, o, noRet){
	var opts = unsafeWindow.Object.clone(o);
	var wasSuccess = o.onSuccess;
	var wasFailure = o.onFailure;
	var retry = 0;
	var maxRetry = 3;
	var delay = 4;
	var noRetry = noRet===true?true:false;
	opts.onSuccess = mySuccess;
	opts.onFailure = myFailure;

	new AjaxRequest(url, opts);
	return;

	function myRetry(){
		++retry;
		if (retry >= maxRetry) {
			Logbook.entry(Logs.globallog,'AJAX Error: <span class="boldRed">Too many repetitions</span>');
			var o = {};
			o.ok = false;
			o.errorMsg = "AJAX Fehler: Zu viele Wiederholungen";
			wasFailure (o);
		} else {
			new AjaxRequest(url, opts);
			delay = delay * 1.25;
		}
	}
	
	function myFailure(){
		var o = {};
		o.ok = false;
		o.errorMsg = "AJAX Communication Error";
		wasFailure (o);
	}
	
	function mySuccess (msg){
		var rslt = eval("(" + msg.responseText + ")");
		var x;
		if (window.EmulateAjaxError) {
			rslt.ok = false;  
			rslt.error_code = 8;
		}
		if (rslt.ok) {
			try {
				if (rslt.updateSeed) unsafeWindow.update_seed(rslt.updateSeed);
			} catch (e) {}
			wasSuccess(rslt);				
			return;
		}
		//Not OK
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    if (!noRetry && 
				(rslt.error_code == 0 || 
				 rslt.error_code == 1 || 
				 rslt.error_code == 3 || 
				 rslt.error_code == 8)) {
			Logbook.entry(Logs.globallog,'AJAX Error: The request will be repeated automatically.<br><span class="boldRed">'+rslt.errorMsg+'</span>');	 
			setTimeout(myRetry, parseInt(delay*1000));
    } else {
      wasSuccess (rslt);
    }
  }
}

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}


var myServerId = null;
function getServerId() {
  if (myServerId == null){
    var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
    if (m)
      myServerId = m[1];
    else
      myServerId = '??';
  }
  return myServerId;
}
 
function setCities(){
  Cities.numCities = Seed.cities.length;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){
    city = {};
    city.idx = i;
    city.id = parseInt(Seed.cities[i][0]);
    city.name = Seed.cities[i][1];
    city.x = parseInt(Seed.cities[i][2]);
    city.y = parseInt(Seed.cities[i][3]);
    city.tileId = parseInt(Seed.cities[i][5]);
    city.provId = parseInt(Seed.cities[i][4]);
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}

var tabManager = {
  tabList : {}, //{name, obj, div}
  currentTab : null,
  
  init : function (mainDiv){
    var t = tabManager;
    var sorter = [];
    for (k in Tabs){
      if (!Tabs[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs[k].tabOrder != null)
          sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        t.tabList[k].div = document.createElement('div');
      }
    }

	sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<table cellspacing="1" class="ptMainTab"><tr>';
    for (var i=0; i<sorter.length; i++) {
      m += '<td style="text-align:center;" class="notSel" id="pttc'+ sorter[i][1].name +'"><a><span>'+ sorter[i][1].label +'</span></a></td>';
      //if (i==7) m+='</tr><tr>';
    }
    m+='</tr></table>';  
    mainPop.getTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab = t.tabList[k] ;
      document.getElementById('pttc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div;
      div.style.display = 'none';
      div.style.height = '100%';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "Failed to Initialize: "+ '<pre>'+ e.name +' : '+ e.message +' : Line:'+e.lineNumber+'</pre>';
      }
    }
    
    if (t.currentTab == null)
      t.currentTab = sorter[0][1];    
    t.setTabStyle (document.getElementById ('pttc'+ t.currentTab.name), true);
    t.currentTab.div.style.display = 'block';
  },
  
  hideTab : function (){
    var t = tabManager;
    t.currentTab.obj.hide();
  },
  
  showTab : function (){
    var t = tabManager;
    t.currentTab.obj.show();
  },
    
  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager;
    newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('pttc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pttc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}

var tabManager2 = {
  tabList : {}, //{name, obj, div}
  currentTab2 : null,
  
  init : function (mainDiv){
    var t = tabManager2;
    var sorter = [];
    for (k in Tabs2){
      if (!Tabs2[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs2[k];
        if (Tabs2[k].tabLabel != null)
          t.tabList[k].label = Tabs2[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs2[k].tabOrder != null)
          sorter.push([Tabs2[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        t.tabList[k].div = document.createElement('div');
      }
    }

	sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<table cellspacing="1" class=infMainTab><tr>';
    for (var i=0; i<sorter.length; i++) {
      m += '<td style="text-align:center;" class="notSel" id="pttc'+ sorter[i][1].name +'"><a><span>'+ sorter[i][1].label +'</span></a></td>';
      //if (i==7) m+='</tr><tr>';
    }
    m+='</tr></table>';  
    infoPop.getTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab2)
        t.currentTab2 = t.tabList[k] ;
      document.getElementById('pttc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div;
      div.style.display = 'none';
      div.style.height = '100%';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "Failed to Initialize: "+ '<pre>'+ e.name +' : '+ e.message +' : Line:'+e.lineNumber+'</pre>';
      }
    }
    
    if (t.currentTab2 == null)
      t.currentTab2 = sorter[0][1];    
    t.setTabStyle (document.getElementById ('pttc'+ t.currentTab2.name), true);
    t.currentTab2.div.style.display = 'block';
  },
  
  hideTab : function (){
    var t = tabManager2;
    t.currentTab2.obj.hide();
  },
  
  showTab : function (){
    var t = tabManager2;
    t.currentTab2.obj.show();
  },
    
  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager2;
    newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab2.name != newTab.name){
      t.setTabStyle (document.getElementById ('pttc'+ t.currentTab2.name), false);
      t.setTabStyle (document.getElementById ('pttc'+ newTab.name), true);
      t.currentTab2.obj.hide ();
      t.currentTab2.div.style.display = 'none';
      t.currentTab2 = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab2 = newTab.name;      
    }
    newTab.obj.show();
  },
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.ptWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.ptWinIsOpen = true;
  saveOptions();
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

function matTypeof (v){
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
//    else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object Array]')
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}

function addCommasInt(n){
  nStr = parseInt(n) + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) {
    nStr = nStr.replace(rgx, '$1' + ',' + '$2');
  }
  return nStr;
}

function addCommas(nStr){
  nStr += '';
  x = nStr.split(',');
  x1 = x[0];
  x2 = x.length > 1 ? ',' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function AbbrNum(number){
    var STR=number;
    var M=1000000;
    var B=M*1000;
    var T=B*1000;

    if (number>=T)     { STR = (number/T).toPrecision(3) + "T"; number=0; }
    if (number>=B)     { STR = (number/B).toPrecision(3) + "Mlr."; number=0; }
    if (number>=M)     { STR = (number/M).toPrecision(3) + "Mly."; number=0; }
    if (number>=10000) { STR = Math.round(number/1000)   + "Bin"; number=0; }
    return(STR);
}

function htmlSelector (valNameObj, curVal, tags){
  m = [];
  m.push ('<select');
  if (tags){
    m.push (' ');
    m.push (tags);
  }
	m.push ('>');
  for (k in valNameObj){
    m.push ('<option ');
    if (k == curVal)
      m.push ('selected="selected" ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');
}

function unixTime (){
  return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}
function htmlOptions (a, curVal){
  m = '';
  for (k in a)
    m += '<option value="'+ k +'"'+ (k==curVal?' selected="selected"':'')  +'>'+ a[k] +'</option>';
  return m;
}
function getFunctionName (func){
  var name=/\W*function\s+([\w\$]+)\(/.exec(func);
  if (!name)
    return '';
  return name[1];
}

function findAllBetween (txt, find1, find2){
  var m = [];
  var last = 0;
  while ( (i1=txt.indexOf(find1, last))>=0 && (i2=txt.indexOf (find2, i1))>=0 ) {
    m.push (txt.substring(i1+find1.length, i2));
    last = i2 + find2.length;
  }
  return m;
}

function strUpTo (s, find){
  var i = s.indexOf(find);
  if (i > 0)
    return s.substr(0, i);
  return s;
}

/********
 Xd Xh
 Xh Xm
 Xm Xs
 Xs
********/
function timestrShort(time) {
  time = parseInt (time);
  if (time > 86400){
    var m = [];
    time /= 3600;
    m.push (parseInt(time/24));
    m.push ('D ');
    m.push (parseInt(time%24));
    m.push ('h ');
    return m.join ('');    
  } else
    return timestr (time);
}

/**********************
 part       full
 Xd Xh Xm   Xd Xh Xm Xs
 Xh Xm      Xh Xm Xs
 Xm Xs      Xm Xs
 Xs         Xs
**********************/
function timestr(time, full) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  t + 's';
  if (t > 86400){
    m.push (parseInt(t/86400));
    m.push ('D ');
    t %= 86400;
  }  
  if (t>3600 || time>3600){
    m.push (parseInt(t/3600));
    m.push ('h ');
    t %= 3600;
  }  
  m.push (parseInt(t/60));
  m.push ('m');
  if (full || time<=3600 ){
    m.push (' ');
    m.push (t%60);
    m.push ('s');  
  }
  return m.join ('');
}

function logit (msg, force){
	if(!DEBUG_TRACE && !force) return false;
	var now = new Date();
	var prefix = getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds();
	msg = prefix+" : "+msg;
	if (typeof GM_log !== 'undefined') { GM_log(msg); return true; }
	if (typeof console !== 'undefined' && console.log) { console.log(msg); return true; }
	return false;
}

/************  LIB singletons .... **************/
//TODO: fix REopening window
var WINLOG_MAX_ENTRIES = 1000; //TODO
var WinLog = {
  state : null,
  win: null,
  eOut : null,
  lastE : null,
  enabled : true,
  reverse : true,
  busy : false,
  isOpening : false,

  open : function (){
    var t = WinLog;

    function eventButClear(){
      var t = WinLog;
      t.lastE = null;
      t.eOut.innerHTML ='';
    }
    function eventButReverse(){
      var t = WinLog;
      if (t.busy)
        return;
      t.busy = true;
      if (t.reverse){
        t.win.document.getElementById('wlRev').value= 'Top';
        t.reverse = false;
      } else{
        t.win.document.getElementById('wlRev').value= 'Bottom';
        t.reverse = true;
      }
      var n = t.eOut.childNodes.length;
      if (n < 2)
        return;
      for (i=n-2; i>=0; i--){
        t.eOut.appendChild (t.eOut.childNodes[i]);
      }
      t.busy = false;
    }

    if (!t.win || t.win.closed){
			t.isOpening = true;  
			//Firefox bug? It appears as if a new thread is started on open, without reusing the same window
			//t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
			t.win = new CPopup('ptwinlog', 0, 0, 500, 800, true, function(){t.win.destroy(); t.win=null; t.win.closed=true;});
			t.win.show(true);
			t.isOpening = false; 
			t.state = null; 
    }

    if (t.state == null){
		
      t.win.getMainDiv().innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; overflow-x:auto; max-height:800px; width:600px"></div></body>';
      t.win.getTopDiv().innerHTML = 'Info';
			document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  document.getElementById('wlOut');
      t.lastE = null;
      t.state = 1;
    }
  },

  writeText : function (msg){
    WinLog.write (msg.htmlEntities()); 
  },

  write : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.open();
    var te = document.createElement('pre');
    var now = new Date();
    var m = [];
    var millis = now.getMilliseconds();
    m.push (now.toTimeString().substring (0,8));
    m.push ('.');
    if (millis<100)
      m.push('0');
    if (millis<10)
      m.push('0');
    m.push(millis);
    m.push (': ');
    m.push (msg);
    te.innerHTML = m.join('');

    if (t.reverse){
      if (t.lastE == null){
        t.eOut.appendChild(te);
        t.lastE = te;
      } else {
        t.eOut.insertBefore(te, t.lastE);
      }
      var hr = document.createElement('hr');
      t.eOut.insertBefore(hr, te);
      t.lastE = hr;
    } else {
      t.eOut.appendChild(te);
      t.eOut.appendChild(document.createElement('hr'));
    }
  },
};

function SortTable(theTable) {
	var up = String.fromCharCode(9660);
	var down = String.fromCharCode(9650);
	var pointer_color = '#000';
	var pointer_color_act = 'red';	
	var zebra = /\bzebra\b/i.test(theTable.className);
	var tableBody = theTable.tBodies[0];
	var header = theTable.tHead;
	var clicker = [];
	var desc = 1;
	
	//The header row with the events and the marker provided
	var th = header.rows[0].cells;
	
	for(var i = 0; i < th.length; i++) {
		//The column should be sorted
		if(th[i].className && /\bno_sort\b/i.test(th[i].className)) continue;
		
		var ignoreCase = th[i].getAttribute('ignore_case');
		var forceString = th[i].className;

		//The insert pointer
		var pointer = document.createElement('span');
		pointer.style.fontFamily = 'Arial';
		pointer.style.fontSize = '70%';
		pointer.style.color = pointer_color;
		pointer.innerHTML = ' '+down;
		var span1 = th[i].appendChild(pointer);
		span1.style.cursor = 'pointer';
		span1.setAttribute('sortsp',i);
		span1.setAttribute('sortsd','1');
		span1.setAttribute('ignoreCase',ignoreCase);
		span1.setAttribute('forceString',forceString);		
		span1.addEventListener('click', oclick, false);		
		var pointer = document.createElement('span');
		pointer.style.fontFamily = 'Arial';
		pointer.style.fontSize = '70%';
		pointer.style.color = pointer_color;
		pointer.innerHTML = ' '+up;	
		var span2 = th[i].appendChild(pointer);		
		span2.style.cursor = 'pointer';
		span2.setAttribute('sortsp',i);
		span2.setAttribute('sortsd','-1');
		span2.setAttribute('ignoreCase',ignoreCase);
		span2.setAttribute('forceString',forceString);			
		span2.addEventListener('click', oclick, false);
		clicker.push(span1);
		clicker.push(span2);	
	}

	//auxiliary functions
	function oclick() {
		var ignoreCase = (this.getAttribute('ignore_case') == 'ignore_case');
		var forceString = !!(this.getAttribute && /\bsort_string\b/i.test(this.getAttribute));
		var spalte = this.getAttribute('sortsp');
		var direction = this.getAttribute('sortsd');
		var ok = sort(spalte, direction, ignoreCase, forceString);
		if (ok) {
			for (var i = 0; i < clicker.length ; i++) {
				clicker[i].style.color = pointer_color;
			}
			this.style.color = pointer_color_act;
		}
	};
	 	 
	function getValue(el, ignoreCase, forceString) {
		if (el.getAttribute('my_key')) return parseFloat(el.getAttribute('my_key'));
		var val = el.innerHTML.stripTags().trim();
		if(forceString) return ignoreCase ? val.toLowerCase() : val;
		return val == parseFloat(val) ? parseFloat(val) : val //Number
	}

	//The sort function sorts the specified column.
	function sort(spalte, desc, ignoreCase, forceString) { 
		//The rows of the table cache
		try {
			var rows = [];
			var tr = tableBody.rows;
			var tr_length = tableBody.rows.length;

			for(var i = 0; i < tr_length; i++) {
				rows.push(
				{
					elem: tr[i], 
					value: getValue(tr[i].cells[spalte], ignoreCase, forceString) 
				});
			}
			//Sort
			rows.sort( function (a, b) {
				return  a.value.localeCompare ?  desc * a.value.localeCompare(b.value) :
				a.value == b.value ? 0 :
				a.value > b.value ? desc : -desc;
			});

			//Clone
			var tCopy = tableBody.cloneNode(false);
			for(var i = 0; i < tr_length; i++) {
				if(zebra) {
					rows[i].elem.className = rows[i].elem.className.replace(/( ?odd)/, "");
					if(i % 2) rows[i].elem.className += ' odd' ;
				}
				tCopy.appendChild(rows[i].elem);
			}
			tableBody.parentNode.replaceChild(tCopy, tableBody);
			tableBody = tCopy;
			return true;
		} catch (e) { alert('Please wait a few seconds. Some functions are slow in the browser... :-)'); }
	}
}

function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "ptcastleBut ptcastleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "ptcastleBut ptcastleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.x, that.city.y);
    }
  }

  function selectBut (idx){
    document.getElementById(this.id+'_'+idx).click();
  }

  function bindToXYboxes (eX, eY){
    function CboxHandler (t){
      var that = t;
      this.eventChange = eventChange;
      if (that.city){
        eX.value = that.city.x;
        eY.value = that.city.y;
      }
      function eventChange (){
			var xValue=that.coordBoxX.value.trim();
			var xI=/^\s*([0-9]+)[\s,]+([0-9]+)/.exec(xValue); 		
			if(xI) {
				that.coordBoxX.value=xI[1]
				that.coordBoxY.value=xI[2]
			}
        var x = parseInt(that.coordBoxX.value, 10);
        var y = parseInt(that.coordBoxY.value, 10);
        if (isNaN(x) || x<0 || x>750){
          that.coordBoxX.style.backgroundColor = '#ff8888';
          return;
        }
        if (isNaN(y) || y<0 || y>750){
          that.coordBoxY.style.backgroundColor = '#ff8888';
          return;
        }
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
        if (that.notify != null)
          that.notify (null, x, y);
      }
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.size=2;
    eX.maxLength=10;
    eY.size=2;
    eY.maxLength=3;
    eX.addEventListener('change', bh.eventChange, false);
    eY.addEventListener('change', bh.eventChange, false);
  }

  this.selectBut = selectBut;
  this.bindToXYboxes = bindToXYboxes;
  this.coordBoxX = null;
  this.coordBoxY = null;
  this.id = id;
  this.dispName = dispName;
  this.prefixLen = id.length+1;
  this.notify = notify;
  this.selected = null;
  this.city = null;
  var m = '';
  for (var i=0; i<Cities.cities.length; i++)
    m += '<INPUT class="ptcastleBut ptcastleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};

function Sound(file, callback, endedcallback) {
	var instance = this;
	instance.element = new Audio();
	instance.loaded = false;
	instance.err = false;
	instance.endedcallback = false;
	if (endedcallback) instance.endedcallback = endedcallback;

	instance.get = function(property) { return instance.element[property]; };

	instance.set = function(property, value) { instance.element[property] = value; };

	instance.play = function() {
		instance.element.addEventListener('ended', instance.end);			
		instance.element.play();

	};

	instance.pause = function() {
		instance.element.pause();
	};

	instance.stop = function() {
		instance.element.pause();
		instance.set('currentTime', 0);
	};

	instance.load = function(file, callback) {
		instance.loaded = false;
		instance.err = false;
		var loadedHandler = function() {
			instance.loaded = true;
			instance.element.removeEventListener('canplaythrough', loadedHandler);
			if(callback) {
				callback.apply(instance);
			}
		};
		var errorHandler = function() {
			instance.loaded = false;
			instance.err = true;
			instance.element.removeEventListener('error', errorHandler);		
			if(callback) {
				callback.apply(instance);
			}
		};
		instance.element.addEventListener('canplaythrough', loadedHandler);
		instance.element.addEventListener('error', errorHandler);
		instance.set('src', file);
		instance.element.load();
	};

	instance.end = function() {
		instance.element.removeEventListener('ended', instance.end);
		if (instance.endedcallback) instance.endedcallback;
	}
	
	if(file) {
		instance.load(file, callback);
	}
}

setTimeout(ptStartup, 8000);