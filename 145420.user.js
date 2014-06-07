// ==UserScript==
// @name        classroom tsinghua
// @namespace   wutj.info
// @description Exchange classroom infomation in Tsinghua University
// @include     http://portal.tsinghua.edu.cn/*render.userLayoutRootNode.uP*
// @include     http://info.tsinghua.edu.cn/*render.userLayoutRootNode.uP*
// @version     1.4
// @grant       GM_xmlhttpRequest
// ==/UserScript==

////////////////////////////////////////////////////////////
//
// 欢迎你阅读和使用这些代码.
// 这是一个只在清华校内使用的插件，意义在于方便大家共享信息
// 因此，我们相信清华的同学不会故意攻击、修改、获取数据。
//
////////////////////////////////////////////////////////////

var uid = '';
var myclass = '';
var baseurl = 'http://infobot.innovation-china.org/courseinfo/';
var hwnd_Move;
var fail_one = 0;

String.prototype.indexOfR = function(needle, start) {
    var p = this.indexOf(needle, start);
    return (p<0)?p:p+needle.length;
};

function main()
{
    var uid = document.getElementsByClassName('uportal-navi-user');
    if (uid.length) {
        uid = uid[3].innerHTML;
        if (uid != parseInt(uid)) return;
    } else {
        uid = document.getElementsByClassName('hot_nav_cont');
        if (!uid.length) return;
        var txt = uid[0].innerHTML;
        var p = txt.indexOfR('证件号：');
        var p1 = txt.indexOf('</span>', p);
        uid = txt.substr(p, p1-p);
        if (uid != parseInt(uid)) return;
    }

    var get_head_body = function() {
        var a = document.getElementsByTagName('head');
        return a.length < 1 ? document.body : a[0];
    };

    var add_script_head = function(src){
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = src;
        get_head_body().appendChild(s);
    };
    
    var parsestudylist = function(res) {
        var txt = res.responseText;
        var p = 0, p1 = 0;
        var myclass_obj = [];
        
        while(1) {
            var prof, course, room, t;
            p = txt.indexOfR('strHTML1 = "";', p);
            if (p < 0) break;
            p = txt.indexOfR('strHTML1 += "', p);
            p1 = txt.indexOf('";', p);
            prof = txt.substr(p+1, p1-p-1);
            p = txt.indexOfR('strHTML1 += "', p1);
            p = txt.indexOfR('strHTML1 += "', p);
            p = txt.indexOfR('strHTML1 +="', p);
            p1 = txt.indexOf('"', p);
            room = txt.substr(p+1, p1-p-1);
            p = txt.indexOfR('onmouseout=\\"return nd();\\">', p1);
            p1 = txt.indexOf('</span>', p);
            course = txt.substr(p, p1-p);
            p = txt.indexOfR('getElementById(\'a', p);
            p1 = txt.indexOf('\')', p);
            t = txt.substr(p, p1-p);
            t = t.substr(2,1) + "-" + t.substr(0,1);
            myclass_obj.push({'prof':prof, 'course':course, 'room':room, 'schedule': t});
        }
        
        if (myclass_obj.length) {
            myclass = JSON.stringify(myclass_obj);
            GM_xmlhttpRequest({
                method: "GET",
                url: baseurl+"status.php?uid=" + uid,
                onload: getusercontrib
            });
            
        } else if (fail_one){
            var htm = '无法获得您当前的课表信息<br/>如果没有选课，则不能使用';
            document.getElementById('course_info_win_cont').innerHTML = htm;
        } else {
            fail_one = 1;
        }
    }, 
    getusercontrib = function(res) {
        var obj = JSON.parse(res.responseText);
        if (obj.r) {
            var htm = '<strong>出错啦</strong><br/>';
            htm += obj.reason;
            document.getElementById('course_info_win_cont').innerHTML = htm;
            return;
        }
        if (obj.contrib < 1) {
            var htm = '<strong>请你支持</strong><br/>';
            htm += '我们的数据都来自大家的贡献，请同意将您的课程上课地点加入数据库。我们不会收集也不关心您的个人信息。<br/>';
            htm += '<button id="agree_contrib">同意贡献数据</button>';
            document.getElementById('course_info_win_cont').innerHTML = htm;
            document.getElementById('agree_contrib').addEventListener("click", upload_mydata, false);
        } else {
            upload_mydata();
        }
    }, upload_mydata = function() {
        GM_xmlhttpRequest({
            method: "POST",
            url: baseurl+"update.php?uid=" + uid,
            data: "data=" + encodeURIComponent(myclass), 
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            onload: updatemainui
        });
    }, updatemainui = function(res) {
        var obj = JSON.parse(res.responseText);
        var htm = '';
        if (obj.r == -101) {
            htm ='<strong style="color:red">验证码错误!</strong><br/>';
        } else if (obj.r) {
            var htm ='<strong>出错啦</strong><br/>' + obj.reason;
            document.getElementById('course_info_win_cont').innerHTML = htm;
            return;
        }
        htm += '<strong>课程查询</strong><br/>';
        htm += '课程名称:*<input type="text" id="courseinfo_name" size="10"/><br/>';
        htm += '任课教师: <input type="text" id="courseinfo_prof" size="10"/><br/>';
        htm += '验证码:*<span id="yzmstore_wrapper_c1"></span><br/>';
        htm += '<button id="courseinfo_query">查询</button><br/>';
        if (obj.course) {
            htm += '<strong>查询结果</strong><span style="color:grey">(灰色可能为旧数据)</span><br/>';
            if (obj.course.length) {
                htm += '<table cellspacing="4px"><col width="150"><col width="40"><col width="40"><col width="40">';
                htm += '<tr><td>课名</td><td>教师</td><td>时间</td><td>教室</td></tr>';
                for (var i=0; i<obj.course.length; i++) {
                    var old = (obj.course[i].utime == null) || (parseInt(obj.course[i].utime) + 60 * 86400 < (new Date()).getTime()/1000);
                    if (old) {
                        htm += '<tr style="color:grey"><td>'+obj.course[i].name+'</td><td>'+obj.course[i].prof+'</td><td>'+obj.course[i].schedule+'</td><td>'+obj.course[i].room+'</td></tr>';
                    } else {
                        htm += '<tr><td>'+obj.course[i].name+'</td><td>'+obj.course[i].prof+'</td><td>'+obj.course[i].schedule+'</td><td>'+obj.course[i].room+'</td></tr>';
                    }
                }
                htm += '</table>';
                if (i == 16) {
                    htm += '有些结果可能没有显示，请缩小查询范围.<br/>';
                }
            } else {
                htm += '没有找到。请明天再试试，当更多的人使用后，数据会更丰富。<br/>';
            }
        }
        document.getElementById('course_info_win_cont').innerHTML = htm;
        document.getElementById('courseinfo_query').addEventListener("click", do_search, false);
        add_script_head("http://apithu.yzmstore.com/api/yzmstore-js.php?publickey=TkjmRgi5A1gHhCpOTb4Anz8UeBJwjZyqfe_faRVI&name=c1&wrapper_id=yzmstore_wrapper_c1&theme=floating");
    }, do_search = function() {
        var name = encodeURIComponent(document.getElementById('courseinfo_name').value);
        var prof = encodeURIComponent(document.getElementById('courseinfo_prof').value);
        var cu = encodeURIComponent(document.getElementById('yzmstore_user_input_c1').value);
        var cid = document.getElementById('yzmstore_cha_id_c1').value
        if (!name) {
            alert("请填写课程名");
            return;
        }
        GM_xmlhttpRequest({
            method: "POST",
            url: baseurl+"query.php?uid=" + uid,
            data: "course=" + name + "&prof=" + prof + "&yzmstore_user_input_c1=" + cu + "&yzmstore_cha_id_c1=" + cid,
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            onload: updatemainui
        });
    };
    
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://zhjw.cic.tsinghua.edu.cn/jxmh.do?url=/jxmh.do&m=yjs_kbSearch",
        onload: parsestudylist
    });

        
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://zhjw.cic.tsinghua.edu.cn/jxmh.do?url=/jxmh.do&m=bks_yjkbSearch",
        onload: parsestudylist
    });

    openEx("course_info_win");
    setTimeout(function () {opacityEx("course_info_win")}, 50);
}

function openEx(name)
{
    var newwin = document.createElement("div");
    newwin.setAttribute("id", name);
    newwin.style.position = "absolute";
    newwin.style.top = "140px";
    newwin.style.right = "10px";
    newwin.style.width = "350px";
    newwin.style.textAlign = "left";
//    newwin.style.height = "100px";
    newwin.style.opacity = 2;

    window.addEventListener("scroll", function() {
        var newpos = document.body.scrollTop + 80;
        newwin.setAttribute("tarpos", newpos);
        setTimeout(function () {if (!hwnd_Move) moveEx(name)}, 50);
    },false);
    
    var newpos = document.body.scrollTop + 80;
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
    
    var htm = '';
    htm += '<table cellspacing="10px" style="border:dashed 1px grey; background-color:#F8F8F8; width: 100%;"><tr><td>';
    htm += '<div style="float:right"><a href="#" id="'+name+'_close">X</a></div><div id="'+name+'_cont"></div>';
    htm += '</td></tr></table>'
    newwin.innerHTML = htm;

    document.getElementById(name+'_close').addEventListener("click", function() {
        newwin.style.display = "none";
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

main();