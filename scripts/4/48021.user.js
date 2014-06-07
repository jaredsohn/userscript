// ==UserScript==
// @name           gpa_calcII
// @namespace      http://wutj.info/
// @description    GPA Calculator for new version of info.thu
// @include        http://zhjw.cic.tsinghua.edu.cn/cj.cjCjbAll.do?m=bks_yxkccj*
// @include        http://zhjw.cic.thu.edu.cn/cj.cjCjbAll.do?m=bks_yxkccj*
// @include        http://zhjw.cic.tsinghua.edu.cn/cj.cjCjbAll.do?m=yjs_yxkccj*
// @include        http://zhjw.cic.thu.edu.cn/cj.cjCjbAll.do?m=yjs_yxkccj*
// @include        https://sslvpn.tsinghua.edu.cn:11001/cj.cjCjbAll.do?m=bks_yxkccj*
// @include        https://sslvpn.tsinghua.edu.cn:11001/cj.cjCjbAll.do?m=yjs_yxkccj*
// ==/UserScript==

var hwnd_Move=0;
var hwnd_Opacity=0;
var t=0;
var gt=new Array(0,0,0);

function main()
{
    var htm, i;
    var j = [0,0,0];
    
    var tbls = document.getElementsByTagName("table");
    var tbl1;
    for (i=0; i<tbls.length; i++) {
        tbl1 = tbls[i];
        if (tbl1.textContent.indexOf('课程号')>0) {
            break;
        }
    }
    var trs = tbl1.getElementsByTagName("TR");

    for (i=1; i<trs.length; i++) {
        var tds = trs[i].getElementsByTagName("TD");
        if (tds.length != 11) continue;

        var g = tds[3].textContent;
        var s = tds[5].textContent;
        var typ = tds[7].textContent;
        if (typ.indexOf("必修")>=0 || typ.indexOf("是")>=0) 
            typ = 0;
        else if (typ.indexOf("限选")>=0)
            typ = 1;
        else
            typ = 2;    
        gt[typ]+=parseInt(g);
        if (!parseInt(s)) continue;
        s = parseInt(s);
        var id = "chk"+typ+"_"+j[typ];
        j[typ]++;
        htm = '<input type="checkbox" name="'+id+'" id="'+id+'" checked g="'+g+'" s="'+s+'"/>';

        tds[0].innerHTML = tds[0].textContent + htm;
        document.getElementById(id).addEventListener("change", toggle_one, false);
    }
    
    document.getElementsByTagName("TH")[0].width = "85px";

    openEx("gpa_disp");
    
    htm = '<table cellspacing="2px" style="border:dashed 1px grey; background-color:#F8F8F8"><tr><td>';
    htm +='GPA算法: <select id="gpa_sel" >';
    for (i=0; i<gptable.length; i++) {
        var n = gptable[i][0];
        htm +='<option value="'+i+'">'+n+'</option>';
    }
    htm +='</select >';
    htm +='<input type="checkbox" name="chk_weighted" id="chk_weighted" checked />加权平均';
    htm +='</td></tr>';
    htm +='<tr><td id="td_content">';

    htm +='<table>';
    htm +='<tr>';
    htm +='<td><input type="checkbox" name="chk0" id="chk0" checked />必修课:</td>';
    htm +='<td style="color:grey">总学分</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s01"></span></td>';
    htm +='<td style="color:grey">选中学分</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s02"></span></td>';
    htm +='<td style="color:grey">平均成绩</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s03"></span>';
    htm +='<td style="color:grey">平均绩点</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s04"></span>';
    htm +='</td></tr>';
    htm +='<tr>';
    htm +='<td><input type="checkbox" name="chk1" id="chk1" checked />限选课:</td>';
    htm +='<td style="color:grey">总学分</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s11"></span></td>';
    htm +='<td style="color:grey">选中学分</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s12"></span></td>';
    htm +='<td style="color:grey">平均成绩</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s13"></span></td>';
    htm +='<td style="color:grey">平均绩点</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s14"></span></td>';
    htm +='</tr>';
    htm +='<tr>';
    htm +='<td><input type="checkbox" name="chk2" id="chk2" checked />任选课:</td>';
    htm +='<td style="color:grey">总学分</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s21"></span></td>';
    htm +='<td style="color:grey">选中学分</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s22"></span></td>';
    htm +='<td style="color:grey">平均成绩</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s23"></span>';
    htm +='<td style="color:grey">平均绩点</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s24"></span></td>';
    htm +='</td></tr>';
    htm +='<tr><td>&nbsp;总计:</td><td style="color:grey">';
    htm +='总学分</td><td>';
    htm +='<span style="font-weight:bold; color:#A00020" id="s31"></span></td>';
    htm +='<td style="color:grey">选中学分</td><td>';
    htm +='<span style="font-weight:bold; color:#A00020" id="s32"></span></td>';
    htm +='<td style="color:grey">平均成绩</td><td>';
    htm +='<span style="font-weight:bold; color:#A00020" id="s33"></span>';
    htm +='<td style="color:grey">平均绩点</td><td>';
    htm +='<span style="font-weight:bold; color:#0020A0" id="s34"></span></td>';
    htm +='</td></tr>';
    htm +='</table>';

    htm +='</td></tr>';
    htm +='</table>';
    document.getElementById("gpa_disp").innerHTML = htm;
    setTimeout(function () {opacityEx("gpa_disp")}, 50);
    document.getElementById("gpa_sel").addEventListener("change", toggle_type, false);
    
    document.getElementById("chk0").addEventListener("change", toggle_all, false);
    document.getElementById("chk1").addEventListener("change", toggle_all, false);
    document.getElementById("chk2").addEventListener("change", toggle_all, false);
    document.getElementById("chk_weighted").addEventListener("change", update_gpa, false);
    update_gpa();
}

function toggle_all()
{
    var id = this.id;
    var obj;
    for (var i=0; (obj=document.getElementById(id+"_"+i)); i++) {
        obj.checked = this.checked;
    }
    update_gpa();
}

function toggle_one()
{
    update_gpa();
}

function toggle_type()
{
    t=parseInt(this.value);
    update_gpa();
}

function update_gpa()
{
    var obj;

    var weighted = document.getElementById("chk_weighted").checked;
    var baseid = "chk0";
    var g=new Array(0,0,0,0);
    var s=new Array(0,0,0,0);
    var p=new Array(0,0,0,0);
    var course_cnt, course_cnt_all;
    
    course_cnt_all = 0;
    course_cnt = 0;
    for (var i=0; (obj=document.getElementById(baseid+"_"+i)); i++) {
        if (obj.checked) {
            course_cnt_all ++;
            course_cnt ++;
            var g1=parseInt(obj.getAttribute("g"));
            var s1=parseInt(obj.getAttribute("s"));
            var p1=getPoint(s1, t);
            g[0] += g1;
            g[3] += g1;
            g1 = (weighted? g1:1);
            s[0] += g1 * s1;
            p[0] += g1 * p1;
            s[3] += g1 * s1;
            p[3] += g1 * p1;
        }
    }
    document.getElementById("s01").innerHTML=gt[0];
    document.getElementById("s02").innerHTML=g[0];
    if (weighted) {
        document.getElementById("s03").innerHTML=(Math.round(s[0]/g[0]*100)/100);
        document.getElementById("s04").innerHTML=(Math.round(p[0]/g[0]*10000)/10000);
    } else {
        document.getElementById("s03").innerHTML=(Math.round(s[0]/course_cnt*100)/100);
        document.getElementById("s04").innerHTML=(Math.round(p[0]/course_cnt*10000)/10000);
    }

    baseid = "chk1";
    course_cnt = 0;
    for (var i=0; (obj=document.getElementById(baseid+"_"+i)); i++) {
        if (obj.checked) {
            course_cnt_all ++;
            course_cnt ++;
            var g1=parseInt(obj.getAttribute("g"));
            var s1=parseInt(obj.getAttribute("s"));
            var p1=getPoint(s1, t);
            g[1] += g1;
            g[3] += g1;
            g1 = (weighted? g1:1);
            s[1] += g1 * s1;
            p[1] += g1 * p1;
            s[3] += g1 * s1;
            p[3] += g1 * p1;
        }
    }
    document.getElementById("s11").innerHTML=gt[1];
    document.getElementById("s12").innerHTML=g[1];
    if (weighted) {
        document.getElementById("s13").innerHTML=(Math.round(s[1]/g[1]*100)/100);
        document.getElementById("s14").innerHTML=(Math.round(p[1]/g[1]*10000)/10000);
    } else {
        document.getElementById("s13").innerHTML=(Math.round(s[1]/course_cnt*100)/100);
        document.getElementById("s14").innerHTML=(Math.round(p[1]/course_cnt*10000)/10000);
    }

    baseid = "chk2";
    course_cnt = 0;
    for (var i=0; (obj=document.getElementById(baseid+"_"+i)); i++) {
        if (obj.checked) {
            course_cnt_all ++;
            course_cnt ++;
            var g1=parseInt(obj.getAttribute("g"));
            var s1=parseInt(obj.getAttribute("s"));
            var p1=getPoint(s1, t);
            g[2] += g1;
            g[3] += g1;
            g1 = (weighted? g1:1);
            s[2] += g1 * s1;
            p[2] += g1 * p1;
            s[3] += g1 * s1;
            p[3] += g1 * p1;
        }
    }
    document.getElementById("s21").innerHTML=gt[2];
    document.getElementById("s22").innerHTML=g[2];
    if (weighted) {
        document.getElementById("s23").innerHTML=(Math.round(s[2]/g[2]*100)/100);
        document.getElementById("s24").innerHTML=(Math.round(p[2]/g[2]*10000)/10000);
    } else {
        document.getElementById("s23").innerHTML=(Math.round(s[2]/course_cnt*100)/100);
        document.getElementById("s24").innerHTML=(Math.round(p[2]/course_cnt*10000)/10000);
    }

    document.getElementById("s31").innerHTML=(gt[0]+gt[1]+gt[2]);
    document.getElementById("s32").innerHTML=g[3];
    if (weighted) {
        document.getElementById("s33").innerHTML=(Math.round(s[3]/g[3]*100)/100);
        document.getElementById("s34").innerHTML=(Math.round(p[3]/g[3]*10000)/10000);
    } else {
        document.getElementById("s33").innerHTML=(Math.round(s[3]/course_cnt_all*100)/100);
        document.getElementById("s34").innerHTML=(Math.round(p[3]/course_cnt_all*10000)/10000);
    }

    document.getElementById("gpa_disp").style.opacity = 2;

}

function openEx(name)
{
    var newwin = document.createElement("div");
    newwin.setAttribute("id", name);
    newwin.style.position = "absolute";
    newwin.style.top = "10px";
    newwin.style.right = "10px";
//    newwin.style.width = "100px";
//    newwin.style.height = "100px";
    newwin.style.opacity = 0.85;

    window.addEventListener("scroll", function() {
        var newpos = document.body.scrollTop + 10;
        newwin.setAttribute("tarpos", newpos);
        setTimeout(function () {if (!hwnd_Move) moveEx(name)}, 50);
    },false);
    
    var newpos = document.body.scrollTop + 10;
    newwin.setAttribute("tarpos", newpos);
    setTimeout(function () {if (!hwnd_Move) moveEx(name)}, 50);
    var htm="";
    
    document.body.appendChild(newwin);

    newwin.setAttribute("taropc", 0.1)
    newwin.addEventListener("mouseover", function() {
        this.style.opacity = 2;
        newwin.setAttribute("taropc", 2)
    }, false);
    newwin.addEventListener("mouseout", function() {
        this.style.opacity = 2;
        newwin.setAttribute("taropc", 0.1)
    }, false);

}

function moveEx(name)
{
    var target = document.getElementById(name);
    var newpos = target.getAttribute("tarpos");
    var curr_pos = parseInt(target.style.top);
    if (curr_pos < newpos) {
        if (curr_pos-newpos<-8)
            curr_pos -= (curr_pos-newpos)/4;
        else
            curr_pos +=1;
        target.style.top = curr_pos;
        hwnd_Move = setTimeout(function () {moveEx(name)}, 50);
    }else if (curr_pos > newpos) {
        if (curr_pos-newpos>8)
            curr_pos -= (curr_pos-newpos)/4;
        else
            curr_pos -=1;
        target.style.top = curr_pos;
        hwnd_Move = setTimeout(function () {moveEx(name)}, 50);
    }else
        hwnd_Move = 0;
}

function opacityEx(name)
{
    var target = document.getElementById(name);
    var newpos = target.getAttribute("taropc");
    var curr_pos = parseFloat(target.style.opacity);
    if (curr_pos < newpos) {
        if (curr_pos-newpos<-0.2)
            curr_pos += 0.2;
        else
            curr_pos = newpos;
        target.style.opacity = curr_pos;
    }else if (curr_pos > newpos) {
        if (curr_pos-newpos>0.02)
            curr_pos -= 0.02;
        else
            curr_pos = newpos;
        target.style.opacity = curr_pos;
    }
    hwnd_Opacity = setTimeout(function () {opacityEx(name)}, 50);
}

function getPoint(s, t)
{
    var tmptable = gptable[t];
    for (var i=1; i<tmptable.length; i++)
        if (s>=tmptable[i][0])
            return tmptable[i][1];
    return null;
}

var gptable = [

    [
        "北大算法(4.0, 3.7, 3.3,..., 1.5, 1.0)",
        [90,4],
        [85,3.7],
        [82,3.3],
        [78,3],
        [75,2.7],
        [72,2.3],
        [68,2],
        [64,1.5],
        [60,1],
        [0,0]
    ],
    [
        "美国1(4.0, 3.0, 2.0, 1.0)",
        [90,4],
        [80,3],
        [70,2],
        [60,1],
        [0,0]
    ],
    [
        "改进4.0_1(4.0=85, 3.0, 2.0)",
        [85,4],
        [70,3],
        [60,2],
        [0,0]
    ],
    [
        "改进4.0_2(4.0=85, 3.0=75, 2.0)",
        [85,4],
        [75,3],
        [60,2],
        [0,0]
    ],
    [
        "美国2(4.0, 3.5, 3.0,..., 1.5, 1.0)",
        [90,4],
        [85,3.5],
        [80,3],
        [75,2.5],
        [70,2],
        [65,1.5],
        [60,1],
        [0,0]
    ],
    [
        "美国3(4.0, 3.7, 3.3,..., 2.0, 1.0)",
        [90,4],
        [87,3.7],
        [83,3.3],
        [80,3],
        [77,2.7],
        [73,2.3],
        [70,2],
        [60,1],
        [0,0]
    ],
    [
        "加拿大(4.3, 4.0, 3.7, ..., 2.7, 2.3)",
        [90,4.3],
        [85,4.0],
        [80,3.7],
        [75,3.3],
        [70,3.0],
        [65,2.7],
        [60,2.3],
        [0,0]
    ],
    [
        "中科大(4.3, 4.0, 3.7, ..., 1.3, 1.0)",
        [95,4.3],
        [90,4.0],
        [85,3.7],
        [82,3.3],
        [78,3.0],
        [75,2.7],
        [72,2.3],
        [68,2.0],
        [65,1.7],
        [64,1.5],
        [61,1.3],
        [60,1.0],
        [0,0]
    ],
    [
        "上海交大(4.3, 4.0, 3.7, ..., 1.7, 1.0)",
        [95,4.3],
        [90,4.0],
        [85,3.7],
        [80,3.3],
        [75,3.0],
        [70,2.7],
        [67,2.3],
        [65,2.0],
        [62,1.7],
        [60,1.0],
        [0,0]
    ],

];
 
//window.addEventListener("load", main, false);
main();
