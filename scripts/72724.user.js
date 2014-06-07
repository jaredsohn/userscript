// ==UserScript==
// @name           Mobygames Easier Image Navigation
// @namespace      http://userscripts.org/user/http://userscripts.org/users/17379
// @include        http://www.mobygames.com/game/*/*/screenshots/gameShotId,*/
// ==/UserScript==

image		 = evaluateXPath('//img[@id="screenshotImg"]');
image.addEventListener('click',
					   function(){
									window.location = nextNode.href
								 },
					   true);

nextNode     = evaluateXPath('//a[contains(text(), "Next")]');
previousNode = evaluateXPath('//a[contains(text(), "Previous")]');

window.addEventListener('keydown', handleKeys, false);

function handleKeys(event)
{
	keycode = event.which;
	
	switch (keycode)
	{
		// right arrow
		case 39:		
		case 63234:
			if (nextNode != null)
				window.location = nextNode.href;
			break;
		// left arrow
		case 37:
		case 63235:
			if (previousNode != null)
				window.location = previousNode.href;
			break;
	}
}

function evaluateXPath(xpathExpression, resultType)
{
	return document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}