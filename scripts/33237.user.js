// ==UserScript==
// @name New Images behalf on Independence day edited. 
// @author yet  this time *azmi*....its edited
// @description i'll sugest u to use it on these dayz!
// @include http://www.orkut.*/CommMsgPost.aspx*
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



		smileyarr["takring"]="http://lh6.ggpht.com/ahpkings/SKAnrGDlfRI/AAAAAAAAAQs/4CoIIPXLhe4/s144/16.png";
	smileyarr["using Net"]="http://lh5.ggpht.com/ahpkings/SKAn0WDTH2I/AAAAAAAAARU/RWN3_gHcOfA/s144/22.png";
	smileyarr["bOxing"]="http://lh6.ggpht.com/ahpkings/SKAn0Q_YmxI/AAAAAAAAARc/t_i4ABzdz6k/s144/23.png";
	smileyarr["Fir1"]="http://lh5.ggpht.com/ahpkings/SKAoAycZoaI/AAAAAAAAASk/ZDJKJzdqCRI/s144/fighting.png";
	smileyarr["Fir2"]="http://lh4.ggpht.com/ahpkings/SKAoA5ysgOI/AAAAAAAAASs/YCL86pvrrJA/s144/fighting..png";
	smileyarr["talking"]="http://lh3.ggpht.com/ahpkings/SKAoAyGHMhI/AAAAAAAAAS0/xZTG2fih_5c/s144/gathering.png";
	smileyarr["sleeping"]="http://lh4.ggpht.com/ahpkings/SKAoi_tsXdI/AAAAAAAAAVE/8OP2Gi-w5xI/s144/sleep1.png";
	smileyarr["smoking"]="http://lh4.ggpht.com/ahpkings/SKAoi2a0Q4I/AAAAAAAAAVU/koO6WUpP9so/s144/smoke.png";
	smileyarr["wow"]="http://lh5.ggpht.com/ahpkings/SKAoqInwn5I/AAAAAAAAAV0/z9Z4pfPm_4o/s144/wow.png";
	smileyarr["looser"]="http://lh3.ggpht.com/ahpkings/SKAoi8CP1CI/AAAAAAAAAVM/1NAMHm9VqKw/s144/smileys_online_now_05.png";
	smileyarr["motor"]="http://lh5.ggpht.com/ahpkings/SKAoZFnY02I/AAAAAAAAAU0/opuP8keD-I4/s144/scooter.png";
	smileyarr["red toung"]="http://lh3.ggpht.com/ahpkings/SKAoqPIytaI/AAAAAAAAAWE/t7YE76CTtMU/s144/tongue.png";
	smileyarr["hi"]="http://lh5.ggpht.com/ahpkings/SKB4eoOOPFI/AAAAAAAAAaI/BN47wuPYHOM/s144/hi.png";
	smileyarr["Welcome"]="http://lh3.ggpht.com/ahpkings/SKAoqCUK8lI/AAAAAAAAAV8/gMfSiLVTcMU/s144/welcome.png";
	smileyarr["lol"]="http://lh4.ggpht.com/ahpkings/SKAnrIUHLEI/AAAAAAAAAQ0/KeJIhMi4YNU/s144/17.png";
	smileyarr["lol2"]="http://lh6.ggpht.com/ahpkings/SKAnrFx5fqI/AAAAAAAAARE/eE-zZq58Hww/s144/19.png";
              smileyarr["lol3"]="http://lh5.ggpht.com/ahpkings/SKAoOXbjZMI/AAAAAAAAAT0/WjMVSvWsges/s144/lol.png";
		
	smileyarr["good"]="http://lh5.ggpht.com/ahpkings/SKB4ehjaLuI/AAAAAAAAAZ4/3ipvBGnxiSQ/s144/good.png";
	smileyarr["beta"]="http://lh3.ggpht.com/ahpkings/SKAn69bXsyI/AAAAAAAAASU/n3jzTQmUcVI/s144/beta.png";
	smileyarr["pics"]="http://lh4.ggpht.com/ahpkings/SKAoH5EQ3HI/AAAAAAAAATk/Ll6Sl1XudX4/s144/kewlpics.png";	
	smileyarr["newhere"]="http://lh5.ggpht.com/ahpkings/SKAoH_8lX_I/AAAAAAAAATc/EkxS5iaZYhQ/s144/imnew%20here.png";
	smileyarr["muaaaah"]="http://lh3.ggpht.com/ahpkings/SKAoO42Lh2I/AAAAAAAAAUE/FsmmaJGgLRw/s144/muaaaaah.png";
	smileyarr["offtopic"]="http://lh5.ggpht.com/ahpkings/SKAoPKOksHI/AAAAAAAAAUU/gOrLV_6Dvog/s144/offtopic.png";
	smileyarr["nicthread"]="http://lh3.ggpht.com/ahpkings/SKAoPHXqwCI/AAAAAAAAAUM/oEPdwpuBODE/s144/nic%20thread.png";
	smileyarr["owned"]="http://lh3.ggpht.com/ahpkings/SKAoZGFKvTI/AAAAAAAAAUc/QXVTdtZNnv0/s144/owned.png";
	smileyarr["mdpower"]="http://lh3.ggpht.com/ahpkings/SKAoO9BL4OI/AAAAAAAAAT8/l3tJOMKrcgA/s144/MOD%20POWER.png";
	smileyarr["ban"]="http://lh4.ggpht.com/ahpkings/SKAn6gg5mrI/AAAAAAAAAR8/wSlHL_tNRRg/s144/ban.png";
	smileyarr["ban2"]="http://lh6.ggpht.com/ahpkings/SKAn6v2jp-I/AAAAAAAAASE/rwDa9jOd6Ng/s144/bann.png";
	smileyarr["loacked"]="http://lh3.ggpht.com/ahpkings/SKAoIDGi0JI/AAAAAAAAATs/xvkrqwjliMo/s144/LOCKED.png";
	smileyarr["closed"]="http://lh3.ggpht.com/ahpkings/SKB4eS-lt5I/AAAAAAAAAZo/E6YwERLmd08/s144/closed.png";
	smileyarr["spam"]="http://lh5.ggpht.com/ahpkings/SKAoiwyVtgI/AAAAAAAAAVc/uFnuce2YQe8/s144/spam.png";
	smileyarr["Rule"]="http://lh4.ggpht.com/ahpkings/SKAoZLyfrBI/AAAAAAAAAUs/tiI0RcQ6reM/s144/rule.png";
	smileyarr["rule2"]="http://lh6.ggpht.com/ahpkings/SKAn0ZIoOpI/AAAAAAAAARk/a1Hpr6BurLU/s144/25.png";
	smileyarr["getout"]="http://lh5.ggpht.com/ahpkings/SKAoA0OtR4I/AAAAAAAAAS8/0J3S6e2LzLo/s144/Get%20Out.png";
	smileyarr["yahright"]="http://lh6.ggpht.com/ahpkings/SKAoqL6BJ9I/AAAAAAAAAVs/cIwvNi0c054/s144/yahright.png";
	smileyarr["cyah"]="http://lh3.ggpht.com/ahpkings/SKAojHaqEgI/AAAAAAAAAVk/G6iiTdMdluc/s144/sya.png";
	smileyarr["goodnews"]="http://lh5.ggpht.com/ahpkings/SKB4ehw2JLI/AAAAAAAAAaA/GY_FxxPRaZo/s144/good%20news.png";
	smileyarr["thanks"]="http://lh4.ggpht.com/ahpkings/SKB4owmMApI/AAAAAAAAAaQ/ADo-XDND4WM/s144/thanx.png";
	smileyarr["starts"]="http://lh6.ggpht.com/ahpkings/SJSyLU7QHWI/AAAAAAAAALA/E4r59X7WGf8/714992j6v84lbn4k.gif";
	

	
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
