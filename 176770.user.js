// ==UserScript==
// @name        Facebook-Ad-Sidebar-Remover
// @description Removes the right panel with ads on (German) Facebook and all suggested posts which contain diet and fatshaming stuff.
// @homepage	http://femgeeks.de/wp-content/uploads/removefbad.user_.js
// @include     http*.facebook.com*
// @author      Femgeeks
// @version     1.1
// ==/UserScript==

var DIV_EGO_PANE = 'pagelet_ego_pane';
var DIV_EGO_PANE_W = 'pagelet_ego_pane_w';
var DIV_ORGANIC_EGO_PANE = 'pagelet_organic_ego_pane';
var DIV_SIDE_ADS = 'pagelet_side_ads';
var CLASS_UNIFIED_STORY = 'uiUnifiedStory';
var SUGGESTED_POST = 'Empfohlener Beitrag';
/* feel free to add more keywords, but keep the format */
var BAD_WORDS = /kg|Gewicht|Diät|Abnehmen|abnehmen|Kilo|Dick|dick|Fett|fett|Bauchfett/;

/**
 * removes the right advertisment sidebar(s)
 */
function removeContainers() {
  var i, element;
  var containers = new Array(
          DIV_EGO_PANE,
          DIV_EGO_PANE_W,
          DIV_ORGANIC_EGO_PANE,
          DIV_SIDE_ADS
          );

  for (i = 0; i < containers.length; i++) {
    element = document.getElementById(containers[i]);
    if (null !== element) {
      element.parentNode.removeChild(element);
    }
  }
}

/**
 * removes all suggested posts which contain bad diet and fatshaming stuff
 */
function removeSuggestedPosts() {
  var i, elements = document.getElementsByClassName(CLASS_UNIFIED_STORY);
  for (i=0; i<elements.length; i++) {
    var html = elements[i].innerHTML;
    if (html.search(SUGGESTED_POST) !== -1) {
      if (html.search(BAD_WORDS) !== -1) {
        elements[i].parentNode.removeChild(elements[i]);
      }
    } 
  }
}
/* execute when the page is loaded */
window.onload = function() {
  removeContainers();
  removeSuggestedPosts();
};
