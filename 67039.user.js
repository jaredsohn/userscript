// ==UserScript==
// @name           lostfilm.tv
// @include        *lostfilm.tv*
// @run-at         document-start
// ==/UserScript==
GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
  var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
  var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
  if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
  return sel;
}

//*** Add css
GM_addGlobalStyle(''
//--- Header & Footer
+' body {margin-top: 0px; background-image: url(data:image/gif;base64,R0lGODlhGwAbAKUVAGRjZGBfYFdWV1NTVE1NTn5/f3h5eWxtbXh5eHV2dX9/fmBgX/+uAPWKAOEAAP8kJFRTU318fHZ1dWloaGBfX////9nZ2aGhoYGBgX9/f3x8fHl5eXV1dXFxcW1tbWpqamhoaGRkZFtbW1dXV1NTU1BQUE1NTTg4OCsrKxgYGAAAAP///////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAD8ALAAAAAAbABsAAAZ1QJVQhRoaj8ciUolsGplCKFFZpEqZ16iWuB1Wl95wV5zkcqlmZ5mcdqLeYOk0O8Y+2Wh2O6+Xt/9dfoFgZ2pafFuCa3Rfho1ydm56Y4B/jHeYiZlQkYNPcGWQoGqcmYaHqIWEm2SQlppmdJZoVmuTp5S5p1BBADs=`); background-repeat: repeat}'
+' .main_logo_link{background: url(http://www.lostfilm.tv/Tmpl/LostFilm/img/logo_black.gif) no-repeat left top; width:238px; height:56px; display:block;}'
+' .bb_nopadding{display:none} #ta_link{display:none;}'
)

	var stuff_to_remove = [
		"//div[@class='block' and div[1]/@class='block_head' and (div[1]/text()='Реклама') and div[2]/@class='block_link']",
		"//body/div/div[@class='right']/div[@class='block_bottomc'][1]",
		"//body/div/div[@class='right']/div[@class='block_bottomr'][1]",
		"//body/div/div[@class='right']/div[@class='block_bottoml'][1]",
		"//body/div/div[@class='left']/div[@class='bb'][2]",
		"//body/div/div[@class='left']/div[@class='bb'][2]",
		"//div[@class='block' and div[1]/@class='block_head' and (div[1]/text()='SMS-чат') and div[2]/@class='block_link']",
		"//div[@class='block' and div[1]/@class='block_head' and (div[1]/text()='Статистика') and div[2]/@class='block_link']",
		"//body/div/div[@class='left']/div[@class='block_bottoml'][2]",
		"//body/div/div[@class='left']/div[@class='block_bottomr'][2]",
		"//body/div/div[@class='left']/div[@class='block_bottomc'][2]",
		"//body/div/div[@class='left']/div[@class='block_bottoml'][2]",
		"//body/div/div[@class='left']/div[@class='block_bottomr'][2]",
		"//body/div/div[@class='left']/div[@class='block_bottomc'][2]",
		"//p[@class='disclaimer']",
		"//body/div/div[@class='right']/object[1]",

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