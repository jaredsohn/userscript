// ==UserScript==
// @name           Norsk Facebook
// @namespace      skoen
// @description    Oversett Facebook til norsk
// @include        http://*.facebook.com/*
// @credit         Eliram
// ==/UserScript==
//
// Enter longer search strings BEFORE shorter ones
// Enter <> brackets into the search (and replace) strings whenever possible


function r(dd,s,t) { // Replace search string with translation
     if (s==t) {
        return (dd);
    } else {
         var RegExpr = new RegExp(s,"g");
       return (dd.replace(RegExpr,t));
        // document.body.innerHTML = document.body.innerHTML.replace(RegExpr,t);
   }
}

d=document.body.innerHTML;
//alert(document.innerHTML);

// Main menu
d=r(d,'>Profile<','>Profil<');
d=r(d,'>edit<','>endre<');
d=r(d,'>Friends<','>Venner<');
d=r(d,'>Networks<','>Nettverk<');
d=r(d,'>Inbox<','> Innboks <');
d=r(d,'>home<','>Hovedside<');
d=r(d,'>account<','>Konto<');
d=r(d,'>Privacy<','>Sikkerhet<');
d=r(d,'>privacy<','>Sikkerhet<');
d=r(d,'>logout<','>Logg ut<');
d=r(d,'>About<','>Om<');

d=r(d,'>Message<','>Send melding<');
d=r(d,'>Poke<','>Poke<');


// Sub Menus
d=r(d,'>Message Inbox<','> Innboks <');
d=r(d,'>Sent Messages<','> Sendte meldinger <');
d=r(d,'>Notifications<','> Påminnelser <');
d=r(d,'>Updates<','>Oppdateringer<');
d=r(d,'>Compose Message<','>Skriv ny melding<');
d=r(d,'>Browse All Networks<','>Bla gjennom alle nettverk<');
d=r(d,'>Join a Network<','>Bli med i et nettverk<');
d=r(d,'>Status Updates<','>Statusoppdateringer<');
d=r(d,'>Online Now<','>Inne nå<');
d=r(d,'>Recently Updated<','>Nylig oppdatert<');
d=r(d,'>Recently Added<','>Nylig lagt til<');
d=r(d,'>All Friends<','>Alle venner<');
d=r(d,'>Invite Friends<','>Inviter venner<');
d=r(d,'>Find Friends<','>Finn venner<');

// Left Column
d=r(d,'>Search<','>Søk<');
d=r(d,'>Applications<','>Programmer<');
d=r(d,'>more<','>mer<');
d=r(d,'>Less<','>mindre<');
d=r(d,'>Photos<','>Bilder<');
d=r(d,'>Groups<','>Grupper<');
d=r(d,'>Events<','>Hendelser<');
d=r(d,'>Marketplace<','>Torg<');
d=r(d,'>My Questions<','>Mine spørsmål<');
d=r(d,'>Developer<','>Laget av<');
d=r(d,'>Posted Items<','>Oppførte elementer<');
d=r(d,' of <',' av <');
d=r(d,'posted items<','oppførte elementer<');
d=r(d,'>Notes<','>Notater<');
d=r(d,'>Video<','>Video<');

// Right Column
d=r(d,'>hide friend updates<','>Skjul oppdateringer<');
d=r(d,'>show friend updates<','>Vis oppdateringer<');
d=r(d,'>Birthdays<','>Fødselsdager<');
d=r(d,'>Invite Your Friends<','>Inviter vennene dine<');
d=r(d,'>New Stuff<','>Nye ting<');
d=r(d,'>The Next Step<','>Neste skritt<');
d=r(d,'>Find Your Friends<','>Finn alle vennene<');
d=r(d,'>see all<','>se alle<');
d=r(d,'>hide<','>skjul<');
d=r(d,'>close<','>lukk<');

// Bottom line
d=r(d,'>About Facebook<','>Om Fjesbok<');
d=r(d,'>Facebook<','>Fjesbok<');
d=r(d,'>Advertisers<','>Annonsører<');
d=r(d,'>Businesses<','>Selskaper<');
d=r(d,'>Developers<','>Opphavsmenn<');
d=r(d,'>Terms<','>Regler<');
d=r(d,'>Help<','>Hjelp<');

// Profile Page
d=r(d,'>Networks:<','>Nettverk:<');
d=r(d,'>Hello ','>Hallo ');
d=r(d,'>Hometown:<','>Hjemby:<');
d=r(d,'>Send<','>Send<');
d=r(d,'>Cancel<','>Avbryt<');
d=r(d,'>Today<','>I dag<');
d=r(d,'>Yesterday<','>I går<');
d=r(d,'>Sex:<','>Kjønn:<');
d=r(d,'>Relationship&nbsp;Status:<','>Sivilstatus:<');
d=r(d,'>Birthday:<','>Fødselsdag:<');

d=r(d,'>Mini-Feed<','>Siste hendelser<');
d=r(d,'>Displaying ','>Viser ');
d=r(d,' stories<',' hendelser<');
d=r(d,' wrote on the wall for the group ',' skrev på veggen til gruppa ');
d=r(d,' joined the group ',' ble med i gruppa ');
d=r(d,' wrote on the wall for the event ',' skrev på veggen for hendelsen ');
d=r(d,' and ',' og ');
d=r(d,' are now friends.',' er nå venner');
d=r(d,'  has received a new ',' har mottatt en ny ');
d=r(d,' commented on ',' kommenterte ');

d=r(d,'>See All<','>Se alt<');
d=r(d,'>Updated ','>Oppdatert for ');
d=r(d,'just a moment ago','et øyeblikk siden');
d=r(d,'> is (?=)','> ');
d=r(d,'>Information<','>Informasjon<');
d=r(d,'>Contact Info<','>Kontaktinformasjon<');
d=r(d,'>Email:<','>E-post:<');
d=r(d,'>Current Town:<','>Bosted:<');
d=r(d,'>Website:<','>Hjemmeside:<');
d=r(d,'>Personal Info<','>Personlig info:<');
d=r(d,'>Activities<','>Aktiviteter<');
d=r(d,'>You are online now.<','>Du er innlogget nå.<');

d=r(d,'>Friends in Other Networks<','>Venner i andre nettverk<');
d=r(d,'>Networks with the most friends<','>Nettverk med flest venner<');
d=r(d,'>Networks you belong to<','>Nettverk du er med i<');
d=r(d,'>Show All Networks<','>Vis alle nettverk<');
d=r(d,'>View All Friends<','>Vis alle venner<');
d=r(d,'> Friends<','> Venner<');
d=r(d,' friends<',' venner<');

d=r(d,'>Education and Work<','>Utdanning og arbeid<');
d=r(d,'>Education Info<','>Utdanningsinformasjon<');
d=r(d,'>Grad Schools:<','>Høyskoler:<');
d=r(d,'>Work Info<','>Arbeidsinformasjon<');
d=r(d,'>Employer:<','>Arbeidsgiver:<');
d=r(d,'>Position:<','>Stilling:<');
d=r(d,'>Time Period:<','>Tidsrom:<');
d=r(d,'>Description:<','>Beskrivelse:<');
d=r(d,' groups<',' grupper<');

d=r(d,'>Feedheads<','>Feedheads<');
d=r(d,'>your shared items<','>dine delte elementer<');
d=r(d,'>Update Shared Items<','>Oppdater delte elementer<');
d=r(d,'>App Profile<','>Programprofil<');
d=r(d,'>Top Shared<','>Mest delt<');

d=r(d,'>Gifts<','>Gaver<');

// Photos
d=r(d,'>Created ','>Opprettet');
d=r(d,'>Back to Album','>Tilbake til albumet');
d=r(d,'>From the album:','>Fra albumet');

// Wall
d=r(d,'>Back to ','>Tilbake til ');
d=r(d,'>Displaying the only post.<','>Viser den eneste meldingen.<');
d=r(d,'>Delete<','>Fjern<');

// News Feed
d=r(d,'>News Feed<','>Siste nytt<');
d=r(d,'>Preferences<','>Innstillinger<');
d=r(d,'>I like this<','>Jeg liker dette<');
d=r(d,'>I don\'t like this<','>Jeg liker ikke dette<');
d=r(d,' is attending ',' deltar på ');
d=r(d,' attended ',' deltok på ');
d=r(d,' added a new photo to a group',' la til bilder til en gruppe');
d=r(d,'>You ignored a request from ','>Du ignorerte en forespørsel fra ');
d=r(d,'>Updated:','>Oppdatert:');
d=r(d,' of your ',' av din ');
d=r(d,' added the ',' la til ');
d=r(d,' application.<',' (program).<');
d=r(d,' posted a link',' la ut en kobling');
d=r(d,' wrote on',' skrev på');


// Mail page
d=r(d,'>next<','>neste<');
d=r(d,'>From: ','>Fra: ');

d=r(d,'Facebook','Fjesbok');
/*
d=r(d,'ago','siden');
d=r(d,'hours','timer');
d=r(d,'hour','time');
d=r(d,'><','><');
d=r(d,'><','><');
d=r(d,'><','><');
d=r(d,'><','><');
*/

// Months
d=r(d,'January','januar');
d=r(d,'February','februar');
d=r(d,'March','mars');
d=r(d,'April','april');
d=r(d,'May','mai');
d=r(d,'June','juni');
d=r(d,'July','juli');
d=r(d,'August','august');
d=r(d,'September','september');
d=r(d,'October','oktober');
d=r(d,'November','november');
d=r(d,'December','desember');

document.body.innerHTML=d;