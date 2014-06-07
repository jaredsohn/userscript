// ==UserScript==
// @name           The West_-_BBcode
// @description    Tous les BBcode pour le forum du jeu
// @namespace      http://ryuuku.olympe-network.com/
// @include        http://*.the-west.*
// @exclude        http://ryuuku.olympe-network.com/
// @version        1.27
// @author         Hack.Crows
// @copyright      Hack.Crows/ryuuku
// ==/UserScript==

// Modified by Hack.Crows
	  
	  
// ======== Variables du jeux ========
      
      var TW_Use_Cache  = true;
      var TW_Image_Base = "/graphic/";
      var TW_World      = null;
      var TWT_World     = null;
      var TW_Domain     = null;
      var TW_DotWhat    = null;
      var TW_Hash       = null;
      var TW_Screen     = null;
      var TW_Mode       = null;
      var TW_Is_Premium = false;
      var TW_Quickbar   = null;
      var TW_Village_Id = null;
      var TW_Player_Id  = null;
      var TW_Villages   = null;
      var TW_Lang       = null;
      var TW_Mpt        = null;
      var TW_Is_Opera   = window.opera ? true : false;
        
      // ======== Hagamos los cambios ========
      
      (function(){

      	if (location.href.match( /forum\.php/ )) {
      		CambiaForo();
      		return;
      	}

      	if (location.href.match( /messages/ )) {
      		CambiaCuadroTexto();
      		//return;
      	}

      })();

      function CambiaForo() {
      	
      	var adframes = $$("iframe");
      	for (i = 0; i < adframes.length; i++) {
      		adframes[i].src = 'about:blank';
      	}
      	var posts = $$("div");
      	for (i = 0; i < posts.length; i++) {
      		if (posts[i].innerHTML.match(/<iframe/,"gi") != null) {
      			posts[i].style.display = "none";
      		}
      	}
      	
      	CambiaCuadroTexto();
      }
      
      function CambiaCuadroTexto() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table class='bbcodearea'>" +
      	"<tr>" +
  		    ' <td><a tabindex="P" href="javascript:insertBB(\'player\','+random+');"><img src="http://yad.wz.cz/ext/t-w/player.png" alt="Joueur" /></a></td>' +
      		' <td><a tabindex="T" href="javascript:insertBB(\'town\','+random+');"><img src="http://yad.wz.cz/ext/t-w/city.png" alt="Ville" /></a></td>' +
      		' <td><a tabindex="F" href="javascript:insertBB(\'fort\','+random+');"><img src="http://s03.radikal.ru/i176/0909/6a/4138ab37110a.png" alt="Fort" /></a></td>' +
      		' <td><a tabindex="B" href="javascript:insertBB(\'b\','+random+');"><img src="http://yad.wz.cz/ext/t-w/b.png" alt="Gras" /></a></td>' +
      		' <td><a tabindex="I" href="javascript:insertBB(\'i\','+random+');"><img src="http://yad.wz.cz/ext/t-w/i.png" alt="Italique" /></a></td>' +
      		' <td><a tabindex="U" href="javascript:insertBB(\'u\','+random+');"><img src="http://yad.wz.cz/ext/t-w/u.png" alt="Souligner" /></a></td>' +
      	    ' <td><a tabindex="del" href="javascript:insertBB(\'del\','+random+');"><img src="http://img45.xooimage.com/files/d/b/5/barrer-1a6e34b.png" alt="Barrer" /></a></td>' +
      		' <td><a tabindex="Q" href="javascript:insertBB(\'quote\','+random+');"><img src="http://img45.xooimage.com/files/f/f/d/quote-1a6dd73.png" alt="Citez" /></a></td>' +
      		' <td><a tabindex="url" href="javascript:insertBB(\'url\','+random+');"><img src="http://yad.wz.cz/ext/t-w/url.png" alt="URL" /></a></td>' +
      		' <td><a tabindex="img" href="javascript:insertBB(\'img\','+random+');"><img src="http://img23.xooimage.com/files/2/9/1/img-1a6dd4f.png" alt="Image" /></a></td>' +
		    ' <td><a tabindex="20px" href="javascript:insertBB(\'large text\','+random+');"><img src="http://img43.xooimage.com/files/5/2/e/20px-1a6e002.png" alt="20px"/></a></td>' +
		    ' <td><a tabindex="_px" href="javascript:insertBB(\'small_text\','+random+');"><img src="http://img47.xooimage.com/files/6/8/2/8px-1a6dfef.png" alt="8px"/></a></td>' +
			' <td><a tabindex="code" href="javascript:insertBB(\'code\','+random+');"><img src="http://img49.xooimage.com/files/9/1/1/code-1a6e15d.png" alt="Code"/></a></td>' +    
		"</tr>" +
		    ' <td><a tabindex="25" href="javascript:insertBB(\'black text\','+random+');"><img src="http://img45.xooimage.com/files/1/c/4/noir-1a6e099.png" alt="Noir"/></a></td>' +	
			' <td><a tabindex="26" href="javascript:insertBB(\'white text\','+random+');"><img src="http://img29.xooimage.com/files/3/4/9/blan-1a6e05d.png" alt="Blanc"/></a></td>' +
		    ' <td><a tabindex="27" href="javascript:insertBB(\'red text\','+random+');"><img src="http://img43.xooimage.com/files/0/3/9/rouge-1a6e0a8.png" alt="Rouge"/></a></td>' +	
		    ' <td><a tabindex="28" href="javascript:insertBB(\'yellow text\','+random+');"><img src="http://img25.xooimage.com/files/9/0/9/jaune-1a6e08e.png" alt="Jaune"/></a></td>' +
		    ' <td><a tabindex="29" href="javascript:insertBB(\'green text\','+random+');"><img src="http://img45.xooimage.com/files/6/4/f/vert-1a6e0bb.png" alt="Vert"/></a></td>' +
		    ' <td><a tabindex="30" href="javascript:insertBB(\'cyan text\','+random+');"><img src="http://img41.xooimage.com/files/a/9/3/cyan-1a6e07c.png" alt="Cyan"/></a></td>' +
		    ' <td><a tabindex="31" href="javascript:insertBB(\'blue text\','+random+');"><img src="http://img23.xooimage.com/files/c/f/8/bleu-1a6e066.png" alt="Bleu"/></a></td>' +
		    ' <td><a tabindex="32" href="javascript:insertBB(\'violet text\','+random+');"><img src="http://img45.xooimage.com/files/a/5/5/violet-1a6e0be.png" alt="Violet"/></a></td>' +
      	"</tr>" +
            ' <td><a tabindex="1" href="javascript:insertBB(\'smily slt\','+random+');"><img src="http://img1.xooimage.com/files/d/b/a/bye-1--1a65.gif" /></a></td>' +
            ' <td><a tabindex="2" href="javascript:insertBB(\'smily GG\','+random+');"><img src="http://img1.xooimage.com/files/c/o/cool-1614.gif" /></a></td>' +
            ' <td><a tabindex="3" href="javascript:insertBB(\'smily ;p\','+random+');"><img src="http://img1.xooimage.com/files/e/5/4/72-18b0.gif" /></a></td>' +
            ' <td><a tabindex="4" href="javascript:insertBB(\'smily :]\','+random+');"><img src="http://img1.xooimage.com/files/2/f/1/0reves-1e6f.gif" /></a></td>' +
		    ' <td><a tabindex="5" href="javascript:insertBB(\'smily :L\','+random+');"><img src="http://img1.xooimage.com/files/a/c/e/27-1a12.gif" /></a></td>' +
            ' <td><a tabindex="6" href="javascript:insertBB(\'smily lol\','+random+');"><img src="http://img1.xooimage.com/files/5/f/c/28-1a13.gif" /></a></td>' +
            ' <td><a tabindex="7" href="javascript:insertBB(\'smily langue\','+random+');"><img src="http://img1.xooimage.com/files/4/3/7/67-1e78.gif" /></a></td>' +
            ' <td><a tabindex="9" href="javascript:insertBB(\'smily ;|\','+random+');"><img src="http://img1.xooimage.com/files/3/7/c/26-21d15.gif" /></a></td>' +
		    ' <td><a tabindex="10" href="javascript:insertBB(\'smily lol2\','+random+');"><img src="http://img1.xooimage.com/files/6/f/8/18-1e70.gif" /></a></td>' +
		    ' <td><a tabindex="11" href="javascript:insertBB(\'smily ??\','+random+');"><img src="http://img4.xooimage.com/files/7/4/9/02-77a26.gif" /></a></td>' +
		    ' <td><a tabindex="12" href="javascript:insertBB(\'smily Grrr\','+random+');"><img src="http://img1.xooimage.com/files/c/6/9/03-29f8f.gif" /></a></td>' +
		    ' <td><a tabindex="14" href="javascript:insertBB(\'smily miam\','+random+');"><img src="http://img1.xooimage.com/files/1/0/2/43-1e76.gif" /></a></td>' +
		"<tr>" +
			' <td><a tabindex="19" href="javascript:insertBB(\'smily mrgreen\','+random+');"><img src="http://img1.xooimage.com/files/m/r/mrgreen-161d.gif" /></a></td>' +
   		        ' <td><a tabindex="8" href="javascript:insertBB(\'smily mdr\','+random+');"><img src="http://img1.xooimage.com/files/7/b/1/mdr-1e780.gif" /></a></td>' +
			' <td><a tabindex="20" href="javascript:insertBB(\'smily fou\','+random+');"><img src="http://img3.xooimage.com/files/3/9/8/cfou-94e5d6.gif" /></a></td>' +
			' <td><a tabindex="15" href="javascript:insertBB(\'smily :(\','+random+');"><img src="http://img1.xooimage.com/files/0/f/f/17-18a9.gif" /></a></td>' +
			' <td><a tabindex="13" href="javascript:insertBB(\'smily xxx\','+random+');"><img src="http://img1.xooimage.com/files/r/e/redface-1621.gif" /></a></td>' +
			' <td><a tabindex="21" href="javascript:insertBB(\'smily love\','+random+');"><img src="http://img1.xooimage.com/files/3/3/f/amour21-283f.gif" /></a></td>' +
			' <td><a tabindex="22" href="javascript:insertBB(\'smily slurp\','+random+');"><img src="http://img1.xooimage.com/files/3/7/5/droolpud-2e480.gif" /></a></td>' +
			' <td><a tabindex="23" href="javascript:insertBB(\'smily gun\','+random+');"><img src="http://img1.xooimage.com/files/f/8/3/2guns-19b4.gif" /></a></td>' +
			' <td><a tabindex="24" href="javascript:insertBB(\'smily ;(\','+random+');"><img src="http://img1.xooimage.com/files/b/5/9/crybaby-1928.gif" /></a></td>' +
			' <td><a tabindex="16" href="javascript:insertBB(\'smily biz\','+random+');"><img src="http://img1.xooimage.com/files/8/5/2/ktf-221e5.gif" /></a></td>' +
			' <td><a tabindex="25" href="javascript:insertBB(\'smily Fusil\','+random+');"><img src="http://www.kolobok.us/smiles/madhouse/hunter.gif" /></a></td>'+
			' <td><a tabindex="28" href="javascript:insertBB(\'smily biere\','+random+');"><img src="http://www.pixelvalley.com/forum/img/smilies/binouse.gif" /></a></td>' +
		"<tr>" +
			' <td><a tabindex="26" href="javascript:insertBB(\'smily siffle\','+random+');"><img src="http://www.pixelvalley.com/forum/img/smilies/sifle.gif" /></a></td>' +
			' <td><a tabindex="31" href="javascript:insertBB(\'smily coffee\','+random+');"><img src="http://www.yugiohfr.com/images/smileys/smiley18.gif" /></a></td>' +
			' <td><a tabindex="33" href="javascript:insertBB(\'smily cowboy\','+random+');"><img src="http://www.tchateur.org/image/smileys/cowboy.gif" /></a></td>' +
			' <td><a tabindex="32" href="javascript:insertBB(\'smily soldat\','+random+');"><img src="http://armuria.forumactif.com/users/1414/18/19/62/smiles/smiley.gif" /></a></td>' +
			' <td><a tabindex="29" href="javascript:insertBB(\'smily pompom\','+random+');"><img src="http://www.pixelvalley.com/forum/img/smilies/43.gif" /></a></td>' +
			' <td><a tabindex="27" href="javascript:insertBB(\'smily oreilles\','+random+');"><img src="http://www.pixelvalley.com/forum/img/smilies/Smiley-IPB-457.gif" /></a></td>' +
			' <td><a tabindex="30" href="javascript:insertBB(\'smily mange\','+random+');"><img src="http://www.pixelvalley.com/forum/img/smilies/Smiley-IPB-154.gif" /></a></td>' +
			' <td><a tabindex="17" href="javascript:insertBB(\'smily KO\','+random+');"><img src="http://img1.xooimage.com/files/4/f/6/stretcher-181a.gif" /></a></td>' +

	"</table>";

      	document.body.innerHTML = document.body.innerHTML.replace( /<textarea\s/gi, xhtml+"<textarea id=\"txt_"+random+"\" ");
      	
      	NuevaFuncionTW("insertBB", function(insertType, ident){
      
      			txt = document.getElementById("txt_"+ident);
      
      			var start = txt.selectionStart;
      			var end   = txt.selectionEnd;
      			var txtlength = 0;
      			var insertButton = '';
      			var txtinsertBefore = '';
      			var txtinsertAfter = '';
      			var selection = '';
      			var selectionBefore = '';
      			var selectionAfter = '';
      
      			switch (insertType) {
      				case 'player':
      					txtinsertBefore = "[player]";
      					txtinsertAfter = "[/player]";
      					insertButton = 'P';
      					break;
      					      					
      				case 'town':
      					txtinsertBefore = "[town]";
      					txtinsertAfter = "[/town]";
      					insertButton = 'T';
      					break;
 				case 'fort':
      					txtinsertBefore = "[fort]";
      					txtinsertAfter = "[/fort]";
      					insertButton = 'F';
      					break;
      				case 'b':
      					txtinsertBefore = "[b]";
      					txtinsertAfter = "[/b]";
      					insertButton = 'B';
      					break;
      				case 'i':
      					txtinsertBefore = "[i]";
      					txtinsertAfter = "[/i]";
      					insertButton = 'I';
      					break;
      				case 'u':
      					txtinsertBefore = "[u]";
      					txtinsertAfter = "[/u]";
      					insertButton = 'U';
      					break;
      				case 'del':
      					txtinsertBefore = "[del]";
      					txtinsertAfter = "[/del]";
      					insertButton = 'del';
      					break;
      				case 'quote':
      					txtinsertBefore = "[quote]";
      					txtinsertAfter = "[/quote]";
      					insertButton = 'Q';
      					break;
      				case 'url':
      					txtinsertBefore = "[url]";
      					txtinsertAfter = "[/url]";
      					insertButton = 'url';
      					break;
      				case 'img':
      					txtinsertBefore = "[img]";
      					txtinsertAfter = "[/img]";
      					insertButton = 'img';
      					break;
				case 'large text':
      					txtinsertBefore = "[size=20]";
      					txtinsertAfter = "[/size]";
      					insertButton = '20PX';
      					break;
				case 'small_text':
      					txtinsertBefore = "[size=8]";
      					txtinsertAfter = "[/size]";
      					insertButton = '8px';
      					break;
      				
      					case 'code':
      					txtinsertBefore = "[code]";
      					txtinsertAfter = "[/code]";
      					insertButton = 'code';
      					break;	
				case 'smily slt':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/d/b/a/bye-1--1a65.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '1';
      					break;
				case 'smily GG':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/c/o/cool-1614.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '2';
      					break;
				case 'smily ;p':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/e/5/4/72-18b0.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '3';
      					break;
                case 'smily :]':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/2/f/1/0reves-1e6f.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '4';
      					break;
				case 'smily :L':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/a/c/e/27-1a12.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '5';
      					break;
				case 'smily lol':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/5/f/c/28-1a13.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '6';
      					break;
                case 'smily langue':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/4/3/7/67-1e78.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '7';
      					break;
				case 'smily mdr':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/7/b/1/mdr-1e780.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '8';
      					break;
				case 'smily ;|':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/3/7/c/26-21d15.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '9';
      					break;
				case 'smily lol2':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/6/f/8/18-1e70.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '10';
      					break;
				case 'smily ??':
      					txtinsertBefore = "[img]http://img4.xooimage.com/files/7/4/9/02-77a26.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '11';
      					break;
				case 'smily Grrr':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/c/6/9/03-29f8f.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '12';
      					break;
				case 'smily xxx':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/r/e/redface-1621.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '13';
      					break;
				case 'smily miam':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/1/0/2/43-1e76.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '14';
      					break;
				case 'smily :(':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/0/f/f/17-18a9.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '15';
      					break;
				case 'smily biz':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/8/5/2/ktf-221e5.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '16';
      					break;
				case 'smily KO':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/4/f/6/stretcher-181a.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '17';
      					break;
				case 'smily mrgreen':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/m/r/mrgreen-161d.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '19';
      					break;
				case 'smily fou':
      					txtinsertBefore = "[img]http://img3.xooimage.com/files/3/9/8/cfou-94e5d6.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '20';
      					break;
				case 'smily love':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/3/3/f/amour21-283f.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '21';
      					break;
				case 'smily slurp':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/3/7/5/droolpud-2e480.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '22';
      					break;	
				case 'smily gun':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/f/8/3/2guns-19b4.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '23';
      					break;	
				case 'smily ;(':
      					txtinsertBefore = "[img]http://img1.xooimage.com/files/b/5/9/crybaby-1928.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '24';
      					break;		
				case 'black text':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = '25';
      					break;
				case 'white text':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = '26';
      					break;
				case 'red text':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = '27';
      					break;
				case 'yellow text':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = '28';
      					break;
				case 'green text':
      					txtinsertBefore = "[color=green]";
      					txtinsertAfter = "[/color]";
      					insertButton = '29';
      					break;
				case 'cyan text':
      					txtinsertBefore = "[color=cyan]";
      					txtinsertAfter = "[/color]";
      					insertButton = '30';
      					break;
				case 'blue text':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '31';
      					break;
				case 'violet text':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = '32';
      					break;
				case 'smily Fusil':
      					txtinsertBefore = "[img]http://www.kolobok.us/smiles/madhouse/hunter.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '25';
      					break;
				case 'smily siffle':
      					txtinsertBefore = "[img]http://www.pixelvalley.com/forum/img/smilies/sifle.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '26';
      					break;
				case 'smily oreilles':
      					txtinsertBefore = "[img]http://www.pixelvalley.com/forum/img/smilies/Smiley-IPB-457.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '27';
      					break;
				case 'smily biere':
      					txtinsertBefore = "[img]http://www.pixelvalley.com/forum/img/smilies/binouse.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '28';
      					break;
				case 'smily pompom':
      					txtinsertBefore = "[img]http://www.pixelvalley.com/forum/img/smilies/43.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '29';
      					break;
				case 'smily mange':
      					txtinsertBefore = "[img]http://www.pixelvalley.com/forum/img/smilies/Smiley-IPB-154.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '30';
      					break;
				case 'smily coffee':
      					txtinsertBefore = "[img]http://www.yugiohfr.com/images/smileys/smiley18.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '31';
      					break;
				case 'smily soldat':
      					txtinsertBefore = "[img]http://armuria.forumactif.com/users/1414/18/19/62/smiles/smiley.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '32';
      					break;
				case 'smily cowboy':
      					txtinsertBefore = "[img]http://www.tchateur.org/image/smileys/cowboy.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '33';
      					break;
      			}
      
      			if (start == end) {
      					txt.value = txt.value.substr(0, start) + txtinsertBefore + txtinsertAfter + txt.value.substr(end, txt.value.length);
      				} else {
      					txtlength = txt.value.length;
      					selection = txt.value.substr(start, (end - start));
      					selectionBefore = txt.value.substr(0, start);
      					selectionAfter = txt.value.substr(end, txtlength);
      
      					if (insertButton == 'V' && selection.match(/(\d+){3}([\/|]+){1}(\d+){3}/gi)) {
      						selection = selection.replace(/(.*)(\d+)(\d+)(\d+)([\/|]+){1}(\d+)(\d+)(\d+)(.*)/gi, "$2$3$4|$6$7$8");
      					}
      
      					txt.value = selectionBefore + txtinsertBefore + selection + txtinsertAfter + selectionAfter;
      					
      				}
      		});
      
      	
      }  
      
      
      // ======== Funciones necesarias ========
      
      // Atajos DOM
      function $(elm_id){
      	return document.getElementById(elm_id);
      }
      
      function $$(tag_name){
      	return document.getElementsByTagName(tag_name);
      }  
      
      function NuevaFuncionTW(func, new_func){
      
    	if(typeof unsafeWindow == "object"){
      		unsafeWindow[func] = new_func;
      	}else if(TW_Is_Opera){
      		window[func] = new_func;
      		/*
      		window.opera.defineMagicFunction(
      			func,
      			function(oRealFunc, oThis, oParam1, oParam2){
      				return oParam1.getElementById('oParam2').style;
      			}
      		);
    		*/
   	}
}