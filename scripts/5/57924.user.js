// ==UserScript==
// @name           PhpBB Enhancer
// @namespace      blog.alekc.org
// @description    PhpBB enhancer
// @author         Alekc (alekcander@gmail.com)
// @version        1.0.1
// @include        http://www.phpbb.com/comunity
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var phpbb_prefs;
var debug = false;
pLog("Esecuzione");

jQuery(document).ready(function() {
	try{
	pLog("Ready");
    if (jQuery("body#phpbb").length != 1){
		pLog("Non è un forum PHPBB");
        return false;
    }
    
	//Inizializzazione
	pLog("Inizializzazione JQuery");
    var $j = jQuery.noConflict();
    var regex = /t=(\d+)/g;

	//carico le preferenze
	pLog("Caricamento Preferenze");
    phpbb_prefs = eval(GM_getValue("phpbb_prefs" + jQuery(document).attr("domain"),{hiddenTopics:{}}));
    GM_log(phpbb_prefs.toSource());

    //sfoglio le righe del post
	pLog("Ricerca Righe");
    $j("li.row").each(function(){
        //trovo link
        var topicId = $j(this).find("a.topictitle").attr("href").match(/t=(\d+)/);               
        if (phpbb_prefs.hiddenTopics[topicId[1]] == true){           
            $j(this).hide();
        } else {
            $j(this).find("dt").css("position","relative").append("<div style='position:absolute;top:0px;right:0px;'><a class='pbe' href='" + topicId[1] + "'><img src='http://www.interactivebrokers.com/images/common/red_x.gif'></img></a></div>");
        }
    });

    $j("a.pbe").click(function(e){
        try{
            $j(this).parents("li").hide("slow");

            phpbb_prefs.hiddenTopics[$j(this).attr("href")] = true;
            GM_setValue("phpbb_prefs" + jQuery(document).attr("domain"), phpbb_prefs.toSource());

            //GM_log(eval(GM_getValue("phpbb_prefs")).toSource());
        } catch (err){GM_log(err.toSource());}
        return false;
    });
	} catch (err){GM_log("Errore Grave:" + err.toSource());}
});

function pLog(msg){
	if (debug){
		GM_log(msg);
	}
}