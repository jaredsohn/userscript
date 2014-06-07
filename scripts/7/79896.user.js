// ==UserScript==
// @name           YouTube Me Again! For WastingYourLife.com
// @version        1.0.0
// @author         chapel
// @credit         hateradio
// @namespace      http://hateradio.uni.cc/
// @description    YouTube Me Again! The overhauled sequel of "YouTube Me!" with different execution and various new options for videos, this script is new and improved. It converts any URL's that link to YouTube into real embedded videos automatically; specifically made for WastingYourLife.com, but can work anywhere. Download this version as the old ones are deprecated.
// @include        http://*wastingyourlife.com/forums/*
// ==/UserScript==


/* C S S */

var css = "object { clear: both } .ytmainit { display: inline-block; background: #DF2929; margin:4px; color: #fff; padding: 2px; cursor: pointer; font-size: 11px;   -o-border-radius: 2px; -icab-border-radius: 2px; -khtml-border-radius: 2px; -moz-border-radius: 2px; -webkit-border-radius: 2px; -moz-border-radius: 2px; font-weight: bold; text-shadow: #333 0px 0px 2px; padding: 2px 4px } .ytmainit:hover { background: #333; } .ytmwrap { clear: both; overflow: hidden; margin: 3px 0px; } .ytmsidebar { margin: 0px; padding: 0px; list-style-type: none; clear: both; overflow: auto; } .ytmsidebar li { display: inline; cursor: pointer; float: left; background: #666; color: #fff; margin: 3px 1px 0px 0px; padding: 1px 5px 0px; font-size: 12px; font-weight: bold; font-family: Arial, Helvetica, sans-serif !important; text-shadow: #333 0px 0px 2px; -moz-border-radius-topleft: 2px; -moz-border-radius-topright: 2px; -webkit-border-top-left-radius: 2px; -webkit-border-top-right-radius: 2px } .ytmsidebar li:hover { background: #DF2929 !important; color: #fff !important } li[id^=\"sel\"] { background: #333 !important; color: #eee !important } .inject { float: left; background: #666; padding: 3px; }";

var place = document.getElementById("content");

var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	heads[0].appendChild(node); 
}

/* C L A S S */

function ytma() {
	this.idu = true; //modified unique id given to anchor tag
	this.atg = true;
	this.idr = true; //real id
	this.spn = false; //span link
	this.wrp = document.createElement("div");
	this.ul  = document.createElement("ul");
	this.inj = document.createElement("div");
	this.obj = document.createElement("object");
}

ytma.prototype.li=function(txt,f,n,t) {
	with (this) {
		var l = document.createElement("li");
			l.appendChild(document.createTextNode(txt));
		if( f == "changesize" ) {
			if (n == 1) l.id = "sel-"+idu;
			l.addEventListener("click", function() { changesize(n) }, false);
			l.addEventListener("click", function() { colors(this,0) } , false);
		} else if ( f == "changedim" ) {
			if (n == 1) l.id = "seldim-"+idu;
			l.addEventListener("click", function() { changedim(n) }, false);
			l.addEventListener("click", function() { colors(this,1) } , false);
		} else {
			l.addEventListener("click", function() { repo(n) }, false);
		}
		if (t !== undefined) l.setAttribute("title",t);
				
			return l;
	}
}

ytma.prototype.colors=function(x,n) {

	with(this) {
		if(n == true) {
			if(document.getElementById('seldim-'+idu)) {
				document.getElementById('seldim-'+idu).removeAttribute("id");
			}
			x.id = "seldim-"+idu;
		} else {
			if(document.getElementById('sel-'+idu)) {
				document.getElementById('sel-'+idu).removeAttribute("id");
			}
			x.id = "sel-"+idu;
		}
	}
	
}

ytma.prototype.prm=function(n,v) {
	var prm = document.createElement("param");
	prm.name = n;
	prm.value = v;
	return prm;
}

ytma.prototype.rmchild=function(el) {
	if (el.hasChildNodes()) {
		while (el.childNodes.length >= 1) {
			el.removeChild( el.firstChild );       
		} 
	}
}

ytma.prototype.output=function() {

	with (this) {
	
		/* O B J E C T  T A G */		
		obj.id     = "o"+idu;
		obj.width  = 425;
		obj.height = 344;
		obj.data   = "http://www.youtube.com/v/"+idr;
		rmchild(obj);
		obj.appendChild(prm("movie","http://www.youtube.com/v/"+idr+"&hl=en&fs=1&hq=1"));
		obj.appendChild(prm("allowFullScreen","true"));
		obj.appendChild(prm("allowscriptaccess","always"));
		
		/* O P T I O N S */
		ul.id      = "u"+idu;
		ul.setAttribute("class","ytmsidebar");
		rmchild(ul);
		ul.appendChild(li("Hide","changesize",3,"To Show Video, Click on Small/Medium/Large"));
		ul.appendChild(li("Small","changesize",0,"Smaller Size"));
		ul.appendChild(li("Medium","changesize",1,"Medium Size"));
		ul.appendChild(li("Large","changesize",2,"Large Size"));
		ul.appendChild(li("16:9","changedim",0,"Change Aspect Ratio"));
		ul.appendChild(li("4:3","changedim",1,"Change Aspect Ratio"));
		ul.appendChild(li("Close \327","repo"));
		
		/* D I V I S I O N S */
		wrp.id     = "w"+idu;
		wrp.setAttribute("class","ytmwrap");
		
		inj.id     = "i"+idu;
		
		/* M A G I C */

		wrp.appendChild(ul);
		inj.appendChild(obj);
		wrp.appendChild(inj);
		
		spn.parentNode.insertBefore(wrp,spn.nextSibling);
		
	}
}

ytma.prototype.changedim=function(n) {
	
	with (this) {
		if(n == 0) {
			obj.height = Math.round((obj.getAttribute("width")*9)/16)+25; // +25 pixels for the youtube bar
		} else {
			obj.height = Math.round((obj.getAttribute("width")*3)/4)+25;
		}
	}
}

ytma.prototype.changesize=function(n) {
	
	with (this) {
		if(n == 0) {
			obj.width = 320;
			obj.height = 265;
		} else if (n == 1) {
			obj.width = 425;
			obj.height = 344;
		} else if (n == 2) {
			obj.width = 800;
			obj.height = 625;
		} else if (n == 3) {
			obj.width = 0;
			obj.height = 0;
		}
	}
}

ytma.prototype.repo=function() {
	with (this) {
		showhide(1);
		var del = document.getElementById("w"+idu);
		del.parentNode.removeChild(del);
	}
}

ytma.prototype.showhide=function(n) {

	with (this) {

		if(n == true) {
			spn.removeAttribute("style");
		} else {
			spn.setAttribute("style","visibility:hidden;");
		}
	}
	
}

ytma.prototype.init=function(x) {
	with (this) {
		output();
		showhide();
	}
}

ytma.prototype.sea=function() {

	var a = this.GEBA(document,'a','href','youtube.com/watch');
	var re = new RegExp(/v=([A-Za-z0-9-_]{11})/);

	for (var i = 0; i < a.length; i++) {
	
		var href = a[i].getAttribute("href");
		
		if( a[i].parentNode.getAttribute("class") != "smallfont" && re.test(href) ) {
		
			var id;
			if( !RegExp.lastParen ) {
				id = href.match(re)[0].toString();
				id = id.replace(/^v=/, '');
			} else {
				id = RegExp.lastParen;
			}
			
			a[i].setAttribute('id',id+i);
			
			var x = new ytma();
			
			with (x) {
				idu = id+i;
				idr = id; //real id
				spn = document.createElement('span');
				spn.setAttribute("class","ytmainit");
				spn.appendChild(document.createTextNode("YouTube Me!"));
				spn.id = "s"+idu;
				spn.title = "View This Video Now";
				spn.addEventListener("click", function() { init(this); }, false);
				a[i].parentNode.insertBefore(spn, a[i].nextSibling);
			}
		}

	}
}

// element attributes
// original : http://snipplr.com/view/1853/get-elements-by-attribute/
	
ytma.prototype.GEBA=function(oElm, strTagName, strAttributeName, strAttributeValue) {
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp(strAttributeValue) : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
			}
		}
	}
	return arrReturnElements;
}


var start = new ytma();
start.sea();