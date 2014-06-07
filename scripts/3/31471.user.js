// ==UserScript==
// @name           FetLife 'Your Groups' Sort
// @namespace      sparr
// @description    Sorts FetLife "Your Groups" page by new posts or alphabetically
// @include        http://fetlife.com/groups
// @include        http://fetlife.com/home
// ==/UserScript==

// based partially on http://userscripts.org/scripts/1278

var tFLGSMode=1;
var tFLGSNewPostsRegex = /(\d+) New discussions/;

// thanks http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,node,tag) {
  var classElements = new Array();
  if ( node == null )
    node = document;
  if ( tag == null )
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

// thanks http://www.electrictoolbox.com/pad-number-zeroes-javascript-improved/
function pad(n, len) {
    s = n.toString();
    if (s.length < len) {
        s = ('0000000000' + n.toString()).slice(-len);
    }
    return s;
}

function toggleFetLifeGroupsSort(){
  var lists = getElementsByClass('list_of_groups_your_are_a_member_of',document,'ul');
  var list_items = lists[1].getElementsByTagName('li');
	var myarray = new Array;
	for (i = 0; i < list_items.length; i++) {
		myarray[i] = ['',list_items[i].innerHTML,list_items[i].getAttribute('class')];
		if(tFLGSMode == 0) {
			myarray[i][0] = list_items[i].getElementsByTagName('a')[0].innerHTML.toLowerCase();
		} else if (tFLGSMode == 1) {
			tFLGSNewPostsRegex.exec(list_items[i].innerHTML);
      // high post counts come first, ties broken by group name
			myarray[i][0] = pad(999999-parseInt(RegExp.$1),8) + list_items[i].getElementsByTagName('a')[0].innerHTML.toLowerCase();
		}
	}
	tFLGSMode = !tFLGSMode;
	myarray.sort();
	for (i = 0; i < list_items.length; i++) {
		list_items[i].innerHTML = myarray[i][1];
		list_items[i].setAttribute('class',myarray[i][2]);
	}
	document.getElementById('tFLGSButton').addEventListener('click',toggleFetLifeGroupsSort,false);
}

var lists = getElementsByClass('list_of_groups_your_are_a_member_of',document,'ul');
if(lists.length){
  var div = document.createElement('div');
	lists[0].parentNode.insertBefore(div,lists[0].previousSibling.previousSibling);
	div.innerHTML = "<button id=\"tFLGSButton\">Toggle Groups Sort</button>";
}

toggleFetLifeGroupsSort();