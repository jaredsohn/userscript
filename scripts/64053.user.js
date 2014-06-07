// ==UserScript==
// @name           Foolood_chatbox
// @namespace      Foolood_chatbox
// @include        http://patator.frbb.net/chatbox/chatbox.forum*
// ==/UserScript==
function posttimer(){
	if(i<ii){msgpost();i++;}
	else{clearTimeout(myinterval);finished();}
}
function posttimerrand(){
	if(i<ii){msgpost();i++;setTimeout(posttimerrand,((Math.random()*(timerfin-timerdeb))+timerdeb));}
	else{finished();}
}
function randsmiley(){
	return smileys[Math.floor((Math.random()*smileys_nbr))];
}
function kamouloxgen(){	
	do{verbe1=Math.floor((Math.random()*verbe_l));}
	while(verbe1==verbe2);
	do{verbe2=Math.floor((Math.random()*verbe_l));}
	while(verbe1==verbe2);
	do{complement1=Math.floor((Math.random()*complement_l));}
	while(complement1==complement2);
	do{complement2=Math.floor((Math.random()*complement_l));}
	while(complement1==complement2);	
	return ('je '+verbe[verbe1]+' '+complement[complement1]+' et tu '+verbe[verbe2]+' '+complement[complement2]);
}
function finished(){
	document.title = oldtittle;
	alert('Finished');
}
function msgpost(){
	if(boolsmiley){msgb.value=msg+randsmiley();}
	else if(boolkamoulox){msgb.value=kamouloxgen();}
	else{msgb.value=msg;}
	but.click();
}
var i=0;
var msg="";
var msgb=document.getElementById('message');
var but=document.getElementById('submit_button');
ok=1;
boolsmiley = 0;
boolkamoulox = 0;
verbe1 = -1;
verbe2 = -1;
complement1 = -1;
complement2 = -1;

msg = prompt("Message a poster ?");
if(msg != null){
ii = prompt("Nombre de posts ?");
if(ii != null){
	oldtittle = document.title;
	document.title='[Flood] '+oldtittle;	
	
	if(msg.indexOf('kamoulox') != -1){
		boolkamoulox = 1;
		var verbe = new Array('tue','chie','pond','visse','lis','bois','cloue','charge','fonds','chante','siffle','tire','devisse','saute','ferme','disseque','frotte','crie','gueule','programme','decode','roule','connecte','fume','pique','plante','enfonce','crucifis','reincarne');
		verbe_l = verbe.length;
		var complement = new Array('un chien','un chat','un dromadaire','un chameau','un lama','un cannard','une truie','un porc','un porc','un pingouin','un vélo','une voiture','un car','un bus','un camion','un avion','un aeroglisseur','un train','un buggy','un 4x4','un steack','des spaghettis','un oeuf','une pomme','une brique de jus de fruit','un cheesburger','du pop corn','une table','un manteau','une chaise','un mirroir','un stylo','un livre','une loupe','un verre','une photo','des chaussures','une batterie','un escalator','une vis','un marteau','un clou','une planche','un tourne-vis','une scie sauteuse','une perceuse a colonne','un etaux','une pince','un ciseaux','un arbre','une plante','une fleur','de l\'herbe','de la weed','un stomate','de la mouse','du scotch','du verre','du bois','du plastique','de l\'air','de l\'eau','de la plasticine','de la vaseline','de l\'inox','du liquide seminal','de la mousse','du scotch','du verre','du bois','du plastique','de l\'air','de l\'eau','de la plasticine','de la vaseline','de l\'inox','du liquide seminal','de la mousse','un boulet','un kikoolol','la route','la porte','un pont de verre','une encéphalite rectal','la physique quantique','ton cul','un mac user','Bob Marley','Celine Dion','Chabal','PPDA','Sebastien Folin','Sarkozy','Chuck Norris','Benoit XXVI','Cartman','Mr Garisson');
		complement_l = complement.length;
	}
	else{
		msgiop = msg.indexOf(':');
		if(msgiop != -1){
			if(((msg.indexOf(':',(msgiop+1))) - msgiop) == 1){
				boolsmiley = 1;
				var smileys = new Array(':D',':)',':(',':o',':shock:','8)',':lol:',':P',':cry:',':evil:',':twisted:',':roll:',';)',':face:',':mrgreen:');
				smileys_nbr = smileys.length;
				msg = msg.substring(0,msgiop);
				msg += ' ';
			}
		}
	}
	
	if(ii.indexOf('#') == -1 )
	{
		if(ii>250){if(confirm("Nombre de posts reduit a 250 pour eviter de bugguer la chatbox ;) ")){ii=150;}else{ok=0;}}
		if(ok){if(ii>50){if(!(confirm("nombre de posts important, risque de freeze, continuer ?"))){ok=0;}}}
		if(ok)
		{
			for(i=0; i<ii; i++)
			{msgpost();}
			document.title = oldtittle;
		}
	}
	else if(ii.indexOf('#') != -1 && ii.indexOf('#',(ii.indexOf('#')+1)) != -1)
	{
		deb = (ii.indexOf('#')+1);
		fin = ii.indexOf('#',deb);
		if(ii.indexOf(';',deb) != -1)
		{	
			timerdeb = ii.substring(deb,ii.indexOf(';',deb));
			timerfin = ii.substring((ii.indexOf(';',deb)+1),fin);
			timer = null;
			ii = ii.substring(0,(deb-1));
			ii = parseInt(ii);
			timerdeb = parseInt(timerdeb);
			timerfin = parseInt(timerfin);
			if(isNaN(ii) || isNaN(timerdeb) || isNaN(timerfin)){ok=0;}
		}
		else
		{
			timer = ii.substring(deb,fin);
			ii = ii.substring(0,(deb-1));
			if(isNaN(parseInt(timer)) || isNaN(parseInt(ii))){ok=0;}
		}
		if(ok)
		{	
			if(ii > 501 || ii < 1)
			{
				if(ii>501){ii = 501;}
				else{ii = 1;}
				alert('number of post reducted to interval [1;501] !');
			}
			if(timer != null)
			{
				if(timer > 120 || timer < 0)
				{
					if(timer>120){timer = 120;}
					else{timer = 1;}
					alert('timer reducted to interval [1;120] seconds !');
				}
				if(timer == 0)
				{timerdeb = 1000;timerfin = 120000;posttimerrand();}
				else
				{myinterval = setInterval(posttimer,(timer*1000));}			
			}
			else if(timerfin>timerdeb)
			{
				if(timerfin>300 && timerdeb<1)
				{
					if(timerfin>300){timerfin = 300;}
					if(timerdeb<1){timerdeb = 1;}
					alert('Interval reducted to [1;300] seconds !');
				}
				timerdeb = timerdeb*1000;
				timerfin = timerfin*1000;
				posttimerrand();		
			}
			else
			{alert('Error (incorrect interval) !');}
		}
		else
		{alert('Syntax error(timer or number is not a number)');}
	}
	else
	{
		alert('Syntax error !(One # or other error)');
	}
}
}