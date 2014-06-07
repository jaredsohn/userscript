// ==UserScript==
// @name			douban_UJS
// @namespace		douban_UJS
// @version			v0.11
// @include			http://book.douban.com/subject/*
// @include			http://book.douban.com/isbn/*
// @author			mylwjef@gmail.com
// @thanksto        @lighttory, @freefcw, @arsunk and @dofine.
// ==/UserScript==
if(typeof unsafeWindow.jQuery !== "undefined") {
var jQuery = unsafeWindow.jQuery;
var $ = jQuery;
} 
function insertfind(title)
{
    var openlink = "http://huiwen.ujs.edu.cn:8080/opac/openLink.php?strSearchType=title&strText="+title;
    var htmlStr = "<h2>在江大借这本书...</h2>";
    htmlStr += '<div class="indent"><a href='+openLink+' target="_blank" title="点击前往图书馆搜索">到学校图书馆搜索《'+ title +'》</a></div>';
    $(".aside").prepend(htmlStr);
}

$(document).ready(function(){
    // get book title
    var title = $('h1').text();
    //提前是为了防止出现没有isbn的书
    var isbn = null;
    //title = encodeURI(title);
    // get book isbn
    $("#info .pl").each(function(i){
        if ($(this).text() == 'ISBN:'){
            isbn = $(this)[0].nextSibling.nodeValue;
            isbn = isbn.substr(1,13);

            setTimeout(function(){GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://doublib.sinaapp.com/ujslib.php?isbn='+isbn,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                },
                onload: function(res) {
                            var json = eval('('+res.responseText+')');
                            if (json.ok > 0 ){
                                var openLink = 'http://huiwen.ujs.edu.cn:8080/opac/openlink.php?strSearchType=isbn&historyCount=1&strText='+isbn;
                                var htmlStr = '<h2>在哪借这本书?  ·  ·  ·  ·  ·  · </h2>';
                                htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;"><a href="'+openLink+'" target="_blank" title="点击前往图书馆网页查看信息">前往江苏大学图书馆</a></h4>';

                                htmlStr += '<ul class="bs">';
                                try
            {
                for (i=0;i<json.ok;i++)
            {
                htmlStr += '<li><span style="float:left">&nbsp;索 书 号 : '+json.data[i].i+'</span><span style="float:right">'+json.data[i].s+'</span><br /><span style="clear:both">馆藏地点: '+json.data[i].place+"</span></li>";
            }
            }
                                catch (e)
                                {
                                }

                                htmlStr += '</ul></div></br>';

                                $(".aside").prepend(htmlStr);
                            }
                            else{
                                //GM_log('no such book');
                                insertfind(title);
                            }
                        }
            })},500);
        }
    });
    if(isbn == null) insertfind(title);
});

