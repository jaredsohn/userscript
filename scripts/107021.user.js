// ==UserScript==
// @name        mNicoSeigaClip
// @namespace   http://www.atomer.sakura.ne.jp/
// @description ニコニコ静画のクリップ時に複数のクリップグループに登録する
// @include     http://seiga.nicovideo.jp/seiga/*
// @version     0.1
// ==/UserScript==
(function() {
    var OPTION_TAG = '<option value="${value}">${title}</option>';
    
    function searchOption(select, value) {
        var options = select.options;
        var el = null;
        for (var i = 0, len = options.length; i < len; i++) {
            if (options[i].value === value) {
                el = options[i];
                break;
            }
        }
        return el;
    }
    
    mSeigaClip = {
        init: function() {
            this.clipGroup = document.getElementById("group_id");
            if (!this.clipGroup) {
                return;
            }

            this.clipButton = document.querySelector("#add_clip > .clip_button");
            this.multiSelector = this.createMultiSelector(this.clipGroup);
            this.clipGroup.style.display = "none";
            
            this.attachEvents();
        },
        createMultiSelector: function(clipGroup) {
            var group = clipGroup.options;
            var multi = document.createElement("select");
            var num = group.length;
            multi.setAttribute("size", num > 5 ? "5" : num);
            multi.setAttribute("multiple", "1");
            
            var mList = [], s;
            for (var i = 0, len = num; i < len; i++) {
                s = OPTION_TAG.replace("${value}", group[i].value);
                s = s.replace("${title}", group[i].textContent);
                mList.push(s);
            }
            multi.innerHTML = mList.join("");
            multi.firstChild.selected = true;
            
            var form = document.getElementById("add_clip");
            form.insertBefore(multi, clipGroup);
            
            return multi;
        },
        attachEvents: function() {
            var that = this;
            this.clipButton.addEventListener("mousedown", function(e) {
                var list = [];
                var options = that.multiSelector.options;
                for (var i = 0, len = options.length; i < len; i++) {
                    options[i].selected && list.push(options[i]);
                }
                that.multiClip(list);
                return false;
            }, false);
        },
        multiClip: function(selectedList) {
            var that = this;
            for (var i = 0, len = selectedList.length; i < len; i++) {
                var target = searchOption(this.clipGroup, selectedList[i].value);
                if (i !== 0) {
                    with ({el:target}) {
                        setTimeout(function() {
                            if (!that.clipButton.disabled) {
                                el.selected = true;
                                that.clipButton.removeAttribute("disabled");
                                that.clipButton.click();
                            } else {
                                var f = arguments.callee;
                                setTimeout(function() {
                                    f();
                                }, 300);
                            }
                        }, i * 500);
                    }
                } else {
                    target.selected = true;
                }
            }
        }
    };

    mSeigaClip.init();
    
})();