// ==UserScript==
// @name           Frontier Explorer
// @description    combines xml documents for easy viewing/searching
// @include        http://www.facebook.com/frvexplorer*
// @version        0.0.1
// @require        http://sizzlemctwizzle.com/updater.php?id=113062&days=1
// @copyright      Charlie Ewing
// ==/UserScript== 
(function() { 

	var version = "0.0.1";
	var ver; //used for FrV version

	function $(ID,root) {return (root||document).getElementById(ID);}

	String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};

	String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};

	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};

	//returns the value of named param given http://www.site.com/page.ext?params=values#hashes=values
	String.prototype.getUrlParam = function(s) {
		try{
			var params = this.split("?")[1].split("#")[0].split("&");
			//cycle through params and get one that starts with var s
			for(p=0;p<params.length;p++){if(params[p].startsWith(s+"=")) return params[p].split("=")[1];}
		}catch(e){return "";}
	};

	//returns the value of named param given http://www.site.com/page.ext?params=values#hashes=values
	String.prototype.getHashParam = function(s) {
		try{
			var params = this.split("#")[1];
			//cycle through params and get one that starts with var s
			for(p=0;p<params.length;p++){if(params[p].startsWith(s+"=")) return params[p].split("=")[1];}
		}catch(e){return "";}
	};

	String.prototype.xml2html = function(s) {
		//locate shortcut element endings
		var a = this.split("/>");
		for (var i=0, len=a.length-1; i<len; i++){
			//find the previous element tagname
			var x0 = a[i].lastIndexOf("<"),x1;
			if (x0) x1 = a[i].indexOf(" ",x0);
			var tagname = a[i].substring(x0+1,x1);
			a[i] += "></"+tagname+">";
		}
		return a.join("");
	};


	Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};

	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};


	//returns the merge of any number of JSON objects
	//pass JSON objects as comma separated parameters
	//var newJSON = mergeJSON(a,b,c...n)
	//note: overwrites preexisting entries from earlier passed objects
	function mergeJSON () {
		var ret = {};
		for (var a=0,len=arguments.length;a<len;a++) for (var v in arguments[a]) ret[v] = arguments[a][v];
      		return ret;
	};

	//short form for evaluate
	//returns a snapshot object
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	};

	//short form for evaluate with single node return
	//returns the actual node, not the snapshot
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	};

	//clicks an object using the mouse
	//does not run default actions like opening links
	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	};

	// Created by avg, modified by JoeSimmons. shortcut to create an element
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	};

	// Add GM_addStyle if we're not in FireFox
	function GM_addStyle(css) {
        	var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        	if(head) {
        		style.type = 'text/css';
        		try {style.innerHTML = css} catch(x) {style.innerText = css}
        		head.appendChild(style);
		}
    	};

	function addTreeViewCss() {

		GM_addStyle(""+

			".treeViewContainer {line-height:18px;font-size:11px;width:370px;height:500px;overflow:scroll;border:solid #B3B3B3 1px;margin-top:10px;display:inline-block;margin-left:6px;padding-left:6px;}\n"+

			".treeViewDetailsContainer {line-height:18px;font-size:11px;width:580px;height:500px;overflow:scroll; border:solid #B3B3B3 1px;margin-top:10px;margin-left:6px;display:inline-block;}\n"+
			".treeViewDetailsHeaderRow {background:#F0F2F7;border-bottom:1px solid white;}\n"+
			".treeViewDetailsHeader {}\n"+
			".treeViewDetailsRow {background:#EDEFF4;border-bottom:solid #E5EAF1 1px;border-top:solid white 2px;}\n"+

			".treeViewNode {margin-left:19px;}\n"+

			".full {width:981px;height:500px;position:absolute;top:0px;left:0px;background:rgba(82, 82, 82, 0.7);border-radius:8px;margin-top:10px;}\n"+
			".wraptocenter {text-align:center;vertical-align: middle;display:table-cell;line-height:500px;}\n"+
			".wraptocenter * {vertical-align:middle;background:white;}\n"+

			".detailName {width:165px;display:inline-block;margin-left:6px;}\n"+
			".detailValue {width:380px;display:inline-block;margin-left:6px;}\n"+
			".detailImage {width:50px;height:50px;display:inline-block;margin-left:6px;}\n"+


			
			
			""
		);
	}



	//sidekick ability to pass information via hash parameter
	function sendMessage(s){
		unsafeWindow.top.location.hash = s;
	};

	var elementCount=1;

	var dialogRefs = ["feed_prompt_msg","link_name","caption_msg","title_msg","pop_body","pop_title","feed_cancel","feed_accept"];
	var imageRefs = ["img_src","feed_pop_image"];
	var numberRefs = ["max_claimants","expiration_length","reward_qty","range","amount_max","amount_min","roll_max","roll_min"];
	var stringRefs = ["id","name","type","link_href","img_href","title_href","feed_reward_type","reward_type","reward_name"];

	function toggleView(e){
		if (typeof(e)==="object") e=e.id.split("_")[1];
		var parent, nodes;
		if (parent = $("ELEM_"+e)) 
			if (nodes=selectNodes("./div",{node:parent}) )
				for (var i=0, node; (node=nodes.snapshotItem(i)); i++) 
					node.style.display=(node.style.display)?"":"none";
	};

	function showDialog(e){
		var dialog=selectSingleNode(".//bundleline[@key='"+e+"']/value");
		dialog=(dialog)?dialog.textContent:e;

		return createElement("span",{textContent:dialog});

		$("content").appendChild(
			createElement("div",{id:"showDataContainer",className:"full wraptocenter"},new Array(
				createElement("a",{href:"javascript:void(0);",onclick:hideData,textContent:dialog})
			))
		);
	};

	function hideData(){
		var node=$("showDataContainer");
		if (node) node.parentNode.removeChild(node);
	};

	function showImage(e){
		return createElement("img",{src:"http://assets.frontier.zgncdn.com/production/"+ver+"/assets/"+e});


		$("content").appendChild(
			createElement("div",{id:"showDataContainer",className:"full wraptocenter"},new Array(
				createElement("a",{href:"javascript:void(0);",onclick:hideData},new Array(
					createElement("img",{src:"http://assets.frontier.zgncdn.com/production/"+ver+"/assets/"+e})
				))
			))
		);
	};

	function showData(name,value){
		//var name = e.previousSibling.textContent;
		//var value = e.textContent;
		if (dialogRefs.inArray(name)) return showDialog(value);
		else if (imageRefs.inArray(name)) return showImage(value);
		return createElement("span",{textContent:value});
	};

	function showDetails(e){
		if (typeof(e)==="object") e=e.id.split("_")[1];
		//clear the details box
		$("details").innerHTML="";

		//fetch values
		var node=$("DATA_"+e);
		if (node) for (var i=0, attr; (attr=node.attributes[i]); i++) {
			var name = attr.name;
			var value = attr.value;
			var obj;

			//add details to box
			$("details").appendChild(
				createElement("div",{className:"treeViewDetailsRow"},new Array(
					createElement("span",{className:"detailName",textContent:name}),
					obj=showData(name,value)
					//createElement("a",{className:"detailValue",href:"javascript:void(0);",textContent:value,onclick:function(){showData(this);} })
				))
			);

			obj.className=(imageRefs.inArray(name))?"detailImage":"detailValue";
		}

	};

	function buildTree(parent,data){
		for (var i=0,len=data.snapshotLength,item; (item=data.snapshotItem(i)); i++){
			var name=item.getAttribute("name") || item.tagName;
			var newBrancht;

			parent.appendChild(
				newBranch=createElement("div",{id:"ELEM_"+elementCount,className:"treeViewNode",style:"display:none;"},new Array(
					createElement("a",{id:"TOGGLE_"+elementCount,textContent:name,href:"javascript:void(0);",onclick:function(){toggleView(this);showDetails(this);} })
				))
			);

			item.setAttribute("id","DATA_"+elementCount);

			elementCount++;

			//get this branch's children
			var kids=selectNodes("./*",{node:item});
			if (kids) buildTree(newBranch,kids);
		}	
	};

	function feedsToTree(feeds, dialog){
		//add CSS
		addTreeViewCss();


		//clear the document
		var body=$("content");
		if (body) body.innerHTML = "";

		//add the feeds and dialogs info to the page for easy node selection
		body.appendChild(createElement("div",{id:"feedsConfig",style:"display:none;",innerHTML:feeds}));
		body.appendChild(createElement("div",{id:"flashLocale",style:"display:none;",innerHTML:dialog}));

		//build a top node for the treeview
		var topNode;
		body.appendChild(
			topNode=createElement("div",{id:"ELEM_0",className:"treeViewContainer"},new Array(
				createElement("a",{textContent:"FrontierVille",href:"javascript:void(0);",onclick:function(){toggleView(0);} })
			))
		);

		//get feeds
		var feedData = selectNodes(".//div[@id='feedsConfig']/feeds/feed");
		buildTree(topNode,feedData);


	};
	
	//main script function
	function run(){
		//get version
		//ver="R.1.9.001.001.79607";
		//ver="R.1.9.004.002.80653";

		ver="R.1.9.007.003.81168";

		ver = (location.href.getUrlParam("ver")) || (GM_getValue("FrV_version",ver));
		GM_setValue("FrV_version",ver);

		var feeds,dialogs;

	$("content").innerHTML = "Please wait, fetching xml files..."


		//get feedsConfig.xml
		GM_xmlhttpRequest({
			method: "GET",
  			url: 'http://assets.frontierville.zynga.com/production/'+ver+'/xml/feedsConfig.xmlgz',
  			headers: {"User-Agent": "Mozilla/5.0","Accept": "text/xml"},
  			onload: function(response) {
				//inject source code
    				if (!response.responseXML) 
      					response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
    				
				feeds=response.responseText.xml2html();

				GM_xmlhttpRequest({
					method: "GET",
		  			url: 'http://assets.frontierville.zynga.com/production/'+ver+'/xml/flashLocaleXml.xmlgz',
		  			headers: {"User-Agent": "Mozilla/5.0","Accept": "text/xml"},
		  			onload: function(response) {
						//inject source code
    						if (!response.responseXML)
		      					response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");

						dialogs=response.responseText.xml2html();
						
						feedsToTree(feeds,dialogs);

						$("content").appendChild(
							createElement("div",{className:"treeViewDetailsContainer"},new Array(
								createElement("div",{className:"treeViewDetailsHeaderRow"},new Array(
									createElement("span",{className:"treeViewDetailsHeader detailName",textContent:"Name"}),
									createElement("span",{className:"treeViewDetailsHeader detailValue",textContent:"Data"})
								)),
								createElement("div",{id:"details"})
							))
						);

		  			}
				});

  			}
		});
	};
	
	//start the script
	window.setTimeout(run,500);

})(); // anonymous function wrapper end