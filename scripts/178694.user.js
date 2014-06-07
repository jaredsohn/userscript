// ==UserScript==
// @name        boji_search_in_douban_movie
// @description 为豆瓣电影页面添加博济在线的搜索信息
// @author      Hanchy Hill
// @namespace   https://minhill.com
// @include     http://movie.douban.com/subject/*
// @require     http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @version     1.2.2
// @updateURL   https://userscripts.org/scripts/source/178694.meta.js
// @downloadURL https://userscripts.org/scripts/source/178694.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c9906c7272713336390802
// ==/UserScript==

///////博济在线搜索全局对象//
    var BJ_helper = {
        searchUrl :"",
        hostUrl : "http://www.bojistudio.org",

    };


/////////////通过title获取搜索URL//////////////////
getSearchLink = function(){  
  var movie_titleFull = $("title").text().replace(" (豆瓣)\n","").replace(/\n[ ][ ]*/g,"");//去除前面的回车和空格，去除后面的豆瓣
  var movie_title = movie_titleFull.replace(/[ ].*/,"");//去除正题之外的文字，如英文名，第几季等等

  ////////////名字只有英文和数字时回退///////////////////
  var titleTest =  movie_title.match(/\w*/g);

  if(titleTest[0].length == movie_title.length){//防止只有英文名时只截取到第一个单词
    movie_title = movie_titleFull;
  }
  ///////////////////////


  //alert (movie_title);
  movie_title = encodeURI(movie_title);
  var boji_urlSearchIndex = "http://www.bojistudio.org/searchkeyword?t=-1&k=";
  var boji_fullurl = boji_urlSearchIndex + movie_title;
  return boji_fullurl;
}
////////////////////////////////////////////

/////////////////////构建初始框架//////////////////////////////

initial_frame = function(callBackUrl){
        var allMovie =  '<div class="gray_ad" id="boji_movie"><h2>博济在线检索</h2>' +
                        '<a href="'+ callBackUrl +'" target="_blank">点击进入博济搜索页面</a>';                                  
            allMovie += '<div id="boji_addlist"></div>';
            allMovie += '</div>' ;

          $('.aside').prepend(allMovie);
}
//////////////////////////////////////////////////

////////////////////获取搜索页内容//////////////////////////////
xml_getSearch = function(fullurl){
        GM_xmlhttpRequest({ //获取列表
            method : 'GET',
           synchronous : false,
            url : fullurl,
            onload : function (reDetails) {
              if (reDetails.status !== 200){
                BJ_error_output("连接错误");
                return;
              }
                //alert(typeof reDetails.responseText);//string
                var frame =document.createElement("div");
                frame.innerHTML = reDetails.responseText;
                //alert(frame.innerHTML);
                find_item(frame.innerHTML,fullurl);
            }
        });

}
//////////////////////////////////////////////////

///////////////////错误处理模块////////////////////////////////
BJ_error_output = function(error_log){  
    errorStatus = '<ul class="ft pl more-after" style="border-top: 1px dashed #DDDDDD"> ' +
                  '<li>'+ error_log+'</li>'+
                  '</ul>';

    $('#boji_addlist').prepend(errorStatus);

}
/////////////////////////////////////////////////////

///////////////////////获取检索条目///////////////////////////
function find_item(gettxt,fullurl){
    

    str = gettxt;
    str = str.replace(/[ | ]*\n/g,''); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,''); //去除多余空行
    str = str.replace(/amp;/g,""); //去除URL转码
    //alert(str);
    var hostUrl = BJ_helper.hostUrl;
    var movie_block;
    var movieDetail = new Array();
    var hasMovie = true;
    if(str.match(/class="info">.*?<a[ ]href=".*?">.*?<\/a>.*?更新.*?个文件/g)){
      movie_block = str.match(/class="info">.*?<a[ ]href=".*?">.*?<\/a>.*?更新.*?<p>(.*?)个文件/g);
      //alert(typeof movie_block);
      //alert(movie_block.length);
    }
    else{
        hasMovie = false;
        BJ_error_output("没有找到相关资源");
        return;
    }

    for(s=0;s<movie_block.length;s++){
          movieDetail[s] = movie_block[s].match(/class="info">.*?<a[ ]href="(.*?)">(.*?)<\/a>.*?更新.*?<p>(.*?个文件)/).slice(1);
          // 超链接/ 资源名 /资源数
          //alert(movieDetail[s][2]);
    }

      if(hasMovie){

        var allMovie = "";
        var display="";

        for(s=0;s<movieDetail.length;s++){

            /*
            if(s>4){
              display=" ;display : none";
            }
            else{
              display="";
            }
            */

           movieStatus =   '<ul class="ft pl more-after" style="border-top: 1px dashed #DDDDDD"> ' +
            '<li ><a href="'+hostUrl+movieDetail[s][0]+'" target="_blank">' + movieDetail[s][1]+ '</a>' +
                          '<span style="position:relative; left:15px;">'+ movieDetail[s][2] +'</span></li>' +
                          '</ul>';
                                                 
           allMovie += movieStatus;      
        }
        //alert(allMovie);
          $('#boji_addlist').append(allMovie);

      } 
}
////////////////////////////////////////////////////


////////////主执行模块/////////
BJ_movie = function(){ 


    BJ_helper.searchUrl = getSearchLink();//获取链接

    initial_frame(BJ_helper.searchUrl);//插入框架
    xml_getSearch(BJ_helper.searchUrl);
}
//////////////////////////////

BJ_movie();

