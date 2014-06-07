// ==UserScript==
// @id             sns.neusoft.com-902822a3-2501-4dab-a7bd-d1f89d475d75@scriptish
// @name           NeuSnsAutoLogin
// @version        1.0
// @namespace      
// @author         shadowedge
// @description    
// @include        http://sns.neusoft.com/*
// @run-at         document-end
// ==/UserScript==


var userName = document.getElementById("username");
var passWord = document.getElementById("password");	
	
	intervalWrapper(userName,logIn,500);
	
	function logIn(){
		userName.value = "YourUserName";
		passWord.value = "YourPassWord";
		document.getElementById("btn_login").click();
	} 
	
	function intervalWrapper(obj,method,time){
		var itv = setInterval(_excute ,time);
		function _excute(){
			// console.log(obj);
			if(obj){
				method();
				clearInterval(itv);
			}
		}
	}