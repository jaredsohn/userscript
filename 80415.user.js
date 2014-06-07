// ==UserScript==
// @name           Geocaching.com Pretty Logs
// @namespace      http://thebuce.net/cache
// @description    GC.com Geocache logs now look nice, w/inline image gallery
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==
/*
  Changes to page display:
    * Added thick border to log collection
    * Clearer separation between logs
    * Replaced text-only link to popup photo with summary/count of all thumbnails for the log
    * Clicking to display thumbnail table reveals thumbnail list with photo title, plus:
      - Link to photo page (shows parent log with the selected photo)
      - Link to original raw uploaded image
    * Clicking a thumbnail displays standard inline enlarged photo and caption
    * All thumbnails now belong to one 'set', so when an image is open, moving forward and backward continues for all photos available on the current cache page (ie, loading all logs will allow viewing through all available photos for the cache)
    * Removes Lost & Found banner

  Author: thebruce0 (GC.com user)
*/

var version="1.0";
var thumbCols=3;	//Maximum columns (good for standard browser widths; if you have a large monitor, a higher max may suffice)

//Get Logs table
var LogTable = (LogTable=document.evaluate("//table[@class='LogsTable Table']/tbody", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0))?LogTable:null;

//Only continue if Table of logs exists
if (LogTable) {

//Prepare new Log styles
GM_addStyle(	'.logheadinfo { background:white;margin-bottom:10px;padding:0px 5px;border:solid 1px #DDD;line-height:2em; } .logheadinfo img { vertical-align:middle; }'+
		'.gallerythumbs { width:95%;display:none;border:solid 3px #DDD;background:#FAA;margin:10px auto; } '+
		'.pregallerythumbs { width:95%;border:solid 3px #DDD;background:#FAA;margin:10px auto; } '+
		'.gallerythumblink { text-align:center;float:left;display:block;margin-right:5px;width:100px; } '+
		'.gallerythumbtd { vertical-align:top;width:'+(parseInt(100/thumbCols, 10))+'%;height:81px;margin:5px;font-size:.9em;font-weight:bold; } '+
		'.gallerymorelink { text-decoration:none;float:right; } '+
		'table.LogsTable { margin-top:3px;border-collapse:separate;border:solid 6px #999;border-color:#BBB #777 #555 #999; } '+
		'.LFNominateBanner { display:none; } ');

//Loop through all log entries
for (i in LogTable.childNodes) { 
	var row=LogTable.childNodes[i], cel=row.firstChild, newinfo=document.createElement('div'), thmCol=thumbCols;
	if (!(cel?cel.childNodes.length>0:false)) continue;
	cel.style.cssText+='border:inset 1px #000;padding:5px 7px;margin:2px;';

	//Now handle logs with images
	if (cel.innerHTML.match(/\/photo.png/i)) {
		var logInfo = cel.textContent.match(/^\s+(.*?) by (.*)\s?\(/,"");
		var newTbl, newDiv = document.createElement('div'), imgTbl=(imgTbl=cel.getElementsByTagName('table'))[imgTbl.length-1];
		var linkList = imgTbl.getElementsByTagName('a');	//array of image links
		newDiv.innerHTML='<table align="center"></table>';	//setup gallery container
		newTbl=newDiv.firstChild;
		newTbl.className='gallerythumbs';
		i=0; while (i < imgTbl.getElementsByTagName('a').length) {
			//create row if necessary
			if (thmCol>=thumbCols) { var imgRow=newTbl.insertRow(-1); imgRow.style.cssText='width:100%;'; thmCol=0; }
			//analyze link information
			var imgName=linkList[i].text, imgLarge=linkList[i].href, imgTitle=linkList[i].title;
			imgName = imgName.replace(/^[\s\"']*/, "").replace(/[\s\"']*$/, "").replace(/\.jpg$/i, "");
			//analyze log information
			var imgInfo = imgTitle.match(/(log.aspx.*?LID=\d+).*>\s*(.*)\s*$/);
			//crew new thumbnail link
			var newLink = linkList[i]; //document.createElement('a');
			newLink.childNodes[2].textContent='';
			newLink.className+=' gallerythumblink';
			newLink.rel="tb_images[newslides]";
			var img=newLink.firstChild;
			img.title = imgName+ (imgInfo[2]!=''?(' - ' + imgInfo[2]):'');
			img.alt = imgName;
			//if not spoilered, replace img source w/thumbnail
			if (!imgName.match(/(spoil|spiol|spoli|It'?s here)/i))
				img.src = imgLarge.replace(/\/log\//i, "\/log\/thumb\/");
			else {	//spoilered, so leave default icon but note spoiler info
				img.title = '** SPOILER ** '+imgName;
				img.alt = '** SPOILER ** '+imgName; }
			//create gallery cell item, add image and text description
			var imgCel=imgRow.insertCell(-1);
			imgCel.className='gallerythumbtd';
			imgCel.appendChild(newLink);
			imgCel.appendChild(document.createTextNode(imgName));
			imgCel.appendChild(document.createElement('br'));
			//create link to go to image detail page
			var newLink = document.createElement('a');
			newLink.href = imgInfo[1];
			newLink.target = '_blank';
			newLink.title = imgName;
			newLink.textContent = '(read more...)';
			newLink.className = 'gallerymorelink';
			imgCel.appendChild(newLink.cloneNode(true));
			//create link to go directly to the full size image in new window
			newLink.textContent = '[raw]';
			newLink.href = imgLarge;
			newLink.style.cssText = 'font-weight:normal;';
			imgCel.appendChild(newLink);
			imgCel.insertBefore(document.createElement('br'),newLink);
			thmCol++;
		}
		//create brief thumbnail note
		var hideTbl = document.createElement('table');
		hideTbl.className='pregallerythumbs';
		hideTbl.insertRow(-1); hideTbl.firstChild.firstChild.insertCell(-1);
		hideTbl.getElementsByTagName('td')[0].innerHTML='Images in this log: <b>'+(newTbl.getElementsByTagName('td').length)+'</b>. (<a href="javascript://" onclick="var box=this.parentNode.parentNode.parentNode.parentNode; box.style.cssText+=\'display:none;\'; box.parentNode.lastChild.firstChild.style.cssText+=\'display:table;\'; return false;"><b>Show Thumbs</b></a>)';
		//remove the old gallery, add the summary and new gallery
		cel.removeChild(imgTbl);
		cel.appendChild(hideTbl);
		cel.appendChild(newDiv);
	}
}
//remove a strange empty last row in the log table
if (LogTable.lastChild.textContent.replace(/\s+$/,'').replace(/^\s+/,'')=='') LogTable.removeChild(LogTable.lastChild);
}
