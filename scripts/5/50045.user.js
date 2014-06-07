// ==UserScript==
// @name           TC
// @namespace      http://userscripts.org/scripts/show/36651
// @description    Um simples addon de utilitarios para o jogo The Crims
// @include        *.thecrims.com/*
// ==/UserScript==

//<![CDATA[

/*
 * Remover todos os nos filhos de um no pai
 * @param DOMNodeElement fatherNode - O No pai
 * @return void
 */
document.removeAllElementsFromFather = function(fatherNode) {
  if (fatherNode.childNodes.length > 0) {
    for (i = fatherNode.childNodes.length-1; i > 0; i--) {
      fatherNode.removeChild(fatherNode.childNodes[i]);
    }
  }
};

/*
 * Obter todos os elementos de tag LI
 * Retorna uma colecao de objetos HTMLLIListElement
 */
document.list = ((document.getElementsByTagName('li')) ? document.getElementsByTagName('li') : undefined);

/*
 * Adicionar novos estilos no documento
 * @param string string - Regras CSS
 * @return void
 */
document.addCSS = function(string) {
  var newCSS = document.createElement('style');
  newCSS.type = 'text/css';
  newCSS.innerHTML = string;
  document.getElementsByTagName('head')[0].appendChild(newCSS);
};
  
//Remover a propaganda no canto superior direito da pagina localizada em seu header
document.removeAllElementsFromFather(document.getElementById('header'));

/*
 * Objeto TheCrims
 * Utilizado para controlar todas as informacoes do jogo em si
 */
theCrims = function() {
  //Localizacao atual
  this.page = document.location.pathname.toLowerCase().substring(1);

  //Informacoes
  this.username = '';
  this.res = 0;
  this.inte = 0;
  this.str = 0;
  this.chr = 0;
  this.tol = 0;
  this.money = 0;
  this.armor = 0;
  this.armPower = 0;
  this.armorName = '';

  //Poder solo em cada dificuldade
  this.safeSoloPower = 0;
  this.normalSoloPower = 0;
  this.riskySoloPower = 0;
  this.dangerSoloPower = 0;

  /*
   * Metodo para checar se o jogador esta logado no site
   * @param void
   * @return bool - Verdadeiro se estiver ou Falso caso nao esteja
   */
  this.isLogged = function() {
    var link = document.links;
    var found = true;
    for (i = 0; i < link.length; i++) {
      if (link[i].href.match(/lostpassword.php/)) { found = false; }
    }
    return found;
  };

  /*
   * Metodo para obter informacoes do jogador
   * @param void
   * @return void
   */
  this.getInformation = function() {
    var stats = new Array();
    var obj = document.getElementsByTagName('span');
    var x = 0;
    for (i = 0; i < obj.length; i++) {
      if (obj[i].className == 'menuyellowtext') { 
        stats[x] = obj[i].innerHTML; 
        x++;
      }
    }
	var armorName = document.list[15].lastChild.nodeValue;
	switch (armorName.toLowerCase()) {
	  case 'fraldinha':{
		this.armor = 1;
		break;
	  }	
	  case 'jaqueta de couro':{
		this.armor = 2;
		break;
	  }
	  case 'colete brilhante metálico':{
		this.armor = 3;
		break;
	  }
	  case 'colete corporal':{
		this.armor = 4;
		break;
      }
	  case 'jaqueta nano de fibra':{
		this.armor = 5;
		break;
	  }
	  case 'colete nomex de aço':{
		this.armor = 6;
		break;
	  }
	  default:this.armor = 0;
	}
	this.armorName = armorName;
    this.username = stats[0];
    this.res = parseInt(stats[2]);
    this.inte = parseInt(stats[3]);
    this.str = parseInt(stats[5]);
    this.chr = parseInt(stats[4]);
    this.tol = parseInt(stats[6]);
    this.money = parseInt(stats[7].substring(1).replace(/,/g, ''));
    
    if (this.page == 'armsdealer.php') {
      var table = document.getElementsByTagName('table');
      for (z = 0; z < table.length; z++) {
        if (table[z].className == 'black_table') {
          var tr = table[z].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
          var td = tr[tr.length-1].childNodes;
          var val = td[5].innerHTML;
          GM_setValue("playerPower",val);
          this.armPower = val;
          break;
        }
      }
    }
    else { this.armPower = GM_getValue("playerPower"); }
  };
  
  /*
   * Metodo para exibir um alerta com as informacoes do jogador
   * @param void
   * @return void
   */
  this.alertInfo = function() {
    alert("Username: "+tc.username+"\n"+
          "Respect: "+tc.res+"\n"+
          "Intelligence: "+tc.inte+"\n"+
          "Strength: "+tc.str+"\n"+
          "Charisma: "+tc.chr+"\n"+
          "Tolerance: "+tc.tol+"\n"+
          "Money: "+tc.money+"\n"+
          "Armor: "+tc.armorName+"\n"
		  );
  };

  /*
   * Metodo para calcular o suborno necessario para sair da prisao
   * Formula: Round ( respeito * 505 )
   * @param void
   * @return int - O resultado do calculo
   */
  this.calcBribe = function() { return Math.round(this.res * 0.5055) * 1000; };

  /*
   * Metodo para calcular a quantidade de predios que o jogador pode possuir
   * Formula: round ( ( (2 * Inteligencia + Resistencia - 1) + 1)? / 2)
   * @param void
   * @return int - O resultado do calculo
   */
  this.calcMaxBuilding = function() { return Math.floor((Math.sqrt(2 * (this.inte + this.tol) - 1) + 1) / 2); };

  /*
   * Metodo para calcular o poder do jogador baseado em suas informacoes
   * IMPORTANTE: E NECESSARIO O JOGADOR ACESSAR A PAGINA DE ARMAS PARA ATUALIZAR O SEU DANO MINIMO
   * Formula do poder do jogador: (intelligence + strength + tolerance/2)/3 
   * Formula do poder da arma: (weapon damage * accuracy/10) +- some random parts + armor
   *
   * Niveis de poder
   * - seguro : 85%
   * - Normal : 90%
   * - Arriscado : 100%
   * - Perigoso : 102%
   *
   * @param int newWeaponDamage - Dano minimo da arma
   * @param int newArmor - Resistencia da armadura
   * @return void
   */
  this.calculatePower = function(newWeaponDamage, newArmor) {
    var armorTolerance = new Array(0, 8, 32, 120, 400, 1200, 2000);
    var weaponDamage;
    var armor;

    if (newWeaponDamage) { weaponDamage = newWeaponDamage; }
    else { weaponDamage = this.weaponDamage; }
  
    if (newArmor) { armor = newArmor; }
    else { armor = this.armorNumber; }
  
    var playerPower = ((this.inte + this.str + this.tol / 2) / 3);
    var weaponPower = ((10 * weaponDamage) / 10 + armorTolerance[armor]);  
   		
    this.safeSoloPower = Math.round((playerPower + weaponPower) * 0.85 );
    this.normalSoloPower = Math.round((playerPower + weaponPower) * 0.9 );
    this.riskySoloPower = Math.round((playerPower + weaponPower) * 1 );
    this.dangerSoloPower = Math.round((playerPower + weaponPower) * 1.02);
  };
  
  /*
   * Metodo para indicar o que voce pode roubar (SOLO) baseado em seu poder
   * @param int yourPower - O seu poder
   * @return string - O nome do estabelecimento
   */
  this.calcWhatRobb = function(yourPower) {
  	var key = 0;
  	var difficulty = new Array(
	                           3,10,15,25,40,45,55,65,
	                           70,100,170,250,300,370,480,570,
							   640,770,880,980,1150,1430,2700,3200
							  );
	var places = new Array(
	                       'Loja de 1,99','Velhinha na rua','R&aacute;dio de carro','T&aacute;xi','Jogo de cartas',
	                       'Roubar uma casa','Posto de gasolina','Cinema','Tabacaria','Carrefour',
						   'Sequestro','Joalheria','Dep&oacute;sito de seguran&ccedil;a','Banco pequeno',
						   'Chefe local da m&aacute;fia','Concession&aacute;ria','Paypal','Bandidos locais',
						   'Traficante local','Cassino','Boate','Casas bahia','Museu nacional',
						   'Russo' 
	                      );
	
	for (i = 0; i < difficulty.length; i++) {
	  if (yourPower >= difficulty[i]) { key = i; }	
	}
	return places[key];					  
  };
  
  /*
   * Metodo para indicar o que voce pode roubar (GANGUE) baseado em seu poder
   * @param int yourPower - O seu poder
   * @return string - O nome do estabelecimento
   */
  this.calcWhatGG = function(yourPower) {
    var key = 0;
    var difficulty = new Array(70,160,300,900,2000,2500,4500,8000,15000);
    
    var places = new Array(
                           'Supermercado','Banco','Carro-forte','Reserva federal',
                           'Banco central','Estoque no mercado','Al Capone','Pal&aacute;cio de fuckingham',
                           'Fort knox'
                          );
                          
	for (i = 0; i < difficulty.length; i++) {
	  if (yourPower >= difficulty[i]) { key = i; }
	}
	return places[key];
  };

  /*
   * Metodo para exibir informacoes detalhadas de todos os estabelecimentos
   * que voce pode roubar tanto SOLO quanto GANGUE
   * @param automatic
   * @return void
   */
  this.getAllRobbInfo = function(ev) {
    var difficulty = new Array(
	                           3,10,15,25,40,45,55,65,
	                           70,100,170,250,300,370,480,570,
							   640,770,880,980,1150,1430,2700,3200
							  );
							  
	var places = new Array(
	                       'Loja de 1,99','Velhinha na rua','R&aacute;dio de carro','T&aacute;xi','Jogo de cartas',
	                       'Roubar uma casa','Posto de gasolina','Cinema','Tabacaria','Carrefour',
						   'Sequestro','Joalheria','Dep&oacute;sito de seguran&ccedil;a','Banco pequeno',
						   'Chefe local da m&aacute;fia','Concession&aacute;ria','Paypal','Bandidos locais',
						   'Traficante local','Cassino','Boate','Casas bahia','Museu nacional',
						   'Russo'
	                      );
	                      
    var stamina = new Array(5,10,10,10,10,12,14,15,16,18,20,25,27,30,35,40,45,50,60,65,70,75,80,80);
							  
    var robbImages = new Array('<img src="http://img238.imageshack.us/img238/7551/yesut3.gif">','<img src="http://img238.imageshack.us/img238/5720/nopu3.gif">');
    if (!document.getElementById('robbInfoBlock')) {
      var block = document.createElement('div');
      block.id = 'robbInfoBlock';
    
      var infoOutput = '<table id="robbTable">'+
                       '<tr>'+
                       '  <td rowspan="4"><img height="40" width="80" alt="" src="http://img90.imageshack.us/img90/2393/singlerobbxi9.gif"/></td>'+
                       '  <td rowspan="4">Dificuldade</td>'+
                       '  <td rowspan="4">Estamina</td>'+
                       '  <td colspan="4"><strong>Crimes solo</strong></td>'+
                       '</tr>'+
                       '<tr>'+
                       '  <td>Seguro</td>'+
                       '  <td>Normal</td>'+
                       '  <td>Arriscado</td>'+
                       '  <td>Perigoso</td>'+
                       '</tr>'+
                       '<tr>'+
                       '  <td>85%</td>'+
                       '  <td>90%</td>'+
                       '  <td>100%</td>'+
                       '  <td>102%</td>'+
                       '</tr>'+
                       '<tr>'+
                       '  <td>'+sp+'</td>'+
                       '  <td>'+np+'</td>'+
                       '  <td>'+rp+'</td>'+
                       '  <td>'+dp+'</td>'+
                       '</tr>';
                       for (i = 0; i < places.length; i++) {
                         infoOutput += '<tr>'+
                                       '  <td>'+places[i]+'</td>'+
                                       '  <td>'+difficulty[i]+'</td>'+
                                       '  <td>'+stamina[i]+'%</td>'+
                                       '  <td>'+(sp >= difficulty[i] ? robbImages[0] : robbImages[1])+'</td>'+
                                       '  <td>'+(np >= difficulty[i] ? robbImages[0] : robbImages[1])+'</td>'+
                                       '  <td>'+(rp >= difficulty[i] ? robbImages[0] : robbImages[1])+'</td>'+
                                       '  <td>'+(dp >= difficulty[i] ? robbImages[0] : robbImages[1])+'</td>'+
                                       '</tr>';
                       }
                       infoOutput += '</table>';
                       
      block.innerHTML = infoOutput;
      document.body.appendChild(block);
    }
    else { document.body.removeChild(document.getElementById('robbInfoBlock')); }
  };
   
  /*
   * Metodo para adicionar um bloco na pagina com as informacoes capturadas
   * @param void
   * @return void
   */
  this.output = function() {
    var block = document.createElement('div');
    block.id = 'outputBlock';

    var header = document.createElement('div');
    header.id = 'headerBlock';
    header.innerHTML = 'Informa&ccedil;&otilde;es sobre '+this.username;
   
    var conteiner = document.createElement('div');
    conteiner.id = 'conteinerBlock';

    block.appendChild(header);
    block.appendChild(conteiner);

    conteiner.innerHTML = '- Qtd m&aacute;xima de pr&eacute;dios: <span class="menuyellowtext">'+this.calcMaxBuilding()+'</span><br />'+
                          '- Pre&ccedil;o de suborno: <span class="menuyellowtext">$'+this.calcBribe()+'</span><br />'+
						  '<div class="robbBlock">'+
                          '  - Seu poder e Roubo solo<br/>'+
						  '  &nbsp;&nbsp;&nbsp;(Seguro): '+
						  '  <span class="menuyellowtext">'+this.safeSoloPower+'</span> [<span class="robbPlaces">'+this.calcWhatRobb(this.safeSoloPower)+'</span>]<br />'+
						  '  &nbsp;&nbsp;&nbsp;(Normal): '+
						  '  <span class="menuyellowtext">'+this.normalSoloPower+'</span> [<span class="robbPlaces">'+this.calcWhatRobb(this.normalSoloPower)+'</span>]<br />'+
						  '  &nbsp;&nbsp;&nbsp;(Arriscado): '+
						  '  <span class="menuyellowtext">'+this.riskySoloPower+'</span> [<span class="robbPlaces">'+this.calcWhatRobb(this.riskySoloPower)+'</span>]<br />'+
						  '  &nbsp;&nbsp;&nbsp;(Perigoso): '+
						  '  <span class="menuyellowtext">'+this.dangerSoloPower+'</span> [<span class="robbPlaces">'+this.calcWhatRobb(this.dangerSoloPower)+'</span>]<br /><br />'+
                          '</div>'+
						  '<div class="robbBlock">'+
                          '  - Roubo gangue<br/>'+
						  '  &nbsp;&nbsp;&nbsp;(Seguro): '+
						  '  [<span class="robbPlaces">'+this.calcWhatGG(this.safeSoloPower)+'</span>]<br />'+
						  '  &nbsp;&nbsp;&nbsp;(Normal): '+
						  '  [<span class="robbPlaces">'+this.calcWhatGG(this.normalSoloPower)+'</span>]<br />'+
						  '  &nbsp;&nbsp;&nbsp;(Arriscado): '+
						  '  [<span class="robbPlaces">'+this.calcWhatGG(this.riskySoloPower)+'</span>]<br />'+
						  '  &nbsp;&nbsp;&nbsp;(Perigoso): '+
						  '  [<span class="robbPlaces">'+this.calcWhatGG(this.dangerSoloPower)+'</span>]<br /><br />'+
                          '</div>'+
                          '<div id="robbButton" style="clear: both; margin-left: 10px;"><span style="cursor: pointer; border: 1px solid #383838; background-color: #000; color: #fff; padding: 1px;">+ Detalhes</span></div>'+
                          '<div class="robbMessage">Para atualizar o seu poder, acesse a p&aacute;gina <span style="color: #fff">Negociante de armas</span></div>';
 
    document.getElementById('header').appendChild(block);

  };

  /* Inicializacao */
  if (this.isLogged()) {
    this.getInformation();
    this.calculatePower(this.armPower,this.armor);
    this.output();
    
    var sp = this.safeSoloPower;
    var np = this.normalSoloPower;
    var rp = this.riskySoloPower;
    var dp = this.dangerSoloPower;
    document.getElementById('robbButton').addEventListener('click',this.getAllRobbInfo,true);
  }
  return this;
};

//Aplicando novos estilos
document.addCSS('div#outputBlock {'+ 
                'background: #464646;'+ 
                'border-style: none solid solid;'+  
                'border-width: medium 1px 1px;'+  
                'border-color: #666;'+  
                'position: relative;'+
                'left: 374px;'+
                'width: 440px;'+
                'height: 150px;'+
                'top: 1px;'+ 
                '}');

document.addCSS('div#outputBlock #headerBlock {'+
                'background: #000;'+ 
                'border: 1px solid #666;'+ 
                'width: 420px;'+
                'padding: 2px;'+ 
                'margin: 0 auto;'+ 
                'color: #fff;'+ 
                '}');

document.addCSS('div#outputBlock #conteinerBlock {'+
                'background: #6c6c6c;'+
                'border: 1px solid #383838;'+
                'width: 420px;'+
                'height: 120px;'+
                'padding: 2px;'+
                'margin: 0 auto;'+
                '}');
				
document.addCSS('div#outputBlock .robbBlock {'+
                'float: left;'+
                '}');
                
document.addCSS('.robbPlaces {'+
                'color: #FFCC66;'+
		'font: 10px verdana,arial,sans-serif'+
		'}');

document.addCSS('div#outputBlock .robbMessage {'+
                'clear: both;'+
                'margin-left: 2px;'+
                'font: bold 9px verdana;'+
                'color: #e80000;'+
                '}');

document.addCSS('#robbInfoBlock {'+
                'left: 378px;'+
                'position: absolute;'+
                'top: 155px;'+
                '}');
                
document.addCSS('#robbTable {'+
                'color: white;'+
                'font: 11px Tahoma,Arial,Helvetica,sans-serif;'+
                'background-color: #2B2B2B;'+
                'border: 1px solid #6F6F6F;'+
                'text-align: center;'+
                'width: 450px;'+
                '}');
                
document.addCSS('#robbTable td {'+
                'border-bottom: 1px solid #404040;'+
                'padding: 1px 4px;'+
                'text-align: center;'+
                '}');
				
var tc = new theCrims();
//]]>