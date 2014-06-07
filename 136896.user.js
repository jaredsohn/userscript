// ==UserScript==
// @name       wod item sorter
// @namespace  org.holer.webgame.util.wod
// @version    0.1.7
// @description  auto sort items in inventory
// @match      http://*.world-of-dungeons.org/wod/spiel/hero/items.php*
// @downloadURL http://userscripts.org/scripts/source/136896.user.js
// @updateURL http://userscripts.org/scripts/source/136896.user.js
// @grant        none
// @copyright  2012+, Russell
// ==/UserScript==

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
script.setAttribute("src","http://code.jquery.com/jquery-1.7.1.min.js");
var sie = document.body || document.head || document.documentElement;
//sie.appendChild(script);

script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
sie.appendChild(script);

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

    window.selectHtml = '<select><option value="NUL"></option><option value="go_lager">仓库</option><option value="go_group_2">团体仓库</option><option value="go_group">宝库</option><option value="go_keller">贮藏室</option><option value="npc">NPC</option></select>';
    window.liHtml = '<li><input/>'+selectHtml+'<button onclick="addRule(this)" class="button">'+wisMsg.append+'</button><button onclick="addException(this)" class="button">'+wisMsg.exception+'</button><button onclick="deleteRule(this)" class="button">'+wisMsg.deleteStr+'</button></li>';
    window.olHtml = '<ol>'+liHtml+'</ol>';
    window.bsHtml = '<button onclick="wisGenerateRuleJsonI()" class="button">'+wisMsg.generateRule+'</button><button onclick="wisSaveRule()" class="button">'+wisMsg.saveRule+'</button><button onclick="wisLoadRule()" class="button">'+wisMsg.loadRule+'</button><br>';
    window.taHtml = '<textarea id="wiscj" style="width:100%;height:5em;"></textarea>';
    window.uiHtml = '<hr><div id="wisc" class="gadget_body">'+olHtml+bsHtml+taHtml+'</div>';
    window.btnsHtml = '<div><button id="wisawrb" onclick="applyWisRule()" class="button">'+wisMsg.applySortRule+'</button><input id="wisar" type="checkbox" onclick="setAutoSort()"><label for="wisar">'+wisMsg.autoSort+'</label></div>';
    window.eolHtml = '<ol></ol>';

    window.sortAllHtml = '<button class="button" onclick="moveAll(this)" type="button" id="moveAllButton" >move</button><span> all to </span>' + selectHtml ;

    window.counts = {
        go_lager : 0,
        go_group_2 : 0,
        go_group : 0,
        go_keller : 0,
        npc : 0
    };

    window.addRule = function (bu) {
        var li = $(bu).parent();
        li.after(liHtml);
    }

    window.addException = function (bu) {
        var li = $(bu).parent();
        var ol = li.children("ol");
        if (ol.length) {
            ol.append(liHtml);
        } else{
            li.append(olHtml);
        }
    }

    window.deleteRule = function (bu) {
        var li = $(bu).parent();
        li.remove();
    }

    window.wisGenerateRuleJsonI = function () {
        var raw = wisGenerateRuleJson($("#wisc>ol"));
        var configJson = "{\"rules\":".concat(raw).concat("}");
        $("#wiscj").val(configJson);
    }

    window.wisGenerateRuleJson = function (jol) {
        var configJsonString = "[";
        var offset = jol.children("li").length - 1;
        jol.children("li").each(function(index, element) {
            var l = $(this);
            configJsonString = configJsonString.concat("{\"n\":\"");
            configJsonString = configJsonString.concat(l.children("input").val());
            configJsonString = configJsonString.concat("\",\"o\":\"");
            configJsonString = configJsonString.concat(l.children("select").val());
            configJsonString = configJsonString.concat("\"");
            var childOl = l.children("ol");
            if (0!=childOl.length && 0!=childOl.children("li").length) {
                configJsonString = configJsonString.concat(",\"e\":");
                configJsonString = configJsonString.concat(wisGenerateRuleJson(childOl));
            }
            configJsonString = configJsonString.concat("}");
            if (index != offset) {
                configJsonString = configJsonString.concat(",");
            }

        });
        return configJsonString.concat("]");
    }

    window.wisSaveRule = function () {
        var rule = $("#wiscj").val();
        setSetting("wiscj",rule);
        ruleObj = null;
    }

    window.setSetting = function (key,value) {
        localStorage.setItem(key,value);
    }

    window.wisLoadRule = function () {
        var rule = getSetting("wiscj");
        if (rule) {
            $("#wiscj").val(unescape(rule));
            ruleObj = rule;
            strToRegexI();
            $("#wisc > ol > li").remove();
            var olRoot = $("#wisc > ol");
            jsonToGui(ruleObj.rules,olRoot);
        }
    }

    window.jsonToGui = function (rules,htmlElement) {
        var c;
        for(i in rules){
            c = rules[i];
            var nl = $(liHtml);
            nl.children("input").val(c.n);
            nl.children("select").val(c.o);
            if (c.e) {
                var eRoot = $(eolHtml);
                nl.append(eRoot);
                jsonToGui(c.e,eRoot);
            }
            htmlElement.append(nl);
        }
    }

    window.getSetting = function (name) {
        return localStorage.getItem(name);
    }

    window.ruleObj = null;

    window.applyWisRule = function () {
        if (!ruleObj)
            ruleObj = getSetting("wiscj");
        if (!ruleObj)
            return;
        strToRegexI();
        resetCount();
        $("div.layout_clear > table.content_table > tbody > tr").each(function () {
            var t = $(this);
            var o = getOperation(t.children("td").eq(1).children("a").text(), ruleObj.rules);
            if (o) {
                applyOperation(t,o);
            }
        });
        $("#main_content form input[type='submit']:eq(0)").focus().after(" 宝库 "+counts.go_group+" 团体仓库 "+counts.go_group_2+" NPC "+counts.npc);
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
            s = t.children().eq(3).children("input:checkbox");
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

    window.strToRegexI = function () {
        ruleObj = jQuery.parseJSON(ruleObj);
        if (ruleObj.regex) return;
        strToRegex(ruleObj.rules);
        ruleObj.regex = true;
    }

    window.strToRegex = function (l){
        var c;
        for(i in l){
            c = l[i];
            c.r = new RegExp(c.n);
            if (c.e) {
                strToRegex(c.e);
            }
        }
    }

    window.getOperation = function (name, list){
        var c;
        for(i in list){
            c = list[i];
            if (c.r.test(name)) {
                var o;
                if (c.e) {
                    o = getOperation(name, c.e);
                }
                return o?o:c.o;
            }
        }
    }

    window.setAutoSort = function (){
        setSetting("wisas",0 != $("#wisar:checked").length);
    }

    window.autoSort = function (){
        var c = getSetting("wisas");
        if(c && "true"==c) {
            $("#wisar").attr("checked", true);
            $("#wisawrb").click();
        }
    }

    window.injectUi = function (){
        $("div#main_content").after(uiHtml);
        $("div#main_content").after(btnsHtml);
        $("div#main_content div.gadget_body form div.layout_clear table.content_table thead tr.row0 td.paginator_row span.texttoken input:last").after(sortAllHtml);
        if (!window.localStorage) {
            $("#wiscj").val(wisMsg.noLocalStorageSupport);
        }

        var d = getSetting("defaultDestination");
        if (d) {
            $("#moveAllButton").next().next().val(d);
        }
    }

    window.moveAll = function (t){
        var dest = $(t).next().next().val();
        setSetting("defaultDestination", dest);

        $("div.layout_clear > table.content_table > tbody > tr").each(function () {
            var t = $(this);
            var s = t.children().eq(2).children("select");
            s.val(dest);

        });

        $("#main_content form input[type='submit']:eq(0)").click();
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

    window.addEventListener("load",autoSort,false);

    window.addEventListener("load", rowOnMouseColor,false);

    window.addEventListener("load", hoverToggleSelect,false);
}