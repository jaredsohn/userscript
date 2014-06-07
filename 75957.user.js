// ==UserScript==
// @name          ContextMenu Framework
// @description   A little framework to help developers building their own context menus
//
// @author        Sherbrow
//
// @history       0.1.1b Minor bugs fix : several menus, 'position: absolute' forced
// @history       0.1b   First release
//
// @version       0.1.1b
// ==/UserScript==

function ContextMenu(init) {
	
	var body;
	var html;
	var classPrefix;
		(init['classPrefix'])?classPrefix=init['classPrefix']:classPrefix="ContextMenu_";
	var classRegExp = new RegExp(classPrefix);
	
	var opt = {
		disable_click: true,
	};
	
	var built = false;
	function build (elt,label) {
		if(!elt) {
			html = build(body);
				html.setAttribute('class',classPrefix+'main');
				html.style.position = 'absolute';
			built = true;
			document.getElementsByTagName('body')[0].appendChild(html);
		}
		else if(elt['type']=="item") {
			var li = document.createElement('li');
				li.setAttribute('class',classPrefix+'item');
			
			var a = document.createElement('a');
				if(elt["attributes"])
					for(var att in elt["attributes"])
						a.setAttribute(att,elt["attributes"][att]);
				if(elt['className']) a.setAttribute('class',elt['className']);
				(elt['link'])?a.setAttribute('href',elt['link']):a.setAttribute('href',"#");
				if(elt["action"] && typeof elt["action"]=="function") a.addEventListener('click',elt["action"],false);
				
				(elt['label'])?a.appendChild(document.createTextNode(elt['label'])):(label)?a.appendChild(document.createTextNode(label)):a.appendChild(document.createTextNode("&nbsp;"));
			li.appendChild(a);
			return li;
		}
		else {
			var li = null;
			switch (elt["type"]) {
				case "group":
					li = document.createElement('li');
						li.setAttribute('class',classPrefix+'groupName');
						(elt['label'])?li.appendChild(document.createTextNode(elt['label'])):(label)?li.appendChild(document.createTextNode(label)):li.appendChild(document.createTextNode("&nbsp;"));
				break;
				case "separator":
					li = document.createElement('hr'); // Ne pas se faire berner, "li" est conservé comme nom de variable mais c'est uniquement un "hr"
						li.setAttribute('class',classPrefix+'separator');
				break;
			}
			var ul = document.createElement('ul');
				ul.setAttribute('class',classPrefix+'group');
			var child;
			for(var ss_elt in elt) {
				if(typeof elt[ss_elt] == "object") {
					child = build(elt[ss_elt],ss_elt);
					if(child.length && child.unshift && child.concat) { // vérification : est-ce que c'est un tableau
						ul.appendChild(child[0]);
						ul.appendChild(child[1]);
					}
					else
						ul.appendChild(child);
				}
			}
			
			return (li)?new Array(li,ul):ul;
		}
	};
	
	this.show = function (e) {
		e.stopPropagation();
		e.preventDefault();
		
		if(!built) build();
		if(opt['disable_click']) document.addEventListener("click",click_blocker,false);
		document.addEventListener("click",click_handler,false);
		
		html.style.display='block';
		html.style.left=e.pageX+"px";
		html.style.top=e.pageY+"px";
	};
	
	this.openGroup = function (label, icon) {
		
	}
	
	if(init){
		(init['opt'])?opt=init['opt']:null;
		(init['body'])?body=init['body']:null;
	}
	
	function click_handler (e) {
		var menus = document.getElementsByClassName(classPrefix+'main');
		for(var i= 0;i<menus.length;i++) {
			menus[i].style.display='none';
		}
		document.removeEventListener("click",click_handler,false);
	}
	function click_blocker (e) {
		document.removeEventListener("click",click_blocker,false);
		e.stopPropagation();
		var block=true,parentNode = e.target;
		while(parentNode = parentNode.parentNode)
			if(classRegExp.test(parentNode.className)) block=false;
		if(block) e.preventDefault();
	}
}