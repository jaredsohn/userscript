// ==UserScript==
// @name      What.CD Album Previews
// @namespace Crazycatz00
// @match     *://*.what.cd/torrents.php*
// @icon      https://ssl.what.cd/favicon.ico
// @version   1.0.2
// @grant     none
// ==/UserScript==
(function($){'use strict';
	var vidIDs={},
		artist=$('h2 a[href*="artist.php"]:first').text(),
		artistVarious=false,
		insertVid=function(e,i){
			$('#preview_video').stop(true,true);
			$('<iframe id="preview_video" style="display:none;width:100%;" width="580" height="326" src="//www.youtube.com/embed/'+i+'?rel=0&autoplay=1&vq=large" frameborder="0" scrolling="no" allowfullscreen></iframe>').appendTo(e.parent()).slideDown();
		},
		getId=function(s,d){
			if(!(d=d.feed)||!d.entry||d.entry.length===0){
				if((this.data('spell')||0)<3&&(d=d.link)&&d.length!==0){//If YouTube has a suggestion, try it
					var i=d.length;
					while(--i>=0){
						if(d[i].rel==='http://schemas.google.com/g/2006#spellcorrection'){
							this.data('spell',(this.data('spell')||0)+1);
							$.getJSON(d[i].href,getId.bind(this,s));
							return;
						}
					}
				}
				if(!this.data('noquote')){//Some tracks have slightly different titles
					this.data('noquote',true);
					$.getJSON('//gdata.youtube.com/feeds/api/videos?v=2&alt=json&orderby=relevance&max-results=1&q='+encodeURIComponent(s)+'%20by%20'+encodeURIComponent(artist),getId.bind(this,s));
					return;
				}
				if(!this.data('romanjiartist')){//Some artist's have "odd" names on pages
					this.data('romanjiartist',true);
					$.getJSON('//gdata.youtube.com/feeds/api/videos?v=2&alt=json&orderby=relevance&max-results=1&q='+encodeURIComponent(s)+'%20by%20'+encodeURIComponent(artist.replace(/[\u0250-\ue007]/g,'')),getId.bind(this,s));
					return;
				}
				this.css({color:'#ccc','text-decoration':'line-through',cursor:'default'}).unbind('click');
				vidIDs[s]=false;
				if(typeof window.noty==='function'){window.noty({text:'No YouTube videos were found for '+s,type:'warning',layout:'bottomRight',timeout:3000,closeWith:['click'],animation:{open:{height:'toggle'},close:{height:'toggle'},easing:'swing',speed:250}});}
				return;
			}
			vidIDs[s]=(d=d.entry[0].media$group.yt$videoid.$t);
			insertVid(this,d);
		},
		linkClick=function(e){e.preventDefault();
			var $this=$(this),v=$('#preview_video'),u='',i='';
			if(v.length!==0){
				u=v.prop('src');
				v.slideUp(function(){$(this).remove();});
			}
			v=$this.prop('title')||$this.text();
			if(typeof (i=vidIDs[v])==='string'){
				if(u.indexOf(i)===-1){
					insertVid($this,i);
				}
			}else if(i!==false){
				$.getJSON('//gdata.youtube.com/feeds/api/videos?v=2&alt=json&orderby=relevance&max-results=1&q=intitle%3A%22'+encodeURIComponent(v)+'%22%20by%20'+encodeURIComponent(artist),getId.bind($this,v));
			}
		},
		linktrack=function(){
			var $this=$(this),t=$this.text(),n=t.replace(/\s\s+/g,' ');
			if(n.search(/\.(png|jpe?g|gif|bmp|tiff?|cue|log|m3u8?|txt)$/i)!==-1){return;}
			if(n.search(/[([]?\d[-\/\d.:]*[)\]]?\s*-?\s*(.+)\.[^.]+\s*$/)!==-1||n.search(/-?\s*(.+)\.[^.]+\s*$/)!==-1){n=RegExp.$1;}
			if(!artistVarious){
				var a=new RegExp('^'+artist+'\\s*-\\s*','i');
				n=n.replace(a,'');
			}
			$this.empty().append($('<a/>',{href:'javascript:void(0)'}).html(t).prop('title',n).on('click',linkClick));
		},
		init=function(){
			$('.filelist_table tr:not(:first-child) td:first-child').each(linktrack);
			if(artist.length===0||artist.search(/Various\s+Artists/i)!==-1){
				artist=$('h2 span').text().trim().replace(/^Various\s+Artists\s*-\s*/,'');
				artistVarious=true;
			}
		};
	init();
})(window.jQuery);