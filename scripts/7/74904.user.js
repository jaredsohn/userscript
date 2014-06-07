// ==UserScript==
// @name           The West R0
// @namespace      http://userscripts.org/scripts/show/71806
// @description    Script multifunctional
// @description    Toate scripturile necesare incluse doar aici
// @description    Thanks Shulik (By w00w)
// @include        http://*.the-west.*/game.php*
// @include        http://*.innogames.*/game.php*
// ==/UserScript==


//====================================== Notepad ====================================



var world=location.href.replace(/http:\/\/(.{1,6}?)\..*/i, "$1");
var loc=world.replace(/[0-9]*?$/, "");
var lang={};
lang.mainmenu={};
lang.valid={};
switch(loc){
case "cz":
case "sk":
lang.mainmenu.title="NotÄƒ";
lang.mainmenu.savednotes="SalvaÅ£i o Nota";
lang.mainmenu.nonotes="Nu este salvata nici o nota.";
lang.mainmenu.nonotes2="Nu a fost nici o nota salvata";
lang.writenew="Adauga nota noua";
lang.edit="Editare nota";
lang.title="Titlu";
lang.text="Text";
lang.save="SalvaÅ£i";
lang.valid.text="Trebuie sÄƒ completaÅ£i Ã®n nota de text";
lang.valid.title="Trebuie sÄƒ completaÅ£i Ã®n legenda de note";
lang.del="Åžterge";
lang.edit="EditaÅ£i";
lang.restart_confirm="SunteÅ£i sigur cÄƒ doriÅ£i sÄƒ ÅŸtergeÅ£i toate notele?";
lang.name="Comments";
break;
default:
lang.mainmenu.title="Nota";
lang.mainmenu.savednotes="Salveaza nota";
lang.mainmenu.nonotes="Nu aÅ£i salvat nici o nota.";
lang.mainmenu.nonotes2="Nu aÅ£i salvat nici o nota";
lang.writenew="AdÄƒugaÅ£i o notÄƒ nouÄƒ";
lang.edit="Editeaza nota";
lang.title="Titlu";
lang.text="Ð¢ext";
lang.save="Salveaza";
lang.valid.text="Trebuie sÄƒ introduceÅ£i note de tip text";
lang.valid.title="Trebuie sÄƒ introduceÅ£i numele notei";
lang.del="Sterge";
lang.edit="Editeaza";
lang.restart_confirm="DoriÅ£i sÄƒ ÅŸtergeÅ£i toate notele";
lang.name="";
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
var xhtml='<div class="window_borders">';xhtml+='<h2 id="window_'+extendeName+'_title" class="window_title" style="background-image:url(http://shareimage.ro/images/i9kxkodam0jvzsy8zhf.png);"><span>'+extendeName+'</span></h2>';xhtml+='<a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a><a href="javascript:AjaxWindow.close(\''+extendeName+'\');" class="window_close"></a>';xhtml+='<div id="window_'+extendeName+'_content" class="window_content">'+data+'<div style="position:absolute;top:10px;right:10px;" id="tw_help_notepad_write_new"><img src="http://shareimage.ro/images/qsrxeebqduud2gb5vi5c.png" alt="'+lang.writenew+'" style="cursor: pointer;" id="tw_help_notepad_write_new_img"/></div></div>';xhtml+='</div>';

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
notes_img.src='';  // 10 ÑˆÑ€Ð¸Ñ„Ñ‚
//http://shareimage.ro/images/fb2cw3ay0ozm3awxmg60.png - 12 ÑˆÑ€Ð¸Ñ„Ñ‚
//notes_img.src='http://tw-help.ic.cz/img.php?type=pmenu&value='+lang.name;  - Ð¾Ñ€Ð¸Ð³Ð¸Ð½Ð°Ð»
notes_img.alt=lang.name;
notes_img.style.cursor="pointer";
notes_img.addEventListener("click", openNotepadMainMenu, false);

var m_d=unsafeWindow.document.getElementById('menu_duel');
m_d.parentNode.insertBefore(notes_img, m_d.nextSiblink);

//====================================== BB cod & Smiley ====================================



      // http://s03.radikal.ru/i176/0909/6a/4138ab37110a.png - fort
      // http://i064.radikal.ru/0909/ce/7988d649bac4.png  -del

      var TW_Use_Cache  = true;
      var TW_Image_Base = "/graphic/";
      var TW_World      = null;
      var TWT_World     = null;
      var TW_Domain     = null;
      var TW_DotWhat    = null;
      var TW_Hash       = null;
      var TW_Screen     = null;
      var TW_Mode       = null;
      var TW_Is_Premium = false;
      var TW_Quickbar   = null;
      var TW_Village_Id = null;
      var TW_Player_Id  = null;
      var TW_Villages   = null;
      var TW_Lang       = null;
      var TW_Mpt        = null;
      var TW_Is_Opera   = window.opera ? true : false;


      // ======== Hagamos los cambios ========

      (function(){

      	if (location.href.match( /forum\.php/ )) {
      		CambiaForo();
      		return;
      	}

      	if (location.href.match( /messages/ )) {
      		CambiaCuadroTexto();
      		//return;
      	}

      })();

      function CambiaForo() {

      	var adframes = $$("iframe");
      	for (i = 0; i < adframes.length; i++) {
      		adframes[i].src = 'about:blank';
      	}
      	var posts = $$("div");
      	for (i = 0; i < posts.length; i++) {
      		if (posts[i].innerHTML.match(/<iframe/,"gi") != null) {
      			posts[i].style.display = "none";
      		}
      	}

      	CambiaCuadroTexto();
      }

      function CambiaCuadroTexto() {

      	var body = $$("body");

      	var random = new Date;
      	random = random.getTime();

      	var xhtml = "<table class='bbcodearea'> " +
      		    "<tr>    " +
		    '	<td>|</td>' +
      		    '	<td><a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="http://yad.wz.cz/ext/t-w/player.png" alt="Player" /></a></td>' +
      		    '	<td><a tabindex="11" href="javascript:insertBB(\'town\','+random+');"><img src="http://yad.wz.cz/ext/t-w/city.png" alt="Town" /></a></td>' +
      		      '	<td><a tabindex="12" href="javascript:insertBB(\'fort\','+random+');"><img src="http://s03.radikal.ru/i176/0909/6a/4138ab37110a.png" alt="Fort" /></a></td>' +
		    '   <td>|</td>'+
      		    '	<td><a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://yad.wz.cz/ext/t-w/b.png" alt="Bold" /></a></td>' +
      		    '	<td><a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://yad.wz.cz/ext/t-w/i.png" alt="Cursive" /></a></td>' +
      		    '	<td><a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://yad.wz.cz/ext/t-w/u.png" alt="Podciarknute" /></a></td>' +
      		     '	<td><a tabindex="16" href="javascript:insertBB(\'del\','+random+');"><img src="http://i064.radikal.ru/0909/ce/7988d649bac4.png" alt="Del" /></a></td>' +
      		    '	<td>|</td>' +
      		    '	<td><a tabindex="17" href="javascript:insertBB(\'quote\','+random+');"><img src="http://www.offthemap.com/images/site/blockquote.jpg" alt="Cita" /></a></td>' +
      		    '	<td><a tabindex="18" href="javascript:insertBB(\'url\','+random+');"><img src="http://yad.wz.cz/ext/t-w/url.png" alt="URL" /></a></td>' +
      		    '	<td><a tabindex="19" href="javascript:insertBB(\'img\','+random+');"><img src="http://yad.wz.cz/ext/t-w/img.png" alt="Imagen" /></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="20" href="javascript:insertBB(\'large text\','+random+');"><img src="http://forum.tribalwars.net/images/icons/icon14.gif" /></a></td>' +
		    '	<td><a tabindex="21" href="javascript:insertBB(\'small_text\','+random+');"><img src="http://forum.tribalwars.net/images/icons/icon13.gif" /></a></td>' +


'	<td><a tabindex="25" href="javascript:insertBB(\'code\','+random+');"><img src="http://s02.radikal.ru/i175/0909/bb/d4cca2872746.jpg" /></a></td>' +




		    '	<td>|</td>' +
		    '	<td><a tabindex="26" href="javascript:insertBB(\'white text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/white.png" /></a></td>' +
		    '	<td><a tabindex="27" href="javascript:insertBB(\'black text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/black.png" /></a></td>' +
		    '	<td><a tabindex="28" href="javascript:insertBB(\'red text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/red.png" /></a></td>' +
		    '	<td><a tabindex="29" href="javascript:insertBB(\'yellow text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/yellow.png" /></a></td>' +
		    '	<td><a tabindex="30" href="javascript:insertBB(\'green text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/green.png" /></a></td>' +
		    '	<td><a tabindex="31" href="javascript:insertBB(\'cyan text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/cyan.png" /></a></td>' +
		    '	<td><a tabindex="32" href="javascript:insertBB(\'blue text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/blue.png" /></a></td>' +
		    '	<td><a tabindex="33" href="javascript:insertBB(\'violet text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/violet.png" /></a></td>' +
		    '	<td>|</td>' +
      		    "</tr>   " +
		    '	<td>|</td>' +
                    '	<td><a tabindex="34" href="javascript:insertBB(\'smily lol\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif" /></a></td>' +
                    '	<td><a tabindex="35" href="javascript:insertBB(\'smily smile\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif" /></a></td>' +
                    '	<td><a tabindex="36" href="javascript:insertBB(\'smily idea\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif" /></a></td>' +
                    '	<td><a tabindex="37" href="javascript:insertBB(\'smily wink\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif" /></a></td>' +
                    '	<td><a tabindex="38" href="javascript:insertBB(\'smily evil\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif" /></a></td>' +
		    '	<td><a tabindex="39" href="javascript:insertBB(\'smily twisted\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif" /></a></td>' +
                    '	<td><a tabindex="40" href="javascript:insertBB(\'smily eek\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif" /></a></td>' +
                    '	<td><a tabindex="41" href="javascript:insertBB(\'smily surprised\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif" /></a></td>' +
                    '	<td><a tabindex="42" href="javascript:insertBB(\'smily cry\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif" /></a></td>' +
                    '	<td><a tabindex="43" href="javascript:insertBB(\'smily smile2\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif" /></a></td>' +
		    '	<td><a tabindex="44" href="javascript:insertBB(\'smily cool\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif" /></a></td>' +
		    '	<td><a tabindex="45" href="javascript:insertBB(\'smily sad\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif" /></a></td>' +
                    '	<td><a tabindex="46" href="javascript:insertBB(\'smily confused\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif" /></a></td>' +
		    '	<td><a tabindex="47" href="javascript:insertBB(\'smily rolleyes\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif" /></a></td>' +
		    '	<td><a tabindex="48" href="javascript:insertBB(\'smily briggin\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif" /></a></td>' +
		    '	<td><a tabindex="49" href="javascript:insertBB(\'smily redface\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif" /></a></td>' +
		    '	<td><a tabindex="50" href="javascript:insertBB(\'smily razz\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif" /></a></td>' +
		    '	<td><a tabindex="51" href="javascript:insertBB(\'smily neutral\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif" /></a></td>' +
		    '	<td>|</td>' +
		    "</tr>   " +
      		    "</table>";

      	document.body.innerHTML = document.body.innerHTML.replace( /<textarea\s/gi, xhtml+"<textarea id=\"txt_"+random+"\" ");

      	NuevaFuncionTW("insertBB", function(insertType, ident){

      			txt = document.getElementById("txt_"+ident);

      			var start = txt.selectionStart;
      			var end   = txt.selectionEnd;
      			var txtlength = 0;
      			var insertButton = '';
      			var txtinsertBefore = '';
      			var txtinsertAfter = '';
      			var selection = '';
      			var selectionBefore = '';
      			var selectionAfter = '';

      			switch (insertType) {
      				case 'player':
      					txtinsertBefore = "[player]";
      					txtinsertAfter = "[/player]";
      					insertButton = 'P';
      					break;



      				case 'town':
      					txtinsertBefore = "[town]";
      					txtinsertAfter = "[/town]";
      					insertButton = 'A';
      					break;
 				case 'fort':
      					txtinsertBefore = "[fort]";
      					txtinsertAfter = "[/fort]";
      					insertButton = 'F';
      					break;
      				case 'b':
      					txtinsertBefore = "[b]";
      					txtinsertAfter = "[/b]";
      					insertButton = 'B';
      					break;
      				case 'i':
      					txtinsertBefore = "[i]";
      					txtinsertAfter = "[/i]";
      					insertButton = 'I';
      					break;
      				case 'u':
      					txtinsertBefore = "[u]";
      					txtinsertAfter = "[/u]";
      					insertButton = 'U';
      					break;
      				case 'del':
      					txtinsertBefore = "[del]";
      					txtinsertAfter = "[/del]";
      					insertButton = 'del';
      					break;
      				case 'quote':
      					txtinsertBefore = "[quote]";
      					txtinsertAfter = "[/quote]";
      					insertButton = 'Q';
      					break;
      				case 'url':
      					txtinsertBefore = "[url]";
      					txtinsertAfter = "[/url]";
      					insertButton = 'L';
      					break;
      				case 'img':
      					txtinsertBefore = "[img]";
      					txtinsertAfter = "[/img]";
      					insertButton = 'M';
      					break;
				case 'large text':
      					txtinsertBefore = "[size=20]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'R';
      					break;
				case 'small_text':
      					txtinsertBefore = "[size=8]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'Small';
      					break;

      					case 'code':
      					txtinsertBefore = " [b][CODE][/b] [code]";
      					txtinsertAfter = "[/code]";
      					insertButton = 'code';
      					break;



				case 'smily lol':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '1';
      					break;
				case 'smily smile':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '2';
      					break;
				case 'smily idea':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '3';
      					break;
                                case 'smily wink':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '4';
      					break;
				case 'smily evil':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '5';
      					break;
				case 'smily twisted':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '6';
      					break;
                                case 'smily eek':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '7';
      					break;
				case 'smily surprised':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '8';
      					break;
				case 'smily cry':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '9';
      					break;
				case 'smily smile2':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '10';
      					break;
				case 'smily cool':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '11';
      					break;
				case 'smily sad':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '12';
      					break;
				case 'smily confused':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '13';
      					break;
				case 'smily rolleyes':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '14';
      					break;
				case 'smily briggin':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '15';
      					break;
				case 'smily redface':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '16';
      					break;
				case 'smily razz':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '17';
      					break;
				case 'smily neutral':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
				case 'black text':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = '31';
      					break;
				case 'white text':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = '32';
      					break;
				case 'red text':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = '33';
      					break;
				case 'yellow text':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = '34';
      					break;
				case 'green text':
      					txtinsertBefore = "[color=green]";
      					txtinsertAfter = "[/color]";
      					insertButton = '35';
      					break;
				case 'cyan text':
      					txtinsertBefore = "[color=cyan]";
      					txtinsertAfter = "[/color]";
      					insertButton = '36';
      					break;
				case 'blue text':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '37';
      					break;
				case 'violet text':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = '38';
      					break;
      			}

      			if (start == end) {
      					txt.value = txt.value.substr(0, start) + txtinsertBefore + txtinsertAfter + txt.value.substr(end, txt.value.length);
      				} else {
      					txtlength = txt.value.length;
      					selection = txt.value.substr(start, (end - start));
      					selectionBefore = txt.value.substr(0, start);
      					selectionAfter = txt.value.substr(end, txtlength);

      					if (insertButton == 'V' && selection.match(/(\d+){3}([\/|]+){1}(\d+){3}/gi)) {
      						selection = selection.replace(/(.*)(\d+)(\d+)(\d+)([\/|]+){1}(\d+)(\d+)(\d+)(.*)/gi, "$2$3$4|$6$7$8");
      					}

      					txt.value = selectionBefore + txtinsertBefore + selection + txtinsertAfter + selectionAfter;

      				}
      		});


      }


      // ======== Funciones necesarias ========

      // Atajos DOM
      function $(elm_id){
      	return document.getElementById(elm_id);
      }

      function $$(tag_name){
      	return document.getElementsByTagName(tag_name);
      }

      function NuevaFuncionTW(func, new_func){

    	if(typeof unsafeWindow == "object"){
      		unsafeWindow[func] = new_func;
      	}else if(TW_Is_Opera){
      		window[func] = new_func;
      		/*
      		window.opera.defineMagicFunction(
      			func,
      			function(oRealFunc, oThis, oParam1, oParam2){
      				return oParam1.getElementById('oParam2').style;
      			}
      		);
      		*/
      	}
      }


//====================================== Informatii arme====================================

window.addEventListener('load', function()
{
var xor=new Array("conquistador", "sabre", "axe", "machete", "tomahawk");
var almost=new Array("foil", "whips", "spanner", "Screwdriver");
var button=document.createElement('input');
button.type='button';
button.value='Verifica Armele';
$('right_menu').appendChild(button);
button.addEventListener('click', function()
{
if ($('windows').childNodes.length==0) return;
var lastElement=$('windows').childNodes[$('windows').childNodes.length-1]
if(lastElement.id.indexOf('saloon')>-1 || lastElement.id.indexOf('window_ranking')>-1){
var id=lastElement.id;
var xpath=document.evaluate('//td/a[contains(@href, "char_id")]', $(id), null, 6, null);
for (var i=0;i<xpath.snapshotLength;i++){
var pId= /\d+/.exec(xpath.snapshotItem(i).href);
getProfile(pId, xor, almost, xpath.snapshotItem(i));
}

}

},false);

},false);

function $(id){
return document.getElementById(id);
}

function getProfile(id, searchArrayA, searchArrayB, element){
var max=searchArrayA.length>searchArrayB.length?searchArrayA.length:searchArrayB.length;
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "http://" + document.location.hostname + "/game.php?window=profile&char_id=" + id,true);
xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4) {
    var match=xmlhttp.responseText.match(/right_arm\\\\\\\/[\w ]*(?=\.)/);
    match=String(String(match).match(/[\w ]+$/)).toLowerCase();
    for(var i=0;i<max;i++){
		if (i<searchArrayA.length){
			if (match.indexOf(searchArrayA[i].toLowerCase())>-1){
				element.style.color='rgb(232, 16, 0)';
				return;
			}
		}
		if (i<searchArrayB.length){
			if (match.indexOf(searchArrayB[i].toLowerCase())>-1){
				element.style.color='rgb(169, 66, 32)';
				return;
			}
		}
    }
  element.innerHTML += "      - äºž -";
  element.style.color='rgb(8, 0, 169)';
  }
 }
xmlhttp.send(null);
}


//====================================== Bara pt cladiri ====================================

 //#region functions
    function addFooterIcon(mylink, idname)
    {
        footer_menu_left_more = document.getElementById('footer_menu_left_more');
        if (!footer_menu_left_more) { return; }
        var iconlink = document.createElement('a');
        iconlink.setAttribute('href', mylink);
        iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
        footer_menu_left_more.appendChild(iconlink);
    }

    function setToolTip(strObjectName, strToolTipText)
    {
        var insertBeforeElement = document.getElementById('left_top');
        var newScriptElement = document.createElement('script');
        newScriptElement.setAttribute('type', 'text/javascript');
        var myScript = "window.addEvent('domready', function(){ $('" + strObjectName + "').addMousePopup(new MousePopup('" + strToolTipText + "')); });";
        newScriptElement.innerHTML = myScript;
        insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
    }

    function addGlobalStyle(css)
    {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {return;}
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function setOpacity(object, opacity)
    {
        var insertBeforeElement = document.getElementById('left_top');
        var newScriptElement = document.createElement('script');
        newScriptElement.setAttribute('type', 'text/javascript');
        var myScript = "window.addEvent('domready', function(){$('" + object + "').setOpacity(" + opacity + "); });";
        newScriptElement.innerHTML = myScript;
        insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
    }

    var $=unsafeWindow.$;

 //  #endregion

try {
    var footer_menu_left = document.getElementById('menus');

	var xTop = 93;

    if (footer_menu_left)
    {
        toolbarContainer = document.createElement('div');
        toolbarContainer.setAttribute('id', 'toolbarContainer');
        toolbarContainer.setAttribute('style', 'left: 0px; top: ' + xTop + 'px; width: 100%; height: 39px; position: absolute;');
        footer_menu_left.parentNode.insertBefore(toolbarContainer, footer_menu_left.nextSibling);

        center = document.createElement('center');

        footer_menu_left_more = document.createElement('div');
        footer_menu_left_more.setAttribute('id', 'footer_menu_left_more');
        footer_menu_left_more.setAttribute('style', 'background-position: 0px 0px; padding-top: 1px; padding-left: 1px; width: 408px; height: 37px;');

        center.appendChild(footer_menu_left_more);
        toolbarContainer.appendChild(center);

        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_gunsmith');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'fingerboard\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_fingerboard');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'profile\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_profile');

        var values = unsafeWindow.AjaxWindow.possibleValues;

        setToolTip('footer_building_gunsmith',  '<b>' + values["building_gunsmith"]   + '</b>');
        setToolTip('footer_building_tailor',    '<b>' + values["building_tailor"]     + '</b>');
        setToolTip('footer_building_general',   '<b>' + values["building_general"]    + '</b>');
        setToolTip('footer_building_hotel',     '<b>' + values["building_hotel"]      + '</b>');
        setToolTip('footer_building_bank',      '<b>' + values["building_bank"]       + '</b>');
        setToolTip('footer_building_church',    '<b>' + values["building_church"]     + '</b>');
        setToolTip('footer_building_mortician', '<b>' + values["building_mortician"]  + '</b>');
        setToolTip('footer_building_cityhall',  '<b>' + values["building_cityhall"]   + '</b>');
        setToolTip('footer_building_saloon',    '<b>' + values["building_saloon"]     + '</b>');
        setToolTip('footer_fingerboard',    '<b>' + values["fingerboard"]     + '</b>');
        setToolTip('footer_profile',    '<b>' + values["profile"]     + '</b>');
    }

    var imgIcons = 'http://www.bilder-hochladen.net/files/cugu-a.png';

    addGlobalStyle('#abdorment_middle {display:none;}');
    addGlobalStyle('#footer_menu_left_more #footer_building_gunsmith, #footer_menu_left_more #footer_building_tailor,#footer_menu_left_more #footer_building_general,#footer_menu_left_more #footer_building_hotel,#footer_menu_left_more #footer_building_bank,#footer_menu_left_more #footer_building_church,#footer_menu_left_more #footer_building_mortician ,#footer_menu_left_more #footer_building_cityhall,#footer_menu_left_more #footer_building_saloon,#footer_menu_left_more #footer_fingerboard,#footer_menu_left_more #footer_profile {background-image:url(' + imgIcons + '); width:37px; height:37px;}');

    addGlobalStyle('#footer_building_tailor {background-position:-37px 0;}');
    addGlobalStyle('#footer_building_general {background-position:-74px 0;}');
    addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
    addGlobalStyle('#footer_building_mortician {background-position:-148px 0;}');
    addGlobalStyle('#footer_building_bank {background-position:-185px 0;}');
    addGlobalStyle('#footer_building_church {background-position:-222px 0;}');
    addGlobalStyle('#footer_building_hotel {background-position:-259px 0;}');
    addGlobalStyle('#footer_building_cityhall {background-position:-296px 0;}');
    addGlobalStyle('#footer_fingerboard {background-position:-333px 0;}');
    addGlobalStyle('#footer_profile {background-position:-369px 0;}');

    if (unsafeWindow.Character.home_town == null)
    {
        setOpacity('footer_menu_left_more', '0.4');
    }
} catch (err) { }



//====================================== Ajutor misiuni ====================================

var labor_points_text={en:'Labor points',cz:'PracovnÃ­ body',ro:'Puncte de muncÄƒ'};
var difficulty_text  ={en:'Difficulty',cz:'ObtÃ­Å¾nost',ro:'Dificultate'};

var gCount=0;
var gLang='de';


function getJobId(text){
  for (id in unsafeWindow.JobList) {
    aJob = unsafeWindow.JobList[id];
    if (aJob.name==text.substring(0,aJob.name.length))
      return id;
    for (t=0;t<aJob.yields.length;t++)
      if (aJob.yields[t]!==null && aJob.yields[t].name == text.substring(0,aJob.yields[t].name.length))
        return id;
  }
  return -1;
}

function searchForQuestRequirements() {
  if (window.document.getElementById('questFoot')){
    var qReqsTags = unsafeWindow.document.getElementsByTagName('DIV');
    try {
      for (i in qReqsTags) {
        if (qReqsTags[i].id=='questRequirements') {
          if (qReqsTags[i].previousSibling!==null && qReqsTags[i].previousSibling.tagName=='SCRIPT')
            continue;
          req=qReqsTags[i].firstChild;
          while(req.nextSibling && req.nextSibling.tagName=='DIV'){
            req=req.nextSibling;
            job_id=getJobId(req.innerHTML);

            if (job_id == -1) {
              req=req.nextSibling;
              continue;
            }

            var selectedJob=unsafeWindow.JobList[job_id];
            var jobImg='<div style="padding: 2px;"<img src="images/jobs/mini/'+selectedJob.shortName+'.png" alt=""></div>';
            var jobName='<div style="font-weight: bold;">'+selectedJob.name+'</div>';
            var jobPoints=(selectedJob.calcJobPoints(unsafeWindow.Character.bonus_skills)+unsafeWindow.WearSet.getWorkPointAddition(job_id)-selectedJob.malus);
            var playerJobInfo='<div style="padding: 1px; font-size: 10px;">'+labor_points_text[gLang]+': %1'.replace('%1','<strong'+(jobPoints<=0?' style="color:#A00"':'')+'>'+jobPoints+'</strong>')+'<br />'+difficulty_text[gLang]+': %1'.replace('%1','<strong>'+selectedJob.malus+'</strong>')+'</div>';
            var jobYields='<div>';
            for (t=0;t<selectedJob.yields.length;t++) {
              if (selectedJob.yields[t]!==null){
                jobYields+='<div class="popup_yield">';
                jobYields+='<div class="popup_yield_divider"></div>';
                jobYields+='<div class="popup_yield_image"><img src="images/items/yield/mini/'+selectedJob.yields[t].short+'.png" alt="'+selectedJob.yields[t].name+'" /></div>';
                jobYields+=selectedJob.yields[t].name;
               jobYields+='</div>';
             }
            }
            jobYields+='</div>';

            var jobPopup='<div style="text-align:center">'+jobImg+'<div class="popup_yield_divider"></div><div style="padding: 4px; text-align: center;">'+jobName+playerJobInfo+'<div style="font-size: 9px;">'+jobYields+'</div></div></div>';
            var popupScript="ar = new Array();ar.opacity=0.9;newPopup=new MousePopup('"+jobPopup+"',250,ar);$('customPopupId_"+gCount+"').addMousePopup(newPopup);";
            req.setAttribute("id","customPopupId_"+gCount);
            gCount++;
            var insertBeforeElement = qReqsTags[i];
            var newScriptElement = document.createElement('script');
            newScriptElement.setAttribute('type', 'text/javascript');
            newScriptElement.innerHTML = popupScript;
            insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
            req=req.nextSibling;
          }
        }
      }
    } catch(e) {}
  }
  setTimeout(function(){searchForQuestRequirements()},1000);
}

lang = window.location.href.substring(window.location.href.indexOf("//")+2,window.location.href.indexOf("//")+4);
if (labor_points_text[lang]) gLang=lang;
setTimeout(function(){searchForQuestRequirements()},1000);


//====================================== Garderoba ====================================

var wardrobe_text={en:'Wardrobe', ro:'Garderoba', sk:'Å atnÃ­k', cz:'SkrÃ­n'};
var new_name_text={en:'New name', ro:'Nume nou', sk:'NovÃ½ nÃ¡zov', cz:'NovÃ½ nÃ¡zev'};
var cancel_button_text={en:'Cancel', ro:'Anulati', sk:'ZruÅ¡it', cz:'ZruÅ¡it'};
var delete_button_text={en:'Delete', ro:'Sterge', sk:'Zmazat', cz:'Smazat'};
var save_button_text={en:'Save', ro:'Salveaza', sk:'UloÅ¾it', cz:'UloÅ¾it'};
var save_message_text={en:'Wardrobe is saved', ro:'Garderoba este salvata', sk:'Å atnÃ­k bol uloÅ¾enÃ½', cz:'SkrÃ­n byla uloÅ¾ena'};
var confirm_overwrite_text={
	en:'Do you realy want to overwrite wardrobe ',
        ro:'Chiar doriti sa stergeti garderoba ',
	sk:'Naozaj chceÅ¡ prepÃ­sat oblecenie s nÃ¡zvom ',
	cz:'Skutecne chceÅ¡ prepsat oblecenÃ­ pod nÃ¡zvem '
};
var save_choose_name_error_text={
	en:'You must pick "New name" or one existing wardrobe!',
        ro:'Selectati "Nume nou" sau o garderoba deja existenta!',
	sk:'Najprv musÃ­Å¡ vybrat poloÅ¾ku "NovÃ½ nÃ¡zov" alebo uÅ¾ existujÃºcu poloÅ¾ku!',
	cz:'MusÃ­Å¡ nejdrÃ­v vybrat poloÅ¾ku "NovÃ½ nÃ¡zev" nebo uÅ¾ existujÃ­cÃ­ poloÅ¾ku!'
};
var save_invalid_name_error_text={
	en:'Wardrobe name contains invalid characters!',
        ro:'Numele garderobei contine caractere invalide!',
	sk:'NÃ¡zov oblecenia obsahuje neplatnÃ© znaky!',
	cz:'NÃ¡zev oblecenÃ­ obsahuje neplatnÃ© znaky!'
};
var delete_choose_name_error_text={
	en:'You must pick existing wardrobe!',
        ro:'Mai intai alegeti o garderoba care exista!',
	sk:'Najprv musÃ­Å¡ vybrat poloÅ¾ku!',
	cz:'MusÃ­Å¡ nejdrÃ­v vybrat poloÅ¾ku!'
};

var maxRetry=3;
var retryPeriod=300;
var gQueue = [];
var gQueueIndex = 0;
var gQueueTimer = 0;
var gQueueHPChange = [];

var gLocation = window.location.href;
var gArmorInputType = 'drop';
var gInputElement = null;

var menuButtonImg='Qk22JQAAAAAAADYAAAAoAAAAfwAAABkAAAABABgAAAAAAIAlAAAAAAAAAAAAAAAAAAAAAAAAIyw+\nHyg6GCAuFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRok\nFRokFRokFRokFRokGCAuHSM2HSM2GyI0GyI0GyI0HSM2HSM2HSM2HSM2HSM2HSM2GyI0HSM2HSM2\nHSM2GyI0HSM2HSM2GyI0GyI0GyI0HSM2HSM2HSM2HSM2HSM2HSM2GyI0GyI0HSM2HSM2GyI0GyI0\nGyI0HSM2HSM2HSM2HSM2HSM2HSM2GyI0GyI0HSM2HSM2HSM2GyI0GyI0GyI0HSM2HSM2HSM2GyI0\nHSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2GyI0HSM2HSM2HSM2HSM2\nHSM2HSM2HSM2HSM2GR4wGR4wFhwtFhwtGR4wGyAyGh8xGR4wGyAxGyAyGyEzGyAxGyAyGyEzHCEy\nGyAxGh8xGh8xHCE0HCE0Gh8xHCE0GyI0HSM2GyAyGyAyHCE0AAAAIyw+GCAuGCAuGyQ1FRwpFRok\nFRokFRokCg0TCg0TGCAuCg0TGCAuGyQ1FRokJjNKCg0THyk/FRwpHyg6FRwpIi1EIyw+JjNKFRok\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0AAAAIyw+Ii1E3eLh3OHh29/g2t/e2d3erK+vHBgYGxYYExAR\nDwwNKSkpEQ4PFRETGRUWGxcXc3N03ODh3eHi3uLj3uLj3uLjIi1EFRokRmF0KjdJNkpbOk5fKjdJ\nRmF0MUFTIis9Iis9Iis9Iis9Iis9Iis9Iyw+Iis9Iyw+Iis9Iis9Iyw+Iyw+Iis9Iis9Iis9Iis9\nIis9Iyw+Iis9Iyw+Iis9Iis9Iis9Iyw+Iyw+Iis9Iis9Iis9Iis9Iis9Iyw+Iis9Iyw+Iis9ICo8\nIis9Iis9Iyw+Iyw+Iis9Iis9Iis9Iyw+Iyw+Iis9Iis9Iis9Iyw+Iis9ICo8Iis9Iis9Iis9Iyw+\nIis9ICo8Iis9Iis9Iyw+Iis9Iis9Iis9Iyw+Iis9ICo8Iis9Iis9GiAyGiAyGyAxGyAxGyAyGyAy\nGR4wGR4wGB0wFx0vGh8xGh8xGh8xGR4wGR4wGR4wGB0uGh8xGh8xGyAyMUFTRmF0KjdJOk5fNkpb\nKjdJRmF0AAAAIyw+Hyk/3uPi3uLi3OHh29/g2t/eiImIFhQVFRMUFRQVFRQVFRMUFhQVFRQVFBIU\nExETWltc3eHi3+Pk3+Pk3+Pk3+PkGyQ1FRokRmF0Ok5fGyAxHyY4NkpbMUFTHSM2Gh8xGh8xGh8x\nGyAxGiAyGiAyGyAxGyAxGyAyGR4wGB0wFx0vGh8xGh8xGh8xGR4wGR4wGR4wGB0uGh8xGyAzGyAz\nGR4wGB0wFx0vGh8xGh8xGh8xGR4wGR4wGR4wGB0uGh8xGyAzGyAzGyAxGyAxHCE0GyAxGh8xGyAy\nGh8yGR4wGR4wGh8xGh8xGh8xGiAyGiAyGiAzGiAyGh8xGiAyGiAyGiAyGiAzGiAyGh8xGiAyGh8x\nGh8xGh8xGiAyGiAyGiAzFx0vFx0vFx0vGh8xGh8xFx0vFhwtFhwtFx0vGB0wGR4wGh8xGR4wGh8x\nGh8xGh8xGh8xGiAzHCE0GyAzGyAzGyAzHCE0HSM2MUFTNkpbHyY4HCEyOk5fRmF0AAAAIyw+Cg0T\n3uPi3uPi3eLh3OHh2t7eIB8gFhQWFRMVGBYYGBYYGBUXGBYYFxQXFhMWFhQWFxca19vc3+Pk3+Pk\n3+Pk3+PkGCAuFRokRmF0Ok5fGB0uOk5fKjdJGyAxGyAxGR4wGR4wGyAxGyAxGh8xGh8xFx0vFhwt\nFhwtGR4wGh8xGR4wGh8xGh8xGh8xGh8xGiAzHCE0GyAzGyAzGyEzGyAxGR4wGh8xGR4wGh8xGh8x\nGh8xGh8xGiAzHCE0GyAzGyAzGyEzGyAxGyEzGyEzGh8xGR4wGyAxGyAyGyAxGyAxHCEyEhgqFBos\nFhwtFhwtFBosFhwtGiAyGiAyGh8xFhwtFBosFhwtGiAyGiAyGh8xEhgqFBosFhwtFhwtFBosFhwt\nGiAyGiAyGh8xGh8xGR4wFx0vFx0vFx0vGh8xGh8yGR4wFx0vGB0uFx0vGR4wGR4wGR4wGh8xGh8x\nGyAxGh8yGh8yFx0vGyAxGyAyKjdJOk5fGh8xOk5fRmF0AAAAIyw+Cg0T3+Pi3uPi3uPi3eHi3ODg\nNzc4FhQWFhQVGhgZGBYYFxUXGBUYFhQXFhQWFhQWHx8h3+Pk4OTk4OTk3+Pk3+PkJjNKFRokRmF0\nKjdJMUFTHyY4Ok5fGh8yGR4wGyAyGyEzGh8xGyAzGh8xGR4wFx0vFx0vFx0vGR4wFx0vGB0uFx0v\nGR4wGR4wGR4wGh8xGh8xGyAxGh8yGyAxGh8xGR4wGR4wGR4wGR4wGh8xGh8xGyAxGh8yGyAxGh8x\nGyAyGh8xGyAyHCE0Gh8xGh8xGh8xGh8xGh8xGyAxGyAyGh8xGh8yGB4yFhwtFhwtGh8xGB0wGh8y\nGB4yFhwtFhwtGh8xGB0wGyAxGyAyGh8xGh8yGB4yFhwtFhwtGh8xGB0wGh8yGh8yGR4wGh8xGh8x\nGiAyGiAyGh8xGh8xGiAyGyEzGiAzGh8xGR4wGiAyGyEzGiAzGiAyGR4wGh8xGiAyGiAyGR4wGR4w\nGyAyOk5fHyY4MUFTKjdJRmF0AAAAIyw+Cg0T3+Tj3+Tj3uPi3eLi3OHhUFFSFhQWFRMWGRgZGBcY\nFxYXFxYYFxUXFhQXFRQWNDQ23+Pk4OTk4OTk4OTk3+PkGCAuFRokRmF0RmF0Ok5fGh8xGR4wGh8x\nGyAzGyEzHCE0Fx0vGB0uGR4wGh8xGiAyGiAyGh8xGyEzGiAzGh8xGR4wGiAyGyEzGiAzGiAyGR4w\nFx0vFx0vGh8xGh8xGR4wGyAzGyAyGh8xGyAxGyAzGyAyGh8xGh8xGh8xHCEyGyAyGR4wGyAzGyAy\nGyAyHCEyGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGh8xGyAxGyAxGyAxGyAxGyAxGh8xGh8x\nGh8xGh8xGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAxGyAyGh8xGiAyGiA0Gh8xGR4wGh8xGh8x\nGR4wGh8xGiAyGiAyGh8xGh8xGh8xGh8xGh8xGiAyGiAyGh8xGh8xGyAzGh8xGR4wGR4wOk5fRmF0\nRmF0AAAAIyw+Cg0T3+Pj3+Tj3uPj3eLi3eHicHJzFhQWFRMVGhgZGBcYGBYYGBYYFxUYFhQWFRQW\nTU5Q3+Pk4OTk4OTk4OTk3+PkHyg6FRokRmF0KjdJHSM2GyEzGyEzGyAxGyEyGR4wGh8xFhwtGyAz\nGiAyGiAyGh8yGh8yGR4wGR4wGh8xGiAyGiAyGh8xGh8xGR4wGR4wGyAxFhwtFx0vGh8xGyAxHCE0\nGyAzGyAyGyAyHCEyGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAyGB0uFBosFhwtGR4wGyAxHCEy\nGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAyGyAzGyAxGyAz\nHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAyHCE0GyAxGB0uFhwtGyEzGiAyGR4wGh8yGh8xGR4w\nGR4wGiAyGyEzGiAyGiAyGh8xGyEzGiAyGyEyGyAxGyEzHCE0GyI0KjdJRmF0AAAAIyw+Cg0T3+Tj\n3+Tj3+Pj3uLi3eHikpSVFhQWFRMWIR8eGBcYGRcYGBYYHBocFRQXFRQWYGJj3+Pk4OTk4OXk4OTk\n3+PkHyg6GCAuRmF0HCE0Gh8xGh8xGh8xGR4wFhwtFx0vGyAyHCE0GyAzGiAyGiAyGiAyGiAzGiAy\nGiAyGR4wGh8yGh8xGR4wGh8xGyAxGyAxGh8xHCE0HCE0HCE0HCEyGyAxGyAyGB0uFBosFhwtGR4w\nGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAyGyAz\nGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAyGyAyHCEyGyAxGyAxFhwtFx0vGyAyHCE0\nFhwtGyAxGyAzGyEzGR4wHCEyGyAxGyAzFhwtFx0vGR4wGh8xGiAyGiAyGh8xFhwtFBosExkrEhgq\nExkrFBosExkrEhgqExkrFBosHCEyFx0vHis+RmF0AAAAIyw+Cg0T3+Tj3+Tj3+Tj3uPj3uLimp2d\nFRQWFRMWGRgZGRgZGhgZGRcYGBYYFhUXFBMWWFpa3uLj4OTk4OTk4OTk3+PkJjNKHyg6RmF0GyAx\nGR4wGh8xGyAxGyAxGyAxGyAzGyEzGiAyGyAyGyEzGyEzGyEzGiAyGSAyFx0vGR4wGh8xGiAyGiAy\nGh8xGh8xGR4wFx0vGR4wGR4wGyAxGyAyGyAyGyAyHCE0GyAzGyEzGh8xGyAzGyAyGyAyHCEyGh8x\nGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGh8xGyAxGyAxGyAxGyAxGyAxGh8xGh8xGh8xGh8xGyAx\nGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAxGyAyGh8xGh8xHCEyGyAyGR4wGR4wGh8xGyAyGyAyHCEy\nGyAxGyAxGyAzGh8xGyEzGiAzGyEzGyEzGiAyGh8yGh8yGB4yGB4yGB4yGiAyGB4yGB4yGB4yGiAy\nGyAzHCEyGh8yHis+RmF0AAAAIyw+FRok3+Tj3+Tk3+Tj2+DfcXNzQEJIFxUXFxUXGhgaGRgZGRcZ\nGBcYGBcYFxYYFhQXQUJFTlBQztLS4OTk4OTk3+PkPVRmIyw+RmF0GB0uGyAxGyAyGh8xGyAyGh8x\nGyAyGyAyGyAxFhwtGiA0GiAzGiAyGiAyGiAzGyEzGiAzGyEzGyEzGiAyGh8xGyAxHCE0HCE0GyAx\nGyAxGh8xGh8xFhwtFhwtGyAzFx0vGB0uGh8xGyAyGB0uFBosFhwtGR4wGyAxHCEyGyAyGyAzGyAx\nGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAyGyAzGyAxGyAzHCE0GyAyGh8x\nGh8xGR4wGh8xGyAyGyEzGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAxGyAyGh8xGyAyFhwtGiAy\nGiAyGiAyGyAyGyEzGyEyGiAyGiAyGyAzGyAzGyAyGiAyGyAzGyAzGyAyGh8xHCEyGyAxHis+RmF0\nAAAAIyw+PVRm3+Tj4OXk3uLhVFVVFhUXOTtAHBobGBYYGxkaGhkaGRcYGBcYGhgZGBcYGBcZKCgp\nFxUYMTEzw8fG3+Tk3+PkPVRmIyw+RmF0GyAzGR4wGh8xGh8xGyAyGyEzGyEzGyEzGh8xHCE0Fhwt\nFBosFx0vGh8yGyAzGiAyGiAyGiAyGh8xGR4wGR4wGyAxGyAyGyAyGh8xGR4wFx0vGR4wGiAyGyAz\nGR4wGB0uFhwtFhwtFx0vGR4wGh8xGh8xGR4wFx0vGR4wGiAyGyAzGyAzGyAyGyAyGB0uFBosFhwt\nGR4wGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAy\nGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyEzGyAzGyAzGyEzHCE0GyAyGyAyGyEz\nGiA0HCE0HCE0GyAzGR4wGh8xHCE0GyAzGR4wGh8xHCEyFx0vHis+RmF0AAAAIyw+Qlpr4OXk4OXk\ncnR0FhQXFxYYGBcZHx4gGBYYIR8fGhkaGRcYGRcZGxobGBcZGRcZGhkbGBYZFhQYLS4wys3O3+Pk\nQlprIyw+RmF0HCE0ExkrFhwtGiAyGiA0Gh8xFx0vGh8xGyEyFhwtHSM2HCE0HCE0HCE0GyI0GyAz\nGyEzHCE0Gh8xGyAxGyAxGh8xGh8xFhwtGyAxHCE0HCE0GyEzHSM2HSM2GyAxGyAzHCE0GyI0GyEz\nGyAxGh8xGyAxHCE0HCE0GyEzHSM2HSM2HSM2HSM2HSM2GyI0HSM2HSM2HSM2HSM2GyI0GyI0HSM2\nHSM2HSM2HSM2GyI0GyI0GyAxGB0uHSM2HSM2GyI0GyI0GyAxGB0uGyI0HSM2HSM2HSM2HSM2GyI0\nGyI0GyAxGB0uFhwtGiAyGiA0Gh8xGyAzHCE0HSM2GyI0GyI0GyI0HSM2HCE0GyEzGyAyGyAxGyAx\nFhwtGyAyGyAxGyAxGyAyHCEyGyEzHis+RmF0AAAAIyw+Qlpr3+Xkx8vKGBcZFxQXFRQWl5ucUVJT\nGBcZGhgaGxkaGhgaGhgZGhkaGRcZFxYYk5aXQEFDFhUXFhUYZmhp3+PkQlprIyw+RmF0GR4wHCE0\nHCE0GyAyGh8xGh8xGyAxGyAyFhwtHCE0GyAzHSM2HSM2HCE0HCE0HCE0HSM2GyI0Gh8xGh8xGR4w\nFx0vGR4wGiAyGyAzGyAxGyAxGh8xGh8xFhwtFhwtGyAzFx0vGB0uGh8xGyAyGB0uFBosFhwtGR4w\nGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAyGyAz\nGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAx\nGyAyGh8xGyAyGh8xFhwtFhwtFhwtGR4wGyEzHCE0HCE0HCE0HCE0GyAyGyAzGh8xHCE0GyAyGyEy\nHCEyGyAzHis+RmF0AAAAIyw+Qlpr3+TjwcXEFBMVFBIUDw8RtLi5OTk7FxUXGhgaGxkaGRcZGhgZ\nGRgaGBcZFhUYjpCSPD1AEhETExMVWVtc3+PkQlprIyw+RmF0GyI0GyAxGyAyGyAyGh8xGR4wGR4w\nGR4wGyAyFhwtGh8xFBosEhgqFBosExkrGh8xFhwtFhwtGh8xGyAxHCE0HCE0GyEzHSM2HSM2Gh8x\nGR4wFx0vGR4wGiAyGyAzGR4wGB0uFhwtFhwtFx0vGR4wGh8xGh8xGR4wFx0vGR4wGiAyGyAzGyAz\nGyAyGyAyGB0uFBosFhwtGR4wGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0\nGyAyGh8xGh8xGR4wGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyEzGyEzGR4w\nGiAyGh8yGyAyHCE0GyEzGyAzHSM2HSM2HCEyGR4wFhwtHSM2HCEyGyEzHCEyHCE0His+RmF0AAAA\nIyw+Qlpr3+Tj3+TjQkNDExIUERASc3Z3ISEjFhQWGxkaGhgaGRcZGhgaGxobGBcZFhQXUVRWFBMW\nFBIVFxYYsLO03+PkPVRmIyw+RmF0GyEyFhwtFhwtFhwtGR4wGyEzHCE0HCE0HCE0GyI0Gh8xGh8y\nGh8yGyAzHCE0GR4wFx0vGB4yGh8yGyAyHCE0GyEzGyAzHSM2Gh8xGyAxHCE0HCE0GyEzHSM2HSM2\nGyAxGyAzHCE0GyI0GyEzGyAxGh8xGyAxHCE0HCE0GyEzHSM2HSM2HSM2HSM2HSM2GyI0HSM2HSM2\nHSM2HSM2GyI0GyI0HSM2HSM2HSM2HSM2GyI0GyI0GyAxGB0uHSM2HSM2GyI0GyI0GyAxGB0uGyI0\nHSM2HSM2HSM2HSM2GyI0GyI0GyAxGB0uFhwtGiAyGiA0Gh8xGyAyHCEyGyAxGyAxGyEzHCE0Gh8x\nFx0vFx0vGR4wGyI0GyAzGh8xGR4wGyI0HCE0HCEyGyEzHis+RmF0AAAAIyw+Qlpr3+Tj4OXkm56e\nFxYYFRMWFBMVExEUFhQWFxUWFhQVGRcYGhgZGhgaGBcYFhUXEBETEhASFRQXOjs83uLj3+PkPVRm\nIyw+RmF0GyEzFx0vGB4yGh8yGyAyHCE0GyEzGyAzHSM2GyEzGyAxGyAyGyEyGyAyGh8xGyAzGyEz\nGyEyGyAxGyEzHCE0Gh8xFx0vFx0vGh8xGh8xGR4wGyAzGyAyGh8xGyAxGyAzGyAyGh8xGh8xGh8x\nHCEyGyAyGR4wGyAzGyAyGyAyHCEyGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGh8xGyAxGyAx\nGyAxGyAxGyAxGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAxGyAyGh8xGiAy\nGiA0Gh8xGR4wGh8xGyAyGyEzGyEzGyEzGyAxGh8xGh8xGR4wGh8xFhwtFhwtFx0vGh8xHCE0GR4w\nFhwtGh8xHCE0HCE0HCEyGyEzHis+RmF0AAAAIyw+Qlpr3+Tj3+Tj2t/eKSgqFhQXEhETFRMVGRcZ\nGRcYGhgaGhgZGRcZGhgaGRgZFxYZExIVFRQWFxYYj5KS3+Pk3+PkQlprIyw+RmF0KjdJHSM2GyEz\nGyEzGyAxGyEyGh8xFx0vGR4wGyAxGyEzGyEzGh8xGR4wGyAxGyAxHCEyGyAzGh8xGR4wGh8xFhwt\nFhwtFx0vGh8xGyAxHCE0GyAzGyAyGyAyHCEyGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAyGB0u\nFBosFhwtGR4wGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8x\nGR4wGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAyHCE0GyAxGB0uFhwtGiAy\nGiA0Gh8xFx0vGh8xGyEzFhwtFx0vGyAyHCE0HCE0HCE0HCE0HCEyGh8xGh8xGyEyGyAxGyEzHCE0\nGyI0KjdJRmF0AAAAIyw+Qlpr3+Tj3+Tj4OTkf4GBFhQXFhMWFxUXGRgZGRcZHBkbHhwdHhwdGRgZ\nGRgZGRgZFxUYFhUXJiYn1dna3+Pk3+PkQlprIyw+RmF0RmF0Ok5fGh8xGR4wGh8xGyAzFhwtFhwt\nGh8xHCE0GyAyGh8xGyAyHCE0Gh8xGh8xGh8xGR4wFhwtFx0vGyAyHCE0HCE0HCE0HCE0HCEyGyAx\nGyAyGB0uFBosFhwtGR4wGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAy\nGh8xGh8xGR4wGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAyGyAyHCEyGyAx\nGyAxFhwtFx0vGyAyHCE0FhwtGyAxGyAzGyEzGR4wHCEyGyAxGyAzGyAyHCE0HCE0HCE0HCE0HCEy\nGyAxGyAzGyEzGh8xGR4wGR4wGyAxGyAyGh8xGyAxGyAzGh8xGR4wGR4wOk5fRmF0RmF0AAAAIyw+\nQlpr3+Tj3+Tj3+Tjw8fHGhkaGBYYGRcZGBcZHBobHhwdOzo6HxweHRscGRcZGRgZGRgZFxYZaWpr\n3+Pk3+Pk3+PkPVRmIyw+RmF0KjdJMUFTHyY4Ok5fGh8yGR4wGyAxGyAyGyAxGyAxHCE0HCEyGyAx\nGyAzGyAyHCE0HCE0HCEyGyAxGyAzGyEzGh8xGR4wGR4wGyAxGyAyGyAyGyAyHCE0GyAzGyEzGh8x\nGyAzGyAyGyAyHCEyGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGh8xGyAxGyAxGyAxGyAxGyAx\nGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAxGyAyGh8xGh8xHCEyGyAyGR4w\nGR4wGh8xGyAyGyAyHCEyGyAxGyAxGyAzGyEzGR4wGiAyGyAzGyAxGh8xGR4wFx0vGB0uGh8xGyAx\nGyAxGh8xGh8xGh8xGyAxGR4wGyAyOk5fHyY4MUFTKjdJRmF0AAAAIyw+Qlpr3+Tj3+Tj3+Tj3+Tj\nVFVVGhgaGhgaGxkaGhgaQD9A3N7dUVBRGBYYGhgZGxkaGhkaGxocvsLC3+Pk3+Pk3+PkPVRmIyw+\nRmF0Ok5fGB0uOk5fKjdJGyAxGyAxGyAxGh8xGyEzHCEyGyAxGyAxGyAxGyAzGyEzGyAzGyAxGh8x\nGR4wFx0vGB0uGh8xGyAxGyAxGh8xGh8xFhwtFhwtGyAzFx0vGB0uGh8xGyAyGB0uFBosFhwtGR4w\nGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAyGyAz\nGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAx\nGyAyGh8xGyAyGyAyHCEyGyAxGR4wGB0uFhwtFhwtFx0vGR4wGh8xGh8xGR4wFx0vGR4wGR4wGyAy\nGyAxGyAyKjdJOk5fGh8xOk5fRmF0AAAAIyw+PVRm3uPi3+Tj3+Tj3+Tjur29Pj09GxobGxobHhwd\nuLq54+blw8TEIiAhHBocHBocHBscYGFg3+Pk3+Pk3+Pk3+PkOE5cIyw+RmF0Ok5fGyAyHyY4Nkpb\nMUFTHSM2GyAxGyAyHCE0GyEzGh8xGyAyGh8xGyAyGyAyGR4wGB0uFhwtFhwtFx0vGR4wGh8xGh8x\nGR4wFx0vGR4wGiAyGyAzGR4wGB0uFhwtFhwtFx0vGR4wGh8xGh8xGR4wFx0vGR4wGiAyGyAzGyAz\nGyAyGyAyGB0uFBosFhwtGR4wGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0\nGyAyGh8xGh8xGR4wGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyEzGyEzGyAx\nGh8xGyAxGyAzHCE0GyI0GyEzGyAxGh8xGyAxHCE0HCE0GyEzGyEzHCEyHSM2MUFTNkpbHyY4HCEy\nOk5fRmF0AAAAIyw+OE5c3uPi3uPi3+Tj3+Tj3+Tj3uPiq66tQ0NDLy0u2NrY1NfX19nYTEtMJSQl\naGlptLe33+Pk3+Pk3+Pk3+Pk3+PkOE5cIyw+RmF0KjdJNkpbOk5fKjdJRmF0MUFTHSM2HSM2HSM2\nHyY4Gh8xGyAyGyEzGyEzGyEzGyAxGyAzHCE0GyI0GyEzGyAxGh8xGyAxHCE0HCE0GyEzHSM2HSM2\nGyAxGyAzHCE0GyI0GyEzGyAxGh8xGyAxHCE0HCE0GyEzHSM2HSM2HSM2HSM2HSM2GyI0HSM2HSM2\nHSM2HSM2GyI0GyI0HSM2HSM2HSM2HSM2GyI0GyI0GyAxGB0uHSM2HSM2GyI0GyI0GyAxGB0uGyI0\nHSM2HSM2HSM2HSM2GyI0GyI0GyAxGB0uFhwtGiAyGiA0Gh8xFx0vGh8xGyEzGyEyHCE0HCE0Gh8x\nGR4wGh8xGh8xGyAxGR4wGR4wGh8xGyEzGh8xMUFTRmF0KjdJOk5fNkpbKjdJRmF0AAAAIyw+OE5c\nOE5cOE5cQlprQlprQlprPVRmOUx0dDxFVkNMPVRmPVRmQlprQlprQlprQlprQlprQlprQlprPVRm\nOE5cOE5cOE5cIyw+RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0AAAAIyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+\nIyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+\nIyw+ICo8Iyw+Iis9Iy1AIis9ICo8Iyw+Iyw+Iyw+Iy1AIis9ICo8Iy1AIyw+Iis9Iyw+Iis9ICo8\nICo8Iis9Iyw+Iy1AJC0+JC0+Iy1AIyw+Iyw+Iis9Iyw+Iis9ICo8ICo8Iis9Iyw+Iy1AJC0+JC0+\nIy1AIyw+Iyw+Iis9Iis9Iyw+Iis9ICo8ICo8Iis9Iyw+Iyw+ICo8Iyw+Iis9Iy1AIis9ICo8Iyw+\nIyw+Iyw+Iy1AIis9ICo8Iyw+Iyw+Iyw+ICo8Iyw+Iis9Iy1AIis9ICo8Iyw+Iyw+Iyw+GyAyGyAy\nGh8xGR4wGR4wGR4wGyAxGyAyHCE0GyI0HSM2GyAyGyAyHCE0HCE0GyAxGyAxGyAyGR4wFBosEhgq\nHCE0GyI0HSM2GyAyGyAyHCE0AAAA';
var buttonImg='Qk1OFQAAAAAAADYAAAAoAAAARwAAABkAAAABABgAAAAAABgVAAAAAAAAAAAAAAAAAAAAAAAAHCE0\nHCE0GyAyGyAyHCI2HCI1HCE0ExgpFRorGR4wGyAyGyAxGyAxHCE0HCE0GyAyGyAyHCI2HCI1HCE0\nGyAyGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9JC1AGR4wGyAyGyAxGyAxHCE0\nHCE0GyAyGyAyHCI2HCI1HCE0GyAyGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9\nGh8xGyAyGyAyIyw9FRorExgpHCE0HCI1HCI2GyAyGyAyHCE0HCE0AAAAIys9VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0Iys9AAAAIis8VmZ0JzZHOEpfPE9hKjVHR2BzMD9SHCEy\nGh8wGh8wGB0uGR4vGR4vGR4vGh8xGh8xGR8wFx0vGB0wGB4vGB4wGyAyGyAyGiAxGiAxGiAyGiAy\nIis9Iis9ISo8Iis9Iyw9Iys9Gh8wGh8wGB0uGR4vGR4vGR4vGh8xGh8xGR8wFx0vGB0wGB4vGB4w\nGyAyGyAyGiAxGiAxGiAyGiAyIis9Iis9ISo8Iis9Iyw9GiAxGiAyGiAyIis9HCEyMD9SR2BzKjVH\nPE9hOEpfJzZHVmZ0Iis8AAAAIy1AVmZ0OkxdHCEyHiU3NklaM0NWHiM2HCE0GyAzGyAzGyAzGyE0\nGiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8xGiAyGR8xGiAyGiAz\nGiAyGiAyGyAzGyAzGyAzGyE0GiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0v\nGR8xGR8xGiAyGR8xGiAyGiAzGiAyFx0vGR8xGR8xGiAyHCE0HiM2M0NWNklaHiU3HCEyOkxdVmZ0\nIy1AAAAAIyw+VmZ0OlBiGR4vOUxfLDhLGyAxGyAxGB0vGh8yGh8yGiAxGh8wGh8wGR4vGR4vGR4v\nGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosFRstGh8yGh8y\nGiAxGh8wGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAy\nGiAyFhwuFBosFx0vGB4wGR8xGR8xGB0vGyAxGyAxLDhLOUxfGR4vOlBiVmZ0Iyw+AAAAIys9VmZ0\nKjZJMEBRHyc5OExeGyAyGR4wGB4wGiAyGiAyGR8xGB4wGiAyGiAzGyEzGiAyGB4wGR8xGiAzGyEz\nGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAz\nGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGiAy\nGR8xGB4wFx0wGB4wGR4wGyAyOExeHyc5MEBRKjZJVmZ0Iys9AAAAIyw9VmZ0RmF0OExeGh8wGR4v\nGh8wGyAzGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8y\nGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAy\nGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8yGiAyGiAyGiAyGR8x\nGyAzGh8wGR4vGh8wOExeRmF0VmZ0Iyw9AAAAJC0+VmZ0LDlJGyM0GyE0HCEzGyAxGyEyGiAyGyEz\nGR8xGiAyGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8xGiAyGR8xGiAyGiAz\nGiAyGiAyGyAzGyAzGyAzGyE0GiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0v\nGR8xGR8xGiAyGR8xGiAyGiAzGiAyGyAxGR4vGh8xGiAyGiAyGiAyGyE0GiAyGyEyGyAxHCEzGyE0\nGyM0LDlJVmZ0JC0+AAAAJC0+VmZ0His+GB0vHCEyFBosExkrEhgqExkrFBosExkrEhgqGR4vGR4v\nGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosFRstGh8yGh8y\nGiAxGh8wGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAy\nGiAyFhwuFBosGh8wHCE0GyAyGyEzGyEzGyEzGB0uExkrEhgqExkrFBosHCEyGB0vHis+VmZ0JC0+\nAAAAIys9VmZ0His+Gh8yHCEyGyAzGiAyGB4yGB8zGB8zGiAyGB4yGyEzGiAyGB4wGR8xGiAzGyEz\nGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAz\nGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGyAy\nGyAzGyAyGiAyGiAzGiA0GiAxGB8zGB4yGiAyGyAzHCEyGh8yHis+VmZ0Iys9AAAAISs9VmZ0His+\nGiAxHCEyGh8xGyAyGyAzGyAzGiAyGyAyGyAzGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8y\nGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAy\nGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wFxwtGB0uFxwtFhwvFBos\nFhstFxwtGyAzGyAzGyAyGh8xHCEyGiAxHis+VmZ0ISs9AAAAIyw+VmZ0His+GB0vHCEyGh8wGR4w\nGyAzHCE0Gh8wGR4wGyAzGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0w\nGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAzGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8x\nGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGyAyGyAzHCEzHCE1HCE1HCI2GyAyHCE0GyAz\nGR4wGh8wHCEyGB0vHis+VmZ0Iyw+AAAAHyg5VmZ0His+HCEzHCEyGyAyGyAxGyAxGyAyFxwtGyAx\nGyAxGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4w\nGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAy\nGiAyGiAyGiAzGyEzGiAyGB4wGyAyGyAzGyAyHCI3HCI3GyAzGh8wGyAyGyAxGyAxGyAyHCEyHCEz\nHis+VmZ0Hyg5AAAAISo7VmZ0His+GyAzHCEyGyEyGyAyHCE0Gh8wGyAzGyAyHCE0HCE0GyE0HCE0\nGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8xGiAyGR8xGiAyGiAzGiAyGiAy\nGyAzGyAzGyAzGyE0GiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8x\nGiAyGR8xGiAyGiAzGiAyExgqFRosGh8xGyAxGh8wHCE0GyAyGyEyHCEyGyAzHis+VmZ0ISo7AAAA\nJC1AVmZ0His+GyE0HCEyGyEzHCEyHCI3FxwtGR4wHCEyHCI3HCI2GyAzHCEzGR4vGR4vGB0vFx0u\nFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosFRstGh8yGh8yGiAxGh8w\nGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwu\nFBosGR8yGR8yGh8xGh8wFxwtHCI3HCEyGyEzHCEyGyE0His+VmZ0JC1AAAAAIy1AVmZ0His+HCEz\nHCEyHCE0HCI1GR4wGh8wGyAzHCI1GR4wGB0vGB0vGh8xGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8x\nGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAzGyEzGiAy\nGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGyEyGyAyGyAx\nGyAxGh8wGR4wHCI1HCE0HCEyHCEzHis+VmZ0Iy1AAAAAHyc5VmZ0His+HCEzHCEyHCE0HCE1GR8x\nFxwtGR4wHCE1GR8xGB0vFxwuFx0uGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAy\nGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAyGR8xGB4w\nGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGh8xHCEzGyEzGh8wFxwtGR8xHCE1\nHCE0HCEyHCEzHis+VmZ0Hyc5AAAAIys+VmZ0LDlJGyM0GyE0HCEzGyAxGyEyGh8wGh8wHCEyGyE0\nHCE0GyE0GR4wGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAy\nFhwuFBosFRstGh8yGh8yGiAxGh8wGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwv\nFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosGyAyGh8xGyAyGyAyGh8wGyEyGyAxHCEzGyE0GyM0LDlJ\nVmZ0Iys+AAAAIyw/VmZ0RmF0OExeGh8wGR4vGh8wGyAzGyAxGh8wGyAyGiAxGR4vGR4vGyAxGyEz\nGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAy\nGiAyGR8xGB4wGiAyGiAzGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0w\nGR8xFRstFhwuGB4xGyAxHCEyGyE0FxwtGyAxGyAzGh8wGR4vGh8wOExeRmF0VmZ0Iyw/AAAAJC1A\nVmZ0KjZJMEBRHyc5OExeGyAyGR4wGyAxGh8xGh8xGh8xGyAxGyAxGh8wGR8xGR8xGiAyGiAyGR8x\nGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8x\nGR8xGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4w\nGyAxGyAxGyAxGR4vGyAxGR4wGyAyOExeHyc5MEBRKjZJVmZ0JC1AAAAAIy1AVmZ0OlBiGR4vOUxf\nLDhLGyAxGyAxGyAyGR4wGR4wGB0vGR4vGh8wGh8wGR4wFx0vFhstFxwtGB0uGR4vGyAxHCEyGyAy\nGyAyGh8xGyAyGh8wGyAxGyAxGyAxGyAxGyAxGh8wGR4wGR4wGB0vGR4vGh8wGh8wGR4wFx0vFhst\nFxwtGB0uGR4vGyAxHCEyGyAyGyAyGh8xGyAyGh8wGyAxGyAxGyAxGyAxGyAxGh8xGyAyGh8wGyAx\nGyAyGyAxGyAxLDhLOUxfGR4vOlBiVmZ0Iy1AAAAAHyc5VmZ0OkxdHCEyHiU3NklaM0NWHiM2HCEy\nHCEzHCEzHCE0HCE0GyAxGh8wGyAxGyEzHCI1HCE0GyAzGyAxGh8xGyAxHCEzHCEzGyEzGyAyGh8x\nGR4wGh8xGh8wGyAyHCE0GyAzHCEzHCEzHCE0HCE0GyAxGh8wGyAxGyEzHCI1HCE0GyAzGyAxGh8x\nGyAxHCEzHCEzGyEzGyAyGh8xGR4wGh8xGh8wGyAyHCE0GyEzGyAyGh8xGR4wHCEyHiM2M0NWNkla\nHiU3HCEyOkxdVmZ0Hyc5AAAAIys+VmZ0JzZHOEpfPE9hKjVHR2BzMD9SGyAxHCEzGh8xGR4vGR4v\nGyAxGh8wGh8wGR4vGh8xHCE0HCE0GyEyHCEzGh8wGB0vGR8xGyA0GiAyFhssFx0uGiAxGyIzGyIz\nHSM2HSQ2HCEzGh8xGR4vGR4vGyAxGh8wGh8wGR4vGh8xHCE0HCE0GyEyHCEzGh8wGB0vGR8xGyA0\nGiAyFhssFx0uGiAxGyIzGyIzHSM2GyA0GiAyFhssFx0uGyAxMD9SR2BzKjVHPE9hOEpfJzZHVmZ0\nIys+AAAAIyw/VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0Iyw/AAAAHCE0HCE0\nGyAyGyAyHCI2HCI1HCE0ExgpFRorGR4wGyAyGyAxGyAxHCE0HCE0GyAyGyAyHCI2HCI1HCE0GyAy\nGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9JC1AGR4wGyAyGyAxGyAxHCE0HCE0\nGyAyGyAyHCI2HCI1HCE0GyAyGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9Gh8x\nGyAyGyAyIyw9FRorExgpHCE0HCI1HCI2GyAyGyAyHCE0HCE0AAAA';
 //'

var gLang='en';
(function(){
	var pos = gLocation.indexOf("//");
	var lang = gLocation.substring(pos+2, pos+4);
	if (wardrobe_text[lang]) { gLang=lang; }
}());



function isNull(variable)
{
	return (typeof(variable) === "undefined" || variable === null) ? true : false;
}

function trim(str)
{
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

function getServer(loc)
{
	loc = loc.substring(loc.indexOf('//')+2);
	loc = loc.substring(0, loc.indexOf('/'));
	return loc;
}

function insertAfter(newNode, referenceNode) { referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling); }

function hideElement(element) { element.style.display='none'; }

function showElement(element) { element.style.display='block'; }

function toggleElement(element) { if (element.style.display==='none') {showElement(element);} else {hideElement(element);} }

function isElementHidden(element)
{
	return element.style.display !== 'block';
}

function removeElement(el)
{
	el.parentNode.removeChild(el);
}

function getArmorSet(setName)
{
	return GM_getValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName, '');
}

function setArmorSet(setName, value)
{
	GM_setValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName, value);
}

function removeArmorSet(setName)
{
	if (GM_deleteValue) {
		GM_deleteValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName);
	} else {
		GM_setValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName, '');
	}
}

function getListOfSets()
{
	return GM_getValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+':listOfSets', '');
}

function setListOfSets(value)
{
	GM_setValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+':listOfSets', value);
}

   // check validity of set name - must not contain ';'
function isValidSetName(setName)
{
	return (setName.indexOf(';') < 0);
}

function isInList(list, value, delimiter)
{
	if (delimiter === undefined) {
		delimiter = ';';
	}
	var pos = list.indexOf(value);

	if (pos < 0) { return false; }
	// check if value is one whole item, not just part of a item
	if (pos > 0  &&  list[pos - 1] !== delimiter) {
		// non-delimiter before
		return false;
	}
	if (pos + value.length < list.length  &&  list[pos + value.length] !== delimiter) {
		// non-delimiter after
		return false;
	}

	return true;
}


   // select given set name in inventory dropdown
function selectInvDropDown(setName)
{
	if (gArmorInputType !== 'drop' || isNull(gInputElement) || isNull(gInputElement.options)) {
		return false;
	}

	var options = gInputElement.options;
	var i;

	for (i in options) {
		if (options[i].value === setName) {
			options[i].selected = true;
			return true;
		}
	}

	return false;
}

function selectInvDropDownFromMenuDropDown()
{
	var dropDown = document.getElementById('armorset_combobox');
	if (isNull(dropDown)) { return false; }
	var option = dropDown.options[dropDown.selectedIndex];
	return selectInvDropDown(option.value);
}


function changeToTextBox(elem)
{
	gInputElement = document.createElement('input');
	gInputElement.style.width = '123px';
	insertAfter(gInputElement, elem);
	removeElement(elem);
	gInputElement.focus();
	gArmorInputType = 'text';
	var codb = document.getElementById('wardrobe_cancelOrDelete_button');
	if (codb) {
		codb.innerHTML = cancel_button_text[gLang];
	}
}

function invDropDownOnChange(event)
{
	if (this.selectedIndex === this.length - 1) {
		// last, i.e. 'New name' option selected
		changeToTextBox(gInputElement);
	}
}

function createDropInvDropDown()
{
	var list, count, nNewItem, name, pos;

	gInputElement = document.createElement('select');
	gInputElement.style.width = '127px';
	gInputElement.addEventListener('change', invDropDownOnChange, false);

	list = getListOfSets();
	count = 0;
	while (list.length > 0) {
		pos = list.indexOf(';');
		if (pos < 0) {
			name = list;
			list = '';
		} else {
			name = list.substring(0, pos);
			list = list.substring(pos + 1);
		}
		if (name === '') {
			// ignore empty set names for backward compatibility
			continue;
		}
		count++;
		nNewItem = document.createElement('option');
		nNewItem.innerHTML = name;
		gInputElement.appendChild(nNewItem);
	}

	if (count < 1) {
		// empty list - add one empty option
		nNewItem = document.createElement('option');
		nNewItem.innerHTML = '';
		gInputElement.appendChild(nNewItem);
	}

	// add 'New name' option
	nNewItem = document.createElement('option');
	nNewItem.innerHTML = '... ' + new_name_text[gLang] + ' ...';
	gInputElement.appendChild(nNewItem);

	var codb = document.getElementById('wardrobe_cancelOrDelete_button');
	if (codb) {
		codb.innerHTML = delete_button_text[gLang];
	}
}

function changeToDropDown(elem)
{
	createDropInvDropDown();
	insertAfter(gInputElement, elem);
	removeElement(elem);
	gArmorInputType = 'drop';
	gInputElement.focus();
}


function addToQueue(action, hpBonus)
{
	gQueue.push(action);
	gQueueHPChange.push(hpBonus);
}

function sortQueue()
{
  var sortElement =
    function(a,b) {
      return b.hp-a.hp;
    }

  var lQueue = [];
  var i;

  for (i in gQueueHPChange) {
    lQueue[i] = new Object();
    lQueue[i].item = gQueue[i];
    lQueue[i].hp   = gQueueHPChange[i];
  }

  lQueue = lQueue.sort(sortElement);

  // recreate gQueue in new order
  gQueue = [];
  gQueueHPChange = [];

  for (i in lQueue)
    addToQueue(lQueue[i].item, lQueue[i].hp);
}

function isUncarryAction(action)
{
	return ((action === 'head') ||
		(action === 'left_arm') ||
		(action === 'body') ||
		(action === 'right_arm') ||
		(action === 'yield') ||
		(action === 'foot') ||
		(action === 'neck') ||
		(action === 'animal')
	);
}

function executeQueue(retry)
{
	gQueueTimer = 0;

	if (isNull(retry)) { retry=0; }
	if (gQueue.length === 0) {
		// queue finished, select set name in inventory's dropdown
		selectInvDropDownFromMenuDropDown();
		return;
	}
	if (retry >= maxRetry) {
		// retries failed, skipping item
		gQueueIndex++;
		if(gQueueIndex >= gQueue.length) {
			gQueueIndex=0;
			gQueue = [];
			gQueueHPChange = [];
			return;
		}
	}
	if (gQueueIndex >= gQueue.length) {
		// index out of bounds
		gQueueIndex=0;
		gQueue = [];
		gQueueHPChange = [];
		return;
	}

	var ok = false, found, i;
	var items, itemWearing;

	if (isUncarryAction(gQueue[gQueueIndex])){
		ok = unsafeWindow.Wear.uncarry(gQueue[gQueueIndex]);

		found = true;
	} else {
		items = unsafeWindow.Bag.getInstance().items;
		found = false;
		for (i in items) {
			if (items[i].get_short() === gQueue[gQueueIndex]) {
				found = true;
				itemWearing = unsafeWindow.Wear.wear[items[i].get_type()];
				if (!isNull(itemWearing) && itemWearing.get_short() === gQueue[gQueueIndex]) {
					ok = true;
					break;
				}
				ok = unsafeWindow.Bag.getInstance().carry(i);
				break;
			}
		}
	}

	if (found && !ok) {
		// something bad happened, try again
		gQueueTimer = setTimeout(function () {executeQueue(retry+1);}, retryPeriod*(retry+1)*2);
		return;
	}

	// proceed to next item in queue
	gQueueIndex++;
	if (gQueueIndex >= gQueue.length) {
		// queue finished, select set name in inventory's dropdown
		gQueueIndex = 0;
		gQueue = [];
		gQueueHPChange = [];
		selectInvDropDownFromMenuDropDown();
		return;
	}

	gQueueTimer = setTimeout(function () {executeQueue();}, retryPeriod);
}

function getHPBonus(id, isBagItem)
{
  var item = null;

  if(!isBagItem)
    item = unsafeWindow.Wear.get(id);
  else
    var i;
		var items = unsafeWindow.Bag.getInstance().items;
		for (i in items) {
			if (items[i].get_short() === id) {
				item = items[i];
				break;
			}
		}

  if (isNull(item)) return 0;

  var str    = 0;
  var hp     = 0;
  var setStr = 0; // not implemented yet
  var setHP  = 0; // not implemented yet

  try {
    str = item.obj.bonus.attributes.strength;
    if (isNull(str)) str = 0;
  } catch(e) {}

  try {
    hp = item.obj.bonus.skills.health;
    if (isNull(hp)) hp = 0;
  } catch(e) {}

  return str+hp+setStr+setHP;
}

function setArmorHelper(name, wanted, element) {
	if (wanted) {
		if (isNull(element) || element.get_short() !== wanted) {
			addToQueue(wanted, getHPBonus(wanted, true)-getHPBonus(name, false));
		}
	} else {
		if (!isNull(element)) {
			addToQueue(name, 0-getHPBonus(name, false)); // TODO set items needs to affect this line more
		}
	}
}

function setArmor(armorSet) {
	var
    ANIMAL    = 0,
		BODY      = 1,
		FOOT      = 2,
		LEFT_ARM  = 3,
		HEAD      = 4,
		YIELD     = 5,
		RIGHT_ARM = 6,
		NECK      = 7;

	if (document.getElementById('bag')) {
		unsafeWindow.AjaxWindow.maximize('inventory');
	} else {
		unsafeWindow.AjaxWindow.show('inventory');
		setTimeout(function(){addInventoryButtons();}, 100);
		setTimeout(function(){setArmor(armorSet);}, 1000);
		return;
	}

	// clean old queue
	window.clearInterval(gQueueTimer);
	gQueueIndex = 0;
	gQueue = [];
	gQueueHPChange = [];

	var setArray = [];
	setArray = armorSet.split(':');

	//remove wrong clothes and apply right clothes
	setArmorHelper('animal',    setArray[ANIMAL],    unsafeWindow.Wear.wear.animal);
	setArmorHelper('body',      setArray[BODY],      unsafeWindow.Wear.wear.body);
	setArmorHelper('foot',      setArray[FOOT],      unsafeWindow.Wear.wear.foot);
	setArmorHelper('left_arm',  setArray[LEFT_ARM],  unsafeWindow.Wear.wear.left_arm);
	setArmorHelper('head',      setArray[HEAD],      unsafeWindow.Wear.wear.head);
	setArmorHelper('yield',     setArray[YIELD],     unsafeWindow.Wear.wear.yield);
	setArmorHelper('right_arm', setArray[RIGHT_ARM], unsafeWindow.Wear.wear.right_arm);
	setArmorHelper('neck',      setArray[NECK],      unsafeWindow.Wear.wear.neck);

  sortQueue();
	executeQueue();
}

function setArmorOptionOnClick()
{
	var setName = this.value;
	var armorSet = getArmorSet(setName);
	setArmor(armorSet);
}

   // fill options in element (menu_drop_down)
function createOptionsList(element)
{
	var list, name, nNewItem;

	// remove old options
	while (element.options.length > 0) {
		element.options[0] = null;
	}

	list = getListOfSets();
	while (list.length > 0)
	{
		pos = list.indexOf(';');
		if (pos < 0) {
			name = list;
			list = '';
		} else {
			name = list.substring(0, pos);
			list = list.substring(pos + 1);
		}
		if (name === '') {
			// ignore empty set names for backward compatibility
			continue;
		}

		nNewItem = document.createElement('option');
		nNewItem.innerHTML = name;
		nNewItem.addEventListener('click', setArmorOptionOnClick, false);

		element.appendChild(nNewItem);
	}
}

function updateDropdown()
{
	var dropDown = document.getElementById('armorset_combobox');
	createOptionsList(dropDown);
}

   // create right menu button & dropdown
function createDropdown()
{
	var rightmenu = document.getElementById('right_menu');

	var newLI = document.createElement('li');
	newLI.setAttribute('id', 'armorset_li');
	newLI.innerHTML='<a href="#"><img src="data:image/gif;base64,'+menuButtonImg+'" style="z-index:100"/><span style="width: 102px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 13px; position: relative; top: -20px; text-align: center; left: 24px;">'+wardrobe_text[gLang]+'</span></a>';
	rightmenu.appendChild(newLI);

	var newDropDown = document.createElement('select');
	newDropDown.setAttribute('id', 'armorset_combobox');
	newDropDown.style.width = '127px';
	hideElement(newDropDown);

	newLI.addEventListener('click', function(){
		toggleElement(newDropDown);
		if (!isElementHidden(newDropDown)) {
			newDropDown.focus();
		}
	}, false);
	createOptionsList(newDropDown);
	insertAfter(newDropDown, newLI);
}


function saveArmor()
{
	var list = getListOfSets();

	var setName = trim(gInputElement.value);
	if (setName === '') {
		if (gArmorInputType === 'drop') {
			new unsafeWindow.HumanMessage(save_choose_name_error_text[gLang]);
		}
		gInputElement.focus();
		return;
	}
	if (!isValidSetName(setName)) {
		new unsafeWindow.HumanMessage(save_invalid_name_error_text[gLang]);
		gInputElement.focus();
		return;
	}

	var bIsInList = isInList(list, setName);
	if (bIsInList) {
		// confirm overwrite
		if (!confirm(confirm_overwrite_text[gLang] + '"' + setName + '" ?')) {
			gInputElement.focus();
			return;
		}
	}

	var l_animal, l_body, l_foot, l_left_arm, l_head, l_yield, l_right_arm, l_neck;
	l_animal=l_body=l_foot=l_left_arm=l_head=l_yield=l_right_arm=l_neck = '';
	if (!isNull(unsafeWindow.Wear.wear.animal))    { l_animal    = unsafeWindow.Wear.wear.animal.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.body))      { l_body      = unsafeWindow.Wear.wear.body.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.foot))      { l_foot      = unsafeWindow.Wear.wear.foot.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.left_arm))  { l_left_arm  = unsafeWindow.Wear.wear.left_arm.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.head))      { l_head      = unsafeWindow.Wear.wear.head.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.yield))     { l_yield     = unsafeWindow.Wear.wear.yield.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.right_arm)) { l_right_arm = unsafeWindow.Wear.wear.right_arm.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.neck))      { l_neck      = unsafeWindow.Wear.wear.neck.get_short(); }

	setArmorSet(setName, l_animal+':'+l_body+':'+l_foot+':'+l_left_arm+':'+l_head+':'+l_yield+':'+l_right_arm+':'+l_neck);
	if (!bIsInList) {
		if (list === '') {
			list = setName;
		} else {
			list = list + ';' + setName;
		}
		setListOfSets(list);
	}
	new unsafeWindow.HumanMessage(save_message_text[gLang], {type:'success'});

	updateDropdown();
	changeToDropDown(gInputElement);
	selectInvDropDown(setName);
}

function removeArmor()
{
	if (gArmorInputType === 'text') {
		// cancel adding of new set
		changeToDropDown(gInputElement);
		return;
	}
	// remove existing set
	var setName = gInputElement.value;

	if (setName === '') {
		new unsafeWindow.HumanMessage(delete_choose_name_error_text[gLang]);
		gInputElement.focus();
		return;
	}
	// remove existing set
	if (!confirm(confirm_overwrite_text[gLang] + '"' + setName + '" ?')) {
		gInputElement.focus();
		return;
	}
	removeArmorSet(setName);
	var list = getListOfSets();
	list = list.split(';');
	var newList = '', i;
	for (i in list) {
		if (list[i] !== setName && list[i] !== '') {
			if (newList === '') {
				newList = list[i];
			} else {
				newList = newList + ';' + list[i];
			}
		}
	}
	setListOfSets(newList);

	updateDropdown();
	changeToDropDown(gInputElement);
}


function addInventoryButtons()
{
	var invTargetPos = null;

	// check if inventory window is fully loaded
	invTargetPos = document.getElementById('bag');
	if (!unsafeWindow.AjaxWindow.windows['inventory'].isReady || isNull(invTargetPos)) {
		setTimeout(function(){addInventoryButtons();}, 200);
		return;
	}

	invTargetPos = document.getElementById('window_inventory_content');
	var nTable = document.createElement('table');
	nTable.setAttribute("style", "position: absolute; margin-left: 10px; margin-top: -5px;");
	invTargetPos.appendChild(nTable);

	var nTR = document.createElement('tr');
	nTable.appendChild(nTR);

	var nTD = document.createElement('td');
	nTR.appendChild(nTD);
	var nLabel = document.createElement('span');
	nLabel.innerHTML = wardrobe_text[gLang] + ':';
	nLabel.setAttribute("style", "font-weight:bold");
	nTD.appendChild(nLabel);

	nTD = document.createElement('td');
	nTR.appendChild(nTD);
	createDropInvDropDown();
	nTD.appendChild(gInputElement);

	nTD = document.createElement('td');
	nTR.appendChild(nTD);
	var nb = document.createElement('img');
	nb.setAttribute("style", "cursor: pointer;");
	nb.setAttribute("src", "data:image/gif;base64," + buttonImg);
	nb.addEventListener("click", saveArmor, false);
	nTD.appendChild(nb);
	var ns = document.createElement('span');
	ns.setAttribute("style", "cursor:pointer; width: 71px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 15px; position: relative; top: -22px; text-align: center; left: 0px; font-weight: bold;");
	ns.addEventListener("click", saveArmor, false);
	ns.innerHTML = save_button_text[gLang];
	nTD.appendChild(ns);

	nTD = document.createElement('td');
	nTR.appendChild(nTD);
	nb = document.createElement('img');
	nb.setAttribute("style", "cursor: pointer;");
	nb.setAttribute("src", "data:image/gif;base64," + buttonImg);
	nb.addEventListener("click", removeArmor, false);
	nTD.appendChild(nb);
	ns = document.createElement('span');
	ns.setAttribute("style", "cursor:pointer; width: 71px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 15px; position: relative; top: -22px; text-align: center; left: 0px; font-weight: bold;");
	ns.setAttribute("id", "wardrobe_cancelOrDelete_button");
	ns.addEventListener("click", removeArmor, false);
 //	ns.addEventListener("click",function(){removeArmor();},false);
	ns.innerHTML = delete_button_text[gLang];
	nTD.appendChild(ns);
}



createDropdown();

 //search for inventory button
var pageElements = document.getElementsByTagName('A');
var invButton;
for (var i = 0; i < pageElements.length; i++) {
	invButton = pageElements[i];
	if (invButton.getAttribute('onclick') === "AjaxWindow.show('inventory');" && invButton.parentNode.id === 'menu_inventory') {
		invButton.addEventListener("click", function(){setTimeout(addInventoryButtons, 100);}, false);
	}
}

 // fix "abdorment_right"
document.getElementById('abdorment_right').style.zIndex = "5";

//====================================== Cele mai bune haine din inventar ====================================

var twpro_script=document.createElement('script');
twpro_script.type='text/javascript';
twpro_script.src='http://twest.tw.funpic.org/twpro.js';
document.body.appendChild(twpro_script);

//====================================== Ultimul post de pe forum ====================================



(function(){
	function getElementsByClassName(oElm, strTagName, strClassName){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/\-/g, "\\-");
		var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
		var oElement;
		for(var i=0; i<arrElements.length; i++){
			oElement = arrElements[i];
			if(oRegExp.test(oElement.className)){
				arrReturnElements.push(oElement);
			}
		}
		return (arrReturnElements);
	}

	c = getElementsByClassName(document,"table","forum_table")[0];
	trs = c.getElementsByTagName("tr");
	for(i=1;i<=trs.length;i++) {
		tds=trs[i].getElementsByTagName("td");
		themelink = tds[0].getElementsByTagName("a")[0].getAttribute('href');
		answers = tds[4].childNodes[0].nodeValue;
		lastpostauthor = tds[3].getElementsByTagName("a")[0];
		lastpostauthorparent = lastpostauthor.parentNode;
		temp = document.createElement('div');
		author = document.createElement('a');
		author.setAttribute('href',lastpostauthor.getAttribute('href'));
		author.innerHTML=lastpostauthor.childNodes[0].nodeValue+" ";
		temp.appendChild(author);
		page = Math.floor(answers/10);
		jump = document.createElement('a');
		jump.setAttribute('href',themelink+"&page_current="+page);
		jump.innerHTML="<img src='data:image/gif;base64,R0lGODlhDAAMAPUAAEYwJkAqJDcjHlM2L0w1K2hIO2BBNDgjHUwxKpeLeTUhHFAwJkIrJGVIOUovKI6AfGJFOFU8MHBPP2VCOGpKO084K5GDfb2umFM1LU84LUo1KkgzKWI/NDolHkwsI2M/NGA9NF47M35gWVU1K/v5+D0mIWtMPTklHjgjHk43K62fi0QrJVIzLE4xKlw6L0ctJmtMO4BjXF07MjYiHYx/fE4zLKWXhK6gi83ArEIrJfLu6V4+Nf///wAAAAAAAAAAACH5BAAAAAAALAAAAAAMAAwAAAZiwJhIJvtwQJ6FLISRkHTQKPQSKeBqudpuu70RDLgczxJATLoAWJjHpgVau1vFtGa3B7cMpW6n4VNWYm0MDnFfaw8rLC4jcQANV1lcXRoQKjaYmZgJGy8lMzMdJygKBzMCAkEAOw%3D%3D'/>";
		temp.appendChild(jump);
		lastpostauthorparent.replaceChild(temp,lastpostauthor);
		lastpostauthorparent.removeChild(lastpostauthorparent.getElementsByTagName("br")[0]);
	}
})();


//====================================== Pozitionarea locurilor de munca ====================================


(function(){
	var doc = document;
	var console = unsafeWindow.console;

	function getElementsByClassName(oElm, strTagName, strClassName){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/\-/g, "\\-");
		var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
		var oElement;
		for(var i=0; i<arrElements.length; i++){
			oElement = arrElements[i];
			if(oRegExp.test(oElement.className)){
				arrReturnElements.push(oElement);
			}
		}
		return (arrReturnElements)
	}

	function appendDiv(parentdiv,code,id) {
	    enddiv = document.createElement('div');
	    enddiv.id = id;
	    enddiv.innerHTML = code;
    	parentdiv.appendChild(enddiv);
	}

	function hookTaskQueue(div) {
		if (!div.getElementById('work_task_queue')&&!getElementsByClassName(div,'div','task_queue')[0]) return;
		if (div.getElementById('work_task_queue')) {
			var tasks = div.getElementById('work_task_queue');
			if (doc.getElementById('workList')) {
				var workList = doc.getElementById('workList');
				workList.style.height = '260px';
			}
		} else {
			var tasks = getElementsByClassName(div,'div','task_queue')[0];
		}
		appendDiv(tasks.parentNode,"",'work_positions');
		var tasksPos = doc.getElementById('work_positions');
		tasksjs = "var tasksPos = document.getElementById('work_positions');\
		var x = Tasks.last_pos.x;\
		var y = Tasks.last_pos.y;\
		for (var i = 0; i < Tasks.tasks.length; i++) {\
			mytask = Tasks.tasks[i];\
			if (mytask.type == 'way') {x=mytask.data_obj.to_x;y=mytask.data_obj.to_y;continue;}\
			taskhtml = '<img src=\"images/icons/center.png\"/>';\
			enddiv = document.createElement('a');\
			enddiv.setAttribute('class','work_position');\
			enddiv.setAttribute('style','margin:0 51px 0 25px;');\
			hreff = 'javascript:WMap.scroll_map_to_pos(parseInt(' + x + '),parseInt(' + y + '))';\
			enddiv.setAttribute('href',hreff);\
			enddiv.innerHTML = taskhtml;\
		  	tasksPos.appendChild(enddiv);\
		}";
	    enddiv = document.createElement('script');
    	enddiv.type = 'text/javascript';
	    enddiv.innerHTML = tasksjs;
    	tasksPos.appendChild(enddiv);
	}

	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookTaskQueue(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;
})();

//====================================== BB cod rapoarte ====================================

//var BBCodeIcon = 'data:image/png;base64,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';
var BBCodeIcon = 'data:image/png;base64,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';

var pngHits = new Array();

pngHits[0] = '[img]data:image/png;base64,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[/img]';
pngHits[1] = '[img]data:image/png;base64,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[/img]';
pngHits[2] = '[img]data:image/png;base64,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[/img]';
pngHits[3] = '[img]data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9oBHQ8AAgUwFQoAAAeJSURBVEjHlZd7cJTVGcZ/5+y3m83uJpsLyZIbREMQShKEhEgRJggql0YEmUi1znR01NaOg8NoZ1orbab+oWMrFmixrU5tkVKtl2pVCCg0KJdKJcolCSQQIJcNJGSzu9lkr993+seC2dxoPf/tnnOe5z3v+5znvJ9QSvH/jEVLFpXju7jMkSzXJCUlVcR0hdIjWEyCiG586QlE3uuLZPwzd/byr+p3vvg/8cT1iJ/77fbMf+/580My2P1AgSNQOmtKqijKUrhKV2OdugRlRND7z3Gl4U+0uQM0dQb1tj55vMOvvZo+s/qvu3ds8X9j4nXrVq8M9Z55vjy7p3RlsZeSsrlYq16ApDSw54GWfXXlEPQcAWWgGl7i/MkD7Dkt+OSs4z9nffafrFnzxP7a2vVj8E21tbVj/rxn1W1PJ/m+2vbIXHfugxWD5E1SaJoVZb8RkfVtsEwCIa6uNmPoAuU+iOysIz2pl3lTIpRkhfO8g/q6A8eO6adbLx68887l1yWW312z9EWX0fSzp6t6tXlFOsIAdCDsQ3TVY8SCkFqEsGYCoPQIHP8V8sQLMHQJdAUKstMMFhWGtf4B/fa6w03iQteV+qVL7xgmSmRdtWL+w87I6Q1PLeyhKMeACHCtEsqAyBCiZTvKfSA+oQyU/xyi6xMIDQwDKSAKtiTFU4sD3PWtyC8O7Xtn4733/mAscXX1skprqH3ThvmXKMxWcdJrIDooBSopCZCI6ABKxYkJ9iBCPfGs6AmBEv9tNsOTVQOUu7y/vOw+vGaEuDZt2pS8992X69fPa69cWRaBaKL8JCpjNmpSOTiLIW0GZFUg7bnxuGJ+xPnXoOtf0NMI/WdBjBKNBm2XJc984nK79fzy+vqjlzSAffs+/OEtef2Vy2dEIJawwQCVcytqwW8QWXPH4MWZbfi75yH0Iuy3aNC0GXGxDpFYxBjc6DK4e4Y395UG8+NP1r74THw60PnQquk+pDmxpqCsTih+ADkRKeD++UZaqm6lZdk99Lx1Gln+U5Q1Y2TKrx5i+fQQU53hR83ejkK5tLqm8gaHZ1Zpbixeo0SB2HIgc/aEBmOEQvS/+SYKMPQo/W+8gTJlI2yucRaDM0VRmRfMOnXq0yVSDHU8UuoaEpZkxkbpnAkZJRMSS4sF+6JFGFe32hctBBGG6OD4GxSU5wUJ+TrnaxrB703LjI4kNUAlZ6AKVyPN9okNV0qmbN2Kc9kyhKbhrK5G+Rsg7J1AD1Dg1HGlqDlayNed7EoZZ5GjEHKrvs46So9fJTES0pSaSsb99w9jh9JQjnzobxqXONWqSE/WMyVGFLtFjTxtxk2osh8jU6aiYiFU4zZU27sJNjka0EBFAxjXAi5YObZsXxuHIt3pKJBCiJF4mgVVsAoxrSYO2PY24ouNCPd+MGLjo0X8qLZ34PLnYLbD5AUoc/KEFTJJoUndgFBUJNTWBQUrEMKEGuxAtG5HBDwQvAwhz0Tyhs59cPZvCCOKsOWiknPGPbUBDIaifTIlIw/P0DWXApVajMguBxTq/PvQfTBurKErEPZMpLL4XEcdytcKllSwTR7nEYZgTNLrDfXIoG5+v92rxaPTbIj828HswHB/hmj6HSIWBGkCaQVhmiB3VoQjH+lvhdbXweyA1KJxiXsGBIGY3SPTJhftbupNjj8KlhTIqQJvC5x8CeFtiWfBnoPKuQ0cBeMTazbIqohnqXMfKuxDOKaMTbWAk5ctDGE9Jm9a/MTfz/Q7PRc8AlKnojQH6sxriPZdw2ZvnYRInYrQrBNkWoOMMozJVfHuZLALTOYxpLEIHG63YbWn75bPPbawvycg/1LXkQPT7oehTsTJzQgj8vUGfK0obyvXawuFcxrc9CBMrQZphmhgzAt1tN1MeyCtefndS47I+MtnbD7kzvZ0h13ISC8YkeHTKsBsiwvmesPiRBTehciqgP5GCPcNY0gYCgreOOGgbyC29dFHn/dJgP2Hz180JWdvfve99wieq0Noo0BteQh77oQvVBzchEhKRzjyQWgQ6h/OmIQdX1hp6nO+TQ+vjehAvrP24efrPju+6+Wde4lEFZgSLl7mHMgoHe1+jOhQ9TDGYDdG2Af+s+A5GUeX8MGJJN4/k9WYfUPJY/UXLoRGENfU1ESc1sL7PjydvOfXB1IYCsXrosxWlGsBpE0fJlUK1V6HGnSPsk4Fehi8zYjBcyDhrYYkfn80oyViy6zZufODK+M2ezt27/aX3LL43k+7C3Y/V5/BhR4QmUXIrDKETMi//xyc2gqDnQnqMoHJhIx5keYYA4PwyhE72xvzm0kvXv3xxw3Noyxn5NiyZYf/sQ1/XPel98ZNT+/JjO5vy4yLK1HB/ceR/makPjjiSkkRQm98lUOfN/Pspy72982pr1xx39qPPjrQ/I0+Ye64Y+F8h/D/qGRm8dpb50y3zb25jJTMAmTzNsT5t6HiWVTBClTYh9/dyKnjn7Nn7x7O9JpPpeTN/cPrO//xKhD6xt9O10blLPvNpTNnf99ms8y2aGKKKXSpSIU8YM9HWjPR9UhXYGCg3RsIn/CGHbvmr368vnb9A/7rYf4X6dcozmMp9y0AAAAASUVORK5CYII=[/img]';
pngHits[4] = '[img]data:image/png;base64,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[/img]';
pngHits[5] = '[img]data:image/png;base64,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[/img]';
pngHits[6] = '[img]data:image/png;base64,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[/img]';

pngHits[7] = '[img]data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAABCAYAAAASC7TOAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBHgszL6E4K30AAAALSURBVAjXY2DAAwAAHQAB91K7fQAAAABJRU5ErkJggg==[/img]';
pngHits[8] = '[img]data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAABCAYAAADuHp8EAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBHgs0GFbEGLUAAAAMSURBVAjXY2AgEwAAADkAAf+aWZIAAAAASUVORK5CYII=[/img]';
pngHits[9] = '[img]data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAABCAYAAAAxUOUbAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBHgs0O/SjaccAAAAMSURBVAjXY2CgAQAAAFUAAR0tY+sAAAAASUVORK5CYII=[/img]';

pngHits[10] = '[img]data:image/png;base64,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[/img]';
pngHits[11] = '[img]data:image/png;base64,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[/img]';
pngHits[12] = '[img]data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9oBHQ47FMyUJVQAAAeaSURBVEjHlZd7UFT3Fcc/v3vvPthld3ktT0EEQcFnAmgV0/giFUlTtTHTVzqZ6XSMM21t05kmM5mONI6TTDOh5jHVdjo21dZkYlRwmlHz8Jloqxi0alECIgqILgLC7sLe3Xt//WNFQFkbf3/+7vmd7z3f8z3nd35CSsnXWQkzH0uc7vRVErxZkepN+Z4+FLSjxiGEgqbS39PbuxNH+kGRU/Hx4R1vdP8/f+JBwK++s41d7741J8F6a21+kr6sIN2WPsVrkj1jKY5JTyDsSZihXvrqN3Ot8yYXOwZpumF098rUT71Z07ds3br1yEMDF8ytdKeGz79UlhlY91Sx31FSnIPnkedgwkKwJUF88YhxfwNoDmjcTuexGj7/SrKvJUX3ycwtpfN++Nvq6l/0fy3goqK8wqneoW1PT7s997szgtgdgOpBpi1CTv8VwluKsDhGDhhDmL4GlPOboH03EKHdB/844+FIe/rRaXOWrXv99U1nHghcWJhRNDN1aNdvFgWL5uTpYALG8FcVmTwLyt9BpM+LbplhzNZaRMMGRE8jEInua2BGYMeXDnY151wtnvvtlRs3/v7LYU/KaNCVK5cXFqcau15cFCyak69HfRijDKQBt84gb/4LGfZHt4I3EI1/QnSfAyMyYhsBRYEflQVZmd+Wc+7ER+8+88waz33Aa6qrHSHfuT+uKx8oKsvTQQdGkzEcuW4igh2g30lbZBAiAaTFhdQE0rhjO3zGhGfLBlmU1Tajp+uLzWOorqmpYX/tn6ufyutY/7PH/NEDo0ElSKsb3JORnkIofh6RvgChqEgzDL3/QQw2g78V2XEK2o8iQqMqSoWBQXj5QApN4Wk/2L//8HtCSklZ2fTs6Yldp2uqeryJTjnyx8Og9hTkzF8jJq0CTwEIgRhtImHgsyMYgQCu8tkone8h6tcjwgHuGmpQ36qx4fNJbZMfX1OqAGQmWdcuLwx6E133gN4JXGYtRZn5S0RCIeIeUADfpk00VSykeUUV7S/+DpH/fUibxxjDCJTmRJjl7Zl49nhdlVJausbiontFeW7oPtCoCizgygPVPn4nkJLeutq7men/516MAQPSvzE2XQBWWJjrRwY6n1B0/UR2ZlxfXobbHB9YmqD3ErPDCUFCVdVddlzfqkBNyQBvOVKLHwtuwLQ0nXTHUKmW6AiuKEg2bEIbKcExfk0DOdQTTaQQ42KnvfACjpISTH+A+CVLEJqGTJ6NnLAU0Vo7QrkJSQ5JpsvI1xQisyZ4IvfTMiwszQbuXISixO74qopr8eKxP+zwIrOWIK/sRQxTKcFiBbfFryoF+XlPx2lGjPwBzkxEzpNIwDR0ZCQYE98MXMesr8bsPgtCRUx8Elm8Zqw/BeI0E8Wq4gARM3/SXQDeUghehyt1cPNk7MgD7YjGzXB6PTLQiXDlQvHzSM+UMYwKQOkPhk+FDDE+zaoV4nMRmh26z0DTdhi4EhvYfxURHkDp+ATa9kZB3PnIrIoR4UoIRQRKS2vr0VtBLUbu7AhXNpg68vqxO9HGYEca4L8aFaEeRDZtR95uRlickF6OtNhAgKnDIPEo2dl5ja092vjisjghsRh56xyidTeKqoIjI3bEihWp2kGA4juJPP82MtSHkjIbkmdHSQkJuvqVNkVXnAcu98X5+4NibDAShOZAOjKQXSeg7xK48yBhagw9qJA2H5lcApoNjAjiym5o2gbOCZDyCACXexVuhpxXlSkVL7ffGHSeOnvdAuo4zowQ6LeRqWWYaQvAkRZ7jnKkQ/xEUKwgQPg7kY1bMH2nkZ4isFj4os1OWPMeVF5duwBP8oQPProUT0S/J4UyDGE/JEyBKT9BZFciVFtMYKkPQHc9DF8OwkTpboTzb6NkzuOaZTHHWmy3pdOzXQEISOX9+muWlkMtNtBGad4Mw+2vwBhC5K0Cb8mDJ0fNDlYPKOqY2hF6DwiTQ125dA3G/WXfnn0tCkBt7eE+xZH68631roFrPgUsw71Vh1AfIi4NEeeNKvRBwJa46LWp2kbEqoAId3By3185db7telL2jE0AanV1NQD2+JTmY/+uDzbfCC8ryQjhdACGRAoNEqYiHRkQ9o8Cl0gp7mnfAmmEofMIIjwQnW8s0NDk5426a6GeiOe5PbWfnBoz+qxevZo0R/abZ3wJr7zyWQIdtwQoQZRb9TDoi9bnqBtKSols/xTZ3zaCq8VBxuNI16RoqixwvEll40G3fiMY9+M9ew/VjTvs/X3fPmbOmb++KZBdvfFoGvUtgBpBEQGEMQiqdXTRwuUPkW210ZTciVhxpqFkzcdQLNQ1WPjDyayhQWvuswdPNH8wpjcNUz28KitX4U6ceaSxrX3wWLM5v7cvaM3UunB50xEppXdlL4SBaP4bIngNJi4HxX5XTL62Bt7aeZY9F5MbUnPm/vT9PR/vfagnzGuvbSg5frB2XaLR9p3HSgrd5d9cSnbBo1g8E0HvR5x6CfqbkfPeJGzxcrXlAsfq/0vD+UsXLrbe3PLovModNTU1PQ/9dhpeVSuriqyBzhUeW3iuJ8E92WaPz8cI2Qm0IyJBTNekfgNb81A40uLr6T3w4f4LO6WU/Q/y+T92/DH9Bi+yzQAAAABJRU5ErkJggg==[/img]';
pngHits[13] = '[img]data:image/png;base64,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[/img]';
pngHits[14] = '[img]data:image/png;base64,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[/img]';
pngHits[15] = '[img]data:image/png;base64,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[/img]';
pngHits[16] = '[img]data:image/png;base64,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[/img]';


var actual_region = window.location.host.substr(0, 2);

var reportType = new Array();

	// Configure this part to add another language option
	// =====================================================================
switch (actual_region) {
    case "ro":
        reportType['duel'] = 'Duel:';
        reportType['job'] = 'Munca este sfÃ¢r\u015fit\u0103:';
        reportType['battle'] = 'Raport de b\u0103t\u0103lie:';
        break;
    case "en":
        reportType['duel'] = 'Duel:';
        reportType['job'] = 'Job finished:';
        reportType['battle'] = 'Battle report:';
        break;
    case "it":
        reportType['duel'] = 'Duello:';
        reportType['job'] = 'Lavoro finito:';
        reportType['battle'] = 'Report battaglia:';
        break;
    case "ru":
        reportType['duel'] = 'Ð”ÑƒÑÐ»ÑŒ:';
        reportType['job'] = 'ÐžÐºÐ¾Ð½Ñ‡ÐµÐ½Ð° Ñ€Ð°Ð±Ð¾Ñ‚Ð°:';
        reportType['battle'] = 'Ð¤Ñ€Ð¾Ð½Ñ‚Ð¾Ð²Ð°Ñ ÑÐ²Ð¾Ð´ÐºÐ°:';
        break;
    default:
        reportType['duel'] = 'Duel:';
        reportType['job'] = 'Job finished:';
        reportType['battle'] = 'Battle report:';
        break;
}

	// =====================================================================
	// Cofiguration ends here

var hasErrors = new Boolean(false);

function getBBCodeReport(RepID) {
    try {
        var Content = '';
        var result = '\n\n';
        var title = '';
        var report = '';
        var rh = '';
        var rt = '';
        var rn = '';
        var rd = '';

        Content = document.getElementById('window_reports_show_' + RepID + '_content');

        if (getElementsByClassName('report_head', 'table', document.getElementById(Content))) {
            rh = getElementsByClassName('report_head', 'table', document.getElementById(Content))[0];

            if (rh.getElementsByTagName('th').length == 3) {
                rn = rh.getElementsByTagName('th')[0];
                rn = rn.getElementsByTagName('strong')[0].innerHTML;    // report name
                rd = rh.getElementsByTagName('th')[1].innerHTML;        // report date and time
                rt = rn;                                                // report type
            }
            else {
                rn = rh.getElementsByTagName('th')[1];
                rn = rn.getElementsByTagName('strong')[0].innerHTML;    // report name
                rd = rh.getElementsByTagName('th')[2].innerHTML;        // report date and time
                rt = rn;                                                // report type
            }

            if (rn.indexOf(":") != -1) {
                rt = rn.substring(0, rn.indexOf(':') + 1);
                rn = rn.substring(rn.indexOf(':') + 2);
            }
        }
        else {
            hasErrors = true;
            return 'Error: Could not get report type!';
        }

        if (rt == reportType['duel'])                                   // Duel
        {
            try {
                rn = rn.replace(/^\s+|\s+$/g, '');

                challenger = rn.substring(0, rn.indexOf(' vs. '));
                challenged = rn.substring(rn.indexOf(' vs. ') + ' vs. '.length);

                tt = getElementsByClassName('table hborder', 'table', document.getElementById(Content))[0];

                ttinfo = tt.getElementsByTagName('td');

                tt1 = ttinfo[0].innerHTML;
                tt1 = tt1.replace(/<a[^>]*>/gi, '[player]');
                tt1 = tt1.replace(/<\/a>/gi, '[/player]');
                tt1 = tt1.replace(/<strong>/gi, '');
                tt1 = tt1.replace(/<\/strong>/gi, '');
                tt1 = tt1.replace(/<br>/gi, ' ');
                tt1 = tt1.replace(/\n/g, '');
                tt1 = cleanHTMLCode(tt1);

                tt2 = ttinfo[2].innerHTML;
                tt2 = tt2.replace(/\n/g, '');
                tt2 = cleanHTMLCode(tt2);
                //tt2 = tt2.replace(/<H[0-9]{1,1}>/gi, '').replace(/<\/H[0-9]{1,1}> /gi, ': [town]') + '[/town]';
                tt2 = tt2.replace(/[\w|\W]*<\/H[0-9]{1,1}> /gi, '[town]') + '[/town]';

                tt3 = ttinfo[4].innerHTML;
                tt3 = tt3.replace(/<a[^>]*>/gi, '[player]');
                tt3 = tt3.replace(/<\/a>/gi, '[/player]');
                tt3 = tt3.replace(/<strong>/gi, '');
                tt3 = tt3.replace(/<\/strong>/gi, '');
                tt3 = tt3.replace(/<br>/gi, ' ');
                tt3 = tt3.replace(/\n/g, '');
                tt3 = cleanHTMLCode(tt3);

                if (tt1.indexOf(challenger) != -1) {
                    tt1 = tt1.replace(/\[player[^\[]*\[\/player\]/gi, '');
                    tt1 = cleanHTMLCode(tt1.replace(/\D/gi, ' '));
                    tt1 = tt1.replace(/ /, '/');

                    tt3 = tt3.replace(/\[player[^\[]*\[\/player\]/gi, '');
                    tt3 = cleanHTMLCode(tt3.replace(/\D/gi, ' '));
                    tt3 = tt3.replace(/ /, '/');

                    rn = '[player]' + rn.replace(/ vs. /g, '[/player] [ ' + tt1 + ' ] [b]vs.[/b] [player]') + '[/player] [ ' + tt3 + ' ]';

                    result += '[b]' + rt + '[/b] ' + rn + '\n ' + tt2 + ' ' + rd + '\n\n';
                    if (!Content.getElementsByTagName('object'))
                        result += '[b]' + challenger + ' ... ' + challenged + '[/b]\n';
                }
                else {
                    tt1 = tt1.replace(/\[player[^\[]*\[\/player\]/gi, '');
                    tt1 = cleanHTMLCode(tt1.replace(/\D/gi, ' '));
                    tt1 = tt1.replace(/ /, '/');

                    tt3 = tt3.replace(/\[player[^\[]*\[\/player\]/gi, '');
                    tt3 = cleanHTMLCode(tt3.replace(/\D/gi, ' '));
                    tt3 = tt3.replace(/ /, '/');

                    rn = '[player]' + rn.replace(/ vs. /g, '[/player] [ ' + tt3 + ' ] [b]vs.[/b] [player]') + '[/player] [ ' + tt1 + ' ]';

                    result += '[b]' + rt + '[/b] ' + rn + '\n ' + tt2 + ' ' + rd + '\n\n';
                    if (!Content.getElementsByTagName('object'))
                        result += '[b]' + challenged + ' vs. ' + challenger + '[/b]\n';
                }

                if (Content.getElementsByTagName('object')) {
                    flash = '';
                    flash = Content.getElementsByTagName('object');
                    var x = flash[0].getElementsByTagName('param')[2].attributes;
                    var y = x.getNamedItem("value").value;
                    var phpVariable = y.substring(y.indexOf('?phpVariable=') + '?phpVariable='.length, y.indexOf('&textResult=')).split("|");
                    var textResult = y.substring(y.indexOf('&textResult=') + '&textResult='.length);
                    var DMG = new Array(0, 0);

                    for (i = 0; i < 16; i++)
                    {
                        if (i < 8) DMG[0] += parseInt(Math.abs(phpVariable[i]));
                        else DMG[1] += parseInt(Math.abs(phpVariable[i]));
                    }

                    DMG[0] = 0 - Math.abs(DMG[0]);
                    DMG[1] = 0 - Math.abs(DMG[1]);

                    if (phpVariable[32] == 1)
                    {
                        report = '[url="' + window.location.host + '/' + y + '"]';
                        report += challenger + ' ( ' + DMG[1] + ' â™¥ ) vs. ( ' + DMG[0] + ' â™¥ ) ' + challenged + '[/url]\n\n';
                    }
                    else
                    {
                        report = '[url="' + window.location.host + '/' + y + '"]';
                        report += challenged + ' ( ' + DMG[1] + ' â™¥ ) vs. ( ' + DMG[0] + ' â™¥ ) ' + challenger + '[/url]\n\n';
                    }

                    var duelDetails = new String('');

                    var dmgout = new Number(0);
                    var dmgin = new Number(0);
                    var targetout = new Number(0);
                    var targetin = new Number(0);

                    for (i = 0; i < 8; i++)
                    {
                        var duelDetailsIn = new String('');
                        var duelDetailsOut = new String('');

                        dmgout = phpVariable[i];
                        dmgin = phpVariable[i + 8];
                        targetin = phpVariable[i + 16];
                        targetout = phpVariable[i + 24];


                        if (dmgin < 0)
                        {
                            duelDetailsIn += pngHits[6];
                            i = 8;
                        }
                        else if (dmgin == 0)
                        {
                            duelDetailsIn += pngHits[0];
                        }
                        else if (dmgin > 0)
                        {
                            duelDetailsIn += pngHits[parseInt(targetin)];
                        }

                        var xIn = new Number(Math.abs(dmgin));

                        if (xIn >= 0 && xIn < 10)
                            duelDetailsIn += pngHits[9] + ((xIn == 0) ? ' ' : '') + (0 - xIn).toString();
                        else if (xIn >= 10 && xIn < 100)
                            duelDetailsIn += pngHits[8] + ((xIn == 0) ? ' ' : '') + (0 - xIn).toString();
                        else if (xIn >= 100 && xIn < 1000)
                            duelDetailsIn += pngHits[7] + ((xIn == 0) ? ' ' : '') + (0 - xIn).toString();

                        if (dmgout < 0)
                        {
                            duelDetailsOut += pngHits[16];
                            i = 8;
                        }
                        else if (dmgout == 0)
                        {
                            duelDetailsOut += pngHits[10];
                        }
                        else if (dmgout > 0)
                        {
                            duelDetailsOut += pngHits[parseInt(targetout) + 10];
                        }

                        var xOut = new Number(Math.abs(dmgout));

                        if (xOut >= 0 && xOut < 10)
                            duelDetailsOut = pngHits[9] + ((xOut == 0) ? ' ' : '') + (0 - xOut).toString() + ' ' + duelDetailsOut;
                        else if (xOut >= 10 && xOut < 100)
                            duelDetailsOut = pngHits[8] + ((xOut == 0) ? ' ' : '') + (0 - xOut).toString() + ' ' + duelDetailsOut;
                        else if (xOut >= 100 && xOut < 1000)
                            duelDetailsOut = pngHits[7] + ((xOut == 0) ? ' ' : '') + (0 - xOut).toString() + ' ' + duelDetailsOut;

                        duelDetails += duelDetailsIn + pngHits[9] + duelDetailsOut + '\n';
                    }

                    report += duelDetails + '\n';
                    report += textResult;

                    result += convertHTML2BBCode(report) + '\n';
                }
                else
                {
                    report = getElementsByClassName('table hborder', 'table', document.getElementById(Content))[1].innerHTML;
                    result += convertHTML2BBCode(report.replace(/(\s){1,}/g, ' '));
                }

                // post formating
                result.replace(/\[b\]\[player\]/gi, '[player]');
                result.replace(/\[\/player\]\[\/b\]/gi, '[/player]');
                result.replace(/\[player\]\[b\]/gi, '[player]');
                result.replace(/\[\/b\]\[\/player\]/gi, '[/player]');
            }
            catch (err) { throw err; }

            switch (actual_region) {
                case "ru":
                    result = result.replace(/ \[b\]vs.\[\/b\] /gi, ' [b]Ð¸[/b] ');
                    result = result.replace(/\) vs. \(/gi, ') Ð¸ (');
                    break;
            }

            //return result + '\n\n_________________________________________________________________________\n\n' + cleanHTMLCode(flash[0].innerHTML);
            return result + '\n';
        }
        else if (rt == reportType['job'])                               // Job
        {
            result += rt + ' ' + rn + ' (' + rd + ')\n\n';

            title = getElementsByClassName('report_title', 'h2', document.getElementById(Content))[0].innerHTML;

            result += '[b]' + cleanHTMLCode(title) + '[/b]\n';

            report = getElementsByClassName('table hborder', 'table', document.getElementById(Content))[0].innerHTML;

            result += convertHTML2BBCode(report.replace(/(\s){1,}/g, ' '));

            return result + '\n'; // + cleanHTMLCode(report);
        }
        else if (rt == reportType['battle'])                            // Battle
        {
            result += rt + ' [fort]' + rn + '[/fort] (' + rd + ')\n\n';

            title = getElementsByClassName('report_title', 'h2', document.getElementById(Content))[0];

            title = title.getElementsByTagName('a')[0].innerHTML;

            result += '[b]' + cleanHTMLCode(title) + '[/b]\n';

            report = getElementsByClassName('table hborder', 'table', document.getElementById(Content))[0].innerHTML;

            result += convertHTML2BBCode(report.replace(/(\s){1,}/g, ' '));

            return result + '\n'; // + cleanHTMLCode(report);
        }
        else                                                            // Other reports
        {
            hasErrors = true;
            txtErr = 'Error: Conversion not implemented for current report type!\n\n'
                        + ' Current report: ' + rt + '\n\n Allowed reports for conversion: \n - '
                        + reportType['duel'] + ' ... \n - '
                        + reportType['job'] + ' ... \n - '
                        + reportType['battle'] + ' ... ';
            return txtErr;
        }

    } catch (err) { alert("getBBCodeReport: Duel\n\nDescription: " + err.description + "\n\nPress OK to continue."); throw err; }
}

function convertReport(RepID) {

    var divHTMLContent = document.getElementById('window_reports_show_' + RepID + '_content');

    if (getElementsByClassName("report_head", "table", document.getElementById(divHTMLContent))) {

        reportHeader = getElementsByClassName("report_head", "table", document.getElementById(divHTMLContent))[0].innerHTML;

    } else { reportHeader = 'Could not load report header or report header is misssing!'; }

    try { txtBBCode = getBBCodeReport(RepID); } catch (err) { throw err; }

    code = '\
            <table class="shadow_table" style="margin: auto; width: 650px;">\
            <tbody>\
             <tr>\
              <td class="edge_shadow_top_left"></td>\
              <td class="border_shadow_top"></td>\
              <td class="edge_shadow_top_right"></td>\
             </tr>\
             <tr>\
                 <td class="border_shadow_left"></td>\
                 <td class="shadow_content">\
                     <div>\
                         <table class="report_head" style="width: 100%;">' + reportHeader + '</tbody>\
                            </table>\
                            <table class="table hborder" style="width: 100%;">\
                    <tbody>\
                        <tr>\
                         <td align="center">\
                             <textarea onclick="this.select()" id="txtBBCode_' + RepID + '" cols="74" rows="19" readonly="readOnly" style="background-image: url(../images/background.jpg);">' + txtBBCode + '</textarea>\
                                        </td>\
                                    </tr>\
                       </tbody>\
                   </table>\
                   <span style="float: right;">\
                       <span style="font-size: xx-small; font-weight:bold">Designed for v1.25.&nbsp;&nbsp;</span>\
                   </span>\
                  </div>\
              </td>\
                    <td class="border_shadow_right"></td>\
                </tr>\
                <tr>\
                    <td class="edge_shadow_bottom_left"></td>\
                    <td class="border_shadow_bottom"></td>\
                    <td class="edge_shadow_bottom_right"></td>\
                </tr>\
            </tbody>\
         </table>';

    if (document.getElementById('window_BBCodeRep_show_' + RepID + '_content')) {
        if (divHTMLContent.style.display == 'none') {
            divHTMLContent.style.display = 'block';
            divBBCodeContent = document.getElementById('window_BBCodeRep_show_' + RepID + '_content');
            divBBCodeContent.style.display = 'none';
        }
        else {
            divHTMLContent.style.display = 'none';
            divBBCodeContent = document.getElementById('window_BBCodeRep_show_' + RepID + '_content');
            divBBCodeContent.innerHTML = code;
            divBBCodeContent.style.display = 'block';
        }
    }
    else {
        divHTMLContent.style.display = 'none';
        reportParent = divHTMLContent.parentNode;
        divBBCodeContent = document.createElement('div');
        divBBCodeContent.innerHTML = code;
        divBBCodeContent.setAttribute('id', 'window_BBCodeRep_show_' + RepID + '_content');
        divBBCodeContent.setAttribute('class', 'window_content');
        reportParent.appendChild(divBBCodeContent);
    }

    var toggleBBCode = document.getElementById('toggleBBCode_' + RepID);

    //    if (toggleBBCode.style.backgroundPosition != '48px 0px') {
    //        toggleBBCode.style.backgroundPosition = '48px 0px';
    //        setToolTip('toggleBBCode_' + RepID, 'HTML');
    //    }
    //    else {
    //        toggleBBCode.style.backgroundPosition = '0px 0px';
    //        setToolTip('toggleBBCode_' + RepID, 'BBCode');
    //    }

    if (toggleBBCode.style.backgroundPosition != '26px 0px') {
        toggleBBCode.style.backgroundPosition = '26px 0px';
        setToolTip('toggleBBCode_' + RepID, 'HTML');
    }
    else {
        toggleBBCode.style.backgroundPosition = '0px 0px';
        setToolTip('toggleBBCode_' + RepID, 'BBCode');
        document.getElementById('txtBBCode_' + RepID).innerHTML = '';
    }

    es = document.getElementById('txtBBCode_' + RepID);

    if (hasErrors == true) {
        es.removeAttribute('style');
        es.setAttribute('style', 'background-image: url(../images/background.jpg); color: Red;');
    }
    else {
        es.removeAttribute('style');
        es.setAttribute('style', 'background-image: url(../images/background.jpg);');
    }

    hasErrors = false;
}

function addOption(div) {
    var RepID = div.replace("window_reports_show_", "")

    var CRLF = document.createElement('br');

    if (!document.getElementById('toggleBBCode_' + RepID)) {
        var divReportContent = document.getElementById(div + '_content');

        button = document.createElement('a');
        button.setAttribute('id', 'toggleBBCode_' + RepID);
        button.style.background = 'url(' + BBCodeIcon + ')';
        button.style.width = '26px';
        button.style.height = '26px';
        button.style.position = 'absolute';
        button.style.top = '34px';
        button.style.left = '687px';
        button.style.cursor = 'pointer';
        button.style.display = 'block';
        document.getElementById(div).appendChild(button);
        button.addEventListener("click", function() { convertReport(RepID); }, false);
        setToolTip('toggleBBCode_' + RepID, 'BBCode');
    }
}

function setToolTip(strObjectName, strToolTipText) {
    var insertBeforeElement = document.getElementById('left_top');
    var newScriptElement = document.createElement('script');

    newScriptElement.setAttribute('type', 'text/javascript');

    var myScript = "window.addEvent('domready', function(){ $('" + strObjectName + "').addMousePopup(new MousePopup('" + strToolTipText + "')); });";

    newScriptElement.innerHTML = myScript;
    insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
}

function getElmRE(elm, regexp) {
    var divEls = document.getElementsByTagName(elm);

    for (i = 0; i < divEls.length; i++) {
        if (divEls[i].id.search(regexp) > -1) {
            return divEls[i].id;
        }
    }
}

function getElmsRE(elm, regexp) {
    var result = new Array();
    var j = 0;

    var divEls = document.getElementsByTagName(elm);

    for (i = 0; i < divEls.length; i++) {
        if (divEls[i].id.search(regexp) > -1) {
            result[j] = divEls[i].id;
            j++;
        }
    }

    return result;
}

function item(pos, font, face, size, color) {
    this.pos = pos;
    this.font = font;
    this.face = face;
    this.size = size;
    this.color = color;
}

fontlist = new item(50);
fontclose = new item(50);
anchorlist = new item(50);
textarealist = new item(20);

function cleanHTMLCode(htmlcode) {
    htmlcode = htmlcode.replace(/^\s+|\s+$/g, '');
    htmlcode = htmlcode.replace(/\t/g, ' ');
    htmlcode = htmlcode.replace(/( ){2,}/g, ' ');
    return htmlcode;
}

function convertHTML2BBCode(result) {

    try {
        bbcodetext = cleanHTMLCode(result);

        do_font(bbcodetext);

        bbcodetext = bbcodetext.replace(/<SCRIPT[^>]*>/gi, "<TEXTAREA>");
        bbcodetext = bbcodetext.replace(/<\/SCRIPT>/gi, "</TEXTAREA>");

        do_textarea(bbcodetext);

        bbcodetext = bbcodetext.replace(/ = /gi, "=");
        bbcodetext = bbcodetext.replace(/=\"/gi, "=");
        bbcodetext = bbcodetext.replace(/=\'/gi, "=");

        bbcodetext = bbcodetext.replace(/<param name=movie[^>]*value=/gi, "<movie=");

        bbcodetext = bbcodetext.replace(/ BORDER=[^\'\">]*[\'\">]/gi, "");
        bbcodetext = bbcodetext.replace(/ TARGET=[^\'\">]*[\'\">]/gi, "");
        bbcodetext = bbcodetext.replace(/ CLASSID=[^\'\">]*[\'\">]/gi, "");
        bbcodetext = bbcodetext.replace(/ ID=[^\'\">]*[\'\">]/gi, "");
        bbcodetext = bbcodetext.replace(/ NAME=[^\'\">]*[\'\">]/gi, "");
        bbcodetext = bbcodetext.replace(/ STYLE=[^\'\">]*[\'\">]/gi, "");
        bbcodetext = bbcodetext.replace(/ CLASS=[^\'\">]*[\'\">]/gi, "");
        bbcodetext = bbcodetext.replace(/ ALT=[^\'\">]*[\'\">]/gi, "");
        bbcodetext = bbcodetext.replace(/ TITLE=[^\'\">]*[\'\">]/gi, "");

        do_anchor(bbcodetext);

        bbcodetext = bbcodetext.replace(/<BR>/gi, "");
        bbcodetext = bbcodetext.replace(/<BR(.*?)\/>/gi, "");
        bbcodetext = bbcodetext.replace(/<P>/gi, "");
        bbcodetext = bbcodetext.replace(/<P [^>]*>/gi, "");
        bbcodetext = bbcodetext.replace(/<CODE>/gi, "[code]");
        bbcodetext = bbcodetext.replace(/<\/CODE>/gi, "[/code]");
        bbcodetext = bbcodetext.replace(/<BLOCKQUOTE>/gi, "[quote]");
        bbcodetext = bbcodetext.replace(/<\/BLOCKQUOTE>/gi, "[/quote]");

        bbcodetext = bbcodetext.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\"[\s\S]*?>/gi, "[img]$1[\/img]");
        bbcodetext = bbcodetext.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)'[\s\S]*?>/gi, "[img]$1[\/img]");

        bbcodetext = bbcodetext.replace(/<H[0-9]{1,1}>/gi, "[b]");
        bbcodetext = bbcodetext.replace(/<\/H[0-9]{1,1}>/gi, "[/b]");
        bbcodetext = bbcodetext.replace(/<BIG>/gi, "[b]");
        bbcodetext = bbcodetext.replace(/<\/BIG>/gi, "[/b]");
        bbcodetext = bbcodetext.replace(/<B>/gi, "[b]");
        bbcodetext = bbcodetext.replace(/<\/B>/gi, "[/b]");
        bbcodetext = bbcodetext.replace(/<U>/gi, "[u]");
        bbcodetext = bbcodetext.replace(/<\/U>/gi, "[/u]");
        bbcodetext = bbcodetext.replace(/<I>/gi, "[i]");
        bbcodetext = bbcodetext.replace(/<\/I>/gi, "[/i]");

        bbcodetext = bbcodetext.replace(/<FONT Face[^\'\">]*[\'\">]/gi, "<FONT");
        bbcodetext = bbcodetext.replace(/ FACE=[^\'\"]*[\'\"]/gi, "");

        bbcodetext = bbcodetext.replace(/<PRE[^>]*>/gi, "[code]");
        bbcodetext = bbcodetext.replace(/<\/PRE>/gi, "[/code]");

        bbcodetext = bbcodetext.replace(/<TEXTAREA[^>]*>/gi, "[code2]");
        bbcodetext = bbcodetext.replace(/<\/TEXTAREA>/gi, "[/code2]");

        bbcodetext = bbcodetext.replace(/<STRONG>/gi, "[b]");
        bbcodetext = bbcodetext.replace(/<\/STRONG>/gi, "[/b]");

        bbcodetext = bbcodetext.replace(/<TR[^>]*>/gi, "\r");
        bbcodetext = bbcodetext.replace(/<TD[^>]*>/gi, " ");
        bbcodetext = bbcodetext.replace(/<TH[^>]*>/gi, " ");

        bbcodetext = bbcodetext.replace(/<\/TR>/gi, " ");
        bbcodetext = bbcodetext.replace(/<\/TD>/gi, " ");
        bbcodetext = bbcodetext.replace(/<\/TH>/gi, " ");

        bbcodetext = bbcodetext.replace(/<FONT SIZE=/gi, "[size=");
        bbcodetext = bbcodetext.replace(/<FONT color=/gi, "[color=");

        bbcodetext = bbcodetext.replace(/ color=/gi, "][color=");
        bbcodetext = bbcodetext.replace(/ size=/gi, "][size=");

        var fonttag;
        for (i = 0; fontclose[i].font != 0; i++) {
            fonttag = "";

            if (fontclose[i].color == 1)
                fonttag = fonttag + "[/color]";
            if (fontclose[i].size == 1)
                fonttag = fonttag + "[/size]";
            bbcodetext = bbcodetext.replace(/<\/FONT>/i, fonttag);
        }

        for (i = 0; anchorlist[i].pos != 0; i++) {

            if (anchorlist[i].pos == 1) {
                bbcodetext = bbcodetext.replace(/<A HREF[^<]*<\/A>/i, anchorlist[i].face);
            }
            if (anchorlist[i].pos == 2) {
                bbcodetext = bbcodetext.replace(/<A HREF/i, "[url");
                bbcodetext = bbcodetext.replace(/<\/A>/i, "[/url]");
            }
            if (anchorlist[i].pos == 3) {
                bbcodetext = bbcodetext.replace(/<A HREF[^>]*>/gi, "[player]");
                bbcodetext = bbcodetext.replace(/<\/A>/i, "[/player]");
            }
        }

        bbcodetext = bbcodetext.replace(/<[^>]*>/g, "");
        bbcodetext = bbcodetext.replace(/>/g, "]");
        bbcodetext = bbcodetext.replace(/\'>/g, "]");
        bbcodetext = bbcodetext.replace(/\">/g, "]");
        bbcodetext = bbcodetext.replace(/\']/g, "]");
        bbcodetext = bbcodetext.replace(/\"]/g, "]");

        for (i = 0; textarealist[i].pos != 0; i++) {
            if (textarealist[i].pos == 1) {
                bbcodetext = bbcodetext.replace(/\[code2\][\w\W]*?\[\/code2\]/i, "[code]" + textarealist[i].face + "[/code]");
            }
        }

        result = bbcodetext;

    } catch (err) { throw err; }

    return result;
}

function do_anchor(fonttext) {
    var i = 0;
    var j = 0;
    var n;
    var pos;
    var subfonttext;

    for (pos = 0; pos != -1; pos) {
        pos = fonttext.toUpperCase().indexOf("<A HREF", pos);

        if (pos != -1) {
            n = fonttext.indexOf(">", pos);

            anchorlist[i] = new item(0, 0, 0, 0, 0);
            anchorlist[i].font = 1;

            subfonttext = fonttext.substring(pos, n);

            if (subfonttext.search(/javascript:AjaxWindow.show\('profile',{char_id:[0-9]{1,15}},'[0-9]{1,15}'\);/i) != -1) {
                anchorlist[i].pos = 3;
            }
            if (subfonttext.search(/javascript:AjaxWindow.show\('fort_battleresultpage',{battleresult_id:[0-9]{1,15}},[0-9]{1,15}\);/i) != -1) {
                anchorlist[i].pos = 1;
                anchorlist[i].face = '';
            }
            else {
                anchorlist[i].pos = 2;
            }

            pos++;
            i++;

        }
        else {
            anchorlist[i] = new item(0, 0, 0, 0, 0);
            anchorlist[i].pos = 0;
        }
    }
}

function do_font(fonttext) {
    var i = 0;
    var j = 0;
    var n;
    var pos;
    var subfonttext;

    fonttext = fonttext.toUpperCase();

    for (pos = 0; pos != -1; pos) {
        pos = fonttext.indexOf("<FONT", pos);

        if (pos != -1) {
            n = fonttext.indexOf(">", pos);

            fontlist[i] = new item(0, 0, 0, 0, 0);
            fontlist[i].pos = pos;
            fontlist[i].font = 1;

            subfonttext = fonttext.substring(pos, n);

            if (subfonttext.search(/FACE/) != -1)
                fontlist[i].face = 1;
            else
                fontlist[i].face = 0;

            if (subfonttext.search(/SIZE/) != -1)
                fontlist[i].size = 1;
            else
                fontlist[i].size = 0;

            if (subfonttext.search(/COLOR/) != -1)
                fontlist[i].color = 1;
            else
                fontlist[i].color = 0;

            pos++;
            i++;

        }
    }

    for (pos = 0; pos != -1; pos) {
        pos = fonttext.indexOf("</FONT>", pos++);

        if (pos != -1) {
            fontclose[j] = new item(0, 0, 0, 0, 0);
            fontclose[j].pos = pos;
            fontclose[j].font = 1;
            for (ii = i - 1; ii >= 0; ii--) {
                if (fontlist[ii].pos < pos) {
                    if (fontlist[ii].font == 1) {
                        fontlist[ii].font = 0;
                        fontclose[j].color = fontlist[ii].color;
                        fontclose[j].size = fontlist[ii].size;
                        fontclose[j].face = fontlist[ii].face;
                        ii = -1;
                    }
                }
            }
            pos++;
            j++;
        }
        else {
            fontclose[j] = new item(0, 0, 0, 0, 0);
            fontclose[j].font = 0;
        }

    }
}

function do_textarea(fonttext) {
    var i = 0;
    var j = 0;
    var n;
    var pos;
    var subfonttext;

    textareatext = fonttext;
    fonttext = fonttext.toUpperCase();

    for (pos = 0; pos != -1; pos) {
        pos = fonttext.indexOf("<TEXTAREA", pos);

        if (pos != -1) {
            n = fonttext.indexOf(">", pos);
            pos = fonttext.indexOf("</TEXTAREA>", n);
            if (pos != -1) {
                textarealist[i] = new item(0, 0, 0, 0, 0);
                textarealist[i].face = textareatext.substring(n + 1, pos);
                textarealist[i].pos = 1;
            }

            pos++;
            i++;

        }
        else {
            textarealist[i] = new item(0, 0, 0, 0, 0);
            textarealist[i].pos = 0;
        }
    }
}

/*
Developed by Robert Nyman, http://www.robertnyman.com
Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function(className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
    nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
    returnElements = [],
    current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
    classesToCheck = "",
    xhtmlNamespace = "http://www.w3.org/1999/xhtml",
    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
    returnElements = [],
    elements,
    node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = [],
            elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
            current,
            returnElements = [],
            match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};

function checkWindows_ToAddFeatures() {
    var elmsID = getElmsRE('div', /^window_reports_show_[0-9]{1,15}$/);

    for (i = 0; i < elmsID.length; i++) {
        if (document.getElementById(elmsID[i])) {

            try {
                addOption(elmsID[i]);
            }
            catch (err) {
                txt += "TW Convert Reports to BBCode\n\n\n";
                txt += "There was a script error on this page.\n\n";
                txt += "Error description: " + err.description + "\n\n";
                txt += "Click OK to continue.\n\n";
                alert(txt);
                //showMessage(txt, 'TW Report to BBCode:\nERROR', 400, 300);
            }
        }
    }

    setTimeout(checkWindows_ToAddFeatures, 1000);
}

	//start up
setTimeout(checkWindows_ToAddFeatures, 1000);


//====================================== Recrutarea din forturi ====================================


function SetFBRLink(div)
{
    var divInstructions = getElmRE('div', /^fortbattle_placement_map_[0-9]{1,3}_instructions$/);
    var divTerrainBg = getElmRE('div', /^fortbattle_placement_map_[0-9]{1,3}_terrainbackground$/);
    var divRecruitPage = getElmRE('div', /^fortbattle_placement_map_[0-9]{1,3}_recruitpage$/);

    var spanRecruits = getElmRE('span', /^fortbattle_placement_map_[0-9]{1,3}_recruits$/);
    var spanRecruitsCancel = getElmRE('span', /^fortbattle_placement_map_[0-9]{1,3}_recruits_cancel$/);
    var spanRecruitsApply = getElmRE('span', /^fortbattle_placement_map_[0-9]{1,3}_recruits_apply$/);

    var divLF = document.createElement('br');

    var lnkName = document.getElementById(divRecruitPage).getElementsByTagName('h2')[0].innerHTML;

    if(!document.getElementById(spanRecruits))
    {
        var divRecruit = document.createElement('a');
        divRecruit.setAttribute('id', 'LnkRecruit');
        divRecruit.setAttribute('onclick', '$("' + divRecruitPage + '").style.display="block"');
        divRecruit.setAttribute('href', '#')
        divRecruit.innerHTML = lnkName;

        if(!document.getElementById('LnkRecruit'))
        {
            document.getElementById(divInstructions).appendChild(divLF);
            document.getElementById(divInstructions).appendChild(divRecruit);
            document.getElementById(spanRecruitsCancel).style.display = 'none';
            document.getElementById(spanRecruitsApply).style.display = 'none';
        }
    }
}

function getElmRE(elm, regexp)
{
    var divEls = document.getElementsByTagName(elm);

    for(i = 0; i < divEls.length; i++)
    {
        if(divEls[i].id.search(regexp) > -1)
        {
            return divEls[i].id;
        }
    }
}

function checkWindows_ToAddFeatures()
{
    var elmID = getElmRE('div', /^fortbattle_screenpage_[0-9]{1,3}/);

    var elm = document.getElementById(elmID);

    if (elm)
    {
        SetFBRLink(elmID);
    }

    setTimeout(checkWindows_ToAddFeatures, 1000);
}

//start up
setTimeout(checkWindows_ToAddFeatures, 1000);


//====================================== Lista locurilor de munca  ====================================


function init() {
	MoCheck.resourceBundle = {
		'dialog.closeAll.popup':'Inchideti toate ferestrele',
		'dialog.minimize.popup':'Minimizeaza fereastra',
		'dialog.close.popup':'Inchide fereastra',
		'dialog.aktListInfo':'by w00w',

		'dialog.tab.work.titel':'Munca',
		'dialog.tab.work.nothingSelected.1':'Adaugati mai mult de un loc de munca',
		'dialog.tab.work.nothingSelected.2':'Pentru adaugarea in lista, mergeti la locul de munca si apasati pe + .',
		'dialog.tab.work.tableHeader.work':'Munca',
		'dialog.tab.work.tableHeader.points':'Puncte de munca',
		'dialog.tab.work.tableHeader.points.popup':'Punctele de munca se vor schimba la fiecare actualizare a hainelor.',
		'dialog.tab.work.tableHeader.wages':'Salariu',
		'dialog.tab.work.tableHeader.experience':'Experienta',
		'dialog.tab.work.tableHeader.luck':'Noroc',
		'dialog.tab.work.tableHeader.motivation':'Motivatie',

		'dialog.tab.configuration.titel':'Configurare',
		'dialog.tab.configuration.header':'Liste disponibile',
		'dialog.tab.configuration.actual':'Actual',
		'dialog.tab.configuration.btnLoad':'Incarca',
		'dialog.tab.configuration.btnDelete':'Sterge',
		'dialog.tab.configuration.btnRename':'Redenumeste',
		'dialog.tab.configuration.btnNew':'Nou',

		'select.option.minutes':'Minute',
		'select.option.hour':'Ora',
		'select.option.hours':'Ore',

		'btnOk.label':'ÐžÐš',
		'btnAdd.popup':'Adauga in lista de munca',
		'btnCenter.popup':'Afisare pe harta',
		'btnDelete.popup':'Sterge munca din lista',

		'message.error.unableToDeleteCurrentList':'Lista actuala nu poate fi stearsa.',
		'message.deleteList':'Sterge lista',
		'message.newName':'Nume nou:',
		'message.addedWork':'Loc de munca adaugat.',
		'message.deleteFromList':'Sterege din lista',
		'message.listLoaded':'Lista a fost incarcata.',
		'message.listDeleted':'Lista a fost stearsa.',
		'message.listRenamed':'Lista a fost redenumita.',
		'message.listCreated':'Lista a fost creata',
		'message.error.nameAlreadyDefined': 'Acest nume este deja folosit.'
	};

	MoCheck.cookieName = 'moScript';

	this.getCookie();
	this.addMotivationButton();
	this.resetSortOrder();

	AjaxWindow.setJSHTML_Motivation = AjaxWindow.setJSHTML;
	AjaxWindow.setJSHTML = function(div,content) {
		AjaxWindow.setJSHTML_Motivation(div,content);
		if(div && div.id) {
			if(div.id.search(/window_job/) != -1) {
				var splt = div.id.split("_");
				var aktJob = MoCheck.createJob(new Job(splt[2], splt[3]));

				var isNewJob = (MoCheck.getAktArbeiten().filter(function(job, index){
				    return (job.pos.x == aktJob.pos.x) && (job.pos.y == aktJob.pos.y);
				})).length == 0;

				if(isNewJob) {
					var btnAdd = new Element('img',{title:'', src:'img.php?type=button&subtype=normal&value=plus', styles:{cursor:'pointer', 'margin-left':'20px'}});
					btnAdd.addMousePopup(new MousePopup(MoCheck.getString('btnAdd.popup'),100,{opacity:0.9}));

					btnAdd.addEvent('click',function(){
						$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
						this.remove();
						MoCheck.getJobInfoFromDiv(div.id, aktJob);
						MoCheck.addArbeit(div.id, aktJob);
					});

					btnAdd.injectInside($ES('h2', div)[0]);
				}
			}
		}
	}
}

function divInject(div,content) {
	div.empty();
	content.inject(div);
}

function createJob(arbeit) {
	var job = new Job(arbeit.pos.x, arbeit.pos.y);
	job.getKey = function() {
		return this.pos.x + '_' + this.pos.y;
	};
	return job;
}

function getArbeiten(listenName) {
	if(this.arbeiten[listenName] == null) {
		this.arbeiten[listenName] = new Array();
	}
	return this.arbeiten[listenName];
}

function getAktArbeiten() {
	return this.getArbeiten(this.aktListe);
}

function initMoJobs() {
	var that = this;
	$each(this.listen, function(liste, index) {
		$each(that.arbeiten[liste], function(arbeit, index) {
			that.arbeiten[liste][index] = that.createJob(arbeit);

		});
	});
	if(AjaxWindow.windows['motivation'] != null) {
		MoCheck.getJobInfoFromServer(0);
	}
}

function resetSortOrder(){
	this.jobSortBy = 'motivation';
	this.jobSortType = 'desc';
}

function loadData(data) {
	data = Json.evaluate(data);
	this.aktListe = $defined(data.aktListe) ? data.aktListe : 'default';
	this.arbeiten = $defined(data.arbeiten) ? data.arbeiten : new Object();
	this.reloadListen();
	this.initMoJobs();
}

/*
 * Ermittelt die verwendeten Listen
 */
function reloadListen() {
	this.listen = new Array();
	for (liste in this.arbeiten) {
		if(this.arbeiten[liste].length > 0) {
			this.listen.push(liste);
		}
	}
	if(!$defined(this.arbeiten[this.aktListe])) {
		this.listen.push(this.aktListe);
	}
}

function sortArbeiten() {
	var that = this;
	this.getAktArbeiten().sort(function sortAsc(a, b){
		a = eval('a.' + that.jobSortBy);
		b = eval('b.' + that.jobSortBy);
		if(that.jobSortType == "asc") {
			return a > b ? 1 : a < b ? -1 : 0;
		} else {
			return a < b ? 1 : a > b ? -1 : 0;
		}
	});
}

function changeSortOrder(sortBy) {
	if(this.jobSortBy == sortBy) {
		this.jobSortType = this.jobSortType == 'asc' ? 'desc' : 'asc';
	} else {
		this.jobSortBy = sortBy;
		this.jobSortType = 'desc';
	}
	MoCheck.printResults();
};

/*
 * Liest alle Informationen zur aktuellen Arbeit und speichert sie in dieser
 * => Hat 'MoCheck.getAktArbeiten()' eine weitere Arbeit?
 		Ja: Server-Anfrage, Informationen auslesen, danach rekursiv naechste Arbeit
 		Nein: Rekusionsabbruch, weiter zu 'printResults()'
 */
function getJobInfoFromServer(jobIndex) {
	if(jobIndex < MoCheck.getAktArbeiten().length) {
		var aktArbeit = MoCheck.getAktArbeiten()[jobIndex];

		new Ajax('game.php?window=job&x='+aktArbeit.pos.x+'&y='+aktArbeit.pos.y,{
			method:'post',
			data:{},
			onComplete:function(data) {
				data=Json.evaluate(data);
				if(data.page!=undefined){
					var page=data.page;

					/* Temporaeren DIV erstellen */
					var divId = 'myJob_' + aktArbeit.getKey();
					var window_div = new Element('div',{'id':divId});
					window_div.setHTML(data.page);
					window_div.injectInside('window_bar');

					/* Informationen auslesen */
					MoCheck.getJobInfoFromDiv(divId, aktArbeit);

					/* Temporaeren DIV wieder loeschen */
					var trashvar = $(divId);
					trashvar.empty();
					trashvar.remove();
					Garbage.trash([trashvar]);

					/*  Rekursiver Aufruf mit naechster Arbeit */
					MoCheck.getJobInfoFromServer(++jobIndex);
				}
			}
		}).request();
	} else {
		AjaxWindow.windows['motivation'].isReady = true;
		MoCheck.printResults();
	}
}

/**
 * Job-Informationen aus einem Job-Div auslesen
 */
function getJobInfoFromDiv(divId, job) {
	job.name = $ES('h2', divId)[0].innerHTML;
	job.image = $ES('h2', divId)[0].style.backgroundImage.match(/images\/jobs\/.*\.[a-z]{3}/i);
	job.wages = parseInt($ES('.bar_perc', divId)[0].innerHTML);
	job.experience = parseInt($ES('.bar_perc', divId)[1].innerHTML);
	job.luck = parseInt($ES('.bar_perc', divId)[2].innerHTML);
	job.motivation = parseInt($ES('.bar_perc', divId)[4].innerHTML);
	job.arbeitspunkte = parseInt($ES('.skill_box_value', divId)[2].innerHTML);
}

/**
 * Motivations-Button zu Menu hinzufuegen
 */

function addMotivationButton() {
	var menuElem = new Element('li',{'id':'menu_motivation'});

	var moBtn = new Element('a',{'title':'', 'class':'button_wrap button', 'style':'white-space:nowrap;', href:'javascript:MoCheck.openMotivationWindow(\'motivation\', \'work\');'});
	moBtn.innerHTML = '<span class=\"button_right\" style="display:inline; width: 128px; height:25px; margin-left:-2px; margin-top:-1px; float:left; background:url(http://shareimage.ro/images/i65cz4rilivn97elpwp.png);"></span>';
	moBtn.injectInside(menuElem);
	menuElem.injectInside($('right_menu'));
	if($ES('a', 'right_menu').length > 7) {
		if($ES('a', 'right_menu').length > 8) {
			if($ES('a', 'right_menu').length > 9) {
				if($ES('a', 'right_menu').length > 10) {
					$('abdorment_right').setStyle('top', parseInt($('abdorment_right').getStyle('top').substring(0, $('abdorment_right').getStyle('top').indexOf("px"))) + 103);
					 } else {
				$('abdorment_right').setStyle('top', parseInt($('abdorment_right').getStyle('top').substring(0, $('abdorment_right').getStyle('top').indexOf("px"))) + 75);
				} } else {
			$('abdorment_right').setStyle('top', parseInt($('abdorment_right').getStyle('top').substring(0, $('abdorment_right').getStyle('top').indexOf("px"))) + 48);
			} } else {
		$('abdorment_right').setStyle('top', parseInt($('abdorment_right').getStyle('top').substring(0, $('abdorment_right').getStyle('top').indexOf("px"))) + 23);
	} }
	if($ES('a', 'left_menu').length > 7) {
		if($ES('a', 'left_menu').length > 8) {
			if($ES('a', 'left_menu').length > 9) {
				if($ES('a', 'left_menu').length > 10) {
					$('abdorment_left').setStyle('top', parseInt($('abdorment_left').getStyle('top').substring(0, $('abdorment_left').getStyle('top').indexOf("px"))) + 103);
					 } else {
				$('abdorment_left').setStyle('top', parseInt($('abdorment_left').getStyle('top').substring(0, $('abdorment_left').getStyle('top').indexOf("px"))) + 75);
				} } else {
			$('abdorment_left').setStyle('top', parseInt($('abdorment_left').getStyle('top').substring(0, $('abdorment_left').getStyle('top').indexOf("px"))) + 48);
			} } else {
		$('abdorment_left').setStyle('top', parseInt($('abdorment_left').getStyle('top').substring(0, $('abdorment_left').getStyle('top').indexOf("px"))) + 23);
	} }
}

/**
 * Oeffnet ein leeres AjaxWindow
 * @windowName
 * @group Vordefinierte Gruppe zum Minimieren, muss aus "AjaxWindow.possibleValues" sein
 */
function openMotivationWindow(windowName, group) {
	$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});

	if(!AjaxWindow.windows[windowName]){
		var window_div = new Element('div',{'id':'window_' + windowName,'class':'window'});
		AjaxWindow.windows[windowName]=window_div;
		var xhtml = '<div class="window_borders">';
		xhtml += '  <h2 id="window_' + windowName + '_title" class="window_title" style="background-image:url(img.php?type=window_title&value=work);"><span>' + windowName + '</span></h2>';
		xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a>';
		xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + windowName + '\', \'' + group + '\');" class="window_minimize"></a>';
		xhtml += '  <a href="javascript:AjaxWindow.close(\''+windowName+'\');" class="window_close"></a>';
		xhtml += '  <div id="window_' + windowName + '_content" class="window_content">';
		xhtml += '    <div class="tab_container" style="margin-left:7px; width:100%; height:275px">';
		xhtml += '      <ul class="tabs">' +
				 '        <li class="active" id="mojob.tab.arbeiten" onclick="MoCheck.showTab(\'moWorkList\');">'+ MoCheck.getString("dialog.tab.work.titel") + '</li>' +
				 '        <li id="mojob.tab.konfiguration" onclick="MoCheck.showTab(\'moConf\');">' + MoCheck.getString("dialog.tab.configuration.titel") + '</li>' +
				 '      </ul>';
		xhtml += '    	<table class="shadow_table">';
		xhtml += '    		<tr>';
		xhtml += '    			<td class="edge_shadow_top_left"></td>';
		xhtml += '    			<td class="border_shadow_top"></td>';
		xhtml += '    			<td class="edge_shadow_top_right"></td>';
		xhtml += '    		</tr>';
		xhtml += '    		<tr>';
		xhtml += '    			<td class="border_shadow_left"></td>';
		xhtml += '    			<td class="shadow_content">';
		xhtml += '    				<div>';
		xhtml += '    					<div style="overflow:auto;width: 675px; height: 275px; position: relative;" id="moWorkList"></div>';
		xhtml += '    					<div style="overflow:auto;width: 675px; height: 275px; position: relative; display:none;" id="moConf"></div>';
		xhtml += '    				</div>';
		xhtml += '    			</td>';
		xhtml += '    			<td class="border_shadow_right"></td>';
		xhtml += '    		</tr>';
		xhtml += '    		<tr>';
		xhtml += '    			<td class="edge_shadow_bottom_left"></td>';
		xhtml += '    			<td class="border_shadow_bottom"></td>';
		xhtml += '    			<td class="edge_shadow_bottom_right"></td>';
		xhtml += '    		</tr>';
		xhtml += '    	</table>';
		xhtml += '      <span style="position:absolute; right:22px;" id="moAktListInfo">&nbsp;</span>';
		xhtml += '      <div id=\"moWork_task_queue\"></div>';
		xhtml += '    </div>';
		xhtml += '  </div>';
		xhtml += '</div>';
		xhtml += '</div>';
		window_div.setHTML(xhtml);
		window_div.injectInside('windows');
		window_div.centerLeft();
		$ES('.window_closeall').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.closeAll.popup")+'<\/b>'));});
		$ES('.window_minimize').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.minimize.popup")+'<\/b>'));});
		$ES('.window_close').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.close.popup")+'<\/b>'));});
		var window_title_div=$('window_'+windowName+'_title');
		window_div.makeDraggable({handle:window_title_div});
		window_title_div.addEvent('dblclick',function(){
					window_div.centerLeft();
					window_div.setStyle('top',133);
				});
		AjaxWindow.bringToTop(window_div);
		window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
		window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));

		var throbber=get_throbber();
		throbber.addClass('window_throbber_wrapper');
		throbber.injectInside($('moWorkList'));

		MoCheck.getJobInfoFromServer(0);
	} else {
		AjaxWindow.maximize(windowName);
	}
}

function doConfiguration(cmd) {
	var msg = '';

	var selectedListe = $('moListen').options[$('moListen').selectedIndex].value;

	switch(cmd) {
		case 'loadListe':
			this.aktListe = selectedListe;
			msg = MoCheck.getString('message.listLoaded', selectedListe);
			break;
		case 'newListe':
			var newName = prompt(MoCheck.getString("message.newName"), '');
			if(newName != null) {
				if($defined(this.arbeiten[newName])) {
					new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
					return;
				}
				this.aktListe = newName;
			}
			msg = MoCheck.getString('message.listCreated', newName);
			break;
		case 'deleteListe':
			if(MoCheck.aktListe == selectedListe) {
				new HumanMessage(MoCheck.getString('message.error.unableToDeleteCurrentList'));
				return;
			}
			if(confirm(unescape(MoCheck.getString('message.deleteList', selectedListe)))) {
				this.arbeiten[selectedListe] = null;
				msg = MoCheck.getString('message.listDeleted', selectedListe);
			}
			break;
		case 'renameListe':
			var newName = prompt(MoCheck.getString("message.newName"), selectedListe);
			if(newName != null) {
				if($defined(this.arbeiten[newName])) {
					new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
					return;
				}
				this.arbeiten[newName] = this.arbeiten[selectedListe];
				this.arbeiten[selectedListe] = null;
				//ggf. aktListe neu setzen
				if(this.aktListe == selectedListe) {
					this.aktListe = newName;
				}
				msg = MoCheck.getString('message.listRenamed');
			}
			break;
	}

	//Aenderungen speichern
	//TODO es muss nicht jedesmal neu geladen werden...
	this.setCookie();
	this.getCookie();

	/* ggf. Nachricht anzeigen */
	if(msg != '') {
		new HumanMessage(msg, {type:'success'});
	}
}

/* Ermittelt die Position der letzten Arbeit */
function getLastWorkPos() {
	last_work_pos = {x:pos.x,y:pos.y};
	for(var i=Tasks.tasks.length-1; i >= 0; i--) {
		if(Tasks.tasks[i].type == 'way') {
			last_work_pos={x:Tasks.tasks[i].data_obj.to_x,y:Tasks.tasks[i].data_obj.to_y};
			break;
		}
	}
	return last_work_pos;
}

/**
 * Eine Arbeit der Liste hinzufuegen
 */
function addArbeit(divId, job) {
	//Arbeit in Array aufnehmen
	MoCheck.getAktArbeiten().splice(0, 0, job);

	//Arbeit ggf. in Tabelle anzeigen
	if($defined(AjaxWindow.windows['motivation']) && AjaxWindow.windows['motivation'].isReady) {
		MoCheck.printResults();
	}

	//Arbeit in Cookie speichern
	this.setCookie();

	new HumanMessage(MoCheck.getString('message.addedWork'), {type:'success'});
}

/**
 * Eine Arbeit aus der Liste entfernen
 */
function deleteArbeit(x, y) {
	$each(MoCheck.getAktArbeiten(), function(aktArbeit, index) {
		if(x == aktArbeit.pos.x && y == aktArbeit.pos.y) {

			if(confirm(unescape(MoCheck.getString('message.deleteFromList', aktArbeit.name)))) {
				//Arbeit aus Array entfernen
				MoCheck.getAktArbeiten().splice(index, 1);

				//Arbeit aus Cookie loeschen
				MoCheck.setCookie();

				//Arbeit-Liste neu laden
				MoCheck.printResults();
			}
		}
	});
}

function getCookie() {
	var data = "{}";
	if (document.cookie.indexOf(MoCheck.cookieName) != -1)  {
		var cookieContent = (document.cookie + ";").match(eval('/' + MoCheck.cookieName + '=.*?;/gi'));
		data = cookieContent[0].substring(MoCheck.cookieName.length + 1, cookieContent[0].length-1);
	}
	MoCheck.loadData(unescape(data));
}
function setCookie() {
	var data = escape('{"aktListe":"' + MoCheck.aktListe + '", ' + MoCheck.exportArbeiten() + '}');
	var expires = new Date();
	expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 365));//1 Jahr
	document.cookie = MoCheck.cookieName + "=" + data + "; expires=" + expires.toGMTString();
}
function exportListe(liste) {
	var str = '';
	var arbeiten = this.getArbeiten(liste);
	$each(arbeiten, function(arbeit, index) {
		str += (str == '' ? '' : ', ') + Json.toString({pos:arbeit.pos});
	});
	return '[' + str + ']';
};
function exportArbeiten() {
	var str = '';
	for (liste in this.arbeiten) {
		//Leere Listen werden nicht gespeichert
		if(this.arbeiten[liste] != null && this.arbeiten[liste].length > 0) {
			str += (str == '' ? '' : ', ') + '"' + liste + '": ' + this.exportListe(liste);
		}
	}
	return '"arbeiten":{'+str+'}';
};

function getString(key, param) {
	var str = $defined(MoCheck.resourceBundle[key]) ? MoCheck.resourceBundle[key] : key;

	if($defined(param)) {
		if (!(param instanceof Array)) { param = new Array(param); }
		for(var i=0; i<param.length; i++) {
			str = str.replace('%'+(i+1), param[i]);
		}
	}
	return str;
};

function getButton(txt, js, deactivated) {
	var href = deactivated ? '' : 'href=\"javascript:'+js+';\"';
	var btnClass = (deactivated ? 'button_grey' : 'button');
	var xhtml = '<a class=\"button_wrap '+btnClass+'\" '+href+' >' +
			 '  <span class=\"button_left\"></span><span class=\"button_middle\">'+txt+'</span><span class=\"button_right\"></span>' +
			 '  <span style=\"clear: both;\"></span>' +
			 '</a>';
	return xhtml;
}

function showTab(tab) {
	var showMoTab = (tab == 'moWorkList');
	$('moWorkList').setStyle('display', showMoTab ? 'block' : 'none');
	$('moConf').setStyle('display', !showMoTab ? 'block' : 'none');
	if(showMoTab) {
		$('mojob.tab.arbeiten').addClass('active');
		$('mojob.tab.konfiguration').removeClass('active');
	} else {
		$('mojob.tab.arbeiten').removeClass('active');
		$('mojob.tab.konfiguration').addClass('active');
	}
}

function setWayTimeInfo(aktJob) {
	var lastWorkPos = (aktJob == null ? MoCheck.getLastWorkPos() : {x:aktJob.pos.x, y:aktJob.pos.y});

	$each(MoCheck.getAktArbeiten(), function(aktJob, index) {
		/* Entfernungs-Hinweis */
		var wayTime = WMap.calcWayTime(lastWorkPos, aktJob.pos);
		var el = $ES('a', $('window_Mojob_' + aktJob.getKey()));
		el.addMousePopup(new MousePopup(wayTime.formatDuration(), 100,{opacity:0.9}));
		el.setStyle('border', ((wayTime > 60 * 30) ? '1px solid red' : ''));
	});
}

function getFillBar(value) {
	var cWidth = 75;
	return 	'<div class="bar" style="width:' + eval(cWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width:'+(value * (cWidth/100))+'px"></div>'+
				'<div class="bar_perc" style="width:'+cWidth+'px">'+value+'%</div>'+
			'</div>';
}

function getConfigurationTab() {
	var moListen = '<select id="moListen" size="1" style="width:200px">';
	$each(MoCheck.listen, function(liste, index) {
		var isSelected = (liste == MoCheck.aktListe ? 'selected' : '');
		var isActual = liste + (liste == MoCheck.aktListe ? ' (' + MoCheck.getString("dialog.tab.configuration.actual") + ')' : '');
		moListen += '			<option value="' + liste + '" ' + isSelected + '>' + isActual + '</option>';
	});
	moListen += '</select>';

	return '<div style="padding:5px">' +
			'	<span><br />' +
					moListen +
					'<br /><br />' +
					MoCheck.getButton(MoCheck.getString("dialog.tab.configuration.btnLoad"), 'MoCheck.doConfiguration(\'loadListe\')', false) +
					MoCheck.getButton(MoCheck.getString("dialog.tab.configuration.btnDelete"), 'MoCheck.doConfiguration(\'deleteListe\')', false) +
					MoCheck.getButton(MoCheck.getString("dialog.tab.configuration.btnRename"), 'MoCheck.doConfiguration(\'renameListe\')', false) +
					MoCheck.getButton(MoCheck.getString("dialog.tab.configuration.btnNew"), 'MoCheck.doConfiguration(\'newListe\')', false) +
			'	</span>' +
			'</div>';
}

/*
 * Stellt zu allen Arbeiten die ausgelesenen Informationen dar
 */
function printResults() {
	$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});

	MoCheck.sortArbeiten();

	Tasks.add_task_queue_xhtml($('moWork_task_queue'), {hide_info_full: true});
	if(MoCheck.getAktArbeiten().length > 0) {

		window.addEvent('domready', MoCheck.divInject.bind(Ajax,[$('moWorkList'), MoCheck.getTable()]));

		/* Buttons aktivieren */
		$each(MoCheck.getAktArbeiten(), function(aktJob, index) {
			//aktJob.window muss neu geladen werden, da zum Zeitpunkt der Variableninitialisierung noch nichts da war
			aktJob.window = $('window_Mojob_' + aktJob.getKey());

 			aktJob.button = new Button('ok', 'normal', 'button_start_task_Mojob_'+aktJob.getKey(), aktJob.start.bind(aktJob));

			/* Nach jedem Klick neu Laden */
			aktJob.button.el.addEvent('click',function(){
				MoCheck.setWayTimeInfo(aktJob);
			});
		});
		MoCheck.setWayTimeInfo();
	} else {
		$('moWorkList').innerHTML =
				"<div style='text-align:center;'><br />" +
				"	<h2>" + MoCheck.getString('dialog.tab.work.nothingSelected.1') + "</h2><br />" +
					MoCheck.getString('dialog.tab.work.nothingSelected.2') +
				"</div>";
	}

	window.addEvent('domready', AjaxWindow.setJSHTML.bind(AjaxWindow,[$('moConf'), MoCheck.getConfigurationTab()]));
	window.addEvent('domready',function(){$('moAktListInfo').innerHTML = MoCheck.getString('dialog.aktListInfo', MoCheck.aktListe);});
}

/*
 * Eigentlicher Seiteninhalt
 */
function getTable() {
	var table=new Element('table', {'class':'table border', styles:{'width':'100%'}});
	var tbody=new Element('tbody');
	var th = new Element('tr', {styles:{'text-align':'center'}});
	th.injectInside(tbody);

	var thName = new Element('th', {styles:{width:'80px'}});
	thName.innerHTML = MoCheck.getString('dialog.tab.work.tableHeader.work');
	thName.injectInside(th);

	var thPunkte = new Element('th', {styles:{'cursor':'help'}});
	thPunkte.innerHTML ="<a href='javascript:MoCheck.changeSortOrder(\"arbeitspunkte\");'>"+
MoCheck.getString('dialog.tab.work.tableHeader.points') + "</a>";
	thPunkte.injectInside(th);
	thPunkte.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.work.tableHeader.points.popup'),100,{opacity:0.9}));

	var thLohn = new Element('th');
	thLohn.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"wages\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.wages') + "</a>";
	thLohn.injectInside(th);

	//, {styles:{width:'152px'}}
	var thEP = new Element('th');
	thEP.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"experience\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.experience') + "</a>";
	thEP.injectInside(th);

	var thLuck = new Element('th');
	thLuck.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"luck\");'>"+ MoCheck.getString('dialog.tab.work.tableHeader.luck') + "</a>";
	thLuck.injectInside(th);

	var thMo = new Element('th');
	thMo.innerHTML = "<a href='javascript:MoCheck.changeSortOrder(\"motivation\");'>"+MoCheck.getString('dialog.tab.work.tableHeader.motivation')+"</a>";
	thMo.injectInside(th);
	var thc4 = new Element('th');
	thc4.innerHTML = "&nbsp;";
	thc4.injectInside(th);


	for(var i=0; i < MoCheck.getAktArbeiten().length;i++){
		var aktArbeit = MoCheck.getAktArbeiten()[i];

		var tr=new Element('tr', {'id': 'window_Mojob_' + aktArbeit.getKey(), styles:{'text-align':'center'}});
		var cName=new Element('td'); MoCheck.getJobImageTable(aktArbeit).injectInside(cName);cName.injectInside(tr);

		var cPunkte=new Element('td');
		cPunkte.innerHTML = '<span class="calculation_visualisation img_equal">' +
'<span class="skill_box_value'+(aktArbeit.arbeitspunkte <= 0? " red_text" :

"")+(aktArbeit.arbeitspunkte > 0? " green_text" : "")+'">'+aktArbeit.arbeitspunkte+'</span></span>';		cPunkte.injectInside(tr);

		var cLohn=new Element('td');
		cLohn.innerHTML = MoCheck.getFillBar(aktArbeit.wages);
		cLohn.injectInside(tr);

		var cEP=new Element('td');
		cEP.innerHTML = MoCheck.getFillBar(aktArbeit.experience);
		cEP.injectInside(tr);

		var cLuck=new Element('td');
		cLuck.innerHTML = MoCheck.getFillBar(aktArbeit.luck);
		cLuck.injectInside(tr);

		var cMo=new Element('td');
		cMo.innerHTML = MoCheck.getFillBar(aktArbeit.motivation);
		cMo.injectInside(tr);

		var aktJobId = aktArbeit.getKey();
		var aa = 	'<select name=\"job_task_time\" style=\"vertical-align:top;\">' +
					'	<option value=\"600\">10 ' + MoCheck.getString("select.option.minutes") + '</option>' +
					'	<option value=\"1800\">30 ' + MoCheck.getString("select.option.minutes") + '</option>' +
					'	<option value=\"3600\">1 ' + MoCheck.getString("select.option.hour") + '</option>' +
					'	<option value=\"7200\" selected>2 ' + MoCheck.getString("select.option.hours") + '</option>' +
					'</select>' +
					'<span id=\"button_start_task_Mojob_' + aktJobId + '\">' +
					'	<a class=\"button_wrap button\" href=\"#\" >' +
					'		<span class=\"button_left\"></span><span class=\"button_middle\">' + MoCheck.getString("btnOk.label") + '</span><span class=\"button_right\"></span>' +
					'		<span style=\"clear: both;\"></span>' +
					'	</a>' +
					'</span>';

		var c4 = new Element('td', {styles:{'white-space':'nowrap'}}); c4.innerHTML = aa; c4.injectInside(tr);

		tr.injectInside(tbody);
	}


	tbody.injectInside(table);
	return table;
}

function getJobImageTable(aktArbeit) {
		var image_div=new Element('div',{styles:{position:'relative', height:'42px', width:'35px', margin:'2px'}});
		var image=new Element('img',{title:'',src:aktArbeit.image,styles:{position:'absolute',left:0,top:0, height:'100%'}});
		image.addMousePopup(new MousePopup(aktArbeit.name,250,{opacity:0.9}));
		image.injectInside(image_div);

		var center = new Element('img',{title:'',src:'images/icons/center.png',styles:{position:'absolute',top:'3px',left:'44px',cursor:'pointer'}});
		center.addMousePopup(new MousePopup(MoCheck.getString('btnCenter.popup'),100,{opacity:0.9}));
		center.addEvent('click',function(){
			WMap.scroll_map_to_pos(aktArbeit.pos.x, aktArbeit.pos.y);
		});
		center.injectInside(image_div);

		var btnDelete = new Element('img',{title:'',src:'images/icons/cancel.png',styles:{position:'absolute',top:'22px',left:'42px',cursor:'pointer', width:'20px'}});
		btnDelete.addMousePopup(new MousePopup(MoCheck.getString('btnDelete.popup'),100,{opacity:0.9}));
		btnDelete.addEvent('click',function(){
			MoCheck.deleteArbeit(aktArbeit.pos.x, aktArbeit.pos.y);
		});
		btnDelete.injectInside(image_div);
	return image_div;
}



var moFunctions = ['init', 'addMotivationButton', 'openMotivationWindow', 'getString', 'showTab', 'createJob', 'getJobInfoFromServer', 'getJobInfoFromDiv',
					'getAktArbeiten', 'getArbeiten', 'initMoJobs', 'resetSortOrder', 'loadData', 'divInject', 'sortArbeiten', 'changeSortOrder', 'printResults',
					'setWayTimeInfo', 'getTable', 'getFillBar', 'getConfigurationTab', 'getButton', 'doConfiguration', 'getJobImageTable', 'getLastWorkPos',
					'addArbeit', 'deleteArbeit', 'getCookie', 'setCookie', 'exportListe', 'exportArbeiten', 'reloadListen'];

var moCheck_script = document.createElement('script');
moCheck_script.type='text/javascript';
moCheck_script.text =  'if(window.MoCheck == undefined) {\n';
moCheck_script.text += '  window.MoCheck = new Object();\n';
for (var i = 0; i< moFunctions.length; i++) {
	var moFunction = moFunctions[i];
	moCheck_script.text += '  MoCheck.' + moFunction + ' = ' + eval(moFunction.toString()) + '\n';
};
moCheck_script.text += '  MoCheck.init();\n';
moCheck_script.text += '}';
document.body.appendChild(moCheck_script);