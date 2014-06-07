/// <reference path="jquery-1.2.6-vsdoc.js" />

// ==UserScript==
// @name			HiHiSoSo_Douban
// @namespace		HiHiSoSo_Douban
// @version			v0.1.0
// @include			http://www.douban.com/subject/*
// @author			hihicd@hotmail.com
// @modified        2009-10-13
// @creation        2009-10-13
// @description     get downloading information from HiHiSoSo.com.
//
// ==/UserScript==

String.prototype.process = function(o) {
    return this.replace(/\$\{([^\}]+)\}/g, function(a, b) {
        return o ? o[b] : '';
    });
};

if (typeof unsafeWindow.jQuery !== "undefined") {
    var jQuery = unsafeWindow.jQuery;
    var $ = jQuery;
}

var HiHiSoSo4Douban = new function() {
    var _records = [],
        _isbn = '', _title = '', _link = '',
		_searchhost = 'http://www.hihisoso.com',
        _extLinkTpl = 'http://www.hihisoso.com/search.php?kwtype=0&keyword=${key}',
        _itemTpl = ['<li>',
                        '<a href="${link}" target="_blank">${title}</a>',
                        '<br />',
                        '大小：${size} 网盘：${website}',
                        '</li>'].join('');

    // analysis
    function _analyse(res) {
        var p = /<tbody>[^$]*?<\/tbody>/im;
        var r = res.responseText.match(p);

        if (r) {
            var rs = r[0];
            p = /<tr([^\$]|$)*?<td.*?<\/td>([^\$]|$)*?<\/tr>/img;
            var line = p.exec(rs);

            while (line) {
				var line_t = line[0];
				var data_r = [];
				// get link 
				var p2 = /<td.*height="30".*class="url"><a\s+.*?href="(.*?)"\s+.*?target="_blank">(.*?)<\/a>.*<\/td>/im;
				var r2 = p2.exec(line_t);

				data_r[1] = _searchhost.concat(r2[1]);

				// get title 
				data_r[2] = r2[2].replace(/<.*?>/img, '');

				// get size
				p2 = /<td.*height="30".*class="size">[^$]*?<\/td>/im;
				r2 = p2.exec(line_t);
				data_r[3] = r2[0].replace(/<.*?>/img, '');

				// get type
				p2 = /<td.*height="30".*class="type">[^$]*?<\/td>/im;
				r2 = p2.exec(line_t);
				data_r[4] = r2[0].replace(/<.*?>/img, '');
				
					_records.push({ 'link': data_r[1], 
									'title': data_r[2], 
									'size': data_r[3], 
									'website': data_r[4]
								});
								
				line = p.exec(rs);
            }
        }

        //document.body.innerHTML = _getHtml();
        var dp = $($('div.aside')[0]);
        dp && dp.prepend(_getHtml());
    }

    // gernerate html
    function _getHtml() {
        var _link = _extLinkTpl.process({ 'key': encodeURIComponent(_title) });
        var s = [];
        s.push('<script type="text/javascript">');
        s.push('var showing = false;');
        s.push('function _hihisoso_toggle(o){ var m = document.getElementById("_hihisoso_more"); if(showing){ m.style.display="none"; o.innerHTML = "显示更多..."; }else{ m.style.display=""; o.innerHTML = "收起"; } showing = !showing; }');
        s.push('</script>');
        s.push('<h2>海海搜搜为您找到网盘下载 ·  ·  ·  ·  ·  · </h2>');
        s.push('<div class="indent">');
        s.push('<h4 style="margin-bottom: 0px;"><a href="' + _link + '" target="_blank">去HiHiSoSo搜索更多结果</a></h4>');
        var l = _records.length;
        if (l > 0) {
            s.push('<ul class="bs">');
            for (var i = 0; i < 5 && i < l; i++) {
                s.push(_itemTpl.process(_records[i]));
            }
            s.push('<span id="_hihisoso_more" style="display:none">');
            while (i < l) {
                s.push(_itemTpl.process(_records[i]));
                i++;
            }
            s.push('</span>');
            if (l > 5) {
                s.push('<a href="javascript:void(0)" onclick="_hihisoso_toggle(this)">显示更多...</a>');
            }
            s.push('</ul>');
        }
        s.push('</div></br>');
        return s.join('');
    }

    // send a request
    function _request() {
        /*
        $.ajax({
        type: 'GET',
        url: "hihisoso.htm",
        dataType: 'html',
        cache: false,
        success: _analyse
        });
        */
        setTimeout(function() {
            GM_xmlhttpRequest({
                method: 'GET',
                url: _extLinkTpl.process({ 'key': encodeURIComponent(_title) }),
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) HiHiSoSo4Douban'
                },
                onload: _analyse
            })
        }, 500);
    }

    // start to collect info
    function _start() {
        var _tab = $('#nav a.now span').text();
        switch (_tab) {
            case '音乐':
                _title = $('h1').text();
                break;
            case '电影':
                _title = $('h1').text().split(' ')[0];
                break;
			case '读书':
                _title = $('h1').text();
                break;	
        }
        if (_title != '') {
            _request();
        }
    }

    // when dom ready, go!
    $(document).ready(_start);
} ();