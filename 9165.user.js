// ==UserScript==
// @name          Add Reddit Comments To Digg
// @version		  0.1
// @namespace     http://userscripts.org
// @description   Adds Reddit comments to Digg for the same story & allows you to submit comments to Reddit as well.
// @include       http://digg.com/*
// @include       http://*.digg.com/*  
// ==/UserScript==

/***Only run on an article page****/
if(document.URL.split('/').length == 5){

	GM_addStyle('#redCom{font-family:verdana,arial,helvetica,sans-serif;font-size:large;}'+
			'#errroot{display:none;}'+
			'.top_ad_image{display:none;}'+
			'.item_ad_image{display:none;}'+
			'.comments_ad_image{display:none;}'+
			'#marklink{display:none;}'+ 
			'.content div[id*="table"]{margin-bottom: 25px;}'+
			'.bylink {background-color:#E0E0E0;}'+
			'div[id*="errreply"]{display: none;}'+
			'div[id*="erredit"]{display: none;}'+
			'.little {font-size: small; color: gray;}'+
			'.little a {color: #336699; text-decoration: none;}'+
			'.little a.friend {color: orangered }'+
			'.little a:hover { text-decoration: underline }'+
			'.little .gray { color: gray }'+
			'a.bylink { font-size: x-small;background-color: #f0f0f0; color: #848484; margin: 0px 1px 0px 2px; padding: 0px 2px 0 2px;}'+
			'.delform { display: inline; margin: 0px; padding: 0px }'+
			'.btn,#spellMain,#spell {background-color:#e9e9e9; border: 1px solid #336699; margin: 0 5px 0 5px; vertical-align: bottom}'+
			'.commentbody blockquote {border-left:2px solid #336699;margin:5px 5px 5px 15px;padding-left:4px;}');


	$ = unsafeWindow.$;
	document = unsafeWindow.document;
	Insertion = unsafeWindow.Insertion;
	$$ = unsafeWindow.$$;

	var getOnce = $('wrapper').down().next(3);
	var body = document.getElementsByTagName('body')[0];
	var subNav = $('sub-nav');
	
	var getLastList = subNav.down(1).next(2);
	new Insertion.After(getLastList, "<img id='ajax-loader' style='position:absolute;margin-left:15px;' src='http://img443.imageshack.us/img443/4199/ajaxloaderml4.gif'/>");
	var getLink = $('title').childNodes[0].href;
	
	var diggComments = getOnce.innerHTML;
	getOnce.setStyle({clear: "both"});
	new Insertion.Top(getOnce, '<div id="redCom" style="display:none;"></div>');
	
	var redComDiv = $('redCom');

	var getCommTray = getOnce.down(1);
	var getOl = getCommTray.next();

	var getFirstNav = subNav.down(1);

	var toggArray = [redComDiv, getCommTray, getOl];

	var formData;
	var clickedLink;
	var postUrl;
	
/*****report & delete sub-link event handlers******/

	function observeSpan(clickedLink){
	
		var spana = clickedLink.previous().descendants();


			spana[1].onclick = function() { //choice of no
					this.up().toggle();
					this.up().next().toggle();
					return false;
				}
			spana[0].onclick = function() { //choice of yes
					var containerForm = this.up(1);
					var postUrl = 'http://reddit.com'+containerForm.getAttribute("action");
					var formData = containerForm.serialize();
					redComDiv.setStyle({opacity:0.4});					
					new Insertion.Bottom(body, "<div id='ajax-loader' style='position:fixed; left:45%; top:50%;'><img align='middle' src='http://img443.imageshack.us/img443/4199/ajaxloaderml4.gif'/><p>Posting To Reddit...</p></div>");
					ajaxForm(formData, postUrl);
					return false;
				}				
	}

/*******Process Ajax response********/

	function processResponse(data){
		
		/****Slice & Dice****/		
		var sliceData = data.slice(data.indexOf('<div class="content" style="width: 70%">'),data.indexOf("<div id='footer'>"));
		var firstReplace = sliceData.replace(/\/info/gi, "http://reddit.com/info");
		var trimmedData = firstReplace.replace(/\/user/gi, "http://reddit.com/user");
		redComDiv.setStyle({opacity:1});	
		redComDiv.innerHTML = trimmedData;
		
		/****Check if the user is logged in to each site***/
		var isUserLoggedInDigg = $$('body')[0].textContent.indexOf('Join digg for free to comment on this story.') == -1;
		var isUserLoggedInReddit = trimmedData.indexOf('commentform') > -1;
		
		redComDiv.childNodes[0].setStyle({width: "auto"});
					
		$('ajax-loader').remove();
		var checkForRedLi = $$('#sub-nav li').length;
		
		/****Check if the Reddit Nav Link is already there****/
		if(checkForRedLi < 5){	
		
			/****Check how many comments there are****/
			var numComments = redComDiv.getElementsByClassName('little').length;
			new Insertion.After(getLastList, '<li class="dynamicLink"><a href="">Reddit Comments ('+numComments+')</a></li>');
			
			/****Clone and append first nav links to end then wrap in <a> tag****/
			subNav.down(1).addClassName("dynamicLink");
			var getFirstSpan = subNav.down(2);			
			new Insertion.Top(getFirstSpan, "Digg&nbsp");			
			var dynaArray = subNav.getElementsByClassName('dynamicLink');
			var firstLi = dynaArray[0];
			var firstLiText = firstLi.textContent;
			firstLi.empty();
			firstLi.innerHTML = '<a href="">'+firstLiText+'</a>';

			/****navigation event handlers******/
			dynaArray.each(function(o){
			
			o.onmouseover = function() {o.childNodes[0].style.textDecoration = 'none';}		
							
				o.observe('click', function(event){
					if(o.className.indexOf("active") == -1){
						subNav.getElementsByClassName('active')[0].className = "dynamicLink";
						o.className = "dynamicLink active sub-comments";
		
						for(var t=0;t<toggArray.length;t++){						
							toggArray[t].toggle();
						}	
						if(o.textContent.indexOf("Reddit") > -1){
							getOnce.next().hide();
							if(isUserLoggedInDigg){$('thisform').disable();}
						}	
						else{
							getOnce.next().show();
							if(isUserLoggedInDigg){$('thisform').enable();}
						}			
					}
					event.preventDefault();
				});
			});
											
		}
		
		if(isUserLoggedInReddit){		
			var dynaArray = subNav.getElementsByClassName('dynamicLink');
			
			/****Event handlers for form buttons****/
			$$('.btn').each(function(but){
				var parentForm = but.up(1);
				parentForm.setAttribute("action", "javascript:void(0)");
				parentForm.removeAttribute("onsubmit");
	
				but.onmouseup = function() {
					if(this.textContent == "cancel"){
						this.removeAttribute("onclick");
						this.up(3).hide();
						$('spell').remove();
					}
					else{
						var formData = parentForm.serialize();	
						var postUrl = 'http://reddit.com/comment';
						redComDiv.setStyle({opacity:0.4});	
						new Insertion.Bottom(body, "<div id='ajax-loader' style='position:fixed; left:45%; top:50%;'><img align='middle' src='http://img443.imageshack.us/img443/4199/ajaxloaderml4.gif'/><p>Posting To Reddit...</p></div>");
						ajaxForm(formData, postUrl);
					}
				}					
				
			});
			
			/****add the digg spell checker to reddit comments****/
			function borrowSpellCheck(){	
				unsafeWindow.console.log($('spell'))
				$('spell').onmouseup = function() {
					var textarea1= this.up().previous();
					var speller=new 
					unsafeWindow.spellChecker(textarea1);
					unsafeWindow.speller.openChecker();
				}
			}
			
			var commentRoot = $('commentroot');	
			
			new Insertion.Bottom(commentRoot.next(), '<button id="spellMain">spell check</button>');
			
			/******Clear & expand main post reply text box when clicked*******/
			commentRoot.onfocus = function() {
				this.value = "";
				this.style.color = "black";
				this.onfocus = null;
				this.setAttribute("rows", 6);			
			}
			
			/*****Made another one for main reply box cause I'm lazy******/
			$('spellMain').onmouseup = function() {
				var textarea1= this.up().previous();
				var speller=new 
				unsafeWindow.spellChecker(textarea1);
				unsafeWindow.speller.openChecker();
			}
			
			
			/*****do with xPath instead??*****/
			/*****report, delete, reply & edit link event handlers******/

			var aArray = $('redCom').getElementsByClassName('bylink'); 
			for(var i=0;i<aArray.length;i++){
				
				if(aArray[i].href.indexOf('reply') > -1){
					aArray[i].onclick = function() {
						this.up(1).siblings().last().show();
						new Insertion.After(this.up(1).siblings().last().down(10), '<button id="spell">spell check</button>'); //seems better to add dynamically than to all
						borrowSpellCheck();
					}
				}
				else if(aArray[i].href.indexOf('edit') > -1){
					aArray[i].onclick = function() {
						this.up(1).next().show();
						new Insertion.After(this.up(1).next().down(9), '<button id="spell">spell check</button>');  //seems better to add dynamically than to all
						borrowSpellCheck();
					}			
				}
				else if(aArray[i].textContent == "delete" || aArray[i].textContent == "report"){
						
						new Insertion.Before(aArray[i], '<span style="display:none;color:red;">Are you sure? <a class="yep" href="javascript:void(0)">yes</a> / <a class="nope" href="javascript:void(0)">no</a></span>');
						aArray[i].onclick = function onceClicked(){
												this.toggle();
												this.previous().toggle();
												var clickedLink = this;
												observeSpan(clickedLink);  //<--- will this bubble?
												return false;							
											}	 
				}	
			}
		}
		
			/******Couldn't get this to work******/
		/*if(isUserLoggedInDigg){
			var refferUrl = document.URL;
			var postUrl = $('thisform').getAttribute("action");
			$('thisform').removeAttribute("action");
			$('submitbutton').onmouseup = function(){
			unsafeWindow.console.log(this.up(1));
				var formData = this.up(1).serialize();
				unsafeWindow.console.log(formData);
				unsafeWindow.console.log(refferUrl);
				ajaxForm(formData, postUrl, refferUrl);
			}
		}*/
			
	}//end of processResponse() function	

	
	/*****comments page gm_xmlhttpRequest*****/
	
	function commentsRequest(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://reddit.com/search?q='+getLink,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			},
			onload: function(responseDetails) {
			
				var data = responseDetails.responseText;
	
				if (data.indexOf("commenttable") > -1){

					processResponse(data);	
				}
								
				else { // if there are no comments
					$('ajax-loader').remove();
					new Insertion.After(getLastList, '<li id="noComments"><span>Reddit Comments (0)</span></li>');
					subNav.down(1).addClassName("dynamicLink");
					var getFirstSpan = subNav.down(2);			
					new Insertion.Top(getFirstSpan, "Digg&nbsp");			
					
				}
			},
		});
	} //end of commentsRequest() function	


	/*****forms gm_xmlhttpRequest*****/
					
	function ajaxForm(formData, postUrl){
	unsafeWindow.console.log(postUrl)
		GM_xmlhttpRequest({
				method: 'POST',
				url: postUrl,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Content-type': 'application/x-www-form-urlencoded',
				},
				data: formData,
				onload: function(responseDetails) {
					var data = responseDetails.responseText;
					if(postUrl == "'http://reddit.com/comment"){ //the regular response for posting doesn't show the whole page of comments, so do another ajax round-trip for the whole page
						commentsRequest();
					}
					else{
						processResponse(data);	
					}
				}
				
		});
	
	} //end of ajaxForm() function	
	
commentsRequest();

}// end of if(document.URL...
