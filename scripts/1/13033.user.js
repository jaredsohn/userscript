// ==UserScript==
// @name          X163 for FireFox
// @namespace     rufus@kali.com.cn YuJianrong@GMail.com
// @description	  下载163相册内容
// @include       http://photo.163.com/photos/*
// ==/UserScript==

unsafeWindow.X163Page = function()
{
    with(unsafeWindow)
    {
        var links = [];
        var joinedLinks = "";
        var fns = [];
        var joinedFNs = "";
        var count = 0;

        for (var i in gPhotosInfo) {
            var url = getPhotoOriginSrc(i);
            var fn = getPhotoDescr(i).replace(/(^\s*)|(\s*$)/g, "").replace(/&#(\d+);/g,function($0,$1){return String.fromCharCode(parseInt($1,10))});
            if (fn.substr(fn.length-4).toLowerCase()!='.jpg' && fn.substr(fn.length-4).toLowerCase()!='.gif' && fn.substr(fn.length-5).toLowerCase()!='.jpeg') {
                var ext = getPhotoOriginSrc(i);
                ext = ext.substr(ext.lastIndexOf("."));
                fn += ext;
            }
            if (fn == '.jpg' || fn == '.gif') {
                links[count] = url + "?/" + ("0000"+count).substr(-3) + fn;
                fns[count] = '';
            } else {
                links[count] = url + "?/" + fn;
                fns[count] = fn;
            }
            count++;
        }
        joinedLinks = links.join("\x0D\x0A");
//        joinedLinks = links.join('#@#');
//        joinedFNs = fns.join('#@#');

        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
        var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
        trans.addDataFlavor("text/unicode");
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        str.data=joinedLinks;
        trans.setTransferData("text/unicode",str,str.data.length*2);
        var clipid=Components.interfaces.nsIClipboard;
        clip.setData(trans,null,clipid.kGlobalClipboard);

        var HTML="<HTML>";
        for (var index in links)
            HTML += '<a href="' + links[index] + '">'+links[index] + "</a><br>";
        HTML +="</HTML>";
        document.documentElement.innerHTML=HTML;
    }
}

with(unsafeWindow)
    if(typeof(gAlbumsIds) == 'object') {

        var ft=document.getElementById('footer');
        ft.textContent='';
        var base = 'http://photo.163.com/photos/'+gUserId+'/';
        var oTBody = document.createElement('TBODY');
        var oTR; var oTD;
        oTR = document.createElement('TR'); oTR.height = '30px'; oTR.bgColor = 'silver';
        oTD = document.createElement('TD'); oTD.width = '25px'; oTD.textContent =  unescape("%u5E8F%u53F7"); oTR.appendChild(oTD);
        oTD = document.createElement('TD'); oTD.width = '25px'; oTD.textContent =  unescape("%u9875%u7801"); oTR.appendChild(oTD);
        oTD = document.createElement('TD'); oTD.width = '30px'; oTD.textContent =  unescape("%u9875%u6570"); oTR.appendChild(oTD);
        oTD = document.createElement('TD'); oTD.width = '60px'; oTD.textContent =  unescape("%u72B6%u6001"); oTR.appendChild(oTD);
        oTD = document.createElement('TD'); oTD.width = '150px'; oTD.textContent = unescape("%u76F8%u518C"); oTR.appendChild(oTD);
        oTD = document.createElement('TD'); oTD.width = '150px'; oTD.textContent = unescape("%u8BF4%u660E"); oTR.appendChild(oTD);
        oTBody.appendChild(oTR);
        for (var i=0; i!=gAlbumsIds.length; i++) {
            oTR = document.createElement('TR'); oTR.height = '25px';
            oTD = document.createElement('TD'); oTD.textContent = (i+1); oTR.appendChild(oTD);
            oTD = document.createElement('TD'); oTD.innerHTML = '<a onclick=loadPage(parseInt(this.innerHTML)); href="#p'+(Math.floor(i/16)+1)+'">'+(Math.floor(i/16)+1)+'</a>'; oTR.appendChild(oTD);
            oTD = document.createElement('TD'); oTD.textContent = gAlbumsInfo[gAlbumsIds[i]][2]; oTR.appendChild(oTD);
            oTD = document.createElement('TD'); oTD.textContent = PHOLDER_PRIVACY_LABELS[gAlbumsInfo[gAlbumsIds[i]][1]]; oTR.appendChild(oTD);
            oTD = document.createElement('TD'); oTD.innerHTML = '<a href="'+base+gAlbumsIds[i]+'/">'+gAlbumsInfo[gAlbumsIds[i]][3]+'</a>'; oTR.appendChild(oTD);
            oTD = document.createElement('TD'); oTD.textContent = gAlbumsInfo[gAlbumsIds[i]][4]; oTR.appendChild(oTD);
            oTBody.appendChild(oTR);
            oTR = document.createElement('TR'); oTR.height = '1px'; oTR.bgColor = 'silver';
            oTD = document.createElement('TD'); oTD.colSpan = 6; oTR.appendChild(oTD);
            oTBody.appendChild(oTR);
        }
        ft.appendChild(oTBody);
    } else if (typeof(gPhotosInfo) == "object") {
        var cell;
        with (document.getElementById('header')) {
          insertRow(-1).height='34px';
          cell=insertRow(-1).insertCell(-1);
        }
        cell.innerHTML = '<input type=button value="X163" onClick=X163Page()>';
    }


