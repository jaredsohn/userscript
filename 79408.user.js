// ==UserScript==
// @name           OpenLog
// @namespace      vulca & Kirua
// @include        http://ogame.*/
// @include        http://www.ogame.*/
// @include        http://ogame.*/#*
// @include        http://www.ogame.*/#*
// @include        http://*ogame.*/main/loginError*
// @exclude        http://ogame.*index*
// ==/UserScript==

function entreLog()
{
	if(pseudo!='') document.getElementById('usernameLogin').value = pseudo;
	if(mdp!='') document.getElementById('passwordLogin').value = mdp;
	if(uni!='') 
	{

		document.getElementById('serverLogin').value = uni;
		//if(! FireFox) 
		{
			document.getElementById('loginForm').action = 'http://'+uni+'/game/reg/login2.php';
		//	document.getElementById('getPassword').href = "http://"+uni+"/game/reg/mail.php" ;
		//	document.getElementById('pwLost').href = "http://"+uni+"/game/reg/mail.php";
		}
	}
}

//var FireFox = (navigator.userAgent.indexOf('Firefox')>-1 ? true : false);

var texte_a_afficher = '<style type=text/css> #Affichage {	position: absolute;	top: 60%;	right: 1%; z-index: 100;	}</style><span id="Affichage"><img id="mdp1" src="http://i38.servimg.com/u/f38/13/88/21/21/icone10.png"><img id="mdp2" src="http://i38.servimg.com/u/f38/13/88/21/21/icone10.png"><img id="mdp3" src="http://i38.servimg.com/u/f38/13/88/21/21/icone10.png"></span>';

var sp1 = document.createElement("span"); // on crée une balise span
sp1.setAttribute("id", "Affichage"); // on y ajoute un id
var sp1_content = document.createTextNode('');
sp1.appendChild(sp1_content); 
var sp2 = document.getElementById('header').getElementsByTagName('h1')[0]; // Lieu où on veut afficher (A remplacer par ce que vous voulez 
var parentDiv = sp2.parentNode;
parentDiv.insertBefore(sp1, sp2.nextSibling);
var tableau = document.createElement("span");
tableau.innerHTML = texte_a_afficher; // Ce qu'on veut afficher 
document.getElementById('Affichage').insertBefore(tableau, document.getElementById('Affichage').firstChild); // Affichage

document.getElementById('login').style.display = "block";

// You can enter your username/ mdp /uni here (between "  " )
var pseudo = "";  // username
var mdp = "";  // password
var uni = ""; // uni example : "uniX.ogame.fr"
entreLog();

document.getElementById('mdp1').addEventListener("click", function(event) 
{ // deuxieme identifiant
	pseudo='2ieme uni';
	mdp='METTRE SON MDP';
	uni='uniX.ogame.fr';
	entreLog();
}, true); 	

 // Troisieme identifiant
document.getElementById('mdp2').addEventListener("click", function(event) 
{ // 3ieme identifiant
	pseudo='3ieme uni';
	mdp='METTRE SON MDP';
	uni='uniX.ogame.fr';
	entreLog();
}, true); 	


document.getElementById('mdp3').addEventListener("click", function(event) 
{ // 4ieme identifiant
	pseudo='4ieme uni';
	mdp='METTRE SON MDP';
	uni='uniX.ogame.fr';
	entreLog();
}, true); 	


