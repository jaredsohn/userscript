// ==UserScript==
// @name           Cock Blocker Threads Ed.
// @include        http://forums.somethingawful.com/forumdisplay.php?forumid=208*
// ==/UserScript==

function ajax(url, vars, callbackFunction){
 
        var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");
 
        request.open("GET", url, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
 
        request.onreadystatechange = function(){
 
                if (request.readyState == 4 && request.status == 200) {
 
                        if (request.responseText){
 
                                callbackFunction(request.responseText);
                        }
                }
        };
        request.send(vars);
}

Array.prototype.indexOf = function( v ) {
 for( var i = 0, l = this.length; i < l; i++ ) {
  if( this[i]==v ) { return i; }
 }
 return -1;
};

function remove(response){
  var cocks = new Array();
  myRe = /<input type="text" class="bginput" name="listbits\[\]" value="([^"]+)" size="30">/g;
  while ((myArray = myRe.exec(response)) != null)  {
    cocks.push(myArray[1]);
  }
  var il = document.evaluate('//td[@class="author"]',
    document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  var authors = new Array();
  var i = il.iterateNext();
  while (i) { ni = il.iterateNext(); authors.push(i); i = ni; }
  for(var j = 0; j < authors.length; j++) {
    author = authors[j];
    if (cocks.indexOf(author.childNodes[0].innerHTML) >= 0){
      author.parentNode.parentNode.removeChild(author.parentNode);
    }
  }  
}

ajax("http://forums.somethingawful.com/member2.php?action=viewlist&userlist=ignore", null, remove);