// --------------------------------------------------------------------
//
// ==UserScript==
// @name          jjwxc-search-summary 
// @namespace     http://abbypan.github.com/
// @description   绿晋江( http://www.jjwxc.net )搜索结果添加积分信息
// @author        Abby Pan (abbypan@gmail.com)
// @homepage      http://abbypan.github.com/
// @copyright     2009+, Abby Pan (http://abbypan.github.com/)
// @version       0.3
// @require		  http://userscripts.org/scripts/source/44063.user.js
// @include       http://www.jjwxc.net/search.php?kw=*
// ==/UserScript==
//
// --------------------------------------------------------------------

var LjjSearch = new Class({
    initialize: function(){
                    this.url=document.location.href;
                    this.charset=document.characterSet;
                },
    mainSearchSummary : function(){
                            var books=$('search_result').getElements('h3[class="title"]');        
                            var num = books.length;
                            if(num<=0) return;

                            var banner = new Element('p', {id: 'refineInfo'});
                            banner.set('style','color:red');
                            banner.set('html','正在取第<span id="bookID">0</span>本，共<span id="bookNum">'+num+'</span>本');
                            banner.inject($('search_result'),'before');

                            this.addBookSummary(books);
                        },
    addBookSummary: function(books){
                        var thisBook = this.getIterBook(books);
                        if(!thisBook) return;

                        var url=thisBook.getElement('a').get('href');
                        var self=this;
                        GM_xmlhttpRequest({
                            method: "GET",
                            url: url,
                            'overrideMimeType':"text/html; charset="+self.charset,
                            onload: function(res) {
                                var page = new Element('div');
                                page.innerHTML = res.responseText;

                                var wordNum = self.getWordNum(page);
                                var Point = self.getPoint(page);
                                self.addBookSummaryElement(thisBook,wordNum,Point);

                                self.addBookSummary(books);
                            },
                            onerror : function(res){
                                          self.addBookSummary(books);
                                      },
                        });
                    },
    getIterBook : function (books){
                      var bookID= extractNumInt($('bookID')) + 1;
                      var bookNum = extractNumInt($('bookNum'));
                      if(bookID > bookNum){
                          $('refineInfo').parentNode.removeChild($('refineInfo'));
                          return;
                      }

                      $('bookID').set('text',bookID);
                      var bookIter =books[bookID-1];

                      return bookIter;
                  }, 
    getWordNum : function(page){
                     var lis = page.getElement('ul[name="printright"]').getElements('li');
                     return extractNum(lis[4]);
                 },
    getPoint : function(page){
                   var div = page.getElement('div[style="padding-top: 50px;"]');
                   if(!div){
                       div = (page.getElements('td[class="sptd"]'))[1];
                   }
                   return extractNum(div);
               },
    addBookSummaryElement : function(thisBook,wordNum,Point){
                                var pointPerWord = calcAvgPoint(wordNum, Point);

                                var info = new Element('font');
                                info.set('color','red');
                                info.set('text',' [ 字数: '+wordNum+' | 积分: '+Point+' | 积分/字: '+pointPerWord+' ]');

                                thisBook.adopt(info);
                            },
});

function calcAvgPoint ( wordNum , point ) {
    if(wordNum == 0 )
        return "0";
    var newPoint = (point/wordNum+0.5) + ""; 
    return newPoint.replace(/\.[0-9]+/,"");
}

function extractNum ( div ) {
    if(!div) return 0;
    var point = div.get('text');
    var m=point.match(/([0-9,]+)[^0-9]*$/);
    return m.length>0 ? m[1].replace(/,/g,"") : 0;
}

function extractNumInt ( div ) {
    var f = extractNum(div);
    return parseInt(f);
}

function procSearchSummary(){
    var result = new LjjSearch();
    if(!result) return;
    result.mainSearchSummary();
}

procSearchSummary();
