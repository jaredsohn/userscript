// ==UserScript==
// @name           chordButtons
// @namespace      http://ja.chordwiki.org/wiki.cgi?c=edit
// @include        http://ja.chordwiki.org/wiki.cgi?c=edit*
// ==/UserScript==
(function () {
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        script.addEventListener('load', function () {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    function main() {
        var createButtons, createFreeForm, createSelect, exendJq, insertHtml, jmn, onMainAreaChanged;

        Array.prototype.unique = function () {
            var key, output, value, _i, _ref, _results;
            output = {};
            for (key = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; key = 0 <= _ref ? ++_i : --_i) {
                output[this[key]] = this[key];
            }
            _results = [];
            for (key in output) {
                value = output[key];
                _results.push(value);
            }
            return _results;
        };

        exendJq = function () {
            return jQ.fn.extend({
                insertAtCaret: function (word) {
                    var area, np, ps, str;
                    area = this.get(0);
                    str = area.value;
                    ps = area.selectionStart;
                    np = ps + word.length;
                    area.value = str.substr(0, ps) + word + str.substr(ps);
                    return area.setSelectionRange(np, np);
                }
            });
        };

        insertHtml = function () {
            return jQ('\
<style type="text/css">\
  div.d {border-width: 1px; border-style: solid; margin: 4px; padding: 5px;}\
  td.fl {float: left;}\
</style>\
<div class="d">\
  <table><tr>\
  <td><div id="sel">key : </div></td>\
  <td>7th : <input id="7th" type="checkbox" /></td>\
  </tr></table>\
  <div id="buttons1"></div>\
</div>\
\
<div class="d">\
  <div id="buttons3"></div>\
</div>\
\
<div class="d">\
  <textarea id="list1" />\
  <div id="buttons2"></div>\
</div>').appendTo("div.main");
        };

        createButtons = function (pos, a) {
            var e, ip, _i, _len, _results;
            pos.empty();
            _results = [];
            for (_i = 0, _len = a.length; _i < _len; _i++) {
                e = a[_i];
                if (e && e.length > 0) {
                    ip = jQ("<input>").attr("type", "button").val(e);
                    ip.appendTo(pos);
                    _results.push(ip.click(function () {
                        jQ('textarea[name=chord]').insertAtCaret("[" + jQ(this).val() + "]");
                        return onMainAreaChanged();
                    }));
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        };

        createSelect = function () {
            var chordNames, chordsOnKey, i, opt, sel, type, _i, _len;
            type = ["", "m", "m", "", "", "m", "m-5"];
            chordNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
            chordsOnKey = function (offset) {
                var a, crd, i, scale, _i, _ref;
                scale = [0, 2, 4, 5, 7, 9, 11];
                a = [];
                for (i = _i = 0, _ref = scale.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                    crd = chordNames.concat(chordNames)[scale[i] + offset] + type[i];
                    a.push(crd);
                }
                return a;
            };
            sel = jQ("<select></select>");
            for (_i = 0, _len = chordNames.length; _i < _len; _i++) {
                i = chordNames[_i];
                opt = jQ("<option>").attr("value", i).text(i);
                opt.appendTo(sel);
            }
            sel.appendTo(jQ("#sel"));
            sel.change(function (e) {
                return createButtons(jQ("#buttons1"), chordsOnKey(e.target.selectedIndex));
            });
            createButtons(jQ("#buttons1"), chordsOnKey(0));
            return jQ("#7th").change(function (e) {
                if (e.target.checked) {
                    type = ["M7", "m7", "m7", "M7", "7", "m7", "m7-5"];
                } else {
                    type = ["", "m", "m", "", "", "m", "m-5"];
                }
                return createButtons(jQ("#buttons1"), chordsOnKey(jQ("#sel select")[0].selectedIndex));
            });
        };

        onMainAreaChanged = function () {
            var a, e, ls, _i, _len;
            ls = jQ("textarea[name=chord]").val().match(/\[.+?\]/g);
            if (ls) {
                a = [];
                for (_i = 0, _len = ls.length; _i < _len; _i++) {
                    e = ls[_i];
                    e.match(/\[(.+?)\]/);
                    a.push(RegExp.$1);
                }
                return createButtons(jQ("#buttons3"), a.unique());
            }
        };

        createFreeForm = function () {
            var f;
            f = function () {
                return createButtons(jQ("#buttons2"), jQ(this).val().split(" ").unique());
            };
            jQ('#list1').val("free form");
            jQ('#list1').mouseup(f).keyup(f).change(f).click(f);
            return jQ('#list1').keyup();
        };

        mn = function () {
            insertHtml();
            exendJq();
            createSelect();
            createFreeForm();
            jQ("textarea[name=chord]").keyup(onMainAreaChanged).mouseup(onMainAreaChanged).focus();
            return onMainAreaChanged();
        };

        mn();

    }
    addJQuery(main);
})();