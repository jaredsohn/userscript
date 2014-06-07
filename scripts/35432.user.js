// Copyright (c) 2008, Captain Nemoh
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Access Bar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Travian IGM Coords
// @namespace      http://captainnemoh.org/travian
// @description    Travian IGM Coords automatically converts text coordinates specially in IGMs, like (-10|22), to clickable links to the map location.
// @include        http://*.travian*/nachrichten.php?*
// ==/UserScript==

var allTDs;
var igmTD;

allTDs = document.evaluate(
  "//td[@background]",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i = 0; i < allTDs.snapshotLength; i++)
{
  igmTD = allTDs.snapshotItem(i);
  txt = igmTD.innerHTML; 
  var coords = txt.match(/\(?(-?\d+)\s*[\|\,\s\/]\s*(-?\d+)\)?/g); 
  if (coords)
  {
    for (index in coords)
    {
      var coordsDetails = coords[index].match(/\(?(-?\d+)\s*[\|\,\s\/]\s*(-?\d+)\)?/);
      var x = Number(coordsDetails[1]); 
      var y = Number(coordsDetails[2]);
      var cell = x + 401 + 801 * (400 - y);
      var link = "<a href='karte.php?z=" + cell + "'>" + coords[index] + "</a>" +
                 "<a href='a2b.php?z=" + cell + "'><img border='0' width='12' alt='Rally point' title='Rally point' src='data:image/gif;base64,R0lGODlhEAAQAPcAAP///xprJU5MlAd1CBRwGDY0Zgx5BfTy8g52DE9VlGN+Xwx6BRR0Gy0rVWObQzAuW0hGeBFzE0lHijteQAZ0CBJ1FChoQRNYKydmQUhHijw6fDc1ZxVxGRZ4HFBQnBpsJQ9PGT8/gEdFjluSQt3b3Pn1+JOclFmTQd2/NUVLjQdpBbu5vTU0aOnn6UZLhU9VlTw7bwp5BDp2SK63rRRxGdzZ3CBoOz16R9rAM3+OVf38/rm5vAxuFlRZnjEwXkREjhNWEg9kHBZQHhBSCzg2ahp+DEVEg0VDgtLU0E1MlTI0brW1txpTMwt4DBB4DlpaazFjMqKRZCFmNktRjRN6E1+YPXF0T0JIhufl5whcD8TExhNwGF5flnh8S2uAM/f29BttJxN0FiYlSYiOijd1O01Tkd6+LBeAG09NZ01SkQt4BA11DCsrVjc1ZgRzBklHi3eMISJnNUtJjmNhd8y7Menm6LScV05Tkbq4vBxrLU5MlQtNG36QexZvIBpULx5mMydnP2GDHBtiNhF1EwZOEkpIZA9SHkJGiEJDhQdYFK6zr2pvr0lNkAd0Ci5bLkZFiImYhcnIyubFUTk4avfy95OVlx9FJn10hyBsMRtpLiRpORV0GhBFHyJiPEJDgaCpnURGghBzEwFoA1NZnQp1Dk5NlQp3BS0sXG2DbV9hdUdWUgNJACxxNh1oPjQxYF2ZSRdwIoCrQgVzBm2HbZaLgkdFd0lPiZKdk7KytztAcmVqrSNjOnxyXlNQbzSCFEpJjSRoOfz9+zAuWbakektJjUtLnB1/IhtoLa6VYF2XQwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AHeIaSDsgQ9XBWpBILKhTYFTTwCYyDIoQhgHZuB0CFWBx4QSALRMevTjUhRakuwMQ+ZBTxIYkQAAwOIoyIcAOMEkUqBDJoAZKmKoMdVIlhsKAwYYMLBA1Kw6lv7EkSLoBg4vrWwA03QBlcwvhUJIyHAoBaNfxBD1OuDTZyVOsPrsUUWiLQBcuVzYmlLmRQ9di0YluJPmSipFfnZ1khGryqtkJ0ZYwACIya0aQJqsKULFGJ1AZ3w5QUAKCqVgczS8kSOCCwpexQQIKMVihUwkQvIcY5XDShcymTAZ+tR2DKFNHAgQ2EKDAYgldgHgYePJyBFQStC0iO4T0qohfNjaAg0IADs='/></a>" + 
                 "<a href='build.php?z=" + cell + "&amp;gid=17'><img height='12' border='0' alt='Send resources' title='Send resources' src='data:image/gif;base64,R0lGODlhEgAMAOYAAIhNJfn05+LHqcyogumqOqKFYuGRKvvlxLp3Jt+ybP///+DEicSISODQwPHp3+GqY+vGj821ncORQ/j39OGfT+CpUPHIdu7Xr/HavNx7GujHnPPo1cWgbtezjfG6W6JSFtvBpvfw6NiBKv778LiQZ+zdw/DXs96+oPKWI+urUOjUtuy8Qfvq0//13ujRhPjIbOW2ctS1g//mxfzx4d7Fn8mMWuzRn82NNvbbqfrt0vHNgObYvNq9jP/89uiULvTZvOfNlv/55vz59ezgtv/x5evbzPbq2Y1VJfjsxt7FlPfm3vLGefTAXd69pfCyVeTKivG3dvvo0f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAFIALAAAAAASAAwAAAeCgFKCUkIhg4KFh4obMTlGIBsbJyo9ij0BQTQ8NkkcAxdAFwIHAYMBQ0gLC086LzAQHT8CKqWDPTsRGC4eK0wWF0QNIFGHMyVFRjhOBChLI4rQUgESCB8k0dATBUcANZXYgyMPIhk+LeCDQlApBhQs6IINCRU3DBrf4A4HJiYltYeBAAA7'/></a>";      
      txt = txt.replace(coords[index], link);
    }
  }
  
  igmTD.innerHTML = txt;
}
