// ==UserScript==
// @name       GDUFS library helper
// @namespace  http://lib.gdufs.edu.cn
// @version    0.2.x
// @description  Link Douban Book and GDUFS Library
// @match      http://book.douban.com/*
// @match      http://opac.gdufs.edu.cn:8118/apsm/recommend/recommend_nobor.jsp*
// @copyright  2012-2013, Link, hbc, cdh, zpd
// @require http://linkfile.ap01.aws.af.cm/files/jquery-2.0.0.min.js
// @require http://linkfile.ap01.aws.af.cm/files/jquery.modal.js
// @grant GM_xmlhttpRequest
// ==/UserScript==

// helper
var helper = {
    libraryId: "G学号，如G20080088008", 
    libUrl: 'http://opac.gdufs.edu.cn',
    isbnUrlSuffix: ':8991/F/?func=find-b&find_code=ISB&request=',
    book: {
        meta: {},
        libStat: {}
    },
    pages: {
        subject: {},
    },
    main: {}
};


// Get book information
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
        rating: rating
    };
};


// Check status of book in library
helper.book.libStat = function(isbn){
    var statBtn, hasBook = true;
    var findUrl = helper.libUrl + helper.isbnUrlSuffix + isbn;

    GM_xmlhttpRequest({
        method: 'GET',
        url: findUrl,
        onload: function(resp){
            if (resp.status !== 200){
                return;
            }
            if(resp.responseText.indexOf('f-alert.gif')!=-1){
                hasBook = false;
            }
            var style = ('style="float: left; ' +
                         'display: inline-block; ' +
                         'background: #33A057; ' +
                         'border: 1px solid #2F7B4B; ' +
                         'color: white; ' +
                         'padding: 1px 10px; ' +
                         'border-radius: 3px; ' +
                         'margin-right: 8px;" '
                        );

            if(hasBook){
                statBtn = ('<a href="' + findUrl + '" ' + style + ' target="_blank">借阅</a>');
            }
            else{
                statBtn = ('<a href="#recform" id="recbtn" rel="modal:open"' + 
                           style + '>荐购</a>' + '<div id="recform_load"></div>');
            }
            $('div.a_stars').before(statBtn);
            $("#recform_load").load("http://linkfile.ap01.aws.af.cm/files/recform.html");
            $("#recbtn").click(function(){
                var bookMeta = helper.book.meta();
                $('[name="Z13_TITLE"]').val (bookMeta.title);
                $('[name="Z13_AUTHOR"]').val(bookMeta.author);
                $('[name="Z13_IMPRINT"]').val(bookMeta.publisher);
                $('[name="Z13_YEAR"]').val( bookMeta.pubdate);
                $('[name="Z13_ISBN_ISSN"]').val (bookMeta.isbn);
                $('[name="Z13_PRICE"]').val (bookMeta.price);
                $('[name="Z68_NO_UNITS"]').val(2);
                $('[name="Z303_REC_KEY"]').val(helper.libraryId);
                $('[name="Z46_REQUEST_PAGES"]').val('豆瓣读书得分: '+ bookMeta.rating);
            });
        }
    });
};


// Douban book page
helper.pages.subject = function(){
    var isbn = $("#info").contents().slice(-3, -2)[0].nodeValue.trim();
    helper.book.libStat(isbn);
};


// Main function
helper.main = function() {
    var type = /[com,8118]\/([\w]+)\/*/.exec(document.URL);
    type = (type !== null)?(type[1].trim()):('index');
    
    if(type==='subject') {
        helper.pages.subject();
    }else if(type==='apsm') {
        helper.pages.recommend();
    }else {
        console.log(type);
    }
};

helper.main();