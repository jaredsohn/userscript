// ==UserScript==
// @name           Postgres Newest Docs (ja)
// @namespace      http://0-oo.net/
// @description    PostgreSQL日本語マニュアルのサイトに来た時に最新版のページに遷移する
// @homepage       http://userscripts.org/scripts/show/102431
// @version        0.2.0
// @include        http://www.postgresql.jp/document/*
// @exclude        http://www.postgresql.jp/document/current/*
// ==/UserScript==
//
// ( The MIT License )
//
location.href = location.href.replace(/\/(pg)?[.0-9]+(doc)?\/.+\//, "/current/html/");
