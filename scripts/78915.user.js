// ==UserScript==
// @name           Eksi - gundem tusu
// @description    Eksi Sozluk menusune "gundem" tusu sokusturma seysi.
// @namespace      http://userscripts.org/users/kynes
// @version        0.1
// @author         kynes
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://sozluk.sourtimes.org/top.asp
// @include        http://www.eksisozluk.com/top.asp
// ==/UserScript==


// XPath wrapper
function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


// bu reklam IFRAME'i ortaligi dagitiyor!	
function menuReklamiKaldir(){
	var reklamDiv = document.getElementById("ifs");
	if(reklamDiv){
		reklamDiv.parentNode.removeChild(reklamDiv);
	}
}

function gundemTusuEkle() {
    var tusTablosu = xpath("/html/body//table[1]//table[1]//tr[1]//td[1]").snapshotItem(0);

    var gundemTusu = document.createElement('td');
    var currentTime = new Date();

    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()

    gundemTusu.className="but";
    gundemTusu.setAttribute("onmouseover","ov(this)");        
    gundemTusu.setAttribute("onmouseout","bn(this)");        
    gundemTusu.setAttribute("onmousedown","md(this)");        
    gundemTusu.setAttribute("onmouseup","bn(this)");
    gundemTusu.setAttribute("onclick","top.sozindex.location.href='index.asp?a=sr&kw=&au=&so=g&fd="+day+"&fm="+month+"&fy="+year+"'"); 
    gundemTusu.innerHTML = '<a title="gündem" target="sozindex" >&nbsp;gündem&nbsp;</a>';

    tusTablosu.parentNode.insertBefore(gundemTusu,tusTablosu);

}


menuReklamiKaldir();
gundemTusuEkle();
