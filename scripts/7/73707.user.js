// ==UserScript==
// @name           Jailbaitgallery.com clickable image
// @namespace      Wjb
// @description    Shows next image when current image is clicked
// @include        http://www.jailbaitgallery.com/*
// @include        http://jailbaitgallery.com/*
// ==/UserScript==

var directionOldToNew = GM_getValue('directionOldToNew', true);

var pictureExpr = document.evaluate('/html/body/div[@id="container"]/table/tbody/tr[4]/td/table/tbody/tr[1]/td/table/tbody/tr/td[1]/table/tbody/tr[3]/td/div[1]/div/img',
									document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var nextPictureExpr = document.evaluate('/html/body/div[@id="container"]/table/tbody/tr[4]/td/table/tbody/tr[1]/td/table/tbody/tr/td[1]/table/tbody/tr[3]/td/div[2]/table/tbody/tr/td[' +
									(directionOldToNew == true ? 2 : 4) + ']/div/a',
									document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var textExpr = document.evaluate('/html/body/div[@id="container"]/table/tbody/tr[4]/td/table/tbody/tr[1]/td/table/tbody/tr/td[1]/table/tbody/tr[3]/td/div[2]/div/table/tbody/tr[1]/td/div',
									document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if(pictureExpr.snapshotLength == 1 && nextPictureExpr.snapshotLength == 1 && textExpr.snapshotLength == 1)
{
	var picture = pictureExpr.snapshotItem(0);
	var next = nextPictureExpr.snapshotItem(0);
	var text = textExpr.snapshotItem(0);

	var textNode = document.createTextNode("Old to new");
	var checkBox = document.createElement('input');
	checkBox.type = "checkbox";
	checkBox.checked = directionOldToNew;

	insertAfter(textNode, text);
	insertAfter(checkBox, textNode);

	picture.addEventListener('click', function () { window.location.href = next.href; }, true);
	checkBox.addEventListener('click', function () { GM_setValue('directionOldToNew', this.checked); window.location.reload();}, true);
}

function insertAfter(newElement, targetElement)
{
	var parent = targetElement.parentNode;
	if(parent.lastchild == targetElement)
	{
		parent.appendChild(newElement);
	}
	else
	{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
