// ==UserScript==
// @name        CNC Tiberium Alliances Fast LOGIN
// @namespace   CNC Tiberium Alliances - Fast LOGIN
// @description More Accounts = More Fun = Faster LOGIN
// @author	xXxSonixXx - IT W1
// @version	2.3
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://www.tiberiumalliances.com/*/login/auth
// @include     https://www.tiberiumalliances.com/login/auth
// @include     https://www.tiberiumalliances.com/*
// @require	http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

const Version = "2.3";

var Web = document.location.href;
var LANG = Web.split("https://www.tiberiumalliances.com/")[1];
LANG = LANG.split("/login/auth")[0];

function Elimina () {
	$(".footer-content").remove();
	$(".copyright").remove();
	$(".phenomic").remove();
	$(".p4f").remove();
	$(".cnc").remove();
};

function Interfaccia () {
	switch (LANG) {
		default:
			$(".logos").append("<div><h2>CNC Tiberium Alliances Fast LOGIN - <a href='http://userscripts.org/scripts/show/148991' target='_blank' title='New Version?'>Version " + Version + "<a></h2><b class='First' title='Ctrl + 1'>First Profile</b> - <i class='Firsti'></i><br><b class='Second' title='Ctrl + 2'>Second Profile</b> - <i class='Secondi'></i><br><b class='Third' title='Ctrl + 3'>Third Profile</b> - <i class='Thirdi'></i><br><b class='Fourth' title='Ctrl + 4'>Fourth Profile</b> - <i class='Fourthi'></i><br><b class='Fifth' title='Ctrl + 5'>Fifth Profile</b> - <i class='Fifthi'></i><br><br><b class='SeeAll'>Overview</b> - <b class='Clean'>Erase All</b></div>");
		break;
		case "it":
			$(".logos").append("<div><h2>CNC Tiberium Alliances Fast LOGIN - <a href='http://userscripts.org/scripts/show/148991' target='_blank' title='Nuova Versione?'>Versione " + Version + "<a></h2><b class='First' title='Ctrl + 1'>Primo Profilo</b> - <i class='Firsti'></i><br><b class='Second' title='Ctrl + 2'>Secondo Profilo</b> - <i class='Secondi'></i><br><b class='Third' title='Ctrl + 3'>Terzo Profilo</b> - <i class='Thirdi'></i><br><b class='Fourth' title='Ctrl + 4'>Quarto Profilo</b> - <i class='Fourthi'></i><br><b class='Fifth' title='Ctrl + 5'>Quinto Profilo</b> - <i class='Fifthi'></i><br><br><b class='SeeAll'>Panoramica</b> - <b class='Clean'>Cancella Tutto</b></div>");
		break;
		case "de":
			$(".logos").append("<div><h2>CNC Tiberium Alliances Fast LOGIN - <a href='http://userscripts.org/scripts/show/148991' target='_blank' title='Neue Version?'>Version " + Version + "<a></h2><b class='First' title='Ctrl + 1'>Erstes Profil</b> - <i class='Firsti'></i><br><b class='Second' title='Ctrl + 2'>Zweites Profil</b> - <i class='Secondi'></i><br><b class='Third' title='Ctrl + 3'>Drittes Profil</b> - <i class='Thirdi'></i><br><b class='Fourth' title='Ctrl + 4'>Vierte Profil</b> - <i class='Fourthi'></i><br><b class='Fifth' title='Ctrl + 5'>Fünftes Profil</b> - <i class='Fifthi'></i><br><br><b class='SeeAll'>Überblick</b> - <b class='Clean'>Löscht Alle</b></div>");
		break;
	} 
};

function SetValue () {
	switch (LANG) {
		default:
			$(".First").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("FirstEmail", Email);
					GM_setValue("FirstPassword", Password);
					alert("Overview\nEmail : " + Email + "\nPassword : " + Password + "\nSaved!");
				} else {
					alert("Error! Null Field! | Password");
					return false;
				}
				} else {
					alert("Error! Null Field! | Email");
					return false;
				}
			});
			$(".Second").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("SecondEmail", Email);
					GM_setValue("SecondPassword", Password);
					alert("Overview\nEmail : " + Email + "\nPassword : " + Password + "\nSaved!");
				} else {
					alert("Error! Null Field! | Password");
					return false;
				}
				} else {
					alert("Error! Null Field! | Email");
					return false;
				}
			});
			$(".Third").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("ThirdEmail", Email);
					GM_setValue("ThirdPassword", Password);
					alert("Overview\nEmail : " + Email + "\nPassword : " + Password + "\nSaved!");
				} else {
					alert("Error! Null Field! | Password");
					return false;
				}
				} else {
					alert("Error! Null Field! | Email");
					return false;
				}
			});
			$(".Fourth").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("FourthEmail", Email);
					GM_setValue("FourthPassword", Password);
					alert("Overview\nEmail : " + Email + "\nPassword : " + Password + "\nSaved!");
				} else {
					alert("Error! Null Field! | Password");
					return false;
				}
				} else {
					alert("Error! Null Field! | Email");
					return false;
				}
			});
			$(".Fifth").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("FifthEmail", Email);
					GM_setValue("FifthPassword", Password);
					alert("Overview\nEmail : " + Email + "\nPassword : " + Password + "\nSaved!");
				} else {
					alert("Error! Null Field! | Password");
					return false;
				}
				} else {
					alert("Error! Null Field! | Email");
					return false;
				}
			});
		break;
		case "it":
			$(".First").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("FirstEmail", Email);
					GM_setValue("FirstPassword", Password);
					alert("Panoramica\nEmail : " + Email + "\nPassword : " + Password + "\nSalvato!");
				} else {
					alert("Errore! Campo Vuoto! | Password");
					return false;
				}
				} else {
					alert("Errore! Campo Vuoto! | Email");
					return false;
				}
			});
			$(".Second").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("SecondEmail", Email);
					GM_setValue("SecondPassword", Password);
					alert("Panoramica\nEmail : " + Email + "\nPassword : " + Password + "\nSalvato!");
				} else {
					alert("Errore! Campo Vuoto! | Password");
					return false;
				}
				} else {
					alert("Errore! Campo Vuoto! | Email");
					return false;
				}
			});
			$(".Third").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("ThirdEmail", Email);
					GM_setValue("ThirdPassword", Password);
					alert("Panoramica\nEmail : " + Email + "\nPassword : " + Password + "\nSalvato!");
				} else {
					alert("Errore! Campo Vuoto! | Password");
					return false;
				}
				} else {
					alert("Errore! Campo Vouto! | Email");
					return false;
				}
			});
			$(".Fourth").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("FourthEmail", Email);
					GM_setValue("FourthPassword", Password);
					alert("Panoramica\nEmail : " + Email + "\nPassword : " + Password + "\nSalvato!");
				} else {
				alert("Errore! Campo Vuoto! | Password");
					return false;
				}
				} else {
					alert("Errore! Campo Vuoto! | Email");
					return false;
				}
			});
			$(".Fifth").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("FifthEmail", Email);
					GM_setValue("FifthPassword", Password);
					alert("Panoramica\nEmail : " + Email + "\nPassword : " + Password + "\nSalvato");
				} else {
					alert("Errore! Campo Vuoto! | Password");
					return false;
				}
				} else {
					alert("Errore! Campo Vuoto! | Email");
					return false;
				}
				Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("FifthEmail", Email);
					GM_setValue("FifthPassword", Password);
					alert("Panoramica\nEmail : " + Email + "\nPassword : " + Password + "\nSalvato!");
				} else {
					alert("Errore! Campo Vuoto! | Password");
					return false;
				}
			});
		break;
		case "de":
			$(".First").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Passwort :");
				if (Password != 0) {
					GM_setValue("FirstEmail", Email);
					GM_setValue("FirstPassword", Password);
					alert("Überblick\nEmail : " + Email + "\nPasswort : " + Password + "\nGespeichert!");
				} else {
					alert("Fehler! Null Feld! | Passwort");
					return false;
				}
				} else {
					alert("Fehler! Null Feld! | Email");
					return false;
				}
			});
			$(".Second").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Passwort :");
				if (Password != 0) {
					GM_setValue("SecondEmail", Email);
					GM_setValue("SecondPassword", Password);
					alert("Überblick\nEmail : " + Email + "\nPasswort : " + Password + "\nGespeichert!");
				} else {
					alert("Fehler! Null Feld! | Passwort");
					return false;
				}
				} else {
					alert("Fehler! Null Feld! | Email");
					return false;
				}
			});
			$(".Third").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Password :");
				if (Password != 0) {
					GM_setValue("ThirdEmail", Email);
					GM_setValue("ThirdPassword", Password);
					alert("Überblick\nEmail : " + Email + "\nPasswort : " + Password + "\nGespeichert!");
				} else {
					alert("Fehler! Null Feld! | Passwort");
					return false;
				}
				} else {
					alert("Fehler! Null Feld! | Email");
					return false;
				}
			});
			$(".Fourth").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Passwort :");
				if (Password != 0) {
					GM_setValue("FourthEmail", Email);
					GM_setValue("FourthPassword", Password);
					alert("Überblick\nEmail : " + Email + "\nPasswort : " + Password + "\nGespeichert!");
				} else {
				alert("Fehler! Null Feld! | Passwort");
					return false;
				}
				} else {
					alert("Fehler! Null Feld! | Email");
					return false;
				}
			});
			$(".Fifth").click(function () {
				var Email, Password;
				Email = prompt("Email :");
				if (Email != 0) {
					Password = prompt("Passwort :");
				if (Password != 0) {
					GM_setValue("FifthEmail", Email);
					GM_setValue("FifthPassword", Password);
					alert("Überblick\nEmail : " + Email + "\nPasswort : " + Password + "\nGespeichert!");
				} else {
					alert("Fehler! Null Feld! | Passwort");
					return false;
				}
				} else {
					alert("Fehler! Null Feld! | Email");
					return false;
				}
				Password = prompt("Passwort :");
				if (Password != 0) {
					GM_setValue("FifthEmail", Email);
					GM_setValue("FifthPassword", Password);
					alert("Überblick\nEmail : " + Email + "\nPasswort : " + Password + "\nGespeichert!");
				} else {
					alert("Fehler! Null Feld! | Passwort");
					return false;
				}
			});
		break;
	}
};

function CleanValue () {
	switch (LANG) {
		default:
			$(".Clean").click(function () {
				var Ans = confirm("You Are About To Erase All Data. (Cannot Be Undone). Continue?");
				if (Ans == true) {
					GM_setValue("FirstEmail", "");
					GM_setValue("FirstPassword", "");
					GM_setValue("SecondEmail", "");
					GM_setValue("SecondPassword", "");
					GM_setValue("ThirdEmail", "");
					GM_setValue("ThirdPassword", "");
					GM_setValue("FourthEmail", "");
					GM_setValue("FourthPassword", "");
					GM_setValue("FifthEmail", "");
					GM_setValue("FifthPassword", "");
				} else {
					return false;
				};
			});
		break;
		case "it":
			$(".Clean").click(function () {
				var Ans = confirm("Stai Per Eliminare TUtti I Tuoi Dati. (Non Può Essere Annullato). Continuare?");
				if (Ans == true) {
					GM_setValue("FirstEmail", "");
					GM_setValue("FirstPassword", "");
					GM_setValue("SecondEmail", "");
					GM_setValue("SecondPassword", "");
					GM_setValue("ThirdEmail", "");
					GM_setValue("ThirdPassword", "");
					GM_setValue("FourthEmail", "");
					GM_setValue("FourthPassword", "");
					GM_setValue("FifthEmail", "");
					GM_setValue("FifthPassword", "");
				} else {
					return false;
				};
			});
		break;
		case "de":
			$(".Clean").click(function () {
				var Ans = confirm("Sie Sind Dabei, Alle Daten Zu Löschen. (Kann Nicht Rückgängig Gemacht Werden). Weiter?");
				if (Ans == true) {
					GM_setValue("FirstEmail", "");
					GM_setValue("FirstPassword", "");
					GM_setValue("SecondEmail", "");
					GM_setValue("SecondPassword", "");
					GM_setValue("ThirdEmail", "");
					GM_setValue("ThirdPassword", "");
					GM_setValue("FourthEmail", "");
					GM_setValue("FourthPassword", "");
					GM_setValue("FifthEmail", "");
					GM_setValue("FifthPassword", "");
				} else {
					return false;
				};
			});
		break;
	}
};

function GetValue () {
	switch (LANG) {
		default:
			var FirstEmail = GM_getValue("FirstEmail");
			var SecondEmail= GM_getValue("SecondEmail");
			var ThirdEmail = GM_getValue("ThirdEmail");
			var FourthEmail = GM_getValue("FourthEmail");
			var FifthEmail = GM_getValue("FifthEmail");
			var FirstPassword = GM_getValue("FirstPassword");
			var SecondPassword= GM_getValue("SecondPassword");
			var ThirdPassword = GM_getValue("ThirdPassword");
			var FourthPassword = GM_getValue("FourthPassword");
			var FifthPassword = GM_getValue("FifthPassword");
			if (FirstPassword != 0) {
				$(".Firsti").html("Used Slot");
			} else {
				$(".Firsti").html("Free Slot");
			};
			if (SecondPassword != 0) {
				$(".Secondi").html("Used Slot");
			} else {
				$(".Secondi").html("Free Slot");
			};
			if (ThirdPassword != 0) {
				$(".Thirdi").html("Used Slot");
			} else {
				$(".Thirdi").html("Free Slot");
			};
			if (FourthPassword != 0) {
				$(".Fourthi").html("Used Slot");
			} else {
				$(".Fourthi").html("Free Slot");
			};
			if (FifthPassword != 0) {
				$(".Fifthi").html("Used Slot");
			} else {
				$(".Fifthi").html("Free Slot");
			};
			$(".SeeAll").click(function () {
				alert("Overview\n\nFirst Profile\nEmail : " + FirstEmail + "\nPassword : " + FirstPassword + "\n\nSecond Profile\nEmail : " + SecondEmail + "\nPassword : " + SecondPassword + "\n\nThird Profile\nEmail : " + ThirdEmail + "\nPassword : " + ThirdPassword + "\n\nFourth Profile\nEmail : " + FourthEmail + "\nPassword  : " + FourthPassword + "\n\nFifth Profile\nEmail : " + FifthEmail + "\nPassword : " + FifthPassword + "\n\nDone!"); 
			});
		break;
		case "it":
			var FirstEmail = GM_getValue("FirstEmail");
			var SecondEmail= GM_getValue("SecondEmail");
			var ThirdEmail = GM_getValue("ThirdEmail");
			var FourthEmail = GM_getValue("FourthEmail");
			var FifthEmail = GM_getValue("FifthEmail");
			var FirstPassword = GM_getValue("FirstPassword");
			var SecondPassword= GM_getValue("SecondPassword");
			var ThirdPassword = GM_getValue("ThirdPassword");
			var FourthPassword = GM_getValue("FourthPassword");
			var FifthPassword = GM_getValue("FifthPassword");
			if (FirstPassword != 0) {
				$(".Firsti").html(" Slot In Uso");
			} else {
				$(".Firsti").html("Slot Libero");
			};
			if (SecondPassword != 0) {
				$(".Secondi").html("Slot In Uso");
			} else {
				$(".Secondi").html("Slot Libero");
			};
			if (ThirdPassword != 0) {
				$(".Thirdi").html("Slot In Uso");
			} else {
				$(".Thirdi").html("Slot Libero");
			};
			if (FourthPassword != 0) {
				$(".Fourthi").html("Slot In Uso");
			} else {
				$(".Fourthi").html("Slot Libero");
			};
			if (FifthPassword != 0) {
				$(".Fifthi").html("Slot In Uso");
			} else {
				$(".Fifthi").html("Slot Libero");
			};
			$(".SeeAll").click(function () {
				alert("Panoramica\n\nPrimo Profilo\nEmail : " + FirstEmail + "\nPassword : " + FirstPassword + "\n\nSecondo Profilo\nEmail : " + SecondEmail + "\nPassword : " + SecondPassword + "\n\nTerzo Profilo\nEmail : " + ThirdEmail + "\nPassword : " + ThirdPassword + "\n\nQuarto Profilo\nEmail : " + FourthEmail + "\nPassword  : " + FourthPassword + "\n\nQuinto Profilo\nEmail : " + FifthEmail + "\nPassword : " + FifthPassword + "\n\nFatto!"); 
			});
		break;
		case "de":
			var FirstEmail = GM_getValue("FirstEmail");
			var SecondEmail= GM_getValue("SecondEmail");
			var ThirdEmail = GM_getValue("ThirdEmail");
			var FourthEmail = GM_getValue("FourthEmail");
			var FifthEmail = GM_getValue("FifthEmail");
			var FirstPassword = GM_getValue("FirstPassword");
			var SecondPassword= GM_getValue("SecondPassword");
			var ThirdPassword = GM_getValue("ThirdPassword");
			var FourthPassword = GM_getValue("FourthPassword");
			var FifthPassword = GM_getValue("FifthPassword");
			if (FirstPassword != 0) {
				$(".Firsti").html("Verwendeten Slot");
			} else {
				$(".Firsti").html("Freien Slot");
			};
			if (SecondPassword != 0) {
				$(".Secondi").html("Verwendeten Slot");
			} else {
				$(".Secondi").html("Freien Slot");
			};
			if (ThirdPassword != 0) {
				$(".Thirdi").html("Verwendeten Slot");
			} else {
				$(".Thirdi").html("Freien Slot");
			};
			if (FourthPassword != 0) {
				$(".Fourthi").html("Verwendeten Slot");
			} else {
				$(".Fourthi").html("Freien Slot");
			};
			if (FifthPassword != 0) {
				$(".Fifthi").html("Verwendeten Slot");
			} else {
				$(".Fifthi").html("Freien Slot");
			};
			$(".SeeAll").click(function () {
				alert("Überblick\n\nErstes Profil\nEmail : " + FirstEmail + "\nPasswort : " + FirstPassword + "\n\nZweites Profil\nEmail : " + SecondEmail + "\nPasswort : " + SecondPassword + "\n\nDrittes Profil\nEmail : " + ThirdEmail + "\nPasswort : " + ThirdPassword + "\n\nVierte Profil\nEmail : " + FourthEmail + "\nPasswort  : " + FourthPassword + "\n\nFünftes Profil\nEmail : " + FifthEmail + "\nPasswort : " + FifthPassword + "\n\nErledigt!"); 
			});
		break;
	}
};

function Short () {
	$(document).keydown(function(e){
		var FirstEmail = GM_getValue("FirstEmail");
		var SecondEmail= GM_getValue("SecondEmail");
		var ThirdEmail = GM_getValue("ThirdEmail");
		var FourthEmail = GM_getValue("FourthEmail");
		var FifthEmail = GM_getValue("FifthEmail");
		var FirstPassword = GM_getValue("FirstPassword");
		var SecondPassword= GM_getValue("SecondPassword");
		var ThirdPassword = GM_getValue("ThirdPassword");
		var FourthPassword = GM_getValue("FourthPassword");
		var FifthPassword = GM_getValue("FifthPassword");
		if(e.ctrlKey || e.metaKey) {
			if (String.fromCharCode(e.charCode||e.keyCode)=="1") {
				$("#username").val(FirstEmail);
				$("#password").val(FirstPassword);
				$(".button-field").click();
			}
		}
		if(e.ctrlKey || e.metaKey) {
			if (String.fromCharCode(e.charCode||e.keyCode)=="2") {
				$("#username").val(SecondEmail);
				$("#password").val(SecondPassword);
				$(".button-field").click();
			}
		}
		if(e.ctrlKey || e.metaKey) {
			if (String.fromCharCode(e.charCode||e.keyCode)=="3") {
				$("#username").val(ThirdEmail);
				$("#password").val(ThirdPassword);
				$(".button-field").click();
			}
		}
		if(e.ctrlKey || e.metaKey) {
			if (String.fromCharCode(e.charCode||e.keyCode)=="4") {
				$("#username").val(FourthEmail);
				$("#password").val(FourthPassword);
				$(".button-field").click();
			}
		}
		if(e.ctrlKey || e.metaKey) {
			if (String.fromCharCode(e.charCode||e.keyCode)=="5") {
				$("#username").val(FifthEmail);
				$("#password").val(FifthPassword);
				$(".button-field").click();
			}
		}
		if(e.ctrlKey || e.metaKey) {
			if (String.fromCharCode(e.charCode||e.keyCode)=="0") {
				document.location.assign("https://www.tiberiumalliances.com/logout");
			}
		}		
	});
};

Elimina(); Interfaccia(); SetValue(); CleanValue(); GetValue(); Short();
