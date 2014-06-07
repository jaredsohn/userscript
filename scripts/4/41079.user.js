// ==UserScript==
// @name         Yahoo Smilies for Bloggers by Gagan
// @namespace    http://www.blogger.com
// @author	 Kishore
// @Edited By	 Gaganpreet Singh http://84productions.blogspot.com
// @description  Yahoo Smilies for bloggers.
// @include      http://www.blogger.com/post-create.g?blogID=*
// @include	 http://www.blogger.com/post-edit.g?blogID=*
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
	emotion["smile :)"]				="http://lh5.ggpht.com/gagan.exe/SLFfLZammsI/AAAAAAAAAc0/Nk2svBAxF24/s144/1.png";
	emotion["sad :("]				="http://lh6.ggpht.com/gagan.exe/SLFfLfp3bQI/AAAAAAAAAc8/mRwK_BTe1QM/s144/2.png";
	emotion["winking ;)"]			="http://lh5.ggpht.com/gagan.exe/SLFfLthRz5I/AAAAAAAAAdE/EgCJV2y7F18/s144/3.png";
	emotion["big grin :D"]			="http://lh3.ggpht.com/gagan.exe/SLFfLnYTUuI/AAAAAAAAAdM/RYpVkHOjl9c/s144/4.png";
	emotion["batting eyelashes ;;)"]="http://lh6.ggpht.com/gagan.exe/SLLLlErDDfI/AAAAAAAAAf8/NOtERQSbYRg/s144/5.png";
	emotion["big hug >:D<"]			="http://lh4.ggpht.com/gagan.exe/SLLLlJAlRzI/AAAAAAAAAgE/jIrgqUQeXvU/s144/6.png";
	emotion["confused :-/"]			="http://lh6.ggpht.com/gagan.exe/SLLLlHLvVuI/AAAAAAAAAgM/YYq96m8C5Bo/s144/7.png";
	emotion["love struck :x"]		="http://lh6.ggpht.com/gagan.exe/SLLLlKXT4JI/AAAAAAAAAgU/eK1DvSmsM3E/s144/8.png";
	emotion["blushing"]				="http://lh6.ggpht.com/gagan.exe/SLLLlchujNI/AAAAAAAAAgc/bf0mgpP0NBY/s144/9.png";
	emotion["tongue :p"]			="http://lh4.ggpht.com/gagan.exe/SLLLn-LSbZI/AAAAAAAAAgk/7MKTZj3HHyw/10.gif";
	emotion["kiss :-*"]				="http://lh6.ggpht.com/gagan.exe/SLLLnyIkT-I/AAAAAAAAAgs/vsN6MgExC_c/11.gif";
	emotion["broken heart =(("]		="http://lh4.ggpht.com/gagan.exe/SLLLoMB5R3I/AAAAAAAAAg0/lYnv_C7sp_8/12.gif";
	emotion["surprise :-o"]			="http://lh3.ggpht.com/gagan.exe/SLLLoL9AW9I/AAAAAAAAAg8/YBqglmuooos/13.gif";
	emotion["angry x-("]			="http://lh6.ggpht.com/gagan.exe/SLLLoUAysrI/AAAAAAAAAhE/2J02KfZ0zXE/14.gif";
	emotion["smug :>"]				="http://lh3.ggpht.com/gagan.exe/SLLLsural2I/AAAAAAAAAhM/rFWvea-85zg/15.gif";
	emotion["cool B-)"]				="http://lh5.ggpht.com/gagan.exe/SLLLslxQl8I/AAAAAAAAAhU/uPHaSIsK0-U/16.gif";
	emotion["worried :-S"]			="http://lh5.ggpht.com/gagan.exe/SLLLsru8F2I/AAAAAAAAAhc/ZykLx0hS-1w/17.gif";
	emotion["whew #:-S"]			="http://lh3.ggpht.com/gagan.exe/SLLLsuZKVkI/AAAAAAAAAhk/YGKnp4OIkSU/18.gif";
	emotion["crying :(("]			="http://lh6.ggpht.com/gagan.exe/SLLLvvohJ0I/AAAAAAAAAh0/3QdetrbA8_Y/20.gif";
	emotion["laughing :))"]			="http://lh3.ggpht.com/gagan.exe/SLLLvtV2CEI/AAAAAAAAAh8/SS3wwlRdrZs/21.gif";
	emotion["straight face :|"]		="http://lh4.ggpht.com/gagan.exe/SLLLvswz4PI/AAAAAAAAAiE/j9bSghDCnmc/22.gif";
	emotion["raised eyebrow /:)"]	="http://lh4.ggpht.com/gagan.exe/SLLLvukHOaI/AAAAAAAAAiM/nIqzvbxKT4U/23.gif";
	emotion["rolling on floor =))"]	="http://lh3.ggpht.com/gagan.exe/SLLLvieywhI/AAAAAAAAAiU/jB6F8pc15gM/24.gif";
	emotion["angel O:-)"]			="http://lh6.ggpht.com/gagan.exe/SLLLyZLi0qI/AAAAAAAAAic/VTA5YH0cFW8/25.gif";
	emotion["nerd :-B"]				="http://lh5.ggpht.com/gagan.exe/SLLLyTpNcxI/AAAAAAAAAik/50pT2xiu5-g/26.gif";
	emotion["talk to the hand =;"]	="http://lh4.ggpht.com/gagan.exe/SLLLyoPzUcI/AAAAAAAAAis/bwTjhH9D7Hw/27.gif";	
	emotion["sleepy I-)"]			="http://lh6.ggpht.com/gagan.exe/SLLLyrUZXFI/AAAAAAAAAi0/P8qt_2sQXHY/28.gif";
	emotion["loser L-)"]			="http://lh4.ggpht.com/gagan.exe/SLLLyqO3JoI/AAAAAAAAAi8/bvG-wCkeFs0/29.gif";
	emotion["sick :-&"]				="http://lh5.ggpht.com/gagan.exe/SLLL6Wj9r-I/AAAAAAAAAjE/jHoSt_Y2boA/30.gif";
	emotion["dont tell anyone :-$"]	="http://lh5.ggpht.com/gagan.exe/SLLL6S79NpI/AAAAAAAAAjU/sxsp5lRjbhE/32.gif";
	emotion["not talking [-("]		="http://lh4.ggpht.com/gagan.exe/SLLL6TnkG6I/AAAAAAAAAjc/KF4IUKBnAqo/33.gif";
	emotion["clown :O)"]			="http://lh4.ggpht.com/gagan.exe/SLLL6sannfI/AAAAAAAAAjk/1yWt-5GCBXo/34.gif";	
	emotion["silly 8-}"]			="http://lh4.ggpht.com/gagan.exe/SLLL9fl4YhI/AAAAAAAAAjs/PWOlPtWieh0/35.gif";
	emotion["party <:-P"]			="http://lh3.ggpht.com/gagan.exe/SLLL9UQ7eUI/AAAAAAAAAj0/sI9RacedBOs/36.gif";
	emotion["yawn (:|"]				="http://lh5.ggpht.com/gagan.exe/SLLL9XWdTmI/AAAAAAAAAj8/4LuiXXvkCuI/37.gif";
	emotion["drooling =P~"]			="http://lh5.ggpht.com/gagan.exe/SLLL9vfMgiI/AAAAAAAAAkE/31jEGhFlbVY/38.gif";
	emotion["thinking :-?"]			="http://lh3.ggpht.com/gagan.exe/SLLL9q2CBHI/AAAAAAAAAkM/yA63ILiHZ0c/39.gif";
	emotion["dooh #-o"]				="http://lh4.ggpht.com/gagan.exe/SLLMANT184I/AAAAAAAAAkU/DI4e2CvG-Fg/40.gif";
	emotion["applause =D>"]			="http://lh5.ggpht.com/gagan.exe/SLLMAIqaRhI/AAAAAAAAAkc/TSKSJeT8RKU/41.gif";
	emotion["nailbiting :-SS"]		="http://lh4.ggpht.com/gagan.exe/SLLMASY8AnI/AAAAAAAAAkk/nJLc0kuyjbM/42.gif";
	emotion["hypnotized @-)"]		="http://lh3.ggpht.com/gagan.exe/SLLMARPj7iI/AAAAAAAAAks/OMSydAK4pa0/43.gif";
	emotion["liar :^o"]				="http://lh4.ggpht.com/gagan.exe/SLLMAfXYS5I/AAAAAAAAAk0/gtcGenDYPqI/44.gif";
	emotion["waiting :-w"]			="http://lh5.ggpht.com/gagan.exe/SLLMDVrVzqI/AAAAAAAAAk8/_lJnwY-lW3w/45.gif";
	emotion["sigh :-<"]				="http://lh3.ggpht.com/gagan.exe/SLLMDTsborI/AAAAAAAAAlE/4ZyvsaLkURs/46.gif";
	emotion["phbbbbt >:P"]			="http://lh6.ggpht.com/gagan.exe/SLLMDbJu3JI/AAAAAAAAAlM/u3EbDVeELtE/47.gif";
	emotion["dont know "]			="http://lh4.ggpht.com/gagan.exe/SLLMnAdpRZI/AAAAAAAAAqU/3C7Zpa-p0FM/106.gif";
	emotion["not listening"]		="http://lh6.ggpht.com/gagan.exe/SLLMnaZeyFI/AAAAAAAAAqc/jnoE2niYZpY/107.gif";
	emotion["praying [-O<"]			="http://lh3.ggpht.com/gagan.exe/SLLMRdNLMdI/AAAAAAAAAnM/EmRo0Axtf5o/63.gif";
	emotion["money eyes $-)"]		="http://lh5.ggpht.com/gagan.exe/SLLMRXkRTCI/AAAAAAAAAnU/uy3Wb7um_OA/64.gif";
		
	
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