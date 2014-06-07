// ==UserScript==
// @name        Kaskus Livebeta Enhanced
// @description Modifies several elements in Kaskus Livebeta to enhance browsing quality.
// @icon        http://code.google.com/p/dev-kaskus-quick-reply/logo?cct=110309324
// @version     b1
// @author      s4nji
// @contributor idoenklinuxer
// @namespace   http://www.s4nji.com
// @include     http://livebeta.kaskus.co.id/*
// @include     http://livebeta.kaskus.co.id
// ==/UserScript==

/* deprecate, load later..
// @ -denied- require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js
*/

(function() {

    var gvar = {};
    gvar.kle = "";

// -----------------------------------------------
// - Configuration
// -----------------------------------------------

    gvar.debug = true;
    
// -----------------------------------------------
// - Functions Initialization
// -----------------------------------------------

// Libs list :

// = General
// log(x)
// GM_addGlobalStyle(a,b,c)
// GM_addGlobalScript(a,b,c)
// setValue(key,value,cb)
// getValue(key,_default,cb)
// delValue(key,cb)
// createEl(a,b,c)
// gID(x)
// dump(x)

// = KLE Specific
// kleloadpgvar()
// klesavegmval(cb)
// kleloadgmval()
// kleloadcpanel()
// cpanel_events()

// = Core
// start_main()
// jQ_wait()
// Init

    function log(x) {
        if(gvar.debug) {
            console.log('KLE: ' + x);
        }
    }

    function GM_addGlobalStyle(a, b, c) {
        var d, e;
        d = createEl("link", {href:a, type:"text/css", rel:"stylesheet", media:"all"});
        if("undefined" != typeof b && b) {
            d.setAttribute("id", b)
        }
        if("undefined" != typeof c && c) {
            document.body.insertBefore(d, document.body.firstChild)
        }else {
            e = document.getElementsByTagName("head");
            if("undefined" != typeof e && e[0].nodeName == "HEAD") {
                window.setTimeout(function() {
                    e[0].appendChild(d)
                }, 100)
            }else {
                document.body.insertBefore(d, document.body.firstChild)
            }
        }
        return d
    }

    function GM_addGlobalScript(a, b, c) {
        var d, e;
        d = createEl("script", {src:a, type:"text/javascript"});
        if("undefined" != typeof b && b) {
            d.setAttribute("id", b)
        }
        if("undefined" != typeof c && c) {
            document.body.insertBefore(d, document.body.firstChild)
        }else {
            e = document.getElementsByTagName("head");
            if("undefined" != typeof e && e[0].nodeName == "HEAD") {
                window.setTimeout(function() {
                    e[0].appendChild(d)
                }, 100)
            }else {
                document.body.insertBefore(d, document.body.firstChild)
            }
        }
        return d
    }
    
    function setValue(key, value, cb) {
        setTimeout(function(){
            if("undefined" == typeof value)
                value = "";
            GM_setValue(key, value);
            if(typeof cb =='function')
                cb(value);
            else if(cb)
                cb = ret;
        }, 1);
    }
    
    function getValue(key, _default, cb) {
        setTimeout(function(){
            var ret = GM_getValue(key, _default);
            if(typeof cb=='function')
                cb(ret);
            else if(cb)
                cb = ret;
            else
                return ret;
        }, 1);
    }
    
    function delValue(key, cb){
        try{
            setTimeout(function() {
                GM_deleteValue( key );
                if( typeof(cb)=='function' )
                    cb();
            }, 1);
        }catch(e){}
    }

    function gID(x) {
        return document.getElementById(x);
    }

    function createEl(a, b, c) {
        var d = document.createElement(a);
        for(var e in b) {
            if(b.hasOwnProperty(e)) {
                d.setAttribute(e, b[e])
            }
        }
        if(c) {
            d.innerHTML = c
        }
        return d
    }

    function dump(x) {
        return typeof JSON != "undefined" ? JSON.stringify(x) : x
    }

    function kleloadpgvar() {
        gvar.klefenabled = $("#kle-cpanel-content-general-enable-fixups").attr("checked");
        gvar.klefsliderentrycontent = $("#kle-cpanel-content-fixups-slider-entry-content-amount").val();
        gvar.klefslidercontent = $("#kle-cpanel-content-fixups-slider-content-amount").val();
        gvar.klefremoveads = $("#kle-cpanel-content-fixups-remove-ads").attr("checked");
        gvar.klefshorttitle = $("#kle-cpanel-content-fixups-short-title").attr("checked");
        gvar.klefslimthreadview = $("#kle-cpanel-content-fixups-slim-thread-view").attr("checked");
        gvar.klefalignfix = $("#kle-cpanel-content-fixups-align-fix").attr("checked");
        gvar.klefmarginfix = $("#kle-cpanel-content-fixups-margin-fix").attr("checked");
        gvar.klefsearchpagefix = $("#kle-cpanel-content-fixups-search-page-fix").attr("checked");
        gvar.klefzoomimage = $("#kle-cpanel-content-fixups-zoom-image").attr("checked");

        gvar.kletenabled = $("#kle-cpanel-content-general-enable-theme").attr("checked");
        gvar.kletbackground = $("#kle-cpanel-content-theme-background").val();
        gvar.kletfontfamily = $("#kle-cpanel-content-theme-font").val();
        gvar.kletcolor = $("#kle-cpanel-content-theme-color").val();
        gvar.klethotbartop = $("#kle-cpanel-content-theme-hotbar-top").attr("checked");
        gvar.kletbeautifybox = $("#kle-cpanel-content-theme-beautify-box").attr("checked");
        gvar.kletavatarrounding = $("#kle-cpanel-content-theme-avatar-rounding").attr("checked");

        gvar.klenenabled = $("#kle-cpanel-content-general-enable-navbar").attr("checked");
        
        var pL, preUnd = ["klefenabled", "klefremoveads", "klefshorttitle", "klefslimthreadview", "klefalignfix", "klefmarginfix", "klefsearchpagefix", "klefzoomimage", "kletenabled", "klethotbartop", "kletbeautifybox", "kletavatarrounding", "klenenabled"];
        pL = preUnd.length;
        for(var i = 0;i < pL;i++) {
            gvar[preUnd[i]] = typeof gvar[preUnd[i]] != "undefined"
        }
        log('Local var loaded')
    }

    function klesavegmval(cb) {
        
        setValue("f.enabled",               gvar.klefenabled);
        setValue("f.sliderentrycontent",    gvar.klefsliderentrycontent);
        setValue("f.slidercontent",         gvar.klefslidercontent);
        setValue("f.removeads",             gvar.klefremoveads);
        setValue("f.shorttitle",            gvar.klefshorttitle);
        setValue("f.slimthreadview",        gvar.klefslimthreadview);
        setValue("f.alignfix",              gvar.klefalignfix);
        setValue("f.marginfix",             gvar.klefmarginfix);
        setValue("f.searchpagefix",         gvar.klefsearchpagefix);
        setValue("f.zoomimage",             gvar.klefzoomimage);

        setValue("t.enabled",               gvar.kletenabled);
        setValue("t.background",            gvar.kletbackground);
        setValue("t.fontfamily",            gvar.kletfontfamily);
        setValue("t.color",                 gvar.kletcolor);
        setValue("t.hotbartop",             gvar.klethotbartop);
        setValue("t.beautifybox",           gvar.kletbeautifybox);
        setValue("t.avatarrounding",        gvar.kletavatarrounding);

        setValue("n.enabled",               gvar.klenenabled);
        
        setTimeout(function(){
            if(typeof cb == "function")
                cb();
            log('Save success!');
            alert('Save success');
        }, 10);
    }

    function kleloadgmval() {
        getValue("htmldelay",           "1000",    function(ret){ gvar.klehtmldelay = ret });

        getValue("f.enabled",           "true",    function(ret){ gvar.klefenabled = ret });
        getValue("f.sliderentrycontent","1024",    function(ret){ gvar.klefsliderentrycontent = ret });
        getValue("f.slidercontent",     "800",     function(ret){ gvar.klefslidercontent = ret });
        getValue("f.removeads",         "true",    function(ret){ gvar.klefremoveads = ret });
        getValue("f.shorttitle",        "true",    function(ret){ gvar.klefshorttitle = ret });
        getValue("f.slimthreadview",    "true",    function(ret){ gvar.klefslimthreadview = ret });
        getValue("f.alignfix",          "true",    function(ret){ gvar.klefalignfix = ret });
        getValue("f.marginfix",         "true",    function(ret){ gvar.klefmarginfix = ret });
        getValue("f.searchpagefix",     "true",    function(ret){ gvar.klefsearchpagefix = ret });
        getValue("f.zoomimage",         "true",    function(ret){ gvar.klefzoomimage = ret });

        getValue("t.enabled",           "true",    function(ret){ gvar.kletenabled = ret });
        getValue("t.background",        "",        function(ret){ gvar.kletbackground = ret });
        getValue("t.fontfamily",        "",        function(ret){ gvar.kletfontfamily = ret });
        getValue("t.color",             "",        function(ret){ gvar.kletcolor = ret });
        getValue("t.hotbartop",         "true",    function(ret){ gvar.klethotbartop = ret });
        getValue("t.beautifybox",       "true",    function(ret){ gvar.kletbeautifybox = ret });
        getValue("t.avatarrounding",    "true",    function(ret){ gvar.kletavatarrounding = ret });

        getValue("n.enabled",           "true",    function(ret){ gvar.klenenabled = ret });
                
        window.setTimeout(function(){           
            log('Load success!');
            loadcssvalues();
            // log(dump(gvar));
            
        }, 100);        
    }

    function kleloadcpanel() {
        $("#kle-cpanel-content-general-enable-fixups").attr("checked", gvar.klefenabled);
        $("#kle-cpanel-content-general-enable-theme").attr("checked", gvar.kletenabled);
        $("#kle-cpanel-content-general-enable-navbar").attr("checked", gvar.klenenabled);
        $(function() {
            $("#kle-cpanel-content-fixups-slider-entry-content").slider({range:"min", min:600, max:1440, value:gvar.klefsliderentrycontent, slide:function(event, ui) {
                $("#kle-cpanel-content-fixups-slider-entry-content-amount").val(ui.value)
            }});
            $("#kle-cpanel-content-fixups-slider-entry-content-amount").val($("#kle-cpanel-content-fixups-slider-entry-content").slider("value"))
        });
        $(function() {
            $("#kle-cpanel-content-fixups-slider-content").slider({range:"min", min:600, max:1440, value:gvar.klefslidercontent, slide:function(event, ui) {
                $("#kle-cpanel-content-fixups-slider-content-amount").val(ui.value)
            }});
            $("#kle-cpanel-content-fixups-slider-content-amount").val($("#kle-cpanel-content-fixups-slider-content").slider("value"))
        });
        $("#kle-cpanel-content-fixups-remove-ads").attr("checked", gvar.klefremoveads);
        $("#kle-cpanel-content-fixups-short-title").attr("checked", gvar.klefshorttitle);
        $("#kle-cpanel-content-fixups-slim-thread-view").attr("checked", gvar.klefslimthreadview);
        $("#kle-cpanel-content-fixups-align-fix").attr("checked", gvar.klefalignfix);
        $("#kle-cpanel-content-fixups-margin-fix").attr("checked", gvar.klefmarginfix);
        $("#kle-cpanel-content-fixups-search-page-fix").attr("checked", gvar.klefsearchpagefix);
        $("#kle-cpanel-content-fixups-zoom-image").attr("checked", gvar.klefzoomimage);
        $("#kle-cpanel-content-theme-background").val(gvar.kletbackground);
        $("#kle-cpanel-content-theme-font").val(gvar.kletfontfamily);
        $("#kle-cpanel-content-theme-color").val(gvar.kletcolor);
        $("#kle-cpanel-content-theme-hotbar-top").attr("checked", gvar.klethotbartop);
        $("#kle-cpanel-content-theme-beautify-box").attr("checked", gvar.kletbeautifybox);
        $("#kle-cpanel-content-theme-avatar-rounding").attr("checked", gvar.kletavatarrounding)
    }

    function cpanel_events() {
        $("#kle-cpanel-nav > li > a").click(function(e) {
            e.preventDefault();

            //-- Get clicked element tabindex
            var index = $(this).attr('tabindex');

            //-- Toggle .active on elements currently have .active
            $("#kle-cpanel-nav > .active").toggleClass("active");
            $("#kle-cpanel-content > .active").toggleClass("active");

            //-- Toggle .active on elements with tabindex matching the clicked element tabindex
            $("#kle-cpanel-nav > li[tabindex='"+index+"']").toggleClass("active");
            $("#kle-cpanel-content > div[tabindex='"+index+"']").toggleClass("active");
        });

        // CPANEL ACTIVATION
        $("#kle-cpanel-trigger").click(function(e){
            e.preventDefault();
            $("#kle-cpanel-trigger").css("display", "none");
            $('#kle-wrapper').toggleClass('visible');
            $('#wrapper').css('position', 'relative');
            $('#wrapper').css('z-index', '-99999');
            window.setTimeout("$('#kle-wrapper').toggleClass('opaque')",25);
            kleloadcpanel();
        });

        // CPANEL CLOSE
        $("#kle-cpanel-exit").click(function(e){
            e.preventDefault();
            $("#kle-cpanel-trigger").css("display", "inline-block");
            $('#kle-wrapper').toggleClass('opaque');
            window.setTimeout("$('#kle-wrapper').toggleClass('visible');",500);
            window.setTimeout("$('#wrapper').css('position', 'static');",500);
            window.setTimeout("$('#wrapper').css('z-index', '0');",500);
        });
        $("#kle-cancel").click(function(e){
            e.preventDefault();
            $("#kle-cpanel-trigger").css("display", "inline-block");
            $('#kle-wrapper').toggleClass('opaque');
            window.setTimeout("$('#kle-wrapper').toggleClass('visible');",500);
            window.setTimeout("$('#wrapper').css('position', 'static');",500);
            window.setTimeout("$('#wrapper').css('z-index', '0');",500);
        });

        // GENERATE DEBUG
        $("#kle-generate-debug").click(function(e){
            e.preventDefault();
            $('#kle-debug-box').val( dump(gvar) );
        });

        // CONFIRM BUTTON
        $("#kle-confirm").click(function(e){
            e.preventDefault();
            kleloadpgvar();
            klesavegmval();
            $("#kle-cpanel-trigger").css("display", "inline-block");
            $('#kle-wrapper').toggleClass('opaque');
            window.setTimeout("$('#kle-wrapper').toggleClass('visible')",500);
        });

        // APPLY BUTTON
        $("#kle-apply").click(function(e){
            e.preventDefault();
            kleloadpgvar();
            klesavegmval();
        });
    }
    
    function start_main() {
        log("Started!");
        kleloadgmval();
        if (!gID("kle-wrap")) {
            var wrap = createEl('div',{id:'kle-wrap', style:'display:none'});
            wrap.innerHTML = "<div id='kle-preload' style='display:none'> <img src='http://cdn.s4nji.com/kle/checked.png'/> <img src='http://cdn.s4nji.com/kle/unchecked.png'/> <img src='http://cdn.s4nji.com/kle/hovered.png'/> <img src='http://cdn.s4nji.com/kle/pat.png'/> </div> <div id='kle-cpanel-trigger'> <a id='kle-cpanel-trigger-text' href='#'> <img id='kle-cpanel-trigger-icon' src='http://puu.sh/B3a0'/> KLE </a> </div> <div id='kle-wrapper'> <div id='kle-cpanel-overlay'>Easter Egg Found! :D :D</div> <div id='kle-cpanel'> <h1 id='kle-cpanel-header'>Kaskus Livebeta - <b>Enhanced</b></h1> <a id='kle-cpanel-exit' class='kle-cpanel-button red' href='#'>X</a> <ul id='kle-cpanel-nav'> <li tabindex='1' class='active'><a href='#' tabindex='1'>General</a></li> <li tabindex='2'><a href='#' tabindex='2'>Fixups</a></li> <li tabindex='3'><a href='#' tabindex='3'>Theme</a></li> <li tabindex='4'><a href='#' tabindex='4'>Nav-Bar</a></li> <li tabindex='5'><a href='#' tabindex='5'>About</a></li> <li tabindex='6'><a href='#' tabindex='6'>Help</a></li> <li tabindex='7'><a href='#' tabindex='7'>#</a></li> </ul> <div id='kle-cpanel-content'> <div class='active' id='kle-cpanel-content-general' tabindex='1'> <div class='column-1'> <input type='checkbox' id='kle-cpanel-content-general-enable-fixups'/><label for='kle-cpanel-content-general-enable-fixups'>Enable Fixups</label><br/> <input type='checkbox' id='kle-cpanel-content-general-enable-theme'/><label for='kle-cpanel-content-general-enable-theme'>Enable Theme</label><br/> <input type='checkbox' id='kle-cpanel-content-general-enable-navbar'/><label for='kle-cpanel-content-general-enable-navbar'>Enable Navbar</label><br/> </div> <div class='column-2'> </div> </div> <div id='kle-cpanel-content-fixups' tabindex='2'> <div class='column-1'> <p>Entry-Content Width : <input id='kle-cpanel-content-fixups-slider-entry-content-amount'/>px</p> <div id='kle-cpanel-content-fixups-slider-entry-content'></div> <input type='checkbox' id='kle-cpanel-content-fixups-remove-ads'/><label for='kle-cpanel-content-fixups-remove-ads'>Remove ads</label><br/> <input type='checkbox' id='kle-cpanel-content-fixups-short-title'/><label for='kle-cpanel-content-fixups-short-title'>Shorten thread titles</label><br/> <input type='checkbox' id='kle-cpanel-content-fixups-slim-thread-view'/><label for='kle-cpanel-content-fixups-slim-thread-view'>Slim threads in forum view</label><br/> <input type='checkbox' id='kle-cpanel-content-fixups-align-fix'/><label for='kle-cpanel-content-fixups-align-fix'>Fix broken align</label><br/> <input type='checkbox' id='kle-cpanel-content-fixups-margin-fix'/><label for='kle-cpanel-content-fixups-margin-fix'>Lotsofinsignificant margin fix</label><br/> <input type='checkbox' id='kle-cpanel-content-fixups-search-page-fix'/><label for='kle-cpanel-content-fixups-search-page-fix'>Searchpage fix</label><br/> <input type='checkbox' id='kle-cpanel-content-fixups-zoom-image'/><label for='kle-cpanel-content-fixups-zoom-image'>Zoom image on hover</label><br/> </div> <div class='column-2'> <p>Content Width : <input id='kle-cpanel-content-fixups-slider-content-amount'/>px</p> <div id='kle-cpanel-content-fixups-slider-content'></div> </div> </div> <div id='kle-cpanel-content-theme' tabindex='3'> <div class='column-1'> <label for='kle-cpanel-content-theme-background'>Background: </label><input id='kle-cpanel-content-theme-background'/><br/> <label for='kle-cpanel-content-theme-font'>Font-family: </label><input id='kle-cpanel-content-theme-font'/><br/> <label for='kle-cpanel-content-theme-color'>Text-color: </label><input id='kle-cpanel-content-theme-color'/><br/> </div> <div class='column-2'> <input type='checkbox' id='kle-cpanel-content-theme-hotbar-top'/><label for='kle-cpanel-content-theme-hotbar-top'>Hotbar on Top, Searchbar bottom</label><br/> <input type='checkbox' id='kle-cpanel-content-theme-beautify-box'/><label for='kle-cpanel-content-theme-beautify-box'>Beautify spoiler, quote, pre</label><br/> <input type='checkbox' id='kle-cpanel-content-theme-avatar-rounding'/><label for='kle-cpanel-content-theme-avatar-rounding'>Avatar Rounding</label><br/> </div> </div> <div id='kle-cpanel-content-navbar' tabindex='4'> <p>TBA</p> </div> <div id='kle-cpanel-content-about' tabindex='5'> <p>This userscript is made by <a href='http://s4nji.com'>s4nji</a></p> <p>Special Thanks to :</p> <ul> <li><p><a href='http://www.pixeden.com'>Pixeden</a> for their awesome 'Minimalist Dark Psd Web UI Set' :D </p></li> <li><p><a href='http://www.userscripts.com'>Greasemonkey</a> for making such an awesome addon :P </p></li> </div> <div id='kle-cpanel-content-help' tabindex='6'> <h3>How to configure</h3> <p><i>Entry-Content-Width</i> = Lebar kaskus</p> <p><i>Content-Width</i> = Lebar elemen post kaskus</p> <p>Jika <i>Content-Width > Entry-Content-Width</i>, maka struktur post hancur, oleh karena itu, sesuaikan dengan ukuran monitor anda, pada tab Fixups</p> <br/> <h3>Debug Box</h3> <textarea id='kle-debug-box'></textarea> <br/> <a class='kle-cpanel-button orange' id='kle-generate-debug' href='#'>Generate Debug Info</a> </div> <div class='kle-cpanel-confirm-box'> <a class='kle-cpanel-button red' id='kle-cancel' href='#'>Cancel</a> <a class='kle-cpanel-button orange' id='kle-apply' href='#'>Apply</a> <a class='kle-cpanel-button green' id='kle-confirm' href='#'>Confirm</a> </div> </div> </div> </div>";
            document.body.insertBefore(wrap, document.body.firstChild);

            // Hide, and re-display in 2s to prevent ugly renderings before css successfully loaded
            $("#kle-wrap").css('display', 'none');
            window.setTimeout(function(){
                $("kle-wrap").css('display', 'block');
            }, gvar.klehtmldelay)

            log("KLE - HTML Code Installed!");
        }
        kleloadcpanel();
        cpanel_events();
        //alert(JSON.stringify(gvar));
        $('#kle-wrap').show();
    }

    function jQ_wait() {
        log("KLE - Waiting jQuery....");
        if(unsafeWindow && typeof unsafeWindow.jQuery == "undefined" && gvar.ix < gvar.mx) {
            log("KLE - Still waiting... " + 200*gvar.ix + "ms passed...");
            window.setTimeout(function() {
                jQ_wait()
            }, 200);
            gvar.ix++
        }else {
            if("undefined" == typeof unsafeWindow.jQuery) {
                return
            }
            delete gvar.ix;
            $ = unsafeWindow.$ = unsafeWindow.jQuery = unsafeWindow.jQuery.noConflict(true);
            var uiscript = GM_addGlobalScript(location.protocol + "//ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js");
            uiscript.addEventListener('load', function() {
                start_main()
            }, false);
        }
    }

    function init() {
        if(!gID("kle-style")) {
            GM_addGlobalStyle("http://cdn.s4nji.com/kle/kle.css", "kle-style", false);
            log("CPanel CSS Code Installed!");
        }
        if(!gID("jqueryui")) {
            GM_addGlobalStyle("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css", "jqueryui", false);
            log("jQuery UI Installed!");
        }
        gvar.ix = 0;
        gvar.mx = 20;
        jQ_wait()
    }
    
    function loadcssvalues() {
        gvar.cssklefouterwidth ="\
            #wrapper, #content-wrapper, #header-wrapper, #forum-home-table { \
            width: " + gvar.klefsliderentrycontent + "px !important; } \
            #content-body, #subforum-content, #post-content, #poll, .result, .opt { \
            width: 98% !important; \
            margin: 0 auto !important; }";

        gvar.cssklefinnerwidth = "\
            .post-entry .entry-content, pre { \
            width: " + gvar.klefslidercontent + "px !important; }";

        gvar.cssklefremoveads = "\
            *[class^='ad'], *[id^='ad'], iframe, .author.vcard > i, .banner-top-ads, .skin, .skin ~ a { \
            display: none !important; } \
            *[class^='add'], *[id^='add'] { \
            display: block !important; }";

        gvar.cssklefshorttitle = "\
            .post-title { \
            -moz-transition: all 300ms ease 0ms !important; \
            width: 45% !important; \
            height: 18px !important; \
            overflow: hidden !important; \
            position: absolute !important; } \
            .post-title:hover { \
            width: 900px !important; \
            height: 18px !important; \
            padding: 3px !important; \
            margin-top: -3px !important; \
            margin-left: -3px !important; \
            border-radius: 4px !important; \
            background: rgba(255,255,255,.75) !important; \
            box-shadow: 0 0 20px 3px rgba(0,0,0,.3) !important; \
            z-index: 9999 !important; \
            position: absolute !important; } \
            .sub-meta { \
            margin-top: 23px !important; \
            position: relative !important; } \
            #subforum-table .last-post > .author.vcard { \
            position: relative !important; \
            top: 18px; } \
            #subforum-table .last-post > .author.vcard:before { \
            content: 'by: ' !important; } \
            #subforum-table .last-post > .post-title { \
            width: 380px !important; } \
            #subforum-table .last-post > .post-title:hover { \
            width: 600px !important; }";

        gvar.cssklefslimthreadview = "\
            table#forum-home-table tbody td { \
            padding: 10px 2px !important; } \
            table#forum-home-table tbody tr { \
            -moz-transition: all 500ms ease 0ms !important; \
            border-bottom: 1px solid #E9E9E9 !important; \
            height: 41px !important; } \
            table#forum-home-table tbody tr:hover { \
            background: -moz-linear-gradient(center top , #EEEEEE 0%, #E2E2E2 100%) repeat scroll 0 0 transparent !important; } \
            .entry-content ol, .entry-content ul { \
            margin-top: 0 !important; \
            margin-bottom: 0 !important; }";

        gvar.cssklefalignfix = "\
            *[align='center'] { \
            text-align: center !important; } \
            *[align='left'] { \
            text-align: left !important; } \
            *[align='right'] { \
            text-align: right !important; }";

        gvar.cssklefmarginfix = "\
            .star-rate + span { \
            font-size: 80% !important; } \
            .star-rate { \
            margin: 0 auto !important; } \
            .jump { \
            margin: 2px 4px 2px 0 !important; }";

        gvar.cssklefsearchpagefix = "\
            #main-search-result { \
            position: absolute !important; \
            left: 12%; \
            margin-left: 20% !important; \
            width: 50% !important; \
            margin-top: 20px !important; \
            } \
            #sidebar-search-result { \
            width: 20% !important; \
            position: absolute !important; \
            left: 12%; } \
            #left-column, #main-column, #right-column { \
            position: relative !important; \
            left: 12.5% !important; } \
            .search input { \
            width: 80% !important; }";

        gvar.cssklefzoomimage = " \
            .entry-content img { \
            -moz-transition: all 500ms ease 0ms !important; } \
            .entry-content img:hover { \
            position: relative !important; \
            height: auto !important; \
            width: auto !important; \
            max-width: 99999999px !important; \
            max-height: 999999999px !important; \
            z-index: 9999999999 !important; \
            box-shadow: 0 0 20px rgba(0,0,0,0.4); \
            border-radius: 4px !important; \
            overflow-x: scroll !important; }";

        gvar.csskletbackground = "\
            body { \
            background: url('" + gvar.kletbackground + "') center top fixed !important; }";

        gvar.csskletfontfamily = "\
            * { \
            font-family: " + gvar.kletfontfamily + " !important; }";

        gvar.csskletcolor = "\
            #wrapper * { \
            color: " + gvar.kletcolor + " !important; }";

        gvar.cssklethotbartop ="\
            #nav-wrapper { \
            position: absolute !important; \
            top: 103px !important; \
            height: 30px; \
            z-index: 999999 !important; } \
            #hot-nav-wrap { \
            -moz-transition: all 500ms ease 0ms !important; \
            position: fixed !important; \
            bottom: 0px !important; \
            width: 100%; \
            height: 4px !important; \
            opacity: 0.3; \
            z-index: 9999999999 !important; } \
            #hot-nav-wrap:hover { \
            height: 39px !important; \
            opacity: 0.9; } \
            .close-tab > .close { \
            display: none !important; } \
            .m-panel { \
            position: absolute !important; \
            top: 33px !important; \
            z-index: 999999999 !important; \
            background: rgba(255,255,255,0.6) !important; \
            height: 145px !important; \
            border: 2px solid rgba(0,0,0,.4) !important; \
            border-radius: 4px !important; } \
            #site-header { \
            height: 136px !important; }";

        gvar.csskletbeautifybox = "\
            .spoiler > #bbcode_spoiler_content, .post-quote > div:nth-child(2), pre { \
            border-radius: 3px !important; \
            border: 1px solid rgba(0,0,0,.1) !important; } \
            .spoiler > #bbcode_spoiler_content > #bbcode_inside_spoiler { \
            background: transparent !important; }";

        gvar.csskletavatarrounding = "\
            .photo { \
            border-radius: 2px !important; }";

        log("CSS Codes Loaded!");
        loadcorekle();
    }

    function loadcorekle() {
        var fl, f = ["cssklefouterwidth", "cssklefinnerwidth", "cssklefremoveads", "cssklefshorttitle", "cssklefslimthreadview", "cssklefalignfix", "cssklefmarginfix", "cssklefsearchpagefix", "cssklefzoomimage"];
        var tl, t = ["csskletbackground", "csskletfontfamily", "csskletcolor", "cssklethotbartop", "csskletbeautifybox", "csskletavatarrounding"];
        var fz = ["klefsliderentrycontent", "klefslidercontent", "klefremoveads", "klefshorttitle", "klefslimthreadview", "klefalignfix", "klefmarginfix", "klefsearchpagefix", "klefzoomimage"];
        var tz = ["kletbackground", "kletfontfamily", "kletcolor", "klethotbartop", "kletbeautifybox", "kletavatarrounding"];
        fl = f.length;
        tl = t.length;
        var temp = '';

        // Method 1 : Use Eval
        if(gvar.klefenabled == true) {
            for(var i = 0; i < fl;i++) {
                if(gvar[fz[i]] != '') {
                    temp = 'GM_addStyle( gvar.' + f[i] + ' );';
                    log("Eval: " + temp);
                    eval(temp);
                }
            }
        }

        if(gvar.kletenabled == true) {
            for(var i = 0; i < tl;i++) {
                if(gvar[tz[i]] != '') {
                    temp = 'GM_addStyle( gvar.' + t[i] + ' );';
                    log("Eval: " + temp);
                    eval(temp);
                }
            }
        }

            //      Method 2 : Use direct gvar arrays
            //      if(gvar.kletenabled == true) {
            //          for(var i = 0; i < tl;i++) {
            //              if(gvar[tz[i]] != '') {
            //                  GM_addStyle(gvar[t[i]]);
            //              }
            //          }
            //      }
    }

    init()
})();