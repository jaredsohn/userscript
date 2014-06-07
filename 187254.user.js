// ==UserScript==
// @name       ZouZhiZhangWC
// @version    1.3
// @include    http://www.erepublik.com/en
// @include    http://www.erepublik.com/cn
// @include    http://www.*.lindasc.com/en
// @include    http://www.*.lindasc.com/cn
// @include    https://www.erepublik.com/en
// @include    https://www.erepublik.com/cn
// @grant      GM_wait
// ==/UserScript==

var rewardUrl = '/en/main/weekly-challenge-collect-reward';
var tokenString = '';
var rewardArray = new Array;
var rewardIndex = 0;
var rewardGet = 0;
var intervalId = 0;
var thresholdObject;
var width = 0;
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100)
    } else {
        $j = unsafeWindow.jQuery;
        letsJQuery()
    }
}
function letsJQuery() {
    if (typeof unsafeWindow == 'undefined') {
        unsafeWindow = window
    }
    unsafeWindow.jQuery.fx.off = true;
    var rewardUrl = '/en/main/weekly-challenge-collect-reward';
    var tokenString = $j('#' + $j('div.user_health input[type=hidden]').attr('id')).val();
    $j('div.threshold.rewarded').remove();
    var pushReward = function () {
        rewardArray.push(this.id.split('_')[1])
    };
    var analysReward = function (icon) {
        var itemCollection = $j('div.threshold.completed').has('div.' + icon);
        itemCollection.find('a.get_milestone_reward').each(pushReward);
        itemCollection.remove()
    };
    analysReward('icon_candy');
    analysReward('icon_energy_bars');
    analysReward('icon_strength_points');
    analysReward('icon_energy_booster');
    analysReward('icon_storage');
    analysReward('icon_storage_9000');
    thresholdObject = $j('div.level_threshold');
    var rewardItems = thresholdObject.children();
    width = parseFloat(thresholdObject.css('width').match(/^(\d+)px$/)[0]);
    rewardItems.css({ 'width': width / (rewardItems.size() + 1) + 'px' });
    if (rewardArray.length == 0) {
        thresholdObject.css({ 'background-position': '0px 0px' })
    } else {
        thresholdObject.css({ 'background-position': -width + 'px 0px' });
        intervalId = setInterval(function () {
            $j.post(rewardUrl, {
                _token: tokenString,
                rewardId: rewardArray[rewardIndex++]
            }, function (response) {
                if (response.status == 'success') {
                    thresholdObject.css({ 'background-position': -width * (rewardArray.length - ++rewardGet) / rewardArray.length + 'px 0px' })
                }
            }, 'json');
            if (rewardIndex >= rewardArray.length) {
                clearInterval(intervalId)
            }
        }, 1000)
    }
}
GM_wait()