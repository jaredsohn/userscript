//
// Copyright (c) Jan 2007 Laurie Poon. All rights reserved.
//
// ==UserScript==
// @name           Flickr 5 Stars Ratings
// @namespace      http://www.flickr.com
// @description    Add star ratings tags to you photos
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// @version 0.1
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getCurrentRating() 
{
    var thetags = document.getElementById("thetags");
    var nodes = thetags.getElementsByTagName("a");
    var exp = new RegExp("^GC[0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z]");

    for (var i = 0; i < nodes.length; i++) 
    {
		var node = nodes[i];
		if (node.innerHTML.match("1star")) return 1;
		if (node.innerHTML.match("2star")) return 2;
		if (node.innerHTML.match("3star")) return 3;
		if (node.innerHTML.match("4star")) return 4;
		if (node.innerHTML.match("5star")) return 5;
	}
	return 0;
}

function addStarRatings()
{
    if (unsafeWindow.global_photos["" + unsafeWindow.page_photo_id].isOwner == true)
    {

		var tagAdder, newElement;
		tagAdder = document.getElementById('tagadder');
		if (tagAdder) {
			var stars = document.createElement("div");
			var cur = getCurrentRating();
			var wcur = cur * 30;	// Each star is 30 pixels wide
			stars.innerHTML = "<div><br>Rate this photo" +
			  "<ul class='star-rating'>" +
			  "<li class='current-rating' style='width:" + wcur + "px;'>Currently " + cur + "/5 Stars.</li>" +
			  "<li><a href='#' id='onestar' title='Rate this 1 star out of 5' class='one-star'>1</a></li>" +
			  "<li><a href='#' id='twostar' title='Rate this 2 stars out of 5' class='two-stars'>2</a></li>" +
			  "<li><a href='#' id='threestar' title='Rate this 3 stars out of 5' class='three-stars'>3</a></li>" +
			  "<li><a href='#' id='fourstar' title='Rate this 4 stars out of 5' class='four-stars'>4</a></li>" +
			  "<li><a href='#' id='fivestar' title='Rate this 5 stars out of 5' class='five-stars'>5</a></li></ul>" +
			  "</div>";
		    tagAdder.parentNode.insertBefore(stars, tagAdder.nextSibling);

			var obj1star = document.getElementById('onestar');
			obj1star.addEventListener("click", function(evt)
            {
                var objTag = document.getElementById('addtagbox');
				var objForm = document.getElementById('tagadderform');
				objTag.value = '1star'; 
				objForm.submit();
				evt.stopPropagation();
                evt.preventDefault();
            }, true);

			var obj2star = document.getElementById('twostar');
			obj2star.addEventListener("click", function(evt)
            {
                var objTag = document.getElementById('addtagbox');
				var objForm = document.getElementById('tagadderform');
				objTag.value = '2star'; 
				objForm.submit();
				evt.stopPropagation();
                evt.preventDefault();
            }, true);

			var obj3star = document.getElementById('threestar');
			obj3star.addEventListener("click", function(evt)
            {
                var objTag = document.getElementById('addtagbox');
				var objForm = document.getElementById('tagadderform');
				objTag.value = '3star'; 
				objForm.submit();
				evt.stopPropagation();
                evt.preventDefault();
            }, true);

 			var obj4star = document.getElementById('fourstar');
			obj4star.addEventListener("click", function(evt)
            {
                var objTag = document.getElementById('addtagbox');
				var objForm = document.getElementById('tagadderform');
				objTag.value = '4star'; 
				objForm.submit();
				evt.stopPropagation();
                evt.preventDefault();
            }, true);
           
			var obj5star = document.getElementById('fivestar');
			obj5star.addEventListener("click", function(evt)
            {
                var objTag = document.getElementById('addtagbox');
				var objForm = document.getElementById('tagadderform');
				objTag.value = '5star'; 
				objForm.submit();
				evt.stopPropagation();
                evt.preventDefault();
            }, true);

		}      
    }
}

addGlobalStyle('.star-rating{ list-style:none; margin: 0px; padding:0px; width: 150px; height: 30px; position: relative; background: url("data:image/gif;base64, R0lGODlhHgBaAOYAAAB9APf399bW1tCiGGXUZczMzOrGSiOrI+/v76vgq+vBKgCtAP789Pbjn+bm5vfVVkzITPry1QC1AN+zIgClAN7e3oTZhPLZgwC+APnsvwCZANXu1crqyiK/IvXMMeW5Jv755r7ovu/UdNirHvnuyRqrGhm1Ge7NWeb55nTIdCLJIgCMADStNPDGLgDMAELZQvD58O/Wa47Yjg2kDffehPjorujAM/zrsOO3JP788eD54PPNP/312LjmuC6+LteqHMXyxdyvIPbgk/////f99/jddCfQJyaxJlDEUPblqO3DKwCZAIXnhXLVcpbblgepBwjOCPrxz/LPS+e9KNSnGvPRUUzbTPjbbgCEAPnjjCe9J/323O787vPLOO3FNv3568/vz9X01SK3IknKSb3tvTS3NPXYa//mpWHgYezJTavmq/fVV4LcgvzyyXTKdB7MHo3gjffgjeS9OffOQrXwtfjeeQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAeAFoAAAf/gEOCg4SDAYeHhYqLigEIjwiJjJOEjg6CDpGUm0MBDpdDn5KcjQgVAYIBFZqkjZ+Eoq2FjqtDj7arqLKdnhVERAICghUOo4yIhwgOtQEFBajLmZHIho7KnxXBmMGXAcHEn9Koh8sVxJC65uZEvI/lxIisi8ruCJOO5Lrt15nJ4ei68FkShMBZgXPTkinL5kxXP3KnBHGbVslSsHT9Ol1jpypXKXOpzumzVAxTyVmxhojUp3GZQ3ktQ2b8KCwUTGsSPTJSVhMeMk+gBJw89mqIUEiQHPQcOi9TJwHqHqkTAI2pIlP2HDiL2ElpAXtY2S2iharC16sHO+n8iEkXgmD2/zANg1lJWaV38AitnXULE0J3xAY9YllocMeHiMopJFz3GsXGn+g2ojb2565UiC4fQ8r4siVykncBNdm5FdmQoUn10mtVlqlLG3TgSk3JE9UhbtxILFa6YmJiRFCUmAFD5crMjfkJeDbECQUKCToVEBrZcKqF6s4JErNgQZlf4bIjtq5ITffuPTZPG/oLRRgybDpIOO9DRojYxQ1N60vGiAsM8y0gwYABLvDccwdwQNB+n/wyhoEUaKDBChQQeF53RygYynggDQEBhBOusIKAFpoARle5BPSaIASAOCEWIw7og2zGPXadOajA0V2EL8KoxYk1dmZbTSrsKKGIALAgkf8AtClTgCBvDPjckSscIEgBmYg1llJDEPEfBkZOqMFuvXV1iQ4ufBmmBihsWCZWQ9CRpgtGgAGGD1MCMZuWV0WEhgtQMEGIBU9o0IRaqTlS0wtWcKFWRFwgAYFEiZoiiKOhBMMNO22qVCkouICDDVc2lYZTKMdZEpgttJEkTkX82FgZZbNY5hmtmukHUK76gTITr9eQVmZtpgS0l2jLsDbsZrWQQMJsy9bq0hAiiEDmsD/xdAkIXngBQqbi0KpQeMuxI4QSSjQgHVThvAqROdXp0kULLUiRg0bXqMMbPpOc4cG/LdRwz3q6MAACD23ckMUD/za8gxlC1JBBBCAwcJ3sP4LwIEULCkyBAw5KNNwwveie8AUmCU2bxAcfTDDBCCNM0ILI9LZwwrcqZaQqOw14jEMQQfxABQ4zN2xGSGupikoGU7T88ghUUPHBv1ecbNRDdU0bRdMfAC30AAOkYbE3v9ZlFjtVcD1B0FGfkFOTXA6xgwIKsLw21HJc2dpdFQyRgwctKDGFx3dPQCYlwW4BMLo24LB2ECentFMtNzQcRw45XPBxEBnsySwqRXiwRgSERGDABBcgaqqlQ9RxBkFwCZKEtUZ9ynd2LB3b6yDlIKUUqGUXNg28Cal6ijW9WROZMfguv4mtk+E6RCAAOw==") top left repeat-x;}');
addGlobalStyle('.star-rating li{ padding:0px; margin:0px; height:30px; width: 30px;		/*\*/ float: left; /* */ }');
addGlobalStyle('.star-rating li a{ display:block; width:30px; height: 30px; line-height:30px; text-decoration: none; text-indent: -9000px; z-index: 20; position: absolute; padding: 0px; overflow:hidden; }');
addGlobalStyle('.star-rating li a:hover{ background: url("data:image/gif;base64, R0lGODlhHgBaAOYAAAB9APf399bW1tCiGGXUZczMzOrGSiOrI+/v76vgq+vBKgCtAP789Pbjn+bm5vfVVkzITPry1QC1AN+zIgClAN7e3oTZhPLZgwC+APnsvwCZANXu1crqyiK/IvXMMeW5Jv755r7ovu/UdNirHvnuyRqrGhm1Ge7NWeb55nTIdCLJIgCMADStNPDGLgDMAELZQvD58O/Wa47Yjg2kDffehPjorujAM/zrsOO3JP788eD54PPNP/312LjmuC6+LteqHMXyxdyvIPbgk/////f99/jddCfQJyaxJlDEUPblqO3DKwCZAIXnhXLVcpbblgepBwjOCPrxz/LPS+e9KNSnGvPRUUzbTPjbbgCEAPnjjCe9J/323O787vPLOO3FNv3568/vz9X01SK3IknKSb3tvTS3NPXYa//mpWHgYezJTavmq/fVV4LcgvzyyXTKdB7MHo3gjffgjeS9OffOQrXwtfjeeQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAeAFoAAAf/gEOCg4SDAYeHhYqLigEIjwiJjJOEjg6CDpGUm0MBDpdDn5KcjQgVAYIBFZqkjZ+Eoq2FjqtDj7arqLKdnhVERAICghUOo4yIhwgOtQEFBajLmZHIho7KnxXBmMGXAcHEn9Koh8sVxJC65uZEvI/lxIisi8ruCJOO5Lrt15nJ4ei68FkShMBZgXPTkinL5kxXP3KnBHGbVslSsHT9Ol1jpypXKXOpzumzVAxTyVmxhojUp3GZQ3ktQ2b8KCwUTGsSPTJSVhMeMk+gBJw89mqIUEiQHPQcOi9TJwHqHqkTAI2pIlP2HDiL2ElpAXtY2S2iharC16sHO+n8iEkXgmD2/zANg1lJWaV38AitnXULE0J3xAY9YllocMeHiMopJFz3GsXGn+g2ojb2565UiC4fQ8r4siVykncBNdm5FdmQoUn10mtVlqlLG3TgSk3JE9UhbtxILFa6YmJiRFCUmAFD5crMjfkJeDbECQUKCToVEBrZcKqF6s4JErNgQZlf4bIjtq5ITffuPTZPG/oLRRgybDpIOO9DRojYxQ1N60vGiAsM8y0gwYABLvDccwdwQNB+n/wyhoEUaKDBChQQeF53RygYynggDQEBhBOusIKAFpoARle5BPSaIASAOCEWIw7og2zGPXadOajA0V2EL8KoxYk1dmZbTSrsKKGIALAgkf8AtClTgCBvDPjckSscIEgBmYg1llJDEPEfBkZOqMFuvXV1iQ4ufBmmBihsWCZWQ9CRpgtGgAGGD1MCMZuWV0WEhgtQMEGIBU9o0IRaqTlS0wtWcKFWRFwgAYFEiZoiiKOhBMMNO22qVCkouICDDVc2lYZTKMdZEpgttJEkTkX82FgZZbNY5hmtmukHUK76gTITr9eQVmZtpgS0l2jLsDbsZrWQQMJsy9bq0hAiiEDmsD/xdAkIXngBQqbi0KpQeMuxI4QSSjQgHVThvAqROdXp0kULLUiRg0bXqMMbPpOc4cG/LdRwz3q6MAACD23ckMUD/za8gxlC1JBBBCAwcJ3sP4LwIEULCkyBAw5KNNwwveie8AUmCU2bxAcfTDDBCCNM0ILI9LZwwrcqZaQqOw14jEMQQfxABQ4zN2xGSGupikoGU7T88ghUUPHBv1ecbNRDdU0bRdMfAC30AAOkYbE3v9ZlFjtVcD1B0FGfkFOTXA6xgwIKsLw21HJc2dpdFQyRgwctKDGFx3dPQCYlwW4BMLo24LB2ECentFMtNzQcRw45XPBxEBnsySwqRXiwRgSERGDABBcgaqqlQ9RxBkFwCZKEtUZ9ynd2LB3b6yDlIKUUqGUXNg28Cal6ijW9WROZMfguv4mtk+E6RCAAOw==") left center; z-index: 2; left: 0px; border:none; }');
addGlobalStyle('.star-rating a.one-star{ left: 0px; }');
addGlobalStyle('.star-rating a.one-star:hover{ width:30px; }');
addGlobalStyle('.star-rating a.two-stars{ left:30px; }');
addGlobalStyle('.star-rating a.two-stars:hover{ width: 60px; }');
addGlobalStyle('.star-rating a.three-stars{ left: 60px; }');
addGlobalStyle('.star-rating a.three-stars:hover{ width: 90px; }');
addGlobalStyle('.star-rating a.four-stars{ left: 90px; }');
addGlobalStyle('.star-rating a.four-stars:hover{ width: 120px; }');
addGlobalStyle('.star-rating a.five-stars{ left: 120px; }');
addGlobalStyle('.star-rating a.five-stars:hover{ width: 150px; }');
addGlobalStyle('.star-rating li.current-rating{ background: url("data:image/gif;base64, R0lGODlhHgBaAOYAAAB9APf399bW1tCiGGXUZczMzOrGSiOrI+/v76vgq+vBKgCtAP789Pbjn+bm5vfVVkzITPry1QC1AN+zIgClAN7e3oTZhPLZgwC+APnsvwCZANXu1crqyiK/IvXMMeW5Jv755r7ovu/UdNirHvnuyRqrGhm1Ge7NWeb55nTIdCLJIgCMADStNPDGLgDMAELZQvD58O/Wa47Yjg2kDffehPjorujAM/zrsOO3JP788eD54PPNP/312LjmuC6+LteqHMXyxdyvIPbgk/////f99/jddCfQJyaxJlDEUPblqO3DKwCZAIXnhXLVcpbblgepBwjOCPrxz/LPS+e9KNSnGvPRUUzbTPjbbgCEAPnjjCe9J/323O787vPLOO3FNv3568/vz9X01SK3IknKSb3tvTS3NPXYa//mpWHgYezJTavmq/fVV4LcgvzyyXTKdB7MHo3gjffgjeS9OffOQrXwtfjeeQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAeAFoAAAf/gEOCg4SDAYeHhYqLigEIjwiJjJOEjg6CDpGUm0MBDpdDn5KcjQgVAYIBFZqkjZ+Eoq2FjqtDj7arqLKdnhVERAICghUOo4yIhwgOtQEFBajLmZHIho7KnxXBmMGXAcHEn9Koh8sVxJC65uZEvI/lxIisi8ruCJOO5Lrt15nJ4ei68FkShMBZgXPTkinL5kxXP3KnBHGbVslSsHT9Ol1jpypXKXOpzumzVAxTyVmxhojUp3GZQ3ktQ2b8KCwUTGsSPTJSVhMeMk+gBJw89mqIUEiQHPQcOi9TJwHqHqkTAI2pIlP2HDiL2ElpAXtY2S2iharC16sHO+n8iEkXgmD2/zANg1lJWaV38AitnXULE0J3xAY9YllocMeHiMopJFz3GsXGn+g2ojb2565UiC4fQ8r4siVykncBNdm5FdmQoUn10mtVlqlLG3TgSk3JE9UhbtxILFa6YmJiRFCUmAFD5crMjfkJeDbECQUKCToVEBrZcKqF6s4JErNgQZlf4bIjtq5ITffuPTZPG/oLRRgybDpIOO9DRojYxQ1N60vGiAsM8y0gwYABLvDccwdwQNB+n/wyhoEUaKDBChQQeF53RygYynggDQEBhBOusIKAFpoARle5BPSaIASAOCEWIw7og2zGPXadOajA0V2EL8KoxYk1dmZbTSrsKKGIALAgkf8AtClTgCBvDPjckSscIEgBmYg1llJDEPEfBkZOqMFuvXV1iQ4ufBmmBihsWCZWQ9CRpgtGgAGGD1MCMZuWV0WEhgtQMEGIBU9o0IRaqTlS0wtWcKFWRFwgAYFEiZoiiKOhBMMNO22qVCkouICDDVc2lYZTKMdZEpgttJEkTkX82FgZZbNY5hmtmukHUK76gTITr9eQVmZtpgS0l2jLsDbsZrWQQMJsy9bq0hAiiEDmsD/xdAkIXngBQqbi0KpQeMuxI4QSSjQgHVThvAqROdXp0kULLUiRg0bXqMMbPpOc4cG/LdRwz3q6MAACD23ckMUD/za8gxlC1JBBBCAwcJ3sP4LwIEULCkyBAw5KNNwwveie8AUmCU2bxAcfTDDBCCNM0ILI9LZwwrcqZaQqOw14jEMQQfxABQ4zN2xGSGupikoGU7T88ghUUPHBv1ecbNRDdU0bRdMfAC30AAOkYbE3v9ZlFjtVcD1B0FGfkFOTXA6xgwIKsLw21HJc2dpdFQyRgwctKDGFx3dPQCYlwW4BMLo24LB2ECentFMtNzQcRw45XPBxEBnsySwqRXiwRgSERGDABBcgaqqlQ9RxBkFwCZKEtUZ9ynd2LB3b6yDlIKUUqGUXNg28Cal6ijW9WROZMfguv4mtk+E6RCAAOw==") left bottom; position: absolute; height: 30px; display: block; text-indent: -9000px; z-index: 1; }');

addStarRatings();	


