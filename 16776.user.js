// ==UserScript==
// @name           summarize autopagerized tosp
// @namespace      http://fuba.moarningnerds.org/
// @description    sweets
// @include        http://*tosp.co.jp/BK/*
// ==/UserScript==
(function () {
if (typeof(window.AutoPagerize) == 'undefined') return;

// set skipwords
var skipwords = '魔法 i 次 目次 C'.split(/\s/);
var ng = new Object;
skipwords.map(function(w){ng[w]=1});

var Sentence = function Sentence(text) {
    return {
        text: text,
        terms: function () {
            return (this._terms) ? this._terms : this._split();
        },
        termProbabilities: function () {
            if (this._prob) return this._prob;
            
            var terms = this.terms();
            var index = new Object;
            var list = new Array;
            
            for (var i=0;i<terms.length;i++) {
                var term = terms[i];
                if (term) index[term] = (index[term]) ? index[term] + 1 : 1;
            }
            
            for (var term in index) {
                list.push(term);
                index[term] = index[term] / terms.length;
            }
            
            this._prob = index;
            this._list = list;
            
            return index;
        },
        list: function () {
            this.termProbabilities;
            return this._list;
        },
        _split: function () {
            var text = this.text;
            var katakana = text.match(/[゠-ー]+/g);
            var alphabet = text.match(/[A-Za-zＡ-Ｚａ-ｚ]+/g);
            var kanji = text.match(/[一-龠]+/g)
            var terms_temp = new Array;
            terms_temp = terms_temp.concat(katakana, alphabet, kanji);
            var terms = new Array;
            for (var i=0;i<terms_temp.length;i++) {
                if (!ng[terms_temp[i]]) terms.push(terms_temp[i]);
            }
            this._terms = terms;
            this;
        },
        sim: function (target) {
            var t = target.list();
            var o = this.list();
            
            if (t.length * o.length == 0) return 0;
            
            var _and = 0;
            var _or_counter = new Object;
            var _or = 0;
            
            for (var term=0;term<o.length;term++) {
                if (t[term]) _and++;
                _or_counter[term] = 1;
            }
            for (var term=0;term<t.length;term++) _or_counter[term] = 1;
            for (var term in _or_counter) _or++;
            
            target._sim = _and / _or;
            return target._sim;
        }
    };
};

var Summarizer = {
    sentences: [],
    addNode: function (node) {
        var newstcs =
            node
            .innerHTML
            .toString()
            .replace(/<br[\/]?>/ig, "\n")
            .replace(/<[^>]+?>/g, '')
            .replace(/\&nbsp\;/g, ' ')
            .replace(/\&(?:quot|[lg]t|amp)\;/g, '')
            .replace(/([。．.\r\t])/g, "。\n")
            .split(/\n/)
            .filter(
                function (s) {
                    return (s.match(/.+/))
                }
            )
            .map(
                function (s) {
                    var sentence = new Sentence(s);
                    sentence.terms();
                    return sentence;
                }
            );
        this.sentences = this.sentences.concat(newstcs);
    },
    stat: function () {
        var sentences = this.sentences;
        
        var ii = new Array;
        var en = new Object;
        for (var stc=0;stc<sentences.length;stc++) {
            var index = sentences[stc].termProbabilities();
            ii[stc] = index;
            for (var term in index) {
                var p = index[term];
                var e = p * Math.log(p);
                en[term] = (en[term]) ? en[term]-e : -e;
            }
            for (var term in en) {
                en[term] = 1/en[term];
            }
        }
        
        var weights = new Array;
        for (var stc=0;stc<sentences.length;stc++) {
            var terms = sentences[stc].terms();
            for (var i=0;i<terms.length;i++) {
                weights[stc] = (weights[stc])
                    ? weights[stc] + en[terms[i]]
                    : en[terms[i]];
            }
        }
        
        var stats = new Array;
        for (var i=0;i<weights.length;i++) {
            if (!isNaN(weights[i])) {
                var len = sentences[i].terms().length;
                stats.push({
                    weight: weights[i] / Math.log(1+len),
                    index: i,
                    sentence: this.sentences[i],
                });
            }
        }        
        
        stats.sort(
            function (a, b) {
                return b.weight - a.weight
            }
        );
        
        this._stats = stats;
        return stats;
    },
    summary: function (nodes, strnum) {
        for (var i=0;i<nodes.length;i++) {
            this.addNode(nodes[i]);
        }
        var stats = this.stat();
        var results = new Array;
        var rest = (stats.length > strnum) ? strnum : stats.length;
        var i = 0;
        while (stats[i] && results.length < rest) {
            var last = results[results.length-1];
            if (last && (last.sentence.sim(stats[i].sentence) < 0.3)) {
                results.push(stats[i]);
            }
            if (!last) results.push(stats[i]);
            i++;
        }
        results.sort(
            function (a, b) {
                return a.index - b.index
            }
        );
        
        return results.map(
            function (o) {
                return o.sentence.text //+':'+o.weight
            }
        ).map(function(s){return '<p>'+s+'</p>'}).join('');
    }
};

var frame = document.createElement('div');
frame.setAttribute('style', 'padding:1em;font-family:serif;border:1px solid;z-index:100;position:fixed;right:0;bottom:0;font-size:1.1em;background-color:inherit;width:50%;text-align:left;');

var display = document.createElement('div');
display.id = 'tospsummary';
frame.appendChild(display);

var strnuminput = document.createElement('input');
strnuminput.id = 'tospsummarystrnum';
strnuminput.type = 'text';
strnuminput.value = '7';
strnuminput.setAttribute('style', 'font-family:sans-serif;border:none;font-size:1.3em;border: none;width:100%;text-align:right;padding-right:0.5em;');
frame.appendChild(strnuminput);

document.body.appendChild(frame);

var summary = function (docs) {
    display.innerHTML = Summarizer.summary(docs, strnuminput.value);
};

summary([document.body]);
window.AutoPagerize.addFilter(summary);

})();