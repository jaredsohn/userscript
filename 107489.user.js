// ==UserScript==
// @name           tr7t Auto Upgrade
// @author         ThunderStorm - AkkArApOn SeRmSRup
// @email   akkarapon.sermsup@gmail.com
// @namespace      Akkarapon.tr7tAutoUpgrade
// @include        http://*.tr7t*.*/*.php*
// @exclude        http://*.tr7t*.*/activate.php*
// @exclude        http://*.tr7t*.*/ajax.php*
// @exclude        http://*.tr7t*.*/anleitung.php*
// @exclude        http://*.tr7t*.*/anmelden.php*
// @exclude        http://*.tr7t*.*/hilfe.php*
// @exclude        http://*.tr7t*.*/impressum.php*
// @exclude        http://*.tr7t*.*/index.php*
// @exclude        http://*.tr7t*.*/links.php*
// @exclude        http://*.tr7t*.*/manual.php*
// @exclude        http://*.tr7t*.*/support.php*
// @exclude        http://*.tr7t*.*/tutorial.php*
// @exclude        http://*.tr7t*.*/ad/*
// @exclude        http://*.tr7t*.*/chat/*
// @exclude        http://forum.tr7t.*
// @exclude        http://board.tr7t*.*
// @exclude        http://help.tr7t*.*
// @exclude        http://shop.tr7t*.*
// @exclude        http://www.tr7t.*
// @version        0.13.2.2
// ==/UserScript==

/**********************
** Variable Settings **
**********************/
var tau_LOG_LEVEL = 1;              // 0 = No information, 1 = Error level, 2 = Warning level, 3 = All Information level

/******************** define constants ********************/
const XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
const XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
const XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
const XPOrdList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
const XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
const XPOrdItert = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
const XPNumber = XPathResult.NUMBER_TYPE;
const XPAny = XPathResult.ANY_TYPE;
const XPSnap = 6;//XPathResult.UNORDERED_SNAPSHOT_TYPE;
const XPOrdSnap = 7;//XPathResult.ORDERED_SNAPSHOT_TYPE;
const XPString = XPathResult.STRING_TYPE;
const XPBool = XPathResult.BOOLEAN_TYPE;
const SCROLLLEFT = 'scrollLeft';
const SCROLLTOP = 'scrollTop';
const SCRIPTVER = '0.13.2.2';
const UPDATEURL = 'http://userscripts.org/scripts/show/107489.user.js';
const SCRIPTURL = 'http://userscripts.org/scripts/show/107489';

/******************** prepare all variable ********************/
var appConf = {
    fullServerName:"www.tr7t.com",
    gServer:"www_com",
    lang:'en',
    autoLogin:true,
    scriptPause:false,
    isSpeed:false,
    plusAct:false,
    T35:false,
    M35:0,
    refreshInterval:30, // in minutes
    reCheckInterval:10, // in seconds
    messageDelay:2.5, // in seconds
    refreshAfterDone:true,
    winPos:{left:700,top:200},
    userInfo:{
        userID:"",
        userName:"",    //0
        race:"",        //1
        disprace:"",    //2
        capName:"",     //3
        capVid:"",      //4
        capNewdid:"",   //5
        capPos:null,    //6
        raceId:0        //7
    }
};

var urlNow = window.location.pathname + window.location.search;
var jsVoid = 'javaScript:void(0)';
var dlright1 = 'lright1';
var dmid = 'lmidall';
var dTop5 = 'ltop5';
var dTop1 = 'ltop1';
var dmid2 = 'lmid2';
var dleft = 'lleft';
var dmid1 = 'lmid1';
var dmap = 'map1';
var doc = document;
var body = (doc.body || doc.documentElement);
var MAX = Math.max;
var MIN = Math.min;
var FLOOR = Math.floor;
var ROUND = Math.round;
var ua = navigator.userAgent.toLowerCase();
var check = function(r){return r.test(ua);};
var toString = Object.prototype.toString;
var isWindows = check(/windows|win32/);
var isLinux = check(/linux/);
var crtPage = window.location.href;
var reGetCapInfo = false;
var doingTask = false;
var spLnk = '';
var bksLnk = 'build.php?gid=19';

var tasks = [];
var villages = {};
//active village
var actV = null;
//main village
//var mainV = null; //{Name:'',Id:0,Newdid:0,x:-1000,y:-1000,Link:'',Ress:{curr:[0,0,0,0],capa:[0,0,0,0],pphr:[0,0,0,0],cost:0,corp:0}};

var chkCnt = appConf.reCheckInterval;
var clrStatusDelay = 0;
var mainWin;

/******************** define css class ********************/
var aCss = ".tau-win-box {background-color: transparent; display: block; position: absolute; border: 1px solid #866; clear: both; -moz-border-radius: 5px 5px 5px 5px;} "+
".tau-win-title {background-color: #e0efef; font-size: 14px; text-align: center; cursor:move; padding: 2px 5px; border-bottom: 1px solid #866; -moz-border-radius: 5px 5px 0px 0px; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select:ignore;opacity:0.8;} "+
".tau-win-top-bar {padding: 2px; margin: 2px; border: 1px solid #ccc;} .tau-win-content {padding: 2px; background-color: #fff;} .tau-win-content-no-bottom {padding: 2px; background-color: #fff; -moz-border-radius: 0px 0px 5px 5px;}"+
".tau-win-bottom-bar {background-color: #eee; padding: 2px 5px; border-top: 1px solid #866; font-size: 10px; height: 12px; overflow: hidden; -moz-border-radius: 0px 0px 5px 5px; opacity: 0.8;}"+
".tau-task-table {border-collapse: collapse; border: 1px solid #988;}"+
".tau-task-table-header {background-color:#ddd; font-size: 12px; font-weight: bold; text-align: center; padding: 0px 5px; border: 1px solid #988;}"+
".tau-task-item-none {background-color:#eee; color:#999; font-size: 10px; border: 1px solid #988;}"+
".tau-task-item-cell {background-color:#fff; font-size: 10px; border: 1px solid #988; text-align: center; padding: 0px 2px;}"+
".tau-task-item-auto {font-weight: bold; color: #800;} .tau-task-item-gen {color: #800;}"+
".tau-button {border: solid 1px #0f0; -moz-border-radius: 5px 5px 5px 5px;}"+
".tau-tool {overflow:hidden;width:15px;height:15px;float:right;cursor:pointer;background:transparent no-repeat;margin-left:2px;margin-top:1px;}.tau-tool-toggle {background-position:0 -60px;}.tau-tool-toggle-over {background-position:-15px -60px;}.tau-panel-collapsed .tau-tool-toggle {background-position:0 -75px;}"+
".tau-panel-collapsed .tau-tool-toggle-over {background-position:-15px -75px;}.tau-tool-close {background-position:0 -0;}.tau-tool-close-over {background-position:-15px 0;}.tau-tool-minimize {background-position:0 -15px;}.tau-tool-minimize-over {background-position:-15px -15px;}"+
".tau-tool-maximize {background-position:0 -30px;}.tau-tool-maximize-over {background-position:-15px -30px;}.tau-tool-restore {background-position:0 -45px;}.tau-tool-restore-over {background-position:-15px -45px;}.tau-tool-gear {background-position:0 -90px;}.tau-tool-gear-over {background-position:-15px -90px;}"+
".tau-tool-pin {background-position:0 -135px;}.tau-tool-pin-over {background-position:-15px -135px;}.tau-tool-unpin {background-position:0 -150px;}.tau-tool-unpin-over {background-position:-15px -150px;}.tau-tool-right {background-position:0 -165px;}.tau-tool-right-over {background-position:-15px -165px;}"+
".tau-tool-left {background-position:0 -180px;}.tau-tool-left-over {background-position:-15px -180px;}.tau-tool-up {background-position:0 -210px;}.tau-tool-up-over {background-position:-15px -210px;}.tau-tool-down {background-position:0 -195px;}.tau-tool-down-over {background-position:-15px -195px;}"+
".tau-tool-refresh {background-position:0 -225px;}.tau-tool-refresh-over {background-position:-15px -225px;}.tau-tool-minus {background-position:0 -255px;}.tau-tool-minus-over {background-position:-15px -255px;}.tau-tool-plus {background-position:0 -240px;}.tau-tool-plus-over {background-position:-15px -240px;}"+
".tau-tool-search {background-position:0 -270px;}.tau-tool-search-over {background-position:-15px -270px;}.tau-tool-save {background-position:0 -285px;}.tau-tool-save-over {background-position:-15px -285px;}.tau-tool-help {background-position:0 -300px;}.tau-tool-help-over {background-position:-15px -300px;}"+
".tau-tool-print {background-position:0 -315px;}.tau-tool-print-over {background-position:-15px -315px;}.tau-tool-collapse-south {background-position:0 -195px;}.tau-tool-collapse-south-over {background-position:-15px -195px;}.tau-tool-collapse-north {background-position:0 -210px;}"+
".tau-tool-collapse-north-over {background-position:-15px -210px;}.tau-tool-collapse-west {background-position:0 -180px;}.tau-tool-collapse-west-over {background-position:-15px -180px;}.tau-tool-collapse-east {background-position:0 -165px;}.tau-tool-collapse-east-over {background-position:-15px -165px;}"+
".tau-tool-expand-south {background-position:0 -210px;}.tau-tool-expand-south-over {background-position:-15px -210px;}.tau-tool-expand-north {background-position:0 -195px;}.tau-tool-expand-north-over {background-position:-15px -195px;}.tau-tool-expand-west {background-position:0 -165px;}"+
".tau-tool-expand-west-over {background-position:-15px -165px;}.tau-tool-expand-east {background-position:0 -180px;}.tau-tool-expand-east-over {background-position:-15px -180px;}.tau-tool-expand-north, .tau-tool-expand-south {float:right;margin:3px;}.tau-tool-expand-east, .tau-tool-expand-west {float:none;margin:3px auto;}"+
".tau-accordion-hd .tau-tool-toggle {background-position:0 -255px;}.tau-accordion-hd .tau-tool-toggle-over {background-position:-15px -255px;}.tau-panel-collapsed .tau-accordion-hd .tau-tool-toggle {background-position:0 -240px;}.tau-panel-collapsed .tau-accordion-hd .tau-tool-toggle-over {background-position:-15px -240px;}"+
".tau-tool {background-image:url(data:image/gif;base64,R0lGODlhHgBoAfcAAB8fHzU1NTo6OkBAQEJCQkZGRkhISElJSUxMTE5OTlBQUFRUVFhYWFlZWVpaWltbW1xcXF5eXmFhYWJiYmRkZGVlZWdnZ2hoaGlpaWtra2xsbG1tbW5ubm9vb3BwcHNzc3Z2dnh4eHl5eXp6ent7e3x8fH19fX5+fn9/f0D/QICAgIGBgYODg4SEhIWFhYeHh4iIiIqKiouLi4yMjI2NjY6Ojo+Pj5CQkJSUlJWVlZaWlpeXl5mZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaenp6ioqKurq6ysrK2tra+vr7CwsLGxsbKysrS0tLW1tba2tre3t7i4uLm5ubu7u7y8vL29vb6+vr+/v8HBwcPDw8TExMrKysvLy8/Pz9DQ0NHR0dXV1dfX19vb2+Dg4OHh4eLi4uPj4+bm5ujo6Orq6uzs7O7u7u/v7/Dw8PHx8fT09Pf39/v7+/z8/P39/f7+/v///0D/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHsALAAAAAAeAGgBAAj+APfssUKwoEErAgX+WMiw4Y+EVvRInEhRD8I9P9Jo3MgxzcOIFUNazCiSoseIduxESclypZ2RaVK6bJnypJ46UQpEqcMz506YenzyxKmzjk06dHwm1YkUaFCmPvXQsSmnqk+dVeXArPo0alWbHH1yhLmxqx6OPyKuWXs1yto1MNd21alnrU02bHzm1YkXJhuzUdnYbOOzjeHCQKO2MWvTjZsojiNDdgOTchQ9kYNitmknsmfHL61k7IzZM2Y7HgeWnHgxY8eODwUenJ0Qo0OHtWcfrH0bt+zVElu/hq0aeHCSwDmzXM4SJvPnNodKlw5zuvWjSLNrpwNzu3eqWcP+Z90qXjzY4WVFlw25MW3dNVHiy3cLVz3c+fLr3mVToL//An2p99d//ukhmHuH4ReFYTAtpuBlbTT22WeV/RUSG25wNmFkoY22IWipgbSacOhpFNtAuhXEW28M5ZYiQSuyeKKIJZFY4kfGHZeGcco915x6Pi4XXQNEFllkHUAR+N9Z7tFh5JPcqaeHkgVS1UB5clyZpEgFMBlRGg0MF+aWHU3pZV0NvKVmmluqCVeXdzWA15x4ybllSHAi+KSRi0lJZX9nfpiZlMm519mHHcYkKGo4AmcjejO+eJFCMp6I4osxsgiRcY8O1yinyK3WY5DOpSQSoxENtWcDSKrH05T+Sp6ZXQP4NRBlRk3pNF+eEWV1ZXhaqsdVAeLxetaqYO7op5JpGLsGrfMVWR9JuspXpXtsyEmntn/5aWBfXRo4WAOGlUsug95S1KVhja06KLWxOqYhos6JBOKnNSpUookQSZppby5imlClM3Kq7774jhhqSaP6WGqQqN5kHXWuUjcddrNu1112ZmoHXlVFhkeeVgVmdR6YRqbn2o4EnmWiWs/uKZd9sLa8xn505uyXhRXhNVi5QJfbYNBBSyhoZYJmaOiizi0aosEY7ZuabP4OXGnAKf5726aOHnxjcaDuWChKECdadsQTU5xR2kNh7F1T6jUVElLgrcqVsDUvKcf+yU+qXFbL7cG8lrRvxSVXgW/hXKfOAs5pJp0/Ey20epIDbfSHSAs674ZmO51wSJ2+FqnAlMqItW5a+wZ2vlEjvLrCYotqKEs41L7cw3bUjoOQ7vGUBA9dAGEFDE+8WvHvwQ9fvFFN0mEFGF+EocUQOMCNq/PQS0893e5VRYMXMaDQQxUs3J2R9+CLT/5X7qURwxhcsJAGElLg0IGyrr0f//z132/TGjHYABamcIQnNMEFFJhWGgAoQAIaEIE3wxYbVAAFKURBCUIYQYAyghcKWhCDGjxQRAwDAgd0IAcPWMEJ0JUREpoQhSpkl3s8YwMF2OAJ70oDDW2IQ3ktjV7+QPLc60DnNUj1i3S2Md0Rs2Y1JQ6xIqEjDo1gx6PZQQx3puJdqqbDqqFUhzoNkBjzIrIdImlnY00hklS41ytfEUlkwuJKkfRgsvZpJGV+04gejOSyl71ncERSk+HgMsfESXBORKLTzvqixjlFzlxAG5rQwliuy20oc5nxzOYm1DlEPa1rrfsa1ZBIsNPRpoma+g0oV2bEKdZoYSJp2HNwpwfo9E5V1vkiksJ4seYhxYxnjFsaw+ix7rnxV+ZLw3jmWMcvbQSP+BsLHwP3x5ilqXD2kUsh7XLIbHFrg2lwXCMdiSBIBk2Se9RD0WaYNEyWRpM/5FzTPPk5KBbRU0v+RB0qAZbPU5YulU+kSBTRElAowpI9VnTIj0aTEgKxJDo8+QEdGOLFitWhAHTwT9t8KVGGcEyYGc1of7LzsR/IgSHjiaMciOWfZvYxIwzJo0YK0Kz+oEVwP1gDQ7CZkbcUYA3+MWRE8NIbcOKFSj4rZ7l+AIZIUg5oBWhqJdkZGaaaRj2fiSo8UeIZq4Jmno7R6r0KGpx7iq6fu9nn1tBqkNQ1hGsjMqsUc+QU2ZHtikAqG0TrQIKJ6bIAE8MYCQZLWBLcKg3ZodJUjCkHEojHsSMjVniIZZPCWpYE0fyTTW0Chs5elgQK7CwYqBTBoeLls93i4FGVJEJ1GoYEkpP+ZAEkZ8kJYXJDm/xMJzn3ybiG0oijZOI/+RlcfQ53rWS1iFwJ6kqREMqutSwbFm25xb7yxLrGW9tFhwLYjZKRDoNFSnith1iRImWkbKRjVQa7XsdqRaX9qUp892ZHjQzWvpgly0Y2u1n3vGWwawGwAn36U6AWeD+DPS0JHNe4/qyWnCNsA2xf69QWtmG2hsGwDCOSNMpgNWm59cxuOdlb1rESn8X1ZxIBeinhrpi4zRXoctuTXB1V8a6kyivE9srXoVhXl9vlSXcFa1jwFhmN6EUveNjbWPe+93wrlex86ful+6bBynpUT01nStObvkfAAh6wgdfSH6F+iw0JRvP+glMbzgfzB0CtBdqEJczCNEC1XBiuLYU+rLl4chKsJK6njH+L4hYb98XINbSKS6lK3574rDE2aOwYZsUcM3THtxysj39csf5wd8i+DO94D5tYjKJ3sW1sr5OfrMystNSlHcHsWLTMkS57OcCgxfXMejpmMh/4kAlOM5vn5GAHJzXCrx1she2M5/5YjqqOIcGeM5LVz4SYQ4DWbYmdO2N+pTitx1WdosGNaNVFuqyEhjRdn0tpHNuBBMzBYgGYw2PCqi0N0tGod9do5H6Tt9TmTW97s8Jk8kx5viezb5lovV/RCW4NhBVkNn1dYG6aVs0YN+qDjR1nCc9Z2X2ysLP+M5xnaF+Szx+69leDSM/kDpTG326rWsUtqUmV+62NNrHUBC3pG0d3OfBeaEyYM++H3pInnsUukDvraZ5gBwyX/TcdRksggTeW4E42uKslS2WXgeHKYP96NDXydZrSVOz/03WAd71AX/vU4t+6LBg0rqS5d9zjnV12s/M+VQ5HRtrT1mFkCjAhlbthxNrmObofTZyYq2jmOHc8jCDfopxzO91zzRG7Y1lph+k4SDxGww/QcG/poIEEpN+3dk6PhmBeDyloKEDrSWpMNNge9bZPZlVsH3ves8+ZP7Csa/RLAgLJOu1lSD4Jkl8Gtq+F+QVgPtzpVIblK7JxeClD9CH+p9Q2lOEHZdB7uaof/r6/E3Mox62fdZttEW+biJgnqORtzuj5u7XyLu/2+5170IrIMt6f5yM85lcWlTZu8zZo9Daopl6814C6JwcN6HtdZyLCl2UrU3z/cXz+tQbM14HOx4EdmHzTlzOMo1okCGGuVTkhx2wqqGdXRW0gtn4i1n4csn+DxnjyN24yF26Rp4OPx4P4d27KFX80JoQ2NjY/5wIs8G4mIHQsoYRMaHRblAZL8ABxAAFDcAXZhW9GUYVXmIVO1zwicAMJcAQM8AMLIHVjWIZnmIYLKAdUQAFb0AExgAFUIAFDwGpwKId0aId4OIEm8AER0ABKYAAJQAD+ATB2gTiIhXiIifg/LXAGVoADaxACYjAFEzBgkTiJlXiJmXgXJWAGLlABbCACZBADAjBsoTiKpXiKqTgYGmAFJIAAbVABSOABALCCbRCLs1iLt5iLjYEAwogAbiCMA3AAHkZtw0iMxoiMhod47qd4Q4iDMOeDkweEC2FK5FZ/Qvhy/GKEddVutYQDOUAEM1ADO6ADMPACZkOO5oiO6siO0dECenADEmEHdcAEL9Aqa0OP9lhL+biPR+ECd3AHeYAHdnAHSGACpEaQBomQCsmQVBEDRWAEQwAEQPADPrACekiRFomRGsmRYAEDR3AEQxAEGrkDJTB2JGmSKOkDKun+R2uAAnMQB3EAB3FABz3AAQNGkzaJkzrJk3dhAnPgBFiQBU4wBz5gAcNGlEaJlErJlIOhAnmgBm7wBmqQB0RwAbpIlVaJlVrJlY2BATFwAzQwAzIQAxkQAcmoQ2Rplmiplmz5jDQ4Vt2of6PjYvVnjfR3NZYHf9T4jevWfyYxO3CQBC5gA03ABk7YGTHQABZwA2gghRLTBCuAAiuwAj5QUdqFAwsQARIQAdiFHTewAkxABS/gAh91PRggATtQBKBJe6lWFUMQAyb1gFnhAqIJaxuhBDRwA7N2YjVgARYAGw83AzPgJoO0BhaQiWqiOF/gBSXYZnjBBVqQM4/kAjX+cE5PZRgRMAHr5HeOYQQ/EHiegQMwYG0yiG0sx1vS6I1Tw5f3l40JYZ1ZkAVYkJ/6iQW1YQT+SQQAGqAAWp9xMAdycJNwkKAJKgdbIBBHIAZjIAYSOqESOgZFsAdcMAdsUwd0MAdbIARh0AaOUTllQAQZOgd0kJqpWQRtUKAoagU7IAZr4AYgUKMgMAR25gZtYAZDkKFx8AYucAYL5AJDYJVwMAdVsANhgAZrAAJngAZpAAJBgAZ4YQZCwAVy8AZs4AJo4BhD8AJAcAZsEAdUkANg8KQg0KVuMAQo8ANCWgZXGgcR8gJokKBrgAYwUAZo8AZTsANfUAZmwJQ3yQb+aHABZnAGZRAEXBAHaEAFQWAER1AEQ8ADNyADY8AGUsADXyAGQVADunMDNzADICChigoHZyADZPCktncGqBkGaiAFPeAFYMACZSCka4EGQbABYBAGivoGp0oGOEAFVIADYkAFLBAGaSAFPtAFYKACZRCsw8qpusqrXOCrM6AFYDAGZSAGX0AFLiAGaBAFP8CsKLAFYEAGZTAGXxAEGgAGYgAE1XoGQgCqNmADNXADLiADyCoF4xoGNaBCI3ABGJABFgAC7gqvb7AGZBAGoiVaYWAGa8CvXbCwYRAGYmCxDCsGZzAGQbAHW2AYbKAGarARaoAh/IkRuzqhY0AGLJtbfB0rEFhgBVRQBTQrrDM7BbzBAz6wszzrAz3QA7URtEI7tERbtEZ7tEibtEq7tEzbtE77tFAbtVI7tVRbtVZ7tVibtVq7tVzbtV77tWAbtmI7tmRbtmYbtAEBAAA7);}"+
".tau-cmd-none {overflow:hidden;width:16px;height:16px;background:transparent no-repeat;margin:0px 1px;background-image:url(img/x.gif);}"+
".tau-cmd-up {overflow:hidden;width:16px;height:16px;cursor:pointer;background:transparent no-repeat;margin:0px 1px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEGSURBVDjLpZM/LwRRFMXPspmEaGc1shHRaiXsJ5GIRixbCr6SikxIlqgJM5UohIiGdofovHf/PZVmYwZvTntPfjnn3txWCAFNNFE33L/ZKXYv+1dRgL3r7bu0PbucJp3e4GLjtsrXGq9wkA8SU7tPk87i/MwCzAyP5QNeytcnJl46XMuoNoGKDoVlTkQhJpAgmJqcBjnqkqPTXxN8qz9cD6vdHtQMxXOBt49y5XjzLB/3tau6kWewKiwoRu8jZFvn+U++GgCBlWFBQY4qr1ANcAQxgQaFjwH4TwYrQ5skYBOYKbzjiASOwCrNd2BBwZ4jAcowGJgkAuAZ2dEJhAUqij//wn/1BesSumImTttSAAAAAElFTkSuQmCC);}"+
".tau-cmd-down {overflow:hidden;width:16px;height:16px;cursor:pointer;background:transparent no-repeat;margin:0px 1px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAENSURBVDjLpZM/SwNREMTnxBRpFYmctaKCfwrBSCrRLuL3iEW6+EEUG8XvIVjYWNgJdhFjIXamv3s7u/ssrtO7hFy2fcOPmd03SYwR88xi1cPgpRdjjDB1mBquju+TMt1CFcDd0V7q4GilAwpnd2A0qCvcHRSdHUBqAYgOyaUGIBQAc4fkNSJIIGgGj4ZQx4EEAY3waPUiSC5FhLoOQkbQCJvioPQfnN2ctpuNJugKNUWYsMR/gO71yYPk8tRaboGmoCvS1RQ7/c1sq7f+OBUQcjkPGb9+xmOoF6ckCQb9pmj3rz6pKtPB5e5rmq7tmxk+hqO34e1or0yXTGrj9sXGs1Ib73efh1WaZN46/wI8JLfHaN24FwAAAABJRU5ErkJggg==);}"+
".tau-cmd-edit {overflow:hidden;width:16px;height:16px;cursor:pointer;background:transparent no-repeat;margin:0px 1px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFUSURBVDjLrZM/SAJxGIZdWwuDlnCplkAEm1zkaIiGFFpyMIwGK5KGoK2lphDKkMDg3LLUSIJsSKhIi+684CokOtTiMizCGuzEU5K3vOEgKvtBDe/2Pc8H3x8NAM1fQlx4H9M3pcOWp6TXWmM8A7j0629v1nraiAVC0IrrwATKIgs5xyG5QiE+Z4iQdoeU2oAsnqCSO1NSTu+D9VhqRLD8nIB8F0Q2MgmJDyipCzjvYJkIfpN2UBLG8MpP4dxvQ3ZzGuyyBQ2H+AnOOCBd9aL6soh81A5hyYSGWyCFvxUcerqI4S+CvYVOFPMHxLAq8I3qdHVY5LbBhJzEsCrwutpRFBlUHy6wO2tEYtWAzLELPN2P03kjfj3luqDycV2F8AgefWbEnVqEHa2IznSD6BdsVDNStB0lfh0FPoQjdx8RrAqGzC0YprSgxzsUMOY2bf37N/6Ud1Vc9yYcH50CAAAAAElFTkSuQmCC);}"+
".tau-cmd-del {overflow:hidden;width:16px;height:16px;cursor:pointer;background:transparent no-repeat;margin:0px 1px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==);}";
GM_addStyle(aCss);

var textLinkCmd = ["Start Auto Gen. upgrade task","Stop Auto Gen. upgrade task","Add upgrade task","Add build &amp; upgrade task","Add demolish task","Add research task","Add train troop task","Add send resource task","Add send troop task"];
var textTaskType = ["Auto Up Res","Auto Up Cen","Up building","New build","Research","Up Troop","Train","Auto Trans","Transport","Buy","Offer","NPC Trade","Auto Troop","Send Troop","Demolish"];
var textResType = ["All Resources","Building","Troops","Resources"];
var textActCond = ["no","automatic","when ready","every %s","on %s"];
var textRepCond = ["no","automatic","until top level","until level %d","%s unit(s)","more %d times"];
var textTaskHead = ["Village","Type","Target","Conditon","Repeate","Next Time","Cmd"];

/******************** define calculation value ********************/
var avRace = ['Romans', 'Teutons', 'Gauls'];
var dist = [
	[4, 4, 1, 4, 4, 2, 3, 4, 4, 3, 3, 4, 4, 1, 4, 2, 1, 2], //9 crop
	[3, 4, 1, 3, 2, 2, 3, 4, 4, 3, 3, 4, 4, 1, 4, 2, 1, 2], //3-4-5-6
	[1, 4, 1, 3, 2, 2, 3, 4, 4, 3, 3, 4, 4, 1, 4, 2, 1, 2], //4-4-4-6
	[1, 4, 1, 2, 2, 2, 3, 4, 4, 3, 3, 4, 4, 1, 4, 2, 1, 2], //4-5-3-6
	[1, 4, 1, 3, 1, 2, 3, 4, 4, 3, 3, 4, 4, 1, 4, 2, 1, 2], //5-3-4-6
	[4, 4, 1, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4], //25 crop
	[1, 4, 4, 1, 2, 2, 3, 4, 4, 3, 3, 4, 4, 1, 4, 2, 1, 2], //4-4-3-7
	[3, 4, 4, 1, 2, 2, 3, 4, 4, 3, 3, 4, 4, 1, 4, 2, 1, 2], //3-4-4-7
	[3, 4, 4, 1, 1, 2, 3, 4, 4, 3, 3, 4, 4, 1, 4, 2, 1, 2], //4-3-4-7
	[3, 4, 1, 2, 2, 2, 3, 4, 4, 3, 3, 4, 4, 1, 4, 2, 1, 2], //3-5-4-6
	[3, 1, 1, 3, 1, 4, 4, 3, 3, 2, 2, 3, 1, 4, 4, 2, 4, 4], //4-3-5-6
	[1, 4, 1, 1, 2, 2, 3, 4, 4, 3, 3, 4, 4, 1, 4, 2, 1, 2]  //5-4-3-6
];
var bCost = [[0],//dummy
[//lumberCost gid = 1
[0,0,0,0,0,0],
[40,100,50,60,1,2],
[65,165,85,100,1,3],
[110,280,140,165,2,4],
[185,465,235,280,2,5],
[310,780,390,465,2,6],
[520,1300,650,780,3,8],
[870,2170,1085,1300,4,10],
[1450,3625,1810,2175,4,12],
[2420,6050,3025,3630,5,14],
[4040,10105,5050,6060,6,16],//10
[6750,16870,8435,10125,7,18],
[11270,28175,14090,16905,9,20],
[18820,47055,23525,28230,11,22],
[31430,78580,39290,47150,13,24],
[52490,131230,65615,78740,15,26],
[87660,219155,109575,131490,18,29],
[146395,365985,182995,219590,22,32],
[244480,611195,305600,366715,27,35],
[408280,1020695,510350,612420,32,38],
[681825,1704565,852280,1022740,38,41],//20
[1138650,2846620,1423310,1707970,38,44],
[1901540,4753855,2376925,2852315,38,47],
[3175575,7938935,3969470,4763360,38,50],
[5303210,13258025,6629015,7954815,38,53],
[8856360,22140900,11070450,13284540,38,56]//25
],
[//clayCost gid = 2
[0,0,0,0,0,0],
[80,40,80,50,1,2],
[135,65,135,85,1,3],
[225,110,225,140,2,4],
[375,185,375,235,2,5],
[620,310,620,390,2,6],
[1040,520,1040,650,3,8],
[1735,870,1735,1085,4,10],
[2900,1450,2900,1810,4,12],
[4840,2420,4840,3025,5,14],
[8080,4040,8080,5050,6,16],//10
[13500,6750,13500,8435,7,18],
[22540,11270,22540,14090,9,20],
[37645,18820,37645,23525,11,22],
[62865,31430,62865,39290,13,24],
[104985,52490,104985,65615,15,26],
[175320,87660,175320,109575,18,29],
[292790,146395,292790,182995,22,32],
[488955,244480,488955,305600,27,35],
[816555,408280,816555,510350,32,38],
[1363650,681825,1363650,852280,38,41],//20
[2277295,1138650,2277295,1423310,38,44],
[3803085,1901540,3803085,2376925,38,47],
[6351150,3175575,6351150,3969470,38,50],
[10606420,5303210,10606420,6629015,38,53],
[17712720,8856360,17712720,11070450,38,56]//25
],
[//ironCost gid = 3
[0,0,0,0,0,0],
[100,80,30,60,1,3],
[165,135,50,100,1,5],
[280,225,85,165,2,7],
[465,375,140,280,2,9],
[780,620,235,465,2,11],
[1300,1040,390,780,3,13],
[2170,1735,650,1300,4,15],
[3625,2900,1085,2175,4,17],
[6050,4840,1815,3630,5,19],
[10105,8080,3030,6060,6,21],//10
[16870,13500,5060,10125,7,24],
[28175,22540,8455,16905,9,27],
[47055,37645,14115,28230,11,30],
[78580,62865,23575,47150,13,33],
[131230,104985,39370,78740,15,36],
[219155,175320,65745,131490,18,39],
[365985,292790,109795,219590,22,42],
[611195,488955,183360,366715,27,45],
[1020695,816555,306210,612420,32,48],
[1704565,1363650,511370,1022740,38,51],//20
[2846620,2277295,853985,1707970,38,54],
[4753855,3803085,1426155,2852315,38,57],
[7938935,6351150,2381680,4763360,38,60],
[13258025,10606420,3977410,7954815,38,63],
[22140900,17712720,6642270,13284540,38,66]//25
],
[//cropCost gid = 4
[0,0,0,0,0,0],
[70,90,70,20,1,0],
[115,150,115,35,1,0],
[195,250,195,55,2,0],
[325,420,325,95,2,0],
[545,700,545,155,2,0],
[910,1170,910,260,3,1],
[1520,1950,1520,435,4,2],
[2535,3260,2535,725,4,3],
[4235,5445,4235,1210,5,4],
[7070,9095,7070,2020,6,5],//10
[11810,15185,11810,3375,7,6],
[19725,25360,19725,5635,9,7],
[32940,42350,32940,9410,11,8],
[55005,70720,55005,15715,13,9],
[91860,118105,91860,26245,15,10],
[153405,197240,153405,43830,18,12],
[256190,329385,256190,73195,22,14],
[427835,550075,427835,122240,27,16],
[714485,918625,714485,204140,32,18],
[1193195,1534105,1193195,340915,38,20],//20
[1992635,2561960,1992635,569325,38,22],
[3327700,4278470,3327700,950770,38,24],
[5557255,7145045,5557255,1587785,38,26],
[9280620,11932225,9280620,2651605,38,28],
[15498630,19926810,15498630,4428180,38,30]//25
],
[//sawmillCost gid = 5
[0,0,0,0,0,0],
[520,380,290,90,1,4],
[935,685,520,160,1,6],
[1685,1230,940,290,2,8],
[3035,2215,1690,525,2,10],
[5460,3990,3045,945,2,12]
],
[//brickyardCost gid = 6
[0,0,0,0,0,0],
[440,480,320,50,1,3],
[790,865,575,90,1,5],
[1425,1555,1035,160,2,7],
[2565,2800,1865,290,2,9],
[4620,5040,3360,525,2,11]
],
[//ironFoundryCost gid = 7
[0,0,0,0,0,0],
[200,450,510,120,1,6],
[360,810,920,215,1,9],
[650,1460,1650,390,2,12],
[1165,2625,2975,700,2,15],
[2100,4725,5355,1260,2,18]
],
[//grainMillCost gid = 8
[0,0,0,0,0,0],
[500,440,380,1240,1,3],
[900,790,685,2230,1,5],
[1620,1425,1230,4020,2,7],
[2915,2565,2215,7230,2,9],
[5250,4620,3990,13015,2,11]
],
[//bakeryCost gid = 9
[0,0,0,0,0,0],
[1200,1480,870,1600,1,4],
[2160,2665,1565,2880,1,6],
[3890,4795,2820,5185,2,8],
[7000,8630,5075,9330,2,10],
[12595,15535,9135,16795,2,12]
],
[//warehouseCost gid = 10
[0,0,0,0,0,0],
[130,160,90,40,1,1],
[165,205,115,50,1,2],
[215,260,145,65,2,3],
[275,335,190,85,2,4],
[350,430,240,105,2,5],
[445,550,310,135,3,6],
[570,705,395,175,4,7],
[730,900,505,225,4,8],
[935,1155,650,290,5,9],
[1200,1475,830,370,6,10],//10
[1535,1890,1065,470,7,12],
[1965,2420,1360,605,9,14],
[2515,3095,1740,775,11,16],
[3220,3960,2230,990,13,18],
[4120,5070,2850,1270,15,20],
[5275,6490,3650,1625,18,22],
[6750,8310,4675,2075,22,24],
[8640,10635,5980,2660,27,26],
[11060,13610,7655,3405,32,28],
[14155,17420,9800,4355,38,30]//20
],
[//granaryCost gid = 11
[0,0,0,0,0,0],
[80,100,70,20,1,1],
[100,130,90,25,1,2],
[130,165,115,35,2,3],
[170,210,145,40,2,4],
[215,270,190,55,2,5],
[275,345,240,70,3,6],
[350,440,310,90,4,7],
[450,565,395,115,4,8],
[575,720,505,145,5,9],
[740,920,645,185,6,10],//10
[945,1180,825,235,7,12],
[1210,1510,1060,300,9,14],
[1545,1935,1355,385,11,16],
[1980,2475,1735,495,13,18],
[2535,3170,2220,635,15,20],
[3245,4055,2840,810,18,22],
[4155,5190,3635,1040,22,24],
[5315,6645,4650,1330,27,26],
[6805,8505,5955,1700,32,28],
[8710,10890,7620,2180,38,30]//20
],
[//blacksmithCost gid = 12
[0,0,0,0,0,0],
[170,200,380,130,2,4],
[220,255,485,165,3,6],
[280,330,625,215,3,8],
[355,420,795,275,4,10],
[455,535,1020,350,5,12],
[585,685,1305,445,6,15],
[750,880,1670,570,7,18],
[955,1125,2140,730,9,21],
[1225,1440,2740,935,10,24],
[1570,1845,3505,1200,12,27],//10
[2005,2360,4485,1535,15,30],
[2570,3020,5740,1965,18,33],
[3290,3870,7350,2515,21,36],
[4210,4950,9410,3220,26,39],
[5390,6340,12045,4120,31,42],
[6895,8115,15415,5275,37,46],
[8825,10385,19730,6750,44,50],
[11300,13290,25255,8640,53,54],
[14460,17015,32325,11060,64,58],
[18510,21780,41380,14155,77,62]//20
],
[//armouryCost gid = 13
[0,0,0,0,0,0],
[130,210,410,130,2,4],
[165,270,525,165,3,6],
[215,345,670,215,3,8],
[275,440,860,275,4,10],
[350,565,1100,350,5,12],
[445,720,1410,445,6,15],
[570,925,1805,570,7,18],
[730,1180,2310,730,9,21],
[935,1515,2955,935,10,24],
[1200,1935,3780,1200,12,27],//10
[1535,2480,4840,1535,15,30],
[1965,3175,6195,1965,18,33],
[2515,4060,7930,2515,21,36],
[3220,5200,10150,3220,26,39],
[4120,6655,12995,4120,31,42],
[5275,8520,16630,5275,37,46],
[6750,10905,21290,6750,44,50],
[8640,13955,27250,8640,53,54],
[11060,17865,34880,11060,64,58],
[14155,22865,44645,14155,77,62]//20
],
[//tournamentSquareCost gid = 14
[0,0,0,0,0,0],
[1750,2250,1530,240,1,1],
[2240,2880,1960,305,1,2],
[2865,3685,2505,395,2,3],
[3670,4720,3210,505,2,4],
[4700,6040,4105,645,2,5],
[6015,7730,5255,825,3,6],
[7695,9895,6730,1055,4,7],
[9850,12665,8615,1350,4,8],
[12610,16215,11025,1730,5,9],
[16140,20755,14110,2215,6,10],//10
[20660,26565,18065,2835,7,12],
[26445,34000,23120,3625,9,14],
[33850,43520,29595,4640,11,16],
[43330,55705,37880,5940,13,18],
[55460,71305,48490,7605,15,20],
[70990,91270,62065,9735,18,22],
[90865,116825,79440,12460,22,24],
[116305,149540,101685,15950,27,26],
[148875,191410,130160,20415,32,28],
[190560,245005,166600,26135,38,30]//20
],
[//mainBuildingCost gid = 15
[0,0,0,0,0,0],
[70,40,60,20,2,2],
[90,50,75,25,3,3],
[115,65,100,35,3,4],
[145,85,125,40,4,5],
[190,105,160,55,5,6],
[240,135,205,70,6,8],
[310,175,265,90,7,10],
[395,225,340,115,9,12],
[505,290,430,145,10,14],
[645,370,555,185,12,16],//10
[825,470,710,235,15,18],
[1060,605,905,300,18,20],
[1355,775,1160,385,21,22],
[1735,990,1485,495,26,24],
[2220,1270,1900,635,31,26],
[2840,1625,2435,810,37,29],
[3635,2075,3115,1040,44,32],
[4650,2660,3990,1330,53,35],
[5955,3405,5105,1700,64,38],
[7620,4355,6535,2180,77,41]//20
],
[//rallyPointCost gid = 16
[0,0,0,0,0,0],
[110,160,90,70,1,1],
[140,205,115,90,1,2],
[180,260,145,115,2,3],
[230,335,190,145,2,4],
[295,430,240,190,2,5],
[380,550,310,240,3,6],
[485,705,395,310,4,7],
[620,900,505,395,4,8],
[795,1155,650,505,5,9],
[1015,1475,830,645,6,10],//10
[1300,1890,1065,825,7,12],
[1660,2420,1360,1060,9,14],
[2130,3095,1740,1355,11,16],
[2725,3960,2230,1735,13,18],
[3485,5070,2850,2220,15,20],
[4460,6490,3650,2840,18,22],
[5710,8310,4675,3635,22,24],
[7310,10635,5980,4650,27,26],
[9360,13610,7655,5955,32,28],
[11980,17420,9800,7620,38,30]//20
],
[//marketplaceCost gid = 17
[0,0,0,0,0,0],
[80,70,120,70,4,4],
[100,90,155,90,4,6],
[130,115,195,115,5,8],
[170,145,250,145,6,10],
[215,190,320,190,7,12],
[275,240,410,240,9,15],
[350,310,530,310,11,18],
[450,395,675,395,13,21],
[575,505,865,505,15,24],
[740,645,1105,645,19,27],//10
[945,825,1415,825,22,30],
[1210,1060,1815,1060,27,33],
[1545,1355,2320,1355,32,38],
[1980,1735,2970,1735,39,41],
[2535,2220,3805,2220,46,44],
[3245,2840,4870,2840,55,48],
[4155,3635,6230,3635,67,52],
[5315,4650,7975,4650,80,56],
[6805,5955,10210,5955,96,60],
[8710,7620,13065,7620,115,64]//20
],
[//embassyCost gid = 18
[0,0,0,0,0,0],
[180,130,150,80,5,3],
[230,165,190,100,6,5],
[295,215,245,130,7,7],
[375,275,315,170,8,9],
[485,350,405,215,10,11],
[620,445,515,275,12,13],
[790,570,660,350,14,15],
[1015,730,845,450,17,17],
[1295,935,1080,575,21,19],
[1660,1200,1385,740,25,21],//10
[2125,1535,1770,945,30,24],
[2720,1965,2265,1210,36,27],
[3480,2515,2900,1545,43,30],
[4455,3220,3715,1980,51,33],
[5705,4120,4755,2535,62,36],
[7300,5275,6085,3245,74,39],
[9345,6750,7790,4155,89,42],
[11965,8640,9970,5315,106,45],
[15315,11060,12760,6805,128,48],
[19600,14155,16335,8710,153,51]//20
],
[//barracksCost gid = 19
[0,0,0,0,0,0],
[210,140,260,120,1,4],
[270,180,335,155,1,6],
[345,230,425,195,2,8],
[440,295,545,250,2,10],
[565,375,700,320,2,12],
[720,480,895,410,3,15],
[925,615,1145,530,4,18],
[1180,790,1465,675,4,21],
[1515,1010,1875,865,5,24],
[1935,1290,2400,1105,6,27],//10
[2480,1655,3070,1415,7,30],
[3175,2115,3930,1815,9,33],
[4060,2710,5030,2320,11,36],
[5200,3465,6435,2970,13,39],
[6655,4435,8240,3805,15,42],
[8520,5680,10545,4870,18,46],
[10905,7270,13500,6230,22,50],
[13955,9305,17280,7975,27,54],
[17865,11910,22120,10210,32,58],
[22865,15245,28310,13065,38,62]//20
],
[//stableCost gid = 20
[0,0,0,0,0,0],
[260,140,220,100,2,5],
[335,180,280,130,3,8],
[425,230,360,165,3,11],
[545,295,460,210,4,14],
[700,375,590,270,5,17],
[895,480,755,345,6,20],
[1145,615,970,440,7,23],
[1465,790,1240,565,9,26],
[1875,1010,1585,720,10,29],
[2400,1290,2030,920,12,32],//10
[3070,1655,2595,1180,15,36],
[3930,2115,3325,1510,18,40],
[5030,2710,4255,1935,21,44],
[6435,3465,5445,2475,26,48],
[8240,4435,6970,3170,31,52],
[10545,5680,8925,4055,37,56],
[13500,7270,11425,5190,44,60],
[17280,9305,14620,6645,53,64],
[22120,11910,18715,8505,64,68],
[28310,15245,23955,10890,77,72]//20
],
[//workshopCost gid = 21
[0,0,0,0,0,0],
[460,510,600,320,4,3],
[590,655,770,410,4,5],
[755,835,985,525,5,7],
[965,1070,1260,670,6,9],
[1235,1370,1610,860,7,11],
[1580,1750,2060,1100,9,13],
[2025,2245,2640,1405,11,15],
[2590,2870,3380,1800,13,17],
[3315,3675,4325,2305,15,19],
[4245,4705,5535,2950,19,21],//10
[5430,6020,7085,3780,22,24],
[6950,7705,9065,4835,27,27],
[8900,9865,11605,6190,32,30],
[11390,12625,14855,7925,39,33],
[14580,16165,19015,10140,46,36],
[18660,20690,24340,12980,55,39],
[23885,26480,31155,16615,67,42],
[30570,33895,39875,21270,80,45],
[39130,43385,51040,27225,96,48],
[50090,55535,65335,34845,115,51]//20
],
[//academyCost gid = 22
[0,0,0,0,0,0],
[220,160,90,40,5,4],
[280,205,115,50,6,6],
[360,260,145,65,7,8],
[460,335,190,85,8,10],
[590,430,240,105,10,12],
[755,550,310,135,12,15],
[970,705,395,175,14,18],
[1240,900,505,225,17,21],
[1585,1155,650,290,21,24],
[2030,1475,830,370,25,27],//10
[2595,1890,1065,470,30,30],
[3325,2420,1360,605,36,33],
[4255,3095,1740,775,43,36],
[5445,3960,2230,990,51,39],
[6970,5070,2850,1270,62,42],
[8925,6490,3650,1625,74,46],
[11425,8310,4675,2075,89,50],
[14620,10635,5980,2660,106,54],
[18715,13610,7655,3405,128,58],
[23955,17420,9800,4355,153,62]//20
],
[//crannyCost gid = 23
[0,0,0,0,0,0],
[40,50,30,10,1,0],
[50,65,40,15,1,0],
[65,80,50,15,2,0],
[85,105,65,20,2,0],
[105,135,80,25,2,0],
[135,170,105,35,3,1],
[175,220,130,45,4,2],
[225,280,170,55,4,3],
[290,360,215,70,5,4],
[370,460,275,90,6,5]//10
],
[//townhallCost gid = 24
[0,0,0,0,0,0],
[1250,1110,1260,600,6,4],
[1600,1420,1615,770,7,6],
[2050,1820,2065,985,9,8],
[2620,2330,2640,1260,10,10],
[3355,2980,3380,1610,12,12],
[4295,3815,4330,2060,15,15],
[5500,4880,5540,2640,18,18],
[7035,6250,7095,3380,21,21],
[9005,8000,9080,4325,26,24],
[11530,10240,11620,5535,31,27],//10
[14755,13105,14875,7085,37,30],
[18890,16775,19040,9065,45,33],
[24180,21470,24370,11605,53,36],
[30950,27480,31195,14855,64,39],
[39615,35175,39930,19015,77,42],
[50705,45025,51110,24340,92,46],
[64905,57635,65425,31155,111,50],
[83075,73770,83740,39875,133,54],
[106340,94430,107190,51040,160,58],
[136115,120870,137200,65335,192,62]//20
],
[//residenceCost gid = 25
[0,0,0,0,0,0],
[580,460,350,180,2,1],
[740,590,450,230,3,2],
[950,755,575,295,3,3],
[1215,965,735,375,4,4],
[1555,1235,940,485,5,5],
[1995,1580,1205,620,6,6],
[2550,2025,1540,790,7,7],
[3265,2590,1970,1015,9,8],
[4180,3315,2520,1295,11,9],
[5350,4245,3230,1660,12,10],//10
[6845,5430,4130,2125,15,12],
[8765,6950,5290,2720,18,14],
[11220,8900,6770,3480,21,16],
[14360,11390,8665,4455,26,18],
[18380,14580,11090,5705,31,20],
[23530,18660,14200,7300,37,22],
[30115,23885,18175,9345,44,24],
[38550,30570,23260,11965,53,26],
[49340,39130,29775,15315,64,28],
[63155,50090,38110,19600,77,30]//20
],
[//palaceCost gid = 26
[0,0,0,0,0,0],
[550,800,750,250,6,1],
[705,1025,960,320,7,2],
[900,1310,1230,410,9,3],
[1155,1680,1575,525,10,4],
[1475,2145,2015,670,12,5],
[1890,2750,2575,860,15,6],
[2420,3520,3300,1100,18,7],
[3095,4505,4220,1405,21,8],
[3965,5765,5405,1800,26,9],
[5075,7380,6920,2305,31,10],//10
[6495,9445,8855,2950,37,12],
[8310,12090,11335,3780,45,14],
[10640,15475,14505,4835,53,16],
[13615,19805,18570,6190,64,18],
[17430,25355,23770,7925,77,20],
[22310,32450,30425,10140,92,22],
[28560,41540,38940,12980,111,24],
[36555,53170,49845,16615,133,26],
[46790,68055,63805,21270,160,28],
[59890,87110,81670,27225,192,30]//20
],
[//treasuryCost gid = 27
[0,0,0,0,0,0],
[2880,2740,2580,990,7,4],
[3630,3450,3250,1245,9,6],
[4570,4350,4095,1570,10,8],
[5760,5480,5160,1980,12,10],
[7260,6905,6505,2495,15,12],
[9145,8700,8195,3145,18,15],
[11525,10965,10325,3960,21,18],
[14520,13815,13010,4990,26,21],
[18295,17405,16390,6290,31,24],
[23055,21930,20650,7925,37,27],//10
[29045,27635,26020,9985,45,30],
[36600,34820,32785,12580,53,33],
[46115,43875,41310,15850,64,36],
[58105,55280,52050,19975,77,39],
[73210,69655,65585,25165,92,42],
[92245,87760,82640,31710,111,46],
[116230,110580,104125,39955,133,50],
[146450,139330,131195,50340,160,54],
[184530,175560,165305,63430,192,58],
[232505,221205,208285,79925,230,62]//20
],
[//tradeOfficeCost gid = 28
[0,0,0,0,0,0],
[1400,1330,1200,400,4,3],
[1790,1700,1535,510,4,5],
[2295,2180,1965,655,5,7],
[2935,2790,2515,840,6,9],
[3760,3570,3220,1075,7,11],
[4810,4570,4125,1375,9,13],
[6155,5850,5280,1760,11,15],
[7880,7485,6755,2250,13,17],
[10090,9585,8645,2880,15,19],
[12915,12265,11070,3690,19,21],//10
[16530,15700,14165,4720,22,24],
[21155,20100,18135,6045,27,27],
[27080,25725,23210,7735,32,30],
[34660,32930,29710,9905,39,33],
[44370,42150,38030,12675,46,36],
[56790,53950,48680,16225,55,39],
[72690,69060,62310,20770,67,42],
[93045,88395,79755,26585,80,45],
[119100,113145,102085,34030,96,48],
[152445,144825,130670,43555,115,51]//20
],
[//greatBarrackCost gid = 29
[0,0,0,0,0,0],
[630,420,780,360,1,4],
[805,540,1000,460,1,6],
[1030,690,1280,590,2,8],
[1320,880,1635,755,2,10],
[1690,1125,2095,965,2,12],
[2165,1445,2680,1235,3,15],
[2770,1845,3430,1585,4,18],
[3545,2365,4390,2025,4,21],
[4540,3025,5620,2595,5,24],
[5810,3875,7195,3320,6,27],//10
[7440,4960,9210,4250,7,30],
[9520,6345,11785,5440,9,33],
[12185,8125,15085,6965,11,36],
[15600,10400,19310,8915,13,39],
[19965,13310,24720,11410,15,42],
[25555,17035,31640,14605,18,46],
[32710,21810,40500,18690,22,50],
[41870,27915,51840,23925,27,54],
[53595,35730,66355,30625,32,58],
[68600,45735,84935,39200,38,62]//20
],
[//greatStableCost gid = 30
[0,0,0,0,0,0],
[780,420,660,300,2,5],
[1000,540,845,385,3,8],
[1280,690,1080,490,3,11],
[1635,880,1385,630,4,14],
[2095,1125,1770,805,5,17],
[2680,1445,2270,1030,6,20],
[3430,1845,2905,1320,7,23],
[4390,2365,3715,1690,9,26],
[5620,3025,4755,2160,10,29],
[7195,3875,6085,2765,12,32],//10
[9210,4960,7790,3540,15,36],
[11785,6345,9975,4535,18,40],
[15085,8125,12765,5805,21,44],
[19310,10400,16340,7430,26,48],
[24720,13310,20915,9505,31,52],
[31640,17035,26775,12170,37,56],
[40500,21810,34270,15575,44,60],
[51840,27915,43865,19940,53,64],
[66355,35730,56145,25520,64,68],
[84935,45735,71870,32665,77,72]//20
],
[//citywallCost gid = 31
[0,0,0,0,0,0],
[70,90,170,70,1,0],
[90,115,220,90,1,0],
[115,145,280,115,2,0],
[145,190,355,145,2,0],
[190,240,455,190,2,0],
[240,310,585,240,3,1],
[310,395,750,310,4,2],
[395,505,955,395,4,3],
[505,650,1225,505,5,4],
[645,830,1570,645,6,5],//10
[825,1065,2005,825,7,6],
[1060,1360,2570,1060,9,7],
[1355,1740,3290,1355,11,8],
[1735,2230,4210,1735,13,9],
[2220,2850,5390,2220,15,10],
[2840,3650,6895,2840,18,12],
[3635,4675,8825,3635,22,14],
[4650,5980,11300,4650,27,16],
[5955,7655,14460,5955,32,18],
[7620,9800,18510,7620,38,20]//20
],
[//earthwallCost gid = 32
[0,0,0,0,0,0],
[120,200,0,80,1,0],
[155,255,0,100,1,0],
[195,330,0,130,2,0],
[250,420,0,170,2,0],
[320,535,0,215,2,0],
[410,685,0,275,3,1],
[530,880,0,350,4,2],
[675,1125,0,450,4,3],
[865,1440,0,575,5,4],
[1105,1845,0,740,6,5],//10
[1415,2360,0,945,7,6],
[1815,3020,0,1210,9,7],
[2320,3870,0,1545,11,8],
[2970,4950,0,1980,13,9],
[3805,6340,0,2535,15,10],
[4870,8115,0,3245,18,12],
[6230,10385,0,4155,22,14],
[7975,13290,0,5315,27,16],
[10210,17015,0,6805,32,18],
[13065,21780,0,8710,38,20]//20
],
[//palisadeCost gid = 33
[0,0,0,0,0,0],
[160,100,80,60,1,0],
[205,130,100,75,1,0],
[260,165,130,100,2,0],
[335,210,170,125,2,0],
[430,270,215,160,2,0],
[550,345,275,205,3,1],
[705,440,350,265,4,2],
[900,565,450,340,4,3],
[1155,720,575,430,5,4],
[1475,920,740,555,6,5],//10
[1890,1180,945,710,7,6],
[2420,1510,1210,905,9,7],
[3095,1935,1545,1160,11,8],
[3960,2475,1980,1485,13,9],
[5070,3170,2535,1900,15,10],
[6490,4055,3245,2435,18,12],
[8310,5190,4155,3115,22,14],
[10635,6645,5315,3990,27,16],
[13610,8505,6805,5105,32,18],
[17420,10890,8710,6535,38,20]//20
],
[//stonemasonCost gid = 34
[0,0,0,0,0,0],
[155,130,125,70,1,2],
[200,165,160,90,1,3],
[255,215,205,115,2,4],
[325,275,260,145,2,5],
[415,350,335,190,2,6],
[535,445,430,240,3,8],
[680,570,550,310,4,10],
[875,730,705,395,4,12],
[1115,935,900,505,5,14],
[1430,1200,1155,645,6,16],//10
[1830,1535,1475,825,7,18],
[2340,1965,1890,1060,9,20],
[3000,2515,2420,1355,11,22],
[3840,3220,3095,1735,13,24],
[4910,4120,3960,2220,15,26],
[6290,5275,5070,2840,18,29],
[8050,6750,6490,3635,22,32],
[10300,8640,8310,4650,27,35],
[13185,11060,10635,5955,32,38],
[16880,14155,13610,7620,38,41]//20
],
[//breweryCost gid = 35
[0,0,0,0,0,0],
[1460,930,1250,1740,5,6],
[2045,1300,1750,2435,6,9],
[2860,1825,2450,3410,7,12],
[4005,2550,3430,4775,8,15],
[5610,3575,4800,6685,10,18],
[7850,5000,6725,9360,12,22],
[10995,7000,9410,13100,14,26],
[15390,9805,13175,18340,17,30],
[21545,13725,18445,25680,21,34],
[30165,19215,25825,35950,25,38]//10
],
[//trapperCost gid = 36
[0,0,0,0,0,0],
[100,100,100,100,1,4],
[130,130,130,130,1,6],
[165,165,165,165,2,8],
[210,210,210,210,2,10],
[270,270,270,270,2,12],
[345,345,345,345,3,15],
[440,440,440,440,4,18],
[565,565,565,565,4,21],
[720,720,720,720,5,24],
[920,920,920,920,6,27],//10
[1180,1180,1180,1180,7,30],
[1510,1510,1510,1510,9,33],
[1935,1935,1935,1935,11,36],
[2475,2475,2475,2475,13,39],
[3170,3170,3170,3170,15,42],
[4055,4055,4055,4055,18,46],
[5190,5190,5190,5190,22,50],
[6645,6645,6645,6645,27,54],
[8505,8505,8505,8505,32,58],
[10890,10890,10890,10890,38,62]//20
],
[//herosMansionCost gid = 37
[0,0,0,0,0,0],
[700,670,700,240,1,2],
[930,890,930,320,1,3],
[1240,1185,1240,425,2,4],
[1645,1575,1645,565,2,5],
[2190,2095,2190,750,2,6],
[2915,2790,2915,1000,3,8],
[3875,3710,3875,1330,4,10],
[5155,4930,5155,1765,4,12],
[6855,6560,6855,2350,5,14],
[9115,8725,9115,3125,6,16],//10
[12125,11605,12125,4155,7,18],
[16125,15435,16125,5530,9,20],
[21445,20525,21445,7350,11,22],
[28520,27300,28520,9780,13,24],
[37935,36310,37935,13005,15,24],
[50450,48290,50450,17300,18,27],
[67100,64225,67100,23005,22,30],
[89245,85420,89245,30600,27,33],
[118695,113605,118695,40695,32,36],
[157865,151095,157865,54125,37,39]//20
],
[//greatWarehouseCost gid = 38
[0,0,0,0,0,0,0],
[650,800,450,200,1,1],
[830,1025,575,255,1,2],
[1065,1310,735,330,2,3],
[1365,1680,945,420,2,4],
[1745,2145,1210,535,2,5],
[2235,2750,1545,685,3,6],
[2860,3520,1980,880,4,7],
[3660,4505,2535,1125,4,8],
[4685,5765,3245,1440,5,9],
[5995,7380,4150,1845,6,10],//10
[7675,9445,5315,2360,7,12],
[9825,12090,6800,3020,9,14],
[12575,15475,8705,3870,11,16],
[16095,19805,11140,4950,13,18],
[20600,25355,14260,6340,15,20],
[26365,32450,18255,8115,18,22],
[33750,41540,23365,10385,22,24],
[43200,53170,29910,13290,27,26],
[55295,68055,38280,17015,32,28],
[70780,87110,49000,21780,38,30]//20
],
[//greatGranaryCost gid = 39
[0,0,0,0,0,0],
[400,500,350,100,1],
[510,640,450,130,1,2],
[655,820,575,165,2,3],
[840,1050,735,210,2,4],
[1075,1340,940,270,2,5],
[1375,1720,1205,345,3,6],
[1760,2200,1540,440,4,7],
[2250,2815,1970,565,4,8],
[2880,3605,2520,720,5,9],
[3690,4610,3230,920,6,10],//10
[4720,5905,4130,1180,7,12],
[6045,7555,5290,1510,9,14],
[7735,9670,6770,1935,11,16],
[9905,12380,8665,2475,13,18],
[12675,15845,11090,3170,15,20],
[16225,20280,14200,4055,18,22],
[20770,25960,18175,5190,22,24],
[26585,33230,23260,6645,27,26],
[34030,42535,29775,8505,32,28],
[43555,54445,38110,10890,38,30]//20
],
[//WWCost gid = 40
[0,0,0,0,0,0],
[66700,69050,72200,13200,0,1],
[68535,70950,74185,13565,0,2],
[70420,72900,76225,13935,0,3],
[72355,74905,78320,14320,0,4],
[74345,76965,80475,14715,0,5],
[76390,79080,82690,15120,0,6],
[78490,81255,84965,15535,0,7],
[80650,83490,87300,15960,0,8],
[82865,85785,89700,16400,0,9],
[85145,88145,92165,16850,0,10],//10
[87485,90570,94700,17315,0,12],
[89895,93060,97305,17790,0,14],
[92365,95620,99980,18280,0,16],
[94905,98250,102730,18780,0,18],
[97515,100950,105555,19300,0,20],
[100195,103725,108460,19830,0,22],
[102950,106580,111440,20375,0,24],
[105785,109510,114505,20935,0,26],
[108690,112520,117655,21510,0,28],
[111680,115615,120890,22100,0,30],//20
[114755,118795,124215,22710,0,33],
[117910,122060,127630,23335,0,36],
[121150,125420,131140,23975,0,39],
[124480,128870,134745,24635,0,42],
[127905,132410,138455,25315,0,45],
[131425,136055,142260,26010,0,48],
[135035,139795,146170,26725,0,51],
[138750,143640,150190,27460,0,54],
[142565,147590,154320,28215,0,57],
[146485,151650,158565,28990,0,60],//30
[150515,155820,162925,29785,0,64],
[154655,160105,167405,30605,0,68],
[158910,164505,172010,31450,0,72],
[163275,169030,176740,32315,0,76],
[167770,173680,181600,33200,0,80],
[172380,178455,186595,34115,0,84],
[177120,183360,191725,35055,0,88],
[181995,188405,197000,36015,0,92],
[186995,193585,202415,37005,0,96],
[192140,198910,207985,38025,0,100],//40
[197425,204380,213705,39070,0,105],
[202855,210000,219580,40145,0,110],
[208430,215775,225620,41250,0,115],
[214165,221710,231825,42385,0,120],
[220055,227805,238200,43550,0,125],
[226105,234070,244750,44745,0,130],
[232320,240505,251480,45975,0,135],
[238710,247120,258395,47240,0,140],
[245275,253915,265500,48540,0,145],
[252020,260900,272800,49875,0,150],//50
[258950,268075,280305,51245,0,156],
[266070,275445,288010,52655,0,162],
[273390,283020,295930,54105,0,168],
[280905,290805,304070,55590,0,174],
[288630,298800,312430,57120,0,180],
[296570,307020,321025,58690,0,186],
[304725,315460,329850,60305,0,192],
[313105,324135,338925,61965,0,198],
[321715,333050,348245,63670,0,204],
[330565,342210,357820,65420,0,210],//60
[339655,351620,367660,67220,0,217],
[348995,361290,377770,69065,0,224],
[358590,371225,388160,70965,0,231],
[368450,381435,398835,72915,0,238],
[378585,391925,409800,74920,0,245],
[388995,402700,421070,76985,0,252],
[399695,413775,432650,79100,0,259],
[410685,425155,444550,81275,0,266],
[421980,436845,456775,83510,0,273],
[433585,448860,469335,85805,0,280],//70
[445505,461205,482240,88165,0,288],
[457760,473885,495505,90590,0,296],
[470345,486920,509130,93080,0,304],
[483280,500310,523130,95640,0,312],
[496570,514065,537520,98270,0,320],
[510225,528205,552300,100975,0,328],
[524260,542730,567490,103750,0,336],
[538675,557655,583095,106605,0,344],
[553490,572990,599130,109535,0,352],
[568710,588745,615605,112550,0,360],//80
[584350,604935,632535,115645,0,369],
[600420,621575,649930,118825,0,378],
[616930,638665,667800,122090,0,387],
[633895,656230,686165,125450,0,396],
[651330,674275,705035,128900,0,405],
[669240,692820,724425,132445,0,414],
[687645,711870,744345,136085,0,423],
[706555,731445,764815,139830,0,432],
[725985,751560,785850,143675,0,441],
[745950,772230,807460,147625,0,450],//90
[766460,793465,829665,151685,0,460],
[787540,815285,852480,155855,0,470],
[809195,837705,875920,160140,0,480],
[831450,860745,900010,164545,0,490],
[854315,884415,924760,169070,0,500],
[877810,908735,950190,173720,0,510],
[901950,933725,976320,178495,0,520],
[926750,959405,1000000,183405,0,530],
[952235,985785,1000000,188450,0,540],
[1000000,1000000,1000000,193630,0,550]//100
],
[//horsedtCost gid = 41
[0,0,0,0,0,0],
[780,420,660,540,4,5],
[1000,540,845,690,4,8],
[1280,690,1080,885,5,11],
[1635,880,1385,1130,6,14],
[2095,1125,1770,1450,7,17],
[2680,1445,2270,1855,9,20],
[3430,1845,2905,2375,11,23],
[4390,2365,3715,3040,13,26],
[5620,3025,4755,3890,15,29],
[7195,3875,6085,4980,19,31],//10
[9210,4960,7790,6375,22,35],
[11785,6345,9975,8160,27,39],
[15085,8125,12765,10445,32,43],
[19310,10400,16340,13370,39,47],
[24720,13310,20915,17115,46,51],
[31640,17035,26775,21905,55,55],
[40500,21810,34270,28040,67,59],
[51840,27915,43865,35890,80,63],
[66355,35730,56145,45940,96,67],
[84935,45735,71870,58800,115,71]//20
]
];

//Training cost for each unit (4), load capacity (1), attack power (1), def power infantery (1), def power cavalery (1), speed (1) - for normal servers, crop consumption(1)
var uc = new Array();
//Romans
uc[1] = [120,100,150,30,50,40,35,50,6,1];//Legionnaire
uc[2] = [100,130,160,70,20,30,65,35,5,1];//Praetorian
uc[3] = [150,160,210,80,50,70,40,25,7,1];//Imperian
uc[4] = [140,160,20,40,0,0,20,10,16,2];//Equites legati
uc[5] = [550,440,320,100,100,120,65,50,14,3];//Equites imperatoris
uc[6] = [550,640,800,180,70,180,80,105,10,4];//Equites cesaris
uc[7] = [900,360,500,70,0,60,30,75,4,3];//Battering ram
uc[8] = [950,1350,600,90,0,75,60,10,3,6];//Fire catapult
uc[9] = [30750,27200,45000,37500,0,50,40,30,4,5];//Senator
uc[10] = [5800,5300,7200,5500,3000,0,80,80,5,1];//Settler
//Teutons
uc[11] = [95,75,40,40,60,40,20,5,7,1];//Club swinger
uc[12] = [145,70,85,40,40,10,35,60,7,1];//Spearman
uc[13] = [130,120,170,70,50,60,30,30,6,1];//Axeman
uc[14] = [160,100,50,50,0,0,10,5,9,1];//Scout
uc[15] = [370,270,290,75,110,55,100,40,10,2];//Paladin
uc[16] = [450,515,480,80,80,150,50,75,9,3];//Teutonic knight
uc[17] = [1000,300,350,70,0,65,30,80,4,3];//Ram
uc[18] = [900,1200,600,60,0,50,60,10,3,6];//Catapult
uc[19] = [35500,26600,25000,27200,0,40,60,40,4,4];//Chief
uc[20] = [7200,5500,5800,6500,3000,10,80,80,5,1];//Settler
//Gauls
uc[21] = [100,130,55,30,35,15,40,50,7,1];//Phalanx
uc[22] = [140,150,185,60,45,65,35,20,6,1];//Swordsman
uc[23] = [170,150,20,40,0,0,20,10,17,2];//Pathfinder
uc[24] = [350,450,230,60,75,90,25,40,19,2];//Theutates thunder
uc[25] = [360,330,280,120,35,45,115,55,16,2];//Druidrider
uc[26] = [500,620,675,170,65,140,50,165,13,3];//Haeduan
uc[27] = [950,555,330,75,0,50,30,105,4,3];//Ram
uc[28] = [960,1450,630,90,0,70,45,10,3,6];//Trebuchet
uc[29] = [30750,45400,31000,37500,0,40,50,50,5,4];//Chieftain
uc[30] = [5500,7000,5300,4900,3000,0,80,80,5,1];//Settler
//Nature
uc[31] = [0,0,0,0,0,10,25,20,0,1];//Rat
uc[32] = [0,0,0,0,0,20,35,40,0,1];//Spider
uc[33] = [0,0,0,0,0,60,40,60,0,1];//Snake
uc[34] = [0,0,0,0,0,80,66,50,0,1];//Bat
uc[35] = [0,0,0,0,0,50,70,33,0,2];//Wild boar
uc[36] = [0,0,0,0,0,100,80,70,0,2];//Wolf
uc[37] = [0,0,0,0,0,250,140,200,0,3];//Bear
uc[38] = [0,0,0,0,0,450,380,240,0,3];//Crocodile
uc[39] = [0,0,0,0,0,200,170,250,0,3];//Tiger
uc[40] = [0,0,0,0,0,600,440,520,0,5];//Elephant
//Natarian - fr3nchlover
uc[41] = [0,0,0,0,0,20,35,50,0,1];//Pikeman
uc[42] = [0,0,0,0,0,65,30,10,0,1];//Thorned warrior
uc[43] = [0,0,0,0,0,100,90,75,0,1];//Guardsman
uc[44] = [0,0,0,0,0,0,10,0,0,1];//Birds of prey
uc[45] = [0,0,0,0,0,155,80,50,0,2];//Axerider
uc[46] = [0,0,0,0,0,170,140,80,0,3];//Natarian knight
uc[47] = [0,0,0,0,0,250,120,150,0,6];//Warelephant
uc[48] = [0,0,0,0,0,60,45,10,0,5];//Ballista
uc[49] = [0,0,0,0,0,80,50,50,0,0];//Natarian emperor
uc[50] = [0,0,0,0,0,30,40,40,0,0];//Settler
uc[98] = [20,30,10,20,0,0,0,0,0,0];//trap
uc[99] = [20,30,10,20,0,0,0,0,0,0];//trap

//GM_deleteValue("speed_asia_16537_appConf");
//GM_deleteValue("speed_asia_16537_villages");
//GM_deleteValue("speed_asia_16537_tasks");

/******************** define functions ********************/
// HTML dom helper
function $e(aType, iHTML){var ret = doc.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;};//Create a new element of the DOM (type, innerHTML)
function $g(aID) {return (aID != '' ? doc.getElementById(aID) : null);};//returns the element with the aID id (wrapper for getElementById)
function $a(iHTML, att) {var aLink = $e("A"); aLink.innerHTML = iHTML; $at(aLink, att); return aLink;};
function $at(aElem, att) {if (att !== undefined) {for (var a in att) {aElem.setAttribute(a, att[a]); if (a.toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[a]);};};};//addAttributes
function $i(att) {var aInput = $e("INPUT"); $at(aInput, att); return aInput;};
function $s(att) {var aSelect = $e("SELECT"); $at(aSelect, att); return aSelect;};
function $o(text,value, att) {var aOption = $e("OPTION"); aOption.innerHTML = text; if (!att) att = new Array(); att['value'] = value; $at(aOption, att); return aOption;};
function $img(att) {var aImg = $e("IMG"); $at(aImg, att); return aImg;};
function $txt(text) {var aTxt = doc.createTextNode(text); return aTxt;};
function $t(att) {var aTb = $e("TABLE"); $at(aTb, att);	return aTb;};
function $r(att) {var aRow = $e("TR"); $at(aRow, att); return aRow;};
function $c(iHTML, att) {var aCell = $e("TD"); aCell.innerHTML = iHTML; $at(aCell, att); return aCell;};
function $d(iHTML, att) {var aDiv = $e("DIV"); aDiv.innerHTML = iHTML; $at(aDiv, att); return aDiv;};
function $l(iHTML, att) {var aLabel = $e("LABEL"); aLabel.innerHTML = iHTML; $at(aLabel, att); return aLabel;};
function $xf(xpath, xpt, sNode) {if (!sNode) sNode = document; var xpres = XPFirst; switch (xpt) {case 'i': xpres = XPIterator; break; case 'l': xpres = XPList; break; case 'r': xpres = XPResult; break;}; var ret; if (sNode.evaluate) ret = sNode.evaluate(xpath, sNode, null, xpres, null); else ret = document.evaluate(xpath, sNode, null, xpres, null); return (xpres == XPFirst ? ret.singleNodeValue : ret);};
function insertAfter(node, referenceNode) {node.parentNode.insertBefore(referenceNode, node.nextSibling);};//insert a referenceNode after a specified node
function removeElement(ex) {if (ex && ex.parentNode) ex.parentNode.removeChild(ex);};//remove the "ex" element from the current document
function moveElement(ex, dest) {removeElement(ex); dest.appendChild(ex);};//move the "ex" element from the current parent to the destination "dest" node of the DOM
function addClass(el,className){var i,len,v,cls = [];if (!isArray(className)) {if (isString(className) && !hasClass(el,className)) {el.className += " " + className;}}else {for (i = 0, len = className.length; i < len; i++) {v = className[i];if (isString(v) && (' ' + el.className + ' ').indexOf(' ' + v + ' ') == -1) {cls.push(v);}}if (cls.length) {el.className += " " + cls.join(" ");}}return el;};
function removeClass(el,className){var i,idx,len,cls,elClasses;if (!isArray(className)){className = [className];}if (el && el.className) {elClasses = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/);for (i = 0, len = className.length; i < len; i++) {cls = className[i];if (isString(cls)) {cls = cls.replace(/^\s+|\s+$/g, '');idx = elClasses.indexOf(cls);if (idx != -1) {elClasses.splice(idx, 1);}}}el.className = elClasses.join(" ");}return el;};
function toggleClass(el,className){hasClass(el,className) ? removeClass(el,className) : addClass(el,className);return el;};
function hasClass(el,className){return className && (' '+el.className+' ').indexOf(' '+className+' ') != -1;};
function replaceClass(el,oldClassName,newClassName){removeClass(el,oldClassName);addClass(el,newClassName);return el;};
function applyStyles(el, styles){if(styles){var cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi;var i = 0,len,style,matches;if(typeof styles == "function"){styles = styles.call();}if(typeof styles == "string"){while((matches = cssRe.exec(styles))){setStyle(el,matches[1],matches[2]);}}else if (typeof styles == "object"){setStyle(el,styles);}}};
function setStyle(el,prop,value){var tmp,style,camel;if (typeof prop != 'object') {tmp = {};tmp[prop] = value;prop = tmp;}for (style in prop) {value = prop[style];el.style[style] = value;}return el;};
function ajax2DIV(aR) {var ad = document.createElement('div'); ad.innerHTML = aR.responseText; return ad;};
function getScroll() {var dd = doc.documentElement,db = body;if(dd && (dd[SCROLLTOP] || dd[SCROLLLEFT])){return {left:dd[SCROLLLEFT], top:dd[SCROLLTOP]};}else if(db){return {left:db[SCROLLLEFT], top:db[SCROLLTOP]};}else{return {left:0, top:0};}};
function getEl(el){if(!el || !doc){return null;}if (isString(el)) return $g(el); else return el;};
function translatePoints(el, x, y){y = isNaN(x[1]) ? y : x[1];x = isNaN(x[0]) ? x : x[0];var relative = el.style['position'] == 'relative',o = getXY(el),l = parseInt(el.style['left'], 10),t = parseInt(el.style['top'], 10);l = !isNaN(l) ? l : (relative ? 0 : el.offsetLeft);t = !isNaN(t) ? t : (relative ? 0 : el.offsetTop);return {left: (x - o[0] + l), top: (y - o[1] + t)};};
function getY(el) {return getXY(el)[1];};
function getX(el) {return getXY(el)[0];};
function getXY(el) {var p,pe,b,bt,bl,dbd,x=0,y=0,scroll,hasAbsolute,ret=[0,0];el=getEl(el);if(el!=body){if(el.getBoundingClientRect) {b=el.getBoundingClientRect();scroll=getScroll();ret=[ROUND(b.left + scroll.left), ROUND(b.top + scroll.top)];} else {p = el;hasAbsolute = el.style["position"]=="absolute";while (p) {x += p.offsetLeft;y += p.offsetTop;hasAbsolute = hasAbsolute || p.style["position"] == "absolute";y += bt = parseInt(p.style["borderTopWidth"], 10) || 0;x += bl = parseInt(p.style["borderLeftWidth"], 10) || 0;if (p != el && !p.style['overflow'] == 'visible') {x += bl;y += bt;}p = p.offsetParent;}if (!hasAbsolute) {x += parseInt(body.style["borderLeftWidth"], 10) || 0;y += parseInt(body.style["borderTopWidth"], 10) || 0;}p = el.parentNode;while (p && p != body) {if (p.tagName != 'TR' && p.style["display"] != "inline") {x -= p.scrollLeft;y -= p.scrollTop;}p = p.parentNode;}ret = [x,y];}}return ret};
function setXY(el, xy) {var pts = translatePoints(el, xy[0], xy[1]),style = el.style,pos;for (pos in pts) {if(!isNaN(pts[pos])) style[pos] = pts[pos] + "px";}};
function setX(el, x) {setXY(el, [x, false]);};
function setY(el, y) {setXY(el, [false, y]);};
// path & url helper
function basename(path) {return path.replace(/.*\//, "");}; //name of a file from a path or URL
function getNewdidFromLink(aLink) {aLink.search(/\?newdid=(\d+)/);return RegExp.$1;};
function toJSvoid() {aX = $xf("//a[@href='#']", 'l'); for (var i = 0; i < aX.snapshotLength; i++) aX.snapshotItem(i).href = jsVoid;};//convert # links to jsVoid
// time helper
function getRndTime(maxrange) {return FLOOR(maxrange * (0.6 + 0.4 * Math.random())); };
function toSeconds(hTime) {p = hTime.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);};//Compute the seconds for a given human time
function getDateStr(date){if (!isDate(date)) return ""; return (date.getMonth()<9?"0"+(date.getMonth()+1):(date.getMonth()+1))+(date.getDate()<10?"/0"+date.getDate():"/"+date.getDate());}
function getFullDateStr(date){if (!isDate(date)) return ""; return getDateStr(date)+"/"+date.getFullYear();}
function getTimeStr(date){if (!isDate(date)) return ""; return (date.getHours()<10?"0"+date.getHours():date.getHours())+(date.getMinutes()<10?":0"+date.getMinutes():":"+date.getMinutes());}
function getFullTimeStr(date){if (!isDate(date)) return ""; return getTimeStr(date)+(date.getSeconds()<10?":0"+date.getSeconds():":"+date.getSeconds());}
function getDateTimeStr(date){return getDateStr(date)+" "+getTimeStr(date);}
function getFullDateTimeStr(date){return getFullDateStr(date)+" "+getTimeStr(date);}
function getDateFullTimeStr(date){return getDateStr(date)+" "+getFullTimeStr(date);}
function getFullDateFullTimeStr(date){return getFullDateStr(date)+" "+getFullTimeStr(date);}
// array helper
function arrayByN(a, n) {var b = arrayClone(a); for (var i in b) {b[i] *= n;}; return b;};//multiply every element of the "a" array by "n"
function arrayClone(a) {var b = new Array(); for (var i in a) {b[i] = a[i];}; return b;};//return a copy of the "a" array
function arrayAdd(a, b) {if (!a) return arrayClone(b); if (!b) return arrayClone(a); var c = new Array(); for (var i = 0; i < MAX(a.length,b.length); c[i] = a[i] + b[i++]); return c;};
function arrayToInt(arr) {var h = 0; for (var i in arr) {h += arr[i];}; return h;};//Sum all the values of the arr array
// language helper
function T(xT) {if (t[xT] != undefined) return t[xT]; else return '---';};//translated t item if available
// GM Cookies & Config variable
function getCrtServer() {crtPage.search(/http:\/\/(.*)\//); appConf.fullServerName = RegExp.$1; appConf.gServer = appConf.fullServerName.replace(/\.tr7t\./,'_'); return;};
function getUserID() {uLink = $xf("//div[@id='" + dleft + "']//a[contains(@href, 'spieler.php')]");if (uLink) {appConf.userInfo.userID = uLink.href.split("uid=")[1]; spLnk = 'spieler.php?uid=' + appConf.userInfo.userID;}; uLink = null; return;};
function getValueName(aName) {return appConf.gServer + '_' + appConf.userInfo.userID + '_' + aName;}
function getValue(aName) {var nC = getValueName(aName); return gmcookie = eval(GM_getValue(nC, '({})'));}
function setValue(aName, aValue) { if (!appConf.userInfo.userID || parseInt(appConf.userInfo.userID) == 0) return; var nC = getValueName(aName); if (aValue) GM_setValue(nC, uneval(aValue)); }
function delValue(aName) { if (!appConf.userInfo.userID || parseInt(appConf.userInfo.userID) == 0) return; var nC = getValueName(aName); if (aValue) GM_deleteValue(nC); }
function setUserName(aUN) {appConf.userInfo.userName = aUN; setValue('appConf', appConf);}
function setLngRace(drNode) {var aValue = $xf("//table[@class='tbg']/tbody/tr[5]/td[2] | //td[@class='details']//table/tbody/tr[2]/td[1] | //table[@id='profile']/tbody/tr[3]/td[1]", 'f', drNode); if (aValue) {appConf.userInfo.disprace = aValue.textContent; setValue('appConf', appConf);};}
function setCapitalInfo(aLnk) {var aVal = aLnk.parentNode.getElementsByTagName('A')[0]; appConf.userInfo.capVid = aVal.href.match(/\?d=(\d+)/)[1]; appConf.userInfo.capName = aVal.textContent; var xy = id2xy(appConf.userInfo.capVid); appConf.userInfo.capPos = xy[0] + "|" + xy[1]; setValue('appConf', appConf); xy = null; return;}
function setRace(ti) {switch (ti) {case '1': appConf.userInfo.race = avRace[0]; break; case '11': appConf.userInfo.race = avRace[1]; break; case '21': appConf.userInfo.race = avRace[2]; break;}; appConf.userInfo.raceId = parseInt(ti); setValue('appConf', appConf);};
// game helper
function xy2id(x, y){return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));};//get the vID of the cell having the x,y coordinates
function id2xy(vid){var arrXY = new Array; var ivid = parseInt(vid); arrXY[0] = (ivid%801?(ivid%801)-401:400); arrXY[1] = 400 - (ivid - 401 - arrXY[0]) / 801; return arrXY;};//Inverse function for xy2id(x,y) => id2xy(vid) - fr3nchlover
function getDR(race){var tt = 1;switch (race) {case avRace[1] : tt = 11; break; case avRace[2] : tt = 21; break;}; return tt;};
function getTTime(iTT, xRace, arX){var tt = getDR(xRace); return ROUND(arX[0] * 3600 / uc[tt + iTT][8] / arX[4] + arX[1] * 3600 / uc[tt + iTT][8] / arX[4] / (1 + arX[2]/10));};
function getMTime(qDist, xRace){return ROUND(qDist * 3600 / mts[xRace] / (appConf.speed == true ? 3 : 1));};	
//function isPostNPC() {return $xf('//p/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[starts-with(@class,"r")] | //p[@class="txt_menue"]/following-sibling::*/img[@class="res"]', 'r').snapshotLength == 8;};//check if we are on the page where the NPC trade has been finished
function getCapitalInfo(cNode){var aVal = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7']//span[@class='c'] | //div[@id='" + dmid2 +"']//table[@id='villages']//span", 'f', cNode); return aVal; aVal = null;};
function getPlayerName(pNode){var uTb = $xf("//div[@id='" + dmid2 + "']//table[@class='tbg'] | //*[@id='profile']", 'f', pNode); var aTxt = uTb.rows[0].cells[0].textContent; var xi = aTxt.indexOf(" "); var aUN = aTxt.substring(xi + 1).replace(/ /g, ""); return aUN;};
//function updateAllVillages(xi) {for (var i = 0; i < vList.length; i++) {var aTimeOut = getRndTime(2000); setTimeout(refreshVillageV2(vList[i].vNewdid, xi), aTimeOut);}; return;};
//function isThisNPCexcluded() {return (appConf.O[26] != '1' || appConf.boolIsThisNPC == true || crtPage.indexOf("build.php") == -1 || crtPage.match(/build.php\?(.*)&t=(\d+)/) != null || $g("map1") != null || $xf("//map[@name='map1']") != null);};//check if NPC excluded
// others
function $ls(aX){return aX.toLocaleString();};//convert a number to local string
function ajaxRequest(url, aMethod, param, onSuccess, onFailure){var aR = new XMLHttpRequest(); aR.onreadystatechange = function() {if (aR.readyState == 4 && aR.status == 200) onSuccess(aR); else if (aR.readyState == 4 && aR.status != 200) onFailure(aR);}; aR.open(aMethod, url, true); if (aMethod == 'POST') aR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8'); aR.send(param);};
function dummy(){return;};//does nothing. Used when there is no other choice but need to use a function
function dF(s){var s1 = unescape(s.substr(0, s.length - 1)); var ts = ''; for (i = 0; i < s1.length; i++) ts += String.fromCharCode(s1.charCodeAt(i) - s.substr(s.length - 1, 1)); return ts;};
function log(level, msg){if (level <= tau_LOG_LEVEL) {var ld = new Date(); GM_log(getDateFullTimeStr(ld)+" "+msg);}};
function pauseScript(ms){var ms1 = getRndTime(ms); var aDate = new Date(); var crtDate = new Date(); do {crtDate = new Date();} while (crtDate - aDate < ms1);};
function toNumber(aValue){return parseInt(aValue.replace(/\W/g, "").replace(/\s/g, ""));};
function applyConfig(o, c, defaults){if(defaults){applyConfig(o, defaults);}if(o && c && typeof c == 'object'){for(var p in c){o[p] = c[p];}}return o;};
function isString(v){return typeof v === 'string';};
function isEmpty(v, allowBlank){return v === null || v === undefined || ((isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);};
function isArray(v){return toString.apply(v) === '[object Array]';};
function isDate(v){return toString.apply(v) === '[object Date]';};
function isObject(v){return !!v && Object.prototype.toString.call(v) === '[object Object]';};
function isPrimitive(v){return isString(v) || isNumber(v) || isBoolean(v);};
function isFunction(v){return toString.apply(v) === '[object Function]';};
function isNumber(v){return typeof v === 'number' && isFinite(v);};
function isString(v){return typeof v === 'string';};
function isBoolean(v){return typeof v === 'boolean';};
function isElement(v){return v ? !!v.tagName : false;};
function isDefined(v){return typeof v !== 'undefined';};
function getValueStr(){if (arguments.length < 1) return "";if (typeof arguments[0] != "string") return "";var string = arguments[0];var exp = new RegExp(/(%([%ds]))/g);var match = null;var bP = 0,eP = 0,eM = 0,ind = 1;var retStr = "";while (match = exp.exec(string)) {sP = eM;eM = exp.lastIndex;eP = eM - match[0].length;retStr += string.substring(sP,eP);retStr += arguments[ind++];}retStr += string.substring(eM);return retStr;};
function updScript() {
	var updWin = new Window({id:'updScriptWin',title:'Update Script',width:350,tbarHide:true,bbarHide:true,zIndex:2100,
	                         html:'<div style="text-align:center;margin:15px 0px;">Updating script from "http://userscript.com".<br/><br/>Please wait...</div>'});
	GM_xmlhttpRequest({
		method: 'GET',
		url: UPDATEURL,
		onload: function(result) {
			removeElement(updWin.el);
			if (result.status != 200) return;
			if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
			nv = RegExp.$1;
			if (nv == SCRIPTVER) {
			    createInfoWindow("Update Script","You have the latest version (" + SCRIPTVER + ")!",5000);
			} else if (nv < SCRIPTVER) {
			    createInfoWindow("Update Script","You may have a beta version (" + SCRIPTVER + ")!",5000);
			} else {
                var askWin = new Window({id:'askUpdWin',title:'Update Script',width:500,tbarHide:true,bbarHide:true,zIndex:2110,
                                         html:'<div style="text-align:center;margin:15px 0px;">A new version of the script is available (version ' + nv + ')!<br/><br/>Update script now ?</div>'});
                var dBtn = $d("",{style:'text-align:center;margin:10px 0px;'});
                var iBtn = $i({type:'button',value:'Install Script',style:'margin-right:5px;'});
                var hBtn = $i({type:'button',value:'Script Homepage',style:'margin-right:5px;'});
                var cBtn = $i({type:'button',value:'Cancel'});
                askWin.contentEl.appendChild(dBtn);
                dBtn.appendChild(iBtn);
                dBtn.appendChild(hBtn);
                dBtn.appendChild(cBtn);
                iBtn.addEventListener('click',function() { 
                    if (typeof GM_openInTab !== 'undefined') { GM_openInTab(UPDATEURL); }
	                else { window.open(UPDATEURL); }
                    removeElement(askWin.el);
                },false);
                hBtn.addEventListener('click',function() { window.open(SCRIPTURL,"tauScriptPageWin"); removeElement(askWin.el); },false);
                cBtn.addEventListener('click',function() { removeElement(askWin.el); },false);
            }
		}
	});
};
var DD = function() {
    me = this;
	me.mouseOffset = null;
	me.isMouseDown = false;
	me.lMouseState = false;
	me.dragObject = null;
	me.curTarget = null;
	me.onAfterMove = null;

	me.mousePos = function(ev) {return {x:ev.pageX, y:ev.pageY};};
	me.getMouseOffset = function(target, ev){var docPos = getXY(target); var mousePos = me.mousePos(ev); return {x:mousePos.x - docPos[0], y:mousePos.y - docPos[1]};};
	me.mouseDown = function(ev){var target = ev.target; me.isMouseDown = true; if (target.getAttribute('Draggable')) return false;};
	me.mouseMove = function(ev){
	    if (me.isMouseDown && me.mouseOffset != null){
		    var target = ev.target;		    
		    var mousePos = me.mousePos(ev);
		    setXY(me.dragObject, [mousePos.x - me.mouseOffset.x, mousePos.y - me.mouseOffset.y]);
		    me.lMouseState = me.isMouseDown;
		}
		return false;		
	}
	me.mouseUp = function(ev){
		if (me.isMouseDown && me.dragObject){
		    var objPos = getXY(me.dragObject);
            if (isFunction(me.onAfterMove)) me.onAfterMove(me.dragObject, objPos);
		    me.dragObject = null;
		    me.onAfterMove = null;
		};
		me.isMouseDown = false;
	}
	me.makeDraggable = function(parent, item, onAfterMove){
		if (!parent || !item) return;
		item.addEventListener('mousedown',function(ev){
			me.dragObject = parent;
			me.onAfterMove = onAfterMove;
			me.mouseOffset = me.getMouseOffset(parent, ev);
			return false;
		}, false);
	}
	document.addEventListener('mousemove', me.mouseMove, false);
	document.addEventListener('mousedown', me.mouseDown, false);
	document.addEventListener('mouseup', me.mouseUp, false);
};
var dragDropManager = new DD();
// window
var autoGenID = 0;
var Window = function(config) {
    var me = this;
    me.closable = true;
    me.hideMode = 'display';
    me.rendered = false;
    me.dragging = false;
    me.mousePos = [0,0];
    me.el = null;
    me.titleEl = null;
    me.topBarEl = null;
    me.contentEl = null;
    me.bottomBarEl = null;
    me.getTitleTarget=function(){if (!me.el) return null;if (!me.titleEl) {me.titleEl = $d("",{id:me.getId()+"_title",class:"tau-win-title"});me.el.appendChild(me.titleEl);}return me.titleEl;};
    me.getTopBarTarget=function(){if (!me.el) return null;if (!me.topBarEl) {me.topBarEl = $d("",{class:"tau-win-top-bar"});me.el.appendChild(me.topBarEl);}return me.topBarEl;};
    me.getContentTarget=function(){if (!me.el) return null;if (!me.contentEl) {me.contentEl = $d("",{class:"tau-win-content"});me.el.appendChild(me.contentEl);}return me.contentEl;};
    me.getBottomBarTarget=function(){if (!me.el) return null;if (!me.bottomBarEl) {me.bottomBarEl = $d("",{class:"tau-win-bottom-bar"});me.el.appendChild(me.bottomBarEl);}return me.bottomBarEl;};
    me.getId = function(){return me.id || (me.id = 'divWindow' + (++autoGenID));};
    me.addContentEl = function(el){if (me.contentEl && el)me.contentEl.appendChild(el);};
    me.setPos = function(x,y){setXY(me.el,[x,y]);};
    me.moveTo = function(x,y){var pos=getXY(me.el);setXY(me.el,[pos[0]+x,pos[1]+y]);};
    me.setWidth = function(w){if (isString(w)) me.el.style.width = w; else me.el.style.width = w+"px";};
    me.setHeight = function(h){if (isString(h)) me.el.style.height = h; else me.el.style.height = h+"px";}
    //me.beginMove = function(e){me.mousePos=[e.pageX,e.pageY];me.dragging=true;};
    //me.doMove = function(e){if (me.dragging){me.moveTo(e.pageX-me.mousePos[0],e.pageY-me.mousePos[1]);me.mousePos=[e.pageX,e.pageY];}};
    //me.endMove = function(e){me.dragging=false;me.onAfterMove(me.el,getXY(me.el));};
    me.setStatus = function(msg) {me.bottomBarEl.innerHTML = msg};
    me.onAfterMove = function(el,pos) {};
    me.render = function(){
        if(!me.rendered){
            me.rendered = true;
            if (me.el == null){me.el = $d("",{id:me.id,class:"tau-win-box"});body.appendChild(me.el);}
            if (me.zIndex){me.el.style.zIndex = me.zIndex;}
            if (me.autoShow){me.el.style.display = 'block';}
            if (me.cls){addClass(me.el,me.cls);delete me.cls;}
            if (me.style){applyStyles(me.el,me.style);delete me.style;}
            if (me.width){me.setWidth(me.width);delete me.width;}
            if (me.height){me.setHeight(me.height);delete me.height;}
            var titleTarget = me.getTitleTarget();
            if (me.title){titleTarget.innerHTML = me.title;delete me.title;}
            if (me.closable){
                var tClose = $d('',{class:'tau-tool tau-tool-close'});
                titleTarget.appendChild(tClose);
                tClose.addEventListener('click',function(){removeElement(me.el)},false);
                tClose.addEventListener('mouseover',function(){this.className="tau-tool tau-tool-close-over";},false);
                tClose.addEventListener('mouseout',function(){this.className="tau-tool tau-tool-close";},false);
            }
            var topBarTarget = me.getTopBarTarget();
            if (me.tbar){topBarTarget.innerHTML = me.tbar;delete me.tbar;}
            if (me.tbarHide){topBarTarget.style.display = 'none';}
            var contentTarget = me.getContentTarget();
            if (me.html){contentTarget.innerHTML = me.html;delete me.html;}
            var bottomBarTarget = me.getBottomBarTarget();
            if (me.bbar){bottomBarTarget.innerHTML = me.bbar;delete me.bbar;}
            if (me.bbarHide){bottomBarTarget.style.display = 'none'; contentTarget.className = 'tau-win-content-no-bottom';}
            //me.titleEl.addEventListener('mousedown',me.beginMove,false);
            //me.titleEl.addEventListener('mousemove',me.doMove,false);
            //me.titleEl.addEventListener('mouseup',me.endMove,false);
            dragDropManager.makeDraggable(me.el,me.titleEl,me.onAfterMove);
            me.setPos(ROUND((window.innerWidth-me.el.clientWidth)/2),ROUND((window.innerHeight-me.el.clientHeight)/2));
        }
        return this;
    };
    config = config || {};
    applyConfig(this, config);
    me.getId();
    me.render();
};
/******************** process function ********************/
function isLoginPage(pNode) {
    var passBox = $xf(".//input[@type='password' and contains(@value, '*')]", 'f', pNode);
    return passBox;
}
function doLogin() {
    var loginBtn = $g('btn_login');
    var retVal = false;
    if(loginBtn != null) {	
	    var passBox = isLoginPage();
	    log(3,"Check Login: login screen detected");
	    if ((passBox != null) && document.getElementsByName("name")[0].value.length > 0 ) {
	        log(3,"Check Login: user name & password is OK!");
		    //window.addEventListener('load', function(){loginBtn.click();}, false);
		    GM_setValue(appConf.gServer+'_RefreshPage','dorf2.php');
		    window.setTimeout(function() {loginBtn.click();}, 1000);
	    } else log(3,"tr7t Auto Build: Auto-Login failed. You must have FireFox store the username and password.");
        retVal = true;
    } else {
        log(3,"Check Login: not in login screen");
        var refreshTime = getRndTime(appConf.refreshInterval*60000); //random refresh time in minutes
        var refreshPage = GM_getValue(appConf.gServer+'_RefreshPage','none');
        if (refreshPage=='village1.php') {GM_setValue(appConf.gServer+'_RefreshPage','none'); refreshTime = 1000; }
        else if (refreshPage=='dorf2.php') {GM_setValue(appConf.gServer+'_RefreshPage','village1.php'); refreshTime = 1000; }
        else if (refreshPage=='none') refreshPage = crtPage;
        window.setTimeout('location.href="'+refreshPage+'";',refreshTime);
        log(3,"refresh page in "+FLOOR(refreshTime/1000).toString()+" second(s)");
    }
    return retVal;
}
function getLanguage() {
	var iP = $g("logo");
	var ahref;
	if (iP) {
		if (iP.nodeName == "A") {
			if (iP.firstChild && iP.firstChild.className == "logo_plus") appConf.plusAct = true;
			ahref = iP.href;
			appConf.M35 = 2;			
		} else if (iP.nodeName == "IMG") {
			if (iP.className && (iP.className == "plus" || iP.className == "logo_plus")) appConf.plusAct = true;
			ahref = iP.parentNode.href;
			appConf.M35 = 1;
		};
		if (ahref) {
			aLang = ahref.split(".");
			appConf.lang = aLang[aLang.length - 1].replace("/", "");
		};
		ahref = null;
	} else {
		//T3.1
		iP = $xf("//img[contains(@src, 'plus.gif')]");
		if (iP) {
			iP.src.search(/\/img\/([^\/]+)\//);
			appConf.lang = RegExp.$1.substring(0,2);
		};
		if ($xf("//img[contains(@src, 'tr7t1.gif')]")) appConf.plusAct = true;
	};
	iP = null; ahref = null;
}
function setVer35Cons() {
    appConf.T35 = true;
	dlright1 = 'side_info';
	dl = $g(dlright1);
	if (!dl) dlright1 = 'sright';
	dleft = 'side_navi';
	dl = $g(dleft);
	if (!dl) dleft = 'sleft';
	dTop1 = 'header';
	dTop5 = 'mtop';
	dmid2 = 'content';
	dmid1 = 'content';
	dmid = "mid";
}
function getActiveVillage() {
	var aV = $xf("//td[@class='dot hl'] | //div[@id='vlist']//table[@class='vlist']//tr[@class='sel']//a | //a[@class='active_vl']/../../td/table/tbody/tr/td");
	var v = ['', '', '', -1000, -1000, ''];
	if (aV) {
		try {
			if (appConf.M35 == 2) {
				var tr = aV.parentNode;
				if (tr.cells.length > 3 && tr.cells.length < 7) {
					v[3] = tr.cells[2].textContent.replace("(", "");
					v[4] = tr.cells[4].textContent.replace(")", "");
					v[1] = xy2id(v[3], v[4]);
					v[0] = tr.cells[1].textContent;
					v[5] = tr.cells[1].firstChild;
					v[2] = getNewdidFromLink(v[5].href);
				} else {
					var tmpC = tr.cells[2].textContent.replace("(", "").replace(")", "").split("|");
					v[3] = parseInt(tmpC[0]);
					v[4] = parseInt(tmpC[1]);
					v[1] = xy2id(v[3], v[4]);
					v[0] = tr.cells[1].textContent;
					v[5] = $xf('//tr[td[@class="dot hl"]]//a[contains(@href,"?newdid=")]','f',tr.cells[1]);
					v[2] = getNewdidFromLink(v[5].href);
				};
			} else if (appConf.M35 == 0) {
				v[3] = aV.textContent.replace("(", "");
				aV = $xf('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]');
				v[4] = aV.textContent.replace(")", "");
				v[1] = xy2id(v[3], v[4]);
				v[5] = $xf('//a[@class="active_vl"]');
				if (v[5]) v[0] = v[5].textContent;
				v[2] = getNewdidFromLink(v[5].href);
			} else if (appConf.M35 == 1) {
				v[3] = aV.parentNode.parentNode.cells[2].textContent.replace("(", "");
				v[4] = aV.parentNode.parentNode.cells[4].textContent.replace(")", "");
				v[1] = xy2id(v[3], v[4]);
				v[0] = aV.textContent;
				v[5] = aV;
				v[2] = getNewdidFromLink(v[5].href);
			};
			actV = v[1];
			if (villages[actV] === undefined)
			    villages[actV] = {Name:v[0],Newdid:v[2],x:v[3],y:v[4],Link:v[5].href,rType:2,isCap:false,BiP:[],lastUpBId:"",
			                      Ress:{curr:[0,0,0,0],capa:[0,0,0,0],pphr:[0,0,0,0],cost:0,corp:0,upTime:0}};
            else {
                //log(0,"Set Village value of id "+actV+" from page");
                villages[actV].Name = v[0];
                villages[actV].Newdid = v[2];
                villages[actV].x = v[3];
                villages[actV].y = v[4];
                villages[actV].Link = v[5].href;
            }
            villages[actV].isCap = (actV == appConf.userInfo.capVid);
		} catch(e) {
			getActiveVillageFromCookie();
		};
	} else getActiveVillageFromCookie();
	setValue("villages",villages);
	v = null; aV = null;

	function getActiveVillageFromCookie() {
	    if (appConf.userInfo.capVid != '') {
		    var xy = id2xy(appConf.userInfo.capVid);
		    actV = appConf.userInfo.capVid;
		    if (villages[actV] === undefined)
		        villages[actV] = {Name:appConf.userInfo.capName,Newdid:appConf.userInfo.capNewdid,x:xy[0],y:xy[1],
		                          Link:'village1.php?newdid=' + appConf.userInfo.capNewdid,rType:2,isCap:true,BiP:[],lastUpBId:"",
		                          Ress:{curr:[0,0,0,0],capa:[0,0,0,0],pphr:[0,0,0,0],cost:0,corp:0,upTime:0}};
            else {
                //log(0,"Set Village value of id "+actV+" from cookie");
                villages[actV].Name = appConf.userInfo.capName;
                villages[actV].Newdid = appConf.userInfo.capNewdid;
                villages[actV].x = xy[0];
                villages[actV].y = xy[1];
                villages[actV].Link = 'village1.php?newdid=' + appConf.userInfo.capNewdid;
                villages[actV].isCap = true;
            }
		    xy = null;
		}
	};
//	log(0,"=================================> Active village = "+actV);
//  log(0,"getActiveVillage:villages = "+uneval(villages));
}
function getResourceInfo(vId,rNode) {
	for (var i = 0; i < 4; i++){
		var aX = $xf('id("l' + (4-i) + '")','f',rNode);
		if (aX) {
			resIppH = aX.textContent.split("/");
			villages[vId].Ress.curr[i] = parseInt(resIppH[0]);  //available resource units
			villages[vId].Ress.capa[i] = parseInt(resIppH[1]);  //capacity of warehouse/granary
			villages[vId].Ress.pphr[i] = parseInt(aX.title);    //production/h for this resource
			if (i == 3) {
				//real crop production of this village (last cell of the row)
				cpRow = aX.parentNode;
				intLastCell = cpRow.cells.length;
				ccCell = cpRow.cells[intLastCell - 1];
				if (ccCell.id == "l" + (4-i)) {
					cpTable = cpRow.parentNode;
					intLastRow = cpTable.rows.length;
					cpRow = cpTable.rows[intLastRow - 1];
					intLastCell = cpRow.cells.length;
					ccCell = cpRow.cells[intLastCell - 1];
				};
				arrCcTxt = ccCell.textContent.split("/");
				//real total crop production of this village
				villages[vId].Ress.cost = parseInt(arrCcTxt[1]);
				villages[vId].Ress.corp = parseInt(arrCcTxt[0]);
				villages[vId].Ress.upTime = (new Date()).getTime();
			}
		}
	}
	setValue("villages",villages);
//    log(0,"getResourceInfo:villages = "+uneval(villages));
}
function getSpielerInfo() {
	if (crtPage.indexOf(spLnk) != -1) {
		var aV = getCapitalInfo();
		if (aV) {setCapitalInfo(aV); setUserName(getPlayerName()); setLngRace();};
        aV = null;
	} else {
		//get town coordinates from the spieler.php page via AJAX request
		ajaxRequest(spLnk, 'GET', null, function(ajaxResp) {
			var ad = ajax2DIV(ajaxResp);
			var aV = getCapitalInfo(ad);
			if (aV) {setCapitalInfo(aV); setUserName(getPlayerName(ad)); setLngRace(ad);};
            if (reGetCapInfo && appConf.userInfo.capNewdid == '') getSingleTownNewdid();
            aV = null; ad = null;
		});
	};
	return;
}
function getSingleTownNewdid() {
	ajaxRequest("/dorf3.php", 'GET', null, function(ajaxResp) {
		if (ajaxResp) {
		    var ad = ajax2DIV(ajaxResp);
		    var aLnk = $xf("//a[contains(@href,'village1.php?newdid=') and text()='"+appConf.userInfo.capName+"']",'f',ad);
			aLnk.href.search(/village1.php\?newdid=(\d+)/);
			appConf.userInfo.capNewdid = RegExp.$1;
			villages[appConf.userInfo.capVid].Newdid = appConf.userInfo.capNewdid;
			villages[appConf.userInfo.capVid].isCap = true;
			setValue('appConf', appConf);
			setValue('villages', villages);
		};
	});
	return;
}
function loadConfig() {var tmpConf = getValue("appConf");if (!tmpConf || !tmpConf.userInfo) setValue("appConf",appConf); else applyConfig(appConf,tmpConf);}
function loadVillages() {var tmpV = getValue("villages");if (!tmpV) setValue("villages",villages); else villages = tmpV;}
function getGeneralValue() {
    if (!$g(dTop5)) setVer35Cons();
    getUserID();
	getCrtServer();
	loadConfig();
    getLanguage();
	loadVillages();
	if (appConf.userInfo.userName == '' || appConf.userInfo.disprace == '' || appConf.userInfo.capName == '' || appConf.userInfo.capVid == '' || appConf.userInfo.capPos == null || crtPage.indexOf('spieler.php') != -1) getSpielerInfo();	
	if (appConf.userInfo.capVid == '') getSingleTownNewdid();
    getActiveVillage();
}
function getRaceV3() {
	//co-author Booboo
	imgQM = $g("qgei");
	if (!imgQM) return false;
	clName = imgQM.className;
	if (clName) {
		if (clName.indexOf("l1") != -1) {appConf.userInfo.race = avRace[0]; appConf.userInfo.raceId = 1;};
		if (clName.indexOf("l2") != -1) {appConf.userInfo.race = avRace[1]; appConf.userInfo.raceId = 11;};
		if (clName.indexOf("l3") != -1) {appConf.userInfo.race = avRace[2]; appConf.userInfo.raceId = 21;};
		setValue("appConf",appConf);
		return appConf.userInfo.race;
	}
}
function getRace() {
	if (appConf.userInfo.race == '') getRaceV3();
	if (appConf.userInfo.race == '') {
		//race cookies are undefined - enter the barracks
		ajaxRequest(bksLnk, 'GET', null, function(ajaxResp) {
			ajaxResp.responseText.search(/unit u(\d+)/); //race recognition - first image in table of troops
			var xV = RegExp.$1;
			if (xV && xV != '') setRace(xV);
		});
	};
	return appConf.userInfo.race;
}
function loadTasks() {
    var resetTime = new Date();
    var nextPsTime = resetTime.getTime()+((appConf.reCheckInterval-1)*1000);
    var tmpTask = getValue("tasks");
    var st = 0;
    if (!tmpTask) setValue("tasks",tasks); else tasks = tmpTask; 
    //for (var v in tasks) if (tasks[v][0]) for (var b in tasks[v][0]) if (b==0) {tasks[v][0][b].aTime = nextPsTime+(st*2000);st++} else delete tasks[v][0][b];
    for (var v in tasks) for (var t in tasks[v]) for (var b in tasks[v][t]) if (!tasks[v][t][b].id) {tasks[v][t][b].id = tasks[v][t][b].gId}; // upgrade tasks value from versions 0.10.0 beta
}
function createTaskCommand(v,t,b,ind,el) {
//    if (t>0) el.appendChild($img({src:"img/x.gif",class:"tau-cmd-edit"}));
//    else el.appendChild($img({src:"img/x.gif",class:"tau-cmd-none"}));
    var cmdDel = $img({src:"img/x.gif",title:"Delete Task",alt:"Delete Task",class:"tau-cmd-del"});
    el.appendChild(cmdDel);
    cmdDel.addEventListener('click',function() { 
        delTask(v,t,b); 
        createTaskTable(); 
        if (t==0 && b==0 && v==actV) {
            var tauGenLnk = $g("tauAutoGenLink");
            if (tauGenLnk) tauGenLnk.innerHTML = textLinkCmd[0];
        }
    },false);
    
}
function createTaskTable() {
    var taskTable = $t({class:'tau-task-table'});
    var headerRow = $r();
    mainWin.contentEl.innerHTML = "";
    mainWin.contentEl.appendChild(taskTable);
    taskTable.appendChild(headerRow);
    for (var i=0;i<=6;i++)
        headerRow.appendChild($c(textTaskHead[i],{class:'tau-task-table-header'}));

    var haveTask = false;
    for (var v in tasks) {
        var ind = 0;
        for (var t in tasks[v]) {
            for (var b in tasks[v][t]) {
                var tRow = $r();
                var tCls = "tau-task-item-cell" + (t==0?(b==0?" tau-task-item-auto":" tau-task-item-gen"):"");
                taskTable.appendChild(tRow);
                tRow.appendChild($c(villages[v].Name,{class:tCls}));
                tRow.appendChild($c(textTaskType[t],{class:tCls}));
                tRow.appendChild($c(tasks[v][t][b].name,{class:tCls}));
                var aCond = textActCond[tasks[v][t][b].aCond.type];
                switch (tasks[v][t][b].aCond.type) {
                    case 3: aCond = getValueStr(aCond,getFullTimeStr((new Date(tasks[v][t][b].aCond.doIn))));break;
                    //case 4: aCond = getValueStr(aCond,getFullTimeStr((new Date(tasks[v][t][b].aCond.doAt))));break;
                }
                tRow.appendChild($c(aCond,{class:tCls}));
                var rCond = textRepCond[tasks[v][t][b].rCond.type];
                switch (tasks[v][t][b].rCond.type) {
                    case 3: rCond = getValueStr(rCond,tasks[v][t][b].rCond.toLvl);break;
                    case 4: rCond = getValueStr(rCond,tasks[v][t][b].rCond.troop);break;
                    case 5: 
                        if (rCond,tasks[v][t][b].rCond.more >= 0) rCond = getValueStr(rCond,tasks[v][t][b].rCond.more);
                        else rCond = getValueStr(rCond,"∞");
                        break;
                }
                tRow.appendChild($c(rCond,{class:tCls}));
                var time = new Date(tasks[v][t][b].aTime);
                tRow.appendChild($c(getDateFullTimeStr(time),{class:tCls}));
                var cmdCell = $c("",{class:tCls});
                tRow.appendChild(cmdCell);
                createTaskCommand(v,t,b,ind,cmdCell);
                ind++;
                haveTask = true;
            }
        }
    }
    if (!haveTask) {
        var emptyRow = $r();
        taskTable.appendChild(emptyRow);
        emptyRow.appendChild($c("No task avaliable",{class:'tau-task-item-none',colspan:7,style:"text-align:center;"}));
    }
}
function createMainWindow() {
    mainWin = new Window({id:'tauMainWin',title:'Automatic Upgrade',zIndex:2000,closable:false,
        onAfterMove:function(el,pos) {appConf.winPos.left=pos[0];appConf.winPos.top=pos[1];setValue("appConf",appConf);}});
    var tSetting = $d('',{class:'tau-tool tau-tool-gear'});
    mainWin.titleEl.appendChild(tSetting);
    tSetting.addEventListener('click',function(){alert("This function not work now.");},false);
    tSetting.addEventListener('mouseover',function(){this.className="tau-tool tau-tool-gear-over";},false);
    tSetting.addEventListener('mouseout',function(){this.className="tau-tool tau-tool-gear";},false);
    mainWin.topBarEl.style.display = "none";
    //mainWin.topBarEl.appendChild($l("Priority by: ",{'for':'cbPriority',style:"margin: 0px 5px;"}));    
    //var cbPriority = $s({id:'cbPriority'});
    //mainWin.topBarEl.appendChild(cbPriority);
    //cbPriority.appendChild($o("Condition","0"));
    //cbPriority.appendChild($o("Sequence","1"));
    //cbPriority.selectedIndex = 0;
    if (appConf.winPos.left < 0) appConf.winPos.left = 0;
    if (appConf.winPos.top < 0) appConf.winPos.top = 0;
    mainWin.setPos(appConf.winPos.left,appConf.winPos.top);
    createTaskTable();
    var sVer = $d("Version ",{style:'float:right'});
    var verLnk = $a(SCRIPTVER,{href:jsVoid,style:'font-weight:normal;color:#333;'});
    verLnk.addEventListener('click',updScript,false);    
    mainWin.bottomBarEl.appendChild(sVer);
    sVer.appendChild(verLnk);
    mainWin.bottomBarEl.appendChild($txt("Script Status:"));
    var status = $a((appConf.scriptPause?'<span style="color:red;">Pause</span>':'Running'),{style:'margin:0px 5px;cursor:pointer;'});
    mainWin.bottomBarEl.appendChild(status);
    status.addEventListener('click',function(){if(appConf.scriptPause) this.innerHTML = "Running"; else this.innerHTML = '<span style="color:red;">Pause</span>'; appConf.scriptPause = !appConf.scriptPause; setValue("appConf",appConf);},false);
    if (appConf.userInfo.userName == 'ThunderStorm') {
        var cLnk = $a("config",{style:'margin-right:5px;cursor:pointer;'});
        var vLnk = $a("villages",{style:'margin-right:5px;cursor:pointer;'});
        var tLnk = $a("tasks",{style:'margin-right:5px;cursor:pointer;'});
        mainWin.bottomBarEl.appendChild(cLnk);
        mainWin.bottomBarEl.appendChild(vLnk);
        mainWin.bottomBarEl.appendChild(tLnk);
        cLnk.addEventListener('click',function(){log(0,"config = "+uneval(appConf));},false);
        vLnk.addEventListener('click',function(){for (var v in villages) log(0,"villages["+v+"] = "+uneval(villages[v]));},false);
        tLnk.addEventListener('click',function(){for (var v in tasks) for (var t in tasks[v]) for (var b in tasks[v][t]) log(0,"tasks["+v+"]["+t+"]["+b+"] = "+uneval(tasks[v][t][b]));},false);
    }
}
function createInfoWindow(title,message,delay) {
    var infoWin = new Window({title:title,zIndex:2100,closable:false,tbarHide:true,bbarHide:true,html:'<div style="padding: 10px 20px;">'+message+'</div>'});    
    window.setTimeout(function() { removeElement(infoWin.el); }, delay);
}
function getVillageBiP(vId,rNode) {
	var divName = "building_contract";
	var dlB = $xf("id('"+divName+"')",'f',rNode);
	var dEnd, tdD, tdDS, bName;
	villages[vId].BiP = new Array();
	if (!dlB) {divName = "building_contract2"; dlB = $xf("id('"+divName+"')",'f',rNode); if (!dlB) {divName = "lbau1"; dlB = $xf("id('"+divName+"')",'f',rNode); if (!dlB) {divName = "lbau2"; dlB = $xf("id('"+divName+"')",'f',rNode);};};};
	if (dlB) {
		var BiPtb = $xf("//div[@id='" + divName + "']//table | //div[@id='" + dmid1 + "']//table[@id='" + divName + "']",'f',rNode);
		for (xi = 0; xi < BiPtb.rows.length; xi++) {
			if (BiPtb.rows[xi].cells.length > 1) {
				tdD = BiPtb.rows[xi].cells[2];
				tdDS = tdD.getElementsByTagName("SPAN")[0];
				dEnd = new Date();
				dEnd.setTime(dEnd.getTime() + toSeconds(tdDS.textContent) * 1000);
				bName = BiPtb.rows[xi].cells[1].textContent.split(" (");
				bName[1] = bName[1].split(" ")[1].replace(")","");
				villages[vId].BiP[villages[vId].BiP.length] = [bName[0], bName[1], dEnd.getTime()];
			};
		};
	};
	setValue("villages",villages);
	log(0,"BiP = "+uneval(villages[vId].BiP));
	return villages[vId].BiP;
}
// calculate the remaining time of the building is ready to build in milisecond.
// parameters (village id, next building level, array of current resources, array of current production per hour)
function getBuildReadyTime(gId,lvl,cRes,cProd) {
	return calculateReadyTime(bCost[gId][lvl],cRes,cProd);
}
function calculateReadyTime(rRes,cRes,cProd) {
//    log(0,"calculateReadyTime("+uneval(rRes)+","+uneval(cRes)+","+uneval(cProd)+")");
	var remRes = [0,0,0,0];
	var maxRemTime = 0;
	for (var i = 0; i < 4; i++) {
		var msProd = 3600000 / cProd[i];			
		remRes[i] = rRes[i] - cRes[i];
		var remTime = remRes[i] * msProd;
		if (maxRemTime < remTime || i == 0) maxRemTime = remTime;
	}
	return maxRemTime;
}
function calculateTrainNum(rRes,cRes) {
    var minNum = 0;
    for (var i = 0; i < 4; i++) {
        var minR = FLOOR(cRes[i] / rRes[i]);
        if (minR < minNum || i == 0) minNum = minR;
    }
    return minNum;
}
function getBuildUrlOrSetTime(vId,tType,bId) {
	log(3,"come to getBuildUrlOrSetTime: Village ID="+vId+", Village Newdid="+villages[vId].Newdid+", Task Type="+tType+", Building Index="+bId);
	var url = "/build.php?newdid=" + villages[vId].Newdid + "&id=" + bId;
	var gbUrl = new XMLHttpRequest();
	gbUrl.open('GET', url, false);
	gbUrl.send(null);
	if (gbUrl.readyState == 4) {
		if (gbUrl.status == 200) {
			var ad = ajax2DIV(gbUrl);
			if (isLoginPage(ad)) location.href = "/village1.php";
			if (tType == "0" || tType == "1" || tType == "2") { // upgrade
                var bhName = $xf("//h1",'f',ad);
                var bName = bhName.textContent;
                var bns = bName.split(" ");
                var bLevel = parseInt(bns[bns.length-1]);
                if (tasks[vId][tType][bId].rCond.type == 3 && bLevel >= tasks[vId][tType][bId].rCond.toLvl) {
                    delTask(vId,tType,bId);
                    return false;
                }
		        var upgbdurl = $xf('id("' + dmid2 + '")//a[contains(@href,"?a=")]','f',ad);
		        if (upgbdurl) {
		            var abUrl = upgbdurl.href;
			        if (abUrl.indexOf("&b=") != -1) {
		                log(3,"Construction Master Enabled, therefore stopping.");
		                //delTask(vId,tType,bId);
		                return false;
		            }
		            abUrl = abUrl.replace(".php?",".php?newdid="+villages[vId].Newdid+"&");
				    log(3,"get the upgrade url = " + abUrl);				    
				    return abUrl;
			    } else {
			        var er = $xf('//*[@class="none"]','l',ad);
			        if (er.snapshotLength > 0) {
			            log(1,"can't get the upgrade url, error info: " + er.snapshotItem(er.snapshotLength-1).textContent);
		                tasks[vId][tType][bId].name = bName;
	                    tasks[vId][tType][bId].level = bLevel;
	                    //log(0,"tasks["+vId+"]["+tType+"]["+bId+"]="+tasks[vId][tType][bId]);
	                    getResourceInfo(vId,ad);
	                    var now = new Date();
	                    var rTime = getBuildReadyTime(tasks[vId][tType][bId].id,tasks[vId][tType][bId].level+1,villages[vId].Ress.curr,villages[vId].Ress.pphr);
	                    var bTime = 0;
	                    for (var i = 0; i < villages[vId].BiP.length; i++) if (bTime < villages[vId].BiP[i][2]) bTime = villages[vId].BiP[i][2];
	                    if (bTime > 0) bTime = bTime - now.getTime();
	                    if (bTime > 0) {
	                        if (bTime < rTime) {
	                            if (rTime - bTime > 300000) tasks[vId][tType][bId].aTime = now.getTime() + bTime + getRndTime(300000);
	                            else if (rTime - bTime > 10000) tasks[vId][tType][bId].aTime = now.getTime() + bTime + getRndTime(rTime - bTime);
	                            else tasks[vId][tType][bId].aTime = now.getTime() + bTime + getRndTime(10000);
	                        } else tasks[vId][tType][bId].aTime = now.getTime() + bTime + getRndTime(10000);
	                    } else {
	                        if (rTime > 300000) tasks[vId][tType][bId].aTime = now.getTime() + getRndTime(300000);
	                        else if (rTime > 10000) tasks[vId][tType][bId].aTime = now.getTime() + getRndTime(rTime);
	                        else tasks[vId][tType][bId].aTime = now.getTime() + getRndTime(10000);
	                    }
		                setValue("tasks",tasks);
			        } else {
			            log(1,"error can't get anything.");
			            tasks[vId][tType][bId].aTime += getRndTime(10000);
			        }
			    }
            }
            if (tType == "3") { // new building
			    var newbdurl = $xf('id("' + dmid2 + '")//a[contains(@href,"?a='+tasks[vId][tType][bId].id+'")]','f',ad);
			    if (newbdurl) {
				    log(3,"get the newbuild url = " + newbdurl.href);
				    return newbdurl.href;
			    } else {
			        var dB = $xf("id('build')",'f',ad);
			        var gId = 0;
			        if (dB) { dB.className.search(/gid(\d+)/); gId = parseInt(RegExp.$1); }
			        if (gId == tasks[vId][tType][bId].id) {
			            addTask(vId,2,bId,tasks[vId][tType][bId].id,tasks[vId][tType][bId].name,tasks[vId][tType][bId].level,
			                    tasks[vId][tType][bId].aCond,tasks[vId][tType][bId].rCond,tasks[vId][tType][bId].aTime+10000,tasks[vId][tType][bId].opts);
			            delTask(vId,tType,bId);
			        } else if (gId > 0) {
			            var bhName = $xf("//h1",'f',ad);
			            log(2,"get the other building gId = "+gId+", name = "+bhName.textContent);
			            delTask(vId,tType,bId);
			        } else {
	                    var bImg = $xf("//img[contains(@class,'g"+tasks[vId][tType][bId].id+"')]",'f',ad);
	                    if (bImg) {
                            var now = new Date();
	                        var tB = bImg.parentNode;
	                        while (tB.nodeName!='TABLE') tB = tB.parentNode;
                            var bDet = $xf(".//*[@class='none']",'l',tB);
                            if (bDet.snapshotLength > 0) {
                                log(1,"can't get the upgrade url, error info: " + bDet.snapshotItem(bDet.snapshotLength-1).textContent);
                                getResourceInfo(vId,ad);
                                var rTime = getBuildReadyTime(tasks[vId][tType][bId].id,1,villages[vId].Ress.curr,villages[vId].Ress.pphr);
                                var bTime = 0;
			                    for (var i = 0; i < villages[vId].BiP.length; i++) if (bTime < villages[vId].BiP[i][2]) bTime = villages[vId].BiP[i][2];
			                    if (bTime > 0) bTime = bTime - now.getTime();
			                    if (bTime > 0) {
			                        if (bTime < rTime) {
			                            if (rTime - bTime > 300000) tasks[vId][tType][bId].aTime = now.getTime() + bTime + getRndTime(300000);
			                            else if (rTime - bTime > 2000) tasks[vId][tType][bId].aTime = now.getTime() + bTime + getRndTime(rTime - bTime);
			                            else tasks[vId][tType][bId].aTime = now.getTime() + bTime + getRndTime(2000);
			                        } else tasks[vId][tType][bId].aTime = now.getTime() + bTime + getRndTime(2000);
			                    } else {
			                        if (rTime > 240000) tasks[vId][tType][bId].aTime = now.getTime() + getRndTime(240000);
			                        else if (rTime > 2000) tasks[vId][tType][bId].aTime = now.getTime() + getRndTime(rTime);
			                        else tasks[vId][tType][bId].aTime = now.getTime() + getRndTime(2000);
			                    }
                            } else {
                                var tds = tB.getElementsByTagName("TD");
                                var lastTd = tds[tds.length-1];
                                var reqs = lastTd.getElementsByTagName("A");
                                var reqLvls = lastTd.getElementsByTagName("SPAN");
                                if (reqs.length > 0) {
                                    var reqName = new Array();
                                    var reqGId = new Array();
                                    var reqReg = /Popup\((\d+)\,(\d+)\,[^\)]*\)/gi;
                                    var matches;
                                    var i = 0;
                                    while(matches = reqReg.exec(lastTd.innerHTML)) {
                                        reqName[i] = reqs[i].textContent;
                                        reqGId[i++] = parseInt(matches[1]);
                                    }
                                    log(1,"can't get the upgrade url, The"+lastTd.textContent.replace(/\n/g,'').replace(/\s+/g,' ')+"is required.");
                                    var bTime = 0;
		                            for (var i = 0; i < villages[vId].BiP.length; i++) if (bTime < villages[vId].BiP[i][2]) bTime = villages[vId].BiP[i][2];
		                            if (bTime > 0) tasks[vId][tType][bId].aTime = bTime;
                                    tasks[vId][tType][bId].aTime += getRndTime(300000);
                                } else {
                                    log(1,"error can't get anything.");
	                                tasks[vId][tType][bId].aTime += getRndTime(60000);
                                }
	                        }
	                    } else {
				            log(2,"building not avaliable.");
				            delTask(vId,tType,bId);
	                    }
			        }
	                setValue("tasks",tasks);
			    }
            }
            ad = null;
		}
	}
	return false;
}
function getResearchUrlOrSetTime(vId,tType,bId) {
	log(3,"come to getResearchUrlOrSetTime: Village ID="+vId+", Village Newdid="+villages[vId].Newdid+", Task Type="+tType+", Building ID="+bId);
	var ids = bId.split("_");
	var url = "/build.php?newdid=" + villages[vId].Newdid + "&id=" + ids[0];
	var grUrl = new XMLHttpRequest();
	grUrl.open('GET', url, false);
	grUrl.send(null);
	if (grUrl.readyState == 4) {
		if (grUrl.status == 200) {
			var ad = ajax2DIV(grUrl);
			if (isLoginPage(ad)) location.href = "/village1.php";
			var uid = parseInt(ids[1]) % 10;
			var uType = FLOOR(parseInt(ids[1])/10);
			if (uid == 0) { uid = 10; uType--; }
            var reschurl = $xf("//table[@class='build_details']//a[contains(@href,'a="+uid+"')]",'f',ad);
            if (reschurl) {
                var rsUrl = reschurl.href;
		        rsUrl = rsUrl.replace(".php?",".php?newdid="+villages[vId].Newdid+"&");
                log(3,"get the research url = " + rsUrl);
                return rsUrl;
            } else {
                var rImg = $xf("//table[contains(@class,'build_details')]//img[contains(@class,'u"+ids[1]+"')]",'f',ad);
                if (rImg) {
                    var pTd = rImg.parentNode;
                    while (pTd.nodeName != 'TD') pTd = pTd.parentNode;
                    var pTr = pTd.parentNode;
		            var er = $xf('.//*[@class="none"]','f',pTr);
		            if (er) {
		                log(1,"can't get the research url, error info: " + er.textContent);
		                var upImg = $xf("//table[@class='under_progress']//img[contains(@class,'u"+ids[1]+"')]",'f',ad);
		                if (upImg) {
		                    log(2,"unit is researching, delete task.");
		                    delTask(vId,tType,bId);
		                } else {
		                    getResourceInfo(vId,ad);
		                    pTd.textContent.replace(/\n/g, "").replace(/\s/g, "").search(/[^\|\d]*(\d+)\|(\d+)\|(\d+)\|(\d+).*/);
		                    var reqRes = [parseInt(RegExp.$1),parseInt(RegExp.$2),parseInt(RegExp.$3),parseInt(RegExp.$4)];
		                    var rTime = calculateReadyTime(reqRes,villages[vId].Ress.curr,villages[vId].Ress.pphr);
		                    if (rTime > 300000) tasks[vId][tType][bId].aTime += getRndTime(300000);
		                    else if (rTime > 10000) tasks[vId][tType][bId].aTime += getRndTime(rTime);
		                    else tasks[vId][tType][bId].aTime += rTime + getRndTime(10000);
		                    setValue("tasks",tasks);
		                }
		            } else {
		                var reqTr = rImg.parentNode;
		                while(reqTr.nodeName != 'TR') reqTr = reqTr.parentNode;
		                var reqText = reqTr.cells[1].innerHTML.replace(/\<br[^\>]*\>/g,", ").replace(/\<[^\>]*\>/g,"").replace(/\s+/g," ");
		                log(1,"can't get the research url, other building"+reqText+"is require. ");
		                tasks[vId][tType][bId].aTime += getRndTime(300000);
		                setValue("tasks",tasks);
		            }
		        } else {
		            log(2,"unit already research, delete task.");
		            delTask(vId,tType,bId);
		        }
            }
            ad = null;
        }
    }
    return false;
}
function getUpgradeTroopUrlOrSetTime(vId,tType,bId) {
	log(3,"come to getUpgradeTroopUrlOrSetTime: Village ID="+vId+", Village Newdid="+villages[vId].Newdid+", Task Type="+tType+", Unit ID="+bId);
	var ids = bId.split("_");
	var url = "/build.php?newdid=" + villages[vId].Newdid + "&id=" + ids[0];
	var grUrl = new XMLHttpRequest();
	grUrl.open('GET', url, false);
	grUrl.send(null);
	if (grUrl.readyState == 4) {
		if (grUrl.status == 200) {
			var ad = ajax2DIV(grUrl);
			if (isLoginPage(ad)) location.href = "/village1.php";
			var uid = parseInt(ids[1]) % 10;
			var uType = FLOOR(parseInt(ids[1])/10);
			if (uid == 0) { uid = 10; uType--; }
            var uptrurl = $xf("//table[@class='build_details']//a[contains(@href,'a="+uid+"')]",'f',ad);
            if (uptrurl) {
                var upUrl = uptrurl.href;
		        upUrl = upUrl.replace(".php?",".php?newdid="+villages[vId].Newdid+"&");
                log(3,"get the upgrade troop url = " + upUrl);
                return upUrl;
            } else {
                var bhName = $xf("//h1",'f',ad);
                var bName = bhName.textContent.split(" ");
                bName.splice(bName.length - 2, 2);
                var tImg = $xf("//table[contains(@class,'build_details')]//img[contains(@class,'u"+ids[1]+"')]",'f',ad);
                if (tImg) {
                    var pTd = tImg.parentNode;
                    while (pTd.nodeName != 'TD') pTd = pTd.parentNode;
                    var pTr = pTd.parentNode;
		            var er = $xf('.//*[@class="none"]','f',pTr);
		            if (er) {
		                log(1,"can't get the upgrade troop url, error info: " + er.textContent);
                        tImg.parentNode.textContent.search(/\(.*\s+([\d\+]*)\)/);
                        var tLvl = RegExp.$1;
                        var tName = tImg.parentNode.textContent.replace(/[\(\)]/g,"").replace(tLvl,eval(tLvl));
                        tLvl = eval(tLvl);
    	                if (tasks[vId][tType][bId].rCond.type == 3 && tLvl >= tasks[vId][tType][bId].rCond.toLvl) delTask(vId,tType,bId);
    	                else {
                            var now = new Date();
                            tasks[vId][tType][bId].name = bName+' -'+tName;
                            tasks[vId][tType][bId].level = tLvl;
	                        getResourceInfo(vId,ad);
	                        pTd.textContent.replace(/\n/g, "").replace(/\s/g, "").search(/[^\|\d]*(\d+)\|(\d+)\|(\d+)\|(\d+).*/);
	                        var reqRes = [parseInt(RegExp.$1),parseInt(RegExp.$2),parseInt(RegExp.$3),parseInt(RegExp.$4)];
	                        var rTime = calculateReadyTime(reqRes,villages[vId].Ress.curr,villages[vId].Ress.pphr);
		                    var uImg = $xf("//table[@class='under_progress']//img[contains(@class,'unit')]",'l',ad);
		                    if (uImg.snapshotLength > 0) {
		                        var uTime = 0;
		                        for (var p = 0; p < uImg.snapshotLength; p++) {
		                            var upTr = uImg.snapshotItem(p).parentNode;
		                            while(upTr.nodeName != 'TR') upTr = upTr.parentNode;
		                            var rT = toSeconds(upTr.cells[1].textContent) * 1000;
		                            if (rT > uTime) uTime = rT;
		                        }		                        
		                        if (uTime < rTime) {
		                            if (rTime - uTime > 300000) tasks[vId][tType][bId].aTime = now.getTime() + uTime + getRndTime(300000);
		                            else if (rTime - uTime > 10000) tasks[vId][tType][bId].aTime = now.getTime() + uTime + getRndTime(rTime - uTime);
		                            else tasks[vId][tType][bId].aTime = now.getTime() + uTime + getRndTime(2000);
		                        } else tasks[vId][tType][bId].aTime = now.getTime() + uTime + getRndTime(2000);
		                    } else {
		                        if (rTime > 300000) tasks[vId][tType][bId].aTime = now.getTime() + getRndTime(300000);
		                        else if (rTime > 10000) tasks[vId][tType][bId].aTime = now.getTime() + getRndTime(rTime);
		                        else tasks[vId][tType][bId].aTime = now.getTime() + getRndTime(10000);
		                    }
		                }
		            } else {
		                var reqText = reqTr.cells[1].innerHTML.replace(/\<br[^\>]*\>/g,", ").replace(/\<[^\>]*\>/g,"").replace(/\s+/g," ");
		                log(2,"can't get the upgrade troop url, other building"+reqText+"is require. ");
		                tasks[vId][tType][bId].aTime += getRndTime(300000);
		            }
                    setValue("tasks",tasks);
		        } else {
		            log(2,"unit can't upgrade any more, delete task.");
		            delTask(vId,tType,bId);
		        }
            }
            ad = null;
        }
    }
    return false;
}
function getTrainDataOrSetTime(vId, tType, bId) {
	log(3,"come to getTrainDataOrSetTime: Village ID="+vId+", Village Newdid="+villages[vId].Newdid+", Task Type="+tType+", Train Building ID="+bId+", Troops="+uneval(tasks[vId][tType][bId].opts));
	var url = "/build.php?newdid=" + villages[vId].Newdid + "&id=" + bId;
	var tUrl = new XMLHttpRequest();
	tUrl.open('GET', url, false);
	tUrl.send(null);
	if (tUrl.readyState == 4) {
		if (tUrl.status == 200) {
			var ad = ajax2DIV(tUrl);
			if (isLoginPage(ad)) location.href = "/village1.php";
		    var allInput = $xf("//form[contains(@action,'build.php')]//input",'l',ad);
            var retData = "";            
		    var tLength = 0;
		    for (tId in tasks[vId][tType][bId].opts) tLength++;
		    var totalTrain = 0;
            getResourceInfo(vId,ad);
            for (i = 0; i < allInput.snapshotLength; i++) {
                var inp = allInput.snapshotItem(i);
                if (inp.name.match(/t(\d+)/)) {
                    var tNum = parseInt(RegExp.$1);
                    var tTNum = appConf.userInfo.raceId+tNum-1;
                    var pTr = inp.parentNode;
                    while (pTr.nodeName!='TR') pTr = pTr.parentNode;
                    var pTd = $xf(".//td[@class='desc']",'f',pTr);
                    var val = 0;
                    if (tasks[vId][tType][bId].opts[tTNum]) {
                        pTd.textContent.replace(/\n/g, "").replace(/\s/g, "").search(/[^\|\d]*(\d+)\|(\d+)\|(\d+)\|(\d+).*/);
                        var reqRes = [parseInt(RegExp.$1),parseInt(RegExp.$2),parseInt(RegExp.$3),parseInt(RegExp.$4)];
                        var cVal = calculateTrainNum(reqRes,villages[vId].Ress.curr);
                        cVal = FLOOR(cVal / tLength);
                        val = tasks[vId][tType][bId].opts[tTNum].num;
                        if (cVal < val) val = cVal;
                    }
                    totalTrain += val;
                    retData += (retData==""?"":"&") + inp.name + "=" + val;
                } else if (inp.type == 'image') {
                    retData += (retData==""?"":"&") + inp.name + "=" + inp.value;
                    retData += (retData==""?"":"&") + inp.name + ".x=" + FLOOR(5+(37*Math.random()));
                    retData += (retData==""?"":"&") + inp.name + ".y=" + FLOOR(5+(10*Math.random()));                    
                } else {
                    retData += (retData==""?"":"&") + inp.name + "=" + inp.value;
                }
            }
            tasks[vId][tType][bId].aTime = (new Date()).getTime() + getRndTime(300000);
            if (totalTrain > 0) return encodeURI(retData);
            else return false;
		}
	}
    return false;
}
function getTransDataOrSetTime(vId,tType,bId){
	log(3,"come to getTransDataOrSetTime: Village ID="+vId+", Village Newdid="+villages[vId].Newdid+", Task Type="+tType+", Train Building ID="+bId+", Transport="+uneval(tasks[vId][tType][bId].opts.res));
	var bIdLoc = bId.split("_");
	var url = "/build.php?newdid=" + villages[vId].Newdid + "&id=" + bIdLoc[0];
	var tUrl = new XMLHttpRequest();
	var x = (bIdLoc[1].substr(0,1)=="M"?-1:1) * parseInt(bIdLoc[1].substr(1));
	var y = (bIdLoc[2].substr(0,1)=="M"?-1:1) * parseInt(bIdLoc[2].substr(1));
	tUrl.open('GET', url, false);
	tUrl.send(null);
	if (tUrl.readyState == 4) {
		if (tUrl.status == 200) {
			var ad = ajax2DIV(tUrl);
			if (isLoginPage(ad)) location.href = "/village1.php";
		    var allInput = $xf("//form[contains(@action,'build.php')]//input",'l',ad);
		    var notEnought = false;
            var retData = "";
            getResourceInfo(vId,ad);
            for (i=0;i<allInput.snapshotLength;i++) {
                var inp = allInput.snapshotItem(i);
                if (inp.name.match(/r(\d)/)) {
                    var rNum = parseInt(RegExp.$1);
                    if (villages[vId].Ress.curr[i-1] < tasks[vId][tType][bId].opts.res[i-1]) {
                        notEnought = true;
                        break;
                    }
                    retData += (retData==""?"":"&") + inp.name + "=" + tasks[vId][tType][bId].opts.res[i-1];
                } else if (inp.name == 'x') {
                    retData += (retData==""?"":"&") + "x=" + x;
                } else if (inp.name == 'y') {
                    retData += (retData==""?"":"&") + "y=" + y;
                } else if (inp.type == 'image') {
                    retData += (retData==""?"":"&") + inp.name + "=" + inp.value;
                    retData += (retData==""?"":"&") + inp.name + ".x=" + FLOOR(5+(37*Math.random()));
                    retData += (retData==""?"":"&") + inp.name + ".y=" + FLOOR(5+(10*Math.random()));                    
                } else {
                    retData += (retData==""?"":"&") + inp.name + "=" + inp.value;
                }
            }
            if (notEnought) { // set new time
                var rTime = calculateReadyTime(tasks[vId][tType][bId].opts.res,villages[vId].Ress.curr,villages[vId].Ress.pphr);
                if (rTime > 300000) tasks[vId][tType][bId].aTime += getRndTime(300000);
                else if (rTime > 10000) tasks[vId][tType][bId].aTime += getRndTime(rTime);
                else tasks[vId][tType][bId].aTime += rTime + getRndTime(10000);
                setValue("tasks",tasks);
                return false;
            }
		}
	}
    return retData;
}

function getDemoDataOrSetTime(vId,tType,dIds) {
	log(3,"come to getDemoDataOrSetTime: Village ID="+vId+", Village Newdid="+villages[vId].Newdid+", Task Type="+tType+", Building & Demolish ID="+dIds);
	var ids = dIds.split("_");
	var url = "/build.php?newdid=" + villages[vId].Newdid + "&id=" + ids[0];
	var tUrl = new XMLHttpRequest();
	tUrl.open('GET', url, false);
	tUrl.send(null);
	if (tUrl.readyState == 4) {
		if (tUrl.status == 200) {
			var ad = ajax2DIV(tUrl);
			if (isLoginPage(ad)) location.href = "/village1.php";
		    var allInput = $xf("//form[contains(@action,'build.php')]//input | //form[contains(@action,'build.php')]//select",'l',ad);
		    if (allInput.snapshotLength > 0) {
                var retData = "";
		        var cName = "";
		        var cLvl = 0;
                getResourceInfo(vId,ad);
                for (i = 0; i < allInput.snapshotLength; i++) {
                    var inp = allInput.snapshotItem(i);
                    if (inp.name == 'abriss') {
                        retData += (retData==""?"":"&") + inp.name + "=" + ids[1];
                        for (s = 0; s < inp.options.length; s++) if (inp.options[s].value == ids[1]) cName = inp.options[s].text;
                        tasks[vId][tType][dIds].name = cName;
                        if (cName.match(/\s(\d+)$/)) cLvl = parseInt(RegExp.$1);
                    } else if (inp.type == 'image') {
                        retData += (retData==""?"":"&") + inp.name + "=" + inp.value;
                        retData += (retData==""?"":"&") + inp.name + ".x=" + FLOOR(5+(37*Math.random()));
                        retData += (retData==""?"":"&") + inp.name + ".y=" + FLOOR(5+(10*Math.random()));
                    } else {
                        retData += (retData==""?"":"&") + inp.name + "=" + inp.value;
                    }
                }
                if (cLvl <= tasks[vId][tType][dIds].rCond.toLvl) { delTask(vId,tType,dIds); return false; }
                else setValue("tasks",tasks);
                return encodeURI(retData);
            } else {
                var tbDemo = $xf("//table[@id='demolish']",'f',ad);
                if (tbDemo) {
                    var sTimer = $xf("./span[@id='timer1']",'f',tbDemo);
                    if (sTimer) {
                        var rTime = toSeconds(sTimer.textContent);
                        tasks[vId][tType][dIds].aTime = (new Date()).getTime() + rTime + getRndTime(5000);
                    } else {
                        tasks[vId][tType][dIds].aTime = (new Date()).getTime() + getRndTime(60000);
                    }
                } else {
                    tasks[vId][tType][dIds].aTime = (new Date()).getTime() + getRndTime(60000);
                }
            }
            setValue("tasks",tasks);
		}
	}
    return false;
}
function processAutoUpgrade(v) {
    var vId = v;
    log(3,"come to processAutoUpgrade("+v+")");
    var url = "/village1.php?newdid="+villages[v].Newdid;
	var dUrl = new XMLHttpRequest();
	dUrl.open('GET', url, false);
	dUrl.send(null);
	if (dUrl.readyState == 4) {
		if (dUrl.status == 200) {
//  	    log(3,"response callback for processAutoUpgrade("+v+")");
		    var aTitle,tipo;
		    var ad = ajax2DIV(dUrl);
            var allRess = $xf('id("rx")//area[contains(@href,"build.php?id=")]','l', ad);
		    var rDiv = $xf("//div[starts-with(@id,'village_map')]",'f',ad);
			var calTime = new Date();
			var minTime = 0;
		    var maxResLvl = 10;
		    var BiP_Ind = -1;
		    var corpFirst = false;
            var targetTask = null;
		    if (rDiv) aTitle = $xf("//map[starts-with(@id, 'rx')]",'f',ad); else {rDiv = $xf("//div[starts-with(@id,'f')]",'f',ad); aTitle = $xf("//map[starts-with(@name, 'rx')]",'f',ad);};
		    if (rDiv) {if (rDiv.className) rDiv.className.search(/f(\d+)/); else rDiv.id.search(/f(\d+)/); tipo = RegExp.$1;};
		    villages[vId].rType = parseInt(tipo)-1;
		    setValue("villages",villages);
		    getResourceInfo(vId,ad);
		    getVillageBiP(vId,ad);
		    corpFirst = (villages[vId].Ress.pphr[3] <= 10);
			for (var i = 0; i < allRess.snapshotLength; i++) {
				var tName = allRess.snapshotItem(i).title.split(" ");
				var tResName = "";
				var tResLevel = parseInt(tName[tName.length-1]);
			    var bId = parseInt(allRess.snapshotItem(i).href.split("id=")[1]);
				var gId = dist[villages[vId].rType][bId-1];				
				for (var n = 0; n < tName.length - 2; n++) tResName += (n>0?" ":"") + tName[n];
			    for (p = 0; p < villages[vId].BiP.length && BiP_Ind < 0; p++) if (tResName == villages[vId].BiP[p][0]) BiP_Ind = p;
				if (v==appConf.userInfo.capVid) maxResLvl = 20;
				if (tResLevel < maxResLvl) {
                    var rTime = getBuildReadyTime(gId,tResLevel+1,villages[vId].Ress.curr,villages[vId].Ress.pphr);
//                    log(0,"Res Ind:"+bId+",Res Id:"+gId+",to Lvl:"+(tResLevel+1)+",Corp First:"+corpFirst);
                    var newTime = new Date();
                    if (corpFirst) {
                        if (gId == 4 && (minTime > rTime || !targetTask)) {
					        minTime = rTime;
					        targetTask = {bId:bId,gId:gId,bName:tName.join(" "),lvl:tResLevel,aTime:calTime.getTime()+rTime};
					    }
                    } else {
				        if (minTime > rTime || !targetTask) { 
					        minTime = rTime;
					        targetTask = {bId:bId,gId:gId,bName:tName.join(" "),lvl:tResLevel,aTime:calTime.getTime()+rTime};
				        }
				    }
				}
			}
			if (targetTask!=null) {
		        //createInfoWindow('Auto generate upgrade task','Generate upgrade task '+villages[v].Name+' - '+targetTask.bName,appConf.messageDelay*1000);
			    for (var b in tasks[vId][0]) if (b>0) delete tasks[vId][0][b];    // delete old generate task.
			    var aTime = targetTask.aTime;
			    var bTime = calTime.getTime();
			    if (appConf.userInfo.raceId > 1) {
			        for (i = 0; i < villages[vId].BiP.length; i++) 
			            if (bTime < villages[vId].BiP[i][2]) { bTime = villages[vId].BiP[i][2]; BiP_Ind = i; }
                } else {
                    if (BiP_Ind >= 0) bTime = villages[vId].BiP[BiP_Ind][2];
                }
			    if (BiP_Ind < 0) {
			        var nTime = aTime - calTime.getTime();
                    if (nTime > 300000) tasks[vId][0][0].aTime = calTime.getTime() + getRndTime(300000);
                    else if (nTime > 10000) tasks[vId][0][0].aTime = calTime.getTime() + getRndTime(nTime);
                    else if (nTime > 0) tasks[vId][0][0].aTime = calTime.getTime() + nTime + getRndTime(10000);
                    else tasks[vId][0][0].aTime = calTime.getTime() + getRndTime(10000);
		    	    addTask(vId,0,targetTask.bId,targetTask.gId,targetTask.bName,targetTask.lvl,{type:0},{type:3,toLvl:targetTask.lvl + 1},aTime,{});
			    } else {
			        log(3,"Found the upgrading in progress, check again at "+getFullDateFullTimeStr(new Date(bTime+1000)));
			        tasks[vId][0][0].aTime = bTime + 1000;
			        if (bTime > aTime) addTask(vId,0,targetTask.bId,targetTask.gId,targetTask.bName,targetTask.lvl,{type:0},{type:3,toLvl:targetTask.lvl + 1},bTime+1000,{});
			        else addTask(vId,0,targetTask.bId,targetTask.gId,targetTask.bName,targetTask.lvl,{type:0},{type:3,toLvl:targetTask.lvl + 1},aTime+1000,{});
		    	}
			} else {
			    if (allRess.snapshotLength > 0) {
			        createInfoWindow('Auto generate upgrade task','Auto upgrade resources '+villages[v].Name+' are completed, Delete task...',appConf.messageDelay*1000);
                    log(3,"Auto upgrade resources for village "+villages[v].Name+" are completed, Delete task...");
	    		    delTask(v,0,0);
	    		} else {
	    		    createInfoWindow('Auto generate upgrade task','Auto upgrade resources '+villages[v].Name+', resource page are not found',appConf.messageDelay*1000);
                    log(3,"Auto upgrade resources for village "+villages[v].Name+", resource page are not found, refresh page...");
                    tasks[v][0][0].aTime = calTime.getTime() + getRndTime(10000);
    				//location.href = 'village1.php?newdid='+villages[v].Newdid;
	    		}
			}
            setValue("tasks",tasks);
            ad = null;
		}
	}
	doingTask = false;
	if (v!=actV) {
        var url = "/village1.php?newdid="+villages[actV].Newdid;
	    var rUrl = new XMLHttpRequest();
	    rUrl.open('GET', url, false);
	    rUrl.send(null);
	}
}
function processBuildOrUpgrade(vId,tType,bId) {
    var bUrl = getBuildUrlOrSetTime(vId,tType,bId);
	if (bUrl) {
		createInfoWindow('Build or Upgrade task','Start build '+villages[vId].Name+' - '+tasks[vId][tType][bId].name+' now.',appConf.messageDelay*1000);
		log(3,"start build " + tasks[vId][tType][bId].name + " now")
		log(3,"GM_xmlhttpRequest url = " + bUrl);
		GM_xmlhttpRequest({
			method: 'GET',
			url: bUrl,
			headers: "",
			onload: function(){
				log(3,"built ok!");
				var lastUpg = [bId,0,"",0];
				if (tasks[vId] && tasks[vId][tType] && tasks[vId][tType][bId]) {
				    lastUpg[1] = tasks[vId][tType][bId].id;
				    lastUpg[2] = tasks[vId][tType][bId].name;
				    lastUpg[3] = tasks[vId][tType][bId].level;
				}
				villages[vId].lastBuildingUpg = lastUpg;
				log(0,"last building upgrade:"+uneval(villages[vId].lastBuildingUpg));
				setValue("villages",villages);
				if (appConf.refreshAfterDone) location.href = 'village1.php?newdid='+villages[vId].Newdid;
				else doingTask = false;
			},
			onerror: function(){
			    createInfoWindow('Build or Upgrade task','Build '+tasks[vId][tType][bId].name+' error!',appConf.messageDelay*1000);
			    log(3,"build error!");
			    doingTask = false;
		        if (tType == "0" || tType == "1") delTask(vId,tType,bId);
			}
		});
	} else {
	    doingTask = false;
	    if (tType == "0" || tType == "1") delTask(vId,tType,bId);
	}
    if (vId != actV) {
        var url = "/village1.php?newdid="+villages[actV].Newdid;
        var rUrl = new XMLHttpRequest();
        rUrl.open('GET', url, false);
        rUrl.send(null);
    }
}
function processResearch(vId,tType,bId) {
    var rUrl = getResearchUrlOrSetTime(vId,tType,bId);
	if (rUrl) {
	    createInfoWindow('Research task','Start research '+villages[vId].Name+' - '+tasks[vId][tType][bId].name+' now.',appConf.messageDelay*1000);
		log(3,"start research " + tasks[vId][tType][bId].name + " now")
		log(3,"GM_xmlhttpRequest url = " + rUrl);
		GM_xmlhttpRequest({
			method: 'GET',
			url: rUrl,
			headers: "",
			onload: function(){
			    var ids = bId.split("_");
				log(3,"research ok!");
				if (appConf.refreshAfterDone) location.href = 'build.php?newdid='+villages[vId].Newdid+'&id='+ids[0];
				else doingTask = false;
			},
			onerror: function(){ 
			    createInfoWindow('Research task','Research '+tasks[vId][tType][bId].name+' error!',appConf.messageDelay*1000);
			    log(3,"research error!"); 
			    doingTask = false;
			}
		});
	}
	else doingTask = false;
    if (vId != actV) {
        var url = "/village1.php?newdid="+villages[actV].Newdid;
        var rUrl = new XMLHttpRequest();
        rUrl.open('GET', url, false);
        rUrl.send(null);
    }
}
function processUpgradeTroop(vId,tType,bId) {
    var rUrl = getUpgradeTroopUrlOrSetTime(vId,tType,bId);
	if (rUrl) {
	    createInfoWindow('Upgrade task','Start upgrade '+villages[vId].Name+' - '+tasks[vId][tType][bId].name+' now.',appConf.messageDelay*1000);
		log(3,"start upgrade " + tasks[vId][tType][bId].name + " now")
		log(3,"GM_xmlhttpRequest url = " + rUrl);
		GM_xmlhttpRequest({
			method: 'GET',
			url: rUrl,
			headers: "",
			onload: function(){
			    var ids = bId.split("_");
				log(3,"upgrade troop ok!");
				if (appConf.refreshAfterDone) location.href = 'build.php?newdid='+villages[vId].Newdid+'&id='+ids[0];
				else doingTask = false;
			},
			onerror: function(){
			    createInfoWindow('Upgrade task','Upgrade '+tasks[vId][tType][bId].name+' error!',appConf.messageDelay*1000);
			    log(3,"upgrade troop error!");
			    doingTask = false;
			}
		});
	}
	else doingTask = false;
    if (vId != actV) {
        var url = "/village1.php?newdid="+villages[actV].Newdid;
        var rUrl = new XMLHttpRequest();
        rUrl.open('GET', url, false);
        rUrl.send(null);
    }
}
function processTrain(vId,tType,bId) {
    var trainData = getTrainDataOrSetTime(vId,tType,bId);
    var url = "/build.php?newdid=" + villages[vId].Newdid;
    if (trainData) {
        createInfoWindow('Train task','Start train '+villages[vId].Name+' - '+tasks[vId][tType][bId].name+' now.',appConf.messageDelay*1000);
		log(3,"start train " + tasks[vId][tType][bId].name + " " + uneval(tasks[vId][tType][bId].opts))
		log(3,"GM_xmlhttpRequest url = " + url + ", data = " + trainData);
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
            data: trainData,
			onload: function(){
				log(3,"train troop ok!");
				var tData = trainData.split("&");
				var total = 0;
				var remName = "";
				var remVal = "";
				for (v in tData) {
				    var vr = tData[v].split("=");
				    if (vr[0].match(/t(\d+)/)) {
				        var tId = appConf.userInfo.raceId + parseInt(RegExp.$1) - 1;
				        if (tasks[vId][tType][bId].opts[tId]) {
				            if (tasks[vId][tType][bId].opts[tId].num > 0) {
				                tasks[vId][tType][bId].opts[tId].num -= parseInt(vr[1]);
				                remName += (remName==""?"":",") + tasks[vId][tType][bId].opts[tId].name;
				                remVal += (remVal==""?"":",") + tasks[vId][tType][bId].opts[tId].num;
				                total += tasks[vId][tType][bId].opts[tId].num;
				            } else {
				                delete tasks[vId][tType][bId].opts[tId];
				            }
				        } else { log(3,"not found id:"+tId+" opts:"+uneval(tasks[vId][tType][bId].opts)); }
				    }
				}
				if (total > 0) { 
				    tasks[vId][tType][bId].name = remName;
				    tasks[vId][tType][bId].rCond.troop = remVal;
				    var nTime = new Date();
			        if (tasks[vId][tType][bId].opts.dTime > 0) {
			            tasks[vId][tType][bId].aTime = nTime.getTime() + getRndTime(tasks[vId][tType][bId].opts.dTime);
			        }
			        //else {
			        //    tasks[vId][tType][bId].aTime = nTime.getTime() + getRndTime(300000);
			        //}
			        setValue("tasks",tasks);
				}
				else delTask(vId,tType,bId);
				setValue("tasks",tasks);
				if (appConf.refreshAfterDone) location.href = 'build.php?newdid='+villages[vId].Newdid+'&id='+bId;
				else doingTask = false;
			},
			onerror: function(){
			    createInfoWindow('Train task','Train '+tasks[vId][tType][bId].name+' '+uneval(tasks[vId][tType][bId].opts)+' error!',appConf.messageDelay*1000);
			    log(3,"train troop error!");
			    doingTask = false;
			}
		});
    }
    else doingTask = false;
    if (vId != actV) {
        var url = "/village1.php?newdid="+villages[actV].Newdid;
        var rUrl = new XMLHttpRequest();
        rUrl.open('GET', url, false);
        rUrl.send(null);
    }
}
function processTransport(vId,tType,bId) {
    var transData = getTransDataOrSetTime(vId,tType,bId);
    var url = "/build.php?newdid=" + villages[vId].Newdid;
    if (transData) {
        createInfoWindow('Transport task','Start transport to '+tasks[vId][tType][bId].name+' now.',appConf.messageDelay*1000);
		log(3,"start transport to " + tasks[vId][tType][bId].name)
		log(3,"GM_xmlhttpRequest url = " + url + ", data = " + transData);
        var getTranData2 = new XMLHttpRequest();
		getTranData2.open('POST', url, false);
		getTranData2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		getTranData2.setRequestHeader("Content-length", transData.length);
		getTranData2.setRequestHeader("Connection", "close");
		getTranData2.send(transData);
		if (getTranData2.readyState == 4) {
			if (getTranData2.status == 200) {
			    createInfoWindow('Transport task','Confirm transport '+tasks[vId][tType][bId].name+'.',appConf.messageDelay*1000);
				log(3,"Get Transport Data step 2");
				var ad = ajax2DIV(getTranData2); 
				var allInput = $xf("//form[contains(@action,'build.php')]//input",'l',ad);
				var finalData = "";
				for(var i = 0; i < allInput.snapshotLength; i++){
					var inp = allInput.snapshotItem(i);
					if (inp.type == 'image') {
                        finalData += (finalData==""?"":"&") + inp.name + "=" + inp.value;
                        finalData += (finalData==""?"":"&") + inp.name + ".x=" + FLOOR(5+(37*Math.random()));
                        finalData += (finalData==""?"":"&") + inp.name + ".y=" + FLOOR(5+(10*Math.random()));
					} else {
                        finalData += (finalData==""?"":"&") + inp.name + "=" + inp.value;
					}
				}
		        GM_xmlhttpRequest({
			        method: 'POST',
			        url: "build.php",
			        headers: {
				        'Accept': 'application/atom+xml,application/xml,text/xml',
				        'Content-type': 'application/x-www-form-urlencoded'
			        },
                    data: finalData,
			        onload: function(){
				        log(3,"transport resources ok!");
			            var nTime = new Date();
				        if (tasks[vId][tType][bId].opts.dTime > 0) {
				            tasks[vId][tType][bId].aTime = nTime.getTime() + getRndTime(tasks[vId][tType][bId].opts.dTime);
				        } else {
				            tasks[vId][tType][bId].aTime = nTime.getTime() + getRndTime(300000);
				        }
				        if (tasks[vId][tType][bId].rCond.type == 5) {
				            if (--tasks[vId][tType][bId].rCond.more == 0) delTask(vId,tType,bId);
				            if (tasks[vId][tType][bId].rCond.more < 0) tasks[vId][tType][bId].rCond.more = -1;
				        } else delTask(vId,tType,bId);
				        setValue("tasks",tasks);
				        if (appConf.refreshAfterDone) location.href = 'build.php?newdid='+villages[vId].Newdid+'&id='+bId.split("_")[0];
				        else doingTask = false;
			        },
			        onerror: function(){
			            createInfoWindow('Transport task','Transport '+tasks[vId][tType][bId].name+' error!',appConf.messageDelay*1000);
			            log(3,"transport resources error!");
			            doingTask = false;
			        }
		        });
			}
		}
    }
    else doingTask = false;
    if (vId != actV) {
        var url = "/village1.php?newdid="+villages[actV].Newdid;
        var rUrl = new XMLHttpRequest();
        rUrl.open('GET', url, false);
        rUrl.send(null);
    }
}


function processDemolish(vId,tType,dIds){
    var ids = dIds.split("_");
    var demoData = getDemoDataOrSetTime(vId,tType,dIds);
    var url = "/build.php?newdid=" + villages[vId].Newdid;
    if (demoData) {
        createInfoWindow('Demolish task','Start demolish '+villages[vId].Name+' - '+tasks[vId][tType][dIds].name+' now.',appConf.messageDelay*1000);
		log(3,"start demolish " + tasks[vId][tType][dIds].name)
		log(3,"GM_xmlhttpRequest url = " + url + ", data = " + demoData);
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
            data: demoData,
			onload: function(){
				log(3,"demolish ok!");
				if (appConf.refreshAfterDone) location.href = 'build.php?newdid='+villages[vId].Newdid+'&id='+ids[0];
				else doingTask = false;
			},
			onerror: function(){
			    createInfoWindow('Demolish task','Demolish '+tasks[vId][tType][bId].name+' error!',appConf.messageDelay*1000);
			    log(3,"demolish error!");
			    doingTask = false;
			}
		});
    }
    else doingTask = false;
    if (vId != actV) {
        var url = "/village1.php?newdid="+villages[actV].Newdid;
        var rUrl = new XMLHttpRequest();
        rUrl.open('GET', url, false);
        rUrl.send(null);
    }
}
function doTask() {
    var pTime = new Date();
    for (var v in tasks) {
        for (var i = 0; i < villages[v].BiP.length; i++)
            if (villages[v].BiP[i][2] < pTime.getTime()) {
                log(3,"found the build done : "+uneval(villages[v].BiP[i]));
                villages[v].BiP.splice(i,1);
                log(0,"after splice array : "+uneval(villages[v].BiP)+", length="+villages[v].BiP.length);
                i--;
            }
        for (var t in tasks[v]) {
            for (var id in tasks[v][t]) {
                if (pTime.getTime() > tasks[v][t][id].aTime && !doingTask) {
                    doingTask = true;
                    //tasks[v][t][id].aTime += getRndTime(10000);
                    //setValue('tasks',tasks);
                    if (!appConf.scriptPause) {
                        if (t==0 && id==0) processAutoUpgrade(v);
                        else if (t<=3) processBuildOrUpgrade(v,t,id);
                        else if (t==4) processResearch(v,t,id);
                        else if (t==5) processUpgradeTroop(v,t,id);
                        else if (t==6) processTrain(v,t,id);
                        //else if (t==7) processAutoTransport(v,t,id);
                        else if (t==8) processTransport(v,t,id);
                        //else if (t==9) processBuy(v,t,id);
                        //else if (t==10) processOffer(v,t,id);
                        //else if (t==12) processAutoSendTroop(v,t,id);
                        //else if (t==13) processSendTroop(v,t,id);
                        else if (t==14) processDemolish(v,t,id);
                        return;
                    }
                }
            }
        }
    }
    createTaskTable();
}
function timerProcess() {
//    if (chkCnt-- <= 1) {
//        chkCnt = appConf.reCheckInterval;
//    }
    doTask();
    //if (clrStatusDelay >= 0) clrStatusDelay--;
    //if (clrStatusDelay == 0) mainWin.setStatus("");
    //if (clrStatusDelay < 0) mainWin.setStatus("wait "+chkCnt);
}
function addTask(vId,tType,bId,Id,Name,Level,aCond,rCond,aTime,options) {
    if (tasks[vId] === undefined) tasks[vId] = {};
    if (tasks[vId][tType] === undefined) tasks[vId][tType] = {};    
    tasks[vId][tType][bId] = {id:Id,name:Name,level:Level,aCond:{type:0,doEvery:0,doAt:0},rCond:{type:0,toLvl:0,troop:0,toNum:0,more:0},aTime:aTime,opts:options};
    applyConfig(tasks[vId][tType][bId].aCond,aCond);
    applyConfig(tasks[vId][tType][bId].rCond,rCond);
    applyConfig(tasks[vId][tType][bId].opts,options);
    setValue("tasks",tasks);
//    log(0,"Add:tasks = "+uneval(tasks));
}
function delTask(vId,tType,bId) {
    var bCnt = 0;
    var tCnt = 0;
    delete tasks[vId][tType][bId];
    for (var b in tasks[vId][tType]) bCnt++;
    if (bCnt==0) delete tasks[vId][tType];
    for (var t in tasks[vId]) tCnt++;
    if (tCnt==0) delete tasks[vId];
    setValue("tasks",tasks);
//    log(0,"Del:tasks = "+uneval(tasks));
}
function processUrlvillage1() {
    var mapDetails = $g("map_details");
    var divStatus = $d("");
    var autoGenLink = $a(textLinkCmd[0],{id:'tauAutoGenLink',href:jsVoid});
    if (tasks[actV] !== undefined && tasks[actV][0] !== undefined && tasks[actV][0][0] !== undefined) autoGenLink.innerHTML = textLinkCmd[1];
    else autoGenLink.innerHTML = textLinkCmd[0];
    insertAfter(mapDetails,divStatus);
    divStatus.appendChild(autoGenLink);
    autoGenLink.addEventListener('click', function() {
        if (tasks[actV] !== undefined && tasks[actV][0] !== undefined && tasks[actV][0][0] !== undefined) {
            this.innerHTML = textLinkCmd[0];
            delTask(actV,0,0);
        } else {
            this.innerHTML = textLinkCmd[1];
            addTask(actV,0,0,0,textResType[0],0,{type:1},{type:2},(new Date()).getTime(),{});
        }
        createTaskTable();
    }, false);
    getVillageBiP(actV);
}
function processUrlDorf2() {
    getVillageBiP(actV);
}
function processUrlBuild() {
    var dB = $g("build");
    var firstDelay = 20000;
    var me = this;
    crtPage.search(/[\?\&]id=(\d+)/);
    me.bId = parseInt(RegExp.$1);
    if (dB) {
        dB.className.search(/gid(\d+)/);
        me.gId = parseInt(RegExp.$1);
        if (gId > 0) { // for upgrade
            var tbName = $xf("//h1");
            var bLnk = $xf(".//a[@class='build']",'f',dB);
            var tauL = $a(textLinkCmd[2],{id:'tauAddUpgradeTaskLink',href:jsVoid,style:'display:block'});
            me.bName = tbName.textContent;
            var bns = me.bName.split(" ");
            me.bLevel = parseInt(bns[bns.length-1]);
            if (bLnk) bLnk.parentNode.appendChild(tauL);
            else if (me.bLevel < bCost[me.gId].length - 1){
                var bDet = $xf(".//*[@class='none']",'l',dB);
                if (bDet.snapshotLength > 0) {
                    var sDet = bDet.snapshotItem(bDet.snapshotLength-1);
                    if (!sDet.textContent.match(/[«»]/)) sDet.parentNode.appendChild(tauL);
                }
            }
            tauL.addEventListener('click',createUpgradeWin,false);
            if (gId == 12 || gId == 13) { // Blacksmith, Armoury
                var rchTDs = $xf(".//table[contains(@class,'build_details')]//td[@class='act']",'l',dB);
                me.tIds = new Array();
                me.tNames = new Array();
                me.tLevels = new Array();
                for (var r = 0; r < rchTDs.snapshotLength; r++) {
                    var tauUL = $a(textLinkCmd[2],{id:'tauAddUpTroopTaskLink_'+r,href:jsVoid,style:'display:block'});
                    var updTD = rchTDs.snapshotItem(r);
                    var tImg = $xf(".//img[contains(@class,'unit')]",'f',updTD.parentNode);
                    tImg.className.search(/u(\d+)/);
                    var tId = parseInt(RegExp.$1);
                    tImg.parentNode.textContent.search(/\(.*\s+([\d\+]*)\)/);
                    var cLvl = RegExp.$1;
                    updTD.appendChild(tauUL);
                    me.tIds[r] = tId;
                    //me.tNames[r] = tImg.alt;
                    me.tNames[r] = tImg.parentNode.textContent.replace(/[\(\)]/g,"").replace(/\s+/g," ").replace(cLvl,eval(cLvl));
                    me.tLevels[r] = eval(cLvl);
                    tauUL.addEventListener('click',createUpTroopWin,false);
                }
            }
            if (gId == 15) { // Main building
                var btnT = $g("btn_demolish");
                if (btnT) {
                    var aDLnk = $a(textLinkCmd[4],{id:"tauAddDemolishTaskLink",href:jsVoid,style:"display:block;"});
                    btnT.parentNode.appendChild(aDLnk);
                    aDLnk.addEventListener('click',createDemolishWin,false);
                }
            }
            if (gId == 17) { // Market
                var mAct = (crtPage.match(/\&t\=(\d+)/)?RegExp.$1:"");
                switch (mAct) {
                    case "":
                        var sendResBtn = $g("btn_ok");
                        if (sendResBtn && me.bId > 0) {
                            var aSLnk = $a(textLinkCmd[7],{id:"tauAddSendResourceTaskLink",href:jsVoid,style:"display:block;"});
                            sendResBtn.parentNode.appendChild(aSLnk);
                            aSLnk.addEventListener('click',createSendResourceWin,false);
                        }
                        break;
                    case "1":
                        break;
                    case "2":
                        break;
                    case "3":
                        break;
                }
            }
            if (gId == 19 || gId == 20 || gId == 21 || gId == 25 || gId == 26) { // Barrack, Stable, Workshop, Residence, Palace
                var btnT = $g("btn_train");
                if (btnT) {
                    var aTLnk = $a(textLinkCmd[6],{id:"tauAddTrainTaskLink",href:jsVoid,style:"display:block;"});
                    btnT.parentNode.appendChild(aTLnk);
                    aTLnk.addEventListener('click',createTrainWin,false);
                }
            }
            if (gId == 22) {
                var rchTDs = $xf(".//table[contains(@class,'build_details')]//td[@class='act']",'l',dB);
                var frchTDs = $xf(".//table[contains(@class,'build_details')]//td[@class='cond']",'l',dB);
                me.tIds = new Array();
                me.tNames = new Array();
                for (var r = 0; r < rchTDs.snapshotLength; r++) {
                    var tauRL = $a(textLinkCmd[5],{id:'tauAddResearchTaskLink_'+r,href:jsVoid,style:'display:block'});
                    var rchTD = rchTDs.snapshotItem(r);
                    var tImg = $xf(".//img[contains(@class,'unit')]",'f',rchTD.parentNode);
                    tImg.className.search(/u(\d+)/);
                    var tId = parseInt(RegExp.$1);
                    rchTD.appendChild(tauRL);
                    me.tIds[r] = tId;
                    me.tNames[r] = tImg.alt;
                    tauRL.addEventListener('click',createResearchWin,false);
                }
                for (var r = 0; r < frchTDs.snapshotLength; r++) {
                    var fInd = rchTDs.snapshotLength + r;
                    var tauRL = $a(textLinkCmd[5],{id:'tauAddResearchTaskLink_'+fInd,href:jsVoid,style:'display:block'});
                    var frchTD = frchTDs.snapshotItem(r);
                    var tImg = $xf(".//img[contains(@class,'unit')]",'f',frchTD.parentNode);
                    tImg.className.search(/u(\d+)/);
                    var tId = parseInt(RegExp.$1);
                    frchTD.appendChild(tauRL);
                    me.tIds[fInd] = tId;
                    me.tNames[fInd] = tImg.alt;
                    tauRL.addEventListener('click',createResearchWin,false);
                }
            }
        } else { // for build
            var hList = $xf(".//h2",'l',dB);
            var tbList = $xf(".//table[@class='new_building']",'l',dB);
            me.bNames = new Array();
            me.bLevels = new Array();
            me.gIds = new Array();
            for (var i = 0; i < tbList.snapshotLength; i++) {
                var tB = tbList.snapshotItem(i);
                var bLnk = $xf(".//a[@class='build']",'f',tB);
                var iDet = $xf(".//img[contains(@class,'g')]",'f',tB);
                var tauL = $a(textLinkCmd[3],{id:'tauAddUpgradeTaskLink_'+i,href:jsVoid,style:'display:block'});
                me.bNames[i] = hList.snapshotItem(i).textContent;
                me.bLevels[i] = 0;
                if (iDet) { iDet.className.search(/g(\d+)/); me.gIds[i] = parseInt(RegExp.$1); } else me.gIds[i] = 0;
                if (bLnk) bLnk.parentNode.appendChild(tauL);
                else {
                    var bDet = $xf(".//*[@class='none']",'l',tB);
                    if (bDet.snapshotLength > 0) {
                        var sDet = bDet.snapshotItem(bDet.snapshotLength-1);
                        sDet.parentNode.appendChild(tauL);
                    } else {
                        var tds = tB.getElementsByTagName("TD");
                        var lastTd = tds[tds.length-1];
                        lastTd.appendChild(tauL);
                    }
                }
                tauL.addEventListener('click',createUpgradeWin,false);
            }
        }
    }
    function createUpgradeWin() {
        this.id.search(/tauAddUpgradeTaskLink_(\d+)/);
        var ind = parseInt(RegExp.$1);
        var bName = (me.gId==0?me.bNames[ind]:me.bName);
        var bLevel = (me.gId==0?me.bLevels[ind]:me.bLevel);
        var gId = (me.gId==0?me.gIds[ind]:me.gId);
        var maxLevel = bCost[gId].length - 1;
        var buildWin = new Window({id:'tauUpgradeWin',title:(me.gId>0?'Upgrade':'Build &amp; Upgrade')+' '+bName,width:300,tbarHide:true,bbarHide:true,zIndex:2010,style:{position:'fixed'}});
        var dForm = $d("",{style:'margin:2px;text-align:center;'});
        var fTable = $t({style:'background-color:transparent;'});
        if (gId == 0 && me.bId == 40) {
            if (appConf.userInfo.raceId == 1) gId = 31;
            if (appConf.userInfo.raceId == 11) gId = 32;
            if (appConf.userInfo.raceId == 21) gId = 33;
            maxLevel = bCost[gId].length - 1;
        }
        buildWin.contentEl.appendChild(dForm);
        dForm.appendChild(fTable);
        // Condition row
        var condR = $r({});
        fTable.appendChild(condR);
        var condLC = $c("Condition:",{style:'text-align:right;'});
        var condFC = $c("<i>coming soon</i>",{style:'text-align:left;'});
        condR.appendChild(condLC);
        condR.appendChild(condFC);
        // Level row
        var lvlR = $r({});
        fTable.appendChild(lvlR);
        var lvlBC = $c("To Level:",{style:'text-align:right;'});
        var lvlFC = $c("",{style:'text-align:left;'});
        lvlR.appendChild(lvlBC);
        lvlR.appendChild(lvlFC);
        var lvlS = $s({});
        lvlFC.appendChild(lvlS);
        for (var i = bLevel + 1; i <= maxLevel; i++) {lvlS.appendChild($o(i,i,{}));}
        // Start Time row
        var stR = $r({});
        fTable.appendChild(stR);
        var stLC = $c("Start Time:",{style:'text-align:right;'});
        var stFC = $c("",{colspan:4,style:'text-align:left;'});
        var stTime = new Date();
        stTime.setTime(stTime.getTime() + firstDelay);
        var stInp = $i({id:'tauStartTime',value:getFullDateFullTimeStr(stTime),style:'width:130px;'});
        stR.appendChild(stLC);
        stR.appendChild(stFC);
        stFC.appendChild(stInp);

        var dBtn = $d("",{style:'text-align:center;margin:10px 0px;'});
        var aBtn = $i({type:'button',value:'Add Task',style:'margin-right:5px;'});
        var cBtn = $i({type:'button',value:'Cancel'});
        buildWin.contentEl.appendChild(dBtn);
        dBtn.appendChild(aBtn);
        dBtn.appendChild(cBtn);
        aBtn.addEventListener('click',function() {
            var toLvl = parseInt(lvlS.options[lvlS.selectedIndex].value);
            var tType = (me.gId==0?3:2);
            stTime = new Date(stInp.value);
            addTask(actV,tType,me.bId,gId,bName,bLevel,{type:0},{type:3,toLvl:toLvl},stTime.getTime(),{});
            createTaskTable();
            removeElement(buildWin.el);
        },false);
        cBtn.addEventListener('click',function() {removeElement(buildWin.el);},false);
        buildWin.setPos(window.pageXOffset+ROUND((window.innerWidth-buildWin.el.clientWidth)/2),window.pageYOffset+ROUND((window.innerHeight-buildWin.el.clientHeight)/2));
    }
    function createUpTroopWin() {
        this.id.search(/tauAddUpTroopTaskLink_(\d+)/);
        var ind = parseInt(RegExp.$1);
        var bId = me.bId;
        var bNames = me.bName.split(" ");
        var tId = me.tIds[ind];
        var tName = me.tNames[ind];
        var tLevel = me.tLevels[ind];
        bNames.splice(bNames.length - 2, 2);
//        log(0,"createUpTroopWin: ind="+ind+",bId="+bId+",tId="+tId+",tName="+tName)
        var uptWin = new Window({id:'tauUpTroopWin',title:'Upgrade '+tName,width:300,tbarHide:true,bbarHide:true,zIndex:2010,style:{position:'fixed'}});
        var dForm = $d("",{style:'margin:2px;text-align:center;'});
        var fTable = $t({style:'background-color:transparent;'});
        uptWin.contentEl.appendChild(dForm);
        dForm.appendChild(fTable);
        // Condition row
        var condR = $r({});
        fTable.appendChild(condR);
        var condLC = $c("Condition:",{style:'text-align:right;'});
        var condFC = $c("<i>coming soon</i>",{style:'text-align:left;'});
        condR.appendChild(condLC);
        condR.appendChild(condFC);
        // Level row
        var lvlR = $r({});
        fTable.appendChild(lvlR);
        var lvlBC = $c("To Level:",{style:'text-align:right;'});
        var lvlFC = $c("",{style:'text-align:left;'});
        lvlR.appendChild(lvlBC);
        lvlR.appendChild(lvlFC);
        var lvlS = $s({});
        lvlFC.appendChild(lvlS);
        for (var i = tLevel + 1; i <= 20; i++) {lvlS.appendChild($o(i,i,{}));}
        // Start Time row
        var stR = $r({});
        fTable.appendChild(stR);
        var stLC = $c("Start Time:",{style:'text-align:right;'});
        var stFC = $c("",{colspan:4,style:'text-align:left;'});
        var stTime = new Date();
        stTime.setTime(stTime.getTime() + firstDelay);
        var stInp = $i({id:'tauStartTime',value:getFullDateFullTimeStr(stTime),style:'width:130px;'});
        stR.appendChild(stLC);
        stR.appendChild(stFC);
        stFC.appendChild(stInp);

        var dBtn = $d("",{style:'text-align:center;margin:10px 0px;'});
        var aBtn = $i({type:'button',value:'Add Task',style:'margin-right:5px;'});
        var cBtn = $i({type:'button',value:'Cancel'});
        uptWin.contentEl.appendChild(dBtn);
        dBtn.appendChild(aBtn);
        dBtn.appendChild(cBtn);
        aBtn.addEventListener('click',function() {
            var toLvl = parseInt(lvlS.options[lvlS.selectedIndex].value);
            stTime = new Date(stInp.value);
            addTask(actV,5,bId+"_"+tId,tId,bNames.join(" ")+" -"+tName,tLevel,{type:0},{type:3,toLvl:toLvl},stTime.getTime(),{});
            createTaskTable();
            removeElement(uptWin.el);
        },false);
        cBtn.addEventListener('click',function() {removeElement(uptWin.el);},false);
        uptWin.setPos(window.pageXOffset+ROUND((window.innerWidth-uptWin.el.clientWidth)/2),window.pageYOffset+ROUND((window.innerHeight-uptWin.el.clientHeight)/2));
    }
    function createResearchWin() {
        this.id.search(/tauAddResearchTaskLink_(\d+)/);
        var ind = parseInt(RegExp.$1);
        var bId = me.bId;
        var tId = me.tIds[ind];
        var tName = me.tNames[ind];
        var reschWin = new Window({id:'tauResearchWin',title:'Research '+tName,width:300,tbarHide:true,bbarHide:true,zIndex:2010,style:{position:'fixed'}});
        var dForm = $d("",{style:'margin:2px;text-align:center;'});
        var fTable = $t({style:'background-color:transparent;'});
        reschWin.contentEl.appendChild(dForm);
        dForm.appendChild(fTable);
        // Condition row
        var condR = $r({});
        fTable.appendChild(condR);
        var condLC = $c("Condition:",{style:'text-align:right;'});
        var condFC = $c("<i>coming soon</i>",{style:'text-align:left;'});
        condR.appendChild(condLC);
        condR.appendChild(condFC);
        // Start Time row
        var stR = $r({});
        fTable.appendChild(stR);
        var stLC = $c("Start Time:",{style:'text-align:right;'});
        var stFC = $c("",{colspan:4,style:'text-align:left;'});
        var stTime = new Date();
        stTime.setTime(stTime.getTime() + firstDelay);
        var stInp = $i({id:'tauStartTime',value:getFullDateFullTimeStr(stTime),style:'width:130px;'});
        stR.appendChild(stLC);
        stR.appendChild(stFC);
        stFC.appendChild(stInp);

        var dBtn = $d("",{style:'text-align:center;margin:10px 0px;'});
        var aBtn = $i({type:'button',value:'Add Task',style:'margin-right:5px;'});
        var cBtn = $i({type:'button',value:'Cancel'});
        reschWin.contentEl.appendChild(dBtn);
        dBtn.appendChild(aBtn);
        dBtn.appendChild(cBtn);
        aBtn.addEventListener('click',function() {
            stTime = new Date(stInp.value);
            addTask(actV,4,bId+'_'+tId,tId,tName,0,{type:0},{type:0},stTime.getTime(),{});
            createTaskTable();
            removeElement(reschWin.el);
        },false);
        cBtn.addEventListener('click',function() {removeElement(reschWin.el);},false);
        reschWin.setPos(window.pageXOffset+ROUND((window.innerWidth-reschWin.el.clientWidth)/2),window.pageYOffset+ROUND((window.innerHeight-reschWin.el.clientHeight)/2));
    }
    function createTrainWin() {
        var trainWin = new Window({id:'tauTrainWin',title:'Train Troop',width:400,tbarHide:true,bbarHide:true,zIndex:2010,style:{position:'fixed',}});
        var dForm = $d("",{style:'margin:2px;text-align:center;'});
        var fTable = $t({style:'background-color:transparent;'});
        var tList = {};
        trainWin.contentEl.appendChild(dForm);
        dForm.appendChild(fTable);
        var allTroops = $xf("//table[@class='build_details']//td[@class='desc']//img[contains(@class,'unit')]",'l');
        // Troop rows
        for (i = 0; i < allTroops.snapshotLength; i++) {
            var tR = $r({});
            var imgT = allTroops.snapshotItem(i);
            imgT.className.search(/u(\d+)/);
            var tId = parseInt(RegExp.$1);
            var currProg = $xf("//table[@class='under_progress']//td[@class='desc']//img[contains(@class,'u"+tId+"')]",'l');
            imgT.parentNode.innerHTML.search(/(\<img[^\>]*\>)/);
            var imgTag = RegExp.$1;
            var lC = imgTag;
            var lCName = imgT.parentNode.textContent;
            var allInProg = 0;
            for (p = 0; p < currProg.snapshotLength; p++) {
                currProg.snapshotItem(p).parentNode.textContent.search(/(\d+)\s+.*/)
                allInProg += parseInt(RegExp.$1);
            }
            imgT.parentNode.textContent.search(/\([^\d]*(\d+)\)/);
            var cT = parseInt(RegExp.$1);
            lCName = lCName.replace(cT.toString(),(cT + allInProg).toString())
            lC += lCName + ":";
            var tLC = $c(lC,{style:"text-align:right;"});
            var tFC = $c("",{style:"text-align:left;"});
            var iFC = $i({id:"tauTroop"+tId,value:"0",style:"width:50px;"});
            fTable.appendChild(tR);
            tR.appendChild(tLC);
            tR.appendChild(tFC);
            tFC.appendChild(iFC);
            var tName = imgT.parentNode.textContent.replace(/(\s+\([^\)]*\)|^\s+|\s+$)/gi,"");
            tList[tId] = tName;
        }
        // Start Time row
        var stR = $r({});
        fTable.appendChild(stR);
        var stLC = $c("Start Time:",{style:'text-align:right;'});
        var stFC = $c("",{colspan:4,style:'text-align:left;'});
        var stTime = new Date();
        stTime.setTime(stTime.getTime() + firstDelay);
        var stInp = $i({id:'tauStartTime',value:getFullDateFullTimeStr(stTime),style:'width:130px;'});
        stR.appendChild(stLC);
        stR.appendChild(stFC);
        stFC.appendChild(stInp);
        // Delay Time row
        var dtR = $r({});
        fTable.appendChild(dtR);
        var dtLC = $c("Delay Time:",{style:'text-align:right;'});
        var dtFC = $c("",{colspan:4,style:'text-align:left;'});
        var dtInp = $i({id:'tauDelayTime',value:"0:05:00",style:'width:60px;'});
        dtR.appendChild(dtLC);
        dtR.appendChild(dtFC);
        dtFC.appendChild(dtInp);
        dtFC.appendChild($txt(" second(s)"));

        var dBtn = $d("",{style:'text-align:center;margin:10px 0px;'});
        var aBtn = $i({type:'button',value:'Add Task',style:'margin-right:5px;'});
        var cBtn = $i({type:'button',value:'Cancel'});
        trainWin.contentEl.appendChild(dBtn);
        dBtn.appendChild(aBtn);
        dBtn.appendChild(cBtn);
        aBtn.addEventListener('click',function() {
            var tTName = "";
            var tTNum = "";
            var total = 0;
            var tNums = {};
            var dTime = toSeconds(dtInp.value);
            for (tId in tList) {
                var inp = $g("tauTroop"+tId);
                var tNum = parseInt(inp.value);
                if (tNum > 0) {
                    tTName += (tTName==""?"":",") + tList[tId];
                    tTNum += (tTNum==""?"":",") + tNum;
                    total += tNum;
                    tNums[tId] = { name:tList[tId], num:tNum };
                }
            }
            tNums["dTime"]=dTime*1000;
            if (total > 0) {
                stTime = new Date(stInp.value);
                addTask(actV,6,bId,tId,tTName,0,{type:0},{type:4,troop:tTNum},stTime.getTime(),tNums);
                createTaskTable();
                removeElement(trainWin.el);
            } else alert("You are not input troop number.\nPlease try agin.");
        },false);
        cBtn.addEventListener('click',function() {removeElement(trainWin.el);},false);
        trainWin.setPos(window.pageXOffset+ROUND((window.innerWidth-trainWin.el.clientWidth)/2),window.pageYOffset+ROUND((window.innerHeight-trainWin.el.clientHeight)/2));
    }
    function createSendResourceWin() {
        var sendRWin = new Window({id:'tauSendResourceWin',title:'Send Resource',width:500,tbarHide:true,bbarHide:true,zIndex:2010,style:{position:'fixed'}});
        var dForm = $d("",{style:'margin:2px;text-align:center;'});
        var fTable = $t({style:'background-color:transparent;'});
        sendRWin.contentEl.appendChild(dForm);
        dForm.appendChild(fTable);
        // Resource row
        var resR = $r({});
        fTable.appendChild(resR);
        var resLC = $c("Resource:",{style:'text-align:right;'});
        resR.appendChild(resLC);
        var resInp = new Array();
        for (var i = 1; i <= 4; i++) {
            var img = $xf('//img[@class="r'+i+'"]');
            var resFC = $c(img.parentNode.innerHTML+"&nbsp;",{style:'text-align:left;'});
            resInp[i-1] = $i({id:"tauR"+i,value:"0",style:"width:45px;"});
            resR.appendChild(resFC);
            resFC.appendChild(resInp[i-1]);
        }
        // Target row
        var tarR = $r({});
        fTable.appendChild(tarR);
        var tarLC = $c("Target Village:",{style:'text-align:right;'});
        var tarFC1 = $c("",{style:'text-align:left;'});
        var tarFC2 = $c("X: ",{style:'text-align:left;padding-left:3px;visibility:hidden;'});
        var tarFC3 = $c("Y: ",{style:'text-align:left;padding-left:3px;visibility:hidden;'});
        var tarFC4 = $c("",{style:'text-align:left;'});
        tarR.appendChild(tarLC);
        tarR.appendChild(tarFC1);
        tarR.appendChild(tarFC2);
        tarR.appendChild(tarFC3);
        tarR.appendChild(tarFC4);
        var vLst = $s({});
        tarFC1.appendChild(vLst);
        for (var vId in villages) {
            if (vId != actV) {
                vLst.appendChild($o(villages[vId].Name,vId,{}));
            }
        }
        vLst.appendChild($o("Other",'-1',{}));
        vLst.addEventListener('change',function(){if(this.selectedIndex == this.length-1){tarFC2.style.visibility = "visible";tarFC3.style.visibility = "visible";}else{tarFC2.style.visibility = "hidden";tarFC3.style.visibility = "hidden";}},false);
        var xPos = $i({id:'tauTargetX',style:'width:45px;'});
        var yPos = $i({id:'tauTargetY',style:'width:45px;'});
        tarFC2.appendChild(xPos);
        tarFC3.appendChild(yPos);
        // Condition row
        var acR = $r({});
        fTable.appendChild(acR);
        var acLC = $c("Condition:",{style:'text-align:right;'});
        var acFC = $c("<i>Coming soon</i>",{style:'text-align:left;'});
        acR.appendChild(acLC);
        acR.appendChild(acFC);
        // Repeate row
        var rcR = $r({});
        fTable.appendChild(rcR);
        var rcLC = $c("Repeate:",{style:'text-align:right;'});
        var rcFC = $c("",{colspan:4,style:'text-align:left;'});   
        var rcInp = $i({id:'tauRepeat',value:"1",style:'width:50px;'});
        rcR.appendChild(rcLC);
        rcR.appendChild(rcFC);
        rcFC.appendChild(rcInp);
        rcFC.appendChild($txt(" (input -1 for infinity times)"));
        // Start Time row
        var stR = $r({});
        fTable.appendChild(stR);
        var stLC = $c("Start Time:",{style:'text-align:right;'});
        var stFC = $c("",{colspan:4,style:'text-align:left;'});
        var stTime = new Date();
        stTime.setTime(stTime.getTime() + firstDelay);
        var stInp = $i({id:'tauStartTime',value:getFullDateFullTimeStr(stTime),style:'width:130px;'});
        stR.appendChild(stLC);
        stR.appendChild(stFC);
        stFC.appendChild(stInp);
        // Delay Time row
        var dtR = $r({});
        fTable.appendChild(dtR);
        var dtLC = $c("Delay Time:",{style:'text-align:right;'});
        var dtFC = $c("",{colspan:4,style:'text-align:left;'});
        var dtInp = $i({id:'tauDelayTime',value:"0:05:00",style:'width:60px;'});
        dtR.appendChild(dtLC);
        dtR.appendChild(dtFC);
        dtFC.appendChild(dtInp);
        dtFC.appendChild($txt(" second(s)"));

        var dBtn = $d("",{style:'text-align:center;margin:10px 0px;'});
        var aBtn = $i({type:'button',value:'Add Task',style:'margin-right:5px;'});
        var cBtn = $i({type:'button',value:'Cancel'});
        sendRWin.contentEl.appendChild(dBtn);
        dBtn.appendChild(aBtn);
        dBtn.appendChild(cBtn);
        aBtn.addEventListener('click',function() {
            stTime = new Date(stInp.value);
            var dTime = toSeconds(dtInp.value);
            var sres = new Array();
            for (i = 0; i < 4; i++) sres[i] = parseInt(resInp[i].value);
            var tName = vLst.options[vLst.selectedIndex].text+uneval(sres);
            var x,y;
            if (vLst.options[vLst.selectedIndex].value == '-1') {
                x = parseInt(xPos.value);
                y = parseInt(yPos.value);
            } else {
                var loc = id2xy(vLst.options[vLst.selectedIndex].value);            
                x = parseInt(loc[0]);
                y = parseInt(loc[1]);
            }
            var bIdLoc = me.bId + "_" + (x>=0?"P":"M") + Math.abs(x) + "_" + (y>=0?"P":"M") + Math.abs(y);
            addTask(actV,8,bIdLoc,tId,tName,0,{type:0},{type:5,more:parseInt(rcInp.value)},stTime.getTime(),{dTime:dTime*1000,res:sres});
            createTaskTable();
            removeElement(sendRWin.el);
        },false);
        cBtn.addEventListener('click',function() {removeElement(sendRWin.el);},false);
        sendRWin.setPos(window.pageXOffset+ROUND((window.innerWidth-sendRWin.el.clientWidth)/2),window.pageYOffset+ROUND((window.innerHeight-sendRWin.el.clientHeight)/2));
    }
    function createDemolishWin() {
        var demolishWin = new Window({id:'tauDemolishWin',title:'Demolish',width:300,tbarHide:true,bbarHide:true,zIndex:2010,style:{position:'fixed'}});
        var dForm = $d("",{style:'margin:2px;text-align:center;'});
        var fTable = $t({style:'background-color:transparent;'});        
        demolishWin.contentEl.appendChild(dForm);
        dForm.appendChild(fTable);
        var abriss = $xf("//select[@name='abriss']");
        var demoName = abriss.options[abriss.selectedIndex].text;
        abriss.options[abriss.selectedIndex].text.search(/\s(\d+)$/);
        var demoLvl = parseInt(RegExp.$1);
        var demoId = abriss.options[abriss.selectedIndex].value;
        // Building name row
        var demoR = $r({});
        fTable.appendChild(demoR);
        var demoLC = $c("Demolish:",{style:'text-align:right;'});
        var demoFC = $c(demoName,{style:'text-align:left;'});
        demoR.appendChild(demoLC);
        demoR.appendChild(demoFC);
        // Level row
        var lvlR = $r({});
        fTable.appendChild(lvlR);
        var lvlBC = $c("To Level:",{style:'text-align:right;'});
        var lvlFC = $c("",{style:'text-align:left;'});
        lvlR.appendChild(lvlBC);
        lvlR.appendChild(lvlFC);
        var lvlS = $s({});
        lvlFC.appendChild(lvlS);
        for (var i = 0; i < demoLvl; i++) {lvlS.appendChild($o(i,i,{}));}
        // Start Time row
        var stR = $r({});
        fTable.appendChild(stR);
        var stLC = $c("Start Time:",{style:'text-align:right;'});
        var stFC = $c("",{colspan:4,style:'text-align:left;'});
        var stTime = new Date();
        stTime.setTime(stTime.getTime() + firstDelay);
        var stInp = $i({id:'tauStartTime',value:getFullDateFullTimeStr(stTime),style:'width:130px;'});
        stR.appendChild(stLC);
        stR.appendChild(stFC);
        stFC.appendChild(stInp);
        
        var dBtn = $d("",{style:'text-align:center;margin:10px 0px;'});
        var aBtn = $i({type:'button',value:'Add Task',style:'margin-right:5px;'});
        var cBtn = $i({type:'button',value:'Cancel'});
        demolishWin.contentEl.appendChild(dBtn);
        dBtn.appendChild(aBtn);
        dBtn.appendChild(cBtn);
        aBtn.addEventListener('click',function() {
            var toLvl = parseInt(lvlS.options[lvlS.selectedIndex].value);
            stTime = new Date(stInp.value);
            addTask(actV,14,me.bId+"_"+demoId,demoId,demoName,demoLvl,{type:0},{type:3,toLvl:toLvl},stTime.getTime(),{});
            createTaskTable();
            removeElement(demolishWin.el);
        },false);
        cBtn.addEventListener('click',function() {removeElement(demolishWin.el);},false);
        demolishWin.setPos(window.pageXOffset+ROUND((window.innerWidth-demolishWin.el.clientWidth)/2),window.pageYOffset+ROUND((window.innerHeight-demolishWin.el.clientHeight)/2));
    }
}
function processUrlA2b() {
    var firstDelay = 20000;
    var sendTroopBtn = $g("btn_ok");
    if (sendTroopBtn) {
        var aSLnk = $a(textLinkCmd[8],{id:"tauAddSendResourceTaskLink",href:jsVoid,style:"display:block;"});
        sendTroopBtn.parentNode.appendChild(aSLnk);
        aSLnk.addEventListener('click',createSendTroopWin,false);
    }
    function createSendTroopWin() {
        var sndTWin = new Window({id:'tauSendTroopWin',title:'Send Troop',width:500,tbarHide:true,bbarHide:true,zIndex:2010,style:{position:'fixed'}});
        var dForm = $d("",{style:'margin:2px;text-align:center;'});
        var fTable = $t({style:'background-color:transparent;'});        
        sndTWin.contentEl.appendChild(dForm);
        dForm.appendChild(fTable);
        // Troops row
        var trR = $r({});
        fTable.appendChild(trR);
        var trLC = $c("Troops:",{style:'text-align:right;vertical-align:top;'});
        var trFC = $c("",{});
        trR.appendChild(trLC);
        trR.appendChild(trLC);
        var tInp = $xf("//form[@action='a2b.php']//input[contains(@name,'t')]",'l');

        var dBtn = $d("",{style:'text-align:center;margin:10px 0px;'});
        var aBtn = $i({type:'button',value:'Add Task',style:'margin-right:5px;'});
        var cBtn = $i({type:'button',value:'Cancel'});
        sndTWin.contentEl.appendChild(dBtn);
        dBtn.appendChild(aBtn);
        dBtn.appendChild(cBtn);
        aBtn.addEventListener('click',function() {
            var toLvl = parseInt(lvlS.options[lvlS.selectedIndex].value);
            stTime = new Date(stInp.value);
            addTask(actV,5,bId+"_"+tId,tId,bNames.join(" ")+" -"+tName,tLevel,{type:0},{type:3,toLvl:toLvl},stTime.getTime(),{});
            createTaskTable();
            removeElement(sndTWin.el);
        },false);
        cBtn.addEventListener('click',function() {removeElement(sndTWin.el);},false);
        sndTWin.setPos(window.pageXOffset+ROUND((window.innerWidth-sndTWin.el.clientWidth)/2),window.pageYOffset+ROUND((window.innerHeight-sndTWin.el.clientHeight)/2));
    }
}
function startProcess() {
    getGeneralValue();
    getRace();
    loadTasks();
    if (appConf.autoLogin) {
        if (doLogin()) return;
    } else {
        var refreshTime = getRndTime(appConf.refreshInterval*60000); //random refresh time in minutes
        window.setTimeout('location.href="'+crtPage+'";',refreshTime);
        log(3,"refresh page in "+FLOOR(refreshTime/1000).toString()+" second(s)");
    }
    createMainWindow();
    
    // Create page link
	if (crtPage.match(/village1\.php/)) processUrlvillage1();
	if (crtPage.match(/dorf2\.php/)) processUrlDorf2();
	if (crtPage.match(/build\.php\?/)) processUrlBuild();
	if (crtPage.match(/a2b\.php/)) processUrlA2b();

    window.setInterval(timerProcess,1000);
}
window.addEventListener('load', startProcess, false);

