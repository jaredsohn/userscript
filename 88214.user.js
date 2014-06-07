// ==UserScript==
// @name           The-West Bloco de notas (Notepad) por Nubeloco
// @namespace      www.the-west.com.br
// @description    Adiciona um bloco de notas (NOTEPAD) para o jogo.
// @description    Adiciona um bloco de notas (NOTEPAD) para o jogo.
// @description    Muito obrigado! Visite nosso site http://www.ciagiacomel.info
// @include        http://*.the-west.*/game.php*
// @include        http://*.innogames.*/game.php*
// ==/UserScript==



var world=location.href.replace(/http:\/\/(.{1,6}?)\..*/i, "$1");
var loc=world.replace(/[0-9]*?$/, "");
var lang={};
lang.mainmenu={};
lang.valid={};
switch(loc){
case "cz":
case "sk":
lang.mainmenu.title="Notă";
lang.mainmenu.savednotes="Salvaţi o Nota";
lang.mainmenu.nonotes="Nu este salvata nici o nota.";
lang.mainmenu.nonotes2="Nu a fost nici o nota salvata";
lang.writenew="Adauga nota noua";
lang.edit="Editare nota";
lang.title="Titlu";
lang.text="Text";
lang.save="Salvaţi";
lang.valid.text="Trebuie să completaţi în nota de text";
lang.valid.title="Trebuie să completaţi în legenda de note";
lang.del="Şterge";
lang.edit="Editaţi";
lang.restart_confirm="Sunteţi sigur că doriţi să ştergeţi toate notele?";
lang.name="Comments";
break;
default:
lang.mainmenu.title="Nota";
lang.mainmenu.savednotes="Bloco de notas";
lang.mainmenu.nonotes="Você não salvou nenhuma nota!";
lang.mainmenu.nonotes2="Você não salvou nenhuma nota!";
lang.writenew="Adicionar nova nota";
lang.edit="Editar";
lang.title="Titulo";
lang.text="Texto";
lang.save="Salvar";
lang.valid.text="Você deve inserir um texto!";
lang.valid.title="Você deve digitar um nome!";
lang.del="Apagar";
lang.edit="Editar";
lang.restart_confirm="Você quer apagar todas as notas?";
lang.name="Nota";
break;
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
var xhtml='<div class="window_borders">';xhtml+='<h2 id="window_'+extendeName+'_title" class="window_title" style="background-image:url(http://www.ciagiacomel.info/images/TheWest/script_notas/titulo.png);"><span>'+extendeName+'</span></h2>';xhtml+='<a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a><a href="javascript:AjaxWindow.close(\''+extendeName+'\');" class="window_close"></a>';xhtml+='<div id="window_'+extendeName+'_content" class="window_content">'+data+'<div style="position:absolute;top:10px;right:10px;" id="tw_help_notepad_write_new"><img src="http://www.ciagiacomel.info/images/TheWest/script_notas/novanota.jpg" alt="'+lang.writenew+'" style="cursor: pointer;" id="tw_help_notepad_write_new_img"/></div></div>';xhtml+='</div>';

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

//Header notebook-uri originale - http://tw-help.ic.cz/img/gm_notepad_title.png (deasupra)   (title)
//buton orininal privind posturile mele (sub forma unui comprimat galben) -    http://tw-help.ic.cz/img/gm_notepad.png
// (tw_help_notepad_write_new)   

					
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

function writeNote(){
var data='';
var title="";
var text="";
var window_title=lang.writenew;
if(arguments.length>0){
var uprid=arguments[0];
title=GM_getValue(world+'title_'+uprid);
text=GM_getValue(world+'note_'+uprid);
window_title=lang.edit;
}
data+="<h2 style='text-align:center;'>"+window_title+"</h2><br /><strong>"+lang.title+"</strong><br /><input type='text' id='tw_help_edit_note_title' value='"+title+"' maxlength='20' /><br /><strong>"+lang.text+"</strong><br /><textarea style='width:550px;height:275px;' id='tw_help_edit_note_text'>"+text+"</textarea><br /><button type='button' id='tw_help_edit_note_button'>"+lang.save+"</button>";
if(uprid){
data+="<input type='hidden' value='"+uprid+"' id='tw_help_edit_note_uprid' />";
}
NotepadShow('tw_help_edit_note', data);
unsafeWindow.document.getElementById('tw_help_edit_note_button').addEventListener('click', saveNote, false);
}

function saveNote(){
var edited=unsafeWindow.document.getElementById('tw_help_edit_note_uprid') ? unsafeWindow.document.getElementById('tw_help_edit_note_uprid').value : false;
var id=edited===false ? getFirstId() : edited;
var ids=GM_getValue(world+'notes', false);
var text=unsafeWindow.document.getElementById('tw_help_edit_note_text').value;
var title=unsafeWindow.document.getElementById('tw_help_edit_note_title').value;
if(!text){
alert(lang.valid.text);
return;
}
if(text==="tw-help({restart_notes;});"&&confirm(lang.restart_confirm)){
GM_setValue(world+"notes", false);
unsafeWindow.AjaxWindow.close('tw_help_edit_note');
showNotesTable('tw_help_show_notes');
return;
}
if(!title){
alert(lang.valid.title);
return;
}
if(edited===false){
if(ids===false)
ids=id+"|";
else {
ids=ids.split("|");
ids.push(id);
ids.sort(sortNumber);
ids=ids.join("|");
}
ids=ids.replace(/^\|/, "").replace(/\|$/, "");
GM_setValue(world+"notes", ids);
}
GM_setValue(world+"title_"+id, title);
GM_setValue(world+"note_"+id, text);
unsafeWindow.AjaxWindow.close('tw_help_edit_note');
showNotesTable('tw_help_show_notes');
}

function getFirstId(){
var ids=GM_getValue(world+'notes', false);
if(ids===0 || ids==='0')
ids="nullla";
if(ids==false){
return "0";
}
ids=ids.replace(/nullla/, "0");
ids=ids.split("|");
var old;
for(var i in ids){
if(old||old===0){
if(ids[i]-1!=old)
return ids[i]-1;
}
old=ids[i];
}
return parseInt(ids[i])+1;
}

function sortNumber(a,b){
return a - b;
}

function WriteNewNote(){
writeNote();
}

function editNote(ev){
var id=this.className;
writeNote(id);
}

function deleteNote(){
var id=this.className;
var ids=GM_getValue(world+"notes");
ids=ids.split("|");
var i=0;
while(ids[i]!=id){
i++;
}
ids.splice(i, 1);
GM_setValue(world+"notes", ids.join("|").replace(/\|$/, ""));
showNotesTable('tw_help_show_notes');
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
if(gmv.length>50){               // было 27
gmv=gmv.substr(0,50)+"...";     // было 27
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
del.src="http://www.ciagiacomel.info/images/TheWest/script_notas/Lixeira_Cheia.ico";
del.alt=lang.del;
del.style.cursor="pointer";
del.style.width="25px";
del.style.height="25px";
del.className=s;
del.addEventListener('click', deleteNote, false);
var edit=document.createElement('img');
edit.src="http://www.ciagiacomel.info/images/TheWest/script_notas/Be_Edit.ico";
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
notes_img.src='http://www.ciagiacomel.info/images/TheWest/script_notas/botaotela.jpg';  // 10 Font
//http://shareimage.ro/images/fb2cw3ay0ozm3awxmg60.png - 12 Font
//notes_img.src='http://tw-help.ic.cz/img.php?type=pmenu&value='+lang.name;  - Originala
notes_img.alt=lang.name;
notes_img.style.cursor="pointer";
notes_img.addEventListener("click", openNotepadMainMenu, false);

var m_d=unsafeWindow.document.getElementById('menu_duel');
m_d.parentNode.insertBefore(notes_img, m_d.nextSiblink);