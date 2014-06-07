// ==UserScript==
// @name          moreYummy
// @namespace     http://voltlick.com/su/yummy/
// @description   Inserts result count of a url's entries found on del.ico.us in a StumbleUpon review page
// @include       http://*.stumbleupon.com/url*
// @exclude     
// ==/UserScript==


window.addEventListener("load", function() { do_script() }, false);

function fixLinks(){
var findPattern="//DIV[@id='yumyum']/descendant::a[@href]";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
var i=0;

while ( (res = resultLinks.snapshotItem(i) ) !=null ){
//output(resultLinks.snapshotItem(i).innerHTML);
resultLinks.snapshotItem(i).href= "http://del.icio.us/" + resultLinks.snapshotItem(i).innerHTML; 
i++;}
}
function findBits(){
var findPattern="//DIV[@id='googoo']/UL[@class='notelist']/LI[*]";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
var i=0;
var interesting ="<br /><h2 class='dividerBottom'><img src='http://del.icio.us/favicon.ico' width='16' height='16'> <img src='http://www.stumbleupon.com/images/infobutton.png'> Del.cio.us entries</h2><div id='yumyum' style='max-height:150px;overflow:auto;'>";
while ( (res = resultLinks.snapshotItem(i) ) !=null ){
interesting = interesting + resultLinks.snapshotItem(i).innerHTML;
i++;}
insertThis(interesting + "</div<a href='" +  delURL() + "'> More...</a><br/><style  TYPE='text/css'>#yumyum .byline{ 	line-height: 0px !important;  	 line-height: 0px !important; position:relative;top:-10px !important; }#yumyum p{  position:relative;top:5px; }</style>");
fixLinks();
}
function do_script(){
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: delURL(),
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(rD) {sectionResponse(rD)}
	, onreadystatechange: function(rD){}
	
	});
		
	}	
function insertThis(insertable){

	//this is to find the right place to put the del.icio.us info
	
	
	pathb=document.evaluate('/HTML[1]/BODY[1]/DIV[4]/DIV[1]/DIV[1]/DIV[1]/H4[1]/A[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	
	usey='/HTML[1]/BODY[1]/DIV[4]/DIV[1]/DIV[1]/DIV[1]/H4[1]/A[4]';
	if (pathb == null){usey='/HTML[1]/BODY[1]/DIV[4]/DIV[1]/DIV[1]/DIV[1]/H4[1]/A[3]';}
	//now we know the correct path to use
	
	//we can do our html injection
	
	html_insert_it(window.document,document.evaluate(usey, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,insertable,false,true);
	
}
function sectionResponse(responseDetails) {
var block=responseDetails.responseText;

      // try to turn the text into a dom object
      var doc = document.createElement('div');
      doc.innerHTML = block;
	
     var links = 
 doc.getElementsByTagName('div');
 var feed, link, hostname;
      for (var l = 0; link = links[l]; ++l) {
        if (link.getAttribute('id')=="main"){
          insertThis("<div id='googoo'  style='display: none;'>" + link.innerHTML + "</div>");
		}
        
      }
findBits();

    }
function delURL(){
baseurl=document.evaluate('/HTML[1]/BODY[1]/DIV[4]/DIV[1]/DIV[1]/H1[1]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
baseurl=encodeURI(baseurl);
theurl="http://del.icio.us/url/check?url=" + baseurl;
return (theurl);
}
//here we have some nice platypus functions
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};
function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null){parent.insertBefore(newNode, refChild);}
    else {parent.appendChild(newNode);}
};
 