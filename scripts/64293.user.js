// ==UserScript==
// @name           Neopets : Moltara Worm Alert!
// @description    Refreshes Moltara main page until worms are found
// @license        GNU GPL
// @version        .1
// @language       en
// @include        http://www.neopets.com/magma/caves.phtml
// @include        http://www.neopets.com/magma/index.phtml
// @include        http://www.neopets.com/magma/*
// @credit         w35l3y, thank you. rest of credit to me!
// @require        http://userscripts.org/scripts/source/63808.user.js
// ==/UserScript==

var x = 3200 // refresh rate
var moltara = xpath('//script[contains(text(), "*")]')[0];

if (moltara) if (/^swf\.addVariable\([''""]material_(?:id|url)/im.test(moltara.textContent.replace(/^\s+/gm, ""))) alert("Worm found!");

},
3000 + Math.floor(2000 * Math.random()));}

swf.addVariable('material_id', '10');
swf.addVariable('material_url', '/magma/worm.phtml?worm_id=1&hash=*');

swf.addVariable('material_url', '/magma/worm.phtml?worm_id=2&hash=*');

swf.addVariable('material_url', '/magma/worm.phtml?worm_id=3&hash=*');

swf.addVariable('material_url', '/magma/worm.phtml?worm_id=4&hash=*');

swf.addVariable('material_url', '/magma/worm.phtml?worm_id=5&hash=*');

swf.addVariable('material_url', '/magma/worm.phtml?worm_id=6&hash=*');

swf.addVariable('material_url', '/magma/worm.phtml?worm_id=7&hash=*');

swf.addVariable('material_url', '/magma/worm.phtml?worm_id=8&hash=*');

swf.addVariable('material_url', '/magma/worm.phtml?worm_id=9&hash=*');

swf.addVariable('material_url', '/magma/worm.phtml?worm_id=10&hash=*');
}


/*************************************************************************/


if (document.body.innerHTML.indexOf('/magma/worm.phtml?worm_id=10&hash=*') > -1) {
	var item = document.evaluate('//b[. = "/magma/worm.phtml?worm_id=10&hash=*"]', document, null,   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                if (item.snapshotlength > 0) {
		item = item.snapshotItem(0);
		selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink}return;}
                setTimeout(main, 0);
}
}




// Trying to create grab code for worms


// Trying to make return on error or grab page

