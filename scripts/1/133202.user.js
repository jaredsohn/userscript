// ==UserScript==
// @name           MarkNicoRank
// @namespace      http://www12.atpages.jp/~lottz/pukiwikiplus
// @include        http://www.nicovideo.jp/ranking/*/*/*
// @include        http://www.nicovideo.jp/ranking/*/*
// @author    lottz
// @version   0.0.3
// ==/UserScript==


(function(){

//====================
/// Constants.
//====================

// The key string of browser registory.
const NICORANK_MARK_TITLE = 'NICORANK_MARK_TITLE';

// The default unmark color.
const g_default_default_color = '#FFFFFF';

// The cahecked color.
const g_checked_color = '#7FFF00';

// The title separator. The title element contains it's title and checked date.
// Title will disappear automatically when which exceeded the expire date.
const g_title_sep = ';;';

// The separator of the title and the expire date.
const g_title_date_elem_sep = ';';

// The date to hold the checked title.
const g_expire_date = 60;

//====================
/// Variables.
//====================

// The loaded string from browser repository.
var nicoRankMarkTitles = "";

var g_default_color;

// Unchecked titles. These elemnts become the candicate to remove from browser repository.
var gRemoveTitleArr = new Array();


//====================
/// Functions.
//====================

// Load the mark titles from the browser registory.
function restoreCheckData(){
  var titleStr = GM_getValue(NICORANK_MARK_TITLE);
  // GM_log("[rank]load:" + titleStr);
  if(titleStr){
    nicoRankMarkTitles = titleStr;
  }
}

// Add the checkbox and restore check state to each rank item.
function makeCheck(){

  var elems = document.getElementsByClassName("watch");

  for each(var elem in elems){
    var inputElement = document.createElement("input");
    inputElement.setAttribute("type","checkbox");
    // elem.parentNode.appendChild(inputElement);
    elem.parentNode.insertBefore(inputElement,elem.parentNode.firstChild);
    inputElement.addEventListener('click',function(e){cbClickFn(this);},false);
    if(nicoRankMarkTitles.indexOf(elem.text + g_title_date_elem_sep) >= 0){
      inputElement.checked = true;
      inputElement.parentNode.parentNode.style.backgroundColor = g_checked_color;
    }
  }
} // eof

// The callback method of a checkbox click event.
function cbClickFn(cb){

  // Switch the state of checkbox.
  if(cb.checked){
    if(! g_default_color){
      g_default_color = cb.style.backgroundColor;
    }
    cb.parentNode.parentNode.style.backgroundColor = g_checked_color;
  }
  // Unchecked.
  else{
    if(!g_default_color){
      g_default_color = g_default_default_color;
    }
    cb.parentNode.parentNode.style.backgroundColor = g_default_color;
    // Save the remove title.
    gRemoveTitleArr.push(cb.parentNode.firstChild.nextSibling.text);
  }

} // eof

// The callback handler to save checked items at the timing of unload or reload current page.
function unloadFn(){
  // alert('unload');
  saveCheckData();
}

// Save the checked item to the browser repository.
function  saveCheckData(){
  var titleStrs = "";

  var nicoRankMarkTitlesArrTmp= nicoRankMarkTitles.split(g_title_sep);
  var nicoRankMarkTitlesArr = new Array();
  for(var i=0;i<nicoRankMarkTitlesArrTmp.length;i++){
    var titleElem = nicoRankMarkTitlesArrTmp[i].split(";");
    nicoRankMarkTitlesArr.push({title:titleElem[0], expireDate:titleElem[1]});
  }

  var dobj = new Date();
  var y = dobj.getFullYear();
  var m = dobj.getMonth() + 1;
  var d = dobj.getDate();
  if(m < 10){
    m = '0' + m;
  }
  if ( d < 10 ) {  
    d = '0' + d;  
  }    

  var todayStr = y + m + d;
  // Calculate the expire date.
  dobj.setTime(dobj.getTime() + g_expire_date * 86400000);
  y = dobj.getFullYear();
  m = dobj.getMonth() + 1;
  d = dobj.getDate();
  if(m < 10){
    m = '0' + m;
  }
  if ( d < 10 ) {  
    d = '0' + d;  
  }    
  var expireDayStr = y + m + d;

  // Remove expired title.
  for(var ii=0;ii<nicoRankMarkTitlesArr.length;ii++){
    var ee = nicoRankMarkTitlesArr[ii];

    if(! ee.title || ! ee.expireDate){
      nicoRankMarkTitlesArr[ii] = undefined;      
    }
    // The Title exists in remove target array.
    else if(gRemoveTitleArr.indexOf(ee.title)>=0){
      nicoRankMarkTitlesArr[ii] = undefined;      
    }
    // Remove date expired title.
    else if(ee.expireDate < todayStr){
      nicoRankMarkTitlesArr[ii] = undefined;
    }
  }

  // Add the title to the array which not exist int the existing array.
  var elems = document.getElementsByClassName("watch");
  for each(var elem in elems){
    if(elem.parentNode && elem.parentNode.firstChild.checked){
    // if(elem.parentNode.firstChild.checked){
      if(nicoRankMarkTitles.indexOf(g_title_sep + elem.text + g_title_date_elem_sep) < 0){
        nicoRankMarkTitlesArr.push({title:elem.text, expireDate:expireDayStr});
      }
    }
  }

  // Make the string value to store the browser repository.
  for(var iii=0;iii<nicoRankMarkTitlesArr.length;iii++){
    var eee = nicoRankMarkTitlesArr[iii];    
    // Check whether the element is not expired.
    if(eee){
      titleStrs += eee.title + ";" + eee.expireDate + g_title_sep;
    }
  }
  // alert(titleStrs);
  GM_setValue(NICORANK_MARK_TITLE, titleStrs);
}


//====================
/// Main process.
//====================

// Add a handler to save checked item.
window.addEventListener('unload',function(e){unloadFn(this);},false);
// Restore checkbox from browser repository.
restoreCheckData();
// Set check to the checkboxes.
makeCheck();

}
)();

