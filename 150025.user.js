// ==UserScript==
// @name        PORTAL_MSERIES
// @namespace   Portal_Conecta
// @include     http://aes.mbiz10.net/PORTAL/*
// @version     1.1
// ==/UserScript==
(function() {
    
        
        
var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://web.archive.org/web/20110726112327/http://www.tested.com/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
var x=document.getElementById("_ctl1_ThreePanes_ThreePanes__ctl1_sdg_uwl__ctl0__hrc_2").selectedIndex;
//alert(document.getElementsByTagName("option")[x+4].value);
var option = document.getElementsByTagName('option');
  
    
var nobrs = document.getElementsByTagName("NOBR");
    
    
	
/* TODAS AS EQUIPAS */
for (var k = 0; k < option.length; k++) 
{
	if(document.getElementsByTagName("option")[k].value == 7884 //LEONAM PAULO MATHIAS DA SILVA
	|| document.getElementsByTagName("option")[k].value == 6143 //FABIO FERNANDES
	|| document.getElementsByTagName("option")[k].value == 9807 //RODRIGO ANTONIO BATAER
	|| document.getElementsByTagName("option")[k].value == 6117 //AMINADAB ANDRADE BARBOSA
	|| document.getElementsByTagName("option")[k].value == 9783 //PAULO SERGIO FERREIRA DA SILVA
	|| document.getElementsByTagName("option")[k].value == 7898 //ADERLANDE OLIVEIRA
	|| document.getElementsByTagName("option")[k].value == 7758 //ANDERSON DE PAULA
	|| document.getElementsByTagName("option")[k].value == 7883 //JULIANO FERREIRA LIMA
    || document.getElementsByTagName("option")[k].value == 7750 //RENATO GOMES MARTINS COSSHIC
    || document.getElementsByTagName("option")[k].value == 7770 //FELIPE APOLINARIO
    || document.getElementsByTagName("option")[k].value == 5959 //THIAGO AGUIAR
    || document.getElementsByTagName("option")[k].value == 6113 //ALESSANDRO OLIVEIRA DA SILVA
    || document.getElementsByTagName("option")[k].value == 6150 //GLAUBER DOS SANTOS
	|| document.getElementsByTagName("option")[k].value == 7873 //DAVI LIMA DA SILVA
	|| document.getElementsByTagName("option")[k].value == 7808 //FABIO DANTAS DE SANTANA LIMA
    || document.getElementsByTagName("option")[k].value == 7832 //WOHAN EDUARDO BARAO
    || document.getElementsByTagName("option")[k].value == 6107 //ADENILSON BARBOZA
    || document.getElementsByTagName("option")[k].value == 6255 //PEDRO GERALDO BRITO
    || document.getElementsByTagName("option")[k].value == 7829 //WILLIAM QUIRINO
    || document.getElementsByTagName("option")[k].value == 9791 //ANDERSON SANTANA DA SILVA
    || document.getElementsByTagName("option")[k].value == 6135 //EDER RODRIGUES
	|| document.getElementsByTagName("option")[k].value == 7803 //CARLOS ADRIANO OLIVEIRA
	|| document.getElementsByTagName("option")[k].value == 6167 //JOSE RODRIGUES VITALINO
	|| document.getElementsByTagName("option")[k].value == 7891 //SANDRO SOARES
	|| document.getElementsByTagName("option")[k].value == 7824 //SYDNEI FERREIRA
	|| document.getElementsByTagName("option")[k].value == 6158 //JEAN MARCELO DE BRITO
    || document.getElementsByTagName("option")[k].value == 6156 //JAIRO RODRIGUES
	|| document.getElementsByTagName("option")[k].value == 7906 //SILVESTRE RODRIGUES FILHO
    || document.getElementsByTagName("option")[k].value == 9808 // ROGERIO DA SILVA RIBEIRO
    || document.getElementsByTagName("option")[k].value == 6265 //SEBASTIÃO MARCIANO
    || document.getElementsByTagName("option")[k].value == 6112 //AGUIL FERREIRA DA SILVA
	|| document.getElementsByTagName("option")[k].value == 6256 //RAFAEL ARAUJO DUARTE
	|| document.getElementsByTagName("option")[k].value == 7754 //ALEXANDRE DA SILVA SANTOS
	|| document.getElementsByTagName("option")[k].value == 7872 //CLAUDIO FERNANDO VAZ GOSSONATO
	|| document.getElementsByTagName("option")[k].value == 9781 //IVANILDO LACERDA
	|| document.getElementsByTagName("option")[k].value == 7795 //WANDERSON FERNANDES DE SOUZA
	|| document.getElementsByTagName("option")[k].value == 7809 //EWERTON SILVA BUENO
	|| document.getElementsByTagName("option")[k].value == 6266 //SOLONIO OLIVEIRA SANTOS
	|| document.getElementsByTagName("option")[k].value == 7782 //MICHAEL DA SILVA SANTOS
    || document.getElementsByTagName("option")[k].value == 7821 //RENE OLIVEIRA DE SOUZA
    || document.getElementsByTagName("option")[k].value == 9809 //SILVIO JOSE DIAS
    || document.getElementsByTagName("option")[k].value == 7794 //WAGNER ALEXANDRE DA SILVA
    || document.getElementsByTagName("option")[k].value == 7752 //ALEX CORDEIRO PEREIRA
    || document.getElementsByTagName("option")[k].value == 7800 //LUIZ CARLOS ROCHA
    || document.getElementsByTagName("option")[k].value == 6127 //CARLOS ELIAS DE SOUZA
    || document.getElementsByTagName("option")[k].value == 7882 //gilmar de oliveira
    || document.getElementsByTagName("option")[k].value == 7787 //osvaldo rondine
	)
	{
		
		document.getElementsByTagName("option")[k].style.backgroundColor = '#000';
        document.getElementsByTagName("option")[k].style.color = '#fff';
         
	}
    else
    {
		document.getElementsByTagName("option")[k].style.backgroundColor = '#ccc';
        
    }
}
	
	
}());
