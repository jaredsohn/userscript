// ==UserScript==
// @name       百度云插件+APIKey
// @namespace  
// @version    4.1.1 beta
// @description  Thank w3schools.com/ w3school.com.cn,this userscript uses some codes from 'douban movie cse'.And I have modified the source code,such as adding some animotion effects to it
// @description  For more imformation,please email me at wang0xinzhe@gmail.com. 
// @match      http://pan.baidu.com/disk/*
// @match      https://pan.baidu.com/disk/*
// @match      https://yun.baidu.com/#from=share_yun_logo/
// @match      http://yun.baidu.com/#from=share_yun_logo/
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @copyright  2014,04,20 __By Wang Hsin-che   
// ==/UserScript==
function cEle(e){
	e=document.createElement(e);
	return e;
}
var url='https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&rsz=filtered_cse&num=10&hl=en&prettyPrint=true&source=gcsc&gss=.com&sig=ee93f9aae9c9e9dba5eea831d506e69a&cx=018177143380893153305:yk0qpgydx_e&q=';//&q=windows&start=0';
var showList='';
var totalResults=0;
var frontIndex=0;
var pageIndex=0;
var tempNode;

var myDivHeight=window.innerHeight/4*3;
var myDivWidth=window.innerWidth/2;
var myDivLeft=-window.innerWidth/6;
var myDivTop=window.innerHeight/8;

var myWebPage=cEle('div');
var searchFrame=cEle('div');
myWebPage.myDiv=myWebPage.appendChild(cEle('div'));
	myWebPage.myDiv.htmlTitle=myWebPage.myDiv.appendChild(cEle('div'));
		myWebPage.myDiv.htmlTitle.closeButton=myWebPage.myDiv.htmlTitle.appendChild(cEle('a'));
	myWebPage.myDiv.content=myWebPage.myDiv.appendChild(cEle('div'));
	myWebPage.myDiv.htmlBotton=myWebPage.myDiv.appendChild(cEle('div'));
		myWebPage.myDiv.htmlBotton.nextPageButton=myWebPage.myDiv.htmlBotton.appendChild(cEle('a'));
		myWebPage.myDiv.htmlBotton.frontPageButton=myWebPage.myDiv.htmlBotton.appendChild(cEle('a'));
searchFrame.inputBox=searchFrame.appendChild(cEle('input'));
searchFrame.searchButton=searchFrame.appendChild(cEle('input'));

$('.info:eq(0)').prepend(myWebPage);	
$('#top_menu_other').replaceWith(searchFrame);//替换了广告	

$(searchFrame.searchButton).click(function(){frontIndex=0;pageIndex=0;search(searchFrame.inputBox.value);});
$(myWebPage.myDiv.htmlTitle.closeButton).click(function(){$(myWebPage.myDiv).slideUp();searchClear();});
$(myWebPage.myDiv.htmlBotton.nextPageButton).click(function(){if(pageIndex<totalResults){search(searchFrame.inputBox.value);}else{alert("It is the last page!");}});
$(myWebPage.myDiv.htmlBotton.frontPageButton).click(function(){if(frontIndex>=0){pageIndex=frontIndex;search(searchFrame.inputBox.value);}else{alert("It is the top page!");}});
$(searchFrame.inputBox).keyup(function(event){if(event.which==13){$(searchFrame.searchButton).trigger('click');}});

//searchFrame.className='search-form';
searchFrame.inputBox.className='wxz-search-query';
searchFrame.inputBox.placeholder=" 搜索公开分享文件";
searchFrame.searchButton.type='button';
searchFrame.searchButton.value='GO';
searchFrame.searchButton.className='wxz-search-button';



myWebPage.className='wxz-page';
myWebPage.myDiv.className='wxz-myDiv';
// myWebPage.myDiv.style.minHeight=myDivHeight+'px';
myWebPage.myDiv.style.height=myDivHeight+'px';
myWebPage.myDiv.style.width=myDivWidth+'px';
myWebPage.myDiv.style.left=myDivLeft+'px';
myWebPage.myDiv.style.top=myDivTop+'px';
myWebPage.myDiv.htmlTitle.className='wxz-title';
myWebPage.myDiv.htmlTitle.closeButton.innerHTML='<b><font color="#ffffff">x</font></b>';
myWebPage.myDiv.htmlTitle.closeButton.className='wxz-close';
myWebPage.myDiv.content.className='wxz-content';
myWebPage.myDiv.content.style.height=(myDivHeight-40)+'px';
myWebPage.myDiv.htmlBotton.nextPageButton.innerHTML='<font color="#333">[-->]</font>';
myWebPage.myDiv.htmlBotton.nextPageButton.className='wxz-next';
myWebPage.myDiv.htmlBotton.frontPageButton.innerHTML='<font color="#333">[<--]</font>';
myWebPage.myDiv.htmlBotton.frontPageButton.className='wxz-front';        																									
	
	
					

function searchClear(){
	searchFrame.inputBox.value='';
	showList='';
	tempNode='';
	frontIndex=0;
	pageIndex=0;
	$(myWebPage.myDiv.content).empty();//清空原来的内容
}


function search(keyword){
	if (keyword==''){
		console.log('fail');
		return 1;
	}
	myWebPage.myDiv.content.innerHTML='<img src=http://www.scienceq.org/images/loading_pdf.gif>';
	$(myWebPage.myDiv).slideDown();
	$.getJSON(url+keyword+'&start='+pageIndex,function(Data){	                                                                           
				frontIndex=pageIndex-10;
				totalResults=parseInt(Data.cursor.estimatedResultCount,10);
				$(myWebPage.myDiv.content).empty();//清空原来的内容
        showList="<p align='right'>---- by Google Custome Search </p><p white-space='normal' class='temp' >keyword is    '"+keyword+"'    found  '"+Data.cursor.resultCount+"'  Results</p><p>--------------------------------------------------<p>";
				$.each(Data.results,function(index,element){
					pageIndex++;
					tempNode='<a href="'+element.unescapedUrl+'"target="_blank">'+element.titleNoFormatting+'</a>';
					showList+='<p><p class="myTitle">'+tempNode+'</p>';
					showList+='<p class="mySnippet">'+element.contentNoFormatting+'</p>';
					});				
				showList+='<p><p>-------------------------------------------------------------<p class="temp" margin-left="20px">"'+pageIndex+'"  items have been load </p><p align="right"><a href="http://userscripts.org/users/608364" target="_blank"><font color="#333">About me</font></a></p>';
				$(myWebPage.myDiv.content).append(showList);//必须用+=  然后一次性添加  否则会刷新原来的内容
        if(Data.cursor.resultCount==0){myWebPage.myDiv.content.innerHTML='<div align="center"><img  src=http://blog.fpweb.net/media/2011/11/No-Search-Results-325x287.png></div>';}
				$(myWebPage.myDiv.content).scrollTop(0);//到顶端
			}).fail(function() {
        myWebPage.myDiv.content.innerHTML='<img src=http://icongal.com/gallery/image/297514/cancel_quit_terminate_exit_error_close_delete.png>';
			console.log( "error" );																												
		  })
		  .always(function() {
			console.log( "search and list complete" );
		  });
	}



$(function(){
var cssText='.wxz-title{background:#353636};\
.wxz-search-query{ padding: 0px; margin: 0px; height: auto; outline: none; background-color: rgb(255, 255, 255); background-position: 0% 50%; background-repeat: no-repeat no-repeat;}\
.wxz-search-button{cursor:pointer;margin-left:5px;background-color: rgb(155, 154, 154); border-bottom-color: rgb(102, 102, 102);border-bottom-style: solid;border-bottom-width: 1px;border-collapse: separate;border-left-color: rgb(102, 102, 102);border-left-style: solid;border-left-width: 1px;border-right-color: rgb(102, 102, 102);border-right-style: solid;border-right-width: 1px;border-top-color: rgb(102, 102, 102);border-top-style: solid;border-top-width: 1px;color: #ffffff;height: auto;width: 30px;}\
				.wxz-myDiv{display:none;z-index:99;box-shadow:0 0 9px rgba(0,0,0,.9);background:#FFFFFF;position:absolute;outline:0 none;}\
				.wxz-content{line-height: 200%;text-align: left;white-space: normal;margin-left:20px;overflow:scroll;}\
				.wxz-close{margin-right:20px;important;height:20px;cursor:pointer}\
				.wxz-next{margin-right:20px;float:right;height:20px;cursor:pointer}\
				.wxz-front{margin-right:40px;float:right;height:20px;cursor:pointer}\
				.wxz-page a{color:#0066FF!important;font: 14px/1.5 arial,sans-serif!important;}\
				';
    
var style =cEle('style');
style.type='text/css';
style.innerHTML=cssText;
$('head:first').append(style);
});