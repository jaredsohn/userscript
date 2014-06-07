var dbgMode = false, log = function(){};

// ==UserScript==
// @name           Tipid EX
// @namespace      dev.r8dhex.net/tpx
// @description    TipidPC Enhanced
// @version        1.13
// @include        http://tipidpc.com/*
// @include        http://www.tipidpc.com/*
// @include        http://tipidcp.com/*
// @include        http://www.tipidcp.com/*
// @grant GM_getResourceText
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_log
// @grant GM_installScript
// @resource jquery http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @resource jqueryui http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// @resource jquerycss http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/redmond/jquery-ui.css
// @resource tipidexcss http://pastebin.com/raw.php?i=MFX2AjMW
// @resource prettycss http://google-code-prettify.googlecode.com/svn/branches/release-1-Jun-2011/src/prettify.css
// @resource prettyjs http://google-code-prettify.googlecode.com/svn/branches/release-1-Jun-2011/src/prettify.js
// @run-at         document-start
// ==/UserScript==

var $,TPX,isTamper,version = "1.12";

var defaultPrefs = {
	enableImgScale: true,
	enableIcons: false,
	enableUpdateCheck: true,
	codeTag: {
		fgColor: "#F4F4F4",
		bgColor: "#333333"
	},
	enableFancyPostTools: true,
	quickBar: {
		enable: true,
		showTopics: 2,
		showItems: 2,
		showIFS: 0,
		showWTB: 0
	}
};

// ================================================
// TPX Main Function
// ================================================
    function startTPX() {
		$ = unsafeWindow.jQuery.noConflict();

		//redisplay content
		$("body").removeClass("unready").addClass("ready");
		
		log("TPX Start");
		if (TPX !== undefined) return;
		TPX = new TPXClass();
		TPX.applyTweaks();
		log(TPX);
		
		//Enable ListView for pages that support it
		if (TPX.isPath("/itemmanager.php","/useritems.php")) {
			TPX.ListView = new ListViewClass();
			TPX.ListView.addListFilters();

		} else if (TPX.isPath("/itemsearch.php","/catalog.php")) {
			TPX.ListView = new ListViewClass("ul.catlist");
			TPX.ListView.addListFilters();

		}
		
		//Enable ForumClass for pages that support it
		if (TPX.isPath("/viewtopic.php","/viewitem.php")) {
			TPX.Forum = new ForumClass();

			TPX.Forum.addPostTools();
			TPX.Forum.hideMuted();
			TPX.Forum.addNavigation();
		}
		
		//page-specific enhancements
		if (TPX.isPath("/","/index.php")) {
			if (TPX.getPref(["tabs","frontPage","enable"])) TPX.tabifySection($("#frontlist"), "frontPage", true);
			
		} else if (TPX.isPath("/itemmanager.php")) {
			TPX.ItemMgr = new ItemManagerClass();
			if (TPX.getPref(["tabs","itemManager","enable"])) TPX.tabifySection($("#content_main > div.pad10").first(), "itemManager", true);
			
		} else if (TPX.isPath("/useritems.php")) {
			TPX.UserItem = new UserItemClass();
			if (TPX.getPref(["tabs","userItems","enable"])) TPX.UserItem.tabify();

		} else if (TPX.isPath("/itemsearch.php","/catalog.php")) {
			TPX.ItemSearch = new ItemSearchClass();
			TPX.ItemSearch.showPageDisplay();
			
			if (dbgMode && TPX.isPath("/itemsearch.php")) TPX.ItemSearch.addSaveButton();
			
		} else if (TPX.isPath("/viewitem.php")) {
			TPX.FB = new FacebookClass();
			TPX.ViewItem = new ViewItemClass();
			
		} else if (TPX.isPath("/newitem.php")) {
			TPX.NewItem = new NewItemClass();
			
		}
		
    }
		
// ================================================
// TPXClass
// ================================================
	function TPXClass() {
		this.Storage = new StorageClass();
		this.path = window.location.pathname;
		this.host = window.location.hostname.replace("www.","");
		
		this.isLoggedIn = (function(){
			//check if we have access to item manager
			var itemmanager = $('a[href^="itemmanager.php"]');
			return ( itemmanager.length > 0 );
		})();

		//check if there are unread notifications
		this.hasNotification = ($('a[href^="itemmanager.php"]').text().indexOf("(") > -1);
		this.hasMessages = ($('a[href^="messageinbox.php"]').text().indexOf("(") > -1);

		this.searchFields = {
			categories: {
				"tipidpc.com": [{"name":"Add-on Cards","id":"14"},{"name":"Cables and Adapters","id":"20"},{"name":"Casings and Power Supplies","id":"16"},{"name":"CD/DVD Readers and Writers","id":"6"},{"name":"Cooling Devices","id":"15"},{"name":"Desktops Systems","id":"18"},{"name":"Digital Media Players","id":"27"},{"name":"Digital and Web Cameras","id":"26"},{"name":"Game Consoles","id":"22"},{"name":"Game Controllers","id":"25"},{"name":"Games and Software","id":"23"},{"name":"Graphics Cards","id":"4"},{"name":"Hard Disk Drives","id":"5"},{"name":"Ink Cartridges/Toners","id":"29"},{"name":"IT Books and References","id":"30"},{"name":"Laptops and PDAs","id":"13"},{"name":"Laptops/PDAs - Accessories/Parts","id":"32"},{"name":"Media Players","id":"27"},{"name":"Memory Modules","id":"3"},{"name":"Mice and Keyboards","id":"17"},{"name":"Monitors and LCD Displays","id":"11"},{"name":"Motherboards","id":"2"},{"name":"LAN/Net Devices","id":"12"},{"name":"Multiple Items/Combos","id":"31"},{"name":"Portable Media Drives","id":"7"},{"name":"Portable Media and Storage","id":"8"},{"name":"Processors","id":"1"},{"name":"Repair - PC/Laptop","id":"33"},{"name":"Scanners and Printers","id":"28"},{"name":"Sound Cards","id":"9"},{"name":"Speakers/Headsets/Microphones","id":"10"},{"name":"Tech/IT Services","id":"24"},{"name":"UPS and AVRs","id":"19"},{"name":"Other PC Devices","id":"21"}],
				"tipidcp.com": [{"name":"Sony Ericsson","id":"1"},{"name":"Nokia","id":"2"},{"name":"Samsung","id":"3"},{"name":"Motorola","id":"4"},{"name":"Apple","id":"5"},{"name":"LG","id":"6"},{"name":"HTC","id":"7"},{"name":"O2","id":"8"},{"name":"BlackBerry","id":"24"},{"name":"Smart Phones","id":"9"},{"name":"Other Brands","id":"10"},{"name":"Chargers","id":"11"},{"name":"Case/Protections","id":"12"},{"name":"Headsets","id":"13"},{"name":"Cable & Adapters","id":"14"},{"name":"Memory Cards","id":"15"},{"name":"Software/Apps","id":"19"},{"name":"Other CP devices","id":"20"},{"name":"Repair Services","id":"21"},{"name":"Modding Services","id":"22"},{"name":"Other CP Services","id":"23"}]
			},
			condition: [{"name":"Brand New","id":"bn"}, {"name":"Already Used","id":"us"}, {"name":"Newly Replaced","id":"nr"}, {"name":"Defective","id":"df"}],
			warranty: [{"name":"Personal","id":"personal"}, {"name":"Shop","id":"shop"}, {"name":"None","id":"none"}],
			postorder: [{"name":"Post Date","id":"postdate"},{"name":"Price","id":"price"},{"name":"Item Name","id":"name"},{"name":"Item Owner","id":"owner"}]
		};
		
		// just a wrapper function to collect all the tweaks in one place
		this.applyTweaks = function() {
			if (this.getPref("enableImgScale")) this.fixImageWidth();
			this.addOptionsLink();
			this.fixPagerButtons();
			this.hideGoBtns();
			if ( this.getPref("enableAdvSearchPanel") ) this.addAdvancedSearchPanel();
			this.collapsePanels();
			this.interceptBookmark();
			this.changeBuddyLinks();
			this.addCodeButton();
			this.formatCode($(".itemdesc, .postcontent"));
			this.urlsToLinks($(".itemdesc, .postcontent"));
			this.displayUrlsOnLinks($(".itemdesc, .postcontent"));
			this.autoWrapUrls();
			this.addQuickBar();
			this.checkItemManager();
			//if ( this.getPref("enableUpdateCheck") && !isTamper) this.checkVersion();

			//add our styles
			this.addTPXStyles();
			this.removeStyle(".ui-widget-content a");
		};
		
		this.addTPXStyles = function() {
			GM_addStyle(GM_getResourceText("prettycss"));
			
			var style = GM_getResourceText("tipidexcss");
			
			//add css for PRE tags
			style += "pre { color: "+TPX.getPref(["codeTag","fgColor"])+"; background-color: "+TPX.getPref(["codeTag","bgColor"])+"; }";
		
			//add css styles for image fitting
			var bq = "", maxWidth = ($(window).width()-456);
			for (var i = 0; i<5; i++) {
				style += ".postcontent "+ bq +"img.resized, .itemdesc "+ bq +"img.resized { max-width: "+ maxWidth+"px;}";
				bq += "blockquote ";
				maxWidth = maxWidth - 20
			}
			
			//insert to page
			GM_addStyle(style);
		};
		
		this.removeStyle = function(selector) {
			for (var i=0; i<document.styleSheets.length; i++) {
				var css = document.styleSheets[i];
				try {
					for (var j=0; j<css.cssRules.length; j++) {
						var rule = css.cssRules[j];
						if (rule.selectorText == selector) css.deleteRule(j);
					} // end for-j
				} catch (e) {}
			} //end for-i
		};

		this.hideGoBtns = function() {
			var go = $("input[value='Go']").hide();
		}
		
		this.fixPagerButtons = function() {
			var el = $('.pager input[value="Prev"],.pager input[value="Next"]')
			el.wrap(function(i){
				var url = $(this).attr('onclick');
				url = url.substring(24, url.length-1);
				return $("<a href='"+url+"'>");
			});
			el.removeAttr("onclick");
		};
		
		this.fixImageWidth = function() {
			var img = $("#content_main .postcontent img, #content_main .itemdesc img").addClass("resized");
			$("#content_main").delegate(".postcontent img, .itemdesc img", "click", function(){
				$(this).toggleClass("resized");
			});
			return;
		};
		
		//set buddy links to either 1-items or 2-message
		this.changeBuddyLinks = function() {
			var buddylinkMode = TPX.getPref('buddylinkMode');
			if (buddylinkMode == 0 || buddylinkMode === undefined) return;

			var buddies = $("#buddies .prlink");
			for (var i=0; i<buddies.length; i++) {
				var bud = $(buddies[i]);

				switch(+buddylinkMode) {
					case 1:
						bud.attr("href", bud.attr("href").replace("ratings.php", "useritems.php"));
						break;
						
					case 2:
						bud.attr("onclick", bud.prev().attr("onclick"));
						bud.attr("href", "javascript:void(0)");
						break;
						
				}
			}
		};

		this.collapsePanels = function() {
			//spacer to prevent large images from squishing left-panels
			$("<div />").css("width","150px").appendTo($("#content_left"));

			var items = $("#content_left .winbody, #content_right .winbody");
			var hideList = TPX.getPref("hiddenpanels");
			if (!hideList || hideList === undefined) hideList = [];

			//Toggle a panel when its titlebar is clicked
			var togglePanel = function(){
				var panel = $(this).next();
				var panelTitle = $(this).text();
				if (panel.css("display") != "none") {
					hideList.push(panelTitle);
				} else {
					var newList = $.map(hideList, function(val, i) {
						if (val == panelTitle) return null;
						return val;
					});
					hideList = newList;
				}

				panel.slideToggle("fast", "swing");
				TPX.setPref("hiddenpanels", hideList);
			};

			//collapse the panels and attach handlers
			items.each(function(i){
				var panel = $(this);
				var panelTitle = panel.prev().text();
				if ($.inArray(panelTitle, hideList) > -1) {
					panel.hide();
				}
				
				//attach handler to each header
				panel.prev()[0].addEventListener("click", togglePanel, true);
			});
		};

		// tabifySection
		// turns a specific section containing .winbody's to tabs
		// parameters:
		//	sectionEl	reference to an element containing the items you want tabbed
		//				all .winbody elements within sectionEl will be turned into tabs
		//	prefix		a string prefixed to classnames within the tabbed area for css styling
		//  rememberLastTab 	if true, the tabset remembers its last active tab
		this.tabifySection = function(sectionEl, prefix, rememberLastTab) {
			var section = $(sectionEl).hide();
			var body = $(".winbody", section);
			
			var div = $("<div id='"+prefix+"-tabs'></div>");
			var ul = $("<ul></ul>").appendTo(div);
			
			for (var i=0; i<body.length; i++) {
				var id = prefix+"-tab-"+i;

				//grab the title
				var title = $(body[i]).prev().text();
				
				//create the tab
				var li = $("<li><a href='#"+id+"'>"+title+"</a></li>").appendTo(ul);
				$(body[i]).attr("id", id).appendTo(div);

			}
			$(div).tabs();
			
			if (rememberLastTab) {
				$(div).tabs( "select", TPX.getPref(["tabs", prefix, "active-tab"]) );
			
				// store the active tab when we leave the page
				window.addEventListener("beforeunload", function(){
					TPX.setPref(["tabs", prefix, "active-tab"], div.tabs("option","selected"));
				}, true);
			}
			
			return $("<div class='pad10'></div>").append(div).insertBefore(section);
		};
		
		//changes [code] tags to <pre>, inside specified sections (el)
		//should be fine to run this on every page
		this.formatCode = function(el) {
			var el = $(el);	if (el.length == 0) return;

			for (var i=0; i<el.length; i++) {
				var codefix = el[i].innerHTML;
				codefix = codefix.replace(/\[code\]/g,"<pre>").replace(/\[\/code\]/g,"</pre>");
				el[i].innerHTML = codefix;
			}
			
			var codeblocks = $("pre", el);
			
			//remove br's
			$("br", codeblocks).remove();
			
			//constrain the width
			codeblocks.each(function(){
				pre = $(this);
				var bq = pre.parentsUntil("#content_main", "blockquote");
				var tgtWidth = ($(window).width()-456) - (bq.length * 20) - 32;
				pre.width(tgtWidth).css("overflow-x","auto");
				pre.addClass("prettyprint");
			});
			
			//prettyPrint();
			return codeblocks;
		};
		
		this.addCodeButton = function(el) {
			var qt = $("input[value='Quote']");
			if (qt.length > 0) {
				var btn = $("<input type='button' />")
					.attr("value","Code")
					.css("float","right")
					.insertAfter(qt[0]);

				//just use the inline-style, to avoid using unsafeWindow
				btn.attr("onclick", "surroundText( '[code]', '[/code]', 'caption' )");
				
				return btn;
			}
			return null;
		};
		
		//turns unwrapped urls to links
		this.urlsToLinks = function(el) {
			var url1 = /(\b(?:https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
			var url2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
			var url3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

			var contents = $(el).contents();
			contents.each(function(){
				if (this.nodeType == 3) {
					var newContent = this.textContent;
					
					var newContent = newContent.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
					newContent = newContent.replace(url1, '<a href="$1" target="_blank">&lt;click here for link&gt;</a>');
					newContent = newContent.replace(url2, '$1<a href="http://$2" target="_blank">&lt;click here for link&gt;</a>');
					
					if ($.trim(newContent).length > 0) {
						var span = document.createElement("span");
						span.innerHTML = newContent;

						$(this).replaceWith(span);
					}
				}
			}); //end contents.each
		};
		
		//auto-wrap urls with [url] tags when submitting posts
		this.autoWrapUrls = function() {
			var ta = $("#caption");
			if (ta.length == 0) return;
			
			var re1 = /(^|[^\]])(\b(?:https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
			var re2 = /(^|[^\/\]])(www\.[\S]+(\b|$))/gim;
			var submitHandler = function(e) {
				try {
					var newPost = ta.val();
					newPost = newPost.replace(re1, '$1[url]$2[/url]');
					newPost = newPost.replace(re2, '$1[url]http://$2[/url]');
					ta.val(newPost);

				} catch(e) {}
			};
			
			if (dbgMode) { //add a button for testing
				$("<input type='button'>").val("Wrap URLs")
				.insertAfter(ta.nextUntil("input[type='submit']"))
				.click(function(event){
					submitHandler(event);
					event.preventDefault();
					return false;
				});
			} else {
				ta.parents("form").submit(submitHandler);
			}
		};
		
		//turns links to urls
		this.displayUrlsOnLinks = function(el) {
			var linkBehavior = TPX.getPref('linkBehavior');
			if (linkBehavior == 0 || linkBehavior === undefined) return; //default url behaviour, do nothing

			var el = $(el);	if (el.length == 0) return;
			var a = $(el).find("a:contains('<click here for link>')");
			
			switch (+linkBehavior) {
				case 1:		// show url always
					a.each(function() {
						$(this).text($(this).attr("href"));
					});
					break;

				case 2:		// show url on hover
					a.hover(function() {
						this.innerHTML = this.href;
					},function() {
						this.innerHTML = '&lt;click here for link&gt;';
					});
					break;

			}
		};

		//add quickbar
		this.addQuickBar = function() {
			if (!TPX.getPref(["quickBar","enable"])) return false;
			var qbar = $("<select id='quickbar'>").css("float","right").change(function() {
				window.location.href=this.value;
			});
		
			var bm = TPX.getCache();
			if (bm === undefined) bm = {};

			$('<option>Quick Access &hellip;</option>').appendTo(qbar);
			//$('<option value="/itemmanager.php">My Items and Bookmarks</option>').appendTo(qbar);

			//short function to add a group to the bar
			var addGroup = function(title, key, displayLevel) {
				var grp = bm[key];
				if ( grp !== undefined && grp.length>0 && displayLevel > 0 ) {
					var optgroup = $('<optgroup label="'+ title +'">');
					for (var i=0; i<grp.length; i++) {
						var flag = (grp[i]["flagged"]) ? "&raquo;" : "";
						if (grp[i]["flagged"] || displayLevel == 2) $('<option value="/'+ grp[i]["url"] +'">'+ flag +" "+ grp[i]["itemName"] +'</option>').appendTo(optgroup);
					}
					if (optgroup.children().length > 0) optgroup.appendTo(qbar);
			}};

			addGroup("Topic Bookmarks", "my_topic_bookmarks", TPX.getPref(["quickBar","showTopics"]));
			addGroup("Item Bookmarks", "my_item_bookmarks", TPX.getPref(["quickBar","showItems"]));
			addGroup("Items for Sale", "my_items_for_sale", TPX.getPref(["quickBar","showIFS"]));
			addGroup("Want to Buy", "my_want_to_buys", TPX.getPref(["quickBar","showWTB"]));
			
			//add saved searches
			(function(){
				var savedSearch = TPX.getPref(["savedSearch", TPX.host]);
				if (savedSearch === undefined) return;
				var optgroup = $('<optgroup label="Saved Searches">');
				for (var i=0; i<savedSearch.length; i++) {
					var params = "";
					var query = savedSearch[i].query;
					for (var k in query) {
						params += k +"="+ escape(query[k]) +"&";
					}
					$('<option value="/itemsearch.php?'+params +'">' + savedSearch[i]["name"] +'</option>').appendTo(optgroup);					
				}
				if (optgroup.children().length > 0) optgroup.appendTo(qbar);
			})();
			
			//add quick links
			var optGroup = $('<optgroup label="Quick Links">');
			if (this.isLoggedIn) optGroup.append( $('<option value="/itemmanager.php">My Items & Bookmarks</option>') );
			if (this.isLoggedIn) optGroup.append( $('<option value="/messageinbox.php">My Messages</option>') );
			
			if (this.host == "tipidpc.com") optGroup.append( $('<option value="http://tipidcp.com">Tipid CP</option>') );
			if (this.host == "tipidcp.com") optGroup.append( $('<option value="http://tipidpc.com">Tipid PC</option>') );
			optGroup.appendTo(qbar);

			$("#quickbar").remove(); //remove any pre-existing quickbars
			$("#nav").append(qbar);
		};
		
		//handles add/remove from quickbar & cache
		this.quickBarAddRemove = function(itemObj, type, doRemove) {
			var newCache=[], cache = TPX.getCache(type.key);
			if (doRemove) {
				//remove from cache
				newCache = $.map(cache, function(el, i) {
					if (el.url == type.path + "?" + type.parameter + "=" + itemObj.id) return null;
					return el;
				});
			} else {
				//add to cache
				var found = false;
				for (var i=0; i<cache.length; i++) {
					if (cache[i].url == type.path + "?" + type.parameter + "=" + itemObj.id) { found = true; break; }
				}
				if (!found) { //add to cache
					newCache = cache;
					newCache.push({	itemName: itemObj.itemName, url: type.path + "?" + type.parameter + "=" + itemObj.id, flagged: false });
				}
			}
			
			//save to cache, redisplay quickbar
			TPX.setCache(type.key, newCache);
			TPX.addQuickBar();
		};
		
		//intercepts add/remove bookmark, turns it into a XHR call, and updates the quickbar cache
		this.interceptBookmark = function() {
			var a = $("a[href^='actions/topicBookmarkAction.php'],a[href^='actions/itemBookmarkAction.php']").first();
			if (a.length == 0) return;

			//read item info
			var type = (function(){
				var url = a.attr("href");
				var items = { key: "my_item_bookmarks", parameter: "iid", path: "viewitem.php", aText: "Bookmark", rText: "Remove Bookmark" };
				var topics = { key: "my_topic_bookmarks", parameter: "tid", path: "viewtopic.php", aText: "Bookmark Topic", rText: "Remove Bookmark" };
				if (url.indexOf("itemBook") > -1) return items;
				if (url.indexOf("topicBook") > -1) return topics;
			})();
			var itemObj = {
				itemName : $("h1").first().text(),
				id : TPX.getParameter(type.parameter, a.attr("href"))
			};
			
			//attach event handler
			a[0].addEventListener("click", function(event) {
				var isBookmarked = (a.text()==type.rText) ? true : false;
				
				TPX.loadIframe( $(this).attr("href") , function() {
					//toggle the display
					a.text( isBookmarked ? type.aText : type.rText );
					TPX.quickBarAddRemove(itemObj, type, isBookmarked);
				});
				
				event.preventDefault();
				return false;
			}, true);
		};

		this.addOptionsLink = function() {
			var optLink = $("<a />").attr("href","#").text("Tipid EX Options");

			optLink[0].addEventListener("click",function(e){
			
				//open a dialog, create if necessary
				if (!TPX.Options) TPX.Options = new OptionsClass();

				TPX.Options.open();

			},true);
			
			//add to page
			var acctLink = $("#content_left a[href^='updateprofile.php']");
			if (acctLink.length > 0) {
				$("<li />").append(optLink).insertAfter(acctLink.parent());
			} else {
				optLink.appendTo("#nav");
			}
		};
		
		//add an Advanced Search Panel
		this.addAdvancedSearchPanel = function() {
			//panel
			var panel = $("<div class='window tpx_panel'>");
			var panelTitle = $("<h3 class='wintitle'>").appendTo(panel).text("Advanced Search - Tipid EX");
			var winbody = $("<div class='winbody'>").appendTo(panel);
			panel.insertAfter($(".itembrowser").first());
			
			//form
			var form = $("<form action='itemsearch.php' method='get'>").appendTo(winbody);
			var catSelect = $('<select style="width:170px;" multiple="multiple" size="10" name="cat[]"></select>');
			form.append(
				$('<select name="sec"><option value="s">Items For Sale</option><option value="b">Want To Buys</option></select>'),
				$('<input type="text" name="namekeys" placeholder="Name Keywords">'),
				$('<input type="text" name="descriptionkeys" placeholder="Description Keywords">'),
				catSelect,
				$('<select class="half" name="condition"><option value="">Any Cond\'n...</option><option value="bn">Brand New</option><option value="us">Already Used</option><option value="nr">Newly Replaced</option><option value="df">Defective</option></select>'),
				$('<select class="half" name="warranty"><option value="">Any Wrty...</option><option value="personal">Personal</option><option value="shop">Shop</option><option value="none">None</option></select>'),
				$('<input type="text" class="half" name="pricelow" placeholder="Min Price">'),
				$('<input style="margin-left:2px;" type="text" class="half" name="pricehigh" placeholder="Max Price">'),
				$('<select class="half" name="ord"><option value="postdate">Post Date</option><option value="price">Price</option><option value="name">Name</option><option value="owner">Item Owner</option></select>'),
				$('<select class="half" name="dir"><option value="desc">Descending</option><option value="asc">Ascending</option></select>'),
				$('<input type="submit" value="Search">')
			);
			
			var options = this.searchFields.categories[this.host];
			for (var i=0; i<options.length; i++) {
				$("<option value='"+options[i]["id"]+"'>"+ options[i]["name"] +"</option>").appendTo(catSelect);
			}
			
			//set the form to the current search string
			var parameters = this.getParameter();
			for (var key in parameters) {
				var inp = $(".tpx_panel [name^='"+ key +"']").first();
				if (inp.length > 0) {
					if (key == "cat") {
						var categories = parameters["cat"];
						if (!$.isArray(categories)) categories = categories.split(",");
						inp.val(categories);
					} else if ( inp.attr("type") == "text" || inp[0].tagName == "SELECT") {
						inp.val(parameters[key]);
					}
				}
			}
		};
		
	// --------------------------------
	// Utility methods
	// --------------------------------

		this.getCategoryById = function( id ) {
			var options = this.searchFields.categories[this.host];
			for (var i=0; i<options.length; i++) {
				if (id == options[i]["id"]) return options[i];
			}
			return null;
		};
		
		this.getCriteriaNameById = function( field, id ) {
			var options = this.searchFields[field];
			for (var i=0; i<options.length; i++) {
				if (id == options[i]["id"]) return options[i];
			}
			return null;
		};
	
		this.normalize = function(str) {
			return str.replace(/\s/g,"_").toLowerCase().replace(/[^0-9a-z_]/g,"");
		};
	
		//returns true if the current path is in the argument list
		this.isPath = function() {
			for (var i=0; i<arguments.length; i++) {
				if (this.path == arguments[i]) return true;
			}
			return false;
		};

		this.checkItemManager = function() {
			if ( !this.isLoggedIn ) return;

			//if there are notifications, reload items every 3mins, else 30 mins		
			var staleAge = (this.hasNotification) ? 180 : 1800;
			if ( this.getPref(["quickBar","enable"]) 
					&& this.cacheAge() > staleAge 
					&& this.path != "/itemmanager.php" ) {

				this.loadIframe("/itemmanager.php", function() {
					new ItemManagerClass( this.contentDocument );
				});
			}
		};
		
		//parse URL parameters
		this.getParameter = function( key, sParam ) {
			var retObj = {};

			if (sParam === undefined || sParam === null) sParam = window.location.search.substring(1);
			sParam = sParam.substring(sParam.indexOf("?")+1);

			var parameters = sParam.split("&");
			for (var i=0; i<parameters.length; i++) {
				if (parameters[i].length > 0) {
					var nval = parameters[i].split("=");
					//cleanup and unescape
					if (nval.length > 0 && nval[0].length > 0) {
						nval[0] = unescape(nval[0]);
					}
					if (nval.length > 1 && nval[1].length > 0) {
						nval[1] = unescape(nval[1].replace(/\+/g," "));
					}

					//take care of PHP-style array parameters
					if (nval[0].indexOf("[]") > -1) {
				
						nval[0] = nval[0].replace(/\[\]/g,"");
						if (retObj[nval[0]] === undefined) retObj[nval[0]] = [];
						retObj[nval[0]].push(nval[1]);
					
					} else {
						retObj[nval[0]] = nval[1];
					}
				}
			}
			
			if (key === null || key === undefined) return retObj;
			return retObj[key];
		}
	
		//load a url in a hidden iframe and (optionally) trigger a handler when loaded
		//	note: GM scripts won't run in the iframe because @run-at == document-start
		this.loadIframe = function(src, handler) {
			var iframe = $("<iframe src='"+ src +"' />").appendTo($("#container")).hide();
			if (handler !== undefined) iframe[0].addEventListener("load", handler, true);
			
			//add handler to remove this iframe after we're done
			iframe[0].addEventListener("load", function() {
				$(this).remove();
			}, true);
			return iframe;
		};
		
		this.checkVersion = function() {
			//see if we've checked within the last 24hrs
			var now = Math.round(+new Date()/1000);
			var lastCheck = this.Storage.getNode(["tpx_cache", "lastCheck"]);
			if (lastCheck === undefined) lastCheck = 0;
			if (now - lastCheck <= 86400) return false;
			
			//save timestamp
			this.Storage.setNode(["tpx_cache", "lastCheck"], now);
			
			//check the current version on userscripts
			GM_xmlhttpRequest({
				method: 'GET',
				url: "https://userscripts.org/scripts/source/106035.meta.js",
				onload: function(response) {
					this.version=(/\/\/\s*@version\s+(.*)\s*\n/i.exec(response.responseText))[1];
					if (this.version != version) {
						//show dialog
						var updateMessage = "There is a new version of Tipid EX: <b>v" + this.version + "</b><br />Your currently installed version is <b>v" + version + "</b>";
						var dlg = $("<div id='tpx_update' title='Tipid EX Update Notification'></div>")
							.append("<p>"+updateMessage+"</p>").insertAfter($("#footer"));
						dlg.dialog({ 
							position:"top",
							buttons: {
								"Ask me tomorrow": function(){ $(this).dialog("close"); },
								"Get update": function(){ window.open("http://userscripts.org/scripts/show/106035"); }
							}
						});
					} //end IF
				} //end onload
			});
		};
		
		
	// --------------------------------
	// Wrapper methods to Storage Class
	// --------------------------------
		this.getPref = function(keyArray) {
			var nodeList = ["tpx"];
			var nodeList2 = ["defaultPrefs"];

			if ($.isArray(keyArray)) {
				nodeList = nodeList.concat(keyArray);
				nodeList2 = nodeList2.concat(keyArray);
				
			} else if (typeof keyArray == 'string') {
				nodeList.push(keyArray);
				nodeList2.push(keyArray);

			}
			var prefVal = this.Storage.getNode(nodeList);
		
			//if undefined, try the defaults
			if (prefVal === undefined) prefVal = this.Storage.getNode(nodeList2);
			return prefVal;
		};
		
		this.setPref = function(keyArray, value) {
			var nodeList = ["tpx"];
			
			if ($.isArray(keyArray)) {
				nodeList = nodeList.concat(keyArray);
				
			} else if (typeof keyArray == 'string') {
				nodeList.push(keyArray);
				
			}
			return this.Storage.setNode(nodeList, value);
		};
		
		this.getCache = function(keyArray) {
			var nodeList = ["tpx_cache", TPX.host];

			if ($.isArray(keyArray)) {
				nodeList = nodeList.concat(keyArray);
				
			} else if (typeof keyArray == 'string') {
				nodeList.push(keyArray);
				
			}
			return this.Storage.getNode(nodeList);
		};
		
		this.setCache = function(keyArray, value) {
			var nodeList = ["tpx_cache", TPX.host];
			
			if ($.isArray(keyArray)) {
				nodeList = nodeList.concat(keyArray);
				
			} else if (typeof keyArray == 'string') {
				nodeList.push(keyArray);
				
			}

			var timestamp = Math.round(+new Date()/1000);
			this.Storage.setNode(["tpx_cache", "timestamp"], timestamp);

			return this.Storage.setNode(nodeList, value);
		}
				
		//returns age of cache in seconds
		this.cacheAge = function() {
			var now = Math.round(+new Date()/1000);
			var cacheTime = this.Storage.getNode(["tpx_cache", "timestamp"]);

			if (cacheTime === undefined) cacheTime = now;
			return now - cacheTime;
		}
		
	} // END TPXClass



// ================================================
// FacebookClass
// ================================================

	function FacebookClass() {
		var body = $('body').first();

		this.div = $('<div id="fb-root"></div>');
		this.div.prependTo(body);

		/* These don't work, why?
		var scr = document.createElement('script');
		scr.type = "text/javascript";
		scr.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=486286678154966";
		this.scr = scr;

		script.text('
			(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=486286678154966";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, "script", "facebook-jssdk"));
		');*/

		this.createShareButton = function( type ) {
			var btn_type = type || 'button';
			var share = $('<iframe src="//www.facebook.com/plugins/like.php?href='+ window.location.href +'&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=21&amp;appId=486286678154966" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>');
			var div = $('<div>');

			div.append(share);
			return div;
		};



	} // END FacebookClass
// ================================================
// StorageClass
// ================================================

	function StorageClass() {
		var configKeys = ["tpx", "tpx_cache"];
		var data = {};
		if (dbgMode) this.data = data;
		
		this.getNode = function(keys, node) {
			return getNode(keys, node);
		};
		
		this.setNode = function(keys, value, node) {
			return setNode(keys, value, node);
		};
		
		function getNode(keys, node) {
			if (node === undefined) node = data;
			if (keys === undefined) return node;
		
			if (keys.length > 1) {
				var key = keys.shift();
				return getNode(keys, node[key]);
			} else {
				return node[keys[0]];
			}
		}
		
		function setNode(keys, value, node) {
			if (node === undefined) node = data;
			if (keys === undefined) return node;
			
			if (keys.length > 1) {
				var key = keys.shift();
				//if the new node is missing, or is actually a leaf, replace it with an empty object
				if (node[key] === undefined 
					|| typeof node[key] != "object") node[key] = {};
				return setNode(keys, value, node[key]);
			} else {
				node[keys[0]] = value;
				saveData();
				return node[keys[0]];
			}
		}

		function deleteNode(keys, node) {
			if (node === undefined) node = data;
			if (keys === undefined) return node;
		
			if (keys.length > 1) {
				var key = keys.shift();
				return deleteNode(keys, node[key]);
			} else {
				var value = node[keys[0]];
				delete node[keys[0]];
				saveData();
				return value;
			}
		}
		
		function copyNode(oldKey, newKey) {
			var oldValue = getNode(oldKey);
			if (oldValue !== undefined) return setNode(newKey, oldValue);
			return oldValue;
		}
		
		function saveData() {
			for (var i=0; i<configKeys.length; i++) {
				GM_setValue(configKeys[i], JSON.stringify(data[configKeys[i]]));
			}
		}
		
		(function initialize() {
			for (var i=0; i<configKeys.length; i++) {
				try {
					data[configKeys[i]] = JSON.parse(GM_getValue(configKeys[i], "{}"));
				} catch(e) {
					data[configKeys[i]] = {};
				}
			}
			data.defaultPrefs = defaultPrefs;
			
			//set data to save every 5 secs, this will take care of GM sandbox limitations hopefully
			window.setInterval(function() { GM_log("10sec");saveData(); }, 10000);
			window.addEventListener("beforeunload", function() { GM_log("unload");saveData(); }, true);
			
			//move nodes to better positions (moved in v1.8.3)
			copyNode(["tpx","enableFrontPageTabs"],["tpx","tabs","frontPage","enable"]);
			copyNode(["tpx","enableItemMgrTabs"],["tpx","tabs","itemManager","enable"]);
			copyNode(["tpx","enableUserItemTabs"],["tpx","tabs","userItems","enable"]);
			copyNode(["tpx","front-activeTab"],["tpx","tabs","frontPage","active-tab"]);
			copyNode(["tpx","itemmgr-activeTab"],["tpx","tabs","itemManager","active-tab"]);
			copyNode(["tpx","enableQuickBar"],["tpx","quickBar","enable"]);
			copyNode(["tpx","quick_topics"],["tpx","quickBar","showTopics"]);
			copyNode(["tpx","quick_items"],["tpx","quickBar","showItems"]);
			copyNode(["tpx","quick_ifs"],["tpx","quickBar","showIFS"]);
			copyNode(["tpx","quick_wtb"],["tpx","quickBar","showWTB"]);
			copyNode(["tpx","codeFGcolor"],["tpx","codeTag","fgColor"]);
			copyNode(["tpx","codeBGcolor"],["tpx","codeTag","bgColor"]);

			deleteNode(["tpx","enableFrontPageTabs"]);
			deleteNode(["tpx","enableItemMgrTabs"]);
			deleteNode(["tpx","enableUserItemTabs"]);
			deleteNode(["tpx","front-activeTab"]);
			deleteNode(["tpx","itemmgr-activeTab"]);
			deleteNode(["tpx","enableQuickBar"]);
			deleteNode(["tpx","quick_topics"]);
			deleteNode(["tpx","quick_items"]);
			deleteNode(["tpx","quick_ifs"]);
			deleteNode(["tpx","quick_wtb"]);
			deleteNode(["tpx","codeFGcolor"]);
			deleteNode(["tpx","codeBGcolor"]);
			
		})();
		
	} // END StorageClass

	
// ================================================
// OptionsClass
// ================================================
	
	function OptionsClass() {
		this.dialogDiv;

		this.open = function() {
		
			if (!this.dialogDiv) this.dialogDiv = initialize();

			this.dialogDiv.dialog("open");
			$("form", this.dialogDiv).accordion( "resize" ).accordion( "activate", 0 );
			updateToForm();
		};
	
		function initialize() {
			var dialogDiv = createOptionsForm();
			$(dialogDiv).dialog({
				modal:true,
				width:400, height:500,
				buttons: {
					"Close": function(){
						//this only triggers if the close button was pushed, 
						//and there was an actual change to the form
						$("form", this).change(); 
						$(this).dialog("close");
					}
				},
				resize: function() {
					$("form", this).accordion( "resize" );
				}
			});
			
			//add event listener to monitor the form for changes
			$("form", dialogDiv)[0].addEventListener("change", updateFromForm, true);

			//add handler for the prefstring_apply button
			$("#prefstring_apply", dialogDiv)[0].addEventListener("click", applyPrefstring, true);
			
			return dialogDiv;
		}

		//event-handler to update form values from stored prefs
		var updateToForm = function(event) {

			var opts = $("input,select,textarea", TPX.Options.dialogDiv);
			for (var i=0 ; i<opts.length ; i++) {

				inp = $(opts[i]);
				var prefVal = TPX.getPref( opts[i].id.split("_") );

				if ( inp.attr("type") == "checkbox" ) {
					inp.attr("checked", prefVal);
					
				} else if ( inp.attr("type") == "text" || opts[i].tagName == "SELECT") {
					inp.val( prefVal );
					
				} else if ( opts[i].id == "prefstring" ) {
					inp.val( JSON.stringify(TPX.getPref(), null, 2) );
				
				} //endif
				
				if (inp.attr("id") == "quickBar_enable") {
					var qs = $("#quickBar_showTopics, #quickBar_showItems, #quickBar_showIFS, #quickBar_showWTB", TPX.Options.dialogDiv).parentsUntil(TPX.Options.dialogDiv, ".tpx_option");
					if (inp.is(':checked')) { qs.show(); } else { qs.hide(); }
				}
			}
		};
		
		//event-handler to store form-changes on the form into prefs
		var updateFromForm = function(event) {

			var opts = $("input,select,textarea", TPX.Options.dialogDiv);
			for (var i=0 ; i<opts.length ; i++) {
				inp = $(opts[i]);
				
				if ( inp.attr("type") == "checkbox" ) {
					TPX.setPref(opts[i].id.split("_"), inp.is(':checked'));
					
				} else if ( inp.attr("type") == "text" || opts[i].tagName == "SELECT") {
					TPX.setPref(opts[i].id.split("_"), inp.val());
					
				} //endif
			}
			
			//apply immediately unless prefstring was updated
			if ( event.target.id != "prefstring" ) updateToForm();
		};
		
		//apply the pasted prefstring
		var applyPrefstring = function(event){
			var inp = $("#prefstring", TPX.Options.dialogDiv);
			var currprefs = JSON.stringify(TPX.getPref());
			var prefstring = $.trim(inp.val());
			
			if (prefstring != currprefs && prefstring.length > 0) {
				try {
					TPX.setPref([], JSON.parse(prefstring));
				} catch(err) {
					inp.val(currprefs);
				}
				updateToForm();
			}
			event.preventDefault();
			return false;
		};
		
		//function to generate a select box
		var selectBox = function(id, label, opts) {
			var div = $("<div class='tpx_option'>");
			var lbl = $("<label>"+ label +"</label>").appendTo(div);
			var select = $("<select>").attr("id", id).css("float","right").prependTo(lbl);

			for (var i=0; i<opts.length; i++) {
				select.append($("<option>").text(opts[i].text).attr("value",opts[i].value));
			}
			return div;
		};

		//function to generate a checkbox
		var checkBox = function(id, label) {
			var div = $("<div class='tpx_option'>");
			var checkbox = $("<input type='checkbox' />").attr("id", id);

			$("<label></label>").text(label)
				.prepend(checkbox)
				.appendTo(div);

			return div;
		};

		//function to generate a textbox
		var inputBox = function(id, label) {
			var div = $("<div class='tpx_option'>");
			$("<label>"+label+"</label>").append(
				$("<input type='text'>").attr("id", id).css("float","right")
			).appendTo(div);
			return div;
		};
		
		function createOptionsForm() {
		
			//generate the HTML
			var dialogDiv = $("<div />").hide()
				.attr("id","tpx_options")
				.attr("title","Tipid EX Options")
				.css("overflow-y", "hidden");

			var optForm = $("<form/>").appendTo(dialogDiv);
			$("<h3><a href='#'>Interface Options</a></h3>").appendTo(optForm);

			var optionsDiv = $("<div />").appendTo(optForm);
			$('<p>Changes are saved immediately, and applied on next page load.</p>').appendTo(optionsDiv);

			//Checkboxes for features
			optionsDiv.append( checkBox("tabs_frontPage_enable", "Display Front Page in tabs") );
			optionsDiv.append( checkBox("tabs_itemManager_enable", "Display Item Manager in tabs") );
			optionsDiv.append( checkBox("tabs_userItems_enable", "Display User Items in tabs") );
			optionsDiv.append( checkBox("enableImgScale", "Fit images to column width") );
			optionsDiv.append( checkBox("enableIcons", "Use icons for post tools (mute,unmute,edit)") );
			optionsDiv.append( checkBox("enablePostNumbering", "Display numbering for forum posts (1-30)") );
			optionsDiv.append( checkBox("enableAdvSearchPanel", "Show 'Advanced Search' as a sidepanel") );
		
			//quickbar
			var qbOpts = [
				{ text: "Don't show", value: "0"},
				{ text: "Show only new", value: "1"},
				{ text: "Show all", value: "2"},
			];
			optionsDiv.append( checkBox("quickBar_enable", "Enable Quick Access Bar") );
			optionsDiv.append( selectBox("quickBar_showTopics", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Topic Bookmarks", qbOpts) );
			optionsDiv.append( selectBox("quickBar_showItems", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item Bookmarks", qbOpts) );
			optionsDiv.append( selectBox("quickBar_showIFS", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Items for Sale", qbOpts) );
			optionsDiv.append( selectBox("quickBar_showWTB", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Want to Buy", qbOpts) );
			
			//link behavior
			optionsDiv.append( selectBox("linkBehavior", "Display URLs on links", [
				{ text: "Never", value: "0"},
				{ text: "Always show", value: "1"},
				{ text: "Show on hover", value: "2"}
			]));
			
			//buddy list behavior
			optionsDiv.append( selectBox("buddylinkMode", "Buddy Names link to this page", [
				{ text: "User Ratings", value: "0"},
				{ text: "User Items", value: "1"},
				{ text: "Send Message", value: "2"}
			]));
			
			//forum navbar
			optionsDiv.append( selectBox("enableForumNav", "Enable forum post navigation buttons", [
				{ text: "Disable", value: "0"},
				{ text: "Top Left", value: "1"},
				{ text: "Top Right", value: "2"},
				{ text: "Bottom Left", value: "3"},
				{ text: "Bottom Right", value: "4"}
			]));
			
				
			//code tag colors
			optionsDiv.append( inputBox("codeTag_fgColor", "[code] text color") );
			optionsDiv.append( inputBox("codeTag_bgColor", "[code] background") );
			
			//auto update
			optionsDiv.append( checkBox("enableUpdateCheck", "Automatically check for userscript updates") );
			
			$('<p align="right"><a href="http://tipidpc.com/viewtopic.php?tid=255336">Feedback Thread</a></p>').appendTo(optionsDiv);

			//Preferences string display
			$("<h3><a href='#'>Preference String</a></h3>").appendTo(optForm);
			var prefString = $("<div />").appendTo(optForm);
			prefString.append(
				$('<p>To transfer settings from another browser: <br/> Copy the Preference string from another browser, then paste it below, then click "Apply"</p>'),
				$('<textarea id="prefstring" rows="16" />').css("width","96%").focus(function(){ this.select(); }),
				$('<button id="prefstring_apply">Apply</button>')
			);
			
			optForm.accordion({ fillSpace:true });
			return dialogDiv;
		};

	} // END OptionsClass

// ================================================
// ListViewClass
// ================================================

	function ListViewClass(listSelector, doc) {
		this.tables = {};
		this.listSelector = listSelector || "#content_main table.itemlist";
		this.document = (doc !== undefined) ? doc: document;

		//read the table data before anything else
		function readTables(listSelector, doc) {
			var list = $(listSelector, doc);
			var data = {};
			for (var i=0; i<list.length; i++) {
				var tbl = $(list[i]);
				var title = tbl.parentsUntil(".pad10").find(".wintitle");
				var tableId = TPX.normalize(title.text());
				list.attr("tableId", tableId);
				data[ tableId ] = {
					element: tbl,
					title: title.text()
				};
				
				if (tbl.is(".itemlist")) {
					var rows = $("tr",tbl);
					data[ tableId ].type = "simple";
					data[ tableId ].data = readSimpleTable(rows);
					
				} else if (tbl.is("ul.catlist")) {
					var rows = $("li",tbl);
					data[ tableId ].type = "search";
					data[ tableId ].data = readSearchResult(rows);
				}
			}
			return data;
		};

		
		//read the structure for lists like itemmanager and userlist
		function readSimpleTable(rows) {
			var data = [];
			//read the data
			data = $.map(rows, function(el, i) {
				var item = $("a",el);
				var itemPrice = $("td", el).last().text();
				itemPrice = itemPrice.replace(/[^0-9\.]/g, "");
				var url = item.attr('href');
				var isFlagged = $(el).hasClass("flagged");
				var id = TPX.getParameter("tid", url) ? TPX.getParameter("tid", url) : TPX.getParameter("iid", url);

				return { 
					index: i, 
					id: id, 
					itemName: item.text(), 
					url: url, 
					price: itemPrice, 
					flagged: isFlagged,
					el: el 
				};
			});
			
			return data;
		};
		
		//read search result format
		function readSearchResult(rows) {
			var data = [];
			//read the data
			data = $.map(rows, function(el, i) {
				var item = $("table a",el).first();
				var itemPrice = $("table td", el).last().text();
				var url = item.attr('href');
				var id = TPX.getParameter("tid", url) ? TPX.getParameter("tid", url) : TPX.getParameter("iid", url);
				var user = $("a[href^='ratings.php']", el).text();
					
				var textNodes = $(el).contents().map(function(i,el){
					if (el.nodeType == 3) return el;
				});																			
				var postdateRE = /on (.*([AP]M))/;
				var postDate = postdateRE.exec(textNodes.text())[1];
				var isPremium = ($(".green", el).length > 0);

				itemPrice = itemPrice.replace(/[^0-9\.]/g, "");

				var ret = { 
					index: i, 
					id: id, 
					itemName: item.text(), 
					url: url, 
					price: itemPrice, 
					user: user,
					postdate: postDate,
					timestamp: new Date(postDate),
					isPremium: isPremium,
					el: el
				};
				
				return ret;
			});
			
			return data;
		};
		
		//read the table data before anything else
		this.tables = readTables(this.listSelector, this.doc);
		
		this.reload = function() {
			var newTable = readTables(this.listSelector, this.doc);
			log(newTable);
			for (var tableId in this.tables) {
				var processed = newTable[tableId].data;
				
				if (this.tables[tableId].currentSort !== undefined) {
					var sorting = this.tables[tableId].currentSort;
					newTable[tableId].currentSort = sorting;
					newTable[tableId].data = this.sortData(newTable[tableId].data, sorting[0], sorting[1]);
				}
				
				if (this.tables[tableId].currentFilter !== undefined) {
					newTable[tableId].currentFilter = this.tables[tableId].currentFilter;
					processed = this.filterData(newTable[tableId].data, this.tables[tableId].currentFilter);
				}
				
				this.rebuildTable(tableId, processed);
			}
			this.tables = newTable;			
			return this.tables;
		}

		this.sortData = function(arrayData, sortOn, dir) {
			//sorting functions
			var sortFunc = {
				price: function(a,b) { return a.price-b.price; },
				timestamp: function(a,b) { return a.timestamp.getTime() - b.timestamp.getTime(); },
				itemName: function(a,b) { 
					var itemA = a.itemName.toUpperCase();
					var itemB = b.itemName.toUpperCase();
					return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;
				},
				user: function(a,b) { 
					var userA = a.user.toUpperCase();
					var userB = b.user.toUpperCase();
					return (userA < userB) ? -1 : (userA > userB) ? 1 : 0;
				}
			};
			
			//sort the data
			var sorted = arrayData.sort( sortFunc[sortOn] );
			if (dir.toUpperCase() == 'DESC') sorted.reverse();

			return sorted;
		};
		
		this.filterData = function(arrayData, filterString) {
			//process incoming filters
			var filters = $.map($.trim(filterString).toLowerCase().split(" "), function(item,i){
				var filter = $.trim(item);
				if (filter.length == 0) return null;
				return filter;
			});

			//map matched items to filtered
			var filtered = $.map(arrayData, function(item, i) {
				var matchstring = item.itemName.toLowerCase();
				if (item.user !== undefined) matchstring += " " + item.user.toLowerCase();
				//if (item.isPremium) matchstring += " premium member";
				var isMatch = true;
				
				for (var i=0;i<filters.length; i++) {
					if (filters[i].length >= 2) {
						var prefix = filters[i].substr(0,1);
						switch(prefix) {
							case "<":
								isMatch = (filters[i].substr(1)-item.price >= 0  && isMatch); 
								break;
							
							case ">":
								isMatch = (filters[i].substr(1)-item.price < 0  && isMatch);
								break;
							
							case "-":
								isMatch = (matchstring.indexOf(filters[i].substr(1)) == -1 && isMatch);
								break;
							
							default:
								isMatch = (matchstring.indexOf(filters[i]) > -1 && isMatch);
								break;
						}
					}
				}
				item.hidden = !isMatch;
				return item;
			});
			
			return filtered;
		};
		
		this.rebuildTable = function(tableId, tableData) {
			var needSort = this.tables[ tableId ].sortUpdate;
			var table = this.tables[ tableId ].element;
			if (tableData === undefined) tableData = this.tables[ tableId ].data;
			
			var displayed=0;
			for (var i=0; i<tableData.length; i++) {
				var el = tableData[i].el;
				if (needSort) table[0].appendChild(el);
				
				if (tableData[i].hidden) {
					el.style.display="none";
				} else {
					displayed++;
					el.style.display="";
					if (this.tables[ tableId ].type == "simple") {
						el.className = (displayed%2 == 0) ? "odd":"even";
					}
				}
			}
			
			//update result display
			$("#tpx_matches__"+tableId).text(" Matched " + displayed + " of "+ tableData.length +" items ");

			//reset flags
			this.tables[ tableId ].sortUpdate = false;
			this.tables[ tableId ].filterUpdate = false;
			
			return table;
		};
		
		//event handler to process the sort/filter inputs
		var changeTable = function(event) {
			var ListViewObj = event.data.tpx;
			var tableId = event.data.id;
			var newTable = ListViewObj.tables[tableId].data;

			var filter = $("input", $(this).parent());
			var sorter = $("select", $(this).parent());
			
			var hasChanged = false;

			//re-sort and store it
			if (this.tagName == "SELECT") {
				var sortOrder = sorter.val().split(",");
				ListViewObj.tables[tableId].currentSort = sortOrder;
				newTable = ListViewObj.sortData(newTable, sortOrder[0], sortOrder[1]);
				ListViewObj.tables[tableId].sortUpdate = true;
			}
			
			//filter the sorted array
			var filterVal = $.trim(filter.val());
			ListViewObj.tables[tableId].currentFilter = filterVal;
			if (filterVal.length == 0 || filterVal.length >= 2) {
				ListViewObj.tables[tableId].filterUpdate = true;
				newTable = ListViewObj.filterData( newTable, filterVal );
			}
			
			ListViewObj.tables[tableId].data = newTable;
		};

		this.addListFilters = function() {
			for (var tableId in this.tables) {
				var table = this.tables[ tableId ].element;
				var div = $("<div>").addClass("tpx_list_tools").insertBefore(table);
				
				//add filter inputbox
				var filter = $("<input type='text' placeholder='Filter on keywords'>")
					.css("width", "40%")
					.appendTo(div)
					.keyup({ tpx:this, id: tableId }, changeTable);
				var filterResult = $("<span id='tpx_matches__"+tableId+"'>").insertAfter(filter);
				filterResult.text(" Matched " + this.tables[ tableId ].data.length + " of "+ this.tables[ tableId ].data.length +" items ");
				
				//list sorter select
				var sortBy = $("<select width='130'>")
					.appendTo(div)
					.css("float","right")
					.change({ tpx:this, id:tableId }, changeTable);
				$( "<option value='itemName,asc'>Name, Ascending</option>" ).appendTo(sortBy);
				$( "<option value='itemName,desc'>Name, Descending</option>" ).appendTo(sortBy);
				
				//additional sort options
				if (this.tables[tableId]["data"][0].price !== undefined) {
					$( "<option value='price,asc'>Price, Ascending</option>" ).appendTo(sortBy);
					$( "<option value='price,desc'>Price, Descending</option>" ).appendTo(sortBy);
				}
				if (this.tables[tableId]["data"][0].timestamp !== undefined) {
					$( "<option value='timestamp,asc'>Post Date, Ascending</option>" ).appendTo(sortBy);
					$( "<option value='timestamp,desc'>Post Date, Descending</option>" ).appendTo(sortBy);
				}
				if (this.tables[tableId]["data"][0].user !== undefined) {
					$( "<option value='user,asc'>Username, Ascending</option>" ).appendTo(sortBy);
					$( "<option value='user,desc'>Username, Descending</option>" ).appendTo(sortBy);
				}
			}
			
			//set rebuild every half-sec, if changed
			var List = this;
			window.setInterval(function(){
				//check each table for updates
				for (var tableId in List.tables) {
					if (List.tables[tableId].sortUpdate || List.tables[tableId].filterUpdate) List.rebuildTable(tableId);
				}
			},500);
		};
		
	}; // END ListViewClass

// ================================================
// ForumClass
// ================================================

	function ForumClass() {
		this.posts = $(".posts li");
		this.url = getTopicUrl();
		this.page = TPX.getParameter("page", this.url);
		this.totalPages = getTotalPages();

		if (TPX.isPath("/viewitem.php")) {
			this.idParam = "iid";
			this.id = TPX.getParameter("iid");
		} else if (TPX.isPath("/viewtopic.php")) {
			this.idParam = "tid";
			this.id = TPX.getParameter("tid");
		}

		//read this domain's 
		var mutelist = TPX.getPref(["mutelist", TPX.host]);
		if (mutelist === undefined) mutelist = TPX.setPref(["mutelist", TPX.host], []);

		//gets the full url of the current topic page, including the page number
		function getTopicUrl(){
			var el = $(".pager td[align='right'] option[selected]");
			if (el && el[0]) {
				return el[0].value;
			} else {
				return null;
			}
		};
		
		function getTotalPages() {
			var el = $(".pager:first td[align='right'] option");
			return el.length;
		}
		
		this.getPermalink = function(post) {
			var id = post.attr("id");
			if (!id) return $("");
			
			var a = $("<a />")
				.addClass("permalink")
				.text("Permalink")
				.attr("href", this.url + "#" + id);
				
				if (TPX.getPref("enableIcons")) {
					a.button({
						text: !TPX.getPref("enableIcons"),
						icons: { primary: 'ui-icon-link'}
					});
				}

			return a;
		}
		
		this.getMuteLink = function(post) {
			var post = $(post);
			var postmeta = $(post.children(".postmeta")[0]);
			var user = postmeta.children("a").first().text();
			var tpx_forum = this;
			var mutelink = $("<a />")
				.addClass("mute")
				.attr("href", "#"+post.attr("id"));

			if (TPX.getPref("enableIcons")) mutelink.button();
			
			//assign click handler
			mutelink[0].addEventListener("click", function(event) {
				if ( $.inArray(user, mutelist) == -1) {
					tpx_forum.muteUser(user);
				} else {
					tpx_forum.unmuteUser(user);
				}
				tpx_forum.hideMuted();
				event.preventDefault();
				return false;
			}, true);

			return mutelink;
		}
		
		this.muteUser = function(user) {
			if ( $.inArray(user, mutelist) == -1) {
				mutelist.push(user);
				TPX.setPref(["mutelist", TPX.host], mutelist);
			}
		};
		
		this.unmuteUser = function(user) {
			var newlist = [];
			for (var i = 0; i<mutelist.length; i++) {
				if (mutelist[i] != "" && mutelist[i] != user) newlist.push(mutelist[i]);
			}
			mutelist = newlist;
			TPX.setPref(["mutelist", TPX.host], mutelist);
		};

		
		this.hideMuted = function() {
			var posts = $(".posts li");
			for (var i=0; i < posts.length; i++) {
				var post = $(posts[i]);
				var user = post.find(".postmeta a").first().text();

				if ( $.inArray(user, mutelist) >= 0) {
					post.children(".postcontent").hide();
					var mutelink = post.find(".mute");
					if (TPX.getPref("enableIcons")) {
						mutelink.button("option", "label", "Unmute");
						mutelink.button("option", "icons", { primary: 'ui-icon-volume-off'});
						mutelink.button("option", "text", !TPX.getPref("enableIcons"));
					} else {
						mutelink.text("Unmute");
					}

					
				} else {
					post.children(".postcontent").show();
					var mutelink = post.find(".mute");
					if (TPX.getPref("enableIcons")) {
						mutelink.button("option", "label", "Mute");
						mutelink.button("option", "icons", { primary: 'ui-icon-volume-on'});
						mutelink.button("option", "text", !TPX.getPref("enableIcons"));
					} else {
						mutelink.text("Mute");
					}
				}
			}
		}
		
		this.addPostTools = function() {
			if (TPX.getPref("enableIcons")) this.posts.parent().addClass("tpx_posttool_icons");
			for (var i=0; i < this.posts.length; i++) {
				var post = $(this.posts[i]);
				var postmeta = $(post.children(".postmeta")[0]);
				var posttools = post.children(".posttools");
				
				//add posttools div if required
				if (posttools.length == 0) {
					posttools = $("<p>").addClass('posttools').appendTo(post);
				} else {
					posttools = $(posttools[0]);
				}
				
				//change EDIT to an icon
				var edit = posttools.find("a[href^='editpost.php']").prependTo(posttools);
				if (TPX.getPref("enableIcons")) {
					edit.button({
						label: "Edit",
						text: !TPX.getPref("enableIcons"),
						icons: { primary: 'ui-icon-pencil'}
					});
				}
				
				//create permalink
				if (!TPX.getPref("enableIcons")) $("<span>&nbsp;</span>").prependTo(posttools);
				this.getPermalink(post).prependTo(posttools);
				
				//mute/unmute
				if (!TPX.getPref("enableIcons")) $("<span>&nbsp;</span>").prependTo(posttools);
				this.getMuteLink(post).prependTo(posttools);

				//move to top of post
				posttools.appendTo(postmeta).css("float","right");
				
				//add numbering
				if ( TPX.getPref("enablePostNumbering") ) {
					//var num = (this.page * 30 + 1) + i;
					var num = i+1;
					$("<span>"+ num +"</span>")
						.css("font-weight","bold")
						.prependTo(postmeta);
				}
			}
		} // end addPostTools
		
		//add a navigation toolbar when inside a forum topic
		this.addNavigation = function() {
			var navpos = TPX.getPref("enableForumNav");
			if (navpos === undefined || navpos == 0) return false;
			
			var url = TPX.path + "?" + this.idParam + "=" + this.id;
			var prevUrl = $(".pager:first td[align='right'] a:first").attr("href");
			var nextUrl = $(".pager:first td[align='right'] a:last").attr("href");

			var positionClass = ["hidden", "top left", "top right", "bottom left", "bottom right"];
			var navDiv = $("<div id='tpx_forum_nav'>")
				.addClass(positionClass[navpos])
				.appendTo($("#container"));

			//scroll to the correct post
			var scrollToPost = function(event) {
				var posts = event.data.posts;
				var dir = event.data.dir;
				
				var currentPos = Math.floor($(window).scrollTop());
				var postIdx = 0;
				
				if (dir == "top") {
					postIdx = 0;
				} else if (dir == "end") {
					postIdx = posts.length-1;
				} else {
					for (var i=0; i<posts.length; i++) {
						var postPos = Math.floor($(posts[i]).offset().top);
						if (currentPos < postPos) {
							postIdx = (dir=="+") ? i : i-1;
							break;
						} else if (currentPos == postPos) {
							postIdx = (dir=="+") ? i+1 : i-1;
							break;
						}
					}
				}
				if (postIdx < 0) postIdx = 0;
				if (postIdx >= posts.length) postIdx = posts.length-1;

				$(posts[postIdx]).effect("highlight");
				$(window).scrollTop( $(posts[postIdx]).offset().top );
				
				return false;
			};

			//add the buttons and attach event handlers
			navDiv.append($("<div>").append(
				$('<a class="fpage" href="'+ url+"&page=1" +'">First Page</a>'),
				$('<a class="prevpage" href="'+ prevUrl +'">Prev Page</a>'),
				$('<a class="nextpage" href="'+ nextUrl +'">Next Page</a>'),
				$('<a class="lpage" href="'+ url +'">Last Page</a>')
			));

			navDiv.append($("<div>").append(
				$('<button class="toppost">First Post</button>'),
				$('<button class="prevpost">Prev Post</button>'),
				$('<button class="nextpost">Next Post</button>'),
				$('<button class="lastpost">Last Post</button>')
			));
			
			/* Single Line
			navDiv.append($("<div>").append(
				$('<a class="fpage" href="'+ url+"&page=1" +'">First Page</a>'),
				$('<a class="prevpage" href="'+ prevUrl +'">Prev Page</a>'),
				$('<button class="toppost">First Post</button>'),
				$('<button class="prevpost">Prev Post</button>'),
				$('<button class="nextpost">Next Post</button>'),
				$('<button class="lastpost">Last Post</button>'),
				$('<a class="nextpage" href="'+ nextUrl +'">Next Page</a>'),
				$('<a class="lpage" href="'+ url +'">Last Page</a>')
			));*/
			
			//convert into jQuery buttons
			$( ".fpage",navDiv ).button({ text: false, icons: { primary: "ui-icon-seek-first" }});
			$( ".lpage",navDiv ).button({ text: false, icons: { primary: "ui-icon-seek-end" }});
			$( ".prevpage",navDiv ).button({ text: false, icons: { primary: "ui-icon-seek-prev" }});
			$( ".nextpage",navDiv ).button({ text: false, icons: { primary: "ui-icon-seek-next" }});
			
			$( ".toppost",navDiv ).button({ text: false, icons: { primary: "ui-icon-arrowthickstop-1-n" }}).click({ posts: this.posts, dir: "top" }, scrollToPost);
			$( ".lastpost",navDiv ).button({ text: false, icons: { primary: "ui-icon-arrowthickstop-1-s" }}).click({ posts: this.posts, dir: "end" }, scrollToPost);
			$( ".prevpost",navDiv ).button({ text: false, icons: { primary: "ui-icon-triangle-1-n" }}).click({ posts: this.posts, dir: "-" }, scrollToPost);
			$( ".nextpost",navDiv ).button({ text: false, icons: { primary: "ui-icon-triangle-1-s" }}).click({ posts: this.posts, dir: "+" }, scrollToPost);
			
			//disable page buttons if we're at the ends
			if (this.page == 1) $( ".fpage, .prevpage", navDiv ).button("disable");
			if (this.page == this.totalPages) $( ".lpage, .nextpage", navDiv ).button("disable");
			
			return navDiv;			
		};
	} // END ForumClass
	
// ================================================
// NewItemClass
// ================================================
	
	function NewItemClass() {
		var name = window.name;
		this.cloneId = cloneId();

		function cloneId() {
			//if startsWith "clone" get the id
			if (window.name.substring(0,5) == "clone") {
				return (window.name.substr(6));
			}
			return null;
		}
		
		this.cloneItem = function() {
			if (this.cloneId != null) {
			
				//add progress message, hide extra content, disable form
				var newItemForm = $("#content_main form");
				newItemForm.prevAll().hide();
				newItemForm.find("input,select,textarea").attr("disabled","disabled");

				var progress = $("<p />")
					.insertBefore(newItemForm)
					.css("fontSize", "14px")
					.css("textAlign", "center")
					.text("Loading Item Data ...");

				//create an iframe and open the edititem page
				TPX.loadIframe("edititem.php?iid="+this.cloneId, function(){
					var form = $(this).contents().find("#postitemform");
					values = form.serializeArray();
					if (values.length > 0) {
						//reformat the JSON for convenience
						var item = {};
						for (var i=0; i<values.length; i++) {
							item[values[i].name] = values[i].value;
						}

						//punch it into the form
						$("select[name='sec']>option[value='"+ item.sec +"']").attr("selected","selected");
						$("input[name='name']").attr("value", item.name);
						$("select[name='cat']>option[value='"+ item.cat +"']").attr("selected","selected");
						$("input[name='pricebudget']").attr("value", item.pricebudget);
						$("select[name='con']>option[value='"+ item.con +"']").attr("selected","selected");
						$("select[name='warranty']>option[value='"+ item.warranty +"']").attr("selected","selected");
						$("select[name='postspan']>option[value='"+ item.postspan +"']").attr("selected","selected");
						$("textarea[name='caption']").text(item.caption);
						progress.text(progress.text() + " Done!");
						newItemForm.find("input,select,textarea").removeAttr("disabled");
					} else {
						progress.text("Cannot load item data");
					}
				
					//reset window name, so we don't trigger this again on refresh
					window.name = null;
				});
			}; 
		}
		
		this.cloneItem();
	} // END NewItemClass
	
// ================================================
// ViewItemClass
// ================================================
	
	function ViewItemClass() {
		this.id = TPX.getParameter("iid");
		this.canEdit = (function(){
			var edit = $('a[href^="edititem.php"]');
			return (edit.length > 0);
		})();
		
		if (this.canEdit) {
			var edit = $('a[href^="edititem.php"]');
			var clone = $("<a />")
				.attr("href", "newitem.php")
				.attr("target", "clone_"+this.id)
				.text("Clone Item")
				.insertAfter(edit);
			$("<span>&nbsp;</span>").insertAfter(edit);
		}
		
		var share_btn = TPX.FB.createShareButton('button_count');
		$('.winbody .itemmeta').append(share_btn);
		
	}; // END ViewItemClass

// ================================================
// ItemManagerClass
// ================================================

	//supply a document context if this is being used within an iframe
	//remember to give a context when using jquery selectors
	function ItemManagerClass( doc ) {
		if (doc === undefined) doc = document;

		//read the items into the cache
		this.readItems = function(selector, cacheKey) {
			var item = $(selector, doc);
			var cache = [];
			
			item.each(function(){
				var i = $(this);
				var isFlagged = (i.parentsUntil("#content_main", "tr.flagged").length > 0);
				cache.push({
					itemName:	$.trim(i.text()),
					url:	i.attr("href"),
					flagged:	isFlagged
				});
			});
			TPX.setCache(cacheKey, cache);
		};
		
		this.cacheLists = function() {
			this.readItems("#itemifslist a[href^='viewitem.php']", "my_items_for_sale");
			this.readItems("#itemwtblist a[href^='viewitem.php']", "my_want_to_buys");
			this.readItems("#bookmarkdeletelist a[href^='viewitem.php']", "my_item_bookmarks");
			this.readItems("#topicbookmarkdeletelist a[href^='viewtopic.php']", "my_topic_bookmarks");
		};

		this.cacheLists();
		TPX.addQuickBar(); //force a refresh of the qbar
		
	}; // END ItemManagerClass

// ================================================
// UserItemClass
// ================================================
	
	function UserItemClass() {
		this.user = TPX.getParameter("username");
		document.title = TPX.host + " | " +this.user;
		
		this.tabify = function() {
			var useritems = $("#content_main > div.pad10").first();
			var newpad10 = $("<div class='pad10' />")
				.insertBefore(useritems)
				.append( $("div.window", useritems).first() );
				
			TPX.tabifySection(useritems, "userItems");
			this.addItemCount();
		};
		
		//add item counts to the tabs
		this.addItemCount = function() {
			if (!TPX.ListView) return;

			var tabs = $("a[href^='#userItems-tab']", ".ui-tabs-nav");
			for (var i=0; i<tabs.length; i++) {
				var tab = $(tabs[i]);
				var itemCount = 0;
				var tableId = TPX.normalize(tab.text());
				var table = TPX.ListView.tables[ tableId ];
				if (table !== undefined) itemCount = table.data.length;

				tab.text( "[" + itemCount + "] " + tab.text() );
			}
		};

	}; // END UserItemClass

// ================================================
// ItemSearchClass
// ================================================

	function ItemSearchClass() {
		this.catlist = $("ul.catlist");
		this.url = window.location.href;
		this.page = {
			current: +TPX.getParameter("page") || 1,
			total: $("option", $(".pager #selectfield").first()).length
		};
		this.loadedPages=[];
		this.loadedPages.push(this.page.current);
		
		//adds a list of pages to search results, to allow background-loading
		this.showPageDisplay = function() {
			if (!TPX.ListView) return false;	//requires listview
			
			var tools = $(".tpx_list_tools").first();
			var div = $("<div>").addClass("tpx_page_indicator").appendTo(tools);
			div.append($("<div>").css("clear", "both"));
			
			//compute the available range
			var range = [ this.page.current-4, this.page.current+4];
			if (range[0]<=0) {
				range[1] += (1-range[0]);
				range[0] = 1;
			}
			if (range[1] > this.page.total) range[1] = this.page.total;

			//add page indicators
			for (var i=range[0]; i<=range[1]; i++) {
				var el = $("<button>Page " +i+ "</button>")
					.button()
					.click({ TPX:TPX, page: i},loadPage)
					.appendTo(div);
				if (i == this.page.current) {
					el.button("disable");
					markLoaded(el);
				}
			}
		}
		
		this.addSaveButton = function() {
			var btn = $("<button>Save Search Criteria</button>")
				.addClass("tpx_save_query")
				.prependTo($("#content_main .window").first())
				.button({
					icons: { primary: 'ui-icon-disk' }
				});
			
			btn[0].addEventListener("click", function(){
				if (!TPX.SaveSearch) TPX.SaveSearch = new SaveSearchClass();
				TPX.SaveSearch.open( TPX.getParameter() );
			}, true);
		};
		
		function markLoaded(el) {
			el.addClass("loaded_page ui-state-active");
			el.removeClass("loading ui-state-disabled ui-state-hover ui-state-focus");
			return el;
		}
		
		function loadPage(event) {
			var TPX = event.data.TPX;
			var ItemSearch = TPX.ItemSearch
			var loadedPages = ItemSearch.loadedPages;

			var page = event.data.page;
			var indicator = $(this);

			//check if page is already loaded or currently loading
			if ($.inArray(page, loadedPages) > -1) return false;
			if ($(".loading", indicator.parent()).length > 0) return false;
			
			//load frame in background
			indicator.addClass("loading").button("disable");
			TPX.loadIframe(ItemSearch.url + "&page=" + page, function(){
				//get items and append
				var items = $(this).contents().find("ul.catlist li");
				items.appendTo(ItemSearch.catlist);
				TPX.ListView.reload();
				
				ItemSearch.loadedPages.push(page);
				markLoaded(indicator);
			});
		}

	}; // END ItemSearchClass
	
	function SaveSearchClass() {
		this.dialogDiv;
		
		function initialize() {
			
			var dialogDiv = createSaveSearchDialog();

			var evt = document.createEvent("CustomEvent");
			evt.initCustomEvent("saveSearch", true, true, { TPX:TPX, dialogDiv:dialogDiv });

			$(dialogDiv).dialog({
				modal:true,
				width:400, 
				buttons: {
					"Cancel": function(){
						$(this).dialog("close");
					},
					"Save Search": saveSearch
				}
			});
			
			return dialogDiv;
		}
		
		var inputBox = function(id, label) {
			var div = $("<div>");
			$("<label>"+label+"</label>").append(
				$("<br/>"),
				$("<input type='text'>").attr("id", id).css("width","100%")
			).appendTo(div);
			return div;
		};
		
		function createSaveSearchDialog() {
			var dialogDiv = $("<div />")
				.attr("id","tpx_save_query_dialog")
				.attr("title","Save Search Criteria")
				.css("overflow-y", "hidden");
			
			var form = $("<form/>").appendTo(dialogDiv);
			var query_name = inputBox("query_name","Enter a name for this query").appendTo(form);
			$("<input type='hidden' id='query_data' />").appendTo(form);
			
			var fieldset = $("<fieldset/>").appendTo(form)
				.append("<legend>Search Criteria</legend>",$("<table>"));

			return dialogDiv;
		}
		
		function updateForm( query, saveSearch ) {
			var namePreset = "";
			var table = $("table", saveSearch.dialogDiv).empty();

			//clear the empty fields
			$.each(query, function(key,val) {
				if (val.length==0) delete query[key];
			});
			
			if (query.sec !== undefined) {
				$("<tr>").append(
					$("<td>").text("Search in"),
					$("<td>").text((query.sec=="s")?"Items for Sale":"Want to Buy")
				).appendTo(table);
				
				namePreset += (query.sec=="s")?"IFS ":"WTB ";
			}
			
			if (query.namekeys !== undefined) {
				$("<tr>").append(
					$("<td>").text("Name Keywords"),
					$("<td>").text(query.namekeys)
				).appendTo(table);
				
				namePreset += query.namekeys + " ";
			}

			if (query.descriptionkeys !== undefined) {
				$("<tr>").append(
					$("<td>").text("Desc Keywords"),
					$("<td>").text(query.descriptionkeys)
				).appendTo(table);

				namePreset += query.descriptionkeys + " ";
			}

			if (query.cat !== undefined) {
				var categoryList = TPX.getCategoryById( query.cat[0] )["name"];
				for (var i=1; i<query.cat.length; i++) {
					categoryList += ", " + TPX.getCategoryById( query.cat[i] )["name"];
				}
				
				$("<tr>").append(
					$("<td>").text("Categories"),
					$("<td>").text(categoryList)
				).appendTo(table);
			}
			
			if (query.condition !== undefined) {
				var condName = TPX.getCriteriaNameById( "condition", query.condition )["name"];
				$("<tr>").append(
					$("<td>").text("Condition"),
					$("<td>").text(condName)
				).appendTo(table);
				
				namePreset += "("+ condName +")";
			}
			
			if (query.warranty !== undefined) {
				$("<tr>").append(
					$("<td>").text("Warranty"),
					$("<td>").text(TPX.getCriteriaNameById( "warranty", query.warranty )["name"])
				).appendTo(table);
			}
			
			if (query.ord !== undefined) {
				var sorting = TPX.getCriteriaNameById( "postorder", query.ord )["name"];
				sorting += ", " + ((query.dir=="asc") ? "Ascending" : "Descending");
				$("<tr>").append(
					$("<td>").text("Sort By"),
					$("<td>").text(sorting)
				).appendTo(table);
			}
			
			//put a suggested name and select the text
			($("#query_name", this.dialogDiv).val($.trim(namePreset)))[0].select();
			$("#query_data", this.dialogDiv).val(JSON.stringify(query));
			$("td:first-child", table).addClass("criteria_name");
			$("td:last-child", table).addClass("criteria_value");
		}
		
		function saveSearch(event) {
			var dialogDiv = $(this);
			var query = {
				"name": $("#query_name", dialogDiv).val(),
				"query": JSON.parse($("#query_data", dialogDiv).val())
			};
			
			//get existing searches
			var savedSearch = TPX.getPref(["savedSearch", TPX.host]);
			if (savedSearch === undefined) savedSearch = [];

			// TODO: improve query comparison
			var isNewQuery = true;
			for (var i=0; i<savedSearch.length; i++) {
				if (JSON.stringify(query.query) == JSON.stringify(savedSearch[i].query)) {
					isNewQuery = false;
					break;
				}
			}
			
			//add the new one
			if (isNewQuery) {
				savedSearch.push(query);
				TPX.setPref(["savedSearch", TPX.host], savedSearch);
				TPX.addQuickBar();
			}

			dialogDiv.dialog("close");
			event.preventDefault();
			return false;
		}
		
		this.open = function( query ) {
			if (!this.dialogDiv) this.dialogDiv = initialize();

			this.dialogDiv.dialog("open");
			updateForm( query, this );
		};
	};

// Script Loader
(function(){try{var j=GM_installScript;isTamper=true}catch(e){isTamper=false}var b,insertDone=false;var k=function(e){b=document.getElementsByTagName("body")[0];if(b&&(!insertDone)){document.removeEventListener("load",k,true);document.removeEventListener("DOMContentLoaded",k,true);b.className+=" unready";GM_addStyle(".unready .postcontent { visibility:hidden; } .unready #frontlist { display:none; } ");var c=document.getElementsByTagName('head')[0]||document.documentElement;var d=document.createElement("script");with(d){type='text/javascript';async=true;innerHTML=GM_getResourceText("jquery")}c.appendChild(d);var f=document.createElement("script");with(f){type='text/javascript';async=true;innerHTML=GM_getResourceText("jqueryui")}c.appendChild(f);var g=document.createElement("script");with(g){type='text/javascript';async=true;innerHTML=GM_getResourceText("prettyjs")}c.appendChild(g);var h=document.createElement("style");var i=GM_getResourceText("jquerycss").replace(/url\(images/gim,'url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/redmond/images');with(h){type='text/css';title='jQuery.css';innerHTML=i}c.appendChild(h);insertDone=true;function waitInteractive(){var a=(unsafeWindow.jQuery!==undefined);var b=(a&&unsafeWindow.jQuery.ui!==undefined);if(a)unsafeWindow.jQuery.noConflict();if(a&&b&&(document.readyState=="interactive"||document.readyState=="complete")){startTPX()}else{window.setTimeout(waitInteractive,100)}}waitInteractive()}};document.addEventListener("load",k,true);document.addEventListener("DOMContentLoaded",k,true);window.addEventListener("load",function(){var b=document.getElementsByTagName("body")[0];b.className=b.className.replace("unready","")},true)})();
