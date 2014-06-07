// ==UserScript==
// @name            Bidown
// @include         http://www.bilibili.tv/video/av*
// @version		0.1
// ==/UserScript==
GM_addStyle("li.bidown{list-style:none;font-size: 14px;padding: 5px;}\
.biinput{color:#DBD9D9;width:500px;border:1px solid #4FC1FF;border-radius:5px;/*圆角*/outline:none;box-shadow:0px 0px 0px #8DD5FF;-webkit-transition:box-shadow .25s linear;-moz-transition:box-shadow .25s linear;}\
.biinput:hover{box-shadow:0px 0px 15px #8DD5FF;-webkit-transition:box-shadow .25s linear;-moz-transition:box-shadow .25s linear;}");


GM_xmlhttpRequest({
	method: "GET",
  	headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1",    
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"  
		},
	url: "http://www.flvcd.com/parse.php?kw="+location.href.toString(),
	onload: function(response) {
	console.log('start');
		var _justOne = /<a[^>]*?class="link"[^>]*?>[\s\S]*?<\/a>/ig;
		var _hasOne = _justOne.exec(response.responseText);
		var _ul = "<ul>";
		console.log(_hasOne);
		var v = document.getElementById("arcgg3");
		if(!_hasOne){
			var _hasSome = /&lt;U&gt;.*/g;
			var _resText = response.responseText;
			var _temp = _resText.match(_hasSome);
			var _addList = _temp.toString().split(',');
			for (var i in _addList){
				_ul = _ul + '<li class=\"bidown\">'+ '<input type=\"text\" value=\"' + _addList[i].substring(9) +'\" class=\"biinput\"/><a href=\"' + _addList[i].substring(9) + '\">下载</a>'+ "</li>";
			}
			_ul = _ul + '</ul>';
			v.innerHTML = _ul;
		}else{
			var start = _hasOne.toString().indexOf('"',9);
			var _get = _hasOne.toString().substring(9,start);
			_ul = _ul + '<li class=\"bidown\">'+ '<input type=\"text\" value=\"' + _get +' class=\"biinput\"/><a href=\"' + _get + '\">下载</a>'+ '</li></ul>';
			console.log(_ul);
			v.innerHTML = _ul;
		}
  }
});

function remove(list)
{
	for(var i = 0; i < arguments.length ; i++){
		var o = document.getElementById(arguments[i]);
		o.parentNode.removeChild(o);
	}
}
remove('alistads','contgg1');
