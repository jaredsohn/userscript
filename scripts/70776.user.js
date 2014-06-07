// ==UserScript==
// @name           What.CD :: Snatches
// @namespace      http://www.what.cd
// @description    Puts a direct link to user snatches on user menu on every page
// @include        http*://*what.cd/*
// @version        0.2
// ==/UserScript==

(function() {

 /* var definitions borrowed from What.CD :: Post History Catch Up
    All Credits go to carlosr on What CD
 */
  var whatcd_base_url = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];
  var target = document.getElementById('userinfo_username').getElementsByTagName('li');
  var userId = target[0].innerHTML.match(/[0-9]{1,}/);
    
    if (userId != null) {
      /* If you prefer the old location, uncomment from here... 
      
      userStats = document.getElementById("userinfo_stats");
    
       if (userStats != null)
         userStats.innerHTML += "<li id=\"stats_snatched\"><a href=\"torrents.php?type=snatched&amp;userid=" + userId + "\">&nbsp;&nbsp;Snatches</a></li>";
      
      to here */
      
      
      // Now we locate on userinfo_minor (Seems more related). If you prefer old location comment from here..
      
      userMinor = document.getElementById("userinfo_minor");
      
      if (userMinor != null) {
        
        snatchedLi = document.createElement("li");
        snatchedLi.innerHTML = "<a href=\"torrents.php?type=snatched&amp;userid=" + userId + "\">Snatches</a>";
        
        if (snatchedLi != null) {
          userMinor.insertBefore(snatchedLi,userMinor.childNodes[4]);// Feel free to change the location (first is 0)
        }
      }
      
      // to here :)
  }
        /* Script Update Checker from: http://userscripts.org/scripts/show/20145 */
  var SUC_script_num = 70776; // Change this to the number given to the script by userscripts.org (check the address bar)
  try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
  /* Script Update Checker from: http://userscripts.org/scripts/show/20145 */
  
})();
