// ==UserScript==
// @name                XTube Desocializer - Hide Social Buttons below video player
// @namespace	        http://userscripts.org/users/neatwolf
// @description	        Safely and efficiently hides the social buttons below the video player. Safely watch everything you want: say bye bye to accidental "likes" or +1s! It autoupdates to accomodate possible XTube changes.
// @date		2012-08-07
// @version		1.0
// @author		Alessandro Salvati
// @include		http*://*.xtube.*
// @include		http*://xtube.*
// @license		GPL version 3; http://www.gnu.org/copyleft/gpl.html
// @require		http://sizzlemctwizzle.com/updater.php?id=139824&days=1
// ==/UserScript==

//$("body").append("<style type='text/css'>div .share-container{display:none;}</style>");

var getClass = function(clssName, rootNode /*optional root node to start search from*/){

  var root = rootNode || document,
      clssEls = [],
      elems,
      clssReg = new RegExp("\\b"+clssName+"\\b");

  // use the built in getElementsByClassName if available
  if (document.getElementsByClassName){
    return root.getElementsByClassName(clssName);
  }
  
  // otherwise loop through all(*) nodes and add matches to clssEls
  elems = root.getElementsByTagName('*');
  for (var i = 0, len = elems.length; i < len; i+=1){
    if (clssReg.test(elems[i].className)) clssEls.push(elems[i])
  }

  return clssEls;
  
};

getClass('share-container')[0].style.display = "none";


//I'll update the script soon to improve it. It'll inform you automatically when a new version is available.