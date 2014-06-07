/* TvWalla Tooltips version 0.3

   Created 01/10/2005
   Copyright (c) 2005, Released under the GPL http://www.gnu.org/copyleft/gpl.html
   Created by David Elentok, 3david@gmail.com

   This script adds tooltips to tv.walla.co.il that show you the description of the 
   tv show without having to actually press the link (on mouse over). */

// ==UserScript==
// @name          TvWalla
// @namespace     http://www.ee.bgu.ac.il/~elentok
// @description   Adds tooltips to tv.walla.co.il with the description of the tv show.
// @include       http://tv.walla.co.il/*
// ==/UserScript==

/* #########################################################
   ################  document.getShowDesc() ################
   #########################################################
   This function retrieves the description of a show from a given url (variable href),
   and writes the description to the innerHTML of the tooltip div. */

document.getShowDesc = function (href) {
  x = document.getElementById('tooltip')
  x.innerHTML = "Loading, Please Wait..."

  GM_xmlhttpRequest({
    method: 'GET',
    url: href,
    onload: function(responseDetails) {

      x = document.getElementById('tooltip')

      newdoc = responseDetails.responseText

      query = '<tr valign="top"><td colspan="2" align="right" class="w3">&nbsp;<span dir=rtl>'
      pos = newdoc.search(query)
      x.innerHTML = pos

      if (pos != -1)
      {
        pos += query.length
        buffer = ""
        while (newdoc[pos] != '<')
        {
          buffer = buffer + newdoc[pos]
          pos = pos + 1
        }

      }
      x.innerHTML = buffer
    }
    });
}

/* #########################################################
   ################# onLoad EventListener ##################
   #########################################################
   This function adds the tooltip <div> at the end of the <body> element */

window.addEventListener('load', function () {
  document.body.innerHTML = document.body.innerHTML + '<div id="tooltip"   style="position: fixed; width: 50%; margin-left: 10%, height: 20%; top: 40%; background-color: #ccc; border: solid #333 1px; visibility: hidden; dir: rtl; text-align: right">TESTING TESTING 123</div>' 
  }, true);

/* #########################################################
   ############## onMouseOver EventListener ################
   #########################################################
   This function shows the tooltip and locates it according to the mouse position,
   and starts the process of retrieving the description. */

document.addEventListener('mouseover', function (event) {
    if (event.target.tagName == "SPAN")
    {
      parent = event.target.parentNode
      if (parent.tagName == "A")
      {
        href = parent.href
        document.getShowDesc (href)

        x = document.getElementById('tooltip')
        x.style.visibility = "visible"
        x.style.width = document.body.clientWidth / 2

        if (event.pageX > document.body.clientWidth / 2)
          x.style.marginLeft = 0
        else 
          x.style.marginLeft = document.body.clientWidth /2 - 40
      }
    }

  }, true);

/* #########################################################
   ############### onMouseOut EventListener ################
   #########################################################
   This function hides the tooltip <div> when the mouse gets out of the link area. */

document.addEventListener('mouseout', function (event) {
    if (event.target.tagName == "SPAN")
    {
      parent = event.target.parentNode
      if (parent.tagName == "A")
      {
        
        href = parent.href
        document.getShowDesc (href)
        x = document.getElementById('tooltip')
        x.style.visibility = "hidden"
      }
    }

  }, true);
