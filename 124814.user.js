// ==UserScript==
// @name           BonaParteImage
// @namespace      http://greasemonkey.norrskenkonsult.com/BonaParteImage
// @include        http://www.bonaparte.se/*
// ==/UserScript==


var nodes = document.evaluate("//a[contains(@href, 'ZoomImages')]", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

//console.log(nodes.snapshotLength);
//console.log(nodes.snapshotItem.length);
var attrib;
// There might be a small image from behind too, if so, the second node is the link we want:
if (nodes.snapshotLength == 2)
{
  attrib = nodes.snapshotItem(1).getAttribute("href");
}
else
{
  attrib = nodes.snapshotItem(0).getAttribute("href");
}
//console.log(attrib);

var aA = attrib.split("'")

//console.log(aA[1]);

var file = aA[1];

var imagename = file;

var closeOption = '&closewindowurl=FALSE';

var oeTags2 = '<object id="fsiviewer" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,42,0" width="1000" height="1400">'
+ ' <param name="movie" value="http://zoom.bonaparte.dk:80/erez3/fsi5/fsi.swf?FPXBase=http://zoom.bonaparte.dk:80/erez3%2Ferez%3Fsrc%3D&FPXSrc='+imagename+'&ViewerWidth=1000&ViewerHeight=1400&Skin=bonaparte_dk&MenuAlign=BR&NoNav=1&Effects=%26quality%3d100' + closeOption + '" />'
+ ' <param name="menu" value="FALSE" />'
+ ' <param name="allowscriptaccess" value="always" >'
+ ' <embed src="http://zoom.bonaparte.dk:80/erez3/fsi5/fsi.swf?FPXBase=http://zoom.bonaparte.dk:80/erez3%2Ferez%3Fsrc%3D&FPXSrc='+imagename+'&ViewerWidth=1000&ViewerHeight=1400&Skin=bonaparte_dk&MenuAlign=BR&NoNav=1&Effects=%26quality%3d100' + closeOption + '" width="1000" height="1400" allowscriptaccess="always" name="fsiviewer" menu="false" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">'
+ ' </object>';

var content = document.getElementsByClassName('clrBg09');
//console.log(content.length);
//console.log(content[0].innerHTML);

content[0].innerHTML = oeTags2;

