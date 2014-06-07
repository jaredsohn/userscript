// ==UserScript==

// @name DCD Favourites
// @description    Provides functionality of managing bookmarks
// @namespace      http://dcdnet.ru/*
// @include        http://dcdnet.ru/*
// @include        http://www.dcdnet.ru/*
// @include        http://cgiproxy.ersca.com/*

// ==/UserScript==
(function(){

    var chr = window.CSSHttpRequest = {};
    
    chr.id = 0;
    chr.requests = {};
    chr.MATCH_ORDINAL = /#c(\d+)/;
    chr.MATCH_URL = /url\("?data\:[^,]*,([^")]+)"?\)/;
    
    
    chr.get = function(url, callback) {
        logger.Log("CSS request "+url);
        var id = ++chr.id;
        var iframe = document.createElement( "iframe" );
        iframe.style.position = "absolute";
        iframe.style.left = iframe.style.top = "-1000px";
        iframe.style.width = iframe.style.height = 0;
        document.documentElement.appendChild(iframe);
        var r = chr.requests[id] = {
            id: id,
            iframe: iframe,
            document: iframe.contentDocument || iframe.contentWindow.document,
            callback: callback
        };
        
        r.document.open("text/html", false);
        r.document.write("<html><head>");
        r.document.write("<link rel='stylesheet' type='text/css' media='print, csshttprequest' href='" + chr.escapeHTML(url) + "' />");
        r.document.write("</head><body>");
        r.document.write("<script type='text/javascript'>");
        r.document.write("(function(){var w = window; var p = w.parent; p.CSSHttpRequest.sandbox(w); w.onload = function(){p.CSSHttpRequest.callback('" + id + "');};})();");
        r.document.write("</script>");
        r.document.write("</body></html>");
        r.document.close();
    };
    
    
    chr.sandbox = function(w) {
    };
        
    
    chr.callback = function(id) {
        var r = chr.requests[id];
		try
		{
			var data = chr.parse(r);
			r.callback(data);
		}
		catch(e)
		{
			r.callback("Ошибка: "+e);
		}
        window.setTimeout(function() {
            var r = chr.requests[id];
            try { r.iframe.parentElement.removeChild(r.iframe); } catch(e) {};
            delete chr.requests[id];
        }, 0);
    };
    
    chr.parse = function(r) {
        var data = [];
        
        // Safari, IE and same-domain Firefox
        try {
            var rules = r.document.styleSheets[0].cssRules || r.document.styleSheets[0].rules;
            for(var i = 0; i < rules.length; i++) {
                try {
                    var r = rules.item ? rules.item(i) : rules[i];
                    var ord = r.selectorText.match(chr.MATCH_ORDINAL)[1];
                    var val = r.style.backgroundImage.match(chr.MATCH_URL)[1];
                    data[ord] = val;
                } catch(e) {}
            }
        }
        
        // catch same-domain exception
        catch(e) {
            r.document.getElementsByTagName("link")[0].setAttribute("media", "screen");
            var x = r.document.createElement("div");
            x.innerHTML = "foo";
            r.document.body.appendChild(x);
            var ord = 0;
            try {
                while(1) {
                    x.id = "c" + ord;
                    var style = r.document.defaultView.getComputedStyle(x, null);
                    var bg = style["background-image"] || style.backgroundImage || style.getPropertyValue("background-image");
                    var val = bg.match(chr.MATCH_URL)[1];
                    data[ord] = val;
                    ord++;
                }
            } catch(e) {}
        }
        return decodeURIComponent(data.join(""));
    };
    
    
    chr.escapeHTML = function(s) {
        return s.replace(/([<>&""''])/g,
            function(m, c) {
                switch(c) {
                    case "<": return "&lt;";
                    case ">": return "&gt;";
                    case "&": return "&amp;";
                    case '"': return "&quot;";
                    case "'": return "&apos;";
                }
                return c;
            });
    };

var Preferences = 
{
    DropDownAlbumOpersIcon: function(){return "&#x2193;"},
    DropDownAddToHaveIcon: function(){return "&#x2208;"},
    CloseIcon: function(){return "[x]"},
    MoveIcon: function(){return "[::]"},
    DropDownButtonsBackground: function(){return "transparent";},
    DropDownButtonsBackgroundHighlighted: function(){return "lightgray";},
    DropDownButtonsForeground: function(){return "black";},
    DropDownButtonsForegroundHighlighted: function(){return "black";},
    VisibleRequestUserCount: function(){return 4;},

    FavouritesLinkTitle: "Избранное",
    FavouritesLinkId: "_a_vzhik_FavouritesWindowLink",
    FavouritesAddPageTitle: "+",
    FavouritesAddPageId: "_a_vzhik_AddCurrentPage",
    User: "olia",
    Server: "http://dcdnet.110mb.com/", 
    WaitImageUrl: "http://i54.tinypic.com/2a9ei5j.gif"//"http://i48.tinypic.com/rsejjr.jpg"
};

Array.prototype.Each = function(callback)
{
	for(var i = 0; i<this.length; i++)
	{
		callback(this[i]);
	}
	return this;
}

Array.prototype.Any= function(predicate)
{
	if(predicate == null)
	{
		return this.length > 0;
	}

	for(var i = 0; i<this.length; i++)
	{
		if(predicate(this[i]))
			return true;
	}
	
	return false;
}

Array.prototype.Select = function(func)
{
	var result = new Array();
	for(var i = 0; i<this.length; i++)
	{
		result[result.length] = func(this[i]);
	} 
	
	return result;
}

Array.prototype.Find = function(e)
{
	for(var i = 0; i < this.length; i++)
	{
		if(this[i] == e)
		{
			return true;
		}
	}
	
	return false;
}

Array.prototype.Distinct = function()
{
	newArray = new Array();
	for(var i = 0; i < this.length; i++)
	{
		if(!newArray.Find(this[i]))
		{
			newArray[newArray.length] = this[i];
		}
	}
	return newArray;
}

Array.prototype.Union = function(second)
{
	if(second == null)
	{
		return this;
	}
	
	if(!second.Any())
	{
		return this;
	}
	
	return this.concat(second).Distinct();
}

Array.prototype.Aggregate = function(seed, func)
{
	var result = seed;
	for(var i = 0; i<this.length; i++)
	{
		result = func(this[i], result);
	}
	return result;
}

String.prototype.Split = function(delimiter)
{
	var result = new Array();

 	last = 0; 
 	pos = this.indexOf(delimiter);
 	while ( pos != -1 ) 
	{
		result[result.length] = this.substring(last, pos);
		last = pos + delimiter.length;
		pos = this.indexOf(delimiter, last);
 	}
	result[result.length] = this.substring(last);

	return result;
}

String.Format = function(formatString)
{
	var result = new String(formatString);
	var pattern = /{\d+}/g;
	var matched = formatString.match(pattern); 
	if(arguments.length > 1 )
	{
		for(ii = 0; ii<matched.length; ii++)
		{
			formatIndex = new Number(matched[ii].substring(1, matched[ii].length-1));
			if(arguments.length<formatIndex)
			{
				throw "Invalid Index "+formatIndex;
			}
			result = result.replace(matched[ii], arguments[formatIndex+1]);
		}
	}
	return result;
}

String.IsNullOrEmpty = function(str)
{
	if(str == null)
	{
		return true;
	}
	return str.length == 0; 
}

var DomHelper = 
{
    XPath: function(query)
    {
        results = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	    converted = new Array(results.snapshotLength);
	    for (var i = 0; i < results.snapshotLength; i++) 
	    {
		    converted[i] = results.snapshotItem(i);
	    }		
	    return converted;
    },

    Select: function(id)
    {
	    return document.getElementById(id);
    },

    Remove: function(node)
    {
        var parent = node.parentNode;
        parent.removeChild(node);
    },

    CreateNode: function(nodeName, attributesHash)
    {
	    var newElement = document.createElement(nodeName);
	    if(attributesHash!=null)
	    {
		    for(attrName in attributesHash)
		    {
			    DomHelper.AddAttribute(newElement, attrName, attributesHash[attrName]);
		    }
	    }
	    return newElement;
    },

    CreateText: function(value)
    {
	    var newTextNode = document.createText(nodeName);
	    return newTextNode;
    },

    AddAttribute: function(element, name, value)
    {
	    var attr = document.createAttribute(name); 
	    attr.value = value;
	
	    element.attributes.setNamedItem( attr );

    },

    Attr: function(element, name, value)
    {
	    var attr = element.attributes.getNamedItem(name); 
	    if(value == null)
	    {
		    return (attr == null) ? null : attr.value;
	    }
	    else
	    {
		    if(attr == null)
		    {
			    DomHelper.AddAttribute(element, name, value);
		    }
		    else
		    {
			    attr.value = value;
		    }
	    }
    },

    RemAttr: function(element, name)
    {
	    element.attributes.removeNamedItem(name); 
    },

    FindPosX: function( e ) 
    {
            var curleft = 0;

            if (e.offsetParent) {
                while (1) {
                    curleft += e.offsetLeft;
                    if (!e.offsetParent) {
                        break;
                    }
                    e = e.offsetParent;
                }
            } else if (e.x) {
                curleft += e.x;
            }

            return curleft;
    },

    GetWindowScroll: function( w ) 
    {
        var s = {
            left: 0,
            top: 0
        };

        if (!w) w = window;
        var d = w.document;
        var de = d.documentElement;

        // most browsers
        if ( defined( w.pageXOffset ) ) {
            s.left = w.pageXOffset;
            s.top = w.pageYOffset;
        }

        // ie
        else if( de && defined( de.scrollLeft ) ) {
            s.left = de.scrollLeft;
            s.top = de.scrollTop;
        }

        // safari
        else if( defined( w.scrollX ) ) {
            s.left = w.scrollX;
            s.top = w.scrollY;
        }

        // opera
        else if( d.body && defined( d.body.scrollLeft ) ) {
            s.left = d.body.scrollLeft;
            s.top = d.body.scrollTop;
        }


        return s;
    },
};

var HtmlHelper = 
{
	Css: function(node, key, value){
		newCss = key+":"+value+";";
		node.style.cssText = node.style.cssText + newCss;
	},

	Html: function(node, value){
		if(value == null)
			return node.innerHTML;
		node.innerHTML = value;
	},

	Click: function(node, callback){
		node.addEventListener('click', callback, false);
	},
	
	Change: function(node, callback){
		node.addEventListener('change', callback, false);
	},

	Load: function(node, callback){
		node.addEventListener('load', callback, false);
	}
};

function Bookmark(sourceBookmark)
{
	this._id = sourceBookmark.id; 
	this._url = decodeURIComponent(sourceBookmark.url); 
	this._description = decodeURIComponent(sourceBookmark.description);
	var z = decodeURIComponent(sourceBookmark.labels);
	this._tags = z == '' ? new Array() : z.Split(',');
}

function onLoad()
{
/*
	DomHelper.XPath("//object").Each(function(node){
		alert("yy");
		node.appendChild(DomHelper.CreateNode("param", {name:"wmode", value:"transparent"}));
		alert(node.outerHTML);
	});
*/
	if(DomHelper.Select ("user_menu_2") == null)
	{
		return;
	}

	DomHelper.XPath("//embed").Each(function(node){
		DomHelper.Attr(node, "wmode","opaque");
		node.parentNode.insertBefore(DomHelper.CreateNode("param", {name:"wmode", value:"opaque"}), node);
		HtmlHelper.Css(node.parentNode, "z-index", "-1");

		var old = node.parentNode.innerHTML;
		var oldNode = node.parentNode;
		HtmlHelper.Html(oldNode, "");
		HtmlHelper.Html(oldNode, old);
		//alert(node.parentNode.outerHTML);		
	});

	favsNode = DomHelper.Select ("user_menu_2").appendChild( DomHelper.CreateNode("li") ); 

	var favsNodeHtml = String.Format("<span style='cursor:pointer' id='{0}'><u>{1}</u></span>&nbsp;(<span style='cursor:pointer' id='{2}'><u>{3}</u></span>)", 
		Preferences.FavouritesLinkId,
		Preferences.FavouritesLinkTitle, 
		Preferences.FavouritesAddPageId,
		Preferences.FavouritesAddPageTitle);
	
	HtmlHelper.Html(favsNode, favsNodeHtml);

	HtmlHelper.Click ( DomHelper.Select ( Preferences.FavouritesLinkId ), 
		function()
		{ 
			new ShowBookmarksWindow(new ShowBookmarksModel(CSSHttpRequest));
		}
	);

	HtmlHelper.Click ( DomHelper.Select ( Preferences.FavouritesAddPageId ), 
		function()
		{
			var model = new AddBookmarkModel(CSSHttpRequest);
			model.SetUrl(location.href);
			new AddBookmarkWindow(model, new ShowBookmarksModel(CSSHttpRequest));
		}
	);	
	
	logger.Log("Started");
}

function AddBookmarkModel(service)
{
	this._service = service;
	this._url = null;
	this._title = null;
	this._description = null;
}

AddBookmarkModel.prototype.SetUrl = function(url)
{
	this._url = url;
}

AddBookmarkModel.prototype.GetUrl = function()
{
	return this._url;
}

function AddBookmarkWindow(model, showBookmarksModel)
{
	this._model = model;
	this._showBookmarksModel = showBookmarksModel;

	this._addButtonId = "_a_vzhik_AddBookmarkWindowAddButton"; 
	this._closeButtonId = "_a_vzhik_AddBookmarkWindowCloseButton";
	this._windowId = "_a_vzhik_AddBookmarkWindow";
	this._urlInputId = "_a_vzhik_UrlInputId";
	this._descriptionInputId = "_a_vzhik_DescrInputId";
	this._tagsInputId = "_a_vzhik_TagsInputId";
	this._newTagInputId = "_a_vzhik_NewTagInputId";
	this._allTagsId = "_a_vzhik_AllTagsId";
	this._addTagId = "_a_vzhik_AddTagId";
	this._existTagClass = "_a_vzhik_ExistTag";
    this._requestDescriptionInputId = "_a_vzhik_RequestDescrInputId";
    this._waitImageId = "_a_vzhik_WaitImageId";
	// внутренняя функция инициализации.
	function Init(){
		if( DomHelper.Select( this._windowId ) != null)
		{
			return;
		}
	
		var shell = new Shell();
		var windowNode = shell.GetRegion();
	
		/*
		windowNode = DomHelper.CreateNode("div", 
			{"style":"display:block; position:absolute; left:100px; top:100px; width:700px; border:solid 3px #A4B4B6; background:#E0EAEB;font-size:14pt;padding-left:20px; padding-right:20px;", 
			 "id": this._windowId});
		
		windowNode =  document.body.appendChild(windowNode);
		*/
		var html = String.Format(
			"<table style='width:100%;font-size:10pt; ' cellpadding='5' ><tr><th width='100'></th><th width='20'></th><th></th></tr>"+
			"<tr valign='top'>"+
			"<td align='right'>{0}:</td>"+
			"<td colspan='2'>"+
			"<div style='border:solid 1px gray; background:white;'>"+
			"<input tabindex='1' id='{6}' style='margin:5px;border:none;width:95%;font-size:10pt;' onfocus='this.select()' onclick='this.select' value='{3}' />"+
			"</div>"+
			"</td>"+
			"</tr>"+
			"<tr valign='top'>"+
			"<td align='right'>{1}:</td>"+
			"<td colspan='2'>"+
			"<div style='background:white; border:solid 1px gray;'>"+
			"<table cellpadding='0' cellspacing='0' style='width:95%;margin:5px;'>"+ 
			"<tr>"+
			"<td width='20'>"+
			"<img src='http://www.iconsearch.ru/uploads/icons/ultimategnome/16x16/bottom.png' width='16' height='16' id='{9}' style='cursor:pointer;'/>"+
			"<img src='{10}' id='{11}'  width='16' height='16' style='display:none;'/>"+
			"</td>"+
			"<td>"+
			"<input style='width:100%; border: none; font-size:10pt;' onfocus='this.select()' onclick='this.select' id='{7}' />"+
			"</td>"+
			"</tr>"+
			"</table>"+
			"</div>"+
			"</tr>"+
			"<tr valign='top'>"+
			"<td align='right'>{2}:</td>"+
			"<td colspan='2'>"+
			"<div style='border:solid 1px gray; background:#eee;'>"+
			"<input style='border:none;width:95%;  background:#eee;color:black;margin:5px;font-size:10pt;' id='{8}' disabled='true' />"+
			"</div>"+
			"</td>"+
			"</tr>"+
			"<tr valign='top'>"+
			"<td align='right'>Новый тег:</td>"+
			"<td colspan='2'>"+
			"<table><tr>"+
			"<td width='200'>"+
			"<div style='border:solid 1px gray; background:white;'>"+
			"<input style='border:none;width:85%;margin:5px;font-size:10pt;' id='{12}' />"+
			"</div>"+
			"</td>"+
			"<td>"+
			"<img src='/style/add.png' id='{14}'>"+
			"</td>"+
			"</tr>"+
			"<tr>"+
			"<td colspan='2' id='{13}'>"+
			"</td>"+
			"</tr></table>"+
			"</td>"+
			"</tr>"+
			"<tr>"+
			"<td colspan='3' align='center' >"+
			"<input type='image' id='{5}' style='cursor:pointer;border:none' src='/style/save-white.png' alt='Сохранить'>"+
			"</td>"+
			"</tr>", 
			"Адрес", "Описание", "Теги", this._model.GetUrl(), this._closeButtonId, this._addButtonId, this._urlInputId, 
            this._descriptionInputId, this._tagsInputId, this._requestDescriptionInputId, 
			Preferences.WaitImageUrl, this._waitImageId, this._newTagInputId, this._allTagsId, this._addTagId);

		HtmlHelper.Html(windowNode, html);

		var wnd = this;

		this._showBookmarksModel.Refresh(function(){
			var tagPattern = "<span data='{0}' class='"+this._existTagClass+"' style='color:#597377;cursor:pointer;'>{0}</span>";
			var result = wnd._showBookmarksModel.GetAllTags().Aggregate("", function(item, result){
				if(String.IsNullOrEmpty(result) == false){
					result+=", ";
				}
				return result += String.Format(tagPattern, item);
			});
			HtmlHelper.Html(DomHelper.Select(wnd._allTagsId), result);
			
			var selector = String.Format("//*[@class='{0}']", this._existTagClass)
			DomHelper.XPath(selector).Each(function(node) {
				HtmlHelper.Click(node, function(){
					AppendTag.call(wnd, DomHelper.Attr(node, "data"));
				});
			});
		});

		HtmlHelper.Click(DomHelper.Select(wnd._addTagId), 
            function(node){
				var newTag = DomHelper.Select(wnd._newTagInputId).value;		
				AppendTag.call(wnd, newTag);
				DomHelper.Select(wnd._newTagInputId).value='';
			});
		
        HtmlHelper.Click(DomHelper.Select(wnd._requestDescriptionInputId), 
            function(){
                DomHelper.Attr(DomHelper.Select(wnd._descriptionInputId), "disabled", "true");
                HtmlHelper.Css(DomHelper.Select(wnd._descriptionInputId), "background", "white");
				
                DomHelper.Select(wnd._descriptionInputId).value = "";
                HtmlHelper.Css(DomHelper.Select(wnd._waitImageId), "display", "block");
                HtmlHelper.Css(DomHelper.Select(wnd._requestDescriptionInputId), "display", "none");

		        Ajax.Request(
                    DomHelper.Select(wnd._urlInputId).value, 
				    function(html){
					    var title = html.match("<title>(.*)</title>", "i");
					    if(title != null)
					    {
						    DomHelper.Select(wnd._descriptionInputId).value = title[1];
					    }
                        DomHelper.RemAttr(DomHelper.Select(wnd._descriptionInputId), "disabled");
                        HtmlHelper.Css(DomHelper.Select(wnd._waitImageId), "display", "none");
                        HtmlHelper.Css(DomHelper.Select(wnd._requestDescriptionInputId), "display", "block");
				    }, 
                    function(){

                        var requestUrl = String.Format("{0}getPageTitle.php?url={1}", 
                            Preferences.Server, 
                            encodeURIComponent(DomHelper.Select(wnd._urlInputId).value));

                        CSSHttpRequest.get(requestUrl, function(response){
							DomHelper.Select(wnd._descriptionInputId).value = response;
							DomHelper.RemAttr(DomHelper.Select(wnd._descriptionInputId), "disabled");
							HtmlHelper.Css(DomHelper.Select(wnd._waitImageId), "display", "none");
							HtmlHelper.Css(DomHelper.Select(wnd._requestDescriptionInputId), "display", "block");
                        });
                    });	                
            });
	
		HtmlHelper.Click( DomHelper.Select(this._addButtonId), 
			function(){
				url = String.Format("{0}add.php?user={1}&url={2}&descr={3}&labels={4}", 
                                    Preferences.Server,
									encodeURIComponent(Preferences.User), 
									encodeURIComponent(DomHelper.Select(wnd._urlInputId).value), 
									encodeURIComponent(DomHelper.Select(wnd._descriptionInputId).value), 
									encodeURIComponent(DomHelper.Select(wnd._tagsInputId).value.toLowerCase()));
				alert(url);
				CSSHttpRequest.get(
					url, 
					function(response){
					}
				);				
			}
		);
		
		return; 
	}

	function AppendTag(newTag)
	{
		if(String.IsNullOrEmpty(newTag) == true){
			return;
		}
		
		var all = DomHelper.Select(this._tagsInputId);
		if(String.IsNullOrEmpty(all.value) == false){
			all.value += ",";
		}
		all.value += newTag;	
	}
	
	Init.call(this); 	

	return ;	
}

function ShowBookmarksModel(service){
	this._bookmarks = null;
	this._tags = null;
	this._service = service;
};

ShowBookmarksModel.prototype.GetBookmarks = function(){
	return this._bookmarks;
};

ShowBookmarksModel.prototype.GetAllTags = function(){
	return this._tags;
};

ShowBookmarksModel.prototype.Refresh = function(callback){
	var url = String.Format("{0}get.php?user={1}", 
						Preferences.Server,
						encodeURI(Preferences.User));	
	var model = this;
	this._service.get(
		url, 
		function(response){
			var tagsMap = new Array();
			// Декодируем данные с сервера.
			var bookmarks = eval('('+response+')')
				.bookmarks
				.Select(function(encodedBookmark){
					var b = new Bookmark(encodedBookmark);
					tagsMap = tagsMap.Union(b._tags);
					return b;
				});
			model._bookmarks = bookmarks; 
			model._tags = tagsMap;
			callback(model);
	});
};

ShowBookmarksModel.prototype.RemoveBookmark = function(id, callback){
	var removeUrl = String.Format("{0}remove.php?user={1}&bookmark={2}", 
		Preferences.Server,
		encodeURI(Preferences.User), 
		encodeURIComponent(id));
	var model = this.model;
	this._service.get(removeUrl, function(response){callback(model);});
};


function ShowBookmarksWindow(model)
{
	this._closeButtonId = "_a_vzhik_ShowBookmarksWindowCloseButton"; 
	this._windowId = "_a_vzhik_ShowBookmarksWindow";
	this._tagsDivId = "_a_vzhik_TagsDiv";
	this._bookmarksDivId = "_a_vzhik_BookmarksDiv";
	this._bookmarkDivId = "_a_vzhik_BookmarkDiv";
	this._model = model;
	// внутренняя функция инициализации.
	function Init(){
		
		var shell = new Shell();

		var html = String.Format(
			"<div id='{0}' style='font-size:10pt; margin-bottom: 10px;'></div>"+
			"<div id='{1}'><center><img src='{2}'/></center></div>",
			this._tagsDivId, 
			this._bookmarksDivId, 
			Preferences.WaitImageUrl
		);

		HtmlHelper.Html(shell.GetRegion(), html);
		
		var wnd = this;
		this._model.Refresh(function(){
			wnd.AppendBookmarks();
			wnd.AppendTags();
			wnd.RegisterRemoveBookmarkHandler();
			wnd.RegisterTagClickHandler();
		});		
		
		return; 
	}
	Init.call(this); 	
	return ;		
}

ShowBookmarksWindow.prototype.AppendBookmarks = function(){
	var view = this;
	var container = DomHelper.Select(this._bookmarksDivId);
	HtmlHelper.Html(container, "");

	view._model.GetBookmarks().Each(function(bookmark){
		var newNode = DomHelper.CreateNode("div", 
			{	
				class:view._bookmarkDivId, 
				width:"100%", 
				style:"font-size:10pt; border:1px double #A4B4B6; margin:5px 0px; padding:5px; background:white;",
				tagsData: bookmark._tags.join(", ")
			});
		container.appendChild(newNode);
		
		var correctedDescription = String.IsNullOrEmpty(bookmark._description) ? bookmark._url : bookmark._description;
		var html = String.Format(
			"<div style='float:right; padding:3px; height:100%; cursor:pointer;' data='{3}' class='removeBookmark'><img src='/style/remove.png'/></div>"+
			"<div style='overflow:hidden;height:35px; ' >"+ 
			"<a href='{0}' style='color:#597377;'>{1}</a>"+
			"</div>"+
			"<div style='font-size:8pt;'>{2} &nbsp;</div>",
			bookmark._url, 
			correctedDescription, 
			bookmark._tags.join(", "), 
			bookmark._id);
			
		HtmlHelper.Html(newNode, html);
	});

}

ShowBookmarksWindow.prototype.AppendTags = function (){
	var tagsContainer = DomHelper.Select(this._tagsDivId);
	var tagPattern = "<span class='tagAction'"+
					 "		style='cursor:pointer;color:#597377;'"+
					 "		onmouseout='this.style.textDecoration=\"none\"' "+
					 "		onmouseover='this.style.textDecoration=\"underline\"' "+
					 "		tagsData='{0}'>{1}</span>";
	var nullTag = "Фильтр по тегам: " + String.Format(tagPattern, "", "все теги");
	HtmlHelper.Html(
		tagsContainer, 
		this._model.GetAllTags().Aggregate(nullTag, function(tag, result){
				var tagText = String.Format(tagPattern, tag, tag);
				return String.Format("{0}, {1}", result, tagText);
		}));	
	
}

ShowBookmarksWindow.prototype.RegisterRemoveBookmarkHandler = function (){
	var view = this;
	DomHelper
		.XPath("//*[@class='removeBookmark']")
		.Each(function(node){		
			HtmlHelper.Click(node, function(){
				var remNode = node.parentNode;
				HtmlHelper.Html(remNode, String.Format("<center><img src='{0}'/></center>", Preferences.WaitImageUrl));
				view._model.RemoveBookmark(DomHelper.Attr(node, "data"), function(){
					DomHelper.Remove(remNode);
				});
			});
		});	
};
	
ShowBookmarksWindow.prototype.RegisterTagClickHandler = function (){
	var view = this;
	DomHelper
		.XPath("//*[@class='tagAction']")
		.Each(function(n){
			
			// Запоминаем тег, с которым связан узел.
			var filter = DomHelper.Attr(n, "tagsData"); 

			// Устанавливаем обработчик клика на теге.
			HtmlHelper.Click(n, function(){
				// Отбираем узлы всех закладок. 
				DomHelper
					.XPath(String.Format("//*[@class='{0}']", view._bookmarkDivId))
					.Each(function(node){
						// Закладка могла быть скрытой - поэтому делаем ее видимой
						HtmlHelper.Css(node, "display", "block");
						// И проверям соответствует ли закладка фильтру.
						if(DomHelper.Attr(node,"tagsData").indexOf(filter) < 0)
						{
							// Если нет - прячем.
							HtmlHelper.Css(node, "display", "none");
						}
					});
			});
		});	
};

function Shell(){

	this._closeButtonId = "_a_vzhik_HostWindowCloseButton";
	this._windowId = "_a_vzhik_ShellWindow";
	this._regionId = "_a_vzhik_Region";
	
	function Init(){
		if( DomHelper.Select( this._windowId ) != null)
		{
			return;
		}
		var wnd = this;
		var deactivatorNode = DomHelper.CreateNode("div", 
			{
				style:"position:absolute; z-index:999; top:0px; left:0px; background:white; width:100%; height:100%; opacity:0.8;",
			});
		deactivatorNode = document.body.appendChild(deactivatorNode);
	
		var windowNode = DomHelper.CreateNode("table", 
			{
				style:"position:absolute; z-index:999; left:0px; top:100px; width:100%; height:100%;", 
				id:this._windowId
			});
		windowNode =  document.body.appendChild(windowNode);
		
		var html = String.Format(
			"<tr valign='top'>"+
			"<td align='center'>"+
			"<div style='width:500px;text-align:left;border:solid 2px #A4B4B6; background:#eee;padding-left:10px; padding-right:10px;padding-bottom:10px;'>"+
			"<div align='right' style='margin-top:5px; font-size:10pt'><span style='cursor:pointer;' id='{0}'>[x]</span></div>"+
			"<div id='{1}'></div>"+
			"</div>"+
			"</td>"+
			"</tr>",
			this._closeButtonId,
			this._regionId
		);
		HtmlHelper.Html(windowNode, html);

		HtmlHelper.Click( DomHelper.Select(this._closeButtonId), 
			function(){
				DomHelper.Remove(DomHelper.Select(wnd._windowId));
				DomHelper.Remove(deactivatorNode);
			}
		);			
	}
	
	Init.call(this);
};


Shell.prototype.GetRegion = function(){
		return DomHelper.Select(this._regionId);
	};

var Ajax = {
	xhrOtherBrowsers: function(options) {
		var request = new XMLHttpRequest(), 
			validEvents = { onreadystatechange: null };

		// add event listeners
		for (var eventName in validEvents) 
		{
			var callbackFunction = options[eventName];
			if(callbackFunction)
			{
				request[eventName] = function(){
					callbackFunction.call(null, request);
				};
			}
		}

		request.open(options.method, options.url, true);
		for (var header in options.headers) 
		{
			request.setRequestHeader(header, options.headers[header]);
		}
		
		// send the data
		request.send(options.data);
		return request;
	},

	// simplified version
	Request: function(url, callback, callbackerror, postfields)
	{
		var options = {
			'url':url+"?hash="+Math.random(),
			'method':( !postfields ? 'GET' : 'POST' ),
			'headers':{ 'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20080404'
					  },
			'onreadystatechange':function(request)
			{
				if(request.readyState == 4 )
				{
					logger.Log("Response status: "+request.status);
					((request.status == 200)||(request.status == 302)) ? callback(request.responseText) : callbackerror(request.responseText);
				}
			}
		};
		if (postfields!=null)
		{
			var postdata = '';
			// alert('length '+postfields.length );
			for ( n in postfields )
			{
				postdata += '&' + n + '=' + encodeURIComponent(postfields[n]);
			}
			data = postdata.substr(1);
			options.headers["Content-type"] = "application/x-www-form-urlencoded";
			//a_vzhik: хехехе, вот тут была ошибка. postdata содержит в себе 
			//         лишний символ '&' в начале строки 
			//options.headers["Content-length"] = postdata.length;
			options.headers["Content-length"] = data.length;
			//options.data = postdata;
			options.data = data; 
			//alert('postdata: '+data);
		}

		logger.Log("Sending "+options.method+" request to: "+url);
		logger.Log("Params: "+options.data);
		
		try
		{
			if(window.GM_xmlhttpRequest)
			{
				GM_xmlhttpRequest(options);
			}
			else
			{
				Ajax.xhrOtherBrowsers(options);
			}
		}
		catch(e)
		{
			logger.Log(e.message);
			callbackerror(e.message);
		}
	}
}

function VirtualClassEmulator(parent, prop) {
  // Dynamically create class constructor.
  var clazz = function() {
    // Stupid JS need exactly one "operator new" calling for parent
    // constructor just after class definition.
    if (clazz.preparing) return delete(clazz.preparing);
    // Call custom constructor.
    if (clazz.constr) {
      this.constructor = clazz; // we need it!
      clazz.constr.apply(this, arguments);
    }
  }
  clazz.prototype = {}; // no prototype by default
  if (parent) {
    parent.preparing = true;
    clazz.prototype = new parent;
    clazz.prototype.constructor = parent;
    clazz.constr = parent; // BY DEFAULT - parent constructor
  }
  if (prop) {
    var cname = "constructor";
    for (var k in prop) {
      if (k != cname) clazz.prototype[k] = prop[k];
    }
    if (prop[cname] && prop[cname] != Object)
      clazz.constr = prop[cname];
  }
  return clazz;
}

function defined( x ) {
    return x === undefined ? false : true;
}

// Базовый "класс" документа.
BaseDoc = VirtualClassEmulator(null, {
	constructor: function(ai) {
		this.m_wnd = null;

		this.m_state = null; //||'yes'||'no'
		this.m_albumInfo = ai;
		this.m_objState = (ai == null)?'justCreated':'responseReceived';//'sendingRequest'||'responseReceived';
  
	},
	SetAI: function(ai) { 
		this.m_albumInfo = ai;
	},
	IsJustCreated: function(){
		return (this.GetDocState()=='justCreated');
	},
	
	IsSendingRequest: function(){
		return (this.GetDocState()=='sendingRequest');
	},
	IsResponseReceived: function(){
		return (this.GetDocState()=='responseReceived');
	},	
	GetDocState: function(){
		return this.m_objState ;
	},
	SetDocState: function(s){
		this.m_objState = s;
		return this;
	},
	SetSendingRequestState:  function(){
		this.SetDocState('sendingRequest');
		return this;
	},	
	SetResponseReceivedState:  function(){
		this.SetDocState('responseReceived');
		return this;
	}
	
});

function Dragger()
{
	this._capturedWnd = null;
	this._lastDragPoint = null;
}

Dragger.prototype.Capture=function(wnd, point)
{
	this._capturedWnd = wnd;
	this._lastDragPoint = point;
	logger.Log("Capture:"+this._lastDragPoint.x+";"+this._lastDragPoint.y);
	
	document.addEventListener('mousemove', Dragger.Drag, false);
	document.addEventListener('mouseup', function(e){dragger.Release();}, false);
};

Dragger.prototype.Release=function()
{
	logger.Log("Release:"+this._capturedWnd.m_albumLink);
	this._capturedWnd = null;
	document.removeEventListener('mousemove', Dragger.Drag, false);
};

Dragger.Drag = function(e)
{
	if(dragger._capturedWnd != null)
	{
		logger.Log("Drag: "+e.pageX+";"+e.pageY);	
		dx = e.pageX-dragger._lastDragPoint.x;
		dy = e.pageY-dragger._lastDragPoint.y;
		dragger._capturedWnd.ShiftWindow(dx, dy);
		dragger._lastDragPoint={x:e.pageX, y:e.pageY};//dx;
		e.preventDefault();
		return false; 
	}
};

// Базовый "класс" логгера.
LoggerBase = VirtualClassEmulator(null, {
	constructor: function() {
		this.Inject();
	},
	Inject: function() { 
	},
	Log: function(s){
	}
});

DebugLogger = VirtualClassEmulator(LoggerBase, {
	constructor: function() {
		this.constructor.prototype.constructor.call(this);
	},
	Inject: function() { 
		newElement = DomHelper.CreateNode("div", {"style": "width:80%; background:black; color:#00DD00; font-size:8pt; font-family:Courier New; height:200px;overflow:scroll;", "id":"loggerWindow"});
		document.body.appendChild(newElement);
		loggerWnd = document.getElementById("loggerWindow");	
	},
	Log: function(s){
		loggerWnd = document.getElementById("loggerWindow");
		if(loggerWnd == null)
		{
			throw "Didn't found logger window";
		}
		
		loggerWnd.innerHTML += s+"<br/>";	
	}	
});

ReleaseLogger = VirtualClassEmulator(LoggerBase, {
	constructor: function() {
		this.constructor.prototype.constructor.call(this);
	},
	Inject: function() { 
	},
	Log: function(s){
	}	
});

var logger = new ReleaseLogger();
var dragger = new Dragger();

// var style = document.createElement('style');
// style.type = 'text/css';
// style.innerHTML = '._a_vzhik_ShowBookmarkWndTag { color: #F00; }';
// document.getElementsByTagName('head')[0].appendChild(style);

window.addEventListener('load', onLoad, false);
})();