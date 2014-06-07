// ==UserScript==
// @name           Old Google

// @namespace      jchien edit by racnarok

// @description    Para eliminar la nueva y estorbosa sidebar de Google
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
	// Because window.document may not be correct
	var ownerDoc;

	var moreOptions, lessOptions;
	
	function debug(str)
	{
		if(console && console.debug)
			console.debug(str);
	}
	
	var locale;
	function findLocale()
	{
		var inputs = document.getElementsByTagName("input");
		for(var i in inputs)
		{
			i = inputs[i];
			if(i.getAttribute("name") == "hl")
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
			case "hy":	// Armenia "am" (needs translation to Armenian)
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
				moreOptions = "SeÃ§enekleri gÃ¶ster";
				lessOptions = "SeÃ§enekleri gizle";
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
				moreOptions = "ÐŸÐ°ÐºÐ°Ð·Ð°Ñ†ÑŒ Ð½Ð°Ð»Ð°Ð´ÐºÑ–";
				lessOptions = "Ð¡Ñ…Ð°Ð²Ð°Ñ†ÑŒ Ð½Ð°Ð»Ð°Ð´ÐºÑ–";
				break;
			case "el":	// Greek "gr"
				moreOptions = "Î•Î¼Ï†Î¬Î½Î¹ÏƒÎ· ÎµÏ€Î¹Î»Î¿Î³ÏŽÎ½";
				lessOptions = "Î‘Ï€ÏŒÎºÏÏ…ÏˆÎ· ÎµÏ€Î¹Î»Î¿Î³ÏŽÎ½";
				break;
			case "br":	// Breton
				moreOptions = "Diskouez dibaboÃ¹";
				lessOptions = "Kuzhat dibaboÃ¹";
				break;
			case "fi":	// Finnish (Suomi) "fi"
				moreOptions = "NÃ¤ytÃ¤ valinnat";
				lessOptions = "Piilota valinnat";
				break;
			case "pt-PT":	// Portuguese "pt"
			case "pt-BR":	// Brazilian "br"
				moreOptions = "Mostrar opÃ§Ãµes";
				lessOptions = "Ocultar opÃ§Ãµes";
				break;
			case "hu":	// Hungarian "hu"
				moreOptions = "BeÃ¡llÃ­tÃ¡sok megjelenÃ­tÃ©se";
				lessOptions = "BeÃ¡llÃ­tÃ¡sok elrejtÃ©se";
				break;
			case "hr":	// Croatian "hr"
			case "bs":	// Bosnian: Bosnia and Herzegovina "ba"
				moreOptions = "PrikaÅ¾i opcije";
				lessOptions = "Sakrij opcije";
				break;
			case "bg":	// Bulgarian " bg"
				moreOptions = "ÐŸÐ¾ÐºÐ°Ð·Ð²Ð°Ð½Ðµ Ð½Ð° Ð¾Ð¿Ñ†Ð¸Ð¸Ñ‚Ðµ";
				lessOptions = "Ð¡ÐºÑ€Ð¸Ð²Ð°Ð½Ðµ Ð½Ð° Ð¾Ð¿Ñ†Ð¸Ð¸Ñ‚Ðµ";
				break;
			case "sl":	// Slovene: Slovenia "si"
				moreOptions = "PokaÅ¾i moÅ¾nosti";
				lessOptions = "Skrij moÅ¾nosti";
				break;
			case "sk":	// Slovak "sk"
				moreOptions = "ZobraziÅ¥ moÅ¾nosti";
				lessOptions = "SkryÅ¥ moÅ¾nosti";
				break;
			case "ro":	// Romanian "ro"
				moreOptions = "AfiÅŸaÅ£i opÅ£iunile";
				lessOptions = "AscundeÅ£i opÅ£iunile";
				break;
			case "sv":	// Swedish: Sweden "se"
				moreOptions = "Visa alternativ";
				lessOptions = "DÃ¶lj alternativ";
				break;
			case "cs":	// Czech: Czech Republic "cz"
				moreOptions = "Zobrazit moÅ¾nosti";
				lessOptions = "SkrÃ½t moÅ¾nosti";
				break;
			case "da":	// Dansk: Denmark "dk"
				moreOptions = "Vis valgmuligheder";
				lessOptions = "Skjul valgmuligheder";
				break;
			case "th":	// Thai "th"
				moreOptions = "à¹à¸ªà¸”à¸‡à¸•à¸±à¸§à¹€à¸¥à¸·à¸­à¸";
				lessOptions = "à¸‹à¹ˆà¸­à¸™à¸•à¸±à¸§à¹€à¸¥à¸·à¸­à¸";
				break;
			case "lt":	// Lithuanian "lt"
				moreOptions = "Rodyti parinktis";
				lessOptions = "Nerodyti parinkÄiÅ³";
				break;
			case "id":	// Indonesian "id"
				moreOptions = "Tampilkan opsi";
				lessOptions = "Sembunyikan opsi";
				break;
			case "iw":	// Hebrew: Israel "il"
				moreOptions = "×”×¦×’ ××¤×©×¨×•×™×•×ª";
				lessOptions = "×”×¡×ª×¨ ××¤×©×¨×•×™×•×ª";
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
				moreOptions = "Ø¥Ø¸Ù‡Ø§Ø± Ø§Ù„Ø®ÙŠØ§Ø±Ø§Øª";
				lessOptions = "Ø¥Ø®ÙØ§Ø¡ Ø§Ù„Ø®ÙŠØ§Ø±Ø§Øª";
				break;
			case "ru":	// Russian "ru"
				moreOptions = "ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸";
				lessOptions = "Ð¡ÐºÑ€Ñ‹Ñ‚ÑŒ Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸";
				break;
			case "tl":	// Filipino "ph"
				moreOptions = "Ipakita ang mga pagpipilian";
				lessOptions = "Itago ang mga pagpipilian";
				break;
			case "ko":	// Korean: South Korea "kr"
				moreOptions = "ê²€ìƒ‰ë„êµ¬ ì—´ê¸°";
				lessOptions = "ê²€ìƒ‰ë„êµ¬ ë‹«ê¸°";
				break;
			case "no":	// Norsk "no"
				moreOptions = "Vis alternativer";
				lessOptions = "Skjul alternativer";
				break;
			case "vi":	// Vietnamese: Vietnam "vn"
				moreOptions = "Hiá»ƒn thá»‹ tuá»³ chá»n";
				lessOptions = "áº¨n tuá»³ chá»n";
				break;
			case "lv":	// Latvian "lv"
				moreOptions = "RÄdÄ«t opcijas";
				lessOptions = "SlÄ“pt opcijas";
				break;
			case "uk":	// Ukrainian: Ukraine "ua"
				moreOptions = "ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚Ð¸ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð¸";
				lessOptions = "Ð¡Ñ…Ð¾Ð²Ð°Ñ‚Ð¸ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ð¸";
				break;
			case "et":	// Estonian: Estonia "ee"
				moreOptions = "NÃ¤ita valikuid";
				lessOptions = "Peida valikud";
				break;
			case "bn":	// Bangla: Bangladesh "bd"
				moreOptions = "à¦¬à¦¿à¦•à¦²à§à¦ªà¦—à§à¦²à¦¿ à¦¦à§‡à¦–à¦¾à¦¨";
				lessOptions = "à¦¬à¦¿à¦•à¦²à§à¦ªà¦—à§à¦²à¦¿ à¦²à§à¦•à¦¾à¦¨";
				break;
			case "sr":	// Serbian: Serbia "rs"
				moreOptions = "ÐŸÑ€Ð¸ÐºÐ°Ð¶Ð¸ Ð¾Ð¿Ñ†Ð¸Ñ˜Ðµ";
				lessOptions = "Ð¡Ð°ÐºÑ€Ð¸Ñ˜ Ð¾Ð¿Ñ†Ð¸Ñ˜Ðµ";
				break;
			case "km":	// Khmer: Cambodia "kh"
				moreOptions = "áž”áž„áŸ’áž áž¶áž‰ážŸáž·áž‘áŸ’áž’áž·áž‡áŸ’ážšáž¾ážŸážšáž¾ážŸ";
				lessOptions = "áž›áž¶áž€áŸ‹ážŸáž·áž‘áŸ’áž’áž·áž‡áŸ’ážšáž¾ážŸážšáž¾ážŸ";
				break;
			case "ka":	// Georgian: Georgia "ge"
				moreOptions = "áƒžáƒáƒ áƒáƒ›áƒ”áƒ¢áƒ áƒ”áƒ‘áƒ˜áƒ¡ áƒ©áƒ•áƒ”áƒœáƒ”áƒ‘áƒ";
				lessOptions = "áƒžáƒáƒ áƒáƒ›áƒ”áƒ¢áƒ áƒ”áƒ‘áƒ˜áƒ¡ áƒ“áƒáƒ›áƒáƒšáƒ•áƒ";
				break;
			case "am":	// Amharic: Ethiopia "et"
				moreOptions = "áŠ áˆ›áˆ«áŒ®á‰½áŠ• áŠ áˆ³á‹­";
				lessOptions = "áŠ áˆ›áˆ«áŒ®á‰½áŠ• á‹°á‰¥á‰…";
				break;
			case "mo":	// Moldovan: Moldova "md"
				moreOptions = "AfiÅŸaÅ£i opÅ£iunile";
				lessOptions = "AscundeÅ£i opÅ£iunile";
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
				moreOptions = "æ‰“å¼€ç™¾å®ç®±";
				lessOptions = "å…³é—­ç™¾å®ç®±";
				break;
			case "zh-TW":	// Traditional Chinese: Taiwan "tw"
				moreOptions = "é¡¯ç¤ºé¸é …";
				lessOptions = "éš±è—é¸é …";
				break;
			case "ja":	// Japanese "jp"
				moreOptions = "æ¤œç´¢ãƒ„ãƒ¼ãƒ«ã‚’è¡¨ç¤º";
				lessOptions = "æ¤œç´¢ãƒ„ãƒ¼ãƒ«ã‚’é–‰ã˜ã‚‹";
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
		/* Transparent Icons */ \
		.csb, .ss, #logo span, .play_icon, .mini_play_icon, .micon, .close_btn, #tbp, .lsb, .mbi, \
		.mode_icon \
		{ \
			background-image:	url("data:image/png;base64,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") !important; \
		} \
		 \
		/* Search Box */ \
		.lst, .srch_box \
		{ \
			/* Font */ \
			font: 17px arial,sans-serif; \
			height: 25px	!important; \
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
			margin-right:272px; !important; \
                        margin-left:168px; !important; \
                        max-width:711px; !important; \
		} \
		.tsf-p table, .lst-td, .srchBoxCont, \
		.ds \
		{ \
			border-bottom: 0px !important; \
			margin:			0px !important; \
		} \
                .lst-td \		{ \
			border-bottom:1px solid #999; !important; \
                        padding-right:16px; !important; \
		} \
                .lst \		{ \
			-moz-box-sizing:content-box; !important; \
                        border:1px solid #ccc; !important; \
                        font:18px arial,sans-serif; !important; \
                        float:left; !important; \
                        padding:4px 0 0; !important; \
                        padding-left:6px; !important; \
                        padding-right:15px; !important; \
                        vertical-align:top; !important; \
                        width:100%; !important; \
                        border-bottom-width: 2px; !important; \
		} \
                .lst:focus \		{ \
			outline:none; !important; \
		} \
		 \
		/* Search Button */ \
		.lsb, .srch_button \
		{ \
                        background:url(/images/srpr/nav_logo13.png) bottom; !important; \
                        font:15px arial,sans-serif; !important; \
                        border:none; !important; \
                        cursor:pointer; !important; \
                        height:30px; !important; \
                        margin:0; !important; \
                        outline:0; !important; \
                        vertical-align:top; !important; \
		} \
                .lsb:active \		{ \
			background:#ccc; !important; \
		} \
		 \
		/* Border around Search button */ \
		.lsbb, \
		.srchButtonBorder, .srchButtonRightShadow \
		{ \
			background:#eee; \
                        border:solid 1px; \
                        border-color:#ccc #999 #999 #ccc; \
                        height:30px; \
                        display:block; \
		} \
		.ds \
		{ \
			border-bottom:solid 1px #e7e7e7; !important; \
                        border-right:solid 1px #e7e7e7; !important; \
                        display:inline-block; !important; \
                        margin:3px 0 4px; !important; \
                        margin-left:4px; !important; \
                        margin-right:3px: !important; \
                        height:32px !important; \
                        padding: 5px 4px 5px 4px; \
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
			background-position:-140px -152px; \
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
					namespaceResolver = (thisDocument.thisDocumentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
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
	
	/* products page is different */
	var isProducts = /.*google\..*\/products\?.*/.test(window.location);
	/* images page is different too, starting July 20, 2010 */
	var isImages = /.*google\..*\/images\?.*/.test(window.location);
	/* users stil can use basic view, though, so check for that */
	var isBasicView = /.*sout=1.*/.test(window.location);
	
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
						}';
		
		addGlobalStyle(leftNavStyle);
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
			var advSearchArray = getElementsByClassName(thisDocument, "gl nobr");
			if(advSearchArray.length == 0)
			{
				advSearch = thisDocument.getElementById("sflas");
				if(!advSearch)
				{
					debug("    adv search not found: " + thisDocument.documentURI);
					return;
				}
			}
			else
				advSearch = advSearchArray[0];
				
			debug("    adv search found");
				
			advSearch.style.setProperty("vertical-align", "middle", "important");
			
			var tsf = thisDocument.getElementById("tsf");
			if(!tsf)			return;
			var div = getElementsByClassName("tsf-p", "div", tsf);
			if(div.length == 0)	return;
			var tr = div[0].getElementsByTagName("tr");
			if(tr.length == 0)	return;
			
			var td = thisDocument.createElement("td");
			td.appendChild(advSearch);
			td.setAttribute("class", "GoogleClassic_advSearchTD");
			td.style.setProperty("vertical-align", "middle", "important");
			tr[0].appendChild(td);
		}
		
		advSearchOK = 1;
	}
	
	var safeSearchOK = 0;
	/* Safe Search placement */
	function moveSafeSearch()
	{
		debug("move safe search");
	
		var safeSearch = document.getElementById("ss-bar");
		if(!safeSearch)
		{
			safeSearchOK = 1;
			return;
		}
		
		var subform = document.getElementById("subform_ctrl");
		if(!subform)	return;
		
		subform.appendChild(safeSearch);
		safeSearchOK = 1;
	}
	
	var separatorOK = 0;
	var ssb;
	/* Separator */
	function addSeparator()
	{
		debug("add separator");
	
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
	
		// Alternate search list ("Web", "Images", etc.)
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
			centerCol.style.setProperty("margin-left", "159px", "important");
			centerCol.style.setProperty("border-left", "1px solid #D3E1F9", "important");
			if(showLinkContent)
			{
				showLinkContent.firstChild.replaceData(0, showLinkContent.firstChild.length, 
													lessOptions ? lessOptions : "Hide Options");
			}
			if(showLinkIcon)
				showLinkIcon.style.setProperty("background-position", "-153px -84px", "important");
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
				showLinkIcon.style.setProperty("background-position", "-153px -70px", "important");
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
			var footer = document.getElementById("foot");
			if(!footer)	return;
			var fll = document.getElementById("fll");
			if(!fll)	return;
			
			fll.previousSibling.setAttribute("class", "GoogleClassic_bsf");
		}
		footerOK = 1;
	}
	
	// Runs in hope that the whole page has been loaded
	function firstRun()
	{
		debug("1st run");
		
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
		if(e.target && e.target.nodeType == 1 && e.target.getAttribute("id") == "main")
		{
			// Resets for next dynamic reload
			advSearchOK = 0;
			separatorOK = 0;
			separator2OK = 0;
			safeSearchOK = 0;
			footerOK = 0;
		}
		//opera.postError("target: " + e.target.tagName + ", " + e.target.getAttribute("id"));
		if(e.relatedNode && e.relatedNode.nodeType == 1)
		{
			if(e.relatedNode.getAttribute("id") == "subform_ctrl")
			{
				debug("!!!!! subform_ctrl found");
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
		}
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
		
		if(!advSearchOK || !safeSearchOK 
			|| !separatorOK || !separator2OK || !footerOK)
		{
			if(document.body)
			{
				document.body.addEventListener('DOMNodeInserted', nodeInserted, true);
				document.body.addEventListener('DOMSubtreeModified', checkLeftNav, true);
			}
		}
	}
	
	main();
	
	window.addEventListener('load', function(e)
	{
		main();
	}, false);
})();
