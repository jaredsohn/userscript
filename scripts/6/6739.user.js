// ==UserScript==
// @name          Enriching yahoo search
// @version	  6.1
// @description    To display the serach result page in popup and option to bookmark teh same from serach page along with flickr images
// @include       http://search.yahoo.com/*
// @namespace	  prem nawaz khan & smitha s
// ==/UserScript==

   var form = document.forms.namedItem("s");
   if(typeof form=='undefined')  return;
   var input = form.elements.namedItem("yschsp");
   var url='http://www.flickr.com/search/?q='+input.value+'&w=all&s=int';

 	
	var allLinks, thisLink;
	allLinks = document.evaluate("//a[@class='yschttl']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allLinks.snapshotLength; i++)
	{
		thisLink = allLinks.snapshotItem(i);

		/*smitha*/
		
		//Get the url starting afetr teh double star 
		var href=thisLink.getAttribute("href");
		
		var j = href.indexOf('*http');
			if (j != -1)
      			href = decodeURIComponent(href.substring(j+1));
				

		// To add to bookmark and strip of the html elements from the text to be added to tile of bookmark
		var bookmarktxt=stripHTML(thisLink.innerHTML);
		var bookmarkurl="javascript:window.sidebar.addPanel('"+bookmarktxt+"','"+ href+"',\"\")";
		
		//Create a link that adds to bookmark
		var bookmark=document.createElement('a');
		bookmark.setAttribute('href',bookmarkurl);
		
		
		var bookmarktxt=document.createElement('img');
		bookmarktxt.src="http://urology.jhu.edu/img/bookmarkIcon.gif";
		
		bookmark.appendChild(bookmarktxt);
		bookmark.style.paddingLeft = "1em";
		bookmark.style.paddingRight = "1em";
		
		thisLink.parentNode.insertBefore(bookmark,thisLink.nextSibling);
		
				
		thisLink.addEventListener("mouseover", popup, false);
		//thisLink.addEventListener("mouseout", removepopup, false);
		
	}
	
		
   GM_xmlhttpRequest({
   method: 'GET',
   url: url,
   headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
   },
     onload: function(responseDetails)
     {

           var text=responseDetails.responseText;
           storeResponse(text);
     }
   });
   
	function stripHTML(txt){
	var re= /<\S[^><]*>/g
	
	var txt=txt.replace(re, "")
	return(txt);
  }
  
  function removepopup()
  {
    try
		{
		var popdiv=getElementsById('testcheck');

		for(var i=0;i<popdiv.length;i++)
		{
		var popnode=popdiv[i];
		var parent=popnode.parentNode;
		parent.removeChild(popnode);
		}

		}
		catch(e)
		{

		}

  }
	
     function popup()
     {
		var href=this.getAttribute("href");
		var popuphead=stripHTML(this.innerHTML);
		var node=this;
		var j = href.indexOf('*http');
			if (j != -1)
      			href = decodeURIComponent(href.substring(j+1));
       
	    
	   try
		{
		var popdiv=getElementsById('testcheck');
		
		for(var i=0;i<popdiv.length;i++)
		{
		var popnode=popdiv[i];
		var parent=popnode.parentNode;
		parent.removeChild(popnode);
		}
			
		}
		catch(e)
		{

		}
		
		  //Div created for teh popup
		  var divmajor=document.createElement('div');
		  divmajor.id="testcheck";
		  divmajor.setAttribute("resizable","yes");
      divmajor.style.height='350px';
		  divmajor.style.width='700px';

		  //Created the anchor tag for closing teh div
		  var closejs="javascript:((document.getElementById('testcheck')).parentNode).removeChild(document.getElementById('testcheck'))";

		  document.styleSheets[0].insertRule("#closediv {position:absolute;font-weight:bold;text-align:left; }", 0);
		  var closediv=document.createElement('span');
		  closediv.id='closediv';
		  var closenote=document.createTextNode(popuphead);
		  closediv.appendChild(closenote);
		  divmajor.appendChild(closediv);	
			
		 var closespan=document.createElement('span');	
		 document.styleSheets[0].insertRule("#closespan {text-align:right; }", 0);
		 closespan.id='closespan';
		 		 
			var closebutton=document.createElement('a') ;
			closebutton.setAttribute('href','#');
			closebutton.setAttribute('onclick',closejs);
						
		  		var closetxt=document.createElement('img');
				closetxt.src="http://www.php-development.ru/javascripts/popup/form_exit.png";
				closetxt.border='0';
			    closetxt.align='right';
				closebutton.appendChild(closetxt);
		
		closespan.appendChild(closebutton);
		divmajor.appendChild(closespan);  		  
		  

		  var breakele=document.createElement('br');
		  divmajor.appendChild(breakele);
		  
		  //iframe containing the content of the page	
          var divelem = document.createElement("iframe");
          divelem.setAttribute("resizable","yes");
          divelem.id="smitha";
		  divelem.style.position='absolute';
		  divelem.style.zIndex=99999;
		  divelem.border="0";
		  divelem.style.height='350px';
		  divelem.style.width='700px';
		  divelem.scrolling="yes";
		  
		  divmajor.appendChild(divelem);
		  
		  
		  node.parentNode.insertBefore(divmajor,node);
		  divelem.src=href;
	
	   
     }
		
		
	function getElementsById(sId)
	{
    var outArray = new Array();	
	if(typeof(sId)!='string' || !sId)
	{
		return outArray;
	};
	
	if(document.evaluate)
	{
		var xpathString = "//*[@id='" + sId.toString() + "']"
		var xpathResult = document.evaluate(xpathString, document, null, 0, null);
		while ((outArray[outArray.length] = xpathResult.iterateNext())) { }
		outArray.pop();
	}
	else if(document.all)
	{
		
		for(var i=0,j=document.all[sId].length;i<j;i+=1){
		outArray[i] =  document.all[sId][i];}
		
	}else if(document.getElementsByTagName)
	{
	
		var aEl = document.getElementsByTagName( '*' );	
		for(var i=0,j=aEl.length;i<j;i+=1){
		
			if(aEl[i].id == sId )
			{
				outArray.push(aEl[i]);
			};
		};	
		
	};
	
	return outArray;
 }
	
     function storeResponse(response)
     {
       var showcount=7;             //The number of images to be shown in results
			if(response.length > 0)
      {
          var divelem = document.getElementById("yschsec")
          divelem.innerHTML=response;
          var imgs_start='<ol start="1"><b > Some images from '+input.value+'</b>';
          var imgs='',href;
            //added xpath
                  var allLinks, thisLink;
                  allLinks = document.evaluate("//td[@class='DetailPic']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                  for (var i = 0; i < allLinks.snapshotLength; i++)
                  {
                      thisLink = allLinks.snapshotItem(i);

                      if(i<showcount)
                      {
                             divelem.innerHTML=thisLink.innerHTML;
                             //var href=divelem.firstChild.getAttribute("href");
                             //divelem.firstChild.setAttribute("href","http://flickr.com/"+href);

                             href="http://flickr.com/"+( (divelem.childNodes[1]).getAttribute("href"));
                             divelem.childNodes[1].setAttribute("href",href);
                             divelem.childNodes[1].setAttribute("target","_new");
                             imgs+='<li>'+divelem.innerHTML+'</li>';
                      }
                  }
                  if(imgs!='')
                  {
                       divelem.innerHTML=imgs_start+imgs+'</ol>';
                  }
                  else
                  {
                      divelem.innerHTML='';
                  }
           }
          };
