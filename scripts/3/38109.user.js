// A proposal FEST written by Jeff Gaskill for the Informatics 161 course at the University of California, Irvine.
// ==UserScript==
// @name           CNET Cell Phone Quality Rating on Mobiledia.com
// @namespace      userscripts.org
// @description    Injects CNET cell phone quality ratings into the comparison feature on Mobiledia.com for easy comparison of usability.
// @include        http://www.mobiledia.com/phones/compare/compare.php
// ==/UserScript==

function constructSearchURL( name ){

name = name.split("&amp;");

var anew = name[0];

for(var i = 1; i < name.length; i++){
	anew = anew.concat("%26");
	anew = anew.concat(name[i]);
}

var searchLink = "http://reviews.cnet.com/1770-5_7-0.html?query=" + anew + "&tag=srch";
return searchLink;
}

function getProductURL( data, cell ){
	searchPage = data.responseText;
	searchPage = searchPage.substr(searchPage.indexOf("productName"));
	searchPage = searchPage.substring(searchPage.indexOf("href")+7, searchPage.indexOf("html"));
	productLink = "http://reviews.cnet.com/" + searchPage + "html";
		GM_xmlhttpRequest({
		method: "GET",
		url: productLink,
		onload: function (data) {
			getReviewURL(data, cell)}});
}

function getReviewURL( data, cell ){
	reviewPage = data.responseText;
	reviewPage = reviewPage.substr(reviewPage.indexOf("edRate"));
	reviewPage = reviewPage.substring(reviewPage.indexOf("href")+7, reviewPage.indexOf("html"));
	reviewLink = "http://reviews.cnet.com/" + reviewPage + "html";
	
		GM_xmlhttpRequest({
		method: "GET",
		url: reviewLink,
		onload: function( data ) {
			try {
				parseEnvInfo(data, cell);
			} catch( e ) {
				GM_log( e );
			}
		}
	});
	
}

function parseCNETRating( data, category ){
	var result = data.substr(data.indexOf("<dt>" + category));
	result = result.substring(result.indexOf("<dd>")+4, result.indexOf("</dd>"));
	return result;
}

function parseEnvInfo(data){



var phoneData = data.responseText;
var design = parseCNETRating( phoneData, "Design");
var features = parseCNETRating( phoneData, "Features");
var performance = parseCNETRating( phoneData, "Performance");
var overall = parseCNETRating( phoneData, "Overall score");
var text = "";
if(design == ">"){
		text = "Review not available.";
}else
{
text =  "<table><tr><td><b>Design:</b></td><td><b>" + design +
		"</b></td></tr><tr><td><b>Features:</b></td><td><b>" + features +
		"</b></td></tr><tr><td><b>Performance:</b></td><td><b>" + performance +
		"</b></td></tr><tr><td><b>Overall:</b></td><td><b>" + overall
		+ "</b></td></tr></table>";
		
	}

tinker(text);
}
var counter = 0;
function tinker(text) {
	counter++;
	var divId = "jfests" + counter;
	
	var div = document.getElementById(divId).wrappedJSObject;
	
	div.innerHTML = text;
	

	
	
}

function getRow() {
	var body = document.getElementsByTagName("table")[0];
	body = body.getElementsByTagName("table")[9];

	if(document.getElementsByTagName("table")[0].innerHTML.indexOf("Too many results")==-1){
	body = body.getElementsByTagName("tr")[7];
	}else{
	body = body.getElementsByTagName("tr")[8];
	}

	body = body.getElementsByTagName("td");
	return body;
}

function getPhoneName(node){
	var name = node.innerHTML.substring(node.innerHTML.indexOf("html") + 6);
	name = name.substring(0, name.indexOf("</a>"));
	return name;
}

function alterNode( node, text ) {
	var div = document.createElement('div');
	
	div.innerHTML = "<b>Loading CNET usability data for " + getPhoneName(node) + ".</b>";
	div.setAttribute("id", text);
	div.setAttribute("align", "center");
	node.setAttribute("bgColor", "lightgreen");

	var begDiv = document.createElement('div');
	begDiv.innerHTML = "<font color=darkgreen size=1><b>Choose the Right Phone for You!</b></font>";
	
	var endDiv = document.createElement('div');
	endDiv.innerHTML = "<font color=darkgreen size=1><b>FEST Powered<br />CNET Usability Ratings</b></font>";
	node.appendChild(begDiv);
	node.appendChild(div);
	node.appendChild(endDiv);
	return div;
}

function injectCell(node, i){
	name = getPhoneName(node);
	return alterNode (node, "jfests" + i);
}

body = getRow();
for (var i = 1; i < body.length; i++) {
	cell = body[i];
	injectCell(cell, i);
	
	
	var searchLink = constructSearchURL(getPhoneName(cell));
		GM_xmlhttpRequest({
		method: "GET",
		headers: {"phone" : getPhoneName(cell)},
		url: searchLink,
		onload: function (data) { 
			
			getProductURL(data, "phone")

			}});
}




/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

		var checkLogo = document.getElementById('social_code_logo');
		if (checkLogo){
			return;
			}
		else
		{
			var logo = document.createElement("div");
			logo.setAttribute('id', 'social_code_logo');
			logo.innerHTML = '<div style="margin: 0 auto 0 auto; '
				+ 'border-bottom: 1px solid #000000; margin-bottom: 5px; '
				+ 'font-size: small; background-color: lightgreen; '
				+ 'color: #000000;"><p style="margin: 2px 0 1px 0;"> '
				+ 'This site is running a script from the Firefox Environmental Sustainability '
				+ 'Toolkit (FEST). Please visit '
				+ '<a href="http://lotus.calit2.uci.edu/fest/index.html">our homepage</a> '
				+ 'for more information on FEST.'
				+ '</p></div>';
				
			document.body.insertBefore(logo, document.body.firstChild);
		}		

