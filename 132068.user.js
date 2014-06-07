// ==UserScript==
// @name			douban_njustlib
// @namespace		douban_njustlib
// @version			v1

// @include			http://book.douban.com/subject/*
// @author			luqq1210@163.com
// @thankto			zhx@xmulib.org,freefcw@gmail.com,newchar@gmail.com,lmmsoft@126.com
//
//
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var thisScript = {
name: "douban_njust", 
id: "132068", 
version:"1" 
}


var BASEURL = "http://202.119.83.14:8080/opac/";



function insertloading(){
    var htmlstr = '<div id="libinfo" class="gray_ad"><h2>南理工图书馆查询</h2></div>';
    $('.aside').prepend(htmlstr);
}
	

function page_subject(){
    //insert load img
    insertloading();


	// get book title
	var title = $('h1>span').text();
	//提前是为了防止出现没有isbn的书
	var isbn = null;
	//title = encodeURI(title);
	// get book isbn
	$('span.pl').each(function(i){
		if ($(this).text() == 'ISBN:'){
			isbn = $(this)[0].nextSibling.nodeValue;
			isbn = isbn.substr(1,13);
            
            isbnlinker(isbn,false);
 
		}
	});
	if(isbn == null) insertfind(title);
}

$(document).ready(function(){
    page_subject();
});

function isbnlinker(isbn,b){
   setTimeout(function(){GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://202.119.83.14:8080/uopac/opac/openlink.php?strSearchType=isbn&historyCount=1&strText='+isbn+'&x=27&y=13&doctype=ALL&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&dept=ALL',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var data=responseDetails.responseText;
        if(data.indexOf(" 本馆没有您检索的馆藏书目 ")!=-1)
        {
            if(b==true) $('#libinfo').append('o(︶︿︶)o 图书馆里居然没这好书');
            else{
                isbn=ean_to_isbn(isbn);
                isbnlinker(isbn,true);
            }
        }
        else{
            var $search_page = $(data);
            var bookInfo = $search_page.find("#list_books p span").text()
            var url_bookpage = $search_page.find("h3 a").attr("href");

            var reg = /\d+/g;
            var ary = bookInfo.match(reg);
            var bookNum = ary[0];
            var bookLeft = ary[1];

            if (bookLeft == 0) {
                $('#libinfo').append('一共' + bookNum + '本，竟然都被借光了！<br />学霸们太威武啦！');
            } else {
                $('#libinfo').append('一共' + bookNum + '本，还剩' + bookLeft + '本，哈哈，是我的啦！');
            }
            
   //         GM_log(url_bookpage);
            getBookInfo(url_bookpage);
     //       alert(url_bookpage);
        }
    }
})},500);
}

//add css
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getBookInfo(url_bookpage) {
    var url_full = BASEURL + url_bookpage;
 //   $('#libinfo').append(url_full);
      setTimeout(function(){GM_xmlhttpRequest({
				method: 'GET',
				url: url_full,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {
                    var data=responseDetails.responseText;
                    var $book = $(data);
                    var $status = $book.find("table tbody tr").removeAttr("bgcolor");
                    $('#libinfo').append($status);
                    $('#libinfo').append('<br /><h2>走，去图书馆看看?</h2><p><div class="bs" id="mdt"><a href="' + url_full + '" target="_blank">点我哟！</a></div>');
                    //删除不必要的信息
                    for (var i = 0; i <= $('#libinfo tr').length; i++) {
                        $('#libinfo tr td').eq(1 + i * 6).hide();
                        $('#libinfo tr td').eq(2 + i * 6).hide();
                        $('#libinfo tr td').eq(3 + i * 6).hide();
                    }
                    
                    addGlobalStyle('#libinfo  tr td  { border:#333333 1px solid; }');
				}
			})},500);
}

function ean_to_isbn($ean){
       var $strip_ean = $ean.substr( 3, 9); // strips first three digits and leaves 9
       
       var $count = $strip_ean.length; // counts sting len
     //  GM_log($count);
       var $m = 1; // used as number to multiple by
       var $temp_ean=0;
       for(var $x=0; $x< $count; $x++)
       {
               $temp_ean = (parseInt($strip_ean[$x]) * $m) + $temp_ean;
               $m++;
       }
       var $check = $temp_ean % 11;
       if($check == 10){$check = "X";} // if last number is 10, replace with an "X"
       var $newisbn=$strip_ean+String($check);
      // GM_log($newisbn);
       return $newisbn;
}


