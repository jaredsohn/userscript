// ==UserScript==

// @name           Getchu links Lite

// @namespace      Getchu links Lite

// @description    getchu links

// @include  http://210.155.150.152/*

// @include  http://www.getchu.com/*

// ==/UserScript==
    (function()
{
if (window.location.href.indexOf ("www.getchu.com") > 0){
 window.location.href = window.location.href.replace ("www.getchu.com", "210.155.150.152"); 

}
var re = /www\.getchu\.com/ig;


 var csss = document.getElementsByTagName("link");
for ( var d = 0, css; css = csss[d]; d++ ) 
           {
 if (css.href.indexOf ("www.getchu.com") > 0)
        {
css.href=css.href.replace("www.getchu.com", "210.155.150.152");;
        } 
            } 
 

var scripts = document.getElementsByTagName("script");
for ( var h = 0, script; script = scripts[h]; h++ )
 {
	 if (script.src.indexOf ("www.getchu.com") > 0 && script.src.indexOf ("glance.heartrails.com") == -1 )
    { 
        


  script.src = script.src.replace(re,"210.155.150.152");	
         loadJs (script.src);

     }
if (script.src.indexOf ("210.155.150.152") > 0 && script.src.indexOf ("banner") == -1){  loadJs (script.src); }

if (script.text.indexOf ("ddaccordion.init") > 0 ) { 

 }

  }


var pics = document.getElementsByTagName("img");

for ( var i = 0, pic; pic = pics[i]; i++ ) 
           {
	if (pic.src.indexOf ("www.getchu.com") > 0)
         {
pic.src = pic.src.replace(re,"210.155.150.152");
         }
            } 


}
)();

function loadJscode(text){
    
    var body = document.getElementsByTagName('body').item(0);
       script = document.createElement('script');
    script.text = text;
    script.type = 'text/javascript';
    body.appendChild(script);

}


function loadJs(file){
    var scriptTag = document.getElementById('loadScript');
    var head = document.getElementsByTagName('head').item(0);
    if(scriptTag) head.removeChild(scriptTag);
    script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.id = 'loadScript';
    head.appendChild(script);

}



 