// ==UserScript==
// @name       Thunder Link Sonar
// @namespace   http://userscripts.org/users/tumuyan
// @description  popup one hidden thunder link,Like this page : www.skycn.com/soft/4639.html
// @include      http://*/*
// @version    0.7.1
// ==/UserScript==

// decode=0,not decode the thunder link ;decode=1, auto decode the thunder link
// sonar=1,use fun.sonar1();sonar=2,use fun.sonar2()
var decode=1
var sonar=2

var base64DecodeChars = new Array(
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
          52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
          -1,    0,    1,    2,    3,    4,    5,    6,    7,    8,    9, 10, 11, 12, 13, 14,
          15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
          -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
      );
	  
function showlink(link){
	var close=prompt('Thunder Link Get!',link)
	if (close!=null)
		{window.close()}
	else
		{ document.getElementById("loading_div").style.display='none'  }    
}	  
	  
function base64decode(str) {
      var c1, c2, c3, c4;
      var i, len, out;
      len = str.length;
      i = 0;
      out = "";
      while(i < len) {
          /* c1 */
          do {
              c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
          } while(i < len && c1 == -1);
        
          if(c1 == -1)
              break;
          /* c2 */
          do {
              c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
          } while(i < len && c2 == -1);
        
          if(c2 == -1)
              break;
          out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
          /* c3 */
          do {
              c3 = str.charCodeAt(i++) & 0xff;
              if(c3 == 61)
                  return out;
              c3 = base64DecodeChars[c3];
          } while(i < len && c3 == -1);
        
          if(c3 == -1)
              break;
          out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
          /* c4 */
          do {
              c4 = str.charCodeAt(i++) & 0xff;
              if(c4 == 61)
                  return out;
              c4 = base64DecodeChars[c4];
          } while(i < len && c4 == -1);
        
          if(c4 == -1)
              break;
          out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
      }
      return out;
}

function display(){
var no=".style.display='none'"
var loaddiv = document.createElement("div");
	loaddiv.innerHTML = '<div id="loading_div" style="position:fixed;width:108%;height:100%;   left:0px;top:0px;background-color:#ffffff;filter:alpha(opacity=100)"><div style="text-align:center;padding-top:300px">发现雷区<hr style="height:1px;width:50%"> <a href="#" onclick="this.parentNode.parentNode' + no + '" >show page</a></div></div> ';
    document.body.appendChild(loaddiv);
}

function sonar0()
{
  var link1 =  document.body.innerHTML.match(/thunderhref="http.*?"/) 
  var link2 =  document.body.innerHTML.match(/thunderhref="ed2k.*?"/) 
  var link3 =  document.body.innerHTML.match(/'thunder:\/\/.*?'/)
	if (link1)   	{showlink(link1[0].replace('thunderhref="','').replace('"',''))}
	else if(link2)	{showlink(link2[0].replace('thunderhref="','').replace('"',''))}
	else if(link3)  {
	    if (decode)
    	{
        link = link3[0].replace("'thunder://","").replace("'","")
        link = link.replace(/ +$|\/$/g,"")
        link = base64decode(link).replace(/^AA|ZZ$/gi,"")
			showlink(link) 
        }
		else {showlink(link3[0].replace("'",""))}
	}
}

function sonar1()
{
	var link = link1[0].replace(/thunderhref="/,"");
	link = link.replace('"',"");
    
    if (decode)
    	{
        link = link.replace("thunder://","")
        link = link.replace(/ +$|\/$/g,"")
        link = base64decode(link).replace(/^AA|ZZ$/gi,"")
        }
	showlink(link)   
}


function sonar2()
{
var link = link1[0].replace('="',"");
	link = link.replace('"',"");
    
    if (decode)
    	{
        link = link.replace("thunder://","")
        link = link.replace(/ +$|\/$/g,"")
        link = base64decode(link).replace(/^AA|ZZ$/gi,"")
        }
	showlink(link)   
}



if (sonar==2)
	 {
		var link1 = document.body.innerHTML.match(/="thunder.*?\={0,2}"/) 
		if (link1 )
		{	
			if (document.body.innerText.match(link1[0])){}
			else { display();sonar2(link1) }
		}
		
		
		else {sonar0()}
	 }

else if (sonar==1)
	{
		var link1 = document.body.innerHTML.match(/thunderhref="thunder.*?\={0,2}"/) 
		if (link1){ display();sonar1(link1)}
		else {sonar0()}
	}
