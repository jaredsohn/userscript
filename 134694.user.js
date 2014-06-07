// ==UserScript==
// @id             wololo.net-fe1e1fb2-f1eb-4cab-a0fd-4fee8eb9baac@xnx_test_title
// @name           /talk Custom tittle's
// @version        1.56
// @namespace      xnx_cust_title
// @author         Xian Nox (i just tend to add tittles more often)
// @description    
// @include        http://wololo.net/talk/*
// @run-at         document-end
// ==/UserScript==


var i = 0;
var id = 0;

function get_title(id) {
      //Xian Nox
    if (id == 390)
        return "Nyx Avatar";
      //jc_gargma
    if (id == 517)
        return "Princess Random";
      //fouadtjuhmaster 
    if (id == 1075)
        return "All-in-one Faker";
      //fate6
    if (id == 7326)
        return "/)^3^(\\ {Mahou Pony";
      //qwikrazor87
    if (id == 8591)
        return "Banned";
      //toBsucht 
    if (id == 966)
        return "Very Important Pony";
      //Davee
    if (id == 1400)
       return "l33t h4x0r";
      //rodras
    if (id == 8356)
       return "newb";
      //m0skit0
    if (id == 75)
       return "Thunderbolts and Lightning, very very frightening";
      //neur0n
    if (id == 111)
       return "Usagi-mimi is best mimi";
      //Casavult
    if (id == 4092)
       return "XxMLGxPR0_Sn1p3sxX";
      //Coldbird
    if (id == 442)
       return "a PROfessional";
      //ChemDog
    if (id == 5773)
       return "crazy dancing weirdo man";
      //Wololo
    if (id == 2)
       return "a Bear";
      //thebudds
    if (id == 403)
       return "MJ all day"
      //Dovahkiin
    if (id == 8862)
       return "Fus Ro Dah!!!!"
      //TelcoLou
    if (id == 8535)
       return "Kickin it Old-Shcool"
     //TragicTheBlubbering
    if (id == 87)
       return "Hero of Time"
     //naki-the-curious
    if (id == 3480)
       return "Neko~nyaa";
    return -19;
}

if (window.location.href.indexOf("http://wololo.net/talk/memberlist.php?mode=viewprofile&u=") == 0) {
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

if (window.location.href.indexOf("http://wololo.net/talk/viewtopic.php?") == 0) {
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


var SUC_script_num = 134694; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
