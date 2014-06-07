// ==UserScript==
// @name	Funny Animal Avatars for Shohitaa
// @version	1.00
// @author	Swashata
// @namespace	TEAM BLAKUT
// @description	Use Animated smileys in your ScrapBook and HTML community Forums. Just click on a smiley to insert. Enjoy
// @include        http://*.orkut.*/*Scrapbook.aspx*
// @include        http://*.orkut.*/*CommMsgs.aspx*
// @include        http://*.orkut.*/*CommMsgPost.aspx*
// ==/UserScript==

/**********************************************************************************************************************************************************
// Private Script! Install if you have searched for this! I am not going to tell anyone! haha
//Script Template by Swashata [Team Blakut]
//Original Base script by Fenil
***********************************************************************************************************************************************************/

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
smileyarr["1"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sau_lMjk8NI/AAAAAAAABRc/2J9VQqcxJYc/Animal_60.gif";
smileyarr["2"]="http://lh3.ggpht.com/_M0X9MzkzNXE/Sau_mqXF_II/AAAAAAAABRg/SXAqIC8CZKU/Animal_59.gif";
smileyarr["3"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sau_qSb8YII/AAAAAAAABRk/a1GUO5VSsZs/Animal_58.gif";
smileyarr["4"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sau_vCkopKI/AAAAAAAABRo/NULiHKY-jJ0/Animal_57.gif";
smileyarr["5"]="http://lh4.ggpht.com/_M0X9MzkzNXE/Sau_0eWng1I/AAAAAAAABRs/yD6jxpImkS8/Animal_56.gif";
smileyarr["6"]="http://lh6.ggpht.com/_M0X9MzkzNXE/Sau_3K_icbI/AAAAAAAABRw/6-_sug39yVs/Animal_55.gif";
smileyarr["7"]="http://lh6.ggpht.com/_M0X9MzkzNXE/Sau_6QUBHJI/AAAAAAAABR0/bXS5KJ4ACS0/Animal_54.gif";
smileyarr["8"]="http://lh5.ggpht.com/_M0X9MzkzNXE/Sau_9Rt0CNI/AAAAAAAABR4/rpp_TeNR7ac/Animal_53.gif";
smileyarr["9"]="http://lh6.ggpht.com/_M0X9MzkzNXE/Sau__F5ClOI/AAAAAAAABR8/5yHUgts-bec/Animal_52.gif";
smileyarr["10"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavAA1XgjnI/AAAAAAAABSA/SQb1Z-zKoKA/Animal_51.gif";
smileyarr["11"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavADOiXLuI/AAAAAAAABSE/0rZzb5R4bgE/Animal_50.gif";
smileyarr["12"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SavAFYff28I/AAAAAAAABSI/p3tBpbi1x04/Animal_49.gif";
smileyarr["13"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavAIL55WKI/AAAAAAAABSM/bsxVbf4hsqA/Animal_48.gif";
smileyarr["14"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SavAKx4xgFI/AAAAAAAABSQ/B0vk6YXqmg8/Animal_47.gif";
smileyarr["15"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SavANfg3nAI/AAAAAAAABSU/u2oDbxviE9g/Animal_46.gif";
smileyarr["16"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavAO5uzXWI/AAAAAAAABSY/Y909rsHKYUc/Animal_45.gif";
smileyarr["17"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavARWXYwVI/AAAAAAAABSc/eyB5CFRgZBA/Animal_44.gif";
smileyarr["18"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavATDlOdgI/AAAAAAAABSg/sftVfFeP5bI/Animal_43.gif";
smileyarr["19"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavAVNluBMI/AAAAAAAABSk/DtelDyXfxjY/Animal_42.gif";
smileyarr["20"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavAWgD5MFI/AAAAAAAABSo/4gvxHBMwH1Q/Animal_41.gif";
smileyarr["21"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavAYs-4iTI/AAAAAAAABSs/KNhO2rrfxaI/Animal_40.gif";
smileyarr["22"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavAah-fAtI/AAAAAAAABSw/8tYIULlBfEU/Animal_39.gif";
smileyarr["23"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavAdwi4klI/AAAAAAAABS0/qHx20pKeO2E/Animal_38.gif";
smileyarr["24"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavAgCurGQI/AAAAAAAABS4/3wAtehJ7ZAw/Animal_37.gif";
smileyarr["25"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavAjbR0hNI/AAAAAAAABS8/6VNGxIQzlzg/Animal_36.gif";
smileyarr["26"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavAnedqmpI/AAAAAAAABTA/UOAF4KhwIlo/Animal_35.gif";
smileyarr["27"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavAqiMpbCI/AAAAAAAABTE/OOvgZVjf2NU/Animal_34.gif";
smileyarr["28"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavAsl5PH3I/AAAAAAAABTI/qUodoiinAyY/Animal_33.gif";
smileyarr["29"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavA1-xHH3I/AAAAAAAABTM/aIWu6O4ULrk/Animal_32.gif";
smileyarr["30"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavA3w7HVKI/AAAAAAAABTQ/eg3sdOhvFHs/Animal_31.gif";
smileyarr["31"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SavBVwAB79I/AAAAAAAABTU/l1U86wpBAwk/Animal_30.gif";
smileyarr["32"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavBYObPRzI/AAAAAAAABTY/CkQDCaukQqE/Animal_29.gif";
smileyarr["33"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavBb3hI18I/AAAAAAAABTc/A9ugsv0khLE/Animal_28.gif";
smileyarr["34"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavBe_eOxTI/AAAAAAAABTg/7xlYXnYHeL8/Animal_27.gif";
smileyarr["35"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavBgnxV5cI/AAAAAAAABTk/HigimNhg8l4/Animal_26.gif";
smileyarr["36"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavBivjUOoI/AAAAAAAABTo/XiM2r12elfc/Animal_25.gif";
smileyarr["37"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavBkhkYwoI/AAAAAAAABTs/IqWkt4q_qUI/Animal_24.gif";
smileyarr["38"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavBlzOmBKI/AAAAAAAABTw/3DxnAnldh_c/Animal_23.gif";
smileyarr["39"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavBs9m6DBI/AAAAAAAABT0/RcAxrF3VeiA/Animal_22.gif";
smileyarr["40"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavBv10_eWI/AAAAAAAABT4/pcX5J8cwULA/Animal_21.gif";
smileyarr["41"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavBzQuxdfI/AAAAAAAABT8/9y9EiJhtXxA/Animal_20.gif";
smileyarr["42"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavB1ZPo_bI/AAAAAAAABUA/oxAKXv9JW8w/Animal_19.gif";
smileyarr["43"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavB4x7bIsI/AAAAAAAABUE/q__CUWkmbAs/Animal_18.gif";
smileyarr["44"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavB6JL5LYI/AAAAAAAABUI/PAY7Un5wkd8/Animal_17.gif";
smileyarr["45"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavB-Q7MPZI/AAAAAAAABUM/nJL5IHDYkAc/Animal_16.gif";
smileyarr["46"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavCDGfXfeI/AAAAAAAABUQ/97ogznOQux4/Animal_15.gif";
smileyarr["47"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavCRx0caFI/AAAAAAAABUU/oYpLF9w6L7M/Animal_13.gif";
smileyarr["48"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavCTz9rFWI/AAAAAAAABUY/PKOpycDQnDc/Animal_12.gif";
smileyarr["49"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavCWIefbLI/AAAAAAAABUc/nau04nVa7eU/Animal_11.gif";
smileyarr["50"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavCaK_1N0I/AAAAAAAABUg/B5JTvZLvDe0/Animal_10.gif";
smileyarr["51"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SavCcdL3WaI/AAAAAAAABUk/VHimgp95b1A/Animal_09.gif";
smileyarr["52"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SavCe7QV2BI/AAAAAAAABUo/hQn68KqPBBU/Animal_08.gif";
smileyarr["53"]="http://lh5.ggpht.com/_M0X9MzkzNXE/SavCgq4XIgI/AAAAAAAABUs/eIHu13roHag/Animal_07.gif";
smileyarr["54"]="http://lh3.ggpht.com/_M0X9MzkzNXE/SavCioE5n6I/AAAAAAAABUw/DaZc9nuR6Lc/Animal_06.gif";
smileyarr["55"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavClKomkSI/AAAAAAAABU0/qmQUrExY5Zs/Animal_05.gif";
smileyarr["56"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavCnHyOVAI/AAAAAAAABU4/KE-SDmMlU5w/Animal_04.gif";
smileyarr["57"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavCpT0p4hI/AAAAAAAABU8/1p0mVDdNyio/Animal_03.gif";
smileyarr["58"]="http://lh6.ggpht.com/_M0X9MzkzNXE/SavCsTUNaNI/AAAAAAAABVA/kXWC7YtPLnQ/Animal_02.gif";
smileyarr["59"]="http://lh4.ggpht.com/_M0X9MzkzNXE/SavCt-RpnmI/AAAAAAAABVE/aY1wncCUuMY/Animal_01.gif";


	

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

//More Smileys could be found on http://www.blakut.com/2008/12/use-animated-smileys-to-make-orkutting.html
// Visit our official website www.blakut.com for regualr update on smileys and other orkut related stuffs.
//~~Happy Orkutting~~
// Regards--- Swashata