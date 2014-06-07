// ==UserScript==
// @name           Mtime 2 VeryCD
// @namespace      http://ahydra.org/snaked/
// @include        http://www.mtime.com/movie/*
// @include        http://movie.mtime.com/*
// @description    Show related resource on VeryCD as a sidebar item for Mtime(on movie overview pages).
// ==/UserScript==
//

//some codes referred verydou by surfchen
//http://userscripts.org/scripts/show/37744

function handleVeryXml(xo,vc,doc,kw) {
    var topics=xo.getElementsByTagName('folder'); 
    var l=topics.length;
    if (l>0) {
        var t;
        var title;
        var link;
        var vc_ul=doc.createElement("ul");
        vc_ul.className='mt12';
        for (var i=0;i<10;i++) {
            if (i>=l) {
                break;
            }
            t=topics.item(i);
            title=t.getElementsByTagName('name').item(0).firstChild.nodeValue;
            link=t.getElementsByTagName('link').item(0).firstChild.nodeValue;
            vc_ul.innerHTML+='<li><span class="ele_dot">&middot;</span><a href="'+link+'" target="_blank">'+title+'</a></li>';
        }
        vc.removeChild(doc.getElementById('vcloading'));
        vc.appendChild(vc_ul);
        var vc_span=doc.createElement('p');
        vc_span.className='pt12 tr';
        vc.appendChild(vc_span);
        vc_span.innerHTML='<a href="http://www.verycd.com/search/folders/'+kw+'" target="_blank">&#26356;&#22810;</a><span class="gt">&gt;&gt;</span>'
    } else {
        doc.getElementById('vcloading').innerHTML='&#26410;&#25214;&#21040;&#30456;&#20851;&#36164;&#28304;&#65292;<a href="http://www.verycd.com/search/" target="_blank">&#20146;&#33258;&#23547;&#25214;&#20114;&#32852;&#32593;</a>'
    }
}


function pirateMtime() {
    var doc = document;
    //if (doc.location.href.search(/mtime.com\/movie\/[0-9]+\/(?:\?.*)?$/) < 0) {
      //  return;
    //}

    //寻找位置
    try {
        var ri=document.getElementById("movie_main_r")
        //alert(ri)
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
    find_cat='%E7%94%B5%E5%BD%B1'; // 类别锁定为电影

    //获取关键词
    var kw=doc.title.match(/^\S+/)[0];
    kw=encodeURIComponent(kw);

    //构建url
	//url = 'http://www.verycd.com/search/folders?status=elite&rev=1&kw=' + kw + '&format=xml';
	url = 'http://www.verycd.com/search/folders?status=all&rev=1&kw=' + kw + '&format=xml';
	if (find_cat) {
		url += '&catalog=' + find_cat;
	}

    //创建放置资源的容器
    var vc = doc.createElement("div");
    vc.className='ele_inner';
    vc.innerHTML='<h2>VeryCD&#36164;&#28304;&#20256;&#36865;&#38376;</h2><div class="line_dot"></div><span id="vcloading">&#21152;&#36733;&#20013;...</span>';
    var vcOuter = doc.createElement("div");
    vcOuter.className='ele_outer';
	vcOuter.appendChild(vc)
    var vcC = doc.createElement("div");
    vcC.className='__r_c_';
    vcC.appendChild(vcOuter)
    ri.insertBefore(vcC,obss);

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

//window.addEventListener('load', pirateMtime, false);
//pirateMtime();

setTimeout(function(){
	pirateMtime()
}, 0);
