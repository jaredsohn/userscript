// ==UserScript==
// @name        Niport
// @namespace   http://www.atomer.sakuran.ne.jp
// @description ニコレポの拡張
// @include     http://www.nicovideo.jp/my
// @include     http://www.nicovideo.jp/my/
// @include     http://www.nicovideo.jp/my/top
// @version     0.1
// ==/UserScript==
(function(window, loaded){
    var win;
    if (!loaded && this.chrome) {
        var fn = '(' + arguments.callee.toString() + ')(this,true);';
        var script = document.createElement('script');
        script.appendChild(document.createTextNode(fn));
        document.body.appendChild(script);
        return;
    } else if (this.chrome) {
        win = window;
    } else {
        win = unsafeWindow;
    }
    
    var niport = {
        _labelList: [],
        _filterBase: null,
        _filterName: "",
        init: function() {
            this._trigger();
            this._getElement();
            
            this._filterBase = this._createFilterBase();
            this._attachEvent();
            
            this._refreshFilter();
        },
        _trigger: function() {
            var that = this;
            initializer.setTrigger("appendTo", function() {
                that._filter(that._filterName);
                that._refreshFilter(that._filterName);
            }, function(s) {
                if (typeof s === "object" && s.html && s.html().indexOf("SYS_TH_RES_POST_") !== -1) {
                    return true;
                }
                return false;
            });
        },
        _getElement: function() {
            this._reportList = document.getElementById("SYS_THREADS");
        },
        _attachEvent: function() {
            var that = this;
            this._filterBase.addEventListener("change", function(e) {
                var s = that._filterBase.options[that._filterBase.selectedIndex].value;
                that._filterName = s;
                that._filter(s);
                that._filterBase.blur();
            }, true);
        },
        _createFilterBase: function() {
            var base = document.getElementById("myContBody");
            var div = document.createElement("div");
            div.style.textAlign = "right";
            div.id = "todaywatch_nicorepo_filter";
            div.innerHTML = '<span>フィルター：</span>';
            var select = document.createElement("select");
            div.appendChild(select);
            base.insertBefore(div, this._reportList);
            return select;
        },
        _refreshFilter: function(defName) {
            var that = this;
            this._eachItem(function(name, el) {
                !that._labelList[name] && (that._labelList[name] = true);
            });
            
            var list = ['<option value="">フィルター無し</option>'];
            for (var s in this._labelList) {
                if (this._labelList.hasOwnProperty(s)) {
                    list.push('<option value="' + s + '"' + (defName === s ? ' selected' : '') + '>' + s + '</option>');
                }
            }
            this._filterBase.innerHTML = list.join("");
        },
        _filter: function(s) {
            this._eachItem(function(name, el) {
                if (name === s || s === "") {
                    el.style.display = "block";
                } else {
                    el.style.display = "none";
                }
            });
        },
        _eachItem: function(f) {
            var items = document.querySelectorAll("#SYS_THREADS > LI");
            var name;
            for (var i = 0, len = items.length; i < len; i++) {
                name = items[i].querySelector(".userName > A").textContent;
                f(name, items[i]);
            }
        }
    };
    
    initializer = (function(win) {
        var trigger = {
            appendTo: []
        };
        var fAppendTo = win.jQuery.fn.appendTo;
        win.jQuery.fn.appendTo = function(s) {
            fAppendTo.apply(this, arguments);
            for (var i = 0, len = trigger.appendTo.length; i < len; i++) {
                trigger.appendTo[i](s);
            }
            return this;
        };
        return {
            setTrigger: function(type, callback, judge) {
                !trigger[type] && (trigger[type] = []);
                trigger[type].push(function(s) {
                    if (judge) {
                        judge(s) && callback();
                    } else {
                        callback();
                    }
                });
            }
        };
    })(win);
    
    niport.init();
    
})(window);