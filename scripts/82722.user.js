// ==UserScript==
// @name           De-Junk Facebook
// @namespace      facebookDe-Junk
// @include        *facebook.com*
// @author         Manish Vij, based on code by camdo2
// @version			   1.4
// @license			   GPL; http://www.gnu.org/copyleft/gpl.html
// @datecreated		 2010-07-31
// @lastupdated		 2010-12-24
// ==/UserScript==

removeContent('pagelet_netego');
removeContent('pagelet_adbox');
removeContent('pagelet_questionsbox');
removeContent('pagelet_netego_lower');
removeContent('pagelet_netego_questions');
removeContent('pagelet_trending_tags_and_topics');
removeContent('navItem_questions');
removeContent('mbl');
removeContent('pagelet_ads');
removeContent('ego_pane');
removeClass('UIStandardFrame_SidebarAds');
removeClass('adcolumn');
removeClass('PYMK_Reqs_Sidebar');
removeClass('hp_connect_box');
removeClass('ego_column');
removeClass('ego_section');

function removeContent(id) {
  var node = document.getElementById(id);
  if (node) {
	  node.parentNode.removeChild(node);
	  node = null;
  }
}

function removeClass(cls) {
  
  var cool = document.getElementsByClassName(cls);
 
  if (cool.length > 0) {
    for(var d = 0; d < cool.length; d++) {
      cool[d].parentNode.removeChild(cool[d]);
      cool[d] = null;
    }
  }
}

document.getElementsByClassName = function(clsName){
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className.indexOf(" ") >= 0){
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++){
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}