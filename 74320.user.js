// ==UserScript==
// @name           torrents.vtomske.ru
// @namespace      vtomske
// @description    Clean view
// @include        *torrents.vtomske.ru*

//*** Remove some stuff
	var stuff_to_remove = [
  "//div[@class='vtomske-body']",
  "//div[@id='page_header']",
  "//div[@style='padding-top: 5px;']",
  "//div[@style='width: 600px; height: 70px; position: relative; overflow: visible; padding: 0pt; margin: 0pt;']",
  "//div[@style='width: 468px; height: 60px; position: relative; overflow: visible; padding: 0pt; margin: 0pt;']",
  "//div[@style='width: 200px; height: 200px; position: relative; overflow: visible; padding: 0pt; margin: 0pt;']",
  "//div[embed[@width='600']]",
  "//table[tbody[tr[td[@width='20']]]]",
  "//div[@id='advert']",
  "//font[@color='#999999']",
  ];

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

stuff_to_remove.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
                item.parentNode.removeChild(item);
            }
        );
    }
);

// ==/UserScript==