// ==UserScript==
// @name           Stage1st Simple Blacklist
// @namespace      S1.Blacklist
// @description    适用s1无图版的自制抹布系统。兼容Opera Mobile. 修改自YSSY.Black.List (http://userscripts.org/scripts/show/124791).
// @version        0.5
// @include        http://*.saraba1st.com/2b/archiver/*
// @include        http://*.sarabalst.com/2b/archiver/*
// @include        http://220.196.42.167/2b/archiver/*
// @include        http://220.196.42.172/2b/archiver/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
/* StartHistory

v0.5
	Fixed: Updated to be partially compatible with Discuz! X3
	
v0.4
	New: load attatched pictures (beta).
	New: optimize page display for hdpi handheld devices, no longer need to use "single column view".
	Fix: updated new ip addresses.

v0.2.1 2012/11/25
	Bug fix: now properly handles quotes from OP.

v0.2 2012/11/23
	Bug fix: now properly handles manually typed quotes.

v0.1 2012/11/15
	Initial release.
	
EndHistory */
// ==/UserScript==


(function(){

	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
	function main(){
		jQuery(function($){
			var blacklist=JSON.parse(localStorage.blacklist||'[]');
				
				//////////////////
				// add [img] for image urls
				//////////////////
				$("div#content").each(function(){
					$(this).html($(this).html().replace(/http.*?(\.gif|\.png|\.jpg|\.jpeg)/gi,"<img src='$&' border='0'>"));
				
					// var arrPicAtt = $(this).html().match(/http.*(\.gif|\.png|\.jpg|\.jpeg)/gi);
					// if(arrPicAtt !== null){
						// for(var i=0;i<arrPicAtt.length;i++){
							// var idPicAtt = arrPicAtt[i].substring(12,arrPicAtt[i].length-1);
							// $(this).html($(this).html().replace(newPattern,"<img src=\""+arrPicAtt[i]+"\" border=\"0\">"));
						// }
					// }
					
					// var strText=$(this).html();
					// var intWidth=Math.min(screen.width,800);
					// console.log(">="+intWidth);
					// strText.replace(">=600",">="+intWidth);
					// strText.replace("'600'","'"+intWidth+"'");
					// strText.replace("\"600\"","\""+intWidth+"\"");
					// console.log(strText);
					// $(this).html(strText);
				})
				
				//////////////////
				// add p-tag for post text
				//////////////////
				$("div#content").each(function(){
					$(this).html($(this).html().replace(/(<h3\/>|<h3>.*<\/h3>)/gi,"<p class=\"post\">"));
				})
				
				//////////////////
				// adjust zooming and target dpi for hdpi/xhdpi smartphones
				//////////////////


				if(window.devicePixelRatio>1){
				// if(true){
					var newMeta = document.createElement('meta');
					var targetDpi = 160;
					newMeta.name = "viewport";
					newMeta.content = "target-densitydpi="+targetDpi+"; width=device-width; initial-scale=1.0; maximum-scale=1.0;";
					document.getElementsByTagName('head')[0].appendChild(newMeta);
					
					var scrWidth = Math.floor(screen.width/window.devicePixelRatio);
					// var scrWidth = 240;
					
					var mobilecss = window.document.createElement('link');
					mobilecss.rel = 'stylesheet';
					mobilecss.type = 'text/css';
					mobilecss.href = 'data:text/css,' +
						'blockquote{ margin: 0px 10px !important;}'+
						'ul{padding: 0px 0px 0px 20px !important;}'+
						'td.tpc_content{padding: 0px !important;}';
					document.getElementsByTagName("HEAD")[0].appendChild(mobilecss);

					
					// $("table.tpc_content").css("max-width: "+scrWidth+"px !important;");
					// $("td.tpc_content").css("max-width: 50px !important; word-wrap: break-word !important; flex-wrap: wrap !important; padding: 0px !important;");
					// $("ul").css("padding: 0px 0px 0px 20px !important;");
					// $("blockquote").css("margin: 0px 10px !important;");
					$("img[border=\"0\"]").each(function(){
						$(this).removeAttr("width");
						$(this).removeAttr("onload");
						var imgWidth = scrWidth-15;
						$(this).css("max-width",imgWidth+"px");
						$(this).attr("onclick","window.open('"+$(this).attr("src")+"')");
					})
					$("body").children("br").remove();
				}				

				//////////////////
				//  blacklist
				//////////////////
				// change uid to link
				$("body div#content p.author strong").each(function(){
					var strNewLink = $(this).html();
					// console.log(strNewLink);
					var uid=$(this).text();
					$(this).html("<a class=\"uid\">"+strNewLink+"</a>");

				});

				// $("table.i_table").each(function(){
					// if(blacklist.indexOf($(this).find("a.uid").text())!==-1){
						// $(this).find("td.tpc_content").remove();
					// }
				// });
				
				$("p.author").each(function(){
					if(blacklist.indexOf($(this).find("a.uid").text())!==-1){
						// $(this).nextUntil("p.author").andSelf().css("background", "red");//.remove();
						$(this).next().remove();//.andSelf() //.remove(); //.css("background", "red")
					}
				});
				
				$("div.text").each(function(){
					// console.log(this);
					var idStrMatched = $(this).html().match(/\d楼.{1,20}于\d|楼主.{1,20}于\d/i);
					if(idStrMatched !== null){
						var idStrCoarse = idStrMatched[0];
						var idStr=idStrCoarse.substring(2,idStrCoarse.length-2);
						// console.log(idStr);
						if(blacklist.indexOf(idStr)!==-1){
							var quotedtext = $(this).html();
							// console.log(quotedtext);
							var pattern = /<br>.*<a/i;
							$(this).html(quotedtext.replace(pattern,"<a"));
						}
					}
				});
				$("a.uid").on('click', function(){
					var id=$(this).text();

					var idxId = blacklist.indexOf(id); 

					if (idxId == -1){
						if(confirm("ID: "+id+"\n塞抹布？\n页面将自动刷新")){
							blacklist.push(id);
							localStorage.setItem('blacklist', JSON.stringify(blacklist));
							location.reload();
						}
					}else{
						if(confirm("ID: "+id+"\n取出抹布？\n页面将自动刷新")){
							blacklist.splice(idxId,1);
							localStorage.setItem('blacklist', JSON.stringify(blacklist));
							location.reload();
						}
					}
								
				
				});

		});
	}
	typeof jQuery!=='undefined'?main():addJQuery(main);
})();