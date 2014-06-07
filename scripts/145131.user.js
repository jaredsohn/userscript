// My first script for FF
// Add self-define video source function.
// 2013-06-01
// Copyright (c) 2013, Yang.RangerWolf & Mengfan_pp
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          豆瓣看电影
// @description   在豆瓣电影页面直接显示在线播放的来源
// @require       http://code.jquery.com/jquery-1.7.2.min.js
// @include       http://movie.douban.com/subject/*/
// @include       http://movie.douban.com/subject/*/?from=*
// @version       1.7.4.2
// ==/UserScript==
$(document).ready(function(){
	url = document.URL;
	if(url != null && url.indexOf("subject") != -1) {
        autoUpdateSourceList();
		insertIMDbScore();
		insertSettingDiv();
		insert();
		removeAds();
		//collectFavoriteMovies();
	} else if (url != null && url.indexOf("doulist") != -1) {
	
		console.log("doulist!!!!!!!!");
	}
});

// -----------------------------------  scripts for http://movie.douban.com/subject/*/ --------------------
/*
自动将url之中的Base64字段解析成json格式，并更新到localeStorage["full_src_list"]之中
URL example:
http://movie.douban.com/subject/:SubjectID/?from=sae_self_define&src_list=$$$$
*/
function autoUpdateSourceList() {
    url = document.URL;
    var identifierStr = "?from=sae_self_define&src_list=";
    var index = url.indexOf(identifierStr);
    if(index >= "http://movie.douban.com/subject".length) {
        console.log("before:" + url.substring(index + identifierStr.length));
        try {
            value = b64_to_utf8(url.substring(index + identifierStr.length));
            tempObj = JSON.parse(value);
            localStorage["full_src_list"] = value;
            window.location.href="http://movie.douban.com/subject/" + getIDFromURL() + "/";
        } catch(err) {
            alert("解析出错， 请再试一次。");
        }
    }
}


function insert() {
	$findingLabel = $("<div id='pre'><span class='pl'>在线观看: 正在查找片源...</span><div>");
	$("#info").append($findingLabel);
	
	var id = getIDFromURL();
	var name = getVideoCNName();
	name = name.replace(" ", "%20");
	console.log("insert -> name:" + name);
	var year = getVideoYear();
	$.ajax({
		url : "http://1.doubanvideo.sinaapp.com/GetVideoInfo_v3.php",
		type: "post",
		dataType: "json",
		data:{
			keyword: name,
			year : year
		},
		success:function(result, textStatus){
			$findingLabel.remove();
		    console.log("return:" + (result._ret == false));
            $div = $("<div style='background-color:#FFF;'><div>");
            $("#info").append($div);
            
			// 插入在线视频
            if(result._ret == false) {
				$text = $('<span class="pl">在线观看: 暂无片源</span>');
                $div.append($text);
            } else {
                $text = $('<span class="pl">在线观看: </span>');
                $div.append($text);
                
                $tvSourceDiv = $("<div style='background-color:#FFF;display:none'><div>");
				$tvText = $('<span class="pl">选择集数: </span>');
				$tvSourceDiv.append($tvText);
				
				var length = result.data.length;
				for(var i = 0; i < length; i++) {
				    var obj = result.data[i];
					
					var $span = $("<span style='margin-left:5px;' class='spans'></span>"); //此Span用于存放来源网站的logo,
                                                                                           //比如乐视的logo: http://static.soku.com/v1.0.0709/soku/img/favicon/letv.png
					$span.attr("name", obj._name);
					var $span_a = $("<a style='background-color:#FFF;'></a>");
                    
                    var status = obj._status;
                    var link = obj._href;
                    var $img = $("<img></img>");
					$img.attr("src", obj._img);
                    console.log("$$$" + link);
                    console.log("$$$" + obj._href.indexOf("cps.youku.com"));
                    if(obj._href.indexOf("cps.youku.com") != -1) {
                        status = "付费视频";
                        $img.attr("src", "http://doubanvideo-doubanvideoimg.stor.sinaapp.com/youku16.png");
                    }
                    
					$span_a.attr("title", obj._name + " " + status);
					$span_a.attr("target", "blank");
                    $span_a.attr("name", obj._name);
					
					
					
					$span_a.append($img);
					$span.append($span_a);
					$div.append($span);
					
					var count = obj._count;
					if(count != undefined && count != null && count > 0) {              // 对于连续剧，count会大于1， 如果==1， 则视为电影，否则是连续剧
						//$span_a.attr("href", "javascript:(void(0))");
						
						$tvSpan = $("<span></span>")
						$tvSpan.attr("name", obj._name);
						$tvSpan.attr("class", "db_video_extension_tv_span");
                        
						var $sel = $("<select t style='border: 1px solid grey;'><select>");
                        $sel.attr("name", obj._name);
						for(var j = count; j >= 1; j--)
						{
							var option = $("<option></option>");
							option.text(obj._name + " 第" + j + "集" );
							option.val(obj._urls[j-1]);
							option.appendTo($sel);
						}
						
						var $openLink = $("<a class='openLink' href='javascript:(void(0))'>GO</a>")
						$openLink.attr("name", obj._name);
						$tvSpan.append($sel);
						$tvSpan.append($openLink);
						$tvSpan.append($("<br>"));
						$tvSourceDiv.append($tvSpan);
						
                        // 点击来源logo之后的动作： 显示一个下拉列表，显示所有集数
                        $span_a.click(function(){
                            $tvSourceDiv.show();
                            $(".db_video_extension_tv_span").hide();        //隐藏所有的连续剧的span，下面只显示该显示的一个
                            $currentName = this.name
                            console.log('name=' + $currentName);
                            console.log('selector:' + ".db_video_extension_tv_span[name='" + $currentName +"']");
                            $(".db_video_extension_tv_span[name='" + $currentName +"']").show();
                        });
                        
                        
                        // Go 按钮的动作：
                        $openLink.click(function(){
                            $downlist = $("select[name='" + this.name + "']:first");
                            console.log("open " + $downlist.val());
                            window.open($downlist.val());
                        });
                        
					} else {
						$span_a.attr("href", obj._href);
					}
			    }
                $("#info").append($tvSourceDiv);
            }
            
            
            // 插入试试手气
            $div.append("<br>");
            $try = $('<span class="pl" >试试手气: </span>');
			$div.append($try);
            
            var localSelectedList = localStorage["selected_src_list"];
            var finalResult = "";
            if(localSelectedList == null || localSelectedList.length == 0) {
                localSelectedList = "";
            }
            finalResult = JSON.parse(localStorage["full_src_list"]);
            
            console.log("localSelectedList:\t" + localSelectedList);
            console.log("finalResult.length:" + finalResult.length);
            for(var i = 0; i < finalResult.length; i++) {
                var data = finalResult[i];
                $span = $("<span id='src_" + data.id +"'></span>");
                
                var searchURL = data.searchURL;
                searchURL = searchURL.replace("%s", name);
                $tmp = ('<a href="' + searchURL +'" title="到' + data.name +'试试" target="_blank">' + data.name + '</a>');
                $span.append($tmp);
                if(i < finalResult.length - 1) $span.append("&nbsp;");
                
                if(localSelectedList != null && localSelectedList.indexOf(data.id) == -1) 
                    $span.hide();
                $div.append($span);
                
            }
            
            
		}
	});
	
	//insertDouMail();
}

function insertIMDbScore() {
    $infodiv = $("#info");
    $links = $infodiv.find("a");
    $links.each(function(i){
        $href = $(this).attr("href");
        if($href.indexOf('http://www.imdb.com/title/') != -1) {
        $(this).after("<span style='padding-left:5px' id='imdb_rating_score'></span>");
            var arr = $href.split("/");
            var length = arr.length;
            if(length > 0) {
                var id = arr[length - 1];
                //var template = "http://imdbapi.org/?id=%s&type=json&plot=none&episode=0&lang=zh-CN&aka=simple&release=simple&business=0&tech=0";
                var template = "http://www.omdbapi.com/?i=%s";
                ratingUrl = template.replace("%s", id);
                console.log("imdb rating url: " + ratingUrl);
                $.ajax({
                    url : ratingUrl,
                    type: "get",
                    dataType: "json",
                    success: function(result, textStatus ) {
                        $("#imdb_rating_score").append("(评分：" + result.imdbRating +")");
                    }
                });
                
            }
        }
    });
}

function insertDouMail() {
	$ul = $(".rec-sec :eq(0)");
	$collect_li = $('<a  id="collectLink" class="a-btn mr5" style="vertical-align: middle;color:black;display:none" rel="nofollow"   href="javascript:void(0)" title="收藏">收藏</a>');
	$decollect_li = $('<a id="deCollectLink" class="a-btn mr5" style="vertical-align: middle;color:black;display:none" rel="nofollow" href="javascript:void(0)" title="取消收藏">取消收藏</a>');
	$ul.append($collect_li);  
	$ul.append($decollect_li);  
	var url = document.URL;
	var separator = "|";
	
	if(localStorage['favorite'] != null && localStorage['favorite'].indexOf(getIDFromURL()) != -1) {
		$collect_li.hide();
		$decollect_li.show();
		console.log("collect subjectID:" + getIDFromURL());
		
	} else {
		$collect_li.show();
		$decollect_li.hide();
	}
	
	$collect_li.click(function(){
		$decollect_li.show();
		$(this).hide();
		if(localStorage['favorite'] == null || localStorage['favorite'] == undefined) {
			localStorage['favorite'] = "";
		}
		localStorage['favorite'] = localStorage['favorite'] + getIDFromURL() + separator;
		console.log("collect:" + localStorage['favorite']);
	});
	$decollect_li.click(function(){
		$collect_li.show();
		$(this).hide();
		if(localStorage['favorite'] == null || localStorage['favorite'] == undefined) {
			localStorage['favorite'] = "";
		}
		localStorage['favorite'] = localStorage['favorite'].replace(getIDFromURL() + separator, "");
		console.log("collect:" + localStorage['favorite']);
	});
}

function getIDFromURL() {
	var href = location.href;
	//sample: http://movie.douban.com/subject/3016187/
	var id = href.split("/")[4];
	return id;
}

/**
    Use Video's CN name as search/post keyword
*/
function getVideoCNName() {
	// 从Title之中获取中文名
    var $name = $("title").text();
	var $values = $name.split(" ");
	var $result = "";
    for(var i = 0; i < $values.length; i++) {
        if($values[i].trim().length == 0) continue;
        $result = $values[i];
        break;
    } 
    $result = $result.replace("(豆瓣)", "");
	$result = $result.trim();
	console.log("~~~~ title=" + $result);
	//Extract real name
	//Example: 蝙蝠侠3：黑暗骑士的崛起 -> 黑暗骑士的崛起
	//兼顾中英文冒号分隔符
	var index = $result.indexOf("：");
	if(index != -1) {
	    $result = $result.substring(index + 1, $result.length);
	} else {
	    index = $result.indexOf(":");
		if(index != -1) $result = $result.substring(index + 1, $result.length);
	}
	console.log("index:" + index);
	
	return $result;
}


function getVideoYear() {
	//var $year = $("span[property='v:initialReleaseDate']").html().split("-")[0];
	var $year = $("span[property='v:initialReleaseDate']");
	if($year.html() == null || $year.html() == "null") return "";
	else
		$year = $year.html().split("-")[0];
	console.log("year:" + $year);
	return $year;
	
}

function removeAds() {
    $("#dale_movie_subject_top_right").remove();
}

function defaultSettingOfSrcList(isRestoreDefault) {
console.log("perform default settings");
	// Step 1: Get full list from server and save it into full list
	var fullList = "";
	$.ajax({
		url : "http://1.doubanvideo.sinaapp.com/sourcelist.php",
		type: "get",
		dataType: "json",
		success: function(result, textStatus ) {
			localStorage["full_src_list"] = JSON.stringify(result);
            if(isRestoreDefault) {
                document.location.reload();
            }
		}
	});
}

function insertSettingDiv() {
	$holder = $("#subject-doulist");
	$div = $("<div></div>");
	$title = $("<h2>豆瓣看电影 设置</h2>");
	$settingImg = $("<img alt='隐藏设置页面' style='padding-left: 5px' id='db_collapse_setting' src='http://www.easyicon.cn/download/png/26529/16/' width='13px' height='13px'/>");
	$settingImg.click(function(){
		$setting_div = $("#setting_div");
		if($setting_div.css("display") == "none") {
			$("#setting_div").show();
			localStorage.isSettingDivShow = "true";
		} else {
			$("#setting_div").hide();
			localStorage.isSettingDivShow = "false";
		}
	});
	
	$title.append($settingImg);
	$div.append($title);
	
	// 插入查看搜藏列表
	
	
	// 插入第三方视频来源选择部分
	$contentDiv = $("<div id='setting_div'></div>");
	$contentDiv.append("<span class='pl' style='color:black'>第三方视频来源</span>");
    
    $updateLink = $('<a href="javascript:(void(0))" style="margin-left:5px">恢复默认</a>');
    $contentDiv.append($updateLink);
    $updateLink.click(function(){
        if(confirm("恢复默认？\n注意：恢复默认之后，之前的操作无法撤销！"))
            defaultSettingOfSrcList(true);
    });
    
    
    $contentDiv.append("<br>");
	var localSrcList = localStorage.full_src_list;
	if(localSrcList == null) {
		defaultSettingOfSrcList(false);
		localSrcList = localStorage.full_src_list;
	}
	console.log("!!!" + localSrcList);
	var srcObject = JSON.parse(localSrcList);	
	var spearator = "|";
	for(var i = 0; i < srcObject.length; i++) {
	    var data = srcObject[i];
		var checked = "";
		if(localStorage.selected_src_list != null && localStorage.selected_src_list.indexOf(data.id) != -1)
			checked = "checked";
		if (localStorage.selected_src_list == null) {
			if (data.defaultSelected == "true") {
				checked = "checked";
			}
		}
		$input = $("<input id='" + data.id +"' class='_source_list_' type='checkbox' name='srclist' value='" + data.id  +"'" + checked +"/>");
		$label = $("<label for='" + data.id +"'>" + data.name +"</label>")
		$input.click(function(){
			console.log("id:" + this.id + "::" + this.checked);
			var selected_src_list = localStorage["selected_src_list"];
			if(this.checked) {
				if(selected_src_list == null || selected_src_list.length == 0) {
					localStorage["selected_src_list"] = this.id + spearator;
				} else 
					localStorage["selected_src_list"] = selected_src_list + this.id + spearator;
				$("#src_" + this.id).show();
			} else {
				localStorage["selected_src_list"] = selected_src_list.replace(this.id + spearator, "");
				$("#src_" + this.id).hide();
			}
		});
		$tmpOption = $("<span style='width:75px;display:inline-block'></span>");
		$tmpOption.append($input);
		$tmpOption.append($label);
			$contentDiv.append($tmpOption);
		console.log("i % 4 = " + i % 4);
		if ( (i + 1) % 4 == 0) {
			$contentDiv.append("<br>");
		} 
	}
	
    // 插入自定义规则部分
    $contentDiv.append('<br/>');
    $contentDiv.append("<span class='pl' style='color:black'>自定义视频来源：</span>");
    $ruleBox = $("<input  style='width:215px' type='text' value='' id='saveRuleBtn' />");
    $saveRuleBtn = $("<span class='pl'><a href='javascript:(void(0))'>更新</a></span>");
    $makeRuleBtn = $("<span class='pl'><a href='javascript:(void(0))'>  DIY</a></span>");
    $contentDiv.append($ruleBox);
    $contentDiv.append($saveRuleBtn);
    $contentDiv.append($makeRuleBtn);
    
    $saveRuleBtn.click(function(){      //首先保存到一个临时项: *_temp, 然后试图进行解析。如果能解析成功并获取需要的值，再跟用户确认之后就写到正式的项之中并重新加载本页面
        var newSrcList = $("#saveRuleBtn").val();
        localStorage["full_src_list_temp"] = newSrcList;
        var parsingResult = true;
        var confirmStr = "新的视频来源：";
        try {
            var srcObject = JSON.parse(newSrcList);
            var length = srcObject.length;
            if(length == undefined ) {
                parsingResult = false;
            } else {
                
                for(var i = 0; i < length; i++) {
                    if(srcObject[i].name == undefined) {
                        parsingResult = false;
                        break;
                    }
                    confirmStr += srcObject[i].name + ",";
                }
            }
        }
        catch(err) {
           parsingResult = false;
        }
        if(parsingResult) {
            if(confirm(confirmStr + "确认?")) {
                localStorage["full_src_list"] = newSrcList;
                document.location.reload();
            } 
        } else {
            alert("解析出错，更新中止。");
        }
    });
    
    $makeRuleBtn.click(function(){
        window.open("http://1.doubanvideo.sinaapp.com/index.html");
    });
    
    // 插入分割线
	$contentDiv.append('<div class="ul" style="margin-bottom:5px;margin-top:3px;"></div>');
    // 插入帮助 : 帮我评分， 帮我推荐， 帮我点广告
    $helpDiv = $("<div></div>");
    $helpTitle = $("<span class='pl' style='color:black'>其他</span>");
    $helpDiv.append($helpTitle);
    $helpDiv.append("<br>");
    
    // 帮我评分
    $helpRatingLink = $("<span class='pl'><a href='javascript:(void(0))'>帮我评分</a></span>");
	$helpRatingLink.click(function(){
        window.open("https://chrome.google.com/webstore/detail/lhfmcbnidnkaalleepapkdnfblbiaacl");
	});
    // 帮我推荐
    $helpRecommandLink = $("<span class='pl'><a href='javascript:(void(0))'>  帮我推荐</a></span>");
	$helpRecommandLink.click(function(){
        window.open("http://shuo.douban.com/!service/share?apikey=&name=%E8%87%AA%E5%B7%B1%E5%81%9A%E7%9A%84+%E5%9F%BA%E4%BA%8Echrome%E4%B8%8A%E9%9D%A2%E7%9A%84%E4%B8%80%E4%B8%AA%E8%B1%86%E7%93%A3%E6%89%A9%E5%B1%95%EF%BC%9A+%E8%B1%86%E7%93%A3%E7%94%B5%E5%BD%B1%E5%9C%A8%E7%BA%BF%E7%9C%8B&image=http%3A%2F%2Fimg3.douban.com%2Fview%2Fthing_review%2Fsmall%2Fpublic%2Fp11780.jpg&redir=http%3A%2F%2Fwww.douban.com%2Freview%2F5574779%2F&href=http%3A%2F%2Fwww.douban.com%2Freview%2F5574779%2F&curl=&type=&properties=%7B%7D&desc=%E4%BC%A0%E9%80%81%E9%97%A8%EF%BC%9A+https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdet...");
	});
    
    
    $helpDiv.append($helpRatingLink);
    $helpDiv.append($helpRecommandLink);
    $contentDiv.append($helpDiv);
    
    // 插入其他榜单
    $boxOfficeOption = $("<select style='margin-left:5px' ></select>");
    $boxOfficeOption.append("<option value='http://movie.mtime.com/boxoffice/#US'>北美票房榜</option>");
    $boxOfficeOption.append("<option value='http://movie.mtime.com/boxoffice/#CN'>内地票房榜</option>");
    $boxOfficeOption.append("<option value='http://movie.mtime.com/boxoffice/#HK'>香港票房榜</option>");
    $boxOfficeOption.append("<option value='http://movie.mtime.com/boxoffice/#TW'>台湾票房榜</option>");
    $boxOfficeOption.append("<option value='http://movie.mtime.com/boxoffice/#JP'>日本票房榜</option>");
    $boxOfficeOption.append("<option value='http://movie.mtime.com/boxoffice/#KR'>韩国票房榜</option>");
    $boxOfficeOption.append("<option value='http://movie.mtime.com/boxoffice/#FR'>法国票房榜</option>");
    //$helpDiv.append($boxOfficeOption);
    
    // 插入分割线
	//$contentDiv.append('<div class="ul" style="margin-bottom:5px;margin-top:3px;"></div>');
    
	// 插入留言
	$tip = $("<div><span class='pl'>如需添加其他网站或有任何建议，都可以给我<a href='http://www.douban.com/doumail/write?to=64449456' target='_blank'>留言</a>哦:)</span></div>");
	$contentDiv.append($tip);
	
	// 由于采用了omdbapi 取消鸣谢
	//$thanksIMDBAPI = $("<div  style='padding-top:6px'><span class='pl'>特别鸣谢<a href='http://weibo.com/imdbapi' target='_blank'>IMDBAPI</a>提供的IMDb的评分接口！</span></div>");
	//$contentDiv.append($thanksIMDBAPI);
	
	$contentDiv.append('<div class="ul" style="margin-bottom:12px;margin-top:3px;"></div><br>');
	$div.append($contentDiv);
	$holder.after($div);
	
	if(localStorage.isSettingDivShow != null && localStorage.isSettingDivShow == "false") 
		$contentDiv.css("display", "none");
	//$contentDiv.append('<!-- UY BEGIN --><div id="uyan_frame"></div><script type="text/javascript" id="UYScript" src="http://v1.uyan.cc/js/iframe.js?UYUserId=0" async=""></script><!-- UY END -->');
}

function collectFavoriteMovies() {
	// insert a "Collect" button 
	$interest_sect_level = $("#interest_sect_level > a");
	$collectFaBtn = $('<a href="#" rel="nofollow" class="collect_btn colbutt ll" name="pbtn-4312428-favorite"><span>收藏</span></a>');
	$interest_sect_level.insertBefore($collectFaBtn);
	
}

// store current movie info into local storage
// info scope:
// subjectID, rating result, title, image
function storeCurrentMovieInfo() {
	

}

// -----------------------------------  scripts for http://movie.douban.com/doulist/*/ --------------------
