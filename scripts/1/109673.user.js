// ==UserScript==
// @name           FBWM Appearance Extension
// @description    Modifies the appearance and functionality of the FBWM Wikia site
// @include        http*://fbwm.wikia.com/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.5
// @copyright      Charlie Ewing
// @require        http://sizzlemctwizzle.com/updater.php?id=109673&days=1
// ==/UserScript== 

(function() { 

	var version = "0.0.5";
	var isProtected;
	var sections={};

	// Get element by id shortform with parent node option
	function $(ID,root) {return (root||document).getElementById(ID);}

	String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};

	String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};

	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};

	Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};

	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	Array.prototype.inArrayWhere = function(value) {for(var i=0,l=this.length; i<l; i++) {if(this[i]==value) return i;}return false;};

	Array.prototype.last = function() {return this[this.length - 1];};

	Array.prototype.removeByValue = function(val) {var i=this.inArrayWhere(val);if(i)this.splice(i,1);return this;};

	Array.prototype.replace = function(val, val2) {var i=this.inArrayWhere(val);if(i)this[i]=val2;return this;};

	String.prototype.repeat = function(n) {return new Array(n+1).join(this);}

	String.prototype.css = function(){
		var self=this;
                return { 
		add: function(word){
			var words = self.split(" ");
			if (!words.inArray()) return self + " " + word;
			else return self;
		},
		
		remove: function(word){
			return self.split(" ").removeByValue(word).join(" ");
		},

		contains: function(word){
			return self.split(" ").inArray(word);
		},

		replace: function(word,word2){
			return self.split(" ").replace(word,word2).join(" ");
		},

		toggle: function(word){
			var words = self.split(" ");
			if (words.inArray(word)) return words.removeByValue(word).join(" ");
			else return self + " " + word;
		}}

	};

	//addGlobalStyle from diveintogreasemonkey.org
	function addGlobalStyle(css) {
    		var head, style;
    		head = document.getElementsByTagName('head')[0];
    		if (!head) { return; }
    		style = document.createElement('style');
    		style.type = 'text/css';
    		style.innerHTML = css;
    		head.appendChild(style);
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

	//run a function for each selected node
	function forNodes(xPath,params,fx){
		var nodes = selectNodes(xPath,params);
		for (var i=0,node;(node=nodes.snapshotItem(i));i++) {
			fx(node);
		}
		nodes=null;
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

	function getDocName() {
		return document.location.pathname;
		
	};

	function addWikiaCSS(){

		var colors = {
			EAborder_green:"#84B73A",
			EAborder_blue:"#81ADDC",
			EAinner_blue:"#C2DEFF",
			EAinner_white:"#FFFDF8",
			EAinner_gold:"#E8A406",
			EAborder_gold:"#C69200",
			EAborder_yellow:"#FFAD00",
			EAinner_yellow:"#FFF202",
			EAborder_dkgray:"#39312C",
			EAinner_dkgray:"#62544B",
			EAborder_gray:"#776655",
			EAinner_gray:"#9A8979",
			EAborder_red:"#AB0000",
			EAinner_red:"#D70000",
			EAborder_purple:"#9C2BD4",
			EAinner_purple:"#DC96F8",
			EAborder_brown:"#663300",
			EAinner_brown:"#D4872E",
			EAborder_silver:"#969696",
			EAinner_silver:"#BFBFBF",
			EAinner_tan:"#FAC158",
			EAborder_tan:"#D46111",
			EAborder_dkblue:"#3780AE",
			EAinner_dkblue:"#5094C1",

			FrVborder_green:"#256E46",
			FrVinner_green:"#46B754",
			FrVhl_green:"#A6E11D",
			FrVborder_silver:"#666666",
			FrVinner_silver:"#999999",
			FrVhl_silver:"#C3C3C3",
			FrVborder_blue:"#057499",
			FrVinner_blue:"#51C2FB",
			FrVhl_blue:"#53C4FB",
			FrVinner_red:"#C3463A",
			FrVhl_red:"#EA1515",
			FrVinner_purple:"#AE81EB",
			FrVhl_purple:"#A35BF9",
			FrVinner_yellow:"#FFCC0",
			FrVhl_yellow:"#FFCC33",
			FrVborder_tan:"#645433",
			FrVinner_tan:"#D5B778",
			FrVhl_tan:"#E8D6AA",

			FrVinner_black:"#22335A",
			FrVborder_black:"#080200",

			RwFborder_green:"#046804",
			RwFinner_green:"#4B7C00",
			RwFhl_green:"#7DC400",
			RwFborder_blue:"#024D7B",
			RwFinner_blue:"#294A7F",
			RwFhl_blue:"#5898C6",
			RwFborder_silver:"#616566",
			RwFinner_silver:"#ABB5BD",
			RwFhl_silver:"#CeD4D6",
			RwFborder_red:"#7C0F06",
			RwFinner_red:"#A2180C",
			RwFhl_red:"#C11E0F",
			RwFborder_gold:"#4E391A",
			RwFinner_gold:"#D6AB28",
			RwFhl_gold:"#ECD133",
			RwFinner_aqua:"#3FDD67",
			RwFhl_aqua:"#63F277",

			TIborder_blue:"#13B9F1",
			TIinner_blue:"#A5E1F9",
			TIborder_purple:"#600E57",
			TIinner_purple:"#C763A9",
			TIborder_red:"#FF0101",
			TIinner_red:"#F15A5A",
			TIborder_aqua:"#0E857B",
			TIinner_aqua:"#00ACA0",
			TIborder_green:"#737B35",
			TIinner_green:"#8DC63F",
			TIborder_gold:"#7F6E0E",
			TIinner_gold:"#F9DF21",
			TIborder_tan:"#BE9834",
			TIinner_tan:"#E6D473",
			TIborder_brown:"#3F300C",
			TIinner_brown:"#C5A84C",


			FBborder_blue:"#3B5998",
			FBinner_blue:"#627AAD",
			FBhl_blue:"#F2F2F2",
		};

		var css = "body {color: #D5D4D4 !important; margin:0 !important; background:-moz-linear-gradient(center top , #434343 0%, #141414 100%) repeat scroll 0 0 transparent !important;}\n"+
			//".section_header {border:1px solid #000000; border-radius: 5px 5px 5px 5px; color:#D5D4D4 !important;background:#3A3939 !important; display:block; font-size: 15px !important; font-weight: 700 !important; line-height:23px !important;text-decoration:none !important;}\n"+
			//".separator_label {border:1px solid #007195; border-radius: 5px 5px 5px 5px; font-size: 15px !important; line-height:19px !important; font-weight: 700 !important; color:#FEFEFE !important; text-decoration:none !important; margin:0 !important; padding:1px 0 1px 6px !important; display:block !important; background:#53C4FB !important;}\n"+
			".section_header_holder {max-width: 668px; border-radius: 5px 5px 5px 5px;padding:0 6px 0 6px !important; margin-bottom:6px !important; }\n"+
			".section_kids {background:#424141 !important;border-radius: 0 0 5px 5px;border: 1px solid #000000 !important;border-top:0 !important;padding: 0 6px 6px !important;margin: 0 6px 0 6px !important;}\n"+

			"div.config_var span.config_var {display:inline-block !important; margin-left:10px !important;}\n"+
			"div.config_var {margin:0 !important; padding: 2px 0 2px 0 !important;}\n"+
			".optionblock_label {display:block; font-size:11px !important;}\n"+
			".block_select_all {margin-top:4px; background: #ccffff url('http://i55.tinypic.com/6ih93q.png') no-repeat center;width:17px;height:17px;border-radius: 2px 2px 2px 2px;}\n"+
			".block_select_none {margin-top:4px; background: #ccffff url('http://i55.tinypic.com/2lk2xyw.png') no-repeat center;width:17px;height:17px;border-radius: 2px 2px 2px 2px;}\n"+
			".field_label {font-size:11px !important;}\n"+
			".newopt {background:#027B09 !important;}\n"+
			".link_label, a.external {line-height:19px; position:relative;z-index:1;padding:2px 6px 2px 6px; border-radius: 0px 25px 0px 25px / 0px 100px 0px 100px; text-decoration:none;border: 1px solid black; color:black !important; background:#EFF2F7 !important;}\n"+
			".link_label:hover, a.external:hover, .link_label:active, a.external:active {z-index:1; background:#D8DFEA !important;}\n"+
			"span.field_label:not([class*=\"separator\"]) {margin-right:8px !important;} label.field_label {margin:0 !important;}\n"+
			"span > label.field_label {margin-right:0 !important;}\n"+

			"input[type=\"text\"] {text-align: center !important;color: #CCCCCC !important; background: -moz-linear-gradient(center top , #080200 0%, #22335A 100%) repeat scroll 0 0 transparent !important; border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+

			".tab_element {display:inline !important;}\n"+
			".tab_header {background:-moz-linear-gradient(center top , #141414 0%, #424141 100%) repeat scroll 0 0 transparent !important;color:#D5D4D4 !important; padding:2px 6px;border:1px solid #000000; border-radius: 5px 5px 0 0; margin:0 !important; font-size: 13px !important; line-height:19px !important; font-weight: 700 !important; text-decoration:none !important;position:relative;z-index:0;}\n"+
			".tab_body {padding: 0 6px 0 6px !important;margin: 0 !important; background:#424141 !important;border-radius: 0 5px 5px 5px;border: 1px solid #000000 !important;display:none;position:relative;z-index:1;top:-1px;}\n"+
			".tab_selected {background:-moz-linear-gradient(center top , #424141 0%, #424141 100%) repeat scroll 0 0 transparent !important;border-bottom:0 !important;color:white !important; z-index:2;}\n"+

			".inline {display:inline-block;}\n"+
			".block {display:block;}\n"+
			".underline {border-bottom:1px solid #70BAFF;}\n"+
			".hidden {display:none;}\n"+
			".highlight {background:#94BC41 !important; color:#000000;}\n"+
			".rotate {-moz-transform: rotate(-90deg);}\n"+

			".text_border_sep {font-family:tahoma; text-shadow: -1px -1px 1px #007195, 1px 1px 1px #007195, 1px -1px 1px #007195, -1px 1px 1px #007195;text-transform:uppercase; font-weight:900 !important;}\n"+
			".text_border_sec {font-family:tahoma; text-shadow: -1px -1px 1px #000000, 1px 1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000;text-transform:uppercase; font-weight:900 !important;}\n"+

			"p,blockquote,ul {margin-top:0 !important;}\n"+
			".WikiaArticle a.external:after {background-image: none !important;display: none !important;padding:0 !important;}\n"+

			".section_header {font-family:tahoma; text-transform:uppercase; font-weight:900 !important; border:2px solid;border-radius: 5px; color:#FEFEFE !important;display:block;line-height:19px !important;text-decoration:none !important;text-align:left;padding:1px 6px !important;font-size: 15px !important; }\n"+
			".section_header:hover, .section_header:active {font-size:larger !important;}\n"+

			".sh2 {text-shadow: -1px -1px 1px #39312C, 1px 1px 1px #39312C, 1px -1px 1px #39312C, -1px 1px 1px #39312C;border-color:#39312C; background:#62544B !important; text-decoration:none !important;text-align:center;}\n"+
			".sh2:hover, .sh2:active {background:#776655 !important;}\n"+

			".sh3 {text-shadow: -1px -1px 1px #057499, 1px 1px 1px #057499, 1px -1px 1px #057499, -1px 1px 1px #057499;border-color:#057499; background:#51C2FB !important; }\n"+
			".sh3:hover, .sh3:active {background:#C2DEFF !important;}\n"+

			".sh4 {text-shadow: -1px -1px 1px #256E46, 1px 1px 1px #256E46, 1px -1px 1px #256E46, -1px 1px 1px #256E46;border-color:#256E46; background:#46B754 !important; font-size: 13px !important; text-transform:none !important;}\n"+
			".sh4:hover, .sh4:active {background:#A6E11D !important;}\n"+

			".sh5 {text-shadow: -1px -1px 1px #666666, 1px 1px 1px #666666, 1px -1px 1px #666666, -1px 1px 1px #666666;border-color:#666666; background:#999999 !important; font-size: 13px !important; text-transform:none !important;}\n"+
			".sh5:hover, .sh5:active {background:#C3C3C3 !important;}\n"+

			".WikiaMainPageBanner {display:none !important;}\n"+
			".WikiaArticle {position:static !important;z-index:auto;display:table;}\n"+

			".editsection {float:right !important; margin-right:10px !important; line-height:19px; padding-top:3px;}\n"+

			"#toc,#WikiaSpotlightsModule {display:none !important;}\n"+

			".black a{color:#000000 !important;}\n"+

			"a.altLink {background: gray !important;left:-5px !important;padding: 0 4px 0 5px !important;position: relative !important;z-index: 0 !important;}\n"+

			".fake {display:table;}\n"+

			"#Latest_activity ul li {border-bottom: 1px solid black;margin-bottom: 6px;padding-bottom: 6px;}\n"+
			"#wikia_recent_activity ul li {border-bottom: 1px solid black;margin-bottom: 6px;padding-bottom: 6px;}\n"+

			"";

		addGlobalStyle(css);
	};

	function toggle(e) {
		var node=e.nextSibling;
		node.className = node.className.css().toggle('hidden');
		var hidden = node.className.css().contains('hidden');
		sections[getDocName()+"#"+node.id]=hidden;
		var val = JSON.stringify(sections);
		GM_setValue("sections",val);

		//if (e.textContent=="Latest activity") e.className=(hidden)?e.className.css().add('rotate'):e.className.css().remove('rotate');

		if (!hidden) node.parentNode.scrollIntoView(true);
 	};

	function headersToContainers(){
		//create blocks from headers h2 to h5
		for (var x=2;x<6;x++){

		var h=selectNodes(".//h"+x+"/span[contains(@class,'mw-headline')]");
		if (h) for (var i=0,e;(e=h.snapshotItem(i));i++){
			e=e.parentNode;
			var isComment = selectSingleNode(".//ancestor::section[@id='WikiaArticleComments']",{node:e});
			if (!isComment){
			
			//move the header into a separate div
			var top = e.parentNode, sec, header,fake;
			var label = selectSingleNode(".//span[contains(@class,'mw-headline')]",{node:e});
			var edit = selectSingleNode(".//span[contains(@class,'editsection')]",{node:e});
			edit.className = edit.className +(x>2?" black":"");
			var id=label.id;
			var hidden=sections[getDocName()+"#"+id];
			top.insertBefore(
				createElement("div", {className:"section_header_holder"}, new Array(
					(header=createElement("a", {className:"section_header sh"+x,href:'javascript:void(0);',onclick:function(){toggle(this);},textContent:label.textContent}) ),
					(sec=createElement("div", {id:id,className:'section_kids'+((hidden)?" hidden":"")}) )
				))
			, e);
			
			//move the siblings into the new collapsible section
			//select the entire block down to the next h2 element
			var s=e.nextSibling;
			while (s && (s.tagName!="H"+x) && s.tagName!="NAV"){
				//console.log(s.tagName);
  				sec.appendChild(s);
				s=e.nextSibling;
  			}

			//move the edit button to the header bar
			header.parentNode.insertBefore(edit,header);

			//delete the header
			top.removeChild(e);

			//cleanup
			s=null;top=null;label=null;edit=null;si=null;sec=null;

			}

			isComment=null;
		}

		//cleanup
		h=null;i=null;e=null;

		}	
	};

	function moveActivityFeed(){
		var activity = $('activityFeed'), article = $('WikiaArticle');
		if (activity && article) article.parentNode.insertBefore(activity,article);

		if (activity){
			var nodes = selectNodes(".//td[@class='activityfeed-details-label']",{node:activity});
			if (nodes) for (var i=0,node;(node=nodes.snapshotItem(i));i++) {
				var html=node.innerHTML + node.nextSibling.innerHTML;
				node.parentNode.innerHTML=html;
				node=null;
			}
			nodes=null;

			var node = selectSingleNode(".//div[@id='Latest_activity']/div",{node:activity});
			if (node) node.appendChild(createElement("a",{className:'more', title:'Special:WikiActivity', href:'/wiki/Special:WikiActivity', textContent:'See more >'}));
			node=null;
		}
		activity=null; article=null;
	};

	function moveShortActivityFeed(){
		var activity = selectSingleNode(".//section[@class='WikiaActivityModule module ']");
		if (activity){
			activity.className="";
			var h1 = selectSingleNode("./h1[@class='activity-heading']",{node:activity}), header, sec;
			var ul = selectSingleNode("./ul",{node:activity});
			var more = selectSingleNode("./a",{node:activity});
			if (h1){
				activity.insertBefore(
					(div=createElement("div", {className:"section_header_holder"}, new Array(
						(header=createElement("a", {className:"section_header sh2",href:'javascript:void(0);',onclick:function(){toggle(this);},textContent:h1.textContent}) ),
						(sec=createElement("div", {id:'wikia_recent_activity',className:'section_kids'}) )				
					)) )
				, h1);

				if (ul) sec.appendChild(ul);
				if (more) sec.appendChild(more);

				activity.removeChild(h1);
			}
			h1=null;sec=null;div=null;
		}
		activity=null;
	};

	function dropWikiaNetwork(){
		var nodes = selectNodes(".//footer/section | .//section[@id='WikiaSpotlightsModule'] | .//*[@id='WikiaArticleBottomAd' or @id='toc'] | .//div[@class='FooterAd' or @class='WikiaMainPageBanner']");
		if (nodes) for (var i=0,node;(node=nodes.snapshotItem(i));i++) node.parentNode.removeChild(node);
		nodes=null;
	};

	function addAnchorAltTargets(){
		forNodes(".//a[contains(@class,'external')]",{},function(e){
			var node = e;
			var node2 = node.cloneNode(true);
			node.parentNode.insertBefore(node2,node);			
			node.target="_blank";
			node.textContent="+";
			node.className += " altLink";
			node.title = "Open in new window";
			node=null;
		});
	};

	function fixRevisionTables(){
		var tables=selectNodes(".//table[contains(@class,'wikitable collapsible')]");
		if (tables) for (var t=0,table;(table=tables.snapshotItem(t));t++) {
			var parent=table.parentNode,header,sec;
			var id=selectSingleNode(".//tr//th",{node:table}).textContent.replace('[hide]','').replace('[show]','');
			var hidden=sections[getDocName()+"#"+id];
			//create a container
			parent.insertBefore(
				createElement("div", {className:"section_header_holder"}, new Array(
					(header=createElement("a", {className:"section_header sh2",href:'javascript:void(0);',onclick:function(){toggle(this);},textContent:id}) ),
					(sec=createElement("div", {id:id,className:'section_kids'+((hidden)?" hidden":"")}) )
				))
			,table);

			//create subsections
			var rows = selectNodes(".//tr",{node:table});
			if (rows) for (var s=0,row;(row=rows.snapshotItem(s));s++){
				if (!row.innerHTML.contains('<th')){
					var cols = selectNodes(".//td",{node:row});
					
					//first column of each row is always title
					var label = cols.snapshotItem(0).textContent;
					id=id+"_"+label;
					var content = cols.snapshotItem(1).innerHTML;
					hidden=sections[getDocName()+"#"+id];
					
					//create the container
					sec.appendChild(
						createElement("div", {className:"section_header_holder"}, new Array(
							createElement("a", {className:"section_header sh3",href:'javascript:void(0);',onclick:function(){toggle(this);},textContent:label}) ,
							createElement("div", {id:id,className:'section_kids'+((hidden)?" hidden":""),innerHTML:content}) 
						))
					);					
					cols=null;label=null;content=null;
				}
				row=null;
			}
			
			//remove the old appearance
			parent.removeChild(table);

			table=null;rows=null;parent=null;hidden=null;id=null;header=null;sec=null;
		}

		tables=null;
	};

	function showRedPhone(){
		var phoneImg="http://i56.tinypic.com/33k3iwk.png";
		var articleBody=$('WikiaArticle');
		if (articleBody) articleBody.appendChild(
			createElement("a",{href:"http://www.facebook.com/messages/100001252200912",target:"_blank",style:"float:right;position:fixed;bottom:2px;left:1px;z-index:9999;"},new Array(
				createElement("img",{src:phoneImg,width:"64"})
			))
		);

	};

	function run(){
		isProtected = (selectSingleNode(".//a[contains(@class,'loginToEditProtectedPage')] | .//a[contains(@data-id,'unprotect')]")!=null);

		//get settings
		sections=JSON.parse(GM_getValue('sections','{}'));

		//change appearance
		addWikiaCSS();
		headersToContainers();
		moveActivityFeed();
		moveShortActivityFeed();
		dropWikiaNetwork();
		addAnchorAltTargets();
		fixRevisionTables();
		showRedPhone();
	};


	window.setTimeout(run,500);
})(); // anonymous function wrapper end