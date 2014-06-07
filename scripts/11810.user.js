// ==UserScript==
// @name           notfourchan.net
// @description    Makes notfourchan.net look like original not4chan.net, and removes ads/rules (lol rules); kamichu@nm.ru for feedback
// @include        http://notfourchan.net/*/*
// @include        http://www.notfourchan.net/*/*
// ==/UserScript==

// change to keeprules=1 to keep rules form being removed
keeprules=0;

function get(str,index){
	var list,elem;
	list=document.evaluate(str,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if(index<0) index=snapshotLength+index;
	if(list.snapshotLength>index)
		return list.snapshotItem(index);

	return null;
}
function remove(str,index){
	var elem=get(str,index);
	if(elem)
		elem.parentNode.removeChild(elem);
}

get("//link[@title='Not4chan']",0).href="data:text/css;charset=utf-8;base64,Ym9keSB7DQoJYmFja2dyb3VuZDojZWVmZmYyOw0KCWNvbG9yOiMwMDIyMDA7DQp9DQoudGh1bWIgew0KfQ0KYSB7DQoJY29sb3I6IzM0MzQ1QzsNCn0NCmE6dmlzaXRlZCB7DQoJY29sb3I6IzM0MzQ1QzsNCn0NCmE6aG92ZXIgew0KCWNvbG9yOiNERDAwMDA7DQp9DQphLnF1b3RlbGluayB7DQoJY29sb3I6I0REMDAwMDsNCn0NCi5sb2dvIHsNCgljbGVhcjpib3RoOw0KCXRleHQtYWxpZ246Y2VudGVyOwkNCgliYWNrZ3JvdW5kOmluaGVyaXQ7DQoJZm9udC1zaXplOjI0cHQ7DQoJZm9udC13ZWlnaHQ6IGJvbGQ7DQoJY29sb3I6I0FGMEEwRjsNCgl3aWR0aDoxMDAlOw0KfQ0KLnBvc3RhcmVhIHsNCgliYWNrZ3JvdW5kOmluaGVyaXQ7DQp9DQouYWRtaW4tcmVwbHlib3ggew0KCWJvcmRlcjogMXB4IHNvbGlkICMwMDA7DQoJYmFja2dyb3VuZDogIzg4Q0M5OTsNCglwYWRkaW5nOiA1cHg7DQoJbWFyZ2luLWJvdHRvbTogNXB4Ow0KCXBhZGRpbmctYm90dG9tOiAxMHB4Ow0KCXBhZGRpbmctbGVmdDogLTMwcHg7DQp9DQouYWRtaW4tcGFyZW50Ym94IHsNCglib3JkZXI6IDFweCBzb2xpZCAjMDAwOw0KCWJhY2tncm91bmQ6ICM4OENDOTk7DQoJcGFkZGluZzogNXB4Ow0KCXBhZGRpbmctYm90dG9tOiAxMHB4Ow0KCW1hcmdpbi1ib3R0b206IDVweDsNCglwYWRkaW5nLWxlZnQ6IC0zMHB4Ow0KCW1hcmdpbi1sZWZ0OiA2MHB4Ow0KfQ0KLmFkbWluIHsNCglmb250LXdlaWdodDogYm9sZDsNCn0NCi5wb3N0YmxvY2sgew0KCWJhY2tncm91bmQ6ICM4OENDOTk7DQoJZm9udC13ZWlnaHQ6ODAwOw0KfQ0KLmZvb3RlciB7DQoJdGV4dC1hbGlnbjpjZW50ZXI7DQp9DQoudW5rZnVuYyB7DQoJYmFja2dyb3VuZDppbmVydDsNCgljb2xvcjojNzg5OTIyOw0KfQ0KLmZpbGVzaXplIHsNCgl0ZXh0LWRlY29yYXRpb246IG5vbmU7DQp9DQouZmlsZXRpdGxlIHsNCgljb2xvcjojMEYwQzVEOw0KCWZvbnQtc2l6ZToxLjFlbTsNCglmb250LXdlaWdodDo4MDA7DQp9DQouYWRtaW5iYXIgew0KCXRleHQtYWxpZ246cmlnaHQ7DQoJY2xlYXI6Ym90aDsNCglmbG9hdDpyaWdodDsNCn0NCi5yZXBseW1vZGUgew0KCWJhY2tncm91bmQ6I0UwNDAwMDsNCgl0ZXh0LWFsaWduOmNlbnRlcjsNCglwYWRkaW5nOjJweDsNCgljb2xvcjojRkZGRkZGOw0KCXdpZHRoOjEwMCU7DQoJZm9udC13ZWlnaHQ6Ym9sZDsNCn0NCi5ydWxlcyB7DQoJZm9udC1zaXplOjAuN2VtOw0KfQ0KLnBvc3Rlcm5hbWUgew0KCWNvbG9yOiMxMTc3NDM7DQoJZm9udC13ZWlnaHQ6Ym9sZDsNCgliYWNrZ3JvdW5kOiBpbmhlcml0Ow0KfQ0KLnBvc3RlcnRyaXAgew0KCWJhY2tncm91bmQ6aW5oZXJpdDsNCgljb2xvcjojMjI4ODU0Ow0KfQ0KLm9sZHBvc3Qgew0KICBiYWNrZ3JvdW5kOmluaGVyaXQ7DQogIGNvbG9yOiMwRjBDNUQ7DQogIGZvbnQtd2VpZ2h0OjgwMDsNCn0NCi5vbWl0dGVkcG9zdHMgew0KICBiYWNrZ3JvdW5kOmluaGVyaXQ7DQogIGNvbG9yOiMwNzA3MDc7DQp9DQoucmVwbHkgew0KCWJhY2tncm91bmQ6I2Q2ZjBkYTsNCn0NCi5oaWdobGlnaHQgew0KCWJhY2tncm91bmQ6I2Q2YmFkMDsNCn0NCi5kb3VibGVkYXNoIHsNCiAJdmVydGljYWwtYWxpZ246dG9wOw0KCWNsZWFyOmJvdGg7DQoJZmxvYXQ6bGVmdDsNCn0NCi5yZXBseXRpdGxlIHsNCgliYWNrZ3JvdW5kOmluaGVyaXQ7DQoJZm9udC1mYW1pbHk6IFZlcmRhbmEsIEFyaWFsLCBzYW5zLXNlcmlmOw0KICBjb2xvcjojMEYwQzVEOw0KICBmb250LXdlaWdodDo4MDA7DQp9DQouY29tbWVudHBvc3Rlcm5hbWUgew0KCWJhY2tncm91bmQ6aW5oZXJpdDsNCiAgZm9udC1zaXplOjEzcHg7DQogIGZvbnQtZmFtaWx5OiBWZXJkYW5hLCBBcmlhbCwgc2Fucy1zZXJpZjsNCiAgY29sb3I6IzExNzc0MzsNCiAgZm9udC13ZWlnaHQ6ODAwOw0KfQ0KYS5xdW90ZWpzIHsNCiAgY29sb3I6IzAwMDAwMDsNCgl0ZXh0LWRlY29yYXRpb246IG5vbmU7DQp9DQphLnF1b3RlanM6aG92ZXIgew0KICBmb250LXdlaWdodDpib2xkOw0KfQ%3D%3D"

remove("/html/body/br",0);
remove("/html/body/br",0);
remove("/html/body/br",0);
remove("/html/body/hr",0);
remove("/html/body/div[5]",0);

if(get("//div[@class='replymode']",0)){
	remove("/html/body/div[7]",0);
	remove("/html/body/hr",0);
	remove("/html/body/div[6]/hr",0);
	
	elem=get("/html/body/div[5]",0);
	elem.parentNode.insertBefore(document.createElement("hr"),elem.nextSibling);
	
	if(!keeprules) remove("/html/body/div[6]/form/table/tbody/tr[8]",0);
} else{

	remove("/html/body/hr",1);
	remove("/html/body/div[6]",0);
	
	if(!keeprules) remove("/html/body/div[5]/form/table/tbody/tr[8]",0);
}
elem=get("//div[@class='footer']",0);
elem.parentNode.removeChild(elem.previousSibling);
elem.parentNode.removeChild(elem);
