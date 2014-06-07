// ==UserScript==
// @name           Pulse
// @namespace      Alterpulse
// @description    PULSEPROJECT - eRepublik Hungarian fight tracker ( E4H )
// @version        1.9
// @include        /^https?://www\.erepublik\.com/\w{2}$/
// @include        /^https?://www\.erepublik\.com/\w{2}\?viewPost=\d+$/
// @include        /^https?://www\.erepublik\.com/\w{2}/military/battlefield/\d+$/
// @include        /^https?://www\.erepublik\.com/\w{2}/main/pvp/.+$/
// @include        /^https?://www\.erepublik\.com/\w{2}/citizen/profile/\d+$/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @updateURL	   http://gatmax.info/pulse/pulse.ver.js
// @downloadURL    http://gatmax.info/pulse/pulse.js
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////////////

var $j;
var SERVER_DATA = unsafeWindow.SERVER_DATA;
var saveDataTime = null;

function initializePersistence() {
    var pulse_queue = null;
    var pulse_version = "1.9";
    var DO_BattleID;
    var DO_Country;
    var DO_Region;
    var DO_SAVE;

    ////////////////////////////////////////////////////////////////////////////////////////

    var database = null;
    try {
        database = !window.globalStorage ? window.localStorage : window.globalStorage[location.hostname];
        if (database == null || database == undefined || database == "undefined") {
            database = !unsafeWindow.globalStorage ? unsafeWindow.localStorage : unsafeWindow.globalStorage[location.hostname];
        }
    } catch (e) {}
    if (database == null) {
        return;
    }

    var RX_JSON = (function () {
        try {
            return new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$');
        } catch (e) {
            return (/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/);
        }
    }());


    function typecheck(type, compare) {
        return !type ? false : type.constructor.toString().match(new RegExp(compare + '\\(\\)', 'i')) !== null;
    }


    function prepareForStorage(value) {
        if (value === undefined) {
            return '';
        }

        if (typecheck(value, 'Object') ||
            typecheck(value, 'Array') ||
            typecheck(value, 'Function')) {
            return JSON.stringify(value);
        }

        return value;
    }

    function prepareForRevival(value) {
        return RX_JSON.test(value) ? JSON.parse(value) : value;
    }

    function storageGet(key) {
        var data = null;
        try {
            data = prepareForRevival(database.getItem(key));
        } catch (ex) {}

        return data;
    }

    function storageSet(key, value) {
        try {
            database.setItem(key, prepareForStorage(value));
        } catch (ex) {}
    }

    var DO_armyID = storageGet("pulse-armyid");

    function saveDo() {
        var ts = new Date().getTime();

        storageSet("pulse-doBattleID", DO_BattleID);
        storageSet("pulse-doCountry", DO_Country);
        storageSet("pulse-doRegion", DO_Region);
        storageSet("pulse-doSave", ts);
	}

    function updateDo() {
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://www.erepublik.com/en",
            dataType: "html",
            onload: function (e) {
				if (e.responseText == null) {
					return;
				}
			    var arr = e.responseText.match(/var mapDailyOrder \=([^;]*);/);
                var mapDO = JSON.parse(arr[1]);

                DO_BattleID = mapDO['do_battle_id'];
                DO_Country = mapDO['do_for_country'];
                DO_Region = mapDO['do_region_name'];
	            saveDo();
            }
        })
    }

    if (unsafeWindow.mapDailyOrder) {
		DO_BattleID = unsafeWindow.mapDailyOrder['do_battle_id'];
		DO_Country = unsafeWindow.mapDailyOrder['do_for_country'];
		DO_Region = unsafeWindow.mapDailyOrder['do_region_name'];
		saveDo();
    } else {
        var b = false;
        var ts = new Date().getTime();
        var ts2 = storageGet("pulse-doSave");

        if (ts2 == null) {
            b = true;
        } else if (ts - ts2 > 3600000) {
            b = true;
        }
        if (b == true) {
			updateDo();
		} else {
            DO_BattleID = storageGet("pulse-doBattleID");
            DO_Country = storageGet("pulse-doCountry");
            DO_Region = storageGet("pulse-doRegion");
            DO_SAVE = storageGet("pulse-doSave");
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    if (void 0 != $("#left_campaign_points").html()) {

        blueP = $("#left_campaign_points").html();
        redP = $("#red_campaign_points").html();

        if (blueP < redP) {

            $("h3:eq(1)").css("color", "#008800");

            $("h3:eq(2)").css("color", "#FF0000");

        } else {


            $("h3:eq(1)").css("color", "#FF0000");

            $("h3:eq(2)").css("color", "#008800");
        }

        blue = document.getElementById("blue_domination");
        newBlue = blue.innerHTML;
        newBlue = newBlue.replace("%", "");

        if (newBlue > 53) {

            blue.style.opacity = "1";
            blue.style.color = "#ff3300";
            blue.style.fontSize = "30px"
            blue.style.paddingLeft = "10px";
            blue.style.top = "-3px";
            blue.style.left = "50px";

        }
        if (newBlue < 53) {

            blue.style.opacity = "1";
            blue.style.color = "#ffff33";
            blue.style.fontSize = "30px"
            blue.style.paddingLeft = "10px";
            blue.style.top = "-3px";
            blue.style.left = "50px";

        }
        if (newBlue < 51) {

            blue.style.opacity = "1";
            blue.style.color = "#66cc00";
            blue.style.fontSize = "30px"
            blue.style.paddingRight = "10px";
            blue.style.top = "-3px";
            blue.style.left = "50px";
        }

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function replaceAll(text, busca, reemplaza) {
        while (text.toString().indexOf(busca) != -1)
            text = text.toString().replace(busca, reemplaza);
        return text;
    }

    function getCitizenId() {
        if (typeof (SERVER_DATA) != 'undefined') {
            if (typeof (SERVER_DATA.citizenId) != 'undefined') {
                return SERVER_DATA.citizenId;
            }
        }

        var srcCitizenId = $(".user_avatar").attr("href").trim();
        var srcIdParts = srcCitizenId.split("/");
        return srcIdParts[srcIdParts.length - 1];
    }

    function getRankByRankPoints(rank_points) {
        var rank_array = [10, 30, 60, 100, 150, 250, 350, 450, 600, 800, 1000, 1400, 1850, 2350, 3000, 3750, 5000, 6500, 9000, 12000, 15500, 20000, 25000, 31000, 40000, 52000, 67000, 85000, 110000, 140000, 180000, 225000, 285000, 355000, 435000, 540000, 660000, 800000, 950000, 1140000, 1350000, 1600000, 1875000, 2185000, 2550000, 3000000, 3500000, 4150000, 4900000, 5800000, 7000000, 9000000, 11500000, 14500000, 18000000, 22000000, 26500000, 31500000, 37000000, 43000000, 50000000, 100000000, 200000000, 500000000, 999999999];

        var rank = 0;
        for (rank = 0; rank < rank_array.length; rank++) {
            if (rank_points < rank_array[rank]) {
                return rank + 1;
            }
        }

        return rank + 1;
    }

    function getInfluence(rank_points, strength) {
        var rank = getRankByRankPoints(rank_points);

        var influence = ((rank - 1.0) / 20.0 + 0.3) * ((strength / 10.0) + 40.0) * 3;
        var level = parseInt($('.sidebar .user_section .user_level').text());
        if(level > 100){
            influence *= 1.1;
        }
        return parseInt(influence);
    }

    function getInfluenceByWeapon(rank_points, strength, weaponId) {
        if (weaponId == 10)
            return 10000;

        var rank = getRankByRankPoints(rank_points);
        var multiplier = 1.0;
        if (weaponId == 1) multiplier = 1.2;
        else if (weaponId == 2) multiplier = 1.4;
        else if (weaponId == 3) multiplier = 1.6;
        else if (weaponId == 4) multiplier = 1.8;
        else if (weaponId == 5) multiplier = 2.0;
        else if (weaponId == 6) multiplier = 2.2;
        else if (weaponId == 7) multiplier = 3.0;

        var influence = ((rank - 1.0) / 20.0 + 0.3) * ((strength / 10.0) + 40.0) * multiplier;
        
        var level = parseInt($('.sidebar .user_section .user_level').text());
        if(level > 100){
            influence *= 1.1;
        }
        return parseInt(influence);
    }

    /////////////////////////////////////////////////////////

    var currentBattleId = 0;

    function forceAjaxCheck() {

        $j.ajax({
            type: 'GET',
            url: 'http://www.erepublik.com/en/military/battle-stats/' + currentBattleId,
            cache: true,
            dataType: 'json',
            timeout: 7000
        });

    }

    function queryCountryStats() {
        var b = false;

        var timestamp = new Date().getTime();
        var timestamp2 = storageGet("pulse-stats-ts");
        if (timestamp2 == null) {
            b = true;
        } else if (timestamp - timestamp2 > 1800000) {
            b = true;
        }

        if (b == true) {
            var url = 'http://199.19.119.44:443/index.php/PulseWS/countries';

            $.ajax({
                type: 'GET',
                url: url,
                cache: true,
                dataType: 'json',
                timeout: 15000,
                success: function (data) {

                    setCountryStats(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {},
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            });

            var timestamp = new Date().getTime();
            storageSet("pulse-stats-ts", timestamp);
        }
    }


    function showAll() {
        $("#pulse_section_data").slideDown('fast');
    }

    function hideAll(animate) {
        if (animate == true) {
            $("#pulse_section_data").slideUp('slow');
        } else {
            $("#pulse_section_data").hide();
        }
    }


    function showPromo() {
        $(".off30gold").slideDown('fast');
        $(".banner_place").slideDown('fast');
        $(".pop_starter_pack").slideDown('fast');
        $(".christmas_promotions").slideDown('fast');
        $(".more-gold-50-half").slideDown('fast');
        //$(".new_banners_wrapper").slideDown('fast');
        $(".sidebar-bottom-banner").slideDown('fast');
        $(".sidebar_banners_area").slideDown('fast');
        $("#mapContainer").slideDown('fast');
        $("#sidebar_missions").slideDown('fast');
        $(".promo_holder").slideDown('fast');
    }

    function hidePromo(animate) {
        if (animate == true) {
            $(".off30gold").slideUp('fast');
            $(".banner_place").slideUp('fast');
            $(".pop_starter_pack").slideUp('fast');
            $(".christmas_promotions").slideUp('fast');
            $(".more-gold-50-half").slideUp('fast');
            //$(".new_banners_wrapper").slideUp('fast');
            $(".sidebar-bottom-banner").slideUp('fast');
            $(".sidebar_banners_area").slideUp('fast');
            $("#mapContainer").slideUp('fast');
            $("#sidebar_missions").slideUp('fast');
            $(".promo_holder").slideUp('fast');
        } else {
            $(".off30gold").hide();
            $(".banner_place").hide();
            $(".pop_starter_pack").hide();
            $(".christmas_promotions").hide();
            $(".more-gold-50-half").hide();
            //$(".new_banners_wrapper").hide();
            $(".sidebar-bottom-banner").hide();
            $(".sidebar_banners_area").hide();
            $("#mapContainer").hide();
            $("#sidebar_missions").hide();
            $(".fb_like").remove();
            $(".promo_holder").remove();
        }
    }

    function showBox() {
        $("#info_box_army").slideDown('fast');
    }

    function hideBox(animate) {
        if (animate == true) {
            $("#info_box_army").slideUp('fast');
        } else {
            $("#info_box_army").hide();
        }
    }

    function showMedia() {
        var holder3 = "<span id='latest_armyk'><h1 style='clear:left' class='noborder'>Legfrissebb cikkek</h1><iframe class='media_widget' ";
        holder3 += "marginwidth=0 marginheight=0 align=middle src=http://www.gatmax.info/news.php width=450 height=280 scrolling=no frameborder=0></iframe></span>";
        if ($('#mission_reward').length) {
            $("#battle_listing").after(holder3);
        }
        $("#latest_armyk").slideDown('fast');
    }

    function hideMedia(animate) {
        if (animate == true) {
            $("#latest_armyk").slideUp('fast');
        } else {
            $("#latest_armyk").hide();
        }
    }

    function showShout() {
        var spambutton = "<div class='previous_posts' id='shout_extra' style='display: block;'><input type='hidden' id='previous_posts' name='next' value='2'><input type='hidden' name='viewFirst' id='viewFirst' value='0'><input type='hidden' value='9809' id='posts_count' name='posts_count'><a href='javascript:;' title='Older posts' class='blue_arrow_down_medium' trigger='previous_posts'><span id='citizen_older_feeds2' trigger='previous_posts'>Régi hozzászólások</span></a>";
        spambutton += "<a href='javascript:;' title='Auto shout cleaner' class='blue_arrow_down_medium'><span id='clean_button'>Tüntessed el az automata shoutokat</span></a></div>";

        if ($(".shouter").length > 0) {
            $("#citizen_older_feeds").remove();
            $(".shouter").after(spambutton);
        }

        $("#clean_button").live("click", function () {
            $("li.wall_post > div > p > em.auto_text").parent().parent().parent().remove();
        });
        
        $('.wall_post').each(function(index){
        if(!$(this).attr('hasLink')) {
        	var id = $(this).attr('id').replace('post_', '');
        	$(this).find('.post_actions')
        		.append(' <span>·</span> ')
        		.append('<a href="http://www.erepublik.com/en?viewPost=' + id + '">Link</a>');
            $(this).attr('hasLink', true);
        }
    	});
    }

    function hideShout() {
        if ($("#clean_button").length > 0) {
            $("#shout_extra").remove();
            var older_button = "<div class='previous_posts' id='citizen_older_feeds' style='display: none;'><input type='hidden' id='previous_posts' name='next' value='1'><input type='hidden' name='viewFirst' id='viewFirst' value='0'><input type='hidden' value='1024' id='posts_count' name='posts_count'><a href='javascript:;' title='Older posts' class='blue_arrow_down_medium' trigger='previous_posts'><span trigger='previous_posts'>Older posts</span></a></div>";
            $(".inner").after(older_button);
        }
    }

    function showDamage() {
        if (($('#pvp').length > 0) || ($('#achievment').length > 0) || ($('#military_group_header').length > 0) || ($('#newspaper_id').length > 0) || ($('#defender_allies').length > 0) || ($('#filters').length > 0)) {
            var sebzes_header_style = "background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;width:51px;float: left;font-size: 11px;font-weight: bold;height: 20px;line-height: 20px;opacity: 0.7;padding: 0 0px;text-shadow: 0 1px 1px #333333;margin-top: 5px;";
            var sebzes_style = "color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:65px;height:20px;font-size:11px;line-height:20px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right;margin-top: 5px;";
            var utes_header_style = "background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;width:50px;float: left;font-size: 11px;font-weight: bold;height: 20px;line-height: 20px;opacity: 0.7;padding: 0 1px;text-shadow: 0 1px 1px #333333;";
            var utes_style = "color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:65px;height:20px;font-size:11px;line-height:20px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right;";

            $("#pulse_today_header").attr("style", sebzes_header_style);
            $("#pulse_today").attr("style", sebzes_style);
            $("#pulse_today_hits_header").attr("style", utes_header_style);
            $("#pulse_today_hits").attr("style", utes_style);
            $("#today_info_link").remove();

            $("#pulse_today_1_header").attr("style", sebzes_header_style);
            $("#pulse_today_1").attr("style", sebzes_style);
            $("#pulse_today_hits_1_header").attr("style", utes_header_style);
            $("#pulse_today_hits_1").attr("style", utes_style);
            $("#today_1_info_link").remove();

            $("#pulse_today_2_header").attr("style", sebzes_header_style);
            $("#pulse_today_2").attr("style", sebzes_style);
            $("#pulse_today_hits_2_header").attr("style", utes_header_style);
            $("#pulse_today_hits_2").attr("style", utes_style);
            $("#today_2_info_link").remove();
        }
        $("#pulse_daily_damage").slideDown('fast');
    }

    function hideDamage(animate) {
        if (animate == true) {
            $("#pulse_daily_damage").slideUp('fast');
        } else {
            $("#pulse_daily_damage").hide();
        }
    }


    function showBattleOrders() {
        var holder2 = "<span id='battleorders_armyk'><h1 style='clear:left' class='noborder'>Napiparancs</h1><iframe class='media_widget' ";
        holder2 += "marginwidth=0 marginheight=0 align=middle src=http://www.gatmax.info/bolist.php width=450 scrolling=no frameborder=0></iframe></span>";

        if ($('#mission_reward').length) {
            $("#orderContainer").after(holder2);
        } else if ($('#pvp').length) {
            $("#pvp").after(holder2);
        } else if ($('.bbcode').length) {
            $(".bbcode").after(holder2);
        } else if ($('.listing resistance').length) {
            $(".listing resistance").after(holder2);
        }
        $("#battleorders_armyk").slideDown('fast');
    }

    function hideBattleOrders(animate) {
        if (animate == true) {
            $("#battleorders_armyk").slideUp('fast');
        } else {
            $("#battleorders_armyk").hide();
        }

    }

    function setPlayerData(data) {
        if (data == null || data == undefined || data == 'undefined') {
            return;
        }

        var unitId = data.unitId;
        if (unitId != null && unitId != undefined && unitId != 'undefined') {
            setArmyId(unitId);
        }

        var citizenshipId = data.citizen;
        if (citizenshipId != null && citizenshipId != undefined && citizenshipId != 'undefined') {
            setCitizenshipId(citizenshipId);
        }
    }


    function addAll() {
        if (getShowAll() == false) {
            hideAll(false);
        } else {
            showAll();
        }
    }


    function addDamage() {
        if (getShowDamage() == false) {
            hideDamage(false);
        } else {
            showDamage();
        }
    }

    function addBox() {
        if (getShowBox() == false) {
            hideBox(false);
        } else {
            showBox();
        }
    }

    function addPromo() {
        if (getShowPromo() == false) {
            hidePromo(false);
        } else {
            showPromo();
        }
    }

    function addMedia() {
        if (getShowMedia() == false) {
            hideMedia(false);
        } else {
            showMedia();
        }
    }

    function addBattleOrders() {
        if (getShowBattleOrders() == false) {
            hideBattleOrders(false);
        } else {
            showBattleOrders();
        }
    }

    function addCountryAlliance() {
        if (typeof (SERVER_DATA) != 'undefined') {
            var defenderId = SERVER_DATA.defenderId;
            var invaderId = SERVER_DATA.invaderId;
            var mustInvert = SERVER_DATA.mustInvert;

            var country_stats = getCountryStats();
            if (typeof (country_stats) != 'undefined') {
                $("#left_counter_wrap").first().before("<h4 style='position: relative; top: -14px; left: 0px; width: 75px; text-align: center; font-size: 9pt; color: #666666;'>" + country_stats["" + defenderId + ""] + "</h4>");

                $(".country.left_side").css("cursor", "pointer");
                $(".country.left_side ~ div").css("cursor", "pointer");
                $(".country.left_side").attr("onclick", "javascript:popup('http://egov4you.info/country/overview/" + defenderId + "')");

                $("#right_counter_wrap").first().before("<h4 style='position: relative; top: -14px; left: 0px; width: 75px; text-align: center; font-size: 9pt; color: #666666;'>" + country_stats["" + invaderId + ""] + "</h4>");

                $(".country.right_side").css("cursor", "pointer");
                $(".country.right_side ~ div").css("cursor", "pointer");
                $(".country.right_side").attr("onclick", "javascript:popup('http://egov4you.info/country/overview/" + invaderId + "')");
            }
        }
    }

    function addShoutWall() {
        if (getShowShout() == true) {
            showShout();
        }
    }

/*
 * QUEUE BASZÁS
 */
    var queue_on = 0;
    var retries = 0;

    function notifySendErrorRed() {
        $("#pulse_queue_length").css("color", "red");
    }

    function notifySendErrorBlack() {
        $("#pulse_queue_length").css("color", "inherit");
        setTimeout(function () {
            notifySendErrorRed();
        }, 350);
    }

    function notifySendError() {
        setTimeout(function () {
            notifySendErrorBlack();
        }, 100);
    }

    function updateQueueInfo() {

        var qlength = pulse_queue.getLength();
        $("#pulse_queue_length").text(qlength);

        if (qlength == 0) {
            queue_on = 0;
            $("#pulse_queue").css("visibility", "hidden");
            $("#queue_run").text("Send");
            $("#queue_run").css("visibility", "hidden");
            $("#pulse_queue_length").css("color", "inherit");
        } else {
            $("#pulse_queue").css("visibility", "visible");
            $("#queue_run").attr("disabled", "");
            $("#queue_run").css("visibility", "visible");
            $("#pulse_queue_length").css("color", "red");
        }
    }

    function dequeue() {
        if (retries > 4) {
            retries = 0;
            cancelQueue();
            return;
        }

        var queue_length = pulse_queue.getLength();
        if (queue_length > 0) {
            var peek = pulse_queue.dequeue();
            storageSet("pulse-queue-data", pulse_queue.sliceQueue());

            sendData(peek, false);
        } else {
            updateQueueInfo();
        }
    }

    var queue_timer = null;

    function stopDequeue() {
        if (queue_timer != null) {
            clearInterval(queue_timer);
            queue_timer = null;
        }
    }

    function startDequeue() {
        stopDequeue();

        var queue_length = pulse_queue.getLength();

        if (queue_length > 0) {
            queue_timer = setInterval(function () {
                dequeue();
            }, 5000);
        }
    }

    function toggleQueue() {
        if (queue_on) {
            stopDequeue();
            queue_on = 0;
            $("#queue_run").text("Start");
            $("#queue_run").show();
        } else {
            startDequeue();
            queue_on = 1;
            $("#queue_run").text("Stop");
            $("#queue_run").show();
        }
    }

    function cancelQueue() {
        stopDequeue();
        queue_on = 0;
        $("#queue_run").text("Start");
        $("#queue_run").show();
    }

    function reQueue(data) {
        pulse_queue.enqueue(data);
        storageSet("pulse-queue-data", pulse_queue.sliceQueue());

        updateQueueInfo();
        retries += 1;
        notifySendError();
    }

////////// QUEUE

////////////////////////////////////////////////////////////////////////////////////////
    function renderPulse(citizen_id) {
        if ($("#pulse_section_body").length > 0) {
            return false;
        }
        var citizen_id = getCitizenId();
        var army_id = storageGet("pulse-armyid");

        var pulse_section_header = "<div id='pulse_section_header'>";
        pulse_section_header += "<a id='all_show' href='javascript:;' class='f_light_blue_new'><span style='font-size: 10pt;'>Verzió: <font color='red'>" + pulse_version + "</font></span><a/>";
        pulse_section_header += "<a target='_blank' href='http://www.erepublik.com/en/newspaper/hadugyi-kozlony-177586/1' class='f_light_blue_new'><span style='color: red; font-size: 10pt;'>HK</span><a/>";
        pulse_section_header += "<a target='_blank' href='http://www.gatmax.info/?p=stat&soldier=" + citizen_id + "' class='f_light_blue_new'><span style='color: green; font-size: 10pt;'>E4H</span></a>";
        pulse_section_header += "<a id='damage_show' href='javascript:;' class='f_light_blue_new'><span style='font-size: 10pt;'>Mini infók</span><a/>";
        pulse_section_header += "</div>";

        var pulse_section_data = "<div id='pulse_section_data' >";

        pulse_section_data += "<span id='info_box_army'><iframe marginwidth=0 marginheight=0 frameborder=0 style='padding: 0px; margin-top: 0px; margin-bottom: 0px;' align=middle src='http://www.gatmax.info/bolist_unit.php?unit=" + army_id + "' width=150 height=140 scrolling=no frameborder=0></iframe></span>";

        pulse_section_data += "<a id='box_show' href='javascript:;' class='f_light_blue_new'><span style='font-size: 10pt;'>Infobox</span><a/>";
        pulse_section_data += "<a id='latest_show' href='javascript:;' class='f_light_blue_new'><span style='font-size: 10pt;'>Friss cikkek</span><a/>";
        pulse_section_data += "<a id='promo_show' href='javascript:;' class='f_light_blue_new'><span style='font-size: 10pt;'>Missziók,akciók</span><a/>";
        pulse_section_data += "<a id='shout_show' href='javascript:;' class='f_light_blue_new'><span style='font-size: 10pt;'>Shoutfal</span><a/>";
        pulse_section_data += "<a id='battleorders_show' href='javascript:;' class='f_light_blue_new'><span style='font-size: 10pt;'>Napiparancs</span><a/>";
        pulse_section_data += "</div>";

        var today = parseInt($(".eday strong").text().replace(/,/g, ""));
        var prev_day = today - 1;
        var prev2_day = prev_day - 1;

        var today_info = "<div id='today_info' style='clear: both; margin-bottom: 3px; margin-top: 3px;'>";
        today_info += "<a id='today_info_link' target='_blank' href='http://www.gatmax.info/?p=stat&soldier=" + citizen_id + "&day=" + today + "' style='font-size: 10pt; color: red; float: left; padding:5px 5px;'>" + today + "</a>";
        today_info += "<small id='pulse_today_header' style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Sebzés: </small>";
        today_info += "<div id='pulse_today' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:65px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + "" + "</div>";
        today_info += "<small id='pulse_today_hits_header' style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Ütések: </small>";
        today_info += "<div id='pulse_today_hits' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:25px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + "" + "</div>";
        today_info += "</div>";

        var today_1_info = "<div id='today_1_info' style='clear: both; margin-bottom: 3px; margin-top: 3px;'>";
        today_1_info += "<a id='today_1_info_link' target='_blank' href='http://www.gatmax.info/?p=stat&soldier=" + citizen_id + "&day=" + prev_day + "' style='font-size: 10pt; color: red; float: left; padding:5px 5px;'>" + prev_day + "</a>";
        today_1_info += "<small id ='pulse_today_1_header' style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Sebzés: </small>";
        today_1_info += "<div id='pulse_today_1' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:65px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + "" + "</div>";
        today_1_info += "<small id='pulse_today_hits_1_header' style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Ütések: </small>";
        today_1_info += "<div id='pulse_today_hits_1' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:25px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + "" + "</div>";
        today_1_info += "</div>";

        var today_2_info = "<div id='today_2_info' style='clear: both; margin-bottom: 3px; margin-top: 3px;'>";
        today_2_info += "<a id='today_2_info_link' target='_blank' href='http://www.gatmax.info/?p=stat&soldier=" + citizen_id + "&day=" + prev2_day + "' style='font-size: 10pt; color: red; float: left; padding:5px 5px;'>" + prev2_day + "</a>";
        today_2_info += "<small id='pulse_today_2_header' style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Sebzés: </small>";
        today_2_info += "<div id='pulse_today_2' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:65px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + "" + "</div>";
        today_2_info += "<small id='pulse_today_hits_2_header' style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Ütések: </small>";
        today_2_info += "<div id='pulse_today_hits_2' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:25px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + "" + "</div>";
        today_2_info += "</div>";

        var daily_damage_section = "<div style='margin-left: 6px; margin-right: 6px;' id='pulse_daily_damage'>";
        daily_damage_section += "<div>" + today_info + "</div>";
        daily_damage_section += "<div>" + today_1_info + "</div>";
        daily_damage_section += "<div>" + today_2_info + "</div>";
        daily_damage_section += "</div>";

        $("#all_show").live("click", function () {
            if (getShowAll() == false) {
                setShowAll(true);
                showAll();
            } else {
                setShowAll(false);
                hideAll(true);
            }
        });

        $("#box_show").live("click", function () {
            if (getShowBox() == false) {
                setShowBox(true);
                showBox();
            } else {
                setShowBox(false);
                hideBox(true);
            }
        });


        $("#damage_show").live("click", function () {
            if (getShowDamage() == false) {
                setShowDamage(true);
                showDamage();
            } else {
                setShowDamage(false);
                hideDamage(true);
            }
        });


        $("#promo_show").live("click", function () {
            if (getShowPromo() == false) {
                setShowPromo(true);
                showPromo();
            } else {
                setShowPromo(false);
                hidePromo(true);
            }
        });

        $("#latest_show").live("click", function () {
            if (getShowMedia() == false) {
                setShowMedia(true);
                showMedia();
            } else {
                setShowMedia(false);
                hideMedia(true);
            }
        });

        $("#shout_show").live("click", function () {
            if (getShowShout() == false) {
                setShowShout(true);
                showShout();
            } else {
                setShowShout(false);
                hideShout();
            }
        });


        $("#battleorders_show").live("click", function () {
            if (getShowBattleOrders() == false) {
                setShowBattleOrders(true);
                showBattleOrders();
            } else {
                setShowBattleOrders(false);
                hideBattleOrders(true);
            }
        });

/*
 * QUEUE baszÃ¡s
 */
        var queue_info = "<div id='pulse_queue' title='Az elküldetlen killek száma. Nyomd meg a \"Start\" gombot, és elküldi egyesével a szervernek.' style='display: block;'>";
        queue_info += "<div style='float: left;'>Puffer hossz:&nbsp;</div><div id='pulse_queue_length' style='float: left;'></div>";
        queue_info += "</div><a id='queue_run' class='f_light_blue_new' href='javascript:;' style='float: right;'>Start<a/>";

        $("#queue_run").live("click", function () {
            $("#queue_run").hide();
            setTimeout(function () {
                toggleQueue();
            }, 500);
        });
////////// QUEUE

        var pulse_section = "<div class='pulse_section user_section' id='pulse_section_body'>";
        pulse_section += pulse_section_header + pulse_section_data + daily_damage_section + queue_info +"</div>";

        if ($("#battle_listing").length > 0) {
            $("#battle_listing").after(pulse_section);
        } else {
            $(".award_pop_up").after(pulse_section);
        }


        $(".pulse_section").attr("style", "height: auto; margin-top: 11px; background-color: #FDFDFD;background-image: url('/images/modules/citizenprofile/activitybg.png?1305798401');background-position: center top;background-repeat: repeat-x;border: 1px solid #F0F0F0;margin-top: 10px;padding-bottom: 1px;color: #4D4D4D;display: inline;float: left;padding: 1;");

        try {
            renderWeaponDamage();
        } catch (err) {}

        try {
            renderPulseButton(citizen_id);
        } catch (err) {}

        try {
            addAll();
            addDamage();
            addBox();
            addPromo();
            addMedia();
            addCountryAlliance();
            addBattleOrders();
            addShoutWall();
        } catch (err) {}

        $("div.user_notify > a[href*=jobs]").css("bottom", "-350px");

        $("#queue_run").show();
        updateQueueInfo();

        return true;
    }

    ////////////////////////////////////

    function renderPulseButton(citizen_id) {
        var link_pulse_button = "http://www.egov4you.info/citizen/overview/";
        var title_pulse_button = "View your fight stats";
        var img_pulse_button = "http://img231.imageshack.us/img231/7091/pulsebutton80white65.png";
        $("#pvp").append(pulse_button);
        var go_enemy_defeated_visible = $(".go_enemy_defeated").is(":visible");
        if (go_enemy_defeated_visible) {
            $(".pulse_button").attr("style", "background-image: url('" + img_pulse_button + "');background-position: 0 0;background-repeat: no-repeat;bottom: 7px;display: block;height: 46px;position: absolute;right: 85px;text-indent: -9999px;width: 45px;");
        } else {
            $(".pulse_button").attr("style", "background-image: url('" + img_pulse_button + "');background-position: 0 0;background-repeat: no-repeat;bottom: 7px;display: block;height: 46px;position: absolute;right: 47px;text-indent: -9999px;width: 45px;");
        }
    }

    function renderWeaponDamage() {
        var strength = $("#fighter_skill").text();
        if (strength == undefined && strength == null && strength == "") {
            return;
        }
        strength = parseInt(strength.replace(",", ""));

        var rank_points = $("#rank_min").text().split(" ")[0];
        rank_points = parseInt(rank_points.replace(/,/g, ""));

        if (rank_points == undefined && rank_points == null && rank_points == "") {
            return;
        }

        var weaponId = getWeaponId();
        var wdamage = getInfluenceByWeapon(rank_points, strength, weaponId);
        var wmaxdamage = getInfluenceByWeapon(rank_points, strength, 7);

        if ($(".wdurability").length > 0) {
            if ($("#wdamage").length == 0) {
                var html = "<p id='wdamage'>Damage<strong id='wdamagevalue'></strong></p>";
                $(".wdurability").append(html);
            }

            $("#wdamagevalue").text(wdamage);
        }

        if ($("#pvp_battle_area").length > 0) {
            if ($("#player_influence2").length == 0) {
                var html = "<table width='100%' style='margin: 0 auto -25px;position: relative;top: 130px;left: -264px;width: auto;'><tbody><tr><td>";
                html += "<div id='player_influence2' style='cursor: default;display: block;height: 25px;width: auto;' original-title='This is the influence you make with 1 hit with current weapon (it does NOT include natural enemy bonus)'>";
                html += "<small style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Damage</small>";
                html += "<strong id='player_influence2_val' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:35px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + wdamage + "</strong></div></td></tr></tbody></table>";
                $("#pvp_battle_area").append(html);
            }

            $("#player_influence2_val").text(wdamage);

            if ($("#player_influence").length == 0) {
                var html = "<table width='100%' style='margin: 0 auto -25px;position: relative;top: 130px;left: -157px;width: auto;'><tbody><tr><td>";
                html += "<div id='player_influence' style='cursor: default;display: block;height: 25px;width: auto;' original-title='This is the maximum influence you can make with 1 hit using a Q7 weapon (it does NOT include natural enemy bonus)'>";
                html += "<small style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Max-hit</small>";
                html += "<strong id='player_influence_val' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:35px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + wmaxdamage + "</strong></div></td></tr></tbody></table>";
                $("#pvp_battle_area").append(html);
            }

            $("#player_influence_val").text(wmaxdamage);
        }
    }

    function renderProfileInfluenceHinter(id, title, percent, damage, level) {
        var html = "<ul class='achiev'><div id='hinter_" + id + "' class='hinter' style='top: 15px;'><span><p class='padded' style='width: 100%; clear: both; height: 55px;'><img style='float: left;' id='hinter_img_" + id + "' src='' /><strong style=''>" + title + "</strong></p><p>" + percent + "% bonus" + "<br />" + damage + " damage</p></span></div></ul>";

        $("." + id).first().after(html);

        if (level > 0) {
            var img = "http://www.erepublik.com/images/icons/industry/2/q" + level + ".png";
            $("." + id).parents(".stat").find("#hinter_img_" + id).attr("src", img);
        }

        $("." + id).parents(".stat").find("#hinter_" + id).hide();
        $("." + id).hover(function () {
            var base = $(this).parent().offset().left + 15;
            $(this).parents(".stat").find("#hinter_" + id).css("left", ($(this).offset().left - base) + "px");

            $(this).parents(".stat").find("#hinter_" + id).show();
        }, function () {
            $(this).parents(".stat").find("#hinter_" + id).hide();
        });
    }

    function GetDivision(a) {
        if (a < 25) return 1;
        if (a < 30) return 2;
        if (a < 37) return 3;
        return 4
    }

    function renderProfileInfluence() {

        var divxp = parseInt($("#content .citizen_experience .citizen_level").text());
        var divimg = "<img src='http://gatmax.info/img/div/" + GetDivision(divxp) + ".png'  width=30 height=30  border=0 alt='Divizio'>";
        $("#content .citizen_presence").after(divimg);
        var citizen_content = $(".citizen_content");
        if (citizen_content.length == 0) {
            return;
        }

        var arr_citizen_military = $(citizen_content).first().find(".citizen_military");
        if (arr_citizen_military.length < 2) {
            return;
        }

        var html = "<div class='citizen_military'><strong>Influence</strong>";

        html += "<div style='margin-top:5px; width: 405px;' class='stat'><div style='width: 100%;'>";
        html += "<div class='left infq0' style='width: 29%; padding-left: 0px;'><small style='width: auto;'>Q0</small></div>";
        html += "<div class='left infq1' style='width: 7%; margin-left: -2px;'><small style='width: 50%;'>Q1</small></div>";
        html += "<div class='left infq2' style='width: 7%; margin-left: -1px;'><small style='width: 50%;'>Q2</small></div>";
        html += "<div class='left infq3' style='width: 7%'><small style='width: 50%;'>Q3</small></div>";
        html += "<div class='left infq4' style='width: 7%'><small style='width: 50%;'>Q4</small></div>";
        html += "<div class='left infq5' style='width: 7%; margin-left: -2px;'><small style='width: 50%;'>Q5</small></div>";
        html += "<div class='left infq6' style='width: 7%; margin-left: -1px;'><small style='width: 50%;'>Q6</small></div>";
        html += "<div class='left infq7' style='width: 29%;'><small style='width: auto; text-align: right;'>Q7</small></div>";
        html += "</div>";

        html += "<table border='0' width='100%' class='barholder'><tbody><tr><td>";
        html += "<div class='bar damage' style='width: 395px;'>";
        html += "<div class='border'>";
        html += "<span class='lefts'></span><span class='mids' style='width: 96%;'></span><span class='rights'></span>";
        html += "</div>"; // BORDER
        html += "<div class='fill'>";
        html += "<span class='lefts'></span><span style='width: 29%;' class='mids infq0'></span><span class='rights'></span>";
        for (i = 0; i < 6; i++) {
            if (i % 2 == 0) {
                html += "<span class='lefts'></span><span class='mids infq" + (i + 1) + "' style='width: 7%; background-color: #77B5D2; background-image: -webkit-linear-gradient(center bottom, #A0CBE0 0%, #77B5D2 100%); background-image: -webkit-gradient(linear, left bottom, left top, color-stop(1, #A0CBE0), color-stop(0, #77B5D2)); background-image: -moz-linear-gradient(center top , #A0CBE0 0%, #77B5D2 100%) !important; border-color: #4092B8;'></span><span class='rights'></span>";
            } else {
                html += "<span class='lefts'></span><span class='mids infq" + (i + 1) + "' style='width: 7%;'></span><span class='rights'></span>";
            }
        }
        html += "<span class='lefts'></span><span class='mids infq7' style='width: 29%; background-color: #77B5D2; background-image: -webkit-linear-gradient(center bottom, #A0CBE0 0%, #77B5D2 100%); background-image: -webkit-gradient(linear, left bottom, left top, color-stop(1, #A0CBE0), color-stop(0, #77B5D2)); background-image: -moz-linear-gradient(center top , #A0CBE0 0%, #77B5D2 100%) !important; border-color: #4092B8;'></span><span class='rights'></span>";

        html += "</div>"; // FILL
        html += "</div>";
        html += "</td></tr></tbody></table>";
        html += "<small style='float: left; white-space: nowrap;'><strong id='citizen_military_base_hit' style='left: 0px; margin-left: 0px;'>-</strong></small>";
        html += "<small style='width: 392px; white-space: nowrap;'><strong id='citizen_military_max_hit'>-</strong></small>";
        html += "</div>"; // STAT
        html += "</div>"; // citizen_military


        $(arr_citizen_military[1]).after(html);
        $(arr_citizen_military[1]).css("margin-bottom", "2px");

        var strength = replaceAll($(arr_citizen_military[0]).first().find("h4").text(), ",", "");
        strength = replaceAll(strength, " ", "");
        var rank_points = replaceAll($(arr_citizen_military[1]).first().find(".stat").first().find("strong").text(), ",", "");
        rank_points = rank_points.split("/")[0];
        rank_points = replaceAll(rank_points, " ", "");

        var inf_q0 = getInfluenceByWeapon(rank_points, strength, 0);
        var inf_q1 = getInfluenceByWeapon(rank_points, strength, 1);
        var inf_q2 = getInfluenceByWeapon(rank_points, strength, 2);
        var inf_q3 = getInfluenceByWeapon(rank_points, strength, 3);
        var inf_q4 = getInfluenceByWeapon(rank_points, strength, 4);
        var inf_q5 = getInfluenceByWeapon(rank_points, strength, 5);
        var inf_q6 = getInfluenceByWeapon(rank_points, strength, 6);
        var inf_q7 = getInfluenceByWeapon(rank_points, strength, 7);

        $("#citizen_military_base_hit").text("Base hit: " + inf_q0);
        $("#citizen_military_max_hit").text("Max-hit: " + inf_q7);

        renderProfileInfluenceHinter("infq0", "No weapon", "0", inf_q0, 0);
        renderProfileInfluenceHinter("infq1", "Q1 weapon", "20", inf_q1, 1);
        renderProfileInfluenceHinter("infq2", "Q2 weapon", "40", inf_q2, 2);
        renderProfileInfluenceHinter("infq3", "Q3 weapon", "60", inf_q3, 3);
        renderProfileInfluenceHinter("infq4", "Q4 weapon", "80", inf_q4, 4);
        renderProfileInfluenceHinter("infq5", "Q5 weapon", "100", inf_q5, 5);
        renderProfileInfluenceHinter("infq6", "Q6 weapon", "120", inf_q6, 6);
        renderProfileInfluenceHinter("infq7", "Q7 weapon", "200", inf_q7, 7);
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    function getToday(day) {
        var today = storageGet("pulse-" + day);
        if (today == null || today == undefined || today == "undefined") {
            return 0;
        }

        return today;
    }

    function getTodayHits(day) {
        var today = storageGet("pulse-hits-" + day);
        if (today == null || today == undefined || today == "undefined") {
            return 0;
        }

        return today;
    }

    function addToday(day, influence) {
        var today = storageGet("pulse-" + day);
        if (today == null || today == undefined || today == "undefined") {
            today = 0;
        }
        today += influence;
        storageSet("pulse-" + day, today);
    }

    function addTodayHits(day, hits) {
        var today = storageGet("pulse-hits-" + day);
        if (today == null || today == undefined || today == "undefined") {
            today = 0;
        }
        today += hits;
        storageSet("pulse-hits-" + day, today);
    }

    function getCountryStats() {
        var cstats = storageGet("pulse-countrystats");
        if (cstats == null || cstats == undefined || cstats == "undefined") {
            return null;
        }

        return cstats;
    }

    function setCountryStats(cstats) {
        if (cstats == null || cstats == undefined || cstats == "undefined") {
            return;
        }

        storageSet("pulse-countrystats", cstats);
    }


    function setShowBattleOrders(b) {
        if (b == null || b == undefined || b == "undefined") {
            return;
        }

        storageSet("pulse-battleorders-show", b);
    }

    function getShowBattleOrders() {
        var b = storageGet("pulse-battleorders-show");
        if (b == null || b == undefined || b == "undefined") {
            return true;
        }

        return b;
    }

    function setShowAll(b) {
        if (b == null || b == undefined || b == "undefined") {
            return;
        }

        storageSet("pulse-box-all", b);
    }

    function getShowAll() {
        var b = storageGet("pulse-box-all");
        if (b == null || b == undefined || b == "undefined") {
            return false;
        }

        return b;
    }


    function setShowBox(b) {
        if (b == null || b == undefined || b == "undefined") {
            return;
        }

        storageSet("pulse-box-show", b);
    }

    function getShowBox() {
        var b = storageGet("pulse-box-show");
        if (b == null || b == undefined || b == "undefined") {
            return false;
        }

        return b;
    }

    function setShowDamage(b) {
        if (b == null || b == undefined || b == "undefined") {
            return;
        }

        storageSet("pulse-damage-show", b);
    }

    function getShowDamage() {
        var b = storageGet("pulse-damage-show");
        if (b == null || b == undefined || b == "undefined") {
            return false;
        }

        return b;
    }


    function setShowPromo(b) {
        if (b == null || b == undefined || b == "undefined") {
            return;
        }

        storageSet("pulse-promo-show", b);
    }

    function getShowPromo() {
        var b = storageGet("pulse-promo-show");
        if (b == null || b == undefined || b == "undefined") {
            return false;
        }

        return b;
    }

    function setShowMedia(b) {
        if (b == null || b == undefined || b == "undefined") {
            return;
        }
        storageSet("pulse-latest-show", b);
    }

    function getShowMedia() {
        var b = storageGet("pulse-latest-show");
        if (b == null || b == undefined || b == "undefined") {
            return false;
        }

        return b;
    }

    function setShowShout(b) {
        if (b == null || b == undefined || b == "undefined") {
            return;
        }
        storageSet("pulse-shout-show", b);
    }

    function getShowShout() {
        var b = storageGet("pulse-shout-show");
        if (b == null || b == undefined || b == "undefined") {
            return false;
        }

        return b;
    }

    function setArmyData(data) {

        if (data == null || data == undefined || data == "undefined") {
            return;
        }

        storageSet("pulse-armydata", data);
    }

    function getArmyData() {
        var data = storageGet("pulse-armydata");
        if (data == null || data == undefined || data == "undefined") {
            return "";
        }

        return data;
    }

    function setArmyId(data) {

        if (data == null || data == undefined || data == "undefined") {
            return;
        }

        storageSet("pulse-armyid", data);
    }

    function getArmyId() {
        var data = storageGet("pulse-armyid");
        if (data == null || data == undefined || data == "undefined") {
            return -1;
        }

        return data;
    }

    function setCitizenshipId(data) {

        if (data == null || data == undefined || data == "undefined") {
            return;
        }

        storageSet("pulse-citizenshipid", data);
    }

    function getCitizenshipId() {
        var data = storageGet("pulse-citizenshipid");
        if (data == null || data == undefined || data == "undefined") {
            return -1;
        }

        return data;
    }

    function setUpdateDate(data) {

        if (data == null || data == undefined || data == "undefined") {
            return;
        }

        storageSet("pulse-updatedate", data);
    }

    function getUpdateDate() {
        var data = storageGet("pulse-updatedate");
        if (data == null || data == undefined || data == "undefined") {
            return null;
        }

        return data;
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    function updateTodayOffsetInfo(offset) {
        var eday = $(".eday strong").text();

        var newday = parseInt(eday.replace(",", "")) - offset;

        $("#pulse_today_" + offset).text(getToday(addCommas(newday)));
        $("#pulse_today_hits_" + offset).text(getTodayHits(addCommas(newday)));
    }


    function updateTodayInfo() {
        var eday = $(".eday strong").text();
        $("#pulse_today").text(getToday(eday));
        $("#pulse_today_hits").text(getTodayHits(eday));
    }

    var sent_query_data;

    function sendData(query_data) {
        var url = "http://gatmax.sinkovicz.hu/pulse.php";

        sent_query_data = query_data;

        $.ajax({
            type: 'POST',
            url: url,
            cache: false,
            data: sent_query_data,
            timeout: 5000,
            success: function (data) {
//////////////////////////////////////////////
//unsafeWindow.console.log("SERVER SENT: >"+data+"<");
//////////////////////////////////////////////
                if (data == 'OK') {
                    updateQueueInfo();
                    retries = 0;
                } else if (data == 'STOP') {
                    updateQueueInfo();
                    retries = 0;
                    cancelQueue();
                } else {
                    reQueue(sent_query_data);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                reQueue(sent_query_data);
            }
        });
    }

    ///////////////////////////////////////////////////////////////////////////////

    function getDOMArmyId() {
        try {
            var groupId = $("#groupId");
            if (groupId.length > 0) {
                var value = $("#groupId").first().val();
                return value;
            }
        } catch (err) {}

        return -1;
    }

    function getDOMArmyData() {
        try {
            var oc = $("#orderContainer");
            if (oc.length > 0) {
                var link = $(oc).first().find("a").first();
                var linkParts = $(link).attr("href").trim().split("/");
                var dod = linkParts[linkParts.length - 1];

                var groupId = getDOMArmyId();
                var eday = $(".eday strong").text();
                eday = eday.replace(",", "");
                var livetime = $("#live_time").text();

                var value = groupId + "-" + dod + "-" + eday + " " + livetime.replace(":", "_");
                setArmyData(value);

                return value;
            }
        } catch (err) {}

        return "";
    }

    function getDOMCitizenshipId() {
        try {
            var menu4 = $("#menu4").first().find("ul").first().find("li");
            if (menu4.length >= 4) {
                var link = $(menu4[3]).find("a").first();
                var linkParts = $(link).attr("href").trim().split("/");
                var value = linkParts[linkParts.length - 1];
                return value;
            }
        } catch (err) {}

        return -1;
    }

    function getWeaponId() {
        try {
            var value = unsafeWindow.currentWeaponId;
            return value;
        } catch (err) {}

        return -1;
    }

    ///////////////////////////////////////////////////////////////////////////////

    function setGroupId() {
        var groupId = $("#groupId");
        if (groupId.length > 0) {
            var value = $("#groupId").first().val();
            setArmyId(value);
        }
    }

    function getGroupId() {
        var groupId = -1;
        try {
            groupId = getArmyId();
        } catch (err) {}

        return groupId;
    }

    ///////////////////////////////////////////////////////////////////////////////

    function getAttackerRounds() {
        return $("#left_campaign_points > strong").text();
    }

    function getDefenderRounds() {
        return $("#right_campaign_points > strong").text();
    }

    function enableFightButton() {

        var mode = 2;
        if (mode == 1) {
            $("#pvp_actions .action_holder").removeClass("disabled");
            $(".fight_btn").css("color", "#33aa33");
            $(".fight_btn").css("text-shadow", "#cccccc 2px 2px 2px");
        } else if (mode == 2) {
            $("#pvp_actions .action_holder").removeClass("disabled");
            $('.fight_btn').css('color', '');
            $('.fight_btn').css('text-shadow', '');
        } else {
            $('#pvp_actions .action_holder').removeClass('disabled');
            $('.fight_btn').css('color', '');
            $('.fight_btn').css('text-shadow', '');
        }
    }


    function disableFightButton() {
        var mode = 2;
        if (mode == 1) {
            $('#pvp_actions .action_holder').removeClass('disabled');
            $('.fight_btn').css('color', '#cc3333');
            $('.fight_btn').css('text-shadow', '#aaaaaa 2px 2px 2px');
        } else if (mode == 2) {
            $('#pvp_actions .action_holder').addClass('disabled');
            $('.fight_btn').css('color', 'inherit');
            $('.fight_btn').css('text-shadow', 'inherit');
        } else {
            $('#pvp_actions .action_holder').removeClass('disabled');
            $('.fight_btn').css('color', 'inherit');
            $('.fight_btn').css('text-shadow', 'inherit');
        }
    }



    function addEgovLinks() {
        var groupimg = "http://www.gatmax.info/img/egov_icon.png";
        var medalimg = "http://www.gatmax.info/img/medal_icon.png";
        var okmimg = "http://www.gatmax.info/img/okm.jpg";
        var obj_activity = $(".citizen_sidebar .citizen_activity").first();
        if (obj_activity != undefined && obj_activity != null && obj_activity != 'undefined') {

            var arr_places = obj_activity.find(".place");
            if (arr_places.length > 1) {
                var place = $(arr_places[1]).find(".one_newspaper").first();

                var link = place.find("a").first();
                var linkParts = $(link).attr("href").trim().split("/");

                var groupId = linkParts[linkParts.length - 1];
                var grouplink = "http://egov4you.info/unit/overview/" + groupId;

                var srcCitizenId = $(".action_message").attr("href").trim();
                var srcCitizenIdlinkParts = srcCitizenId.trim().split("/");
                var PCitizenId = srcCitizenIdlinkParts[srcCitizenIdlinkParts.length - 1];

                var citienlink = "http://egov4you.info/citizen/history/" + PCitizenId;
                var citienlink2 = "http://battle-watcher.com/medals/citizen/" + PCitizenId;
                var citienlink3 = "http://www.gatmax.info/?p=stat&soldier=" + PCitizenId;

                var html = "<div style='margin-top: 4px; margin-bottom: 0px; height: 16px; padding-bottom: 1px; padding-top: 1px; width: 141px; border-top: 1px dotted #dddddd;'>";
                html += "<a title='Open army stats in egov4you' style='padding: 0px; margin: 0px; width: 141px;' href='" + grouplink + "' target='blank'>";
                html += "<img style='margin-top: 4px; border: 0px;' width='16' height='16' src='" + groupimg + "' />";
                html += "<span style='margin-top: -2px;'>E4Y MU STAT</span>";
                html += "</a>";
                html += "</div>";
                html += "<div style='margin-top: 4px; margin-bottom: 0px; height: 16px; padding-bottom: 1px; padding-top: 1px; width: 141px; border-top: 1px dotted #dddddd;'>";
                html += "<a title='Open citizen stats in BattleWacher' style='padding: 0px; margin: 0px; width: 141px;' href='" + citienlink2 + "' target='blank'>";
                html += "<img style='margin-top: 4px; border: 0px;' width='16' height='16' src='" + medalimg + "' />";
                html += "<span style='margin-top: -2px;'>Med&aacute;l figyel&otilde;</span>";
                html += "</a>";
                html += "</div>";
                html += "<div style='margin-top: 4px; margin-bottom: 0px; height: 16px; padding-bottom: 1px; padding-top: 1px; width: 141px; border-top: 1px dotted #dddddd;'>";
                html += "<a title='Magyar Osszesitoi adatok' style='padding: 0px; margin: 0px; width: 141px;' href='" + citienlink3 + "' target='blank'>";
                html += "<img style='margin-top: 4px; border: 0px;' width='16' height='16' src='" + okmimg + "' />";
                html += "<span style='margin-top: -2px;'>E4H adatok</span>";
                html += "</a>";
                html += "</div></div>";
                place.append(html);
            }
        }
    }


    function goToProfile() {
        document.location = "http://www.erepublik.com" + $(".user_info a:first").attr('href');
    }

    /******************************************************************/
    /******************************************************************/

    function main2() {

        $.ajaxSetup({
            global: true,
            cache: false
        });

        try {
            queryCountryStats();
        } catch (err) {}

        var citizenId = 0;
        if (typeof (SERVER_DATA) != 'undefined') {
            citizenId = SERVER_DATA.citizenId;
        } else {}

        var ploaded = renderPulse(citizenId);
        if (ploaded == false) {
            return;
        }

        try {
            var groupId = getArmyId();
            if (groupId == -1) {
                groupId = getDOMArmyId();
                setArmyId(groupId);
            } else {}
        } catch (err) {}

        try {
            getDOMArmyData();
        } catch (err) {}

        try {
            var citizenshipId = getCitizenshipId();
            if (citizenshipId == -1) {
                citizenshipId = getDOMCitizenshipId();
                setCitizenshipId(citizenshipId);
            } else {}
        } catch (err) {}

        try {
            addEgovLinks();
        } catch (err) {}

        try {
            renderProfileInfluence();
        } catch (err) {}



        //////////////////////////////////

        var ajax_timeout = null;

        $j(document).ajaxSuccess(function (e, xhr, settings) {
            if ((settings.url.match(/military\/fight-shoot$/) != null) ||
                (settings.url.match(/military\/fight-shoot/) != null) ||
                (settings.url.match(/military\/fight-shooot/) != null) ||
                (settings.url.match(/military\/deploy-bomb/) != null)) {

                var battleId = -1;
                var instantKill = -1;

                var citizenName = "";
                try {
                    citizenName = escape($(".user_avatar").attr("title"));
                } catch (err) {}
                var defenderId = SERVER_DATA.defenderId;
                var invaderId = SERVER_DATA.invaderId;
                var isResistance = SERVER_DATA.isResistance;
                var mustInvert = SERVER_DATA.mustInvert;

                try {
                    var citizenshipId = getCitizenshipId();
                    var groupId = getArmyId();
                } catch (err) {}

                if (settings.data != null) {
                    var queryStringData = new Array();
                    var pairs = settings.data.split("&");
                    for (p in pairs) {
                        var keyval = pairs[p].split("=");
                        queryStringData[keyval[0]] = keyval[1];
                    }

                    battleId = queryStringData["battleId"];
                    battleId = battleId.replace(/[^0-9]/g, '');
                    instantKill = queryStringData["instantKill"];
                    if (instantKill == null) {
                        instantKill = 0;
                    }
                }

                var responseText = xhr.responseText;
                var jresp = JSON.parse(responseText);
                var message = jresp.message;
                var error = jresp.error;

                if (!error && (message == "ENEMY_KILLED" || message == "OK")) {
                    var countdown = $("#battle_countdown").text();
                    var livetime = $("#live_time").text();
                    var eday = $(".eday strong").text();

                    var rank = 0;
                    var level = 0;
                    var exp = 0;
                    var wellness = 0;

                    var countWeapons = 0;
                    var skill = 0;
                    var weaponDamage = 0;
                    var weaponDurability = 0;
                    var givenDamage = 0;
                    var earnedXp = 0;
                    var enemyName = "";
                    var enemyIsNatural = 0;

                    if ((settings.url.match(/military\/deploy-bomb/) != null)) {
                        weaponDamage = jresp.bomb.booster_id;
                        givenDamage = jresp.bomb.damage;
                    } else {
                        storageSet("pulse-lastJresp", responseText);
                        rank = jresp.rank.points;
                        level = jresp.details.level;
                        exp = jresp.details.points;
                        wellness = jresp.details.wellness;

                        countWeapons = jresp.user.countWeapons;
                        skill = jresp.user.skill;
                        weaponDamage = jresp.user.weaponDamage;
                        weaponDurability = jresp.user.weaponDurability;
                        givenDamage = jresp.user.givenDamage;
                        earnedXp = jresp.user.earnedXp;

                        try {
                            enemyName = escape(jresp.oldEnemy.name);
                        } catch (err) {}

                        if (jresp.oldEnemy.isNatural == true)
                            enemyIsNatural = 1;
                    }

                    var domination = $("#blue_domination").text();
                    if (domination != null && domination != undefined && domination != 'undefined')
                        domination = domination.replace("%", "");

                    var att_points = SERVER_DATA.points.attacker;
                    var def_points = SERVER_DATA.points.defender;
                    var round = SERVER_DATA.zoneId;

                    var regionName = "";
                    try {
                        regionName = escape($("#pvp_header h2").text());
                    } catch (err) {}

                    var att_rounds = getAttackerRounds();
                    var def_rounds = getDefenderRounds();

                    var timestamp = new Date().getTime();
                    var armydata = getArmyData();

                    if (enemyName == null) {
                        enemyName = "none";
                    }
                    if (weaponDurability == null) {
                        weaponDurability = 1;
                    }
                    if (givenDamage == 10000) {
                        weaponDamage = 10000;
                    }
                    if (givenDamage == 50000) {
                        weaponDamage = 50000;
                    }
                    //if (earnedXp = null) { enemyName = "0"; }
                    if (exp == null) {
                        exp = "0";
                    }

                    var query = "";
                    query += "citizenId=" + citizenId + "&battleId=" + battleId + "&defenderId=" + defenderId + "&invaderId=" + invaderId;
                    query += "&citizenName=" + citizenName;

                    query += "&natId=" + citizenshipId + "&groupId=" + groupId;
                    query += "&regionName=" + regionName + "&mustInvert=" + mustInvert + "&isResistance=" + isResistance;
                    query += "&instantKill=" + instantKill + "&givenDamage=" + givenDamage + "&earnedXp=" + earnedXp;
                    query += "&weaponDamage=" + weaponDamage + "&weaponDurability=" + weaponDurability;
                    query += "&skill=" + skill;
                    query += "&rank=" + rank + "&level=" + level + "&exp=" + exp + "&wellness=" + wellness;
                    query += "&enemyName=" + enemyName + "&enemyIsNatural=" + enemyIsNatural;
                    query += "&countdown=" + countdown + "&livetime=" + livetime + "&eday=" + eday;
                    query += "&domination=" + domination + "&attPoints=" + att_points + "&defPoints=" + def_points;
                    query += "&round=" + round + "&attRounds=" + att_rounds + "&defRounds=" + def_rounds;
                    query += "&version=" + pulse_version;
                    query += "&ts=" + timestamp;
                    query += "&DOarmyID=" + DO_armyID;
                    query += "&DOBattleID=" + DO_BattleID;
                    query += "&DOCountry=" + DO_Country;
                    query += "&DORegion=" + DO_Region;

//////////////////////////////////////////////
//unsafeWindow.console.log("query = " + query);
//////////////////////////////////////////////

                    sendData(query);
                    var totalGivenDamage = givenDamage;
                    if (enemyIsNatural)
                        totalGivenDamage += Math.floor(givenDamage * 0.1);
                    try {
                        addToday(eday, totalGivenDamage);
                        addTodayHits(eday, earnedXp);
                        updateTodayInfo();
                    } catch (err) {}
                }

            } else if (settings.url.match(/military\/change-weapon/) != null) {

                try {
                    renderWeaponDamage();
                } catch (e) {}
            }

            if (ajax_timeout != null) {
                clearInterval(ajax_timeout);
                ajax_timeout = null;
            }

            enableFightButton();

            ajax_timeout = setTimeout(function () {
                disableFightButton();
            }, 30000);

        });

        function saveData() {
			var ts = new Date().getTime();;

            if ((saveDataTime != null) && (ts < saveDataTime + 3000)) {
                return;
            }
            saveDataTime = ts;

			var domination = "";
            var regionName = "";
            var countdown = "00:00";
            var att_rounds = 0;
            var def_rounds = 0;

            try {
                domination = $("#blue_domination").text();
            } catch (err) {}

            if (domination != null && domination != undefined && domination != 'undefined') {
                domination = domination.replace("%", "");
            }

            try {
                regionName = escape($("#pvp_header h2").text());
            } catch (err) {}

            try {
                countdown = $("#battle_countdown").text();
            } catch (err) {}

            try {
                att_rounds = getAttackerRounds();
            } catch (err) {}

            try {
                def_rounds = getDefenderRounds();
            } catch (err) {}

            var saveObj = {
                domination: domination,
                region: regionName,
                countdown: countdown,
                attRounds: att_rounds,
                defRounds: def_rounds,
                sdata: SERVER_DATA };

            storageSet("pulse-saveData", saveObj);
//////////////////////////////////////////////
//unsafeWindow.console.log("saved data: " +saveDataTime);
//////////////////////////////////////////////
        }

        function sendPVPData() {
/////////// Ezek a vÃ¡ltozÃ³k Ã­gy maradnak
            var instantKill = 0;
            var countWeapons = 0;
            var weaponDamage = 99999;
            var weaponDurability = 0;
            var earnedXp = 0;
            var enemyIsNatural = 0;


/////////// Mentett vÃ¡ltozÃ³k
            // az utolsÃ³ Ã¼tÃ©s mentett responseTextjÃ©bÅ‘l
            var jresp = storageGet("pulse-lastJresp");
			if (jresp) {
                var rank = jresp.rank.points;
                var level = jresp.details.level;
                var exp = jresp.details.points;
                var wellness = jresp.details.wellness;
                var skill = jresp.user.skill;
            }

            // SERVER_DATA + egyebek PVP join elÅ‘ttrÅ‘l
            var saveObj = storageGet("pulse-saveData");
            var domination = null;
            var regionName = null;
            var countdown = "00:00";
            var defenderId = 0;
            var invaderId = 0;
            var mustInvert = 0;
            var att_points = 0;
            var def_points = 0;
            var round = 0;
            var isResistance = 0;
            var att_rounds = 0;
            var def_rounds = 0;

            domination = saveObj.domination;
            regionName = saveObj.region;
            countdown = saveObj.countdown;
            att_rounds = saveObj.attRounds;
            def_rounds = saveObj.defRounds;

            var BSD = saveObj.sdata;
            if (BSD != null && BSD != undefined && BSD != "undefined") {
                defenderId = BSD.defenderId;
                invaderId = BSD.invaderId;
                mustInvert = BSD.mustInvert;
                att_points = BSD.points.attacker;
                def_points = BSD.points.defender;
                round = BSD.zoneId;
                isResistance = BSD.isResistance;
            }

//////////// Ezek a vÃ¡ltozÃ³k kinyerhetÅ‘k az oldalbÃ³l
            var ErpkPvp = unsafeWindow.ErpkPvp;
            var givenDamage = ErpkPvp.user_data.influence || 0;
            var winnerId = ErpkPvp.info_display_data.match_winner || 0;
            var enemyName = escape(ErpkPvp.enemy_data.enemy_name) || 0;
            var citizenName = escape(ErpkPvp.user_data.user_name) || 0;
            var battleId = ErpkPvp.battleId || 0;
            var citizenId = ErpkPvp.citizenId || 0;

            var citizenshipId = getCitizenshipId();
            var groupId = getArmyId();

            var livetime = "00:00";
            var eday = 0;
 
            try {
                livetime = $("#live_time").text();
                eday = $(".eday strong").text();
            } catch (err) {}


            var timestamp = new Date().getTime();
            var armydata = getArmyData();

            var enemyDamage = 0;
            var userDamage = 0;
            try {
                for (var i = 0; i < ErpkPvp.log.length; i++) {
                    if (ErpkPvp.log[i].enemy_action == "fire" || ErpkPvp.log[i].enemy_action == "defend") {
                        enemyDamage += ErpkPvp.log[i].enemy_output;
                    }
                    if (ErpkPvp.log[i].user_action == "fire" || ErpkPvp.log[i].user_action == "defend") {
                        userDamage += ErpkPvp.log[i].user_output;
                    }
                }
            } catch (err) {}

            wellness -= userDamage;

            var query = "";
            query += "citizenId=" + citizenId + "&battleId=" + battleId + "&defenderId=" + defenderId + "&invaderId=" + invaderId;
            query += "&citizenName=" + citizenName;
            query += "&ad=" + armydata;
            query += "&natId=" + citizenshipId + "&groupId=" + groupId;
            query += "&regionName=" + regionName + "&mustInvert=" + mustInvert + "&isResistance=" + isResistance;
            query += "&instantKill=" + instantKill + "&givenDamage=" + givenDamage + "&earnedXp=" + earnedXp;
            query += "&weaponDamage=" + weaponDamage + "&weaponDurability=" + weaponDurability;
            query += "&skill=" + skill;
            query += "&rank=" + rank + "&level=" + level + "&exp=" + exp + "&wellness=" + wellness;
            query += "&enemyName=" + enemyName + "&enemyIsNatural=" + enemyIsNatural;
            query += "&countdown=" + countdown + "&livetime=" + livetime + "&eday=" + eday;
            query += "&domination=" + domination + "&attPoints=" + att_points + "&defPoints=" + def_points;
            query += "&round=" + round + "&attRounds=" + att_rounds + "&defRounds=" + def_rounds;
            query += "&version=" + pulse_version;
            query += "&ts=" + timestamp;
            query += "&winnerId=" + winnerId;
            query += "&userDamage=" + userDamage + "&enemyDamage=" + enemyDamage;
            query += "&DOarmyID=" + DO_armyID;
            query += "&DOBattleID=" + DO_BattleID;
            query += "&DOCountry=" + DO_Country;
            query += "&DORegion=" + DO_Region;

//////////////////////////////////////////////
//unsafeWindow.console.log("query = " + query);
//////////////////////////////////////////////

            sendData(query, false);

            var totalGivenDamage = givenDamage;
            if (enemyIsNatural) {
                totalGivenDamage += Math.floor(givenDamage * 0.1);
            }
            try {
                addToday(eday, totalGivenDamage);
                addTodayHits(eday, earnedXp);
                updateTodayInfo();
            } catch (err) {}
        }


        (function () {
            if (unsafeWindow.pvp) {

                var proxied = unsafeWindow.pvp.showEndScreen;
                unsafeWindow.pvp.showEndScreen = function (obj) {

                    sendPVPData();

                    if (typeof proxied.apply == 'function') {
                        return proxied.apply(this, arguments);
                    } else {
                        return proxied(arguments[0]);
                    }
                };
            }
        })();

        (function () {
            if (unsafeWindow.ErpkPvp) {

                var proxied = unsafeWindow.ErpkPvp.joinFight;
                unsafeWindow.ErpkPvp.joinFight = function (extras) {

// Ez a funkciÃ³ meghÃ­vÃ³dik a PVP oldalon is amÃ­g vÃ¡runk az ellenfÃ©lre
// ahol mÃ¡r nincsenek meg a fontos adatok, ezÃ©rt csak a battlefield
// oldalon mentjÃ¼k az adatokat
                    var curl = location.href;
                    if (curl == null || curl == undefined || curl == 'undefined') {
                        curl = window.location.href;
                    }
                    if (curl.search("battlefield") != -1) {
                        saveData();
                    }

                    if (typeof proxied.apply == 'function') {
                        return proxied.apply(this, arguments);
                    } else {
                        return proxied(arguments[0]);
                    }
                };

            }
        })();

        try {
            updateTodayInfo();
            updateTodayOffsetInfo(1);
            updateTodayOffsetInfo(2);

        } catch (err) {}



        try {
            var curl = location.href;
            if (curl == null || curl == undefined || curl == 'undefined') {
                curl = window.location.href;
            }
            if (curl.search(/military/i) != -1) {
                var curlparts = curl.split('/');
                var bId = curlparts[curlparts.length - 1];
                bId = bId.split('?')[0];
                bId = bId.replace(/[^0-9]/g, '');
                currentBattleId = bId;
                setTimeout(function () {
                    forceAjaxCheck();
                }, 2000);
            }
        } catch (err) {}

        // REMOVED VERSION CHECK

    }

    /*
     * QUEUE BASZÃS
     * 
     * Queue.js
     *
     * A function to represent a queue
     *
     * Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
     * the terms of the CC0 1.0 Universal legal code:
     * http://creativecommons.org/publicdomain/zero/1.0/legalcode
     *
     * Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
     * items are added to the end of the queue and removed from the front.
     */
    (function ($) {

        $.fn.queueCreate = function (inqueue, options) {
            // initialise the queue and offset

            var queue = inqueue;
            var offset = 0;

            this.sliceQueue = function () {
                queue = queue.slice(offset);
                offset = 0;
                return queue;
            }

            /* Returns the length of the queue. */
            this.getLength = function () {
                // return the length of the queue
                return (queue.length - offset);
            }

            /* Returns true if the queue is empty, and false otherwise. */
            this.isEmpty = function () {
                // return whether the queue is empty
                return (queue.length == 0);
            }

            /* Enqueues the specified item. The parameter is:
             * item - the item to enqueue */
            this.enqueue = function (item) {
                // enqueue the item
                queue.push(item);
            }

            /* Dequeues an item and returns it. If the queue is empty then undefined is returned. */
            this.dequeue = function () {
                // if the queue is empty, return undefined
                if (queue.length == 0) return undefined;

                // store the item at the front of the queue
                var item = queue[offset];

                // increment the offset and remove the free space if necessary
                if (++offset * 2 >= queue.length) {
                    queue = queue.slice(offset);
                    offset = 0;
                }

                // return the dequeued item
                return item;
            }

            /* Returns the item at the front of the queue (without dequeuing it). If the
             * queue is empty then undefined is returned. */
            this.peek = function () {
                // return the item at the front of the queue
                return (queue.length > 0 ? queue[offset] : undefined);
            }

        };

    })(jQuery);

    function initPulseQueue() {

        var queue_data = storageGet("pulse-queue-data");
        if (queue_data == null || queue_data == undefined || queue_data == "undefined" || queue_data == "" || typeof(queue_data) == "string") {
            queue_data = [];
            pulse_queue = new $.fn.queueCreate(queue_data);
            storageSet("pulse-queue-data", queue_data);
        } else {
            pulse_queue = new $.fn.queueCreate(queue_data);
            if (isNaN(pulse_queue.getLength())) {
                queue_data = [];
                pulse_queue = new $.fn.queueCreate(queue_data);
                storageSet("pulse-queue-data", queue_data);
            }

        }

        main2();
    }
//////// QUEUE

    disableFightButton();
    initPulseQueue();

//////////////////////////////////////////////
//    var queue = JSON.stringify(storageGet("pulse-queue-data"));
//    unsafeWindow.console.log("queue = " + queue);
//////////////////////////////////////////////
}

function waitJQuery() {
	if (typeof(unsafeWindow.jQuery) != 'function') {
		setTimeout(function () { waitJQuery(); }, 200);
	}
	else {
		$j = unsafeWindow.$j;
		initializePersistence();
	}
}

waitJQuery();