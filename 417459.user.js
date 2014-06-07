// ==UserScript==
// @id             FakeDownloadBypasser
// @name           Fake-Download Bypasser
// @version        1.2.4
// @namespace      
// @author         jaejunks
// @description    Bypass fake software downloads on AfterDawn, CoolROM, CNET, and SourceForge.
// @include        http://www.afterdawn.com/*
// @include        https://www.afterdawn.com/*
// @include        http://www.coolrom.com/*
// @include        https://www.coolrom.com/*
// @include        http://download.cnet.com/*
// @include        https://download.cnet.com/*
// @include        http://sourceforge.net/*
// @include        https://sourceforge.net/*
// @run-at         document-start
// ==/UserScript==

/*
Version History:

v1.2.4:
- Updated bypass coverage for SourceForge.net Project Files pages.

v1.2.3:
- Added bypass for SourceForge.net.

v1.1.2:
- Added bypass for CoolROM.com.

v1.0.1:
- Initial release.
*/

(function() {
  function init(){
    var i, j, count, params, value, ele, ele2, ele3, eles;
  
    switch (location.hostname) {
  
      case "www.afterdawn.com":
        //update all download links
        ele = document.querySelector("#download-main-button");
        if (ele) {
          ele.href = ele.href.replace(/download_splash\.cfm/, "download.cfm");
        } else {
          eles = document.querySelectorAll(".direct_download > form");
          count = eles.length;
          for (i = 0; i < count; i++) {
            eles[i].action = eles[i].action.replace(/download_splash\.cfm/, "download.cfm");
          }
        }
        break;
  
      case "www.coolrom.com":
        //hide fake download, and emphasize link to real download page
        if (location.pathname.indexOf("/roms/") === 0) {
          ele = document.querySelector('TD > A[title="Add to Queue"]');
          if (ele) {
            ele = ele.parentNode.parentNode.parentNode.parentNode;
            ele2 = ele.nextElementSibling;
            if (ele2.tagName === "BR") {
              ele2 = ele2.nextElementSibling;
              if (ele2.tagName === "TABLE") {
                eles = ele2.getElementsByTagName("A");
                if (eles.length) {
                  ele2 = eles[0];
                  if (ele2.href.indexOf("/dlpop.php?id=")) {
                    ele.parentNode.removeChild(ele);
                    ele2.textContent = "Download Now";
                    ele2.style.cssText = "font-size:12pt;font-weight:bold";
                    ele2.parentNode.innerHTML = ele2.outerHTML;
                  }
                }
              }
            }
          }
        }
        break;
  
      case "download.cnet.com":
        //update all download links
        eles = document.querySelectorAll(".downloadNow");
        count = eles.length;
        for (i = 0; i < count; i++) {
          ele = eles[i];
          if (ele.tagName !== "A") {
            ele = ele.firstElementChild;
            if (!ele || (ele.tagName !== "A")) {
              ele = null;
            }
          }
          if (ele) {
            params = ele.href.split("&");
            for (j = 0; j < params.length; j++) {
              if (params[j].indexOf("destUrl=") === 0) {
                value = params[j].split("=")[1];
                ele.href = unescape(value) + "&dlm=0";
              }
            }
          }
        }
        break;

      case "sourceforge.net":
        //update download link, and restore link's file name display
        function getFileName(ele) {
          var str = ele.title.match(/\/([^\s:/]+)[\s:]/);
          if (str && (str.length === 2)) {
            str = str[1];
          } else {
            str = ele.title.match(/download (.+)$/i);
            if (str && (str.length === 2)) {
              str = str[1];
            } else {
              str = '';
            }
          }
          return str;
        }
        ele = document.querySelector("a.direct-dl");
        if (ele) {
          //update green download link on Project Summary page
          ele2 = ele.previousElementSibling;
          if (!ele2 || (ele2.tagName !== "A") || (ele2.className !== "sfdl")) {
            ele2 = document.querySelector("a.sfdl");
          }
          if (ele2) {
            eles = ele2.getElementsByClassName("info-circle");
            if (eles.length) {
              ele3 = eles[0];
              ele3.parentNode.removeChild(ele3);
              eles = ele2.getElementsByTagName("small");
              if (eles.length) {
                value = getFileName(ele2);
                ele3 = eles[0];
                ele3.textContent = value ? value : 'Without Installer';
              }
            }
            ele2.href = ele.href;
            ele.parentNode.removeChild(ele);
          }
        } else {
          ele = document.querySelector(".download-bar > strong > a");
          if (ele) {
            //update latest download link on Project Files pages
            value = getFileName(ele);
            if ((/\.exe$/i).test(value)) {
              if (!(/[?&]nowrap(\&|$)/i).test(ele.href)) {
                ele.href += (/\?/).test(ele.href) ? '&nowrap' : '?nowrap';
              }
            }
          }
          //update download links on Project Files pages' file list
          eles = document.querySelectorAll("#files_list .file a.name");
          count = eles.length;
          for (i = 0; i < count; i++) {
            ele = eles[i];
            value = getFileName(ele);
            if ((/\.exe$/i).test(value)) {
              if (!(/[?&]nowrap(\&|$)/i).test(ele.href)) {
                ele.href += (/\?/).test(ele.href) ? '&nowrap' : '?nowrap';
              }
            }
          }
        }
        break;
    }
  }
  addEventListener("DOMContentLoaded",init,false);

  //CoolROM: Shorten delay on showing page content of download popup
  if ((location.hostname === "www.coolrom.com") && (location.pathname === "/dlpop.php")) {
    var orgTimeout = window.setTimeout;
    function newTimeout() {
      arguments[1] = 20;
      return orgTimeout.apply(this, arguments);
    }
    window.setTimeout = newTimeout;
  }
})();