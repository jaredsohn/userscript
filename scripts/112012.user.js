// ==UserScript==
// @name         oogiriphp no voter finder
// @version      1.0
// @author       shimomire
// @namespace    http://oogiritest.6.ql.bz/
// @description  一般的な投票漏れを検出します。(過去ログ用)
// @include      http://oogiri.symphonic-net.com/two/*
// @include      http://oogiri.symphonic-net.com/special/*
// @include      http://oogiri.symphonic-net.com/one/*
// @include      http://oogiri.symphonic-net.com/*
// @exclude
// ==/UserScript==

(function(){
	if(location.href.indexOf("kekka")>-1){
	(function(){
		var toko_list_class=function(){

		this.name;
		this.exist;
		};
	    function unique(array) {
	        var storage = {};
	        var uniqueArray = [];
	        var i, value;
	        for (i = 0; i < array.length; i++) {
	            value = array[i];
	            if (!(value in storage)) {
	                storage[value] = true;
	                uniqueArray.push(value);
	            }
	        }
	        return uniqueArray;
	    }

	    function nametrim(_name){
	    	var name=_name;
	    	var name=name.substring(
					0,
					Math.max(Math.min(
						name.indexOf("@",0)>=0?name.indexOf("@",0):name.length,
						name.indexOf("＠",0)>=0?name.indexOf("＠",0):name.length
					),0)
				);
	    	name=name.replace("【","");
	    	name=name.replace("】","");
	    	return name;
	    }

		var toko_list= new Array();
		var table=document.getElementsByTagName("TABLE")[0];
		for(var i=0;i<table.getElementsByTagName("TR").length-2;i++){
			toko_list[i]= new toko_list_class();
			var name=table.getElementsByTagName("TR")[i+1].getElementsByTagName("TD")[0].innerHTML;
			toko_list[i].name=nametrim(name);
			toko_list[i].exist=false;
		}
		var tohyo_list=new Array();
		var tohyo_num=0;
		for(var i=0;i<toko_list.length;i++){
			var tohyo_listper=table.getElementsByTagName("TR")[i+1].getElementsByTagName("TD")[2].innerHTML.split("/");
			for(var j=0;j<tohyo_listper.length;j++){
				tohyo_list[tohyo_num]=tohyo_listper[j];
				tohyo_num++;
			}
		}
		tohyo_list=unique(tohyo_list);
		for(var i=0;i<tohyo_list.length;i++){
			tohyo_list[i]=nametrim(tohyo_list[i]);
		}
		for(var i=0;i<toko_list.length;i++){
			for(var j=0;j<tohyo_list.length;j++){
				if(!toko_list[i].exist && toko_list[i].name==tohyo_list[j]){
					toko_list[i].exist=true;
				}
			}
		}
		for(var i=0;i<toko_list.length;i++){
			if(!(toko_list[i].exist)){
				var name=table.getElementsByTagName("TR")[i+1].getElementsByTagName("TD")[0];
				name.style.color="#000000";
				name.style.backgroundColor="#FF0000";
			}
		}
	})();
	}else if(location.href.indexOf("select")>-1){
	(function(){
		if(document.getElementsByTagName('TITLE')[0].innerHTML=="結果画面"){
			var toko_list_class=function(){
				this.name;
				this.exist;
			};
		    function unique(array) {
		        var storage = {};
		        var uniqueArray = [];
		        var i, value;
		        for (i = 0; i < array.length; i++) {
		            value = array[i];
		            if (!(value in storage)) {
		                storage[value] = true;
		                uniqueArray.push(value);
		            }
		        }
		        return uniqueArray;
		    }
		    function nametrim(_name){
		    	var name=_name;
		    	var name=name.substring(
						0,
						Math.max(Math.min(
							name.indexOf("@",0)>=0?name.indexOf("@",0):name.length,
							name.indexOf("＠",0)>=0?name.indexOf("＠",0):name.length
						),0)
					);
		    	name=name.replace("【","");
		    	name=name.replace("】","");
		    	return name;
		    }

			var toko_list= new Array();
			var table=document.getElementsByTagName("TABLE")[0];
			for(var i=0;i<table.getElementsByTagName("TR").length-3;i++){
				toko_list[i]= new toko_list_class();
				var name=table.getElementsByTagName("TR")[i+1].getElementsByTagName("TD")[1].innerHTML;
				name=name.substring(name.indexOf(">",name.indexOf(">",0)+1)+1,name.length);

				toko_list[i].name=nametrim(name);
				toko_list[i].exist=false;
			}
			var tohyo_list=new Array();
			var tohyo_num=0;
			for(var i=0;i<toko_list.length;i++){
				var tohyo_listper=table.getElementsByTagName("TR")[i+1].getElementsByTagName("TD")[3].innerHTML.split("/");
				for(var j=0;j<tohyo_listper.length;j++){
					tohyo_list[tohyo_num]=tohyo_listper[j];
					tohyo_num++;
				}
			}
			tohyo_list=unique(tohyo_list);
			for(var i=0;i<tohyo_list.length;i++){
				tohyo_list[i]=nametrim(tohyo_list[i]);
			}
			for(var i=0;i<toko_list.length;i++){
				for(var j=0;j<tohyo_list.length;j++){
					if(!toko_list[i].exist && toko_list[i].name==tohyo_list[j]){
						toko_list[i].exist=true;
					}
				}
			}
			for(var i=0;i<toko_list.length;i++){
				if(!(toko_list[i].exist)){
					var name=table.getElementsByTagName("TR")[i+1].getElementsByTagName("TD")[1];
					name.style.color="#000000";
					name.style.backgroundColor="#FF0000";
				}
			}
		}
	})();
	}
})();