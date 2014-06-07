// ==UserScript==
// @name         Bro3_PreviousBusy
// @version        0.12
// @description      ブラ３のセッションアウト・ビジー時に戻るを実行 by s4
// @include      *
// @namespace    http://userscripts.org/scripts/source/91421.user.js/
// @author         s4
// ==/UserScript==

////	sleep相当：yield導入
////	正規表現利用
////	※文字列中にワイルドカードを使う方法
////	※or接続させる場合と、挙動が違う場合の検討

	c1 = /http:\/\/.*\.3gokushi\.jp\/false\/login_sessionout\.php.*\//
	c2 = /http:\/\/.*\.3gokushi\.jp\/falselogin_sessionout\.php\//
	c3 = /http:\/\/.*\.3gokushi\.jp\/village_change\.php\?village_id=.*\//
		
	if(location.href.match(c1)){
			yield 1000;
			history.back(); 
			yield 1000;
			history.back(2); 
			yield 1000;
			history.back(3); 
			return false;
		}
	if(location.href.match(c2)){
			yield 1000;
			history.back(); 
			yield 1000;
			history.back(2); 
			yield 1000;
			history.back(3); 
			return false;
		}
	if(location.href.match(c3)){
			yield 1000;
			history.back(); 
			yield 1000;
			history.back(2); 
			yield 1000;
			history.back(3); 
			return false;
		}
		

function doIteration(aTask) {
	if (typeof aTask == 'function') {
    		aTask = aTask();
  	}
	if (!aTask ||
		!('next' in aObject) ||
      		!('send' in aObject) ||
      		!('throw' in aObject) ||
      		!('close' in aObject) ||
      		aObject != '[object Generator]') {
    		return;
  	}

  var finishFlag = { value : false, error : null };
  var last = 0;
  var sleep = 0;
  var timer = window.setInterval(function() {
    if (
        sleep > 0 && (Date.now() - last) < sleep) {
      return;
    }

    try {
      sleep = aTask.next();
      last = Date.now(); // スリープ開始時刻を保持して
      return;
    }
    catch(e if e instanceof StopIteration) {
      finishFlag.value = true;
    }
    catch(e) {
      finishFlag.error = e;
    }

    window.clearInterval(timer);
  }, 100);
  return finishFlag;
}