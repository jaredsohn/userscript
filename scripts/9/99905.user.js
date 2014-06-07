// ==UserScript==
// @name           Facebook Auto Publish
// @description    Auto-clicks publish button
// @include        http://www.facebook.com/connect/uiserver.php?*
// @include        http://*.facebook.com/*/serverfbml*
// @include        https://www.facebook.com/dialog/feed
// @include        http*://www.facebook.com/dialog/stream.publish*
// @include        *empire.zynga.com/*?*
// @include        *cafe.zynga.com/current/fb/callback/todays_gift_popup.php?*
// @include        *cafeworld/send_gift.php?*
// @include        *cityville.zynga.com/gifts.php?*
// @include        https://www.facebook.com/dialog/apprequests*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.21
// @copyright      Charlie Ewing

// ==/UserScript== 
(function() { 

	var version = "0.0.21";
	var stage=0;

	var limits={
		"164285363593426":75,
		"234860566661":26,
		"10979261223":26,
	};

	//returns true if value is in array
	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	//returns true if string contains s
	String.prototype.find = function(s) {return (this.indexOf(s) != -1);};

	//returns true if string starts with s
	String.prototype.startsWith = function(s) {return (this.substring(0, s.length) == s);};

	//click a node object
	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	}

	//short form for evaluate
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	}

	//short form for evaluate with single node return
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	}

	function checkTop40(){
		var list=selectNodes(".//div[contains(@class,'unselected_list')]/label[contains(@class,'clearfix')]/input[contains(@type,'checkbox')]");
		var li=0,box;
		while(li<getLimit() && li<list.snapshotLength){
			box=list.snapshotItem(li);
			if(box) click(box);
			li++;
		}
		stage=2;
	}

	function checkLast40(){
		var list=selectNodes(".//div[contains(@class,'unselected_list')]/label[contains(@class,'clearfix')]/input[contains(@type,'checkbox')]");
		var li=0,box;
		while(li<getLimit() && (list.snapshotLength-li)>0){
			box=list.snapshotItem(list.snapshotLength-(li+1));
			if(box) click(box);
			li++;
		}
		stage=2;
	}

	function checkRand40(){
		var list,li=0,box,i;
		while(li<getLimit()){
			list=selectNodes(".//div[contains(@class,'unselected_list')]/label[contains(@class,'clearfix')]/input[contains(@type,'checkbox')]");
			i=Math.floor(Math.random()*list.snapshotLength);
			box=list.snapshotItem(i);
			if(box) click(box);
			li++;
		}
		stage=2;
	}

	function checkRandX(x){
		var list,li=0,box,i;
		while(li<x){
			list=selectNodes(".//div[contains(@class,'unselected_list')]/label[contains(@class,'clearfix')]/input[contains(@type,'checkbox')]");
			i=Math.floor(Math.random()*list.snapshotLength);
			box=list.snapshotItem(i);
			if(box) click(box);
			li++;
		}
		stage=2;
	}

	function checkTopX(x){
		var list=selectNodes(".//div[contains(@class,'unselected_list')]/label[contains(@class,'clearfix')]/input[contains(@type,'checkbox')]");
		var li=0,box;
		while(li<x && li<list.snapshotLength){
			box=list.snapshotItem(li);
			if(box) click(box);
			li++;
		}
		stage=2;
	}

	function finishPub(){
		var publish2=selectSingleNode(".//input[contains(@name,'sendit')]");
		if(publish2) click(publish2);
		//console.log('publish 2 clicked');
		window.setTimeout(finishPub,1000);
	}		

	function whatGame(){
		var publish=selectSingleNode(".//div[contains(@class,'app_content_') and contains(@id,'app_content_')]");
		var id;
		if (publish) id = publish.id.replace('app_content_','');
		else if (location.href.find('empire.zynga.com')) id = "164285363593426";
		else if (location.href.find('cafe.zynga.com')) id = "101539264719";
		else if (location.href.find('cafeworld/')) id = "101539264719";
		else if (location.href.find('cityville.zynga.com')) id = "291549705119";
		else if (location.href.find('farmville.com')) id= "102452128776";
		publish=null;
		return id;
	}

	function getLimit(){
		return (limits[whatGame()]) || 40;
	}

	function getOpt(opt){
		var storedObject = JSON.parse(GM_getValue('options', '{}'));		
		return storedObject[opt] || false;
	}

	function setOpt(opt,value){
		var storedObject = JSON.parse(GM_getValue('options', '{}'));		
		storedObject[opt]=value;
		GM_setValue('options',JSON.stringify(storedObject));
	}

	function toggleOpt(){
		var opt=this.name.split('opt_')[1];
		var value=!getOpt(opt);
		setOpt(opt,value);
		this.className=(value?'wmSelected ':'wmUnSelected ')+this.className.replace('wmSelected ','').replace('wmUnSelected ','');
	}

	function selectCorrectTab(){
		var isSelected=false;
		var theTab;
		var toggleTabs=selectSingleNode(".//ul[@class='toggle_tabs']");
		if (toggleTabs){
			switch (whatGame()){
				case '201278444497': //frontierville
					theTab = selectSingleNode(".//a[contains(@href,'view=farmville')]",{node:toggleTabs});
					if (theTab) isSelected = theTab.parentNode.className.find('selected');
					break;

				case '101539264719': //cafeworld
					theTab = selectSingleNode(".//a[contains(@href,'view=cafe')]",{node:toggleTabs});
					if (!theTab) theTab = selectSingleNode(".//a[@id='custom_link')]",{node:toggleTabs});
					if (!theTab) theTab = selectSingleNode(".//a[@id='cafe_link')]",{node:toggleTabs});
					if (theTab) isSelected = theTab.className.find('selected');
					break;

				case '234860566661': //treasureisle
					theTab = selectSingleNode(".//a[contains(@href,'view=current')]",{node:toggleTabs});
					if (theTab) isSelected = theTab.parentNode.className.find('selected');
					break;

				case '291549705119': //cityville
					theTab = selectSingleNode(".//a[contains(@href,'view=app')]",{node:toggleTabs});
					if (theTab) isSelected = theTab.parentNode.className.find('selected');
					break;

				case '164285363593426': //empires
					//console.log('game determined');
					theTab = selectSingleNode(".//a[contains(@href,'view=recent')]",{node:toggleTabs});
					if (!theTab) theTab = selectSingleNode(".//a[contains(@href,'view=active')]",{node:toggleTabs});
					if (!theTab) theTab = selectSingleNode(".//a[contains(@href,'view=empires')]",{node:toggleTabs});
					if (!theTab) theTab = selectSingleNode(".//a[contains(@href,'view=zynga')]",{node:toggleTabs});
					if (theTab) isSelected = theTab.parentNode.className.find('selected');
					break;

				case '102452128776': //farmville
					theTab = selectSingleNode(".//a[contains(@href,'view=fv')]",{node:toggleTabs});
					if (theTab) isSelected = theTab.innerHTML.find('btn_SingleParts_On.png');
					break;
			}

			if (!isSelected && theTab) {
				//console.log('not selected but tab exists '+theTab.href);
				window.setTimeout(function(){
					if (theTab.click) click(theTab);
					window.setTimeout(function(){
						if (theTab.href) location.href = theTab.href;
					},500);
				},500);
				return true;
			}
		}
	}

	function isKnownGame(){
		return ",201278444497,120563477996213,101539264719,234860566661,291549705119,164285363593426,".find(','+whatGame()+',');
	}

	//addGlobalStyle from diveintogreasemonkey.org
	function addGlobalStyle(css) {
    		var head, style;
    		head = document.getElementsByTagName('head')[0];
    		if (!head) { return; }
    		style = document.createElement('style');
    		style.type = 'text/css';
    		style.innerHTML = css;
    		head.appendChild(style);
	}

	// Created by avg, modified by JoeSimmons. shortcut to create an element
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	}

	function run(){
		try{
			//first try to make sure we are on the right tab for friend selection
			if (selectSingleNode(".//ul[@class='toggle_tabs']")){
				if (selectCorrectTab()) return;
			}

			//find correct publish button
			var publish,multi;
			if (window.location.href.find('serverfbml.php') || window.location.href.find('apps.facebook.com/cafeworld/send_gift.php') || window.location.href.find('cityville.zynga.com/gifts.php')){
				multi=selectSingleNode(".//div[contains(@class,'unselected_list')]");				
				publish=selectSingleNode(".//span[contains(@class,'fb_protected_wrapper')]/input[contains(@class,'inputbutton request_form_submit')]");
			} else {
				if (window.location.href=='https://www.facebook.com/dialog/stream.publish') {
					publish=selectSingleNode(".//input[contains(@name,'publish')]");
				} else {
					publish=document.getElementById('publishClone');
					if (!publish) {
						publish = document.getElementById('publish');
						if (publish) if (publish.hasChildNodes()) publish = publish.childNodes[0];
					}
					if (!publish) {
						publish = document.getElementById('ok_clicked');
						if (publish) if (publish.hasChildNodes()) publish = publish.childNodes[0];
					}
				}
			}
			var isInvite = (publish)?(publish.form.action.find('/invite_post?') || publish.form.action.find('invite.php')):false;

			//add buttons
			if(multi && stage==0){
				window.setTimeout(function(e){

					//check if buttons exist
					buttons=selectSingleNode(".//input[contains(@name,'btn_top40')]");

					
					//add buttons
					if(!buttons){
						multi.parentNode.insertBefore(createElement('div',{style:'height:32px;width:200%;'},new Array(
							createElement('input',{style:'width:32px;height:32px;vertical-align:top;',type:'image',src:'http://i53.tinypic.com/2yjsea0.png',title:'Top '+getLimit(),name:'btn_top40',onclick:checkTop40}),
							createElement('input',{style:'width:32px;height:32px;vertical-align:top;',type:'image',src:'http://i54.tinypic.com/2chktc5.png',title:'Last '+getLimit(),name:'btn_last40',onclick:checkLast40}),
							createElement('input',{style:'width: 32px; height: 32px; vertical-align: top; background-image: url("http://i53.tinypic.com/2yjsea0.png"); background-size: 32px 32px; border-radius: 3px 3px 3px 3px; background-position: -1px -1px; padding: 1px; border: 1px solid transparent;',type:'button',value:'10',title:'Top 10',name:'btn_top10',onclick:function(){checkTopX(10);}}),

							createElement('input',{style:'width:32px;height:32px;vertical-align:top;',type:'button',value:'10',title:'Random 10',name:'btn_rand10',onclick:function(){checkRandX(10);}}),
							createElement('input',{style:'width:32px;height:32px;vertical-align:top;',type:'button',value:'20',title:'Random 20',name:'btn_rand20',onclick:function(){checkRandX(20);}}),
							createElement('input',{style:'width:32px;height:32px;vertical-align:top;',type:'button',value:getLimit(),src:'http://i53.tinypic.com/30uso4i.png',title:'Random '+getLimit(),name:'btn_rand40',onclick:checkRand40}),

							createElement('input',{style:'width:64px;height:32px;vertical-align:top;',type:'image',src:'http://i55.tinypic.com/11l4co0.png',title:'AutoSelect Short Lists',name:'opt_autoSelect',className:(getOpt('autoSelect')?'wmSelected ':'wmUnSelected '),onclick:toggleOpt}),
							createElement('input',{style:'width:64px;height:32px;vertical-align:top;',type:'image',src:'http://i54.tinypic.com/2vwfezc.png',title:'AutoSelect Long Lists',name:'opt_autoSelectMax',className:(getOpt('autoSelectMax')?'wmSelected ':'wmUnSelected '),onclick:toggleOpt})
						)),multi);
					}

					stage=1;
					window.setTimeout(run,500);
					
				},500);
				return;

			//fill a multi select box
			} else if(multi && stage==1 && !isInvite){
				if (selectNodes(".//div[contains(@class,'unselected_list')]/label[contains(@class,'clearfix')]/input[contains(@type,'checkbox')]").snapshotLength<=getLimit()) {
					//select all if less than limit appears and any autoselect is on
					if (getOpt('autoSelect') || getOpt('autoSelectMax')) checkTop40();
				}

				else if (selectNodes(".//div[contains(@class,'unselected_list')]/label[contains(@class,'clearfix')]/input[contains(@type,'checkbox')]").snapshotLength>0) {
					//select random number if any exists if autoselectmax is on
					if (getOpt('autoSelectMax')) checkRand40();
				}

				window.setTimeout(run,500);
				return;

			//publish it
			} else if(publish && stage!=3 && !isInvite){
				stage=3;
				window.setTimeout(function(){
					click(publish);
					//console.log('publish clicked');
					window.setTimeout(finishPub,500);
				},500);
				return;
			}

		} catch(e){window.setTimeout(run,1000);}
	}

	//addGlobalStyle(".wmSelected {background-color:#3B5998;color:#FFFFFF;}");
	addGlobalStyle(".wmSelected {opacity:1;}\n.wmUnSelected {opacity:0.25;}");
	window.setTimeout(run,500);

})(); // anonymous function wrapper end