// ==UserScript==
// @name 		Enhance Flashback.info
// @namespace 	http://www.katapultstolpiller.com/greasemonkey/
// @description 	The script makes it a little easier to surf flashback.info 
// @include 		*.flashback.info/*
// ==/UserScript==

// This is where you enter image formats you want to have transformed if in links.
var fileformats= new Array()
	fileformats[0] = ".jpg";
	fileformats[1] = ".jpeg";
	fileformats[2] = ".png";
	fileformats[3] = ".gif";
	fileformats[4] = ".svg";
	fileformats[5] = ".bmp";

// Script setup
var fixLink = false; //Should the links jump directly to the linked page? (true/false).
var fixAdverts = true; // Should advertisement be turned off? (true/false).
var transformImages = true; // Should the images be generated from the link? (true/false).
var showImages = true; //Should the images show as default? (true/false).
var showButtons = false; //Should the buttons show? (true/false).
var max_imagewidth = 700; //Max width for the images in pixels.
var max_imageheight = 500; //Max height for the images in pixels.
var backgroundColor = '#F5F5F3'; //This sets the image's border-color.
var textColor = '#505050'; // This sets the color for the image link text.
var imgIdPrefix = 'insertedImage';

//Don't touch stuff beneath this line
if(fixLink){

	var allElements, thisElement;
	allElements = document.getElementsByTagName('a');
	for (var i = 0; i < allElements.length; i++) {
	thisElement = allElements[i];
		if(thisElement.href.toLowerCase().indexOf('leave')!=-1)
		{
			thisElement.href = thisElement.href.substring(36);
		}
	}


/*
	var allElements, thisElement;
	allAnchorElements = document.getElementsByTagName('a');
	var imageDisplayState = showImages ? 'block' : 'none';
	var i;
	for (i = 0; i < allAnchorElements.length; i++) {
		thisElement = allAnchorElements[i];
		if(thisElement.href.toLowerCase().indexOf(leave)!=-1 
		&& thisElement.innerHTML.indexOf('src=')==-1)
		{
			//thisElement.href = thisElement.href.substring(36);
			alert(thisElement.href);
		}
	}
	}*/
}
//Fix adverts
if(fixAdverts){
	function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	addGlobalStyle('OBJECT[WIDTH="745"]{display: none ! important}td[width="175"]{width: 100px ! important}td[width="125"] { display: none ! important; }a[target="new_window"]{ display: none ! important; }img[src="images/misc/fblogo.gif"]{ display: none ! important; }');
	function do_platypus_script() {	remove_it(window.document,document.evaluate('/HTML/BODY/TABLE/TBODY/TR[3]/TD[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);	};	window.addEventListener("load", function() { do_platypus_script() }, false);	function remove_it(doc, node) {	  if (doc == null || node == null) return;	  if (!node.parentNode) return;	  node.style.display = "none";	  doc.last_removed_node = node;	};}
//Fix images
if(transformImages){
var allElements, thisElement;
allAnchorElements = document.getElementsByTagName('a');
var imageDisplayState = showImages ? 'block' : 'none';
var i;

for (i = 0; i < allAnchorElements.length; i++) {
	thisElement = allAnchorElements[i];
	for (var n = 0; n < fileformats.length; n++) {
		if(thisElement.href.toLowerCase().indexOf(fileformats[n])!=-1 
		&& thisElement.innerHTML.indexOf('src=')==-1)
		{
			if(thisElement.parentNode.id.indexOf("post")!=-1)
			{
				thisElement.style.color = textColor;
				thisElement.style.display = 'block';
				thisElement.style.textDecoration = 	'none';
				thisElement.style.width = max_imagewidth + 'px';

				var logo = 	document.createElement('img');
				var imageUrl = thisElement.href;
				if (thisElement.href.indexOf("leave.php") != -1)
					imageUrl = thisElement.href.substring(36);
				
				if (showImages)
				{
					logo.src = imageUrl;
				}
				else
				{
						logo.src = '#';
				}

				logo.id = imgIdPrefix + i;
				logo.alt = imageUrl;
				
				thisElement.insertBefore(logo, thisElement.firstChild);

				logo.style.maxWidth = 	max_imagewidth + 'px';
				logo.style.maxHeight = 	max_imageheight + 'px';
				logo.style.border = 	'0';
				logo.style.display = 	imageDisplayState;
				logo.style.background = 		backgroundColor;
				logo.style.padding = 		'5px';

				if (showButtons)
				{
					var linkButton = document.createElement('input');
					linkButton.type = 'button';
					linkButton.value = showImages ? 'Hide' : 'Show';
					linkButton.setAttribute('style', "font-size:9px;margin:0px;padding:0px;");
					linkButton.setAttribute('id', 'button' + i);
					linkButton.setAttribute('onClick', "layer = document.getElementById('" + imgIdPrefix + i + "'); if (layer.style.display == 'block') {layer.style.display = 'none'; this.value='Show'; } else { layer.src = layer.alt; layer.style.display = 'block'; this.value='Hide'}");

					thisElement.parentNode.insertBefore(linkButton, thisElement);
				}
			}
		}
	}
}
}
if (showButtons)
{
	var postTd;
	var j;
	for (i = 0; i < allAnchorElements.length; i++)
	{
		if (allAnchorElements[i].id.indexOf('postcount') == -1) // Wrong anchor
		{
			continue;
		}
		else
		{
			postTd = 	allAnchorElements[i].parentNode;
			postTd.id = 'TD_' + allAnchorElements[i].id;
		}
		var postImages = postTd.parentNode.parentNode.parentNode.getElementsByTagName('img');
		var hasInsertedImages = false;
		for (j=0; j < postImages.length; j++)
		{
			if (postImages[j].id.indexOf(imgIdPrefix) != -1)
			{
				hasInsertedImages = true;
				break;
			}
		}

		if (!hasInsertedImages)
			continue;

		var postButton = 	document.createElement('input');
		postButton.type = 	'button';
		postButton.value = 	'Show/Hide all images in this post';
		postButton.setAttribute('style', "font-size:9px;margin:0px;padding:0px;");

		var onClickCode;
		onClickCode  = "var postImgElements=document.getElementById('post_message_";
		onClickCode +=  postTd.id.substring(12) + "').";
		onClickCode += "getElementsByTagName('img'); ";
		onClickCode += "for (i=0;i<postImgElements.length;i++) { ";
		onClickCode += " if(postImgElements[i].id.indexOf('";
		onClickCode += imgIdPrefix;
		onClickCode += "')!=-1) { ";
		onClickCode += " if(postImgElements[i].style.display=='block') { postImgElements[i].style.display='none'; }";
		onClickCode += " else { postImgElements[i].src = postImgElements[i].alt ;postImgElements[i].style.display='block';}}}";

		postButton.setAttribute('onClick',onClickCode);	
		postTd.insertBefore(postButton, postTd.firstChild);
	}
}


