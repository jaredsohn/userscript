// ==UserScript==
// @name           eventload
// @description    dummy one
// @include http://bug.corp.yahoo.com/*
// ==/UserScript==

alert('top');
/*function getStyleObject(objectId) {
    // cross-browser function to get an object's style object given its id
  
  if(document.getElementById && document.getElementById(objectId)) {
        // W3C DOM
   
     return document.getElementById(objectId).style;
   
 } else if (document.all && document.all(objectId)) {
        // MSIE 4 DOM
  
      return document.all(objectId).style;
    }
 else if (document.layers && document.layers[objectId]) {
        // NN 4 DOM.. note: this won't find nested layers
       
 return document.layers[objectId];
    } 
else {
        return false;
    }

} 
// getStyleObject


function moveObject(objectId, newXCoordinate, newYCoordinate) {
    // get a reference to the cross-browser style object and make sure the object exists
  
  var styleObject = getStyleObject(objectId);
    if(styleObject) {
    
   styleObject.left = newXCoordinate;
 
   styleObject.top = newYCoordinate;
     
   return true;
   
 } else {
        // we couldn't find the object, so we can't very well move it
    
    return false;
  
  }

} 

// moveObject


	
  document.getElementById('bug').addEventListener("mouseover",function(e) {
  document.getElementById('usernotes').style.display = 'block';moveObject('usernotes',10,88);
 },false);

  document.getElementById('usernotes').addEventListener("mouseover",function(e) {
  document.getElementById('usernotes').style.display = 'block';moveObject('usernotes',10,88);
 },false);

  document.getElementById('usernotes').addEventListener("mouseout",function(e) {
  document.getElementById('usernotes').style.display = 'none';
 },false);

  document.getElementById('edit').addEventListener("click",function(e) {
  document.getElementById('textarea').style.display = 'block';document.getElementById('usernotes').style.display = 'none';
 },false);

  document.getElementById('bug').addEventListener("mouseout",function(e) {
  document.getElementById('usernotes').style.display = 'none';
 },false);*/
   alert('here');
   var tp = document.getElementsByTagName('table');
   alert(tp);
   var tpp = tp[3].getElementsByTagName('tbody');
	alert(tpp);
   var tppp = tpp[0].getElementsByTagName('tr');
	alert(tppp);
   var tpppp = tppp[1].getElementsByTagName{'td');
	alert(tpppp);
   var tppppp = tppp[0];
   alert(tppppp.innerHTML);
   	  
  GM_xmlhttpRequest({     method:'GET',  
   url:'http://csathya.bangalore.corp.yahoo.com/hacks/call.php?user=cfnbv&bug=100&details=fhkgjhdfjkgh',  
   headers: {      
   'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',  
      'Accept': 'application/atom+xml,application/xml,text/xml',
    }, 
    onload: function(responseDetails) {   
	
     	document.getElementById('usernotes').innerHTML = responseDetails.responseText;
    }
 });

 
