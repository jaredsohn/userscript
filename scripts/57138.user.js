// ==UserScript==
// @name           mafiawarfriendadd
// @namespace      http://www.facebook.com/*
// @include        http://www.facebook.com/*
// ==/UserScript==
//global variables
var p;
var protourl="http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=war&xw_action=add&xw_city=1&friend_id="
  var c=0;
  
  //functions
function getElementsByClassName(className, tag, elm){
  var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
  var tag = tag || "*";
  var elm = elm || document;
  var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
  var returnElements = [];
  var current;

  var length = elements.length;
  for(var i=0; i<length; i++){
    current = elements[i];
    if(testClass.test(current.className)){
      returnElements.push(current);
    }
  }
  return returnElements;
}


//adding members now with ids
function adduser(id){
	GM_xmlhttpRequest({
		method: 'GET',
		url: protourl+id,
		headers: {
			'User-agent': 'Mozilla/4.0',
		},
		onload: function(responseDetails) {
			c=c+1;
			if(responseDetails.status=200) p.textContent+=c+":"+id+"  "; 
		}
	});
}
//function getids(){
	var f= getElementsByClassName("author_post","a",document);
	for(var i in f){
		var id=f[i].href.split("=")[1];
		adduser(id);
	}
//}


 var overlay = document.createElement('div');
  overlay.setAttribute('style','position:fixed; top:0; bottom:0; left:0; right:0; height:10%; width:100%; background:#AFEEEE; overflow:auto; z-index:99001;');
  document.body.appendChild(overlay);
  p=document.createElement('p');
  overlay.appendChild(p);
  p.textContent="users added="+ f.length+ "  and they are  ";


