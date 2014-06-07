// ==UserScript==
// @name           eRepublik Suscription
// @namespace      eRepublik Suscription
// @author	   santirub (http://www.erepublik.com/en/citizen/profile/1208160)
// @description    Subscription link
// @version        1.3
// @include        http://*.erepublik.com/*
// ==/UserScript==

var subsImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAIAAAAv2XlzAAAABGdBTUEAALGPC/xhBQAAAO1JREFUKFONUDsKwkAQXSs7bS08lCfwAnbewNZzCIKljd4gjWAZUFNILNIEv0ii7K5vfGFYFD/LsHkzee/NzNYO9zTOx8cyM79Os95qNzomyobTeDDf9r/fJIBsyGMAj5Zd3BpI1Yscw5xUGOxPF1d6hLcWd3pdqQuZIpise0BCda4ois05gnKxmwEghQwABNCkAz4IlPytBC8cCZhtoYGezEqgg4nSWu9kJO99kiRcg+xKgBIQbrA5AJ9OUuforRzDvloKH4q70fhVQBmrsMRInFvrCqoO4Q+M/jyyCb3DkKXfbT5VZGls9r8A5AdkxZ5tYGO/PgAAAABJRU5ErkJggg==';

var icsub = document.getElementById('maildisplay');

icsub.innerHTML = icsub.innerHTML + '<div class="item" style="padding:5px 0px 5px 8px"> <a href="http://www.erepublik.com/en/news/subscriptions"><img alt="Subs" src="' + subsImg + '" height="13" width="16"/></a></div>';