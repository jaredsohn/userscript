// ==UserScript==
// @name           deadline_reminder
// @namespace      http://wutj.info/
// @include        http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/MyCourse.jsp*
// @include        http://learn.thu.edu.cn/MultiLanguage/lesson/student/MyCourse.jsp*
// @include        http://learn.tsinghua.edu.cn/info/student_newinfo.jsp*
// @include        http://learn.thu.edu.cn/info/student_newinfo.jsp*
// ==/UserScript==

//var tds_table = {};

function main()
{
	var target_as = document.getElementsByTagName("a");
    var td_idx = (location.href.indexOf("_newinfo.jsp")>0)?2:1;
    
    for (var i=0; i<target_as.length; i++) {
        var ahref = target_as[i].href;
    	if (ahref.indexOf("course_locate.jsp?course_id=") < 0) continue;

    	var target_tr = target_as[i].parentNode.parentNode;
        var courseid = ahref.substr(ahref.indexOf("course_id="));
//        alert(courseid);

        var baseurl = (location.href.indexOf("tsinghua")>0)?"http://learn.tsinghua.edu.cn":"http://learn.thu.edu.cn";

	    GM_xmlhttpRequest({
            method: 'GET',
            url: baseurl+'/MultiLanguage/lesson/student/hom_wk_brw.jsp?'+courseid,
            courseid: courseid, 
            onload: function(courseid, target_tr){
            	return function(res) {
                var retarr = getdeadlines(res);
                var target_td = target_tr.getElementsByTagName("td")[td_idx];
                var ud = parseInt(target_td.textContent);
//                alert(ud);
                
                var htm = "";
                ud -= retarr[4];
                if (ud>0)
                htm += '<span style="color:#FF6600;font-weight:bold">'+ud+'</span>'
                    + '<span style="font-weight:bold"> active </span>';
                else if (retarr[4]==0)
                htm += '<span style="color:grey;margin:0px">一身轻松</span>';
                if (retarr[4])
                htm += '<span style="font-weight:bold">'
                	+ '<span style="color:#FF0000;font-weight:bold">' + retarr[4] + '</span>'
                    + '项过期作业' + "</span>";
                htm += '<br/>';
                if (retarr[1])
                htm += '<span style="color:grey">即将截止的作业: </span>' 
//                    + '<a href="hom_wk_brw.jsp?'+courseid+'">'
                    + '<span style="color:#338833;font-weight:bold">'
                    + timeDiffStr(retarr[1], retarr[0][0].textdl) 
                    + '</span>'
                    + "<br/>";
                if (retarr[3])
                htm += '<span style="color:grey">即将截止的未交作业: </span>'
//                    + '<a href="hom_wk_brw.jsp?'+courseid+'">'
                    + '<span style="color:#FF0000;font-weight:bold">' 
                    + timeDiffStr(retarr[3], retarr[2][0].textdl) 
                    + '</span>'
                    + "<br/>";
                target_td.innerHTML = htm;
                target_td.style.lineHeight = "normal";
                
                var topframe = window.parent.document.getElementById("content_frame");
                topframe.setAttribute("height", document.body.scrollHeight);
 //               window.width = document.body.scrollWidth;
            }}(courseid, target_tr),
            target_tr: target_tr
	    });
    }
}

//t2是now的...
function timeDiffStr(t2, texttime)
{
    var t1 = new Date();
	var diff=(t1-t2)/1000;
	var suf=((diff>=0)?"前":"后");
	diff=Math.abs(diff);
	var diff1=diff;
	
	if (diff<=30) return "几秒钟" +suf;
	diff1=Math.round(diff/60);
	if (diff1<=60) return diff1 + "分钟" +suf;
	diff1=Math.round(diff/3600);
	if (diff1<=24) return diff1 + "小时" +suf;
	diff1=Math.floor(diff/86400);
	if (diff1<2) return "明天";
	if (diff1<7) return diff1 + "天" +suf;
	diff1=Math.floor(diff/86400/30);
	return '<span style="font-weight:normal;color:black;">' + texttime + '</span>';
}

function getdeadlines(res)
{
	var htm = res.responseText;
	var tempdiv = document.createElement('div');
	tempdiv.innerHTML = htm;

    var nd = {};
    var nddl = 0;
    var nud = {};
    var nuddl = 0;
    var pud = 0;
    var now = new Date();

	var target_trs = tempdiv.getElementsByClassName("info_b")[0];
	if (!target_trs) 
		return Array(nd, nddl, nud, nuddl, pud);
	target_trs = target_trs.parentNode.parentNode.parentNode.getElementsByTagName("tr");
	for (var i=0; i<target_trs.length-1; i++) {
	    var tds = target_trs[i].getElementsByTagName("td");
	    var hwlink = tds[0].getElementsByTagName("a")[0];
	    var hwdl = getdate(tds[2].innerHTML);
	    var hwtextdl = tds[2].innerHTML;
	    var hwfin = (tds[3].innerHTML.indexOf(unescape("%u5DF2%u7ECF")) >0);
	    
	    var hwinfo = { link: hwlink, dl:hwdl, textdl:hwtextdl, fin:hwfin };
        if (now < hwdl) {
            if (nddl === 0 || hwdl < nddl) {
                nd = new Array();
                nd[0] = hwinfo;
                nddl = hwdl;
            }else if (hwdl == nddl) {
                nd[nd.length] = hwinfo;
            }
        }
        if (now < hwdl && !hwfin) {
            if (nuddl === 0 || hwdl < nuddl) {
                nud = new Array();
                nud[0] = hwinfo;
                nuddl = hwdl;
            }else if (hwdl == nuddl) {
                nud[nud.length] = hwinfo;
            }
        }
        if (now > hwdl && !hwfin) pud ++;
	}
	return Array(nd, nddl, nud, nuddl, pud);
}

function getdate(str)
{
    var arr = str.split("-");
    return new Date(arr[0],arr[1]-1,arr[2],24);
}

//window.addEventListener("load", main, false);
main();


