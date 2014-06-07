// ==UserScript==
// @name			Cheater V3
// @version			0.16
// @namespace		Hans Goedegebuure @ google code
// @include			http://www.camorraworld.nl/*
// @include			http://www2.camorraworld.nl/*
// @include			http://coke.camorraworld.nl/*
// @include			http://www.camorraworld.org/*
// @include			http://backup.camorraworld.nl/*
// @require			http://code.jquery.com/jquery-2.0.0.min.js
// @require			http://code.jquery.com/ui/1.10.2/jquery-ui.min.js	
// @resource		JQUIcss	http://hansgoed.nl/jquery/jquery-ui.min.css
// ==/UserScript==
// Op dit script zijn de voorwaarden van www.hansgoed.nl van toepassing

// CTS helper
if (window.location.pathname === "/business/cartune.php")
{
    pauze();
	
	// Get receipts
	var receiptElement = $($('.notice')[0]);
	if (receiptElement.length !== 0)
	{
		var receiptHeader = receiptElement.find('.notice_header');
		var receiptText = receiptElement.children('.melding');
		
		var repair = new Object();
		repair.header = $(receiptHeader).text();
		
		repair.text = $(receiptText).text();
		repair.price = $(receiptText).text().replace(/[^0-9]/g, "");
		
		if (repair.header !== "Er gaat iets fout!")
		{
			var repairs = JSON.parse(getSetting("repairs", null));
			if (repairs === null)
			{
				repairs = [];
			}
			repairs[repairs.length] = repair;
			saveSetting("repairs", JSON.stringify(repairs));
		}
	}
	
	// Append info element
	var noticeGroup = $('#notice_group');
	if (noticeGroup.length === 0)
	{
		noticeGroup = $(document.createElement('div'));
		noticeGroup.addClass('notice_group');
		noticeGroup.append($(document.createElement('div')).addClass('clear'))
		$('#notice_container').append(noticeGroup);
	}
	
	var notice = $(document.createElement('div'));
	notice.addClass('notice');
	
	var content = $(document.createElement('div'));
	content.addClass('melding');
	
	var repairs = JSON.parse(getSetting("repairs", null));
	if (repairs !== null)
	{
		content.html(repairs.length + " reparaties gelogd.");
		
		var showButton = $(document.createElement("button"));
		showButton.click(function () 
		{
			var textAreaRepairs = $(document.createElement('textarea'));
			textAreaRepairs.css("width", "390px").css("height", "350px");
			
			var total = 0;
			for (var i = 0; i < repairs.length; i++)
			{
				var repair = repairs[i];
				textAreaRepairs.append(repair.header).append('\r\n').append(repair.text).append('\r\n\r\n');
				if (repair.price > 0)
				{
					total += parseInt(repair.price);
				}
			}
			
			textAreaRepairs.append("Totaal: &euro;" + number_format(total, 0, null, '.'));
			createDialog('Reparaties', textAreaRepairs)
			.show();
		})
		.html("Bonnen weergeven")
		.css("float", "right")
		.button();

		var resetButton = $(document.createElement("button"));
		resetButton.click(function ()
		{
			createDialog('Reparaties verwijderen', "Weet je zeker dat je alle reparaties uit de log wilt verwijderen?")
			.dialog("option", { 
				buttons: [ { text: "Ok", click: function() { removeSetting("repairs"); content.html("Nog geen reparaties gelogd."); $( this ).dialog( "close" ); } }, { text: "Annuleren", click: function () {$(this).dialog("close")}} ]
			});
		})
		.html("Bonnen verwijderen")
		.css("float", "right")
		.button();
		
		var buttonSet = $(document.createElement('div')).css("float", "right").append(showButton).append(resetButton);
		content.append(buttonSet);
	}
	else
	{
		content.html("Nog geen reparaties gelogd.");
	}
	
	notice.append(content);
	notice.insertBefore(noticeGroup.children(':last'));
}

// Mail checker
if (!is_vip() && parseInt(getSetting('nextMailCheck', 0)) < new Date().getTime())
{
	$.get("http://" + location.hostname + "/sys/CWE/cwe.xml.emailtables.php?type=inbox")
		.done(function (data) 
		{ 
			var body = $(data).children('rows');
			//alert(rows.length);
			var rows = $(body).children('row');
			var newMessage = false;
			$(rows).each(function ()
			{
				if (!newMessage)
				{
					var status = $(this).children(":first");
					if (status.html() === "http://cdn.camorraworld.nl/style/1/images/icons/eb.png" || status.html() === "http://cdn.camorraworld.nl/style/1/images/icons/en.png")
					{
						newMessage = true;
						return false;
					}
				}
			});
			saveSetting('unreadMessages', newMessage);
			saveSetting('nextMailCheck', (new Date().getTime() + 120000).toString());
		});
}

if (!is_vip())
{
	if (getSetting('unreadMessages', false) === true)
	{
		var mailImg = $(document.createElement('img')).prop('src', 'http://www.hansgoed.nl/other/mailIcon.png');
		$('#VIP_MENU_BASE')
			.html("")
			.append(mailImg)
			.css('height', '128px')
			.css('padding-left', '12px')
			.mouseenter(function ()
			{
				$(this).css('cursor', 'pointer');
			})
			.mouseleave(function ()
			{
				$(this).css('cursor', 'default');
			})
			.click(function ()
			{
				saveSetting('unreadMessages', false);
				saveSetting('nextMailCheck', (new Date().getTime() + 5000).toString());
				window.location.href = 'http://'  + location.hostname + '/user/email.php';
			});
	
		setInterval(function ()
		{
			mailImg.toggle();
		}, 800);
	}
}

// Toevoegen van JQuery UI css
GM_addStyle(GM_getResourceText("JQUIcss"));
GM_addStyle("\
	.flashy { background-image: none !important; } \
	.flashy * { background-image: none !important; }\
	li.flashy { background-color: #fac444; color: white; } \
	select.flashy { background-color: #fac444; color: white; } \
	input.flashy { background-color: #fac444; } \
	button.flashy { background-color: #fac444; } \
	\
	.menu_items button { width: 135px; margin-bottom: 3px; } \
	.menu_items li:last-of-type button { margin-bottom: 6px; }");

// Backwards compatibility fix
var manualMode = getSetting('showAlert', false);
if (manualMode)
{
	saveSetting('maxTries', 5);
	removeSetting('showAlert');
}

// Tutorial flashing thingie
var hasAttention = false;

// Functie voor het weergeven van een dialoogvenster dat gebruikt kan worden voor allerlei foutmeldingen
function createDialog(title, content)
{
	var dialogContent = $(document.createElement('p')).html(content);
	var dialog = $(document.createElement('div')).prop('title', title).append(dialogContent);
	dialog.dialog(
	{
		width: '450px', 
		buttons: { 
			"Ok": function () 
			{ 
				dialog.dialog("close"); 
			}
		}
	});
	
	return dialog;
}

function createLoader(title, content)
{
	var dialogContent = $(document.createElement('p')).html(content);
	var dialog = $(document.createElement('div')).prop('title', title).append(dialogContent);
	dialog.dialog(
	{
		width: '450px', 
		closeOnEscape: false,
		open: function(event, ui) 
		{
			$(".ui-dialog-titlebar-close", this.parentNode).remove();
		}
	});
	
	return dialog;
}

// Welkom dialoog weergeven met instellingen
if (getSetting('firstRun', true) && getSetting('username') === null && getUID() !== false)
{
	manualPause();
	var dialogContent = $(document.createElement('p')).html("Hoi,<p>Je bent nieuw hier heh? Je hebt of zojuist een nieuw accountje aangemaakt of je gaat voor het eerst cheaten.<p>Ik ga je een beetje helpen met het instellen van de basisinstellingen zodat je snel kunt beginnen!");
	var dialog = $(document.createElement('div')).prop('id', 'firstRunDialog').prop('title', 'Bedankt voor het gebruik van de Camorra World cheat').append(dialogContent);
	dialog.dialog(
	{
		width: '600px', 
		buttons: { "Doorgaan": function () { openIntroStep1(dialog, dialogContent);}}, 
		closeOnEscape: false,
		open: function(event, ui) 
		{
			$(".ui-dialog-titlebar-close", this.parentNode).hide();
		}
	});
}

function openIntroStep1(dialog, dialogContent)
{
	$(dialog).dialog( "option", "buttons", [ { text: "Stap overslaan", click: function() { openIntroStep3(dialog, dialogContent) } } ] );
	
	var usernameField = $(document.createElement('input')).prop('title', "Je hansgoed.nl gebruikersnaam");
	var passwordField = $(document.createElement('input')).prop('type', 'password').prop('title', "Het wachtwoord van je hansgoed.nl account");
	var inputArea = $(document.createElement('p'));
	$(dialogContent).html("Voor het oplossen van captcha's (Human Validation) heb je een hansgoed.nl account nodig en credits. Je kunt hier een account maken of inloggen, je kunt er ook voor kiezen om alle Human Validation zelf te doen.<p>")
		.append($(document.createElement('button')).text("Inloggen").button().click(function () 
		{ 
			$(inputArea).html(""); 
			$(inputArea).append($(document.createElement('table'))
				.append($(document.createElement('tr'))
					.append($(document.createElement('td'))
						.html("Gebruikersnaam: "))
					.append($(document.createElement('td'))
						.append($(usernameField)
							.button()
							.tooltip({ position: { my: "left+10 center", at: "right center", collision: "none" } }))))

				.append($(document.createElement('tr'))
					.append($(document.createElement('td'))
						.html("Wachtwoord: "))
					.append($(document.createElement('td'))
						.append($(passwordField)
							.button()
							.tooltip({ position: { my: "left+10 center", at: "right center", collision: "none" } })
							.keypress(function (event) { if (event.which === 13) { dialogLogin(usernameField, $(this)); } } )))))

			$(dialog).dialog( "option", "buttons", 
			[{ 
				text: "Stap overslaan", click: function()
				{
					openIntroStep3(dialog, dialogContent)
				} 
			}, 
			{ 
				text: "Opslaan", click: function () 
				{
					dialogLogin(usernameField, passwordField); 
				}
			}]
			);
		}
		))

		.append($(document.createElement('button')).text("Registreren").button().click(function ()
		{
			$(inputArea).html("");
			$(inputArea).html("Maak een account aan op <a href='http://www.hansgoed.nl' target='blank' style='text-decoration: underline; font-size: 16px'>hansgoed.nl</a> en log vervolgens in.");

			$(dialog).dialog( "option", "buttons", [ { text: "Stap overslaan", click: function() { openIntroStep3(dialog, dialogContent) } } ] );
		}))
		.append(inputArea);
}

function dialogLogin (usernameField, passwordField) 
{
	var username = usernameField.val();
	var password = passwordField.val();
	if (username !== "" && password !== "")
	{
		var busyDialog = createLoader("Controleren", "Bezig met controleren van je login. Even geduld...");
		checkLogin(username, password, function () { saveSetting('username', username); saveSetting('password', password); busyDialog.dialog("close"); openIntroStep2(dialog, dialogContent)}, function () { busyDialog.dialog("close"); createDialog("Inlogfout", "De gebruikersnaam of het wachtwoord klopte niet, probeer het opnieuw."); }, function () { busyDialog.dialog("close"); createDialog("Server fout", "De server kon niet bereikt worden. Probeer het later opnieuw.<p>Je kunt je gebruikersnaam en wachtwoord altijd nog opgeven via de instellingen."); });
	}
	else
	{
		createDialog("Invoerfout", "Het gebruikersnaamveld en/of het wachtwoordveld mag/mogen niet leeg zijn");
	}
} 
					
function checkLogin(username, password, onTrue, onFalse, onError)
{
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.hansgoed.nl/cheaterv3/",
		headers: {'Content-type':'application/x-www-form-urlencoded'},
		data: "data=5+a+" + username + "+" + password,
		onload: function (resp) 
		{
			switch (resp.responseText)
			{
				case "Success":
					onTrue();
					break;
				case "INV_UPC":
					onFalse();
					break;
				default:
					onError();
					break;
			}
		},
		onerror: onError,
		ontimeout: onError
	});
}

function openIntroStep2(dialog, dialogContent)
{
	var scriptTries = $(document.createElement('span')).html(3);
	var humanTries = $(document.createElement('span')).html(2);
	var maxTries = 2;
	var slider = $(document.createElement('div')).slider({
		value: 3,
		min: 0,
		max: 5,
		slide: function (event, ui)
		{
			scriptTries.html(ui.value);
			humanTries.html(5 - ui.value);
			maxTries = 5 - ui.value;
		}
	});
	
	$(dialogContent).html("Helaas gaat het uitvoeren van de \"Human Validation\" niet altijd goed. Hoeveel pogingen mag het script doen voordat jij gevraagd wordt het te proberen? (Er worden geen credits van je account afgeschreven voor mislukte pogingen.)<p>")
		.append(slider)
		.append("<br>Pogingen door de cheat: ")
		.append(scriptTries)
		.append("<br>Pogingen door jou: ")
		.append(humanTries);
	$(dialog).dialog( "option", "buttons", [ { text: "Volgende", click: function() { saveSetting("maxTries", maxTries); openIntroStep3(dialog, dialogContent) } } ] );
}

function openIntroStep3(dialog, dialogContent)
{
	saveSetting('firstRun', false);
	$(".ui-dialog-titlebar-close", this.parentNode).show();
	$(dialogContent).html("Dit waren alle basisinstellingen. De rest van de instellingen zijn crimes. In de volgende stappen lopen we ze allemaal even door. Als je <b>ècht alles</b> al weet kun je de wizard sluiten en anders druk je nu op \"Volgende\".");
	$(dialog).dialog( {
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				openIntroStep4(dialog, dialogContent); 
			} 
		}
	});
}

function openIntroStep4(dialog, dialogContent)
{
	var vvdpDiv = $('#VVDP_SCRIPT_BASE');
	var cheatHeight = vvdpDiv.offset().top + vvdpDiv.outerHeight();
	$(dialog).parent().animate({top: cheatHeight}, 3000);
	$('html, body').animate({ scrollTop: cheatHeight - ($(dialog).parent().height() / 2) }, 3000);
	var cheaterMenu = $($(vvdpDiv.next()).children(".menu_block")[0]);
	
	getAttention(cheaterMenu);
	$(dialogContent).html("Zie je dat irritante knipperding in het rechter menu? Dat is het cheater menu. Daar kun je instellen wat het script allemaal voor je moet doen.");
	$(dialog).dialog( {
		buttons: 
		{
			"Afsluiten": function() 
			{ 
				$(this).dialog('close');
			}, 
			"Ik zie 'em": function () 
			{
				hasAttention = true;
				openIntroStep5(dialog, dialogContent, true);
			} 
		},
		close: function ()
		{
			hasAttention = true;
			$(this).remove();
		}
	});
}

function openIntroStep5(dialog, dialogContent, saw4)
{
	$(dialogContent).html("Misdaden zijn er in twee vormen, \"Simpele overval\" en \"Moeilijkere overval\". Het enige dat je moet doen is kiezen welke je wilt laten doen in het uitvouwmenu.<p>Het script zal het vakje met de meeste kans uitkiezen om op die manier zo snel mogelijk te ranken.");
	if (saw4)
	{
		$(dialogContent).prepend("Mooi, dan kunnen we naar de misdaden gaan kijken. ");
	}
	var crimes = $('#misdaden');
	crimes.addClass('flashy');
	$(crimes.parent()).addClass('flashy');
	
	$(dialog).dialog( {
		buttons: 
		{ 
			"Afsluiten": function() 
			{
				$(this).dialog("close");
			},
			"Volgende": function ()
			{
				crimes.removeClass('flashy');
				$(crimes.parent()).removeClass('flashy');
				openIntroStep6(dialog, dialogContent);
			} 
		},
		close: function ()
		{
			crimes.removeClass('flashy');
			$(crimes.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep6(dialog, dialogContent)
{
	$(dialogContent).html("Voor het jatten van auto's zijn ook twee keuzes, GTA en GTA Ultra. Heel simpel, kies één van de twee uit de keuzelijst en alles komt goed.");
	var cars = $('#auto');
	cars.addClass('flashy');
	$(cars.parent()).addClass('flashy');
	$(dialog).dialog(
	{
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				cars.removeClass('flashy');
				$(cars.parent()).removeClass('flashy');
				openIntroStep7(dialog, dialogContent);
			}
		},
		close: function ()
		{
			cars.removeClass('flashy');
			$(cars.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep7(dialog, dialogContent)
{
	$(dialogContent).html("Rijlessen kun je of doen, of niet doen. Als je een vinkje in het vakje zet worden de rijlessen meegenomen in de routine.<p>Wanneer je een groot rijbewijs gehaald hebt en dus een miljoen moet gaan betalen per les worden de rijlessen volledig automatisch stopgezet.");
	var drivingLessons = $('#rijles');
	drivingLessons.addClass('flashy');
	$(drivingLessons.parent()).addClass('flashy');
	
	$(dialog).dialog( {
		buttons:
		{
			"Afsluiten": function() 
			{
				$(this).dialog("close");
			},
			"Volgende": function ()
			{
				drivingLessons.removeClass('flashy');
				$(drivingLessons.parent()).removeClass('flashy');
				openIntroStep8(dialog, dialogContent);
			} 
		},
		close: function ()
		{
			drivingLessons.removeClass('flashy');
			$(drivingLessons.parent()).removeClass('flashy');
		}
	});
}

function openIntroStep8(dialog, dialogContent)
{
	$(dialogContent).html("Schieten, dat is het doen van schietoefeningen. Altijd handig. Ik zou het vakje gewoon altijd aanvinken tot het moment dat het geen rangvordering meer oplevert.<p>Je kunt jezelf met een gerust hart in je poot schieten, wanneer je gewond geraakt bent kom je vanzelf in het ziekenhuis terecht.");
	var shooting = $('#schieten');
	shooting.addClass('flashy');
	$(shooting.parent()).addClass('flashy');
	
	$(dialog).dialog( {
		buttons:
		{
			"Afsluiten": function()
			{
				$(dialog).dialog("close");
			},
			"Volgende": function ()
			{
				shooting.removeClass('flashy');
				$(shooting.parent()).removeClass('flashy');
				openIntroStep9(dialog, dialogContent);
			}
		},
		close: function ()
		{
			shooting.removeClass('flashy');
			$(shooting.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep9(dialog, dialogContent)
{
	$(dialogContent).html("Wanneer het vinkje bij runnen aangevinkt wordt zal elke 20 minuten coke ingekocht worden bij je cokebaas. De coke wordt zo snel mogelijk weer verkocht in het land waarin de cokefabriek staat. Hierbij wordt geen rekening gehouden met de huidige straatwaarde.<p>De hoeveelheid coke die wordt ingekocht is de maximum voor je rang, of alles wat er nog ligt in de fabriek. Het script verkoopt alle drugs die je op zak hebt om ruimte te maken voor de coke van de baas.");
	var running = $('#runnen');
	running.addClass('flashy');
	$(running.parent()).addClass('flashy');
	
	$(dialog).dialog({
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				running.removeClass('flashy');
				$(running.parent()).removeClass('flashy');
				openIntroStep10(dialog, dialogContent);
			}
		},
		close: function ()
		{
			running.removeClass('flashy');
			$(running.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep10(dialog, dialogContent)
{
	$(dialogContent).html("Camorra World beloont het langer op zak houden van drugs met een rangvorderingsbonus. Wanneer drugs langer dan 30 minuten worden vastgehouden levert dit een behoorlijke boost op, vooral op hogere rangen.<p>Het script koopt coke bij de cokebaas, blijft hier vervolgens 31 minuten vanaf en gaat alles daarna proberen te verkopen. Wanneer dat gelukt is wordt meteen weer een lading verse gehaald. Ook bij deze methode komt de coke het land niet uit, en wordt het voor elke prijs verkocht.");
	var rankrunning = $('#rankrunBox');
	rankrunning.addClass('flashy');
	$(rankrunning.parent()).addClass('flashy');
	
	$(dialog).dialog({
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				rankrunning.removeClass('flashy');
				$(rankrunning.parent()).removeClass('flashy');
				openIntroStep11(dialog, dialogContent);
			}
		},
		close: function ()
		{
			rankrunning.removeClass('flashy');
			$(rankrunning.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep11(dialog, dialogContent)
{
	$(dialogContent).html("Bezit je een cokefabriek? Dan wil je vast dat je runners lekker door kunnen runnen. Je kunt de productie natuurlijk automatiseren.<p>Het script zal kijken of er al voldoende geld in de fabrieksbank zit om te produceren. Is dit niet het geval kijkt 'ie 5 minuten later nog eens. Wanneer geproduceerd kan worden wordt dit ook gedaan waarna er een uur lang niet meer naar omgekeken hoeft te worden.");
	var cokefactory = $('#CF');
	cokefactory.addClass('flashy');
	$(cokefactory.parent()).addClass('flashy');
	
	$(dialog).dialog({
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				cokefactory.removeClass('flashy');
				$(cokefactory.parent()).removeClass('flashy');
				openIntroStep12(dialog, dialogContent);
			}
		},
		close: function ()
		{
			cokefactory.removeClass('flashy');
			$(cokefactory.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep12(dialog, dialogContent)
{
	$(dialogContent).html("Wanneer je lekker aan het runnen bent en gigantische bundels cash in je zakken hebt zitten ben je een makkelijk doelwit voor zakkenrollers, de belastingdienst of misschien zelfs killers.<p>Het script zorgt er voor dat elk half uur een tripje naar de bank gedaan wordt. Of het nu is om te pinnen of te storten, het wordt gedaan. In het invoerveld kan een bedrag ingevoerd worden. Het script zal dan exact zoveel pinnen of storten dat dat bedrag overblijft.");
	var bank = $('#geld');
	bank.addClass('flashy');
	$(bank.parent()).addClass('flashy');
	
	$(dialog).dialog({
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				bank.removeClass('flashy');
				$(bank.parent()).removeClass('flashy');
				openIntroStep13(dialog, dialogContent);
			}
		},
		close: function ()
		{
			bank.removeClass('flashy');
			$(bank.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep13(dialog, dialogContent)
{
	$(dialogContent).html("Junkies.. Laat ze andere junks rekruteren, maak dr één grote bende junks van, of laat ze een beetje geld verdienen, of beter nog, laat ze lekker met rust.<p>Voor de laagste rangen kan het wel leuk zijn om een klein beetje bij te verdienen met junks, maar het is zeker geen vetpot.<p>Het script navigeert elke 5 minuten naar de pagina en zet alle beschikbare junks meteen aan het werk dat je gekozen hebt.");
	var junks = $('#jmanagement');
	junks.addClass('flashy');
	$(junks.parent()).addClass('flashy');
	
	$(dialog).dialog({
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				junks.removeClass('flashy');
				$(junks.parent()).removeClass('flashy');
				openIntroStep14(dialog, dialogContent);
			}
		},
		close: function ()
		{
			junks.removeClass('flashy');
			$(junks.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep14(dialog, dialogContent)
{
	$(dialogContent).html("Waarom zou je je tijd uitzitten als je voor een klein bedragje weer keihard door kunt met ranken?<p>Wanneer het script merkt dat ie in de gevangenis zit zal hij de kosten betalen die nodig zijn om vrij te komen. Het script geeft geen reet om de kosten, en zal zelfs je laatste cent uitgeven. Let dus op als het ranken hard gaat, want de borgkosten stijgen veel harder.");
	var buyout = $('#buyOut');
	buyout.addClass('flashy');
	$(buyout.parent()).addClass('flashy');
	
	$(dialog).dialog({
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				buyout.removeClass('flashy');
				$(buyout.parent()).removeClass('flashy');
				openIntroStep15(dialog, dialogContent);
			}
		},
		close: function ()
		{
			buyout.removeClass('flashy');
			$(buyout.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep15(dialog, dialogContent)
{
	$(dialogContent).html("Als je het script nog een tijdje door wilt laten gaan nadat je iets anders gaat doen, maar niet de ballen hebt om 'em aan te laten staan tot je weer terug komt kun je hier een tijd instellen waarop het script je uitlogt.");
	var logout = $('#autoLogout');
	logout.addClass('flashy');
	$(logout.parent()).addClass('flashy');
	
	$(dialog).dialog({
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				logout.removeClass('flashy');
				$(logout.parent()).removeClass('flashy');
				openIntroStep16(dialog, dialogContent);
			}
		},
		close: function ()
		{
			logout.removeClass('flashy');
			$(logout.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep16(dialog, dialogContent)
{
	$(dialogContent).html("Heb je het script even niet nodig, of wil je even rustig je crimes instellen? Druk op de pauzeknop in het cheater menu of in het balkje onderin.<p>Vergeet niet weer op doorgaan te drukken!");
	var pause = $('#pauze');
	pause.addClass('flashy');
	$(pause.parent()).addClass('flashy');
	
	$(dialog).dialog({
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				pause.removeClass('flashy');
				$(pause.parent()).removeClass('flashy');
				openIntroStep17(dialog, dialogContent);
			}
		},
		close: function ()
		{
			pause.removeClass('flashy');
			$(pause.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep17(dialog, dialogContent)
{
	$(dialogContent).html("Onder instellingen staan de basisinstellingen verstopt. Ook kun je hier alles resetten als het helemaal mis gaat.");
	var settings = $('#cheatSettings');
	settings.addClass('flashy');
	$(settings.parent()).addClass('flashy');
	
	$(dialog).dialog({
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			},
			"Volgende": function ()
			{
				settings.removeClass('flashy');
				$(settings.parent()).removeClass('flashy');
				openIntroStep18(dialog, dialogContent);
			}
		},
		close: function ()
		{
			settings.removeClass('flashy');
			$(settings.parent()).removeClass('flashy');
			$(this).remove();
		}
	});
}

function openIntroStep18(dialog, dialogContent)
{
	$(dialogContent).html("Wow, helemaal tot het einde!<p>Gelukkig lees jij dit in ieder geval, want ik was heel bang dat ik al dit werk voor niets aan het doen was.<p>Veel plezier!");
	
	$(dialog).dialog({
		buttons:
		{
			"Afsluiten": function ()
			{
				$(this).dialog('close');
			}
		}
	});
}

function openCheatSettings()
{
	manualPause();
	var dialogContent = $(document.createElement('p')).append($(document.createElement('h3')).html("Human validation"));

	// Human validation section
	var humanValidationSectionContent = $(document.createElement('p'));
	var humanValidationSection = $(document.createElement('div')).append(humanValidationSectionContent);
	var usernameField = $(document.createElement('input')).prop('title', "Je hansgoed.nl gebruikersnaam").val(getSetting('username', ''));
	var passwordField = $(document.createElement('input')).prop('type', 'password').prop('title', "Het wachtwoord van je hansgoed.nl account");
	var inputArea = $(document.createElement('p'));
	$(humanValidationSectionContent).html("Voor het oplossen van captcha's (Human Validation) heb je een hansgoed.nl account nodig en credits. Je kunt hier een account maken of inloggen, je kunt er ook voor kiezen om alle Human Validation zelf te doen.<p>")
		.append($(document.createElement('button')).text("Inloggen").button().click(function () 
		{ 
			$(inputArea).html(""); 
			$(inputArea).append($(document.createElement('table'))
				.append($(document.createElement('tr'))
					.append($(document.createElement('td'))
						.html("Gebruikersnaam: "))
					.append($(document.createElement('td'))
						.append($(usernameField)
							.button()
							.tooltip({ position: { my: "left+10 center", at: "right center", collision: "none" } }))))

				.append($(document.createElement('tr'))
					.append($(document.createElement('td'))
						.html("Wachtwoord: "))
					.append($(document.createElement('td'))
						.append($(passwordField)
							.button()
							.tooltip({ position: { my: "left+10 center", at: "right center", collision: "none" } })))))

		}
		))

		.append($(document.createElement('button')).text("Registreren").button().click(function ()
		{
			$(inputArea).html("");
			$(inputArea).html("Maak een account aan op <a href='http://www.hansgoed.nl' target='blank' style='text-decoration: underline; font-size: 14px'>hansgoed.nl</a> en log vervolgens in.");
		}))
	.append(inputArea);

	var maxTries = getSetting('maxTries', 2);
	var scriptTries = $(document.createElement('span')).html(5 - maxTries);
	var humanTries = $(document.createElement('span')).html(maxTries);

	var slider = $(document.createElement('div')).slider(
	{
		value: 5 - maxTries,
		min: 0,
		max: 5,
		slide: function (event, ui)
		{
			scriptTries.html(ui.value);
			humanTries.html(5 - ui.value);
			maxTries = 5 - ui.value;
		}
	});
	
	$(humanValidationSection)
		.append(document.createElement('hr'))
		.append("Helaas gaat het uitvoeren van de \"Human Validation\" niet altijd goed. Hoeveel pogingen mag het script doen voordat jij gevraagd wordt het te proberen? (Er worden geen credits van je account afgeschreven voor mislukte pogingen.)<p>")
		.append(slider)
		.append("<br>Pogingen door de cheat: ")
		.append(scriptTries)
		.append("<br>Pogingen door jou: ")
		.append(humanTries)
		.css('font-size', '14px');

	// Reset section
	var resetSectionContent = $(document.createElement('p'))
		.html("Wanneer je problemen hebt met de instellingen kun je deze volledig verwijderen en daarna alles opnieuw instellen.<p>")
		.append($(document.createElement('button'))
			.button( { label: "Resetten" } )
			.click(function () 
			{
				$(dialog).dialog('close');
				var loaderDialog = createLoader("Bezig met verwijderen", "Even geduld, de instellingen worden verwijderd.");
				for each(var val in GM_listValues())
				{
					GM_deleteValue(val);
				}
				loaderDialog.dialog('close');
				
				var successDialog = createDialog("Verwijderen voltooid", "Het verwijderen van al je instellingen is voltooid. De pagina wordt opnieuw geladen.")
					.dialog( { buttons: { "OK": function () { window.location.href = window.location.href; } } });
				
			})
		)
		.css('font-size', '14px');
			
	var resetSection = $(document.createElement('div')).append(resetSectionContent);
	
	var dialog = createDialog("Cheater instellingen", dialogContent).dialog({width: "600px"});
	$(dialogContent).append(humanValidationSection).append($(document.createElement('h3')).html("Resetten")).append(resetSection).accordion();
	$(dialog).dialog({
		buttons: {
			"Annuleren": function () 
			{
				$(this).remove(); 
			},
			"Opslaan": function ()
			{
				var username = usernameField.val();
				var password = passwordField.val();
				if (username !== getSetting('username', "") || password !== "")
				{
					var busyDialog = createLoader("Controleren", "Bezig met controleren van je login. Even geduld...");
					checkLogin(username, password, function () { saveSetting('username', username); saveSetting('password', password); busyDialog.dialog("close"); $(dialog).dialog('close'); }, function () { busyDialog.dialog("close"); createDialog("Inlogfout", "De gebruikersnaam of het wachtwoord klopte niet, probeer het opnieuw."); $(dialogContent).activate(0); }, function () { busyDialog.dialog("close"); createDialog("Server fout", "Je gebruikersnaam en wachtwoord konden niet gecontroleerd worden. Alle instellingen zijn wel opgeslagen."); saveSetting('username', username); saveSetting('password', password); $(dialog).dialog('close'); });
				}
				else
				{
					$(dialog).dialog('close');
				}
			}
		}, 
		position: ['center', 'center'] });
}

function getAttention(element)
{
	if (!hasAttention)
	{
		if (!element.hasClass('flashy'))
		{
			element.addClass('flashy');
		}
		
		element.effect('highlight', {}, 1500, function ()
		{
			if (!hasAttention)
			{
				getAttention(element);
			}
			else
			{
				element.removeClass('flashy');
			}
		});
	}
	else
	{
		hasAttention = false;
	}
}

function is_vip()
{
	return !(unsafeWindow.VIPMDATA.length === 1 || unsafeWindow.VIPMDATA === undefined);
}

var plaatjes, img, script, listenersSet, userId;
var version = GM_info.script.version;
var servers = new Array("http://www.hansgoed.nl");
var pagesArray = new Array("/sys/humanvalidation.php", "/user/dashboard.php", "/user/facebook_dashboard.php","/crime/light.php",
"/crime/medium.php", "/crime/drivinglesson.php", "/crime/gta.php", "/crime/drivinglesson.php", "/crime/killpractice.php",
"/cw/hospital.php", "/crime/deal_drugs.php", "/business/coke-info.php", "/business/coke.php", "/crime/junkies.php", "/user/cash.php");

if ($("h1:contains('Je zit in de gevangenis!')").length > 0 && getSetting('buyout', false))
{
	$.get("http://" + window.location.hostname + "/cw/jail.php?action=1");
}

/*	Log out when logOutTime is later than the actual time
    If not, start the precheck (captcha finding etc.)
    When all that goes correct, start doing the crimes
*/

if (parseInt(GM_getValue("logOutTime", "99999999999999")) > new Date().getTime()){
    makeMenu();
    start();
}
else {
    GM_deleteValue("logOutTime");
    window.location.pathname = "/sys/login.php?dologout";
}

function start(){
	
	if (preCheck())
	{
		init();
	}
}
function output(id, errText)
{
	// returnvalue: (string) text to output
	/* 	Return text to output
		We select the array by the selected language
		Then we select the correct message and return it
	*/

	texts = Array(
		"Verdacht plaatje gevonden op de pagina.", // 0
		"Kon jou unieke userId niet vinden.. Probeer eens te updaten.", //1
		"De server gaf een niet-geldig antwoord. Meld mij dit alsjeblieft op: " + servers[0], //2
		"Instellingen", //3
		"<span style=\"color: red;\">Er is een nieuw tabblad geopend met daarop de instellingen. Zorg ervoor dat je dit afgesloten hebt voor je account op lockdown gaat.</span>", //4
		"CAPTCHA systeem",//5
		"Om mee te doen aan het captcha systeem maak je op <a style=\"color: #FF0000;\" target=\"blank\" href=\"" + servers[0] + "\">" + servers[0] + "</a> een account aan.<br/>Vervolgens ga je naar de instellingen (nieuw tabblad) en klik je \"cheater instellingen\".<br/>Vul op deze pagina de gegevens van het zojuist gemaakte account in.<br/>(lukt het je niet omdat je de instellingen niet ziet of ze verdwijnen zet dan cheater v2 uit)", //6
		"Overzicht", //7
		"Geweldige dingen die je behaald hebt door vals te spelen..", //8
		null, //9
		"<div id=\"cbs\"><div class=\"cb\"><h1>Camorra Cheat instellingen</h1><p><span style=\"color: green;\" id=\"saved\"></span><div id=\"settingsDiv\"><h2>Captcha solver instellingen</h2><p>Gebruikersnaam: <input type=\"text\" id=\"uName\" value=\"" + getSetting("username", "") + "\" /><br />Wachtwoord: <input type=\"password\" id=\"pWord\" /><br /><input type=\"submit\" id=\"checkPW\" value=\"Controleer gebruikersnaam en wachtwoord\" /><br /> Aantal pogingen voor oplossen overhouden: <input id=\"maxTries\" type=\"text\" value=\"" + getSetting("maxTries", "2") + "\" title=\"4 betekent dat maar 1 van de 5 pogingen gebruikt wordt. -1 is alle pogingen gebruiken en doorgaan (nog niet getest)\" /> (2 is aangeraden, max 4)<input type=\"button\" id=\"ok\" value=\"Opslaan\" /><h2>Reset alle instellingen</h2><p>Wanneer je problemen hebt met de instellingen kun je deze volledig verwijderen en daarna alles opnieuw instellen.<br/><input type=\"submit\" id=\"reset\" value=\"Resetten\" /></div></div></div>", //10
		"Hoe laat wil je uitloggen? (heel uur (0-23))", //11
		"De server antwoordde met een error, breng mij hier alsjeblieft van op de hoogte. Het volgende bericht is wat je dan aan me door moet geven: " + errText, //12
		"De gebruikersnaam en wachtwoord combinatie komt niet voor in mijn database", //13
		"Je captcha-krediet is op. Koop alsjeblieft nieuw krediet, of schakel captcha solving uit", //14
		"Mijn database is niet bereikbaar op dit moment", //15
		"Het script stuurde een niet geldig verzoek naar de server", //16
		"De captcha solving services deden er te lang over deze captcha op te lossen", //17
		"Jouw versie " + version, //18
		null, //19
		"Resetten voltooid", //20
		"Automatisch uitloggen", //21
		"<h1>De standaard crimes instellingen</h1>", //22
		"Je vroeg niet-bestaande opties op", //23
		"Autopauze aangezet. Ga naar de pagina van een van de misdaden om door te gaan", //24
		null, //25
		"Gereed", //26
		"Instellingen opgeslagen", //27
		"De captcha solving service vertoont problemen", //28
		"<font color=\"red\">Het max aantal pogingen mag alleen van -1 t/m 4 zijn</font>", //29
		"<font color=\"red\">De tijd tussen het updaten van de berichten of veilige plaatjes moet 10 minuten of langer zijn</font>" //30
	);
	
	if (id <= texts.length - 1)
	{
		var translation = texts[id];
		if (translation !== null)
		{
			return translation;
		}
	}

	return "Geen bestaande vertaling gevonden";
}

function preCheck()
{ 
	// returnvalue: (bool) successful precheck
	/*	Is this page cheatable?
		If the current page is not in the array (only crimes pages are in that array)
		- Maximize the frame
		- Display a message and pause
	*/
   
	if (getSetting('paused', false) || getSetting('firstRun', true) || gepauzeerd)
	{
		return false;
	}
	
	if (document.location.pathname === getSetting('clickedPage', null))
	{
		alert("Ya clicked, didn't ya");
		return false;
	}
	
	if (pagesArray.indexOf(document.location.pathname) < 0)
	{
		//createDialog("Pauze", "De cheat is gepauzeerd tot het moment dat je rechtsonderin weer op doorgaan klikt.");
		//manualPause();
		pauze();
		return false;
	}

	// Get messages from server
	if ((parseInt(GM_getValue('msgUpdate','0'))) < (new Date().getTime() - (parseInt(GM_getValue("msgUpdateDelay", '60'))) * 60000)){
		if (request(0, 2, servers[0])){
			GM_setValue('msgUpdate', new Date().getTime().toString());
		}
	}

	/* 	Check for an existing Captcha.
		Also check for results of a previous recognition try
		If there is another captcha report a made mistake.
	*/
	if (captureCaptcha() && !gepauzeerd)
	{
		//TODO Show loader icon
		//http://img.cdn.tl/loading42.gif maybe?
		var humanValidationInputInterval = setInterval(function () 
		{
			var inp = $($("input[name=HumanValidationAnswer]")[0])
			var val = "Even geduld.";
			if (inp.val() === "Even geduld.") val = "Even geduld..";
			if (inp.val() === "Even geduld..") val = "Even geduld...";
			if (inp.val() === "Even geduld...") val = "Even geduld.";
			
			inp.val(val);
		}, 750);
		
		$($("input[name=HumanValidationAnswer]")[0]).click(function ()
		{
			clearInterval(humanValidationInputInterval);
			$(this).val("");
		});
		
		// Send the captcha to the server
		num = parseInt(getSetting("captchTries", 5));
		
		// Report failed captcha
		if (num !== 5 && getSetting("lastId", false))
		{
			request(0, 3, servers[0]);
		}
		if (num > parseInt(getSetting("maxTries", 2)) && (getSetting('username') !==  null))
		{
			request(0, 1, servers[0]);
		}
		else 
		{
			if (getSetting('username') === null)
			{
				// User hasn't set an account or maximum tries are exceeded
				alert("Om de Human Validation automatisch op te laten lossen moet je je hansgoed.nl inloggegevens invoeren in de cheater instellingen");
			}
			else
			{
				alert("Je hebt onder \"instellingen\" ingesteld dat het script " + (5 - parseInt(getSetting('maxTries', 2))) + " pogingen mag doen. Dit is helaas niet gelukt.")
			}
		}
		return false;
	}
	else 
	{
		saveSetting("captchTries", "5");
		removeSetting("lastId");
		removeSetting("triedAnswers");
	}

	return true;
}

/*	Settings per user
	First we find the local ID from an array of 'camorra world IDs'
	Then we get the settings. These are an array.
	We get the right setting.

	Or we save them with the saveSetting function
*/
function getSetting(settingName, defaultValue){ // returnvalue: correct setting
    accountId = getUID();
    if (defaultValue === null || defaultValue === undefined)
    {
        value = GM_getValue(settingName + "_" + accountId);
		if (value === undefined)
		{
			return null;
		}
		return value;
    }
    return GM_getValue(settingName + "_" + accountId, defaultValue);
}
function saveSetting(settingName, value){
	accountId = getUID();
	GM_setValue(settingName + "_" + accountId, value);
}
function removeSetting(settingName){
	accountId = getUID();
	GM_deleteValue(settingName + "_" + accountId);
}
/* 	Get userId by grabbing the personal homepagelink.
	This contains a number that is the userId.
	This information is accessible from every page.

	I use this for reference to personal options
*/
function getUID(){ // returnvalue: (string) userId

	if (userId !== undefined)
	{
		return userId;
	}
	
	var links = document.getElementsByTagName("a");
	
	for (numba = 0; numba < links.length; numba++){
		if (links[numba].href.indexOf("/cw/criminal.php?id=") > -1){
			return links[numba].href.replace("http://" + window.location.hostname + "/cw/criminal.php?id=", "");
		}
	}
    return false;
}

/* 	All the menu functions
	Just building the menu by stacking elements
*/
function makeMenu(){
	GM_addStyle("\
		#menuDiv {height: 24px; width: 100%; position: fixed; bottom: 0px; }\
		#messageBar {width: 100%; height: 24px; background-color: #454545; line-height: 24px; color: #DDDDDD; }\
		#messageBox { float: left; padding-left: 8px; } \
		#pauseButton { position: absolute; } \
		#versionSpace {float: right; padding-right: 8px; }\
	");
	
	text = "<div id=\"messageBar\"><div id=\"messageBox\"></div><button id=\"pauseButton\">Pauzeren</button><div id=\"versionSpace\">" + output(18) + "</div></div>";
	
	menu = document.createElement("div");
	menu.id = "menuDiv";
	menu.innerHTML = text;
	
	document.body.appendChild(menu);
	$('body').append($(document.createElement('div')).css('height', '24px'));
	
	$('#pauseButton')
	.button({
		icons: 
		{
			primary: 'ui-icon-pause'
		},
		height: "24px",
		create: function( event, ui ) 
		{
			$(this).css('font-size', '10px').css('left', Math.round(($($(this).parent()).innerWidth() / 2) - (($(this).outerWidth()) / 2)) + "px");
		}
	})
	.click(manualPause);

	setInterval(rotateMessages, 10000);
	rotateMessages();
}

/*	A function for finding the image that is the captcha
	It is very weak, but it does the job
*/
function captureCaptcha()
{
	plaatjes = document.getElementsByTagName('img');
	i = 0;
	while (i < plaatjes.length){
		if (plaatjes[i].src.indexOf("/sys/captcha/captcha.php") > -1){
			return true;
		}
		i++;
	}
	return false;
}

/* 	A very useful function not made by me.
	It converts an image into a base64 hash, which can be sent over the web..
*/
function getBase64Image(img)
{
    if (!img){
        return false;
    }
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL("image/jpeg");
}

/*	I've had problems with the captcha getting turned into a string before it was loaded
	For that this function comes in.

	This function is called while making a solve request, and will abort it if the image is not loaded
	After one second it will be restarted, and if the image is loaded, the function continues
*/
function checkComplete(img)
{
	if (!img.complete)
	{
		setTimeout(preCheck, 1000);
		GM_log("Waiting for image to complete");
		return false;
	}
	num = parseInt(getSetting("captchTries", "5"));
	saveSetting("captchTries", --num);
	return true;
}

/*	Display different messages in the messageBox (in the bar)
	Because I like my name so much it's displayed for 20 seconds every pageload
	After these 20 seconds this function is called. It will replace it with a locally stored string.
	Every 20 seconds this gets repeated so all the strings have had their turn, and it will go back to number 0
*/
function rotateMessages()
{
	var messageNum = GM_getValue("activeMessage", 0);
	var messagesString = GM_getValue("message", null);
	
	var messages = [];
	
	if (messagesString !== null)
	{
		messages = messagesString.split(",");
	}
	messages[messages.length] = "CW cheater V3 &copy; Hans Goedegebuure 2013";
	
	if (messageNum < messages.length - 1)
	{
		messageNum++;
	}
	else 
	{
		messageNum = 0;
	}
	
	GM_setValue("activeMessage", messageNum);

	messageBox = document.getElementById("messageBox");
	messageBox.innerHTML = messages[messageNum];
}

/*	Everything needed for processing an HTTP request.
	All the data that is retrieved from another pages is handled through here.

	-	makeRequest gathers the data and puts it to a string
	-	Request sends the actual data.
	-	handleResponse catches the server's response and uses it
	-	handleError retries the request with the next server until all of them are tried.
	getBase		Ofcourse that only happens when the previous server failed
*/

function request(location, type, server)
{
	// no returnvalue
	locations = new Array(server + "/cheaterv3/index.php");
	dataString = makeRequest(type);
	if (!dataString){
		return false;
	}
	GM_xmlhttpRequest({
		method: 'POST',
		headers: {'Content-type':'application/x-www-form-urlencoded'},
		url: locations[location],
		data: dataString,
		onload: function (resp){handleResponse(resp, type)},
		onerror: handleError
	});
	return true;
}
function handleError(){
	if ((server + 1) < (servers.length)){
		thisServer = servers[server];
		nextServer = servers[server + 1];
		GM_log("Failed to retrieve " + thisServer + " trying again with " + nextServer);
		request(location, type, server + 1);
	}
	else {
		GM_log("None of the servers could be reached.. Stopped trying");
                alert("connection error");
	}
}
function handleResponse(resp, type){
	GM_log("response for " + type + ": " + resp.responseText);
	switch (type) {
		case 0:
			data = response.responseText.toString().split(";");
			GM_setValue("ImageListSrc", data[0]);
			GM_setValue("ImageListB64", data[1]);
			GM_setValue("imgVersion", data[2]);
			break;
		case 1:
			data = resp.responseText.toString().split(";");
			if (!knownError(data)) 
			{
				triedAnswers = getSetting("triedAnswers", false);
				if (triedAnswers !== false)
				{
					triedAnswers = triedAnswers.split(",");
				}
				else
				{
					triedAnswers = Array();
				}                           

				numTries = parseInt(getSetting("numTries", 0));
				saveSetting("lastId", data[1]);

				if (triedAnswers.indexOf(data[0]) > -1 && numTries < 3)
				{
					request(0, 3, servers[0]);
					request(0, 1, servers[0]);
					saveSetting("numTries", numTries++);
					return;
				}
				else 
				{
					triedAnswers[triedAnswers.length] = data[0];
				}

				saveSetting("triedAnswers", triedAnswers.toString());

				inputs = document.getElementsByName("HumanValidationAnswer");
				inputs[0].value = data[0];
				inputs = document.getElementsByName("HumanValidationSubmit");
				inputs[0].click();
			}
			break;
		case 2:
			GM_setValue("message", resp.responseText);
			break;
		case 3:
			break;
                case 4:
                        break;
                case 5:
                        document.getElementById("checkPW").value = resp.responseText;
                        break;
	}
}

function makeRequest(type){
	switch (type){
		case 0:
			sendData = GM_getValue("imgVersion", "0");
			break;
		case 1:
			if (!checkComplete(plaatjes[i])){
				GM_log("Request failed, image not completed");
				
				return false;
			}
			basedImage = getBase64Image(plaatjes[i]).toString();
			match = 0;
			while (match > -1){
				basedImage = basedImage.replace("+", "{plus}");
				match = basedImage.indexOf("+");
			}
			username = getSetting('username', false);
			password = getSetting('password', false);
			sendData = basedImage + "+" + username + "+" + password;
			break;
		case 2:
			sendData = getSetting("language", "1");
			break;
		case 3:
			username = getSetting('username', false);
			password = getSetting('password', false);
			lastId = getSetting("lastId", "0");
			sendData = lastId + "+" + username + "+" + password;
			break;
        case 5:
            username = document.getElementById("uName").value;
            password = document.getElementById("pWord").value;
            sendData = "dummy+" + username + "+" + password;
            break;
	}
	returnValue = "data=" + type + "+" + sendData;
	GM_log("request for " + type + ": " + returnValue);
	return returnValue;
}

/*	When the logout button is clicked, ask for the logout hour
	(When the logout hour is earlier than now, log out tomorrow at logout hour)
*/
function setLogOutTime(){
	hour = prompt(output(11), "23");
	time = new Date();
	time.setHours(hour,"0", "0", "0");
	timeToLogOut = parseInt(time.getTime());
	if (timeToLogOut < parseInt(new Date().getTime())){
		timeToLogOut += 86400000;
	}
	GM_setValue("logOutTime", timeToLogOut.toString());
}

/*	Display all settings divided in two functions (and screens)
	When the button is clicked, save the settings.
*/

/* The function that removes ALL the settings
 * Called when the reset button is clicked in the settings
 */
function reset(){
    for each(var val in GM_listValues()){
        GM_deleteValue(val);
    }

    resetButton.style.color = "green";
    resetButton.value = output(20);
}

function checkPW(){
    checkButton.value = "Bezig met checken";
    request(0, 5, servers[0]);
}
/* save the settings that are typed in the boxes in the settings
 */
function save(){
    // Captcha username/password section
	username = document.getElementById("uName").value;
	password = document.getElementById("pWord").value;
	maxTries = document.getElementById("maxTries").value;

	maxTries = parseInt(maxTries);
	if (maxTries === 0 || maxTries){
		if (maxTries < 5){
			saveSetting("maxTries", maxTries);
		}
		else {
			saved = document.getElementById("saved");
			saved.innerHTML = output(29);
			return;
		}
	}
	saveSetting("username", username);
	if (!((getSetting("password") !== null) && password === "")){
		saveSetting("password", password);//yes, no encryption, watch out for people knowing where to find these settings
	}

	saved = document.getElementById("saved");
	saved.innerHTML = output(27);
	
	$('#settingsDiv').css('display', 'none');
}

function knownError(data)
{
	possibleError = data[0];
	switch (possibleError){
		case "ErrorTIMEOUT":
			alert(output(17));
			return true;
		case "":
			alert(output(17));
			return true;
		case "INV_REQ":
			alert(output(16));
			return true;
		case "DBE":
			alert(output(15));
			return true;
		case "No_credit":
			alert(output(14));
			return true;
		case "INV_UPC":
			alert(output(13));
			return true;
		default:
			break;
	}
	if (possibleError.toLowerCase().indexOf("error") >= 0)
	{
		alert(output(12, data[0]));
		return true;
	}
	return false;
}

//Copy paste of v2..

// Variabelen
var checked0, checked1, checked2, checked3, checked4, checked5, checked6, random, banken, checkcokehoeveelheid, num, timeout, stats;
var optValue = new Array();
var opt2Value = new Array();
var waarde = new Array();
var tijd = new Array();
var doen = new Array();
var links = new Array();
var url = location.href;
var server = location.hostname;
var path = location.pathname;

var gepauzeerd = getSetting('paused', false);

makeMenu2();

function init(){
    var pageVisitTime = (Math.random() * 1500) + 1000;
	var url = location.href;
	var server = location.hostname;
	
    i = 0;
	
    if (unsafeWindow.tellermisdaad !== undefined)
	{
        var times = readTimes();
		
		if (getSetting('rankrunnen', false))
		{
			if (getSetting('voorraad', false))
			{
				unsafeWindow.tellercoke += 660;
			}
			$('#WAITTIMES_BOARD a:contains("Coke runnen")').text("Coke runnen (rankrunnen)");
		}
		
        noStats = getSetting("noStats", 0);
        if (Math.round(Math.random() * 20) !== noStats && noStats < 20)
        {
            clearTimeout(stats);
            noStats++;
        }
        else
        {
            noStats = 0;
        }
        saveSetting("noStats", noStats);
		
		uitvoeren(times);
    }
	else
	{
		if (getSetting('awaitingActions', null) !== null)
		{
			
		}
		else
		{
			if (window.location.pathname.indexOf("dashboard") === -1)
			{
				if (!gepauzeerd)
				{
					stats = setTimeout(visitPage, pageVisitTime + 2000, "/user/dashboard.php");
				}
			}
		}
	}
	
    if (window.location.pathname === "/user/dashboard.php"){
		var progressBars = $('.dash_progress_bar');
		
		if (parseInt($($(progressBars[1]).parent()).text()) === 100)
		{
			saveSetting("rijles", false);
		}

		var health = parseInt($($(progressBars[4]).parent()).text().replace(/^[0-9]/g, ''));
		
        if (health < 90)
        {
            timeout = setTimeout(visitPage, pageVisitTime, "/cw/hospital.php");
        }
        else {
            if (health !== 100)
            {
                saveSetting("goToHospital", true);
            }
            timeout = setTimeout(visitPage, pageVisitTime, "/user/facebook_dashboard.php?times");
        }
    }
    i = 0;

    if (getSetting("runnen", false) && (!getSetting("runmax", false)))
	{
        checkcokehoeveelheid = true;
    }
    // Cheater script toevoegen
    var div = $('#VVDP_SCRIPT_BASE');
    if (div)
	{
       var cheatDiv = $(document.createElement('div'));
	   $(div.parent()).add(cheatDiv);
    }
    // !! Cheater script toevoegen

    // Error geven als runnen en cokefabriek beide zijn aangevinkt
    if (getSetting('runnen', false) && getSetting('CF', false)){
      removeSetting('runnen');
	  removeSetting('CF');
      alert("Je kunt niet, en runnen, en een cokefabriek hebben..");
    }
    // !! Error geven als runnen en cokefabriek beide zijn aangevinkt

    // Headers opvangen
    if (location.pathname === "http://" + server + "/crime/deal_drugs.php")
	{
		var notices = $('#notice_group .notice .notice_header:contains("Deal succesvol afgerond!")');
		if (notices.length === 1)
		{
			saveSetting('voorraad', false);
		}
    }
	
	if (location.pathname === "/business/coke-info.php")
	{
		var notices = $('#notice_group .notice .notice_header:contains("Deal succesvol!")');
		if (notices.length === 1)
		{
			saveSetting('voorraad', true);
		}
	}

    forms = document.getElementsByTagName("form");
    if (forms.length > 0){
        inputs = forms[0].getElementsByTagName('input');
    }
    else {
        inputs = document.getElementsByTagName("input");
    }
    i = 0;
    aantalhidden = 0;
    while (inputs[i]){
        if (inputs[i].type == "hidden"){
            aantalhidden++;
        }
        i++;
    }
    aantalExtra = 0;
    
    kliktijd = (Math.random() * 2000) + 1000;

    if (url == "http://" + server + "/crime/light.php"  && inputs.length == 4 + aantalhidden + aantalExtra  && getSetting('misdaden') == 1)
	{
		JQinputs = $('form input:radio');
		
		var best = 0;
		
		JQinputs.each(function () {
			var chance = $($(this).parent()).text().replace(/[^0-9]/g, '');
			
			if (chance >= best)
			{
				this.click();
				best = chance;
			}
		});
		
        timeout = setTimeout(klikknop, kliktijd, 3);
    }
    if (url == "http://" + server + "/crime/medium.php" && inputs.length == 4 + aantalhidden + aantalExtra && getSetting('misdaden') == 2){
        JQinputs = $('form input:radio');
		
		var best = 0;
		
		JQinputs.each(function () {
			var chance = $($(this).parent()).text().replace(/[^0-9]/g, '');
			
			if (chance >= best)
			{
				this.click();
				best = chance;
			}
		});
		
        timeout = setTimeout(klikknop, kliktijd, 3);
    }
    if (url == "http://" + server + "/crime/gta.php" && (inputs.length == 3 + aantalhidden + aantalExtra || inputs.length == 2 + aantalhidden + aantalExtra) && getSetting('auto', 0) == 1){
        inputs[0 + aantalhidden].click();
        if (inputs.length == 3 + aantalhidden + aantalExtra){
            timeout = setTimeout(klikknop, kliktijd, 2);
        }
        else {
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
    }
    if (url == "http://" + server + "/crime/gta.php" && (inputs.length == 3 + aantalhidden + aantalExtra) && getSetting('auto', 0) == 2){
        timeout = setTimeout(klikknop, kliktijd, 2);
    }
    if (url == "http://" + server + "/crime/killpractice.php" && inputs.length == 1 + aantalhidden + aantalExtra && getSetting('schieten')){
        timeout = setTimeout(klikknop, kliktijd, 0);
    }
    if (url == "http://" + server + "/crime/drivinglesson.php" && (inputs.length == 1 + aantalhidden + aantalExtra || inputs.length == 2 + aantalhidden + aantalExtra) && getSetting('rijles')){
        div = document.getElementsByTagName('td');
        i = 0;
        while (i < div.length){
            if (div[i].innerHTML.match("1.000.000 per les") == "1.000.000 per les"){
                saveSetting('rijles', false);
                timeout = setTimeout(visitPage, pageVisitTime, "/user/dashboard.php");
            }
            i++;
        }
        if (getSetting('rijles')){
            if (inputs.length == 1 + aantalhidden + aantalExtra){
                timeout = setTimeout(klikknop, kliktijd, 0);
            }
            else {
                timeout = setTimeout(klikknop, kliktijd, 1);
            }
        }
    }
    if (url == "http://" + server + "/user/cash.php" && inputs.length == 0 + aantalhidden + aantalExtra && isInt(getSetting('banken')))
	{
		var cash = parseInt($('a:contains("cash")').text().replace(/[^0-9]+/g, ''));
		var bank = parseInt($('a:contains("bank")').text().replace(/[^0-9]+/g, ''));
        
		var targetCash = parseInt(getSetting('banken'));
		
		if (!(cash === targetCash || (cash < targetCash && bank === 0)))
		{
			inputs = document.getElementById("typepin").parentNode.getElementsByTagName("input");

			saveSetting('banktijd', (Number(new Date()) + 1800000).toString());

			if (isNum(cash)){
				if (cash > getSetting('banken')){
					inputs[1 + aantalhidden].click();
					banken = cash - getSetting('banken');
					inputs[2 + aantalhidden].value = banken;
					timeout = setTimeout(klikknop, kliktijd, 3);
				}
				if (cash < getSetting('banken')){
					banken = cash - getSetting('banken');
					banken = banken * -1;

					// Not enough money in the bank
					if (bank < banken)
					{
						banken = bank; // Withdraw as much as possible
					}
					inputs[2 + aantalhidden].value = banken;
					timeout = setTimeout(klikknop, kliktijd, 3);
				}
			}
		}
    }
    if (url === "http://" + server + "/business/coke-info.php" && inputs.length === 2 + aantalhidden + aantalExtra && getSetting('runnen') && !getSetting("voorraad", false)){
        var coke = getSetting('runmax');
		var voorraad;
		
		var label = $('td:contains("voorraad")');
		if (label.length === 1)
		{
			var value = $($(label.parent()).last());
			voorraad = parseInt(value.html().replace(/[^0-9]+/g, ''));
		}

        if (voorraad === undefined)
		{
			GM_log('Unable to read cokefactory stock');
			return;
		}
		
        if (voorraad >= coke){
            inputs[0 + aantalhidden].value = coke;
            saveSetting('voorraad', true);
            saveSetting('cokeTried', true);
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
        if ((voorraad < coke) && (voorraad !== 0)){
            inputs[0 + aantalhidden].value = voorraad;
            saveSetting('voorraad', true);
            saveSetting('cokeTried', true);
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
        if (voorraad === 0){
            saveSetting('coketijd', (Number(new Date()) + 300000).toString());
        }
		else
		{
			removeSetting('coketijd');
		}
    }
    if (url === "http://" + server + "/crime/deal_drugs.php" && inputs.length === 2 + aantalhidden + aantalExtra && getSetting('runnen')){
        td = document.getElementsByTagName('td');
        td = td[0].innerHTML;

        coke = td.search('kg coke');
        max = td.search('kg</i></a>');
        maxcoke = td.substring(coke, max);
        maxcoke = maxcoke.replace(/[^0-9]+/g, '');
        maxcoke = parseInt(maxcoke);
        saveSetting('runmax', maxcoke);

        wiet = td.search('<b>');
        wiet2 = td.search('wiet');
        wiet = td.substring(wiet, wiet2);
        wiet = wiet.replace(/[^0-9]+/g, '');

        td = td.substring(wiet2, td.length);
        hasj = td.search('<b>');
        hasj2 = td.search('hasj');
        hasj = td.substring(hasj, hasj2);
        hasj = hasj.replace(/[^0-9]+/g, '');

        td = td.substring (hasj2, td.length);
        coke = td.search('<b>');
        coke2 = td.search('coke');
        coke = td.substring(coke, coke2);
        coke = coke.replace(/[^0-9]+/g, '');

        select = document.getElementsByTagName('select');
        select[0].value = 2;

        if (coke == 0){
            saveSetting('voorraad', false);
        }
        if (wiet > 0){
            select[1].value = 3;
            inputs[0 + aantalhidden].value = wiet;
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
        if (hasj > 0){
            select[1].value = 1;
            inputs[0 + aantalhidden].value = hasj;
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
        if (coke > 0){
            select[1].value = 2;
            inputs[0 + aantalhidden].value = coke;
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
    }
    if (url == "http://" + server + "/cw/hospital.php" && inputs.length == 2 + aantalhidden + aantalExtra){
        if (inputs[0 + aantalhidden].value != 0){
            timeout = setTimeout(klikknop, kliktijd, 1);
        }
        else
        {
            removeSetting("goToHospital");
        }
    }
    if (url === "http://" +server+ "/business/coke.php"){
		//TODO make nice, read times and shit..
        if ((inputs[0 + aantalhidden].value === "Start inspectie & productie") && (document.body.innerHTML.indexOf("geproduceerd") === -1) && !getSetting('triedCoke', false)){
            timeout = setTimeout(klikknop, kliktijd, 0);
            tijd = Number(new Date());
            over1uur = tijd + 3660000;
            over1uur = over1uur.toString();
            saveSetting('kooptijd', over1uur);
            saveSetting('triedCoke', true);
        }
        else{
            if (parseInt(getSetting('kooptijd', 0)) < Number(new Date())){
                tijd = Number(new Date());
                over5min = tijd + 300000;
                over5min = over5min.toString();
                saveSetting('kooptijd', over5min);
            }
            else
            {
                removeSetting('triedCoke');
            }
        }
    }
    if (url == "http://" +server+ "/crime/junkies.php"){
        selects = document.getElementsByTagName("select");
        j = 0;
        i = 0;
        while (j < selects.length){
            if (selects[j].name.match("junk") == "junk"){
                selects[j].value = getSetting('junks');
                i++;
            }
            j++;
        }
        tijd = Number(new Date());
        over5min = tijd + 300000;
        over5min = over5min.toString();
        saveSetting('junksbijwerken', over5min);
        if (i > 0){
            timeout = setTimeout(klikknop, kliktijd, 0);
        }
    }
    if (url == "http://" + server + "/business/stekkies.php"){
        pauze();
        for (i = 1; i < 101; i++){
            window.location.href = "javascript:ClickStekkie(" + i + ");";
        }
        alert("De cheater staat op pauze!");
    }
}

function klikknop(nr)
{
	inputs[nr + aantalhidden].click();
}
	
function antiCheat(){
    plaatjes = document.getElementsByTagName('img');
    i = 0;
    while (i < plaatjes.length){
        if (plaatjes[i].src === "http://" + server + "/sys/captcha/captcha.php"){
            pauze();
            return true;
        }
        i++;
    }
    return false;
}
function makeMenu2(){
    div = document.getElementById('VVDP_SCRIPT_BASE');
    if (div){
        cheatdiv = document.createElement('div');
        // Goede vakjes aanvinken
        if (getSetting('misdaden', 0) !== 0){
          optValue[getSetting('misdaden')] = "selected";
        }

          opt2Value[getSetting('auto')] = "selected";

        if (getSetting('rijles', false)){
          checked1 = "CHECKED=CHECKED";
        }

        if (getSetting('schieten', false)){
          checked2 = "CHECKED=CHECKED";
        }

        if (getSetting('runnen', false)){
          checked3 = "CHECKED=CHECKED";
            if (getSetting('rankrunnen', false)){
                checked6 = "CHECKED=CHECKED";
            }
        }
        if (getSetting('CF', false)){
          checked4 = "CHECKED=CHECKED";
        }
        if (getSetting('junks', false)){
          waarde[getSetting('junks')] = "selected";
        }
        if (!getSetting('banken') || (getSetting("banken") == "")){
          optValue[3] = "niet banken";
        }
        else{
          optValue[3] = getSetting('banken');
        }

        // !! Goede vakjes aanvinken

        // Inhoud van de div instellen
        cheatdiv.innerHTML = "<div class=\"menu_block\"><div class=\"menu_header\">Cheater <a id=\"helpLink\" style=\"color: rgb(157, 185, 213);\" href=\"javascript:void(0);\">(help)</a></div><div class=\"menu_items\"><ul>    <li><a TITLE=\"Stel hier in welke misdaad je wilt doen.\">Misdaden</a> <select id=misdaden>        <option value=0 " + optValue[0] + ">Nee</option>        <option value=1 " + optValue[1] + ">Makkelijk</option>        <option value=2 " + optValue[2] + ">Moeilijk</option>    </select></li>    <br />    <li><a>Auto\'s jatten</a> <select id=auto>        <option value=0 " + opt2Value[0] + ">Nee</option>        <option value=1 " + opt2Value[1] + ">GTA</option>        <option value=2 " + opt2Value[2] + ">Ultra</option>    </select><li><a>Rijlessen</a> <input type=checkbox id=rijles " + checked1 + " /></li>    <br /> <li><a>Schieten</a> <input type=checkbox id=schieten " + checked2 + " /></li>    <br />  <li><a>Runnen</a> <input type=checkbox id=runnen " + checked3 + " /></li>    <br />  <li><a>Rankrunnen</a> <input type=checkbox id=rankrunBox " + checked6 + "/></li> <br /> <li><a>Cokefabriek</a> <input type=checkbox id=CF " + checked4 + " /></li>  <br />  <li><a>Geld op zak</a> <input type=text size=7 id=geld value=\"" + optValue[3] + "\" /></li>    <br />  <li><a>Junkies</a> <select id=jmanagement><option value=0>Nee</option><option value=11 " + waarde[11] +">Rekruteren</option><option value=4 " + waarde[4] + ">Verdienen</option></select></li><li><a>Uitkopen</a><input type=\"checkbox\" id=\"buyOut\" /></li><br /><li><button id=\"autoLogout\">Auto uitloggen</button></li><li><button id=pauze>Pauzeren</button></li><li><button id=\"cheatSettings\">Instellingen</button></ul></div><p></div>";
        // !! Inhoud van de div instellen

        div.parentNode.insertBefore(cheatdiv, div.nextSibling);
        // Inputs van de gebruiker in de gaten houden
        misdadenselect = document.getElementById('misdaden');
        misdadenselect.addEventListener("change", save2, false);
        autobox = document.getElementById('auto');
        autobox.addEventListener("click", save2, false);
        rijlesbox = document.getElementById('rijles');
        rijlesbox.addEventListener("click", save2, false);
        schietbox = document.getElementById('schieten');
        schietbox.addEventListener("click", save2, false);
        runbox = document.getElementById('runnen');
        runbox.addEventListener("click", save2, false);
        runbox.addEventListener("click", stopRankrun, false);
        rankrunbox = document.getElementById("rankrunBox");
        rankrunbox.addEventListener("click", startRankrun, false);
        rankrunbox.addEventListener("click", save2, false)
        cfbox = document.getElementById('CF');
        cfbox.addEventListener("click", save2, false);
        geldtext = document.getElementById('geld');
        geldtext.addEventListener("keyup", save2, false);
        junkselect = document.getElementById('jmanagement');
        junkselect.addEventListener("change", save2, false);
        pauzeknop = document.getElementById('pauze');
        pauzeknop.addEventListener("click", pauze, false);
		
		$('#buyOut').click(function () { saveSetting('buyout', $(this).prop("checked")) });
		$('#buyOut').prop('checked', getSetting('buyout', false));
		
		$('#autoLogout').click(function () { setLogOutTime() });
		
		$('#pauze').click(function () { manualPause(); });
		
		$('#cheatSettings').click(openCheatSettings);
		
		$('.menu_items button').button().css('font-size', '14px');
		
		$('#helpLink').click(function () { pauze(); var dialogContent = $(document.createElement('p')); openIntroStep5(createDialog("Cheater help", dialogContent), dialogContent, false)  } );
		if (gepauzeerd)
		{
			manualPause();
		}
        return true;
    }
    return false;
}
function isInt(x)
{
   var y=parseInt(x);
   if (isNaN(y)) return false;
   return x===y && x.toString()===y.toString();
}
function isNum(x)
{
	var y = parseInt(x);
	return !isNaN(y);
}
function startRankrun()
{
    if (this.checked)
    {
        runbox.checked = true;
    }
}
function stopRankrun()
{
    if (!this.checked)
    {
        rankrunbox.checked = false;
        save2();
    }
}
function readTimes(){
	var times = [];
	
	if (getSetting('misdaden', 0) !== 0)
	{
		times['crimes'] = unsafeWindow.tellermisdaad;
	}
	
	if (getSetting('auto', 0) !== 0)
	{
		times['cars'] = unsafeWindow.tellerauto;
	}
	
	if (getSetting('schieten', false))
	{
		times['shooting'] = unsafeWindow.tellersingle;
	}
	
	if (getSetting('rijles', false))
	{
		times['driving'] = unsafeWindow.tellerRi;
	}
	
	if (getSetting('runnen'))
	{
		// Sell the stuff immediately
		if (getSetting("voorraad", false) && !getSetting("rankrunnen", false))
		{
			times['running'] = -100;
		}
		
		// Wait till there's 31 minutes gone
		if (getSetting("voorraad", false) && getSetting("rankrunnen", false))
		{
			times['running'] = unsafeWindow.tellercoke + 660;
		}
				
		if(getSetting("coketijd", null) !== null)
		{
			// Oh wait, last time we checked the factory ran dry
			times['running'] = Math.round(parseInt(getSetting('coketijd', 0)) - Number(new Date())) / 1000;
		}
		else
		{
			// Buy some stuff
			if (!getSetting("voorraad", false))
			{
				times['running'] = unsafeWindow.tellercoke;
			}
		}
	}

    if (isInt(getSetting('banken')))
	{
        times['banking'] = Math.round(parseInt(getSetting('banktijd', 0)) - Number(new Date())) / 1000;
    }
	
	if (getSetting('cokefabriek'))
	{
		times['cokefactory'] = getSetting('kooptijd', 0);
	}
	
	if (getSetting('junks', 0) !== 0)
	{
		times['junks'] = getSetting('junks', 0);
	}
	
	if (getSetting('goToHospital', false))
	{
		times['hospital'] = 0;
	}
	
	return times;
}

function uitvoeren(times)
{
	var doen = [];
	var lowestTime;
	
	for (var key in times)
	{
		var time = times[key];
		
		if (time <= 0)
		{
			doen.push(key);
			continue;
		}
		
		if (lowestTime === null || lowestTime === undefined)
		{
			lowestTime = {action: key, time: time};
		}
		else
		{
			if (lowestTime.time > time)
			{
				lowestTime.action = key;
				lowestTime.time = time;
			}
		}
	}
	
	if ((lowestTime === null || lowestTime === undefined) && doen.length === 0)
	{
		alert("Voer je instellingen in.\nDit doe je door ze aan te vinken onder het Vers van de Pers menu.");
        pauze();
		return;
	}
	
	var action = null;
	var timeout = 0;
	if (doen.length > 0)
	{
		var randomIndex = Math.round(Math.random() * (doen.length - 1));
		action = doen[randomIndex];
		if (doen.length > 1)
		{

		}
	}
	else
	{
		action = lowestTime.action;
		timeout = lowestTime.time;
	}
	
	var pageVisitTime;
	if (timeout === 0)
	{
		pageVisitTime = (Math.random() * 1000) + 1000;
	}
	else
	{
		pageVisitTime = (Math.random() * 1000) + timeout * 1000;
	}
	
	switch (action)
	{
		case "crimes":
			if (getSetting('misdaden') === 1){
				timeout = setTimeout(visitPage, pageVisitTime, "/crime/light.php");
			}
			if (getSetting('misdaden') === 2){
				timeout = setTimeout(visitPage, pageVisitTime, "/crime/medium.php");
			}
			break;
		case "cars":
			timeout = setTimeout(visitPage, pageVisitTime, "/crime/gta.php");
			break;
		case "shooting":
			timeout = setTimeout(visitPage, pageVisitTime, "/crime/killpractice.php");
			break;
		case "driving":
			timeout = setTimeout(visitPage, pageVisitTime, "/crime/drivinglesson.php");
			break;
		case "running":
			if (getSetting('voorraad', false))
			{
				timeout = setTimeout(visitPage, pageVisitTime, "/crime/deal_drugs.php");
			}
			else
			{
				timeout = setTimeout(visitPage, pageVisitTime, "/business/coke-info.php");
			}
			break;
		case "banking":
			timeout = setTimeout(visitPage, pageVisitTime, "/user/cash.php");
			break;
		case "cokefactory":
			timeout = setTimeout(visitPage, pageVisitTime, "/business/coke.php");
			break;
		case "junks":
			timeout = setTimeout(visitPage, pageVisitTime, "/crime/junkies.php");
			break;
		case "hospital":
			timeout = setTimeout(visitPage, pageVisitTime, "/cw/hospital.php");
			break;
		default:
			alert(action);
			break;
	}
}

function visitPage(path)
{
    if (!gepauzeerd)
    {
        window.location.pathname = path;
    }
    
}
// Functies
function manualPause()
{
	pauze();
	saveSetting('paused', true);
	
	//TODO setting for disabling this notification
	var pauseWarning = setTimeout(function () 
	{
		createDialog("Pauze", "Let op: de cheat is nog gepauzeerd. Vergeet niet weer op doorgaan te klikken rechtsonderin als je klaar bent!");
	}, 120000);
		
	$('#pauze').click(click).button( { label: "Doorgaan" } );
	$('#pauseButton').click(click).button({ icons: { primary: "ui-icon-play" }, label: "Doorgaan" });
	
	function click() 
	{
		saveSetting('paused', false); 
		gepauzeerd = false;
		$('#pauze').button( { label: "Pauzeren" } );
		$('#pauseButton').button({ icons: { primary: "ui-icon-pause" }, label: "Pauzeren"});
		setTimeout(function () 
		{
			clearTimeout(pauseWarning);
			stats = setTimeout(visitPage, (Math.random() * 700) + 300, "/user/dashboard.php"); 
		}); 
	}
}

function pauze(){
    gepauzeerd = true;
    if (stats)
    {
        clearTimeout(stats);
    }
    if (timeout)
    {
        clearTimeout(timeout);
    }
}
// Functies voor het opslaan van gegevens
function save2(){
    saveSetting('misdaden', parseInt(misdadenselect.value));
    saveSetting('auto', parseInt(autobox.value));
    saveSetting('rijles', rijlesbox.checked);
    saveSetting('schieten', schietbox.checked);
    saveSetting('runnen', runbox.checked);
    saveSetting('CF', cfbox.checked);
    saveSetting('rankrunnen', rankrunbox.checked);
    if (!isNum(geldtext.value))
	{
        saveSetting('banken', '');
    }
    else
	{
        totaan = parseInt(geldtext.value);
        saveSetting('banken', totaan);
    }
    if (junkselect.value === 0){
        GM_deleteValue('junks');
        GM_deleteValue('junksbijwerken');
    }
    else {
        saveSetting('junks', parseInt(junkselect.value));
    }
}

function number_format (number, decimals, dec_point, thousands_sep) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://getsprink.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +     bugfix by: Howard Yeend
  // +    revised by: Luke Smith (http://lucassmith.name)
  // +     bugfix by: Diogo Resende
  // +     bugfix by: Rival
  // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
  // +   improved by: davook
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Jay Klehr
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Amir Habibi (http://www.residence-mixte.com/)
  // +     bugfix by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +      input by: Amirouche
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: number_format(1234.56);
  // *     returns 1: '1,235'
  // *     example 2: number_format(1234.56, 2, ',', ' ');
  // *     returns 2: '1 234,56'
  // *     example 3: number_format(1234.5678, 2, '.', '');
  // *     returns 3: '1234.57'
  // *     example 4: number_format(67, 2, ',', '.');
  // *     returns 4: '67,00'
  // *     example 5: number_format(1000);
  // *     returns 5: '1,000'
  // *     example 6: number_format(67.311, 2);
  // *     returns 6: '67.31'
  // *     example 7: number_format(1000.55, 1);
  // *     returns 7: '1,000.6'
  // *     example 8: number_format(67000, 5, ',', '.');
  // *     returns 8: '67.000,00000'
  // *     example 9: number_format(0.9, 0);
  // *     returns 9: '1'
  // *    example 10: number_format('1.20', 2);
  // *    returns 10: '1.20'
  // *    example 11: number_format('1.20', 4);
  // *    returns 11: '1.2000'
  // *    example 12: number_format('1.2000', 3);
  // *    returns 12: '1.200'
  // *    example 13: number_format('1 000,50', 2, '.', ' ');
  // *    returns 13: '100 050.00'
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}