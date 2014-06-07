// ==UserScript==
// @name           //nazwa
// @namespace      //sciezka do pliku ( w sumie nie wiem po co to :DD )
// @include        https://new.aol.com/productsweb/?promocode=825349
// ==/UserScript==

var FirstName = new Array('Aaron','Adalbert','Adam','Albert','Alex','Alexander','Alfie','Andrew','Anthony','Ben','Benjamin','Billy','Charles','Christopher',
    'Daniel','David','Dominic','Edward','George','Gregory','Harry','Henry','Isaac','Jacob','James','Jamie','Joe','John','Jonathan','Joseph','Kai','Leon','Louis',
    'Lucas','Luke','Matthew','Max','Michael','Nathan','Nicholas','Noah','Oliver','Oscar','Patrick','Paul','Peter','Robert','Sam','Samuel','Sebastian','Thomas',
    'Toby','Tom','William','Alexandra','Alice','Alicia','Amelia','Anna','Charlie','Danielle','Eleanor','Elizabeth','Ella','Emily','Eve','Francesca','Georgina',
    'Hannah','Isabel','Isabella','Isabelle','Kate','Katherine','Katie','Laura','Libby','Lily','Louise','Lucy','Lydia','Madeleine','Natasha','Nicole','Olivia','Rebecca',
    'Samantha','Sarah','Sophia','Sophie','Victoria');
var LastName = new Array('Potter','Adams','Alexander','Allen','Anderson','Bailey','Baker','Barnes','Bell','Bennett','Brooks','Brown','Bryant','Butler','Campbell','Carter',
    'Clark','Coleman','Collins','Cook','Cooper','Cox','Davis','Diaz','Edwards','Evans','Flores','Foster','Garcia','Gonzales','Gonzalez','Gray','Green',
    'Griffin','Hall','Harris','Hayes','Henderson','Hernandez','Hill','Howard','Hughes','Jackson','James','Jenkins','Johnson','Jones','Kelly','King','Lee',
    'Lewis','Long','Lopez','Martin','Martinez','Miller','Mitchell','Moore','Morgan','Morris','Murphy','Nelson','Parker','Patterson','Perez','Perry','Peterson',
    'Phillips','Powell','Price','Ramirez','Reed','Richardson','Rivera','Roberts','Robinson','Rodriguez','Rogers','Ross','Russell','Sanchez','Sanders','Scott',
    'Simmons','Smith','Stewart','Taylor','Thomas','Thompson','Torres','Turner','Walker','Ward','Washington','Watson','White','Williams','Wilson','Wood','Wright','Young');
var Chars = new Array('1','2','3','4','5','6','7','8','9','0','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m');
var Month = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
var Year = new Array('1975','1976','1977','1978','1979','1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000');
var Gender = new Array('maleChoice', 'femaleChoice');
var Question = new Array('What is your frequent flyer number?','What is your library card number?','In which city did your parents meet?',
    'In what year was your mother born?','What was your favorite childhood cartoon?','What was your favorite childhood book?','In what year was your father born?',
    'What was your childhood nickname?','In what city were you born?','What was the name of your first pet?');
var Letters = new Array('q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m');

var Login = Letters[Math.floor(Math.random()*Letters.length)];
var Haslo = '';
var Odpowiedz = '';
var ZipCode = '';

for (x=0; x< Math.floor(Math.random ( ) * 15 + 8 ); x++) Login += Chars[Math.floor(Math.random()*Chars.length)];
for (x=0; x< Math.floor(Math.random ( ) * 20 + 8 ); x++) Haslo += Chars[Math.floor(Math.random()*Chars.length)];
for (x=0; x< Math.floor(Math.random ( ) * 20 + 10 ); x++) Odpowiedz += Chars[Math.floor(Math.random()*Chars.length)];
while (ZipCode.length < 5) ZipCode = Math.floor(Math.random ( ) * 75141 + 1 );


document.getElementById('firstName').value = FirstName[Math.floor(Math.random()*FirstName.length)];
document.getElementById('lastName').value = LastName[Math.floor(Math.random()*LastName.length)];
document.getElementById('desiredSN').value = Login;
document.getElementById('password').value = Haslo;
document.getElementById('verifyPassword').value = Haslo;
document.getElementById('dobMonth').value = Month[Math.floor(Math.random()*Month.length)];
document.getElementById('dobDay').value = Math.floor(Math.random ( ) * 28 + 1 );
document.getElementById('dobYear').value = Year[Math.floor(Math.random()*Year.length)];
document.getElementById(Gender[Math.floor(Math.random()*Gender.length)]).checked=true;
document.getElementById('zipCode').value = Math.floor(Math.random ( ) * 75141 + 1 );
document.getElementById('acctSecurityAnswer').value = Odpowiedz;
document.getElementById('acctSecurityQuestion').value = Question[Math.floor(Math.random()*Question.length)];

prompt('Dane Konta:', 'L: ' + Login + '@aol.com  P: ' + Haslo);  