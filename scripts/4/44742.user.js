// ==UserScript==
// @name Blackboard discussion board keyboard shortcuts
// @namespace http://userscripts.org/users/84300
// @description Provides keyboard shortcuts for the wretched discussion board on Blackboard
// @include http*://*blackboard*/*discussionboard*
// ==/UserScript==

document.addEventListener("keypress", function(e) {
  // define keys and search terms
  var NEXTPOSTKEY='k';
  var NEXTPOSTTEXT=/Next Post/;
  var PREVPOSTKEY='j';
  var PREVPOSTTEXT=/Previous Post/;
  var NEXTTHRKEY='n';
  var NEXTTHRTEXT=/Next Thread/;
  var PREVTHRKEY='b';
  var PREVTHRTEXT=/Previous Thread/;
  var REPLYKEY='r';
  var REPLYTEXT=/Reply/;
  var UPKEY='u';
  var UPTEXT=/List View|Tree View|Skip the Action Bar links|alt="Select the date"/;
  var FIRSTKEY='f';
  var FIRSTTEXT=/treecontrol/;
  var THREADKEY='t';
  var THREADTEXT=/alt="Thread"/;
  var CHECKBOX='c';

  // check for the key and perform the search if it matches
  if (!(e.altKey || e.ctrlKey)) {
    if(String.fromCharCode(e.which) == NEXTPOSTKEY) searchLink(NEXTPOSTTEXT,0)
    if(String.fromCharCode(e.which) == PREVPOSTKEY) searchLink(PREVPOSTTEXT,0)
    if(String.fromCharCode(e.which) == NEXTTHRKEY) searchLink(NEXTTHRTEXT,0)
    if(String.fromCharCode(e.which) == PREVTHRKEY) searchLink(PREVTHRTEXT,0)
    if(String.fromCharCode(e.which) == REPLYKEY) searchLink(REPLYTEXT,0)
    if(String.fromCharCode(e.which) == UPKEY) searchLink(UPTEXT,-1)
    if(String.fromCharCode(e.which) == FIRSTKEY) searchLink(FIRSTTEXT,1)
    if(String.fromCharCode(e.which) == THREADKEY) searchLink(THREADTEXT,0)
    if(String.fromCharCode(e.which) == CHECKBOX) toggleCheckboxes()
  }
}, true);
function searchLink(searchText, adjust) {
  // searches for the text of a link, 
  // then either follows it or one around it based on the value of adjust
  for (i=0; i<document.links.length; i++) {
    if (document.links[i].innerHTML.search(searchText) > -1) {
      window.location.href = document.links[i+adjust].href;
      break;
    }
  }
}
function toggleCheckboxes() {
  // looks through forms for items named formCBs and toggles them
  // we could search type=checkbox, but there are a couple that probably
  // shouldn't be toggled, including restrict_start and restrict_end
  for (i=0;i<document.forms.length;i++) {
    for (j=0;j<document.forms[i].elements.length;j++) {
      if(document.forms[i].elements[j].name=="formCBs") {
	if(document.forms[i].elements[j].checked==false) {
	  document.forms[i].elements[j].checked=true
	} else {
	  document.forms[i].elements[j].checked=false
	}
      }
    }
  }
}
