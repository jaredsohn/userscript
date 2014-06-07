// ==UserScript==
// @name        TJUPT Light Color Username Add Shadow
// @description 北洋园PT浅色ID周围添加阴影 
// @namespace   http://userscripts.org/scripts/show/153813
// @include     *://pt.tju.edu.cn/*
// @include     *://pt.twt.edu.cn/*
// @include     *://pt.tju6.edu.cn/*
// @include     *://sp.tju6.edu.cn/*
// @include     *://202.113.13.170/*
// @include     *://[2001:da8:a000:113::170]/*
// @version     1.0.0
// @author      田生
// @copyright   BSD License
// @grant       none
// ==/UserScript==

// 用户名（链接）和头衔的class
var s = [
  ".StaffLeader_Name", ".SysOp_Name", ".Administrator_Name",
  ".Moderator_Name", ".ForumModerator_Name", ".Retiree_Name",
  ".Uploader_Name", ".VIP_Name", ".NexusMaster_Name",
  ".UltimateUser_Name", ".ExtremeUser_Name", ".VeteranUser_Name",
  ".InsaneUser_Name", ".CrazyUser_Name", ".EliteUser_Name",
  ".PowerUser_Name", ".User_Name", ".Peasant_Name"
].join(', ');

var l = document.querySelectorAll(s), i;
for (i = 0; i < l.length; i++) (function (p) { try {
  // 页面这里总是通过style="color:xxyyzz;"设定的颜色
  // 0x跟十六进制再转换成Number类型
  var color = Number(p.getAttribute('style')
    .replace(/^.*color:#([0-9A-Fa-f]*);.*$/, '0x$1'));
  // 将一个整个的十六进制拆分成RGB分量
  color = {'r': color >> 16, 'g': color >> 8 & 255, 'b': color & 255};
  // 计算亮度大于设定值的情况时
  if (color.r * 0.299 + color.g * 0.587 + color.b * 0.114 > 0xD7) {
    // 添加4像素的文字阴影。
    p.style.textShadow = '0 0 4px #000';
  }
} catch (e) {} }(l[i]));

