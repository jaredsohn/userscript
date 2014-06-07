// ==UserScript==
// @namespace      logicaloctopus.net
// @name           su_friends
// @description    sorts Friends alphabetically
// @include        http://*.stumbleupon.com/friends/all/
// @version        1.03
// ==/UserScript==




function getElementsByClassName(cl) {
  var retnode = [];
  var myclass = new RegExp('\\b'+cl+'\\b');
  var elem = document.getElementsByTagName('*');
  for (var i = 0; i < elem.length; i++) {
    var classes = elem[i].className;
    if (myclass.test(classes)) retnode.push(elem[i]);
  }
  return retnode;
}

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
	friends = list[0].getElementsByTagName('dl');
	scan_sort(friends);
	return false;
}

list = document.getElementsByClassName('listPeople');

// add to the cmds
cmds = getElementsByClassName('cmds');
cmds[0].innerHTML += "<li class=\"textlink\"><a id=\"alpha_sort\" href=\"javascript:void(0);\" class=\"textlink\">Alphabetize</a></li>";
document.getElementById('alpha_sort').addEventListener('click',sort,false);

