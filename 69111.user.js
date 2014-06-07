// ==UserScript==
// @name          Funny Kids smilies for Orkut by Rajeev Raj.D
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Rajeev Raj.D
// @description   Funny Kids smilies for Orkut. Just Made for Fun.
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
// All credits to Original script writer. I hope u all enjoy the script! ;)
*********************************************************/

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

	smileyarr["Rajeev_Happy"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p7-cQF04I/AAAAAAAAAiY/VJElUj7UpgI/s400/addemoticons1.png";
	smileyarr["Rajeev_love"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p8Aoj08PI/AAAAAAAAAig/ZAdkc191IKY/s400/addemoticons2.png";
	smileyarr["Rajeev_shy"]="http://lh4.ggpht.com/_aIjttSYzWys/S3p8F0FqunI/AAAAAAAAAio/IjPshCfnLAQ/s400/addemoticons3.png";
	smileyarr["Rajeev_ice_cream"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qFjsm0IiI/AAAAAAAAAsA/ATfttb_6HkY/s400/addemoticons1388.png";
	smileyarr["Rajeev_fabulous"]="http://lh6.ggpht.com/_aIjttSYzWys/S3p8MSnGhCI/AAAAAAAAAi4/DO5D1qOll3k/s400/addemoticons6.png";
	smileyarr["Rajeev_heavenlove"]="http://lh4.ggpht.com/_aIjttSYzWys/S3p8Pog_CwI/AAAAAAAAAjA/_1BiAqbQKFg/s400/addemoticons7.png";
	smileyarr["Rajeev_princess:"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p8SEkinEI/AAAAAAAAAjI/OML3IH5G2jo/s400/addemoticons8.png";
	smileyarr["Rajeev_prine"]="http://lh3.ggpht.com/_aIjttSYzWys/S3p8UlLaRAI/AAAAAAAAAjQ/v7is3xrYCfA/s400/addemoticons9.png";
	smileyarr["Rajeev_boy"]="http://lh4.ggpht.com/_aIjttSYzWys/S3p8XPkh27I/AAAAAAAAAjY/DTn79HNyEsc/s400/addemoticons11.png";
	smileyarr["Rajeev_girl"]="http://lh6.ggpht.com/_aIjttSYzWys/S3p8ZeMCSII/AAAAAAAAAjg/_uZt3ewoKCk/s400/addemoticons12.png";
	smileyarr["Rajeev_drinkleft"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p8cLIq-mI/AAAAAAAAAjo/wIcvbTZ1Y-A/s400/addemoticons13.png";
	smileyarr["Rajeev_drinkright"]="http://lh3.ggpht.com/_aIjttSYzWys/S3p9WyOBFsI/AAAAAAAAAjw/T-OIyiPGIgE/s400/addemoticons14.png";
	smileyarr["Rajeev_bajukorea"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p9aE2aryI/AAAAAAAAAj4/lRcZKI4xBvs/s400/addemoticons15.png";
	smileyarr["Rajeev_banyakduit"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p9cv0kbyI/AAAAAAAAAkA/fraizxW587U/s400/addemoticons23.png";
	smileyarr["Rajeev_orangsalji"]="http://lh3.ggpht.com/_aIjttSYzWys/S3p9lvQe4sI/AAAAAAAAAkQ/j8z8umDihGs/s400/addemoticons29.png";
	smileyarr["Rajeev_queen"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p9nnhQyII/AAAAAAAAAkY/G0PB3EvUoMc/s400/addemoticons30.png";
	smileyarr["Rajeev_boyu"]="http://lh4.ggpht.com/_aIjttSYzWys/S3p9rnnzJUI/AAAAAAAAAkg/4LO7jaVhVZU/s400/addemoticons41.png";
	smileyarr["Rajeev_beoul"]="http://lh3.ggpht.com/_aIjttSYzWys/S3p9vNPkyMI/AAAAAAAAAko/wAziAePTEy8/s400/addemoticons44.png";
	smileyarr["Rajeev_banyakhadiah"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p91HE2flI/AAAAAAAAAkw/g1QuGzPEwJQ/s400/addemoticons48.png";
	smileyarr["Rajeev_boyskater"]="http://lh4.ggpht.com/_aIjttSYzWys/S3p924a2ojI/AAAAAAAAAk4/pdXg0nknYnI/s400/addemoticons51.png";
	smileyarr["Rajeev_girlskater"]="http://lh3.ggpht.com/_aIjttSYzWys/S3p-qtMaleI/AAAAAAAAAlA/88ZLBCTI5GM/s400/addemoticons52.png";
	smileyarr["Rajeev_sejuk"]="http://lh4.ggpht.com/_aIjttSYzWys/S3p-tK3xx-I/AAAAAAAAAlI/i5SC_NfI8-U/s400/addemoticons57.png";
	smileyarr["Rajeev_romantic1"]="http://lh3.ggpht.com/_aIjttSYzWys/S3p-yp4iO2I/AAAAAAAAAlY/uPl9lwZ8f-w/s400/addemoticons71.png";
	smileyarr["Rajeev_romantic2"]="http://lh4.ggpht.com/_aIjttSYzWys/S3p-2Za0btI/AAAAAAAAAlg/saFXm34EW8E/s400/addemoticons72.png";
	smileyarr["Rajeev_lovebear"]="http://lh3.ggpht.com/_aIjttSYzWys/S3p-4sm-4MI/AAAAAAAAAlo/MdnWGIKOBjI/s400/addemoticons73.png";
	smileyarr["Rajeev_makelaugh"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p-60RvpBI/AAAAAAAAAlw/dYgQVOwFlEI/s400/addemoticons75.png";
	smileyarr["Rajeev_sanagatsejuk"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p_Ar3gPrI/AAAAAAAAAl4/KoYaPSv2r3o/s400/addemoticons91.png";
	smileyarr["Rajeev_meet"]="http://lh5.ggpht.com/_aIjttSYzWys/S3p_DkWYrYI/AAAAAAAAAmA/04haXyFy7E8/s400/addemoticons96.png";
	smileyarr["Rajeev_tv and books"]="http://lh3.ggpht.com/_aIjttSYzWys/S3p_I8vReCI/AAAAAAAAAmI/ZGNxcTQC7zc/s400/addemoticons100.png";
	smileyarr["Rajeev_sejukk"]="http://lh4.ggpht.com/_aIjttSYzWys/S3p_LmrvuoI/AAAAAAAAAmQ/hJV__J_5Jgk/s400/addemoticons102.png";    
	smileyarr["Rajeev_mandi"]="http://lh3.ggpht.com/_aIjttSYzWys/S3p_9ZFnm9I/AAAAAAAAAmY/-PzDaxP30hI/s400/addemoticons103.png";
	smileyarr["Rajeev_w-inds"]="http://lh4.ggpht.com/_aIjttSYzWys/S3qAKLjJ2OI/AAAAAAAAAmo/0k39ZZ_95wk/s400/addemoticons115.png";
	smileyarr["Rajeev_readbook"]="http://lh3.ggpht.com/_aIjttSYzWys/S3qBABZ4mdI/AAAAAAAAAnA/TumIc6iM15s/s400/addemoticons116.png";
	smileyarr["Rajeev_sleepy"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qBDCer5CI/AAAAAAAAAnI/j_hPvwJLbPk/s400/addemoticons119.png";
	smileyarr["Rajeev_wave"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qBIXPxevI/AAAAAAAAAnQ/kzPOxQNS35U/s400/addemoticons120.png"; 
	smileyarr["Rajeev_sediamakanan"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qBLweXesI/AAAAAAAAAnY/jd-F6x732yY/s400/addemoticons127.png";
	smileyarr["Rajeev_perutbucik"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qBOW9-OdI/AAAAAAAAAng/Bpby2wIEeHE/s400/addemoticons152.png";
	smileyarr["Rajeev_aigoo"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qBQ_WDb6I/AAAAAAAAAno/-mTpdPROzsE/s400/addemoticons154.png";
	smileyarr["Rajeev_read"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qBTILL5DI/AAAAAAAAAnw/zGD7EDvmDFI/s400/addemoticons162.png";
	smileyarr["Rajeev_coolboys"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qBVxsndNI/AAAAAAAAAn4/3TV3rFe41OA/s400/addemoticons166.png";
	smileyarr["Rajeev_biscut"]="http://lh4.ggpht.com/_aIjttSYzWys/S3qBYZv0xhI/AAAAAAAAAoA/5xQFmP9ToKo/s400/addemoticons169.png";
	smileyarr["Rajeev_song"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qBcJYTAaI/AAAAAAAAAoI/fFogRSkkfYg/s400/addemoticons183.png";
	smileyarr["Rajeev_camera"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qBj3vzQfI/AAAAAAAAAoQ/GDlKsgB_vvg/s400/addemoticons184.png";
	smileyarr["Rajeev_syecomel:"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qBmCGu3UI/AAAAAAAAAoY/XXhEYqijuPc/s400/addemoticons189.png";
	smileyarr["Rajeev_latihan"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qCXdSW7tI/AAAAAAAAAog/e1fzjsZBqhs/s400/addemoticons190.png";
	smileyarr["Rajeev_makan ais-krim"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qCazTQS2I/AAAAAAAAAoo/4zpnbxQy9cQ/s400/addemoticons222.png";
	smileyarr["Rajeev_wow"]="http://lh4.ggpht.com/_aIjttSYzWys/S3qCdRNc59I/AAAAAAAAAow/i9YU-uC5OAc/s400/addemoticons257.png";
	smileyarr["Rajeev_talk"]="http://lh3.ggpht.com/_aIjttSYzWys/S3qCkYx7Z0I/AAAAAAAAApA/G2aoHWQHF7k/s400/addemoticons265.png";
	smileyarr["Rajeev_best"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qCza8GFNI/AAAAAAAAApI/obAHxFsrHBc/s400/addemoticons271.png";
	smileyarr["Rajeev_selam"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qCg17_BjI/AAAAAAAAAo4/yn0IHTQYvd8/s400/addemoticons260.png";
	smileyarr["Rajeev_sad"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qC1gSADeI/AAAAAAAAApQ/nwZJt5bbnkA/s400/addemoticons300.png";
	smileyarr["Rajeev_dance"]="http://lh3.ggpht.com/_aIjttSYzWys/S3qC45bBXHI/AAAAAAAAApY/Weyvx6gXbK8/s400/addemoticons324.png";
	smileyarr["Rajeev_studyhard"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qC8BNzspI/AAAAAAAAApg/RLcddVQGYOo/s400/addemoticons404.png";
	smileyarr["Rajeev_dance2"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qC_ne0pvI/AAAAAAAAApo/ENhWTeQoahM/s400/addemoticons440.png";
	smileyarr["Rajeev_iuji"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qDOxiv-tI/AAAAAAAAAp4/-Mbnp0kAHKE/s400/addemoticons444.png";
	smileyarr["Rajeev_jahit"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qDCt_gwCI/AAAAAAAAApw/r1c7pWmGc0Q/s400/addemoticons482.png";
	smileyarr["Rajeev_sing"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qDXmplXII/AAAAAAAAAqA/X91t6ntO7Fk/s400/addemoticons522.png";
	smileyarr["Rajeev_hotdrink"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qDbMkHgcI/AAAAAAAAAqI/G3ZdbO_WQQc/s400/addemoticons569.png";
	smileyarr["Rajeev_getballon"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qDdi_sYUI/AAAAAAAAAqQ/LS7SNtpZe4I/s400/addemoticons578.png";
	smileyarr["Rajeev_bye"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qDgYZxtXI/AAAAAAAAAqY/KBTsQCykG0A/s400/addemoticons596.png";
	smileyarr["Rajeev_cuteye"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qDnc8Gp3I/AAAAAAAAAqg/me9cD5aAFeE/s400/addemoticons601.png";
	smileyarr["Rajeev_learn2"]="http://lh4.ggpht.com/_aIjttSYzWys/S3qEsm1f8XI/AAAAAAAAAqo/ayefeEOcnbU/s400/addemoticons630.png";
	smileyarr["Rajeev_cry"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qEwgONYMI/AAAAAAAAAqw/0qpLsVhjeoY/s400/addemoticons646.png";
	smileyarr["Rajeev_costom"]="http://lh3.ggpht.com/_aIjttSYzWys/S3qE00iFU2I/AAAAAAAAAq4/cM77CM-zQgU/s400/addemoticons724.png";
	smileyarr["Rajeev_skating"]="http://lh3.ggpht.com/_aIjttSYzWys/S3qE4fKzIeI/AAAAAAAAArA/FIX7h4W0lEc/s400/addemoticons849.png";
	smileyarr["Rajeev_violin"]="http://lh3.ggpht.com/_aIjttSYzWys/S3qFBvS2SdI/AAAAAAAAArQ/MqqwA9r8iRc/s400/addemoticons943.png";
	smileyarr["Rajeev_saranghae"]="http://lh3.ggpht.com/_aIjttSYzWys/S3qFD5FllWI/AAAAAAAAArY/HPzzHfE11D4/s400/addemoticons953.png";
	smileyarr["Rajeev_makan:"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qFUHzWpxI/AAAAAAAAAro/k6p_OmqRvnQ/s400/addemoticons992.png";
	smileyarr["Rajeev_sibuk"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qFQzJ0Z-I/AAAAAAAAArg/DYau6wYN9jA/s400/addemoticons979.png";
	smileyarr["Rajeev_hujan"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qFYZPKQvI/AAAAAAAAArw/0gwuXohcQQk/s400/addemoticons1076.png";
	smileyarr["Rajeev_surf"]="http://lh4.ggpht.com/_aIjttSYzWys/S3qFb2mudoI/AAAAAAAAAr4/7996uxz7B8A/s400/addemoticons1371.png";
	smileyarr["Rajeev_sleepy2"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qFll3lEHI/AAAAAAAAAsI/2MfOT9TssQQ/s400/addemoticons1536.png";
	smileyarr["Rajeev_window"]="http://lh4.ggpht.com/_aIjttSYzWys/S3p-vYsUAiI/AAAAAAAAAlQ/HYH_0hsb0U8/s400/addemoticons62.png";
	smileyarr["Rajeev_keretamewah"]="http://lh6.ggpht.com/_aIjttSYzWys/S3p9gsaNMcI/AAAAAAAAAkI/nYBwGvim6Yg/s400/addemoticons25.png";
	smileyarr["Rajeev_speed"]="http://lh4.ggpht.com/_aIjttSYzWys/S3p8I2-uKGI/AAAAAAAAAiw/w2XaziPue8o/s400/addemoticons4.png";
	smileyarr["Rajeev_juru"]="http://lh6.ggpht.com/_aIjttSYzWys/S3qAG61UqQI/AAAAAAAAAmg/kcn9kwgl-GY/s400/addemoticons107.png";
	smileyarr["Rajeev_jual_icecream:"]="http://lh5.ggpht.com/_aIjttSYzWys/S3qE-tks7WI/AAAAAAAAArI/_DH8_7dufUg/s400/addemoticons941.png";

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

// Rajeev's script