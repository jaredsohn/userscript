// ==UserScript==
// @id             PRO-fe1e1fb2-f1eb-4cab-a0fd-4fee8eb9baac@xnx_test_title
// @name           PRO Custom tittle's
// @version        1.05
// @namespace      xnx_cust_PRO_title
// @author         John Omnivis (thanks to Xian Nox)
// @description    
// @include        http://forum.prometheus.uk.to/*
// @run-at         document-end
// ==/UserScript==


var i = 0;
var id = 0;

function get_title(id) {
      //fate6
    if (id == 340)
        return "Mahou Pony";
      //Coldird
    if (id == 2)
       return "a PROfessional";
      //HeroKing
    if (id == 64)
       return "Heroic King";
      //Crispy
    if (id == 56)
       return "Nice and Toasty";
      //The Beginning
    if (id == 75)
       return "Over so soon ?";
      //jc_gargma
    if (id == 291)
       return "Princess Random";
     //naki-the-curious
    if (id == 139)
       return "Neko~nyaa";
    return -19;
}

if (window.location.href.indexOf("http://forum.prometheus.uk.to/memberlist.php?mode=viewprofile&u=") == 0) {
    id = window.location.href.substr(57);
    if (get_title(id) != -19) {
        var x = document.getElementsByTagName("dl");
        for (i = 0; i < x.length; i++) {
            if(x[i].innerHTML.indexOf("User avatar") != -1) {
                x[i].innerHTML += "<dd style=\"text-align: center;\">"+get_title(id)+"</dd>";
            }
        }
    }
}

if (window.location.href.indexOf("http://forum.prometheus.uk.to/viewtopic.php?") == 0) {
    var x = document.getElementsByTagName("dl");
    for (i = 0; i < x.length; i++) {
        if(x[i].innerHTML.indexOf("./memberlist.php?mode=viewprofile&amp;u=") != -1) {
            var split = x[i].innerHTML.indexOf("<dd>&nbsp;</dd>");
            var yav = x[i].innerHTML.substr(x[i].innerHTML.indexOf("./memberlist.php?mode=viewprofile&amp;u=") + 40);
            id = yav.substr(0, yav.indexOf('"'));
            if (get_title(id) != -19) {
                var t2 = x[i].innerHTML.substr(split);
                var t1 = x[i].innerHTML.substr(0, split);
                x[i].innerHTML = t1 + "<dd>"+get_title(id)+"</dd>" + t2;
            }
        }
    }
}


var SUC_script_num = 132090; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}