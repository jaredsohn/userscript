// ==UserScript==
// @name              Obserwatorek 
// @namespace         http://kamdz.pl
// @description       Duże rozwinięcie funkcjonalności "obserwowania".
// @author            Kamil "kamdz" Dzwonkowski 
// @version           1.6
// @include           http://*.wykop.pl/ludzie/*
// @exclude           http://*.wykop.pl/ludzie/settings/*
// ==/UserScript==
var main = function () {
        $(document).ready(function ($) {
            var getPeople = function (nick, type) {
                    var page = 1;
                    var end = false;
                    var people = [];
                    var limit = 8;
                    if (parseInt($('a[href*="/' + type + '/"] big').text().replace(" ", "")) > limit * 75)
                        return null;
                    do {
                        $.ajax({
                            method: 'GET',
                            async: false,
                            url: '/ludzie/' + type + '/' + nick + '/strona/' + page,
                            success: function (html) {
                                if ($('ul.peoplewall:first a', html).length) {
                                    $('ul.peoplewall:first a', html).each(function () {
                                        people.push($.trim($(this).text()));
                                    });
                                    if ((people.length % 75) > 0) end = true;
                                } else end = true;
                            },
                            error: function (xhr) {
                                console.log(xhr.status + ' ' + xhr.statusText);
                                end = true;
                            }
                        });
                        page++;
                    } while (!end);
                    return people;
                };

            var address = location.href;
            address = address.split('/');
            var people = [];
            if (address[4] == "followers" || address[4] == "followed") {
                var nick = address[5];
                var type = address[4];
                type == 'followed' ? type = 'followers' : type = 'followed';
                people = getPeople(nick, type);
                $('.scale h4').append(' <span style="cursor: help; color: #367AA9" id="obserwatorek">ಠ_ಠ</span>');
                $('#obserwatorek').hover(function () {
                    $(this).append(' <span style="padding: 0px; margin: 0px; line-height: 12px; color: #888888; font-size: 10px">Obserwatorek by <a style="color: #BB0000" href="http://www.wykop.pl/ludzie/kamdz/">@kamdz</a></span>');
                }, function () {
                    $(this).find('span:last').remove();
                });
                if (people != null) {
                    var legends = ['osoby, które <span style="font-weight: bolder">' + nick + '</span> obserwuje.', 'osoby, których <span style="font-weight: bolder">' + nick + '</span> nie obserwuje.', 'osoby, które obserwują <span style="font-weight: bolder">' + nick + '</span>.', 'osoby, które nie obserwują <span style="font-weight: bolder">' + nick + '</span>.'];
                    $('ul.peoplewall:first').after('<div style="margin-top: 20px; line-height: 25px;"><span style="padding: 3px; background-color: #CCFF99; color: #009900; font-weight: bolder">&#10004;</span> - ' + (type == "followed" ? legends[0] : legends[2]) + '<br><span style="padding: 3px; background-color: #FFFFCC; color: #CC0000; font-weight: bolder">&#10008;</span> - ' + (type == 'followed' ? legends[1] : legends[3]) + '</div>');
                    $('ul.peoplewall:first a').each(function (i, person) {
                        if ($.inArray($.trim($(person).text()), people) > -1) $(this).append('<span style="color: #009900; font-weight: bolder">&#10004;</span>').parent().css('backgroundColor', '#CCFF99');
                        else $(this).append('<span style="color: #CC0000; font-weight: bolder">&#10008;</span>').parent().css('backgroundColor', '#FFFFCC');
                    });
                }
            } else if (address[4] == 'dodane' || address[4] == 'opublikowane' || address[4] == 'wykopane' || address[4] == 'buried' || address[4] == 'komentowane' || address[4] == 'wpisy' || address[4] == 'grupy' || address[4] == 'osiagniecia' || address[4] == 'ulubione') var nick = address[5];
            else var nick = address[4];
            var you = $('.quickpoint li:first').text();
            if (you != nick && you != '') {
                if (address[4] != 'followers') people = getPeople(nick, 'followed');
                if (people != null) {
                    if ($.inArray(you, people) > -1) $('.usercard div:nth-child(2)').append('<br><span title="Obserwatorek" style="cursor: help; font-size: 10px; color: #009900">obserwuje Cię</span>');
                    else $('.usercard div:nth-child(2)').append('<br><span title="Obserwatorek" style="cursor: help; font-size: 10px; color: #CC0000">nie obserwuje Cię</span>');
                }
            }
        });
    };


var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);