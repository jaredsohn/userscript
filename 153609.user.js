<mason>
Charset=UTF-8
Author=AyuanX
Created=2012/11/22
Updated=2013/01/09
Version=1.1
Website=http://ayuanx.web.fc2.com/
Description=(PixHost.org) Show Only the Image
Comment=Show only the image skipping server redirection
Usage=Just import this script into mason
Url=^http://www\.pixhost\.org/show/\d+/\w+
</mason>

<parts>
part1=^@@@L3
</parts>
<part1>
function _masonRedirect(spec)
{
	if(spec.match(/\d+(?=\/)/) > 4030)
		return spec.replace('www.', 'img2.').replace('/show/', '/images/');
	else if(spec.match(/\d+(?=\/)/) > 3030)
		return spec.replace('www.', 'img1.').replace('/show/', '/images/');
	else if(spec.match(/\d+(?=\/)/) > 2030)
		return spec.replace('www.', 'img3.').replace('/show/', '/images/');
	else
		return spec.replace('www.', 'img4.').replace('/show/', '/images/');
}
</part1>
// ==UserScript==
// @name (PixHost.org) Show Only the Image
// @description Show only the image skipping server redirection
// ==/UserScript==