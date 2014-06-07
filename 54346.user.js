// ==UserScript==
// @name           GMail POP3 Quick Check FR
// @namespace      http://userscripts.org/users/cedricpn
// @description    Ajoute un lien "Nouveaux mails" permetant de checker rapidement les comptes POP3 sous Gmail. Cedric B. PN
// @include        http*mail.google.com*
// Aucune mise à jour n'est prévue
// Source originale : http://userscripts.org/scripts/show/51516
// ==/UserScript==

var navigating=false;
function click_element(e){var v=document.createEvent("MouseEvents");v.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);e.dispatchEvent(v);return;}
function change()
{
	var gmail_view=gmail.getActiveViewType();
	if(gmail_view=='tl')
	{
		var canvas=gmail.getActiveViewElement();
		var divs=canvas.ownerDocument.evaluate(".//div[contains(.,'Actualiser') and @act='20']",canvas,null,6,null);
		var i=0;
		while(the_div=divs.snapshotItem(i++))
		{
			if(the_div.added)return;
			the_div.added=true;
			var div=document.createElement('div');
			div.className='goog-inline-block';
			var div2=document.createElement('div');
			div2.className='AP';
			div2.appendChild(document.createTextNode('Nouveaux mails?'));
			div.appendChild(div2);
			div.addEventListener('click',function()
			{
				top.location.href='./#settings/accounts';
				navigating=true;
				return;
			},false);
			the_div.parentNode.parentNode.appendChild(div);
		}
	}
	else if(gmail_view=='s'&&top.location.href.match('#settings/accounts')&&navigating)
	{
		navigating=false;
		var canvas=gmail.getActiveViewElement();
		var links=canvas.ownerDocument.evaluate(".//span[contains(.,'Consulter votre messagerie maintenant')]",canvas,null,4,null);
		while(link=links.iterateNext())
		{
			click_element(link);
		}
		top.location.href='./#inbox';
	}
	return;
};
function init(api)
{
	try
	{
		gmail=api;
		gmail.registerViewChangeCallback(change);
	}
	catch(error)
	{
		top.location.href='./';
	}
	return;
};
window.addEventListener('load',function()
{
	window.setTimeout(function()
	{
		if(unsafeWindow.gmonkey)unsafeWindow.gmonkey.load("1.0",init);
		return;
	},500);
	return;
},false);