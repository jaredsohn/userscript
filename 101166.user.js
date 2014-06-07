// ==UserScript==
// @name			douban_SDU
// @namespace		        douban_SDU
// @require			http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version			1.0
/* @reason
   Deploy to new VPS.
   @end*/
// @include			http://book.douban.com/subject/*
// @include			http://book.douban.com/isbn/*
// @author			dufandf@gmail.com
// @thankto			freefcw@gmail.com
//
// ==/UserScript==
if(typeof unsafeWindow.jQuery !== "undefined") {
    var jQuery = unsafeWindow.jQuery;
    var $ = jQuery; 
}

if(typeof unsafeWindow.jQuery !== "undefined") {
    var jQuery = unsafeWindow.jQuery;
    var $ = jQuery; 
}

var thisScript = {
    name: "douban_SDU", 
    id: "101166", 
    version:"1.0" 
}
var updater = new Updater(thisScript); // 用thisScript对象创建一个更新器对象
updater.check(24); //检查是否有更新

$(document).ready(function(){
    // get book title
    var title = $('h1').text();
    //title = encodeURI(title);
    // get book isbn
    $("#info .pl").each(function(i){
        if ($(this).text() == 'ISBN:'){
            var isbn = $(this)[0].nextSibling.nodeValue;
            isbn = isbn.substr(1,13);

            setTimeout(function(){GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://96.44.182.229:8000/query/'+isbn,
                headers: {
                    'User-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:14.0) Gecko/20100101 Firefox/14.0.1',
                'Accept': 'application/json'},
                onload: function(res) {
                    GM_log(res.responseJSON);
                    var json = res.responseJSON;

                    if (json.ok > 0 ){			
                        var openLink = json.link;
                        var htmlStr = '<h2>在山大借这本书  ·  ·  ·  ·  ·  · </h2>';
                        htmlStr += '<div class="indent"><h4 style="margin-bottom: 0px;"><a href="'+openLink+'" target="_blank">山东大学图书馆馆藏</a></h4>';
                        htmlStr += '<ul class="bs">';
                        try
            {
                for (i=0;i<json.ok;i++)
            {
                htmlStr += '<li><span style="float:left">'+json.data[i].number+json.data[i].place+':'+json.data[i].index+'</span><br style="clear:both">';
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
                        var openLink = 'http://opac.lib.sdu.edu.cn';
                        var htmlStr = '<h2>在山大借这本书  ·  ·  ·  ·  ·  · </h2>';
                        htmlStr += '<div class="indent"><a href='+openLink+' target="_blank">前往山东大学图书馆</a></div>';
                        $(".aside").prepend(htmlStr);
                    }
                }
            })},500);
        }
    });

});
