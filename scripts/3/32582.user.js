// ==UserScript==
// @name           check*pad JetKey
// @description    check*padをキーボードショートカットで操作できます。 Provide keyboard shortcut to check*pad. 
// @version        2.03.03
// @author         Jetta <tied.fish@gmail.com>
// @namespace      http://userscripts.org/users/64319
// @require        http://sizzlemctwizzle.com/updater.php?id=32582
// @include        http://www.checkpad.jp/projects/view/*
// @history        2.03.03 - Firefox4で確認ダイアログが出た後、フォーカスが戻らない件に、一部の主要操作に対応。
// @history        2.03.02 - Greasemonkey 0.9.0 に対応(・・したつもり。うまく動作しない方は上記メアドにご連絡を）
// @history        2.03.01 - check*pad本体の「タスクを別リストに送る」の挙動変更に対応。
// @history        2.03.00 - 「１つ上のリストを開く」「１つ下のリストを開く」機能を作成。「タスクを他リストにコピー」機能も作成。[>>]ダブルクリックでも起動。
// @history        2.02.00 - 「ポインタ位置にタスクを新規追加」「ポインタ位置のタスクのコピー」機能を作成。ヘルプバルーンの表示挙動を変更。タスク送り時の背景を無色透明に。
// @history        2.01.00 - タスク送信のキー挙動を「押しながら→数字キー選択→離す」に変更。
// @history        2.00.01 - フローティングヘルプの位置微調整。未達成リストと達成済リストの切り替えロジックの修正。最上段に投げた後のポインタ挙動の変更。
// @history        2.00.00 - 2010-09-12にリニューアルしたcheck*padに対応した。
// ==/UserScript==



//----------------------------------------------------------------------------//
//----------------* 速度測定
//----------------------------------------------------------------------------//

if (false) {
    var speedTestStart = (new Date).getTime();
    console.log("speedTestStart", speedTestStart);
}

//----------------------------------------------------------------------------//
//----------------* check*padサイト自身でrequireされてるjQueryを流用する
//----------------------------------------------------------------------------//

$ = unsafeWindow.jQuery;

//----------------------------------------------------------------------------//
//----------------* 変数
//----------------------------------------------------------------------------//

var LOCAL_DOC = $("html,body");//$(window)や$(document)の代用。
var PROJECT_ID = (function () {location.href.match(/\d+$/); return RegExp.lastMatch;})();
var EVENT_TIME_STAMP = 0;

//----------------------------------------------------------------------------//
//----------------* 関数
//----------------------------------------------------------------------------//

var SF = {
    //keypressイベントの重複発生防止。
    isDoneEvent: function (evt) {
        if (evt.timeStamp == EVENT_TIME_STAMP) {
            return true;
        } else {
            EVENT_TIME_STAMP = evt.timeStamp;
            return false;
        }
    },
    //未達成タスクのDOMを返す。
    makeYetTaskDom: function (parameters) {
        return  $('<li id="task_' + parameters.id + '" class="clearfix">'
                + '<span class="taskCheckBox"><input type="checkbox" class="taskNotyetCheckCmd"></span>'
                + '<span class="taskBody">'
                    + '<span id="task_' + parameters.id + '_disp">' + parameters.elm_disp + '</span>'
                    + '<span id="task_' + parameters.id + '_orig" class="invisible">' + unsafeWindow.h(parameters.elm_orig) + '</span> '
                    + '<span class="taskCommand">'
                        + '<span class="s10 blueLink linkLike taskEditCmd">[編集]</span> '
                        + '<span class="s10 blueLink linkLike taskNotyetDelCmd">[削除]</span> '
                        + '<span class="s10 blueLink linkLike taskMoveCmd">[&raquo;]</span> '
                        + '<span class="s10 blueLink linkLike dragme">[↑↓]</span>'
                    + '</span>'
                + '</span>'
                + '</li>');
    },
    //達成済タスクのDOMを返す。
    makeDoneTaskDom: function (parameters) {
        return $('<li id="task_' + parameters.id + '" class="clearfix">'
               + '<span class="taskCheckBox"><input type="checkbox" class="taskDoneCheckCmd" checked></span>'
               + '<span class="taskBody">'
                   + '<span>' + parameters.elm_disp + '</span> <span class="s10 gray">(0分前)</span>'
                   + '<span class="taskCommand">'
                       + '<span class="s10 blueLink linkLike taskDoneDelCmd">[削除]</span>'
                   + '</span>'
               + '</span>'
               + '</li>');
    },
    terminater: null
};

//----------------------------------------------------------------------------//
//----------------* クラス
//----------------------------------------------------------------------------//

/**
 * - データのセーブ＆ロードクラス
 * jQueryのLOCAL_DOC.ready()内では、なぜかGM_getValueとGM_setValueが
 * うまく機能しなかったので、localStorageを使って、
 * ローカルにデータを保存する機能を作成した。
 */
function MiniStorage (nameSpace)
{
    this.initial = "Jetkey"
    this.nameSpace = this.initial + "_" + nameSpace + "_";
}
$.extend(MiniStorage.prototype, {
    initial: "",
    nameSpace: "",
    save: function (key, value) {
        key = this.nameSpace + key;
        localStorage.setItem(key, value);
    },
    load: function (key, defaultValue) {
        key = this.nameSpace + key;
        var value = localStorage.getItem(key);
        if (value == undefined) {
            return defaultValue == undefined
                 ? null
                 : defaultValue ;
        } else {
            return value;
        }
    },
    delete: function (key) {
        key2 = this.nameSpace + key;
        if (this.load(key) != undefined) {
            localStorage.removeItem(key2);
        }
    },
    terminater: null
});//END OF CLASS::MiniStorage;

/**
 * - 縦スクロール操作クラス
 * cutInメソッド又はfadeInメソッドの引数に渡されたDOMオブジェクトが
 * 画面内に収まるようにスクロールをコントロールする。
 * Singleton。
 */
function Cameraman (parameter)
{
    var self = arguments.callee;
    if (self.instance == null) {
        self.instance = this;
    }
    this._getScreenLine();
    return self.instance;
}
$.extend(Cameraman.prototype, {
    //----------------* プロパティ
    timeoutIds: [],//fadeInするsetTimeout関数のID格納庫。上下スクロールが反転したときに全てクリアする。
    addition: 3,//fadeInするときの最低移動ピクセル数。
    screenHeight: 0,
    screenTop: 0,
    screenBottom: 0,
    target: null,
    targetTop: 0,
    targetBottom: 0,
    //doc: LOCAL_DOC,
    doc: $("html,body"),
    //----------------* 内部メソッド
    _getScreenLine: function () {
        this.screenHeight = window.innerHeight;
        this.screenTop    = window.scrollY;
        this.screenBottom = this.screenTop + this.screenHeight;
    },
    _setTarget: function (element) {
        this.target = $(element);
    },
    _getTargetLine: function () {
        var offsett = this.target.offset();
        if (offsett) {
            this.targetTop    = offsett.top;
            this.targetBottom = offsett.top + this.target.height();
            return true;
        } else {
            return false;
        }
    },
    _goDown: function () {
        this._getScreenLine();
        if (this.targetBottom <= this.screenBottom + this.addition) {
            this.doc.scrollTop(this.targetBottom - this.screenHeight + this.addition);
        } else {
            this.doc.scrollTop(this.screenTop + Math.ceil((this.targetBottom - this.screenBottom) / 2) + this.addition);
            var me = this;
            setTimeout(function () {
                me._goDown();
            }, 25);
        }
    },
    _goUp: function () {
        this._getScreenLine();
        if (this.targetTop >= this.screenTop - this.addition) {
            this.doc.scrollTop(this.targetTop);
        } else {
            this.doc.scrollTop(this.screenTop + Math.floor((this.targetTop - this.screenTop) / 2) - this.addition);
            var me = this;
            setTimeout(function () {
                me._goUp();
            }, 25);
        }
    },
    _cancelFadeIn: function () {
        for (var i = 0, len = this.timeoutIds.length; i < len; ++i) {
            clearTimeout(this.timeoutIds[i]);
        }
    },
    //----------------* 外部メソッド
    fadeIn: function (element) {
        this._getScreenLine();
        this._setTarget(element);
        if (this._getTargetLine(this.target)) {
            if (this.targetTop < this.screenTop) {
                this._cancelFadeIn();
                this._goUp();
            } else if (this.targetBottom > this.screenBottom) {
                this._cancelFadeIn();
                if (this.target.height() > this.screenHeight) {
                    this.doc.scrollTop(this.targetTop);
                } else {
                    this._goDown();
                }
            }
        }
    },
    cutIn: function (element) {
        this._getScreenLine();
        this._setTarget(element);
        if (this._getTargetLine(this.target)) {
            if (this.targetTop < this.screenTop) {
                this._cancelFadeIn();
                this.doc.scrollTop(this.targetTop);
            } else if (this.targetBottom > this.screenBottom) {
                this._cancelFadeIn();
                if (this.target.height() > this.screenHeight) {
                    this.doc.scrollTop(this.targetTop);
                } else {
                    this.doc.scrollTop(this.targetBottom - this.screenHeight);
                }
            }
        }
    },
    terminater: null
});//END OF CLASS::Cameraman;

/**
 * - ポインター位置管理クラス（基底クラス）
 */
function KeyPointer (parameter) {
    if (!parameter.pointerId) {return;}
    if (!parameter.nodesSeed) {return;}
    this.cameraman = new Cameraman(),
    this.available = parameter.available === true ? true : false;
    var pointerChar = parameter.pointerChar || "●";
    this.pointer =
        $("<div>" + pointerChar + "</div>")
        .attr("id", parameter.pointerId)
        .css({
            position: "absolute",
            width:  "16px",
            height: "16px"
        });
    this.nodesSeed = parameter.nodesSeed;
    this.nodeMinBound = $(parameter.nodeMinBoundSeed),
    this.nodeMaxBound = $(parameter.nodeMaxBoundSeed),
    this._makeTargetNodes();
    this.pointer.appendTo("body");
    this.reload();
};
$.extend(KeyPointer.prototype, {
    //----------------* プロパティ
    available: false,
    busy: false,
    pointer: null,
    nodesSeed: "",
    nodes: null,
    nodeMin: 0,
    nodeMax: 0,
    current: 0,
    nodeMinBound: null,
    nodeMaxBound: null,
    keyUpTopCounter: 0,
    keyUpTopPrevTime: 0,
    keyUpBottomCounter: 0,
    keyUpBottomPrevTime: 0,
    floatingItem: null,
    cameraman: null,
    //----------------*  内部メソッド
    //対象ノードリストを取得／再取得する。
    _makeTargetNodes: function () {
        this.nodes = $(this.nodesSeed);
        if (!this.isAvailable() || this.nodes.length > 0) {
            this.nodeMin = 0;
            this.nodeMax = this.nodes.length - 1;
        } else {
            this.nodeMin = -1;
            this.nodeMax = -1;
            this.current = -1;
            this.removeAvailable();
        }
    },
    _pointerMoving: function (position, scrollTarget) {
        if (!this.isAvailable()) {return;}
        this.unselectNode();
        this.point(position);
        this.selectNode();
        this.cameraman.fadeIn(scrollTarget || this.nodes.eq(this.current));
    },
    _pointerDown: function (move) {
        if (!this.isAvailable()) {return;}
        var movedPosition = this.current + move;
        var scrollTarget = null;
        if (movedPosition >= this.nodeMax) {
            movedPosition = this.nodeMax;
            scrollTarget = this.nodeMaxBound;
        }
        this._pointerMoving(movedPosition, scrollTarget);
    },
    _pointerUp: function (move) {
        if (!this.isAvailable()) {return;}
        var movedPosition = this.current - move;
        var scrollTarget = null;
        if (movedPosition <= this.nodeMin) {
            movedPosition = this.nodeMin;
            scrollTarget = this.nodeMinBound;
        }
        this._pointerMoving(movedPosition, scrollTarget);
    },
    //----------------* 外部メソッド
    ku: function () {
        var mantra = "色即是空 空即是色";
        return;
    },
    isDblKeyUpTop: function () {
        if (this.current != this.nodeMin) {return false;}
        var now = (new Date()).getTime();
        if (this.keyUpTopPrevTime + 400 > now) {
            this.keyUpTopCounter++;
        } else {
            this.keyUpTopCounter = 0;
        }
        this.keyUpTopPrevTime = now;
        if (this.keyUpTopCounter >= 1) {return true;}
        return false;
    },
    isDblKeyUpBottom: function () {
        if (this.current != this.nodeMax) {return false;}
        var now = (new Date()).getTime();
        if (this.keyUpBottomPrevTime + 400 > now) {
            this.keyUpBottomCounter++;
        } else {
            this.keyUpBottomCounter = 0;
        }
        this.keyUpBottomPrevTime = now;
        if (this.keyUpBottomCounter >= 1) {return true;}
        return false;
    },
    hasNodes: function () {
        return $(this.nodesSeed).length > 0;
    },
    setAvailable: function () {
        this.available = true;
        this.reload();
    },
    removeAvailable: function () {
        this.available = false;
        this.unselectNodesAll();
        this.reload();
    },
    isAvailable: function () {
        return this.available;
    },
    setBusy: function () {
        this.busy = true;
        this.pointer.addClass("busy");
    },
    removeBusy: function () {
        this.busy = false;
        this.pointer.removeClass("busy");
    },
    isBusy: function () {
        return this.busy;
    },
    light: function () {
        $(this.nodes.eq(this.current)).effect("highlight", 800);
    },
    //内部位置に応じた場所にポインタを表示。
    //targetElem引数がある場合は、その位置にポインタを移す。
    point: function (targetElem) {
        if (!this.isAvailable()) {
            this.pointer
                .css({
                    top:  "-9999px",
                    left: "-9999px"
                });
            return;
        }
        if (targetElem != undefined) {
            if (typeof(targetElem) == "number") {
                var targetNode = this.nodes.eq(targetElem);
                this.current = targetElem;
            } else {
                var targetNode = $(targetElem);
                var self = this;
                this.nodes.each(function (index, node) {//$().index()を使うと、なぜか正しく機能しないから、ベタ書き。
                    if (node == targetElem) {
                        self.current = index;
                        return false;
                    }
                });
            }
        } else {
            var targetNode = this.nodes.eq(this.current);
        }
        var offsett = targetNode.offset();
        if (offsett) {
            this.pointer
                .css({
                    top:  (offsett.top + 2) + "px",
                    left: (offsett.left - 18) + "px"
                });
        }
    },
    hoverNode: function (overPostion, outPosition) {
        this.unselectNode(outPosition);
        this.selectNode(overPostion);
    },
    selectNode: function (position) {
        if (!this.isAvailable()) {return;}
        if (typeof(position) == "number") {
            this.nodes.eq(position).addClass("jetkey-yellowBg");
        } else if (position == undefined) {
            this.nodes.eq(this.current).addClass("jetkey-yellowBg");
        } else {
            $(position).addClass("jetkey-yellowBg");
        }
    },
    unselectNode: function (position) {
        if (typeof(position) == "number") {
            this.nodes.eq(position).removeClass("jetkey-yellowBg");
        } else if (position == undefined) {
            this.nodes.eq(this.current).removeClass("jetkey-yellowBg");
        } else {
            $(position).removeClass("jetkey-yellowBg");
        }
    },
    unselectNodesAll: function () {
        this.nodes.each(function () {
            $(this).removeClass("jetkey-yellowBg");
        });
    },
    reload: function () {
        this._makeTargetNodes();
        if (this.current > this.nodeMax) {
            this.current = this.nodeMax;
        } else if (this.current < this.nodeMin) {
            this.current = this.nodeMin;
        }
        this.point();
        this.selectNode();
    },
    powerReload: function () {
        this.unselectNodesAll();
        this.reload();
    },
    pointerDown1: function () {
        this._pointerDown(1);
    },
    pointerUp1: function () {
        this._pointerUp(1);
    },
    pointerDown3: function () {
        this._pointerDown(3);
    },
    pointerUp3: function () {
        this._pointerUp(3);
    },
    pointerDown5: function () {
        this._pointerDown(5);
    },
    pointerUp5: function () {
        this._pointerUp(5);
    },
    pointerDownEdge: function () {
        this._pointerMoving(this.nodeMax, this.nodeMaxBound);
    },
    pointerUpEdge: function () {
        this._pointerMoving(this.nodeMin, this.nodeMinBound);
    },
    terminater: null
});//END OF CLASS::KeyPointer;

/**
 * - 未達成タスクのポインター位置管理クラス
 */
function YetsPointer (parameter) {
    KeyPointer.apply(this, arguments);//基底クラスのコンストラクタを呼ぶ。
};
$.extend(YetsPointer.prototype, KeyPointer.prototype, {
    //----------------* プロパティ
    dragging: false,
    poppingUp: false,
    prevCheckedTaskId: null,
    //----------------* 内部メソッド
    _dragMoving: function (position, scrollTarget) {
        this.point(position);
        this.reload();
        this.cameraman.fadeIn(scrollTarget);
    },
    _dragDown: function (move) {
        if (this.current == this.nodeMax) {return;}
        var movePosition = this.current + move;
        var scrollTarget = this.floatingItem;
        if (movePosition >= this.nodeMax) {
            movePosition = this.nodeMax;
            scrollTarget = this.nodeMaxBound;
        }
        this.nodes.eq(movePosition).after(this.floatingItem);
        this._dragMoving(movePosition, scrollTarget);
    },
    _dragUp: function (move) {
        if (this.current == this.nodeMin) {return;}
        var movePosition = this.current - move;
        var scrollTarget = this.floatingItem;
        if (movePosition <= this.nodeMin) {
            movePosition = this.nodeMin;
            scrollTarget = this.nodeMinBound;
        }
        this.nodes.eq(movePosition).before(this.floatingItem);
        this._dragMoving(movePosition, scrollTarget);
    },
    _dragDownEdge: function () {
        if (this.current == this.nodeMax) {return;}
        this.nodes.last().after(this.floatingItem);
        this._dragMoving(this.nodeMax, this.nodeMaxBound);
    },
    _dragUpEdge: function () {
        if (this.current == this.nodeMin) {return;}
        this.nodes.first().before(this.floatingItem);
        this._dragMoving(this.nodeMin, this.nodeMinBound);
    },
    _ajaxSortedTasks: function () {
        if (!this.isAvailable()) {return;}
        var querys = [];
        this.nodes.each(function () {
            if (this.id.match(/\d+$/)) {
                querys.push("task[]=" + RegExp.lastMatch)
            }
        });
        var self = this;
        $.ajax({
            type: "POST",
            url:  "/_ajax_tasks_sort.php",
            data: querys.join("&")
        });
    },
    //----------------* 外部メソッド
    pointerDown1: function () {//override.
        this.isDragging() ? this._dragDown(1) : this._pointerDown(1) ;
    },
    pointerUp1: function () {//override.
        this.isDragging() ? this._dragUp(1) : this._pointerUp(1) ;
    },
    pointerDown3: function () {//override.
        this.isDragging() ? this._dragDown(3) : this._pointerDown(3) ;
    },
    pointerUp3: function () {//override.
        this.isDragging() ? this._dragUp(3) : this._pointerUp(3) ;
    },
    pointerDown5: function () {//override.
        this.isDragging() ? this._dragDown(5) : this._pointerDown(5) ;
    },
    pointerUp5: function () {//override.
        this.isDragging() ? this._dragUp(5) : this._pointerUp(5) ;
    },
    pointerDownEdge: function () {//override.
        this.isDragging() ? this._dragDownEdge() : this._pointerMoving(this.nodeMax, this.nodeMaxBound) ;
    },
    pointerUpEdge: function () {//override.
        this.isDragging() ? this._dragUpEdge() : this._pointerMoving(this.nodeMin, this.nodeMinBound) ;
    },
    isPoppingUp: function () {
        return !$("#taskMovePopUpClose").is(":hidden");
    },
    isDragging: function () {
        return this.dragging;
    },
    dragStart: function () {
        if (!this.isAvailable()) {return;}
        this.dragging = true;
        this.floatingItem = this.nodes.eq(this.current);
        this.floatingItem
            .addClass("ui-sortable-helper")
            .css({//フローティング風に見せるだけ。
                opacity: 0.5,
                marginTop: "-6px",
                marginBottom: "-6px"
             });
        this.reload();
    },
    dragEnd: function () {
        this.floatingItem
            .removeClass("ui-sortable-helper")
            .css({
                opacity: 1,
                marginTop: "0",
                marginBottom: "0"
             });
        this.floatingItem = null;
        this.reload();
        this._ajaxSortedTasks();
        this.dragging = false;
    },
    check: function () {
        if (!this.isAvailable()) {return;}
        var currentNode = this.nodes.eq(this.current);
        var taskId = currentNode.attr("id");
        if (taskId == this.prevCheckedTaskId) {return;}//タスクのチェック動作の重複発生防止。
        this.prevCheckedTaskId = taskId;
        currentNode
            .find(".taskNotyetCheckCmd")
            .click();
    },
    startEdit: function () {
        if (!this.isAvailable()) {return;}
        this.nodes.eq(this.current)
            .find(".taskEditCmd")
            .click();
    },
    cancelEdit: function () {
        this.nodes.eq(this.current)
            .find("[id^='taskEditCancel']:visible")
            .click();
    },
    delete: function () {
        if (!this.isAvailable()) {return;}
        this.nodes.eq(this.current)
            .find(".taskNotyetDelCmd")
            .click();
    },
    showMovePopup: function () {
        if (!this.isAvailable()) {return;}
        this.poppingUp = true;
        this.nodes.eq(this.current)
            .find(".taskMoveCmd")
            .click();
    },
    hideMovePopup: function () {
        $("#taskMovePopUpClose:visible").click();
        this.reload();
        this.poppingUp = false;
    },
    switchMovePopup: function () {
        if (!this.isPoppingUp()) {
            this.showMovePopup();
        } else {
            this.hideMovePopup();
        }
    },
    openLink: function () {
        if (!this.isAvailable()) {return;}
        this.nodes.eq(this.current)
            .find("a")
            .each(function () {
                window.open(this.getAttribute("href"), "_blank");
            });
    },
    throwDown: function () {
        if (!this.isAvailable()) {return;}
        if (this.current == this.nodeMax) {return;}
        var self = this;
        var targetOffset = this.nodes.last().offset();
        var throwee = this.nodes.eq(this.current);
        throwee
            .css({opacity: 0.7, position: "absolute", top: (throwee.offset().top + 15) + "px"})
            .delay(150)
            .animate({
                top: targetOffset.top + "px"
            }, 400, "easeOutBack", function () {
                self.nodes.last().after(throwee);
                throwee.css({opacity: 1, position: "static"});
                self.unselectNode(throwee);
                self.reload();
                self.point();
                self.selectNode();
                self._ajaxSortedTasks();
            });
    },
    throwUp: function () {
        if (!this.isAvailable()) {return;}
        if (this.current == this.nodeMin) {return;}
        var self = this;
        var targetOffset = this.nodes.first().offset();
        var throwee = this.nodes.eq(this.current);
        throwee
            .css({opacity: 0.7, position: "absolute", top: (throwee.offset().top - 15) + "px"})
            .delay(150)
            .animate({
                top: targetOffset.top + "px"
            }, 400, "easeOutBack", function () {
                self.nodes.first().before(throwee);
                throwee.css({opacity: 1, position: "static"});
                self.unselectNode(throwee);
                self._pointerDown(1);
                self.reload();
                self.point();
                self.selectNode();
                self._ajaxSortedTasks();
            });
    },
    addTaskHere: function () {
        this.unselectNode();
        $(unsafeWindow.document).unbind("keydown", "a");
        var addBox    = $('<li id="taskAddBox2">');
        var addForm   = $('<form id="taskAddForm2" style="display:inline;">'
                        + '<input id="taskAddValue2" type="text" style="width:300px" value="" class="focus" />'
                        + '<input type="submit" value="追加" class="s12" /></form>');
        var addCancel = $('<span id="taskAddCancel2" class="linkLike blueLink s10">[キャンセル(esc)]</span>');
        addValue = addForm.find("#taskAddValue2");
        addBox
            .append(addForm)
            .append(addCancel);
        this.nodes.eq(this.current).before(addBox);
        addBox.hide().slideDown(300, function () {
            addValue.focus();
        });
        var self = this;
        addCancel.click(function () {
            addValue.blur();
            addBox.hide()
            self.nodes.eq(self.current).focus();
            addBox.remove();
            self.reload();
        });
        addForm.submit(function () {
            var value = addValue.val();
            if (value == "") {return false;}
            $.post(
                "/_ajax_tasks_add.php",
                {data: value, project_id: PROJECT_ID},
                function (rs) {
                    addValue.blur();
                    addBox
                        .hide()
                        .before(SF.makeYetTaskDom(rs))
                        .remove();
                    self.powerReload();
                    self._ajaxSortedTasks();
                },
                "json"
            );
            return false;
        });
    },
    cancelAddTaskHere: function () {
        $("#taskAddCancel2").click();
    },
    copyTask: function () {
        var copiee = this.nodes.eq(this.current);
        var self = this;
        $.post(
            "/_ajax_tasks_add.php",
            {data: copiee.find(".taskBody .invisible").text(), project_id: PROJECT_ID},
            function (rs) {
                var copiedTask = SF.makeYetTaskDom(rs);
                copiee.after(copiedTask);
                copiedTask.hide().slideDown(300, function () {
                    copiedTask.effect("highlight", 800);
                    self.powerReload();
                    self._ajaxSortedTasks();
                });
            },
            "json"
        );
        return false;
    },
    showCopyPopup: function () {
        if (!this.isAvailable()) {return;}
        this.poppingUp = true;
        this.nodes.eq(this.current)
            .find(".taskMoveCmd")
            .dblclick();
    },
    hideCopyPopup: function () {
        $("#taskCopyPopUpClose:visible").click();
        this.reload();
        this.poppingUp = false;
    },
    switchCopyPopup: function () {
        if (!this.isPoppingUp()) {
            this.showCopyPopup();
        } else {
            this.hideCopyPopup();
        }
    },
    terminater: null
});//END OF CLASS::YetsPointer;

/**
 * - 達成済タスクのポインター位置管理クラス
 */
function DonesPointer (parameter) {
    KeyPointer.apply(this, arguments);//基底クラスのコンストラクタを呼ぶ。
};
$.extend(DonesPointer.prototype, KeyPointer.prototype, {
    //----------------* プロパティ
    prevCheckedTaskId: null,
    //----------------* 内部メソッド
    //----------------* 外部メソッド
    check: function () {
        if (!this.isAvailable()) {return;}
        var currentNode = this.nodes.eq(this.current);
        var taskId = currentNode.attr("id");
        if (taskId == this.prevCheckedTaskId) {return;}//タスクのチェック動作の重複発生防止。
        this.prevCheckedTaskId = taskId;
        currentNode
            .find(".taskDoneCheckCmd")
            .click();
    },
    delete: function () {
        if (!this.isAvailable()) {return;}
        this.nodes.eq(this.current)
            .find(".taskDoneDelCmd")
            .click();
    },
    openLink: function () {
        if (!this.isAvailable()) {return;}
        this.nodes.eq(this.current)
            .find("a")
            .each(function () {
                window.open(this.getAttribute("href"), "_blank");
            });
    },
    terminater: null
});//END OF CLASS::DonesPointer;

/**
 * - body要素へのオリジナルstyle付与管理クラス
 */
function Stylist (parameter) {
    this.body = $("body");
    this.storage = new MiniStorage("Stylist");
};
$.extend(Stylist.prototype, {
    //----------------* プロパティ
    body: null,
    storage: null,
    //----------------* 外部メソッド
    setStyleBasic: function () {
        if (this.storage.load("hasBorder", "1") == "1") {
            this.body.addClass("jetkey-border");
        }
        if (this.storage.load("hasWide", "1") == "1") {
            this.body.addClass("jetkey-wide");
        }
    },
    switchStyle: function () {
        var hasBorder = this.body.hasClass("jetkey-border");
        var hasWide   = this.body.hasClass("jetkey-wide");
        if (hasBorder && hasWide) {
            this.body.removeClass("jetkey-wide");
            this.storage.save('hasWide', "0");
        } else if (hasBorder && !hasWide) {
            this.body.removeClass("jetkey-border");
            this.storage.save('hasBorder', "0");
        } else if (!hasBorder && !hasWide) {
            this.body.addClass("jetkey-wide");
            this.storage.save('hasWide', "1");
        } else {
            this.body.addClass("jetkey-border");
            this.storage.save('hasBorder', "1");
        }
    },
    isViewableTaskAddHelp: function () {
        var counter = this.storage.load("viewTaskAddHelp", "1");
        if (counter <= 5) {return true;}//初めてから５回までは表示。
        else if (counter % 50 == 0) {return true;}//それ以降は、５０回ごとにリマインド。
        else {return false;}
    },
    countViewTaskAddHelp: function () {
        this.storage.save('viewTaskAddHelp', this.storage.load("viewTaskAddHelp", "1") - 0 + 1);
    },
    terminater: null
});//END OF CLASS::Stylist;

/**
 * - キーショートカットのヘルプウィンドウ
 */
function CheatSheet (parameter) {
    this.storage = new MiniStorage("CheatSheet");
    this._create();
};
$.extend(CheatSheet.prototype, {
    //----------------* プロパティ
    sheet: null,
    opening: false,
    storage: null,
    keyMap: {//デフォルトキーマップ。
        s1: "------------spacer------------",
        projectConnect:  "g",
        prevProject:     "b",
        nextProject:     "n",
        s2: "------------spacer------------",
        pointerDown1:    "j",
        pointerUp1:      "k",
        pointerDown3:    "-",
        pointerUp3:      "-",
        pointerDown5:    "-",
        pointerUp5:      "-",
        pointerDownEdge: "Shift+j",
        pointerUpEdge:   "Shift+k",
        s3: "------------spacer------------",
        checkTask:     "f",
        editTask:      "d",
        deleteTask:    "e",
        sendTask:      "s",
        addTask:       "a",//※check*pad本来の機能のため、変更不可。
        addTaskHere:   "Shift+a",
        copyTask:      "Shift+x",
        copyTaskThere: "x",
        s4: "------------spacer------------",
        dragTask:      "c",
        throwTaskDown: "h",
        throwTaskUp:   "l",
        openLink:      "v",
        reloadList:    "i",
        s5: "------------spacer------------",
        sortListAsc:   "o",
        sortListDesc:  "Shift+o",
        copyList:      "p",
        mailList:      "m",
        deleteDoneTaskAll: "Shift+e",
        s6: "------------spacer------------",
        switchStyle:    "y",
        displayKeyHelp: "q",
        s7: "------------spacer------------",
        terminater: null
    },
    label: {
        projectConnect:  "他のリストを開く<br />"
                       + "<span class='caution'>（押しながら→数字を入力→離す）</span>",
        prevProject:     "１つ上のリストを開く",
        nextProject:     "１つ下のリストを開く",
        pointerDown1:    "ポインタを１つ下に移動",
        pointerUp1:      "ポインタを１つ上に移動",
        pointerDown3:    "ポインタを３つ下に移動",
        pointerUp3:      "ポインタを３つ上に移動",
        pointerDown5:    "ポインタを５つ下に移動",
        pointerUp5:      "ポインタを５つ上に移動",
        pointerDownEdge: "ポインタを最下段に移動",
        pointerUpEdge:   "ポインタを最上段に移動",
        checkTask:       "タスクをチェックする<br />チェックを外す",
        editTask:        "タスクを編集する",
        deleteTask:      "タスクを削除する",
        sendTask:        "タスクを他リストへ送る<br />"
                       + "<span class='caution'>（押しながら→数字を入力→離す）</span>",
        addTask:         "タスクを新規追加する<br />"
                       + "<span class='caution'>（キー変更は不可です）</span>",
        addTaskHere:     "ここにタスクを新規追加",
        copyTask:        "タスクをコピー",
        copyTaskThere:   "タスクを他リストにコピー<br />"
                       + "<span class='caution'>（押しながら→数字を入力→離す）</span>",
        dragTask:        "タスクをドラッグして入れ替え<br />"
                       + "<span class='caution'>（押しながら→ポインタ移動→離す）</span>",
        throwTaskDown:   "タスクを最下段に投げる",
        throwTaskUp:     "タスクを最上段に投げる",
        openLink:        "タスク内のリンクを開く",
        reloadList:      "タスクの表示を更新する",
        sortListAsc:     "昇順ソート",
        sortListDesc:    "降順ソート",
        copyList:        "このリストをコピー",
        mailList:        "項目一覧をメールする",
        deleteDoneTaskAll: "達成済み項目を一括削除",
        switchStyle:     "スタイルを切り替える",
        displayKeyHelp:  "ヘルプを表示する",
        terminater: null
    },
    combiList: ["b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                "Shift+a", "Shift+b", "Shift+c", "Shift+d", "Shift+e", "Shift+f", "Shift+g", "Shift+h", "Shift+i", "Shift+j", "Shift+k", "Shift+l", "Shift+m", "Shift+n", "Shift+o", "Shift+p", "Shift+q", "Shift+r", "Shift+s", "Shift+t", "Shift+u", "Shift+v", "Shift+w", "Shift+x", "Shift+y", "Shift+z",
                "scroll", "capslock", "numlock", "pause", "insert", "home", "del", "end", "pageup", "pagedown", "left", "up", "right", "down", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12",
                "Shift+scroll", "Shift+capslock", "Shift+numlock", "Shift+pause", "Shift+insert", "Shift+home", "Shift+del", "Shift+end", "Shift+pageup", "Shift+pagedown", "Shift+left", "Shift+up", "Shift+right", "Shift+down", "Shift+f1", "Shift+f2", "Shift+f3", "Shift+f4", "Shift+f5", "Shift+f6", "Shift+f7", "Shift+f8", "Shift+f9", "Shift+f10", "Shift+f11", "Shift+f12"],
    //----------------* 内部メソッド
    _create: function () {
        var self = this;
        this.sheet =
            $("<div>")
                .attr("id", "jetkey-sheet")
                .addClass("wrapper")
                .hide()
                .append("<h5>ショートカットキー一覧　<input type='button' value='初期設定に戻す'></h5>")
                .find("input")
                    .click(function () {
                        self._deleteKeyAll();
                        location.reload();
                     })
                .end()
                .append("<table>")
                .find("table")
                    .append("<tbody>")
                .end();
        var tbody = this.sheet.find("tbody");
        $.each(this.keyMap, function (index, key) {
            if (index == "terminater") {return;}
            if (key == "------------spacer------------") {
                tbody.append("<tr>")
                     .find("tr:last")
                         .append("<td class='spacer' colspan='2'></td>");
            } else if (index == "addTask") {
                tbody
                    .append("<tr>")
                    .find("tr:last")
                        .append("<th><span>" + self.label[index] + "</span></th>")
                        .append("<td><kbd class='key'>" + key + "</kbd></td>");
            } else {
                key = self._loadKey(index, key);
                key = key == "" ? "-" : key ;
                tbody
                    .append("<tr>")
                    .find("tr:last")
                        .append("<th><span>" + self.label[index] + "</span></th>")
                        .append("<td><span id='keyBind_" + index + "' class='keybindPanel'></span></td>")
                        .find(".keybindPanel")
                            .click(function () {self._transformKeyConfig(this, $("kbd", this).text());})
                            .append("<kbd class='key'>" + key + "</kbd>"
                                  + "<span class='knob'>▼</span>");
                self.keyMap[index] = key;
            }
        });
        $("<p>※キー変更は、ページ更新した後に反映されます</p>").appendTo(this.sheet);
        this.sheet.appendTo("body");
    },
    _transformKeyConfig: function (keybindPanel, key) {
        var self = this;
        var id = keybindPanel.id.replace(/^keyBind_/, "");
        var configPulldown = $("<select id='keyConfig_" + id + "' class='configPulldown'></select>");
        configPulldown
            .blur(function () {self._transformKeyBind(this, $(this).val());})
            .change(function () {self._transformKeyBind(this, $(this).val());});
        var opt = $("<option value=''>(キー選択)</option>");
        if (key == "-") {opt.attr("selected", true);}
        configPulldown.append(opt);
        $.each(this.combiList, function () {
            var combi = this;
            var opt = $("<option value='" + combi + "'>" + combi + "</option>");
            if (key == combi) {opt.attr("selected", true);}
            configPulldown.append(opt)
        });
        $(keybindPanel)
            .after(configPulldown)
            .remove();
        configPulldown.focus();
    },
    _transformKeyBind: function (configPulldown, key) {
        if (key == "(キー選択)") {key = "-";}
        var self = this;
        var id = configPulldown.id.replace(/^keyConfig_/, "");
        this._saveKey(id, key);
        var keybindPanel = 
            $("<span id='keyBind_" + id + "' class='keybindPanel'></span>")
                .click(function () {self._transformKeyConfig(this, $("kbd", this).text());})
                .append("<kbd class='key'>" + key + "</kbd>"
                      + "<span class='knob'>▼</span>");
        $(configPulldown)
            .after(keybindPanel)
            .remove();
    },
    _saveKey: function (key, value) {
        if (value == "-") {value = null;}
        this.storage.save(key, value);
    },
    _loadKey: function (key, defaultValue) {
        return this.storage.load(key, defaultValue);
    },
    _deleteKeyAll: function (key, value) {
        var self = this;
        $.each(this.keyMap, function (index, value) {
            self.storage.delete(index);
        });
    },
    //----------------* 外部メソッド
    isSheetOpening: function () {
        return this.opening;
    },
    showSheet: function () {
        this.opening = true;
        this.sheet.show();
    },
    hideSheet: function () {
        this.sheet.hide();
        this.opening = false;
    },
    switchSheet: function () {
        this.isSheetOpening() ? this.hideSheet() : this.showSheet() ;
    },
    resize: function () {
        
    },
    terminater: null
});//END OF CLASS::CheatSheet;

/**
 * - キーショートカットのヘルプウィンドウ
 */
function ProjectConsole (parameter) {
    this.console = 
        $("<div id='jetkey-console' style='display:none;'></div>")
            .appendTo("body");
};
$.extend(ProjectConsole.prototype, {
    //----------------* プロパティ
    console: null,
    opening: false,
    //----------------* 内部メソッド
    //----------------* 外部メソッド
    isOpening: function () {
        return this.opening;
    },
    open: function (top, left) {
        this.opening = true;
        this.console
            .css({
                top: top + "px",
                left: left + "px"
            })
            .slideDown("fast");
    },
    close: function () {
        this.console.slideUp("fast");
        this.clear();
        this.opening = false;
    },
    add: function (str) {
        this.console.text(this.console.text() + str);
    },
    get: function () {
        return this.console.text();
    },
    clear: function () {
        this.console.text("");
    },
    terminater: null
});//END OF CLASS::ProjectConsole;

//----------------------------------------------------------------------------//
//----------------* すぐ実行しても良い処理
//----------------------------------------------------------------------------//

//style.cssにjetkeyスタイルを追加する。
this.appendStyles = [
    {parent: "#taskMoveMask", selector: "", property: "opacity: 0 !important;"},
    {parent: ".jetkey-yellowBg", selector: "", property: "background: #DDE5FF;"},
    {parent: ".jetkey-yellowBg", selector: ".taskCommand", property: "display: inline !important;"},
    {parent: "#taskAddButton", selector: "", property: "position: relative;"},
    {parent: "#taskAddButton", selector: "#taskAddHelp", property: "position: absolute; top: -10px; right: -14px; width: 300px; border: 1px solid #BBBBBB; -moz-border-radius: 4px; border-radius: 4px; padding: 1px 1em; background: #F3FFEE; color: #667766; font-size: 75%; line-height: 1.2;"},

    {parent: "#taskCopyPopUp", selector: "", property: "display: none; position: absolute; z-index: 100; width: 300px; border:1px solid #ccc; padding: 7px; text-align: left; background-color:#fff; font-size: 12px; -webkit-box-shadow: 3px 3px 3px lightgray; -moz-box-shadow: 3px 3px 3px gray;"},
    {parent: "#taskCopyPopUp", selector: "li", property: "padding-left:20px; background:transparent url(/img/project.gif) no-repeat 1px 3px; line-height:1.7;"},
    {parent: "#taskCopyPopUp", selector: "h4", property: "font-weight:bold; text-align:center; padding:0 0 7px 0; margin-bottom:5px; border-bottom:1px dotted #ccc;"},

    //ミニコンソール。
    {parent: "#jetkey-console", selector: "", property: "position: absolute; z-index: 30000; top: 0px; left: 0px; width: 50px; height: 16px; border: 1px solid #114411; -moz-box-shadow: 3px 3px 3px #999999; padding: 1px 2px; line-height: 1; background: #336633; color: #66FF66; font-weight: bold; opacity: 0.8; -moz-border-radius: 6px; -webkit-border-radius: 6px; border-radius: 6px;"},
    //ヘルプウィンドウ。
    {parent: "#jetkey-sheet", selector: "", property: "position: fixed; top: 0px; right: 0px; width: 360px; overflow-y: auto; padding: 0 12px; background: #020; opacity: 0.9; -moz-border-radius-bottomleft: 8px; -webkit-border-bottom-left-radius: 8px; border-bottom-left-radius: 8px; display: none;"},
    {parent: "#jetkey-sheet", selector: "h5", property: "margin: 6px 0 0; color: #88CC66; font-weight: bold;"},
    {parent: "#jetkey-sheet", selector: "table", property: "width: 100%; margin: 6px auto; border-collapse: collapse; border-top: 1px dashed #999999;"},
    {parent: "#jetkey-sheet", selector: "th", property: "border-bottom: 1px dashed #999999; text-align: center; vartical-align: middle; font-size: 87%;"},
    {parent: "#jetkey-sheet", selector: "th span", property: "color: #FFFFFF; opacity: 1;"},
    {parent: "#jetkey-sheet", selector: "th span.caution", property: "color: #FFFF00;"},
    {parent: "#jetkey-sheet", selector: "td", property: "border-bottom: 1px dashed #999999; white-space: nowrap; text-align: center; vartical-align: middle;"},
    {parent: "#jetkey-sheet", selector: "td .keybindPanel", property: "cursor: pointer;"},
    {parent: "#jetkey-sheet", selector: "td .knob", property: "padding-left:8px; color: #DDEEDD; font-size: 75%;"},
    {parent: "#jetkey-sheet", selector: "td .configPulldown", property: "padding: 1px;"},
    {parent: "#jetkey-sheet", selector: "td .configPulldown", property: "font-size: 100%;"},
    {parent: "#jetkey-sheet", selector: "td.spacer", property: "height: 3px; border-bottom: 1px dashed #999999;"},
    {parent: "#jetkey-sheet", selector: "kbd", property: "font-family: Verdana, Arial, Sans-serif; font-size: 100%; font-weight: bold; color: #FFFF00; opacity: 1;"},
    {parent: "#jetkey-sheet", selector: "p", property: "text-align: center; font-size: 87%; color: #FFFFEE;"},
    //リスト表示の項目に罫線を入れる。
    {parent: "body.jetkey-border", selector: "#taskNotyetList", property: "border-top: 1px solid #EEEEEE !important;"},
    {parent: "body.jetkey-border", selector: "#taskNotyetList li", property: "border-bottom: 1px solid #EEEEEE !important;"},
    //横幅を180px拡げて一画面に表示できる内容を多くする。
    {parent: "body.jetkey-wide", selector: "#container", property: "width: 100% !important; max-width: 920px; min-width: 720px;"},
    {parent: "body.jetkey-wide", selector: "#leftside",  property: "width: 710px !important;"},
    {parent: "body.jetkey-wide", selector: ".taskBody",  property: "width: 680px !important;"},
    //ロゴと検索ボックスのスペースを圧縮。
    {parent: "body.jetkey-wide", selector: "#header", property: "position: relative; height: 0 !important;"},
    {parent: "body.jetkey-wide", selector: "#logo",   property: "float: none !important; position: absolute; top: 10px; left: 10px; width: 40px; height: 40px; clip: rect(6px,36px,36px,1px);"},
    {parent: "body.jetkey-wide", selector: "#header span",     property: "float: none !important; position: absolute; top: 10px; right: 30px;"},
    {parent: "body.jetkey-wide", selector: "#header_menu div", property: "padding-left: 60px !important;"}
];
$.each(this.appendStyles, function () {
    document.styleSheets[1].insertRule(
        this.parent + " " + this.selector + " { " + this.property + " } ",
        document.styleSheets[1].cssRules.length);
});



//==========================================================================================================//
//----------------* ドキュメントテキスト読み込み後に実行したい処理
//==========================================================================================================//



$(function () {
//////////////////////////////////////////////////////////////////////////////////// START



if (/<span>\(a\)<\/span>/.test($("#taskAddButton").html())) {return;}



//----------------------------------------------------------------------------//
//----------------* 管理オブジェクト生成
//----------------------------------------------------------------------------//

var stylist = new Stylist;
stylist.setStyleBasic();

var yets = new YetsPointer({
    available: true,
    pointerId: "jetkey-yets-pointer",
    pointerChar: "●",
    nodesSeed: "#taskNotyetList li:visible",
    nodeMinBoundSeed: "#header",
    nodeMaxBoundSeed: "#taskAddButton",
    terminater: null
});

var dones = new DonesPointer({
    available: false,
    pointerId: "jetkey-dones-pointer",
    pointerChar: "●",
    nodesSeed: "#taskDoneList li:visible:not(#taskNone)",
    nodeMinBoundSeed: "#taskAddButton",
    nodeMaxBoundSeed: "#footer",
    terminater: null
});

var helpSheet = new CheatSheet;
var miniConsole = new ProjectConsole;



//----------------------------------------------------------------------------//
//----------------* 画面書き換え
//----------------------------------------------------------------------------//

if (helpSheet.keyMap["displayKeyHelp"]) {
    var headerLinks = $("#header_menu div span");
    headerLinks.html(
        headerLinks
            .html()
            .replace(
                /ヘルプ<\/a>/, 
                "ヘルプ</a>\n｜"
              + "<a href='#' id='jetkey-sheet-show'>"
              + "ショートカットキー(" + helpSheet.keyMap["displayKeyHelp"] + ")</a>"
            )
    );
}

if (helpSheet.keyMap["sortListAsc"]) {
    $("#tasksSortAsc").text("昇順(" + helpSheet.keyMap["sortListAsc"] + ")");
}
if (helpSheet.keyMap["sortListDesc"]) {
    $("#tasksSortDesc").text("降順(" + helpSheet.keyMap["sortListDesc"] + ")");
}
if (helpSheet.keyMap["copyList"]) {
    $("#rightside li.command a").first().text("リストをコピー(" + helpSheet.keyMap["copyList"] + ")");
}
if (helpSheet.keyMap["mailList"]) {
    $("#tasksNotyetSendCmd").text("リストをメール(" + helpSheet.keyMap["mailList"] + ")");
}
if (helpSheet.keyMap["deleteDoneTaskAll"]) {
    $("#tasksDoneDelCmd").text("達成済みを一括削除(" + helpSheet.keyMap["deleteDoneTaskAll"] + ")");
}
if (helpSheet.keyMap["copyTaskThere"]) {
    $("#taskMovePopUp")
        .clone()
        .attr("id", "taskCopyPopUp")
        .css("background", "#F8FFF1")
        .find("h4")
            .html("コピー先のリストを指定"
                + " <span class='s10 linkLike blueLink' id='taskCopyPopUpClose'>[閉じる]</span>")
        .end()
        .find("li span")
            .removeClass("moveToCmd")
            .addClass("copyToCmd")
            .each(function (index, elem) {
                elem.textContent =
                    '[' + helpSheet.keyMap["copyTaskThere"] + "+" + index + '] ' + elem.textContent;
            })
        .end()
        .appendTo("body");
}
if (helpSheet.keyMap["projectConnect"]) {
    var popupLabels = $("#taskMovePopUp").find("li span");
    $("#selectJumpTo")
        .attr("size", function () {return $(this).children().length;})
        .children("[value!='']")
        .each(function (index, elem) {
            elem.textContent =
                '[' + helpSheet.keyMap["projectConnect"] + "+" + index + '] ' + elem.textContent;
            var popupLabel = popupLabels.eq(index);
            popupLabel.text('[' + helpSheet.keyMap["sendTask"] + "+" + index + '] '
                + popupLabel.text());
        });
}
$("#taskAddButton").append("<span>(a)</span>");
if (stylist.isViewableTaskAddHelp()) {
    $("#taskAddButton")
        .append("<p id='taskAddHelp'>未達成リストの最下段で、"
              + helpSheet.keyMap["pointerDown1"] + " を素早く２度押すと、"
              + "ポインターが達成済リストへ移動します。<br />"
              + "逆に、達成済リストの最上段で "
              + helpSheet.keyMap["pointerUp1"] + " を素早く２度押すと、"
              + "未達成リストに移動します。</p>")
        .find("#taskAddHelp")
            .click(function () {$(this).fadeOut();});
}
stylist.countViewTaskAddHelp();



//----------------------------------------------------------------------------//
//----------------* イベント書き換え
//----------------------------------------------------------------------------//

$("#taskNotyetList > li").live("mouseover", function () {
    $(this).addClass("yellowBg");
    $(".taskCommand", $(this)).show();
});

$("#taskNotyetList > li").live("mouseout", function () {
    $(this).removeClass("yellowBg");
    $(".taskCommand", $(this)).hide();
});

$("#taskDoneList > li[id!='taskNone']").live("mouseover", function () {
    $(this).addClass("yellowBg");
    $(".taskCommand", $(this)).show();
});

$("#taskDoneList > li[id!='taskNone']").live("mouseout", function () {
    $(this).removeClass("yellowBg");
    $(".taskCommand", $(this)).hide();
});

//タスクチェックの挙動。オリジナルを上書き。
//適当な箇所にreloadを埋め込むため。
$(".taskNotyetCheckCmd")
    .die("click")
    .live("click", function() {
        $.post(
            "/_ajax_tasks_check.php",
            {id: this.parentNode.parentNode.id.replace("task_", "")},
            function (rs) {
                $("#task_" + rs.id).fadeOut(250, function () {
                    var task = $(this);
                    task.remove();
                    yets.reload();
                    //if (task.length) {return false;}//？？？
                    $("#taskDoneCount").text(rs.count_done);
                    $("#taskNone").find(":visible").hide();
                    if (rs.count_notyet == 0) {
                        $("<div></div>")
                            .attr("id", "alertBox")
                            .addClass("msg_ok")
                            .text("すべての項目が達成されました！")
                            .prependTo("#leftside")
                            .slideDown(1000)
                            .delay(2000)
                            .fadeOut();
                    }
                    $("#taskDoneList").prepend(SF.makeDoneTaskDom(rs));
                    if (!yets.isAvailable() && dones.hasNodes()) {dones.setAvailable();}
                });
            },
            "json"
        );
    });

//タスク削除の挙動。オリジナルを上書き。
//適当な箇所にreloadを埋め込むため。
$(".taskNotyetDelCmd")
    .die("click")
    .live("click", function() {
        if (confirm("この項目を削除しても良いですか？")) { 
            $.post(
                "/_ajax_tasks_delete.php",
                {id: this.parentNode.parentNode.parentNode.id.replace("task_", "")},
                function (rs) {
                    var task = $("#task_" + rs);
                    task.fadeOut(300, function () {
                        task.remove();
                        yets.reload();
                        if (!yets.isAvailable() && dones.hasNodes()) {dones.setAvailable();}
                        $("html").focus();
                    });
                }
            );
            return false;
        }
    });

//タスク送り完了の挙動。オリジナルを上書き。
//適当な箇所にreloadを埋め込むため。
$("#taskMoveMask, #taskMovePopUpClose, #taskCopyPopUpClose")
    .die("click")
    .click(function () {
        var taskId =
            $("#taskMoveMask")
                .hide()
                .data("currentTaskId");
        $("#taskMovePopUp, #taskCopyPopUp").fadeOut(300);
        yets.reload();
        $("#task_" + taskId)
            .removeClass("yellowBg")
            .find(".taskCommand")
                .hide()
            .end();
    });

$(".taskMoveCmd")
    .die("click")
    .live("dblclick", function (evt) {
        $("#taskMovePopUp").hide();
        var mask =
            $("#taskMoveMask")
                .css({width: LOCAL_DOC.width(), height: LOCAL_DOC.height()})
                .show();
        var offset    = $(this).offset();
        var taskId    = this.parentNode.parentNode.parentNode.id.replace("task_", "");
        var taskValue = $("#task_" + taskId + "_orig").text();
        $("#task_" + taskId).unbind("mouseenter mouseleave");
        mask.data("currentTaskId", taskId)
            .data("currentTaskValue", taskValue)
        var popup = 
            $("#taskCopyPopUp")
                .css({
                    "top":  offset.top + 16 + "px",
                    "left": offset.left + "px"
                })
                .slideDown(250);
        yets.cameraman.fadeIn(popup);
    })
    .live("click", function (evt) {
        var self = $(this);
        var mask = $("#taskMoveMask");
        var offset = self.offset();
        var taskId = self.parent().parent().parent().attr("id").replace("task_", "");
        $("#task_" + taskId).unbind("mouseenter mouseleave");
        mask.data("currentTaskId", taskId)
        var popup = 
            $("#taskMovePopUp")
                .css({
                    "top":  offset.top + 16 + "px",
                    "left": offset.left + "px"
                })
                .fadeIn(250);
        yets.cameraman.fadeIn(popup);
        setTimeout(function () {
            if ($("#taskMovePopUp").is(":hidden")) {return;}
            $("#taskMoveMask")
                .css({width: LOCAL_DOC.width(), height: LOCAL_DOC.height()})
                .show();
        }, 600);
    });

$(".moveToCmd")
    .die("click")
    .click(function() {
        var sendTo = $(this).parent();
        var projectId = sendTo.attr("id").replace("toProject_", "");
        var taskId = $("#taskMoveMask").data("currentTaskId");
        sendTo.addClass("yellowBg");
        $.post(
            "/_ajax_tasks_move.php",
            {task_id: taskId, to_project_id: projectId},
            function (rs) {
                $("#task_" + taskId).fadeOut(300, function () { 
                    $(this).remove();
                    $("#taskMovePopUpClose").click();
                    sendTo.removeClass("yellowBg");
                    yets.reload();
                    if (!yets.isAvailable() && dones.hasNodes()) {dones.setAvailable();}
                });
            }
        );
        return false;
    });

$(".copyToCmd")
    .click(function() {
        var copyTo = $(this).parent();
        var projectId = copyTo.attr("id").replace("toProject_", "");
        var taskValue = $("#taskMoveMask").data("currentTaskValue");
        copyTo.addClass("yellowBg");
        if (taskValue == "") {return false;}
        $.post(
            "/_ajax_tasks_add.php",
            {data: taskValue, project_id: projectId},
            function (rs) {
                $("#taskCopyPopUpClose").click();
                copyTo.removeClass("yellowBg");
                yets.light();
                yets.powerReload();
            },
            "json"
        );
        return false;
    });

//sortListAscの挙動。オリジナルを上書き。
//適当な箇所にreloadを埋め込むため。
$("#tasksSortAsc")
    .unbind("click")
    .click(function () {
        if (confirm("未達成の項目を昇順に並び替えます。よろしいですか？")) {
            $.post(
                "/_ajax_tasks_sort_all.php?option=asc",
                {project_id: PROJECT_ID, count_projects: 12},
                function (rs) {
                    $("#taskNotyetList")
                        .effect("highlight", 800)
                        .html(rs);
                    yets.reload();
                    $("html").focus();
                }
            );
        }
    });

//sortListDescの挙動。オリジナルを上書き。
//適当な箇所にreloadを埋め込むため。
$("#tasksSortDesc")
    .unbind("click")
    .click(function () {
        if (confirm("未達成の項目を降順に並び替えます。よろしいですか？")) {
            $.post(
                "/_ajax_tasks_sort_all.php?option=desc",
                {project_id: PROJECT_ID, count_projects: 12},
                function (rs) {
                    $("#taskNotyetList")
                        .effect("highlight", 800)
                        .html(rs);
                    yets.reload();
                    $("html").focus();
                }
            );
        }
    });

//達成済み項目の一括削除の挙動。オリジナルを上書き。
//適当な箇所にreloadを埋め込むため。
$("#tasksDoneDelCmd")
    .unbind("click")
    .click(function () {
        if (confirm("【注意】\n達成済みの項目を一括削除して良いですか？\nこの操作は取り消せません！")) {
            $.post(
                "/_ajax_tasks_done_delete.php",
                {project_id: PROJECT_ID},
                function (rs) {
                    $("#taskDoneList")
                        .children("li")
                        .fadeOut(300, function () {
                            $("#taskDoneCount").data("count", 0).text("0");
                            $("#taskNone").show();
                        });
                    if (yets.isAvailable()) {
                        yets.reload();
                    } else {
                        dones.removeAvailable();
                        yets.setAvailable();
                        yets.cameraman.fadeIn(yets.nodes.eq(yets.current));
                    }
                    $("html").focus();
                }
            );
        }
    });

//タスク新規追加の挙動。オリジナルを上書き。
//オリジナルのtaskAddSave関数も処理を埋め込んで回避。
//適当な箇所にreloadやpointerDownEdgeを埋め込むため。
$("#taskAddCmd")
    .die("click")
    .live("click", function () {
        $("#taskAddButton").data("revert", $("#taskAddButton").html());
        $("#taskAddButton").html(
              '<form id="taskAddForm" style="display:inline;">'
            + '<input id="taskAddValue" type="text" style="width:300px" value="" class="focus">'
            + '<input type="submit" value="追加" class="s12">'
            + '</form>'
            + '<span id="taskAddCancel" class="linkLike blueLink s10">[キャンセル(esc)]</span>'
        );
        var addValue = $("#taskAddValue");
        setTimeout(function () {
            addValue.focus();
        }, 100);
        $("#taskAddForm").submit(function () {
            var value = addValue.val();
            if (value == "") {return false;}
            $.post(
                "/_ajax_tasks_add.php",
                {data: value, project_id: PROJECT_ID},
                function (rs) {
                    $("#taskNotyetList").append(SF.makeYetTaskDom(rs));
                    yets.reload();
                    yets.pointerDownEdge();
                    addValue.val("").focus();
                },
                "json"
            );
            return false;
        });
    });

$("#taskAddCancel").live("click", function () {
    $("#taskAddButton").html($("#taskAddButton").data("revert"));
});

$(".taskDoneCheckCmd")
    .die("click")
    .live("click", function () {
        var elm = $(this).parent().parent(); // #task_xxx
        var id = elm.attr("id").replace("task_", "");
        $.post(
            "/_ajax_tasks_check.php",
            {id: id},
            function (rs) {
                $("#task_" + rs.id).fadeOut(250, function () {
                    $(this).remove();
                    if ($("#task_" + rs.id).length) {
                        if (dones.hasNodes()) {
                            dones.reload();
                        } else {
                            dones.removeAvailable();
                            yets.setAvailable();
                            yets.cameraman.fadeIn(yets.nodes.eq(yets.current));
                        }
                        return false;
                    }
                    $("#taskDoneCount").text(rs.count_done);
                    if (rs.count_done <= 0) {$("#taskNone").show();}
                    $("#taskNotyetList").append(SF.makeYetTaskDom(rs));
                    if (dones.hasNodes()) {
                        dones.reload();
                    } else {
                        dones.removeAvailable();
                        yets.setAvailable();
                        yets.cameraman.fadeIn(yets.nodes.eq(yets.current));
                    }
                });
            },
            "json"
        );
    });

$(".taskDoneDelCmd")
    .die("click")
    .live("click", function() {
        var id = $(this).parent().parent().parent().attr("id").replace("task_", "");
        if (confirm("この項目を削除しても良いですか？")) { 
            $.post(
                "/_ajax_tasks_delete.php",
                {id: id},
                function (rs) {
                    $("#task_" + rs).fadeOut(300, function () {
                        if (dones.hasNodes()) {
                            dones.reload();
                        } else {
                            dones.removeAvailable();
                            yets.setAvailable();
                            yets.cameraman.fadeIn(yets.nodes.eq(yets.current));
                        }
                        var countDone = $("#taskDoneCount").data('count') - 1;
                        $("#taskDoneCount").data('count',countDone).text(countDone);
                        if (countDone <= 0) {$("#taskNone").show();}
                    });
                    $("html").focus();
                }
            );
            return false;
        }
    });

//----------------------------------------------------------------------------//
//----------------* イベント・オリジナル
//----------------------------------------------------------------------------//

LOCAL_DOC.resize(function () {
    yets.reload();
});

$("#taskNotyetList > li:visible")
    .live("click", function () {
        if (dones.isAvailable()) {dones.removeAvailable();}
        if (!yets.isAvailable()) {yets.setAvailable();}
        yets.unselectNode();
        yets.point(this);
        yets.selectNode();
    });

$("#taskDoneList > li:visible:not(#taskNone)")
    .live("click", function () {
        if (yets.isAvailable()) {yets.removeAvailable();}
        if (!dones.isAvailable()) {dones.setAvailable();}
        dones.unselectNode();
        dones.point(this);
        dones.selectNode();
    });

//----------------------------------------------------------------------------//
//----------------* イベント・キーバインド
//----------------------------------------------------------------------------//

$.each(helpSheet.keyMap, function (label, key) {
    if (key == "-") {return;}
    var keyParameter = {combi: key, disableInInput: true};
    switch (label) {
        case "projectConnect":
            LOCAL_DOC.bind("keydown", keyParameter, function (evt) {
                if (SF.isDoneEvent(evt)) {return;};
                if (yets.isDragging()) {return;}
                if (miniConsole.isOpening()) {return;}
                var targetOffset = $("#selectJumpTo").offset();
                yets.cameraman.fadeIn($("#selectJumpTo"));
                miniConsole.open(targetOffset.top + 16, targetOffset.left - 30);
                return false;
            });
            LOCAL_DOC.bind("keyup", key, function (evt) {
                if (SF.isDoneEvent(evt)) {return;};
                if (yets.isDragging()) {return;}
                if (!miniConsole.isOpening()) {return;}
                var projectPosition = miniConsole.get();
                miniConsole.close();
                if (projectPosition == "") {return;}
                var projectId =
                    $("#selectJumpTo")
                        .children("[value!='']")
                        .eq(projectPosition)
                        .attr("selected", true)
                        .attr("value");
                if (projectId) {
                    document.location = "/projects/view/" + projectId;
                }
                return false;
            });
            //数字キーのセッティング。タスク送信と共用。
            $.each(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], function (index, key) {
                LOCAL_DOC.bind("keydown", {combi: key, disableInInput: true}, function (evt) {
                    if (SF.isDoneEvent(evt)) {return;};
                    if (yets.isDragging()) {return;}
                    if (!miniConsole.isOpening()) {return;}
                    miniConsole.add(key);
                    return false;
                });
            });
            return;
        case "prevProject":
            var closure = function () {
                var projectId =
                    $("#selectJumpTo")
                        .children("[value='" + PROJECT_ID + "']")
                        .prev()
                        .attr("selected", true)
                        .attr("value");
                if (projectId) {
                    document.location = "/projects/view/" + projectId;
                }
            };
            break;
        case "nextProject":
            var closure = function () {
                var projectId =
                    $("#selectJumpTo")
                        .children("[value='" + PROJECT_ID + "']")
                        .next()
                        .attr("selected", true)
                        .attr("value");
                if (projectId) {
                    document.location = "/projects/view/" + projectId;
                }
            };
            break;
        case "pointerDown1":
            var funcName = "pointerDown1"; break;
        case "pointerUp1":
            var funcName = "pointerUp1"; break;
        case "pointerDown3":
            var funcName = "pointerDown3"; break;
        case "pointerUp3":
            var funcName = "pointerUp3"; break;
        case "pointerDown5":
            var funcName = "pointerDown5"; break;
        case "pointerUp5":
            var funcName = "pointerUp5"; break;
        case "pointerDownEdge":
            var funcName = "pointerDownEdge"; break;
        case "pointerUpEdge":
            var funcName = "pointerUpEdge"; break;
        case "checkTask":
            var funcName = "check"; break;
        case "editTask":
            var funcName = "startEdit"; break;
        case "deleteTask":
            var funcName = "delete"; break;
        case "sendTask":
            LOCAL_DOC.bind("keydown", keyParameter, function (evt) {
                if (SF.isDoneEvent(evt)) {return;};
                if (yets.isDragging()) {return;}
                if (miniConsole.isOpening()) {return;}
                yets.showMovePopup();
                var targetOffset = $("#taskMovePopUp").offset();
                miniConsole.open(targetOffset.top + 16, targetOffset.left - 30);
                return false;
            });
            LOCAL_DOC.bind("keyup", key, function (evt) {
                if (SF.isDoneEvent(evt)) {return;};
                if (yets.isDragging()) {return;}
                if (!miniConsole.isOpening()) {return;}
                var projectPosition = miniConsole.get();
                miniConsole.close();
                if (projectPosition != "") {
                    $("#taskMovePopUp")
                        .find("li")
                        .eq(projectPosition)
                        .children()
                        .click();
                }
                yets.hideMovePopup();
                return false;
            });
            return;
        case "dragTask":
            LOCAL_DOC.bind('keydown', keyParameter, function (evt) {
                if (SF.isDoneEvent(evt)) {return;};
                if (yets.isPoppingUp()) {return;}
                if (yets.isDragging()) {return;}
                yets.dragStart();
                return false;
            });
            LOCAL_DOC.bind('keyup', keyParameter, function (evt) {
                if (SF.isDoneEvent(evt)) {return;};
                if (yets.isPoppingUp()) {return;}
                yets.dragEnd();
                return false;
            });
            return;
        case "throwTaskDown":
            var funcName = "throwDown"; break;
        case "throwTaskUp":
            var funcName = "throwUp"; break;
        case "addTask":
            var closure = function () {setTimeout(function () {$("#taskAddCmd").click();}, 10);}; break;
        case "addTaskHere":
            var funcName = "addTaskHere"; break;
        case "copyTask":
            var funcName = "copyTask"; break;
        case "copyTaskThere":
            LOCAL_DOC.bind("keydown", keyParameter, function (evt) {
                if (SF.isDoneEvent(evt)) {return;};
                if (yets.isDragging()) {return;}
                if (miniConsole.isOpening()) {return;}
                yets.showCopyPopup();
                var targetOffset = $("#taskCopyPopUp").offset();
                miniConsole.open(targetOffset.top + 16, targetOffset.left - 30);
                return false;
            });
            LOCAL_DOC.bind("keyup", key, function (evt) {
                if (SF.isDoneEvent(evt)) {return;};
                if (yets.isDragging()) {return;}
                if (!miniConsole.isOpening()) {return;}
                var projectPosition = miniConsole.get();
                miniConsole.close();
                if (projectPosition != "") {
                    $("#taskCopyPopUp")
                        .find("li")
                        .eq(projectPosition)
                        .children()
                        .click();
                }
                yets.hideCopyPopup();
                return false;
            });
            return;
        case "openLink":
            var funcName = "openLink"; break;
        case "reloadList":
            var funcName = "powerReload"; break;
        case "sortListAsc":
            var closure = function () {$("#tasksSortAsc").click();}; break;
        case "sortListDesc":
            var closure = function () {$("#tasksSortDesc").click();}; break;
        case "copyList":
            var closure = function () {location.href = $("#rightside li.command a").first().attr("href");}; break;
        case "mailList":
            var closure = function () {$("#tasksNotyetSendCmd").click();}; break;
        case "deleteDoneTaskAll":
            var closure = function () {$("#tasksDoneDelCmd").click();}; break;
        case "switchStyle":
            var closure = function () {stylist.switchStyle(); yets.point();}; break;
        case "displayKeyHelp":
            LOCAL_DOC.bind('keydown', keyParameter, function (evt) {
                if (SF.isDoneEvent(evt)) {return;};
                helpSheet.switchSheet();
                return false;
            });
            return;
        default:
            return;//→ラベル登録がない処理は、何もバインドしない。
    }//endswitch;
    if (/^pointer/.test(funcName)) {//ポインター移動系のキーイベント。
        LOCAL_DOC.bind('keydown', keyParameter, function (evt) {
            if (SF.isDoneEvent(evt)) {return;};
            if (yets.isPoppingUp()) {return;}
            yets[funcName]();
            dones[funcName]();
            return false;
        });
    } else if (closure) {//クロージャがあるときのキーイベント。
        LOCAL_DOC.bind('keydown', keyParameter, function (evt) {
            if (SF.isDoneEvent(evt)) {return;};
            if (yets.isPoppingUp()) {return;}
            if (yets.isDragging()) {return;}
            closure();
            return false;
        });
    } else if (/^(check|delete|openLink|powerReload)$/.test(funcName)) {//チェック・削除・リンク開くの場合。
        LOCAL_DOC.bind('keydown', keyParameter, function (evt) {
            if (SF.isDoneEvent(evt)) {return;};
            if (yets.isPoppingUp()) {return;}
            if (yets.isDragging()) {return;}
            yets[funcName]();
            dones[funcName]();
            return false;
        });
    } else {//通常のキーイベント。
        LOCAL_DOC.bind('keydown', keyParameter, function (evt) {
            if (SF.isDoneEvent(evt)) {return;};
            if (yets.isPoppingUp()) {return;}
            if (yets.isDragging()) {return;}
            yets[funcName]();
            return false;
        });
    }
});

LOCAL_DOC.bind('keydown', 'esc', function (evt) {
    if (SF.isDoneEvent(evt)) {return;};
    if (yets.isDragging()) {return;}
    yets.cancelEdit();
    $("#taskAddCancel").click();
    yets.cancelAddTaskHere();
    yets.hideMovePopup();
    return false;
});

//達成済みリスト→未達成リストの切り替え。
LOCAL_DOC.bind('keyup', {combi: helpSheet.keyMap["pointerUp1"], disableInInput: true}, function (evt) {
    if (SF.isDoneEvent(evt)) {return;};
    if (dones.isAvailable() && dones.isDblKeyUpTop()) {
        if (yets.hasNodes()) {
            dones.removeAvailable();
            yets.setAvailable();
            yets.cameraman.fadeIn(yets.nodes.eq(yets.current));
            $("#taskAddHelp").fadeOut();
        }
    }
    return false;
});

//未達成リスト→達成済みリストの切り替え。
LOCAL_DOC.bind('keyup', {combi: helpSheet.keyMap["pointerDown1"], disableInInput: true}, function (evt) {
    if (SF.isDoneEvent(evt)) {return;};
    if (yets.isPoppingUp()) {return;}
    if (yets.isAvailable() && yets.isDblKeyUpBottom()) {
        if (dones.hasNodes()) {
            yets.removeAvailable();
            dones.setAvailable();
            dones.cameraman.fadeIn(dones.nodes.eq(dones.current));
            $("#taskAddHelp").fadeOut();
        }
    }
    return false;
});


$("#jetkey-sheet-show").bind('click', function (evt) {
    helpSheet.switchSheet();
    return false;
});

//----------------------------------------------------------------------------//
//----------------* 速度測定
//----------------------------------------------------------------------------//

if (speedTestStart != undefined) {
    var speedTestEnd = (new Date).getTime();
    console.log("speedTestEnd", speedTestEnd);
    console.log("Waste", speedTestEnd - speedTestStart);
}

//////////////////////////////////////////////////////////////////////////////////// END
});



