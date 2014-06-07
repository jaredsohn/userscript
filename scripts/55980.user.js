// ==UserScript==
// @name           OpenBuildScout v2
// @namespace      GLB
// @description    checks a roster to find open builds
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// ==/UserScript==

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

 var obsLink = document.createElement('div');
 obsLink.innerHTML = '<div id="tab_profile" class="tab_off"><a href="#">Run OBS</a></div>';
 obsLink.addEventListener('click',doTheBullDance, false);

 var subhead_link_bar = getElementsByClassName("subhead_link_bar", document);
 subhead_link_bar[0].appendChild(obsLink);

function doTheBullDance() {

  xpr = document.evaluate("//td[@class='player_name']/span/a | //td[@class='player_name_short']/span/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  var thisNode;
  var playerId;
  for (var i = xpr.snapshotLength - 1; i >= 0; --i) {
    thisNode = xpr.snapshotItem(i);
    playerId = thisNode.href.split('player_id=')[1];
    checkBuild(playerId, thisNode);
  }
}

function checkBuild(pid, node) {
  GM_xmlhttpRequest({
      method: "GET",
      url: "http://goallineblitz.com/game/player.pl?player_id="+pid,
      headers: {
        "User-Agent": "Mozilla/5.0",            // Recommend using navigator.userAgent when possible
        "Accept": "text/xml"
      },
      onload: function(response) {
        if (response.responseText.split('div id=\"player_stats').length > 1) {
          // flag it as open
          var newFlagNode = document.createTextNode("[OPEN]  ");    
          node.parentNode.insertBefore(newFlagNode, node);
        }
      }
  });
}

