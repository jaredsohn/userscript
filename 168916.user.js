// ==UserScript==
// @name        mijn.ing.nl in Polish ( po Polsku)
// @namespace   http://userscripts.org/users/519264
// @include     https://*mijn.ing.nl/*
// @version     1.3
// ==/UserScript==

function htmlreplace(a, b, element) {    
    if (!element) element = document.body;    
    var nodes = element.childNodes;
    for (var n=0; n<nodes.length; n++) {
        if (nodes[n].nodeType == Node.TEXT_NODE) {
            var r = new RegExp(a, 'gi');
            nodes[n].textContent = nodes[n].textContent.replace(r, b);
        } else {
            htmlreplace(a, b, nodes[n]);
        }
    }
}

htmlreplace("Particulier","Prywatne");
htmlreplace("Zakelijk","Firmowe");
htmlreplace("Gebruikersnaam","Login");
htmlreplace("Onthoud mijn Login","Zapamietaj mnie");
htmlreplace("Inloggen Mijn ING","Zaloguj do ING NL");
htmlreplace("Inloggen","Zaloguj");
htmlreplace("Inlogcodes vergeten?","Nie pamietasz hasla?");
htmlreplace("Wachtwoord","Haslo");
htmlreplace("Kosten verrekening","Zwrot kosztow");
htmlreplace("Overschrijven buitenland", "Przelewy zagraniczne");
htmlreplace("Betalen met IBAN in Nederland","Przelew w Holandii");
htmlreplace("Betalen", "Platnosci");
htmlreplace("Mijn ING Overzicht","Moje ING NL");
htmlreplace("Betaalrekeningen","Konto");
htmlreplace("Spaarrekeningen","Konto oszczednosciowe");
htmlreplace("Datum","Data");
htmlreplace("Af / bij Betaalrekening","Przelewy");
htmlreplace("Bedrag ","Kwota");
htmlreplace("Direct doen","Szybkie linki");
htmlreplace("Betalen","Platnosci");
htmlreplace("Overschrijven naar bankrekening","Przelew na konto bankowe");
htmlreplace("Spaarrekening: inleggen of opnemen","Przelew na konto oszczednosciowe");
htmlreplace("Overschrijven","Przelewy");
htmlreplace("Alles in Mijn ING","Wszystko o moim ING NL");
htmlreplace("Mijn ING Overzicht","Moje ING NL");
htmlreplace("Overzicht saldo","Stan konta");
htmlreplace("Verzendlijst","Oczekujace platnosci");
htmlreplace("Mijn berichten","Wiadomosci");
htmlreplace("Ingeplande opdrachten","Zaplanowane");
htmlreplace("Geweigerde opdrachten","Anulowane zlecenia");
htmlreplace("Afschriften en overzichten","Dokumenty i podsumowania");
htmlreplace("Jaaroverzichten","Roczne podsumowanie");
htmlreplace("Tim - huishoudboekje","Tim - wydatki domowe");
htmlreplace("Overzichten","Podglad");
htmlreplace("Saldo bekijken","Saldo");
htmlreplace("Toon alle af- en bijschrijvingen van ","Lista transakcji dla ");
htmlreplace("Af- en bijschrijvingen","Rachunki biezace");
htmlreplace("Automatisch Sparen","Automatyczne przelewy");
htmlreplace("Sparen","Konto oszczednosciowe");
htmlreplace("Nieuwe overschrijving","Nowy przelew");
htmlreplace("Bedrag","Kwota");
htmlreplace("Mijn IBAN en BIC","ING IBAN i BIC");
htmlreplace("Adresboek buitenland","Odbiorcy zagraniczni");
htmlreplace("Adresboek","Odbiorcy krajowi");
htmlreplace("Statusoverzicht buitenland","Status przelewu zagranicznego");
htmlreplace("Incasso's","Zamowienia");
htmlreplace("Incasso","Zamowienia");
htmlreplace("Creditcard","Karta kredytowa");
htmlreplace("SpaarSaldo","Saldo oszczednosciowe");
htmlreplace("Spaaropdracht","Przelew wlasny");
htmlreplace("Rentepunten","Oprocentowanie");
htmlreplace("Spaarrekening openen","Otwarte konta");
htmlreplace("Naar Beleggen","Zainwestuj");
htmlreplace("Beleggen","Inwestycje");
htmlreplace("Mijn gegevens en instellingen","Moje dane i ustawienia");
htmlreplace("Persoonlijke gegevens","Informacje osobiste");
htmlreplace("Woonadres wijzigen","Zmiana adresu domowego");
htmlreplace("E-mailadres wijzigen","Zmiana adresu email");
htmlreplace("Mobiel nummer wijzigen","Zmiana numeru telefonu");
htmlreplace("Inlogcodes wijzigen","Zmiana danych logowania");
htmlreplace("TAN- en PAC-codes","Kody do przelewow");
htmlreplace("Mobiel Bankieren","Bankowosc mobilna");
htmlreplace("Uitloggen","Wyloguj");
htmlreplace("Verplicht veld voor betalingen naar landen binnen de Europese Economische Ruimte. Vul deze in zonder punten of spaties.","Pola wymagane dla odbiorcow w Europie. Wypelnij bez spacji i kropek.");
htmlreplace("Verplicht veld","Pola wymagane");
htmlreplace("Van Betaalrekening","Z rachunku");
htmlreplace("Naar rekening","Na rachunek");
htmlreplace("Periodieke overschrijving","Wyslij z opoznieniem");
htmlreplace("Mededelingen","Tytul przelewu");
htmlreplace("Opslaan, nieuwe opdracht","Zapisz i wyslij kolejny");
htmlreplace("Opslaan, naar verzendlijst","Zapisz i przejdz do listy");
htmlreplace("Wissen","Wyczysc");
htmlreplace("Selecteer adres","Wybierz adresata");
htmlreplace("Opslaan in adresboek","Zapisz w ksiazce adresowej");
htmlreplace("Rekening toevoegen","Dodaj konto");
htmlreplace("Rekening verwijderen","Usuń konto");
htmlreplace("Rekeninginstellingen","Ustawienia konta");
htmlreplace("Internetbankieren","Przelew internetowy");
htmlreplace("Toelichting","Objasnienie");
htmlreplace("--selecteer een Land--","Wybierz panstwo");
htmlreplace("Land bank begunstigde","Kraj banku odbiorcy");
htmlreplace("Land","Panstwo");
htmlreplace("--selecteer een Muntsoort--","Wybierz walute");
htmlreplace("Muntsoort","Waluta");
htmlreplace("Verder","Wybierz");
htmlreplace("Naam begunstigde","Nazwa odbiorcy zagranicznego");
htmlreplace("Plaats begunstigde","Miasto odbiorcy zagranicznego");
htmlreplace("IBAN ontvanger","IBAN banku");
htmlreplace("BIC bank begunstigde","Nazwa BIC banku");
htmlreplace("Terug","Powrot");
htmlreplace("Bankcheque","Weksle");
htmlreplace("Rekeningnummer ontvanger","Numer rachunku odbiorcy");