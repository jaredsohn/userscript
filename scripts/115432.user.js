// ==UserScript==
// @name    private: yhdp.yhlz.net 自动选择
// @namespace   yhlz
// @author    zolunx10@hotmail.com
// @description 某坑爹网站的一键随机选择
// @include http://yhdp.yhlz.net/post/Vote.aspx*
// @exclude
// ==/UserScript==
// version 1.0 - 2011-10-13


var $;
var unsafeWindow= unsafeWindow || window;
// Add jQuery
(function(){
  if (typeof unsafeWindow.jQuery == 'undefined') {
    var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
      GM_JQ = document.createElement('script');

    GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    GM_JQ.async = true;

    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
  }
  GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery.noConflict(true);
    letsJQuery($);
  }
}

// All your GM code must be inside this function
function letsJQuery($) {
if (typeof(Browser) =='undefined'){
  var userAgent =navigator.userAgent.toLowerCase();
  var Browser = {
    version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
    msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
    firefox: /firefox/.test( userAgent ),
    chrome: /chrome/.test( userAgent ) && /mozilla/.test(userAgent),
    opera: /opera/.test( userAgent ),
    safari: /webkit/.test( userAgent ) &&!(/chrome/.test(userAgent))
  }
}
var runUserScript =function(func){
  if (Browser.opera){
    $(document).ready(func);
  } else{
    func();
  }
}

runUserScript(function(){
  var $btn= null;
  function autoVote() {
    function vote(v) {
      var $r= $('input[type=radio]', this);
      if ($r.length<=0) {
        return this;
      }
      $r.attr('checked', false);
      if (!v || v.length<4) {
        // 不了解
        $r[12].checked= true;
      } else {
        for (var i=0; i<4; i++) {
          $r[i*3+v[i]].checked= true;
        }
      }
      return this;
    }
    var $el=$('table.votetable>tr');
    if ( $el.length<=0 ) {
      $el=  $('table.votetable>tbody>tr')
    }
    // 0=好 1=中 2=差
    $btn.text("选项太多, 正在努力处理...");
    var v, sum, k;
    $el.each(function(i) {
        if (this.innerHTML.indexOf("县地税局")>=0 && this.innerHTML.indexOf("行政审批科")>=0) {
         // 好评!
            vote.call(this, [0, 0, 0, 0]);
        } else {
            if (Math.random() <=0.5) {  //一定概率不知道
                vote.call(this);
            } else {
                if (i> 20) {
                    k=4.0;    //后面的打差点?
                } else {
                    k=2.8;
                }
                v=[];   sum=0;
                for (var j=0; j<3; j++) {
                    v.push(Math.floor(Math.random()*k));
                    if (v[j]>2) {
                        v[j]=2;
                    }
                    sum+=v[j];
                }
                v[3]= Math.floor(sum/3);
                vote.call(this, v);
            }
        }
    });
    $btn.text("一次终了. 如果不满意结果可以再点哦");
  }
  $btn= $('<button>').text("一键投票(随机的喂~)").css({
      position: "fixed",
      top: "100px",
      left: "20px"
      }).appendTo('body').click(autoVote);
});
};