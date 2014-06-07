// ==UserScript==
// @name           Plone Manage Toolbar
// @namespace      www.lowstyle.org
// @description    Toolbar to admin Plone on hu-berlin.de 
// @version 0.2.5
// @include        htt*://*.hu-berlin.*
// @exclude	*manage*
// @exclude	*www2.hu-berlin.de*
// ==/UserScript==

// Plone Toolbar HTML 
var _toolBar = document.createElement('div');
_toolBar.id = 'plone_toolbar_wrapper';
_toolBar.innerHTML = '<div id="plone_toolbar"><span> Plone Manage Toolbar </span>' +
'<ul id="toolbar_list"><li><a name="findUID">findUID</a></li><li><a name="manage_interfaces">interfaces</a></li><li><a  name="manage_listLocalRoles">listLocalRoles</a></li><li><a name="manage_access">access</a></li><li><a name="manage_propertiesForm">propertiesForm</a></li><li><a name="@@manage-contentportlets">contentportlets</a></li><li><a name="manage">manage</a></li><li><a name="selectViewTemplate?templateId=folder_listing">folder_listing</a></li></ul>'+
'</div>';

// CSS Plone Toolbar in Seite Schreiben HTML
GM_addStyle((<><![CDATA[
   #plone_toolbar_wrapper, #plone_toolbar a { color: white; background-color: #003366 }
   #plone_toolbar, #plone_toolbar ul { display:inline-block}
   #plone_toolbar span { padding:2px 10px 2px 2px; display:inline-block;font-weight:bold;}
   #plone_toolbar li { padding:0px 4px 4px 2px; display:inline-block;margin-right:10px}
   #plone_toolbar a:hover { color:#E0E0D1; cursor:pointer}
]]></>).toString());

// Plone Toolbar HTML in Dokument einfügen 
document.body.insertBefore(_toolBar, content.document.body.firstChild);

// Get the element, add a click listener...
document.getElementById("toolbar_list").addEventListener("click",function(e) {
// e.target is the clicked element!
// If it was a list item
if(e.target && e.target.nodeName == "A") {
    
	var _Parameter = e.target.name;
	var _url=document.location.href;	
	_url = _url.toString();
	
	if ((_url.substring(_url.length,_url.length-1)) == '/')
	{
	_url = _url + _Parameter;
	}
	/*else if (_url.indexOf("standardseite") != -1)
	{
	_url = _url.substring(0,_url.indexOf("standardseite"));
	_url = _url + _Parameter;
	}*/
	else if (_url.indexOf("edit") != -1)
	{
	_url = _url.substring(0,_url.indexOf("edit"));
	_url = _url + _Parameter;
	}
	else
	{
	_url = _url + '/' + _Parameter;
	}
	//alert(_url);
	document.location.href = _url;
  }
});
 
 