// ==UserScript==
// @name           miself's Monopoly City Streets utilities main script (don't install this)
// @namespace      http://userscripts.org 
// @description    Do not install this. This is loaded from the main script.
// @include        http://dontinstallthisscript.com/
// @version        012
// ==/UserScript==

var old_MCS_getPlayerData  = MCS.getPlayerData;
var old_MCS_loginPlayer    = MCS.loginPlayer;
var old_MCS_getPlayerLevel = MCS.getPlayerLevel;

MCS.getPlayerData = function (field) {
    if (HK.player === null) {
        HK.player = old_MCS_getPlayerData();
    }

    if (field) {
        if (typeof HK.player[field] != "undefined") {
            return HK.player[field];
        }
        return null;
    } else {
        return HK.player;
    }
};

MCS.getPlayerLevel = function (amount) {
    var playerLevels = {
        1: 5000,
        2: 10000,
        3: 100000,
        4: 1000000,
        5: 10000000
    };
    if (HK.player != null) {
        amount = amount || HK.player.capital;
        if (amount >= playerLevels["1"] && amount < playerLevels["2"]) {
            return 2;
        } else if (amount >= playerLevels["2"] && amount < playerLevels["3"]) {
            return 3;
        } else if (amount >= playerLevels["3"] && amount < playerLevels["4"]) {
            return 4;
        } else if (amount >= playerLevels["4"] && amount < playerLevels["5"]) {
            return 5;
        } else if (amount >= playerLevels["5"]) {
            return 6;
        }
        return 1;
    }
    return 0;
};

MCS.loginPlayer = function (playerData, remember, fakeLogin) {
    var doingLogin = true;

    if ((fakeLogin) && (g_nickname !== null) && (g_nickname != "") && (g_hash !== null) && (g_hash != "")) {
        MCS.ALERT.show("error", "Doing fake login.<br/>To collect rent you must sign out and login manually.");
        
        var notify = function (data) {
            var player = MCS.getPlayerData();
            var notificationInterval = null;
            var notificationIntervalTime = 60000;
            
            var oldNumber = 0;
            var newNumber = 0;
            if (typeof data != "undefined") {
                if (typeof player.notifications == "object") {
                    $.each(player.notifications, function () {
                        oldNumber++;
                    });
                }
                player.notifications = data;
            }
            $.each(player.notifications, function () {
                newNumber++;
            });
            if (newNumber > oldNumber) {
                MCS.TOOLBAR.notify(newNumber - oldNumber);
                notificationIntervalTime = 60000;
            } else if (notificationIntervalTime < 3600000) {
                notificationIntervalTime *= 2;
            }
            notificationInterval = window.setTimeout(getNotifications, notificationIntervalTime);
        };
        var getNotifications = function () {
            var player = MCS.getPlayerData();
            $.ajax({
                url: "/player/notifications",
                data: {
                    nickname: player.nickname,
                    hash: player.hash
                },
                dataType: "json",
                success: notify
            });
        };
    
        $.ajax({
            url: "/player/stats",
            data: {
                nickname: g_nickname,
                page: -1
            },
            dataType: "json",
            success: function (statsPlayer, status) {
                MCS.ALERT.show("error", "Doing fake login.<br/>To collect rent you must sign out and login manually.");
                
                HK.player = {
                    nickname: g_nickname,
                    hash:     g_hash,
                    location: {
                        lat: 0,
                        lng: 0,
                        region:  "Unknown",
                        country: statsPlayer.loc
                    },
                    balance: statsPlayer.money,
                    capital: statsPlayer.score,
                    offers: 0,
                    notifications: {},
                    status: "normal",
                    ip: ""
                };
                MCS.updateInterface();
                
                MCS.WELCOME.hide();
                
                getNotifications();
            }
        });
    } else {
        old_MCS_loginPlayer(playerData, remember);
        if (!(typeof playerData == "object")) {
            var expires = new Date();
            expires.setTime(expires.getTime() - 1);
            expires = expires.toGMTString();
            document.cookie = "y=; expires=" + expires + "; path=/";
            document.cookie = "z=; expires=" + expires + "; path=/";
        
            HK.player = null;
            doingLogin = false;
            MCS.updateInterface();
        }
    }
    
    if (doingLogin) {
        window.setTimeout(function () {
            var player = MCS.getPlayerData();
            var expires;
            
            expires = new Date();
            expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
            expires = expires.toGMTString();
            document.cookie = "y=" + encodeURI(player.nickname) + "; expires=" + expires + "; path=/";
            document.cookie = "z=" + encodeURI(player.hash)     + "; expires=" + expires + "; path=/";
            
            expires = new Date();
            expires.setTime(expires.getTime() - 1);
            expires = expires.toGMTString();
            document.cookie = "n=; expires=" + expires + "; path=/";
            document.cookie = "h=; expires=" + expires + "; path=/";
        }, 10000);
    }
};

MCS.zoomIn = function (point) {
    if (MCS.map().getZoom() == MCS.zoomLevels.STREET) return;
    point = point || MCS.map().getCenter();
    switch (MCS.map().getZoom()) {
    case MCS.zoomLevels.WORLD:
        MCS.map().setCenter(point, 6);
        break;
    case 6:
        MCS.map().setCenter(point, MCS.zoomLevels.FAR);
        break;
    case MCS.zoomLevels.FAR:
        MCS.map().setCenter(point, 12);
        break;
    case 12:
        MCS.map().setCenter(point, 13);
        break;
    case 13:
        MCS.map().setCenter(point, MCS.zoomLevels.REGION);
        break;
    case MCS.zoomLevels.REGION:
        MCS.map().setCenter(point, MCS.zoomLevels.STREET);
        break;
    }
};

MCS.zoomOut = function () {
    if (MCS.map().getZoom() == MCS.zoomLevels.WORLD) return;
    switch (MCS.map().getZoom()) {
    case 6:
        MCS.map().setZoom(MCS.zoomLevels.WORLD);
        break;
    case MCS.zoomLevels.FAR:
        MCS.map().setZoom(6);
        break;
    case 12:
        MCS.map().setZoom(MCS.zoomLevels.FAR);
        break;
    case 13:
        MCS.map().setZoom(12);
        break;
    case MCS.zoomLevels.REGION:
        MCS.map().setZoom(13);
        break;
    case MCS.zoomLevels.STREET:
        MCS.map().setZoom(MCS.zoomLevels.REGION);
        break;
    }
};

var old_MCS_BUY = MCS.BUY;

MCS.BUY = function () {
    var loadCount = 0,
    bboxes = {},
    streets = [],
    loading = false;
    $(".buy .close, .start .close").live("click", hide);
    $(".buy tr").live("click", function () {
        MCS.STREET.show($(this).attr("_streetid"));
    });
    $(".start .zoomin-button").live("click", function () {
        MCS.zoomIn();
    });
    $(".start .search-button, .buy .button").live("click", function () {
        MCS.SEARCH.show();
    });
    function show() {
        MCS.mode("browse");
        var player = MCS.getPlayerData();
        if (MCS.map().getZoom() == MCS.zoomLevels.STREET) {
            MCS.LOADING.show();
            $(".buy .loading").show();
            MCS.DIALOG.hideAndShow(null, "buy", {
                right: true,
                fullHeight: ".buy .street-list",
                preload: function () {
                    $(".buy table").empty();
                    $(".buy .street-list, .buy p").hide();
                    $(".buy .loading").show();
                }
            });
            if (!loading) {
                loadCount = 0;
                streets = [];
                bboxes = {};
                update();
                if (player == null) {
                    $(".buy .button").show();
                } else {
                    $(".buy .button").hide();
                }
                MCS.TOOLTIP.show("buy");
                MCS.TRACK.view({
                    page: "buy street",
                    section: "buy"
                });
            }
        } else {
            MCS.DIALOG.hideAndShow(null, "start", {
                right: true,
                onload: function () {
                    $("div.start form.login").unbind().submit(function () {
                        MCS.SEARCH.loginPlayer("div.start");
                        return false;
                    }).hide();
                }
            });
            MCS.TOOLTIP.show("zoomin", "start");
            MCS.TRACK.view({
                page: "zoom in",
                section: "buy"
            });
        }
        MCS.TOOLBAR.setOn("buy");
        if (player == null) {
            $(".start .close, .buy .close").hide();
        } else {
            $(".start .close, .buy .close").show();
        }
    }
    function loaded() {
        loadCount--;
        if (loadCount <= 0) {
            loading = false;
            loadedShowStreets();
            MCS.LOADING.hide();
        }
    }
    function loadedShowStreets() {
        if (streets.length) {
            streets.sort(function (a, b) {
                var aname = parseInt(a.price),
                    bname = parseInt(b.price);
                if (aname > bname) return -1;
                if (aname < bname) return 1;
                return 0;
            });
            var str_streetList = "";
            for (var foo = 0; foo < streets.length; foo++) {
                str_streetList += '<tr _streetid="' + streets[foo].id + '" class="' + streets[foo].type + '"><th>' + streets[foo].name + "</th><td>" + MCS.unit + MCS.formatPrice(streets[foo].price) + "</td></tr>";
            }
            $(".buy table").empty();
            $(".buy table").append(str_streetList);
            $(".buy tr:first").addClass("first");
            $(".buy tr:last").addClass("last");
            $(".buy .loading").hide();
            $(".buy .street-list").show();
            MCS.DIALOG.resize("buy");
        } else {
            $(".buy p").show();
        }
    }
    
    function hide() {
        MCS.DIALOG.hide(["buy", "start"]);
        MCS.TOOLBAR.setOff("buy");
    }
    
    function clear() {
        loadCount = 0;
        streets = [];
        bboxes = {};
        $(".buy table").empty();
    }
    
    function update() {
        loading = true;
        var player = MCS.getPlayerData();
        var bboxSize = 100000;
        var bbox = MCS.getBBox();
        
        var delay = 1;
        
        for (var m_lat = bbox.s; m_lat < bbox.n; m_lat += bboxSize) {
            var lat = m_lat;
            MCS.BUY.update_lat(lat, delay, player, bbox, bboxSize);
            delay += ((bbox.e - bbox.w) / bboxSize) * 75;
        }
    }
    
    function update_lat(lat, delay, player, bbox, bboxSize) {
        window.setTimeout( function () {
            for (var lng = bbox.w; lng < bbox.e; lng += bboxSize) {
                if (!bboxes[lng + "/" + lat]) {       
                    loadCount++;
                    
                    MCS.LOADING.show();
                    $.ajax({
                        url: "/buy/getstreetstobuy",
                        data: {
                            lat: lat,
                            lng: lng
                        },
                        dataType: "json",
                        "global": false,
                        complete: function () {
                            MCS.LOADING.hide();
                            loaded();
                        },
                        success: function (data, status) {
                            var count = 0;
                            $.each(data, function (id, streetData) {
                                if (streetData.s == "free" || player == null || streetData.o != player.nickname) {
                                    streets.push({
                                        id: id,
                                        name: streetData.n,
                                        price: streetData.p,
                                        type: streetData.s
                                    });
                                    
                                    count++;
                                }
                            });
                            if (count > 0) {
                                $(".buy .street-list, .buy p").hide();
                            }
                        }
                    });
                    bboxes[lng + "/" + lat] = true;
                }
            }
        }, delay);
    }
    
    return {
        show: show,
        hide: hide,
        clear: clear,
        update: update,
        update_lat: update_lat
    };
} ();

old_MCS_BUY.show   = MCS.BUY.show;
old_MCS_BUY.hide   = MCS.BUY.hide;
old_MCS_BUY.update = MCS.BUY.update;

MCS.BUILD = function () {
    var streetId = null,
    streetData = null,
    buildingType = null,
    location = null;
    var scroll = 0;
    var selectedLocationOverlay = null,
    locationsOverlays = [];
    
    $(".build .close").live("click", function () {
        MCS.DIALOG.hide();
        MCS.ALERT.hide();
        MCS.STREET.show(streetId);
    });
    $(".build li.canBuy").live("click", function () {
        buildingType = $(this).attr("_type");
        showLocations($(this));
    });
    $(".build-confirm .ok").live("click", buyBuilding);
    $(".build-pick .cancel, .build-confirm .cancel").live("click", function () {
        var marker;
        while (marker = locationsOverlays.pop()) {
            MCS.map().removeOverlay(marker);
        }
        if (selectedLocationOverlay != null) {
            MCS.map().removeOverlay(selectedLocationOverlay);
        }
        MCS.DIALOG.hide();
        if (MCS.CHANCE.getChanceCard()) {
            showBonus();
        } else {
            show(streetId, streetData);
        }
    });
    $(".street .bonus-button").live("click", function () {
        streetId = MCS.STREET.getStreetData().id;
        streetData = MCS.STREET.getStreetData().data;
        buildingType = MCS.CHANCE.getChanceCard().building;
        MCS.DIALOG.hide("chance");
        showLocations($(this));
    });
    var mouseDown = false,
    mouseDownTimeout = null;
    var startScroll = function (directionFunction) {
        mouseDown = true;
        window.clearTimeout(mouseDownTimeout);
        mouseDownTimeout = window.setTimeout(directionFunction, 150);
    };
    var stopScroll = function () {
        mouseDown = false;
    };
    var moveRight = function () {
        $(".scroller").animate({
            scrollLeft: "+=150"
        },
        150);
        if (mouseDown) {
            mouseDownTimeout = window.setTimeout(moveRight, 150);
        }
    };
    var moveLeft = function () {
        $(".scroller").animate({
            scrollLeft: "-=150"
        },
        150);
        if (mouseDown) {
            mouseDownTimeout = window.setTimeout(moveLeft, 150);
        }
    };
    $(".build .left").live("mousedown", function () {
        startScroll(moveLeft);
    }).live("mouseup", stopScroll).live("mouseout", stopScroll);
    $(".build .right").live("mousedown", function () {
        startScroll(moveRight);
    }).live("mouseup", stopScroll).live("mouseout", stopScroll);
    $(".build-bonus .dont").live("click", function () {
        MCS.CHANCE.doneChance();
        MCS.DIALOG.hide("build-bonus");
        if (streetId) {
            MCS.STREET.show(streetId);
        } else if (MCS.STREET.getStreetData().id) {
            MCS.STREET.show(MCS.STREET.getStreetData().id);
        }
    });
    $(".build-bonus .showprop").live("click", function () {
        MCS.PROPERTY.show();
    });
    $(".build-bonus .leaderboard").live("click", function () {
        MCS.LEADERBOARDS.show();
    });
    function show(id, data) {
        streetId = id;
        streetData = data;
        MCS.DIALOG.hide([].concat("street", MCS.dialogs.right));
        MCS.DIALOG.show("build", {
            left: 40,
            center: true
        });
        $(".build ol").empty();
        var width = 0;
        var level = MCS.getPlayerLevel();
        $.each(MCS.buildings, function (type, details) {
            if (details.effect != "bonus" && details.effect != "hazard") {
                var canBuy = "cantBuy";
                if (details.price > MCS.getPlayerData().balance) {
                    var message = MCS.LANG.build.noMoney;
                } else if (details.level > level) {
                    var message = MCS.LANG.build.locked.replace("%n", details.level);
                } else {
                    canBuy = "canBuy";
                    var message = MCS.LANG.build.buy;
                }
                var baseRent = streetData.r;
                if (baseRent > 100) baseRent = 100;
                var building = '<li class="building' + type + " " + canBuy + '" _type="' + type + '" title="' + message + '">' + '<div class="pic"></div>' + "<h2>" + MCS.LANG.building["building" + type] + "</h2>" + '<p class="price">' + MCS.unit + MCS.formatPrice(details.price) + "</p>" + '<p class="effect">' + MCS.LANG.build.rent + ' <span class="mm">' + MCS.unit + MCS.formatPrice(parseInt(baseRent * details.effect / 100)) + "</span></p>" + "</li>";
                $(".build ol").append(building);
                width += 150;
            }
        });
        $(".build ol").width(width);
        $(".build li.cantBuy div.pic").css("opacity", 0.25);
    }
    function showLocations(clickedButton) {
        MCS.LOADING.show();
        $.ajax({
            url: "/build/getlocations",
            cache: false,
            data: {
                id: streetId,
                type: buildingType
            },
            dataType: "json",
            complete: MCS.LOADING.hide,
            success: function (data, status) {
                var isRoom = false;
                $.each(data, function (foo, point) {
                    if (point) {
                        isRoom = true;
                        var split = point.split("/");
                        var lat = parseInt(split[0]) / MCS.intToFloat,
                        lng = parseInt(split[1]) / MCS.intToFloat;
                        var cone = new google.maps.Icon(G_DEFAULT_ICON);
                        cone.image = "http://assets.monopolycitystreets.com/img/cone.1245868748.png";
                        cone.printImage = null;
                        cone.shadow = "http://assets.monopolycitystreets.com/img/cone-shadow.1245868748.png";
                        cone.iconSize = new GSize(24, 38);
                        cone.shadowSize = new GSize(37, 38);
                        cone.iconAnchor = new GPoint(12, 28);
                        cone.transparent = "http://assets.monopolycitystreets.com/img/cone-trans.1245868748.png";
                        cone.imageMap = [0, 29, 6, 20, 9, 0, 12, 0, 17, 21, 23, 26, 14, 37];
                        var marker = new google.maps.Marker(new google.maps.LatLng(lat, lng), {
                            title: MCS.LANG["build-pick"].marker,
                            icon: cone
                        });
                        marker.MCSid = foo;
                        google.maps.Event.addListener(marker, "click", function () {
                            if (selectedLocationOverlay != null) {
                                MCS.map().removeOverlay(selectedLocationOverlay);
                            }
                            MCS.DIALOG.hide("build-pick");
                            MCS.DIALOG.show("build-confirm");
                            var point = this.getLatLng();
                            location = this.MCSid;
                            var footprint = null;
                            var from = MCS.map().fromDivPixelToLatLng(new google.maps.Point(0, 0)),
                            to = MCS.map().fromDivPixelToLatLng(new google.maps.Point(MCS.buildings[buildingType].footprint, MCS.buildings[buildingType].footprint));
                            var footprint = parseInt((from.lat() - to.lat()) * MCS.intToFloat);
                            selectedLocationOverlay = circleOverlay(point.lat(), point.lng(), footprint);
                            MCS.map().addOverlay(selectedLocationOverlay);
                        });
                        google.maps.Event.addListener(marker, "dblclick", buyBuilding);
                        MCS.map().addOverlay(marker);
                        locationsOverlays.push(marker);
                    }
                });
                if (isRoom) {
                    MCS.DIALOG.hide(["build", "street", "build-bonus"]);
                    MCS.ALERT.hide();
                    MCS.DIALOG.show("build-pick", {
                        preload: function () {
                            if (MCS.CHANCE.getChanceCard()) {
                                $(".build-pick .cancel").text(MCS.LANG["build-pick"].anotherStreet);
                            } else {
                                $(".build-pick .cancel").text(MCS.LANG["build-pick"].anotherBuilding);
                            }
                        }
                    });
                } else { if (MCS.CHANCE.getChanceCard()) {
                        MCS.ALERT.show("noRoom", MCS.LANG.build.noRoomBonus, null, clickedButton);
                    } else {
                        MCS.ALERT.show("noRoom" + clickedButton.attr("_type"), MCS.LANG.build.noRoom, null, clickedButton);
                    }
                }
            }
        });
    }
    function circleOverlay(lat, lng, footprint) {
        var circleLat = footprint / 2 / MCS.intToFloat;
        var circleLng = circleLat / Math.cos(lat * Math.PI / 180);
        var numPoints = 30;
        var circleLatLngs = [];
        for (var i = 0; i < numPoints + 1; i++) {
            var theta = Math.PI * (i / (numPoints / 2));
            var vertexLat = lat + (circleLat * Math.sin(theta));
            var vertexLng = lng + (circleLng * Math.cos(theta));
            circleLatLngs.push(new google.maps.LatLng(vertexLat, vertexLng));
        }
        return new google.maps.Polygon(circleLatLngs, "#ff0000", 0.6, 1, "#ff0000", 0.3);
    }
    function buyBuilding() {
        var player = MCS.getPlayerData();
        var chance = MCS.CHANCE.getChanceCard();
        if (chance) {
            if (chance.type == "bonus") {
                MCS.CHANCE.actionChance(player, {
                    nickname: player.nickname,
                    hash: player.hash,
                    type: buildingType,
                    id: streetId,
                    loc: location
                });
            } else {
                MCS.CHANCE.actionChance(player, {
                    nickname: player.nickname,
                    hash: player.hash,
                    type: buildingType,
                    id: streetId,
                    loc: location
                });
            }
        } else {
            MCS.LOADING.show();
            $.ajax({
                url: "/negotiate/buybuilding",
                type: "post",
                data: {
                    nickname: player.nickname,
                    hash: player.hash,
                    id: streetId,
                    type: buildingType,
                    loc: location
                },
                dataType: "json",
                complete: MCS.LOADING.hide,
                success: function (data, status) {
                    player.balance -= MCS.buildings[buildingType].price;
                    MCS.STATUSBAR.redraw();
                    MCS.DIALOG.hide("build-confirm");
                    if (data.c) {
                        MCS.CHANCE.take(data.c, streetId);
                    } else {
                        MCS.STREET.show(streetId, null, false, false);
                    }
                }
            });
        }
        MCS.TRACK.view({
            page: "build",
            section: "build",
            street: streetData.n,
            country: streetData.cy,
            region: streetData.re,
            building_type: buildingType,
            activity: "build property",
            value: MCS.buildings[buildingType].price
        });
    }
    function showBonus() {
        var chanceCard = MCS.CHANCE.getChanceCard();
        if (chanceCard.type == "bonus" || chanceCard.type == "hazard" || chanceCard.type == "bulldozer") {
            MCS.DIALOG.show("build-bonus", {
                center: true,
                top: 100
            });
            $(".build-bonus p").text(MCS.LANG["build-bonus"][chanceCard.type]);
            $(".build-bonus .dont").css("display", "inline-block");
            $(".build-bonus .leaderboard, .build-bonus .showprop").hide();
            switch (chanceCard.type) {
            case "bonus":
                $(".build-bonus h1").text(MCS.LANG["build-bonus"]["title" + chanceCard.building]);
                $(".build-bonus .showprop").css("display", "inline-block");
                break;
            case "hazard":
                $(".build-bonus h1").text(MCS.LANG["build-bonus"]["title" + chanceCard.building]);
                $(".build-bonus .leaderboard").css("display", "inline-block");
                break
            case "bulldozer":
                $(".build-bonus h1").text(MCS.LANG["build-bonus"]["title6"]);
                $(".build-bonus .leaderboard").css("display", "inline-block");
                break;
            }
        }
    }
    
    function gotoHazard(sId) {
        MCS.LOADING.show();
        $.ajax({
            url: "/map/getstreet",
            cache: true,
            data: {
                id: sId
            },
            dataType: "json",
            complete: MCS.LOADING.hide,
            success: function (sData, status) {
                var streetData = sData;
                for (var location in streetData.b) {
                    var buildingData = streetData.b[location];
                    var bType = buildingData.t;
                    
                    if (MCS.buildings[bType].effect == "hazard") {
                        MCS.map().panTo(new google.maps.LatLng(buildingData.x / MCS.intToFloat, buildingData.y / MCS.intToFloat));
                        return;
                    }
                }
            }
        });
    }
    
    function buyAll(sId, bType) {
        /*
        if (MCS.map().getZoom() != MCS.zoomLevels.STREET) {
            MCS.ALERT.show("error", "Stopping autobuild!");
            return;
        }
        */
    
        MCS.LOADING.show();
        $.ajax({
            url: "/build/getlocations",
            cache: false,
            timeout: 60000,
            data: {
                id: sId,
                type: bType
            },
            dataType: "json",
            success: function (data, status) {
                MCS.LOADING.hide();
                for (var location in data) {
                    if (data[location]) {
                        window.setTimeout(function() {
                            doBuy(sId, bType, location);
                        }, 2000);
                        return;
                    }
                }
                doBuyFinish(sId);
            },
            error: function (xhr, status, data) {
                MCS.LOADING.hide();
                switch (xhr.status) {
                case 503:
                    MCS.ALERT.show("error", "Too many requests detected...<br/>Waiting 5 secs to try again.");
                    break;
                default:
                    MCS.ALERT.show("error", "Random error...<br/>Waiting 5 secs to try again.");
                    break;
                }
                window.setTimeout(function() {
                    buyAll(sId, bType);
                }, 5000);
            }
        });
    }
    
    function doBuy(sId, bType, location) {
        var player = MCS.getPlayerData();
        MCS.LOADING.show();
        $.ajax({
            url: "/negotiate/buybuilding",
            type: "post",
            timeout: 60000,
            data: {
                nickname: player.nickname,
                hash: player.hash,
                id: sId,
                type: bType,
                loc: location
            },
            dataType: "json",
            success:  function (data, status) {
                MCS.LOADING.hide();
                player.balance -= MCS.buildings[bType].price;
                MCS.STATUSBAR.redraw();
                if (data.c) {
                    MCS.CHANCE.take(data.c, sId);
                }
                buyAll(sId, bType);
            },
            error: function (xhr, status, data) {
                var delay = 1000;
                MCS.LOADING.hide();
                switch (xhr.status) {
                case 503:
                    MCS.ALERT.show("error", "Too many requests detected...<br/>Waiting 60 secs to try again.");
                    delay = 60000;
                    break;
                default:
                    MCS.ALERT.show("error", "Random error...<br/>Waiting 5 secs to try again.");
                    delay = 5000;
                    break;
                }
                window.setTimeout(function() {
                    buyAll(sId, bType);
                }, delay);
            }
        }); // buybuilding
    }
    
    function doBuyFinish(sId) {
        MCS.STREET.show(sId, null, false, false);
        MCS.updateInterface();
    }
    
    function sellAll(streetId, cheaperThan) {
        cheaperThan = cheaperThan || 9999999999;
        doSellStep(streetId, cheaperThan);
    }
    
    function doSellStep(sId, cheaperThan) {
        /*
        if (MCS.map().getZoom() != MCS.zoomLevels.STREET) {
            MCS.ALERT.show("error", "Stopping autosell!");
            return;
        }
        */
    
        MCS.LOADING.show();
        $.ajax({
            url: "/map/getstreet",
            cache: true,
            timeout: 60000,
            data: {
                id: sId
            },
            dataType: "json",
            success: function (sData, status) {
                var streetData = sData;
                MCS.LOADING.hide();
                for (var location in streetData.b) {
                    var buildingData = streetData.b[location];
                    var bType = buildingData.t;
                    if ((bType > 5) && (buildingData.p <= cheaperThan)) {
                        window.setTimeout(function() {
                            doSell(sId, bType, location, cheaperThan);
                        }, 2000);
                        return;
                    }
                }
                doSellFinish(sId);
            },
            error: function () {
                MCS.LOADING.hide();
                window.setTimeout(function() {
                    doSellStep(sId, cheaperThan);
                }, 100);
            }
        });
    }

    function doSell(sId, bType, location, cheaperThan) {
        var player = MCS.getPlayerData();
        MCS.LOADING.show();
        $.ajax({
            url: "/negotiate/demolishbuilding",
            type: "post",
            timeout: 60000,
            data: {
                nickname: player.nickname,
                hash: player.hash,
                id: sId,
                bid: location
            },
            dataType: "json",
            success:  function () {
                MCS.LOADING.hide();
                player.balance += parseInt(MCS.buildings[bType].price / 2);
                MCS.STATUSBAR.redraw();
                doSellStep(sId, cheaperThan);
            },
            error: function (xhr, status, data) {
                var delay = 1000;
                MCS.LOADING.hide();
                switch (xhr.status) {
                case 503:
                    MCS.ALERT.show("error", "Too many requests detected...<br/>Waiting 60 secs to try again.");
                    delay = 60000;
                    break;
                default:
                    MCS.ALERT.show("error", "Random error...<br/>Waiting 5 secs to try again.");
                    delay = 5000;
                    break;
                }
                window.setTimeout(function() {
                    doSellStep(sId, cheaperThan);
                }, delay);
            }
        });
    }
    
    function doSellFinish(sId) {
        MCS.STREET.show(sId, null, false, false);
        MCS.updateInterface();
    }

    function sellAllLast(cheaperThan) {
        streetId = MCS.STREET.getStreetData().id;
        streetData = MCS.STREET.getStreetData().data;
        sellAll(streetId, cheaperThan);
    }

    function buyAllLast(buildingType) {
        streetId = MCS.STREET.getStreetData().id;
        streetData = MCS.STREET.getStreetData().data;
        buyAll(streetId, buildingType);
    }
    function buyLast() {
        streetId = MCS.STREET.getStreetData().id;
        streetData = MCS.STREET.getStreetData().data;
        buildingType = 6; /*MCS.CHANCE.getChanceCard().building;*/
        showLocations(null);
    }
    return {
        show: show,
        showBonus: showBonus,
        gotoHazard: gotoHazard,
        buyAll: buyAll,
        buyLast: buyLast,
        buyAllLast: buyAllLast,
        sellAll: sellAll,
        sellAllLast: sellAllLast
    };
} ();

HK = function () {
    var map = MCS.map();
    map.enableInfoWindow();
    var streetData = null;
    var player = null;
    
    function showBuy() {
        $(".buy .loading").show();
        MCS.DIALOG.hideAndShow(null, "buy", {
            right: true,
            fullHeight: ".buy .street-list",
            preload: function () {
                $(".buy table").empty();
                $(".buy .street-list, .buy p").hide();
                $(".buy .loading").show();
            }
        });
        
        var content = '<div class="miself-buy-toolbar"><a href=\"javascript:MCS.BUY.update()\">Update</a>&nbsp;&nbsp;<a href=\"javascript:MCS.BUY.clear()\">Clear</a></div>';

	if (!$('div .miself-buy-toolbar').length) {
            $('.buy .street-list').before(content);
        }
        
        MCS.BUY.update();
        $(".buy .button").hide();
        MCS.TOOLTIP.show("buy");
        MCS.TRACK.view({
            page: "buy street",
            section: "buy"
        });
        MCS.TOOLBAR.setOn("buy");
        $(".start .close, .buy .close").show();
    }
    
    function getBBox(precision, scale) {
        precision = precision || intPrecision;
        scale = scale || intScale;
        var bounds = map.getBounds();
        var ne = bounds.getNorthEast(),
        sw = bounds.getSouthWest();
        return {
            n: Math.ceil(ne.lat() * precision) * scale,
            w: Math.floor(sw.lng() * precision) * scale,
            s: Math.floor(sw.lat() * precision) * scale,
            e: Math.ceil(ne.lng() * precision) * scale
        };
    }
    
    function loadStreetData() {
        MCS.map().clearOverlays();
    
        showBuy();
    
        var zoom = map.getZoom();
        var bounds = map.getBounds();
        var ne = bounds.getNorthEast(),
        sw = bounds.getSouthWest();
        var bboxSize = 100000,
        updateBuy = false;
        
        if (MCS.map().getZoom() >= MCS.zoomLevels.REGION) {
            /* Only draw streets at REGION and STREET zoom level */
            var bbox = getBBox(50, 200000);
            for (var lat = bbox.s; lat < bbox.n; lat += bboxSize) {
                for (var lng = bbox.w; lng < bbox.e; lng += bboxSize) {
                    updateBuy = true;
                    MCS.LOADING.show();
                    $.ajax({
                        url: "/map/getstreets",
                        data: {
                            lat: lat,
                            lng: lng
                        },
                        dataType: "json",
                        complete: MCS.LOADING.hide,
                        success: function (data, status) {
                            $.each(data, function (id, sData) {
                                    streetData = sData;
                                    renderStreet(id, sData);
                            });
                        }
                    });
                }
            }
        } else {
            updateBuy = true;
        }
        if (updateBuy && (MCS.DIALOG.isShown("start") || MCS.DIALOG.isShown("buy"))) {
            MCS.BUY.update();
        }
    }

    function renderStreet(streetId, streetData, immedBalloon) {
        if (streetData.s != "free") return;
        if (streetData.s == "owned" || streetData.s == "offered") return;
        var ways = streetData.po.split(";");
        var colour = MCS.STREET.getStreetColour(streetData);
        var street = [];
        $.each(ways, function (foo, way) {
            var streetWay = new google.maps.Polyline.fromEncoded({
                color: colour,
                weight: 7,
                opacity: 0.5,
                points: way,
                levels: 'B',
                zoomFactor: 32,
                numLevels: 4
            });
            street.push(streetWay);
            google.maps.Event.addListener(streetWay, "click", function (latlng) {
                showInfo(streetId, latlng, street);
                /*MCS.STREET.show(streetId);*/
            });
            map.addOverlay(streetWay);
        });
        if (immedBalloon) {
            map.panTo(street[0].getVertex(0));
            showInfo(streetId, street[0].getVertex(0), street);
        }
    }
    
    function showInfo(streetId, latlng, street) {
        MCS.LOADING.show();
        var player = MCS.getPlayerData();
        $.ajax({
            url: "/map/getstreet",
            cache: true,
            data: {
                id: streetId
            },
            dataType: "json",
            complete: MCS.LOADING.hide,
            success: function (sData, status) {
                streetData = sData;
            		
                var streetName = streetData.n;
                if (streetData.re) streetName += ", " + streetData.re;
                if (streetData.cy) streetName += ", " + streetData.cy;
                
                var price = parseInt(streetData.p);
                $.each(streetData.b, function () {
                    if (this.p) {
                        price += parseInt(this.p);
                    }
                });
                
                var rent = parseInt(streetData.r);
                $.each(streetData.b, function () {
                    if (this.z && this.z[0] == "positive") {
                        var baseRent = streetData.r;
                        if (baseRent > 100) baseRent = 100;
                        rent += Math.round((baseRent / 100) * this.z[1]);
                    }
                });
                var myHtml = "<b>" + streetName + "</b><br/><br/>Id: <b>" + streetId + "</b><br/>Price: <b>" + MCS.unit + MCS.formatPrice(price) + "</b><br/>Rent: <b>" + MCS.unit + MCS.formatPrice(rent) + "</b><br/><br/><a href=\"javascript:MCS.STREET.show('" + streetId + "');\">View!</a><br/><br/>";
                
                myHtml += "Tools:<br/>";
                if (streetData.o == player.nickname) {
                    myHtml += "<a href=\"javascript:HK.showBuildingTypeDialog(MCS.STREET.getStreetData().id, MCS.STREET.getStreetData().data, 'buyAllLast');\">Try to fill this street with one kind of building</a><br/><br/>";
                    myHtml += "<a href=\"javascript:HK.showBuildingTypeDialog(MCS.STREET.getStreetData().id, MCS.STREET.getStreetData().data, 'sellAllLast');\">Try to sell all buildings with the same price or cheaper than...</a><br/><br/>";
                }
                myHtml += "<a href=\"javascript:MCS.BUILD.gotoHazard(MCS.STREET.getStreetData().id);\">Goto first hazard</a><br/><br/>";
                
                if (street.length > 1) {
                    myHtml += "Parts:<br/>";
                    for (var i = 0; i < street.length; ++i) {
                        if (i > 0) {
                            myHtml += ", ";
                        }
                        myHtml += "<b class=\"streetpart\" _part=\"" + i + "\">p." + i + "</b>";
                    }
                    $(".streetpart").die("click");
                    $(".streetpart").live("click", function() {
                        var latlng = street[$(this).attr("_part")].getVertex(0);
                        map.panTo(latlng);
                        map.openInfoWindowHtml(latlng , myHtml);
                    });
                }
                map.openInfoWindowHtml(latlng , myHtml);
            }
        });
    }
    
    /*$(".build li.miself_buyAllLast_canBuy").die("click");*/
    $(".build li.miself_buyAllLast_canBuy").live("click", function () {
        MCS.DIALOG.hide(["build", "street", "build-bonus"]);
        MCS.BUILD.buyAllLast($(this).attr("_type"));
    });
    
    /*$(".build li.miself_sellAllLast_canBuy").die("click");*/
    $(".build li.miself_sellAllLast_canBuy").live("click", function () {
        MCS.DIALOG.hide(["build", "street", "build-bonus"]);
        MCS.BUILD.sellAllLast($(this).attr("_price"));
    });
    
    /*$(".build li.miself_buyAdInfinitum_canBuy").die("click");*/
    $(".build li.miself_buyAdInfinitum_canBuy").live("click", function () {
        MCS.DIALOG.hide(["build", "street", "build-bonus"]);
        start_rpt($(this).attr("_type"));
    });
    
    function showBuildingTypeDialog(id, data, action_type) {
        streetId = id;
        streetData = data;
        MCS.DIALOG.hide([].concat("street", MCS.dialogs.right));
        MCS.DIALOG.show("build", {
            left: 40,
            center: true
        });
        $(".build ol").empty();
        var width = 0;
        var level = MCS.getPlayerLevel();
        $.each(MCS.buildings, function (type, details) {
            if (details.effect != "bonus" && details.effect != "hazard") {
                canBuy = "miself_" + action_type + "_canBuy";
                var message = MCS.LANG.build.buy;
                var baseRent = streetData.r;
                if (baseRent > 100) baseRent = 100;
                var building = '<li class="building' + type + " " + canBuy + '" _type="' + type + '" _price="' + details.price + '" title="' + message + '">' + '<div class="pic"></div>' + "<h2>" + MCS.LANG.building["building" + type] + "</h2>" + '<p class="price">' + MCS.unit + MCS.formatPrice(details.price) + "</p>" + '<p class="effect">' + MCS.LANG.build.rent + ' <span class="mm">' + MCS.unit + MCS.formatPrice(parseInt(baseRent * details.effect / 100)) + "</span></p>" + "</li>";
                $(".build ol").append(building);
                width += 150;
            }
        });
        $(".build ol").width(width);
    }
    
    MCS.TOOLBAR.buyOn = loadStreetData;
    
    return {
        player: player,
        streetData: streetData,
        show: loadStreetData,
        renderStreet: renderStreet,
        showBuildingTypeDialog: showBuildingTypeDialog
    };
} ();

MCS.STREET = function () {
    var colours = {
        buy: "#bf2e80",
        mine: "#cf0b05",
        yours: "#145f93"
    },
    id = null,
    data = null,
    offer = null;
    
    $(".sell-button").die("click");
    $(".build-button").die("click");
    /*$(".street .mine .best-offer").die("click");*/
    $(".offer-button").die("click");
    $(".offers-button").die("click");
    
    $(".buy-button").live("click", buy);
    $(".sell-button").live("click", function () {
        if ($("#alertagain:visible").length == 1) {
            MCS.ALERT.hide();
            sell(id);
        } else {
            MCS.ALERT.show("again", MCS.LANG.street.sellConfirm, null, $(this));
        }
        return false;
    });
    
    $(".build-button").live("click", function () {
        MCS.BUILD.show(id, data);
        return false;
    });
    $(".offer-button").live("click", function () {
        MCS.OFFER.show(id, data);
        return false;
    });
    $(".street strong").live("click", function () {
        MCS.STATS.show($(this).text());
        return false;
    });
    $(".street .mine .best-offer").live("click", function () {
        showOffer($(this).attr("_offerid"));
        return false;
    });
    $(".offers-button").live("click", function () {
        viewOffers();
        return false;
    });
    $(".street .close").live("click", hide);
    function getStreetColour(streetData) {
        if (streetData.s == "owned" || streetData.s == "offered") {
            var player = MCS.getPlayerData();
            if (player != null && player.nickname == streetData.o) {
                return colours.mine;
            } else {
                return colours.yours;
            }
        } else {
            return colours.buy;
        }
    }
    function buy(streetId) {
        streetId = streetId || id;
        var player = MCS.getPlayerData();
        if (player == null) {
            MCS.BUY.hide();
            var c = document.cookie.match(/c=([0-9])/);
            if (c && c[1] > 5) {
                MCS.SEARCH.showWithLogin();
            } else {
                MCS.REGISTER.show(id);
            }
        } else {
            MCS.LOADING.show();
            $.ajax({
                url: "/buy/buystreet",
                type: "post",
                data: {
                    nickname: player.nickname,
                    hash: player.hash,
                    id: id
                },
                dataType: "json",
                "global": false,
                complete: MCS.LOADING.hide,
                success: function (response, status) {
                    player.balance -= parseInt(response.p);
                    MCS.updateInterface();
                    MCS.mode("street");
                    MCS.BUY.hide();
                    MCS.TRACK.view({
                        page: "buy street",
                        section: "buy",
                        street: data.n,
                        country: data.cy,
                        region: data.re,
                        activity: "buy street",
                        value: response.p
                    });
                    if (response.c) {
                        MCS.CHANCE.take(response.c, id);
                    } else {
                        show(id, null, false);
                    }
                },
                error: function (xhr, status, data) {
                    switch (xhr.status) {
                    case 0:
                    case 500:
                        MCS.ALERT.show("error", MCS.LANG.alert.serverError);
                        break;
                    case 409:
                        MCS.ALERT.show("error", MCS.LANG.street.couldNotBuy);
                        MCS.STREET.show(id);
                        break;
                    default:
                        MCS.ALERT.show("error", MCS.LANG.alert.error);
                        break;
                    }
                }
            });
        }
    }
    function sell(id) {
        var player = MCS.getPlayerData();
        if (player != null) {
            var streetData = data;
            MCS.LOADING.show();
            $.ajax({
                url: "/negotiate/sellstreet",
                type: "post",
                data: {
                    nickname: player.nickname,
                    hash: player.hash,
                    id: id
                },
                dataType: "json",
                complete: MCS.LOADING.hide,
                success: function (response, status) {
                    MCS.mode("browse");
                    MCS.ALERT.show("sold", MCS.LANG.street.sold, null, $(".toolbar"));
                    player.balance += parseInt(response);
                    MCS.STATUSBAR.redraw();
                    hide();
                    MCS.TRACK.view({
                        page: "sell street",
                        section: "sell",
                        street: streetData.n,
                        country: streetData.cy,
                        region: streetData.re,
                        activity: "sell street",
                        value: response
                    });
                }
            });
        }
    }
    function show(streetId, offerId, withCache, move) {
        if (typeof streetId == "undefined") streetId = id;
        if (typeof withCache == "undefined") withCache = true;
        if (typeof move == "undefined") move = true;
        MCS.LOADING.show();
        id = streetId;
        if (id) {
            $.ajax({
                url: "/map/getstreet",
                cache: withCache,
                data: {
                    id: id
                },
                dataType: "json",
                complete: MCS.LOADING.hide,
                success: function (streetData, status) {
                    data = streetData;
                    var player = MCS.getPlayerData();
                    MCS.map().clearOverlays();
                    if (MCS.mode() != "buy" && MCS.mode() != "offer") {
                        MCS.mode("street");
                        MCS.DIALOG.hide(["leaderboards", "building", "offer", "offer-received"]);
                    }
                    MCS.renderStreet(streetId, streetData, true);
                    move = false;
                    MCS.DIALOG.show("street", {
                        left: true,
                        preload: function () {
                            if (move) {
                                if (MCS.map().getZoom() != MCS.zoomLevels.STREET) {
                                    MCS.map().setZoom(MCS.zoomLevels.STREET);
                                }
                                MCS.map().panTo(new google.maps.LatLng(streetData.l.lat / MCS.intToFloat, streetData.l.lng / MCS.intToFloat));
                            } else {}
                            $(".street div.border").attr("class", "border");
                            
                            var streetName = "<a href=\"javascript:MCS.STREET.show('" + streetId + "');\">";
                            streetName += streetData.n + "<span>";
                            if (streetData.re) streetName += streetData.re + ', ';
                            streetName += streetData.cy + "</span>";
                            streetName += "</a>";
                            $(".street h1").html(streetName);
                            $(".street h1 a").css({
                                "text-decoration": "none",
                                "color": "#FFFFFF"
                            });
                            
                            $(".street div.button, .street form, .street p, .street .best-offer").hide();
                            switch (streetData.s) {
                            case "offered":
                                $(".street h2").html(MCS.LANG.street.ownedBy.replace("%n", "<strong>" + streetData.o + "</strong>"));
                                $(".street p.offered").show();
                                if (player != null && player.nickname == streetData.o) {
                                    $(".street div.border").addClass("mine");
                                } else {
                                    $(".street div.border").addClass("yours");
                                }
                                break;
                            case "owned":
                                $(".street h2").html(MCS.LANG.street.ownedBy.replace("%n", "<strong>" + streetData.o + "</strong>"));
                                if (player == null) {
                                    $(".street div.border").addClass("yours");
                                    $(".street div.offer-button").show().addClass("center");
                                    MCS.TOOLTIP.show("owned", "street");
                                } else if (player.nickname == streetData.o) {
                                    $(".street div.border").addClass("mine");
                                    $(".street div.sell-button").show();
                                    $(".street div.build-button").show();
                                    MCS.TOOLTIP.show("build", "street");
                                } else {
                                    $(".street div.border").addClass("yours");
                                    $(".street div.offer-button").show().addClass("center");
                                    MCS.TOOLTIP.show("owned", "street");
                                }
                                break;
                            case "free":
                                $(".street h2").text(MCS.LANG.street.forSale);
                                if ((player == null && streetData.p <= 3000) || (player != null && player.balance > streetData.p)) {
                                    $(".street p.can-buy").show();
                                    $(".street div.buy-button").show();
                                } else {
                                    $(".street p.no-money").show();
                                }
                                MCS.TOOLTIP.show("free", "street");
                                break;
                            }
                            var base_value = parseInt(streetData.p);
                            if (!$(".street .base-value").length) {
                                $(".street .price").after('<div class="base-value" title="The value of this street without buildings" style="padding:0 0 0.4em;"><span style="color:#999999;font-weight:400;">BASE VALUE: </span>' + MCS.unit + '<span class="value">' + MCS.formatPrice(base_value) + '</span></div>');
                                $(".street .price").css("padding", "0 0 0");
                            } else {
                                $(".street .base-value .value").text(MCS.formatPrice(base_value));
                            }
                            
                            var price = base_value;
                            $.each(streetData.b, function () {
                                if (this.p) {
                                    price += parseInt(this.p);
                                }
                            });
                            $(".street .price").html(MCS.unit + MCS.formatPrice(price));
                            
                            var rent = parseInt(streetData.r);
                            $.each(streetData.b, function () {
                                if (this.z && this.z[0] == "positive") {
                                    var baseRent = streetData.r;
                                    if (baseRent > 100) baseRent = 100;
                                    rent += Math.round((baseRent / 100) * this.z[1]);
                                }
                            });
                            $(".street .rent").removeClass("hazard").html(MCS.LANG.street.rent + " " + MCS.unit + '<span class="value">' + MCS.formatPrice(rent) + '</span>');
                            
                            var buildingNumbers = {
                                r: 0,
                                b: 0,
                                h: 0
                            };
                            $.each(streetData.b, function (index, building) {
                                switch (MCS.buildings[building.t].effect) {
                                case "bonus":
                                    hasBonus = true;
                                    buildingNumbers.b++;
                                    $(".street p.is-protected").show();
                                    break;
                                case "hazard":
                                    buildingNumbers.h++;
                                    break;
                                default:
                                    buildingNumbers.r++;
                                    break;
                                }
                            });
                            if (buildingNumbers.h > 0 && buildingNumbers.b == 0) {
                                $(".street p.has-hazard").show();
                                $(".street .rent").addClass("hazard");
                            }
                            $(".street tr.residential td").text(buildingNumbers.r);
                            $(".street tr.bonus td").text(buildingNumbers.b);
                            $(".street tr.hazard td").text(buildingNumbers.h);
                            if (streetData.of) {
                                var bestOffer = null,
                                bestOfferValue = 0;
                                $.each(streetData.of, function (id) {
                                    if (this.m + this.st > bestOfferValue) {
                                        bestOfferValue = this.m + this.st;
                                        bestOffer = id;
                                    }
                                });
                                if (bestOffer) {
                                    $(".street .best-offer").attr("_offerid", bestOffer).empty().append(MCS.LANG.street.offer.replace("%n", '<span class="nickname">' + streetData.of[bestOffer].f.toUpperCase() + "</span>").replace("%m", '<span class="mm">' + MCS.unit + "<span>" + MCS.formatPrice(parseInt(streetData.of[bestOffer].m) + streetData.of[bestOffer].st) + "</span>"));
                                    $(".street .best-offer").show();
                                    if (player != null && streetData.o == player.nickname) {
                                        $(".street div.offers-button").show();
                                        $(".street div.offer-button").removeClass("center");
                                        $(".street div.build-button, .street div.sell-button").hide();
                                    }
                                }
                            }
                            if (offerId != null) {
                                showOffer(offerId);
                            }
                            var chanceCard = MCS.CHANCE.getChanceCard();
                            if (player != null && chanceCard) {
                                MCS.DIALOG.hide(["build-pick", "build-confirm"]);
                                if (chanceCard.type == "bonus" || chanceCard.type == "hazard" || chanceCard.type == "bulldozer") {
                                    MCS.BUILD.showBonus();
                                    $(".street .offer-button, .street .build-button, .street .sell-button, .street .offers-button").hide();
                                    switch (chanceCard.type) {
                                    case "bonus":
                                        if (streetData.s == "owned" && streetData.o == player.nickname) {
                                            $(".street .bonus-button").text(MCS.LANG.street.buildBonus).show();
                                        } else {
                                            $(".street .no-bonus").show();
                                        }
                                        MCS.TOOLTIP.show("buildbonus", "street");
                                        break;
                                    case "hazard":
                                        if ((streetData.s == "owned" || streetData.s == "offered") && streetData.o != player.nickname) {
                                            var isProtected = false;
                                            $.each(streetData.b, function () {
                                                if (MCS.buildings[this.t].effect == "bonus") {
                                                    isProtected = true;
                                                }
                                            });
                                            if (!isProtected) {
                                                $(".street .bonus-button").text(MCS.LANG.street.buildHazard).show();
                                            }
                                        } else {
                                            $(".street .no-hazard").show();
                                        }
                                        MCS.TOOLTIP.show("buildhazard", "street");
                                        break;
                                    }
                                }
                            }
                            $(".buy tr, .property tr").removeClass("highlight");
                            $(".buy tr[_streetid=" + streetId + "], .property tr[_streetid=" + streetId + "]").addClass("highlight");
                            HK.renderStreet(streetId, streetData, true);
                            MCS.TRACK.view({
                                page: "street view",
                                section: "map view",
                                street: streetData.n,
                                country: streetData.cy,
                                region: streetData.re
                            });
                        }
                    });
                }
            });
        }
    }
    function hide() {
        MCS.DIALOG.hide(["street", "offer-list", "building", "offer", "offer-received", "offer-selector"]);
        MCS.mode("browse");
        id = null;
        /*data = null;*/
        if (MCS.CHANCE.getChanceCard()) {
            MCS.BUILD.showBonus();
        }
        $(".buy tr, .property tr").removeClass("highlight");
    }
    
    $(".offer-received .close").live("click", function () {
        MCS.DIALOG.hide("offer-received");
    });
    $(".offer-received div.os .view").live("click", function () {
        MCS.DIALOG.show("offer-received-streets", {
            preload: function () {
                $(".offer-received-streets ul").empty();
                $.each(offer.s, function (id) {
                    $(".offer-received-streets ul").append('<li _streetid="' + id + '">' + this + '</li>');
                });
                $(".offer-received-streets .done-button").attr("_id", id);
            }
        });
        return false;
    });
    $(".offer-received-streets li").live("click", function () {
        MCS.mode("offer");
        MCS.STREET.show($(this).attr("_streetid"));
        return false;
    });
    $(".offer-received-streets div.button").live("click", function () {
        MCS.DIALOG.hide("offer-received-streets");
        MCS.mode("offer");
        MCS.STREET.show($(this).attr("_id"));
        return false;
    });
    $(".offer-received .reject").die("click");
    $(".offer-received .reject").live("click", function () {
        var player = MCS.getPlayerData();
        if (player != null) {
            var offerId = $(this).attr("id_");
            MCS.LOADING.show();
            $.ajax({
                url: "/offer/rejectoffer",
                type: "post",
                data: {
                    nickname: player.nickname,
                    hash: player.hash,
                    id: id,
                    offerId: offerId
                },
                dataType: "json",
                complete: MCS.LOADING.hide,
                success: function (data, status) {
                    MCS.ALERT.show("rejected", MCS.LANG["offer-received"].rejected);
                    MCS.DIALOG.hide("offer-received");
                    show(id);
                    var streetData = MCS.STREET.getStreetData().data;
                    if (streetData.of[offerId]) {
                        MCS.TRACK.view({
                            page: "offer",
                            section: "offer",
                            street: streetData.n,
                            country: streetData.cy,
                            region: streetData.re,
                            activity: "offer",
                            value: streetData.of[offerId].m,
                            object_name: "offer",
                            object_action: "offer rejected"
                        });
                    }
                }
            });
        }
        return false;
    });
    $(".offer-received .accept").die("click");
    $(".offer-received .accept").live("click", function () {
        var player = MCS.getPlayerData();
        if (player != null) {
            var offerId = $(this).attr("id_");
            MCS.LOADING.show();
            $.ajax({
                url: "/offer/acceptoffer",
                type: "post",
                data: {
                    nickname: player.nickname,
                    hash: player.hash,
                    id: id,
                    offerId: offerId
                },
                dataType: "json",
                complete: MCS.LOADING.hide,
                success: function (data, status) {
                    MCS.ALERT.show("accepted", MCS.LANG["offer-received"].accepted);
                    MCS.DIALOG.hide();
                    MCS.mode("browse");
                    var streetData = MCS.STREET.getStreetData().data;
                    if (streetData.of[offerId]) {
                        var money = parseInt(streetData.of[offerId].m);
                        player.balance += money;
                        player.capital += money;
                        MCS.updateInterface();
                    }
                    MCS.TRACK.view({
                        page: "offer",
                        section: "offer",
                        street: streetData.n,
                        country: streetData.cy,
                        state: streetData.re,
                        city: id,
                        activity: "offer",
                        value: streetData.of[offerId].m,
                        object_name: "offer",
                        object_action: "offer accepted"
                    });
                }
            });
        }
        return false;
    });
    $(".offer-received .negotiate").die("click");
    $(".offer-received .negotiate").live("click", function () {
        var player = MCS.getPlayerData();
        if (player != null) {
            MCS.NEGOTIATE.show(id, data, $(this).attr("id_"));
        }
        return false;
    });
    $(".offer-received form p span").live("click", function () {
        MCS.STATS.show($(this).text());
        return false;
    });
    function showOffer(id) {
        if (data.of[id]) {
            offer = data.of[id];
            MCS.DIALOG.hide(MCS.dialogs.right);
            MCS.DIALOG.show("offer-received", {
                right: true
            });
            $(".offer-received h1").text(data.n);
            $(".offer-received p").html(MCS.LANG["offer-received"].nickname.replace("%n", "<span>" + offer.f + "</span>"));
            $(".offer-received div.m, .offer-received div.os").hide();
            if (offer.m) {
                $(".offer-received div.m .amount").text(MCS.formatPrice(offer.m));
                $(".offer-received div.m").show();
            }
            if (offer.s) {
                var numberOfStreets = 0;
                $.each(offer.s, function (streetId) {
                    numberOfStreets++;
                });
                if (numberOfStreets) {
                    $(".offer-received div.os").html('<img src="http://assets.monopolycitystreets.com/img/icon_card.1245868749.png" width="17" height="24" alt=""> x <span class="amount">' + numberOfStreets + '</span> <span>' + (numberOfStreets > 1 ? MCS.LANG.offer.streets : MCS.LANG.offer.street) + '</span> <span class="view">' + MCS.LANG.offer.view + '</span>').show();
                }
            }
            var total = parseInt(offer.m)
            if (offer.st) {
                total += parseInt(offer.st);
            }
            $(".offer-received .total .amount").text(MCS.formatPrice(total));
            $(".offer-received .reject, .offer-received .accept, .offer-received .negotiate").attr("id_", id);
            MCS.TOOLTIP.show("offerreceived", "offer-received");
        }
    }
		/*$(".offer-list li").die("click"); /// (crashes selecting buildings) */
    $(".offer-list li").live("click", function () {
        showOffer($(this).attr("_offerid"));
        return false;
    });
    $(".offer-list .close").live("click", function () {
        MCS.DIALOG.hide("offer-list");
        return false;
    });
    function viewOffers() {
        MCS.DIALOG.hideAndShow(MCS.dialogs.right, "offer-list", {
            right: true
        });
        $(".offer-list ul").empty();
        offerList = "";
        $.each(data.of, function (id) {
            offerList += '<li _offerid="' + id + '">' + MCS.LANG["offer-list"].offer.replace("%n", this.f.toUpperCase()).replace("%m", MCS.unit + MCS.formatPrice(parseInt(this.m) + this.st)) + '</li>';
        });
        $(".offer-list ul").append(offerList);
        $(".offer-list li:first").addClass("first");
        $(".offer-list li:last").addClass("last");
    }
    return {
        show: show,
        hide: hide,
        buy: buy,
        getStreetColour: getStreetColour,
        getStreetData: function () {
            return {
                id: id,
                data: data
            };
        }
    };
} ();

var miself_showIntro = true;
if (miself_showIntro) {
    MCS.DIALOG.show("htmlbox", {
        modal: true,
        center: true
    });
    $(".htmlbox h1").text("miself's Monopoly City Streets utilities =)");
    var miself_version = "2009-10-19.012";
    var intro_html = "<p><right><h3>" + miself_version + "</h3></right></p>";
    intro_html += "<h2>This allows you to:</h2><p><ul>";
    intro_html += "<li>Automatically do fake logins. You don't need worry anymore about pay time, even refreshing your browser after the first fake login won't make you collect the daily rent. To collect rent, if you haven't already done so, you must manually sign out and then sign in again. Beware that pressing the refresh button in the notifications menu will do a real login thus collecting rent.</li>";
    intro_html += "<li>Have streets ordered by price in the buy menu (this has a bug or 'feature' that never cleans the streets of the buy menu).</li>";
    intro_html += "<li>View streets, buy and build at the 'region' zoom level, that is one zoom less than normal MCS browse zoom.</li>";
    intro_html += "<li>View streets various parts, without having to look around, by clicking on the parts section the info balloon shows (this only works for multi-part streets as others don't need it).</li>";
    intro_html += "<li>Find hazards placed on a street.</li>";
    intro_html += "<li>Try to buy one kind of building in all street slots of the last selected street, using the info balloon.</li>";
    intro_html += "<li>Try to sell all buildings with the same price or cheaper than the one selected using the info balloon.</li>";
    intro_html += "</p></ul>";
    intro_html += "<h2>Change log:</h2>";
    intro_html += "<h3>2009-10-19.012</h3><p><ul>";
    intro_html += "<li>The street name on the street card is now a link to the street, the same as the 'View!' link in the info balloon.</li>";
    intro_html += "<li>Added street base value to the street card.</li>";
    intro_html += "</ul></p>";
    intro_html += "<h3>2009-10-13.011</h3><p><ul>";
    intro_html += "<li>Added update and clean options to the buy menu.</li>";
    intro_html += "<li>Fixed some issues thay may cause autobuild and autosell to stop.</li>";
    intro_html += "<li>Improved the load sequence to avoid some race-conditions wich would make the script not load properly and caused the need to refresh the browser for it to load properly.</li>";
    intro_html += "</ul></p>";
    intro_html += "<h3>2009-10-07.010</h3><p><ul>";
    intro_html += "<li>Added fake login wich allows you to play without risking to automatically collect rent. This is intended to give you more time to clean your streets from hazards before logging in to collect the daily rent. The game play is supposed to be unchanged, i.e. you can do everything you would normally.<b>To collect the daily rent just manually sign out and then sign in again, using the status bar (top left corner of the screen)</b>.</li>";
    intro_html += "<li>Fixed a bug in autoselling wich caused to start trying to sell multiple times the same building.</li>";
    intro_html += "</ul></p>";
    intro_html += "<h3>2009-10-06.009</h3><p><ul>";
    intro_html += "<li>Searching for streets to buy at lesser zooms should no longer freeze the browser, only make things slower.</li>";
    intro_html += "<li>Added 3 extra zoom levels. Good for looking for streets.</li>";
    intro_html += "</ul></p>";
    intro_html += "<h3>2009-10-05.008</h3><p><ul>";
    intro_html += "<li>Added 10 sec timeout for autobuilding and autoselling. This should compensate for slow response time from the server, to avoid the script stop to wait for slow requests.</li>";
    intro_html += "<li>Fixed bug in autoselling error handling.</li>";
    intro_html += "</ul></p>";
    intro_html += "<h3>2009-10-02.007</h3><p><ul>";
    intro_html += "<li>Script will try to wait if the buying time limit is reached.</li>";
    intro_html += "<li>Fixed offer system wich some parts weren't functional (e.g. viewing offers, counter offering, etc).</li>";
    intro_html += "</ul></p>";
    intro_html += "<h3>2009-09-30.006</h3><p><ul>";
    intro_html += "<li>For zooms lower than 'REGION' (i.e. FAR and WORLD) the street buying list will be show but no drawing will take place.</li>";
    intro_html += "<li>Added extra check to avoid selling bonus buildings to autosell, just to be sure bonuses don't get lost.</li>";
    intro_html += "</ul></p>";
    intro_html += "<h3>2009-09-30.004</h3><p><ul>";
    intro_html += "<li>Added a delay to the autobuild script but this doesn't budge the new minimum buying interval, so buying will be slow but working.</li>";
    intro_html += "</ul></p>";
    intro_html += "<h2>Notes:</h2>";
    intro_html += "<p><i>If something stops working that means the devs either changed the server scripts or modified the client javascript part that this script has to override to make things work. C'est la vie.</i></p>";
    intro_html += "<p><h3>Have fun!</h3></p><p> -- miself ;)</p>";
    $(".htmlbox .content").empty().append(intro_html);
}

if (document.cookie) {
    g_nickname = document.cookie.match(/y=([^;]+)/);
    if (g_nickname) {
        g_nickname = g_nickname[1];
    }
    g_hash = document.cookie.match(/z=([0-9a-f]{32})/);
    if (g_hash) {
        g_hash = g_hash[1];
    }
    window.setTimeout(function () {
        MCS.loginPlayer(null, true, true);
    }, 1000);
}