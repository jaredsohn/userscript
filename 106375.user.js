// ==UserScript==
// @name	smileys12
// @version	1.00
// @author	Devjmi
// @description	Use Animated emoticons(for www.frendz4m.com only) in community Forums. Just click on a smiley to insert. Enjoy
// @include        http://*.frendz4m.*/*reply.php*
// @include        http://*.frendz4m.*/*forum*/*showthreads*
// @include        http://*.frendz4m.*/*forum*/*index2.php*
// @include	   http://*.frendz4m.*/forum/index2.php*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["1"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNatLn1r4I/AAAAAAAAAcs/Bd67Ha8Xp14/emo1.gif";
	smileyarr["2"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVNaUNPSH3I/AAAAAAAAAcA/9AaY9MYSXwI/emo2.gif";
	smileyarr["3"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZ7WWfyWI/AAAAAAAAAbU/AwGrjpRA8Ag/emo3.gif";
	smileyarr["4"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZfo3qrwI/AAAAAAAAAao/Gldlc1ASGSM/emo4.gif";
	smileyarr["5"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZRSWjXAI/AAAAAAAAAaM/jl9W0mpQ8VE/emo5.gif";
	smileyarr["6"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZPED4S-I/AAAAAAAAAaI/Q2OdZ6TUOsw/emo6.gif";
	smileyarr["7"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZNanXo2I/AAAAAAAAAaE/R_MgJiz5aKU/emo7.gif";
	smileyarr["8"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNZLamUowI/AAAAAAAAAaA/9vGS5P1x3VM/emo8.gif";
	smileyarr["9"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNZJb2wGuI/AAAAAAAAAZ8/lXL0tnEKjI0/emo9.gif";
	smileyarr["10"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNaqd7oSPI/AAAAAAAAAco/DwUAHDWqGw4/emo10.gif";
	smileyarr["11"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVNaoY95KuI/AAAAAAAAAck/GwRjipn8hXg/emo11.gif";
	smileyarr["12"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNal04mluI/AAAAAAAAAcg/Dracu7KZi4Y/emo12.gif";
	smileyarr["13"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNajnPuzJI/AAAAAAAAAcc/dHqkJzCj8Y0/emo13.gif";
	smileyarr["14"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNag1HKqZI/AAAAAAAAAcY/Er9ZhHM64RE/emo14.gif";
	smileyarr["15"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVNafP_XqYI/AAAAAAAAAcU/bLTXyD7VcT0/emo15.gif";
	smileyarr["16"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVNadoCJM0I/AAAAAAAAAcQ/ey0LvPzNCIY/emo16.gif";
	smileyarr["17"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVNabgtoMxI/AAAAAAAAAcM/qR1OzTFK0HQ/emo17.gif";
	smileyarr["18"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVNaZMM_MxI/AAAAAAAAAcI/uGDWEXH3Okw/emo18.gif";
	smileyarr["19"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNaXX_wgkI/AAAAAAAAAcE/AalETzNpvnE/emo19.gif";
	smileyarr["20"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNaRk_XcNI/AAAAAAAAAb8/p94CNJipeas/emo20.gif";
	smileyarr["21"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNaNA18OcI/AAAAAAAAAb4/McZkniWzYjI/emo21.gif";
	smileyarr["22"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVNaLpw1HRI/AAAAAAAAAb0/DbGKH62EZPE/emo22.gif";
	smileyarr["23"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVNaJnkNojI/AAAAAAAAAbw/vQ-b-9HMAYU/emo23.gif";
	smileyarr["24"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVNaHk2QjoI/AAAAAAAAAbs/McNJe1wZksw/emo24.gif";
	smileyarr["25"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNaFjrf0II/AAAAAAAAAbo/IcDql1Ors5c/emo25.gif";
	smileyarr["26"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNaDn23gZI/AAAAAAAAAbk/Gtl3A5UlLTs/emo26.gif";
	smileyarr["27"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNaBVErNcI/AAAAAAAAAbg/-oUf_Uv_2qU/emo27.gif";
	smileyarr["28"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNZ_5NyPkI/AAAAAAAAAbc/XrB0mjgtZKc/emo28.gif";
	smileyarr["29"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVNZ8w8DJgI/AAAAAAAAAbY/ivWpzJZNj9Q/emo29.gif";
	smileyarr["30"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZ4hvej6I/AAAAAAAAAbQ/eIXlesVMfM0/emo30.gif";
	smileyarr["31"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZ2_cFsgI/AAAAAAAAAbM/iqh8ncZtyME/emo31.gif";
	smileyarr["32"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVNZ081cLtI/AAAAAAAAAbI/Ib93VRWBMhk/emo32.gif";
	smileyarr["33"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNZyVAsl_I/AAAAAAAAAbE/R4SyVLaI6no/emo33.gif";
	smileyarr["34"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZu8lZawI/AAAAAAAAAbA/MTgcqSBcJII/emo34.gif";
	smileyarr["35"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZs-axl6I/AAAAAAAAAa8/DqrM1LL4dxU/emo35.gif";
	smileyarr["36"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVNZqy4UiLI/AAAAAAAAAa4/LTQd57PwHls/emo36.gif";
	smileyarr["37"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZopeKzbI/AAAAAAAAAa0/ydpYv8RLAyw/emo37.gif";
	smileyarr["38"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVNZkp5Nc5I/AAAAAAAAAaw/CpBIf7PpQx8/emo38.gif";
	smileyarr["39"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNZhTWw5OI/AAAAAAAAAas/kdgesr-JI_0/emo39.gif";
	smileyarr["40"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SVNZcwPEmsI/AAAAAAAAAak/ujJpTuF_IUA/emo40.gif";
	smileyarr["41"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SVNZashrAoI/AAAAAAAAAag/smcSzoAljQI/emo41.gif";
	smileyarr["42"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVNZY3ynWoI/AAAAAAAAAac/46y14a79Dys/emo42.gif";
	smileyarr["43"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZW_0po6I/AAAAAAAAAaY/Raa0GhQvtxY/emo43.gif";
	smileyarr["44"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SVNZVIbS4UI/AAAAAAAAAaU/ER_PkAhl_v4/emo44.gif";
	smileyarr["45"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SVNZTJxoIdI/AAAAAAAAAaQ/PMbdP1wPnc8/emo46.gif";
	



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

