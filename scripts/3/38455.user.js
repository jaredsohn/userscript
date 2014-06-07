// ==UserScript==
// @name           Not4chan
// @description    Makes notfourchan looks like the original not4chan, also removes ads
// @include        http://*notfourchan.net/*/*
// ==/UserScript==

function getNode(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function removeNode(xpath) {
    var todelete = getNode(xpath);
    if(todelete)
        todelete.parentNode.removeChild(todelete);
}

unsafeWindow.open = function(param) { void(param) };

if(getNode("//div[@id='slashpage']")) window.location.reload();

getNode("//link[@title='not4chan']").href = "data:text/css;charset=utf-8;base64,Ym9keSB7DQoJYmFja2dyb3VuZDogI0VFRkZGMjsNCgljb2xvcjogIzAwMjIwMDsNCn0NCmEsIGE6dmlzaXRlZCB7DQoJY29sb3I6ICMzNDM0NUM7DQp9DQphOmhvdmVyLCBhLnF1b3RlbGluayB7DQoJY29sb3I6ICNERDAwMDA7DQp9DQphLnF1b3RlanMgew0KCWNvbG9yOiAjMDAwMDAwOw0KCXRleHQtZGVjb3JhdGlvbjogbm9uZTsNCn0NCmEucXVvdGVqczpob3ZlciB7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQoubG9nbyB7DQoJYmFja2dyb3VuZDogaW5oZXJpdDsNCgljbGVhcjogYm90aDsNCgljb2xvcjogI0FGMEEwRjsNCglmb250LXNpemU6IDI0cHQ7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJdGV4dC1hbGlnbjogY2VudGVyOwkNCgl3aWR0aDogMTAwJTsNCn0NCi5wb3N0YXJlYSB7DQoJYmFja2dyb3VuZDogaW5oZXJpdDsNCn0NCi5hZG1pbi1yZXBseWJveCB7DQoJYmFja2dyb3VuZDogIzg4Q0M5OTsNCglib3JkZXI6IDFweCBzb2xpZCAjMDAwOw0KCW1hcmdpbi1ib3R0b206IDVweDsNCglwYWRkaW5nLWJvdHRvbTogMTBweDsNCglwYWRkaW5nOiA1cHg7DQp9DQouYWRtaW4tcGFyZW50Ym94IHsNCgliYWNrZ3JvdW5kOiAjODhDQzk5Ow0KCWJvcmRlcjogMXB4IHNvbGlkICMwMDA7DQoJbWFyZ2luLWJvdHRvbTogNXB4Ow0KCW1hcmdpbi1sZWZ0OiA2MHB4Ow0KCXBhZGRpbmctYm90dG9tOiAxMHB4Ow0KCXBhZGRpbmc6IDVweDsNCn0NCi5hZG1pbiB7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQp9DQoucG9zdGJsb2NrIHsNCgliYWNrZ3JvdW5kOiAjODhDQzk5Ow0KCWZvbnQtd2VpZ2h0OiA4MDA7DQp9DQouZm9vdGVyIHsNCgl0ZXh0LWFsaWduOiBjZW50ZXI7DQp9DQoudW5rZnVuYyB7DQoJYmFja2dyb3VuZDogaW5oZXJpdDsNCgljb2xvcjogIzc4OTkyMjsNCn0NCi5maWxlc2l6ZSB7DQoJdGV4dC1kZWNvcmF0aW9uOiBub25lOw0KfQ0KLmZpbGV0aXRsZSB7DQoJY29sb3I6ICMwRjBDNUQ7DQoJZm9udC1zaXplOiAxLjFlbTsNCglmb250LXdlaWdodDogODAwOw0KfQ0KLmFkbWluYmFyIHsNCgljbGVhcjogYm90aDsNCglmbG9hdDogcmlnaHQ7DQoJdGV4dC1hbGlnbjogcmlnaHQ7DQp9DQoucmVwbHltb2RlIHsNCgliYWNrZ3JvdW5kOiAjRTA0MDAwOw0KCWNvbG9yOiAjRkZGRkZGOw0KCWZvbnQtd2VpZ2h0OiBib2xkOw0KCXBhZGRpbmc6IDJweDsNCgl0ZXh0LWFsaWduOiBjZW50ZXI7DQoJd2lkdGg6IDEwMCU7DQp9DQoucnVsZXMgew0KCWZvbnQtc2l6ZTogMC43ZW07DQp9DQoucG9zdGVybmFtZSB7DQoJYmFja2dyb3VuZDogaW5oZXJpdDsNCgljb2xvcjogIzExNzc0MzsNCglmb250LXdlaWdodDogYm9sZDsNCn0NCi5wb3N0ZXJ0cmlwIHsNCgliYWNrZ3JvdW5kOiBpbmhlcml0Ow0KCWNvbG9yOiAjMjI4ODU0Ow0KfQ0KLm9sZHBvc3Qgew0KCWJhY2tncm91bmQ6IGluaGVyaXQ7DQoJY29sb3I6ICMwRjBDNUQ7DQoJZm9udC13ZWlnaHQ6IDgwMDsNCn0NCi5vbWl0dGVkcG9zdHMgew0KCWJhY2tncm91bmQ6IGluaGVyaXQ7DQoJY29sb3I6ICMwNzA3MDc7DQp9DQoucmVwbHkgew0KCWJhY2tncm91bmQ6ICNENkYwREE7DQp9DQouaGlnaGxpZ2h0IHsNCgliYWNrZ3JvdW5kOiAjRDZCQUQwOw0KfQ0KLmRvdWJsZWRhc2ggew0KCWNsZWFyOiBib3RoOw0KCWZsb2F0OiBsZWZ0Ow0KCXZlcnRpY2FsLWFsaWduOiB0b3A7DQp9DQoucmVwbHl0aXRsZSB7DQoJYmFja2dyb3VuZDogaW5oZXJpdDsNCgljb2xvcjogIzBGMEM1RDsNCglmb250LWZhbWlseTogVmVyZGFuYSwgQXJpYWwsIHNhbnMtc2VyaWY7DQoJZm9udC13ZWlnaHQ6IDgwMDsNCn0NCi5jb21tZW50cG9zdGVybmFtZSB7DQoJYmFja2dyb3VuZDogaW5oZXJpdDsNCgljb2xvcjogIzExNzc0MzsNCglmb250LWZhbWlseTogVmVyZGFuYSwgQXJpYWwsIHNhbnMtc2VyaWY7DQoJZm9udC1zaXplOiAxM3B4Ow0KCWZvbnQtd2VpZ2h0OiA4MDA7DQp9";

if(/comics/.test(window.location)) return;

removeNode("/html/body/div[@id='dhtmlwindowholder']");
removeNode("/html/body/hr[2]");
removeNode("/html/body/div[@class='logo'][2]");
removeNode("/html/body/br[last()-1]");
removeNode("/html/body/br[last()-1]");
removeNode("/html/body/div[last()]");
removeNode("//iframe");
removeNode("//div[strong]");
removeNode("//div[@id='zzsldr']");

while(getNode("/html/body/a[@id='aawlinkban']"))
    removeNode("/html/body/a[@id='aawlinkban']");

getNode("/html/body/hr").setAttribute("width", "90%");