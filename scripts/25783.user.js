// ==UserScript==
// @name           iWiW horoszkop
// @version        1.1
// @author         Trevize
// @namespace      http://userscripts.org/scripts/show/25783
// @description    IWIW adatlapon a születésnap alá kiirja a hozzá tartozó horoszkópot
// @include        http://*iwiw.*/pages/user/userdata.jsp?userID=*
// ==/UserScript==

var arrHonapok = new Array('jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.');
var arrTeljesHonapok = new Array('Január', 'Február', 'Március', 'Árpilis', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December')
var jegyek = new Array();


function Jegy( nev, alsoHatar, felsoHatar) {
    this.nev = nev;
    this.alsoHatar = alsoHatar;
    this.felsoHatar = felsoHatar;
    this.ezAJegy=ezAJegy;
    this.toString=toString;
}

// Egy szamrol allapitja meg, hogy az aktualis jegy objektum tartomanyaiba
// esik -e.
// Parameter: szam - int ; Formatuma: (honap*100 + nap)
// Visszateresi ertek: boolean  (true, ha az aktualis tartomanyban van a szam)
function ezAJegy(szam) {
    // A bak meg decemberben kezdodik, es januarban er veget.
    if (this.alsoHatar < this.felsoHatar) {
       // Nem Bak, tehat az intervallum: [alsoHatar..felsoHatar]
       return (szam >= this.alsoHatar && szam <= this.felsoHatar);
    } else {
      // Bak eseten a ket intervallum: [alsoHatar..1231] es [101..felsoHatar]
      // Ahol 1231 = december 31; 101 = januar 1.
      return ( (szam >= this.alsoHatar && szam<=1231) || (szam <= this.felsoHatar && szam>= 101));
    }
}

// A jegy objektumon belul egy szamerteket konvertal vissza honappa.
// Parameter: ertek - int ; Formatuma: (honap*100 + nap)
// Visszateresi ertek: string ; Formatuma: "Honapnev nap"
function ertekHonapra(ertek) {

    // Az ertek azon resze, amiben nincs tizes es egyes helyierteku szam.
    honap = Math.floor(ertek / 100);
    
    // A maradek pedig a napok szama.
    nap = ertek % 100;
    
    // A honap nevet az arrTeljesHonapok tombbol vesszuk.
    return (arrTeljesHonapok[honap-1] + " " + nap);
}

// Visszaadja az aktualis Jegy objektumot szovegkent.
function toString() {
    return this.nev + "  (" + ertekHonapra(this.alsoHatar)+ " - " + ertekHonapra(this.felsoHatar) + ")";
}

jegyek.push(new Jegy("Bak",     1222, 120));
jegyek.push(new Jegy("Vízöntő", 121 , 219));
jegyek.push(new Jegy("Halak",   220 , 320));
jegyek.push(new Jegy("Kos",     321 , 420));
jegyek.push(new Jegy("Bika",    421,  520));
jegyek.push(new Jegy("Ikrek",   521,  621));
jegyek.push(new Jegy("Rák",     622,  722));
jegyek.push(new Jegy("Oroszlán",723,  822));
jegyek.push(new Jegy("Szűz",    823,  922));
jegyek.push(new Jegy("Mérleg",  923, 1022));
jegyek.push(new Jegy("Skorpió",1023, 1121));
jegyek.push(new Jegy("Nyilas", 1122, 1221));

var elements = document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml','tr');

// Megkeressuk a tablazat sorokat (TR elemek) az oldalon
for (i=0; i<elements.length; i++) {
    // Ha valamelyiknek a gyerekei kozul az egyiknek Születésnap az erteke
    if (elements[i].childNodes.length == 4) {
        if (elements[i].childNodes[1].childNodes[1].innerHTML == "Születésnap") {
           // Akkor elmentjuk a szulinaphoz tartozo Node objektumot
           var szulinapNode = elements[i].childNodes[3].childNodes[1];
           
           // Es tartalmat 
           var szulinap = szulinapNode.innerHTML;
           
           // A ciklus vegere ugrunk :)
           break;
        } // if (elements[i].childNodes[1].childNodes[1].innerHTML == "Születésnap")
    } // if (elements[i].childNodes.length == 4)
} // for (i=0; i<elements.length; i++)

// Ha korabban megtalaltuk a szulinapot
if (szulinap) {
   // Akkor szetbontjuk egy tombbe. A tomb[1] lesz a honap betuvel, a tomb[2]
   // pedig a nap.
   tomb = szulinap.split(" ");
   
   // Megkeressuk a listankban, van-e ilyen honap
   for (i=0; i<12; i++) {
       // Ha van...
       if (tomb[1] == arrHonapok[i]) {
          // Az ertek (honap*100 + nap) lesz.
          ertek = (parseInt((i+1)*100)+parseInt(tomb[2]));
          // Vegigmegyunk a jegyek tombben levo objektumainkon
          for (j = 0; j<12; j++) {
              // Az objektum megmondja, hogy a szam ertek alapjan
              // bele tartozik-e az adott ertek az intervallumaba.
              if (jegyek[j].ezAJegy(ertek)) {
                 // Ha igen, akkor egy uj bekezdes elemet (<P>) hozunk letre...
                 var ujNode = document.createElement("P");

                 with (ujNode.style) {
                 // ... piros szinu betuvel...
                 color = "red";
                 // ... vastagon ...
                 fontWeight="bold";
                 }
                 // Hozzadjuk a tartalmat
                 ujNode.innerHTML="Csillagjegye: " + jegyek[j].toString() ;
                 
                 // Es vegul hozzaadjuk a szuletesnap ala.
                 szulinapNode.parentNode.appendChild( ujNode);
                 
                 // Tobb jegyet mar nem kell vizsgalni, kilepunk a ciklusbol.
                 break;
              } // if (jegyek[j].ezAJegy(ertek)) {
          } // for (j = 0; j<12; j++) {
          // Tovabb nem kell keresni.
          break;
       } // if (tomb[1] == arrHonapok[i])
   } // for (i=1; i<= 12; i++)
} // if (szulinap)
