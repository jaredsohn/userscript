// ==UserScript==
// @name           Major General Download
// @namespace      download
// @include        http://deviantclip.com/*
// @include        http://www.deviantclip.com/*
// @include        http://www.kinkondemand.com/kod/shoot/*
// @include        http://jailbaitgallery.com/videos/*
// @include        http://www.jailbaitgallery.com/videos/*
// @include        http://shockingtube.com/view_video.php*
// @include        http://www.shockingtube.com/view_video.php*
// @include        http://madthumbs.com/videos/*
// @include        http://www.madthumbs.com/videos/*
// @include        http://xhamster.com/movies/*
// @include        http://www.xhamster.com/movies/*
// @include        http://slutload.com/watch/*
// @include        http://www.slutload.com/watch/*
// @include        http://www.extremetube.com/video/*
// @include        http://efukt.com/*
// @include        http://www.efukt.com/*
// @include        http://www.oporn.com/video/*
// @include        http://motherless.com/*
// @include        http://alphaporno.com/videos/*
// @include        http://www.alphaporno.com/videos/*
// @include        http://tube8.com/*
// @include        http://www.tube8.com/*
// ==/UserScript==

function $(a){return document.getElementById(a)}
function $$(a){return document.querySelector(a)}
function $e(a){return document.querySelectorAll(a)}
function $c(a){return document.createElement(a);}
function $t(a){return document.createTextNode(a);}

function md5(e){function h(a,b){var d,c,e,f,g;e=a&2147483648;f=b&2147483648;d=a&1073741824;c=b&1073741824;g=(a&1073741823)+(b&1073741823);if(d&c)return g^2147483648^e^f;return d|c?g&1073741824?g^3221225472^e^f:g^1073741824^e^f:g^e^f}function i(a,b,d,c,e,f,g){a=h(a,h(h(b&d|~b&c,e),g));return h(a<<f|a>>>32-f,b)}function j(a,b,d,c,e,f,g){a=h(a,h(h(b&c|d&~c,e),g));return h(a<<f|a>>>32-f,b)}function k(a,b,c,d,e,f,g){a=h(a,h(h(b^c^d,e),g));return h(a<<f|a>>>32-f,b)}function l(a,b,c,d,f,e,g){a=h(a,h(h(c^
(b|~d),f),g));return h(a<<e|a>>>32-e,b)}function m(a){var b="",c="",d;for(d=0;d<=3;d++)c=a>>>d*8&255,c="0"+c.toString(16),b+=c.substr(c.length-2,2);return b}var f=[],n,o,p,q,a,b,d,c,f=function(a){var b,c=a.length;b=c+8;for(var d=((b-b%64)/64+1)*16,e=Array(d-1),f=0,g=0;g<c;)b=(g-g%4)/4,f=g%4*8,e[b]|=a.charCodeAt(g)<<f,g++;e[(g-g%4)/4]|=128<<g%4*8;e[d-2]=c<<3;e[d-1]=c>>>29;return e}(e);a=1732584193;b=4023233417;d=2562383102;c=271733878;for(e=0;e<f.length;e+=16)n=a,o=b,p=d,q=c,a=i(a,b,d,c,f[e+0],7,3614090360),
c=i(c,a,b,d,f[e+1],12,3905402710),d=i(d,c,a,b,f[e+2],17,606105819),b=i(b,d,c,a,f[e+3],22,3250441966),a=i(a,b,d,c,f[e+4],7,4118548399),c=i(c,a,b,d,f[e+5],12,1200080426),d=i(d,c,a,b,f[e+6],17,2821735955),b=i(b,d,c,a,f[e+7],22,4249261313),a=i(a,b,d,c,f[e+8],7,1770035416),c=i(c,a,b,d,f[e+9],12,2336552879),d=i(d,c,a,b,f[e+10],17,4294925233),b=i(b,d,c,a,f[e+11],22,2304563134),a=i(a,b,d,c,f[e+12],7,1804603682),c=i(c,a,b,d,f[e+13],12,4254626195),d=i(d,c,a,b,f[e+14],17,2792965006),b=i(b,d,c,a,f[e+15],22,1236535329),
a=j(a,b,d,c,f[e+1],5,4129170786),c=j(c,a,b,d,f[e+6],9,3225465664),d=j(d,c,a,b,f[e+11],14,643717713),b=j(b,d,c,a,f[e+0],20,3921069994),a=j(a,b,d,c,f[e+5],5,3593408605),c=j(c,a,b,d,f[e+10],9,38016083),d=j(d,c,a,b,f[e+15],14,3634488961),b=j(b,d,c,a,f[e+4],20,3889429448),a=j(a,b,d,c,f[e+9],5,568446438),c=j(c,a,b,d,f[e+14],9,3275163606),d=j(d,c,a,b,f[e+3],14,4107603335),b=j(b,d,c,a,f[e+8],20,1163531501),a=j(a,b,d,c,f[e+13],5,2850285829),c=j(c,a,b,d,f[e+2],9,4243563512),d=j(d,c,a,b,f[e+7],14,1735328473),
b=j(b,d,c,a,f[e+12],20,2368359562),a=k(a,b,d,c,f[e+5],4,4294588738),c=k(c,a,b,d,f[e+8],11,2272392833),d=k(d,c,a,b,f[e+11],16,1839030562),b=k(b,d,c,a,f[e+14],23,4259657740),a=k(a,b,d,c,f[e+1],4,2763975236),c=k(c,a,b,d,f[e+4],11,1272893353),d=k(d,c,a,b,f[e+7],16,4139469664),b=k(b,d,c,a,f[e+10],23,3200236656),a=k(a,b,d,c,f[e+13],4,681279174),c=k(c,a,b,d,f[e+0],11,3936430074),d=k(d,c,a,b,f[e+3],16,3572445317),b=k(b,d,c,a,f[e+6],23,76029189),a=k(a,b,d,c,f[e+9],4,3654602809),c=k(c,a,b,d,f[e+12],11,3873151461),
d=k(d,c,a,b,f[e+15],16,530742520),b=k(b,d,c,a,f[e+2],23,3299628645),a=l(a,b,d,c,f[e+0],6,4096336452),c=l(c,a,b,d,f[e+7],10,1126891415),d=l(d,c,a,b,f[e+14],15,2878612391),b=l(b,d,c,a,f[e+5],21,4237533241),a=l(a,b,d,c,f[e+12],6,1700485571),c=l(c,a,b,d,f[e+3],10,2399980690),d=l(d,c,a,b,f[e+10],15,4293915773),b=l(b,d,c,a,f[e+1],21,2240044497),a=l(a,b,d,c,f[e+8],6,1873313359),c=l(c,a,b,d,f[e+15],10,4264355552),d=l(d,c,a,b,f[e+6],15,2734768916),b=l(b,d,c,a,f[e+13],21,1309151649),a=l(a,b,d,c,f[e+4],6,4149444226),
c=l(c,a,b,d,f[e+11],10,3174756917),d=l(d,c,a,b,f[e+2],15,718787259),b=l(b,d,c,a,f[e+9],21,3951481745),a=h(a,n),b=h(b,o),d=h(d,p),c=h(c,q);return m(a)+m(b)+m(d)+m(c).toLowerCase()};

var globalGrabber=
{
	"deviantclip.com":
	{
		getLink:function(cb){cb(decodeURIComponent($$(".player>script:last-child").textContent.match(/file":"(.*?)"/)[1]));},
		putLink:function(a)
		{
			var l=$c("a"),i;
			l.textContent="Download";
			l.href=a;
			$$(".toolbar>span").appendChild(l);
		}
	},
	"kinkondemand.com":
	{
		getLink:function(cb){cb($$(".shootPlaceHolder.video>script").textContent.match(/URIComponent\('(.+?)'/)[1]);},
		putLink:function(a){$$(".sceneMenu>li>a").href=a;}
	},
	"jailbaitgallery.com":
	{
		getLink:function(cb){cb(unsafeWindow.so.variables.vdo);},
		putLink:function(a)
		{
			var l=$c("a");
			l.href=a;
			l.setAttribute("class","style1");
			l.textContent="Download";
			var d=$$(".photo").nextSibling;
			d.parentNode.insertBefore(l,d);
		}
	},
	"shockingtube.com":
	{
		getLink:function(cb)
		{
			GM_xmlhttpRequest(
			{
				method:"GET",
				url:document.location.href.replace("view_video","ripe_config"),
				onload:function(r)
				{
					var d=new DOMParser().parseFromString(r.responseText,"text/xml");
					cb(d.getElementsByTagName("Media")[0].getAttribute("Path"));
				}
			});
		},
		putLink:function(a)
		{
			var l=$c("a");
			l.href=a;
			l.textContent="Download";
			$("container").appendChild(l);
		}
	},
	"madthumbs.com":
	{
		getLink:function(cb)
		{
			cb($$("#html5Player>source").src);
		},
		putLink:function(a)
		{
			var l=$$(".sponsored_text>a");
			l.removeAttribute("onclick");
			l.href=a;
			l.textContent="Download";
		}
	},
	"xhamster.com":
	{
		getLink:function(cb)
		{
			var d=$$(".TitleBar+div>script:last-child").textContent;
			cb(d.match(/srv': '(.*?)'/)[1]+"/flv2/"+d.match(/file': '(.*?)'/)[1]);
		},
		putLink:function(a){$$("#rate_tip+table a").href=a;}
	},
	"slutload.com":
	{
		getLink:function(cb)
		{
			cb(decodeURIComponent($$(".sp2+div+script").textContent.match(/flv:"(.*?)"/)[1]));
		},
		putLink:function(a){$$(".dld").href=a;}
	},
	"extremetube.com":
	{
		getLink:function(cb)
		{
			cb(decodeURIComponent($$("#video-box script").textContent.match(/video_url=(.*?)&/)[1]));
		},
		putLink:function(a){$$(".vp-boxcontent [name='Download Video']").href=a;}
	},
	"efukt.com":
	{
		getLink:function(cb)
		{
			cb($$("#middleColumn script").textContent.match(/\.file = "(.*)"/)[1]);
		},
		putLink:function(a)
		{
			var t=$$("#middleColumn script");
			var c=$c("a");
			c.href=a;
			c.textContent="Download";
			t.parentNode.insertBefore(c,t);
		}
	},
	"oporn.com":
	{
		getLink:function(cb){cb($$(".player>script").textContent.match(/url: '(http.*)'/)[1]);},
		putLink:function(a){$$(".saveLink").href=a;}
	},
	"motherless.com":
	{
		getLink:function(cb) {
			var tries = 0;
			function checkScript() {
				var s;
				try {
					s = $$('#media-media script');
				} catch(e) {
					s = null;
				}
				if(s == null) {
					if(tries++ > 10) {
						throw "Unable to find script tag";
					}
					return setTimeout(checkScript, 100);
				}
				s = s.textContent.match(/file: '(.*?)'/)[1] + '?start=0';
				cb(s);
			}
			checkScript();
		},
		putLink:function(a)
		{
			$('button-download').addEventListener('click', function() {
				location.assign(a);
			}, false);
		}
	},
	"alphaporno.com":
	{
		getLink:function(cb)
		{
			function prezero(s)
			{
				s=s.toString();
				if(parseInt(s)<10) return "0"+s;
				return s;
			}
			var v=decodeURIComponent(unsafeWindow.flashvars.video_url);
			var d=new Date();
			var t=d.getFullYear().toString()+prezero((d.getMonth()+1))+prezero(d.getDate())+prezero(d.getHours())+prezero(d.getMinutes())+prezero(d.getSeconds());
			var ahv=md5("9a09f60b56a8fc3e1fb8f96f3d0bfaf6alphaporno.com9a09f60b56a8fc3e1fb8f96f3d0bfaf6");
			ahv=md5(v+t+ahv);
			cb(v+"?time="+t+"&ahv="+ahv);
		},
		putLink:function(a)
		{
			var c=$$(".movie-format>li");
			var l=$c("a");
			l.href=a;
			l.appendChild($t("Download"));
			while(c.firstChild) c.removeChild(c.firstChild);
			c.appendChild(l);
		}
	},
	'tube8.com': {
		getLink: function(cb) {
			
		},
		putLink: function(url) {
			
		}
	}
};

addEventListener("load",function()
{
	var i,g;
	for(i in globalGrabber)
	{
		if(location.host.indexOf(i)>-1&&location.host.indexOf(i)==location.host.length-i.length)
		{
			g=globalGrabber[i];
			g.getLink(function(a)
			{
				if(a!=undefined&&a!=null&&a!="") g.putLink(a);
			});
			break;
		}
	}
},false);