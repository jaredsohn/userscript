// ==UserScript==
// @name	Smilley BBCode
// @version	1.5
// @maj       Pas de retour au début de la zone de saisie aprés insertion d'un smiley
// @namespace	lkaiman, momo_du_prado, clodette333
// @description	Ajout de smiley sous une zone textarea
// @include        http://*.clodogame.fr*
// @updateURL	https://userscripts.org/scripts/source/76373.meta.js
// @downloadURL	https://userscripts.org/scripts/source/76373.user.js
// ==/UserScript==

addEventListener('load', function(event) {
	function getTextArea(n)
	{
		return document.getElementsByTagName('textarea')[n];
	}

	function insertSmiley()
	{	var scrollTop = getTextArea(this.getAttribute("gult")).scrollTop;
		var scrollLeft = getTextArea(this.getAttribute("gult")).scrollLeft;
	
		var image = this.getElementsByTagName('img')[0].getAttribute("src");
		getTextArea(this.getAttribute("gult")).focus();
		getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
		getTextArea(this.getAttribute("gult")).scrollTop = scrollTop;
		getTextArea(this.getAttribute("gult")).scrollLeft = scrollLeft;
	}

	function dip()
	{
		var smileyarr = new Array();
			// Clodogame
			smileyarr["Colere_001"]="http://static.pennergame.de/img/pv4/dots/0_0.gif";	
			smileyarr["Colere_002"]="http://static.pennergame.de/img/pv4/dots/0_1.gif";	
			smileyarr["Colere_003"]="http://static.pennergame.de/img/pv4/dots/1_1.gif";	
			smileyarr["Colere_004"]="http://static.pennergame.de/img/pv4/dots/1_0.gif";	
			smileyarr["Colere_005"]="http://static.pennergame.de/img/pv4/plunder/zauberstab.gif"; //Baguette magique
			smileyarr["Colere_006"]="http://static.pennergame.de/img/pv4/plunder/kaputte_brille.gif"; //Lunette cassées
			smileyarr["Colere_007"]="http://coeurlumiere.com/clodowiki/images/0/0c/Hw.gif"; //Citrouille
			smileyarr["Colere_008"]="http://static.pennergame.de/img/pv4/plunder/bogen.png"; //Arc
			smileyarr["Colere_009"]="http://coeurlumiere.com/clodowiki/images/3/38/Hussmannswaffe.png"; // Gros calibre
			smileyarr["Colere_010"]="http://coeurlumiere.com/clodowiki/images/1/15/Iwin3.png"; //I Win	
			//smileyarr["Colere_01"]="";	
			// PC
			smileyarr["Colere_051"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHG3QC32EI/AAAAAAAAAhc/2_yYOUCJiRI/Colere_8.gif";
			smileyarr["Colere_052"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHICXJ-mXI/AAAAAAAAAk8/nPLqHtk2WCQ/Colere_18.gif";
			// Colére seul
			smileyarr["Colere_100"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHG4bLumqI/AAAAAAAAAhg/NGwgDaDTGhA/Colere_70.gif";
			smileyarr["Colere_101"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG4xC2Z7I/AAAAAAAAAhk/HorQ3DyZNCE/Colere_7.gif";
			smileyarr["Colere_102"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG5nfTPrI/AAAAAAAAAho/Fp15c7iW5Ro/Colere_69.gif";
			smileyarr["Colere_103"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHG7n1br9I/AAAAAAAAAhw/nfGRHTfldNI/Colere_67.gif";
			smileyarr["Colere_104"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHG8YiLagI/AAAAAAAAAh0/ibsuh-ixavo/Colere_66.gif";
			smileyarr["Colere_105"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHG-qIh2xI/AAAAAAAAAiA/1JQeP0voxZc/Colere_63.gif";
			smileyarr["Colere_106"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHG_izwopI/AAAAAAAAAiE/8-mu7WSouOA/Colere_62.gif";
			smileyarr["Colere_107"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHBtOz6VI/AAAAAAAAAiM/uJCM7vIoRrI/Colere_60.gif";
			smileyarr["Colere_108"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHE42D3RI/AAAAAAAAAig/4vmb0auMK78/Colere_56.gif";
			smileyarr["Colere_109"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHFfU0j3I/AAAAAAAAAik/5oZksOYuRFA/Colere_55.gif";
			smileyarr["Colere_100"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHHGKtnbGI/AAAAAAAAAio/lOc2_owZ5YQ/Colere_54.gif";
			smileyarr["Colere_111"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHHbJfhyI/AAAAAAAAAis/5UVmfwr7-uM/Colere_52.gif";
			smileyarr["Colere_112"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHJ69d9_I/AAAAAAAAAi0/3RUcP7r8PKo/Colere_50.gif";
			smileyarr["Colere_113"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHMaAPHMI/AAAAAAAAAi8/7gCV7f8fFgM/Colere_49.gif";
			smileyarr["Colere_114"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHTahxVLI/AAAAAAAAAjk/QaqoKV-DR6w/Colere_39.gif";
			smileyarr["Colere_115"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHUTbjsII/AAAAAAAAAjo/nEwNS6PG3DA/Colere_38.gif";
			smileyarr["Colere_116"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHWkXOeWI/AAAAAAAAAjw/VtuKyABS5t0/Colere_36.gif";
			smileyarr["Colere_117"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHY4Y5CPI/AAAAAAAAAj4/zSe_pM-dzGs/Colere_34.gif";
			smileyarr["Colere_118"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHZninniI/AAAAAAAAAj8/G4cLFCXW-hs/Colere_32.gif";
			smileyarr["Colere_119"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHawTum1I/AAAAAAAAAkA/eT17asZU46c/Colere_31.gif";
			smileyarr["Colere_120"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHw3WJ__I/AAAAAAAAAkQ/HGjEvSDyHQY/Colere_28.gif";
			smileyarr["Colere_121"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHy-8947I/AAAAAAAAAkY/Hy2eSt6t_zU/Colere_26.gif";
			smileyarr["Colere_122"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHH0spmlsI/AAAAAAAAAkc/WGdvqRxtM28/Colere_25.gif";
			smileyarr["Colere_123"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHH45zBvSI/AAAAAAAAAko/8CYukqVo_Yc/Colere_22.gif";
			smileyarr["Colere_124"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIJ0F9-pI/AAAAAAAAAlk/x76z_e0svMQ/Colere.gif";
			smileyarr["Colere_125"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHH3iRPjpI/AAAAAAAAAkk/sfW_Eh467JY/Colere_23.gif";
			smileyarr["Colere_126"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHII713RzI/AAAAAAAAAlg/R43kO6fsSqI/Colere_1.gif";
			smileyarr["Colere_127"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIF07NwoI/AAAAAAAAAlQ/-g5s3keIqNs/Colere_13.gif";
			// A deux
			smileyarr["Colere_200"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHG6TEucNI/AAAAAAAAAhs/6HCUB2mPyII/Colere_68.gif";
			smileyarr["Colere_201"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHAljT47I/AAAAAAAAAiI/b6IZqe_tOPw/Colere_61.gif";
			smileyarr["Colere_202"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHHC_ibmUI/AAAAAAAAAiU/sli-pXrP02c/Colere_59.gif";
			smileyarr["Colere_203"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHJJlJn2I/AAAAAAAAAiw/ryTrv9Axvws/Colere_51.gif";
			smileyarr["Colere_204"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHVNiI0SI/AAAAAAAAAjs/fLQuZxArYmE/Colere_37.gif";
			smileyarr["Colere_205"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHHX1rtE0I/AAAAAAAAAj0/IRADUj1-uyI/Colere_35.gif";
			smileyarr["Colere_206"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHH90HrSlI/AAAAAAAAAkw/Mogb_6x8muk/Colere_20.gif";
			smileyarr["Colere_207"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHIAZHM65I/AAAAAAAAAk4/vcprRyjaQ_U/Colere_19.gif";
			// Petit
			smileyarr["Colere_301"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHG1w7RqAI/AAAAAAAAAhY/TioU3JaJ14Q/Colere_9.gif";
			smileyarr["Colere_302"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHCKVtXZI/AAAAAAAAAiQ/FHMdHo2E7eY/Colere_6.gif";
			smileyarr["Colere_303"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHHK4LmBaI/AAAAAAAAAi4/zsuhVdwHzNU/Colere_5.gif";
			smileyarr["Colere_304"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIE3NtrLI/AAAAAAAAAlM/foGlXjneQlM/Colere_14.gif";
			smileyarr["Colere_305"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIGiq6zEI/AAAAAAAAAlU/wmBoeqqGGn8/Colere_12.gif";
			smileyarr["Colere_306"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHIHNTbP5I/AAAAAAAAAlY/mDTI7z84zCY/Colere_11.gif";
			smileyarr["Colere_307"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHIHnty_dI/AAAAAAAAAlc/iUo17jnPxCE/Colere_10.gif";
			// Vert
			smileyarr["Colere_400"]="http://www.greensmilies.com/smile/smiley_emoticons_razz.gif";
			smileyarr["Colere_401"]="http://www.greensmilies.com/smile/smiley_emoticons_kotz.gif";
			smileyarr["Colere_402"]="http://www.greensmilies.com/smile/smiley_emoticons_hurra3.gif";
			smileyarr["Colere_403"]="http://www.greensmilies.com/smile/smiley_emoticons_shocked.gif";
			smileyarr["Colere_404"]="http://www.greensmilies.com/smile/smiley_emoticons_frown.gif";
			smileyarr["Colere_405"]="http://www.greensmilies.com/smile/smiley_emoticons_aufsmaul.gif";
			smileyarr["Colere_406"]="http://www.greensmilies.com/smile/smiley_emoticons_waffe14.gif";
			smileyarr["Colere_407"]="http://www.greensmilies.com/smile/smiley_emoticons_sarazene_bogen.gif";
			smileyarr["Colere_408"]="http://www.greensmilies.com/smile/smiley_emoticons_bier.gif";
			smileyarr["Colere_409"]="http://www.greensmilies.com/smile/smiley_emoticons_ugly-tittenwackler.gif";
			smileyarr["Colere_410"]="http://smileys.sur-la-toile.com/repository/Boissons/tchin-tchin.gif"; // ricard
			smileyarr["Colere_411"]="http://smileys.sur-la-toile.com/repository/Boissons/0014.gif"; // boire à 2
			smileyarr["Colere_412"]="http://smileys.sur-la-toile.com/repository/Fume/canabis-je-vole.gif"; // cana
			smileyarr["Colere_413"]="http://smileys.sur-la-toile.com/repository/Fume/0080.gif"; // oinj
			smileyarr["Colere_414"]="http://smileys.sur-la-toile.com/repository/Combat/0155.gif"; // cheval sabre
			smileyarr["Colere_415"]="http://smileys.sur-la-toile.com/repository/Combat/0231.gif"; // boxe
			smileyarr["Colere_416"]="http://smileys.sur-la-toile.com/repository/Ordinateur/ordi-poing.gif"; // ordi cp de poing
			smileyarr["Colere_417"]="http://smiliesworld.fr/smileys/sexe-fouet.gif"; // fouet masquée
			smileyarr["Colere_418"]="http://www.lenidbarbar.com/fauxrhum/images/smilies/sado.gif"; // fouétté pendu
			smileyarr["Colere_419"]="http://box1.nethalys.com/~ajv/smileys/experimental/fouet.gif"; // fouet pleure
			smileyarr["Colere_420"]="http://downparadise.com/forum/images/smilies/fouet.gif"; // coup de fouet
			smileyarr["Colere_421"]="http://www.lk-studio.be/smileys/fessee.gif"; // fessée
			smileyarr["Colere_422"]="http://membres.multimania.fr/aqwarius/infopsg_smileys/fouet.gif"; // sado
			smileyarr["Colere_423"]="http://www.fire-soft-board.com/fsb/images/smileys/sado.gif"; // boule bouche
			smileyarr["Colere_424"]="http://neophil78.free.fr/smileys/Divers1/sadomaso.gif"; // sado mazo
			smileyarr["Colere_425"]="http://smiliesworld.fr/smileys/50.gif"; // blonde nichon
			smileyarr["Colere_426"]="http://smileys.sur-la-toile.com/repository/Respect/aplausos.gif"; // bravo BIG
			smileyarr["Colere_427"]="http://smileys.sur-la-toile.com/repository/Divers/repassage.gif"; // repassage
			smileyarr["Colere_428"]="http://smileys.sur-la-toile.com/repository/Anges_et_d%E9mons/3d-ange-3.gif"; // ange
			smileyarr["Colere_429"]="http://smileys.sur-la-toile.com/repository/Grands_Smileys/emoticone-msn-diable-sourcis.gif"; // démon
			smileyarr["Colere_430"]="http://smileys.sur-la-toile.com/repository/Boissons/barman-biere-456.gif"; // barman
			smileyarr["Colere_431"]="http://smileys.sur-la-toile.com/repository/Boulet/0116.gif"; // parking à boulet
			smileyarr["Colere_432"]="http://smileys.sur-la-toile.com/repository/Boulet/boulet-repere.gif"; // boulet repéré
			smileyarr["Colere_433"]="http://smileys.sur-la-toile.com/repository/Combat/0215.gif"; // combat a 2 au sabre
			smileyarr["Colere_434"]="http://smileys.sur-la-toile.com/repository/Grands_Smileys/3d-coucou-salue.gif"; // salut
			smileyarr["Colere_435"]="http://smileys.sur-la-toile.com/repository/Divers/ah-non-58933.gif"; // oh non !!!
			smileyarr["Colere_436"]="http://smileys.sur-la-toile.com/repository/Divers/rasoir-electrique-2432.gif"; // jme rase
			smileyarr["Colere_437"]="http://smileys.sur-la-toile.com/repository/Divers/saute.gif"; // bong
			smileyarr["Colere_438"]="http://smileys.sur-la-toile.com/repository/Endormi/mini-dodo-2932.gif"; // dormir
			smileyarr["Colere_439"]="http://smileys.sur-la-toile.com/repository/Grands_Smileys/3d-respect-43.gif"; // tu es mon rois
			smileyarr["Colere_440"]="http://smileys.sur-la-toile.com/repository/Grands_Smileys/3d-yeux-dollars.gif"; // argent argent
			smileyarr["Colere_441"]="http://smileys.sur-la-toile.com/repository/Grands_Smileys/emoticone-msn-nonnon.gif"; // pas d'accord
			smileyarr["Colere_442"]="http://smileys.sur-la-toile.com/repository/Grands_Smileys/emoticone-msn-pas-cool.gif"; // -1
			smileyarr["Colere_443"]="http://smileys.sur-la-toile.com/repository/Messages/Animation22.gif"; // lol :D
			smileyarr["Colere_444"]="http://smileys.sur-la-toile.com/repository/Messages/cavapas.gif"; // çà va pas la tête
			smileyarr["Colere_445"]="http://smileys.sur-la-toile.com/repository/Rires/mdr-mort-de-rire-284923.gif"; // mdr
			smileyarr["Colere_446"]="http://mysavoircoyote666.ibelgique.com/smileys/smileys_Messages/foot.gif"; // le foot strop nul
			smileyarr["Colere_447"]="http://www.fasel-optique.ch/images/smiley_lunettesoleil.gif"; // clein d'oeil class avec lunette
			smileyarr["Colere_448"]="http://www.greensmilies.com/wp-content/uploads/2006/07/gw_warrior005.gif"; // aiguise hache
			smileyarr["Colere_449"]="http://s2.noelshack.com/uploads/images/16650492294249_a4.gif"; // priére
			smileyarr["Colere_450"]="http://s2.noelshack.com/uploads/images/13167564781833_b6.gif"; // pouce en l'air
			smileyarr["Colere_451"]="http://s2.noelshack.com/uploads/images/7817232398580_b8.gif"; // pas bien du doigt
			smileyarr["Colere_452"]="http://s2.noelshack.com/uploads/images/16388268559245_c3.gif"; // bourré à deux
			smileyarr["Colere_453"]="http://s2.noelshack.com/uploads/images/16340066429940_c8.gif"; // vieux sage
			smileyarr["Colere_454"]="http://s2.noelshack.com/uploads/images/20144158832655_d9.gif"; // salo
			smileyarr["Colere_455"]="http://s2.noelshack.com/uploads/images/8346225363993_e2.gif"; // applause
			smileyarr["Colere_456"]="http://s2.noelshack.com/uploads/images/18971685281736_e6.gif"; // mitrailleuse
			smileyarr["Colere_457"]="http://s2.noelshack.com/uploads/images/2978669633247_e8.gif"; // pistolets
			smileyarr["Colere_458"]="http://s2.noelshack.com/uploads/images/17768351187180_f3.gif"; //baibaille
			smileyarr["Colere_459"]="http://s2.noelshack.com/uploads/images/13237898037804_g1.gif"; //51 Ricard
			smileyarr["Colere_460"]="http://s2.noelshack.com/uploads/images/14622463717389_g2.gif"; // trinque ricard
			smileyarr["Colere_461"]="http://s2.noelshack.com/uploads/images/15188149863117_g3.gif"; // Boire 5 ricard
			smileyarr["Colere_462"]="http://s2.noelshack.com/uploads/images/7361198186562_g10.gif"; // tire la langue et les mains aux oreilles
			smileyarr["Colere_463"]="http://s2.noelshack.com/uploads/images/15625639339794_h4.gif"; // chope de bierre
			smileyarr["Colere_464"]="http://s2.noelshack.com/uploads/images/11065928056524_h10.gif"; // le rois
			smileyarr["Colere_465"]="http://s2.noelshack.com/uploads/images/6607195794342_i1.gif"; // brancart
			smileyarr["Colere_466"]="http://s2.noelshack.com/uploads/images/722902352535_i4.gif"; // ciao
			smileyarr["Colere_467"]="http://s2.noelshack.com/uploads/images/7874084352816_i5.gif"; // t dingue
			smileyarr["Colere_468"]="http://s2.noelshack.com/uploads/images/4616960207805_i9.gif"; // café journal
			//smileyarr["Colere_469"]="";
			//smileyarr["Colere_470"]="";
			//smileyarr["Colere_471"]="";
			//smileyarr["Colere_472"]="";
			//smileyarr["Colere_4"]="";

			
			
	
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
				
				for(title in smileyarr)
				{
					mm=document.createElement("a");
					mm.href="javascript:;";
					mm.setAttribute("gult",i);
					mm.setAttribute("style",'text-decoration:none');
					mm.innerHTML='<img src="'+smileyarr[title]+'" alt="'+title+'" height="25px" /> | ';
					mm.addEventListener("click", insertSmiley, true);
					d.appendChild(mm);
				}
			}	
		}
		
dip();

}, false);