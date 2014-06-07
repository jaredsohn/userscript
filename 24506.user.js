var fileMETA=<><![CDATA[
// ==UserScript==
// @name          iwiw TOOLS v2 (Greasemonkey)
// @description   iwiw TOOLS - Tegyük jobbá az iWiW-et!
// @version       2.4.18
// @copyright     2008-2011 pzs
// @namespace     http://userscripts.org/scripts/show/24506
// @include       http://www.iwiw.hu/*
// @include       http://iwiw.hu/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @debug         0
// ==/UserScript==
]]></>.toString();


// Operához, bár nem igazán megy benne... (copyright 2009, 2010 James Campos)
if(typeof GM_deleteValue == 'undefined') {
    GM_addStyle=function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    GM_deleteValue=function(name) {
        localStorage.removeItem(name);
    }
    GM_getValue=function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }
    GM_log=function(message) {
        console.log(message);
    }
    GM_openInTab=function(url) {
        return window.open(url, "_blank");
    }
    GM_registerMenuCommand=function(name, funk) {
        // todo
    }
    GM_setValue=function(name, value) {
        value=(typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
    unsafeWindow=window;
}

// meta blokk feldolgozása
// forrás: https://github.com/Martii/greasemonkey/wiki/greasemonkey-manual-metadata-block
function parseHeaders(metadataBlock){
    var headers = {};
    //alert(metadataBlock);
    var line, name, prefix, header, key, value;
    var lines = metadataBlock.split(/\n/);//.filter(/\/\/ @/);
    for each (line in lines) {
        try{
            [, name, value] = line.match(/\/\/ @(\S*)\s*(.*)/);
            switch (name) {
                case "licence":
                    name = "license";
                    break;
            }
            [key, prefix] = name.split(/:/).reverse();
            if (prefix) {
                if (!headers[prefix])
                headers[prefix] = new Object;
                header = headers[prefix];
            }else
                header = headers;
            if (header[key]) {
                if (!(header[key] instanceof Array)) header[key] = new Array(header[key]);
                header[key].push(value);
            }else header[key] = value;
        }catch(ex){}
    }
    headers["licence"] = headers["license"];
    return headers;
}


// iwiw TOOLS:
(function(){

    var META=parseHeaders(fileMETA);
    var VERSION='v'+META.version;
	var DEBUG=META.debug=="1" || META.debug=="true";
    var start_time=new Date();


var $2=unsafeWindow.jQuery;

// JSON 2.2 http://code.google.com/p/jquery-json/
(function($){$.toJSON=function(o){if(typeof(JSON)=='object'&&JSON.stringify)return JSON.stringify(o);var type=typeof(o);if(o===null)return"null";if(type=="undefined")return undefined;if(type=="number"||type=="boolean")return o+"";if(type=="string")return $.quoteString(o);if(type=='object'){if(typeof o.toJSON=="function")return $.toJSON(o.toJSON());if(o.constructor===Date){var month=o.getUTCMonth()+1;if(month<10)month='0'+month;var day=o.getUTCDate();if(day<10)day='0'+day;var year=o.getUTCFullYear();var hours=o.getUTCHours();if(hours<10)hours='0'+hours;var minutes=o.getUTCMinutes();if(minutes<10)minutes='0'+minutes;var seconds=o.getUTCSeconds();if(seconds<10)seconds='0'+seconds;var milli=o.getUTCMilliseconds();if(milli<100)milli='0'+milli;if(milli<10)milli='0'+milli;return'"'+year+'-'+month+'-'+day+'T'+hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++)ret.push($.toJSON(o[i])||"null");return"["+ret.join(",")+"]";}var pairs=[];for(var k in o){var name;var type=typeof k;if(type=="number")name='"'+k+'"';else if(type=="string")name=$.quoteString(k);else continue;if(typeof o[k]=="function")continue;var val=$.toJSON(o[k]);pairs.push(name+":"+val);}return"{"+pairs.join(", ")+"}";}};$.evalJSON=function(src){if(typeof(JSON)=='object'&&JSON.parse)return JSON.parse(src);return eval("("+src+")");};$.secureEvalJSON=function(src){if(typeof(JSON)=='object'&&JSON.parse)return JSON.parse(src);var filtered=src;filtered=filtered.replace(/\\["\\\/bfnrtu]/g,'@');filtered=filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']');filtered=filtered.replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered))return eval("("+src+")");else throw new SyntaxError("Error parsing JSON, source is not valid.");};$.quoteString=function(string){if(string.match(_escapeable)){return'"'+string.replace(_escapeable,function(a){var c=_meta[a];if(typeof c==='string')return c;c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}return'"'+string+'"';};var _escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;var _meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};})(jQuery);

// Keyboard Shortcuts
shortcut={'all_shortcuts':{},'add':function(shortcut_combination,callback,opt){var default_options={'type':'keypress','propagate':false,'disable_in_input':true,'target':document,'keycode':false};if(!opt)opt=default_options;else{for(var dfo in default_options){if(typeof opt[dfo]=='undefined')opt[dfo]=default_options[dfo]}}var ele=opt.target;if(typeof opt.target=='string')ele=document.getElementById(opt.target);var ths=this;shortcut_combination=shortcut_combination.toLowerCase();var func=function(e){e=e||window.event;
if(opt['disable_in_input']){var element;if(e.target)element=e.target;else if(e.srcElement)element=e.srcElement;if(element.nodeType==3)element=element.parentNode;if(element.tagName=='INPUT'||element.tagName=='TEXTAREA')return}if(e.keyCode)code=e.keyCode;else if(e.which)code=e.which;var character=String.fromCharCode(code).toLowerCase();	if(code==188)character=",";if(code==190)character=".";var keys=shortcut_combination.split("+");var kp=0;var shift_nums={"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"};var special_keys={'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123};var modifiers={shift:{wanted:false,pressed:false},ctrl:{wanted:false,pressed:false},alt:{wanted:false,pressed:false},meta:{wanted:false,pressed:false}};if(e.ctrlKey)modifiers.ctrl.pressed=true;if(e.shiftKey)modifiers.shift.pressed=true;if(e.altKey)modifiers.alt.pressed=true;if(e.metaKey)modifiers.meta.pressed=true;for(var i=0;k=keys[i],i<keys.length;i++){if(k=='ctrl'||k=='control'){kp++;modifiers.ctrl.wanted=true}else if(k=='shift'){kp++;modifiers.shift.wanted=true}else if(k=='alt'){kp++;modifiers.alt.wanted=true}else if(k=='meta'){kp++;modifiers.meta.wanted=true}else if(k.length>1){if(special_keys[k]==code)kp++}else if(opt['keycode']){if(opt['keycode']==code)kp++}else{if(character==k)kp++;else{if(shift_nums[character]&&e.shiftKey){character=shift_nums[character];if(character==k)kp++}}}}if(kp==keys.length&&modifiers.ctrl.pressed==modifiers.ctrl.wanted&&modifiers.shift.pressed==modifiers.shift.wanted&&modifiers.alt.pressed==modifiers.alt.wanted&&modifiers.meta.pressed==modifiers.meta.wanted){callback(e);if(!opt['propagate']){e.cancelBubble=true;e.returnValue=false;if(e.stopPropagation){e.stopPropagation();e.preventDefault()}return false;};};};this.all_shortcuts[shortcut_combination]={'callback':func,'target':ele,'event':opt['type']};if(ele.addEventListener)ele.addEventListener(opt['type'],func,false);else if(ele.attachEvent)ele.attachEvent('on'+opt['type'],func);else ele['on'+opt['type']]=func},'remove':function(shortcut_combination){shortcut_combination=shortcut_combination.toLowerCase();var binding=this.all_shortcuts[shortcut_combination];delete(this.all_shortcuts[shortcut_combination]);if(!binding)return;var type=binding['event'];var ele=binding['target'];var callback=binding['callback'];if(ele.detachEvent)ele.detachEvent('on'+type,callback);else if(ele.removeEventListener)ele.removeEventListener(type,callback,false);else ele['on'+type]=false}};


    // TOOLS media:
    var MEDIA={
        users:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwhJREFUeNqEU21IU1EYfs792HWbjtws3UxdTqfJ5rf2YWERFFIW9ccKC6I/QVFBYX8KhKKf/etnf/pRRFCRFBVaFEElbURZaGnZdKZt1304tt1td6dzLU2E6IGH933ve97nvuec9xAwSIQgT7P4i7Mb6bzlOBSzdC9zqxhHKEVvNgv/wjrexrIGzWEkSwS+hwlIgomKuGKvdnVaSsudMYWunQ3OFXzxo+9nGNDI4R/wzwFDU8TxMwRXIBIpzDFbhE179hi1eMwPByM0CsvqChlPMtoZx1MEkZkQxN7Tp2EwGqGy3rWY57CF5ce0AoEuqWb+uYbW1v3uujrLO49HnnjnjcUTiEo6HZR4HIIoIq5ti0cjW35tXqDd+Xfnzz7TDb2nOqwupxVDn23WrkPesFFEdGx4GPaKCmiWxRpKFmqErc7F+q7BaVNlvduOdDIJzeryTLkOW5QM3Lrpbdq+o9Hz5LE397dAwaJAJrsowHXVKSPJubmNmXQaKuOu+vTH8ZKiYM7ED0uFswrP+27SV901H3NDyUczJSZMFeeCJ7UHQQmHfHVmyChmqksq3U3sQoXwbCD1Mjz6TTrR49TXtFSlFBem26pthVvaC57mBBLhPMGOLP3Cf226jEF9Bx6ZjkClJMB9uLE+lia2V68H/HR3d0XBaod5KpHA2Y6juD3lQemqYpPLXF5roLo13wKT4pI5oM39psM7g/IsaWxuQSQaE++PtL4f90mTSXYmsixDsxrUVEaqNpe5aVRpI3x33wpw4n6DJNQc63TvWxkZKrZLMsYVC4L5laGrD/s9Sc4Xaxn2Dgxu8G+jaVUPRTXQdDYHo9EnhD9w50zn+vLupirrWkt+nuTzTePS3lKcv+tDWZkVciiaevvp+2hf/+t76oOT15cNnsxBiTbX2s312Ux2/i0tb5eq0NU5rDWQTOX85p4R7UEtYZDw9YcuwNrQTnkpQQV9DII+3jZ99c3LouPrSCZpIJmEkaiKHj+8L+js6EUamQSNTCy2QP4MhQX/h6z9cfnHXwIMAAAxRHCU5G2oAAAAAElFTkSuQmCC',
        clearbox_icon:'data:image/gif;base64,R0lGODlhEAAQAPeqAGV7smuU1nug2R1HnnuUzzV/xIm+7Gup40RbrTtZoXSu5nSu5RZHp2CAyJC/7B8+kP/9+oWe1YCX0iRcrXuy5yh7ykiKyKPN8Za/6zt4v154wmeS1RNTsIK56oC26BdVrRVtv0tlqv///qe81xV2ziN2w0mCwhp4zB1Colmg4V2h4Wmp4xlwwGOe32ip5NXe6Wup5Bh3zjlcsi9MqBBcrylIpSJFpVCZ3yyD1Q1lvBFoxz1fsjiCyWuq5erv9jmFzDmFy12Y1Td/xbDE3T92tFad3yOA12Wc1kqKzX2exPj39nSv5hVvxWeAwBZhsQVOtL7R6Gaj32Cj4lae4X+16Pf5/HOt5WiAwBZjtU5tvRdzymR5syF2xxp5zGqp43SOze7t72uq5Hak1meBxv/+/AhivGV+uGR5shdyyWyk3BNwx7nK4GmT1Rlmt97m8fn5+v///BJuwxBtxhlxxV6V0H+o1r/R6DZ1ujuCx9fg7A1csPv6+hR0zl+M01aQznOu5g9xz2yt5kmPzRNouVee3mqq5FN3xHaQzXmk1BBrxCF1x9rf50Z8uhdjshxvyVR3xXGr5LDF4k+a3xJmv0mPzk1tvHe06BVitn616Fqa3mZ+uB991OPq8z2FyDuDyEKQ2UyT2D2Gye7y+BBds1GMzGCk4wdPtVyMw12e3f///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKoALAAAAAAQABAAAAj/AFUJFBhBAwIEGiIMXKhKQgMBGC5cwCCggQSGqgI4MOCBAgUPBhwEGDOQwIYOSyD9UbBggRUFHTYQEPiISqE0Yo5E8RLmwIEVmAyp+tInkBQ6bqAgCoLKRQ8YltgcytIixRQ/PlJVsVMHCagbkjJVmlGqiApSnESISCUqkolJgIzYqEHoE45Leci82ZMKzpo7cjah2OGIBJ9RLyBAUDLkVJtEMXTIaPKkCxoai8CMYISljBotJ0xdUcWASwUnSYjoyRGHyZwKihgINMPhh5BGg0CAYFGCBxAOmgaG+OCJUqgCBToJwvMhBMMzAyZksGAhw4QBWzAKBJDgwYMEABgGAQQAOw%3D%3D',
        nagyito_icon:'data:image/png;base64,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%3D%3D',
        mainCSS: '#layerContent.toolsLayer{ background: url("http://static.iwiw.net/common/image/bigredesign/menulayer_bg.gif") repeat-y scroll -884px 0 transparent; width: 865px;}'
            +'#toolsLayer{display:none}'
            +'#layerContent.toolsLayer h3{margin-top: 0px}'
            +'#it_favusers{white-space:nowrap; display:none; -moz-border-radius:3px 3px 3px 3px; width:180px; background:url("http://static.iwiw.net/common/image/bigredesign/grads.png") repeat-x scroll -3px -560px #152A47; position:absolute; margin:0; padding:0; top:40px; right:41px; z-index:1001}'
            +'#it_favusers li{padding:0; overflow:hidden; height:23px; border-bottom:1px solid #12253E; }'
            +'#it_favusers a{color:#DAE7FB; display:inline-block; width:100%; font-size:10px; line-height:13px; padding:5px 0 5px 14px; background:url("http://static.iwiw.net/common/image/bigredesign/iconset.png") no-repeat scroll -21px -281px transparent; }'
            +'#it_favusers a:hover{background-color:#203551; color: #FFF; text-decoration: none}'
            +'ul.actions .actionLink{background:url("http://static.iwiw.net/common/image/bigredesign/iconset.png") no-repeat scroll -26px -287px transparent; padding:0 0 0 7px;}'
            +'#itfavtable li{display:block; width:580px; background:#F2F4F7;margin-top:2px; padding: 2px 4px;}'
            +'.it_icons a:hover{text-decoration:none}'
            +'#it_ajaxloading{ display: none; background: #F00; color: #FFF; position: fixed; top: 0px; left: 0px; padding: 3px; font-weight: bold;}'
            +'#it_ajaxinfo{ display: none; background: #F00; color: #FFF; position: fixed; top: 0px; left: 0px; padding: 3px; font-weight: bold;}'
            +'#it_useralbums .albumlist{overflow-x: auto; margin:0 !important}'
            +'#it_useralbums .album{display: table-cell; float: none !important}'
            +'.feed .item .outer{position:relative;}'
    }
  	const clearboxCSS='#CB_ShowTh, #CB_Thumbs2, #CB_Thumbs, .CB_RoundPixBugFix, #CB_Padding, #CB_ImgContainer, #CB_PrevNext, #CB_ContentHide, #CB_LoadingImage, #CB_Text, #CB_Window, #CB_Image, #CB_TopLeft, #CB_Top, #CB_TopRight, #CB_Left, #CB_Content, #CB_Right, #CB_BtmLeft, #CB_Btm, #CB_BtmRight, #CB_Prev, #CB_Next, #CB_Prev:hover, #CB_Next:hover, #CB_CloseWindow, #CB_SlideShowS, #CB_SlideShowP, #CB_SlideShowBar, #CB_Email {	margin: 0;	padding: 0;	background-color: transparent;	border: 0px;}#CB_ImgHide {	position: absolute;	visibility: hidden;	z-index: 1098;	left: 0px;}#CB_ShowTh {	width: 100%;	height: 15%;	visibility: hidden;	position: absolute;	z-index: 1097;	bottom: 0px;	left: 0px;}#CB_Thumbs {	display: none;	height: 60px;	padding-top: 10px;	background-color: #fff;	position: absolute;	z-index: 1100;	overflow: hidden;	bottom: 10px;	left: 0px;}#CB_Thumbs2 {	margin: auto 0;	height: 50px;	position: absolute;}.CB_ThumbsImg {	position: absolute;}.CB_RoundPixBugFix {	display: block;	visibility: hidden;	font-family: arial;	font-size: 1pt;}#CB_ImgContainer {	position: relative;	width: 100%;}#CB_PrevNext {	position: absolute;	width: 100%;	height: 100%;	top: 0px;	left: 0px;	z-index: 1002;}#CB_ContentHide {	position: absolute;	z-index: 1000;	top: 0px;	left: 0px;}#CB_LoadingImage {	position: absolute;	left: 50%;	top: 50%;	margin-left: -12px;	margin-top: -12px;	visibility: hidden;}#CB_Text {	text-align: center;}#CB_Window {	left:50%;	position:absolute;	top:50%;	visibility:hidden;	z-index: 1100;	border-collapse: separate;}#CB_Image {	position: relative;}#CB_iFrame {	position: absolute;	width: 0px;	height: 0px;	z-index: 1003;}#CB_TopLeft {	background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC3SURBVHjaYmTADRix8RkJKGREx4w4FMMUMCHRYMyIQzFMATMaZmLEoRgkyYKEWWFsJjQbkBWDFLEDMVd5ebnS8+fPe3///n0a2b0ghWxAzA3EAkAsAcQKx44dK/nz58/n/1CAbDLIRE4g5gdiMZDiS5cutf9HAwxIpoOs5wFiYSCW7e/v9/73798vXBpAbuaAmg5yivLDhw9X/ccCmNDCHOZhNjExMWts0c+EKzg5ODiksGkACDAAHQNZwPuKsfkAAAAASUVORK5CYII%3D);	background-position:right bottom;}#CB_Top {	background-image:url(data:image/png;base64,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%3D);	background-position:left bottom;}#CB_TopRight {	background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADYSURBVHjahJJNCsIwEEYTG/8FRUVcKAiC4MajeJCuvYMH6C28R3uALnXVhScoUmhi4hcdQ6wVP3ikZfI6w1DOGGuwVwz7TPX9GQ5aVKxSK1phALSH8U5TlawwpQv3Cv4HnGSFFVCE9J6VJzopkFJewjDcCCHOcRwX7F8MRSmVJ0lyoI5zMAJ9WkpA03AnvJOm6ZGkGRiCLmjS+r8FrXUZRdEexSWY0BbbroupSZZlJxTXNJrt0gHip1AUxRXFLViAMei9x+L2Qu0vwPkORw5uwG6vtKt+CDAAMdWdjv/AxeoAAAAASUVORK5CYII%3D);	background-position:left bottom;}#CB_Left {	background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAABOICAYAAACFYox6AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAOOSURBVHja7N1BCoMwEAXQjFAKhdL7n6mHmmZdClUwmsQnZPlAfpOZ0UWNUspS162ue12Pup51vTLzXX5cS9l4AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbADR1y3F4LGGzTfe5ouJYg2bb8zKB+wGQjE+osw4QACgxwFmvo7BLNO9aUYxBgAAAJqCkBIAAAAAAAAAAEBvIKUEAAAwEEgprQQpJaMDMAVIKQEAoGUBZj4AAIB+e5zXFAAAAOZWAPDEDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACngCh/PmIjJQAAAABoAXwPBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6Bv4oCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJgJhJQuAEJKwBkgpAQA+nQ7EPYSYMAC9AcpAYCHJuBYEJMVY9MMAACA6R4ADCfzAq9PPZYB2i4AAAAAAAAAAAAAAAAAzApSSnuC7OuW0g+3AaSUVD4pAcAgIL/OszM90HACXK3HGbCaTfcq3xUqX6cHyOYDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAp+AgwAGPGRhcPG/5oAAAAAElFTkSuQmCC);	background-position:right top;}#CB_Content {	background-color:#FFFFFF;}#CB_Right {	background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAABOICAYAAACFYox6AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAONSURBVHja7N1BDoIwEAVQxlN5/xOZmBgTF2OXGonQKLWW16Rx41vwoZ2BBUSWMc2MiDiWn1OZ5zIvZV7LvB2mygEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAJos9jiEHOQ7j4VqYTUhp4AYUTtzNg51taDy+7n5QAQCsNaLAGA51195oTOx8AAAAAAAAAAAAAAAAAAE8jpbQzkFJa+b+U0jdBSgkAlF0AAADNyXYFJZ1pt2UAAOjuAd2MlIC2wONT9QEA3DQBGixAnQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAX4KUEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD0C7woCAAAAACagnyYUgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAz0BICQDerwkpAQAALG6XuhkAAAB9K6DGAQDQFwgpAUqWns9jCikBAABoHQAAAAAAAAAAAIB1I6UEAADQOfA9lD8HOchB+yrAVLNMpWQzFisAtF+iNuPNu5mUkhqn5xvmoNPF59Zy5wvIxQcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwGbgLsAAfKdWCE8dUokAAAAASUVORK5CYII%3D);	background-position:left top;}#CB_BtmLeft {	background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADhSURBVHjafJBNCsIwEEaT9McqilBB3AiCG3HlwgP0CCK9kTfwIl31At248ALdd+dCN0ILVeMXScoYgwMPJmFeMjOcMSZAAHpgAEZgLKU8M0cIkkvNCzzrur78E76KwaOqqpNL8ADXCH1WBHEc35Ik2XGELakLH0SqdzADS7ApiuIorTCCp4ceggmYgxXYZll2aNv2bgtmU339yxQswFpJaZruy7LMm6a5mv4ZmSHQRBaqg5CTOejgvpZCU2geogJzSD6RPzm3tkUlumaD4I4V2y3SB34EKlGxwyW4xO78FmAA7GJCp4NsVNcAAAAASUVORK5CYII%3D);	background-position:right top;}#CB_Btm {	background-image:url(data:image/png;base64,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%3D);	background-position:left top;}#CB_BtmRight {	background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADvSURBVHjabJK/CsIwEMYbW1FBcBDERRBcxMlBR19C+ka+gq/QyaGTb1DfIXNnEcUisekfP8OlpGkOfr30cl9yl4TVMM9hjLE93Au8wQd8gey5koUQd7gSVKAmlDkFaZre4AqXqCNAhVUURRcS2CKV0LIkSc4Ib8EKzMEEDEHwb60RSCmzOI5PCO7AGizAFIzBAPhKgAYfnPNrGIZHSt6AJZjR6iPQp/IZw+cAcjo2YSEJ3Yeq62lMaGFO/0WrYfiALkafiDTG3ROiHTIKlhaVvboWCGNSJ9g33Ozgky8dIs9OVm/MuG37ETof5U+AAQAk14mrWTcz5wAAAABJRU5ErkJggg%3D%3D);	background-position:left top;}#CB_Prev, #CB_Next {	background: transparent url(data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D) no-repeat scroll 0%;	display: block;	width: 49%;	cursor: pointer;	outline-style:none;	z-index: 1102;}.CB_TextNav {	text-decoration: underline;	color: #aaa;}.CB_TextNav:hover {	text-decoration: none;	color: #ff7700;}#CB_Prev {	float: left;	left: 0px;}#CB_Next {	float: right;	left: 0px;}#CB_Prev:hover {background:transparent url(data:image/gif;base64,R0lGODlhZAAmAMQQALS0tM/Pz+Tk5Pj4+KCgoOvr6/Hx8aenp9bW1q2trcnJycLCwru7u93d3ZmZmf///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAABkACYAAAX/4AONZGmeaKqubOumj/jOdG3Xca7vfO//wKBw6BsRj8ikcglZOp/QqHRKrVqv2Kx2y+16v+CweEwmBgAFA0AhZDAGDQCiXFUAcgbH4rEgFIIIDnMHCQN0VAAOOQEHAwMEAUIADA8CDn+HU4mLfwWRQQMBhg0NmYiKpmOhBw4EC4YPmzENCQ4ODJgIALu8mIytr6lECQQIAgEOd7GogQcBCgR+D7q8BJd8yQELDoXCQciYDwrXm4+NMQXJO5ZslpQxyJ/ePgkJOpaRmw0O8g8MDrAePLIn7loOAgTn9bDFkGE+RcgE6IiYgwEBAzFk5dCocAc3ASBDYtxEcZEDiQ+QkM3JiGpjy446DhzwsSnQyhjbMKbbkyNnzJkwd2wrlWPASEV5lAkkMHNAgnM5AsmzxDMoHmsKQEKTKGscAwG0HJTyGqBsAIy1AghAEA2jVR0FEjFkcDTHOFvFWDY8KVCugwPh3uowADIgjwEgjxAOLLix48eQI0ueTLmy5cuUm2CuYkTGjc+gQ7/wLLq06dIhAAA7) no-repeat scroll left 50%;}#CB_Next:hover {background:transparent url(data:image/gif;base64,R0lGODlhZAAmAMQQAM/Pz6CgoOvr67S0tPj4+K2trdbW1t3d3fHx8cnJybu7u6enp8LCwuTk5JmZmf///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAABkACYAAAX/ICSOZGmeaKqubIs+bizPNP3A0K3vfO//wKBwSPzlisikcslsOp/QqHRKrVqv2Kx2y+16v+CweEyeAgYCxCDxNKB9iAbhIWhQBQODFOFgPBgBAk8ADnY9hHYDDk4IAIYPDQ4AUgALBAQBk4OFPg0ACA8GmkyRo6WUggKjTohbpzevZT+tdGs3AgoODgUHNwwDPAN+kLm7vQIFDgsDea8ECgpzBJUOAQxzeMzaeg8HyQ4Kgpt2AgEF2AEBCdR6CQ7c3ZLxCg3ehcjKzAanBAWBN/72EQKWjdkCeQaUAUiQTlwTROXO3VAkjsCCAAT4KNCRC1SAjTcIgIMkD5akfv8e/xBy6M7hA0wFXgawdMsBMFYOvEl8OVIHoV6KpNmM10uHIpKmJAFyWCCmjlgPBgQAdaDkjVxzHlbL+dQq0lAI36nURZbsV5MBHLDRUbbsqJ83aMXlpFVBuqxQ+Zl74G+uowaAAZ8l2ZTug12BA4Oi08en4bGPliCq6pTPsBsJuTEo1BgsvB2xSiFIt3jBgh8Wd3resXkxk1bu1l7MGtXBYgFbxfFxqkNQaHmUfXHVkfGPA5d8bso8jdNQMj2UDzTItfbGQd4P3BXY5waYyADSAZd052e0WsAM6+0CwN5RdnD1khXVamj0PwNpdVX3ywNAfoWYkeWIVc/VUpYCjbQ1Hj9ZAXyGBWC0EQGYSy81QOEPcchBBAGCyeLhhyCGKOKIJJZo4okopijiESqCIUKLLtYg44w0xnBDjTjmqGMOIQAAOw%3D%3D) no-repeat scroll right 50%;}#CB_CloseWindow {	position: absolute;	top: 0px;	right: -1px;	z-index: 1104;	cursor: pointer;}#CB_SlideShowS, #CB_SlideShowP {	position: absolute;	top: 0px;	left: -1px;	z-index: 1104;	cursor: pointer;}#CB_SlideShowBar {	width: 0px;	position: absolute;	top: 5px;	left: 22px;	height: 5px;	display: none;}#CB_Email {	position: absolute;	right: 15px;}';
	const clearboxJS='eval(function(p,a,c,k,e,r){e=function(c){return(c<a?\'\':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!\'\'.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return\'\\\\w+\'};c=1};while(c--)if(k[c])p=p.replace(new RegExp(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);return p}(\'l 4F=\\\'#64\\\';l 1H=75;l 1W=25;l 1x=3Q;l 1y=4G;l 1p=1;l M=12;l 1q=\\\'3k\\\';l 1a=60;l 1b=60;l 2b=5;l O=1;l 4H=\\\'#65\\\';l 17=2;l 2L=\\\'Y\\\';l 2M=\\\'Y\\\';l 2N=\\\'[]\\\';l 2c=3;l 2e=10;l 18=40;l 4I=\\\'66\\\';l 2o=12;l 4J=\\\'#67\\\';l 4K=\\\'3l\\\';l 3m=\\\'1z\\\';l 4L=\\\'- kép 68ö4Mé3R -\\\';l 1A=\\\'\\\';l 2p=0;l 2q=0;l 2r=0;l 2s=0;l 2t=\\\'Y\\\';l 1I=\\\'Y\\\';l 4N=\\\'69őző\\\';l 4O=\\\'kö6aő\\\';l 4P=\\\'6bár\\\';l 4Q=\\\'1X:1Y/3S;1Z,3T/6c+6d+6e/6f+6g/6h+6i/6j+6k%3D\\\';l 4R=\\\'1X:1Y/3S;1Z,3T/6l+6m+6n/6o/6p+6q++6r+6s/6t/6u/6v%3D\\\';l 4S=\\\'1X:1Y/3S;1Z,3T/6w+6x++6y/6z+6A+6B+6C%3D\\\';l 3U=\\\'1X:1Y/2O;1Z,6D///6E++6F/6G/6H+6I+6J+6K/6L+6M+6N+6O+6P+6Q+6R+6S/6T+6U+6V+6W/6X+6Y+6Z+71+72+73+74+76+77+78+79+7a+7b+7c%3D%3D\\\';l 3V=\\\'1X:1Y/2O;1Z,4T///7d%3D%3D\\\';l 4U=\\\'1X:1Y/2O;1Z,7e/7f/7g+7h+/7i+7j/4V/7+/7k/39/7l/4W+7m/7n+7o+7p/7q+7r+7s/7t///7u/7v+7w+7x+7y+/7z/7A/7B+7C/7D/7E+7F+5+7G+7H/7I/7J+7K%3D%3D\\\';l 3W=\\\'1X:1Y/2O;1Z,7L+7M/4W+7N/7O/7P/4V+7Q+/7R///7S/7T+7U/7V+7W+7X+7Y/7Z/80/81/+82/83+84+85+86/87+88+89%3D%3D\\\';l 4X=\\\'1X:1Y/2O;1Z,4T///8a%3D%3D\\\';l 2f=\\\'2P\\\';l 2Q=1h;l 8b="2.0 + 3X";l 2R=1;o 4Y(a){l b;f(!a){l a=K.3Y}f(a.4Z){b=a.4Z}t f(a.51){b=a.51}l c=8c.8d(b);f(21=="Y"){f(F>1&&(c=="%"||b==37||b==52)){f(1i){1D()}1r(F-1);q G}f(F<w.L-1&&(c=="\\\'"||b==39||b==54)){f(1i){1D()}1r(F+1);q G}f((c==" "||b==32)&&2u==0){f(w.L<3){q G}f(22=="2v"){3Z();q G}t{41();q G}}f(c=="\\\\8e"||b==27){2w();q G}f(b==13){q G}}t{f(2u==1&&(c==" "||b==32||b==13)){q G}}}o 3Z(){1J.g.y="Z";1K.g.y="1c";22="42";23.g.y="1c";3n()}o 41(){1K.g.y="Z";1J.g.y="1c";43()}2b=J(2b);f(2b<5){2b=5}2p=J(2p);f(2p<0){2p=0}2q=J(2q);f(2q<0){2q=0}2r=J(2r);f(2r<0){2r=0}2s=J(2s);f(2s<0){2s=0}1H=J(1H);f(1H<0||1H>2g){1H=70}1W=J(1W);f(1W<1||1W>1H){1W=10}1x=J(1x);f(1x<25||1x>3o){1x=3Q}1y=J(1y);f(1y<50||1y>3o){1y=4G}1p=J(1p);f(1p<0){1p=5}f(1q!="1z"&&1q!="3l"&&1q!="3k"&&1q!="3p"){1q="3k"}1a=J(1a);f(1a<1||1a>99){1a=50}1b=J(1b);f(1b<1||1b>99){1b=50}O=J(O);f(O<0){O=1}17=J(17);f(17<0){17=2}f(2L!="Y"&&2L!="1z"){2L="1z"}2e=J(2e);f(2e<0){2e=10}M=J(M);f(M<0){M=12}18=J(18);f(18<25){18=40}2o=J(2o);f(2o<6){2o=13}f(2M!="Y"&&2M!="1z"){2M="Y"}2c=J(2c);f(2c<1){2c=5}2c*=3o;f(3m!="Y"&&3m!="1z"){3m="1z"}f(2t!="Y"&&2t!="1z"){2t="Y"}l 2S,3q="",8f=0,24,2h,2u,1L,1E,3r=0,45="",21,2i,2x,3s=2p+2q,3t=2r+2s,2T,Q,2y=0,1i,22="2v",2j=0,2U=0,2z,2k,1f,1g,2V,2W,53,v=1x,B=1y-18,3u,1Q,R,H,2A,2B,11,V,F,w,3v,1j,3w,2X,2Y,2Z,31;l 46=h.8g?1h:G;f(!46){h.8h(8i.8j)}l 33=1B 34;33[0]=1B 2l;33[0].W=1A+3W;33[1]=1B 2l;33[1].W=1A+3U;o 55(a,b){f(35 K.2C!="36"){K.2C(a,b,G)}t f(35 h.2C!="36"){h.2C(a,b,G)}t f(35 K.56!="36"){K.56("8k"+a,b)}}55("8l",57);o 57(){h.8m=4Y;f(!h.I("47")&&2R!=0){h.S.g.8n="8o";l a="<N 1R=\\\\"8p\\\\" g=\\\\"C: "+M+"u; D: "+M+"u;\\\\"></N>";f(1s.1t.1u("3x")!=-1){3q="<1S A=\\\\"38\\\\" 1T=\\\\"\\\\" W=\\\\""+1A+3V+"\\\\" /><1S A=\\\\"48\\\\" 1T=\\\\"\\\\" W=\\\\""+1A+3V+"\\\\" />"}t{3q="<N A=\\\\"48\\\\"></N><N A=\\\\"38\\\\"></N>"}l b=h.58("S").8q(0);l c=h.8r("N");c.8s("A","47");b.59(c);h.I("47").1k="<5a 8t=\\\\"0\\\\" 8u=\\\\"0\\\\" A=\\\\"5b\\\\"><2D A=\\\\"2X\\\\"><19 A=\\\\"8v\\\\">"+a+"</19><19 A=\\\\"8w\\\\"></19><19 A=\\\\"8x\\\\">"+a+"</19></2D><2D A=\\\\"8y\\\\"><19 A=\\\\"2Z\\\\"></19><19 A=\\\\"53\\\\" 8z=\\\\"49\\\\" 8A=\\\\"3y\\\\"><N A=\\\\"5c\\\\"><N A=\\\\"5d\\\\"><5e 8B=\\\\"0\\\\" A=\\\\"5f\\\\" W=\\\\"\\\\"></5e>"+3q+"<N A=\\\\"5g\\\\"><1S W=\\\\""+1A+4U+"\\\\" 1T=\\\\"8C\\\\" /></N><N A=\\\\"4a\\\\"><N A=\\\\"5h\\\\"></N></N><1S A=\\\\"5i\\\\" 1T=\\\\"8D\\\\" W=\\\\""+1A+3U+"\\\\" /><5j A=\\\\"5k\\\\"></5j><N A=\\\\"3z\\\\"><N A=\\\\"5l\\\\"></N><1S A=\\\\"5m\\\\" 1T=\\\\"x\\\\" W=\\\\""+1A+4S+"\\\\" /><1S A=\\\\"5n\\\\" W=\\\\""+1A+4X+"\\\\" /><1S A=\\\\"5o\\\\" 1T=\\\\"8E 5p\\\\" W=\\\\""+1A+4R+"\\\\" /><1S A=\\\\"5q\\\\" 1T=\\\\"8F 5p\\\\" W=\\\\""+1A+4Q+"\\\\" /><a A=\\\\"5r\\\\" 1d=\\\\"#\\\\"></a><a A=\\\\"5s\\\\" 1d=\\\\"#\\\\"></a></N></N><N A=\\\\"5t\\\\"></N></N></19><19 A=\\\\"31\\\\"></19></2D><2D A=\\\\"2Y\\\\"><19 A=\\\\"8G\\\\">"+a+"</19><19 A=\\\\"8H\\\\"></19><19 A=\\\\"8I\\\\">"+a+"</19></2D></5a><N A=\\\\"5u\\\\"></N>";f(1s.1t.1u("3x 6")!=-1&&M==0){45=1}f(1s.1t.1u("3x")!=-1&&M<2){3r=6}h.I("5c").g.8J=17+"u";2E=h.I("48");2F=h.I("38");14=h.I("5l");14.g.5v="#8K";14.g.1M=0.75;14.g.3a="3b(1M=75)";1Q=h.I("5b");26=h.I("4a");3c=h.I("5h");28=h.I("5g");T=h.I("5u");T.g.5v=4F;T.g.1M=0;T.g.3a="3b(1M=0)";H=h.I("5k");2k=h.I("5i");3d=h.I("5d");H.g.5w=O+"u 8L "+4H;3e=h.I("5m");1J=h.I("5q");1K=h.I("5o");23=h.I("5n");23.g.1M=0.5;23.g.3a="3b(1M=50)";2A=h.I("5r");2B=h.I("5s");R=h.I("5t");R.g.D=18-2e+"u";R.g.4b=2e+"u";R.g.8M=4I;R.g.8N=2o+"u";R.g.8O=4K;R.g.8P=4J;2X=h.I("2X").g;2X.D=M+"u";2Y=h.I("2Y").g;2Y.D=M+"u";2Z=h.I("2Z").g;2Z.C=M+45+"u";31=h.I("31").g;31.C=M+"u";1F=h.I("5f");4c=h.I("3z").g;2E.2G=o(){5x();q};2F.2G=o(){38();q};14.2G=o(){3A();3B();q};R.2G=o(){3A();3B();q};T.2G=o(){3A();3B();q};f(1s.1t.1u("4d")!=-1){3s=0;3t=0}f(1s.1t.1u("3C")!=-1){3t=0}}h.I("4a").8Q=5y;l d=0;l e=0;Q=h.58("a");3f(i=0;i<Q.L;i++){P=Q[i].1v;8R=Q[i].1l("1d");f(P.4e("1N")!=2m&&2R!=0){f(P=="1N"){Q[i].U=o(){4f(X.1v+"+\\\\\\\\+"+X.1l("1d")+"+\\\\\\\\+"+X.1l("2H"));q G}}t{f(P.1C(0,8)=="1N"&&P.3E(8)=="["&&P.3E(P.L-1)=="]"){f(Q[i].1v.1C(9,Q[i].1v.L-1).1U(",")[0]!="1N"){Q[i].U=o(){4f(X.1v.1C(9,X.1v.L-1)+"+\\\\\\\\+"+X.1l("1d")+"+\\\\\\\\+"+X.1l("2H"));q G}}t{5z("5A 5B:\\\\n\\\\8S 8T 8U 8V 8W \\\\"1N[1N]\\\\"!\\\\n(5C: 5D, a "+i+". <a> 5E-5F 5G.)")}}t f(P.1C(0,8)=="1N"&&P.3E(8)=="("&&P.3E(P.L-1)==")"){f(P.1C(9,P.L-1).1U(",")[2]=="8X"){Q[i].U=o(){4g(X.1v.1C(9,X.1v.L-1)+"+\\\\\\\\+"+X.1l("1d")+"+\\\\\\\\+"+X.1l("2H"));q G}}t{Q[i].2G=o(){4g(X.1v.1C(9,X.1v.L-1)+"+\\\\\\\\+"+X.1l("1d")+"+\\\\\\\\+"+X.1l("2H"));q G}}}t{5z("5A 5B:\\\\n\\\\8Y 8Z 1N 90 91: \\\\""+Q[i].1v+"\\\\"!\\\\n(5C: 5D, a "+i+". <a> 5E-5F 5G.)")}}}}}o 4f(a){f(2R==0){q G}3e.U="";1J.U="";1K.U="";1m=a.1U("+\\\\\\\\+");P=1m[0].1U(",");f(P[1]>0){3F=J(P[1])*3o}t{3F=2c}f(P[2]=="2v"){22="42"}f(w&&P[0]==w[0][0]&&w[0][0]!="1N"){}t{w=1B 34;w.4h(1B 34(P[0],P[1],P[2]));f(1m[0]=="1N"){w.4h(1B 34(1m[1],1m[2]))}t{3f(i=0;i<Q.L;i++){f(Q[i].1v.1C(9,Q[i].1v.L-1).1U(",")[0]==w[0][0]){2S=1A+3W;f(Q[i].1l("4i")==2m||Q[i].1l("4i")=="2m"){3f(j=0;j<Q[i].4j.L;j++){f(Q[i].4j[j].W!=36){2S=Q[i].4j[j].W}}}t{2S=Q[i].1l("4i")}w.4h(1B 34(Q[i].1l("1d"),Q[i].1l("2H"),2S))}}}}F=0;92(w[F][0]!=1m[1]){F++}11=1x;V=1y-18;4k();3G();2Q=G}o 4k(){5H();5I();5J();f(1n>1O){1O=1n}f((1s.1t.1u("5K")!=-1||1s.1t.1u("3C")!=-1)&&1o!=1P){2T=K.4l+K.4m-1O}t{2T=0}4n();f(3s==0){f(1P>1o){T.g.C=1P+"u"}t{T.g.C=1o+"u"}}t{T.g.C=1P+3s+"u"}T.g.D=1n+2n+"u";T.g.E="1w";q}o 4g(a){f(2R==0){q G}21="1z";1m=a.1U("+\\\\\\\\+");4c.y="Z";3e.g.y="Z";P=1m[0].1U(",");4k();v=J(P[0]);B=J(P[1]);11=1x;V=1y-18;f(v>1o-2*(M+O+17+1p)){v=1o-2*(M+O+17+1p)}f(B>1n-2*(M+O+17+1p)-18){B=1n-2*(M+O+17+1p)-18}H.g.C=1x+"u";H.g.D=1y-18+"u";H.g.y="1c";H.g.E="16";1Q.g.E="1w";1J.g.y="Z";1K.g.y="Z";3G("x")}o 3G(a){l b=a;f(2j<1H){2j+=1W;T.g.1M=2j/2g;T.g.3a="3b(1M="+2j+")";2z=2j;3H=29("3G(\\\'"+b+"\\\')",5)}t{2j=0;T.g.D=1O+3t+"u";f(1H!=0){1V(3H)}f(b=="x"){2k.g.E="1w";4o("x")}t{5L()}q}}o 5L(){H.g.C=1x+"u";H.g.D=1y-18+"u";H.g.y="1c";H.g.E="16";1Q.g.E="1w";1r()}o 1r(a){2E.g.E="16";2F.g.E="16";26.g.y="Z";26.g.C="1e";28.g.y="Z";28.g.C="1e";14.g.C="1e";14.g.D="1e";14.g.E="16";21="1z";2U=0;T.U="";f(w.L<3){1J.g.y="Z";1K.g.y="Z"}t{f(22=="2v"){1J.g.y="1c";1K.g.y="Z"}t{1K.g.y="1c";1J.g.y="Z"}}2A.g.y="Z";2B.g.y="Z";f(a){F=J(a)}1f=1a;1g=1b;f(1q!="3p"){H.g.E="16";2k.g.E="1w"}R.1k=4L;3v=0;1j=1B 2l;1j.W=w[F][0];3w=G;1j.93=o(){4p();q};4q()}o 4q(){f(3v==1){3w=1h;1V(5M);4r();q}f(3w==G&&1j.94){3v++}5M=29("4q()",5);q}o 4r(){f(2f==\\\'2P\\\'){v=1j.C;B=1j.D}t{v=1j.D;B=1j.C}1L=v;1E=B;3u=v/B;5N();l a=H.95(\\\'2d\\\');f(2f==\\\'2P\\\'){H.C=1L;H.D=1E;a.4s();a.4t(1j,0,0,1L,1E);a.4u()}f(2f==\\\'4v\\\'){H.C=1L;H.D=1E;a.4s();a.5O(0,1E);a.3X(-2I.5P/2);a.4t(1j,0,0,1E,1L);a.4u()}f(2f==\\\'4w\\\'){H.C=1L;H.D=1E;a.4s();a.5O(1L,0);a.3X(2I.5P/2);a.4t(1j,0,0,1E,1L);a.4u()}2f=\\\'2P\\\';4o();q}o 4o(a){1f=1a;1g=1b;2i="G";2x="G";2u=1;f(1q=="3k"){3g();3h()}t f(1q=="3p"){f(!a){2k.g.E="16";H.g.E="1w"}3g();3h()}t f(1q=="1z"){4n();3d.g.D=B+2*O+"u";H.g.C=v+"u";H.g.D=B+"u";2i="1h";2x="1h"}t f(1q=="3l"){3g()}f(a){4x()}t{4y()}q}o 3g(){f(v==11){f(4z){1V(4z)}f(1q=="3l"){2i="1h";3h()}t{2i="1h"}q}t{f(v<11){f(11<v+2g&&1a>20){1f=20}f(11<v+60&&1a>10){1f=10}f(11<v+30&&1a>5){1f=5}f(11<v+15&&1a>2){1f=2}f(11<v+4){1f=1}11-=1f}t{f(11>v-2g&&1a>20){1f=20}f(11>v-60&&1a>10){1f=10}f(11>v-30&&1a>50){1f=5}f(11>v-15&&1a>2){1f=2}f(11>v-4){1f=1}11+=1f}H.g.C=11+"u";2V=J(2J-(11+2*(M+O+17))/2);1Q.g.3I=2V+"u";4z=29("3g()",2b)}}o 3h(){f(B==V){f(4A){1V(4A)}2x="1h";q}t{f(B<V){f(V<B+2g&&1b>20){1g=20}f(V<B+60&&1b>10){1g=10}f(V<B+30&&1b>5){1g=5}f(V<B+15&&1b>2){1g=2}f(V<B+4){1g=1}V-=1g}t{f(V>B-2g&&1b>20){1g=20}f(V>B-60&&1b>10){1g=10}f(V>B-30&&1b>5){1g=5}f(V>B-15&&1b>2){1g=2}f(V>B-4){1g=1}V+=1g}H.g.D=V+"u";3d.g.D=V+2*O+"u";2W=J(2n-(3r+V+18+2*(M+O+17))/2);1Q.g.4b=2W-2T/2+"u";4A=29("3h()",2b)}}o 4y(){f(2i=="1h"&&2x=="1h"){f(2h){1V(2h)}4p();q}t{2h=29("4y()",5)}}o 4x(){f(2i=="1h"&&2x=="1h"){f(2h){1V(2h)}w="";1F.W=1m[1];H.g.E="1w";2k.g.E="16";1F.g.49=O+"u";1F.g.3y=O+"u";1F.g.C=v+"u";1F.g.D=B+"u";f(1m[2]&&1m[2]!="2m"&&1m[2]!=2m){R.1k=1m[2]}t{R.1k=1m[1]}R.1k+=" "+2N.1C(0,1)+"<a 1R=\\\\"1I\\\\" 1d=\\\\"3J:3K(0)\\\\" U=\\\\"2w();\\\\">"+4P+"</a>"+2N.1C(1,2);T.U=o(){2w();q G};21="Y";2u=0;q}t{2h=29("4x()",5)}}o 4p(){3e.U=o(){2w()};1J.U=o(){3Z();q G};1K.U=o(){41();q G};4c.y="1c";f(1q!="3p"){R.1k="";2k.g.E="16";H.g.E="1w"}3e.g.y="1c";T.U=o(){2w();q G};2A.g.D=B+"u";2B.g.D=B+"u";f(w[F][1]&&w[F][1]!="2m"&&w[F][1]!=2m){R.59(h.96(w[F][1]))}t{f(2L=="Y"){R.1k=w[F][0].1U("/")[w[F][0].1U("/").L-1]}}f(2M=="Y"&&w.L>2){R.1k+=" "+2N.1C(0,1)+F+"/"+(w.L-1)+2N.1C(1,2)}3z();R.g.E="1w";f(w.L>0){11=v;V=B}f(w.L>2){f(22=="42"){1K.g.y="1c";23.g.y="1c";3n()}t{1J.g.y="1c"}}t{22="2v"}21="Y";2u=0;14.g.C=v+2+"u";14.g.D=B+2+"u";f(v<1j.C||B<1j.D){2F.g.E="1w";28.g.C=v+2+"u"}f(w.L>2){2E.g.E="1w";26.g.C=v+2+"u";l a="";l b=5;l c=0;24=0;3f(i=1;i<w.L;i++){2a=1B 2l;2a.W=w[i][2];c=2I.3L(2a.C/2a.D*50);f(c>0){}t{c=50}24+=c}24+=(w.L-2)*b;l d=0;3f(i=1;i<w.L;i++){2a=1B 2l;2a.W=w[i][2];a+="<a 1d=\\\\"3J:3K(0)\\\\" U=\\\\"f(1i){1D();}1r("+i+")\\\\"><1S g=\\\\"5w: 0; 3y: "+d+"u;\\\\" W=\\\\""+w[i][2]+"\\\\" D=\\\\"50\\\\" 1R=\\\\"97\\\\" /></a>";d+=2I.3L(2a.C/2a.D*50)+b}3c.g.C=24+"u";3c.1k=a;3c.g.3I=(v-24)/2+"u"}q 1h}o 38(){14.g.E="1w";28.g.y="1c";q}o 3B(){14.g.E="16";28.g.y="Z";q}o 5x(){14.g.E="1w";26.g.y="1c";q}o 3A(){14.g.E="16";26.g.y="Z";q}o 5y(e){f(24>v){f(46){3i=3Y.98}t{3i=e.9a}f(3i<0){3i=0}3c.g.3I=((1o-v)/2-3i)/(v/(24-v))+"u"}}o 9b(){H.g.C=1L+"u";H.g.D=1E+"u";3d.g.D=1E+2*O+"u"}o 43(){22="2v";1D()}o 1D(){f(1i){1V(1i)}2U=0;2y=0;23.g.y="Z"}o 3n(){f(3F>2U){1i=29("3n()",25);2U+=25;2y+=(v-44)/(3F/25);23.g.C=2y+"u"}t{1V(1i);2y=0;23.g.C=2y+"u";f(F==w.L-1){1r(1)}t{1r(F+1)}q}}o 5N(){f(v>1o-2*(M+O+17+1p)){v=1o-2*(M+O+17+1p);B=2I.3L(v/3u)}f(B>1n-2*(M+O+17+1p)-18){B=1n-2*(M+O+17+1p)-18;v=2I.3L(3u*B)}q}o 4n(){2V=J(2J-(v+2*(M+O+17))/2);2W=J(2n-(3r+B+18+2*(M+O+17))/2);1Q.g.3I=2V+"u";1Q.g.4b=2W-2T/2+"u";q}o 3z(){f(F>1){f(2t=="Y"){5Q=1B 2l;5Q.W=w[F-1][0]}f(1I=="Y"){l a=R.1k;R.1k="<a 1R=\\\\"1I\\\\" 1d=\\\\"3J:3K(0)\\\\" U=\\\\"f(1i){1D();}1r("+(F-1)+")\\\\" 1T=\\\\"&4M;\\\\">"+4N+"</a> "+a}2A.g.y="1c";2A.U=o(){f(1i){1D()}1r(F-1);q G}}f(F<w.L-1){f(2t=="Y"){5R=1B 2l;5R.W=w[F+1][0]}f(1I=="Y"){R.1k+=" <a 1R=\\\\"1I\\\\" 1d=\\\\"3J:3K(0)\\\\" U=\\\\"f(1i){1D();}1r("+(F+1)+")\\\\" 1T=\\\\"&9c;\\\\">"+4O+"</a>"}2B.g.y="1c";2B.U=o(){f(1i){1D()}1r(F+1);q G}}R.1k+=\\\'<9d/><a 1R="1I" 1d="#" U="q 3M(\\\\\\\'4v\\\\\\\');">5Sás 4v</a> - <a 1R="1I" 1d="#" U="q 3M(\\\\\\\'2P\\\\\\\');">9e</a> - <a 1R="1I" 1d="#" U="q 3M(\\\\\\\'4w\\\\\\\');">5Sás 4w</a> | <a 1R="1I" 1d="\\\'+w[F][0].4e(/^(.*?)(9f)?$/)[1]+\\\'" 9g="9h" 2H="9i 9j és 9kás 9lé3R más né9m...">kép 9né3R</a>\\\';q}o 3M(a){2f=a;2E.g.E="16";2F.g.E="16";26.g.y="Z";26.g.C="1e";28.g.y="Z";28.g.C="1e";14.g.C="1e";14.g.D="1e";14.g.E="16";H.g.E="16";4r();q G}o 2w(){14.g.C="1e";14.g.D="1e";14.g.E="16";2E.g.E="16";2F.g.E="16";43();R.1k="";v=1x;B=1y-18;3d.g.D=B+2*O+"u";H.g.y="Z";1Q.g.E="16";T.U="";1F.W="";1F.g.49="1e";1F.g.3y="1e";1F.g.C="1e";1F.g.D="1e";4B();2Q=1h;q}o 4B(){f(2z>0){T.g.1M=2z/2g;T.g.3a="3b(1M="+2z+")";2z-=1W;3H=29("4B()",5)}t{T.g.E="16";T.g.C="1e";T.g.D="1e";f(1H!=0){1V(3H)}21="1z";q}}o 5I(){X.1P=0;X.1O=0;f(K.3N&&K.4C){1P=K.3N+K.4C;1O=K.4m+K.4l}t f(h.S.4D>h.S.5T){1P=h.S.4D;1O=h.S.5U}t{1P=h.S.5T;1O=h.S.9o}f(1s.1t.1u("3x")!=-1||1s.1t.1u("4d")!=-1){1P=h.S.4D;1O=h.S.5U}f(1s.1t.1u("3C")!=-1||1s.1t.1u("5K")!=-1){1P=1o+K.4C;1O=1n+K.4l}q}o 5H(){X.1o=0;X.1n=0;f(h.1G&&(h.1G.3j||h.1G.2K)){1o=h.1G.3j;1n=h.1G.2K}t f(35 K.3N=="5V"){1o=K.3N;1n=K.4m}t f(h.S&&(h.S.3j||h.S.2K)){1o=h.S.3j;1n=h.S.2K;q}f(1s.1t.1u("4d")!=-1){1o=h.1G.3j;1n=h.S.2K}f(h.5W!=36){f(h.5W.4e("9p")&&1s.1t.1u("3C")!=-1){1n=h.S.2K}}q}o 5J(){X.2J=0;X.2n=0;f(35 K.5X=="5V"){2n=K.5X;2J=K.9q}t f(h.S&&(h.S.3O||h.S.3P)){2n=h.S.3P;2J=h.S.3O}t f(h.1G&&(h.1G.3O||h.1G.3P)){2n=h.1G.3P;2J=h.1G.3O}q}o 5Y(a){f(a>0&&F>1){f(1i){1D()}1r(F-1)}f(a<0&&F<w.L-1){f(1i){1D()}1r(F+1)}}o 4E(a){l b=21=="Y";l c=0;f(!a)a=K.3Y;f(a.5Z){c=a.5Z/3Q;f(K.9r)c=-c}t f(a.61){c=-a.61/3}f(c&&b)5Y(c);f(a.62&&!2Q)a.62();a.9s=2Q}f(K.2C)K.2C(\\\'9t\\\',4E,G);K.63=h.63=4E;\',62,588,\'|||||||||||||||if|style|document||||var|||function||return|||else|px|CB_ImgWidth|CB_Gallery||display||id|CB_ImgHeight|width|height|visibility|CB_ActImgId|false|CB_Img|getElementById|parseInt|window|length|CB_RoundPix|div|CB_ImgBorder|CB_Rel|CB_Links|CB_Txt|body|CB_HideContent|onclick|CB_ImgHeightOld|src|this|be|none||CB_ImgWidthOld|||CB_ImgHd||hidden|CB_Padd|CB_TextH|td|CB_Jump_X|CB_Jump_Y|block|href|0px|CB_JumpX|CB_JumpY|true|CB_SSTimer|CB_preImages|innerHTML|getAttribute|CB_Clicked|BrSizeY|BrSizeX|CB_WinPadd|CB_Animation|CB_LoadImage|navigator|userAgent|indexOf|rel|visible|CB_WinBaseW|CB_WinBaseH|ki|CB_PicDir|new|substring|CB_SlideShowJump|CB_ImgHeightOrig|CB_iFr|documentElement|CB_HideOpacity|CB_TextNav|CB_SlideS|CB_SlideP|CB_ImgWidthOrig|opacity|clearbox|DocSizeY|DocSizeX|CB_Win|class|img|alt|split|clearTimeout|CB_OpacityStep|data|image|base64||CB_ClearBox|CB_SS|CB_SlideB|CB_AllThumbsWidth||CB_Thm||CB_Et|setTimeout|CB_preThumbs|CB_AnimTimeout|CB_SlShowTime||CB_PadT|CB_Rotate|100|CB_ResizeTimer|CB_AnimX|CB_ii|CB_LoadingImg|Image|null|DocScrY|CB_FontSize|CB_BodyMarginLeft|CB_BodyMarginRight|CB_BodyMarginTop|CB_BodyMarginBottom|CB_Preload|CB_IsAnimating|start|CB_Close|CB_AnimY|CB_SlideBW|CB_Hide|CB_Prv|CB_Nxt|addEventListener|tr|CB_ShTh|CB_ShEt|onmouseover|title|Math|DocScrX|clientHeight|CB_ShowImgURL|CB_ImgNum|CB_ImgNumBracket|gif|nincs|CB_ScrollEnabled|CB_Show|CB_ActThumbSrc|FF_ScrollbarBug|CB_jj|CB_MarginL|CB_MarginT|CB_Header|CB_Footer|CB_Left||CB_Right||CB_PrePictures|Array|typeof|undefined||CB_ShowEtc||filter|alpha|CB_Thm2|CB_ImgCont|CB_Cls|for|CB_WindowResizeX|CB_WindowResizeY|tempX|clientWidth|double|normal|CB_CheckDuplicates|CB_SlideShow|1000|warp|CB_IEShowBug|CB_ieRPBug|CB_BodyMarginX|CB_BodyMarginY|CB_ImgRate|CB_Count|CB_Loaded|MSIE|left|CB_PrevNext|CB_HideThumbs|CB_HideEtc|Firefox||charAt|CB_SlShowTimer|CB_HideDocument|CB_Blur|marginLeft|javascript|void|round|CB_RotateImg|innerWidth|scrollLeft|scrollTop|120|se|png|iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAYAAADQWvz5AAAABGdBTUEAAK|CB_PictureLoading|CB_PictureBlankGif|CB_PictureNoprvGif|rotate|event|CB_SSStart||CB_SSPause|pause|CB_SlideShowStop||CB_ie6RPBug|IE|CB_All|CB_ShowTh|top|CB_Thumbs|marginTop|CB_PrvNxt|Opera|match|CB_ClickIMG|CB_ClickURL|push|tnhref|childNodes|CB_SetAllPositions|scrollMaxY|innerHeight|CB_SetMargins|CB_AnimatePlease|CB_ShowImage|CB_CheckLoaded|CB_GetImageSize|save|drawImage|restore|balra|jobbra|CB_CheckResize2|CB_CheckResize|CB_TimerX|CB_TimerY|CB_ShowDocument|scrollMaxX|scrollWidth|scroll_wheel|CB_HideColor|110|CB_ImgBorderColor|CB_Font|CB_FontColor|CB_FontWeigth|CB_LoadingText|lt|CB_NavTextPrv|CB_NavTextNxt|CB_NavTextCls|CB_PictureStart|CB_PicturePause|CB_PictureClose|R0lGODlhAQABAIAAAP|CB_PictureMaxGif|Pz|r6|CB_PictureWhiteGif|CB_KeyPress|keyCode||which||CB_Content||OnLoad|attachEvent|CB_Init|getElementsByTagName|appendChild|table|CB_Window|CB_Padding|CB_ImgContainer|iframe|CB_iFrame|CB_Etc|CB_Thumbs2|CB_LoadingImage|canvas|CB_Image|CB_ImgHide|CB_CloseWindow|CB_SlideShowBar|CB_SlideShowP|SlideShow|CB_SlideShowS|CB_Prev|CB_Next|CB_Text|CB_ContentHide|backgroundColor|border|CB_ShowThumbs|getMouseXY|alert|ClearBox|HIBA|Helye|dokumentum|tag|en|belul|getBrowserSize|getDocumentSize|getScrollPosition|Netscape|CB_NewWindow|CB_ImgLoadTimer|CB_FitToBrowser|translate|PI|PreloadPrv|PreloadNxt|forgat|offsetWidth|scrollHeight|number|compatMode|pageYOffset|scroll_handle|wheelDelta||detail|preventDefault|onmousewheel|000|ccc|arial|656565|bet|el|vetkez|bez|INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEgSURBVHjarJJNaoNQFIWPPwhRwYk4UAnRiBEFR11NF9K9dOgiAl2Do0B1IoGCPxQyqjMpqH3vQUtbMI3WDz4QkcM998o1TTOCYBgGRFHEUsTz|YyiKGBZFjzPg|u6EARhfhCdguM4VFXFzPMcvu|jcDjMChTrukbf918vLpcLM8syRFGE3W4HRVH|DOKSJBm7rpv8QNM0Np3jOOx5Cp7WukbbtkjTFMfjEafTaTrolv6qqrIjUCd39H0|v9F1nVUKggCbzeb6sk3TRFmWGIbhR0AYhthut5Bl|bar0YvQEJ7nWUAcx7BtG5IkzfuP6Mj0xPv9nrkUbiTg|7zwWIenNSZ6J96tMdED8Rnjct6I97QQK7Ug4JX4SLQ|Q6gfAgwAQ6rY154rEqcAAAAASUVORK5CYII|INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADJSURBVHjarJJBCoMwEEUnoSHkCnbjKifoaXqQ3qU36T26E6E7u|26YuwkJTKFfCuSB|MP3|idIVEzMwwDZZqmWdbIL3GIj77vqes68t7|fID8EjovlFLFDcgvBo3jSNM0JZUgfzVIqgwq|TBI6|EWZeXwIdB1lqSmkE|DDLGkNQM8ldPDbW|ZawliO8khRCSSpAPg5xz1LZtUgnyi|dt3vK7|zw01eFWo6M316lGRxeuezyRvby4znGgNNSOgCfXleuYQ2J9BBgAlTnbh78s1RUAAAAASUVORK5CYII|INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEdSURBVHjarJIxDoJQDIaLITLBxMYkG4MrGyfgBh7Eu3gQEgc2NuJA4sDGRhxgMGxM|P7GkqcRRfFPGgr9|XxWmNQohcqioLquubc930KguChXpYlVVXFued5ZNKE0Ahj27YMdByHGyC8Z1nGueu67F1NgSzLojiOGQClacpQBHLdg6cx9WsiNCZJQn3fcwMkOSA4EbSiD4IRDQJAQDpkFkhg8osQch0yG4SL7bpufEculz0bhAaMWiYpa4BveZ6PPvMdBGYdEkXRQw27Zts218x3EH1XwjAca8ibpuGJimdy|DDJhACS0YtQg0f2CSDs|YYWCpd9pD8IJ9qq50nFeumJzir2i4|Eu77HTsV1|FH0FJ6Kg4rLt6CbAAMAU3YULCsV7rgAAAAASUVORK5CYII|R0lGODlhGAAYAPQAAP|1VVVd7e3vv7|rq6srKyu|v77Ozs9ra2ry8vOTk5MTExNTU1Pb29qOjo66urs|Pz5qamgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH|GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAHAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAGAAYAAAFriAgjiQAQWVaDgr5POSgkoTDjFE0NoQ8iw8HQZQTDQjDn4jhSABhAAOhoTqSDg7qSUQwxEaEwwFhXHhHgzOA1xshxAnfTzotGRaHglJqkJcaVEqCgyoCBQkJBQKDDXQGDYaIioyOgYSXA36XIgYMBWRzXZoKBQUMmil0lgalLSIClgBpO0g|s26nUWddXyoEDIsACq5SsTMMDIECwUdJPw0Mzsu0qHYkw72bBmozIQAh|QQABwABACwAAAAAGAAYAAAFsCAgjiTAMGVaDgR5HKQwqKNxIKPjjFCk0KNXC6ATKSI7oAhxWIhezwhENTCQEoeGCdWIPEgzESGxEIgGBWstEW4QCGGAIJEoxGmGt5ZkgCRQQHkGd2CESoeIIwoMBQUMP4cNeQQGDYuNj4iSb5WJnmeGng0CDGaBlIQEJziHk3sABidDAHBgagButSKvAAoyuHuUYHgCkAZqebw0AgLBQyyzNKO3byNuoSS8x8OfwIchACH5BAAHAAIALAAAAAAYABgAAAW4ICCOJIAgZVoOBJkkpDKoo5EI43GMjNPSokXCINKJCI4HcCRIQEQvqIOhGhBHhUTDhGo4diOZyFAoKEQDxra2mAEgjghOpCgz3LTBIxJ5kgwMBShACREHZ1V4Kg1rS44pBAgMDAg|Sw0GBAQGDZGTlY|YmpyPpSQDiqYiDQoCliqZBqkGAgKIS5kEjQ21VwCyp76dBHiNvz|MR74AqSOdVwbQuo|abppo10ssjdkAnc0rf8vgl8YqIQAh|QQABwADACwAAAAAGAAYAAAFrCAgjiQgCGVaDgZZFCQxqKNRKGOSjMjR0qLXTyciHA7AkaLACMIAiwOC1iAxCrMToHHYjWQiA4NBEA0Q1RpWxHg4cMXxNDk4OBxNUkPAQAEXDgllKgMzQA1pSYopBgonCj9JEA8REQ8QjY|RQJOVl4ugoYssBJuMpYYjDQSliwasiQOwNakALKqsqbWvIohFm7V6rQAGP6|JQLlFg7KDQLKJrLjBKbvAor3IKiEAIfkEAAcABAAsAAAAABgAGAAABbUgII4koChlmhokw5DEoI4NQ4xFMQoJO4uuhignMiQWvxGBIQC|AJBEUyUcIRiyE6CR0CllW4HABxBURTUw4nC4FcWo5CDBRpQaCoF7VjgsyCUDYDMNZ0mHdwYEBAaGMwwHDg4HDA2KjI4qkJKUiJ6faJkiA4qAKQkRB3E0i6YpAw8RERAjA4tnBoMApCMQDhFTuySKoSKMJAq6rD4GzASiJYtgi6PUcs9Kew0xh7rNJMqIhYchACH5BAAHAAUALAAAAAAYABgAAAW0ICCOJEAQZZo2JIKQxqCOjWCMDDMqxT2LAgELkBMZCoXfyCBQiFwiRsGpku0EshNgUNAtrYPT0GQVNRBWwSKBMp98P24iISgNDAS4ipGA6JUpA2WAhDR4eWM|CAkHBwkIDYcGiTOLjY|FmZkNlCN3eUoLDmwlDW|AAwcODl5bYl8wCVYMDw5UWzBtnAANEQ8kBIM0oAAGPgcREIQnVloAChEOqARjzgAQEbczg8YkWJq8nSUhACH5BAAHAAYALAAAAAAYABgAAAWtICCOJGAYZZoOpKKQqDoORDMKwkgwtiwSBBYAJ2owGL5RgxBziQQMgkwoMkhNqAEDARPSaiMDFdDIiRSFQowMXE8Z6RdpYHWnEAWGPVkajPmARVZMPUkCBQkJBQINgwaFPoeJi4GVlQ2Qc3VJBQcLV0ptfAMJBwdcIl|FYjALQgimoGNWIhAQZA4HXSpLMQ8PIgkOSHxAQhERPw7ASTSFyCMMDqBTJL8tf3y2fCEAIfkEAAcABwAsAAAAABgAGAAABa8gII4k0DRlmg6kYZCoOg5EDBDEaAi2jLO3nEkgkMEIL4BLpBAkVy3hCTAQKGAznM0AFNFGBAbj2cA9jQixcGZAGgECBu|9HnTp|FGjjezJFAwFBQwKe2Z|KoCChHmNjVMqA21nKQwJEJRlbnUFCQlFXlpeCWcGBUACCwlrdw8RKGImBwktdyMQEQciB7oACwcIeA4RVwAODiIGvHQKERAjxyMIB5QlVSTLYLZ0sW8hACH5BAAHAAgALAAAAAAYABgAAAW0ICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi||AS2SoyXrK4umWPM5wNiV0UDUIBNkdoepTfMkA7thIECiyRtUAGq8fm2O4jIBgMBA1eAZ6Knx|gHaJR4QwdCMKBxEJRggFDGgQEREPjjAMBQUKIwIRDhBDC2QNDDEKoEkDoiMHDigICGkJBS2dDA6TAAnAEAkCdQ8ORQcHTAkLcQQODLPMIgIJaCWxJMIkPIoAt3EhACH5BAAHAAkALAAAAAAYABgAAAWtICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi|AS2SoyXrK4umWHM5wNiV0UN3xdLiqr|mENcWpM9TIbrsBkEck8oC0DQqBQGGIz||t3eXtob0ZTPgNrIwQJDgtGAgwCWSIMDg4HiiUIDAxFAAoODwxDBWINCEGdSTQkCQcoegADBaQ6MggHjwAFBZUFCm0HB0kJCUy9bAYHCCPGIwqmRq0jySMGmj6yRiEAIfkEAAcACgAsAAAAABgAGAAABbIgII4k0DRlmg6kYZCsOg4EKhLE2BCxDOAxnIiW84l2L4BLZKipBopW8XRLDkeCiAMyMvQAA|uON4JEIo|vqukkKQ6RhLHplVGN|LyKcXA4Dgx5DWwGDXx|gIKENnqNdzIDaiMECwcFRgQCCowiCAcHCZIlCgICVgSfCEMMnA0CXaU2YSQFoQAKUQMMqjoyAglcAAyBAAIMRUYLCUkFlybDeAYJryLNk6xGNCTQXY0juHghACH5BAAHAAsALAAAAAAYABgAAAWzICCOJNA0ZVoOAmkY5KCSSgSNBDE2hDyLjohClBMNij8RJHIQvZwEVOpIekRQJyJs5AMoHA|GMbE1lnm9EcPhOHRnhpwUl3AsknHDm5RN|v8qCAkHBwkIfw1xBAYNgoSGiIqMgJQifZUjBhAJYj95ewIJCQV7KYpzBAkLLQADCHOtOpY5PgNlAAykAEUsQ1wzCgWdCIdeArczBQVbDJ0NAqyeBb64nQAGArBTt8R8mLuyPyEAOwAAAAAAAAAAAA|wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw|R0lGODlhOgAyANUAANnZ2c7OzsrKyt|f38nJyfLy8vz8|MvLy|np6dXV1dDQ0Ozs7Pv7|n5|dbW1s|tra2urq6vf39|djY2Ovr6|uDg4NHR0fHx8dLS0tvb297e3sjIyNTU1MfHx|j4|Pb29tfX1|7u7uLi4uPj48bGxujo6OHh4e|v7|Tk5OXl5fT09N3d3dPT09zc3PDw8PPz8|fn5|X19e3t7ebm5s3NzczMzP|wAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAA6ADIAAAb|wFxuYtrcAsikcslsOp|BWwYjE|YWAoEDwO16v|CweNwd4Tys4eEjsrrf8Lh8LmdEPBqTYELv|9WFwskFBkAGzCAiotCFxIRASAOOSYPOAOMmXMNCxE3BwAlBxo5Njc3mJqqOQwoFTg4ABYNOR0cQqaoq4whFgABOBUStEIxB22lp6m7fQ0oDgcHIwvEVhAbLla5y8xxMZ4BsnxxEgHV291zFSAzDHQMNyhu6OlxIjcrfSUKFPPK9XJkHCAxZwIOgv50AYSDxcKcCBXg0FtoBYOABXMKCGgh8R9FVhUCFKAzIltHhQtpKEhQLQ4JHBfiTKynAgeMfm8ghBBiIIMJ|zkzu9kgYCMOBQ4EVORgccMAUI|dKHTAUSPOhBcOBgRQ8UDCnKCqLjh4QCNOgXBOOZyI|BXqqp4JnMKRQCCFFQYJRrZFuQpChw0x36TA4XURWE0QsLoxEAEHKUaHNYUIgEGICAUfdmaKrKkAAQQabnCQu9ljAwSoU6tevdoCaQsEBORbhQ6CAw8EcuvezXs3iA5uZmDchc7AgwOwkitfvlzAB4rFFSBnTr15Auj|DEivzh2WgOsLo0|vTv07dl3ax5O3fh5T|vXlwQMUD5|fDZt9dXfn9|fvX79VcPffslJ2A6BBaIw4FC|aegd|IN6OCDDDKTYIEVEjehghnStmkhhhEieMMlORgHYH3OYZdBNhAAEFsWMMYoY4x1UbTCAxjc4A4FBfTo449AAskRRQk40IIHHLjzEWIlnIARCyDgaMOUVFZp5ZVYZqkllSVscAJwQmgQgSWnlGnmmWimqeaap|AQwDRCBAEAOw|R0lGODlhQgAyAMQAANTU1Orq6q|vr|vT09O|v77S0tN|f38rKyrq6us|Tk5MTExNra2r|v6qqqszMzP|wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAABCADIAAAX|ICSOZGmeaKquUOS|cCzPdG3X4q3vPJ|3wGDvJywaY8SjUphcOnfNJWEQKzxf0SIggXg8EC6A4WEAUJ1ZIeBb6BYOD0VhDXimg2tCJPAIdM8GDnYtTmsufAEOCS8MgmiES4Z7fX8uBgyDT5KIfAx|DwuZhQ|HfXsMZApXd1etLqyuq5CxtK|ztbGwTgR1srgvfK26EVYwA3ouyDzFRqwOAgIPAqFi0QeJ0goDDQ|ICZ6kEWIPCQcRAnUEcRHqoTTODwAEz7xfBwUPDgQHAggDDw3YPbhGak2DAgr6MFjEbRGcMzOcCSgVQBK3a4kmLhQnYEAwBwYCBFgQ7yGDMQMY|2DCcSuGA0f|Gkha87JmBJIEDID5KKCmgwP|MEZakOiC5IVw3FztyDgOVRWPhpwMQCAFZAPBmCFGLElDAfxFiSYKomAgAQL4KiKkHDqJHFxPllpCHdRUa8vQEZLYEUSMQTQ|LnA5zRYhANgyyVbx8cpSxsvfxVx5kgyEFYHzFm|jHdzs85aAohTFgOAaBiZfYAWEi|CqRmtv1a|cYcAsxoBSLt4TUxZvAHMIlPlisTrgmjSFpB0B5itFzJ6WptK6MVA9ATRDFwVRKALm64zBDCwHSiCThcCFPAxA6eOdJG|SboXcK18ZAMhA4wFLyN3gAYJCALARDh5REBS7rkXgKWBCLoGhnMRvIQPAiIldJstM1CHHXcDbaSVF2Al6NqCYOUjnVPczOMAHwHWdGEEUeBjRoSOvDQQXKdJp|AaObq3Vhc04rPWHMTB2JI6cnDjCBxZRbBUGzqOCMcCUM4HAD|YRIbdAQsYYFdxGWZXyQD9UIXKA40I8l5KXjSySDwGoENFZLyMwcCLRnomzGp6DsFnn1D8CShtgg76mKFHsKDooowqGgIAOw|wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw|CB_version|String|fromCharCode|x1B|CB_pngie|all|captureEvents|Event|MOUSEMOVE|on|load|onkeypress|position|static|CB_RoundPixBugFix|item|createElement|setAttribute|cellspacing|cellpadding|CB_TopLeft|CB_Top|CB_TopRight|CB_Body|valign|align|frameborder|maximize|loading|Pause|Start|CB_BtmLeft|CB_Btm|CB_BtmRight|padding|fff|solid|fontFamily|fontSize|fontWeight|color|onmousemove|CB_URL|nClearBox|galeria|neve|NEM|lehet|click|nHibasan|megadott|REL|azonosito|while|onerror|complete|getContext|createTextNode|CB_ThumbsImg|clientX||pageX|CB_FullSize|gt|br|eredeti|_box|target|_blank|Jobb|klikk|hivatkoz|ment|ven|lement|offsetHeight|Back|pageXOffset|opera|returnValue|DOMMouseScroll\'.split(\'|\'),0,{}));'
		+'CB_ClickIMG=function(a){if(CB_Show==0){return false}CB_Cls.onclick="";CB_SlideS.onclick="";CB_SlideP.onclick="";CB_Clicked=a.split("+\\\\+");CB_Rel=CB_Clicked[0].split(",");if(CB_Rel[1]>0){CB_SlShowTimer=parseInt(CB_Rel[1])*1000}else{CB_SlShowTimer=CB_SlShowTime}if(CB_Rel[2]=="start"){CB_SS="pause"}CB_Gallery=new Array;CB_Gallery.push(new Array(CB_Rel[0],CB_Rel[1],CB_Rel[2]));if(CB_Clicked[0]=="clearbox"){CB_Gallery.push(new Array(CB_Clicked[1],CB_Clicked[2]))}else{for(i=0;i<CB_Links.length;i++){if(CB_Links[i].rel.substring(9,CB_Links[i].rel.length-1).split(",")[0]==CB_Gallery[0][0]){CB_ActThumbSrc=CB_PicDir+CB_PictureNoprvGif;if(CB_Links[i].getAttribute("tnhref")==null||CB_Links[i].getAttribute("tnhref")=="null"){for(j=0;j<CB_Links[i].childNodes.length;j++){if(CB_Links[i].childNodes[j].src!=undefined){CB_ActThumbSrc=CB_Links[i].childNodes[j].src}}}else{CB_ActThumbSrc=CB_Links[i].getAttribute("tnhref")}CB_Gallery.push(new Array(CB_Links[i].getAttribute("href"),CB_Links[i].getAttribute("title"),CB_ActThumbSrc))}}}CB_ActImgId=0;while(CB_Gallery[CB_ActImgId][0]!=CB_Clicked[1]){CB_ActImgId++}CB_ImgWidthOld=CB_WinBaseW;CB_ImgHeightOld=CB_WinBaseH-CB_TextH;CB_SetAllPositions();CB_HideDocument();CB_ScrollEnabled=false}'


	var scriptURL="http://userscripts.org/scripts/source/24506.user.js";
	var AutoUpdateURL="http://userscripts.org/scripts/source/24506.meta.js";

	var loc=String(window.location.href); // teljes cím
	var path=String(window.location.pathname); // /pages/... cím (GETes értékek nélkül)
	var host=loc.match(/^(https?:\/\/[^\/]*)/)[1]; // host, pl.: http://iwiw.hu

	// default beállítások
	var opt={
		autoupdate: true, //!
		autoupdate_nap: 2, //! 2 naponta automatikus frissítés keresés
		lastupdate: 0, //! utolsó update keresésének ideje
		removebanners: true, //! (használva a v2.4.0-ban is)
		msg_multiple: true,
		torolt_kapcs_figyelo: true, //!
		torolt_kapcs_figyelo_nev: false, //! név megjegyzése
		torolt_kapcs_figyelo_regiism: [], //!
		torolt_kapcs_figyelo_regiism_nev: {}, //! pl: .id012402=nev
        torolt_kapcs_figyelo_last: 0, //! utolsó ellenőrzés ideje (unix time, ms!)
        torolt_kapcs_figyelo_cnt: 0, //! hány db törölt kapcs van?
		userimgs: 'clearbox',	// default, clearbox, new_window
		mypc_osszesismvisszaigazolasa: true,
		myfriends_msg: true,
		msg_inbox_delicon: true,
		msg_inbox_delicon_confirm: true,
		msg_inbox_rowclick: true,
		sm_inbox: true,
		msg_reply2: true, // ha msg_inbox_ajaxmail be van kapcsolva, akkor ajax-os, különben normál
		msg_inbox_ajaxmail: true,
		msgboard_extrauserimg: true, // clearbox és összes nagy kép új ablakba ikon megjelenítése a HÍRFOLYAMNÁL
		sysmsg_openuserpage: false, // rendszerüzeneteknél az adatlap automatikus megnyitása
		favuser: true, //!
		favusers: [], //! fav users és oldalak [nev, link/userid]
		userpic_extraimg: true, // ismerőseim, ismerősök oldalon a kisképen clearbox és nagyító ikon
		szulinap_koszonto: false,
		szulinap_koszonto_targy: '',
		szulinap_koszonto_szoveg: '',
		nevnap_koszonto: false,
		nevnap_koszonto_targy: '',
		nevnap_koszonto_szoveg: '',
		koszonto_utolso: '',
		koszonto_volt: [],
		quickview: true, // QUICK VIEW
		flood: 1, // 0:kikapcsolva, 1:azonos percben figyel, 2:szöveg+feladó azonosság, 3:csak szöveg egész üzifalon
		load_all_albumpic: 'ajax', // kisképek betöltése: 'none', 'quick', 'ajax'
		big_image_clearbox: false,	// ClearBoxba az eredeti képek töltődjenek be
		msgboard_club: false,	// klubok kiemelt üzenőfalának elrejtése
		forum_autorefresh: true,	// fórumon új hozzászólások keresése
		smiley4textarea: true, // szmájli link/ikon a textarea-k mellett
		searchismdef: true, // jobb felső kereső box-ban az "ismerőseim" legyen a default (ezt a tools automatán beszúrja)
		smiley2text_hirfolyam: false,  // szmájli szöveggé alakítása a hírfolyamban
		smiley2text_all: false, // szmájli szöveggé alakítása az összes többi helyen
		myfriends_delkapcs: false, // kapcsolat törlése ikon az ism. oldalon
		removevb: false, //!
        albums_extraimg: true, // albumok és user adatlapon nagyító és clearbox ikon
        figyelo: {}, //! kapcsolatok figyelése figyelo.id123={nev: .., ism:[], last:nap, start:nap, v:[ {i:123,n:nap,u:0|1} ]} (i=userID, n=nap, start=figyelés kezdete, u=ÚJ 1:igen,0:nem)
        figyelo_uj: false, //! van e megtekintetlen változás?
        cardvarosmap: true,
        // ÚJ v2.4.0-tól:
        slim_tabber: true,
        remove_index_rightside: true,
        morenewpic_index: false,
        morenewpic_index_db: 16,
        autohidedetails_on_allpic: true, // Album képek oldalon összes kép betöltésére nyomva automatán rejtse el a részletek sávot
        albumpic_add_pager: true, // album képek oldalon pager hozzáadása, ha nincs
        hideadatlapinfobox: true,
        removenewpic_index: false, // kezdőlapon pár dolog elrejtése:
        removeemlekezteto_index: false,
        removeesemeny_index: false,
        addfavforum_index: false, // kedvenc forumtémák betöltése kezdőlapra
        defaultboardmsg: false,
        albumpic_autoloadall: true, // összes kiskép automata betöltése
        albumpic_defhidedetails: true, // alapból rejtse el a jobb oldali oldalsávot
        replacealbumimglink: true, // direkt linkre csere
        loadallalbum: true, // összes album betöltése képek alatt/mellett
        taskbaroff: false, // chat és "tálca" kikapcsolása
        loadalbumsadatlap: true,
        sectimeout: false, // ajax kérés 2 percenként (aka kilépésgátló)
        addkeresomenu: true, // kereső menüpont az alsó menüsorban
        nevjegynagykep: true, // névjegynél képre húzva az egeret nagy profilkép
        removeshoppingbox_index: false,
        removegolyahir: false,
        removepollbox: false,
        removefrisshirek: false        
        
	}

	var tmpvars={} // ideiglenes változóknak

	var opt2={ // fix beállítások
		ajaxProbalkozasokSzama: 3,
		msgsave_inbox: "<h3>{targy}</h3>\n<b>Feladó:</b> <img src=\"{kuldopic}\" /> <a href=\"{url}\">{kuldo}</a><br/>\n"
			+"<b>Címzett(ek):</b> {cimzettek}<br/>\n<b>Feladás dátuma:</b> {ido}<br/>\n{szoveg}",
		msgsave_outbox: "<h3>{targy}</h3>\n"
			+"<b>Címzett(ek):</b> {cimzettek}<br/>\n<b>Feladás dátuma:</b> {ido}<br/>\n{szoveg}",
        toroltkapcs_interval: 3600 //! Mekkora legyen a min várakozás egy újraellenőrzésnél? (sec)        
	}
    
    // ------ alap fgv-ek ------
    
    var log=function(s){
        if(DEBUG) GM_log(s);
    }
	
    var addCSS=function(s){
		GM_addStyle(s);
	}
	function addJS(js){
		var c=document.createElement('script');
		c.setAttribute('type', 'text/javascript');
		c.innerHTML=js;
		document.getElementsByTagName('head')[0].appendChild(c);
	}
    
    
    // str_replace (php mintájára)
    var str_replace=function(search, replace, subject){
		// http://kevin.vanzonneveld.net
		var s = subject;
		var ra = r instanceof Array, sa = s instanceof Array;
		var f = [].concat(search);
		var r = [].concat(replace);
		var i = (s = [].concat(s)).length;
		var j = 0;
		while (j = 0, i--) {
			if (s[i]) {
				while (s[i] = (s[i]+'').split(f[j]).join(ra ? r[j] || "" : r[0]), ++j in f){};
			}
		}
		return sa ? s : s[0];
	}
    
    // Szöveget számmá illeszt, és ellenőrzi a határokat
    var parseInt2=function(string, min, max){
        string=string*1;
        if( !string ) string=0;
        if(string<min) string=min;
        if(string>max) string=max;
        return string;
    }
    
    // Mai dátum lekérése
    var getDay=function(){
        var d=new Date();
        return (d.getYear()+1900) + "." + (d.getMonth()<9?"0":"") + (d.getMonth()+1) + "." + (d.getDate()<10?"0":"") + d.getDate() + ".";
    }

	// Beállítások elmentése
    var saveOpt=function(){
		var nev=USERID+'_opt';
        var ertek=$.toJSON(opt);
		setTimeout(function(){GM_setValue(nev, ertek);}, 0);
	}
    
    // ajax kérések beállítása
    var configJQueryAjax=function(){
        $('body').append('<div id="it_ajaxloading" style="z-index:9998">Betöltés...</div><div id="it_ajaxinfo" style="z-index:9999"></div>');
		$.ajaxSetup({
            traditional: true,
			type:'GET',
			timeout: 20000,
			ujraprobalkozas: 0,
			error: function(req, status, err){
				var r=this;
				log('AJAX hiba: '+status+', err: '+err+', url: '+this.url);
				r.ujraprobalkozas++;
				$("#it_ajaxinfo").text('Ajax hiba ('+status+'). Újrapróbálkozás ('+r.ujraprobalkozas+'/'+opt2.ajaxProbalkozasokSzama+')...').show();
				if(r.ujraprobalkozas>opt2.ajaxProbalkozasokSzama){
					$("#it_ajaxinfo").text('Ajax hiba ('+status+'). Sikertelen betöltés.').show();
					setTimeout(function(){$("#it_ajaxinfo").hide();}, 3000);
					if(typeof(r.error2)!="undefined") r.error2(r);
					return;
				}
				setTimeout(function(){
					$("#it_ajaxinfo").hide();
					$.ajax(r);
				}, 1000);
			},
            beforeSend: function(){
                $("#it_ajaxloading").show();
            },
            complete: function(){
    			$("#it_ajaxloading").hide();
            }
		});
	}
    
    

    // --- iwiw tools fgv-ek ---
    
    

    // adatlapok kell meghívni s a nézett adatlap userid-ját adja vissza
    var getUserIDFromAdatlap=function(){
        var $a=$('div.pageTitle a[href*="compose.jsp?userID"]'); // üzenek gomb :)
        if( $a.length>0 ){
            return $a.attr('href').match(/userID=(\d+)/)[1];
        }else{
            return false;
        }
    }    

    // több kiskép betöltése kezdőlapon
    var replaceImageCnt=function(){
        var $a=$('.remoteLoad > a[href*=index_right]');
        log("a cnt: " + $a.length);
        $a.attr('href', '/pages/image/index_right.jsp?minCount=3&maxCount=' + opt.morenewpic_index_db);
        log("href cserélve");
    }
    
    // Jobb oldalsáv eltávolítása kezdőlapon
    var removeIndexRightSide=function(){
        $('.grid_2.sidebar').remove();
        $('.grid_6').removeClass('grid_6').addClass('grid_8');
    }
    
    // .tabber méretének csökkentése (-6px)
    var slimTabber=function(){
        addCSS(' .tabber{height:29px !important;} '
            +' .tabber .tab a{padding: 6px 14px 7px !important;} '
            +' .tabber .tab.active a{padding-bottom: 8px !important;} '
            +' .tabber .tab.secondary .tab a{line-height: 19px !important;} '
            +' .tabber.withTitle .buttons {margin-top:-1px !important;} ' );
    }
    
    // reklámok eltávolítása
    var removeBanners=function(){
        $('#topAdvert, .goAdverticum').remove();
        $('.indexNewsBox').remove();
        $('#content div.indexRightSideContainer').removeClass('grid_5').addClass('grid_4').css('width', 'auto');
                                
    }
    
    // User adatok lekérése XML-ben: user_id, sikeres lekérés FN, hiba esetén FN, egyéb adatok (object)
    var getUserXML=function(userid, success, error, obj){
        var d={};
        d.method="GET";
        d.url=host + "/pages/browser/getusers.jsp?userid=" + userid + "&aid=" + USERID;
        d.onload=function(data){
            if(obj) success.apply(obj, [data.responseText] );
            else success( data.responseText );
        }
        if(error) d.onerror=error;
        d.headers={ 'User-Agent': 'Jakarta Commons-HttpClient/2.0.2' }
        GM_xmlhttpRequest(d);
    }
    
    // Ismerősök és azok neveinek lekérése XML-ben
    var getFriendsXML=function(userid, success){
        var d={};
        d.method="GET";
        d.url=host + "/pages/browser/getfriends.jsp?userid=" + userid + "&aid=" + USERID;
        d.onload=function(data){
            //if(obj) success.apply(obj, [data.responseText] );
            //else success( data.responseText );
            success( data.responseText );
        }
        //if(error) d.onerror=error;
        d.headers={ 'User-Agent': 'Jakarta Commons-HttpClient/2.0.2' }
        GM_xmlhttpRequest(d);  
    }
    
    // Törölt kapcsolatok keresése
    var checkToroltKapcsolat=function(callAfterLoaded){
        // idő limit ellenőrzése
        if( !callAfterLoaded && (opt.torolt_kapcs_figyelo_last+opt2.toroltkapcs_interval*1000>new Date().getTime()) ) return;
        log("Törölt kapcsolatok keresése...");
        if(callAfterLoaded) tmpvars.toroltkapcs_callAfterLoaded=callAfterLoaded; else tmpvars.toroltkapcs_callAfterLoaded=false;
        getUserXML(USERID, toroltKapcsolat_Ajax );
    }
    
    // Törölt kapcsolatok figyelése AJAX válasz
    var toroltKapcsolat_Ajax=function(data){
        var status=$(data).find('status').text();
        log('Törölt kapcs figyelő statusz: ' + status);
        if(status!="10"){
            return;
        }
        var uj=$(data).find('connections').text().split(',');
        tmpvars.ismeros_lista=uj;
        var regi=opt.torolt_kapcs_figyelo_regiism; // régi ismerősők betöltése
        var ujkapcsolat=0;
        for(var i in uj) if($.inArray(uj[i], regi)==-1) {ujkapcsolat++; regi.push(uj[i]);} // új kapcsolatokat beteszük a régibe
        opt.torolt_kapcs_figyelo_regiism=regi; // új ismerősőkkel feltöltött régi tömböt mentjük (újat nem!)
        var a=0; // törölt kapcsolatok száma
        for(var i in regi) if( $.inArray(regi[i], uj)==-1 ) a++;
        opt.torolt_kapcs_figyelo_cnt=a;
        log(a+" db törölt kapcsolat");
        opt.torolt_kapcs_figyelo_last=new Date().getTime();
        saveOpt();
        if(tmpvars.toroltkapcs_callAfterLoaded) tmpvars.toroltkapcs_callAfterLoaded();
        if(!opt.torolt_kapcs_figyelo_nev) return; // ha nem kért névmegjegyzést, kilépünk
        var ures=true; for(i in opt.torolt_kapcs_figyelo_regiism_nev){ ures=false; break; }
        if(!ures && ujkapcsolat==0) return; // ha nincs új kapcsolat kilépünk
        log('Törölt kapcsolatoknál nevek frissítése...');
        getFriendsXML(USERID,  function(data){
            var t={}; // új nevek (ideiglenes)
            $('userlist > user', data).each(function(){ t['id'+$(this).attr('id')]=$(this).text(); });
            for(var i in regi){
                if(!t['id'+regi[i]]) continue;
                opt.torolt_kapcs_figyelo_regiism_nev['id'+regi[i]]=t['id'+regi[i]];
            }
            saveOpt();
            log('Törölt kapcsolatoknál nevek frissítve.');
        });
    }
    
   
    // Kapcsolatfigyelő link adatlapra
    var addKapcsolatfigyeloLink=function(){
        var id=getUserIDFromAdatlap();
        if( id==USERID ) return false;
        if( opt.figyelo['id'+id] ){
            $('#content ul.actions')
                .append( $('<li><a href="javascript:;" class="actionLink" title="Felhasználó új és törölt kapcsolatainak figyelése már be van kapcsolva">Kapcsolatok figyelése bekapcsolva</a></li>')
                    .find('a')
                    .click(function(){ alert("Felhasználó új és törölt kapcsolatainak figyelése már be van kapcsolva.\nA változásokat megtekinteni és a felhasználót törölni a figyelési listából az iwiw TOOLS menün belül tudod megtenni."); })
                    .end() );
            return;
        }
		$('#content ul.actions').append('<li><a href="javascript:;" class="actionLink" title="Felhasználó új és törölt kapcsolatainak figyelésének bekapcsolása">Kapcsolatok figyelése</a></li>');
		$('#content ul.actions a:last').click(function(){
            if( id==USERID ){
                alert("Saját magad nem lehet figyeltetni! Használd a törölt kapcsolatok figyelését!");
                return false;                
            }
            if( opt.figyelo['id'+id] ){
                alert("A kijelölt felhasználó már fel van véve a figyelési listába!");
                return false;
            }
			var r=confirm("Felhasználó új és törölt kapcsolatainak figyelésének bekapcsolása\n\n"
                +"Ezt a funkciót bekapcsolva naponta egyszer (ha bejelentkezel az iwiw-re) a kijelölt felhasználónak az ismerőslistájának változásai mentésre kerülnek. "
                +"A változásokat (az adott felhasználó új és törölt kapcsolatainak listáját) az iwiw TOOLS menüben tudod majd megtekinteni.\n"
                +"NE kapcsold be a figyelést sok felhasználóra, mert minden egyes felhasználó plusz 1 ajax kérést jelent. Ajánlott 5-10 figyelt felhasználó alatt maradni!\n\n"
                +"Be szeretnéd kapcsolni a kapcsolatfigyelést a kijelölt felhasználónál?");
            if(!r) return false;
            getUserXML(id, kapcsolatfigyeloLink_Ajax);
			return false;
		});
	}
    
    // addKapcsolatfigyeloLink-hez Ajax fgv
    var kapcsolatfigyeloLink_Ajax=function(data){
        var id=getUserIDFromAdatlap(); 
        var status=$(data).find('status').text();
        log('Figyelő statusz: ' + status);
        if(status!="10"){
            alert("Nem sikerült hozzáadni a felhasználót! Próbáld meg újra!");
            return;
        }
		var ism=[];
        if($(data).find('connections').text()){
            ism=$(data).find('connections').text().split(',');    
        }        
        for(var i in ism) if( !ism[i].match(/^[0-9]+$/) ) delete ism[i];
        //alert(ism.join(", ") + "\n\n" + ism.length);
        var o={};
        o.nev=$.trim($('#content .pageTitle h1').html());
        if(o.nev=="") o.nev=id;
        o.ism=ism;
        o.last=getDay();
        o.start=getDay();
        o.v=[];
        opt.figyelo["id"+id]=o;
        saveOpt();
        alert("A kapcsolatfigyelés sikeresen bekapcsolva a kijelölt felhasználóra!");        	
    }
    
    // Kapcsolatok figyelése (frissítése)
    var checkKapcsolatfigyelo=function(kezi_ellenorzes){
        //if(opt.figyelo_uj) appendFigyeloAlert();
        var ma=getDay();
        tmpvars.cf_ajaxok={};
        tmpvars.cf_valtozas=false;
        for(var i in opt.figyelo){
            var o=opt.figyelo[i];
            if(ma==o.last && !kezi_ellenorzes) continue;
            var id=i.match(/([0-9]+)/)[1];
            log("Kapcsolatfigyelő ellenőrzés ajax: userid="+id);
            tmpvars.cf_ajaxok['id'+id]=true;
            getUserXML(id, checkKapcsolatfigyelo_Ajax, false, {kezi_ellenorzes: kezi_ellenorzes} );            
        }
    }
    
    // Kapcsolatok figyeléséhez Ajax fgv
    var checkKapcsolatfigyelo_Ajax=function(data){
        var status=$(data).find('status').text();
        if(status!="10"){
            log("Kapcsolatfigyelő ellenőrzés STATUS ERR: userid=?");
            return;
        }
        var id=$(data).find('user[id]').attr('id');
        if(!opt.figyelo['id'+id]) return; // vmi hiba?
        var o=opt.figyelo['id'+id];
        var ism_regi=o.ism;
        var ism_uj=[];
        if($(data).find('connections').text()){
            ism_uj=$(data).find('connections').text().split(',');
        }
        var egyezik=true;
        // új kapcsolatok keresése
        for(var i in ism_uj){
            if(ism_uj[i]==""){
                delete ism_uj[i];
            }else if( $.inArray(ism_uj[i], ism_regi)==-1 ){
                o.v.push({i:ism_uj[i],n:getDay(),u:1}); // ÚJ kapcsolat
                egyezik=false;                
            }
        }
        // törölt kapcsolatok keresése
        if(!egyezik || ism_uj.length!=ism_regi.length ){
            for(var i in ism_regi){
                if( $.inArray(ism_regi[i], ism_uj)==-1 ){
                    o.v.push({i:ism_regi[i],n:getDay(),u:0}); // TÖRÖLT kapcsolat
                    egyezik=false;
                }
            }
        }
        // mentés, ha volt változás:
        o.last=getDay();
        if(!egyezik){
            o.ism=ism_uj;
            log("Kapcsolatfigyelő VÁLTOZÁS: userid="+id);
            tmpvars.cf_valtozas=true;
        }
        saveOpt();
        log("Kapcsolatfigyelő ellenőrzés OK: userid="+id);
        tmpvars.cf_ajaxok['id'+id]=false;
        var vegzett=true;
        for(var i in tmpvars.cf_ajaxok) if( tmpvars.cf_ajaxok[i] ) vegzett=false;
        if(vegzett){
            if(this.kezi_ellenorzes){
                openKapcsolatfigyelo();
                if(tmpvars.cf_valtozas){
                    alert("Az újraellenőrzés megtörtént és ÚJ változások történtek.\nA változásokat a kapcsolatfigyelő listában meg tudod tekinteni.");
                }else{
                    alert("Nincs változás.");
                }
            }else{
                if(tmpvars.cf_valtozas){
                    //appendFigyeloAlert();
                    opt.figyelo_uj=true;
                    saveOpt();
                }
            }
        }        
    }
    
    // Kapcsolatfigyelő menü megnyitása
    function openKapcsolatfigyelo(){
        $('#it_side').html('<div class="infoBox"><h3><span class="icon infoBoxIcon">InfoBox</span></h3><p>A kapcsolatfigyelőre felhasználót az adatlapján, bal oldali oldalsáv alján tudod hozzáadni.</p><p>A kapcsolatok ellenőrzése minden nap az első iWiW belépésedkor történik, ebből kifolyólag a kapcsolatváltozásnál jelzett dátum a változás "felfedezésének" napját mutatja, nem pedig a kapcsolat konkrét létrejöttének vagy törlésének napját (ha minden nap belépsz iWiW-re, akkor maximum egy nap eltérés lehet).</p></div>');
        var $a=$('#it_main');
        $a.html('<h4>Kapcsolatfigyelő</h4>');
        var cnt=0;
        opt.figyelo_uj=false;
        saveOpt();
        var ma=getDay();
        for(var i in opt.figyelo){
            var o=opt.figyelo[i];
            var id2=i.match(/([0-9]+)/)[1];
            var $b=$('<div id="figyelo_'+i+'"><ul></ul></div>');
            $b.find('ul:first').append('<li><b><a href="/pages/user/userdata.jsp?userID='+id2+'" target="_blank">'+o.nev+'</a></b> ismerőslistájának változásai ('+o.v.length+' db változás '+o.start+' óta, <a href="#">törlés a figyelési listából</a>)</li>');
            $b.find('a:last').click(function(){
                if(confirm("Biztos törlöd a kapcsolatfigyelési listából az összes elmentett változásaival együtt???")){
                    var oi="id"+$(this).parent().find('a:first').attr('href').match(/userID=([0-9]+)/)[1];
                    delete opt.figyelo[oi];
                    saveOpt();
                    openKapcsolatfigyelo();
                }
                return false;
            });
            var $c=$('<ul></ul>');
            for(var j in o.v){
                var x=o.v[j]; // {i:123,n:nap,u:0|1}
                var nap= ma==x.n ? '<b>'+x.n+'</b>' : x.n;
                if(x.u==1) $c.append('<li>'+nap+' <font color="green">új kapcsolat:</font> <a href="/pages/user/userdata.jsp?userID='+x.i+'" target="_blank">'+x.i+'</a></li>');
                else $c.append('<li>'+nap+' <font color="red">törölt kapcsolat:</font> <a href="/pages/user/userdata.jsp?userID='+x.i+'" target="_blank">'+x.i+'</a></li>');
            }
            if(o.v.length==0) $c.append('<li><i>Nincs új vagy törölt kapcsolata '+o.start+' óta</i></li>');
            $b.find('ul:first').append($c);            
            $b.find('li:last').append('<br/>');
            $a.append($b);
            cnt++;            
        }
        if( cnt==0 ){
            $a.append('Nincs beállítva egyetlen felhasználó kapcsolatainak figyelése se. Ha szeretnél felhasználót felvenni figyelésre, akkor azt az adatlapjukon a bal oldali menüben meg tudod tenni.');
            return;
        }else{
            $('#it_side div:last').append('<p><a href="#">Kattints ide</a> az összes kapcsolat újraellenőrzéséhez (napi egyszeri ellenőrzés automatikus!).</p>');
            $('#it_side div:last a:last').click(function(){
                $(this).parent().html('<i>Ellenőrzés folyamatban...</i>');
                checkKapcsolatfigyelo(true);
                return false;
            })
        }
    }
    
    // Köszöntő
    var loadKoszonto=function(){
        var ajax_cnt=2;
        var nap=new Date().getDate();
        log("nap: "+nap);
        tmpvars.koszontok=[];
        // szülinaposok lekérése:
        if(opt.szulinap_koszonto) $.get('/i/unnepek', function(d){
            $('.usermini', d).each(function(){
                try{
                    var s=$(this).find('.birthDay').text().match(/([^ ]+) ([0-9]+)/);
                    var uid=$(this).attr('data-userid');
                    var x=s[2]*1;
                    var kor="?";
                    if($(this).find('.body p:first').text().match(/([0-9]+) .*ves/)) kor=RegExp.$1;
                    if(x==nap) tmpvars.koszontok.push([ true , uid, $(this).find('.name').attr('title'), kor ]);
                }catch(err){ }
            })
            ajax_cnt--;
            if(ajax_cnt==0) koszontoNext();
        }); else ajax_cnt--;
        // névnaposok lekérése:
        if(opt.nevnap_koszonto) $.get('/i/unnepek?t=name', function(d){
            $('.usermini', d).each(function(){
                try{
                    var s=$(this).find('.nameDay').text().match(/([^ ]+) ([0-9]+)/);
                    var uid=$(this).attr('data-userid');
                    var x=s[2]*1;
                    if(x==nap) tmpvars.koszontok.push([ false , uid, $(this).find('.name').attr('title'), '0' ]);
                }catch(err){ }
            })
            ajax_cnt--;
            if(ajax_cnt==0) koszontoNext();
        }); else ajax_cnt--;        
    }
    
    // Köszöntők megjelenítése
    var koszontoNext=function(){
		if(tmpvars.koszontok.length==0) return;
		var ma=new Date(); ma=ma.getMonth()*100 + 100 + ma.getDate();
		if(ma!=opt.koszonto_utolso){ opt.koszonto_utolso=ma; opt.koszonto_volt=[]; }
		var t=tmpvars.koszontok.pop();
		if($.inArray(t[0]+t[1], opt.koszonto_volt)>=0){
			log('Köszöntő volt már: '+t[0]+' - '+t[2]);
			koszontoNext();
			return;
		}
		log('Köszöntő küldése: '+t[0]+' - '+t[2]);
        var $d=$2('<div title="Köszöntő küldése" style="padding:20px"></div>')
            .append( (t[0]?'Születés':'Név') + 'napi köszöntő: ' )
            .append( $2('<a href="/pages/user/userdata.jsp?userID='+t[1]+'" target="_blank" style="font-weight:bold;color:#032A61" />').text(t[2]) )
            .append( '<br/><br/>Tárgy:<br/>' )
            .append( $2('<input style="width:460px" />').val( t[0]?opt.szulinap_koszonto_targy:opt.nevnap_koszonto_targy ) )
            .append( '<br/>Szöveg:<br/>' )
            .append( $2('<textarea style="width:456px;height:160px;"/>') )
            .append( $2('<div style="margin-top:16px; text-align:center;" />')
                .append( $2('<a href="javascript:;" class="button highlighted close" style="margin-left:10px;"><span>Küldés</span></a>').click(function(){
                    $.ajax({
                        url: '/pages/message/compose.jsp?method=SaveForm',
                        timeout: 20000,
                        type: 'POST',                                                   
                        data: {token: $('input[name=token]:first').val(), p_recipient: t[1], p_subject: $d.find('input:text').val(), p_text: $d.find('textarea').val() },
                        success: function(){ opt.koszonto_volt.push(t[0]+t[1]); saveOpt(); },
                        error2: function(){ opt.koszonto_volt.push(t[0]+t[1]); saveOpt(); alert('Nem sikerült elküldeni a köszöntő üzenetet: '+t[2]); }
                    });
                    setTimeout(koszontoNext, 25);
                }) )
                .append( $2('<a href="javascript:;" class="button highlighted close" style="margin-left:10px;"><span>Neki nem küldök</span></a>').click(function(){
                    opt.koszonto_volt.push(t[0]+t[1]);
                    saveOpt();
                    setTimeout(koszontoNext, 25);
                }) )
                .append( $2('<a href="javascript:;" class="button plain close" style="margin-left:10px;"><span>Mégse</span></a>') )
            ).dialog({modal:true, width:500, height:400});
        // adatok betöltése        
        var szoveg=t[0]?opt.szulinap_koszonto_szoveg:opt.nevnap_koszonto_szoveg;
	  	szoveg=szoveg.replace(/<userid>/g, t[1]);
	  	szoveg=szoveg.replace(/<kor>/g, t[3]);
		if(szoveg.match(/<(vezeteknev|keresztnev|becenev|conncount)>/)){
			$d.find('textarea').val('[adatok betöltése...]');
            getUserXML(t[1], function(data){
        	 	if($('status', data).text()=="10"){
	  	            szoveg=szoveg.replace(/<vezeteknev>/g, $('#familyname', data).text());
	  	            szoveg=szoveg.replace(/<keresztnev>/g, $('#firstname', data).text());
	  	            szoveg=szoveg.replace(/<becenev>/g, $('#middlename', data).text());
	  	            szoveg=szoveg.replace(/<conncount>/g, $('#conncount', data).text());
                }else{
                    alert("Nem sikerült betölteni a felhasználó adatait!\nKérlek egészítsd ki küldés előtt kézzel a sablon szöveget!");
                }
                $d.find('textarea').val(szoveg);
            });
		}else $d.find('textarea').val(szoveg);
	}
    
    // Frissítések keresése
    var autoUpdate=function(){
		var d=new Date();
		if(opt.lastupdate + opt.autoupdate_nap * 1000*3600*24 > d.getTime()) return false;
        log("update keres...");
        GM_xmlhttpRequest({
            method: 'GET',
            url: AutoUpdateURL,
            onload: function(data){
                opt.lastupdate=d.getTime();
                saveOpt();
                
                var m=parseHeaders(data.responseText);
                var actual=META["version"].split(".");
                var newversion=m["version"].split(".");
                var uj=false;
                for(var i=0;i<3;i++) if(actual[i]*1<newversion[i]*1) uj=true; // ez nem teljesen korrekt verziószám összehasonlítás, de régebbi verziót nem fogok feltölteni ugyse...
                log( (uj?"van":"nincs")+" update");
                
                if(uj){
                    var changelog="<h3>Új verzió: v"+m["version"]
                        +"<br/>Frissítés ideje: "+m["uso"]["timestamp"]+"<br/><br/>Információk: <a href='http://userscripts.org/24506' target='_blank'>http://userscripts.org/24506</a></h3>";
                    
                    $2('<div title="Új iwiw TOOLS jelent meg. Telepíted?"></div>')
                        .append( $2('<div style="width:484px;padding:4px 8px 4px 8px;height:140px;margin: 0 auto;text-align:left"/>').append(changelog) )
                        .append( $2('<div style="margin-top:16px; text-align:center;" />')
                            .append( $2('<a href="javascript:;" class="button highlighted close"><span>Igen, INSTALL</span></a>').click(function(){ location.href=scriptURL; }) )
                            .append( $2('<a href="javascript:;" class="button plain close"><span>Mégse</span></a>') )
                        ).dialog({modal:true, width:500, height:240});
                }
            }
        });
	}
    
    // Adatlap oldalon csoportosítás elrejtése, menübe bekapcsoláshoz szükséges link hozzáadása
    var hideAdatlapInfoBox=function(){
        var $ib=$('#content .sidebar.grid_2'), $ud=$('#userDataPageCenter');
        $ib.hide();
        $ud.removeClass('grid_6').addClass('grid_8').css({'margin-right':'0','padding-right':'0','border-right':'0 none','margin-top':'0','padding-top':'10px'}).width(600);
        $('.userDataTable .dataValue').width(400);
        // link a csoportosítás menüre:
        $('#content .mainNavigation li.secondary:last ul').prepend( $('<li class="tab" />').append( $('<a href="javascript:;">Csoportosítás</a>').click(function(){
            $('.userDataTable .dataValue').removeAttr('style');
            $ud.removeClass('grid_8').addClass('grid_6').removeAttr('style');
            $ib.show(); 
            $(this).parent().remove(); 
            $2('#content .mainNavigation li.secondary a').trigger('click');          
        })) );
    }
    
    // Adatlap oldalra albumok betöltése
    var loadAlbumsToAdatlap=function(data){
        var uid=getUserIDFromAdatlap();
        var page=false;
        if(data){
            if($('#it_useralbums').length==0) $('#content .sidebar.userImage').after('<div class="sidebar inverted albumPager" id="it_useralbums"><h3>Albumok</h3><div class="albumlist clearfix"></div></div>');
            $('#it_useralbums .albumlist').append( $('.album', data).removeClass('active') );
            if( $('a.boxPagerRight', data).length>0 ) page=$('a.boxPagerRight', data).attr('href').match(/page=([0-9]+)/)[1];
        }else{
            page=0;
        }
        if(page!==false) $.get('/pages/image/albumPager.jsp?userID='+uid+'&albumID=&page='+page, loadAlbumsToAdatlap);
    }
    
    // Album kisképei oldalon összes kép betöltése egy oldalra gomb hozzáadása
    var addAlbumOsszeskepAjax_Link=function(){
        var $a=$('.albumdata .pager:first');
        if($a.length==0) return;
        if(loc.match(/page=([0-9]+)/) && RegExp.$1!="0"){ // nem első oldalon van!
            if(opt.albumpic_autoloadall){
                location.href=loc.replace(/page=([0-9]+)/, "page=0"); // első oldalra léptetjük
                return;
            }
        }
        if($a.find('li.last a.button').length==0) return; // csak egy oldal van?
        var hideDetails=opt.autohidedetails_on_allpic && !opt.albumpic_defhidedetails;
        var $link=$('<a href="javascript:;" class="button small" title="Mutasd az összes kis képet!"><span>Összes</span></a>')
            .click(function(){
                $a.find('ul').hide();
                $a.find('> a:first').remove();
                $a.prepend('<a href="javascript:;" class="button small"><span>Betöltés folyamatban... ( 1 / '+(last*1+1)+' )</span></a>');
                var last=$a.find('li.last a.button').attr('href').match(/page=([0-9]+)/)[1];
                var url=loc.replace(/&page=0/, "") + (loc.indexOf('?')==-1?'?':'&') + "page=";
                var i=0;
                log(last+" oldal betöltése...");
                var fn=function(d){
                    if(d){
                        $('.albumdata .imageListItem:last').after( $('.albumdata .imageListItem', d) );
                    }
                    i++;
                    if(i<=last){
                        log("betölt: "+url+i);
                        $a.find('a:first span').text('Betöltés folyamatban... ( '+i+' / '+(last*1+1)+' )');
                        $.get(url+i, fn);
                    }else{
                        $a.find('a:first').remove();
                        var kepcnt='';
                        var $x=$('.gallerySlider div:has(strong:contains(Képek))');
                        if($x.length>0 && $x.text().match(/([0-9]+)/)) kepcnt=' ('+RegExp.$1+' kép)';
                        $a.prepend( $('<span style="color:#191E25;font-size:13px;font-weight:bold;padding-left:11px;line-height:20px" />').text($('.gallerySlider h3').text() + kepcnt ) );
                    }
                }
                fn();
                if(hideDetails) albumHideDetails();
            });
        $a.append($link);
        // automatikus betöltés, jobb oldali sáv elrejtésére figyelve
        if(opt.albumpic_autoloadall){
            hideDetails=opt.albumpic_defhidedetails;
            $link.trigger('click');
        }
    }
    
    // Album képek oldalon hozzáadja a lapozót, ha nincs
    var addAlbumPager=function(){
        $('.albumdata > .clearfix').prepend('<div class="pager" />');
        var kepcnt='';
        var $x=$('.gallerySlider div:has(strong:contains(Képek))');
        if($x.length>0 && $x.text().match(/([0-9]+)/)) kepcnt=' ('+RegExp.$1+' kép)';
        $('.albumdata .pager:first').append( $('<span style="color:#191E25;font-size:13px;font-weight:bold;padding-left:11px;line-height:20px" />').text($('.gallerySlider h3').text() + kepcnt ) );
        if(opt.albumpic_defhidedetails) albumHideDetails();
    }
    
    // Album oldalon a jobb oldali részletek sáv elrejtése ikon
    var addAlbumHideDetails_Link=function(){
        var $a=$('.albumdata .pager:first');
        if($a.length==0) return;
        $a.append('<a href="javascript:;" class="button small iconOnly" title="Részletek sáv elrejtése/mutatása" style="float:right"><span><i class="icon enlarge">&nbsp;</i>&nbsp;</span></a>');
        $a.find('a:last').click(albumHideDetails)
    }
    var albumHideDetails=function(){
        if($('#content .main').hasClass('grid_8')){
            $('#content > .sidebar').hide();
            $('#content .main').removeClass('grid_8').addClass('grid_12').attr('style', 'width:943px');
            $('#content .main').append( $('.albums') );
        }else{
            $('#content .main').removeClass('grid_12').addClass('grid_8').removeAttr('style');
            $('#content > .sidebar').append( $('.main .albums') ).show();
        }
    }
    
    // Kép oldalon összes nagy kép új ablakba link hozzáadása User oldalon (adatlap, képek)
    var addOsszesKepLink_User=function(page){
        var uid=getUserIDFromAdatlap();
        var aid=( loc.match(/albumID=(-?[0-9]+)/) ? RegExp.$1 : '' );
        if(loc.match(/album\/(-?[0-9]+)/)) aid=RegExp.$1;
        if(!aid && $('#albumID').size()>0) aid=$('#albumID').val();
        var id="userID="+uid+"&albumID="+aid;
        var iid=($('img.defaultSize[src*=iwiw.net][src*=user_]').length>0 && $('img.defaultSize[src*=user_default]').length==0) ? $('img.defaultSize[src*=iwiw.net][src*=user_]:first').attr('src').match(/user_[0-9]+_([0-9]+)/)[1] : "";
        if($('#imageFull[src*=user_]').size()>0 && $('#imageFull').attr('src').match(/user_\d+_(\d+)/)) iid=RegExp.$1;
        log("page: "+page+", aid: "+aid+", iid: "+iid);
        // képek oldalon:
        //if(page=="imagedata" || page=="albumdata") $( page=="imagedata" ? '.imageContent .body' : '.albumdata .pager:first' )
        if(page=="imagedata" || page=="albumdata") $( page=="imagedata" ? '.imageContent h3' : '.albumdata .pager:first' )
            .append('<a href="javascript:;" class="button small withIcon" title="Összes nagy kép megnyitása új ablakban"><img src="'+MEDIA.nagyito_icon+'" style="position:absolute;"/><span>Összes kép</span></a>')
            .find('a:last')
            .click(osszesKepClick)
            .data('id', id)
            .css('float', page=="imagedata"?'':'right')
            .parent()
            .append('<a href="javascript:;" class="button small withIcon" title="Összes nagy kép megnyitása ClearBoxban"><img src="'+MEDIA.clearbox_icon+'" style="position:absolute;"/><span>ClearBox</span></a>')
            .find('a:last')
            .data('id', id).data('iid', iid)
            .click(clearboxKepClick)
            .css('float', page=="imagedata"?'':'right');

        // adatlap oldalon:
        if(page=="userdata") $('.userImage .moreStuff:first')
            .append('<a href="javascript:;" class="moreLink icon" title="Összes nagy kép megnyitása új ablakban a profilkép albumból"><img src="'+MEDIA.nagyito_icon+'" style="position:absolute;margin-left:-20px;margin-top:-2px"/><span>Összes kép</span></a>')
            .find('a:last')
            .click(osszesKepClick)
            .data('id', id)
            .parent()
            .append( $('<a href="javascript:;" class="moreLink icon" title="Összes nagy kép megtekintése ClearBoxba"><img src="'+MEDIA.clearbox_icon+'" style="position:absolute;margin-left:-20px;margin-top:-2px" /><span>ClearBox</span></a>').data('id', id).data('iid', iid).click(clearboxKepClick) );
    }

    // Clearbox megnyitása
    var clearboxKepClick=function(){
        var $a=$(this);
        if($a.data('loading')) return; // ha betöltés alatt van, érzéketlen a gomb
        var id=$a.data('id');
        var iid=$a.data('iid');
        loadUserAlbumXML(id, openCB, iid);
    }
        
    
    // Összes kép megnyitására kattintottak 1. lépés (adatok betöltése)
    var osszesKepClick=function(){
        var $a=$(this);
        if($a.data('loading')) return; // ha betöltés alatt van, érzéketlen a gomb
        var id=$a.data('id');
        // XML betöltése, ha még nincs meg:
        if(tmpvars[id]){
            osszesKepClick2(id);
        }else{
            $a.data('loading', true).css('opacity', '0.2')
            loadUserAlbumXML(id, function(){
                $a.data('loading', false).css('opacity', '1');
                osszesKepClick2(id);
            });
        }
    }
    
    // Összes kép megnyitása 2. lépés (megnyitás)
    var osszesKepClick2=function(id){
        var kep=tmpvars[id];
		if(kep.length==0){ alert('A felhasználónak nincsenek képei!'); return false; }
        var h;
        try{
            h=window.open("", "", "");
            h.document.writeln("<html><body>A képek közt való lépkedéshez használd a jobbra és a balra nyilat!<br/><br/>");
    		for(var i in kep){
    			var d=new Date( parseInt(kep[i].img.match(/user_[0-9]+_([0-9]+)/)[1]) );
    			h.document.writeln("<a href='"+kep[i].img+"' target='_blank'><img border='0' src='"+kep[i].img+"'></a><br>"+kep[i].title+" <small><a title='Kép feltöltésének ideje'>"+d.getFullYear()+"."+(d.getMonth()+1)+"."+d.getDate()+". "+d.getHours()+":"+d.getMinutes()+", "+kep[i].com+" db komment</small><br><br><br>");
    		};
    		h.document.writeln("<script>opener.window.IT_ShowAllImgs_Init(window);</script>");
    		h.document.writeln("</body></html>");
    		h.document.close();
        }catch(err){
            alert("A képeket nem sikerült megnyitni új ablakban!\nTalán le vannak tiltva a felugró ablakok? Engedélyezd az iwiw.hu-ról!");
            return;
        }
    }
    
    // Ezt hívódik meg az új ablakból Összes kép megnyitásánál
	unsafeWindow.IT_ShowAllImgs_Init=function(w){
		var m=20;
        var calcOffsetTop=function(obj){
            var curtop=0;
            if (obj.offsetParent) do{curtop += obj.offsetTop;} while (obj = obj.offsetParent);
            return curtop;
        }
		shortcut.add('left', function(){
			var kozep=Math.round(w.pageYOffset+w.innerHeight/2);
			var elozo=null;
			$('img', w.document).each(function(){ if(kozep>calcOffsetTop(this)) ok=elozo; elozo=this; });
			if(!ok) return;
			$('img', w.document).css('max-height', (w.innerHeight-m-16)+'px').css('max-width', (w.innerWidth-m)+'px');
			w.scrollBy(0, calcOffsetTop(ok) - w.innerHeight/2 + ok.height/2 - w.pageYOffset + 6 );
		}, {target:w.document});
		shortcut.add('right', function(){
			var kozep=Math.round(w.pageYOffset+w.innerHeight/2);
			var kov=null;
			$('img', w.document).each(function(){ if(!kov && kozep<calcOffsetTop(this)) kov=this; });
			if(!kov) return;
			$('img', w.document).css('max-height', (w.innerHeight-m-16)+'px').css('max-width', (w.innerWidth-m)+'px');
			w.scrollBy(0, calcOffsetTop(kov) - w.innerHeight/2 + kov.height/2 - w.pageYOffset + 6 );
		}, {target:w.document});
	};


    // Felhasználó album képeit tölti be és rakja a tmpvars[id] tömbbe (id: userID=...&albumID=...)
    var loadUserAlbumXML=function(id, callback, params){
        if(typeof tmpvars[id]!="undefined"){
            if(callback) callback(id, params);
            return;
        }
        $.get('/pages/image/albumgalleryfeed.jsp?'+id, function(d){
            var kep=[];
            $('item', d).each(function(){
                kep.push({
                    tn: $('[url]:first', this).attr('url'),
                    img: $('[url]:last', this).attr('url'),
                    title: $('title', this).text(),
                    fav: $('[favorites]:first', this).attr('favorites'),
                    com: $('*:last', this).text()
                });
            });
            tmpvars[id]=kep;
            if(callback) callback(id, params);
        })
    }
    
    // Segéd fgv az album képek oldalon a direkt link cseréhez
    var getUserImageDirectLink=function(id, imgid){
        for(var i in tmpvars[id]) if(tmpvars[id][i].img.indexOf('_'+imgid)!=-1) return tmpvars[id][i].img;
        return false; 
    }
    
    // Album képek oldalon kép linkjének cserélése direkt linkre
    var replaceAlbumImgLink=function(){
        var uid=getUserIDFromAdatlap();
        var aid=( loc.match(/albumID=(-?[0-9]+)/) ? RegExp.$1 : '' );
        if(loc.match(/album\/(\d+)/)) aid=RegExp.$1;
        var id="userID="+uid+"&albumID="+aid;
        loadUserAlbumXML(id);
        $2('.imageListItem a:has(img.thumbnailSize)').live('mousedown', function(){
            if($(this).data('is_direct_link')) return; // már van direkt link :)
            if(!$(this).attr('target')) $(this).attr('target', '_blank');
            if(!tmpvars[id]) return; // még nem töltödtek be a képek
            var imgid=$('img[src*=iwiw]', this).attr('src').match(/user_[0-9]+_([0-9]+)/)[1];
            var link=getUserImageDirectLink(id, imgid);
            if(!link) return;
            if(imgid) $(this).attr('href', link);
            $(this).data('is_direct_link', true);
        })
    }
    
    // Összes album betöltése részletek sávba (>6 képnél ne lapozos legyen)
    var loadAllAlbum=function(data){
        if(data){
            $('#albumPager .albumlist').append( $('.album', data) );
            $('.albumlist .clear').remove();
        }
        var $a= data ? $(data) : $('#albumPager');
        if($a.find('a.boxPagerRight').length>0){
            $.get( $a.find('a.boxPagerRight').attr('href'), loadAllAlbum);
        }
        $('#albumPager .boxPager').remove();
        $('.albumlist .clear').remove();
    }
    
    // Quick View
    var addQuickViewIcon=function(){
        if( $('#friendlist .pager').length==0 ) $('#friendlist').prepend('<div class="pager select"><div class="body"></div></div>');
        setInterval(function(){
            if($('#it_quickviewlink').length>0) return;
            $('#friendlist').css('position', 'relative').prepend('<a title="Quick View" class="button small iconOnly" id="it_quickviewlink" href="javascript:;" style="position:absolute; right:18px;top:6px;"><span><i class="icon" style="background:url('+MEDIA.users+')"></i>&nbsp;</span></a>');
        }, 1000);
        $2('#it_quickviewlink').live('click', function(e){
            e.preventDefault();
            var ids=[];
            $('.usermini').each(function(){
                if( $(this).attr('class').match(/user([0-9]+)/) ) ids.push(RegExp.$1);
            })
            QuickView(ids);
            return false;
        })
    }
    
    
    // Quick View indítása (ids array: user ids)
	var QuickView=function(ids){
        log("QuickView: "+ids.join(', '));
		$('body').append('<div id="qvbg" style="position:fixed;top:0px;left:0px;z-index:2298;width:100%;height:100%;margin:0px;background:#FFF"></div>');
		$('body').append('<div id="qvprofil" style="position:absolute;top:164px;left:5px;width:500px;z-index:2299;padding-left:22px;" />');
		$('body').append('<div id="qv" style="position:fixed;top:0px;left:0px;z-index:2300;margin:0px;padding:30px 0px 0px 10px;">Adatlapok betöltése ('+ids.length+' profil, <span id="qv_i">0</span> / '+(ids.length*2)+' ajax kérés)...</div>');
		addCSS('.block_table td,.block_table th{padding:3px 6px;border-bottom:1px solid #e7effb;vertical-align:top;}'
			+'.block_table th{text-align:left;width:153px;font-weight:bold;color:#006;}');
		tmpvars.qv=[]; // adatok
        unsafeWindow.qv=tmpvars.qv;
		tmpvars.qvi=0; // betöltéshez
		tmpvars.qvu=0; // aktuális user (amit néznek);
		$(ids).each(function(i){
			tmpvars.qv[i]={id:this, imgs:[], adatlap:null, nev:null, fokep:''};
			$.ajax({
				i: i,
				//url: host+'/pages/image/albumgallery.jsp?userID='+this+'&albumID=',
                url: host+'/pages/image/albumgalleryfeed.jsp?userID='+this+'&albumID=',
				dataType: 'text',
				timeout: 30000,
				success: QV_AjaxImg
			});
			$.ajax({
				i: i,
				url: host+'/pages/user/userdata.jsp?userID='+this,
				dataType: 'text',
				timeout: 30000,
				success: QV_AjaxProfil
			});
		});
	}
    
    
	var QV_AjaxImg=function(data){
		var i=this.i;
		$(data).find('channel item').each(function(){
			var nagykep=$('[url]:last', this).attr('url');
			var nev=$('title', this).text();
			var kiskep=$('[url]:first', this).attr('url');
			tmpvars.qv[i].imgs.push({nkURL:nagykep, kkURL:kiskep, n:nev});
		});
		tmpvars.qvi++;
        $('#qv_i').text(tmpvars.qvi);
		if(tmpvars.qvi==tmpvars.qv.length*2) QV_Show(tmpvars.qvu);
        log("qv ajaximage ok: "+i);
	}
	var QV_AjaxProfil=function(data){
        log("qv ajaxprofile: "+this.i + " id: "+tmpvars.qv[this.i].id);
		tmpvars.qv[this.i].adatlap=$('#userDataPageCenter', data);
        tmpvars.qv[this.i].adatlap.find('.fortunaBox').remove();
		var nev='<h3><a style="color:#3175DE;font-size:18px" href="/pages/user/userdata.jsp?userID='+tmpvars.qv[this.i].id+'" target="_blank">'
			+$('#content .pageTitle h1', data).html()+'</a></h3>';
		tmpvars.qv[this.i].nev=nev;
        tmpvars.qv[this.i].fokep='';
        if( $('.sidebar .userImage img', data) && $('.sidebar .userImage img', data).attr('src').match(/([^\/]+[0-9]{13})/)) tmpvars.qv[this.i].fokep=RegExp.$1;
		tmpvars.qvi++;
        $('#qv_i').text(tmpvars.qvi);
		if(tmpvars.qvi==tmpvars.qv.length*2) QV_Show(tmpvars.qvu);
        log("qv ajaxprofile ok: "+this.i);
	}
	// PROFIL MEGJELENÍTÉSE
	var QV_Show=function(i){
        tmpvars.qvu=i;
        $('#qv').html('<div id="qvimgs" style="position:fixed;top:0px;left:0px;width:100%;height:149px;overflow-x:auto;overflow-y:hidden;white-space:nowrap;border-bottom:1px solid #CCC;z-index:2310;background:#FFF;padding:1px 0px 0px 1px;"/>');
        $('#qv').append('<div id="qvnav" style="position:fixed;top:151px;left:5px;width:100%;background:#FFF;padding:0px;"/>');
        $('#qvnav').append('<a href="#">QUICK VIEW bezárása</a> || ').find('a:last').click(function(){ $('#qvbg, #qvprofil, #qv').remove(); return false; });
        if(i!=0) $('#qvnav').append('<a href="#">&lt;&lt; előző találat</a> ').find('a:last').click(function(){ QV_Show(i-1); return false; }); else $('#qvnav').append('&lt;&lt; előző találat ');
        if(i!=tmpvars.qv.length-1) $('#qvnav').append(' <a href="#">következő találat &gt;&gt;</a> ').find('a:last').click(function(){ QV_Show(i+1); return false; }); else $('#qvnav').append(' következő találat &gt;&gt;');
        var imgmaxw=$(window).width()-580;
        var imgmaxh=$(window).height()-157;
        $('#qv').append('<div style="position:fixed;top:150px;right:1px;padding:1px;border:1px solid #CCC;"><a href="#" target="_blank"><img id="qvnk" src="" style="max-width:'+imgmaxw+'px;max-height:'+imgmaxh+'px" /></a></div>');
        $(tmpvars.qv[i].imgs).each(function(j){
            var cb_img = this.nkURL;
            $('#qvimgs').append('<a href="'+cb_img.match(/^(.*?)(_box2?)?$/)[1]+'" target="_blank"><img src="'+this.kkURL+'" alt="" /></a> ').find('a:last').attr('title', this.n);
            $('#qvimgs a:last').mouseover(function(){ $('#qvnk').attr('src', cb_img).parent().attr('href', $(this).attr('href')).attr('title', $(this).attr('title')); });
            if(this.nkURL.indexOf(tmpvars.qv[i].fokep)!=-1) $('#qvnk').attr('src', this.nkURL).parent().attr('href', this.nkURL.match(/^(.*?)(_box2?)?$/)[1]).attr('title', this.n);
        });
        $('#qvprofil').html( '<br/>' + tmpvars.qv[i].nev );
        $('#qvprofil').html( $('#qvprofil').html() + '<br/>');
        $('#qvprofil').append(tmpvars.qv[i].adatlap);
        $('#qvprofil .application_title a.block_header_link').remove();
        $('#qvprofil #connectionLabelStatus').remove();
	}    
    
    // felhasználó ikonképére ráviszik az egeret (hírfolyam)
    var userImageOver=function(){
        try{
            var uid=$('img[src*=iwiw.net][src*=user_]:first', this).attr('src').match(/user_(\d+)_(\d+)/)[1];
            var iid=$('img[src*=iwiw.net][src*=user_]:first', this).attr('src').match(/user_(\d+)_(\d+)/)[2];
        }catch(err){
            log("User id-t nem sikerült megállapítani. Nincs profilképe?");
            return;
        }
        var id="userID="+uid+"&albumID=";
        if($('.it_icons', this).length==0){
            $(this).append( $('<div class="it_icons" style="display:none;position:absolute;top:4px;left:4px;"></div>')
                .append( $('<a href="javascript:;" title="Képek megtekintése" style=""><span class="icon gallery" style="padding-top:5px;padding-left:18px;">&nbsp;</span></a>').attr('href', '/pages/image/albumdata.jsp?userID='+uid) )
                .append( $('<a href="javascript:;" style="margin-left:-2px;margin-top:-2px;margin-right:2px"><img title="Összes nagy kép megtekintése ClearBoxban" src="'+MEDIA.clearbox_icon+'" /></a>').data('id', id).data('iid', iid).click(clearboxKepClick) )
                .append( $('<a href="javascript:;"><img title="Összes nagy kép megtekintése új ablakban" src="'+MEDIA.nagyito_icon+'" /></a>').data('id', id).click(osszesKepClick) ) );
        }
        $('.it_icons', this).show();
    }
    
    // felhasználó ikonképéről leviszik az egeret (hírfolyam)
    var userImageOut=function(){
        $('.it_icons', this).hide();
    }
    
    // albumra viszi az egeret a user
    var userAlbumOver=function(){
        var uid=$('img.miniSize', this).attr('src').match(/user_([0-9]+)_/)[1];
        var aid="";
        if($('a:first', this).attr('href').match(/albumID=(-?[0-9]+)/)) aid=RegExp.$1;
        if($('a:first', this).attr('href').match(/\/album\/([0-9]+)/)) aid=RegExp.$1;
        var id="userID="+uid+"&albumID="+aid;
        if($('.it_icons', this).length==0){
            $('a:first', this).after( $('<div class="it_icons" style="display:none;position:absolute;margin-top:-80px;margin-left:21px;"></div>')
                .append( $('<a href="javascript:;"><img title="Összes nagy kép megtekintése ClearBoxban" src="'+MEDIA.clearbox_icon+'" style="position:relative;top:-2px;left:-1px" /></a>').data('id', id).data('iid', '').click(clearboxKepClick) )
                .append( $('<a href="javascript:;"><img title="Összes nagy kép megtekintése új ablakban" src="'+MEDIA.nagyito_icon+'" /></a>').data('id', id).click(osszesKepClick) ) );
        }
        $('.it_icons', this).show();
    }
    
    // albumról leviszi az egeret a user
    var userAlbumOut=function(){
        $('.it_icons', this).hide();
    }
    
    // felhasználó kártyájára rávitték az egeret
    var userMiniMouseOver=function(){
        if($('.it_nagyito_icon', this).length>0) return;
        var uid=$(this).attr('data-userid');
        var id="userID="+uid+"&albumID=";
        $('.options div:last', this).after( '<div class="nameToolTip it_nagyito_icon"><span style="display: none;" class="nameToolTipName">Összes nagy kép új ablakba<span>▼</span></span><a href="javascript:;" class="button"><span style="padding:1px 2px"><img src="'+MEDIA.nagyito_icon+'" /></span></a></div>');
        $('.it_nagyito_icon a', this).data('id', id).click(osszesKepClick);
    }
    
    // felhasználó kártyájának képére vitték az egeret
    var userMiniImgMouseOver=function(){
        if(!$(this).attr('src').match(/^(http.*user_\d+_\d+)_tn1$/)) return;
        var pimg=RegExp.$1 + '_profile';
        var $a=$(this).parents('div.miniWrapper');
        log($a.length);
        if($a.find('.pimg').length==0){
            $(this).parent().removeAttr('title');
            $a.append('<div class="pimg" style="position:absolute; top:-20px; left:210px; z-index:150"><img class="defaultSize" style="background-color:#C7D1DD;border-color:#748BA9" src="'+pimg+'" /></div>');
        }else{
            $a.find('.pimg').show();
        }
    }    
    var userMiniImgMouseOut=function(){
        $(this).parents('div.miniWrapper').find('.pimg').hide();
    }
    
    // clearbox megnyitása:
    var openCB = function (id, iid) {
        loadUserAlbumXML(id, openCB2, iid)
    }
    var openCB2 = function(id, iid){
        var clickImgUrl = (typeof iid=="undefined" || iid=="") ? "---" : "_"+iid;
        if (tmpvars[id].length == 0) {
            alert('A felhasználónak nincsenek képei!');
            return false;
        }
        if (typeof (tmpvars.clearbox_loaded) == "undefined") {
            $('#CB_All').remove();
            addCSS(clearboxCSS);
            addJS(clearboxJS);
            unsafeWindow.CB_Init();
            log('Clearbox loaded');
            tmpvars.clearbox_loaded = true;
            $('#CB_All').show();
            $('#profileOptions').css('z-index', '800');
            $('#CB_Window').css('width', 'auto');
            addCSS(' #CB_All tr:hover{background:transparent !important;} ');            
        }
        unsafeWindow.CB_Gallery = [];
        unsafeWindow.CB_Gallery.push(['1']);
        unsafeWindow.CB_SlShowTimer = unsafeWindow.CB_SlShowTime;
        unsafeWindow.CB_ActImgId = 1;
        unsafeWindow.CB_Cls.onclick = "";
        unsafeWindow.CB_SlideS.onclick = "";
        unsafeWindow.CB_SlideP.onclick = "";
        unsafeWindow.CB_ScrollEnabled = false;
        for (i in tmpvars[id]) {
            if (tmpvars[id][i].img.indexOf(clickImgUrl)>0){
                unsafeWindow.CB_ActImgId = parseInt(i) + 1;
                log("profil: "+i)
            }
            var x = tmpvars[id][i].img;
            unsafeWindow.CB_Gallery.push([x, tmpvars[id][i].title, tmpvars[id][i].tn]);
        }
        unsafeWindow.CB_ActThumbSrc = clickImgUrl;
        unsafeWindow.CB_ImgWidthOld = unsafeWindow.CB_WinBaseW;
        unsafeWindow.CB_ImgHeightOld = unsafeWindow.CB_WinBaseH - unsafeWindow.CB_TextH;
        unsafeWindow.CB_SetAllPositions();
        unsafeWindow.CB_HideDocument();
        return false;
    }
           
    
    // Kedvencek menü hozzáadása (ismerősök ikon alá)
    var addFavMenu=function(){
        var $f=$('<ul id="it_favusers" />').appendTo('#page');
        // hover
        $('#friendPanel, #it_favusers').hover(function(){
            if( !$('#it_favusers > *').length ){
                $(opt.favusers).each(function(){
                    if(this[1].match(/^0$/)){
                        if( this[0] == "<hr>" ) this[0]="<hr/>"; // hibajav..
                        $f.append('<li style="height:1px;background-color:#DAE7FB"></li>'); //this[0]
                    }else if(this[1].match(/^[0-9]+$/)){ // user link
                        $f.append('<li><a href="/pages/user/userdata.jsp?userID='+this[1]+'"></a></li>');
                        $('#it_favusers a:last').text(this[0]);
                        //$('#it_favusers').append(' <a href="'+host+'/pages/message/compose.jsp?userID='+this[1]+'">Üzenek</a><br/>');
                    }else{ // egyéb link
                        $f.append($('<li/>').append($('<a></a>').attr('href', this[1]).text(this[0])));
                    }
                });
                if(opt.favusers.length>0) $f.append('<li style="height:1px;background-color:#DAE7FB"></li>');
                if(path=="/pages/user/userdata.jsp"){
                    $f.append('<li><a href="javascript:;">Felhasználó hozzáadása...</a></li>');
                    $f.find('a:last').click(function(){
        				var uid=getUserIDFromAdatlap();
                        var $input=$2('<input type="text" value="" style="width:360px;margin: 10px 0 30px 0;" />').val($.trim($('#content .pageTitle h1').text()));
                        $2('<div title="Felhasználó hozzáadása a kedvencekhez"></div>')
                            .append( $2('<div style="margin-top:16px; text-align:center"/>').append('Kedvencek közt megjelenő név:<br/>').append($input) )
                            .append( $2('<div style="margin-top:16px; text-align:center;" />')
                                .append( $2('<a href="javascript:;" class="button highlighted close"><span>Mentés</span></a>').click(function(){
                                    opt.favusers.push([$input.val(), uid]); saveOpt(); $2('#it_favusers').html('');
                                }) )
                                .append( $2('<a href="javascript:;" class="button plain close"><span>Mégse</span></a>') )
                            ).dialog({modal:true, width:400, height:220});  
                    });
                }else{
                    $f.append('<li><a href="javascript:;">Oldal hozzáadása...</a></li>');
                    $f.find('a:last').click(function(){
                        log("klikk ok");
                        var $input1=$2('<input type="text" value="" style="width:360px;margin: 10px 0 20px 0;" />').val($('head title').text());
                        var $input2=$2('<input type="text" value="" style="width:360px;margin: 10px 0 20px 0;" />').val(loc);
                        $2('<div title="Oldal hozzáadása a kedvencekhez"></div>')
                            .append( $2('<div style="margin-top:16px; text-align:center"/>').append('Kedvencek közt megjelenő név:<br/>').append($input1).append('<br/>Cím:<br/>').append($input2) )
                            .append( $2('<div style="margin-top:16px; text-align:center;" />')
                                .append( $2('<a href="javascript:;" class="button highlighted close"><span>Mentés</span></a>').click(function(){
                                    opt.favusers.push([$input1.val(), $input2.val()]); saveOpt(); $('#it_favusers').html('');
                                }) )
                                .append( $2('<a href="javascript:;" class="button plain close"><span>Mégse</span></a>') )
                            ).dialog({modal:true, width:400, height:260});
                    })
                }                

            }
            $f.stop().css('opacity', '1').show();
        }, function(){
            $f.stop().fadeOut('fast');
        })
        log("fav menu ok");
    }
    
    // Kedvencek menü kinyitása
    var openKedvencekMenu=function(){
        $('#it_side').html('<div class="infoBox"><h3><span class="icon infoBoxIcon">InfoBox</span></h3><p>A kedvencek menü az oldal jobb felső sarkában lévő "ismerőseid" ikonra jön elő. Új kedvenc oldalt/ismerőst úgy tudsz felvenni, hogy rámész az adott oldalra, vagy felhasználó adatlapjára és a kedvencek menüben a hozzáadásra nyomsz (ismerőseid ikon alatt). Ha nem jelenik meg a menü, akkor ellenőrizd a Tools beállításai alatt, hogy be van-e kapcsolva a kedvencek menü.</p><p>Kedvenceknél a sorrendet is tudod szerkeszteni itt, drag and drop módszerrel húzd feljebb vagy lejjebb az adott sort, majd ha végeztél, akkor mentsd el a változtatásokat a Mentés gombbal.</p></div>');
		$('#it_main').html('<h4>Kedvencek</h4><ul id="itfavtable"></ul><br/><a href="javascript:;" rel="hr">Elválasztó hozzáadása</a><br/><br/><a href="javascript:;" rel="savefav" class="button highlighted"><span>Kedvencek mentése</span></a><br/><br/><br/>');
		$('a[rel=hr]').click(function(){
			this.blur();
			$('#itfavtable').append('<li style="padding-right:44px;width:540px"><a href="javascript:;" style="position:absolute;margin-left:550px;>töröl</a><hr /></li>');
			$('#itfavtable a:last').click(function(){ $(this).parent().remove(); return false; });
		});
		$('a[rel=savefav]').click(function(){
			var uj=[];
			$('#itfavtable li').each(function(){
				if($('a', this).size()==1) uj.push( ['<hr/>', '0' ]); // elválasztó
				else if($('a', this).size()==3) uj.push( [$('a:first', this).text(), $('a:first', this).attr('href') ]); // oldal
				else uj.push( [$('a:first', this).text(), $('a:first', this).attr('href').match(/userID=([0-9]+)/)[1] ]); // felhasználó
			});
			opt.favusers=uj;
			saveOpt();
            $('#it_favusers').html('');
			alert("Kedvencek elmentve!");
		});
		$(opt.favusers).each(function(){
			if(this[1].match(/^0$/)){
                $('#itfavtable').append('<li style="padding-right:44px;width:540px"><a href="javascript:;" style="position:absolute;margin-left:550px;">töröl</a><hr /></li>');
				$('#itfavtable a:last').click(function(){ $(this).parent().remove(); return false; });
			}else if(this[1].match(/^[0-9]+$/)){ // user link
				$('<li><a href="/pages/user/userdata.jsp?userID='+this[1]+'"></a> <a href="'+host+'/pages/message/compose.jsp?userID='+this[1]+'">Üzenek</a> - <a href="javascript:;">szerkeszt</a> <a href="javascript:;">töröl</a></li>').appendTo('#itfavtable');
				$('#itfavtable a:last').click(function(){ $(this).parent().remove(); return false; });
				$('#itfavtable li:last a:eq(2)').click(function(){
					this.blur();
					$link=$(this).parent().find('a:first');
                    var $input=$2('<input type="text" value="" style="width:360px;margin: 10px 0 30px 0;" />').val($link.text());
                    $2('<div title="Kedvencek szerkesztése"></div>')
                        .append( $2('<div style="margin-top:16px; text-align:center"/>').append('Kedvencek közt megjelenő név:<br/>').append($input) )
                        .append( $2('<div style="margin-top:16px; text-align:center;" />')
                            .append( $2('<a href="javascript:;" class="button highlighted close"><span>Mentés</span></a>').click(function(){ $link.text($input.val()) }) )
                            .append( $2('<a href="javascript:;" class="button plain close"><span>Mégse</span></a>') )
                        ).dialog({modal:true, width:400, height:220});                    
				});
				$('#itfavtable li:last a:first').text(this[0]);
			}else{ // egyéb link
				$('<li><a href=""></a> - <a href="javascript:;">szerkeszt</a> <a href="javascript:;">töröl</a></li>').appendTo('#itfavtable');
				$('#itfavtable a:last').click(function(){ $(this).parent().remove(); return false; });
				$('#itfavtable li:last a:eq(1)').click(function(){
					$link=$(this).parent().find('a:first');
                    var $input1=$2('<input type="text" value="" style="width:360px;margin: 10px 0 20px 0;" />').val($link.text());
                    var $input2=$2('<input type="text" value="" style="width:360px;margin: 10px 0 20px 0;" />').val($link.attr('href'));
                    $2('<div title="Kedvencek szerkesztése"></div>')
                        .append( $2('<div style="margin-top:16px; text-align:center"/>').append('Kedvencek közt megjelenő név:<br/>').append($input1).append('<br/>Cím:<br/>').append($input2) )
                        .append( $2('<div style="margin-top:16px; text-align:center;" />')
                            .append( $2('<a href="javascript:;" class="button highlighted close"><span>Mentés</span></a>').click(function(){ $link.text($input1.val()).attr('href', $input2.val()); }) )
                            .append( $2('<a href="javascript:;" class="button plain close"><span>Mégse</span></a>') )
                        ).dialog({modal:true, width:400, height:260});                     
				});
				$('#itfavtable li:last a:first').attr('href', this[1]).text(this[0]);
			}
        });
        $2('#itfavtable').sortable();
        $2('#itfavtable').disableSelection();
	}
    
    // TOOLS menü hozzáadása a menüsorhoz
    var addToolsMenu=function(){
        $('<li id="it_toolsmenulink"><a href="javascript:;"><span>Tools</span></a></li>')
            .appendTo('#mainMenu')
            .find('a:first')
            .click(openToolsMenu)
        $('<div id="toolsLayer"></div>').appendTo('body');
    }
    
    // TOOLS menü kinyitása
    var openToolsMenu=function(){
        log("menü kinyit");
        closeLayerMenu();
        var $c=$('#content');
        // content törlése
        $c.html('');
        $('body').attr('class', 'double double_9 settings');
        if($('body#search')) $('body').removeAttr('id');
        // title
        $c.append('<div class="pageTitle" style="padding-bottom:0"><h1>iwiw TOOLS '+VERSION+'</h1></div>');
        // menü
        $('<ul class="tabber mainNavigation"></ul>')
            .append( $('<li class="tab"><a href="#beallitasok">Beállítások</a></li>') )
            .append( $('<li class="tab"><a href="#toroltkapcsolatok">Törölt kapcsolatok</a></li>') )
            .append( $('<li class="tab"><a href="#kapcsolatfigyelo">Kapcsolatfigyelő</a></li>') )
            .append( $('<li class="tab"><a href="#kedvencek">Kedvencek</a></li>') )
            .append( $('<li class="tab"><a href="#uzenetekmentese">Üzenetek mentése</a></li>') )
            .append( $('<li class="tab"><a href="#backup">Backup</a></li>') )
            .find('a').click(toolsMenuClick).end()
            .appendTo($c);
        $c.append('<div class="clr" />');
        $c.append('<div class="main grid_9" id="it_main" /><div class="sidebar grid_3 inverted" id="it_side" /><div class="clr" />');
        // beállítások menü megnyitása:
        toolsMenuClick.apply( $c.find('li a:first')[0] );        
    }
    
    // TOOLS menü tabber-en egy menüre kattintanak
    var toolsMenuClick=function(){
        var m=$(this).attr('href').substr(1);
        $(this).parents('ul:first').find('li').removeClass('active');
        $(this).parent().addClass('active');
        $('#it_main, #it_side').html('');
        log("menü click: "+m);
        switch(m){
            case "beallitasok":
                openBeallitasok();
                break;
            case "toroltkapcsolatok":
                openToroltKapcsolatok();
                break;
            case "kapcsolatfigyelo":
                openKapcsolatfigyelo();
                break;
            case "kedvencek":
                openKedvencekMenu();
                break;
            case "uzenetekmentese":
                openUzenetekMentese();
                break;
            case "backup":
                openBackup();
                break;
        }
    }
    
    // TOOLS beálíltások menü
    var openBeallitasok=function(){
        // infobox:
        $('#it_side').append('<div class="infoBox"><h3><span class="icon infoBoxIcon">InfoBox</span></h3><p>Itt tudod az iwiw TOOLS-t testreszabni. Hasznos dolog egyszer átböngészni az itt felkínált opciókat, mert lehet, az alapbeállításokon kívül fogsz találni további, számodra hasznos funkciókat is.</p><p>Továbbá a megjelenő frissítések telepítése is ajánlott, mivel a frissítések sokszor hibajavításokat, vagy hasznos funkciókat tartalmaznak.</p><p><b>iwiw TOOLS '+VERSION+'</b><br/>Készítette: <a href="mailto:iwiwtools@gmail.com">pzs</a><br/>Honlap: <a href="http://userscripts.org/24506">http://userscripts.org/24506</a></p></div>');
        // opciók:
        var $m=$('#it_main');
        //$m.append('asdfasd');
        var $table=$('<table />').appendTo($m);
        var addCB=function(name, html){
            $table.append( 
                $('<tr/>')
                    .append('<td class="settings" style="width:26px" valign="top"><input name="'+name+'" value="1" type="checkbox"'+(opt[name]?' checked="checked"':'')+'></td>')
                    .append( $('<td class="description" />').html(html) )
                ); 
        }
        var addTitle=function(title){
            $table.append( $('<tr/>').append( $('<th colspan="2" />').html(title) ) );
        }
        // Opciók hozzáadása:
        addTitle('Általános beállítások');
        addCB('autoupdate', 'iwiw TOOLS frissítések keresése <input type="text" name="autoupdate_nap" style="width:30px" /> naponta (ennek bekapcsolása erősen ajánlott!)');
        addCB('removebanners', 'Reklámok eltávolítása');
        addCB('slim_tabber', 'Vékonyított fülek (tab sor)');
        addCB('favuser', 'Lenyíló kedvencek menü az "ismerőseid" ikon alatt');
        addCB('torolt_kapcs_figyelo', 'Törölt kapcsolatok figyelése (csak a TOOLS telepítése/opció bekapcsolása óta törölt kapcsolatokat jelzi)');
        addCB('torolt_kapcs_figyelo_nev', 'Törölt kapcsolatfigyelőnél nevek megjegyzése (ilyenkor megmarad a felhasználó neve, ha törli magát az iWiW-ről)')
        addCB('taskbaroff', 'Chat és "tálca" teljes kikapcsolása (figyelem! friss rendszerüzit se fogod látni, illetve pár iwiw-es funkció működését is megzavarhatja [pl új szavazás létrehozásánál])');
        addCB('sectimeout', '"Kilépésgátló", azaz 2 percenként egy ajax kérést csinál a háttérben, hogy az iWiW ne léptessen ki');
        addCB('addkeresomenu', "Kereső menüpont hozzáadása az alsó menüsávhoz");
        addCB('nevjegynagykep', "Névjegyeknél a kis profilképre húzva az egeret nagy profilkép megjelenítése");

        addTitle('Kezdőlap');
        addCB('remove_index_rightside', 'Jobb szélső ajánlósáv eltávolítása (szélessebb hírfolyam)');
        addCB('morenewpic_index', 'Több friss kép mutatása, legyen <input type="text" name="morenewpic_index_db" style="width:30px" /> db');
        addCB('defaultboardmsg', 'Üzenőfal legyen az alapértelmezett az összes hír helyett');
        addCB('removenewpic_index', 'Ismerősök friss képeinek elrejtése');
        addCB('removeemlekezteto_index', 'Emlékeztető elrejtése');
        addCB('removeesemeny_index', 'Események elrejtése');
        addCB('removeshoppingbox_index', 'iWiW egyedi ajánlat elrejtése');
        addCB('removegolyahir', 'Gólyahír box elrejtése');
        addCB('removepollbox', 'Szavazás box elrejtése');
        addCB('removefrisshirek', 'Friss hírek elrejtése');        
        addCB('addfavforum_index', 'Kedvenc fórumtémák betöltése jobb oldali sávba (friss képek alá)');
        
        addTitle('Adatlap');
        addCB('removevb', 'VB játék eltávolítása az adatlapról');
        addCB('hideadatlapinfobox', 'Csoportosítás és InfoBox elrejtése (adatlap tetején lenyíló menüben elő lehet hívni, ha kell)');
        addCB('loadalbumsadatlap', 'Albumok betöltése profilkép alá');

        addTitle('Album képek oldal');
        addCB('autohidedetails_on_allpic', 'Összes kis kép betöltésére nyomva automatán rejtse el a részletek oldalsávot');
        addCB('albumpic_add_pager', 'Ahol csak egy oldal van (<=12 db kép), ott is jelenjen meg az Összes nagy kép új ablakba link (lapozó sáv)');
        addCB('albumpic_autoloadall', 'Automatikusan töltse be az összes kis képet (automatán első oldalra dob, ha nem azt nyitod meg)');
        addCB('albumpic_defhidedetails', 'Automatikusan rejtse el a jobb oldali részletek sávot (az albumok lekerülnek a képek alá)');
        addCB('replacealbumimglink', 'Képlinkek cserélése közvetlen a nagy kép linkjére (kép oldalát a "Szólj hozzá" vagy "hozzászólások" linkkel érheted el)');
        addCB('loadallalbum', 'Összes album betöltése részletek sávba (ahol 6-nál több album van, ott ne lapozos legyen, hanem jelenjen meg mind)');
        
        addTitle('Köszöntő <a onmouseover="jQuery(this).next().show();" onmouseout="jQuery(this).next().hide();" href="javascript:;">INFO</a><div style="font-weight:normal;display:none"><br/>Itt ismerősök automatikus megköszöntését tudod beállítani. Amennyiben bekapcsolod, úgy minden belépéskor (kezdőlap megnyitásakor) ellenőrzésre fognak kerülni az ünnepek. Ha valamelyik ismerősödnek születésnapja, névnapja van, úgy a lent előre beállított sablon szöveggel fel fog jönni egy üzenet küldő ablak. Itt lehetőség van még a szöveg utólagos szerkesztésére és az üzenet elküldésére (vagy törlésére, ha mégsem szeretnéd megköszönteni). <strong>Fontos, az iwiw TOOLS csak az aznapi ünnepeseket ellenőrzi, ha valamelyik nap nem lépsz be iWiW-re, úgy azok az ismerősök kimaradnak! </strong> (Ha rosszul jár a számítógépeden az óra, hibásan fogja betölteni az ünnepeket a szkript.)<br/><br/>A sablon szövegben (tárgyban nem!) használhatod a következő kifejezéseket is: <em>&lt;vezeteknev&gt; </em>, <em>&lt;keresztnev&gt; </em>, <em>&lt;becenev&gt; </em>, <em>&lt;conncount&gt; </em> (ismerősök száma), <em>&lt;userid&gt; </em> és a <em>&lt;kor&gt; </em> kifejezést, melyeket a szkript automatikusan kicserél az adott értékre. A <em>&lt;kor&gt; </em> kifejezést csak a születésnap köszöntőnél lehet használni, illetve akinél nincs beállítva a születési év, ott kor-nál egy kérdőjel (?) fog megjelenni!</div>');
        addCB('szulinap_koszonto', 'Születésnaposok köszöntésének felajánlása<br/>Üzenet tárgya:<br/><input type="text" name="szulinap_koszonto_targy" value="" style="width:500px" /><br/>Köszöntő sablon szövege:<br/><textarea name="szulinap_koszonto_szoveg" style="width:500px;height:100px;"></textarea>');
        addCB('nevnap_koszonto', 'Névnaposok köszöntésének felajánlása<br/>Üzenet tárgya:<br/><input type="text" name="nevnap_koszonto_targy" value="" style="width:500px" /><br/>Köszöntő sablon szövege:<br/><textarea name="nevnap_koszonto_szoveg" style="width:500px;height:100px;"></textarea>');
        
        $table.find('input, textarea').each(function(){ $(this).val( opt[$(this).attr('name')] ); });
        $table.append('<tr><td colspan="2"><a class="button highlighted" href="javascript:;"><span>Mentés</span></a></td></tr>');
        $table.find('a:last').click(beallitasokMenuSave);
        try{ $2('#it_main input').uniform(); }catch(err){ }        
    }
    
    // TOOLS beállítások menü mentés
    var beallitasokMenuSave=function(){
        $('#it_main input:checkbox').each(function(){
            opt[$(this).attr('name')]=this.checked;
        })
        opt.autoupdate_nap=parseInt2($('#it_main input[name=autoupdate_nap]').val(), 1, 7);
        opt.morenewpic_index_db=parseInt2($('#it_main input[name=morenewpic_index_db]').val(), 4, 32);
        $(['szulinap_koszonto_targy', 'nevnap_koszonto_targy', 'szulinap_koszonto_szoveg', 'nevnap_koszonto_szoveg']).each(function(k, e){
            opt[e]=$('#it_main *[name='+e+']').val();
        });
        saveOpt();
        alert("A beállításokat elmentettük!");
    }
    
    // Törölt kapcsolatok menü megnyitása
    var openToroltKapcsolatok=function(){
        $('#it_side').append('<div class="infoBox"><h3><span class="icon infoBoxIcon">InfoBox</span></h3><p>A TOOLS itt mutatja, ha egy ismerősöddel megszünik az ismerettségi kapcsolatod, akár az ismerősöd törli, akár Te. A szkript azt is jelzi, ha ismerősöd az iWiW-ről törölte magát, viszont ez esetben külön (a Beállítások alatt) be kell kapcsolnod a névmegjegyzést is, ha kíváncsi vagy a nevére is, és nem csak az iWiW azonosítójára.</p><p>A törölt kapcsolatfigyelő csak az iwiw TOOLS telepítése (illetve ezen opció bekapcsolása) után törlödött kapcsolatokat képes jelezni. A törölt kapcsolatok figyelése új telepítés esetén automatikusan be van kapcsolva, ezen változtatni a Beállítások menüpont alatt tudsz.</p></div>');
        if(!opt.torolt_kapcs_figyelo){
            alert("A törölt kapcsolatfigyelő funkció nincs bekapcsolva!\nA szolgáltatást a Beállítások menü alatt tudod bekapcsolni.");
            return;
        }
        var $m=$('#it_main');
        $m.append('<h4>Törölt kapcsolatok keresése...</h4>');
        checkToroltKapcsolat(function(){
            if($('li.active a[href$=toroltkapcsolatok]').length==0) return; // Már nem a kapcsolatfigyelő van megnyitva
            $m.html('<h4>Törölt kapcsolatok ('+opt.torolt_kapcs_figyelo_cnt+' db)</h4>');
            var uj=tmpvars.ismeros_lista;
            var regi=opt.torolt_kapcs_figyelo_regiism;
            for(var i in regi) if( $.inArray(regi[i], uj)==-1 ){
                $m.append('<a href="/pages/user/userdata.jsp?userID='+regi[i]+'">/pages/user/userdata.jsp?userID='+regi[i]+'</a>'+(opt.torolt_kapcs_figyelo_regiism_nev['id'+regi[i]]?' (elmentett név: '+$('<div></div>').text(opt.torolt_kapcs_figyelo_regiism_nev['id'+regi[i]]).html()+')':' (nincs elmentett név)')+' - <span id="toroltism_'+regi[i]+'">név betöltése...</span><br/>');
                getUserXML(regi[i], function(data){ $('#toroltism_'+this.uid).text( $(data).find('#name').text() ); }, false, {uid: regi[i]} );
            }
            if(opt.torolt_kapcs_figyelo_cnt>0) $m.append('<br/><br/><a class="button highlighted" href="/pages/main/index.jsp" title="Ezzel a gombbal a fenti listát tudod üríteni"><span>Törölt kapcsolatokat tudomásul vettem</span></a><br/><br/>');
            else $m.append('Nincs új törölt kapcsolatod.');
            if(!opt.torolt_kapcs_figyelo_nev) $m.append('Ha szeretnéd elmenteni az ismerőseid nevét is, hogy ha törlik magukat iWiW-ről, akkor ne csak az azonosítójukat látsd, hanem a nevüket is, akkor ezt a beállítások alatt be tudod kapcsolni. <b>Figyelem!</b> Sok ismerős esetén nem ajánlott a bekapcsolása, mert esetenként lassíthatja a szkript futását!<br/><br/>');
            $m.append('<br/>');
            $m.find('a:last').click(function(){
                var regi=opt.torolt_kapcs_figyelo_regiism;
                var reginev=opt.torolt_kapcs_figyelo_regiism_nev;
                var uj=tmpvars.ismeros_lista;
                var ujnev={};
                for(i in uj){
                    if(!reginev['id'+uj[i]]) continue;
                    ujnev['id'+uj[i]]=reginev['id'+uj[i]];
                }
                opt.torolt_kapcs_figyelo_regiism=uj;
                opt.torolt_kapcs_figyelo_regiism_nev=ujnev;
                saveOpt();
            });            
        });
    }
    
    // Üzenetek mentése
    var openUzenetekMentese=function(){
        $('#it_side').append('<div class="infoBox"><h3><span class="icon infoBoxIcon">InfoBox</span></h3><p>Üzenetek mentése. Ezen az oldalon a szkript kimenti neked az összes üzeneted egy oldalra, amit könnyedén le tudsz menteni az utókor számára.</p>'
        +'<p>Kódok a sablonhoz:<br/>{targy} - tárgy<br/>{kuldo} - küldő neve<br/>{kuldoid} - küldő user vagy club ID-ja<br/>{kuldopic} - küldő profilképének url-je<br/>{cimzettek}<br/>{cimzettid} - cimzett ID-ja (kimenőnél)<br/>{ido} - küldési idő<br/>{szoveg} - üzenet<br/>{url} - küldő profil linkje (user vagy klubbé, üzenetnek megfelelően)</p></div>');
        var $m=$('#it_main');
        $m.append('<h4>Üzenetek mentése</h4>'
            +'<p>Itt a bejövő és kimenő üzeneteidet tudod exportálni. Az exportálás után pár perc alatt betöltödnek az üzenetek,'
            +'majd megjelenik egy link, amire nyomva meg lehet nyitni a backup fájlt. Megnyitás után Fájl/Oldal mentése... menüpontra kattintva tudod elmenteni az üzeneteidet.</p>'
            +'<p>Fontos: az iwiw TOOLS lekezeli az AJAX hibákat, és hiba esetén megpróbálja folytatni a mentést. Ha mégsem sikerülne neki, akkor erről figyelmeztetni fog, viszont ennek ellenére, ha a számláló már 1-2 perce nem változik, érdemes újra megnyitni az oldalt és újrakezdeni a mentést.<br /><br /><br /></p>'
            +'<div id="it_uzenetsave_stat"><a class="button highlighted" href="javascript:;"><span>Beérkezett üzenetek mentése</span></a> '
            +'<a class="button highlighted" href="javascript:;"><span>Kimenő üzenetek mentése</span></a>  <br/><br/><br/><br/> '
            +'<a class="button highlighted" href="javascript:;"><span>Összes beérkezett üzenet TÖRLÉSE</span></a> '
            +'<a class="button highlighted" href="javascript:;"><span>Összes kimenő üzenet TÖRLÉSE</span></a> </div>');
        // beérkezett üzik mentése
        $m.find('a:first').click(function(){
            tmpvars.uzisave_uzik=[];
            tmpvars.uzisave_ids=[];
            tmpvars.uzisave_utolsopage=0;
            tmpvars.uzisave_bejovo=true;
            tmpvars.uzisave_del=false;
            $('#it_uzenetsave_stat').text('Mentés folyamatban, kérlek várj...');
            uzisave_ajax1();
            return false;
        });
        // kimenő üzik mentése
        $m.find('a:eq(1)').click(function(){ 
            tmpvars.uzisave_uzik=[];
            tmpvars.uzisave_ids=[];
            tmpvars.uzisave_utolsopage=0;
            tmpvars.uzisave_bejovo=false;
            tmpvars.uzisave_del=false;
            $('#it_uzenetsave_stat').text('Mentés folyamatban, kérlek várj...');
            uzisave_ajax1();
            return false;
        });
        // bejövő törlése
        $m.find('a:eq(2)').click(function(){
            if(!confirm('Biztos TÖRLÖD az ÖSSZES BEJÖVŐ üzeneted?')) return false;
            tmpvars.uzisave_uzik=[];
            tmpvars.uzisave_ids=[];
            tmpvars.uzisave_utolsopage=0;
            tmpvars.uzisave_bejovo=true;
            tmpvars.uzisave_del=true;
            $('#it_uzenetsave_stat').text('Törlés előkészülete folyamatban, kérlek várj...');
            uzisave_ajax1();
            return false;
        });
        // kimenő törlése
        $m.find('a:eq(3)').click(function(){ 
            if(!confirm('Biztos TÖRLÖD az ÖSSZES KIMENTŐ üzeneted?')) return false;
            tmpvars.uzisave_uzik=[];
            tmpvars.uzisave_ids=[];
            tmpvars.uzisave_utolsopage=0;
            tmpvars.uzisave_bejovo=false;
            tmpvars.uzisave_del=true;
            $('#it_uzenetsave_stat').text('Törlés előkészülete folyamatban, kérlek várj...');
            uzisave_ajax1();
            return false;
        });             
    }

    // üzi save ajax 1
    var uzisave_ajax1 = function (d) {
        if (typeof (d) != "undefined") {
            var u = this.url;
            if ($('a[href*="jsp"][href*="page="][title="Utolsó oldal"]', d).size() > 0){
                tmpvars.uzisave_utolsopage = parseInt($('a[href*="jsp"][href*="page="][title="Utolsó oldal"]:first', d).attr('href').match(/page=([0-9]+)/)[1]);
                //log("Utolsó oldal: "+tmpvars.uzisave_utolsopage);
                //tmpvars.uzisave_utolsopage=0; /////
            }
            $('a[href*="messageread.jsp?messageID="]', d).each(function () {
                if ($(this).attr('href').match(/messageID=([0-9]+)/)) {
                    var id = parseInt(RegExp.$1);
                    if ($.inArray(id, tmpvars.uzisave_ids) == -1){
                        tmpvars.uzisave_ids.push(id);
                        //log("MsgID: "+id);
                    }
                }
            })
            this._i++;
        } else {
            this._i = 0;
        }
        var i = this._i;
        if (i <= tmpvars.uzisave_utolsopage) {
            // üzenetid-k keresése
            $('#it_uzenetsave_stat').text('Üzenetek keresése: ' + (i + 1) + ' / ' + (tmpvars.uzisave_utolsopage + 1));
            $.ajax({
                url: (tmpvars.uzisave_bejovo ? host + '/pages/message/inbox.jsp?page=' + i : host + '/pages/message/outbox.jsp?page=' + i),
                _i: i,
                dataType: 'text',
                timeout: 15000,
                success: uzisave_ajax1,
                error2:
                    function () {
                        alert('Hiba történt, töltsd újra az oldalt, és próbáld újra!')
                    }
            });
        } else {
            // üzenetek mentése
            if (tmpvars.uzisave_del) uzidel_ajax2();
            else uzisave_ajax2();
        }
    }
    // üzi save ajax 2
    var uzisave_ajax2 = function (d) {
        if (typeof (d) != "undefined") {
            // üzenet feldolgozása...
            $('tbody .name').find('br').remove();
            $('tbody .name img').attr('border', '0');            
            var s = {
                ido: $.trim($('#mainForm td.date', d).text()),
                szoveg: $('#mail_text', d).html(),
                cimzettek: $('tbody th.to', d).html(),
                cimzettid: $('tbody th.to a[href*=userID]:first', d).length>0 ? $('tbody th.to a[href*=userID]:first', d).attr('href').match(/userID=([0-9]+)/)[1] : '',
                targy: $('#mainForm .body h1', d).text(),
                kuldo: $('tbody .name', d).length==0 ? $('#mainForm .from .title', d).text() : $('tbody .name', d).text(),
                kuldopic: $('tbody .name', d).length==0 ? $('#mainForm .from img', d).attr('src') : $('tbody .name', d).parent().find('img').attr('src'),
                kuldoid: $('tbody .name', d).length==0 ? $('#mainForm .from .title', d).attr('href').match(/cID=([0-9]+)/)[1] : $('tbody .name', d).parent().attr('data-userid'),
                url: $('tbody .name', d).length==0 ? $('#mainForm .from .title', d).attr('href') : $('tbody .name', d).attr('href')
            }
            tmpvars.uzisave_uzik.push(s);
            this._i++;
        } else {
            this._i = 0;
        }
        var i = this._i;
        if (i < tmpvars.uzisave_ids.length) {
            // köv. üzi letöltése
            $('#it_uzenetsave_stat').text('üzenet mentése: ' + (i + 1) + ' / ' + tmpvars.uzisave_ids.length + ' #' + tmpvars.uzisave_ids[i]);
            $.ajax({
                url: host + '/pages/message/messageread.jsp?messageID=' + tmpvars.uzisave_ids[i] + '&openAll=1',
                _i: i,
                dataType: 'text',
                timeout: 15000,
                success: uzisave_ajax2,
                error2:
                    function () {
                        alert('Hiba történt, töltsd újra az oldalt, és próbáld újra!')
                    }
            });
        } else {
            // KÉÉÉSZ :)
            $('#it_uzenetsave_stat').html('<a class="button highlighted" href="javascript:;"><span>A mentés véget ért, az eredmény megtekintéséhez kattints IDE!</span></a><br/><br/><br/>');
            $('#it_uzenetsave_stat').append('<label><input type="checkbox" id="it_uzisave_group" /> Üzenetek csoportosítása '+(tmpvars.uzisave_bejovo?'feladó':'címzett')+' szerint</label><br/>');
            $('#it_uzenetsave_stat').append('<label><input type="checkbox" id="it_uzisave_css" checked="checked" /> iWiW stiluslap beillesztése (ettől "színes" lesz az oldal és látszani fognak az állapotjelző borítékok)</label><br/><br/>');
            $('#it_uzenetsave_stat').append('HTML sablon szerkesztése (ha nem ismered a HTML-t, ne írd át! - <a href="#">alapértelmezett sablon visszatöltése</a>):<br/><textarea id="it_msgsave_sablon" style="width:500px;height:160px;"></textarea>');
            if (tmpvars.uzisave_bejovo) $('#it_msgsave_sablon').val(typeof opt.msgsave_inbox2 != "undefined" ? opt.msgsave_inbox2 : opt2.msgsave_inbox)
            else $('#it_msgsave_sablon').val(typeof opt.msgsave_outbox2 != "undefined" ? opt.msgsave_outbox2 : opt2.msgsave_outbox)
            // DEFAULT SABLON VISSZATÖLTÉSE
            $('#it_uzenetsave_stat a:last').click(function () {
                if (!confirm('A most beállított sablon el fog veszni, mégis visszatöltöd az alapértelmezett sablont?')) return false;
                if (tmpvars.uzisave_bejovo) $('#it_msgsave_sablon').val(opt2.msgsave_inbox)
                else $('#it_msgsave_sablon').val(opt2.msgsave_outbox)
                return false;
            })
            $('#it_uzenetsave_stat a:first').click(function () {
                var h = window.open("", "", "");
                var d = new Date();
                var t = [], o={};
                var gr= $('#it_uzisave_group:checked').length>0;
                var sablon = $('#it_msgsave_sablon').val();
                // sablon mentése:
                if (tmpvars.uzisave_bejovo) opt.msgsave_inbox2 = sablon;
                else opt.msgsave_outbox2 = sablon;
                saveOpt();
                for (var i in tmpvars.uzisave_uzik) {
                    var e = tmpvars.uzisave_uzik[i];
                    var s = sablon;
                    s = s.replace(/{targy}/g, e.targy)
                    s = s.replace(/{kuldo}/g, e.kuldo)
                    s = s.replace(/{kuldoid}/g, e.kuldoid)
                    s = s.replace(/{kuldopic}/g, e.kuldopic)
                    s = s.replace(/{cimzettek}/g, e.cimzettek)
                    s = s.replace(/{cimzettid}/g, e.cimzettid)
                    s = s.replace(/{ido}/g, e.ido)
                    s = s.replace(/{szoveg}/g, e.szoveg)
                    s = s.replace(/{url}/g, e.url)
                    if(gr){
                        if(typeof o[tmpvars.uzisave_bejovo?e.url:'id'+e.cimzettid]=="undefined") o[tmpvars.uzisave_bejovo?e.url:'id'+e.cimzettid]=[];
                        o[tmpvars.uzisave_bejovo?e.url:'id'+e.cimzettid].push(s);
                    }else{
                        t.push(s);
                    }
                }
                if(gr) for(var i in o) t.push( o[i].join('<hr/>') );
                h.document.writeln("<html><head><title>iWiW " + (tmpvars.uzisave_bejovo ? 'Bejövő' : 'Kimenő') + " üzenetek mentés " + (d.getYear() + 1900) + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "</title>"+($('#it_uzisave_css:checked').length>0?"<link href='http://static.iwiw.net/common/css-gen/bigredesign_27934.css?sv=18' type='text/css' rel='stylesheet'/>":"")+"</head><body style='margin:10px'>" + t.join(gr?'<hr/><hr/>':'<hr/>') + "</body></html>");
                h.document.close();
                return false;
            })
        }
    }
    // üzi del ajax 2 (ajax 1 az savenél van)
    var uzidel_ajax2 = function () {
        var db = tmpvars.uzisave_ids.length;
        var t = [];
        for (var i = 0; i < 20; i++) if (tmpvars.uzisave_ids.length > 0) t.push(tmpvars.uzisave_ids.shift());
        if (t.length == 0) {
            $('#it_uzenetsave_stat').text('A törlés sikeresen befejeződött!');
            alert("A törlés sikeresen befejeződött!");
        } else {
            $.ajax({
                url: host + (tmpvars.uzisave_bejovo ? '/pages/message/inbox.jsp?method=DeleteMessageUsers' : '/pages/message/outbox.jsp?method=DeleteMessages'),
                dataType: 'text',
                type: 'POST',
                data: {messageChecked: t},
                timeout: 30000,
                success:
                    function () {
                        uzidel_ajax2();
                    }, error2:
                    function () {
                        alert('Hiba történt, töltsd újra az oldalt, és próbáld újra!');
                    }
            });
        }
    }

    
    // Backup menü megnyitása
    var openBackup=function(){
        $('#it_side').append('<div class="infoBox"><h3><span class="icon infoBoxIcon">InfoBox</span></h3><p>Ismerősök exportálása.</p></div>');
        var $m=$('#it_main');
        // backup
        $m.append('<h4>Backup készítése az ismerősökről</h4><p>A lenti mezőben megjelenő listát elmentve egy txt fájlba bármikor vissza tudod tölteni az ismerőseid az iWiW-re. Hogy ez miért jó? Ha véletlenül törölnének az iWiW-ről, bármikor vissza tudod állítani egy új regisztrációba a régi ismerőseidet az elmentett azonosítók alapján. A visszaállítást az azonosítók alapján egyesével kell elvégezned (bizonyos okok miatt az automatikus visszaállítás funkció már nem elérhető a TOOLS-ban).</p><textarea rows="10" cols="70">Betöltés...</textarea><br/><br/>');
        getUserXML(USERID,  function(data){
            $m.find('textarea:first').val( $(data).find('connections').text().replace(/(,)/g, ", ") ).attr('readonly', 'readonly').click(function(){this.focus(); this.select();});
        });
        // quick export
        $m.append('<h4>Quick export</h4><p>Gyors lista az ismerősökről iWiW-es azonosítóval (userid), névvel és az ismerőseinek számával.<br/><br/><textarea rows="10" cols="70">Betöltés...</textarea><br/><br/>Mentés lépései: az adatokat célszerű excelbe kimenteni. Kattints a felső mezőbe, miután megjelentek az adatok, majd nyomj Ctrl+A-t (összes kijelölése), majd Ctrl+C (másolás). Nyiss meg egy excelt és az első (A1-es) cellába illeszd be.<br/></p>');
        getFriendsXML(USERID, function(data){
				var ki="\tSaját ismerősök\nuserID\tnév\tism.\tvezetéknév\tkeresztnév\tadatlap\n";
				$('userlist > user', data).each(function(){
					var nev=$(this).attr('uname').match(/^(.*), (.*)$/);
					if(!nev) nev=["", "", ""];
					ki+=$(this).attr('id') + "\t"
						+ $(this).text() + "\t"
						+ $(this).attr('conncount') + "\t"
						+ nev[1] + "\t"
						+ nev[2] + "\t"
						+ host + "/pages/user/userdata.jsp?userID=" + $(this).attr('id') + "\n";
					});
				$m.find('textarea:eq(1)').val( ki ).attr('readonly', 'readonly').click(function(){this.focus(); this.select();});
			});
    }
    
    // Aktuális névnap lekérése
	var getAktNevnap=function(){
		var ho="január,február,március,április,május,június,július,augusztus,szeptember,október,november,december".split(",");
		var d=new Date();
		var hnap=new Date();
		hnap.setTime(d.getTime() + 1000*3600*24 );
        return "Ma <b>"+getNevnap(d)+"</b> napja van, holnap "+getNevnap(hnap)+" napja lesz";
	}
    
    // Adott nap névnapjának lekérése
	var getNevnap=function(d){
		var nevnap=["Fruzsina|Ábel|Genovéva, Benjámin|Titusz, Leona|Simon|Boldizsár|Attila, Ramóna|Gyöngyvér|Marcell|Melánia|Ágota|Ernő|Veronika|Bódog|Lóránt, Lóránd|Gusztáv|Antal, Antónia|Piroska|Sára, Márió|Fábián, Sebestyén|Ágnes|Vince, Artúr|Zelma, Rajmund|Timón|Pál|Vanda, Paula|Angelika|Károly, Karola|Adél|Martina, Gerda|Marcella",
		"Ignác|Karolina, Aida|Balázs|Ráhel, Csenge|Ágota, Ingrid|Dorottya, Dóra|Tódor, Rómeó|Aranka|Abigél, Alex|Ervin|Bertold, Marietta|Lívia, Lídia|Ella, Linda|Bálint, Valentin|Kolos, Georgina|Julianna, Lilla|Donát|Bernadett|Zsuzsanna|Aladár, Álmos|Elonóra|Gerzson|Alfréd|Mátyás|Géza|Edina|Ákos, Bátor|Antónia, Elemér",
		"Albin|Lujza|Kornélia|Kázmér|Adorján, Adrián|Leonóra, Inez|Tamás|Zoltán|Franciska, Fanni|Ildikó|Szilárd|Gergely|Krisztián, Ajtony|Matild|Kristóf|Henrietta|Gertrúd, Patrik|Sándor, Ede|József, Bánk|Klaudia|Benedek|Beáta, Izolda|Emőke|Gábor, Karina|Irén, Írisz|Emánuel|Hajnalka|Gedeon, Johanna|Auguszta|Zalán|Árpád",
		"Hugó|Áron|Buda, Richárd|Izidor|Vince|Vilmos, Bíborka|Herman|Dénes|Erhard|Zsolt|Leó, Szaniszló|Gyula|Ida|Tibor|Anasztázia, Tas|Csongor|Rudolf|Andrea, Ilma|Emma|Tivadar|Konrád|Csilla, Noémi|Béla|György|Márk|Ervin|Zita, Mariann|Valéria|Péter|Katalin, Kitti",
		"Fülöp, Jakab|Zsigmond|Tímea, Irma|Mónika, Flórián|Györgyi|Ivett, Frida|Gizella|Mihály|Gergely|Ármin, Pálma|Ferenc|Pongrác|Szervác, Imola|Bonifác|Zsófia, Szonja|Mózes, Botond|Paszkál|Erik, Alexandra|Ivó, Milán|Bernát, Felícia|Konstantin|Júlia, Rita|Dezső|Eszter, Eliza|Orbán|Fülöp, Evelin|Hella|Emil, Csanád|Magdolna|Janka, Zsanett|Angéla, Petronella",
		"Tünde|Kármen, Anita|Klotild|Bulcsú|Fatime|Norbert, Cintia|Róbert|Medárd|Félix|Margit, Gréta|Barnabás|Villő|Antal, Anett|Vazul|Jolán, Vid|Jusztin|Laura, Alida|Arnold, Levente|Gyárfás|Rafael|Alajos, Leila|Paulina|Zoltán|Iván|Vilmos|János, Pál|László|Levente, Irén|Péter, Pál|Pál",
		"Tihamér, Annamária|Ottó|Kornél, Soma|Ulrik|Emese, Sarolta|Csaba|Apollónia|Ellák|Lukrécia|Amália|Nóra, Lili|Izabella, Dalma|Jenő|Örs, Stella|Henrik, Roland|Valter|Endre, Elek|Frigyes|Emília|Illés|Dániel, Daniella|Magdolna|Lenke|Kinga, Kincső|Kristóf, Jakab|Anna, Anikó|Olga, Liliána|Szabolcs|Márta, Flóra|Judit, Xénia|Oszkár",
		"Boglárka|Lehel|Hermina|Domonkos, Dominika|Krisztina|Berta, Bettina|Ibolya|László|Emőd|Lőrinc|Zsuzsanna, Tiborc|Klára|Ipoly|Marcell|Mária|Ábrahám|Jácint|Ilona|Huba|István, Vajk|Sámuel, Hajna|Menyhért, Mirjam|Bence|Bertalan|Lajos, Patrícia|Izsó|Gáspár|Ágoston|Beatrix, Erna|Rózsa|Erika, Bella",
		"Egyed, Egon|Rebeka, Dorina|Hilda|Rozália|Viktor, Lőrinc|Zakariás|Regina|Mária, Adrienn|Ádám|Nikolett, Hunor|Teodóra|Mária|Kornél|Szeréna, Roxána|Enikő, Melitta|Edit|Zsófia|Diána|Vilhelmina|Friderika|Máté, Mirella|Móric|Tekla|Gellért, Mercédesz|Eufrozina, Kende|Jusztina|Adalbert|Vendel|Mihály|Jeromos",
		"Malvin|Petra|Helga|Ferenc|Aurél|Brúnó, Renáta|Amália|Koppány|Dénes|Gedeon|Brigitta, Gitta|Miksa|Kálmán, Ede|Helén|Teréz|Gál|Hedvig|Lukács|Nándor|Vendel|Orsolya|Előd|Gyöngyi|Salamon|Blanka, Bianka|Dömötör|Szabina|Simon, Szimonetta|Nárcisz|Alfonz|Farkas",
		"Marianna|Achilles|Győző|Károly|Imre|Lénárd|Rezső|Zsombor|Tivadar|Réka|Márton|Jónás, Renátó|Szilvia|Aliz|Albert, Lipót|Ödön|Hortenzia, Gergő|Jenő|Erzsébet, Zsóka|Jolán|Olivér|Cecília|Kelemen, Klementina|Emma|Katalin, Katinka|Virág|Virgil|Stefánia|Taksony|András, Andor",
		"Elza|Melinda, Vivien|Ferenc, Olívia|Borbála, Barbara|Vilma|Miklós|Ambrus|Mária|Natália|Judit|Árpád|Gabriella|Luca, Otília|Szilárda|Valér|Etelka, Aletta|Lázár, Olimpia|Auguszta|Viola|Teofil|Tamás|Zénó|Viktória|Ádám, Éva|Eugénia|István|János|Kamilla|Tamás, Tamara|Dávid|Szilveszter"];		// szökőévben febr 24-től el kell tolni 1 nappal és febr 24 szökőnap
		 var n2=nevnap[ d.getMonth() ].split("|");
		 var nap=d.getDate();
		 if(d.getYear()%4==0 && d.getMonth()==1 && nap==24) return "szökőnap";
		 if(d.getYear()%4==0 && d.getMonth()==1 && nap>24) nap--;
		 return n2[nap-1];
	}
    
    
    // Layer Menü bezárása
    var closeLayerMenu=function(){
        $('.menuLayer').hide();
        $('#mainMenu li').removeAttr('id');
        $('#menuLayer').hide();
    }
    
    // TOOLS layer menü kinyitás (ez a menüsor alatt jelenik meg, kis nyilacskára nyomva lehet kinyitni)
    var openToolsLayerMenu=function(){
        if($(this).parent().is('#layered')){ // becsukja
            log("close tools layer menü");
            $(this).parent().removeAttr('id');
            $('#toolsLayer').closest('.menuLayer').hide();
            return;
        }
        log("open tools layer menü");
        $('#layered').removeAttr('id');
        var $b=$(this).parent();
        setTimeout(function(){
            $('#toolsLayer').closest('.menuLayer').show();
            var $a=$('#toolsLayer.layerContent').width(865).show();
            $b.attr('id', 'layered');
            if($a.find('div').size()>0) return;
            $a.append('<div class="forumLayerLeft inverted"><h3>iwiw TOOLS '+VERSION+'</h3><p class="layerDescription">Ez az iwiw TOOLS gyorsmenüje, ide majd pár hasznos dolog fog kerülni.</p><div class="clear"></div> <p class="moreStuff"><a href="javascript:;">iwiw TOOLS Beállítások</a></p></div>'
                +'<div class="forumLayerCenter inverted"><h3>Tartalom</h3><p class="it_layermenulinks">'+getAktNevnap()+'<br/><br/></p><div class="clear"></div><p class="moreStuff"><a href="javascript:;">More</a></p></div>'
                +'<div class="forumLayerRight inverted"><h3><span class="icon star">Kedvenceim</span></h3><ul><li class="forumLayerRightItem"><a title="iwiw TOOLS a userscripts.org-on" href="http://userscripts.org/scripts/show/24506" target="_blank">iwiw TOOLS honlapja</a></li><li><a href="/pages/user/search/search.jsp">Kereső</a></li></ul></div><div class="clear"></div>');
            $a.find('a.button').click(function(){ alert("okéé") });
            $a.find('.moreStuff a:first').click(openToolsMenu);
            var $l=$a.find('.it_layermenulinks');
            if(opt.torolt_kapcs_figyelo) $l.append( $('<a href="javascript:;">Törölt kapcsolataid száma: '+opt.torolt_kapcs_figyelo_cnt+' db</a>').click(function(){ openToolsMenu(); toolsMenuClick.apply($('.tabber a[href$=toroltkapcsolatok]')[0]); }) );
            else $l.append( 'A törölt kapcsolatfigyelő nincs bekapcsolva' );
            $l.append('<br/>');
            $l.append( $('<a href="javascript:;">Kapcsolatfigyelő: '+(opt.figyelo_uj?'van új változás!':'nincs változás')+'</a>').click(function(){ openToolsMenu(); toolsMenuClick.apply($('.tabber a[href$=kapcsolatfigyelo]')[0]); }) );
        }, 25);
    }
    


    
    
    var t2=new Date();
	log( 'Betöltödési idő: ' + (t2.getTime() - start_time.getTime()) + ' ms');
    
    // UserID betöltése (ha nincs, akkor TOOLS leállítása, mert valszeg nem iwiw oldalon vagyunk?!)
    var USERID;
    if( $('#profileOptions a:first').length>0 && $('#profileOptions a:first').attr('href').match(/userID=([0-9]+)/) ){
        USERID=RegExp.$1;
    }else if( $('#profileOptions a:first').length>0 && $('#profileOptions a:first').attr('href').match(/\/adatlap$/) ){
        USERID=$('meta[name=iwiw-userid]').attr('content');
    }else{
        log("USERID nem érzékeltem, szkript leállítása");
        return;
    }

    // Beállítások betöltése:
	var defopt=GM_getValue('def_opt', "");
	var useropt=GM_getValue(USERID+'_opt', "");

	if(useropt!=""){
        $.extend(opt, $.parseJSON(useropt));
	}else if(defopt!=""){
		$.extend(opt, $.parseJSON(defopt));
	}

    // --- init ---    
    
    if($('#it_toolsmenulink').length>0) return; // ha már betöltödött egyszer a tools - de a hiba okát ki kéne deríteni?!

    configJQueryAjax();    
    addCSS(MEDIA.mainCSS);
    
    addToolsMenu();
    if(opt.slim_tabber) slimTabber();
    if(opt.removebanners) removeBanners();
    if(opt.torolt_kapcs_figyelo) checkToroltKapcsolat();
    if(opt.favuser) addFavMenu();
    if(opt.autoupdate) autoUpdate();
    if(opt.taskbaroff) unsafeWindow.iwiw.Taskbar.disabled=true;
    $2('.usermini').live('hover', userMiniMouseOver)
    if(opt.nevjegynagykep) $2('.usermini img.miniSize').live('mouseover', userMiniImgMouseOver).live('mouseout', userMiniImgMouseOut);
    if(opt.sectimeout) setInterval(function(){ $.get('/pages/main/index.jsp'); }, 120000);
    if(opt.addkeresomenu) $('#menuHint').append('<li><a href="/pages/user/search/search.jsp" style="background:url(\'http://static.iwiw.net/common/image/bigredesign/iconset.png\') no-repeat scroll 2px -1149px transparent"><strong>Kereső</strong></a></li>');
    $('li.applicationsLayer span:first').text('Alk.').parent().attr('title', 'Alkalmazások');
    
    
    // kezdőlap:
    if(path=="/i/fooldal"){
        if(opt.morenewpic_index && !opt.removenewpic_index) replaceImageCnt();
        if(opt.defaultboardmsg) $('#main_activities').attr('data-url', '/pages/activity/activities.jsp?type=BOARDMSG');
        if(opt.addfavforum_index) $('.mystuff.sidebar .remoteLoad:first').after('<div class="remoteLoad"><a style="display: none" href="/pages/forum/favouritebox.jsp"></a></div>');
        if(opt.removenewpic_index){
            $('.remoteLoad:has( > a[href*="pages/image/index_right.jsp"])').remove();
            $('.mystuff h3:contains(Ismerősök friss képei), .mystuff .imageList').remove();
        }
        if(opt.removeemlekezteto_index){
            $('.remoteLoad:has( > a[href*="pages/user/anniversaries_box.jsp"])').remove();
            $('.mystuff h3:contains(Emlékeztető)').remove();
        }
        if(opt.removeshoppingbox_index) $('#shoppingBoxContainer').remove();
        if(opt.removeesemeny_index) $('.remoteLoad:has( > a[href*="pages/events/main-page-events-box.jsp"])').remove();         
        if(opt.remove_index_rightside) removeIndexRightSide();
        if(opt.removegolyahir) $('#content .partnerbox:has(h3:contains(GÓLYAHÍR))').remove();
        if(opt.removepollbox) $('.remoteLoad:has(a[href*=poll_main_page_box])').remove();
        if(opt.removefrisshirek) $('#content div.remoteLoad:has(a[href*="pages/news/"])').remove();
        checkKapcsolatfigyelo();
        $2('#activitiesContainer .outer').live('mouseover', userImageOver).live('mouseout', userImageOut);
        if(opt.szulinap_koszonto || opt.nevnap_koszonto) loadKoszonto();
    }
    
    // adatlap:
    ///if(path=="/pages/user/userdata.jsp"){
    if(path.match(/\/[^\/]{4,}\/adatlap/)){
        if(opt.removevb) $('#userDataPageCenter .fortunaBox').remove();
        addKapcsolatfigyeloLink();
        addOsszesKepLink_User("userdata");
        if(opt.hideadatlapinfobox) hideAdatlapInfoBox();
        if(opt.loadalbumsadatlap){
            loadAlbumsToAdatlap();
            $2('.albumlist .album').live('mouseover', userAlbumOver).live('mouseout', userAlbumOut);
        }
    }
    
    // mások ismerősei:
    if(path=="/pages/user/friends.jsp" || path.match(/[^\/]{4,}\/ismerosok/)){
        addQuickViewIcon();
    }
    
    // kép oldalon:
    if(path=="/pages/image/imagedata.jsp" || path.indexOf('/kep/')>0){
        addOsszesKepLink_User("imagedata");
        $2('.albumlist .album').live('mouseover', userAlbumOver).live('mouseout', userAlbumOut);
    }
    
    // album oldalon:
    //if(path=="/pages/image/albumdata.jsp"){
    if(path=="/pages/image/albumdata.jsp" || path.match(/\/kepek$/) || path.match(/\/album\/(\d+|profil)/) && !path.match(/\kep\/\d+/)){
        if(opt.albumpic_add_pager && $('.albumdata .pager').length==0) addAlbumPager();
        addAlbumOsszeskepAjax_Link();
        addAlbumHideDetails_Link();
        addOsszesKepLink_User("albumdata");
        if(!opt.albumpic_autoloadall && opt.albumpic_defhidedetails) albumHideDetails();
        if(opt.replacealbumimglink) replaceAlbumImgLink();
        if(opt.loadallalbum) loadAllAlbum();
        $2('.albumlist .album').live('mouseover', userAlbumOver).live('mouseout', userAlbumOut);
    }
    
    // saját ismerősök oldal
    if(path=="/pages/user/myfriends.jsp" || path=="/pages/user/search/myfriends.jsp" || path=='/i/ismerosok'){
        addQuickViewIcon();
    }
    
    // kereső
    if(path=="/pages/user/search/search.jsp"){
        addQuickViewIcon();
    }
    

    if(DEBUG) unsafeWindow.ß=jQuery;
    unsafeWindow.OPENCB=openCB;


	var t3=new Date();
	log( 'Futási idő: ' + (t3.getTime() - t2.getTime()) + ' ms')


})();
