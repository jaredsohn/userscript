// ==UserScript==
// @name           禁止google结果跳转
// @namespace      http://blog.whosemind.net
// @description    去掉google搜索结果的跳转(http://www.google.com/url?), 而直接用原始链接
// @version        0.0.7

// @include        /^https?:\/\/www\.google\.[^\/]+?\/(#.*|webhp.*|search\?.*)?$/
// ==/UserScript==
var eles, timer, s,
parse, url,
loop = function(){
  var fn = function(){
  try{
    console.log('looping... ');
    var res = document.getElementsByClassName('l'),
    eid = document.getElementById('rso'),
    v = document.getElementById('lst-ib').value,
    l = res.length,
    end = function(){
      setTimeout(function(){
        eles = eid;
        s = v;
        //console.log(l);
        for(var i = 0; i < l; i++){
          res[i].setAttribute('onmousedown', '');
        }
        console.log('done');
        clearInterval(timer);
      }, 10);
    },
    sf = document.getElementById('tsf'),
    ofn = sf.onsubmit;
    
    if(!_flag){
      _flag = true;
      sf.onsubmit = function(){
        console.log('11');
        return ofn.apply(this, arguments);
      };
    }
    eid = eid ? eid.getAttribute('eid') : '';
    //l && console.log(eid);
    if(l && (eid !== eles || v == s)){
      end();
    }
    unsafeWindow.rwt = function(){};
  }catch(e){
  
  }
  };
  clearInterval(timer);
  timer = setInterval(fn, 1000);
  fn();
}, _flag;

loop();
unsafeWindow.addEventListener('hashchange', loop, false);