// ==UserScript==
// @name           OSU相关脚本整合
// @author         Muscipular
// @namespace      http://userscripts.org/scripts/show/101081
// @description    OSU相关脚本整合
// @include        http://osu.ppy.sh/*
// @version        0.1.1
// ==/UserScript==
/*
*1.整合OSU AnotherDownload 作者:9尾雪狐 link:http://userscripts.org/scripts/show/100778
*2.恢复以前的userpage转跳到当前排名的链接(只对前5000名有效)
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
			var c = $("<div class='beatmapDownloadButton' style='display:none;margin-left:0' id='mf'><a href='http://www.mediafire.com/?" + json[id].link + "' target='_blank'><img src='data:image/gif;base64,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'></a></div>");
			$(".beatmapDownloadButton:eq(0)").before(c);//插入点
			$(".beatmapDownloadButton:visible").attr("style","margin-left:0");//设置样式
			c.show();
		}
	});
	$.ajax({
		url: url+"&t=1",
		dataType: "jsonp",
		jsonp: 'callback',
		success: function(json){
			//插入图片链接
			var c = $("<div class='beatmapDownloadButton' style='display:none;margin-left:0' id='kr'><a href='http://osz.wo.tc/d/" + json[id].link + "'><img src='data:image/gif;base64,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'></a></div>");
			$(".beatmapDownloadButton:eq(0)").before(c);//插入点
			$(".beatmapDownloadButton:visible").attr("style","margin-left:0");//设置样式
			//if(type) c.show();
		}
	});
};

};
//插入脚本
addJQuery(main);
