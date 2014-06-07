// ==UserScript==
// @name        guidenews
// @include     http://www.heroeswm.ru/home.php
// @version     0.3
// @author      Hamsi,-Партизанэн-
// ==/UserScript==

newsblock = document.createElement('div');
shimg = document.createElement('img');
if(GM_getValue("showfull")==0)
{
   newsblock.style.height= "16px";
    shimg.src = "http://hwmguide.ru/images/upload/933f4b8e.png";
}
else
{
    shimg.src = "http://hwmguide.ru/images/upload/58e44535.png";
   newsblock.style.height = "145px"; 
}

getnews();
setInterval(function(){
getnews();

},70000);


shimg.onclick = function(){
	if(newsblock.clientHeight == 36)
	{
        GM_setValue("showfull",1);
        document.getElementById("guidetext").style.color = "";
		shimg.src = "http://hwmguide.ru/images/upload/58e44535.png";
		newsblock.style.height = "145px";
	}
	else
	{
        GM_setValue("showfull",0);
		shimg.src = "http://hwmguide.ru/images/upload/933f4b8e.png";
		newsblock.style.height = "16px";
		
	}
}
newsblock.id = "newsblock";
newsblock.style.margin = "8 auto";
newsblock.style.padding = "10px";
newsblock.style.width = "86%";
newsblock.style.overflow = "hidden";
newsblock.className = 'wblight';
newsblock.innerHTML = '<table width="100%"><tr><td width="33%"><span id="shblock" onmouseOver="this.style.cursor = \'pointer\';"></span></td><td width="67%""><span><a href="http://hwmguide.ru" target="_blank"><span id="guidetext"><b>HWM Guide</b></span></a></span></td></tr></table>';
document.querySelectorAll('td[width="290"]')[1].appendChild(newsblock);
document.getElementById("shblock").appendChild(shimg);
newstable = document.createElement('table');
newstable.width = "100%";
newsblock.appendChild(newstable);

//changed function(real author:xo4yxa)
function cut(string) {
    var string = string.replace("&quot;",'"');
	var s = string;
	var maxsymbols = 33;
	var replacesymbols = '...';
    if (string.length > maxsymbols) {
	for (var i = maxsymbols; i >=0; i--)
		if (string.charAt(i) == ' ')
			s = string.substr(0, i)+replacesymbols;
	s = string.substr(0, maxsymbols)+replacesymbols;
    }
	return s;
}


	function getnews()
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://hwmguide.ru/last_5_news.txt',
			overrideMimeType: 'text/html; charset=utf-8',
			onload: function( resp )
					{
                        
						var str = resp.responseText;
						var urls = str.match(/(http:\/\/)(hwmguide.ru\/)(.*\/)(.*\/)(.*\/)/g);
						var prenames = str.replace(/http:\/\//g,'\nhttp://');
						var names = prenames.match(/(;)(.*)/g);
						newstable.innerHTML = "";
						for (var i = 0; i <= 5; i++) 
						{
							result = names[i].substr(1);
							newstable.innerHTML += '<tr><td><a href="'+urls[i]+'" target="_blank" title="'+result+'" ><nobr>'+cut(result) +'</nobr></a></td></tr>';
                             if(i==0)
                             {
                                 if (GM_getValue("lastnews") !== undefined)
                                 {
                                     if(GM_getValue("lastnews") !== result)
                                     {
                                         document.getElementById("guidetext").style.color = "red";
                                     }
                                 }
                                 GM_setValue("lastnews",result);
                                     
                             }
                        
                             

     					}
						


	
	
					}
		});
		
	}