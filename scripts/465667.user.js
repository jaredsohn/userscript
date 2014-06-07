// ==UserScript==
// @name       wod item sorter
// @namespace  org.holer.webgame.util.wod
// @version    0.1.7
// @description  auto sort items in inventory
// @include      http://*.world-of-dungeons.org/wod/spiel/hero/items.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @grant        none
// @copyright  2012+, Russell
// ==/UserScript==


function main() {
    window.wisMsgg = {
        applySortRule: "apply sort rules",
        autoSort: "auto sort",
        append: "append",
        exception: "exception",
        deleteStr: "delete",
        generateRule: "generate rule",
        saveRule: "save rule",
        loadRule: "load rule",
        noLocalStorageSupport: "browser do not support localStorage, can't save settings"
    };

    window.wisMsg = {
        applySortRule: "整理",
        autoSort: "自动整理",
        append: "增加规则",
        exception: "增加子规则",
        deleteStr: "删除",
        generateRule: "生成规则",
        saveRule: "保存规则",
        loadRule: "加载已保存的规则",
        noLocalStorageSupport: "浏览器不支持localStorage，无法保存设置。"
    };


    window.statsHtml = '<div class=item_sort_stats></div>';
    window.taHtml = '<textarea id="wiscj" style="width:100%;height:5em;"></textarea>';
    window.uiHtml = '<hr><div id="wisc" class="gadget_body">'+taHtml+'</div>';
    window.btnsHtml = '<div><button id="wisawrb" onclick="applyWisRule()" class="button">'+wisMsg.applySortRule+'</button></div>';
    window.eolHtml = '<ol></ol>';



    window.counts = {
        go_lager : 0,
        go_group_2 : 0,
        go_group : 0,
        go_keller : 0,
        npc : 0
    };


    window.out_alias = {
        "仓库":"go_lager",
        "go_lager":"go_lager",
        "贮藏室":"go_keller",
        "go_keller":"go_keller",
        "团队仓库":"go_group_2",
        "go_group_2":"go_group_2",
        "宝库":"go_group",
        "go_group":"go_group",
        "npc":"npc",
    };


    window.ruleObj = null;

    window.strToRegexI = function () {
        ruleObj = jQuery.parseJSON(ruleObj);
        if (ruleObj.regex) return;
        strToRegex(ruleObj.rules);
        ruleObj.regex = true;
    }


    RegExp.escape = function(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }

    // add r:regular exp pair to the dictionary l
    window.strToRegex = function (l){
        for (var i =0; i<l.length;i++){
            //var c;
            //c = l[i];
            // 1 :
            // 2 : uses left
            // 3 : 
            l[i].r = new RegExp("^\n*?"+RegExp.escape(l[i].n) +"!?\n*? *?\n*? *?(\\(([\\d]+)\\/([\\d]+)\\))?\n*?$");
        }
    }

    // convert textarea (in JSON) into dictionary
    // and add regular expression obj
    window.wisLoadRule = function () {
        var rule = $("#wiscj").val();

        ruleObj = rule;
        strToRegexI();
    }

    window.getOperation = function (name, list){
        var c;
        for(var i=0;i<list.length;i++){
            c = list[i];
            var c_out = out_alias[c.o];
            //if (c.r.test(name)) {
                //return c.o;
            //}
            var result = c.r.exec(name);
            if (result != null){
                if (c.geq && result[2] && Number(result[2])>=Number(c.geq)){
                    return c_out;
                } else if (c.leq && result[2] && Number(result[2])<=Number(c.leq)){
                    return c_out;
                } else if (!c.geq && !c.leq){
                    return c_out;
                };
            }
        }
    }

    window.applyWisRule = function () {
        
        wisLoadRule();
        resetCount();
        $("div.layout_clear > table.content_table > tbody > tr").each(function () {
            var t = $(this);
            // o = where the item should go if rule matches
            //console.log('wod sort item: '+t.children("td").eq(1).children("a").text());
            //var o = getOperation(t.children("td").eq(1).children("a").text(), ruleObj.rules);
            //console.log('465667 '+t.children("td").eq(1).text());
            var o = getOperation(t.children("td").eq(1).text(), ruleObj.rules);
            if (o) {
                applyOperation(t,o);
            }
        });
        $("div.item_sort_stats").focus().text(" 仓库" + counts.go_lager + " 贮藏室" +counts.go_keller+ " 宝库 "+counts.go_group+" 团队仓库"+counts.go_group_2+" NPC "+counts.npc);
    }

    window.resetCount = function () {
        counts.go_lager = 0;
        counts.go_group_2 = 0;
        counts.go_group = 0;
        counts.go_keller = 0;
        counts.npc = 0;
    }

    window.applyOperation = function(t,o){
        var s;
        if ("NUL" == o) {
            return;
        }
        var c;
        if ("npc"==o) {
            //s = t.children().eq(3).children("input:checkbox");
            s = t.children("td").has("img[title='金币']").eq(0).children("input:checkbox");
            s.attr('checked', true);
            c = "rgba(255,34,34,0.9)";
            s.parent().css("color",c);
            t.children().eq(1).children("a").css("background-color",c);
            counts.npc += 1;
        } else {
            s = t.children().eq(2).children("select");
            if ("-"+o != s.val()) {
                s.val(o);
                c = "rgba(127,127,127,0.5)";
                s.css("border-color",c);
                t.children().eq(1).children("a").css("background-color",c);
                counts[o] += 1;
            }
        }
    }


    window.injectUi = function (){
        $("div#main_content").after(uiHtml);
        $("div#main_content").after(btnsHtml);
        //$("#main_content form input[type='submit']:eq(0)").after(statsHtml);
        $("#wisawrb:eq(0)").after(statsHtml);
    }



    window.rowOnMouseColor  = function () {
        $("div.layout_clear table.content_table tbody tr").each(function () {
            $(this).addClass("tr_mouse");
        });
        $("div.gadget_body form table.content_table tbody tr").each(function () {
            $(this).addClass("tr_mouse");
        });
    }

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function hoverToggleSelect () {
        $("table.content_table tbody tr td input[value=do]").mouseover(function () {
            $(this).prop("checked",!$(this).is(":checked"));
        });
    }

    addGlobalStyle('.tr_mouse:hover { background-color:rgba(248,248,23,0.5); }');

    window.addEventListener("load",injectUi,false);

    //window.addEventListener("load",autoSort,false);

    window.addEventListener("load", rowOnMouseColor,false);

    //window.addEventListener("load", hoverToggleSelect,false);
};


$(document).ready(main);
