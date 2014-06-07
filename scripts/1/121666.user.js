// ==UserScript==
// @name            Diabolic's HackForums User Links V1.0
// @version         1.0
// @namespace       Diabolic
// @description     This script adds an small bar with hidden spacial links accessible to ub3r and HF administration below your user CP.
// @include         http://*hackforums.net*
// ==/UserScript==

function Ub3rHelper ()
{
  this.location = 'bot';
  
   this.seperator = document.createTextNode (' | ');
  this.botBar = null;
  this.lSpan = null;
  
  if (document.getElementsByClassName ('navigation').length == 1)
  {
    this.botBar = document.getElementsByClassName ('navigation').item (0); 
  }
  
  if (document.getElementsByClassName ('links').length == 1)
  {
    this.lSpan = document.getElementsByClassName ('links').item (0);
  }
}

Ub3rHelper.prototype = {

  buildBar: function ()
  {    
    // Build the new DIV
    var newDiv = document.createElement ('div');
    newDiv.style.cssText = 'border-top: 1px solid #4f3a6b; margin-top: 5px; padding-top: 5px;';
    
    // And the smalltext SPAN to hold the anchors
    var newSpan = document.createElement ('span');
    newSpan.className = 'bigtext';
    newSpan.id = 'botBarSpan';
    
	var banAnchor = this.linkHelper ('Banned', 'http://www.hackforums.net/bans.php', 'bottom');
    var nrlAnchor = this.linkHelper ('Negrep Log', 'http://www.hackforums.net/negreplog.php', '');    
    var postactiv = this.linkHelper ('Post Activity', 'http://www.hackforums.net/postactivity.php', 'bottom');
	
    newSpan.appendChild (nrlAnchor);
    newSpan.appendChild (this.seperator.cloneNode (true));
    newSpan.appendChild (banAnchor);
    newSpan.appendChild (this.seperator.cloneNode (true));
    newSpan.appendChild (postactiv);	
	
	var adddlinks = Array(); 
	adddlinks[0] = this.linkHelper ('RANF', 'http://www.hackforums.net/forumdisplay.php?fid=2', 'bottom');
	adddlinks[1] = this.linkHelper ('Innuendo', 'http://www.hackforums.net/forumdisplay.php?fid=180', 'bottom');
	adddlinks[2] = this.linkHelper ('Lounge', 'http://www.hackforums.net/forumdisplay.php?fid=25', 'bottom');
	adddlinks[3] = this.linkHelper ('Tracking', 'http://www.hackforums.net/private.php?action=tracking', 'bottom');
        adddlinks[4] = this.linkHelper ('Stats', 'http://www.hackforums.net/stats.php', 'bottom');
        adddlinks[5] = this.linkHelper ('Compose PM', 'http://www.hackforums.net/private.php?action=send', 'bottom');
        adddlinks[6] = this.linkHelper ('Melody, Harmony, Rhythm and MP3 ', 'http://www.hackforums.net/forumdisplay.php?fid=37end', 'bottom');
	
	for(var i =0; i<adddlinks.length; i++) {
		newSpan.appendChild (this.seperator.cloneNode (true));
		newSpan.appendChild (adddlinks[i]);	
	}
    
    newDiv.appendChild (newSpan);
    this.botBar.appendChild (newDiv);
  },
  
  modTopBar: function ()
  {
    // Grab the top bar and all anchors within it
    var top = document.getElementById ('panel');
    var tAncs = top.getElementsByTagName ('a');
    
	var banAnchor = this.linkHelper ('Ban Log', 'http://www.hackforums.net/bans.php', 'bottom');
    var nrlAnchor = this.linkHelper ('Negative Reputation Log', 'http://www.hackforums.net/negreplog.php', '');
    var postactiv = this.linkhelper ('Post Activity', 'http://www.hackforums.net/postactivity.php', '');
    
    var tbFrag = document.createDocumentFragment ();
    tbFrag.appendChild (nrlAnchor);
    tbFrag.appendChild (this.seperator.cloneNode (true));
    tbFrag.appendChild (banAnchor);
    tbFrag.appendChild (this.seperator.cloneNode (true));
    tbFrag.appendChild (postactiv);
    tbFrag.appendChild (this.seperator.cloneNode (true));
    
    top.insertBefore (tbFrag, tAncs[3]);
  },
  
  addJumpToBot: function ()
  {    
    var botAnchor = this.linkHelper ('Contact Me', 'http://www.hackforums.net/private.php?action=send&uid=242562&subject=HF Ub3r Script&message=Hi, I need help regarding HF UB3r script. [code] Could you add this link (your custom link from HF) to this script for me. [/code]', '');
    
    this.lSpan.appendChild (this.seperator.cloneNode (true));
    this.lSpan.appendChild (botAnchor);
  },
  
  ready: function ()
  {
    if (this.botBar != null && this.lSpan != null)
    {
      return true;
    }
    
    return false;
  },
  
  linkHelper: function (text, href, name)
  {
    var tNode = document.createTextNode (text);
    
    var anchor = document.createElement ('a');
    anchor.href = href;
    anchor.name = name;
    
    anchor.appendChild (tNode);
    return anchor;
  }

}

var ub3r = new Ub3rHelper ();

if (ub3r.ready ())
{
  ub3r.location == 'bot' ? ub3r.buildBar () : ub3r.modTopBar ();
  ub3r.addJumpToBot ();
}
