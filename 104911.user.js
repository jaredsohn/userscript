// ==UserScript==
// @name           reduire empire
// @namespace      snaquekiller
// @include        http://*.ogame.*/game/index.php?page=empire*
// @version        0.1
// @author       snaquekiller (100% )
// @creator       snaquekiller
// @description   reduire empire
// @date 2011-06-16
// ==/UserScript==


	var css ='.planet, .planet div{width: 100px;} '
			+'.planetImg, .planetImg img{width: 90px;}'
			+'.planetHead{height:210px;}'
			+'.textLeft{text-align:center;}'
			+'#total{margin-left:7px;}';
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
