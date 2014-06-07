// ==UserScript==
// @name           SporeScope
// @namespace      SporeScope
// @description    Adds extra statistics to Sporepedia
// @include        http://*.spore.com/sporepedia*
// @exclude        http://eu.spore.com/sporepedia*
// ==/UserScript==

if (document.location.href.search("spore.com/sporepedia") > -1) {
	document.defaultView.addEventListener('load', function(aEvent) { onSporepediaLoad(aEvent); }, false);
}

var sporescopeConfig = function() {
	SHOW_ATTACK = 'stats.showAttack'
	SHOW_SOCIAL = 'stats.showSocial'
	SHOW_ABILITIES = 'stats.showAbilities'
	SHOW_RELATIONSHIP = 'showRelationships'
	SHOW_BODY_STRUCT = 'stats.showBodyStructure'
	SHOW_TAG_NAVIGATOR = 'showTagNavigator'
	SHOW_EXPERIMENTAL = 'showExperimental'
	SHOW_AESTHETICS = 'stats.showAesthetics'
	ALWAYS_SHOW_DETAILED_STATS = 'autoShowDetailedStats'
	
	this.showAttack = GM_getValue(SHOW_ATTACK, true);
	this.showSocial = GM_getValue(SHOW_SOCIAL, true);
	this.showAbilities = GM_getValue(SHOW_ABILITIES, true);
	this.showRelationships = GM_getValue(SHOW_RELATIONSHIP, true);
	this.showBodyStructure = GM_getValue(SHOW_BODY_STRUCT, true);
	this.showTagNavigator = GM_getValue(SHOW_TAG_NAVIGATOR, true);
	this.showExperimental = GM_getValue(SHOW_EXPERIMENTAL, false);
	this.showAesthetics = GM_getValue(SHOW_AESTHETICS, false);
	this.alwaysShowDetailedStats = GM_getValue(ALWAYS_SHOW_DETAILED_STATS, false);
}

var onSporepediaLoad = function(aEvent) {
	window.sporescope_info = new sporescope_info();
	this.sporescope = new sporescope();
	sporescope.init();
}

var sporescope = function () {
	mvj = function () { return window.wrappedJSObject.mvj;};
	services = window.wrappedJSObject.services;
	lastAsset = null;
	this.config = new sporescopeConfig();
	YAHOOUtil = function() {return window.wrappedJSObject.YAHOO.util;};
	DateUtil = function() {return window.wrappedJSObject.YAHOO.ea.sp.DateUtil;};
};

var sporescope_info = function () {
	lastFamily = null;
	lastFamilyRequestId = null;
};

var sporescopeCommon = {
	addGlobalCSS : function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	},
	
	roundTo : function (value, places) {
		mult = Math.pow(10, places);
		return Math.round(value * mult) / mult;
	},
	
	properCase : function (s) {
		return s.toLowerCase().replace(/^(.)|\s(.)/g, function($1) { return $1.toUpperCase(); });
	},
	
	trim : function (s) {
		return s.replace(/^\s+|\s+$/g, '');
	}
}

sporescope.prototype = {
	CREATURE_TYPE : "CREATURE",
	VEHICLE_TYPE : "VEHICLE",
	BUILDING_TYPE : "BUILDING",
	UFO_TYPE : "UFO",
	
	FAMILY_SECTION_ID : 'sscope-family',
	TAG_PAGE_LENGTH : 44,
	INFO_LABEL_WIDTH : 100,
	
	init : function () {
		commentLengthLimit = 256;
	
		dataProvider = mvj().dataProvider;
		assetPane = mvj().assetPane;
		if (mvj().assetDetail==undefined)
		{
			mvj().initAssetDetail();
		}
		assetDetail = mvj().assetDetail;
		assetService = services.assetService;
		sporecastPane = mvj().sporecastPane;
		userSporecasts = mvj().userSporecasts;

		// Subscribe to asset update events		
		assetDetail.subscribe(assetDetail.REQUEST_ASSET_RATING_EVENT, mvj().bind(sporescope.assetSelected));
		assetPane.subscribe(assetPane.ASSET_SELECTED_EVENT, mvj().bind(sporescope.assetSelected));
		dataProvider.subscribe(dataProvider.ASSET_UPDATED_EVENT, mvj().bind(sporescope.assetUpdated)); 
		dataProvider.subscribe(dataProvider.ASSETS_ARRIVED_EVENT, mvj().bind(sporescope.assetsChanged));    
		dataProvider.subscribe(dataProvider.FETCHED_ASSET_ARRIVED_EVENT, mvj().bind(sporescope.assetSelected));
		
		// Subscribe to sporecase events
		sporecastPane.subscribe(sporecastPane.SPORECAST_SELECTED_EVENT,mvj().bind(sporescope.sporecastSelected));
		userSporecasts.subscribe(userSporecasts.SPORECAST_SELECTED_EVENT,mvj().bind(sporescope.sporecastSelected));
		dataProvider.subscribe(dataProvider.SPORECAST_UPDATED_EVENT,mvj().bind(sporescope.sporecastUpdated));
		dataProvider.subscribe(dataProvider.SPORECASTS_ARRIVED_EVENT,mvj().bind(sporescope.sporecastsChanged));
		
		// Intercept Creation Reporting
		assetDetail.flagInput.unsubscribeAll('click');
		assetDetail.flagInput.subscribe('click', mvj().bindFirst(sporescope.onCreationReport, assetDetail));
						
		sporescope.addRandomCreationButton();
		sporescope.addRandomSporecastButton();
		sporescope.addFamilyCSS();
		sporescope.addCommentLimitTracker();
		sporescope.addSScopeCSS();
		sporescope.addTagNavigatorCSS();
		
		if (assetDetail.asset != null) {
			sporescope.updateAsset(assetDetail.asset);
		}
	},
	
	// ------ Report confirmation
	
	onCreationReport : function (assetDetail) {
		var answer = confirm ("Are you sure you wish to report this entry?")
		if (answer) {
			assetDetail.updateFlag();
		}
	},
	
	onCommentReport : function(commentId) {
		var answer = confirm ("Are you sure you wish to report this comment?")
		if (answer) {
			mvj().dataProvider.updateCommentFlag(commentId);
		}
	},
	
	// ----- UI elements
	
	addRandomCreationButton : function () {
		sporecastsEl = document.getElementById('sporecasts');
		button = sporescope.createNavigatorButton('random-creation', 'Random Creation', sporecastsEl);
		sporescope.addRandomCreationButtonCSS();
		button.addEventListener('click', mvj().bind(function () {sporescope.selectRandomCreation();}), false);
	},
	
	addRandomSporecastButton : function () {
		sporecastsEl = document.getElementById('create-sporecast');
		button = sporescope.createNavigatorButton('random-sporecast', 'Random Sporecast', sporecastsEl);
		sporescope.addRandomSporecastButtonCSS();
		button.addEventListener('click', mvj().bind(function () {sporescope.selectRandomSporecast();}), false);
	},
	
	addCommentLimitTracker : function () {
		
		sporescope.addCommentLimitCSS();
	
		commentSection = document.getElementById('comment-entry');
		commentText = document.getElementById('add-comment-text');

		commentLimitSection = document.createElement('div');
		commentLimitSection.id = 'sscope-comment-limit-section';
		limitDisplay = document.createElement('p');
		commentLimitSection.appendChild(limitDisplay);
		limitDisplay.innerHTML = '<input readonly type="text" id="comment_count" value="' + commentLengthLimit + '" size="3"/> characters remaining.'
		commentSection.appendChild(commentLimitSection);

		limitDisplay = document.getElementById('comment_count');

		assetPane.subscribe(assetPane.ASSET_SELECTED_EVENT, mvj().bindFirst(function (displayField, textField, limit) { 
			sporescope.recalculateCommentLength(displayField, textField, limit);
		}, limitDisplay, commentText, commentLengthLimit));
		dataProvider.subscribe(dataProvider.ASSET_UPDATED_EVENT, mvj().bindFirst(function (displayField, textField, limit) { 
			sporescope.recalculateCommentLength(displayField, textField, limit);
		}, limitDisplay, commentText, commentLengthLimit)); 
		dataProvider.subscribe(dataProvider.ASSETS_ARRIVED_EVENT, mvj().bindFirst(function (displayField, textField, limit) { 
			sporescope.recalculateCommentLength(displayField, textField, limit);
		}, limitDisplay, commentText, commentLengthLimit));  

		commentText.addEventListener('input', mvj().bindFirst(function (displayField, textField, limit) { 
			sporescope.recalculateCommentLength(displayField, textField, limit);
		}, limitDisplay, commentText, commentLengthLimit),false);

		assetDetail.subscribe(assetDetail.ADD_COMMENT_TEXT,mvj().bindFirst(function (displayField,limit) { displayField.value = limit; },limitDisplay, commentLengthLimit));
		if (assetDetail.canceCommentsButton != null) {
			assetDetail.cancelCommentButton.addEventListener('click' ,mvj().bindFirst(function (displayField,limit) { displayField.value = limit; },limitDisplay, commentLengthLimit),false);
		}
	
	},
	
	// ----- Comment length display
	
	recalculateCommentLength : function (displayField, textField) {
		if (textField.value != '	              ') {
			displayField.value = commentLengthLimit - textField.value.length;
		} else {
			displayField.value = commentLengthLimit;
		}
	},
		
	// ----- CSS
	
	addSScopeCSS : function () {
		cssStyle = 
		".sscope-direct-link {" +
		"font-size:10pt;" +
		"}" +
		".button-text.left {" +
		"left:0;" +
		"top:10px;" +
		"};"
					
		sporescopeCommon.addGlobalCSS(cssStyle);
	},
	
	createNavigatorButton : function(buttonId, buttonText, beforeEl) {
		button = document.createElement('div');
		button.id = buttonId;
		button.innerHTML = '<a>' + buttonText + '</a>';
		button.setAttribute('style', 'display: block;');
		beforeEl.parentNode.insertBefore(button, beforeEl);
		return button;
	},
	
	
	addTagNavigatorCSS : function () {
		cssStyle = 
		"#sscope-tag-section {" +
		"background:#0171BA none repeat scroll 0 0;" +
		"color:#CCDDFF;" +
		"text-align:left;" +
		"line-height:1.3;" +
		"}"
	
		sporescopeCommon.addGlobalCSS(cssStyle);
	},
	
	addCommentLimitCSS : function () {
		cssStyle = 
		"#sscope-comment-limit-section {" +
		"margin-top:10px;" +
		"font-size:10pt;" +
		"}" +
		"#comment_count {" +
		"text-align:right;" +
		"color:#143C78;" +
		"border:none;" +
		'font-family:"Trebuchet MS",verdana,sans-serif;' +
		"background-color:#F5F7F4;" +
		"}";
		
		sporescopeCommon.addGlobalCSS(cssStyle);
	},
	
	addFamilyCSS : function () {
		cssStyle = 
		"img.sscope-family-thumbnail {" +
		"float:left;" +
		"height:54px;" +
		"width:54px;" +
		"}" +
		"p.sscope-family-author {" +
		"font-size:11pt;" +
		"font-weight:bold;" +
		"}" +
		"div.sscope-family-section {" +
		"padding-bottom:19px;" +
		"}"
		
		sporescopeCommon.addGlobalCSS(cssStyle);
	},
	
	addRandomCreationButtonCSS : function () {
		cssStyle = 
		'#random-creation  {' +
		'-x-system-font:none;' +
		'background:transparent url(/static/war/images/sporepedia/menu_menu_btn_strip.png) no-repeat scroll 0 0;' +
		'cursor:pointer;' +
		'font-family:"Trebuchet MS",verdana,sans-serif;' +
		'font-size:11px;'+
		'font-size-adjust:none;'+
		'font-stretch:normal;'+
		'font-style:normal;'+
		'font-variant:normal;'+
		'font-weight:bold;'+
		'height:26px;'+
		'line-height:normal;'+
		'padding:7px 6px 0 5px;'+
		'width:161px;'+
		'}' +
		'#random-creation:hover {'+
		'background-position:0px -33px;'+
		'}' +
		'#random-creation a {'+
		'background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANQSURBVHjaTFNdaBxVFP7m3juzv9lskm6TtdkkJJoaMPqQVFMxVqii0BYLagtqWyn%2BFHwTBBGKiOJDqb5IiFRf6hZfFURKoSoIqQWlFppGqaHVahrTTbOb3fnZuzP3Xs8sETPMwOXMOd%2F9zvedY%2FUWSzBGo1ZbR6slIewU0h1dkIFrC9ueNtrklArPCc4Dr14BFwkwZsFiDAYA45xh82Mo6rnuCKA%2FGBnoPTe0Lfel0eoTPwgmNudZlkVADLwjl4fWGkEgoaNm1ihzcHxsZObo4WeffvvN19jDE0Wkk9ED9Vp9951qY4kY3WCMR3ExoYDnOruglELDbUyWSn3vvXL00DvHjr1ceHTnKLT3C4SpYKA0gO2jw93dXdkDa9V6jxvIecti6zELnkimhIqi5x%2FaMfHxyRPvP%2FbigZ049VkZZ78uY7TkI5QePpw9j1AZHH9jD7IZZ8f8b39MNfxokfq%2FyaWUKcuod%2Ffvm57q7RE4U55FyvoLu6ZKuKu4BcmEg8FtGaQdictXrqPeaECFYf%2FNpVo6bIXfMBWFiFQkualT4SIiWUXDZ6istSBlBE2iBk2DW7d9VFbX0L%2FVxvBgHsKCo1XExIaolGdQ3JrHM3vuQ1NqfD%2F3J65eq8C2GdIpB3t3j%2BL83A3MfH4JwwN5ivMIAcyGh7ElnCAsVKtNkNI48tz96Mg6cASj83hsMIb78zi4bww9XWlirduV%2FzGA47D2EJyYvYBsNomTxx9HbyHTngtFgDOnfya3DF5%2FaRLrjUU6%2Fw9gGaMS9dpt%2BF4e%2B58aQyZDN9sCmgrobYPcPdgNLwjh%2B2FcEY9AMq4VdqJDUWD1hwsLyGUkph8cQqE7gzBSaIUKSysuPjp1EZPjRYzd04OfLt9qf5EWa1xwzdOdBcV44velZS%2B4srB878qqm7Ko35jFPIlYX5eo3PGJNtl4dQVffPWrt3Ct8hbjqdPCdv6xMvki0WGxtyxwa5NMiFf7togjT%2B4aausjaHGY4Dj73XX197J%2FRuvoU8GtOeGQPmDYBNBCM%2FCoX5aGlo8kkvxwZ9Z5gX7B86Oy68oy7d6PlOzaXIHbGwCFvhICqWIGbYAYjEQlK1XadlJP0HzQmHnf0t4GViwosbJZBL7B4F8BBgBu7YoMTs7icQAAAABJRU5ErkJggg%3D%3D) no-repeat scroll 2px 1px;' +
		'color:#143C78;'+
		'display:block;'+
		'float:left;'+
		'padding-left:23px;'+
		'text-decoration:none;'+
		'}';
		
		sporescopeCommon.addGlobalCSS(cssStyle);
	},
	
	addRandomSporecastButtonCSS : function () {
		cssStyle = 
		'#random-sporecast  {' +
		'-x-system-font:none;' +
		'background:transparent url(/static/war/images/sporepedia/menu_menu_btn_strip.png) no-repeat scroll 0 0;' +
		'cursor:pointer;' +
		'font-family:"Trebuchet MS",verdana,sans-serif;' +
		'font-size:11px;'+
		'font-size-adjust:none;'+
		'font-stretch:normal;'+
		'font-style:normal;'+
		'font-variant:normal;'+
		'font-weight:bold;'+
		'height:26px;'+
		'line-height:normal;'+
		'padding:7px 6px 0 5px;'+
		'width:161px;'+
		'}' +
		'#random-sporecast:hover {'+
		'background-position:0px -33px;'+
		'}' +
		'#random-sporecast a {'+
		'background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANQSURBVHjaTFNdaBxVFP7m3juzv9lskm6TtdkkJJoaMPqQVFMxVqii0BYLagtqWyn%2BFHwTBBGKiOJDqb5IiFRf6hZfFURKoSoIqQWlFppGqaHVahrTTbOb3fnZuzP3Xs8sETPMwOXMOd%2F9zvedY%2FUWSzBGo1ZbR6slIewU0h1dkIFrC9ueNtrklArPCc4Dr14BFwkwZsFiDAYA45xh82Mo6rnuCKA%2FGBnoPTe0Lfel0eoTPwgmNudZlkVADLwjl4fWGkEgoaNm1ihzcHxsZObo4WeffvvN19jDE0Wkk9ED9Vp9951qY4kY3WCMR3ExoYDnOruglELDbUyWSn3vvXL00DvHjr1ceHTnKLT3C4SpYKA0gO2jw93dXdkDa9V6jxvIecti6zELnkimhIqi5x%2FaMfHxyRPvP%2FbigZ049VkZZ78uY7TkI5QePpw9j1AZHH9jD7IZZ8f8b39MNfxokfq%2FyaWUKcuod%2Ffvm57q7RE4U55FyvoLu6ZKuKu4BcmEg8FtGaQdictXrqPeaECFYf%2FNpVo6bIXfMBWFiFQkualT4SIiWUXDZ6istSBlBE2iBk2DW7d9VFbX0L%2FVxvBgHsKCo1XExIaolGdQ3JrHM3vuQ1NqfD%2F3J65eq8C2GdIpB3t3j%2BL83A3MfH4JwwN5ivMIAcyGh7ElnCAsVKtNkNI48tz96Mg6cASj83hsMIb78zi4bww9XWlirduV%2FzGA47D2EJyYvYBsNomTxx9HbyHTngtFgDOnfya3DF5%2FaRLrjUU6%2Fw9gGaMS9dpt%2BF4e%2B58aQyZDN9sCmgrobYPcPdgNLwjh%2B2FcEY9AMq4VdqJDUWD1hwsLyGUkph8cQqE7gzBSaIUKSysuPjp1EZPjRYzd04OfLt9qf5EWa1xwzdOdBcV44velZS%2B4srB878qqm7Ko35jFPIlYX5eo3PGJNtl4dQVffPWrt3Ct8hbjqdPCdv6xMvki0WGxtyxwa5NMiFf7togjT%2B4aausjaHGY4Dj73XX197J%2FRuvoU8GtOeGQPmDYBNBCM%2FCoX5aGlo8kkvxwZ9Z5gX7B86Oy68oy7d6PlOzaXIHbGwCFvhICqWIGbYAYjEQlK1XadlJP0HzQmHnf0t4GViwosbJZBL7B4F8BBgBu7YoMTs7icQAAAABJRU5ErkJggg%3D%3D) no-repeat scroll 2px 1px;' +
		'color:#143C78;'+
		'display:block;'+
		'float:left;'+
		'padding-left:23px;'+
		'text-decoration:none;'+
		'}';
		
		sporescopeCommon.addGlobalCSS(cssStyle);
	},
			
	// ----- HTML Editing	
	
	ASSET_DETAIL_SECTION_ID : 'sscope-section',
	SPORECAST_DETAIL_SECTION_ID : 'sscope-sporecast-detail-section',
	
	addSScopeSection : function (id, parent_node) {
		sscope_section_node = document.createElement("div");
     	sscope_section_node.id = id;
     	sscope_section_node.setAttribute("style","margin-top: 40px;");
     	parent_node.appendChild(sscope_section_node);
     	return sscope_section_node;
	},

	removeScopeSection : function (id) {
		var sscope_section_node = document.getElementById(id);

		if (sscope_section_node != null) {
   			sscope_section_node.parentNode.removeChild(sscope_section_node);
		}
	},

	addSScopeHeading : function (title, parent_node) {
		sscope_new_node = document.createElement("br");
		parent_node.appendChild(sscope_new_node);

		sscope_new_node = document.createElement("h3");
		sscope_new_node.innerHTML = title;
		parent_node.appendChild(sscope_new_node);
	},
	
	addSScopeHeadingWithValue : function (title, value, labelWidth, parent_node) {
		sscope_new_node = document.createElement("br");
		parent_node.appendChild(sscope_new_node);
		
		sscope_element = document.createElement("div");
 		sscope_element.setAttribute('class', 'sscope-element');
 		parent_node.appendChild(sscope_element);
 		
 		sscope_description = document.createElement("div");
 		sscope_description.setAttribute('class', 'sscope-description');
 		sscope_description.setAttribute('style', 'float:left;width:' + labelWidth + 'px;');
 		sscope_description.innerHTML = '<h3>' + title + '</h3>';
 		sscope_element.appendChild(sscope_description);
 		 		
  		sscope_value = document.createElement('span');
  		sscope_value.setAttribute('class','sscope-element-value');
  		sscope_value.innerHTML = '<h3>' + value + '</h3>';
  		sscope_element.appendChild(sscope_value);
	},

	addSScopeElement : function (description, value, labelWidth, parent_node) {
 		sscope_element = document.createElement("div");
 		sscope_element.setAttribute('class', 'sscope-element');
 		parent_node.appendChild(sscope_element);
 		
 		sscope_description = document.createElement("div");
 		sscope_description.setAttribute('class', 'sscope-description');
 		sscope_description.setAttribute('style', 'float:left;width:' + labelWidth + 'px;');
 		sscope_description.innerHTML = description;
 		sscope_element.appendChild(sscope_description);
 		 		
  		sscope_value = document.createElement('span');
  		sscope_value.setAttribute('class','sscope-element-value');
  		sscope_value.innerHTML = value;
  		sscope_element.appendChild(sscope_value);
	},
	
	addSScopeDirectLink : function (asset, parent_node) {
		linkText = 'http://www.spore.com/sporepedia#qry=sast-' + asset.assetId;
	
		sscope_new_node = document.createElement("a");
		sscope_new_node.setAttribute('class', 'sscope-direct-link');
		sscope_new_node.setAttribute('href', linkText);
 		sscope_new_node.innerHTML = 'Direct Link';
  		parent_node.appendChild(sscope_new_node);
	},
	
	addParentHeader : function (familySection) {
		newNode = document.createElement('h3')
		newNode.innerHTML = 'Parent:'
		familySection.appendChild(newNode);
	},
	
	addChildHeader : function (familySection) {
		newNode = document.createElement('h3')
		newNode.innerHTML = 'Children:'
		familySection.appendChild(newNode);
	},
	
	addChildrenSection : function (familySection) {
		newNode = document.createElement('div')
		newNode.id = 'sscope-family-children'
		familySection.appendChild(newNode);
		return newNode;
	},
	
	addFamilyMemberDisplay : function (familyAsset, familySection) {
		memberSection = document.createElement('div');
		memberSection.setAttribute('class', 'sscope-family-section');
		familySection.appendChild(memberSection);
		
		newNode = document.createElement('img');
		newNode.setAttribute('class', 'sscope-family-thumbnail');
		memberSection.appendChild(newNode);
		newNode.src=mvj().templates.render('asset-thumbnail-url',familyAsset);
		newNode.addEventListener('click', mvj().bindFirst(function (asset) {sporescope.selectAsset(asset);}, familyAsset), false);
		
		newNode = document.createElement('p');
		newNode.setAttribute('class','sscope-family-author');
		newNode.innerHTML = familyAsset.name;
		memberSection.appendChild(newNode);
		newNode.addEventListener('click', mvj().bindFirst(function (asset) {sporescope.selectAsset(asset);}, familyAsset), false);
		
		authorNode = document.createElement('p');
		authorNode.innerHTML = 'by <a href="/view/profile/' + familyAsset.author.name + '">' + familyAsset.author.name + '</a>'
		memberSection.appendChild(authorNode);
	},
		
	addSectionBox : function(columnElement, sectionId, title) {
		section = document.createElement('div');
		section.setAttribute('class','innerpod js-add-comment-display');
		section.setAttribute('style','width: 350px;');
		section.id = sectionId;
		columnElement.appendChild(section);
		
		header = document.createElement('div');
		header.setAttribute('class','innerpodtop header');
		header.innerHTML = 
		'<div class="innerpodtoplft"><img height="28" width="32" src="/static/war/images/global/innerpod_toplft.png"/></div>' +
		'<div class="innerpodtoprt"><img height="28" width="32" src="/static/war/images/global/innerpod_toprt.png"/></div>' +
		'<div class="innerpodtopcntr" style="width: 286px;"><h3>' + title + '</h3><img height="28" width="298" src="/static/war/images/global/innerpod_top_tile.png"/></div>';
		section.appendChild(header);
		
		middle = document.createElement('div');
		middle.setAttribute('class','innerpodMid');
		section.appendChild(middle);
		
		footer = document.createElement('div');
		footer.setAttribute('class','innerpodbot');
		footer.innerHTML = 
		'<div class="innerpodbotlft"><img height="32" width="32" src="/static/war/images/global/innerpod_1_bot_corner_lft.png"/></div>' +
		'<div class="innerpodbotrt"><img height="32" width="32" src="/static/war/images/global/innerpod_1_bot_corner_rht.png"/></div>' +
		'<div class="innerpodbotcntr" style="width: 286px;"><img height="32" width="298" src="/static/war/images/global/innerpod_1_bot_tile.png"/></div>'; 
		section.appendChild(footer);
		
		return middle;
	},
	
	removeSectionBox : function(sectionId) {
		section = document.getElementById(sectionId);
		if (section != null) {
			section.parentNode.removeChild(section);
		}
	},
	
	addButton : function (sscope_section_node, asset, text) {
		buttonSpan = document.createElement("span");
		buttonSpan.setAttribute('class', 'button-text left');
		sscope_section_node.appendChild(buttonSpan);
		
		leftSpan = document.createElement("span");
		leftSpan.setAttribute('class', 'button-text-lft tb');
		buttonSpan.appendChild(leftSpan);
		
		leftSpan = document.createElement("span");
		leftSpan.setAttribute('class', 'button-text-rt tb');
		buttonSpan.appendChild(leftSpan);
		
		moreDetailsLink = document.createElement("span");
		moreDetailsLink.setAttribute('class', 'button-input js-update-button');
		moreDetailsLink.innerHTML = text;
		buttonSpan.appendChild(moreDetailsLink);
		
		return buttonSpan;
	},
	
	renderQueryMessage : function(searchterm) {
		mvj().search.searchResultLabel.innerHTML=mvj().templates.render('src-spc-results',[searchterm['searchText'],"Tags, Everything"]);
	},
	
	renderSporecastQueryMessage : function(searchterm) {
		mvj().sporecastSearch.searchResultLabel.innerHTML=mvj().templates.render('src-spc-results',[searchterm['searchText'],"Tags"]);
	},
	
	createTagPaging : function(tags, startIndex, prev, next, parentNode) {
		pagingNode = document.createElement('div');
		if (prev) {
			tagItem = document.createElement('a');
			tagItem.setAttribute('style','color: #CCDDFF;');
			tagItem.innerHTML = '<b>&lt;&lt;&lt; </b>';
			tagItem.addEventListener('click', mvj().bindFirst(sporescope.displayTagNavigator, tags, startIndex - sporescope.TAG_PAGE_LENGTH), false);
			pagingNode.appendChild(tagItem);
		}
		if (next) {
			tagItem = document.createElement('a');
			tagItem.setAttribute('style','color: #CCDDFF');
			tagItem.innerHTML = '<b>&gt;&gt;&gt;</b>';
			tagItem.addEventListener('click', mvj().bindFirst(sporescope.displayTagNavigator, tags, startIndex + sporescope.TAG_PAGE_LENGTH), false);
			pagingNode.appendChild(tagItem);
		}
		if (prev || next) {
			br = document.createElement('br');
			pagingNode.appendChild(br);
		}
		parentNode.appendChild(pagingNode);
	},

    // ------- Sporecast Change handlers
    
    sporecastSelected : function (sporecast) {
          sporescope.updateSporecastDetails(sporecast);
    },
    
    sporecastUpdated : function (action, sporecast, asset) {
		sporescope.updateSporecastDetails(sporecast);
    },
    
    sporecastsChanged : function (sporecasts,index,count,query) {
		sporescope.updateTagNavigator(sporecasts, "SPORECAST");
    },

	// ------- Asset Change handlers

	assetsChanged : function (query, assets) {
		selectedAsset = mvj().assetDetail.asset;
		if (selectedAsset != null) {
			for(var i=0, asset; asset=assets[i]; i++) {
				if (asset.assetId == selectedAsset.assetId) {
					sporescope.updateAsset(asset);
					break;
				}
			}
		}
		
		sporescope.updateTagNavigator(assets, "ASSET");
	},

	assetUpdated : function (asset) {
	    if (mvj().selectedAsset == null || mvj().selectedAsset.id == asset.id) {
			sporescope.updateAsset(asset);
	    }
	},

	assetSelected : function(asset) {
   		sporescope.updateAsset(asset);
	},

	// ----- Asset Selection
	
	selectAsset : function(asset) {
		if (asset != null) {
			mvj().assetSelected(asset);
			sporescope.updateAsset(asset);
			
			commentText = document.getElementById('add-comment-text');
			limitDisplay = document.getElementById('comment_count');
			sporescope.recalculateCommentLength(limitDisplay,commentText);
		}
	},
	
	selectSporecast : function (sporecast) {
		if (sporecast != null) {
			mvj().selectSporecast('theme',sporecast);
			sporescope.updateSporecastDetails(sporecast);
		}
	},
	
	selectRandomCreation : function() {
		services.assetService.listAssets({index:0,count:1,view:'RANDOM'}, mvj().bind( 
		function (assets) { 
			sporescope.selectAsset(assets[0]);
		}));
	},
	
	selectRandomSporecast : function () {
		ind = Math.ceil(mvj().allSporecasts.count * Math.random());

		services.sporecastService.listSporecastInfos({type:'THEME',index:ind,count:1}, mvj().bind(
		function (sporecasts) { 
			sporescope.selectSporecast(sporecasts[0]);
		}));
	},
	
	// ----- Family Tree traversal
	
	findParent : function(asset, familyTree) {
		if (familyTree == null) {
			return null;
		}
		if (familyTree.parent.assetId == asset.assetId)  {
			return null;
		}
		for (i in familyTree.children) {
			if (familyTree.children[i].parent.assetId == asset.assetId) {
				return familyTree.parent;
			}
			parentAsset = sporescope.findParent(asset, familyTree.children[i]);
			if (parentAsset != null) {
				return parentAsset;
			}
		}
		return null;
	},
	
	findLocalTree : function(asset, familyTree) {
		if (familyTree == null) {
			return null;
		}
		if (familyTree.parent.assetId == asset.assetId) {
			return familyTree;
		}
		for (i in familyTree.children) {
			localTree = sporescope.findLocalTree(asset, familyTree.children[i]);
			if (localTree != null) {
				return localTree;
			}
		}
		return null;
	},

	// ----- UI Update functions
	
	updateTagNavigator : function (assets, type) {
		if (!sporescope.config.showTagNavigator) {
			return;
		}
		
		taglist = new Array();
		for (index in assets) {
			if (assets[index].tags != null) {
				taglist = taglist.concat(assets[index].tags.toLowerCase().split(/,/));
			}
		}
		
		var newindex = 0;
		for (index in taglist) {
			temp = sporescopeCommon.trim(taglist[index]);
			if (temp != "" && temp != " ") {
				taglist[newindex++] = temp 
			}
		}
		
		taglist.sort();
		tags = new Array();
		i = 0;
		
		lastTag = ""
		for(index in taglist) {
			if (taglist[index] != lastTag && taglist[index] != " ") {
				tags[i++] = taglist[index];
				lastTag = taglist[index];
			}
		}
		sporescope.displayTagNavigator(tags, 0, type);
	},

	displayTagNavigator : function (tags, startIndex, type) {
		column = document.getElementById('content-ad-column');

		oldSection = document.getElementById('sscope-tag-section');
		if (oldSection != null) {
			oldSection.parentNode.removeChild(oldSection);
		}

		tagDisplay = document.createElement('div');
		tagDisplay.id = 'sscope-tag-section';
		tagDisplay.setAttribute('style','padding-left:10px; padding-bottom:10px;');
		column.insertBefore(tagDisplay, column.firstChild);
		
		prev = startIndex > 0;
		next = tags.length > startIndex + sporescope.TAG_PAGE_LENGTH;
		
		sporescope.createTagPaging(tags, startIndex, prev, next, tagDisplay);
		
		index = startIndex;
		while (index < startIndex + sporescope.TAG_PAGE_LENGTH && index < tags.length) {
			tagItem = document.createElement('a');
			tagItem.setAttribute('style','color: #CCDDFF;');
			tagItem.innerHTML = tags[index];
		
			fields = new Array();
			fields.push("TAGS");
			if (type == "ASSET") {
				tagItem.addEventListener('click', mvj().bindFirst(
					function(searchterm) {
						sporescope.renderQueryMessage(searchterm);
						mvj().searchRequested(searchterm);
					}, {adv:1, searchText:tags[index], maxResults:20, fields:fields}), false);
			} else {
				tagItem.addEventListener('click', mvj().bindFirst(
					function(searchterm) {
						sporescope.renderSporecastQueryMessage(searchterm);
						mvj().sporecastSearchRequested(searchterm);
					}, {adv:1, searchText:tags[index], maxResults:12, fields:fields}), false);
			}
			tagDisplay.appendChild(tagItem);
			br = document.createElement('br');
			tagDisplay.appendChild(br);
			index++;
		} 
						
		sporescope.createTagPaging(tags, startIndex, prev, next, tagDisplay);
	},
	
	updateAsset : function (asset) {
		sporescope.removeScopeSection(sporescope.ASSET_DETAIL_SECTION_ID);
		
		if (asset.type == sporescope.CREATURE_TYPE) {
			sporescope.updateCreatureDetails(asset);
		} else if (asset.type == sporescope.BUILDING_TYPE) {
			sporescope.updateBuildingDetails(asset);
		} else if (asset.type == sporescope.VEHICLE_TYPE) {
			sporescope.updateVehicleDetails(asset);
		} else if (asset.type == sporescope.UFO_TYPE) {
			sporescope.updateUFODetails(asset);
		}
		if (sporescope.config.showRelationships) {
			if (services.assetService.findFamilyTree != null) {
				sporescope.beginUpdateFamily(asset);
			}
		}
	},	
		
	beginUpdateFamily : function(asset) {
		sporescope.removeSectionBox(sporescope.FAMILY_SECTION_ID);
		if (window.sporescope_info.lastFamily != null && sporescope.findLocalTree(asset, window.sporescope_info.lastFamily) != null) {
			sporescope.displayFamily(asset, window.sporescope_info.lastFamily);
		} else if (window.sporescope_info.lastFamilyRequestId != asset.assetId) {
			window.sporescope_info.lastFamilyRequestId = asset.assetId;
			services.assetService.findFamilyTree(asset.assetId, mvj().bindFirst(sporescope.endUpdateFamily, asset));
		}
	},
	
	endUpdateFamily : function(asset, familyTree) {
		if (mvj().selectedAsset == null || mvj().selectedAsset.assetId != asset.assetId) {
			// We've selected a new asset.
			return;
		}
		sporescope.removeSectionBox(sporescope.FAMILY_SECTION_ID);
		if (familyTree != null) {
			window.sporescope_info.lastFamily = familyTree;
			sporescope.displayFamily(asset, familyTree);
		}
	},
	
	displayFamily : function(asset, familyTree) {
		assetInfoElement = document.getElementById('asset-add-comment');
		columnElement = assetInfoElement.parentNode;
	
		familySection = sporescope.addSectionBox(columnElement, sporescope.FAMILY_SECTION_ID, 'Relations');
	
		parentAsset = sporescope.findParent(asset, familyTree);
		if (parentAsset != null) {
			sporescope.addParentHeader(familySection);
			sporescope.addFamilyMemberDisplay(parentAsset, familySection);
		}
				
		localTree = sporescope.findLocalTree(asset, familyTree);
		if (localTree != null) {
			firstChild = true;
			for (i = 0; child = localTree.children[i]; i++) {
				if (firstChild) {
					sporescope.addChildHeader(familySection);
					firstChild = false;
					
					childrenSection = sporescope.addChildrenSection(familySection);
				}
				sporescope.addFamilyMemberDisplay(child.parent, childrenSection);
			}
		}
	},
	
	displayUserAssetRating : function (asset, sscope_section_node) {
		rating = asset.rating;
		if (rating == -1) {
			rating = 0;
		}
		rating = sporescopeCommon.roundTo(rating, 2);
		sporescope.addSScopeElement("User Rating: ", 	rating,  sporescope.INFO_LABEL_WIDTH, 	sscope_section_node);
	},
	
	displayUserSporecastRating : function (sporecast, sscope_section_node) {
		rating = sporecast.rating;
		rating = sporescopeCommon.roundTo(rating, 2);
		sporescope.addSScopeElement("User Rating: ", 	rating,  sporescope.INFO_LABEL_WIDTH, 	sscope_section_node);
	},
	
	updateSporecastDetails : function (sporecast) {
		var sporecastColumn = document.getElementsByClassName('js-sporecast-detail-col-1')[0];
		sporescope.removeScopeSection(sporescope.SPORECAST_DETAIL_SECTION_ID);
		sscope_section_node = sporescope.addSScopeSection(sporescope.SPORECAST_DETAIL_SECTION_ID,sporecastColumn);
		
		sporescope.addSScopeHeading("Ratings:", sscope_section_node);
		sporescope.displayUserSporecastRating(sporecast, sscope_section_node);
		sporescope.addSScopeElement("Subscribers:", sporecast.subscriptionCount, sporescope.INFO_LABEL_WIDTH, sscope_section_node);
	},
	
	updateCreatureDetails : function (asset) {
		var sscope_tag_node = document.getElementById("asset-tags");
		var columnElement = sscope_tag_node.parentNode;

     	sscope_section_node = sporescope.addSScopeSection(sporescope.ASSET_DETAIL_SECTION_ID, columnElement);
     	
     	sporescope.addSScopeHeading("General:", sscope_section_node);
		sporescope.addSScopeElement("Type: ", "Creature", sporescope.INFO_LABEL_WIDTH, sscope_section_node);
		sporescope.addSScopeElement("Stage: ", sporescope.creatureStages[asset.function], sporescope.INFO_LABEL_WIDTH, sscope_section_node);
     	sporescope.addSScopeElement("Diet: ",	sporescope.getCreatureDiet(asset), sporescope.INFO_LABEL_WIDTH,	sscope_section_node);
     	
		sporescope.addSScopeHeading("Ratings:", sscope_section_node);
		sporescope.displayUserAssetRating(asset, sscope_section_node);
		sporescope.addSScopeElement("Evo Points: ", 	asset.totalEvoPoints, sporescope.INFO_LABEL_WIDTH,	sscope_section_node);
		if (sporescope.config.showAesthetics) {
			sporescope.addSScopeElement("Cuteness: ",	 	sporescopeCommon.roundTo(asset.cuteness, 2), sporescope.INFO_LABEL_WIDTH,	sscope_section_node);
			sporescope.addSScopeElement("Meanness: ", 	sporescopeCommon.roundTo(asset.meanness, 2),	sporescope.INFO_LABEL_WIDTH,	sscope_section_node);
		}
		
		if (sporescope.config.alwaysShowDetailedStats) {
			sporescope.showMoreCreatureDetails(sscope_section_node, asset);
		} else if (sporescope.config.showBodyStructure || sporescope.config.showAbilities || sporescope.config.showAttack || sporescope.config.showSocial) {
			moreButton = sporescope.addButton(sscope_section_node, asset, "More...");
			moreButton.id = 'sscope-more-button';
			moreButton.addEventListener('click', mvj().bindFirst(
				function (asset) {
					moreButton = document.getElementById('sscope-more-button')
					detailsNode = document.createElement("div");
					moreButton.parentNode.replaceChild(detailsNode, moreButton);
					sporescope.showMoreCreatureDetails(detailsNode, asset);
				}, asset), false);
		}
							
		sscope_new_node = document.createElement("br");
		sscope_section_node.appendChild(sscope_new_node);

		sporescope.addSScopeElement("Creation Time: ", DateUtil().formatDateTimeShort(asset.created),125, sscope_section_node);
		sporescope.addSScopeDirectLink(asset, sscope_section_node);
	},
	
	showMoreCreatureDetails : function (parent_node, asset) {
		
		if (sporescope.config.showBodyStructure) {
			sporescope.addSScopeHeading("Body Structure:", parent_node);
     		sporescope.addSScopeElement("Height: ",	sporescopeCommon.roundTo(asset.height, 2),	sporescope.INFO_LABEL_WIDTH,	parent_node);
     		sporescope.addSScopeElement("Feet: ", 	asset.footCount,sporescope.INFO_LABEL_WIDTH,	parent_node);
     		sporescope.addSScopeElement("Graspers: ",	asset.grasperCount,sporescope.INFO_LABEL_WIDTH,	parent_node);
     		sporescope.addSScopeElement("Bones: ",	asset.boneCount,sporescope.INFO_LABEL_WIDTH,	parent_node);
     		if (sporescope.config.showExperimental) {
     			sporescope.addSScopeElement("Base Gear: ", asset.baseGear, sporescope.INFO_LABEL_WIDTH, parent_node);
     		}
     	}
     	
     	if (sporescope.config.showAbilities) {
 			sporescope.addSScopeHeading("Abilities:", parent_node);
 			sporescope.addSScopeElement("Glide: ", asset.glide, sporescope.INFO_LABEL_WIDTH, parent_node);
 			if (asset.sense != 0) {
 				sporescope.addSScopeElement("Sight: ", "Yes", sporescope.INFO_LABEL_WIDTH, parent_node);
 			} else {
 				sporescope.addSScopeElement("Sight: ", "No", sporescope.INFO_LABEL_WIDTH, parent_node);
 			}
 			sporescope.addSScopeElement("Sprint: ", asset.sprint, sporescope.INFO_LABEL_WIDTH, parent_node);
 			sporescope.addSScopeElement("Sneak: ", asset.stealth, sporescope.INFO_LABEL_WIDTH, parent_node);
 			sporescope.addSScopeElement("Health: ", "+" + asset.health, sporescope.INFO_LABEL_WIDTH, parent_node);
 		}

		if (sporescope.config.showAttack) {
			sporescope.addSScopeHeadingWithValue("Attack:", asset.attackRating, sporescope.INFO_LABEL_WIDTH, parent_node);
     		sporescope.addSScopeElement("Bite: ",  asset.bite,	sporescope.INFO_LABEL_WIDTH,	parent_node);
   			sporescope.addSScopeElement("Charge: ", asset.charge, sporescope.INFO_LABEL_WIDTH, parent_node);
     		sporescope.addSScopeElement("Spit: ", asset.spit, sporescope.INFO_LABEL_WIDTH, parent_node);
     		sporescope.addSScopeElement("Strike: ", asset.strike, sporescope.INFO_LABEL_WIDTH, parent_node);
     	}

		if (sporescope.config.showSocial) {
			sporescope.addSScopeHeadingWithValue("Social:", asset.social, sporescope.INFO_LABEL_WIDTH, parent_node);
     		sporescope.addSScopeElement("Sing: ",  asset.sing,	sporescope.INFO_LABEL_WIDTH,	parent_node);
 			sporescope.addSScopeElement("Dance: ", asset.dance, sporescope.INFO_LABEL_WIDTH, parent_node);
 			sporescope.addSScopeElement("Charm: ", asset.gesture, sporescope.INFO_LABEL_WIDTH, parent_node);
 			sporescope.addSScopeElement("Pose: ", asset.posture, sporescope.INFO_LABEL_WIDTH, parent_node);
     	}
    },
	
	updateBuildingDetails : function (asset) {
		var sscope_tag_node = document.getElementById("asset-tags");
		var columnElement = sscope_tag_node.parentNode;

     	sscope_section_node = sporescope.addSScopeSection(sporescope.ASSET_DETAIL_SECTION_ID, columnElement);
     	
     	sporescope.addSScopeHeading("General:", sscope_section_node);
		sporescope.addSScopeElement("Type: ", "Building", sporescope.INFO_LABEL_WIDTH,	sscope_section_node);
		sporescope.addSScopeElement("Function: ", sporescope.buildingFunctions[asset.function], sporescope.INFO_LABEL_WIDTH, sscope_section_node);
     	
		sporescope.addSScopeHeading("Ratings:", sscope_section_node);
		sporescope.displayUserAssetRating(asset, sscope_section_node);
		
		sscope_new_node = document.createElement("br");
		sscope_section_node.appendChild(sscope_new_node);

		sporescope.addSScopeElement("Creation Time: ", DateUtil().formatDateTimeShort(asset.created), 125, sscope_section_node);
		sporescope.addSScopeDirectLink(asset, sscope_section_node);
	},
	
	updateVehicleDetails : function (asset) {
		var sscope_tag_node = document.getElementById("asset-tags");
		var columnElement = sscope_tag_node.parentNode;

     	sscope_section_node = sporescope.addSScopeSection(sporescope.ASSET_DETAIL_SECTION_ID, columnElement);
     	
     	sporescope.addSScopeHeading("General:", sscope_section_node);
		sporescope.addSScopeElement("Type: ", "Vehicle", sporescope.INFO_LABEL_WIDTH,	sscope_section_node);
		sporescope.addSScopeElement("Movement: ", sporescope.vehicleTransportModes[asset.function],  sporescope.INFO_LABEL_WIDTH,sscope_section_node);
		sporescope.addSScopeElement("Function: ", sporescope.vehicleFunctions[asset.function], sporescope.INFO_LABEL_WIDTH, sscope_section_node);
     	
		sporescope.addSScopeHeading("Ratings:", sscope_section_node);
		sporescope.displayUserAssetRating(asset, sscope_section_node);
		
		sscope_new_node = document.createElement("br");
		sscope_section_node.appendChild(sscope_new_node);

		sporescope.addSScopeElement("Creation Time: ", DateUtil().formatDateTimeShort(asset.created), 125, sscope_section_node);
		sporescope.addSScopeDirectLink(asset, sscope_section_node);
	},
	
	updateUFODetails : function (asset) {
		var sscope_tag_node = document.getElementById("asset-tags");
		var columnElement = sscope_tag_node.parentNode;

     	sscope_section_node = sporescope.addSScopeSection(sporescope.ASSET_DETAIL_SECTION_ID, columnElement);
     	
     	sporescope.addSScopeHeading("General:", sscope_section_node);
		sporescope.addSScopeElement("Type: ", "Spaceship", sporescope.INFO_LABEL_WIDTH,	sscope_section_node);
     	
		sporescope.addSScopeHeading("Ratings:", sscope_section_node);
		sporescope.displayUserAssetRating(asset, sscope_section_node);
		
		sscope_new_node = document.createElement("br");
		sscope_section_node.appendChild(sscope_new_node);

		sporescope.addSScopeElement("Creation Time: ", DateUtil().formatDateTimeShort(asset.created), 125, sscope_section_node);
		sporescope.addSScopeDirectLink(asset, sscope_section_node);
	},

	getCreatureDiet : function(asset) {
     	if (asset.carnivoreRating > 0 && asset.herbivoreRating > 0) {
     	   sscope_diet = "Omnivore";
     	} else if (asset.carnivoreRating > 0) {
     	   sscope_diet = "Carnivore";
     	} else {
     	   sscope_diet = "Herbivore";
     	}
     	return sscope_diet;
     },

	creatureStages : {
		'CIV_CREATURE' : "Civilization",
		'TRIBE_CREATURE' : "Tribal",
		'SPACE_CREATURE' : "Space",
		'CREATURE' : "Creature"
	},

	vehicleFunctions : {
		'ECONOMIC_LAND'  : "Economic",
		'ECONOMIC_AIR'   : "Economic",
		'ECONOMIC_WATER' : "Economic",
		'CULTURAL_AIR'   : "Religious",
		'CULTURAL_LAND'  : "Religious",
		'CULTURAL_WATER' : "Religious",
		'MILITARY_LAND'  : "Military",
		'MILITARY_AIR'   : "Military",
		'MILITARY_WATER' : "Military",
		'COLONY_LAND'	 : "Colony",
		'COLONY_AIR'	 : "Colony",
		'COLONY_WATER'	 : "Colony"
	},

	vehicleTransportModes : {
		'ECONOMIC_LAND'  : "Land",
		'CULTURAL_LAND'  : "Land",
		'MILITARY_LAND'  : "Land",
		'CULTURAL_WATER' : "Water",
		'ECONOMIC_WATER' : "Water",
		'MILITARY_WATER' : "Water",
		'ECONOMIC_AIR'   : "Air",
		'CULTURAL_AIR'   : "Air",
		'MILITARY_AIR'   : "Air",
		'COLONY_LAND'	 : "Land",
		'COLONY_WATER'	 : "Water",
		'COLONY_AIR'	 : "Air"
	},

	buildingFunctions : {
		'ENTERTAINMENT' : "Entertainment",
		'HOUSE'			: "House",
		'INDUSTRY'		: "Factory",
		'CITY_HALL'		: "City Hall"
	}
};
