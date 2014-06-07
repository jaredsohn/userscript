// ==UserScript==
// @author         Mitsuhiro Setoguchi
// @name           mixi voice at home
// @namespace      http://straitmouth.jp
// @description    show mixi voices at your home in mixi
// @include        http://mixi.jp/
// @include        http://mixi.jp/home.pl*
// ==/UserScript==

(function(d){
    function main() {
	var uls = d.getElementsByTagName("ul");
	var voiceList = null;
	for (var i=0; i<uls.length; i++) {
	    if (uls[i].className === "vList") {
		run(uls[i]);
		break;
	    }
	}
    }

    function run(voiceList) {
	GM_xmlhttpRequest({
	    method: "GET",
	    url: "http://mixi.jp/recent_voice.pl",
	    headers: {'Cookie': document.cookie},
	    onload: function(res) {
		var skip_ids, max_voices;
		
		function _init() {
		skip_ids = eval(GM_getValue('skip_ids', '[]'));
		    max_voices = GM_getValue('max_voices', 10);
		    
		    var _children_length = voiceList.childNodes.length;
		    for (var i=0; i<_children_length; i++)
			voiceList.removeChild(voiceList.lastChild);
		}
		
		function _append_each(body, id, time, nickname) {
		    var li = d.createElement("li");
		    li.innerHTML = body + "(" + nickname + ")";
		    voiceList.appendChild(li);
		}
		
		function _append_voices() {
		    var bdpat = '<div class="voiced">\\s+<p>(.*?)</p>';
		    var idpat = 'name="member_id" value="(\\d+)"';
		    var ptpat = 'name="post_time" value="(\\d+)"';
		    var nnpat = 'name="nickname" value="(.*?)"';
		    
		    var bds = res.responseText.match(bdpat, "g");
		    var ids = res.responseText.match(idpat, "g");
		    var pts = res.responseText.match(ptpat, "g");
		    var nns = res.responseText.match(nnpat, "g");
		    
		    var counter = 0;
		    for (var i=0; i<nns.length; i++) {
			var to_show = true;
			for (var j=0; j<skip_ids.length; j++) {
			    if (ids[i].match(idpat)[1] == skip_ids[j]) {
				to_show = false;
				break
			    }
			}
			
			if (to_show) {
			    _append_each(bds[i].match(bdpat)[1],
					 ids[i].match(idpat)[1],
					 pts[i].match(ptpat)[1],
					 nns[i].match(nnpat)[1]);
			    counter++;
			    if (counter >= max_voices) {
				break;
			    }
			}
		    }
		}
		
		function _finish() {
		    d.getElementById("redirect").setAttribute("value", "home");
		    voiceList.parentNode.style.backgroundColor = "#FFF";
		    
		    GM_setValue('skip_ids', skip_ids.toSource());
		    GM_setValue('max_voices', max_voices);
		}
		
		_init();
		_append_voices();
		_finish();
	    }
	});
    }
    
    main();
}(document));
