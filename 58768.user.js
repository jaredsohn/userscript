// ==UserScript==
// @name            ICC Champions Trophy 2009
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     "Included pages" will get score board of ICC Champions Trophy 2009.
// @include         http://www.google.com/*
// @include         http://www.google.com/ncr
// ==/UserScript==

var firstTime = 10;
var mydiv2 = document.createElement('div');
mydiv2.style.MozOpacity = 0.8;
function getPageSize(){
    var myWidth = 0, myHeight = 0;
      if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
      } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
      } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
      }
    return {width:myWidth, height:myHeight};
}

if (typeof GM_xmlhttpRequest != 'function') {

    return;

}
else
{
    if(window == top){
        window.setInterval(function() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://www.cricinfo.com/',
            headers: {
                'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
                'Accept': 'application/atom+html,application/html,text/html',
            },
            onload: function(responseDetails) {
                       firstTime = 30;
                       var myDimensions = getPageSize();
    
                       var mydiv = document.createElement('div');
                   mydiv.id = 'webcontent';
                   mydiv.style.display = 'none';
                   document.body.appendChild(mydiv);
    
                       
                   mydiv2.id = 'webcontent2';
                       mydiv2.style.border = "1px solid #7F9DB9";
                       mydiv2.style.backgroundColor = '#FFFFFF';
                       mydiv2.style.zIndex = '1000';
                       mydiv2.style.position = 'fixed';
                       mydiv2.style.width = myDimensions.width+'px';
                       mydiv2.style.height = "20px";                   
                       mydiv2.style.left = '1px';
                       mydiv2.style.top = (myDimensions.height-22) + 'px';
    
                       var mydiv3 = document.createElement('div');
                       mydiv3.id = 'webcontent3';
                       mydiv3.style.fontFamily = "Verdana";
                       mydiv3.style.fontSize = "11px";
                       mydiv3.style.fontStyle = "bold";
                       
                       mydiv3.style.zIndex = '1010';
                       mydiv3.style.position = 'fixed';
                       mydiv3.style.width = myDimensions.width+'px';
                       mydiv3.style.height = "20px";
                       mydiv3.style.left = (myDimensions.width/2) + 'px';
                       mydiv3.style.top = (myDimensions.height-22) + 'px';
    
                   document.body.appendChild(mydiv2);
                   document.body.appendChild(mydiv3);
    
                       document.getElementById('webcontent').innerHTML = responseDetails.responseText;
                   var table = document.getElementById('international');	 
                       document.getElementById('webcontent3').innerHTML = table.childNodes[1].childNodes[0].innerHTML;            
            }
        });
        }, firstTime * 1000);
    }
}