// ==UserScript==
// @name           Postgres docs title reverse
// @description    Reverse breadcrumb order of title string on Postgres documentation pages
// @namespace      zik.hu/pgdoctitle
// @include        http://www.postgresql.org/docs/*
// ==/UserScript==

document.title = document.title.split(':').reverse().join(':');

