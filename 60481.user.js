// ==UserScript==
// @name           VeryXiami
// @namespace      http://caodan.net/Firefox/VeryXiami
// @include        http://www.xiami.com/album/*
// ==/UserScript==
//
function handleVeryXml(xo,vc,doc,kw) {
    var topics=xo.getElementsByTagName('folder'); 
    var l=topics.length;
    if (l>0) {
        var t;
        var title;
        var link;
        var vc_ul=doc.createElement("table");
        vc_ul.className='track_list';
        for (var i=0;i<10;i++) {
            if (i>=l) {
                break;
            }
            t=topics.item(i);
            title=t.getElementsByTagName('name').item(0).firstChild.nodeValue;
            link=t.getElementsByTagName('link').item(0).firstChild.nodeValue;
            vc_ul.innerHTML+='<td class="song_name"><a id="VeryXiami" href="'+link+'" target="_blank">'+title+'</a></li>';
        }
        vc.removeChild(doc.getElementById('vcloading'));
        vc.appendChild(vc_ul);
        var vc_span=doc.createElement('span');
        vc_span.className='pl rr';
        vc.appendChild(vc_span);
        vc_span.innerHTML='&gt;<a href="http://www.verycd.com/search/folders/'+kw+'" target="_blank">&#26356;&#22810;</a>'
    } else {
        doc.getElementById('vcloading').innerHTML='&#26410;&#25214;&#21040;&#30456;&#20851;&#36164;&#28304;&#65292;<a href="http://www.verycd.com/search/" target="_blank">&#20146;&#33258;&#23547;&#25214;&#20114;&#32852;&#32593;</a>'
    }
}


function verydou() {
    var doc = document;
    if (doc.location.href.search(/xiami.com\/album\/[0-9]+\/(?:\?.*)?$/) < 0) {
        return;
    }

    //寻找位置
    try {
        var tags=document.getElementById("wrapper").getElementsByTagName("div")
        for (var i=0; i<tags.length; ++i) {
            if (tags[i].getAttribute("class")=="music_bd_r") {
                ri=tags[i]
                break
            }
        }
        //alert(ri)
        //var ri=doc.getElementById('tablerm');
        var obss=null;
        obss=ri.firstChild;
    } catch (ex) {
        //alert(ex)
    }
    if (!obss) {
        return;
    }

    //判断分类
    var find_cat=null;
    try {
        var nav=doc.getElementById('nav').firstChild;
        while (nav=nav.nextSibling) {
            if (nav.className=='now') {
                var n_href=nav.getAttribute('href');
                if (n_href=='/movie/') {
                    //find_cat='%E7%94%B5%E5%BD%B1';
                } else if (n_href=='/music/') {
                    find_cat='%E9%9F%B3%E4%B9%90';
                } else if (n_href='/book/') {
                    //find_cat='%E6%9D%82%E5%BF%97';
                }
            }
        }
    } catch (ex) {
        //alert(ex)
    }

    //获取关键词
    var kw=doc.title.substr(0,doc.title.indexOf(' ')); 
    if (kw.length<=2 || /^[a-zA-Z0-9]+$/.test(kw)) {
        kw=doc.title.substr(0,doc.title.length-5)
    }   
    kw=encodeURIComponent(kw);

    //构建url
    url='http://www.verycd.com/search/folders?status=elite&rev=1&kw='+kw+'&format=xml';
    if (find_cat) {
        url+='&catalog='+find_cat;
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
                handleVeryXml(new DOMParser().parseFromString(r.responseText,'text/xml'),vc,doc,kw);
            }
        }
    });
}
verydou();
