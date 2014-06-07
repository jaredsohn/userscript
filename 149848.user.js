// ==UserScript==
// @name        yiyi.cc for firefox
// @namespace   http://www.ibm.com/developerworks/cn/
// @description yiyi.cc for firefox by laojiang
// @include     http://*.yiyi.cc/film*/1*
// @include     http://*.yiyi.cc/film*/2*
// @include     http://*.yiyi.cc/film*/3*
// @include     http://*.yiyi.cc/film*/4*
// @include     http://*.yiyi.cc/film*/5*
// @include     http://*.yiyi.cc/film*/6*
// @include     http://*.yiyi.cc/film*/7*
// @include     http://*.yiyi.cc/film*/8*
// @include     http://*.yiyi.cc/film*/9*
// @version     0.1
// ==/UserScript==

//本人菜鸟，这是本人的第一个脚本
//功能就是在firefox下直接调用本地百度影音或qvod播放网页内的电影，突破yiyi.cc只能在IE下的问题。故起名 yiyi.cc for firefox
//请大家多多支持，此脚本暂时仅支持一一影院，一一影院网址：www.yiyi.cc，请大家测试。
//测试方法很简单，选择要看的电影，在“播放地址”百度影音，选择要看的版本，dvd的，或是BD，或HD版本。
//在弹出的新网页中，有影片的真实地址，点击左边的播放按钮，就弹出播放器的界面，自动播放了。
//欢迎大家测试。
//如有有什么问题，请大家反馈给我，我将及时修复。
//本人空间：hi.baidu.com/icetion
//本人邮箱：junshengnan1000@gmail.com 有时间会视情况而回复大家，谢谢。
//                                                                     老蒋
//                                                                    2012.10.7


//  function过程开始////////////////

function Event_add(){  
	for (var i=0;i<arry_list1.length;i++){
		var obj = new Object();  
		obj.name = arry_list1[i];
		var button ="Button"+String([i+1]);
		var button_click="button"+String(i)+"_click"
		var button_click = document.getElementById(button);
		AttachEvent(button_click, "click",  sendARGS, obj); 
	}
 
}


function AttachEvent(target, eventName, handler, argsObject){  //传递参数
    var eventHandler = handler;
    if(argsObject){
        eventHander = function(e){
            handler.call(argsObject, e);
        }  
    }  
    if(window.attachEvent){//IE  
    target.attachEvent("on" + eventName, eventHander );
    }  
    else {//FF  
        target.addEventListener(eventName, eventHander, false);
    }
}  

function button_add(){
   var divFF = document.getElementsByTagName("div"); 
   for(var i=0; i<divFF.length; i++){ 
        if(divFF[i].className == "box"){ 
       	   divFF[i].innerHTML="";
		       for(var j=0 ;j<arry_list1.length;j++){
	      	     var a_s = '<input id="Button'+String(j+1)+'" target="_blank" type="button" value="播放"> ';
	      	     var html_h='<h30>'+arry_list1[j]+'</font></h30>';
	      	     var textarea ='<div><textarea cols="160" rows="1" id="textarea'+String(j+1)+'">'+arry_list1[j]+'</textarea></div>';
                 divFF[i].innerHTML =a_s + html_h + "<br>" +divFF[i].innerHTML;
	      	      //console.warn(divFF[i].innerHTML);
	          }
           break;
        } 
   } 
}


function left(mainStr,lngLen){
	if (lngLen>0){
      //console.warn("mainstr",mainStr.substr(0,lngLen));
      var mainstr = mainStr.substr(0,lngLen);
	  return mainstr;
	}
}


function right(mainStr,lngLen){
	// alert(mainStr.length)
	if (mainStr.length-lngLen>=0 && mainStr.length>=0 && mainStr.length-lngLen<=mainStr.length) {
	return mainStr.substring(mainStr.length-lngLen,mainStr.length)
	}
	else{
	return null
	}
}

function mid(mainStr,starnum,endnum){
	if (mainStr.length>=0){
	return mainStr.substring(starnum,endnum)
	}
	else{
	return null
	}
	//mainStr.length
} 

function sendARGS(){
   //alert(this.name);
   var list=escape(this.name);
   //console.warn("list",list);
   var header_name =left(this.name,4);
   //console.warn("header_name",header_name);
   if(header_name == "bdhd" ){
	var url="http://icetion.webng.com/Bdhdplaying_movies.htm?list="+list;
   } 
   else{
    var url="http://icetion.webng.com/Qvodplaying_movies.htm?list="+list;
   }
   
   //document.location.assign(url);转到url页面
   //弹出播放框
   //var w=screen.availWidth-60;
   //var h=screen.availHeight-60;
   var w=620;//宽度
   var h=535;//高度
   var swin=window.open(url,"BGSMbest","scrollbars=yes,status,location=0,menubar=0,toolbar=0,resizable=no,top=0,left=0,height="+h+",width="+w);
   window.opener=null;
   //window.close();
}


function Bdhd_test(str){
   var regux =/bdhd:\/\/([\s\S]+?)\.(avi|flv|rmvb|rm|wmv|mp4|mkv|mpg|mpeg)/;
   var ss = regux.exec(str);
	if(ss == null){
	   return "空";
	}
return ss[0];
}


function Qvod_test(str){
   var regux =/qvod:\/\/(?:[^|]+\|){3}/;
   var ss = regux.exec(str);
	if(ss == null){
	   return "空";
	}
return ss[0];
}


function Http_test(str){
   var regux =/(http|ftp):\/\/[^\"$|]+\.(avi|flv|rmvb|rm|wmv|mp4|mkv|mpg|mpeg|)/;
   var ss = regux.exec(str);
	if(ss == null){
	   return "空";
	}
return ss[0];
}

//  function过程结束////////////////

//  Main过程开始////////////////


var videolist = unsafeWindow.VideoInfoList;
videolist=String(videolist);
console.warn(videolist);
var arry_list= new Array();//原始videolist数组
var arry_list1=new Array();//筛检过的videolist数组，去除youku，tudou等播放源
arry_list = videolist.split("#");
for (i = 0 ; i < arry_list.length ;i++ ){   
        //console.warn("修改前arry_list"+String(i),arry_list[i]);  //分割后的字符输出
        var list_playstr = Bdhd_test(arry_list[i]);
	    if(list_playstr != "空"){
	    	arry_list[i]=list_playstr;
	    	arry_list1[i]=arry_list[i];
	    	console.warn("修改后arry_list1_"+String(i),arry_list1[i]);  //分割后的字符输出
	    	continue;
	    }
	    list_playstr = Qvod_test(arry_list[i]);
	    if(list_playstr != "空"){
	    	arry_list[i]=list_playstr;
	    	arry_list1[i]=arry_list[i];
	    	console.warn("修改后arry_list1_"+String(i),arry_list1[i]);  //分割后的字符输出
	    	continue;
	    }
	    list_playstr = Http_test(arry_list[i]);
	    if(list_playstr != "空"){
	    	arry_list[i]=list_playstr;
	    	arry_list1[i]=arry_list[i];
	    	console.warn("修改后arry_list1_"+String(i),arry_list1[i]);  //分割后的字符输出
	    	continue;
	    }
} 
//console.warn("arry_list1长度",arry_list1.length); 调试用
button_add();
//console.warn("bdhd",bdhd_str);调试用
//console.warn("head",document.head.innerHTML);调试用
Event_add();



