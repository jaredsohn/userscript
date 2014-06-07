// ==UserScript==
// @name          Download Video from Google Video
// @description	  Adds a link to Download a video
// @include       *video.google.com/videoplay*
// ==/UserScript==

(function() {
	function getEl(w){
		return document.getElementById(w);
	}
	if(getEl("playvideoblock")){
		vidbl = getEl("playvideoblock");
		/*fl = vidbl.getElementsByTagName("object")[0].data.toString().split("=")[1].split("&amp")[0];
		fl = unescape(fl);*/
		av = getEl("macdownloadlink").href;
		desc = getEl("durationetc");
		descP = desc.parentNode;
		 
		dv = document.createElement("div");		 
		descP.insertBefore(dv, desc);
		dv.innerHTML = '<style>#download{text-align:left;margin: 0 10px 0 20px;}.downloadImg{border: 0;float:left;}h2.downloadVid{font-size: 22px;display:inline;}</style><div id="download"><img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAK3RFWHRDcmVhdGlvbiBUaW1lAEx1biA2IEZlYiAyMDA2IDEyOjA1OjU1IC0wNzAw9C6vaQAAAAd0SU1FB9YCBhMMH2jFBv4AAAAJcEhZcwAACxEAAAsRAX9kX5EAAAAEZ0FNQQAAsY8L/GEFAAAC7UlEQVR42u2YS0tqURiGj2ZKpHnBCNJMaOhIJypBBQVBQ3+B9R+kaCYqaI20KDCR8y+KKAKjiIjmOssLGYJ2FS/kPm+tMI/p2uts97EzOO/IwXI9+3vf71t7sSUcx/34Dkm/hfpPgm9vbw8PDx8eHv5ou2w2m8lkmJZyX/T6+npzc+NyuUZGRlZXV/P5PMes/f39paWlq6urer1OX9kOBjWZTLrdbqn0zQylUrm+vn5/f88ONhqNMzMz5+fntVqNFUyoKysr4DUtUavVfr+/VCoxgg0Gg1wuX1xcTCQSlLp/A8Nh1NpKJRodHQWbpW4Cxl/Anp2dvbi44AGj1nQ6jVyJw1+l0WjgOW/eTTDR1NTU2dlZR88/wOhe9BG9DeEE1tDrbgNDNpvt4OCgUql0Br+8vMRiMZVKRWejz4PBIIX9FSyTyaanp4+Ojtrq/sz4+fl5c3NTq9XS2cjb6/XCIUYwYVutVvRa1+Z6enra3t42m80SiYTCRp+vra11zLsjmGh8fLxQKHQGQ7AxHA6DTa8bvebxeB4fH9nBUC6X6wpuNBpgo25ez4eGhjY2NorFojjgpufIm7fXxsbGAoFAa6/1Cia9tru7y5s3mbG7uzvRwBBsjEQiJpOJXjdCac63OGAI7bO1taXX6+ls1A3P8aDsYBl9R8S8vLyMqQ2FQgi+2zLkAm8GBwd5x+FTHIPK5XI0Gp2cnKTnjT632+2YchGsbs0bnk9MTNDLoD+ZEDD3frbs7OzodDpWM8UC42yB5z6fTzBbIJgI7zHUDc/prooPJmcq8kav9RVMhF7b29vjPVMp4I85RhHxePz09JR9F1wqcGESFvabmo+QSqUcDgde2sL3Emz15eXlwsKCQqHoNxjXIlxQ5ufnBwYG+gombFyG4Xm/wUTX19e4ngmY1F7B0PHxMU58cXuNCVytVnERdzqdIubNeoBgUk9OTiwWy98A05zEXM3Nzf18F07K3sHDw8PN3xLu/8eXPukX6ObmMpQTuNsAAAAASUVORK5CYII=" class="downloadImg"><h2 class="downloadVid">Download As...</h2><br><big class="sep"><a href="'+av+'">AVI</a> <a href="#" title="not available">FLV</a></big> <small><a href="http://www.microsano.com/proyectos/getvideo/googlevid_en/">help</a></small><br><small><b>Did you find this script useful? <a href="http://www.microsano.com/giveusahand/">Give us a hand!</a></b></small></div>';;
	}	

})();