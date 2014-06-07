//  天涯只看楼主 greasemonkey script
// version 0.2
// 2008-10-26
// Copyright (c) 2008, Xin Zhang
//
// ==UserScript==
// @name          天涯 只看楼主
// @namespace     http://xinzhang.net/greasemonkey/tianya
// @description   Enables 只看楼主 and 高亮楼主 functions withou login
// @include       http://*.tianya.cn/*
// @version       0.2
// ==/UserScript==

// Handles Tianya new version 20080815 functions
if (unsafeWindow.VipFn) {
	unsafeWindow.VipFn = function (element, position) {
		this.element = unsafeWindow.V.$(element);
		this.parent = this.element.parentNode;
		this.name = this.element.innerHTML;
		this.html = this.parent.innerHTML;
		this.div = unsafeWindow.V.WRITERS_DIV;
		this.pos = position;

		switch ( this.name )
		{
			case '只看楼主':
				this.parent.innerHTML = this.html.replace('只看楼主', '查看所有回复');
				unsafeWindow.V.lookByAuthor( unsafeWindow.V.author );
			  break;
			case '查看所有回复':
				this.parent.innerHTML = this.html.replace('查看所有回复', '只看楼主');
				unsafeWindow.V.lookByAuthorBack();
				break;
			case '高亮楼主':
				this.parent.innerHTML = this.html.replace('高亮楼主', '已成功');
				unsafeWindow.V.redByAuthor( unsafeWindow.V.author );
				break;
			case '已成功':
				this.parent.innerHTML = this.html; //.replace('高亮楼主', '已成功');
				break;
			case '只看某人回复':
				unsafeWindow.V.showAllWriters( this );
				break;
			case '查看所有人回复':
				this.parent.innerHTML = this.html.replace('查看所有人回复', '只看某人回复');
				unsafeWindow.V.lookByAuthorBack();
				break;
			default:
				unsafeWindow.V.checkUser(this);
				break;
		}
	}
}

// old page version functions
if (unsafeWindow.__ty_vip_fn_check) {
  unsafeWindow.__ty_vip_fn_check = function (elem) {
    if (!!elem)
      __ty_vip_fn_check_from = elem;
    else 
      __ty_vip_fn_check_from = document.getElementById('__ty_vip_fn_checker');

    if (!!elem) __ty_vip_fn_check_from_name = __ty_vip_fn_check_from.innerHTML;

    if (__ty_vip_fn_check_from_name == '只看楼主') {
      __ty_vip_fn_check_from.innerHTML = '查看所有回复';
      unsafeWindow.__ty_vip_fn_look_by_author(unsafeWindow.chrAuthorName);
    } else if (__ty_vip_fn_check_from_name == '查看所有回复') {
      __ty_vip_fn_check_from.innerHTML = '只看楼主';
      unsafeWindow.__ty_vip_fn_look_back();
    } else if (__ty_vip_fn_check_from_name == '高亮楼主') {
      __ty_vip_fn_check_from.innerHTML = '已成功';
      unsafeWindow.__ty_vip_fn_red_author(unsafeWindow.chrAuthorName);
    } else if (__ty_vip_fn_check_from_name == '已成功') {
      __ty_vip_fn_check_from.innerHTML = '已成功';
    }
  }
}