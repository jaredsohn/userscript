// ==UserScript==
// @name		Hackaday after the break
// @version		1.00

// @match 		http://hackaday.com/*
// @match 		https://hackaday.com/*

// @description	Expands entries in hackaday blog.

// @namespace   toxicFork
// ==/UserScript==

var moreLinks = document.getElementsByClassName("more-link");
for(var i=0;i<moreLinks.length;i++){
	var curLink = moreLinks[i];
	parseLink(curLink);
}

function FakeElement(element){
	if(element)
		this.setElement(element);
}

FakeElement.prototype = {
	setElement:function(element){
		this.element = document.createElement(element.tagName);
		for(var i=0;i<element.attributes.length;i++){
			var attr = element.attributes[0];
			this.element.setAttribute(attr.name,attr.value);
		}
	},
	addChild:function(fakeElement){
		this.element.appendChild(fakeElement.element);
	},
	addRealChild:function(realElement){
		var el = document.createElement(realElement.tagName);
		for(var i=0;i<realElement.attributes.length;i++){
			var attr = realElement.attributes[0];
			el.setAttribute(attr.name,attr.value);
		}
		el.innerHTML = realElement.innerHTML;
		this.element.appendChild(el);
	}
}

function getElementsAfter(parent,el,isAfter){
	var result = new FakeElement();
	result.setElement(parent);
	var i;
	for(i=0;i<parent.children.length;i++){
		var curEl = parent.children[i];
		if(curEl.contains(el)){
			if(curEl!=el){
				result.addChild(getElementsAfter(curEl,el));
			}
			isAfter = true;
		}
		else if(curEl != el){
			if(isAfter){
				result.addRealChild(curEl);
			}
		}
	}
	return result;
}

var tempContainer = document.createElement("div");
function parseLink(link){
	GM_xmlhttpRequest({
		method:"GET",
		url:link.href,
		onload:function(result){
			var r = result.responseText;
			tempContainer.innerHTML = r;
			var entry = tempContainer.getElementsByClassName("entry")[0];
			if(entry){
				var id = entry.parentNode.id.match(/post\-([0-9]+)/);
				if(id)
					id = id[1];
				for(var i=0;i<entry.getElementsByTagName("span").length;i++){
					var curSpan = entry.getElementsByTagName("span")[i];
					if(curSpan.id == "more-"+id){
						link.outerHTML = "<br/><hr/><br/>"+getElementsAfter(entry,curSpan).element.innerHTML;
						break;
					}
				}
			}
			tempContainer.innerHTML = "";
		}
	});
}