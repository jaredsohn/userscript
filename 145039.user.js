// ==UserScript==
// @name           Facebook MF Remover Beta
// @description    Removes annoying Facebook line with throw of the friends you know
// @author         Golanova Galina
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// @version        1.1.2
// ==/UserScript==

//Parent Element To ads blocks
grandparent = document.getElementById('globalContainer'); 
var removeAdsFromFb = function(){
//removeAdsFromFb
document.getElementById('megaphone_story_916').style.visibility = 'hidden'; 
document.getElementById('megaphone_story_916').style.display = 'none';
document.getElementById('ruPymkGrid').style.visibility = 'hidden';

//block with ads in right sidebar
document.getElementById('pagelet_ego_pane').style.display = 'none';  
document.getElementById('pagelet_ego_pane').style.visibility = 'hidden';
document.getElementById('pagelet_ego_pane_w').style.display = 'none';  
document.getElementById('pagelet_ego_pane_w').style.visibility = 'hidden';
document.getElementById('pagelet_advertiser_panel').style.display = 'none';  
document.getElementById('pagelet_advertiser_panel').style.visibility = 'hidden';
document.getElementById('pagelet_side_ads').style.display = 'none';  
document.getElementById('pagelet_side_ads').style.visibility = 'hidden';
document.getElementById('u_4_0').style.display = 'none';  
document.getElementById('u_4_0').style.visibility = 'hidden';
document.getElementById('u_4_1').style.display = 'none';  
document.getElementById('u_4_1').style.visibility = 'hidden';

//one more block with ads (*testing)
document.getElementById('u_0_52').style.display = 'none';  
document.getElementById('u_0_52').style.visibility = 'hidden';

}
//Below function happens whenever the contents of 
//grandparent change
grandparent.addEventListener("DOMSubtreeModified", removeAdsFromFb, true);
//fires off the function to start with
removeAdsFromFb();