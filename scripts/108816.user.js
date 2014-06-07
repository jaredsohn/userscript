// ==UserScript==
// @name          Krowzer:MMHK
// @author        DH
// @description   Adds extra features to MMHK
// @include       http://mightandmagicheroeskingdoms.ubi.com/play*
// @match         http://mightandmagicheroeskingdoms.ubi.com/play*
// @include       https://mightandmagicheroeskingdoms.ubi.com/play*
// @match         https://mightandmagicheroeskingdoms.ubi.com/play*
// @grant         GM_getValue
// @grant         GM_setValue
// @version       1.3.6
// @date          2013-04-01
// ==/UserScript==


//How to play nicely with jQuery and Greasemonkey
//http://joanpiedra.com/jquery/greasemonkey/
(function () {
    var $;
    var KHOMMK;

    if (typeof unsafeWindow == 'undefined')
        unsafeWindow = window;

    if (typeof unsafeWindow.jQuery == 'undefined') {
        var jhead = document.getElementsByTagName('head')[0] || document.documentElement;
        var js = document.createElement('script');
        js.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
        js.type = 'text/javascript';
        jhead.insertBefore(js, jhead.firstChild);
        js.addEventListener('load', function () {
            waitForJquery();
        }, false);
    } else {
        waitForJquery();
    }

    function waitForJquery() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(waitForJquery, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            scriptsReady();
        }
    }

    function scriptsReady() {
        $(window).ready(function () {
            waitForHOMMK();
        });
    }

    function waitForHOMMK() {
        if (typeof unsafeWindow.HOMMK == 'undefined') {
            window.setTimeout(waitForHOMMK, 100);
        } else {
            window.setTimeout(function () {
                KHOMMK = window.HOMMK || unsafeWindow.HOMMK;
                krowzerUserScript();
            }, 2000);
        }
    }

    function krowzerUserScript() {
        createCssRules();
        $("body").append($('<div id="divKrowzerContainer"><h2>Krowzer:MMHK</h2></div>'));
        var $divKC = $('#divKrowzerContainer');
        var $btslide = $('<button id="btToggleToolbar" type="button">&gt;</button>').toggle(function () {
            $("#divKrowzerContainer button:not(#btToggleToolbar)").hide();
            $("#divKrowzerContainer").animate({ width: "150px" }, 500);
            $(this).html("&lt;");
        }, function () {
            $(this).html("&gt;");
            $("#divKrowzerContainer").animate({ width: "550px" }, 500, function () { $("#divKrowzerContainer button:not(#btToggleToolbar)").show(); });
        });
        $divKC.append($btslide);

        if (KHOMMK.player.content.allianceId) {
            buildPlayersOnline();
            $divKC.append($('<button id="btKrowzerPlayersOnlineFrame" type="button">Online</button>').click(function () { closeFrames(); getPlayersOnline(); $("#divKrowzerPlayersOnlineFrame").show(); }));
        }
        $divKC.append($('<button id="btKrowzerCityResourcesFrame" type="button">City Resources</button>').click(function () { closeFrames(); buildCityResourceTable(); }));
        $divKC.append($('<button id="btKrowzerCityTroopsFrame" type="button">City Troops</button>').click(function () { closeFrames(); buildCityTroopsTable(); }));
        if (KHOMMK.player.content.worldSeasonNumber >= 3) {
            $divKC.append($('<button id="btKrowzerFortressResourcesFrame" type="button">Fortress Resources</button>').click(function () { closeFrames(); getFortressResources(); }));
            $divKC.append($('<button id="btKrowzerFortressOverviewFrame" type="button">Fortress Overview</button>').click(function () { closeFrames(); getFortressList(); }));
            $("#FrameMainContainer").delegate('div[name="MarketPlaceCaravanTab"]', "click", function () {
                window.setTimeout(waitForCaravanTab, 500);
            });
        }
    }

    function KMMHK() {
        return window.HOMMK || unsafeWindow.HOMMK;
    }
    function waitForCaravanTab() {
        $("#FrameMainContainer .marketPlaceFrameCaravanRessource .marketPlaceFrameCaravanRessourceZone").each(function () {
            $(".btKrowzerMaxQuantity", this).remove();
            var capacity = $(".marketPlaceFrameCaravanCapacity", this).text().replace(/[^\d]/g, '');
            var $input = $(".marketPlaceCaravanResourceInput", this);
            $input.after($('<button type="button" class="btKrowzerMaxQuantity">+</button>').click(function () { $input.val(capacity); }));
        });

        $('#FrameMainContainer .marketPlaceFrameCaravanDestinationZone select[id$="CaravanDestination"] option[value^="RB"]').each(function () {
            var $o = $(this);
            if ($o.text().charAt(0) == '?') {
                $o.text($o.val().replace('RB_', ''));
            }
        });
    }

    function openFortressFrame(regionid) {
        KHOMMK.getFrame("RunicFortressRegionBuildingFrame", regionid).displayRefreshable();
    }
    function openAllianceFrame(allianceid) {
        KHOMMK.getFrame("ViewAllianceFrame", allianceid).displayRefreshable();
    }
    function openProfileFrame(profileid) {
        KHOMMK.getFrame("ProfileFrame", profileid).displayRefreshable();
    }
    function closeFrames() {
        $(".divKrowzerFrame").hide();
    }

    var getKeys = function (obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key + '<br/>');
        }
        return keys;
    }

    function ticksToTime(ticks) {
        var now = new Date();
        var d = new Date(ticks * 1000);
        var hour = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();
        var msperday = 24 * 60 * 60 * 1000;
        var timediff = (d.getTime() - now.getTime());
        var e_daysLeft = timediff / msperday;
        var daysLeft = Math.floor(e_daysLeft);
        var e_hrsLeft = (e_daysLeft - daysLeft) * 24;
        var hrsLeft = Math.floor(e_hrsLeft);
        var minsLeft = Math.floor((e_hrsLeft - hrsLeft) * 60);
        return ((hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec) + '<br/>' + hrsLeft + "h " + minsLeft + "m");
    }

    /* By: http://www.mredkj.com/javascript/nfbasic.html */
    function addCommas(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    function createCssRules() {
        var chatcss = '';
        if (!$("body").hasClass("VRcompactedChat")) {
            chatcss = '#ChatContainer .chatlatestmessage li{line-height:15px;padding:4px;}#ChatContainer ul.chatsystemspeaklist li{line-height:11px;font-size:11px;padding:4px 0;}#ChatContainer .chatsystemname{display:block;float:left;margin:0;overflow:hidden;width: 85px;}#ChatContainer .chatsystemspeakcontent{display:block;float:left;width:190px;}#ChatContainer .chatsystemtime{display:block;float:right;margin-right:1px;}';
        }
        var css = chatcss + '#ChatContainer .chatsystemptypeicon{display:none;}#ChatContainer .chatsysteminputbar{font-size:11px;}.timeLineDate{margin-top:0px;background-color:#000;width:30px}#divKrowzerContainer{background-color:#fff;font-family:Tahoma;font-size:11px;z-index:9999999;overflow:hidden;position:fixed;bottom:0px;left:0px;padding:0px;width:550px;border:solid 6px #A1E80b;border-bottom:0;}#divKrowzerContainer h2{background-color:#A1E80B;font-size:11px;color:#000;display:inline;margin:0 1px 0 0;padding:2px 6px;}#divKrowzerContainer button{background-color:orange;border:0;padding:0px;margin-right:1px;font-size:11px;}#divKrowzerContainer #btToggleToolbar{background-color:#A1E80B;margin-right:20px;color:#fff;font-weight:bold;}.divKrowzerFrame{font-family:Tahoma;bottom:25px;left:2px;background-color:#fff;font-size:11px;z-index:9999999;overflow:hidden;height:auto;position:fixed;padding:10px;border:solid 6px #009DE8;}#divKrowzerFortressResourcesFrame,#divKrowzerFortressOverviewFrame{height:600px;}#divKrowzerPlayersOnlineFrame{border:0 none;bottom:18px;left:0;padding:0;z-index:999999;}#divKrowzerPlayersOnlineFrame table{margin:0;}.divKrowzerFrame h2{font-size:14px;font-weight:bold;margin:0;padding:5px;background-color:#009de8;color:#fff;}.divKrowzerFrame h2 span{float:right;cursor:pointer;margin:0 2px;}.divKrowzerFrame .divKrowzerScroll{overflow:auto;height:95%;width:100%;margin-right:20px;}.divKrowzerFrame table{width:100%;border-top:1px solid #e5eff8;border-right:1px solid #e5eff8;margin:1em auto;border-collapse:collapse;}.divKrowzerFrame tr.trOdd td{background:#CFE7FE}.divKrowzerFrame tr.trHighlight td{background:#F7941D}.divKrowzerFrame tr.trHighlightOther td{background:#DDFF92}.divKrowzerFrame td{background-color:#fff;color:#000;border-bottom:1px solid #e5eff8;border-left:1px solid #e5eff8;padding:.3em 1em;text-align:center;white-space:nowrap;}.divKrowzerFrame td.tdLeft,.divKrowzerFrame th.thLeft{text-align:left;}.divKrowzerFrame th{background:#009DE8;text-align:center;font-weight:bold;color:#fff;white-space:nowrap;border-bottom: 1px solid #e5eff8;border-left:1px solid #e5eff8;padding:.3em 1em;}.divKrowzerFrame td.tdBold{font-weight:bold}.divKrowzerFrame td a{text-decoration:underline;}.divKrowzerFrame tfoot td{border-top: 3px solid #009DE8;font-weight:bold;}#divKrowzerCityResourceFrame td span{font-size:10px;}#divKrowzerCityTroopsFrame td .divUnitStack{float:left;text-align:center;margin:2px;}';
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        var rules = document.createTextNode(css);
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = rules.nodeValue;
        } else {
            style.appendChild(rules);
        }
        head.appendChild(style);
    }

    function buildPlayersOnline() {
        $("body").append($('<div id="divKrowzerPlayersOnlineFrame" class="divKrowzerFrame"><h2>Players Online<span class="spanClose">X</span></h2><div class="divKrowzerScroll"><table><tfoot><tr><td><button class="btRefreshOnline" type="button" style="font-size:11px;">Refresh list</button></td></tr></tfoot><tbody></tbody></table></div></div>'));
        $("#divKrowzerPlayersOnlineFrame .spanClose").click(function () { closeFrames(); });
        $("#divKrowzerPlayersOnlineFrame .btRefreshOnline").click(function () { getPlayersOnline(); });
        getPlayersOnline();
    }

    function updatePlayersOnline(json) {
        if (json) {
            var list = json.d["ViewAllianceFrame" + KHOMMK.player.content.allianceId].attachedPlayerList;
            if (list) {
                var _playersonline = [];
                var l = list.length;
                for (var i = 0; i < l; i++) {
                    var player = list[i];
                    if (player.status == 'ONLINE') {
                        _playersonline.push(player.name);
                    }
                }
                var l2 = _playersonline.length;
                var rows = '';
                var _playerrow = '<tr{0}><td>{1}</td></tr>';
                for (var i2 = 0; i2 < l2; i2++) {
                    rows += _playerrow.format((i2 % 2 != 0) ? '' : ' class="trOdd"', _playersonline[i2]);
                }
                var $tbody = $("#divKrowzerPlayersOnlineFrame table:first tbody");
                $tbody.children().remove();
                $tbody.append(rows);
            }
        }
    }

    function buildCityResourceTable() {
        $("#divKrowzerCityResourceFrame").remove();
        $("body").append($('<div id="divKrowzerCityResourceFrame" class="divKrowzerFrame"><h2>City Resources<span class="spanClose">X</span></h2></div>'));
        $("#divKrowzerCityResourceFrame .spanClose").click(function () { closeFrames(); });
        var tbl = '<div class="divKrowzerScroll"><table><thead><tr><th class="thLeft">Town</th><th>Gold</th><th>Wood</th><th>Ore</th><th>Mercury</th><th>Crystal</th><th>Sulfur</th><th>Gem</th></tr></thead>';
        var _townrow = '<tr{0}><td class="tdLeft">{1}</td><td>{2}<br/><span>{3}</span></td><td>{4}<br/><span>{5}</span></td><td>{6}<br/><span>{7}</span></td><td>{8}<br/><span>{9}</span></td><td>{10}<br/><span>{11}</span></td><td>{12}<br/><span>{13}</span></td><td>{14}<br/><span>{15}</span></td></tr>';
        var tbody = '<tbody>';
        var col = $(".regionCityCompleteViewRessourcesZone");
        var gold = wood = ore = mercury = crystal = sulfur = gem = 0;
        var goldp = woodp = orep = mercuryp = crystalp = sulfurp = gemp = 0;
        $.each(col, function (index, value) {
            var town = $("[id$='CompleteViewRegionCityName']", value).text();
            var col2 = $(".regionCityCompleteViewRessourceStackList .ressourceStackQuantity", value);
            var col3 = $(".regionCityCompleteViewRessourceStackList .ressourceStackIncome", value);
            var a = $(col2[0]).text(); var aa = $(col3[0]).text();
            var b = $(col2[1]).text(); var bb = $(col3[1]).text();
            var c = $(col2[2]).text(); var cc = $(col3[2]).text();
            var d = $(col2[3]).text(); var dd = $(col3[3]).text();
            var e = $(col2[4]).text(); var ee = $(col3[4]).text();
            var f = $(col2[5]).text(); var ff = $(col3[5]).text();
            var g = $(col2[6]).text(); var gg = $(col3[6]).text();
            gold += parseFloat(a.replace(',', ''));
            goldp += parseFloat(aa.replace(',', ''));
            wood += parseInt(b); woodp += parseInt(bb);
            ore += parseInt(c); orep += parseInt(cc);
            mercury += parseInt(d); mercuryp += parseInt(dd);
            crystal += parseInt(e); crystalp += parseInt(ee);
            sulfur += parseInt(f); sulfurp += parseInt(ff);
            gem += parseInt(g); gemp += parseInt(gg);
            tbody += _townrow.format((index % 2 == 0) ? ' class="trOdd"' : '', town, a, aa, b, bb, c, cc, d, dd, e, ee, f, ff, g, gg);
        });
        var tfoot = '<tfoot><tr><td></td><td>{0}<br/><span>{14}{1}</span></td><td>{2}<br/><span>+{3}</span></td><td>{4}<br/><span>+{5}</span></td><td>{6}<br/><span>+{7}</span></td><td>{8}<br/><span>+{9}</span></td><td>{10}<br/><span>+{11}</span></td><td>{12}<br/><span>+{13}</span></td></tr></tfoot>'.format(addCommas(gold), addCommas(goldp), wood, woodp, ore, orep, mercury, mercuryp, crystal, crystalp, sulfur, sulfurp, gem, gemp, goldp > 0 ? '+' : '');
        tbl += tfoot;
        tbl += tbody;
        tbl += '</tbody></table></div>';
        $('#divKrowzerCityResourceFrame').append(tbl);
    }

    function buildCityTroopsTable() {
        $("#divKrowzerCityTroopsFrame").remove();
        $("body").append($('<div id="divKrowzerCityTroopsFrame" class="divKrowzerFrame"><h2>City Troops<span class="spanClose">X</span></h2></div>'));
        $("#divKrowzerCityTroopsFrame .spanClose").click(function () { closeFrames(); });
        var tbl = '<div class="divKrowzerScroll"><table><thead><tr><th class="thLeft">Town</th><th>Town Units</th><th>Hero Units</th></tr></thead><tfoot><tr><td colspan="3"></td></tfoot>';
        var _townrow = '<tr{0}><td class="tdLeft">{1}</td><td>{2}</td><td>{3}</td></tr>';
        var tbody = '<tbody>';
        var col = $(".regionCity");
        $.each(col, function (index, value) {
            var townname = $("[id$='CompleteViewRegionCityName']", value).text();

            var townstacks = $("[id$='CompleteViewUnitStackList']", value).children().children();
            var htmltown = '';
            $.each(townstacks, function (index2, value2) {
                htmltown += '<div class="divUnitStack">' + $(value2).html() + '</div>';
            });

            var herostacks = $(".heroUnitStackListZone", value).children().children().children();
            var htmlhero = '';
            $.each(herostacks, function (index3, value3) {
                htmlhero += '<div class="divUnitStack">' + $(value3).html() + '</div>';
            });
            tbody += _townrow.format((index % 2 == 0) ? ' class="trOdd"' : '', townname, htmltown, htmlhero);

        });
        tbl += tbody;
        tbl += '</tbody></table></div>';
        $('#divKrowzerCityTroopsFrame').append(tbl);
    }

    function buildFortressResourceTable(json) {
        if (json) {
            $("#divKrowzerFortressResourcesFrame").remove();
            $("body").append($('<div id="divKrowzerFortressResourcesFrame" class="divKrowzerFrame"><h2>Fortress Resources<span class="spanClose">X</span></h2></div>'));
            $("#divKrowzerFortressResourcesFrame .spanClose").click(function () { closeFrames(); });
            var list = json.d["MarketPlaceFrame" + KHOMMK.sideBar.content.attachedRegionCityList[0].id].caravanDestinations.regionBuildingList;
            if (list) {
                var l = list.length;
                var tbl = '<div class="divKrowzerScroll"><table><thead><tr><th class="thLeft">Fortress</th><th>Floor</th><th>Next Level</th><th>Wood</th><th>Ore</th><th>M</th><th>C</th><th>S</th><th>G</th></tr></thead><tfoot><tr><td colspan="9"></td></tr></tfoot><tbody>';
                var _resourcerow = '<tr{0}><td class="tdLeft">{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td><td>{7}</td><td>{8}</td><td>{9}</td></tr>';
                var _qty = '{0}({1})';
                for (var i = 0; i < l; i++) {
                    var fortress = list[i];
                    var fortname = fortress.name.charAt(0) == '?' ? fortress.id : fortress.name;
                    if (fortress.upgradeComponentList) {
                        var colfloors = fortress.upgradeComponentList;
                        var fl = colfloors.length;
                        var realindex = 0;
                        for (var i3 = 0; i3 < 5; i3++) {
                            var floor = colfloors[realindex];
                            if (floor) {
                                var floornumber = parseInt(floor.label.replace('Level ', ''));
                                if ((floornumber - 1) == i3) {
                                    if (floor.upgradeResourceList) {
                                        var rl = floor.upgradeResourceList;
                                        var no = i3 + 1;
                                        var fn = (realindex == 0 ? fortname : '');
                                        var fnl = floor.nU.name;
                                        var w = o = m = c = s = g = '-';
                                        var l1 = rl.length;
                                        for (var ii = 0; ii < l1; ii++) {
                                            var resource = rl[ii];
                                            var qtyr = (resource.total - resource.remaining);
                                            var qty = _qty.format(qtyr > 0 ? '<strong>' + qtyr + '</strong>' : qtyr, resource.total);
                                            switch (resource.tagName) {
                                                case 'WOOD': w = qty; break;
                                                case 'ORE': o = qty; break;
                                                case 'MERCURY': m = qty; break;
                                                case 'CRYSTAL': c = qty; break;
                                                case 'SULFUR': s = qty; break;
                                                case 'GEM': g = qty; break;
                                            }
                                        }
                                        tbl += _resourcerow.format((i % 2 == 0) ? '' : ' class="trOdd"', fn, no, fnl, w, o, m, c, s, g);
                                    }
                                    realindex++;
                                } else {
                                    tbl += '<tr{0}><td class="tdLeft"></td><td>{1}</td><td>-</td><td colspan="6" class="tdCenter">Floor is full</td></tr>'.format((i % 2 == 0) ? '' : ' class="trOdd"', i3 + 1);
                                }
                            } else {
                                tbl += '<tr{0}><td class="tdLeft"></td><td>{1}</td><td>-</td><td colspan="6" class="tdCenter">Floor is full</td></tr>'.format((i % 2 == 0) ? '' : ' class="trOdd"', i3 + 1);
                            }
                        }
                    }
                }
                tbl += '</tbody></table></div>';
                $('#divKrowzerFortressResourcesFrame').append(tbl);
            }
        }
    }

    function buildFortressOverviewTable(json) {
        if (json) {
            $("#divKrowzerFortressOverviewFrame").remove();
            $("body").append($('<div id="divKrowzerFortressOverviewFrame" class="divKrowzerFrame"><h2>Fortress Overview<span class="spanClose">X</span></h2></div>'));
            $("#divKrowzerFortressOverviewFrame .spanClose").click(function () { closeFrames(); });
            $('#divKrowzerFortressOverviewFrame').append('<div class="divKrowzerScroll"><table id="tblFortressList"><thead><tr><th class="thLeft">Fortress</th><th>Owner</th><th>Cooldown</th><th>Total Strength</th><th>Gate</th><th>Floor 1</th><th>Floor 2</th><th>Floor 3</th><th>Floor 4</th><th>Floor 5</th></tr></thead><tfoot><tr><td colspan="10"></td></tr></tfoot><tbody></tbody></table></div>');
            var _row = '<tr{0}><td class="tdLeft"><a class="aFortress">{1}</a></td><td><a class="aOwner">{2}</a></td><td class="tdBold">{3}</td><td class="tdBold">{4}</td><td class="tdLeft">{5}</td><td class="tdLeft">{6}</td><td class="tdLeft">{7}</td><td class="tdLeft">{8}</td><td class="tdLeft">{9}</td><td class="tdLeft">{10}</td></tr>';
            var _gate = 'Type: antimagic<br/>Keeper: {0}<br/>Strength: <strong>{1}</strong>';
            var _floor = 'Type: {0}<br/>Combat: {1}<br/>Strength: <strong>{2}</strong>';
            var list = json.d["RegionBuildingListFrame" + KHOMMK.worldMap.elementId].regionBuildingList;
            if (list) {
                var l = list.length;
                for (var i = 0; i < l; i++) {
                    var fortress = list[i];
                    getFortress(fortress, function (fort, fortdata) {
                        var datan = fortdata.d["RunicFortressRegionBuildingFrame" + fort.regionId];
                        if (datan) {
                            var cooldown = gate = floor1 = floor2 = floor3 = floor4 = floor5 = '';
                            var totalstrength = 0;
                            var isalliance = KHOMMK.player.content.allianceId == fort.ownerAllianceId;
                            var isnotcontrolled = fort.ownerName == 'Not controlled';
                            if (datan.pCD) {
                                cooldown = ticksToTime(datan.pCD);
                            }
                            var fortname = fort.name.charAt(0) == '?' ? ('Id: ' + fort.id + '</a><br/>RId: ' + KHOMMK.getRegionNumberFromXY(fort.regionX, fort.regionY) + '<br/>XY: ' + (fort.regionX + ':' + fort.regionY) + '<a>') : fort.name;
                            if (isnotcontrolled) {
                                var keeper = datan.floorsUnitStacks[0][0];
                                var armypower = (keeper.unitEntityPower * keeper.quantity);
                                totalstrength = armypower;
                                gate = _gate.format(keeper.unitEntityName, armypower);
                                var $grow = $(_row.format('', fortname, fort.ownerName, '', totalstrength, gate, '', '', '', '', ''));
                                $(".aFortress", $grow).click(function () {
                                    e.preventDefault();
                                    closeFrames();
                                    openFortressFrame(fort.regionId);
                                });
                                $(".aOwner", $grow).click(function (e2) {
                                    e2.preventDefault();
                                });
                                $("#tblFortressList tbody").append($grow);
                            } else {
                                var as0 = as1 = as2 = as3 = as4 = as5 = 0;
                                var dt1 = pct1 = dt2 = pct2 = dt3 = pct3 = dt4 = pct4 = dt5 = pct5 = '';
                                if (datan.hero) {
                                    var hero = datan.hero;
                                    as0 = hero.armyPower;
                                    gate = _gate.format(hero.playerName, hero.armyPower);
                                }
                                var floors = datan.floorsUnitStacks;
                                var compts = datan.regionBuildingComponentList;
                                if (floors) {
                                    if (floors.floor1) {
                                        var f1col = floors.floor1;
                                        for (var f1 = 0; f1 < f1col.length; f1++) { as1 += (f1col[f1].unitEntityPower * f1col[f1].quantity); }
                                    }
                                    if (floors.floor2) {
                                        var f2col = floors.floor2;
                                        for (var f2 = 0; f2 < f2col.length; f2++) { as2 += (f2col[f2].unitEntityPower * f2col[f2].quantity); }
                                    }
                                    if (floors.floor3) {
                                        var f3col = floors.floor3;
                                        for (var f3 = 0; f3 < f3col.length; f3++) { as3 += (f3col[f3].unitEntityPower * f3col[f3].quantity); }
                                    }
                                    if (floors.floor4) {
                                        var f4col = floors.floor4;
                                        for (var f4 = 0; f4 < f4col.length; f4++) { as4 += (f4col[f4].unitEntityPower * f4col[f4].quantity); }
                                    }
                                    if (floors.floor5) {
                                        var f5col = floors.floor5;
                                        for (var f5 = 0; f5 < f5col.length; f5++) { as5 += (f5col[f5].unitEntityPower * f5col[f5].quantity); }
                                    }
                                }
                                if (compts) {
                                    if (compts.floor1) {
                                        var cf1 = compts.floor1;
                                        if (cf1.defenseType) { dt1 = cf1.defenseType.replace('_', ' ').toLowerCase(); }
                                        if (cf1.playerCombatType) { pct1 = cf1.playerCombatType.toLowerCase(); }
                                    }
                                    if (compts.floor2) {
                                        var cf2 = compts.floor2;
                                        if (cf2.defenseType) { dt2 = cf2.defenseType.replace('_', ' ').toLowerCase(); }
                                        if (cf2.playerCombatType) { pct2 = cf2.playerCombatType.toLowerCase(); }
                                    }
                                    if (compts.floor3) {
                                        var cf3 = compts.floor3;
                                        if (cf3.defenseType) { dt3 = cf3.defenseType.replace('_', ' ').toLowerCase(); }
                                        if (cf3.playerCombatType) { pct3 = cf3.playerCombatType.toLowerCase(); }
                                    }
                                    if (compts.floor4) {
                                        var cf4 = compts.floor4;
                                        if (cf4.defenseType) { dt4 = cf4.defenseType.replace('_', ' ').toLowerCase(); }
                                        if (cf4.playerCombatType) { pct4 = cf4.playerCombatType.toLowerCase(); }
                                    }
                                    if (compts.floor5) {
                                        var cf5 = compts.floor5;
                                        if (cf5.defenseType) { dt5 = cf5.defenseType.replace('_', ' ').toLowerCase(); }
                                        if (cf5.playerCombatType) { pct5 = cf5.playerCombatType.toLowerCase(); }
                                    }
                                }
                                totalstrength += (as0 + as1 + as2 + as3 + as4 + as5);
                                floor1 = _floor.format(dt1, pct1, as1);
                                floor2 = _floor.format(dt2, pct2, as2);
                                floor3 = _floor.format(dt3, pct3, as3);
                                floor4 = _floor.format(dt4, pct4, as4);
                                floor5 = _floor.format(dt5, pct5, as5);
                                var $row = $(_row.format(isalliance ? ' class="trHighlight"' : ' class="trOdd"', fortname, fort.ownerName, cooldown, totalstrength, gate, floor1, floor2, floor3, floor4, floor5));
                                $(".aFortress", $row).click(function (e1) {
                                    e1.preventDefault();
                                    closeFrames();
                                    openFortressFrame(fort.regionId);
                                });
                                $(".aOwner", $row).click(function (e2) {
                                    e2.preventDefault();
                                    closeFrames();
                                    openAllianceFrame(datan.ownerAllianceId);
                                });
                                $("#tblFortressList tbody").append($row);
                            }
                        }
                    });
                }
            }
        }
    }

    function buildCityMinesTable(json) {
        if (json) {
            $("#divKrowzerCityMinesFrame").remove();
            $("body").append($('<div id="divKrowzerCityMinesFrame" class="divKrowzerFrame"><h2>Mines<span class="spanClose">X</span></h2></div>'));
            $("#divKrowzerCityMinesFrame .spanClose").click(function () { closeFrames(); });
            $('#divKrowzerCityMinesFrame').append('<div class="divKrowzerScroll"><table id="tblMineList"><thead><tr><th class="thLeft">Fortress</th><th>Owner</th><th>Cooldown</th><th>Total Strength</th><th>Gate</th><th>Floor 1</th><th>Floor 2</th><th>Floor 3</th><th>Floor 4</th><th>Floor 5</th></tr></thead><tfoot><tr><td colspan="10"></td></tr></tfoot><tbody></tbody></table></div>');
            var _row = '<tr{0}><td class="tdLeft"><a class="aFortress">{1}</a></td><td><a class="aOwner">{2}</a></td><td class="tdBold">{3}</td><td class="tdBold">{4}</td><td class="tdLeft">{5}</td><td class="tdLeft">{6}</td><td class="tdLeft">{7}</td><td class="tdLeft">{8}</td><td class="tdLeft">{9}</td><td class="tdLeft">{10}</td></tr>';

            var list = json.d["RegionBuildingListFrame" + KHOMMK.worldMap.elementId].regionBuildingList;
            if (list) {
                var l = list.length;
                for (var i = 0; i < l; i++) {
                    var city = list[i];
                    getFortress(city.regionId, function (regionid, data) {
                        var datan = data.d["RegionMap" + regionId];
                        if (datan) {

                            var $row = $(_row.format(isalliance ? ' class="trHighlight"' : ' class="trOdd"', fortname, fort.ownerName, cooldown, totalstrength, gate, floor1, floor2, floor3, floor4, floor5));

                        }
                    });
                }
            }
        }
    }

    function getPlayersOnline() {
        var DTO = { "elParamList": [{ "elementType": "ViewAllianceFrame", "elementId": KHOMMK.player.content.allianceId}] }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", 'http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/getContent', false);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                updatePlayersOnline(JSON.parse(xmlhttp.responseText) || null);
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlhttp.setRequestHeader("X-Request", "JSON");
        xmlhttp.send('json=' + JSON.stringify(DTO));
    }

    function getCityList(sender) {
        var DTO = { "elParamList": [{ "elementType": "ProfileFrame", "elementId": KHOMMK.player.content.id}] };
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", 'http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/getContent', false);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                switch (sender) {
                    case 'fr': buildFortressResourceTable(JSON.parse(xmlhttp.responseText) || null); break;
                    case 'rrl': buildResourceRequestTable(JSON.parse(xmlhttp.responseText) || null); break;
                }
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlhttp.setRequestHeader("X-Request", "JSON");
        xmlhttp.send('json=' + JSON.stringify(DTO));
    }

    function getFortressList() {
        var DTO = { "elParamList": [{ "elementType": "RegionBuildingListFrame", "elementId": KHOMMK.worldMap.elementId}] };
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", 'http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/getContent', false);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                buildFortressOverviewTable(JSON.parse(xmlhttp.responseText) || null);
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlhttp.setRequestHeader("X-Request", "JSON");
        xmlhttp.send('json=' + JSON.stringify(DTO));
    }

    function getFortress(fort, callback) {
        var DTO = { "elParamList": [{ "elementType": "RunicFortressRegionBuildingFrame", "elementId": fort.regionId}] };
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", 'http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/getContent', false);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                callback(fort, JSON.parse(xmlhttp.responseText.replace(/"(\d)":\[\{"/g, '"floor$1":[{"').replace(/"(\d)":\{"/g, '"floor$1":{"') || null));
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlhttp.setRequestHeader("X-Request", "JSON");
        xmlhttp.send('json=' + JSON.stringify(DTO));
    }

    function getFortressResources() {
        var DTO = { "elParamList": [{ "elementType": "MarketPlaceFrame", "elementId": KHOMMK.sideBar.content.attachedRegionCityList[0].id}] };
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", 'http://mightandmagicheroeskingdoms.ubi.com/ajaxRequest/getContent', true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                buildFortressResourceTable(JSON.parse(xmlhttp.responseText) || null);
            }
        };
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlhttp.setRequestHeader("X-Request", "JSON");
        xmlhttp.send('json=' + JSON.stringify(DTO));
    }

    String.prototype.format = function () {
        var txt = this, i = arguments.length;
        while (i--) {
            txt = txt.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
        }
        return txt;
    };
})();
