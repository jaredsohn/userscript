// ==UserScript==
// @name           sus general fixes and changes
// @namespace      shmulik.zekar.co.cc
// @description    some fixes and changes on StartUpSeed.com
// @include        http://www.startupseeds.com/*
// @author         Shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// ==/UserScript==
unsafeWindow.SetStatus = function(){
        var StatusTextBox = document.getElementById("ctl00_Login1_UpdateStatus_tbStatus");
        if (StatusTextBox.value == "")
            StatusTextBox.value = "מה קורה?";
}

var shareFbPng = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%3A%00%00%00%0F%08%06%00%00%00%B5%0C%DC6%00%00%04%8AIDATx%DA%D4%97khTG%14%C7%7Fw%EE%DD%DC%DD%BD%BB%5B%D3%3C6f%D3%E8%1A%D9h%D8%8D%85%C6%EA%87%22%1A%FD%60%AD%0FZ%04K%97*%7D%D8H%08%F5QKC%7D%A1%94%22%B4%82%C1~K%A1%A0%E0'%3F%D8%92%0F%82%95%0A%11RS%2C%D4D%A9%D6%EE%86%24%826%CD%266%FBH%B2%B9%3B%FDp%DD%E8%E6%D5D%8A%E2%81%81%3Bg%CE9%F3%FF%CF%CC%999W%F9%F8%FA0%8F%C9%AB%40%23P%05T%F2%14E%95%E6%13%FB%9A%8A%9A%FD%8C%017%81s%C07M!%7D%3C%A8%F2%18%D1w%81o7%97hyev%85%82%3C%85%E7MR%26%FC%3D*%B91%94%E1%97A%F3%07%E0%ED%A6%90%9E%02%D0%1E%DAl%5D%EA%16%A7W%E4%AB%F8%EC%16%C1%CC3%04%DC%B0%23%8C%A6i%A8%E2%F1%C5%96%8C%8D%8D%91H%24%90%12%1C%0E%3Beee4~%F9%F5%B8%85%AE%82%CF%A1%E0s%A8%08%85%CDW%07%CC%16%60m%96%A8%038%F5%B2GP%A2%83)%E53%DF%99%8C9%86%E1q%E5%E8%A4%94%14%14%14P%5B%5B%8B%AE%EB%B4%B7%B7%13%89D%A6%C5%BB%A6P%F0%20-kww%8Clm%0A%E9%E74%E0%CD%A5nQR%E6P0%E7%C0%F1V%E7u%0A%8A%BD%14%16%7Bs%F4%3D%D1%08%C9D%7C%D2X%D6%1E%A0%FF%AF%FBT%06%AB%A7%8D!%84%98%9C%87%A6I8%1C%A6%A6%A6%06%80%DE%DE%5En%DF%BE%3D%23%E6e%2F%08~%8Fg%1A%80s%1A%B0~%C1%1CI%D6%BD%B5!%A7%BF%A3a%2F%95%C1j%3E%DF%F5%5E%8E%DE%E14%A8o%3CD%20X%CDW%87%1A%D9%B8-L*%11%E7R%CB%F7%7Cr%EC8'%0E%5B%BAM%DB%C2%13fx%04FQ%14FGGI%A5R%04%83A%22%91%08G%8F%1E%C5n%B7c%18%C6%8C%B8K%AD4%7Cmw%C7%88K%00U%F96%EB%C8%CE%B6%01%ACyc%0Bu%9F%1D%04%E0R%CBy%E6%15%15%B3%E7%D8q%00V%AE%5E%CB%F6%86%BD%A4%92%09.%B6%9C%1F%F7%91R%D2%1D%8D%E0p%1Ad%AFC%DFB%FF%94%F1%B3%92N%A7%F1%F9%7C%D4%D4%D4%A0(%0Av%BB%9D%40%20%80%DB%ED%C64%CD%19qf%A4%A4DWT%A0J%00Ey%C2%DA%D1%D96%80%DF%DA%DB(%5D%B0%88%C5U!z%BB%A2%98%12*%AAB%00%E4%17%7BY%BEz%1D%BE%85~%92%F1%C4%B8O%DBO%3F%F2%C7%8D%0EV%ACYGw%24b%5D%20NWN%EC%CC%04%A2%F1x%9CU%ABV%B1%7F%FF~t%5D%A7%B4%B4%94%03%07%0E%10%0C%06%19%1E%1E%FEO%ACyV%16%BC%A8%01%B1h2S%EE%D1f%FF%9C%AC%0E%EF%E4%CE%B56~%BD%15a8c%01%EBJ%3E%028%98%B6%FA%8A%DD%608%23%E9JJ%8A%CA%FD%F4uGY%BFs%0F%2F-%0Dq%FE%E4%17%00%D8%FC%C1%1C_!s%EF%7B%97%CB%C5%E5%CB%97%E9%EC%EC%A4%BE%BE%9EX%2C%C6%993g%E8%EB%EB%C3n%B7%E7%F8N%25%FF%8CY%EF%AB%00n%26M%D0%C4%EC%DB%8A%D7%B7%10%3Ex%9C%25%CBW%A2%3C%5C%9FD%FF%7DNl%DF%08%80%D30%D0%04(%8A%D54%01%1B%EB%F6%E2)%2C%E6B%F3I%9A%F7%7D%40_w%94%0D%1F%ED%99%14%5B%A8%02)%A5u%2CM%13!%04w%EF%DE%A5%AD%AD%0D%D34%19%1A%1A%A2%B5%B5%95%FE%FE~TU%9D%11%A7*%600-M%E0%8E%06%5C%1CH%F3%CE%12%D7%93%15%08*%96_%81%C7%CD%FB%87%AC%1C%F5%3F%3C%C2%9Bv%D4Y%BB%A2*%B8%16U%F0%E9%A9%EF%88%DE%EC%60%B0%EF%3E%FE%AA%10%F3%8A%BCS%C6%D4u%1D%C30rt%86a%20%84%C0f%B3%E1%F5zq%3A%9DH)q%A9%D3%E3%EEMI%80kM!%3D%A6%01g%FFLd%0E%2F%F3%08%BFW%9F%3B%D9%EC%89%2F%F2%B8(%AA%AE%CE%19sWTL%B2%AF%9E%603%95%CC%9F%3F%9F%F2%F2rL%D3%CCy%5E%1C%0E%07%85%85%85%04%02%01%9CN'%3D%3D%3D%B8gH%B9H%D2%048%92-%18F%81%23%B7%E2%99%D3%05y*%F9%B6%B9%91%0D%7F%B8%8BT%22%3E%E3%84s%95D%22AWW%D7%A4%82%A1%B9%B9%99%91%91%11%EE%DD%BB%87%AA%AA%D8l%B6i%E7m%ED7%E9N%C9%2BM!%FD%C2%C4Zw_%A5K%9Cxe%9E%60%B1!x%5E%E5AZru%20%C3%CF%03%E6%15%60KSH%8FM%24%0A%B0%19%D8%0D%D4%3Em%80%FF%D3%DF%0B%407p%168%96-%E8%01%FE%1D%00i%5E%15%F4%A4%F6%F5%B4%00%00%00%00IEND%AEB%60%82";

var shareImgs = document.evaluate(
    '//img[@src="http://www.startupseeds.com/Images/share_fb.png"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < shareImgs.snapshotLength; i++) {
  shareImgs.snapshotItem(i).src=shareFbPng; 
}



var fbicon = document.evaluate(
    '//img[@src="/images/fb_icon.jpg"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (fbicon.snapshotLength!=0)
  fbicon.snapshotItem(0).src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0E%00%00%00%0D%08%03%00%00%00%AE%02%AFM%00%00%03%00PLTE%FF%FF%FF%FF%FF%00%FF%00%FF%FF%00%00%00%FF%FF%00%FF%00%00%00%FF%00%00%00%5E%5E%60%F1%F1%F2VXYUWXmopSUUUWWTVVoqq%89%8B%8BRSSKLL%D1%D3%D3~%7F%7Fwxxoppmnnghh%5D%5E%5E%5B%5C%5CXYY%B3%B4%B4%81%82%82OQP_a%60VXW_%60_%95%95%95eee%5D%5D%5DWWWUUU%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%AA%1E%DB*%00%00%00%A1IDATx%DA%04%C1%D9j%C30%10%40%D1%3B%1A%89%C8KE0%B4%24%0F%7D%EA%FF%7FU%0A%DD%08%8D%17Y.%B6%A4%9E%23o%B1%22K'%B0y%B2%C1%045%E1%9C%AC%3E%DBU-%1EX%8E%90%F2%D6%5C%BF%0C%1A1%2F%E5%06L%F5d%B8%C1%EF%1C_%7D%09%80%01A%05%B4%B8%0B%E8%E0%A4o%D7io%F2%D4%BF%1F%3A%F8c%14%B7w%7FR%1E%B6%B5%7C%5C%DB%7B%94f%AD%17%F6%A4%3C%DDG%DBo%ED)%8E%E1%C7%19%E6j%E9%00%A7%9Fu%B1C%86%EF%0C%D9%07%DC%A8%7D%B2%D5%9Cg%C9%C5%D6%9C%FE%07%00z0D%2C%CD%CF%B2%7F%00%00%00%00IEND%AEB%60%82";


var fbtn = document.getElementById("ctl00_Login1_UpdateStatus_chkTweetIt");
if (fbtn!=null)
{
  var labelFb = document.createElement("label");
  labelFb.appendChild(document.createTextNode("גם בפייסבוק"));
  labelFb.setAttribute("style","float: right; margin-top: -1px; margin-right: 2px;color:#5d5e5e;");
  labelFb.setAttribute("for","ctl00_Login1_UpdateStatus_chkTweetIt");
  fbtn.parentNode.parentNode.removeChild(fbtn.parentNode.parentNode.lastChild);
  fbtn.parentNode.parentNode.removeChild(fbtn.parentNode.parentNode.lastChild);
  fbtn.parentNode.parentNode.removeChild(fbtn.parentNode.parentNode.lastChild);
  fbtn.parentNode.parentNode.removeChild(fbtn.parentNode.parentNode.lastChild);
  fbtn.parentNode.parentNode.appendChild(labelFb);
}




GM_addStyle (".mini_tweet_comment_content {margin-right: 10px;padding-right:5px;border:solid 1px}");

if (window.location=="http://www.startupseeds.com/" ||  window.location=="http://www.startupseeds.com/Default.aspx" ||  window.location=="http://www.startupseeds.com/default.aspx" )
{
  var sts123 = unsafeWindow.document.evaluate(
      '//a[@class="tstatus"]',
      unsafeWindow.document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
  for (var i = 0; i < sts123.snapshotLength; i++) {
    var curSts = sts123.snapshotItem(i);
    curSts.innerHTML = curSts.innerHTML.replace(new RegExp("((http|ftp|https)://[a-z\.@,\?=&;/0-9_]+)", "ig"),"</a><a href='$1'>$1</a>"); //todo:open again the parent link
    curSts.onmouseover = showTweet;
  }
}

function showTweet(e)
{
  var a = e.target;
  if (a.getAttribute("opened")=="1")
    return ;
  a.setAttribute("opened","1");

    GM_xmlhttpRequest({
  method: "GET",
  url: a.href,
  headers: {
    "User-Agent": navigator.userAgent
  },
  
  onload: function(response) {
    if (!response.responseXML)
      response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
    var rsp = response.responseText;
    var p = 1;
    var c = 1;
    var z = "";
    while (p>0 && c>0)
    {
       p=c;
       p = rsp.indexOf("\"tweet_comment_content\"",p) + 1;
       if (p > 0)
        c = rsp.indexOf("</div>",p)+1 ;
       else
        c = -10;
        var s = rsp.substr(p,c-p);
        if (s)
          {
            z += "<div class=\"mini_" + s + "/div>";
          }
    }
   a.parentNode.innerHTML += z;
  }
  });
}


var btnD = unsafeWindow.document.evaluate(
      '//img[@src="images/scroll_down_white.jpg"] | //img[@src="images/scroll_up_white.jpg"]',
      unsafeWindow.document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
for (var i = 0 ; i < btnD.snapshotLength ; i++)
{
  func = String(btnD.snapshotItem(i).onmouseover).replace("50","20").replace("timer","timer2");
  func = func.substr(  func.indexOf("{") );
  btnD.snapshotItem(i).setAttribute("onmousedown",func);
  
  func = String(btnD.snapshotItem(i).onmouseout).replace("timer","timer2");
  func = func.substr(  func.indexOf("{") );
  
  func2 = String(btnD.snapshotItem(i).onmouseout);
  func2 = func2.substr(  func.indexOf("{") );
  btnD.snapshotItem(i).setAttribute("onmouseup",func + func2);
}

GM_addStyle (".update_tweet_btn:hover{color:#030393;font-size:17px} .user_status_send:hover{color:#030393}");

