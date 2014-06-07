// ==UserScript==
// @name        FetLife Friend Pulldown Box
// @namespace   kirr.fetlife
// @description Adds a pulldown box of friends to the search bar
// @include     https://fetlife.com/*
// @version     1.1
// @author      Kirr (https://fetlife.com/kirr)
// @url         https://fetlife.com/users/27238/posts/1090385
// ==/UserScript==

// How many entries will appear in the pulldown box?
var max_ent=10;

// Workaround for Chrome
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



searchbox=document.getElementsByClassName("placeholder")[0];

sbp=searchbox.parentNode;
sbpp=sbp.parentNode;
sbpc=sbp.previousSibling;
sbp.parentNode.removeChild(sbp);

var thelist=document.createElement("ul");
thelist.className="horizontal profile";
thelist.innerHTML='<li>&nbsp;<ul id="isearch" class="vertical rcbs"></ul>';
thelist.insertBefore(sbp,thelist.firstChild);

sbpp.insertBefore(thelist,sbpc);

var myfriends=[];

load_my_friends();


// Re-spider their friend page if necessary.
if(is_this_my_profile())
{
  var frdiv_tmp=document.getElementsByClassName('span-5 append-1 small')[0].getElementsByClassName('smaller')[0];

  var frdiv=document.createElement("span");
frdiv.style.display="none";

  frdiv_tmp.parentNode.insertBefore(frdiv,frdiv_tmp.nextSibling);


  var usernum=location.href.match("[0-9]+");

  how_many_friends();

  if(myfriends.length!=num_friends)
  {
    frdiv.innerHTML="Updating... 0/"+num_pages;
    frdiv.style.display="block";
    
    myfriends=[];

    for(var i=1;i<=num_pages;i++)
    {
      GM_xmlhttpRequest({
        method: "GET",
        url: "http://fetlife.com/users/"+usernum+"/friends?page="+i,
        onload: handlepage,
        onerror: function(err) {
          frdiv.innerHTML="Pulldown script: error loading friend list. Try reloading.";
          frdiv.style.display="block";
        }
      });
    }
/*  } else {
    frdiv.innerHTML="Friend cache OK";
    frdiv.style.display="block";*/
  }
}


// Callback when the search box is changed.
function change(val)
{
  val=val.toLowerCase();

  var pddiv=document.getElementById("isearch");

  if (val=="")
  {
    pddiv.style.display="none";
    return;
  }

  var a2=myfriends.filter(function a(x)
                          {return x.toLowerCase().indexOf(val)==0;});
  var a3=myfriends.filter(function a(x)
                          {return x.toLowerCase().indexOf(val)>=0;});

  var res=[];

  for(var i=0; i<a2.length && res.length<max_ent; i++)
  {
    res.push(a2[i]);
  }

  for(var i=0; i<a3.length && res.length<max_ent; i++)
  {
    if(res.indexOf(a3[i])==-1)
      res.push(a3[i]);
  }

  pddiv.innerHTML="";

  for(var i=0;i<res.length;i++)
  {
    pddiv.innerHTML+="<li><a href=\"/"+res[i]+"\">"+res[i]+"</a></li>";
  }

  if(i!=0)
    pddiv.style.display="block";
  else
    pddiv.style.display="none";
}

function f()
{
  change(searchbox.value);
}

// This function is a terrible hack. If you know a better way, please
// let me know. The issue is that if we set .display="none"; directly
// in the handler, the link will hide before we have a chance to
// actually click it.
function hide()
{
  setTimeout(function ()
             {document.getElementById("isearch").style.display="none";},
             100);
}

searchbox.addEventListener("keyup",f,false);
searchbox.addEventListener("blur",hide,
                          false);
searchbox.addEventListener("focus",f,false);
searchbox.autocomplete="off";

/* Check if we're viewing our own profile. We do this by finding the
 * first link to a user account (which will be the link to our own
 * account, in the heading) and compare that to the URL. 
 */
function is_this_my_profile()
{
  // Return right away if it's not even a profile URL.
  if(location.href.match("/users/") == null ||
     location.href.match("/users/[0-9]+/") != null)
    return 0;

  var hrefs=document.getElementsByTagName("a");

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

// Find out how many friends there are.
function how_many_friends()
{
  var friendstr=document.getElementsByClassName('span-5 append-1 small')[0].innerHTML;
  friendstr=friendstr.match(/\([0-9]+\)/)[0];
  friendstr=friendstr.replace(/[^0-9]/g,"");
  num_friends=friendstr;
  num_pages=Math.ceil(num_friends/16);
}

var completed=0;


// Load and save the friend cache.
function save_my_friends()
{
  fliststr=""+myfriends.length;
  for(var i=0;i<myfriends.length;i++)
  {
    fliststr+=":"+myfriends[i];
  }
  // Save a colon-separated list of the friend names.
  GM_setValue("friend_cache",fliststr);
}

function load_my_friends()
{
  var fliststr=GM_getValue("friend_cache","");
  // An array of the fetishes we're in. Fetish numbers here are
  // values, not keys.
  var friendarray=fliststr.split(":");

  num_my_friends=friendarray[0];

  myfriends=[];

  // 1 here is not a bug; the first item is the length.
  for(var i=1;i<friendarray.length;i++)
  {
    myfriends.push(friendarray[i]);
  }
}


// Parse a page of the friends list.
function handlepage(response) {
  var responseXML = document.createElement('div');
  responseXML.innerHTML = response.responseText;;
  
  var itid=responseXML.getElementsByClassName('user_in_list');
  
  var str="";

  for(var idx=0;idx<itid.length;idx++)
  {
    var elem=itid[idx];
    var avatar=elem.getElementsByClassName("profile_avatar")[0];
    var foo=avatar.alt;
    myfriends.push(foo);
  }

  completed++;

  frdiv.innerHTML="Updating... "+completed+"/"+num_pages;

  if(completed==num_pages)
  {
    frdiv.style.display="none";
    // Fair sorting. JS's default would put dominants first ;)
    myfriends.sort(function(a, b) {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    });
    save_my_friends();
  }
}
