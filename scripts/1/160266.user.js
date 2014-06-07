// ==UserScript==
// @name        VK.se
// @namespace   MrBrax
// @description Icke PK-VK
// @include     http://www.vk.se/*
// @version     2.0
// ==/UserScript==

// Hide stupid stuff
$("#column-fourth").remove();
$("#header-bar").remove();
$("#head-article-teaser").remove();
$("#head-right-content").remove();
$("#sf-footer").remove();
$(".latest-news-ad").remove();
$("#about-cookies").remove();
$("#tv-carousel").remove();
$("#blog-carousel-all").remove();
$(".lokus-box").remove();
$("#adcontainer-matnoje").remove();
$("#goliat").remove();
$("#adcontainer-mk").remove();
$(".adcontainer").remove();
$("#fguiden-post-ads").remove();
//$(".teaser").remove();
$("#column-second").remove();

$(".teaser h5:contains('Annons: Veckans priser')").parent().remove();
$(".teaser h5:contains('Tyck till på vk.se')").parent().remove();
$(".teaser h5:contains('Applåden på vk.se')").parent().remove();
$(".teaser h5:contains('Politik- och opinionsbloggar')").parent().remove();
$(".teaser h5:contains('Webbtv')").parent().remove();
$(".teaser h5:contains('BB-bilder, bröllopsfoton och Dig ska vi fira')").parent().remove();
$(".teaser h5:contains('Gilla VK Nöje på Facebook')").parent().remove();
$(".teaser h5:contains('VK:s flöde på Twitter och Facebook')").parent().remove();
$(".teaser h5:contains('Läsarbilder')").parent().remove();
$(".teaser h5:contains('Lokus Köp och Sälj')").parent().remove();
$(".teaser h5:contains('Lokus Motor')").parent().remove();
$(".teaser h5:contains('Lokus Bostad')").parent().remove();
$(".fsize-36 a:contains('Har du bilder?')").parent().parent().parent().parent().remove();

$(".format-sportnu").remove();
$(".streamer").remove();
$(".teaser h2 a br").remove();
$("#footer").remove();

// Reposition & style
$("body").css("background","#fff");
$("#wrapper").css("width","1200px");
$("#main").css("width","1200px");
$("#column-first").css("width","990px");
$("#rightnow").css("font-size","14px");
$(".post-footer").css("width","990px");
$("#column-container-first-second").css("width","auto");
$("#site-menu").css("width","1200px");

$("#wrapper").css("padding","0");
$("#wrapper").css("overflow","hidden");

$(".teaser-child").css("margin","0");
$(".teaser-child").css("padding","0");

$("#column-first .teaser").css("padding","10px");
$("#column-first .teaser").css("margin","5px");
$("#column-first .teaser").css("border","1px solid #eee");
$("#column-first .teaser p").css("font-size","14px");
$("#column-first .teaser h2").css("font-size","36px");

// square image icons
$(".teaser-image").each(function(){
	var im = $(this).find("img").attr("src");
	$(this).append("<div style='border:1px solid #aaa;float:left;margin-right:20px;background:url("+im+");background-size:cover;width:150px;height:150px;'></div>");
	$(this).find("img").remove();
	$(this).parent().parent().css("height","152px");
});

$(".teaser-children .teaser-image div").css("height","80px");
$(".teaser-children .teaser-image div").css("width","80px");
$(".teaser-children .teaser").css("height","auto");

function addc(){
	String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
	var com = $("#disqus_thread").html();
	var loc = document.URL ? document.URL : window.location;
	//alert("do it");
	if(!com){
		//alert("add comments!");
		$("#post-comments").append('<div id="disqus_thread"></div>');

		var s = loc.split("/");
		
		//alert("loc: " + loc + ", " + s[3]);
		
		var disqus_url = loc;
		var disqus_identifier = s[3]+' http://www.vk.se/?p='+s[3];
		var disqus_container_id = 'disqus_thread';
		var disqus_domain = 'disqus.com';
		var disqus_shortname = 'vkse';
		var disqus_title = window.title;
			var disqus_config = function () {
			var config = this; // Access to the config object

			config.callbacks.preData.push(function() {
				// clear out the container (its filled for SEO/legacy purposes)
				document.getElementById(disqus_container_id).innerHTML = '';
			});
					config.callbacks.onReady.push(function() {
				// sync comments in the background so we don't block the page
				var script = document.createElement('script');
				script.async = true;
				script.src = '?cf_action=sync_comments&post_id='+s[3];

				var firstScript = document.getElementsByTagName( "script" )[0];
				firstScript.parentNode.insertBefore(script, firstScript);
			});
						};
		var facebookXdReceiverPath = 'http://www.vk.se/wp-content/plugins/disqus-comment-system/xd_receiver.htm';


	
	var dsq = document.createElement('script'); dsq.type = 'text/javascript';
	dsq.async = true;
		dsq.src = 'http' + '://' + disqus_shortname + '.' + 'disqus.com' + '/embed.js?pname=wordpress&pver=2.73';
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);


	}
}
//c();
setTimeout(addc,2000);