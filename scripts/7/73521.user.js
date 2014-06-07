// ==UserScript==
// @name          Hearts
// @namespace     
// @author	  Amrit
// @description   Dream, Achieve and Win
// @include       htt*://*.orkut.*/*

// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var pic = new Array();

	pic["BigRose"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7nNI2ajt6I/AAAAAAAAAEM/36tgVWpd-GE/s400/bigrose_heart.png";

	pic["Blossoming"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7nNMNJ6l-I/AAAAAAAAAEU/co96ojr9YK0/s400/blossoming_heart.png";

	pic["Birds"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7nNTfY09HI/AAAAAAAAAEc/dBwqzYujyM4/s400/birdsfeather_heart.png";

	pic["Brave"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7nNWDYinzI/AAAAAAAAAEk/i_x0hY0sm9Q/s400/brave_heart.png";
	
	pic["Cookie"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7nNeobHJdI/AAAAAAAAAEs/GFomtlcssj4/s400/cookie_heart.png";
	
	pic["Diamond"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7nN4mhhCVI/AAAAAAAAAFM/ns8VL1thiH8/s400/dheart2.png";

	pic["Dancing"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7nNyIcWASI/AAAAAAAAAE8/PCUnDh5u1c4/s400/dancing_heart.png";

	pic["Devilish"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7nN1vD6_9I/AAAAAAAAAFE/f4d3Qgn82Zk/s400/devilish_heart.png";

	pic["Fairy"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7nOCMA2daI/AAAAAAAAAFU/Lf7kww1ibQE/s400/fairy_heart.png";

	pic["Golden"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7nOFOghzmI/AAAAAAAAAFc/0cJ7IThQUlg/s400/golden_rhapsody_heart.png";

	pic["Healthy"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7nOIWDdOOI/AAAAAAAAAFk/1r-yS3aM0yg/s400/healthy_heart2.png";
	
	pic["Heaven"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7nQFJ9aHfI/AAAAAAAAAFs/-LNlqZS8hn8/s400/heavensent_heart.png";

	pic["Henna"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7nQI7wG3uI/AAAAAAAAAF0/oa2VvjRBYgQ/s400/henna_heart.png";

	pic["Indian"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7nQMw4gs8I/AAAAAAAAAF8/T-FpJwugjE0/s400/indian_heart.png";

	pic["LotsOfLove"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7nQbkLh-lI/AAAAAAAAAGM/AYLiR-FtOj8/s400/lots-of-love_heart.png";

	pic["LovingEcho"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7nQfO-6CBI/AAAAAAAAAGU/UbSGf7QRtXU/s400/loving_echo_heart.png";

	pic["Luck"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7nQhtDNt7I/AAAAAAAAAGc/EgQYfMi8vec/s400/luck_heart.png";

	pic["Mothers"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7nQkyN5v4I/AAAAAAAAAGk/KobsuIPmT9Y/s400/mothers_heart.png";

	pic["Nature"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7nQnUI8EBI/AAAAAAAAAGs/Z1doBvRGhRs/s400/naturebest_heart.png";

	pic["OnlyLove"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7nRTmwbZzI/AAAAAAAAAG0/Emls1dlHxnA/s400/nothingbutlove_heart.png";

	pic["Ocean"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7nRZlyou2I/AAAAAAAAAG8/yCjmoqgbPn4/s400/oceanheart3.png";


	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in pic){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+pic[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);


//Dream, Achieve and Win (Amrit)