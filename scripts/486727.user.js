// ==UserScript==
// @name       交大网教自动检测并签到
// @namespace  
// @version    0.1
// @description 
// @require    http://www.xianjian.com/v5/js/jquery.min.js
// @match      http://www.onlinesjtu.com/learningspace/learning/student/left.asp?*
// @copyright  2014+, Jast
// ==/UserScript==


$(function(){
    if(!confirm("是否执行自动下载、签到、点评"))
        return false;
    
var leftA = $('a');
var a_kq=leftA.eq(1);//考勤A链
var stId = a_kq[0].href.match(new RegExp("[\?\&]studentid=([^\&]+)","i") )[1]; //学号
var course = [];//课程    

console.log('===================解析课程===================');
    
    $.get(a_kq[0].href,function(d){
        var reg_kc = new RegExp("courseid=([^\&]+)","i");
        $.each($(d).find('tr'),function(i,t){
            var code = $(t).html();
            if(code.indexOf('courseid=')>-1){
                var kc={};
                kc.id=code.match(reg_kc)[1];
                kc.name=$(t).find('td:eq(0)').text();
                kc.url=$(t).find('a').last()[0].href;
                course.push(kc);            
                
                console.log("发现：《"+kc.name+"》");
            }
        });    
        valQian();
        
    },'html');


// 验证签到
var weekTime =8*24*3600*1000;
function valQian(){
    console.log('===================查询签到情况===================');
    var runDown = false;
    var runCom = false;
    $.each(course,function(i,kc){
     	$.get(kc.url,function(d){
            var x =delCode(d);
            var tdArr = $(x).find('table:eq(1) tr:eq(1) td').slice(1);
            kc.downstatus=tdArr.eq(5).find('img').attr('xrc').indexOf('hook')>-1;//已下载
            var qCom = tdArr.last().text();//是否点评
            kc.comUrl=tdArr.last().find('a')[0].href;//点评页url
            kc.qDay = tdArr.eq(0).text();//课程日期
            var vTime = new Date(kc.qDay).getTime() + weekTime;
            kc.qianUse = qCom=='未填写' && vTime > new Date().getTime();//是否可签
            var expire = qCom=='未填写' && vTime < new Date().getTime();//已过期
            console.log(kc.name + "：" + (kc.qianUse?' %c ':'') + kc.qDay + "=="+(kc.downstatus?'（已下载）':'')+"==" + qCom + (expire?'（已过期）':''),kc.qianUse?"color:red":'');
            if(kc.qianUse)
                runCom = true;
            if(kc.qianUse && !kc.downstatus) 
                runDown = true;
            if(i+1==course.length){
            	 if(runDown)
                    dianBo();
                else
                    console.log("全部已下载，无需再次点播");
                if(runCom)
                    pingjia();
                
            }
    	},'html');
    });
    
  
}
 
//点播   
    function dianBo(){
    	console.log('===================查询点播===================');
        $.get(leftA.eq(3)[0].href,function(d){
            var x =delCode(d,1);
             $.each(course,function(i,kc){
                if(kc.qianUse && !kc.downstatus){
                   var a = $(x).find('a[href$="courseid='+kc.id+'&ishd=0"]');
                   kc.downPage = a[0].href;
                	downLoad(kc);
                }
        	});
        },'html');
    }   
    
//下载
    function downLoad(kc){
        $.get(kc.downPage,function(d){
        	var x =delCode(d,1);
            var trArr = $(x).find('tr');
            for(var i= trArr.length-1;i>=0;i--){
                var td = trArr.eq(i).find('td');
                if(td.eq(2).text()==kc.qDay){
                    var url = td.eq(0).find('a:eq(1)')[0].href;
                    console.log("请求："+kc.name+"-"+kc.qDay+"-"+td.eq(1).text());
                    reqUrl(url);
                }else{
                	break;
                }
            } 
        },'html');
    }    
    
//点评    
    function pingjia(){
        if(!confirm("是否跳转评价页面"))
            return false;
        console.log('===================进行评价===================');
        $.each(course,function(i,t){
            if(t.qianUse)
                window.open(t.comUrl);
               /* $.get(t.comUrl,function(d){
                    var x =delCode(d);
                    
                    console.log(x);
                },'html');*/
        });    	
    }
    
//清除脚本与图片加载
    function delCode(d,savePic){
        var x = d;
        if(savePic!=1)    
    		//x = d.replace(/src=\"([^\&]+)\"/g,'xrc');
            x = d.replace(/src=/g,'xrc=');
        var s = x.indexOf('<html>');
        if(s==-1)
            s = x.indexOf('<HTML>');
        var e = x.indexOf('</html>');
        if(e==-1)
            e = x.indexOf('</HTML>');
        return x.substr(s,e);
    }   
    
//请求
    function reqUrl(url){
    	var xx = document.createElement('script');	
		xx.src=url+"&r="+Math.random();	
		document.getElementsByTagName('body')[0].appendChild(xx);
    }
    
    
});