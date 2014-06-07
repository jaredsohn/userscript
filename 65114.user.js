// ==UserScript==
// @name           Favotter checker en
// @revision       20091228
// @author         biikame
// @namespace      http://userscripts.org/scripts/show/65114
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
		aTag.href = "http://favotter.matope.com/en/user.php?user=" + userName;
		aTag.target = "_blank";
		var imgTag = document.createElement("img");
		imgTag.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAq9QTFRFIx+HFAx9Gg+AFBeEFhiFGBmGHh2DJSGJKCSFMiOHKiaHLCeILiiKNjaX4A8nPTWROzyWxx4tnSdWPT2YWzeKyiM1SECXwycyzDI/zTNFV1Ci4TI92DVF0TdIyzpGyjpL0jhJzDtH3ThDqkRsiE2F0EBQYFqmilWLZmKoZ2OpaGSq1Exb2FFkzlZi01pmcXCwq2SJ6FZi5Vtp02NwfHq71XF43m5/1nN/hoa1iIW713SAjIi+j4u1jo6w34KL7H+Ilpa56oSK5IaPnJi164WL5YeQ4I2dnp7OwZmhoqHEu5+wqaXQq6fFRtgW8JidrqnHTNsAr6rIqazVra3Qu6vGrbDNUd8Ns6/NWNwe5aSutLDOva7Izqyyvq/JtrLQXeAlZN4w7KmtY+QbZOUdYuUraeM1u7vSv7rZdeBH87C0bOY50rrE0bvLwr/QdOom6LjCd+sXeOc847rCduwp9bi6euo+zsLWh+Zm3MPN0cfNhuxC4MTJzMnaiu47jvAz2cvZku9H0c3f1M3ZkPM2mOxm5svPl+9Zl+1voO9bnu9imfRDm/U65NDSnvYwn+94ofRE5NLape6A6tHc9NDXpPdIp/hAqPlB89TT49jf2tvlrvZjs/N+39vt3N3n6t3d9trfu/WIv/pQufxQt/xY7N/fv/ta5eLm7uHiyfKxyvOz9uHkxvWs5ebwyvan6ebr9+Pl5ufx7+Xry/eozPip6Onz6+ntz/i37Oru7evv1Pi+7+zx+Ovs8O3y2fnH8e7z4fbT3vjO8u/04vfV7PH09e/u4/jW8/H14fnd5frY9fP3+PPx5/rm9vT4+fTy+vXz8vf56fzo+fb77/vo/Pb17fzv+vf88Pzp/vj3//r5+vz59P759/7z9/3/+/36//z6/vz///37//3/+f///P/7/v/8gQP1WQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAALFAAACxQGJ1n/vAAAAB3RJTUUH2QwbBwwhXp6TDwAAARBJREFUGNNjYAAB55k3b9y/e/POTFsGhoM7duy4+AQG7pxk2LV12cknT47v3QkEey89OcfQOuPMkydrZy1dtHDhosWbn1xlyCk69WRb17SpU4Cgf9OT8wyh9TfvzO7tXnDgBBA8eTKXoWLCk9sddXUrrwHBkydHqhnMI59cqqpt6Ghra+tc/WS+FYOi3ZNLhXnFBSDQfne9NoOCE1AgOamlr69v4oonk1UZQsqeXMpKSjl6HwieXN4YzaCV/uRSalj80SfXt1w9lainzrBh+pMLCQERh+5N0tAP3ueqxOBi/+RWuW/G6ev5YmyclmtKGGQMjj25sv/0k1VuwiwszFLeDCKM7kDPPLnsZ8bLBASsANqgk+TXED6dAAAAAElFTkSuQmCC";
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