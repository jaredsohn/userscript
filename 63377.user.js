// ==UserScript==
// @name         AmazonImageSizeChanger
// @namespace    http://d.hatena.ne.jp/Koonies/
// @description  Changes product images on Amazon larger.
// @include      http://www.amazon.*/*
// @version      1.1
// ==/UserScript==

(function(){
    function evalInPage(fun) {
      location.href = "javascript:void (" + fun + ")()";
    }
    function SizeChange(imgHTML){
        return imgHTML.replace(/_AA[0-9]+_/, '_AA500_').replace(/_SL[0-9]+/, '').replace(/width="[0-9]+"/ , 'width="500"').replace(/height="[0-9]+"/, 'height="500"');
    }
    var ele;
    if (!!document.getElementById('prodImage')) {
        ele = document.getElementById('prodImage').parentNode;
        ele.innerHTML = SizeChange(ele.innerHTML);
        
        evalInPage(function () {
            function SizeChange(imgHTML){
                return imgHTML.replace(/_AA[0-9]+_/, '_AA500_').replace(/_SL[0-9]+/, '').replace(/width="[0-9]+"/ , 'width="500"').replace(/height="[0-9]+"/, 'height="500"');
            }
            for (var i in registeredImages) {
                registeredImages[i].html = SizeChange(registeredImages[i].html);
            }
        });
    } else {
        ele = document.getElementById('prodImageCell').parentNode;
        ele.style.width  = 500;
        ele.style.height = 500;
        ele.innerHTML = SizeChange(ele.innerHTML);
        evalInPage(function () {
            function SizeChange(imgHTML){
                return imgHTML.replace(/_AA[0-9]+_/, '_AA500_').replace(/_SL[0-9]+/, '').replace(/width="[0-9]+"/ , 'width="500"').replace(/height="[0-9]+"/, 'height="500"');
            }
            var img=goTwisterProductImage.getRegisteredImages();
            for(var i in img){
                img[i].imageHTML = SizeChange(img[i].imageHTML);
            }
        });
    }
})();
