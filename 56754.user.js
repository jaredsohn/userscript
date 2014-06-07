// The West Notepad
// version 2.1.0 relaseCandidat - no compatibility with next versions guaranteed.
// Copyright (C) 2009 The West Help Group <shulik@tw-help.net>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           The West Notepad
// @namespace      www.tw-help.net
// @description    Adds usefull function - notepad.
// @include        http://*.the-west.*/game.php*
// @include        http://*.innogames.*/game.php*
// ==/UserScript==


var supportedbbcodes=['b', 'i', 'u', 's', 'player', 'town', 'fort', 'url'];
var mybbregexp={};
mybbregexp.code=[/\[code\](.*?)\[\/code\]/g, "<div style='white-space:pre;'>$2</div>"];
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };
var world=location.href.replace(/http:\/\/(.{1,6}?)\..*/i, "$1");
var logining=false;
var loc=world.replace(/[0-9]*?$/, "");
var data_uloziste=GM_getValue("uloziste", "ajax");
var max_delka_zpravy=600;
var nlist=new Array();
var lang={};
lang.mainmenu={};
lang.valid={};
lang.login={};
lang.login.error={};
lang.alarm={};
lang.mainmenu.title="Poznámkový blok";
lang.mainmenu.savednotes="Uložené poznámky";
lang.mainmenu.nonotes="Zatím nebyla uložena žádná poznámka.";
lang.writenew="Přidat novou poznámku";
lang.edit="Upravit poznámku";
lang.title="Titulek";
lang.text="Text";
lang.save="Uložit";
lang.valid.text="Musíte vyplnit text poznámky";
lang.valid.title="Musíte vyplnit titulek poznámky";
lang.del="Smazat";
lang.edit="Upravit";
lang.restart_confirm="Opravdu chcete vymazat veškeré poznámky?";
lang.name="Poznámky";
lang.login.ocogo="<h2>Přihlásit se k účtu na <a href='http://tw-help.net'>tw-help.net</a></h2><br />Aby bylo možné přistupovat k poznámkám ze všech počítačů, musí být ukládány na cizí server. Vaše jméno a heslo slouží k identifikaci, že jste to opravdu Vy. Jméno i heslo (NIKOLI K HERNÍMU ÚČTU) stačí zadat jednou, GreaseMonkey si je poté již pamatuje.";
lang.login.nick="Jméno";
lang.login.pwd="Heslo";
lang.login.noacc="Ještě nemáte tw-help účet?";
lang.login.login="Přihlásit";
lang.login.valid="Zadejte, prosím, validní údaje";
lang.login.error.noserver="Nepovedlo se připojit k serveru. Zkuste to, prosím, za chvíli znovu.";
lang.login.error.nouser="Bylo zadáno nesprávné jméno nebo heslo";
lang.login.error.noaktiv="Před použitím musíte účet aktivovat";
lang.login.success="Byl/a jste úspěšně přihlášen/a";
lang.zmuldat="Změnit úložiště dat";
lang.zmuldatal1="Data jsou nyní ukládána na";
lang.localhost="lokální počítač";
lang.foreignserver="cizí server";
lang.chars="znaků";
lang.youvewroten="Již jste napsal/a";
lang.zbyva="a zbývá";
lang.toomuchlong="Poznámka je moc dlouhá, musíme ji zkrátit.";
lang.alarm.ding="Crrrrrrr!\nProdloužit alarm o 10 minut?";
lang.toomuchnotes="Poznámku se nepovedlo uložit, dosáhl/a jste maximálního počtu uložených poznámek. Njěaké, prosím, smažte.";
lang.alarm.switchon="Zapnout alarm";
lang.alarm.when="Za jak dlouho (v sekundách) má alarm zvonit";
lang.valid.alarm="Musíte zadat validní čas, za jak dlouho má zvonit alarm (číselně, v sekundách)";
lang.deletesure="Opravdu chcete smazat poznámku?";
switch(loc){
case "sk":
lang.mainmenu.title="Poznámkový blok";
lang.mainmenu.savednotes="Uložené poznámky";
lang.mainmenu.nonotes="Zatiaľ nebola uložená žiadna poznámka.";
lang.writenew="Pridať novú poznámku";
lang.edit="Upraviť poznámku";
lang.title="Názov";
lang.text="Text";
lang.save="Uložiť";
lang.valid.text="Musíte vyplniť text poznámky";
lang.valid.title="Musíte vyplniť názov poznámky";
lang.del="Zmazať";
lang.edit="Upraviť";
lang.restart_confirm="Naozaj chcete vymazať všetky poznámky?";
lang.name="Poznámky";
lang.mainmenu.title="Poznámkový blok";
lang.mainmenu.savednotes="Uložené poznámky";
lang.mainmenu.nonotes="Zatiaľ nebola uložená žiadna poznámka.";
lang.writenew="Pridať novú poznámku";
lang.edit="Upraviť poznámku";
lang.title="Názov";
lang.text="Text";
lang.save="Uložiť";
lang.valid.text="Musíte vyplniť text poznámky";
lang.valid.title="Musíte vyplniť názov poznámky";
lang.del="Zmazať";
lang.edit="Upraviť";
lang.restart_confirm="Naozaj chcete vymazať všetky poznámky?";
lang.name="Poznámky";
lang.login.ocogo="<h2>Prihlásiť sa k účtu na <a href='http://tw-help.net'>tw-help.net</a></h2><br />Aby bolo možné pristupovať k poznámkám zo všetkých počítačov, musia byť ukladané na cudzí server. Vaše meno a heslo slúži k identifikácii, že ste to naozaj Vy. Meno aj heslo (NIE K HERNÉMU ÚČTU) stačí zadať raz, GreaseMonkey si ich potom už pamätá.";
lang.login.nick="Meno";
lang.login.pwd="Heslo";
lang.login.noacc="Ešte nemáte tw-help účet?";
lang.login.login="Prihlásiť";
lang.login.valid="Zadajte, prosím, správne údaje";
lang.login.error.noserver="Nepodarilo sa pripojiť k serveru. Skúste to, prosím, za chvíľu znovu.";
lang.login.error.nouser="Bolo zadané nesprávne meno alebo heslo";
lang.login.error.noaktiv="Pred použitím musíte účet aktivovať";
lang.login.success="Bol/a ste úspešne prihlásený/á";
lang.zmuldat="Zmeniť úložisko dát";
lang.zmuldatal1="Dáta sú práve ukladané na";
lang.localhost="lokálny počítač";
lang.foreignserver="cudzí server";
lang.chars="znakov";
lang.youvewroten="Už ste napísal/a";
lang.zbyva="a zostáva";
lang.toomuchlong="Poznámka je veľmi dlhá, musíme ju skrátiť.";
lang.alarm.ding="Crrrrrrr!\nPredĺžit alarm o 10 minút?";
lang.toomuchnotes="Poznámku sa nepodarilo uložiť, dosiahol/a ste maximálneho počtu uložených poznámok. Nejaké, prosím, zmažte.";
lang.alarm.switchon="Zapnúť alarm";
lang.alarm.when="Za ako dlho (v sekundách) má alarm zvoniť";
lang.valid.alarm="Musíte zadať validní čas, za ako dlho má zvoniť alarm (číselne, v sekundách)";
lang.deletesure="Naozaj chcete zmazať poznámku?";
break;

break;
case "cz":
break;
case "pt":
lang.mainmenu.title="Bloco de Notas";
lang.mainmenu.savednotes="Notas Salvas";
lang.mainmenu.nonotes="Não tens notas guardadas.";
lang.writenew="Adicionar nova nota";
lang.edit="Editar nota";
lang.title="Título";
lang.text="Texto";
lang.save="Guardar";
lang.valid.text="Tens de preencher o campo \"Texto\" da nota";
lang.valid.title="Tens de preencher o campo \"Título\" da nota";
lang.del="Apagar";
lang.edit="Editar";
lang.restart_confirm="Tens a certeza que queres apagar todas as notas?";
lang.name="Notas";
lang.login.ocogo="<h2>Login na conta em <a href='http://tw-help.net'>tw-help.net</a></h2><br />Para que seja possível ir buscar a informação para cada computador com este script a informação terá de ser guardada num servidor online. O nick e a password ajudarão a verificar se és realmente tu. O nick e a password (NÃO SÃO AS DO JOGO) só são colocados uma vez, o script irá relembrar-se.";
lang.login.nick="Nick";
lang.login.pwd="Password";
lang.login.noacc="Não tens uma conta no tw-help?";
lang.login.login="Log in";
lang.login.valid="Introduz a informação correctamente";
lang.login.error.noserver="Alguma coisa falhou durante a conexão ao servidor. Tenta novamente.";
lang.login.error.nouser="Nick ou Password introduzidos incorrectamente";
lang.login.error.noaktiv="Terás de activar a tua conta antes de a usares";
lang.login.success="Acedeste à tua conta com sucesso";
lang.zmuldat="Change disposal site for notes";
lang.zmuldatal1="As Notas estão agora guardadas em";
lang.localhost="este computador";
lang.foreignserver="servidor externo";
lang.chars="caracteres";
lang.youvewroten="Tu já escreveste";
lang.zbyva="e esquerda";
lang.alarm.ding="DingDangDong!\nTocar o alarme depois de 10 minutos?";
lang.toomuchlong="A Nota é muito grande, tens de a encurtar.";
lang.toomuchnotes="Nós não conseguimos gravar esta nota devido ao limite máximo de notas. Apaga alguma antes de gravares uma nova nota.";
lang.alarm.switchon="Ligar o Alarme";
lang.alarm.when="Depois de quantos tempo deverá o alarme tocar? (em segundos)";
lang.valid.alarm="Introduziste um tempo correcto";
lang.deletesure="Tens a certeza que queres apagar a nota?";
break;
default:
lang.mainmenu.title="Notepad";
lang.mainmenu.savednotes="Saved notes";
lang.mainmenu.nonotes="You haven't saved any notes.";
lang.writenew="Add new note";
lang.edit="Edit note";
lang.title="Title";
lang.text="Text";
lang.save="Save";
lang.valid.text="You have to fill up the text of the note";
lang.valid.title="You have to fill up the title of the note";
lang.del="Delete";
lang.edit="Edit";
lang.restart_confirm="Are you really sure to delete all notes?";
lang.name="Notes";
lang.login.ocogo="<h2>Login to account on <a href='http://tw-help.net'>tw-help.net</a></h2><br />To make it possible to get data from each computer with this script, data must be saved on foreign server. Your nick and password helps to check that it's really You. The nick and password (NOT TO INGAME ACCOUNT!!!) is enough to input just once, GreaseMonkey will remember them then.";
lang.login.nick="Nick";
lang.login.pwd="Password";
lang.login.noacc="Not have tw-help account yet?";
lang.login.login="Log in";
lang.login.valid="Enter valid data, please";
lang.login.error.noserver="Something failed during connecting to server. Try it again in a moment, please.";
lang.login.error.nouser="Wrong nick or password inputed";
lang.login.error.noaktiv="You have to activate Your account before using";
lang.login.success="You've been successfully logged in";
lang.zmuldat="Change disposal site for notes";
lang.zmuldatal1="Notes are now saved to";
lang.localhost="this computer";
lang.foreignserver="foreign server";
lang.chars="characters";
lang.youvewroten="You've already written";
lang.zbyva="and left";
lang.alarm.ding="DingDangDong!\nAlarm again after 10 minutes?";
lang.toomuchlong="Note is too long, we've to cut it down.";
lang.toomuchnotes="We couldn't save this note, becouse You reach the maximum of notes. Please, delete some before saving this one.";
lang.alarm.switchon="Switch alarm on";
lang.alarm.when="After how long should the alarm ring (in seconds)?";
lang.valid.alarm="You have to input a valid form of ringing time";
lang.deletesure="Are You really sure to delete the note?";
break; 
}
var login_name=GM_getValue("nick", false);
var login_pwd=GM_getValue("pwd", false);
var login_id=GM_getValue("pl_id", false);
var savenote_delimiter="";
if(data_uloziste=="ajax" && (!login_name || !login_pwd)){
logining=true;
login();
}
if(data_uloziste=="ajax"){
savenote_delimiter="_";
}
getNotes();


var $=unsafeWindow.$;
var $ES=unsafeWindow.$ES;


function NotepadShow(name, data){
var display="";
if(arguments.length==3)
display=arguments[2];
var extendeName = name;
var params_str='';
if(!unsafeWindow.AjaxWindow.windows[extendeName]){
var xhtml='<div class="window_borders">';xhtml+='<h2 id="window_'+extendeName+'_title" class="window_title" style="background-image:url(http://tw-help.net/img/gm_notepad_title.png);"><span>'+extendeName+'</span></h2>';xhtml+='<a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a><a href="javascript:AjaxWindow.close(\''+extendeName+'\');" class="window_close"></a>';xhtml+='<div id="window_'+extendeName+'_content" class="window_content">'+data+'<div style="position:absolute;top:10px;right:10px;" id="tw_help_notepad_write_new"><img src="http://tw-help.net/img/gm_notepad.png" alt="'+lang.writenew+'" style="cursor: pointer;" id="tw_help_notepad_write_new_img" /></div></div>';xhtml+='</div>';
var window_div=new unsafeWindow.Element('div',{'id':'window_'+extendeName,'class':'window', 'styles':{'display':display}});
window_div.innerHTML=xhtml;
unsafeWindow.AjaxWindow.windows[extendeName]=window_div;
unsafeWindow.AjaxWindow.bringToTop(window_div);
unsafeWindow.AjaxWindow.windows[extendeName]=unsafeWindow.document.getElementById('windows').appendChild(window_div);
unsafeWindow.window_div=window_div;
unsafeWindow.document.getElementById('tw_help_notepad_write_new_img').addEventListener('click', WriteNewNote, false);

window_div=unsafeWindow.document.getElementById(window_div.id);
var window_title_div=unsafeWindow.document.getElementById('window_'+extendeName+'_title');
window_title_div.addEventListener('dblclick',function(){window_div.centerLeft();window_div.setStyle('top',133);}, false);
unsafeWindow.document.getElementById('window_'+extendeName).makeDraggable({handle:window_title_div,onStart:function(){if($ES('.iframe_fixture',window_div).length>0){var el=$ES('.iframe_fixture',window_div);for(i in el){el[i].setStyle('display','block');}}},onComplete:function(){if($ES('.iframe_fixture',window_div).length>0){var el=$ES('.iframe_fixture',window_div);for(var i in el){el[i].setStyle('display','none');}}}});
window_div.addEventListener('mousedown',unsafeWindow.AjaxWindow.bringToTop.bind(this,[window_div]), false);
window_title_div.addEventListener('mousedown',unsafeWindow.AjaxWindow.bringToTop.bind(this,[window_div]), false);
}else{unsafeWindow.AjaxWindow.maximize(extendeName);}
unsafeWindow.AjaxWindow.windows[extendeName].isReady=true;
}



function openNotepadMainMenu(){
var mainmenu='<div style="float:left;"><h3>'+lang.mainmenu.savednotes+':</h3><table class="shadow_table"><tbody><tr><td class="edge_shadow_top_left"/><td class="border_shadow_top"/><td class="edge_shadow_top_right"/></tr><tr><td class="border_shadow_left"/><td class="shadow_content"><div><div style="overflow-y: auto;overflow-x: hidden;height:335px;width:auto;"><table class="table border" id="tw_help_show_notes" style="width:590px;"></table></div></div></td><td class="border_shadow_right"/></tr><tr><td class="edge_shadow_bottom_left"/><td class="border_shadow_bottom"/><td class="edge_shadow_bottom_right"/></tr></tbody></table></div>';
NotepadShow("tw_help_notepad", mainmenu);
/*var del=document.createElement('img');
del.src="http://tw-help.net/img/cross.png";
del.alt=lang.del;
del.style.cursor="pointer";
del.style.width="25px";
del.style.height="25px";
del.style.position='absolute';
del.style.right='15px';
del.style.bottom='8px';
del.addEventListener('click', function(){
var e=document.getElementsByName('tw-help_notepad_notestable_checkbox_note');
if(!e)
return;
for(var i in e){
if(e[i]==undefined || !e[i].checked)
continue;
var d=e[i].previousSibling.previousSibling;
deleteNote('event', d);
}
}, false);*/
showNotesTable('tw_help_show_notes');
//document.getElementById('window_tw_help_notepad_content').appendChild(del);
}

function openNotepadNote(id){
var title=nlist[id].title;
var text="<div style='padding:10px;margin:0px auto;width:420px;border:black 2px double;'><h2 style='text-align:center;'>"+title+"</h2><br /><div id='tw-help_notepad_note_show_"+id+"' style='overflow:auto;height:350px;'></div></div>";
NotepadShow("tw_help_notepad_note", text);
var note=nlist[id].getText(document.getElementById('tw-help_notepad_note_show_'+id));
}

function writeNote(){
var data='';
var title="";
var text="";
var maxlength="";
var alarm="";
var alchecked="";
var window_title=lang.writenew;
if(arguments.length>0){
var uprid=arguments[0];
title=nlist[uprid].title;
text=nlist[uprid].getTextToEdit();
var d=new Date();
alarm=parseInt(nlist[uprid].alarm)>100000 ? ((parseInt(nlist[uprid].alarm)-d.getTime()>0) ? Math.round((parseInt(nlist[uprid].alarm)-d.getTime())/1000)+'': "") :"";
window_title=lang.edit;
if(alarm)
alchecked=" checked='true'";
}
if(data_uloziste=="ajax"){
maxlength=" maxlength='"+max_delka_zpravy+"'";
}
data+="<h2 style='text-align:center;'>"+window_title+"</h2><br /><strong>"+lang.title+"</strong><br /><input type='text' id='tw_help_edit_note_title' value='"+title+"' maxlength='15' /><br /><strong>"+lang.text+"</strong><br /><div id='tw-help_notepad_write_note_bb_codes_bar_container'></div><textarea style='width:350px;height:175px;' id='tw_help_edit_note_text'"+maxlength+">"+text+"</textarea><br />"+lang.alarm.switchon+": <input type='checkbox' id='tw_help_edit_note_alarm_switchon'"+alchecked+" /><br />"+lang.alarm.when+": <input type='text' id='tw_help_edit_note_alarm_when' value='"+alarm+"' /><br /><button type='button' id='tw_help_edit_note_button'>"+lang.save+"</button>";
if(uprid){
data+="<input type='hidden' value='"+uprid+"' id='tw_help_edit_note_uprid' />";
}
NotepadShow('tw_help_edit_note', data);
var BB=new BBCode(document.getElementById('tw_help_edit_note_text'));
var bbbar=BB.bbcbar(supportedbbcodes);
document.getElementById('tw-help_notepad_write_note_bb_codes_bar_container').appendChild(bbbar);
document.getElementById('tw_help_edit_note_button').addEventListener('click', saveNote, false);
if(data_uloziste=="ajax"){
var div=document.createElement("div");
div.innerHTML=lang.youvewroten+" ";
var sp1=document.createElement("strong");
sp1.id="napsano_znaku";
sp1.innerHTML=text.length;
var sp2=document.createElement("strong");
sp2.id="jeste_zbyva";
sp2.innerHTML=max_delka_zpravy - parseInt(text.length);
div.appendChild(sp1);
div.innerHTML+=" "+lang.zbyva+" ";
div.appendChild(sp2);
div.innerHTML+=" "+lang.chars+".";
var el=document.getElementById('tw_help_edit_note_text');
el.parentNode.insertBefore(div, el.nextSibling);
el.addEventListener("keypress", function(){document.getElementById('napsano_znaku').innerHTML=this.value.length;document.getElementById('jeste_zbyva').innerHTML=(max_delka_zpravy - parseInt(this.value.length))+'';if(this.value.length>max_delka_zpravy){alert(lang.toomuchlong);this.value=this.value.substr(0,(max_delka_zpravy));}}, false);
el.addEventListener("change", function(){if(this.value.length>=max_delka_zpravy){alert(lang.toomuchlong);this.value=this.value.substr(0,(max_delka_zpravy));}document.getElementById('napsano_znaku').innerHTML=this.value.length;document.getElementById('jeste_zbyva').innerHTML=(max_delka_zpravy - parseInt(this.value.length))+'';}, false);
}
}

function saveNote(){
var editedxx=unsafeWindow.document.getElementById('tw_help_edit_note_uprid') ? unsafeWindow.document.getElementById('tw_help_edit_note_uprid').value : false;
var textxx=unsafeWindow.document.getElementById('tw_help_edit_note_text').value.replace(/\n/g, "<br />");
var titlexx=unsafeWindow.document.getElementById('tw_help_edit_note_title').value;
var alarmxx=unsafeWindow.document.getElementById('tw_help_edit_note_alarm_switchon').checked ? unsafeWindow.document.getElementById('tw_help_edit_note_alarm_when').value : 1;
//alert(typeof alarmxx);
//alert(alarmxx);
if(!textxx){
alert(lang.valid.text);
return;
}
if(textxx==="tw-help({restart_notes;});"&&confirm(lang.restart_confirm)){
GM_setValue(world+"notes", false);
unsafeWindow.AjaxWindow.close('tw_help_edit_note');
showNotesTable('tw_help_show_notes');
return;
}
if(!titlexx){
alert(lang.valid.title);
return;
}
if(unsafeWindow.document.getElementById('tw_help_edit_note_alarm_switchon').checked && !unsafeWindow.document.getElementById('tw_help_edit_note_alarm_when').value){
alert(lang.valid.alarm);
return;
}
if(isNaN(parseInt(alarmxx))){
alert(lang.valid.alarm);
return;
}
var date=new Date();
if(alarmxx!=1){
alarmxx*=1000;
alarmxx+=date.getTime();
}
//alert(alarmxx+"       "+typeof alarmxx);
if(editedxx===false){
setV("completenote", {title:titlexx, text:textxx, alarm:alarmxx});
showNotesTable('tw_help_show_notes');
}
else {
setV(world+savenote_delimiter+"title_"+editedxx, titlexx);
setV(world+savenote_delimiter+"note_"+editedxx, textxx);
setV(world+savenote_delimiter+"alarm_"+editedxx, alarmxx+'');
}
unsafeWindow.AjaxWindow.close('tw_help_edit_note');
}

function getFirstId(){
var id=0;
for(;nlist[id];id++);
return parseInt(id);
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
var that=arguments.length>1 ? arguments[1] : this;
if(!confirm(lang.deletesure))
return;
var id=that.className;
if(data_uloziste=="ajax"){
GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://tw-help.net/gmnotepad.php?what=deletenote',
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:'nick='+encodeURIComponent(login_name)+'&pwd='+encodeURIComponent(login_pwd)+'&id='+encodeURIComponent(login_id)+'&noteid='+encodeURIComponent(id),
    onload: function(rd) {
    delete nlist[id];
    showNotesTable('tw_help_show_notes');
    GM_log([
      rd.status,
      rd.statusText,
      rd.readyState,
      rd.responseHeaders,
      rd.responseText,
      rd.finalUrl,
      rd.responseXML
    ].join("\n"));
    },
    onerror: function(rd) {
    alert(lang.login.error.noserver+"\n"+rd.status+"   "+rd.statusText);
    showNotesTable('tw_help_show_notes');
    }
});
}
else {
var ids=GM_getValue(world+"notes", "");
//alert(ids);
ids=ids.split("|");
var i=0;
while(ids[i]!=id){
i++;
}
ids.splice(i, 1);
//alert(ids);
GM_setValue(world+"notes", ids.join("|").replace(/\|$/, ""));
delete nlist[id];
showNotesTable('tw_help_show_notes');
}
}

function showNotesTable(update, controls){
if(!controls){
controls=true;
}
var tbody=document.createElement('tbody');
var kont=0;
for(var i in nlist){
var n=nlist[i];
if(typeof n != "object" || !n.text)
continue;
var a=document.createElement('a');
a.href="#";
a.innerHTML=n.title;
a.addEventListener('click', function(){
var idd=this.parentNode.parentNode.id.replace(/tw_help_notepad_note_/, "");
openNotepadNote(idd);return false;
}, false);
var tr=document.createElement('tr');
tr.id='tw_help_notepad_note_'+n.id;
var td1=document.createElement('td');
td1.style.width="180px";
td1.appendChild(a);
var td2=document.createElement('td');
td2.innerHTML=n.getShortText();
td2.style.width="305px";
tr.appendChild(td1);
tr.appendChild(td2);
if(controls){
var td3=document.createElement('td');
td3.style.width="75px";
var del=document.createElement('img');
del.src="http://tw-help.net/img/cross.png";
del.alt=lang.del;
del.style.cursor="pointer";
del.style.width="25px";
del.style.height="25px";
del.className=n.id;
del.addEventListener('click', deleteNote, false);
var edit=document.createElement('img');
edit.src="http://tw-help.net/img/gm_notepad_edit.png";
edit.alt=lang.edit;
edit.style.cursor="pointer";
edit.style.width="25px";
edit.style.height="25px";
edit.className=n.id;
edit.addEventListener('click', editNote, false);
/*var cbx=document.createElement('input');
cbx.name='tw-help_notepad_notestable_checkbox_note';
cbx.type='checkbox';*/
td3.appendChild(del);
td3.appendChild(edit);
//td3.appendChild(cbx);
tr.appendChild(td3);
}
tbody.appendChild(tr);
kont++;
}
if(kont===0){
var tr=document.createElement('tr');
tr.innerHTML="<td>"+lang.mainmenu.nonotes+"</td>";
tbody.appendChild(tr);
}
if(unsafeWindow.document.getElementById(update)){
unsafeWindow.document.getElementById(update).innerHTML='';
unsafeWindow.document.getElementById(update).appendChild(tbody);
}
}

function login(){
var c=document.getElementById("curtain");
c.style.display="block";
var cb=document.getElementById("curtain_box");
cb.innerHTML=lang.login.ocogo+"<br />"+lang.login.nick+":<br /><input type='text' id='tw_help_notepad_login_name' class='input' /><br />"+lang.login.pwd+":<br /><input type='password' id='tw_help_notepad_login_pwd' class='input' /><br /><br /><a href='http://tw-help.net?type=regist'>"+lang.login.noacc+"</a>";
cb.style.position="relative";
cb.style.left="";
cb.style.top="";
cb.style.margin="0px auto";
cb.style.height="320px";
var cbg=document.getElementById("curtain_bg");
cbg.style.position="absolute";
cbg.style.left="0px";
cbg.style.top="0px";
var cbsub=document.createElement("button");
cbsub.type="button";
cbsub.innerHTML=lang.login.login;
cbsub.style.fontSize="14px";
cbsub.style.width="auto";
cbsub.style.height="auto";
cbsub.addEventListener("click", loginuj, false);
cb.insertBefore(cbsub, document.getElementById('tw_help_notepad_login_pwd').nextSibling.nextSibling);
var ci=document.createElement("img");
ci.style.cursor="pointer";
ci.style.position="absolute";
ci.style.top="0px";
ci.style.right="0px";
ci.style.zIndex="50000";
ci.alt="Close";
ci.src="http://tw-help.net/img/cross.png";
ci.addEventListener("click", closeBlockPage, false);
cb.appendChild(ci);
}

function loginuj(){
var nick=encodeURIComponent(document.getElementById('tw_help_notepad_login_name').value);
var pwd=encodeURIComponent(document.getElementById('tw_help_notepad_login_pwd').value);
if(nick==="" || pwd===""){
alert(lang.login.valid);
return;
}
GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://tw-help.net/gmnotepad.php?what=login',
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:'nick='+nick+'&pwd='+pwd,
    onload: function(rd) {
    var r=rd.responseText.replace(/^\s*/, "").replace(/\s*$/, "").split("||");
    if(r[0]=="ERROR"){
    alert(lang.login.error[r[1]]);
    }
    else if(r[0]=="OK"){
    GM_setValue("nick", decodeURIComponent(nick));
    GM_setValue("pwd", decodeURIComponent(pwd));
    GM_setValue("pl_id", r[1]);
    alert(lang.login.success);
    location.reload();
    closeBlockPage();
    }
    else {
    alert(lang.login.error.noserver+r[0]);
    closeBlockPage();
    }
    },
    onerror: function(rd) {
    alert(lang.login.error.noserver+"\n"+rd.status+"   "+rd.statusText);
    closeBlockPage();
    }
});
}

function closeBlockPage(){
document.getElementById('curtain').style.display="none";
}

function zmUlDat(){
if(data_uloziste=="ajax"){
data_uloziste="local";
GM_setValue("uloziste", "local");
alert(lang.zmuldatal1+" "+lang.localhost);
location.reload();
}
else {
data_uloziste="ajax";
GM_setValue("uloziste", "ajax");
alert(lang.zmuldatal1+" "+lang.foreignserver);
location.reload();
}
}

function getV(name, elss){
var els=elss;
var ret=false;
GM_setValue("ret", elss);
if(data_uloziste=="local"){
return GM_getValue(name, els);
}
else {
alert("getted");
re=GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://tw-help.net/gmnotepad.php?what=getdata',
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:'nick='+encodeURIComponent(login_name)+'&pwd='+encodeURIComponent(login_pwd)+'&id='+encodeURIComponent(login_id)+'&search='+encodeURIComponent(name),
    onload: function(rd) {
    var r=rd.responseText.replace(/^ */, "").replace(/ *$/, "").split("|tw-help_oddelovac|");
    GM_log([
      rd.status,
      rd.statusText,
      rd.readyState,
      rd.responseHeaders,
      rd.responseText,
      rd.finalUrl,
      rd.responseXML
    ].join("\n"));
    if(r[0]=="OK"){
    alert("check_responedata: "+r[1]);
    GM_setValue("ret", (r[1]==undefined ? els : r[1]));
    }
    ret=true;
    },
    onerror:function(){
    ret=true;
    }
});
return GM_getValue("ret");
}
}

function setV(what, value){
if(what!="completenote"){
if(data_uloziste=="local"){
GM_setValue(what, value+'');
var id=what.split('_');
var rw=new RegExp(world);
nlist[id[1]][id[0].replace(/note/, "text").replace(rw, "")]=value;
showNotesTable('tw_help_show_notes');
}
else {
GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://tw-help.net/gmnotepad.php?what=setdata',
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:'nick='+encodeURIComponent(login_name)+'&pwd='+encodeURIComponent(login_pwd)+'&id='+encodeURIComponent(login_id)+'&what='+encodeURIComponent(what)+'&value='+encodeURIComponent(value),
    onload: function(rd) {
    rd.responseText=rd.responseText.replace(/^\s*/, "").replace(/\s*$/, "");
    if(rd.responseText!="OK"){
    this.onerror();
    }
    GM_log([
      rd.status,
      rd.statusText,
      rd.readyState,
      rd.responseHeaders,
      rd.responseText,
      rd.finalUrl,
      rd.responseXML
    ].join("\n"));
    if(rd.responseText=="OK"){
    var id=what.split('_');
    nlist[id[2]][id[1].replace(/note/, "text")]=value;
    showNotesTable('tw_help_show_notes');
    }
    },
    onerror:function(){
    alert(lang.login.error.noserver);
    }
});
}
}
else {
var id=getFirstId();
//alert(id);
var title=value.title;
var text=value.text;
var alarm=1;
if(value.alarm)
alarm=value.alarm;
if(data_uloziste=="local"){
var oldids = GM_getValue(world+"notes", "");
oldids+="|"+id;
GM_setValue(world+"title_"+id, title);
//alert(typeof title);
GM_setValue(world+"note_"+id, text);
//alert(typeof text+'text');
GM_setValue(world+"alarm_"+id, alarm+'');
//alert(typeof alarm + 'alarm');
GM_setValue(world+"notes", oldids+'');
//alert(typeof oldids);
nlist[id]=new CNote(id, title, text, null, alarm);
}
else {
re=GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://tw-help.net/gmnotepad.php?what=addcompletenote',
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:'nick='+encodeURIComponent(login_name)+'&pwd='+encodeURIComponent(login_pwd)+'&id='+encodeURIComponent(login_id)+'&title='+encodeURIComponent(title)+'&text='+encodeURIComponent(text)+'&alarm='+encodeURIComponent(alarm)+'&world='+encodeURIComponent(world),
    onload: function(rd) {
    rd.responseText=rd.responseText.replace(/^\s*/, "").replace(/\s*$/, "");
    var r=rd.responseText.split("|tw-help_oddelovac|");
    if(r[0]=="ERROR" && r[1]=="TOOMUCHNOTES"){
    alert(lang.toomuchnotes);
    }
    if(r[0]!="OK"){
    this.onerror();
    }
    else {
    var id=r[1];
    var title=r[2];
    var text=r[3];
    var alarm=r[4];
    var added=r[5];
    /*var d=new Date();
    alert(d.getTime()-alarm);*/
    nlist[id]=new CNote(id, title, text, added, alarm);  
    showNotesTable('tw_help_show_notes');  
    }
    GM_log([
      rd.status,
      rd.statusText,
      rd.readyState,
      rd.responseHeaders,
      rd.responseText,
      rd.finalUrl,
      rd.responseXML
    ].join("\n"));
    },
    onerror:function(){
    alert(lang.login.error.noserver);
    }
});
}
}
}

function CNote(id, title, text){
var added=null;
var alarm=1;
if(arguments.length>3){
added=arguments[3];
if(arguments.length>4){
alarm=parseInt(arguments[4]);
}
}
if(!alarm)
alarm=1;
this.id=id;
this.title=title;
this.text=text;
this.added=added;
this.alarm=alarm;
}
CNote.prototype.checkalarm=function(){
//alert("Checked");
if(this.alarm>10000){
var d=new Date();
if((d.getTime()-5000)<this.alarm && (d.getTime()+5000)>this.alarm)
this.dingdangdong();
}
};
CNote.prototype.dingdangdong=function(){
openNotepadNote(this.id);
if(confirm(lang.alarm.ding)){
var d=new Date();
this.alarm=(d.getTime()+600000);
setV(world+savenote_delimiter+"alarm_"+this.id, this.alarm);
}
};
CNote.prototype.getShortText=function(){
var ret=this.text;
ret=ret.replace(/<br \/>/g, "  ");
if(ret.length>27){
ret=ret.substr(0,27)+"...";
}
return ret;
};
CNote.prototype.getText=function(update){
var ret=this.text;
var h=unsafeWindow.h;
GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://'+location.hostname+'/game.php?window=settings&action=get_parsed_text&h='+h,
    headers:{'Content-type':'application/x-www-form-urlencoded; charset=utf-8', 'X-Requested-With':'XMLHttpRequest', 'Accept':'text/javascript, text/html, application/xml, text/xml, */*'},
    data:"text="+ret,
    onload: function(rd){
    GM_log([
      rd.status,
      rd.statusText,
      rd.readyState,
      rd.responseHeaders,
      rd.responseText,
      rd.finalUrl,
      rd.responseXML
    ].join("\n"));
    var d=JSON.parse(decodeURIComponent(rd.responseText.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\\\//g, "/")));
    //alert(d.parsed_text);
    update.innerHTML=d.parsed_text.replace(mybbregexp.code[0], mybbregexp.code[1]);
    },
    onerror:function(){
    alert(lang.login.error.noserver);
    }
});
};
CNote.prototype.getTextToEdit=function(){
return this.text.replace(/<br \/>/g, "\n");
};



function getNotes(){
if(logining)
return;
if(data_uloziste=="local"){
var nseznam=GM_getValue(world+"notes", false);
if(nseznam){
nseznam=nseznam.split("|");
for(var i in nseznam){
var z=nseznam[i];
if(typeof z == "string" || typeof z == "number"){
var title=GM_getValue(world+"title_"+z);
var text=GM_getValue(world+"note_"+z);
var alarm=GM_getValue(world+"alarm_"+z, 1);
nlist[z]=new CNote(z, title, text, null, alarm);
//alert(nlist[z].alarm);
}
}
}
}
else if(data_uloziste=="ajax"){
GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://tw-help.net/gmnotepad.php?what=getdata',
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:'nick='+encodeURIComponent(login_name)+'&pwd='+encodeURIComponent(login_pwd)+'&id='+encodeURIComponent(login_id)+'&search='+encodeURIComponent(world+"_notes"),
    onload: function(rd) {
    GM_log([
      rd.status,
      rd.statusText,
      rd.readyState,
      rd.responseHeaders,
      rd.responseText,
      rd.finalUrl,
      rd.responseXML
    ].join("\n"));
    var r=rd.responseText.replace(/^ */, "").replace(/ *$/, "").split("|tw-help_oddelovac|");
    if(r[0]=="OK"){
    var nseznam=r[1].split("|");
    for(var i in nseznam){
    var z=nseznam[i];
    if(isNaN(parseInt(z))){
    continue;
    }
    GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://tw-help.net/gmnotepad.php?what=completenote',
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:'nick='+encodeURIComponent(login_name)+'&pwd='+encodeURIComponent(login_pwd)+'&id='+encodeURIComponent(login_id)+'&nid='+encodeURIComponent(z)+'&world='+encodeURIComponent(world),
    onload: function(rd) {
    var r=rd.responseText.replace(/^ */, "").replace(/ *$/, "").split("|tw-help_oddelovac|");
    if(r[0]=="OK"){
    nlist[r[1]]=new CNote(r[1], r[2], r[3], r[5], r[4]);
    //alert(r[4]);
    }
    else {
    this.onerror();
    }
    GM_log([
      rd.status,
      rd.statusText,
      rd.readyState,
      rd.responseHeaders,
      rd.responseText,
      rd.finalUrl,
      rd.responseXML
    ].join("\n"));
    },
    onerror:function(){GM_log([
      rd.status,
      rd.statusText,
      rd.readyState,
      rd.responseHeaders,
      rd.responseText,
      rd.finalUrl,
      rd.responseXML
    ].join("\n"));
    alert(lang.login.error.noserver);
    }
    });  
    }
    }
    else {
    this.onerror();
    }
    },
    onerror:function(){
    alert(lang.login.error.noserver);
    }
});
}
}

function consola(){
var ta=window.document.createElement('textarea');
ta.id='greasemonkey_consola';
ta.style.left="300px";
ta.style.top="15px";
ta.style.position="absolute";
ta.style.zIndex="99999";
ta.addEventListener('keypress', function(ev){
if(ev.ctrlKey && ev.keyCode==13){
eval(this.value);
}
}, false);
window.document.body.appendChild(ta);
}
function startAlarm(){
window.setInterval(function(){alarmer();}, 10000);
}
function alarmer(){
for(var i in nlist){
var n=nlist[i];
if(typeof n == "object"){
//alert("checkuju");
n.checkalarm();
}
}
}

function BBCode(textarea){
this.textarea=textarea;
}
BBCode.prototype.bbcodes={'b':'0px 50%', 'i':'-20px 50%', 'u':'-40px 50%', 's': '-60px 50%', 'player':'-80px 50%', 'town':'-100px 50%', 'fort':'-120px 50%', 'url':'-160px 50%'};
BBCode.prototype.bbcclass='profile_bb_code_image';
BBCode.prototype.getText=function(){this.textarea.focus();if(typeof document.selection!='undefined'){var range=document.selection.createRange();return range.text;}else if(typeof this.textarea.selectionStart!='undefined'){var start=this.textarea.selectionStart;var end=this.textarea.selectionEnd;return this.textarea.value.substring(start,end);}
return null;};
BBCode.prototype.insertText=function(startTag,text,endTag){this.textarea.focus();if(typeof document.selection!='undefined'){var range=document.selection.createRange();range.text=startTag+text+endTag;range=document.selection.createRange();if(insText.length==0){range.move('character',-endTag.length);}else{range.moveStart('character',startTag.length+text.length+endTag.length);}
range.select();}else if(typeof this.textarea.selectionStart!='undefined'){var start=this.textarea.selectionStart;var end=this.textarea.selectionEnd;this.textarea.value=this.textarea.value.substr(0,start)+startTag+text+endTag+this.textarea.value.substr(end);var pos;if(text.length==0){pos=start+startTag.length;}else{pos=start+startTag.length+text.length+endTag.length;}
this.textarea.selectionStart=pos;this.textarea.selectionEnd=pos;}};
BBCode.prototype.addCodeTag=function(tagName){this.insertText('['+tagName+']',this.getText(),'[/'+tagName+']');};
BBCode.prototype.addExtendedCodeTag=function(description,tagName){var input=prompt(description);var text=this.getText();text=(text.length==0?prompt(('ProsĂ­m zadej popisky pro \"%1\" BB-Code.',tagName)):text);this.insertText('['+tagName+'='+input+']',text,'[/'+tagName+']');};
BBCode.prototype.addCallbackCodeTag=function(tagName,callbackFunction){var text=callbackFunction();this.insertText('['+tagName+'='+text+']',this.getText(),'[/'+tagName+']');};
BBCode.prototype.bbcbar=function(bbs){
//alert("asd");
var div=document.createElement('div');
div.style.display='inline';
var that=this;
for(var i in bbs){
var img=document.createElement('img');
img.src='images/transparent.png';
img.alt=bbs[i];
img.style.backgroundPosition=this.bbcodes[bbs[i]];
img.className=this.bbcclass;
if(bbs[i]!='url')
img.addEventListener('click',function(){
that.addCodeTag(this.alt);
}, false);
else
img.addEventListener('click',function(){
that.addExtendedCodeTag('Url:', this.alt);
}, false);
div.appendChild(img);
}
return div;
};


var notes_img=unsafeWindow.document.createElement('img');
notes_img.src='http://tw-help.net/img.php?type=notepadicon&value='+lang.name;
notes_img.alt=lang.name;
notes_img.style.cursor="pointer";
notes_img.addEventListener("click", openNotepadMainMenu, false);

var m_d=unsafeWindow.document.getElementById('menu_duel');
m_d.parentNode.insertBefore(notes_img, m_d.nextSiblink);


GM_registerMenuCommand(lang.zmuldat, zmUlDat);
//unsafeWindow.nlist=nlist;
startAlarm();
/*var f=document.createElement('form');
f.id='tw-help_notepad_bbcodeparse_form';
f.name='text_form';
f.method='post';
f.action='?';
var tx=document.createElement('textarea');
tx.id='tw-help_notepad_bbcodeparse_textarea';
tx.name='text';
//tx.style.display='none';
tx=f.appendChild(tx);
f=unsafeWindow.document.body.appendChild(f);*/
//consola();


/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_77', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_77', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=77&version=2.1.0';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();