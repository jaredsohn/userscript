// Hello World! example user script
// version 0.3
// 2009-04-19
// Copyright (c) 2008-2009, Piotr Gaczkowski
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Last.FM Album Player
// @namespace     http://leto.homedns.org/~doomhammer
// @description   Enables users to use standalone player for albums instead of Flash-based one.
// @include       http://www.last.fm/music/*/*
// @include       http://www.lastfm.*/music/*/*
// ==/UserScript==

/*
 * TODO:
 * - Make asynchronous calls
 * - Prettier link?
 */

/*
 * Global constants
 */
ALBUM = 8;
TRACK = 9;
SCRIPTNUM = 4; // Which script to investigate

/*
 * Parses html track description searching for track ID used by player
 */
function getTrackId (html)
{
  if (html)
    {
      var re = /ParentResource.*"id":"?(\d+)/;
      var match = re.exec(html);
      var resid;
      if (match)
        {
          resid = match[1];
        }

      return resid;
    }
}

/*
 * Fetches information necessary to build a lastfm:// link
 */
  function getLink (resid) {
      if (resid == ALBUM)
        {
          var albumlink = 'lastfm://play/tracks/';
          var elems = document.getElementsByClassName('multibuttonCell');
          for each (elem in elems)
            {
              var a = elem.getElementsByTagName('a')[0];
              if (a)
                {
                  // Synchronous XmlHttpRequest, since I'm too dumb to
                  // use async one (beware of the cross-browser issues
                  // also!)
                  var req = new XMLHttpRequest();
                  var href = a.getAttribute('href');
                  req.open('GET', href, false);
                  req.send(null);
                  albumlink += getTrackId(req.responseText) + ',';
                }
            }
          return albumlink;
        }
      else if (resid == TRACK)
        {
          return "lastfm://play/tracks/" + getTrackId(document.documentElement.innerHTML);
        }
  }

// Build our shiny device ASAP
var newelem = document.createElement('a');
newelem.textContent = 'NOW YOU WILL PLAY!';
newelem.setAttribute('style', 'color: grey');

// Replace Flash-based player with our own shiny device
var placeholder = document.getElementById('player');
fl = document.getElementById('flashContainer');
placeholder.removeChild(fl);
placeholder.appendChild(newelem);

var params = document.getElementsByTagName('script');

// Find reasource ID
var re = /ParentResource.*"type":(\d+)/;
var resid = 0;
if (params[SCRIPTNUM] && params[SCRIPTNUM].textContent[1])
{
  resid = re.exec(params[SCRIPTNUM].textContent)[1];
}

newelem.setAttribute('href', getLink(resid));

var re = /ParentResource.*"streamable":"?([a-z]+)/;
var match = re.exec(params[SCRIPTNUM].textContent);

// For albums always enable player (since users see whether tracks are
// streamable or not) and for tracks enable only when they are
// streamable.
if ((resid == TRACK) && (!match || match[1] == 'false'))
{
  newelem.removeAttribute('href');
}
else
{
  newelem.removeAttribute('style');
}