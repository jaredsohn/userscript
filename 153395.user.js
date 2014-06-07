// ==UserScript==
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @name Highlighter
// ==/UserScript==
    /*

     highlight v4

     Highlights arbitrary terms.

     <http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

     MIT license.

     Johann Burkard
     <http://johannburkard.de>
     <mailto:jb@eaio.com>

     */

    jQuery.fn.highlight = function(pat) {
        function innerHighlight(node, pat) {
            var skip = 0;

            if (node.nodeType == 3) {
                var pos = node.data.toUpperCase().indexOf(pat);
                if (pos >= 0) {
                    var tmp = $('body').data('found'); tmp += pat +', '; $('body').data('found', tmp);
                    var spannode = document.createElement('span');
                    spannode.className = '__hl';

                    spannode.style.background = 'yellow';
                    spannode.style.fontWeight = 'bold';

                    var middlebit = node.splitText(pos);
                    var endbit = middlebit.splitText(pat.length);
                    var middleclone = middlebit.cloneNode(true);
                    spannode.appendChild(middleclone);
                    middlebit.parentNode.replaceChild(spannode, middlebit);
                    skip = 1;
                }
            }
            else if (node.nodeType == 1 && node.childNodes && !/(img|script|style)/i.test(node.tagName)) {
                for (var i = 0; i < node.childNodes.length; ++i) {
                    innerHighlight(node.childNodes[i], pat);
                }
            }
        }
        return this.length && pat && pat.length ? this.each(function() {
            innerHighlight(this, pat.toUpperCase());
            console.log(out);
            $('#__tester__out__').append($('body').data('found'));
        }) : this;
    };

jQuery.fn.removeHighlight = function() {
    return this.find("span.highlight").each(function() {
        this.parentNode.firstChild.nodeName;
        with (this.parentNode) {
            replaceChild(this.firstChild, this);
            normalize();
        }
    }).end();
};



function ui() {
    $('body').append('<div id="__tester__" style="position: fixed; width: 30px; height: 30px; opacity: 0.6; background: green; top:0; left:0"><a href="#" id="_check_">test</a><div id="__tester__out__"></div></div>');
    $('#_check_').click(function(e) {
        e.preventDefault();
        $('body').data('found', 'nic');
        $('body')
            .highlight('jaja')
            .highlight('jajko')
            .highlight('jajo')
            .highlight('ser')
            .highlight('cheddar')
            .highlight('camembert')
            .highlight('gouda')
            .highlight('miód')
            .highlight('miod')
            .highlight('masło')
            .highlight('maslo')
            .highlight('ghe')
            .highlight('kefir')
            .highlight('jogurt')
            .highlight('mleko')
            .highlight('mleka')
    });
}

ui();

