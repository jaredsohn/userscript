// ==UserScript==
// @name            HDChina Auto Thanks
// @namespace       http://rainux.org/
// @description     浏览 HDChina.org 资源详情页面时使用 AJAX 方式在后台自动感谢发布者。如果您觉得这不足以表达谢意，请使用奖励积分功能。
// @include         http://hdchina.org/details.php*
// ==/UserScript==

(function() {
    var thanksForm = document.getElementById('thanksForm');

    var post_data = [];
    for (var i = 0; i < thanksForm.elements.length; i++) {
        if ((thanksForm.elements[i].name == 'submit') &&
            (thanksForm.elements[i].disabled)) {
            return;
        }

        post_data.push(thanksForm.elements[i].name + '=' + thanksForm.elements[i].value);
    }
    post_data = encodeURI(post_data.join('&'));

    GM_xmlhttpRequest({
        method: 'POST',
        url: thanksForm.action,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html,application/xhtml+xml,application/xml',
            'Content-type': 'application/x-www-form-urlencoded',
        },
        data: post_data,

        onload: function(responseDetails) {
            var e = document.createElement('div');
            e.innerHTML = responseDetails.responseText;
            var forms = e.getElementsByTagName('form');

            for (var i = 0; i < forms.length; i++) {
                if (forms[i].id == 'thanksForm') {
                    for (var j = 0; j < forms[i].elements.length; j++) {
                        if (forms[i].elements[j].name == 'submit') {
                            forms[i].elements[j].value = '已经自动感谢发布者，如果您觉得这不足以表达谢意，请使用奖励积分功能。';
                            break;
                        }
                    }

                    thanksForm.parentNode.innerHTML = forms[i].parentNode.innerHTML;
                    break;
                }
            }
        }
    });
}
)();
