// ==UserScript==
// @name       codestar
// @namespace  http://userscripts.org/deadfish
// @version    1.0
// @description  腾讯前端特工第五题
// @match      http://codestar.alloyteam.com/*
// ==/UserScript==

var map = new Array();
//获取78个数值
for(var i=1;i<=78;i++){   
    var val = Number(document.getElementById("folder_"+i).innerHTML);
    map.push(val);
}

/*
        1
       2 3
      3 4 5
     6 7 8 9
    ....
*/
var suml =0;
var pathl = "";
//递归函数
//n（1-78）数值编号
//k层数
//path路径
//sum和
function d(n,k,path,sum){
	if(k<=11){
		d(n+k,k+1,path+"-"+map[n-1],sum+map[n-1]);//左孩子
		d(n+k+1,k+1,path+"-"+map[n-1],sum+map[n-1]);//右孩子
	} else {
		sum = sum+map[n-1];
		path = path+"-"+map[n-1];
		if(sum > suml){
			suml = sum;
			pathl = path;
		}
	}
}
//执行递归 从编号1 层数1 路径空 总数0 开始
d(1,1,"",0);
//显示在底部
var r= document.getElementById("failBox");
r.innerHTML = pathl +"   sum=" +suml;
r.style.visibility = "visible";
//控制台显示
console.log(pathl +"   sum=" +suml);
