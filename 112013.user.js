// ==UserScript==
// @name         oogiriphp time strict keeper
// @version      1.0.3
// @author       shimomire
// @namespace    http://oogiritest.6.ql.bz/
// @description  大喜利PHPで表示される時間と実際の時間の誤差を減らすスクリプトです。
// @include      http://oogiri.symphonic-net.com/two/select.php*
// @include      http://oogiri.symphonic-net.com/select.php*
// @include      http://oogiri.symphonic-net.com/special/select.php*
// ==/UserScript==


(function(){

        // 設定項目
    var config;
	var time_r;
	var end_t;
	var time_Node;
        var lid;
	time_r=function(){
		//ループ
		var left_t=end_t -new Date().getTime();
		if(left_t >= 0){
			leftmin = Math.floor(left_t/(60*1000));
			leftsec = Math.floor((left_t/1000)) % 60;
			time_Node.innerHTML= "残り"+ leftmin +"分" +leftsec+ "秒";
		}
		else{
                        clearInterval(lid);
                        var title_Node=document.getElementsByTagName('title')[0];
                        var title=title_Node.innerHTML;
                        title_Node.innerHTML="_";
                        title_Node.innerHTML=title;
			location.reload(true);

		}
	};
	if(document.getElementById('tokei')){
		var bodyNode = document.getElementsByName('rt')[0];
		var afterNode = document.getElementById('tokei');
		time_Node = document.createElement('div');
		document.getElementById('tokei').style.display="none";
		time_Node.setAttribute("class","time");
		bodyNode.insertBefore(time_Node,afterNode);
		var str=document.getElementsByTagName('script')[4].innerHTML;
		if(document.querySelector("title").innerHTML.indexOf("投稿")>-1)
			str=str.slice(str.indexOf("var lefttime =",0)+"var lefttime =".length,str.indexOf(";",str.indexOf("var lefttime =",0)));
		else
			str=str.slice(str.indexOf("var lefttime  =",0)+"var lefttime  =".length,str.indexOf(";",str.indexOf("var lefttime  =",0)));

		str=str.replace(" ","");str=str.replace("　","");//trim
		end_t =new Date().getTime()+Number(str)*1000;
		lid=setInterval(time_r,1000);
	}
})();