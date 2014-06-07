// Wichtige Informationen:
// Dieses Script wurde von SVZ-Scripter.de auf Viren & Werbung überprüft.
// Alle Updates werden ebenfalls überprüft. Diese kommen ebenfalls vom Author
//
// ========================================
// Author: Tim
//
// Überprüft durch: SVZ-Scripter.de
// 
// ========================================
//
// ==UserScript==
// @name           Eigene Informationen
// @description    Mit diesem Script wird jedem Profil eine neue Eigenschaft hinzugefügt, wo Du Notitzen/extra Informationen/Kontaktdaten oder was Du auch immer willst abspeichern kannst.
// @include        http://www.schuelervz.net/*
// @include        http://www.studivz.net/*
// @include        http://www.meinvz.net/*
// @version        1.0
// ==/UserScript==

//Extra Informationen
if(document.getElementById('Profile_InformationSnipplet'))
{
    document.getElementById('Profile_InformationSnipplet').innerHTML += '<h3 class="clearFix">Eigene Infos <a id="eigeneinfos_edit" href="javascript:;">[bearbeiten]</a></h3><div class="labeledText" id="eigeneinfos"></div>';
   
    var eigeneinfos_div = document.getElementById('eigeneinfos');
    var eigeneinfos_user = window.location.href.match(/Profile\/([A-Za-z0-9]{16})/)[1];

    function eigeneinfos_format(string)
    {
         if(string=='')
         {
            return '<i>Keine</i>';
        }
        return string.replace(/\n/g,"<br/>");
    }
   
    function eigene_infos_laden(user)
    {
         var eigeneinfos_load = GM_getValue('EigeneInfos'+user);
         if(!eigeneinfos_load)
         {
              eigeneinfos_load = '';
        }
        return eigeneinfos_load;
    }
   
    function eigeneinfos_edit_feld(user,target)
    {        
        target.innerHTML = '<textarea onkeydown="var text_arr = this.value.split(\'\\n\'); if(text_arr.length>3) { this.rows = text_arr.length; }" style="height: auto; width: 100%;" id="eigeneinfos_edit_feld" rows="3" cols="45">'+eigene_infos_laden(user)+'</textarea><br/><input id="eigeneinfos_save" class="fieldBtnSubmit" type="button" value="Speichern"/>';          
        document.getElementById('eigeneinfos_save').addEventListener('click', function () { eigeneinfos_edit_speichern(user,target,'eigeneinfos_edit_feld'); }, false);
    }
   
    function eigeneinfos_edit_speichern(user,target,source)
    {
         var eigeneinfos_new = document.getElementById(source).value;      
         GM_setValue('EigeneInfos'+user,eigeneinfos_new);
            
        target.innerHTML = eigeneinfos_format(eigeneinfos_format(eigeneinfos_new));
    }
   
    eigeneinfos_div.innerHTML = eigeneinfos_format(eigene_infos_laden(eigeneinfos_user));  
    document.getElementById('eigeneinfos_edit').addEventListener('click', function() { eigeneinfos_edit_feld(eigeneinfos_user,eigeneinfos_div); }, false);
} 