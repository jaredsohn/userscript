// ==UserScript==
// @name           removeAds
// @namespace      http://userscripts.org/scripts/show/109316
// @description    This script can remove ads of google and baidu
// @include        http://*.*
// @exclude        *.google.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        1.4
// @history        1.4  Remove youdao ads
// @history        1.3  Add more ads type
// @history        1.2  Exclude google related site
// @history        1.1  Add update button.  Optimize css.
// @history        1.0	Initial release.
// ==/UserScript==

var version = 1.4;

function addGlobalStyle() {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (top != window && !head) {
		return; 
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = 
		'#ads_num_win{font-family:verdana;'
			+'color:white;'
			+'background-color:#333333;'
			+'opacity:0.5;'
			+'position:absolute;'
			+'height:50px;'
			+'top:10px;'
			+'left:10px;'
			+'display:none;'
			+'z-index:10000001;'
			+'font-size:12px;'
			+'padding:5px;'
			+'}'
		+'#ads_num_win_table tr,td{'
			+'border: 0px;'
			+'padding:2px}'
		+'#ads_num_win_x{'
			+'color:white;'
			+'cursor:pointer;}'
		+'#ads_num_win_check{'
			+'cursor:pointer;'
			+'color:white;'
			+'text-decoration:underline;}'
		+'#ads_num_win_update{'
			+'cursor:pointer;'
			+'color:white;'
			+'text-decoration:underline;'
			+'display:none;}'
		;
	head.appendChild(style);
}

//popup a window
function popupWindow(count_ads){
	
	$("body").append('<div id = "ads_num_win">'
		+'<table id="ads_num_win_table">'
		+'<tr><td>'	// 1st line
		+count_ads + " Ad(s) are blocked!"	//text content
		+'</td>'
		+'<td><div id="ads_num_win_x">'
		+' X '	// close button
		+'</div></td></tr>'
		+'<tr><td>'	//2nd line
		+'<div id="ads_num_win_check">'
		+'&gt;&gt;Check for Update&lt;&lt;'	// check update button
		+'</div>'
		+'<a id="ads_num_win_update"'
		+'	href="http://userscripts.org/scripts/source/109316.user.js">'
		+'&gt;&gtUpdate Now&lt;&lt;'	// update button
		+'</a>'
		+'<div id="ads_num_win_info" style="display:none;"/>'
		+'</td><td>&nbsp;</td></tr></table>'
		+'</div>');
	$("#ads_num_win").fadeIn("slow");
	$("#ads_num_win_x").click(function(){
			$("#ads_num_win").fadeOut("slow");
			$("#ads_num_win").hide("slow");
		}
	);
	$("#ads_num_win").mouseenter(function(){
			$("#ads_num_win").css("opacity", "1");
		}
	);
	$("#ads_num_win").mouseleave(function(){
			$("#ads_num_win").css("opacity", "0.5");
		}
	);
	
	$("#ads_num_win_check").click(function(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/109316.meta.js',
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(responseDetails) {
				var html = responseDetails.responseText;
				
				var startStr = '@version';
				var endStr = '// @history';
				var startIndex = html.indexOf(startStr);
				var endIndex = html.indexOf(endStr);
				if(startIndex > -1 && endIndex > -1){
					var remoteVersion = html.substring(startIndex + startStr.length, endIndex);
					remoteVersion = $.trim(remoteVersion);
					if(parseFloat(remoteVersion) > version){
						$("#ads_num_win_check").css("display","none");
						$("#ads_num_win_update").css("display","inline");
					}else{
						$("#ads_num_win_check").css("display","none");
						$("#ads_num_win_info").css("display","inline");
						$("#ads_num_win_info").html("No new version!");
					}
				}else{
					$("#ads_num_win_check").css("display","none");
					$("#ads_num_win_info").css("display","inline");
					$("#ads_num_win_info").html("Update Failure!");
				}
			}
		});
	});
}

//css
addGlobalStyle();
	
// tags
var target_tag = new Array("iframe",
						   "a",
						   "ins"
						   ); 
// attribute
var target_attr = new Array("src",
							"href",
							"style"
							);
// reg
var target_reg = new Array(new Array(/cpro.baidu.com\/cpro/,		//Block ads of baidu 百度推广
									/adserving.cpxinteractive.com\/st/,	//ads of cpxinteractive
									/ads.avazu.net\/st/,						//ads of avazu
									/z.alimama.com\/alimama/,		//ads of alimama 淘宝联盟
									/eiv.baidu.com\/mapm2/,			//baidu
									/cmweb.ilike.alibaba.com\/cmweb/	//alimama 
									),
						   	new Array(/www.baidu.com\/cpro/,			// baidu's floating ads
						   			/www.qq.com.amptio.info/,				// qq ads
						   			/googleads.g.doubleclick.net/,	// google floating ads
						   			/www.baidu.com\/adrc/,					// baidu's accurate ads 百度精准/掘金
						   			/adclick.g.doubleclick.net/,			// google ads
						   			/www.baidu.com\/baidu/,					//Block ads of baidu 百度推广
						   			/ad.doubleclick.net\/click/,
						   			/http:\/\/e.baidu.com/,					//link ads of Baidu 来百度推广	
						   			/jzclick.soso.com\/click/,				//qq ads 腾讯搜索推广 	
						   			/clkservice.youdao.com\/clk/	//youdao ads
						   			),
								new Array(/./)		// block ads of google 谷歌提供广告 && floating ads
								);
//counter of ads
var count_ads = 0;				

// get tag set of different tag name
for(var i = 0; i < target_tag.length; i++){
	
	var tag_set = document.getElementsByTagName(target_tag[i]);
	//GM_log("** tag <"+target_tag[i]+">:" + tag_set.length);
	
	// get each tag in tag set
	for(var i_tag = 0; i_tag < tag_set.length;i_tag++){
		
		//get attribute
		var attr = tag_set[i_tag].getAttribute(target_attr[i]);
		
		var regSet = target_reg[i];
		for(var i_reg = 0; i_reg < regSet.length; i_reg++){
			
			//GM_log("** Check:"+regSet[i_reg]+" || <"+tag_set[i_tag].tagName+">("+target_attr[i].id+") || "+target_attr[i] +" = "+ attr);
			
			// match reg
			if(regSet[i_reg].test(attr)){
				
				GM_log("** Found:"+regSet[i_reg]+" || <"+tag_set[i_tag].tagName+">("+target_attr[i].id+") || "+target_attr[i] +" = "+ attr);
				
				var p = tag_set[i_tag];	//the element to remove
				if(p){
					GM_log("** Remove:"+regSet[i_reg]+" || <"+tag_set[i_tag].tagName+">("+target_attr[i].id+") || "+target_attr[i] +" = "+ attr);
					
					var parent = p.parentNode;
					
					// create a prompt div
					var ads_block_filler;
					if(target_tag[i].toUpperCase() == "IFRAME"){
						ads_block_filler = document.createElement("div");
						ads_block_filler.innerHTML = '<table border="3" '
							+'style="'
							+'width:'+tag_set[i_tag].width+';'
							+'height:'+tag_set[i_tag].height+';'
							+'font-size:12px;'
							+'color:black;'
							+'background-color:#eeeeee">'
							+'<tr><td valign="top">Ads removed!</td></tr></table>'
							;
					}else if(target_tag[i].toUpperCase() == "INS"){
						ads_block_filler = document.createElement("div");
						ads_block_filler.innerHTML = '<table border="3" '
							+'style="'
							+'width:'+tag_set[i_tag].style.width+';'
							+'height:'+tag_set[i_tag].style.height+';'
							+'font-size:12px;'
							+'color:black;'
							+'background-color:#eeeeee">'
							+'<tr><td valign="top">Ads removed!</td></tr></table>'
							;
					}
					else{
						p = p.parentNode;//go to upper level and remove
						parent = p.parentNode;
						ads_block_filler = document.createElement("div");
						ads_block_filler.textContent = "Ads removed!";
					}
					ads_block_filler.setAttribute("name","removed_ads_block");
					
					// replace ads by prompt
					parent.replaceChild( ads_block_filler,p);
					i_tag--;
					count_ads++;
				}	
			}
		}
	}
}

// show info in top window
if(top == window){
	popupWindow(count_ads);
}	


window.setTimeout(
	function(){
		$("#ads_num_win").fadeOut("slow");
		$("#ads_num_win").hide("slow");
	}
	, 3600	//close delay time;60=1s
);

