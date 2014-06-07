// ==UserScript==
// @name           Reflinki
// @namespace      karachan.org
// @description    Pokazuje jakie posty umieściły odnośnik do posta
// @include        http://www.karachan.org/*/res/*
// ==/UserScript==



function addElementAfter(node,tag,id,htm)
{
  var ne = document.createElement(tag);
  if(id) ne.id = id;
  if(htm) ne.innerHTML = htm;
  node.parentNode.insertBefore(ne,node.nextSibling);
}


document['getElementsByRegex'] = function(pattern){
   var arrElements = [];   // to accumulate matching elements
   var re = new RegExp(pattern);   // the regex to match with

   function findRecursively(aNode) { // recursive function to traverse DOM
      if (!aNode) 
          return;
      if (aNode.id !== undefined && aNode.className.search(re) != -1)
          arrElements.push(aNode);  // FOUND ONE!
      for (var idx in aNode.childNodes) // search children...
          findRecursively(aNode.childNodes[idx]);
   };

   findRecursively(document); // initiate recursive matching
   return arrElements; // return matching elements
};


document['getElementsByRegexID'] = function(pattern){
   var arrElements = [];   // to accumulate matching elements
   var re = new RegExp(pattern);   // the regex to match with

   function findRecursively(aNode) { // recursive function to traverse DOM
      if (!aNode) 
          return;
      if (aNode.id !== undefined && aNode.id.search(re) != -1)
          arrElements.push(aNode);  // FOUND ONE!
      for (var idx in aNode.childNodes) // search children...
          findRecursively(aNode.childNodes[idx]);
   };

   findRecursively(document); // initiate recursive matching
   return arrElements; // return matching elements
};


var board_name1 = document.getElementsByName("board")[0].value;

var arrMatches = document.getElementsByRegex('^ref\\|.+');


var s = "";

for (var i=0;i<arrMatches.length;i++) {
    s = s + 
    (arrMatches[i].className.match('([0-9]+)\\|([0-9]+)')[2]) +   //odnosnik do czego
    " - " + 
    arrMatches[i].parentNode.parentNode.id.match('([0-9]+)')[1] +"\n"; //odnosnik gdzie
    
    var id_after = 'dnb-'+board_name1+'-'+arrMatches[i].className.match('([0-9]+)\\|([0-9]+)')[2]+'-.';
    //alert(id_after);
    var aaa = document.getElementsByRegexID(id_after)[0];
    //alert(aaa);
	var w = arrMatches[i].parentNode.parentNode.id.match('([0-9]+)')[1];
    addElementAfter(aaa,'span','','<a href="#'+w+'" style="color: red;" onclick="return highlight(\''+w+'\', true);" class="ref|'+board_name1+'|1|'+w+'"    > >>'+w+' </a>');
}

addpreviewevents();