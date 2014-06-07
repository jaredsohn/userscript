// ==UserScript==
// @name AutoPraise
// @author zhouhaiwei
// @description Auto praise
// @version 1.0.0
// @namespace com.datayes.oa
// @include https://oa.datayes.com/crm/*
// @run-at document-end
// ==/UserScript==

(function() {
    var EmpId = 10455;
    var totalPages = 5;
    
    function praise() {

        checkAndPraise(1, false);

        $.getJSON('https://oa.datayes.com/sns/talent_ranking.action').success(function(data) {
            if (data.dataMap.data_list[0].id != EmpId) {
                var page = Math.floor(1 + Math.random() * totalPages);
                checkAndPraise(page, true);
                //Ultimate, Danger!!!!!
                $.get('https://oa.datayes.com/sns/add_favorite.action?target_id=2294');
            }
        });

        setTimeout(praise, Math.floor(300000 + Math.random() * 30000));
    }

    function checkAndPraise(page, needFavorite) {
        var result = false;
        $.getJSON('https://oa.datayes.com/sns/grid_collaboration.action?page=' + page + '&type=all&system=false').success(function (data) {
            totalPages = data.dataMap.page_data.totalPages;
            list = data.dataMap.page_data.currentRecords;
            for (key in list) {
                if (list[key].createEmployeeId == EmpId) {
                    if (!list[key].praise) {
                        $.get('https://oa.datayes.com/sns/praise_collaboration.action?operationId=' + list[key].id);
                    }
                    if (needFavorite && !list[key].favorite) {
                        $.get('https://oa.datayes.com/sns/add_favorite.action?target_id=' + list[key].id);
                    }
                }
            }
        });
        return result;
    }
    
    setTimeout(function() {
        praise();
    }, 10000);
})();