// ==UserScript==
// @name      JiangCai Teaching Evaluation
// @namespace  http://www.chenxing.org.cn
// @include        http://portal7.jxufe.edu.cn/portal/main.xsp/page/-1/?.a.p=aT0lMkZ4Znpwb3J0YWwlMkZwZ25ldyZ0PXImcz1ub3JtYWwmZXM9ZGV0YWNoJm09dmlldw%3D%3D&mlinkf=pg%2Fpg.jsp
// @version    0.1
// @description  江财一键评教  请从这个地址登入 http://portal7.jxufe.edu.cn
// @match      
// @copyright  2013+,双人份,fjjwlzd@163.com
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

//随机80几分
var rs =function(){
   return parseInt(Math.random()*10+80);
}

$("input[name='teachattitude']").val(rs);
$("input[name='teachmethod']").val(rs);
$("input[name='teacheffect']").val(rs);
$("input[name='teachcontent']").val(rs);
$("input[name='coursepleased']").val(rs);
$("input[name='teachjc']").val(rs);

$("textarea[name='stmemo']").val("十分不错");
$("textarea[name='jcmemo']").val("不喜欢这种的教程");
$("textarea[name='coursememo']").val("不是很想在这个时候上，应该早一年");

//$("input[type='submit']").trigger("click");   //自动点击？还是自己修改一番把