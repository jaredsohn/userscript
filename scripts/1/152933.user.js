// ==UserScript==
// @name        bbs archiver to thread
// @namespace   http://userscripts.org/users/tumuyan
// @include     http://*archiver/tid*
// @include     http:*/simple/*
// @version     2.3
// ==/UserScript==


var autoload=0

if (document.getElementById("end")){
    var endbot=document.getElementById("end").getElementsByTagName("a")
        if (endbot[0].href.match(/thread.{0,30}html/)) 
            add(endbot[0])
}
else if(document.getElementsByTagName("center"))
{ 
    var elepb85=document.getElementsByTagName("center")
      
    for (var i=elepb85.length-1;i>-1;i--)
    {
        var titlebot=elepb85[i].getElementsByTagName("b") 
            if ( titlebot[0].innerHTML.match(/^\s*查看完整版本.*/) )
             {
                 var endbot=titlebot[0].getElementsByTagName("a")  
				 add(endbot[0])
                 exit
               }  
    }

}
 

    
function add(endbot)
    
{   endbot.id="fulltextbot"
	endbot.innerHTML="完整版本" 
    if (autoload)
      endbot.click()
	  
var cssbot = document.createElement("style");
    cssbot.type="text/css";
    cssbot.innerHTML = ' a#fulltextbot {color:#336 !important;  position:fixed !important;display:block !important;  padding:4px !important;border-radius:0px 12px 12px 0px;  width:16px !important;max-height:120px !important;overflow:hidden !important;  top:40px;left:-2px;font-size: 12px !important;line-height: 30px !important;  background:#eed !important;box-shadow:5px 3px 6px #bbb  ;-o-transition: .3s ease-in;-moz-transition: .3s ease-in;-webkit-transition: .3s ease-in;}      a#fulltextbot:hover    {background:#fdd !important;box-shadow:4px 4px 5px #bcd;  -o-transition: .3s ease-in;-moz-transition: .3s ease-in;-webkit-transition: .3s ease-in;} ';
    document.head.appendChild(cssbot);   
}