// ==UserScript==
// @name           west
// @namespace      west_tools
// @include        http://en*.the-west.net/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {  window.setTimeout(GM_wait,100); }
		else {  $ = unsafeWindow.jQuery; letsJQuery();  }
}
GM_wait();


// All your GM code must be inside this function
function letsJQuery()
{
	//放入區塊
  $("#footer_server_time").after("<div style='background-color:#ffffff;color:blue;top:100px;left:200px;position:absolute;z-index:3000;' id='west_ajax_form'><form id='form1' name='form1'>排程:<div id='orderjob' style='display:inline'></div><input type='button' id='add_order' name='add_order' value='ADD' ><input type='button' id='go_order' name='go_order' value='強排' ><br>工作:<br><textarea id='jobs' name='jobs' style='width:500px;height:200px;'></textarea><br></form></div><div style='color:blue' id='west_ajax_show'></div>");
  offset1=$("#footer").offset();
  xx=offset1.left;
  yy=offset1.top;
	$("#west_ajax_form").css({left:xx,top:yy});
  $("#footer_server_time").after("<div style='background-color:#ffffff;color:blue;top:100px;left:200px;position:absolute;z-index:3000;' id='west_ajax_order'><div id='clear_all_order' style='display:inline;color:red;'>X</div>預訂工作:<div id='all_order_list'></div></div>");
  offset1=$("#menu_quest").offset();
  xx=offset1.left;
  yy=offset1.top;
	$("#west_ajax_order").css({left:xx,top:yy});




  //初始化
  checkCookie();
	$("#jobs").text(getCookie("jobs_list"));
	select_option(getCookie("jobs_list"));
	order_view_all();
	window.setInterval(run_order,10000);

	//分析網頁
	str1=$("body").html();
	reg=new RegExp("h =.*;","g");
	var str2=str1.match(reg);
	var str3=str2[0].replace(" ","").replace(" ","").replace("'","").replace("'","").replace(";","");

	///由工作名找尋,回傳此工作url
	function find_job_url(jobname)
	{
		all_jobs_list=getCookie("jobs_list");
		ajob_ary=all_jobs_list.split("\n");
		for(i=0;i<ajob_ary.length;i++)
		{
			sjob_ary=ajob_ary[i].split("#");
			if(sjob_ary[0]==jobname)
			{
				return ajob_ary[i];
			  //break;
			}
		}
	}

	//將排程秀出
	function order_view_all()
	{
		pre_view_order=getCookie("order_list");
		if(pre_view_order)
		{
			pre_view_order_ary=pre_view_order.split("\n");
			for(ii=0;ii<pre_view_order_ary.length;ii++)
			{
				pre_view_order_job_ary=pre_view_order_ary[ii].split("#");
				pre_str2=order_view(pre_view_order_job_ary[0],pre_view_order_job_ary[1]);
			}
		}
	}
	//排程轉換器
	function order_view(order_jobname,order_time)
	{
		var mydate=new Date();
		mydate.setTime(order_time);
		ndate=mydate.toLocaleString();
		job_str1=find_job_url(order_jobname);
		now_str1=$("#all_order_list").html();
		now_str2="<div class='spanjob'>"+job_str1+",@,時間:"+ndate+",@,"+order_time+"</div>";
		$("#all_order_list").html(now_str1+now_str2);

	}

	///下拉工作選單
	function select_option(jobs_value)
	{
		setCookie("jobs_list",jobs_value,3650);
    job_list=jobs_value.split("\n");

		var select_option="";
    for(i=0;i<job_list.length;i++)
    {
    	job_ary=job_list[i].split("#");
     	job_name=job_ary[0];
     	job_url=job_ary[1];
     	select_option=select_option+"<option value='"+job_name+"'>"+job_name+"</option>";
    }
    $("#orderjob").html("<select id='order_value' name='order_value'>"+select_option+"<\/select>");
	}

	//增加排程
	$("#add_order").click(function() {
		var mydate=new Date();
		stime=7200000;
		otime1=$(".spanjob:last").html();
		if(otime1!=null)
		{
			oary=otime1.split(",@,");
			otime=new Number(oary[2]);
			jobname=oary[0].split("#");
			if(jobname[0]=="sleep"){stime=28800000;}
			ntime=otime+stime;
		}
		else
		{
			stime=0;
			otime=0;
			ntime=mydate.getTime()+stime;
		}
		///存cookie
		order_value=getCookie("order_list");
		if(order_value)
		{
			order_value=order_value+"\n"+$("#order_value").val()+"#"+ntime;
		}
		else
		{
			order_value=$("#order_value").val()+"#"+ntime;
		}
		setCookie("order_list",order_value,3650);
		///轉譯成html
		$("#all_order_list").html("");
		order_view_all();

	});
	/////跑排程
	function run_order()
	{

		var mydate=new Date();
		nowtime=mydate.getTime();
		ndate=mydate.toLocaleString();
		$("#footer_server_time").html(ndate);
		new_order_value="";

		old_order_value=getCookie("order_list");
	  if(old_order_value)
	  {
	  	old_order_ary=old_order_value.split("\n");
	  	for(i=0;i<old_order_ary.length;i++)
	  	{
     		old_order_times=old_order_ary[i].split("#");
	  	 	if(old_order_times[1]<=nowtime)
	  	 	{
	  			all_jobs_list=getCookie("jobs_list");
					ajob_ary=all_jobs_list.split("\n");
					for(k=0;k<ajob_ary.length;k++)
					{
						sjob_ary=ajob_ary[k].split("#");
						if(sjob_ary[0]==old_order_times[0])
						{
							this_job=ajob_ary[k];
						}
					}
					this_job_ary=this_job.split("#");
					$.post("game.php"+this_job_ary[1]+"&"+str3,this_job_ary[2],function(data) {
   				$("#west_ajax_show").html(data);
   				});
	  			continue;
	  		}
	  		else
	  		{
	  			if(new_order_value)
					{
						new_order_value=new_order_value+"\n"+old_order_ary[i];
					}
					else
					{
						new_order_value=old_order_ary[i];
					}
	  		}
	  	}
	  	setCookie("order_list",new_order_value,3650);
	  }

		///轉譯成html
		$("#all_order_list").html("");
		order_view_all();
	}



	$("#clear_all_order").dblclick(function() {
		setCookie("order_list","",3650);
		///轉譯成html
		$("#all_order_list").html("");
		order_view_all();
	});


	$("#go_order").click(function() {
		run_order();
	});


	$(".spanjob").live("dblclick",function() {
	      kk=$(".spanjob").index(this);
	      kk_sjob=$(".spanjob").eq(kk).html();
	      kk_sjob_ary=kk_sjob.split(",@,");
	      new_order_value="";

	      old_order_value=getCookie("order_list");
	      if(old_order_value)
	      {
	      	old_order_ary=old_order_value.split("\n");
	      	for(i=0;i<old_order_ary.length;i++)
	      	{
      	 		old_order_times=old_order_ary[i].split("#");
	      	 	if(old_order_times[1]==kk_sjob_ary[2])
	      	 	{
	      			continue;
	      		}
	      		else
	      		{
	      			if(new_order_value)
							{
								new_order_value=new_order_value+"\n"+old_order_ary[i];
							}
							else
							{
								new_order_value=old_order_ary[i];
							}
	      		}

	      	}
	      	setCookie("order_list",new_order_value,3650);
	    	}
	    	///轉譯成html
				$("#all_order_list").html("");
				order_view_all();
	    });





  $("#jobs").change(function() {
      select_option(this.value);
    });



}





function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function checkCookie()
{
username=getCookie('username');
if (username!=null && username!="")
  {
  	//alert('Welcome again '+username+'!');
  }
  else
  {
  username=prompt('Please enter your name:',"");
  if (username!=null && username!="")
    {
    setCookie('username',username,3650);
    }
  }
}


