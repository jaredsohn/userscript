// ==UserScript==
// @name           ET Inline Embedder
// @namespace      http://userscripts.org/users/aronchick
// @include        *
// @exclude        http://*.entertonement.com
// @exclude        http://entertonement.*
// @exclude        http://*.entertonement.*
// ==/UserScript==

  var etRegex = '^(http.+?entertonement\.com\/clips\/[\\d]+)\/?([\\w\\d\/-]+)*';
  var clipRegex = '[\d]+\/?([\w\d\/-]+)*';
 
/* randomUUID.js - Version 1.0
 * 
 * Copyright 2008, Robert Kieffer
 * 
 * This software is made available under the terms of the Open Software License
 * v3.0 (available here: http://www.opensource.org/licenses/osl-3.0.php )
 *
 * The latest version of this file can be found at:
 * http://www.broofa.com/Tools/randomUUID.js
 *
 * For more information, or to comment on this, please go to:
 * http://www.broofa.com/blog/?p=151
 */
 
/**
 * Create and return a "version 4" RFC-4122 UUID string.
 */
function randomUUID() {
  var s = [], itoh = '0123456789ABCDEF';
 
  // Make array of random hex digits. The UUID only has 32 digits in it, but we
  // allocate an extra items to make room for the '-'s we'll be inserting.
  for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);
 
  // Conform to RFC-4122, section 4.4
  s[14] = 4;  // Set 4 high bits of time_high field to version
  s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence
 
  // Convert to hex chars
  for (var i = 0; i <36; i++) s[i] = itoh[s[i]];
 
  // Insert '-'s
  s[8] = s[13] = s[18] = s[23] = '_';
 
  return s.join('');
}

page_links = document.links;
for(var i=0; i<page_links.length; i++)
{
  var curlink = page_links[i];

  // Below for debugging
  // etRegex = '^(http.+?entertonement\.com\/clips\/[\\d]+)\/';
  if (i < 1)
  {
       //alert('foo');  
  }
    //alert(curlink)
  
  if(curlink.href.match(etRegex) != null)
    {
      var thisUUID = randomUUID();
      //<embed src="http://media.entertonement.com/embed/InlinePlayer.swf" id="3_e6c96a58_c7c7_11dd_a7c9_0015c5f4d4ea" name="3_e6c96a58_c7c7_11dd_a7c9_0015c5f4d4ea" flashvars="channel_id=&mediadomain=media.entertonement.com&background=&meta_url=http%3A%2F%2Fwww.entertonement.com%2Fclips%2F8419.query&domain=http%3A%2F%2Fwww.entertonement.com%2F&id=3_e6c96a58_c7c7_11dd_a7c9_0015c5f4d4ea&skin=" width="18" height="18" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" allowscriptaccess="always" wmode="transparent" style="vertical-align: bottom; margin: auto 3px;"></embed><a href="http://www.entertonement.com/clips/8419/Charles-Barkley/NBA/Sports/A-lot-of-money?ht_link=3_e6c96a58_c7c7_11dd_a7c9_0015c5f4d4ea"><img alt="Blank" border="0" height="0" src="http://www.entertonement.com/widgets/img/clip/8419/3/3_e6c96a58_c7c7_11dd_a7c9_0015c5f4d4ea/blank.gif" style="visibility: hidden; width: 0px; height: 0px; margin:0; padding:0; float:right" width="0" /></a><img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://counters.gigya.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEyMjkwMjk2MDgxOTQmcHQ9MTIyOTAyOTYxNzg*NCZwPTI*ODA2MSZkPSZnPTEmdD*mbz1lZGFkNjJmMDg3ZjE*NWViOWQ*MDFmZjcwYWM5NzA2OQ==.gif" />
      //alert(curlink.previousSibling.nodeName);
	  var previousNodeName = curlink.previousSibling.nodeName;
	  if((previousNodeName.match(/embed/gim)) || (previousNodeName.match(/object/gim)))
	  {
    	  continue;
   	  }
	  
	  embedder = document.createElement('embed');
	  embedder.setAttribute('src','http://media.entertonement.com/embed/InlinePlayer.swf');
	  embedder.setAttribute('id',thisUUID);
	  embedder.setAttribute('name',thisUUID);
	  embedder.setAttribute('flashvars','channel_id=&mediadomain=media.entertonement.com&background=&meta_url='+encodeURI(curlink.href.match(etRegex)[1])+'.query&id='+thisUUID+'&domain=http%3A%2F%2Fwww.entertonement.com%2F');
	  embedder.setAttribute('width','18');
	  embedder.setAttribute('height','18');
	  embedder.setAttribute('type','application/x-shockwave-flash');
	  embedder.setAttribute('pluginspage','http://www.macromedia.com/go/getflashplayer');
	  embedder.setAttribute('allowscriptaccess','always');
	  embedder.setAttribute('wmode','transparent');
      embedder.setAttribute('style','vertical-align: bottom; margin: auto 3px;');
      curlink.parentNode.insertBefore(embedder, curlink.nextSibling)
    }
  //if (i > 2) break;00
}
