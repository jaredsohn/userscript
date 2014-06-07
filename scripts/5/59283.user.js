// ==UserScript==
// @name           Fazed Unifier
// @namespace      Fazed
// @description    Adds Unicode Character Support to Fazed
// @include        http://*fazed.*/forum/view/?id=*
// @include        http://*fazed.*/forum/post/?id=*
// @include        http://*skill.org/forum/view/?id=*
// @include        http://*skill.org/forum/post/?id=*
// @author		 James Hannan aka JDHannan
// ==/UserScript==

lmnts = document.body.getElementsByTagName("div");

for (var i=0;i<lmnts.length;i++)
	if (lmnts[i].getAttribute("class")=="post_body")
		lmnts[i].innerHTML = unify(lmnts[i].innerHTML);

document.getElementsByName('comment')[0].value=unifyComment(document.getElementsByName('comment')[0].value);


function unify(toUnify)
{
	return toUnify.replace(
		new RegExp("&[^a]?a[^m]?m[^p]?p[^;]?;[^a]?a?[^m]?m?[^p]?p?[^;]?;?[^#]?#\\D?\\d+\\D?\\d*[^;]?;","gi"),

			function($1)
			{ 
				return( String.fromCharCode($1.replace(/\D/g,'')));
			}
	);
}

function unifyComment(toUnify)
{
	return toUnify.replace(
		new RegExp("&(amp;)*#\\d+;","gi"),
			function($1)
			{ 
				return( String.fromCharCode($1.replace(/\D/g,'')));
			}
	);
}