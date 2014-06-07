// ==UserScript==
// @name			Prueba de conexion
// @version			1.0
// @author			DonPipo
// @namespace		probando_script
// @description		probando script
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        	http://malsup.github.com/jquery.blockUI.js
// @require			http://hosting-files.googlecode.com/files/jquery.tipsy.js
// @require			http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @include			http://*.erepublik.com/*
// @downloadURL		http://userscripts.org/scripts/source/158461.user.js
// @updateURL		http://userscripts.org/scripts/source/158461.meta.js

// ==/UserScript==

function ExchangeMarketButtons() {
    function e(e, i, s) {
        var o = "/" + unsafeWindow.culture + "/economy/exchange/purchase/",
            u = $("#buy_currency").val(),
            a = $("#page").val();
        if (isNaN(u)) u = 1;
        if (isNaN(a)) a = 0;
        var f = {
            _token: $("#_token").val(),
            offerId: i,
            amount: s,
            page: a,
            currencyId: u
        };
        $.post(o, f, function (s, o, u) {
            if (s.error) unsafeWindow.throwError(s.message, $(e).parent().parent().find(".ex_citizen"));
            else {
                if (navigator.userAgent.toLowerCase().indexOf("mozilla") > -1) {
                    alert("Offer bought");
                    window.location.reload()
                } else {
                    if (s.buy_mode) $(".buy_mode").html(s.buy_mode);
                    if (s.essentials) $(".essentials").html(s.essentials);
                    unsafeWindow.updateAccounts(s.gold.value, s.ecash.value);
                    if (s.hideOffer) unsafeWindow.handleSuccessMsg(true, s.message);
                    else unsafeWindow.throwSuccess(s.message, $("#purchase_" + i).parent().parent().find(".ex_citizen"));
                    r();
                    n();
                    t()
                }
            }
        }, "json")
    }
    function t() {
        $("button[id^=max_]").click(function () {
            var t = $(this).attr("id").split("_")[1],
                n = parseFloat($(this).parent().parent().find(".ex_amount span").html()) > 10 ? 10 : parseFloat($(this).parent().parent().find(".ex_amount strong span").text()),
                r = parseFloat($("#exchange_rate_" + t + " span").html()),
                i = n * r,
                s = parseFloat($("#eCash").val());
            if (i > s) n = s / r;
            e(this, t, n)
        });
        $("button[id^=all_]").click(function () {
            var t = $(this).attr("id").split("_")[1],
                n = parseFloat($(this).parent().parent().find(".ex_amount strong span").text()) > 10 ? 10 : parseFloat($(this).parent().parent().find(".ex_amount strong span").text());
            e(this, t, n)
        })
    }
    function n() {
        $(".buy_mode .ex_buy").each(function () {
            var e = $("button", this),
                t = e.attr("id").split("_")[1];
            $(this).append('<button type="button" id="max_' + t + '">Max</button>');
            $(this).append('<button type="button" id="all_' + t + '">All</button>');
            if (navigator.userAgent.toLowerCase().indexOf("mozilla") > -1) $("button[id^=max_]", this).css("margin", "0 4px")
        })
    }
    function r() {
        $(".buy_mode .ex_amount").css("width", "80px");
        $(".buy_mode .ex_amount").css("padding-right", "50px");
        $(".buy_mode .ex_buy").css("width", "310px")
    }
    r();
    n();
    t();
    unsafeWindow.jQuery("body").ajaxComplete(function (e, i, s) {
        if (s.url.indexOf("/economy/exchange/retrieve/") > 0) {
            r();
            n();
            t()
        }
    })
}



function ImproveInventory() {
    function e() {
        $("#inventory_overview #sell_offers table th input").css("width", "50px");
        $("#inventory_overview #sell_offers table th.offers_product").css("width", "70px");
        $("#inventory_overview #sell_offers table th.offers_price").css("width", "120px");
        $("#inventory_overview #sell_offers table th.offers_quantity").css("width", "80px");
        $("#inventory_overview #sell_offers table th.offers_market").css("width", "60px");
        $("#inventory_overview #sell_offers table th.offers_action").css("width", "132px");
        $("#inventory_overview #sell_offers table th.offers_action a").css("left", "10px");
        $("#inventory_overview #sell_offers table th.offers_action a").css("margin-right", "20px");
        $("#inventory_overview #sell_offers table .delete_offer").css("opacity", "1")
    }
    var t = {
        createButton: function (t) {
            if ($("#visit_market", t).length > 0) return;
            var n = $(".offer_flag", t).attr("src").split("/")[6] ? t.find(".offer_flag").attr("src").split("/")[6].split(".")[0] : t.find(".offer_flag").attr("src").split("/")[4].split(".")[0],
                r = $(".offer_image", t).attr("src").split("/")[6] ? t.find(".offer_image").attr("src").split("/")[6] : t.find(".offer_image").attr("src").split("/")[4],
                i = $(".offer_image", t).attr("src").split("/")[7] ? t.find(".offer_image").attr("src").split("/")[7].split("_")[0] : t.find(".offer_image").attr("src").split("/")[5].split("_")[0],
                s = i.indexOf("q") != -1 ? i.replace("q", "") : "1",
                o = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABGdJREFUeNqsVU1sVUUYPTNz73uPttDSFmKEWIMYSdSICRWQgEFdaPAvxGhcqGsFVwZduHDLSmOIC4wL2ZjoApsYNRpLhCghRmhDrDSlxRSrNPSH1sfre/dnZjzf3PdqdyTWe3PfvDt37pnzne9831Xee7z9xVmfWQfrPFZ7WOLdTDJ88spjSr3x2Wmf5i5M5M7h/zjqmUUjSRBVGxlqKa8kh/OrZ654OWthkwYiYSuSCLDw1uHxfz986yRuBF9MuRWgjvdaRh+TSh7+1xcXYG3SZKfhvYXhqbSF1xVUurrgnOIMKTYViAQYK6R2zRd9ZODzDFopZFxz5Knd2NBRQhyXmDQFZTRHea4xdW0Ox8+NMeySMCrAeUXFHxfYCSfLAIzibmlEIAJQshL5XJi6gf47unH05CmU1q/lduQdlxlYA0effRhOTcB4FERlJGakuJMSvWUkSyM5qNeRL80hy5cQG0OLanw/PwVf34r3X34c7w0O4ToVUvUaELdjjc4DhneMxLsAvIK5cOYEQeThvq09OLjrUXS3t9G4BNcpaks5rZphHec2b+jB9NhlhtjBdxOUK50cM8YSQ+pGkaBsFglouKHXicxNNV7avQMnh8fxw9hkWOxzi+0b23Hkmf04dvoiLvw2gf5NGzE1P4+ZvIwyM6ddxAhtICfAwjUSy0gYKsgkJrLoWRfjx9FJRExQZBu4u7cLhw/sxbEzQ/hp5Hfs7OvBW889ghuNGl794HNUDH1NbxvtQkJ9UMOSuW+C8gbNtGplUOZlVIbbe9vwwr5tOH7mF1wa/wt7tvTgzaf3o8qK/ubin/j4tRe5PobgKFuAK1+MGkEfkcaGCzYvFjJJve0l7LqnD98OX8Xc7AJ2bOnGoSf2YGBoggwsvjp/GYNjVzFbYy1Q+0AwSFJIo4MvV14sGpGqTOf0dXdi9I8ZzNXq2NRZwYH+BzAwfAWfnh3B2rhCjev48udxvH5iACqjOcXHruUWsaJvMg9VxZ1zjYzU20sGc9UaEnp+DQvl3jvvwndDVzDIXEh+sjwnEVZwnlDriEXlkegMccYG0rR3YcUW61BGPJ1BmqaoGjGXRsf6NpwbncDw1DQD4/OsjlS5UEDKS8WmfJ9F12LuisKMWob3Li+SyfmZxb9x/+ZuDF+aDBMLs7PsdAluI0NiYft927Cw2OB77CQEVoxWKRecptkaPArdQ+MqEuqXe+bItet48qEH8fzendBG1jlGwI4gFcxl1UaCXyen6W1aMDQC/loWoEYhr7jGS+Na9qULyFQLJ74+D2d8uAvAqoRU2xCVrDWafTGPJD3sO+TLTbU0u2ZvkQ2WNQ+ByEtC2xeOYR8N/cdQB4eEHuZzz+XiUyuBN5gNU7xHwFyanVP/yiLgOX3tWPrGSSPIuGOrP7pm8y96uA4zNjS30Jq9bOyKqJtytT4VyEWmDNHizSWC09u+Bba6Q2rEZilrkcVYrVZx8N2PaJasYHGrD+StdvfFJ+7Uh++ofwQYAOiQsoUzvoqZAAAAAElFTkSuQmCC",
                u = $(".offer_amount", t).text().replace(/,/g, ""),
                a = $(".offer_price strong", t).text().replace(/,/g, ""),
                f = $(t).attr("id").split("_")[1],
                l = $("#large_sidebar .user_section .user_info a").text();
            $(".delete_offer", t).before('<a title="Visit market" target="_blank" class="fluid_blue_dark_small" style="padding-left: 3px;" id="visit_market" href="http://www.erepublik.com/' + unsafeWindow.culture + "/economy/market/" + country[n].id + "/" + r + "/" + s + '/citizen/0/price_asc/1"><span>M</span></a>' + '<a original-title="<b>Show offer on market</b><br>This only works for those who have installed <i>eRepublik Stuff</i> script <b>1.7.0</b> or newer." id="goto_offer" href="http://www.erepublik.com/' + unsafeWindow.culture + "/economy/market/" + country[n].id + "/" + r + "/" + s + "?customOffer=true&sellerId=" + eRS.citizenId + "&sellerName=" + l + "&offerId=" + f + "&offerAmount=" + u + "&offerPrice=" + a + '" target="_blank" style="height: 23px; width: 23px; display: inline-block; margin-left: 10px;"><img src="' + o + '"></a>');
            $("#goto_offer").tipsy({
                gravity: "s",
                html: true
            });
            e()
        },
        waitForOffer: function (e) {
            if ($("#" + e).length == 1) t.createButton($("#" + e));
            else setTimeout(function () {
                waitForOffer(e)
            }, 500)
        }
    };
    var n = {
        createHolder: function (e) {
            if ($("td.net_price", e).length > 0) return;
            $("td.offer_price", e).after('<td class="offer_price net_price"></td>')
        },
        createHeader: function () {
            var e = $("#inventory_overview #sell_offers table th.offers_price(.net_price):not(.total_net_price)").clone();
            e.addClass("net_price");
            e.css("width", "75px");
            e.find("input").after('<span id="netPrice"></span>').remove();
            e.find("#converted").text("Net / unit");
            e.find("small").remove();
            $("#inventory_overview #sell_offers table th.offers_price").after(e);
            n.headerNetPrice();
            $("#sell_price").keyup(function () {
                n.headerNetPrice()
            })
        },
        headerNetPrice: function () {
            var e = img_country[$("#market_select img").attr("src").split("/")[6] ? $("#market_select img").attr("src").split("/")[6].split(".")[0] : $("#market_select img").attr("src").split("/")[4].split(".")[0]].id,
                t = parseInt($("#product_select img").attr("src").split("/")[6] ? $("#product_select img").attr("src").split("/")[6] : $("#product_select img").attr("src").split("/")[4]);
            price = parseFloat($("#sell_price").val()), vat = parseFloat(unsafeWindow.countryList[e]["taxes"][t]["value_added_tax"]), importTax = parseFloat(unsafeWindow.countryList[e]["taxes"][t]["import_tax"]), tax = vat;
            if (e != unsafeWindow.citizenshipCountry) {
                tax += importTax
            }
            var n = price / ((100 + tax) / 100);
            $("#inventory_overview #sell_offers table #netPrice").text(n.toFixed(2));
            r.calculateSum()
        },
        netPrice: function (e) {
            var t = img_country[e.find(".offer_flag").attr("src").split("/")[6] ? e.find(".offer_flag").attr("src").split("/")[6].split(".")[0] : e.find(".offer_flag").attr("src").split("/")[4].split(".")[0]].id,
                n = parseInt(e.find(".offer_image").attr("src").split("/")[6] ? e.find(".offer_image").attr("src").split("/")[6] : e.find(".offer_image").attr("src").split("/")[4]);
            price = parseFloat($("td.offer_price:not(.net_price) strong", e).text().replace(",", "")), vat = parseFloat(unsafeWindow.countryList[t]["taxes"][n]["value_added_tax"]), importTax = parseFloat(unsafeWindow.countryList[t]["taxes"][n]["import_tax"]), tax = vat;
            if (t != unsafeWindow.citizenshipCountry) {
                tax += importTax
            }
            var i = price / ((100 + tax) / 100);
            $("td.net_price", e).html("<strong>" + i.toFixed(2) + "</strong> " + $("#sell_currency").text());
            r.calculateSum()
        },
        waitForOffer: function (e) {
            if ($("#" + e).length == 1) {
                n.createHolder($("#" + e));
                n.netPrice($("#" + e))
            } else {
                setTimeout(function () {
                    n.waitForOffer(e)
                }, 500)
            }
        }
    };
    var r = {
        createRow: function () {
            $("#inventory_overview #sell_offers table").append("<tfoot>" + '<tr style="background: #F7FCFF; height: 44px;">' + '<td colspan="4">' + '<td class="offer_price total_net_price">' + '<strong id="sumPrice"></strong>' + " " + $("#sell_currency").text() + "</td>" + '<td colspan="2"></td>' + "</tr>" + "</tfoot>");
            r.calculateSum()
        },
        calculateSum: function () {
            $("#sumPrice").text("0.00");
            $("#inventory_overview #sell_offers table tbody tr[id^=offer_]:visible").each(function () {
                var e = parseFloat($(".total_net_price strong", this).text()),
                    t = parseFloat($("#sumPrice").text()) + e;
                $("#sumPrice").text(t.toFixed(2))
            })
        },
        waitForOffer: function (e) {
            if ($("#" + e).length == 1) {
                r.calculateSum()
            } else {
                setTimeout(function () {
                    r.waitForOffer(e)
                }, 500)
            }
        },
        waitToDissapear: function (e) {
            if ($("#" + e + ":visible").length == 0) {
                r.calculateSum()
            } else {
                setTimeout(function () {
                    r.waitToDissapear(e)
                }, 500)
            }
        }
    };
    var i = {
        createHeader: function () {
            var e = $("#inventory_overview #sell_offers table th.offers_price:not(.net_price):not(.total_net_price)").clone();
            e.addClass("total_net_price");
            e.css("width", "100px");
            e.find("input").after('<span id="totalNetPrice"></span>').remove();
            e.find("#converted").text("Total Net Value");
            e.find("small").remove();
            $("#inventory_overview #sell_offers table th.offers_price").eq(1).after(e);
            i.headerTotalNetPrice();
            $("#sell_price").keyup(function () {
                i.headerTotalNetPrice()
            })
        },
        headerTotalNetPrice: function () {
            var e = parseFloat($("#netPrice").text()),
                t = isNaN(parseInt($("#sell_amount").val())) ? 0 : parseInt($("#sell_amount").val()),
                n = e * t;
            $("#totalNetPrice").text(n.toFixed(2))
        },
        createHolder: function (e) {
            if ($("td.total_net_price", e).length > 0) return;
            $("td.net_price", e).after('<td class="offer_price total_net_price"></td>')
        },
        totalNetPrice: function (e) {
            var t = parseFloat($("td.net_price strong", e).text()),
                n = parseInt($(".offer_amount", e).text().replace(",", "")),
                i = t * n;
            $("td.total_net_price", e).html("<strong>" + i.toFixed(2) + "</strong> " + $("#sell_currency").text());
            r.calculateSum()
        },
        waitForOffer: function (e) {
            if ($("#" + e).length == 1) {
                i.createHolder($("#" + e));
                i.totalNetPrice($("#" + e))
            } else {
                setTimeout(function () {
                    i.waitForOffer(e)
                }, 500)
            }
        }
    };
    var s = {
        createTable: function () {
            $("#sell_offers").after('<div class="taxTable" style="display: block;">' + '<table width="100%">' + "<thead>" + "<tr>" + '<th style="height: 40px; text-align: center; padding-left: 0px;"> </th>' + '<th style="height: 40px; text-align: center; padding-left: 0px;">' + '<img width="35px" height="35px" src="http://www.erepublik.com/images/icons/industry/1/default.png" title="Food">' + "</th>" + '<th style="height: 40px; text-align: center; padding-left: 0px;">' + '<img width="35px" height="35px" src="http://www.erepublik.com/images/icons/industry/2/default.png" title="Weapons">' + "</th>" + '<th style="height: 40px; text-align: center; padding-left: 0px;">' + '<img width="35px" height="35px" src="http://www.erepublik.com/images/icons/industry/3/default.png" title="Tickets">' + "</th>" + '<th style="height: 40px; text-align: center; padding-left: 0px;">' + '<img width="35px" height="35px" src="http://www.erepublik.com/images/icons/industry/5/default.png" title="Hospital">' + "</th>" + '<th style="height: 40px; text-align: center; padding-left: 0px;">' + '<img width="35px" height="35px" src="http://www.erepublik.com/images/icons/industry/6/default.png" title="Defence Systems">' + "</th>" + '<th style="height: 40px; text-align: center; padding-left: 0px;">' + '<img width="35px" height="35px" src="http://www.erepublik.com/images/icons/industry/7/default.png" title="Food raw materials">' + "</th>" + '<th style="height: 40px; text-align: center; padding-left: 0px;">' + '<img width="35px" height="35px" src="http://www.erepublik.com/images/icons/industry/12/default.png" title="Weapons raw materials">' + "</th>" + "</tr>" + "</thead>" + "<tbody></tbody>" + "</table>" + "</div>");
            s.populateTable();
            $("#inventory_overview .taxTable table tbody td").each(function () {
                var e = $(this).width();
                $(".taxLinkHolder", this).width(e - 4)
            })
        },
        populateTable: function () {
            $("#market_licenses_select .ml_repeat li").each(function () {
                function e(e, t, n) {
                    return '<a href="http://www.erepublik.com/' + unsafeWindow.culture + "/economy/market/" + e + "/" + t + "/" + n + '/citizen/0/price_asc/1" target="_blank"><div class="taxLinkItem">Q' + n + "</div></a>"
                }
                var t = img_country[$(this).find("img").attr("src").split("/")[6].split(".")[0]].id,
                    n = {
                        1: parseFloat(unsafeWindow.countryList[t].taxes["1"].value_added_tax),
                        2: parseFloat(unsafeWindow.countryList[t].taxes["2"].value_added_tax),
                        3: parseFloat(unsafeWindow.countryList[t].taxes["3"].value_added_tax),
                        5: parseFloat(unsafeWindow.countryList[t].taxes["5"].value_added_tax),
                        6: parseFloat(unsafeWindow.countryList[t].taxes["6"].value_added_tax),
                        7: parseFloat(unsafeWindow.countryList[t].taxes["7"].value_added_tax),
                        12: parseFloat(unsafeWindow.countryList[t].taxes["12"].value_added_tax)
                    };
                if (t != unsafeWindow.citizenshipCountry) {
                    n["1"] += parseFloat(unsafeWindow.countryList[t].taxes["1"].import_tax);
                    n["2"] += parseFloat(unsafeWindow.countryList[t].taxes["2"].import_tax);
                    n["3"] += parseFloat(unsafeWindow.countryList[t].taxes["3"].import_tax);
                    n["5"] += parseFloat(unsafeWindow.countryList[t].taxes["5"].import_tax);
                    n["6"] += parseFloat(unsafeWindow.countryList[t].taxes["6"].import_tax);
                    n["7"] += parseFloat(unsafeWindow.countryList[t].taxes["7"].import_tax);
                    n["12"] += parseFloat(unsafeWindow.countryList[t].taxes["12"].import_tax)
                }
                $("#inventory_overview .taxTable table tbody").append("<tr>" + '<td style="padding-left: 5px;">' + '<img style="vertical-align: top;" src="' + $("img", this).attr("src") + '"> ' + $("img", this).attr("alt") + "</td>" + '<td class="taxLink" style="text-align: center; padding-left: 0px;">' + '<div class="taxLinkHolder">' + '<div class="taxLinkItemTransparent"> </div>' + e(t, 1, 1) + e(t, 1, 2) + e(t, 1, 3) + e(t, 1, 4) + e(t, 1, 5) + e(t, 1, 6) + e(t, 1, 7) + "</div>" + "<span>" + n["1"] + "%</span>" + "</td>" + '<td class="taxLink" style="text-align: center; padding-left: 0px;">' + '<div class="taxLinkHolder">' + '<div class="taxLinkItemTransparent"> </div>' + e(t, 2, 1) + e(t, 2, 2) + e(t, 2, 3) + e(t, 2, 4) + e(t, 2, 5) + e(t, 2, 6) + e(t, 2, 7) + "</div>" + "<span>" + n["2"] + "%</span>" + "</td>" + '<td class="taxLink" style="text-align: center; padding-left: 0px;">' + '<div class="taxLinkHolder">' + '<div class="taxLinkItemTransparent"> </div>' + e(t, 3, 1) + e(t, 3, 2) + e(t, 3, 3) + e(t, 3, 4) + e(t, 3, 5) + "</div>" + "<span>" + n["3"] + "%</span>" + "</td>" + '<td class="taxLink" style="text-align: center; padding-left: 0px;">' + '<div class="taxLinkHolder">' + '<div class="taxLinkItemTransparent"> </div>' + e(t, 5, 1) + e(t, 5, 2) + e(t, 5, 3) + e(t, 5, 4) + e(t, 5, 5) + "</div>" + "<span>" + n["5"] + "%</span>" + "</td>" + '<td class="taxLink" style="text-align: center; padding-left: 0px;">' + '<div class="taxLinkHolder">' + '<div class="taxLinkItemTransparent"> </div>' + e(t, 6, 1) + e(t, 6, 2) + e(t, 6, 3) + e(t, 6, 4) + e(t, 6, 5) + "</div>" + "<span>" + n["6"] + "%</span>" + "</td>" + '<td class="taxLink" style="text-align: center; padding-left: 0px;">' + '<a href="http://www.erepublik.com/' + unsafeWindow.culture + "/economy/market/" + t + '/7/1/citizen/0/price_asc/1" target="_blank">' + n["7"] + "%</a>" + "</td>" + '<td class="taxLink" style="text-align: center; padding-left: 0px;">' + '<a href="http://www.erepublik.com/' + unsafeWindow.culture + "/economy/market/" + t + '/12/1/citizen/0/price_asc/1" target="_blank">' + n["12"] + "%</a>" + "</td>" + "</tr>")
            })
        }
    };
    $("#sell_offers tr[id^=offer_]").each(function () {
        t.createButton($(this));
        n.createHolder($(this));
        n.netPrice($(this));
        i.createHolder($(this));
        i.totalNetPrice($(this))
    });
    e();
    n.createHeader();
    i.createHeader();
    r.createRow();
    s.createTable();
    unsafeWindow.jQuery("body").ajaxComplete(function (e, s, o) {
        if (o.url.indexOf("/economy/postMarketOffer") > 0) {
            var u = $.parseJSON(s.responseText),
                a = $(u.html).attr("id");
            t.waitForOffer(a);
            n.waitForOffer(a);
            i.waitForOffer(a);
            r.waitForOffer(a)
        } else if (o.url.indexOf("/economy/deleteMarketOffer") > 0) {
            var u = $.parseJSON(s.responseText),
                a = u.token.offerId;
            r.waitToDissapear("offer_" + a)
        }
    })
}
function PreventScroll() {
    if (!options.preventSidebarScroll) return;
    $(window).bind("scroll", function () {
        if ($("#large_sidebar").hasClass("fixed")) {
            $("#large_sidebar").removeClass("fixed");
            $("#large_sidebar").attr("style", "");
            $("#large_sidebar").next().hide()
        }
    })
}
function DrawLogo() {
    function e() {
        var e = "data:image/png;base64,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";
        var t = "data:image/png;base64,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";
        var n = '<div id="options_popup" style="display: none">' + '<div class="wrapper">' + '<img src="' + e + '" id="close_popup" />' + '<img src="' + t + '" class="logo" />' + '<span class="versionHolder">v' + eRS.version + "</span>" + '<h1 style="float:none; margin-top: 20px;">Settings</h1>' + "<table>" + "<tbody>" + "<tr>" + '<td>Improved profile page <input type="checkbox" id="improveProfilePage" /></td>' + '<td>Improved Market <input type="checkbox" id="improveMarket" /></td>' + "</tr>" + "<tr>" + '<td>Improved Battlefield <input type="checkbox" id="improveBattlefield" /></td>' + '<td>Improved campaigns page <input type="checkbox" id="improveCampaignsPage" /></td>' + "</tr>" + "<tr>" + '<td>Auto Energy recover <input type="checkbox" id="autoEnergyRecover" /></td>' + '<td>Closest region finder <input type="checkbox" id="closestRegionButton" /></td>' + "</tr>" + "<tr>" + '<td>Company Manager <input type="checkbox" id="companyManager" /></td>' + '<td>Menu links <input type="checkbox" id="menuLinks" /></td>' + "</tr>" + "<tr>" + '<td>New level alerter <input type="checkbox" id="newLevelAlerter" /></td>' + '<td>Remove external link warning <input type="checkbox" id="removeExternalLinkWarn" /></td>' + "</tr>" + "<tr>" + '<td>Prevent sidebar scroll <input type="checkbox" id="preventSidebarScroll" /></td>' + '<td>Improved inventory <input type="checkbox" id="improveInventory" /></td>' + "</tr>" + "<tr>" + '<td>Improved Monetary Market <input type="checkbox" id="improveExchangeMarket" /></td>' + "</tr>" + "</tbody>" + "</table>" + '<div class="energy_recover_holder">' + "<div>Energy to recover (minimal ammount of energy to recover)</div>" + '<div><input type="text" id="energyStorage" /></div>' + '<div style="font-size: 10px;">Recomended value is 100 or greater.</div>' + "</div>" + '<div class="note"><span>Note: this changes will take effect after page reload.</span></div>' + "</div>" + "</div>";
        $("body").append(n);
        for (i in options) {
            $("input#" + i + "[type=checkbox]").length > 0 && $("#" + i).prop("checked", options[i])
        }
        $("#energyStorage").val(options.energyStorage);
        if (!options.autoEnergyRecover) $("#options_popup .energy_recover_holder").hide();
        $("#options_popup input").change(function () {
            if ($(this).attr("type") == "checkbox") options[$(this).attr("id")] = $(this).prop("checked");
            else if ($(this).attr("type") == "text") options[$(this).attr("id")] = parseInt($("#energyStorage").val());
            GM_setValue(eRS.citizenId + ".eRS_options", JSON.stringify(options))
        });
        $("#autoEnergyRecover").change(function () {
            $("#options_popup .energy_recover_holder").slideToggle("slow")
        })
    }
    e();
    $("#large_sidebar a.logout").before('<div id="eRS_logo_holder" style="display: none;">' + '<strong class="version_holder eRS_details">v' + eRS.version + "</strong>" + "</div>");
    setTimeout(function () {
        $("#eRS_logo_holder").slideDown("slow")
    }, 500);
    $("#eRS_logo_holder").click(function () {
        var e = $("#options_popup").height();
        var t = $(window).height();
        var n = "50px";
        if (t > e) {
            n = Math.round((t - e) / 2) + "px"
        }
        $.blockUI({
            message: $("#options_popup"),
            overlayCSS: {
                opacity: .5,
                backgroundColor: "white",
                zIndex: 99999
            },
            css: {
                border: "none",
                width: "500px",
                height: "auto",
                top: n,
                backgroundColor: "transparent",
                zIndex: 1e5
            }
        })
    });
    $("#options_popup #close_popup").click($.unblockUI)
}
function CheckForUpdate() {
    function e() {
        $("#eRS_newVersion_alert").remove();
        $("#orderContainer").before('<div id="eRS_newVersion_alert"></div>');
        $("#eRS_newVersion_alert").append("<h1>eStuff</h1>" + "<div>" + "<span>Your current version of eStuff script is out of date.</span>" + '<span>Update it <a href="' + script_link + '">here</a></span>' + "</div>")
    }
    GM_xmlhttpRequest({
        method: "GET",
        url: meta_link,
        onload: function (t) {
            var n = t.responseText;
            var r = n.indexOf("@version") + 8;
            var i = n.indexOf("\n", r);
            var s = n.substring(r, i).trim();
            s = s.split(".");
            var o = eRS.version.split(".");
            var u = 0,
                a = false;
            while (u < o.length && !a) {
                if (parseInt(o[u]) < parseInt(s[u])) {
                    e();
                    a = true
                }
                u++
            }
        }
    })
}
function RemoveExternalLinkWarn() {
    function e() {
        $('a[href*="/main/warn/"]').each(function () {
            var e = $(this);
            $.get($(this).attr("href"), function (t) {
                var n = $("#content .content a", t).attr("href");
                $(e).attr("href", n)
            })
        })
    }
    if (!options.removeExternalLinkWarn) return;
    unsafeWindow.jQuery("body").ajaxComplete(function (t, n, r) {
        if (r.url.indexOf("/main/wall-comment/retrieve/") > 0 || r.url.indexOf("/main/party-comment/retrieve/") > 0 || r.url.indexOf("/main/party-post/") > 0 || r.url.indexOf("/main/group-wall/retrieve/") > 0 || r.url.indexOf("/main/group-wall/older/") > 0 || r.url.indexOf("/main/messages-compose/") > 0 || r.url.indexOf("/main/messages-read/") > 0) {
            setTimeout(function () {
                e()
            }, 500)
        }
    });
    e()
}
function NewLevelAlerter() {
    function e() {
        var t = parseInt($("#current_health").text().split("/")[1].trim());
        var n = Math.round(2 * t / 10);
        var r = n + 10;
        var i = parseInt($("#experienceTooltip strong").eq(1).text());
        var s = parseInt($("#experienceTooltip strong").eq(2).text());
        var o = s - i;
        if (r >= o && !alerter.alerted) {
            unsafeWindow.alert("You have left " + o + " experience points to new level");
            alerter.alerted = true;
            alerter.alertedDay = parseInt($("#header .header_info .eday strong").text().replace(/,/g, ""));
            GM_setValue(eRS.citizenId + ".alerter", JSON.stringify(alerter))
        }
        setTimeout(function () {
            e()
        }, 1e3)
    }
    if (!options.newLevelAlerter) return;
    var t = GM_getValue(eRS.citizenId + ".alerter");
    if (typeof t != "undefined") {
        alerter = JSON.parse(t);
        if (alerter.alerted) {
            var n = parseInt($("#header .header_info .eday strong").text().replace(/,/g, ""));
            if (n - alerter.alertedDay > 1) {
                alerter.alerted = false;
                alerter.alertedDay = 0;
                GM_setValue(eRS.citizenId + ".alerter", JSON.stringify(alerter))
            }
        }
    }
    e()
}
function MenuLinks() {
    if (!options.menuLinks) return;
    $.get("/en/citizen/profile/" + eRS.citizenId, function (e) {
        var t = $(".citizen_sidebar .citizen_info .citizen_second", e).prev().attr("href").replace("http://www.erepublik.com", "");
        $("#menu5 ul li:first").after('<li><a href="' + t + '" rel="nofollow">My Country</a></li>')
    })
}
function CompanyManager() {
    function c(e, t) {
        var n = $(e);
        var r = n.parent().parent();
        if ($(".area").hasClass("disable_controls") || r.hasClass("disabled")) {
            return false
        }
        if (n.hasClass("active") && !t) {
            n.removeClass("active")
        } else if (t) {
            n.addClass("active")
        }
        unsafeWindow.checkHealth();
        setTimeout(function () {
            unsafeWindow.calculateProduction(r)
        }, 50)
    }
    function h(e, t) {
        if ($(".area").hasClass("disable_controls")) {
            return false
        }
        var n = $(e);
        if (n.hasClass("worked")) {
            return false
        }
        var r = parseInt(n.attr("employee"));
        var i = n.parent().parent().parent();
        if (n.hasClass("active") && !t) {
            var s = $(".employee_works.row_two.active", i);
            $(".employee_works", i).removeClass("active");
            if (s.length && r == 5) {
                $(".no5", i).addClass("active")
            }
        } else if (t) {
            $(".employee_works", i).removeClass("active");
            if (r > 5) {
                $(".no5", i).addClass("active")
            }
            n.addClass("active")
        }
        var o = 0;
        $.each($(".employee_works.active"), function (e, t) {
            var n = $(t).parent().parent().parent().attr("id").split("_")[1];
            company = unsafeWindow.getCompany(n);
            var r = parseInt($(t).attr("employee"));
            if (r > 5) {
                r -= 5
            } else {
                r -= company.todays_works
            }
            o += r
        });
        if (o > unsafeWindow.pageDetails.total_works) {
            $("#preset_works").parent().attr("title", unsafeWindow.pageDetails.employee_warn);
            $("#preset_works").parent().parent().addClass("critical")
        } else {
            $("#preset_works").parent().attr("title", unsafeWindow.pageDetails.employee_tooltip);
            $("#preset_works").parent().parent().removeClass("critical")
        }
        $("#preset_works").html(o);
        setTimeout(function () {
            unsafeWindow.calculateProduction(i)
        }, 50)
    }
    var e = "data:image/png;base64,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";
    var t = "data:image/png;base64,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