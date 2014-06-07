// ==UserScript==
// @name           Pro-at auto scroll
// @namespace      Pro-at
// @description    Pro-at auto scroller
// @include        http://www.pro-at.com/analyse-bourse/*
// ==/UserScript==

/*if(unsafeWindow.console){
var GM_log = unsafeWindow.console.log;
}
*/

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// wait to load jquery
function GM_wait()
{
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery()
{
	var loadingHref = "";
	
	$(document).ready(function ()
	{
		///executed when clear button is clicked
		$('#buttonClear').click(function ()
		{
			document.location.href = loadingHref;
		});	
	});
	//put clear button bottom right
	GM_addStyle((<><![CDATA[
	#buttonClear {
	position:fixed;
	bottom:0px;
	right:0px;
	
	}
		
	]]></>).toString());

	var nextCommentIndex = 0;

	// make a url with page parameter incremented
	function makeNextUrl(baseUrl, pageNumber)
	{
		currentPage = getCurrentPage(baseUrl);
		///warning there may be a time when id=page number and get replaced...
		var newHref = baseUrl.replace(currentPage, pageNumber);
		return newHref;
	}
	
	function getCurrentPage(baseUrl)
		{	
			var result = -1;
			//php
			if (baseUrl.indexOf("php") > 0) {
				var pageIndex = baseUrl.lastIndexOf("page=");
				result = baseUrl.substring(pageIndex + 5);
				var endPageIndex = result.indexOf("&");
				result = result.substring(0, endPageIndex);
			}
			//html
			else {
				var currentPageArray = baseUrl.split("-");
				result = currentPageArray[currentPageArray.length - 2];
				//alert(result);
			}
			return eval(result);
		}

	function cleanIFrame(iframeDoc)
	{
		// give a name to the interesting div in the results
		//find the Pro at comments div
		var firstDiv = getNode(iframeDoc, "//div[@style='overflow: hidden; width: 850px;']");
		//content found
		if (firstDiv != null) {
			//GM_log("TRUUUUUUUUUUUUUUUUUUUUUUEEEEEEEE");
			firstDiv.setAttribute("id", "gm_analyses_page");
		}
		else {
			//GM_log("FALLLLLLLLLLLLLLLLLLLLLLLLLLSE");
		}
	}


	function getComments(href, pageNumber, doneCallback)
	{
		
		loadingHref = makeNextUrl(href, pageNumber);
		//GM_log("loading next url: " + loadingHref);

		GM_xmlhttpRequest({
			method: 'GET',
			url: loadingHref,
			overrideMimeType:'text/html; charset=ISO-8859-1',
			onload: function(responseDetails)
			{
				var iframeOnload = function()
				{
					var iframeDoc = iframe.contentDocument;
					iframeDoc.getElementsByTagName("body")[0].innerHTML = responseDetails.responseText;
					//$("html").html(responseDetails.responseText);
					


					var doNextPage = injectNewComments(iframeDoc);
					//performed when callback is done
					doneCallback(doNextPage);
				};

				//create an empty iframe
				var iframe = createIframe(iframeOnload);
			}
		});
	}



	function createIframe(onload)
	{
		var iframe = document.createElement("iframe");
		iframe.addEventListener("load", onload, false);
		iframe.src = "about:blank";
		iframe.style.width = '0px';
		iframe.style.height = '0px';
		iframe.className = "moreFrames";
		

		iframe.style.border = '0px';
		document.getElementsByTagName('body')[0].appendChild(iframe);
		//iframe.innerHTML += "<head></head>";
		//GM_log(iframe.innerHTML);
		return iframe;
	}


	function monitorNewUpdate()
	{
		var theHref = document.location.href;
		var currentPage = getCurrentPage(theHref);

		//var checkInterval = 10000; // 10s
		var checkInterval = 60000; // 1min

		var timer;
		//var spinner;

		var check = function()
		{
			showLoading();

			
			//CHECK updated current page first, then check next page
			//do currentPage only for the time being
			//GM_log("...................................................CHECKING........................................................................");
			getComments(theHref, currentPage, loaded);

		}

		//function to execute after callback
		var loaded = function(doNextPage)
		{
			if (doNextPage == true) {
				//GM_log("ITS TIME TO DO NEXT PAGE");
				//turn to next page
				currentPage++;
				//init comment index
				nextCommentIndex = 0;
				$("#gm_analyses_page").append(
				"<div style=\"background-color:#45678F;\" >"+
				"<span style=\"text-align: right\"><h1 style=\"color:White\">Page " + currentPage + "</h1></span>"+
				"</div>");
			}
			//isUpdating = false;
			hideLoading();
		}

		var startTimer = function()
		{
			timer = setInterval(check, checkInterval);
		}

		var showLoading = function()
		{
		   // spinner = document.createTextNode("Loading...");
			//var contentNode = getContent(document);
			//contentNode.appendChild(spinner);
			//$("#gm_analyses_page").append("<div id=\"loadingDiv\" >Loading...</div>");
			if ($("#loadingDiv").length) {
				$("#loadingDiv").css("display", "block");
				//alert("bing");
			}
			else {
				$("body").append("<div style=\"position:fixed;right:0px;top:0px;color: #C0C0C0\" id=\"loadingDiv\" ><img src=\"https://dl-web.getdropbox.com/get/4-1.gif?w=c9de6cbc\" alt=\"loading...\" /></div>");
			}
		}

		var hideLoading = function()
		{
			//spinner.parentNode.removeChild(spinner);
			//$("#loadingDiv").append("no new comment");
			if ($("#loadingDiv").length) {
				$("#loadingDiv").css("display", "none");
			}
			//removes iframes when frames goes more then 2
			
			if($(".moreFrames").length > 2){
				$(".moreFrames:first").remove();
			}
			
			
			
		}

		startTimer();
	}


	function injectNewComments(newContentDoc)
	{
		//newContentDoc is an html document
		GM_log("processing new content");
		//GM_log("newContentDoc.body.innerHTML="+newContentDoc.body.innerHTML);
		//put proper GM id so that getContent works

		//errored out if first div is null

		// Take the interesting part out of the newContentDoc
		// and stick it right after the interesting part in the main document
		var dest = getContent(document);
		//GM_log("looking for destination: " + dest);
		if (dest != null) {
			//GM_log("found destination content and position");
			var comments = new Array();
			comments = getCommentsContent(newContentDoc);


			//GM_log("looking for comments: " + comments);

			if (comments != null) {

//                GM_log("found " + comments.length + " comments!!!");

				//new comments
				if (comments.length > nextCommentIndex) {
					GM_log("new comments to show : comments.length (" + comments.length + ") > nextCommentIndex (" + nextCommentIndex + ")")
					var i = 0;
					for (i = nextCommentIndex; i < comments.length; i++) {
						//show the new comments						
						$("#gm_analyses_page").append(comments[i]);
						//with the break line
						$("#gm_analyses_page").append("<br style=\"clear:both\"/>");
						//GM_log(comments[i].innerHTML)
					}
					//GM_log("comments length="+comments.length);
					nextCommentIndex = comments.length;
					return false;
				}
				else if (comments.length == 15) {
					//GM_log("turning to next page : comments.length =" + comments.length);
					return true;
				}
				else {
					//GM_log("no new comments to show : comments.length (" + comments.length + ") = nextCommentIndex (" + nextCommentIndex + ")");
					return false;
				}

			}
		}
	}

	function getCommentsContent(doc)
	{
		//15 comments per page
		var commentArray = doc.getElementsByClassName("analyses_comment");
		//GM_log(doc.body.innerHTML);
		var returned = new Array();
		for (i = 0; i < commentArray.length; i++) {
			returned[i] = commentArray[i];
			//clean accents
			
		}
		//very important to create a new returned array, so that array does not change when insertafter new comments
		return returned;
	}
	
	// point to the interesting div with the results
	function getContent(doc)
	{
		var xpath = "//div[@id='gm_analyses_page'][last()]";
		return getNode(doc, xpath);
	}

	function getNode(iframeDoc, xpath)
	{
		//GM_log("looking for xpath: " + xpath + " in doc: " + iframeDoc);

		var result = iframeDoc.evaluate(xpath, iframeDoc, null,
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		if (result.snapshotLength > 0) {
			return result.snapshotItem(0);
		}

		GM_log("no content found");
		return null;
	}

	///add clear button
	function addClearButton()
	{
		$(".analyses_post_comment").append("<input id='buttonClear' type='button' value='clear' />");
	}


	// ******************************* Main logic ******************************* //

	GM_log("start Pro-at auto scrolling");
	nextCommentIndex = $(".analyses_comment").length;
	//GM_log("Current comment index=" + nextCommentIndex);
	cleanIFrame(document); // re-organize the result page a little
	addClearButton();
	monitorNewUpdate();


}
