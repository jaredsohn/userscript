// coding: utf-8
// ==UserScript==
// @name        SmarTwitter
// @namespace   smartwitter
// @author		oliezekat
// @description	Simple, Fast, So Smart !
// @icon		http://s3.amazonaws.com/uso_ss/icon/235710/large.png
// @downloadURL	https://userscripts.org/scripts/source/235710.user.js
// @updateURL	http://userscripts.org/scripts/source/235710.meta.js
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @exclude		http://twitter.com/i/cards/*
// @exclude		https://twitter.com/i/cards/*
// @version     3
// @grant		GM_addStyle
// @grant		GM_log
// ==/UserScript==

/**************************************************************************************************

LAST CHANGES:
- Fix to ignore Twitter cards.
- Display compact list of user lists.
 
PREVIOUS CHANGES:
http://userscripts.org/topics/168171
 
**************************************************************************************************/

// Unique object
if (!SmarTwitter) var SmarTwitter = {};

SmarTwitter =
	{
	/* Requires modules */
	Log:			 {},
	DOM:			 {},
	Twitter:		 {},
	Renders:		 {},
	
	_LastTemplateType: 'unknown'
	};
SmarTwitter.Init = function()
	{
	/* Init Log */
	this.Log.Init(this);
	this.Log._Enabled = false;
	this.Log.Add('Start...');

	this.DOM.Init(this);
	this.Twitter.Init(this);
	this.Renders.Init(this);
	
	// Common features
	this.Renders.Set_Common_Styles();
	this.Renders.Set_NoVisualEffects_Styles();
	
	this._LastTemplateType = this.Twitter.Get_TemplateType();
		
	this.Log.Add('End.');
	};

SmarTwitter.Log =
	{
	_Parent: null,
	_Enabled: false
	};
SmarTwitter.Log.Init = function(parent)
	{
	this._Parent = parent;
	};
SmarTwitter.Log.Add = function(msg)
	{
	if (this._Enabled == true)
		{
		GM_log(msg);
		}
	};

SmarTwitter.DOM =
	{
	_Parent: null
	};
SmarTwitter.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};

SmarTwitter.Twitter =
	{
	_Parent: null
	};
SmarTwitter.Twitter.Init = function(parent)
	{
	this._Parent = parent;
	};
SmarTwitter.Twitter.Get_TemplateType = function()
	{
	var TemplateType = 'unknown';
	var DocumentURL = document.URL;
	var URLparts = DocumentURL.split('/');
	if ((URLparts.length >= 4) && (URLparts[3] != ''))
		{
		// Todo
		}
	this._Parent.Log.Add('TemplateType: '+TemplateType);
	return TemplateType;
	};

SmarTwitter.Renders =
	{
	_Parent:			 null
	};
SmarTwitter.Renders.Init = function(parent)
	{
	this._Parent = parent;
	};
SmarTwitter.Renders.Set_Common_Styles = function()
	{
	var default_style = '\
	/* Lists box */\
	#list-membership-dialog-dialog {\
		left:1% !important;\
		top:2% !important;\
		width:98%;\
		}\
	#list-membership-dialog-body ul li {\
		display: inline-block;\
		overflow: hidden;\
		padding-left: 12px;\
		text-overflow: ellipsis;\
		white-space: nowrap;\
		width: 150px;\
		}\
	.list-membership-container .sm-lock {\
		float: left;\
		margin-left: -12px;\
		margin-top: 3px;\
		}\
	/* User Lists page */\
	.list {\
		padding: 2px 12px;\
		}\
	.list .avatar {\
		top: 5px;\
		}\
	.list .bio {\
		display: none;\
		}\
	.list:hover .bio {\
		display: block;\
		}\
	/* Misc */\
	.user-actions-follow-button {\
		min-width:112px;\
		}\
	#profile_popup-dialog {\
		top:2% !important;\
		}\
	/* Twitter bugs fixes */\
	.js-macaw-cards-iframe-container iframe {\
		height:auto;\
		}\
	';
	GM_addStyle(default_style);
	};
SmarTwitter.Renders.Set_NoVisualEffects_Styles = function()
	{
	var default_style = '\
	* {\
		border-radius:none !important;\
		border-bottom-left-radius: 0 !important;\
		border-bottom-right-radius: 0 !important;\
		border-top-left-radius: 0 !important;\
		border-top-right-radius: 0 !important;\
		box-shadow: none !important;\
		opacity: 1 !important;\
		text-shadow: none !important;\
		}\
	.btn {\
		background-image:none;\
		}\
	.global-dm-nav.new.with-count-2 .dm-new {\
		width:20px;\
		left:9px;\
		font-size:10px;\
		height:11px;\
		line-height:12px;\
		top:-6px;\
		}\
	.image-selector .file-input {\
		opacity: 0 !important;\
		}\
	';
	GM_addStyle(default_style);
	};

SmarTwitter.Init();