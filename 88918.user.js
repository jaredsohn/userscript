// ==UserScript==
// @name          Shin Chan Smileys by swαтι..
// @namespace     http://www.orkut.co.in/Profile?uid=15147230465059278431
// @author	  swati..
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
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
	smileyarr["angry(gussa aa raha hai)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKOtgiGT-7I/AAAAAAAAAks/ztQNmy_Jp_g/angry%28gussa%20aa%20raha%20hai%29.jpg";
        smileyarr["any help(ji haan sir)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKOtgkX_T5I/AAAAAAAAAkw/UVa5smq_zUA/any%20help%28ji%20haan%20sir%29.gif";
        smileyarr["applause(arre wah)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKOtgllb8_I/AAAAAAAAAk0/bCTPrrVXIMo/applause%28arre%20wah%29.gif";
        smileyarr["bad luck(mere saath hi hamesha..)"]="http://lh6.ggpht.com/_2D983UpPeSc/TKOtgzcDxXI/AAAAAAAAAk4/2cFBeiMezfI/bad%20luck%28mere%20saath%20hi%20hamesha..%29.jpg";
        smileyarr["be careful"]="http://lh4.ggpht.com/_2D983UpPeSc/TKOtg9PtazI/AAAAAAAAAk8/LYL9tiNWTAA/be%20careful.gif";
        smileyarr["blush(o0Oo0oo mujhe sharam aa rahi hai!)"]="http://lh6.ggpht.com/_2D983UpPeSc/TKOx3oaw54I/AAAAAAAAAm4/iFpSicF0Cag/blush%28o0Oo0oo%20mujhe%20sharam%20aa%20rahi%20hai%21%29.gif";
        smileyarr["but why"]="http://lh3.ggpht.com/_2D983UpPeSc/TKOx34VEdLI/AAAAAAAAAm8/HVdVq4J935I/but%20why.png";
        smileyarr["bye"]="http://lh4.ggpht.com/_2D983UpPeSc/TKOx3xENz-I/AAAAAAAAAnA/wvk8xbC7xfk/bye.jpg";
	smileyarr["bye bye"]="http://lh3.ggpht.com/_2D983UpPeSc/TKOx3_y84mI/AAAAAAAAAnE/8XsgRMSC7HY/bye%20bye.gif";
        smileyarr["co0ool"]="http://lh3.ggpht.com/_2D983UpPeSc/TKOx4LWjw-I/AAAAAAAAAnI/GgpyVgLOvuc/co0ool.jpg";
	smileyarr["confuse"]="http://lh6.ggpht.com/_2D983UpPeSc/TKOyKqFgrDI/AAAAAAAAAnM/yhEjdzrkwpI/confuse.jpg";
        smileyarr["cry"]="http://lh6.ggpht.com/_2D983UpPeSc/TKOyK8IX9BI/AAAAAAAAAnQ/tY-BHDM7Igk/cry.gif";
        smileyarr["dancing"]="http://lh5.ggpht.com/_2D983UpPeSc/TKOyLMYN5eI/AAAAAAAAAnU/qxLL5h5fs1c/dancing.gif";
        smileyarr["dere(koi hai!)"]="http://lh3.ggpht.com/_2D983UpPeSc/TKOyLK6749I/AAAAAAAAAnY/U06BAKrJr4w/dere%28koi%20hai%21%29.png";
        smileyarr["dont care(uncle kya kar loge!)"]="http://lh6.ggpht.com/_2D983UpPeSc/TKOyLTONfUI/AAAAAAAAAnc/V5FI5lJXBx8/don%27t%20care%28uncle%20kya%20kar%20loge%21%29.jpg";
        smileyarr["easy(aunty dekhiye belly dance)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKOy7rk7KlI/AAAAAAAAAng/TjoBAyTXsC4/easy%28aunty%20dekhiye%20belly%20dance%29.jpg";
        smileyarr["eat well"]="http://lh4.ggpht.com/_2D983UpPeSc/TKOy8IvYUQI/AAAAAAAAAnk/pFxMSD_nRzs/eat%20well.gif";
        smileyarr["enjoy"]="http://lh6.ggpht.com/_2D983UpPeSc/TKOy8IWmQBI/AAAAAAAAAno/TACZIIwbLic/enjoy.gif";
	smileyarr["enjoyin(maze main)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKOy8Km1_vI/AAAAAAAAAns/x_ktgVoOSyQ/s107/enjoyin%28maze%20main%29.jpg";
        smileyarr["excited"]="http://lh6.ggpht.com/_2D983UpPeSc/TKOy8bSRIAI/AAAAAAAAAnw/jWiD0acD6QU/s124/excited.gif";
	smileyarr["feeling sleepy(kya neend nahi aati)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKOzYC4xcMI/AAAAAAAAAn0/z1mYvXDaQeA/feeling%20sleepy%28kya%20neend%20nahi%20aati%29.gif";
        smileyarr["fit n fine"]="http://lh4.ggpht.com/_2D983UpPeSc/TKOzYUJDqjI/AAAAAAAAAn4/SeSL90rAdIg/fit%20n%20fine.gif";
        smileyarr["funny(kya main aapko pasand hun)"]="http://lh3.ggpht.com/_2D983UpPeSc/TKOzYSJeuxI/AAAAAAAAAn8/3YtqmXfS72Q/funny%28kya%20main%20aapko%20pasand%20hun%29.jpg";
        smileyarr["funny(mom yahan ek sundar ladki aayi hai)"]="http://lh4.ggpht.com/_2D983UpPeSc/TKOzYdi3KcI/AAAAAAAAAoA/N05siHwPSZ8/funny%28mom%20yahan%20ek%20sundar%20ladki%20aayi%20hai%29.jpg";
        smileyarr["funny(nanhin kali nahane chali)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKOzYdBAQSI/AAAAAAAAAoE/hzzmbCTlMwk/s120/funny%28nanhin%20kali%20nahane%20chali%29.gif";
        smileyarr["go ahead(batao na)"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO1gJJKOEI/AAAAAAAAAoI/fwooDuJVUFE/go%20ahead%28batao%20na%29.jpg";
        smileyarr["going for study"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO1gNrShwI/AAAAAAAAAoM/7Tu7jdwZQ2Q/going%20for%20study.jpg";
        smileyarr["grin(mom lipstick yahan hai)"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO1ge8nimI/AAAAAAAAAoQ/thQyCEC3aU4/grin%28mom%20lipstick%20yahan%20hai%29.png";
	smileyarr["gudnt"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO1gQojAcI/AAAAAAAAAoU/sVCAN8Na2v4/gudnt.gif";
        smileyarr["haw..shame on u"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO1gppGb8I/AAAAAAAAAoY/wx5U_CIr-fo/haw..shame%20on%20u.png";
	smileyarr["hellooooo"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO1waantuI/AAAAAAAAAoc/rx8k8knBxZI/hellooooo.gif";
        smileyarr["help"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO1wekn_yI/AAAAAAAAAog/WUbNrE6-cR4/help.gif";
        smileyarr["hmm.. (1)"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO1wYCT_vI/AAAAAAAAAok/3Xdgnz4C1y0/hmm..%20%281%29.jpg";
        smileyarr["hmm.. (2)"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO1wtny7vI/AAAAAAAAAoo/-7h7ImWWDDc/hmm..%20%282%29.jpg";
        smileyarr["hmm.. (3)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO1w_0CU5I/AAAAAAAAAos/-7EFk5VP_nY/hmm..%20%283%29.jpg";
        smileyarr["hmm.. (4)"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO2koiIkLI/AAAAAAAAAow/jcTU6l50xLc/hmm..%20%284%29.jpg";
        smileyarr["hmm.. (5)"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO2kvRGKGI/AAAAAAAAAo0/6dAueK__Jrw/hmm..%20%285%29.jpg";
        smileyarr["hmm.. (6)"]="http://lh3.ggpht.com/_2D983UpPeSc/TKO2kpyNP1I/AAAAAAAAAo4/wyr4d2S-yCE/hmm..%20%286%29.jpg";
	smileyarr["hmm.. (7)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO2krkncwI/AAAAAAAAAo8/d8FgnzOp1es/hmm..%20%287%29.jpg";
        smileyarr["hurry up!"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO2k2J_ESI/AAAAAAAAApA/SjBrxnAmHAc/hurry%20up%21.jpg";
	smileyarr["hypnotise"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO22orcycI/AAAAAAAAApc/unXMcb0VLkk/hypnotise.jpg";
        smileyarr["idea"]="http://lh3.ggpht.com/_2D983UpPeSc/TKO22pm5lKI/AAAAAAAAApg/0ODOWp9nAQA/idea.jpg";
        smileyarr["imp."]="http://lh4.ggpht.com/_2D983UpPeSc/TKO22oyqlTI/AAAAAAAAApk/aJDK6ACcccU/imp.jpg";
        smileyarr["lets go"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO22vOT6PI/AAAAAAAAApo/EKVxTau7KXY/let%27s%20go.jpg";
        smileyarr["liar(tumne mujhse jhoot kaha)"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO226DHzOI/AAAAAAAAAps/Xa9RdjiftIQ/liar%28tumne%20mujhse%20jhoot%20kaha%29.jpg";
        smileyarr["loser(khaoge kya!)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO3H19Cf1I/AAAAAAAAAqA/Kwk9otSmWzQ/loser%28khaoge%20kya%21%29.jpg";
        smileyarr["m also coming"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO3IPvlovI/AAAAAAAAAqE/nqHN2eMbrWw/m%20also%20coming.gif";
        smileyarr["m coming"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO3IL2KgfI/AAAAAAAAAqI/Xo4qC_suw5k/m%20coming.gif";
	smileyarr["miss u"]="http://lh3.ggpht.com/_2D983UpPeSc/TKO3IBZfFnI/AAAAAAAAAqM/B57NYv8sy7A/miss%20u.png";
        smileyarr["missed it"]="http://lh3.ggpht.com/_2D983UpPeSc/TKO3ITESy1I/AAAAAAAAAqQ/-Shpc4BMUlA/missed%20it.gif";
	smileyarr["n den(fiiiirrrrrrrrrr)"]="http://lh3.ggpht.com/_2D983UpPeSc/TKO32V4S1fI/AAAAAAAAAqU/uOADlYikvnU/n%20den%28fiiiirrrrrrrrrr%29.png";
        smileyarr["no dont(arre nahin)"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO32dh3MKI/AAAAAAAAAqY/XNkQQDdyivA/no%20don%27t%28arre%20nahin%29.jpg";
        smileyarr["no mom(crying out loud)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO32YXgW4I/AAAAAAAAAqc/p4EiA5HRAQI/s110/no%20mom%28crying%20out%20loud%29.gif";
        smileyarr["no worries"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO32rV_F4I/AAAAAAAAAqg/3Z_zWIUtRVE/no%20worries.jpg";
        smileyarr["not again(uffo)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO32rivILI/AAAAAAAAAqk/39f0y7sT5BE/not%20again%28uffo%29.jpg";
        smileyarr["not agree(nahiinn naa)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO5Gi5HAtI/AAAAAAAAAqo/mczDHZItN-A/not%20agree%28nahiinn%20naa%29.jpg";
        smileyarr["not talking"]="http://lh3.ggpht.com/_2D983UpPeSc/TKO5G-tscVI/AAAAAAAAAqs/YZD5fgfj2aU/not%20talking.jpg";
        smileyarr["o0o0o nice dp"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO5GzVqlsI/AAAAAAAAAqw/89xgJJXYF3g/o0o0o%20nice%20dp.jpg";
	smileyarr["oh come on"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO5G9nBq5I/AAAAAAAAAq0/ZTQyYeJ9ZPo/oh%20come%20on.jpg";
        smileyarr["oh i c"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO5G96-rPI/AAAAAAAAAq4/uLf_Dim5rZA/oh%20i%20c.gif";
	smileyarr["oh no(gadbad ho gayi)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO5syveTII/AAAAAAAAAq8/ZXxRvyMm5Go/oh%20no%28gadbad%20ho%20gayi%29.png";
        smileyarr["oo0oO0oOooo"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO5tKbR76I/AAAAAAAAArA/oLctH1syDjw/oo0oO0oOooo.gif";
        smileyarr["party"]="http://lh3.ggpht.com/_2D983UpPeSc/TKO5tEin1WI/AAAAAAAAArE/JWPmpTV88gE/party.gif";
        smileyarr["please"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO5tF2-a3I/AAAAAAAAArI/z1brL4MT01Y/please.gif";
        smileyarr["ready!"]="http://lh3.ggpht.com/_2D983UpPeSc/TKO5tVpiF-I/AAAAAAAAArM/v3LPVRKZB4U/ready%21.jpg";
        smileyarr["rock on!"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO58gWoMHI/AAAAAAAAArc/UQZ2snLU9pA/rock%20on%21.gif";
        smileyarr["shocked"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO58ukj8RI/AAAAAAAAAro/b8LwGdqNJs0/shocked.png";
        smileyarr["sick"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO59HP9HDI/AAAAAAAAArs/b4Qil2va40w/s67/sick.gif";
	smileyarr["sigh"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO59Qq7tTI/AAAAAAAAArw/iwQGNhQZtkc/sigh.gif";
        smileyarr["smirked"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO59dvTHwI/AAAAAAAAAr0/5JEurFujI_Q/smirked.gif";
	smileyarr["sorry"]="http://lh4.ggpht.com/_2D983UpPeSc/TKO6RE78zEI/AAAAAAAAAr4/ES5CIOPXpto/s115/sorry.jpg";
        smileyarr["TFS!"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO6RMO5JkI/AAAAAAAAAr8/99DzB5vjb3o/TFS%21.jpg";
        smileyarr["thanku"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO6RfBtn-I/AAAAAAAAAsA/bs8JCDklsno/s50/thanku.gif";
        smileyarr["tired(old headache)"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO6RW411SI/AAAAAAAAAsE/q8QBgX3r2d0/s91/tired%28old%20headache%29.jpg";
        smileyarr["tkcr..gudday!"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO6RZw5xoI/AAAAAAAAAsI/3yAbThyJP3U/tkcr..gudday%21.jpg";
        smileyarr["victory(hamari jeet hui)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO7IS8IrSI/AAAAAAAAAsg/00FFjSHRXxQ/victory%28hamari%20jeet%20hui%29.jpg";
        smileyarr["vrroooomm"]="http://lh6.ggpht.com/_2D983UpPeSc/TKO7If6xJGI/AAAAAAAAAsk/GF1_jgmuWeU/vrroooomm.jpg";
        smileyarr["why!"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO7IfSICiI/AAAAAAAAAso/bVmC3UcPX3o/why%21.jpg";
	smileyarr["wink(simple!)"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO7IjanNAI/AAAAAAAAAss/pjwKzgQSBP4/wink%28simple%21%29.jpg";
        smileyarr["yawn(ab so bhi jao!)"]="http://lh3.ggpht.com/_2D983UpPeSc/TKO7IuzJVaI/AAAAAAAAAsw/d7y4fOCaHFg/yawn%28ab%20so%20bhi%20jao%21%29.jpg";
        smileyarr["yeh ek (secret) hai!"]="http://lh5.ggpht.com/_2D983UpPeSc/TKO7SxYq7vI/AAAAAAAAAs0/-Gd5wJjubAc/yeh%20ek%20%28secret%29%20hai%21.png";
        smileyarr["trying"]="http://lh4.ggpht.com/_2D983UpPeSc/TRcHxXIn0II/AAAAAAAAAuw/m5lE6-myf3Y/trying%21.jpg";
        smileyarr["la la la"]="http://lh5.ggpht.com/_2D983UpPeSc/TRcHxmJnQ8I/AAAAAAAAAu0/lAWzaSFgC8I/la%20la%20la.jpg";
        smileyarr["muuuaahh"]="http://lh5.ggpht.com/_2D983UpPeSc/TRcHxhzj_vI/AAAAAAAAAu4/VPxA5s7LH-k/muuuaahh%21.jpg";
        smileyarr["merry Xmas"]="http://lh4.ggpht.com/_2D983UpPeSc/TRcHxlfGjdI/AAAAAAAAAu8/YL1C4vGOjjs/merry%20Xmas.jpg";
        smileyarr["escape"]="http://lh5.ggpht.com/_2D983UpPeSc/TRcHx8nyM0I/AAAAAAAAAvA/fosDtYId0As/escape.jpg";



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

// swati's script