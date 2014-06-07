// ==UserScript==
// @name			Kingdoms Of Camelot data access Demo
// @description		This is a demo provided by kocmon.com which shows you how to request data from koc servers without using the games built in ajax functions
// @include			http://*.kingdomsofcamelot.com/fb/e2/src/main_src.php*
// @include			https://*.kingdomsofcamelot.com/fb/e2/src/main_src.php*
// @include			http://apps.facebook.com/kingdomsofcamelot/*
// @include			https://apps.facebook.com/kingdomsofcamelot/*
// ==/UserScript==

if ( document.location.toString().match('apps.facebook.com/kingdomsofcamelot') ) {
	/*
	fake entry. If you didn't add @include http://apps.facebook.com/kingdomsofcamelot/
	then you might think the script isn't running because your browser's greasemonkey
	icon does not include any scripts running in iframes. This means you have to include
	the top page/url that holds the iframe containing the game so users are not confused
	*/
}else if ( document.location.toString().match('src/main_src.php') ) {
	if(unsafeWindow.console){
		var gmlogold=GM_log;
		var consoleold = unsafeWindow.console.log;
		GM_log=function(str){
			gmlogold(str);
			consoleold(str);
		};
	}
	function send(url, args, callback) {
		var first=true;
		for(var k in args){
			if(first==true){
				var data=k+'='+args[k];
				first=false;
			}else{
				data=data+'&'+k+'='+args[k];
			}
		}		
		GM_xmlhttpRequest({
			'method' : 'POST',
			'url' : url,
			'headers' : {
				"Content-type" : "application/x-www-form-urlencoded"
			},
			'data' : data,
			'onreadystatechange' : function(r) {
			},
			'onload' : function(r) {
				if (callback) {
					callback(r);
				}
			}
		});
	}
	function getDefaultArgs(){//i think there was some kind of security issue with greasemoneky copying objects and for some reason i decided to use JSON.
		return(JSON.parse(JSON.stringify(unsafeWindow.g_ajaxparams)));
	}
	function getServerId(){
		return(1*unsafeWindow.g_server);
	}
	function getUrl(page,s){
		return('http://www'+s+'.kingdomsofcamelot.com/fb/e2/src/ajax/'+page+'.php');
	}
	function getAllianceInfo(){
		GM_log('Begin Demo');
		var args=getDefaultArgs();
		var s=getServerId();
		if(!args || !s){GM_log('unable to do demo request');}
		var url=getUrl('allianceGetMembersInfo',s);
		args['pageNo']=1;//hard coded, you will need to figure out how to aquire the number of pages and then loop though them
		send(url,args,function(r){
			if(r && r.status){
				if(r.status!=200){
					GM_log(JSON.stringify(r));
				}else{
					var json=JSON.parse(r.responseText);
					if(json){
						if(json.ok && json.ok!=false && json.memberInfo){
							//send('http://yoursitescript.com/proccessThisWithYourWebsiteIfYouWant.php','data='+encodeURIComponent(r.responseText));
							for(var k in json.memberInfo){
								var player=json.memberInfo[k];
								//demo response: {"userId":"5631846","positionType":"3","cities":"6","population":"","might":"21565811","dateJoined":"14 Jul 2011","daysInPosition":11,"name":"Anthony4Him","genderAndName":"Lord Anthony4Him","fbuid":"1348167695","prestige":"21565811","ranking":"TBD","title":"90","lastLogin":"Jul 25, 06:12 AM","avatarurl":"http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/avatars/100/m12.jpg","provinceIds":"17,19,18,19,14,17"}
								GM_log(JSON.stringify(json.memberInfo[k]));
							}
						}
					}else{
						GM_log(JSON.stringify(r));
					}
				}
			}
		});
	}
	window.addEventListener("load", function() {
		getAllianceInfo();
	}, true);
}
