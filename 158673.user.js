// ==UserScript==
// @name		SafariBook One page
// @description		Load the whole book in one page
// @include		http://proquest.safaribooksonline.com.proxy.lib.sfu.ca/*
// ==/UserScript==

//get attachment list
var xPH = function(pat) {   // xPathHelper
    return document.evaluate(pat,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
};


var attachList = "//div[@class='t_attachlist']"
var allTrack = xPH(attachList);

var tocitemList = "//div[@class='tocitem']"
//.//a[@data-xmlid]
var xmlid = "//a[@data-xmlid]"
var xmlid_items = xPH(xmlid)

var thisTrack, tagA, aIDLink, aIDText, hrefLink, onClickValue

var next_page_button = "//*[@id='next']"
//<a id="next" class="next" title="Next (Key: n)" href="/book/-/9781133590453/getting-started-with-your-sony-alpha-nex-5n/ch01lev1sec1" accesskey="3">Next (Key: n)</a>
var content = "//*div[@class='htmlcontent']"
var baseURL = "http://proquest.safaribooksonline.com.proxy.lib.sfu.ca/_ajax_htmlview?__version=6.0.3&xmlid="

//tocitem -> tocitem closed -> tocitem

//Go through each toc item (each page)
for (var i  = 0; i < xmlid_items.snapshotLength; i++)
{
	//retrieve the toc item
	//this_toc_item = tocitem.snapshotItem(i);
	//
	////find the a element which stores the xmlid
	//tagA = this_toc_item.getElementsByTagName('a');
	
	//get the xmlid from tag A
	page_data_xml_id = xmlid_items.snapshotItem(i).getAttribute('data-xmlid');
	
	//construct the link to the page
	pageLink = baseUrli + page_data_xml_id

	console.log(pageLink)
	
	//hrefLink = tagA[2].getAttribute('href');
	//tagA[2].setAttribute('href','attachment.php?'+aIDText);
	//
	//onClickValue = tagA[2].getAttribute('onClick');
	//if(onClickValue)
	//{
	//	tagA[2].removeAttribute('onClick');
	//}
}
