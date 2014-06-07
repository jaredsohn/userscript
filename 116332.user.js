// ==UserScript==
// @name            douban_shenzhenLib
// @namespace       http://userscripts.org/scripts/show/116332
// @description     为豆瓣书籍页面(book.douban.com)添加书籍在深圳图书馆的信息，预借链接，为深圳图书馆书籍信息页面添加书籍在豆瓣的评分，链接
// @version         1.24.4
// @require         http://autoupdate.sinaapp.com/autoupdatehelper.js
// @include         http://book.douban.com/*
// @include         http://www.douban.com/doulist/*
// @include         http://www.szlib.gov.cn/Search/searchdetail.jsp*
// @include         http://www.szlib.gov.cn/Search/searchshow.jsp*
// @include         http://opac.nslib.cn/Search/searchdetail.jsp*
// @include         http://opac.nslib.cn/Search/searchshow.jsp*
// @include         http://www.szln.gov.cn/Search/searchdetail.jsp*
// @include         http://www.szln.gov.cn/Search/searchshow.jsp*
// @include         http://218.17.147.50/Search/searchdetail.jsp*
// @include         http://218.17.147.50/Search/searchshow.jsp*
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_addStyle
// @grant           GM_xmlhttpRequest
// @grant           GM_log
// @grant           GM_registerMenuCommand
// @author          morningSky
// @refer           books_recommend_THU and others...
// @updateDate      2013-04-30
/* @reason
1. 深圳图书馆查询系统改版后，调整实现
@end*/
//
// ==/UserScript==

/*
 * opac.nslib.cn 南山，szln.gov.cn 盐田，218.17.147.50 龙岗
 */

/* douban book page contains the reference of jQuery
 * if the page cannot load the jQuery lib, the script does not work yet
 */
if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
  // GM_log("loaded jquery");
}

var thisScript = {
name: "douban_shenzhenLib", 
id: "116332", 
version:"1.24.4"
}

var updater = new Updater(thisScript);
updater.check(24);


var title, isbn;

var SZLIB_HOST = 'http://www.szlib.gov.cn/';
var LIBOPAC_URL = SZLIB_HOST + 'Search/searchshow.jsp?v_tablearray=bibliosm&v_book=on&sortfield=score&sorttype=desc&pageNum=10';

// 查询索书号
var LIBOPAC_URL_CALLNO = SZLIB_HOST + 'Search/getpreholding.jsp?v_curtable=bibliosm&v_recno=';
var LIBBOOK_URL = SZLIB_HOST + 'Search/searchdetail.jsp?v_tablearray=bibliosm&v_curtable=bibliosm&site=null&v_recno=';
var LIBQRYRESERVABLE_URL = SZLIB_HOST + 'Search/getpreLoan.jsp?';
var LIBRESERVE_URL = SZLIB_HOST + 'MyLibrary/Reader-Access.jsp?v_tablearray=bibliosm&v_TableName=80000002&v_recno=';
var HTML_LOADING = '<font color="grey">正在查询图书馆馆藏情况&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;· </font>';


// main body of the script

function isEmptyStr(vStr) {
	return vStr == null || vStr.length == 0 || /^\s*$/.test(vStr);
}

function getLibIsbnUrl(vIsbn) {
    return LIBOPAC_URL + '&v_index=isbn&v_value=' + vIsbn;
}

function getLibTitleUrl(vTitle) {
    return LIBOPAC_URL + '&v_index=title&v_value=' + encodeURIComponent(vTitle);
}

function getDoubanSearchUrl(keyword) {
    return 'http://book.douban.com/subject_search?cat=1001&search_text=' + encodeURIComponent(keyword);
}

function getDoubanSearchLink(keyword) {
    return '<a target="_blank" href="' + getDoubanSearchUrl(keyword) + '" title="点击前往豆瓣查询这本书">在豆瓣搜索</a>';
}

/**
 * keyword, is null, link to search page; 
 * if it's isbn, link is the url contains isbn; else link is url contains title
 */
function getLibSearchLink(keyword, fGTSign) {
    var searchUrl = null;
    if (isEmptyStr(keyword)) {
        searchUrl = SZLIB_HOST + '/Search/search.jsp';
    } else {
        if (/\d+/.test(keyword)) // isbn .substr(0,13)
            //searchUrl = LIBOPAC_URL_ISBN + keyword;
            searchUrl = getLibIsbnUrl(keyword);
        else
            searchUrl = getLibTitleUrl(keyword);
    }
    
    var htmlStr = '<a class="libSearch" target="_blank" href="' + searchUrl
        + '" title="点击前往图书馆搜索">' + (fGTSign? '&gt;&nbsp;':'')
        + '在深圳图书馆搜索</a>';
    return htmlStr;
}

function getLibHeadHtml() {
    var htmlStr = '<ul>';
    // http://www.szln.gov.cn/lib/library.do  
    /*htmlStr += '<li><a style="float:right" target="_blank"  href="http://www.szlib.gov.cn">深圳图书馆</a></li>';*/
    //<span class="membArrow">&nbsp;</span>
    htmlStr += '<li><div class="libMem">';
    htmlStr += '<a class="libMemLink" href="#more" >成员馆</a>';
    htmlStr += '<ul class="libMemMenu">';
    htmlStr += '<li><a href="http://www.szlib.gov.cn" target="_blank" title="深圳图书馆">深圳图书馆</a></li>';
    htmlStr += '<li><a href="http://www.szclib.org.cn/" target="_blank" title="深圳少年儿童图书馆">少年儿童图书馆</a></li>';
    htmlStr += '<li><a href="http://lib.utsz.edu.cn/" target="_blank" title="深圳市科技图书馆">科技图书馆</a></li>';
    htmlStr += '<li><a href="http://www.szlhlib.com.cn/" target="_blank" title="深圳市罗湖区图书馆">罗湖区图书馆</a></li>';
    htmlStr += '<li><a href="http://www.szftlib.com.cn/" target="_blank" title="深圳市福田区图书馆">福田区图书馆</a></li>';
    htmlStr += '<li><a href="http://www.sznslib.com.cn" target="_blank" title="深圳市南山区图书馆">南山区图书馆</a></li>';
    htmlStr += '<li><a href="http://www.szytlib.cn/" target="_blank" title="深圳市盐田区图书馆">盐田区图书馆</a></li>';
    htmlStr += '<li><a href="http://www.balib.com.cn" target="_blank" title="深圳市宝安区图书馆">宝安区图书馆</a></li>';
    htmlStr += '<li><a href="http://www.szlglib.com.cn/" target="_blank" title="深圳市龙岗图书馆">龙岗图书馆</a></li>';
    htmlStr += '</ul></div></li>'; 
    htmlStr += '<li><h2>在深圳图书馆借阅  ·  ·  ·  ·  ·  · </h2></li>';
    htmlStr += '</ul>';
    
    return htmlStr;
}

function setLibMemberStyle() {
    GM_addStyle('\
        #libInfo {\
            overflow: visible;\
        }\
        .libMem {\
            z-index: 97;\
            position: relative;\
            float: right;\
        }\
        .libMemMenu {\
            position: absolute;\
            top: -5px;\
            left: 0px;\
            visibility: hidden;\
        }\
        .libMem a {\
            -moz-border-radius: 7px;\
            -webkit-border-radius: 7px;\
            border-radius: 7px;\
            display: block;\
            background: #eef9eb;\
            padding: 5px;\
            width: 90px;\
            line-height: 160%;\
            border: 1px solid #fff;\
        }\
        .libMem a:hover {\
            background: #FFF;\
            border: 1px solid #aaa;\
            color: #000;\
        }\
        .libMem:hover .libMemMenu {\
            visibility: visible;\
        }\
        .libMem .libMemLink {\
            border: 1px solid #aaa;\
            line-height: 100%;\
            width: 90px;\
        }\
    ');
}

// getpreLoan.jsp?tableList=bibliosm,bibliosm,bibliosm,&metaidList=934991,1209378,698561,
function getReservableQryUrl(bookRecNos) {
    var qryParam = 'tableList=';
    for (var i = 0; i < bookRecNos.length; i++) {
        qryParam += 'bibliosm,';
    }
    // array.toString: arr[0],arr[1],...
    qryParam += '&metaidList=' + bookRecNos + ',';
    // GM_log('Reservable qryUrl: ' + LIBQRYRESERVABLE_URL + qryParam);
    return LIBQRYRESERVABLE_URL + qryParam;
}

/*
 * Append the book link, search link, preserve link, call no with location info
 *
 * @param bookRecNos is an Array
 * The reservable query return a xml: 
 * <root><preloan no='0'>true</preloan><preloan no='1'>false</preloan></root>
 */
function appendLibBookInfo(bookRecNos) {
    if (bookRecNos == null || bookRecNos.length == 0)
        return ;
    
    var fMore = (bookRecNos.length > 1);
    var bookRecNo = bookRecNos[0];// set the first book as default
    var reservableQry_url = getReservableQryUrl(bookRecNos);
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: reservableQry_url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            "Accept": "text/xml" 
        },
        onload: function(res) {
            // the reservable query return is a xml document
            var fHasReservable = false;
            
            //GM_log('preloan xml: ' + res.responseText);
            var xmldata = new DOMParser().parseFromString(res.responseText, "text/xml");
            
            //GM_log('preloan xml: ' + xmldata);
            var preloans = xmldata.getElementsByTagName('preloan');
            for (var i = 0; i < preloans.length;i++) {
                // GM_log('preloan : ' + i + ',  ' + preloans[i].childNodes[0].nodeValue);
                if (preloans[i].childNodes[0].nodeValue == 'true') {
                    bookRecNo = bookRecNos[i];
                    fHasReservable  = true;
                    break;
                }
            }
            
            appendLibBookHtml(bookRecNo, fMore, fHasReservable);

        } // end function(res)
    }
    );  
    
} // end appendLibBookInfo

function appendLibBookHtml(bookRecNo, fMore, fHasReservable) {
    //GM_log('book recNo: ' + bookRecNo + ', fHasReservable: ' + fHasReservable);
    
    var book_url = LIBBOOK_URL + bookRecNo;
    var htmlStr = '';
    htmlStr += '<ul id="libLinks" class="bs" >';//<div class="indent">
    htmlStr += '<li style="border:none"><a id=libBookLink href="' + book_url;
    //title="点击前往图书馆查看"
    htmlStr += '" target="_blank" >到深圳图书馆查看本书</a>';
    if (fMore) {
        htmlStr += '<a class="rr" href="' + getLibIsbnUrl(isbn);
        htmlStr += '" target="_blank" title="查看所有搜索结果">更多. . .</a>';
    }
    htmlStr += '</li>';
    if (fHasReservable) {
        htmlStr += '<li style="border:none"><a class="collect_btn colbutt ll" href="';
        htmlStr += LIBRESERVE_URL + bookRecNo;
        htmlStr += '" target="_blank" title="点击前往图书馆预借登记"><span >预借登记</span></a></li>';
    }
    
    htmlStr += '</ul>'; //</div></div>
    $("#libInfo").html(htmlStr);
    
    appendBookCallNumbers(bookRecNo);
}


/**
 * 添加索书号，位置信息，查询url返回html字符串，结构如下
 * <div class='tab_1'><a title='深圳图书馆 (1)'>深圳图书馆 (1)</a>...</div>
 * <div class="tab_1_main"> 
 *   <div class='tab_1_text'> <table >...</table></div>
 * </div>
 * Table 中结构
 * <thead><tr><td>条码号</td><td>索书号</td><td>所在地点</td></tr></thead>
 * <tr><td>2063032</td><td>K837.12/751-1</td><td>保障本库(6楼)</td></tr>
 */
function appendBookCallNumbers(bookRecNo) {
    if (bookRecNo == -1) 
        return ;
    
    var qryCallNoUrl = LIBOPAC_URL_CALLNO + bookRecNo;
    //GM_log('qryCallNoUrl: ' + qryCallNoUrl);
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: qryCallNoUrl,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
        },
        onload: function(res) {
            //GM_log('res: ' + res.responseText);
            var respTxt = res.responseText;
            // extract the 图书馆分馆名称
            var locs    = null;
            var libLocs = null;
            try
            {
                locs = respTxt.match(/\s+title=["']?.*?["']/igm);
                //GM_log('locs: ' + locs + ', len: ' + locs.length);
                libLocs = respTxt.match(/<div\sclass=["']?tab_2_text["']?.*?<\/div>/igm);
                //GM_log('libLocs: ' + libLocs + ', len: ' + libLocs.length);
            } catch (x) {
                GM_log('book callNo parse has exception');
            }
            
            var htmlStr = getBookCallNumberHtml(locs, libLocs);
            // GM_log('call No html: ' + htmlStr);
            
            if (!isEmptyStr(htmlStr))
                $("#libInfo").append(htmlStr);
        } // end function(res)
    });
    
} // end appendBookCallNumber

function getBookCallNumberHtml(locs, libLocs) {
    if (locs == null || libLocs == null) 
        return '<div class="indent"></div>';
    
    var htmlStr = '';
    htmlStr += '<div class="indent"><table width="100%" title="部分在馆书籍"><tbody>';
    for (var i = 0; i < libLocs.length; i++) {
        // extract Name, remove the first '
        var subLibName = locs[i].match(/["'].*?\s/ig)[0].substr(1).trim();
        //GM_log('loc: ' + subLibName); 
        // extract the 索书号信息行
        var shelfLocs = libLocs[i].match(/<tr><td>[0-9]+.*?<\/td><\/tr>/igm);
        
        //GM_log('shelfLocs: ' + shelfLocs + ', len: ' + shelfLocs.length);
        var callNoArr = new Array();
        for (var j = 0; j < shelfLocs.length; j++) {
            // extract the 索书号, 馆内位置
            var shelfLocArr = shelfLocs[j].match(/<td>.*?<\/td>/igm);
            var callNoStr = shelfLocArr[1];
            // 4 = "<td>".length, 5 = "</td>".length
            callNoStr = callNoStr.substring(4, callNoStr.length-5);
            var shelfLocStr = shelfLocArr[2];
            shelfLocStr = shelfLocStr.substring(4, shelfLocStr.length-5).trim();
            //GM_log('callNo : ' + callNoStr + ', loc: ' + shelfLocStr);
            
            // 索 书 号+馆藏地点 相同的不重复显示
            if (callNoArr.indexOf(callNoStr + shelfLocStr) == -1) {
                callNoArr.push(callNoStr + shelfLocStr);
                htmlStr += '<tr><td style="float:left">&nbsp;索 书 号 : ' + callNoStr + '</td></tr>';
                htmlStr += '<tr style="border-bottom:1px dashed #DDDDDD;"><td style="float:left">馆藏地点: ';
                if (subLibName != shelfLocStr)
                    htmlStr += subLibName + '&nbsp;';
                
                htmlStr += shelfLocStr + '</td></tr>';
            }
        }
    } // end libLocs
    
    htmlStr += '</tbody></table></div>';
    
    return htmlStr;
}

function getDoubanBookTitle() {
    // get book title
    title = $('h1 span').text();
}

function getDoubanBookIsbn() {
    // get book isbn  
    $("#info .pl").each(function(i){
        //GM_log('lib book attr txt:' + $(this).text());
        if ($(this).text() == 'ISBN:' && $(this)[0].nextSibling != null){
            isbn = $(this)[0].nextSibling.nodeValue.trim();
            //GM_log('book isbn txt: [' + isbn + ']');
        }
    });
}

function appendTitleLink_Loading(){
    var htmlStr = '';
    htmlStr += '<div id="libArea">' + getLibHeadHtml();
    htmlStr += '<div id="libInfo"><div class="indent">' + getLibSearchLink(title, false);
    
    if (!isEmptyStr(isbn)) {
        htmlStr += '<ul id="libLoading">' + HTML_LOADING + '</ul>';
    }
    htmlStr += '</div></div></div>';
    $('.aside').prepend(htmlStr);
    setLibMemberStyle();
}

function queryLibByIsbn(vIsbn){
    //GM_log("url : " + getLibIsbnUrl(vIsbn));
    GM_xmlhttpRequest({
        method: 'GET',
        url: getLibIsbnUrl(vIsbn),
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        },
        //onload: loadLibInfo
        onload: function(res) {
            var respTxt = res.responseText;
            //GM_log("respTxt : " + respTxt);
            
            // shenzhenLib search result page will contains below string 
            // if the isbn search find any books
            // parse string: &metaidList=1086672,962940,400742,70483,1184921,'
            var idstr = respTxt.match(/\&metaidList=.*?,\'/igm);
            //GM_log("found metaids : " + idstr);
            var found = (idstr != null );
            if (found ) {
                // parse bookRecNos
                var bookRecNos = idstr[0].match(/\d+/g);
                isbn = vIsbn; // the value might be isbn10
                appendLibBookInfo(bookRecNos);
            } else {
                if (vIsbn.length == 13) {
                    //GM_log('try another value again');
                    setTimeout(function(){
                        appendLibInfoByIsbn10(vIsbn)
                    }, 20);
                } else {
                    $('#libLoading').remove();
                }
            }
        }
    });
}

function appendLibInfoByIsbn10(isbn13){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://api.douban.com/book/subject/isbn/' + isbn13 + '?alt=json',
        headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        },
        onload: function(res) {
            var isbn10 = null;
            var jsonObj = JSON.parse(res.responseText);
            
            var propArr = jsonObj['db:attribute'];
            for (var i = 0; i < propArr.length; i++) {
                // GM_log("name: " + propArr[i]['@name']);
                // GM_log("val : " + propArr[i]['$t']);
                if (propArr[i]['@name'] == 'isbn10') {
                    isbn10 = propArr[i]['$t'];
                    break;
                }
            }
            
            if (isbn10 != null && isbn10.length == 10) {
                queryLibByIsbn(isbn10);
            } else {
                $('#libLoading').remove();
            }
        }
    });
}

/**
 * append the library link to douban book page
 * a) if the lib isbn query return books, the link is the first book page;
 * b) if the query results has more than one book, add query result link
 * c) if the first ten books has preservable book, set it as the book link
 * d) otherwise append title query link of Shenzhen Library
 */
function appendLibraryLink() {
    
    title = null;
    isbn  = null;
    
    getDoubanBookTitle();
    // GM_log("book title: \'" + title + "\'");
    getDoubanBookIsbn();
    // it might not be book page, or douban changed the page structure
    if (isEmptyStr(title) && isEmptyStr(isbn) )
        return ; 
    
    appendTitleLink_Loading();
    
    if (!isEmptyStr(isbn)) {
        // query library, append link to library
        setTimeout(function(){
            queryLibByIsbn(isbn);
        }, 200); // end of setTimeout
    }
} // end of appendLibraryLink()


function getLibBookTitle() {
    title = $('h3 a').text();
}

function getLibBookIsbn() {
    // get book isbn  
    $("ul.righttop li").each(function(i){
        // GM_log('lib book attr txt:' + $(this).text() + ', ' + $(this).text().indexOf('ISBN'));
        //if ($(this).text() == 'ISBN' && $(this)[0].nextSibling != null){
        if ($(this).text().indexOf('ISBN') == 0 && $(this).text().length > 5) { // 5='ISBN：'.length
            //isbn = $(this)[0].nextSibling.nodeValue.trim();
            isbn = $(this).text().substring(5).trim();
            //GM_log('lib book isbn txt:' + isbn);
            isbn = isbn.replace(/-/g, '').substr(0,13);
            //GM_log('lib book isbn:' + isbn);
        }
    });
}

function appendDoubanTitleSearchLink() {
    if (isEmptyStr(title))
        return ;
    
    var htmlStr = '<li>在豆瓣：';
    htmlStr += getDoubanSearchLink(title) + '</li>';
    // GM_log("book query url: " + htmlStr);
    $("ul.righttop").append(htmlStr);
}

function appendDoubanBookLink(score, bookLink, pageCt) {
    var htmlStr = '<li>在豆瓣：'; 
    htmlStr += '<a href="' + bookLink + '" target="_blank" title="点击前往豆瓣查看评论">到豆瓣查看评论';
    if (score != null && !isNaN(score) && score > 0) {
        htmlStr += '&nbsp;(评分:&nbsp;' + score + ')';
    }
    htmlStr += '</a></li>';
    if (pageCt != null && !isNaN(pageCt) && pageCt > 0) {
            htmlStr += '<li>页数：'+ pageCt + '</li>';
    }
    
    // GM_log("book query url: " + htmlStr);
    $("ul.righttop").append(htmlStr);
}

// append link to douban book
function appendDoubanLink() {
    
    title = null;
    isbn  = null;
    
    // GM_log('lib bookpage append link to douban book: ');
    getLibBookTitle();
    // GM_log("book title: \'" + title + "\'");
    getLibBookIsbn();
    // it might not be lib book page, or shenzhen Lib changed the page structure
    if (isEmptyStr(title) && isEmptyStr(isbn) )
        return ; 
    
    if (!isEmptyStr(isbn)) {
        //var doubanUrl = 'http://book.douban.com/isbn/' + isbn + '/';
        var doubanUrl = 'http://api.douban.com/book/subject/isbn/' + isbn + '?alt=json';
        setTimeout(function(){GM_xmlhttpRequest({
            method: 'GET',
            url: doubanUrl ,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            },
            onload: function(res) {
                try {
                    var jsonObj = JSON.parse(res.responseText);
                    
                    var score = jsonObj['gd:rating']['@average'];
                    var bookLink = jsonObj['link'][1]['@href'];
                    var dbAttrs = jsonObj['db:attribute'];
                    var pageCt = 0;
                    for (var i = 0; i < dbAttrs.length; i++)
                    {
                    	//GM_log("attr: " + dbAttrs[i]['$t']);
                    	if (dbAttrs[i]['@name'] == 'pages') {
                    		pageCt = dbAttrs[i]['$t'];
                    		//GM_log("pages: " + pageCt);
                    	}
                    }
                    // GM_log("score: " + score);
                    
                    appendDoubanBookLink(score, bookLink, pageCt);
                } catch(x) {//SyntaxError
                    // GM_log("respTxt: " + res.responseText);
                    // no such book, responseText is not a valid json str
                    appendDoubanTitleSearchLink();
                }
            }
        })}, 20); // end of setTimeout
    } else {
        appendDoubanTitleSearchLink();
    }
    
} // end of appendDoubanLink()


function appendLibraryInSearchPage() {
    var keyword = $(":text").val();
    keyword = keyword.replace(/-/g, '');
    // GM_log('keyword: [' + keyword + ']');
    if (isEmptyStr(keyword))
        return ;
    
    var htmlStr = '<p class="p1">' + getLibSearchLink(keyword, true) + '</p>';

    $(".mb20 .bd p:first").before(htmlStr);
}

function appendDoubanInSearchPage() {
    
    try
    {
        var keyword = $("span.fbold").text();
        if (isEmptyStr(keyword))
            return ;
        //GM_log('keyword: [' + keyword + ']');
        
        var dbSearchBtn = $(".books_sel input:last").clone();
        dbSearchBtn.attr({
            "value":"在豆瓣搜索",
            "onclick":"javascript:window.open(\'" + getDoubanSearchUrl(keyword) + "\')"
        });
        $(".books_sel").append(dbSearchBtn);
    } catch(x) {
        GM_log('In Library search page, cannot find keyword, page struct may changed');
    }
}

function setLibSearchStyle() {
    GM_addStyle(".libSearch{\
        float:left;display: inline-block;\
        background: #eef9eb;border: 1px solid #2F7B4B;\
        padding: 1px 10px;border-radius:3px;margin-right: 8px;}\
    ");
}

function appendTagListBooksLibLink(fTagList) {
    // eg, book.douban.com/tag/web , book.douban.com/doulist/232705/ (div.pl2 a), 
    // book.douban.com/doulist/531890/ (div.title a), book.douban.com/top250
    /*var fBtnStyle = ($('div.article table:eq(0) div.p12 a').length);
    // GM_log(' tag/doulist page: [' + fBtnStyle + ']');
    if (fBtnStyle)
        setLibSearchStyle();*/
    
    var fChecked = false, fBtnStyle = false;
    $('div.article table').each(function(){
        var keyword = '';
        if (!fChecked) {
            fChecked = true;
            keyword = $('div.pl2 a', this).text();
            fBtnStyle = !isEmptyStr(keyword);
            if (fBtnStyle)
                setLibSearchStyle();
            //GM_log(' tag/doulist 1: fChecked[' + fChecked + '] fBtnStyle[' + fBtnStyle + ']');
        }
        
        keyword = fBtnStyle ? $('div.pl2 a', this).text() : $('div.title a', this).text();
        if (isEmptyStr(keyword))
            return ;
        //GM_log(' tag/doulist page: [' + keyword + ']');
        
        var htmlStr = getLibSearchLink(keyword, !fBtnStyle);
        if (fTagList)
            $('td p span.rr', this).append(htmlStr);
        else
            $('td > span.rr', this).append(htmlStr);
    });
}

function appendChartBooksLibLink() {
    // book.douban.com/chart
    setLibSearchStyle();
    $('div.article ul li').each(function(){
        var keyword = $('h2 a', this).text();
        if (isEmptyStr(keyword))
            return ;
        //GM_log(' chart page: [' + keyword + ']');
        
        var htmlStr = '<p class="clearfix">' + getLibSearchLink(keyword, false) + '</p>';
        $(this).append(htmlStr);
    });
}

function appendPeopleBooksLibLink() {
    // 
    $('div.item ul').each(function(){
        var keyword = $('li.title a em', this).text();
        if (isEmptyStr(keyword))
            return ;
        //GM_log(' people page: [' + keyword + ']');
        
        var htmlStr = getLibSearchLink(keyword, true);
        $('div.opt-r', this).append(htmlStr);
    });
}

$(document).ready(function(){
    //GM_log('url host:' + document.URL);
    var vUrl = document.URL;
    if (vUrl.indexOf("douban.com/subject/") > 0) {
        // GM_log('in douban page');
        appendLibraryLink();
    } else if (vUrl.indexOf("douban.com/subject_search") > 0) {
        appendLibraryInSearchPage();
    } else if (vUrl.indexOf("/Search/searchdetail.jsp") > 0) {
        // GM_log('in shenzhen library page');
        appendDoubanLink();
    } else if (vUrl.indexOf("/Search/searchshow.jsp") > 0) {
        appendDoubanInSearchPage();
    } else if( vUrl.indexOf('/tag/') > 0 || vUrl.indexOf('/top250') > 0
        || vUrl.indexOf('/doulist/') > 0) {
        var fTagList = (vUrl.indexOf('/tag/') > 0 || vUrl.indexOf('/top250') > 0);
        appendTagListBooksLibLink(fTagList);
    } else if( /\/people\/*/.test(vUrl)) {
        appendPeopleBooksLibLink();
    } else if( /\/chart(.*)$/.test(vUrl)) {
        appendChartBooksLibLink();
    }
    
});