//#yahoo_mail_picture_view.user.js
// ==UserScript==
// @name          Yahoo Mail Picture View!
// @author        Motty Katan
// @namespace     http://moppy.4free.co.il
// @description	  allowing to view the attachments picture instead of downloading and then viewing(too long process) pretty nit! untill yahoo releases thier version this is the best you can add! Motty Katan(c) 06-02-2006 updated at 17-04-2006
// @include       http://*.mail.yahoo.com/ym/ShowLetter*
// @include       http://*.mail.yahoo.com/ym/blocksender*
// ==/UserScript==
// Build Changes:
// 09-02-2006 *updated: the img resides inside a div now so it won't expand
//            the div(till the td size) if you like it the old way
//            I can add a config variable and let you choose it.
//            *improved: now we get the link containing the thumbail a lot
//            faster using the childNodes array instead of the document.evaluate
//18-02-2006 added http://us.f516.mail.yahoo.com/ym/blocksender* to the include
//                      when marking a message as spam we see the next after that with this url.
//26-03-2006 Minor bug fixed: call to undefined div was fixed.(reallocated)
//17-04-2006 changed include urls to use '*' instead of server number.
/**
 * function showImage()
 *
 * global function.
 * adds the image to the dom and add a link around it to hide it
 * @param int     nLinkId serial number of the picture
 * @param string  href of the image hosted by yahoo mail
 **/
unsafeWindow.showImage = function(nLinkId,s,e){
    //if we already created the image just use existing copy
    img = document.getElementById("temp"+nLinkId);

	  oLink = document.getElementById("pic"+nLinkId);

    //first time the user wanted to view the pic
    if (!img)
    {
      div = document.createElement("DIV");
      div.style.position = "absolute";
      div.style.left = oLink.style.left;
      div.style.top = oLink.style.top;
      div.style.zIndex = 20;
      
      img = document.createElement("IMG");
      img.src = s+"&download=1";
      img.name = "temp"+nLinkId;
      img.id   = "temp"+nLinkId;
      
      div.appendChild(img);
      //finally we add it right after the link
      oLink.appendChild(div);
    }
    else
    {
	    //and it's hidden so:
	    img.style.display = "block";
    }

    //redirecting the link to hide the picture
    oLink.href = "javascript:hideImage("+nLinkId+",'"+s+"');";
}

/**
 * function hideImage()
 *
 * global function.
 * hides the full size image and change the link back to showImage
 * @param int     nLinkId serial number of the picture
 * @param string  href of the image hosted by yahoo mail
 **/
unsafeWindow.hideImage = function(nLinkId,s){
	img = document.getElementById("temp"+nLinkId);
    //hidding it
	img.style.display = "none";

	oLink = document.getElementById("pic"+nLinkId);
    //redirecting back to showImage
	oLink.href = "javascript:showImage("+nLinkId+",'"+s+"');";
}


//find all images
findPattern = "//td[@class='image']";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
for (var n = 0; n < resultLinks.snapshotLength; n++)
{
	var links = resultLinks.snapshotItem(n).childNodes;
	i = 0;
	while(i<links.length && links[i].tagName!="A")
	{i++;}

	if (links[i].tagName=="A")
	{
	    //the link containing the thumbnail
	    wrap=links[i];
	    //assign a name later on it will be very important
	    wrap.id = "pic"+n;
	    //assign a new link to view the image larger size
	    wrap.href= "javascript:showImage("+n+",'"+wrap.href+"')";
	}
}
