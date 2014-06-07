// ==UserScript==
// @name        douban_PKUlib
// @namespace   http://userscripts.org/users/478305
// @description PKU library integration for douban books
// @include     http://book.douban.com/subject/*
// @include		http://book.douban.com/isbn/*
// @exclude     http://book.douban.com/subject/*/edit
// @exclude     http://book.douban.com/subject/*/update_image
// @exclude     http://book.douban.com/subject/*/edit?mine
// @exclude     http://book.douban.com/subject/*/new_version
// @exclude     http://book.douban.com/subject/*/offers
// @exclude     http://book.douban.com/subject/*/new_offer
// @exclude     http://book.douban.com/subject/offer/*/
// @exclude     http://book.douban.com/subject/*/cinema?view=ticket
// @exclude     http://book.douban.com/subject/*/doulists
// @exclude     http://book.douban.com/subject/*/all_photos
// @exclude     http://book.douban.com/subject/*/mupload
// @exclude     http://book.douban.com/subject/*/comments
// @exclude     http://book.douban.com/subject/*/reviews
// @exclude     http://book.douban.com/subject/*/new_review
// @exclude     http://book.douban.com/subject/*/group_collectors
// @exclude     http://book.douban.com/subject/*/discussion/
// @exclude     http://book.douban.com/subject/*/wishes
// @exclude     http://book.douban.com/subject/*/doings
// @exclude     http://book.douban.com/subject/*/collections
// @require		http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version     0.1
// @author      codetrick@gmail.com
// @thankto 	freefcw@gmail.com
// @thankto 	zhx@xmulib.org
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var thisScript = {
name: "douban_PKU", 
//id: "39921", 
version:"1.0" 
}
var updater = new Updater(thisScript);
updater.check(24); 

var title, author, isbn;

function insertfind()
{
	var openLink1 = "http://pku.summon.serialssolutions.com/search?s.q="+encodeURIComponent(title);
    var openLink2 = "http://www.lib.pku.edu.cn/webcat/portal/opac-search?user_id=userid&password=password&library=ALL&sort_by22=ANY&relevance=off&srchfield1=TI^TITLE^^^题名&searchdata1="+encodeURIComponent(title);
	var htmlStr = '<div class="gray_ad" id="pkulibinfo"> <h2>在北大图书馆借这本书  ·  ·  ·  ·  ·  · </h2>';
    htmlStr += '<ul class="bs"> ';
	htmlStr += '<li style="border: none"> <a href='+openLink1+' target="_blank" title="点击前往图书馆搜索">未名学术搜索《'+ title +'》</a> </li>';
	htmlStr += '<li style="border: none"> <a href='+openLink2+' target="_blank" title="点击前往图书馆搜索">书刊目录检索《'+ title +'》</a></div> </li>';
    htmlStr += '</ul> </div>';
	$(".aside").prepend(htmlStr);
}

function getDoubanBookTitle() {
    // get book title
    title = $('h1').text().trim();
    GM_log('book title txt: [' + title + ']');
}
    
function getDoubanBookIsbn() {
    // get book isbn  
    $("#info .pl").each(function(i){
        //GM_log('lib book attr txt:' + $(this).text());
        if ($(this).text() == 'ISBN:' && $(this)[0].nextSibling != null){
            isbn = $(this)[0].nextSibling.nodeValue.trim();
            GM_log('book isbn txt: [' + isbn + ']');
        }
    });
}
	
function getDoubanBookAuthor() {
    // get book isbn  
    $("#info .pl").each(function(i){
        //GM_log('lib book attr txt:' + $(this).text());
        if ($(this).text() == '作者' && $(this)[0].nextSibling != null){
            author = new Array();
            var item=$(this)[0];
            while (item!=null){
                do {
                    item = item.nextSibling;
                } while (item!=null && item.nodeType!=1);
                if (item==null) break;
                if (item.nodeName!='A') break;
                author.push(item.innerHTML);
            }
        }
    });
    for (a in author) GM_log('book author txt: [' + author[a] + ']');
}

$(document).ready(function(){
    getDoubanBookTitle();
	getDoubanBookIsbn();
    getDoubanBookAuthor();
    setTimeout(function(){GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.lib.pku.edu.cn/webcat/portal/opac-search?user_id=userid&password=password&library=ALL&sort_by22=ANY&relevance=off&srchfield1=TI^TITLE^^^题名&searchdata1='+isbn,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        },
        onload: function(res) {

            var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

            html.innerHTML = res.responseText;
            doc.appendChild(html);

            if (res.responseText.search(/没找到/)!=-1){
                //GM_log('no such book');
                insertfind();
            }
            else {
	            var openLink = 'http://www.lib.pku.edu.cn/webcat/portal/opac-search?user_id=userid&password=password&library=ALL&sort_by22=ANY&relevance=off&srchfield1=TI^TITLE^^^题名&searchdata1='+isbn;
                var htmlStr = '<h2>北京大学图书馆馆藏信息  ·  ·  ·  ·  ·  · </h2>';
                htmlStr += '<div class="indent"><a href="'+openLink+'" target="_blank" title="点击前往图书馆网页查看信息">';
                htmlStr += doc.getElementsByClassName('copy_info')[0].innerHTML + '</a>';
                heads = doc.getElementsByClassName('holdingsheader');
                for (var i=0; i<heads.length; i+=5)
                {
                    htmlStr += '<h4>' + heads[i].innerHTML + '</h4>';
                    htmlStr += '<ul class="bs">';
                    htmlStr += '</ul>';
                }

                /*try
                {
                    for (i=0;i<json.ok;i++)
                    {
                        htmlStr += '<li><span style="float:left">&nbsp;索 书 号 : '+json.data[i].index+'</span><span style="float:right">'+json.data[i].status+'</span><br /><span style="clear:both">馆藏地点: '+json.data[i].place+"</span></li>";
                    } 
                }
                catch (e)
                {
                }*/
                
                htmlStr += '</div></br>';

                $(".aside").prepend(htmlStr);
            }
        }})
    },500);
});

