// ==UserScript==
// @name        Dynamics CRM 2013 Left Navigation
// @namespace   http://www.magnetismsolutions.com
// @include    
// @version     1
// @grant       none
// ==/UserScript==

function addCss(cssString) {
var head = document.getElementsByTagName('head')[0];
var newCss = document.createElement('style');
newCss.type = "text/css";
newCss.innerHTML = cssString;
head.appendChild(newCss);
}

addCss(".navActionGroupContainer, .navActionListContainer{overflow-x:hidden;overflow-y:auto;width:215px;height: -moz-calc(100% - 40px);height: -webkit-calc(100% - 40px);height:calc(100% - 40px);}.nav-scrl{overflow:hidden;position:static;}"
+ ".nav-scrl{overflow:hidden;position:static;}" + ".nav-scrl-left-lnk,.nav-scrl-right-lnk{display:none!important;}" + ".nav-scrl-view{overflow:hidden;}" + ".nav-scrl-cont{margin-left:5px!important;}" +
".nav-tabBody{width:200px!important;}" + ".nav-subgroup,.nav-group{display:list-item;float:left;}" + ".nav-layout,.nav-groupContainer{display:inline-block;width:200px;}" + ".navActionButtonContainer{margin-bottom:5px;}" +
".navActionListContainer{left:198px;overflow:auto;top:40px;width:135px;}" + ".navEmptyActionButtonSmall img{float:left;margin-top:5px;}" + ".navEmptyActionButtonSmall .navActionButtonLabel{display:inline-block;overflow:visible;white-space:normal;width:126px;}" +
".navActionButton.selected:after{border:none;}"
);

Mscrm.ScrollInputHandler.prototype.attachScrollEventHandlers = function (handler) {
}

