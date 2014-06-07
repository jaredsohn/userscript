// ==UserScript==
// @name	Chromium RSS-Feed Detection
// @namespace	chromiumrssfeeddetection
// @description	Detect the RSS-Feed on Pages and show a little "SearchClone"-dialog
// @version	0.2
// @author	Matthias Ruchay
// @include	*
// @run-at	document-start
// ==/UserScript==

var base64FileRssFeedBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAfCAMAAACF8f6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZQTFRF6vH76PD66/L72eb32ef36fH64+354Or45e75oKCg5+/61+X33ur41eT35O353On40+P24uz51uX36vL74Ov51OT20uL25u/62uj42+j41OP2ytnspaWlxMTEsrKyzd3w2Ob3pKSkwsLCz9/x0NDQwMDB6fH7v8bOwsXJ4uz45u/5r7K14ev43Oj3zt3w3un42OT0u8bT3ej46fD6ydjr5e343eby6fD70uHy2ub0zNzv5+/55O341OHy2uf3xtbo0ODx1ePzv8TK4Or3zt7w4uv4uMPQ4uv33Of1s7i+1OL0yNbo2+j3v8vYzNPc3un16vH6AAAAQN33gQAAAFJ0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////AK0tDHEAAADOSURBVHjalNRFAsJAEETRCQkS3J3g7u7uztz/Mkh62Ndf19sW084DZgBj+43GuFZ8wfCR44zzqtEHVijxL0x3GVgh/4NxCYVDglMjmJTRYV8CsyZ0OENhheDRCmYhuA2BmQg+LWBlgicnWI3g2ARmJtjygDUJrv1gHYJzM1id4MgOdiO4coEtCGYjYIqAYTABd4qsAH3GBBsymIBJG5gsoBcsJaAD7A8DYATTkygYQfXqBrPpL6e2g2CX3A9y9bCMAfXuGtfhh0J9HX8LMAD6HYClD6NtaQAAAABJRU5ErkJggg%3D%3D';
var base64FileRssFeedClose = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAG9QTFRFrbS+tLzHprC8r7fCp7G9srzHrbbBlZuirbW+oaixqLK9pa21sbnCn6Wur7bBrLfDq7S+pq21lp2lrLbBl52lrbfDmaKtsrrEnqexsLnEnqi0oKexkpqkjpehk5ukmqOun6avnaOspay0lJqiAAAAy0sxaQAAACV0Uk5T////////////////////////////////////////////////AD/PQk8AAABgSURBVHjaYlBBAwxECrCrwCmwgBKvCIgSVFSGqeBQEAISPNwIMxg4ORnEGZANZWaWFECxhZGRTxpZgI2VlU1CDiHAJSoMJORlYAJM/CwgikVMFqaCCaJRigS/IAGAAAMA/y4f7r8savcAAAAASUVORK5CYII%3D';
var base64FileRssFeedCloseHover = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHhQTFRFhIqRXWFlgIiRhIuUgIeRaG51c3h+r7bBWV5kY2lwm6GroKiwk5ujiY+YtLzHXGBlnaaxh4yUfoSKlZujiY6Vg4uVr7fCmaGrcHZ9lp2nkpigipCYjJSeoaiyZ2twoaq0f4SKsLnEj5egkJafcHd9lZymlJ2nAAAADnKZ4gAAACh0Uk5T////////////////////////////////////////////////////AL6qLhgAAABgSURBVHjaYlBHAwxECjCqwymwgJwIG4hSEOSHqWBQBoowcAshzGCQkhaWZUA2VFJMkQfFFi4+dl5kAWZ5cVUlFYQAkwAzkJCRgAmwqrGAKBZRDpgKVohGThL8ggQAAgwAcG8iqyWfTH8AAAAASUVORK5CYII%3D';
var base64FileRssFeedIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAchQTFRF////9pY38Ik095c49JA2+Jk4+Zs57YIy9ZM28Ys0+p0553Yv84816Xsw7YMy//374Wss74cz5HEu2lwp54I564o76How5nUu214p6IQ6638x32Yr6oc7/vXu6oU56II45oM23WIq85hC/urV54A35YI25Hw48sGm5Xw343g27Is84Hk1/vTt7Zlh+cea98KX//r243c1/vfv77KV+buB6IM66oA47ok9+KJM5X04+8yf5X855oE56JZx6oc55YFQ9KZk5X4374g1+K9r6YY64Xs07Yw7+6pT6oQ+9LiN5XQy/vXr8aBi8Z1f9JQ/43Et86Fg/dm08Ik1//nz5n437I086ok7+q1c/MKE8Iw57aB0/e/j++LO9cSj76R0+p899Zg/5Ho29JZC+aNJ/eTL/ebN6ZRm+qRK44JZ9MCc9ZhE961q43k4+d3K4nY1/vr4+NK09LWG6YQ5+93C99bD/fDj4301//jy+KBI/u/g+8WN+cKN9pg6/vfz6oE6+rNq7Io696tm+ata7Iw664k6/fPt43w064c5/vXt43o3/Ny86ohM+Klb8sGr7Y4843It5Ho79LSF+smd7pFO+aFH5YE354A4AAAAZeosEgAAAJh0Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wDFacy5AAABAUlEQVR42iTPxWLCABAE0EkKBEhDQvDi1N3d3d3d3d3d3bu/26Q9vsPszIJopzzKv+G7vTqruQwQgepaHfYIk9kQrme0uhDh5vVxuL6p4t/GsG9YHckAvCljf9bYYLV/rg2JQOOpatYDl5qfOMyA2KeYc6HK1Da4mXX0NQ1xkeWEbHjMZcqN/d7RKdzlCnwRegwtlQW7SHtaSMI8LxfCpvbNRmK7fx3HDVI+EvTMQXvtnhfvOauYccegm7kAHjSpWOa3kBm8x4t2shMfbDOu5Vg8O5cQrTPmnXdwJyMDUmnxnCURFFL3CLwsuYNOy5vyLQVKfP6frrjx+PSVaqJfAQYAOnY2qLd6tj8AAAAASUVORK5CYII%3D';
var base64FileRssFeedIconHover = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdRQTFRF////9pY38Ik0+p057YIy8Ys09ZM253Yv4Wss84816Xsw7YMy5HEu74cz95c4//379JA2+Jk4+Zs5vGsv638x8482qmEovm4wyX430Vgn2l4p7ZE2vGgtvGot75U36Howvmwu3WIqumUt5XUu32Yr/vXu95g48Z1f/fDjp1wn9MCcqWAo77KV+aNJ96tm86FgtmEtvW8v/urVtl8r+NK09pg644JZ99bD+qRKuGEs7pFO+KJM++LOwHExvGou+8WNumku98KX9KZk+Klb9JQ/vGov8sGrvWUxuGEr5XQy6oE6+cea7ok9+atawHIw2m4r74g1v24uvW0vuGMt/vXt/vTt8Ik1/dm0v3IwuWMspVkn/vr4p1sm+8yf+cKN/ebN76R0vG0u//nz8sGm/u/gwHAvvnEvuGUs/vfv6JZx9LWG/e/j+93C8Iw5/Ny8uWUt+K9r9LSF+p896ohM/vXr2m0r9JZC7aB0/vfzv28vv3AwwHIx9LiN/eTLumcu+rNqu2Yt5YFQ6ZRm+smd+aFHvWsu9ZhEqV8p9Zg/u2kuplsm+d3K/MKE+KBIvm8ww240//r2+6pT+q1c7Zlh6oA4//jy961q8aBi+buB9cSj/fPtAAAAQj+0YgAAAJx0Uk5T//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8Av2dfGwAAAQdJREFUeNoUz9V6wlAAA+C0FNpBWdkY7jpX5u7u7i7M3d3dfedld3r5XyT5AkLiZ+yOS3fb7lTztJEQkOdNnytGo1VGqJig00ww2LL+e/DdKjsqWmG7RqnvHUCg4UZ2pCEdxa78zEIJ2Dim1rEm6OX81nAY0gM1p0e7JnV+4SfrYgTSF8upq2DSltOOybe1Q3Q2qvlbPCkrV4Y+8VJx1YUEXjzCnryXm4G4xTns1AleFKmYkp7XxwBWPwZw5l/GPtMELOnKcM/nIMnTgd5g8jjO2Vj8iROotqYh0akoSOnm6ke3hdPZbEs/iNlmoPu8KPg9VksNfUuMY26H/cTbl1cbuiPkX4ABAHm6OZShtISeAAAAAElFTkSuQmCC';

var allLinkTags = document.getElementsByTagName('link');
var feedFound = false;
var feedUrl = false;
var feedTitle = false;

for(a=0;a<allLinkTags.length;++a)
	{
	var link = allLinkTags[a];
	var type = link.getAttribute('type');
	if(type=='application/rss+xml'||type=='text/xml')
			{
			feedFound = true;
			feedTitle = link.getAttribute('title');
			feedUrl = link.getAttribute('href');
			break;
			}
	}

if( feedFound == true )
	{
	var celFeed = document.createElement('div');
		celFeed.setAttribute('id','chromiumfeed');
		celFeed.setAttribute('style','position:fixed;top:0;left:10px;width:56px;height:31px;z-index:999;background-image: url('+base64FileRssFeedBg+')');
		celFeed.innerHTML='<a style="position:absolute;left:8px;top:8px" onclick="this.parentNode.parentNode.removeChild(this.parentNode)" title="Schlie&szlig;en"><img src="'+base64FileRssFeedClose+'" border="0" onmouseover="this.src=\''+base64FileRssFeedCloseHover+'\'"  onmouseout="this.src=\''+base64FileRssFeedClose+'\'"/></a><a style="position:absolute;right:8px;top:8px" href="'+feedUrl+'" title="'+feedTitle+'"><img src="'+base64FileRssFeedIcon+'" border="0" onmouseover="this.src=\''+base64FileRssFeedIconHover+'\'"  onmouseout="this.src=\''+base64FileRssFeedIcon+'\'"/></a>';
	document.getElementsByTagName('body')[0].appendChild(celFeed);
	}