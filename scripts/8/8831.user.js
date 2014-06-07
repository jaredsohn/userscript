// ==UserScript==
// @name           img path prompt
// @namespace      http://twitter.com/joshyu
// @include        *
// ==/UserScript==
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

var promptDIV={

	instance:function(){
		var divTag= document.getElementById("img_promptDIV");
		if(!divTag){
			divTag= document.createElement("div");
			divTag.setAttribute("id","img_promptDIV");
			divTag.setAttribute("style","cursor: pointer; z-index: 99999; position: absolute; padding:5px 5px 0px 5px;height: 16px; opacity: 0.7;background-color: rgb(0, 0, 0); color: rgb(238, 238, 238); font-size: 11px; font-family: verdana;display:none");

			document.body.appendChild(divTag);
		}

		return divTag;
	},	

	putLayer:function(imgTag){
		if(!imgTag || imgTag.tagName!="IMG") 
			return;

		var layer= this.instance();
		var link= imgTag.src.length>38?imgTag.src.substr(0,38)+"...":imgTag.src;

		layer.style.display="block";
		[_left,_top]= findPos(imgTag);

		layer.style.left=_left+"px";
		layer.style.top=_top+ imgTag.offsetHeight+"px";

		layer.textContent=link;
	},

	removeLayer:function(layer){
		var _layer=layer||this.instance();
		_layer.style.display="none";
	}
};


document.body.addEventListener("mouseover",function(e){	
	if(e.ctrlKey && e.target.tagName=="IMG" && e.target.src){
		promptDIV.putLayer(e.target);
	}
	e.target.addEventListener("mouseout",function(e){	
		promptDIV.removeLayer();
		this.removeEventListener("mouseout",arguments.callee,true);
	},true);
},true);