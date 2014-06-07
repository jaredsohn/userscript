// ==UserScript==
// @name           verydou
// @namespace      http://www.liulanqi.org/Firefox/verydou
// @include        http://*.douban.com/subject/*
// @include        http://*.douban.com/subject_search?search_text=*
// ==/UserScript==
//
function handleVeryXml(xo,vc,doc,kw,fields) {
    var topics=xo.getElementsByTagName('item'); 
    var l=topics.length;
    if (l>0) {
        var t;
        var title;
        var link;
        var vc_ul=doc.createElement("ul");
        vc_ul.className='bs';
        for (var i=0;i<10;i++) {
            if (i>=l) {
                break;
            }
            t=topics.item(i);
            title=t.getElementsByTagName('name').item(0).firstChild.nodeValue;
            link=t.getElementsByTagName('link').item(0).firstChild.nodeValue;
            vc_ul.innerHTML+='<li><a href="'+link+'" target="_blank">'+title+'</a></li>';
        }
        vc.removeChild(doc.getElementById('vcloading'));
        vc.appendChild(vc_ul);
        var vc_span=doc.createElement('span');
        vc_span.className='pl rr';
        vc.appendChild(vc_span);
        vc_span.innerHTML='&gt;<a href="http://www.verycd.com/search/'+fields+'/'+kw+'" target="_blank">&#26356;&#22810;</a>'
    } else {
        doc.getElementById('vcloading').innerHTML='&#26410;&#25214;&#21040;&#30456;&#20851;&#36164;&#28304;&#65292;<a href="http://www.verycd.com/search/" target="_blank">&#20146;&#33258;&#23547;&#25214;&#20114;&#32852;&#32593;</a>'
    }
}


function verydou() {
    var doc = document;

    //寻找位置
    try {
        var tags=document.getElementById("content").getElementsByTagName("div")
        for (var i=0; i<tags.length; ++i) {
            if (tags[i].getAttribute("class")=="aside") {
                ri=tags[i]
                break
            }
        }
        //var ri=doc.getElementById('tablerm');
        var obss=null;
        obss=ri.firstChild;
    } catch (ex) {
        //alert(ex)
    }
    if (!obss) {
        return;
    }

    //分类
    var find_cat=null;
    var fields='folders';


    //获取关键词
    var kw
    if (doc.location.href.search(/douban.com\/subject\/[0-9]+\/(?:\?.*)?$/) > 0) {
        //判断分类
        try {
            var nav=doc.getElementById('nav').firstChild;
            while (nav=nav.nextSibling) {
                if (nav.className=='now') {
                    var n_href=nav.getAttribute('href');
                    if (n_href=='/movie/') {
                        //find_cat='%E7%94%B5%E5%BD%B1';
                        fields='entries';
                    } else if (n_href=='/music/') {
                        find_cat=24;
                        fields='folders';
                    } else if (n_href='/book/') {
                        find_cat=69;
                        fields='folders';
                    }
                }
            }
        } catch (ex) {
            //alert(ex)
        }
        kw=doc.title.substr(0,doc.title.indexOf(' ')); 
        if (kw.length<=2 || /^[a-zA-Z0-9]+$/.test(kw)) {
            kw=doc.title.substr(0,doc.title.length-5)
        }   
        kw=encodeURIComponent(kw);
    } else {
        kw=doc.location.href.substr(doc.location.href.indexOf('search_text=')+12);//12是search_text=的长度
        if (kw.indexOf('&')>0) {
            if (kw.indexOf('&cat=1003')>0) {
                find_cat='%E9%9F%B3%E4%B9%90';
            }
            kw=kw.substr(0,kw.indexOf('&'));
        }
    }


    //构建url
    url='http://www.yl.verycd.com/search/'+fields+'?kw='+kw;
    if (fields=='entries'){
	    url+='&fields=cname,ename,alias&format=xml';
	} else {
		url+='&fields=title&format=xml';	
	}

    if (find_cat) {
        url+='&catalog_id='+find_cat;
    }

    //创建放置资源的容器
    var vc = doc.createElement("div");
    vc.className='indent';
    vc.innerHTML='<h2>VeryCD&#36164;&#28304;&nbsp; &middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;</h2><span id="vcloading">&#21152;&#36733;&#20013;...</span>';
    ri.insertBefore(vc,obss);

    //获取VeryCD数据
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(r) {
            if (r.status==200) {
                handleVeryXml(new DOMParser().parseFromString(r.responseText,'text/xml'),vc,doc,kw,fields);
            }
        }
    });
}
verydou();
