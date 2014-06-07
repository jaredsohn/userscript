// ==UserScript==
// @name        BroniesNL Customizer
// @namespace   Ossie/BroniesNL/Customizer
// @include     http://www.bronies.nl/*
// @include     https://www.bronies.nl/*
// @include     http://bronies.nl/*
// @include     https://bronies.nl/*
// @exclude     /\w*(gif|jpg|jpeg|png)/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require     http://www.datejs.com/build/date.js
// @version     2.4
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var settings = {"background":"Official","cusback":"","banner":"Official","cusban":"","theme":"Normal","noimages":0,"limitimages":1,"bettertime":1};
loadSettings();

var darkmod = [['body','color','#ddd'],['h2, h3','color','#ccc'],['.forumheader, .forumheader2, .forumheader3, .forumheader4, .fcaption, .finfobar', 'background-color','rgba(16,16,16,0.8)'],['.forumheader, .forumheader2, .forumheader3, .forumheader4, .fcaption, .finfobar', 'border','1px solid #2c65a4'],['#wrapper .smalltext','color','#ddd'],['#wrapper','border-radius','4px'],['.smalltext','color','#ddd'],['a:link, a:visited','color','#3f9aef'],['a:hover','color','#86bcef'],['#navigation','background-color',''],['.indent','background-color','rgba(0,0,0,0.1)'],['#wrapper','background','rgba(16,16,16,0.7)'],['.defaultform','background','rgba(255,255,255,0.1)'],['.npbutton','background','rgb(255,255,255)'],['#footer','background','url()'],['code span','color','#ddd']];
var whitemod = [['body','color','#111'],['h2, h3','color','#222'],['.forumheader, .forumheader2, .forumheader3, .forumheader4, .fcaption, .finfobar', 'background-color','rgba(255,255,255,0.8)'],['.forumheader, .forumheader2, .forumheader3, .forumheader4, .fcaption, .finfobar', 'border','1px solid #AAA'],['#wrapper .smalltext','color','#111'],['#wrapper','border-radius','4px'],['.smalltext','color','#111'],['a:link, a:visited','color','#3f7aef'],['a:hover','color','#86bcef'],['#navigation','background-color',''],['.indent','background-color','rgb(255,255,255)'],['#wrapper','background','rgba(255,255,255,0.5)'],['.defaultform','background','rgba(255,255,255,0.4)'],['.npbutton','background','rgb(255,255,255)'],['#footer','background','url()']];
var normal = [['body','color',''],['.forumheader, .forumheader2, .forumheader3, .forumheader4, .fcaption, .finfobar', 'background-color',''],['.forumheader, .forumheader2, .forumheader3, .forumheader4, .fcaption, .finfobar', 'border',''],['#wrapper .smalltext','color',''],['#wrapper','border-radius',''],['.smalltext','color',''],['a:link, a:visited','color',''],['a:hover','color',''],['#navigation','background-color',''],['.indent','background-color',''],['#wrapper','background',''],['.defaultform','background',''],['.npbutton','background',''],['#footer','background','']];

var themes = ["Dark Mod", "White Mod", "Normal"];
var backgrounds = {"Dark Mod":"http://i.imgur.com/rc4ARbY.jpg","Official":"http://www.bronies.nl/e107_themes/leaf/images/background_mlp2.jpg","None - White":"http://i.imgur.com/GHpkydG.png","None - Grey":"http://i.imgur.com/8KvYUOS.png","None - Black":"http://i.imgur.com/7gMwArd.png"};
var banners = {"Dark Mod":"http://i.imgur.com/QKNikxE.jpg","Official":"http://www.bronies.nl/e107_themes/leaf/images/01_header.png","Original":"http://i.imgur.com/Hiu5h1P.png","Rainbow Dash":"http://i.imgur.com/zIDVEHs.png","Luna/Zecora/Chrysalis":"http://i.imgur.com/JBfkwiX.png","Discord":"http://i.imgur.com/L3p8owm.jpg","None":""};

var optionsbutton = '<img class="customizerbutton" src="http://i.imgur.com/W3b3Sbv.png" style="position:absolute;right:0px;top:0px;z-index:1000;"></img>';

//0
var sback = '';
for(back in backgrounds){
	var sel = settings["background"] == back ? 'selected="selected"' : '';
	sback += '<option value="'+back+'" '+sel+'>'+back+'</option>';
}

//2
var sban = '';
for(ban in banners){
	var sel = settings["banner"] == ban ? 'selected="selected"' : '';
	sban += '<option value="'+ban+'" '+sel+'>'+ban+'</option>';
}

//4
var st = '';
for(t in themes){
	var sel = settings["theme"] == themes[t] ? 'selected="selected"' : '';
	st += '<option value="'+themes[t]+'" '+sel+'>'+themes[t]+'</option>';
}

//5
var sni = settings["noimages"] ? 'checked="yes"' : '';
var sli = settings["limitimages"] ? 'checked="yes"' : '';
var sbt = settings["bettertime"] ? 'checked="yes"' : '';

var options = format('<div class="customizeroptions" style="color:#FFF;text-align:left;display:none;position:absolute;right:0px;top:0px;z-index:999;background:rgba(50,50,50,0.6);border:1px solid rgba(150,150,150,0.5);padding:20px;">\
<span>Background:</span>\
<select name="cbackground" id="cbackground">{0}</select><BR>\
<span>Custom Background:</span>\
<input type="text" name="cusback" id="cusback" value="{1}"/><br><br>\
<span>Banner:</span>\
<select name="cbanner" id="cbanner">{2}</select><BR>\
<span>Custom Banner:</span>\
<input type="text" name="cusban" id="cusban" value="{3}"/><br><br>\
<span>Theme:</span><select name="ctheme" id="ctheme">{4}</select><BR>\
<input type="checkbox" name="cnoimages" id="cnoimages" {5}> Disable Images<br>\
<input type="checkbox" name="climitimages" id="climitimages" {6}> Limit Images<br>\
<input type="checkbox" name="cbettertime" id="cbettertime" {7}> Show Thread Age<br>\
<button class="savesettings" value="Save">Save</button></div>',sback, settings["cusback"], sban, settings["cusban"], st, sni, sli, sbt);
  
showSettingsButton();
applyTheme();
applyBackground();
applyBanner();
fixImages();
fixButtons();
fixSpoiler();
if(settings["bettertime"]) {
	betterTime();
}
if(settings["limitimages"]) {
	limitImages();
}
if(settings["noimages"]) {
	noImages();
}

$(document).keydown(function(e) {
	if(!e.ctrlKey && e.altKey && e.keyCode >= 49 && e.keyCode <= 56){
		var value = e.keyCode - 48;
		if($('#post').length != 0) {
			$('#post').insertAtCaret('[img width='+value+'00][/img]');
			//$('#post').setCaret($('#post').getCursorPosition()-6);
		} else if(document.location.href.indexOf('/forum_viewtopic.php') != -1) {
			$('.forumheader3 form p .tbox').insertAtCaret('[img width='+value+'00][/img]');
			//$('#post').setCaret($('#post').getCursorPosition()-6);
		}
	}
});

$('.customizeroptions span').css('width','130px').css('display','inline-block');
$('.customizerbutton').click(showSettings);
$('.savesettings').click(saveSettings);

function showSettingsButton() {
	$('body').append(optionsbutton).append(options);
}

function showSettings(event) {
	if($('.customizeroptions').is(":visible")) {
		$('.customizeroptions').hide();
	} else {
		$('.customizeroptions').show();
	}
}

function loadSettings() {
	var set = GM_getValue('settings');
	if(set != null) settings = JSON.parse(set);
}

function saveSettings(event) {
	settings["background"] = $('#cbackground').find(":selected").text();
	settings["cusback"] = $('#cusback').val() != null && $('#cusback').val() != '' ? $('#cusback').val() : '';
	settings["banner"] = $('#cbanner').find(":selected").text();
	settings["cusban"] = $('#cusban').val() != null && $('#cusban').val() != '' ? $('#cusban').val() : '';
	settings["theme"] = $('#ctheme').find(":selected").text();
	settings["noimages"] = $('#cnoimages').prop('checked');
	settings["limitimages"] = $('#climitimages').prop('checked');
	settings["bettertime"] = $('#cbettertime').prop('checked');
	GM_setValue('settings',JSON.stringify(settings));
	applyBackground();
	applyBanner();
	applyTheme();
	if(settings["noimages"]) {
		noImages();
	}
}

function applyTheme() {
	switch(settings["theme"]) {
		case("Dark Mod"):
			theme = darkmod;
		break;
		case("White Mod"):
			theme = whitemod;
		break;
		case("Normal"):
			theme = normal;
		break;
	}
	
	for(i = 0; i < theme.length; i++) {
		$(theme[i][0]).css(theme[i][1],theme[i][2]);
	}

}

function applyBackground() {
	var w = backgrounds[settings["background"]];
	if(settings["cusback"] != null && settings["cusback"] != "") w = settings["cusback"];
	$('body').css('background-image','url("'+w+'")');
}

function applyBanner() {
	var b = banners[settings["banner"]];
	if(settings["cusban"] != null && settings["cusban"] != "") b = settings["cusban"];
	$('#header').css('background','url("'+b+'") no-repeat scroll 0% 0% transparent');
}

function fixImages() {
	$('.forumheader2 img').each(function(index) {
		if($(this).attr('src').indexOf('nonew') != -1) {
			$(this).attr('src','http://i.imgur.com/yWQc5MT.png');
		} else if($(this).attr('src').indexOf('new.') != -1) {
			$(this).attr('src','http://i.imgur.com/FMUM9N9.png');
		}
	});
	
	$('.forumheader3 img').each(function(index) {
		if($(this).attr('src').indexOf('/nonew.png') != -1) {
			$(this).attr('src','http://i.imgur.com/yWQc5MT.png');
		} else if($(this).attr('src').indexOf('/new.png') != -1) {
			$(this).attr('src','http://i.imgur.com/FMUM9N9.png');
		} else if($(this).attr('src').indexOf('/sticky.png') != -1) {
			$(this).attr('src','http://i.imgur.com/h4cXlGk.png');
		} else if($(this).attr('src').indexOf('/announce.png') != -1) {
			$(this).attr('src','http://i.imgur.com/AnbFb3V.png');
		} else if($(this).attr('src').indexOf('/nonew_popular.png') != -1) {
			$(this).attr('src','http://i.imgur.com/8KxcQS7.png');
		} else if($(this).attr('src').indexOf('/new_popular.png') != -1) {
			$(this).attr('src','http://i.imgur.com/1J9BC2e.png');
		} else if($(this).attr('src').indexOf('/sticky_closed.png') != -1) {
			$(this).attr('src','http://i.imgur.com/GFh26F5.png');
		} else if($(this).attr('src').indexOf('/closed.png') != -1) {
			$(this).attr('src','http://i.imgur.com/SRLivKT.png');
		} else if($(this).attr('src').indexOf('/nonew_small.png') != -1) {
			$(this).attr('src','http://i.imgur.com/yWQc5MT.png');
		} else if($(this).attr('src').indexOf('/new_small.png') != -1) {
			$(this).attr('src','http://i.imgur.com/FMUM9N9.png');
		} else if($(this).attr('src').indexOf('/sticky_small.png') != -1) {
			$(this).attr('src','http://i.imgur.com/h4cXlGk.png');
		} else if($(this).attr('src').indexOf('/announce_small.png') != -1) {
			$(this).attr('src','http://i.imgur.com/AnbFb3V.png');
		} else if($(this).attr('src').indexOf('/nonew_popular_small.png') != -1) {
			$(this).attr('src','http://i.imgur.com/8KxcQS7.png');
		} else if($(this).attr('src').indexOf('/new_popular_small.png') != -1) {
			$(this).attr('src','http://i.imgur.com/1J9BC2e.png');
		} else if($(this).attr('src').indexOf('/sticky_closed_small.png') != -1) {
			$(this).attr('src','http://i.imgur.com/GFh26F5.png');
		} else if($(this).attr('src').indexOf('/closed_small.png') != -1) {
			$(this).attr('src','http://i.imgur.com/SRLivKT.png');
		} else if($(this).attr('src').indexOf('/e.png') != -1) {
			$(this).attr('src','http://i.imgur.com/5On2eOu.png');
		}
	});
	
	$('.forumheader3 img').each(function(index) {
		var src = $(this).attr('src');
		if(src.indexOf('lev1.') != -1) src = 'http://i.imgur.com/NT2kb0S.png';
		else if(src.indexOf('lev2') != -1) src = 'http://i.imgur.com/hDHNQSa.png';
		else if(src.indexOf('lev3') != -1) src = 'http://i.imgur.com/S83Bn9u.png';
		else if(src.indexOf('lev4') != -1) src = 'http://i.imgur.com/ESAMXeC.png';
		else if(src.indexOf('lev5') != -1) src = 'http://i.imgur.com/v8yUi3S.png';
		else if(src.indexOf('lev6') != -1) src = 'http://i.imgur.com/rqfI3dR.png';
		else if(src.indexOf('lev7') != -1) src = 'http://i.imgur.com/MJhubYv.png';
		else if(src.indexOf('lev8') != -1) src = 'http://i.imgur.com/jCy7qZR.png';
		else if(src.indexOf('lev9') != -1) src = 'http://i.imgur.com/pKd6f15.png';
		else if(src.indexOf('lev10') != -1) src = 'http://i.imgur.com/HM4MyzB.png';
		$(this).attr('src',src);
	});
	
	$('table tbody tr td a img').each(function(index) {
		if($(this).attr('src').indexOf('reply.') != -1) {
			$(this).attr('src','http://i.imgur.com/ppch3ZE.png');
		} else if($(this).attr('src').indexOf('newthread.') != -1) {
			$(this).attr('src','http://i.imgur.com/lpuuHS9.png');
		}
	});
}

function fixButtons() {
	$('.nav1 a, .nav2 a, .nav3 a, .nav4 a, .nav5 a')
		.css('top','32px')
		.css('background','rgba(255,255,255,0.3)')
		.css('border','1px solid rgba(127,127,127,0.7)')
		.css('width','102px')
		.css('height','23px')
		.css('line-height','23px');
	$('.nav1_onpage a, .nav2_onpage a, .nav3_onpage a, .nav4_onpage a, .nav5_onpage a')
		.css('top','32px')
		.css('background','rgba(255,255,255,0.4)')
		.css('border','1px solid rgba(127,127,127,0.7)')
		.css('width','102px')
		.css('height','23px')
		.css('line-height','23px')
		.css('margin','0px');
}

function betterTime() {
	var now = new Date();
	if(document.location.href.indexOf('/forum.php') != -1) {
		$('.forumheader3 .smallblacktext').each(function(index) {
			var t = $(this).text();
			console.log('1');
			if(t.indexOf('Edited') == -1) {
				console.log('2');
				if(t.indexOf(':') != -1) {
					var d = Date.parseExact(t.substring(4,t.indexOf(':')+5),'MMM dd yyyy, hh:mmtt');
					console.log(t.substring(4,t.indexOf(':')+5));
					var dif = Math.floor(Math.abs(now - d)/1000/60);
					if(dif>100800) dif = ">10w";
					else if(dif>1440) dif = Math.floor(dif/1440) + "d";
					else if(dif>60) dif = Math.floor(dif/60) + "h";
					else dif = dif + "m";
					$(this).html($(this).html() + " ("+dif+")");
				}
			}
		});
	}
	if(document.location.href.indexOf('viewforum') != -1) {
		$('.forumheader3').each(function(index) {
			if ( $(this).children().length != 2 ) { return; }
			var t = $(this).text();
			if(t.indexOf(':') != -1 && t.indexOf('Goto page:') == -1 && $(this).html().indexOf('mediumtext') == -1 && $(this).html().indexOf('smalltext') == -1) {
				var d = Date.parseExact(t.substring(t.length - 20),'MMM dd yyyy, hh:mmtt');
				console.log(t.substring(t.length - 20));
				var dif = Math.floor(Math.abs(now - d)/1000/60);
				if(dif>100800) dif = ">10w";
				else if(dif>1440) dif = Math.floor(dif/1440) + "d";
				else if(dif>60) dif = Math.floor(dif/60) + "h";
				else dif = dif + "m";
				var h = $(this).html();
				var p = h.indexOf('</a>')+4;
				$(this).html(h.substr(0,p) + " ("+dif+")" + h.substr(p));
			}
		});
	}
}

function limitImages() {
	if(document.location.href.indexOf('viewtopic') != -1) {
		$('.forumheader3 img').each(function(index) {
			$(this).css('max-width',800);
		});
	}
}

function fixSpoiler() {
	$('#dataform .forumheader2 img').each(function(index) {
		if($(this).attr('src').indexOf('/spoiler.png') != -1) {
			$(this).attr('onclick',"addtext('[spoiler][/spoiler]')");
		}
	});
}

function noImages() {
	if(document.location.href.indexOf('viewforum') != -1) {
		$('img:not(.customizerbutton,table tbody tr td a img, .forumheader2 img, .forumheader3 img)').remove();
	} else {
		$('img:not(.customizerbutton,table tbody tr td a img, .forumheader2 img)').remove();
	}
	$('.smalltext img').remove();
	$('h2, h3, .contentbody').css('background','url()');
	$('embed').attr('src','');
}

function format() {
	var s = arguments[0];
	for (var i = 0; i < arguments.length - 1; i++) {       
		var reg = new RegExp("\\{" + i + "\\}", "gm");             
		s = s.replace(reg, arguments[i + 1]);
	}
	return s;
}

jQuery.fn.extend({
insertAtCaret: function(myValue){
  return this.each(function(i) {
    if (this.selectionStart || this.selectionStart == '0') {
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
      this.focus();
      this.selectionStart = startPos + myValue.length;
      this.selectionEnd = startPos + myValue.length;
      this.scrollTop = scrollTop;
    } else {
      this.value += myValue;
      this.focus();
    }
  })
}
});

$.fn.setCaret = function(pos) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(pos, pos);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    });
};

(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);



