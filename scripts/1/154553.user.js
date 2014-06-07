// ==UserScript==
// @name ABW Przycisk
// @namespace abw_przycisk
// @description Przycisk do ABW
// @include http://*.wykop.pl/*
// @version 3.0
// ==/UserScript==
var x = document.createElement('script');
x.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js');
document.body.appendChild(x);

function main() {
    function retrieveFromWindow(propName) {
        return window[propName];
    }
    var Wykop = {
        currentAction: retrieveFromWindow('_action'),
        token: retrieveFromWindow('token'),
        getCurrentUser: function () {
            if (this._user) {
                return this._user;
            }
            var ret = {};
            var currUserDOM = $('nav div.avatar ul li').first();
            try {
                ret.color = (function (UserNode) {
                    var link = $('a', UserNode);
                    var lista_klas = link.attr('class').split(/\s+/);
                    var kolor = lista_klas.filter(function (el) {
                        if (el.match('color-')) {
                            return true;
                        }
                        return false;
                    });
                    return (kolor[0].replace('color-', ''));
                })(currUserDOM);
                ret.name = $.trim(currUserDOM.text());
            } catch (e) {
                ret = {
                    'name': null,
                    'color': 0
                }
            }
            ret.getLastEntry = function () {
                var ret = $.ajax({
                    method: 'GET',
                    url: '/ludzie/wpisy/' + this.name + '/'
                });
                ret.done(function (html) {

                    try {
                        var ret = {};
                        var entries = $('ul#activities-stream li', html);
                        var firstEntry = entries.first();
                        var entryId = firstEntry.attr('data-id');
                        var nodeText = firstEntry.text();
                        ret.id = entryId;
                        ret.text = nodeText;
                    } catch (e) {
                        alert(e)
                    }
                    console.log(ret);
                    Wykop.getCurrentUser().lastEntry = ret;
                    return ret;
                });

                return ret;
            };
            return (this._user = ret);
        },
        getEntryAddURL: function (channel) {
            var ret = 'http://www.wykop.pl/wpis/dodaj/';
            if (channel) {
                ret += 'kanal/' + channel;
            }
            return ret;
        },
        addEntry: function (message, channel) {
            var url = this.getEntryAddURL(channel);
            return $.ajax(
                url, {
                    type: 'POST',
                    data: {
                        '__token': this.token,
                        'entry[body]': message
                    }
                }
            )
        },
        commentEntry: function (message, entryId) {
            return $.ajax({
                url: 'http://www.wykop.pl/ajax/entries/addcomment/' + entryId,
                type: 'POST',
                data: {
                    '__token': this.token,
                    'entry[body]': message
                }
            });
        }
    }


    var UI = {
        alert: function (message, title) {
            $("<div />").dialog({
                buttons: {
                    "Ok": function () {
                        $(this).dialog("close");
                    }
                },
                close: function (event, ui) {
                    $(this).remove();
                },
                resizable: false,
                title: title,
                modal: true
            }).text(message);
        }
    }

    var GROUP = {
        ID: 'agencjabezpieczenstwawykopu',
        retrieveUsersList: function () {
            return $.ajax('http://wykop.koziolek.biz/spamlista/abw/', {
                dataType: 'jsonp',

            });
        },
        getURL: function () {
            return 'http://www.wykop.pl/mikroblog/kanal/' + this.ID + '/';
        }
    }
    var MESSAGES = {
        FIRST_SUCCESS: 'Request wys\u0142any poprawnie.',
        SPAM_LIST_HEADER: ['[Spamlista](http://wykop.koziolek.biz/spamlista/abw/)',
            '([wypisz/zapisz się](http://www.wykop.pl/dodatki/pokaz/267/))',
            '[dodatek Gindena](https://userscripts.org/scripts/show/154553)'
        ].join(' '),
        TOTAL_SUCCES: 'Wszystko wys\u0142ane poprawnie!',
        GROUP_MESSAGE_HEADER: '**PRZYCZYNA**'
    }
    $.extend(UI);

    function createNavIcon(url, id) {
        var contDiv = $('<div />')
            .attr('class', 'quickpoint fright rel')
            .attr('id', id);
        var icon = $('<a />')
            .attr('class', 'tip fright cfff tdnone quickicon tcenter')
            .attr('href', url);
        return contDiv.append(icon);
    }

    function chunkArray(arr, size) {
        var chunks = [];
        while (arr.length > 0) {
            chunks.push(arr.splice(0, size));
        }
        return chunks;
    }

    function markdownLink(URL, desc) {
        return ['[', desc, '](', URL, ')'].join('');
    }

    function createReportDialog(text) {
        var ret = $('<div />');
        ret.attr({
            id: 'dialog-zglosfest',
            title: 'ABW'
        });
        ret.append(
            $('<textarea />').attr('id', 'report-comment').val(text)
        );
        return ret;
    }

    function addGroupEntry(message, channel, spamlista) {
        Wykop.addEntry(message, channel)
            .done(function () {
                if (channel && spamlista) {
                    Wykop.getCurrentUser().getLastEntry().done(
                        function () {
                            lastEntry = Wykop.getCurrentUser().lastEntry;
                            GROUP.retrieveUsersList().done(function (usersList) {
                                var howManyUsers = (function (number) {
                                    number = number + 1;
                                    return 10 * (Math.pow(number, 2) - 2 * number + 2);
                                })(Number(Wykop.getCurrentUser().color));
                                var chunks = chunkArray(usersList.map(function (el) {
                                    return '@' + el;
                                }), howManyUsers);
                                var prepareMessage = function (message) {
                                    return function () {
                                        return Wykop.commentEntry(message, lastEntry.id);
                                    }
                                }
                                var commentsChain = Wykop.commentEntry(MESSAGES.SPAM_LIST_HEADER + '\n' + chunks[0].join(' '),
                                    lastEntry.id);
                                for (var i = 1; i < chunks.length; i++) {
                                    commentsChain.done(prepareMessage(chunks[i].join(' ')))
                                }
                            });
                            $.alert(MESSAGES.TOTAL_SUCCES);
                        });
                }
            });
    }

    function ABW_report() {
        var title = $(this).data('title');
        var URL = $(this).data('id');
        var tekst = MESSAGES.GROUP_MESSAGE_HEADER + '\n' + markdownLink(URL, title) + '\n';
        var reportDialog = createReportDialog(tekst);
        $(document.body).append(reportDialog);
        reportDialog
            .dialog({
                create: function (event, ui) {
                    $('textarea', this).val(tekst.replace('\u2022', ''));
                },
                autoOpen: true,
                resizable: false,
                height: 500,
                width: 800,
                modal: true,
                buttons: {
                    "zg\u0142o\u015B": function () {
                        var reportText = $('textarea', this).val();
                        addGroupEntry(reportText, GROUP.ID, true);
                        $(this).dialog("close");
                        reportDialog.empty().remove();
                    },
                    "zg\u0142o\u015B bez spamlisty": function () {
                        var reportText = $('textarea', this).val();
                        addGroupEntry(reportText, GROUP.ID, false);
                        $(this).dialog("close");
                        reportDialog.empty().remove();
                    },

                    "publicznie": function () {
                        var reportText = $('textarea', this).val();
                        addGroupEntry(reportText, false, false);
                        $(this).dialog("close");
                        reportDialog.empty().remove();
                    },
                    "Anuluj": function () {
                        $(this).dialog("close");
                        reportDialog.empty().remove();
                    }
                },
                close: function (event, ui) {
                    reportDialog.empty().remove();
                }
            });
    }
    (function mainFunc() {
        var $UI_theme = $('<link/>').attr('rel', 'stylesheet').attr('type', 'text/css');
        if (retrieveFromWindow('nightmode')) {
            $UI_theme.attr('href', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/dark-hive/jquery-ui.css');
        } else {
            $UI_theme.attr('href', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/smoothness/jquery-ui.css');
        }
        $(document.head).append($UI_theme);

        var HASH = '03e58bfe41a357529d95ca1bc1f5d458';

        function getBoolConfiguration(name, def) {
            var ret = localStorage[HASH + '_' + name];
            if (ret === undefined) {
                return setBoolConfiguration(name, def);
            }
            return !!JSON.parse(ret);
        }

        function setBoolConfiguration(name, val) {
            console.log('I set CONF.' + name + ' = ' + !! val)
            return localStorage[HASH + '_' + name] = !! val;

        }
        var CONFIGURATION = {
            ICON: getBoolConfiguration('ICON', true),
            BUTTONS: getBoolConfiguration('BUTTONS', true),
            NAV: getBoolConfiguration('NAV', false)
        };
        $(document.head).append(
            //
            $('<style />').html(
                [
                    "#abw_grupa a{",
                    "background-image:url('http://wykop.ginden.pl/abw/aCuKTnV.php') !important;",
                    "background-repeat:no-repeat;",
                    "background-position: 5px 2px !important",
                    "}",
                    "#abw_grupa:hover a { ",
                    "background-image: url('http://i.imgur.com/ghRv6kv.png') !important;",
                    "background-repeat:no-repeat !important;",
                    "}",
                    "div.raport_abw {",
                    "display:inline-block;",
                    "float:right;",
                    "cursor:pointer;",
                    "background-color:lightgray;",
                    "width:50px;",
                    "height:30px;",
                    "line-height:30px",
                    "!important;",
                    "font-size:18px !important;",
                    "vertical-align:middle;",
                    "text-align:center;",
                    "border-radius:5px;",
                    "opacity:.2",
                    "}",
                    '#report-comment {width:100%; height: 100%}',
                    "div.raport_abw:hover{opacity:1}"
                ].join('\n')
            ));

        function createReportButton(title, URL) {
            URL = URL || document.URL;
            var ret = $('<div />')
                .attr('class', 'raport_abw')
                .data('id', URL)
                .data('title', title)
                .text('ABW')
                .click(ABW_report);
            return ret;
        }

        function createInputsFromConfig(conf) {
            var ret = $('<form />');
            var inputs = [
                ['Ikona ABW', 'ICON'],
                ['Przyciski zgłaszania', 'BUTTONS'],
                ['Link na belce', 'NAV']
            ];
            var row;
            var table = $('<table />');
            for (var i = 0; i < inputs.length; i++) {
                row = $('<tr/>');
                row.append(
                    $('<td />').append(
                        inputs[i][0]
                    ),
                    $('<td />').append(
                        $('<input type="checkbox" name="' + inputs[i][1] + '">')
                        .prop('checked', conf[inputs[i][1]])
                    )
                )
                table.append(row);
            }
            ret.append(table);
            return ret;
        }

        function setConfigFromForm($form) {
            var source = $('input', $form);
            console.log(source);
            source.each(function (index) {
                $this = $(this);
                setBoolConfiguration($this.attr('name'), $this.prop('checked'));
            });
        }

        function createConfigPanel() {

            var dialog = $('<div />');
            $(document.body).append(dialog);
            dialog.css('display', 'none')
            dialog.append(
                createInputsFromConfig(CONFIGURATION)
            );
            dialog.dialog({
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    'zapisz i zamknij': function () {
                        dialog.dialog('close');

                    }
                },
                close: function () {
                    setConfigFromForm($('form', dialog));
                    dialog.css('display', 'none')
                }
            });
            return function () {
                dialog.css('display', 'block');
                dialog.dialog('open');
            }

        }

        function createConfigButton($where) {
            var button = $where.children().last().clone();
            button.attr({
                href: '#'
            });
            button.text('ABW');
            button.on('click', createConfigPanel());
            $where.append(button);


        }
        if (Wykop.currentAction === 'settings') {
            setTimeout(function waitTilUi() {
                if ($.ui) {
                    createConfigButton($('div.filters'))
                    return;
                }
                setTimeout(waitTilUi, 5);
            }, 5);

        }

        if (CONFIGURATION.ICON) {
            $('nav.main').append(createNavIcon(GROUP.getURL(), 'abw_grupa'));
        }
        if (CONFIGURATION.NAV) {
            var toAdd = $('<a>').attr({
                'class': 'tip fleft cfff tab fbold',
                'title': 'Agencja Bezpieczeństwa Wykopu',
                'href': GROUP.getURL()
            }).text('ABW');
            if (document.URL === GROUP.getURL()) {
                toAdd.addClass('selected');
            }
            $('.quickpoint').first().before(toAdd);
            toAdd = null;
        }
        if (CONFIGURATION.BUTTONS) {
            var reportButton;
            if (Wykop.currentAction === 'index' || Wykop.currentAction === 'upcoming') {
                var LinksList = $('.article-list article');
                $.each(LinksList, function (id, element) {
                    var title = $('h2', element).text();
                    var URL = $('.comments', element).parent().attr('href');
                    $('div.rel', element).prepend(createReportButton(title, URL));
                });
            } else if (Wykop.currentAction === 'link') {
                reportButton = createReportButton($('h2 a span.linkTitle').text());
                $('h2 a span.linkTitle').parent().before(reportButton);
            } else if (Wykop.currentAction === 'profile') {
                reportButton = createReportButton($('.userstory h2').text().trim())
                $('.userstory h2').before(reportButton);
            } else if (Wykop.currentAction === 'entries') {
                reportButton = createReportButton($('.userstory h2').text().trim())
                $('.userstory h2').before(reportButton);
            }
        }
    })();

}

function addJQuery(callback) {
    "use strict";
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
//if (typeof $ === typeof undefined) {
//  if (unsafeWindow.jQuery) {
//      var $ = unsafeWindow.jQuery;
//       main();
//   } else {
addJQuery(main);
//  }
//} else {
//  main();
//}