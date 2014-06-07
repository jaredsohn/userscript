// ==UserScript==
// @name           Tyra45 test 4
// @namespace      Test
// @description    test
// @include        http://*.the-west.*/game.php*
// @include        http://*.innogames.*/game.php*
// ==/UserScript==

}
var notes=GM_getValue(world+"notes", false);
if(notes){
notes=notes.split("|");
}


function $(B) {
    if (!B) {
        return null;
    }
    if (B.htmlElement) {
        return Garbage.collect(B);
    }
    if ([window, document].contains(B)) {
        return B;
    }
    var A = $type(B);
    if (A == "string") {
        B = document.getElementById(B);
        A = B ? "element" : false;
    }
    if (A != "element") {
        return null;
    }
    if (B.htmlElement) {
        return Garbage.collect(B);
    }
    if (["object", "embed"].contains(B.tagName.toLowerCase())) {
        return B;
    }
    $extend(B, Element.prototype);
    B.htmlElement = function () {};
    return Garbage.collect(B);
}
function $ES(A, B) {
    return ($(B) || document).getElementsBySelector(A);
}
									
function NotepadShow(name, data){
var extendeName = name;
var params_str='';
if(!unsafeWindow.AjaxWindow.windows[extendeName]){
var xhtml='<div class="window_borders">';xhtml+='<h2 id="window_'+extendeName+'_title" class="window_title" style="background-image:url(http://s51.radikal.ru/i132/0908/2a/430ac8db0641.png);"><span>'+extendeName+'</span></h2>';xhtml+='<a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a><a href="javascript:AjaxWindow.close(\''+extendeName+'\');" class="window_close"></a>';xhtml+='<div id="window_'+extendeName+'_content" class="window_content">'+data+'<div style="position:absolute;top:10px;right:10px;" id="tw_help_notepad_write_new"><img src="http://i062.radikal.ru/0909/81/eb2f9e47eac3.png" alt="'+lang.writenew+'" style="cursor: pointer;" id="tw_help_notepad_write_new_img" /></div></div>';xhtml+='</div>';

//Ð¾Ñ€Ð¸Ð³Ð¸Ð½Ð°Ð» Ð—Ð°Ð³Ð¾Ð»Ð¾Ð²ÐºÐ° Ð±Ð»Ð¾ÐºÐ½Ð¾Ñ‚Ð° - http://tw-help.ic.cz/img/gm_notepad_title.png (Ð²Ñ‹ÑˆÐµ)   (title)
//Ð¾Ñ€Ð¸Ð½Ð¸Ð½Ð°Ð» ÐºÐ½Ð¾Ð¿ÐºÐ¸ ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ñ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ (Ð² Ð²Ð¸Ð´Ðµ Ð¶ÐµÐ»Ñ‚Ð¾Ð³Ð¾ Ð¿Ð»Ð°Ð½ÑˆÐµÑ‚Ð°) -    http://tw-help.ic.cz/img/gm_notepad.png
// (tw_help_notepad_write_new)   

var window_div=new unsafeWindow.Element('div',{'id':'window_'+extendeName,'class':'window'});
window_div.innerHTML=xhtml;
unsafeWindow.AjaxWindow.windows[extendeName]=window_div;
unsafeWindow.AjaxWindow.bringToTop(window_div);
unsafeWindow.AjaxWindow.windows[extendeName]=unsafeWindow.document.getElementById('windows').appendChild(window_div);
unsafeWindow.window_div=window_div;
unsafeWindow.document.getElementById('tw_help_notepad_write_new_img').addEventListener('click', WriteNewNote, false);
				      
unsafeWindow.document.getElementById(window_div.id);
var window_title_div=unsafeWindow.document.getElementById('window_'+extendeName+'_title');
window_title_div.addEventListener('dblclick',function(){window_div.centerLeft();window_div.setStyle('top',133);}, false);
unsafeWindow.document.getElementById('window_'+extendeName).makeDraggable({handle:window_title_div,onStart:function(){if($ES('.iframe_fixture',window_div).length>0){var el=$ES('.iframe_fixture',window_div);for(i in el){el[i].setStyle('display','block');}}},onComplete:function(){if($ES('.iframe_fixture',window_div).length>0){var el=$ES('.iframe_fixture',window_div);for(var i in el){el[i].setStyle('display','none');}}}});
window_div.addEventListener('mousedown',unsafeWindow.AjaxWindow.bringToTop.bind(this,[window_div]), false);
window_title_div.addEventListener('mousedown',unsafeWindow.AjaxWindow.bringToTop.bind(this,[window_div]), false);
}else{unsafeWindow.AjaxWindow.maximize(extendeName);}
unsafeWindow.AjaxWindow.windows[extendeName].isReady=true;
}


					
function openNotepadMainMenu(){
var mainmenu='<div style="float:left;"><h3>'+lang.mainmenu.savednotes+':</h3><table class="shadow_table"><tbody><tr><td class="edge_shadow_top_left"/><td class="border_shadow_top"/><td class="edge_shadow_top_right"/></tr><tr><td class="border_shadow_left"/><td class="shadow_content"><div><div style="overflow-y: auto;overflow-x: hidden;height:335px;width:auto;"><table class="table border" id="tw_help_show_notes" style="width:590px;"></table></div></div></td><td class="border_shadow_right"/></tr><tr><td class="edge_shadow_bottom_left"/><td class="border_shadow_bottom"/><td class="edge_shadow_bottom_right"/></tr></tbody></table>';
NotepadShow("tw_help_notepad", mainmenu);
showNotesTable('tw_help_show_notes');
}

function openNotepadNote(id){
var note=GM_getValue(world+"note_"+id).replace(/\n/g, "<br />");
var title=GM_getValue(world+"title_"+id);
var text="<div style='padding:10px;margin:0px auto;width:420px;border:black 2px double;'><h2 style='text-align:center;'>"+title+"</h2><br /><br />"+note+"</div>";
NotepadShow("tw_help_notepad_note", text);
}




function showNotesTable(update, controls){
if(!controls){
controls=true;
}
var tbody=document.createElement('tbody');
var notes=GM_getValue(world+"notes", false);
var z=0;
if(notes||notes===0){
notes=notes.split("|");
}
else{
notes[0]=false;
}
for(z=0;notes[z]||notes[z]===0;z++){
var s=notes[z];
var gmv=GM_getValue(world+'note_'+s).replace(/\n/g, "");
if(gmv.length>50){               // Ð±Ñ‹Ð»Ð¾ 27
gmv=gmv.substr(0,50)+"...";     // Ð±Ñ‹Ð»Ð¾ 27
}
var a=document.createElement('a');
a.href="#";
a.innerHTML=GM_getValue(world+'title_'+s);
a.addEventListener('click', function(){openNotepadNote(s);return false;}, false);
var tr=document.createElement('tr');
tr.id='tw_help_notepad_note_'+s;
var td1=document.createElement('td');
td1.style.width="180px";  
td1.appendChild(a);
var td2=document.createElement('td');
td2.innerHTML=gmv;
td2.style.width="305px";
tr.appendChild(td1);
tr.appendChild(td2);
if(controls){
var td3=document.createElement('td');
td3.style.width="75px";
var del=document.createElement('img');
del.src="http://tw-help.ic.cz/img/cross.png";
del.alt=lang.del;
del.style.cursor="pointer";
del.style.width="25px";
del.style.height="25px";
del.className=s;
del.addEventListener('click', deleteNote, false);
var edit=document.createElement('img');
edit.src="http://tw-help.ic.cz/img/gm_notepad_edit.png";
edit.alt=lang.edit;
edit.style.cursor="pointer";
edit.style.width="25px";
edit.style.height="25px";
edit.className=s;
edit.addEventListener('click', editNote, false);
td3.appendChild(del);
td3.appendChild(edit);
tr.appendChild(td3);
tr.appendChild(td3);
}
tbody.appendChild(tr);
}
if(z===0){
var tr=document.createElement('tr');
tr.innerHTML="<td>"+lang.mainmenu.nonotes+" </td>";
tbody.appendChild(tr);
}
unsafeWindow.document.getElementById(update).innerHTML='';
unsafeWindow.document.getElementById(update).appendChild(tbody);
}


var notes_img=unsafeWindow.document.createElement('img');
notes_img.src='http://s05.radikal.ru/i178/0908/d4/faf6b97b3e29.png';  // 10 ÑˆÑ€Ð¸Ñ„Ñ‚
//http://i079.radikal.ru/0908/58/c4a40b3260ef.png - 12 ÑˆÑ€Ð¸Ñ„Ñ‚
//notes_img.src='http://tw-help.ic.cz/img.php?type=pmenu&value='+lang.name;  - Ð¾Ñ€Ð¸Ð³Ð¸Ð½Ð°Ð»
notes_img.alt=lang.name;
notes_img.style.cursor="pointer";
notes_img.addEventListener("click", openNotepadMainMenu, false);

var m_d=unsafeWindow.document.getElementById('menu_duel');
m_d.parentNode.insertBefore(notes_img, m_d.nextSiblink);
