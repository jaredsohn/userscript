// ==UserScript==
// @name        OwaReadingPane
// @namespace	com.globant.mobile.public
// @description Enables inner reading panne for OWA light
// @include     */owa/*
// @version     1.5
// ==/UserScript==

// REVISIONS
// 1.0 2012 JUN 18 Creation
// 1.1 2012 JUN 19 Changed namespace - Included jQuery Everywhere
// 1.2 2012 JUN 20 Using window's width instead of screen.width to calculate the size of each panel
// 1.3 2012 JUL 04 Added button to open separately / hidded message icons (won't work)
// 1.4 2012 JUL 04 Open in new window button added / some refactoring
// 1.5 2012 JUL 04 Fixed issue with action buttons, removed TODO


//Borrowing jQuery Everywhere plugin
//http://userscripts.org/scripts/show/57004
//It collides with some other pages my team uses, so I am adding it here until I find a way 
//to declare dependency without needing every team member to configure jQuery Everywhere 
//to work only in the same domains this script works in

var magic=function() {
	if (document.head) {
		var head = document.head;
		if ("item" in head) {
			if (!head[0]) {
				setTimeout(magic, 25);
				return;
			}
			head = head[0];
		}
		var scriptElem = document.createElement("script");
		scriptElem.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
		head.insertBefore(scriptElem, head.firstChild);
	} else {
		setTimeout(magic, 500);
	}
};magic();


//Reading pane extension from here on.
(
	function(){

		function MailOpener(){
			var lnkClose,
				lnkOpenMessageHere,
				lnkOpenMessageNewWindow,
				contentSelector='.cntnttp',
				readingPaneId='trickyReadingPane',
				listContainerId='trickyListContainer',
				menuSelector='.nvtp',
				$=unsafeWindow.jQuery;

			console.log('Preparing UI hanlder.');
			
			function appendMailListDiv(){
				$('.mnTbl')
				.find('.cntnttp:first')
				.find(':first')
				.wrap('<div id="'+listContainerId+'" style="overflow-x:scroll;">');
			}

			function getListContainer(){
				return $('#'+listContainerId);
			}
			function setSmallListContainer(){

				function getListPanelWidth(){
					return unsafeWindow.innerWidth/2;

				}
				getListContainer().width(getListPanelWidth());
			}
			function setLargeListContainer(){
				getListContainer().width('100%');
			}
			
			function getMenu(){
				return $(menuSelector);
			}
			
			function getReadingPane(){
				return $('#'+readingPaneId);
			}
			
			function prepareUiForReadingPane(){
				setSmallListContainer();
				getMenu().hide();
			}
			function prepareUiForNoReadingPane(){
				setLargeListContainer();
				getMenu().show();
			
			}
			
			function initializeReadingPane(content){
				$(contentSelector)
				.parent()
				.append(
					$('<td valign="top">')
					.attr('id',readingPaneId)
				);
				getReadingPane().html(content);
				prepareUiForReadingPane();
			}
			function finalizeReadingPane(){
				getReadingPane().remove();
				prepareUiForNoReadingPane();
			}

			function newMessageButton(text,color,pnl){
				var lnk=$('<span>');
				lnk.attr('id','lnk1');
				pnl.append(lnk);
				lnk.text(text);
				lnk.css('border','2px solid '+color)
				.css('display','inline-block')
				.css('text-align','center')
				.height('27px')
				.width('150px');

				return lnk;
			}

			function buildNewPanel(content){
				var pnlReadingPane,pnlButtons,pnlMessage,messageContent;
				pnlReadingPane=$('<div>').attr('id','pnlReadingPane');
				pnlButtons=$('<div>').attr('id','pnlButtons');
				pnlMessage=$('<div>').attr('id','pnlMessage');
				//pnl1.attr('id','pnl1');
				//pnl2.attr('id','pnl2');
				//pnl3.attr('id','pnl3');
				pnlReadingPane.append(pnlButtons);
				pnlReadingPane.append(pnlMessage);
				
				lnkClose=newMessageButton('(X) Close','red',pnlButtons);
				lnkOpenMessageHere=newMessageButton('(O) Open message here','green',pnlButtons);
				lnkOpenMessageNewWindow=newMessageButton('(O) Open new window','green',pnlButtons);

				messageContent=$(content).find(contentSelector);
				messageContent.find('tr:first').hide();

				pnlMessage.html(messageContent);

				return pnlReadingPane;
			}

			function appendButtonsHandler(messageUrl){
				$(lnkClose).click(function(){
					finalizeReadingPane();
				});
				$(lnkOpenMessageHere).click(function(){
					location.href=messageUrl;
				});
				$(lnkOpenMessageNewWindow).click(function(){
					unsafeWindow.open(messageUrl);
				});

			}

			function openMail(content,messageUrl){
				finalizeReadingPane();
				initializeReadingPane(
					buildNewPanel(content)
				);
				appendButtonsHandler(messageUrl);
			}
			function unBold(link){
				var element=link;
				while(element.tagName!=="TR"){
					element=element.parentElement;
				}
				$(element).css('font-weight','normal');
			}

			function makeCall(url,link){
				$.ajax(url)
				.success(function(content){
					openMail(content,url);
					unBold(link);
				})
				.error(function(message){
					alert(message);
				});
			}


			appendMailListDiv();

			return {openUrl:makeCall};
		}

		function linkHanlderOverrider(){
			var oldItemClick=unsafeWindow.onClkRdMsg,
				oldHeadingActionClick=unsafeWindow.onClkTb,
				mailOpenerModule=MailOpener();

			console.log(oldItemClick);
			try{
				console.log('before handler override');
				unsafeWindow.onClkRdMsg=function(p,q,r,s){
					console.log('Link handler overrider was hit.');
					oldItemClick(p,q,r,s);
					if(q==="IPM.Note"){
						mailOpenerModule.openUrl(p.href,p);
						p.href='javascript:void(0);';
					}
				};
			}catch(e){
				console.log(e);
			}
			console.log('Link handler overrider was defined to ');
			console.log(unsafeWindow.onClkRdMsg);
		}


		(function waitForJQuery(){
			
			if (!unsafeWindow.jQuery){
				console.log('waiting for jQuery to be loaded');
				setTimeout(waitForJQuery,1000);
			}else{
				console.log('loading complete');
				linkHanlderOverrider();
			}
		}());
	}
());