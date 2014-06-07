// ==UserScript==
// @name Last.fm Pirate Search
// @description Adds The Pirate Bay search links to the buy buttons in Last.FM
// @version 2.1
// @updateURL https://userscripts.org/scripts/source/138251.user.js
// @match http://last.fm/*
// @match http://www.last.fm/*
// ==/UserScript==

/* old functions for old buttons */
function createHeader(title)
{ var li = document.createElement("li");
      li.className = "buyType";
      li.textContent = title;
  return li;
}

function createItem(title, search, price)
{ var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", "http://thepiratebay.se/search/" + search + "/0/7/100");
    a.setAttribute("target", "_blank");
      var span = document.createElement("span");
      span.textContent = title;
      a.appendChild(span);
      if (typeof price != 'undefined')
      { var small = document.createElement("small");
        small.textContent = price;
        a.appendChild(small);
      }
    li.appendChild(a);
  return li;
}

function createLastItem(title, search, price)
{ var li = createItem(title, search, price);
      li.className = "last";
  return li;
}

/* -------------------------- */

/* new button functions */

function createSearchItem(search){
  li = document.createElement("li");
    a = li.appendChild(document.createElement("a"));
    a.className = "dropdown-btn-menu-item";
    a.setAttribute("target", "_blank");
    a.setAttribute("href", "http://thepiratebay.se/search/" + search + "/0/99/100");
      img  = a.appendChild(document.createElement("img"));
      img.setAttribute("src", "http://thepiratebay.se/favicon.ico");
      img.className = 'ecommerce-icon';
             a.appendChild(document.createTextNode(" The Pirate Bay"));
      span = a.appendChild(document.createElement('span'));
      span.className = 'additional-info';
      span.innerText = "Search";
  return li;
}

/* -------------- */

/* get type of page, to know where to look for buttons */

var pathArray = window.location.pathname.split( '/' );
var metadata;
if (pathArray[2] == "+noredirect") metadata = pathArray.slice(3);
else                               metadata = pathArray.slice(2);

//var section = pathArray[1];
var artist = metadata[0];
var album  = metadata[1];
var track  = metadata[2];
var extra  = metadata[3];
var last   = metadata[-1];

var type; // 1 : last.fm/music/{artist}
          // 2 : last.fm/music/{artist}/{album}
          // 3 : last.fm/music/{artist}/{album}/{track}
          // 0 : last.fm/music/{artist}/+{*}
          // 5 : last.fm/music/{artist}/+albums
          // 4 : last.fm/music/{artist}/_/{track}
          // 0 : last.fm/music/{artist}/_/{track}/+{*}
          // 5 : last.fm/music/{artist}/_/{track}/+albums
          // 6 : last.fm/listen
          // 0 : Not Found Error

// The following code parses the url into a type of page. It follows the above rules, lowest first
if (document.getElementById("fourOhFour")) //check if outdated
{ type = 0;
}
else // TODO: recheck all of this, re-do the structure to use 'else if'
{ //if (section == "music")
  { if (artist)
    { if (album)
      { if (album == "_") // if (album is "_") then (track) unless 404
        { if (extra)
          { if (extra == "+albums")
            { type = 5;
              start = 1;
            }
            else // extra is +anything else
            { type = 0;
            }
          }
          else // artist and album is "_" and not extra
          { type = 4;
          }
        }
        else // artist and album and album is not "_"
        { if (album.charAt(0) == "+")
          { if (album == "+albums")
            { type = 5;
              start = 1;
            }
            else // artist and album and album[0] is "+" but album is not "+artists"
            { type = 0;
            }
          }
          else // artist and album but album is not "_" or "+{something}"
          { if (track)
            { type = 3;
            }
            else // artist and album but not track
            { type = 2;
            }
          }
        }
      }
      else // artist but not album
      { type = 1;
      }
    }
  }
}

/* ---------------------- */

if (type > 0)
{ var search;

  // last.fm/music/{artist}
  if (type == 1)
  { search = artist;
  }

  // last.fm/music/{artist}/{album}
  // last.fm/music/{artist}/{album}/{track}
  if (type == 2 || type == 3)
  { search = artist + "+" + album;
  }

  // last.fm/music/{artist}/_/{track}
  if (type == 4) 
  { album = document.getElementsByClassName("track-detail")[0].getElementsByClassName("media-link-reference")[0];
    if (album) search = artist + "+" + album.innerText;
    else search = artist + "+" + track;
  }

  // main ecommerce button
  dropdown = document.getElementsByClassName("ecommerce-actions")[0];
  if (dropdown)
  { dropdown = dropdown.getElementsByClassName("dropdown-btn-menu")[0];
    insertBeforeElement = dropdown.getElementsByClassName("dropdown-btn-section-title")[1];
    dropdown.insertBefore(createSearchItem(search), insertBeforeElement);
  }

  // secondary ecommerce buttons
  albums = document.getElementsByClassName("album-item");
  for (var i = 0; i < albums.length; i++)
  { album = albums[i];
    meta = album.getElementsByTagName('meta');
    var name;
    for (var j = 0; j < meta.length; j++)
    { if (meta[j].getAttribute('itemprop') == 'name')
      { name = meta[j].getAttribute('content');
        break;
      }
    }
    dropdown = album.getElementsByClassName("dropdown-btn-menu")[0];
    insertBeforeElement = dropdown.getElementsByClassName("dropdown-btn-section-title")[1];
    dropdown.insertBefore(createSearchItem(artist + "+" + name), insertBeforeElement);
  }
}