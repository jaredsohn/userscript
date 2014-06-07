// ==UserScript==
// @name            Pardus Opponent Health Status
// @namespace   http://*.pardus.at/
// @author          Yog
// @version         1.0
// @description  It places shield, armor and hull values above the bars of an opponent you are fighting 
// @include         http://*.pardus.at/ship2opponent_combat.php*
// @include         http://*.pardus.at/ship2ship_combat.php*
// ==/UserScript==

var td = document.getElementsByTagName('td');
  for(var i = 0; i < td.length; i++)
  {
   if(td[i].getAttribute('align') == 'right' && td[i].hasAttribute('valign')) 
   {
    var intable = td[i].getElementsByTagName('table');
      for(var j = 1; j < intable.length; j++)
      {
	  var width = intable[j].getAttribute("width");
	  if(width == '300')
	  intable[j].previousSibling.innerHTML = intable[j].previousSibling.innerHTML + ':&nbsp;' + width*2 + '+';	  
	  else
	  intable[j].previousSibling.innerHTML = intable[j].previousSibling.innerHTML + ':&nbsp;' + width*2;
	  }
   break; 
   }
  }