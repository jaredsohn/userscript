// ==UserScript==
// @name           eelab自动预考核
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @include        http://eelab.hit.edu.cn/xk/ykhTEST.asp?*
// ==/UserScript==
var answername=new Array("kg_answer1","kg_answer2","kg_answer3","kg_answer4");
var choosename=new Array("kg1","kg2","kg3","kg4");
(function(){
var fd = document.getElementsByTagName('iframe')[0].contentDocument;
var n = 3;
var ans;
var chooses;
for(var i=0;i<n;i++)
{

	ans=fd.getElementsByName(answername[i])[0].value;
	//alert(ans);
	chooses=fd.getElementsByName(choosename[i]);
	for(var j in chooses)
	{
		if(chooses[j].value==ans)
			chooses[j].checked=true;
	}
}

})()