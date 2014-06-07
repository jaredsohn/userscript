// ==UserScript==
// @name           Spreadsheet Loader
// @description    Loads Server Spreadsheet onto game page
// @version        1.9
// @include        http://batheo.clapalong.com/*
// @include        http://www.clapalong.com/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=122843&days=1
// @copyright      Pappawolfie
// ==/UserScript==


(function() { 

	var version = "1.9";
        var scriptID="122843";

	
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	}

	function showFrame(){
		var id = this.id.split("_")[1];
		//hide all our custom frames except the id we passed
		var nodes=document.getElementById('myFramesContainer').getElementsByTagName('DIV');
		for (var n=0,node;(node=nodes[n]);n++){
			if (node.id==("myFrame_"+id)) node.style.display="block";
			else node.style.display="none";
		}
	}

	//this array now contains the src's of any frame you want to load
	var myFrames=[
		{url:"https://docs.google.com/spreadsheet/lv?hl=en_US&key=0AgE4Ve0w0syTdDBCeW9NTHcxeEFURVlMTEZOWFB3UlE&rm=full#gid=3",caption:"spreadsheet"},
		{url:"http://userscripts.org",caption:"userscripts.org"},
		{url:"http://example.com",caption:"example.com"},
		//add as many more comma delimited urls into this array as you want
	];

	//create a button for every url in our myFrames array
	var buttonsDiv;
    	document.body.appendChild(
		buttonsDiv=createElement("div",{id:"myButtonsContainer",style:""},(function(){
			//this nested function creates the array of buttons required by the above div
			var ret=[];
			for (var f=0,len=myFrames.length; f<len;f++){
				ret.push(createElement("button",{type:"button",id:"myButton_"+f,style:"", textContent:myFrames[f].caption, onclick:showFrame}));
			}
			return ret;
		})())
	);

	//add a closeall button (actually it requests an iframe that does not exist)
	buttonsDiv.appendChild(createElement("button",{type:"button",id:"myButton_-",style:"",textContent:"CloseAll",onclick:showFrame}));

	//create a frame for every url in our myFrames array
    	document.body.appendChild(
		createElement("div",{id:"myFramesContainer", style:""},(function(){
			//this nested function creates the array of encapsulated iframes required by the above div
			var ret=[];
			for (var f=0,len=myFrames.length,myFrame; f<len; f++){
				ret.push(
					createElement("div",{id:"myFrame_"+f, style:"display:none;"},[
						myFrame=createElement("iframe",{style:"width:100%; height:3200px;"})
					])
				);
				myFrame.src=myFrames[f].url
			}
			return ret;
		})())
	);

})(); // anonymous function wrapper end