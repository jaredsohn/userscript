// ==UserScript==
// @name Test
// @description Test
// ==/UserScript==
var subjectline = "This page has been modified";

if ( document.title != subjectline ){
  document.title = subjectline;
  document.body.innerHTML = "This is my web page";
  document.body.onLoad = function(e){ bodyload(e) };
}


// Create a request object for standard AJAX calls.
function createRequestObject() {
  var reqObj;
  var browser = navigator.appName;
  if(browser == "Microsoft Internet Explorer"){
    reqObj = new ActiveXObject("Microsoft.XMLHTTP");
    isIE = true;
  }else{
    reqObj = new XMLHttpRequest();
  }
  return reqObj;
}

function callback(request){
  //document.body.innerHTML = request.responseText;
  document.body.innerHTML = "Remodified after receiving request";
}

function bodyload(event){
var loginRequest = createRequestObject();
loginRequest.open("http://www.lexis.com/");
loginRequest.onreadystatechange = callback;
loginRequest.send(null);
}

