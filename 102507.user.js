// ==UserScript==
// @name       Highlight Editor (EditArea) on Net2Ftp
// @namespace  http://userscripts.org/scripts/source/102507.user.js
// @version    0.4
// @description  Change the editor of net2ftp for and highlighter editor (EditArea)
// @include    http://www.net2ftp.com/*
// @copyright  2011 - Script by @laurenceHR
// ==/UserScript==

function putTag(scr){
    d = document;
    var h=d.getElementsByTagName("head")[0];
    h || (h=d.body.parentNode.appendChild(d.createElement("head")));
    h.appendChild(scr);
}

function loadJS(js){
    d=document;
    var s=d.createElement("script");
    s.type="text/javascript";
    s.src=js;
    putTag(s);
}

function changeEdit(){
$("textarea[name=text]").attr("id","txtedit");
editAreaLoader.init({
            id: "txtedit"      
            ,start_highlight: true
            ,language: "en"
            ,allow_resize: "both"
            ,toolbar: "search, go_to_line, |, undo, redo, |, select_font, |, syntax_selection, |, change_smooth_selection, highlight, reset_highlight, |,word_wrap,|, help"
            //,min_width = 400
            //,min_height = 100
            //,allow_resize: "y"
            ,syntax_selection_allow: "html,php,css,js,python,xml,sql,vb,basic"
            ,allow_toggle: true
            ,word_wrap: false
            ,syntax: "html"    
        });
}

//////////////// MAIN /////////////////

//loadJS("https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js"); //load jquery;
// load Edit Area //
loadJS("http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
loadJS("http://www.cdolivet.com/editarea/editarea/edit_area/edit_area_full.js");
loadJS("http://www.cdolivet.com/editarea/editarea/edit_area/langs/es.js");

window.onload=function(){
    $("a[accesskey=s]").click(function(){eAL.toggle("txtedit");}); //save button bug fixed =)  
    changeEdit();
}