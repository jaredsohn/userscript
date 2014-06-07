// --------------------------------------------------------------------------------
// Copyright (C) 2009  Cui Mingda [ https://twitter.com/cuimingda ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Koubei Topmost Dianping
// @namespace       http://userscripts.org/scripts/show/51009
// @description     move the comment box to the topmost of page
// @include         http://dian.koubei.com/*/appraisement.html*
// @include         http://*.koubei.com/store/detail--storeId-*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first.
// --------------------------------------------------------------------------------

;(function() {
  var dianpingForm = $("#hy-dpForm");
  if(dianpingForm.length === 0) {
    return false;
  }

  var comments = [
    "因为离单位比较近，于是吃过几次，可惜价格不是特别实在。",
    "去了不止一回了，对他的印象蛮好的。环境好，东西很新鲜，也很正。",
    "味道不错，就是环境不怎么样，有时候人太多太吵了。",
    "因为这家店就在家里附近，所以是看着它装修起来的。光听名字，觉得应该是一家比较贵价的店，但看了口碑网上的评价后，觉得应该不错，就决定奢侈的去享受一次。",
    "很喜欢这家店，算是我去的比较多的一家。环境相当不错，人又不多，所以总体感觉非常舒适。",
    "里面的东西很好吃，就是有点贵，不过适合商务约会。",
    "整体感觉不错，消费略高了点，价格不够实惠～",
    "团队聚会，吃的还是比较过瘾的，味道很不错。",
    "同学聚会去了一次，感觉很好，东西很好吃，而且弄的很干净，价格也比较适中，准备去第二次的哦！",
    "看名字觉得应该是挺奢侈的一个地方,但是实际上却并不算很贵。而且连蔬菜的味道也非常好。这家店强烈推荐了。",
    "很不错的一家店，环境不错，口味也不错，就是价格有点偏贵。",
    "很不错的一家店哦！环境不错，东西很新鲜，价格也还实惠的哦！",
    "确实食物是蛮好吃的，但价格还是要求你有点承受能力！呵呵",
    "环境不错的``就是有点小贵～～人多去吃会更热闹点！",
    "环境很好的说~ 价格很贵的说~ 和朋友一起去吃的 还是老妈他们先去吃了说很干净的不错的我们才去的。",
    "挺好的地方！很不错的感觉。大家一起玩的很开心！推荐推荐！",
    "跟朋友两个人去吃的~挺好吃的~价格也还好不贵，环境也还不错~呵呵~",
    "环境很不错，一进门的感觉挺大气的，不过价格还是有点小贵的，偶尔去FB下还是不错滴。"
  ]
  
  // 原有的人均消费，黄页和店铺的位置是不一样的，分开取
  var averageConsumption = parseFloat($("div.shop-info").find("div.yk-wd-important").find("em:first").text().replace("元", ""));
  if(isNaN(averageConsumption)) {
    averageConsumption = parseFloat($("#storeContain").find("span.renjunMoney:first").text().replace("元", ""));
  }
  
  // 人数随机取1-10人
  var totalPerson = Math.floor(Math.random() * 10 + 1);
  
  // 人均消费是在原有的50%-150%之间变化
  var totalConsumption = parseInt(averageConsumption * (0.5 + Math.random())) * totalPerson;
  
  // 星星的数量在3-5颗之间变化
  var starFuwu = Math.floor(Math.random() * 3 + 1) + 2;
  var starKouwei = Math.floor(Math.random() * 3 + 1) + 2;
  var starHuanjing = Math.floor(Math.random() * 3 + 1) + 2;
  var starXingjia = Math.floor(Math.random() * 3 + 1) + 2;
  
  // 评论从comments这个数组中任取一条
  var comment = comments[Math.floor(Math.random() * comments.length)];

  // 将评论框移动到主体部分的最上面
  dianpingForm.css({"margin" : "0 0 10px 0"}).insertBefore($("div.yui-main div.yui-b div:first"));
  
  // 修改评论框内星星的默认值，视觉效果可能不生效，但值生效了
  dianpingForm.find("#dpStar1Hide").val(starFuwu);
  dianpingForm.find("#dpStar2Hide").val(starKouwei);
  dianpingForm.find("#dpStar3Hide").val(starHuanjing);
  dianpingForm.find("#dpStar4Hide").val(starXingjia);
  
  // 修改评论内容，default样式如果不去掉，不能提交表单
  dianpingForm.find("#txtDPtaste").val(comment).removeClass("default");
  
  // 修改人数和总消费
  dianpingForm.find("#dp-costNum").val(totalPerson);
  dianpingForm.find("#dp-costSum").val(totalConsumption);
  
  // 修改环境氛围，每次都要清空，否则有缓存会越刷新选择的越多
  dianpingForm.find(".aura-item").attr("checked", "");
  dianpingForm.find("#aura-" + Math.floor(Math.random() * 7).toString()).attr("checked", "checked");
  dianpingForm.find("#aura-" + Math.floor(Math.random() * 7).toString()).attr("checked", "checked");
})();

/* Update History
 * 0.1 @ 2009/06/06 # Initial Release
 */