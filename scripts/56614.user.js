// ==UserScript==
// @namespace      logicaloctopus.net
// @name           su_friends
// @description    sorts Friends alphabetically
// @include        http://*.stumbleupon.com/friends/*
// @version        1.04
// ==/UserScript==

function getv(elem) {
  atags = elem.getElementsByTagName('a');
  return atags[0].href;
}

function bubble_sort(friends) {
  for (z=friends.length-1;z>0;z--) {
    for (i=0;i<z;i++) {
      if ( getv(friends[i]) > getv(friends[i+1]) ) {
        friends[i].parentNode.insertBefore(friends[i+1],friends[i]);
      }
    }
  }
}

function scan_sort(friends) {
  for (i=1;i<friends.length;i++) {
    for (loc=0;loc<i;loc++) {
      if ( getv(friends[loc]) > getv(friends[i]) ) break;
    }
    friends[loc].parentNode.insertBefore(friends[i],friends[loc]);
  }
}

function sort() {
	list = document.getElementsByClassName('listPeople');
	friends = list[0].getElementsByTagName('dl');
	scan_sort(friends);
	return false;
}

if ( /\/friends\/all\//.test(document.location) ) {  // url = .../friends/all/
	if ( /#alpha/.test(document.location) ) sort();
	else {
		// add to the cmds
		cmds = document.getElementsByClassName('cmds');
		cmds[0].innerHTML += "<li class=\"textlink\"><a id=\"alpha_sort\" href=\"javascript:void(0);\" class=\"textlink\">Alphabetize</a></li>";
		document.getElementById('alpha_sort').addEventListener('click',sort,false);
	}
}
else if ( /\/friends\//.test(document.location) ) {  // url = .../friends/
	h2s = document.getElementsByTagName('h2');
	h2s[1].innerHTML += " <a style=\"font-size:13px;font-weight:normal;font-family:'lucida grande', verdana, tahoma, arial, sans-serif;cursor:pointer\" href=\"/friends/all/#alpha\">Alphabetize</a>";
}
