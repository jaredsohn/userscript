// ==UserScript==
// @name           Google <Westport
// @namespace       
// @description    Adds a sidebar with search results from westport.freebase.com
// @include        http://www.google.*/search*
// ==/UserScript==



var main, newElement;
main = document.getElementById('res');
if (main) {

//make iframe
  newDiv = document.createElement("div");

//get google search query
var url=document.location.href ||'';
var arr=url.match(/(\?|&)q=(.*?)&/);
var query='';
try{query=arr[2]||'';}catch(e){}

//call westport
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://westport.freebaseapps.com/okgoogle.html?q='+query,   
    onload: function(responseDetails) {
       // alert(responseDetails.responseText);
       newDiv.innerHTML = responseDetails.responseText;

    }
});





//put 'er right in there
main.parentNode.insertBefore(newDiv, main);  



}