// ==UserScript==
// @name           Smiley Text Generator
// @author         GuyintheMiddle-Orkutwares
// @description    Generate  scraps with smileys
// UserScript
function muda_letra(obj){
	letra1.src=obj; letra2.src=obj; letra3.src=obj; letra4.src=obj; letra5.src=obj; letra6.src=obj; letra7.src=obj; letra8.src=obj; letra9.src=obj; letra10.src=obj; letra11.src=obj; letra12.src=obj; letra13.src=obj; letra14.src=obj; letra15.src=obj; letra16.src=obj; letra17.src=obj; letra18.src=obj; letra19.src=obj; letra20.src=obj; letra21.src=obj; letra22.src=obj; letra23.src=obj; letra24.src=obj; letra25.src=obj; letra26.src=obj; letra27.src=obj; letra28.src=obj; letra29.src=obj; letra30.src=obj; letra31.src=obj; letra32.src=obj; letra33.src=obj; letra34.src=obj; letra35.src=obj; letra36.src=obj; letra37.src=obj; letra38.src=obj; letra39.src=obj; letra40.src=obj; letra41.src=obj; letra42.src=obj; letra43.src=obj; letra44.src=obj; letra45.src=obj; letra46.src=obj; letra47.src=obj; letra48.src=obj; letra49.src=obj; letra50.src=obj; 

}
	
function muda_fundo(obj){
		fundo1.src=obj; fundo2.src=obj; fundo3.src=obj; fundo4.src=obj; fundo5.src=obj; fundo6.src=obj; fundo7.src=obj; fundo8.src=obj; fundo9.src=obj; fundo10.src=obj; fundo11.src=obj; fundo12.src=obj; fundo13.src=obj; fundo14.src=obj; fundo15.src=obj; fundo16.src=obj; fundo17.src=obj; fundo18.src=obj; fundo19.src=obj; fundo20.src=obj; fundo21.src=obj; fundo22.src=obj; fundo23.src=obj; fundo24.src=obj; fundo25.src=obj; fundo26.src=obj; fundo27.src=obj; fundo28.src=obj; fundo29.src=obj; fundo30.src=obj; fundo31.src=obj; fundo32.src=obj; fundo33.src=obj; fundo34.src=obj; fundo35.src=obj; fundo36.src=obj; fundo37.src=obj; fundo38.src=obj; fundo39.src=obj; fundo40.src=obj; fundo41.src=obj; fundo42.src=obj; fundo43.src=obj; fundo44.src=obj; fundo45.src=obj; fundo46.src=obj; fundo47.src=obj; fundo48.src=obj; fundo49.src=obj; fundo50.src=obj; fundo51.src=obj; fundo52.src=obj; fundo53.src=obj; fundo54.src=obj; fundo55.src=obj; fundo56.src=obj; fundo57.src=obj; fundo58.src=obj; fundo59.src=obj; fundo60.src=obj; fundo61.src=obj; fundo62.src=obj; fundo63.src=obj; fundo64.src=obj; fundo65.src=obj; fundo66.src=obj; fundo67.src=obj; fundo68.src=obj; fundo69.src=obj; fundo70.src=obj; fundo71.src=obj; fundo72.src=obj; fundo73.src=obj; fundo74.src=obj; fundo75.src=obj; fundo76.src=obj; fundo77.src=obj; fundo78.src=obj; fundo79.src=obj; fundo80.src=obj; fundo81.src=obj; fundo82.src=obj; fundo83.src=obj; fundo84.src=obj; fundo85.src=obj; 
	}
	
	
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

//voor= letra  achter= fundo
    window.open=false
    var lt="[:)]";
    var lg="[:(]";
    var word;
    var letter1;
    var letter2;
    var letter3;
    var letter4;
    var letter5;
    var letter6;
    var letter7;
    var letter8;
    
    function reken()
    {
      if (document.letters.cxa_letra.value==document.letters.cxa_fundo.value){
        window.alert('Select different smileys for Text and Background');
      } else{
        var l1r2= "";
        var l1r3= "";
        var l1r4= "";
        var l1r5= "";
        
        var l2r2= "";
        var l2r3= "";
        var l2r4= "";
        var l2r5= "";
        
        var l3r2= "";
        var l3r3= "";
        var l3r4= "";
        var l3r5= "";
        
        var l4r2= "";
        var l4r3= "";
        var l4r4= "";
        var l4r5= "";
        
        var l5r2= "";
        var l5r3= "";
        var l5r4= "";
        var l5r5= "";
        
        var l6r2= "";
        var l6r3= "";
        var l6r4= "";
        var l6r5= "";
        
        var l7r2= "";
        var l7r3= "";
        var l7r4= "";
        var l7r5= "";
        
        var l8r2= "";
        var l8r3= "";
        var l8r4= "";
        var l8r5= "";        
        
        
		lt=document.letters.cxa_letra.value;
		lg=document.letters.cxa_fundo.value;
	    wooord=document.letters.woord.value.toLowerCase();
        letter1=wooord.charAt(0);
        letter2=wooord.charAt(1);
        letter3=wooord.charAt(2);
        letter4=wooord.charAt(3);
        letter5=wooord.charAt(4);
        letter6=wooord.charAt(5);
        letter7=wooord.charAt(6);
        letter8=wooord.charAt(7);
document.letters.icons.value='';
        switch (letter1)
{
  case "a":
            document.letters.icons.value+=lg+lg+lt+lg+lg;
l1r2=lg+lt+lg+lt+lg;
l1r3=lt+lt+lt+lt+lt;
l1r4=lt+lg+lg+lg+lt;
l1r5=lt+lg+lg+lg+lt;
    break;
  case "b":
            document.letters.icons.value+=lt+lt+lt+lg;
l1r2=lt+lg+lg+lt;
l1r3=lt+lt+lt+lg;
l1r4=lt+lg+lg+lt;
l1r5=lt+lt+lt+lg;
    break;
  case "c":
            document.letters.icons.value+=lg+lt+lt+lg;
l1r2=lt+lg+lg+lt;
l1r3=lt+lg+lg+lg;
l1r4=lt+lg+lg+lt;
l1r5=lg+lt+lt+lg;
    break;
  case "d":
            document.letters.icons.value+=lt+lt+lt+lg;
l1r2=lt+lg+lg+lt;
l1r3=lt+lg+lg+lt;
l1r4=lt+lg+lg+lt;
l1r5=lt+lt+lt+lg;
    break;
  case "e":
            document.letters.icons.value+=lt+lt+lt+lt;
l1r2=lt+lg+lg+lg;
l1r3=lt+lt+lt+lg;
l1r4=lt+lg+lg+lg;
l1r5=lt+lt+lt+lt;
    break;
  case "f":
            document.letters.icons.value+=lt+lt+lt+lt;
l1r2=lt+lg+lg+lg;
l1r3=lt+lt+lt+lg;
l1r4=lt+lg+lg+lg;
l1r5=lt+lg+lg+lg;
    break;
  case "g":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
l1r2=lt+lg+lg+lg+lg;
l1r3=lt+lg+lg+lt+lt;
l1r4=lt+lg+lg+lg+lt;
l1r5=lg+lt+lt+lt+lg;
    break;
  case "h":
            document.letters.icons.value+=lt+lg+lg+lt;
l1r2=lt+lg+lg+lt;
l1r3=lt+lt+lt+lt;
l1r4=lt+lg+lg+lt;
l1r5=lt+lg+lg+lt;
    break;
  case "i":
            document.letters.icons.value+=lt+lt+lt;
l1r2=lg+lt+lg;
l1r3=lg+lt+lg;
l1r4=lg+lt+lg;
l1r5=lt+lt+lt;
    break;
  case "j":
            document.letters.icons.value+=lg+lg+lt+lt+lt;
l1r2=lg+lg+lg+lt+lg;
l1r3=lg+lg+lg+lt+lg;
l1r4=lt+lg+lg+lt+lg;
l1r5=lg+lt+lt+lg+lg;
    break;
  case "k":
            document.letters.icons.value+=lt+lg+lg+lt;
l1r2=lt+lg+lt+lg;
l1r3=lt+lt+lg+lg;
l1r4=lt+lg+lt+lg;
l1r5=lt+lg+lg+lt;
    break;
  case "l":
            document.letters.icons.value+=lt+lg+lg+lg;
l1r2=lt+lg+lg+lg;
l1r3=lt+lg+lg+lg;
l1r4=lt+lg+lg+lg;
l1r5=lt+lt+lt+lt;
    break;
  case "m":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
l1r2=lt+lt+lg+lt+lt;
l1r3=lt+lg+lt+lg+lt;
l1r4=lt+lg+lg+lg+lt;
l1r5=lt+lg+lg+lg+lt;
    break;
  case "n":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
l1r2=lt+lt+lg+lg+lt;
l1r3=lt+lg+lt+lg+lt;


l1r4=lt+lg+lg+lt+lt;
l1r5=lt+lg+lg+lg+lt;
    break;
  case "o":
            document.letters.icons.value+=lg+lt+lt+lg;
l1r2=lt+lg+lg+lt;
l1r3=lt+lg+lg+lt;
l1r4=lt+lg+lg+lt;
l1r5=lg+lt+lt+lg;
    break;
  case "p":
            document.letters.icons.value+=lt+lt+lt+lg;
l1r2=lt+lg+lg+lt;
l1r3=lt+lt+lt+lg;
l1r4=lt+lg+lg+lg;
l1r5=lt+lg+lg+lg;
    break;
  case "q":
            document.letters.icons.value+=lg+lt+lt+lg;
l1r2=lt+lg+lg+lt;
l1r3=lt+lg+lg+lt;
l1r4=lt+lg+lt+lt;
l1r5=lg+lt+lt+lt;
    break;
  case "r":
            document.letters.icons.value+=lt+lt+lt+lg;
l1r2=lt+lg+lg+lt;
l1r3=lt+lt+lt+lg;
l1r4=lt+lg+lg+lt;
l1r5=lt+lg+lg+lt;
    break;
  case "s":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
l1r2=lt+lg+lg+lg+lg;
l1r3=lg+lt+lt+lt+lg;
l1r4=lg+lg+lg+lg+lt;
l1r5=lg+lt+lt+lt+lg;
    break;
  case "t":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
l1r2=lg+lg+lt+lg+lg;
l1r3=lg+lg+lt+lg+lg;
l1r4=lg+lg+lt+lg+lg;
l1r5=lg+lg+lt+lg+lg;
    break;
  case "u":
            document.letters.icons.value+=lt+lg+lg+lt;
l1r2=lt+lg+lg+lt;
l1r3=lt+lg+lg+lt;
l1r4=lt+lg+lg+lt;
l1r5=lg+lt+lt+lg;
    break;
  case "v":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
l1r2=lt+lg+lg+lg+lt;
l1r3=lt+lg+lg+lg+lt;
l1r4=lg+lt+lg+lt+lg;
l1r5=lg+lg+lt+lg+lg;
    break;
  case "w":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
l1r2=lt+lg+lg+lg+lt;
l1r3=lt+lg+lt+lg+lt;
l1r4=lt+lg+lt+lg+lt;
l1r5=lg+lt+lg+lt+lg;
    break;
  case "x":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
l1r2=lg+lt+lg+lt+lg;
l1r3=lg+lg+lt+lg+lg;
l1r4=lg+lt+lg+lt+lg;
l1r5=lt+lg+lg+lg+lt;
    break;
  case "y":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
l1r2=lg+lt+lg+lt+lg;
l1r3=lg+lg+lt+lg+lg;
l1r4=lg+lt+lg+lg+lg;
l1r5=lt+lg+lg+lg+lg;
    break;
  case "z":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
l1r2=lg+lg+lg+lt+lg;
l1r3=lg+lg+lt+lg+lg;
l1r4=lg+lt+lg+lg+lg;
l1r5=lt+lt+lt+lt+lt;
    break;
  case "!":
            document.letters.icons.value+=lt;
l1r2=lt;
l1r3=lt;
l1r4=lg;
l1r5=lt;
    break;
  case "*":
	   document.letters.icons.value+=lg+lg+lg+lg+lg;
		l1r2=lg+lt+lg+lt+lg;
		l1r3=lt+lt+lt+lt+lt;
                l1r4=lg+lt+lt+lt+lg;
                l1r5=lg+lg+lt+lg+lg;
                l1r5=lg+lg+lt+lg+lg;		  	
    break;
  case "1":
	   document.letters.icons.value+=lg+lg+lt+lg;
		l1r2=lg+lt+lg+lt;
		l1r3=lt+lt+lt+lt;
                l1r4=lg+lt+lt+lt;
                l1r5=lg+lg+lt+lg;
                l1r5=lg+lg+lt+lg;
break;

        }
       if (letter2==''){} else{ 
          document.letters.icons.value+=lg;
        }
        switch (letter2)
{
  case "a":
            document.letters.icons.value+=lg+lg+lt+lg+lg;
l2r2=lg+lt+lg+lt+lg;
l2r3=lt+lt+lt+lt+lt;
l2r4=lt+lg+lg+lg+lt;
l2r5=lt+lg+lg+lg+lt;
    break;
  case "b":
            document.letters.icons.value+=lt+lt+lt+lg;
l2r2=lt+lg+lg+lt;
l2r3=lt+lt+lt+lg;
l2r4=lt+lg+lg+lt;
l2r5=lt+lt+lt+lg;
    break;
  case "c":
            document.letters.icons.value+=lg+lt+lt+lg;
                l2r2=lt+lg+lg+lt;
                l2r3=lt+lg+lg+lg;
                l2r4=lt+lg+lg+lt;
                l2r5=lg+lt+lt+lg;
    break;
  case "d":
            document.letters.icons.value+=lt+lt+lt+lg;
                l2r2=lt+lg+lg+lt;
                l2r3=lt+lg+lg+lt;
                l2r4=lt+lg+lg+lt;
                l2r5=lt+lt+lt+lg;
    break;
  case "e":
            document.letters.icons.value+=lt+lt+lt+lt;
                l2r2=lt+lg+lg+lg;
                l2r3=lt+lt+lt+lg;
                l2r4=lt+lg+lg+lg;
                l2r5=lt+lt+lt+lt;
    break;
  case "f":
            document.letters.icons.value+=lt+lt+lt+lt;
                l2r2=lt+lg+lg+lg;
                l2r3=lt+lt+lt+lg;
                l2r4=lt+lg+lg+lg;
                l2r5=lt+lg+lg+lg;
    break;
  case "g":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l2r2=lt+lg+lg+lg+lg;
                l2r3=lt+lg+lg+lt+lt;

                l2r4=lt+lg+lg+lg+lt;
                l2r5=lg+lt+lt+lt+lg;
    break;
  case "h":
            document.letters.icons.value+=lt+lg+lg+lt;
                l2r2=lt+lg+lg+lt;
                l2r3=lt+lt+lt+lt;
                l2r4=lt+lg+lg+lt;
                l2r5=lt+lg+lg+lt;
    break;
  case "i":
            document.letters.icons.value+=lt+lt+lt;
                l2r2=lg+lt+lg;
                l2r3=lg+lt+lg;
                l2r4=lg+lt+lg;
                l2r5=lt+lt+lt;
    break;
  case "j":
            document.letters.icons.value+=lg+lg+lt+lt+lt;
                l2r2=lg+lg+lg+lt+lg;
                l2r3=lg+lg+lg+lt+lg;
                l2r4=lt+lg+lg+lt+lg;
                l2r5=lg+lt+lt+lg+lg;
    break;
  case "k":
            document.letters.icons.value+=lt+lg+lg+lt;
                l2r2=lt+lg+lt+lg;
                l2r3=lt+lt+lg+lg;
                l2r4=lt+lg+lt+lg;
                l2r5=lt+lg+lg+lt;
    break;
  case "l":
            document.letters.icons.value+=lt+lg+lg+lg;
                l2r2=lt+lg+lg+lg;
                l2r3=lt+lg+lg+lg;
                l2r4=lt+lg+lg+lg;
                l2r5=lt+lt+lt+lt;
    break;
  case "m":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l2r2=lt+lt+lg+lt+lt;
                l2r3=lt+lg+lt+lg+lt;
                l2r4=lt+lg+lg+lg+lt;
                l2r5=lt+lg+lg+lg+lt;
    break;
  case "n":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l2r2=lt+lt+lg+lg+lt;
                l2r3=lt+lg+lt+lg+lt;
                l2r4=lt+lg+lg+lt+lt;
                l2r5=lt+lg+lg+lg+lt;
    break;
  case "o":
            document.letters.icons.value+=lg+lt+lt+lg;
                l2r2=lt+lg+lg+lt;
                l2r3=lt+lg+lg+lt;
                l2r4=lt+lg+lg+lt;
                l2r5=lg+lt+lt+lg;
    break;
  case "p":
            document.letters.icons.value+=lt+lt+lt+lg;
                l2r2=lt+lg+lg+lt;
                l2r3=lt+lt+lt+lg;
                l2r4=lt+lg+lg+lg;
                l2r5=lt+lg+lg+lg;
    break;
  case "q":
            document.letters.icons.value+=lg+lt+lt+lg;
                l2r2=lt+lg+lg+lt;
                l2r3=lt+lg+lg+lt;
                l2r4=lt+lg+lt+lt;
                l2r5=lg+lt+lt+lt;
    break;
  case "r":
            document.letters.icons.value+=lt+lt+lt+lg;
                l2r2=lt+lg+lg+lt;
                l2r3=lt+lt+lt+lg;
                l2r4=lt+lg+lg+lt;
                l2r5=lt+lg+lg+lt;
    break;
  case "s":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l2r2=lt+lg+lg+lg+lg;
                l2r3=lg+lt+lt+lt+lg;
                l2r4=lg+lg+lg+lg+lt;
                l2r5=lg+lt+lt+lt+lg;
    break;
  case "t":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l2r2=lg+lg+lt+lg+lg;
                l2r3=lg+lg+lt+lg+lg;
                l2r4=lg+lg+lt+lg+lg;
                l2r5=lg+lg+lt+lg+lg;
    break;
  case "u":
            document.letters.icons.value+=lt+lg+lg+lt;
                l2r2=lt+lg+lg+lt;
                l2r3=lt+lg+lg+lt;
                l2r4=lt+lg+lg+lt;
                l2r5=lg+lt+lt+lg;
    break;
  case "v":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l2r2=lt+lg+lg+lg+lt;
                l2r3=lt+lg+lg+lg+lt;
                l2r4=lg+lt+lg+lt+lg;
                l2r5=lg+lg+lt+lg+lg;
    break;
  case "w":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l2r2=lt+lg+lg+lg+lt;
                l2r3=lt+lg+lt+lg+lt;
                l2r4=lt+lg+lt+lg+lt;
                l2r5=lg+lt+lg+lt+lg;
    break;
  case "x":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l2r2=lg+lt+lg+lt+lg;
                l2r3=lg+lg+lt+lg+lg;
                l2r4=lg+lt+lg+lt+lg;
                l2r5=lt+lg+lg+lg+lt;
    break;
  case "y":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l2r2=lg+lt+lg+lt+lg;
                l2r3=lg+lg+lt+lg+lg;
                l2r4=lg+lt+lg+lg+lg;
                l2r5=lt+lg+lg+lg+lg;
    break;
  case "z":
	document.letters.icons.value+=lt+lt+lt+lt+lt;
                l2r2=lg+lg+lg+lt+lg;
                l2r3=lg+lg+lt+lg+lg;
                l2r4=lg+lt+lg+lg+lg;
                l2r5=lt+lt+lt+lt+lt;
    break;
  case "!":
            document.letters.icons.value+=lt;
                l2r2=lt;
                l2r3=lt;
                l2r4=lg;
                l2r5=lt;
    break;
  case "*":
	   document.letters.icons.value+=lg+lg+lg+lg+lg;
		l2r2=lg+lt+lg+lt+lg;
		l2r3=lt+lt+lt+lt+lt;
                l2r4=lg+lt+lt+lt+lg;
                l2r5=lg+lg+lt+lg+lg;
                l2r5=lg+lg+lt+lg+lg;		  	
    break;
        }
        if (letter3==''){} else{
          document.letters.icons.value+=lg;
        }
        switch (letter3)
{
  case "a":
            document.letters.icons.value+=lg+lg+lt+lg+lg;
                l3r2=lg+lt+lg+lt+lg;
                l3r3=lt+lt+lt+lt+lt;
                l3r4=lt+lg+lg+lg+lt;
                l3r5=lt+lg+lg+lg+lt;
    break;
  case "b":
            document.letters.icons.value+=lt+lt+lt+lg;
                l3r2=lt+lg+lg+lt;
                l3r3=lt+lt+lt+lg;
                l3r4=lt+lg+lg+lt;
                l3r5=lt+lt+lt+lg;
    break;
  case "c":
            document.letters.icons.value+=lg+lt+lt+lg;
                l3r2=lt+lg+lg+lt;
                l3r3=lt+lg+lg+lg;
                l3r4=lt+lg+lg+lt;
                l3r5=lg+lt+lt+lg;
    break;
  case "d":
            document.letters.icons.value+=lt+lt+lt+lg;
                l3r2=lt+lg+lg+lt;
                l3r3=lt+lg+lg+lt;
                l3r4=lt+lg+lg+lt;
                l3r5=lt+lt+lt+lg;
    break;
  case "e":
            document.letters.icons.value+=lt+lt+lt+lt;
                l3r2=lt+lg+lg+lg;
                l3r3=lt+lt+lt+lg;
                l3r4=lt+lg+lg+lg;
                l3r5=lt+lt+lt+lt;
    break;
  case "f":
            document.letters.icons.value+=lt+lt+lt+lt;
                l3r2=lt+lg+lg+lg;
                l3r3=lt+lt+lt+lg;
                l3r4=lt+lg+lg+lg;
                l3r5=lt+lg+lg+lg;
    break;
  case "g":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l3r2=lt+lg+lg+lg+lg;
                l3r3=lt+lg+lg+lt+lt;
                l3r4=lt+lg+lg+lg+lt;
                l3r5=lg+lt+lt+lt+lg;
    break;
  case "h":
            document.letters.icons.value+=lt+lg+lg+lt;
                l3r2=lt+lg+lg+lt;
                l3r3=lt+lt+lt+lt;
                l3r4=lt+lg+lg+lt;
                l3r5=lt+lg+lg+lt;
    break;
  case "i":
            document.letters.icons.value+=lt+lt+lt;
                l3r2=lg+lt+lg;
                l3r3=lg+lt+lg;
                l3r4=lg+lt+lg;
                l3r5=lt+lt+lt;
    break;
  case "j":
            document.letters.icons.value+=lg+lg+lt+lt+lt;
                l3r2=lg+lg+lg+lt+lg;
                l3r3=lg+lg+lg+lt+lg;
                l3r4=lt+lg+lg+lt+lg;
                l3r5=lg+lt+lt+lg+lg;
    break;
  case "k":
            document.letters.icons.value+=lt+lg+lg+lt;
                l3r2=lt+lg+lt+lg;
                l3r3=lt+lt+lg+lg;
                l3r4=lt+lg+lt+lg;
                l3r5=lt+lg+lg+lt;
    break;
  case "l":
            document.letters.icons.value+=lt+lg+lg+lg;
                l3r2=lt+lg+lg+lg;
                l3r3=lt+lg+lg+lg;
                l3r4=lt+lg+lg+lg;
                l3r5=lt+lt+lt+lt;
    break;
  case "m":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l3r2=lt+lt+lg+lt+lt;
                l3r3=lt+lg+lt+lg+lt;
                l3r4=lt+lg+lg+lg+lt;
                l3r5=lt+lg+lg+lg+lt;
    break;
  case "n":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l3r2=lt+lt+lg+lg+lt;
                l3r3=lt+lg+lt+lg+lt;
                l3r4=lt+lg+lg+lt+lt;
                l3r5=lt+lg+lg+lg+lt;
    break;
  case "o":
            document.letters.icons.value+=lg+lt+lt+lg;
                l3r2=lt+lg+lg+lt;
                l3r3=lt+lg+lg+lt;
                l3r4=lt+lg+lg+lt;
                l3r5=lg+lt+lt+lg;
    break;
  case "p":
            document.letters.icons.value+=lt+lt+lt+lg;
                l3r2=lt+lg+lg+lt;
                l3r3=lt+lt+lt+lg;
                l3r4=lt+lg+lg+lg;
                l3r5=lt+lg+lg+lg;
    break;
  case "q":
            document.letters.icons.value+=lg+lt+lt+lg;
                l3r2=lt+lg+lg+lt;
                l3r3=lt+lg+lg+lt;
                l3r4=lt+lg+lt+lt;
                l3r5=lg+lt+lt+lt;
    break;
  case "r":
            document.letters.icons.value+=lt+lt+lt+lg;
                l3r2=lt+lg+lg+lt;
                l3r3=lt+lt+lt+lg;
                l3r4=lt+lg+lg+lt;
                l3r5=lt+lg+lg+lt;
    break;
  case "s":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l3r2=lt+lg+lg+lg+lg;
                l3r3=lg+lt+lt+lt+lg;
                l3r4=lg+lg+lg+lg+lt;
                l3r5=lg+lt+lt+lt+lg;
    break;
  case "t":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l3r2=lg+lg+lt+lg+lg;
                l3r3=lg+lg+lt+lg+lg;
                l3r4=lg+lg+lt+lg+lg;
                l3r5=lg+lg+lt+lg+lg;
    break;
  case "u":
            document.letters.icons.value+=lt+lg+lg+lt;
                l3r2=lt+lg+lg+lt;
                l3r3=lt+lg+lg+lt;
                l3r4=lt+lg+lg+lt;
                l3r5=lg+lt+lt+lg;
    break;
  case "v":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l3r2=lt+lg+lg+lg+lt;
                l3r3=lt+lg+lg+lg+lt;
                l3r4=lg+lt+lg+lt+lg;
                l3r5=lg+lg+lt+lg+lg;
    break;
  case "w":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l3r2=lt+lg+lg+lg+lt;
                l3r3=lt+lg+lt+lg+lt;
                l3r4=lt+lg+lt+lg+lt;
                l3r5=lg+lt+lg+lt+lg;
    break;
  case "x":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l3r2=lg+lt+lg+lt+lg;
                l3r3=lg+lg+lt+lg+lg;
                l3r4=lg+lt+lg+lt+lg;
                l3r5=lt+lg+lg+lg+lt;
    break;
  case "y":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l3r2=lg+lt+lg+lt+lg;
                l3r3=lg+lg+lt+lg+lg;
                l3r4=lg+lt+lg+lg+lg;
                l3r5=lt+lg+lg+lg+lg;
    break;
  case "z":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l3r2=lg+lg+lg+lt+lg;
                l3r3=lg+lg+lt+lg+lg;
                l3r4=lg+lt+lg+lg+lg;
                l3r5=lt+lt+lt+lt+lt;
    break;
  case "!":
            document.letters.icons.value+=lt;
                l3r2=lt;
                l3r3=lt;
                l3r4=lg;
                l3r5=lt;
    break;
  case "*":
	   document.letters.icons.value+=lg+lg+lg+lg+lg;
		l3r2=lg+lt+lg+lt+lg;
		l3r3=lt+lt+lt+lt+lt;
                l3r4=lg+lt+lt+lt+lg;
                l3r5=lg+lg+lt+lg+lg;
                l3r5=lg+lg+lt+lg+lg;		  	
    break;
        }
        if (letter4==''){} else{
          document.letters.icons.value+=lg;
        }
        switch (letter4)
{
  case "a":
            document.letters.icons.value+=lg+lg+lt+lg+lg;
                l4r2=lg+lt+lg+lt+lg;
                l4r3=lt+lt+lt+lt+lt;
                l4r4=lt+lg+lg+lg+lt;
                l4r5=lt+lg+lg+lg+lt;
    break;
  case "b":
            document.letters.icons.value+=lt+lt+lt+lg;
                l4r2=lt+lg+lg+lt;
                l4r3=lt+lt+lt+lg;
                l4r4=lt+lg+lg+lt;
                l4r5=lt+lt+lt+lg;
    break;
  case "c":
            document.letters.icons.value+=lg+lt+lt+lg;
                l4r2=lt+lg+lg+lt;
                l4r3=lt+lg+lg+lg;
                l4r4=lt+lg+lg+lt;
                l4r5=lg+lt+lt+lg;
    break;
  case "d":
            document.letters.icons.value+=lt+lt+lt+lg;
                l4r2=lt+lg+lg+lt;
                l4r3=lt+lg+lg+lt;
                l4r4=lt+lg+lg+lt;
                l4r5=lt+lt+lt+lg;
    break;
  case "e":
            document.letters.icons.value+=lt+lt+lt+lt;
                l4r2=lt+lg+lg+lg;
                l4r3=lt+lt+lt+lg;
                l4r4=lt+lg+lg+lg;
                l4r5=lt+lt+lt+lt;
    break;
  case "f":
            document.letters.icons.value+=lt+lt+lt+lt;
                l4r2=lt+lg+lg+lg;
                l4r3=lt+lt+lt+lg;
                l4r4=lt+lg+lg+lg;
                l4r5=lt+lg+lg+lg;
    break;
  case "g":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l4r2=lt+lg+lg+lg+lg;
                l4r3=lt+lg+lg+lt+lt;
                l4r4=lt+lg+lg+lg+lt;
                l4r5=lg+lt+lt+lt+lg;
    break;
  case "h":
            document.letters.icons.value+=lt+lg+lg+lt;
                l4r2=lt+lg+lg+lt;
                l4r3=lt+lt+lt+lt;
                l4r4=lt+lg+lg+lt;
                l4r5=lt+lg+lg+lt;
    break;
  case "i":
            document.letters.icons.value+=lt+lt+lt;
                l4r2=lg+lt+lg;
                l4r3=lg+lt+lg;
                l4r4=lg+lt+lg;
                l4r5=lt+lt+lt;
    break;
  case "j":
            document.letters.icons.value+=lg+lg+lt+lt+lt;
                l4r2=lg+lg+lg+lt+lg;
                l4r3=lg+lg+lg+lt+lg;
                l4r4=lt+lg+lg+lt+lg;
                l4r5=lg+lt+lt+lg+lg;
    break;
  case "k":
            document.letters.icons.value+=lt+lg+lg+lt;
                l4r2=lt+lg+lt+lg;
                l4r3=lt+lt+lg+lg;
                l4r4=lt+lg+lt+lg;
                l4r5=lt+lg+lg+lt;
    break;
  case "l":
            document.letters.icons.value+=lt+lg+lg+lg;
                l4r2=lt+lg+lg+lg;
                l4r3=lt+lg+lg+lg;
                l4r4=lt+lg+lg+lg;
                l4r5=lt+lt+lt+lt;
    break;
  case "m":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l4r2=lt+lt+lg+lt+lt;
                l4r3=lt+lg+lt+lg+lt;
                l4r4=lt+lg+lg+lg+lt;
                l4r5=lt+lg+lg+lg+lt;
    break;
  case "n":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l4r2=lt+lt+lg+lg+lt;
                l4r3=lt+lg+lt+lg+lt;
                l4r4=lt+lg+lg+lt+lt;
                l4r5=lt+lg+lg+lg+lt;
    break;
  case "o":
            document.letters.icons.value+=lg+lt+lt+lg;
                l4r2=lt+lg+lg+lt;
                l4r3=lt+lg+lg+lt;
                l4r4=lt+lg+lg+lt;
                l4r5=lg+lt+lt+lg;
    break;
  case "p":
            document.letters.icons.value+=lt+lt+lt+lg;
                l4r2=lt+lg+lg+lt;
                l4r3=lt+lt+lt+lg;
                l4r4=lt+lg+lg+lg;
                l4r5=lt+lg+lg+lg;
    break;
  case "q":
            document.letters.icons.value+=lg+lt+lt+lg;
                l4r2=lt+lg+lg+lt;
                l4r3=lt+lg+lg+lt;
                l4r4=lt+lg+lt+lt;
                l4r5=lg+lt+lt+lt;
    break;
  case "r":
            document.letters.icons.value+=lt+lt+lt+lg;
                l4r2=lt+lg+lg+lt;
                l4r3=lt+lt+lt+lg;
                l4r4=lt+lg+lg+lt;
                l4r5=lt+lg+lg+lt;
    break;
  case "s":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l4r2=lt+lg+lg+lg+lg;
                l4r3=lg+lt+lt+lt+lg;
                l4r4=lg+lg+lg+lg+lt;
                l4r5=lg+lt+lt+lt+lg;
    break;
  case "t":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l4r2=lg+lg+lt+lg+lg;
                l4r3=lg+lg+lt+lg+lg;
                l4r4=lg+lg+lt+lg+lg;
                l4r5=lg+lg+lt+lg+lg;
    break;
  case "u":
            document.letters.icons.value+=lt+lg+lg+lt;
                l4r2=lt+lg+lg+lt;
                l4r3=lt+lg+lg+lt;
                l4r4=lt+lg+lg+lt;
                l4r5=lg+lt+lt+lg;
    break;
  case "v":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l4r2=lt+lg+lg+lg+lt;
                l4r3=lt+lg+lg+lg+lt;
                l4r4=lg+lt+lg+lt+lg;
                l4r5=lg+lg+lt+lg+lg;
    break;
  case "w":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l4r2=lt+lg+lg+lg+lt;
                l4r3=lt+lg+lt+lg+lt;
                l4r4=lt+lg+lt+lg+lt;
                l4r5=lg+lt+lg+lt+lg;
    break;
  case "x":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l4r2=lg+lt+lg+lt+lg;
                l4r3=lg+lg+lt+lg+lg;
                l4r4=lg+lt+lg+lt+lg;
                l4r5=lt+lg+lg+lg+lt;
    break;
  case "y":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l4r2=lg+lt+lg+lt+lg;
                l4r3=lg+lg+lt+lg+lg;
                l4r4=lg+lt+lg+lg+lg;
                l4r5=lt+lg+lg+lg+lg;
    break;
  case "z":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l4r2=lg+lg+lg+lt+lg;
                l4r3=lg+lg+lt+lg+lg;
                l4r4=lg+lt+lg+lg+lg;
                l4r5=lt+lt+lt+lt+lt;
    break;
  case "!":
            document.letters.icons.value+=lt;
                l4r2=lt;
                l4r3=lt;
                l4r4=lg;
                l4r5=lt;
    break;
  case "*":
	   document.letters.icons.value+=lg+lg+lg+lg+lg;
		l4r2=lg+lt+lg+lt+lg;
		l4r3=lt+lt+lt+lt+lt;
                l4r4=lg+lt+lt+lt+lg;
                l4r5=lg+lg+lt+lg+lg;
                l4r5=lg+lg+lt+lg+lg;		  	
    break;
        }
        if (letter5==''){} else{
          document.letters.icons.value+=lg;
        }
        switch (letter5)
{
  case "a":
            document.letters.icons.value+=lg+lg+lt+lg+lg;
                l5r2=lg+lt+lg+lt+lg;
                l5r3=lt+lt+lt+lt+lt;
                l5r4=lt+lg+lg+lg+lt;
                l5r5=lt+lg+lg+lg+lt;
    break;
  case "b":
            document.letters.icons.value+=lt+lt+lt+lg;
                l5r2=lt+lg+lg+lt;
                l5r3=lt+lt+lt+lg;
                l5r4=lt+lg+lg+lt;
                l5r5=lt+lt+lt+lg;
    break;
  case "c":
            document.letters.icons.value+=lg+lt+lt+lg;
                l5r2=lt+lg+lg+lt;
                l5r3=lt+lg+lg+lg;
                l5r4=lt+lg+lg+lt;
                l5r5=lg+lt+lt+lg;
    break;
  case "d":
            document.letters.icons.value+=lt+lt+lt+lg;
                l5r2=lt+lg+lg+lt;
                l5r3=lt+lg+lg+lt;
                l5r4=lt+lg+lg+lt;
                l5r5=lt+lt+lt+lg;
    break;
  case "e":
            document.letters.icons.value+=lt+lt+lt+lt;
                l5r2=lt+lg+lg+lg;
                l5r3=lt+lt+lt+lg;
                l5r4=lt+lg+lg+lg;
                l5r5=lt+lt+lt+lt;
    break;
  case "f":
            document.letters.icons.value+=lt+lt+lt+lt;
                l5r2=lt+lg+lg+lg;
                l5r3=lt+lt+lt+lg;
                l5r4=lt+lg+lg+lg;
                l5r5=lt+lg+lg+lg;
    break;
  case "g":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l5r2=lt+lg+lg+lg+lg;
                l5r3=lt+lg+lg+lt+lt;
                l5r4=lt+lg+lg+lg+lt;
                l5r5=lg+lt+lt+lt+lg;
    break;
  case "h":
            document.letters.icons.value+=lt+lg+lg+lt;
                l5r2=lt+lg+lg+lt;
                l5r3=lt+lt+lt+lt;
                l5r4=lt+lg+lg+lt;
                l5r5=lt+lg+lg+lt;
    break;
  case "i":
            document.letters.icons.value+=lt+lt+lt;
                l5r2=lg+lt+lg;
                l5r3=lg+lt+lg;
                l5r4=lg+lt+lg;
                l5r5=lt+lt+lt;
    break;
  case "j":
            document.letters.icons.value+=lg+lg+lt+lt+lt;
                l5r2=lg+lg+lg+lt+lg;
                l5r3=lg+lg+lg+lt+lg;
                l5r4=lt+lg+lg+lt+lg;
                l5r5=lg+lt+lt+lg+lg;
    break;
  case "k":
            document.letters.icons.value+=lt+lg+lg+lt;
                l5r2=lt+lg+lt+lg;
                l5r3=lt+lt+lg+lg;
                l5r4=lt+lg+lt+lg;
                l5r5=lt+lg+lg+lt;
    break;
  case "l":
            document.letters.icons.value+=lt+lg+lg+lg;
                l5r2=lt+lg+lg+lg;
                l5r3=lt+lg+lg+lg;

                l5r4=lt+lg+lg+lg;
                l5r5=lt+lt+lt+lt;
    break;
  case "m":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l5r2=lt+lt+lg+lt+lt;
                l5r3=lt+lg+lt+lg+lt;
                l5r4=lt+lg+lg+lg+lt;
                l5r5=lt+lg+lg+lg+lt;
    break;
  case "n":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l5r2=lt+lt+lg+lg+lt;
                l5r3=lt+lg+lt+lg+lt;
                l5r4=lt+lg+lg+lt+lt;
                l5r5=lt+lg+lg+lg+lt;
    break;
  case "o":
            document.letters.icons.value+=lg+lt+lt+lg;
                l5r2=lt+lg+lg+lt;
                l5r3=lt+lg+lg+lt;
                l5r4=lt+lg+lg+lt;
                l5r5=lg+lt+lt+lg;
    break;
  case "p":
            document.letters.icons.value+=lt+lt+lt+lg;
                l5r2=lt+lg+lg+lt;
                l5r3=lt+lt+lt+lg;
                l5r4=lt+lg+lg+lg;
                l5r5=lt+lg+lg+lg;
    break;
  case "q":
            document.letters.icons.value+=lg+lt+lt+lg;
                l5r2=lt+lg+lg+lt;
                l5r3=lt+lg+lg+lt;
                l5r4=lt+lg+lt+lt;
                l5r5=lg+lt+lt+lt;
    break;
  case "r":
            document.letters.icons.value+=lt+lt+lt+lg;
                l5r2=lt+lg+lg+lt;
                l5r3=lt+lt+lt+lg;
                l5r4=lt+lg+lg+lt;
                l5r5=lt+lg+lg+lt;
    break;
  case "s":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l5r2=lt+lg+lg+lg+lg;
                l5r3=lg+lt+lt+lt+lg;
                l5r4=lg+lg+lg+lg+lt;
                l5r5=lg+lt+lt+lt+lg;
    break;
  case "t":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l5r2=lg+lg+lt+lg+lg;
                l5r3=lg+lg+lt+lg+lg;
                l5r4=lg+lg+lt+lg+lg;
                l5r5=lg+lg+lt+lg+lg;
    break;
  case "u":
            document.letters.icons.value+=lt+lg+lg+lt;
                l5r2=lt+lg+lg+lt;
                l5r3=lt+lg+lg+lt;
                l5r4=lt+lg+lg+lt;
                l5r5=lg+lt+lt+lg;
    break;
  case "v":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l5r2=lt+lg+lg+lg+lt;
                l5r3=lt+lg+lg+lg+lt;
                l5r4=lg+lt+lg+lt+lg;
                l5r5=lg+lg+lt+lg+lg;
    break;
  case "w":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l5r2=lt+lg+lg+lg+lt;
                l5r3=lt+lg+lt+lg+lt;
                l5r4=lt+lg+lt+lg+lt;
                l5r5=lg+lt+lg+lt+lg;
    break;
  case "x":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l5r2=lg+lt+lg+lt+lg;
                l5r3=lg+lg+lt+lg+lg;
                l5r4=lg+lt+lg+lt+lg;
                l5r5=lt+lg+lg+lg+lt;
    break;
  case "y":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l5r2=lg+lt+lg+lt+lg;
                l5r3=lg+lg+lt+lg+lg;
                l5r4=lg+lt+lg+lg+lg;
                l5r5=lt+lg+lg+lg+lg;
    break;
  case "z":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l5r2=lg+lg+lg+lt+lg;
                l5r3=lg+lg+lt+lg+lg;
                l5r4=lg+lt+lg+lg+lg;
                l5r5=lt+lt+lt+lt+lt;
    break;
  case "!":
            document.letters.icons.value+=lt;
                l5r2=lt;
                l5r3=lt;
                l5r4=lg;
                l5r5=lt;
    break;
  case "*":
	   document.letters.icons.value+=lg+lg+lg+lg+lg;
		l5r2=lg+lt+lg+lt+lg;
		l5r3=lt+lt+lt+lt+lt;
                l5r4=lg+lt+lt+lt+lg;
                l5r5=lg+lg+lt+lg+lg;
                l5r5=lg+lg+lt+lg+lg;		  	
    break;
        }
        if (letter6==''){} else{
          document.letters.icons.value+=lg;
        }
        switch (letter6)
{
  case "a":
            document.letters.icons.value+=lg+lg+lt+lg+lg;
                l6r2=lg+lt+lg+lt+lg;
                l6r3=lt+lt+lt+lt+lt;
                l6r4=lt+lg+lg+lg+lt;
                l6r5=lt+lg+lg+lg+lt;
    break;

  case "b":
            document.letters.icons.value+=lt+lt+lt+lg;
                l6r2=lt+lg+lg+lt;
                l6r3=lt+lt+lt+lg;
                l6r4=lt+lg+lg+lt;
                l6r5=lt+lt+lt+lg;
    break;
  case "c":
            document.letters.icons.value+=lg+lt+lt+lg;
                l6r2=lt+lg+lg+lt;
                l6r3=lt+lg+lg+lg;
                l6r4=lt+lg+lg+lt;
                l6r5=lg+lt+lt+lg;
    break;
  case "d":
            document.letters.icons.value+=lt+lt+lt+lg;
                l6r2=lt+lg+lg+lt;
                l6r3=lt+lg+lg+lt;
                l6r4=lt+lg+lg+lt;
                l6r5=lt+lt+lt+lg;
    break;
  case "e":
            document.letters.icons.value+=lt+lt+lt+lt;
                l6r2=lt+lg+lg+lg;
                l6r3=lt+lt+lt+lg;
                l6r4=lt+lg+lg+lg;
                l6r5=lt+lt+lt+lt;
    break;
  case "f":
            document.letters.icons.value+=lt+lt+lt+lt;
                l6r2=lt+lg+lg+lg;
                l6r3=lt+lt+lt+lg;
                l6r4=lt+lg+lg+lg;
                l6r5=lt+lg+lg+lg;
    break;
  case "g":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l6r2=lt+lg+lg+lg+lg;
                l6r3=lt+lg+lg+lt+lt;
                l6r4=lt+lg+lg+lg+lt;
                l6r5=lg+lt+lt+lt+lg;
    break;
  case "h":
            document.letters.icons.value+=lt+lg+lg+lt;
                l6r2=lt+lg+lg+lt;
                l6r3=lt+lt+lt+lt;
                l6r4=lt+lg+lg+lt;
                l6r5=lt+lg+lg+lt;
    break;
  case "i":
            document.letters.icons.value+=lt+lt+lt;
                l6r2=lg+lt+lg;
                l6r3=lg+lt+lg;
                l6r4=lg+lt+lg;
                l6r5=lt+lt+lt;
    break;
  case "j":
            document.letters.icons.value+=lg+lg+lt+lt+lt;
                l6r2=lg+lg+lg+lt+lg;
                l6r3=lg+lg+lg+lt+lg;
                l6r4=lt+lg+lg+lt+lg;
                l6r5=lg+lt+lt+lg+lg;
    break;
  case "k":
            document.letters.icons.value+=lt+lg+lg+lt;
                l6r2=lt+lg+lt+lg;
                l6r3=lt+lt+lg+lg;
                l6r4=lt+lg+lt+lg;
                l6r5=lt+lg+lg+lt;
    break;
  case "l":
            document.letters.icons.value+=lt+lg+lg+lg;
                l6r2=lt+lg+lg+lg;
                l6r3=lt+lg+lg+lg;
                l6r4=lt+lg+lg+lg;
                l6r5=lt+lt+lt+lt;
    break;
  case "m":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l6r2=lt+lt+lg+lt+lt;
                l6r3=lt+lg+lt+lg+lt;
                l6r4=lt+lg+lg+lg+lt;
                l6r5=lt+lg+lg+lg+lt;
    break;
  case "n":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l6r2=lt+lt+lg+lg+lt;
                l6r3=lt+lg+lt+lg+lt;
                l6r4=lt+lg+lg+lt+lt;
                l6r5=lt+lg+lg+lg+lt;
    break;
  case "o":
            document.letters.icons.value+=lg+lt+lt+lg;
                l6r2=lt+lg+lg+lt;
                l6r3=lt+lg+lg+lt;
                l6r4=lt+lg+lg+lt;
                l6r5=lg+lt+lt+lg;
    break;
  case "p":
            document.letters.icons.value+=lt+lt+lt+lg;
                l6r2=lt+lg+lg+lt;
                l6r3=lt+lt+lt+lg;
                l6r4=lt+lg+lg+lg;
                l6r5=lt+lg+lg+lg;
    break;
  case "q":
            document.letters.icons.value+=lg+lt+lt+lg;
                l6r2=lt+lg+lg+lt;
                l6r3=lt+lg+lg+lt;
                l6r4=lt+lg+lt+lt;
                l6r5=lg+lt+lt+lt;
    break;
  case "r":
            document.letters.icons.value+=lt+lt+lt+lg;
                l6r2=lt+lg+lg+lt;
                l6r3=lt+lt+lt+lg;
                l6r4=lt+lg+lg+lt;
                l6r5=lt+lg+lg+lt;
    break;
  case "s":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l6r2=lt+lg+lg+lg+lg;
                l6r3=lg+lt+lt+lt+lg;
                l6r4=lg+lg+lg+lg+lt;
                l6r5=lg+lt+lt+lt+lg;
    break;
  case "t":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l6r2=lg+lg+lt+lg+lg;
                l6r3=lg+lg+lt+lg+lg;
                l6r4=lg+lg+lt+lg+lg;
                l6r5=lg+lg+lt+lg+lg;
    break;
  case "u":
            document.letters.icons.value+=lt+lg+lg+lt;
                l6r2=lt+lg+lg+lt;
                l6r3=lt+lg+lg+lt;
                l6r4=lt+lg+lg+lt;
                l6r5=lg+lt+lt+lg;
    break;
  case "v":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l6r2=lt+lg+lg+lg+lt;
                l6r3=lt+lg+lg+lg+lt;
                l6r4=lg+lt+lg+lt+lg;
                l6r5=lg+lg+lt+lg+lg;
    break;
  case "w":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l6r2=lt+lg+lg+lg+lt;
                l6r3=lt+lg+lt+lg+lt;
                l6r4=lt+lg+lt+lg+lt;
                l6r5=lg+lt+lg+lt+lg;
    break;
  case "x":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l6r2=lg+lt+lg+lt+lg;
                l6r3=lg+lg+lt+lg+lg;
                l6r4=lg+lt+lg+lt+lg;
                l6r5=lt+lg+lg+lg+lt;
    break;
  case "y":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l6r2=lg+lt+lg+lt+lg;
                l6r3=lg+lg+lt+lg+lg;
                l6r4=lg+lt+lg+lg+lg;
                l6r5=lt+lg+lg+lg+lg;
    break;
  case "z":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l6r2=lg+lg+lg+lt+lg;
                l6r3=lg+lg+lt+lg+lg;
                l6r4=lg+lt+lg+lg+lg;
                l6r5=lt+lt+lt+lt+lt;
    break;
  case "!":
            document.letters.icons.value+=lt;
                l6r2=lt;
                l6r3=lt;
                l6r4=lg;
                l6r5=lt;
    break;
  case "*":
	   document.letters.icons.value+=lg+lg+lg+lg+lg;
		l6r2=lg+lt+lg+lt+lg;
		l6r3=lt+lt+lt+lt+lt;
                l6r4=lg+lt+lt+lt+lg;
                l6r5=lg+lg+lt+lg+lg;
                l7r5=lg+lg+lt+lg+lg;		  	
    break;
        }
        
//////////////////////////////////////////////////////////////////////////
        if (letter7==''){} else{
          document.letters.icons.value+=lg;
        }
        switch (letter7)
{
  case "a":
            document.letters.icons.value+=lg+lg+lt+lg+lg;
                l7r2=lg+lt+lg+lt+lg;
                l7r3=lt+lt+lt+lt+lt;
                l7r4=lt+lg+lg+lg+lt;
                l7r5=lt+lg+lg+lg+lt;
    break;

  case "b":
            document.letters.icons.value+=lt+lt+lt+lg;
                l7r2=lt+lg+lg+lt;
                l7r3=lt+lt+lt+lg;
                l7r4=lt+lg+lg+lt;
                l7r5=lt+lt+lt+lg;
    break;
  case "c":
            document.letters.icons.value+=lg+lt+lt+lg;
                l7r2=lt+lg+lg+lt;
                l7r3=lt+lg+lg+lg;
                l7r4=lt+lg+lg+lt;
                l7r5=lg+lt+lt+lg;
    break;
  case "d":
            document.letters.icons.value+=lt+lt+lt+lg;
                l7r2=lt+lg+lg+lt;
                l7r3=lt+lg+lg+lt;
                l7r4=lt+lg+lg+lt;
                l7r5=lt+lt+lt+lg;
    break;
  case "e":
            document.letters.icons.value+=lt+lt+lt+lt;
                l7r2=lt+lg+lg+lg;
                l7r3=lt+lt+lt+lg;
                l7r4=lt+lg+lg+lg;
                l7r5=lt+lt+lt+lt;
    break;
  case "f":
            document.letters.icons.value+=lt+lt+lt+lt;
                l7r2=lt+lg+lg+lg;
                l7r3=lt+lt+lt+lg;
                l7r4=lt+lg+lg+lg;
                l7r5=lt+lg+lg+lg;
    break;
  case "g":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l7r2=lt+lg+lg+lg+lg;
                l7r3=lt+lg+lg+lt+lt;
                l7r4=lt+lg+lg+lg+lt;
                l7r5=lg+lt+lt+lt+lg;
    break;
  case "h":
            document.letters.icons.value+=lt+lg+lg+lt;
                l7r2=lt+lg+lg+lt;
                l7r3=lt+lt+lt+lt;
                l7r4=lt+lg+lg+lt;
                l7r5=lt+lg+lg+lt;
    break;
  case "i":
            document.letters.icons.value+=lt+lt+lt;
                l7r2=lg+lt+lg;
                l7r3=lg+lt+lg;
                l7r4=lg+lt+lg;
                l7r5=lt+lt+lt;
    break;
  case "j":
            document.letters.icons.value+=lg+lg+lt+lt+lt;
                l7r2=lg+lg+lg+lt+lg;
                l7r3=lg+lg+lg+lt+lg;
                l7r4=lt+lg+lg+lt+lg;
                l7r5=lg+lt+lt+lg+lg;
    break;
  case "k":
            document.letters.icons.value+=lt+lg+lg+lt;
                l7r2=lt+lg+lt+lg;
                l7r3=lt+lt+lg+lg;
                l7r4=lt+lg+lt+lg;
                l7r5=lt+lg+lg+lt;
    break;
  case "l":
            document.letters.icons.value+=lt+lg+lg+lg;
                l7r2=lt+lg+lg+lg;
                l7r3=lt+lg+lg+lg;
                l7r4=lt+lg+lg+lg;
                l7r5=lt+lt+lt+lt;
    break;
  case "m":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l7r2=lt+lt+lg+lt+lt;
                l7r3=lt+lg+lt+lg+lt;
                l7r4=lt+lg+lg+lg+lt;
                l7r5=lt+lg+lg+lg+lt;
    break;
  case "n":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l7r2=lt+lt+lg+lg+lt;
                l7r3=lt+lg+lt+lg+lt;
                l7r4=lt+lg+lg+lt+lt;
                l7r5=lt+lg+lg+lg+lt;
    break;
  case "o":
            document.letters.icons.value+=lg+lt+lt+lg;
                l7r2=lt+lg+lg+lt;
                l7r3=lt+lg+lg+lt;
                l7r4=lt+lg+lg+lt;
                l7r5=lg+lt+lt+lg;
    break;
  case "p":
            document.letters.icons.value+=lt+lt+lt+lg;
                l7r2=lt+lg+lg+lt;
                l7r3=lt+lt+lt+lg;
                l7r4=lt+lg+lg+lg;
                l7r5=lt+lg+lg+lg;
    break;
  case "q":
            document.letters.icons.value+=lg+lt+lt+lg;
                l7r2=lt+lg+lg+lt;
                l7r3=lt+lg+lg+lt;
                l7r4=lt+lg+lt+lt;
                l7r5=lg+lt+lt+lt;
    break;
  case "r":
            document.letters.icons.value+=lt+lt+lt+lg;
                l7r2=lt+lg+lg+lt;
                l7r3=lt+lt+lt+lg;
                l7r4=lt+lg+lg+lt;
                l7r5=lt+lg+lg+lt;
    break;
  case "s":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l7r2=lt+lg+lg+lg+lg;
                l7r3=lg+lt+lt+lt+lg;
                l7r4=lg+lg+lg+lg+lt;
                l7r5=lg+lt+lt+lt+lg;
    break;
  case "t":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l7r2=lg+lg+lt+lg+lg;
                l7r3=lg+lg+lt+lg+lg;
                l7r4=lg+lg+lt+lg+lg;
                l7r5=lg+lg+lt+lg+lg;
    break;
  case "u":
            document.letters.icons.value+=lt+lg+lg+lt;
                l7r2=lt+lg+lg+lt;
                l7r3=lt+lg+lg+lt;
                l7r4=lt+lg+lg+lt;
                l7r5=lg+lt+lt+lg;
    break;
  case "v":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l7r2=lt+lg+lg+lg+lt;
                l7r3=lt+lg+lg+lg+lt;
                l7r4=lg+lt+lg+lt+lg;
                l7r5=lg+lg+lt+lg+lg;
    break;
  case "w":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l7r2=lt+lg+lg+lg+lt;
                l7r3=lt+lg+lt+lg+lt;
                l7r4=lt+lg+lt+lg+lt;
                l7r5=lg+lt+lg+lt+lg;
    break;
  case "x":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l7r2=lg+lt+lg+lt+lg;
                l7r3=lg+lg+lt+lg+lg;
                l7r4=lg+lt+lg+lt+lg;
                l7r5=lt+lg+lg+lg+lt;
    break;
  case "y":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l7r2=lg+lt+lg+lt+lg;
                l7r3=lg+lg+lt+lg+lg;
                l7r4=lg+lt+lg+lg+lg;
                l7r5=lt+lg+lg+lg+lg;
    break;
  case "z":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l7r2=lg+lg+lg+lt+lg;
                l7r3=lg+lg+lt+lg+lg;
                l7r4=lg+lt+lg+lg+lg;
                l7r5=lt+lt+lt+lt+lt;
    break;
  case "!":
            document.letters.icons.value+=lt;
                l7r2=lt;
                l7r3=lt;
                l7r4=lg;
                l7r5=lt;
    break;
  case "*":
	   document.letters.icons.value+=lg+lg+lg+lg+lg;
		l7r2=lg+lt+lg+lt+lg;
		l7r3=lt+lt+lt+lt+lt;
                l7r4=lg+lt+lt+lt+lg;
                l7r5=lg+lg+lt+lg+lg;
                l7r5=lg+lg+lt+lg+lg;		  	
    break;
        }        
        
//////////////////////////////////////////////////////////////////////////        

//////////////////////////////////////////////////////////////////////////
        if (letter8==''){} else{
          document.letters.icons.value+=lg;
        }
        switch (letter8)
{
  case "a":
            document.letters.icons.value+=lg+lg+lt+lg+lg;
                l8r2=lg+lt+lg+lt+lg;
                l8r3=lt+lt+lt+lt+lt;
                l8r4=lt+lg+lg+lg+lt;
                l8r5=lt+lg+lg+lg+lt;
    break;

  case "b":
            document.letters.icons.value+=lt+lt+lt+lg;
                l8r2=lt+lg+lg+lt;
                l8r3=lt+lt+lt+lg;
                l8r4=lt+lg+lg+lt;
                l8r5=lt+lt+lt+lg;
    break;
  case "c":
            document.letters.icons.value+=lg+lt+lt+lg;
                l8r2=lt+lg+lg+lt;
                l8r3=lt+lg+lg+lg;
                l8r4=lt+lg+lg+lt;
                l8r5=lg+lt+lt+lg;
    break;
  case "d":
            document.letters.icons.value+=lt+lt+lt+lg;
                l8r2=lt+lg+lg+lt;
                l8r3=lt+lg+lg+lt;
                l8r4=lt+lg+lg+lt;
                l8r5=lt+lt+lt+lg;
    break;
  case "e":
            document.letters.icons.value+=lt+lt+lt+lt;
                l8r2=lt+lg+lg+lg;
                l8r3=lt+lt+lt+lg;
                l8r4=lt+lg+lg+lg;
                l8r5=lt+lt+lt+lt;
    break;
  case "f":
            document.letters.icons.value+=lt+lt+lt+lt;
                l8r2=lt+lg+lg+lg;
                l8r3=lt+lt+lt+lg;
                l8r4=lt+lg+lg+lg;
                l8r5=lt+lg+lg+lg;
    break;
  case "g":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l8r2=lt+lg+lg+lg+lg;
                l8r3=lt+lg+lg+lt+lt;
                l8r4=lt+lg+lg+lg+lt;
                l8r5=lg+lt+lt+lt+lg;
    break;
  case "h":
            document.letters.icons.value+=lt+lg+lg+lt;
                l8r2=lt+lg+lg+lt;
                l8r3=lt+lt+lt+lt;
                l8r4=lt+lg+lg+lt;
                l8r5=lt+lg+lg+lt;
    break;
  case "i":
            document.letters.icons.value+=lt+lt+lt;
                l8r2=lg+lt+lg;
                l8r3=lg+lt+lg;
                l8r4=lg+lt+lg;
                l8r5=lt+lt+lt;
    break;
  case "j":
            document.letters.icons.value+=lg+lg+lt+lt+lt;
                l8r2=lg+lg+lg+lt+lg;
                l8r3=lg+lg+lg+lt+lg;
                l8r4=lt+lg+lg+lt+lg;
                l8r5=lg+lt+lt+lg+lg;
    break;
  case "k":
            document.letters.icons.value+=lt+lg+lg+lt;
                l8r2=lt+lg+lt+lg;
                l8r3=lt+lt+lg+lg;
                l8r4=lt+lg+lt+lg;
                l8r5=lt+lg+lg+lt;
    break;
  case "l":
            document.letters.icons.value+=lt+lg+lg+lg;
                l8r2=lt+lg+lg+lg;
                l8r3=lt+lg+lg+lg;
                l8r4=lt+lg+lg+lg;
                l8r5=lt+lt+lt+lt;
    break;
  case "m":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l8r2=lt+lt+lg+lt+lt;
                l8r3=lt+lg+lt+lg+lt;
                l8r4=lt+lg+lg+lg+lt;
                l8r5=lt+lg+lg+lg+lt;
    break;
  case "n":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l8r2=lt+lt+lg+lg+lt;
                l8r3=lt+lg+lt+lg+lt;
                l8r4=lt+lg+lg+lt+lt;
                l8r5=lt+lg+lg+lg+lt;
    break;
  case "o":
            document.letters.icons.value+=lg+lt+lt+lg;
                l8r2=lt+lg+lg+lt;
                l8r3=lt+lg+lg+lt;
                l8r4=lt+lg+lg+lt;
                l8r5=lg+lt+lt+lg;
    break;
  case "p":
            document.letters.icons.value+=lt+lt+lt+lg;
                l8r2=lt+lg+lg+lt;
                l8r3=lt+lt+lt+lg;
                l8r4=lt+lg+lg+lg;
                l8r5=lt+lg+lg+lg;
    break;
  case "q":
            document.letters.icons.value+=lg+lt+lt+lg;
                l8r2=lt+lg+lg+lt;
                l8r3=lt+lg+lg+lt;
                l8r4=lt+lg+lt+lt;
                l8r5=lg+lt+lt+lt;
    break;
  case "r":
            document.letters.icons.value+=lt+lt+lt+lg;
                l8r2=lt+lg+lg+lt;
                l8r3=lt+lt+lt+lg;
                l8r4=lt+lg+lg+lt;
                l8r5=lt+lg+lg+lt;
    break;
  case "s":
            document.letters.icons.value+=lg+lt+lt+lt+lg;
                l8r2=lt+lg+lg+lg+lg;
                l8r3=lg+lt+lt+lt+lg;
                l8r4=lg+lg+lg+lg+lt;
                l8r5=lg+lt+lt+lt+lg;
    break;
  case "t":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l8r2=lg+lg+lt+lg+lg;
                l8r3=lg+lg+lt+lg+lg;
                l8r4=lg+lg+lt+lg+lg;
                l8r5=lg+lg+lt+lg+lg;
    break;
  case "u":
            document.letters.icons.value+=lt+lg+lg+lt;
                l8r2=lt+lg+lg+lt;
                l8r3=lt+lg+lg+lt;
                l8r4=lt+lg+lg+lt;
                l8r5=lg+lt+lt+lg;
    break;
  case "v":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l8r2=lt+lg+lg+lg+lt;
                l8r3=lt+lg+lg+lg+lt;
                l8r4=lg+lt+lg+lt+lg;
                l8r5=lg+lg+lt+lg+lg;
    break;
  case "w":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l8r2=lt+lg+lg+lg+lt;
                l8r3=lt+lg+lt+lg+lt;
                l8r4=lt+lg+lt+lg+lt;
                l8r5=lg+lt+lg+lt+lg;
    break;
  case "x":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l8r2=lg+lt+lg+lt+lg;
                l8r3=lg+lg+lt+lg+lg;
                l8r4=lg+lt+lg+lt+lg;
                l8r5=lt+lg+lg+lg+lt;
    break;
  case "y":
            document.letters.icons.value+=lt+lg+lg+lg+lt;
                l8r2=lg+lt+lg+lt+lg;
                l8r3=lg+lg+lt+lg+lg;
                l8r4=lg+lt+lg+lg+lg;
                l8r5=lt+lg+lg+lg+lg;
    break;
  case "z":
            document.letters.icons.value+=lt+lt+lt+lt+lt;
                l8r2=lg+lg+lg+lt+lg;
                l8r3=lg+lg+lt+lg+lg;
                l8r4=lg+lt+lg+lg+lg;
                l8r5=lt+lt+lt+lt+lt;
    break;
  case "!":
            document.letters.icons.value+=lt;
                l8r2=lt;
                l8r3=lt;
                l8r4=lg;
                l8r5=lt;
    break;
  case "*":
	   document.letters.icons.value+=lg+lg+lg+lg+lg;
		l8r2=lg+lt+lg+lt+lg;
		l8r3=lt+lt+lt+lt+lt;
                l8r4=lg+lt+lt+lt+lg;
                l8r5=lg+lg+lt+lg+lg;
                l8r5=lg+lg+lt+lg+lg;		  	
    break;
        }        
        
//////////////////////////////////////////////////////////////////////////      


        
        document.letters.icons.value+="<br />\n"+l1r2;
        if (letter2==''){} else{
          document.letters.icons.value+=lg+l2r2;
          if (letter3==''){} else{
            document.letters.icons.value+=lg+l3r2;
            if (letter4==''){} else{
              document.letters.icons.value+=lg+l4r2;
              if (letter5==''){} else{
                document.letters.icons.value+=lg+l5r2;
                if (letter6==''){} else{
                  document.letters.icons.value+=lg+l6r2;
                  if (letter7==''){} else{
                  	document.letters.icons.value+=lg+l7r2;
                  	if (letter8==''){} else{
                  		document.letters.icons.value+=lg+l8r2;
                }}}}}}}
        document.letters.icons.value+="<br />\n"+l1r3;
        if (letter2==''){} else{
          document.letters.icons.value+=lg+l2r3;
          if (letter3==''){} else{
            document.letters.icons.value+=lg+l3r3;
            if (letter4==''){} else{
              document.letters.icons.value+=lg+l4r3;
              if (letter5==''){} else{
                document.letters.icons.value+=lg+l5r3;
                if (letter6==''){} else{
                  document.letters.icons.value+=lg+l6r3;
                	if (letter7==''){} else{
                  	document.letters.icons.value+=lg+l7r3;
                  	if (letter8==''){} else{
                  		document.letters.icons.value+=lg+l8r3;
                }}}}}}}
        document.letters.icons.value+="<br />\n"+l1r4;
        if (letter2==''){} else{
          document.letters.icons.value+=lg+l2r4;
          if (letter3==''){} else{
            document.letters.icons.value+=lg+l3r4;
            if (letter4==''){} else{
              document.letters.icons.value+=lg+l4r4;
              if (letter5==''){} else{
                document.letters.icons.value+=lg+l5r4;
                if (letter6==''){} else{
                  document.letters.icons.value+=lg+l6r4;
                	if (letter7==''){} else{
                  	document.letters.icons.value+=lg+l7r4;
                  	if (letter8==''){} else{
                  		document.letters.icons.value+=lg+l8r4;                   
                }}}}}}}
        document.letters.icons.value+="<br />\n"+l1r5;
        if (letter2==''){} else{
          document.letters.icons.value+=lg+l2r5;
          if (letter3==''){} else{
            document.letters.icons.value+=lg+l3r5;
            if (letter4==''){} else{
              document.letters.icons.value+=lg+l4r5;
              if (letter5==''){} else{
                document.letters.icons.value+=lg+l5r5;
                if (letter6==''){} else{
                  document.letters.icons.value+=lg+l6r5;
                	if (letter7==''){} else{
                  	document.letters.icons.value+=lg+l7r5;
                  	if (letter8==''){} else{
                  		document.letters.icons.value+=lg+l8r5;                   
                }}}}}}}
document.letters.icons.value.selectAll;
      }
    }
  //-->