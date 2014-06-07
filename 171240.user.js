// ==UserScript==
// @name           Facebook Ad Remover
// @description    Removes annoying Facebook ads, and expands the newsfeed!
// @author         William Lewis
// @update		   Cristopher Chacon
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// @version        1.0
// ==/UserScript==

//Parent Element To Ads
grandparent = document.getElementById('globalContainer'); 
var removeAdz = function(){
    //Ads  
    if (document.getElementById('pagelet_canvas_nav_content')!=null) 
        document.getElementById('pagelet_canvas_nav_content').style.visibility = 'hidden'; 
    if (document.getElementById('pagelet_ego_pane')!=null) 
        document.getElementById('pagelet_ego_pane').style.visibility = 'hidden'; 
    if (document.getElementById('pagelet_ego_pane_w')!=null) 
        document.getElementById('pagelet_ego_pane_w').style.visibility = 'hidden'; 
    if (document.getElementById('pagelet_reminders')!=null) 
        document.getElementById('pagelet_reminders').style.visibility = 'hidden'; 
    if (document.getElementById('pagelet_rhc_footer')!=null) 
        document.getElementById('pagelet_rhc_footer').style.visibility = 'hidden';
    if (document.getElementById('rightCol')!=null) 
        document.getElementById('rightCol').style.width = '0px'; 
     if (document.getElementById('contentArea')!=null) 
        document.getElementById('contentArea').style.width = '90%'; 
}
//Below function happens whenever the contents of 
//grandparent change
grandparent.addEventListener("DOMSubtreeModified", removeAdz, true);
//fires off the function to start with
removeAdz();