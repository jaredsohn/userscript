// ==UserScript==
// @name FamePoints
// @author 		HackTheCode
// @version 	0.8.9
// @include http://worldoftanks.eu/uc/clans/*
// @include http://worldoftanks.eu/community/clans/*
// @exclude http://worldoftanks.eu/uc/clans/*/provinces/
// @exclude http://worldoftanks.eu/community/clans/*/provinces/
// @exclude http://worldoftanks.eu/uc/clans/*/battles/
// @exclude http://worldoftanks.eu/community/clans/*/battles/
// @match http://worldoftanks.eu/uc/clans/*
// @match http://worldoftanks.eu/community/clans/*
// @require http://cdn.jsdelivr.net/tablesorter/2.13.3/js/jquery.tablesorter.min.js
// @require http://cdn.jsdelivr.net/tablesorter/2.13.3/js/jquery.tablesorter.widgets.min.js
// ==/UserScript==
var css = '.tablesorter-header-inner{ margin-left: 0px; margin-right: 0px; padding-left: 0px; text-align:center; }';
var style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
$('.t-table').hide();
$('#clans_info_content').append('<div class="loading" align="center"><img src="/static/3.11.1.2/common/css/block/b-content/img/waiting.gif"><br />Loading ...<br /><br /></div>');
var members = [];
setTimeout(
    function () {
        $('.t-table > tbody > tr').each(function (index, element) {
            if (index > 0) {
                var link = $(element).find(':nth-child(2) a').attr("href");
                var nick = $(element).find(':nth-child(2) a').text();
                var role = $(element).find(':nth-child(3)').text();
                var member_since = $(element).find(':nth-child(4)').text();
                $.ajax({
                    type: 'GET',
                    url: "/community/clans/show_clan_block/",
                    data: { spa_id: /\/(\d+)-/g.exec(link)[1] },
                    dataType: 'json',
                    success: function (response) {
                        var position = $(response.data.glory_points_block).find("#js-glory-points").text();
                        var points = $(response.data.glory_points_block).find("#js-glory-points_tooltip p").text().replace(/\s/g, "").split(":")[1];
                        var member = {
                            "url": link,
                            "nick": nick,
                            "role": role,
                            "member_since": member_since,
                            "glory_points": /\d+/.test(points) ? points : "0",
                            "glory_position": position != "" ? position.replace(/\s/g,"") : "999999"
                        };
                        members[index] = member;
                    },
                    error: function (response) {
                        var member = {
                            "url": link,
                            "nick": nick,
                            "role": role,
                            "member_since": member_since,
                            "glory_points": "error",
                            "glory_position": "error"
                        };
                        members[index] = member;
                    }
                });
            }
        });
        $(document).ajaxStop(function () {
            $('.t-table').empty();
            render();
        });
    }, 2000);

function render() {
    $(".loading").remove();
    $(".t-table").show();
    $(".t-table").append(    
        '<thead>'+
        '<tr>' +
        '<th>№</th>' +
        '<th><span class="b-sort-box">Име</span></th>' +
        '<th><span class="b-sort-box">Длъжност</span></th>' +
        '<th><span class="b-sort-box">В клана от</span></th>' +
        '<th><span class="b-sort-box">Точки слава</span></th>' +
        '<th><span class="b-sort-box">Позиция</span></th>' +
        '</tr>'+
        '</thead>'+
        '<tbody></tbody>');
    for (var i = 1; i < members.length; i++) {
        $(".t-table tbody").append(
            '<tr>' +
            '<td>' + i + '</td>' +
            '<td class="b-user"><a href="' + members[i].url + '">' + members[i].nick + '</a></td>' +
            '<td>' + members[i].role + '</td>' +
            '<td>' + members[i].member_since + '</td>' +
            '<td>' + members[i].glory_points + '</td>' +
            '<td>' + members[i].glory_position + '</td>' +
            '</tr>');
    };
    $.tablesorter.addWidget({
        id: "numbering",
        format: function (table) {
            var c = table.config;
            $("tr:visible", table.tBodies[0]).each(function (i) {
                $(this).find('td').eq(0).text(i + 1);
            });
        }
    });
    $(".t-table").tablesorter({
        cssDesc: 'ordered desc',
        cssAsc: 'ordered asc',
        headers: { 0: { sorter: false } },
        widgets: ['numbering']
    });
}