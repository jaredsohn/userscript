// ==UserScript==
// @name       HNU Library Opac for Douban
// @version    1.1
// @author     Li Caomu
// @description  在豆瓣上显示湖南大学图书馆的藏书信息
// @include    /^http:\/\/book\.douban\.com\/subject\/\d+\/$/
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

var book = document.getElementsByTagName("h1")[0].textContent.replace(/^\s*(.*)\s*$/,'$1');
    book = book.replace('!','');
var url = 'http://opac.lib.hnu.cn/opac/websearch/bookSearch?cmdACT=resultToRSS&filter=%28title%3A' + encodeURIComponent(book) + '%29+AND+%28hasholding%3Ay%29&sortSign=score_sort&orderSign=true&pageNo=1&raws=10';
var openlink = 'http://opac.lib.hnu.cn/opac/websearch/bookSearch?authorfilter=&subjectfilter=&languagefilter=&pubdatefilter=&marcbooktypefilter=&classfilter=&libcodefilter=&cmdACT=list&mod=oneXSL&columnID=1&xsl=BOOK_list.xsl&searchSign=&raws=10&filter=%28title%3A'+encodeURIComponent(book)+'%29+AND+%28hasholding%3Ay%29&filterescaped=%28title%3A%E7%99%BE%E5%B9%B4%E5%AD%A4%E7%8B%AC+OR+title%3A%E7%99%BE%E5%B9%B4%E5%AD%A4%E7%8D%A8%29+AND+%28hasholding%3Ay%29&bookType=all%3Aundefined&marcType=undefined%3A%E5%85%A8%E9%83%A8&pageNo=1&totalNUM=1&rawNUM=10&bookrec=&isfastsearch=true&totalRows=7&col1=title&val1='+encodeURIComponent(book)+'&hasholdingCheckbox=y&sortSign=score_sort&orderSign=true&index_in=&index_bottom=';

var mobileicon = 'data:image/gif;base64,R0lGODlhDwAPAIABAGZmZv///yH5BAEKAAEALAAAAAAPAA4AAAIejI+pB7vtApgzQuYalVnWm4Dcw2kdImJmylBsBEcFADs=';
var whiteicon = 'data:image/gif;base64,R0lGODlhDwAPAKEBAGZmZv///////////yH5BAEKAAAALAAAAAAPAA4AAAIehI+pF7vtQJgzQuYalVnWm4Dcw2kdImJmylBsBEcFADs=';
var mobilelink = 'http://waplib.hnu.cn:8080/search?kw=' + encodeURIComponent(book) + '&xc=6&radio=title';

var localList = {"ZL34":"纪检","02":"流通(南)","03":"新书阅览室|南","ZL21":"马列学院","04":"文化素质阅览室|南","05":"内部|南","01":"中文图书(南)","06":"咨询|南","07":"图资|南","08":"专用|南","09":"外阅|南","10":"过刊|南","11":"中社|南","12":"中科|南","13":"外刊|南","14":"外库|南","16":"系办|南","17":"复印|南","18":"电阅|南","19":"幼园|南","20":"子校|南","21":"收藏|南","22":"机房||南","ZL03":"电气与信息工程学院","ZL04":"土木学院","ZL05":"工商管理学院","ZL07":"计算机学院","ZL08":"环境工程学院","ZL09":"建筑系","ZL10":"设计系","ZL11":"物理系","ZL12":"力学系","ZL13":"材料学院","ZL14":"数学与计量经济学院","ZL15":"岳麓学院","ZL16":"人文系","ZL17":"文学院","ZL18":"新闻学院","ZL19":"影视学院","23":"报刊","15":"天马阅览室","ZL20":"政治与公共管理学院","25":"学生阅览室","26":"天马（图书）","ZL22":"法学院资料室","ZL23":"体育学院","ZL24":"高教所","27":"馆办|南","ZL25":"结构所","ZL26":"美雅学院","ZL27":"网络学院","ZL28":"保卫处","ZL29":"给水所","ZL30":"生物医学工程中心","ZL31":"校办","28":"社科历史文献阅览室","29":"影视文献阅览室","30":"超星","24":"科教查新室","ZL06":"外语学院","ZL01":"机械工程学院","ZL02":"化学化工学院","32":"自科阅览室","33":"社科阅览室","ZL32":"新闻传播与影视艺术学院","34":"目录厅","B002":"北|中文流通","B003":"学科1|北","B006":"文检|北","B009":"北|经济图书阅览室","B010":"过刊|北","B011":"过报|北","B012":"专刊|北","B013":"综刊|北","B014":"北|外文流通","B015":"北|综合图书阅览室","B022":"信息中心|北","B027":"馆办|北","BJR":"金融|北","BKJ":"会计|北","BTJ":"统计|北","BJJ":"经研|北","B017":"电阅|北","BJM":"经贸学院","BRJ":"软件学院","BJY":"金融管理研究中心","BTC":"提存书库一北","BTCE":"提存书库二北","BTC3":"提存书库三北"};

function getDetail(link){
    var click = link.getAttribute('click');
    var bookID = link.id.split('_')[1];
    if (click === '0'){
        var url = "http://opac.lib.hnu.cn/opac/websearch/bookSearch?cmdACT=getbooknum&fill=,'" + bookID + "'";
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
                'Accept': 'application/atom+xml,application/xml,text/xml',
            },
            onreadystatechange: function(responseDetails){
                var li = $('#book_'+bookID).parents('li');
                if(responseDetails.readyState===1){
                    var htmlStr = '<div class="tablediv" style="display:none; background:#FFF;">载入中……</div>';
                    var li = $('#book_'+bookID).parents('li');
                    if (li.children('.tablediv').length!=0) {
                        li.children('.tablediv').slideUp(500,function(){$(this).html('载入中……').slideDown(500);});
                    }else{
                        li.append(htmlStr);
                        li.children('.tablediv').slideDown(500);
                    }
                }else if (responseDetails.readyState===(2||3)){
                	li.children('.tablediv').html('载入中……');
                }else if (responseDetails.readyState===4){
                	if(responseDetails.status!=200){
                    	var htmlStr = '载入失败，请重试。';
                        li.children('.tablediv').slideUp(500,function(){$(this).html(htmlStr).slideDown(500);});
                    }
                }
                    
            },
            onload: function(responseDetails) {
                var parser = new DOMParser();
                var dom = parser.parseFromString(responseDetails.responseText,
                "application/xml");
                var htmlStr = '<table class="olt"><tr align="center"><td>索书号</td><td>馆藏地点</td><td>在馆数</td><td>馆藏数</td></tr>'
                var total = dom.getElementsByTagName('TOTAL')[0].textContent;
                var books = dom.getElementsByTagName('ROWSET2')[0].getElementsByTagName('ROW');
                for (var i = 0; i < books.length; i++){
                    var callno = books[i].getElementsByTagName('CALLNO')[0].textContent;
                    var curlocal = books[i].getElementsByTagName('CURLOCAL')[0].textContent;
                    var localname = localList[curlocal];
                    var loan = books[i].getElementsByTagName('LOAN')[0].textContent;
                    var tr = '<tr><td>'+callno+'</td><td>'+localname+'</td><td align="center">'+loan+'</td>';
                    if (i===0){
                    	tr += '<td rowspan="'+ books.length +'" align="center">' + total + '</td></tr>';
                    }else {
                        tr += '</tr>';
                    }
                    htmlStr += tr;
                }
                var li = $('#book_'+bookID).parents('li');
                li.children('.tablediv').slideUp(500,function(){
                    $(this).html(htmlStr).slideDown(500,function(){link.setAttribute('toggle','1')});
                    link.setAttribute('click','1')
                });  
            }
        })
    }else if(click === '1'){
    	var li = $('#book_'+bookID).parents('li');
        if(link.getAttribute('toggle')==='0'){
        	return;
        }else{
        	li.children('.tablediv').slideToggle(500);
        }
    }
};

GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	headers: {
	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,
		"application/xml");
		var item = dom.getElementsByTagName('item');
		var title, link, bookID, mobilehref, author, pubDate, itemlen;

        var itemlen = item.length >= 5?5:item.length

        var li, spaninfo;
        var htmlStr = '<div class="gray_ad"><h2>湖南大学图书馆藏书查询  ·  ·  ·  ·  ·  · ';
            htmlStr += '<span class="pl">( <a target="_blank" href="'+ openlink +'" muse_scanned="true">全部</a> | <a class="mobileicon" target="_blank" href="'+ mobilelink +'"><img src="'+ mobileicon +'"/></a> )</span></h2>';
            htmlStr += '<ul class="bs noline">';   

		for (var i = 0; i < itemlen; i++) {  
                if (item[0].getElementsByTagName('title')[0].textContent == '提示信息')
                    {
                        li = '<li style="border:none">抱歉，查找不到关于本书的记录。</li>'
                    }
                else
                    {
                        title = item[i].getElementsByTagName('title')[0].textContent;
                        link = item[i].getElementsByTagName('link')[0].textContent;
                        bookID = link.substr(link.match(new RegExp("&" + "bookrecno" + "=", "i")).index+1).split("&")[0].split("=")[1];
                        mobilehref = 'http://waplib.hnu.cn:8080/search?xc=6&d=' + bookID;
                        author = item[i].getElementsByTagName('author')[0].textContent;
                        pubDate = item[i].getElementsByTagName('pubDate')[0].textContent;
                        li = '<li style="border:none"><a target="_blank" href="'+ link +'" muse_scanned="true">'+ title +'</a>';
                        li += '<a class="mobileicon" target="_blank" href="'+mobilehref+'"><img src="'+mobileicon+'"></a>';
                        spaninfo = ' <span class="pl">'+ author +' / '+ pubDate +' (<a href="javascript:void(0)" id="book_'+ bookID +'" class="bookinfo" click="0" toggle="0">?</a>)</span></li>';
                        li += spaninfo;
                        if ((i===4)&&(item.length>5)) {
                        	li +='<li style="border-top: 1px dashed #DDD;"><div style="float: right;"><a target="_blank" href="'+openlink+'" muse_scanned="true">&gt; 更多</a> <span class="pl">('+ item.length +')</span></div></li>'
                        }
                    }

                htmlStr += li
            }
        $(".aside").prepend(htmlStr);
    }
})

$('.bookinfo').live('click',function(){getDetail(this)})
$('a.mobileicon').live('mouseover',function(){$(this).children('img').attr('src',whiteicon)}).live('mouseout',function(){$(this).children('img').attr('src',mobileicon)})