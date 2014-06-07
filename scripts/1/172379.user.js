// ==UserScript==
// @name       InoReader Enhancements
// @namespace  IRF
// @version    2.22.14.1
// @description  Fixes a few UI elements for easy reading with InoReader
// @match      https://inoreader.com/*
// @match      http://inoreader.com/*
// @match      https://www.inoreader.com/*
// @match      http://www.inoreader.com/*
// @match      https://beta.inoreader.com/*
// @match      http://beta.inoreader.com/*
// @copyright  2014, Tam Nguyen Photography
// ==/UserScript==

(function() {
    
    var css = "\
.article_title_link { font-weight: bold; }\
.selected { color: white; background-color: #0064cd; }\
.unread_cnt { font-size: 14px; color: #dd4b39; font-weight: bold; }\
.article_unreaded .article_title_link { color: #0000CC; }\
.article_expanded { border-width: 2px !important }\
.article_current { border-left: 2px solid #3b5998; border-color: #3b5998 !important; }\
.article_current .article_title_link { color: #dd4b39 !important; }\
.article_card { border-radius: 6px !important; box-shadow: 3px 3px 3px #ccc; margin-bottom: 20px !important; margin-left: 7px !important; }\
.article_footer { border-left: 4px solid #ddd; border-left: none; margin-bottom: -3px; }\
.article_unreaded { border-color: #3b5998 !important; border-top-color: #3b5998 !important; margin-left: 7px !important; }\
.article { border-left: 2px solid #ddd; }\
.parent_div { font-size: 14px; line-height: 150%; }\
.article_title { max-width: 650px; }\
.article_author { color: black !important; }\
.article_full_contents { line-height: 1.3 !important; }\
";
    // #0000CC unread link color
    // #737AB0 read link color
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node); 
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }
})();
var SUC_script_num = 172379;
try{function updateCheck(a){if(a||parseInt(GM_getValue("SUC_last_update","0"))+864e5<=(new Date).getTime()){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+SUC_script_num+".meta.js?"+(new Date).getTime(),headers:{"Cache-Control":"no-cache"},onload:function(b){var c,d,e,f;e=b.responseText;GM_setValue("SUC_last_update",(new Date).getTime()+"");d=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(e)[1]);c=parseInt(GM_getValue("SUC_current_version","-1"));if(c!=-1){f=/@name\s*(.*?)\s*$/m.exec(e)[1];GM_setValue("SUC_target_script_name",f);if(d>c){if(confirm('There is an update available for the Greasemonkey script "'+f+'."\nWould you like to go to the install page now?')){GM_openInTab("http://userscripts.org/scripts/show/"+SUC_script_num);GM_setValue("SUC_current_version",d)}}else if(a){alert('No update is available for "'+f+'."')}}else{GM_setValue("SUC_current_version",d+"")}}})}catch(b){if(a){alert("An error occurred while checking for updates:\n"+b)}}}}GM_registerMenuCommand(GM_getValue("SUC_target_script_name","???")+" - Manual Update Check",function(){updateCheck(true)});updateCheck(false)}catch(err){}