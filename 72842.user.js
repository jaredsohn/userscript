// ==UserScript==
// @name           creatter checker
// @namespace      http://www.hatena.ne.jp/DaiKawakami/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function(){
	try{
		var userName = document.getElementsByName("page-user-screen_name")[0].content;
	}catch(e){
		return;
	}
	makeLink();
	
	function makeLink(){

		var setPoint = document.getElementById("profile-image");
		var aTag = document.createElement("a");
		aTag.href = "http://creatter.net/view/user/" + userName;
		aTag.target = "_blank";
		var imgTag = document.createElement("img");
		imgTag.src = "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////APz8/AD8/PwA+vr6Afr6+gP6+voD+vr6A/r6+gP8/PwA/Pz8AP///wD///8A////AP///wD///8A/Pz8APr6+gX4+PhQ+fn5m/r6+sf6+vrP+vr6z/r6+s/7+/vP+vr6rPj4+D/8/PwA////AP///wD///8A/Pz8APn5+SX7+/vI/v7+//z03P/55Kr/+eGi//nhov/54aL/+eGi//zy1v/+/v76+fn5Rfz8/AD///8A/Pz8APn5+Sb9/f3n/fXi//PFSP/vrgD/764A/++uAP/vrgD/764A/++uAP/vsAb/++7K//z8/MD8/PwA////APv7+wX8/PzJ/fXh//C2G//vrgD/764A/++uAP/vrgD/764A/++uAP/vrgD/764A//fYhf/+/v7o/Pz8APz8/AD7+/tT/v7+//PERf/vrgD/764A/++uAP/vrgD/764A/++uAP/vrgD/764A/++xCv/88ND//f39vPz8/AD8/PwA/Pz8nvzy1v/vrgD/764A/++uAP/vsQv/99mJ//nkrP/55Kz/+eSs//nkrf/99d///v7+9vz8/Dr8/PwA/Pz8AP39/cr54qP/764A/++uAP/vrgD/+NuP//7+/vb7+/vE/f39wv39/cL9/f3C/f39m/39/TD8/PwA////APz8/AD9/f3P+eCe/++uAP/vrgD/764A//nipP/7+/vo9vb2jfj3+Iv4+PiL+fn5ifn5+WT5+fkS/Pz8AP///wD8/PwA/f39rPvsxP/vrgD/764A/++uAP/xuST/++3H//346v/9+Or//fjq//346v/+/v3//f393vn5+SH8/PwA////APz8/Gr+/vz/8bkk/++uAP/vrgD/764A/++uAP/vrgD/764A/++uAP/vrgD/8bsp//335//7+/uo/Pz8AP///wD8/PwP/v7+5/rqvv/vrwX/764A/++uAP/vrgD/764A/++uAP/vrgD/764A/++uAP/32or//v7+5fz8/AD///8A/Pz8APz8/Ej+/v76+ue2//C0Ff/vrgD/764A/++uAP/vrgD/764A/++uAP/vrgD/+uWv//39/c/8/PwA////AP///wD8/PwA/Pz8UP7+/u7++vH/+OCd//XQbP/1zmb/9c5m//XOZv/1zmb/+eGh//7+/v/8/Pxn/Pz8AP///wD///8A////APz8/AD9/f0a/f39jP7+/tX+/v78/////////////////v7+/f7+/uP9/f1w/Pz8AP///wD///8A////AP///wD///8A////AP///wD8/PwA/f39Bf39/Qr9/f0K/f39Cv39/Qr9/f0A/Pz8AP///wD///8A//8AAPwHAADwAwAA4AEAAMABAADAAQAAgAMAAIAHAACADwAAgAMAAMABAADAAQAA4AEAAPADAAD4BwAA//8AAA==";
		imgTag.width = "16";
		imgTag.height = "16";
		aTag.appendChild(imgTag);
		if(setPoint){
			var ins = setPoint.parentNode.parentNode;
		}else{
			var ins = document.getElementsByClassName("thumb clearfix")[0];  
		}
		ins.appendChild(aTag);
	}
})();