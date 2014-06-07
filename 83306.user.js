// ==UserScript==
// @name           4chanpop
// @namespace      JoeyScripts (joeyez@gmail.com)
// @description    Opens all threads over 100 posts in their own tab (4chan)
// @version        1
// @include        http://boards.4chan.org/*
// ==/UserScript==

nameField = document.getElementsByName("email")[0];
popularImg = document.createElement("img");
popularImg.src="http://static.4chan.org/image/favicon.ico";
nameField.parentNode.appendChild(popularImg);
popularImg.href = "#";
popularImg.addEventListener("click", popularGet, false);



function popularGet(){
    
    var a = /(\d{3}\s\posts)|(stsop\s\d{3})/g;
    var b = /(\d{9}|\d{8}|\d{7}|\d{6})/g;
    
    var spans = document.getElementsByTagName("span");
    
    var array = [];
    
    for ( var i = 0; i<spans.length; i++){
        if (spans[i].innerHTML.match(a)){
            if (spans[i-1].innerHTML.match(b)){
                var thread = RegExp.$1;
                array.push(thread);
                
            }
        }
    }
    
    var unique = unique(array);
    
    for (var i=0; i<unique.length; i++) {
        window.open(location.href+"res/"+unique[i]);
    }
    
    function unique(a) {
        tmp = new Array(0);
        for(i=0;i<a.length;i++){
            if(!contains(tmp, a[i])){
                tmp.length+=1;
                tmp[tmp.length-1]=a[i];
            }
        }
        return tmp;
    }
    function contains(a, e) {
        for(j=0;j<a.length;j++)if(a[j]==e)return true;
        return false;
    }
    
}