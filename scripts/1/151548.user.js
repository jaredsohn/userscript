// ==UserScript==
// @name        wykopoverflow
// @namespace   http://userscripts.org/scripts/show/108188
// @include     http://*wykop.pl/*
// @version     1
// ==/UserScript==

if (typeof $ == 'undefined') {
		if (unsafeWindow.jQuery) {
			var $ = unsafeWindow.jQuery;
			main();
		} else {
			addJQuery(main);
		}
	} else {
		main();
	}
function main(){
	$(document).ready(function(){
			addMainStyle();
                        separateCommentNumber();
                        addHeaderButtons();
                        if(/wykopalisko/i.test(location.href))
                        {
                            addWykopaliskoStyle();
                            addZakopStyle();
                        }
	})
}

function addZakopStyle()
{
    $('.jbury').each(function(i,e){
        var number = $(e).find('i.cff5917').text();
        var box = $('<div>').addClass('burryBox').append($('<div>').addClass('number').text(number)).append($('<div>').addClass('text').text('zakopów'));
        $(e).parent().parent().append(box);
    })
    
}

function addHeaderButtons(){
    $('.slideoptions:first ul li').each(function(i,e){
        var element = $($(e).html()).attr('class', '');
        $('.filters').append($('<div>').addClass('headerButton').html(element));
    })
    $('.headerButton:first').addClass('first');
}
function separateCommentNumber(){
    $('article .marginleft10.caf.small.tdnone[href^="http"]').each(function(i,e){
        var count = parseInt($(e).find('span.hvline').text());
        var clas = count?"":"red";
        $(e).addClass(clas);
        $(e).find('span.mini').text(count);
        $(e).find('span.hvline').text('komentarze');
    })
}

function addWykopaliskoStyle()
{
    var style = "<style> \n\
                    article.entry .content { margin-left: 190px !important;}\n\
	</style>";
	$(style ).appendTo( "head" );
}

function addMainStyle()
{
	var style = "<style> body div#header-con {  background: #fff !important; height: 100px; min-height: 100px !important; box-shadow: none !important}\n\
                    body .wrapper { padding: 0 !important;  }\n\
                    body #header-con .wrapper.clr {height: 31px !important; background: #eee !important;width: 100% !important; max-width: 100% !important;  }\n\
                    body nav.main { max-width: 1300px !important; min-width: 950px !important; margin: 0 auto !important;}\n\
                    \n\
                    body div#header-con a {color: #0077CC !important; font-size: 12px }\n\
                    body #body-con {margin-top: 30px !important; }\n\
                    body nav.main {margin-top: 0px !important}\n\
                    body span.icon.website, body span.icon.websitefff { background: url('http://cdn.sstatic.net/stackoverflow/img/sprites.png') no-repeat !important; width: 250px !important; height: 61px !important}\n\
                     body span.icon.websitefff {margin-top: 25px !important; }\n\
                    body nav.main h1 a.selected { border: none !important; margin-top: 35px !important;}\n\
                    body nav.main a.selected {border: none !important; }\n\
                    body nav.main > a.tab {border-right: 1px solid #ccc !important; line-height: 13px !important; margin: 10px 6px !important; padding: 0 10px !important;text-transform: lowercase; }\n\
                    \n\
                    body nav.main a.tab:not(:last-child) {border: 0px; }\n\
                    body #body-con {padding-top: 35px !important;}\n\
                    \n\
                    body nav.main a.quickicon .icon {margin-top: 3px !important; }\n\
                    body .icon.miniwall {background-position: -264px -64px !important;}\n\
                    body .icon.hashnotifications {background-position: -374px -440px !important}\n\
                    body .icon.fav {background-position: -265px -96px !important}\n\
                    body .icon.add {background-position: -118px -27px !important}\n\
                    body .icon.search  {background-position: -133px -27px !important}\n\
                    body nav.main a.quickicon .imgavatar {height: 20px !important; width: 20px !important;}\n\
                    \n\
                    \n\
                    \n\
                    body aside span.lheight22 .marginright5 a {color: #3E6D8E !important; background: #E0EAF1 !important; border-bottom: 1px solid #3E6D8E !important; border-right: 1px solid #7F9FB6 !important; font-size: 12px !important; padding: 3px 4px !important; }\n\
                    body aside span.lheight22 span { float: left;}\n\
                     body aside span.lheight22 .c666 {clear: left; }\n\
                    body aside span.lheight22 .marginright5:hover a {background: #3e6d8e !important ; border-right: 1px solid #37607d !important; border-bottom:1px solid #37607d !important; color: #e0eaf1 !important; text-decoration: none !important;}\n\
                    \n\
                    article .link, article .link span {color: #0077CC !important; text-decoration: none !important; }\n\
                    article .diggbox .icon.diggcount { color: #555 !important; font-size: 24px !important; background: none !important; }\n\
                    article .diggbox .diggit .action, article .diggbox .diggit .action:hover {background: none !important; color: #555 !important; border: none !important; box-shadow: none !important}\n\
                    \n\
                    nav.main .quickpoint.miniwall .count {color: #fff !important; box-shadow: none !important}\n\
                    article .marginleft10.caf.small.tdnone[href^='http'] { background: #75845C; margin: 0 4px;  color: #fff; text-align: center; top: 0;overflow: hidden !important;   display: block !important; position: absolute; left: 50px !important;  width: 65px !important;  height: 65px !important; display: block !important; padding-top: 3px; }\n\
                    article .marginleft10.caf.small.tdnone.red[href^='http'] {color: #9A4444 !important; background: #fff !important;  } \n\
                    article .marginleft10.caf.small.tdnone[href^='http'] span.mini {padding-bottom: 3px; font-weight: bold;  font-size: 24px; background: none; width: 48px;  height: 30px; }\n\
                    article .marginleft10.caf.small.tdnone[href^='http'] span.hvline  { font-size: 11px; color: #fff !important;background: #75845C !important; display: block !important }\n\
                    article .marginleft10.caf.small.tdnone.red[href^='http'] span.hvline  {background: #fff !important; color:  #9A4444 !important; }                    \n\
                    article.entry .content { margin-left: 130px !important;}\n\
                    article .burryBox {text-align: center;  display: block; float: left; position: absolute; color: #999; top: 0; left: 135px; }\n\
                    article .burryBox .number {font-size: 24px; font-weight: bold; padding: 9px 0 14px 0}\n\
                    article .burryBox .text { font-size: 11px; }\n\
                    .headerButton.first {margin-left: 60px; } \n\
                    .headerButton { float: left; font-size: 16px; margin-right: 7px; background: #777; display: block; font-weight: bold;  padding: 6px 12px; text-decoration: none;}\n\
                    .headerButton:hover {background: #f90; }\n\
                    .headerButton:hover  a  { text-decoration: none; }\n\
                    .headerButton a {color: #fff; }\n\
                    #footer-con {box-shadow: none; background: #777; color: #fff;  border-top: 7px solid #000;}\n\
                     #footer-con  a{ color: #fff; }\n\
	</style>";
	$(style ).appendTo( "head" );
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
}