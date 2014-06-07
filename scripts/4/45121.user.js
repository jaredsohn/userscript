// ==UserScript==
// @name          Travian: Attack builder
// @description   Attack builder - m4rtini (m4rtini89@gmail.com)
// @include       *travian*a2b.php*
// ==/UserScript==

//=)

var targetSplit = "|";
var cordsSplit = ",";

timerIntervalId = 0;

addInfoDiv()

var text = [];
var cataText = [];
var sLang = "";
detectLanguage();

switch(sLang)
{

case "br": // by nbittencourt
case "pt":
text = ["Descendo o dedo =)","Tipo invÃ¡lido de ataque!","Sem coordenadas!","Tropas insuficientes! (Tropas #","Tropas nÃ£o informadas","Iniciando","Coordenadas invÃ¡lidas","Sem unidades de reconhecimento","ConcluÃ­do","ConfiguraÃ§Ã£o da Onda:","Adicionar Onda","Reiniciar","ConfiguraÃ§Ã£o de Ataque:","Tipo de Ataque:","Normal","ReforÃ§o","Assalto","Espiar recursos e tropas","Espiar defesas e tropas","Coordenadas","Senta o dedo! =)","Hora de Chegada","Chegada Ã s:","Definir hora de chegada","NÃºmero de ataques desta onda","com '|' ex: 0,0|1,1","ERRO:","ImpossÃ­vel pegar a aldeia ativa. Considerando que a conta sÃ³ possui uma aldeia","Chegada programada para:"];

cataText = ["Escolha um alvo =)","AleatÃ³rio","Bosque","PoÃ§o de Barro","Mina de Ferro","Campo de Cereais","Serraria","Alvenaria","FundiÃ§Ã£o","Moinho","Padaria","ArmazÃ©m","Celeiro","Ferreiro","FÃ¡brica de Armaduras","PraÃ§a de Torneios","EdifÃ­cio Principal","Ponto de ReuniÃ£o Militar","Mercado","Embaixada","Quartel","Cavalaria","Oficina","Academia","Casa do Povo","ResidÃªncia","PalÃ¡cio","Companhia do ComÃ©rcio","Grande Quartel","Grande Cavalaria","MansÃ£o do HerÃ³i","Grande ArmazÃ©m","Grande Celeiro","Maravilha do Mundo","Tesouraria"];
break;

case "nl":
text = ["Schop een kont =)","Verkeerd aanval type!","Geen coÃ¶rds!","niet genoeg troepen! (Troop #","Vul troepen in",Begint","Verkeerde coÃ¶rds","Geen scouts","Klaar","Golf setup:","Voeg golf toe","Reset","Aanval setup:","Aanval type:","Normaal","Versterking","Overval","Scout Res/Troepen","Scout Def/Troepen","CoÃ¶rds","Schop een kont =)","Aankomst tijd","Arriveert om:","Maak getimde aanval","Hoevaak die golf word gestuurd","met '|' bijv: 0,0|1,1","ERROR:","Kan actiev dorp niet bereieken","Getimde aanval op:"];

cataText = ["Slecteer een doel","Willekeurig","Houthakker","Klei afgravinf","Ijzermijn","Graan veld","Zaagmolen","Steenhouwerij","Ijzersmederij","KorenMolen","Bakerij","Pakhuis","Graansilo","Wapensmid","Uitrustingssmederij","Toernooiveld","Hoofdgebouw","Verzamelplaats","Marktplaats","Ambassade","Barakken","Stal","Werkplaats","Academie","Raadhuis","Residentie","Palijs","Handelskantoor","Grote Barakken","Grote Sral","Held\en Hof","Groot Pakhuis","Grote Graansilo","WereldWonder","Schatkamer"];
break;

case "et"://by jeje

text = ["Ataca!!! =)","Tipo de ataque invalido!","No hay coordenadas!","No hay suficientes Tropas! (Tropas #","No tropas introducidas","Empezando","Problamente malas coordenadas","No hay exploradores","Correcto-Hecho","Configurar Ataque:","AÃ±adir nuevo ataque","Resetear","Configurar ataque:","Tipo de ataque:","Normal","Refuerzos","Atraco","Acechar Produccion/Tropas","Achechar Defensas/Tropas","Coordenadas","Ataca camarada! =)","Tiempo de Llegada","Llegara a las :","Establecer tiempo de llegada","Numero de ataques de esta estrategia","con '|' ex: 0,0|1,1","ERROR:","Incapaz de encontrar la aldea activa. Assuming one village account","Tiempo de llegada establecido a las:"];
cataText = ["Selecciona un objectivo =)","Aleatorio","LeÃ±ador","Barrena","Mina Hierro","Campo de Cereales","Serreria","Ladrillar","Fundicion","Molino","Panaderia","Almacen","Granero","Herreria","Armeria","Plaza de Torneos","Edificio Principal","Plaza de Reuniones","Mercado","Embajada","Cuartel","Establo","Oficina","Academia","Ayuntamiento","Residencia","Palacio","Oficina de comercio","Cuartel Grande","Establo Grande","Casa del Heroe","Almacen Grande","Granero Grande","Maravilla","Tesoro"];

break;

case "lt":
text = ["Ataka vykdoma","Klaidingas atakos tipas","Nepasirinktos koordinatÄ—s","Nepakanka kariÅ³ (KariÅ³ skaiÄius","Nepasirinkti kariai","Pradedama","Klaidingos koordinatÄ—s","TrÅ«ksta Å¾valgybiniÅ³ kariÅ³","Ä®vykdyta","BangÅ³ nustatymai:","PridÄ—ti naujÄ… bangÄ…","Pradiniai nustatymai","AtakÅ³ nustatymai:","Atakos tipas:","Ataka","Pastiprinimas","Reidas","ResursÅ³ bei pajÄ—gÅ³ Å¾valgyba","GynybiniÅ³ fortifikacijÅ³ bei pajÄ—gÅ³ Å¾valgyba","KoordinatÄ—s","Ataka","Atvykimas","Atakos laikas:","Nustatyti atakos laikÄ…","atakÅ³ skaiÄius","atskirti su \'|\' pvz.: 0,0|1,1","KLAIDA:","NeÄ¯manoma gauti gyvenvieÄiÅ³ koordinaÄiÅ³. Tikriausiai yra tik viena gyvenvietÄ—.","KariÅ³ atvykimo laikas nustatytas:","Vykdoma"];
 
cataText = ["Nustatyti taikinÄ¯","Atsitiktinai","MedÅ¾iÅ³ kirtavietÄ—","Molio karjeras","GeleÅ¾ies kasykla","GrÅ«dÅ³ ferma","LentpjÅ«vÄ—","PlytinÄ—","Liejykla","MalÅ«nas","Kepykla","SandÄ—lis","KlÄ—tis","GinklÅ³ kalvÄ—","Å arvÅ³ kalvÄ—","Arena","Gyvenamasis pastatas","SusibÅ«rimo vieta","TurgavietÄ—","Ambasada","KareivinÄ—s","ArklidÄ—","DirbtuvÄ—s","Akademija","RotuÅ¡Ä—","Rezidencija","Valdovo rÅ«mai","IÅ¾dinÄ—","Prekybos rÅ«mai","DidÅ¾iosios kareivinÄ—s","DidÅ¾ioji arklidÄ—","KarÅ¾ygio namai","Didysis sandÄ—lis","DidÅ¾ioji klÄ—tis","Pasaulio stebuklas","Treasury"];
break;

case "tr"://by kustah
text = ["vur tekmeyi =)","yanlÄ±ÅŸ atak tipi!","cordinat yok!","yeterli asker yok! (askerler #","asker seÃ§ilmedi","baÅŸlÄ±yor","yanlÄ±ÅŸ kordinat","gÃ¶zcÃ¼ yok","Bitti","Dalga ayarÄ±:","Yeni dalga ekle","Reset","Atak ayarÄ±:","Atak tipi:","Normal","Destek","YaÄŸmalama","Hammade gÃ¶zle","Defans gÃ¶zle","Kordinat","Vur tekmeyi! =)","UlaÅŸÄ±m zamanÄ±","VarÄ±ÅŸ saati:","UlaÅŸÄ±m zamanÄ± ayarÄ±","Dalgadaki saldÄ±rÄ± sayÄ±sÄ±","with '|' ex: 0,0|1,1","Hata:","Hesap kapalÄ±","UlaÅŸÄ±m zamanÄ± :"];

cataText = ["Select a target =)","Random","Orman","Tugla ocagÄ±","Demir madeni","Tarla","Marangozhane","TuÄŸla FÄ±rÄ±nÄ±","Demir dÃ¶kÃ¼mhanesi","DeÄŸirmen","Ekmek fÄ±rÄ±nÄ±","Hammadde deposu","TahÄ±l ambarÄ±","Silah dÃ¶kÃ¼mhanesi","ZÄ±rh dÃ¶kÃ¼mhanesi","Turnuva alanÄ±","Merkez binasÄ±","Askeri Ã¼s","Pazar yeri","ElÃ§ilik","KÄ±ÅŸla","AhÄ±r","Tamirhane","Akademi","Belediye","KÃ¶ÅŸk","Saray","Ticaret merkezi","BÃ¼yÃ¼k kÄ±ÅŸla","BÃ¼yÃ¼k ahÄ±r","Kahraman kÄ±ÅŸlasÄ±","BÃ¼yÃ¼k hammadde deposu","BÃ¼yÃ¼k TahÄ±l ambarÄ±","DÃ¼nya harikasÄ±","Treasury"];
break;

case "de":
text = ["Whooping some ass =)","Falscher Angriffs Typ!","Keine Koordinaten!","nicht genug Truppen! (Truppen #","Keine Truppen Eingabe","Startet","Falsche Koordinaten","Keine SpÃ¤her!","Fertig","Wellen Einstellung:","Neue Welle hinzufÃ¼gen","Abbrechen","Angriffs Einstellungen:","Angriffs Typ:","Angriff: Normal","UnterstÃ¼tzung","Angriff: Raubzug","Res/Truppen ausspÃ¤hen","Def/Truppen ausspÃ¤hen","Koordinaten","Whoop some ass! =)","Ankunftszeit","Ankunft in:","Ankunftszeit festlegen","Anzahl der Angriffe der spezifischen Welle","mit '|' ex: 0,0|1,1","ERROR:","Unable to get active village. Assuming one village account","Ankunftszeit gesetzt fÃ¼r:"];

cataText = ["Select a target =)","Random","HolzfÃ¤ller","Lehmgrube","Eisenmiene","Getreidefeld","SÃ¤gewerk","Lehmbrennerei","EisengieÃŸerei","GetreidemÃ¼hle","BÃ¤ckerei","Rohstofflager","Kornspeicher","RÃ¼stungsschmiede","Waffenschmiede","Tunierplatz","HauptgebÃ¤ude","Versammlungsplatz","Marktplatz","Botschaft","Kaserne","Stall","Siege Workshop","Akademie","Rathaus","Residenz","Palast","Marktplatz","GroÃŸe Kaserne","GroÃŸer Stall","Heldenhof","GoÃŸes Rohstofflager","GroÃŸer Kornspeicher","Weltwunder","Treasury"];
break;

case "bg": //Ð¾Ñ‚ IYI-Aryan
text = ["ÐÐ¹Ð´Ðµ, ÑÐµÐºÑÐ° Ð¿Ð¾Ñ‡Ð²Ð° =)","ÐÐµÐ²Ð°Ð»Ð¸Ð´ÐµÐ½ Ñ‚Ð¸Ð¿ Ð°Ñ‚Ð°ÐºÐ°!","ÐÐµ ÑÑ‚Ðµ Ð²ÑŠÐ²ÐµÐ»Ð¸ ÐºÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ð¸!","Ð½ÐµÐ´Ð¾ÑÑ‚Ð°Ñ‚ÑŠÑ‡Ð½Ð¾ Ð²Ð¾Ð¹ÑÐºÐ¸! (ÐÑ€Ð¼Ð¸Ð¸ #","ÐÐµ ÑÑ‚Ðµ Ð²ÑŠÐ²ÐµÐ»Ð¸ Ð²Ð¾Ð¹ÑÐºÐ¸","Ð—Ð°Ð¿Ð¾Ñ‡Ð²Ð°Ð¼Ðµ","Ð’ÐµÑ€Ð¾ÑÑ‚Ð½Ð¾ ÐºÐ¾Ñ„Ñ‚Ð¸ ÐºÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ð¸","ÐÑÐ¼Ð°Ñ‚Ðµ Ñ€Ð°Ð·ÑƒÐ·Ð½Ð°Ð²Ð°Ñ‡Ð¸","Ð“Ð¾Ñ‚Ð¾Ð²Ð¾","ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ° Ð½Ð° Ð²ÑŠÐ»Ð½Ð¸Ñ‚Ðµ:","Ð”Ð¾Ð±Ð°Ð²Ð¸ Ð½Ð¾Ð²Ð° Ð²ÑŠÐ»Ð½Ð°","Ð˜Ð·Ñ‡Ð¸ÑÑ‚Ð¸","ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ° Ð½Ð° Ð°Ñ‚Ð°ÐºÐ°Ñ‚Ð°:","Ð¢Ð¸Ð¿ Ð°Ñ‚Ð°ÐºÐ°:","ÐÐ°Ð¿Ð°Ð´ÐµÐ½Ð¸Ðµ","ÐŸÐ¾Ð´ÐºÑ€ÐµÐ¿Ð»ÐµÐ½Ð¸Ðµ","ÐÐ°Ð±ÐµÐ³","Ð Ð°Ð·ÑƒÐ·Ð½Ð°Ð²Ð°Ð½Ðµ Ñ€ÐµÑ/Ð²Ð¾Ð¹ÑÐºÐ¸","Ð Ð°Ð·ÑƒÐ·Ð½Ð°Ð²Ð°Ð½Ðµ ÑƒÐºÑ€ÐµÐ¿Ð»/Ð²Ð¾Ð¹ÑÐºÐ¸","ÐšÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ð¸","Ð¡ÐºÑŠÑÐ°Ð¹ Ð¼Ñƒ ÑˆÐ¾Ñ€Ñ‚Ð¸Ñ‚Ðµ! =)","Ð§Ð°Ñ Ð½Ð° Ð¿Ñ€Ð¸ÑÑ‚Ð¸Ð³Ð°Ð½Ðµ","ÐŸÑ€Ð¸ÑÑ‚Ð¸Ð³Ð½Ð¸ Ð²:","ÐÐ°Ð³Ð»Ð°ÑÐ¸ Ð¿Ñ€Ð¸ÑÑ‚Ð¸Ð³Ð°Ð½Ðµ Ð² Ñ‚Ð¾Ñ‡ÐµÐ½ Ñ‡Ð°Ñ","Ð‘Ñ€. Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ‡Ð½Ð¸ Ð°Ñ‚Ð°ÐºÐ¸ Ñ Ñ‚Ð°Ð·Ð¸ ÑÐ¿ÐµÑ†Ð¸Ñ„Ð¸Ñ‡Ð½Ð° Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ°","Ñ€Ð°Ð·Ð´ÐµÐ»ÐµÑ‚Ðµ ÐºÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ð¸Ñ‚Ðµ Ð½Ð° Ð²ÑÑÐºÐ° Ð¾Ñ‚Ð´ÐµÐ»Ð½Ð° Ñ†ÐµÐ» Ñ '|' Ð½Ð°Ð¿Ñ€Ð¸Ð¼ÐµÑ€: 0,0|1,1","Ð“Ð Ð•Ð¨ÐšÐ:","ÐÐµÑƒÑÐ¿ÐµÑ… Ð¿Ñ€Ð¸ Ð¸Ð·Ð²Ð»Ð¸Ñ‡Ð°Ð½Ðµ Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ Ð·Ð° Ð°ÐºÑ‚Ð¸Ð²Ð½Ð¾Ñ‚Ð¾ ÑÐµÐ»Ð¾. Ð’ÐµÑ€Ð¾ÑÑ‚Ð½Ð¾ Ð°ÐºÐ°ÑƒÐ½Ñ‚ÑŠÑ‚ Ðµ ÑÐ°Ð¼Ð¾ Ñ ÐµÐ´Ð½Ð¾ ÑÐµÐ»Ð¾","ÐŸÑ€Ð¸ÑÑ‚Ð¸Ð³Ð°Ð½ÐµÑ‚Ð¾ Ð² Ñ‚Ð¾Ñ‡ÐµÐ½ Ñ‡Ð°Ñ Ð½Ð°Ð³Ð»Ð°ÑÐµÐ½Ð¾ Ð·Ð°:"];

cataText = ["Ð˜Ð·Ð±ÐµÑ€Ð¸ Ñ†ÐµÐ» =)","Ð¡Ð»ÑƒÑ‡Ð°Ð¹Ð½Ð¾","Ð¡ÐµÑ‡Ð¸Ñ‰Ðµ","Ð“Ð»Ð¸Ð½ÐµÐ½Ð° ÐºÐ°Ñ€Ð¸ÐµÑ€Ð°","Ð ÑƒÐ´Ð½Ð¸Ðº","Ð–Ð¸Ñ‚Ð½Ð¾ Ð¿Ð¾Ð»Ðµ","Ð”ÑŠÑÐºÐ¾Ñ€ÐµÐ·Ð½Ð¸Ñ†Ð°","Ð¢ÑƒÑ…Ð»Ð°Ñ€Ð½Ð°","Ð›ÐµÑÑ€Ð½Ð°","ÐœÐµÐ»Ð½Ð¸Ñ†Ð°","ÐŸÐµÐºÐ°Ñ€Ð½Ð°","Ð¡ÐºÐ»Ð°Ð´","Ð¥Ð°Ð¼Ð±Ð°Ñ€","ÐšÐ¾Ð²Ð°Ñ‡Ð½Ð¸Ñ†Ð° Ð·Ð° Ð¾Ñ€ÑŠÐ¶Ð¸Ñ","ÐšÐ¾Ð²Ð°Ñ‡Ð½Ð¸Ñ†Ð° Ð·Ð° Ð±Ñ€Ð¾Ð½Ð¸","ÐÑ€ÐµÐ½Ð°","Ð“Ð»Ð°Ð²Ð½Ð° ÑÐ³Ñ€Ð°Ð´Ð°","Ð¡Ð±Ð¾Ñ€ÐµÐ½ Ð¿ÑƒÐ½ÐºÑ‚","ÐŸÐ°Ð·Ð°Ñ€","ÐŸÐ¾ÑÐ¾Ð»ÑÑ‚Ð²Ð¾","ÐšÐ°Ð·Ð°Ñ€Ð¼Ð°","ÐšÐ¾Ð½ÑŽÑˆÐ½Ñ","Ð Ð°Ð±Ð¾Ñ‚Ð¸Ð»Ð½Ð¸Ñ†Ð°","ÐÐºÐ°Ð´ÐµÐ¼Ð¸Ñ","ÐšÐ¼ÐµÑ‚ÑÑ‚Ð²Ð¾","Ð ÐµÐ·Ð¸Ð´ÐµÐ½Ñ†Ð¸Ñ","Ð”Ð²Ð¾Ñ€ÐµÑ†","Ð¢ÑŠÑ€Ð³Ð¾Ð²ÑÐºÐ° Ð¿Ð°Ð»Ð°Ñ‚Ð°","Ð“Ð¾Ð»ÑÐ¼Ð° ÐºÐ°Ð·Ð°Ñ€Ð¼Ð°","Ð“Ð¾Ð»ÑÐ¼Ð° ÐºÐ¾Ð½ÑŽÑˆÐ½Ñ","Ð¢Ð°Ð²ÐµÑ€Ð½Ð°","Ð“Ð¾Ð»ÑÐ¼ ÑÐºÐ»Ð°Ð´","Ð“Ð¾Ð»ÑÐ¼ Ñ…Ð°Ð¼Ð±Ð°Ñ€","Ð§ÑƒÐ´Ð¾","Treasury"]; 
break;

case "cz": //CeP
text = ["OdesÃ­lÃ¡m","ChybnÃ½ typ Ãºtoku!","ChybÃ­ souÅ™adnice!","Nedostatek jednotek! (Jednotka #","NeurÄil jsi ÃºtoÄnÃ© jednotky :)","Start","Asi Å¡patnÃ© souÅ™adnice","NemÃ¡Å¡ Å¡pehy","Hotovo","NastavenÃ­ vlny:","PÅ™idat dalÅ¡Ã­ vlnu","Reset","NastavenÃ­ Ãºtoku:","Typ Ãºtoku:","Ãštok","Podpora","LoupeÅ¾","Å pehovat suroviny/jednotky","Å pehovat obranu/jednotky","SouÅ™adnice","Odeslat Ãºtok","Zjistit Äas pÅ™Ã­chodu","PÅ™ijÃ­t v:","NaÄasovat pÅ™Ã­chod","PoÄet ÃºtokÅ¯ ve vlnÄ›","oddÄ›lovaÄ souÅ™adnic - ';' - stÅ™ednÃ­k - napÅ™.: -5|10;51|-110","CHYBA:","Nelze odeslat ..","PÅ™Ã­chod nastaven na:"];

cataText = ["Vyber cÃ­l =)","NÃ¡hodnÃ½","DÅ™evorubec","HlinÄ›nÃ½ dÅ¯l","Å½eleznÃ½ dÅ¯l","ObilnÃ© pole","Pila","Cihelna","SlÃ©vÃ¡rna","MlÃ½n","PekÃ¡rna","Sklad","SÃ½pka","KovÃ¡rna","Zbrojnice","TurnajovÃ© hÅ™iÅ¡tÄ›","HlavnÃ­ budova","ShromaÅ¾diÅ¡tÄ›","TrÅ¾iÅ¡tÄ›","AmbasÃ¡da","KasÃ¡rny","StÃ¡je","DÃ­lna","Akademie","Radnice","Rezidence","PalÃ¡c","ObchodnÃ­ kancelÃ¡Å™","VelkÃ© kasÃ¡rny","VelkÃ© stÃ¡je","HrdinskÃ½ dvÅ¯r","VelkÃ½ sklad","VelkÃ¡ sÃ½pka","Div svÄ›ta","Treasury"];
break;
                                         
case "pt"://by MauDaFaca
text = ["Vai-te a eles =)","Tipo de ataque invalido!","Sem coordenadas!","Sem tropas suficientes! (Tropas #","Sem especificaÃ§Ã£o de tropas","ComeÃ§ando","Provavelmente mÃ¡s coordenadas","Sem batedores","Feito","ConfiguraÃ§Ã£o da onda:","Adicionar nova onda","Zerar","Configurar ataque:","Tipo de ataque:","Normal","ReforÃ§o","Assalto","Espiar Rec/Tropas","Scout Def/Tropas","Coordenadas","Vai-te a eles! =)","tempo de chegada","Chegada Ã s:","Devem chegar Ã s","Numero de ataques desta onda","Com '|' ex: 0,0|1,1","ERRO:","Incapaz de encontrar uma aldeia activa. Assumindo uma conta de aldeia","Tempo de chegada Ã s:"];
      
cataText = ["Escolha um alvo =)","Ã€ sorte","Floresta","PÃ§o de barro","Mina de ferro","Campo de cereais","SerraÃ§Ã£o","Oleiro","FundiÃ§Ã£o","Moinho","Padaria","Armazem","Celeiro","Ferreiro","FÃ¡brica de Armaduras","PraÃ§a de troneios","Edificio principal","Ponto de reuniÃ£o","Mercado","Embaixada","Quartel","EstÃ¡bulo","Oficina","Academia","Casa do povo","Residencia","Palacio","Companhia do comÃ©rcio","Grande quartel","Grande estÃ¡bulo","ResidÃªncia do heroi","Grande armazem","Grande celeiro","Maravilha do mundo","Treasury"];
break;
      
case "sk": //by eth4rendil
text = ["Rozbi tÃº lamu =)","ChybnÃ½ typ Ãºtoku!","Å¾iadne sÃºradnice!","Nedostatok vojakov! (Vojak #","Å½iadny vojaci na utoÄenie :)","ZaÄÃ­nam","Pravdepodobne zlÃ© sÃºradnice","Å¾iadny Å¡peh","Hotovo","Nastavenie vlny:","PridaÅ¥ novÃº vlnu","Reset","Nastavenie Ãºtoku:","Typ Ãºtoku:","Ãštok","Podpora","LÃºpeÅ¾","Å pehovaÅ¥ suroviny a vojakov","Å pehovat obranne budovy a vojakov","SÃºradnice","Rozbi tÃº lamu! =)","ÄŒas prÃ­chodu","PrÃ­sÅ¥ o:","NastaviÅ¥ ÄasovanÃ½ prÃ­chod","PoÄet Ãºtokov v danej vlne","with '|' ex: 0,0|1,1","Error:","Nemozno odoslat ..","ÄŒas prÃ­chodu nastaveny na:"];

cataText = ["Vyberte si cieÄ¾ =)","NÃ¡hodne","DrevorubaÄ","HlinenÃ¡ baÅˆa","Å½eleznÃ¡ baÅˆa","ObilnÃ© pole","PÃ­la","TeheÄ¾Åˆa","ZlievareÅˆ","Mlyn","PekÃ¡reÅˆ","Sklad","SÃ½pka","KovÃ¡Äska dielÅˆa","Zbrojnica","ArÃ©na","HlavnÃ¡ budova","Bod stretunutia","Trhovisko","AmbasÃ¡da","KasÃ¡rne","Stajne","DielÅˆa","AkadÃ©mia","Radnica","Rezidencia","PalÃ¡c","ObchodnÃ¡ kancelÃ¡ria","VelkÃ© kasÃ¡rne","VelkÃ© stajne","HrdinskÃ½ dvoj","VelkÃ½ sklad","VelkÃ¡ sÃ½pka","Div sveta","Treasury"];
break; 

case "pl": //by robertnik
text = ["LiczÄ™ coÅ› tam :P","ZÅ‚y typ ataku!","Brak wspÃ³Å‚rzÄ™dnych!","Å¹le wybraÅ‚eÅ› jednostki! (Atak #","Nie wybrano jednostek!","Zaplanowany ATAK","ZÅ‚e wspÃ³Å‚rzÄ™dne","Nie wybraÅ‚eÅ› szpiegÃ³w","Atakuj ","Wybierz jednostki:","Dodaj nowy atak","WyczyÅ›Ä‡","SzczegÃ³Å‚y ataku:","Typ ataku:","Atak: Normalny","PosiÅ‚ki","Atak: GrabieÅ¼","Obserwuj surowce","Obserwuj fortyfikacje","WspÃ³Å‚rzÄ™dne","Zaplanuj, pÃ³Åºniej odÅ›wieÅ¼ ;)","Pokarz aktualny czas ataku","Arrive at:","Zaplanuj atak o czasie dojÅ›cia","IloÅ›Ä‡ atakÃ³w","inny cel po '|' przykÅ‚ad: 0,0|1,1","BÅÄ„D: ","Niezdolny dostaÄ‡ aktywnÄ… wieÅ›.","Zaplanowany atak dojdzie o: "];

cataText = ["Wybierz cel =)","Losowy cel","Las","Kopalnia gliny","Kopalnia Å¼elaza","Pole","Tartak","Cegielnia","Huta Å¼elaza","MÅ‚yn","Piekarnia","Magazyn","Spichlerz","KuÅºnia","Zbrojownia","Plac turniejowy","GÅ‚Ã³wny budynek","Miejsce zbiÃ³rki","Rynek","Ambasada","Koszary","Stajnia","Warsztat","Akademia","Ratusz","Rezydencja","PaÅ‚ac","Targ","DuÅ¼e koszary","DuÅ¼a stajnia","DwÃ³r bohaterÃ³w","DuÅ¼y magazyn","DuÅ¼y spichlerz","Cud :P","Treasury"];
break; 


case "ua": //By Optimusik
text = ["ÐÐ°Ð´ÐµÑ€Ñ‚Ð¸ ÑÑ–Ð´Ð½Ð¸Ñ†Ñ–! =)","ÐÐµÐ²Ñ–Ñ€Ð½Ð¸Ð¹ Ñ‚Ð¸Ð¿ Ð°Ñ‚Ð°ÐºÐ¸!","Ð’ÐºÐ°Ð¶Ñ–Ñ‚ÑŒ ÐºÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ð¸!","Ð±Ñ–Ð»ÑŒÑˆÐµ Ð½ÐµÐ¼Ð°Ñ” Ð²Ñ–Ð¹ÑÑŒÐº! (Ð’Ñ–Ð¹ÑÑŒÐºÐ¾ #","ÐÐµ Ð²ÐºÐ°Ð·Ð°Ð½Ñ– Ð²Ñ–Ð¹ÑÑŒÐºÐ°","ÐŸÐ¾Ñ‡Ð°Ñ‚Ð¾Ðº","Ð™Ð¼Ð¾Ð²Ñ–Ñ€Ð½Ð¾ Ð½ÐµÐ²Ñ–Ñ€Ð½Ñ– ÐºÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ð¸","ÐÐµÐ¼Ð°Ñ” Ñ€Ð¾Ð·Ð²Ñ–Ð´Ð½Ð¸ÐºÑ–Ð²","Ð“Ð¾Ñ‚Ð¾Ð²Ð¾","ÐÐ°Ð»Ð°ÑˆÑ‚ÑƒÐ²Ð°Ð½Ð½Ñ Ñ…Ð²Ð¸Ð»Ñ–:","Ð”Ð¾Ð´Ð°Ñ‚Ð¸ Ñ…Ð²Ð¸Ð»ÑŽ","Ð¡ÐºÐ¸Ð½ÑƒÑ‚Ð¸","ÐÐ°Ð»Ð°ÑˆÑ‚ÑƒÐ²Ð°Ð½Ð½Ñ Ð°Ñ‚Ð°ÐºÐ¸:","Ð¢Ð¸Ð¿ Ð°Ñ‚Ð°ÐºÐ¸:","Ð—Ð²Ð¸Ñ‡Ð°Ð¹Ð½Ð°","ÐŸÑ–Ð´ÐºÑ€Ñ–Ð¿Ð»ÐµÐ½Ð½Ñ","ÐÐ°Ð±Ñ–Ð³","Ð Ð¾Ð·Ð²Ñ–Ð´Ð°Ñ‚Ð¸ Ñ€ÐµÑÑƒÑ€ÑÐ¸ Ñ‚Ð° Ð²Ñ–Ð¹ÑÑŒÐºÐ¾","Ð Ð¾Ð·Ð²Ñ–Ð´Ð°Ñ‚Ð¸ Ð¾Ð±Ð¾Ñ€Ð¾Ð½Ð½Ñ– ÑÐ¿Ð¾Ñ€ÑƒÐ´Ð¸ Ñ‚Ð° Ð²Ñ–Ð¹ÑÑŒÐºÐ¾","ÐšÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ð¸","ÐÐ°Ð´ÐµÑ€Ñ‚Ð¸ ÑÑ–Ð´Ð½Ð¸Ñ†Ñ–! =)","Ð§Ð°Ñ Ð¿Ñ€Ð¸Ð±ÑƒÑ‚Ñ‚Ñ","ÐŸÑ€Ð¸Ð±ÑƒÑ‚Ñ‚Ñ Ð²:","Ð’ÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð½Ñ Ñ‡Ð°ÑÑƒ Ð¿Ñ€Ð¸Ð±ÑƒÑ‚Ñ‚Ñ","ÐšÑ–Ð»ÑŒÐºÑ–ÑÑ‚ÑŒ Ð°Ñ‚Ð°Ðº Ð´Ð»Ñ Ð²ÐºÐ°Ð·Ð°Ð½Ð¾Ñ— Ñ…Ð²Ð¸Ð»Ñ–","Ñ€Ð¾Ð·Ð´Ñ–Ð»ÑŒÐ½Ð¸Ðº '|' Ð½Ð°Ð¿Ñ€Ð¸ÐºÐ»Ð°Ð´: 0,0|1,1","ÐŸÐ¾Ð¼Ð¸Ð»ÐºÐ°:","ÐÐµÐ¼Ð¾Ð¶Ð»Ð¸Ð²Ð¾ Ð²Ð¸Ð·Ð½Ð°Ñ‡Ð¸Ñ‚Ð¸ Ð°ÐºÑ‚Ð¸Ð²Ð½Ðµ Ð¿Ð¾ÑÐµÐ»ÐµÐ½Ð½Ñ. Ð’ÐºÐ°Ð¶Ñ–Ñ‚ÑŒ Ð¾Ð´Ð½Ðµ Ð· Ð¿Ð¾ÑÐµÐ»ÐµÐ½ÑŒ","Ð§Ð°Ñ Ð¿Ñ€Ð¸Ð±ÑƒÑ‚Ñ‚Ñ Ð²ÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ð¹ Ð²:"];

cataText = ["ÐžÐ±ÐµÑ€Ñ–Ñ‚ÑŒ Ñ†Ñ–Ð»ÑŒ =)","Ð’Ð¸Ð¿Ð°Ð´ÐºÐ¾Ð²Ð¾","Ð›Ñ–ÑÐ¾Ð¿Ð¾Ð²Ð°Ð»","Ð“Ð»Ð¸Ð½ÑÐ½Ð¸Ð¹ ÐºÐ°Ñ€'Ñ”Ñ€","Ð—Ð°Ð»Ñ–Ð·Ð½Ð° ÐºÐ¾Ð¿Ð°Ð»ÑŒÐ½Ñ","Ð¤ÐµÑ€Ð¼Ð°","Ð”ÐµÑ€ÐµÐ²Ð¾Ð¾Ð±Ñ€Ð¾Ð±Ð½Ð¸Ð¹ Ð·Ð°Ð²Ð¾Ð´","Ð¦ÐµÐ³ÐµÐ»ÑŒÐ½Ð¸Ð¹ Ð·Ð°Ð²Ð¾Ð´","Ð§Ð°Ð²ÑƒÐ½Ð¾Ð»Ð¸Ð²Ð°Ñ€Ð½Ð¸Ð¹ Ð·Ð°Ð²Ð¾Ð´","ÐœÐ»Ð¸Ð½","ÐŸÐµÐºÐ°Ñ€Ð½Ñ","Ð¡ÐºÐ»Ð°Ð´","Ð—ÐµÑ€Ð½Ð¾Ð²Ð° ÐºÐ¾Ð¼Ð¾Ñ€Ð°","ÐšÑƒÐ·Ð½Ñ Ð·Ð±Ñ€Ð¾Ñ—","ÐšÑƒÐ·Ð½Ñ Ð¾Ð±Ð»Ð°Ð´ÑƒÐ½ÐºÑ–Ð²","ÐÑ€ÐµÐ½Ð°","Ð“Ð¾Ð»Ð¾Ð²Ð½Ð° Ð±ÑƒÐ´Ñ–Ð²Ð»Ñ","ÐŸÑƒÐ½ÐºÑ‚ Ð·Ð±Ð¾Ñ€Ñƒ","Ð Ð¸Ð½Ð¾Ðº","ÐŸÐ¾ÑÐ¾Ð»ÑŒÑÑ‚Ð²Ð¾","ÐšÐ°Ð·Ð°Ñ€Ð¼Ð°","Ð¡Ñ‚Ð°Ð¹Ð½Ñ","ÐœÐ°Ð¹ÑÑ‚ÐµÑ€Ð½Ñ","ÐÐºÐ°Ð´ÐµÐ¼Ñ–Ñ","Ð Ð°Ñ‚ÑƒÑˆÐ°","Ð ÐµÐ·Ð¸Ð´ÐµÐ½Ñ†Ñ–Ñ","ÐŸÐ°Ð»Ð°Ñ†","Ð¢Ð¾Ñ€Ð³Ñ–Ð²ÐµÐ»ÑŒÐ½Ð° Ð¿Ð°Ð»Ð°Ñ‚Ð°","Ð’ÐµÐ»Ð¸ÐºÐ° ÐºÐ°Ð·Ð°Ñ€Ð¼Ð°","Ð’ÐµÐ»Ð¸ÐºÐ° ÑÑ‚Ð°Ð¹Ð½Ñ","Ð¢Ð°Ð²ÐµÑ€Ð½Ð°","Ð’ÐµÐ»Ð¸ÐºÐ¸Ð¹ ÑÐºÐ»Ð°Ð´","Ð’ÐµÐ»Ð¸ÐºÐ° Ð·ÐµÑ€Ð½Ð¾Ð²Ð° ÐºÐ¾Ð¼Ð¾Ñ€Ð°","Ð”Ð¸Ð²Ð¾ ÑÐ²Ñ–Ñ‚Ñƒ","Treasury"];
break;


case "ru": //by KrasivayaSvo
text = ["ÐÐ°Ð´Ñ€Ð°Ñ‚ÑŒ Ð·Ð°Ð´Ð½Ð¸Ñ†Ñƒ =)","ÐÐµÐ¿Ñ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ñ‹Ð¹ Ñ‚Ð¸Ð¿ Ð°Ñ‚Ð°ÐºÐ¸!","Ð£ÐºÐ°Ð¶Ð¸Ñ‚Ðµ ÐºÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ñ‹!","Ð±Ð¾Ð»ÑŒÑˆÐµ Ð½ÐµÑ‚ Ð²Ð¾Ð¹ÑÐº! (Ð’Ð¾Ð¹ÑÐºÐ¾ #","ÐÐµ ÑƒÐºÐ°Ð·Ð°Ð½Ñ‹ Ð²Ð¾Ð¹ÑÐºÐ°","ÐÐ°Ñ‡Ð°Ð»Ð¾","Ð’ÐµÑ€Ð¾ÑÐ½Ð¾ Ð½ÐµÐ¿Ñ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ñ‹Ðµ ÐºÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ñ‹","ÐÐµÑ‚ Ñ€Ð°Ð·Ð²ÐµÐ´Ñ‡Ð¸ÐºÐ¾Ð²","Ð“Ð¾Ñ‚Ð¾Ð²Ð¾","ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸ Ð²Ð¾Ð»Ð½Ñ‹:","Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ð²Ð¾Ð»Ð½Ñƒ","Ð¡Ð±Ñ€Ð¾Ñ","ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸ Ð°Ñ‚Ð°ÐºÐ¸:","Ð¢Ð¸Ð¿ Ð°Ñ‚Ð°ÐºÐ¸:","ÐÐ¾Ñ€Ð¼Ð°Ð»ÑŒÐ½Ð°Ñ","ÐŸÐ¾Ð´ÐºÑ€ÐµÐ¿Ð»ÐµÐ½Ð¸Ðµ","ÐÐ°Ð¿Ð°Ð´ÐµÐ½Ð¸Ðµ","Ð Ð°Ð·Ð²ÐµÐ´ÐºÐ° Ñ€ÐµÑÑƒÑ€ÑÐ¾Ð² Ð¸ Ð²Ð¾Ð¹ÑÐº","Ð Ð°Ð·Ð²ÐµÐ´ÐºÐ° Ð¾Ð±Ð¾Ñ€Ð¾Ð½Ñ‹ Ð¸ Ð²Ð¾Ð¹ÑÐº","ÐšÐ¾Ð¾Ñ€Ð´Ð¸Ð½Ð°Ñ‚Ñ‹","ÐÐ°Ð´Ñ€Ð°Ñ‚ÑŒ Ð·Ð°Ð´Ð½Ð¸Ñ†Ñƒ! =)","Ð’Ñ€ÐµÐ¼Ñ Ð¿Ñ€Ð¸Ð±Ñ‹Ñ‚Ð¸Ñ","ÐŸÑ€Ð¸Ð±Ñ‹Ñ‚Ð¸Ðµ Ð²:","Ð£ÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ° Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸ Ð¿Ñ€Ð¸Ð±Ñ‹Ñ‚Ð¸Ñ","Ð§Ð¸ÑÐ»Ð¾ Ð°Ñ‚Ð°Ðº Ð´Ð»Ñ ÑƒÐºÐ°Ð·Ð°Ð½Ð½Ð¾Ð¹ Ð²Ð¾Ð»Ð½Ñ‹","Ñ€Ð°Ð·Ð´ÐµÐ»Ð¸Ñ‚ÐµÐ»ÑŒ '|' Ð½Ð°Ð¿Ñ€Ð¸Ð¼ÐµÑ€: 0,0|1,1","ÐžÑˆÐ¸Ð±ÐºÐ°:","ÐÐµÐ²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»Ð¸Ñ‚ÑŒ Ð°ÐºÑ‚Ð¸Ð²Ð½ÑƒÑŽ Ð´ÐµÑ€ÐµÐ²Ð½ÑŽ. Ð£ÐºÐ°Ð¶Ð¸Ñ‚Ðµ Ð¾Ð´Ð½Ñƒ Ð¸Ð· Ð´ÐµÑ€ÐµÐ²ÐµÐ½ÑŒ","Ð’Ñ€ÐµÐ¼Ñ Ð¿Ñ€Ð¸Ð±Ñ‹Ñ‚Ð¸Ñ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¾ Ð²:"];

cataText = ["Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ñ†ÐµÐ»ÑŒ =)","Ð¡Ð»ÑƒÑ‡Ð°Ð¹Ð½Ð¾","Ð›ÐµÑÐ¾Ð¿Ð¸Ð»ÑŒÐ½Ñ‹Ð¹ Ð·Ð°Ð²Ð¾Ð´","Ð“Ð»Ð¸Ð½ÑÐ½Ñ‹Ð¹ ÐºÐ°Ñ€ÑŒÐµÑ€","Ð–ÐµÐ»ÐµÐ·Ð½Ñ‹Ð¹ Ñ€ÑƒÐ´Ð½Ð¸Ðº","Ð¤ÐµÑ€Ð¼Ð°","Ð”ÐµÑ€ÐµÐ²Ð¾Ð¾Ð±Ñ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°ÑŽÑ‰Ð¸Ð¹ Ð·Ð°Ð²Ð¾Ð´","ÐšÐ¸Ñ€Ð¿Ð¸Ñ‡Ð½Ñ‹Ð¹ Ð·Ð°Ð²Ð¾Ð´","Ð§ÑƒÐ³ÑƒÐ½Ð¾Ð»Ð¸Ñ‚ÐµÐ¹Ð½Ñ‹Ð¹ Ð·Ð°Ð²Ð¾Ð´","ÐœÑƒÐºÐ¾Ð¼Ð¾Ð»ÑŒÐ½Ð°Ñ Ð¼ÐµÐ»ÑŒÐ½Ð¸Ñ†Ð°","ÐŸÐµÐºÐ°Ñ€Ð½Ñ","Ð¡ÐºÐ»Ð°Ð´","ÐÐ¼Ð±Ð°Ñ€","ÐšÑƒÐ·Ð½Ð¸Ñ†Ð° Ð¾Ñ€ÑƒÐ¶Ð¸Ñ","ÐšÑƒÐ·Ð½Ð¸Ñ†Ð° Ð´Ð¾ÑÐ¿ÐµÑ…Ð¾Ð²","ÐÑ€ÐµÐ½Ð°","Ð“Ð»Ð°Ð²Ð½Ð¾Ðµ Ð·Ð´Ð°Ð½Ð¸Ðµ","ÐŸÑƒÐ½ÐºÑ‚ ÑÐ±Ð¾Ñ€Ð°","Ð Ñ‹Ð½Ð¾Ðº","ÐŸÐ¾ÑÐ¾Ð»ÑŒÑÑ‚Ð²Ð¾","ÐšÐ°Ð·Ð°Ñ€Ð¼Ð°","ÐšÐ¾Ð½ÑŽÑˆÐ½Ñ","ÐœÐ°ÑÑ‚ÐµÑ€ÑÐºÐ°Ñ","ÐÐºÐ°Ð´ÐµÐ¼Ð¸Ñ","Ð Ð°Ñ‚ÑƒÑˆÐ°","Ð ÐµÐ·Ð¸Ð´ÐµÐ½Ñ†Ð¸Ñ","Ð”Ð²Ð¾Ñ€ÐµÑ†","Ð¢Ð¾Ñ€Ð³Ð¾Ð²Ð°Ñ Ð¿Ð°Ð»Ð°Ñ‚Ð°","Ð‘Ð¾Ð»ÑŒÑˆÐ°Ñ ÐºÐ°Ð·Ð°Ñ€Ð¼Ð°","Ð‘Ð¾Ð»ÑŒÑˆÐ°Ñ ÐºÐ¾Ð½ÑŽÑˆÐ½Ñ","Ð¢Ð°Ð²ÐµÑ€Ð½Ð°","Ð‘Ð¾Ð»ÑŒÑˆÐ¾Ð¹ ÑÐºÐ»Ð°Ð´","Ð‘Ð¾Ð»ÑŒÑˆÐ¾Ð¹ Ð°Ð¼Ð±Ð°Ñ€","Ð§ÑƒÐ´Ð¾ ÑÐ²ÐµÑ‚Ð°","Treasury"];
break;


case "fr": //by gedi
text = ["Envoyer ! =)","Type d'attaque incorrect!","Pas de coord!","Pas assez de troupes! (Troupe #","Pas de troupe saisie","DÃ©part","Mauvaises coord ?","Pas d'espions","Parti","Vague :","Autre vague","RAZ","Attaque :","Type d'attaque:","Normal","Assistance","Pillage","Espion. Res/Troupes","Espion. Def/Troupes","Coord.","Envoyer ! =)","ArrivÃ©e ","ArrivÃ©e a :","Fixe l'heure d'arrivÃ©e","Nombre d'attaques de cette vague","avec '|' ex: 0,0|1,1","ERREUR:","Impossible d'obtenir le village actif. Assume un seul village","Heure d'arrivÃ©e fixÃ©e Ã  :"];

cataText = ["Selectionner une cible =)","Hasard","Bucheron","CarriÃ¨re de terre","Mine Fer","Ferme de cÃ©rÃ©ales","Scierie","Usine de poterie","Fonderie","Moulin","Boulangerie","DÃ©pot de ressources","Silot","Usine d'armure","Armurerie","Place du tournoi","Bat Principal","Place rassemblement","MarchÃ©","Ambassade","Caserne","Ecurie","Atelier","Academie","Hotel de ville","Residence","Palais","Comptoire de commerce","Grande caserne","Grande Ecurie","Manoir du hÃ©ros","Grand dÃ©pot","Grand Silot","Merveille","Treasury"];
break;

case "ae": //Credit to Ibrahim Al_Motery for the translation.

text = ["Ø§Ù„Ù‡Ø¬ÙˆÙ… =)","Ù†ÙˆØ¹ Ù‡Ø¬ÙˆÙ… Ø®Ø§Ø·Ø¦!","Ù„Ø§ØªÙˆØ¬Ø¯ Ø¥Ø­Ø¯Ø§Ø«ÙŠØ§Øª!","Ø§Ù„Ù‚ÙˆØ§Øª ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯Ù‡!","Ù„Ù… ÙŠØªÙ… Ø¥Ø®ØªÙŠØ§Ø± Ø§Ù„Ù‚ÙˆØ§Øª","Ø¨Ø¯Ø§ÙŠØ© Ø§Ù„Ø¹Ù…Ù„ÙŠÙ‡","Ø±Ø¨Ù…Ø§ Ø§Ù„Ø¥Ø­Ø¯Ø§Ø«ÙŠØ§Øª Ø®Ø§Ø·Ø¦Ø©","Ù„Ù… ØªØ®ØªØ§Ø± ÙˆØ­Ø¯Ø§Øª ÙƒØ´Ø§ÙÙ‡","ØªÙ… Ø§Ù„Ù‡Ø¬ÙˆÙ…","Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù‡Ø¬Ù…Ø§Øª","Ø£Ø¶Ù Ù‡Ø¬ÙˆÙ… Ø¬Ø¯ÙŠØ¯","Ø¥Ø¹Ø§Ø¯Ù‡","Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù‡Ø¬ÙˆÙ…:","Ù†ÙˆØ¹ Ø§Ù„Ù‡Ø¬ÙˆÙ…:","Ø¹Ø§Ø¯ÙŠ","ØªØ¹Ø²ÙŠØ²","Ù‡Ø¬ÙˆÙ…","Ù…Ø³ØªÙƒØ´Ù Ù„Ù…Ø¹Ø±ÙØ© Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ ÙˆØ§Ù„Ù‚ÙˆØ§Øª","Ù…Ø³ØªÙƒØ´Ù Ù„Ù…Ø¹Ø±ÙØ© Ø§Ù„ØªØ­ØµÙŠÙ†Ø§Øª ÙˆØ§Ù„Ù‚ÙˆØ§Øª","Ø§Ù„Ø¥Ø­Ø¯Ø§Ø«ÙŠØ§Øª","Ø§Ù‡Ø¬Ù… Ø§Ù„Ø§Ù† =)","ÙˆÙ‚Øª Ø§Ù„ÙˆØµÙˆÙ„","Ø§Ù„ÙˆØµÙˆÙ„ ÙÙŠ:","Ø¥Ø®ØªØ§Ø± ÙˆÙ‚Øª Ø§Ù„ÙˆØµÙˆÙ„","ØªØ±Ø¬Ù…Ø©:Ø§Ø¨Ø±Ø§Ù‡ÙŠÙ… Ù…Ø­ÙŠÙ„ Ø§Ù„Ù…Ø·ÙŠØ±ÙŠ","Ù„Ù„Ù‡Ø¬ÙˆÙ… Ø¹Ù„Ù‰ Ø£ÙƒØ«Ø± Ù…Ù† Ù‚Ø±ÙŠÙ‡ Ø¶Ø¹ Ù‡Ø°Ù‡ Ø¨ÙŠÙ† Ø§Ù„Ø¥Ø­Ø¯Ø§Ø«ÙŠØ§Øª '|' Ù…Ø«Ø§Ù„: 0,0|1,1 ","Ø®Ø·Ø£:",".ØºÙŠØ± Ù‚Ø§Ø¯Ø± Ø¹Ù„Ù‰ ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù‚Ø±Ù‰. ØªØ£ÙƒØ¯ Ù…Ù† Ø§Ù„Ø¥Ø­Ø¯Ø§Ø«ÙŠØ§Øª","ÙˆÙ‚Øª Ø§Ù„ÙˆØµÙˆÙ„ Ø­Ø¯Ø¯ Ø¹Ù„Ù‰:"];

cataText = ["Ø¥Ø®ØªØ§Ø± Ø§Ù„Ù‡Ø¯Ù =)","Ø¹Ø´ÙˆØ§Ø¦ÙŠ","Ø§Ù„Ø­Ø·Ø§Ø¨","Ø­ÙØ±Ø© Ø§Ù„Ø·ÙŠÙ†","Ù…Ù†Ø¬Ù… Ø§Ù„Ø­Ø¯ÙŠØ¯","Ø­Ù‚Ù„ Ø§Ù„Ù‚Ù…Ø­","Ù…Ø¹Ù…Ù„ Ø§Ù„Ù†Ø´Ø§Ø±Ø©","Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„Ø¨Ù†Ø§Ø¡","Ø­Ø¯ÙŠØ¯ Ù…Ø³Ø¨Ùƒ","Ø§Ù„Ù…Ø·Ø§Ø­Ù†","Ø§Ù„Ù…Ø®Ø¨Ø²","Ø§Ù„Ù…Ø®Ø²Ù†","Ø§Ù„Ù…Ø®Ø§Ø²Ù†","Ø§Ù„Ø­Ø¯Ø§Ø¯","Ù…Ø³ØªÙˆØ¯Ø¹ Ø§Ù„Ø£Ø³Ù„Ø­Ø©","Ø³Ø§Ø­Ø© Ø§Ù„Ø¨Ø·ÙˆÙ„Ø©","Ø§Ù„Ù…Ø¨Ù†Ù‰ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ","Ù†Ù‚Ø·Ø© Ø§Ù„ØªØ¬Ù…Ø¹","Ø§Ù„Ø³ÙˆÙ‚","Ø§Ù„Ø«ÙƒÙ†Ù‡","Ø§Ù„Ø³ÙØ§Ø±Ø©","Ø§Ù„Ø¥Ø³Ø·Ø¨Ù„","Ø§Ù„ØµÙŠØ§","Ø§Ù„Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠÙ‡","Ø§Ù„Ø¨Ù„Ø¯ÙŠÙ‡","Ø§Ù„Ø³ÙƒÙ†","Ø§Ù„Ù‚ØµØ±","Ø§Ù„Ù…ÙƒØªØ¨ Ø§Ù„ØªØ¬Ø§Ø±ÙŠ","Ø§Ù„Ø«ÙƒÙ†Ø© Ø§Ù„ÙƒØ¨ÙŠØ±Ø©","Ø§Ù„Ø¥Ø³Ø¨Ø·Ù„ Ø§Ù„ÙƒØ¨ÙŠØ±","Ù‚ØµØ± Ø§Ù„Ø£Ø¨Ø·Ø§Ù„","Ø§Ù„Ù…Ø®Ø²Ù† Ø§Ù„ÙƒØ¨ÙŠØ±","Ø§Ù„Ù…Ø®Ø²Ù† Ø§Ù„ÙƒØ¨ÙŠØ±","Ù…Ø¹Ø¬Ø²Ø© Ø§Ù„Ø¹Ø§Ù„Ù…","Treasury"];
break;

case "dk": //Credit to Kennetha for the translation.
text = ["KlargÃ¸r angreb...","Ugyldig angrebstype!","Ingen koordinater!","Ikke nok tropper! (Enhed #","Ingen tropper valgt","Starter","Sandsynligvis ugyldige koordinater","Ingen spionenheder","FÃ¦rdig","Angrebsindstillinger:","TilfÃ¸j ny angrebsbÃ¸lge","Nulstil","Angrebsindstillinger:","Angrebstype:","Normalt","Opbakning","Plyndringstogt","Spionage Res/Tropper","Spionage Forsvar/Tropper","Koordinater","Angrib! =)","Ankomst tid","Ankomst:","SÃ¦t timet ankomst","Antal angreb af den specifikke angrebsbÃ¸lge","Adskil med '|' f.eks.: 0,0|1,1 for at sende angreb pÃ¥ flere byer af gangen","Fejl:","Kunne ikke finde aktiv landsby. Antager kontoen har Ã©n by.","Timet ankomst sat til:"];

cataText = ["VÃ¦lg et mÃ¥l =)","TilfÃ¦lde","Skovhugger","Lergrav","Jernmine","Kornavler","SavvÃ¦rk","LerbrÃ¦nderi","JernstÃ¸beri","KornmÃ¸lle","Bageri","RÃ¥stoflager","Kornkammer","VÃ¥bensmedje","Rustningssmedje","Turneringsplads","Hovedbygning","Forsamlingsplads","Markedsplads","Ambassade","Kaserne","Stald","VÃ¦rksted","Akademi","RÃ¥dhus","Residens","Palads","Handelskontor","Stor kaserne","Stor stald","Heltebygning","Stort rÃ¥stoflager","Stort kornkammer","Verdens Vidunder","Treasury"];
break;


case "hu": // by Mijo
text = ["ZÃºzÃ¡s folyamatban =)","Ã‰rvÃ©nytelen tÃ¡madÃ¡si tÃ­pus!","Mik a koordinÃ¡tÃ¡k?!","nincs elÃ©g sereg! (Sereg #","Nincs sereg megadva!","IndÃ­tÃ¡s","ValÃ³szÃ­nÅ±leg hibÃ¡s cÃ©l!","Nincs kÃ©med!","KÃ©sz!","HullÃ¡mok beÃ¡llÃ­tÃ¡sa:","Ãšj hullÃ¡m","LenullÃ¡z","TÃ¡madÃ¡s beÃ¡llÃ­tÃ¡sa:","TÃ¡madÃ¡si forma:","NormÃ¡l","TÃ¡mogatÃ¡s","FosztogatÃ¡s","KÃ©mkedÃ©s Nyersanyagok/Seregek","KÃ©mkedÃ©s VÃ©delmi BerendezÃ©sek/Seregek","KoordinÃ¡tÃ¡k","ZÃºzzunk oda! =)","Ã‰rkezÃ©si idÅ‘","Ã‰rkezÃ©s ekkor:","IdÅ‘zÃ­tett Ã©rkezÃ©s","Az adott hullÃ¡m tÃ¡madÃ¡sainak szÃ¡ma","TÃ¶bb cÃ©l elvÃ¡lasztÃ¡sa '|'-val pl: 0,0|1,1","HIBA: ","Nem lehet meghatÃ¡rozni az aktuÃ¡lis falut! FeltÃ©telezhetÅ‘en egy falus jÃ¡tÃ©kos.","IdÅ‘zÃ­tett Ã©rkezÃ©s beÃ¡llÃ­tva:"];

cataText = ["VÃ¡lassz cÃ©lpontot! =)","VÃ©letlen","FavÃ¡gÃ³","AgyagbÃ¡nya","VasÃ©rcbÃ¡nya","BÃºzafarm","FÅ±rÃ©sz Ã¼zem","AgyagÃ©getÅ‘","VasÃ¶ntÃ¶de","Malom","PÃ©ksÃ©g","RaktÃ¡r","MagtÃ¡r","FegyverkovÃ¡cs","PÃ¡ncÃ©lkovÃ¡cs","GyakorlÃ³tÃ©r","FÅ‘Ã©pÃ¼let","GyÃ¼lekezÅ‘tÃ©r","Piac","KÃ¶vetsÃ©g","KaszÃ¡rnya","IstÃ¡llÃ³","MÅ±hely","AkadÃ©mia","TanÃ¡cshÃ¡za","Rezidencia","Palota","Kereskedelmi kÃ¶zpont","Nagy kaszÃ¡rnya","Nagy istÃ¡llÃ³","HÅ‘sÃ¶k hÃ¡za","Nagy raktÃ¡r","Nagy magtÃ¡r","VilÃ¡gcsoda","Treasury"];
break; 

case "hk":
case "tw": //credit to chihsun for the translation.
text = ["å…µåŠ›èª¿å‹•ä¸­","ç„¡æ•ˆçš„æ”»æ“Šé¡žåž‹!","æœªæŒ‡å®šæ”»æ“Šç›®æ¨™!","æ²’æœ‰è¶³å¤ çš„è»éšŠ! (è»éšŠ#","æ²’æœ‰è¨­å®šæ”»æ“Šè»éšŠ","æ­£åœ¨æ´¾é£è»éšŠ","éŒ¯èª¤çš„æ”»æ“Šç›®æ¨™","æ²’æœ‰åµå¯Ÿè»ç¨®","å®Œæˆæ´¾å…µ","æ”»æ“Šè¨­å®š","æ–°å¢žæ”»æ“Š","é‚„åŽŸè¨­å®š","æ”»æ“Šè¨­å®š:","æ”»æ“Šé¡žåž‹:","æ­£å¸¸æ”»æ“Š","å¢žæ´","æ¶å¥ªæ”»æ“Š","åµå¯Ÿè³‡æº/è»éšŠ","åµå¯Ÿé˜²ç¦¦/è»éšŠ","æ”»æ“Šç›®æ¨™","ç«‹å³æ´¾é£è»éšŠ","è»éšŠåˆ°é”æ™‚é–“","åˆ°é”ç›®æ¨™æ–¼:","è¨­å®šæ”»æ“Šåˆ°é”æ™‚é–“","æ”»æ“Šçš„æ³¢æ•¸","ç”¨è±Žè™Ÿåˆ†éš”å¤šæ‘ã€é€—è™Ÿåˆ†éš”åæ¨™ï¼Œå¦‚ 0,0|1,1","éŒ¯èª¤:","ç„¡æ³•å–å¾—ç›®æ¨™æ‘èŽŠçš„è³‡è¨Š","è»éšŠåˆ°é”æ™‚é–“:"];

cataText = ["è¨­å®šè»Šæ”»ç›®æ¨™","éš¨æ©Ÿ","ä¼æœ¨å ´","æ³¥å‘","éµç¤¦å ´","è¾²å ´","é‹¸æœ¨å» ","ç£šå» ","é‹¼éµé‘„é€ å» ","éºµç²‰å» ","éºµåŒ…åº—","å€‰åº«","ç©€å€‰","éµåŒ ","ç›”ç”²å» ","ç«¶æŠ€å ´","æ‘èŽŠå¤§æ¨“","é›†çµé»ž","å¸‚å ´","å¤§ä½¿é¤¨","å…µç‡Ÿ","é¦¬å»„","å·¥å ´","ç ”ç©¶é™¢","æ‘æœƒå ‚","è¡Œå®®","çš‡å®®","äº¤æ˜“æ‰€","å¤§å…µç‡Ÿ","å¤§é¦¬å»„","è‹±é›„å®…","å¤§å€‰åº«","å¤§ç©€å€‰","ä¸–ç•Œå¥‡è¹Ÿ"];
break;

case "no":
text = ["Whooping some ass =)","Ugyldig angreps type!","Ingen koordinater!","Ikke nok tropper! (Enhet #","Ingen tropper valgt","Starter","Sannsynligvis ugyldige koordinater","Ingen spion enheter","Ferdig","AngrepsbÃ¸lge oppsett:","Ny angrepsbÃ¸lge","Nullstill","Angreps oppsett:","Angreps type:","Normal","Forsterkninger","Plyndringstokt","Spioner Res/Tropper","Spioner Forsvar/Tropper","Koordinater","Whoop some ass! =)","Ankomst tid","Ankommer:","Sett beregned ankomst tid","Antall repetisjoner av den angrepsbÃ¸lgen","Skill med '|' f.eks: 0,0|1,1","Feil:","Klarte ikke Ã¥ finne aktiv landsby. Antar konto med en landsby","Beregnet ankomst satt til:"];

cataText = ["Velg et mÃ¥l =) ","Tilfeldig","TÃ¸mrer","Leirgrop","Jernmine","KornÃ¥ker","Sagbruk","Mursteinsopplag","Smelteverk","MÃ¸lle","Bakeri","Varehus","Silo","VÃ¥pensmed","Rustningssmed","TurneringsomrÃ¥de","Hovedbygning","MÃ¸teplass","Markedsplass","Ambassade","Kaserne","Stall","Verksted","Akademi","RÃ¥dhus","Residens","Palass","Handelskontor","Stor kaserne","Stor stall","Heltens villa","Stort varehus","Stor silo","Verdens underverk","Skattekammer"];

break;
case "us":
case "com":
default:

text = ["Whooping some ass =)","Invalid attack type!","No cords!","not enough troops! (Troop #","No troop input","Starting","Probably bad cords","No scout units","Done","Wave setup:","Add new wave","Reset","Attack setup:","Attack type:","Normal","Reinforcement","Raid","Scout Res/Troops","Scout Def/Troops","Cords","Whoop some ass! =)","Arrival time","Arrive at:","Set timed arrival","Number of attacks of that specific wave","with '|' ex: 0,0|1,1","ERROR:","Unable to get active village. Assuming one village account","Timed arrival set at:"];

cataText = ["Select a target =)","Random","Woodcutter","Clay Pit","Iron Mine","Wheat Field","Sawmill","Brickworks","Iron Foundry","Flour Mill","Bakery","Warehouse","Granary","Blacksmith","Armory","Tournament Square","Main Building","Rally Point","Marketplace","Embassy","Barracks","Stable","Siege Workshop","Academy","Town Hall","Residence","Palace","Trade Office","Great Barracks","Great Stable","Hero\'s Mansion","Great Warehouse","Great Granary","Wonder of the World","Treasury"];
break;

}



//start variabler 
var DID = getActiveDid();
var timedAttacktimer = false;
cordN = 1;
var nthWave = 1;
firstRun = true;
wavesSent = 0;
nThisWave = 0;
numberattacks = 0;
var totalattacks = 0;
  var troops = new Array();
  var totTroops = new Array();
  var cord;
  var Race = getRace();
  var referenceTime;


function reset() 
{
abort();
nthWave = 1;

waveInterfaceElement.innerHTML = table;
addNewWave();

var newWaveButton = document.getElementById('newWaveButton');
newWaveButton.addEventListener("click", addNewWave, true);

var resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", reset, true);

}

/////////////////////////////////////////////////
/////////////////Angrep//////////////////////////
/////////////////////////////////////////////////

function attack(WavesSent)
{
if (firstRun)
{
  myimbabutton.innerHTML = text[0];
  cordN = 1;
  numberOfWaves = nthWave -1;
  wavesSent = 0;
  c = document.getElementById('typeAttack').value;
  cords = document.getElementById('cords').value;
  cord = cords.split(targetSplit);
      spy = false;
      if (c>4)
      {
      spy = c-4;
      c=3;
      }
  if (c>6 || c<2)
  {
  errorMsg(text[1]);
  abort()
  return;
  }
  if (!cords)
  {
  errorMsg(text[2])
  abort()
  return;
  }



  for (var num = 0;num<=11;num++) 
  {

  if (num <=10)
  {
  troops[num] = new Array;
   if (!num)
   {
   troop = document.getElementsByName('number');
   }else {
   troop = document.getElementsByName('troop_' + num);
   }
   totTroops[num] = 0;
    for (var x = 0; x < troop.length;x++)
    {
    //alert("x:" +x);
    
    if (!num){totalattacks = totalattacks + parseInt(troop[x].value);}
    totTroops[num] = parseInt(totTroops[num]) + (parseInt(troop[x].value)) * (parseInt(troops[0][x]));
    troops[num][x] = troop[x].value
     }
  }else{
   troops[num] = new Array;
   troops[num+1] = new Array;
        for (var x = 0;x< troop.length; x++)
        {
        troops[11][x] = document.getElementById('gm_kata_' +(x+1) ).value;
        troops[12][x] = document.getElementById('gm_kata2_' +(x+1) ).value;
        }
      }
  }

 check = false;
  for(var x=1;x<=10;x++) //Sjekker om man har nok tropper
  {
  tempX = x;
  if (x==10){tempX++;}
  //alert(getTotalUnit('t'+tempX) +'-'+ totTroops[x] + '-' + x);
  if ((totTroops[x] * cord.length)  > getTotalUnit('t'+tempX) ) {errorMsg(text[3] + x+ ")"); abort(); return;}
  if (totTroops[x] > 0) {check = true;}
  }
  if (!check)
  {
  errorMsg(text[4]);
  abort();
  return;
  }

  
  totalattacks = totalattacks * cord.length;
  firstRun = false;
  addCount("<b>" + text[5] +"</b>");
  //alert(totalattacks);
}
//alert("wN:" +numberOfWaves);
//alert("wSent:"+wavesSent);
//alert(troops[1][0]);

if (numberOfWaves > wavesSent)
{
//alert("1");


     var targetCord = cord[cordN-1].split(cordsSplit);
	   var xcord = targetCord[0];
	   var ycord = targetCord[1];
	   var url = document.location.href.split('?')[0] + '?' +DID;
     //alert(url); 
	   var postvar = 'b=1&t1='+ troops[1][wavesSent] +'&t4='+ troops[4][wavesSent] +'&t7='+ troops[7][wavesSent] +'&t9='+ troops[9][wavesSent] +'&t2='+ troops[2][wavesSent] +'&t5='+ troops[5][wavesSent] +'&t8='+ troops[8][wavesSent] + '&t10=0' +'&t11='+ troops[10][wavesSent] +'&t3='+ troops[3][wavesSent] +'&t6='+ troops[6][wavesSent] +'&c='+ c +'&dname=&x='+xcord+'&y='+ycord+'&s1=ok';
	   //alert(postvar);
	   post(url, postvar, xcord, ycord, troops[11][wavesSent], troops[12][wavesSent], spy);
	   nThisWave++
	   if (nThisWave >= troops[0][wavesSent]) {wavesSent++; nThisWave = 0;}
	   setTimeout(function(){attack()},500);
}else{
if (cord.length > cordN )
{
cordN++;
nThisWave = 0;
wavesSent = 0;
setTimeout(function(){attack()},500);
}

}
}

////////////////////////////////////////////////////


function post(url, data, xcord, ycord, kat, kat2, spy) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) 
      {
	pulled = document.createElement('div');
  pulled.innerHTML = responseDetails.responseText; 
	
	idValue = getValue(pulled, 'id');
	aValue = getValue(pulled, 'a');
	cValue = getValue(pulled, 'c');
	kidValue = getValue(pulled, 'kid');
	t1Value = getValue(pulled, 't1');
	t2Value = getValue(pulled, 't2');
	t3Value = getValue(pulled, 't3');
	t4Value = getValue(pulled, 't4');
	t5Value = getValue(pulled, 't5');
	t6Value = getValue(pulled, 't6');
	t7Value = getValue(pulled, 't7');
	t8Value = getValue(pulled, 't8');
	t9Value = getValue(pulled, 't9');
	t10Value = getValue(pulled, 't10');
	t11Value = getValue(pulled, 't11');
	
if (!idValue && !aValue && !cValue && !kidValue)
{

errorMsg("(" + xcord +',' + ycord + ")" +text[6] +"."  );
numberattacks++;
return;
}


	var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1='+t1Value+'&t2='+t2Value+'&t3='+t3Value+'&t4='+t4Value+'&t5='+t5Value+'&t6='+t6Value+'&t7='+t7Value+'&t8='+t8Value+'&t9='+t9Value+'&t10='+t10Value+'&t11='+t11Value;
  if (kat != 0){postData = postData + '&kata='+kat;}
  if (kat2 != 0){postData = postData + '&kata2='+kat2; }
  postData = postData + '&s1=ok&attacks=&cords=';
  
if (spy)
{
  
	if (Race == 2 && t3Value > 0)
	{
    var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1=0&t2=0&t3=' +t3Value +'&t4=0&t5=0&t6=0&t7=0&t8=0&t9=0&t10=0&t11=0&s1=ok&attacks=&cords=&spy=' + spy;
  }
  else if (Race != 2 && t4Value >0)
  {
  var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1=0&t2=0&t3=0&t4='+t4Value+'&t5=0&t6=0&t7=0&t8=0&t9=0&t10=0&t11=0&s1=ok&attacks=&cords=&spy=' + spy;
  }else{
  errorMsg(text[7]);
  return;
  }
}
	
post2(url, postData);
    }
  });
}

function post2(url, data) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
	
	numberattacks++;
	if (numberattacks >= totalattacks)
	  {
	  urlFinished = "http://" + document.domain + "/build.php?id=39";
    addCount(". <a href=" + urlFinished + ">"+text[8]+"</a>");  //legg inn delay her 
      //resetting the start values
      abort()
	 }else{
   addCount(".");
   }    
  
  }
  });
}

/////////////////////////////////////////////////
/////////////////interface///////////////////////
/////////////////////////////////////////////////





targetLogo = "<img src=data:image/gif,GIF89a%0F%00%0F%00%F7%00%00%00%00%00%FF%FF%FF%CC%00%00%CB%00%00%CA%00%00%C9%00%00%C8%00%00%C7%00%00%CC%01%01%CC%03%03%CB%03%03%C9%03%03%CD%05%05%CB%05%05%CC%06%06%CB%06%06%CE%07%07%CC%08%08%CE%09%09%CB%09%09%CE%0A%0A%CD%0B%0B%CF%0D%0D%CC%0D%0D%CF%0E%0E%CD%0E%0E%CF%11%11%CD%11%11%D0%12%12%CF%13%13%D0%15%15%CF%15%15%D1%17%17%D1%18%18%D1%19%19%CF%19%19%D2%1A%1A%D1%1B%1B%D2%1D%1D%D3%1F%1F%D3%20%20%D3%23%23%D2%24%24%D4))%D4%2B%2B%D4%2C%2C%D6%2F%2F%D5%2F%2F%D500%D611%D622%D744%D777%D888%D788%D8%3B%3B%D8%3D%3D%D9%3F%3F%D9CC%DAEE%DAGG%DBII%DBKK%DCLL%DBMM%DBNN%DDTT%DDWW%DEXX%DF%5B%5B%DF%5C%5C%DF%5E%5E%E0__%E0aa%DF%60%60%E0bb%E1gg%E0hh%E2kk%E1kk%E2ll%E3oo%E3pp%E3rr%E3tt%E4ww%E4xx%E4zz%E5%7C%7C%E5~~%E6%7F%7F%E6%80%80%E6%82%82%E7%84%84%E8%86%86%E7%87%87%E8%88%88%E7%88%88%E8%8A%8A%E7%8B%8B%E9%8F%8F%E9%90%90%EA%93%93%E9%92%92%EA%95%95%EB%97%97%EB%99%99%EB%9A%9A%EC%9B%9B%EC%9D%9D%EC%9E%9E%EB%9D%9D%EB%9E%9E%EC%A0%A0%EC%A3%A3%ED%A4%A4%ED%A9%A9%EF%AB%AB%EF%AD%AD%EF%AF%AF%EF%B1%B1%F0%B3%B3%EF%B2%B2%F0%B4%B4%F1%B9%B9%F1%BB%BB%F2%BD%BD%F1%BD%BD%F2%BF%BF%F2%C0%C0%F4%C4%C4%F3%C3%C3%F3%C5%C5%F4%C7%C7%F4%C8%C8%F5%CA%CA%F5%CD%CD%F5%CF%CF%F6%D1%D1%F6%D2%D2%F7%D5%D5%F8%D8%D8%F7%D7%D7%F7%D8%D8%F8%DA%DA%F8%DC%DC%F8%DE%DE%FA%E1%E1%F9%E1%E1%FA%E3%E3%F9%E2%E2%FA%E4%E4%FA%E5%E5%FA%E7%E7%FB%EA%EA%FA%E9%E9%FC%ED%ED%FB%EC%EC%FC%EF%EF%FB%EE%EE%FC%F0%F0%FD%F3%F3%FD%F4%F4%FE%F6%F6%FE%F8%F8%FD%F7%F7%FE%F9%F9%FE%FB%FB%FF%FD%FD%FF%FE%FE%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%0F%00%0F%00%00%08%81%00%03%08%0C%80%A8%09%0C%185%9A%20%1A%C8%10%86%80%87%10%05%C0%60%18%00%E2%81%845%0E%40%1C%E8P%40%13%8AM%1E%8E%20%F8%F0%23%C5%00!%05%B0%C9%F2P%20%22%87%23%16%06%18%E1%11%C6E%81%1D%5B%06p%F2%D0%A1%C9%88%02%04%A2yxB%22N%01%1A%83%06%F8%F1%90%A5%D2%00%40%24%CA%2C%89H%E3%C4%93!%0F%E4%09%D0%11%08H%91%03%91B%04RT%ECW%A0FObBS%03!%1A%99%02%03%02%00%3B>"


var startIcon = (getRace()*10)+1;

var table = "<fieldset><legend>"+text[9]+"</legend><table id=\"myTable\"><tr></td>#*</td>";

for (var count = startIcon;count<startIcon+9;count++) //icons 
{
    table += "<td><img src=\"/img/un/u/" + count + ".gif\"></td>";
     
}
table += "<td><img src=\"/img/un/u/hero.gif\"></td>";
table += "<td>" + targetLogo + "</td><td>" + targetLogo + "</td>";
table += "</tr></table><button id=newWaveButton>"+text[10]+"</button><button id=\"resetButton\">"+text[11]+"</button></fieldset>";




var interfaceStart = document.evaluate(  
"//p[input[@name='s1'][@value='ok']]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    
null);
var  waveInterfaceElement = document.createElement("div");
waveInterfaceElement.innerHTML = table;
interfaceStart = interfaceStart.snapshotItem(0);

thisDiv = document.getElementById('lmid1');
thisDiv.appendChild(waveInterfaceElement);
//interfaceStart.appendChild(waveInterfaceElement);
addNewWave();

//attack interface 





var  attackInterface = document.createElement("div");
attackInterface.innerHTML = '<fieldset><legend>'+text[12]+'</legend><table><tr><td><div id=start>' +
  '<table><tr><td>'+text[13]+'</td></tr>'+
  '<tr><td>' +
 	'<select name=\"typeAttack\" id=\"typeAttack\">' +
 	'<option value=\"3\">'+text[14]+'</option>' +
 	  '<option value=\"2\">'+text[15]+'</option>' +
    	'<option value=\"4\">'+text[16]+'</option>' +
    	 	'<option value=\"5\">'+text[17]+'</option>' +
   	      '<option value=\"6\">'+text[18]+'</option>' +
 	'</select>' +
  '</td></tr><tr><td>'+text[19]+'**</td>'+	
  '</tr><tr><td>'+
	'<input type=\"text\" value="' +getCords() +  '" name=\"cords\" id=\"cords\" />' +
	'</td><td>'+
	'</td></tr><tr><td>'+
  	'<button id=\"myimbabutton\" >'+text[20]+'</button>' +
  	'</td><td>'+
  	'<button id=\"arrivalTime\">'+text[21]+'</button>'+
  	'</td><td>'+
  	'<div id=\"arrivalTimeDiv\"></div>'+
  	'</td></tr><tr><td>' +
  	+text[22]+
    '</td></tr><tr><td>'+
  	'<input id=\"timedArrivalInput\" value=\"hh:mm:ss"><button id=\"timedArrivalButton">'+text[23]+'</button>'+
	'</td></tr></table><p style="font-size: 75%">* - '+text[24]+'</p><p style="font-size: 75%">** - '+text[25]+'</p>';

thisDiv.appendChild(attackInterface);
//interfaceStart.appendChild(attackInterface);


//angrepsbÃ¸lge interface 
function addNewWave()
{
newRow = document.createElement('tr');
  col = document.createElement('td');
  col.style.width = '1px';
  input ="<input style=\"width: 90%\" size=\"1\" maxlengt=\"6\" type=\"text\" name=\"number\" value=\"1\">";
  col.innerHTML = (input);
  newRow.appendChild(col);
  
for (var i=1;i<=9;i++)
  {
  if (i>6)
  {
    col = document.createElement('td');
    col.style.width = '35px';
  input ="<input style=\"width: 90%\" size=\"2\" maxlengt=\"6\" type=\"text\" name=\"troop_" + i + "\" value=\"0\">";
  col.innerHTML = (input);
  newRow.appendChild(col);
  }else{
  col = document.createElement('td');
  input ="<input size=\"2\" maxlengt=\"6\" type=\"text\" name=\"troop_" + i + "\" value=\"0\">";
  col.innerHTML = (input);
  newRow.appendChild(col);
    }
  }
  
  col = document.createElement('td');
  col.style.width = '1px';
  input ="<input style=\"width: 90%\" size=\"1\" maxlengt=\"6\" type=\"text\" name=\"troop_10\" value=\"0\">";
  col.innerHTML = (input);
  newRow.appendChild(col);
  
  col = document.createElement('td');
  select = '<select id="gm_kata_' + nthWave + '" name="gm_kata_' + nthWave + '"><option value="0">+</option></select>'
  col.innerHTML = (select);
  newRow.appendChild(col);
  
  col = document.createElement('td');
  select = '<select id="gm_kata2_' + nthWave + '" name="gm_kata2_' + nthWave + '"><option value="0">+</option></select>'
  col.innerHTML = (select);
  newRow.appendChild(col);

 var myTable = document.getElementById('myTable');
 myTable.tBodies[0].appendChild(newRow);
 
 id = 'gm_kata_' + nthWave;
eval ('sel_' + nthWave + '= document.getElementById(id)');
eval ('sel_' + nthWave + '.addEventListener("click",function (){ popup(sel_' + nthWave + '.id)}, true)');

 id = 'gm_kata2_' + nthWave;
eval ('sel2_' + nthWave + '= document.getElementById(id)');
eval ('sel2_' + nthWave + '.addEventListener("click",function (){ popup(sel2_' + nthWave + '.id)}, true)');





nthWave++;
}

function popup(id)
{
select =  	'<form><select id=\"popup_' + id + '\" size=\"\" \">'+
	'<option value=\"0\">'+cataText[0]+'</option><option value=\"99\">'+cataText[1]+'</option><option value=\"1\">'+cataText[2]+'</option><option value=\"2\">'+cataText[3]+'</option><option value=\"3\">'+cataText[4]+'</option><option value=\"4\">'+cataText[5]+'</option><option value=\"5\">'+cataText[6]+'</option><option value=\"6\">'+cataText[7]+'</option><option value=\"7\">'+cataText[8]+'</option><option value=\"8\">'+cataText[9]+'</option><option value=\"9\">'+cataText[10]+'</option><option value=\"10\">'+cataText[11]+'</option><option value=\"11\">'+cataText[12]+'</option><option value=\"12\">'+cataText[13]+'</option><option value=\"13\">'+cataText[14]+'</option><option value=\"14\">'+cataText[15]+'</option><option value=\"15\">'+cataText[16]+'</option><option value=\"16\">'+cataText[17]+'</option><option value=\"17\">'+cataText[18]+'</option><option value=\"18\">'+cataText[19]+'</option><option value=\"19\">'+cataText[20]+'</option><option value=\"20\">'+cataText[21]+'</option><option value=\"21\">'+cataText[22]+'</option><option value=\"22\">'+cataText[23]+'</option><option value=\"24\">'+cataText[24]+'</option><option value=\"25\">'+cataText[25]+'</option><option value=\"26\">'+cataText[26]+'</option><option value=\"28\">'+cataText[27]+'</option></option><option value=\"29\">'+cataText[28]+'</option><option value=\"30\">'+cataText[29]+'</option><option value=\"37\">'+cataText[30]+'</option><option value="38">'+cataText[31]+'</option><option value="39">'+cataText[32]+'</option><option value="40">'+cataText[33]+'</option><option value="27">'+cataText[34]+'</option>'+
	'</select></form>';


eval("window" + id + " = window.open('', '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=200,height=20');");
if (!eval("window" + id).document.getElementById('thatDiv'))
{
div = "<div id=\"thatDiv\">Loading..</div>";

eval("window" + id).document.write(div);
}
thatDiv = eval("window" + id).document.getElementById('thatDiv');
thatDiv.innerHTML = select;

if (window.focus) {eval("window" + id).focus()}

element = eval("window" + id).document.forms[0].elements[0];
element.addEventListener("change", function() { test(id) }, true);

function test(id){
field = document.getElementById(id);
field.innerHTML = "<option value=\"" + element.options[element.selectedIndex].value + "\">" + element.options[element.selectedIndex].value + "</option>";
eval ("window" +id + ".close()");
}

}

/////////////////////////////////////////////////
/////////////////Events//////////////////////////
/////////////////////////////////////////////////

var newWaveButton = document.getElementById('newWaveButton');
newWaveButton.addEventListener("click", addNewWave, true);

var resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", reset, true);

var myimbabutton = document.getElementById('myimbabutton');
myimbabutton.addEventListener("click", attack, true);

var arrivalButton = document.getElementById('arrivalTime');
arrivalButton.addEventListener("click", getArrivalTime, true);

var timedArrivalButton = document.getElementById('timedArrivalButton');
timedArrivalButton.addEventListener("click", setArrivalTimer, true);

document.addEventListener("keydown",hotKeys,true); 

/////////////////////////////////////////////////
/////////////////misc////////////////////////////
/////////////////////////////////////////////////

function getRace()
{
var ex = "//img[contains(@src,'1.gif')][@class='unit']";
	result = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (result.snapshotLength)
  {
  src = result.snapshotItem(0).src;
  if (src.match("/21.gif")){
  return 2; //gaul 
  }else if(src.match("/11.gif")){
    return 1; //teutons 
      }else if(src.match("/1.gif")){
        return 0; //Romans
          }
  } 
}

function getTotalUnit(t)
{
var ex = "//a[contains(@OnClick,'" + t + "')]";
	result = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (result.snapshotLength)
{
thisResult = result.snapshotItem(0).innerHTML;
return ((thisResult.substring(1,thisResult.length-1)))
}else{
      return 0;
      }

}
function errorMsg (msg)
{
errDiv = document.getElementById('err');
errDiv.innerHTML = errDiv.innerHTML +  "<br><b>"+text[26]+"</b>" + msg;
}
function getActiveDid()
{

var ex = "//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

if (tag.snapshotLength)
{
		temp = tag.snapshotItem(0).href.split("?")[1].split('&');
	return temp[0];
	}else{
	errorMsg(text[27]);
  return "";
    }
}

function getValue(doc, name)
{
var ex = ".//input[@type='hidden'][@name='" + name + "']";
tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (tag.snapshotLength)
  {
	aTag = tag.snapshotItem(0);
	return(aTag.value);
	}else{
  return 0;
  }

}
function addCount(msg)
{
countDiv = document.getElementById('count');
countDiv.innerHTML = countDiv.innerHTML + msg;
}

function getCords()
{
var tempX = document.getElementsByName('x');
var tempY = document.getElementsByName('y');
if (tempX.length)
{
  if (tempX[0].value.length && tempY[0].value.length)
  {
  return tempX[0].value + "," + tempY[0].value;
  }else{
  return '';
  }
  }
  return;
}
function addInfoDiv()
{
var infoDiv = document.createElement("div");
infoDiv.innerHTML = "<div><div id=\"err\"></div><br><br><div id=\"count\"></div></div>"
thisDiv = document.getElementById('lright1');
if(!thisDiv){
  var tempDiv = document.createElement('div');
  var midDiv = document.getElementById('lmidlc');
  
  tempDiv.setAttribute('id','lright1');
  thisDiv = midDiv.parentNode.appendChild(tempDiv);
}

thisDiv.appendChild(infoDiv);
}
function abort()
{
setTimeout(function(){realAbort()},500);

}

function realAbort ()
{
cordN = 1;
firstRun = true;
wavesSent = 0;
nThisWave = 0;
numberattacks = 0;
totalattacks = 0;
myimbabutton.innerHTML = text[20]
}

function getCheckTroops()
{
  for (var num = 0;num<=11;num++) 
  {

  if (num <=10)
  {
  troops[num] = new Array;
   if (!num)
   {
   troop = document.getElementsByName('number');
   }else {
   troop = document.getElementsByName('troop_' + num);
   }
   totTroops[num] = 0;
    for (var x = 0; x < troop.length;x++)
    {
    //alert("x:" +x);
    
    //if (!num){totalattacks = totalattacks + parseInt(troop[x].value);}
    totTroops[num] = parseInt(totTroops[num]) + (parseInt(troop[x].value)) * (parseInt(troops[0][x]));
    troops[num][x] = troop[x].value
     }
  }else{
   troops[num] = new Array;
   troops[num+1] = new Array;
        for (var x = 0;x< troop.length; x++)
        {
        troops[11][x] = document.getElementById('gm_kata_' +(x+1) ).value;
        troops[12][x] = document.getElementById('gm_kata2_' +(x+1) ).value;
        }
      }
  }
  
   check = false;
  for(var x=1;x<=10;x++) //Sjekker om man har nok tropper
  {
  tempX = x;
  if (x==10){tempX++;}
  if (totTroops[x] > getTotalUnit('t'+tempX) ) {errorMsg(text[3] + x+ ")"); abort(); return;}
  if (totTroops[x] > 0) {check = true;}
  }
  if (!check)
  {
  errorMsg(text[4]);
  abort();
  return;
  }
}

function getArrivalTime(tempWaveNumber, Xcord, Ycord)
{
tempWaveNumber = 0;
getCheckTroops()
  
    cords = document.getElementById('cords').value;
  cord = cords.split(targetSplit);
       var tempTargetCord = cord[0].split(cordsSplit);
	   var Xcord = tempTargetCord[0];
	   var Ycord = tempTargetCord[1];


var tempUrl = document.location.href.split('?')[0] + '?' +DID;
var tempPostvar = 'b=1&t1=' + troops[1][tempWaveNumber] + '&t4=' + troops[4][tempWaveNumber] + '&t7='+ troops[7][tempWaveNumber] +'&t9='+ troops[9][tempWaveNumber] +'&t2='+ troops[2][tempWaveNumber] +'&t5='+ troops[5][tempWaveNumber] +'&t8='+ troops[8][tempWaveNumber] +'&t10='+ troops[11][tempWaveNumber] +'&t3='+ troops[3][tempWaveNumber] +'&t6='+ troops[6][tempWaveNumber] +'&c='+ 3 +'&dname=&x='+Xcord+'&y='+Ycord+'&s1=ok';



  GM_xmlhttpRequest({
    method: "POST",
    url: tempUrl,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(tempPostvar),
    onload: function(responseDetails) 
      {
	pulled = document.createElement('div');
  pulled.innerHTML = responseDetails.responseText;

  var ex = ".//span[@id='tp2']";
tag = document.evaluate( 
  	ex,
    	pulled,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (tag.snapshotLength)
  {
	document.getElementById('arrivalTimeDiv').innerHTML = text[21] +':' + tag.snapshotItem(0).innerHTML;
	referenceTime = new Date().getTime();
	

	clearInterval(timerIntervalId);

	timerIntervalId = setInterval(function(){arrivalCounter()},1000);
  arrivalCounter();
	}else{
  alert(text[26]);
  }
    }
  });
}

function arrivalCounter()
{
diffTime = Math.round((new Date().getTime() - referenceTime)/1000);
if (diffTime >= 1)
{
 count = document.getElementById('arrivalTimeDiv').innerHTML.split(':');
 hours = count[1];
 minutes = count[2];
 seconds = count[3];
seconds = parseInt(seconds,10) + parseInt(diffTime,10);
 if (seconds >= 60)
 {
 minutes++;
 seconds = seconds - 60;
 }
 if (minutes >= 60)
 {
 hours++
 minutes = minutes - 60;
 }
 if (hours >= 24)
 {
 hours = 0;
 }

 seconds = seconds.toString(); 
 minutes = minutes.toString(); 
 hours = hours.toString(); 
 seconds = seconds.replace(/\b(\d)\b/g, '0$1');
 minutes = minutes.replace(/\b(\d)\b/g, '0$1');
 hours = hours.replace(/\b(\d)\b/g, '0$1');
  
if (timedAttacktimer)
{

  tTimer = timedAttacktimer.split(':');
  if (tTimer.length == 3)
    {
    tSeconds = tTimer[2]
    tMinutes = tTimer[1]
    tHours = tTimer[0]

    //errorMsg(tSeconds + ":" + tMinutes + ':' + tHours);

    if (tHours == hours && tMinutes == minutes && tSeconds == seconds)
      {
      myimbabutton.click();
      timedAttacktimer = false;
    }
    if(diffTime ==2)
    {
      if ((tHours == hours) && (tMinutes == minutes) && ((tSeconds + 1) == seconds))
      {
      myimbabutton.click();
      timedAttacktimer = false;
      } 
    }
    if(diffTime ==3)
    {
      if ((tHours == hours) && (tMinutes == minutes) && ((tSeconds + 2) == seconds))
      {
      myimbabutton.click();
      timedAttacktimer = false;
      } 
    }
  }
}
document.getElementById('arrivalTimeDiv').innerHTML = text[21] +':' + hours + ":" + minutes + ":" + seconds;  
referenceTime = new Date().getTime();
}
}

function setArrivalTimer()
{
getArrivalTime();
timedAttacktimer = document.getElementById('timedArrivalInput').value;
addCount(text[28] + timedAttacktimer);
 
}


function hotKeys (event) {

if((event.altKey==1)&&((event.shiftKey==1)&&(event.ctrlKey==0)))  //save setup
        {
            if(event.keyCode<=57 && event.keyCode>=48 )           //If 0-9 key was pressed
            {
            
                 saveSetup(event.keyCode)
            }
        }
if((event.altKey==0)&&((event.shiftKey==1)&&(event.ctrlKey==0)))  //load setup
        {
            if(event.keyCode<=57 && event.keyCode>=48 )                   //If 0-9 key was pressed
            {
            
                loadSetup(event.keyCode)
            }
        }
}

      function detectLanguage() {
      	if(sLang != "") {return;}
      	var re = null; re = new RegExp("^http://[^/]*\.([a-zA-Z]{2,3})\/.*$", "i");
      	var lang = window.location.href.match(re);
      	if(!lang) {
      		return;
      	} else {
      		sLang = lang.pop();
      	}
      }
      
function saveSetup(key)
{
setupNum = key-48;

  for (var num = 0;num<=11;num++) 
  {

  if (num <=10)
  {
  troops[num] = new Array;
   if (!num)
   {
   troop = document.getElementsByName('number');
   }else {
   troop = document.getElementsByName('troop_' + num);
   }
   totTroops[num] = 0;
    for (var x = 0; x < troop.length;x++)
    {
    //alert("x:" +x);
    
    if (!num){totalattacks = totalattacks + parseInt(troop[x].value);}
    totTroops[num] = parseInt(totTroops[num]) + (parseInt(troop[x].value)) * (parseInt(troops[0][x]));
    troops[num][x] = troop[x].value
     }
  }else{
   troops[num] = new Array;
   troops[num+1] = new Array;
        for (var x = 0;x< troop.length; x++)
        {
        troops[11][x] = document.getElementById('gm_kata_' +(x+1) ).value;
        troops[12][x] = document.getElementById('gm_kata2_' +(x+1) ).value;
        }
      }
  }
setupName = 'setup-' + setupNum;
GM_setValue(setupName, troops.join());
alert("saved");
}

function loadSetup(key)
{
setupNum = key-48;
setupName = 'setup-' + setupNum;
data = GM_getValue(setupName, false);
if (data)
{

num = (data.split(',').length)/13
}
reset();
for(x=1;x<num;x++)
{
addNewWave();
}
data = data.split(',');
i = 0;
for(x=0;x<num;x++)
{
document.getElementsByName('number')[x].value = data[i];
i++
}

for(y=1;y<11;y++)
{
  for(x=0;x<num;x++)
  {
  document.getElementsByName('troop_' + y)[x].value = data[i];
  i++;
  }
}
for(x=0;x<num;x++)
{
if(data[i] != 0){
document.getElementById('gm_kata_' +(x+1)).innerHTML = '<option value="'+data[i]+'" >'+data[i]+'</option>';
}
i++
if(data[i] != 0){
document.getElementById('gm_kata2_' +(x+1)).innerHTML = '<option value="'+data[i]+'" >'+data[i]+'</option>';
}
i++
}






}
