// ==UserScript==
// @name          cmcc reporter 
// @namespace     http://lispc.github.io
// @include       http://osn.cmri.cn/cmri/calendar*
// ==/UserScript==




//var url=BASEURL+'/calendar/saveschedule';
var m_url="http://osn.cmri.cn/cmri/calendar/saveschedule"
function getdata_bak(ibegin,iend,icontentindex)
{
	//var mbegin=
	var s1="%e7%a0%94%e8%ae%a8";//研讨
	var s2="%e4%bc%9a%e8%ae%ae";//会议
	var s3="%e4%ba%a4%e6%b5%81";//交流
	var s4="friday";
	var reasons=[s1,s2,s3,s4];
	var scontent=reasons[icontentindex];
	//ibegin in seconds, not ms
	//default int to string conversion
	return "results=&fromdate="+parseInt(ibegin/1000)+"&todate="+parseInt(iend/1000)+"&allday=0&repeat=0&repeatbtw=0&repeatmonthtype=0&endtime=0&activityaddress=&activitydetail=&schedule="+scontent+"&achievement=&project_id=PMS%7C7a20d260-49eb-11e2-817f-00505696002d%7C&calendarid=8bKMEYHW7gIEuPqs";
}
/*
function getdata(ibegin,iend,icontentindex)
{
	var s1="ss11";//"""%e7%a0%94%e8%ae%a8";//研讨
	var s2="ss22";//"%e4%bc%9a%e8%ae%ae";//会议
	var s3="ss33";//"%e4%ba%a4%e6%b5%81";//交流
	var reasons=[s1,s2,s3];
	var scontent=reasons[icontentindex];
	
	var schedule={
			results:'',
			fromdate:ibegin,
			todate:iend,
			allday:0
			repeat:0,
			repeatbtw:0,
			repeatweektime:[],
			repeatmonthtype:0,
			endtime:0,
			activityaddress:'',
			activitydetail:'',
			schedule:schedule,
			achievement:'',
			project_id:'PMS|7a20d260-49eb-11e2-817f-00505696002d|',
			canlendarid='8bKMEYHW7gIEuPqs'
		};
	return schedule;
}*/

//var data="results=&fromdate=1376240400&todate=1376245800&allday=0&repeat=0&repeatbtw=0&repeatmonthtype=0&endtime=0&activityaddress=&activitydetail=&schedule=asdfghj&achievement=acdbgfnynj&project_id=PMS%7C7a20d260-49eb-11e2-817f-00505696002d%7C&calendarid=8bKMEYHW7gIEuPqs"
//1376275930374
function report(ibegin,iend,icontentindex)
{
	var m_data=getdata_bak(ibegin,iend,icontentindex);
	$.ajax({
		type:"post",
		url:m_url,
		data:m_data,
		success:function(rdata)
		{
			//alert(rdata);
			//console.log(rdata);
			//location.reload();
		}
	})
}
function dotest_lowlevel()
{
	report(1376625600,1376629200,3);
}

function plugIn()
{
	//alert("in plugin");
	var enumTask = new Array();
	//enumTask[0] = "会议";
	//enumTask[1] = "交流";
	//enumTask[2] = "研讨";
	
	var now = new Date();
	//Get day and time of current week
	var day = now.getDay();
	var milliTime = now.getTime(); // in milliseconds since 01.01.1970
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	//Get Monday 8:30 a.m. of curent week in milliseconds
	var tempTime = milliTime-hours*3600*1000-minutes*60*1000-(day-1)*24*3600*1000;
	var initSeed    = (tempTime - tempTime % 1000) + 8.5*3600*1000;

	for (var i=0; i<7; i++)
	{
		//Declaration
		var task, startTime, endTime;
		//Random task
		var taskIndex = parseInt(Math.random()*3);
		//task = enumTask[taskIndex];

		if(i<5) // Mon to Fri
		{
			//Random startTime & endTime;
			startTime = initSeed + parseInt(Math.random()*2)*3600*1000;
			endTime  = startTime + 10*3600*1000 + parseInt(Math.random()*3)*3600*1000;
			initSeed   += 24*3600*1000;
			//   CallFunc(task,startTime,endTime);
			report(startTime,endTime,taskIndex);
		}

		else// Sat & Sun
		{
			//Random startTime & endTime;
			startTime = initSeed   + (15-8.5)*3600*1000;
			endTime  = startTime + 7*3600*1000;
			initSeed += 24*3600*1000;
			report(startTime,endTime,taskIndex);
		}
		
	    /*functin selfDefine(task,startTime,endTime)
		{
			To-Do;
		}
	    */
	}
}
plugIn();
/*
function contentEval( source ) {
	alert("in eval");
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
contentEval(plugIn);*/









