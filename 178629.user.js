// ==UserScript==
// @name        Douban_helper_for_SYSU
// @description 为豆瓣图书增加中大图书馆藏，为豆瓣电影增加博济搜索结果
// @author      Hanchy Hill
// @namespace   http://g.mozest.com/
// @include     http://book.douban.com/subject/*
// @include     http://202.116.64.108:8080/apsm/recommend/recommend_nobor.jsp*
// @include     http://movie.douban.com/subject/*
// @require     http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @version     1.2.1
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_openInTab
// @grant GM_deleteValue
// @updateURL   https://userscripts.org/scripts/source/178629.meta.js
// @downloadURL https://userscripts.org/scripts/source/178629.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/3336cdf5d2af706879736963616c6a32
// ==/UserScript==

///创建全局对象
var helper = {
  libraryId: "12228008",//请填入自己的学号如 12228008 
  libUrl: 'http://202.116.64.108',
  isbnUrlSuffix: ':8991/F/?func=find-b&find_code=ISB&request=',
  allUrlSuffix: ':8991/F/?func=find-b&find_code=WRD&request=',

  book: {
    meta: {},
    recommend: {},
    libStat: {}
  },
  pages: {
    subject: {}
  },
  main: {}
};

//////////////////////////////
///////博济在线搜索全局对象//
    var BJ_helper = {
        searchUrl :"",
        hostUrl : "http://www.bojistudio.org",

    };

///////////////////////////////
// Get book information for library input
helper.book.meta = function (){

  var author = $('#info a ').html();
  if (author !== null){
    author = author.trim();
  }

  var publisher = /出版社: (.*)/.exec($('#info').text());
  if (publisher !== null){
    publisher = publisher[1].trim();
  }

  var pubdate = /出版年: (.*)/.exec($('#info').text()); 
  if (pubdate !== null){
    pubdate = /[\d]+/.exec(pubdate[1].trim());
    pubdate = pubdate[0];
  }

  var price = /定价: (.*)/.exec($('#info').text());
  if (price !== null){
    price = price[1].trim();
  }

  var isbn = /ISBN: (.*)/.exec($('#info').text());
  if (isbn !== null){
    isbn = isbn[1].trim();
  }
  var bookIndex = /统一书号: (.*)/.exec($('#info').text());
  if (bookIndex !== null){
    bookIndex = bookIndex[1].trim();
  }

  var rating = $('#interest_sectl .rating_num').text().trim();
  if (!rating) {
    rating = '暂无评分';
  }

  return{
    title: $('h1 span').html(),
    author: author,
    publisher: publisher,
    pubdate: pubdate,
    price: price,
    isbn: isbn,
    bookIndex: bookIndex,
    rating: rating
  };
};
///////////////////////////////


// Douban book page
helper.pages.subject = function(){
  var isbn = $("#info").contents().slice(-3, -2)[0].nodeValue.trim();
  helper.book.libStat(isbn);
};
//////////////////////////////////////////

//////////////豆瓣网页荐购获取/////////////////////////
recommendBook = function(){
  var style = ('style="' +
                         'display: inline-block; ' +
                         'background: #33A057; ' +
                         'border: 1px solid #2F7B4B; ' +
                         'color: white; ' +
                         'padding: 1px 10px; ' +
                         'border-radius: 3px; ' +
                         'margin-right: 8px;" '
  );


  statBtn = ('<a href="#recform" id="recbtn" rel="modal:open"' + 
      style + '>荐购</a>' );

  var allBook = '<div class="gray_ad" id="sysulib"><h2>中大ISBN检索</h2>' ; 
  allBook += '<ul><li>ISBN查询无此书'+statBtn+'</li></ul>';
  allBook += '</div>'; 
  $('.aside').prepend(allBook);

  $("#recbtn").click(function(){
      var bookMeta = helper.book.meta();
      //alert(bookMeta.bookIndex);

      GM_setValue('doubanTitle',bookMeta.title);
      GM_setValue('doubanAuthor',bookMeta.author);
      GM_setValue('doubanPublisher',bookMeta.publisher);
      GM_setValue('doubanPubdate',bookMeta.pubdate);
      GM_setValue('doubanIsbn',bookMeta.isbn||bookMeta.bookIndex);
      GM_setValue('doubanPrice',bookMeta.price);
      GM_setValue('doubanRating',bookMeta.rating);
      GM_openInTab("http://202.116.64.108:8080/apsm/recommend/recommend_nobor.jsp");

  });
  
}
/////////////////////豆瓣处荐购结束///////////////////////////////////////


//////////////////图书馆荐购页面Main//////////////////////////////////////

libMain = function(){
    
    if(GM_getValue('doubanTitle')){
      $('[name="Z13_TITLE"]').val(GM_getValue('doubanTitle','bookMeta.title'));
      $('[name="Z13_AUTHOR"]').val(GM_getValue('doubanAuthor','bookMeta.author'));
      $('[name="Z13_IMPRINT"]').val(GM_getValue('doubanPublisher','bookMeta.publisher'));
      $('[name="Z13_YEAR"]').val(GM_getValue('doubanPubdate','bookMeta.pubdate'));
      $('[name="Z13_ISBN_ISSN"]').val(GM_getValue('doubanIsbn','bookMeta.isbn'));
      $('[name="Z13_PRICE"]').val(GM_getValue('doubanPrice','bookMeta.price'));
      $('[name="Z68_NO_UNITS"]').val(2);
      $('[name="Z303_REC_KEY"]').val(helper.libraryId);
      $('[name="Z46_REQUEST_PAGES"]').val('豆瓣读书得分: '+ GM_getValue('doubanRating','bookMeta.rating'));
      GM_deleteValue('doubanTitle');
      GM_deleteValue('doubanAuthor');
      GM_deleteValue('doubanPublisher');
      GM_deleteValue('doubanPubdate');
      GM_deleteValue('doubanIsbn');
      GM_deleteValue('doubanPrice');
      GM_deleteValue('doubanRating');


  }
  
  //alert(GM_getValue('doubanTitle'));

}
///////////////////图书馆荐购页面结束//////////////////

////////////错误处理/////////////////
error_output = function(error_log,callBackUrl){
            var allBook = '<div class="gray_ad" id="sysulib"><h2>中大图书馆检索</h2>' +
                       '<a href="'+ callBackUrl +'" target="_blank">の~~(╯﹏╰)b</a>'; 
             bookStatus =   '<ul class="ft pl more-after"> ' +
                          '<li style="border: none">' + error_log+'</li>' +
                          '</ul>';
                                                   
           allBook += bookStatus;
            allBook += '</div>' ;

        //判断URL
        if(callBackUrl.indexOf('ISB')!=-1){
          $('.aside').prepend(allBook);
        }
        else{
          $('#buyinfo').before(allBook);        
        }
        return;


}


/////////////////////////////////

//////////////ISBN搜索xml获取//////////////////
testisbn = function(fullurl){
        GM_xmlhttpRequest({ //获取列表
            method : 'GET',
           synchronous : false,
            //url : "http://202.116.64.108:8991/F/?func=find-b&find_code=ISB&request=9787805985824",
            url : fullurl,
            onload : function (reDetails) {
              if (reDetails.status !== 200){
                //alert("ISBN连接错误");后续版本再处理
                return;
              }

              if(reDetails.responseText.indexOf('f-alert.gif')!=-1){
                  //alert("ISBN查无此书"); //增加荐购
                  hasBook = false;
                  recommendBook();
                  return;
              }


                var frame =document.createElement("div");
                frame.innerHTML = reDetails.responseText;
                //alert(frame.innerHTML);
                if(reDetails.responseText.indexOf('Search Results')!=-1){
                    //alert("跳转到搜索页");
                    showall(frame.innerHTML,fullurl);
                }
                else{
                  showisbn(frame.innerHTML,fullurl);
                }
                

            }
        });

}
/////////////////////////////////////////

///////////////全字段搜索xml获取/////////////
testall = function(fullurl){
        var error_log;
        GM_xmlhttpRequest({ //获取列表
            method : 'GET',
           synchronous : false,
            //url : "http://202.116.64.108:8991/F/?func=find-b&find_code=WRD&request=%E5%8F%A4%E6%96%87%E8%A7%82%E6%AD%A2",
            url : fullurl,
            onload : function (reDetails) {
              if (reDetails.status !== 200){
                error_log = "搜索连接错误";
                error_output(error_log,fullurl);
                //alert("全字段搜索连接错误");
                return;
              }

              if(reDetails.responseText.indexOf('f-alert.gif')!=-1){
                  //alert("全字段查无此书");
                  error_log = "全字段查无此书";

                  hasBook = false;
                  error_output(error_log,fullurl);
                  return;
              }
                var frame =document.createElement("div");
                frame.innerHTML = reDetails.responseText;
                if(reDetails.responseText.indexOf('Search Results')!=-1){
                    //alert("跳转到搜索页");
                    showall(frame.innerHTML,fullurl);
                }
                else if(reDetails.responseText.indexOf('记录数')!=-1){
                    error_log = "搜索页面跳转到了记录数页面，此页面无法获取图书详细信息。";
                    error_output(error_log,fullurl);
                    return;
                }
                else{
                    error_log = "搜索页面跳转到馆藏,<br>如果ISBN查询无结果，说明其跳转到了错误的图书。";
                    error_output(error_log,fullurl);
                    //showisbn(frame.innerHTML,fullurl);
                  return;
                  //alert("全字段跳转ISBN馆藏");//BUG处理,以后再说,基本检索
                  //
                }
            }
        });

}

///////////////////////

////////////获取图书馆藏信息////////////////////

getWhere = function(where,fullurl,eBook){
            //alert(typeof where);
            GM_xmlhttpRequest({ //获取列表
            method : 'GET',
           synchronous : false,
            url : where[0],
            //url : fullurl,//"http://202.116.64.108:8991/F/?func=find-b&find_code=ISB&request=7101003044",
            onload : function (reDetails) {
                var libra =document.createElement("div");
                libra.innerHTML = reDetails.responseText;
                getBookinfo(libra.innerHTML,fullurl,eBook);//回调函数馆藏位置获取
            }
        });

}
//////////////////////////////////////////////

/////////////////回调函数馆藏位置获取////////////////////////////////////////
getBookinfo = function(webText,fullurl,eBook){
    var hasBook = true
    webText = webText.replace(/[ | ]*\n/g,'').replace(/\n[\s| | ]*\r/g,'').replace(/amp;/g,"");
    //alert(webText);

    ///防止无书籍的情况发生
    if(webText.indexOf('无匹配单册')!=-1){
      //alert('无匹配单册');
      hasBook = false;
      //return;
    }
    else{
    blockBook = webText.match(/OPAC注释(.*?)<\/tbody>/)[1];
    //alert(typeof blockBook);
    borrowItem = blockBook.match(/<tr>.*?<\/tr>/g);
    //alert(borrowItem[0]);
    var loan = new Array;

      for(k=0;k<borrowItem.length;k++){
      loan[k] = borrowItem[k].match(/<!--Loan.*?td1">(.*?)<\/td>.*?date.*?td1">(.*?)<\/td>.*?hour.*?td1>(.*?)<\/td>.*?Sub.*?nowrap="">(.*?)<\/td>/);
    /////借书类型/时间/到期/位置
      }
    }
    /////////////////

      /////////有电子书时//////////
        get_eBook = function(eBook){
          //alert("eBook here");
          bookStatus = '<ul class="ft pl more-after">'+
                      '<li style="border: none">电子书位置:' + '<a href="'+ eBook +'" target="_blank">点击查看</a>'+ '</li>';
          bookStatus += '</ul>';
          allBook += bookStatus;
        }

    ///////////插入框架///////

        var allBook = '<div class="gray_ad" id="sysulib"><h2>中大ISBN检索</h2>' +
                       '<a href="'+ fullurl +'" target="_blank">前往图书馆查看这本书</a>'; 

      if(hasBook){
        //alert("hasBook");
        for(s=0;s<borrowItem.length;s++){
            if(eBook){get_eBook(eBook);};
           bookStatus =   '<ul class="ft pl more-after"> ' +
                          '<li style="border: none">单册状态:' + loan[s][1]+
                          '<span style="position:relative; left:20px;">应还日期: ' + loan[s][2].replace(/<br>/,"") +'</span></li>' + 
                          //'<li style="border: none">到期: ' + loan[s][3] + '</li>' +
                          '<li style="border: none">分馆: ' + loan[s][4] + '</li>' +
                          '</ul>';
                          
                         
           allBook += bookStatus;
           //alert(allBook);      
        }
      } 
      else{ //在无馆藏信息时，查看是否有电子书
        if(eBook){
            get_eBook(eBook);
        }
      }
        allBook += '</div>' 
        $('.aside').prepend(allBook);
    //////////////////////完成框架插入//////////////
}
/////////////////////////////////////



/////////////////////////isbn检索回调函数///////////////
function showisbn(gettxt,fullurl){

    str = gettxt;
    str = str.replace(/[ | ]*\n/g,''); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,''); //去除多余空行
    str = str.replace(/amp;/g,""); //去除URL转码
    //alert(str);


    ///获取一整块
    var eBook;
    eBook = null;
    if(str.match(/电子资源定位/)){
      eBook = str.match(/电子资源定位.*?jpg.*?border="0">(.*?)<\/a>/)[1];
    }

    str = str.match(/全部馆藏(.*?)所有单册借阅状态/g)
    //alert(typeof str[0]);
    var txt = str[0];
    txt = txt.match(/http:.*?sub_library=/);
    //alert(txt);
   // alert(eBook);
    getWhere(txt,fullurl,eBook);
 
}
///////////////////////


/////////////////回调函数全字段搜索////////////////
function showall(txt,urltext){

    str = txt;
    str = str.replace(/[ | ]*\n/g,''); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,''); //去除多余空行
    str = str.replace(/amp;/g,""); //去除URL转码
    atxt= str.match(/col2">.*?<\/table>/g)

    ///////获取图书馆书本元信息//////
    var bookDetail = new Array();//元信息数组
    atxt.shift();//去除整块信息中的多余信息

    for(s=0;s<atxt.length;s++){
       // bookDetail[s] = atxt[s].match(/a[ ]href="(.*?)">(.*?)<\/a>.*?"top">(.*?)<\/td>.*?"top">(.*?)<\/td>.*?"top">(.*?)<\/td>.*?"top">(.*?)<\/td>.*?sub_library=(.*?)<\/table>/).slice(1);
        // 超链接/ 书名 /作者 / 索引号/出版社 /年份 /藏书信息(由于有些书无馆藏，暂时不获取)
        //if(!bookDetail[s]){ //如果没有馆藏信息
          bookDetail[s] = atxt[s].match(/a[ ]href="(.*?)">(.*?)<\/a>.*?"top">(.*?)<\/td>.*?"top">(.*?)<\/td>.*?"top">(.*?)<\/td>.*?"top">(.*?)<\/td>/).slice(1);
          // 超链接/ 书名 /作者 / 索引号/出版社 /年份 /
    }

      ////////框架//////////////////////////////////

        hasBook = true;

      if(hasBook){

       //判断URL类型
       if(urltext.indexOf('ISB')!=-1){
        var allBook = '<div class="gray_ad" id="sysulib"><h2>中大ISBN检索</h2>' +
                       '<a href="'+ urltext +'" target="_blank">前往图书馆查看这本书</a>'; 
       }
       else{
        var allBook = '<div class="gray_ad" id="sysulib"><h2>中大图书馆检索</h2>' +
                       '<a href="'+ urltext +'" target="_blank">前往图书馆查看这本书</a>';         
       }
       //alert(allBook);
        var display;
        for(s=0;s<bookDetail.length;s++){
            if(s>4){
              display=" ;display : none";
            }
            else{
              display="";
            }

           bookStatus =   '<ul class="ft pl more-after"> ' +
            '<li style="border: none"><a href="'+bookDetail[s][0]+'"target="_blank">书名:' + bookDetail[s][1]+ '</a></li>' +
                          '<li style="border: none'+display+'"><a >作者: ' + bookDetail[s][2] +'</a>' + 
                          '<a style="position:relative; left:15px;">出版社:' + bookDetail[s][4] + '</a></li>' +
                          //'<li style="border: none'+display+'"><a >出版社: ' + bookDetail[s][4] + '</a></li>' +
                          //'<li style="border: none'+display+'"><a >年份: ' + bookDetail[s][5] + '</a></li>' +
                          '</ul>';
                                                 
           allBook += bookStatus;      
        }
        //alert(allBook);
        allBook += '</div>' 

        //判断URL
        if(urltext.indexOf('ISB')!=-1){
          $('.aside').prepend(allBook);
        }
        else{
          $('#buyinfo').before(allBook);        
        }
      ///////////////判断URL

      } 
      ////////////插入框架结束//////////////
}
///////////////////////////回调结束/////


//////////豆瓣执行Main///////
doubanMain = function(){
  var bookMeta = helper.book.meta();
  var URItitle = encodeURI(bookMeta.title);
  //alert(URItitle);
  var isbn = $("#info").contents().slice(-3, -2)[0].nodeValue.trim();
  var findUrl = helper.libUrl + helper.isbnUrlSuffix + isbn;
  //alert(findUrl);
  var allfindUrl =helper.libUrl + helper.allUrlSuffix + URItitle;

  testall(allfindUrl);
  testisbn(findUrl);
} 
///////////////////////////////

//////////////////////////////////////

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
if(location.href.indexOf('movie')!=-1){
  BJ_movie();//执行豆瓣电影页面主Func.
}


if(location.href.indexOf('book')!=-1){
  doubanMain();//执行豆瓣图书页面主Func.
}



if(location.href.indexOf('recommend_nobor')!=-1){
  libMain();//执行图书馆荐购页面主Func.
}



