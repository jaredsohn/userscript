// ==UserScript==
// @author Boom_Box
// @contributor Orrie
// @contributor vkv
// @name US_WoTStats
// @version 0.8.4.61
// @description More info for World of Tanks profile page. Updated for 0.8.5
// @grant GM_xmlhttpRequest
// @match http://worldoftanks.com/*/accounts/*
// @match http://worldoftanks.ru/*/accounts/*
// @match http://worldoftanks.eu/*/accounts/*
// @match http://worldoftanks.kr/*/accounts/*
// @include http://worldoftanks.com/*/accounts/*
// @include http://worldoftanks.ru/*/accounts/*
// @include http://worldoftanks.eu/*/accounts/*
// @include http://worldoftanks.kr/*/accounts/*
// @include http://www.noobmeter.com/*
// @include https://duckandcover.ru/wotka*
// @updateURL http://userscripts.org/scripts/source/154375.meta.js
// @downloadURL http://userscripts.org/scripts/source/154375.user.js
// ==/UserScript==

var acct_bats = 0,
    tclass = document.getElementsByClassName("t-table-dotted");

if (tclass.length > 0) {
    acct_bats = toFl(tclass[0].rows[1].cells[1].firstChild.data);
}

if (acct_bats > 0) // completely bypass new accounts and player search page
{
    var dc_class = document.getElementsByClassName("b-data-create")[0],
        ts_attr = dc_class.childNodes[1].getAttribute("data-timestamp"),
        daypassed = (new Date() - new Date(ts_attr * 1000)) / 1000/60/60/24;
        dc_class.innerHTML +="- "+daypassed.toFixed()+" Days Ago";

    var timeDiv = document.getElementsByClassName("b-data-date")[0];

    var scripthost = "http://userscripts.org/scripts/show/154375";
    timeDiv.innerHTML +="<p class='script'>"+(" <a target='_blank' href="+scripthost+">Script</a> version ") +"0.8.4.61</p>"

    var wg_host = document.location.host,
        server = wg_host.match(/\.([^\.]+)$/)[1],
        nick = document.getElementsByTagName("h1")[0].innerHTML,
        userid = document.location.href.match(/\/(\d+)/)[1];

    // noobmeter, duckandcover, wot-news, and mywotstats
    var nm_srv, dc_srv, wn_srv, mws_srv;
    if (server == "com") {
        nm_srv = "na";
        dc_srv = "NAm";
        wn_srv = "us";
        mws_srv = "NA";
    }
    else {
        nm_srv = wn_srv = server;
        dc_srv = server.toUpperCase();
        if (server == "eu") mws_srv = server.toUpperCase();
        else mws_srv = null;
    }

    var sid = "boombox_js_921382",
        nm_host = "http://www.noobmeter.com",
        nmapi_url = nm_host+"/simpleplayerprapi/"+nm_srv+"/"+nick+"/"+userid+"/"+sid,
        nm_target = nm_host+"/player/"+nm_srv+"/"+nick+"/"+userid;

    if (server != "ru" && server != "kr") {
        var wotlabs = "http://wotlabs.net",
            signature = "<a target='_blank' href="+wotlabs+"/"+nm_srv+"/player/"+nick+">WoTLabs</a> Signature: "
                       +"[<a target='_blank' href='"+wotlabs+"/sig/"+nm_srv+"/"+nick+"/signature.png'>Light</a>] - "
                       +"[<a target='_blank' href='"+wotlabs+"/sig_dark/"+nm_srv+"/"+nick+"/signature.png'>Dark</a>]";

        timeDiv.innerHTML +="<p class='script'>"+signature+"</p>";
    }

    var dc_url = "https://duckandcover.ru/wotka?search=acc&nickname="+nick+"&server="+dc_srv,
        dc_en_url = dc_url+"&lang=en";

    // determine browser types, beware inconsistencies, no method is reliable.
    console.log("browser appCodeName: ", navigator.appCodeName, ", browser appName: ", navigator.appName);
    console.log("userAgent: ", navigator.userAgent);

    var gecko = /Mozilla/.test(navigator.appCodeName),  // true for ff (and chrome lol)
        opera = /Opera/.test(navigator.appName),        // only true for opera
        chrome = /Chrome/.test(navigator.userAgent);

    if (opera || chrome) gecko = false;

    // api server
    var api_ver = "api/1.9",
        wa_token = "?source_token=WG-WoT_Assistant-1.4.1";

    if (opera) var api_domain = "http://"+wg_host;      // use same domain for opera, gets cookie reset
    else       var api_domain = "http://api."+wg_host;  // new domain for FF and Chrome, logins preserved

    var api_url = api_domain+"/uc/accounts/"+userid+"/"+api_ver+"/"+wa_token;

    console.log(api_url);

    // who is logged in, only valid for NA or EU.
    var auth = (server == "com" || server == "eu"),
        user = null;

    if (auth && (authDiv = document.getElementsByClassName("b-auth-link")[0]) != undefined) {
        var mre = />([-\w]+)<\/a/;
        if (gecko && typeof(XPCNativeWrapper) === 'function') {
            // FF needs to unwrap authdiv
            user = XPCNativeWrapper.unwrap(authDiv).innerHTML.match(mre)[1];
        }
        else user = authDiv.innerHTML.match(mre)[1];
    }
    var devMode = (user=="Boom_Box");

    // stylin'
    // font-stretch not supported in chrome
    if (gecko) var font = "font-size: 12.5pt;font-weight: 600;font-stretch: condensed;";
    else var font = "font-size: 11pt;font-weight: bold;";

    timeDiv.innerHTML +="<style>"
        //modified tags
        +".l-content {width: 955px}"
        +".b-clan-list {position: absolute; left: 380px; top: 15px; width: 440px; margin: 0 !important;}"
        +".b-clan-list h4 {margin: 0;}"
        +".b-data-date {width: 360px}"
        +".b-data-create {margin: -15px 140px 0 0;}"
        +".l-sidebar {width: 144px !important; position: absolute; right: 5px; top: -20px;}"
        +".b-context-menu {width: 144px;}"
        +".t-result {margin: 75px 0 15px;}"
        +".t-statistic th {text-align: center;}"
        //new tags
        +".ratings-container {margin: 0 0 25px;}"
        +".medal-container {margin: 0 0 50px;}"
        +"div.stat-header {text-align: center;}"
        +"span.stat-header {color: #FFA759; font-family: Arial;" +font+ "line-height: 62px; border-bottom: 12px solid transparent;}"
        +"span.pl-hist {color: #9999aa;}"
        +"p.script {margin: 0; line-height: 140%;}"
        +"div.scriptlink {margin: 10px 0 0; float:right;}"
        +"div.clan-history {margin-left: 10px; color: #DDDDDD;}"
        //new tags - tables
        +".t-perfstats {margin-left: 10px; width: 938px;}"
        +".t-perfstats tbody tr {border-bottom: 1px dotted #2a2a2a;}"
        +".t-perfstats th {color: #BABFBA; font-size: 120%; line-height: 36px;}"
        +".t-perfstats td {line-height: 26px; text-align: center;}"
        +".t-cls-res {text-align: center;}"
        +".t-row-header {background: #050709; border-top: 1px solid #1D1D1F; border-bottom: 1px solid #1D1D1F; font-size: 17px; font-weight: 300;}"
        +".t-row-header td {color: #8F9393; line-height: 100%; padding: 4px 12px; text-align: center;}"
        +".t-row-header td:first-child, .t-statistic th:first-child {text-align: left;}"
        +".t-table-dotted td.td-number-nowidth {color: #BABFBA; font-weight: bold; padding-right: 0; text-align: right;}"
        //new tags - medals
        +".medal {background-repeat: no-repeat; background-size: 50px auto; height: 50px; width: 50px; display: inline-block; position: relative;}"
        +"font.medalCounter {border: 1px solid #40312E; position: absolute; font-size: 10px; text-align: center; right: 1px; min-width: 26px; top: 35px; background-color: rgb(66, 15, 12); padding: 1px 0px;}"
        +"#warrior {margin-left: 125px}"
        +"#maxSniperSeries {margin-left: 175px;}"
        +"#medalBoelter {margin-left: 225px;}"
        +"#medalDumitru {margin-left: 250px;}"
        +"#medalAbrams {margin-left: 275px;}"
        +"#tankExpert, #mechanicEngineer {margin-left: 300px;}"
        // medal image position fix
        +"#medalBrothersInArms {background-position: 0 2px;}"
        +"#medalCrucialContribution {background-position: 0 5px ;}"
        +"#bombardier {background-position: 0 5px;}"
        +"#maxInvincibleSeries {background-position: 0 2px;}"
        +"#beasthunter {background-position: 0 1px;}"
        +"#pattonValley {background-position: 0 6px;}"
        +"</style>";

    var scripts = [sortTd, hideTypes, toType, toFl, col];

    for (i=0; i<scripts.length; ++i) {
        var script = document.createElement("script");
        script.className = "wotstats";
        script.type = "text/javascript";
        script.textContent = scripts[i].toString();
        document.head.appendChild(script);
    }

    var sc = (function() {
        var stat_color = {
            sup_uni: "5A3175", // super unicum
            unicum:  "83579D", // unicum
            great:   "4A92b7", // great
            v_good:  "4C762E", // very good
            good:    "6D9521", // good
            avg:     "D7B600", // average
            b_avg:   "CD3333", // below average
            bad:     "B20000", // bad
            e_bad:   "A10000", // ermahgerd bad
            no_col:  "6B6B6B"  // default gray
        };
        return { col: stat_color };
    })();

    var veh_names = (function() {
        var tstrings = [];
        tstrings.push(['all','Light','Medium','Heavy','SP-Arty','TD']); // formally vtype

        // yes this is where new tanks are added, just paste their wg strings in the appropriate array

        tstrings.push(  // light tanks, 0.8.5
            [ 'Light', // group identifier
              // Soviet
             'ms-1', 'bt-2', 't-26', 't-60', 'tetrarch_ll', 'bt-7', 't-46', 't-70', 'bt-sv',
             'm3_stuart_ll', 't-127', 'a-20', 't80', 't-50', 'valentine_ll', 't_50_2',
              // German
             'ltraktor', 'pz35t', 'pzii', 'pzi', 'h39_captured', 'pz38t', 'pziii_a', 'pzi_ausf_c', 'pz_ii_ausfg',
             'pzii_j', 't-15', 'pzii_luchs', 'pz38_na', 'vk1602', 'vk2801', 'auf_panther',
              // USA
             't1_cunningham', 'm2_lt', 't2_lt', 't1_e6', 'm3_stuart', 'm22_locust',
             'mtls-1g14', 'm5_stuart', 'm24_chaffee', 't21', 't71',
              // French
             'renaultft', 'hotchkiss_h35', 'd1', 'amx38', 'amx40', 'elc_amx', 'amx_12t', 'amx_13_75', 'amx_13_90',
              // UK
             'gb03_cruiser_mk_i', 'gb58_cruiser_mk_iii', 'gb69_cruiser_mk_ii', 'gb59_cruiser_mk_iv',
             'gb04_valentine', 'gb60_covenanter', 'gb20_crusader',
              // Chinese
             'ch06_renault_nc31','ch07_vickers_mke_type_bt26', 'ch08_type97_chi_ha', 'ch09_m5',
             'ch15_59_16', 'ch02_type62', 'ch16_wz_131', 'ch17_wz131_1_wz132',
              // Unreleased
             'm3_a3', 'gb14_m2', 'gb15_stuart_i', 'gb16_stuart_vi', 'amr_p103', 'amx_13fl11']);

        tstrings.push( // Medium Tanks, 0.8.5
            [ 'Medium', // group identifier
              // Soviet
             't-28', 'a-32', 't-34', 'matilda_ii_ll', 't-34-85', 't-43', 'kv-13', 't-44', 't-54', 't62a',
             'object_907',
              // German
             's35_captured', 'pziii', 'vk2001d', 'pziv', 'pziii_iv', 't-25', 'pziv_hydro', 'vk3601h', 'vk3002db_v1',
             'vk3001h', 'vk3001p', 'pzv_pziv', 'pzv_pziv_ausf_alfa', 'pziv_schmalturm', 'pzv', 'vk3002db',
             'panther_m10', 'panther_ii', 'indien_panzer', 'e-50', 'pro_ag_a', 'e50_ausf_m', 'leopard1',
              // USA
             't2_med', 'm2_med', 'm3_grant', 'm4_sherman', 'm7_med', 'ram-ii', 'm4a2e4', 'm4a3e8_sherman', 't20',
             'sherman_jumbo', 'pershing', 't26_e4_superpershing', 't69', 'm46_patton', 't54e1', 'm48a1',  'm60',
              // French
             'd2', 'lorraine40t', 'bat_chatillon25t',
              // UK
             'gb01_medium_mark_i', 'gb05_vickers_medium_mk_ii', 'gb06_vickers_medium_mk_iii', 'gb07_matilda',
             'gb68_matilda_black_prince', 'gb21_cromwell', 'gb22_comet', 'gb23_centurion', 'gb24_centurion_mk3',
             'gb70_fv4202_105', 'gb51_excelsior',
              // Chinese
             'ch21_t34', 'ch20_type58', 'ch04_t34_1', 'ch01_type59', 'ch05_t34_2', 'ch18_wz-120', 'ch19_121',
              // Unreleased
             'a43', 'a44', 'object416', 't6_m', 'm4_improved', 'm4_90v', 'gb36_matilda_1', 'gb02_a7', 'gb17_grant_i',
             'gb34_ram', 'gb33_sentinel_ac_i', 'gb35_sentinel_ac_iv', 'gb18_sherman_ii', 'gb19_sherman_firefly',
             'amc_35', 'somua_s35', 'renault_g1r', 'g1l']);

        tstrings.push( // Heavy Tanks, 0.8.5
            [ 'Heavy', // group identifier
               //Soviet
             'kv1', 'kv-220', 'churchill_ll', 'kv-220_action', 'kv-1s', 'kv2', 't150', 'is', 'kv-3', 'is-3',
             'object252', 'kv4', 'kv-5', 'st_i', 'is8', 'is-4', 'is-7',
              // German
             'b-1bis_captured', 'pzvi', 'pzvi_tiger_p', 'pzvib_tiger_ii', 'vk4502a', 'lowe', 'vk4502p',
             'e-75', 'maus', 'e-100', 'vk7201',
              // USA
             't14', 't1_hvy', 'm6', 't29', 't34_hvy', 't32', 'm6a2e1', 'm103', 't110', 't57_58',
              // French
             'b1', 'bdr_g1b', 'arl_44', 'amx_m4_1945', 'amx_50_100', 'fcm_50t', 'amx_50_120', 'f10_amx_50b',
              // UK
             'gb08_churchill_i', 'gb09_churchill_vii', 'gb63_tog_ii', 'gb10_black_prince', 'gb11_caernarvon',
             'gb12_conqueror', 'gb13_fv215b',
              // Chinese
             'ch10_is2', 'ch03_wz-111', 'ch11_110', 'ch12_111_1_2_3', 'ch22_113',
              // Unreleased
             't1_m1921', 't95_e2', 't54_e2', 'fcm_f1', 'amx_m4_1948', 'amx_65t', 'fcm2c', '_2cbis']);

        tstrings.push( // Tank Destroyers, 0.8.4
            [ 'TD', // group identifier
              // Soviet
             'at-1', 'su-76', 'gaz-74b', 'su-85', 'su_85i', 'su-100', 'su100y', 'su-152', 'su100m1',
             'su122_44', 'isu-152', 'su-101', 'object_704', 'su122_54', 'object268', 'object263',
              // German
             'panzerjager_i', 'g20_marder_ii', 'hetzer', 'stugiii', 'jagdpziv', 'dickermax', 'jagdpanther',
             'ferdinand', 'jagdpantherii', 'jagdtiger_sdkfz_185', 'jagdtiger', 'jagdpz_e100',
              // USA
             't18', 't82', 't40', 'm8a1', 'm10_wolverine', 't49', 'm36_slagger', 'm18_hellcat', 't25_at',
             't25_2', 't28', 't28_prototype', 't30', 't95', 't110e4', 't110e3',
              // French
             'renaultft_ac', 'fcm_36pak40', 'renaultue57', 'somua_sau_40', 's_35ca', 'arl_v39',
             'amx_ac_mle1946', 'amx_ac_mle1948', 'amx50_foch', 'amx_50fosh_155',
              // UK
             'gb39_universal_carrierqf2', 'gb42_valentine_at', 'gb57_alecto', 'gb73_at2', 'gb74_at8',
             'gb40_gun_carrier_churchill', 'gb75_at7', 'gb71_at_15a', 'gb72_at15', 'gb32_tortoise',
             'gb48_fv215b_183',
              // Chinese
                //...
              // Unreleased
             'it45', 'su76l', 'su76bm', 'marder_iii', 'e-10', 'e-25', 'nashorn', 'sturer_emil', 't24',
             'panzerjager35r', '_28_32pz38hf', 'acl135']);

        tstrings.push( // Self-Propelled Guns, 0.8.5
            [ 'SP-Arty', // group identifier
              // Soviet
             'su-18', 'su-26', 'su-5', 'su-8', 's-51', 'su-14', 'object_212', 'object_261',
              // German
             'bison_i', 'sturmpanzer_ii', 'wespe', 'grille', 'hummel', 'g_panther', 'g_tiger', 'g_e',
              // USA
             't57', 'm37', 'm7_priest', 'm41', 'm12', 'm40m43', 't92',
              // French
             'renaultbs', 'lorraine39_l_am', '_105_lefh18b2', 'amx_105am', 'amx_13f3am', 'lorraine155_50',
             'lorraine155_51', 'bat_chatillon155',
              // UK
             'gb78_sexton_i',
              // Chinese
                // ...
              // Unreleased
             'brummbar', 'roket_sturmtiger', 'lorraine37_l_ac']);

        var index = function(imgName) {
            for (j=1; j<tstrings.length; ++j) {
                if (tstrings[j].indexOf(imgName) >= 0) {
                    // remove array order dependency by using
                    //  a group identifer to index vtype
                    return tstrings[0].indexOf(tstrings[j][0]);
                }
            }
            return 0;
        };

        var vclass = function(idx) {
            return tstrings[0][idx];
        };

        var vcls_idx = function(name) {
            return tstrings[0].indexOf(name);
        };

        var vcls_len = function() {
            return tstrings[0].length;
        };

        return { index: index, vclass: vclass, vcls_len: vcls_len, vcls_idx: vcls_idx };
    })();

    var veh_color = (function() {
        // add any new prem tanks to this list (and in the appropriate veh_names arrays)
        var prems = // premium tanks, 0.8.5
            [ // Soviet
             'tetrarch_ll', 'bt-sv', 'm3_stuart_ll', 't-127', 'valentine_ll', 'a-32', 'matilda_ii_ll',
             'churchill_ll', 'kv-220', 'kv-220_action', 'object252', 'kv-5', 'su_85i', 'su100y',
             'su122_44', 'object_907',
              // German
             'h39_captured', 'pzii_j', 't-15', 's35_captured', 't-25', 'pziv_hydro', 'pzv_pziv',
             'pzv_pziv_ausf_alfa', 'pziv_schmalturm', 'panther_m10', 'b-1bis_captured', 'lowe',
             'dickermax', 'jagdtiger_sdkfz_185', 'vk7201',
              // USA
             't2_lt', 't1_e6', 'm22_locust', 'mtls-1g14', 'ram-ii', 'm4a2e4', 't26_e4_superpershing',
             't14', 't34_hvy', 'm6a2e1', 'm60',
              // French
             'fcm_50t', 'fcm_36pak40', '_105_lefh18b2',
              // UK
             'gb68_matilda_black_prince', 'gb63_tog_ii', 'gb71_at_15a', 'gb27_sexton', 'gb51_excelsior',
              // Chinese
             'ch02_type62', 'ch01_type59', 'ch03_wz-111'
            ];

        var set_prem_col = function(imgName) {
            if (prems.indexOf(imgName) >= 0) return "#ffc363";
            return null;
        };

        return { set: set_prem_col };
    })();

    var levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"];

    var nations = [
            { name: "all", battles: 0, wins: 0 },
            { name: "Russia", icon: "js-ussr td-armory-icon", battles: 0, wins: 0 },
            { name: "Germany", icon: "js-germany td-armory-icon", battles: 0, wins: 0 },
            { name: "USA", icon: "js-usa td-armory-icon", battles: 0, wins: 0 },
            { name: "France", icon: "js-france td-armory-icon", battles: 0, wins: 0 },
            { name: "China", icon: "js-china td-armory-icon", battles: 0, wins: 0 },
            { name: "UK", icon: "js-uk td-armory-icon", battles: 0, wins: 0 }
        ];

    // result-container, overall results and battle performance
    var rdiv = document.createElement('div');
    rdiv.className = "result-container";

    var rtab = document.getElementsByClassName("t-result")[0];
    rtab.parentNode.insertBefore(rdiv, rtab.nextSibling);
    rdiv.appendChild(rtab);
    // end result container

    // fame-container, hall of fame
    var gdiv = document.createElement('div');
    gdiv.className = "fame-container";
    rdiv.parentNode.insertBefore(gdiv, rdiv.nextSibling);
    gdiv.innerHTML += "<div class='stat-header'><span class='stat-header'>Hall of Fame</span></div>";

    var tstat = document.getElementsByClassName("t-statistic"),
        globaltable = tstat[0];
    gdiv.appendChild(globaltable);
    // end fame-container container

    // table-container, div container for performance tables
    var cdiv = document.getElementsByClassName("l-content")[0].lastElementChild;
    cdiv.className = "table-container";
    gdiv.parentNode.insertBefore(cdiv, gdiv.nextSibling);

    // tank-container, 1st table for vehicle performance, ordered by battles with tank
    var tdiv = document.createElement('div');
    tdiv.className = "tank-container";
    cdiv.appendChild(tdiv);
    tdiv.innerHTML += "<div class='stat-header'><span class='stat-header'>Vehicle Performance</span></div>";

    var tanktable = tstat[1];
    tdiv.appendChild(tanktable);

    var click_style   = "<div onclick='sortTd(this,0)' style='cursor: pointer'",
        l_click_style = "<div onclick='sortTd(this,0)' style='cursor: pointer;text-align: left'>";

    var th = document.createElement('th');
    th.className = "t-cls-res";
    th.innerHTML = click_style+">Winrate</div>";

    var yd = document.getElementsByTagName('th'),
        trth = yd[yd.length-1].parentNode;

    trth.innerHTML = "<th>"+("Tier")+"</th>"+trth.innerHTML.replace(2,1);
    trth.appendChild(th);

    trth.innerHTML = trth.innerHTML.replace(/<th>/gm,"<th class='t-cls-res'>"+l_click_style); // tier
    trth.innerHTML = trth.innerHTML.replace(/<th colspan="1">/gm,"<th class='t-cls-res'>"+l_click_style); // vehicles
    trth.innerHTML = trth.innerHTML.replace(/<th class="right"/gm, "<th class='t-cls-res'>"+click_style); // battles and victories
    trth.innerHTML = trth.innerHTML.replace(/<\/th>/gm,'</div></th>');

    // hideTypes on header row, will eventually style this steamer
    var nsel = '<select name="nation" id="nationality" onchange="hideTypes(this)" style="height:15px;font-size:11px;background-color:rgb(5,7,9);color:rgb(143,147,147)">';
        nsel +="<option value=0>Nation</option>";

    for (j=1; j<nations.length; ++j) {
        nsel += "<option value="+j+">"+nations[j].name+"</option>";
    }
    nsel +="</select>";
    trth.cells[0].innerHTML += nsel;

    // battles
    trth.cells[2].innerHTML += "<div style='font-size:11px'>> <input onchange='hideTypes(this)' size=1 name='from' id='chfrom' style='height:15px;width:36px;background-color:rgb(5,7,9);color:rgb(143,147,147);'>";

    // veh type
    var sel = document.createElement("select");
        sel.innerHTML += "<option value=0>Type</option>";

    for (j=1; j<veh_names.vcls_len(); ++j) {
        var vnc = veh_names.vclass(j);
        sel.innerHTML += "<option value="+vnc+">"+vnc+"</option>";
    }
    sel.value = 0;

    var th = document.createElement('th');
    th.className = "t-cls-res";
    th.innerHTML = click_style+">Type</div>";
    th.appendChild(sel);
    th.innerHTML = th.innerHTML.replace('<select>','<select name="type" id="tankType" onchange="hideTypes(this)" style="height:15px;font-size:11px;background-color:rgb(5,7,9);color:rgb(143,147,147)" >');

    trth.insertBefore(th, trth.cells[0]);
    // end hideTypes

    var lev = new Object(),
        levtr = [],
        tt = new Object(),
        trTank = [];

    var yd = document.getElementsByTagName('td');

    // looping thru main tank table
    for (i=0; i<yd.length; i++)  // dev has 826 tags o.O
    {
        if(yd[i].className.indexOf("td-armory-icon") >1 )
        {
            var b = toFl(yd[i+2].innerHTML);
            var w = toFl(yd[i+3].innerHTML);
            nations[0].battles += b;
            nations[0].wins += w;

            for (j=1; j<nations.length; ++j) {
                if(yd[i].className.indexOf(nations[j].icon) == 0) {
                    nations[j].battles += b;
                    nations[j].wins += w;
                    nat = j;
                    break;
                }
            }

            levN = yd[i].getElementsByTagName('span')[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/g,"");
            if (lev[levN] == undefined) {
                lev[levN] = new Object();
                lev[levN].b = 0;
                lev[levN].w = 0;
                lev[levN].t = [];

                for (j=0; j < veh_names.vcls_len(); ++j) {
                    lev[levN].t[j] = new Object();
                    lev[levN].t[j].b = 0;
                    lev[levN].t[j].w = 0;
                }
            }
            lev[levN].b += b;
            lev[levN].w += w;

            imgName = yd[i].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];

            var ttN = veh_names.index(imgName); // ttN is a class index, 1-5

            if((yd[i+1].getElementsByTagName("a")[0]) != undefined) {
                var prem_col = veh_color.set(imgName);
                if (prem_col != null) {
                    yd[i+1].innerHTML = yd[i+1].innerHTML.replace(
                            'a class="b-gray-link" href', "a style='color:"+prem_col+"' href");
                }
            }

            tankType = "t"+ttN;
            if (tt[tankType]==undefined)
            {
                tt[tankType] = new Object();
                tt[tankType].b = 0;
                tt[tankType].w = 0;

                tt[tankType].n = [];

                for (j=1; j<nations.length; j++)
                {
                    tt[tankType].n[j] = new Object();
                    tt[tankType].n[j].b = 0;
                    tt[tankType].n[j].w = 0;
                }
            }
            tt[tankType].b += b;
            tt[tankType].w += w;

            tt[tankType].n[nat].b += b;
            tt[tankType].n[nat].w += w;

            lev[levN].t[ttN].b += b;
            lev[levN].t[ttN].w += w;

            var a =(w/b*100);
            trTankTable = yd[i].parentNode;

            trTankTable.innerHTML = trTankTable.innerHTML.replace(/<td class="right value"/gm, "<td class='t-cls-res'");

            var tdProc = document.createElement("td");
            tdProc.className = "t-cls-res";
            tdProc.innerHTML = ""+col(a,2)+"%";
            trTankTable.appendChild(tdProc);

            trTank.push([trTankTable, ttN, imgName, b, w, a]);
            yd[i].setAttribute("nat", nat);
        }
    }

    var sv = (function() {
        var battles = nations[0].battles,
            wins    = nations[0].wins,

            caps    = spanText(tstat[0].rows[6].cells[3].innerHTML),
            damage  = spanText(tstat[0].rows[7].cells[3].innerHTML),
            defs    = spanText(tstat[0].rows[8].cells[3].innerHTML),
            frags   = spanText(tstat[0].rows[9].cells[3].innerHTML),
            spotted = spanText(tstat[0].rows[10].cells[3].innerHTML);

        function spanText(res) {
            if (res.indexOf("span") > 0) {
                res=res.substr(0,res.indexOf("span"));
            }
            return toFl(res);
        }

        return {
            wins:     wins,    // overall wins
            battles:  battles, // overall battles

            avgFrags: (frags/battles),
            avgDmg:   (damage/battles),
            avgSpots: (spotted/battles),
            avgDef:   (defs/battles),
            avgCap:   (caps/battles),
            avgWin:   (wins/battles)
        };
    })();

    // scope a few helper functions, they will need to be
    // defined before use if included inside the script body
    function addTd(tr, val, classname, title)
    {
        var tdNew = document.createElement('td');
        tdNew.innerHTML = val;
        if(classname != "") {
            tdNew.className = classname;
        }
        if(title != "") {
            tdNew.title = title;
        }
        tdNew.value = val;
        tr.appendChild(tdNew);
    }

    function insertNewTr(NewTrParent, text, val, title, classname)
    {
        var trNew = document.createElement('tr');
        if (classname != "") {
            trNew.className = classname;
        }
        var tdNewName = document.createElement('td');
        tdNewName.innerHTML = text;

        var tdNew = document.createElement('td');
        tdNew.innerHTML = val;
        if (title != "") {
            tdNew.title = title;
        }
        tdNew.className = "td-number-nowidth";

        NewTrParent.parentNode.appendChild(trNew);
        trNew.appendChild(tdNewName);
        trNew.appendChild(tdNew);

        return trNew;
    }

    function addTr(NewTrParent, text)
    {
        var trNew = document.createElement('tr');
        trNew.innerHTML = text;

        NewTrParent.parentNode.appendChild(trNew);

        return trNew;
    }

    function insertTank(NewTrParent, level, battle, win, avgTier, name, title)
    {
        var trNew = document.createElement('tr');
        trNew.className = "t-row";
        var tdNewLevel = document.createElement('td');
        tdNewLevel.innerHTML = level;

        var tdNewBattle = document.createElement('td');
        tdNewBattle.className = "t-cls-res";
        tdNewBattle.innerHTML = battle;
        if (title != "") {
            tdNewBattle.title = title;
        }
        var tdNewW = document.createElement('td');
        if (avgTier == null) tdNewW.innerHTML = win;
        else tdNewW.innerHTML = avgTier;
        tdNewW.className = "t-cls-res";

        var tdNewP = document.createElement('td');
        tdNewP.innerHTML = "" + col(win/battle*100, 2) + "%";
        tdNewP.className = "t-cls-res";

        NewTrParent.parentNode.appendChild(trNew);
        trNew.appendChild(tdNewLevel);
        trNew.appendChild(tdNewBattle);
        trNew.appendChild(tdNewW);
        trNew.appendChild(tdNewP);

        return trNew;
    }
    // end helper functions

    // replace total cap with avgCap
    var ctable_cap = tclass[1].rows[5].cells;
    ctable_cap[0].firstChild.data = "Capture per Battle:";
    ctable_cap[1].firstChild.data = sv.avgCap.toFixed(2);

    // replace total def with avgDef
    var ctable_def = tclass[1].rows[6].cells;
    ctable_def[0].firstChild.data = "Defense per Battle:";
    ctable_def[1].firstChild.data = sv.avgDef.toFixed(2);

    // overall win% color
    var nat_win = col((sv.wins/sv.battles)*100, 2),
        ltable_vict = tclass[0].rows[2].cells[1];
    ltable_vict.innerHTML = ltable_vict.innerHTML.replace(/ \(.*\)/,"&nbsp;(" +nat_win+ "%)");

    var NatParent =   tclass[0].rows[tclass[0].rows.length-1].cells[0].parentNode.parentNode,
        NewtrParent = tclass[1].rows[tclass[1].rows.length-1].cells[0].parentNode.parentNode,
        ttParent =    tclass[2].rows[tclass[2].rows.length-1].cells[0].parentNode.parentNode;

    for (i=1; i<nations.length; ++i) // skip 'all' in index
    {
        var nation = nations[i];

        if (nation.battles != 0) {
            var nwcol = col(nation.wins/nation.battles*100,2);
            insertNewTr(NatParent, "Battles with " +nation.name+ ":",
                        ("" +nation.battles+ " (" +nwcol + "%)"), "Battles/Win Percent", "");
        }
    }

    if (daypassed != 0) {
        insertNewTr(NatParent, "Battles per Day:",
                   (""+(sv.battles/daypassed).toFixed(0)+""), "Total Days"+": "+daypassed.toFixed(), "");
    }
    // end tank-container

    // tier-container, 2nd tank table, ordered by tier
    var tdiv = document.createElement("div");
    tdiv.className = "tier-container";
    ts = trTankTable.parentNode.parentNode.parentNode;
    ts.parentNode.appendChild(tdiv);
    tdiv.innerHTML += "<div class='stat-header'><span class='stat-header'>Tier Performance per Vehicle Type</span></div>";

    var Table = document.createElement("table");
    Table.className = "t-statistic";
    tdiv.appendChild(Table);

    var tr = document.createElement("tr");
    Table.appendChild(tr);
    trTankTable = tr;
    trLev = insertNewTr(trTankTable, "<span class='t-classHdr'>Tier</span>",
                                     "<span class='t-classHdr'>Battles</span>", "", "t-row-header");

    addTd(trLev, "Victories", "t-classHdr", "");
    addTd(trLev, "Overall", "t-classHdr", "");

    var tank_class = [];

    for (i=0; i<veh_names.vcls_len(); ++i) {
        // complete the tank_class objects, slight cost in doing this during runtime.
        // frags, spotted, damage, and survived can be obtained from api data eventually
        var tc_member = {name:(veh_names.vclass(i)),battles:0,wins:0,avgTier:0,frags:0,spotted:0,damage:0,survived:0};
        tank_class.push(tc_member);
    }
    var type_b = [];

    for (i=1; i<tank_class.length; ++i) {
        type_b[i] = [];
        addTd(trLev, tank_class[i].name, "t-classHdr", "");
    }

    for(i=0; i<levOrder.length; i++)
    {
        // init type_b slices
        for (k=1; k<type_b.length; ++k) {
            type_b[k].push(0);
        }

        key = levOrder[i];
        if(lev[key]!=undefined)
        {
            tank_class[0].avgTier += (10-i)*lev[key].b/sv.battles;

            levTr = insertTank(trTankTable, key, lev[key].b, lev[key].w,
                               null, "lev", (lev[key].b/sv.battles*100).toFixed(2)+"%");

            for(j=1; j<type_b.length; ++j)
            {
                b = lev[key].t[j].b;

                type_b[j][i] = b;            // save type battles per tier
                tank_class[j].battles += b;  // accumulate class battles

                w = lev[key].t[j].w;
                tank_class[j].wins += w;

                if (b == 0) addTd(levTr, "x", "t-cls-res", "");
                else addTd(levTr, ""+col(w/b*100,2)+"%", "t-cls-res", ""+w+"/"+b);
            }
        }
    }
    // end tier-container

    var avgTier = tank_class[0].avgTier;

    // adjusted arty tiers for comparisons
    var spg = veh_names.vcls_idx('SP-Arty');

    var tier_shift = 2;
    for (i=0; i<tier_shift; ++i) {
        type_b[spg].push(0);
        type_b[spg].shift();
    }

    var adjTier = 0;
    for (i=0; i<levOrder.length; ++i) {
        for (j=1; j<type_b.length; ++j) {
            adjTier += (levOrder.length-i)*type_b[j][i]/sv.battles;
        }
    }
    console.log("overall average tier, adjusted for SPG: ", adjTier.toFixed(2));

    // reverse the tier sequences, in case we want to show class
    // type/tier battles later in a somewhat more logical manner
    for (i=1; i<type_b.length; ++i) // for each class
    {
        type_b[i].reverse();

        // calculate average tier for each tank class
        for (j=0; j<levOrder.length; ++j) {
            tank_class[i].avgTier += (j+1) * type_b[i][j]/tank_class[i].battles;
        }
        console.log("tier 1-10 battles ", tank_class[i].name, type_b[i], " total: ", tank_class[i].battles,
                    " avg tier: ", tank_class[i].avgTier.toFixed(3));
    }
    // warning: SPG in class table will show adjusted tier

    // stat functions (using basic module patterns)
    var eff_c = (function() {
        // common ranking for Eff stats
        var ranks = [
            { step: 2050, color: sc.col.sup_uni },
            { step: 1800, color: sc.col.unicum },
            { step: 1500, color: sc.col.great },
            { step: 1200, color: sc.col.good },
            { step:  900, color: sc.col.avg },
            { step:  600, color: sc.col.b_avg },
            { step:    0, color: sc.col.e_bad }
        ],

        rankIndex = function(stat) {
            for (var i=0; i<ranks.length; ++i)
            {
                if (stat >= ranks[i].step) {
                    var stat_col = ranks[i].color;
                    break;
                }
                var stat_col = sc.col.no_col; // default color (none)
            }
            return "<font color='"+stat_col+"'>"+stat.toFixed(2)+"</font>";
        };

        return { fmt: rankIndex };
    })();

    var wn_c = (function() {
        // common ranking for WN stats
        var ranks = [
            { step: 2050, color: sc.col.sup_uni },
            { step: 1850, color: sc.col.unicum },
            { step: 1550, color: sc.col.great },
            { step: 1400, color: sc.col.v_good },
            { step: 1150, color: sc.col.good },
            { step:  900, color: sc.col.avg },
            { step:  750, color: sc.col.b_avg },
            { step:  600, color: sc.col.bad },
            { step: -999, color: sc.col.e_bad }
        ],

        rankIndex = function(stat) {
            for (var i=0; i<ranks.length; ++i)
            {
                if (stat >= ranks[i].step) {
                    var stat_col = ranks[i].color;
                    break;
                }
                var stat_col = sc.col.no_col; // default color (none)
            }
            return "<font color='"+stat_col+"'>"+stat.toFixed(2)+"</font>";
        };

        return { fmt: rankIndex };
    })();

    var eff = (function() {
        var frag = sv.avgFrags*(0.35-2*avgTier/100)*1000,
            dmg  = sv.avgDmg*(10/avgTier)*(0.15+2*avgTier/100),
            spot = sv.avgSpots*0.2*1000,
            cap  = sv.avgCap*0.15*1000,
            def  = sv.avgDef*0.15*1000,

            stat = frag + dmg + spot + cap + def;

        return { frag: frag, dmg: dmg, spot: spot, cap: cap, def: def, stat: stat, fmt: eff_c.fmt(stat) };
    })();

    var wneff = (function() {
        // new and improved Eff
        var frag = sv.avgFrags*250,
            dmg  = sv.avgDmg*(10/(avgTier+2))*(0.23+2*avgTier/100),
            spot = sv.avgSpots*150,
            cap  = log(sv.avgCap+1,1.732)*150,
            def  = sv.avgDef*150,

            stat = frag + dmg + spot + cap + def;

        function log(n, b) {
            return Math.log(n)/Math.log(b);
        }

        return { frag: frag, dmg: dmg, spot: spot, cap: cap, def: def, stat: stat, fmt: eff_c.fmt(stat) };
    })();

    var wn4 = (function() {
        var frag = 465*sv.avgFrags,
            dmg  = (sv.avgDmg*460)/(184*Math.exp(0.24*avgTier)),
            spot = sv.avgSpots*125,
            def  = Math.min(2.2, sv.avgDef)*100,
            win  = ((185/(0.17+Math.exp(((sv.avgWin*100)-35)*-0.134)))-500)*0.5,

            stat = frag + dmg + spot + def + win;

        return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, stat: stat, fmt: wn_c.fmt(stat) };
    })();

    var wn6 = (function() {
        var frag = sv.avgFrags*(1240-1040/(Math.pow(Math.min(avgTier,6),0.164))),
            dmg  = sv.avgDmg*530/(184*Math.exp(0.24*avgTier)+130),
            spot = sv.avgSpots*125,
            def  = Math.min(2.2, sv.avgDef)*100,
            win  = (((185/(0.17+Math.exp(((sv.avgWin*100)-35)*-0.134)))-500)*0.45)
                  +((6-Math.min(avgTier,6))*-60),

            stat = frag + dmg + spot + def + win;

        return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, stat: stat, fmt: wn_c.fmt(stat) };
    })();

    var wn7 = (function() {
        var frag = sv.avgFrags*(1240-1040/(Math.pow(Math.min(avgTier,6),0.164))),
            dmg  = sv.avgDmg*530/(184*Math.exp(0.24*avgTier)+130),
            spot = sv.avgSpots*125*Math.min(avgTier,3)/3,
            def  = Math.min(2.2, sv.avgDef)*100,
            win  = (((185/(0.17+Math.exp(((sv.avgWin*100)-35)*-0.134)))-500)*0.45)
                  -(((5-Math.min(avgTier,5))*125)/(1+Math.exp(avgTier-Math.pow(sv.battles/220,3/avgTier))*1.5)),

            stat = frag + dmg + spot + def + win;

        return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, stat: stat, fmt: wn_c.fmt(stat) };
    })();

    // wn7a - adjusted spg's up 2 tiers
    var wn7a = (function() {
        var frag = sv.avgFrags*(1240-1040/(Math.pow(Math.min(adjTier,6),0.164))),
            dmg  = sv.avgDmg*530/(184*Math.exp(0.24*adjTier)+130),
            spot = sv.avgSpots*125*Math.min(avgTier,3)/3,
            def  = Math.min(2.2, sv.avgDef)*100,
            win  = (((185/(0.17+Math.exp(((sv.avgWin*100)-35)*-0.134)))-500)*0.45)
                  -(((5-Math.min(avgTier,5))*125)/(1+Math.exp(avgTier-Math.pow(sv.battles/220,3/avgTier))*1.5)),

            stat = frag + dmg + spot + def + win;

        return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, stat: stat, fmt: wn_c.fmt(stat) };
    })();
    // end stat modules

    // add stuff to 2nd col, top table
    insertNewTr(NewtrParent, "Damage per Battle:", sv.avgDmg.toFixed(2), "", "");
    insertNewTr(NewtrParent, "Frags per Battle:" , sv.avgFrags.toFixed(2), "", "");
    insertNewTr(NewtrParent, "Spotted per Battle:", sv.avgSpots.toFixed(2), "", "");
    insertNewTr(NewtrParent, "Average Tier:", avgTier.toFixed(2), "", "");
    insertNewTr(NewtrParent, "Average Tier (+2 SPG):", adjTier.toFixed(2), "", "");

    // add stuff to 3rd col, top table
    addTr(ttParent, "<th style='padding-top: 56px;' colspan='2'>Performance Ratings</th>", "");
    insertNewTr(ttParent, "WN7:", wn7.fmt, "", "");
    insertNewTr(ttParent, "Efficiency:", wneff.fmt, "", "");
    // noobmeter will pop in here when the site data is fetched

    // nation-container, 3rd tank table, ordered by type
    var tdiv = document.createElement("div");
    tdiv.className = "nation-container";
    ts = trTankTable.parentNode.parentNode;
    ts.parentNode.appendChild(tdiv);
    tdiv.innerHTML += "<div class='stat-header'><span class='stat-header'>Vehicle Type Performance per Nation</span></div>";

    var Table = document.createElement("table");
    Table.className = "t-statistic";
    tdiv.appendChild(Table);

    var tr = document.createElement("tr");
    Table.appendChild(tr);
    trTankTable = tr;

    trType = insertNewTr(trTankTable, "<span class='t-classHdr'>Type</span>",
                         "<span class='t-classHdr'>Battles</span>", "", "t-row-header");

    addTd(trType, "Avg Tier", "t-classHdr", "");  // previously 'Victories'
    addTd(trType, "Overall", "t-classHdr", "");

    for(j=1; j<nations.length; j++) {
        addTd(trType, nations[j].name, "t-classHdr", "");
    }

    var ttOr = [];
    for (var key in tt) {
        tt[key].key = key;
        ttOr.push(tt[key]);
    }
    ttOr.sort(function (a1,a2) {
            if(a1.b < a2.b) return 1;
            else return -1;
        });

    for (i=0; i<ttOr.length; i++)
    {
        key = ttOr[i].key;

        var t_win = (tt[key].b/sv.battles*100).toFixed(2),
            tc_at = tank_class[key[1]].avgTier.toFixed(2);

        if (tank_class[key[1]].name == 'SP-Arty') tc_at += ' (+2)'; // indicate +2 avg tier for arty

        typeTr = insertTank(trTankTable, toType(key), tt[key].b, tt[key].w, tc_at, "typ", t_win +"%");

        for(j=1; j<nations.length; j++)
        {
            b = tt[key].n[j].b; // battle by nation
            w = tt[key].n[j].w; // win
            if (b == 0) addTd(typeTr, "x", "t-cls-res", "");
            else addTd(typeTr, ""+col(w/b*100,2)+"%", "t-cls-res", ""+w+"/"+b);
        }
    }

    // left column 'Type' strings
    for (i=0; i<trTank.length; i++) {
        trTank[i][0].innerHTML = "<td>"+toType("t"+trTank[i][1])+"</td>"+trTank[i][0].innerHTML;
    }

    sortTd(trth.cells[1].childNodes[0]);
    // end nation-container
    // end table-container

    // create and populate performance ratings calcs table
    sdiv = document.createElement("div");
    sdiv.className = "ratings-container";
    sts = document.getElementsByClassName("result-container")[0];
    sts.parentNode.insertBefore(sdiv, sts.nextSibling);

    sdiv.innerHTML = "<div class='stat-header'><span class='stat-header'>Performance Rating Calculations</span></div>";

    var sTable = document.createElement("table");
    sTable.className = 't-perfstats';

    var sTHead = document.createElement("thead"),
        sTBody = document.createElement("tbody");

    sTable.appendChild(sTHead);
    sTable.appendChild(sTBody);

    var sRow, sCell;
    sRow = document.createElement("tr");
    sTHead.appendChild(sRow);

    var heading = ["Formula Type", "Total", "Frags", "Damage", "Spotting", "Capping", "Defense", "Victories"];

    for (i=0; i<heading.length; ++i)
    {
        sCell = document.createElement("th");
        sCell.innerHTML = heading[i];
        sRow.appendChild(sCell);
    }
    sdiv.appendChild(sTable);

    var bstat = [];

         // header:  Stat     Total     Frag     Dmg     Spot    Cap     Def     Win
    bstat.push(["New Efficiency", wneff.fmt, wneff.frag.toFixed(2), wneff.dmg.toFixed(2),
                wneff.spot.toFixed(2), wneff.cap.toFixed(2), wneff.def.toFixed(2), "x"]);

    bstat.push(["Old Efficiency", eff.fmt, eff.frag.toFixed(2), eff.dmg.toFixed(2),
                eff.spot.toFixed(2), eff.cap.toFixed(2), eff.def.toFixed(2), "x"]);

    bstat.push(["WN4", wn4.fmt, wn4.frag.toFixed(2), wn4.dmg.toFixed(2),
                wn4.spot.toFixed(2), "x", wn4.def.toFixed(2), wn4.win.toFixed(2)]);

    bstat.push(["WN6", wn6.fmt, wn6.frag.toFixed(2), wn6.dmg.toFixed(2),
                wn6.spot.toFixed(2), "x", wn6.def.toFixed(2), wn6.win.toFixed(2)]);

    bstat.push(["WN7", wn7.fmt, wn7.frag.toFixed(2), wn7.dmg.toFixed(2),
                wn7.spot.toFixed(2), "x", wn7.def.toFixed(2), wn7.win.toFixed(2)]);

    bstat.push(["WN7 (+2 SPG)", wn7a.fmt, wn7a.frag.toFixed(2), wn7a.dmg.toFixed(2),
                wn7a.spot.toFixed(2), "x", wn7a.def.toFixed(2), wn7a.win.toFixed(2)]);

    for (i=0; i<bstat.length; ++i)
    {
        sRow = document.createElement("tr");
        sTBody.appendChild(sRow);

        for (j=0; j<bstat[i].length; ++j)
        {
            sCell = document.createElement("td");
            sCell.innerHTML = bstat[i][j];
            sRow.appendChild(sCell);
        }
    }
    sdiv.innerHTML += "<div class='scriptlink'><a target='_blank' "
                    +"href='http://forum.worldoftanks.com/index.php?/topic/184017-'>What is WN*?</a></div>";
    // end perf calcs table

    // response handlers for web requests
    function apiHnd(response)
    {
        eval("var resp =" +response.responseText);

        ins_medal_resp(resp.data.achievements);

        if (devMode) ins_veh_resp(resp.data.vehicles);
    }

    function nmHnd(response)
    {
        var nmpr = parseFloat(response.responseText);

        if (isNaN(nmpr)) {
            var nm_fmt = "No Rating";
        }
        else
        {
            switch(true) {
                case (nmpr>=2000): color = sc.col.sup_uni; break;
                case (nmpr>=1950): color = sc.col.unicum;  break;
                case (nmpr>=1750): color = sc.col.great;   break;
                case (nmpr>=1450): color = sc.col.good;    break;
                case (nmpr>=1250): color = sc.col.avg;     break;
                case (nmpr>=1150): color = sc.col.b_avg;   break;
                case (nmpr<1150):  color = sc.col.e_bad;   break;
                default:           color = sc.col.no_col;
            }
            var nm_fmt = "<font color='"+color+"'>"+nmpr.toFixed(2)+"</font>";
        }
        insert_nm_resp(nm_fmt);
    }

    function histHnd(response)
    {
        var resptxt = response.responseText;

        // aliases
        var alist = sift(/>([-\w]+)<\/fo/g, resptxt);
        if (alist.length > 0) {
            var aliases = alist.join(", ");
            timeDiv.innerHTML += "<span class='pl-hist'><br/>Aliases: "+aliases+"</span>";
        }

        // clan history
        var clist = sift(/>(\[[-\w]+\])/g, resptxt);
        if (clist.length > 0)
        {
            // clist contains full history, including re-ups
            //  and current clan, let's trim that down a bit
            console.log("full clan history: ", clist);

            // find consecutive re-ups
            var slist = clist.slice(0);
            clist.push(null);    // tail
            slist.unshift(null); // head

            for (i=0; i<clist.length; i++) {
                // null adjacent dups
                if (clist[i] == slist[i]) slist[i]=null;
            }
            var filt_list = slist.filter(function(val) {
                    // then strip nulls
                    return !(val === "" || typeof val == "undefined" || val === null);
                });
            // restore clist to original state
            clist.pop();

            // check current membership
            var cl = document.getElementsByClassName("b-clan-list");
            if (cl.length !== 0)
            {
                var clantag = document.getElementsByClassName("tag")[0].firstChild.nodeValue;

                if (clantag != undefined)
                {
                    // show mywotstats link if in a clan
                    insert_mws_link();

                    // and pop current clan if enrolled
                    if (filt_list[(filt_list.length)-1] == clantag) filt_list.pop();
                }
            }
            if (filt_list.length > 0) {
                var clans = filt_list.join(", ");
                timeDiv.innerHTML += "<span class='pl-hist'><br/>Clan History: "+clans+"</span>";
            }

            // show d&c link if any history exists
            if (alist.length > 0 || clist.length > 0) insert_dc_link();
        }

        function sift(pattern, resptxt)
        {
            var smatch = resptxt.match(pattern);
            var names = [];

            if (smatch != null) {
                for (i=0; i<smatch.length; ++i) {
                    var tmpstr = smatch[i].replace(pattern, "$1");
                    names.push(tmpstr);
                }
            }
            return names;
        }
    }
    // end histHnd()

    function api_errHnd() {
        console.log("error retreiving WG API data");
        return null;
    }

    function nm_errHnd() {
        insert_nm_resp("");
        console.log("error retreiving NoobMeter data");
        return null;
    }

    function hist_errHnd() {
        console.log("error retreiving duckandcover data");
        if (opera) {
            insert_dc_link(); // show dc link for opera users
            insert_mws_link(); // and mywotstats
        }
        return null;
    }

    function gRec(doc)
    {
        if (gecko)
        {
            var resp;
            GM_xmlhttpRequest({
                method: "GET",
                url: doc.url,
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "text/xml"
                },
                onload: function(resp) {
                    if (resp.readyState == 4) {
                        if (resp.status == 200) doc.handler(resp);
                    }
                },
                onerror: function() {
                    doc.onerror();
                }
            });
        }
        else
        {
            var xhr = new XMLHttpRequest();
            var onLoadHandler = function(event) {
                    doc.handler(event.target);
                }
            var onErrorHandler = function(event) {
                    doc.onerror();
                }

            xhr.open("GET", doc.url, true);
            xhr.onload = onLoadHandler;
            xhr.onerror = onErrorHandler;
            xhr.send(null);
        }
    }

    // retrieve and process pages from wg api, noobmeter, and duckandcover
    var gRecProps = [
            { url: api_url,   handler: apiHnd,  onerror: api_errHnd,  nav: true },
            { url: nmapi_url, handler: nmHnd,   onerror: nm_errHnd,   nav: true },
            { url: dc_url,    handler: histHnd, onerror: hist_errHnd, nav: true }
        ];

    // moved so we fetch and process pages after stat tables have been populated
    for (i=0; i<gRecProps.length; ++i) {
        var doc = gRecProps[i];
        if (doc.nav) gRec(doc);
    }


    var medals = (function() {
        // api 1.9, map medals for easier maintenance. If name: is defined then api returns it
        var properties = [
            // epic achievements, paths are specific to NA web server, EU et all is different
            { name: "medalBillotte", path: "achievements/billotte", title: "Billotte&#39;s" },
            { name: "medalBrothersInArms", path: "media/80_achievements_correct/medalbrothersinarms", title: "Brothers In Arms" },
            { name: "medalBrunoPietro", path: "media/80_achievements_correct/bruno", title: "Bruno&#39;s" },
            { name: "medalBurda", path: "media/80_achievements_correct/burda", title: "Burda&#39;s" },
            { name: "medalCrucialContribution", path: "media/80_achievements_correct/medalcrucialcontribution", title: "Crucial Contribution" },
            { name: "medalDeLanglade", path: "media/80_achievements_correct/de_laglande", title: "de Langlade&#39;s" },
            { name: "medalDumitru", path: "media/80_achievements_correct/dumitru", title: "Dumitru&#39;s" },
            { name: "medalFadin", path: "achievements/fadin", title: "Fadin&#39;s" },
            { name: "medalHalonen", path: "achievements/halonen", title: "Halonen&#39;s" },
            { name: "medalKolobanov", path: "achievements/kolobanov", title: "Kolobanov&#39;s" },
            { name: "medalLafayettePool", path: "media/80_achievements_correct/pool", title: "Pool&#39;s" },
            { name: "medalLehvaslaiho", path: "media/80_achievements_correct/lehveslaiho", title: "Lehvaslaiho&#39;s" },
            { name: "medalOrlik", path: "achievements/orlik", title: "Orlik&#39;s" },
            { name: "medalOskin", path: "media/80_achievements_correct/oskin", title: "Oskin&#39;s" },
            { name: "medalPascucci", path: "media/80_achievements_correct/pascucci", title: "Pascucci&#39;s" },
            { name: "medalRadleyWalters", path: "media/80_achievements_correct/radley", title: "Radley-Walter&#39;s" },
            { name: "medalBoelter", path: "achievements/medal_belter", title: "Böelter&#39;s" },

            { name: "medalTamadaYoshio", path: "media/80_achievements_correct/tamada_yoshio", title: "Tamada Yoshio&#39;s" },
            { name: "medalNikolas", path: "media/80_achievements_correct/nicolos", title: "Nichols&#39;" },
            { name: "medalTarczay", path: "media/80_achievements_correct/tarczay", title: "Tarczay&#39;s" },
            { name: "heroesOfRassenay", path: "maori/heroesofrassenay", title: "Raseiniai Heroes" },

            // battle achievements
            { name: "defender", path: "achievements/defender", title: "Defender" },
            { name: "evileye",  path: "media/80_achievements_correct/dozorny", title: "Patrol Duty" },
            { name: "invader", path: "achievements/invader", title: "Invader"},
            { name: "scout", path: "achievements/scout", title: "Scout" },
            { name: "sniper", path: "achievements/sniper", title: "Sniper" },
            { name: "steelwall", path: "achievements/steel_wall", title: "Steel Wall" },
            { name: "supporter", path: "achievements/confederate", title: "Confederate" },
            { name: "warrior", path: "achievements/top_gun", title: "Top Gun" },

            // special achievements
            { name: "maxPiercingSeries", path: "achievements/master_gunner", title: "Master Gunner" },
            { name: "beasthunter", path: "achievements/tank_hunter", title: "Hunter" },
            { name: "maxDiehardSeries", path: "achievements/survivor", title: "Survivor" },
            { name: "maxKillingSeries", path: "achievements/reaper", title: "Reaper" },
            { name: "huntsman", path: "achievements/ranger", title: "Ranger" },
            { name: "ironMan", path: "achievements/cool-headed", title: "Cool-Headed" },
            { name: "maxInvincibleSeries", path: "achievements/invincible", title: "Invincible" },
            { name: "kamikaze", path: "achievements/kamikadze", title: "Kamikaze" },
            { name: "luckyDevil", path: "achievements/lucky", title: "Lucky" },

            { name: "mechanicEngineer",  nation: "all", path: "5RZY7Zq", title: "Senior Technical Engineer" },
            { name: "mechanicEngineers", nation: "ussr", path: "mU4vQAb", title: "Tech Engineer: Russia" },
            { name: "mechanicEngineers", nation: "germany", path: "V7yAUdH", title: "Tech Engineer: Germany" },
            { name: "mechanicEngineers", nation: "usa", path: "t36Y6Ds", title: "Tech Engineer: US" },
            { name: "mechanicEngineers", nation: "france", path: "6nR74Gg", title: "Tech Engineer: France" },
            { name: "mechanicEngineers", nation: "uk", path: "ZKGJFFN", title: "Tech Engineer: UK" },
            { name: "mechanicEngineers", nation: "china", path: "GSS01To", title: "Tech Engineer: China" },

            { name: "mousebane", path: "achievements/mouse_trap", title: "Mouse Trap" },
            { name: "pattonValley", path: "achievements/patton_valley", title: "Valley of Pattons" },
            { name: "raider", path: "achievements/raider", title: "Raider" },
            { name: "sinai", path: "maori/lion", title: "Lion of Sinai" },
            { name: "sturdy", path: "achievements/spartan", title: "Spartan" },
            { name: "tankExpert", path: "achievements/expert", title: "Master Tanker" },
            { name: "bombardier", path: "media/80_achievements_correct/bombardier", title: "Bombardier" },

            { name: "tankExperts", nation: "ussr", path: "lUbYSvL", title: "Expert: Russia" },
            { name: "tankExperts", nation: "germany", path: "IMBKkeY", title: "Expert: Germany" },
            { name: "tankExperts", nation: "usa", path: "7BSeC5m", title: "Expert: US" },
            { name: "tankExperts", nation: "france", path: "28yBds8", title: "Expert: France" },
            { name: "tankExperts", nation: "uk", path: "Ts1LqIY", title: "Expert: UK" },
            { name: "tankExperts", nation: "china", path: "7jOwXxl", title: "Expert: China" },

            { name: "maxSniperSeries", path: "achievements/sharpshooter", title: "Sharpshooter" },

            // major achievements - unknown paths for individual medal
            { name: "medalAbrams", step: null, title: "Abrams&#39;" },
            { name: "medalCarius", step: null, title: "Carius&#39;" },
            { name: "medalEkins", step: null, title: "Ekins&#39;" },
            { name: "medalKay", step: null, title: "Kay&#39;s" },
            { name: "medalKnispel", step: null, title: "Knispel&#39;s" },
            { name: "medalLavrinenko", step: null, title: "Lavrinenko&#39;s" },
            { name: "medalLeClerc", step: null, title: "LeClerc&#39;s" },
            { name: "medalPoppel", step: null, title: "Popel&#39;s" },

            // unused and unknowns
            { name: "invincible", skip: null, path: "", title: "" },      // flags invincible, redundant
            { name: "diehard", skip: null, path: "", title: "" },         // flags survivor, redundant
            { name: "lumberjack", skip: null, path: "", title: "" },
            { name: "armorPiercer", skip: null, path: "", title: "" },
            { name: "handOfDeath", skip: null, path: "", title: "" },
            { name: "titleSniper", skip: null, path: "", title: "" }
        ],

        sam = [  // step achievements
            { name: "medalAbrams" },
                { tag: "CDj6PsH", cls: "I" },   { tag: "v2YVQSc", cls: "II" },
                { tag: "YAGShoO", cls: "III" }, { tag: "gNMMH37", cls: "IV" },
            { name: "medalCarius" },
                { tag: "poQGJjQ", cls: "I" },   { tag: "eKhvn3z", cls: "II" },
                { tag: "1rKvCNR", cls: "III" }, { tag: "kpuC2Qr", cls: "IV" },
            { name: "medalEkins" },
                { tag: "218uU3u", cls: "I" },   { tag: "0jmVvxJ", cls: "II" },
                { tag: "M7fUFyJ", cls: "III" }, { tag: "nJH9I18", cls: "IV" },
            { name: "medalKay" },
                { tag: "gVS2V8j", cls: "I" },   { tag: "fOBhvIS", cls: "II" },
                { tag: "dTojv1T", cls: "III" }, { tag: "l5Skliy", cls: "IV" },
            { name: "medalKnispel" },
                { tag: "ecjk2HF", cls: "I" },   { tag: "HLw0m4h", cls: "II" },
                { tag: "za7vbFU", cls: "III" }, { tag: "WPqw62F", cls: "IV" },
            { name: "medalLavrinenko" },
                { tag: "nbpB9Q5", cls: "I" },   { tag: "U1FNsMo", cls: "II" },
                { tag: "7xTwpx2", cls: "III" }, { tag: "KvcPEfK", cls: "IV" },
            { name: "medalLeClerc" },
                { tag: "I0u03vp", cls: "I" },   { tag: "FhAxKPL", cls: "II" },
                { tag: "9Vy7vc1", cls: "III" }, { tag: "gRiL4Qx", cls: "IV" },
            { name: "medalPoppel" },
                { tag: "ZJrKmjE", cls: "I" },   { tag: "6xKiqz7", cls: "II" },
                { tag: "yDptEQ1", cls: "III" }, { tag: "Kh4vOBU", cls: "IV" }
        ],

        samIndex = function(name, cls) {
            for (var i=0; i<sam.length; ++i)
                for (var key in (sam[i]))
                    if (sam[i][key] == name) return sam[i+cls];
            return -1; // if no match
        };

        return {
            steps: samIndex,
            props: properties
        };
    })();
    // end medals var

    function ins_medal_resp(respdata)
    {
        var div = document.createElement("div");
        div.className = "medal-container";

        var ts = document.getElementsByClassName("ratings-container")[0];
        ts.parentNode.insertBefore(div, ts.nextSibling);

        div.innerHTML += "<div class='stat-header'><span class='stat-header'>Achievement Medals</span></div>";

        var medaldiv = document.createElement("div");
        medaldiv.className = "medal-content";
        div.appendChild(medaldiv);

        for (i=0; i<medals.props.length; ++i)
        {
            var medal = medals.props[i];

            if ("skip" in medal) continue;  // skip unused/unknowns

            var styleImg = "",
                showMedal = false;

            var mc = respdata[medal.name];

            // show medals with counts and awarded nation types (engineers and experts)
            // will show master tanker and senior tech eng if ever awarded, which is fine.
            if ("nation" in medal) {
                if (respdata[medal.name].hasOwnProperty(medal.nation)) {
                    showMedal = respdata[medal.name][medal.nation];
                }
            }

            if (mc > 0 || showMedal)
            {
                var title = medal.title,
                    m_path = medal.path,
                    font = "<font class='medalCounter'>"+mc+"</font>",
                    img_host = "'http://worldoftanks.com/dcont/fb/";

                if ((medal.name == "maxInvincibleSeries" && mc < 5) ||
                    (medal.name == "maxDiehardSeries" && mc < 20) )
                {
                    styleImg = "style = 'opacity: 0.4;' ";
                    title += ", series length ";
                }
                if (medal.name == "tankExpert") font = "";  // don't add count to master tanker

                if (("nation" in medal) || ("step" in medal))
                {
                    font = "";
                    img_host = "http://i.imgur.com/";

                    if ("step" in medal) // step achievement, count (mc) is class level
                    {
                        var m_obj = medals.steps(medal.name, mc);
                        title += " "+m_obj.cls+" Class";
                        m_path = m_obj.tag;
                    }
                }

                var img_url = img_host+m_path+".png'",
                    img_tag = "<img "+styleImg+"width=50 height=50 src="+img_url+"alt='' title='"+title+"'>";

                div.innerHTML += "<div id='medal' class='"+medal.name
                               +"' style='display: inline-block;position: relative;'>"+img_tag+font+"</div>";
            }
        }
        var desc_url = "http://" +wg_host +"/game/guide/en/general/achievements";
        div.innerHTML += "<div class='scriptlink'><a target='_blank' href='"+desc_url+"'>Achievement Descriptions</a></div>";
    }
    // end ins_medal_resp()

    function ins_veh_resp(respdata)
    {
        var t_hdr = ["Dmg", "Frag", "Spot"];

        for (i=0; i<t_hdr.length; ++i) {
            var s_th = document.createElement('th');
            s_th.className = "t-cls-res";
            s_th.innerHTML = "<div onclick='sortTd(this,0)' style='cursor: pointer;text-align: left'>"+t_hdr[i]+"</div>";

            trth.appendChild(s_th); // uses trth global
        }

        var veh_data = respdata,
            rows = tstat[1].rows;

        for (i=1; i<rows.length; ++i)
        {
            var t = rows[i].cells;
            if (t[1].tagName != "TH" && t[1].innerHTML!="")
            {
                imgName = t[1].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];

                for (j=0; j<veh_data.length; j++) {
                    if(veh_data[j].name.toLowerCase() == imgName) {
                        var veh = veh_data[j];
                        break;
                    }
                }
                if (t[0].innerHTML == "undefined") t[0].innerHTML = toType(veh.class);

                var ncell = rows[i].insertCell(t.length);
                ncell.innerHTML = (veh.damageDealt/veh.battle_count).toFixed()+"";

                ncell = rows[i].insertCell(t.length);
                ncell.innerHTML = (veh.frags/veh.battle_count).toFixed(2)+"";

                ncell = rows[i].insertCell(t.length);
                ncell.innerHTML = (veh.spotted/veh.battle_count).toFixed(2)+"";
            }
        }
    }
    // end ins_veh_resp()

    function insert_nm_resp(fmt) {
        insertNewTr(ttParent, "<a target='_blank' href="+nm_target+">NoobMeter</a>:", fmt, "", "");
    }

    function insert_dc_link() {
        timeDiv.innerHTML += "<span class='pl-hist'><br/>Player history on <a target='_blank' href='"
                           +dc_en_url+"'>Duckandcover</a></span>";
    }

    function insert_mws_link()
    {
        var clan_id = null,
            mws_clans = "http://www.mywotstats.com/Clan/View",
            clan_cls = document.getElementsByClassName("b-text")[0];

        if (clan_cls != undefined) {
            clan_id = clan_cls.firstChild.nextSibling.innerHTML.match(/\/(\d+)/)[1];
        }
        if (mws_srv != null && clan_id != null) {
            clan_cls.innerHTML += "<span class='pl-hist'>Clan stats on <a target='_blank' href='"
                                +mws_clans+"/"+clan_id+"/"+mws_srv+"'>MyWOTStats</a></span>";
        }
    }
}
// end if not new account

// inserted into main document via
// document.createElement("script")
function toFl(s)
{
    var a =""+s;
    return (parseFloat(a.replace(/[\D\.]/g,"")));
}

function toType(k)
{
    switch(true) {
        case (k == "t1" || k == "lightTank"):  return "Light";
        case (k == "t2" || k == "mediumTank"): return "Medium";
        case (k == "t3" || k == "heavyTank"):  return "Heavy";
        case (k == "t4" || k == "SPG"):        return "SP-Arty";
        case (k == "t5" || k == "AT-SPG"):     return "TD";
        default: return null;
    }
}

function col(v, digit)
{
    if(isNaN(v)) return "x";

    switch(true) {
        case (v>=70): color = sc.col.sup_uni; break;
        case (v>=60): color = sc.col.unicum;  break;
        case (v>=54): color = sc.col.great;   break;
        case (v>=51): color = sc.col.good;    break;
        case (v>=48): color = sc.col.avg;     break;
        case (v>=46): color = sc.col.b_avg;   break;
        case (v<46):  color = sc.col.bad;     break;
        default:      color = sc.col.no_col;
    }
    return "<font color='"+color+"'>"+v.toFixed(digit)+"</font>";
}

function sortTd(el, dir)
{
    var p = el;
    while (p.tagName.toLowerCase() != "tbody") {
        if (p.tagName.toLowerCase() == "th" || p.tagName.toLowerCase() == "td")
            Index = p.cellIndex;
        p = p.parentNode;
    }
    tBody = p; //el.parentNode.parentNode;
    // alert(el.innerHTML);
    rows = tBody.rows;
    th = rows[0];
    sortar = [];

    for (i=1; i<rows.length; i++) {
        sortar[i] = [];
        sortar[i][0] = defkey(rows[i], Index);
        sortar[i][1] = rows[i];
    }
    if (el.onclick.toString().indexOf('"u"')>0) {
        sortar.sort(_sort);
        el.setAttribute('onclick','sortTd(this, "d")');
    }
    else {
        sortar.sort(_sortR);
        el.setAttribute('onclick','sortTd(this, "u")');
    }
    tBody.innerHTML = "";
    tBody.appendChild(th);

    for (i=0; i<sortar.length-1; i++) {
        tBody.appendChild(sortar[i][1]);
    }

    function defkey(row, i) {
        var levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"];

        if ((i==3 || i==4) || i>=6)  return parseFloat(row.cells[i].innerHTML.replace(/\D/g,""));  // battles, victories, dmg, frag, spot, ...
        else if (i==5) return parseFloat(row.cells[i].innerHTML.match(/>(.*)</)[1]); // winrate
        else if (i==1) return levOrder.indexOf(row.cells[i].getElementsByTagName("span")[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/,"")); // tier
        else return row.cells[i].innerHTML;
    }

    function _sort(a, b) {
        a = a[0];
        b = b[0];
        if(a>b) return -1; else return 1;
    }

    function _sortR(a, b) {
        a = a[0];
        b = b[0];
        if(a>b) return 1; else return -1;
    }
}
// end sortTd()

function hideTypes(el)
{
    var p = el;

    while (p.tagName.toLowerCase() != "tbody")
    {
        if (p.tagName.toLowerCase() == "th") Index = p.cellIndex;
        p = p.parentNode;
    }
    var tBody = p,
        rows = tBody.rows;

    var bat=0, win=0,
        ftype = document.getElementById("tankType").value,
        nat = document.getElementById("nationality").value,
        chfrom = document.getElementById("chfrom").value;

    for (var i=1; i<rows.length; ++i)
    {
        if ((rows[i].cells[0].innerHTML == ftype || ftype == 0) &&      // type
            (rows[i].cells[1].getAttribute("nat") == nat || nat==0) &&  // level
            (toFl(rows[i].cells[3].innerHTML) > chfrom ))               // battles
        {
            rows[i].style.display = "";
            bat += toFl(rows[i].cells[3].innerHTML);
            win += toFl(rows[i].cells[4].innerHTML);
        }
        else rows[i].style.display = "none";
    }

    // footer, totals
    tBody = tBody.parentNode;
    if (tBody.tFoot!=undefined) tBody.deleteTFoot();

    var r = tBody.createTFoot().insertRow(0);
    r.insertCell(0).innerHTML = "Total";
    r.insertCell(1); // blank cell under tier
    r.insertCell(2); // blank cell under vehicle

    var c = r.insertCell(3);    // battles
    c.innerHTML =""+bat;
    c.className = "t-cls-res";

    var c = r.insertCell(4);    // victories
    c.innerHTML =""+win;
    c.className = "t-cls-res";

    var c = r.insertCell(5);    // win rate
    c.innerHTML =""+(win/bat*100).toFixed(2)+"%";
    c.className = "t-cls-res";
}
// end hideTypes
// end script
