// ==UserScript==
// @name            C++ (comunio enhancer)
// @version         0.6.0
// @namespace       http://www.tobsch.org/
// @author			Tobias Schneider
// @homepage		http://www.cplusplus.tobsch.org
// @licence			http://creativecommons.org/licenses/by-nc-sa/3.0/de/
// @description     Improvements and better usability for comunio
//
// @include         http://www.comunio.de/*
// @include         http://www.comunio.net/*
//
// @require         http://code.jquery.com/jquery-2.1.0.min.js
// @require         https://jquery-json.googlecode.com/files/jquery.json-2.4.min.js
// @require         http://files.cplusplus.tobsch.org/libs/jquery.tablesorter-update.js
// @require         http://files.cplusplus.tobsch.org/libs/flattr.js
//
// @resource        Icon:addPlayer          http://files.cplusplus.tobsch.org/pics/symbol_addition.gif
// @resource        Icon:removePlayer       http://files.cplusplus.tobsch.org/pics/symbol_multiplication.gif
// @resource        Icon:clearOLLoader      http://files.cplusplus.tobsch.org/pics/ajax-loader.gif
// @resource        Icon:clearedOLLoader    http://files.cplusplus.tobsch.org/pics/tick_circle.png
// @resource        Icon:crossCircle        http://files.cplusplus.tobsch.org/pics/cross_circle.png
// @resource        Icon:sortAsc            http://files.cplusplus.tobsch.org/pics/asc.gif
// @resource        Icon:sortDesc           http://files.cplusplus.tobsch.org/pics/desc.gif
// @resource        Icon:sortAscDesc        http://files.cplusplus.tobsch.org/pics/bg.gif
// @resource        Icon:Comunio            http://www.comunio.de/i/1/favicon_de.ico
// @resource        Icon:searchForum        http://files.cplusplus.tobsch.org/pics/searchForum.png
// @resource        Pic:LineupStriker       http://files.cplusplus.tobsch.org/pics/lineup_striker_bg_C%2B%2B.gif
//
// ==/UserScript==
//
// Author:         Tobias Schneider <cplusplus@tobsch.org>
// Changelog:
//                 0.6.0            - Fix: Lot of clean up
//                                  - Remove: Not functional code
//                 0.5.5            - Add: New status icons
//                                  - Fix: Updatefunction
//                                  - Fix: Exchangemarket, Oberservationlist
//                                  - Fix: Exchangemarket, Filtersize
//                                  - Fix: Exchangemarket, Statussize
//                                  - Fix: Updatefunction, Design
//                                  - Fix: minor design changes
//
//                 0.5.4            - New: tipptobsch.org - play if you want :-)
//                                  - Fix: minor design changes
//
//                 0.5.3            - Fix: Toggle from Player- and Teaminformations
//                                  - Fix: Observationlist marker problems
//                                  - Fix: smaller issues
//                                  - Remove: useless code

/***************************************************************************************************************************************************************************************************************************
 *
 * Copyright notice
 *
 * (c) 2011-Present Tobias Schneider
 *
 * http://cplusplus.tobsch.org
 *
 * All rights reserved.
 *
 *
 * THIS SOFTWARE IS PROVIDED BY TOBIAS SCHNEIDER ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL TOBIAS SCHNEIDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * This script is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * This copyright notice MUST APPEAR in all copies of this script
 *
 *
 * License: Creative Commons Version 3.0 - http://creativecommons.org/licenses/by-nc-sa/3.0/de/
 **************************************************************************************************************************************************************************************************************************/

// Add CSS-Styles
GM_addStyle("th.header { background-image: url(" + GM_getResourceURL("Icon:sortAscDesc") + "); cursor: pointer;  font-weight: bold;  background-repeat: no-repeat;  background-position: center left;  padding-left: 20px;   border-right: 1px solid #dad9c7;  margin-left: -1px; } ");
GM_addStyle("th.headerSortUp {  background-image: url(" + GM_getResourceURL("Icon:sortAsc") + "); background-color: #2C501F; }");
GM_addStyle("th.headerSortDown { background-image: url(" + GM_getResourceURL("Icon:sortDesc") + "); background-color: #2C501F; }");
GM_addStyle(".main-balance {margin-top: 50px;float: right;width: 450px;}.windowInformations {font-size: 0.65em;border: 1px solid #DAA520;width: 300px;height: 100px;z-index: 1;}.c_tooltip {padding: 1px;border-radius: 2px;text-align: center;min-width: 10px;min-height: 10px;background-color: red;position: relative;top: -10px;left: -5px;font-size: 1em;font-weight: bold;}");

$(function () {
    "use strict";

    Sorter.init();
    AdRemover.removeAds();
    Update.check();

    var $body = $('body');

    if (Helper.isUrl("login.phtml")) {
        Autologin.enhanceLogin();
    }

    if (Helper.startComunioPlusPlus()) {

        Build.blub();

        /*
         * ***********************************************************************************************************
         * NEWS
         * ***********************************************************************************************************
         */
        if (Helper.isUrl("team_news.phtml$")) {
            $('form[name="lineupTip"]').hide();
        }

        /*
         * ***********************************************************************************************************
         * Tip
         * ***********************************************************************************************************
         */
        if (Helper.isUrl("calendarTip.phtml$")) {
            $('div#contentfullsize')
                .prepend($('<br/><br/>'))
                .prepend(
                    $('<div></div>')
                        .css({'text-align': 'center',
                            'border': '1pt solid #ffffff',
                            'box-shadow': '0px 0px 10px #ffffff',
                            'padding': '10px',
                            'border-radius': '10px'
                        })
                        .html("Du darfst hier nicht mitspielen nur weil du kein Geld bezahlen möchtest, aber hast " +
                            "Lust mit deinen Kumpels und Bekannten auf die Bundesliga zu tippen? " +
                            "Dann gehe auf <br/><br/> " +
                            "<a href='http://www.TippTobsch.org'>www.TippTobsch.org</a> <br/><br/> und tippe. " +
                            "So einfach kann Fußball sein. <br/><br/>")
                );
        }

        /*
         * ***********************************************************************************************************
         * STANDINGS
         * ***********************************************************************************************************
         */
        if (Helper.isUrl("standings.phtml")) {
            Sorter.sorting($('.tablecontent03'), {
                headers: {
                    3: {
                        sorter: 'comunioMoney'
                    }
                }
            });
        }

        /*
         * ***********************************************************************************************************
         * EXCHANGEMARKET
         * ***********************************************************************************************************
         */

        if (Helper.isUrl("exchangemarket.phtml")) {

            //$('.tablecontent03 tr.tr1,.tablecontent03 tr.tr2,.tablecontent03 tr.highlightedtablecontent').append($('<td></td>'));
            //$('.tablecontent03').find('tbody tr:first').append($('<th class="header"></th>'));

            if (Helper.isUrl("exchangemarket.phtml$")) {

                // Split the content in two contents
/*                $('#contentfullsize').attr({
                    id: 'contentleftex'
                }).css({
                    'width': '680px'
                });

                $('#content').append($('<div></div>').attr('id', 'smallcontentrightex').css({
                    'width': '130px'
                }).append($('<div></div>').attr('class', 'spacer10px')));*/


                Offers.enhance();

                /**
                 * OBSERVATIONLIST
                 */
                //ObservationList.init();

                /**
                 * Offers-Calculator
                 */
                // only start the calculator if communios calculator is not there
                if ($('div.boxcontentdown').find('> div.bar_content_l').html() === '') {
                    Balance.enhanceBalance();
                }

            } // Ende Transfermarkt
        }

        /*
         * PlayerInfo & Auf den Tranfsfermarkt setzen
         */
        if (Helper.isUrl("playerInfo") || Helper.isUrl("putOnExchangemarket.phtml")) {
            $('.tablecontent03 tr.tr1,.tablecontent03 tr.tr2,.tablecontent03 tr.highlightedtablecontent').append($('<td></td>'));

            Sorter.sorting($('.tablecontent03'), {
                headers: {
                    3: {
                        sorter: 'comunioMoney'
                    }
                }
            });
        }

        /**
         *
         * ACHTUNG: DIES MUSS NACH DEN SEITENVERÄNDERUNGEN KOMMEN
         *
         * Links der Spieler Flaggen und Links der Bundesliga Teams
         *
         * beim TRANSFERMARKT und unterseiten
         *
         * exchangemarket (with no param, viewoffers, changeoffer) -> 1 exchangemarket (declineoffer, acceptoffer, recalloffer), playerInfo -> 2
         */
        if (Helper.isUrl("exchangemarket.phtml") || Helper.isUrl("playerInfo") || Helper.isUrl("putOnExchangemarket.phtml")) {
            var rowPlayerName = 0;
            var rowTeamName = 1;
            var rowUserName = 6;

            if (Helper.isUrl("exchangemarket.phtml?viewoffers") || Helper.isUrl("exchangemarket.phtml?changeoffer")) {
                rowPlayerName = 0;
                rowTeamName = 2;
            }

            if (Helper.isUrl("exchangemarket.phtml?recalloffer") || Helper.isUrl("exchangemarket.phtml?declineoffer") || Helper.isUrl("exchangemarket.phtml?acceptoffer")) {
                rowPlayerName = 1;
                rowTeamName = 3;
            }

            if (Helper.isUrl("exchangemarket.phtml?takeplayeroff") || Helper.isUrl("playerInfo.phtml")) {
                rowPlayerName = 1;
                rowTeamName = 2;
            }

            $('.tablecontent03 tr.tr1,.tablecontent03 tr.tr2,.tablecontent03 tr.highlightedtablecontent').each(function () {

                var actPlayerElem = $(this).children('td:eq(' + rowPlayerName + ')');
                var actPlayerName = actPlayerElem.html();

                var numberStatusElem = ($('.tablecontent03').find('tr:eq(1) td').length) - 1;
                var actStatusElem = $(this).children('td:eq(' + numberStatusElem + ')');

                /**
                 * Link zu ComSearch der Spieler hinzufügen
                 */
                Player.addInformation($(this), rowPlayerName, rowUserName);
                Team.addInformation($(this), rowTeamName, rowUserName);

                /**
                 * Status hinzufügen
                 */
                Player.getStatus(actPlayerName, actStatusElem, 500, false);
            });
        }

        /*
         * ***********************************************************************************************************
         * LINEUP
         * ***********************************************************************************************************
         */
        if (Helper.isUrl("lineup.phtml")) {

            $('span.heading').html('Deine Aufstellung');
            var luTable = $('.tablecontent03');

            if ($(':checkbox').length > 0) {
                luTable.find('tr.tr1 td:nth-child(4), tr.tr2 td:nth-child(4)').attr('align', 'center');
            }

            // remove sponsor in match field
            var lineupBG = $('#lineup_bg');
            lineupBG.find('td:eq(0)').css('background-image', 'url(i/1/lineup_striker_bg.gif)');
            lineupBG.find('td:eq(1)').css('background-image', 'url(i/1/lineup_midfielder_bg.gif)');
            lineupBG.find('td:eq(2)').css('background-image', 'url(i/1/lineup_defender_bg.gif)');
            lineupBG.find('td:eq(3)').css('background-image', 'url(i/1/lineup_keeper_bg.gif)');
            $('#Map,#Map2').remove();

            /*
             * adding com-search links to Lineup page
             *
             * /lineup.phtml$/ -> ending with phtml, no additional params! Lineup (with no param, viewoffers, changeoffer) -> 1 lineup
             */
            luTable.find('tr.tr1, tr.tr2').each(function () {

                var $td = $('<td></td>');

                var actTeamElem = $(this).children('td:eq(1)');
                var actPlayerElem = $(this).children('td:eq(0)');
                var playerNameLineupWithStars = actPlayerElem.html();
                var playerNameLineupWithoutStars = playerNameLineupWithStars.replace(/\*/g, '');

                // names without stars
                actPlayerElem.html(playerNameLineupWithoutStars);

                // add jersey, which represents the last lineup
                var $lastLineUp = $td.clone();
                $(this).append($lastLineUp);
                if (playerNameLineupWithStars !== playerNameLineupWithoutStars) {
                    $(this).append($lastLineUp.append($('<img/>').attr({
                        src: 'http://www.comunio.de/i/i/whitesuit.gif',
                        title: 'Am letzten Spieltag aufgestellt.'
                    })));
                }
                // Add Link to ComSearch of the players
                Player.getInformation(actPlayerElem);

                // add Player status in the row information
                var actStatusElem = $td.clone();
                $(this).append(actStatusElem);
                Player.getStatus(playerNameLineupWithoutStars, actStatusElem, 500, false);

                // add team information on click
                Team.getInformation(actTeamElem);

            });

            // Add matchday information
            var calenderTipUrl = 'http://www.comunio.de/calendarTip.phtml';
            $.get(calenderTipUrl, function (dataCalenderTip) {

                // preparing table
                var table = $('div#contentfullsize form[name="lineupTip"] table.tablecontent03', dataCalenderTip);
                var matchday = table.find("tr:eq(1) td:eq(0)").html();
                table.removeCol(0).removeCol(2).removeCol(3).removeCol(7);
                $('#content').find('form#set_lineup div#contentleft').prepend(table);

                table.find('tr:gt(10)').remove();
                table.find('tr:first').remove();
                table.find('tr:last').remove();

                $('tr', table).each(function () {
                    var teamName1 = $(this).find('td:nth-child(1)');
                    var teamName2 = $(this).find('td:nth-child(3)');
                    var searchString = matchday + '. Spieltag | Aufstellungen: ' + teamName1 + ' - ' + teamName2;
                    $('td:nth-child(5)', $(this)).html('').append(searchForInformationInForum(searchString));
                });

                $('div#contentleft').prepend(Build.header("Begegnungen des " + matchday + ". Spieltages"));

            });

        }
    } // Basic



}); // Ready Function

$.expr[':'].icontains = $.expr.createPseudo(function (arg) {
    "use strict";
    return function (elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

$.fn.removeCol = function (col) {
    "use strict";
    if (!col) {
        col = 1;
    }
    $('tr td:nth-child(' + col + '),tr th:nth-child(' + col + ')', this).remove();
    return this;
};

$.fn.clickToggle = function(func1, func2) {
    "use strict";
    var funcs = [func1, func2];
    this.data('toggleclicked', 0);
    this.click(function() {
        var data = $(this).data();
        var tc = data.toggleclicked;
        $.proxy(funcs[tc], this)();
        data.toggleclicked = (tc + 1) % 2;
    });
    return this;
};

var AdRemover = (function() {
    "use strict";

    var selectors = 'div[id*="advertising"], ' +
        'div[id="msBillboard"],' +
        'div[id="msBGCHeaderDIV"], ' +
        'div[id="msCntID"], ' +
        'div[id="msWrapper"], ' +
        'div[id="msWpSky"], ' +
        'div[id="msWpSb"], ' +
        'div[class="spielerwahl"], ' +
        'div[id="script_cont_1"], ' +
        'div[id*="ads"], ' +
        'div[class*="ads"], ' +
        'div[id="script_cont_2"]';

    return {
        removeAds: function() {
            this.hideElements(this.retrieveElements(selectors));
            this.hideElements(this.retrieveIFrames());
        },

        hideElements: function(elements) {
            if (typeof elements !== 'undefined'){
                for(var i = 0; i < elements.length; i++) {
                    elements[i].style.display = "none";
                }
            }
        },

        retrieveElements: function(selectors){
            if(document.querySelectorAll){
                return document.querySelectorAll(selectors);
            }
            return undefined;
        },

        retrieveIFrames: function(){
            return document.getElementsByTagName("iframe");
        }
    };

}());

var Autologin = (function () {
    "use strict";

    var repeatTimer = 0;
    var C_repeatTime = 5000;

    return {
        enhanceLogin: function () {
            $('div.barcenter')
                .append(
                    $('<div></div>')
                        .css({'width': '220px','margin-left': '10px','margin-top': '35px'
                        }).fadeIn('slow')
                        .append(
                            $('<div></div>')
                                .css({'float': 'left','line-height': '8px'})
                                .attr({class: 'text' })
                                .html('Autologin aktivieren: ')
                                .append($('<input type="checkbox" name="doLogin" value="1" />'))
                        )
                        .append(
                            $('<input type="text" value="5000" title="Neuer Versuch in Millisekunden"/>')
                                .attr({maxlength: '10',size: '5',name: 'inputLoginTime',id: 'inputLoginTime'})
                        )
                        .append(
                            $('<span class="text" title="Millisekunden" > ms</span>')
                        )
                );
        }
    };

}());
/*
 // start autologin immediately when clicking on the checkbox
 $('a.login').click(function () {
 repeatLogin();
 });

 if (Persist.findBy('C++LoginTime') != null) {

 $('input[name="doLogin"]').attr("checked", "checked");

 // start timer for trying every x
 // seconds (default 5secs)
 var repeatTimer = setTimeout(function () {
 repeatLogin();
 }, C_repeatTime);

 console.log("Started autologin timer " + repeatTimer + " (" + C_repeatTime + ")");
 }

 // delete all autologin details
 if (($('#playerstatus').children().length > 0 && Persist.findBy('C++LoginTime') != null) || C_repeatTimer != null) {

 console.log("Delete autologin informations");

 if (C_repeatTimer != null) {
 clearTimeout(C_repeatTimer);
 }
 Persist.remove('C++LoginTime');
 Persist.remove('C++LoginUser');
 Persist.remove('C++LoginPW');
 }


 function repeatLogin() {

 var doSubmit = false;

 var inputLoginTime = $('input[name="inputLoginTime"]');
 var inputPass = $('input[name="pass"]');
 var inputLogin = $('input[name="login"]');


 // is checkbox checked
 if (inputLoginTime.is(':checked')) {
 if (Persist.findBy('C++LoginTime') != null) {
 console.log("Restore the autologin informations");

 // get saved data from user input before
 inputLogin.val(Persist.findBy('C++LoginUser'));
 inputPass.val(Persist.findBy('C++LoginPW'));

 inputLoginTime.val(Persist.findBy('C++LoginTime')).attr("disabled", "disabled");

 C_repeatTime = Persist.findBy('C++LoginTime');

 doSubmit = true;

 } else {
 console.log("Save the parameters for autologin");

 // get login informations
 var login = inputLogin.val();
 var password = inputPass.val();

 // set timeout
 C_repeatTime = parseInt(inputLoginTime.val());
 inputLoginTime.attr("disabled", "disabled");
 if (C_repeatTime < 3000) {
 C_repeatTime = 5000;
 inputLoginTime.val(C_repeatTime);
 }

 if (password != '' && login != '') {
 // data is available - save it for next try
 Persist.persist('C++LoginUser', login);
 Persist.persist('C++LoginPW', password);
 Persist.persist('C++LoginTime', C_repeatTime);

 doSubmit = true;

 } else if (password == '' || login == '') {
 // error handling : no data input available - print warning
 inputLoginTime.removeAttr("checked");
 $('#contentfullsize').prepend(
 $('<div class="warning">C++: Bitte tippe zuerst deinen Benutzernamen und Passwort ein und klicke dann auf \"Autologin aktivieren\"</div>'));
 }
 }

 if (doSubmit) {
 $('form[name="login"]').submit();
 }

 } else {
 console.log("deleted all restored autologin informations");
 Persist.remove('C++LoginTime');
 Persist.remove('C++LoginUser');
 Persist.remove('C++LoginPW');
 }
 }
 */

var Balance = (function () {
    "use strict";

    var acceptedOffersUrl = 'http://www.comunio.de/exchangemarket.phtml?viewoffers_x=34';

    return {
        enhanceBalance: function () {
            this.draw();
            this.registerEvents();
            this.calculateBalance();
            this.retreiveSumOfAcceptedOffers(acceptedOffersUrl, parseInt(0));
        },

        draw: function () {

            var divCalsOffers = Build.div({attr : {class: 'main-balance'}});
            var offersHeader = Build.header('Angebotsrechner');

            divCalsOffers.append(offersHeader)
                .append(Build.balanceRow('bar', 'Kontostand:', 'actualBalance'))
                .append(Build.balanceRow('bar', 'Spielergehälter:', 'acceptedOffers'))
                .append(Build.balanceRow('bar', 'Summe aller <b>offenen</b> Gebote von Dir:', 'openOffers'))
                .append(Build.balanceRow('boxcontentdown', 'Kontostand wenn die Gebote angenommen werden:', 'newBalance'));

            $('.boxcontentdown').after(divCalsOffers);

        },

        registerEvents: function () {
            var that = this;
            $(".tablecontent03").on("click", "input.tm_textinput",function () {
                that.calculateBalance();
            }).on("blur", "input.tm_textinput", function () {
                that.calculateBalance();
            });
        },

        retreiveSumOfAcceptedOffers: function (acceptedOffersUrl, sumAcceptedOffers) {
            var numbersOfOpenOffers = parseInt(0);
            var that = this;

            $.get(acceptedOffersUrl, function (data) {

                $('.tr1:icontains("Akzeptiert"), .tr2:icontains("Akzeptiert")', data).each(function () {
                    sumAcceptedOffers += parseInt($(this).find(':eq(4)').html().replace(/\./g, ''));
                });

                $('#acceptedOffers').html(that.formatMoney(sumAcceptedOffers));

                that.calculateBalance();
                numbersOfOpenOffers = parseInt($('.tr1:contains("Offen"), .tr2:contains("Offen")', data).length);

                var newAcceptedOffersHref = $('div#contentleftex div:nth-child(3) > div#newsnaviends > span.button02:eq(0) > a', data).attr('href');
                if (!!newAcceptedOffersHref && numbersOfOpenOffers > 0) {
                    that.retreiveSumOfAcceptedOffers('http://www.comunio.de/' + newAcceptedOffersHref, sumAcceptedOffers);
                }
                return sumAcceptedOffers;
            });
        },

        calculateBalance: function () {

            var balanceArray = $('div#userbudget > p').html().split('&nbsp;');
            var balance = parseInt(balanceArray[1].replace(/\./g, ''));
            var actualBalance = this.formatMoney(balance);

            if (actualBalance > 0) {
                $('#actualBalance').html(actualBalance).css('color', 'black');
            }
            else {
                $('#actualBalance').html(actualBalance).css('color', 'red');
            }

            var openOffersSum = parseInt(0);
            $('.tablecontent03').find('input.tm_textinput').each(function () {
                var playerValue = parseInt($(this).val().replace(/\./g, ''));
                if (!isNaN(playerValue)) {
                    openOffersSum += parseInt(playerValue);
                }
            });
            $('#openOffers').html(this.formatMoney(openOffersSum));

            var sumAcceptOffers = parseInt($('#acceptedOffers').html().replace(/\./g, '').replace(/€/g, ''));
            var newBalance = (parseInt(balance) - parseInt(openOffersSum) + sumAcceptOffers);
            if (newBalance > 0) {
                $('#newBalance').html(this.formatMoney(newBalance)).css('color', 'white');
            }
            else {
                $('#newBalance').html(this.formatMoney(newBalance)).css('color', 'red');
            }
        },

        formatMoney: function(number){
            return Helper.numberFormat(number, 0, '.', '.') + " €";
        }

    };
}());

var Build = (function () {
    "use strict";

    return {
        div: function (options) {
            return merge(jQuery('<div></div>'), options);
        },

        header: function (topic) {
            var $headerDiv = this.div({attr :{class: 'titleboxcontent'}});
            var $firstB = $('<b></b>').addClass("top");
            $headerDiv.append(this.div({attr :{class: 'edgetitle'}}).append($firstB));
            for (var i = 1; i <= 11; i++) {
                $firstB.append($('<b></b>').addClass('e' + i));
            }
            $headerDiv.append(this.div({attr :{class: 'titlecontent'}}).append($('<h2></h2>').html(topic)));

            return $headerDiv.clone();
        },

        balanceRow: function (outerClass, name, id) {
            return this.div({attr :{class: outerClass}})
                .append(
                    this.div({attr :{class: 'bar_content_l', text: name}})
                ).append(
                    this.div({attr :{class: 'bar_content_r', id: id}})
                );
        },

        sidebarTable: function (topic, ID) {
            var sidebar = $("#smallcontentrightex");

            var sidebarHeadTable = this.header(topic);
            sidebar.append(sidebarHeadTable.css('width', '100%'));

            // body
            var sidebarBodyTable = $('<table></table>').attr({
                cellspacing: '0',
                cellpadding: '4',
                border: '0',
                id: "sidebar" + ID + "Body"
            }).css({
                'width': '100%',
                'height': '20px',
                'font-size': '0.7em'
            });
            sidebar.append(sidebarBodyTable);

            return sidebarBodyTable;
        },

        blackOut: function (options) {

            var blackCurtain = jQuery('<div></div>')
                .css({
                    'width': jQuery(document).width(),
                    'height': jQuery(document).height(),
                    'top': '0px',
                    'left': '0px',
                    'position': 'absolute',
                    'z-index': '101',
                    'background-color': 'black'
                })
                .fadeTo('slow', 0.7)
                .click(function () {
                    jQuery(this).hide();
                    jQuery(options.classesToHide).hide();
                });

            jQuery('body').prepend(blackCurtain);
        },


        blub: function () {

            var $body = $('body');
            $('div#playerstatus').css("z-index", '100003');

            $('span.basic').html('C++')
                .css({cursor: 'pointer'})
                .attr({'class': 'plus'})
                .clickToggle(function () {
                    var maxZIndex = Helper.getMaxZIndex();

                    $('.contentInfo').css({
                        'z-index': maxZIndex + 2
                    }).fadeIn();

                    $('#backgroundInfo').css({
                        'z-index': maxZIndex + 1
                    }).fadeTo('slow', 0.7);

                    $('#playerstatus').css({
                        'z-index': maxZIndex + 2
                    });
                }, function () {
                    $('.contentInfo').hide();
                    $('#backgroundInfo').hide();
                });

            // show c++ information when hover over C++ symbol in header
            $body.prepend(this.div({attr:{'id': 'backgroundInfo'},
                css :{
                    'width': $(document).width(),
                    'height': $(document).height(),
                    'top': '0px',
                    'left': '0px',
                    'position': 'absolute',
                    'z-index': '100001',
                    'background-color': 'black'
                }}).hide().click(function () {
                    $(this).hide();
                    $('.contentInfo').hide();
                }
            ));

            var infoDiv = this.div({css : {
                'width': '500px',
                'position': 'absolute',
                'top': '35%',
                'left': ($(document).width() / 2) - 250,
                'z-index': '100002',
                'border-width': '1px',
                'border-style': 'solid',
                'border-radius': '5px'
            }, attr: {
                'id': 'content',
                'class': 'contentInfo'
            }}).hide();

            $body.append(infoDiv);

            var infoHeader = Build.header("Comunio++ (C++)");
            infoHeader.css({
                'margin': '10px 10px 10px 10px',
                'width': '480px'
            });
            infoDiv.append(infoHeader);

            var testDiv = this.div({css : {
                'margin': '10px 10px 10px 10px',
                'width': '480px',
                'font-size': '0.9em'
            }, text : '<strong>Author</strong> ' + 'Tobsch'});

            infoDiv.append();

            infoDiv.append(testDiv.clone().html('<strong>Version</strong> ' + GM_info.script.version));
            infoDiv.append(testDiv.clone().html('<strong>Homepage</strong> ')
                .append($('<a>cplusplus.Tobsch.org</a>').attr({
                    'href': 'http://cplusplus.Tobsch.org'
                })));

            infoDiv
                .append(testDiv
                    .clone()
                    .html('<strong>Spenden</strong> Wenn du für diese Entwicklung spenden möchtest. Hast du über Paypal und Flattr die Möglichkeit dies zu tun.')
                    .append(
                        $('<br/><br/><form action="https://www.paypal.com/cgi-bin/webscr" method="post"> <input type="hidden" name="cmd" value="_s-xclick"> <input type="hidden" name="hosted_button_id" value="K2NHN99EQLKJ8"> <input type="image" src="https://www.paypalobjects.com/WEBSCR-640-20110429-1/de_DE/DE/i/btn/btn_donate_SM.gif" name="submit" alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal."><img alt="" border="0" src="https://www.paypalobjects.com/WEBSCR-640-20110429-1/de_DE/i/scr/pixel.gif" width="1" height="1"></form>'))
                    .append(
                        $('<br/><a class="FlattrButton" style="display:none;" rev="flattr;button:compact;" href="http://cplusplus.tobsch.org"></a><noscript><a href="http://flattr.com/thing/947737/C" target="_blank"><img src="http://api.flattr.com/button/flattr-badge-large.png" alt="Flattr this" title="Flattr this" border="0" /></a></noscript>')));


        }
    };

    function merge(element, options) {
        if (options.text) {
            element.html(options.text);
        }
        if (options.attr) {
            element.attr(options.attr);
        }
        if (options.css) {
            element.attr(options.css);
        }
        return element.clone();
    }

}());

function searchForInformationInForum(information) {
    "use strict";

    return $('<form style="display: inline;" target="_blank" name="comunio_forumsuche" method="POST" action="http://www.comunio.de/external/phpBB2/search.php"></form>')
    .append($('<input />').attr({
        type: 'image',
        value: 'any',
        alt: 'suche',
        src: GM_getResourceURL("Icon:searchForum"),
        name: 'comunio_forum'
    }).css({
            width: '12px',
            height: '12px'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: information,
            name: 'search_keywords'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: '',
            name: 'search_terms'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: '',
            name: 'search_author'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: '-1',
            name: 'search_forum'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: '0',
            name: 'search_time'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: 'topics',
            name: 'show_results'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: 'titleonly',
            name: 'search_fields'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: '-1',
            name: 'search_cat'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: '0',
            name: 'sort_by'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: 'DESC',
            name: 'sort_dir'
        })
    ).append($('<input />').attr({
            type: 'hidden',
            value: '-1',
            name: 'return_chars'
        })
    );
}

var Helper = (function () {
    "use strict";

    return {
        numberFormat: function(number, decimals, dec_point, thousands_sep) {
            number = (number + '').replace(',', '').replace(' ', '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                toFixedFix = function (n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            var s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },

        htmlEntities: function(newString) {
            var chars = ['\'', '&', 'ÃƒÂ ', 'ÃƒÂ¡', 'ÃƒÂ¢', 'ÃƒÂ£', 'ä', 'ÃƒÂ¥', 'ÃƒÂ¦', 'ÃƒÂ§', 'ÃƒÂ¨', 'ÃƒÂ©', 'ÃƒÂª', 'ÃƒÂ«', 'ÃƒÂ¬', 'ÃƒÂ­', 'ÃƒÂ®', 'ÃƒÂ¯', 'ÃƒÂ°', 'ÃƒÂ±',
                'ÃƒÂ²', 'ÃƒÂ³', 'ÃƒÂ´', 'ÃƒÂµ', 'ö', 'ÃƒÂ¸', 'ÃƒÂ¹', 'ÃƒÂº', 'ÃƒÂ»', 'ü', 'ÃƒÂ½', 'ÃƒÂ¾', 'ÃƒÂ¿', 'Ãƒâ‚¬', 'Ãƒï¿½', 'Ãƒâ€š', 'ÃƒÆ’', 'Ãƒâ€ž', 'Ãƒâ€¦', 'Ãƒâ€ ',
                'Ãƒâ€¡', 'ÃƒË†', 'Ãƒâ€°', 'ÃƒÅ ', 'Ãƒâ€¹', 'ÃƒÅ’', 'Ãƒï¿½', 'ÃƒÅ½', 'Ãƒï¿½', 'Ãƒï¿½', 'Ãƒâ€˜', 'Ãƒâ€™', 'Ãƒâ€œ', 'Ãƒâ€�', 'Ãƒâ€¢', 'Ãƒâ€“', 'ÃƒËœ', 'Ãƒâ„¢', 'ÃƒÅ¡',
                'Ãƒâ€º', 'ÃƒÅ“', 'Ãƒï¿½', 'ÃƒÅ¾', '€', '\"', 'ß', '<', '>', 'Ã‚Â¢', 'Ã‚Â£', 'Ã‚Â¤', 'Ã‚Â¥', 'Ã‚Â¦', 'Ã‚Â§', 'Ã‚Â¨', 'Ã‚Â©', 'Ã‚Âª', 'Ã‚Â«', 'Ã‚Â¬', 'Ã‚Â­', 'Ã‚Â®',
                'Ã‚Â¯', 'Ã‚Â°', 'Ã‚Â±', 'Ã‚Â²', 'Ã‚Â³', 'Ã‚Â´', 'Ã‚Âµ', 'Ã‚Â¶', 'Ã‚Â·', 'Ã‚Â¸', 'Ã‚Â¹', 'Ã‚Âº', 'Ã‚Â»', 'Ã‚Â¼', 'Ã‚Â½', 'Ã‚Â¾', '\\040', '\\.'];

            var entities = ['', 'amp', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute',
                'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'Agrave',
                'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve',
                'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'euro', 'quot', 'szlig', 'lt', 'gt', 'cent', 'pound', 'curren',
                'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil',
                'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', '', ''];

            for (var i = 0; i < chars.length; i++) {
                newString = newString.replace(new RegExp(chars[i], "g"), entities[i]);
            }
            return newString;
        },

        getMaxZIndex: function() {
            var maxZIndex = 0;
            $('div').each(function () {
                maxZIndex = Math.max(maxZIndex, this.style.zIndex);
            });
            return maxZIndex;
        },

        elementExists: function (selector) {
            return $(selector).length !== 0;
        },

        isUrl: function (urlMatcher, withoutAnchor) {
            if (withoutAnchor === undefined || withoutAnchor === null) {
                withoutAnchor = false;
            }

            var url = window.location.href;
            if (withoutAnchor) {
                url = url.match(/(^[^#]*)/)[0];
            }
            return new RegExp(urlMatcher, "i").test(url);
        },

        startComunioPlusPlus: function() {
            return ($('span.basic').html() === "basic" || this.isUrl("playerInfo"));
        }

    };

}());



var ObservationList = (function () {
    "use strict";

    return {
        put: function (playerName) {
            playerName = playerName.replace(/^\s+/g, '').replace(/\s+$/g, '');
            if (playerName) {
                if (Persist.findBy('OLlength') === undefined){
                    Persist.persist('OLlength', 0);
                }
                var notinList = true;
                var olLength = parseInt(Persist.findBy('OLlength'));
                for (var k = 1; k <= olLength; k++) {
                    var key = 'OL' + k;
                    if (Persist.findBy(key) === playerName) {
                        notinList = false;
                    }
                }
                if (notinList) {
                    var newOlLength = parseInt(Persist.findBy('OLlength')) + 1;
                    var playerKey = 'OL' + newOlLength;
                    Persist.persist(playerKey, playerName);
                    Persist.persist('OLlength', newOlLength);
                }

                return notinList;
            }
            return false;
        },

        remove: function (playerName) {
            playerName = playerName.replace(/^\s+/g, '').replace(/\s+$/g, '');
            if (Persist.findBy('OLlength') !== undefined && playerName) {

                var olLength = parseInt(Persist.findBy('OLlength'));
                var deletePlayer = false;

                for (var k = 1; k <= olLength && !deletePlayer; k++) {
                    var key = 'OL' + k;
                    if (Persist.findBy(key) !== undefined && Persist.findBy(key).toLowerCase() === playerName.toLowerCase()) {
                        Persist.remove(key);
                        deletePlayer = true;
                    }
                }
                k--;

                // reorder the list
                if (k < olLength) {
                    var maxKey = 'OL' + Persist.findBy('OLlength');
                    var tempName = Persist.findBy(maxKey);
                    Persist.remove(maxKey);
                    var newKey = 'OL' + k;
                    Persist.persist(newKey, tempName);
                }
                if (olLength > 0 && deletePlayer){
                    Persist.persist('OLlength', (olLength - 1));
                }

                return deletePlayer;
            }

            return false;
        },

        clear: function () {
            if (Persist.findBy('OLlength') !== undefined && Persist.findBy('OLlength') > 0) {
                var olLength = parseInt(Persist.findBy('OLlength'));
                for (var k = 1; k <= olLength; k++) {
                    var key = 'OL' + k;
                    if (!!Persist.findBy(key)) {
                        Persist.remove();
                    }
                }
                Persist.remove('OLlength');

                return true;
            }

            return false;
        },

        drawOn: function(){

            var playerName = $('input[name="inputOL"]').val().replace(/^\s+/g, '').replace(/\s+$/g, '');

            if (ObservationList.put(playerName)) {

                var playerElem = $('<td></td>').css({
                    'padding-left': '5px',
                    'font-size': '1.5em'
                }).html(playerName);

                var statusElem = $('<td></td>');

                $('#sidebarOLBody')
                    .css('font-size', '0.7em')
                    .append(
                        $('<tr></tr>')
                            .attr({class: 'highlightedtablecontent',name: 'playerOnList'})
                            .css({'height': '18px'})
                        .append(playerElem)
                        .append(statusElem)
                        .append(
                            $('<td></td>').append($('<a><img src="' + GM_getResourceURL("Icon:removePlayer") + '"height="13" width="13" border="0"/></a>').click(function () {
                                if (ObservationList.remove(playerName)) {
                                    $(this).hide();
                                    $(this).parent().parent().hide('fast');

                                    $(".tablecontent03").find("tr td:first-child span").each(function () {
                                        var myrxp = new RegExp("^" + playerName + "$", "i");
                                        if (myrxp.test($(this).html())) {
                                            $(this).parent().parent("tr").attr({
                                                class: 'tr1'
                                            });
                                        }
                                    });
                                }
                            }).attr({title: 'Von der Beobachtungsliste nehmen.',
                                href: '',
                                class: 'button02'
                            }).css('height', '15px'))
                        )
                    );

                // replace class of row in Table
                $(".tablecontent03").find("tr td:first-child span").each(function () {
                    var myrxp = new RegExp("^" + playerName + "$", "i");
                    if (myrxp.test($(this).html())) {
                        $(this).parent().parent("tr").attr({
                            'name': 'playerOnTable',
                            class: 'highlightedtablecontent'
                        });
                    }
                });

                // Input leeren
                $('input[name="inputOL"]').val('');
                $('#clearListIcon').find('img').hide('slow');

                // SpielerInformation hinzufügen
                Player.getInformation(playerElem);
                Player.getStatus(playerName, statusElem, 500, false);
            }

        },

        init: function(){

            // change the style of the players on the exchangemarket which are on the observationlist
            if (Persist.findBy('OLlength')) {
                for (var k = 1; k <= Persist.findBy('OLlength'); k++) {
                    var savedOL = 'OL' + k;
                    if (Persist.findBy(savedOL) !== undefined) {
                        $(".tablecontent03").find("tr td:first-child").each(function () {
                            var myrxp = new RegExp("^" + Persist.findBy(savedOL) + "$", "i");
                            if (myrxp.test($(this).html())) {
                                $(this).parent("tr").attr({
                                    class: 'highlightedtablecontent',
                                    'name': 'playerOnTable'
                                });
                            }
                        });
                    }
                }
            }

            var $sidebarBodyTable = Build.sidebarTable('Beobachtungsliste', 'OL');
            var sidebarBodyTr = $('<tr></tr>').css('height', '25px').attr('class', 'tr1');

            $sidebarBodyTable.append(sidebarBodyTr);
            sidebarBodyTr
                .append(
                    $('<td></td>').attr({ 'colspan': '2'}).append(
                        $('<input type="text" value="" />')
                            .attr({
                                class: 'inputText',
                                maxlength: '40',
                                size: '15',
                                name: 'inputOL',
                                id: 'inputOL'
                            })
                            .css({
                                'margin-left': '3px',
                                'font-size': '1.3em'
                            })
                            .keyup(function (e) {
                                if (e.keyCode === 13) {
                                    this.drawOn();
                                }
                            })
                    )
                )
                .append(
                    $('<td></td>').append($('<a></a>').attr({
                        title: 'Zur Beobachtungsliste hinzufügen.',
                        href: '',
                        class: 'button02'
                    }).append('<img src="' + GM_getResourceURL("Icon:addPlayer") + '" height="16" width="16" border="0"/>').click(function () {
                    this.drawOn();
                    }))
                );

            // clear observationlist
            var sidebarBodyTrClear = $('<tr></tr>').css('height', '25px').attr('class', 'tr1');
            $sidebarBodyTable.css('font-size', '0.7em').append(sidebarBodyTrClear);

            sidebarBodyTrClear.append($('<td></td>').attr({
                'colspan': '2'
            }).append($('<a></a>').attr({
                    'colspan': '2',
                    'title': 'Beobachtungsliste leeren.',
                    'href': '',
                    'class': 'button02'
                }).css({
                    'font-size': '8.5px'
                }).html('Liste leeren').click(function () {
                    $('#clearListIcon').html('<img src="' + GM_getResourceURL("Icon:clearOLLoader") + '" height="16" width="16" />');
                    ObservationList.clear();
                    $('tr[name="playerOnList"]').hide('slow');
                    $('tr[name="playerOnTable"]').attr('class', 'tr1');
                    setTimeout(function () {
                        $('#clearListIcon').html('<img src="' + GM_getResourceURL("Icon:clearedOLLoader") + '" />');
                    }, 500);
                })));
            sidebarBodyTrClear.append($('<td></td>').attr({
                'id': 'clearListIcon'
            }).html(''));

            // sidebar
            for (var ki = 1; ki <= Persist.findBy('OLlength'); ki++) {
                var OL = 'OL' + ki;
                var playerName = Persist.findBy(OL).replace(/^\s+/g, '').replace(/\s+$/g, '');
                var classOfList = "tr" + ((ki % 2) + 1);

                var trOfList = $('<tr></tr>').attr({
                    'class': classOfList,
                    'name': 'playerOnList'
                }).css({
                    'height': '18px'
                });

                $('#sidebarOLBody').append(trOfList);

                var playerElem = $('<td></td>').css({
                    'padding-left': '5px',
                    'font-size': '1.5em'
                }).html(playerName);

                trOfList.append(playerElem);
                Player.getInformation(playerElem);

                var statusElem = $('<td></td>');
                trOfList.append(statusElem);
                Player.getStatus(playerName, statusElem, 500, false);

                trOfList.append($('<td></td>')
                    .append($('<a><img src="' + GM_getResourceURL("Icon:removePlayer") + '" height="13" width="13" border="0"/></a>').click(function () {
                        var deletePlayerName = $(this).parent().parent().children().children().html();
                        if (ObservationList.remove(deletePlayerName)) {
                            $(this).hide();
                            $(this).parent().parent().hide('fast');
                            $('.tablecontent03').find('tr:icontains(' + deletePlayerName + ')').attr('class', 'tr1');
                        }
                    }).attr({
                        title: 'Von der Beobachtungsliste nehmen.',
                        href: '',
                        class: 'button02'
                    }))
                );
            }
        }
    };

}());

var Offers = (function () {
    "use strict";

    var offersUrl = 'http://www.comunio.de/exchangemarket.phtml?acceptoffer_x=34';

    return {
        enhance: function () {
            $.get(offersUrl, function (data) {

                var numbersOfOffer = $(':checkbox', data).length;

                if (numbersOfOffer > 0) {

                    var offersHeaderTr = $('form > div.titleboxcontent > div.titlecontent');
                    var $body = $('body');

                    $body.append($('<div id="yourOffers"></div>').css({
                        border: "1px solid #DAA520",
                        position: "fixed",
                        top: "50px",
                        right: "50px",
                        'z-index': Helper.getMaxZIndex() + 1,
                        padding: "5px",
                        'border-radius': '5px',
                        'background-color': "#000000"
                    }).append($('.tablecontent03', data).removeCol().removeCol(7)).hide());

                    // add informations about the players and teams
                    $('.tablecontent03 tr.tr1,.tablecontent03 tr.tr2').each(function () {
                        // add new Colunm
                        var $actStatusElem = $('<td ></td>');
                        $(this).append($actStatusElem);

                        var actPlayerElem = $(this).children('td:eq(0)');
                        var actPlayerName = actPlayerElem.html();
                        var numberStatusElem = ($('.tablecontent03').find(' tr:eq(1) td').length) - 1;
                        var actStatusElem = $(this).children('td:eq(' + numberStatusElem + ')');

                        // add informations
                        Player.addInformation($(this), 0, 1);
                        Team.addInformation($(this), 2, 1);

                        Player.getStatus(actPlayerName, $actStatusElem, 500, false);
                    });

                    Sorter.sorting($('.tablecontent03'),{
                        headers: {
                            3: {
                                sorter: 'comunioMoney'
                            },
                            4: {
                                sorter: 'comunioMoney'
                            }
                        },
                        sortList: [
                            [ 3, 1 ],
                            [ 0, 0 ]
                        ],
                        locale: 'de'
                    });

                    $body.append($('<div id="closeOffers"></div>').css({
                        'position': "fixed",
                        'top': "35px",
                        'right': "35px",
                        'z-index': Helper.getMaxZIndex() + 1
                    }).click(function () {
                        $('#closeOffers').toggle();
                        $('#yourOffers').toggle();
                    }).mouseover(function () {
                        $(this).css({
                            cursor: 'pointer'
                        });
                    }).append($('<img />').attr({
                            src: GM_getResourceURL("Icon:crossCircle"),
                            title: 'Fenster schließen'
                        }).css({
                            width: "15px",
                            height: "15px"
                        })).hide()
                    );

                    offersHeaderTr
                        .append($('<h2 style="font-size:0.9em; font-weight:bold; margin:0 10px;" id="tooltipOffers" >' + numbersOfOffer + ' Angebote</h2>'))
                        .append($('<a>annehmen</a>').css({
                            'font-size': '0.8em'
                        }).attr({
                            href: "http://www.comunio.de/exchangemarket.phtml?acceptoffer_x=34",
                            title: "Angebote annehmen",
                            class: "button01",
                            target: "_self",
                            id: "acceptOfferHeader"
                        }))
                        .append($('<a>ablehnen</a>').css({
                            'font-size': '0.8em'
                        }).attr({
                            href: "http://www.comunio.de/exchangemarket.phtml?declineoffer_x=34",
                            title: "Angebote ablehnen",
                            class: "button02",
                            target: "_self",
                            id: "declineOfferHeader"
                        })
                        );

                    // show offers on click on the tooltip
                    $("#tooltipOffers").click(function () {
                        $('#closeOffers').toggle();
                        $('#yourOffers').toggle();
                    });

                }
            });
        }
    };

}());

var Persist = (function () {
    "use strict";

    var prefix = 'c++:';

    return {
        persist: function (key, value) {
            key = prefix + '' + key;
            GM_setValue(key, jQuery.toJSON(value));
        },

        findBy: function (key) {
            key = prefix + '' + key;
            var storedObject = GM_getValue(key);
            if (!!storedObject) {
                return jQuery.evalJSON(storedObject);
            }
            return undefined;
        },

        remove: function (key) {
            key = prefix + '' + key;
            return GM_deleteValue(key);
        }
    };

}());


var Player = (function () {
    "use strict";

    var C_getPlayerStatusTime = (24 * 60 * 60 * 1000) * 3;
    var C_getPlayerStatusWaitingTime = 60000 * 2;
    var C_getPlayerStatusCount = 30;

    return {
        getInformation: function (playerElem) {
            var playerName = playerElem.html();
            var toggleElement = true;

            if (!playerName.match(/[<>:0-9]/g)) {

                playerElem.html('').append($('<span>' + playerName + '</span>').mouseover(function () {
                    $(this).css({
                        cursor: 'pointer'
                    });
                }).attr({
                    title: 'Spieler-Information öffnen'
                }).click(function (event) {
                    if (toggleElement) {

                        $(this).attr({
                            title: 'Spieler-Information schließen'
                        }).css({
                            color: 'green'
                        });

                        $('#playerInformation' + Helper.htmlEntities($(this).html())).css({
                            'z-index': Helper.getMaxZIndex() + 1,
                            'position': 'absolute',
                            'top': (event.pageY - 20),
                            'left': (event.pageX + 40),
                            'background': '#003300'
                        }).show('fast');

                    } else {
                        $(this).attr({
                            title: 'Spieler-Information öffnen'
                        }).css({
                            color: 'black'
                        });
                        $('#playerInformation' + Helper.htmlEntities($(this).html())).hide('fast');
                    }
                    toggleElement = !toggleElement;
                }));

                $('body').append(
                    $('<div id="playerInformation' + Helper.htmlEntities(playerName) + '"></div>').css({
                        'border-radius': '5px',
                        'font-size': '.9em'
                    }).attr({
                        align: 'center',
                        class: 'windowInformations'
                    }).append($('<div></div>').css({
                            'text-align': 'right'
                        }).append($('<img />').attr({
                                'name': playerName,
                                'src': GM_getResourceURL("Icon:crossCircle"),
                                'width': '14',
                                'height': '14',
                                'title': 'Fenster schließen'
                            }).click(function () {

                                $('span:contains(' + $(this).attr('name') + ')').css('color', 'black');
                                $(this).parent().parent().hide('fast');
                                toggleElement = true;

                            }))).append(
                            $('<table></table>').
                                append(
                                    $('<tr></tr>').append($('<td colspan="2"> Spieler-Information zu <h1><span style="font-size:.6em;">' + playerName + '</span></h1></td>')))
                                /*.append(
                                 $('<tr></tr>').append($('<td>ComSearch </td>')).append($('<td></td>').append(
                                 $('<a></a>').append($('<img />').css({
                                 border: 0
                                 }).attr({
                                 src: GM_getResourceURL("Icon:ComSearch"),
                                 title: playerName + ' auf ComSearch',
                                 "width": "16",
                                 "height": "16"
                                 })).attr({
                                 href: 'http://www.com-search.de/showPlayer.php?Player=' + escape(playerName),
                                 target: '_blank'
                                 }))))*/
                                .append(
                                    $('<tr></tr>')
                                        .append(
                                            $('<td>Comunio Forum</td>')
                                        ).append(
                                            $('<td></td>')
                                                .append(
                                                    searchForInformationInForum(playerName)
                                                ).attr({title: playerName + ' im Comunio Forum'})
                                        )
                                )
                        ).hide());

            }

        },

        getStatus: function (playerName, statusElem, updateTime, deleteActData) {

            // only does if its does not contain an XHTML element
            if (!playerName.match(/[<>:0-9]/g)) {

                // start loader gif
                var loader = $('<img>').attr({
                    width: '20',
                    height: '20',
                    border: '0',
                    alt: '',
                    src: GM_getResourceURL("Icon:clearOLLoader")
                }).attr("title", "Status des Spielers wird eingeholt.");

                // Init
                if (updateTime < 0) {
                    updateTime = C_getPlayerStatusTime;
                }

                var date = new Date();
                var playerNameEntities = Helper.htmlEntities(playerName);

                // get new data even the time is not over
                if (deleteActData) {
                    statusElem.children().remove();
                    GM_deleteValue(playerNameEntities);
                }

                var receivedPlayerObject = eval(GM_getValue(playerNameEntities, -1));
                // console.log(receivedPlayerObject);
                var lastUpdateTime = -1;
                if (receivedPlayerObject !== -1) {
                    lastUpdateTime = receivedPlayerObject.lastUpdateTime;
                }

                // use the old/saved data
                if (lastUpdateTime !== -1) {
                    this.getStatusIcon(statusElem, receivedPlayerObject.statusInfo, receivedPlayerObject.status, playerName);
                } else {
                    // no saved data available
                    //statusElem.append(loader.clone()); TODO
                }

                if (parseInt(GM_getValue("C_LastPlayerStatusCounter", -1)) < C_getPlayerStatusCount || deleteActData) {
                    if (GM_getValue("C_LastPlayerStatusCounter", -1) === -1){
                        GM_setValue("C_LastPlayerStatusCounter", 0);
                    }

                    // get new data
                    if ((parseInt(lastUpdateTime) + parseInt(updateTime)) < parseInt(date.getTime()) || lastUpdateTime === -1) {
                        console.log("Receiving data for Player: " + playerName);

                        statusElem.children().remove();
                        // statusElem.append(loader.clone()); TODO

                        var playerUrl = 'http://www.com-search.de/showPlayer.php?Player=' + escape(playerName);
                        /*                        GM_xmlhttpRequest({
                         url: playerUrl,
                         method: "GET",
                         onload: function (responseObject) {
                         var data = responseObject.responseText;

                         var playerStatusComSearch = $(".playerStatusFit,.playerStatusInjured", data);
                         var playerPoints = $("tr:contains('Gesamt') > td.playerStatsText", data).html().replace(/\s+/g, "");
                         var playerPointsPerGame = $("tr:contains('Schnitt') > td.playerStatsText", data).html().replace(/\s+/g, "");
                         var playerClub = $("tr:contains('Verein') > td > a.teamLink", data).html().replace(/\s+/g, "");

                         var playerStatusInfo = playerStatusComSearch.attr("title");
                         var playerStatus = playerStatusComSearch.attr("class");
                         var lastPlayerUpdateTime = date.getTime().toString();

                         // delete loader
                         statusElem.children().remove();

                         getStatusIcon(statusElem, playerStatusInfo, playerStatus, playerName);

                         */
                        /*
                         * Persistente speicherung
                         */
                        /*
                         var playerObject = new Player(playerName, playerClub, playerStatus, playerStatusInfo, playerPoints, playerPointsPerGame, lastPlayerUpdateTime);
                         GM_setValue(playerNameEntities, playerObject.toSource());

                         GM_setValue("C_LastPlayerStatusCounter", GM_getValue("C_LastPlayerStatusCounter") + 1);
                         if (GM_getValue("C_LastPlayerStatusCounter") >= C_getPlayerStatusCount) {
                         GM_setValue("C_LastPlayerStatusUpdateTime", date.getTime().toString());
                         }

                         },
                         onerror: function () {
                         statusElem.children().remove();

                         statusElem.append($('<img>').attr({
                         width: '25',
                         height: '25',
                         border: '0',
                         alt: '',
                         src: GM_getResourceURL("Icon:removePlayer")
                         }).attr("title", "Keine Daten verfügbar").click(function () {
                         getStatus(playerName, statusElem, 0, true);
                         }));

                         }
                         });*/
                    }
                } else {

                    if (lastUpdateTime === -1) {
                        var timeToWait = Math.round(parseInt((parseInt(GM_getValue("C_LastPlayerStatusUpdateTime")) + parseInt(C_getPlayerStatusWaitingTime)) - parseInt(date.getTime())) / parseInt(60000));
                        statusElem.children().remove();
                        statusElem.append($('<img>').attr({
                            width: '25',
                            height: '25',
                            border: '0',
                            alt: '',
                            src: GM_getResourceURL("Icon:removePlayer")
                        }).attr("title", "LoadBalancer: Du hast in kurzer zeit zu viele Abfragen abgesetzt. Warte " + timeToWait + " Minuten.").click(function () {
                            this.getStatus(playerName, statusElem, 0, true);
                        }));
                    }

                    if ((parseInt(GM_getValue("C_LastPlayerStatusUpdateTime", date.getTime())) + parseInt(C_getPlayerStatusWaitingTime)) < parseInt(date.getTime())) {
                        GM_setValue("C_LastPlayerStatusCounter", 0);
                        this.getStatus(playerName, statusElem, updateTime, deleteActData);
                    }

                }
            }
        },

        getStatusIcon: function (statusElem, playerStatusInfo, playerStatus, playerName) {
            if (!playerName.match(/[<>:0-9]/g)) {

                var statusSpan = $('<span>').attr({
                    "title": playerStatusInfo,
                    "class": "icon"
                }).click(function () {
                    this.getStatus(playerName, statusElem, 0, true);
                });

                statusElem.append(statusSpan);

                if (playerStatus.match(/playerStatusFit/gi)) {
                    statusSpan.addClass("i_thumbup");

                } else if (playerStatusInfo.match(/gesperrt/gi)) {
                    statusSpan.addClass("i_yellowred");

                } else if (playerStatus === "playerStatusInjured" && (playerStatusInfo.match(/reha/gi) || playerStatusInfo.match(/training/gi))) {
                    statusSpan.addClass("i_reha");

                } else if (playerStatus === "playerStatusInjured" &&
                    (playerStatusInfo.match(/berücksichtigt/gi) || playerStatusInfo.match(/freigabe/gi) || playerStatusInfo.match(/vorgesehen/gi) || playerStatusInfo.match(/II/g))) {
                    statusSpan.addClass("i_suspended");

                } else if (playerStatus === "playerStatusInjured" && (playerStatusInfo.match(/copa/gi) || playerStatusInfo.match(/cup/gi) || playerStatusInfo.match(/U\d+/gi))) {
                    statusSpan.addClass("i_away");

                } else if (playerStatus === "playerStatusInjured") {
                    statusSpan.addClass("i_injured");

                } else {
                    statusSpan.addClass("i_weakened");
                }
            }
        },

        getIds: function() {
            $.get('http://www.comunio.de/standings.phtml', function (dataPlayerIds) {
                var comName = $('.heading2 > a', dataPlayerIds).html();
                $('.tablecontent03 tr:not(contains(Spieler)) a', dataPlayerIds).each(function () {
                    var pid = $(this).attr('href').replace(/playerInfo\.phtml\?pid=/g, '');
                    var username = "C++:" + comName + ":" + $(this).html();
                    Persist.persist(username, pid);
                });
            });
        },

        saveTransferFee: function(acceptedOffersUrl) {
            var nextPage = false;
            $.get(acceptedOffersUrl, function (data) {

                $('#contentleftex:nth-child(2) tr:contains(Vollzogen),#contentleftex:nth-child(2) tr:contains(Vollzogen)', data).each(function () {
                    var acceptedOffer = parseInt($(this).find(':eq(3)').html().replace(/\./g, ''));
                    var playerName = $(this).find(':eq(0)').html();
                    var tfb = "tfb:" + playerName;
                    var tfs = "tfs:" + playerName;
                    if ((GM_getValue(tfs) === null && GM_getValue(tfb) !== null) || GM_getValue(tfb) === null) {
                        GM_setValue(tfs, acceptedOffer);
                        GM_deleteValue(tfb);
                        nextPage = true;
                    }
                });
                var newHref = $('div#contentleftex div:nth-child(8) > div#newsnaviends > span:eq(0) > a', data).attr('href');
                var newUrl = 'http://www.comunio.de/' + newHref;
                if (nextPage) {
                    this.saveTransferFee(newUrl);
                }
            });
        },


        addInformation: function($this, rowPlayerName, rowUserName) {
            var actPlayerElem = $this.children('td:eq(' + rowPlayerName + ')');

            if (Helper.isUrl('exchangemarket.phtml$')) {

                var actUserElem = $this.children('td:eq(' + rowUserName + ')');
                var actUserName = actUserElem.html();
                var comName = $('.heading2 > a').html();
                var itemName = "C++:" + comName + ":" + actUserName;
                var pid = 1;

                if (actUserName !== "Computer") {
                    pid = Persist.findBy(itemName);
                }
                if (pid !== null) {
                    actUserElem.html('').append($('<a></a>').attr({
                        href: 'http://www.comunio.de/playerInfo.phtml?pid=' + pid,
                        target: '_blank'
                    }).html(actUserName));
                }
            }
            this.getInformation(actPlayerElem);
        }
    };

}());

var Sorter = (function() {
    "use strict";

    return {
        sorting: function($table, sorter) {

            if($table.find('th').length === 0) {
                var newHeaderTable = $table.find('tr:eq(0)').html().replace(/td/g, 'th');
                $table.find('tr:eq(0)').remove();
                $table.prepend($('<thead></thead>').append(newHeaderTable));
            }

            $table.tablesorter(sorter);
        },

        init: function(){
            $.tablesorter.addParser({
                id: 'comunioMoney',
                is: function(s) { return false; },
                format: function(s) { return s.replace(/\./g, ''); },
                type: 'numeric'
            });
        }
    };

}());

var Team = (function () {
    "use strict";

    return {

        getInformation: function (teamElem) {
            // init
            var teamNameSpan = $('span', teamElem);
            var teamName = teamNameSpan.attr('title');
            var teamClasses = teamNameSpan.attr('class');
            var toggleElement = true;

            var teamNumber = parseInt(/cimg(\d+)/.exec(teamClasses)[1], 10);

            if (!teamName.match(/[<>:]/g)) {

                //var teamLink = encodeURI("http://www.com-search.de/searchPlayer.php?Name=&Position[]=0&Position[]=1&Position[]=2&Position[]=3&MinMW=&MaxMW=&MinPunkte=&MaxPunkte=&Status[]=-1&Team=" + teamName);
                teamNameSpan
                    .attr({
                        alt: teamName,
                        border: 0,
                        title: 'Team-Information öffnen'
                    }).mouseover(function () {
                        $(this).css({
                            cursor: 'pointer'
                        });
                    })
                    .click(function (event) {
                        if (toggleElement) {
                            $(this).attr({
                                title: 'Team-Information schließen'
                            }).css({
                                color: 'green'
                            });

                            $('#teamInformation' + Helper.htmlEntities($(this).attr('alt'))).css({
                                'z-index': Helper.getMaxZIndex() + 1,
                                position: 'absolute',
                                top: (event.pageY - 20),
                                left: (event.pageX + 40),
                                background: '#003300'
                            }).show('fast');
                        } else {
                            $(this).attr({
                                title: 'Team-Information öffnen'
                            }).css({
                                color: 'black'
                            });
                            $('#teamInformation' + Helper.htmlEntities($(this).attr('alt'))).hide('fast');
                        }
                        toggleElement = !toggleElement;
                    });

                $('body').append(Build.div({attr : {id: 'teamInformation' + Helper.htmlEntities(teamName)}})
                    .css({
                        'border-radius': '5px',
                        'font-size': '0.9em'
                    }).attr({
                        align: 'center',
                        class: 'windowInformations'
                    }).append(
                        $('<div></div>')
                        .css({'text-align': 'right'})
                        .append(
                            $('<img />').attr({'name': teamName,
                                'src': GM_getResourceURL("Icon:crossCircle"),
                                'width': '14',
                                'height': '14',
                                'title': 'Fenster schließen'
                            })
                            .click(function () {
                                $('span:contains(' + $(this).attr('name') + ')').css('color', 'black');
                                $(this).parent().parent().hide('fast');
                                toggleElement = true;

                            })
                        )
                    ).append(
                        $('<table></table>')
                            .append(
                                $('<tr></tr>').append($('<td colspan="2"> Team-Information zu <h1><span style="font-size:.6em;">' + teamName + '</span></h1></td>'))
                            )
                            .append(
                                $('<tr></tr>').append($('<td>Comunio </td>'))
                                    .append(
                                        $('<td></td>')
                                            .append(
                                                $('<a></a>')
                                                .append(
                                                    $('<img />')
                                                        .css({border: 0})
                                                        .attr({
                                                            "src": GM_getResourceURL("Icon:Comunio"),
                                                            "title": teamName + ' auf Comunio',
                                                            "width": "16",
                                                            "height": "16"
                                                        })
                                                )
                                                .attr({
                                                    "onClick": "return(openSmallWindow('clubInfo.phtml?cid=" + teamNumber + ",'877a944d236a78c8480d5cc8bf69b425'))",
                                                    "href": 'clubInfo.phtml?cid=' + teamNumber,
                                                    "target": '_blank',
                                                    "title": teamName
                                                })
                                            )
                                    )
                            )
                    ).hide()
                );

            }
        },

        addInformation: function ($this, rowTeamName, rowUserName) {
            var actTeamElem = $this.children('td:eq(' + rowTeamName + ')');

            if (Helper.isUrl('exchangemarket.phtml$')) {

                var actUserElem = $this.children('td:eq(' + rowUserName + ')');
                var actUserName = actUserElem.html();
                var comName = $('.heading2 > a').html();
                var itemName = "C++:" + comName + ":" + actUserName;
                var pid = 1;

                if (actUserName !== "Computer") {
                    pid = Persist.findBy(itemName);
                }
                if (pid) {
                    actUserElem.html('').append($('<a></a>').attr({
                        href: 'http://www.comunio.de/playerInfo.phtml?pid=' + pid,
                        target: '_blank'
                    }).html(actUserName));
                }
            }
            this.getInformation(actTeamElem);
        }

    };

}());

/*                                .append($('<tr></tr>').append($('<td>ComSearch </td>')).append($('<td></td>').append($('<a></a>').append($('<img />').css({
 border: 0
 }).attr({
 src: GM_getResourceURL("Icon:ComSearch"),
 title: teamName + ' auf ComSearch',
 "width": "16",
 "height": "16"
 })).attr({
 href: 'http://www.com-search.de/showTeam.php?Team=' + escape(teamName),
 target: '_blank'
 }))))*/
/*                                .append(
 $('<tr></tr>').append($('<td>Comunio Forum</td>')).append($('<td></td>').append(searchForInformationInForum(teamName)).attr({
 title: teamName + ' im Comunio Forum'
 })))*/

var Update = (function () {
    "use strict";

    var version = GM_info.script.version;
    var updateString = "ce:lastUpdate";

    return {
        check: function () {

            var lastUpdate = Persist.findBy(updateString);

            if (!!lastUpdate ||
                parseInt(lastUpdate) + parseInt(24 * 60 * 60 * 1000) < parseInt(String(new Date().getTime()))) {

                var newVersion = this.getNewVersion();

                var actVersionStripped = version.replace(/\./g, '');
                var newVersionStripped = newVersion.replace(/\./g, '');

                if (!!newVersionStripped && newVersionStripped > actVersionStripped) {
                    this.draw({'newVersion': newVersion});
                }
                else {
                    console.log("No new version of Comunio++ (C++) available. Yours:" + newVersion + " Server:" + version);
                }
            }
        },

        draw: function (options) {

            var newVersionText = 'A new Version of the ChiliProjectEnhancer is available.<br><br>';
            newVersionText += "Actual version: " + version + "<br>";
            newVersionText += "New version: " + options.newVersion + "<br><br><br>";

            Build.blackOut({classesToHide: '.update-box'});

            var updateDiv = jQuery('<div></div>')
                .css({
                    'left': (jQuery(document).width() / 2) - 250
                })
                .attr({
                    'id': 'update-box',
                    'class': 'update-box'
                })
                .append(
                    jQuery('<div><h2>New version available</h2></div>').addClass("update-header")
                )
                .append(
                    jQuery('<div>' + newVersionText + '</div>')
                    .addClass("update-body")
                    .append(
                        jQuery('<a>' + "Comunio++ (C++) Version " + options.newVersion + '</a>')
                        .attr({'href': 'http://files.cplusplus.tobsch.org/download/comunio_c.user.js',
                               'title': 'Comunio++ (C++) Version ' + version})
                    )
                );

            jQuery('body').append(updateDiv);

            Persist.persist(updateString, String(new Date().getTime()));
        },

        getNewVersion: function () {
            var response = GM_xmlhttpRequest({
                method: 'GET',
                synchronous: 'true',
                url: 'http://www.cplusplus.tobsch.org'
            });

            if (response.status === 200) {
                return $('#projectVersion', response.responseText).html();
            }

            return undefined;
        }
    };

}());








