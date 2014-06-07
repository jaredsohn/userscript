// ==UserScript==
// @name           euler login
// @namespace      benibela
// @include        http://projecteuler.net/*
// ==/UserScript==

function request(page, data, callback){
  req = new XMLHttpRequest();
  req.open((data != null && data!="")?"POST":"GET", page);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  if (callback) req.onreadystatechange = (function(_req) { return function(){if (_req.readyState!=4) return; if (_req.status==200) callback(_req.responseText, _req); else alert("request failed: "+message+", "+data+"\n => "+_req.status+" "+_req.responseText); } }) (req);
  req.send(data) 
}

function login(){
  request("http://projecteuler.net/login", "username=<YOURUSERNAME>&password=<YOURPASSWORD>&login=Login", function(){setTimeout(function(){location.reload();},100);});
}


var a = document.createElement("a");
a.textContent = "fast login";
a.addEventListener("click", login);

var fy = document.createElement("li");
fy.appendChild(a);
document.getElementById("nav").getElementsByTagName("ul")[0].appendChild(fy);
