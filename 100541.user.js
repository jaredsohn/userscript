// ==UserScript==
// @name           LazyLazyGirls
// @namespace      max
// @description    Lazygirls Better Picture Viewer
// @version        32
// @updateurl      http://userscripts.org/scripts/source/100541.user.js
//
// @exclude        http://www.lazygirls.info/account_settings?join=today
// @exclude        http://www.lazygirls.info/search*
//
// @include        http://www.lazygirls.info/*.html
// @include        http://www.lazygirls.info/*_*
// @include        http://www.lazygirls.info/
// @include        http://www.lazygirls.info/*loc=*
// @include        http://www.lazygirls.info/*sort=*
// @include        http://forums.lazygirls.info/*
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js
// @require        https://raw.github.com/OscarGodson/jKey/master/jquery.jkey.js
//
// Please subscribe to abp:subscribe?location=http://adrenochrome.org/x/blocklist.txt by opening this link in firefox.
// This list contain a custom block/filter set for better and faster blocking unwantend elements. GM is to slow for this
//
// http://www.lazygirls.info/account_settings?join=today
//
// ==/UserScript==
//
/*-------------------CONFIG-----------------------*/
var use_adblock_check = true;
var make_thumbnails_bigger = true;
var show_moderation_queue_pics = true; // buggy! Always true if make_thumbnails_bigger is true
var draggable_pictures = false;
var show_more_pictures = true;
var background_color = "black";
var text_color = "white";
/*-------------------CONFIG-----------------------*/

function importJQ() {
	if (typeof unsafeWindow.jQuery === "undefined") {
		unsafeWindow.jQuery = jQuery;
	}
	if (typeof unsafeWindow.$ === "undefined") {
		unsafeWindow.$ = jQuery;
	}
}
window.addEventListener("load",
                        function () {
                            importJQ();
                        },
                        false);

if (use_adblock_check) {
	try {
		var adblockcheck = $('iframe').css('-moz-binding');
		var adblock;
		if (adblockcheck.match(/foobarbazdummy/)) {
			adblock = true;
		}
		if (adblockcheck === "none") {
			adblock = false;
			$('table:eq(2)').replaceWith('<div id="suggestion"><h1> Please install <a href="abp:subscribe?location=http://adrenochrome.org/x/blocklist.txt">THIS BLOCKLIST</a> for adblock+</h1></div>');
		}
	} catch (err) {}
}
$('img[src$=".thumb.jpg"],[src$=".thumb.jpeg"],[src$=".thumb.png"]').load(function () {
	$(this).css('opacity', '1');
});

$('body, body table, tr, td, a, .f_ds, .f_cs, .f_d, .f_c').css({
	'background-color' : background_color
});
$('body, body table, tr, td, a').css({
	'color' : text_color
});
$('td').css('background-image', '');

$('BODY > TABLE + TABLE > TBODY > TR + TR > TD > TABLE + TABLE + TABLE').hide();

if (/Forums/.test(window.location)) {
	$('html body a, u').each(function () {
		$(this).css('color', text_color);
	});
}

$('img[title*="Star Celebrity"]').hide().each(function () {
	var stars = $(this).attr('title').replace(/\sStar Celebrity/i, "");
	var text = stars.toLowerCase();
	$(this).parent().replaceWith('<td align="center">' + text + '</td>');
});

if (draggable_pictures) {
	$(function () {
		$("a").draggable({
			stack : "a"
		});
	});
	$(function () {
		$("div").draggable({
			stack : "div"
		});
	});
}

if (window.document.URL === "http://www.lazygirls.info/") {
	$('html body table tbody tr td table tbody tr td[colspan="5"]').hide();
	$('div.mainsort').hide();
	$('a').css('font-size', '14px');
	$('html body table:eq(13)').hide();
	$('html body table:eq(14)').hide();
	$('.list').find('a[value!="0"][value!="1"]').each(function () {
		var strhref = $(this).attr("href");
		$(this).attr("href", strhref + '&sort=added_last?loc=0');
	});
}
if (window.document.URL !== "http://www.lazygirls.info/") {
	$(window).jkey('right',
                   function () {
                       var right = $('img[src$="nav_next.gif"]:last').parent().attr('href');
                       if (typeof right !== "undefined") {
                           window.location = right;
                       }
                   });
	$(window).jkey('left',
                   function () {
                       var left = $('img[src$="nav_prev.gif"]').parent().attr('href');
                       if (typeof left !== "undefined") {
                           window.location = left;
                       }
                   });
	$(window).jkey('h',
                   function () {
                       var h = "http://www.lazygirls.info";
                       window.location = h;
                   });
	
	if (window.document.URL !== "http://forums.lazygirls.info/") {
		if (!(/forums/i.test(window.location))) {
			$(window).ready(function () {
				try {
					$('table').hide("fast").delay(500).fadeIn(2000);
				} catch (e) {}
			});
			
			$('.main>a>img, .namelink, TABLE > TBODY > TR > TD[height="71"][width="299"][valign="top"]').hide();
			$('TABLE[align="center"][width="980"] > TBODY > TR > TD[height="71"][width="299"][valign="top"] + TD[align="center"] + TD[align="right"]').hide();
			$('TBODY > TR + TR > TD[width="678"] > TABLE[width="678"] > TBODY > TR > TD.main[align="center"] > A.main[target="_blank"]').hide();
			if (top.location != self.location) {
				$('BODY > TABLE + TABLE > TBODY > TR + TR:last-child > TD:first-child > TABLE:first-child + TABLE + TABLE > TBODY:first-child:last-child > tr').hide();
			}
			if (top.location === self.location) {
				$('BODY > TABLE + TABLE > TBODY > TR + TR > TD > TABLE + TABLE + TABLE + TABLE > TBODY > TR + TR + TR + TR + TR').hide();
			}
			var a = document.documentElement.clientWidth;
			var b = top.scrollHeight;
			var c = "200%";
			
			var maxtableheight = c;
			var maxtablewidth = (a / 4) - 8;
			var nameofgirl = $('title').text();
			var nameofgirlforlinkarray = nameofgirl.match(/[a-zA-Z0-9]+/g);
			var nameofgirlforlink = "";
			var i;
			try {
				for (i = 0; i < nameofgirlforlinkarray.length - 1; i = i + 1) {
					nameofgirlforlink = nameofgirlforlink + nameofgirlforlinkarray[i] + "_";
				}
				nameofgirlforlink = nameofgirlforlink + nameofgirlforlinkarray[nameofgirlforlinkarray.length - 1];
				nameofgirlforlink = nameofgirlforlink.toLowerCase();
			} catch (err) {}
			$('html body table tbody tr td table:eq(9), html body table tbody tr td table:eq(4), html body table tbody tr td a img:eq(0), html body table:eq(0)').hide();
			$('td[bgcolor="#BFD0EA"], [align="center"] [width="245"]').css('vertical-align', 'top');
			$('td[width="245"]').attr('width', '100');
			$('html body table a').each(function () {
				$(this).css('color', text_color);
			});
			$('html body table tbody tr td table tbody td').each(function () {
				$(this).css('color', 'black !important !important');
			});
			$('img[src$="sized.jpg"],[src$=".sized.png"],[src$=".sized.jpeg"]').each(function (index) {
				$(this).css('opacity', '1').bind('load',
                                                 function () {
                                                     $(this).animate({
                                                         opacity : 1
                                                     },
                                                                     '300');
                                                 });
			});
			if (make_thumbnails_bigger) {
				$('img[src$=".thumb.jpg"],[src$=".thumb.gif"],[src$=".thumb.png"],[src$=".thumb.jpeg"]').each(function () {
					var link1 = $(this).attr("src");
					$(this).attr('src', 'https://s3-eu-west-1.amazonaws.com/lazybukkit/25.gif').css('opacity', '1');
					if (link1) {
						link1 = link1.replace("thumb", "sized");
						var directlink = link1.replace(".sized", "");
						$(this).parent().attr('href', directlink);
						$(this).attr('src', link1).css({
							'max-width' : maxtablewidth,
							'max-height' : '600'
						});
					}
				});
			} else {
				$('img[src$=".thumb.jpg"],[src$=".thumb.gif"],[src$=".thumb.png"],[src$=".thumb.jpeg"]').each(function () {
					var link1 = $(this).attr("src");
					if (link1) {
						var directlink = link1.replace(".thumb", "");
						$(this).parent().attr('href', directlink);
					}
				});
			}
			$('img[src$=".sized.jpg"],[src$=".sized.gif"],[src$=".sized.png"],[src$=".sized.jpeg"]').each(function () {
				$(this).css({
					'max-width' : maxtablewidth,
					'max-height' : '800px'
				});
			});
			$('a[href$="tab=News"],a[href*="amazon"]').each(function () {
				$(this).hide();
			});
			$('a[href$="tab=Covers"]').each(function () {
				var agetext = $('td:contains("years old"):last').parent().text();
				var regex = /\( \d\d years old \)/;
				agetext = agetext.toString();
				var age = agetext.match(regex, "$1");
				$(this).replaceWith('<td width="130" style="text-align: center; color:white;">' + age + '</td><td><a class="zoek" style="color:white;" href="http://www.lazygirls.info/" target="_top">HOME</a><br>');
			});
			$('html body table tbody tr td table tbody tr td[width="124"]:eq(10)').attr('width', '35%');
			$('table tbody tr td table tbody tr td a:not([href*="lazy"],[href*="last"], .a2a_i, [href*="loc"], [text*="Most"])').each(function () {
				var linktonormalpage = $(this).attr("href");
				secretcoderegex = /_.{8}$/;
				var finallink = linktonormalpage.replace(".thumb", "");
				linktonormalpage = linktonormalpage.toString();
				var secretcode = linktonormalpage.match(secretcoderegex, "$1");
				if (linktonormalpage.match(secretcode)) {
					var stage1titleforlink = linktonormalpage.replace(secretcode, "");
					stage1titleforlink = stage1titleforlink.toLowerCase();
					var stage2titleforlink = stage1titleforlink + secretcode;
					var stage3titleforlink = stage2titleforlink + ".sized.jpg";
					if ($('img[naturalHeight=192]')) {
						stage3titleforlink = stage2titleforlink + ".sized.png";
					}
					if ($('img[naturalHeight=192]')) {
						stage3titleforlink = stage2titleforlink + ".sized.jpeg";
					}
					if ($('img[naturalHeight=192]')) {
						stage3titleforlink = stage2titleforlink + ".sized.jpg";
					}
					var stage4titleforlink = stage3titleforlink.replace(/\//g, "");
					stage4titleforlink = stage4titleforlink.replace(nameofgirlforlink, "");
					finallink = "http://img001.lazygirls.info/people/" + nameofgirlforlink + "/" + nameofgirlforlink + "_" + stage4titleforlink;
					var finallinkhref = finallink.replace(".sized", "");
					
					if (make_thumbnails_bigger) {
						$(this).parent().replaceWith('<td><br><base target="_blank" /><a href="' + finallinkhref + '" target="_blank"><img id="pic" align="top" max-width="' + maxtablewidth + 'px" border="0" title="" src=' + finallink + '><br></td>');
					} else if (show_moderation_queue_pics) {
						finallink = finallink.replace('sized', 'thumb');
						$(this).parent().replaceWith('<td><br><base target="_blank" /><a href="' + finallinkhref + '" target="_blank"><img id="pic" align="top" width="215px" border="0" title="" src=' + finallink + '><br></td>');
					}
				}
			});
		}
		$('nobr a[href*="loc"]').attr('align', 'center').css({
			'text-align' : 'center',
			'width' : '100%',
			'font-size' : 'xx-large',
			'font-color' : 'black !important',
			'opacity' : '0.11'
		}).mouseover(function () {
			$(this).css('opacity', '1');
		});
		if (window.location.hostname === "forums.lazygirls.info") {
			$('img[src="http://www.lazygirls.info/images/cn.gif"]').each(function () {
				var link1 = $(this).parent().attr("href");
				if (link1) {
					var str1 = link1.toString();
					var re1 = /\/.+_.+\//;
					var girl1 = str1.match(re1, "$1");
					girl1 = girl1.toString();
					girl1 = girl1.replace(/\//g, "");
					girl1 = girl1.toString();
					girl1 = girl1.replace(/www\.lazygirls\.info/g, "");
					var girl1low = girl1.toLowerCase();
					link1 = link1.replace(girl1, girl1low + '/' + girl1low + '_');
					link1 = link1.replace(/_\//g, "_");
					link1 = link1.replace("http://www.lazygirls.info", "http://img004.lazygirls.info/people");
					var linkend1 = link1;
					var re11 = /_.{7}$/;
					var linknoend1 = linkend1.match(re11, "$1");
					link1 = link1.replace(linknoend1, "");
					link1 = link1.toLowerCase();
					var picture1 = link1 + linknoend1 + ".sized.jpg";
					if ($('img[naturalHeight=192]')) {
						picture1 = link1 + linknoend1 + ".sized.png";
					}
					if ($('img[naturalHeight=192]')) {
						picture1 = link1 + linknoend1 + ".sized.jpg";
					}
					$(this).attr('src', picture1);
					var picture2 = picture1.replace(/\.sized/, "");
					$(this).parent().attr('href', picture2);
					$(this).attr('border', '1');
					$(this).css({
						'border-color' : 'red',
						'border' : '2',
						'opacity' : '1'
					});
				}
			});
			$('img[src$="thumb.gif"]').each(function () {
				var pic = $(this).attr('src');
				var picsrc = pic.replace(/\.thumb\.gif/, ".gif");
				var pichref = picsrc.replace(/\.thumb\.gif/, ".gif");
				$(this).attr('src', picsrc);
				$(this).parent().attr('href', pichref);
			});
			$('img[src$="thumb.png"]').each(function () {
				var pic2 = $(this).attr('src');
				var picsrc2 = pic2.replace(/\.thumb\.png/, ".sized.png");
				var pichref2 = pic2.replace(/\.thumb\.png/, ".png");
				$(this).attr('src', picsrc2);
				$(this).parent().attr('href', pichref2);
			});
			$('img[src$="thumb.jpg"]').each(function () {
				var pic3 = $(this).attr('src');
				var picsrc3 = pic3.replace(/\.thumb\.jpg/, ".sized.jpg");
				var pichref3 = pic3.replace(/\.thumb\.jpg/, ".jpg");
				$(this).attr('src', picsrc3);
				$(this).parent().attr('href', pichref3);
			});
			$('img[src$="thumb.jpeg"]').each(function () {
				var pic3 = $(this).attr('src');
				var picsrc3 = pic3.replace(/\.thumb\.jpeg/, ".sized.jpeg");
				var pichref3 = pic3.replace(/\.thumb\.jpeg/, ".jpeg");
				$(this).attr('src', picsrc3);
				$(this).parent().attr('href', pichref3);
			});
			$('img[src$="sized.jpg"],[src$="sized.gif"],[src$="sized.png"],[src$="sized.jpeg"]').each(function () {
				$(this).css({
					'opacity' : '0'
				}).bind('load',
                        function () {
                            $(this).animate({
                                'opacity' : '1'
                            },
                                            'fast');
                        });
			});
		}
		if (window.document.URL === "http://forums.lazygirls.info/") {
			$('img[title*="profiles.lazygirls.info, NOBR"]').remove();
		}
	}
	
	$('img[src$="nav_next.gif"],[src$="nav_prev.gif"]').attr({
		height : '55',
		width : '85'
	});
}
$('td[width="678"],table[width="678"]').removeAttr('width').attr('align', 'center');

$('body').mouseover(function () {
	$('body').css({
		'height' : maxtableheight,
		'width' : '99%'
	});
});
$('html body table').show();


var soers;
var soref;
var srreex = /img00\d/;

$('img').mouseenter(function () {
	var $img = $(this);
	
	if ($img.prop('naturalHeight') == 192) {
		soers = $(this).attr("src");
		soref = $(this).parent().attr("href");
		soers = soers.replace(srreex, "img005");
		soref = soref.replace(srreex, "img005");
		$(this).attr("src", soers);
		$(this).parent().attr('href', soref);
	}
	if ($img.prop('naturalHeight') == 192) {
		soers = $(this).attr("src");
		soref = $(this).parent().attr("href");
		soers = soers.replace(srreex, "img004");
		soref = soref.replace(srreex, "img004");
		$(this).attr("src", soers);
		$(this).parent().attr('href', soref);
	}
});

$('img').mouseleave(function () {
    $img = $(this);

	if ($img.prop('naturalHeight') == 192) {
		soers = $(this).attr("src");
		soref = $(this).parent().attr("href");
		soers = soers.replace(srreex, "img003");
		soref = soref.replace(srreex, "img003");
		$(this).attr("src", soers);
		$(this).parent().attr('href', soref);
	}

if ($img.prop('naturalHeight') == 192) {
    soers = $(this).attr("src");
    soref = $(this).parent().attr("href");
    soers = soers.replace(srreex, "img002");
    soref = soref.replace(srreex, "img002");
    $(this).attr("src", soers);
    $(this).parent().attr('href', soref);
}
if ($img.prop('naturalHeight') == 192) {
    soers = $(this).attr("src");
    soref = $(this).parent().attr("href");
    soers = soers.replace(srreex, "img001");
    soref = soref.replace(srreex, "img001");
    $(this).attr("src", soers);
    $(this).parent().attr('href', soref);
}
});

if (location.pathname.substring(1, 7) == "Avatar") {
	
	$('img[naturalHeight=192]').each(function () {
		var soers = $(this).attr("src");
		var soref = $(this).parent().attr("href");
		soers = soers.replace(".jpg", ".gif");
		soref = soref.replace(".jpg", ".gif");
		$(this).attr("src", soers);
		$(this).parent().attr('href', soref);
	});
}
$('img[src$=".sized.jpg"],[src$=".sized.gif"],[src$=".sized.png"],[src$=".sized.jpeg"]').each(function () {
	$(this).css({
		'max-width' : maxtablewidth,
		'max-height' : '800px'
	});
});

if (show_more_pictures) {
	if (window.document.URL !== "http://www.lazygirls.info/") {
		if (window.document.URL !== "http://forums.lazygirls.info/") {
			$('img[src$="nav_next.gif"]:eq(1)').each(function () {
				$(this).parent().attr('target', '_top');
				var nextpage = $(this).parent().attr("href");
				var baseurl = window.document.URL;
				var pageloc = /\?loc\=\d+$/;
				nextpageurl = baseurl.replace(pageloc, nextpage);
				if (top.location === self.location) {
					$('<iframe />', {
						id : 'nextpage',
						name : 'nextpage',
						src : nextpageurl,
						frameborder : '0',
						width : a,
						height : maxtableheight,
						scrolling : 'no'
					}).css({
						'overflow' : 'hidden',
						'float' : 'center'
					}).appendTo('body');
				}
			});
			var pagnum = nextpageurl.match(/\d+$/i, "$1");
			pagnum = parseInt(pagnum, 10);
			var nextpagenum = pagnum + 12;
			var uurrll = top.location.toString();
			var newbaseurl = uurrll.match(/(^.+loc\=)/g, "$1");
			var nextpageurli = newbaseurl + nextpagenum;
			if (top.location === self.location) {
				$('<iframe />', {
					id : 'framet',
					name : 'framet',
					src : nextpageurli,
					frameborder : '0',
					width : '100%',
					height : maxtableheight,
					scrolling : 'no'
				}).css('overflow', 'hidden').appendTo('body').last();
			}
		}
	}
}
