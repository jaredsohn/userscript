// ==UserScript==
// @name           FetLife Common Fetishes - Yellow Font/High Contrast Edition
// @namespace      katy.fetlife
// @description    Displays mutual fetishes on a user's profile in yellow. Originally by kirr, edited by HiImKaty90.
// @include        https://fetlife.com/users/*
// @exclude        https://fetlife.com/users/*/*
// @author         Kirr (https://fetlife.com/kirr) and HiImKaty90 (https://fetlife.com/hiimkaty90).
// @url            https://fetlife.com
// ==/UserScript==

// Workaround for Chromium.
if (!this.GM_getValue || 
    (this.GM_getValue.toString && 
     this.GM_getValue.toString().indexOf("not supported")>-1))
{
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
}

/* All links in the page. */
var hrefs=document.getElementsByTagName("a");

/* Check if we're viewing our own profile. We do this by finding the
 * first link to a user account (which will be the link to our own
 * account, in the heading) and compare that to the URL. 
 */
function is_this_my_profile()
{
  for(var i=0;i<hrefs.length;i++)
  {
    if(hrefs[i].href.match("/users/[0-9]+$"))
    {
      // The "match" here is to deal with situations like a # at the
      // end of the URL.
      if(hrefs[i].href==location.href.match(".*/users/[0-9]+")[0])
      {
        return 1;
      } else {
        return 0;
      }
    }
  }
  return 0;
}

/* If we're on our own profile page, we'll cache our fetish list. */
function save_my_fetishes()
{
  var fetishstr="";
  for(var i=0;i<hrefs.length;i++)
  {
    // Is this a link to a fetish page?
    if(hrefs[i].href.match("/fetishes/[0-9]+"))
    {
      // Yup. Add it to the string.
      var fetishnum=hrefs[i].href.match("[0-9]+");
      fetishstr+=":"+fetishnum;
    }
  }
  // Save a colon-separated list of the fetishes we're in.
  GM_setValue("fetish_cache",fetishstr);
}

/* Return a hashtable of fetishes. 1 in the table means the fetish is
 * present; undefined means it's not.
 */
function load_my_fetishes()
{
  var fetishstr=GM_getValue("fetish_cache","");
  // An array of the fetishes we're in. Fetish numbers here are
  // values, not keys.
  var fetisharray=fetishstr.split(":");
  // For lookup up fetishes, though, we want fetishes as *keys*, which
  // we do here.
  var fetishhash=[];

  // 1 here is not a bug; the first item is empty.
  for(var i=1;i<fetisharray.length;i++)
  {
    fetishhash[fetisharray[i]]=1;
  }

  return fetishhash;
}

/* Given a hashtable of fetishes, make the appropriate ones yellow.*/
function boldify(fetishhash)
{
  for(var i=0;i<hrefs.length;i++)
  {
    if(hrefs[i].href.match("/fetishes/[0-9]*"))
    {
      var fetishnum=hrefs[i].href.match("[0-9]+");
      if(fetishhash[fetishnum])
        hrefs[i].innerHTML="<font color='#FFD801'>"+hrefs[i].innerHTML+"</font>";
    }
  }
}


if(is_this_my_profile())
{
  save_my_fetishes();
} else {
  boldify(load_my_fetishes());
}