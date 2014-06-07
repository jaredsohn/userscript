// ==UserScript==
// @name		VUB ezProxy - Vrij Onderzoek
// @author		Michael Cox        
// @version		v0.1
// @namespace           http://www.michaelcox.eu
// @description		Auto use of the Vrije Universiteit Brussel's ezProxy upon visiting sites that are supported (only useful for staff and students, since you need an account). This script is heavily based on LenR's Tufts ezProxy script. Please do provide feedback and bug reports. I hope this script will aid all in their free inquiry (vrij onderzoek). For a full list of supported sites login here and you will get a list: http://www.vub.ac.be/cgi-bin/ezlogin/ezproxy.asp
//
// @include		*isiknowledge.com*
// @include		*.isihost.com*
// @include		*newisiknowledge.com*
// @include		*myendnoteweb.com*
// @include		*sciencedirect.com/*
// @include		*mlajournals.org/*
// @include		*jdr.iadrjournals.org*
// @include		*pedsinreview.aappublications.org*
// @include		*knipselkranten.nl*
// @include		*greenplanet.eolss.net*
// @include		*bju-tijdschriften.nl/index.php*
// @include		*esajournals.org*
// @include		*ajp.press.uiuc.edu*
// @include		*inva.allenpress.com*
// @include		*arpa.allenpress.com*
// @include		*leaonline.com*
// @include		*informaworld.com*
// @include		*ajronline.org/*
// @include		*aslo.org*
// @include		*134.184.194.112*
// @include		*web5s.silverplatter.com/webspirs/start.ws?customer=vubrussel*
// @include		*eureka.rlg.org/Eureka/zgate2.prod?ACTION=INIT&LIMFIL=AVE*
// @include		*ciaonet.org/*
// @include		*leisuretourism.com*
// @include		*bjr.birjournals.org*
// @include		*portal.acm.org*
// @include		*iasb.org/*
// @include		*vvbad.be*
// @include		*cepr.org*
// @include		*historycooperative.org*
// @include		*mddb.wiley.com/*
// @include		*jbmronline.org*
// @include		*rsc.org*
// @include		*pedagogiek-online.nl*
// @include		*perspectives.adisonline.com*
// @include		*drugs.adisonline.com*
// @include		*sportsmedicine.adisonline.com*
// @include		*pharmacokinetics.adisonline.com*
// @include		*pharmacoeconomics.adisonline.com*
// @include		*envplan.com*
// @include		*encyclopedie.atilf.fr/*
// @include		*librijournal.org*
// @include		*pob.peeters-leuven.be*
// @include		*medicaljournals.se/adv/*
// @include		*poj.peeters-leuven.be*
// @include		*csa1.co.uk/*
// @include		*serials.abc-clio.com*
// @include		*biomedcentral.com*
// @include		*ft.com/home/europe*
// @include		*iaor-palgrave.com/*
// @include		*psychiatrist.com*
// @include		*mensenmaatschappij.nl*
// @include		*134.184.31.2/cgi-bin/Mcgi?Cgi:WWWOEXSPEED.0.0.ADB*
// @include		*134.184.31.1/webbroadcast/Vubis.csp?Profile=VUBPORTAL*
// @include		*ari.uni-heidelberg.de/aribib/*
// @include		*biblnt2.vub.ac.be/*
// @include		*swa.metapress.com/*
// @include		*ergonomics.metapress.com*
// @include		*emis.de/ZMATH/*
// @include		*portail.atilf.fr*
// @include		*newleftreview.net/*
// @include		*euromonitor.com*
// @include		*ams.org/mathscinet*
// @include		*swetswise.com/public/login.do*
// @include		*palgrave-journals.com*
// @include		*invert.be:8080*
// @include		*papers.nber.org/*
// @include		*diabetes.diabetesjournals.org*
// @include		*ssh.dukejournals.org*
// @include		*pubs.acs.org/*
// @include		*pubs3.acs.org/*
// @include		*archderm.ama-assn.org/*
// @include		*archpsyc.ama-assn.org/*
// @include		*jimmunol.org*
// @include		*cancerres.aacrjournals.org*
// @include		*clincancerres.aacrjournals.org*
// @include		*thieme.de/*
// @include		*archinte.ama-assn.org/*
// @include		*archneur.ama-assn.org/*
// @include		*archopht.ama-assn.org/*
// @include		*archsurg.ama-assn.org/*
// @include		*jama.ama-assn.org/*
// @include		*pra.aps.org/*
// @include		*prb.aps.org/*
// @include		*prc.aps.org/*
// @include		*prd.aps.org/*
// @include		*pre.aps.org/*
// @include		*prl.aps.org/*
// @include		*jcs.biologists.org*
// @include		*jme.bmjjournals.com*
// @include		*publish.aps.org*
// @include		*pubs.asce.org/journals/*
// @include		*blackwellsynergy.com/*
// @include		*ingenta.com*
// @include		*isacco.ingentaselect.com*
// @include		*openurl.ingentaselect.com*
// @include		*journals.cup.org/owa_dba/owa/*
// @include		*atypon-link.com*
// @include		*search.ebscohost.com/login.aspx*
// @include		*linking.epnet.com*
// @include		*elsevier.nl/gej-ng/*
// @include		*projecteuclid.org*
// @include		*online.sagepub.com/*
// @include		*journal.ajsm.org/*
// @include		*isacco.emeraldinsight.com*
// @include		*emeraldinsight.com*
// @include		*edpsciences.org*
// @include		*ajpcell.physiology.org/*
// @include		*sciencemag.org*
// @include		*stke.sciencemag.org*
// @include		*sageke.sciencemag.org*
// @include		*ajpendo.physiology.org/*
// @include		*ajpgi.physiology.org/*
// @include		*ajpheart.physiology.org/*
// @include		*ajplung.physiology.org/*
// @include		*extenza-eps.com/extenza/contentviewing/browse.do*
// @include		*ajpregu.physiology.org/*
// @include		*ajprenal.physiology.org/*
// @include		*ajcn.org/*
// @include		*amjpathol.org/*
// @include		*ajp.psychiatryonline.org/*
// @include		*ard.bmjjournals.com/*
// @include		*astro.annualreviews.org/*
// @include		*biochem.annualreviews.org/*
// @include		*cellbio.annualreviews.org/*
// @include		*fluid.annualreviews.org/*
// @include		*genet.annualreviews.org/*
// @include		*immunol.annualreviews.org/*
// @include		*med.annualreviews.org/*
// @include		*micro.annualreviews.org/*
// @include		*neuro.annualreviews.org/*
// @include		*nutr.annualreviews.org/*
// @include		*pharmtox.annualreviews.org/*
// @include		*physiol.annualreviews.org/*
// @include		*plant.annualreviews.org/*
// @include		*psych.annualreviews.org/*
// @include		*publhealth.annualreviews.org/*
// @include		*soc.annualreviews.org/*
// @include		*adc.bmjjournals.com/*
// @include		*adc.bmjjournals.com/*
// @include		*bloodjournal.hematologylibrary.org*
// @include		*bmj.com/*
// @include		*bjo.bmjjournals.com/*
// @include		*bjp.rcpsych.org/*
// @include		*clinchem.org/*
// @include		*dmd.aspetjournals.org/*
// @include		*edrv.endojournals.org/*
// @include		*endo.endojournals.org/*
// @include		*jcem.endojournals.org/*
// @include		*mend.endojournals.org/*
// @include		*fasebj.org/*
// @include		*gastrojournal.org*
// @include		*gut.bmjjournals.com/*
// @include		*heart.bmjjournals.com/*
// @include		*iai.asm.org/*
// @include		*iovs.org/*
// @include		*jap.physiology.org/*
// @include		*jb.asm.org/*
// @include		*jbc.org/*
// @include		*jci.org/*
// @include		*vir.sgmjournals.org/*
// @include		*jlr.org/*
// @include		*jnnp.bmjjournals.com/*
// @include		*jneurosci.org/*
// @include		*jpet.aspetjournals.org/*
// @include		*jphysiol.org/*
// @include		*jvi.asm.org/*
// @include		*atvb.ahajournals.org/*
// @include		*circ.ahajournals.org/*
// @include		*circres.ahajournals.org/*
// @include		*mcb.asm.org/*
// @include		*molpharm.aspetjournals.org/*
// @include		*nips.physiology.org/*
// @include		*brain.oxfordjournals.org/*
// @include		*carcin.oxfordjournals.org/*
// @include		*emboj.org/*
// @include		*fampra.oxfordjournals.org/*
// @include		*heapro.oxfordjournals.org/*
// @include		*hmg.oxfordjournals.org/*
// @include		*intimm.oxfordjournals.org/*
// @include		*ije.oxfordjournals.org/*
// @include		*jac.oxfordjournals.org/*
// @include		*petrology.oxfordjournals.org/*
// @include		*jnci.oxfordjournals.org/*
// @include		*nar.oxfordjournals.org/*
// @include		*wber.oxfordjournals.org/*
// @include		*bjc.oxfordjournals.org*
// @include		*cje.oxfordjournals.org*
// @include		*pediatrics.aappublications.org*
// @include		*pharmrev.aspetjournals.org/*
// @include		*physrev.physiology.org/*
// @include		*pnas.org/*
// @include		*ebmonline.org/*
// @include		*radiology.rsnajnls.org/*
// @include		*rmp.aps.org/*
// @include		*jcb.org/*
// @include		*jem.org/*
// @include		*jgp.org/*
// @include		*degruyter.de*
// @include		*tc.bmjjournals.com/*
// @include		*idealibrary.com/*
// @include		*iop.org/EJ/*
// @include		*stacks.iop.org/*
// @include		*kapis.wkap.nl/*
// @include		*nature.com*
// @include		*ao.osa.org/*
// @include		*josaa.osa.org/*
// @include		*josab.osa.org/*
// @include		*gateway1.ovid.com/*
// @include		*ajnr.org*
// @include		*ptjournal.org/*
// @include		*springerlink.com*
// @include		*link.springer-ny.com*
// @include		*turpion.org*
// @include		*journals.uchicago.edu*
// @include		*csa1.co.uk/htbin/dbrng.cgi?username=vub&access=vub8744&cat=psycarticles*
// @include		*heinonline.org/HOL/Welcome*
// @include		*annals.org*
// @include		*medicinescomplete.com/*
// @include		*dictionaryofeconomics.com/dictionary*
//
// @exclude		http://www.vub.ac.be/cgi-bin/ezlogin/ezproxy.asp?*
// @exclude		*.ezproxy.vub.ac.be:2048/*
// ==/UserScript==

var ezproxLR = ".ezproxy.vub.ac.be:2048/";
var currlocLR = content.document.location.href;

//if (content.document.location.href.match(ezproxLR)) {
  //	alert('ezprox');
//}
//else {

  //	alert('loop');
	var newlocLR, ezproxnewLR;
	if (currlocLR.match(".org/")) {
	 //	alert('org');
		ezproxnewLR=".org" + ezproxLR;
		newlocLR = currlocLR.replace(".org/", ezproxnewLR);
	}	
	else if (currlocLR.match(".com/")) {
	 //	alert('com');
		ezproxnewLR=".com" + ezproxLR;
		newlocLR = currlocLR.replace(".com/", ezproxnewLR);
	}
	else if (currlocLR.match(".be/")) {
	 //	alert('be');
		ezproxnewLR=".be" + ezproxLR;
		newlocLR = currlocLR.replace(".be/", ezproxnewLR);
	}
	else if (currlocLR.match(".nl/")) {
	 //	alert('nl');
		ezproxnewLR=".nl" + ezproxLR;
		newlocLR = currlocLR.replace(".nl/", ezproxnewLR);
	}
	else if (currlocLR.match(".edu/")) {
	 //	alert('edu');
		ezproxnewLR=".edu" + ezproxLR;
		newlocLR = currlocLR.replace(".edu/", ezproxnewLR);
	}
	else if (currlocLR.match(".de/")) {
	 //	alert('de');
		ezproxnewLR=".de" + ezproxLR;
		newlocLR = currlocLR.replace(".de/", ezproxnewLR);
	}
	else if (currlocLR.match(".fr/")) {
	 //	alert('fr');
		ezproxnewLR=".fr" + ezproxLR;
		newlocLR = currlocLR.replace(".fr/", ezproxnewLR);
	}
	else if (currlocLR.match(".net/")) {
	 //	alert('net');
		ezproxnewLR=".net" + ezproxLR;
		newlocLR = currlocLR.replace(".net/", ezproxnewLR);
	}

	content.document.location.replace(newlocLR);
	
//}
