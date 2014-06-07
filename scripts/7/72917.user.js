// ==UserScript==
// @name           Pinkbike Image on Mouseover
// @namespace      http://userscripts.org/users/75950
// @description    Pinkbike shows bigger image on Mouseover
// @include        http://www.pinkbike.com/photo/list/?*
// @version        2.0.0
// ==/UserScript==

GM_addStyle(".thumbnail{position: relative;z-index: 0;}.thumbnail:hover{background-color: transparent;z-index: 50;}.thumbnail span{ position: fixed;border-width: 0;padding: 0px;left: 20px; top: 20px;display: none;color: black;text-decoration: none;}.thumbnail span img{ border-width: 0;padding: 0px;} .inElm{overflow: visible !important} ul.uPhotoSmall{overflow: visible !important}");

window.addEventListener("load", alterLinks, false);

function selectNodes(doc, context, xpath)
{
   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var result = new Array( nodes.snapshotLength );

   for (var x=0; x<result.length; x++)
   {
	  result[x] = nodes.snapshotItem(x);
   }

   return result;
}

function cropImage(heightScope, widthScope, img, imgHeight, imgWidth){
	var heightPercent = heightScope / imgHeight.value;
	var widthPercent = widthScope / imgWidth.value;
	if(heightPercent < 1 || widthPercent < 1){
		var percent = heightPercent < widthPercent ? heightPercent : widthPercent;
		img.height = Math.floor(imgHeight.value * percent) - 5;
		img.width = Math.floor(imgWidth.value * percent) - 5;
	} else {
		img.height = imgHeight.value;
		img.width = imgWidth.value;
	}
}

function handleMouseOver(event){

	var span = event.currentTarget.getElementsByTagName("span")[0];
	var img = span.getElementsByTagName("img")[0];
	var imgWidth = span.getElementsByTagName("input")[0];
	imgWidth.value = imgWidth.value == "" ? img.width : imgWidth.value;
	var imgHeight = span.getElementsByTagName("input")[1];
	imgHeight.value = imgHeight.value == "" ? img.height : imgHeight.value;

	var heightScope = window.innerHeight-40;
	var widthScope = window.innerWidth*.8;
	cropImage(heightScope, widthScope, img, imgHeight, imgWidth);

	span.style.display = "inline";

}

function handleMouseOut(event){
	var span = event.currentTarget.getElementsByTagName("span")[0];
	span.style.display = "none";
}


function addCSSMagic(thumbnailLink, itsID)
{
	// Add thumbnail class to each link
	thumbnailLink.className = "thumbnail";
	thumbnailLink.addEventListener("mouseover", handleMouseOver, false);
	thumbnailLink.addEventListener("mouseout", handleMouseOut, false);

	// Add a hidden span holding actual image for each link
	var span = document.createElement('span');
	thumbnailLink.appendChild(span);
	var image = document.createElement('img');
	image.src = 'http://gp1.pinkbike.org/p4pb'+itsID+'/p4pb'+itsID+'.jpg';
	span.appendChild(image);
	var imgWidth = document.createElement("input");
	imgWidth.setAttribute("type","hidden");
	imgWidth.setAttribute("value","");
	span.appendChild(imgWidth);
	var imgHeight = document.createElement("input");
	imgHeight.setAttribute("type","hidden");
	imgHeight.setAttribute("value","");
	span.appendChild(imgHeight);

    thumbnailLink.addEventListener("click", handleClick, false);
}

function handleClick(event) {
handleMouseOut(event);
putFocusSomewhere();
}

function putFocusSomewhere() {
}

function alterLinks(){

	doc = window.document;

	// Get a list of all IMG tags that have a photo.
	var imageLinks = selectNodes(doc, doc.body, "//IMG[contains(@src,'//gp')]");

   console.log(imageLinks);
   
	if(imageLinks.length > 0){

		for (var x=0; x<imageLinks.length; x++)
		{
			// Capture the ID between the start and stop key strings.
			var imatch = imageLinks[x].parentNode.href.match( /\/photo\/(.*?)\// );

			// If it matched successfully...
			if (imatch)
			{
			    var theID = parseInt(imatch[1]);
                addCSSMagic(imageLinks[x].parentNode, theID);
			}
		}

	}
}
