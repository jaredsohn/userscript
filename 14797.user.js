// ==UserScript==
// @name           TumblrReblogInLDR
// @namespace      http://d.hatena.ne.jp/kasei_san/
// @include        http://reader.livedoor.com/reader/*
// ==/UserScript==
//
/*
# Version: MPL 1.1/GPL 2.0/LGPL 2.1
#
# The contents of this file are subject to the Mozilla Public License Version
# 1.1 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
# http://www.mozilla.org/MPL/
#
# Software distributed under the License is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
# for the specific language governing rights and limitations under the
# License.
#
# The Initial Developer of the Original Code is
# kasei san <kasei.san*gmail.com>
# Portions created by the Initial Developer are Copyright (C) 2007
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#   kasei_san http://d.hatena.ne.jp/kasei_san/
#
# Alternatively, the contents of this file may be used under the terms of
# either the GNU General Public License Version 2 or later (the "GPL"), or
# the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
# in which case the provisions of the GPL or the LGPL are applicable instead
# of those above. If you wish to allow use of your version of this file only
# under the terms of either the GPL or the LGPL, and not to allow others to
# use your version of this file under the terms of the MPL, indicate your
# decision by deleting the provisions above and replace them with the notice
# and other provisions required by the GPL or the LGPL. If you do not delete
# the provisions above, a recipient may use your version of this file under
# the terms of any one of the MPL, the GPL or the LGPL.
#
# ***** END LICENSE BLOCK *****
*/


(function(){

	var w = unsafeWindow;
	var _onload = w.onload;

	var onload  = function () 
	{
		w.Keybind.add(
				't'
			,	function()
				{
					var item = w.get_active_item(true);
					if (item) 
					{

						var result = getId( item.link );
						var itemInfo = $C( document.getElementById("item_"+item.id), "item_info" )[0];
						var iconId = makeLoading( itemInfo );

						if( result.result )
						{
							var opt = 
							{
									method 	: 'POST'
								,	url		: "http://www.tumblr.com/reblog/" + result.id
								,	headers	: 
									{
											"Content-Type"		: "application/x-www-form-urlencoded"
										,	"Referer"			: "http://www.tumblr.com/reblog/" + result.id 
										,	"Content-length"	: "0"
									}
								,	onerror	: function(res)
									{
										setErrMsg( iconId, "GM_xmlhttpRequest Err!" );
									}
								,	onload	: function(res)
									{
										if ( res.status != 200 )
										{
											setErrMsg( iconId, "Status Code is " + res.status );
											return;
										}

										var data = {};

										// 全inputとtextarea、selectを取得
										var dom = convertToHTMLDocument( res.responseText );
										var form = $( dom, "edit_post" );
	
										var inputs = $T( form, "input" );
										for( var i=0; i<inputs.length; i++ )
										{
											data[inputs[i].name] = inputs[i].value;
										}

										var textareas = $T( form, "textarea" );
										for( var i=0; i<textareas.length; i++ )
										{
											data[textareas[i].name] = textareas[i].value;
										}

										var selects = $T( form, "select" );
										for( var i=0; i<selects.length; i++ )
										{
											data[selects[i].name] = selects[i].value;
										}

										var opt = 
										{
											method	: 'POST'
										,	url		: "http://www.tumblr.com/reblog/" + result.id
										,	headers	: 
											{
													"Content-Type"	: "application/x-www-form-urlencoded"
												,	"Referer"		: "http://www.tumblr.com/reblog/" + result.id 
											} 
										,	data	: queryString(data)
										,	onerror	: function(res)
											{
												setErrMsg( iconId, "GM_xmlhttpRequest Err!" );
											}
										,	onload	: function(res)
											{
												if ( res.status != 200 )
												{
													setErrMsg( iconId, "Status Code is " + res.status );
													return;
												}
												setOk( iconId );
											}
										};
										window.setTimeout(function() {
												GM_xmlhttpRequest(opt)
											,	0
										});
									}
							}
							window.setTimeout(function() {
									GM_xmlhttpRequest(opt)
								,	0
							});
						}
						else
						{
							setErrMsg( iconId, "This feed is not Tumblelog" );
						}
					}

					function makeLoading( obj )
					{
						var img = document.createElement("img");
						img.id	= "item_" + item.id + "_loadingImg";
						img.src	= loadingImg;
						img.title	= "now rebloging...";
						if( obj.appendChild )
						{
							obj.appendChild( img );
						}
						return img.id;
					}

					function setErrMsg( iconId, errMsg )
					{
						var img = $( document, iconId );
						if( img && img != undefined )
						{
							img.src	= ngImg;
							img.title	= errMsg;
						}
					}

					function setOk( iconId )
					{
						var img = $( document, iconId );
						if( img && img != undefined )
						{
							img.src	= okImg;
							img.title	= "Finished!";
						}
					}

				}
		);
	};

	w.onload = function(){
		_onload();	// デフォルトのonload?
		onload();
	};

	var regGetId = new RegExp( "^http://([^\/]+)\/post\/([0-9]+)$" );
	function getId( url )
	{
		var result = 
		{
				result	: false
			,	url		: ""
			,	id		: 0
		}
	
		if( url.match( regGetId ) )
		{
			result.result	= true;
			result.url		= RegExp.$1;
			result.id		= RegExp.$2;
		}
		return result;
	}

	function $(dom, id)
	{
		return dom.getElementById(id);
	}

	function $T(dom, tab)
	{
		return dom.getElementsByTagName(tab);
	}

	function $C(dom, class)
	{
		var retnode = [];
		var myclass = new RegExp('\\b'+class+'\\b');
		var elem = dom.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
			var classes = elem[i].className;
			if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
	}

	var loadingImg = 
		'data:image/gif;base64,'+
		'R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH5BAAKAAAAIf4VTWFkZSBieSBB'+
		'amF4TG9hZC5pbmZvACH/C05FVFNDQVBFMi4wAwEAAAAsAAAAABAAEAAAAzMIutz+MMpJaxNjCDoI'+
		'GZwHTphmCUWxMcK6FJnBti5gxMJx0C1bGDndpgc5GAwHSmvnSAAAIfkEAAoAAAAsAAAAABAAEAAA'+
		'AzQIutz+TowhIBuEDLuw5opEcUJRVGAxGSBgTEVbGqh8HLV13+1hGAeAINcY4oZDGbIlJCoSACH5'+
		'BAAKAAAALAAAAAAQABAAAAM2CLoyIyvKQciQzJRWLwaFYxwO9BlO8UlCYZircBzwCsyzvRzGqCsC'+
		'We0X/AGDww8yqWQan78EACH5BAAKAAAALAAAAAAQABAAAAMzCLpiJSvKMoaR7JxWX4WLpgmFIQwE'+
		'MUSHYRwRqkaCsNEfA2JSXfM9HzA4LBqPyKRyOUwAACH5BAAKAAAALAAAAAAQABAAAAMyCLpyJytK'+
		'52QU8BjzTIEMJnbDYFxiVJSFhLkeaFlCKc/KQBADHuk8H8MmLBqPyKRSkgAAIfkEAAoAAAAsAAAA'+
		'ABAAEAAAAzMIuiDCkDkX43TnvNqeMBnHHOAhLkK2ncpXrKIxDAYLFHNhu7A195UBgTCwCYm7n20p'+
		'SgAAIfkEAAoAAAAsAAAAABAAEAAAAzIIutz+8AkR2ZxVXZoB7tpxcJVgiN1hnN00loVBRsUwFJBg'+
		'm7YBDQTCQBCbMYDC1s6RAAAh+QQACgAAACwAAAAAEAAQAAADMgi63P4wykmrZULUnCnXHggIwyCO'+
		'x3EOBDEwqcqwrlAYwmEYB1bapQIgdWIYgp5bEZAAADs=';

	var okImg = 
		'data:image/gif;base64,'+
		'R0lGODlhDAAMAPcAAAqLFgqMFgqNFgedFQmQFgmRFgmSFgmVFgmYFReQIwWiFQWkFQWmFQOrFQOs'+
		'EwOuEwOsFQWoFQWpFQOwEwC0EwC2EwC3Exq7JzKdPjigQ0KkTUinU0uoVVWtYFiuY1uvZmOzbWu3'+
		'dXC5e0HDS0HFS1LJW3a7gHm8g5TJnaTQrarTsq7VuLTXvbfZwLraw8zj1dfy2djn4Orw8vDz+PL7'+
		'8////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIgwBnCFwB'+
		'IoMGES8ECmzhAQGDBw4WGBAhMEYACRYyZhwxIMSMEwo0ZiRBo8IBFwEokCAxkkYNCxE+FLBQgsZK'+
		'lzAsPMhggGYNGjgvWJiAQUCFCzBq1IAh1EKDDRwaWEDKVOMAFCoMUJja1AKEADI+EsCYkYKCACkU'+
		'sugA4ICBBCZiCAwIADs=';

	var ngImg = 
		'data:image/gif;base64,'+
		'R0lGODlhDAAMALMAALwCAswAAMQyM/gAAP8xMcpMTs5eYNJvcv1HR/94eNqSld6mqf+JieG0uPHP'+
		'0vj2+CwAAAAADAAMAAAETPDJZYQ4TspWQhiDd0gO8IFoYDxHgDwJmDwI0ADDC88PMRgnnQQBEuBA'+
		'DAkDZZRpYKBCITfUIQKKBQDhIOa6AEkLhQIsNBxTAICRRAAAOw==';

	// By LDRize Mibuffer tumblr reblog command
	// MPL 1.1/GPL 2.0/LGPL 2.1
	// http://userscripts.org/scripts/review/12305

	function convertToHTMLDocument(html) {
		var xsl = (new DOMParser()).parseFromString(
		'<?xml version="1.0"?>\
			<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">\
			<output method="html"/>\
		 </stylesheet>', "text/xml");

		var xsltp = new XSLTProcessor();
		xsltp.importStylesheet(xsl);

		var doc = xsltp.transformToDocument(document.implementation.createDocument("", "", null));
		doc.appendChild(doc.createElement("html"));

		var range = doc.createRange();
		range.selectNodeContents(doc.documentElement);
		doc.documentElement.appendChild(range.createContextualFragment(html));

		return doc
	}

	function queryString(params, question){
		if(isEmpty(params))
			return '';

		var qeries = [];
		for(var key in params)
			qeries.push(key + '='+ encodeURIComponent(params[key]));
		return (question? '?' : '') + qeries.join('&');
	}

	function isEmpty(obj){
		for(var i in obj)
			return false;
		return true;
	}

})();

