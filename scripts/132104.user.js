// ==UserScript==
// @name           MAIL.COM enlargeable article images
// @namespace      userscripts/sockenpuppe
// @description    Images in articles can be enlarged with a click on an icon below the image
// @include        http://*.mail.com/*.html*
// @include        http://mail.com/*.html*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
	
	$(document).ready(function() {
		$('head').append('<style type="text/css" media="screen">/* SLIMBOX */ #lbOverlay { position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%; background-color: #000; cursor: pointer; } #lbCenter, #lbBottomContainer { position: absolute; z-index: 9999; overflow: hidden; background-color: #fff; } .lbLoading { background: #fff url(http://slimbox.googlecode.com/svn/trunk/css/loading.gif) no-repeat center; } #lbImage { position: absolute; left: 0; top: 0; border: 10px solid #fff; background-repeat: no-repeat; } #lbPrevLink, #lbNextLink { display: block; position: absolute; top: 0; width: 50%; outline: none; } #lbPrevLink { left: 0; } #lbPrevLink:hover { background: transparent url(http://slimbox.googlecode.com/svn/trunk/css/prevlabel.gif) no-repeat 0 15%; } #lbNextLink { right: 0; } #lbNextLink:hover { background: transparent url(http://slimbox.googlecode.com/svn/trunk/css/nextlabel.gif) no-repeat 100% 15%; } #lbBottom { font-family: Verdana, Arial, Geneva, Helvetica, sans-serif; font-size: 10px; color: #666; line-height: 1.4em; text-align: left; border: 10px solid #fff; border-top-style: none; } #lbCloseLink { display: block; float: right; width: 66px; height: 22px; background: transparent url(http://slimbox.googlecode.com/svn/trunk/css/closelabel.gif) no-repeat center; margin: 5px 0; outline: none; } #lbCaption, #lbNumber { margin-right: 71px; } #lbCaption { font-weight: bold; } </style>');
		/*$ai = $('#article-alternate-picture img');
		$ai.wrap('<a href="'+$ai.attr('src').replace(/,[^.]+\./,'.')+'" rel="lightbox">').css('cursor','pointer');*/
		
		$('img.article-picture-large').each(function() {
			var $this = $(this), $title = '';
			
			if($this.parent('div').is('#article-alternate-picture')) {
				$title = $this.parent('div').find('span.picture-credits').html();
			}
			else if($this.parent('div').hasClass('gallery-image-container')) {
				$title = $this.parent('div').next('p.article-picture-large-caption').text();
			}
			
			var $theLink = $('<a href="'+$this.attr('src').replace(/,[^.]+\./,'.')+'" rel="lightbox-article" title="'+$title+'"></a>').css({
				display: 'block',
				width: '32px',
				height: '32px',
				position: 'absolute',
				right: '0px',
				bottom: '4px',
				'background-image': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEVDNUVFMkI5MjQ0MTFFMUE3QzRENTJFNkMyMkFFMDQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEVDNUVFMkM5MjQ0MTFFMUE3QzRENTJFNkMyMkFFMDQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RUM1RUUyOTkyNDQxMUUxQTdDNEQ1MkU2QzIyQUUwNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4RUM1RUUyQTkyNDQxMUUxQTdDNEQ1MkU2QzIyQUUwNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmL7ynUAAAKLSURBVHjavJdPSFRRFMbvjLPQEIxIkQJBKFrZJmhVKEJgBIIYtR0QphwKQQkVRUcxxBaBFE4zCLmMFkVCNBDEhG0SWs0qWkSBIQbihKAIMn0HvguXx9N5993xHfhx5t77/nzvvHPPeRPL5XLKxVKplNP58SrrTeAB+AB+gArYAmtgCrQpRztOwBzYAc9AD7jA+WZwDcyAX/l8/kmtBVwFL8EEx8/BTXARxEALuA5muf4IIorgbi0EXAJfQRJkwWXwEBTAP0ZERHwB01yX4zrBK4gYcBUwZDx1GpSMtTRzIm3MlZCEMp7keBki2sIKkKceBB/BiOVOeAz3lMPhsAIG6SWkByFep86JIUSh1VZAB5NPQv42ZD0oU7xYn62AbvpPjtt6lb436AkJep04v+lbPMkm1mX4jJ5EuMUtsUBtcPq8rYBG+l1QD/6AuiPO6SSmTfIau57rBRawSS/Jsw/OHREBufFnUPSsLfG8Zo7/2gooGcmoGM6M59gMBRTNNbMZ4XVc4c9vtgLe098GDWAv6AWYA9pu6et55qvuArnhIn9PhNwBfYaAQphClDUEJC1vLp3yjVGyD8MI+M4Go9gNkz6JVqY3rZctW/eQrEszmjVquoiYZwPSiXmaXnGbyvo7fi9I+T5l+94SPnMjfFL54BgjBRapn6AdnGHCaltja+5n+FMuAnQkVtigxviEfrbCkK+DBXAP3NE71EWALsvjrHI3WK7bGYVttu2ycfwovZWIRACRhxbbylpEXNXeRIT+1hcR+agFWImIVSoVpztVKbk6McVe+72Ok4pA4EictABTRMxPREJFY3p33PfujriKzkTECyMSi1FGwBuJAf0nKK6iNxFxVg/+CzAAKNCdKdLAz6oAAAAASUVORK5CYII=)'
			});
			$this.after($theLink);
		});
		/*
		Slimbox v2.04 - The ultimate lightweight Lightbox clone for jQuery
		(c) 2007-2010 Christophe Beyls <http://www.digitalia.be>
		MIT-style license.
		*/
		(function(w){var E=w(window),u,f,F=-1,n,x,D,v,y,L,r,m=!window.XMLHttpRequest,s=[],l=document.documentElement,k={},t=new Image(),J=new Image(),H,a,g,p,I,d,G,c,A,K;w(function(){w("body").append(w([H=w('<div id="lbOverlay" />')[0],a=w('<div id="lbCenter" />')[0],G=w('<div id="lbBottomContainer" />')[0]]).css("display","none"));g=w('<div id="lbImage" />').appendTo(a).append(p=w('<div style="position: relative;" />').append([I=w('<a id="lbPrevLink" href="#" />').click(B)[0],d=w('<a id="lbNextLink" href="#" />').click(e)[0]])[0])[0];c=w('<div id="lbBottom" />').appendTo(G).append([w('<a id="lbCloseLink" href="#" />').add(H).click(C)[0],A=w('<div id="lbCaption" />')[0],K=w('<div id="lbNumber" />')[0],w('<div style="clear: both;" />')[0]])[0]});w.slimbox=function(O,N,M){u=w.extend({loop:false,overlayOpacity:0.8,overlayFadeDuration:400,resizeDuration:400,resizeEasing:"swing",initialWidth:250,initialHeight:250,imageFadeDuration:400,captionAnimationDuration:400,counterText:"Image {x} of {y}",closeKeys:[27,88,67],previousKeys:[37,80],nextKeys:[39,78]},M);if(typeof O=="string"){O=[[O,N]];N=0}y=E.scrollTop()+(E.height()/2);L=u.initialWidth;r=u.initialHeight;w(a).css({top:Math.max(0,y-(r/2)),width:L,height:r,marginLeft:-L/2}).show();v=m||(H.currentStyle&&(H.currentStyle.position!="fixed"));if(v){H.style.position="absolute"}w(H).css("opacity",u.overlayOpacity).fadeIn(u.overlayFadeDuration);z();j(1);f=O;u.loop=u.loop&&(f.length>1);return b(N)};w.fn.slimbox=function(M,P,O){P=P||function(Q){return[Q.href,Q.title]};O=O||function(){return true};var N=this;return N.unbind("click").click(function(){var S=this,U=0,T,Q=0,R;T=w.grep(N,function(W,V){return O.call(S,W,V)});for(R=T.length;Q<R;++Q){if(T[Q]==S){U=Q}T[Q]=P(T[Q],Q)}return w.slimbox(T,U,M)})};function z(){var N=E.scrollLeft(),M=E.width();w([a,G]).css("left",N+(M/2));if(v){w(H).css({left:N,top:E.scrollTop(),width:M,height:E.height()})}}function j(M){if(M){w("object").add(m?"select":"embed").each(function(O,P){s[O]=[P,P.style.visibility];P.style.visibility="hidden"})}else{w.each(s,function(O,P){P[0].style.visibility=P[1]});s=[]}var N=M?"bind":"unbind";E[N]("scroll resize",z);w(document)[N]("keydown",o)}function o(O){var N=O.keyCode,M=w.inArray;return(M(N,u.closeKeys)>=0)?C():(M(N,u.nextKeys)>=0)?e():(M(N,u.previousKeys)>=0)?B():false}function B(){return b(x)}function e(){return b(D)}function b(M){if(M>=0){F=M;n=f[F][0];x=(F||(u.loop?f.length:0))-1;D=((F+1)%f.length)||(u.loop?0:-1);q();a.className="lbLoading";k=new Image();k.onload=i;k.src=n}return false}function i(){a.className="";w(g).css({backgroundImage:"url("+n+")",visibility:"hidden",display:""});w(p).width(k.width);w([p,I,d]).height(k.height);w(A).html(f[F][1]||"");w(K).html((((f.length>1)&&u.counterText)||"").replace(/{x}/,F+1).replace(/{y}/,f.length));if(x>=0){t.src=f[x][0]}if(D>=0){J.src=f[D][0]}L=g.offsetWidth;r=g.offsetHeight;var M=Math.max(0,y-(r/2));if(a.offsetHeight!=r){w(a).animate({height:r,top:M},u.resizeDuration,u.resizeEasing)}if(a.offsetWidth!=L){w(a).animate({width:L,marginLeft:-L/2},u.resizeDuration,u.resizeEasing)}w(a).queue(function(){w(G).css({width:L,top:M+r,marginLeft:-L/2,visibility:"hidden",display:""});w(g).css({display:"none",visibility:"",opacity:""}).fadeIn(u.imageFadeDuration,h)})}function h(){if(x>=0){w(I).show()}if(D>=0){w(d).show()}w(c).css("marginTop",-c.offsetHeight).animate({marginTop:0},u.captionAnimationDuration);G.style.visibility=""}function q(){k.onload=null;k.src=t.src=J.src=n;w([a,g,c]).stop(true);w([I,d,g,G]).hide()}function C(){if(F>=0){q();F=x=D=-1;w(a).hide();w(H).stop().fadeOut(u.overlayFadeDuration,j)}return false}})(jQuery);if(!/android|iphone|ipod|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)){jQuery(function(a){a("a[rel^='lightbox']").slimbox({},null,function(b){return(this==b)||((this.rel.length>8)&&(this.rel==b.rel))});a("a[href^='http://picasaweb.google.'] > img:first-child[src]").parent().slimbox({},function(b){return[b.firstChild.src.replace(/\/s\d+(?:\-c)?\/([^\/]+)$/,"/s512/$1"),(b.title||b.firstChild.alt)+'<br /><a href="'+b.href+'">Picasa Web Albums page</a>']});a("a[href^='market://']").slimbox({},function(b){return["http://chart.apis.google.com/chart?chs=400x400&cht=qr&chl="+encodeURIComponent(b.href.replace(/\/\?/,"?")),b.title+"<br />Scan this barcode with your Android phone."]})})};
	});
}

addJQuery(main);