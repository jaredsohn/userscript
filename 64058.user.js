// ==UserScript==
// @name           EC-TextWeather
// @namespace      http://weather.gc.ca/forecast/*
// @description    Removes unwanted forecasts from Environment Canada's text weather bulletin pages
// @include        http://weather.gc.ca/forecast/*
// @grant          none
// @version        1.1
// ==/UserScript==

// Change Log
// Changes in version 1.1
//     -updated domain in header

//find the text nodes within a pre tag with a 'bulletintext' class
textForecast = document.evaluate(
  "//pre[@class='bulletintext']//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
//alert("snapshotLength = " + textForecast.snapshotLength);

//return if no bulletin found on this page
if (textForecast.snapshotLength <= 0) return;

var preTag, newPreTag;
//find the pre tag, used to add new data and remove the old from the page
preTag = document.evaluate("//pre[@class='bulletintext']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (preTag) {
	//this new element will contain only the desired text clips
	newPreTag = document.createElement("pre");
	newPreTag.id="myforecast";
	newPreTag.style.fontSize = 'medium';
	var html = "";      //holds the important info to put on the web page
	var intCont = 0;    //flag used when a desired clip of data crosses over two text nodes
	
	//process each text node
    for (var i = 0; i < textForecast.snapshotLength; i++) {
		var index = 0;         //track place in text node
		var indexComp = 0;     
		var indexComp2 = 0;
		
		//actual data from the current text node
		//search through this for any important messages
		var textClip = textForecast.snapshotItem(i).data;
		
		//if an important section of data was cut in two by the text node division in the DOM
		//    then extract the remaining part from the beginning of the current text node
		if(intCont != 0) {
			//search for the end of the desired text data
			index = textClip.indexOf("\n\n");
			html += textClip.substring(0, index) + "<br/>";
			index += 1;    //start searching from here for the more data
			intCont = 0;   //reset continue flag
		}
		
		//loop through the current text node as many times as needed to extract the
		//     desired text data
		while (1) {
			//search for start of earliest desired text bulletin


			indexComp = textClip.indexOf("FPCN", index);   //search for bulletin headers, DON'T change this
			
//------------------------------------------------------
//Edit the section below based on your location
//------------------------------------------------------
			
                        indexComp2 = textClip.indexOf("Stratford", index);   //change Stratford to your local area
				//check if 'Stratford' is found before the 'FCPN'
			if (indexComp2 > 0 && indexComp2 < indexComp) indexComp = indexComp2;
				//check if 'Stratford' is found but NOT 'FCPN'
			if (indexComp2 > 0 && indexComp == -1) indexComp = indexComp2;

			indexComp2 = textClip.indexOf("Waterloo", index);
			if (indexComp2 > 0 && indexComp2 < indexComp) indexComp = indexComp2;
			if (indexComp2 > 0 && indexComp == -1) indexComp = indexComp2;

//---------------------------------------------------------------------------
//NOTE: You can duplicate the 3 lines above as many times as you like.
//      Then change the text string to add another area to your forecasts.
//---------------------------------------------------------------------------
			
			
			//alert(indexComp + " : " + textClip.charAt(indexComp));
			
			//if none of the above strings are found, continue on to next text node
			if (indexComp == -1) break;
			
			//search backwards to find the start of the text clip
			var start = textClip.lastIndexOf("\n\n", indexComp);
			//search for the end of the text clip
			var end = textClip.indexOf("\n\n", indexComp);
			//alert("start: " + start + " end: " + end);
			
			//if end cannot be found, assume the important text clip is continued
			//    in the next text node.
			if (end == -1) {
				html += textClip.substring(start);
				intCont = 1;   //flag the beginning of the next text node
				               //     as a continuation of the current text
				break;
			}
			
			//start searching for next text clip after the end of this one
			index = end+1;
			
			//add text clip to final page
			html += textClip.substring(start, end) + "<br/>";
			//alert(html);
		}
		
	}
	
	//place the desired text in a new page element
	newPreTag.innerHTML += html;
	
	//insert the new element into the page
	preTag.snapshotItem(0).parentNode.insertBefore(newPreTag, preTag.snapshotItem(0));
	
	//delete the old element
	preTag.snapshotItem(0).parentNode.removeChild(preTag.snapshotItem(0));
	
}
	

