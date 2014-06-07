// ==UserScript==
// @name          Rapidshare Bundle
// @namespace     Jillian
// @description	  Hace rapidshare mas tolerble version JBZ
// @include       http://*.rapidshare.*
// @include       http://rapidshare.*
// ==/UserScript==

function addJS(a){
    var b = document.getElementsByTagName('head')[0];
    if (!b) {
        return;
    }
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.innerHTML = a;
    b.appendChild(c);
}

/*check for free download download*/

var freeUserButton = document.evaluate(
    '//input[@value="Free user"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);

if(freeUserButton){
    freeUserButton.click();
}else{

/* auto start download*/

function autoClickDownload(){
    var downloadImage =
        document.evaluate(
            '//input[@src="/img2/download_file.jpg"]',
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
        ).snapshotItem(0);
    
    if(downloadImage){
        downloadImage.click();
    }
}


function whaitTime(){
    var dl = document.getElementById('dl');
    
    if(dl)
    {
        if(dl.childNodes[1]){
            var pat = new RegExp("[0-9]+")
            var message = dl.childNodes[1].innerHTML.toLowerCase();
            var result = pat.exec(message);
            if (result){
                window.setTimeout(whaitTime,Number(result)*1000);
                dl.style.backgroundColor='red';
            }
            
        }else if (dl.childNodes[0].nodeName.toLowerCase()==="form"){
            dl.childNodes[0].submit();
        }
    }else{
        window.setTimeout(whaitTime,5*1000);
    }
}

addJS(whaitTime);
window.setTimeout(whaitTime,3*1000);

}