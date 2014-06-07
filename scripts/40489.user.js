// ==UserScript==
// @name           My flirty script
// @namespace      vichi
// @description    my 2nd script :)
// @include        http://*.orkut.*/*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertEmotion(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var emotion = new Array();
	emotion["Beating heart"]			="http://lh3.ggpht.com/_RI-sCRurLNk/SW4whUjXQ3I/AAAAAAAAARs/3I5KEXXypBI/beating%20heart.gif";
	emotion["Big hug"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SW4whZ-0bZI/AAAAAAAAAR0/T16UhSjqTZ4/Big%20hug.gif";
	emotion["Dhak Dhak Dhak"]			="http://lh3.ggpht.com/_RI-sCRurLNk/SW4whlr-krI/AAAAAAAAAR8/eoVrLQC3rR4/DUMP%20BUMP%20BUMP.gif";
	emotion["Flowers"]				="http://lh3.ggpht.com/_RI-sCRurLNk/SW4whg-aIqI/AAAAAAAAASE/KlqJ8Ehfi48/flowers.gif";
	emotion["give heart"]				="http://lh3.ggpht.com/_RI-sCRurLNk/SW4wh-ChmqI/AAAAAAAAASM/eicLbraZKjE/give%20heart.gif";
	emotion["heart2"]				="http://lh5.ggpht.com/_RI-sCRurLNk/SW4w9hL0hzI/AAAAAAAAASU/Zz_s_v67pp4/heart2.gif";
	emotion["heart3"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SW4w9_lWE7I/AAAAAAAAASc/Si7OXDstfkQ/heart3.gif";
	emotion["heartbaloon"]				="http://lh5.ggpht.com/_RI-sCRurLNk/SW4w-NOGeSI/AAAAAAAAASk/ZJVmreYhAdA/heart%20baloon.gif";
	emotion["heart"]				="http://lh6.ggpht.com/_RI-sCRurLNk/SW4w-b4uNbI/AAAAAAAAASs/3JCyRpu7AIo/heart.gif";
	emotion["I love u"]				="http://lh3.ggpht.com/_RI-sCRurLNk/SW4w-ddH58I/AAAAAAAAAS0/ARLdXNQ4vKo/I%20love%20u.gif";
	emotion["in love"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SW4xqJtJrnI/AAAAAAAAAS8/h5g6-08yNDA/In%20love.gif";
	emotion["jaadugar"]				="http://lh5.ggpht.com/_RI-sCRurLNk/SW4xqDtC-5I/AAAAAAAAATE/2-iwbhjr78E/jadoogar.gif";
	emotion["jayantilal patel"]			="http://lh4.ggpht.com/_RI-sCRurLNk/SW4xqQmUlQI/AAAAAAAAATM/zGSscnTlRLQ/jayantilal.gif";
	emotion["rui"]					="http://lh5.ggpht.com/_RI-sCRurLNk/SW4xqW6hkgI/AAAAAAAAATU/y78sOp4jz3k/kiss.gif";
	emotion["kisses"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SW4xqfg8bmI/AAAAAAAAATc/LEOxQNBr8ys/kisses.gif";
	emotion["love setter"]				="http://lh4.ggpht.com/_RI-sCRurLNk/SW4yXkl3_3I/AAAAAAAAATk/RSu5Yip3qbo/love%20setter.gif";
	emotion["loverboy"]				="http://lh5.ggpht.com/_RI-sCRurLNk/SW4yX8lnO7I/AAAAAAAAATs/EPw5URLfuBU/loverboy.gif";
	emotion["melting in love"]			="http://lh3.ggpht.com/_RI-sCRurLNk/SW4yX521uSI/AAAAAAAAAT0/DZIA5DlpGhU/melting%20in%20love.gif";
	emotion["sagar & pallabi"]			="http://lh4.ggpht.com/_RI-sCRurLNk/SW4yYHwF4KI/AAAAAAAAAT8/D4Xymi7xnhk/Sagar%20%26%20pallabi.gif";
	emotion["she loves me she loves me not"]	="http://lh3.ggpht.com/_RI-sCRurLNk/SW4yYLconiI/AAAAAAAAAUE/qiN5ZcVLyuQ/she%20loves%20me.gif";
	emotion["steff and lal"]			="http://lh3.ggpht.com/_RI-sCRurLNk/SW4yvjqqGMI/AAAAAAAAAUM/lobOEYGRqdY/Steffi%20and%20lal.gif";
	emotion["Thinking of u"]			="http://lh5.ggpht.com/_RI-sCRurLNk/SW4yvsCc6fI/AAAAAAAAAUU/nUt7uuwERkc/Thinking%20of%20u.gif";
	emotion["will u marry me"]			="http://lh6.ggpht.com/_RI-sCRurLNk/SW4yvsJtTLI/AAAAAAAAAUc/9XX2wBDVaRo/will%20u%20marry%20me.gif";
	
	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++)
	{
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		for(title in emotion)
		{
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+emotion[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertEmotion, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);