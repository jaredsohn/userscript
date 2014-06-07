// ==UserScript==
// @name           AntHill set document.title
// @namespace      ThisPage
// @description    set window title to text from headerbar breadcrumbs
// @include        Your AntHill URL goes here
// ==/UserScript==

var objheaderbar = document.getElementById('header-bar');
var headerbartext = ''; 
var anchors = objheaderbar.getElementsByTagName("a"); 
for(var x = 0; x < anchors.length; x++) { 
    if (anchors[x].innerHTML.indexOf('View Project Dashboard') > 0){
        //Administration and Dashboard have the magnifying glass href in the headerbar - we don't want to count that as a breadcrumb
    }else
        if (anchors[x].innerHTML == 'Administration'){
            //Abbreviate 'Administration'
            headerbartext = 'Admin';
        }
        if (anchors[x].innerHTML == 'Dashboard'){
            //Abbreviate 'Dashboard'
            headerbartext = 'Dash';
        }
        if (anchors[x].innerHTML != 'Administration' && anchors[x].innerHTML != 'Dashboard'){
            headerbartext = headerbartext + anchors[x].innerHTML; 
        }
        if (x != anchors.length - 1){
            //If not the last item, add a hypen
            headerbartext = headerbartext + ' - ';
        }
} 

if (anchors.length == 1){
    //if only one breadcrumb, use it (without any abbreviation)
    document.title = anchors[0].innerHTML;
}else{
    document.title = headerbartext;
}