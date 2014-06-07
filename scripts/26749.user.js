// ==UserScript==
// @name           yad2
// @namespace      http://dimrub.vox.com/
// @include        http://www.yad2.co.il/Yad2/Yad2.php*
// ==/UserScript==

var DEBUG = true;
toHide = GM_getValue('toHide', '');

function debug(str) 
{
    if (DEBUG) GM_log(str);
}

function processHideButton(e)
{
	tr = this.parentNode.parentNode;
    id = tr.getAttribute('orig_id');
	toHide += id + ';';
	debug("ID to be hidden is: " + tr.id);
	GM_setValue('toHide', toHide);
	tr.style.display = 'none';
}

toHideList = toHide.split(';');
toHideArray = new Object;
for (var i = 0; i < toHideList.length; i++) {
	toHideArray[toHideList[i]] = 1;
}

// While we're at it, remove the annoying ads
trs = document.evaluate(
    "//table//table/tbody/tr[contains(@id,'tr.MidStrip')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < trs.snapshotLength; i++) {
    tr = trs.snapshotItem(i);
    tr.parentNode.removeChild(tr);
}

trs = document.evaluate(
    "//table//table/tbody/tr[@class='ActiveLink']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

debug("length = " + trs.snapshotLength);
for (var i = 0; i < trs.snapshotLength; i++) {
    tr = trs.snapshotItem(i);
    tr.setAttribute('orig_id', tr.id);

    // Add a button for hiding
    a = document.createElement('a');
    linktxt = document.createTextNode('#');
    a.href = 'javascript:void(0)';
    a.appendChild(linktxt);
    a.addEventListener("click", processHideButton, false);
    input_node = tr.getElementsByTagName('input')[0];
    input_node.parentNode.insertBefore(a, input_node);    

    // Hide, if needed
    if (toHideArray[tr.id] == 1) {
	    tr.style.display = 'none';
    }
}
