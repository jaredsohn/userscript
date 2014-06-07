// ==UserScript==
// @name        MIUI HWU9508 Checker
// @namespace   http://userscripts.org/users/526415
// @description This script adds Huawei U9508 (Honor2) to the download list of MIUI ROM
// @include     http://xiaomi.eu/community/threads/*
// @version     0.2.0
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @downloadURL http://userscripts.org/scripts/source/406457.user.js
// @updateURL   http://userscripts.org/scripts/source/406457.meta.js
// ==/UserScript==

var version = document.title.match(/MULTI - ([0-9]\.[0-9]+\.[0-9]+)/);
var origrom = 'http://www.miui.com/getrom-36.html';
var files = 'http://files.miuiandroid.com/';
var goofiles = 'http://goo.im//devs/ibotpeaches/miuiandroid/releases/';

var dataTables = document.getElementsByClassName('dataTable');
if (dataTables.length > 0) {
    var tbl = dataTables.length == 1 ? dataTables[0] : dataTables[1];      // get the Multilang ROMs (2nd table)
    var tr = tbl.getElementsByClassName('dataRow')[0];                     // first row of the table
    
    var modelname = 'Huawei Honor 2';
    var codename = 'hwu9508';
    var author = 'Xiaomi - Port';
    var hash = '-';
    
    if (version != null) {
        GM_xmlhttpRequest({
          method:"GET",
          url:files+version[1]+'/',
          onload:function(response) {
            var vercrop = version[1].substr(0, version[1].lastIndexOf("."));
            var bfNumber = version[1].substr(version[1].lastIndexOf(".")+1);
            var zNode = document.createElement('tr');  
            var models = response.responseText.match(/(miuiandroid_multi_hwu9508_[0-9]\.[0-9]+\.[0-9]+_(.+?).zip)/);
            if (models != null) {
              var link = files+version[1]+'/'+models[1];
              var goolink = goofiles+version[1]+'m/'+models[1];
              var android = models[2].replace('-',' - ').toUpperCase();
              
              zNode.setAttribute('class', 'dataRow');
              zNode.setAttribute('style', 'background-color: lightgreen');
              zNode.innerHTML = '<td>'+modelname+'</td>';
              zNode.innerHTML += '<td>'+codename+'</td>';
              zNode.innerHTML += '<td>'+android+'</td>';
              zNode.innerHTML += '<td><a href=\"'+link+'\">Link</a></td>';
              zNode.innerHTML += '<td><a href=\"'+goolink+'\">Goo</a></td>';
              zNode.innerHTML += '<td>'+author+'</td>';
              zNode.innerHTML += '<td>'+hash+'</td>';
                
               tr.parentNode.insertBefore(zNode, tr.nextSibling);
            } else {
              GM_xmlhttpRequest({
                  method:"GET",
                  url:origrom,
                  onload:function(response2) {
                      var zNode       = document.createElement('tr');
                      zNode.setAttribute('class', 'dataRow');
                      zNode.innerHTML = '<td>'+modelname+'</td>';
                      zNode.innerHTML += '<td>'+codename+'</td>';
                      
                      var srcpattern = '(http:\/\/miuirom\.xiaomi\.com\/rom\/[a-zA-Z0-9]+\/'
                                      +vercrop+'\.[0-9]+\/miui_honor2_([^_]+?)_'
                                      +vercrop+'\.([0-9]+)_[a-zA-Z0-9]+_(.+?)\.zip)';
                      var srcpattern = new RegExp(srcpattern, 'i');
                      var srclink = response2.responseText.match(srcpattern);
                      if (srclink != null) {
                          var link = srclink[1];
                          var android = 'JB - ' + srclink[4];//.replace('-',' - ').toUpperCase();
                          var author = srclink[2];
                          
                          zNode.innerHTML += '<td>'+android+'</td>';
                          zNode.innerHTML += '<td colspan="2"><a href=\"'+link+'\">Original ROM (CN/EN)</a></td>';
                          zNode.innerHTML += '<td>'+author+'</td>';
                          if (srclink[3] > bfNumber) {
                              zNode.innerHTML += '<td><b>Higher version: <font color="red">'+vercrop+'.'+srclink[3]+'</font></b></td>';
                          } else zNode.innerHTML += '<td>-</td>';
                          zNode.setAttribute('style', 'background-color: lightblue');
                      } else {
                          zNode.setAttribute('style', 'background-color: lightgray');
                          zNode.innerHTML += '<td colspan="5" style="text-align: center">NO FILE FOUND</td>';
                      }
                      tr.parentNode.insertBefore(zNode, tr.nextSibling);
                  }
              });
            }
            
              
          }
        });    
    }
}

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #downloadSRTButton {
        font-size:              12px;
        font-weight:            bold;
        color:                  red;
        letter-spacing:         1px;
        background:             lightblue;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        width:                  150px;
        padding:                5px 20px;
    }
    #failedButton {
        font-size:              12px;
        font-weight:            bold;
        color:                  black;
        letter-spacing:         1px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        width:                  150px;
        padding:                5px 20px;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}