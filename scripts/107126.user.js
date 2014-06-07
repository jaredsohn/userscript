// ==UserScript==
// @name         Dilbert Plus
// @namespace    DILBERT_PLUS
// @description  Enhance the Dilbert experience.
// @include      http://www.dilbert.com/strips/comic/*
// @include      http://dilbert.com/strips/comic/*
// @version      0.1
// ==/UserScript==



/**

 + remember vote / date sort setting.
 + filter some of the junk!
   "==== http"
 + bonus: vote setting threshhold (-1? -3?)
 
 todo: don't REMOVE the comments that are below the thresshold.
       allow user to show them
       flag them as either "under thresshold" and/or "spammy"

**/



// constants
var RATING_THRESHOLD = -10;
var COMMENT_SORT_ORDER_NAME = "CmtOrder";
var COMMENT_SORT_DIRECTION_NAME = "CmtDir";

// helper function
function xpathForEach(xpath, fn){
  var nodelist = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var item;
  for (var i=0, l=nodelist.snapshotLength; i<l; i++) {
    item = nodelist.snapshotItem(i);
    fn.apply(item, [i, item]);
  }
}


function isSpammy(string){
  return /[=]{3,}\s*http/.test(string);
}


// BEGIN APPLICATION LOGIC

var sortOrder = GM_getValue(COMMENT_SORT_ORDER_NAME) || "DateEntered";
var sortDirection = GM_getValue(COMMENT_SORT_DIRECTION_NAME) || "DESC";


/*
GM_addStyle([
  " #grdReport tr:hover { background:#C9E0FF; cursor:pointer; } ",
  " .ReportRowOdd { background:#F1F6FC; } ",
  " #freezeLayer { display: none !important } ", // disable modal barrier
  " #getebook { display: none !important } " // disable "get e-book" ad.
].join(''));
*/



// remove comments that are below -10
xpathForEach('//div[@class="CMT_Rating"]//span', function(i, item){
  
  var rating = 1 * item.innerHTML;
  var header = item.parentNode.parentNode;
  var body = header.nextSibling;
  var root = body.parentNode;
  var reason = [];
  if(rating < RATING_THRESHOLD){
    reason.push("rating is under threshold");
  }
  if(isSpammy(body.innerHTML)){
    reason.push("appears to be spam");
  }
  
  while(body.nodeType != 1){
    body = body.nextSibling;
  }
  
  if(rating < RATING_THRESHOLD || isSpammy(body.innerHTML)){
    //root.removeChild(body);
    //root.removeChild(header);
    body.innerHTML = '(removed - ' + reason.join(' and ') + ')';
  }
  
});


// when the user changes his/her sortBy or sortDirection preference, SAVE IT
xpathForEach('//div[@class="CMT_SortFilter"]//input[@type="image"]', function(i, item){
  item.addEventListener('click', function(){
    var selects = item.previousSibling.getElementsByTagName('select');
    sortOrder = selects[0].options[selects[0].selectedIndex].value;
    sortDirection = selects[1].options[selects[1].selectedIndex].value;
    GM_setValue(COMMENT_SORT_ORDER_NAME, sortOrder);
    GM_setValue(COMMENT_SORT_DIRECTION_NAME, sortDirection);
  }, false);
});


// when the user navigates to prev or next comic strip, apply any saved sort preferences
xpathForEach('//div[@class="STR_Calendar"]//a', function(i, item){
  var originalHref = item.getAttribute('href');
  var newHref = (
    originalHref +
    '?' + COMMENT_SORT_ORDER_NAME + '=' + sortOrder +
    '&' + COMMENT_SORT_DIRECTION_NAME + '=' + sortDirection
  );
  item.setAttribute('href', newHref);
});





