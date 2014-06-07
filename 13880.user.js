// version 0.9.12 BETA!
// 2008/11/24
// Copyright (c) 2007, Hiroyuki Nakamura <hiroyuki@maloninc.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// 2008-11-24 v0.9.12
//     * Change color of top/bottom toggle button according to Gmail's theme.
//
// 2008-11-23 v0.9.11
//     * Fixed according as Gmail's internal change of design.
//
// 2008-05-21 v0.9.10
//     * Fixed according as Gmail's internal change of design.
//
// 2008-05-09 v0.9.9
//     * Fixed according as Gmail's internal change of design.
//
// 2008-04-09 v0.9.8
//     * Fixed because Gmail's internal design has slightly changed.
//
// 2008-03-13 v0.9.7
//     * Fixed because Gmail's internal design has slightly changed.
//
// 2008-01-30 v0.9.6
//     * Fixed the right side pane.
//
// 2008-01-28 v0.9.5
//     * Made it workable with Greasemonkey version 0.7.20080121.0.
//
// 2007-12-05 v0.9.4
//     * Made the colored label menu easy to access.
//
// 2007-12-03 v0.9.3
//     * Moved thread list view right properly.
//
// 2007-11-17 v0.9.2 
//     * Available in 'Contacts' and 'Settings'
//     * Resize view on toggle top and bottom arrow
//     * Handle window resize event
//
// 2007-11-14 v0.9.1 
//     * Adjust upper links line top position(Thanx! dy)
//
// 2007-11-14 v0.9.0
//     * Initial release
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Gmail Fixed Navigation for Newer Gmail
// @namespace      http://www.maloninc.com/greasemonkey
// @description    It allows your gmail navigation to be fixed.
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

var switchHeight = 20;
var loadingTimer = null;
var settingDiv   = document.createElement('div');
var convDiv      = document.createElement('div');

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
		
		function fixNav(){
			if (loadingTimer) clearTimeout(loadingTimer);
			
			var navPane        = gmail.getNavPaneElement();
			var body           = getBody(navPane);
			var sysLabel       = gmail.getSystemLabelsElement();
			var labelBox       = sysLabel.nextSibling.nextSibling;
			//var googMenus      = getElementsByClass('goog-menu', labelBox);
			var labelColorMenu = null;
			var mastHead       = gmail.getMastheadElement();
			var activeView     = gmail.getActiveViewElement();
			var activeType     = gmail.getActiveViewType();
			var gbh1            = mastHead.firstChild.firstChild.nextSibling.firstChild.firstChild.nextSibling;
			var gbh2            = gbh1.nextSibling;

			navPane.style.overflowX = 'hide';
			navPane.style.overflowY = 'auto';
			//navPane.style.position  = 'fixed';
			navPane.style.height   = (body.clientHeight - mastHead.clientHeight - switchHeight) + 'px';
			navPane.style.width = '150px'; 
			navPane.style.zIndex = 1; 

			/* Move colored label menu to the tail of body tag */
			/*if(googMenus.length >= 1){
				labelColorMenu = googMenus[0].parentNode;
			}
			if(labelColorMenu){
				labelColorMenu.parentNode.removeChild(labelColorMenu);
				body.appendChild(labelColorMenu);
			}*/
			
			gbh1.style.top = '33px'; /* upper links line top position */
			gbh2.style.top = '33px'; /* upper links line top position */
			
			if(activeView && activeType == 'tl'){ /* thread list */
				var adBar         = activeView.parentNode.previousSibling;
				var topActMenu    = activeView.firstChild.childNodes[0]; //0
				var activeBody    = activeView.firstChild.childNodes[3]; //2
				var spacer        = activeView.firstChild.childNodes[4]; //3
				var bottomActMenu = activeView.firstChild.childNodes[5]; //4
				var footer = gmail.getFooterElement();
				
				if( topActMenu.clientHeight == 0 || adBar.clientHeight == 0 ){
					loadingTimer = setTimeout(fixNav, 100);
					return;
				}
				activeBodyHeight = (body.clientHeight - mastHead.clientHeight - footer.clientHeight - topActMenu.clientHeight - adBar.clientHeight - switchHeight*2);

				activeBody.style.height    = activeBodyHeight + 'px';
				activeBody.style.overflowX = 'hidden';
				activeBody.style.overflowY = 'auto';
				bottomActMenu.style.display = 'none';
				spacer.style.display = 'none';

			}
			else if(activeView && activeType == 'cv'){ /* conversation */
				var adBar         = activeView.parentNode.previousSibling;
				var topActMenu    = activeView.firstChild.childNodes[0];
				var activeBodyOrg = activeView.firstChild.childNodes[1];
				var activeBody    = convDiv;
				var bottomActMenu = activeView.firstChild.childNodes[2];
				var footer        = gmail.getFooterElement();
				
				activeBody.id = '_FIXNAV_convDiv';
				if( topActMenu.clientHeight == 0 || adBar.clientHeight == 0 ){
					loadingTimer = setTimeout(fixNav, 100);
					return;
				}
				activeBodyHeight = (body.clientHeight - mastHead.clientHeight - footer.clientHeight - topActMenu.clientHeight - adBar.clientHeight - switchHeight*2);

				activeBody.style.height     = activeBodyHeight + 'px';
				activeBody.style.overflowX  = 'hidden';
				activeBody.style.overflowY  = 'auto';
				bottomActMenu.style.display = 'none';
			
				if( activeBodyOrg.id == '_FIXNAV_convDiv' ) return;
	
				if( activeBody.hasChildNodes() == false ){
					activeView.firstChild.removeChild(activeBodyOrg);
					activeBody.appendChild(activeBodyOrg);
					activeView.firstChild.insertBefore(activeBody, bottomActMenu);
				}else {
					activeBody.removeChild(activeBody.firstChild);
					activeView.firstChild.removeChild(activeBodyOrg);
					activeBody.appendChild(activeBodyOrg);
					activeView.firstChild.insertBefore(activeBody, bottomActMenu);
				}
			}
			else if(activeView && activeType == 'co'){ /* compose */
				var topActMenu    = activeView.firstChild.firstChild.firstChild.firstChild.childNodes[0];
				var activeBody    = activeView.firstChild.firstChild.firstChild.firstChild.childNodes[1];
				var bottomActMenu = activeView.firstChild.firstChild.firstChild.firstChild.childNodes[2];
				var footer        = gmail.getFooterElement();
				
				if( topActMenu.clientHeight == 0 ){
					loadingTimer = setTimeout(fixNav, 100);
					return;
				}
				activeBodyHeight = (body.clientHeight - mastHead.clientHeight - footer.clientHeight - topActMenu.clientHeight - switchHeight*2);
				activeBody.style.height     = activeBodyHeight + 'px';
				activeBody.style.overflowX  = 'hidden';
				activeBody.style.overflowY  = 'auto';
				bottomActMenu.style.display = 'none';
			}
			else if(activeView && activeType == 'ct'){ /* contacts */
				/* I guess it is Gmail's bug */
				var activeBody = activeView.firstChild;
				var canvas = document.getElementById('canvas_frame').contentWindow.document;
				var contacts = canvas.body.childNodes[2];
				
				if( activeBody.hasChildNodes() == false ){
					canvas.body.removeChild(contacts);
					activeBody.appendChild(contacts);
					contacts.style.position = 'static';
					
					/* add onload event handler on the contacts iframe */
					contacts.addEventListener('load',function(){
						activeBodyHeight = (body.clientHeight - mastHead.clientHeight - switchHeight*2);
						contacts.style.height = 600 + 'px'
						activeBody.style.height    = activeBodyHeight + 'px';
						activeBody.style.overflowX = 'hidden';
						activeBody.style.overflowY = 'auto';
					}, false);
				}else{
					contacts = activeBody.firstChild;
					
					/* I don't know how to reload the iframe */
					src = contacts.src;
					contacts.src = 'about:blank';
					contacts.src = src;
				}
			}
			else if(activeView && activeType == 's'){ /* settings */
				var title         = activeView.firstChild.childNodes[0]
				var menu          = activeView.firstChild.childNodes[1].firstChild.firstChild;
				var activeBodyOrg = activeView.firstChild.childNodes[1].firstChild.firstChild.nextSibling;
				var activeBody    = settingDiv;
				var footer        = gmail.getFooterElement();
				
				activeBody.id = '_FIXNAV_settingDiv';
				if( menu.clientHeight == 0 || menu.clientHeight == 0){
					loadingTimer = setTimeout(fixNav, 100);
					return;
				}
				activeBodyHeight = (body.clientHeight - mastHead.clientHeight - footer.clientHeight - title.clientHeight - menu.clientHeight - switchHeight*2);
				
				activeBody.style.height    = activeBodyHeight + 'px';
				activeBody.style.overflowX = 'auto';
				activeBody.style.overflowY = 'auto';
				activeBody.style.width     = (activeView.clientWidth) + 'px';

				if (activeBody.hasChildNodes() && activeBodyOrg.id == '_FIXNAV_settingDiv'){
					return;
				}

				activeBodyOrg.style.width     = (activeView.clientWidth+20) + 'px';
				
				if (activeBody.hasChildNodes() && activeBody.firstChild != activeBodyOrg){
					activeBody.removeChild(activeBody.firstChild);
				}
				activeBodyOrg.parentNode.removeChild(activeBodyOrg);
				activeBody.appendChild(activeBodyOrg);
				menu.parentNode.appendChild(activeBody);
			}
		}
		
		function getBody(div){
			for(var node = div; node; node = node.parentNode){
				if(node.tagName == 'BODY')return node;
			}
			return null;
		}
		
		function makeFootSwitch(){
			var footer = gmail.getFooterElement();
			var mastHead = gmail.getMastheadElement();
			var navPane  = gmail.getNavPaneElement();
		    var div      = document.createElement('center')
		    var btn      = document.createElement('div');
            var txt      = null;
            
		    btn.className = GM_getValue("footSwitch", "closed");
		    if(btn.className == 'undefined' ) btn.className = "closed";
			if(btn.className == 'opened'){
				footer.style.display = 'block';
                txt = document.createTextNode('▼');
			}else{
				footer.style.display = 'none';
                txt = document.createTextNode('▲');
			}

            btn.className = btn.className + ' s7hnoe';
		    btn.id = "footSwitchButton";
		    div.style.cursor     = "pointer";
            div.style.height = 10 + 'px';
		    div.addEventListener('click', function(){toggleSwitch(btn, footer, "footSwitch");}, false);
		    div.appendChild(btn)
            btn.appendChild(txt);
		    footer.parentNode.appendChild(div);
		}
		
		function makeHeadSwitch(){
			var footer = gmail.getFooterElement();
			var mastHead = gmail.getMastheadElement();
			var navPane  = gmail.getNavPaneElement();
		    var div      = document.createElement('center');
		    var btn      = document.createElement('div');
            var txt      = null;
            
		    btn.className = GM_getValue("headSwitch", "closed");
		    if(btn.className == 'undefined' ) btn.className = "closed";
			if(btn.className == 'opened'){
				mastHead.style.display = 'block';
                txt = document.createTextNode('▼');
			}else{
				mastHead.style.display = 'none';
                txt = document.createTextNode('▲');
			}

            btn.className = btn.className + ' gb1';
		    btn.id = "headSwitchButton";
		    div.style.cursor     = "pointer";
            div.style.height = 10 + 'px';
		    div.addEventListener('click', function(){toggleSwitch(btn, mastHead, "headSwitch");}, false);
		    div.appendChild(btn);
            btn.appendChild(txt);
		    mastHead.parentNode.insertBefore(div, mastHead);
		    
		}

		function toggleSwitch(sw, footer_header, label){
			var swValue = GM_getValue(label, "closed");
		    if(swValue == 'undefined' ) swValue = "closed";
			if(swValue == 'opened'){
				//sw.className = 'closed';
				GM_setValue(label, "closed");
				footer_header.style.display = 'none';
                sw.removeChild(sw.firstChild);
                txt = document.createTextNode('▲');
                sw.appendChild(txt);
			}else{
				//sw.className = 'opened';
				GM_setValue(label, "opened");
				footer_header.style.display = 'block';
                sw.removeChild(sw.firstChild);
                txt = document.createTextNode('▼');
                sw.appendChild(txt);
			}
			
			fixNav();
		}

		function getElementsByClass(className, startNode)
		{
		    var tagFilter  = ( arguments.length > 2 ) ? arguments[2].toLowerCase() : '';
		    var nodeList   = startNode.childNodes;
		    var tmpArray   = [];
		    var checkClass = new RegExp("(^| )" + className + "( |$)");
		    
		    for( var i = 0, m = nodeList.length; i < m; i++ ){
		        if( nodeList[i].nodeType != 1 )/* 1 = Node.ELEMENT_NODE */{
		            continue;
		        }
		        
		        if( nodeList[i].childNodes.length > 0 ){
		            tmpArray = tmpArray.concat(getElementsByClass(className, nodeList[i], tagFilter));
		        }
		        
		        if( checkClass.test(nodeList[i].className) && ( tagFilter == '' || tagFilter == nodeList[i].nodeName.toLowerCase() ) ){
		            tmpArray[tmpArray.length] = nodeList[i];
		        }
		    }
		    return tmpArray;
		}


		function init(){
			try{
				var try_footer = gmail.getFooterElement();
				makeFootSwitch();
				makeHeadSwitch();
				fixNav()
				
				// register gmail view change event handler
				gmail.registerViewChangeCallback(fixNav);
				
				// register window resize event handler
				unsafeWindow.addEventListener('resize', fixNav, true);
			}catch(e){
				setTimeout(init, 1000);
				return;
			}
		}
		
		init();
   });
  }
}, true);


GM_addStyle(<><![CDATA[
   #headSwitchButton {
     cursor: pointer;
     font-size: 8px;
   }
   #headSwitchButton:hover {
   }
   #headSwitchButton {
   }
   #headSwitchButton.opened {
   }
   #headSwitchButton.closed {
   }


   #footSwitchButton {
     cursor: pointer;
     font-size: 8px;
   }
   #footSwitchButton:hover {
   }
   #footSwitchButton {
   }
   #footSwitchButton.opened {
   }
   #footSwitchButton.closed {
   }
]]></>);

/*GM_addStyle(<><![CDATA[
   #headSwitchButton {
     width: 0;
     height: 0;
     border: 9px none transparent;
     -moz-border-radius:  2px;
     cursor: pointer;
     -moz-opacity: 0.3;
   }
   #headSwitchButton:hover {
     -moz-opacity: 0.6;
   }
   #headSwitchButton {
     border-style: none solid;
   }
   #headSwitchButton.opened {
     border-top-style: solid;
     -moz-border-top-colors: transparent blue;
   }
   #headSwitchButton.closed {
     border-bottom-style: solid;
     -moz-border-bottom-colors: transparent blue;
   }


   #footSwitchButton {
     width: 0;
     height: 0;
     top-margine: 1em;
     border: 9px none transparent;
     -moz-border-radius:  2px;
     cursor: pointer;
     -moz-opacity: 0.3;
   }
   #footSwitchButton:hover {
     -moz-opacity: 0.6;
   }
   #footSwitchButton {
     border-style: none solid;
   }
   #footSwitchButton.opened {
     border-top-style: solid;
     -moz-border-top-colors: transparent blue;
   }
   #footSwitchButton.closed {
     border-bottom-style: solid;
     -moz-border-bottom-colors: transparent blue;
   }
]]></>);
*/
