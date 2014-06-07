// ==UserScript==
// @name       Joomla! 3.x - CTRL+S save method
// @namespace  http://www.bonkestoter.com/
// @version    0.2
// @description  enter something useful
// @include		*/administrator/index.php?option=com_content&view=article&layout=edit*
// @copyright  2013 Bonkestoter.com. All rights reserved
// ==/UserScript==

var isCtrl = false;
document.onkeyup=function(e){
    if(e.keyCode == 17) isCtrl=false;
}

document.onkeydown=function(e){
    if(e.keyCode == 17) isCtrl=true;
    if(e.keyCode == 83 && isCtrl == true) {
        // Save the Article!
        Joomla.submitbutton('article.apply');
        return false;
    }
}