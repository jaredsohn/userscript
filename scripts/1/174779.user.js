// ==UserScript==
// @name	gmailEnlargePreviewButton
// @author	Arasu
// @version	0.51

// @include	https://mail.google.com/*
// @include	http://mail.google.com/*
// @description	Enlarge image attachment for Gmail.
// ==/UserScript==

// Load jQuery
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {

/*
 * load jQuery hashchange event - v1.3 - 7/21/2010
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

var is_applied = false;

jQuery(document).ready(function(){
	
	jQuery(window).hashchange(function(){
	is_applied = false;
		jQuery("body").animate({"opacity": 1}, 1000, function(){

			if (unsafeWindow.gmonkey) {
				unsafeWindow.gmonkey.load('1.0', function(gmail) {
					if(is_applied != true)
					{	
						jQuery("img.hv").each(function(){
							var attachImg = jQuery(this);
							var attachImg_sml_src = attachImg.attr("src");

							attachImg.parent("a").click(function(){
								jQuery("body").append("<div class='black_over' style='background: rgba(0,0,0,.9); position: fixed; height: 100%; width: 100%; left: 0; right: 0; top: 0; bottom:0; cursor: pointer; z-index: 100000' ></div><div class='popup' style='z-index: 1000000; position: fixed; top: 20px; left:50%; margin-left: -600px; height: 95%; bottom: 10px; width: 1200px; border: solid 1px #fff; overflow: auto; '><img src='"+ jQuery(this).attr("href") +"' /></div>");
								jQuery(".black_over").click(function(){
									jQuery(".popup").remove();
									jQuery(this).remove();
								});
								return false;
							});

							attachImg.parents("td").next("td").find("a:first").click(function(){
								jQuery("body").append("<div class='black_over' style='background: rgba(0,0,0,.9); position: fixed; height: 100%; width: 100%; left: 0; right: 0; top: 0; bottom:0; cursor: pointer; z-index: 100000' ></div><div class='popup' style='z-index: 1000000; position: fixed; top: 20px; left:50%; margin-left: -600px; height: 95%; bottom: 10px; width: 1200px; border: solid 1px #fff; overflow: auto; '><img src='"+ jQuery(this).attr("href") +"' /></div>");
								jQuery(".black_over").click(function(){
									jQuery(".popup").remove();
									jQuery(this).remove();
								});
								return false;
							});

							attachImg.parents("td").next("td").find("a:first").before("<span class='e enlarge'>Enlarge </span> ");
							jQuery(".enlarge").live("click",function(){
								jQuery(this).parents("td").prev("td").find("img.hv").width(650);
								attachImg.attr("src", attachImg.parent("a").attr("href"));
								jQuery(this).parents("td").prev("td").find("img.hv").width(650);
								jQuery(this).removeClass("enlarge").addClass("shrink");
								jQuery(this).text("Shrink");
							});
							jQuery(".shrink").live("click",function(){
								attachImg.attr("src", attachImg_sml_src);
								jQuery(this).parents("td").prev("td").find("img.hv").css("width","auto");
								jQuery(this).removeClass("shrink").addClass("enlarge");
								jQuery(this).text("Enlarge ");
							});
							

						});
						is_applied = true;
					}

				});

			}
		});
	
 });
});




});