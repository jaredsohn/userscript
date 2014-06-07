// ==UserScript==
// @name           OSU相关脚本整合
// @author         Muscipular (GongT修改版)
// @namespace      http://userscripts.org/
// @description    OSU相关脚本整合
// @include        http://osu.ppy.sh/*
// @version        0.0.1
// ==/UserScript==
/*
*1.整合OSU AnotherDownload 作者:9尾雪狐 link:http://userscripts.org/scripts/show/100778
*2.恢复以前的userpage转跳到当前排名的链接(只对前5000名有效)
*3.快速uuu9搜索
*http://osz.wo.tc/s
*/
//插入脚本的函数
function addJQuery(callback){
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();var type=false;";
	document.body.appendChild(script);
};
//主函数
function main(){
if(self.location.href.search(/osu.ppy.sh\/[sb]/)>-1) detail();
if(self.location.href.search("osu.ppy.sh/p/beatmaplist")>-1) beatmaplist();
if(self.location.href.search(/osu.ppy.sh\/([\?p=profile|u\/])/)>-1){loadInCurrentTab=userpage;}
if(self.location.href.search('osu.ppy.sh/p/playerranking/')>-1){
	$('tr:contains("'+decodeURI(/f\=(.*)#/.exec(self.location.href)[1])+'")').removeClass().addClass("row4p").attr("name","jumpto").attr("id","jumpto");
	self.location.hash=self.location.hash;
}

function userpage(page){
    if (activeRequest) {
        activeRequest.abort();
    }
    activeRequest = $.get(page, null, function(text){
		activeRequest = null;
		$("#" + activeTab).html(text);
		$("#" + activeTab).stop(true, true).fadeTo(50, 1, function () {$("#" + activeTab).css("filter", "none");});
		$("#" + activeTab).addClass("loaded");
		if(activeTab=="general"){
			var r=$('.profileStatLine:contains("Ranked Score") b:contains("#")');
			var p=Math.ceil(/(\d+)/.exec(r.text())[0]/50);
			//if(p>100) return;
			r.wrap("<a href='http://osu.ppy.sh/p/playerranking/?m="+activeGameMode+"&s=3&o=1&page="+p+"&f="+$(".row2p.h1").html()+"#jumpto'></a>")			
		}
	});
};
function beatmaplist(){
	var url="http://www.muscipular.net/osudb.php";
	//获取页面上所有id并生成查询
	$(".expandableInfo").each(function(i){
			url=url+((i==0)?'?id':('&id'+i))+'='+/\d+/.exec(this.id);
		});
	//以jsnop获取mediafire的地址
	$.ajax({
		url:url,
		dataType:"jsonp",
		jsonp: 'callback',
		success: function(json){
			//json返回的数组
			$.each(json,function(i,o){//枚举json并在在相应的div插入链接,参数i是索引,参数o是索引指向的值等同json[i]
				var c="| <a href='http://www.mediafire.com/?" + o.link + "' target='_blank'>分流(Mediafire)</a>";
				var t=$("#info"+o.id+" a:eq(1)");//登陆后的插入点
				if(!t.length) t=$("#info"+o.id+" a:eq(0)");//登陆前的插入点
				t.after(c);
			});
		}
	});
	$.ajax({
		url:url+'&t=1',
		dataType:"jsonp",
		jsonp: 'callback',
		success: function(json){
			//json返回的数组
			$.each(json,function(i,o){//枚举json并在在相应的div插入链接,参数i是索引,参数o是索引指向的值等同json[i]
				var c="| <a href='http://osz.wo.tc/d/" + o.link + "'>分流(osz.wo.tc)</a>";
				var t=$("#info"+o.id+" a:eq(1)");//登陆后的插入点
				if(!t.length) t=$("#info"+o.id+" a:eq(0)");//登陆前的插入点
				t.after(c);
			});
		}
	});
};
function conver(){type=!type;if(type){$('#kr').show();$('#mf').hide();$(this).text("切换到从MediaFire下载")}else{$('#kr').hide();$('#mf').show();$(this).text("切换到从osz.wo.tc下载")}}
function detail(){
	//图片base64
	var pic_u9='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';
	var pic_mf='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';


	function insert_button( Link , Pic ){
		var c = $("<div class='beatmapDownloadButton' style='display:none;margin-left:0'><a href='"+Link+"' target='_blank'><img src='data:image/gif;base64," + Pic + "'></a></div>");
		$(".beatmapDownloadButton:eq(0)").before(c);//插入点
		$(".beatmapDownloadButton:visible").attr("style","margin-left:0");//设置样式
		c.show();
	}

	var html=document.body.innerHTML;
	var id=/update.php\?s=(\d+)&o=/.exec(html)[1];
	html=$("<a href='javascript:;'>切换到从osz.wo.tc下载</a>");
	html.click(conver);
	$('td.colour:contains("osu") br:eq(1)').after(html);
	var url="http://www.muscipular.net/osudb.php?id="+id;
	$(".posttext").attr("style","height:126px");//设置样式
	//以jsnop获取mediafire的地址
	$.ajax({
		url: url,
		dataType: "jsonp",
		jsonp: 'callback',
		success: function(json){
			//插入图片链接
			insert_button('http://www.mediafire.com/?' + json[id].link , pic_mf);
		}
	});
	
	var title_str = $('h1').html();
	var Name = /[^»]*» .* - (.*)/.exec(title_str)[1];
	var url9 = "http://osu.uuu9.com/Search.aspx?keyword="+escape(Name);
	
	insert_button(url9 , pic_u9);
	
	
	};

};

//插入脚本
addJQuery(main);
//$(document).ready(main);