// ==UserScript==
// @name        InoReader Compact
// @namespace   http://thekryz.de
// @version     2013.09.20
// @description Makes InoReader more compact
// @match       https://inoreader.com/*
// @match       http://inoreader.com/*
// @match       https://www.inoreader.com/*
// @match       http://www.inoreader.com/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @grant       GM_openInTab
// @copyright   2013 Christian Hoffmann
// ==/UserScript==

(function() {
    
var css = "\
  html, body                { /* smaller font */ font-size: 11px ! important; }\
  .article_header           { /* eliminates some space in an article line */ padding-top: 1px ! important; height:14px; }\
  .article_header,\
  .article_header_text      { /* corrects line-height as it was conflicting with http://userstyles.org/styles/90012/inoreader-colorful-feeds */ line-height:12px ! important; }\
  .article_unreaded,\
  .article_current,\
  .article                  { /* eliminates lots of space in unread articles */ padding: 0px ! important; border-top: 0px ! important; margin: 0px ! important;}\
  .article_full_contents    { /* fixes unread article under open one */ padding-bottom: 5px ! important; }\
  .ar_showed                { /* fixes unread article under open one */ padding: 0px ! important; border-top: 0px ! important; margin: 0px ! important; margin-bottom: 0px ! important; }\
  .header_date              { /* corrects position of article date (now centered vertically again) */ padding: 2px 0 0 ! important; }\
  .header_buttons           { /* slightly corrects header buttons on the right */ padding: 0 0 0 5px ! important; }\
  .header_buttons img       { /* corrects position and size of header buttons on the right */ height:13px ! important; width:13px ! important; padding-bottom: 2px ! important; }\
  .article_header div a img { /* fixes position of marking star on the left of an article */ height:13px ! important; width:13px ! important; padding-bottom: 2px ! important; padding-left: 2px ! important }\
  #view_toolbar div         { /* bigger size for current folder name on top bar */ font-size: 14px ! important; padding-left: 15px ! important; font-weight: bold ! important; }\
  #tree_pane                { /* less space for the left sidebar */ width: 260px ! important; }\
";

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

var SUC_script_num = 0; //TODO: fix!
try{function updateCheck(a){if(a||parseInt(GM_getValue("SUC_last_update","0"))+864e5<=(new Date).getTime()){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+SUC_script_num+".meta.js?"+(new Date).getTime(),headers:{"Cache-Control":"no-cache"},onload:function(b){var c,d,e,f;e=b.responseText;GM_setValue("SUC_last_update",(new Date).getTime()+"");d=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(e)[1]);c=parseInt(GM_getValue("SUC_current_version","-1"));if(c!=-1){f=/@name\s*(.*?)\s*$/m.exec(e)[1];GM_setValue("SUC_target_script_name",f);if(d>c){if(confirm('There is an update available for the Greasemonkey script "'+f+'."\nWould you like to go to the install page now?')){GM_openInTab("http://userscripts.org/scripts/show/"+SUC_script_num);GM_setValue("SUC_current_version",d)}}else if(a){alert('No update is available for "'+f+'."')}}else{GM_setValue("SUC_current_version",d+"")}}})}catch(b){if(a){alert("An error occurred while checking for updates:\n"+b)}}}}GM_registerMenuCommand(GM_getValue("SUC_target_script_name","???")+" - Manual Update Check",function(){updateCheck(true)});updateCheck(false)}catch(err){}