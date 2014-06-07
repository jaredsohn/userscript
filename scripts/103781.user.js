// ==UserScript==
// @name           Ravenwood Fair Message Center Assistant
// @description    Assists Player with Accepting Gifts on Message Center
// @include        http://*ravenwoodfair.com/app/1/messagecenter?*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.10
// @require        http://sizzlemctwizzle.com/updater.php?id=103781&days=1
// @copyright      Charlie Ewing
// ==/UserScript== 

(function() { 

	var version = "0.0.10";
	var isReady = true;
	var oTab;

	String.prototype.find = function(s) {
		return (this.indexOf(s) != -1);
	};

	String.prototype.startsWith = function(s) {
		return (this.substring(0, s.length) == s);
	};

	// Get element by id shortform with parent node option
	function $(ID,root) {return (root||document).getElementById(ID);}

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

	function click(link, blockLoad) {
	    	var cancelled = false;
		var isAnchor = (link.tagName=='A');

	    	if (document.createEvent) {
	    		var event = document.createEvent("MouseEvents");
        		event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        		cancelled = !link.dispatchEvent(event);
	    	}
	    	else if (link.fireEvent) {
        		cancelled = !link.fireEvent("onclick");
		}

    		if (!cancelled && isAnchor && !blockLoad) {
			if(link.href!=null && link.href!='' && link.href!='#') window.location = link.href;
		}
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

	//short form for evaluate with single node return
	function countNodes(xPath,params){
		params=params||{}; params['type']=1;
		return selectNodes(xPath,params).numberValue;
	}

	//deletes all snapshots or iterations in an xpathResult object
	function deleteNodes(xPath,params) {
		params=params||{};
		var o=selectNodes(xPath,params); if (o){
			if(o.snapshotItem) for(var i=o.snapshotLength-1; (item=o.snapshotItem(i)); i--) item.parentNode.removeChild(item);
			else for(var i=o.length-1; i>=0; i--) if(o[i]) o[i].parentNode.removeChild(o[i]);
		}
		o=null;
	};

	function setHashParam(p,v,hWnd){
		var h = (hWnd||unsafeWindow).location.hash;
		var params = h.split('&');
		var found=false;
		if (params.length) for (var x=0;x<params.length && !found;x++){
			var p1 = params[x].split('=')[0];
			var v1 = params[x].split('=')[1];
			if (p1 == p) {
				params[x]=p+'='+v;
				found=true;
			}
		}
		if (!found) params[params.length]=p+'='+v;
		h=params.join('&');
		(hWnd||unsafeWindow).location.hash = h;
	};

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
		this.parentNode.className=(value?'mcTab active':'mcTab');
	}

	//gets the first "send a gift back" button available on the message center
	function getSendReturnGift(){
		var btn=selectSingleNode(".//div[(@class='message clearfix') and contains(@id,'row_gift')]/div[contains(@id,'_icon')]/img[not(contains(@src,'Wedding_Invitation.png'))]/ancestor::div[contains(@class,'message clearfix')]/div[contains(@id,'_actions_post') and (contains(@style,'display: block') or contains(@style,'display:block') )]/a[@class='btn']",{node:document.documentElement});
		return btn;
	};

	//gets the first "send a gift back" button available on the message center
	function getThankYouGift(){
		var btn=selectSingleNode(".//div[contains(@id,'row_thank_you') and (@class='actions') and not(contains(@style,'display: none'))]/a[@class='btn']",{node:document.documentElement});
		return btn;
	};

	//gets the first "send gift" button available on the message center
	//trying to return a gift first before doing normal send gifts
	function getSendGift(){
		var btn=getSendReturnGift();
		if (btn==null) btn=selectSingleNode(".//div[contains(@id,'row_help') and (@class='actions') and not(contains(@style,'display: none'))]/a[@class='btn']",{node:document.documentElement});
		return btn;
	};

	//gets the first "accept gift" button available on the message center from the thank you gift section
	//if none is found it then tries a gift from the normal gifts section
	function getAcceptGift(){
		var btn=selectSingleNode(".//div[contains(@id,'row_gift') and (@class='actions') and not(contains(@style,'display: none'))]/a[@class='btn']",{node:document.documentElement});
		return btn;
	};

	//gets the first "send gift" button available on the message center
	function getAddNeighbor(){
		var btn=selectSingleNode(".//div[contains(@id,'row_neighbor') and not(contains(@id,'_post')) and (@class='actions') and not(contains(@style,'display: none'))]/a[@class='btn']",{node:document.documentElement});
		return btn;
	};

	//gets the first "send gift" button available on the message center
	function getInvite(){
		var btn=selectSingleNode(".//div[contains(@id,'row_invite') and not(contains(@id,'_post')) and (@class='actions') and not(contains(@style,'display: none'))]/a[@class='btn']",{node:document.documentElement});
		if (!btn) btn=selectSingleNode(".//div[contains(@id,'row_wedding') and not(contains(@id,'_post')) and (@class='actions') and not(contains(@style,'display: none'))]/a[@class='btn']",{node:document.documentElement});
		return btn;
	};

	function doNext(target){
		//oTab.close();
		oTab.location.hash = 'thankyou';
		//setHashParam('thankyou','1',oTab);
		target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
		isReady=true;
		window.setTimeout(run,1500);
	};

	function onFrameLoad(target){
		if (oTab){
			try{
				var addy=oTab.top.location.href;

				//check for lack of movement to next address
				if (addy.find('#thankyou')){
					//just let it loop
				}

				//check for known errors
				else if (oTab.document.documentElement.innerHTML.find('400 Bad request')){
					doNext(target);
					return;
				}

				//check for game load or cycle to message center
				else if (addy.find("apps.facebook.com/ravenwoodfair/home?default_tab=messagecenter") || addy.find("ravenwoodfair.com/play")){
					doNext(target);
					return;
				}

				//not ready, continue loop
				window.setTimeout(function(){onFrameLoad(target);},500);

			} catch (e) {
				var msg=''+e;
				
				//check for known errors
				if (msg.find('denied to access property')){
					//assume here that we moved beyond domain
					doNext(target);
					return;
				}

				//check for null document, means not ready
				if (oTab.document.documentElement == null) {
					window.setTimeout(function(){onFrameLoad(target);},500);
					return;
				}

				//report unknown errors
				console.log(msg);			

				//window.setTimeout(function(){onFrameLoad(target);},500);
			}
		}
	};

	function run(){
		if (!isReady) return;

		//create an iframe for use with sending gifts
		var clicker=$('clicker');		
		if (!clicker) {
			clicker = createElement('span',{id:'clicker'});
			document.body.appendChild(clicker);

			//do some other stuff to fix view
			document.body.style.overflow='scroll';

			//find the tab bar
			var tabBar = selectSingleNode("//div[@id='message-center-content']/ul[@class='selectors']");

			//add options tabs
			if (tabBar){

			//remove some stuff to make room
			deleteNodes(".//li[@class='mcTab']",{node:tabBar});

			tabBar.appendChild(
				createElement('li',{className:'mcTab'+(getOpt('enabled')?' active':'')},new Array(
					createElement('a',{name:'opt_enabled',onclick:toggleOpt,href:'#'},new Array(
						createElement('text','Asst. Enabled')
					))
				))
			);
			tabBar.appendChild(
				createElement('li',{className:(getOpt('modeSidekick')?'mcTab active':'mcTab')},new Array(
					createElement('a',{name:'opt_modeSidekick',onclick:toggleOpt,href:'#'},new Array(
						createElement('text','WM Sidekick Mode')
					))
				))
			);}
		}

		if (!getOpt('enabled')) {
			window.setTimeout(run,1500);
			return;
		}

		var target = getInvite();
		if(target) {
			click(target, true);
			window.setTimeout(run,1500);return;
		} else {
			target = getThankYouGift();
			if(target) {
				click(target, true);
				window.setTimeout(run,1500);return;
			} else {
				target = getAddNeighbor();
				if(target) {
					click(target, true);
					window.setTimeout(run,1500);return;
				} else {
					target = getSendGift();
					if(target) {
						if(getOpt('modeSidekick')){
							isReady = false; //pause and wait for iframe to finish.
							clicker.click = target.click;
							click(clicker, true);
	
							//fix the link, removing https and switching to http only
							var goto = target.href.replace('https://','http://');
				
							//clear the window
							(!oTab)?oTab=window.open("about:blank",'_blank'):oTab.location.href="about:blank";

							//open the bonus page in a new tab or the previously opened tab object to save memory
							window.setTimeout(function(){
								(!oTab)?oTab=window.open(goto,'_blank'):oTab.location.href=goto;
							
								//handle=window.open(target.href,'_blank');
								window.setTimeout(function(){onFrameLoad(target);},500);
							},1000);
							return;
						} else {
							click(target);
							//will process bonus and cycle back to msg center page like version 4
							return;
						}

					} else {
						target = getAcceptGift();
						if(target) {
							click(target,true);
							window.setTimeout(run,1500);
							return;

						}

						//there are no posts to process			
						//prevent secondary game from loading after last post
						if (oTab) oTab.close(); return;
					}
				}
			}
		}
	}	

	// clean up
	window.addEventListener("beforeunload", function(e) {
		//close the child tab we made
		if (oTab) oTab.close();

		//clean up memory
		run=null;onFrameLoad=null; doNext=null; getInvite=null; getAddNeighbor=null; getAcceptGift=null; getSendGift=null; getThankYouGift=null;
		getSendReturnGift=null; 
		selectNodes=null; selectSingleNode=null; deleteNodes=null; countNodes=null;
		createElement=null;getPropertyFromElement=null;click=null;createElement=null;$=null;
		oTab=null;isReady=null;version=null;
	}, false);

	//start it up!
	window.setTimeout(run,500);


})(); // anonymous function wrapper end