// ==UserScript==
// @name           Google Classic
// @namespace      jchien
// @description    From the makers of Coke Classic
// @include        http://*google.*/*
// @include        https://*google.*/*
// ==/UserScript==

/* FUCK GOOGLE
	FUCK YOU FOR HAVING 3, ER, 4 DIFFERENT TYPES OF PAGES
		-Regular - Through /search* or /images*
		-Main Page - Through main page
		-Products - Through Google Products
		-Images (not basic-view) - New image search page, introduced on July 20, 2010
	FUCK
 */

(function(){
	// Option to center the results when searching: true if you want it to center, false if you don't
	var centering = true;
	
	/* special getElementByClassName for FF2 support */
	
	/*
		Developed by Robert Nyman, http://www.robertnyman.com
		Code/licensing: http://code.google.com/p/getelementsbyclassname/
	*/
	var getElementsByClassName = function (className, tag, elm){
		thisDocument = document;
		if (thisDocument.getElementsByClassName) {
			getElementsByClassName = function (className, tag, elm) {
				elm = elm || thisDocument;
				var elements = elm.getElementsByClassName(className),
					nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
					returnElements = [],
					current;
				for(var i=0, il=elements.length; i<il; i+=1){
					current = elements[i];
					if(!nodeName || nodeName.test(current.nodeName)) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		}
		else if (thisDocument.evaluate) {
			getElementsByClassName = function (className, tag, elm) {
				tag = tag || "*";
				elm = elm || thisDocument;
				var classes = className.split(" "),
					classesToCheck = "",
					xhtmlNamespace = "http://www.w3.org/1999/xhtml",
					namespaceResolver = (thisDocument.thisDocumentElement && thisDocument.thisDocumentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
					returnElements = [],
					elements,
					node;
				for(var j=0, jl=classes.length; j<jl; j+=1){
					classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
				}
				try	{
					elements = thisDocument.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
				}
				catch (e) {
					elements = thisDocument.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
				}
				while ((node = elements.iterateNext())) {
					returnElements.push(node);
				}
				return returnElements;
			};
		}
		else {
			getElementsByClassName = function (className, tag, elm) {
				tag = tag || "*";
				elm = elm || thisDocument;
				var classes = className.split(" "),
					classesToCheck = [],
					elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
					current,
					returnElements = [],
					match;
				for(var k=0, kl=classes.length; k<kl; k+=1){
					classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
				}
				for(var l=0, ll=elements.length; l<ll; l+=1){
					current = elements[l];
					match = false;
					for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
						match = classesToCheck[m].test(current.className);
						if (!match) {
							break;
						}
					}
					if (match) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		}
		return getElementsByClassName(className, tag, elm);
	};

	// Because window.document may not be correct
	var ownerDoc;

	var moreOptions, lessOptions;
	
	function debug(str)
	{
		// Firebug
		if(console && console.debug)
			console.debug(str);
	}
	
	var locale;
	function findLocale()
	{
		var inputs = document.getElementsByTagName("input"), i;
		for(var x = 0; x < inputs.length; x++)
		{
			i = inputs[x];
			if(i && i.getAttribute && i.getAttribute("name") == "hl")
			{
				locale = i.getAttribute("value");
				return;
			}
		}
	}
	findLocale();
	
	if(locale)
	{
		//console.debug("locale: " + locale);
		switch(locale)
		{
			case "en":
						/*
							English "en",
							UK "uk",
							Canada "ca",
							Australia "au",
							India "in",
							South Africa "za",
							Ireland "ie",
							Malta "mt",
							New Zealand "nz",
							Malaysia "my",
							Sri Lanka "sr",
							Pakistan "pk",
							Nigeria "ng",
							Kenya "ke",
							Singapore "sg",
							Mauritius "mu",
							Niue "nu",
							Jamaica "jm",
							Trinidad and Tobago "tt",
							Namibia "na",
							The Gambia "gm",
							American Samoa "as",
							Jersey "je",
							Anguilla "ai",
							Zambia "zm",
							Rwanda "rw",
							Uganda "ug",
							Saint Vincent and the Grenadines "vc",
							Gibraltar "gi",
						*/
			case "is":	// Iceland "is" (needs translation to Icelandic)
			case "az":	// Azerbaijan "az" (needs translation to Azerbaijani)
			case "mn":	// Mongolia "mn" (needs translation to Mongolian)
			case "to":	// Tonga "to" (needs translation to Tongan)
			case "kk":	// Kazakhstan "kz" (needs translation to Kazakh)
			case "uz":	// Uzbekistan "uz" (needs translation to Uzbek)
				moreOptions = "Show Options";
				lessOptions = "Hide Options";
				break;
			case "fr":
						/*
							French "fr",
							Morocco "ma",
							Cote D'Ivoire "ci",
							Democratic Republic of the Congo "cd",
							Djibouti "dj",
							Guadeloupe "gp",
							Haiti "ht",
							Senegal "sn",
							
						*/
				moreOptions = "Afficher les options";
				lessOptions = "Masquer les options";
				break;
			case "de":	// German "de", Austria "at", Switzerland "ch", Luxembourg "lu", Liechtenstein "li"
				moreOptions = "Optionen anzeigen";
				lessOptions = "Optionen ausblenden";
				break;
			case "pl": // Polish "pl"
				moreOptions = "Pokaz opcje";
				lessOptions = "Ukryj opcje";
				break;
			case "nl":	// Netherlands "nl"
				moreOptions = "Opties weergeven";
				lessOptions = "Opties verbergen";
				break;
			case "it":	// Italian "it", San Marino "sm"
				moreOptions = "Mostra opzioni";
				lessOptions = "Mostra opzioni";
				break;
			case "tr":	// Turkish "tr"
				moreOptions = "Se\u00E7enekleri g\u00F6ster";
				lessOptions = "Se\u00E7enekleri gizle";
				break;
			case "es":
						/*
							Spanish "es",
							Mexican "mx",
							Chile "cl",
							Argentina "ar",
							Columbia "co",
							Venezuela "ve",
							Peru "pe",
							Ecuador "ec",
							Uruguay "uy",
							Costa Rica "cr",
							Dominican Republic "do",
							El Salvador "sv",
							Puerto Rico "pr",
							Guatemala "gt",
							Nicaragua "ni",
							Paraguay "py",
							Bolivia "bo",
							Honduras "hn",
							Cuba "cu",
							Panama "pa",
							
						*/
				moreOptions = "Mostrar opciones";
				lessOptions = "Ocultar opciones";
				break;
			case "be":	// Belarusian: Belarus "by"
				moreOptions = "\u041F\u0430\u043A\u0430\u0437\u0430\u0446\u044C \u043D\u0430\u043B\u0430\u0434\u043A\u0456";
				lessOptions = "\u0421\u0445\u0430\u0432\u0430\u0446\u044C \u043D\u0430\u043B\u0430\u0434\u043A\u0456";
				break;
			case "el":	// Greek "gr"
				moreOptions = "\u0395\u03BC\u03C6\u03AC\u03BD\u03B9\u03C3\u03B7 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03CE\u03BD";
				lessOptions = "\u0391\u03C0\u03CC\u03BA\u03C1\u03C5\u03C8\u03B7 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03CE\u03BD";
				break;
			case "br":	// Breton
				moreOptions = "Diskouez dibabo\u00F9";
				lessOptions = "Kuzhat dibabo\u00F9";
				break;
			case "fi":	// Finnish (Suomi) "fi"
				moreOptions = "N\u00E4yt\u00E4 valinnat";
				lessOptions = "Piilota valinnat";
				break;
			case "pt-PT":	// Portuguese "pt"
			case "pt-BR":	// Brazilian "br"
				moreOptions = "Mostrar op\u00E7\u00F5es";
				lessOptions = "Ocultar op\u00E7\u00F5es";
				break;
			case "hu":	// Hungarian "hu"
				moreOptions = "Be\u00E1ll\u00EDt\u00E1sok megjelen\u00EDt\u00E9se";
				lessOptions = "Be\u00E1ll\u00EDt\u00E1sok elrejt\u00E9se";
				break;
			case "hr":	// Croatian "hr"
				moreOptions = "Prika\u017Ei opcije";
				lessOptions = "Sakrij opcije";
				break;
			case "bg":	// Bulgarian " bg"
				moreOptions = "\u041F\u043E\u043A\u0430\u0437\u0432\u0430\u043D\u0435 \u043D\u0430 \u043E\u043F\u0446\u0438\u0438\u0442\u0435";
				lessOptions = "\u0421\u043A\u0440\u0438\u0432\u0430\u043D\u0435 \u043D\u0430 \u043E\u043F\u0446\u0438\u0438\u0442\u0435";
				break;
			case "sl":	// Slovene: Slovenia "si"
				moreOptions = "Poka\u017Ei mo\u017Enosti";
				lessOptions = "Skrij mo\u017Enosti";
				break;
			case "sk":	// Slovak "sk"
				moreOptions = "Zobrazi\u0165 mo\u017Enosti";
				lessOptions = "Skry\u0165 mo\u017Enosti";
				break;
			case "ro":	// Romanian "ro"
				moreOptions = "Afi\u015Fa\u0163i op\u0163iunile";
				lessOptions = "Ascunde\u0163i op\u0163iunile";
				break;
			case "sv":	// Swedish: Sweden "se"
				moreOptions = "Visa alternativ";
				lessOptions = "D\u00F6lj alternativ";
				break;
			case "cs":	// Czech: Czech Republic "cz"
				moreOptions = "Zobrazit mo\u017Enosti";
				lessOptions = "Skr\u00FDt mo\u017Enosti";
				break;
			case "da":	// Dansk: Denmark "dk"
				moreOptions = "Vis valgmuligheder";
				lessOptions = "Skjul valgmuligheder";
				break;
			case "th":	// Thai "th"
				moreOptions = "\u0E41\u0E2A\u0E14\u0E07\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01";
				lessOptions = "\u0E0B\u0E48\u0E2D\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01";
				break;
			case "lt":	// Lithuanian "lt"
				moreOptions = "Rodyti parinktis";
				lessOptions = "Nerodyti parink\u010Di\u0173";
				break;
			case "id":	// Indonesian "id"
				moreOptions = "Tampilkan opsi";
				lessOptions = "Sembunyikan opsi";
				break;
			case "iw":	// Hebrew: Israel "il"
				moreOptions = "\u05D4\u05E6\u05D2 \u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA";
				lessOptions = "\u05D4\u05E1\u05EA\u05E8 \u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA";
				break;
			case "ar":
						/* Arabic:
							Egypt "eg",
							Saudia Arabia "sa",
							UAE "ae",
							Bahrain "bh",
							Jordan "jo",
							Libya "ly",
							Qatar "qa",
							Oman "om",
						*/
				moreOptions = "\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A";
				lessOptions = "\u0625\u062E\u0641\u0627\u0621 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A";
				break;
			case "ru":	// Russian "ru"
				moreOptions = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438";
				lessOptions = "\u0421\u043A\u0440\u044B\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438";
				break;
			case "tl":	// Filipino "ph"
				moreOptions = "Ipakita ang mga pagpipilian";
				lessOptions = "Itago ang mga pagpipilian";
				break;
			case "ko":	// Korean: South Korea "kr"
				moreOptions = "\uAC80\uC0C9\uB3C4\uAD6C \uC5F4\uAE30";
				lessOptions = "\uAC80\uC0C9\uB3C4\uAD6C \uB2EB\uAE30";
				break;
			case "no":	// Norsk "no"
				moreOptions = "Vis alternativer";
				lessOptions = "Skjul alternativer";
				break;
			case "vi":	// Vietnamese: Vietnam "vn"
				moreOptions = "Hi\u1EC3n th\u1ECB tu\u1EF3 ch\u1ECDn";
				lessOptions = "\u1EA8n tu\u1EF3 ch\u1ECDn";
				break;
			case "lv":	// Latvian "lv"
				moreOptions = "R\u0101d\u012Bt opcijas";
				lessOptions = "Sl\u0113pt opcijas";
				break;
			case "bs":	// Bosnian: Bosnia and Herzegovina "ba"
				moreOptions = "";
				lessOptions = "";
				break;
			case "uk":	// Ukrainian: Ukraine "ua"
				moreOptions = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0438";
				lessOptions = "\u0421\u0445\u043E\u0432\u0430\u0442\u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0438";
				break;
			case "et":	// Estonian: Estonia "ee"
				moreOptions = "N\u00E4ita valikuid";
				lessOptions = "Peida valikud";
				break;
			case "bn":	// Bangla: Bangladesh "bd"
				moreOptions = "\u09AC\u09BF\u0995\u09B2\u09CD\u09AA\u0997\u09C1\u09B2\u09BF \u09A6\u09C7\u0996\u09BE\u09A8";
				lessOptions = "\u09AC\u09BF\u0995\u09B2\u09CD\u09AA\u0997\u09C1\u09B2\u09BF \u09B2\u09C1\u0995\u09BE\u09A8";
				break;
			case "sr":	// Serbian: Serbia "rs"
				moreOptions = "\u041F\u0440\u0438\u043A\u0430\u0436\u0438 \u043E\u043F\u0446\u0438\u0458\u0435";
				lessOptions = "\u0421\u0430\u043A\u0440\u0438\u0458 \u043E\u043F\u0446\u0438\u0458\u0435";
				break;
			case "km":	// Khmer: Cambodia "kh"
				moreOptions = "\u1794\u1784\u17D2\u17A0\u17B6\u1789\u179F\u17B7\u1791\u17D2\u1792\u17B7\u1787\u17D2\u179A\u17BE\u179F\u179A\u17BE\u179F";
				lessOptions = "\u179B\u17B6\u1780\u17CB\u179F\u17B7\u1791\u17D2\u1792\u17B7\u1787\u17D2\u179A\u17BE\u179F\u179A\u17BE\u179F";
				break;
			case "ka":	// Georgian: Georgia "ge"
				moreOptions = "\u10DE\u10D0\u10E0\u10D0\u10DB\u10D4\u10E2\u10E0\u10D4\u10D1\u10D8\u10E1 \u10E9\u10D5\u10D4\u10DC\u10D4\u10D1\u10D0";
				lessOptions = "\u10DE\u10D0\u10E0\u10D0\u10DB\u10D4\u10E2\u10E0\u10D4\u10D1\u10D8\u10E1 \u10D3\u10D0\u10DB\u10D0\u10DA\u10D5\u10D0";
				break;
			case "am":	// Amharic: Ethiopia "et"
				moreOptions = "\u12A0\u121B\u122B\u132E\u127D\u1295 \u12A0\u1233\u12ED";
				lessOptions = "\u12A0\u121B\u122B\u132E\u127D\u1295 \u12F0\u1265\u1245";
				break;
			case "mo":	// Moldovan: Moldova "md"
				moreOptions = "Afi\u015Fa\u0163i op\u0163iunile";
				lessOptions = "Ascunde\u0163i op\u0163iunile";
				break;
			case "hy":	// Armenian: Armenia "am"
				moreOptions = "";
				lessOptions = "";
				break;
			case "ms":	// Malay: Brunei "bn"
				moreOptions = "Tunjukkan pilihan";
				lessOptions = "Sembunyikan pilihan";
				break;
			case "sw":	// Kiswahili: Uganda "ug"
				moreOptions = "Onyesha chaguo";
				lessOptions = "Ficha chaguo";
				break;
			case "lg":	// Luganda: Uganda "ug"
				moreOptions = "Laga byolonda";
				lessOptions = "Kweka byolondamu";
				break;
			case "zh-CN":	// Simplified Chinese: China "cn" (NO MORE!), Hong Kong "hk"
				moreOptions = "\u6253\u5F00\u767E\u5B9D\u7BB1";
				lessOptions = "\u5173\u95ED\u767E\u5B9D\u7BB1";
				break;
			case "zh-TW":	// Traditional Chinese: Taiwan "tw"
				moreOptions = "\u986F\u793A\u9078\u9805";
				lessOptions = "\u96B1\u85CF\u9078\u9805";
				break;
			case "ja":	// Japanese "jp"
				moreOptions = "\u691C\u7D22\u30C4\u30FC\u30EB\u3092\u8868\u793A";
				lessOptions = "\u691C\u7D22\u30C4\u30FC\u30EB\u3092\u9589\u3058\u308B";
				break;
			/*
			case "[2-letter language code, whatever is after hl=]":
				moreOptions = "[More options]";
				lessOptions = "[Less Options]";
			// */
		}
	}
	
	function addGlobalStyle(css)
	{
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		var text = document.createTextNode(css);
		style.appendChild(text);
		head.appendChild(style);
	}
	
	/* products page is different */
	var isProducts = (new RegExp(".*google\..*\/products\?.*")).test(window.location);
	/* images page is different too, starting July 20, 2010 */
	var isImages = (new RegExp(".*google\..*\/images\?.*")).test(window.location);
	/* need to uncenter search result pages, starting Sept 9th, 2010*/
	var isSearch = (new RegExp(".*google\..*\/search\?.*")).test(window.location);
	/* users stil can use basic view, though, so check for that */
	var isBasicView = (new RegExp(".*sout=1.*")).test(window.location);
	
	debug("isSearch: " + isSearch);
	
	/* are we using the old nav logo?  Opera can't assess it in advance, so assume that it's true */
	var isNavLogo14 = false, isNavLogo16 = false;
	var showLinkIconOpen, showLinkIconClose;
	
	function whichNavLogo()
	{
		//isNavLogo14 = (document.innerHTML.indexOf("nav_logo14") != -1);
		//*
		var googleLogo = document.getElementById("logo");
		if(googleLogo && googleLogo.lastChild)
		{
			debug("logo: " + googleLogo.lastChild.getAttribute("src"));
			isNavLogo14 = (googleLogo.lastChild.getAttribute("src").indexOf("nav_logo14") != -1);
			isNavLogo16 = (googleLogo.lastChild.getAttribute("src").indexOf("nav_logo16") != -1);
		}
		// */
		if(isNavLogo14)
		{
			debug("!!!!! isNavLogo14");
			var navLogo14 = '/* Transparent Icons */ \
						.csb, .ss, #logo span, .play_icon, .mini_play_icon, .micon, .close_btn, #tbp, .mbi, \
						.mode_icon \
						{ \
							background-image:	url("data:image/png;base64,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") ; \
						}';
			addGlobalStyle(navLogo14);
			showLinkIconClose = "-153px -84px";
			showLinkIconOpen = "-153px -70px";
		}
		else if(isNavLogo16)
		{
			debug("!!!!! isNavLogo16");
			var navLogo16 = '/* Transparent Icons */ \
						.csb, .ss, #logo span, .play_icon, .mini_play_icon, .micon, .close_btn, #tbp, .mbi, \
						.mode_icon \
						{ \
							background-image:	url("data:image/png;base64,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")  !important; \
						}';
			addGlobalStyle(navLogo16);
			showLinkIconClose = "-159px -55px";
			showLinkIconOpen = "-159px -41px";
		}
		else
		{
			debug("!!!!! nav logo 21?");
			var navLogo21 = '/* Transparent Icons */ \
						.csb, .ss, #logo span, .play_icon, .mini_play_icon, .micon, .close_btn, #tbp, .mbi, \
						.mode_icon \
						{ \
							background-image:	url("data:image/png;base64,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")  !important; \
						}';
			addGlobalStyle(navLogo21);
			showLinkIconClose = "-153px -84px";
			showLinkIconOpen = "-153px -70px";
		}
	}
	
	function applyStyles()
	{
		var css = '	\
			/* MAX WIDTH * / \
			#cnt, \
			#lhs-ref, .lhs \
			{ \
				max-width: 100% !important; \
			} \
			*/ \
			/* Header for products pages */ \
			#srp-header, #gbar, #guser \
			{ \
				margin-left: 8px !important; \
				margin-right: 8px !important; \
			} \
			.content_cont \
			{ \
				padding-right: 8px !important; \
			} \
			 \
			/* Search Box */ \
			.lst, .srch_box \
			{ \
				/* Font */ \
				font: 17px arial,sans-serif; \
				height: 20px	!important; \
				 \
				/* Border */ \
				padding: 0px 0px 0px 0px; \
				border-color: #000000; \
				border-width: 2px; \
				border-style: inset; \
			} \
			.srchBoxCont \
			{ \
				vertical-align: middle; \
				padding-right: 16px !important; \
			} \
			 \
			/* Border beneath search box */ \
			.tsf-p \
			{ \
				padding-bottom: 0px !important; \
			} \
			.tsf-p table, .lst-td, .srchBoxCont, \
			.ds \
			{ \
				border-bottom: 0px !important; \
				margin:			0px !important; \
			} \
			/* Search Button */ \
			.lsb, .srch_button \
			{ \
				background: 	#D4D0C8 !important; \
				border:			2px #D4D0C8 outset !important; \
				height:			1.85em !important; \
				margin:			3px 3px !important; \
			} \
			 \
			/* Border around Search button */ \
			.lsbb, \
			.srchButtonBorder, .srchButtonRightShadow, \
			#lst-xbtn, .lst-td-xbtn \
			{ \
				background: none; \
				border: 0px !important; \
			} \
			.ds \
			{ \
				border-right: 0px !important; \
			} \
			 \
			 \
			#sftab .jsb \
			{ \
				display: none !important; \
			} \
			 \
			/* Advanced Search */ \
			.GoogleClassic_advSearchTD \
			{ \
				padding: 0 6px; \
				font-size: x-small; \
			} \
			.GoogleClassic_advSearchTD > a:visited { color: #551A8B !important;} \
			.GoogleClassic_advSearchTD > a:active { color: #CC1111 !important;} \
			 \
			/* Separator */ \
			#ssb  \
			{ \
				margin:		0 8px 11px; \
				padding:	0.1em; \
				height: 	24px; \
			} \
			#bsf, #ssb, .blk \
			{ \
				background:none repeat scroll 0 0 #F0F7F9; \
				border-top:1px solid #6B90DA; \
			} \
			#ssb, .clr \
			{ \
				clear:both; \
			} \
			 \
			#ssb div \
			{ \
				float:left; \
			} \
			 \
			#prs * \
			{ \
				float:left; \
			} \
			 \
			#leftnav \
			{ \
				display: none; \
			} \
			/* Alternate search list */ \
			#prs ul \
			{ \
				margin: 0; \
				padding: 0; \
				cursor: default; \
				list-style-type: none; \
				display: inline; \
			} \
			 \
			.GoogleClassic_products_showOpts \
			{ \
				line-height:24px; \
				list-style:none outside none; \
				padding:0 0 2px 8px; \
			}\
			/* Alternate search list: highlighted item -> bold */ \
			.msel, \
			.current-mode \
			{ \
				background: 	none	!important; \
				border-width: 	0px		!important; \
				color: 			#000000	!important; \
				margin-top:		0px		!important; \
				padding-bottom:	0px		!important; \
			} \
			 \
			/* Show options */ \
			#GoogleClassic_showLinkIcon \
			{ \
				width: 13px		!important; \
				height: 13px	!important; \
				margin-top:	5px	!important; \
				margin-right: 5px !important; \
				margin-left: 3px !important; \
				padding-right: 1px !important; \
			} \
			 \
			/* Results Stats */ \
			#resultStatsParent \
			{ \
				float: none !important; \
				vertical-align: middle; \
				height: 25px; \
			} \
			#resultStats \
			{ \
				float: right !important; \
				position: relative; \
				top: 5px; \
				vertical-align: middle; \
				text-align: right; \
			} \
			/* Left nav for products */ \
			#lhs-ref \
			{ \
				padding-left: 12px !important; \
			} \
			/* Center col for products */ \
			.lhs \
			{ \
				margin-left: 0px !important; \
			} \
			/* Border for Products */ \
			#ms, .ms \
			{ \
				border: none !important; \
				padding: 0px !important; \
				margin: 0px !important; \
			} \
			#ms *, .ms * {font-size: small !important;} \
			#ms > #showmodes + a.q, .ms > #showmodes + a.q {margin: 0 0.3em 0 0 !important;} \
			.ms li \
			{ \
				line-height:24px; \
				list-style:none outside none; \
			} \
			.ms .mode_icon \
			{ \
				float:left; \
				height:19px; \
				margin-right:5px; \
				margin-top:2px; \
				outline:medium none; \
				width:19px; \
			} \
			.ms .current-mode .mode_icon \
			{ \
				/* background-position:-140px -152px; */ \
				margin-top:4px; \
			} \
			.ms span \
			{ \
				display:inline-block; \
			} \
			/* Link */ \
			/* Main Link */ \
			.l, .q, .osl a, .r a, \
			.result-title a \
			{ \
				color: #2200CC	!important; \
			} \
			.l:active, .q:active, .osl a:active, .r a:active  \
			{ \
				color: red	!important; \
			} \
			.l:visited, .q:visited, .osl a:visited, .r a:visited  \
			{ \
				color:	#551A8B	!important; \
			} \
			/* Sub searches */ \
			.osl a \
			{ \
				text-decoration:	underline	!important; \
			} \
			/* Footer */ \
			#bfl a, #fll a, a.gl, .flt, \
			#advsearch, .footer-links a, .bottom-links a, \
			#sbl a \
			{ \
				color: #0000CC	!important; \
				text-decoration:	underline	!important; \
			} \
			/* Current page in navigator */ \
			td.cur, \
			#nc + span \
			{ \
				color: #A90A08	!important; \
			} \
			/* Other pages */ \
			#nav .fl, \
			.nr + span \
			{ \
				color: #000000	!important; \
				text-decoration:	underline	!important; \
			} \
			/* "Cached" or "Similar" */ \
			span.gl a, span.gl a:link, .std .fl, \
			.fl \
			{ \
				color: #7777CC	!important; \
				text-decoration:	underline	!important; \
			} \
			span.gl a:visited, .std .fl a:visited \
			{ \
				color: #551A8B	!important; \
			} \
			/* Domain, cited */ \
			cite \
			{ \
				color: #008000	!important; \
			} \
			div.f \
			{ \
				color: #676767	!important; \
			} \
			/* Footer */ \
			#foot \
			{ \
				width: 			100% !important; \
				margin-left: 	0px !important; \
				margin-right: 	0px !important; \
				max-width: 		100% !important; \
				padding:		0px !important; \
			} \
			#footer-bg form table, \
			.GoogleClassic_bsf > div table \
			{ \
				margin-left:	30% !important; \
				margin-right:	30% !important; \
				max-width: 		40%	!important; \
			} \
			#nav \
			{ \
				margin: 		17px auto 0 !important; \
			} \
			.GoogleClassic_bsf, \
			.GoogleClassic_products_footer \
			{ \
				margin-left:	8px; \
				margin-right:	8px; \
				border-top:		1px solid #6B90DA; \
				border-bottom:	1px solid #6B90DA; \
				background:		none repeat scroll 0 0 #F0F7F9; \
				margin-top: 	1.4em; \
				padding: 		1.8em 0px; \
			} \
			.GoogleClassic_bsf > div \
			{ \
				margin-top:		0px	!important; \
			}';

		addGlobalStyle(css);
		
		
		/* set body margin for products pages */
		if(isProducts)
		{
			var bodyStyle = '/* Body for products pages */ \
							body \
							{ \
								margin-left: 0px !important; \
								margin-right: 0px !important; \
							}';
			
			addGlobalStyle(bodyStyle);
		}
		
		/* set leftnav margin for images pages */
		if(isImages && !isBasicView)
		{
			var leftNavStyle = '/* leftnav top margin for image pages */ \
							#leftnav \
							{ \
								margin-top: 37px !important; \
							} \
							#center_col #res \
							{ \
								position: relative !important; \
								top: 37px !important; \
							}';
			
			addGlobalStyle(leftNavStyle);
		}
		
		
		/* add a margin */
		if(document.getElementById("sform"))
		{
			var subform = '/* Unused */ \
						#sfcnt \
						{ \
							margin-bottom: 23px !important; \
						}';
			addGlobalStyle(subform);
		}
		
		if(isSearch && centering)
		{
			var margin = '/* Uncenter the search box and the body*/ \
						#tsf, #cnt \
						{	\
							margin: 0 !important; \
						}';
			addGlobalStyle(margin);
		}
		
		whichNavLogo();
	}
	
	var advSearchOK = 0;
	/* Advanced Search placement */
	function moveAdvSearch(thisDocument)
	{
		debug("move adv search");
	
		var advSearch;
		if(isProducts)
		{
			advSearch = thisDocument.getElementById("advsearch");
			if(!advSearch)	return;
			
			srpHeader = thisDocument.getElementById("srp-header");
			if(!srpHeader)	return;
		
			var tr = srpHeader.getElementsByTagName("tr");
			if(tr.length == 0)	return;
			
			var td = thisDocument.createElement("td");
			td.appendChild(advSearch);
			td.setAttribute("class", "GoogleClassic_advSearchTD");
			td.style.setProperty("vertical-align", "middle", "important");
			tr[0].appendChild(td);
		}
		else
		{
			debug("		advsearch 1");
			var advSearchArray, advSearch = document.getElementById("sflas");
			debug("		advsearch 2");
			if(!advSearch)
			{
				advSearchArray = getElementsByClassName("gl nobr", "a", thisDocument);
				if(advSearchArray.length == 0)
				{
					debug("    adv search not found: " + thisDocument.documentURI);
					return;
				}
				advSearch = advSearchArray[0];
			}
				
			debug("    adv search found");
			
			var preferences = document.getElementById("sflpref");
			
			/* if there's already an Advanced Search*/
			if(document.getElementById("GoogleClassic_advSearchTD"))
			{
				debug("    duplicate adv search found");
				advSearch.parentNode.removeChild(advSearch);
				advSearchOK = 1;
				return;
			}
				
			advSearch.style.setProperty("vertical-align", "middle", "important");
			
			var tsf = thisDocument.getElementById("tsf");
			if(!tsf)			return;
			var div = getElementsByClassName("tsf-p", "div", tsf);
			if(div.length == 0)	return;
			var tr = div[0].getElementsByTagName("tr");
			if(tr.length == 0)	return;
			
			debug("    found target space");
			
			var td = thisDocument.createElement("td");
			var br = thisDocument.createElement("br");
			td.appendChild(advSearch);
			if(preferences)
			{
				td.appendChild(br);
				td.appendChild(preferences);
			}
			td.setAttribute("id", "GoogleClassic_advSearchTD");
			td.setAttribute("class", "GoogleClassic_advSearchTD");
			td.style.setProperty("vertical-align", "middle", "important");
			tr[0].appendChild(td);
			
			debug("    appended");
		}
		
		advSearchOK = 1;
	}
	
	var safeSearchOK = 0;
	/* Safe Search placement */
	function moveSafeSearch()
	{
		debug("move safe search");
	
		var sfopt = document.getElementById("sfopt");
		if(!sfopt)
		{
			var instantBar = document.getElementById("po-bar");
			if(instantBar)
			{
				sfopt = instantBar.parentNode.parentNode;
			}
		}
		if(!sfopt)
		{
			var instantBar = document.getElementById("ss-bar");
			if(instantBar)
			{
				sfopt = instantBar.parentNode.parentNode;
			}
		}
		if(!sfopt)	return;
		
		var tsf = document.getElementById("tsf");
		if(!tsf)	return;
		var tsfp = getElementsByClassName("tsf-p", "div", tsf);
		if(tsfp.length == 0)	return;
		
		var div = thisDocument.createElement("div");
		div.appendChild(sfopt);
		div.setAttribute("id", "GoogleClassic_safeSearchDiv");
		div.setAttribute("class", "GoogleClassic_safeSearchDiv");
		div.style.setProperty("vertical-align", "middle", "important");
		tsfp[0].appendChild(div);
		safeSearchOK = 1;
	}
	
	var separatorOK = 0;
	var ssb;
	/* Separator */
	function addSeparator()
	{
		debug("add separator");
		
		// Remove any existing separators
		ssb = document.getElementById("ssb");
		//*
		if(ssb)
		{
			debug("///// remove ssb");
			ssb.parentNode.removeChild(ssb);
		}
		
		var aboveSep;
		if(isProducts)
			aboveSep = document.getElementById("srp-header");
		else
			aboveSep = document.getElementById("subform_ctrl");
		if(!aboveSep)	return;
		
		// Main div
		ssb = document.createElement("div");
		ssb.setAttribute("id", "ssb");
		if(isProducts)
			ssb.style.setProperty("width", "69em", "important");
		aboveSep.parentNode.insertBefore(ssb, aboveSep.nextSibling);
		
		separatorOK = 1;
	}
	
	var separator2OK = 0;
	function addSeparator2()
	{
		debug("addseparator2");
		
		if(!separatorOK)
			addSeparator();
	
		// Alternate search list ("Web", "Images", etc.)
		if(ssb)
			moveAltSearchList(ssb);
		
		// Show options
		addShowOptions();
		
		// Result Stats
		var resultStatsParent = document.createElement("div");
		resultStatsParent.setAttribute("id", "resultStatsParent");
		var resultStats;
		if(isProducts)
		{
			resultStats = document.getElementById("result-count");
			if(!resultStats) return;
			resultStats.setAttribute("id", "resultStats");
		}
		else
		{
			resultStats = document.getElementById("resultStats");
			if(!resultStats) return;
		}
		boldTextElement(resultStats);
		resultStatsParent.appendChild(resultStats);
		if(ssb)
			ssb.appendChild(resultStatsParent);
		
		separator2OK = 1;
	}
	
	// Bolds the numbers in result stats
	function boldTextElement(element)
	{	
		debug("bold text element: " + element + ", " + element.innerHTML);
		
		var child = element.firstChild;
		while(child)
		{
			// Element
			if(child.nodeType == 1)
			{
				if(child.tagName != "B")
					boldTextElement(child);
			}
			// Text Node
			else if(child.nodeType == 3)
			{
				boldTextNode(child);
			}
			
			child = child.nextSibling;
		}
	}
	
	function boldTextNode(textNode)
	{
		debug("bold text");
	
		var reg = /([0-9.,]+)/g;
		var match;
		while(match = reg.exec(textNode.data))
		{
			var before = textNode.data.substring(0, match.index),
				matched = match[0],
				after = textNode.data.substring(reg.lastIndex);
			
			textNode.data = before;
			
			var bolded = document.createElement("b");
			var boldedText = document.createTextNode(matched);
			bolded.appendChild(boldedText);
			
			var afterText = document.createTextNode(after);
			
			textNode.parentNode.insertBefore(afterText, textNode.nextSibling);
			textNode.parentNode.insertBefore(bolded, textNode.nextSibling);
			
			// So it can loop to the next number
			textNode = afterText;
		}
	}
	
	function moveAltSearchList(ssb)
	{
		debug("move alt search list");
		
		var prs = document.createElement("div");
		prs.setAttribute("id", "prs");
		ssb.appendChild(prs);
		var newMS = document.createElement("div");
		newMS.setAttribute("id", "GoogleClassic_newMS");
		newMS.setAttribute("class", "ms");
		prs.appendChild(newMS);
		var newMSList = document.createElement("ul");
		newMS.appendChild(newMSList);
		
		var currentSearch;
		if(isProducts)
			currentSearch = getElementsByClassName("current-mode");
		else
			currentSearch = getElementsByClassName("mitem msel");
		if(currentSearch.length == 0)	return;
		newMSList.appendChild(currentSearch[0]);
	}

	var optionState = 1;
	function toggleOptions()
	{
		setOptions(!optionState);
	}

	// 0 = hide, 1 = show
	function setOptions(newState)
	{
		whichNavLogo();
	
		optionState = newState;

		debug("toggleoptions: " + newState);
	
		var leftnav;
		if(isProducts)
			leftnav = document.getElementById("lhs-ref");
		else
			leftnav = document.getElementById("leftnav");
		debug("leftnav: " + leftnav);
		if(!leftnav)	return;
		
		var centerCol, ssb;
		if(isProducts)
		{
			debug("products: get centerCol");
			
			var centerContArray = getElementsByClassName("content-cont");
			if(centerContArray.length == 0)	return;
			centerCol = centerContArray[0];
		}
		else
			centerCol = document.getElementById("center_col");
		debug("centerCol: " + centerCol);
		if(!centerCol)	return;
		
		var showLinkContent = document.getElementById("GoogleClassic_showLinkContent");
		var showLinkIcon = document.getElementById("GoogleClassic_showLinkIcon");
		if(newState)
		{
			leftnav.style.setProperty("display", "inline", "important");
			centerCol.style.setProperty("margin-left", "196px", "important");
			centerCol.style.setProperty("border-left", "1px solid #D3E1F9", "important");
			if(showLinkContent)
			{
				showLinkContent.firstChild.replaceData(0, showLinkContent.firstChild.length, 
													lessOptions ? lessOptions : "Hide Options");
			}
			if(showLinkIcon)
				showLinkIcon.style.setProperty("background-position", showLinkIconClose, "important");
		}
		else
		{
			leftnav.style.setProperty("display", "none", "important");
			centerCol.style.setProperty("margin-left", "0px", "important");
			centerCol.style.setProperty("border-left", "0px", "important");
			if(showLinkContent)
			{
				showLinkContent.firstChild.replaceData(0, showLinkContent.firstChild.length, 
													(moreOptions ? moreOptions : "Show Options") + "...");
				//showLinkContent.innerHTML = "Show Options";
			}
			if(showLinkIcon)
				showLinkIcon.style.setProperty("background-position", showLinkIconOpen, "important");
		}
	}

	function addShowOptions()
	{
		debug("add show options");
	
		var ms = document.getElementById("GoogleClassic_newMS");
		if(!ms)				return;
		
		var showLink = document.createElement("a");
		showLink.setAttribute("class", "q qs mitem" +
						(isProducts ? " GoogleClassic_products_showOpts" : ""));
		showLink.setAttribute("href", "javascript:;");
		showLink.addEventListener("click", toggleOptions, false);
		
		var showLinkIcon = document.createElement("span");
		showLinkIcon.setAttribute("class", "micon");
		showLinkIcon.setAttribute("id", "GoogleClassic_showLinkIcon");
		var showLinkContent = document.createElement("span");
		showLinkContent.setAttribute("id", "GoogleClassic_showLinkContent");
		var showLinkContentText = document.createTextNode("");
		
		showLinkContent.appendChild(showLinkContentText);
		showLink.appendChild(showLinkIcon);
		showLink.appendChild(showLinkContent);
		ms.appendChild(showLink);
		
		if(!moreOptions)
			getShowOptionsText();
	}
	
	function getShowOptionsText()
	{
		debug("options text");
		if(isProducts)
		{
			var moreArray = getElementsByClassName("popular-ref");
			var lessArray = getElementsByClassName("more-ref");
			if(moreArray.length == 0 || lessArray.length == 0)	return;
			
			var moreInnerArray = getElementsByClassName("more-ref-link", "li", moreArray[0]);
			var lessInnerArray = getElementsByClassName("more-ref-link", "li", lessArray[0]);
			if(moreInnerArray.length == 0 || lessInnerArray.length == 0)	return;
			
			var moreLink = moreInnerArray[0].getElementsByTagName("a");
			var lessLink = lessInnerArray[0].getElementsByTagName("a");
			if(moreLink.length == 0 || lessLink.length == 0)	return;
			
			moreOptions = moreLink[0].innerHTML;
			lessOptions = lessLink[0].innerHTML;
		}
		else
		{
			var moreArray = getElementsByClassName("msm");
			var lessArray = getElementsByClassName("msl");
			if(moreArray.length == 0 || lessArray.length == 0)	return;
			
			moreOptions = moreArray[0].innerHTML;
			lessOptions = lessArray[0].innerHTML;
		}
	}

	var footerOK = 0;
	/* Footer */
	function moveFooter()
	{
		debug("move footer");
		if(isProducts)
		{
			var footer = document.getElementById("footer-bg");
			if(!footer)	return;
			
			var footerDiv = document.createElement("div");
			footerDiv.setAttribute("class", "GoogleClassic_products_footer");
			
			footer.parentNode.insertBefore(footerDiv, footer.nextSibling);
			footerDiv.appendChild(footer);
		}
		else
		{
			debug("\tnot products");
			var footer = document.getElementById("foot");
			if(!footer)	return;
			debug("\tfooter OK");
			var fll = document.getElementById("fll");
			if(!fll)	return;
			debug("\tfll OK, sibling: " + fll.previousElementSibling);
			
			// primitive previousElementSibling
			var realFooter = fll;
			do
			{
				realFooter = realFooter.previousSibling;
			}
			while(realFooter.tagName != "DIV");
			
			realFooter.setAttribute("class", "GoogleClassic_bsf");
			debug("\tset OK");
		}
		footerOK = 1;
	}
	
	// Runs in hope that the whole page has been loaded
	function firstRun()
	{
		debug("1st run");
		
		applyStyles();
		
		if(!advSearchOK)
			moveAdvSearch(document);
	
		if(!safeSearchOK)
			moveSafeSearch();
		
		if(!separatorOK)
		{
			addSeparator();
			if(separatorOK && !separator2OK)
			{
				addSeparator2();
				setOptions(0);
			}
		}
		
		if(!footerOK)
			moveFooter();
	}
	
	// Changes the page as elements are added
	function nodeInserted(e)
	{
		if(e.target && e.target.nodeType == 1 && e.target.getAttribute("id"))
		{
			debug("+++++ target: " + e.target.tagName + ", " + e.target.getAttribute("id"));
		}
		if(e.relatedNode && e.relatedNode.nodeType == 1 && e.relatedNode.getAttribute("id"))
		{
			debug("+++++ related: " + e.relatedNode.tagName + ", " + e.relatedNode.getAttribute("id"));
		}
		if(e.target && e.target.nodeType == 1 &&
			(e.target.getAttribute("id") == "main"
				|| e.target.getAttribute("id") == "guser"))
		{
			debug("///// reset");
			
			// Resets for next dynamic reload
			advSearchOK = 0;
			separatorOK = 0;
			separator2OK = 0;
			safeSearchOK = 0;
			footerOK = 0;
		}
		if(e.relatedNode && e.relatedNode.nodeType == 1)
		{
			// Newer Google 
			if(e.relatedNode.getAttribute("id") == "sbfrm_l")
			{
				debug("!!!!! sbfrm_l found");
				if(!advSearchOK)
					moveAdvSearch(document);
				if(!separatorOK)
					addSeparator();
			}
			if(e.relatedNode.getAttribute("id") == "sfcnt")
			{
				debug("!!!!! sfcnt found");
				if(!safeSearchOK)
					moveSafeSearch();
			}
			if(e.relatedNode.getAttribute("id") == "bottomhf" || e.relatedNode.getAttribute("id") == "cnt")
			{
				debug("!!!!! bottomhf found");
				if(!footerOK)
					moveFooter();
			}
			if(e.relatedNode.getAttribute("id") == "leftnavc")
			{
				debug("!!!!! leftnavc found");
				if(!separator2OK)
				{
					addSeparator2();
					setOptions(0);
				}
			}
			
			// Older Google
			if(e.relatedNode.getAttribute("id") == "subform_ctrl")
			{
				debug("!!!!! subform_ctrl found");
				if(!advSearchOK)
					moveAdvSearch(document);
				if(!separatorOK)
					addSeparator();
			}
		}
		// Older Google
		if(e.target && e.target.nodeType == 1)
		{
			if(e.target.getAttribute("id") == "leftnavc")
			{
				debug("!!!!! leftnavc found");
				if(!separator2OK)
				{
					addSeparator2();
					setOptions(0);
				}
			}
			if(e.target.getAttribute("id") == "xfoot")
			{
				debug("!!!!! xfoot found");
				if(!footerOK)
					moveFooter();
			}
		}

		
		// Check leftNav if it has the correct state
		checkLeftNav();
		
		// Reload elements upon dynamic reload
		reloadElements();
	}
	
	// Check leftNav if it has the correct state
	function checkLeftNav()
	{
		var leftNav = document.getElementById("leftnav");
		if(!leftNav)	return;
		if(optionState)
			leftNav.style.setProperty("display", "inline", "important");
		else
			leftNav.style.setProperty("display", "none", "important");
	}
	
	// Reload elements upon dynamic reload
	function reloadElements()
	{
		debug("reload");
		if(separator2OK)
		{
			// New result stats
			var resultStats = document.getElementById("resultStats");
			if(!resultStats)	return;
			if(resultStats.parentNode.getAttribute("id") != "resultStatsParent")
			{
				var resultStatsParent = document.getElementById("resultStatsParent");
				if(!resultStatsParent)	return;
				
				if(resultStatsParent.firstChild)
					resultStatsParent.removeChild(resultStatsParent.firstChild);
				resultStatsParent.appendChild(resultStats);
			}
			
			// Remove the current search from the new leftnav
			var currentSearch = getElementsByClassName("mitem msel");
			if(currentSearch.length > 1)
			{
				for(var i = 1; i < currentSearch.length; i++)
				{
					if(currentSearch[i].parentNode)
						currentSearch[i].parentNode.removeChild(currentSearch[i]);
				}
			}
		}
	}
	
	// Main function
	function main()
	{
		debug("main");
		firstRun();
		
		if(document.body)
		{
			document.body.addEventListener('DOMNodeInserted', nodeInserted, true);
			document.body.addEventListener('DOMSubtreeModified', checkLeftNav, true);
		}
	}
	
	main();
	
	window.addEventListener('load', function(e)
	{
		main();
	}, false);
})();