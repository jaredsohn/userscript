// ==UserScript==
// @name       成绩计算器(山东大学版)
// @nameEN     GPA Calculator(Shandong University)
// @namespace  www.luxiao200888.cc
// @version    1.2
// @description  山东大学成绩和绩点计算脚本，具有绩点预估和分析成绩功能。
// @include http://jwxt.sdu.edu.cn:*/*
// @updateURL      https://userscripts.org/scripts/source/172789.meta.js
// @downloadURL    https://userscripts.org/scripts/source/172789.user.js 
// @copyright  2014, luxiao200888
// ==/UserScript==

/*获取端口*/
var url = window.location.href;
var urlMatch = url.match(/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:)+(\d+)?.+$/i);
var port=urlMatch[5];

/*====================本学期课程的统计======================*/
if(window.location.href=="http://jwxt.sdu.edu.cn:"+port+"/pls/wwwbks/bkscjcx.curscopre"){
/*计算函数*/
var list=document.getElementsByTagName("p");
var len=(list.length-2)/8;
var sum_xf=0, sum=0,sum_ts=0,ave=0,count=0,count_ts=0,flag=0;
var pre_grade=[];									//空成绩收集数组
var anl_grade=[];									//成绩收集数组
//var anl_grade_ts=[];								//通识课成绩收集数组+通识课另一种统计方法
var anl_grade_rx=[];								//任选课结果收集数组
for(var x=1;x<len;x++)
{						
    var grade=list[x*8+8].innerHTML;				//成绩
    var xuefen=list[x*8+6].innerHTML;				//学分
    var shuxing=list[x*8+9].innerHTML;				//课程属性
    var xuhao=list[x*8+5].innerHTML;				//课序号
    var name=list[x*8+4].innerHTML;					//课程名
    if(grade==0)									//判断是否成绩为空
    {
        var flag=1;
        pre_grade.push(x);							//收集空成绩行号
    }else{
        if(xuhao<900 && xuhao!="" && name.substring(0, 4)!="国家英语")								//排除任选课和四六级成绩
        {
			grade=tograde(grade);					//将等级转换为分数
            ave=ave+1*grade;
            count=count+1;
//            if(xuhao<600 || xuhao==800)
//            {	
				anl_grade.push(grade);				//收集成绩
				sum_xf=sum_xf+1*xuefen;				//学分求和
				if(grade>=60){						//当分数>=60，计算学分×绩点	
					sum=sum+(1*grade)*(1*xuefen);	//成绩×学分求和
				}
/*            }
            if(xuhao>599 && xuhao<700)				//通识课另一种统计方法
            {
				anl_grade_ts.push(grade);			//收集通识成绩
                count_ts=count_ts+1;
                sum_ts=sum_ts+1*grade;
            }*/
        }
    }
}	

/*成绩区间分析*/
var grade_pace = new Array('0','0','0','0','0');
for(i=0;i<anl_grade.length;i++){
	if(anl_grade[i]>89){grade_pace[0]=1*grade_pace[0]+1;}
	if(anl_grade[i]>79 && anl_grade[i]<90){grade_pace[1]=1*grade_pace[1]+1;}
	if(anl_grade[i]>69 && anl_grade[i]<80){grade_pace[2]=1*grade_pace[2]+1;}
	if(anl_grade[i]>59 && anl_grade[i]<70){grade_pace[3]=1*grade_pace[3]+1;}
	if(anl_grade[i]<60){grade_pace[4]=1*grade_pace[4]+1;}
}
/*for(i=0;i<anl_grade_ts.length;i++){				//通识课另一种统计方法
	if(anl_grade_ts[i]>89){grade_pace[0]=1*grade_pace[0]+1;}
	if(anl_grade_ts[i]>79 && anl_grade_ts[i]<90){grade_pace[1]=1*grade_pace[1]+1;}
	if(anl_grade_ts[i]>69 && anl_grade_ts[i]<80){grade_pace[2]=1*grade_pace[2]+1;}
	if(anl_grade_ts[i]>59 && anl_grade_ts[i]<70){grade_pace[3]=1*grade_pace[3]+1;}
	if(anl_grade_ts[i]<60){grade_pace[4]=1*grade_pace[4]+1;}
}
var anl_count=1*anl_grade.length+1*anl_grade_ts.length;			//非任选课的课程总数+通识课另一种统计方法
*/
var anl_count=1*anl_grade.length;	//非任选课的课程总数
//if(count_ts!=0){sum_xf=sum_xf+2;sum=sum+2*sum_ts/count_ts;}    
var average=ave/count;		//平均分
if(flag==1)					//判断是否成绩全部出完，据此判断是否能计算绩点
{	
	result="请预估";
}
if(flag==0)
{
    result=(sum/sum_xf).toFixed(2);
}
}

/*将等级转换为分数*/
function tograde(grade)
{
	if(grade=="优秀"){grade=95;}		
	if(grade=="良好"){grade=85;}
	if(grade=="中等"){grade=75;}
	if(grade=="合格"){grade=70;}
	if(grade=="不合格"){grade=0;}
	if(grade=="及格"){grade=65;}
	if(grade=="不及格"){grade=0;}
	return grade;
}

/*控制面板*/
if(window.location.href=="http://jwxt.sdu.edu.cn:"+port+"/pls/wwwbks/bkscjcx.curscopre"){
var newDiv = document.createElement("div");
newDiv.id = "controlWindow";
newDiv.align = "left";
document.body.appendChild(newDiv);
GM_addStyle("#controlWindow{z-index:998; padding:6px 10px 8px 15px;background-color:lightGrey;position:fixed;right:5px;top:5px;border:1px solid grey; }");
var table = document.createElement("table");
newDiv.appendChild(table);
var th = document.createElement("th");
th.id = "headTd";
var thDiv = document.createElement("span");
thDiv.id = "thDiv";
thDiv.innerHTML = "平均分:"+average.toFixed(2)+" 绩点:"+result;
//thDiv.innerHTML = "平均分:99 绩点:99";
GM_addStyle("#thDiv{color:red;font-size: 12pt;}");
th.appendChild(thDiv);
table.appendChild(th);
var tr = document.createElement("tr");
table.appendChild(tr);
var td = document.createElement("td");
td.id = "footTd";
tr.appendChild(td);
var close = document.createElement("span"); //创建“关闭脚本”按钮
close.id = "close";
close.innerHTML = "关闭脚本";
close.addEventListener("click", function () {document.body.removeChild(document.getElementById("controlWindow"));}, false);
td.appendChild(close);
GM_addStyle("#close{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
var predict = document.createElement("span"); //创建“绩点估计”按钮
predict.id = "predict";
predict.innerHTML = "绩点预估";
predict.addEventListener("click", fpredict, false);
td.appendChild(predict);
GM_addStyle("#predict{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
var graph = document.createElement("span"); //创建“成绩分析”按钮
graph.id = "graph";
graph.innerHTML = "成绩分析";
graph.addEventListener("click", fgraph, false);
td.appendChild(graph);
GM_addStyle("#graph{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
}
/*成绩预估函数*/
function fpredict() {
	if (document.getElementById("msgWindow")) {document.body.removeChild(document.getElementById("msgWindow"));}
	var xuefen_arr=[];						//记录成绩为空的课程的学分
	var newDiv = document.createElement("div");
	newDiv.id = "msgWindow";
	newDiv.align = "left";
	document.body.appendChild(newDiv);
	GM_addStyle("#msgWindow{z-index:998; padding:6px 10px 8px 15px;background-color:lightGrey;position:fixed;right:5px;bottom:5px;border:1px solid grey; }");
	var table = document.createElement("table");
	newDiv.appendChild(table);
	var th = document.createElement("th");
	th.id = "headTd";
	var thDiv = document.createElement("span");
	thDiv.id = "thDiv";
	if(pre_grade.length!="0"){
		thDiv.innerHTML = "目前有 "+pre_grade.length+" 个科目没出成绩";
	}else{
		thDiv.innerHTML = "所有科目都已出成绩";
	}
	GM_addStyle("#thDiv{color:red;font-size: 12pt;}");
	th.appendChild(thDiv);
	table.appendChild(th);
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	td.id = "footTd";
	tr.appendChild(td);
	
	var scrollDiv = document.createElement("div");
	scrollDiv.id = "scrollDiv";
	newTable = creaseTable(pre_grade,pre_grade.length); //根据没出分课程显示列表
	scrollDiv.appendChild(newTable);
	td.appendChild(scrollDiv);
	
	/*列表函数*/
	function creaseTable(x,n){
		var tablelist = document.createElement("table");
		tablelist.id="tablelist";
		if(pre_grade.length!="0")tablelist.innerHTML = "<tr><td><p align='center'>课程名</p></td><td><p align='center'>课序号</p></td><td><p align='center'>学分</p></td><td><p align='center'>成绩预估</p></td></tr>"
		var trs = [];
		var tds = [];
		for (ly = 0; ly < n; ly++) {
			var tr = document.createElement("tr");
			tr.id="trlist";
			var course_num=1*ly+1;
			var mmd = trs.push(tr);
			tablelist.appendChild(tr);
			for (ls = 0; ls < 4; ls++) {
				var td = document.createElement("td")
				var input = document.createElement("input");
				input.id=ly;
				var line=Math.floor(ly);
				var grade=list[x[line]*8+8].innerHTML;			//成绩
				var xuefen=list[x[line]*8+6].innerHTML;			//学分
				var shuxing=list[x[line]*8+9].innerHTML;			//课程属性
				var xuhao=list[x[line]*8+5].innerHTML;			//课序号
				var name=list[x[line]*8+4].innerHTML;				//课程名
				
				switch (ls){
				case 0:td.innerHTML = "<p align='center'>"+name+"</p>";break;
				case 1:td.innerHTML = "<p align='center'>"+xuhao+"</p>";xuefen_arr.push(xuefen);break;
				case 2:td.innerHTML = "<p align='center'>"+xuefen+"</p>";break;
				case 3:td.appendChild(input);break;}
				var wq = tds.push(td);
				trs[ly].appendChild(td);
			}
		}
		return tablelist;
	}

	var close = document.createElement("span"); //创建“关闭脚本”按钮
	close.id = "close";
	close.innerHTML = "关闭";
	close.addEventListener("click", function () {document.body.removeChild(document.getElementById("msgWindow"));}, false);
	td.appendChild(close);
	GM_addStyle("#close{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
	var predict = document.createElement("span"); //创建“绩点估计”按钮
	predict.id = "predict";
	if(pre_grade.length!="0"){
		predict.innerHTML = "预估绩点和平均分";
	}else{
		predict.innerHTML = "查看绩点和平均分";
	}
	predict.addEventListener("click", calculate, false);
	td.appendChild(predict);
	GM_addStyle("#predict{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
	/*var graph = document.createElement("span"); //创建“成绩分析”按钮
	graph.id = "graph";
	graph.innerHTML = "成绩分析";
	graph.addEventListener("click", fpredict, false);
	td.appendChild(graph);
	GM_addStyle("#graph{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
	*/
	
	/*成绩预估计算函数*/
	function calculate(){
		var ave_pre=ave;
		var sum_xf_pre=sum_xf;
		var sum_pre=sum;
		var count_pre=count;
		var result=0;
		var flag=0;
		for(i = 0; i < pre_grade.length; i++){
			if(document.getElementById(i).value=="" ){alert("未输入成绩！");flag=1;break;}
			if(isNaN(document.getElementById(i).value) || document.getElementById(i).value>100 ||document.getElementById(i).value<0 ){alert("输入的成绩不正确！");flag=1;break;}
			var n=document.getElementById(i).value;
			ave_pre=ave_pre+1*n;
			if(n<60){n=0;}				//当成绩不及格时，计算学分×绩点，把成绩当0算
			sum_xf_pre=sum_xf_pre+1*xuefen_arr[i];
			sum_pre=sum_pre+(1*n)*(1*xuefen_arr[i]);
		}
		if(flag==0){
		count_pre=count_pre+pre_grade.length;
		ave_pre=ave_pre/count_pre;
		result=sum_pre/sum_xf_pre;
		var keyword="";
		if(pre_grade.length!="0"){keyword="预估";}
		alert("======"+keyword+"结果如下======"+"\n"+keyword+"平均分："+ave_pre.toFixed(2)+"\n"+keyword+"绩点："+result.toFixed(2)+"\n\n注1:绩点计算总学分为:"+sum_xf_pre+"\n注2:本绩点结果仅为成绩绩点！");
		}
	}
}

/*成绩分析函数*/
function fgraph() {
	if (document.getElementById("msgWindow")) {document.body.removeChild(document.getElementById("msgWindow"));}
	var xuefen_arr=[];						//记录成绩为空的课程的学分
	var newDiv = document.createElement("div");
	newDiv.id = "msgWindow";
	newDiv.align = "left";
	document.body.appendChild(newDiv);
	GM_addStyle("#msgWindow{z-index:998; padding:6px 10px 8px 15px;background-color:lightGrey;position:fixed;right:5px;bottom:5px;border:1px solid grey; }");
	var table = document.createElement("table");
	newDiv.appendChild(table);
	var th = document.createElement("th");
	th.id = "headTd";
	var thDiv = document.createElement("span");
	thDiv.id = "thDiv";
	thDiv.innerHTML = "成绩分析";
	GM_addStyle("#thDiv{color:red;font-size: 12pt;}");
	th.appendChild(thDiv);
	table.appendChild(th);
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	td.id = "footTd";
	tr.appendChild(td);
	
	var scrollDiv = document.createElement("div");
	scrollDiv.id = "scrollDiv";
	newTable = creaseTable(pre_grade,pre_grade.length); //根据没出分课程显示列表
	scrollDiv.appendChild(newTable);
	td.appendChild(scrollDiv);
	
	/*列表函数*/
	function creaseTable(){
		var tablelist = document.createElement("table");
		tablelist.id="tablelist";
		tablelist.innerHTML = "<tr><td><p align='center'>分数段</p></td><td><p align='center'>该段数量</p></td><td><p align='center'>比例</p></td></tr>"
		var trs = [];
		var tds = [];
		for (ly = 0; ly < 5; ly++) {
			var tr = document.createElement("tr");
			tr.id="trlist";
			var course_num=1*ly+1;
			var mmd = trs.push(tr);
			tablelist.appendChild(tr);
			var pace=new Array('90-100','80-89','70-79','60-69','<60');
			for (ls = 0; ls < 3; ls++) {
				var td = document.createElement("td")
				switch (ls){
				case 0:td.innerHTML = "<p align='center'>"+pace[ly]+"</p>";break;
				case 1:td.innerHTML = "<p align='center'>"+grade_pace[ly]+"</p>";break;
				case 2:td.innerHTML = "<p align='center'>"+(100*(1*grade_pace[ly])/(1*anl_count)).toFixed(2)+"%</p>";break;}
				var wq = tds.push(td);
				trs[ly].appendChild(td);
			}
		}
		return tablelist;
	}

	var close = document.createElement("span"); //创建“关闭”按钮
	close.id = "close";
	close.innerHTML = "关闭";
	close.addEventListener("click", function () {document.body.removeChild(document.getElementById("msgWindow"));}, false);
	td.appendChild(close);
	GM_addStyle("#close{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
	/*var predict = document.createElement("span"); //创建“分析”按钮
	predict.id = "predict";
	predict.innerHTML = "分析";
	predict.addEventListener("click", analysis, false);
	td.appendChild(predict);
	GM_addStyle("#predict{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
	*/
	/*var graph = document.createElement("span"); //创建“成绩分析”按钮
	graph.id = "graph";
	graph.innerHTML = "成绩分析";
	graph.addEventListener("click", fpredict, false);
	td.appendChild(graph);
	GM_addStyle("#graph{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
	*/
	
	/*成绩分析函数*/
	function analysis(){
	}
}

/*====================已修课程的统计======================*/
if(window.location.href=="http://jwxt.sdu.edu.cn:"+port+"/pls/wwwbks/bkscjcx.yxkc"){
/*必修课表格*/
var list_bx=document.getElementsByTagName("table")[3].getElementsByTagName("p");		//获取必修表格数据
var len_list_bx=(list_bx.length)/6;														//表格行数
//alert(len_list_bx);
var jd=0;
var jidian=[];
var time=[];
var grade=[];
var semester=[];
semester.push(list_bx[10].innerHTML);
for(var x=1;x<len_list_bx;x++)
{						
	jidian.push(list_bx[x*6+3].innerHTML);		//绩点
	semester.push(list_bx[x*6+4].innerHTML);	//时间
	var n=list_bx[x*6+5].innerHTML;
	n=tograde(n);							//将等级转换为分数
	grade.push(n);							//成绩
}
//alert(grade.length);
//alert(jidian.length);

var time=[];								//统计出所有的考试时间
time.push(semester[1]);
var time_flag=[];
for(i=0;i<semester.length-1;i++)
{
	if(semester[i]!=semester[i+1])
	{
		time.push(semester[i+1]);			//统计所有考试时间
		time_flag.push(i);					//统计每学期的考试场次长度带
	}
}
time_flag.push(semester.length-1);

/*对只有1个学期成绩的进行特殊处理*/
if(time_flag.length==0)						
{
	time_flag.push(semester.length-1);
	time.push(semester[1]);
}

/*必修课统计数组*/
var semester_xf=[];							//统计每学期学分数组
var semester_xfjd=[];						//统计每学期学分乘成绩数组 
for(i=0;i<time_flag.length;i++)				//统计各学期学分和成绩乘学分
{
	var sum_xf=0;							//每学期学分求和参数
	var sum_xfjd=0;							//每学期学分乘成绩求和参数
	if(i==0){time_flag[i-1]=0;}
	for(j=time_flag[i-1];j<time_flag[i];j++)
	{
		sum_xf=sum_xf+1*jidian[j];
		sum_xfjd=sum_xfjd+(1*jidian[j])*(1*grade[j]);
	}
	semester_xf.push(sum_xf);
	semester_xfjd.push(sum_xfjd);
}
//alert(semester_xf);
//alert(semester_xfjd);

/*限选课表格*/
var list_xx=document.getElementsByTagName("TABLE")[4].getElementsByTagName("TD");
var len_list_xx=(list_xx.length)/6;	
//var semester_xx_xf=[];							//统计每学期限选课学分数组
//var semester_xx_xfjd=[];						//统计每学期限选课学分乘成绩数组 


for(i=0;i<len_list_xx;i++)
{
	for(j=0;j<time.length;j++)
	{
		if(time[j]==list_xx[i*6+4].innerHTML)
		{
			var m=1*list_xx[i*6+3].innerHTML;
			var n=1*list_xx[i*6+5].innerHTML;
			n=tograde(n);					//将等级转换为分数
			semester_xf[j]=semester_xf[j]+m;
			semester_xfjd[j]=semester_xfjd[j]+m*n;
		}
	}
}

/*绩点数组*/
var semester_jd=[];							//统计每学期绩点数组
for(i=0;i<time.length;i++)
{	
	semester_jd.push((semester_xfjd[i]/semester_xf[i]).toFixed(2));
}

}


/*控制面板*/
if(window.location.href=="http://jwxt.sdu.edu.cn:"+port+"/pls/wwwbks/bkscjcx.yxkc"){
	var newDiv = document.createElement("div");
	newDiv.id = "controlWindow";
	newDiv.align = "left";
	document.body.appendChild(newDiv);
	GM_addStyle("#controlWindow{z-index:998; padding:6px 10px 8px 15px;background-color:lightGrey;position:fixed;right:5px;bottom:5px;border:1px solid grey; }");
	var table = document.createElement("table");
	newDiv.appendChild(table);
	var th = document.createElement("th");
	th.id = "headTd";
	var thDiv = document.createElement("span");
	thDiv.id = "thDiv";
	thDiv.innerHTML = "绩点查询方式";
	GM_addStyle("#thDiv{color:red;font-size: 12pt;}");
	th.appendChild(thDiv);
	table.appendChild(th);
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	td.id = "footTd";
	tr.appendChild(td);
	
	var close = document.createElement("span"); //创建“关闭”按钮
	close.id = "close";
	close.innerHTML = "关闭";
	close.addEventListener("click", function () {document.body.removeChild(document.getElementById("controlWindow"));}, false);
	td.appendChild(close);
	GM_addStyle("#close{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");	
	var by_year = document.createElement("span"); //创建“学年绩点”按钮
	by_year.id = "by_year";
	by_year.innerHTML = "按学年";
	by_year.addEventListener("click", function(){Window("按学年统计","1");}, false);
	td.appendChild(by_year);
	GM_addStyle("#by_year{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
	var by_semester = document.createElement("span"); //创建“学期绩点”按钮
	by_semester.id = "by_semester";
	by_semester.innerHTML = "按学期";
	by_semester.addEventListener("click", function(){Window("按学期统计","2");}, false);
	td.appendChild(by_semester);
	GM_addStyle("#by_semester{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");
}	


function Window(title,type)
{
	var newDiv = document.createElement("div");
	newDiv.id = "msgWindow";
	newDiv.align = "left";
	document.body.appendChild(newDiv);
	GM_addStyle("#msgWindow{z-index:998; padding:6px 10px 8px 15px;background-color:lightGrey;position:fixed;right:5px;bottom:5px;border:1px solid grey; }");
	var table = document.createElement("table");
	newDiv.appendChild(table);
	var th = document.createElement("th");
	th.id = "headTd";
	var thDiv = document.createElement("span");
	thDiv.id = "thDiv";
	thDiv.innerHTML = title;
	GM_addStyle("#thDiv{color:red;font-size: 12pt;}");
	th.appendChild(thDiv);
	table.appendChild(th);
	var tr = document.createElement("tr");
	table.appendChild(tr);
	var td = document.createElement("td");
	td.id = "footTd";
	tr.appendChild(td);
    var scrollDiv = document.createElement("div");
	scrollDiv.id = "scrollDiv";
	switch(1*type)
	{
		case 1:newTable = byyear();break;
		case 2:newTable = bysemester();break;
	}
//	newTable = byyear(); //根据没出分课程显示列表
	scrollDiv.appendChild(newTable);
	td.appendChild(scrollDiv);
	
	/*列表函数*/


	var close = document.createElement("span"); //创建“关闭”按钮
	close.id = "close";
	close.innerHTML = "关闭";
	close.addEventListener("click", function () {document.body.removeChild(document.getElementById("msgWindow"));}, false);
	td.appendChild(close);
	GM_addStyle("#close{float:right;background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;border:2px groove black;}");	
}	


/*按学年统计*/
function byyear(){
	var tablelist = document.createElement("table");
	tablelist.id="tablelist";
    if(time_flag.length<2)
    {
        tablelist.innerHTML="请等待本学年结束";
    }else{
       	tablelist.innerHTML = "<tr><td><p align='center'>学年</p></td><td><p align='center'>本学年学分</p></td><td><p align='center'>本学年绩点</p></td></tr>"
		var trs = [];
		var tds = [];
		for (ly = 0; ly < time_flag.length; ly++) {
			var tr = document.createElement("tr");
			tr.id="trlist";
			var course_num=1*ly+1;
			var mmd = trs.push(tr);
			tablelist.appendChild(tr);
			for (ls = 0; ls < 3; ls++) {
          		n=time_flag.length-1-ly;					//按学期顺序排列
               	if(time_flag.length%2==1){var sign=0;}else{var sign=1;}
//              	  alert(sign);
               	if(n%2==sign && n>0){
	          		var pace =["一","二","三","四","五","六","七","八"];
               	    var year_xf=1*semester_xf[n]+1*semester_xf[n-1];
           	        var year_jd=(1*semester_xfjd[n]+1*semester_xfjd[n-1])/year_xf;
					var td = document.createElement("td")
	                var q=Math.floor(ly/2);						//判断学年
					switch (ls)
					{
						case 0:td.innerHTML = "<p align='center'>大"+pace[q]+"学年</p>";break;
						case 1:td.innerHTML = "<p align='center'>"+year_xf+"</p>";break;
						case 2:td.innerHTML = "<p align='center'>"+year_jd.toFixed(2)+"</p>";break;
					}
					var wq = tds.push(td);
					trs[ly].appendChild(td);	
				}
           	}
		}
    }
	return tablelist;
}
	

/*按学期统计*/
function bysemester(){
	var tablelist = document.createElement("table");
	tablelist.id="tablelist";
	tablelist.innerHTML = "<tr><td><p align='center'>学期</p></td><td><p align='center'>本学期学分</p></td><td><p align='center'>本学期绩点</p></td></tr>"
	var trs = [];
	var tds = [];
	for (ly = 0; ly < time_flag.length; ly++) {
		var tr = document.createElement("tr");
		tr.id="trlist";
		var course_num=1*ly+1;
		var mmd = trs.push(tr);
		tablelist.appendChild(tr);
		for (ls = 0; ls < 3; ls++) {
			n=time_flag.length-1-ly;					//按学期顺序排列
            if(n%2==0){var k="上";}else{ var k="下";}
	        var pace =["一","二","三","四","五","六","七","八"];
			var td = document.createElement("td")
            var q=Math.floor(ly/2);						//判断学年
			switch (ls){
				case 0:td.innerHTML = "<p align='center'>大"+pace[q]+k+"学期</p>";break;
				case 1:td.innerHTML = "<p align='center'>"+semester_xf[n]+"</p>";break;
				case 2:td.innerHTML = "<p align='center'>"+semester_jd[n]+"</p>";break;}
				var wq = tds.push(td);
				trs[ly].appendChild(td);
		}
	}
	return tablelist;
}