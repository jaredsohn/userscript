// ==UserScript==
// @name           DreamWorldPuzzleSolver++
// @namespace      http://playmage.com/
// @include        http://*playmage.com/*
// @version		   1.4.5
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

// turn off buttons on kong main page
if (location.host == "kong.playmage.com" && location.href.indexOf("http://kong.playmage.com/dream") != 0) {
    return;
}
if (location.host == "kong2.playmage.com" && location.href.indexOf("http://kong2.playmage.com/dream") != 0) {
    return;
}

// config values
var delayMs, coinMulti, eventMulti, gambler, wiseman, girl, imp, dust, elf, beggar, well, ally, niceAlly, map;

// ----------config values
coinMulti = 1.0;      // default event coin multiplier, set to 1.5 for a +50% coins event for example
eventMulti = 1.5;     // Event-Multiplier for coins for Well and Beggar, reference value
gambler = 1;          // 0=Accept,1=Fight
wiseman = 2; 	      // 0=Talk, 1=Trivia, 2=Fight
girl = 1; 	      // 0=Accept,1=Fight
imp = 0; 	      // 0=Accept,1=Fight
dust = 1; 	      // 0=Accept,1=Fight
ally = 1; 	      // 0=get, 1=keep old (gets normal allies, except nice ones, see below)
niceAlly = 1; 	      // 0=get, 1=keep old (get nice allies like Puppy, Priestess and Phoenix
map = 0; 	      // 0="Find", 1="Sell"
elf = 0; 	      // 0=fight, 1=buy with coins
//------------config end

// GUI text for buttons
var wise_choice, imp_choice, girl_choice, dust_choice, gambler_choice, ally_choice, map_choice, beg_choice, well_choice, elf_choice;
wise_choice = ["W:talk", "W:quiz", "W:fight"];
imp_choice = ["I:quest", "I:fight", "I:run"];
girl_choice = ["GiR:quest", "GiR:fight", "GiR:run"];
dust_choice = ["D:dust", "D:fight", "D:run"];
gambler_choice = ["G:play", "G:fight", "G:run"];
ally_choice = ["A:get", "A:keep"];
niceAlly_choice = ["nA:get", "nA:keep"]
map_choice = ["luck", "coins"];
beg_choice = ["High", "Low"];
well_choice = ["High", "Low", "1B"];
elf_choice = ["E:fight", "E:buy"];
var ally_names = ["Kitten", "Puppy", "Pony", "Priestess", "Unicorn", "Robot", "Soldier", "Phoenix", "Alien", "Dragon"];
var ativo = false;
var idTimeouts;
var idIntervals;
var estagioNavegacao = 0;
var estagioTransDiv = 0;

//2*hp+1 and 4*heal potion+1
var arrHighValues = [41, 81, 121, 161, 201, 289, 393, 513, 649, 801, 961, 1153, 1381, 1657, 1985, 2381, 2857, 3425, 4109, 4929, 5813, 6857, 8089, 9541, 11257, 13281, 15669, 18489, 21813, 25737, 30369, 35833, 42281, 49889, 58865, 69457, 81957, 96709, 114113, 134653, 156197, 181185, 210173, 243797, 282801, 328049, 380533, 441417, 494385, 553709, 620153, 694569, 777917, 871265, 975813, 1092909, 1224057, 1370941, 1535453, 1719705, 1926069, 2157197, 2416057, 2705981, 3030697, 3394377, 3801701, 4257905, 4768853, 5341113, 5982045, 6699889, 7503873, 8404337, 9412857, 10542397, 11807481, 13224377, 14811301, 16588657, 18579293, 20808805, 23305861, 26102561, 29234865, 32743045, 36672209, 41072873, 46001617, 51521809, 57704425, 64628953, 72384425, 81070553, 90799017, 101694897, 113898281, 127566073, 142874001, 160018881]
var arrLowValues = [21, 41, 61, 81, 101, 145, 197, 257, 325, 401, 481, 577, 691, 829, 993, 1191, 1429, 1713, 2055, 2465, 2907, 3429, 4045, 4771, 5629, 6641, 7835, 9245, 10907, 12869, 15185, 17917, 21141, 24945, 29433, 34729, 40979, 48355, 57057, 67327, 78099, 90593, 105087, 121899, 141401, 164025, 190267, 220709, 247193, 276855, 310077, 347285, 388959, 435633, 487907, 546455, 612029, 685471, 767727, 859853, 963035, 1078599, 1208029, 1352991, 1515349, 1697189, 1900851, 2128953, 2384427, 2670557, 2991023, 3349945, 3751937, 4202169, 4706429, 5271199, 5903741, 6612189, 7405651, 8294329, 9289647, 10404403, 11652931, 13051281, 14617433, 16371523, 18336105, 20536437, 23000809, 25760905, 28852213, 32314477, 36192213, 40535277, 45399509, 50847448, 56949141, 63783037, 71437001, 80009441]
var arr1B = [1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000];

// Add jQuery
if (typeof unsafeWindow.jQuery == 'undefined') {
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    // Solver on/off
    $(document.body).append($("<input />").attr('type', 'button').attr('value', 'DWPS on').css("position", "absolute").css("zIndex", "99").click(function () {
        ativo = !ativo;
        if (ativo) {
            $(this).val("DWPS on");
            $(this).blur();
            idIntervals = setInterval(verificaExploracao, 500);
        } else {
            if (idTimeouts) {
                clearTimeout(idTimeouts);
            }
            if (idIntervals) {
                clearInterval(idIntervals);
            }
            $(this).val("DWPS off");
            $(this).blur();
        }
    }));
    // Event Coin Multiplier times 1/1.5
    $(document.body).append($("<input />").attr('type', 'button').attr('value', 'regular').css("position", "absolute").css("left", "78px").css("zIndex", "99").click(function () {
        if (coinMulti == 1) {
            coinMulti = eventMulti;
            $(this).val("event");
            $(this).blur();
        } else if (coinMulti == eventMulti) {
            coinMulti = 1;
            $(this).val("regular");
            $(this).blur();
        }
    }));
    // Gambler gamble/fight
    $(document.body).append($("<input />").attr('type', 'button').attr('value', gambler_choice[gambler]).css("position", "absolute").css("left", "174px").css("zIndex", "99").click(function () {
        if (gambler == 0) {
            gambler = 1;
            $(this).val(gambler_choice[gambler]);
            $(this).blur();
        } else if (gambler == 1) {
            gambler = 0;
            $(this).val(gambler_choice[gambler]);
            $(this).blur();
        }
    }));
    // Dust Merchant dust/fight
    $(document.body).append($("<input />").attr('type', 'button').attr('value', dust_choice[dust]).css("position", "absolute").css("left", "233px").css("zIndex", "99").click(function () {
        if (dust == 1) {
            dust = 0;
            $(this).val(dust_choice[dust]);
            $(this).blur();
        } else {
            dust = 1;
            $(this).val(dust_choice[dust]);
            $(this).blur();
        }
    }));
    // Wiseman talk/trivia/fight
    $(document.body).append($("<input />").attr('type', 'button').attr('value', wise_choice[wiseman]).css("position", "absolute").css("left", "292px").css("zIndex", "99").click(function () {
        if (wiseman == 0) {
            wiseman = 1;
            $(this).val(wise_choice[wiseman]);
            $(this).blur();
        } else if (wiseman == 1) {
            wiseman = 2;
            $(this).val(wise_choice[wiseman]);
            $(this).blur();
        } else if (wiseman == 2) {
            wiseman = 0;
            $(this).val(wise_choice[wiseman]);
            $(this).blur();
        }
    }));
    // Girl accept/fight
    $(document.body).append($("<input />").attr('type', 'button').attr('value', girl_choice[girl]).css("position", "absolute").css("left", "380px").css("zIndex", "99").click(function () {
        if (girl == 1) {
            girl = 0;
            $(this).val(girl_choice[girl]);
            $(this).blur();
        } else {
            girl = 1;
            $(this).val(girl_choice[girl]);
            $(this).blur();
        }
    }));
    // Imp accept/fight
    $(document.body).append($("<input />").attr('type', 'button').attr('value', imp_choice[imp]).css("position", "absolute").css("left", "459px").css("zIndex", "99").click(function () {
        if (imp == 1) {
            imp = 0;
            $(this).val(imp_choice[imp]);
            $(this).blur();
        } else {
            imp = 1;
            $(this).val(imp_choice[imp]);
            $(this).blur();
        }
    }));
    // Ally accept/explore
    $(document.body).append($("<input />").attr('type', 'button').attr('value', ally_choice[ally]).css("position", "absolute").css("left", "560px").css("zIndex", "99").click(function () {
        if (ally == 1) {
            ally = 0;
            $(this).val(ally_choice[ally]);
            $(this).blur();
        } else {
            ally = 1;
            $(this).val(ally_choice[ally]);
            $(this).blur();
        }
    }));
    // nice Ally accept/explore
    $(document.body).append($("<input />").attr('type', 'button').attr('value', niceAlly_choice[niceAlly]).css("position", "absolute").css("left", "620px").css("zIndex", "99").click(function () {
        if (niceAlly == 1) {
            niceAlly = 0;
            $(this).val(niceAlly_choice[niceAlly]);
            $(this).blur();
        } else {
            niceAlly = 1;
            $(this).val(niceAlly_choice[niceAlly]);
            $(this).blur();
        }
    }));
    // Elf fight/buy
    $(document.body).append($("<input />").attr('type', 'button').attr('value', elf_choice[elf]).css("position", "absolute").css("left", "680px").css("zIndex", "99").click(function () {
        if (elf == 1) {
            elf = 0;
            $(this).val(elf_choice[elf]);
            $(this).blur();
        } else {
            elf = 1;
            $(this).val(elf_choice[elf]);
            $(this).blur();
        }
    }));
}
// -end-gui-buttons----------------------
// main explore function

function verificaExploracao() {
    if (!ativo || document.getElementById("transdiv")) {
        return;
    }

    // 'take all' button in bank screen
    if ($("span.subtabon").html() && $("span.subtabon").html() == "Bank") {
        $("#widthdrawamount").val(parseInt($("span.statsvcred:not(#curcoins)").html().replace(/[,\.\s]/g, "")));
    }

    // Encounter handlers
    if ($("td.areasign").html() && $("td.areasign").html().trim() != "Encounter") {
        // A puzzle box (green buttons)
        if ($("span.mobname").html() && $("span.mobname").html() == "A Puzzle Box" && $("#actionresulttd").html() && $("#actionresulttd").html().indexOf("and can be opened when all 4 correct buttons are pressed") >= 0) {
            location.href = "javascript:(" + encodeURI(function () {
                $("div.btn100").each(function (indice) {
                    if ($(this).html().trim() == "Open") {
                        $(this).click();
                        $("#actionbuttonimg1").click();
                        return false;
                    }
                });
            }) + ")()";
        }

        // Wishing Well and Beggar
        if ($("span.mobname").html() && ($("span.mobname").html() == "Wishing Well" || $("span.mobname").html() == "A Beggar") && $("#amount").length > 0 && $("#btHighValue").length == 0) {
            document.getElementById('amount').disabled = false;
            $("#amount").after(function () {
                var strAux = '<br/><input type="button" id="btHighValue" value="High"/>';
                strAux += '&nbsp;<input type="button" id="btLowValue" value="Low"/>';
                if ($("span.mobname").html() == "Wishing Well") {
                    strAux += '&nbsp;<input type="button" id="bt1B" value="1B"/>';
                }
                strAux += '&nbsp;<a href="#" title="';
                if ($("span.mobname").html() == "Wishing Well") {
                    strAux += 'Clicking in \'High\', the Well will give you Energy/Money/Skill Points.\n Clicking in \'Low\' the Well will give you Energy/Money.\n Clicking in \'B1\' the Well will give +25% to rage.';
                } else {
                    strAux += 'Clicking in \'High\', the Beggar will give you an Item.\n Clicking in \'Low\' the Beggar will give you Energy.';
                }
                strAux += '">?</a>';
                return strAux;
            });
            window.preencheAmount = function (arrValores) {
                if (parseInt($("#curlevel").html()) <= arrValores.length) {
                    if (parseInt($("#curcoins").html().replace(/[,\.]/g, "")) >= Math.ceil(coinMulti * arrValores[parseInt($("#curlevel").html()) - 1])) {
                        if (arrValores != arr1B) $("#amount").val(Math.ceil(coinMulti * arrValores[parseInt($("#curlevel").html()) - 1]));
                        else $("#amount").val(Math.ceil(arrValores[parseInt($("#curlevel").html()) - 1]));
                        if ($("span.mobname").html() == "Wishing Well") {
                            location.href = "javascript:(" + encodeURI(function () {
                                loadDiv2('/dream/explore?action=well');
                            }) + ")()";
                        } else {
                            location.href = "javascript:(" + encodeURI(function () {
                                loadDiv2('/dream/explore?action=beggar');
                            }) + ")()";
                        }
                    } else {
                        if (arrValores != arr1B) alert("You don't have enough coins for this action. You need at least " + Math.ceil(coinMulti * arrValores[parseInt($("#curlevel").html()) - 1]) + " coins.");
                        else alert("You don't have enough coins for this action. You need at least " + Math.ceil(arrValores[parseInt($("#curlevel").html()) - 1]) + " coins.");
                    }
                } else {
                    alert("Sorry, your level isn't registered in this script, please update it or contact the author if updating don't solve your problem.")
                }
            };
            $("#btHighValue").click(function () {
                preencheAmount(arrHighValues);
            });
            $("#btLowValue").click(function () {
                preencheAmount(arrLowValues);
            });
            $("#bt1B").click(function () {
                preencheAmount(arr1B);
            });
        }

        // A Puzzle Box (colors/mastermind)
        if ($("span.mobname").html() && $("span.mobname").html() == "A Puzzle Box" && $("#actionresulttd").html() && $("#actionresulttd").html().indexOf("is locked&nbsp;electronically, and opens when the correct sequence of colors") >= 0) {
            location.href = "javascript:(" + encodeURI(function () {
                $("div.btn100").each(function (indice) {
                    if ($(this).text().trim() == "Open") {
                        $(this).click();
                        $("span#actionbuttonimg2").click();
                        return false;
                    }
                });
            }) + ")()";
        }


        // A Treasure Chest (age/animals/gallons)
        if ($("span.mobname").html() && $("span.mobname").html() == "A Treasure Chest") {
            location.href = "javascript:(" + encodeURI(function () {
                $("div.btn100").each(function (indice) {
                    if ($(this).html() == "Open") {
                        $(this).click();
                        $("#actionbuttonimg2").click();
                        return false;
                    }
                });
            }) + ")()";
        }

        // Shrooms eat
        if ($("span.mobname").html() && $("span.mobname").html() == "Magic Mushrooms") {
            location.href = "javascript:(" + encodeURI(function () {
                $("div.btn100").each(function (indice) {
                    if ($(this).html() == "Taste") {
                        $(this).click();
                        return false;
                    }
                });
            }) + ")()";
        }

        // Elf fight/buy
        if ($("span.mobname").html() && $("span.mobname").html() == "Magic Elf") {
            if (elf == 0) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Attack") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            } else if (elf == 1) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Buy with Coins") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            }
        }

        // GoD fight
        if ($("span.mobname").html() && $("span.mobname").html() == "Guardian of Dreams") {
            location.href = "javascript:(" + encodeURI(function () {
                $("div.btn100").each(function (indice) {
                    if ($(this).html() == "Fight") {
                        $(this).click();
                        return false;
                    }
                });
            }) + ")()";
        }

        // Gambler gamble/fight
        if ($("span.mobname").html() && $("span.mobname").html() == "The Gambler") {
            if (gambler == 0) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Accept") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            } else if (gambler == 1) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Fight") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            }
        }

        // Dust Merchant dust/fight
        if ($("span.mobname").html() && $("span.mobname").html() == "Dust Merchant"){
            if (dust == 0) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Accept") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            } else if (dust == 1) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Fight") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            }
        }

        // Wiseman talk/quiz/fight
        if ($("span.mobname").html() && $("span.mobname").html() == "The Wiseman") {
            if (wiseman == 0) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Accept") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            } else if (wiseman == 1) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Trivia") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            } else if (wiseman == 2) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Fight") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            }
        }

        // Imp quest/fight
        if ($("span.mobname").html() && $("span.mobname").html() == "Little Imp") {
            if (imp == 0) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Accept") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            } else if (imp == 1) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Fight") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            }
        }

        // Girl In Red quest/fight
        if ($("span.mobname").html() && $("span.mobname").html() == "Girl in Red") {
            if (0 == girl) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Accept") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            } else if (1 == girl) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Fight") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            }
        }

        // Easter Bunny take
        if ($("span.mobname").html() && $("span.mobname").html() == "Easter Bunny") {
            location.href = "javascript:(" + encodeURI(function () {
                $("div.btn100").each(function (indice) {
                    if ($(this).html() == "Take One") {
                        $(this).click();
                        return false;
                    }
                });
            }) + ")()";
        }
        
        //Santa gift
        if ($("span.mobname").html() && $("span.mobname").html() == "Santa") {
            location.href = "javascript:(" + encodeURI(function () {
                $("div.btn100").each(function (indice) {
                    if ($(this).html() == "Ask for gift") {
                        $(this).click();
                        return false;
                    }
                });
            }) + ")()";
        }
        
        // Ally, we want to discard allys with name != ally_names[0,3,7] (not Kitten, Priestess or Phoenix)
        if ($("span.mobname").html() && ($("span.mobname").html() == ally_names[1] || $("span.mobname").html() == ally_names[2] || $("span.mobname").html() == ally_names[4] || $("span.mobname").html() == ally_names[5] || $("span.mobname").html() == ally_names[6] || $("span.mobname").html() == ally_names[8] || $("span.mobname").html() == ally_names[9])) {
            GM_log("ally encountered");
            if (ally == 0) {
                GM_log("ally get");
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Accept") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            } else if (ally == 1) {
                GM_log("ally keep");
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Explore") {

                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            }
        }
        
        // nice Ally, we want to get allys with name == ally_names[0,3,7] (Kitten, Priestess or Phoenix)
        if ($("span.mobname").html() && ($("span.mobname").html() == ally_names[0] || $("span.mobname").html() == ally_names[3] || $("span.mobname").html() == ally_names[7])) {
            GM_log("nice ally encountered");
            if (niceAlly == 0) {
                GM_log("nice ally get");
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Accept") {
                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            } else if (niceAlly == 1) {
                GM_log("ally keep");
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Explore") {

                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            }
        }
        
        //ms. santa
        if ($("span.mobname").html() && $("span.mobname").html() == "Ms. Santa") {
            location.href = "javascript:(" + encodeURI(function () {
                $("div.btn100").each(function (indice) {
                    if ($(this).html() == "Take by force") {
                        $(this).click();
                        return false;
                    }
                });
            }) + ")()";
        }
        
        // Treasure Map
        if ($("span.mobname").html() && $("span.mobname").html() == "A Treasure Map") {
            if (map == 0) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Find") {

                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            } else if (map == 1) {
                location.href = "javascript:(" + encodeURI(function () {
                    $("div.btn100").each(function (indice) {
                        if ($(this).html() == "Sell") {

                            $(this).click();
                            return false;
                        }
                    });
                }) + ")()";
            }
        }
    }
}

ativo = true;
idIntervals = setInterval(verificaExploracao, 500);