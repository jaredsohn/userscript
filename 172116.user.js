// ==UserScript==
// @name        believe-in-taenyGif
// @namespace   believe-in-taenyGif
// @include     http://*facebook.com*
//@include     https://*facebook.com*
// @version     2.01
// ==/UserScript==
function getURLParameters(url, paramName) 
{
	var sURL = url; 
	
    if (sURL.indexOf("?") > 0)
    {
       var arrParams = sURL.split("?");         
       var arrURLParams = arrParams[1].split("&");      
       var arrParamNames = new Array(arrURLParams.length);
       var arrParamValues = new Array(arrURLParams.length);     
       var i = 0;
       for (i=0;i<arrURLParams.length;i++)
       {
        var sParam =  arrURLParams[i].split("=");
        arrParamNames[i] = sParam[0];
        if (sParam[1] != "")
            arrParamValues[i] = unescape(sParam[1]);
        else
            arrParamValues[i] = "No Value";
       }

       for (i=0;i<arrURLParams.length;i++)
       {
                if(arrParamNames[i] == paramName){
            //alert("Param:"+arrParamValues[i]);
                return arrParamValues[i];
             }
       }
       return "No Parameters Found";
    }

}



function showGif()
{

	/*
	var now = new Date();
	var ticks = now.getTime();
	console.info(ticks);
	*/
	
	
	var getUrl;
	spans = document.getElementsByClassName('userContent');

	for (i in  spans) 
	{
		s = spans[i];
		var getStr = s.innerHTML;
		var getContent = s.textContent;
		var description = "";

		if(getStr != undefined)
		{
			var startPos = getStr.search("http%3A%2F%2Fwww.yuchirian.com%2Fgif%2Fview");
			var endPos = getStr.search("nl%3D");
			var httpPos = getContent.search("http");

			if(startPos!=-1)
			{
				var getUrl = getStr.substring(startPos, endPos+6);
				description = getContent.substring(0,httpPos-1);
				
				if(description != "") description += ("<br/><br/>");
				
				var ids = getURLParameters(decodeURIComponent(getUrl),"id").split("-");
				var imgCodes="";
				for each(id in ids)
				{
					imgCodes += "<img style=\'max-width:100%' src=http://www.believe-in-taeny.com/gif/" + (id) + ".gif>" + "<br/>";
				}
				
				s.innerHTML = description + imgCodes +  '<a href ='  +  decodeURIComponent(getUrl) + ' target=_blank>' +  '<img src=http://www.believe-in-taeny.com/believe-in-taenyGif/believe-in-taeny.icon.jpg> ' + decodeURIComponent(getUrl)  + '</a>';
			}
				
		}				

	}



		// Clean-u////////////////////////////////////////////////////////////////
		divs=document.getElementsByClassName('shareUnit');
				
		for (i in  divs) 
		{
			d= divs[i];

			var getContent = d.textContent;
			if(typeof getContent!= 'undefined')
			{
				var searchResult = getContent.search("believe-in-taeny.com/gif");

				if(searchResult != -1)
				{
					d.innerHTML = "";

				}
				
				var searchResult = getContent.search("believe-in-taeny|Gif");

				if(searchResult != -1)
				{
					d.innerHTML = "";

				}				
				
				
				
				
	
			}
			

		}


		udivs=document.getElementsByClassName('uiAttachmentTitle');
				
		for (ui in  udivs) 
		{
			ud= udivs[ui];

			var ugetContent = ud.textContent;
			
			if(typeof ugetContent!= 'undefined')
			{
				var usearchResult = ugetContent.search("believe-in-taeny.com/gif");

				if(usearchResult != -1)
				{
					ud.innerHTML = "";

				}
				
				var usearchResult = ugetContent.search("believe-in-taeny|Gif");

				if(usearchResult != -1)
				{
					ud.innerHTML = "";

				}				
				
				
				
				
				
				

			}
			
			

		}


	
}


//------------------------------- Page Load process -----------------------------
function process() {
  document.getElementById('content').removeEventListener('DOMSubtreeModified', process, false);
  window.setTimeout(function() {
    showGif();
    document.getElementById('content').addEventListener("DOMSubtreeModified", process, false);
  }, 200);
}

// Wait for Facebook's content element to exist
if (self.location == top.location) 
  var checker=setInterval(function(){
    if(document.getElementById('content')) {
      clearInterval(checker);
      process(); // Start the listener
    }
  }, 200);
