// Hattrick Avatar
// Version 1.0
// Created : 2009-08-12
// Created By : Miguel Z

// ==UserScript==
// @name           HattrickAvatar
// @namespace      http://userscripts.org/
// @description    Avatar for Hattrick non-supporters
// @description    v0.1 Add 100 different avatars for players
// @include        http://www*.hattrick.org/*
// @exclude
// ==/UserScript==

function getJogador(){
	if(!document.getElementById("ctl00_CPMain_pnlplayerInfo"))
		return
	var divArray = document.getElementsByClassName("hasByline");
	var idPT = 0;
	for (var i = 0; i<divArray.length; i++){
		idPT = ( divArray[i].innerHTML);
	}
	idPT = idPT.split("(");
	idPT = idPT[1].split(")");
	var idP = idPT[0];
	var divArray = document.getElementsByClassName("faceCard");
	divArray[0].style.background='none';
	divArray[0].style.background = getAvatar(idP.substr(idP.length-2));
}

getJogador();


//########################################################################################
function getJogadores(){
	if(!document.getElementsByClassName("playerList")) {
		return
	}
	var divArray = document.getElementsByClassName("playerInfo");
	var idJogador = 0;
	var jogador = new Array (divArray.length);
	if(divArray.length<2)
		return
	for (var i = 0; i<divArray.length; i++){
			idJogador = divArray[i].innerHTML;
			idJogadorA = idJogador.split("Player.aspx?PlayerID=");
			idJogadorA = idJogadorA[1].split("&amp;BrowseIds=");
			jogador[i] = idJogadorA[0];
	}
	var divArray = document.getElementsByClassName("faceCard");
	for (var i = 0; i<divArray.length; i++){
		divArray[i].style.background='none';
		divArray[i].style.background = getAvatar(jogador[i].substr(jogador[i].length-2));
	}	
}

if(document.getElementsByClassName("playerList")) {
	getJogadores();
}

//#########################################################################################
function getAvatar(id){
	switch(id)
	{
	case '00':
	  imagem = "http://img21.imageshack.us/img21/9315/41831556.jpg";
	  break;
	case '01':
	  imagem = "http://img220.imageshack.us/img220/6154/26178668.jpg";
	  break;
	case '02':
	  imagem = "http://img11.imageshack.us/img11/4851/66830328.jpg";
	  break;
	case '03':
	  imagem = "http://img21.imageshack.us/img21/4751/65845055.jpg";
	  break;
	case '04':
	  imagem = "http://img299.imageshack.us/img299/5806/26043277.jpg";
	  break;
	case '05':
	  imagem = "http://img21.imageshack.us/img21/2045/25119096.jpg";
	  break;
	case '06':
	  imagem = "http://img22.imageshack.us/img22/6669/85797058.jpg";
	  break;
	case '07':
	  imagem = "http://img299.imageshack.us/img299/8527/28349800.jpg";
	  break;
	case '08':
	  imagem = "http://img510.imageshack.us/img510/4871/52430656.jpg";
	  break;
	case '09':
	  imagem = "http://img440.imageshack.us/img440/7686/19495960.jpg";
	  break;
	case '10':
	  imagem = "http://img40.imageshack.us/img40/1645/16299172.jpg";
	  break;
	case '11':
	  imagem = "http://img521.imageshack.us/img521/8704/27166438.jpg";
	  break;
	case '12':
	  imagem = "http://img39.imageshack.us/img39/3605/60557636.jpg";
	  break;
	case '13':
	  imagem = "http://img21.imageshack.us/img21/6943/14628170.jpg";
	  break;
	case '14':
	  imagem = "http://img39.imageshack.us/img39/4210/31924926.jpg";
	  break;
	case '15':
	  imagem = "http://img40.imageshack.us/img40/7839/20938060.jpg";
	  break;
	case '16':
	  imagem = "http://img39.imageshack.us/img39/8483/89573793.jpg";
	  break;
	case '17':
	  imagem = "http://img268.imageshack.us/img268/3272/97762386.jpg";
	  break;
	case '18':
	  imagem = "http://img299.imageshack.us/img299/8201/65239454.jpg";
	  break;
	case '19':
	  imagem = "http://img268.imageshack.us/img268/8829/27454332.jpg";
	  break;
	case '20':
	  imagem = "http://img22.imageshack.us/img22/4845/86245882.jpg";
	  break;
	case '21':
	  imagem = "http://img510.imageshack.us/img510/4904/67830521.jpg";
	  break;
	case '22':
	  imagem = "http://img507.imageshack.us/img507/7188/69374605.jpg";
	  break;
	case '23':
	  imagem = "http://img40.imageshack.us/img40/7033/61464589.jpg";
	  break;
	case '24':
	  imagem = "http://img39.imageshack.us/img39/4117/39680210.jpg";
	  break;
	case '25':
	  imagem = "http://img507.imageshack.us/img507/7670/88204200.jpg";
	  break;
	case '26':
	  imagem = "http://img175.imageshack.us/img175/7289/24585976.jpg";
	  break;
	case '27':
	  imagem = "http://img291.imageshack.us/img291/5779/90450107.jpg";
	  break;
	case '28':
	  imagem = "http://img22.imageshack.us/img22/9480/32009242.jpg";
	  break;
	case '29':
	  imagem = "http://img34.imageshack.us/img34/536/96279144.jpg";
	  break;
	case '30':
	  imagem = "http://img268.imageshack.us/img268/8775/65594072.jpg";
	  break;
	case '31':
	  imagem = "http://img175.imageshack.us/img175/3522/87936789.jpg";
	  break;
	case '32':
	  imagem = "http://img15.imageshack.us/img15/1247/83497814.jpg";
	  break;
	case '33':
	  imagem = "http://img507.imageshack.us/img507/4930/47308025.jpg";
	  break;
	case '34':
	  imagem = "http://img291.imageshack.us/img291/1856/82505975.jpg";
	  break;
	case '35':
	  imagem = "http://img521.imageshack.us/img521/1010/86529664.jpg";
	  break;
	case '36':
	  imagem = "http://img34.imageshack.us/img34/5958/15976045.jpg";
	  break;
	case '37':
	  imagem = "http://img507.imageshack.us/img507/1715/64760562.jpg";
	  break;
	case '38':
	  imagem = "http://img291.imageshack.us/img291/6194/66168548.jpg";
	  break;
	case '39':
	  imagem = "http://img15.imageshack.us/img15/9282/13911943.jpg";
	  break;
	case '40':
	  imagem = "http://img175.imageshack.us/img175/9688/67924729.jpg";
	  break;
	case '41':
	  imagem = "http://img150.imageshack.us/img150/7271/55748023.jpg";
	  break;
	case '42':
	  imagem = "http://img291.imageshack.us/img291/823/40714639.jpg";
	  break;
	case '43':
	  imagem = "http://img15.imageshack.us/img15/357/90835547.jpg";
	  break;
	case '44':
	  imagem = "http://img295.imageshack.us/img295/7500/79408919.jpg";
	  break;
	case '45':
	  imagem = "http://img291.imageshack.us/img291/8048/56249932.jpg";
	  break;
	case '46':
	  imagem = "http://img291.imageshack.us/img291/3865/99085530.jpg";
	  break;
	case '47':
	  imagem = "http://img291.imageshack.us/img291/9234/94070622.jpg";
	  break;
	case '48':
	  imagem = "http://img521.imageshack.us/img521/6568/89852794.jpg";
	  break;
	case '49':
	  imagem = "http://img141.imageshack.us/img141/6373/26759515.jpg";
	  break;
	case '50':
	  imagem = "http://img15.imageshack.us/img15/8964/18329502.jpg";
	  break;
	case '51':
	  imagem = "http://img34.imageshack.us/img34/1706/67728799.jpg";
	  break;
	case '52':
	  imagem = "http://img521.imageshack.us/img521/3281/97657057.jpg";
	  break;
	case '53':
	  imagem = "http://img291.imageshack.us/img291/6569/61577279.jpg";
	  break;
	case '54':
	  imagem = "http://img523.imageshack.us/img523/3296/20053905.jpg";
	  break;
	case '55':
	  imagem = "http://img175.imageshack.us/img175/4686/72694321.jpg";
	  break;
	case '56':
	  imagem = "http://img150.imageshack.us/img150/9008/30881480.jpg";
	  break;
	case '57':
	  imagem = "http://img150.imageshack.us/img150/4945/79254115.jpg";
	  break;
	case '58':
	  imagem = "http://img295.imageshack.us/img295/7382/83741169.jpg";
	  break;
	case '59':
	  imagem = "http://img523.imageshack.us/img523/8400/63562319.jpg";
	  break;
	case '60':
	  imagem = "http://img141.imageshack.us/img141/9489/24488135.jpg";
	  break;
	case '61':
	  imagem = "http://img262.imageshack.us/img262/4732/39512728.jpg";
	  break;
	case '62':
	  imagem = "http://img41.imageshack.us/img41/3884/48384728.jpg";
	  break;
	case '63':
	  imagem = "http://img197.imageshack.us/img197/1884/30743874.jpg";
	  break;
	case '64':
	  imagem = "http://img190.imageshack.us/img190/2645/66929724.jpg";
	  break;
	case '65':
	  imagem = "http://img523.imageshack.us/img523/7093/13817603.jpg";
	  break;
	case '66':
	  imagem = "http://img523.imageshack.us/img523/5598/31435911.jpg";
	  break;
	case '67':
	  imagem = "http://img440.imageshack.us/img440/8308/32615686.jpg";
	  break;
	case '68':
	  imagem = "http://img262.imageshack.us/img262/2815/82528438.jpg";
	  break;
	case '69':
	  imagem = "http://img295.imageshack.us/img295/562/29314046.jpg";
	  break;
	case '70':
	  imagem = "http://img175.imageshack.us/img175/7276/71384292.jpg";
	  break;
	case '71':
	  imagem = "http://img41.imageshack.us/img41/5342/22669648.jpg";
	  break;
	case '72':
	  imagem = "http://img41.imageshack.us/img41/3608/13472586.jpg";
	  break;
	case '73':
	  imagem = "http://img262.imageshack.us/img262/7240/35881685.jpg";
	  break;
	case '74':
	  imagem = "http://img295.imageshack.us/img295/3084/13567987.jpg";
	  break;
	case '75':
	  imagem = "http://img295.imageshack.us/img295/7351/48947867.jpg";
	  break;
	case '76':
	  imagem = "http://img294.imageshack.us/img294/9134/32766419.jpg";
	  break;
	case '77':
	  imagem = "http://img299.imageshack.us/img299/738/35657136.jpg";
	  break;
	case '78':
	  imagem = "http://img175.imageshack.us/img175/6576/60198659.jpg";
	  break;
	case '79':
	  imagem = "http://img175.imageshack.us/img175/5372/68970169.jpg";
	  break;
	case '80':
	  imagem = "http://img294.imageshack.us/img294/8667/81016822.jpg";
	  break;
	case '81':
	  imagem = "http://img41.imageshack.us/img41/6510/72174349.jpg";
	  break;
	case '82':
	  imagem = "http://img295.imageshack.us/img295/6103/38619551.jpg";
	  break;
	case '83':
	  imagem = "http://img197.imageshack.us/img197/6588/27934168.jpg";
	  break;
	case '84':
	  imagem = "http://img39.imageshack.us/img39/2122/21004366.jpg";
	  break;
	case '85':
	  imagem = "http://img41.imageshack.us/img41/8799/26162835.jpg";
	  break;
	case '86':
	  imagem = "http://img39.imageshack.us/img39/6038/86721784.jpg";
	  break;
	case '87':
	  imagem = "http://img521.imageshack.us/img521/460/23017127.jpg";
	  break;
	case '88':
	  imagem = "http://img34.imageshack.us/img34/5726/86199708.jpg";
	  break;
	case '89':
	  imagem = "http://img41.imageshack.us/img41/1438/40561747.jpg";
	  break;
	case '90':
	  imagem = "http://img39.imageshack.us/img39/9724/70403231.jpg";
	  break;
	case '91':
	  imagem = "http://img34.imageshack.us/img34/1286/49111921.jpg";
	  break;
	case '92':
	  imagem = "http://img188.imageshack.us/img188/7988/73956154.jpg";
	  break;
	case '93':
	  imagem = "http://img521.imageshack.us/img521/4711/18419248.jpg";
	  break;
	case '94':
	  imagem = "http://img188.imageshack.us/img188/1742/86590729.jpg";
	  break;
	case '95':
	  imagem = "http://img269.imageshack.us/img269/3876/46626144.jpg";
	  break;
	case '96':
	  imagem = "http://img269.imageshack.us/img269/2964/91474092.jpg";
	  break;
	case '97':
	  imagem = "http://img188.imageshack.us/img188/1682/16811159.jpg";
	  break;
	case '98':
	  imagem = "http://img34.imageshack.us/img34/4641/72825672.jpg";
	  break;
	case '99':
	  imagem = "http://img521.imageshack.us/img521/6237/10592184.jpg";
	  break;
	default:
	  imagem = "http://farm3.static.flickr.com/2620/3698769476_2e70a70a53_t.jpg";
	}
	return 'url('+imagem+') no-repeat center #DCE2DC';
}
// Java Document