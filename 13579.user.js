// ==UserScript==
// @name           Web Licker
// @namespace      com.internettt.weblicker
// @description    Build browsable tree of all images on page, and links to connected pages. Duplicate imgs/links are not repeated.
// ==/UserScript==
// TODO: Load in frames? ignore for now

(function(){
	
	Array.prototype.isArray = true;
	Array.prototype.$unshift = function(e)
	{
		this.unshift(e);
		return this;
	}
	Array.prototype.$push = function(e)
	{
		this.push(e);
		return this;
	}
	
	
	DOM = 
	{
		clear: function(e)
		{
			while (e.firstChild) e.removeChild(e.firstChild);
		},
		
		getElement:function (type,attributes)
		{
			var e = document.createElement(type);
			
			for(x in attributes)
			{
				switch(x)
				{
					case "style": //expand style
						for(y in attributes["style"])
							e.style[y] = attributes["style"][y];
					break;
					
					default:
						e[x] = attributes[x];
				}
			}
	
			this.build.apply( this, Format.toArray(arguments).slice(2).$unshift(e) );
			
			return e;
		},
		
		/*
			like appendChild() except takes multi args,
			and expands strings + [element,attribute,content] arrays
		*/
		build:function(target)
		{
			var content = Format.toArray(arguments).slice(1);
			
			for(var i=0; i<content.length; i++)
			{
				var o = content[i];
				
				if(o == undefined || o == null) // undefined,null
					continue;
					
				if(o.isArray) // Array - recursive
					target.appendChild( this.getElement.apply(this,o) );
				
				else if(typeof o == "object") // DOM object
					target.appendChild(o);
	
				else // string,integer
					target.innerHTML += o; //CAUTION : can break prior elements, use SPAN instead
					//target.appendChild(document.createTextNode(0)); // entities/tags wont be converted
			}
		},
		
		getText: function(str)
		{
			return document.createTextNode(str);
		},
		
		id: function(id)
		{
			return document.getElementById(id);
		}
	}
	
	Format =
	{
		/*
			for converting pseudoArray (eg Function arguments) into real Array
		*/
		toArray: function(pseudoArray)
		{
			var result = [];
		
			for (var i = 0; i < pseudoArray.length; i++)
				result.push(pseudoArray[i]);
		
			return result;
		}
	}
	
	/*
	* AJAX
	* -
	*/


Ajax =
{
	createXMLHttpRequest: function()
	{
		if (typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		} else if (typeof ActiveXObject != "undefined") {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} else {
			throw new Error("XMLHttpRequest not supported");
		}
	},
	
	request: function( url, body, prefs, cbObj, cbFunc )
	{
		var xmlhttp = this.createXMLHttpRequest();
		
		xmlhttp.open('POST', url, prefs.asynch||false);
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Content-Length",body.length);
		xmlhttp.send(body);
		
		var args = Format.toArray(arguments).slice(5);
		
		// synch
		if(!prefs.asynch) return (
			prefs.json? 
				eval( "(" + xmlhttp.responseText + ")" ):
					xmlhttp.responseText
		)
		
		// asynch
		else xmlhttp.onreadystatechange = function()
		{
			if (xmlhttp.readyState == 4)
			{
				if (xmlhttp.status == 200)
				{
					if(cbFunc) // callback func with args = (data,...args)
					{
						cbFunc.apply(
							cbObj,
							[
								prefs.json ?
									eval( "(" + xmlhttp.responseText + ")" ) :
										prefs.ahah ?
											xmlhttp.responseText :
												xmlhttp.responseXML
							].concat( args )
						);
					}
				}
			}
		}
		
	}
	
}
		
	console.log("--- Web Licker starting ---");
	
	if(self != top) return console.log("--- Frame:abort ---");
	
	url = document.location.toString();
	if(url.indexOf("#")>-1) url = url.substring(0,url.indexOf("#"));
	domain = url.substring( 0, url.indexOf("/",url.indexOf("//")+2) ); // url - filepath
	site = url.substring(url.indexOf("//")+2, url.indexOf("/",url.indexOf("//")+2) ); // minus protocol (http://)
	root = url.substring(url.indexOf(domain)+domain.length+1); // root page eg index.html
	
	IMG = 0;
	IMG_LINK = 1;
	TEXT_LINK = 2;
	
	IS_LOADED = 1;
	IS_OPEN = 2;
	
	TITLE_LENGTH = 40;

	var links_str = "";
	var imgs_str = "";

	// .. 1) get all images, links in this page
	console.log("--- Getting Links ---");
	
	var twigs = gatherTwigs(document);
	
	function abbreviate(str)
	{
		if(str.length>TITLE_LENGTH) str = str.substring(0,TITLE_LENGTH)+"...";
		
		return str;
	}
	
	function gatherTwigs(target)
	{
		var twigs = [];
		
		// get all images
		var ar = target.getElementsByTagName('IMG');
		for (var i=0; i<ar.length; i++)
		{
			var img = ar[i];
			
			// ignore link images, dealt with later
			if(img.parentNode && img.parentNode.hasAttribute("href")) continue;
			else if(imgs_str.indexOf(img.getAttribute("src"))>-1) continue;
			
			imgs_str += img.getAttribute("src");
			
			var title = img.getAttribute("title")? img.getAttribute("title") :
				img.getAttribute("alt") ? img.getAttribute("alt") :
					"Untitled";
			
			twigs.push({type:IMG, src:img.getAttribute("src"), title:title})
		}
		
		// get all links
		ar = target.getElementsByTagName('A');
		for (var i=0; i<ar.length; i++)
		{	
			var link = ar[i];
			
			if(!link.hasChildNodes()) continue;
			else if(link.href.indexOf("javascript:")===0) continue;
			else if(link.href.indexOf("mailto:")===0) continue;
			else if(link.href.replace(new RegExp(domain+"(\/)*"),"")=="") continue;
			else if(link.href.indexOf("#")>-1 && link.href.indexOf(url)===0) continue; //anchor on same page
			else if(link.href.indexOf(domain)!==0) continue; // link to external domain: can't visit due to security
			else if(links_str.indexOf(link.href)>-1) continue; // link already present in tree
			
			links_str += link.href; // store all links in string
			
			// .. check all childnodes, incase something like label then img?
			
			var im = link.firstChild;
			
			var link_title = im.nodeValue? abbreviate(im.nodeValue) : link.href.replace(new RegExp(domain+"/"),"");
			
			if(im.nodeValue==Node.ELEMENTNODE && im.hasAttribute('src')) // IMG
			{
				var title = im.getAttribute("title")? abbreviate(im.getAttribute("title")) :
				im.getAttribute("alt") ? abbreviate(im.getAttribute("alt")) :
					"Untitled";
					
				twigs.push({type:IMG_LINK, src:im.getAttribute("src"), href:link.href, title:title, link_title:link_title})
			}
			else // A
			{
				if(!new RegExp("[a-zA-Z0-9]+").test(link_title)) link_title = "untitled"; // give blank links name
				twigs.push({type:TEXT_LINK, href:link.href, link_title:abbreviate(link_title)})
			}
		}
		
		// order links via TYPE
		twigs.sort(function(a,b){
			return a.type - b.type;
		});
		
		return twigs;
	}
	
	
	
	// .. 2) clear DOM & StyleSheets
	console.log("--- Clearing DOM & Rebuilding StyleSheets ---");
	DOM.clear(document.body);
	
	// .. erase all scripts?
	//var ar = document.getElementsByTagName('SCRIPT');
	//for(var i=0; i<ar.length; i++) document.removeChild(ar[i]);
	
	// disable all stylesheets
	function disableCSS()
	{
		for (var i=0; i<document.styleSheets.length; i++)
		{
			document.styleSheets[i].disabled = true;
		}
	}
	
	disableCSS();
	//setTimeout(function(){disableCSS()},5000);
	
	//erase stylesheet
	//for (var i=0; i<css.cssRules.length; i++) css.deleteRule(i);
	
	// recreate StyleSheet
	var styles = [
		"html {padding:0 !important; margin: 0 !important}",
		"body {padding:10px !important; margin: 0 !important}",
		
		"body, a, td, span, div{font:11px Arial, sans-serif !important;}",
		"h2 {font:24px Helvetica, Arial, sans-serif; padding:0; margin:0; font-weight:bold}",
		
		"a {text-decoration:none; color:blue}",
		"a:hover {text-decoration:underline}",
		
		"a img{border:0}",
		"img.thumb {border:1px solid black; vertical-align:top}",
		
		"td {border-collapse:separate !important; border-color:black !important; border-width:1px !important; }",
		
		".treestalk{width:12px; border-color:black !important; border-top:1px solid black; border-left:1px solid black; }",
		".final.treestalk{border-left:0 !important;}",
		".first.treestalk{border-top:0 !important; height:8px}",
		
		".node {width:12px; background:blue; color:white; text-align:center}",
		".inline.node {float:left; margin-right:2px}",
		".content {padding:0 0 8px 0}",
		".details {padding:0 0 0 2px; vertical-align:top}",
		".detailsWrapper{padding-left:2px;}",
		".missing {background:black; color:white; padding: 0 2px}"
	];
	
	function addGlobalStyle(css)
	{
		var head, style;
		
		head = document.getElementsByTagName('head')[0];
		if (!head) { return console.log("no head!"); }
		
		style = document.createElement('style');
		style.type = 'text/css';
		for (var i=0; i<css.length; i++) style.innerHTML += css[i];
			
		head.appendChild(style);
	}
	addGlobalStyle(styles);
	
	
	
	// .. 3) draw table
	console.log("--- Drawing ---");
	
	twig_id=0;
	twigStates = [3]; // first node is open & loaded
	
	document.body.appendChild(DOM.getElement("H2",null,site)); // Title
	
	// main table / first node
	var trunk = document.body.appendChild(
		DOM.getElement(
		"TABLE",{cellSpacing:0,cellPadding:0},
			["TBODY",null,
				["TR",null,
					["TD",{colSpan:2},
						["DIV",{id:"0gfk", className:"inline node"},"-"],
						["DIV",null,
							["A",{id:0, href:"none"},root||domain]
						],
						["DIV",{id:"0node"},""]
					]
				]
			]
		)
	);
	
	var l = DOM.id('0');
	l.addEventListener('click', onLinkClick, true);
	
	// draw first branch
	drawBranch(DOM.id('0node'),twigs);
	
	function drawBranch(target,twigs)
	{
		var branch = target.appendChild(
			DOM.getElement(
			"TABLE",{cellSpacing:0,cellPadding:0},
				["TBODY",null,
					["TR",null,
						["TD",{className:"first treestalk"},"<!-- -->"]
					]
				]
			)
		);
		
		var t = branch.childNodes[0];
		
		for(var i=0; i<twigs.length; i++)
			drawTwig(twigs[i],t,i<twigs.length-1);
		
		return branch;
	}
	
	function drawTwig(data,target,final)
	{
		twig_id++;
		twigStates[twig_id] = 0;
		
		switch(data.type)
		{	
			case IMG:
				target.appendChild(DOM.getElement(
					"TR",{id:"twig"+twig_id},
						["TD",{className:(final? "treestalk":"final treestalk")},"<!-- -->"],
						["TD",null,
							["DIV",{className:"content"},
								["A",{href:data.src,target:"_blank"},
									["IMG",{
										className:"thumb",
										id:"thumb"+twig_id,
										src:data.src,
										style:{display:"none"}
									}]
								],
								["SPAN",{className:"detailsWrapper"},
									["B",null,data.title+"&nbsp;"],
									["SPAN",{id:"thumb"+twig_id+"details"},"unknown"]
								]
							]
						]
					)
				);
				var img = DOM.id("thumb"+twig_id);
				img.addEventListener('load', onImgLoaded, true);
				img.addEventListener('error', onImgError, true);
				break;
			
			case IMG_LINK:
				target.appendChild(DOM.getElement(
					"TR",{id:"twig"+twig_id},
						["TD",{className:(final? "treestalk":"final treestalk")},"<!-- -->"],
						["TD",null,
							["DIV",{className:"content"},
								["A",{href:data.src,target:"_blank"},
									["IMG",{
										className:"thumb",id:"thumb"+twig_id,
										src:data.src,
										style:{display:"none"}
									}]
								],
								["SPAN",{className:"detailsWrapper"},
									["B",null,data.title+"&nbsp;"],
									["SPAN",{id:"thumb"+twig_id+"details"},"unknown"]
								],
								["DIV",null,
									["DIV",{className:"first treestalk"},"<!-- -->"],
									["DIV",{id:twig_id+"gfk", className:"inline node"},"+"],
									["A",{id:twig_id, href:data.href},data.link_title]
								],
								["DIV",{id:twig_id+"node"},""]
							]
						]
					)
				);
				var img = DOM.id("thumb"+twig_id);
				img.addEventListener('load', onImgLoaded, true);
				img.addEventListener('error', onImgError, true);
				var l = DOM.id(twig_id);
				l.addEventListener('click', onLinkClick, true);
				break;
				
			case TEXT_LINK: // TEXT
				target.appendChild(DOM.getElement(
					"TR",{id:"twig"+twig_id},
						["TD",{className:(final? "treestalk":"final treestalk")},"<!-- -->"],
						["TD",{colSpan:2},
							["DIV",{className:"content"},
								["DIV",null,
									["DIV",{id:twig_id+"gfk", className:"inline node"},"+"],
									["A",{id:twig_id, href:data.href}, data.link_title]
								],
								["DIV",{id:twig_id+"node"},""]
							]
						]
					)
				);
				var l = DOM.id(twig_id);
				l.addEventListener('click', onLinkClick, true);
				break;
		}
	}
	
	function killTwig(id) // remove bad img eg spacer, dead img
	{
		id = id.replace(/thumb/,"");
		
		var twig = DOM.id("twig"+id);
		
		if(!twig.nextSibling && twig.previousSibling) // last in branch : make one above last
			twig.previousSibling.firstChild.className = "final treestalk";
		
		twig.parentNode.removeChild(twig);
	}
	
	
	
	// ---- EVENTS ----
	
	function onImgLoaded (event)
	{
		event.preventDefault();
		
		var h = this.height;
		var w = this.width;
		
		if(h<15 || w<15) return killTwig(this.id); // remove small imgs eg spacers, graphics
		
		if(w>h){
			this.style.width = "50px";
			this.style.height = "";
		}else
		{
			this.style.width = ""
			this.style.height = "50px";
		}
		
		DOM.id(this.id+"details").innerHTML= w+"x"+h;
		
		this.style.display = "";
	}
	
	function onImgError(event)
	{
		event.preventDefault();
		
		killTwig(this.id);
	}
	
	function onLinkClick(event)
	{
		event.preventDefault();
		
		var target = DOM.id(this.id+"node");
		var gfk = DOM.id(this.id+"gfk");
		var id = Number(this.id);
		// ..
		
		if(!twigStates[id]&IS_LOADED)
		{
			gfk.innerHTML = "-";
			
			twigStates[id]+=IS_LOADED;
			twigStates[id]+=IS_OPEN;
			
			target.innerHTML= "LOADING...";
			
			Ajax.request( this.href, "", {asynch:true, ahah:true}, this, onDataLoaded,target );
		}
		else if(twigStates[id]&IS_OPEN)
		{
			twigStates[id]-=IS_OPEN;
			target.style.display = "none";
			gfk.innerHTML = "+";
		}
		else
		{
			twigStates[id]+=IS_OPEN;
			target.style.display = "";
			gfk.innerHTML = "-";
		}
		
		this.blur();
	}
	
	
	function onDataLoaded(data,target)
	{
		// instanstiate data
		var node = DOM.getElement("DIV");
		node.innerHTML = data;
		
		// get all links, images
		var twigs = gatherTwigs(node);
		
		// draw new table into target
		DOM.clear(target);
		
		drawBranch(target,twigs);
	}

}()) // end