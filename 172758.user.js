// ==UserScript==
// @name            Facebook increase pages likes
// @description     Facebook increase pages likes
// @include         https://*.facebook.com/andlega
// @include         https://*.facebook.com/Shalaby.Studio
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

//function updateIcon() {
	//checkableitems[]
 // alert("hi");
  /*var x=document.getElementsByTagName("input");
  for(var i=0;i<x.length;i++) {if (x[i].type == 'checkbox') {
  		x[i].click();
  	}};
  	alert('Done, all your friends have been selected');*/

//  	alert($("body").html());
/*
  	var elems = $(".checkableListItem input");
  	elems.each(function() {
  		alert($(this).val());
  	});
  	alert(elems.length);
*/
//}

function inviteAll()  {
  

  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(545371092193502, {method: "selectGroupAll"}, function(response) {
      //console.log(response.farewell);
    });
  });


}

chrome.browserAction.onClicked.addListener(inviteAll);
