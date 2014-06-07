// ==UserScript==
// @name           露天拍賣登入便(可自動登入)
// @namespace      wsmwason.ruten.easylogin
// @description    在露天拍賣登入時，可使用 Enter 直接登入，免去辨識圖片登入按鈕位置，亦可修改本 Script 輸入帳號密碼進行自動登入。
// @include        https://member.ruten.com.tw/*
// @version        0.5
// @auther         wsmwason
// ==/UserScript==

/**
 * Date:
 *   2012/06/22
 *
 * Authors:
 *   露天拍賣的登入實際上需要 Captcha 的驗證，只是做成了圖片位置座標變換，
 *   需要以肉眼判斷座標位置，此 Script 使用 HTML5 canvas 讀取圖片位置，
 *   將可透過 Enter 直接進行登入。
 *   這年頭了露天拍賣居然還可以使用 big5 撐到現在，實在厲害。
 *
 * Changelog:
 *
 *  2012/06/22 Ver 0.5
 *  		-- 提供露天拍賣自動登入
 *  		-- 提供露天拍賣免辨識圖片登入按鈕位置直接以 Enter 登入
 */
 
//設定帳號 
var userName = '';
//設定密碼
var passWord = '';
//設定是否自動登入
var autoLogin = false;


function insertAfter(newEl, targetEl)
{
  var parentEl = targetEl.parentNode;
  if(parentEl.lastChild == targetEl){
    parentEl.appendChild(newEl);
  }else{
    parentEl.insertBefore(newEl,targetEl.nextSibling);
  }            
}


//取消一些沒用的檢查
var overwriteScriptCode = new Array();
overwriteScriptCode = [
  'function noenter(event){ return true; }',
  'function img_reload(){ }'
];
var script = document.createElement('script');
script.innerHTML = overwriteScriptCode.join('\n');
document.getElementsByTagName('head')[0].appendChild(script); 


//自行讀取驗證圖片
var timestamp = (new Date()).getTime();
document.getElementById("captcha").value = timestamp;
document.getElementById("btn_login").src = "image.php?key="+timestamp;


//自動登入時填入資訊
if(userName!='') document.getElementById('userid').value = userName;
if(passWord!='') document.getElementsByName('userpass')[0].value = passWord;
document.getElementsByName('expire')[0].checked = true;
document.getElementById("userid").focus();


//讀取驗證圖片寫入 Captcha
var refNode = document.getElementById('btn_login');
var captchaX, captchaY = 0;
var img = new Image();
var context;
var canvas = document.createElement('canvas');
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext('2d').drawImage(img, 0, 0);
  context = canvas.getContext("2d")
  context.drawImage(img, 0, 0);
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  var findPixel = false;
  for(x=0;x<=canvas.width;x++){
    if(findPixel==true) break;
    for(y=0;y<=canvas.height;y++){
      var index = (y*imageData.width + x) * 4;
      var red = imageData.data[index];
      var green = imageData.data[index + 1];
      var blue = imageData.data[index + 2];
      var alpha = imageData.data[index + 3];

      if(red==4 && green==2 && blue==4 && alpha==255){ 
        captchaX = x;
        captchaY = y;
        findPixel = true;
        break;
      }
    }
  }
  
  var inputLoginX = document.createElement('input');
    inputLoginX.setAttribute('type', 'hidden');
    inputLoginX.setAttribute('name', 'btn_login.x');
    inputLoginX.setAttribute('value', captchaX);

  var inputLoginY = document.createElement('input');
      inputLoginY.setAttribute('type', 'hidden');
      inputLoginY.setAttribute('name', 'btn_login.y');
      inputLoginY.setAttribute('value', captchaY);
      
  insertAfter(inputLoginX, refNode);
  insertAfter(inputLoginY, refNode);

  if(userName!='' && passWord!='' && autoLogin==true){
    var form = document.getElementsByName('main')[0];
    form.action = "login.php?refer=https%3A%2F%2Fmember.ruten.com.tw%2Fuser%2Flogin.htm";
    form.submit();
  }
  
};
img.src = "image.php?key="+timestamp;
