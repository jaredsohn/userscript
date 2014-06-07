// ==UserScript==
// @name        Correct Flag
// @author      Pavel Shut
// @description На пэўных сайтах замяняе значкі з чырвона-зялёным сцягам на бел-чырвона-белы нябесны вольны смелы.
//
// @include     *wikipedia.org*
// @include     *yandex.*
// @include     *opera.com*
// @include     *sovrep.gov.by*
// @include     *un.org*
// @include     *godaddy.com*
// @include     *rutracker.org*
// @include     *kvitki.by*
// @include     *cybergames.by*
// @include     *audience.by*
// @include     *advocates.by*
// @include     *barsu.by*
// @include     *prazdnik.by*
// @include     *prazdnikby.ru*
// @include     *kinopoisk.ru*
// @include     *greencard.by*
// @include     *grodnonews.by*
// @include     *techlabs.by*
// @include     *parta.by*
// @include     *fotoclub.by*
// @include     *mypet.by*
// @include     *autoline.*
// @include     *autoline-eu.*
// @include     *library.gsu.by*
// @include     *brestintourist.*
// @include     *navitel.*
// @include     *world-geographics.com*
// @include     *sportlemon.tv*
// @include     *allsport-live.ru*
// @include     *livescore.in*
// @include     *livetv.ru*
// @include     *fantasy.premierleague.com*
// @include     *adsl.by/services/radio*
// @include     *goals.by*
// @include     *pac.by*
// @include     *postcrossing.com*

// @include     *rfe.by*
// @include     *1c-bitrix.ru*
// @include     *free-torrents.org*
// @include     *nnm-club.ru*
// @include     *active.by*
// @include     *active.am*
// @include     *activecloud.az*
// @include     *activecloud.ge*
// @include     *activecloud.ru*
// @include     *activecloud.com*
// @include     *active.uz*
// @include     *flagcounter.com*
// @include     *internetworldstats.com*
// @include     *go.hrw.com*

// @include     *freeads.by*
// @include     *samsungapps.com*
// @include     *slando.by*
// @include     *gismeteo.by*
// @include     *gismeteo.ru*
// @include     *gismeteo.ua*
// @include     *gismeteo.md*
// @include     *gismeteo.lt*
// @include     *gismeteo.com*
// @include     *vk.com*
// @include     *vkontakte.ru*
// @include     *busuu.com*
// @include     *sports.ru*
// @include     *pefl.ru*
// @include     *sportpanorama.by*
// @include     *exist.by*
// @include      *dinamo-minsk.by*
// @include      *championat.com*
// @include      *myscore.ru*
// @include      *joma.by*
// @include      *battlefield.com*
// @include      *belpost.by*
// @include      *tamby.info*
// @include      *pbliga.com*
// @include      *ibb.by*
// @include      *ibbhotel.by*
// @include      *soccerstand.com*
// @include      *soccer.ru*
// @include      *transfermarkt.de*
// @include      *erepublik.com*
// @include      *catholic.by*

// @include      *google.com*
// @include      *budist.ru*




// @include     */*
// ==/UserScript==

(function(){

    function browser(check) {
        var webkit = '';
        var presto = '';
        var gecko = '';

    }

    function boxShadow (param) {

        var darkness = 0.15;
        var shadow = '';

        if (typeof param === 'number') {
            darkness = param;
        }
        if (typeof param === 'string') {
            shadow = param
        }

        shadow = shadow || 'inset 0 0 0 1px rgba(0,0,0,'+ darkness +')';

        return '\
            -webkit-box-shadow: '+ shadow + ';\
               -moz-box-shadow: '+ shadow + ';\
                    box-shadow: '+ shadow + ';\
        ';
    }

    var sciahSphereSrc = 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%2212.65%2025.65%2050%2050%22%3E%0D%0A%3Cfilter%20id%3D%22AI_GaussianBlur_2%22%3E%0D%0A%09%3CfeGaussianBlur%20%20stdDeviation%3D%222%22%3E%3C%2FfeGaussianBlur%3E%0D%0A%3C%2Ffilter%3E%0D%0A%3Cfilter%20id%3D%22AI_GaussianBlur_1%22%3E%0D%0A%09%3CfeGaussianBlur%20%20stdDeviation%3D%221%22%3E%3C%2FfeGaussianBlur%3E%0D%0A%3C%2Ffilter%3E%0D%0A%3Cdefs%3E%0D%0A%09%3Ccircle%20id%3D%22e2_%22%20cx%3D%2237.65%22%20cy%3D%2250.65%22%20r%3D%2225%22%2F%3E%0D%0A%3C%2Fdefs%3E%0D%0A%3CclipPath%20id%3D%22e3_%22%3E%0D%0A%09%3Cuse%20xlink%3Ahref%3D%22%23e2_%22%20%20overflow%3D%22visible%22%2F%3E%0D%0A%3C%2FclipPath%3E%0D%0A%3Crect%20x%3D%220.275%22%20y%3D%2225.15%22%20clip-path%3D%22url(%23e3_)%22%20fill%3D%22%23FFF%22%20width%3D%2272.25%22%20height%3D%2251.125%22%2F%3E%0D%0A%3Crect%20x%3D%220.275%22%20y%3D%2240.4%22%20clip-path%3D%22url(%23e3_)%22%20fill%3D%22%23E21313%22%20width%3D%2272.25%22%20height%3D%2220.625%22%2F%3E%0D%0A%3CradialGradient%20id%3D%22e6_%22%20cx%3D%2237.6499%22%20cy%3D%2250.6499%22%20r%3D%2225%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0D%0A%09%3Cstop%20%20offset%3D%220.897%22%20style%3D%22stop-color%3A%23FFF%3Bstop-opacity%3A0%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9124%22%20style%3D%22stop-color%3A%23FCFCFC%3Bstop-opacity%3A0.0238%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9243%22%20style%3D%22stop-color%3A%23F2F2F2%3Bstop-opacity%3A0.0421%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9351%22%20style%3D%22stop-color%3A%23E2E2E2%3Bstop-opacity%3A0.0587%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9452%22%20style%3D%22stop-color%3A%23CACACA%3Bstop-opacity%3A0.0743%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9548%22%20style%3D%22stop-color%3A%23ACACAC%3Bstop-opacity%3A0.0891%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.964%22%20style%3D%22stop-color%3A%23878787%3Bstop-opacity%3A0.1033%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.973%22%20style%3D%22stop-color%3A%235B5B5B%3Bstop-opacity%3A0.1171%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9815%22%20style%3D%22stop-color%3A%232A2A2A%3Bstop-opacity%3A0.1302%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%220.9879%22%20style%3D%22stop-color%3A%23000%3Bstop-opacity%3A0.14%22%2F%3E%0D%0A%3C%2FradialGradient%3E%0D%0A%3Ccircle%20clip-path%3D%22url(%23e3_)%22%20fill%3D%22url(%23e6_)%22%20cx%3D%2237.65%22%20cy%3D%2250.65%22%20r%3D%2225%22%2F%3E%0D%0A%3Cg%20opacity%3D%220.44%22%20clip-path%3D%22url(%23e3_)%22%20filter%3D%22url(%23AI_GaussianBlur_2)%22%3E%0D%0A%09%3Cellipse%20fill%3D%22none%22%20stroke%3D%22%237FBED9%22%20stroke-width%3D%222%22%20stroke-miterlimit%3D%2210%22%20cx%3D%2237.65%22%20cy%3D%2248.9%22%20rx%3D%2225%22%20ry%3D%2223.25%22%2F%3E%0D%0A%3C%2Fg%3E%0D%0A%3Cg%20opacity%3D%220.2%22%20clip-path%3D%22url(%23e3_)%22%20filter%3D%22url(%23AI_GaussianBlur_2)%22%3E%0D%0A%09%3Ccircle%20fill%3D%22none%22%20stroke%3D%22%23000%22%20stroke-width%3D%222%22%20stroke-miterlimit%3D%2210%22%20cx%3D%2237.65%22%20cy%3D%2237.65%22%20r%3D%2230.375%22%2F%3E%0D%0A%3C%2Fg%3E%0D%0A%3Cg%20clip-path%3D%22url(%23e3_)%22%20filter%3D%22url(%23AI_GaussianBlur_1)%22%3E%0D%0A%09%3CradialGradient%20id%3D%22e10_%22%20cx%3D%2237.6499%22%20cy%3D%2263.5249%22%20r%3D%2237.8758%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0D%0A%09%09%3Cstop%20%20offset%3D%220.1916%22%20style%3D%22stop-color%3A%23FFF%3Bstop-opacity%3A0%22%2F%3E%0D%0A%09%09%3Cstop%20%20offset%3D%221%22%20style%3D%22stop-color%3A%23FFF%22%2F%3E%0D%0A%09%3C%2FradialGradient%3E%0D%0A%09%3Cellipse%20fill%3D%22url(%23e10_)%22%20cx%3D%2237.9%22%20cy%3D%2239.025%22%20rx%3D%2217.125%22%20ry%3D%2211.75%22%2F%3E%0D%0A%3C%2Fg%3E%0D%0A%3CradialGradient%20id%3D%22e12_%22%20cx%3D%2269.9272%22%20cy%3D%2238.165%22%20r%3D%2214.1967%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0D%0A%09%3Cstop%20%20offset%3D%220.1916%22%20style%3D%22stop-color%3A%23FFF%3Bstop-opacity%3A0%22%2F%3E%0D%0A%09%3Cstop%20%20offset%3D%221%22%20style%3D%22stop-color%3A%23FFF%3Bstop-opacity%3A0.45%22%2F%3E%0D%0A%3C%2FradialGradient%3E%0D%0A%3Cpath%20clip-path%3D%22url(%23e3_)%22%20fill%3D%22url(%23e12_)%22%20d%3D%22M60.525%2C49.431c-0.037%2C3.375%2C1.445%2C2.885%2C1.625%2C0.219%0D%0A%09c0.5-7.406-4.292-12.333-4.292-12.333S60.619%2C40.9%2C60.525%2C49.431z%22%2F%3E%0D%0A%3C%2Fsvg%3E';

    var gradientCSS = '\
		background:\
     -o-linear-gradient(transparent, transparent 32%, rgba(204,18,18,.95) 32%,  rgba(204,18,18,.95) 68%, transparent 68%, transparent),\
     -o-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%, rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%) !important;\
		background:-moz-linear-gradient(transparent, transparent 32%, rgba(204,18,18,.95) 32%,  rgba(204,18,18,.95) 67%, transparent 67%, transparent),\
   -moz-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%, rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%) !important;\
		background:\
-webkit-linear-gradient(transparent, transparent 32%, rgba(204,18,18,.95) 32%,  rgba(204,18,18,.95) 68%, transparent 68%, transparent),\
-webkit-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%, rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%) !important;\
		background:\
        linear-gradient(transparent, transparent 32%, rgba(204,18,18,.95) 32%,  rgba(204,18,18,.95) 68%, transparent 68%, transparent),\
        linear-gradient(-45deg, rgba(198,198,198,0.43) 0%, rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%) !important;\
		background-color:#fff !important;';

    var reflectionDownCSS = '\
			background: \
		-moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.67) 33%, rgba(204,18,18,0.66) 34%, rgba(204,18,18,0.32) 68%, rgba(255,255,255,0.31) 69%, rgba(255,255,255,0) 100%); \
			background:\
		-webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0.67) 33%,rgba(204,18,18,0.66) 34%,rgba(204,18,18,0.32) 68%,rgba(255,255,255,0.31) 69%,rgba(255,255,255,0) 100%);\
			background:\
 		-o-linear-gradient(top, rgba(255,255,255,.5) 0%,rgba(255,255,255,0.25) 30%,rgba(204,18,18,0.25) 30%,rgba(204,18,18,0.15) 62%,rgba(255,255,255,0.23) 62%,rgba(255,255,255,0) 100%); \
			background:\
 			linear-gradient(top, rgba(255,255,255,1) 0%,rgba(255,255,255,0.67) 33%,rgba(204,18,18,0.66) 34%,rgba(204,18,18,0.32) 68%,rgba(255,255,255,0.31) 69%,rgba(255,255,255,0) 100%); ';

    var transparentGIF = "data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==";

    var flagCSS = '\
		content:"";\
		display:inline-block;\
		border-radius:1px;\
		font-family: Zyvie-Bielarus !important;/*hack for firefox*/\
        '+ boxShadow() +'\
		'+ gradientCSS;

    var dzieShto = [
        {
            addr: 'budist.ru',
            css:'.flag[style *="background-image"][style *="img/flags/by.png"]:before{ '+ flagCSS +' height: 12px; width: 100%; position: relative; top: 50%; margin-top: -6px}' +
                '.flag[style *="background-image"][style *="img/flags/by.png"]{ background: none !important}' +
                'img[src *="/img/flags/by.png"], .fffx{ '+ flagCSS + boxShadow(0.2) +' height: 12px; display: inline-block !important; padding: 0 !important}',
            isAsyncSite: true
        },
        {
            addr: 'google.com',
            css:'.talk-flag[style *="background-position: 0px -1100px"]{ '+ flagCSS +' background-position: 0 0; height: 12px; }' +
                '.aYU-aYX-aD2[style *="background-position"][style *="-1100px"] { '+ flagCSS +' height: 12px; }'
        },
        {
            //todo: this doesn't work
            addr: 'xperteleven.com',
            css:'img[src *="flags/BY.gif"], .fffx{ '+ sciahSphereSrc +' opacity: .5; height: 14px; width: 15px; }'
        },
        {
            addr: 'catholic.by',
            css:'img[src *="/flag-by2.gif"], .fffx{ '+ flagCSS +'; '+ boxShadow(0.28) + '; opacity: .5; height: 15px;}'
        },
        {
            addr: 'erepublik.com',
            css:'img[src *="/flags"][src *="/Belarus"], .fffx{ '+
                flagCSS  +
                'border-radius: 2px;' +
                '}' +
                'img[src *="/flags"][src *="/Belarus"][src *="/S/"],' +
                'img[data-origsrc *="/flags"][data-origsrc *="/Belarus"][data-origsrc *="/S/"] {' +
                'width: 14px; height: 12px;' +
                'border-radius: 1px;' +
                boxShadow("inset 0 0 0 1px rgba(0,0,0,.20), 0 1px 2px rgba(0,0,0,.1)") +
                '}' +
                'img[src *="/flags"][src *="/Belarus"][src *="/M/"],' +
                'img[data-origsrc *="/flags"][data-origsrc *="/Belarus"][data-origsrc *="/M/"] {' +
                'width: 22px; height: 15px;' +
                'border-radius: 1px' +
                boxShadow("inset 0 0 0 1px rgba(0,0,0,.20), 0 1px 3px rgba(0,0,0,.15)") +
                '}' +
                'img[src *="/flags"][src *="/Belarus"][src *="/L/"],' +
                'img[data-origsrc *="/flags"][data-origsrc *="/Belarus"][data-origsrc *="/L/"] {' +
                'width: 30px; height: 21px;' +
                boxShadow("inset 0 0 0 1px rgba(0,0,0,.20), 0 1px 4px rgba(0,0,0,.15)") +
                '}' +
                'img[src *="/flags"][src *="/Belarus"][src *="/XL/"],' +
                'img[data-origsrc *="/flags"][data-origsrc *="/Belarus"][data-origsrc *="/XL/"] {' +
                'width: 46px; height: 33px; '+
                boxShadow("inset 0 0 0 1px rgba(0,0,0,.20), 0 1px 6px rgba(0,0,0,.25)") +
                '}' +
                '#filters a.selector img[src *="/Belarus"], .fffx {display: block}' +
                '.flag[src *="Belarus"], .flag[data-origsrc *="Belarus"] {padding:0; margin-right: 5px}' +
                '#battle_listing img[src *="Belarus"],#battle_listing img [data-origsrc *="Belarus"]{ height: 18px } '
        },
        {
            addr: 'kinozal.tv',
            css:' img[src *="/pic/f/10.gif"], .fffx{'+ flagCSS + ' width: 14px; height: 12px}'
        },
        {
            addr: 'transinfo.by',
            css:' img[src *="country/BY.gif"], .fffx{'+ flagCSS + ' border: 0 !important}'
        },
        {
            addr: 'meteo-europ.com',
            css:'.country.country-by { '+ flagCSS + ' height: 20px}'
        },
        {
            addr: 'greyorder.su',
            css:'img[src *= "flags/by.png"], .fffx { '+ flagCSS + ' width: 16px; height: 12px}'
        },
        {
            addr: 'timeanddate.com',
            css:'img[src *= "gfx/fl/"][src *= "/by.png"], .fffx { '+ flagCSS + '}'
        },
        {
            addr: 'myjob.by',
            css:'img[src *= "flags/15x10/by.gif"], .fffx { '+ flagCSS + ' width: 15px; height: 12px;}'
        },
        {
            addr: 'football.by',
            css:'img[src *= "stat/getimage.php?flagid=1"], .fffx { '+ flagCSS + ' width: 19px; height: 12px;}'
        },
        {
            addr: 'telegraf.by',
            css:'.flag-BYR { '+ flagCSS + 'height: 12px !important}'
        },
        {
            addr: 'sportbox.ru',
            css:'img[src *="land/by.png"], .fffx { '+ flagCSS + '}'
        },
        {
            addr: 'soccer.ru',
            css:'img[src *="/images/flag/15.gif"], .fffx{ '+ flagCSS +'; '+ boxShadow(0.28) +' height: 15px; vertical-align: middle; position: static !important}'
        },
        {
            addr: 'transfermarkt.de',
            css:'.sprite_land_18{ '+ flagCSS +'; '+ boxShadow(0.28) +' height: 12px}'
        },
        {
            addr: 'soccerstand.com',
            css:'.flag_small_all.f57{ '+ flagCSS +'; '+ boxShadow(0.18) +'}'
        },
        {
            addr: 'ibbhotel.by',
            css:'img[src *="/images/flag_by.gif"], .fffx{ '+ flagCSS + boxShadow(0.28) +'}'
        },
        {
            addr: 'ibb.by',
            css:'img[src $="icons/russian.gif"],.fffx{ '+ flagCSS +'; width: 16px; height: 12px; vertical-align: top; '+ boxShadow(0.18) +'}'
        },
        {
            addr: 'pbliga.com',
            css:'img[src *="flags/flag_17.png"],.fffx{ '+ flagCSS +'; width: 22px; height: 18px; vertical-align: middle; '+ boxShadow("inset 0 0 0 1px rgba(0,0,0,0.25), inset -5px 0 10px rgba(255,255,255,.4)") +'}' +
                'img[src *="flags/blr.gif"][title],.fffx[title]{ '+ flagCSS +'width: 16px; height: 12px;'+ boxShadow("inset 0 0 0 1px rgba(0,0,0,0.25), inset -5px 0 10px rgba(255,255,255,.4)") + '}'
        },
        {
            addr: 'tamby.info',
            css:'img[src $="images/strany/belarus.png"],.fffx{ '+ flagCSS +'; '+ boxShadow(0.15) +'}'
        },
        {
            addr: 'belpost.by',
            css:'img[src $="/i/blr.jpg"],.fffx{ '+ flagCSS +';width:24px;height: 15px !important;margin-top:-1px; '+ boxShadow(0.2) +'}'
        },
        {
            addr: 'battlefield.com',
            css:'img[src $="/flags/by.gif"],.fffx{ '+ flagCSS +';width:16px;height: 12px !important; '+ boxShadow(0.3) +'}'
        },
        {
            addr: 'joma.by',
            css:'img[src $="/images/by.png"],.fffx{ '+ flagCSS +';width:16px;height: 12px !important;vertical-align: middle;}'
        },
        {
            addr: 'myscore.ru',
            css:'.flag.fl_31,.fffx{ ' +
                flagCSS +
                'content: normal; ' +
                'background-position: 0 50%, 0 50% !important; ' +
                'background-size: 16px 12px,  16px 12px !important; ' +
                'background-repeat: no-repeat, no-repeat !important;' +
                '}' +
                '.header .flag.fl_31 { background: none !important; box-shadow: none !important;vertical-align: middle}'+
                '.header .flag.fl_31:before { ' +
                flagCSS +
                'width: 16px;' +
                'height: 12px;' +
                'margin: 0 8px -1px -24px;'+
                '}'+
                '#fs .flag, #fsmenu .flag, #main .flag.fl_31 { height: 12px !important }' +
                'img[src *="/res/image/data/rN9xhjRc-I7KbpC8c.png"], .fffx {'+ flagCSS +' height: 25px; margin-top: 12px}'
        },
        {
            addr: 'championat.com',
            css:'img[src $="cflags/by.gif"],.fffx{ '+ flagCSS +'; display: inline-block !important; width: 16px; height: 12px;}'
        },
        {
            addr: 'dinamo-minsk.by',
            css:'img[src $="_8_0x0.jpg"][title="Беларусь"], ' +
                'img[src $="/51/~568_8_0x0.jpg"],.fffx {'+ flagCSS +'; display: inline-block !important; width: 33px; height: 18px; '+ boxShadow(0.2) +'}'
        },
        {
            addr: 'exist.by',
            css:'img[src $="/flags/by.gif"],.fffx{ '+ flagCSS +'; display: inline-block !important; width: 16px; height: 11px; '+ boxShadow(0.99) +'}'
        },
        {
            addr: 'sportpanorama.by',
            css:'img[src $="/flags/1.jpg"],.fffx{ '+ flagCSS +'; display: inline-block !important; width: 16px; height: 11px; '+ boxShadow(0.3) +'}'
        },
        {
            addr: 'pefl.ru',
            css:'img[src $="/flags/18.gif"],.fffx{ '+ flagCSS +'; display: inline-block !important } ' +
                'img[src $="/flags/18.gif"][width="30"]{ height: 20px; vertical-align: middle}'
        },
        {
            addr: 'sports.ru',
            css:'.flag-s.flag-1302,.fffx{ '+ flagCSS +' }' +
                '.flag-circle.f-belarus {'+ flagCSS +' border-radius: 50%; '+ boxShadow("inset 0 0 9px rgba(0,0,0,.2)")+'}' +
                'img[src *="73017810/1317751561.637227_34.jpg"]{' + boxShadow('inset 0 0 6px rgba(0,0,0,.4)') +'content:"";background:50% no-repeat url("'+sciahSphereSrc+'"); background-size: 48px 48px; border-radius: 50%;}'
        },
        {
            addr: 'busuu.com',
            css:'img.flag[src $="/flags/by.gif"],.fffx{ '+ flagCSS +'; display: inline-block !important }'
        },
        {
            addr: 'vk.com|vkontakte.ru',
            css:'.lang_box_row {position: relative;} .lang_box_row[style *="images/lang_flags/2.gif"]{ background-image: none !important}' +
                '.lang_box_row[style *="images/lang_flags/2.gif"]:before {'+ flagCSS +
                'width: 34px;' +
                'height: 26px;' +
                'position: absolute; left: 10px; top: 50%; margin-top: -13px;'+
                ' }'
        },
        {
            addr: 'gismeteo.(by|ru|ua|lt|com)',
            css:  'body #menu li.sprite .flag span.by {'+ flagCSS + boxShadow(0.25) +' height: 12px; background-position: 0 0, 0 0 !important; position: relative; top: 1px;}'
        },
        {
            addr: 'slando.by',
            css:  'img[src $="flags/by.png"],.fffx {'+ flagCSS +'; height: 12px; width: 16px;}'
        },
        {
            addr: 'samsungapps.com',
            css:  'img[src $="flag/BY.png"]:not(.fakeclassforspecificity),.fffx:not(.fakeclassforspecificity) {'+
                + flagCSS +'; \
                        height: 12px; \
                        width:18px;\
                        border:0\
                        '+ boxShadow(0.5) +'\
                    }\
                  a.country img {\
                        margin-bottom:-2px;\
                        '+ boxShadow(0) +
                '}'
        },
        {
            //todo check it in FF
            addr: 'freeads.by',
            css: 'img[src $="flag_header_freeads.by.gif"] {content:"";background:50% no-repeat url("'+sciahSphereSrc+'"); background-size: 35px 35px;}\
                  img[src $="flags/flag_icon_freeads.by.gif"],.fffx {'+
                flagCSS +'\
                      '+ boxShadow(0.65) +
                '}'
        },
        {
            addr: "go.hrw.com",
            css: 'img[src $="flags/belarus.gif"],.fffx {'+ flagCSS +'; \
             -webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
                -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
                      width: 200px; height: 100px;}'
        },
        {
            addr: "internetworldstats.com",
            css: 'img[src $="images/belarusia.jpg"],.fffx {'+ flagCSS +'; \
             -webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
                -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.9);\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.9)}'
        },
        {
            addr: "flagcounter.com",
            css: 'img[src $="flags/by.png"],.fffx {'+ flagCSS +';padding:1px 0 0; \
             -webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);\
                -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.4)}'
        },
        {
            addr: "(active.by|active.am|activecloud.az|activecloud.ge|activecloud.com|activecloud.ru|active.uz)",
            css: '.by > img, .ru-by > img,' +
                '.content .selector .selBar .cont ul.flags li.by a i,' +
                ' li.lang a.by i,' +
                'i.by,.fffx  {'+ flagCSS +'}'
        },
        {
            addr: "(free-torrents.org|nnm-club.ru)",
            css: 'img[src $="images/flags/belarus.gif"],.fffx{'+ flagCSS +'; width:32px; height:20px;\
             -webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.6);\
                -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.6);\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.6)}'
        },
        {
            addr: "1c-bitrix.ru",
            css: 'img[src $="icons/Flag_Belarus.png"],.fffx{'+ flagCSS +';\
             -webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.2), 0 0 3px rgba(0,0,0,.2);\
                -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.2), 0 0 3px rgba(0,0,0,.2);\
                     box-shadow:inset 0 0 0 1px rgba(0,0,0,.2), 0 0 3px rgba(0,0,0,.2)}\
            img[src $="icons/belarus.jpg"],.fffx{'+ flagCSS +'; border:0; padding:0px; margin-left:.4em}'
        },
        {
            addr: "rfe.by",
            css: 'img[src $="lang_by.gif"],.fffx{'+ flagCSS+'; width: 15px; height: 11px; vertical-align: top}'
        },
        { addr: '.*',
            css: ' html body .skype_pnh_container span[style *="background-position: -909px"], \
				 html body .skype_pnh_container span[style ="background-position:-909px 1px !important;"] {background:none !important;position:relative !important;} \
				 html body .skype_pnh_container span[style *="background-position: -909px"]::after, \
				 html body .skype_pnh_container span[style ="background-position:-909px 1px !important;"]::after \
				 {'+flagCSS+'height:12px; width:16px; position:absolute; left:0; top:0;}'
        },
        { addr: '(my\.)?opera.com',
            css: '[style *= "flags/BY.png"]::before, img[src $= "flags/BY.png"], .f-BY::before{ '+ flagCSS +';height:12px}\
		  [style *= "flags/BY.png"]{background-image:none !important;position:relative;}\
		  [style *= "flags/BY.png"]::before{' +
                'width:16px;height:12px;position:absolute;top:6px;right:3px;content:"";' +
                '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.3);' +
                '-moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.3);' +
                'box-shadow:inset 0 0 0 1px rgba(0,0,0,.3);}\
        a[href="/community/members/location/Belarus"]{margin-left:.5em;}'
        },
        { addr: 'sovrep.gov.by',
            css: 'img[src $="top_01.jpg"],.fffx{'+flagCSS+';width:190px;height:108px;margin:0;border-left:1px solid #c24621}'
        },
        { addr: 'wikipedia.org',
            files: [
                { src:'*Coat_of_arms_of_Belarus.svg(.png)?',
                    newSrc: 'http://upload.wikimedia.org/wikipedia/commons/9/9c/Coat_of_Arms_of_Belarus_(1991).svg'
                }
            ],
            css:'img[src $="data:image/svg+xml"].thumbborder{border:0 !important;}\
				img[src *="Flag_of_Belarus.svg"],.fffx{border:0 !important;'+ flagCSS+'}  \
				img[src *="Coat_of_Arms_of_Belarus_(1991).svg"][width ="80"]{ width:70px }  \
		  '
        },
        { addr: 'un.org',
            css: 'img[src $="belarus.gif"],.fffx{'+ flagCSS +'width:22px;height:13px;border:0 !important;}'
        },
        { addr: 'yandex\..*',
            css:  '.b-country-flag_size-16_by {'+ flagCSS +'} \
				 img[src $="b-foot__lang__by.png"],\
				 .b-langs__flag_lang_by,\
				 .b-mail-icon_lang-be { \
				    position:relative; \
				    top:1px;\
				    '+ flagCSS +'\
				    width:16px;\
				    height:12px !important;\
				    padding: 0 ! important; \
				} \
				.b-mail-dropdown__item_with-icon .b-mail-icon.b-mail-icon_lang-be {\
                    background:'+  gradientCSS +'\
                    margin: -6px 0 0 7px ;\
                }\
				.b-keyboard__lang-by .b-keyboard__lang-ic { \
						' + gradientCSS +'\
						width:14px;\
						border:0;\
						position:relative;\
						height:11px;\
						margin-right:3px\
				}\
				.b-keyboard__lang-by .b-keyboard__lang-ic{'+ flagCSS +'width:16px;height:12px;} '
        },
        { addr: 'godaddy.com',
            css: 'div[style *="/country_flags_sml/by.gif"],.ffi_by{'+ flagCSS+'}\
				.ffi_by {height:13px;margin-top: 1px;}'
        },
        { addr: 'rutracker.org',
            css: 'img[src $="flags/17.gif"],img[src $="flags/by.gif"],.fffx{'+
                flagCSS+';height:22px;width:32px;' +
                '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
                '-moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
                'box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);}' +
                'img[src $="flags/by.gif"] {width:24px;height:15px;}',
            files: [
                {
                    src: 'logo_new_by.gif',
                    newSrc: 'data:image/png;base64,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'
                }
            ]
        },
        { addr: 'eventot.com',
            css:'.flag.flag-by {'+flagCSS+'}'
        },
        { addr: 'skyscanner\.*',
            css:'img[src $="flag/small/by.png"], .fffx {'+flagCSS+';width: 16px; height:12px;}' +
                '#culture-info #current-user-country img[title=Belarus]{margin-top: 2px }'
        },
        { addr: 'tb.by',
            css:'img[src $="img/bel.png"], .fffx {'+flagCSS+';width: 15px; height:10px} '
        },
        { addr: 'ecolines.by',
            css:'img[src $="flag-by.gif"], .fffx {'+flagCSS+';} '
        },
        { addr: 'kvitki.by',
            css:'img[src $="lang_by.gif"], ' +
                'img[src $="lang_by_ov.gif"],.fffx {'+flagCSS+';width:16px;height:12px;} ' +
                'img[src $="lang_by_ov.gif"]{opacity: .6}'
        },
        { addr: 'cybergames.by',
            css:'img[src $="flags/by.gif"],.fffx {'+flagCSS+'width:18px;height:12px;}' +
                ' img[src $="flags/by_large.png"],.fffx {'+flagCSS+'width:180px;height:90px;' +
                '-moz-box-shadow:inset 0 0 1px 1px rgba(0,0,0,.3);-webkit-box-shadow:inset 0 0 1px 1px rgba(0,0,0,.3);box-shadow:inset 0 0 1px 1px rgba(0,0,0,.3);}'
        },
        { addr: 'audience.by',
            css:'img[src $="flags/by.gif"],.fffx {'+flagCSS+'width:23px;height:15px;}'
        },
        { addr: 'paei.by',
            css:'img[src $="by.gif"],.fffx {'+flagCSS+'width:39px;height:26px;}'
        },
        { addr: 'advocates.by',
            css:'img[src $="langs/by.gif"],.fffx {'+flagCSS+'width:22px;height:16px;}'
        },

        { addr: 'barsu.by',
            css:'img[src $="Images/by.gif"],.fffx {'+flagCSS+'width:28px;height:21px;margin-bottom:5px}'
        },
        { addr: 'prazdnik.?by(\.ru)?',
            files : [{
                src: 'flagblr.gif',
                newSrc : 'data:image/gif;base64,R0lGODlhFAAZAOZvAPDw8Pz8/McREdUSEuvr6/b29vLy8t8TE+rq6uHh4d3d3ezR0eDg4Ojo6PX19eAzM8ezkdgxMfj4+NYSEqCQdd/f38MREdASEsYREc4REc8REbOhguITE/T09OXl5ePj49nZ2c0REenp6eLi4tsSEt4TE9oSEskREeAYGORPT/f3993ExPXExPjf3+fn59vb28ouLubMzNEvL/////v7++fNzfTc3OTk5OMvL8ctLdMwMMktLdzCwtoxMeZLS8suLtra2uzs7NQwMNzDw+TKytfX1+7T09nBwf39/dwXF+Gzs94uLt/JyfDAwPTDw9sXF9NFRfjGxuFJSc0rK/vi4uMYGPn5+dArK84WFuYwMPv29uJKSuPNzfPb2/fe3uIvL+fi4t8uLt7e3t8YGMoVFelMTN2wsPfy8u+/v+VLS/La2s9ERP/6+jw5MVpVSv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAG8ALAAAAAAUABkAAAf/gG4GAG+Fhm8KHiJBh4VuElYAIiMvIEBiHgQADgUdh480BQANCRUMHy6aKgFIBQQ3RW42XqKkph9cNQtdATMBBggKbilpaAtEKzxDZlBCEVssVL/Bbg9jSxEyPzswU1gXA0k4ZSxGMUfVJSYDGQIYAich4CQHVTg9Ojnp6+3v8fMHOByYoMHCPnbu4MkbQE8gQYMpvjxB+I7MFWdhUDgsKMuJlGzbYKxRoquJjywoHj7SouZYsiFMwGg60yKKD3z6JIQaVepUKgCr2LQwh86Agw48TSUY4QGBg17ThLV5Q2BSJSAgDAUpgCSqm6mNwr7p4OBVLLBi0775qlYt27ZiH9/CbSR3rqG6dteizauXr6E2bSgIprCh8AYIiCGEDQQAOw=='
            },{
                src: 'flagby_off.gif',
                newSrc : 'data:image/gif;base64,R0lGODlhCwAZAPeFAOLi4vj4+PLy8vT09PHx8f39/cgREdzc3N3d3f///+vr69kPD/b29vr6+uITE9kSEswlJdQODuDj4+Ti4twODuHh4dIREefn5+2bm9wTE+bm5t0YGO7x8fvk5N4cHOXl5eLj4+rq6vCtreTk5Pf399IUFNvBmp2McmxqZPn8/N0WFv7+/vn09NwQEPX19fb6+vX09NuQkMwmJuYwMLyoiPr5+dVmZtQSEt/d3ezs7N3AwOtYWO/u7ueBgfDy8uLV1dvb28YPD9pYWOF7e8YODtIPD+3r6+IUFM0yMtWPj+Xm5uDi4uTj48gQEM40NPb5+e7v7/f4+NwREdINDf/+/t0XF88uLssoKMsQEOdiYuMZGc9hYcgSEvXe3uAsLOdxcfXa2ssREfH09OeGhvX29va6uswVFeTl5cYTE8YREezr69QREe3w8KCPdOHIyLGfgd7KyswjI+Ompt++vvv7++Lh4dFLS/75+cUODvj6+ssSEuI4ON/i4uTm5vDz89ISEuKFhdQPD9kTEzw5MVpVSv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIUALAAAAAALABkAAAjnAAkNKESwYEFCJAQYNEioRg4EBAQ0YAhGDAAgAC4EOJjFB4glSqAMSECQkIchcPhMMJJnYyFCKm4gSRJDToACDF5WicAFjZUiGKgQqEBowxoDRPRM8dLhxQhCeyIYSBPmD4UdZPoQEhGoSRAsFqRoGfODEAtAV/CYKdHCgSA7hBrw0LHFhpAMDhbIIOTCTx0cbth8OfIAAiEUCgBI+MChy4wFhgcNOHAAgJoUZR7EITSo0AoNCkJEudPDCeeCBQoRSABjzmmDdAo8YfLaYAABZ2obZIBA90LfDDsvLDho0Ik2b2iYMBgQADs='
            }],
            css:'img[src $="/img/by.gif"] {content:"";height:50px;width:50px;display:inline-block;background:url("'+ sciahSphereSrc +'") no-repeat} '},
        { addr:'prazdnik.by',
            css:'.logo:after {content:"";position:absolute;z-index:10;width:43px;height:43px;left:269px;top:47px;' +
                'background: url("data:image/png;base64,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") no-repeat}'
        },
        { addr: 'kinopoisk.ru',
            css:'.flag69 * {'+flagCSS+'; height:12px}\
		       .flag.flag69 {height: 12px} \
		       .tenItems .flags {height: auto !important}\
		       .movieFlags .flag69 * {height: 10px}\
			   .country_flag[style *="/by.png"] {background-image: url("'+sciahSphereSrc+'") !important; opacity:.5;}'
        },
        { addr: 'greencard.by',
            css:'img[src $="flags/by.gif"],.fffx {'+flagCSS+'width:16px; height:12px}'
        },
        { addr: 'grodnonews.by',
            css:'img[src $="images/by.gif"],.fffx {'+flagCSS+'width:17px; height:13px}'
        },
        { addr: 'techlabs.by',
            css:'img[src $="flag-by.gif"],.fffx {'+flagCSS+
                'width:18px;height:12px;' +
                '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
                '-moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
                'box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);}'
        },
        { addr: 'parta.by',
            css:'img[src $="icons/flag_by.gif"],.fffx {'+flagCSS+'width:18px;height:12px;' +
                '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);' +
                '-moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);' +
                'box-shadow:inset 0 0 0 1px rgba(0,0,0,.4);}'
        },
        { addr: 'fotoclub.by',
            css:'img[src $="icons/flag-by.png"],.fffx {'+flagCSS+'width:40px;height:25px}'
        },
        { addr: 'mypet.by',
            css:'img[src $="16x12/by.png"],.fffx {'+flagCSS+'width:17px;height:12px;}' +
                '.small_container img.flag{padding:0;margin:3px 7px 0 0;}',
            files: [
                { src: "50x50/by.png",
                    newSrc: sciahSphereSrc,
                    width:"50",
                    height: "50"
                }
            ]
        },
        { addr: 'autoline(\-eu)?.*',
            css: '[style *="flags/langs/by.gif"] {position:relative;background:none !important} \
				[style *="flags/langs/by.gif"]::before {'+flagCSS+'width:18px;height:13px;position:absolute;left:0;top:3px;}\
				img[src $="flag/flag_by.png"],.fffx {'+flagCSS+'width:24px;height:19px}'
        },
        { addr: 'library.gsu.by',
            css:'img[src $="img/by.png"],.fffx {'+flagCSS+'width:24px;height:14px;margin-bottom:1px}'
        },
        { addr: '((pl|en)\.)?brestintourist.*',
            css: 'img[src $="lang/by.png"],.fffx{'+flagCSS+'width:25px;height:18px;margin:0 0 3px;' +
                '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
                '   -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);' +
                '        box-shadow:inset 0 0 0 1px rgba(0,0,0,.7);}\
          .item_by a{position:relative}\
          .item_by a:after{content:"";display:block;position:absolute;left:-34px;top:-3px;' +
                'width:25px;height:25px;background:url("'+sciahSphereSrc+'") no-repeat}'
        },
        { addr: 'navitel.*',
            css:'img[src $="global/by.png"],.fffx {'+flagCSS+'width:18px;height:13px;' +
                '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.15), 1px 1px 2px  rgba(0,0,0,.4);' +
                '   -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.15), 1px 1px 2px  rgba(0,0,0,.4);' +
                '        box-shadow:inset 0 0 0 1px rgba(0,0,0,.15), 1px 1px 2px  rgba(0,0,0,.4);}'
        },
        { addr: 'world-geographics.com',
            css:'img[src $="flags/BY.png"],.fffx{'+flagCSS+'height:18px;border-radius:1.5px;' +
                '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.04),inset 0 -1px 0  rgba(0,0,0,.15);' +
                '   -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.04),inset 0 -1px 0  rgba(0,0,0,.15);' +
                '        box-shadow:inset 0 0 0 1px rgba(0,0,0,.04),inset 0 -1px 0  rgba(0,0,0,.15);}'+
                'img[src $="flags/BY.png"]:not(".flagsmall") {width:48px;height:42px;}'
        },

        { addr: 'sportlemon.tv',
            css:'img[src $="flags/by.gif"],.fffx{'+flagCSS+'width:16px;height:12px;}'
        },
        { addr: 'allsport-live.ru',
            css: 'td[width="30"][height="20"] img[src $="flags/flag_belarus.png"],.fffx {'+flagCSS+'width:16px !important;height:12px !important;}' +
                '#fsbody .fl_31, .fl_31 { background:none !important;}' +
                '.fl_31:before{'+flagCSS+'width:16px;height:12px;margin:0 8px -1px -24px;}'
        },
        { addr: 'livescore.in',
            css: '#fsbody .fl_31, .fl_31 { background:none !important;} ' +
                '.fl_31:before{'+flagCSS+'width:16px;height:12px;margin:0 8px -1px -24px;}'
        },
        { addr: 'livetv.ru',
            css:'img[src $="national/by.gif"],img[src $="img/flags/24.png"],.fffx{'+flagCSS+'width:16px;height:12px;}\
				img[src $="fullsize/1372.gif"], img[src $="fullsize/1373.gif"], img[src $="fullsize/1374.gif"], img[src $="fullsize/1375.gif"], \
				img[src $="fullsize/1376.gif"], img[src $="fullsize/1377.gif"], img[src $="fullsize/1378.gif"], img[src $="fullsize/1379.gif"], \
				img[src $="fullsize/1380.gif"], img[src $="fullsize/1381.gif"], img[src $="fullsize/1382.gif"], img[src $="fullsize/1383.gif"], \
				img[src $="fullsize/1384.gif"], img[src $="fullsize/1385.gif"], img[src $="fullsize/1386.gif"], img[src $="fullsize/1387.gif"], \
				img[src $="fullsize/1388.gif"], img[src $="fullsize/1389.gif"], img[src $="fullsize/1390.gif"], img[src $="fullsize/1391.gif"], \
 				img[src $="fullsize/1392.gif"],\
				img[src $="teams/1372.gif"], img[src $="teams/1373.gif"], img[src $="teams/1374.gif"], img[src $="teams/1375.gif"], \
				img[src $="teams/1376.gif"], img[src $="teams/1377.gif"], img[src $="teams/1378.gif"], img[src $="teams/1379.gif"], \
				img[src $="teams/1380.gif"], img[src $="teams/1381.gif"], img[src $="teams/1382.gif"], img[src $="teams/1383.gif"], \
				img[src $="teams/1384.gif"], img[src $="teams/1385.gif"], img[src $="teams/1386.gif"], img[src $="teams/1387.gif"], \
				img[src $="teams/1388.gif"], img[src $="teams/1389.gif"], img[src $="teams/1390.gif"], img[src $="teams/1391.gif"], \
 				img[src $="teams/18/1392.gif"],\
				img[src $="teams/18/1372.gif"], img[src $="teams/18/1373.gif"], img[src $="teams/18/1374.gif"], img[src $="teams/18/1375.gif"], \
				img[src $="teams/18/1376.gif"], img[src $="teams/18/1377.gif"], img[src $="teams/18/1378.gif"], img[src $="teams/18/1379.gif"], \
				img[src $="teams/18/1380.gif"], img[src $="teams/18/1381.gif"], img[src $="teams/18/1382.gif"], img[src $="teams/18/1383.gif"], \
				img[src $="teams/18/1384.gif"], img[src $="teams/18/1385.gif"], img[src $="teams/18/1386.gif"], img[src $="teams/18/1387.gif"], \
				img[src $="teams/18/1388.gif"], img[src $="teams/18/1389.gif"], img[src $="teams/18/1390.gif"], img[src $="teams/18/1391.gif"], \
 				img[src $="teams/18/1392.gif"],.fffx\
  					{\
	content:"";display:inline-block;width:49px;height:49px;\
	background:\
 -o-repeating-linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, rgba(255,255,255,.25) 1px,rgba(255,255,255,.25) 2px), \
 -o-linear-gradient(-45deg,transparent, transparent 30%, rgba(204,18,18,.95) 30%,  rgba(204,18,18,.95) 70%, transparent 70%, transparent), \
 -o-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%,rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%); \
	background:\
 -moz-repeating-linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, rgba(255,255,255,.25) 1px,rgba(255,255,255,.25) 2px), \
 -moz-linear-gradient(-45deg,transparent, transparent 30%, rgba(204,18,18,.95) 30%,  rgba(204,18,18,.95) 70%, transparent 70%, transparent), \
 -moz-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%,rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%); \
	background:\
 -webkit-repeating-linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, rgba(255,255,255,.25) 1px,rgba(255,255,255,.25) 2px), \
 -webkit-linear-gradient(-45deg,transparent, transparent 30%, rgba(204,18,18,.95) 30%,  rgba(204,18,18,.95) 70%, transparent 70%, transparent), \
 -webkit-linear-gradient(-45deg, rgba(198,198,198,0.43) 0%,rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%); \
	background:\
 repeating-linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, rgba(255,255,255,.25) 1px,rgba(255,255,255,.25) 2px), \
 linear-gradient(-45deg,transparent, transparent 30%, rgba(204,18,18,.95) 30%,  rgba(204,18,18,.95) 70%, transparent 70%, transparent), \
 linear-gradient(-45deg, rgba(198,198,198,0.43) 0%,rgba(204,204,204,0.01) 21%,rgba(213,213,213,0.37) 55%,rgba(221,221,221,0) 83%,rgba(226,226,226,0.42) 100%); \
box-shadow:inset 0 0 0 1px #333,inset 0 0 0 2px rgba(255,255,255,.6); \
					}\
				img[src $="teams/1372.gif"], img[src $="teams/1373.gif"], img[src $="teams/1374.gif"], img[src $="teams/1375.gif"], \
				img[src $="teams/1376.gif"], img[src $="teams/1377.gif"], img[src $="teams/1378.gif"], img[src $="teams/1379.gif"], \
				img[src $="teams/1380.gif"], img[src $="teams/1381.gif"], img[src $="teams/1382.gif"], img[src $="teams/1383.gif"], \
				img[src $="teams/1384.gif"], img[src $="teams/1385.gif"], img[src $="teams/1386.gif"], img[src $="teams/1387.gif"], \
				img[src $="teams/1388.gif"], img[src $="teams/1389.gif"], img[src $="teams/1390.gif"], img[src $="teams/1391.gif"], \
 				img[src $="teams/1392.gif"]\
					{width:36px;height:36px}\
				img[src $="teams/18/1372.gif"], img[src $="teams/18/1373.gif"], img[src $="teams/18/1374.gif"], img[src $="teams/18/1375.gif"], \
				img[src $="teams/18/1376.gif"], img[src $="teams/18/1377.gif"], img[src $="teams/18/1378.gif"], img[src $="teams/18/1379.gif"], \
				img[src $="teams/18/1380.gif"], img[src $="teams/18/1381.gif"], img[src $="teams/18/1382.gif"], img[src $="teams/18/1383.gif"], \
				img[src $="teams/18/1384.gif"], img[src $="teams/18/1385.gif"], img[src $="teams/18/1386.gif"], img[src $="teams/18/1387.gif"], \
				img[src $="teams/18/1388.gif"], img[src $="teams/18/1389.gif"], img[src $="teams/18/1390.gif"], img[src $="teams/18/1391.gif"], \
 				img[src $="teams/18/1392.gif"]\
					{width:18px;height:18px;}\
 				img[width="65"]{width:65px !important;height:65px !important;}'
        },
        { addr: 'fantasy.premierleague.com',
            css: 'img[src $="static/img/flags/BY.gif"],.fffx{'+flagCSS+'width:64px;height32px;}'
        },
        { addr: 'adsl.by',
            css: 'img[src $="flags/Belarus.png"],.fffx{'
                + flagCSS +
                'width:14px;' +
                'height:12px;'+
                '-webkit-box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.1);' +
                '   -moz-box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.1);' +
                '        box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.1);}'
        },
        { addr: 'goals.by',
            css: 'img[src *="img/flags/by.png"],.fffx {'
                +flagCSS+'width:16px;height:12px}' +
                '.ic-flag-BY::before, \
                 .ic-flag-BY img, img.fffx {\
                      width: 16px; \
                      height: 12px; \
                      clip: auto !important; \
                      left: 0 !important; \
                      top: auto !important; \
                      right: 0 !important; \
              -webkit-transform:translateY(1px);\
                 -moz-transform:translateY(1px);\
                      transform:translateY(1px);\
                      '+ flagCSS +'\
              }\
              .ic-flag-BY::before {\
                    content: "" !important\
              }\
              .ic-flag-r.ic-flag::before { left: auto !important; right: 0 !important}'
        },
        { addr: 'pac.by',
            css: '.by_l_by,.by_l {width:16px} .by_l_by img,.by_l img{display:none;}' +
                '.by_l_by a::before, .by_l a::before{'+flagCSS+'width:16px;height:12px;display:block}' +
                '.by_l_by a::after,.by_l a::after{width:16px;height:9px;display:block;content:"";'+ reflectionDownCSS +'}'
        },
        { addr: 'postcrossing.com',
            css: '.flag.flag-BY {'+ flagCSS +'width:16px;height:12px;}'
        }
    ];

    var addCSS = function(CSS) {
        var styleEl = window.document.createElement('style');
        var styles  = window.document.createTextNode(CSS);
        styleEl.setAttribute('class', 'Correct-Flag');
        styleEl.appendChild(styles);
        window.document.head && window.document.head.appendChild(styleEl);
    };

    var FixForFireFox = function(site){

        /*
         * get style.Correct-Flag,
         * get all selectors,
         * querySelectorAll the selectors,
         * filter the result for images only,
         * and only the ones to which our flag styles got applied
         * add a fffx class to them and set src to a transparent gif
         *
         * */

        var styles = document.querySelectorAll('style.Correct-Flag');

        if (styles.length) {
            Array.prototype.forEach.call(styles, function(stylesheet){
                Array.prototype.forEach.call(stylesheet.sheet.cssRules, function(rule, i, rulelist){

                    var elements = document.querySelectorAll(rule.selectorText);
                    if (elements.length) {
                        Array.prototype.forEach.call(elements, function(elt){
                            if (elt.nodeName.toUpperCase() == "IMG") {
                                if(window.getComputedStyle(elt, null).getPropertyValue("font-family") === 'Zyvie-Bielarus') {
                                    if(!elt.classList.contains('fffx')) {
                                        elt.classList.add('fffx');
                                        elt.dataset.origsrc = elt.src;
                                        elt.src = transparentGIF;
                                    }
                                }
                            }
                        })
                    }
                })
            })
        }

        if (site.isAsyncSite) {
            // todo periodically check for new images and replace them
        }
    };

    var browserNeedsFix = function() {
        return  window.navigator &&
            window.navigator.userAgent &&
            window.navigator.userAgent.indexOf('Firefox') != -1
    }

    var testCSSContentNotPseudoElSupport = function () {

        var imgdata = 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==';
        var img = new Image();
        img.src = imgdata;
        img.setAttribute('style', 'content:""');
        return img.width === 0;
    }

    window.correctflagext = {
        CSSAdded: false,
        dzieShto: dzieShto,
        addCSS: addCSS,
        testCSSContentNotPseudoElSupport: testCSSContentNotPseudoElSupport,
        FixForFireFox: FixForFireFox,
        browserNeedsFix : browserNeedsFix
    };

    if (document.head) {
        for (var i = 0, il = dzieShto.length, site; i < il, site = dzieShto[i]; i++ ) {
            if (new RegExp(site.addr + '$','i').test(document.location.host)){
                if (site.css){
                    if (window.correctflagext.browserNeedsFix()){
                        FixForFireFox(site)
                    }
                    addCSS(site.css);
                    window.correctflagext.CSSAdded = true;
                }
            }
        }
    }

})();

window.addEventListener('DOMContentLoaded', function() {
    var dzieShto = window.correctflagext && window.correctflagext.dzieShto;
    for (var i = 0, il = dzieShto.length, site; i < il, site = dzieShto[i]; i++ ) {
        if (new RegExp(site.addr + '$','i').test(document.location.host)){
            if (site.css && !window.correctflagext.CSSAdded){
                window.correctflagext.addCSS(site.css)
            }

            if (window.correctflagext.browserNeedsFix()){
                window.correctflagext.FixForFireFox(site)
            }
            if (site.files){
                for (var k=0,newPic; k < site.files.length, newPic = site.files[k]; k++) {
                    var orig = window.document.images;
                    origL = orig.length;
                    for (var j = 0, origPic; j<origL, origPic = orig[j]; j++){
                        if (new RegExp( '\/'+newPic.src + '$').test(origPic.src)){
                            origPic.src = newPic.newSrc;
                            if (newPic.width)  {origPic.width = newPic.width}
                            if (newPic.height) {origPic.height = newPic.height}
                            if (newPic.css)    {origPic.setAttribute("style", newPic.css)}
                        }
                    }
                }
            }
        }
    }
    //delete window.correctflagext;
}, false);