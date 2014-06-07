// ==UserScript==
// @name        Magento Connect Skip Login + Extension Downloader
// @description Get extension keys without logging in, also lets you download extensions with http://freegento.com/ddl-magento-extension.php
// @namespace   http://userscripts.org/users/philklc
// @author      Phil Chan
// @copyright   Phil Chan
// @license     Public domain
// @include     http://www.magentocommerce.com/magento-connect/*
// @grant       none
// ==/UserScript==

function main() {
    LOGGED_IN = true;
    getKeyAndDownload = function() {
      document.forms['downloader'].ext.value = jQuery(this).siblings('input[id^="extension-key-input"]').val();
      document.forms['downloader'].submit();
    }
    autoAcceptAgreement = function() {
      $agreementBox = jQuery(this).closest(".get-extension-button").siblings(".license-agreement-box");
      $agreementBox.find(".license-agreement-box-agreement span:not(.ui-checkbox-checked)").click();
      if ($agreementBox.find("select").length == 0) {
        $agreementBox.find("button:eq(0)").click();
      }
    }
    addDownloadButton = function() {
      jQuery(".extension-key-box").each(function() {
        $button = jQuery(this).find("button");
        if ($button.length == 1) {
          jQuery(document.createElement("button")).addClass("ui-button-orange-middle").html("Download").on("click", getKeyAndDownload).insertBefore($button);
        }
      });
    }
    
    Enhance = function() {
      addDownloadButton();
      jQuery(".get-extension-button").on("click", autoAcceptAgreement);
    }
    
    Enhance();
    
    Ajax.Responders.register({
      onComplete: Enhance
    });
}

var d = document;
var s = d.createElement('script'); s.textContent = '('+main.toString()+')()';
var t = d.getElementsByTagName('head')[0] || d.body || d.documentElement;
t.appendChild(s);
var y = d.createElement('style'); y.textContent = '.extension-key-box {height:136px !important} .extension-key-box button{cursor:pointer;margin:0 0 12px} .extension-key-box button.ui-button-orange-middle{color: #fff} .license-agreement-box{height:70px !important} .license-agreement-box-agreement{height:0;visibility:hidden;overflow:hidden}';
t.appendChild(y);
var f = d.createElement('form');
f.setAttribute("name", "downloader");
f.setAttribute("method", "post");
f.setAttribute("action", "http://freegento.com/ddl-magento-extension.php");
f.setAttribute("target", "_blank");
var k = d.createElement('input'); k.setAttribute("type", "hidden"); k.setAttribute("name", "ext");
f.appendChild(k);
d.body.appendChild(f);