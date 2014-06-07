// ==UserScript==
// @name      magicLink color changer
// @description The  Script keeps history of "magnet" (and other types of) links you've pressed.
// @namespace      magicLink
// @include        *
// @copyright 2009, JoeSimmons (floating center box http://userscripts.org/scripts/show/48190)
// @version 1.1
// ==/UserScript==

var pressed = '200,0,200'; // color of links
var visited = '250,140,140'; // effective only on first run
if (!GM_getValue('pressedColor')) {GM_setValue('pressedColor', pressed)} 
var pressedColor = "rgb("+GM_getValue('pressedColor')+")";
if (!GM_getValue('visitedColor')) {GM_setValue('visitedColor', visited)} 
var visitedColor = "rgb("+GM_getValue('visitedColor')+")";
var defaultTypes = new Array ("http://", "magnet", "avi", "mp3"); // default types (on first run). http:// stands for page links.
var localeString = getLanguage();
function getLanguage() {
if (navigator.language == "ru") { // add your language
	return('Настройки MagicLink,новый тип,Добавить в список,Выкл,Вкл,Очистить,Удалить из списка,цвет Активной ссылки,цвет Использованной ссылки,красный,зеленый,синий');
    } else {
	return('MagicLink Settings,new type,Add to list,Disable,Enable,Clear,Remove from list,\"Pressed\" color,\"Visited\" color,red,green,blue');
    }
}
if (!GM_getValue('fileTypes')) { GM_setValue('fileTypes', defaultTypes.toString()) }
var fileTypes = GM_getValue('fileTypes').split(',');
if (!GM_getValue('enabledTypes')) { GM_setValue('enabledTypes', defaultTypes.toString()) }
var enabledTypes = GM_getValue('enabledTypes');
var settingsOn=0;
var checkList = new Array();
var linksList = GM_getValue('magnet');
var Links = new Array();
var typeList = new Array();
if (linksList) Links = linksList.split('^');
var thedomain = document.location.toString();

//////////  script for     www.adslclub.ru/forum   ///////////////////  can be safely removed if you don't plan visiting those sites
if (thedomain.indexOf("www.adslclub.ru/forum")>=0) {
var fileLink = document.getElementById("dclink");
var trgstr ='dclink';
var next = fileLink.nextSibling;
var Text = next.innerHTML;
var url = next.href+'?target=dclink';
var mode;
next.innerHTML='';
var oldFunction = unsafeWindow.AjsGet(trgstr,url,mode);
unsafeWindow.AjsGet = function() {
  var loadingstr="<div class=ajsld><img alt=\"\" title=\"Идёт загрузка...\" align=absmiddle border=0 src=\"images/js-loading.gif\">";
  if(mode==1)
  {
    $(trgstr).innerHTML=loadingstr+"<iframe frameborder=0 scrolling=0 width=0 height=0 src=\""+url+"\"></iframe></div>";
    return true;
  }
  if(trgstr!='')
  {
    $(trgstr).innerHTML=loadingstr+"</div>";
  }
  var link = url;
  var s = document.createElement('script');
  s.setAttribute('type','text/javascript');
  s.src = link;
  document.getElementsByTagName('head')[0].appendChild(s);
return false; }
alert ("Checking Links");
}
////////////////////   End of script    ///////////////////////



///////////////////    Script for www.cn.ru   ////////////////
var selectAllButton = new Array ("www.cn.ru","magneto-seek","magneto-trigger","mg-box");
var boxes=new Array();
var inputs = document.all ? document.all : document.getElementsByTagName('input');
 for (var t = 0; t < inputs.length; t++) {
inputname = inputs[t].name;
if (inputname.indexOf("box-") >=0) boxes.push(inputs[t]); }
////////////////////   End of script    ///////////////////////

var all = document.all ? document.all : document.getElementsByTagName('*');
 for (var e = 0; e < all.length; e++) {
var link=all[e].href;
if (link) {
var itwasafile = 0;
var zeroIndex = link.indexOf("/");
var firstIndex = link.lastIndexOf(".");
var filetype = link.substr(firstIndex+1);
var fileName = link.substring(zeroIndex+1, firstIndex);
if ( fileTypes.length>0) {
for (var t = 0; t<fileTypes.length; t++) {
if (filetype==fileTypes[t]) {
var typeList = GM_getValue(filetype);
if (typeList) {
var files = typeList.split('^');
for (var g = 0; g<files.length; g++) {
if (fileName == files[g]) {all[e].style.color=visitedColor; itwasafile=1;};
}
}
   }
	}
    }
if ((itwasafile == 0) & (enabledTypes.indexOf('http://')>=0)) {
var typeList = GM_getValue('http://');
if (typeList) {
var files = typeList.split('^');
for (var g = 0; g<files.length; g++) {
if (link == files[g]) {all[e].style.color=visitedColor;};
}
}
}
 if (link.indexOf('magnet') == 0) {
checkList.push(all[e]);
 if (Links.length>0) {
for (var i =0; i < Links.length; i++) {
var Index = link.indexOf("&", 0);
var pureLink = link.substring(26, Index-1); 
if (Links[i] == pureLink) {all[e].style.color=visitedColor; all[e].style.opacity = ".40";}
	}
	} 
     }
   }
}

window.addEventListener("click", function(event) {

///////////////////    Script for www.cn.ru   ////////////////
if ((document.activeElement.className=="magneto-seek") & (enabledTypes.indexOf('magnet')>=0)) {
	for (var z = 0; z<boxes.length; z++) {
	if (boxes[z].checked==true) {
checkList[z].style.color=pressedColor;
var linkName = checkList[z].href;
var endIndex = linkName.indexOf("&", 0);
var newLink = linkName.substring(26, endIndex-1);
var found = 0;
var List = GM_getValue('magnet');
if (List) {
var oldLinks = List.split('^');
for ( var h = 0; h<oldLinks.length; h++ ) {
if (oldLinks[h]==newLink) found = 1; }
}
if (found == 0) GM_setValue('magnet',List+'^'+newLink);
	}
    }
}
////////////////////   End of script    ///////////////////////

var linkName = document.activeElement.href;
if (linkName) {
var wasafile = 0;
if (linkName.indexOf("magnet")==0) {
document.activeElement.style.color=pressedColor;
var endIndex = linkName.indexOf("&", 0);
var newLink = linkName.substring(26, endIndex-1);
var found = 0;
var List = GM_getValue('magnet');
if (List) {
var oldLinks = List.split('^');
for ( var h = 0; h<oldLinks.length; h++ ) {
if (oldLinks[h]==newLink) found = 1; }
}
if ((found == 0) && (enabledTypes.indexOf('magnet')>=0)) GM_setValue('magnet',List+'^'+newLink);
wasafile=1;
} else {
var found = 0;
var zeroIndex = linkName.indexOf("/");
var firstIndex = linkName.lastIndexOf(".");
var fileName = linkName.substring(zeroIndex+1, firstIndex);
var filetype = linkName.substr(firstIndex+1);
if ( fileTypes.length>0) {
for (var t = 0; t<fileTypes.length; t++) {
if (filetype==fileTypes[t]) {
wasafile=1;
document.activeElement.style.color=pressedColor;
var fileList = GM_getValue(filetype);
if (fileList) {
var files = fileList.split('^');
for (var g = 0; g<files.length; g++) {
if (fileName == files[g]) {found = 1;}
}
}
   }
	}
    }
if ((found == 0) && (enabledTypes.indexOf(filetype)>=0)) { GM_setValue(filetype, fileList+'^'+fileName); }
} 
var foundurl = 0;
if (wasafile == 0) {
if ((enabledTypes.indexOf('http://')>=0) && (linkName.indexOf('#')<0) && (linkName.indexOf('javascript')<0)) {
document.activeElement.style.color=pressedColor;
var typeList = GM_getValue('http://');
if (!typeList) {typeList='';}
var files = typeList.split('^');
for (var g = 0; g<files.length; g++) {
if (linkName == files[g]) {foundurl = 1;}
}
if (foundurl == 0) {GM_setValue('http://', typeList+'^'+linkName);};
}
}
}
var item = document.activeElement;
var element=item.name;

switch(item.name) {
case 'closewindow':
document.getElementById('dark_div').style.display='none';
document.getElementById('center_div').style.display='none';
break;

case 'typelist':
if (item.options[item.selectedIndex].text.indexOf('[x]')<0) {document.getElementById('disabletype').value=localeString.split(',')[3];} else {document.getElementById('disabletype').value=localeString.split(',')[4];}
break;

case 'disabletype':
var thelist = document.getElementById('typelist');
for (i=0; i<thelist.options.length; i++){
if (thelist.options[i].value==thelist.value) {
var opt = thelist.options[i]; 
var fileType = opt.value;
var fileList = GM_getValue(fileType);
if (!fileList) { fileList = '';}
var files = fileList.split('^');
var num = files.length;
var cachesize = countSize(fileList.length);
var enable=0;
if (files.length<2) {num = 1; cachesize='';}
if (enabledTypes.indexOf(fileType) <0) { enabledTypes = enabledTypes+','+fileType;} else {
enable = '1';
var parts = enabledTypes.split(',');
for (var p=0; p<parts.length; p++) {
if (parts[p]==fileType) {
parts.splice(p,1); enabledTypes=parts.join(',');}
}
}
var estimateLine = changeOption (enabledTypes, num, fileType, cachesize);
thelist.options[i]=new Option(estimateLine+cachesize+' [ '+(num-1)+' ]', thelist.value, false, true);}
}
if (enabledTypes=='') {enabledTypes='none';}
GM_setValue('enabledTypes', enabledTypes);
if (enable==1) {document.getElementById('disabletype').value = localeString.split(',')[4];} else {document.getElementById('disabletype').value = localeString.split(',')[3];}
break;

case 'cleartype': 
var thelist = document.getElementById('typelist');
for (n=0; n<thelist.options.length; n++){
if (thelist.options[n].value==thelist.value) {
var fileType = thelist.options[n].value;
var estimateLine = changeOption (enabledTypes, 1, fileType, '');
thelist.options[n]=new Option(estimateLine+' [ 0 ]', fileType, false, true);
GM_setValue(fileType,''); }
}
break;

case 'removetype':
var thelist = document.getElementById('typelist');
for (r=0; r<thelist.options.length; r++){
if (thelist.options[r].value==thelist.value) {
var fileType = thelist.options[r].value.toString();
thelist.options[r]=null;
GM_deleteValue(fileType);
var parts = enabledTypes.split(',');
for (var p=0; p<parts.length; p++) {
if (parts[p]==fileType) {
parts.splice(p,1); enabledTypes=parts.join(',');
GM_setValue('enabledTypes', enabledTypes);}
}
for (var s=0; s<fileTypes.length; s++) {
if (fileTypes[s]==fileType) {
fileTypes.splice(s,1);
GM_setValue('fileTypes', fileTypes.toString());}
} } }
break;

case 'addtolist':
var box = document.getElementById('newtype');
if (box.value) {
var thelist = document.getElementById('typelist');
var exists = 0;
for (r=0; r<thelist.options.length; r++){
if (thelist.options[r].value==box.value) { exists = 1; }
} 
if (exists == 0) {
enabledTypes=enabledTypes+','+box.value;
GM_setValue('enabledTypes', enabledTypes);
fileTypes.push(box.value);
GM_setValue('fileTypes', fileTypes.toString());
var estimateLine = changeOption (enabledTypes, 1, box.value, '');
thelist.options[thelist.options.length]=new Option(estimateLine+' [ 0 ]', box.value, false, true);
GM_setValue(box.value,''); } }
break;

case 'pressed':
var color = item.style.color.split(',');
document.getElementById('redlist').value=parseInt(color[0].substr(4));
document.getElementById('greenlist').value=parseInt(color[1]);
document.getElementById('bluelist').value=parseInt(color[2].substr(0,color[2].length-1));
pressedButton=item;
break;

case 'visited':
var color = item.style.color.split(',');
document.getElementById('redlist').value=parseInt(color[0].substr(4));
document.getElementById('greenlist').value=parseInt(color[1]);
document.getElementById('bluelist').value=parseInt(color[2].substr(0,color[2].length-1));
pressedButton=item;
break;

case 'redlist':
item.addEventListener("change", function(event) {
var cr = parseInt(document.getElementById('redlist').value);
var cg = parseInt(document.getElementById('greenlist').value);
var cb = parseInt(document.getElementById('bluelist').value);
GM_setValue(pressedButton.name+'Color', cr+','+cg+','+cb);
pressedButton.style.color='rgb('+cr+','+cg+','+cb+')';}, false);
break;

case 'greenlist':
item.addEventListener("change", function(event) {
var cr = parseInt(document.getElementById('redlist').value);
var cg = parseInt(document.getElementById('greenlist').value);
var cb = parseInt(document.getElementById('bluelist').value);
GM_setValue(pressedButton.name+'Color', cr+','+cg+','+cb);
pressedButton.style.color='rgb('+cr+','+cg+','+cb+')';}, false);
break;

case 'bluelist':
item.addEventListener("change", function(event) {
var cr = parseInt(document.getElementById('redlist').value);
var cg = parseInt(document.getElementById('greenlist').value);
var cb = parseInt(document.getElementById('bluelist').value);
GM_setValue(pressedButton.name+'Color', cr+','+cg+','+cb);
pressedButton.style.color='rgb('+cr+','+cg+','+cb+')';}, false);
break;
}
}, false);

var setts=0;

function openSettings() {
if (setts==0) {
var dark = document.createElement('div');
dark.id='dark_div';
dark.setAttribute('style', 'position:fixed; top:0; left:0; background-color:#000000; -moz-opacity:0.8; width:100%; height:100%');
document.body.appendChild(dark)
var box = document.createElement('div');
	box.id = 'center_div';
	box.setAttribute('style', 'position:fixed; top:'+window.innerHeight/2+'px; left:'+window.innerWidth/2+'px; border:2px solid #0083C1; background:#D7F2FF; padding:20px; -moz-border-radius:4px; -moz-opacity:0.96;');
var menuText='<form name=\"settingschart\" style=\"line-height:2.6; font-size:14px; color:rgb(10,90,110)\"><div align=\"center\"><img style=\"position:relative;top:5px; left:-12px\" src=\"http://www.gravatar.com/avatar.php?gravatar_id=ea4e77cd4ba10b243b014be8dfef2fc1&r=PG&s=20&default=identicon\"> '+localeString.split(',')[0]+'<input type=\"button\" name=\"closewindow\" value=\"X\" style=\"position:relative; right:-40px; color:rgb(10,90,110)\"/></div><hr><p>'+localeString.split(',')[1]+' <input style=\"font-size:14px; background-color:rgb(210,240,250);color:rgb(10,90,110); width:50px\" id=\"newtype\" type=text value=\"\"> <input type=\"button\" name=\"addtolist\" value=\"'+localeString.split(',')[2]+'\" style=\"color:rgb(10,90,110);\"/><br><select name=\"typelist\" id=\"typelist\" size=4 style=\"font-family:Courier; font-size:13px; background-color:rgb(210,240,250);color:rgb(10,90,110);\">';
for (var t = 0; t<fileTypes.length; t++) {
var typename = fileTypes[t].split(',');
var fileList = GM_getValue(typename);
if (!fileList) { fileList = '';}
var files = fileList.split('^');
var num = files.length;
var cachesize = countSize(fileList.length);
if (files.length<2) {num = 1; cachesize='';}
var estimateLine = changeOption (enabledTypes, num, typename, cachesize);
var temp = menuText;
menuText=temp+'<option value=\"'+typename+'\">'+estimateLine+cachesize+' [ '+(num-1)+' ]</option>';
}
var color = visited.split(',');
var dropdown ='<option value=\"0\">0</option>';
for (var i=1; i<251; i++) {
var temp = dropdown;
dropdown = temp+'<option value=\"'+i+'\">'+i+'</option>';
}
var temp = menuText; 
menuText=temp+'</select><br><input type=\"button\" name=\"disabletype\" id=\"disabletype\" value=\"'+localeString.split(',')[3]+'\" style=\"color:#ac0000;\"/> <input type=\"button\" name=\"cleartype\" id=\"cleartype\" value=\"'+localeString.split(',')[5]+'\" style=\"color:#ac0000;\"/> <input type=\"button\" name=\"removetype\" value=\"'+localeString.split(',')[6]+'\" style=\"color:rgb(10,90,110)\"/></p><hr><p><input type=\"button\" name=\"pressed\" id=\"pressed\" value=\''+localeString.split(',')[7]+'\' style=\"color:'+pressedColor+'\"/> <input type=\"button\" name=\"visited\" id=\"visited\" value=\''+localeString.split(',')[8]+'\' style=\"color:'+visitedColor+'\"/><br>'+localeString.split(',')[9]+' <select id=\"redlist\" name=\"redlist\" style=\"background-color:rgb(210,240,250);color:rgb(10,90,110); width:50px\">'+dropdown+'</select> '+localeString.split(',')[10]+' <select id=\"greenlist\" name=\"greenlist\" style=\"background-color:rgb(210,240,250);color:rgb(10,90,110); width:50px\">'+dropdown+'</select> '+localeString.split(',')[11]+' <select id=\"bluelist\" name=\"bluelist\" style=\"background-color:rgb(210,240,250);color:rgb(10,90,110); width:50px\">'+dropdown+'</select></p></form>';
document.body.appendChild(box)
box.innerHTML=menuText;
alignCenter('center_div');
window.addEventListener('resize', function(e){alignCenter('center_div')}, false);
setts=1;
} else {
document.getElementById('dark_div').style.display='inline';
document.getElementById('center_div').style.display='inline';
}
}

GM_registerMenuCommand(localeString.split(',')[0], openSettings);

function alignCenter(e) {
var node = (typeof e=='string') ? document.getElementById(e) : ((typeof e=='object') ? e : false);
if(!window || !node || !node.style) {return;}
var style = node.style, beforeDisplay = style.display, beforeOpacity = style.opacity;
if(style.display=='none') style.opacity='0';
if(style.display!='') style.display = '';
style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
style.display = beforeDisplay;
style.opacity = beforeOpacity;
}

function countSize(size) {
if (size>999999) {return Math.round(size/1000000)+'mb';} if (size>999) {return Math.round(size/1000)+'kb';} else {return size+'b';}
}

function changeOption (enabledTypes, num, typename, cachesize) {
if (enabledTypes.indexOf(typename) <0) { typename = '[x]'+typename;}
var shortLine = typename+(num-1)+'_'+cachesize;
var estimateLine ='_';
do {estimateLine = estimateLine + '_';} while (estimateLine.length <(27-shortLine.length));
return (typename+estimateLine);
}
