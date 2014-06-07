// ==UserScript==
// @name           Empornium New Torrent Sign
// @namespace      watergirls
// @description    Adds a new sign on the torrents on empornium.
// @include        http://www.empornium.us/browse.php?*
// @include        http://www.empornium.us/browse.php
// ==/UserScript==

img_new='data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAPCAIAAAB82OjLAAAABGdBTUEAAK/INwWK6QAAABl0'+
'RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD8SURBVHjatFTBDsIgDO2IUe/q'+
'D7Cjnpy/sF/ha+dJb4bFz1Av9YW6pWMQZ+KajnSlPB5tgWg2KfAx8/9xIQJ9FkNv2I29cJJX'+
'8EeRR2YgL8ahSeGMs8ivMtk0ZeAmUomhV9ZWzBgBug720looDlh1illEHrzfOsdhe2Gw937j'+
'XAJaJxfLBF3LtSxRD+izbWkYvAt7jFNn9OnEe6trQdfQ8GjWuTJoO1HGV9uCI7Ai1j1fmlYJ'+
'+jQfEfSCPDBjbJQtRi8yC314j9+7c70h/qa7KIO+/sJgmLeoSbTzNO7rKU3NE/p9UEb+8bIk'+
'w1hl+A9vSG6tMWa+h4/eAgwAVZ+ZGhrkLecAAAAASUVORK5CYII=';

/**
	This function returns a funtion to be applied to the image when the new image is clicked.
*/
function addImageClickEvent(intTorrentId){

	var intCurrentTorrentId = intTorrentId;
	
	// return the event function
	return function(evt){
		GM_setValue("emp_torrent_id", intCurrentTorrentId);
		location.reload();
	}
}

/**
	This function loads all the table columns, and determines which ones contain links to a torrent.  When the 
	links are identified, it strips out the torrent id and compares it to the stored value to determine
	whether to show the new image.
*/
function registerNewTorrents(){

	//get the last torrent link from storage
	var intLastTorrentId = GM_getValue("emp_torrent_id", 1);
	
	// get the columns on the page
	var arrColumns = document.getElementsByTagName('td');
	
	// loop through each column
	for(var x=0; x < arrColumns.length; x++)
	{
		// get the columns that have a font size of 10px and left alignment
		var objColumn = arrColumns[x];
		var strFontAlign = objColumn.getAttribute("align");
		var strFontStyle = objColumn.style.fontSize;

		// get the columns that are left aligned and 10px (these are the torrent links)
		if(strFontAlign == "left" && strFontStyle == "10px")
		{
			// get the string representation of the href link
			var arrLinks = objColumn.getElementsByTagName('a');
			var strHref = arrLinks[0].attributes[0].nodeValue;
			
			// get the torrent id associated with the link
			var intTorrentId = parseInt(strHref.substr(strHref.lastIndexOf("id=") + 3));
			
			//if the torrent id is greater than the stored value, insert the image and add the link
			if(intTorrentId > intLastTorrentId)
			{
				//create the image object
				var objImage = document.createElement("img");
				objImage.setAttribute("src", img_new);
				objImage.setAttribute("style", "padding-right: 6px;");
				arrLinks[0].parentNode.insertBefore(objImage, arrLinks[0]);
				
				//add the object listener to the image, and pass the torrent id
				objImage.addEventListener('click', addImageClickEvent(intTorrentId), true);
			}
		}
	}
	
}

//register the new torrents on the page
registerNewTorrents();