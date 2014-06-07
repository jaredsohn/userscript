// ==UserScript==
// A modify version of the add @hotmail.com script
// @modify by:                  webmastertgp
// @name          hotmail_login_enhancer
// @description   Don't you just hate adding those "@hotmail.com" each time you need to login to hotmail and unselect the "Rememerme on this machine"? Well, fear not this script does it for you. Updated for the new hotmail login page.
// @include       http://login.live.com/*
// @include       http://www.latino.msn.*
// @include       http://latino.msn.com/*
// ==/UserScript==
 
// Begin Script Update Checker code
var SUC_script_num = 40034;
var version_timestamp = 126953290000; // This is here for the previous version of the updater script to find.
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'." :( ');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
// End Script Update Checker code

String.prototype.isEmpty = function(){
    this.replace(/\s/g,'');
    if(this == '') return true;
    return false;
}

function addomain(e){
    var target = e ? e.target : this;
    if(target.value.indexOf("@hotmail.com") < 0 && !target.value.isEmpty()) target.value = target.value+"@hotmail.com";
    var node = document.getElementById("i0201"); //obtiene el checkbox de recordar mi cuenta
    var att = node.getAttributeNode("checked"); //obtiene el nodo checked en checkbox de recordar mi cuenta
    node.value="0";
    node.removeAttributeNode(att); // elimina atributo checked de el checkbox de recordar mi cuenta
}

window.addEventListener("load", function(){
    var page=window.location;
    //alert(page);
    //if(page.indexOf("msn.com") > 0)
    if(page=="http://latino.msn.com/?ocid=hmlogout")
       {
           //alert('pagina: ' + page);
           setTimeout('window.location.replace("http://www.hotmail.com/")',2000)
       }
    else
       {
           //http://login.live.com/login.srf
           //alert('mas: '+page);
           var loginInput = document.getElementById("i0116");
           loginInput.addEventListener("blur", addomain, true);
       }
}, true);