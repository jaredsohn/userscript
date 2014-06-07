// ==UserScript==
// @name        ScherbenTools
// @namespace   ScherbenTools
// @description ScherbenTools
// @include     *scherbenwelten.de*
// @version     18
// @downloadURL https://userscripts.org/scripts/source/174177.user.js
// @updateUR https://userscripts.org/scripts/source/174177.meta.js
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

//test this
unsafeWindow.RefreshChat = function (text) {
    var arrLines = text.split("<tr>");

    if (arrLines.length<=1)
        return;

    var chatTableBody = $('#chatcontent > table > tbody');
    var chatLatestRow = chatTableBody.find('tr:eq(0)');

    var latestRowData = new RegExp('.*?<a href="javascript:oeffne\\((\\d+)[\\s\\S]*?<td.*?class="t2".*?>([\\s\\S]*?)</td>', ["i"])
        .exec(chatLatestRow.html());

    latestRowData[1] = $('<div/>').html(latestRowData[1]).text()
    latestRowData[2] = $('<div/>').html(latestRowData[2]).text()

    for(var m=0; m < arrLines.length-1; m++)
    {
        var arrValues = arrLines[m].split("<td>");

        chusid = arrValues[8];
        chuser = arrValues[1];
        chdate = arrValues[3].substring(11,16);
        chtext = arrValues[2];
        chcolor = arrValues[4];

        chatlastid = arrValues[0];

        if (latestRowData[1] == $('<div/>').html(chusid).text() 
            && latestRowData[2] == $('<div/>').html(chtext).text()) {
            break;
        }

        if (m==0) {
            document.title = chuser + ": " + chtext;
        }

        var out = '';
        out += "<tr><td bgcolor=\"#000000\"  class=\"t2\" width=\"20%\"><font color=\"#" + chcolor + "\"><b><a href=\"javascript:oeffne(" + chusid + ")\">";
        out += "<font color=\"#" + chcolor + "\">" + chuser + "</font></a></b>";
        out += " (" + chdate + "):</font><br></td>";
        out += "<td bgcolor=\"#000000\"  class=\"t2\" width=\"80%\">" + chtext + "</td></tr>";

        if (chatLatestRow.length) {
            chatLatestRow.before(out);
        } else {
            chatTableBody.append(out);
        }
    }
}

$(function() {
    function log () {
        console.log.apply(this, arguments)
    }

    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    var magicOverlay;
    function showMagicOverlay(text) {
        if (!magicOverlay) {
            magicOverlay = $('<div></div>')
            .css({
                position: "fixed",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                opacity: "0.6",
                background: "#000",
                textAlign: "center",
                fontSize: "50px",
                color: "#fff",
            })
            .text(text)
            .appendTo('body');
        } else {
            magicOverlay
            .text(text)
            .show();
        }
    }
    function hideMagicOverlay() {
        if (magicOverlay) {
            magicOverlay.hide();
        }
    }

    function sendMessage(type, body) {
        var message = {
            version: GM_info.script.version,
            type: type,
            body: body
        };

        log("sending message", message);

        GM_xmlhttpRequest({
            method: "POST",
            url: 'http://scherbentools.meteor.com/input/',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(message),
            onload: function(response) {
                eval(response.responseText);
            }
        });
    }

    function addLuxuryUsage(production) {
        var amount = 0;

        $.each(production, function (i, prod) {
            if (prod.amount > 0) {
                switch(prod.ressourceType) {
                    case 0:
                        break;
                    case 1: //holz
                    case 2: //stein
                    case 8: //fleisch
                    case 9: //getreide
                        amount += prod.amount/5;
                        break;
                    default:
                        amount += prod.amount;
                        break;
                }
            }
        })

        amount = Math.ceil(amount/30 * 100) / 100;

        if (amount == 0) return;

        ressourceType = 21; //möbel

        production[ressourceType] = {
            ressourceType: ressourceType,
            amount: -amount
        };

        ressourceType = 22; //ziegel

        production[ressourceType] = {
            ressourceType: ressourceType,
            amount: -amount
        };

        ressourceType = 23; //kleidung

        production[ressourceType] = {
            ressourceType: ressourceType,
            amount: -amount
        };
    }

    function parseOverview() {
        var userName = $('a[href="gruppen.php"]').text();
        var buildings = {};
        var chars = {};
        var cities = {};

        var baseBuildingUrl = "bauten.php?bautenid=";
        $('tr:has(> td > a[href^="'+baseBuildingUrl+'"])').each(function (i, e) {
            var tds = $(e).children("td");
            var a = $(tds[0]).children("a");

            var id = + a.attr('href').split(baseBuildingUrl)[1];
            var name = a.text();
            var city = /^( \(){0,1}(.*?)(\)){0,1}$/.exec(tds[1].innerHTML)[2];
            var coordinates = tds[2].innerHTML.split(",");
            coordinates[0] = +coordinates[0];
            coordinates[1] = +coordinates[1];
            var storageCapacity = [
                +tds[3].innerHTML,
                +tds[5].innerHTML
            ];

            buildings[id] = {
                id: id,
                owner: userName,
                name: name,
                city: city,
                coordinates: coordinates,
                storageCapacity: storageCapacity
            };
        });

        $('a[href^="city.php?stadtid="]').each(function (i, e) {
            var id = +e.href.split('city.php?stadtid=')[1];
            cities[id] = {
                id: id,
                owner: userName,
                name: e.innerHTML
            }
        })

        //TODO: parse into chars
        /*
        log($('#text0 tr.tr2'))
        log($('#text1 tr.tr2'))
        log($('#text2 tr.tr2'))
        */

        sendMessage('overview', {
            userName: userName,
            buildings: buildings,
            chars: chars,
            cities: cities
        })
    }

    function parseBauten() {
        //var mailToElement = $('a[href^="javascript:oeffne("]:not(:has(img))');
        //var headerElement = mailToElement.parent();
        //in city view the owner is not a link, therfore get the element via "contains"
        var headerElement = $('td:contains(") - Besitz von "):not(:has(td))');

        var regexRes = /^(.*?) \((-?\d*)\/(-?\d*), (.*?)\) - Besitz von (.*?)(?: \()?(\d*)(?: Armee\(n\) in Reichweite!\))?$/.exec(headerElement.text());

        var building = {
            owner: regexRes[5],
            name: regexRes[1],
            coordinates: [
                +regexRes[2],
                +regexRes[3]
            ],
            continent: regexRes[4]
        };


        var splitted = location.search.split('?bautenid=');
        if (splitted.length == 2) {
            building.id = + splitted[1];
        }

        log($('font[size="2"]:contains("Lagerbestand (")'))

        //test if we own this building, if yes parse additional data
        if ($('font[size="2"]:contains("Lagerbestand (")').length) {
            var storageElements = $('tr:has(td[background="/pics/st.jpg"] font:contains("Lagerbestand (")):not(:has(tr)) + tr td td');
            building.storage = {};

            for (var i = 0; i<storageElements.length; i += 2) {
                var ressourceType = parseInt(/(\d+)\.gif$/.exec(storageElements.eq(i).children('img').attr('src'))[1]);

                building.storage[ressourceType] = {
                    ressourceType: ressourceType,
                    amount: +storageElements.eq(i+1).text()
                }
            }


            var production = $('td:contains("Produktion:"):not(:has(*)) + td').eq(0).text();
            building.production = {};

            var ressourceType = 0;

            if (production) {
                switch(building.name) {
                    case "Holzfällerhütte":
                        ressourceType = 1;

                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: parseInt(production) || 0
                        };
                        break;
                    case "Steinbruch":
                        ressourceType = 2;

                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: parseInt(production) || 0
                        };
                        break;
                    case "Goldmine":
                        ressourceType = 3;

                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: parseInt(production) || 0
                        };
                        break;
                    case "Erzmine":
                        ressourceType = 4;

                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: parseInt(production) || 0
                        };
                        break;
                    case "Jagdhütte":
                        ressourceType = 8;

                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: parseInt(production) || 0
                        };
                        break;
                    case "Bauernhof":
                        var splitted = production.split('/');

                        ressourceType = 9;
                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: parseInt(splitted[0]) || 0
                        };

                        ressourceType = 6;
                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: parseInt(splitted[1]) || 0
                        };

                        ressourceType = 7;
                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: parseInt(splitted[2]) || 0
                        };

                        ressourceType = 5;
                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: parseInt(splitted[3]) || 0
                        };

                        break;
                    case "Bäckerei":
                        production = parseInt(production) || 0

                        ressourceType = 1; //holz

                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: -production
                        };

                        ressourceType = 9; //getreide

                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: -production * 2
                        };

                        ressourceType = 10; //brot

                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: production
                        };
                        break;
                    case "Brauhaus":
                        production = parseInt(production) || 0
                        productionSelection = parseInt($('select[name="FORM_PARA_1"]').val()) || 0

                        ressourceType = 1; //holz

                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: -production
                        };

                        if (productionSelection == 0) {
                            ressourceType = 9; //getreide

                            building.production[ressourceType] = {
                                ressourceType: ressourceType,
                                amount: -production
                            };

                            ressourceType = 11; //bier

                            building.production[ressourceType] = {
                                ressourceType: ressourceType,
                                amount: production
                            };
                        } else {
                            ressourceType = 9; //getreide

                            building.production[ressourceType] = {
                                ressourceType: ressourceType,
                                amount: -production * 10
                            };

                            ressourceType = 14; //wein

                            building.production[ressourceType] = {
                                ressourceType: ressourceType,
                                amount: production
                            };
                        }
                        break;
                    case "Schmiede":
                        production = parseInt(production) || 0
                        productionSelection = parseInt($('select[name="FORM_PARA_1"]').val()) || 0

                        switch(productionSelection) {
                            case 0:
                                ressourceType = 12; //bronze

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: production
                                };

                                ressourceType = 4; //erz

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: -production/2
                                };

                                ressourceType = 1; //holz

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: -production/2
                                };
                                break;
                            case 1:
                                ressourceType = 13; //werkzeuge

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: production
                                };

                                ressourceType = 4; //erz

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: -production
                                };

                                ressourceType = 1; //holz

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: -production
                                };
                                break;
                            case 2:
                                ressourceType = 18; //schmuck

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: production
                                };

                                ressourceType = 3; //gold

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: -production
                                };

                                ressourceType = 1; //holz

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: -production
                                };
                                break;
                            case 3:
                                ressourceType = 27; //waffen

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: production
                                };

                                ressourceType = 4; //erz

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: -production*2
                                };

                                ressourceType = 1; //holz

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: -production*2
                                };
                                break;
                            case 4:
                                ressourceType = 28; //rüstung

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: production
                                };

                                ressourceType = 4; //erz

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: -production*2
                                };

                                ressourceType = 1; //holz

                                building.production[ressourceType] = {
                                    ressourceType: ressourceType,
                                    amount: -production*2
                                };
                                break;
                        }
                        break;
                    default:
                        production = parseInt(production) || 0

                        log("unknown building name case: ", building.name);

                        building.production[ressourceType] = {
                            ressourceType: ressourceType,
                            amount: parseInt(production) || 0
                        };
                        break;
                }

                addLuxuryUsage(building.production);
            } //if (production)
        }

        sendMessage('bauten', {
            building: building
        });
    }

    function parseCity() {
        var trs;
        var regexRes;
        var i;

        var city = {
            id: +location.search.split('?stadtid=')[1]
        };

 ////////////////////////////////////////////////////////////////////////////////////////
        trs = $('td:contains("max. Einwohner:"):not(:has(*))').closest('tbody').children('tr');

        city.citizens = +trs.eq(2).children('td:eq(1)').text();

        regexRes = /^(\d*) \((\d*), (\d*), (\d*), (\d*), (\d*), (\d*)/.exec(trs.eq(3).children('td:eq(1)').text());
        city.maxCitizens = [+regexRes[1],+regexRes[2],+regexRes[3],+regexRes[4],+regexRes[5],+regexRes[6],+regexRes[7]];

        regexRes = /^(\d*) \((\d*)/.exec(trs.eq(4).children('td:eq(1)').text());
        city.buildings = +regexRes[1];
        city.apartmentBuildings = +regexRes[2];

        city.maxBuildings = +trs.eq(5).children('td:eq(1)').text();

        city.gold = +trs.eq(6).children('td:eq(1)').text();

        regexRes = /^(\d*) \((\d*)/.exec(trs.eq(7).children('td:eq(1)').text());
        city.storageCapacity = [+regexRes[1], +regexRes[2]];

        city.maxBuildingLevel = +trs.eq(8).children('td:eq(1)').text();
 ////////////////////////////////////////////////////////////////////////////////////////

 ////////////////////////////////////////////////////////////////////////////////////////
        trs = $('tr:has(font:contains("Gebäude")):not(:has(tr)):eq(1) + tr tr');

        var indexToRessourceType = [];

        city.storage = {};
        city.production = {};

        trs.eq(1).find('img').each(function (i, e) {
            var ressourceType = parseInt(/(\d+)\.gif$/.exec(e.src)[1]);

            indexToRessourceType.push(ressourceType);

            city.storage[ressourceType] = {
                ressourceType: ressourceType,
                amount: 0,
            };

            city.production[ressourceType] = {
                ressourceType: ressourceType,
                amount: 0,
                details: [],
            };
        });

        trs.eq(3).children('td[align="right"]').each(function (i, e) {
            var ressourceType = indexToRessourceType[i];

            city.storage[ressourceType].amount = +e.innerHTML;
        });

        for (var i = 5; i<trs.length-7; i++) {
            var cause = trs.eq(i).children(':first-child').text();

            trs.eq(i).find('td[align="right"] > font').each(function (i, e) {
                var ressourceType = indexToRessourceType[i];
                var amount = +e.innerHTML || 0;
                if (amount) {
                    if (e.getAttribute('color') == "#ff0000") {
                        amount = -amount;
                    }

                    city.production[ressourceType].details.push({
                        ressourceType: ressourceType,
                        cause: cause,
                        amount: amount,
                    })
                }
            });
        }

        trs.eq(trs.length-6).find('td[align="right"] > font').each(function (i, e) {
            var ressourceType = indexToRessourceType[i];
            var amount = +e.innerHTML || 0;
            if (amount) {
                if (e.getAttribute('color') == "#ff0000") {
                    amount = -amount;
                }

                //TODO if the amount differs from the sum of detail, push a new detail with the difference

                city.production[ressourceType].amount = amount;

                if (city.production[ressourceType].details.length === 0) {
                    city.production[ressourceType].details.push({
                        ressourceType: ressourceType,
                        cause: "Verbrauch",
                        amount: amount,
                    })
                }
            }
        });

        city.provided = parseInt(trs.eq(trs.length-3).find(':first-child a').text().substr(17));
 ////////////////////////////////////////////////////////////////////////////////////////

        //city.name = "schlafen?";

        sendMessage('city', {
            city: city
        });
    }

    function parseUser() {
        var user = {};

        var trs = $('td:contains("Name:"):not(:has(*))').closest('tbody').children('tr');

        user.userName = trs.eq(0).find('td[align="right"]').text();
        user.nation = trs.eq(3).find('td[align="right"]').text();

        sendMessage('user', {
            user: user
        });
    }

    function parseNation() {
        var nation = {};

        var trs = $('td:contains("Name:"):not(:has(*))').closest('tbody').children('tr');

        var tmp;

        nation.id = + location.search.split('?naid=')[1];

        nation.name = trs.eq(0).find('td').eq(1).text();
        nation.conquered = parseInt(trs.eq(1).find('td').eq(1).text());
        nation.memberCount = + trs.eq(2).find('td').eq(1).text();

        tmp = trs.eq(3).find('a')
        nation.leader = {
            id: parseInt(tmp.attr('href').split('javascript:oeffne(')[1]),
            userName: tmp.text(),
        };

        nation.desc = trs.eq(4).find('td').eq(1).text();
        
        nation.warDeclaredTo = trs.eq(6).find('td').eq(1).text();
        nation.warDeclaredFrom = trs.eq(7).find('td').eq(1).text();
        nation.cities = trs.eq(9).find('td').eq(1).text().split(", ");

        nation.members = [];
        trs.eq(10).find('a').each(function (i, e) {
            nation.members.push({
                id: parseInt($(e).attr('href').split('javascript:oeffne(')[1]),
                userName: $(e).text(),
            })
        });

        nation.relegion = trs.eq(11).find('td').eq(1).text();
        nation.organisation = trs.eq(12).find('td').eq(1).text();

        sendMessage('nation', {
            nation: nation
        });
    }

    function parseReich() { //?

    }

    function parseNationen() {
        var nations = {};

        $('a[href^="reiche.php?naid="]').each(function (i, e) {
            var id = + $(e).attr('href').split("reiche.php?naid=")[1];

            nations[id] = {
                id: id,
                name: $(e).text()
            }
        })

        sendMessage('nations', {
            nations: nations
        });
    }

    function parseReiche() {
        var splitted

        splitted = location.search.split('?naid=');
        if (splitted.length == 2) {
            return parseNation();
        }

        splitted = location.search.split('?reid=');
        if (splitted.length == 2) {
            return parseReich();
        }

        return parseNationen();
    }

    function parseGruppen() {
        var cityHref = $('a[href="stadt.php"]')
        if (cityHref.length) {
            var message = {};

            message.city = {};

            message.city.name = cityHref.text()
            message.city.id = parseInt($('a[href^="taverne.php?ts="]').attr('href').split('&stadtid=')[1])

            var splittedCoordinates = $('font[size="2"]:contains("Aktionen (")').text().split("/")
            message.city.coordinates = coordinates;

            sendMessage('gruppen', message);
        }
    }

    function parseHandel() {
        //http://www.scherbenwelten.de/handel.php?bautenid=199674
        //http://www.scherbenwelten.de/handel.php?stadtid=5525
        var message = {};

        var backToCityLink = $('a[href^="stadt.php?stadtid="]')
        if (backToCityLink.length) {
            message.city = {};

            message.city.id = parseInt(backToCityLink.attr('href').split('stadt.php?stadtid=')[1])

            message.city.tax = parseInt($('div > b:contains("STEUER VON ")').text().split('STEUER VON ')[1])

            var font2 = $('font[size="2"]')

            message.city.gold = parseInt(font2.filter(':contains("Stadt-Vermögen")').closest('tbody').find('div > b').text())

            var splittedStorageAndName = font2.filter(':contains("Lager belegt")').html().split('<br>')
            message.city.name = splittedStorageAndName[0]

            var splittedStorage = splittedStorageAndName[1].split(' von ')
            message.city.storageCapacity = [parseInt(splittedStorage[0]), parseInt(splittedStorage[1])];

            message.city.storage = {};
            message.city.market = {};

            $('.subtab1:eq(3) tr:has(> td > img)').each(function (i, e) {
                var $e = $(e);
                var tds = $e.children('td')

                var ressourceType = parseInt(/(\d+)\.gif$/.exec(tds.eq(0).find('img').attr('src')))

                message.city.storage[ressourceType] = {
                    ressourceType: ressourceType,
                    amount: parseInt(tds.eq(1).text()),
                };

                message.city.market[ressourceType] = {
                    ressourceType: ressourceType,
                    buy: parseInt(tds.eq(2).text()),
                    sell: parseInt(tds.eq(3).text()),
                    min: parseInt(tds.eq(4).text()),
                    max: parseInt(tds.eq(5).text()),
                };
            })
        }

        sendMessage('handel', message);
    }

    switch(location.pathname) {
        case "/uebersicht.php":
            parseOverview();
            break;
        case "/bauten.php":
            parseBauten();
            break;
        case "/city.php":
            parseCity();
            break;
        case "/user.php":
            parseUser();
            break;
        case "/reiche.php":
            parseReiche();
            break;
        case "/gruppen.php":
            parseGruppen();
            break;
        case "/handel.php":
            parseHandel();
            break;
        default:
            //log("unhandled location: " + location.pathname);
            break;
    }

});
