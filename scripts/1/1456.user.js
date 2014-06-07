// ==UserScript==
// @name          Newzbin Tools
// @namespace     http://blah.example/greasemonkeyscripts/
// @description   Collection of enhancements to newzbin.com (v1.0.1)
// @include       http://www.newzbin.com/*
// ==/UserScript==

(function() {
	var prefs = [];
	
	prefs["markRowAfterNZBDL"] = true;

	prefs["rules"] = [
	  ".nzbGet {display:block; float:right; font-size:xx-small;}",
	  ".nzbGetLink {display:inline; cursor: pointer !important; color:#00008B !important; }",
	  ".selectedRow {background-color:#6495ED !important;}",
	  ".selectedRowWaiting {background-color:#494949 !important;}",
	  ".linkCell {color:black; display:block; font-size:6pt}",
	  ".loadingBox {display:block;position:absolute; background-color:grey; border: solid thin lightgrey;color:white;font-size: xx-small;text-align:center}",
	  ".nfoBox {display:block; position:absolute;   border: solid 2px black; background-color: black;}",
	  ".nfoImageBox {display:block;height: 390px; overflow: auto; background-color: white; padding: 1px;}",
	  ".nfoToolbar {font-size: xx-small;padding: 0px 1px 1px 1px;}",
	  ".nfoToolbarItem {font-size: xx-small; color:lightgrey !important; display:inline; padding: 0px 3px 0px 3px; cursor: pointer;};"
	];
	
	prefs["linkProcessors"] = [
		new LinkProcessor(/.*imdb\.com\/title\/tt.*/, /<b>(.*)\/10<\/b> \(.*votes\)/),
		new LinkProcessor(/.*gamespot.com\/.*/, /<a href="review.html" class=".*score1">(.*)<br>/),
		new LinkProcessor(/.*tv.com\/.*/, /^\s*\s{40}(\d{1,}\.\d)$/m),
		new LinkProcessor(/.*ign.com\/.*/, /<div id="scoresBoxIgn".*(\d\.\d)<\/a><\/div>/),
		new LinkProcessor(/.*teamxbox.com\/.*/, /staff_score_(\d\.\d)\.jpg/),
		new LinkProcessor(/.*gamerankings.com\/.*/, /^(\d{2}%)$/m),
		new LinkProcessor(/.*gamezone.com\/.*/,/\s*(\d\.\d)\s*<\/td>/m)
	];
	
	prefs["columns"] = [
		new Column(3, processLinkCell, false),
		new Column(4, processNfoCell, false),
		new Column(6, processPostCell, false),
		new Column(10, processBookmarkCell, false)
	];
	
	
	function processPage() {
		var columns = prefs["columns"];
		for (var i=0; i < columns.length; i++) {
			var column = columns[i];
			if (column.remove == false) {
				processColumnCells(column.index, column.processor);
			}
		}	

		function processColumnCells(columnNumber, cellProcessor) {
			var xpathQuery= "//div[@id='Content']/table[@class='dogresults']/tbody/tr[@class='new' or @class='odd' or @class='even']//td[" + columnNumber + "]/a";
			var cells = evaluateXPath(unsafeWindow.document, xpathQuery);
			for (var i=0; i < cells.length; i++) {
				var cell = cells[i];
				cellProcessor(cell);
			}
		}	
	}

	function processBookmarkCell(cell) { 
		if (cell != undefined) {
			cell.onclick = bookmarkClick;
		} 

		function bookmarkClick(event) {
			var url = this.href;
			var rowNode = this.parentNode.parentNode;
			if (prefs["markRowAfterNZBDL"]) {
				markRow(rowNode, "selectedRowWaiting");
			}
			GM_xmlhttpRequest({ 
				method: 'GET',
				url: url,
				headers: {'User-agent': 'Mozilla/4.0 (compatible) DN GM Script' },
				onload: function(res){
					if (prefs["markRowAfterNZBDL"] && res.status == 200) {
						markRow(rowNode);
					}
				
				},
				onerror: function(res) {alert(res.statusText);} 
			});
			return false;
		}
	}


	function processLinkCell(cell) {
		//var aElement = cell.getElementsByTagName("A")[0];
		var aElement = cell;
		if (aElement != undefined ) {
			var linkProcessors = prefs["linkProcessors"];
			for (var i=0; i < linkProcessors.length; i++) {
				if (linkProcessors[i].urlRegex.test(aElement.href)) {
					aElement.onmouseover = linkProcessors[i].processor;
					break;
				}
			}

		}
	}
	
	function processNfoCell(cell) {
		if (cell != undefined) {
			cell.onclick = nfoClick;
		}
		
		function nfoClick(event) {
			var url = this.href + "png/";
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: {'User-agent': 'Mozilla/4.0 (compatible) DN GM Script'	},
				onload: callback,
				onerror: function(res) {alert(res.statusText);}
			});
			return false;
		}
		
		function callback(response) {
			var regex = /<img src="(http:\/\/nfo.newzbin.com\/png\/\d{3,}.png)/
			var imgUrl = regex.exec(response.responseText)[1];
			
			//Main Box
			var div = unsafeWindow.document.createElement("div");
			div.className = "nfoBox";
			div.style.top = findPosY(cell) + "px";
			div.style.left = (findPosX(cell) - 20) + "px";
			
			//Toolbar
			var toolbarDiv = unsafeWindow.document.createElement("div");
			toolbarDiv.className = "nfoToolbar";
			
			//Close Link
			var closeDiv = unsafeWindow.document.createElement("div");
			closeDiv.className = "nfoToolbarItem";
			closeDiv.onclick = function() {div.parentNode.removeChild(div);};
			closeDiv.appendChild(unsafeWindow.document.createTextNode("[close]"));			
			
			//nfo Link
			var linkA = unsafeWindow.document.createElement("a");
			linkA.className = "nfoToolbarItem";
			linkA.href = cell.href;
			linkA.appendChild(unsafeWindow.document.createTextNode("[nfo page]"));
			
			//Image Box
			var imageDiv = unsafeWindow.document.createElement("div");
			imageDiv.className = "nfoImageBox";
			
			//Image
			var img = unsafeWindow.document.createElement("img");
			img.src = imgUrl;
			
			//put it together...
			toolbarDiv.appendChild(closeDiv);
			toolbarDiv.appendChild(linkA);
			imageDiv.appendChild(img);
			div.appendChild(toolbarDiv);
			div.appendChild(imageDiv);
			unsafeWindow.document.body.appendChild(div);
		}
	
	}


	function processPostCell(cell) {
		cell.setAttribute("style", "display:block; float:left");
		cell.parentNode.appendChild(createLinksNode(cell));		
	}
	
	function createLinksNode(cell) {
		var divElement = unsafeWindow.document.createElement("div");
		divElement.className = "nzbGet";
		//divElement.setAttribute("style", "display:block; float:right; font-size:xx-small"); //TODO replace with style
		
		//'get' link
		var getElement = unsafeWindow.document.createElement("a");
		getElement.appendChild(unsafeWindow.document.createTextNode("get"));
		getElement.className="nzbGetLink";
		getElement.href = cell.href + "msgidlist";
		if (prefs["markRowAfterNZBDL"]) getElement.onclick = function() {markRow(getElement.parentNode.parentNode.parentNode);};
		
		//'w/o pars' link
		var woParsElement = unsafeWindow.document.createElement("a");
		woParsElement.appendChild(unsafeWindow.document.createTextNode("w/o pars"));
		woParsElement.className="nzbGetLink";
		woParsElement.onclick = woParsOnclickEventHandler;
		
		divElement.appendChild(unsafeWindow.document.createTextNode("["));
		divElement.appendChild(getElement);
		divElement.appendChild(unsafeWindow.document.createTextNode(" :: "));
		divElement.appendChild(woParsElement);
		divElement.appendChild(unsafeWindow.document.createTextNode("]"));		

		return divElement;
	}
	
	const postRegexp = /.*post\/(\d{7})\/$/;
	function woParsOnclickEventHandler(event) {
		var sourceObject = this;
		var aElement = sourceObject.parentNode.parentNode.getElementsByTagName("a")[0];
		if (!postRegexp.test(aElement.href)) {
			return;				
		}
		var postID = postRegexp.exec(aElement.href)[1];
		var parentObject = sourceObject.parentNode;
		
		//Add loading div
		var loadingDivElement = unsafeWindow.document.createElement("div");
		var statusTextNode = unsafeWindow.document.createTextNode("loading...");
		loadingDivElement.appendChild(statusTextNode);
		loadingDivElement.id = "loading_" + postID;
		loadingDivElement.className = "loadingBox";
		loadingDivElement.style.top = findPosY(parentObject) + "px";
		loadingDivElement.style.left = findPosX(parentObject) + "px";
		loadingDivElement.style.width = parentObject.offsetWidth + "px";
		loadingDivElement.style.height = parentObject.offsetHeight + "px";			
		unsafeWindow.document.body.appendChild(loadingDivElement);
		
		if (prefs["markRowAfterNZBDL"]) markRow(sourceObject.parentNode.parentNode.parentNode, "selectedRowWaiting");
 	 	
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.newzbin.com/browse/post/?ps_id='+postID,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) DN GM Script'
			},
			onload: getCallbackFunction(postID),
			onerror: function(res) {
				alert(res.statusText);
			}
		});
		
		function getCallbackFunction(postID) {
			return function(res) {
				var doc = res.responseText;
				var noparregexp = /.*\.vol\d{1,}\+\d{1,}\.[pP][aA][rR]2.*/
				var parser = new unsafeWindow.DOMParser();

				var dom = parser.parseFromString(res.responseText, "application/xhtml+xml");
				var rows = evaluateXPath(dom, "//html:form[@id='PostEdit']/html:table[@summary='Attached Files']/html:tr[@class='odd']");
				var fids = new Array();
				for (var i=0; i < rows.length; i++) {
					var cells = rows[i].getElementsByTagName("td");
					if (!noparregexp.test(cells[2].childNodes[0].nodeValue))  {
						var fid = cells[0].getElementsByTagName("input")[0].getAttribute("name");
						fids.push(fid);
					}	
				}				
				
				//!!!!
				var foobar = '<form action="http://www.newzbin.com/database/post/edit/?ps_id='+postID+'" method="post" id="submitme'+postID+'"><input type="hidden" name="msgidlist" value="Get+Message-IDs"/>';
				for (var i = 0; i < fids.length; i++) {
					foobar += '<input type="hidden" name="'+fids[i]+'" value="on"/>';
				}
				foobar += "</form>";
				var range = unsafeWindow.document.createRange();
				range.setStartAfter(unsafeWindow.document.body.lastChild);
				var docFrag = range.createContextualFragment(foobar); // insert new fragment
				unsafeWindow.document.body.appendChild(docFrag);
				var fr = unsafeWindow.document.getElementById('submitme'+postID);
				statusTextNode.nodeValue = "submiting...";
				fr.submit();
				fr.parentNode.removeChild(fr);
				window.setTimeout(function(){unsafeWindow.document.body.removeChild(loadingDivElement);},1500+(fids.length*30));
				if (prefs["markRowAfterNZBDL"]) markRow(sourceObject.parentNode.parentNode.parentNode);
 		 	};
		}
	}	

	function markRow(trElement, className) {
		if (className == undefined) {
			className = "selectedRow";
		}
 		var cells = trElement.getElementsByTagName("td");
 		for (var i=0; i < cells.length; i++) {
 			cells[i].className=className;
 		}	
	}

	
	
	function evaluateXPath(aNode, aExpr) {
		//var xpe = new XPathEvaluator();
		var nsResolver = function (prefix) { return 'http://www.w3.org/1999/xhtml';};
		var result = unsafeWindow.document.evaluate(aExpr, aNode, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
		var found = [];
		while (res = result.iterateNext())
			found.push(res);
		return found;
	}

	function findPosX(obj) {
		var curleft = 0;
		var currentObject = obj;
		if (currentObject.offsetParent) {
			while (currentObject.offsetParent) {
				curleft += currentObject.offsetLeft
				currentObject = currentObject.offsetParent;
			}
		}
		return curleft;
	}

	function findPosY(obj) {
		var curtop = 0;
		var currentObject = obj;
		if (currentObject.offsetParent) {
			while (currentObject.offsetParent) {
				curtop += currentObject.offsetTop
				currentObject = currentObject.offsetParent;
			}
		}
		return curtop;
	}	
	
	
	
	//Thanks Gmail Tweaks
	function initializeStyles() {
		var styleNode = unsafeWindow.document.createElement("style");
		unsafeWindow.document.body.appendChild(styleNode);
		styleSheet = unsafeWindow.document.styleSheets[unsafeWindow.document.styleSheets.length - 1];
		var rules = prefs["rules"];
		for (var i=0; i < rules.length; i++) {
			styleSheet.insertRule(rules[i], 0);
		}
	}
	
	
	function removeColumn(colNums) {
		var cellsToRemove = [];
		for (var i=0; i < colNums.length; i++) {
			var colNum = colNums[i];
			var cells = evaluateXPath(unsafeWindow.document, "//div[@id='Content']/table[@class='dogresults']/tbody/tr[@class='new' or @class='odd' or @class='even' or @class='header']/*["+colNum+"]");
			for (var j=0; j < cells.length; j++) {
				cellsToRemove.push(cells[j]);
			}
		}
		for (var j=0; j < cellsToRemove.length; j++) {
			cellsToRemove[j].parentNode.removeChild(cellsToRemove[j]);
		}
	}
	
	
	
	
	
	/*
	 * Link Processor
	 */
	function LinkProcessor(urlRegex, pageRegex) {
		this.urlRegex = urlRegex;
		this.processor = function(event) {
					var aElement = this;
					aElement.onmouseover = undefined;
					var callbackfunc = function(res) {
						if (res.status == 200) {
							var matches = pageRegex.exec(res.responseText);
							var text;
							if (matches != null) {
								text = matches[1];
							} else {
								text = "??";
							}
							var divElement = unsafeWindow.document.createElement("div");
							divElement.setAttribute("style", "color:black; display:block; font-size:xx-small");
							divElement.appendChild(unsafeWindow.document.createTextNode(text));				
							aElement.parentNode.appendChild(divElement);
						}
					}
					GM_xmlhttpRequest({
						method: 'GET',
						url: aElement.href,
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) DN GM Script'
						},
						onload: callbackfunc,
						onerror: function(res) {
							alert(res.statusText);
						}
					});	
				};
	}	
	
	/*
	 * Column
	 */
	 function Column(index, processor, remove) {
	 	this.index = index;
	 	this.processor = processor;
	 	this.remove = remove;
	 }
	
	initializeStyles();
	window.setTimeout(processPage, 10); 
})();


