// ==UserScript==
// @name           Rakuten - Jump Links
// @version        1.0
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://item.rakuten.co.jp/*
// @description	   楽天にジャンプ用リンクを付けます。
// ==/UserScript==

//hashを除いた部分を作成
url = location.href.replace(/\#[a-zA-Z0-9_]+$/,'');

//ジャンプできるようIDを設定
var item = document.evaluate('//span[@class="sale_desc"]',document,null,7,null).snapshotItem(0);
item.setAttribute('id','sale_desc');
var item = document.evaluate('//span[@class="item_name"]',document,null,7,null).snapshotItem(0);
item.setAttribute('id','item_name');

//リンク作成
var panel = document.createElement('div');
panel.setAttribute('id','GM_Panel');

var a = document.createElement('a');
a.href= url + '#sale_desc';
a.innerHTML='商品紹介先頭へ';
panel.appendChild(a);

var a = document.createElement('a');
a.href= url + '#item_name';
a.innerHTML='価格・在庫表へ';
panel.appendChild(a);

document.body.appendChild(panel);

//最後にリダイレクトまでしちゃう
location.href = url + '#sale_desc';

GM_addStyle(<><![CDATA[
#GM_Panel{
   top: 50%;
   right: 0;
   position: fixed;
   background: #eeeeee !important;
   border:1px solid #c0c0c0 !important;
   padding: 5px;
}

#GM_Panel a{
   display: block;
   font-size:medium;
}

]]></>);



 