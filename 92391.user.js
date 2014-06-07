// ==UserScript==
// @name          Orkut 3D Smileys
// @namespace     http://orkut-smileys.blogspot.com/
// @author	  Usman Chaudhry
// @description   3d Smileys for Orkut scraps and community's posts.
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
	smileyarr["001-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6q1Na5yI/AAAAAAAAAyo/heTD1U1mKS8/001.png";
	smileyarr["002-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6rNgTrgI/AAAAAAAAAyw/zceSl-jgSMc/002.png";
	smileyarr["003-icon"]="https://lh3.googleusercontent.com/_Suf3v25XBZ8/TcD6rNOOYjI/AAAAAAAAAys/zQlUwTgmPMA/003.gif";
	smileyarr["004-icon"]="https://lh5.googleusercontent.com/_Suf3v25XBZ8/TcD6rVyrY0I/AAAAAAAAAy0/d-E9Qng8Qlw/004.png";
	smileyarr["005-icon"]="https://lh5.googleusercontent.com/_Suf3v25XBZ8/TcD6rvhm-CI/AAAAAAAAAy4/j8uEmroIyGM/005.png";
	smileyarr["006-icon"]="https://lh5.googleusercontent.com/_Suf3v25XBZ8/TcD6rxTJF2I/AAAAAAAAAy8/nCdeAn_Z5pg/006.png";
	smileyarr["007-icon"]="https://lh3.googleusercontent.com/_Suf3v25XBZ8/TcD6r6E34BI/AAAAAAAAAzA/rNAREMtOzhA/s19/007.png";
	smileyarr["008-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6sBFbT0I/AAAAAAAAAzE/DHJp1irHwaw/008.png";
	smileyarr["009-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6saA6FxI/AAAAAAAAAzI/eAV3Iq_nBiY/009.png";
	smileyarr["010-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6soHJTLI/AAAAAAAAAzM/cZJY4iBcK-4/010.png";
	smileyarr["011-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6szFqstI/AAAAAAAAAzQ/bnADzp9H8gE/011.gif";
	smileyarr["012-icon"]="https://lh5.googleusercontent.com/_Suf3v25XBZ8/TcD6tO0waYI/AAAAAAAAAzY/qEg3X50F8Qs/012.png";
	smileyarr["013-icon"]="https://lh3.googleusercontent.com/_Suf3v25XBZ8/TcD6tJy6XaI/AAAAAAAAAzU/JDE3a7vxsSk/013.png";
	smileyarr["014-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6tXv8VQI/AAAAAAAAAzc/Pi3JrRuBmgE/014.png";
	smileyarr["015-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6tqs_6WI/AAAAAAAAAzg/-3IXyFH4NK8/015.png";
	smileyarr["016-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6tmhTReI/AAAAAAAAAzk/6pMIvNf3DBE/016.png";
	smileyarr["017-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6t6A64rI/AAAAAAAAAzo/YpobcOElVMw/017.png";
	smileyarr["018-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6uHVbbZI/AAAAAAAAAzw/ymh4-HI7GlY/018.png";
	smileyarr["019-icon"]="https://lh3.googleusercontent.com/_Suf3v25XBZ8/TcD6uAdiPtI/AAAAAAAAAzs/RpDx3MpuYkE/019.png";
	smileyarr["020-icon"]="https://lh5.googleusercontent.com/_Suf3v25XBZ8/TcD6uXLbG_I/AAAAAAAAAz0/JdWl2AErDis/020.png";
	smileyarr["021-icon"]="https://lh5.googleusercontent.com/_Suf3v25XBZ8/TcD6u5qR2cI/AAAAAAAAAz4/EKzWU_UVQn0/021.png";
	smileyarr["022-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6uzb6PcI/AAAAAAAAAz8/SPrB7TiZ_8U/022.png";
	smileyarr["023-icon"]="https://lh3.googleusercontent.com/_Suf3v25XBZ8/TcD6vJr6aTI/AAAAAAAAA0A/BbwuQQ1_U0w/023.png";
	smileyarr["024-icon"]="https://lh5.googleusercontent.com/_Suf3v25XBZ8/TcD6vRp7l9I/AAAAAAAAA0E/JIw0Ft84UEM/024.png";
	smileyarr["025-icon"]="https://lh5.googleusercontent.com/_Suf3v25XBZ8/TcD6vj2-tVI/AAAAAAAAA0I/drh3nt0K_uI/025.png";
	smileyarr["026-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6wLV1FVI/AAAAAAAAA0M/Xtn_DCike9s/026.gif";
	smileyarr["027-icon"]="https://lh3.googleusercontent.com/_Suf3v25XBZ8/TcD6wa3pjcI/AAAAAAAAA0U/xCf8Z-N9tKQ/027.gif";
	smileyarr["028-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6wRzUayI/AAAAAAAAA0Q/8_f9nce-IVU/028.png";
	smileyarr["029-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6wdx2wMI/AAAAAAAAA0Y/qZSEaVMbnsw/029.png";
	smileyarr["030-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6w9xET8I/AAAAAAAAA0c/H1M3Eghp6GI/030.gif";
	smileyarr["031-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6xDG7brI/AAAAAAAAA0g/z9zurOVjQ_g/031.png";
	smileyarr["032-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6xZeiBOI/AAAAAAAAA0k/kpy40U9GAaU/032.png";
	smileyarr["033-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6x3DMB6I/AAAAAAAAA0w/8btipyfUYZU/033.png";
	smileyarr["034-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6xrGpvsI/AAAAAAAAA0o/p0gSN4n5yzQ/034.png";
	smileyarr["035-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6x6rGioI/AAAAAAAAA0s/X3GS5hwe3BU/035.png";
	smileyarr["036-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6yPRZRPI/AAAAAAAAA00/ZVxk3XH9cVg/036.png";
	smileyarr["037-icon"]="https://lh3.googleusercontent.com/_Suf3v25XBZ8/TcD6yb2968I/AAAAAAAAA04/KZxDXuOPUhc/037.png";
	smileyarr["038-icon"]="https://lh3.googleusercontent.com/_Suf3v25XBZ8/TcD6ygD88_I/AAAAAAAAA08/b8-XzkKKOdQ/038.png";
	smileyarr["039-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6y0AQJFI/AAAAAAAAA1M/qMNUb2qIAjQ/039.png";
	smileyarr["040-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6y1qi-gI/AAAAAAAAA1A/og06YzkLYKw/040.png";
	smileyarr["041-icon"]="https://lh6.googleusercontent.com/_Suf3v25XBZ8/TcD6zVTkCiI/AAAAAAAAA1E/1CfnMxzBF4c/041.png";
	smileyarr["042-icon"]="https://lh4.googleusercontent.com/_Suf3v25XBZ8/TcD6zTGSvBI/AAAAAAAAA1I/1psArhkOACI/042.png";
	     
        





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