// ==UserScript==
// @name           Habrahabr.ru comments folder/expander
// @namespace      http://tbms.ru/habr/comments/
// @description    Improves comment manipulations.Adds buttons [+/-] to collapse and expand collapsed comment threads
// @author         pietrovich.habrahabr.ru
// @author         yfka.habrahabr.ru
// @include        http://*.habrahabr.ru/blog/*
// @include        http://*.habrahabr.ru/blogs/*
// @include        http://habrahabr.ru/blog/*
// @include        http://habrahabr.ru/blogs/*
// @version 		0.2
// ==/UserScript==

//
//	adopted for Greasemokey script from yfka.habrahabr.ru
//  http://yfka.habrahabr.ru/blog/47530/
//

// if the browser doesn't support the GM functions
if(typeof(GM_addStyle) == 'undefined') var GM_addStyle = function(param){};

var HabraFolder = {
	gc_sImgMinus : "http://img72.imageshack.us/img72/4417/minusec5.png",//"minus.png",
	gc_sImgPlus : "http://img201.imageshack.us/img201/5002/plusow3.png",//"plus.png",
	gc_sWidth : "9",
	gc_sHeight : "9",

	/**
	 * ���������� ����
	 * @param {HTMLElement} tag
	 */
	showTag : function(tag1)
	{
	 	tag1.style.setProperty("display", "block", null);
	},
	/**
	 * �������� ����
	 * @param {HTMLElement} tag
	 */
	hideTag : function (tag2)
	{
	 	tag2.style.setProperty("display", "none", null);
	},
	/**
	 * return next sibling of tag ignoring text nodes
	 * @param {Element} tag
	 * @return {Element} next sibling (TEXT nodes ignored)
	 */
	LookupNextSibling : function(tag3)
	{
		if ('undefined' == typeof(tag3) || null == tag3) return null;
		tag3 = tag3.nextSibling;
		if (typeof(tag3) != 'undefined' &&  tag3 != null)
		{
			while (typeof(tag3) != 'undefined' && null != tag3 && tag3.nodeType == 3)
			{ 	// Fix for Opera/FireFox Empty Space becomes a TextNode
				tag3 = tag3.nextSibling;
			}
		}
		return tag3;
	},
	/**
	 * toggles (hide/show) comment text of sender and all the nested comments
	 * @param {Element} sender
	 * @param {Function} func function that perform actions on tags -- specifies action: hide/show
	 */
	ToggleTags : function(sender, func)
	{
		var li = sender.parentNode;
		var ul = li.parentNode;
		var divMsgMeta = ul.parentNode;
		var divEntryContent = this.LookupNextSibling(divMsgMeta);
		if (null != divEntryContent)
		{
	 		func(divEntryContent);
		}
		var divReplyForm = this.LookupNextSibling(divEntryContent);
		if (null != divReplyForm)
		{
			func(divReplyForm);
		}
		var ulChilds = this.LookupNextSibling(divReplyForm);
		if (ulChilds != null)
		{
			func(ulChilds);
		}
	},
	/**
	 *
	 * @param {Element} sender <img> placeholder with minus/plus .png source
	 */
	habrCollapseComments : function(sender)
	{
		sender.setAttribute("_src", this.gc_sImgPlus);
		sender.setAttribute("class", "habr_plusminus habr_plus");
		this.ToggleTags(sender, this.hideTag);

	},
	/**
	 *
	 * @param {Element} sender <img> placeholder with minus/plus .png source
	 */
	habrExpandComments : function(sender)
	{
		sender.setAttribute("_src", this.gc_sImgMinus);
		sender.setAttribute("class", "habr_plusminus habr_minus");
		this.ToggleTags(sender, this.showTag);
	},
	/**
	 *
	 * @param {Element} sender <img> placeholder with minus/plus .png source
	 * @return {Boolean} returns true if action: collapse false otherwise
	 */
	IsCollapse : function(sender)
	{
		return (sender.getAttribute("_src") == this.gc_sImgMinus);
	},
	//
	//
	// sender --
	//
	/**
	 * toggles (hide/show) comment text of sender and all the nested comments
	 *
	 * @param {Element} sender <img> placeholder with minus/plus .png source which is actually fires the onClick event
	 */
	habrToggleComments : function(sender)
	{
		if (this.IsCollapse(sender))
		{
			this.habrCollapseComments(sender);
		}
		else
		{
			this.habrExpandComments(sender);
		}
	},
	/**
	 * returns all the child nodes of rootNode with class containing sSearchClass and tag named sTag
	 * if sTag is null assumes that sTag is div
	 * @param {String} sSearchClass searched class name
	 * @param {Element} rootNode start node
	 * @param {Sting} sTag tag mane
	 * @return {Element[]} found elements
	 */
	getTagsByClass : function(sSearchClass, rootNode, sTag)
	{
		if ( rootNode == null )
			rootNode = document;
		if (sTag == null)
			sTag = "div";

		var arClassDivs = new Array();
		var arAllDivs = rootNode.getElementsByTagName(sTag);
		var nNumOfDivs = arAllDivs.length;
		var pattern = new RegExp( "(^|\\s)" + sSearchClass + "(\\s|$)" );
		for (i = 0, j = 0; i < nNumOfDivs; i++)
		{
			if ( pattern.test(arAllDivs[i].className) )
			{
				arClassDivs[j] = arAllDivs[i];
				j++;
			}
		}

		return arClassDivs;
	},
	/**
	 *
	 * @param {HTMLElement} control
	 * @param {String} eventType
	 * @param {Function} handlerFunc
	 */
	setEventHandler : function(control, eventType, handlerFunc)
	{
		if (control.attachEvent)
		{
			control.attachEvent ("on" + eventType, handlerFunc);
		}

		if (control.addEventListener)
		{
			control.addEventListener (eventType, handlerFunc, false);
		}
	},
	/**
	 *
	 */
	habrSetupMinusPlusHandlers : function()
	{
		var elComments = document.getElementById("comments")
		var arPostHeadDivs = this.getTagsByClass("msg-meta", elComments, null);
		if (arPostHeadDivs != null)
		{
			var nLen = arPostHeadDivs.length;
			if (nLen > 0)
			{
				for ( i = 0; i < nLen; i++)
				{
					var arUl = arPostHeadDivs[i].getElementsByTagName("ul");
					var li = document.createElement("li");
					var li_img = document.createElement("div");
					li_img.setAttribute("_src", this.gc_sImgMinus);					// placeholder for event
					//li_img.setAttribute("alt", "");
					//li_img.setAttribute("width", this.gc_sWidth);
					//li_img.setAttribute("heght", this.gc_sHeight);

					li_img.setAttribute("class", "habr_pm_button habr_plusminus habr_minus"); 	// actual picture
					li_img.setAttribute("onClick", "HabraFolder.habrToggleComments(this);" );

					li.appendChild(li_img);

					arUl[0].insertBefore(li, arUl[0].getElementsByTagName("li")[0] );
				}
			}
		}
	}
}



//-------------------------------------------------------------------------------------------------
// setup button addition function as an onLoad event handler for document
//setEventHandler(document, "Load", habrSetupMinusPlusHandlers);
unsafeWindow.HabraFolder = HabraFolder;
GM_addStyle(".habr_pm_button { height: "+ HabraFolder.gc_sHeight+"; width: "+HabraFolder.gc_sWidth+" }");
GM_addStyle("ul.hentry li.comment_holder { border-left: dotted 1px #DDD; }");
GM_addStyle("ul.hentry li.comment_holder .entry-content{ margin-left: 10px; }");
GM_addStyle(".habr_plusminus { float:left; list-style-image:none; list-style-position:outside; list-style-type:none; background-position: left top; width:15px; height:9px; cursor:pointer; }");
GM_addStyle("ul.hentry li.comment_holder .habr_minus { background: url("+HabraFolder.gc_sImgMinus+") no-repeat ; }");
GM_addStyle("ul.hentry li.comment_holder .habr_plus { background: url("+HabraFolder.gc_sImgPlus+") no-repeat ; }");

window.addEventListener('load', function(event) {
	HabraFolder.habrSetupMinusPlusHandlers();
}, false);
