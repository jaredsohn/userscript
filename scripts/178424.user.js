// ==UserScript==
// @name 百度网盘直接下载链接
// @version 0.0.4
// @description 将百度网盘下载链接转换为http
// @copyright 2012-2013 The TT
// @include http://pan.baidu.com/share/link*
// @include http://pan.baidu.com/disk/home*
// @include http://pan.baidu.com/s/*
// @include http://yun.baidu.com/share/link*
// @include http://yun.baidu.com/disk/home*
// @include http://yun.baidu.com/s/*
// @grant       none
// ==/UserScript==
var jstxt='';
jstxt += 'function getboxclass(type,classname) {'+'\n';
jstxt += '	this.getclassitem = document.getElementsByTagName(type);'+'\n';
jstxt += '	for(var i=0;i<this.getclassitem.length;i++){'+'\n';
jstxt += '		if(this.getclassitem[i].className == classname){'+'\n';
jstxt += '			return this.getclassitem[i];'+'\n';
jstxt += '				}}};'+'\n';

jstxt += 'function addaria2button() {'+'\n';
jstxt += '	var data;'+'\n';
jstxt += '	if(disk.util.ViewShareUtils){'+'\n';
jstxt += '			data = JSON.parse(disk.util.ViewShareUtils.viewShareData);'+'\n';
jstxt += ' this.link_=data.dlink;'+'\n';
jstxt += '		}'+'\n';


jstxt += '	else {'+'\n';
jstxt += '			this.fileitem = FileUtils.getListViewCheckedItems();'+'\n';
jstxt += '			if (this.fileitem.length == 0){}'+'\n';
jstxt += '			else{'+'\n';
jstxt += '				for(var i=0;i<this.fileitem.length;i++){'+'\n';
jstxt += '					if (this.fileitem[i].md5) {'+'\n';
jstxt += '						this.link_= this.fileitem[i].dlink;'+'\n';
jstxt += '					}else{var folder_state = 1}'+'\n';
jstxt += '				}'+'\n';
jstxt += '			}'+'\n';
jstxt += '		}'+'\n';


jstxt += '	this.className_ = "new-dbtn";'+'\n';
jstxt += '	if (getboxclass("span", "btn-list")) {this.place = getboxclass("span", "btn-list");}'+'\n';
jstxt += '	else if (getboxclass("div", "bottomBtnBar")) {this.place = getboxclass("div", "bottomBtnBar");}'+'\n';
jstxt += '	else if (document.getElementById("downFileButtom")) {this.place = document.getElementById("downFileButtom").parentNode;}'+'\n';
jstxt += '	else if (getboxclass("div", "link-title clearfix btn-list")) {'+'\n';
jstxt += '		if(! document.getElementById("cancelButton")){this.place = getboxclass("div", "link-title clearfix btn-list");}'+'\n';
jstxt += '		else {'+'\n';
jstxt += '			this.className_ = "new-dbtn cancel b-fr b-fr";'+'\n';
jstxt += '			this.place = document.getElementById("cancelButton").parentNode;'+'\n';
jstxt += '		}}'+'\n';
//jstxt += '	else if(document.getElementById("cancelButton")) {'+'\n';
//jstxt += '		this.className_ = "new-dbtn cancel b-fr b-fr";'+'\n';
//jstxt += '		this.place = document.getElementById("cancelButton").parentNode;'+'\n';
//jstxt += '	}'+'\n';
//jstxt += '	else {'+'\n';
//jstxt += '		this.className_ = "new-dbtn cancel b-fr b-fr";'+'\n';
//jstxt += '		this.place = getboxclass("div", "link-title clearfix btn-list");'+'\n';
//jstxt += '	}'+'\n';

jstxt += '	this.A = document.createElement("a");'+'\n';
jstxt += '	this.A.className = this.className_;'+'\n';
jstxt += '	this.A.id = "aria2button";'+'\n';
jstxt += '	this.A.href = this.link_;'+'\n';
jstxt += '	this.A.innerHTML = \'<em class="icon-download"></em><b>下载地址</b>\';'+'\n';
jstxt += '	this.place.insertBefore(this.A, this.place.childNodes[0]);'+'\n';
jstxt += '	}'+'\n';
jstxt += 'addaria2button();'+'\n';
var script_ = document.createElement("script");
script_.type = "text/javascript"; 
script_.innerHTML = jstxt;
var head_ = document.getElementsByTagName("head").item(0);
head_.appendChild(script_);