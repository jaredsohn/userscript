// ==UserScript==
// @name           PWM Silencer
// @namespace      Atęszion^whore^silencer
// @description    Topic ignore feature for PWM. Based on PhpBB enhancer from Alekc (http://userscripts.org/scripts/show/57924)
// @author         Nemo
// @version        1.0.1
// @include        http://pwm.org.pl/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var phpbb_prefs;
var debug = false;

debugLog("Begin userscript execution");

jQuery(document).ready(function() {
   try{
   debugLog("Ready");
    if (jQuery("body#phpbb").length != 1){
      debugLog("This isn't even a phpBB forum.");
        return false;
    }
   
   debugLog("Initializing JQuery");
    var $j = jQuery.noConflict();
    var regex = /t=(\d+)/g;

   debugLog("Loading blocked thread list");
    phpbb_prefs = eval(GM_getValue("hb_helper_prefs" + jQuery(document).attr("domain"),{hiddenTopics:{}}));
    GM_log(phpbb_prefs.toSource());

   debugLog("Searching for threads");
    $j("li.row").each(function(){
        var topicId = $j(this).find("a.topictitle").attr("href").match(/t=(\d+)/);
        if(topicId == null) {
           topicId = $j(this).find("a.topictitle").attr("href").match(/-t(\d+)\.html/);
      }
        debugLog(topicId);
        if (phpbb_prefs.hiddenTopics[topicId[1]] == true){           
            $j(this).hide();
        } else {
            $j(this).find("dt").css("position","relative").append("<div style='position:absolute;top:0px;right:0px;'><a class='pbe' href='" + topicId[1] + "' title=\"Ignore this thread\">[x]</a></div>");
        }
    });

    $j("a.pbe").click(function(e){
        try{
            $j(this).parents("li").hide("slow");

            phpbb_prefs.hiddenTopics[$j(this).attr("href")] = true;
            GM_setValue("hb_helper_prefs" + jQuery(document).attr("domain"), phpbb_prefs.toSource());
        } catch (err){GM_log(err.toSource());}
        return false;
    });
   } catch (err){GM_log("Fatal exception inspecting topic:" + err.toSource());}
});

function debugLog(msg){
   if (debug){
      GM_log("H-B Helper: " + msg);
   }
}