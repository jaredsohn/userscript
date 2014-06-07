// ==UserScript==
// @name           All Pluck Comments
// @namespace      http://namespaces.ziesemer.com/Greasemonkey
// @description    http://blogger.ziesemer.com
// @include        http://www.postcrescent.com/*article*
// @include        http://www.wausaudailyherald.com/*article*
// @include        http://www.stevenspointjournal.com/*article*
// @author         Mark A. Ziesemer, www.ziesemer.com
// @version        2009-10-23
// @homepage       http://blogger.ziesemer.com
// ==/UserScript==

// This doesn't currently support the per-comment controls:
//   Recommend, New post, Reply to this Post, Report Abuse, etc.

(function(){
	
	var reactionListDiv, fullPageDiv;
	
	var fetchAllComments = function(pluckCommentsObj){
		
		var batchSize = unsafeWindow.gsl.requestsPerBatch // Older Pluck
				|| unsafeWindow.gsl.requestsperBatch // Newer Pluck
				|| 10, // Enforced server-side, currently 10.
			responses = new Array(Math.ceil(pluckCommentsObj.NumberOfComments / batchSize)),
			responsesReceived = 0,
			// Just a safety for possible thread safety issues from the GM_xmlhttpRequest callbacks.
			responseJoinTimerId,
			responseError;
		
		reactionListDiv = unsafeWindow.document.getElementById("gslReactionList");
		
		var sortParam = /[?&]s=(a|d)(?:&|$)/.exec(unsafeWindow.location.search);
		// Default to Ascending (oldest first)
		sortParam = sortParam ? sortParam[1] : "a";
		var sort = "TimeStamp" + ((sortParam == "a") ? "Ascending" : "Descending");
		
		var fetchBatch = function(pageNum){
			var articleKey = "{\"ArticleKey\":{\"Key\":\"" + unsafeWindow.gsl.getArticleKey() + "\"}}";
			var cURL = "{\"UniqueId\":0,\"Requests\":[{\"CommentPage\":{\"ArticleKey\":"
				+ articleKey
				+ ",\"NumberPerPage\":"
				+ batchSize
				+ ",\"OnPage\":" + pageNum + ",\"Sort\":\""  + sort + "\"}},"
				+ articleKey
				+ "]}";
			cURL = unsafeWindow.gsl.sitelifeApiUrl
				+ "&jsonRequest="
				+ escape(cURL);

			GM_xmlhttpRequest({
				method: "GET",
				url: cURL,
				onload: function(response){
					if(response.status == 200){
						try{
							handleResponse(pageNum, response.responseText);
						}catch(e){
							GM_log("Error handling response: " + e);
							responseError = true;
						}
					}else{
						GM_log("Unexpected response from Pluck service: " + response.status);
						responseError = true;
					}
				}
			});
		};
		
		var handleResponse = function(pageNum, respStr){
			respStr = unescape(respStr);
			// Remove any <script>...</script> tags in response, e.g. currently
			//   <script language="javascript">document.domain="postcrescent.com";</script>
			// Account for possible variations, e.g. described at
			//   http://www.blackhat-seo.com/2007/regex-tips-and-tricks/
			respStr = respStr.replace(/<\s*script[^>]*>.*?<\s*\/\s*script\s*>\s*/g, "");
			
			var json = evalJSON(respStr);
			
			// Drill-down and eliminate access to all the other junk we don't need.
			json = json.ResponseBatch.Responses[0].CommentPage.Comments;
			
			// unsafeWindow.console.dir(json); // For debugging.
			
			responses[pageNum - 1] = json;
			responsesReceived++;
			updateStatus();
			checkAllReceived();
		};
		
		var checkAllReceived = function(){
			clearTimeout(responseJoinTimerId);
			if(responsesReceived == responses.length){
				updatePageComments(responses);
			}else if(!responseError){
				responseJoinTimerId = setTimeout(checkAllReceived, 500);
			}
		};
		
		var updateStatus = function(){
			var statusPText = function(){
				var statusP = unsafeWindow.document.createElement("p");
				reactionListDiv.insertBefore(statusP, reactionListDiv.firstChild);
				var statusPText = unsafeWindow.document.createTextNode("");
				statusP.appendChild(statusPText);
				return statusPText;
			}();
			
			return function(){
				statusPText.data = "Updating: Received " + responsesReceived + "/" + responses.length + " pages...";
			};
		}();
		
		if(Number(pluckCommentsObj.NumberOfComments) <= Number(pluckCommentsObj.NumberPerPage)){
			// Assume existing display is good enough.
			return;
		}
		
		var sortOrderSelect = unsafeWindow.document.getElementById("gslSortOrder");
		sortOrderSelect.removeAttribute("onchange");
		unsafeWindow.document.evaluate("//option[@value='" + sortParam + "']",
			sortOrderSelect, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.selected = true;
		sortOrderSelect.addEventListener("change", reverseComments, true);
		
		updateStatus();
		
		for(var i=1; i<=responses.length; i++){
			fetchBatch(i);
		}
	};
	
	var updatePageComments = function(responses){
		var removeNode;
		
		// Remove all existing comments.
		while(removeNode = reactionListDiv.firstChild){
			reactionListDiv.removeChild(removeNode);
		}
		
		// Remove the pagination controls, except for "Full Page View".
		//    This provides access back to the "normal" functionality, with full per-comment controls.
		var paginationDiv = unsafeWindow.document.getElementById("gslPagination");
		while(removeNode = paginationDiv.firstChild){
			paginationDiv.removeChild(removeNode);
		}
		paginationDiv.appendChild(fullPageDiv);
		
		// Among no small list of possible improvements for Pluck, the "Author" objects should be normalized out.
		// Especially considering that many articles have the same few authors replying to each other,
		//   there is a lot of duplication in memory here.
		
		var commentIdx = 0, i, j;
		for(i=0; i<responses.length; i++){
			for(j=0; j<responses[i].length; j++){
				reactionListDiv.appendChild(buildComment(responses[i][j], commentIdx++));
			}
		}
	};
	
	var buildComment = function(commentObj, idx){
		var commentDiv = unsafeWindow.document.createElement("div");
		commentDiv.setAttribute("id", "comment_" + commentObj.CommentKey.Key);
		
		// Recent change in Pluck moved from "gslCom_even" CSS style names to "gslCom even".  Actually makes sense!
		var commentDivClassEO = ((idx % 2) ? "even" : "odd");
		commentDiv.setAttribute("class", "gslCom_" + commentDivClassEO + " gslCom " + commentDivClassEO);
		
		(function(){
			var comStaffDiv = unsafeWindow.document.createElement("div");
			commentDiv.appendChild(comStaffDiv);
			comStaffDiv.setAttribute("class", "gslComStaff");
			// Also noted that .AdministrativeTier = "Administrator".
			//   Not sure if that should be looked at as well...
			if(commentObj.Author.UserTier == "Editor"){
				comStaffDiv.appendChild(unsafeWindow.document.createTextNode(
					unsafeWindow.gsl.SiteStaffText));
			}
		})();
		
		(function(){
			var sectionDiv = unsafeWindow.document.createElement("div");
			commentDiv.appendChild(sectionDiv);
			
			(function(){
				var photoDiv = unsafeWindow.document.createElement("div");
				sectionDiv.appendChild(photoDiv);
				photoDiv.setAttribute("class", "gslComUserPhoto");
			
				var photoLink = unsafeWindow.document.createElement("a");
				photoDiv.appendChild(photoLink);
				// The original page version only has a "U" argument.
				// The PersonaUrl property seems to have an extra "plckUserId" argument, but it still seems to work.
				photoLink.setAttribute("href", commentObj.Author.PersonaUrl);
				
				var photoImg = unsafeWindow.document.createElement("img");
				photoLink.appendChild(photoImg);
				photoImg.setAttribute("alt", "User Image");
				// Below could also be .ImageUrl - not sure if there's any difference.
				photoImg.setAttribute("src", commentObj.Author.AvatarPhotoUrl);
			})();
			
			(function(){
				var comHeaderDiv = unsafeWindow.document.createElement("div");
				sectionDiv.appendChild(comHeaderDiv);
				comHeaderDiv.setAttribute("class", "gslComHeader");
				
				var comWroteBySpan = unsafeWindow.document.createElement("span");
				comHeaderDiv.appendChild(comWroteBySpan);
				comWroteBySpan.setAttribute("class", "gslComWroteBy");
				
				var comWroteByLink = unsafeWindow.document.createElement("a");
				comWroteBySpan.appendChild(comWroteByLink);
				comWroteByLink.setAttribute("href", "");
				
				var comWroteByB = unsafeWindow.document.createElement("b");
				comWroteByLink.appendChild(comWroteByB);
				comWroteByB.appendChild(unsafeWindow.document.createTextNode(
					commentObj.Author.DisplayName));
				
				comWroteBySpan.appendChild(unsafeWindow.document.createTextNode(" wrote:"));
				
				comHeaderDiv.appendChild(unsafeWindow.document.createElement("br"));
			})();
			
			(function(){
				var bodyDiv = unsafeWindow.document.createElement("div");
				sectionDiv.appendChild(bodyDiv);
				bodyDiv.setAttribute("class", "gslComBody");
				bodyDiv.innerHTML = commentObj.CommentBody;
				bodyDiv.appendChild(unsafeWindow.document.createElement("br"));
				
				var dateSpan = unsafeWindow.document.createElement("span");
				bodyDiv.appendChild(dateSpan);
				dateSpan.setAttribute("class", "gslComDate");
				dateSpan.appendChild(unsafeWindow.document.createTextNode(commentObj.PostedAtTime));
			})();
		})();
		
		// The separator doesn't appear to do anything.  It doesn't even add a clear line break.
		//   It seems that Pluck just depends upon each comment block having a minimum height greater than the user image.
		(function(){
			var separatorDiv = unsafeWindow.document.createElement("div");
			commentDiv.appendChild(separatorDiv);
			separatorDiv.setAttribute("class", "gslComSeperator");
		})();
		
		return commentDiv;
	};
	
	var reverseComments = function(){
		var tempNode,
			prevFirstChild = reactionListDiv.firstChild;
		while(prevFirstChild != reactionListDiv.lastChild){
			tempNode = reactionListDiv.removeChild(reactionListDiv.lastChild);
			reactionListDiv.insertBefore(tempNode, prevFirstChild);
		}
	};
	
	// http://www.ietf.org/rfc/rfc4627.txt
	var evalJSON = function(text){
		return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
				text.replace(/"(\\.|[^"\\])*"/g, ''))) &&
			eval('(' + text + ')');
	};
	
	(function(){
		// Wait for initial scripts to complete, and objects to become available.
		var attempts = 0, checkComments = function(){
			try{
				return unsafeWindow.gsl.responses[0].CommentPage;
			}catch(e){
				return false;
			}
		}, timeoutFn = function(){
			var result = checkComments();
			if(result){
				GM_log("Found Pluck objects after " + attempts + " attempts.");
				
				fullPageDiv = unsafeWindow.document.evaluate(
					"//div[@id='gslPagination']//div[@class='gslfullpage']" // Older Pluck
						+ "|//div[@id='gslfullpage']", // Newer Pluck
					unsafeWindow.document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				
				if(!fullPageDiv){
					// Assuming this is the "Full Page View" page (or is otherwise unsupported).
					// Leave this page intact, as it provides the full per-comment controls.
					GM_log("Aborting due to full-page check.");
					return;
				}
				
				fetchAllComments(result);
			}else{
				// Give up after 10 seconds.
				if(attempts++ < 20){
					setTimeout(timeoutFn, 500);
				}else{
					GM_log("Timed out waiting for Pluck objects, giving up.");
				}
			}
		};
		timeoutFn();
	})();
	
})();
