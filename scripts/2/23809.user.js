// ==UserScript==
// @name           _@/ facebook
// @author         Chris Porter
// @version        0.4
// @date           2008-07-13
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://*.facebook.com/*
// ==/UserScript==


document.createStyleSheet = function(sValue) { var o = this.createElement("style"); o.type = "text/css"; o.innerHTML = sValue; this.getElementsByTagName("head")[0].appendChild(o); };
document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};
document.removeElementsByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); for ( var i = 0 ; i < a.snapshotLength ; i++ ) { a.snapshotItem(i).parentNode.removeChild(a.snapshotItem(i)); } };

var jsLF = String.fromCharCode(10);


// =============================================================================================
// Facebook
// ---------------------------------------------------------------------------------------------
//
//
// =============================================================================================

var Facebook = {

// =============================================================================================
// settingsPanel
// =============================================================================================

	settingsPanel: {
		parent: null,

		get visible() { return (this.elements.container.offsetWidth > 0); },


	// -----------------------------------------------------------------------------
	// elements

		elements: {

			activationLink: null,
			container: null,

			formControls: {

				get expandSidebarLinks() { return document.getElementById("userscript-setting-sidebar-expand"); },
				get moveSidebarSeparator() { return document.getElementById("userscript-setting-sidebar-moveseparator"); },
				get sidebarSeparatorPosition() { return document.getElementById("userscript-setting-sidebar-separatorposition"); },
				get sidebarLinkRedirects() { return document.getElementById("userscript-setting-sidebar-separatorlinkredirects"); },

				get okButton() { return document.getElementById("userscript-setting-okbutton"); },
				get cancelButton() { return document.getElementById("userscript-setting-cancelbutton"); }

			}

		},


	// -----------------------------------------------------------------------------
	// toggleDisplay

		toggleDisplay: function()
		{
		this.elements.container.style.display = (this.visible ? "none" : "inline" );
		if (this.visible)
			{
			with (this.elements.container)
				{
				style.top = Math.floor((window.innerHeight - parseInt(offsetHeight)) / 2) + "px";
				style.left = Math.floor((window.innerWidth - parseInt(offsetWidth)) / 2) + "px";
				}
			}
		},


	// -----------------------------------------------------------------------------
	// createActivationLink

		createActivationLink: function()
		{
		var elements = {
			target: document.getElementByXPath("//ul[@id='nav_unused_2']")
		};

		this.elements.activationLink = document.createElement("li");
		with (this.elements.activationLink)
			{
			id = "userscript-settings-panel-activationlink";
			innerHTML = "<a href='#' onclick='return false;'>_@/</a>";
			}
		elements.target.appendChild(this.elements.activationLink);

		this.elements.activationLink.getElementsByTagName("a")[0].addEventListener("click",
			function(event)
			{
			with (Facebook.settingsPanel)
				{
				if (elements.container == null) { createPanel(); }
				if (!visible) { refreshPanelSettings(); }
				toggleDisplay();
				}
			}
		,true);

		},


	// -----------------------------------------------------------------------------
	// createPanel

		createPanel: function()
		{
		var elements = {
			target: document.getElementByXPath("//body")
		};

		// create settings panel css
		document.createStyleSheet(
		"div#userscript-settings-panel { background-color:white; border:1px solid #3b5998; display:none; height:240px; left:0px; padding:5px; position:absolute; top:0px; width:400px; z-index:999; } " +
		"div#userscript-settings-panel table { width:100%; } " +
		"div#userscript-settings-panel table thead tr th { border-bottom:1px solid #d8dfea; } " +
		"div#userscript-settings-panel table thead tr th h1 { margin-bottom:5px; } " +
		"div#userscript-settings-panel table tbody { padding-top:10px; } " +
		"div#userscript-settings-panel table tbody tr td table { margin-top:10px; } " +
		"div#userscript-settings-panel textarea { height:100px; white-space:nowrap; width:390px; } " +
		"div#userscript-settings-panel input[type=\"button\"] { width:60px; } " +
		"");

		// create settings panel html
		this.elements.container = document.createElement("div");
		with (this.elements.container)
			{
			id = "userscript-settings-panel";
			var sHTML = "" +
			"<table border=0 cellpadding=0 cellspacing=0>" +
			"<thead><tr><th><h1>Userscript Settings</h1></th></tr></thead>" +
			"<tbody>" +
				"<tr>" +
					"<td>" +
					"<table border=0 cellpadding=0 cellspacing=0>" +
						"<tr>" +
							"<td><input type='checkbox' id='userscript-setting-sidebar-expand' /></td>" +
							"<td colspan='2'><label for='userscript-setting-sidebar-expand'>Expand Sidebar Links</label></td>" +
						"</tr>" +
						"<tr>" +
							"<td><input type='checkbox' id='userscript-setting-sidebar-moveseparator' /></td>" +
							"<td><label for='userscript-setting-sidebar-moveseparator'>Move sidebar separator to below</label></td>" +
							"<td><select id='userscript-setting-sidebar-separatorposition'><option value=''>&nbsp;</option>";
							document.getElementsByXPath("//div[@id='sidebar_content']//div[@class='container_link']").forEach(function(oLink){ sHTML += "<option>" + oLink.innerHTML + "</option>"; });
							sHTML += "" +
							"</select></td>" +
						"</tr>" +
					"</table>" +
					"</td>" +
				"</tr>" +
				"<tr>" +
					"<td>" +
					"<table border=0 cellpadding=0 cellspacing=0>" +
						"<tr>" +
							"<td>" +
								"<label>Override Sidebar Link URLs</label><br />" +
								"<textarea id='userscript-setting-sidebar-separatorlinkredirects'></textarea>" +
							"</td>" +
						"<tr>" +
					"</table>" +
					"</td>" +
				"</tr>" +
				"<tr>" +
					"<td align='right'>" +
					"<table border=0 cellpadding=0 cellspacing=0>" +
						"<tr>" +
							"<td>" +
								"<input type='button' id='userscript-setting-okbutton' class='inputsubmit action' value='OK' />" +
								"&nbsp;&nbsp;" +
								"<input type='button' id='userscript-setting-cancelbutton' class='inputsubmit action' value='Cancel' />" +
							"</td>" +
						"<tr>" +
					"</table>" +
					"</td>" +

				"</tr>" +
			"</tbody>" +
			"</table>";
			"";
			innerHTML = sHTML;
			}
		elements.target.appendChild(this.elements.container);

		// attach event listeners
		with (this.elements.formControls)
			{
			okButton.addEventListener("click",
				function()
				{
				Facebook.settings.sideBar.expandLinks = Facebook.settingsPanel.elements.formControls.expandSidebarLinks.checked;
				Facebook.settings.sideBar.moveSeparator = Facebook.settingsPanel.elements.formControls.moveSidebarSeparator.checked;
				Facebook.settings.sideBar.separatorPosition = Facebook.settingsPanel.elements.formControls.sidebarSeparatorPosition.value;
				Facebook.settings.sideBar._linkRedirects = Facebook.settingsPanel.elements.formControls.sidebarLinkRedirects.value;
				Facebook.settingsPanel.toggleDisplay();
				}
			,true);
			cancelButton.addEventListener("click",
				function()
				{
				Facebook.settingsPanel.toggleDisplay();
				}
			,true);
			}
		},


	// -----------------------------------------------------------------------------
	// refreshPanelSettings

		refreshPanelSettings: function()
		{
		with (this.elements.formControls)
			{
			expandSidebarLinks.checked = this.parent.settings.sideBar.expandLinks;
			moveSidebarSeparator.checked = this.parent.settings.sideBar.moveSeparator;
			sidebarSeparatorPosition.value = this.parent.settings.sideBar.separatorPosition;
			sidebarLinkRedirects.value = this.parent.settings.sideBar._linkRedirects;
			}
		}


	},
// =============================================================================================




// ---------------------------------------------------------------------------------------------
// settings

	settings: {

		sideBar: {

			get expandLinks() { return GM_getValue("setting-sidebar-expandlinks", true); },
			set expandLinks(bValue) { GM_setValue("setting-sidebar-expandlinks", bValue); },

			get moveSeparator() { return GM_getValue("setting-sidebar-moveseparator", true); },
			set moveSeparator(bValue) { GM_setValue("setting-sidebar-moveseparator", bValue); },

			get separatorPosition() { return GM_getValue("setting-sidebar-separatorposition", ""); },
			set separatorPosition(sValue) { GM_setValue("setting-sidebar-separatorposition", sValue); },

			get _linkRedirects() { return GM_getValue("setting-sidebar-linkredirects", "Link Text|New Link URL"); },
			set _linkRedirects(sValue) { GM_setValue("setting-sidebar-linkredirects", sValue); },
			get linkRedirects()
			{
			var result = [];
			var a = this._linkRedirects.split(jsLF);
			a.forEach(function(s){ var a2 = s.split("|"); result.push({ text:a2[0] , URL:a2[1] }); });
			return result;
			}

		}

	},


	site: {

		get apps() { return (location.hostname == "apps.facebook.com"); },
		get channel() { return (location.hostname.indexOf(".channel") >= 0); },
		get www() { return (location.hostname == "www.facebook.com"); }

	},

	nowViewing: {

		get homePage() { return ((location.hostname == "www.facebook.com") && (location.href.indexOf("/home.php") > 0)); }

	},



	// ---------------------------------------------------------------------------------------------
	// autoLogin

	autoLogin: function()
	{
	// obtain an object reference to the login form
	var oForm = document.getElementByXPath("//form[@id='loginform']"); if (oForm == undefined) return;
	// obtain object references to the login form elements
	var oEMail = document.getElementByXPath("//form[@id='loginform']//input[@type='text' and @id='email']"); if (oEMail == undefined) return;
	var oPassword = document.getElementByXPath("//form[@id='loginform']//input[@type='password' and @id='pass']"); if (oPassword == undefined) return;
	var oButton = document.getElementByXPath("//form[@id='loginform']//input[@type='submit' and @value='Login']"); if (oButton == undefined) return;
	// ensure that the email and password boxes have values
	if ((oEMail.value == "") || (oPassword.value == "")) return;
	// submit the login form
	oButton.click();
	},


// ---------------------------------------------------------------------------------------------
// removeAds

	removeAds: function()
	{
	var a = [];

	// remove the left navigation advert if present
	a.push("//div[@id='sidebar_ads']");
	a.push("//div[@id='ssponsor']");

	// remove the application advert iframes
	if (this.site.apps)
		{
		a.push("//iframe[@width=645 and @height=58]");
		}

	// remove sponsored items from the news feed
	if (this.nowViewing.homePage)
		{
		a.push("//div[@class='feed_item clearfix social_ad']");
		a.push("//div[@class='feed_item clearfix ad_capsule']");
		}

	document.removeElementsByXPath(a.join(" | "));
	},


// ---------------------------------------------------------------------------------------------
// formatSidebar

	formatSidebar: function()
	{

	// expand the sidebar links to make the secondary application links visible
	if (this.settings.sideBar.expandLinks)
		{
		document.createStyleSheet("" +
		"div#expandable_more { display:block !important; padding-top:0px !important; } " +
		"");

		var oMoreLink = document.getElementByXPath("//a[@id='more_link']");
		oMoreLink.className = "expand_link less_apps";
		oMoreLink.innerHTML = "less";
		}

	// move the sidebar separator bar to below the specified link
	if ((this.settings.sideBar.moveSeparator) && (this.settings.sideBar.separatorPosition != ""))
		{
		var oTarget = document.getElementByXPath("//div[@id='sidebar']//div[@class='list_item'][div/a/div[@class='container_link'][contains(text(),'" + this.settings.sideBar.separatorPosition + "')]]");
		var oDivider = document.getElementByXPath("//div[@id='sidebar']//div[@class='divider_bar']");
		if ((oTarget != undefined) && (oDivider != undefined))
			{
			oTarget.parentNode.insertBefore(oDivider, oTarget.nextSibling);
			}
		}

	// redirect sidebar links to alternative urls if any are specified
	for ( var i = 0 ; i < this.settings.sideBar.linkRedirects.length ; i++ )
		{
		var oRedirect = this.settings.sideBar.linkRedirects[i];
		var oAnchor = document.getElementByXPath("//div[@id='sidebar']//div[@class='list_item']//a[div[contains(text(),'" + oRedirect.text + "')]]");
		oAnchor.href = oRedirect.URL;
		}

	},


// ---------------------------------------------------------------------------------------------
// onCreate

	onCreate: function()
	{
	if (this.site.channel) return;
	this.autoLogin();

	this.settingsPanel.parent = this;
	this.settingsPanel.createActivationLink();

	this.removeAds();
	this.formatSidebar();
	},

}
Facebook.onCreate();


