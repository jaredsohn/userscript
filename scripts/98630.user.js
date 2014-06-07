// ==UserScript==
// @name           baidu_clear
// @namespace      baidu
// @description    baidu_clear
// @include        http://www.baidu.com/s*
// @include        http://www.baidu.com/baidu?cl*
// ==/UserScript==


( function() {

    var version="v 1.11 beta";
    function $(id) {
      return document.getElementById(id);
    }

    function $T(elem,tag,val) {
      var allElements,match;
      var result=new Array();
      if(tag=='' && val=='') {
        allElements = document.getElementsByTagName('br');
        for (var i = 0; i < allElements.length; i++) {
          result.push(allElements[i]);
        }
        return result;

      }
      match = '//'+elem+'[@'+tag+'="'+val+'"]';
      allElements = document.evaluate(match ,document,null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

      for (var i = 0; i < allElements.snapshotLength; i++) {
        result.push(allElements.snapshotItem(i));
      }
      return result;
    }

    if($('ec_im_container'))
      $('ec_im_container').parentNode.parentNode.removeChild($('ec_im_container').parentNode);

    var tg = $T('table','class','ec_pp_f');
    for(t in tg) {
      tg[t].parentNode.removeChild(tg[t]);
    }
    var tg = $T('table','class','EC_mr15');
    for(t in tg) {
      tg[t].parentNode.removeChild(tg[t]);
    }

    var tbr = $T('br','','');
    for(t in tbr) {
      tbr[t].parentNode.removeChild(tbr[t]);
    }
    var tr = $T('table','class','result');
    for(t in tr) {
      tr[t].style.padding='10px';
    }
    var lg = $T('span','class','g');
    for(t in lg) {
      newElement = document.createElement('br');
      lg[t].parentNode.insertBefore(newElement,lg[t]);
    }
    var tg1 = $T('div','class','fsblock');
    for(t in tg1) {
      tg1[t].parentNode.parentNode.parentNode.removeChild(tg1[t].parentNode.parentNode);
    }


    //css
    function addGlobalStyle(css) {
      var head, style;
      head = document.getElementsByTagName('head')[0];
      if (!head) {
        return;
      }
      style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      head.appendChild(style);
    }

    addGlobalStyle('#clear_panel {  position:absolute;  left:300px; top:97px; width:250px;  height:150px; z-index:99;  background-color: #CCCCCC;  font-size: 12px;  color: #333;  text-decoration: none;  border: 1px solid #36C; padding: 10px;} #clear_panel h1 { font-size: 24px;  color: #09F;  font-style: normal; text-decoration: none;  margin: 0px;  padding: 0px;}');
    //panel
    var clear_p = document.createElement("div");
    clear_p.innerHTML='<div id="clear_panel" style="display:none">'+
    '<h1>Baidu_clear</h1>'+
    '<p>百度搜索结果广告过滤工具，专门过滤搜索结果中的广告,净化搜索结果。</p><br/>'+
    '<p><strong>当前版本：</strong>'+version+'</p>'+
    '<p><a href="http:\/\/userscripts.org/scripts/source/98630.user.js">升级为最新版本</a></p><br/>'+
    '<p><input type="button" value="确定" onclick="document.getElementById(\'clear_panel\').style.display=\'none\'" /> </p>'+
    '</div>';
    document.body.insertBefore(clear_p, document.body.firstChild);

    var clear_icon = document.createElement('img');
    clear_icon.src="data:image/gif;base64,R0lGODlhHgAeAMQAAAm0/3/G/C+6/6/W+R+4/1/A/8/j+BO6/4/L+j+8/ynE/0+9/9/r+Q+1/5nM/7/c+Bu8/2/G/i/F/z/C/yG+/1/C/zPM/4zO/////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHABgALAAAAAAeAB4AAAWpICaOZGmeaKquJfMEMPKwqbFIuKIrUsHQJMSBgpPsdhIHEBMAHCDE3FGnZD0A2Ccl8ng4JkXI4bdKYLEC8qigoBwOkRXjjFWPGO43YWUwYxcoCW9YSwZ2JAQNZ0spCIp/jCdNdDORdwt0ABWWIwYCmZucGAyPZ6Gin3QIoiIDmVWsEXQBrCN+dbUitwC5Ig4wML3CJhEJxgnCE29vycsHyRDRENDSw9aiIQA7";
    clear_icon.style.cssFloat="right";
    clear_icon.style.width="30px";
    clear_icon.style.height="30px";
    clear_icon.id="myclear";
    clear_icon.setAttribute("onclick",'document.getElementById("clear_panel").style.display="block"');
    
    
    //googlelink
    var google_btn= document.createElement('input');
    google_btn.type="button";
    google_btn.className="btn";
    google_btn.style.marginLeft="2px";
    google_btn.style.width = '100px';
    google_btn.style.height = '34px';
    google_btn.value="谷歌";
    google_btn.setAttribute("onclick",'window.location.href="http://www.google.com.hk/search?hl=zh-CN&q='+document.getElementById("kw").value+'"');
    $('su').parentNode.style.width="227px";
    $('su').parentNode.appendChild(google_btn);
    $('su').parentNode.appendChild(clear_icon);

  })();
