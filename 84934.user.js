// ==UserScript==
// @name          The-West Forum: Mesaj Panosu
// @description   Kasaba forumuna, mesaj yazarken kullanabileceğiniz "Mesaj Panosu" ekler.
// @author        misterNO
// @translator    JohnCooper
// @include       http://*.the-west.*/forum.php*
// ==/UserScript==


      // ======== Variables globales del juego ========

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

      	var xhtml = "<table class='bbcodearea'> " +
      		    "<tr>    " +
      		    '	<td><a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="http://www.imagebanana.com/img/yu3ntd12/thumb/player.png" alt="Oyuncu" title="Oyuncu Ekle" /></a></td>' +
      		    '	<td><a tabindex="11" href="javascript:insertBB(\'town\','+random+');"><img src="http://www.imagebanana.com/img/xx9z5zyt/town.png" alt="Şehir" title="Kasaba Ekle" /></a></td>' +
      		    '	<td><a tabindex="12" href="javascript:insertBB(\'fort\','+random+');"><img src="http://www.imagebanana.com/img/l1f541zh/thumb/fort.png" alt="Kale" title="Kale Ekle" /></a></td>' +
      		    '	<td><a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://www.imagebanana.com/img/4he4te09/thumb/fett.png" alt="B" title="Kalın" /></a></td>' +
      		    '	<td><a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://www.imagebanana.com/img/yce4vzz/thumb/kursiv.png" alt="I" title="Eğik Yazı" /></a></td>' +
      		    '	<td><a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://www.imagebanana.com/img/nkrit17k/thumb/unterstrichen.png" alt="U" title="Altı Çizik" /></a></td>' +
      		    '	<td><a tabindex="16" href="javascript:insertBB(\'del\','+random+');"><img src="http://www.imagebanana.com/img/hbm6cna0/thumb/durchgestrichen.png" alt="Del" title="Üstü Çizili" /></a></td>' +
      		    '	<td><a tabindex="17" href="javascript:insertBB(\'quote\','+random+');"><img src="http://www.imagebanana.com/img/yu7y886j/thumb/quote.png" alt="Alıntı" title="Alıntı Yap" /></a></td>' +
      		    '	<td><a tabindex="18" href="javascript:insertBB(\'url\','+random+');"><img src="http://www.imagebanana.com/img/ysea48dx/thumb/URL.png" alt="Link Ekle" title="Link Ekle" /></a></td>' +
      		    '	<td><a tabindex="19" href="javascript:insertBB(\'img\','+random+');"><img src="http://www.imagebanana.com/img/usjw743i/thumb/image.png" alt="Grafik Ekle" title="Grafik Ekle" /></a></td>' +
		    '	<td><a tabindex="20" href="javascript:insertBB(\'large text\','+random+');"><img src="http://www.imagebanana.com/img/ih8nf165/thumb/bigger.png" alt="Büyük (22)" title="Büyük (Boyut 22)" /></a></td>' +
		    '	<td><a tabindex="21" href="javascript:insertBB(\'small_text\','+random+');"><img src="http://www.imagebanana.com/img/i9ucjkke/thumb/smaller.png" alt="Küçük (10)" title="Küçük (Boyut 10)" /></a></td>' +
		    '	<td><a tabindex="28" href="javascript:insertBB(\'red text\','+random+');"><img src="http://www.imagebanana.com/img/2y7ig7em/thumb/rot.png" title="Kırmızı" /></a></td>' +
		    '	<td><a tabindex="29" href="javascript:insertBB(\'yellow text\','+random+');"><img src="http://www.imagebanana.com/img/z77annvr/thumb/gelb.png" title="Sarı" /></a></td>' +
		    '	<td><a tabindex="30" href="javascript:insertBB(\'green text\','+random+');"><img src="http://www.imagebanana.com/img/vxx6a897/thumb/grn.png" title="Yeşil" /></a></td>' +
		    '	<td><a tabindex="32" href="javascript:insertBB(\'blue text\','+random+');"><img src="http://www.imagebanana.com/img/ilcwbg3/thumb/blau.png" title="Mavi" /></a></td>' +
		    '	<td><a tabindex="33" href="javascript:insertBB(\'violet text\','+random+');"><img src="http://www.imagebanana.com/img/wd4xs3bu/thumb/violet.png" title="Mor" /></a></td>' +
		    '	<td><a tabindex="50" href="javascript:insertBB(\'Lachender Smiley\','+random+');"><img src="http://de6.the-west.de/images/chat/smiley_laugh.png" title="Gülen Smiley" /></a></td>' +
		    '	<td><a tabindex="51" href="javascript:insertBB(\'Frecher Smiley\','+random+');"><img src="http://de6.the-west.de/images/chat/smiley_tongue.png" title="Dil Çıkaran Smiley" /></a></td>' +
		    '	<td><a tabindex="52" href="javascript:insertBB(\'Ruhiger Smiley\','+random+');"><img src="http://de6.the-west.de/images/chat/smiley_01.png" title="Sessiz Smiley" /></a></td>' +
		    '	<td><a tabindex="53" href="javascript:insertBB(\'Erstaunter Smiley\','+random+');"><img src="http://de6.the-west.de/images/chat/smiley_oo.png" title="Şaşkın Smiley" /></a></td>' +
		    '	<td><a tabindex="54" href="javascript:insertBB(\'Trauriger Smiley\','+random+');"><img src="http://de6.the-west.de/images/chat/smiley_frown.png" title="Üzgün Smiley" /></a></td>' +

		    "</tr>   " +

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
      					insertButton = 'A';
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
      					txtinsertBefore = "[url=NULL]";
      					txtinsertAfter = "[/url]";
      					insertButton = 'L';
      					break;
      				case 'img':
      					txtinsertBefore = "[img]";
      					txtinsertAfter = "[/img]";
      					insertButton = 'M';
      					break;
				case 'large text':
      					txtinsertBefore = "[size=22]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'R';
      					break;
				case 'small_text':
      					txtinsertBefore = "[size=10]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'Small';
      					break;

      					case 'code':
      					txtinsertBefore = " [b][CODE][/b] [code]";
      					txtinsertAfter = "[/code]";
      					insertButton = 'code';
      					break;


				case 'Lachender Smiley':
      					txtinsertBefore = "[img]http://de6.the-west.de/images/chat/smiley_laugh.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '50';
      					break;
				case 'Frecher Smiley':
      					txtinsertBefore = "[img]http://de6.the-west.de/images/chat/smiley_tongue.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '51';
      					break;
				case 'Ruhiger Smiley':
      					txtinsertBefore = "[img]http://de6.the-west.de/images/chat/smiley_01.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '52';
      					break;
				case 'Erstaunter Smiley':
      					txtinsertBefore = "[img]http://de6.the-west.de/images/chat/smiley_oo.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '53';
      					break;
				case 'Trauriger Smiley':
      					txtinsertBefore = "[img]http://de6.the-west.de/images/chat/smiley_frown.png";
      					txtinsertAfter = "[/img]";
      					insertButton = '54';
      					break;

				case 'black text':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = '31';
      					break;
				case 'white text':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = '32';
      					break;
				case 'red text':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = '33';
      					break;
				case 'yellow text':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = '34';
      					break;
				case 'green text':
      					txtinsertBefore = "[color=green]";
      					txtinsertAfter = "[/color]";
      					insertButton = '35';
      					break;
				case 'cyan text':
      					txtinsertBefore = "[color=cyan]";
      					txtinsertAfter = "[/color]";
      					insertButton = '36';
      					break;
				case 'blue text':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '37';
      					break;
				case 'violet text':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = '38';
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

(function(){
	function getElementsByClassName(oElm, strTagName, strClassName){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		strClassName = strClassName.replace(/\-/g, "\\-");
		var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
		var oElement;
		for(var i=0; i<arrElements.length; i++){
			oElement = arrElements[i];
			if(oRegExp.test(oElement.className)){
				arrReturnElements.push(oElement);
			}
		}
		return (arrReturnElements);
	}

	c = getElementsByClassName(document,"table","forum_table")[0];
	trs = c.getElementsByTagName("tr");
	for(i=1;i<=trs.length;i++) {
		tds=trs[i].getElementsByTagName("td");
		themelink = tds[0].getElementsByTagName("a")[0].getAttribute('href');
		answers = tds[4].childNodes[0].nodeValue;
		lastpostauthor = tds[3].getElementsByTagName("a")[0];
		lastpostauthorparent = lastpostauthor.parentNode;
		temp = document.createElement('div');
		author = document.createElement('a');
		author.setAttribute('href',lastpostauthor.getAttribute('href'));
		author.innerHTML=lastpostauthor.childNodes[0].nodeValue+" ";
		temp.appendChild(author);
		page = Math.floor(answers/10);
//		jump = document.createElement('a');
//		jump.setAttribute('href',themelink+"&page_current="+page);
//		jump.innerHTML="<img src='http://img840.imageshack.us/img840/3862/nextu.gif'/>";
		temp.appendChild(jump);
		lastpostauthorparent.replaceChild(temp,lastpostauthor);
		lastpostauthorparent.removeChild(lastpostauthorparent.getElementsByTagName("br")[0]);
	}
})();