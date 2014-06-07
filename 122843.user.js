// ==UserScript==
// @name           Spreadsheet Loader 2.5.1
// @description    Loads Server Spreadsheet onto game page
// @version        3.0.0
// @include        http://batheo.clapalong.com/*sid=41
// @include        http://www.clapalong.com/*sid=41
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=122843&days=1
// @copyright      Pappawolfie
// ==/UserScript==


(function() { 

	var version = "3.0.0";
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
			if (node.id==("myFrame_"+id)) {
				//make it visible
				node.style.display="block";

				//check that the src has been loaded
				if (!node.childNodes[0].src) node.childNodes[0].src = myFrames[id].url;

				//make sure we can see the iframe
				node.scrollIntoView();
			}
			else {
				//hide it
				node.style.display="none";
			}
		}
	}

function killBtd(){
document.getElementById("btd").style.display="none";
document.getElementById("webim_frame").style.display="none";

document.getElementById("btd").style.visibility="hidden";
document.getElementById("webim_frame").style.visibility="hidden";

document.getElementById("btd").style.width="0";
document.getElementById("webim_frame").style.width="0";

document.getElementById("btd").style.height="0";
document.getElementById("webim_frame").style.height="0";
}

	//now set this function to run after a timer
	window.setTimeout(killBtd,4000);

	//this array now contains the src's of any frame you want to load
	var myFrames=[
		{url:"https://docs.google.com/spreadsheet/lv?key=0AgE4Ve0w0syTdDBCeW9NTHcxeEFURVlMTEZOWFB3UlE&hl=en_US&rm=full#gid=3",caption:"Spreadsheet"},
		{url:"http://s41poseidon.wordpress.com/",caption:"Faction Plan"},
		{url:"http://batheo.net16.net/Forum/Thread-Index-of-All-Batheo-Guides",caption:"Very Helpful Guides"},{url:"http://userscripts.org/scripts/show/122843",caption:"Updates/ideas Check often!"},
		//add as many more comma delimited urls into this array as you want
	];


	//create a button for every url in our myFrames array
	//** since this is not a function, it is run immediately **
	var buttonsDiv;
    	document.body.appendChild(
		//erase the style of the next line if you want it to NOT float on the bottom
		buttonsDiv=createElement("div",{id:"myButtonsContainer",style:"position:fixed; width:100%; bottom:0px;"},(function(){ 
			//this nested function creates the array of buttons required by the above div
			var ret=[];
			for (var f=0,len=myFrames.length; f<len;f++){
				ret.push(createElement("button",{type:"button",id:"myButton_"+f,style:"", textContent:myFrames[f].caption, onclick:showFrame}));
			}
			return ret;
		})())
	);

	//add a closeall button (actually it requests an iframe that does not exist)
	//** since this is not a function, it is run immediately **
	buttonsDiv.appendChild(createElement("button",{type:"button",id:"myButton_-",style:"",textContent:"Hide",onclick:showFrame}));

	//create a frame for every url in our myFrames array
	//** since this is not a function, it is run immediately **
    	document.body.appendChild(
		createElement("div",{id:"myFramesContainer", style:""},(function(){
			//this nested function creates the array of encapsulated iframes required by the above div
			var ret=[];
			for (var f=0,len=myFrames.length; f<len; f++){
				ret.push(
					createElement("div",{id:"myFrame_"+f, style:"display:none;"},[
						createElement("iframe",{style:"width:90%; height:1200px;"})
					])
				);
			}
			return ret;
		})())
	);

})(); // anonymous function wrapper end