// ==UserScript==
// @name render_ask_potential
// @description render guokr.ask.potential and ask.popular page and make it easy to use
// ==/UserScript==
function render_list() {
    $('.gmain ul.ask-multi-list li').each(function (ind, el) {
        var aurl = $('div.gfl h4 a:nth-child(2)', el).attr('href');
        var answer_id = parseInt(/http:\/\/www\.(?:\w+\.)?guokr\.com\/answer\/([0-9]+)\/redirect\//g.exec(aurl)[1]);
        render_answer(answer_id, el);
    });
    function render_answer(answer_id, el) {
        $('div.gfl p.gellipsis', el).hover(function () {
                render_content(answer_id, el);
        });
    }
    function render_content(answer_id, el) {
        $.get('/apis/ask/answer/'+ answer_id +'.json',
              {},
              render_span);
        function render_span(data) {
            var html = data.result.html;
            $('div.gfl p.gellipsis', el).html('<p>' + html + '</p>').removeClass('gellipsis');
        }
    }
};

render_list();
