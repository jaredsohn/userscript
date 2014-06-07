// ==UserScript==
// @name           tvguide.co.uk Emphasize
// @namespace      http://userscripts.org/users/lorriman
// @description    Emphasizes films or streaming content in grid.
// @include        http://www.tvguide.co.uk*
// @include        http://tvguide.co.uk*
// @version 0.3
// ==/UserScript==

//fetch an arbitrary html page and parse it
function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
        }
    });
}

//for simple hash objects. Addition of properties will stop this working.
function getLength (object) {
	len = 0;
	for (prop in object) if (object[prop].constructor != Function) ++len;
	return len;
}

function getFirstElementByTagName(doc,tag){
	items=doc.getElementsByTagName(tag);
	result=null;
	if(items.length>0){
		result=items[0];
	}
	return result;
}

var getFirstTag=getFirstElementByTagName;

function getChannels(doc){
	var channels={};

		candidates=doc.getElementsByTagName('td');	
		for(var x=0; x<candidates.length;x++){
			cand=candidates[x];
			if(cand.getAttribute('class')=='gridchannel'){
				if(cand.getElementsByTagName('font').length==1){
					channelName=getFirstTag(cand,'font').childNodes[0].nodeValue;
					channels[channelName]=cand;
				}
			}
		}
	return channels;
}


/*
getDOC("http://www.tvguide.co.uk", function(doc) {
	try { 
	

		selectedChannels=getChannels(doc);
		targetChannels=getChannels(document);

		for(target in targetChannels){
			if(!selectedChannels[target]){
				//targetChannels[target].parentNode.style.display = 'none';
			}
		}	
		
*/

function getGridItems(doc){
		var gridItems=[];
		candidates=doc.getElementsByTagName('td');
		for(var x=0; x<candidates.length;x++){
			if(candidates[x].getAttribute('class')=='grid'){
				gridItems.push(candidates[x]);
			}
		}
	return gridItems;
}

function resetGridItems(gridItems){

		for(var x=0; x<gridItems.length;x++){

			gridItem=gridItems[x];
			
			img=getFirstTag(gridItem,'img');
			
				if(img){
					img.style.display='';					
				}
				aTag=getFirstTag(gridItem,'a');
				aTag.style.color='#FFFFFF';			
		}
}

var lastClick=null;

function filmClick(link){
	try{

		var gridItems;

		gridItems=getGridItems(document);
		resetGridItems(gridItems);		

		//toggle
		if(lastClick=='film'){
			lastClick=false;
			return false;
		}else{
			lastClick='film';
		}

		var img;
		for(var x=0; x<gridItems.length;x++){

			isFilm=false;
			gridItem=gridItems[x];
			
			img=getFirstTag(gridItem,'img');
			
			if(img){
				isFilm=(img.alt=='Film');									
			}
		
			if(!isFilm){
				if(img){
					img.style.display='none';
				}
				aTag=getFirstTag(gridItem,'a');
				aTag.style.color='#666666';			
			}
		}

	}
	

	catch( err){
		//alert(err.message);
	}


	return false;

}

function internetClick(link){
	try{

		var gridItems;

		gridItems=getGridItems(document);
		resetGridItems(gridItems);
		
		//toggle
		if(lastClick=='internet'){
			lastClick=false;
			return false;
		}else{
			lastClick='internet';
		}
		
		var img;
		for(var x=0; x<gridItems.length;x++){

			isInternet=false;
			gridItem=gridItems[x];
			
			img=getFirstTag(gridItem,'img');
			
			if(img){
				isInternet=(img.alt=='Watch show online');									
			}
		
			if(!isInternet){
				if(img){
					img.style.display='none';
				}
				aTag=getFirstTag(gridItem,'a');
				aTag.style.color='#666666';			
			}
		}

	}
	

	catch( err){
		//alert(err.message);
	}


	return false;

}


//});

try{

	var secondLink;
	var linkCount=0;
	hrefs=document.getElementsByTagName('a');
	for(var x=0; x<hrefs.length;x++){
		href=hrefs[x];
		if(href.href.match(/systemid=9\&/i)){
			linkCount++;
			if(linkCount==2){
				secondLink=href;
			}
			href.removeAttribute('href');
			href.addEventListener("click", function(){filmClick(href)}, false);
		}
	}
	//this is the second menu, to which we will add a new option 
	if(secondLink){
	
		siblingNode=secondLink.parentNode.parentNode.parentNode.parentNode.parentNode;
		tdNode=document.createElement('td');
		tdNode.align='center';
		tdNode.valign='top';
		tdNode.height="22"
		tdNode.style.padding='0px';
		tdNode.style.spacing='0px';
		tdNode.setAttribute('class','title');
		aNode=document.createElement('a');
		aNode.removeAttribute('href');
		aNode.addEventListener('click',function(){internetClick(secondLink)},false);		
		tdNode.appendChild(aNode);
		aNode.appendChild(document.createTextNode('Internet'));
		
		siblingNode.parentNode.insertBefore(tdNode,siblingNode);
		
	}

}
	catch( err){
		//alert(err.message);
	}

