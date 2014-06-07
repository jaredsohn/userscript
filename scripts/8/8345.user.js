// ==UserScript==
// @name           YouTube Cleaner 3.0
// @namespace      http://tankadillo.com/youtube
// @description    Gets rid of worthless stuff on YouTube!
// @author         raezr
// @include        http://*youtube.com/watch?*
// ==/UserScript==
/*
  This code is licenced under the GPL
  http://www.fsf.org/licensing/licenses/gpl.html
*/

// if the browser doesn't support the GM functions
if(typeof(GM_getValue) == 'undefined') var GM_getValue = function(){return false;};
if(typeof(GM_setValue) == 'undefined') var GM_setValue = function(){};
if(typeof(GM_registerMenuCommand) == 'undefined') var GM_registerMenuCommand = function(){};

var badBlocks = {'comments' : 'watch-comments-stats',
                 'morefrom' : 'more-from-panel',
                 'related'  : 'watch-related-videos-panel',
                 'footer'   : 'old-footer',
                 'promoted' : 'watch-promoted-container',
                 'sharing'  : 'watch-active-sharing'};

for(var blockId in badBlocks)
{
  var block = document.getElementById(badBlocks[blockId]);
  if(block != null // sometimes this happens for some reason
      && GM_getValue(blockId) != true) // sections that the user wants to be shown aren't touched
    block.style.display = 'none'; // everything else is removed!
}

var toggleBlock = function(blockId) // your classic 'toggle' function
{
  var block = document.getElementById(badBlocks[blockId]);
  if(block.style.display == 'none')
  {
    block.style.display = 'block';
    GM_setValue(blockId,true);
  }
  else
  {
    block.style.display = 'none';
    GM_setValue(blockId,false);
  }
}

// the menu functions
GM_registerMenuCommand('Toggle Comments',       function(){toggleBlock('comments');} );
GM_registerMenuCommand('Toggle More from user', function(){toggleBlock('morefrom');} );
GM_registerMenuCommand('Toggle Related',        function(){toggleBlock('related');}  );
GM_registerMenuCommand('Toggle Footer',         function(){toggleBlock('footer');}   );
GM_registerMenuCommand('Toggle Promoted',       function(){toggleBlock('promoted');} );
GM_registerMenuCommand('Toggle Sharing',        function(){toggleBlock('sharing');}  );