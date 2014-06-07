// ==UserScript==
// @name            Better Jwbinfosys
// @namespace       hsys (http://blog.flyingdream.net.cn)
// @description     Bug fixes and some improvements.
// @include         http://jwbinfosys.zju.edu.cn/*
// @include         http://10.10.10.31/*
// @include         http://10.10.10.32/*
// @include         http://10.10.10.33/*
// @include         http://10.10.10.34/*
// @require         jquery.js
// ==/UserScript==

/***************************************************************************
 *   Copyright (C) 2008 by hsys                                            *
 *   hanshuiys@gmail.com                                                   *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 ***************************************************************************/

function simplify(str) {
    return str.replace(/ /g, "&nbsp;").replace(/\n+/g, "<br /><br />");
};

// init funciton
$(document).ready(function () {
    var path = window.location.pathname;
    if (path == "/default2.aspx")
        fixLoginPage();
    else if (path.indexOf("/xsmain_") == 0)
        fixMenuPage();
    else if (path.indexOf("/xsxjs.aspx") == 0)
        fixTeacherSelection();
    else if (path.indexOf("/html_kc") == 0)
        fixCourseInfo();
    else if (path.indexOf("/tpml/") == 0)
        fixTeacherInfoLink();
    else if (path.indexOf("/html_js") == 0)
        fixTeacherInfo();
    else if (path.indexOf("/xsxkdl.aspx") == 0)
        fixIntroCourse();
    else if (path.indexOf("/xscj.aspx") == 0)
        fixScorePage();
});


function fixLoginPage() {
    // Sumbit <form> when ENTER pressed
    $(".inputtext").keypress(function (e) {
        if (e.which == 13)
            unsafeWindow.__doPostBack('Button1','');
    });
};

function fixMenuPage() {
    // fix menu tips
    unsafeWindow.disp = function (str, event) {
        $("#tskc").add("#dlkc").add("#zykc").add("#xxkc").hide();

        var x = event.clientX;
        var y = event.clientY;

        $("#" + str)
            .css("left", x + "px")
            .css("top", y + "px")
            .show();

        setTimeout(function () {
            $("#" + str).hide();
        }, 5000);
    };
    $("#list_byjy > li > a").each(function (i) {
        var str = this.attributes.getNamedItem("onmouseover");
        if (str) {
            str = str.nodeValue;
            this.attributes.removeNamedItem("onmouseover");
            var mouseOverNode = document.createAttribute("onMouseOver");
            mouseOverNode.value = str.replace(/\)/g, ", event)");
            this.attributes.setNamedItem(mouseOverNode);
        };
    });
};

function fixTeacherSelection() {
    // Add a link to course information
    var re = new RegExp("-([0-9A-Za-z]{8})", "g");
    re.test(window.location.search);
    var url = "http://" + document.domain + "/html_kc/" + RegExp.lastParen + ".html";
    var str = $("#Label_jbxx").html();
    $("#Label_jbxx").html("<a href='" + url + "'><p style='font-size: 15px'>" + str + "</p></a>");
};

function fixCourseInfo() {
    // Simplify the information
    $("#kcjj").parent().html(simplify($("#kcjj").html()));
    $("#jxdg").parent().html(simplify($("#jxdg").html()));
};

function fixTeacherInfoLink() {
    var rt = "http://" + document.domain + "/html_js/" + unsafeWindow.request.QueryString("jszgh") + ".html";
    document.location.href = rt;
};

function fixTeacherInfo() {
    // Generate a table of score
    var str = $("#jxzlpj").html()
        .replace(/\//g, "</td><td>")
        .replace(/\n/g, "</td></tr><tr><td>");
    $("#jxzlpj").parent().html("<table border=1><tr><td>" + str + "</td></tr></table>");

    // Simplify teacher information
    $("#jsjj").parent().html(simplify($("#jsjj").html()));
};

function fixIntroCourse() {
    // Simplify the text
    $("#nrjj").parent().html(simplify($("#nrjj").html()));
};

// ....... >_< I am too lazy.......
String.prototype.td = function(str, num) {
    var ret = this;
    var i;
    if (num == null)
        num = 1;
    for (i = 0; i < num; i++)
        ret = ret.concat("<td>" + str + "</td>");
    return ret;
};

function scoreData() {
    this.data = new Array();
    this.summary = {
        "count" : 0,
        "majorCount" : 0,
        "creditSum" : 0,
        "pointSum" : 0,
        "gradePointSum" : 0,
        "majorCreditSum" : 0,
        "majorPointSum" : 0,
        "majorGradePointSum" : 0,
    };

    this.addRecord = function (rec) {
        rec.gradePoint = (rec.point > 4) ? 4 : rec.point;
        rec.major = true;
        this.data.push(rec);

        var summary = this.summary;

        summary.count ++;
        summary.majorCount ++;

        if (rec.score != "放弃考试") {
            summary.creditSum += rec.credit;
            summary.majorCreditSum += rec.credit;
        };

        summary.pointSum += rec.point * rec.credit;
        summary.majorPointSum += rec.point * rec.credit;

        summary.gradePointSum += rec.gradePoint * rec.credit;
        summary.majorGradePointSum += rec.gradePoint * rec.credit;
        
        summary.pointAverage = summary.pointSum / summary.creditSum;
        summary.majorPointAverage = summary.majorPointSum / summary.majorCreditSum;

        summary.gradePointAverage = summary.gradePointSum / summary.creditSum;
        summary.majorGradePointAverage = summary.majorGradePointSum / summary.majorCreditSum;
    };

    this.formatRecord = function (id) {
        var rec = this.data[id];
        return ""
            .td('<input type="checkbox"' + (rec.major ? "checked" : "") + ' onclick="setZxkValue(this, ' + String(id) +')" />')
            .td(rec.id)
            .td(rec.name)
            .td(rec.score)
            .td(rec.score2)
            .td(rec.credit)
            .td(rec.point)
            .td(rec.gradePoint)
            .td((rec.credit * rec.point).toFixed(2))
            .td((rec.credit * rec.gradePoint).toFixed(2));
    };
    this.setMajor = function (id, isMajor) {
        var rec = this.data[id];
        var summary = this.summary;
        if (rec.major) {
            summary.majorCount --;
            if (rec.score != "放弃考试") {
                summary.majorCreditSum -= rec.credit;
                summary.majorPointSum -= rec.point * rec.credit;
                summary.majorGradePointSum -= rec.gradePoint * rec.credit;
            };
        };
        rec.major = isMajor;
        if (isMajor) {
            summary.majorCount ++;
            if (rec.score != "放弃考试") {
                summary.majorCreditSum += rec.credit;
                summary.majorPointSum += rec.point * rec.credit;
                summary.majorGradePointSum += rec.gradePoint * rec.credit;
            };
        };
        summary.majorPointAverage = summary.majorPointSum / summary.majorCreditSum;
        summary.majorGradePointAverage = summary.majorGradePointSum / summary.majorCreditSum;
    };
};

function fixScorePage() {
    var table = $("#DataGrid1");
    if (table.size() == 0)
        return;

    $("<style type='text/css'>\n" +
      "    .datagridtail { background-color: #CBEDFF; font-weight: bold; }\n" +
      "</style>").appendTo("head");

    unsafeWindow.lookupResult = new scoreData();
    var r = unsafeWindow.lookupResult;

    table.each(function () {
        rows = this.rows;
        for (i = 1; i < rows.length; i++)
            r.addRecord({
                "id"   : rows[i].cells[0].innerHTML,
                "name" : rows[i].cells[1].innerHTML,
                "score" : rows[i].cells[2].innerHTML,
                "credit" : Number(rows[i].cells[3].innerHTML),
                "point" : Number(rows[i].cells[4].innerHTML),
                "score2" : rows[i].cells[5].innerHTML,
            });
    });

    var outputTable =
    "<tr class='datagridhead'>"
        .td("主修")
        .td("选课课号")
        .td("课程名称")
        .td("成绩")
        .td("补考成绩")
        .td("学分")
        .td("绩点")
        .td("GPA")
        .td("学分*绩点")
        .td("学分*GPA") +
    "</tr>";
    for (i = 0; i < r.summary.count; i++) {
        outputTable += (i % 2 == 0) ? '<tr class="datagrid1212">' : '<tr>';
        outputTable += r.formatRecord(i);
        outputTable += '</tr>';
    };
    outputTable +=
        "<tr class='datagridtail'>"
            .td("")
            .td("所有课程合计")
            .td("共 " + String(r.summary.count) + " 门课程")
            .td("", 2)
            .td(r.summary.creditSum.toFixed(1))
            .td("", 2)
            .td(r.summary.pointSum.toFixed(3))
            .td(r.summary.gradePointSum.toFixed(3)) + 
        "</tr>";
    outputTable +=
        "<tr class='datagridtail'>"
            .td("")
            .td("所有课程平均")
            .td("", 6)
            .td(r.summary.pointAverage.toFixed(3))
            .td(r.summary.gradePointAverage.toFixed(3)) +
        "</tr>";
    outputTable += 
        '<tr id="zxSum" class="datagridtail"></tr>' + 
        '<tr id="zxAver" class="datagridtail"></tr>' +
        '<tr class="datagridtail">'
            .td("")
            .td("权重")
            .td("", 2)
            .td("所有课程")
            .td("<input style='width: 30px' id='allw' value='0.3' onChange='javascript:refreshValue()' />")
            .td("", 2)
            .td("主修课程")
            .td("<input style='width: 30px' id='majorw' value='0.7' onChange='javascript:refreshValue()' />") +
        '</tr>' +
        '<tr id="zhpd" class="datagridtail"></tr>';
    table.html(outputTable);
    unsafeWindow.refreshValue();
};

unsafeWindow.setZxkValue = function(ckobj, id) {
    var r = unsafeWindow.lookupResult;
    r.setMajor(id, ckobj.checked);
    unsafeWindow.refreshValue();
};

unsafeWindow.refreshValue = function() {
    var r = unsafeWindow.lookupResult;
    $("#zxSum").html(""
        .td("")
        .td("主修课程合计")
        .td("共 " + String(r.summary.majorCount) + " 门课程")
        .td("", 2)
        .td(r.summary.majorCreditSum.toFixed(1))
        .td("", 2)
        .td(r.summary.majorPointSum.toFixed(3))
        .td(r.summary.majorGradePointSum.toFixed(3))
        );

    $("#zxAver").html(""
        .td("")
        .td("主修课程平均")
        .td("", 6)
        .td(r.summary.majorPointAverage.toFixed(3))
        .td(r.summary.majorGradePointAverage.toFixed(3))
        );

    allWeight = Number($("#allw").val());
    majorWeight = Number($("#majorw").val());
    $("#zhpd").html(""
        .td("")
        .td("综合评定")
        .td("", 6)
        .td((r.summary.pointAverage * allWeight + r.summary.majorPointAverage * majorWeight).toFixed(3))
        .td((r.summary.gradePointAverage * allWeight + r.summary.majorGradePointAverage * majorWeight).toFixed(3))
        );
};

