// ==UserScript==
// @name           download
// @namespace      http://org.anderhil/bereznyaki/download
// @include        http://bereznyaki.org.ua/antileech/leech.php*
// ==/UserScript==
unsafeWindow.myFunc = function()
{
    try
    {
this.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
var fg = Components.classes["@maone.net/flashgot-service;1"].getService(Components.interfaces.nsISupports).wrappedJSObject;
}
catch(ex)
{
    alert(ex);
}
    var r = document.body.getElementsByTagName('a');
    var links = [r[0]];
    
     try {fg.download(links,fg.OP_ALL,fg.defaultDM);}
     catch(ex)
     {
	 alert(ex);
     }
}

unsafeWindow.myFunc();
unsafeWindow.close();