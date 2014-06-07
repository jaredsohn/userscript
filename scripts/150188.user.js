// ==UserScript==
// @name           贴吧楼中楼全部收拢工具
// @version			20121015.1
// @namespace		nhnhwsnh@lzlautofold
// @include			http://tieba.baidu.com/*
// @author			nhnhwsnh
// ==/UserScript== 
if(document.getElementById("lzonly")) createfolddiv();
function createfolddiv(){
        autofold = creaElemIn('div', document.body);
        autofold.setAttribute('style', 'opacity:0.3;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEaklEQVRoge2ZMWwbRxAAWapUqZJlSpUu1blUFbgRoCaA4UpNeqlXIcBFAgQQAlUpDCRwYcBFIJYqWQS0k0K58Hf3BDGmaYqkfvcQkCn+X6Ket/f/5EuNucA1//d7N3d7u3v7jcZa1rKWtXw10m7PNonkMGvt9myz6JtWa7ZBxK8R+dVTzLGUAPC5tW5GJFMiNyNyH0L9W63ZhrXuTyK5RZQ+AJ8Tye6jT7Tdnm0aM97W3icAD9oEkV9q/btdObLWjea/QZSb0Bi1SBRNzgB4kg1qrewVgEyJ5NCnq9PpbQHIcLG/G0QRP39UEET5kls9XBYEkdu+/gDxu0eFaLdnm4jM+YGXASGKT62ViacvGDPeNmbQNGa0M+84PO3FUiDGDJ8RyWBVEGtlj0g+K32znR4hLo6Va0OA+KKMZ8ytorwgWrTpKiDGjLeJ+N+CCZZuqYf0mq4qAHzs80rZ+06nt4XoNZfDRuMuxkBdEPdnio+rgpx7lJzfr/agiSgjDQQgvqgbIjVD1GftESLXC5uN/wwRySFA/F3e4821m8C7guYGRPEvpSE0j/UQZLTjO6CIfILorhUbH0URnxDJLnk8U/ItTxF5SiR/I/LJ/PvK8Sa02vc7Jru+lUWMY2vF+UHkMjRuFE3OklRHpkQyShdz+RQGgA+IwjuCGO8Tec+I0vgqlIokeZjchsasLOlW+iZ0pzQAWxmi0VDzsC8r7UgZEK0PovwMEL9LDiazte46iSeym3nCfAqvmSlAfLE0RFmQxJ71PlHEzwH4wJhB01rZs/Y+uCJK35ibbzJdvjws3+fRQJJVD/e5n6igx9w+pt7xFaL0c07BRdHkbCWIsiBaNusD0eIKAP8OwB7PJxNjRjtPAmKtXHrejxDjfZ9OxEWXrAVGRG6vDJEMyj8UH3Zv5FdBAOKftPiSMyvb6fS2agEpY/+Kx1LdZZpkfgpBrOxu81LG/pWJDEK2XZCDFUb+JUB8XmZ1kEZDPVv170YK4l21+buAMpmRMYNmWLe2265/dfXft3WDeHckuwsgxvuILFVBAPjYWnejm5a7LlqIiiDqGcmiszdZRGTW7tSBjDp/Tv5otWYbdYG8KRpQaz59aWb7T5nvk2pLfFoLCOkBMdgQxfn18Wsib4ruezatrWi3fPXD9RZ1qSY1BLj9jcj1fbpqc8Vl6lGaM8gkZFJZik4kvxLJguOw1o2jiL+vBYYoPlUOtfcM5XMkzaTm05AQLKK7rlyQqw4ZBjFmvK1ktguBL2TKtSWQFUHeNBpZcY4/VrF9zZRr9WJVQbQ4VJSGaMVuROk/2h8u5cAfatHbWhkjytsivYjy1loZPxmMsiM/KvVgAYjfl9UNEL/3eTIAHq58jy8DQiQfyFPBR5RPVS5L6b/Gvzx6bkO/9paSJB2/qwpOKf1/mJjGg/rU7TLxwJhBM7mFMhMxI7rP3a4c1QqRDDTeprQma61cWivjbNW7XTlK7uiut4rHMWbQBOCDrKxU2+TXspavUP4H28lZu0O9IFMAAAAASUVORK5CYII=") no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7);border-radius:5px 0 0 5px;cursor:pointer;position:fixed;top:65%;width:60px;height:60px;right:-40px;z-index:9999');
        autofold.setAttribute("id","autofold")
        //autofold.innerHTML = '收';
        autofold.addEventListener('click', change, false);
        autofold.addEventListener('mouseover', function(){ autofold.style.opacity = 1;}, false);
        autofold.addEventListener('mouseover', function(){ autofold.style.right = '0';}, false);
        autofold.addEventListener('mouseout', function(){ autofold.style.opacity = 0.3; }, false);
        autofold.addEventListener('mouseout', function(){ autofold.style.right = '-40px'; }, false);
}
function creaElemIn(tagname, destin) {
	var theElem = destin.appendChild(document.createElement(tagname));
	return theElem;
}
function change(){
    //document.getElementById("autofold").style.display = 'none';
    var objDiv=document.getElementsByTagName("a");
    for(var count=0;count<objDiv.length;count++){
         if(objDiv[count].className=="lzl_link_unfold")
         {
                var obj=objDiv[count];
                obj.style.display='inline'; 
         }
    }
    var objDiv=document.getElementsByTagName("span");
    for(var count=0;count<objDiv.length;count++){
        if(objDiv[count].className=="lzl_link_fold")
         {
                var obj=objDiv[count];
                obj.style.display='none'; 
         }

    }
    var objDiv=document.getElementsByTagName("div");
    for(var count=0;count<objDiv.length;count++){
         if(objDiv[count].className=="j_lzl_container")
         {
                var obj=objDiv[count];
                obj.style.display='none'; 
         }
    }
}


