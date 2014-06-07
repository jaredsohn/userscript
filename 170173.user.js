// ==UserScript==
// @name       i-soft
// @namespace  http://yetist.isoft.zhcn.cc/selfservice/
// @version    0.1
// @description 修复员工自助管理系统在chromium上面显示日历不正常的bug.
// @copyright  2012+, yetist
// @include    http://192.168.134.247:8080/module/common/main.jsp
// @include    http://112.64.127.100:48080/module/common/main.jsp
// ==/UserScript==

Ext.override(Ext.menu.DateMenu, {      render : function() {          Ext.menu.DateMenu.superclass.render.call(this);          if (!Ext.isIE) {              this.picker.el.dom.childNodes[0].style.width = '178px';              this.picker.el.dom.style.width = '178px';          }      }  });  
Ext.override(Ext.menu.DateMenu, { render : function() { Ext.menu.DateMenu.superclass.render.call(this); if (!Ext.isIE) { this.picker.el.dom.childNodes[0].style.width = '178px'; this.picker.el.dom.style.width = '178px'; } } });  
