// ==UserScript==
// @name       DZ自动回复 JAE
// @namespace  http://userscripts.org/scripts/show/486139
// @version    0.2
// @description  DZ自动回复,刷分利器 Make By JAE，交流QQ群:123266961
// @include      http*
// @copyright  2014.5.1, JAE
// @blog 		http://blog.jaekj.com
// ==/UserScript==

((function() {
    Random = function(start, end) {
        start--;
        return Math.ceil(Math.random() * (end - start) + start);
    }
    randomChar = function() {
        var arr = [this.Random(48, 57), Random(97, 122)];
        return String.fromCharCode(arr[this.Random(0, arr.length - 1)]);
    }
    makeStr = function(len) {
        var str = '';
        for (var i = 0; i < len; i++) {
            str += randomChar();
        }
        return str;
    }
    var message = new Array();
    message[0] = '嗯，看起来还不错，谢谢楼主。'
    message[1] = '谢谢楼主分享好东西！！！'
    message[2] = '嗯，这个帖子要回复看看……'
    message[3] = '呵呵，太感谢了，真的很不错~~'
    message[4] = '呵呵，这个可以有！谢谢楼主提供。'
    message[5] = '嗯，正是我想要的……'
    message[6] = '谢谢楼主提供，支持了。'
    message[7] = '呵呵，不错，纯支持了^-^'
    message[8] = '回复看看是神马东东。'
    message[9] = '嗯，不知有木有用，试试看了……'
    message[10] = '哦，貌似很给力的样子……'
    message[11] = '嗯，先回复试试看@~@.'
    message[12] = '多谢楼主提供这个，顶一下！'
    message[13] = '虽然不用，但还是支持了！！！'
    message[14] = '非常喜欢，回复了再说，谢谢楼主！'
    message[15] = '看来不顶都不行了，谢谢楼主！'
    message[16] = '有这个啊，那先回复看看吧！'
    var flag = jQuery("#fastpostsubmit")&&jQuery("#fastpostsubmit").length?true:false;
    if (flag) {
        var messages = message[parseInt(Math.random() * 15)];
        var auto_reply_default_message = messages + makeStr(4);
        jQuery("textarea").text(auto_reply_default_message);
        jQuery("textarea").submit();
    }

})());



