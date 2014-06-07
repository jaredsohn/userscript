// ==UserScript==
// @name        WeerWolven.be Live
// @namespace   weerwolven
// @include     http://weerwolven.be/live.php?id=*
// @include     http://www.weerwolven.be/live.php?id=*
// @grant 		GM_xmlhttpRequest
// @grant 		unsafeWindow
// @version     0.0.2
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var location = unsafeWindow.window.location;
var l = unsafeWindow.console.log;

var host = 'http://' + (location.href.indexOf('www') != -1 ? 'www.' : '' ) + location.host;

try {
    var lastUpdate = 0;
    var update = function (callback) {
        var url = location.href;
        GM_xmlhttpRequest({
            method:'GET',
            url:url,
            onload:function (response) {
                var fetched_doc = $(response.responseText),
                    real_doc = $(document),
                    i, cnt = 0, found = 0, func = null, fetched_el, real_el, upd = "";

                for (i in panels) {
                    func = panels[i];
                    try {
                        fetched_el = panels[i].fetch(fetched_doc);
                        real_el = panels[i].fetch(real_doc);
                        if (fetched_el.length != real_el.length) {
                            location.reload(true);
                            return;
                        }

                        if (real_el.length == 0) {
                            continue;
                        }

                        found += 1;

                        if (panels[i].isChanged(real_el, fetched_el)) {
                            panels[i].update(real_el, fetched_el);
                            cnt += 1;
                            upd += i + ", ";
                            panels[i].lastupdate = Date.now();
                        }
                    } catch (exception) {
                        l('Error fetching ' + i + ' or panel doesn\'t exist ' + exception + ' ' + exception.stack);
                    }
                }
                if (cnt != 0) upd = upd.substr(0, upd.length - 2);
                else upd = "Nothing"
                l(upd + ' updated.');
                lastUpdate = Date.now();
                if (callback) callback();
            }
        });
    };

    var panels = {
        game_info:{
            lastupdate:0,
            name:'Info',
            fetch:function (document) {
                return document.find("#spel_content tr.row_no_hover:eq(0)");
            },
            isChanged:function (document, document_new) {
//                if(document.find('form').length != document_new.find('form').length) return true;
//                var form = document_new.find('form');
//
//                if(form.length != 0) {
//                   var inputs = form.find('input[name=vote]');
//                   var old_inputs = document.find('form input[name=vote]');
//                   var i;
//                   for(i = 0; i < inputs.length; i += 1) {
//                       if($(inputs[i]).attr('checked') == 'checked') {
//                           continue;
//                       }
//                       if($(inputs[i]).parent().parent().html().length != $(old_inputs[i]).parent().parent().html().length) return true;
//                   }
//                } else {
                    return document.html().length != document_new.html().length;
//                }
            },
            update:function (document, document_new) {
                document.html(document_new.html());
                hookVote();
            }
        },

        messages:{
            lastupdate:0,
            name:'Chat',
            fetch:function (document) {
                return document.find("#spel_content tr.row_no_hover:eq(2) div:contains('Admin') :first");
            },
            isChanged:function (document, document_new) {
                return document.find("> table > tbody > tr").length != document_new.find("> table > tbody > tr").length;
            },
            update:function (document, document_new) {
                var old_messages = document.find("> table > tbody > tr");
                var new_messages = document_new.find("> table > tbody > tr");
                var to_add = [];
                var i, message;
                for (i = 0; i < (new_messages.length - old_messages.length); i++) {
                    to_add.push($(new_messages[i]));
                }
                var table = document.find("> table > tbody");
                for (i = to_add.length - 1; i >= 0; i--) {
                    table.prepend(to_add[i]);
                }
            }
        },

        w_messages:{
            lastupdate:0,
            name:'W.Chat',
            fetch:function (document) {
                return document.find("#spel_content").parent().find("td.infobar td.subtitle:contains('Weerwolven Overleg') ").parent().parent().find(" > tr.row_no_hover > td > div :first");
            },
            isChanged:function (document, document_new) {
                return document.find(">").length != document_new.find(">").length;
            },
            update:function (document, document_new) {
                var old_messages = document.find(">");
                var new_messages = document_new.find(">");
                var to_add = [];
                var i, message;
                for (i = 0; i < (new_messages.length - old_messages.length); i++) {
                    to_add.push($(new_messages[i]));
                }
                for (i = to_add.length - 1; i >= 0; i--) {
                    document.prepend(to_add[i]);
                }
            }
        },

        game_log:{
            lastupdate:0,
            name:'Log',
            fetch:function (document) {
                return document.find("#spel_content tr.row_no_hover:eq(1)");
            },
            isChanged:function (document, document_new) {
                return document.html().length != document_new.html().length;
            },
            update:function (document, document_new) {
                document.html(document_new.html());
            }
        },

        types:{
            lastupdate:0,
            name:'T',
            fetch:function (document) {
                return document.find("table.spel_tabs td.speltitel td[align=right]");
            },
            isChanged:function (document, document_new) {
                return document.html().length != document_new.html().length;
            },
            update:function (document, document_new) {
                document.html(document_new.html());
            }
        },

        game_players:{
            lastupdate:0,
            name:'P',
            fetch:function (document) {
                return document.find("#spel_content").parent().find("td.infobar td.subtitle:contains('deelnemers') ").parent().parent();
            },
            isChanged:function (document, document_new) {
                return document.html().length != document_new.html().length;
            },
            update:function (document, document_new) {
                document.html(document_new.html());
            }
        }
    };

    // TODO: remove this after testing finished
    unsafeWindow.doUpdate = update;
    unsafeWindow.wwLive = {
        post:function (id, fid, message) {
            $.ajax({
                method:"POST", url:host + "/actions/spel/forum/createBericht.php",
                data:$.param({ spel:id, ond:fid, extra:'break', bericht:message, submit:'Post' }),
                success:function (response) {
                    alert('posted')
                },
                error:function () {
                    l('post error', arguments);
                }
            });
        },
        wwpost:function (id, message) {
            $.ajax({
                method:"POST", url:host + "/actions/spel/weerwolven/createBericht.php",
                data:$.param({ spel:id, bericht:message, submit:'Post' }),
                success:function (response) {
                    alert('ww posted')
                },
                error:function () {
                    l('post error', arguments);
                }
            });
        }
    }

    var statusBar = $("<div>").attr("id", "statusbar").attr('style', 'width: 100%;height:20px;color:white');
    var i;

    var tr = $("<tr>");
    tr.append($("<td>").attr('style', 'border:0;padding-right: 15px').append($("<span>").attr('style', '').append("Updater status: ").append($("<span>").text("offline").attr('class', 'status').attr('style', 'color:red'))));
    for (i in panels) {
        tr.append($("<td>").attr('style', 'border:0; padding-right: 5px').attr('class', i).append($("<span>").text(panels[i].name + ': ')).append($("<span>").attr('class', 'last').attr('style', 'color:red').text('-')));
    }
    statusBar.append($("<table>").append(tr).attr('style', 'border-collapse: collapse; display: inline'));
    var updateStatus = function () {
        if (lastUpdate != 0 && statusBar.find('span.status').text() == 'offline') {
            statusBar.find('span.status').text('online').css('color', 'green');
        }
        for (i in panels) {
            if (panels[i].lastupdate != 0) {
                if (statusBar.find('td.' + i + ' span.last').css('color') != 'green') {
                    statusBar.find('td.' + i + ' span.last').css('color', 'green');
                }
                statusBar.find('td.' + i + ' span.last').text((((Date.now() - panels[i].lastupdate) / 1000) | 0) + 's');
            }
        }
    };
    $('table.main tr.header > td :first').prepend(statusBar);

    var hookChat = function() {
        var form = $(document).find("#spel_content tr.row_no_hover:contains('Filter posts') form");
        if (form.length == 1) {
            l('Hooked normal chat.');
            var spelid = form.find("> input[name=spel] :first").attr('value');
            var forumid = form.find("> input[name=ond] :first").attr('value');
            var button = form.find("input[type=submit] :first");
            var button_new = $('<input>');
            button_new.attr('type', 'submit');
            button_new.attr('class', 'button');
            button_new.attr('tabindex', '2');
            button_new.attr('value', 'Awesome Post!');
            button_new.insertAfter(button);
            button.remove();
            button_new.bind('click', function (event) {
                button_new.attr('disabled', 'disabled');
                button_new.attr('value', 'Posting...');
                try {
                    $.ajax({
                        type:"POST",
                        url:host + "/actions/spel/forum/createBericht.php",
                        data:$.param({
                            spel:spelid,
                            ond:forumid,
                            extra:'break',
                            submit:'Post',
                            bericht:form.find('textarea :first').val()
                        }),
                        success:function (response) {
                            button_new.removeAttr('disabled');
                            button_new.attr('value', 'Awesome Post!');
                            form.find('textarea :first').val('');
                        },
                        error:function () {
                            l('post error', arguments);
                        }
                    });

                    event.preventDefault();
                } catch (exception) {
                    l('Error in script: ' + exception + ' ' + exception.stack);
                }
            });
        }
    }
    var hookWWChat = function() {
        var form2 = $(document).find("#spel_content").parent().find("td.infobar td.subtitle:contains('Weerwolven Overleg') ").parent().parent().find(" > tr.row_no_hover > td form")
        if (form2.length == 1) {
            l('Hooked weerwolven chat.');
            var spelid2 = form2.find("> input[name=spel] :first").attr('value');
            var button2 = form2.find("input[type=submit] :first");
            var button_new2 = $('<input>');
            button_new2.attr('type', 'submit');
            button_new2.attr('class', 'button');
            button_new2.attr('style', 'padding: 2px; padding-left: 5px; padding-right: 5px;');
            button_new2.attr('value', 'Awesome Post!');
            button_new2.insertAfter(button2);
            button2.remove();
            button_new2.bind('click', function (event) {
                button_new2.attr('disabled', 'disabled');
                button_new2.attr('value', 'Posting...');
                try {
                    $.ajax({
                        type:"POST",
                        url:host + "/actions/spel/weerwolven/createBericht.php",
                        data:$.param({
                            spel: spelid2,
                            bericht: form2.find('textarea :first').val(),
                            submit:'Post'
                        }),
                        success:function (response) {
                            button_new2.removeAttr('disabled');
                            button_new2.attr('value', 'Awesome Post!');
                            form2.find('textarea :first').val('');
                        },
                        error:function () {
                            l('post2 error', arguments);
                        }
                    });

                    event.preventDefault();
                } catch (exception) {
                    l('Error in script: ' + exception + ' ' + exception.stack);
                }
            });
        }
    }
    var hookVote = function() {
        return; // Disabled unit fixed...
        var form3 = $(document).find("#spel_content tr.row_no_hover:eq(0) form");
        if (form3.length == 1) {
            l('Hooked bm vote.');
            var id = form3.find("input[name=id] :first").attr('value');
            var button3 = form3.find("input[type=submit] :first");
            var button_new3 = $('<input>');
            button_new3.attr('type', 'submit');
            button_new3.attr('class', 'button');
            button_new3.attr('style', 'padding: 2px; padding-left: 5px; padding-right: 5px;');
            button_new3.attr('value', 'Awesome Submit!');
            button_new3.insertAfter(button3);
            button3.remove();
            button_new3.bind('click', function (event) {
                button_new3.attr('disabled', 'disabled');
                button_new3.attr('value', 'Voting...');
                try {
                    $.ajax({
                        type:"POST",
                        url:host + "/" + form3.attr('action'),
                        data: $.param({
                            id: id,
                            vote: form3.find("input:radio[name=vote]:checked").val(),
                            submit:'Post'
                        }),
                        success:function (response) {
                            l('voted');
                        },
                        error:function () {
                            l('post3 error', arguments);
                        }
                    });

                    event.preventDefault();
                } catch (exception) {
                    l('Error in script: ' + exception + ' ' + exception.stack);
                }
            });
        }
   }

    hookChat();
    hookWWChat();
    hookVote();

    var call = function () {
        setTimeout(update.bind(this, call), 1000);
    }
    setTimeout(function () {
        update(call)
    }, 2000);
    setInterval(updateStatus, 500);
} catch (exception) {
    l('Error in script: ' + exception + ' ' + exception.stack);
}