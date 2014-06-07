// kanjikoohiistorysubstitutekeywords.user.js! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2007-2009, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// Spanish keywords included with permission from Marc Bernabe.
//
// --------------------------------------------------------------------
//
// 2.2 2010.09.12  woelpad  Framenum <span> changed to <div>
// 2.1 2009.11.29  woelpad  Fixed problem with multiple keywords getting messed up on review page
// 2.0 2009.11.02  woelpad  Adapted to the new site look
// 1.9 2009.05.19  woelpad  Bug fix for multiple edition keywords
// 1.8 2009.05.17  woelpad  Adapted to cope with the fixes after the malware attack
// 1.7 2009.05.08  woelpad  Display suggestion after entering frame number or kanji
// 1.6 2008.08.21  woelpad  Added Script Update Checker
// 1.5 2008.05.14  woelpad  Updated RtK3 2nd ed.
// 1.4 2008.05.08  woelpad  Adapted to Firefox 3 beta 5
// 1.3 2008.04.14  woelpad  Convert '|' in '/' inside keywords.
// 1.2 2008.03.17  woelpad  Applied to the sightreading page
//                          Adapted to cope with a change in the stories page
// 1.1 2008.03.12  woelpad  Bug fix in review when a multiple edition keyword is substituted,
//                          the multiple edition keyword would show up instead of the substition
// 1.0 2008.03.05  woelpad  RtK3 2nd ed. and Spanish keywords added
// 0.9 2008.02.24  woelpad  Failed kanji list on the study page changed location
// 0.8 2008.02.14  woelpad  Applied to the stories page
// 0.7 2008.01.11  woelpad  Show correct editions for keywords
// 0.6 2007.12.26  woelpad  Select your own edition
//                          Substitute stroke counts
// 0.5 2007.12.12  woelpad  The keyword column on the review summary page lost its class tag
// 0.4 2007.09.08  woelpad  The form for keyword search was removed
// 0.3 2007.06.18  woelpad  Now also substituting kanjis
// 0.2 2007.01.22  woelpad  Adapted to cope with the new Ajax functionality
// 0.1 2007.01.16  woelpad  First release
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5 (?) or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Kanji.Koohii: Substitute keywords", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kanji.Koohii: Substitute keywords
// @namespace      http://userscripts.org/scripts/show/7118
// @description    Replace keywords/kanjis with your own set of keywords/characters.
// @include        http://kanji.koohii.com/manage/removelist*
// @include        http://kanji.koohii.com/profile*
// @include        http://kanji.koohii.com/review*
// @include        http://kanji.koohii.com/review/flashcardlist*
// @include        http://kanji.koohii.com/review/summary*
// @include        http://kanji.koohii.com/sightreading*
// @include        http://kanji.koohii.com/study*
// @include        http://kanji.koohii.com/study/failedlist*
// @include        http://kanji.koohii.com/study/kanji/*
// @include        http://kanji.koohii.com/study/mystories*
// ==/UserScript==

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 7118; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1284300444835; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

var onTestSite = false;

var editions = [
	{name: 'Remembering the Kanji 1 (english)', id: '1.'},
	{short: '3rd edition', id: '1.3'},
	{short: '4th edition', id: '1.4', numbers: [
		 847,  958,  966, 1002, 1024, 1029, 1087, 1159, 1182, 1211, 
		1299, 1301, 1380, 1396, 1438, 1460, 1503, 1573, 1671, 1688, 
		1720, 1792, 1973, 1982, 2016, 2026, 2038
	]},
	{short: '5th edition', id: '1.5', numbers: [
		 499,  563,  743,  773,  798,  859, 1122, 1908
	], keywords: [
		"explanation",  "female",  "male",  "mountain pass",  "hall",  "man", "confectionary", "interpretation"
	]},
	{name: 'Kanji para recordar I (spanish)', id: 'es-1.', numbers: [[1, 2042]], keywords: [
		"uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez","boca","d\u00eda","mes","campo de arroz","ojo","viejo","yo","riesgo","compa\u00f1era","claro","canto","destello","mercanc\u00edas","espina dorsal","pr\u00f3spero","temprano","sol naciente","generaci\u00f3n","est\u00f3mago","amanecer","ves\u00edcula biliar","atravesar","c\u00f3ncavo","convexo","antig\u00fcedad","uno mismo","blanco","cien","en","mil","lengua","caja para medir","elevarse","redondo","medida","especialidad","Dr.","adivinaci\u00f3n","arriba","abajo","eminente","ma\u00f1ana","\u00fanico","almeja","recto","empleado","ver","reci\u00e9n nacido","principio","p\u00e1gina","tozudo","mediocre","derrota","diez mil","frase","piel","decamer\u00f3n","cuchar\u00f3n","diana","cuello","entra\u00f1as de pescado","tumulto","directamente","herramienta","verdad","t\u00e9cnica","izquierda","derecha","posesi\u00f3n","soborno","tributo","p\u00e1rrafo","espada","filo","cortar","seducir","brillante","norma","vice-","separar","calle","barrio","posible","cima","ni\u00f1o","Confucio","acabado","mujer","gustar","parecido",
		"madre","traspasar","hermano mayor","superar","peque\u00f1o","poco","grande","muchos","noche","marea nocturna","exterior","nombre","piedra","semejanza","nitrato","aplastar","arena","cepillar","rayo","gordo","utensilio","apestar","exquisita","reflexionar","grueso","extra\u00f1o","arroyo","estado","obedecer","agua","hielo","eternidad","manantial","prado","petici\u00f3n","nadar","pantano","alta mar","riachuelo","sopa","marea","origen","animado","extinguir","por supuesto","r\u00edo","pernoctar","lago","sondear","tierra","escupir","presi\u00f3n","cabo","valla","joya cuadrada","sellar","horizonte","templo budista","tiempo","anivelado","fuego","inflamaci\u00f3n","angustia","diluido","l\u00e1mpara","plantaci\u00f3n","desastre","ceniza","punto","iluminar","pescado","pescar","ri","negro","tinta china","carpa","cantidad","rin","enterrar","el mismo","cueva","tronco","en frente de","estimado","letra","proteger","perfecto","proclamar","anochecer","relajo","banquete","acercarse","riqueza","ahorros","\u00e1rbol","arboleda","bosque","katsura","roble","marco",
		"copa del \u00e1rbol","estanter\u00eda","albaricoque","paulonia","plantar","marchitado","bruto","pueblo","inter-","escritorio","libro","etiqueta","calendario","plan","agostar","todav\u00eda","extremo","salpicadura","sabor","hermana menor","carmes\u00ed","acciones de bolsa","juventud","hierba","sufrimiento","tolerancia","deste\u00f1ido","hoja","imitaci\u00f3n","borroso","tumba","ganarse la vida","membrana","plant\u00f3n","augurio","melocot\u00f3n","mirar fijamente","perro","statu quo","silencio","tal como es","ca\u00f1a","cazar","gato","vaca","especial","revelaci\u00f3n","antes","lavar","apretado","mundo","t\u00e9","encajar","pagoda","rey","joya","tesoro","perla","presente","loco","emperador","ofrenda","todo","tap\u00f3n","l\u00f3gica","amo","verter","columna","oro","lingote","bol","cobre","pescar con ca\u00f1a","aguja","inscripci\u00f3n","tranquilizar","camino","guiar","cruce","veloz","crear","apremiar","escapar","inmediaciones","patrullar","carruaje","acompa\u00f1ar","carril","transportar","delante","cada uno","categor\u00eda","abreviatura","invitado","frente","verano","deshacerse de","ramita","caer","superfluo",
		"ej\u00e9rcito","radiante","llevar","corona","sue\u00f1o","foso","alto","recibir","academia de repaso","madurar","pabell\u00f3n","capital","refrescante","paisaje","ballena","casa de campo","circunferencia","semana","hidalgo","buena suerte","robusto","chalet","venta","estudiar","memorizar","florecer","escribir","ensenada","criar","agresi\u00f3n","fracaso","hojas de\u2026","casualidad","respeto","decir","amonestar","proyecto","c\u00e1rcel","revisi\u00f3n","reprender","instrucci\u00f3n","edicto imperial","atascado","hablar","recitar","poes\u00eda","palabra","leer","afinar","discusi\u00f3n","consentimiento","reproche","estilo","examen","ii (dos)","zona","bandido","plant\u00edo","cargar","exuberante","convertirse","castillo","sincero","intimidar","destruir","menguar","andamio","moneda","poco profundo","detenerse","andar","vadear","repetidamente","acuerdo","emprender","curriculum","guerrero","recaudaci\u00f3n","correcto","certificaci\u00f3n","pol\u00edtica","determinaci\u00f3n","cerradura","correr","sobrepasar","proceder","adelantar","debidamente","tema","dique","construir","prolongar","natividad","piedra angular","novio","ropa","confeccionar","atuendo","reverso","demolici\u00f3n",
		"pat\u00e9tico","distante","mono","primera vez","tela","vela","rollo colgante","sombrero","cortina","baldaqu\u00edn","brocado","mercado","hermana mayor","pulmones","faja","estancado","espina","sistema","made in\u2026","girar","destreza","lluvia","nube","nublado","trueno","escarcha","invierno","cielo","puente","atractiva","en pie","llorar","insignia","disputar","soberano","juvenil","pupila","campana","hacer un trato","esposa leg\u00edtima","apropiado","gotear","enemigo","cuchara","norte","estatura","comparar","descendientes","todos","mezclar","sed","audiencia","marr\u00f3n","ronco","delicioso","grasa","i (uno)","todos los","astucia","ciruela","mar","mendigar","sequ\u00eda","abdomen","duplicar","carencia","soplar","cocinar","canci\u00f3n","blando","siguiente","zarza","bienes","figura","consultar","compensaci\u00f3n","cultivar","dividir","sonido","oscuridad","rima","perspicaz","espejo","l\u00edmite","difunto","ciego","ilusi\u00f3n","arrasado","ambici\u00f3n","direcci\u00f3n","obstaculizar","chiquillo","perfumado","obeso","visitar","liberar","violento","desnudarse","rumor","afilado",
		"anteriormente","aumento","regalo","este","caballete","helado","embarazada","tribunal","te\u00f1ir","quemar","V.I.P.","fin de a\u00f1o","prefectura","Casta\u00f1a de Indias","terreno","estanque","insecto","luci\u00e9rnaga","serpiente","arco iris","mariposa","solitario","gusano de seda","viento","el yo","ocurrir","reina","reforma","escriba","envolver","placenta","ca\u00f1\u00f3n","burbuja","tortuga de tierra","electricidad","drag\u00f3n","catarata","puerco","cumplir","consumar","casa","novia","abrumador","intestinos","lugar","agua caliente","oveja","belleza","oc\u00e9ano","detallado","fresco","h\u00e1bil","envidia","distinci\u00f3n","vestirse","s\u00f3lo","chamuscar","arrecife","reunir","cuasi-","avanzar","varios","hembra","semi-","excitado","arrebatar","seguro","mediod\u00eda","permitir","deleite","autoridad","panorama","plumas","aprender","subsecuente","d\u00eda de la semana","colada","dixit","apuro","duro","pa\u00eds","grupo","causa","matrimonio","parque","veces","podio","tienda","garaje","patio","oficina gubernamental","cama","c\u00e1\u00f1amo","pulir","coraz\u00f3n","olvidar","aguante","reconocer","velatorio","intenci\u00f3n",
		"documento","lealtad","pinchito","afligido","pensar","gracia","adaptar","idea","concepto","respiraci\u00f3n","pausa","favor","terror","engatusar","emoci\u00f3n","melancol\u00eda","viuda","ocupado","\u00e9xtasis","constancia","lamento","iluminaci\u00f3n","miedo","desconcierto","arrepentimiento","odio","costumbre","placer","pereza","humildad","remordimiento","recuerdo","ansia","anexo","necesariamente","rezumar","mano","vigilar","rozar","ego","virtud","deliberaci\u00f3n","sacrificio","frotar","abrazo","embarcar","extracto","confrontaci\u00f3n","cr\u00edtica","invitar","despejar (el terreno)","aplaudir","golpear","arrestar","descartar","secuestrar","pellizcar","desaf\u00edo","dedo","sostener","sujetar","blandir","conjetura","enarbolar","propuesta","da\u00f1o","recoger","llevar sobre los hombros","apoyo","bosquejar","pilotar","tocar","subir","colgar","bru\u00f1ir","mandamiento","artilugio","nariz","castigar","molde","genio","propiedad","material","suponer","existir","a partir de","port\u00e1til","alcanzar","chupar","manejar","metraje","historia","funcionario","renovar","r\u00edgido","o bien","par","morera","bajeles","custodiar",
		"obtener","tipejo","ira","amigo","zafarse","lanzar","ahogarse","establecimiento","azotar","c\u00e1scara","rama","pericia","le\u00f1o","extremidad","tallo","sospechoso","liviano","t\u00edo","entrenador","soledad","gr\u00e1cil","anti-","pendiente","tabla","devolver","marketing","garras","amable","leche","flotar","l\u00edder","exhortar","recolectar","verdura","aceptar","impartir","amor","pagar","ancho","ampliar","mineral","v\u00e1lvula","macho","pedestal","descuidar","reinar","empezar","matriz","ventana","pasado","m\u00e9todo","reuni\u00f3n","cl\u00edmax","sala","llegada","facer","mutuamente","abandonar","educar","eliminar","asignar","fusil","azufre","corriente","licencia","cautivar","salir","monta\u00f1a","torpe","roca","carb\u00f3n","bifurcaci\u00f3n","cima de la monta\u00f1a","derrumbarse","oculto","miel","tormenta","promontorio","entrar","aglomeraci\u00f3n","parte","pobreza","partici\u00f3n","p\u00fablico","pino","anciano venerable","querellarse","valle","ba\u00f1arse","contener","derretir","anhelo","abundante","plomo","circunvalar","premio","partido","sala p\u00fablica","normal","falda",
		"manipular","pellejo","olas","abuelita","exponer","desgarrar","incurrir","el resto","martirio","particularmente","multiplicarse","hilera","ruptura","ardiente","muerte","funeral","pesta\u00f1eo","oreja","tomar","lo esencial","m\u00e1ximo","tomar fotos","verg\u00fcenza","puesto","sagrado","osad\u00eda","escuchar","bolsillo","rid\u00edculo","suelto","comprar","colocar","castigo","m\u00e1s bien","turbio","anillo","mandar de vuelta","marido","asistencia","arroyo de monta\u00f1a","est\u00e1ndar","canje","estar de acuerdo","sumergir","perder","hierro","alternar","criado","princesa","almac\u00e9n","entra\u00f1as","inteligente","estricto","expectaci\u00f3n","ojear","gigantesco","repeler","fuerza","var\u00f3n","fatiga","reclutar","inferioridad","\u00e9xito","persuadir","esfuerzo","animar","a\u00f1adir","felicitaciones","erigir","axila","amenaza","co-","ir","r\u00edtmico","restaurar","ganancia","seguir","alumno","esperar","trayecto","subyugar","di\u00e1metro","\u00e9l","funci\u00f3n","benevolencia","penetrar","indicios","penal","delicado","bulevar","equilibrio","borrador","ingresos","alcance","impuesto","inmaduro","armon\u00eda","trasladar","segundo","oto\u00f1o",
		"tristeza","privado","regularidad","secreto","apelaci\u00f3n","beneficio","peral","cosecha","espiga","planta del arroz","incienso","estaciones del a\u00f1o","comit\u00e9","sobresaliente","transparente","tentar","cereales","germen","arroz","harina","pegajoso","granos","cosm\u00e9tico","desviaci\u00f3n","chic","provisiones","crisantemo","hondura","n\u00famero","atalaya","tipo de","laca","don","solicitud","bal\u00f3n","salvaci\u00f3n","bamb\u00fa","risa","sombrero de bamb\u00fa","bamb\u00fa enano","m\u00fasculo","caja","pincel de escritura","cilindro","etc.","calcular","soluci\u00f3n","estratagema","registrar","fabricar","persona","asistente","sin embargo","habitar","rango","intermediario","cuerpo","remoto","caso","atender","otro","postrado","transmitir","Buda","descanso","provisional","conde","vulgar","fe","excelente","confiar","ejemplo","individual","saludable","lado","camarero","parada","precio","emular","derrocamiento","espiar","monje budista","cien millones","ceremonia","indemnizaci\u00f3n","ermita\u00f1o","anfitri\u00f3n","humanitario","mofarse","usar","conveniencia","doble","ternura","talar","hostal","herida","conservar","alabar","grandeza","adherir",
		"s\u00edmbolo","municipio","responsabilidad","paga","sustituto","saco","prestar","cambio","flor","carga","inclinar","qu\u00e9","equipaje","sagaz","mir\u00f3n","duradero","surco","capturado","dentro","tercera clase","dise\u00f1o","carne","podrirse","sentarse","graduarse","paraguas","monme","por medio de","semejante","juntar","teja","florero","templo sinto\u00edsta","ocupaci\u00f3n","bondad","a\u00f1o","vespertino","l\u00edquido","mont\u00edculo","en met\u00e1lico","abuso","alarido","intercambio","disolver","limosna","rotaci\u00f3n","jugar","viaje","no","cosa","f\u00e1cil","otorgar","orina","monja","barro","cercado","calzado","tejado","asir","ceder","excavar","zanja","residir","establecer","estrato","oficina","lento","filtraci\u00f3n","imprimir","shaku","agotar","ci\u00e9naga","traducir","escoger","de d\u00eda","puerta","hombro","borla","ventilador","lar","volver","l\u00e1grima","contratar","mirar atr\u00e1s","manifestar","mostrar","saludo","favorable","celebrar","bendici\u00f3n","bienestar","empresa","inspecci\u00f3n","Nara","oficial militar","consuelo","buena voluntad","prohibici\u00f3n","cuello de la camisa","religi\u00f3n",
		"adorar","festividad","estimaci\u00f3n","rallar","por lo que","extraer","aceite","manga","espacio","repartir","silbato","eje","coraza","empujar","lengua de tierra","insertar","tomar la palabra","expandir","dioses","buscar","fruta","caramelo","cap\u00edtulo","desnudo","hacha","tronchar","sitio","orar","cerca","plegar","filosof\u00eda","expirar","juramento","temporalmente","gradualmente","recortar","sustancia","rechazar","acusaci\u00f3n","ayer","mentira","realizar","nieve","grabar","encuesta","apresurarse","calma","invadir","inmersi\u00f3n","yacer","se\u00f1ora","barrer","acertar","contienda","limpio","asunto","Tang","az\u00facar","sano","aprehender","Italia","t\u00fa","manada","a prueba de","demanda","confuciano","margen","ambos","lleno","trazo de pincel","diente","doblegar","cadete","encuentro","remar","tinaja","Osa Mayor","importe","departamento","mapa","utilizar","confortable","equipamiento","\u00e9rase una vez","confuso","tomar prestado","pena","apartar","esparcir","veinte","plebeyo","interceptar","asiento","grado","cruzar","bullicio","erupci\u00f3n","sepulcro","indignaci\u00f3n","fre\u00edr",
		"alba","mitad","consorte","borde de un arrozal","sentencia","boleto","pergamino","esfera","victoria","glicina","facs\u00edmil","un lado","bloque de imprenta","de","destituci\u00f3n","c\u00e9sped","negativo","negar","una taza de","dardo","rectificar","tribu","saber","sabidur\u00eda","alabarda","tierno","tarea","niebla","brigada","volver a casa","arco","tirar","p\u00e9same","extenso","fuerte","d\u00e9bil","hervir","gastos","N\u00fam.","hermano menor","habilidad","apodo","decadencia","jactarse","sucio","conceder","copiar","alguien","disparar","disculparse","anciano","considerar","devoci\u00f3n filial","ense\u00f1ar","tortura","alguno","cocer","c\u00e9lebre","firma","bochorno","diversos","jabal\u00ed","ribera","apostar","desfiladero","estrecho","intercalar","perseguir","experto","comandante","bur\u00f3crata","ata\u00fad","ca\u00f1er\u00eda","padre","entremezclar","m\u00e9rito","contraste","escuela","pie","estimular","larga distancia","sendero","roc\u00edo","brinco","salto","pisar","paso","esqueleto","resbaladizo","m\u00e9dula","calamidad","remolino","demasiado","Alto","\u00c1frica","ocasi\u00f3n","obstruir","ir detr\u00e1s","auxiliar","luz del sol",
		"poner en fila","defenderse de","acoplado","Instituci\u00f3n","campamento","regimiento","ca\u00edda","descender","piso","alteza","vecino","aislar","encubrir","degenerar","colapso","agujero","vac\u00edo","retener","punzar","indagaci\u00f3n","obturar","sigiloso","depresi\u00f3n","estrujar","horno","paup\u00e9rrimo","tantear","profundo","cerro","colina","soldado","costa","hilo","tejer","remendar","encoger","lujo","vertical","l\u00ednea","estrechar","fibra","gasa","practicar","correa","continuar","dibujo","integraci\u00f3n","estrangular","salario","entrelazar","atar","final","clase","cr\u00f3nica","carm\u00edn","concluir","hilatura","perturbar","presentar a alguien","s\u016btra","caballero","promesa","delgado","acumular","cable","general","algod\u00f3n","seda","enrollado","heredar","verde","afinidad","red","tenso","p\u00farpura","amarrar","cuerda de paja","infancia","detr\u00e1s","impreciso","cu\u00e1ntos","mecanismo","misterioso","ganado","acaudalar","cuerda de arco","abarcar","nutritivo","piedad","im\u00e1n","linaje","encargado","nieto","suspender","al contrario","espinilla","al por mayor","honorable","prenda","destino",
		"\u00f3rdenes","cero","edad","frescura","jurisdicci\u00f3n","campanilla","coraje","tr\u00e1fico","bailar","duda","imitar","solidificar","patr\u00f3n","crimen","mala suerte","peligroso","direcci\u00f3n postal","brazo","jard\u00edn","rencor","sauce","huevo","estacionar","comerciar","sello","entretener","signo del p\u00e1jaro","sake","servir sake","fermentaci\u00f3n","crueldad","recompensar","productos l\u00e1cteos","vinagre","borracho","distribuir","\u00e1cido","vacilar","reverencia","alubias","cabeza","corto","provechoso","tambor","alegr\u00eda","\u00e1rboles madereros","plato","sangre","cuenca","alianza","robar","caliente","supervisar","desbordarse","esp\u00e9cimen","fiero","auge","sal","plata","resentimiento","ra\u00edz","instant\u00e1neo","bar\u00f3n","n\u00f3dulo","retirada","conf\u00edn","globo ocular","bueno","melodioso","errante","hija","comer","comida","beber","hambriento","inanici\u00f3n","decorar","Edificio","fomentar","harto","previamente","aproximadamente","deplorar","llano","llamar","\u00e1rea de dos esteras","evaluaci\u00f3n","segar","esperanza","villano","pecho","desprenderse","matar","genuino","embotado","picante","dimitir","catalpa","administrar","pared",
		"refugiarse","nuevo","le\u00f1a","progenitor","felicidad","tenaz","informe","grito","retorcer","rentas","despreciable","l\u00e1pida","terrestre","\u00edntimo","fuerzas","calor","diamante","mausoleo","signo del jabal\u00ed","n\u00facleo","cincelar","mencionado anteriormente","denunciar","mencionar","arte","fr\u00edo","destilaci\u00f3n","deferencia","parcela","muchacha","veneno","elemental","cebada","azul","refinado","sol\u00edcito","sentimientos","despejado","puro","apacible","inculpar","haza\u00f1a","volumen","fianza","escabeche","superficie","bolsa","inmaculado","compromiso","consumir","damnificar","control","proporci\u00f3n","constituci\u00f3n","vida","estrella","apellido","sexo","sacrificio animal","producci\u00f3n","giba","cumbre","coser","venerar","longevidad","fundir","inscribirse","primavera","camelia","pac\u00edfico","tocar m\u00fasica","realidad","dedicar","estipendio","cayado","discreto","diligencia","Sino-","suspiro","dif\u00edcil","esplendor","pender","somnoliento","huso","montar","exceso","ahora","incluir","versificar","deseo","arpa","penumbra","de antemano","prefacio","dep\u00f3sito","llanura","al mismo tiempo","desagradar","hoz","modesto",
		"ganga","oeste","valor","necesitar","caderas","voto","a la deriva","se\u00f1al","casta\u00f1o","transici\u00f3n","volcar","humo","sur","alcanforero","donaci\u00f3n","verja","pregunta","pasar revista","camarilla","intervalo","sencillo","abierto","cerrado","torre","ocio","o\u00edr","mojado","columna tipogr\u00e1fica","lucha","granero","g\u00e9nesis","sin","haiku","repudiar","triste","culpabilidad","camarada","puerta principal","marqu\u00e9s","clima","decidir","alegre","admirable","diferencia","horizontal","defensa","Corea","secar","h\u00edgado","publicaci\u00f3n","sudor","alero","playa","tronco del \u00e1rbol","patata","universo","excesivo","excluir","progresivamente","conferir","ruta","diagonal","pintura","manojo","confianza","r\u00e1pidos","orden imperial","enajenar","r\u00e1pido","organizar","sable","escarpado","test","frugal","pesado","mover","proeza meritoria","trabajar","especie","chocar","fragante","enfermo","est\u00fapido","viruela","s\u00edntomas","raudamente","diarrea","cansado","epidemia","dolor","tic","esconderse","artesano","m\u00e9dico","igual","distrito","bisagra","asalto","Europa","reprimir",
		"boca arriba","bienvenido","ascender","resplandeciente","partida","abolici\u00f3n","colega","residencia","terapia","esculpir","forma","sombra","cedro","colorear","patente","chico","cara","deber","hincharse","presenciar","desventurado","disciplina","raro","chequeo","oraci\u00f3n","frente a frente","blas\u00f3n familiar","mosquito","sim\u00e9trico","dosis","terminar","purificaci\u00f3n","solemne","bases","m\u00fasica","medicina","porcentaje","astringente","delegado","centro","Inglaterra","reflejar","rojo","perd\u00f3n","ins\u00f3lito","rastro","b\u00e1rbaro","romance","golfo","amarillo","de soslayo","agarrar","color","discontinuo","satinado","fertilizante","dulce","azul marino","fulanito de tal","conspirar","mediador","timo","trebejo","bandera nacional","per\u00edodo","go","cimientos","enormemente","intuici\u00f3n","resistir","precioso","legar","despachar","revoltear","nada","asociaci\u00f3n","burdo","tarifa","antepasado","estorbo","investigar","ayuda","saludos cordiales","estera tatami","fila","universal","partitura","h\u00famedo","manifiesto","esbelto","esp\u00edritu","profesi\u00f3n","abofetear","servidor","juntos","entregar","singular","ala","anegar","puerto",
		"explosi\u00f3n","bomba","cortes\u00eda","elecci\u00f3n","Sr.","pozo","rodear","labrar","Asia","malo","c\u00edrculo","\u00e1ngulo","contacto","solucionar","de nuevo","conferencia","suscripci\u00f3n","postura","canal","argumento","\u00e9tica","rueda","parcialidad","omnipresente","recopilaci\u00f3n","tomo","c\u00f3digo","nombre de familia","papel","casarse","rebajar","rebatir","fondo","gente","dormir","capturar","bah\u00eda","anea","comercio","suplemento","mansi\u00f3n","contorno","comarca","afueras","secci\u00f3n","metr\u00f3polis","correo","patria","tierra natal","eco","hijo","pasillo","escudo","secuencial","facci\u00f3n","vena","muchedumbre","servicio postal","gradaci\u00f3n","forjar","emperatriz","fantasma","director","presentar sus respetos","categor\u00eda gramatical","domesticar","sucesor","bote","buque mercante","navegar","carguero","bandeja","acarrear","barco","acorazado","barca de remos","mel\u00f3n","curvatura","hu\u00e9rfano","capullo","r\u00e9dito","tiempo libre","extender","venir","energ\u00eda","vapor","volar","hundirse","esposa","declive","interior","m\u00e1scara","cuero","zapatos","hegemon\u00eda","voz","dar","diversi\u00f3n","error","vaho",
		"consentir","caj\u00f3n","polos","colmillo","germinar","infame","elegante","explicaci\u00f3n","turno","vista","voltear","clan","pelaje","gastar","cola de animal","domicilio","consignar","hacer","falsedad","largo","alargar","cuaderno de apuntes","dilatar","pelo","desarrollar","luto","nido","simple","guerra","zen","bala","cerezo","animal","cerebro","inquietud","severo","cadena","alzar","reputaci\u00f3n","cacer\u00eda","p\u00e1jaro","piar","grulla","cuervo","parra","paloma","gallina","isla","calidez","bella mujer","socorro","flojear","pertenecer","encomendar","por casualidad","entrevista","alocado","esquina","invertido","modelar","Monte","acero","soga","vigoroso","lata","alfarer\u00eda","mecerse","canci\u00f3n de n\u014d","concerniente a","sociable","abrir tierras","excusarse","eludir","crep\u00fasculo","ejercer","elefante","estatua","caballo","potro","verificaci\u00f3n","ecuestre","aparcar","conducir","estaci\u00f3n","alboroto","oneroso","asombro","ferviente","inflaci\u00f3n","tigre","cautivo","dermis","vacuo","jolgorio","desasosiego","prudencia","drama","opresi\u00f3n","ciervo","recomendar",
		"jubilaci\u00f3n","hermoso","oso","capaz","actitud","signo del tigre","actuaci\u00f3n","signo del drag\u00f3n","avergonzar","se\u00edsmo","agitar","encinta","labios","agricultura","concentrado","enviar","relaci\u00f3n","floraci\u00f3n","ogro","feo","alma","bruja","fascinaci\u00f3n","masa informe","atacar","rega\u00f1ar","plural mayest\u00e1tico","atm\u00f3sfera","\u00edntegro","templar","acatar","renunciar","cuartel","adem\u00e1s","alga","esclavo","curar","cinabrio","laguna","signo del buey","signo del conejo","signo de la serpiente"
	]},
	{short: '2a impresi\u00f3n', id: 'es-1.2'},
	{short: '3a impresi\u00f3n', id: 'es-1.3', numbers: [
		499, 1122, 1908
	], keywords: [
		"explicaci\u00f3n", "confite", "interpretaci\u00f3n"
	]},
	{name: 'Remembering the Kanji 3 (english)', id: '3.', numbers: [
		2264, 2327, 2712, 2844,
		2184, 2338, 2940, 2991
	], keywords: [
		// Spelling errata corrected in 2nd ed.
		"receptacle", "pan-", "who", "sitting in meditation", 
		// Other spelling errata
		"autochthonous", "raccoon dog", "resuscitate", "stationery"
	]},
	{short: '1st edition', id: '3.1'},
	{short: '2nd edition', id: '3.2', numbers: [
		2263, 2265, 2416, 2419, 2526, 2825, 2836, 2953
	], keywords: [
		"collect", "devote", "shirk", "faraway", "sumac", "crucian carp", "black kite", "foot"
	]}
];


String.prototype.addSlashes = function(){
	return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
}
String.prototype.removeSlashes = function(){
	return this.replace(/\\(.)/g, '$1');
}
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

// Taken from http://kanji.koohii.com/js/toolbox.js
Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
}
var $A = Array.from = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0, length = iterable.length; i < length; i++)
      results.push(iterable[i]);
    return results;
  }
}

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathi(query) {
	return xpath(query).snapshotItem(0);
}
function xpatho(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function elRecurse(tail, startRe, endRe, act) {
	var startAr, endAr, body;
	while (1) {
		body = null;
		startAr = null;
		endAr = null;
		if (startRe) {
			startAr = startRe.exec(tail);
			if (!startAr) break;
			tail = tail.substr(startAr.index + startAr[0].length);
		}
		if (endRe) {
			endAr = endRe.exec(tail);
			if (!endAr) break;
			body = tail.substr(0, endAr.index);
			tail = tail.substr(endAr.index + endAr[0].length);
		}
		if (act(body, startAr, endAr)) return tail;
	}
	return '';
}

function matchUrlHead(url, urlHead) {
	if (url.substr(0, urlHead.length).toLowerCase() != urlHead.toLowerCase()) return null;
	url = url.substr(urlHead.length);
	if (url.length == 0) return '';
	if (!/^[?/#]/.test(url)) return null;
	return url;
}

function matchSitePage(urlBody, siteType) {
	var body;
	switch (siteType) {
	case 'f':
		body = matchUrlHead(window.location.href, 'http://forum.koohii.com');
		if (body == null) return null;
		break;
	default:
		if (onTestSite) {
			var front = matchUrlHead(window.location.href, 'http://test.koohii.com');
			if (front == null) return null;
			body = matchUrlHead(front, '/index_staging_nodebug.php');
			if (body == null) {
				body = matchUrlHead(front, '/index_staging.php');
				if (body == null) return null;
			}
		} else {
			body = matchUrlHead(window.location.href, 'http://kanji.koohii.com');
			if (body == null) body = front;
		}
		break;
	}
	return matchUrlHead(body, urlBody);
}

function linkSitePage(urlBody, siteType) {
	switch (siteType) {
	case 'f':
		return 'http://forum.koohii.com' + urlBody;
	default:
		if (onTestSite) return 'http://test.koohii.com' + urlBody;
		return 'http://kanji.koohii.com' + urlBody;
	}
}

function getUserName() {
	// In kanji.koohii.com
	var userNameEl = xpathi('//div[@class="signin"]/div[@class="m"]/strong');
	if (userNameEl) return userNameEl.textContent;

	// In forum.koohii.com
	var quickpostUser = xpathi('//input[@name="form_user"]');
	if (quickpostUser) return quickpostUser.value;
	var topNavLogin = xpathi('//div[@class="profile_info_left"]/strong');
	if (topNavLogin) return topNavLogin.textContent;

	return '';
}

function getTableParameterValue(table, key) {
	key += ' :';
	var rows = table.getElementsByTagName('tr');	
	for (var rowIdx = 0; rowIdx < rows.length; rowIdx++) {
		var row = rows[rowIdx];
		var columns = row.getElementsByTagName('td');
		if (!columns || (columns.length < 2)) continue;
		if (columns[0].textContent == key) {
			return columns[1].textContent;
		} 
	}
	return '';
}

function matchProfileName() {
	var userName = getUserName();
	if (!userName) return false;
	var profileDiv = xpathi('//div[@class="col-box col-box-top block"]/table');
	if (!profileDiv) return false;
	return (getTableParameterValue(profileDiv, 'Username') == userName);
}

function storeValue(key, value) {
	var userName = getUserName();
	if (!userName) return;
	switch (typeof value) {
	case 'boolean':
		value = value ? 1 : 0;
		break;
	case 'number':
		break;
	default:
		value = escape(value);
		break;
	}
	GM_setValue(userName + '|' + key, value);
}

function retrieveValue(key, def) {
	var userName = getUserName();
	if (!userName) return def;
	var value = GM_getValue(userName + '|' + key);
	if (typeof value == 'undefined') return def;
	value = unescape(value);
	switch (typeof def) {
	case 'boolean':
		value = parseInt(value) ? true : false;
		break;
	case 'number':
		value = parseInt(value);
		break;
	}
	return value;
}

function extractText(el) {
	var text = '';
	for (var node = el.firstChild; node; node = node.nextSibling) {
		switch (node.nodeType) {
		case 3:
			text += node.data;
			break;
		case 1:
			text += extractText(node);
			break;
		}
	}
	return text;
}

function extractFrameNum(link) {
	var ar = /[?&](framenum|search)=(\d+)($|&)/i.exec(link);
	if (ar) return ar[2];
	ar = /(\/|#.*-)(\d+)$/i.exec(link);
	if (ar) return ar[2];
	return null;
}

function addChild(parent, type, settings, style, sibling) {
	var child = document.createElement(type);
	for (var key in settings) {
		child[key] = settings[key];
	}
	if (sibling) parent.insertBefore(child, sibling);
	else parent.appendChild(child);
	if (style) {
		child.setAttribute('style', style);
	}
	return child;
}

function addText(parent, text) {
	return parent.appendChild(document.createTextNode(text));
}

function addOption(comboBox, value, text, subtext) {
	var option = addChild(comboBox, 'option');
	if (typeof value != 'undefined') option.value = value;
	if (typeof text != 'undefined') addText(option, text);
	else if (typeof subtext != 'undefined') addText(option, '+ ' + subtext);
	return option;
}

function getGreaseMonkeySection() {
	var section = document.getElementById('GreaseMonkey');
	if (section) return section;

	var topSection = xpathi('//div[@class="col-box col-box-top block"]');
	if (!topSection) return null;

	section = addChild(topSection.parentNode, 'div', {
		id: 'GreaseMonkey',
		className: 'col-box block'
	}, null, topSection.nextSibling);
	addText(addChild(section, 'h2'), 'GreaseMonkey settings');
	
	return section;
}

function createGreaseMonkeyDivision(divName) {
	var div = document.createElement('p');
	div.name = divName;
	var section = getGreaseMonkeySection();
	var divs = section.getElementsByTagName('p');
	for (var idx = 0; idx < divs.length; idx++) {
		if (divName < divs[idx].name) {
			section.insertBefore(div, divs[idx]);
			return div;
		}
	}
	section.insertBefore(div, null);
	return div;
}

function request(url, analyze, asXML, postProcess) {
	var asynch = (typeof postProcess != 'undefined');
	var req = new XMLHttpRequest();
	function stateChange() {
		if ((req.readyState == 4) && (req.status == 200)) {
			if (asXML) {
				analyze(req.responseXML);
			} else {
				analyze(req.responseText);
			}
			postProcess();
		}
	}
	if (asynch) req.onreadystatechange = stateChange;
	req.open('GET', url, asynch);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	req.send(null);
	if (!asynch) {
		if (asXML) {
			analyze(req.responseXML);
		} else {
			analyze(req.responseText);
		}
	}
}

function initKeywords(callback) {
	if (unsafeWindow.kwlist && unsafeWindow.kklist) {
		if (callback) callback();
		return;
	}
	request(linkSitePage('/js/2.0/study/keywords.js'), function (res) {
		eval(res);
		unsafeWindow.kwlist = kwlist;
		unsafeWindow.kklist = kklist;
	}, false, callback);
}

function adaptKeywords() {
	if (unsafeWindow.kwlist) {
		for (var idx = 0; idx < unsafeWindow.kwlist.length; idx++) {
			unsafeWindow.kwlist[idx] = replaceKeyword(idx + 1, unsafeWindow.kwlist[idx]);
		}
	}
	if (unsafeWindow.kklist) {
		for (var idx in kanjiList) {
			idx = eval(idx);
			if (kanjiList[idx] != '') {
				unsafeWindow.kklist = unsafeWindow.kklist.substr(0, idx) + kanjiList[idx] + unsafeWindow.kklist.substr(idx + 1);
			}
		}
	}
}

function getCurrentFrameNr() {
	var curFrameNr;
	request(linkSitePage('/main'), function (res) {
		var ar = /<strong>(\d+)<\/strong>\s+kanji\s+flashcards/i.exec(res);
		if (ar) curFrameNr = ar[1];
	});
	return curFrameNr;
}

function removeTags(keyword) {
	return keyword.replace(/<br ?\/?>/gi, "/").replace(/\s*<[^>]+>[^<]*<\/[^>]+>/g, '');
}

function replaceBaseKeyword(num, oldKeyword, splitter) {
	var baseKeyword;
	if (keywordBaseList && (baseKeyword = keywordBaseList[num - 1])) {
		if (baseKeyword[0] != '/') {
			keyword = baseKeyword;
		} else {
			var baseAlternatives = baseKeyword.substr(1).split('/');
			keyword = oldKeyword;
			if (splitter) {
				keyword = keyword.replace(new RegExp(splitter, 'gi'), '/');
			}
			var alternatives = keyword.split('/');
			for (var baseAlt in baseAlternatives) {
				var found = false;
				var baseAlternative = baseAlternatives[baseAlt];
				for (var alt in alternatives) {
					if (alternatives[alt] == baseAlternative) { 
						found = true;
						break;
					}
				}
				if (!found) keyword += '/' + baseAlternative;
			}
		}
		if (splitter) {
			keyword = keyword.replace(/\//g, splitter);
		}
		return keyword;
	}
	if (!keywordEditionList || !(editionIdx = keywordEditionList[num - 1])) {
		return oldKeyword;
	}
	if (splitter) {
		oldKeyword = oldKeyword.replace(new RegExp(splitter, 'gi'), '/');
	}
	keywords = oldKeyword.split('/');
	if (keywords.length == 1) return oldKeyword;
	return keywords[editionIdx - 1];
}

function replaceKeyword(num, oldKeyword, splitter) {
	var keyword, editionIdx;
	if (!(keyword = keywordList[num - 1])) {
		return replaceBaseKeyword(num, oldKeyword, splitter);
	}
	if (!splitter) return keyword;
	return keyword.replace(/\//g, splitter);
}

function replaceKanji(num, oldKanji) {
	var kanji;
	if (!(kanji = kanjiList[num - 1])) return oldKanji;
	return kanji;
}

function replaceStrokeCount(num, oldStrokeCount) {
	var strokeCount;
	if (!(strokeCount = strokeCountList[num - 1])) return oldStrokeCount;
	return strokeCount;
}

function decodeCard(response) {
	var card;
	elRecurse(response, /^@\{"items":\[\{/, /\}\]\}$/, function (item) {
		card = new Object();
		elRecurse(item, /"([^"]+)":"/, /([^\\])"/, function (val, startAr, endAr) {
			val += endAr[1];
			card[startAr[1]] = val.removeSlashes();
		});
		return true;
	});
	return card;
}

function encodeCard(card) {
	var response = '@{"items":[{';
	var binder = '';
	for (var param in card) {
		response += binder + '"' + param + '":"' + card[param].addSlashes() + '"';
		binder = ',';
	}
	response += '}]}';
	return response;
}

function decode(keywordList, decodeString) {
	if (!decodeString) return;

	var idx = 0;
	decodeString = decodeString.trim();
	while (decodeString) {
		var ar;
		if (ar = /^#?(\d+)(\s+|$)/.exec(decodeString)) {
			idx = Number(ar[1]) - 1;
		} else if (ar = /^"((""|[^"])*)"(\s+|$)/.exec(decodeString)) {
			keywordList[idx] = ar[1].replace(/""/g, '"');
			idx++;
		} else {
			ar = /^(\S+)(\s+|$)/.exec(decodeString);
			keywordList[idx] = ar[1].replace(/_/g, " ");
			idx++;
		}
		decodeString = decodeString.substring(ar[0].length);
	}
}

function encode(keywordList) {
	if (!keywordList) return '';

	var numbers = new Array();
	for (var idx in keywordList) {
		if (keywordList[idx]) numbers.push(Number(idx));
	}
	numbers.sort(function (x, y) {return x - y;});
	
	var encodeWords = new Array();
	var nextIdx = 0;
	for (var i in numbers) {
		var idx = numbers[i];
		if (nextIdx != idx) encodeWords.push(idx + 1);
		nextIdx = idx + 1;
		var keyword = keywordList[idx];
		if (/^\d+$/.test(keyword) || /["_\t\n\r]/.test(keyword)) {
			encodeWords.push('"' + keyword.replace(/"/g, '""') + '"');
		} else {
			encodeWords.push(keyword.replace(/ /g, '_'));
		}
	}
	
	return encodeWords.join(' ');
}

function decodeUserList(listName) {
	var list = new Array();
	var userList = retrieveValue(listName);
	if (userList) {
		decode(list, unescape(userList));
	}
	return list;
}

function encodeUserList(listName, list) {
	storeValue(listName, escape(encode(list)));	
}

function splitId(id) {
	var ar = /^(([^-]+)-)?((\d)+\.)?(\d*)$/.exec(id);
	var lng = ar[2];
	if (!lng) lng = 'en';
	var book = ar[4];
	if (!book) book = 1;
	var ed = ar[5];
	if (!ed) ed = 0;
	return [ lng, book, ed ];
}

function decomposeSequence(sequence, act) {
	var count = 0;
	for (var idx in sequence) {
		var range = sequence[idx];
		if (typeof range == 'number') {
			act(range, count);
			count++;
		} else {
			if (range[0] <= range[1]) {
				for (var frameNr = range[0]; frameNr <= range[1]; frameNr++) {
					act(frameNr, count);
					count++;
				}
			} else {
				for (var frameNr = range[0]; frameNr >= range[1]; frameNr--) {
					act(frameNr, count);
					count++;
				}
			}
		}
	}
}

var multiEditionList;
var keywordBaseList;
function buildMultiEditions(lng, book, editions) {
	var previousEditionName = '';
	for (var ed in editions) {
		var tags = splitId(editions[ed].id);
		if ((tags[0] != lng) || (tags[1] != book)) continue;
		if (!tags[2]) {
			var keywords = editions[ed].keywords;
			if (keywords) {
				var numbers = editions[ed].numbers;
				if (!numbers) numbers = [[1, keywords.length]];
				decomposeSequence(numbers, function (frameNr, count) {
					var frameNum = frameNr - 1;
					var keyword = keywords[count];
					if (keyword) {
						if (!keywordBaseList) keywordBaseList = new Array();
						keywordBaseList[frameNum] = keyword;
					}
				});
			}
		} else {
			var editionName = editions[ed].short;
			var keywords = editions[ed].keywords;
			var numbers = editions[ed].numbers;
			if (previousEditionName) {
				decomposeSequence(numbers, function (frameNr, count) {
					var frameNum = frameNr - 1;
					if (!multiEditionList) multiEditionList = new Array();
					if (!multiEditionList[frameNum]) {
						multiEditionList[frameNum] = previousEditionName;
					}
					multiEditionList[frameNum] += '/' + editionName;
				});
			}
			if (keywords) {
				decomposeSequence(numbers, function (frameNr, count) {
					var frameNum = frameNr - 1;
					var keyword = keywords[count];
					if (keyword) {
						if (!keywordBaseList) keywordBaseList = new Array();
						if (!keywordBaseList[frameNum]) keywordBaseList[frameNum] = '/' + keyword;
						else keywordBaseList[frameNum] += '/' + keyword;
					}
				});
			}
			if (editionName) previousEditionName = editionName;
		}
	}
	return multiEditionList;
}

var keywordEditionList;
function selectEdition(key, defaultId, editions) {
	var editionId = retrieveValue(key);
	if (!editionId) editionId = defaultId;
	var editionTags = splitId(editionId);
	if (!editionTags[2]) {
		buildMultiEditions(editionTags[0], editionTags[1], editions);
		return;
	}
	var increase = true;
	for (var ed in editions) {
		var tags = splitId(editions[ed].id);
		if ((tags[0] != editionTags[0]) || (tags[1] != editionTags[1])) continue;
		if (!tags[2]) {
			var keywords = editions[ed].keywords;
			if (keywords) {
				var numbers = editions[ed].numbers;
				if (!numbers) numbers = [[1, keywords.length]];
				decomposeSequence(numbers, function (frameNr, count) {
					var frameNum = frameNr - 1;
					var keyword = keywords[count];
					if (keyword) {
						if (!keywordBaseList) keywordBaseList = new Array();
						keywordBaseList[frameNum] = keyword;
					}
				});
			}
		} else {
			var keywords = editions[ed].keywords;
			var numbers = editions[ed].numbers;
			decomposeSequence(numbers, function (frameNr, count) {
				var frameNum = frameNr - 1;
				if (!keywordEditionList) keywordEditionList = new Array();
				if (!keywordEditionList[frameNum]) {
					keywordEditionList[frameNum] = 1;
				}
				if (increase) {
					keywordEditionList[frameNum]++;
				}
			});
			if (increase && keywords) {
				decomposeSequence(numbers, function(frameNr, count) {
					var frameNum = frameNr - 1;
					var keyword = keywords[count];
					if (keyword) {
						if (!keywordBaseList) keywordBaseList = new Array();
						keywordBaseList[frameNum] = keyword;
					}
				});
			}
			if (tags[2] == editionTags[2]) increase = false;
		}
	}
}

// Decode user lists
var keywordList = decodeUserList('KeywordList');
var kanjiList = decodeUserList('KanjiList');
var strokeCountList = decodeUserList('StrokeCountList');

selectEdition('Edition', '', editions);
selectEdition('Edition3', '3.', editions);

function updateKeyword(num, newKeyword, oldKeyword, originalKeyword) {
	newKeyword = newKeyword.trim()
			.replace(/\s*[/|]\s*/g, '/').replace(/\/\/+/g, '/').replace(/^\//, '').replace(/\/$/, '')
			.replace(/\s+/g, ' ');
	if (newKeyword != oldKeyword) {
		if (!newKeyword) {
			keywordList[num - 1] = '';
			newKeyword = originalKeyword;
		} else if (newKeyword == originalKeyword) {
			keywordList[num - 1] = '';
		} else {
			keywordList[num - 1] = newKeyword;
		}
		if (unsafeWindow.kwlist) unsafeWindow.kwlist[num - 1] = newKeyword;
		encodeUserList('KeywordList', keywordList);
	}
	return newKeyword;
}

function updateKanji(num, newKanji, oldKanji, originalKanji) {
	newKanji = newKanji.trim();
	if (newKanji != oldKanji) {
		if (!newKanji) {
			kanjiList[num - 1] = '';
			newKanji = originalKanji;
		} else if (newKanji == originalKanji) {
			kanjiList[num - 1] = '';
		} else {
			kanjiList[num - 1] = newKanji;
		}
		if (unsafeWindow.kklist) unsafeWindow.kklist = unsafeWindow.kklist.substr(0, num - 1) + newKanji + unsafeWindow.kklist.substr(num);
		encodeUserList('KanjiList', kanjiList);
	}
	return newKanji;
}

function updateStrokeCount(num, newStrokeCount, oldStrokeCount, originalStrokeCount) {
	newStrokeCount = Number(newStrokeCount);
	if (isNaN(newStrokeCount) || newStrokeCount == 0) newStrokeCount = '';
	else newStrokeCount = String(newStrokeCount);
	if (newStrokeCount != oldStrokeCount) {
		if (!newStrokeCount) {
			strokeCountList[num - 1] = '';
			newStrokeCount = originalStrokeCount;
		} else if (newStrokeCount == originalStrokeCount) {
			strokeCountList[num - 1] = '';
		} else {
			strokeCountList[num - 1] = newStrokeCount;
		}
		encodeUserList('StrokeCountList', strokeCountList);
	}
	return newStrokeCount;
}

function alterTable(table, frameNumTitle, keywordTitle, kanjiTitle, strokeCountTitle, onYomiTitle) {
	if (!frameNumTitle) frameNumTitle = 'Framenum';
	if (!keywordTitle) keywordTitle = 'Keyword';
	if (!kanjiTitle) kanjiTitle = 'Kanji';
	if (!strokeCountTitle) strokeCountTitle = 'Strokecount';
	if (!onYomiTitle) onYomiTitle = 'OnYomi';

	if (!table) return;
	var rows = table.getElementsByTagName('tr');
	var headers = rows[0].getElementsByTagName('th');
	var titles = new Object();
	for (var idx = 0; idx < headers.length; idx++) {
		var links = headers[idx].getElementsByTagName('a');
		if (links.length) {
			titles[links[0].firstChild.data.trim()] = idx;
		}
	}
	if (typeof titles[frameNumTitle] == 'undefined') return;

	for (var idx = 1; idx < rows.length; idx++) {
		var contents = rows[idx].getElementsByTagName('td');
		var frameNum = contents[titles[frameNumTitle]].firstChild.data;
		if (!frameNum) continue;
		if (typeof titles[keywordTitle] != 'undefined') {
			var keyword = contents[titles[keywordTitle]];
			var links = keyword.getElementsByTagName('a');
			if (links.length) keyword = links[0];
			keyword.innerHTML = replaceKeyword(frameNum, keyword.innerHTML);
		}
		var isSameKanji = false;
		if (typeof titles[kanjiTitle] != 'undefined') {
			var kanji = contents[titles[kanjiTitle]].getElementsByTagName('span')[0];
			var originalKanji = kanji.firstChild.data;
			kanji.firstChild.data = replaceKanji(frameNum, originalKanji);
			isSameKanji = (originalKanji == kanji.firstChild.data);
		}
		if (typeof titles[strokeCountTitle] != 'undefined') {
			var strokeCount = contents[titles[strokeCountTitle]];
			var originalStrokeCount = isSameKanji ? strokeCount.innerHTML : '';
			strokeCount.innerHTML = replaceStrokeCount(frameNum, originalStrokeCount);
		}
		if (!isSameKanji && typeof titles[onYomiTitle] != 'undefined') {
			var onYomi = contents[titles[onYomiTitle]];
			onYomi.innerHTML = '';
		}
	}
}

function makeEditable(label, getValue, setValue, styling, boxStyling, maxLen, maxSize, leftMark, rightMark) {
	var editBox = document.createElement('div');
	label.parentNode.insertBefore(editBox, label.nextSibling);
	editBox.setAttribute('style', 'display:none;');
	var edit = document.createElement('input');
	var currentValue = getValue(label);
	if (leftMark) addText(editBox, leftMark);
	editBox.appendChild(edit);
	if (rightMark) addText(editBox, rightMark);

	with (edit) {
		value = currentValue;
		class = 'textfield';
		type = 'text';
		if (maxLen) maxLength = maxLen;
		if (maxSize) size = maxSize;
		setAttribute('style', styling);
		style.background = 'none';
		style.border = 0;
		addEventListener('keydown', function(e) {
			switch (e.which) {
			case 27: // Esc
				e.target.value = currentValue;
				break;
			case 13: // Enter
				currentValue = setValue(label, e.target.value);
				e.target.value = currentValue;
				break;
			default:
				return;
			}

			e.stopPropagation();
			e.preventDefault();

			label.style.display = 'block';
			editBox.style.display = 'none';
		}, true);
		addEventListener('blur', function(e) {
			currentValue = setValue(label, e.target.value);
			label.style.display = 'block';
			editBox.style.display = 'none';
		}, true);
	}
	label.addEventListener('click', function(e) {
		currentValue = getValue(label);
		edit.value = currentValue;
		editBox.setAttribute('style', 'display:block; ' + boxStyling);
		edit.focus();
		edit.select();
		label.style.display = 'none';
	}, true);
}

function alterStoryBox(alterKeyword, alterKanji, alterStrokeCount, interceptStoryBox) {
	var frameNumLabel = xpathi('//div[@class="framenum"]');
	if (!frameNumLabel) return;

	var frameNum = frameNumLabel.innerHTML;
	var keywordLabel = xpathi('//div[@class="keyword"]');
	var originalKeyword = keywordLabel.firstChild.nodeValue.trim();
	originalKeyword = replaceBaseKeyword(frameNum, originalKeyword);
	var originalContents = originalKeyword;
	if (multiEditionList && multiEditionList[frameNum - 1]) {
		originalContents += '<br><span class="edition">' + multiEditionList[frameNum - 1] + '</span>';
	}
	var currentKeyword = replaceKeyword(frameNum, originalKeyword);
	
	function getKeywordValue(keywordLabel) {
		return currentKeyword;
	}
	function setKeywordValue(keywordLabel, keyword) {
		if (keyword != currentKeyword) 
			currentKeyword = updateKeyword(frameNum, keyword, currentKeyword, originalKeyword);
		if (currentKeyword == originalKeyword) 
			keywordLabel.innerHTML = originalContents;
		else
			keywordLabel.innerHTML = currentKeyword;

		if (alterKeyword) alterKeyword(currentKeyword, originalKeyword);

		return currentKeyword;
	}
	
	setKeywordValue(keywordLabel, currentKeyword);
	makeEditable(keywordLabel, getKeywordValue, setKeywordValue,
		'font: 20px Georgia, Times New Roman; letter-spacing: 2px; text-align: right; border: 0; width:368px; ', 'text-align: right;');
	
	// Force boldening of keyword in story when submitting. Necessary, because after publishing
	// other people might not have selected the same keyword list.
	var frmFrame = xpathi('//form[@name="EditStory"]');
	if (frmFrame) {
		var txtStory = frmFrame.elements.namedItem('txtStory');
		var updateButton = frmFrame.elements.namedItem('doUpdate');
		if (txtStory && updateButton) {
			updateButton.addEventListener('click', function(e) {
				if (currentKeyword != originalKeyword) {
					var re = new RegExp(currentKeyword.addSlashes().replace(/\//g, '|'), 'gi');
					var storyParts = txtStory.value.split('#');
					for (var i = 0; i < storyParts.length; i += 2) {
						storyParts[i] = storyParts[i].replace(re, '#$&#');
					}
					txtStory.value = storyParts.join('#');
				}
				if (interceptStoryBox) interceptStoryBox();
			}, true);
		}
	}

	// Stroke count
	var strokeCountLabel = xpathi('//span[@class="strokecount"]');
	var originalStrokeCount = strokeCountLabel.firstChild.data;
	originalStrokeCount = originalStrokeCount.substr(1, originalStrokeCount.length - 2);
	var currentStrokeCount = replaceStrokeCount(frameNum, originalStrokeCount);

	function getStrokeCountValue(strokeCountLabel) {
		return currentStrokeCount;
	}
	function setStrokeCountValue(strokeCountLabel, strokeCount) {
		if (currentStrokeCount != strokeCount) 
			currentStrokeCount = updateStrokeCount(frameNum, strokeCount, currentStrokeCount, originalStrokeCount);
		strokeCountLabel.firstChild.data = '[' + currentStrokeCount + ']';

		if (alterStrokeCount) alterStrokeCount(currentStrokeCount, originalStrokeCount);

		return currentStrokeCount;
	}
	
	setStrokeCountValue(strokeCountLabel, currentStrokeCount);
	makeEditable(strokeCountLabel, getStrokeCountValue, setStrokeCountValue,
		'text-align:right; color:#8e8e8e; font:100%/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif;', 'text-align: center; color:#8e8e8e;',
		2, 2, '[', ']');

	// Kanji
	var kanjiLabel = xpathi('//div[@class="kanji"]/span');
	var originalKanji = kanjiLabel.firstChild.data;
	var currentKanji = replaceKanji(frameNum, originalKanji);

	var shareCheckBox = document.getElementById('chkPublic').parentNode;

	var knownStrokeCounts = new Object();
	if (currentKanji != originalKanji) {
		currentStrokeCount = replaceStrokeCount(frameNum, '');
		setStrokeCountValue(strokeCountLabel, currentStrokeCount);
	}
	if (currentStrokeCount) knownStrokeCounts[currentKanji] = currentStrokeCount;
	var primaryStrokeCount = originalStrokeCount;

	function getKanjiValue(kanjiLabel) {
		return currentKanji;
	}
	function setKanjiValue(kanjiLabel, kanji) {
		if (currentKanji != kanji) currentKanji = updateKanji(frameNum, kanji, currentKanji, originalKanji);
		kanjiLabel.firstChild.data = currentKanji;

		// Hide/unhide
		originalStrokeCount = '';
		if (currentKanji == originalKanji) {
			shareCheckBox.setAttribute('style', 'display:block; float:left;');
			originalStrokeCount = primaryStrokeCount;
		} else {
			shareCheckBox.setAttribute('style', 'display:none;');
		}

		// Stroke count
		var actualStrokeCount = originalStrokeCount;
		if (knownStrokeCounts[currentKanji]) actualStrokeCount = knownStrokeCounts[currentKanji];
		actualStrokeCount = setStrokeCountValue(strokeCountLabel, actualStrokeCount);

		if (alterKanji) alterKanji(currentKanji, originalKanji);
		if (alterStrokeCount) alterStrokeCount(actualStrokeCount, originalStrokeCount);

		return currentKanji;
	}

	setKanjiValue(kanjiLabel, currentKanji);
	makeEditable(kanjiLabel, getKanjiValue, setKanjiValue, 
		'font:50pt "MS Mincho", serif; margin-top:10px;', 'float:left;', 1, 2);
}

// Profile page
if (matchSitePage('/profile') != null) {
	// Check if it's the current user's profile.
	if (!matchProfileName()) return;

	function addSelector(div, name, key, book) {
		addText(div, name + ' edition: ');
		
		var editionSelector = addChild(div, 'select');
		for (var ed in editions) {
			var tags = splitId(editions[ed].id);
			if (tags[1] == book) addOption(editionSelector, editions[ed].id, editions[ed].name, editions[ed].short);
		}
		
		var edition = retrieveValue(key);
		if (edition) {
			var editionTags = splitId(edition);
			for (var idx = 0; idx < editionSelector.length; idx++) {
				var tags = splitId(editionSelector.options[idx].value);
				if (editionTags[0] == tags[0] && editionTags[1] == tags[1] && editionTags[2] == tags[2]) {
					editionSelector.selectedIndex = idx;
					break;
				}
			}
		}
		editionSelector.addEventListener('change', function(e) {
			storeValue(key, editionSelector.options[editionSelector.selectedIndex].value);
		}, true);
	}
	
	var div = createGreaseMonkeyDivision('Option|Edition');
	addSelector(div, 'RtK1', 'Edition', 1);
	addChild(div, 'br');
	addSelector(div, 'RtK3', 'Edition3', 3);

	return;
}

// Review summary page
if (matchSitePage('/review/summary') != null) {
	setInterval(function () {
		alterTable(xpathi('//table[@class="uiTabular"]'));
	}, 500);

	return;
}

// Full kanji list page
if (matchSitePage('/review/flashcardlist') != null) {
	setInterval(function () {
		alterTable(xpathi('//table[@class="uiTabular"]'));
	}, 500);

	return;
}

// Manage kanji list page
if (matchSitePage('/manage/removelist') != null) {
	setInterval(function () {
		alterTable(xpathi('//table[@class="uiTabular"]'), 'Index');
	}, 500);

	return;
}

// Sight reading page
if (matchSitePage('/sightreading') != null) {
	var result = xpathi('//div[@id="results"]/p[@class="j"]');
	if (!result) return;
	if (!kanjiList.length) {
		var anchors = result.getElementsByTagName('a');
		for (var idx = 0; idx < anchors.length; idx++) {
			var anchor = anchors[idx];
			var frameNum = extractFrameNum(anchor.href);
			if (!frameNum) continue;
			anchor.title = replaceKeyword(frameNum, anchor.title);
		}
		return;
	}
	// In case the script "Alter sequence" is active, use its reevalution function.
	if (unsafeWindow.alterResult) {
		adaptKeywords();
		unsafeWindow.alterResult();
		return;
	}
	var curFrameNr = getCurrentFrameNr();
	if (!curFrameNr) return;
	initKeywords();
	adaptKeywords();
	var text = extractText(result);
	result.innerHTML = '';
	var normalText = '';
	for (var idx = 0; idx < text.length; idx++) {
		var char = text[idx];
		var frameNr = unsafeWindow.kklist.indexOf(char) + 1;
		if (frameNr == 0 || frameNr > curFrameNr) {
			normalText += char;
			continue;
		}
		if (normalText) {
			addText(result, normalText);
			normalText = '';
		}
		addText(addChild(result, 'a', {
			href: linkSitePage('/study/kanji/' + frameNr),
			className: 'j',
			title: unsafeWindow.kwlist[frameNr - 1]
		}), char);
	}
	if (normalText) {
		addText(result, normalText);
	}

	return;
}

// Review page
if (matchSitePage('/review') != null) {
	var that = unsafeWindow.rkKanjiReview;
	var frameNumLabel = document.getElementById('framenum');
	if (!that || !frameNumLabel) return;
	var keywordDiv = document.getElementById('keyword');
	var kanjiLabel = xpathi('//span[@class="fcData fcData-kanji"]');
	var strokeCountLabel = xpathi('//span[@class="fcData fcData-strokecount"]');
	var strokeCountDiv = document.getElementById('strokecount');

	var newCard = true;
	if (that.onFlashcardState) {
		var originalOnFlashcardState = that.onFlashcardState;
		that.onFlashcardState = function (faceup) {
			if (faceup) return originalOnFlashcardState.call(that, faceup);
			newCard = true;
			var frameNr = parseInt(frameNumLabel.textContent);
			if (isNaN(frameNr)) return originalOnFlashcardState.call(that, faceup);

			var keywordLabel = keywordDiv.getElementsByTagName('a')[0];
			var originalKeyword = replaceBaseKeyword(frameNr, keywordLabel.innerHTML.replace(/\s+<span[^>]*>[^<]*<\/[^>]+>/g, '').replace(/<br\s*\/?>/, '/'), '/');
			keywordLabel.innerHTML = replaceKeyword(frameNr, originalKeyword, '/');
			if ((keywordLabel.innerHTML == originalKeyword) && multiEditionList && multiEditionList[frameNr - 1]) {
				var keywords = originalKeyword.split('/');
				var editions = multiEditionList[frameNr - 1].split('/');
				for (var idx in keywords) {
					keywords[idx] += ' <span class="edition">' + editions[idx] + '</span>';
				}
				keywordLabel.innerHTML = keywords.join('<br />');
			}
			var originalKanji = kanjiLabel.firstChild.data;
			kanjiLabel.firstChild.data = replaceKanji(frameNr, originalKanji);
			if (kanjiLabel.firstChild.data != originalKanji) {
				strokeCountLabel.firstChild.data = '';
			}
			strokeCountLabel.firstChild.data = replaceStrokeCount(frameNr, strokeCountLabel.firstChild.data);
			if (!strokeCountLabel.firstChild.data) {
				strokeCountDiv.style.display = 'none';
			} else {
				strokeCountDiv.style.display = 'block';
			}

			return originalOnFlashcardState.call(that, faceup);
		}
	}
	
	if (that.onAction) {
		function interceptStoryBox () {
			var intervalId = setInterval(function () {
				var storyFrameNumLabel = xpathi('//div[@class="framenum"]');
				if (storyFrameNumLabel && (storyFrameNumLabel.textContent == frameNumLabel.textContent)) {
					clearInterval(intervalId);
					alterStoryBox(function (currentKeyword, originalKeyword) {
						keywordLabel.innerHTML = currentKeyword.replace(/\//g, '<br />');
						var frameNr = parseInt(frameNumLabel.textContent);
						if ((currentKeyword == originalKeyword) && multiEditionList && multiEditionList[frameNr - 1]) {
							var keywords = originalKeyword.split('/');
							var editions = multiEditionList[frameNr - 1].split('/');
							for (var idx in keywords) {
								keywords[idx] += ' <span class="edition">' + editions[idx] + '</span>';
							}
							keywordLabel.innerHTML = keywords.join('<br />');
						}
					}, function (currentKanji, originalKanji) {
						kanjiLabel.firstChild.data = currentKanji;
						if (kanjiLabel.firstChild.data != originalKanji) {
							strokeCountLabel.firstChild.data = '';
						}
					}, function (currentStrokeCount, originalStrokeCount) {
						strokeCountLabel.firstChild.data = currentStrokeCount;
						if (!strokeCountLabel.firstChild.data) {
							strokeCountDiv.style.display = 'none';
						} else {
							strokeCountDiv.style.display = 'block';
						}
					}, function () {
						// Change frame number to enable detecting when the story box becomes updated.
						storyFrameNumLabel.firstChild.data = '#' + storyFrameNumLabel.firstChild.data;
						interceptStoryBox();
					});
				}
			}, 200);
		}
		var originalOnAction = that.onAction;
		that.onAction = function (sActionId) {
			originalOnAction.call(that, sActionId);
			if (sActionId != 'story') return;
			if (newCard) {
				interceptStoryBox();
				newCard = false;
			}
		}
	}
	
	return;
}

// Study page
if (matchSitePage('/study') != null) {
	adaptKeywords();

	var failedKanjis = xpath('//div[@class="failed-kanji"]//li');
	for (var idx = 0; idx < failedKanjis.snapshotLength; idx++) {
		var failedKanji = failedKanjis.snapshotItem(idx);
		var failedKeyword = failedKanji.getElementsByTagName('a')[0];
		failedKeyword.innerHTML = replaceKeyword(extractFrameNum(failedKeyword.getAttribute('href')), failedKeyword.innerHTML, '<br>');
	}

	// Substitute keyword for index when browsing.
	var that = unsafeWindow.StudyPage;
	if (that && that.quicksearchOnChangeCallback) {
		var originalQuicksearchOnChangeCallback = that.quicksearchOnChangeCallback;
		that.quicksearchOnChangeCallback = function (val) {
			if (val && !/^\d*$/.test(val)) {
				if (val.length == 1) {
					for (var idx = 0; idx < unsafeWindow.kklist.length; idx++) {
						if (val == unsafeWindow.kklist[idx]) {
							return originalQuicksearchOnChangeCallback.call(that, (idx + 1).toString());
						}
					}
				}
				for (var idx = 0; idx < unsafeWindow.kwlist.length; idx++) {
					var keyword = unsafeWindow.kwlist[idx];
					if (val == keyword) {
						return originalQuicksearchOnChangeCallback.call(that, (idx + 1).toString());
					} else {
						var keywords = unsafeWindow.kwlist[idx].split('/');
						if (keywords.length > 1) {
							for (var kwIdx = 0; kwIdx < keywords.length; kwIdx++) {
								if (val == keywords[kwIdx]) {
									return originalQuicksearchOnChangeCallback.call(that, (idx + 1).toString());
								}
							}
						}
					}
				}
			}
			return originalQuicksearchOnChangeCallback.call(that, val);
		}

		var txtSearch = document.getElementById('txtSearch');
		if (txtSearch) {
			//var actb2 = new Object();
			//unsafeWindow.actb.call(actb2, txtSearch, ['10', '22']);
			//actb2.onChangeCallback = that.quicksearchOnChangeCallback.bind(unsafeWindow.Study);
			//actb2.onPressEnterCallback = that.quicksearchEnterCallback.bind(unsafeWindow.Study);
			//actb2.actb_extracolumns = function(iRow) {
			//	GM_log(iRow);
			//	return '<span class="framenum">'+(iRow+1)+'</span><span class="k">&#'+unsafeWindow.kklist.charCodeAt(iRow)+';</span>';
			//}
			function getFrameNum(val) {
				if (/^\d+$/.test(val)) {
					var frameNum = parseInt(val);
					if ((frameNum <= 0) || (frameNum > unsafeWindow.kwlist.length)) return 0;
					return frameNum;
				} else if (val.length == 1) {
					for (var idx = 0; idx < unsafeWindow.kklist.length; idx++) {
						if (val == unsafeWindow.kklist[idx]) {
							return idx + 1;
						}
					}
				}
				return 0;
			}
			var frameCell;
			var frameNum;
			function showFrameCell(val) {
				var boxDiv = document.getElementById('actbdiv2');
				if (boxDiv && !frameCell) return;
				if (!val || !(frameNum = getFrameNum(val))) {
					if (boxDiv) {
						boxDiv.parentNode.removeChild(boxDiv);
					}
					frameCell = null;
					return;
				}
				var keyword = unsafeWindow.kwlist[frameNum-1];
				var kanji = unsafeWindow.kklist[frameNum-1];
				if (boxDiv && frameCell) {
					frameCell.firstChild.firstChild.data = frameNum;
					frameCell.firstChild.nextSibling.firstChild.data = kanji;
					frameCell.lastChild.data = keyword;
				} else {
					// Recreate suggestion box
					frameCell = addChild(addChild(addChild(addChild(addChild(xpathi('//body'), 'div', {
						id: 'actbdiv2'
					}, 'position: absolute; top: 216px; left: 34px;'), 'table', {
						id: 'actb-txtSearch',
						cellSpacing: '0'
					}, 'position: absolute'), 'tbody'), 'tr', {
						id: 'tat_tr1',
						className: 'highlight'
					}), 'td', {
						id: 'tat_td1',
						pos: '1'
					});
					addText(addChild(frameCell, 'span', {
						className: 'framenum'
					}), frameNum);
					addText(addChild(frameCell, 'span', {
						className: 'k'
					}), kanji);
					addText(frameCell, keyword);
					frameCell.addEventListener('click', function (e) {
						originalQuicksearchOnChangeCallback.call(that, frameNum + '');
					}, true);
				}
			}
			txtSearch.addEventListener('keyup', function (e) {
				showFrameCell(e.target.value);
			}, true);
			txtSearch.addEventListener('blur', function (e) {
				setTimeout(function () {
					var boxDiv = document.getElementById('actbdiv2');
					if (boxDiv) {
						boxDiv.parentNode.removeChild(boxDiv);
					}
					frameCell = null;
				}, 200);
			}, true);
			for (var idx = 0; idx < document.styleSheets.length; idx++) {
				var styleSheet = document.styleSheets[idx];
				var rulesLength = styleSheet.cssRules.length;
				for (var idx2 = 0; idx2 < rulesLength; idx2++) {
					var cssRule = styleSheet.cssRules[idx2];
					if (/#actbdiv\W/.test(cssRule.selectorText)) {
						styleSheet.insertRule(cssRule.cssText.replace(/#actbdiv/g, '#actbdiv2'), styleSheet.cssRules.length);
					}
				}
			}
		}
	}

	// Failed kanji list
	if (matchSitePage('/study/failedlist') != null) {
		// Better would be to register with the event dispatcher for the uiAjaxTable. But how do we get hold of it?
		setInterval(function () {
			var failedKeywords = xpath('//div[@id="FailedListTable"]//td/a');
			for (var idx = 0; idx < failedKeywords.snapshotLength; idx++) {
				var keyword = failedKeywords.snapshotItem(idx);
				var frameNum = extractFrameNum(keyword.getAttribute('href'));
				if (!frameNum) continue;
				keyword.innerHTML = replaceKeyword(frameNum, keyword.innerHTML);
			}
		}, 500);
		
		return;
	} 

	// My stories
	if (matchSitePage('/study/mystories') != null) {
		var myStories = xpath('//li[@class="rtkframe"]/a[@class="wrapper"]');
		for (var idx = 0; idx < myStories.snapshotLength; idx++) {
			var myStory = myStories.snapshotItem(idx);
			var frameNum = extractFrameNum(myStory.href);
			var spans = myStory.getElementsByTagName('span');
			for (var spanIdx = 0; spanIdx < spans.length; spanIdx++) {
				var span = spans[spanIdx];
				if (span.className == 'keywo') {
					span.innerHTML = replaceKeyword(frameNum, span.innerHTML);
				} else if (span.className == 'kanji') {
					var kanji = span.getElementsByTagName('span')[0];
					if (kanji) kanji.firstChild.data = replaceKanji(frameNum, kanji.firstChild.data);
				}
			}
		}
		
		return;
	}

	// Frame
	if (matchSitePage('/study/kanji') != null) {
		var originalTitle = document.title;
		var keywordFailed = xpathi('//div[@class="failed-kanji"]//li[@class="selected"]');;
		var mainSection = xpathi('//div[@class="col-main col-box"]');
		alterStoryBox(function (currentKeyword, originalKeyword) {
			// title
			document.title = document.title.replace(/".+"/, '"' + currentKeyword + '"');
			// failed kanji
			if (keywordFailed) {
				keywordFailed.lastChild.innerHTML = replaceKeyword(frameNum, originalKeyword).replace(/\//g, '<br>');
			}
		}, function (currentKanji, originalKanji) {
			// title
			document.title = document.title.replace(/" . \|/, '" ' + currentKanji + ' |');
			// Hide/unhide
			if (currentKanji == originalKanji) {
				if (mainSection) mainSection.setAttribute('style', 'display:block;');
			} else {
				if (mainSection) mainSection.setAttribute('style', 'display:none;');
			}
		});

		return;
	}
	
	return;
}
