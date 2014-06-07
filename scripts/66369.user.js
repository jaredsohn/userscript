// ==UserScript==
// @name          Harry Potter Smileys
// @author	  Mallika
// @description   Collection of various Harry Potter smileys
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
smileyarr["Harry"]="http://lh6.ggpht.com/_P74q87RL-jg/S03Kiz3NODI/AAAAAAAAA7g/lOu_ZuGJGko/harrypotter.gif";  
smileyarr["Harry2"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KINtpikI/AAAAAAAAA4E/E57DLwCMu3E/StunnedHarry.gif"; 
smileyarr["HarryBroom"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KUZNSAtI/AAAAAAAAA5g/1OX3_WbucOk/smilie_HarrryPotter2.gif";  
smileyarr["Hermione1"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KidBQWII/AAAAAAAAA7c/B8NB17JvYKQ/hermionegranger.gif";  
smileyarr["Hermionebook"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KT5jqyNI/AAAAAAAAA5Y/K48iDtrZ4Ew/smilie_hermione_granger%20_s.gif";  
smileyarr["HermyLibrary"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KSyfwOUI/AAAAAAAAA5Q/1tW0UGv4qj8/smilie_hermione_library.gif";  
smileyarr["Ronnie"]="http://lh4.ggpht.com/_P74q87RL-jg/S03Kad8ha6I/AAAAAAAAA6Y/5ClBcrbJne8/ronweasley.gif";  
smileyarr["Ron"]="http://lh4.ggpht.com/_P74q87RL-jg/S03KNJXqOvI/AAAAAAAAA4w/Vd2QmVBCHRE/smilie_ron_weasley.gif";  
smileyarr["RonBroom"]="http://lh4.ggpht.com/_P74q87RL-jg/S03KNiYIEWI/AAAAAAAAA40/rkFCYKopzsc/smilie_ron_quidditch.gif"; 
smileyarr["Trio"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KMI4nN_I/AAAAAAAAA4k/fZmR3faURmU/smilie_trio.gif";  
smileyarr["HermioneRon"]="http://lh4.ggpht.com/_P74q87RL-jg/S03KOgUIhJI/AAAAAAAAA44/neWUScOs2iI/smilie_ron_hermine.gif";
smileyarr["HarryGinny"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KUN9AB4I/AAAAAAAAA5c/UkCD04xpWI0/smilie_harry_ginny.gif";  
smileyarr["WonWonLav"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KLBIcR4I/AAAAAAAAA4c/my1o_McW9Yw/smilie_wonwon_lavlav.gif";  
smileyarr["DracoM"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KlGbf8nI/AAAAAAAAA74/tN17UIzYkG0/dracomalfoy.gif";
smileyarr["CrabbenGoyle"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KX34oMTI/AAAAAAAAA6A/dAUu3NmXEmw/smilie_crabbe_goyle.gif";  
smileyarr["Malfoysneer"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KXiebCII/AAAAAAAAA58/jPH8ppcW-gE/smilie_draco_malfoy%20sneer.gif";  
smileyarr["Snape"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KZwt4SgI/AAAAAAAAA6Q/VjOMX6OvuJA/severussnape.gif";
smileyarr["Snape2"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KMQ_6hqI/AAAAAAAAA4o/WqpShY951z4/smilie_SeverusSnape3.gif";  
smileyarr["Dumbledore1"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KkphV5II/AAAAAAAAA70/UsAIX5sCL1Q/dumbledore.gif";
smileyarr["Ddore2"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KnIjphcI/AAAAAAAAA8M/-OxWEHytHxw/albus.gif";
smileyarr["WTwins"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KVVvbZGI/AAAAAAAAA5o/x1U0V3KGxZA/smilie_fred_george_weasley.gif";  
smileyarr["TwinsLmao"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KU1vt4RI/AAAAAAAAA5k/BefNKMy9czI/smilie_fred_george_weasley2.gif";  
smileyarr["GrednForge"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KcgwiaxI/AAAAAAAAA6s/QQ9kMAVMqk8/quidb_fred_george.gif";
smileyarr["Sirius"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KaNyjUvI/AAAAAAAAA6U/KJpO-Xl-kiY/SBFC.gif";
smileyarr["Hagrid"]="http://lh4.ggpht.com/_P74q87RL-jg/S03KjNLGvqI/AAAAAAAAA7k/FJFGCjEnJBE/hagrid.gif";
smileyarr["Luna"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KfUc0pxI/AAAAAAAAA7I/J4wMDjYq49E/luna1.gif";
smileyarr["LupinWrwlf"]="http://lh4.ggpht.com/_P74q87RL-jg/S03KfNMeGEI/AAAAAAAAA7E/fkwIR8FeNDE/lupin.gif";
smileyarr["MadEye"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KenFRb9I/AAAAAAAAA7A/ppRh7Eg1pjw/madeyemoody.gif";
smileyarr["Cho"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KcyRa6HI/AAAAAAAAA6w/Jz_Z6oed2GM/quid_cho_snitch.gif";
smileyarr["Diggory"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KcLNHArI/AAAAAAAAA6o/_7T9858hYFM/QuidCedricSnitch.gif";
smileyarr["Voldysmile"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KLuBf6FI/AAAAAAAAA4g/5B8uek49CYk/smilie_voldemort.gif"; 
smileyarr["Voldydance"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KHlECzGI/AAAAAAAAA4A/ZmUu-KJeEgc/TheVoldie.gif";  
smileyarr["Serpensortia"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KIe88ZXI/AAAAAAAAA4I/6PdCNj_ITaY/Spell_Draco.gif";  
smileyarr["DarkMark"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KV-Q2X7I/AAAAAAAAA5s/RHzvmRUXstk/smilie_dunklesmal2.gif";  
smileyarr["McGcat"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KQOu0eVI/AAAAAAAAA5E/FzBWHl8D27k/smilie_mcgonagall%20cat.gif";  
smileyarr["TrollMcg"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KJtBaOAI/AAAAAAAAA4U/bG5GVP6opZU/smilieTroll.gif";  
smileyarr["OutstandingMcg"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KKOWbk0I/AAAAAAAAA4Y/whnZKzCrjgw/smilieOutstanding.gif";  
smileyarr["Maruaders"]="http://lh4.ggpht.com/_P74q87RL-jg/S03KSWKhOFI/AAAAAAAAA5M/r3Zy8cS5sTc/smilie_marauders.gif";  
smileyarr["Mrsblack"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KPKI8-sI/AAAAAAAAA48/XP2zl3OqENs/smilie_mrs_black_eng.gif";  
smileyarr["MoaningMyrtle"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KeLzgXGI/AAAAAAAAA68/z-xNEzv33FA/MoaningMytleToTheUBend.gif";
smileyarr["MoaningMyrtle2"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KRgnblBI/AAAAAAAAA5I/7z_VA6AEPrM/smilie_maulende_myrte2.gif"; 
smileyarr["Eatslugsl"]="http://lh4.ggpht.com/_P74q87RL-jg/S03Ka2JDdjI/AAAAAAAAA6c/3uA6vD5FSQc/Ron_Slug_Spell.gif";
smileyarr["Galleon"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KkTHARVI/AAAAAAAAA7w/-IRPOA9dO54/galleon.gif";
smileyarr["Sickle"]="http://lh4.ggpht.com/_P74q87RL-jg/S03KYzm3TJI/AAAAAAAAA6I/aXUpOecaOVg/sickle.gif";
smileyarr["Knut"]="http://lh3.ggpht.com/_P74q87RL-jg/S03Kf3MiyKI/AAAAAAAAA7M/7NC-ntb18XQ/knut.gif";
smileyarr["Quill"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KbyH-MYI/AAAAAAAAA6k/rsIpZ9DHsnw/quill.gif";
smileyarr["Bludger"]="http://lh6.ggpht.com/_P74q87RL-jg/S03Km6fpWzI/AAAAAAAAA8I/wLt1agvkrVI/Bludger_Moving.gif";
smileyarr["Dementor"]="http://lh5.ggpht.com/_P74q87RL-jg/S03Klk-RlmI/AAAAAAAAA78/taabFGR2Ygw/DementorMove.gif";
smileyarr["Sortinghat"]="http://lh4.ggpht.com/_P74q87RL-jg/S03KI6QrJFI/AAAAAAAAA4M/D6SuXC2qVTQ/sorting.gif";  
smileyarr["Snitch"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KJWbfWsI/AAAAAAAAA4Q/UczHBrEzfzs/Snitch03.gif";  
smileyarr["Gryffindor"]="http://lh3.ggpht.com/_P74q87RL-jg/S03KjUz46YI/AAAAAAAAA7o/ge87yKmq7to/gryff.gif";
smileyarr["Slytherin"]="http://lh5.ggpht.com/_P74q87RL-jg/S03KYXFqVlI/AAAAAAAAA6E/lFuYVkmfZxI/sly.gif";
smileyarr["Hufflepuff"]="http://lh4.ggpht.com/_P74q87RL-jg/S03KgiX09wI/AAAAAAAAA7U/AKQRYU_y57w/huff.gif";
smileyarr["Ravenclaw"]="http://lh6.ggpht.com/_P74q87RL-jg/S03KmZDXZxI/AAAAAAAAA8E/z2dVWWQYfhk/claw.gif";





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