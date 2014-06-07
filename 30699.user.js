// ==UserScript==
// @name           Facebook - No Ads
// @namespace      Laymain
// @description    Removes Facebook and FriendsForSale Ads
// @include        http://*.facebook.com*
// ==/UserScript==


var ids = ['sidebar_ads', 'footer_ads'];
var fb_classes = ['social_ad'];
var classes = ['socialmedia', 'myofferpal', 'gift-box', 'rockyou', 'footer', 'appsavvy'];

document.getElementsByClassName = function(name, element)
{
	var res = new Array();
	if (name != "" || typeof element == 'object')
	{
		var children = element.getElementsByTagName('*');
		var exp_reg = new RegExp("(^|\\s)" + name + "(\\s|$)");
		for (var i = 0; i < children.length; i++)
		{
			var childClass = (children[i].className) ? children[i].className : "";
			if (childClass != "" && (childClass == name || childClass.match(exp_reg)))
				res.push(children[i])
		}
	}
	return (res);
};

for (var key in ids)
{
	obj = document.getElementById(ids[key]);
	if (obj)	obj.parentNode.removeChild(obj);
}
for (var key in fb_classes)
{
	arr = document.getElementsByClassName(fb_classes[key], document);
	if (arr) for (var i in arr)	arr[i].parentNode.removeChild(arr[i]);
}
if (document.baseURI.indexOf('friendsforsale', 0) >= 0)
	for (var key in classes)
	{
		arr = document.getElementsByClassName(classes[key], document);
		if (arr) for (var i in arr)	arr[i].parentNode.removeChild(arr[i]);
	}