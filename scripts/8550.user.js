// ==UserScript==
// @name          Asphsuite
// @namespace     http://www.asphalto.org/
// @version       0.04
// @description   Suite di Scripts per l'asphalto by Squeakthemouse
// @include       http://www.asphalto.org/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript=

/*
 * Ciao utente di asphalto, l'aver aperto questo file comportera' 
 * l'autodistruzione dei tuoi cari, per evitare tale terribile destino
 * non devi leggere questo messaggio.
 */
 
/* Per piazzare una toolbar per la asphsuite */
function ASGetHtmlButton(butname,butid,butlabel,func)
{
	button = document.createElement("input");
	button.style.border = "1px solid black";
	button.style.width = "100px";
	button.type = "button";
	button.name = butname;
  button.value = butlabel;
  button.id = butid;
  button.addEventListener('mousedown',func,false);
  
  return button;
}

function ASConfigForm()
{
	var formtext = '<form><input type="text"';
}

function ASCheckFirstRun()
{
	var configured = GM_getValue('ASConfigured','');
	if (configured != 'yes') {
		if (document.baseURI.substring(0,35) != 'http://www.asphalto.org/go/user_id/')
		{
			alert("sembra che sia la prima volta che esegui asphsuite\nadesso premi ok e poi passa nel tuo userthread");
		} 
		else 
		{
			var userid = document.baseURI.substring(35);
			var main_titileXPATH = document.evaluate("//td[@id='main_title']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			var main_title_div = main_titileXPATH.snapshotItem(0);
			var username = main_title_div.childNodes[2].textContent.substring(6)
			GM_setValue('ASConfigured','yes');
			GM_setValue('ASUsername',username);
			GM_setValue('ASUserid',userid);
			alert("Ciao "+username+" la configurazione e' completata\nadesso puoi iniziare ad usare Asphalto Suite");
		}
	}
}

function ASToolbarInit()
{
	/*
	var logo = document.createElement('img');
	logo.src = "data:image/gif,GIF89a%91%00F%00%E3%0F%00%C7%C7%C7%B7%B7%B7%A6%A6%A6%F8%F8%F8%D7%D7%D7%13%13%13%94%94%94~~~%E6%E6%E6aaa%40%40%40%F2%F2%F2%FC%FC%FC%FD%FD%FD%FE%FE%FE%FF%FF%FF!%FE%15Created%20with%20The%20GIMP%00%2C%00%00%00%00%91%00F%00%00%04%FEP%C9I%AB%BD8%EB%CDoQ_%11%82%E4'%99%266%9E%24%DBR(X%18%0F%C3%0Cx%3E%D8Mc%EB%B9%06p%B0(%1A%8BD%23%02%B1%60%1E%9BI%E7%F2I-N%97%D8l%B6%F9t%26%A3%D5%9C%F1%2B%BC-p%E73%3A%98%10%3C%DE%F0%B8%7C.w%D0%EF%F8%BC~%CF%EF%FB%FF%0Fm%80u%83%85%86%87%88%7F%0Dv%81%01%89%8F%90%91%84s%0E%8C%89%0E%0Dp%09%8E%90%95%80%0E%00%06%07%09%A4%09%07%01%0C%92p%96%8B%96%96%AA~%07nq%AF%7F%0C%99%7D%0B%01%A4%B2%01%00%00%01%06%09%0A%07%08%97%AE%B0%97p%B2%88%B5y%8C%0B%02%A4%01%B8s%BB%0A%06%99%9E%C9%DC%7D%95v%CC%DDs%0C%06%0A%09%04%7C%00%E6%0B%AAv%CE%E2w%DB%82%F0p%0B%A4%E8%CFr%A6%F4%CA%85%8C%A7%FC%1E%EC%A2%91%0BX%80%03%C4%04%00%60%F7%E0%5D%3BJ%DD6%C1%AAe%AFX%1F%04%C2%0E%18PH%00%80%00%84%FE%06%18%06%A4%D5%EE%DF%ACn%04%B0%F9%09%80%CD%18%1D%02%C3%5C%E6%E3%E3%F0%8D%3Bx%00%BB%A9%3B%B9%C7%81%AFIq%04(%00%60%C8%15%B2%91rr%26%13J%94%5B9%7C%9F%E2!%B5%F9Fi%24%3B%2Ce%3Er6%0A%A8%9Em%C7%3E!%18%D0%B0*%CFH)%A1v%5B%A0%40%ED%D4C%03%10%A4Z%C6%B3%A6%9F%01%E7%B6%AEzw%E0%C0%5B%92%83pP%7D%10%8E%8E%5D%3C%7D%3B%1DV7%F7%2FX%9B%8F%CBRb%B4%11%CFa%C0%2CE%FA%B9%5C%8F%0B%02%05%229%8B%3B%DA%A7%F0%23%B6M%FFD%BE%B3%AB%D4%B0%02Z%F5%2C%92%E4p%F5%AA%03%A9%09%9FE%24%CD%9F%B3W%00%A6a%E98%CC%ADe%D1%DE%00K%9Ec%AF%80%1B%CA%BB%0D%B15%8E6w%9C%A7%8Eo.%BF%13%5C%94_8%95!%89%FA%FBF%5D%EC%80%DF%1Eh%B3%ED%40Pb%F0%9C%12%D9%B3%3Eu%DF%E0%9E%25%E3%A4%3A%F3%C6%3D%0D%E8%90%EC%FE%F2%0Ar%CA%01%F2%19%7D%0F%DDG%DA%03%E3%0D%23%00F4%BCg%16%24%12J%85%9F!%C2%C0s%98'%0E%94%A3%C0g%C2%80%E0W%85V%19%D2%80D%FC%D4%F4%99fo%D9%11%1Cn%BC%BCa%C0%07%0C%26%10G%89%85%B0%25%13%81%92L%B7%19M%05%DE%B1%CF%00%20%18%C3%960%0Bt%05%DE%2C%3C%C6%81%40%02%2C%16E%20%7F%FD%C5%D7%CDa%1F%BDA%CC%1B%1F%7Df%8EV%E14%09%07L%D5L%25%00A%BA%5DX%87%98c%F65LCr%3D%80%17%01'nt%80H%E1!%02%C0w%DB%F1%13%5C%11i~e%98!%04%04%20%94)%09%CCp%A3%02%9A%98%93%C0%5Cy%1E%B2'y%0F%3C%19L%20%08%CEQh%00.%89%09%D3%09'%99%B7%0Ch%0F%08%85%C3P2F%07%C8A%94%B2%95%00%00D%9E'%079%09%18%20%8C%01%8D%E1%91%AB(%2CY%C4%12%01%0CmD%00%0Dx%0D%D5V%7F%B3Dj%C8%99%94%FE%82(P%02e%BEt%00%01h%2C%94%07L%DF%25%09%C2%ABqH%C0mp%00(%CA%40%01%08%BD%F1%19%3E%CA%0E%92%12%9Ao%F5%D6%C8%1E%C1%20j%D1*r%A4D%CA%03%EB%A6%D4%04T%AFf%F8'%08%01%A4%95%90)%00%1EbO%AD%94%0A%B2%0BYr%0A%93%DB%93%9B%00%8B%804%0C%7D%E3%89%3A%BE%C8%A2%80%1BIz%88%CE%B9%08Oj%8A%04D%05%B7%E5%92%88%F4E%00%9FS%11I%00%03%0Ap%82%80Fgj%23%D0n%D4R%E5%C9gn%10%F0%01%3E%ED%19KT%00%1F%40Y%EAF%05%ECic%B4(%1B%F2%19%13%09%C8%3A%C8%80z%A8c%0AA%F6%9C%B5%8DQk%CA%890%BE%1F%DE(%8D_)%01%903%83%1F%04%E0%00%0Ek3pT%BA%5E%C9%11%5CC%DC%0E%CAM%031%0B%B5%0C%0D%08%98%CD%88%25%04%3C%D8%D0%80XA%FB%00%5B%7C%92%23%C1%01%03%84%CB%EEg%01%905%1B%0F%B3%5D%A7*%1F%FEY%96%CA%F2'M%96S%95%23d%1E%A42%BD%C2%90%E2R%E5o0%80%9B%D7%090%8C%D7%AB%F8%047%8F%3A%04%F5%B0%C8%22%B7X%9C%EA!%B6%9AktQ%80%D8%1B%D2%93%03%18%901%3B%82%8D%19u%204%DC%0Ex%EB%CF%1En%C0%A9D%D9%07%F6%04L%FA%E0v%25%3D%0C%5Ep!%BDW9%D2%89CI3%F3%99%07Q'%D0w%BB%ACRM%FB%84%8DX%00%3B%08%1F%40.%23%0Ev%8A%C9-%DB%5BlIx%7F%F3C%F84g%B7%1F%E9a%17%EA%20%00%13%D4%E1-%86i%0Az%12r%C0%F6Je%23%81%A4%00%1D%BD%11%CA%96%84%E1%40%EF5%04%17%EE%C0D%D3%0A%C1%AA7%F8%E8J%26%3C%16K%C8%D2%97_(%09%0E%1E%91%93%A3%3E%C4%A1%DC%3D%60'dI%C9(%88%B2.l%B0E%02%C6h%85v%D2%23%C4j(%0B90q%A0%BB%EE%23%89%D7Y%A4%85a%AB%CA%C3Da%0A%84%A0%A3%1A%DB%CB%C4%FE%A1%D8%81-%82H%00%1F0A%87%3Bl%B7%9E5%DD%82KL%0A%0C%AAR%A7%11q%C0%24%01%0E%E8%D2(F%81%A6%95u%900%8C*%95%950%91%9E%C3%A1%EAI%BD%C1X%3C%B8W%8D%C7%CC%86%11%02H%E3%1F%F0B%AE8%E0es%91%60%C9%D72%E2%3B%26%D5%CD%5CQ%14%00'%8C%82H%05%E4%F0U%B5%DA%D8%07%DF%D0%03%3B%DC%CEm%90%A1Z%F7Ju%B9%3C4%E7%03%9A%B1%87%95%1E%A1%BA%A4%D9%C3%18%08p%0E%1C%9E%E6%8B%F0i%AB%82I2%06%87lg%87%03%C9(j%1Fh%CA7%CE8%B8f%AA'%84%8C%D0%C6l%129%08%B6%88%40%04g%E1Y'v%D1%17%BFP%93H%04I%C5G%CE%90%A5%CF%D0%2C%15%F6c%C7%D6%D4%D3%90%F7%B0%25r%82%93%8C%04Mi3R%BE%E31%CC%FA%C3%93%AE)%82%0A%C6A%87R%E3%83.%1C%24%A7QD%AE*%15T%C8%9C4g%0F4%7D%84%18%129%E4.%FE%A3%F8%C2%C1%A1N%88e%E9%23%BD%E0%C0Lj%AED%06%FCL%DAF%ED%B1%B1(%E1"+
						 "%A1%09%071%87%00%5E%D1%1A%B3I%80%1DL%20%8C%23%12e%0E84%AE%006%22%00TBXPc%94C%98%A5%ACD%FF%FAwH%11%3E%86%7B6%B0%83G-c.%FB%85%F4%9A%A4%9A%83%D2%04%00%ACB%C6%25p%1B%F1N%AD2%15%C7a%D8%E9%3A0%0A%0E%3AB!%0A%5EA%060g%C2%CEF%F9%B8%B5%00%3E%93%90%1FD*%1A%99h%0D%90%3E%B5%9F%26%C5%17B%1C%E5%1A%5Epd%2C%7D%D8D%7B%F84%A3%B0%91%E5%40%80%9A%99%3A%FBt%C3%0Ft%0Au%DF%00a)S%E9%3E%F5%04%95%11%97z%86%00%EEz%D75%D6U!%86%F2%85N%03%0A%11%93%1C%8E%5B)%C9%A7%8C6'%98%05%A9C%9Dv%40%A5%CE%D2%83%09%8C%D2%2B%A8%13%9C%2B%1E%F6%C9%D9%90n%8C%18%B0%92S%A1%102%CB7%C4%E5B%60%19%0F%BE%DA%FE%F0%B5%C3%15%CA%B3%F2%DC%A8M%88P%83%CA%1DR%88g%24%E4z%2C%86J%1F%F4%D1Px%10Jo%7D%FB%B1QT%60%5E%AAx%9A%8C%0A%10%1F%96%A4%CD0%20d%AC%04%5B%A13%C8%C8%B6%07%FD%A3%EDu%9D%09%DE%ED%C0d%BC%E4%8D%C3%02%3A%02%00%D2%1A%B0%16%7Di%40%C0%E2%93%92%ACH%F7%2B%DC%B3%EC%DF%8E%CAG%DC%DD%82%98%12~%C7R%CB%E3T%00C%95(%1A%8D%04F%18%91%ABJ%C5h%00%C1%10%854%F6HW%92%98%D2m%DE%0D%60m%C7%C8%5D%ED%A1r%9D%60Qmp%3C%1C%D2l%BC5%19%D6%03%8B%8B%3C)%5E%03%FC%E2%92q3%1B%25%7C%40%D9%BD%88%B0!7%C8%9D%F6%22%EC%3FKP%F3%BF%3C%FEp%EA%06%E0V9%24%0F%22%86AH%5E%BD%B6%0B%E7%14%83%14%D8%08%C0%98GX%E1%B9%40s%C2%1E%9C%2F%94%93%BA%3F%89%06%A5%2FY%E6%E7%F2%7C%B0%83.%3B%09Eq%7B%C3%A7H%FB%FE%91r%9C%C95%9F%F9%99%F4%10D%25%C8d%E2S%9B%941O-%B6%88%3E%97%B2rV%CE3%3F%BF%93T%D4%D1%EBo-%BDc%BD%CA%C18%A6RQ!%04%95%C5%07%A6uZv%E1a%9A%D7%B4%11%1F%075Fm%F0%A0%CA%AB%2C%95%A6%DF%5B%03%FE%C9%B6k%F5%90%C6%D54%19%80bS%D1%1C%EA%93%1B%B9%8A%1D%8Ek%14%C0-%3A%E5%B2%93%DD%91%8Ap%F5S%8Cl%95'Xn'%CDYk%F7%0DD%CB21%F4%C7%3D%DA%86%D0%D3c%3AS7%BBi%BC5%93D%14%1Dic%A5%CC!%8C%BEu%D2%1C%92%2B%F7l%18%18O%9E%12%02%C76q%DE%8C-%11n%0F%DF)%E0%98%AEa%260%0D%17Q%D3%EBi%A8%81!%B0%8C%8C%80%F4%3C%E9%006%D3%1D9r3%D9%DF%0Cf%C2l%A5t%1C%0A%DE%DB5%06u%2FAe84'%E1%F1%13%ED%D1%19%1E%3A%40d%E0%97%8F%94%7F%3A%B2%F1%0D%12%EEH%AC%3B%80O%90%FC%A9%1B%23%8BQw%20Onk'%A3L%D4%1D%25Ha%D2Z%A8%D6E%C4%92K%97OnY'%7B%CF%13%0C%9F%0C%D2%03%BEN%0Br6%24L%CCb%5C%A7%9C%EB%3A80%C4%BBdzT%FA%93%B8W%90%A5%D3q%C0%B0%D2%A9%B6%1CS%1E%1D(X%B9%EB%F2%EC%B6%3F%9C%F3%C0n%2BS%DF%00%86%85%0D%87%9FU%EB%9B%0D%98%18%E5%04%CF%B0%D9%90%08%B1%85%AB3W%D1%18%0E%1D%F5%C1%04%8F%00%00%3B";
	document.body.insertBefore(logo, document.body.firstChild);
	*/

	//Localizza il div con id="head"
	var headdivXPATH = document.evaluate("//div[@id='head']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var headdiv = headdivXPATH.snapshotItem(0);

	//gino = headdiv.appendChild(ASGetHtmlButton("nome","id","label",vai));

	//SOLO SE SIAMO IN VISUALIZZAZIONE CATEGORIE
	if (window.location.href.indexOf('category_id') != -1) {
		gino = headdiv.appendChild(ASGetHtmlButton("nome","id","Asphlode",ASOpenAllUnread));
	}
}

function ASYouTubePlayerNode(videoid)
{
	var youtubehtmltext = '<object width="425" height="350"><param name="movie" value="http://www.youtube.com/v/'+videoid+'"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+videoid+'" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350"></embed></object>';
	var container = document.createElement('div');
	container.innerHTML = youtubehtmltext;
	return container;
}

function ASGetTextNode(data)
{
	var container = document.createTextNode(data);
	return container;
}

function ASGetDivNode(data)
{
	var container = document.createElement('div');
	container.innerHTML = data;
	return container;
}

function ASYouTube()
{
	//http://www.youtube.com/watch?v=MqySp7Nq5j0
	if (window.location.href.indexOf('post_id') != -1) 
	{
		var alerttext = '';
		var youtubelinksXPATH = document.evaluate("//td[@class='post_text']/div/a[contains(@href, 'http://www.youtube.com/watch?v=')] | //td[@class='main_post_text']/a[contains(@href, 'http://www.youtube.com/watch?v=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i=0;i< youtubelinksXPATH.snapshotLength;i++) 
		{
			//Qui per evitare che i link a youtube nelle sign vengano espansi
			if (youtubelinksXPATH.snapshotItem(i).parentNode.getAttribute('class') != 'signature') 
			{
				//Separo l'url dalla querystring
				tmpar = youtubelinksXPATH.snapshotItem(i).href.split('=');
				//Splitto sui parametri della querystring ed uso sempre il primo elemento
				videoid = tmpar[1].split('&');
				//alerttext = alerttext + "["+ youtubelinksXPATH.snapshotItem(i).href+"]["+videoid[0]+"]\n";
				var insertedElement = youtubelinksXPATH.snapshotItem(i).parentNode.insertBefore(ASYouTubePlayerNode(videoid[0]), youtubelinksXPATH.snapshotItem(i));
			}
		}
		//alert(alerttext);
	}
}

function ASImagesGetLabel(data)
{
	var gino = ASGetDivNode(data);
	gino.style.backgroundColor = 'white';
	gino.style.color = 'black';
	gino.style.height = '15px';
	gino.style.borderStyle = 'solid';
	gino.style.borderColor = 'gray';
	gino.style.borderWidth = '1px';
	return gino;
}

function ASImages()
{
	if (window.location.href.indexOf('post_id') != -1) 
	{
		//PER LE IMMAGINI NEL POST A CAPO THREAD
		var actual_content = document.getElementById('actual_content');
		var maxImgWidth = actual_content.clientWidth-10;
		var frasearguta = ' [purtroppo per te Asshrink non &egrave; in grado di restringere anche il tuo culo]';
		
		actual_content.style.overflow = 'hidden';
		var actual_content_imgtagsXPATH = document.evaluate("//div[@id='actual_content']//td[@class='main_post_text']/img | //td[@class='main_post_text']/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i=0;i< actual_content_imgtagsXPATH.snapshotLength;i++) 
		{
			if (actual_content_imgtagsXPATH.snapshotItem(i).width > maxImgWidth)
			{
				actual_content_imgtagsXPATH.snapshotItem(i).width = maxImgWidth;
				var gino = ASImagesGetLabel(frasearguta);
				var insertedElement = actual_content_imgtagsXPATH.snapshotItem(i).parentNode.insertBefore(gino, actual_content_imgtagsXPATH.snapshotItem(i));
			}
		}

		var imgtagsXPATH = document.evaluate("//td[@class='post_text']/div/img | //td[@class='post_text']/div/blockquote/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i=0;i< imgtagsXPATH.snapshotLength;i++) 
		{
			if (imgtagsXPATH.snapshotItem(i).width > imgtagsXPATH.snapshotItem(i).parentNode.clientWidth)
			{
				//alerttext = alerttext + "["+ imgtagsXPATH.snapshotItem(i).src+"]["+imgtagsXPATH.snapshotItem(i).parentNode.clientWidth+"]\n";
				imgtagsXPATH.snapshotItem(i).width = imgtagsXPATH.snapshotItem(i).parentNode.clientWidth;
				var gino = ASImagesGetLabel(frasearguta);
				var insertedElement = imgtagsXPATH.snapshotItem(i).parentNode.insertBefore(gino, imgtagsXPATH.snapshotItem(i));
			}
		}
		//alert(alerttext);
	}
}

function vai()
{
	alert("vado");
	browser.addtab("http://www.google.com");
}

function ASOpenAllUnread()
{
	//Per vedere se l'utente e' mod
	var ismodXPATH = document.evaluate("//div[@id='head']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var modstringcheck = 'Sei un mod.';
	if (ismodXPATH.snapshotItem(0).innerHTML.indexOf('Sei un mod.') == -1)
	{
		userIsMod = false;
	}
	else
	{
		userIsMod = true;
	}
	
	var username = GM_getValue('ASUsername');
	var userid   = GM_getValue('ASUserid');
	var unreadThreadsXPATH = document.evaluate("//span[@class='unread']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var alerttext;
	var MAXOPEN = 6;			// Massimo numero di tab da aprire
	var TABTIMING = 1500; // un secondo e mezzo tra un tab e l'altro
	var SOGLIARATINGMOD = -2;
	alerttext = userid+"\n";
	for (var i=0;i< unreadThreadsXPATH.snapshotLength;i++) {
		ratingIdx = unreadThreadsXPATH.snapshotItem(i).innerHTML.indexOf('rating ')+7;
		rating = unreadThreadsXPATH.snapshotItem(i).innerHTML.substring(ratingIdx)* 1; //Moltiplico per 1 per trasformare la stringa in numero
		if 
		(
			(unreadThreadsXPATH.snapshotItem(i).childNodes[1].className == 'unregistered_user')
			||
			(unreadThreadsXPATH.snapshotItem(i).childNodes[1].href.indexOf(userid) == -1 
				//SE NON E' 'mai letto'
				&& unreadThreadsXPATH.snapshotItem(i).parentNode.childNodes[3].innerHTML.indexOf('mai letto') == -1 
				//SE non oltrepassa il limite di tabs da aprire
				&& MAXOPEN > 0 
				//SE E' mod deve mostrare anche quelli sotto la soglia
				//&& (userIsMod || !(unreadThreadsXPATH.snapshotItem(i).parentNode.parentNode.getAttribute('class') == 'collapsed_ignored_info'))
				&& (userIsMod || !(rating < SOGLIARATINGMOD))
			)
		)
		{	//ALLORA APRILO
				addr = unreadThreadsXPATH.snapshotItem(i).parentNode.childNodes[3].getAttribute('href')
				//alerttext= alerttext + "["+unreadThreadsXPATH.snapshotItem(i).parentNode.parentNode.getAttribute('class')+ "]["+addr + "]\n";
				setTimeout('window.open("' + addr + '");', i*TABTIMING);
				MAXOPEN--;
				//alert(addr);
		}
	}	
	//alert(alerttext);
	setTimeout('window.location.reload()', 12000);
}

function main()
{
	ASCheckFirstRun();
	ASToolbarInit();
	ASYouTube();
	ASImages();
}

main();