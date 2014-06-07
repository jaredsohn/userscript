scr_meta=<><![CDATA[
// ==UserScript==
// @name           KimKha's Smileys
// @version        1.0 Anpha 1
// @namespace      http://kakalia.co.cc
// @author         Nguyễn Kim Kha
// @description    Thay đổi mặt cười truyền thống trên BKHCM.info thành mặt cười sinh động (Có thể hiệu quả trên nhiều forum vBB khác, chỉ cần thêm phần include)
// @include        http*://*bkhcm.info/*
// ==/UserScript==
]]></>;

var images = document.getElementsByTagName("img");
for (i in images) {
    if (images[i].title == "happy")
        images[i].src = "http://lh5.ggpht.com/_mkcswd7p9hc/SdEX-_QEArI/AAAAAAAAATg/l_sYTSD5ATM/AddEmoticons04267.gif";
    else if (images[i].title == "sad")
        images[i].src = "http://lh4.ggpht.com/_mkcswd7p9hc/SdEX92WXMFI/AAAAAAAAATY/VZE9GZ5s33k/AddEmoticons04269.gif";
    else if (images[i].title == "tongue")
        images[i].src = "http://lh3.ggpht.com/_mkcswd7p9hc/SdEYqdXE5pI/AAAAAAAAAWg/LXiP7B8t7Co/AddEmoticons04224.gif";
    else if (images[i].title == "crying")
        images[i].src = "http://lh3.ggpht.com/_mkcswd7p9hc/SdEYwUhAgII/AAAAAAAAAW4/LDlkR6av1yI/AddEmoticons04219.gif";
    else if (images[i].title == "laughing")
        images[i].src = "http://lh6.ggpht.com/_mkcswd7p9hc/SdEYto8m0EI/AAAAAAAAAWw/vjtCkjlEKZA/AddEmoticons04220.gif";
}

div = document.createElement('div');
div.id = "kimkha";
div.style.position = "fixed";
div.style.left="0px";
div.style.top="20px";
div.style.background = "white";
div.innerHTML = "KimKha";

document.body.appendChild(div);

//Auto updater
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '46425', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm("Bạn đang dùng ứng dụng "+this.xname+" phiên bản " +this.version+ ", tuy nhiên phiên bản mới hơn là " +this.xversion+ " đã có.\n\n  Bạn có muốn cập nhật để " +this.xname+ " chạy tốt hơn không?")) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Bạn có muốn tắt chức năng tự động cập nhật '+this.xname+' không?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Tự cập nhật "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Chức năng cập nhật có thể bật lại cho '+this.name+' từ menu con của User Script Commands.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('Hiện chưa có bản cập nhật cho '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Bật tự động cập nhật "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Kiểm tra bản cập nhật "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();