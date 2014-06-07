// ==UserScript==
// @name           YouTube Video Download
// @version        3.1
// @updateURL      https://userscripts.org/scripts/source/62634.meta.js
// @include        http://userscripts.org/scripts/source/62634.meta.js
// @include        http://*.youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
// ==/UserScript==

var version = "3.1";
var host = document.location.host;

function inject(func)
{
	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.appendChild(document.createTextNode("_ytd_localVersion=\"" + version + "\";(" + func + ")();"));
	document.body.appendChild(script);
}

if (host.substr(host.length - 11) == "youtube.com" && host != "m.youtube.com") inject(function() {
	var language = document.documentElement.getAttribute("lang");
	var watchFlag = document.getElementById("watch-flag");
	var currDate = new Date().getTime();
	var formats;
	var orderedFormats;
	var title;
	var channel;
	var button;
	var menu;
	var dlheader;
	var options;
	var updateMsg;
	var showUpdate;
	var sar = 16/9;
	var videoId;
	
	var translation = {
		"en": {
			errormsg: "Error: YouTube has been updated and YouTube Video Download is no longer compatible. ",
			errorlink: "Please click here to check for updates.",
			
			button: "Download",
			tip: "Save video to hard drive",
			
			low: "Low Quality",
			high: "Low Definition",
			
			lowdef: "Low Definition",
			stddef: "Standard Definition",
			highdef: "High Definition",
			fhighdef: "Full High Definition",
			
			origdef: "Original Definition",
			
			unknown: "Unknown Format",
			
			dlheader: "Choose a format to download:",
			nofmts: "Error: No download formats available.",
			update1: "A new version of YouTube Video Download is available.",
			update2: "Click here to update now.",
			
			options: "options",
			updatetoggle: " Check for updates",
			replacetoggle: " Replace video title",
			vinfotoggle: " Set visitor info cookie (advanced)",
			tformat: "Title format: ",
			apply: "apply",
			tformatinfo: "%t - video title\n%c - uploader\n%f - format number\n%v - video id\n%% - literal percent",
		},
		"cn": { // http://userscripts.org/users/349372
			errormsg: "??:??YouTube?????,YouTube????????YouTube????",
			errorlink: "??????????",
			
			button: "??",
			tip: "?????",
			
			low: "???",
			high: "????",
			
			lowdef: "????",
			stddef: "?????",
			highdef: "?????",
			fhighdef: "?????",
			
			origdef: "?????",
			
			unknown: "????",
			
			dlheader: "??????:",
			nofmts: "??:????????",
			update1: "?????YouTube????!",
			update2: "????????",
			
			options: "??",
			updatetoggle: " ????",
			replacetoggle: " ???",
			vinfotoggle: " ?????cookies??(??)",
			tformat: "????:",
			apply: "??",
			tformatinfo: "%t - ????\n%c - ???\n%f - ????\n%v - ??id\n%% - ???",
		},
		"cs": { // http://userscripts.org/users/janwatzek
			errormsg: "Chyba: YouTube byl aktualizovan a skript YouTube Video Download jiz neni kompatibilni. ",
			errorlink: "Prosim kliknete sem pro kontrolu, zda jsou dostupne aktualizace.",
			
			button: "Stahnout",
			tip: "Ulozit video na pevny disk",
			
			low: "Nizka kvalita",
			high: "Nizke rozliseni",
			
			lowdef: "Nizke rozliseni",
			stddef: "Standardni rozliseni",
			highdef: "Vysoke rozliseni",
			fhighdef: "Plne vysoke rozliseni",
			
			origdef: "Originalni rozliseni",
			
			unknown: "Neznamy format",
			
			dlheader: "Vyberte format ke stazeni:",
			nofmts: "Chyba: Zadne formaty nejsou dostupne ke stazeni.",
			update1: "Nova verze skriptu YouTube Video Download je dostupna ke stazeni!",
			update2: "Kliknete sem pro aktualizaci.",
			
			options: "nastaveni",
			updatetoggle: " Kontrolovat aktualizace",
			replacetoggle: " Prepsat nazev videa",
			vinfotoggle: " Nastavit info navstevnika - cookie (pokrocile)",
			tformat: "Format nazvu videa: ",
			apply: "pouzit",
			tformatinfo: "%t - nazev videa\n%c - uploader\n%f - cislo formatu\n%v - id videa\n%% - doslova procento",
		},
		"de": { // http://userscripts.org/users/348658
			errormsg: "Fehler: Die Youtube Seite wurde geandert und YouTube Video Download ist nicht mehr kompatibel. ",
			errorlink: "Bitte klicken sie hier, um auf Updates zu uberprufen.",
			
			button: "Download",
			tip: "Video auf der Festplatte speichern",
			
			low: "Niedrige Qualitat",
			high: "Niedrige Auflosung",
			
			lowdef: "Niedrige Auflosung",
			stddef: "Standard Auflosung",
			highdef: "HD",
			fhighdef: "Full HD",
			
			origdef: "Original Auflosung",
			
			unknown: "Unbekanntes Format",
			
			dlheader: "Download Format wahlen:",
			nofmts: "Fehler: Keine Download Formate vorhenden.",
			update1: "Eine neue Version von YouTube Video Download steht zur Verfugung.",
			update2: "Hier klicken um jetzt upzudaten.",
			
			options: "Einstellungen",
			updatetoggle: " Auf neue Version uberprufen",
			replacetoggle: " Video Titel ersetzen",
			vinfotoggle: " Besucher Info Cookie setzen (erweitert)",
			tformat: "Titel Format: ",
			apply: "anwenden",
			tformatinfo: "%t - Video Titel\n%c - Hochgeladen von\n%f - Format Nummer\n%v - Video ID\n%% - Prozentzeichen",
		},
		"es": { // http://userscripts.org/users/327867
			errormsg: "Error: YouTube ha sido actualizado y YouTube Video Download ya no es compatible. ",  
			errorlink: "Clic aqui para comprobar si hay  actualizaciones.",  
			
			button: "Descargar",  
			tip: "Descarga este video",  
			
			low: "Baja Calidad",  
			high: "Baja Definicion",  
			
			lowdef: "Baja Definicion",  
			stddef: "Definicion Estandar",  
			highdef: "Definicion HD",  
			fhighdef: "Definicion FullHD",  
			
			origdef: "Definicion Original",  
			
			unknown: "Formato Desconocido",  
			
			dlheader: "Elija un formato para descargar:",  
			nofmts: "Error: No hay formatos de descarga  disponibles.",  
			update1: "Una nueva version de YouTube Video Download  esta disponible.",  
			update2: "Click aqui para actualizar ahora.",  
			
			options: "Opciones",  
			updatetoggle: " Buscar actualizaciones",  
			replacetoggle: " Reemplazar titulo del video",  
			vinfotoggle: " Enviar cookie de visita (Avanzado)",  
			tformat: "Formato del Titulo: ",  
			apply: "Aplicar",  
			tformatinfo: "%t - Titulo\n%c - Uploader\n%f - Formato de numero\n%v - ID del Video\n%% - % Literal",  
		},
		"fr": { // http://userscripts.org/users/87056
			errormsg: "Erreur: Youtube a ete mis a jour et YouTube Video Download n'est plus compatible. ",
			errorlink: "Cliquer ici pour verifier les mises a jour.",
			
			button: "Telecharger",
			tip: "Telecharger cette video",
			
			low: "Basse Qualite",
			high: "Basse Definition",
			
			lowdef: "Basse Definition",
			stddef: "Definition Standard",
			highdef: "Haute Definition",
			fhighdef: "Tres Haute Definition",
			
			origdef: "Definition Originale",
			
			unknown: "Format Inconnu",
			
			dlheader: "Choisissez le format a telecharger:",
			nofmts: "Erreur: Pas de formats de telechargement disponible.",
			update1: "Une nouvelle version de YouTube Video Download est disponible.",
			update2: "Cliquer ici pour mettre a jour maintenant.",
			
			options: "options",
			updatetoggle: " Verifier les mises a jour",
			replacetoggle: " Modifier le nom de fichier de la video",
			vinfotoggle: " Enregister le cookie d'information du visiteur (avance)",
			tformat: "Format du nom de fichier: ",
			apply: "Appliquer",
			tformatinfo: "%t - titre de la video\n%c - uploader\n%f - numero du format\n%v - ID de la video\n%% - pourcentage litteral",
		},
		"it": { // http://userscripts.org/users/kharg
			errormsg: "Errore: YouTube \u00e8 stato aggiornato e YouTube Video Download non \u00e8 pi\u00d9 compatibile. ",
			errorlink: "Clicca qui per cercare degli aggiornamenti.",
			
			button: "Scarica",
			tip: "Salva il video nell'HD",
			
			low: "Bassa Qualit\u00e0",
			high: "Alta Qualit\u00e0",
			
			lowdef: "Bassa Definizione",
			stddef: "Qualit\u00e0 Standard",
			highdef: "Alta Definizione",
			fhighdef: "Alta Definizione",
			
			origdef: "Definizione Originale",
			
			dlheader: "Scegli un formato da scaricare:",
			nofmts: "Errore: Nessun formato da scaricare disponibile.",
			
			options: "opzioni",
			updatetoggle: " Controlla la disponibilita di aggiornamenti",
			replacetoggle: " Sostituisci il titolo del video",
			vinfotoggle: " Imposta informazioni cookie visitatori (avanzate)",
			tformat: "Formato titolo: ",
			apply: "applica",
			tformatinfo: "%t – titolo video\n%c – uploader\n%f – numero formato\n%v – id video\n%% – percentuale letterale",
		},
		"ja": { // http://userscripts.org/users/184613
			errormsg: "???: YouTube?????????????YouTube Video Download?????????????",
			errorlink: "??????????????????",
			
			button: "??????",
			tip: "??????????????",
			
			low: "???",
			high: "???",
			
			lowdef: "???",
			stddef: "?????",
			highdef: "???",
			fhighdef: "?????",
			
			origdef: "???????",
			
			unknown: "?????",
			
			dlheader: "?????????????:",
			nofmts: "???:???????????",
			update1: "YouTube Video Download????????",
			update2: "???????????????",
			
			options: "?????",
			updatetoggle: " ?????",
			replacetoggle: " ???????????",
			vinfotoggle: " ????????????? (??)",
			tformat: "???????: ",
			apply: "??",
			tformatinfo: "%t - ???????\n%c - ???\n%f - ????\n%v - ???ID\n%% - ?????",
		},
		"pl": { // http://userscripts.org/users/123591
			errormsg: "Blad: YouTube zostal zaktualizowany i YouTube Video Download przestal byc zgodny. ",
			errorlink: "Kliknij tutaj, aby sprawdzic dostepnosc aktualizacji.",
			
			button: "Pobierz",
			tip: "Zapisz film na twardym dysku",
			
			low: "Niska jakosc",
			high: "Niska rozdzielczosc",
			
			lowdef: "Niska rozdzielczosc",
			stddef: "Standardowa rozdzielczosc",
			highdef: "Wysoka rozdzielczosc",
			fhighdef: "Pelna wysoka rozdzielczosc",
			
			origdef: "Oryginalna rozdzielczosc",
			
			unknown: "Nieznany Format",
			
			dlheader: "Wybierz format do pobrania:",
			nofmts: "Blad: Nie dostepne formaty.",
			update1: "Nowa wersja YouTube Video Download jest dostepna.",
			update2: "Kliknij tutaj, aby zaktualizowac.",
			
			options: "opcje",
			updatetoggle: " Sprawdzaj aktualizacje",
			replacetoggle: " Zastap tytul filmu",
			vinfotoggle: " Set visitor info cookie (zaawansowane)",
			tformat: "Format Tytulu: ",
			apply: "zastosuj",
			tformatinfo: "%t - tytul filmu\n%c - nazwa przesylajacego\n%f - numer formatu\n%v - id filmu\n%% - doslownie procent",
		},
		"pt": { // http://userscripts.org/users/73303 (Brazilian Portuguese)
			errormsg: "Erro: Youtube foi modificado e o Youtube Video Download nao e mais compativel. ",
			errorlink: "Por favor clique aqui para procurar atualizacoes.",
			
			button: "Baixar",
			tip: "Salvar video para o disco",
			
			low: "Qualidade Baixa",
			high: "Definicao Baixa",
			
			lowdef: "Definicao Baixa",
			stddef: "Definicao Padrao",
			highdef: "Definicao Alta",
			fhighdef: "Definicao Maxima",
			
			origdef: "Definicao Original",
			
			unknown: "Formato Desconhecido",
			
			dlheader: "Escolha um formato para baixar:",
			nofmts: "Erro: Nenhum formato disponivel para baixar.",
			update1: "Uma nova versao do Youtube Video Download esta disponivel.",
			update2: "Clique aqui para atualizar agora.",
			
			options: "opcoes",
			updatetoggle: " Procurar por atualizacoes",
			replacetoggle: " Substituir titulo do video",
			vinfotoggle: " Usar cookie diferente para baixar (avancado)",
			tformat: "Formato do titulo: ",
			apply: "aplicar",
			tformatinfo: "%t - titulo do video\n%c - autor do video\n%f - numero do formato\n%v - id do video\n%% - % literal",
		},
		"ru": { // http://userscripts.org/users/121962
			errormsg: "Ошибка: YouTube был обновлен, поэтому YouTube Video Download больше не совместим. ",
			errorlink: "Нажмите тут для обновления.",
			
			button: "Скачать",
			tip: "Сохранить на жесткий диск",
			
			low: "Низкое Качество",
			high: "Низкое Разрешение",
			
			lowdef: "Низкое Разрешение",
			stddef: "Стандартное Разрешение",
			highdef: "Высокое Разрешение",
			fhighdef: "Самое высокое Разрешение",
			
			origdef: "Оригинальное Разрешение",
			
			unknown: "Неизвестный формат",
			
			dlheader: "Выберите формат для загрузки:",
			nofmts: "Ошибка: Нет загружаемых допустимых форматов.",
			update1: "Доступна новая версия YouTube Video Download.",
			update2: "Нажмите тут для обновления.",
			
			options: "настройки",
			updatetoggle: " Проверить обновления",
			replacetoggle: " Переместить видео",
			vinfotoggle: " Выставить куки посещения (доп)",
			tformat: "Формат заголовка: ",
			apply: "принять",
			tformatinfo: "%t - заголовок видео файла\n%c - имя загрузчика/автора\n%f - число файла\n%v - ид номер видео файла\n%% - буквальный процент",
		},
		"sr": { // http://userscripts.org/users/26334
			errormsg: "Грешка: YouTube је ажуриран и YouTube Видео Преузимач више није компатибилан. ",
			errorlink: "Кликните овде да проверите има ли надоградњи.",
			
			button: "Преузми",
			tip: "Сачувај видео на диск",
			
			low: "Низак квалитет",
			high: "Мала резолуција",
			
			lowdef: "Мала резолуција",
			stddef: "Стандардна резолуција",
			highdef: "Висока резолуција",
			fhighdef: "Full HD резолуција",
			
			origdef: "Оригинална резолуција",
			
			unknown: "Непознат формат",
			
			dlheader: "Изаберите формат видеа за преузимање:",
			nofmts: "Грешка: нема доступних формата.",
			update1: "Ново издање YouTube Видео Преузимача је доступно.",
			update2: "Кликните овде да ажурирате сада.",
			
			options: "опције",
			updatetoggle: " Провери надоградње",
			replacetoggle: " Замени назив видеа",
			vinfotoggle: " Постави колачић информације о посети (напредно)",
			tformat: "Формат наслова: ",
			apply: "примени",
			tformatinfo: "%t - наслов видеа\n%c - аутор\n%f - број формата\n%v - ИД видеа\n%% - постотак дословности",
		},
		"tr": { // http://userscripts.org/users/Kenterte
			errormsg: "Hata: YouTube sistemi guncellendi ve art?k YouTube Video Downloader'la uyumlu degil.. ",
			errorlink: "Guncellestirmeler icin lutfen t?klay?n?z.",
			
			button: "Indir",
			tip: "Videoyu Farkl? Kaydet",
			
			low: "Dusuk Kalite",
			high: "Dusuk Cozunurluk",
			
			lowdef: "Dusuk Cozunurluk",
			stddef: "Standart Cozunurluk",
			highdef: "Yuksek Cozunurluk",
			fhighdef: "Cok Yuksek Cozunurluk",
			
			origdef: "Orijinal Cozunurluk",
			
			unknown: "Bilinmeyen Format",
			
			dlheader: "Bir Indirme Format? Secin:",
			nofmts: "Hata: Format Bulunamad?.",
			update1: "YouTube Video Downloader'?n yeni bir versiyonu var..",
			update2: "Guncellestirmek icin t?klay?n?z.",
			
			options: "Ayarlar",
			updatetoggle: " Guncellestirmeleri Kontrol Et",
			replacetoggle: " Video Basl?g?n? Degistir",
			vinfotoggle: " Cookie bilgisini ziyaret et (Gelismis)",
			tformat: "Basl?k Turu: ",
			apply: "Onayla",
			tformatinfo: "%t - video basl?g?\n%c - yukleyen\n%f - tur numaras?\n%v - video id'i\n%% - degismez yuzde",
		},
		"zh-tw": { // http://userscripts.org/users/381783
			errormsg: "??: YouTube???,YouTube Video Download????",
			errorlink: "???????YouTube Video Download",
			
			button: "??",
			tip: "?????",
			
			low: "???",
			high: "???",
			
			lowdef: "???",
			stddef: "????",
			highdef: "HD",
			fhighdef: "Full HD",
			
			origdef: "????",
			
			unknown: "?????",
			
			dlheader: "????????:",
			nofmts: "??:?????????.",
			update1: "???YouTube Video Download????.",
			update2: "???????.",
			
			options: "??",
			updatetoggle: " ????",
			replacetoggle: " ???",
			vinfotoggle: " ?????cookies (??)",
			tformat: "????: ",
			apply: "??",
			tformatinfo: "%t - ????\n%c - ???\n%f - ??\n%v - ??id\n%% - ???",
		},
	};
	
	function getTrans(str)
	{
		var ret;
		if (translation[language] && (ret = translation[language][str]))
			return ret;
		else if (ret = translation["en"][str])
			return ret;
		else
			return "";
	}
	
	function createElem(tagName, template)
	{
		var ret = document.createElement(tagName);
		for (var attribute in template)
			if (attribute == "style")
				for (var property in template["style"])
					ret.style[property] = template["style"][property];
			else if (attribute == "className")
				ret.className = template["className"];
			else if (attribute == "checked")
				ret.checked = template["checked"];
			else if (attribute == "disabled")
				ret.disabled = template["disabled"];
			else if (attribute == "children")
				for (var i = 0; i < template["children"].length; i ++)
					ret.appendChild(template["children"][i]);
			else if (attribute == "actions")
				for (var action in template["actions"])
					ret.addEventListener(action, template["actions"][action], false);
			else
				ret.setAttribute(attribute, template[attribute]);
		return ret;
	}
	
	function createCookie(name, value, days)
	{
		if (days)
		{
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		}
		else
			var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/; domain=.youtube.com";
	}

	function readCookie(name)
	{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++)
		{
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0)
				return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	function eraseCookie(name)
	{
		createCookie(name, "", -1);
	}
	
	function checkForUpdates()
	{
		window.addEventListener("message", function(event) {
			remoteVersion = /^\/\/ @version\s+(.+)$/m.exec(event.data)[1];
			
			if (remoteVersion)
			{
				localStorage["_ytd_lastUpdateCheck"] = currDate;
				localStorage["_ytd_remoteVersion"] = remoteVersion;
				
				if (remoteVersion != _ytd_localVersion)
					showUpdate();
			}
		}, false);
		
		document.body.appendChild(createElem("iframe", {
			src: "http://userscripts.org/scripts/source/62634.meta.js",
			style: {
				position: "absolute",
				width: "1px",
				height: "1px",
				left: "-1px",
				top: "-1px",
			},
		}));
	}
	
	function initFormats()
	{
		formats = {
			5:  { itag: 5 , quality:  1, description: getTrans("low")     , format: "FLV" , mres: { width:  400, height:  240 }, acodec: "MP3"   , vcodec: "SVQ"                          , arate: 22050, abr:  64000, vbr:  250000 },
			18: { itag: 18, quality:  5, description: getTrans("high")    , format: "MP4" , mres: { width:  480, height:  360 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "Baseline@L3.0", arate: 44100, abr:  96000, vbr:  500000 },
			22: { itag: 22, quality:  8, description: getTrans("highdef") , format: "MP4" , mres: { width: 1280, height:  720 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "High@L3.1"    , arate: 44100, abr: 152000, vbr: 2000000 },
			34: { itag: 34, quality:  3, description: getTrans("lowdef")  , format: "FLV" , mres: { width:  640, height:  360 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "Main@L3.0"    , arate: 44100, abr: 128000, vbr:  500000 },
			35: { itag: 35, quality:  6, description: getTrans("stddef")  , format: "FLV" , mres: { width:  854, height:  480 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "Main@L3.0"    , arate: 44100, abr: 128000, vbr:  800000 },
			37: { itag: 37, quality:  9, description: getTrans("fhighdef"), format: "MP4" , mres: { width: 1920, height: 1080 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "High@L4.0"    , arate: 44100, abr: 152000, vbr: 3500000 },
			38: { itag: 38, quality: 10, description: getTrans("origdef") , format: "MP4" , mres: { width: 4096, height: 3072 }, acodec: "AAC"   , vcodec: "H.264" },
			43: { itag: 43, quality:  2, description: getTrans("lowdef")  , format: "WebM", mres: { width:  640, height:  360 }, acodec: "Vorbis", vcodec: "VP8"                          , arate: 44100, abr: 128000, vbr:  500000 },
			44: { itag: 44, quality:  4, description: getTrans("stddef")  , format: "WebM", mres: { width:  854, height:  480 }, acodec: "Vorbis", vcodec: "VP8"                          , arate: 44100, abr: 128000, vbr: 1000000 }, 
			45: { itag: 45, quality:  7, description: getTrans("highdef") , format: "WebM", mres: { width: 1280, height:  720 }, acodec: "Vorbis", vcodec: "VP8"                          , arate: 44100, abr: 192000, vbr: 2000000 },
		};
		orderedFormats = new Array();
	}
	
	var createMenu = function() {
		var ret;
		button = createElem("button", {
			className: "yt-uix-button" + (watchFlag.disabled ? "" : " yt-uix-tooltip") + " yt-uix-tooltip-reverse",
			title: (watchFlag.disabled ? "" : getTrans("tip")),
			type: "button",
			role: "button",
			"aria-pressed": "false",
			onclick: "; return false;",
			disabled: watchFlag.disabled,
			children: [
				createElem("span", {
					className: "yt-uix-button-content",
					children: [
						document.createTextNode(getTrans("button")),
					],
				}),
				document.createTextNode(" "),
				createElem("img", {
					className: "yt-uix-button-arrow",
					src: "//s.ytimg.com/yt/img/pixel-vfl73.gif",
					alt: "",
				}),
				ret = createElem("div", {
					className: "yt-uix-button-menu",
					style: {
						display: "none",
						backgroundColor: "#eaeaea",
					},
					children: [
						dlheader = createElem("div", {
							className: "yt-uix-button-menu-item",
							style: {
								fontSize: "smaller",
								fontWeight: "bold",
								backgroundColor: "#eaeaea",
								cursor: "default",
							},
							children: [
								document.createTextNode(getTrans("nofmts")),
							],
						}),
						updateMsg = createElem("a", {}),
					],
				}),
			],
		});
		return ret;
	};
	
	var appendedMenu = false;
	var appendMenu = function() {
		watchFlag.parentNode.insertBefore(button, watchFlag);
		watchFlag.parentNode.insertBefore(document.createTextNode(" "), watchFlag);
		appendedMenu = true;
	};
	
	function createHeader()
	{
		dlheader.style.borderBottom = "1px solid #999999";
		dlheader.removeChild(dlheader.firstChild);
		dlheader.appendChild(createElem("a", {
			style: {
				cssFloat: "right",
				color: "#4272db",
				fontWeight: "normal",
				cursor: "pointer",
			},
			children: [
				document.createTextNode(getTrans("options")),
			],
			actions: {
				click: function() {
					options.style.display = options.style.display == "none" ? "" : "none";
				},
			},
		}));
		dlheader.appendChild(document.createTextNode(getTrans("dlheader")));
		var tformat;
		dlheader.appendChild(options = createElem("div", {
			style: {
				display: "none",
				fontWeight: "normal",
				fontSize: "12px",
				paddingTop: "6px",
			},
			children: [
				createElem("input", {
					type: "checkbox",
					id: "-ytd-update",
					checked: localStorage["_ytd_checkForUpdates"] == "yes",
					actions: {
						change: function() {
							localStorage["_ytd_checkForUpdates"] = this.checked ? "yes" : "no";
						},
					},
				}),
				createElem("label", {
					"for": "-ytd-update",
					children: [
						document.createTextNode(getTrans("updatetoggle")),
					],
				}),
				createElem("br", {}),
				createElem("input", {
					type: "checkbox",
					id: "-ytd-setvinfo",
					checked: readCookie("VISITOR_INFO1_LIVE") == "AAAAAAAAAAA",
					actions: {
						change: function() {
							if (this.checked)
								createCookie("VISITOR_INFO1_LIVE", "AAAAAAAAAAA", 9999);
							else
								eraseCookie("VISITOR_INFO1_LIVE");
						},
					},
				}),
				createElem("label", {
					"for": "-ytd-setvinfo",
					children: [
						document.createTextNode(getTrans("vinfotoggle")),
					],
				}),
				createElem("br", {}),
				createElem("input", {
					type: "checkbox",
					id: "-ytd-replace",
					checked: localStorage["_ytd_replaceTitle"] == "yes",
					actions: {
						change: function() {
							if (this.checked)
							{
								localStorage["_ytd_replaceTitle"] = "yes";
								tformat.disabled = false;
							}
							else
							{
								localStorage["_ytd_replaceTitle"] = "no";
								localStorage["_ytd_titleFormat"] = "video";
								tformat.value = "video";
								tformat.disabled = true;
							}
							getStreamMap();
							getHTML5Map();
						},
					},
				}),
				createElem("label", {
					"for": "-ytd-replace",
					children: [
						document.createTextNode(getTrans("replacetoggle")),
					],
				}),
				createElem("br", {}),
				document.createTextNode(getTrans("tformat")),
				tformat = createElem("input", {
					type: "text",
					disabled: localStorage["_ytd_replaceTitle"] != "yes",
					value: localStorage["_ytd_titleFormat"],
					actions: {
						input: function() {
							localStorage["_ytd_titleFormat"] = this.value;
						},
					},
				}),
				document.createTextNode(" "),
				createElem("a", {
					style: {
						color: "#4272db",
						cursor: "pointer",
					},
					children: [
						document.createTextNode(getTrans("apply")),
					],
					actions: {
						click: function() {
							getStreamMap();
							getHTML5Map();
						},
					},
				}),
				createElem("br", {}),
				createElem("span", {
					style: {
						fontSize: "smaller",
						whiteSpace: "pre",
					},
					children: [
						document.createTextNode(getTrans("tformatinfo")),
					],
				}),
			],
		}));
	}
	
	var addMenu = function(format) {
		var width;
		var height;
		
		if (format.fres)
		{
			width = format.fres.width;
			height = format.fres.height;
		}
		else if (format.mres)
			if (Math.abs(format.mres.width / format.mres.height - 1.7) < 0.1 && Math.abs(sar - 1.7) < 0.1)
			{
				width = format.mres.width;
				height = format.mres.height;
			}
			else if (format.mres.height * sar > format.mres.width)
			{
				width = format.mres.width;
				height = format.mres.width / sar;
			}
			else
			{
				width = format.mres.height * sar;
				height = format.mres.height;
			}
		
		var elem = createElem("a", {
			href: format.url,
			className: "yt-uix-button-menu-item",
			style: {
				position: "relative",
				paddingRight: "7em",
			},
			children: [
				document.createTextNode(format.description ? format.description + (format.mres && Math.abs(format.mres.width / format.mres.height - 1.7) < 0.1 ? ", " + format.mres.height + "p" : "") + " " + format.format + " " : getTrans("unknown") + " " + format.itag),
				createElem("span", {
					style: {
						position: "absolute",
						right: "0.6666em",
						opacity: 0.6,
						cssFloat: "right",
					},
					children: [
						document.createTextNode(format.vcodec ? format.vcodec + (format.acodec ? "/" + format.acodec: "") : format.html5hint ? format.html5hint.type.substring(0, format.html5hint.type.indexOf(";")) : "itag=" + format.itag),
					],
				}),
			],
		});
		if (!orderedFormats.length)
			createHeader();
		
		var i;
		for (i = 0; i < orderedFormats.length; i ++)
			if (orderedFormats[i].quality < format.quality)
				break;
		
		if (orderedFormats[i])
			menu.insertBefore(elem, orderedFormats[i].elem);
		else
			menu.insertBefore(elem, updateMsg);
		orderedFormats.splice(i, 0, format);
		
		if (format.elem)
			menu.removeChild(format.elem);
		format.elem = elem;
	}
	
	var updateShown = false;
	showUpdate = function() {
		var link;
		
		if (updateShown)
			return;
		else
			updateShown = true;
		
		updateMsg.setAttribute("href", "http://userscripts.org/scripts/source/62634.user.js");
		
		updateMsg.className = "yt-uix-button-menu-item";
		updateMsg.style.fontSize = "smaller";
		updateMsg.style.fontWeight = "bold";
		updateMsg.style.backgroundColor = "#eaeaea";
		updateMsg.style.borderTop = "1px solid #999999";
		
		updateMsg.appendChild(document.createTextNode(getTrans("update1")));
		updateMsg.appendChild(createElem("br", {}));
		updateMsg.appendChild(link = createElem("span", {
			style: {
				fontWeight: "normal",
				color: "#4272db",
			},
			children: [
				document.createTextNode(getTrans("update2")),
			],
		}));
		
		updateMsg.addEventListener("mouseover", function() {
			link.style.textDecoration = "underline";
		}, false);
		updateMsg.addEventListener("mouseout", function() {
			link.style.textDecoration = "";
		}, false);
	};
	
	function addUrl(itag, url)
	{
		if (localStorage["_ytd_replaceTitle"])
		{
			var titleChangable = true;
			var tformatted = localStorage["_ytd_titleFormat"].replace(/%./g, function(str, offset, s) {
				if (str == "%t")
					return title;
				else if (str == "%c")
					return channel;
				else if (str == "%f")
					return itag;
				else if (str == "%v")
					return videoId;
				else if (str == "%%")
					return "%";
				return str;
			});
			var escapedTitle = tformatted.replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
			var queryLoc = url.indexOf("?");
			var location = url.substr(0, queryLoc);
			var query = url.substr(queryLoc + 1).split("&");
			var name;
			var splitLoc;
			for (var i = 0; i < query.length; i ++)
			{
				name = query[i].substr(0, splitLoc = query[i].indexOf("="));
				if (name == "sparams")
				{
					var sparams = unescape(query[i].substr(splitLoc + 1)).split(",");
					for (var j = 0; j < sparams.length; j ++)
						if (sparams[j] == "title")
							titleChangable = false;
				}
				else if (name == "title" && titleChangable)
				{
					query[i] = "title=" + escapedTitle;
					titleChangable = false;
					url = location + "?" + query.join("&");
				}
			}
			if (titleChangable)
				url = url + "&title=" + escapedTitle;
		}
		
		if (formats[itag])
			formats[itag].url = url;
		else
			formats[itag] = { itag: itag, url: url };
		
		addMenu(formats[itag]);
	}
	
	function getStreamMap()
	{
		var streamMap;
		try
		{
			if (!(streamMap = yt.getConfig("PLAYER_CONFIG").args["url_encoded_fmt_stream_map"]))
				throw "";
		}
		catch (e)
		{
			try
			{
				var flashVars = document.getElementById("movie_player").getAttribute("flashvars").split("&");
				var splitLoc;
				var name;
				for (var i = 0; i < flashVars.length; i ++)
				{
					name = flashVars[i].substr(0, splitLoc = flashVars[i].indexOf("="));
					if (name == "url_encoded_fmt_stream_map")
						streamMap = unescape(flashVars[i].substr(splitLoc + 1));
				}
				if (!streamMap)
					throw "";
			}
			catch (e)
			{
				try
				{
					var swfConfigTxt = document.getElementById("postpage").getElementsByTagName("script")[3].textContent;
					if (swfConfigTxt.substring(0, 18) == "\n    (function() {")
					{
						eval(swfConfigTxt.substring(18, swfConfigTxt.length - 8))
						streamMap = swfConfig.args.url_encoded_fmt_stream_map;
					}
				}
				catch (e)
				{
					return false;
				}
			}
		}
		
		if (streamMap)
		{
			streamMap = streamMap.split(",");
			var split;
			var url;
			var itag;
			var name;
			for (var i = 0; i < streamMap.length; i ++)
			{
				split = streamMap[i].split("&");
				for (var j = 0; j < split.length; j ++)
				{
					name = split[j].substring(0, split[j].indexOf("="));
					if (name == "url")
						url = unescape(split[j].substring(split[j].indexOf("=") + 1));
					else if (name == "itag")
						itag = parseInt(split[j].substring(split[j].indexOf("=") + 1));
				}
				addUrl(itag, url);
			}
			return true;
		}
		else
			return false;
	}
	
	function getHTML5Map()
	{
		try
		{
			var hFormatMap = yt.getConfig("PLAYER_CONFIG").args["html5_fmt_map"];
			if (hFormatMap)
				for (var i = 0; i < hFormatMap.length; i ++)
				{
					if (formats[hFormatMap[i].itag])
						formats[hFormatMap[i].itag].html5hint = hFormatMap[i];
					else
						formats[hFormatMap[i].itag] = { itag: hFormatMap[i].itag, html5hint: hFormatMap[i] };
					addUrl(hFormatMap[i].itag, hFormatMap[i].url);
				}
			else
				return false;
		}
		catch (e)
		{
			return false;
		}
		return true;
	}
	
	function getTitle()
	{
		var title = document.getElementById("eow-title");
		if (title)
			return title.getAttribute("title").replace(/^\s+/, "").replace(/\s+$/, "");
		else
			return document.title.substr(10);
	}
	
	function getChannel()
	{
		try
		{
			return yt.getConfig("VIDEO_USERNAME");
		}
		catch (e)
		{
			try
			{
				return document.getElementById("watch-uploader-info").getElementsByClassName("author")[0].textContent;
			}
			catch (e)
			{
				return "unknown";
			}
		}
	}
	
	function getSAR()
	{
		try
		{
			return yt.getConfig("IS_WIDESCREEN") ? 16/9 : 4/3;
		}
		catch (e)
		{
			return 16/9;
		}
	}
	
	function getVideoId()
	{
		try
		{
			return yt.getConfig("VIDEO_ID");
		}
		catch (e)
		{
			return "";
		}
	}
	
	var vo;
	if (vo = document.getElementById("vo"))
	{
		var ret;
		
		createMenu = function() {
			vo.insertBefore(createElem("button", {
				className: "b",
				children: [
					document.createTextNode("Download"),
				],
				actions: {
					click: function() {
						featherMenu.style.display = featherMenu.style.display == "none" ? "" : "none";
					},
				},
			}), vo.lastChild);
			
			vo.parentNode.insertBefore(ret = createElem("div", {
				style: {
					marginTop: "10px",
					lineHeight: "14px",
					padding: "5px",
					border: "1px solid #eaeaea",
					borderRadius: "5px",
					display: "none",
				},
			}), vo.nextSibling);
			
			return ret;
		};
		
		addMenu = function(format) {
			var elem = createElem("a", {
				href: format.url,
				children: [
					document.createTextNode(format.description ? format.description + (format.mres && Math.abs(format.mres.width / format.mres.height - 1.7) < 0.1 ? ", " + format.mres.height + "p" : "") + " " + format.format + " " : getTrans("unknown")),
				],
				style: {
					display: "block",
				},
			});
			var i;
			
			for (i = 0; i < orderedFormats.length; i ++)
				if (orderedFormats[i].quality < format.quality)
					break;
			
			if (orderedFormats[i])
				menu.insertBefore(elem, orderedFormats[i].elem);
			else
				menu.appendChild(elem);
			orderedFormats.splice(i, 0, format);
			
			if (format.elem)
				menu.removeChild(format.elem);
			format.elem = elem;
		};
		
		showUpdate = function() {};
		appendMenu = function() {};
	}
	
	try
	{
		if (!localStorage["_ytd_checkForUpdates"])
			localStorage["_ytd_checkForUpdates"] = ((window.chrome || window.globalStorage) && _ytd_localVersion != "git" ? "yes" : "no");
		if (!localStorage["_ytd_replaceTitle"])
			localStorage["_ytd_replaceTitle"] = "yes";
		if (!localStorage["_ytd_titleFormat"])
			localStorage["_ytd_titleFormat"] = "%t";
		
		title = getTitle();
		channel = getChannel();
		sar = getSAR();
		videoId = getVideoId();
		
		menu = createMenu();
		if (watchFlag.disabled)
		{
			appendMenu();
			return;
		}
		initFormats();
		getStreamMap();
		getHTML5Map();
		appendMenu();
		
		if (localStorage["_ytd_localVersion"] != _ytd_localVersion)
		{
			localStorage["_ytd_remoteVersion"] = _ytd_localVersion;
			localStorage["_ytd_localVersion"] = _ytd_localVersion;
		}
		
		if (localStorage["_ytd_checkForUpdates"] == "yes")
		{
			if (!localStorage["_ytd_remoteVersion"] || !localStorage["_ytd_lastUpdateCheck"] || currDate - parseInt(localStorage["_ytd_lastUpdateCheck"]) > 1000 * 60 * 60 * 24 * 2)
				checkForUpdates();
			
			if (localStorage["_ytd_remoteVersion"] && localStorage["_ytd_remoteVersion"] != _ytd_localVersion)
				showUpdate();
		}
	}
	catch (e)
	{
		var firstChild = document.body.firstChild;
		document.body.insertBefore(document.createTextNode(getTrans("errormsg")), firstChild);
		document.body.insertBefore(createElem("a", {
			href: "http://userscripts.org/scripts/show/62634",
			target: "_blank",
			children: [
				document.createTextNode(getTrans("errorlink")),
			],
		}), firstChild);
		document.body.insertBefore(createElem("br"), firstChild);
		document.body.insertBefore(document.createTextNode("Error: " + (e.lineNumber ? e.lineNumber+ ": " : "") + (e.name ? e.name + ": ": "") + (e.message ? e.message : e.description ? e.description : "")), firstChild);
		
		if (button && !appendedMenu)
			appendMenu();
		
		throw e;
	}
});
else if (document.location.href == "http://userscripts.org/scripts/source/62634.meta.js") inject(function() {
	window.parent.postMessage(document.documentElement.textContent, "*");
});