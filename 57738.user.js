// ==UserScript==
// @name           tcportal2shainhp
// @namespace      jp.co.gara
// @include        http://tc.tis.co.jp/user/*
// @exclude        http://tc.tis.co.jp/user/blog
// @exclude        http://tc.tis.co.jp/user/social
// @exclude        http://tc.tis.co.jp/user/bookmark
// @exclude        http://tc.tis.co.jp/user/share_file
// @exclude        http://tc.tis.co.jp/user/group
// @exclude        http://tc.tis.co.jp/user/event
// @exclude        http://tc.tis.co.jp/user/new_chain
// ==/UserScript==

		var uid = document.getElementsByTagName("table").item(0).rows.item(0).cells.item(1).firstChild.data;

        unsafeWindow.$j('.box_space_img_body').append('<div ><a href="http://jinjios4/jshp/img/' + uid.substring(5,6) + '/' + uid + '.jpg"><img border="0" name="picture" src="http://jinjios4/jshp/img/' + uid.substring(5,6) + '/' + uid + '.jpg"  width="120" /></a></div>');
        unsafeWindow.$j('.box_space_img_body').append('<div ><a href="http://jinjios4/jshp/img_al/' + uid.substring(5,6) + '/' + uid + '_al.jpg"><img border="0" name="picture" src="http://jinjios4/jshp/img_al/' + uid.substring(5,6) + '/' + uid + '_al.jpg" width="120" /></a></div>');

