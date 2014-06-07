// ==UserScript==
// @name           Eve Forums BBCode extension
// @namespace      https://forums.eveonline.com/
// @include        https://forums.eveonline.com/default.aspx?g=posts*
// @include        https://forums.eveonline.com/default.aspx?g=postmessage*
// ==/UserScript==

/* BBCode extension modifications for Eve Online Forums done by Grey Stormshadow */
/* Based heavily on 4Chan BBCode script by BlizMK (http://userscripts.org/scripts/show/103989) */

replaceTextContent(/\[(\w+)=?(.*?)\]([\s\S]*?)\[\/\1\]/gmi,replaceBBCode,document.body,["script","style","textarea"]);

function replaceTextContent(regexp,handler,node,ignoreParentNode)
{
	var snapshots=document.evaluate(".//text()[normalize-space(.)!='']",node,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var num1=0;num1<snapshots.snapshotLength;num1++)
	{
		var node1=snapshots.snapshotItem(num1);
		if (ignoreParentNode && ignoreParentNode.indexOf(node1.parentNode.tagName.toLowerCase())!=-1) continue;
		var node2=node1.parentNode;
		var text1=node1.textContent;
		var flag1=false;
		var match1;
		regexp.lastIndex=0;
		while(match1=regexp.exec(text1))
		{
			var node3=handler(match1);
			if (node3!=null)
			{
				flag1=true;
				text1=RegExp.rightContext
				if (RegExp.leftContext.length) node2.insertBefore($ctn(RegExp.leftContext),node1);
				node2.insertBefore(node3,node1);
				replaceTextContent(regexp,handler,node3,ignoreParentNode);
				regexp.lastIndex=0;
			}
		}
		if (flag1) 
		{
			if (text1.length) node2.insertBefore($ctn(text1),node1);
			node2.removeChild(node1);
		}
	}
}

function replaceBBCode(match)
{
	//GM_log("match: "+match);
	switch(match[1].toLowerCase())	
	{

		case "aliceblue":
			return $ce("span",match[3],{style:"color: #F0F8FF"});
		case "antiquewhite":
			return $ce("span",match[3],{style:"color: #FAEBD7"});
		case "aqua":
			return $ce("span",match[3],{style:"color: #00FFFF"});
		case "aquamarine":
			return $ce("span",match[3],{style:"color: #7FFFD4"});
		case "azure":
			return $ce("span",match[3],{style:"color: #F0FFFF"});
		case "beige":
			return $ce("span",match[3],{style:"color: #F5F5DC"});
		case "bisque":
			return $ce("span",match[3],{style:"color: #FFE4C4"});
		case "black":
			return $ce("span",match[3],{style:"color: #000000"});
		case "blanchedalmond":
			return $ce("span",match[3],{style:"color: #FFEBCD"});
		case "blue":
			return $ce("span",match[3],{style:"color: #0000FF"});
		case "blueviolet":
			return $ce("span",match[3],{style:"color: #0000FF"});
		case "blueviolet":
			return $ce("span",match[3],{style:"color: #8A2BE2"});
		case "brown":
			return $ce("span",match[3],{style:"color: #A52A2A"});
		case "burlywood":
			return $ce("span",match[3],{style:"color: #DEB887"});
		case "cadetblue":
			return $ce("span",match[3],{style:"color: #5F9EA0"});
		case "chartreuse":
			return $ce("span",match[3],{style:"color: #7FFF00"});
		case "chocolate":
			return $ce("span",match[3],{style:"color: #D2691E"});
		case "coral":
			return $ce("span",match[3],{style:"color: #FF7F50"});
		case "cornflowerblue":
			return $ce("span",match[3],{style:"color: #6495ED"});
		case "cornsilk":
			return $ce("span",match[3],{style:"color: #FFF8DC"});
		case "crimson":
			return $ce("span",match[3],{style:"color: #DC143C"});
		case "cyan":
			return $ce("span",match[3],{style:"color: #00FFFF"});
		case "darkblue":
			return $ce("span",match[3],{style:"color: #00008B"});
		case "darkcyan":
			return $ce("span",match[3],{style:"color: #008B8B"});
		case "darkgoldenrod":
			return $ce("span",match[3],{style:"color: #B8860B"});
		case "darkgrey":
			return $ce("span",match[3],{style:"color: #A9A9A9"});
		case "darkgreen":
			return $ce("span",match[3],{style:"color: #006400"});
		case "darkkhaki":
			return $ce("span",match[3],{style:"color: #BDB76B"});
		case "darkmagenta":
			return $ce("span",match[3],{style:"color: #8B008B"});
		case "darkolivegreen":
			return $ce("span",match[3],{style:"color: #556B2F"});
		case "darkorange":
			return $ce("span",match[3],{style:"color: #FF8C00"});
		case "darkorchid":
			return $ce("span",match[3],{style:"color: #9932CC"});
		case "darkred":
			return $ce("span",match[3],{style:"color: #8B0000"});
		case "darksalmon":
			return $ce("span",match[3],{style:"color: #E9967A"});
		case "darkseagreen":
			return $ce("span",match[3],{style:"color: #8FBC8F"});
		case "darkslateblue":
			return $ce("span",match[3],{style:"color: #483D8B"});
		case "darkslategray":
			return $ce("span",match[3],{style:"color: #2F4F4F"});
		case "darkturquoise":
			return $ce("span",match[3],{style:"color: #00CED1"});
		case "darkviolet":
			return $ce("span",match[3],{style:"color: #9400D3"});
		case "deeppink":
			return $ce("span",match[3],{style:"color: #FF1493"});
		case "deepskyblue":
			return $ce("span",match[3],{style:"color: #00BFFF"});
		case "dimgrey":
			return $ce("span",match[3],{style:"color: #696969"});
		case "dodgerblue":
			return $ce("span",match[3],{style:"color: #1E90FF"});
		case "firebrick":
			return $ce("span",match[3],{style:"color: #B22222"});
		case "floralwhite":
			return $ce("span",match[3],{style:"color: #FFFAF0"});
		case "forestgreen":
			return $ce("span",match[3],{style:"color: #228B22"});
		case "fuchsia":
			return $ce("span",match[3],{style:"color: #FF00FF"});
		case "gainsboro":
			return $ce("span",match[3],{style:"color: #DCDCDC"});
		case "ghostwhite":
			return $ce("span",match[3],{style:"color: #F8F8FF"});
		case "gold":
			return $ce("span",match[3],{style:"color: #FFD700"});
		case "goldenrod":
			return $ce("span",match[3],{style:"color: #DAA520"});
		case "gray":
			return $ce("span",match[3],{style:"color: #808080"});
		case "grey":
			return $ce("span",match[3],{style:"color: #808080"});
		case "green":
			return $ce("span",match[3],{style:"color: #008000"});
		case "greenyellow":
			return $ce("span",match[3],{style:"color: #ADFF2F"});
		case "honeydew":
			return $ce("span",match[3],{style:"color: #F0FFF0"});
		case "hotpink":
			return $ce("span",match[3],{style:"color: #FF69B4"});
		case "indianred":
			return $ce("span",match[3],{style:"color: #CD5C5C"});
		case "indigo":
			return $ce("span",match[3],{style:"color: #4B0082"});
		case "ivory":
			return $ce("span",match[3],{style:"color: #FFFFF0"});
		case "khaki":
			return $ce("span",match[3],{style:"color: #F0E68C"});
		case "lavender":
			return $ce("span",match[3],{style:"color: #E6E6FA"});
		case "lavenderblush":
			return $ce("span",match[3],{style:"color: #FFF0F5"});
		case "lawngreen":
			return $ce("span",match[3],{style:"color: #7CFC00"});
		case "lemonchiffon":
			return $ce("span",match[3],{style:"color: #FFFACD"});
		case "lightblue":
			return $ce("span",match[3],{style:"color: #ADD8E6"});
		case "lightcoral":
			return $ce("span",match[3],{style:"color: #F08080"});
		case "lightcyan":
			return $ce("span",match[3],{style:"color: #E0FFFF"});
		case "lightgoldenrodyellow":
			return $ce("span",match[3],{style:"color: #FAFAD2"});
		case "lightgrey":
			return $ce("span",match[3],{style:"color: #D3D3D3"});
		case "lightgreen":
			return $ce("span",match[3],{style:"color: #90EE90"});
		case "lightpink":
			return $ce("span",match[3],{style:"color: #FFB6C1"});
		case "lightsalmon":
			return $ce("span",match[3],{style:"color: #FFA07A"});
		case "lightseagreen":
			return $ce("span",match[3],{style:"color: #20B2AA"});
		case "lightskyblue":
			return $ce("span",match[3],{style:"color: #87CEFA"});
		case "lightslategrey":
			return $ce("span",match[3],{style:"color: #778899"});
		case "lightsteelblue":
			return $ce("span",match[3],{style:"color: #B0C4DE"});
		case "lightyellow":
			return $ce("span",match[3],{style:"color: #FFFFE0"});
		case "lime":
			return $ce("span",match[3],{style:"color: #00FF00"});
		case "limegreen":
			return $ce("span",match[3],{style:"color: #32CD32"});
		case "linen":
			return $ce("span",match[3],{style:"color: #FAF0E6"});
		case "magenta":
			return $ce("span",match[3],{style:"color: #FF00FF"});
		case "maroon":
			return $ce("span",match[3],{style:"color: #800000"});
		case "mediumaquamarine":
			return $ce("span",match[3],{style:"color: #66CDAA"});
		case "mediumblue":
			return $ce("span",match[3],{style:"color: #0000CD"});
		case "mediumorchid":
			return $ce("span",match[3],{style:"color: #BA55D3"});
		case "mediumpurple":
			return $ce("span",match[3],{style:"color: #9370D8"});
		case "mediumseagreen":
			return $ce("span",match[3],{style:"color: #3CB371"});
		case "mediumslateblue":
			return $ce("span",match[3],{style:"color: #7B68EE"});
		case "mediumspringgreen":
			return $ce("span",match[3],{style:"color: #00FA9A"});
		case "mediumturquoise":
			return $ce("span",match[3],{style:"color: #48D1CC"});
		case "mediumvioletred":
			return $ce("span",match[3],{style:"color: #C71585"});
		case "midnightblue":
			return $ce("span",match[3],{style:"color: #191970"});
		case "mintcream":
			return $ce("span",match[3],{style:"color: #F5FFFA"});
		case "mistyrose":
			return $ce("span",match[3],{style:"color: #FFE4E1"});
		case "moccasin":
			return $ce("span",match[3],{style:"color: #FFE4B5"});
		case "navajowhite":
			return $ce("span",match[3],{style:"color: #FFDEAD"});
		case "navy":
			return $ce("span",match[3],{style:"color: #000080"});
		case "oldlace":
			return $ce("span",match[3],{style:"color: #FDF5E6"});
		case "olive":
			return $ce("span",match[3],{style:"color: #808000"});
		case "olivedrab":
			return $ce("span",match[3],{style:"color: #6B8E23"});
		case "orange":
			return $ce("span",match[3],{style:"color: #FFA500"});
		case "orangered":
			return $ce("span",match[3],{style:"color: #FF4500"});
		case "orchid":
			return $ce("span",match[3],{style:"color: #DA70D6"});
		case "palegoldenrod":
			return $ce("span",match[3],{style:"color: #EEE8AA"});
		case "palegreen":
			return $ce("span",match[3],{style:"color: #98FB98"});
		case "paleturquoise":
			return $ce("span",match[3],{style:"color: #AFEEEE"});
		case "palevioletred":
			return $ce("span",match[3],{style:"color: #D87093"});
		case "papayawhip":
			return $ce("span",match[3],{style:"color: #FFEFD5"});
		case "peachpuff":
			return $ce("span",match[3],{style:"color: #FFDAB9"});
		case "peru":
			return $ce("span",match[3],{style:"color: #CD853F"});
		case "pink":
			return $ce("span",match[3],{style:"color: #FFC0CB"});
		case "plum":
			return $ce("span",match[3],{style:"color: #DDA0DD"});
		case "powderblue":
			return $ce("span",match[3],{style:"color: #B0E0E6"});
		case "purple":
			return $ce("span",match[3],{style:"color: #800080"});
		case "red":
			return $ce("span",match[3],{style:"color: #FF0000"});
		case "rosybrown":
			return $ce("span",match[3],{style:"color: #BC8F8F"});
		case "royalblue":
			return $ce("span",match[3],{style:"color: #4169E1"});
		case "saddlebrown":
			return $ce("span",match[3],{style:"color: #8B4513"});
		case "salmon":
			return $ce("span",match[3],{style:"color: #FA8072"});
		case "sandybrown":
			return $ce("span",match[3],{style:"color: #F4A460"});
		case "seagreen":
			return $ce("span",match[3],{style:"color: #2E8B57"});
		case "seashell":
			return $ce("span",match[3],{style:"color: #FFF5EE"});
		case "sienna":
			return $ce("span",match[3],{style:"color: #A0522D"});
		case "silver":
			return $ce("span",match[3],{style:"color: #C0C0C0"});
		case "skyblue":
			return $ce("span",match[3],{style:"color: #87CEEB"});
		case "slateblue":
			return $ce("span",match[3],{style:"color: #6A5ACD"});
		case "slategray":
			return $ce("span",match[3],{style:"color: #708090"});
		case "snow":
			return $ce("span",match[3],{style:"color: #FFFAFA"});
		case "springgreen":
			return $ce("span",match[3],{style:"color: #00FF7F"});
		case "steelblue":
			return $ce("span",match[3],{style:"color: #4682B4"});
		case "tan":
			return $ce("span",match[3],{style:"color: #D2B48C"});
		case "teal":
			return $ce("span",match[3],{style:"color: #008080"});
		case "thistle":
			return $ce("span",match[3],{style:"color: #D8BFD8"});
		case "tomato":
			return $ce("span",match[3],{style:"color: #FF6347"});
		case "turquoise":
			return $ce("span",match[3],{style:"color: #40E0D0"});
		case "violet":
			return $ce("span",match[3],{style:"color: #EE82EE"});
		case "wheat":
			return $ce("span",match[3],{style:"color: #F5DEB3"});
		case "white":
			return $ce("span",match[3],{style:"color: #FFFFFF"});
		case "whitesmoke":
			return $ce("span",match[3],{style:"color: #F5F5F5"});
		case "yellow":
			return $ce("span",match[3],{style:"color: #FFFF00"});
		case "yellowgreen":
			return $ce("span",match[3],{style:"color: #9ACD32"});
		case "h1":
			return $ce("h1",match[3]);
		case "h2":
			return $ce("h2",match[3]);
		case "h3":
			return $ce("h3",match[3]);
		case "color":
			return $ce("span",match[3],{style:"color:"+match[2]});
		case "font":
			return $ce("span",match[3],{style:"font-family:"+match[2]});
		case "img":
			return $ce("img",match[3],{src:getUrl(match)});
	}
	return null;
}

function $ce(tagName,textContent,attributes)
{
	var element1=document.createElement(tagName);
	element1.textContent=textContent;
	for(var name1 in attributes) element1.setAttribute(name1,attributes[name1]);
	return element1;
}

function $ctn(text) { return document.createTextNode(text); }
function trimUrl(url) { return url.replace(/\s/g,""); }
function getUrl(match) { return trimUrl(match[2]?match[2]:match[3]); }
