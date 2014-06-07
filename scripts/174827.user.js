// ==UserScript==
// @name       zhihu 首页分栏
// @namespace  http://www.zhihu.com/
// @version    0.2
// @description   zhihu 首页分栏
// @match      http://www.zhihu.com/
// @copyright  Morlay
// ==/UserScript==

// 动态的类型
var feedTypes = [{
    index: 0,
    name: '全部',
    codeName: ''
}, {
    index: 1,
    name: '新答',
    codeName: 'ANSWER_CREATE'
}, {
    index: 2,
    name: '赞答',
    codeName: 'ANSWER_VOTE_UP'
}, {
    index: 3,
    name: '提问',
    codeName: 'QUESTION_CREATE'
}, {
    index: 4,
    name: '同问',
    codeName: 'QUESTION_FOLLOW'
}, {
    index: 5,
    name: '新贴',
    codeName: 'ARTICLE_CREATE'
}, {
    index: 6,
    name: '顶贴',
    codeName: 'ARTICLE_VOTE_UP'
    // }, {
    //     index: 7,
    //     name: '圆桌',
    //     codeName: 'ROUNDTABLE_ADD_RELATED'
    // }, {
    //     index: 8,
    //     name: '推荐内容',
    //     codeName: 'RECOMMENDED'
}];



// 自定义 CSS 到 head
var styles = [];

styles.push('.za-filter{display: inline-block;margin-right:10px;cursor:pointer;color:#999;}');
styles.push('.za-filter.active{color:#259;}');
styles.push('.za-filter>.zg-num.hide{display:none;}');

$('<style/>').html(styles.join('')).appendTo('head');


$zhHomeListTitle = $('#zh-home-list-title');


// 根据类型添加过滤按钮 到 #zh-home-list-title
var filterBtns = [];


var i = feedTypes.length;

while (i--) {
    filterBtns.push(
        $('<span class="za-filter"/>')
        .attr('typeIndex', feedTypes[i].index)
        .html(feedTypes[i].name)
        .append($('<span class="zg-num"/>').addClass('hide'))
        .on('click', toggleFeedType)
    );
}

filterBtns.reverse();
filterBtns[0].addClass('active');
var curfeedTypeCodeName = '';


$zhHomeListTitle.html(
    $zhHomeListTitle.html().replace('最新动态', '')
).find('i').eq(0).after(filterBtns).remove();



var $targetZero = filterBtns[0].find('.zg-num');

// 按钮事件

function toggleFeedType() {



    var $clicked = $(this);

    $clickedNum = $clicked.find('.zg-num');



    // 交互效果
    filterBtns.forEach(function(item) {
        item.removeClass('active');
    })

    $clicked.addClass('active');


    if ($clicked.attr('typeIndex') == 0) {
        $('.zg-num', '.za-filter').html('').addClass('hide');


    } else {

        var totalUnread = (parseInt($targetZero.html()) || 0) - (parseInt($clickedNum.html()) || 0);


        if (totalUnread != 0) {
            $targetZero.html(totalUnread);
        } else {
            $targetZero.html('').addClass('hide');
        }

        $clickedNum.html('').addClass('hide');

    }



    curfeedTypeCodeName = feedTypes[$clicked.attr('typeIndex')].codeName;


    // 信息流过滤
    $('.feed-item').each(function() {
        typeMatch($(this));
    });
}

function typeMatch($elem) {
    if (curfeedTypeCodeName == '') {
        $elem.show();
    } else if (curfeedTypeCodeName == $elem.attr('data-feedtype')) {
        $elem.show();
    } else {
        $elem.hide();
    }
}

function getTypeIndexByCodeName(codeName) {
    var i = feedTypes.length;
    while (i--) {
        if (codeName == feedTypes[i].codeName) {
            return i;
        };
    }

}


var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// 监听推送
var hasNewFeed = false;
// create an observer instance
var observer = new MutationObserver(function(mutations) {
    if ( !! parseInt($("#zh-main-feed-fresh-button").html())) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                console.log('Has New Feed');
                // 有新推送则触发之
                hasNewFeed = true;
                $("#zh-main-feed-fresh-button").html('');
                $.when($("#zh-main-feed-fresh-button")[0].click()).done(function() {
                    setTimeout(function() {
                        hasNewFeed = false;
                    }, 1000);
                });

            }
        });
    };
});

// pass in the target node, as well as the observer options
observer.observe(
    $("#zh-main-feed-fresh-button")[0], {
        childList: true
    });

// 监听插入


$('#js-home-feed-list').on("DOMNodeInserted", function(e) {
    var $self = $(e.target);

    if ($self.hasClass('feed-item')) {
        if (hasNewFeed) {
            $self.hide();
            var $target = filterBtns[getTypeIndexByCodeName($self.attr('data-feedtype'))].find('.zg-num');
            $target.html((parseInt($target.html()) || 0) + 1).removeClass('hide');
            $targetZero.html((parseInt($targetZero.html()) || 0) + 1).removeClass('hide');

        } else {
            typeMatch($self);
        }
    }

});