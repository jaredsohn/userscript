// ==UserScript==
// @name       BaicizhanEnhancer
// @namespace  http://www.hiweiye.com/
// @version    0.5.1
// @description  百词斩网页增强
// @match      http://www.baicizhan.com/user/words/*
// @copyright  2013+, 苇叶
// ==/UserScript==
// Version 0.5 Changelist
// 1. 增加发音按钮

// Version 0.4 Changelist
// 1. 点击单词或者意思可以直接隐藏/显示单个单词

// Version 0.3 Changelist
// 1. 点击列表标题位置，可因此单词列或者意思列
// 2. 优化代码

// Version 0.2 Changelist
// 1. 可按照错误次数排序，不过只能在当前页内排序。

// Version 0.1 Changelist
// 1. 在单词列表页中增加斩按钮

var Baicizhan = {
	current_page:1,
	order : 1,
	pass_review:function(word_id, callback){
        $("#slash").get(0).play();
		$.post("/words/pass_review_word.json", {
			word_topic_id: word_id
		},function(a){
			if (typeof callback == 'function'){
				callback();
			}
		}, 'json');
	},
	get_current_list:function (){
		return $("#all-word-list-tab ul.word-list.list-page-"+Baicizhan.current_page);
	},
	toggle_chinese:function(){
		var $list = Baicizhan.get_current_list().find(".list-word-mean span")
		//var visible = $list.eq(0).css('visibility') == 'hidden' ? 'visible' : 'hidden';
		//$list.css('visibility', visible);
        $list.toggleClass("hidden");
	},
	toggle_english:function(){
		var $list = Baicizhan.get_current_list().find(".list-word-title span")
		//var visible = $list.eq(0).css('visibility') == 'hidden' ? 'visible' : 'hidden';
		//$list.css('visibility', visible);
        $list.toggleClass("hidden");

	},
	sort_by_wrong_times:function(order){
		var order = order || 1;
		var origin = Baicizhan.get_current_list().find("li[class^='list_line']");
		var result = origin.map(function(index, item){var a = $("div", item);return {"topic_id":$(item).data('topic-id') ,'word':a[0].innerText, 'word_meaning':a[1].innerText, 'wrong_times':parseInt(a[2].innerText)};});
		result.sort(function(a, b){return a.wrong_times < b.wrong_times ? order: -order;})
		origin.remove();
		Baicizhan.build_html(result);
	},
	remove_current: function (){
		Baicizhan.get_current_list().find("li[class^='list_line']").remove();
	},
	show_page: function (page){
		if ( typeof $ === "undefined" ){
			console.log("jquery not loaded");
			return false;
		}
		var page = page || 1;
		Baicizhan.current_page = page;
		Baicizhan.order = 1;
		console.log('show_page '+ page);
		$.get('/user/all_done_words_list?page='+page, function(data){
			Baicizhan.remove_current();
			Baicizhan.build_html(data.list);
		}, 'json');
	},
	bind_click_handler: function (){
		$("#all-word-list-tab .word-list-paginate a").unbind();
		$("#all-word-list-tab").bind("click", function(e){
			var $target = $(e.target);
			if ($target.parent().hasClass("list-word-operation")){
                if ($target.hasClass("play")){
                    console.log("play")
                    $target.closest("li").find("audio").get(0).play();
                 	return false;   
                }
				var topic_id = $(e.target).closest("li").data("topic-id");
				if (topic_id > 0){
					Baicizhan.pass_review(topic_id, function(){
						$(e.target).closest("li").remove();
					});
				}          
				return false;
			}
			if ($target.parent().hasClass('word-list-paginate')){
				var page = parseInt($(e.target).text());
				Baicizhan.show_page(page);
				return false;
			}
			
			if ($target.hasClass("title-word-wrong-times")){
				Baicizhan.sort_by_wrong_times(Baicizhan.order);
				Baicizhan.order = -Baicizhan.order;
				return false;
			}
			
			if ($target.hasClass("title-word")){
				Baicizhan.toggle_english();		
			}
			if ($target.hasClass("title-word-mean")){
				Baicizhan.toggle_chinese();
			}
            if ($target.closest("div").hasClass("list-word-mean") || $target.closest("div").hasClass("list-word-title")){
                $(e.target).closest("div").find("span").toggleClass('hidden')
			}
		})
	},
	build_html: function (rows){
		var html = '';
		for (var i=0;i<rows.length;i++){
			var style = i % 2 == 0 ? 'odd' : 'even';
			var row = ['<li class="list_line_%style%" data-topic-id="%topic_id%" >',
					   '<div class="list-word-title"><span>%word%</span></div>',
					   '<div class="list-word-mean"><span>%word_meaning%</span></div>',
					   '<div class="list-word-wrong-times">%wrong_times%</div>',
					   '<div class="list-word-operation"><button class="zhan"> 斩 </button> <button class="play"> 听 </button></div>',
                       '<audio src="http://baicizhan.qiniudn.com/word_audios/%word%.mp3"></audio>',
					   '</li>\n'].join('\n');
			row = row.replace(/%topic_id%/g, rows[i].topic_id).replace(/%word%/g, rows[i].word).replace('%style%', style);
			row = row.replace('%word_meaning%', rows[i].word_meaning).replace('%wrong_times%', rows[i].wrong_times);
			html +=row;
		}
		
		$("ul.word-list:eq(0)").append(html);
	}
};

var GM = {
	addSheet:function(cssCode){
	  cssCode = cssCode + "\n";//增加末尾的换行符，方便在firebug下的查看。
	  var doc = document;
	  var headElement = doc.getElementsByTagName("head")[0];
	  var styleElements = headElement.getElementsByTagName("style");
	  if(styleElements.length == 0){//如果不存在style元素则创建
		if(doc.createStyleSheet){    //ie
		  doc.createStyleSheet();
		}else{
		  var tempStyleElement = doc.createElement('style');//w3c
		  tempStyleElement.setAttribute("type", "text/css");
		  headElement.appendChild(tempStyleElement);
		}
	  }
		
	  var  styleElement = styleElements[0];
	  var media = styleElement.getAttribute("media");
	  if(media != null && !/screen/.test(media.toLowerCase()) ){
		styleElement.setAttribute("media","screen");
	  }
	   styleElement.appendChild(doc.createTextNode(cssCode))
	},
	loadScript:function(src){
		var script = document.createElement('script');
		script.src = src;
		script.type= 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(script);
	}
};

GM.loadScript("http://mat1.gtimg.com/www/js/common/jquery-1.8.2.min.js");
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// *** put your code inside letsJQuery: ***
function letsJQuery()
{
    $(document).ready(function () {
        if (document.getElementById('all-word-list-tab') != null){
        	$("#all-word-list-tab").show();
        	$("#all-passed-word-list").hide();
            $("<audio>").attr("id", "slash").attr("src", "http://assets.baicizhan.com/pack/slash_slash.mp3").appendTo("body");
            GM.addSheet("#all-word-list-tab .list-word-mean{width:415px!important;} "+
                        ".list-word-operation{float:left;cursor:pointer;}" +
                        ".list-word-operation button{width:50px;} .hidden{visibility:hidden;}"+
                        ".list-word-wrong-times{width:40px!important;}"
                        //".list-word-operation .play{background: url('http://assets.baicizhan.com/pack/assets/play.png') no-repeat 0 0;}"
                       );
        	Baicizhan.bind_click_handler();
        	Baicizhan.show_page();
        }
    });
}
