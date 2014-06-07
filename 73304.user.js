// ==UserScript==
// @name         	Clodogame, BumriseUSA, Dons automatiques temporisés pour ESMERY.com et Bumdonations.com - Auto Donation script for ESMERY.com and BumDonations.com
// @author		lordclodo as freescriptuser - pennerhack.foren-city.de
// @description  	Avec un bouton, on lance automatiquement les dons, with a button, you launch automatically the donations
// @version		1.2
// @include		http://www.bumdonations.com/*
// @include		http://www.esmery.com/*
// ==/UserScript==




//______________________________________________________________
//			ESMERY 					|
//______________________________________________________________|

if(document.location.href.indexOf('DonationShare')>=0) {

var btn = document.createElement('input');
var mydiv = document.createElement('div');

btn.value = 'LANCER LES DONS AUTOMATIQUEMENT';
btn.type = 'button';
btn.setAttribute("style", "z-index:99999;");
btn.addEventListener('click', _btn_ESMERY, true);

mydiv.innerHTML = '<div style="height: 10px; width:200px"></div>';
mydiv.innerHTML += '<div name="message" id="message"></div>';

mydiv.appendChild(btn);
document.body.insertBefore(mydiv, document.body.firstChild);
document.getElementById('message').innerHTML = '<font style="color:green">Pour lancer le script cliquer sur LANCER LES DONS AUTOMATIQUEMENT</font>';

}

//______________________________________________________________
//			BUMDONATIONS				|
//______________________________________________________________|

if(document.location.href.indexOf('bumdonations.com/')>=0) {

var content = document.body.innerHTML;

var text0 = content.split('nice to have you')[1];
if (typeof( text0 ) != "undefined" ) {
alert("This is the first time you entered your donation link, click another time on the OK button to display the start script button");
}

var text1 = content.split('still have')[1];
if (typeof( text1 ) != "undefined" ) {

var text2 = text1.split('credits')[0];
var index_pos=text2.lastIndexOf(")");

var credit_restant = parseInt(text2.substring(2,index_pos));
var nb_dons_a_faire = 50 - credit_restant;


var btn = document.createElement('input');
var mydiv = document.createElement('div');

btn.value = 'START AUTO DONATIONS';
btn.type = 'button';
btn.setAttribute("style", "z-index:99999;");
btn.addEventListener('click', _btn_BUMDONATIONS, true);

mydiv.innerHTML = '<div style="height: 200px; width:200px"></div>';
mydiv.innerHTML += '<div name="message" id="message"></div>';

mydiv.appendChild(btn);
document.body.insertBefore(mydiv, document.body.firstChild);
document.getElementById('message').innerHTML = '<font style="color:green">To launch the script, please press START AUTO DONATIONS</font>';

}
}

function _btn_BUMDONATIONS() {
if (nb_dons_a_faire<=0){alert("What the fuck? Your credit is already at 50, you cannot have more ;) retry later!");
				exit;	
}
btn.value = 'Donations in progress...';
btn.disabled=true;


var allLinks, thisLink;
allLinks = document.evaluate(
     '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	if(nb_dons_a_faire > 50){i=5} else {i=allLinks.snapshotLength - nb_dons_a_faire}
	
    neu(i);
    function neu(i) {
		  thisLink = allLinks.snapshotItem(i);
            GM_xmlhttpRequest({
                method: 'GET',
                url: thisLink,
                onload: function(responseDetails) {
						var nombreliens = allLinks.snapshotLength - 1; 
						if (credit_restant >= 0) {var l = i - 4 - credit_restant ;} else {var l = i - 4;}
						if (i == nombreliens)  
							{
							var affiche = ('Thank you Bum! You have given '+l+' donations, please refresh the page and re-launch the script if your credit is not 50 yet');
							document.getElementById('message').innerHTML = '<font style="color:green">' + affiche + '</font>';
							btn.value = 'START AUTO DONATIONS';
							btn.disabled=false;
                                                        exit;
							} else {
								var affiche = 'Link ' +l+ ' in progress..... waiting for the next';
								}
						document.getElementById('message').innerHTML = '<font style="color:green">' + affiche + '</font>';
						i++;
						var tempo = 2000 + 1000*Math.random();
						setTimeout(function () { neu(i);}, tempo);	//2 secondes d'attente + rand*1000	                       
						}
						});
        } 
}

function _btn_ESMERY() {

var nombreliens = prompt('Combien de dons voulez-vous effectuer?', '');

var allLinks, thisLink;

allLinks = document.evaluate(
     '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

    if(allLinks.snapshotLength<=3){alert("Vous n avez plus de clodo à aider aujourd hui ;), veuillez réessayer après la remise à zéro des dons!");
					exit;}

	btn.value = 'Dons en cours...';
	btn.disabled=true;

    i = 3;
    thisLink = allLinks.snapshotItem(i);

    neu(i);

    function neu(i) {


            GM_xmlhttpRequest({
                method: 'GET',
                url: thisLink,
                onload: function(responseDetails) {
						var l = i - 2 ;
						if (l == nombreliens) 
							{
							var affiche = 'Merci! Les '+nombreliens+' dons ont été effectués';
							document.getElementById('message').innerHTML = '<font style="color:green">' + affiche + '</font>';
							btn.value = 'LANCER LES DONS AUTOMATIQUEMENT';
							btn.disabled=false;
							exit;
							} else {
								affiche = 'Lien ' +l+ ' en cours..... Attente pour le suivant';
								}
						document.getElementById('message').innerHTML = '<font style="color:green">' + affiche + '</font>';
						i++;
						var tempo = 2000 + 1000*Math.random();
						setTimeout(function () { neu(i);}, tempo);	//2 secondes d'attente + rand*1000	                       
						}
						});
        }

}