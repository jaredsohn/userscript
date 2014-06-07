// ==UserScript==
// @name          inoreader Plus
// @namespace      JuestChaOS
// @description    Change your feedly Reader interface easier to use.
// @version        1.0.2
// @history (1.0.2)fix UI: let the "jump to Next" button visible
// @history (1.0.1)fix UI: On list mode keep the "jump to Previous" button size same as others
// @history (1.0.0)New function:Add "jump to Previous" button for go back bewteen different feeds
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include        htt*://*.inoreader.com/*
// @include        htt*://inoreader.com/*
// @run-at document-end
// ==/UserScript==

function click(element) {
    // Click the specified element
    //console.log(element);
   //var mouseEvent = document.createEvent('MouseEvents');
    //mouseEvent.initMouseEvent('click', true, false, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
   //element.dispatchEvent(mouseEvent);
    element.childNodes[1].onclick();
}

function getAllEntries(){
    var allDivs = document.getElementsByTagName('div');
    var allEntries = new Array();
    for(var i=0;i<allDivs.length;i++){  
        if(typeof(allDivs[i].className) != 'undefined' &&
                (allDivs[i].className.match('entry ') != null && allDivs[i].className.match("read") == null)
                || allDivs[i].id == 'current-entry'){
            allEntries.push(allDivs[i]);
        }
    }
    return allEntries;
}

function markBelowItemsAsRead() {

 collapse_selected_item = true;

    // Get the selected item in the visible list
var selectedItem=$(".article_current");
var cursor=selectedItem.next();
var length=selectedItem.nextAll().length;

    for (length; length>=0; length--) {
        //alert(divElements[i].id);        
                temp=cursor;
				click(cursor[0]);
				cursor=temp.next();    
        }

    // Collapse the selected item
    if (collapse_selected_item) {
        click(selectedItem.childNodes[0]);
    }
}
		 
function markPreviousItemsAsRead() {
    collapse_selected_item = true;

    // Get the selected item in the visible list
var selectedItem=$(".article_current");
var cursor=selectedItem.prev();
var length=selectedItem.prevAll().length;

    for (var i = 1; i <= length; i++) {
        //alert(divElements[i].id);        
            //className.match(/article_unreaded\d+/)
            //if (divElements[i].id <= selectedItem[0].id) {
            //alert("error");
            //for(var j=0;j<divElements[i].childNodes.length;j++){
                temp=cursor;
				click(cursor[0]);
				cursor=temp.prev();
        }

    // Collapse the selected item
    if (collapse_selected_item) {
        click(selectedItem.childNodes[0]);
    }

}
 
// Create the "Mark previous read" button based on the stream preferences button
// Create the "Mark belows read" button based on the stream preferences button
// Add button to mark previous items read

$.ajax({
  url: "#subscription",
  async:true,
  success: function(data)
  {
 
    var buttonStreamPrefs = document.getElementById('read_articles_button');
    var buttonMarkPreviousAsRead = buttonStreamPrefs.cloneNode(true);
    buttonMarkPreviousAsRead.id = 'mark-previous-as-read-button';
    buttonMarkPreviousAsRead.className='smallradius';
    buttonMarkPreviousAsRead.style.paddingLeft = '7px';
    buttonMarkPreviousAsRead.style.paddingRight = '9px';
    buttonMarkPreviousAsRead.title = null;
    buttonMarkPreviousAsRead.style.marginRight = '10px';
	buttonMarkPreviousAsRead.removeAttribute("onclick");
    buttonMarkPreviousAsRead.textContent="Mark Previous as read";
   
    var buttonStreamPrefs = document.getElementById('read_articles_button');
    var buttonMarkbelowAsRead = buttonStreamPrefs.cloneNode(true);
    buttonMarkbelowAsRead.id = 'mark-below-as-read-button';
    buttonMarkbelowAsRead.className='smallradius';
    buttonMarkbelowAsRead.style.paddingLeft = '7px';
    buttonMarkbelowAsRead.style.paddingRight = '9px';
    buttonMarkbelowAsRead.title = null;
    buttonMarkbelowAsRead.style.marginRight = '10px';
	buttonMarkbelowAsRead.removeAttribute("onclick");
    buttonMarkbelowAsRead.textContent="Mark Below as read";
       
    buttonMarkPreviousAsRead.addEventListener('click', markPreviousItemsAsRead, true);
    buttonMarkbelowAsRead.addEventListener('click', markBelowItemsAsRead, true);
     
    $("#reload_articles_button").delay(2500).before(buttonMarkbelowAsRead);
    $("#reload_articles_button").delay(2500).before(buttonMarkPreviousAsRead);
   
  }
});
