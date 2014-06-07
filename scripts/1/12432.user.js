


// turkce-ingilizce sozluk
// 
// kaynak: 
// version 0.1
// 2007-03-01
// Copyright (c) 2007, Azer Koçulu
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "sozluk", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          sozluk
// @namespace     http://azer.kodfabrik.com
// @description   
// @include       *
// ==/UserScript==

var dict = {

	a: { interval:null, closed:1, source:"http://labs.kodfabrik.com/project/dictionary/text.php" },
	elm: {},
	init: function()
	{
		with(dict)
		{
			lib.p(document);
			elm.a = document.make(1,{ css:{ display:"none", position:"fixed", zIndex:"99999", top:0, right:"100px", background:"#333", padding:"5px", width:"300px", height:"padding:3px", opacity:"0.9", font:"12px Trebuchet MS, Sans", color:"#eee" } },"<a href='http://labs.kodfabrik.com/project/dictionary' style='color:#eee'>Dictionary</a>");
			elm.x = elm.a.make(1,{ on:{ click:doo.close }, css:{ cursor:"pointer", position:"absolute", width:"20px", background:"rgb(160,0,0)", color:"#fff", textAlign:"center", margin:"-19px 0 0 280px", fontWeight:"bold" } },"x");
			elm.y = elm.a.make(1,{ on:{ click:doo.minimize }, css:{ cursor:"pointer", position:"absolute", width:"20px", background:"rgb(50,100,150)", color:"#fff", textAlign:"center", margin:"-19px 0 0 255px", fontWeight:"bold" } },"+");
			elm.z = elm.a.make(1,{ on:{ click:doo.viewAbout }, css:{ cursor:"pointer", position:"absolute", width:"20px", background:"rgb(50,150,100)", color:"#fff", textAlign:"center", margin:"-19px 0 0 230px", fontWeight:"bold" } },"?");
			elm.b = elm.a.make(1,{ css:{ display:"none" } },"Null.");
			document.on("mouseup",doo.listen);
			document.on("keyup",doo.shortCut);
		}
	},
	doo: {
		listen: function(fact)
		{
			with(dict)
			{
				clearTimeout(a.interval);
				if(a.closed)return;
				a.key = window.getSelection().getRangeAt(0);
				if(String(a.key).length<3 || String(a.key).length>30 || /\w+/.test(a.key)==0)return;
				
				a.interval = setTimeout(doo.get.source,2000);
			}
			
		},
		get: {
			source: function()
			{
				with(dict)
				{
					document.make("script",{ att:{ src:a.source+"?key="+a.key+"&lang=en&greasemonkey=1" } });
					elm.b.innerHTML = "<strong>"+a.key+"</strong><br />Loading..";
					elm.b.style.display = "block";
					elm.y.innerHTML ="_";
				}

			}
		},
		display: function(text)
		{
			with(dict)
			{
				if(text=="")
				{
					elm.b.style.display = "none";
					elm.y.innerHTML ="+";
					return elm.b.innerHTML = "";
				}
				elm.b.innerHTML = text;
			}
		},
		close: function(open)
		{
			with(dict)
			{
				elm.a.style.display = open==1?"block":"none";
				a.closed = open!=1;
			}
		},
		minimize: function()
		{
			with(dict)
			{
				elm.b.style.display = elm.b.style.display=="block"?"none":"block";
				elm.y.innerHTML = elm.y.innerHTML=="_"?"+":"_";
			}
		},
		viewAbout: function()
		{
			with(dict)
			{
				elm.b.innerHTML = "<img src='http://farm1.static.flickr.com/162/338649992_f1bbd27664_s_d.jpg' align='left' style='border:3px solid #333; margin:3px;'><strong>Hello World!</strong><br />I'm Azer Koculu, I developed this application for using to translating words pratically when surfing on websites.<br /><br /><a href='http://azer.kodfabrik.com' target='_blank' style='color:#fff'>Go to my website and check out my other works</a>";
				elm.b.style.display = "block";
				elm.y.innerHTML ="_";
			}
		},
		shortCut: function(fact)
		{
			with(dict)
			{
				
				if(fact.ctrlKey!=1 || fact.altKey!=1 || fact.keyCode!=90)return;
				doo.close(a.closed);
			}
		}
	
	},
	lib: {
		n: { ie:/MSIE/i.test(navigator.userAgent), ie6:/MSIE 6/i.test(navigator.userAgent), ie7:/MSIE 7/i.test(navigator.userAgent), op:/Opera/i.test(navigator.userAgent), ff:/firefox/i.test(navigator.userAgent) },
		e: function(att,val,tag)
		{
			return ((att=="id"?document.getElementById(val):(typeof att!="string" && typeof val!="string" && typeof tag=="string"?document.getElementsByTagName(tag):function(){
				
				var data = [];
				var tag = document.getElementsByTagName(typeof tag=="string"?tag:"*");
				for(x in tag)
						if(((parseInt(x))>=0 || dict.lib.n.ie) && typeof tag[x]=='object' && tag[x].getAttribute(att) && (typeof val!="string" || tag[x].getAttribute(att)==val))
							data.push(tag[x]);
				return data;
					
			}())));
		},
		p: function(node)
		{
			node.make = function(tag,body,html)
			{
				var element = document.createElement(typeof tag=="string"?tag.split("::")[0]:"div");
				if(typeof body=="object")
				for(y in body)
					for(x in body[y])
						if(y=="css")
							element.style[(x=="cssFloat" && dict.lib.n.ie?"styleFloat":x)] = body[y][x];
						else if(y=="att" || y=="on")
							element[y=="att"?"setAttribute":(dict.lib.n.ie?"attachEvent":"addEventListener")](y=="att"?(x=="class" && dict.lib.n.ie?"className":x):((dict.lib.n.ie?"on":"")+x),body[y][x],false);
				
				try { element.innerHTML = typeof tag=="string" && tag.split("::").length>1?tag.split("::")[1]:(typeof html=="undefined"?"":html);}catch (e){}
				(node==document?document.body:node).appendChild(element);
				return dict.lib.p(element);
			};
				
			node.css = function(property)
			{
				return (dict.lib.n.ie==0?document.defaultView.getComputedStyle(node, null):node.currentStyle)[property];
			};
				
			node.on = function(ev,fu)
			{
				return node[dict.lib.n.ie?"attachEvent":"addEventListener"]((dict.lib.n.ie?"on":"")+ev,fu,1);
			}

			node.att = function(att,val,remove)
			{
				var ieFix = { "class":"className" };
				
				if(typeof val!="undefined" && typeof remove=="undefined") node.setAttribute(dict.lib.n.ie?ieFix[att]:att,att=="class"?node.att(dict.lib.n.ie?ieFix[att]:att)+' '+val:val);
				else if(typeof val!="undefined" && typeof remove!="undefined") node.setAttribute(dict.lib.n.ie?ieFix[att]:att,node.att(dict.lib.n.ie?ieFix[att]:att).replace(val));

				return node.getAttribute(att);
			}
				
			return node;
		},
		i: function(elm)
		{
			var dim = [0,0];
			while(elm && document.firstChild && elm.nodeName!='BODY')
			{
				dim = [dim[0]+elm.offsetLeft,dim[1]+elm.offsetTop];
				elm = elm.offsetParent;
			}
			return { x:dim[0], y:dim[1] };
		}
	}

}

unsafeWindow.$__dict = dict;
dict.init();