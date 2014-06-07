// ==UserScript==
// @name           eventload4444
// @description    dummy one
// @include http://bug.corp.yahoo.com/*
// ==/UserScript==
/*   function callTheBsd()
   {
         	 
         	aler("hello workd");
     GM_xmlhttpRequest({     method:'GET',  
      url:'http://csathya.bangalore.corp.yahoo.com/hacks/call.php?user=cfnbv&bug=100&details=fhkgjhdfjkgh',  
      headers: {      
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',  
         'Accept': 'application/atom+xml,application/xml,text/xml',
       }, 
       onload: function(responseDetails) {   
   	alert(responseDetails.responseText);
        //document.getElementById('usernotes').innerHTML = responseDetails.responseText;
       }
    });
   
   } 

function getStyleObject(objectId) {
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
 },false);
*/
 
   var tp = document.getElementsByTagName('table');
    var tpp = tp[3].getElementsByTagName('tbody');
	
   var tppp = tpp[0].getElementsByTagName('tr');
	
   var tpppp = tppp[1].getElementsByTagName('td');
	
   var bugnumber = tpppp[0].innerHTML;
   


  /* tpppp[0].innerHTML="<a href='www.google.com' id='anchor'>"+bugnumber+"</a>";
   alert(tpppp[0].innerHTML);*/

   document.getElementById('anchor').addEventListener("mouseover",function() {
	      	 
         //	alert("hello workd");
     GM_xmlhttpRequest({     method:'GET',  
      url:'http://csathya.bangalore.corp.yahoo.com/hacks/call.php?user=cfnbv&bug=100&details=fhkgjhdfjkgh',  
      headers: {      
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',  
         'Accept': 'application/atom+xml,application/xml,text/xml',
       }, 
       onload: function(responseDetails) {   
   	//alert(responseDetails.responseText);
        document.getElementById('anchor').innerHTML = responseDetails.responseText;
       }
    });
   },false);     
   
   