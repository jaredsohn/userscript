// ==UserScript==
// @name           UploadJockey 2 Direct Links
// @namespace      none
// @include        http://*
// @include        file:///*
// @description    Replace's uploadjockey's link with the real links. Decoding functions by Kevin OConnor userscript "UploadJockey" http://userscripts.org/scripts/show/37893
// ==/UserScript==

//function decode(){
	
var END_OF_INPUT = -1;

var base64Chars = new Array(
    'A','B','C','D','E','F','G','H',
    'I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v',
    'w','x','y','z','0','1','2','3',
    '4','5','6','7','8','9','+','/'
);

var reverseBase64Chars = new Array();
for (var i=0; i < base64Chars.length; i++){
    reverseBase64Chars[base64Chars[i]] = i;
}

var base64Str;
var base64Count;
function setBase64Str(str){
    base64Str = str;
    base64Count = 0;
}
function readBase64(){    
    if (!base64Str) return END_OF_INPUT;
    if (base64Count >= base64Str.length) return END_OF_INPUT;
    var c = base64Str.charCodeAt(base64Count) & 0xff;
    base64Count++;
    return c;
}
function readReverseBase64(){   
    if (!base64Str) return END_OF_INPUT;
    while (true){      
        if (base64Count >= base64Str.length) return END_OF_INPUT;
        var nextCharacter = base64Str.charAt(base64Count);
        base64Count++;
        if (reverseBase64Chars[nextCharacter]){
            return reverseBase64Chars[nextCharacter];
        }
        if (nextCharacter == 'A') return 0;
    }
    return END_OF_INPUT;
}

function ntos(n){
    n=n.toString(16);
    if (n.length == 1) n="0"+n;
    n="%"+n;
    return unescape(n);
}
function decodeBase64(str){
    setBase64Str(str);
    var result = "";
    var inBuffer = new Array(4);
    var done = false;
    while (!done && (inBuffer[0] = readReverseBase64()) != END_OF_INPUT
        && (inBuffer[1] = readReverseBase64()) != END_OF_INPUT){
        inBuffer[2] = readReverseBase64();
        inBuffer[3] = readReverseBase64();
        result += ntos((((inBuffer[0] << 2) & 0xff)| inBuffer[1] >> 4));
        if (inBuffer[2] != END_OF_INPUT){
            result +=  ntos((((inBuffer[1] << 4) & 0xff)| inBuffer[2] >> 2));
            if (inBuffer[3] != END_OF_INPUT){
                result +=  ntos((((inBuffer[2] << 6)  & 0xff) | inBuffer[3]));
            } else {
                done = true;
            }
        } else {
            done = true;
        }
    }
    return result;
}
// decoding functions end

alllinks = document.getElementsByTagName('a');
   
   uploadjockeyurls = [];

     for (var i = 0; i < alllinks.length; i++) {
		
		if (alllinks[i].href.match(/uploadjockey\.com\/download\//))	{
            uploadjockeyurl = alllinks[i].href;
			uploadjockeyurls.push(alllinks[i].href);
			} 
		 }
  timetowait = 0;
  	
for (var i = 0; i < uploadjockeyurls.length; i++) {
  			y=0;
			window.setTimeout(function (){
				checkThoseUploadJockey(uploadjockeyurls[y]);
				y++;
			  },timetowait);			  
			timetowait +=3000;	
}



function checkThoseUploadJockey(uploadjockeyurl){	 

		GM_xmlhttpRequest({
		    method:'GET',
		    url:uploadjockeyurl,
			onload:function(responseDetails){
			var matches = responseDetails.responseText.match(/url=(.*?)"/gi);
             if(matches){
	            for (i in matches) {		         
				  var code = decodeBase64(matches[i].substr(4,matches[i].length-13));		  
				   var xpathuploadjockeyurllinks = "//a[contains(@href,\'" + uploadjockeyurl + "\')]";
				   var allLinks, thisLink;
        		   allLinks = document.evaluate(xpathuploadjockeyurllinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
         				for (var i = 0; i < allLinks.snapshotLength; i++) {
            				var thisLink = allLinks.snapshotItem(i); 
						    div = document.createElement('div');
						    div.innerHTML = '<a style="color:black;" href="'+code.replace(/&key=.*$/,'')+'">'+code.replace(/&key=.*$/,'')+'</a>';
						    thisLink.parentNode.insertBefore(div,thisLink);					
							}				  
		                }	
	                }				
			}});
}			

