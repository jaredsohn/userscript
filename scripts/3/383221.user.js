// ==UserScript==
// @name          FixemAll
// @include       https://kysprd.finansbank.com.tr/*
// @version       1.1 
// @grant         none
// ==/UserScript==
(function(){
    if ($('.bread_crumbs li:contains("Bug Evaluation")').length == 0)
        return;
    
    $('<input></input>', {
        type: 'text', id: 'DateBox', style: 'background:none; height:inherit; width: 72px !important; margin-left:25px;text-align: left;padding: 0;height: 25px; cursor:text;', value: GetDate()
    }).appendTo('div.buttons:first');

    $('<input></input>', {
        type: 'text', id: 'TimeBox', style: 'background:none; height:inherit; width: 40px !important; margin-left:15px;text-align: left;padding: 0;height: 25px; cursor:text;', value: GetTime()
    }).appendTo('div.buttons:first');

    $('<input></input>', {
        type: 'button', name: 'btnBack', id:'FixAll', value: 'Fix All', style: 'margin-left:25px;'
    }).appendTo('div.buttons:first');

	$('#FixAll').on('click', function() {
        var deployDateText = $('#DateBox').val();
        var deployTimeText = $('#TimeBox').val();
        var deployDate = new Date(deployDateText.substr(6, 4), deployDateText.substr(3, 2) - 1, deployDateText.substr(0, 2), deployTimeText.substr(0, 2), deployTimeText.substr(3, 2));

        $('#excelTable > tbody > tr:not(:eq(0))').each(function () {
            var cell = $(this).children('td').eq(4).text();
            var matches = cell.match(/\d{2}\-\d{2}\-\d{4} \d{2}\:\d{2}/g);
            if (matches != null) {
                var dateText = matches[matches.length - 1];
                var pendingDate = new Date(dateText.substr(6, 4), dateText.substr(3, 2) - 1, dateText.substr(0, 2), dateText.substr(11, 2), dateText.substr(14, 2));
                if (pendingDate < deployDate) {
                    $(this).children('td').eq(5).find('select').eq(0).val('20').siblings('span').find('input').val('Bug fixed');
                }
            }
        });
    });

    function GetDate() {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m) + '.' + y;
    }
    function GetTime() {
        var currentTime = new Date();
        var h = currentTime.getHours();
        var m = currentTime.getMinutes();
        var time = (h <= 9 ? '0' + h : h) + ":" + (m <= 9 ? '0' + m : m);
        return time;
    }
})();