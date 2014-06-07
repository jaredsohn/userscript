// ==UserScript==
// @name           Google Maps Sort
// @namespace      http://www.latinsud.com
// @description    A script for ordering list of user maps alphabetically
// @include        http://maps.google.*/
// @include        http://maps.google.*/*
// @include        https://maps.google.*/
// @include        https://maps.google.*/*
// @version        1.2.3.3
// ==/UserScript==


// helper function to run code in the target, or add functions
function codeEval(source) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

// helper function to run function bodies in the target
function functionEval(source) {
  source = '(' + source + ')();'  
  codeEval(source);
}

// function to remove accents
function accentsTidy(s){
 var r=s.toLowerCase();
 r = r.replace(new RegExp("\\s", 'g'),"");
 r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
 r = r.replace(new RegExp("æ", 'g'),"ae");
 r = r.replace(new RegExp("ç", 'g'),"c");
 r = r.replace(new RegExp("[èéêë]", 'g'),"e");
 r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
 r = r.replace(new RegExp("ñ", 'g'),"n");                            
 r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
 r = r.replace(new RegExp("œ", 'g'),"oe");
 r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
 r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
 r = r.replace(new RegExp("\\W", 'g'),"");
 return r;
};


// Ajax helper
function getFile(url) {
  if (window.XMLHttpRequest) {              
    AJAX=new XMLHttpRequest();              
  } else {                                  
    AJAX=new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (AJAX) {
     AJAX.open("GET", url, false);                             
     AJAX.send(null);
     return AJAX.responseText;                                         
  } else {
     return false;
  }                                             
}

// function to Sort
function myCompare(a,b) {
 if (a[0] == b[0])
  return 0;
 else if (a[0] < b[0])
  return -1;
 else return 1;
}

// Function to escape strings
function escape2(s,subs) {
 return '"' + escape(subs) + '"';
}



function GMSLoadMaps() {

 if (typeof mapsTextRaw != "undefined")
  return;

 mapsTextRaw=getFile(location.href.replace(/^([^/]*\/\/[^/]*\/).*/,"$1")+'maps/ms?msa=0&output=js');
 mapsText=mapsTextRaw.match(/loadVPage.*/)[0];
 mapsText=mapsText.replace(/"([^"]*)"/g,escape2);

 // Helper function to match an array to an array of regexes
 Array.prototype.compareRegex = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if(!testArr[i].test(this[i])) return false;
    }
    return true;
 }

 var stack=Array('{');
 var c=0;
 var lastToken="";
 var lastDotToken="";
 var r=/[{}\[\],]|[^{}\[\],]+/;
 GMSMaps = Array();
 GMSMaps['owned_maps']=Array();
 GMSMaps['bookmarked_maps']=Array();
 GMSMaps['starred_items']=Array();

 // stack based syntax parser of the maps structure
 while(mapsText.length>0) {
  // extract next token
  token=mapsText.match(r);
  token=token[0];
  mapsText=mapsText.replace(r,"");
 
  
  if (token.match(/{|\[/)) {
   // open brace or bracket
   stack.push(token + lastDotToken);
   lastDotToken="";
  } else if (token.match(/}/)) {
   // close brace
   if (stack.length>0 && stack[stack.length-1].match(/^{/)) {
    if (stack.compareRegex([/{/,/{/,/\[(owned_maps|bookmarked_maps|starred_items):/,/{/])) {
     // map closed: parse it
     GMSMaps[type].push([tit, url]);
    }
    stack.pop();
   } else
    console.log("Google Maps Sort: Parse Error");
  } else if (token.match(/\]/)) {
   // close bracket
   if (stack.length>0 && stack[stack.length-1].match(/^\[/))
    stack.pop();
   else
    console.log("Google Maps Sort: Parse Error");
  } else {
   // other tokens
   if (token.match(/:$/)) {
    lastDotToken=token;
   } else if (token.match(/^title:/) && stack.compareRegex([/{/,/{/,/\[(owned_maps|bookmarked_maps|starred_items):/,/{/]) ) {
     // title of a map
     type=stack[2].replace(/\[(.*):/,"$1");
     tit=unescape(token.replace(/title:"(.*)"/,"$1"));
   } else if (token.match(/^module_spec_url:/) && stack.compareRegex([/{/,/{/,/\[(owned_maps|bookmarked_maps|starred_items):/,/{/,/{prefs:/]) ) {
      // url of a map
      url=unescape(token.replace(/module_spec_url:"(.*)"/,"$1")).replace(/\\x26/g,"&").replace(/&output=ghapi/,"");
   } else if (token.match(/^url:/) && stack.compareRegex([/{/,/{/,/\[starred_items:/,/{/]) ) {
      // url of a starred item
      url=unescape(token.replace(/url:"(.*)"/,"$1")).replace(/\\x26/g,"&").replace(/&output=ghapi/,"");
   }
  }
 
  // Last brace: we finished
  if (stack.length==0) break;
  
  lastToken=token;
 }

 GMSMaps['owned_maps'].sort(myCompare);
 GMSMaps['bookmarked_maps'].sort(myCompare);
 GMSMaps['starred_items'].sort(myCompare);
}

// Initialize (add link)
function GMSautorun() {
 var ml=document.getElementById('m_launch');
 if (ml) {
  var a=document.createElement('A');
  a.href="javascript:showSortedMaps();void(0);";
  a.appendChild(document.createTextNode("Sorted Maps"));
  ml.parentNode.parentNode.appendChild(a);
 }
}


// Display maps div
function showSortedMaps() {
 // initialize if not done
 if ( typeof GMSDiv == "undefined" ) {
  GMSLoadMaps();

  // simulate click on my places
  var toClick=document.getElementById('m_launch');
  var evt = toClick.ownerDocument.createEvent('MouseEvents');
  evt.initMouseEvent('click', true, true, toClick.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  toClick.dispatchEvent(evt);
  
  GMSDiv=document.createElement('DIV');
  GMSDiv.style.position='absolute';
  GMSDiv.style.top='50px';
  GMSDiv.style.left='10px';
  GMSDiv.style.right='10px';
  GMSDiv.style.bottom='10px';
  GMSDiv.style.backgroundColor='white';
  GMSDiv.style.border='2px solid black';
  GMSDiv.style.padding='1em';
  GMSDiv.style.zIndex=9999;
  GMSDiv.style.overflow='auto';
  GMSDiv.id='GMSDiv';

  var a=document.createTextNode('Search: ');
  GMSDiv.appendChild(a);

  a=document.createElement('INPUT');
  a.type='TEXT';
  a.id='GMSInput';
  a.onchange=GMSApplyFilter;
  a.onkeyup=GMSApplyFilter;
  GMSDiv.appendChild(a);

  GMSDiv.appendChild(document.createElement('BR'));
  GMSDiv.appendChild(document.createElement('BR'));

  GMSDiv2=document.createElement('DIV');
  GMSDiv2.style.position='absolute';
  GMSDiv2.style.top='35px';
  GMSDiv2.style.left='10px';
  GMSDiv2.style.width='1em';
  GMSDiv2.style.height='15px';
  GMSDiv2.style.backgroundColor='red';
  GMSDiv2.style.border='2px solid black';
  GMSDiv2.style.zIndex=9998;
  GMSDiv2.id='GMSDiv2';
  GMSa=document.createElement('A');
  GMSa.style.color='white';
  GMSa.href="javascript:void(0);";
  GMSa.onclick=GMSClose;
  GMSa.innerHTML="&nbsp;X&nbsp;";
  GMSDiv2.appendChild(GMSa);
  document.body.appendChild(GMSDiv2);

  // add all map links
  var i,p,a;

  p=document.createElement('P');
  p.style.fontWeight='bold';
  p.appendChild(document.createTextNode("Owned Maps:"));
  GMSDiv.appendChild(p);

  for (i=0; i<GMSMaps['owned_maps'].length; i++) {
   p=document.createElement('P');
   a=document.createElement('A');
   a.href=GMSMaps['owned_maps'][i][1];
   //a.setAttribute('onClick','GMSRunLink(this.href,"mp.loadMap"); return false;');
   a.appendChild(document.createTextNode(" " + GMSMaps['owned_maps'][i][0]));
   p.appendChild(a);
   GMSDiv.appendChild(p);
  }

  GMSDiv.appendChild(document.createElement('BR'));
  p=document.createElement('P');
  p.style.fontWeight='bold';
  p.appendChild(document.createTextNode("Bookmarked Maps:"));
  GMSDiv.appendChild(p);

  for (i=0; i<GMSMaps['bookmarked_maps'].length; i++) {
   p=document.createElement('P');
   a=document.createElement('A');
   a.href=GMSMaps['bookmarked_maps'][i][1];
   a.setAttribute('onClick','GMSRunLink(this.href,"mp.loadMap"); return false;');
   a.appendChild(document.createTextNode(" " + GMSMaps['bookmarked_maps'][i][0]));
   p.appendChild(a);
   GMSDiv.appendChild(p);
  }

  GMSDiv.appendChild(document.createElement('BR'));
  p=document.createElement('P');
  p.style.fontWeight='bold';
  p.appendChild(document.createTextNode("Starred Items:"));
  GMSDiv.appendChild(p);

  for (i=0; i<GMSMaps['starred_items'].length; i++) {
   p=document.createElement('P');
   a=document.createElement('A');
   a.href=GMSMaps['starred_items'][i][1];
   a.setAttribute('onClick','GMSRunLink(this.href,"mp.openIW"); return false;');
   a.appendChild(document.createTextNode(" " + GMSMaps['starred_items'][i][0]));
   p.appendChild(a);
   GMSDiv.appendChild(p);
  }

  document.body.appendChild(GMSDiv);
 }
 document.getElementById('GMSDiv').style.display='block'; 
 document.getElementById('GMSDiv2').style.display='block'; 
 document.getElementById('GMSInput').select();
}

function GMSClose() {
 document.getElementById('GMSDiv').style.display='none';
 document.getElementById('GMSDiv2').style.display='none';
}

// Apply search filter
function GMSApplyFilter(event) {
 if (event && event.keyCode && event.keyCode==27) {
   GMSClose();
 }
 var filt=accentsTidy(document.getElementById('GMSInput').value).toLowerCase();
 var GMSa=document.getElementById('GMSDiv').getElementsByTagName('A');
 var i;
 for (i=0; i<GMSa.length; i++) {
  if (accentsTidy(GMSa[i].childNodes[0].textContent).toLowerCase().indexOf(filt) != -1)
   GMSa[i].style.display='inline';
  else
   GMSa[i].style.display='none';
 }
}


// Run links in the proper context, so maps load properly
function GMSRunLink(url,mode) {
 var a;
 a=document.createElement('A');
 a.href=url;
 a.setAttribute('jsaction',mode);
 a.id='GMStmpLink';
 a.style.display='none';
 document.getElementById('opanel8').appendChild(a);

 // simulate click on the link
 var toClick=document.getElementById('GMStmpLink');
 var evt = toClick.ownerDocument.createEvent('MouseEvents');
 evt.initMouseEvent('click', true, true, toClick.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
 toClick.dispatchEvent(evt);

 toClick.parentNode.removeChild(toClick);
 
 GMSClose();
}

codeEval(getFile);
codeEval(escape2);
codeEval(myCompare);
codeEval(showSortedMaps);
codeEval(GMSLoadMaps);
codeEval(GMSClose);
codeEval(GMSApplyFilter);
codeEval(accentsTidy);
codeEval(GMSRunLink);
functionEval(GMSautorun);