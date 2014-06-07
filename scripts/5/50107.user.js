// ==UserScript==
// @name           auto login kakaku.com services
// @namespace      http://matatabi.homeip.net
// @description    auto fill forms and login kakaku.com services
// @include        https://mansion-db.com/?act=user_loginForm
// @include        http://okyuu.com/*
// @include        https://photohito.com/user/login
// @include        https://secure.eiga.com/login/
// @include        https://ssl.kakaku.com/auth/id/login.asp
// @include        https://ssl.tabelog.com/account/login/
// @include        https://yoyaq.com/user/login
// ==/UserScript==

(function(d){
    var byid = function(id) {
	return d.getElementById(id);
    };

    var byattr = function(tag, attr, val) {
	var els = d.getElementsByTagName(tag);
	for (var i=0; i<els.length; i++)
	    if (els[i].getAttribute(attr) === val)
		return els[i];
	return null;
    };

    var get_account = function () {
	var obj = {mail: '', passwd: ''};

	for (key in obj) {
	    if (GM_getValue(key)) {
		obj[key] = GM_getValue(key);
	    } else {
		obj[key] = window.prompt(key + ' ?', '');
		GM_setValue(key, obj[key]);
	    }
	}
	return obj;
    };

    var get_loginform = function () {
	var obj = {form: null, mail: null, passwd: null};
	
	if (location.hostname === 'mansion-db.com') {
	    obj.form = byattr('form', 'action',
			      'https://mansion-db.com/?act=user_login');
	    obj.mail = byid('login_user_id');
	    obj.passwd = byid('login_password');
	} else if (location.hostname === 'okyuu.com') {
	    obj.form = byid('loginbody01') ?
		byid('loginbody01').getElementsByTagName('form')[0] : null;
	    obj.mail = byid('kakaku_id');
	    obj.passwd = byid('password');
	} else if (location.hostname === 'photohito.com') {
	    obj.form = byid('login_form');
	    obj.mail = byid('login_form_username');
	    obj.passwd = byid('login_form_password');
	} else if (location.hostname === 'secure.eiga.com') {
	    obj.form = byid('login_form');
	    obj.mail = byid('login_form_mail_address');
	    obj.passwd = byid('login_form_password');
 	} else if (location.hostname == 'ssl.tabelog.com') {
  	    obj.form = d.getElementsByTagName('form')[0];
 	    obj.mail = byid('mailaddress');
  	    obj.passwd = byid('password');
 	} else if (location.hostname === 'ssl.kakaku.com') {
	    obj.form = byattr('form', 'name', 'loginform');
	    obj.mail = byattr('input', 'name', 'mailaddress');
	    obj.passwd = byattr('input', 'name', 'password');
	} else if (location.hostname === 'yoyaq.com') {
	    obj.form = byattr('form', 'action', '/user/login');
	    obj.mail = byid('mailaddress');
	    obj.passwd = byid('password');
	}
	return obj;
    };

    var main = function() {
	var account = get_account();
	var login = get_loginform();

	if (login.form) {
	    for (key in account)
		login[key].value = account[key];
	    login.form.submit();
	}
    };

    main();

}(document));