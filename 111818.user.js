// ==UserScript==
// @name           SinaAdsRemover
// @namespace      http://www.alice.com
// @description    Remove ads in sina
// @include        http://*.sina.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        1.0
// @history        1.1	Remove prompt on page.
// @history        1.0	Initial release.
// ==/UserScript==

var version = 1.1;


// tags
var target_tag = new Array("embed",
													"a",
													"img",
													"iframe",
													"td"
						   ); 
// attribute
var target_attr = new Array("src",
														"href",
														"src",
														"src",
														"onclick"
							);
// reg
var target_reg = new Array(new Array(/d5.sina.com.cn/,
																		/d1.sina.com.cn/,
																		/d4.sina.com.cn/,
																		/d2.sina.com.cn/,
																		/d3.sina.com.cn/,
																		/pfp.sina.com.cn/,
																		/d1.leju.com/,		//sina房产
																		/i0.sinaimg.cn\/hs/, 	//sina房产
																		/house.sina.com.cn/		//sina房产
									),
									new Array(/d5.sina.com.cn/,
														/d1.sina.com.cn/,
														/d4.sina.com.cn/,
														/d2.sina.com.cn/,
														/d3.sina.com.cn/,
														/cpro.baidu.com\/cpro/,		//Block ads of baidu 百度推广
														/sina.allyes.com/,
														/www.baidu.com\/cpro/,
														/pfpclick.sina.com.cn/,
														/sms.sina.com.cn\/act/
									),
									new Array(/d5.sina.com.cn/,
														/d1.sina.com.cn/,
														/d4.sina.com.cn/,
														/d2.sina.com.cn/,
														/d3.sina.com.cn/
									),
									new Array(/d5.sina.com.cn/
									),
									new Array(/pfpclick.sina.com.cn/
									)
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
				
				//GM_log("** Found:"+regSet[i_reg]+" || <"+tag_set[i_tag].tagName+">("+target_attr[i].id+") || "+target_attr[i] +" = "+ attr);
				
				var p = tag_set[i_tag];	//the element to remove
				if(p){
					//GM_log("** Remove:"+regSet[i_reg]+" || <"+tag_set[i_tag].tagName+">("+target_attr[i].id+") || "+target_attr[i] +" = "+ attr);
					
					var parent = p.parentNode;
					
					// create a prompt div
					var ads_block_filler;
					if(target_tag[i].toUpperCase() == "EMBED"){
						p = p.parentNode;//parent node is <object>, remove
						parent = p.parentNode;
						ads_block_filler = document.createElement("div");
						ads_block_filler.innerHTML = '<table border="3" '
							+'style="'
							+'width:'+p.width+'px;'
							+'height:'+p.height+'px;'
							+'font-size:12px;'
							+'color:black;'
							+'background-color:#eeeeee">'
							+'<tr><td valign="top"><!--Ads removed!--></td></tr></table>'
							;
					}else if(target_tag[i].toUpperCase() == "IMG"){
						ads_block_filler = document.createElement("div");
						ads_block_filler.innerHTML = '<table border="3" '
							+'style="'
							+'width:'+p.style.width+'px;'
							+'height:'+p.style.height+'px;'
							+'font-size:12px;'
							+'color:black;'
							+'background-color:#eeeeee">'
							+'<tr><td valign="top"><!--Ads removed!--></td></tr></table>'
							;
						p = p.parentNode;//parent node is <a>, remove
						parent = p.parentNode;
					} else{
						p = p.parentNode;//go to upper level and remove
						parent = p.parentNode;
						ads_block_filler = document.createElement(p.tagName);
						//ads_block_filler.textContent = "Ads removed!";
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
