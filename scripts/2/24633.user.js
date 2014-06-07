// ==UserScript==
// @name           South Park player full screen
// @namespace      aca744c7-4a48-4786-bf2e-837b49a7ed91
// @description    Enable full screen view in South Park Episode Player (www.southparkstudios.com). With problems please contact <intgr@juffo.org>
// @include        http://www.southparkstudios.com/episodes/*
// ==/UserScript==

/* Heck knows why they disabled full screen viewing... Maybe it made someone's
 * computer catch fire? Well, whatever.
 */

function enable_fullscreen()
{
  nodes = document.evaluate('//object/param[@name="allowFullScreen"]',
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for(var i = 0; i < nodes.snapshotLength; i++)
  {
    var node = nodes.snapshotItem(i);
    node.setAttribute('value', 'true');
  }
}

/* Clicks on the episode browser don't reload the page; so we have to handle clicks there. */
document.getElementById('content_epfinder').addEventListener('click', enable_fullscreen, false);

enable_fullscreen();

