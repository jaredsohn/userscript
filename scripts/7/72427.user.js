//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Base Uploader - Account ID
// @description   Turns Your Account ID Number Into A Link To Your Profile
// @include       *.astroempires.com/*
// @exclude       *.astroempires.com/home.aspx*
// @exclude       *.astroempires.com/login.aspx*
// @exclude       forum.astroempires.com/*
// @exclude       support.astroempires.com/*
// @exclude       wiki.astroempires.com/*
// @exclude       wiki.astroempires.com/*/*
// @exclude       *.astroempires.com/upgrade.aspx*
// @exclude       *.astroempires.com/tables.aspx*
// @exclude       *.astroempires.com/register.aspx*
// @exclude       *.astroempires.com/smilies.aspx*
// ==/UserScript==


//================================================================
//==========================ACCOUNT ID============================
//================================================================

function replaceIds() {
  var account = document.getElementById("account").nextSibling;
  var galaxy = account.innerHTML[0];
  var id = account.innerHTML.substr(2,account.innerHTML.length);
  switch(galaxy) {
    case 'A': galaxy = "alpha"; break;
    case 'B': galaxy = "beta"; break;
    case 'C': galaxy = "ceti"; break;
    case 'D': galaxy = "delta"; break;
    case 'E': galaxy = "epsilon"; break;
    case 'F': galaxy = "fenix"; break;
    case 'G': galaxy = "gamma"; break;
    case 'H': galaxy = "helion"; break;
    case 'I': galaxy = "ixion"; break;
    default: return null;
  }
  var atag = '<a href="http://' + galaxy + 
   '.astroempires.com/profile.aspx?player=' + id + '">' + account.innerHTML + '</a>';
  account.innerHTML = atag;
}
replaceIds();

//================================================================
//========================END ACCOUNT ID==========================
//================================================================