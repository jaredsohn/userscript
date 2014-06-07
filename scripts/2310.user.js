// ==UserScript==
// @name          Digg de-n00ber
// @namespace     http://werktheweb.com/gm
// @description	  Gets rid of stupid articles on digg
// @include       http://*digg.com/*
// ==/UserScript==

(function() {
	var diggdenoob = new Object();
	
	diggdenoob.destruct = function () {
		var denoob = document.getElementById("denoobhead");
		denoob.parentNode.removeChild(denoob);
	}
	
	diggdenoob.init = function () {
	
	var GM_value = 'digg_de-n00b_keywords';
	
	var appendKeywordList = function (keyword, parent, before) {
								var spanc = document.createElement('span');
								spanc.className = 'tool';
								spanc.setAttribute("keyword", keyword);
								
								
								
								
								spanc.remove = function () {
										var keywords = getKeywords();
										
										var newKeywords = keywords.replace("|" + this.firstChild.textContent, "");
										
										GM_setValue(GM_value, newKeywords);
										
										
										
										this.parentNode.removeChild(this);
									}
								
								spanc.addEventListener('click', spanc.remove, true);
								
								a = document.createElement('a');
								a.appendChild(document.createTextNode(keyword));
								a.style.textDecoration = "underline";
								a.style.cursor = 'pointer';
								
								spanc.appendChild(a);
								
								if (before) {
									parent.insertBefore(spanc, before);
								} else {
									parent.appendChild(spanc);
								}
								
								
							}
		
	var getKeywords = function() {
		return GM_getValue(GM_value, '');
	}
	
	
	
	
	var addKeyword = function (keyword) {
		var keywords = getKeywords();
		
		keyword = keyword.replace(/\|/g, '\\|');
		
		if (!keywords.match(keyword)) {
			var sep = "|";
			var newKeywords = keywords + sep + keyword;
			
			GM_setValue(GM_value, newKeywords);
			
			return true;
		} else {
			return false;
		}
	}
	
	var addRemoveKeys = function(e) {
	
						if (this.closeNext) {
							this.obj.parentNode.removeChild(this.obj);
							this.closeNext = false;
							this.clearObj.parentNode.removeChild(this.clearObj);
							this.textContent = "Add/Remove Keywords";
							this.parentNode.style.border = "none";
							
							diggdenoob.destruct();
							diggdenoob.init();
							
						} else {
							
							var div = document.createElement("div");
							var inputc = document.createElement("span")
							inputc.className = 'tool';
							inputc.style.border = "none";
							inputc.style.paddingRight = "0";
							var input = document.createElement("input");
							input.style.marginRight = "5px";
							inputc.appendChild(input);
							//var add = document.createElement("span");
							var label = document.createElement("span");
							label.className = 'tool';
							label.style.fontWeight = "bold";
							label.appendChild(document.createTextNode("Keywords (click to remove)"));
							div.appendChild(label);
							
							var keywords = getKeywords().substr(1);
							
							var keyarray = keywords.split("|");
							
							for (var i = 0; key = keyarray[i]; i++) {
								appendKeywordList(key, div);
							}
							
							input.style.border = "solid 1px #ccc";
							//input.style.marginLeft = "5px";
							
							div.style.clear = "both";
							div.style.fontSize = fontSize;
							div.className = 'news-details';
							
							var a = document.createElement('a');
							a.appendChild(document.createTextNode("Add"));
							
							
							a.style.textDecoration = "underline";
							a.style.cursor = "pointer";
							inputc.appendChild(a);
							//add.appendChild(a);
							//add.className = "tool";
							
							//add.style.border = "none";
							//add.style.cursor = "pointer";
							//add.type = "button";
							//add.style.fontSize = fontSize;
							a.addEventListener('click', function() {
								var keyword = input.value;
								
								if (addKeyword(keyword)) {
									appendKeywordList(keyword, div, inputc);
									input.value = "";
								}
								
								
								
								
							}, true);
							
							input.style.fontSize = fontSize
							
							div.appendChild(inputc);
							//div.appendChild(add);
							
							parent.insertBefore(div, container.nextSibling);
							
							div.style.display = "block";
							
							
							
							this.textContent = "Close";
							this.parentNode.style.border = "";
							
							var clear = document.createElement("span");
							clear.className = "tool";
							clear.style.border = "none";
							var cleara = document.createElement("a");
							cleara.appendChild(document.createTextNode("Clear"));
							cleara.style.textDecoration = "underline";
							cleara.style.cursor = "pointer";
							cleara.addEventListener('click', function () {
											var node = div.childNodes[0];
											while (node) {
												nextNode = node.nextSibling;
												if (node.firstChild.nodeName == "A") {
													node.parentNode.removeChild(node);
												}
												
												node = nextNode;
												
											}
											GM_setValue(GM_value, "");
										}, true);
							clear.appendChild(cleara);
							this.parentNode.parentNode.appendChild(clear);
							this.closeNext = true;
							this.obj = div;
							this.clearObj = clear;
						}
					}
					
	var parent = document.getElementById("contents");

	//var regkeywords = keywords.join('|');
	var regkeywords = getKeywords().substr(1);

	var hiddenStories = new Array();
	
	var fontSize = ".9em";
	
	var xpath = "//div[@id = 'contents']/div[@class != 'pages']";
	
	var xpathResult = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	//var story = xpathResult.iterateNext();
	
	for (var n = 0; n < xpathResult.snapshotLength; n++) {
		story = xpathResult.snapshotItem(n);
		
		var cxpath = "div/h3/a/text()";
		
		var title = document.evaluate(cxpath, story, null, XPathResult.STRING_TYPE, null).stringValue;
		
		var re = new RegExp(regkeywords, "i");
		
		var found = re.test(title);
		
		if (found && regkeywords != "") {
			hiddenStories.push(story);
			
			story.style.display = "none";
			story.style.border = "dashed 1px red";
			story.style.MozBorderRadius = "10px";
		} else if (story.style.display == "none") {
			story.style.border = "none";
			story.style.display = "block";
		}
		
		//story = xpathResult.iterateNext();
		
	}
	
	
		var container = document.createElement("div");
		container.id = "denoobhead";
		container.className = 'news-details';
		container.style.paddingTop = "0px";
		
		var span = document.createElement("span");
		span.className = 'tool';
		container.appendChild(span);
		
		
		if (hiddenStories.length == 0) {
			span.appendChild(document.createTextNode("No stupid stories! w00t "));
		} else {
		
			var b = document.createElement("b");
			b.appendChild(document.createTextNode(hiddenStories.length));
			span.appendChild(b);
			
			if (hiddenStories.length == 1) var story_sp = "story";
			else var story_sp = "stories";
		
			span.appendChild(document.createTextNode(" stupid " + story_sp + " hidden "));
		
		
			var toggle = document.createElement('span');
			toggle.className = 'tool';
			
			var a = document.createElement("a");
			a.appendChild(document.createTextNode("Show Stories"));
			a.style.cursor = "pointer";
			a.style.textDecoration = "underline";
			a.addEventListener('click', function () {
						if (this.textContent == "Show Stories") {
							var newText = "Hide Stories";
							var display = "block";
						} else {
							var newText = "Show Stories";
							var display = "none";
						}
						
						for (var i = 0; story = hiddenStories[i]; i++) {
							story.style.display = display;
						}
						
						this.textContent = newText;
					}, true);
			
			toggle.appendChild(a);
			container.appendChild(toggle);
		}
		
		var addremove = document.createElement('span');
		addremove.className = 'tool';
		addremove.style.border = "none";
		
		
		var link = document.createElement('a');
		link.appendChild(document.createTextNode("Add/Remove Keywords"));
		link.style.cursor = "pointer";
		link.style.textDecoration = "underline";
		link.addEventListener('click', addRemoveKeys, true);
		
				
						
						
		
		addremove.appendChild(link);
		
		container.appendChild(addremove);
		
		
		
		
		
		parent.insertBefore(container, parent.firstChild);
	
		
	};
	
	if (!document.getElementById("comments")) diggdenoob.init();
	
}) ();