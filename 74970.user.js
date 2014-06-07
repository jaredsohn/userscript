
// ==UserScript==
// @name          dati
// @namespace     http://userstyles.org
// @description	  百科答人自动答题
// @version		  1.0
// @author        songdenggao@gmail.com
// @include       http://dati.hudong.com/jimo/*
// ==/UserScript==
 
(function(){
	function loadScript(url, callback){
		var script = document.createElement("script");
		script.type = "text/javascript";
		//这是FF的判断语句，因为ff下没有readyState这人值，IE的readyState肯定有值
		script.onload = script.onreadystatechange = function(){
			if(this.readyState == 'loaded' && this.status==200){
			   var span = document.createElement("span");
			   span.innerHTML = '200';
			   document.body.appendChild(span);
			}
			if(!this.readyState || this.readyState=='loaded' || this.readyState=='complete'){
				callback();
			}
		}
		script.src = url;
		document.body.appendChild(script);
	}
	
	//加载 jQuery ，完毕后执行下面的程序
	loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js', function(){
		var val=$("#wresult a").html().substr(0,1); 
		//将正确答案选中
		$(":radio[value="+val+"]").attr('checked', true);
		/*
		//显示相关说明
		$("#rresult").show();
		*/
		//取消离开提示
		window.onbeforeunload = function(){};
		
		//删除已经绑定的 onclick 方法，自动提交表单进入下一题
		$(":submit[name='next']").click();
		
	});
})();

