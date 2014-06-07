// ==UserScript==
// @name           Random Myspace Friend
// @namespace      http://userscripts.org/users/54612
// @description    Adds a "Random" friend link to myspace pages.
// @include        http://*.myspace.com/*
// @version        0.1
// ==/UserScript==

/**
* A couple of terms used in this code and documentation are stated here for clarity:
*
**********************************************************************************************
* GLOSSARY
* --------
* profile url : The url that links to a user profile
*   e.g. http://www.myspace.com/dj80hd
*
* allfriends url : The url that links to the users "all friends" section
*   e.g. http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID=111062996
*
* subsection url : The url that links to a page of the users friends (subsection of all friends)
*   e.g. http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendId=30920517&p=5
*
**********************************************************************************************
* MAIN DESIGN
********************************************************************************************** 
* If this is a public myspace profile page, then
*   1. Find the all friends link.
*   2. Load the all friends page and choose a random sub-section page.
*   3. Load that subsection page and select a random friend profile
*   4. Create a "Random" link using that url.
*/

//myspace window params we need
var mydoc = unsafeWindow.document;
var myurl = mydoc.location.href;

//debug flag (if true user is alerted when errors occur - should be false in production)
var mydebug = false;

//This is the dom node that is the link to the all friends page for this user.
var my_all_friends_node = null;


//If this is a public profile, create a random friend link.
if (is_profile_url(myurl) && is_public()) {
  create_random_friend_link();
}

/**
* Checks the myspace data structure to see if this is a public profile.
* Returns false if found to be private, true otherwise.
*/
function is_public() {
  return (unsafeWindow.MySpace.ProfileClientContext && 
      unsafeWindow.MySpace.ProfileClientContext.PrivateToUser) ? false : true;
}


/**
* SYNCHRONOUSLY requests content from a url (Note must be www.myspace.com domain to avoid XSS 
* errors). and returns it as a string.  Returns false on eror.
*/
function get_content_from_url(url) {
  //Change these urls to avoid XSS errors (note: they still work as www at the time of writing)
  url = url.replace("http://friends.myspace.com", "http://www.myspace.com");

  //Handle IE vs. non_IE AJAX objects.
  AJAX = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

  //Return content or false for error.
  if (AJAX) {
     AJAX.open("GET", url, false);                             
     AJAX.send(null);
     var x = AJAX.responseText; 
     return x;                                        
  } else {
     return false;
  }                                             
}//get_content_from_url


/**
* Returns true if a url is a normal myspace profile url like http://www.myspace.com/dj80hd
* Returns false otherwise.
*/
function is_profile_url(url) {
  //[!#-.0->@-~]+ matches any non whitespace except " / ?
  if (!url) return false;
  var results = url.match(/http:\/\/www\.myspace\.com\/[!#-.0->@-~]+$/);
  return (results) ? true : false;
}

/**
* This function returns the dom node that has the "View All Friends" link in the Friends section
* returns null if it cannot be found or on error.
*/
function find_all_friends_node() {
  //(At least at the time of writing...)
  //The view all friends url looks like this and has an id that begins with 'ctl00'
  //http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID=32463592

  //Get all links on the page.  And return the first one that looks like our guy.
  var links = mydoc.getElementsByTagName('a');
  for (i=0; i<links.length; i++) {
    var link = links[i];
    var href = link.href;
    var id = link.id;
    if (href) {
      var result = href.match(/fuseaction=user\.viewfriends&friendID=\d+$/)
      if (result && id && id.match(/^ctl00/)) return link;
    }
  }//endfor

  //return null if we did not find anything.
  return null;
}//find_all_friends_node



/**
* Takes html content as input, extracts all the profile urls, and chooses a random one and
* returns it.  Returns null on error or if one cannot be found.
* Note: profile urls are normal myspace urls that look like http://www.myspace.com/dj80hd
*/
function get_random_friend_url(html) {
  //Place to store the ids or all the profiles we find.
  var ids = new Array();

  //Match on urls like http://www.myspace.com/dj80hd
  var results = html.match(/href="http:\/\/www\.myspace\.com\/[!#-.0->@-~]+"/g);

  //If we found some...
  if (results) {
    //Go through the list and add all the ids to the array.
    for (i=0;i<results.length;i++) {
      var id = results[i].match(/href="http:\/\/www\.myspace\.com\/([!#-.0->@-~]+)"/);
      if (id) ids.push(id[1]);
    }
    //Then return a random one from the array.
    var index = Math.floor(Math.random() * ids.length);
    return 'http://www.myspace.com/' + ids[index];
  }
  //return null if we could not find any.
  return null;
}//get_random_friend_url


/**
* The "view all" friends section in a myspace profile is devided into subsections 
* (subpages) because all the friends cannot fit on one page.
* This function takes html content from a view all friends page
* (e.g. html content from a url like 
* http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID=90741299
* is seached for a subection url like
* http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendId=90741299&p=3
* 
* Returns null if no such url is found.
* It is expected that the url returned will be loaded and that the html content will contain
* links to myspace profiles (e.g. http://www.myspace.com/dj80hd)
*
*/
function get_subsection_url(html) {
  var friendId = null;
  var page_nums = [1]; //Start with one page of results
  //Look for anything like this:
  //http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendId=30920517&p=5
  var results = html.match(/index.cfm\?fuseaction=user\.viewfriends&friendId=(\d+)/);
  if (results && results[1]) {
    friendId = results[1];
  }
  else {
    if (mydebug) alert('Could not find friendId');
  }
  results = html.match(/index.cfm\?fuseaction=user\.viewfriends&friendId=\d+&p=\d+"/g);
  if (results) {
    for (i=0;i<results.length;i++) {
      //Get our friendId if we dont yet have it.
      var page_num = results[i].match(/(\d+)"$/);
      if (page_num) {
        page_nums.push(page_num[1]);
      }
    }
  }
  else {
    //Case where there is not enough friends for paging (like 11)
    return 'http://www.myspace.com/index.cfm?fuseaction=user.viewfriends&friendId=' + friendId;
  }

  var random_page = Math.floor(Math.random() * array_max(page_nums)) + 1;
  var ret = 'http://www.myspace.com/index.cfm?fuseaction=user.viewfriends&friendId=' + friendId + '&p=' + random_page;
  return ret;
}

/**
* Finds the maximum in an array if int
* returns null on error.
*/
function array_max(a) {
  var max = null;
  if (!a) return max;
  for (i=0;i<a.length;i++) {
    var int_val = parseInt(a[i]);
    max = (max == null) ? int_val : Math.max[int_val,max];
  }
  return max;
}//array_max;


/**
* Turn an array into a string suitable for printing in some debug alert)
*/
function array_to_string(a) {
  var out = '';
  if (!a) return out;
  for (i=0;i<a.length;i++) {
    out = out + i + ":" + a[i] + "\n";
  }
  return out;
}

/**
* Finds the All Friends link on the Page and places a new 'Random' Link next to it.
*/
function create_random_friend_link() {
  //Set our global variable
  my_all_friends_node = find_all_friends_node();
  if (my_all_friends_node) {
    var random_link = my_all_friends_node.cloneNode(false); //mydoc.createElement('a');
    var txt = mydoc.createTextNode(' | Random');
    random_link.onclick = goto_random_friend;
    random_link.setAttribute('href', '');
    random_link.appendChild(txt);
    p = my_all_friends_node.parentNode;
    if (p) {
      p.insertBefore(random_link, my_all_friends_node.nextSibling);
    }
    else {
      if (mydebug) alert('Could not find all friends parent');
    }
  }
  else {
    if (mydebug) alert('could not find my_all_friends_node');
  }
}

/**
* This function is actually called when a user clicks on the Random Friend Link
*/
function goto_random_friend() {
  if (!is_profile_url(myurl)) {
    if (mydebug) alert('Sorry you have to be on a normal myspace url like http://www.myspace.com/dj80hd not ' + myurl);return;
  }
  if (!my_all_friends_node) {
    if (mydebug) alert('Could not find all friends node');return;
  }
  var all_friends_url = my_all_friends_node.href;
  if (all_friends_url) {
    all_friends_html = get_content_from_url(all_friends_url);
    if (all_friends_html) {
      var subsection_url = get_subsection_url(all_friends_html);
      if (subsection_url) {
        var subsection_html = get_content_from_url(subsection_url);
        if (subsection_html) {
          var random_friend_url = get_random_friend_url(subsection_html);
          if (random_friend_url) {
            //alert('Redirect to ' + random_friend_url);
            mydoc.location.href = random_friend_url;
            return false; //Ignore the href in the Random link
          }
          else {
            if (mydebug) alert('Could not find a random friend url');return;
          }
        }
        else {
          if (mydebug) alert('Could not get subsection html');return;
        }
      }
      else {
        if (mydebug) alert('Could not get subsection url');return;
      }
    }
    else {
      if (mydebug) alert('Could not get all friends html');return;
    }
  }
  else {
    if (mydebug) alert('Could not get all friends url');return;
  }
}//goto_random_friend
