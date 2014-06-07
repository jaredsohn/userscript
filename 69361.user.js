// ==UserScript==
// @name           kaixin001 cafe helper
// @namespace      http://userscripts.org/users/muzik
// @include        http://wap.kaixin001.com/cafe/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

(function() {
	//设置
	var setting = {
		//默认菜单 id为dishid，weight为随机权重
		//[{id:5,weight:5},{id:7,weight:4}],即5/9做红烧茄子，4/9做炸酱面
		//如只需做一种菜,[{id:5}]即可
        dish: [{id:5,weight:5},{id:7,weight:4}],
		//刷新间隔,单位为毫秒。60000即60秒。
		reloadInterval:60000,
		//移至餐台后是否继续做该菜 true/false
		cookLastDish:false
    };
	//25级及以下菜单dishid对照表
    /*var menu = {
        '宫保鸡丁':4,
		'抹茶慕斯':23,
		'莲藕炖排骨':8,
		'清蒸江团鱼':26,
		'红烧茄子':5,
		'京酱肉丝':6,
		'美容猪手':22,
		'炸酱面':7,
		'麻婆豆腐':51,
		'芝士蛋糕':50,
		'东坡肉':16,
		'清炒鸡毛菜':9,
		'红烧狮子头':19,
		'水煮鱼':27,
		'奶油蘑菇汤':24,
		'葱包桧':32,
		'糖醋小排':41,
		'陕西凉皮':10,
		'可乐鸡翅':40,
    };*/
    $(document).ready(function() {
		(new Cafe()).loadFunc();
		window.setTimeout('window.location.reload()',setting.reloadInterval)
    });

	var Cafe = function() {
		goHome = function(){
			$('a').each(function(){
				if($(this).text()=='返回我的餐厅'){
					window.location.href= $(this).attr('href')
				}
			})
		}
		goTo = function(str){
			$('a').each(function(){
				if($(this).text()==str){
					window.location.href= $(this).attr('href')
				}
			})
		}
		goContinue = function(){
			$('a').each(function(){
				var patt = new RegExp('继续做该菜')
				if(patt.test($(this).text())){
					window.location.href= $(this).attr('href')
				}
			})
		}
		goAnother = function(){
			$('a').each(function(){
				var patt = new RegExp('其他菜')
				if(patt.test($(this).text())){
					window.location.href= $(this).attr('href')
				}
			})
		}
		isLocation = function(str){
			var patt = new RegExp(str)
			return patt.test(window.location)
		}
		goDish = function(num){
			$('a').each(function(){
				if($(this).text()=='做菜'){
					window.location.href= $(this).attr('href').replace(/dishid=\d+/gi, "dishid="+String(num))
				}
			})
		}
		runThis = function(){
			if (isLocation('/index.php')) {
				goTo('移至餐台')
				goTo('清洁')
				goTo('做菜')
				goTo('继续做菜')
			}else if(isLocation('/menu.php')){
				dishid=randDishID()
				goDish(dishid)
			}else if (isLocation('/clean.php')) {
				goTo('做菜')
			}else if (isLocation('/cook.php')) {
				goHome()
			}else {
				if(setting.cookLastDish==true)
					goContinue()
				else
					goAnother()
				goHome()
			}
		}
		this.loadFunc = function() {
			runThis()
		}
		randDishID = function(){
			if(setting.dish.length > 1){
				weight=0
				for(i=0;i<setting.dish.length;i++){
					weight+=setting.dish[i].weight
					setting.dish[i].position=weight
				}
				r=Math.random()*weight
				for(i=0;i<setting.dish.length;i++){
					if(r < setting.dish[i].position){
						dishid=setting.dish[i].id
						break;
					}
				}
				
			}else if(setting.dish.length == 1){
				dishid=setting.dish[0].id
			}
			return dishid;
		}
	}
})()