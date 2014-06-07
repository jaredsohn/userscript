// ==UserScript== 
// @name          Spanish lessons
// @namespace     http://rosiu.com/userscripts
// @description	  Learn it
// @include       http://*.google.*
// ==/UserScript==

  var words = [{
		"spanish":"?Cuantos a?os tienes?",
		"polish":"Ile masz lat?"
	},
	{
		"spanish":"?Qué haces?",
		"polish":"Co robisz?"
	},
	{
		"spanish":"desde luego",
		"polish":"oczywiście"
	},
	{
		"spanish":"muchas gracias",
		"polish":"bardzo dziękuję"
	},
	{
		"spanish":"no hay de qué",
		"polish":"nie ma za co"
	},
	{
		"spanish":"?por qué?",
		"polish":"dlaczego?"
	},
	{
		"spanish":"por ejemplo",
		"polish":"na przykład"
	},
	{
		"spanish":"yo también",
		"polish":"ja też"
	},
	{
		"spanish":"?allá voy!",
		"polish":"już idę"
	},
	{
		"spanish":"?ven acá!",
		"polish":"chodź tu!"
	},
	{
		"spanish":"como de costumbre",
		"polish":"jak zwykle"
	},
	{
		"spanish":"estar casado/a",
		"polish":"być żonatym"
	},
	{
		"spanish":"relacionar algo con algo",
		"polish":"połączyć coś z czymś"
	},
	{
		"spanish":"hermanos",
		"polish":"rodzeństwo"
	},
	{
		"spanish":"estar soltero/a",
		"polish":"być kawalerem/ panną"
	},
	{
		"spanish":"hablar de",
		"polish":"mówić o"
	},
	{
		"spanish":"hablar",
		"polish":"mówić",
		"undefined":"znać (język)"
	},
	{
		"spanish":"leer",
		"polish":"czytać"
	},
	{
		"spanish":"escuchar",
		"polish":"słuchać"
	},
	{
		"spanish":"familia",
		"polish":"rodzina"
	},
	{
		"spanish":"llamarse",
		"polish":"nazywać się"
	},
	{
		"spanish":"a?os",
		"polish":"lata"
	},
	{
		"spanish":"a?o",
		"polish":"rok"
	},
	{
		"spanish":"con",
		"polish":"z"
	},
	{
		"spanish":"padres",
		"polish":"rodzice"
	},
	{
		"spanish":"abuela",
		"polish":"babcia"
	},
	{
		"spanish":"más peque?o/a",
		"polish":"młodszy/a"
	},
	{
		"spanish":"el nombre",
		"polish":"imię",
		"undefined":"nazwa"
	},
	{
		"spanish":"escribir",
		"polish":"pisać"
	},
	{
		"spanish":"cada",
		"polish":"każdy (z osobna)"
	},
	{
		"spanish":"siguiente",
		"polish":"następny"
	},
	{
		"spanish":"palabra",
		"polish":"słowo",
		"undefined":"wyraz"
	},
	{
		"spanish":"ser hija de Jorge y Rosa",
		"polish":"być córką Jorge i Rosy"
	},
	{
		"spanish":"o",
		"polish":"albo",
		"undefined":"lub"
	},
	{
		"spanish":"la pregunta",
		"polish":"pytanie"
	},
	{
		"spanish":"hacer (niereg.)",
		"polish":"robić",
		"undefined":"czynić"
	},
	{
		"spanish":"varios/ varias",
		"polish":"1. różnie",
		"undefined":"2. kilkakrotnie"
	},
	{
		"spanish":"compa?eros",
		"polish":"koledzy"
	},
	{
		"spanish":"luego",
		"polish":"zaraz",
		"undefined":"później"
	},
	{
		"spanish":"ficha",
		"polish":"fiszka",
		"undefined":"kartka"
	},
	{
		"spanish":"novio/a",
		"polish":"narzeczony/a"
	},
	{
		"spanish":"?cuanto…?",
		"polish":"ile",
		"undefined":"jak...?"
	},
	{
		"spanish":"alguno/a",
		"polish":"jakiś/jakaś",
		"undefined":"ktoś"
	},
	{
		"spanish":"Algunos/as",
		"polish":"niektórzy/niektóre"
	},
	{
		"spanish":"sobre",
		"polish":"koperta"
	},
	{
		"spanish":"le mapa",
		"polish":"mapa"
	},
	{
		"spanish":"le autobús",
		"polish":"autobus"
	},
	{
		"spanish":"mirar",
		"polish":"spoglądać",
		"undefined":"uważać (na coś)"
	},
	{
		"spanish":"mirar algo",
		"polish":"patrzeć na coś"
	},
	{
		"spanish":"mirar la tele",
		"polish":"oglądać telewizję"
	},
	{
		"spanish":"imagen",
		"polish":"wizerunek",
		"undefined":"odbicie (w lustrze)"
	},
	{
		"spanish":"se?alar",
		"polish":"zaznaczyć",
		"undefined":"wskazywać"
	},
	{
		"spanish":"se?al",
		"polish":"znak",
		"undefined":"sygnał"
	},
	{
		"spanish":"verdadero/a",
		"polish":"prawdziwy/a"
	},
	{
		"spanish":"falso/a",
		"polish":"fałszywy/a"
	},
	{
		"spanish":"la televisión",
		"polish":"telewizja"
	},
	{
		"spanish":"bolígrafo",
		"polish":"długopis"
	},
	{
		"spanish":"las paraguas",
		"polish":"parasolka"
	},
	{
		"spanish":"la zapatilla",
		"polish":"pantofel"
	},
	{
		"spanish":"el ordenador",
		"polish":"komputer"
	},
	{
		"spanish":"el cuadro",
		"polish":"obraz"
	},
	{
		"spanish":"el sofá",
		"polish":"sofa"
	},
	{
		"spanish":"la mesita",
		"polish":"stoliczek"
	},
	{
		"spanish":"debajo de",
		"polish":"nad"
	},
	{
		"spanish":"lugar",
		"polish":"miejsce"
	},
	{
		"spanish":"encima de",
		"polish":"na"
	},
	{
		"spanish":"delante de",
		"polish":"przed"
	},
	{
		"spanish":"detrás de",
		"polish":"za"
	},
	{
		"spanish":"al lado de",
		"polish":"obok"
	},
	{
		"spanish":"en",
		"polish":"w"
	},
	{
		"spanish":"entre",
		"polish":"pomiędzy"
	},
	{
		"spanish":"la habitación",
		"polish":"pokój"
	},
	{
		"spanish":"la planta",
		"polish":"roślina",
		"undefined":"piętro"
	},
	{
		"spanish":"la cartera",
		"polish":"portfel",
		"undefined":"teczka"
	},
	{
		"spanish":"libro",
		"polish":"książka"
	},
	{
		"spanish":"la librería",
		"polish":"półka z książkami"
	},
	{
		"spanish":"gato/a",
		"polish":"kot/ kotka"
	},
	{
		"spanish":"?cuál es tu número de teléfono?",
		"polish":"Jaki jest twój nr telefonu?"
	},
	{
		"spanish":"chaqueta",
		"polish":"marynarka"
	},
	{
		"spanish":"casa",
		"polish":"dom"
	},
	{
		"spanish":"cerca",
		"polish":"blisko"
	},
	{
		"spanish":"aquí",
		"polish":"tu",
		"undefined":"tutaj"
	},
	{
		"spanish":"primo/a",
		"polish":"kuzyn/ kuzynka"
	},
	{
		"spanish":"la conversación",
		"polish":"rozmowa"
	},
	{
		"spanish":"le coche",
		"polish":"samochód"
	},
	{
		"spanish":"la silla",
		"polish":"krzesło"
	},
	{
		"spanish":"diccionario",
		"polish":"słownik"
	},
	{
		"spanish":"mesa",
		"polish":"ławka"
	},
	{
		"spanish":"la ventana",
		"polish":"okno"
	},
	{
		"spanish":"la compa?era",
		"polish":"koleżanka"
	},
	{
		"spanish":"le lápiz",
		"polish":"ołówek"
	},
	{
		"spanish":"le cuaderno",
		"polish":"zeszyt"
	},
	{
		"spanish":"las gafas",
		"polish":"okulary"
	},
	{
		"spanish":"?dónde...?",
		"polish":"gdzie?"
	},
	{
		"spanish":"?de dónde...?",
		"polish":"skąd...?"
	},
	{
		"spanish":"correspondiente",
		"polish":"odpowiedni"
	},
	{
		"spanish":"la letra",
		"polish":"litera"
	},
	{
		"spanish":"el reloj",
		"polish":"zegar"
	},
	{
		"spanish":"el teléfono",
		"polish":"telefon"
	},
	{
		"spanish":"pues",
		"polish":"zatem",
		"undefined":"więc"
	},
	{
		"spanish":"guapo/ guapa",
		"polish":"przystojny/ ładna"
	},
	{
		"spanish":"de la derecha",
		"polish":"po prawej"
	},
	{
		"spanish":"?Qué hora es?",
		"polish":"Która godzina?"
	},
	{
		"spanish":"decir",
		"polish":"mówić"
	},
	{
		"spanish":"punto",
		"polish":"punkt"
	},
	{
		"spanish":"cuarto",
		"polish":"kwartał"
	},
	{
		"spanish":"medio/a",
		"polish":"pół"
	},
	{
		"spanish":"media hora",
		"polish":"pół godziny"
	},
	{
		"spanish":"dibujar",
		"polish":"rysować"
	},
	{
		"spanish":"pareja",
		"polish":"para"
	},
	{
		"spanish":"?perdone!",
		"polish":"przepraszam (panią",
		"undefined":"pana)"
	},
	{
		"spanish":"?perdona!",
		"polish":"przepraszam (cię)"
	},
	{
		"spanish":"el texto",
		"polish":"tekst"
	},
	{
		"spanish":"igual",
		"polish":"równy",
		"undefined":"taki sam"
	},
	{
		"spanish":"diferente",
		"polish":"inny"
	},
	{
		"spanish":"ser diferente a/de",
		"polish":"różnić się od"
	},
	{
		"spanish":"el horario",
		"polish":"rozkład"
	},
	{
		"spanish":"Noruega",
		"polish":"Norwegia"
	},
	{
		"spanish":"la gente",
		"polish":"ludzie"
	},
	{
		"spanish":"comer",
		"polish":"jeść"
	},
	{
		"spanish":"la tarde",
		"polish":"popołudnie"
	},
	{
		"spanish":"el horario de clase",
		"polish":"plan lekcji"
	},
	{
		"spanish":"cenar",
		"polish":"jeść kolację"
	},
	{
		"spanish":"México",
		"polish":"Meksyk"
	},
	{
		"spanish":"abrir (niereg.)",
		"polish":"otwierać"
	},
	{
		"spanish":"por",
		"polish":"dla",
		"undefined":"przez"
	},
	{
		"spanish":"vía",
		"polish":"droga"
	},
	{
		"spanish":"viernes",
		"polish":"piątek"
	},
	{
		"spanish":"tienda/ tiendas",
		"polish":"sklep/y"
	},
	{
		"spanish":"empezar",
		"polish":"zaczynać"
	},
	{
		"spanish":"cerrar",
		"polish":"zamykać"
	},
	{
		"spanish":"ocurrir",
		"polish":"zdarzyć się",
		"undefined":"dziać się"
	},
	{
		"spanish":"afirmación",
		"polish":"twierdzenie/ potwierdzenie"
	},
	{
		"spanish":"anterior",
		"polish":"uprzedni",
		"undefined":"poprzedni"
	},
	{
		"spanish":"también",
		"polish":"również",
		"undefined":"także"
	},
	{
		"spanish":"pero",
		"polish":"ale"
	},
	{
		"spanish":"segundo",
		"polish":"sekunda"
	},
	{
		"spanish":"le día",
		"polish":"dzień"
	},
	{
		"spanish":"la semana",
		"polish":"tydzień"
	},
	{
		"spanish":"mes",
		"polish":"miesiąc"
	},
	{
		"spanish":"le minuto",
		"polish":"minuta"
	},
	{
		"spanish":"la hora",
		"polish":"godzina"
	},
	{
		"spanish":"edad",
		"polish":"wiek"
	},
	{
		"spanish":"ni?o/a",
		"polish":"dziewczynka/ chłopiec"
	},
	{
		"spanish":"ni?os",
		"polish":"dzieci"
	},
	{
		"spanish":"precio",
		"polish":"cena"
	},
	{
		"spanish":"las naranjas",
		"polish":"pomarańcze"
	},
	{
		"spanish":"paquete",
		"polish":"paczka"
	},
	{
		"spanish":"a?o de nacimiento",
		"polish":"rok urodzenia"
	},
	{
		"spanish":"distancia",
		"polish":"odległość"
	},
	{
		"spanish":"la cerveza",
		"polish":"piwo"
	},
	{
		"spanish":"música",
		"polish":"muzyka"
	},
	{
		"spanish":"otro/a",
		"polish":"jeszcze jedno/a"
	},
	{
		"spanish":"otra vez",
		"polish":"jeszcze raz",
		"undefined":"znowu"
	},
	{
		"spanish":"gramática",
		"polish":"gramatyka"
	},
	{
		"spanish":"médico/a",
		"polish":"lekarz/ lekarka"
	},
	{
		"spanish":"alemán",
		"polish":"niemiecki"
	},
	{
		"spanish":"alumno/a",
		"polish":"uczeń/ uczennica"
	},
	{
		"spanish":"examen",
		"polish":"egzamin",
		"undefined":"badanie"
	},
	{
		"spanish":"?A qué hora...?",
		"polish":"O której...?"
	},
	{
		"spanish":"caro/a",
		"polish":"drogi/ droga"
	},
	{
		"spanish":"plural",
		"polish":"l. mnoga"
	},
	{
		"spanish":"simpático/a",
		"polish":"sympatyczny/a"
	},
	{
		"spanish":"interesante",
		"polish":"interesujący"
	},
	{
		"spanish":"la carpeta",
		"polish":"teczka",
		"undefined":"aktówka"
	},
	{
		"spanish":"rojo/a",
		"polish":"czerwony/a"
	},
	{
		"spanish":"salida",
		"polish":"wyjście"
	},
	{
		"spanish":"llegada",
		"polish":"przybycie",
		"undefined":"przyjazd"
	},
	{
		"spanish":"tren",
		"polish":"pociąg"
	},
	{
		"spanish":"la estación",
		"polish":"dworzec"
	},
	{
		"spanish":"andén",
		"polish":"peron"
	},
	{
		"spanish":"destino",
		"polish":"kierunek",
		"undefined":"cel"
	},
	{
		"spanish":"acá",
		"polish":"tutaj"
	},
	{
		"spanish":"allá",
		"polish":"tam"
	},
	{
		"spanish":"cuando",
		"polish":"kiedy",
		"undefined":"gdy"
	},
	{
		"spanish":"solamente",
		"polish":"tylko"
	},
	{
		"spanish":"pariente",
		"polish":"krewny"
	},
	{
		"spanish":"además",
		"polish":"zresztą",
		"undefined":"poza tym"
	},
	{
		"spanish":"además de",
		"polish":"oprócz tego",
		"undefined":"na dodatek"
	},
	{
		"spanish":"la reunión",
		"polish":"zebranie",
		"undefined":"połączenie"
	},
	{
		"spanish":"familiar (la",
		"polish":"le)",
		"undefined":"członek rodziny"
	},
	{
		"spanish":"sonar",
		"polish":"brzmieć",
		"undefined":"dzwonić"
	},
	{
		"spanish":"frecuente",
		"polish":"częsty"
	},
	{
		"spanish":"todos",
		"polish":"wszyscy"
	},
	{
		"spanish":"juntar",
		"polish":"łączyć",
		"undefined":"gromadzić"
	},
	{
		"spanish":"celebrar",
		"polish":"obchodzić",
		"undefined":"świętować"
	},
	{
		"spanish":"la fiesta",
		"polish":"zabawa",
		"undefined":"święto"
	},
	{
		"spanish":"importante",
		"polish":"ważny"
	},
	{
		"spanish":"como",
		"polish":"taki sam jak",
		"undefined":"około"
	},
	{
		"spanish":"cumplea?os",
		"polish":"urodziny"
	},
	{
		"spanish":"Navidad",
		"polish":"Boże Narodzenie"
	},
	{
		"spanish":"el día del padre",
		"polish":"dzień ojca"
	},
	{
		"spanish":"el día de la madre",
		"polish":"dzień matki"
	},
	{
		"spanish":"lado",
		"polish":"bok",
		"undefined":"strona"
	},
	{
		"spanish":"cumplir",
		"polish":"kończyć"
	},
	{
		"spanish":"regalo",
		"polish":"prezent"
	},
	{
		"spanish":"ir",
		"polish":"iść"
	},
	{
		"spanish":"casarse",
		"polish":"żenić się",
		"undefined":"brać ślub"
	},
	{
		"spanish":"apellido",
		"polish":"nazwisko"
	},
	{
		"spanish":"la mayoría",
		"polish":"większość"
	},
	{
		"spanish":"aparecer",
		"polish":"pojawić",
		"undefined":"ukazać się"
	},
	{
		"spanish":"cambiar",
		"polish":"zmienić się"
	},
	{
		"spanish":"la vida",
		"polish":"życie"
	},
	{
		"spanish":"parar",
		"polish":"przestać"
	},
	{
		"spanish":"comentar",
		"polish":"komentować",
		"undefined":"wspomnieć"
	},
	{
		"spanish":"parecer",
		"polish":"wy/zdawać się",
		"undefined":"sądzić"
	},
	{
		"spanish":"la costumbre",
		"polish":"zwyczaj",
		"undefined":"przyzwyczajenie"
	},
	{
		"spanish":"parecerse",
		"polish":"być podobnym"
	},
	{
		"spanish":"reunir",
		"polish":"zbierać",
		"undefined":"posiadać"
	},
	{
		"spanish":"mayor que",
		"polish":"starszy niż"
	},
	{
		"spanish":"abogado/a",
		"polish":"adwokat/ka"
	},
	{
		"spanish":"la descripción",
		"polish":"opis"
	},
	{
		"spanish":"bibliotecario/a",
		"polish":"bibliotekarz/-rka"
	},
	{
		"spanish":"el pueblo",
		"polish":"wioska",
		"undefined":"naród"
	},
	{
		"spanish":"menor",
		"polish":"młodszy"
	},
	{
		"spanish":"el instituto",
		"polish":"instytut"
	},
	{
		"spanish":"economista",
		"polish":"ekonomista"
	},
	{
		"spanish":"el árbol genealógico",
		"polish":"drzewo genealogiczne"
	},
	{
		"spanish":"un árbol de Navidad",
		"polish":"choinka"
	},
	{
		"spanish":"?Qué hay de nuevo?",
		"polish":"co nowego? (potocznie)"
	},
	{
		"spanish":"nuevo/a",
		"polish":"nowy/a"
	},
	{
		"spanish":"estar abierto/a",
		"polish":"być otwartym/ą"
	},
	{
		"spanish":"la sopa",
		"polish":"zupa"
	},
	{
		"spanish":"encontrar (niereg.)",
		"polish":"znaleźć"
	},
	{
		"spanish":"todos los veces",
		"polish":"za każdym razem"
	},
	{
		"spanish":"la pregunta",
		"polish":"pytanie"
	},
	{
		"spanish":"ayuda",
		"polish":"pomoc"
	},
	{
		"spanish":"la mochila",
		"polish":"plecak"
	},
	{
		"spanish":"la pared",
		"polish":"ściana"
	},
	{
		"spanish":"el balón",
		"polish":"piłka"
	},
	{
		"spanish":"desayunar",
		"polish":"jeść obiad"
	},
	{
		"spanish":"gallego",
		"polish":"galicyjski"
	},
	{
		"spanish":"peluquero/a",
		"polish":"fryzjer/-ka"
	},
	{
		"spanish":"ahora",
		"polish":"teraz",
		"undefined":"obecnie"
	},
	{
		"spanish":"formar",
		"polish":"formować",
		"undefined":"tworzyć"
	},
	{
		"spanish":"feliz --->felices",
		"polish":"szczęśliwy"
	},
	{
		"spanish":"universidad",
		"polish":"uniwersytet"
	},
	{
		"spanish":"cómodo/a",
		"polish":"wygodny/-a"
	},
	{
		"spanish":"Buenos dias",
		"polish":"-Dzień dobry (rano)"
	},
	{
		"spanish":"Buenos tardes",
		"polish":"Dzień dobry (po południu)"
	},
	{
		"spanish":"Hola",
		"polish":"Cześć"
	},
	{
		"spanish":"Hasta la vista",
		"polish":"Do zobaczenia"
	},
	{
		"spanish":"Hasta ma?ana",
		"polish":"Do jutra"
	},
	{
		"spanish":"Adiós",
		"polish":"Żegnaj"
	},
	{
		"spanish":"Muchas gracias",
		"polish":"Bardzo dziękuję"
	},
	{
		"spanish":"Gracias",
		"polish":"Dzięki"
	},
	{
		"spanish":"Por favor",
		"polish":"Proszę"
	},
	{
		"spanish":"Perdón",
		"polish":"Przepraszam"
	},
	{
		"spanish":"Si",
		"polish":"tak"
	},
	{
		"spanish":"No",
		"polish":"nie"
	},
	{
		"spanish":"Me llamo Pablo",
		"polish":"Nazywam się Paweł"
	},
	{
		"spanish":"Mucho gusto",
		"polish":"Miło poznać"
	},
	{
		"spanish":"Soy de Polonia",
		"polish":"Jestem z Polski"
	},
	{
		"spanish":"",
		"polish":""
	},
	{
		"spanish":"?Habla inglés?",
		"polish":"Czy mówisz po angielsku?"
	},
	{
		"spanish":"",
		"polish":""
	},
	{
		"spanish":"No comprendo",
		"polish":"Nie rozumiem"
	},
	{
		"spanish":"",
		"polish":""
	},
	{
		"spanish":"Me he perdido",
		"polish":"Zgubiłem się"
	},
	{
		"spanish":"El pasaporte",
		"polish":"paszport"
	},
	{
		"spanish":"El museo",
		"polish":"muzeum"
	},
	{
		"spanish":"El billete",
		"polish":"la entrada",
		"undefined":"bilet"
	},
	{
		"spanish":"",
		"polish":""
	},
	{
		"spanish":"El taxi",
		"polish":"taksówka"
	},
	{
		"spanish":"La policia",
		"polish":"policja"
	},
	{
		"spanish":"La estación del metro",
		"polish":"stacja metra"
	},
	{
		"spanish":"",
		"polish":""
	},
	{
		"spanish":"La farmacia",
		"polish":"apteka"
	},
	{
		"spanish":"El medico",
		"polish":"lekarz"
	},
	{
		"spanish":"El hombre",
		"polish":"człowiek",
		"undefined":"mężczyzna"
	},
	{
		"spanish":"",
		"polish":""
	},
	{
		"spanish":"La mujer",
		"polish":"kobieta",
		"undefined":"żona"
	},
	{
		"spanish":"El hotel",
		"polish":"hotel"
	},
	{
		"spanish":"El dormitorio",
		"polish":"pokój"
	},
	{
		"spanish":"La cama",
		"polish":"łóżko"
	},
	{
		"spanish":"La llave",
		"polish":"klucz"
	},
	{
		"spanish":"El coche",
		"polish":"samochód"
	},
	{
		"spanish":"El tren",
		"polish":"pociąg"
	},
	{
		"spanish":"El avión",
		"polish":"samolot"
	},
	{
		"spanish":"El restaurante",
		"polish":"-restauracja"
	},
	{
		"spanish":"La cafeteria",
		"polish":"kawiarnia"
	},
	{
		"spanish":"La mesa",
		"polish":"stół"
	},
	{
		"spanish":"La cuenta",
		"polish":"rachunek"
	},
	{
		"spanish":"El cuchillo",
		"polish":"nóż"
	},
	{
		"spanish":"El tenedor",
		"polish":"widelec"
	},
	{
		"spanish":"La cuchara",
		"polish":"łyżka"
	},
	{
		"spanish":"El vaso",
		"polish":"szklanka"
	},
	{
		"spanish":"El plato",
		"polish":"talerz"
	},
	{
		"spanish":"El vino",
		"polish":"wino"
	},
	{
		"spanish":"La aqua",
		"polish":"woda"
	},
	{
		"spanish":"La cerveza",
		"polish":"piwo"
	},
	{
		"spanish":"El plato",
		"polish":"potrawa"
	},
	{
		"spanish":"Los servicios",
		"polish":"toalety"
	},
	{
		"spanish":"El zapato",
		"polish":"but"
	},
	{
		"spanish":"La camisa",
		"polish":"koszula"
	},
	{
		"spanish":"Los pantalones",
		"polish":"spodnie"
	},
	{
		"spanish":"La falda",
		"polish":"spódnica"
	},
	{
		"spanish":"El vestido",
		"polish":"sukienka"
	},
	{
		"spanish":"El traje",
		"polish":"ubranie"
	},
	{
		"spanish":"La calle",
		"polish":"ulica"
	},
	{
		"spanish":"La casa",
		"polish":"dom"
	},
	{
		"spanish":"La iglesia",
		"polish":"kościół"
	},
	{
		"spanish":"La plaza",
		"polish":"plac"
	},
	{
		"spanish":"La avenida",
		"polish":"aleja"
	},
	{
		"spanish":"El aeropuerto",
		"polish":"lotnisko"
	},
	{
		"spanish":"La estación",
		"polish":"-dworzec"
	},
	{
		"spanish":"El mar",
		"polish":"morze"
	},
	{
		"spanish":"La piscina",
		"polish":"basen"
	},
	{
		"spanish":"La tumbona",
		"polish":"leżak"
	},
	{
		"spanish":"La playa",
		"polish":"plaża"
	},
	{
		"spanish":"El barco",
		"polish":"łódź"
	},
	{
		"spanish":"La recepción",
		"polish":"-recepcja"
	},
	{
		"spanish":"ser",
		"polish":"być"
	},
	{
		"spanish":"estar",
		"polish":"być"
	},
	{
		"spanish":"tener",
		"polish":"mieć"
	},
	{
		"spanish":"hacer",
		"polish":"robić"
	},
	{
		"spanish":"dar",
		"polish":"dać"
	},
	{
		"spanish":"ir",
		"polish":"iść"
	},
	{
		"spanish":"poder",
		"polish":"móc"
	},
	{
		"spanish":"amar",
		"polish":"kochać"
	},
	{
		"spanish":"comer",
		"polish":"jeść"
	},
	{
		"spanish":"vivir",
		"polish":"żyć"
	},
	{
		"spanish":"trabajar",
		"polish":"pracować"
	},
	{
		"spanish":"escribir",
		"polish":"pisać"
	},
	{
		"spanish":"hablar",
		"polish":"mówić"
	},
	{
		"spanish":"viajar",
		"polish":"podróżować"
	},
	{
		"spanish":"bailar",
		"polish":"tańczyć"
	},
	{
		"spanish":"cantar",
		"polish":"spiewać"
	},
	{
		"spanish":"comprar",
		"polish":"kupować"
	},
	{
		"spanish":"estudiar",
		"polish":"uczyć się"
	},
	{
		"spanish":"limpiar",
		"polish":"sprzątać"
	},
	{
		"spanish":"llegar",
		"polish":"-przyjeżdżać"
	},
	{
		"spanish":"mandar",
		"polish":"wysyłać"
	},
	{
		"spanish":"necesitar",
		"polish":"potrzebować"
	},
	{
		"spanish":"pagar",
		"polish":"płacić"
	},
	{
		"spanish":"pedir",
		"polish":"prosić"
	},
	{
		"spanish":"poder",
		"polish":"móc"
	},
	{
		"spanish":"recibir",
		"polish":"-otrzymywać"
	},
	{
		"spanish":"salir",
		"polish":"odjeżdżać"
	},
	{
		"spanish":"alquilar",
		"polish":"wynajmować"
	},
	{
		"spanish":"en",
		"polish":"w"
	},
	{
		"spanish":"no",
		"polish":"nie"
	},
	{
		"spanish":"y",
		"polish":"i"
	},
	{
		"spanish":"a",
		"polish":"do"
	},
	{
		"spanish":"de",
		"polish":"od",
		"undefined":"z"
	},
	{
		"spanish":"pero",
		"polish":"ale",
		"undefined":"lecz"
	},
	{
		"spanish":"también",
		"polish":"także"
	},
	{
		"spanish":"con",
		"polish":"conmigo",
		"undefined":"ze mną"
	},
	{
		"spanish":"mi",
		"polish":"mój",
		"undefined":""
	},
	{
		"spanish":"tu",
		"polish":"twój",
		"undefined":"twoja"
	},
	{
		"spanish":"su",
		"polish":"jego",
		"undefined":"jej"
	},
	{
		"spanish":"mis",
		"polish":"moi",
		"undefined":"moje"
	},
	{
		"spanish":"tus",
		"polish":"twoi",
		"undefined":"twoje"
	},
	{
		"spanish":"sus",
		"polish":"ich"
	},
	{
		"spanish":"este",
		"polish":"ten"
	},
	{
		"spanish":"esta",
		"polish":"ta"
	},
	{
		"spanish":"estos",
		"polish":"ci",
		"undefined":"te"
	},
	{
		"spanish":"estas",
		"polish":"te"
	},
	{
		"spanish":"me",
		"polish":"mi",
		"undefined":"mnie"
	},
	{
		"spanish":"Todo reco",
		"polish":"prosto"
	},
	{
		"spanish":"allá",
		"polish":"tam"
	},
	{
		"spanish":"aqui",
		"polish":"tu"
	},
	{
		"spanish":"hoy",
		"polish":"dzisiaj"
	},
	{
		"spanish":"siempre",
		"polish":"zawsze"
	},
	{
		"spanish":"para",
		"polish":"dla",
		"undefined":"aby"
	},
	{
		"spanish":"por",
		"polish":"dla",
		"undefined":"z powodu"
	},
	{
		"spanish":"ahora",
		"polish":"teraz"
	},
	{
		"spanish":"nada",
		"polish":"nic"
	},
	{
		"spanish":"blanco",
		"polish":"biały"
	},
	{
		"spanish":"feliz",
		"polish":"szczęśliwy"
	},
	{
		"spanish":"contento",
		"polish":"-zadowolony"
	},
	{
		"spanish":"hambriento",
		"polish":"głodny"
	},
	{
		"spanish":"joven",
		"polish":"młody"
	},
	{
		"spanish":"alto",
		"polish":"wysoki"
	},
	{
		"spanish":"viejo",
		"polish":"stary"
	},
	{
		"spanish":"útil",
		"polish":"użyteczny"
	},
	{
		"spanish":"peor",
		"polish":"gorszy"
	},
	{
		"spanish":"cansado",
		"polish":"zmęczony"
	},
	{
		"spanish":"pesado",
		"polish":"ciężki"
	},
	{
		"spanish":"mayor",
		"polish":"większy",
		"undefined":"starszy"
	},
	{
		"spanish":"menor",
		"polish":"mniejszy",
		"undefined":"młodszy"
	},
	{
		"spanish":"delgado",
		"polish":"szczupły"
	},
	{
		"spanish":"gordo",
		"polish":"gruby"
	},
	{
		"spanish":"bueno",
		"polish":"dobry"
	},
	{
		"spanish":"bonito",
		"polish":"ładny"
	},
	{
		"spanish":"fácil",
		"polish":"łatwy"
	},
	{
		"spanish":"importante",
		"polish":"ważny"
	},
	{
		"spanish":"grande",
		"polish":"duży"
	},
	{
		"spanish":"interesante",
		"polish":"ciekawy"
	},
	{
		"spanish":"malo",
		"polish":"zły"
	},
	{
		"spanish":"largo",
		"polish":"długi"
	},
	{
		"spanish":"corto",
		"polish":"krótki"
	},
	{
		"spanish":"limpio",
		"polish":"czysty"
	},
	{
		"spanish":"sucio",
		"polish":"brudny"
	},
	{
		"spanish":"1 primero",
		"polish":"pierwszy"
	},
	{
		"spanish":"2 segundo",
		"polish":"drugi"
	},
	{
		"spanish":"3 tercero",
		"polish":"trzecia"
	},
	{
		"spanish":"4 cuarto",
		"polish":"czwarty"
	},
	{
		"spanish":"5 quinto",
		"polish":"piąty"
	},
	{
		"spanish":"6 sexto",
		"polish":"szósty"
	},
	{
		"spanish":"7 septimo",
		"polish":"siódmy"
	},
	{
		"spanish":"8 octavo",
		"polish":"ósmy"
	},
	{
		"spanish":"?Cómo se llamo usted?",
		"polish":"Jak się nazywasz?"
	},
	{
		"spanish":"Me llamo Pablo",
		"polish":"Nazywam się Paweł"
	},
	{
		"spanish":"?De dónde es usted?",
		"polish":"Skąd Pani/Pan pochodzi?"
	},
	{
		"spanish":"Soy de Polonia",
		"polish":"Jestem z Polski"
	},
	{
		"spanish":"Hablo un poco de espa?ol.",
		"polish":"Mówię trochę po hiszpańsku."
	},
	{
		"spanish":"?Puede ayudarme?",
		"polish":"Czy może mi Pani/Pan pomóc?"
	},
	{
		"spanish":"?Qué?",
		"polish":"Co? Który?"
	},
	{
		"spanish":"?Quién? ?Quiénes?",
		"polish":"Kto? Kim?"
	},
	{
		"spanish":"?Con quién?",
		"polish":"Z kim?"
	},
	{
		"spanish":"?Cuál? ?Cuáles?",
		"polish":"Jaki? Jak? Jakie? Który? Która?"
	},
	{
		"spanish":"?Cuánto? ?Cuánta? ?Cuántos?",
		"polish":"Ilu? Ile?"
	},
	{
		"spanish":"?Donde?",
		"polish":"Gdzie?"
	},
	{
		"spanish":"?Como?",
		"polish":"Jak? Co? Dlaczego?"
	},
	{
		"spanish":"?Por qué ?",
		"polish":"Dlaczego?"
	},
	{
		"spanish":"?Qué es esto?",
		"polish":"Co to jest?"
	},
	{
		"spanish":"?Qué hora es?",
		"polish":"Która jest godzina?"
	},
	{
		"spanish":"?Qué significa ...?",
		"polish":"Co oznacza ...?"
	},
	{
		"spanish":"? Qué pasa?",
		"polish":"Co się stało?"
	},
	{
		"spanish":"?A qué hora?",
		"polish":"O której godzinie?"
	},
	{
		"spanish":"?Quién es él?",
		"polish":"Kim on jest?"
	},
	{
		"spanish":"?Quién habla?",
		"polish":"Kto mówi?"
	},
	{
		"spanish":"?Con quién trabaja Pablo?",
		"polish":"Z kim pracuje Paweł?"
	},
	{
		"spanish":"?Cuál es tu nombre?",
		"polish":"Jakie jest twoje imie?"
	},
	{
		"spanish":"?Cuáles de ellos son polacos?",
		"polish":"Którzy z nich są Polakami?"
	},
	{
		"spanish":"?A donde vas?",
		"polish":"Dokąd idziesz?"
	},
	{
		"spanish":"?Cuánto cuesta?",
		"polish":"Ile to kosztuje?"
	},
	{
		"spanish":"?Como se llamo esto?",
		"polish":"Jak to się nazywa?"
	},
	{
		"spanish":"?Como se habla esto?",
		"polish":"Jak to się mówi?"
	},
	{
		"spanish":"ayer",
		"polish":"wczoraj"
	},
	{
		"spanish":"anoche",
		"polish":"wczoraj wieczorem"
	},
	{
		"spanish":"anteayer",
		"polish":"przedwczoraj"
	},
	{
		"spanish":"ma?ana",
		"polish":"jutro"
	},
	{
		"spanish":"Pasado ma?ana",
		"polish":"pojutrze"
	},
	{
		"spanish":"El domingo pasado",
		"polish":"w zeszłą niedzielę"
	},
	{
		"spanish":"La semena pasada",
		"polish":"w zeszłym tygodniu"
	},
	{
		"spanish":"El mes pasado",
		"polish":"w zeszłym miesiącu"
	},
	{
		"spanish":"El próximo lunes",
		"polish":"w następny poniedziałek"
	},
	{
		"spanish":"La próxima semana",
		"polish":"w następnym tygodniu"
	},
	{
		"spanish":"El próximo mes",
		"polish":"w następnym miesiącu"
	},
	{
		"spanish":"Dentro de poco",
		"polish":"wkrótce"
	},
	{
		"spanish":"Dentro de cinco minutos",
		"polish":"w ciągu pięciu minut"
	},
	{
		"spanish":"Semana",
		"polish":"tydzień"
	},
	{
		"spanish":"Mes",
		"polish":"miesiąc"
	},
	{
		"spanish":"A?o",
		"polish":"rok"
	},
	{
		"spanish":"Hoy",
		"polish":"dzisiaj"
	},
	{
		"spanish":"Hoy es ....",
		"polish":"dzisiaj jest ..."
	},
	{
		"spanish":"Dni tygodnia",
		"polish":""
	},
	{
		"spanish":"Lunes",
		"polish":"poniedziałek"
	},
	{
		"spanish":"Martes",
		"polish":"wtorek"
	},
	{
		"spanish":"Miércoles",
		"polish":"środa"
	},
	{
		"spanish":"Jueves",
		"polish":"czwartek"
	},
	{
		"spanish":"Viernes",
		"polish":"piątek"
	},
	{
		"spanish":"Sábado",
		"polish":"sobota"
	},
	{
		"spanish":"Domingo",
		"polish":"niedziela"
	},
	{
		"spanish":"Enero",
		"polish":"styczeń"
	},
	{
		"spanish":"Febrero",
		"polish":"luty"
	},
	{
		"spanish":"Marzo",
		"polish":"marzec"
	},
	{
		"spanish":"Abril",
		"polish":"kwiecień"
	},
	{
		"spanish":"Mayo",
		"polish":"maj"
	},
	{
		"spanish":"Junio",
		"polish":"czerwiec"
	},
	{
		"spanish":"Julio",
		"polish":"lipiec"
	},
	{
		"spanish":"Agosto",
		"polish":"sierpień"
	},
	{
		"spanish":"Septiembre",
		"polish":"wrzesień"
	},
	{
		"spanish":"Octubre",
		"polish":"październik"
	},
	{
		"spanish":"Noviembre",
		"polish":"listopad"
	},
	{
		"spanish":"Diciembre",
		"polish":"grudzień"
	},
	{
		"spanish":"acabar",
		"polish":"kończyć"
	},
	{
		"spanish":"Acabar de",
		"polish":"właśnie"
	},
	{
		"spanish":"buscar",
		"polish":"szukać"
	},
	{
		"spanish":"Se busca",
		"polish":"poszukiwany"
	},
	{
		"spanish":"Dar",
		"polish":"dać"
	},
	{
		"spanish":"Dar a",
		"polish":"Wychodzić na"
	},
	{
		"spanish":"Dar con",
		"polish":"znaleźć"
	},
	{
		"spanish":"Dar por",
		"polish":"zdecydować"
	},
	{
		"spanish":"Gustar",
		"polish":"Lubić"
	},
	{
		"spanish":"Como gustas",
		"polish":"Jak chcesz/ sobie życzysz"
	},
	{
		"spanish":"?Gusta?",
		"polish":"Czy chcesz?"
	},
	{
		"spanish":"ir",
		"polish":"iść",
		"undefined":"jechać"
	},
	{
		"spanish":"Ir de",
		"polish":"-być o czymś"
	},
	{
		"spanish":"Ir de",
		"polish":"ir con",
		"undefined":"być ubranym"
	},
	{
		"spanish":"Ir por",
		"polish":"szukać"
	},
	{
		"spanish":"Ir para",
		"polish":"mieć zamiar"
	},
	{
		"spanish":"irse",
		"polish":"odejść"
	},
	{
		"spanish":"?qué va!",
		"polish":"Skądże!"
	},
	{
		"spanish":"?cómo.. ir?",
		"polish":"Jak ...leci?"
	},
	{
		"spanish":"Cómo ir?",
		"polish":"Jak się czuje?"
	},
	{
		"spanish":"ir a + inf.",
		"polish":"mieć zamiar"
	}
];
  var wordNumber = Math.floor(Math.random() * words.length);
  var word = words[wordNumber];
  var div = document.createElement('div');
  div.style.width = "100%";
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.textAlign = "center";
  div.style.height = "0px";
  var span = document.createElement('span');
  span.style.background = "red";
  span.style.color = "white";
  span.style.padding = "4px";
  span.style.fontFamily = "verdana";
  span.style.zIndex = 10;
  span.style.fontSize = "14px";
  var text = document.createTextNode(word.spanish + " - " + word.polish); 
  span.appendChild(text);
  div.appendChild(span);
  window.addEventListener("load", function(e) {
    document.body.appendChild(div);
  }, false);
  span.addEventListener("click", function(e) {
    this.style.display = "none";
  }, false);