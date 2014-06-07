// ==UserScript==
// @name render_ask_hottest
// @description render guokr.ask.hottest and ask.highlight page and make it provide more information
// ==/UserScript==
function render_list() {
    $('.gmain ul.ask-list-cp li').each(function (ind, el) {
        var qurl = $('div.ask-list-detials h2 a', el).attr('href');
        var question_id = parseInt(/http:\/\/www\.(?:\w+\.)?guokr\.com\/question\/([0-9]+)\//g.exec(qurl)[1]);
        render_question(question_id, el);
    });
    function render_question(question_id, el) {
        render_answerers(question_id, el);
    }
    function render_answerers(question_id, el) {
        $.get('/apis/ask/answer.json',
              {'question_id': question_id,
               'retrieve_type': 'by_question',
               'limit': 5},
              render_span);
        function render_span(data) {
            var html = '';
            for(var i=0;i<data.result.length;i++) {
                var author = data.result[i].author;
                html = html + '&nbsp;&nbsp;<a href="'+ author.url +'" target="_blank" title="'+ author.nickname +'"><img src="'+ author.avatar.small +'"/></a>';
            }
            $('div.ask-list-detials', el).append('<div class="ask-list-legend">回答者' + html + '</div>');
        }
    }
};

render_list();
