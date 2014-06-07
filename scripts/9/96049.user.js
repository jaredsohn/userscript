// ==UserScript==
// @name          Base Uploader - ID Info
// @description   Links the ID of a player applying to your guild to Faboo
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
//===========================ID INFO==============================
//================================================================

function getGalaxy() {
  var href = document.location.href;
  href = href.substr("http://".length,href.indexOf(".") - "http://".length);
  return href;
}
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
    case 'J': galaxy = "juno"; break;
    default: return null;
  }
  var atag = '<a href="http://' + galaxy + 
   '.astroempires.com/profile.aspx?player=' + id + '">' + account.innerHTML + '</a>';
  account.innerHTML = atag;
}
function replaceGuild() {
  var pending;
  if(!(pending = document.getElementById("guild_pending-members"))) {
    return;
  }
  var galaxy = getGalaxy();
  var regex = /<td>[0-9]+<\/td>/g;
  var matches = pending.innerHTML.match(regex);
  for(var i = 0;i < matches.length;i++) {
    var id = matches[i].substr(4,matches[i].length - 9);
    var atag = '<td><a target="_blank" href="http://faboo.org/eddie/' + galaxy + '/publicPlayer' 
      + '/playerid/' + id + '">' + id +  '</a></td>';
    pending.innerHTML=pending.innerHTML.replace(matches[i],atag);
  }
}
replaceIds();
replaceGuild();


//================================================================
//==========================End ID INFO===========================
//================================================================