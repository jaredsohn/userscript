// ==UserScript==
// @name          Facebook Smileys For Orkut
// @namespace     http://www.orkut.co.in/Main#Profile?uid=10691217579308342354
// @author	  I-Hacker
// @description   Facebook Smileys For Orkut
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
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
	var smileyarr = new Array();
	smileyarr["Smile"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5qzTfWTnI/AAAAAAAAAMo/t5PbNR3IYXI/s400/smile.png";
        smileyarr["Frown"]="http://lh4.ggpht.com/_0CPPET7JZ5A/Sy5rgyAOeCI/AAAAAAAAAMw/zQtzYOoXNeM/s400/frown.png";
	smileyarr["Gasp"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sy5rm0SNRrI/AAAAAAAAAM4/7uA3ofibnFc/s400/gasp.png";
        smileyarr["Grin"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5rtjL90sI/AAAAAAAAANA/IIeqkUzb0FM/s400/grin.png";
	smileyarr["Tongue"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sy5r336_WPI/AAAAAAAAANI/mbbDvpqvESk/s400/tongue.png";
        smileyarr["Wink"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5r9-F40NI/AAAAAAAAANQ/-ezdq2erpo4/s400/wink.png";
        smileyarr["Curly Lips"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sy5sEjsUn_I/AAAAAAAAANY/9p6Uqoixspw/s400/curlylips.png";
	smileyarr["Kiss"]="http://lh4.ggpht.com/_0CPPET7JZ5A/Sy5sLE-l5iI/AAAAAAAAANg/uCJavgMLs2o/s400/kiss.png";                                      smileyarr["Grumpy"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sy5sR7XZvzI/AAAAAAAAANo/EeMJccvC6eY/s400/grumpy.png";
	smileyarr["Glasses"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sy5sagDyRfI/AAAAAAAAANw/cPYHlhK6bTE/s400/glasses.png";
        smileyarr["Sun Glasses"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5sgmh53OI/AAAAAAAAAN4/FKrVHvGsTq8/s400/sunglasses.png";
	smileyarr["Upset"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5smspVx6I/AAAAAAAAAOA/dDftKKu27BQ/s400/upset.png";
        smileyarr["Confused"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sy5s30GHG-I/AAAAAAAAAOI/1oTv1We9GXU/s400/confused.png";                      smileyarr["Pacman"]="http://lh5.ggpht.com/_0CPPET7JZ5A/Sy5tFpOARnI/AAAAAAAAAOY/_ufq7pX5oPs/s400/pacman.png";
        smileyarr["Squint"]="http://lh4.ggpht.com/_0CPPET7JZ5A/Sy5tLHVpoEI/AAAAAAAAAOg/N9NzpG-ICKU/s400/squint.png";
	smileyarr["Angel"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sy5tRqZqqvI/AAAAAAAAAOo/gOGp9KK5j2E/s400/angel.png";                                    smileyarr["Devil"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5tXT2SmwI/AAAAAAAAAOw/9y2OkLFP7CQ/s400/devil.png";
        smileyarr["Unsure"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5tikFJHAI/AAAAAAAAAO4/sUjY0NG0VRI/s400/unsure.png";
        smileyarr["Kiki"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sy5uC-vFo8I/AAAAAAAAAPg/TPE_UxJySs8/s400/kiki.png";
	smileyarr["Cry"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5tp0TYwgI/AAAAAAAAAPA/cx5hnI3dpHM/s400/cry.png";
        smileyarr["Shark"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5s-j4FV_I/AAAAAAAAAOQ/1vwwkXUT8FU/s400/shark.png";
        smileyarr["Chris Putnam"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5twZI-ZeI/AAAAAAAAAPI/TO7-RxUpHfw/s400/putnam.png";
	smileyarr["Robot"]="http://lh3.ggpht.com/_0CPPET7JZ5A/Sy5t2Cek3VI/AAAAAAAAAPQ/dx9kWwtIsd0/s400/robot.png";
        smileyarr["Heart"]="http://lh4.ggpht.com/_0CPPET7JZ5A/Sy5t9h0TgFI/AAAAAAAAAPY/iYjyxPcWGgA/s400/heart.png";
	smileyarr["Penguin"]="http://lh6.ggpht.com/_0CPPET7JZ5A/Sy5uIgfFBlI/AAAAAAAAAPo/XErsU89jo94/s400/penguin.png";
        
        
        


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
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

//