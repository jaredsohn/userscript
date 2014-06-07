// ==UserScript==
// @name           NGS forum thumb maker
// @namespace      The internet
// @description	   Makes thumb images for uploaded files
// @include        http://*.ngs.ru/forum/*
// @include        http://forum.ngs.ru/*
// ==/UserScript==

function do_xpath_query (query, resultHandler)
{
    var elements = document. evaluate
    (
        query,
        document,
        null,
        XPathResult. UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    resultHandler (elements);
}
function do_main()
{
	var re = /(?!jpeg|jpg|gif|png)\)$/i;
    do_xpath_query
    (
        "//a[contains(@href,'download.php?Number')]", function (xpathRes) {
			for (var i = 0; i < xpathRes.snapshotLength; i++)
			{
				var anchor_node = xpathRes.snapshotItem(i);
				anchor_node.setAttribute('target','_blank');
				anchor_node.innerHTML = 'Открыть в новом окне';
				var text_node = anchor_node.nextSibling;
				if (text_node.nodeType == 3 && re.test(text_node.nodeValue ) )
				{
					var img_node = $ec('img',{'src':anchor_node.getAttribute('href'),'width':165});
					$eb($ec('br'), text_node);
					$ea(img_node,text_node);
					$ea($ec('br'), text_node);	
				} 
			}
		}
    );
};
function $ed(element) {
	element.parentNode.removeChild(element);
};
function $ec(type, attributes){
	var node = document.createElement(type);
	for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
		node.setAttribute(attr, attributes[attr]);
	}
	return node;
};
function $ea(newNode, node) {
	return node.parentNode.insertBefore(newNode, node.nextSibling);
};
function $eb(newNode, node) {
	return node.parentNode.insertBefore(newNode, node);
};
do_main();

