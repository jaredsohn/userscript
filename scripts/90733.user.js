// ==UserScript==
// @name           Meetic
// @namespace      Airwin
// @description    auto scroll meetic
// @include        http://www.meetic.fr/*
// ==/UserScript==


/*if(unsafeWindow.console){
var GM_log = unsafeWindow.console.log;
}
*/

// Add jQuery
var GM_JQ = document.createElement('script');
//jquery latest has bugs, revert to 1.3.2 for the time being
GM_JQ.src = 'http://code.jquery.com/jquery-1.3.2.js';
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
	//set when ready
	var mainDoc;
	//for knowing the next link
	var theHref = "";
	
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

	
	function cleanIFrame(iframeDoc)
	{
		// give a name to the interesting div in the results
		//the div is the one which will receive the other pages
		var firstDiv = getNode(iframeDoc, '//div[@id="mtcDisplayList"]');
		//content found
		if (firstDiv != null) {
			
			firstDiv.setAttribute("id", "mtcDisplayList");
			//mtcDisplayList
		}
		
	}






	function createIframe(onload)
	{
		//create the iframe in the current document, iframe will be filled with response text when loaded (call back to iframeOnLoad)
		
		var iframe = document.createElement("frame");
		iframe.addEventListener("load", onload, false);
		iframe.src = "about:blank";
		iframe.style.width = '0px';
		iframe.style.height = '0px';
		//identified by class to be removed later
		iframe.className = "moreFrames";
		

		iframe.style.border = '0px';
		//will be removed later, not very important
		//mainDoc.getElementsByTagName('body').appendChild(iframe);
		$("body",mainDoc).append(iframe);
		return iframe;
	}


	function monitorNewUpdate()
	{
		var checkInterval = 5000; // 5s
		// var checkInterval = 60000; // 1min

		var timer;
		
		//init href
		if (theHref == ""){
			theHref = $(".mtcPaginationNext",mainDoc).attr('href');
		}
		
		
		var check = function()
		{
			//showLoading();
			//CHECK updated current page first, then check next page
			//do currentPage only for the time being
			//GM_log("...................................................CHECKING........................................................................");
			getComments(theHref,loaded);
		}
		
		
		
		
		

		//function to execute after callback
		var loaded = function(theNextHref){
			
			GM_log("ITS TIME TO DO NEXT PAGE:" + theNextHref);
			theHref = theNextHref;
			//html wrapping for next page
			// $("#mtcDisplayList").append(
			// "<div style=\"background-color:#45678F;\" >"+
			// "<span style=\"text-align: right\"><h1 style=\"color:White\">Page " + currentPage + "</h1></span>"+
			// "</div>");
			
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
			//$("#mtcDisplayList").append("<div id=\"loadingDiv\" >Loading...</div>");
			if ($("#loadingDiv",mainDoc).length) {
				$("#loadingDiv",mainDoc).css("display", "block");
				//alert("bing");
			}
			else {
				$("body",mainDoc).append("<div style=\"position:fixed;right:0px;top:0px;color: #C0C0C0\" id=\"loadingDiv\" ><img src=\"https://dl-web.getdropbox.com/get/4-1.gif?w=c9de6cbc\" alt=\"loading...\" /></div>");
			}
		}

		var hideLoading = function()
		{
			//spinner.parentNode.removeChild(spinner);
			//$("#loadingDiv").append("no new comment");
			if ($("#loadingDiv",mainDoc).length) {
				$("#loadingDiv",mainDoc).css("display", "none");
			}
			//removes iframes when frames goes more then 2
			
			if($(".moreFrames",mainDoc).length > 2){
				$(".moreFrames:first",mainDoc).remove();
			}
			
			
			
		}

		startTimer();
	}
	
	function getComments(href, doneCallback)
	{
		GM_log("loading next url: " + document.location.href + href);

		GM_xmlhttpRequest({
			method: 'GET',
			url: href,
			overrideMimeType:'text/html; charset=ISO-8859-1',
			onload: function(response)
			{
				var iframeOnload = function()
				{
					var iframeDoc = iframe.contentDocument;
					iframeDoc.getElementsByTagName("body")[0].innerHTML = response.responseText;
					
					//GM_log($("body",iframeDoc).length);
					//set html of newly created iframe to response's html
					//$("body",iframeDoc).html(response.responseText);
					//GM_log(responseDetails.responseText);
					//performed when callback is done
					var theNextHref = injectNewBabes(iframeDoc);
					
					doneCallback(theNextHref);
				};

				//create an empty iframe
				var iframe = createIframe(iframeOnload);
			}
		});
	}


	function injectNewBabes(newContentDoc)
	{
		//newContentDoc is an html document
		GM_log("mtcDisplayList found : "+$("#mtcDisplayList",newContentDoc).length);
		//set next href
		$('#mtcDisplayList',mainDoc).parent().append($("#mtcDisplayList",newContentDoc).html());
		//GM_log('nexthref:'+$("#mtcDisplayList",newContentDoc).length);
		return $(".mtcPaginationNext",newContentDoc).attr('href');
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
		var xpath = '//div[@id="mtcDisplayList"][last()]';
		return getNode(doc, xpath);
	}

	function getNode(iframeDoc, xpath)
	{
		GM_log("looking for xpath: " + xpath + " in doc: " + iframeDoc);

		var result = iframeDoc.evaluate(xpath, iframeDoc, null,
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		if (result.snapshotLength > 0) {
			return result.snapshotItem(0);
		}

		GM_log("no content found");
		return null;
	}
	
	// ///add clear button
	// function addClearButton()
	// {
		// $(".analyses_post_comment").append("<input id='buttonClear' type='button' value='clear' />");
	// }


	// ******************************* Main logic ******************************* //

	GM_log("start MEETIC auto scrolling");
	
	
	
		//perform only when frame 1 is ready
	$(window.parent.frames[1].document).ready(function()
	{
		//set meetic main frame as main frame
		//frame 1 id is "meeticMain"
		mainDoc = window.parent.frames[1].document;
		
		//nextCommentIndex = $(".analyses_comment").length;
		//GM_log("Current comment index=" + nextCommentIndex);
		cleanIFrame(mainDoc); // re-organize the result page a little
		// addClearButton();
		monitorNewUpdate();
	});
	
	
}
