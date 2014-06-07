// ==UserScript==
// @name           cgi.4chan.org animated gif
// @description    replace still images with animated gifs,working in google reader too.
// @namespace      http://userscripts.org/scripts/show/38922
// @include        http://cgi.4chan.org/gif/*
// @include        http://www.google.com/reader/view/*cgi.4chan.org*
// @include        https://www.google.com/reader/view/*cgi.4chan.org*
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==

imagesa=document.getElementsByTagName('a');
for (var i = imagesa.length - 1; i >= 0; i--) {
	if(imagesa[i].innerHTML.match(/img src/)){
    	imagesa[i].firstChild.src = imagesa[i].href;
		}
	}
	
document.getElementById('chrome').addEventListener('DOMNodeInserted', function(e) {
  if(e.target.tagName && e.target.tagName == 'DIV' && /entry\s?/.test(e.target.className)) {
    var imgs = e.target.getElementsByTagName('img');
    for(var x in imgs) {    	
      var i = imgs[x];      
       if(/\/gif\/thumb\/.*\.jpg/.test(i.src)) {
        i.style.width = i.style.height = "inherit";
var wblink = i.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
        wblink1 = wblink.match(/href="(.*?html)/);
        linky = wblink1[1];

   	getit(linky);

        i.src = i.parentNode.href;

        
//      }else if(/\/hc\/thumb\/.*\.jpg/.test(i.src)){
//      	i.src = i.parentNode.href;
//      	i.style.maxWidth = "143%";
//      	//http://cgi.4chan.org/hc/thumb/1230295540589s.jpg
      
      }else if(/\/(s|hc)\/thumb\/.*\.jpg/.test(i.src)){
      	i.src = i.parentNode.href;
      	i.style.maxWidth = "112%";
      	//hhttp://cgi.4chan.org/s/src/1230303152679.jpg
      	var wblink = i.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
        wblink1 = wblink.match(/href="(.*?html)/);
        linky = wblink1[1];
        //GM_log(linky);
        getit(linky);
      	
      	}
      
    }
  }
}, false);	

function getit(linky){

	window.setTimeout(function() {
		//if (linky.match(/1436629/)){

		GM_xmlhttpRequest({ method: 'GET',         url: linky,
          headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
          onload: function(rd) {
          	if (rd.status == 200) {

          	wblink2 = rd.responseText.match(/http:\/\/cgi.4chan.org\/(gif|s|hc)\/src\/.*?(gif|jpg|png)/g);

          	var myArray = [];
          	for(var x=0;x<wblink2.length;x++){
          		myArray.push(wblink2[x]);
          		}
          		
          		myArray = unique(myArray);
          		
          		var myArraysrt='';
          		for(var x=0;x<myArray.length;x++){
          		  myArraysrt += "<img style='max-width:80%;' src="+myArray[x]+">";
          		}
          		
linkso = document.getElementsByTagName('a');
   for(var x=0;x<linkso.length;x++){
   	if (linkso[x] == linky){

   	//GM_log('linkso.[x]'+linkso[x]);

   	orgimglink = linkso[x];

   	//GM_log(orgimglink.parentNode.parentNode.childNodes[4].innerHTML);
   	targettoremove = orgimglink.parentNode.parentNode.childNodes[4];
   	targettoremove.innerHTML = targettoremove.innerHTML.replace(/<img.*?>/,'');
   	target = linkso[x].parentNode.parentNode;
   	target.innerHTML += myArraysrt;
}
   	}
      	
              }
              //GM_log('fsdf2'+linky);
      }});

        }, 1);
	}
	
function unique(a)
{
   var r = new Array();
   o:for(var i = 0, n = a.length; i < n; i++) {
      for(var x = i + 1 ; x < n; x++)
      {
         if(a[x]==a[i]) continue o;
      }
      r[r.length] = a[i];
   }
   return r;
}	