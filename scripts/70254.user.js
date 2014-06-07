// ==UserScript==
// @name           Google.com - iGoogle Clean
// @description	   Cleans Up Lots of Small Things and Compacts it to Look Sleeker
// @include        http://google.tld/*
// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @include        https://google.tld/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.1
// ==/UserScript==
(function(){	//START jQuery CODE
  if (document.title == "iGoogle") {

//THEME SPECIFIC STUFF BEGIN
//Chroma: Quenched BEGIN
    if($("#indi_theme_name").text().search("Chroma:") != -1){
      var bgcolor = $(".left_nav_footer_extension").css("background-color");
      GM_addStyle("#footerwrap, body {background-color: "+bgcolor+" !important;}");
      $(".left_nav_footer_extension").css("height","100%");
      $(".yui-b").css("margin-bottom","0");
    }
//Chroma: Quenched END
//THEME SPECIFIC STUFF END

//CONTENT SPECIFIC STUFF BEGIN
//World Clock BEGIN
    $(".modboxin iframe").load(function(){
      if($(this).attr("src").toLowerCase().match("clock.xml") != null){
        $(".modboxin iframe").css("height", "175px");
        $(".modboxin iframe").css("margin-bottom", "-8px");
      }
    });
//World Clock END
//CONTENT SPECIFIC STUFF END

    $("#chat_nav, #bottom_nav, #themeinfo, #promo, #footerwrapinner, #nhdrwrapinner>div.gradient").remove();
    $("#addstuff").html($("#addstuff>a"));
    GM_addStyle("#gbar, #guser {background: transparent !important; margin-bottom: -24px !important; color: #FFFFFF !important;}");
    GM_addStyle("a.gb1, .gb1, #addstuff a, .modtitle_text, .gseaopt a, a.gb3, #guser a {color: #FFFFFF !important;}");
    GM_addStyle(".gbh {border-top: none !important;}");
    GM_addStyle("a.v2maxbox, a.v2minbox, a.v2ddbox, a.v2dragbox, a.v2enlargebox {width: 0 !important;}");
    GM_addStyle("#nhdrwrapsizer {height: 100px !important; padding-top: 20px !important;}");
    GM_addStyle(".uftl {padding: 1px !important; overflow: hidden !important;}");
    GM_addStyle(".uftl a:visited {color: #222222 !important;}");
  } else if(document.title.search("Google Search") != -1) {
    $("#center_col").css("margin-right","0px");
  }
}());			//END jQuery CODE