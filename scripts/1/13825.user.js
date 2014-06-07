// ==UserScript==
// @name           Prevent Third
// @description    Remove/hide third-party resources.
// @include        *
// ==/UserScript==

/*	Home:      http://userscripts.org/scripts/show/13825
 *	ChangeLog: http://prevent-third-userscript.blogspot.com/
 */

const IP_LITERAL = "(\\[((([a-f\\d]{1,4}:){6}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(::([a-f\\d]{1,4}:){5}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(([a-f\\d]{1,4})?::([a-f\\d]{1,4}:){4}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|((([a-f\\d]{1,4}:)?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:){3}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,2})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:){2}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,3})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,4})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,5})?[a-f\\d]{1,4})?::[a-f\\d]{1,4})|(((([a-f\\d]{1,4}:){1,6})?[a-f\\d]{1,4})?::))\\])";
const IPV4ADDRESS = "((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5]))";
const IP = "(" + IPV4ADDRESS + "|" + IP_LITERAL + ")";
const TLD = "(ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)";
var domainRegExp = new RegExp(IP + "|([\\w-~!$&'()*+,;=]|%[a-f\\d]{2})+\\." + TLD + "\\b", "i");

const TAGS =
{
//	"a": "href",
	"applet": "codebase",
//	"area": "href",
//	"embed": "src",
	"iframe": "src",
	"img": "src"
//	"input": "src",
//	"object": "data",
//	"param": "value"
};

const LOW_LIMIT = 3;
const HIGH_LIMIT = 8;

function main()
{
	var domain = getDomain(window.location.hostname);
	if (!domain) return;

	var expression = "";
	for (var tagName in TAGS) expression += ".//" + tagName + "[@" + TAGS[tagName] + "] | ";
	expression = expression.substring(0, expression.length - 3);

	var elements = document.evaluate(expression, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (!elements || elements.snapshotLength == 0) return;

	var localRegExp = new RegExp("^\\s*" + window.location.protocol + "[/]{2}(([\\w-~!$&'()*+,;=]|%[a-f\\d]{2})+\\.)*" + domain, "i");
	var thirdPartyObj = {};
	for (var i = 0; i < elements.snapshotLength; i++)
	{
		var element = elements.snapshotItem(i);
		var attrName = TAGS[element.tagName.toLowerCase()];
		var attr = element.getAttribute(attrName);
		if (attr.match(/^\s*https?:/i) && !attr.match(localRegExp))
		{
			var attrDomain = getDomain(attr);
			if (!thirdPartyObj[attrDomain])
			{
				thirdPartyObj[attrDomain] = {};
				thirdPartyObj[attrDomain].arr = [];
				thirdPartyObj[attrDomain].limit = attrDomain.match(new RegExp(domain + "$")) ? LOW_LIMIT : HIGH_LIMIT;
			}
			thirdPartyObj[attrDomain].arr[thirdPartyObj[attrDomain].arr.length] = element;
		}
	}
	for (var domain in thirdPartyObj)
	{
		var domObj = thirdPartyObj[domain];
		if (domObj.arr.length <= domObj.limit) for (var i = 0; i < domObj.arr.length; i++)
		{
			var element = domObj.arr[i];
//			element.parentNode.removeChild(element); // REMOVE
			element.setAttribute("style", "display: none !important; visibility: hidden !important;"); // HIDE
		}
	}
}

function getDomain(url)
{
	var domain = url.match(domainRegExp);
	if (!domain) return null;
	return domain[0];
}

main();