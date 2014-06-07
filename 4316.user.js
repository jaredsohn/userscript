// ==UserScript==
// @name Metacafe Embed Video Downloader
// @author Nightmare
// @namespace http://userbarmaker.com http://www.coinhop.com
// @version 1.1.0
// @description Show the real url to download metacafe video
// @ujs:category browser: embed video downloader
// @ujs:published 25-06-2006 18:07
// @ujs:modified 01-11-2006 18:09
// ==/UserScript==

if (/http\:\/\/.*metacafe.com\/watch\/.*/i.test(location.href)) {
	window.opera.addEventListener('BeforeEvent.load',function (e) {
			if (e.event.target instanceof Document) { 
				var targetElement, src;
				if ((targetElement = document.getElementById('tabs2')) && (src = document.getElementsByTagName('embed')[0].getAttribute('src'))) {
					var div, a, a2, span, span2, span3, link_uncoded, link_sponsor, randomnum;

					randomnum = Math.floor(Math.random()*5);
					var sponsor=new Array(5);
					sponsor[0]='http://userbarmaker.com/';
					sponsor[1]='http://www.coinhop.com/';
					sponsor[2]='http://userbarmaker.com/';
					sponsor[3]='http://www.coinhop.com/';
					sponsor[4]='http://fastg.org/';   
					link_sponsor = sponsor[randomnum];
	
					function in2html(txt)
					{
						if (!txt) return '';
						var txthtml = txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
						return(txthtml);
					}
					var source;var filetype='';var found;
					var scriptmedia=new Array();

					scriptmedia=document.getElementsByTagName('script');

					source=scriptmedia[12].text.match(/itemID=[0-9]+/i);

					if (source!=null)
					{
						source='http://www.metacafe.com/fplayer.php?itemID=' + String(source).match(/[0-9]+/i) + '&t=embedded';filetype='(.flv)';
						var xmlhttp=false;
						
						if(window.XMLHttpRequest)
						{
							try {xmlhttp=new XMLHttpRequest();}
							catch(e) {xmlhttp=false;}
						}
						
						if(xmlhttp!=false)
						{
							xmlhttp.open("GET",source,false);
							xmlhttp.send(null);
							var xmlobject=(new DOMParser()).parseFromString(xmlhttp.responseText,"application/xml");
							source=in2html(xmlobject.getElementsByTagName('playlist')[0].childNodes[1].getAttribute('url'));filetype='(.flv)';
							found=true;
						}
					}
					
					if (found!=true)
					{
						embmedia=document.getElementsByTagName('embed');
						for(i=0;i<embmedia.length;++i)
						{
						source=unescape(embmedia[i].getAttribute('src'));
						source=in2html(source.substring(73,source.indexOf('&')));
						}
					}

					a = document.createElement('a');
					a.setAttribute('href', source);
					a.setAttribute('style', 'padding:0;margin:5px 35% 5px 35%;pointer:hand;');

					span = document.createElement('span');
					span.appendChild(document.createTextNode('Download this video'));
					span.appendChild(document.createElement('br'));
					a.appendChild(span);

					span3 = document.createElement('span');
					span3.appendChild(document.createTextNode('Script sponsored by: '));

					a2 = document.createElement('a');
					a2.setAttribute('href', link_sponsor);
					a2.setAttribute('target', '_blank');
					a2.setAttribute('title', 'Click to Open in a new page');
					a2.setAttribute('style', 'padding:0;margin:5px 30% 5px 30%;pointer:hand;');
					span2 = document.createElement('span');
					span2.appendChild(document.createTextNode(sponsor[randomnum]));
					a2.appendChild(span2);

					div = document.createElement('div');
					div.setAttribute('style', 'height:70px;border-top:1px solid #dfdfdf;border-right:1px solid #dfdfdf;border-left:1px solid #dfdfdf;text-align:center;background-color:#f8f8f8;');
					div.appendChild(a);
					div.appendChild(span3);
					div.appendChild(a2);

					targetElement.insertBefore(div, targetElement.firstChild);
				}
			}
		}
		,false
	);
}