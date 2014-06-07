// ==UserScript==
// @name           Pixiv AJAX bookmarking
// @namespace      RevPsych
// @description    Allows bookmarking images on Pixiv without leaving the image page.
// @include        *pixiv.net/*
// @version			0.2
// ==/UserScript==

/*
BEGIN OPTIONS
*/

/*
defaultPrivacy

Set to "0" for public bookmarks of non-R18 images. Set to "1" to always set to private
*/
defaultPrivacy = "0";

/*END OPTIONS*/




/*BEGIN CODE*/

//Find the bookmark button
el = document.getElementsByClassName("bookmark-container")[0];

//Because the manga page does things differently
if(el == null){
	//Get the illustration ID#
	el = document.getElementsByName("illust_id")[0];
	illustId = el.value;

	//Create the url to the bookmark_add page
	url = "http://www.pixiv.net/bookmark_add.php?type=illust&illust_id=" + illustId;

	//Get the text from the button
	inner = el.parentNode.childNodes[2].value;

	//Select the section
	el = el.parentNode.parentNode;

	//Remove the button
	el.removeChild(el.childNodes[0]);
}
else{
	el = document.getElementsByClassName("bookmark-container")[0].getElementsByClassName("_button")[0];

	//Copy the url and text
	url = el.href;
	inner = el.innerHTML;

	//Remove the button
	el.parentNode.innerHTML="";

	el = document.getElementsByClassName("bookmark-container")[0];
}

//Create a new button
z = document.createElement("p");
z.setAttribute("class", "_button");
z.innerHTML = inner;
z.setAttribute('value', url);

//Add it to the document
z = el.appendChild(z);

//Add an event listener to launch our function
z.addEventListener('click',ajaxRelated,false);

function ajaxRelated() {

// Grab the element that called this function
el = this;

//Update the innerHTML
el.innerHTML = "<b>Adding...</b>";

// get the url that's stored in the link's value attribute
url = el.getAttribute("value");

//Fetch the bookmark page to pull tags and other necessary data
GM_xmlhttpRequest({
method: "GET",
url: url,
onload: function(o) {

//Store the response
response = o.responseText;

//Create a new element to attach the response text to
temp = document.createElement('div');
temp.style.display = "none";

//Select the text between the body tags
body = response.slice(response.indexOf(">", response.indexOf('<body'))+1,response.indexOf("</body>"));

//Now put the response text into our temporary element
temp.innerHTML = body;

//Now attach it to the document so we can use it
document.body.appendChild(temp);

//Get the div element of the recommended tags section (there are two, but we only want the first one)
related = temp.getElementsByClassName('recommend-tag')[0];

//Initialize string
tags = "";

//Set privacy
r18 = defaultPrivacy;

//Get the individual elements that contain the tags
tagEl = related.getElementsByClassName('tag');

//Get the tags and store them in a string
for(i=0;i< tagEl.length;i++){
	cur = tagEl[i].getAttribute("data-tag");

	//If r-18, mark it as such
	if(defaultPrivacy == "0" && (cur.toLowerCase() == '*r-18' || cur.toLowerCase() == 'r-18')) 
		r18 = '1';

	//Add the tag to the tag list
	tags = tags + cur + ' ';
}

//Get the hidden tt value for POSTing
var tt = document.getElementsByName('tt')[0].value;

//Extract the illustration ID from the url
var patt = /(?:[0-9]{1,})$/;
var illustId = patt.exec(url);

//Submit our information to bookmark_add.php
GM_xmlhttpRequest({
method: "POST",
url: "http://www.pixiv.net/bookmark_add.php",
headers:{'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
data: "type=illust&id="+illustId+"&tt="+tt+"&restrict="+r18+"&comment=&mode=add&from_sid=&submit=&tag="+tags,
onload: function(o) {
	//Remove bookmark button
	el.parentNode.removeChild(el);

	//Replace the bookmark button with the edit bookmark button
	bC = document.createElement("a");
	bC.className = "button-on";
	bC.href = url;
	bC.innerHTML = "Edit Bookmark";
	document.getElementsByClassName('bookmark-container')[0].appendChild(bC);
}
});

}
});



}

