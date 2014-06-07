// ==UserScript==
// @version	       2.4
// @name           OGameRediseño Recursos Ampliados
// @author         HoChiChaos
// @update			Jhon fredy Triana 2012-05-13  jhonfisc@gmail.com
// @date           2010-05-01
// @namespace      OGame
// @description    OGameRediseño Recursos Ampliados. Enlarged Display resources for OGame version 1.x, actualizado para ogame v4.x
// @include        http://*.ogame.*/game/index.php?page=resourceSettings*
// @include        http://*.ogame.*/game/index.php?page=overview*
// @include        http://*.ogame.*/game/index.php?page=resources*
// ==/UserScript==


(function () {
    
    
var UPDATE = {
     name: "OGameRediseño Recursos Ampliados"
    ,check: "http://userscripts.org/scripts/source/133297.meta.js"
    ,install: "http://userscripts.org/scripts/source/133297.user.js"
    ,version: "2.4"
    ,msg: ""
    ,minHours: 5
};
    
var LANG_ES = {
    newVer: "Nueva versión de 'RECURSOS AMPLIADOS' disponible (click aquí para instalar)"
    ,domain: ".ogame.com.es || .ogame.es"
    ,produccion_imp: "Producción imperial de "
    ,recplaneta: "Recursos diarios por planeta "
    ,almacen_tiempo: "Almacén y tiempo de llenado"
    ,metal: "Metal"
    ,cristal: "Cristal"
    ,deuterio: "Deuterio"
    ,metal_geo: "Metal (Geólogo)"
    ,cristal_geo: "Cristal (Geólogo)"
    ,deuterio_geo: "Deuterio (Geólogo)"
    ,total: "Total (M+C+D)"
    ,en_metal: "En Metal (ratio 3x2x1)"
    ,diaria: "Diaria"
    ,semanal: "Semanal"
    ,mensual: "Mensual"
    ,planetas: "planetas"
    ,produccion: "Producción"
    ,excedentes: "Excedentes día"
    ,dia: "Día"
    ,semana: "Semana"
    ,hora: "Hora"
    ,falta_rec: "Falta obtener recursos de"
    ,produccion_flota: "Producción estimada de flota"
    ,produccion_def: "Producción estimada de defensas"
    ,producc_diaria: "Producción diaria de"
    ,sin_geologo: "SIN Geólogo"
    ,con_geologo: "CON Geólogo"
    ,bbcode_sin: "BBCode para foro (SIN Geólogo)"
    ,bbcode_con: "BBCode para foro (CON Geólogo)"
    ,bbcode: "BBCode para foro"
    ,msg_error: "¿Error en los datos?<br>Prueba a instalar la última version del script y si el error continua pásate por el foro a comentar el error"
    ,translate_by: ""
    
    ,p_carga: "P. Carga"
    ,g_carga: "G. Carga"
    ,c_ligero: "C. Ligero"
    ,c_pesado: "C. Pesado"
    ,crucero: "Crucero"
    ,nbatalla: "N. Batalla"
    ,colonizador: "Colonizador"
    ,reciclador: "Reciclador"
    ,sonda: "Sonda Esp."
    ,bombardero: "Bombardero"
    ,destructor: "Destructor"
    ,edlm: "EDLM"
    ,acorazado: "Acorazado"
    ,satelite: "Sat. Solar"
    
    ,lanzamisiles: "Lanzamisiles"
    ,laser_peq: "Láser Pequeño"
    ,laser_gra: "Láser Grande"
    ,c_gaus: "Cañón Gauss"
    ,c_ionico: "Cañón Iónico"
    ,c_plasma: "Cañón Plasma"
    ,m_anti: "M. Antibalístico"
    ,m_plan: "M. Interplan."
    
    ,h_hora: "h"
    ,d_dia: "d"
    ,s_semana: "s"
};
    

var LANG_EN = {
    newVer: "There is a new version of 'Extended Resources' available (click here to install)"
    ,domain: "*"
    ,produccion_imp: "Imperial Production for "
    ,recplaneta: "Daily resources per planet"
    ,almacen_tiempo: "Storage and filling time"
    ,metal: "Metal"
    ,cristal: "Crystal"
    ,deuterio: "Deuterium"
    ,metal_geo: "Metal (Geologist)"
    ,cristal_geo: "Crystal (Geologist)"
    ,deuterio_geo: "Deuterium (Geologist)"
    ,total: "Total (M+C+D)"
    ,en_metal: "In metal (3x2x1 ratio)"
    ,diaria: "Daily"
    ,semanal: "Weekly"
    ,mensual: "Monthly"
    ,planetas: "planets"
    ,produccion: "Production"
    ,excedentes: "Excess per day"
    ,dia: "Day"
    ,semana: "Week"
    ,hora: "Hourly"
    ,falta_rec: "Failed to obtain resources"
    ,produccion_flota: "Estimated fleet production"
    ,produccion_def: "Estimated defense production"
    ,producc_diaria: "Daily Production"
    ,sin_geologo: "No Geologist"
    ,con_geologo: "With Geologist"
    ,bbcode_sin: "BBCode for forum (NO geologist)"
    ,bbcode_con: "BBCode for forum (WITH geologist)"
    ,bbcode: "BBCode for forum"
    ,msg_error: "Error in the data?<br>Try installing the latest version of the script and if<br>the error remains come by the forum to report it.<br><br>Do you want the script in your language? Help us translate it."
    ,translate_by: "English Translation by: MasterMind33"
    
    ,p_carga: "Small Cargo"
    ,g_carga: "Large Cargo"
    ,c_ligero: "Light Fighter"
    ,c_pesado: "Heavy Fighter"
    ,crucero: "Cruiser"
    ,nbatalla: "Battleship"
    ,colonizador: "Colony Ship"
    ,reciclador: "Recycler"
    ,sonda: "Espionage Probe"
    ,bombardero: "Bomber"
    ,destructor: "Destroyer"
    ,edlm: "Deathstar"
    ,acorazado: "Battlecruiser"
    ,satelite: "Solar Satellite"
    
    ,lanzamisiles: "Rocket Launcher"
    ,laser_peq: "Light Laser"
    ,laser_gra: "Heavy Laser"
    ,c_gaus: "Gauss Cannon"
    ,c_ionico: "Ion Cannon"
    ,c_plasma: "Plasma Turret"
    ,m_anti: "Anti-Ballistic M."
    ,m_plan: "Interp. M."
    
    ,h_hora: "h"
    ,d_dia: "d"
    ,s_semana: "w"
};

var LANG_FR = {
    newVer: "Nouvelle version disponible (CLIQUEZ ICI POUR INSTALLER)"
    ,domain: ".ogame.fr"
    ,produccion_imp: "Production Empire de "
    ,recplaneta: "Ressources par planète"
    ,almacen_tiempo: "Délai de remplissage des hangars"
    ,metal: "Métal"
    ,cristal: "Cristal"
    ,deuterio: "Deutérium"
    ,metal_geo: "Métal (Géologue)"
    ,cristal_geo: "Cristal (Géologue)"
    ,deuterio_geo: "Deutérium (Géologue)"
    ,total: "Total (M+C+D)"
    ,en_metal: "Métal (ratio 3x2x1)"
    ,diaria: "Quotidien"
    ,semanal: "Hebdomadaire"
    ,mensual: "Mensuel"
    ,planetas: "planètes"
    ,produccion: "Production"
    ,excedentes: "Excédent"
    ,dia: "Jour"
    ,semana: "Semaine"
    ,hora: "Horaire"
    ,falta_rec: "Ressources nécessaires à obtenir"
    ,produccion_flota: "Production de Flotte"
    ,produccion_def: "Production de Défense"
    ,producc_diaria: "Production quotidienne"
    ,sin_geologo: "sans Géologue"
    ,con_geologo: "avec Géologue"
    ,bbcode_sin: "BBCode pour forum (SANS geologist)"
    ,bbcode_con: "BBCode pour forum (AVEC geologist)"
    ,bbcode: "BBCode pour forum"
    ,msg_error: "Une erreur dans les données ? Essayez d'installer la dernière version du script.<br>Si l'erreur persiste, utilisez le forum pour la signaler.<br>Vous voulez le script dans votre langue ? Aidez nous à le traduire."
    ,translate_by: "Traduit par Carlton2001"
    
    ,p_carga: "P.Transporteur"
    ,g_carga: "G.Transporteur"
    ,c_ligero: "Chasseur Léger"
    ,c_pesado: "Chasseur Lourd"
    ,crucero: "Croiseur"
    ,nbatalla: "V.Bataille"
    ,colonizador: "V.Colonisation"
    ,reciclador: "Recycleur"
    ,sonda: "Sonde"
    ,bombardero: "Bombardier"
    ,destructor: "Destructeur"
    ,edlm: "Etoile de la Mort"
    ,acorazado: "Traqueur"
    ,satelite: "Satellite Solaire"
    
    ,lanzamisiles: "L.Missiles"
    ,laser_peq: "Laser Léger"
    ,laser_gra: "Laser Lourd"
    ,c_gaus: "Canon de Gauss"
    ,c_ionico: "Artillerie à Ions"
    ,c_plasma: "L.Plasma"
    ,m_anti: "M.Interception"
    ,m_plan: "M.Interplanétaire"
    
    ,h_hora: "h"
    ,d_dia: "j"
    ,s_semana: "s"
};
    

var LANG_BG = {
    newVer: "Има нова версия (ЦЪКНЕТЕ ТУК, ЗА ДА Я ИНСТАЛИРАТЕ)"
    ,domain: "*"
    ,produccion_imp: "Производство на империята, "
    ,recplaneta: "Ресурси на планетите"
    ,almacen_tiempo: "Време до запълване на складовете"
    ,metal: "Метал"
    ,cristal: "Кристали"
    ,deuterio: "Деутериум"
    ,metal_geo: "Метал (Геолог)"
    ,cristal_geo: "Кристали (Геолог)"
    ,deuterio_geo: "Деутериум (Геолог)"
    ,total: "Общо (М+К+Д)"
    ,en_metal: "Екв. метал (3:2:1)"
    ,diaria: "Дневно"
    ,semanal: "Седмично"
    ,mensual: "Месечно"
    ,planetas: "планети"
    ,produccion: "Производство"
    ,excedentes: "Остават"
    ,dia: "Ден"
    ,semana: "Седмица"
    ,hora: "На час"
    ,falta_rec: "Ресурси, необходими за получаването на"
    ,produccion_flota: "Могат да се произведат следните кораби"
    ,produccion_def: "Могат да се произведат следните защити"
    ,producc_diaria: "Дневно производство"
    ,sin_geologo: "Без Геолог"
    ,con_geologo: "С Геолог"
    ,bbcode_sin: "BBCode за форума (БЕЗ Геолог)"
    ,bbcode_con: "BBCode за форума (С Геолог)"
    ,bbcode: "BBCode за форума"
    ,msg_error: "Грешки в данните?<br>Пробвайте да инсталирате последната версия на скрипта и<br>ако все още има грешка, моля използвайте форума, за да съобщите за грешката.<br>Искате ли този скрипт да работи на Вашия език? Помогнете ни да го преведем."
    ,translate_by: "Български превод: Веселин Бончев"
    
    ,p_carga: "М. Транс."
    ,g_carga: "Г. Транс."
    ,c_ligero: "Л. Изтребители"
    ,c_pesado: "Т. Изтребители"
    ,crucero: "Кръстосвачи"
    ,nbatalla: "Бойни Кораби"
    ,colonizador: "Колонизатори"
    ,reciclador: "Рециклатори"
    ,sonda: "Шпионски Сонди"
    ,bombardero: "Бомбардировачи"
    ,destructor: "Унищожители"
    ,edlm: "Зв. на Смъртта"
    ,acorazado: "Б. Кръстосвачи"
    ,satelite: "С. Сателити"
    
    ,lanzamisiles: "Р. Установки"
    ,laser_peq: "Леки Лазери"
    ,laser_gra: "Тежки Лазери"
    ,c_gaus: "Гаус Оръдия"
    ,c_ionico: "Йонни Оръдия"
    ,c_plasma: "Плазм. Оръдия"
    ,m_anti: "АБР"
    ,m_plan: "МПР"
    
    ,h_hora: "ч"
    ,d_dia: "д"
    ,s_semana: "с"
};

var LANG_RU = {
    newVer: "Новая версия доступна (для  установки щелкните здесь)"
    ,domain: "*"
    ,produccion_imp:  "Выработка империи "
    ,recplaneta: "Выработка в сутки"
    ,almacen_tiempo: "Обьем и время заполнения хранилищ"
    ,metal: "Металл"
    ,cristal: "Кристалл"
    ,deuterio:  "Дейтерий"
    ,metal_geo: "Металл (Геолог)"
    ,cristal_geo:  "Кристалл (Геолог)"
    ,deuterio_geo: "Дейтерий (Геолог)"
    ,total: "Всего (М+К+Д)"
    ,en_metal: "В пересчете на металл (пропорции  3x2x1)"
    ,diaria: "Ежедневно"
    ,semanal: "Еженедельно"
    ,mensual: "Ежемесячно"
    ,planetas: "Планет"
    ,produccion: "Производительность"
    ,excedentes: "Излишки ресурсов"
    ,dia: "День"
    ,semana: "Неделя"
    ,hora: "За час"
    ,falta_rec:  "Необходиима информация о ресурсах"
    ,produccion_flota:  "Предположительное производство флота"
    ,produccion_def:  "Предположительное производство обороны"
    ,producc_diaria:  "Дневная производительность"
    ,sin_geologo: "Без геолога"
    ,con_geologo: "С геологом"
    ,bbcode_sin: "BBCode для форума (без  геолога)"
    ,bbcode_con: "BBCode для форума (с геологом)"
    ,bbcode: "BBCode для форума"
    ,msg_error: "Ошибка в  файле/данных?<br>Установите последнюю версию скрипта  и<br>если ошибка все еще присутствует, сообщите о ней на нашем форуме.<br>Ты хочеш скрипт на своем языке? Помоги нам перевести  его."
    ,translate_by: "Перевод: Hao и ImperatorT"
    
    ,p_carga: "Малый  транспорт"
    ,g_carga: "Большой транспорт"
    ,c_ligero:  "Лёгкий истребитель"
    ,c_pesado: "Тяжёлый истребитель"
    ,crucero: "Крейсер"
    ,nbatalla: "Линкор"
    ,colonizador:  "Колонизатор"
    ,reciclador: "Переработчик"
    ,sonda:  "Шпионский зонд"
    ,bombardero: "Бомбардировщик"
    ,destructor: "Уничтожитель"
    ,edlm: "Звезда смерти"
    ,acorazado: "Линейный крейсер"
    ,satelite: "Солнечный спутник"
     
    ,lanzamisiles: "Ракетная установка"
    ,laser_peq:  "Лёгкий лазер"
    ,laser_gra: "Тяжёлый лазер"
    ,c_gaus: "Пушка  Гаусса"
    ,c_ionico: "Ионное орудие"
    ,c_plasma: "Плазменное  орудие"
    ,m_anti: "Ракета-перехватчик"
    ,m_plan:  "Межпланетная ракета"
    
    ,h_hora: "ч"
    ,d_dia: "д"
    ,s_semana: "н"
};

var LANG_TW = { 
	newVer: "新版本 (點擊此處安裝)" 
	,domain: "*" 
	,produccion_imp: "帝國生產量, " 
	,recplaneta: "行星產量" 
	,almacen_tiempo: "距離儲存槽滿的時間" 
	,metal: "金屬" 
	,cristal: "晶體" 
	,deuterio: "重氫" 
	,metal_geo: "金屬 (地質學家)" 
	,cristal_geo: "晶體 (地質學家)" 
	,deuterio_geo: "重氫 (地質學家)" 
	,total: "加總 (金+晶+氫)" 
	,en_metal: "對金屬 (比例：3x2x1)" 
	,diaria: "每日" 
	,semanal: "每週" 
	,mensual: "每月" 
	,planetas: "行星" 
	,produccion: "生產" 
	,excedentes: "儲存槽" 
	,dia: "日" 
	,semana: "週" 
	,hora: "Time"
	,falta_rec: "尚需資源" 
	,produccion_flota: "預估生產艦隊" 
	,produccion_def: "預估生產防禦" 
	,producc_diaria: "日產" 
	,sin_geologo: "沒有地質學家" 
	,con_geologo: "擁有地質學家" 
	,bbcode_sin: "論壇的BBCode（沒有地質學家）" 
	,bbcode_con: "論壇的BBCode（擁有地質學家）" 
	,bbcode: "論壇的BBCode" 
	,msg_error: "發生錯誤？<br>嘗試安裝最新版本的腳本，如果錯誤仍然存在，請使用論壇來報告錯誤。<br>你想在你的語言中使用腳本？幫助我們翻譯。"
	,translate_by: "" 
	,p_carga: "小型運輸艦" 
	,g_carga: "大型運輸艦" 
	,c_ligero: "輕型戰鬥機" 
	,c_pesado: "重型戰鬥機" 
	,crucero: "巡洋艦" 
	,nbatalla: "戰列艦" 
	,colonizador: "殖民船" 
	,reciclador: "回收船" 
	,sonda: "間諜衛星" 
	,bombardero: "導彈艦" 
	,destructor: "驅逐艦" 
	,edlm: "死星" 
	,acorazado: "戰鬥巡洋艦" 
	,satelite: "太陽能衛星" 
	,lanzamisiles: "飛彈發射器" 
	,laser_peq: "輕型鐳射炮" 
	,laser_gra: "重型鐳射炮" 
	,c_gaus: "高斯炮" 
	,c_ionico: "離子加農炮" 
	,c_plasma: "等離子炮塔" 
	,m_anti: "反彈道導彈" 
	,m_plan: "星際導彈" 
	,h_hora: "h" 
	,d_dia: "d" 
	,s_semana: "w" 
}; 

var LANG_GR = {
    newVer: 'Υπάρχει μια νέα έκδοση του "Εκτεταμένοι Πόροι" διαθέσιμη (κάντε κλικ εδώ για να την εγκαταστήσετε)'
    ,domain: "*"
    ,produccion_imp: "Παραγωγή αυτοκρατορίας για "
    ,recplaneta: "Πόροι ημερησίως ανά πλανήτη"
    ,almacen_tiempo: "Αποθήκες και χρόνος γεμίσματος"
    ,metal: "Μέταλλο"
    ,cristal: "Κρύσταλλο"
    ,deuterio: "Δευτέριο"
    ,metal_geo: "Μέταλλο (Γεωλόγος)"
    ,cristal_geo: "Κρύσταλλο (Γεωλόγος)"
    ,deuterio_geo: "Δευτέριο (Γεωλόγος)"
    ,total: "Σύνολο (Μ+Κ+Δ)"
    ,en_metal: "Σε μέταλλο (αναλογία 3x2x1)"
    ,diaria: "Ημερήσια"
    ,semanal: "Εβδομαδιαία"
    ,mensual: "Μηνιαία"
    ,planetas: "πλανήτες"
    ,produccion: "Παραγωγή"
    ,excedentes: "Υπόλοιπο ημερησίως"
    ,dia: "Μέρα"
    ,semana: "Εβδομάδα"
    ,hora: "Ωριαία"
    ,falta_rec: "Αποτυχία απόκτησης των πόρων"
    ,produccion_flota: "Εκτιμώμενη παραγωγή στόλου"
    ,produccion_def: "Εκτιμώμενη παραγωγή άμυνας"
    ,producc_diaria: "Ημερήσια παραγωγή"
    ,sin_geologo: "Χωρίς Γεωλόγο"
    ,con_geologo: "Με Γεωλόγο"
    ,bbcode_sin: "BBCode για forum (ΧΩΡΙΣ Γεωλόγο)"
    ,bbcode_con: "BBCode για forum (ΜΕ Γεωλόγο)"
    ,bbcode: "BBCode για forum"
    ,msg_error: "Σφάλμα στα δεδομένα;<br>Δοκιμάστε να εγκαταστήσετε την τελευταία έκδοση του script και<br>αν το σφάλμα συνεχίζει περάστε από το forum να το επισημάνετε."
    ,translate_by: "Μετάφραση στα Ελληνικά: MasterMind33"
    
    ,p_carga: "Μικ. Μεταγωγικό"
    ,g_carga: "Μεγ.Μεταγωγικό"
    ,c_ligero: "Ελαφ. Μαχητικό"
    ,c_pesado: "Βαρύ Μαχητικό"
    ,crucero: "Καταδιωκτικό"
    ,nbatalla: "Καταδρομικό"
    ,colonizador: "Σκάφος Αποικ."
    ,reciclador: "Ανακυκλωτής"
    ,sonda: "Κατασκοπ. Στέλ."
    ,bombardero: "Βομβαρδιστικό"
    ,destructor: "Destroyer"
    ,edlm: "Deathstar"
    ,acorazado: "Θωρ. Αναχαίτ."
    ,satelite: "Ηλ. Συλλέκτες"
    
    ,lanzamisiles: "Εκτ. Πυραύλων"
    ,laser_peq: "Ελαφρύ Λέιζερ"
    ,laser_gra: "Βαρύ Λέιζερ"
    ,c_gaus: "Κανόνι Gauss"
    ,c_ionico: "Κανόνι Ιόντων"
    ,c_plasma: "Πυρ. Πλάσματος"
    ,m_anti: "Αντι-Βαλλιστ. Π."
    ,m_plan: "Διαπλανητικοί Π."
    
    ,h_hora: "ω"
    ,d_dia: "μ"
    ,s_semana: "ε"
};

LANG_DA = {
	newVer: "Ny version tilgængelig (Tryk her for at opdatere)"
	,domain: "*"
	,produccion_imp: "Rigets Produktion, "
	,recplaneta: "Daglig produktion"
	,almacen_tiempo: "Lager og tid til de er fyldte"
	,metal: "Metal"
	,cristal: "Krystal"
	,deuterio: "Deuterium"
	,metal_geo: "Metal (Geolog)"
	,cristal_geo: "Krystal (Geolog)"
	,deuterio_geo: "Deuterium (Geolog)"
	,total: "Total (M+C+D)"
	,en_metal: "I metal (3x2x1 ratio)"
	,diaria: "Daglig"
	,semanal: "Ugentligt"
	,mensual: "Månedligt"
	,planetas: "planeter"
	,produccion: "Produktion"
	,excedentes: "Overskuds res."
	,dia: "Dag"
	,semana: "Uge"
	,hora: "Time"
	,falta_rec: "Krævede råstoffer"
	,produccion_flota: "Estimeteret produktion af flåde"
	,produccion_def: "Estimeteret produktion af forsvar"
	,producc_diaria: "Daglig Produktion"
	,sin_geologo: "Uden Geolog"
	,con_geologo: "Med Geolog"
	,bbcode_sin: "BBCode til forum (MED geolog)"
	,bbcode_con: "BBCode til forum (UDEN geolog)"
	,bbcode: "BBCode til forum"
	,msg_error: "Fejl i dataerne? prøv at installere den nyeste version af scriptet og hvis fejlen fortsat er der, rappotér den venligst på forum. Vil du have sciptet på dit sprog? - Hjælp os med at oversætte det."

	,translate_by: "Bangsholt"
	,p_carga: "Lille Transporter"
	,g_carga: "Stor Transporter"
	,c_ligero: "Lille Jæger"
	,c_pesado: "Stor Jæger"
	,crucero: "Krydser"
	,nbatalla: "Slagskib"
	,colonizador: "Koloniskib"
	,reciclador: "Recycler"
	,sonda: "Spionagesonde"
	,bombardero: "Bomber"
	,destructor: "Destroyer"
	,edlm: "Dødsstjerne"
	,acorazado: "Interceptor"
	,satelite: "Solarsatellit"

	,lanzamisiles: "Raketkanon"
	,laser_peq: "Lille Laserkanon"
	,laser_gra: "Stor Laserkanon"
	,c_gaus: "Gausskanon"
	,c_ionico: "Ionkanon"
	,c_plasma: "Plasmakanon"
	,m_anti: "Forsvarsraket"
	,m_plan: "Interplanetarraket"

	,h_hora: "t"
	,d_dia: "d"
	,s_semana: "u"
}; 

var LANG_IT = { 
   newVer: "Nuova versione di 'Extended Resources' disponibile (click per installare)" 
   ,domain: ".ogame.it" 
   ,produccion_imp: "Produzione impero di " 
   ,recplaneta: "Risorse giornaliere per pianeta" 
   ,almacen_tiempo: "Depositi e tempi di riempimento" 
   ,metal: "Metallo" 
   ,cristal: "Cristallo" 
   ,deuterio: "Deuterio" 
   ,metal_geo: "Metallo (Geologo)" 
   ,cristal_geo: "Cristallo (Geologo)" 
   ,deuterio_geo: "Deuterio (Geologo)" 
   ,total: "Total (M+C+D)" 
   ,en_metal: "In metallo (3x2x1 ratio)" 
   ,diaria: "Giornaliera" 
   ,semanal: "Settimanale" 
   ,mensual: "Mensile" 
   ,planetas: "Pianeti" 
   ,produccion: "Produzioni" 
   ,excedentes: "Rimanenza giornaliera" 
   ,dia: "Giorno" 
   ,semana: "Settimana" 
   ,hora: "Ora" 
   ,falta_rec: "Errore nell'ottenere le risorse" 
   ,produccion_flota: "Produzione stimata navi" 
   ,produccion_def: "Produzione stimata difese" 
   ,producc_diaria: "Produzione giornaliera" 
   ,sin_geologo: "Senza Geologo" 
   ,con_geologo: "Con Geologo" 
   ,bbcode_sin: "BBCode per forum (Senza Geologo)" 
   ,bbcode_con: "BBCode per forum (Con Geologo)" 
   ,bbcode: "BBCode per forum" 
   ,msg_error: "Errore nei dati? Prova ad installare l'ultima versione disponibile se l'errore persiste vieni nel forum per segnalarlo." 
   ,translate_by: "Traduzione italiana a cura di: " 
   ,p_carga: "Cargo Piccolo" 
   ,g_carga: "Cargo Grande" 
   ,c_ligero: "Caccia Leggero" 
   ,c_pesado: "Caccia Pesante" 
   ,crucero: "Incrociatore" 
   ,nbatalla: "Nave da Battaglia" 
   ,colonizador: "Colonizzatrice" 
   ,reciclador: "Riciclatrice" 
   ,sonda: "Sonda Spia" 
   ,bombardero: "Bombardiere" 
   ,destructor: "Corazzata" 
   ,edlm: "Morte Nera" 
   ,acorazado: "Incrociatore da Battaglia" 
   ,satelite: "Satellite Solare" 
   ,lanzamisiles: "Lanciamissili" 
   ,laser_peq: "Laser Leggero" 
   ,laser_gra: "Laser Pesante" 
   ,c_gaus: "Cannone Gauss" 
   ,c_ionico: "Cannone Ionico" 
   ,c_plasma: "Cannone al Plasma" 
   ,m_anti: "Missili Anti-Balistici" 
   ,m_plan: "Missili interplanetari" 
   ,h_hora: "h" 
   ,d_dia: "d" 
   ,s_semana: "w" 
};


var LANG_PT = { 
	newVer: "Existe uma nova versão de 'OGameRediseño: Pantalla Recursos' (Click aqui para Instalar)"  
	,domain: ".ogame.com.pt"  
	,produccion_imp: "Produção no Império de "  
	,recplaneta: "Produção diária"  
	,almacen_tiempo: "Armazéns e tempo restante para ficarem cheios"  
	,metal: "Metal"  
	,cristal: "Cristal"  
	,deuterio: "Deutério"  
	,metal_geo: "Metal (Geólogo)"  
	,cristal_geo: "Cristal (Geólogo)"  
	,deuterio_geo: "Deutério (Geólogo)"  
	,total: "Total (M+C+D)"  
	,en_metal: "Em metal (3x2x1 rácio)"  
	,diaria: "Diária"  
	,semanal: "Semanal"  
	,mensual: "Mensal"  
	,planetas: "Planetas"  
	,produccion: "Produção"  
	,excedentes: "Recursos Restantes"  
	,dia: "Dia"  
	,semana: "Semana"  
	,hora: "Hora"  
	,falta_rec: "Erro a obter os Recursos"  
	,produccion_flota: "Produção de Frota "  
	,produccion_def: "Produção de Defesa"  
	,producc_diaria: "Produção Diária"  
	,sin_geologo: "Sem Geólogo"  
	,con_geologo: "Com Geólogo"  
	,bbcode_sin: "BBCode para Fórum (Sem Geólogo)"  
	,bbcode_con: "BBCode para Fórum (Com Geólogo)"  
	,bbcode: "BBCode para Fórum"  
	,msg_error: "Existe um erro?<br>Instale a última versão do Script<br>se o erro percistir, visite o nosso Fórum e exponha o erro.<br><br>Deseja ter o Script no seu Idioma? Ajude-nos a Traduzir."  
	,translate_by: "Tradução Portuguesa por: WDFOX"  

	,p_carga: "Cargueiro Pequeno"  
	,g_carga: "Cargueiro Grande"  
	,c_ligero: "Caça ligeiro"  
	,c_pesado: "Caça Pesado"  
	,crucero: "Cruzador"  
	,nbatalla: "Nave de Batalha"  
	,colonizador: "Nave de Colonização"  
	,reciclador: "Reciclador"  
	,sonda: "Sonda de Espionagem"  
	,bombardero: "Bombardeiro"  
	,destructor: "Destruidor"  
	,edlm: "Estrela da Morte"  
	,acorazado: "Interceptor"  
	,satelite: "Satélite Solar"  

	,lanzamisiles: "Lançador de Misseis"  
	,laser_peq: "Laser Ligeiro"  
	,laser_gra: "Laser Pesado"  
	,c_gaus: "Canhão de Gaus"  
	,c_ionico: "Canhão de Iões"  
	,c_plasma: "Canhão de Plasma"  
	,m_anti: "Míssil de Intercepção"  
	,m_plan: "Míssil Interplanetário"  

	,h_hora: "h"  
	,d_dia: "d"  
	,s_semana: "s"  
};


var LANG_PL = { 
	newVer: "Dostępna jest nowa wersja skryptu 'Extended Resources' (kliknij tu by zainstalować)"  
	,domain: "*"  
	,produccion_imp: "Wydobycie w imperium "  
	,recplaneta: "Dzienne wydobycie planet"  
	,almacen_tiempo: "pojemność i czas wypełnienia magazynów"  
	,metal: "Metal"  
	,cristal: "Kryształ"  
	,deuterio: "Deuter"  
	,metal_geo: "Metal (Geolog)"  
	,cristal_geo: "Kryształ (Geolog)"  
	,deuterio_geo: "Deuter (Geolog)"  
	,total: "Razem (M+K+D)"  
	,en_metal: "w metalu (przelicznik 3x2x1)"  
	,diaria: "Dzienne"  
	,semanal: "Tygodniowe"  
	,mensual: "Miesięczne"  
	,planetas: "planet(y)"  
	,produccion: "Produkcja"  
	,excedentes: "Dziennie pozostanie"  
	,dia: "Dzień"  
	,semana: "Tydzień"  
	,hora: "Godzinowe"  
	,falta_rec: "Failed to obtain resources"  
	,produccion_flota: "Szacowana produkcja floty"  
	,produccion_def: "Szacowana budowa obrony"  
	,producc_diaria: "Dzienna produkcja"  
	,sin_geologo: "Bez geologa"  
	,con_geologo: "Z geologiem"  
	,bbcode_sin: "kod BBCode dla forum (bez geologa)"  
	,bbcode_con: "kod BBCode dla forum (z geologiem)"  
	,bbcode: "kod BBCode dla forum"  
	,msg_error: "Błąd w danych?<br>Spróbuj zainstalować najnowszą wersję skryptu, a jeśli<br>błąd będzie nadal, przejdź do forum i zgłoś to.<br><br>Chcesz mieć skrypt w swoim języku? Pomóż nam i przetłumacz."  
	,translate_by: "Polskie tłumaczenie: pomylony"  

	,p_carga: "Mały transporter"  
	,g_carga: "Duży transporter"  
	,c_ligero: "Lekki myśliwiec"  
	,c_pesado: "Ciężki myśliwiec"  
	,crucero: "Krążownik"  
	,nbatalla: "Okręt wojenny"  
	,colonizador: "Statek kolonizacyjny"  
	,reciclador: "Recycler"  
	,sonda: "Sonda szpiegowska"  
	,bombardero: "Bombowiec"  
	,destructor: "Niszczyciel"  
	,edlm: "Gwiazda śmierci"  
	,acorazado: "Pancernik"  
	,satelite: "Satelita słoneczny"  

	,lanzamisiles: "Wyrzutnia rakiet"  
	,laser_peq: "Lekkie działo Laserowe"  
	,laser_gra: "Ciężkie działo Laserowe"  
	,c_gaus: "Działo gaussa"  
	,c_ionico: "Działo jonowe"  
	,c_plasma: "Wyrzutnia plazmy"  
	,m_anti: "Antyrakieta"  
	,m_plan: "Rakieta międzyplanetarna"  

	,h_hora: " godz."  
	,d_dia: " dni"  
	,s_semana: " tyg."  
};


var LANG_DE = {
    newVer: "Es gibt eine neue Version von 'Extended Resources' (hier klicken zum installieren)"
    ,domain: "*"
    ,produccion_imp: "Gesamt-Produktion für "
    ,recplaneta: "Tägliche Resourcenproduktion pro Planet"
    ,almacen_tiempo: "Speicherkapazität | Zeit bis Speicher voll"
    ,metal: "Metall"
    ,cristal: "Kristall"
    ,deuterio: "Deuterium"
    ,metal_geo: "Metall (Geologe)"
    ,cristal_geo: "Kristall (Geologe)"
    ,deuterio_geo: "Deuterium (Geologe)"
    ,total: "Total (M+C+D)"
    ,en_metal: "In Metall (3x2x1 ratio)"
    ,diaria: "Täglich"
    ,semanal: "Wöchentlich"
    ,mensual: "Monatlich"
    ,planetas: "Planeten"
    ,produccion: "Produktion"
    ,excedentes: "Überschuss am Tag"
    ,dia: "Tag"
    ,semana: "Woche"
    ,hora: "pro Stunde"
    ,falta_rec: "Failed to obtain resources"
    ,produccion_flota: "Mögliche Flottenproduktion"
    ,produccion_def: "Mögliche Produktion Verteidigungsanlagen"
    ,producc_diaria: "Tägliche Produktion"
    ,sin_geologo: "Ohne Geologe"
    ,con_geologo: "Mit Geologe"
    ,bbcode_sin: "BBCode für Forum (Ohne Geologe)"
    ,bbcode_con: "BBCode für Forum (Mit Geologe)"
    ,bbcode: "BBCode für Forum"
    ,msg_error: "Fehler in den Daten? Versuche die neuste Version des Scripts zu installieren, falls der Fehler bestehen bleibt berichte es im Forum!"
    ,translate_by: "Deutsche Übersetzung von Killercorny"
    ,p_carga: "kleiner Transporter"
    ,g_carga: "großer Transporter"
    ,c_ligero: "leichter Jäger"
    ,c_pesado: "schwerer Jäger"
    ,crucero: "Kreuzer"
    ,nbatalla: "Schlachtschiff"
    ,colonizador: "Kolonieschiff"
    ,reciclador: "Recycler"
    ,sonda: "Spionagesonde"
    ,bombardero: "Bomber"
    ,destructor: "Zerstörer"
    ,edlm: "Todesstern"
    ,acorazado: "Schlachtkreuer"
    ,satelite: "Solarsatellit"
    ,lanzamisiles: "Raketenwerfer"
    ,laser_peq: "Leichtes Lasergeschütz"
    ,laser_gra: "Schweres Lasergeschütz"
    ,c_gaus: "Gauss Kanone"
    ,c_ionico: "Ionengeschütz"
    ,c_plasma: "Plasmawerfer"
    ,m_anti: "Abfangreakete"
    ,m_plan: "Interplanetarrakete"
    ,h_hora: "h"
    ,d_dia: "d"
    ,s_semana: "w"
};




var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

if (is_chrome) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
}


var op = function () {
   this.set = function(key, value) {
      return GM_setValue("ogres_" + getServer() + "_" + key, value);
   }
   
   this.get = function(key){
         return GM_getValue("ogres_" + getServer() + "_" + key)
   }
} 

var options = new op();

       

function getServer() {

   var server = location.href;
   server = server.replace("http://", "").replace("www.", "");
   server = server.substring(0, server.indexOf("."));
   
   return server;
}
      

function getElementsByClass(searchClass,node,tag) {
var classElements = new Array();
    if (node == null) 
        node = document;
    if (tag == null) 
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;

    for (var i = 0, j = 0; i < elsLen; i++) {
        var sep = els[i].className.split(" ");
        var content = false;
        
        for(var k = 0; k < sep.length; k++){
            if(sep[k] == searchClass) 
                content = true;
        }
        
        if (els[i].className == searchClass || content) {
            classElements[j] = els[i];
            j++;
        }
   }
   return classElements;
}


function mostrarNumero(num) {
    var nNmb = String(parseInt(num)); 
    var sRes = "";
    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
        sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
	return sRes;
}


function getPosActual() {
    var planets = getElementsByClass("smallplanet");
    var numPlanets = planets.length;
    if(numPlanets==1) {
        var cord = getElementsByClass("planet-koords", planets[0]);
        return(cord[0].innerHTML);
    }
    else {
        var planets = getElementsByClass("active");
		
        for (var i=0; i<planets.length; i++ ) {
            var cord = getElementsByClass("planet-koords", planets[i]);
        }
		return (cord[0].innerHTML);   
    }
}

 
function getNombreJugador () {
    var pn = document.getElementById("playerName");
    var nombre = getElementsByClass("textBeefy", pn);
        return nombre[0].innerHTML;
}


function geologoActivo() {
    var salida = false;
    var oficiales = document.getElementById("officers").getElementsByTagName("a");
    var geologo = oficiales[3].className;

    if(geologo.indexOf(" on ") != -1) {
        salida = true;
    }
    
    return salida;
}


function getFecha()  {
    var fecha=new Date();
    return (fecha.toLocaleDateString());
}




function generarFilaProduccion(nombre, pM, pC, pD, cM, cC, cD, c) {
    var salida = "";
    var diario = 0;
	var semanal = 0;
    
	// diario
    if(pD == 0) {
        diario = parseInt(Math.min(pM/cM,pC/cC));
    } else {
        diario = parseInt(Math.min(pM/cM,pC/cC, pD/cD));
    }
        
    if(isNaN(diario))
        diario = 0;
    
    var exM = pM - (diario*cM);
    var exC = pC - (diario*cC);
    var exD = pD - (diario*cD);
	
	// semanal
	pM *= 7;
	pC *= 7;
	pD *= 7;
	
	if(pD == 0) {
        semanal = parseInt(Math.min(pM/cM,pC/cC));
    } else {
        semanal = parseInt(Math.min(pM/cM,pC/cC, pD/cD));
    }
        
    if(isNaN(semanal))
        semanal = 0;
	
	
    
    salida += '<tr class="' + c + '"><td class="label">' + nombre + '</td><td class="undermark"><b>'
    salida += mostrarNumero(diario) + '</b></td><td class="undermark">' + mostrarNumero(semanal) + '</td><td>';
    salida += mostrarNumero(exM) + '</td><td>';
    salida += mostrarNumero(exC) + '</td><td>';
    salida += mostrarNumero(exD) + '</td></tr>'
    
    return(salida);
}


function getColumnas(tabla){
    return tabla.rows[0].cells.length;
}

function getFilas(tabla){
	return tabla.rows.length;
}

function getContenido(tabla, fila, col)
{
    var rowElem = tabla.rows[fila];
    var tdValue = rowElem.cells[col].innerHTML;
    return tdValue;
}

function A(almacen) {
   var ret = "-";

   if(typeof almacen != 'undefined' && almacen > 0) {
		
      almacen = parseInt(almacen)/1000;
      ret = mostrarNumero(almacen) + " k";
   }
   
   return ret
}


function getTiempoLlenado(produccion, almacen) {
    var ret = '-';
    
    if(typeof almacen != 'undefined' && produccion > 0) {

       
        almacen = parseInt(almacen);
        produccion = parseInt(produccion) / 24;
        horas = parseInt(almacen/produccion);
        
        if(horas > 24) {
            dias = horas/24;
            if(dias > 7) {
                semanas = dias / 7;
                ret = parseInt(semanas) + LANG.s_semana + " " + parseInt(dias % 7) + LANG.d_dia;
                
            }else {
                ret = parseInt(dias) + LANG.d_dia + " " + parseInt(horas % 24) + LANG.h_hora;
            }
        }
        else {
            ret = parseInt(horas) + LANG.h_hora;
        }
    }
    
    
    return  ret;
}
// ============================================================
// ============================================================

// COMPROBADOR DE ACTUALIZACIONES


var checkUPDATE = function() {
    var version = UPDATE.version;
    var uurl = UPDATE.check;
	var now = new Date();
	var str = options.get('lastupdate');
    var hDif = 99999;
    var lastCheck;
    
    if(typeof str != 'undefined') {
        lastCheck = new Date(str);
        hDif = Math.abs(Math.floor((now-lastCheck)/(1000*60*60)));
    }

	
	this.init = function() {
		if(hDif >= UPDATE.minHours) {
			options.set('lastupdate',now.toString());
			this.check();	
		}
        else {
            var ant_check = options.get('checkver');
            if(typeof ant_check != 'undefined') {
                var thisver = parseInt(version.replace(/\./g,''))+100;
                if(parseInt(ant_check)>thisver){
                    this.doupdate(null,true);
                }
            }
        }
	}

	this.check = function() {
       GM_xmlhttpRequest({
            method:"GET",
            url:uurl,
            headers: {
                "Expires":"Mon, 26 Jul 1997 05:00:00 GMT",
                "Last-Modified":"Sun, 25 Jul 2004 16:12:09 GMT",
                "Cache-Control":"no-cache, must-revalidate",
                "Pragma":"nocache"
            },
            onreadystatechange:this.doupdate});
	}

    this.doupdate = function(o, force) {
	   var show = false
	   if(arguments.length == 2){
	       if(force) show = true;
       }
       else {
            if(o.readyState == 4) {
                checkver = o.responseText.substr(0,100);
                checkver = checkver.split('@version')[1];
                checkver = parseInt(checkver.replace(/\./g,''))+100;
                thisver = parseInt(version.replace(/\./g,''))+100;
                if(checkver>thisver) {
                    options.set('checkver', checkver); 
                    show = true;
                }
            }
        }
        
        if(show) {
            var divA = document.createElement('div');
            var html = '<div style="position:absolute;position:fixed;bottom:0;left:0;padding:0.2em 0.35em;color:#FFFFFF;background:#FF0000;font-weight:bold;font-size:small;z-index:99;">';
            html += '<a href="' + UPDATE.install + '" style="color:#FFFFFF">' + LANG.newVer + '</a></div>';
            divA.innerHTML = html;
            document.body.appendChild(divA);
        }
	}
    
    
    this.init();
}


// ============================================================
// ============================================================
// ============================================================


function translate(text) {
    
    text = text.replace(/{RECURSOS_PLANETAS}/gi, LANG.recplaneta)
    text = text.replace(/{PRODUCCION_IMPERIAL}/gi, LANG.produccion_imp)
    text = text.replace(/{METAL}/gi, LANG.metal)
    text = text.replace(/{CRISTAL}/gi, LANG.cristal)
    text = text.replace(/{DEUTERIO}/gi, LANG.deuterio)
    text = text.replace(/{METAL_GEO}/gi, LANG.metal_geo)
    text = text.replace(/{CRISTAL_GEO}/gi, LANG.cristal_geo)
    text = text.replace(/{DEUTERIO_GEO}/gi, LANG.deuterio_geo)
    text = text.replace(/{SEMANA}/gi, LANG.semana)
	text = text.replace(/{HORA}/gi, LANG.hora)
    text = text.replace(/{DIA}/gi, LANG.dia)
    text = text.replace(/{DIARIA}/gi, LANG.diaria)
    text = text.replace(/{SEMANAL}/gi, LANG.semanal)
    text = text.replace(/{MENSUAL}/gi, LANG.mensual)
    
    text = text.replace(/{EXCEDENTES_DIA}/gi, LANG.excedentes)
    text = text.replace(/{PRODUCCION}/gi, LANG.produccion)
    text = text.replace(/{PRODUCCION_FLOTA}/gi, LANG.produccion_flota)
    text = text.replace(/{PRODUCCION_DEFENSAS}/gi, LANG.produccion_def)
    text = text.replace(/{ALMACEN_TIEMPO}/gi, LANG.almacen_tiempo)
    text = text.replace(/{PLANETAS}/gi, LANG.planetas)
    text = text.replace(/{TOTAL}/gi, LANG.total)
    text = text.replace(/{PRODUCCION_DIARIA_DE}/gi, LANG.producc_diaria)
    text = text.replace(/{SIN_GEOLOGO}/gi, LANG.sin_geologo)
    text = text.replace(/{CON_GEOLOGO}/gi, LANG.con_geologo)
    text = text.replace(/{MSG_ERROR}/gi, LANG.msg_error)
    text = text.replace(/{TRANSLATE_BY}/gi, LANG.translate_by)
    text = text.replace(/{BBCODE_CON}/gi, LANG.bbcode_con)
    text = text.replace(/{BBCODE_SIN}/gi, LANG.bbcode_sin)
    text = text.replace(/{BBCODE}/gi, LANG.bbcode)
    text = text.replace(/{EN_METAL}/gi, LANG.en_metal)
    text = text.replace(/{FALTA_REC}/gi, LANG.falta_rec)
    
    text = text.replace('{P_CARGA}', LANG.p_carga)
    text = text.replace('{G_CARGA}', LANG.g_carga)
    text = text.replace('{C_LIGERO}', LANG.c_ligero)
    text = text.replace('{C_PESADO}', LANG.c_pesado)
    text = text.replace('{CRUCERO}', LANG.crucero)    
    text = text.replace('{NBATALLA}', LANG.nbatalla)
    text = text.replace('{COLONIZADOR}', LANG.colonizador)
    text = text.replace('{RECICLADOR}', LANG.reciclador)
    text = text.replace('{SONDA}', LANG.sonda)
    text = text.replace('{BOMBARDERO}', LANG.bombardero)
    text = text.replace('{DESTRUCTOR}', LANG.destructor)
    text = text.replace('{EDLM}', LANG.edlm)
    text = text.replace('{ACORAZADO}', LANG.acorazado)
    text = text.replace('{SATELITE}', LANG.satelite)
    
    text = text.replace('{LANZAMISILES}', LANG.lanzamisiles)
    text = text.replace('{LASER_PEQ}', LANG.laser_peq)
    text = text.replace('{LASER_GRA}', LANG.laser_gra)
    text = text.replace('{C_GAUS}', LANG.c_gaus)
    text = text.replace('{C_IONICO}', LANG.c_ionico)    
    text = text.replace('{C_PLASMA}', LANG.c_plasma)
    text = text.replace('{M_ANTI}', LANG.m_anti)
    text = text.replace('{M_PLAN}', LANG.m_plan)
    
    
    return text;
}               




function getDatos() {


   var str_metal = getElementsByClass("metal")[0].title;
   var str_cristal = getElementsByClass("crystal")[0].title;
   var str_deu = getElementsByClass("deuterium")[0].title;
   
   var str_ampli_slot1 = getElementsByClass("slot1")[0].title;
   var str_ampli_slot2 = getElementsByClass("slot2")[0].title;
   var str_ampli_slot3 = getElementsByClass("slot3")[0].title;
   //alert(str_ampli_slot1);
  // alert(str_ampli_slot2);
  // alert(str_ampli_slot3);
   // produccion de metal, cristal y deuterio por hora
   
	var marcafin = "</span>";
  if(str_ampli_slot1!=""){
		var ampli1=str_ampli_slot1.split("<br>");
		var txt1=ampli1[2];
	
		var amp1=txt1.split(" ");
		var ampli_porcentaje1=amp1[0];
		var aux1=ampli_porcentaje1.split("%");
		ampli_porcentaje1=aux1[0];
		var ampli_recurso1=amp1[8];
		if(ampli_recurso1=="en"){
			ampli_recurso1=amp1[7]
		}
    }
	
	if(str_ampli_slot2!=""){
		var ampli2=str_ampli_slot2.split("<br>");
		var txt2=ampli2[2];
		var amp2=txt2.split(" ");
		var ampli_porcentaje2=amp2[0];
		var aux2=ampli_porcentaje2.split("%");
		ampli_porcentaje2=aux2[0];
		var ampli_recurso2=amp2[8];
		if(ampli_recurso2=="en"){
			ampli_recurso2=amp2[7]
		}
    }
	if(str_ampli_slot3!=""){
		var ampli3=str_ampli_slot3.split("<br>");
		var txt3=ampli3[2];
		var amp3=txt3.split(" ");
		var ampli_porcentaje3=amp3[0];
		var aux3=ampli_porcentaje3.split("%");
		ampli_porcentaje3=aux3[0];
		var ampli_recurso3=amp3[8];
		if(ampli_recurso3=="en"){
			ampli_recurso3=amp3[7]
		}
    }
	
	
	
   var metal = str_metal.split("<br>")[2];
   metal = metal.substring(metal.indexOf(">")+1).replace(marcafin,"");
   
   var cristal = str_cristal.split("<br>")[2];
   cristal = cristal.substring(cristal.indexOf(">")+1).replace(marcafin,"");
   
   var deu = str_deu.split("<br>")[2];
   deu = deu.substring(deu.indexOf(">")+1).replace(marcafin,"");
   
   if(deu.indexOf('-') != -1) deu = "0";
   var porcentaje_metal=0;
   var porcentaje_cristal=0;
   var porcentaje_duty=0;
   if(ampli_recurso1=="metal"){
		porcentaje_metal=porcentaje_metal+parseInt(ampli_porcentaje1);
   }
   if(ampli_recurso2=="metal"){
		porcentaje_metal=porcentaje_metal+parseInt(ampli_porcentaje2);
   }
   if(ampli_recurso3=="metal"){
		porcentaje_metal=porcentaje_metal+parseInt(ampli_porcentaje3);
   }
   
   if(ampli_recurso1=="cristal"){
		porcentaje_cristal=porcentaje_cristal+parseInt(ampli_porcentaje1);
   }
   if(ampli_recurso2=="cristal"){
		porcentaje_cristal=porcentaje_cristal+parseInt(ampli_porcentaje2);
   }
   if(ampli_recurso3=="cristal"){
		porcentaje_cristal=porcentaje_cristal+parseInt(ampli_porcentaje3);
   }
   
   if(ampli_recurso1=="Deuterio"){
		porcentaje_duty=porcentaje_duty+parseInt(ampli_porcentaje1);
   }
   if(ampli_recurso2=="Deuterio"){
		porcentaje_duty=porcentaje_duty+parseInt(ampli_porcentaje2);
   }
   if(ampli_recurso3=="Deuterio"){
		porcentaje_duty=porcentaje_duty+parseInt(ampli_porcentaje3);
   }
   
    metal = parseInt(metal.replace(/\./gi, "").replace(/\,/gi, "").replace("+", ""));
	var metal_con_ampli=metal;
   if(porcentaje_metal>0){
	metal= metal - Math.floor((metal*porcentaje_metal)/(porcentaje_metal+100))+3;
   }

   
   cristal = parseInt(cristal.replace(/\./gi, "").replace(/\,/gi, "").replace("+", ""));
   var cristal_con_ampli=cristal;
   
   if(porcentaje_cristal>0){
   cristal= cristal - Math.floor((cristal*porcentaje_cristal)/(porcentaje_cristal+100))+1;
   }
   
   deu = parseInt(deu.replace(/\./gi, "").replace(/\,/gi, "").replace("+", ""));
   var duty_con_ampli=deu;
   if(porcentaje_duty>0){
   deu= deu - Math.floor((deu*porcentaje_duty)/(porcentaje_duty+100));
   
   }
   
   // almacen metal
   str_almM = str_metal.split("<br>")[1];
   str_almM = str_almM.substring(str_almM.indexOf('>')+1).replace(marcafin,'');
   almM = parseInt(str_almM.replace(/\./gi, "").replace(/\,/gi, ""))
   
   // almacen cristal  
   str_almC = str_cristal.split("<br>")[1];
   str_almC = str_almC.substring(str_almC.indexOf('>')+1).replace(marcafin,'');
   almC = parseInt(str_almC.replace(/\./gi, "").replace(/\,/gi, ""))
   
   // almacen deuterio
   str_almD = str_deu.split("<br>")[1];
   str_almD = str_almD.substring(str_almD.indexOf('>')+1).replace(marcafin,'');
   almD = parseInt(str_almD.replace(/\./gi, "").replace(/\,/gi, ""))
   
   
   if(metal != 0) {
		
      options.set(getPosActual() + "_metal", metal);
      options.set(getPosActual() + "_cristal", cristal);
      options.set(getPosActual() + "_deu", deu);
      
      options.set(getPosActual() + "_almacen_metal", almM);
      options.set(getPosActual() + "_almacen_cristal", almC);
      options.set(getPosActual() + "_almacen_deu", almD);
	  
	  options.set(getPosActual() + "_ampli_metal", metal_con_ampli);
      options.set(getPosActual() + "_ampli_cristal", cristal_con_ampli);
      options.set(getPosActual() + "_ampli_duty", duty_con_ampli);
   }
}




// ============================================================
// ============================================================
// ============================================================

    if( location.href.indexOf('/game/index.php?page=overview') != -1 /*|| 
        location.href.indexOf('/game/index.php?page=resourceSettings') != -1 ||
        location.href.indexOf('/game/index.php?page=resources') != -1 */){
		
            getDatos();
    
    }

                    


    if( location.href.indexOf('/game/index.php?page=resourceSettings') != -1 ){
        
        var LANG = LANG_EN;
        
        var dom_esp = [ '.ogame.com.es/', '.ogame.es/', '.ogame.com.ar/', '.mx.ogame.org/' ]

        for(var i = 0; i < dom_esp.length; i++) {
            if(location.href.indexOf(dom_esp[i]) != -1) {
                LANG = LANG_ES;
            }
        }
      
      if (location.href.indexOf('.bg.ogame.org') != -1)
        	LANG = LANG_BG;
		else if (location.href.indexOf('.ogame.dk') != -1)
			LANG = LANG_DA;
		else if (location.href.indexOf('.ogame.ru') != -1)
			LANG = LANG_RU;
		else if (location.href.indexOf('.ogame.tw') != -1)
			LANG = LANG_TW;
		else if (location.href.indexOf('.ogame.fr') != -1)
			LANG = LANG_FR;
		else if (location.href.indexOf('.ogame.gr') != -1)
			LANG = LANG_GR;
		else if (location.href.indexOf('.ogame.it') != -1)
			LANG = LANG_IT;
		else if (location.href.indexOf('.ogame.com.pt') != -1)
			LANG = LANG_PT;
		else if (location.href.indexOf('.ogame.pl') != -1)
			LANG = LANG_PL;
		else if (location.href.indexOf('.ogame.de') != -1)
			LANG = LANG_DE;
			

			

        // comprobacion de nueva version de script
        window.addEventListener("load", function(){checkUPDATE();}, true);
        
        var planets = getElementsByClass("smallplanet");
        var numPlanets = planets.length;
        
        if ( numPlanets > 0 ) {            

            
        
            // --- lista de planetas ---
            var listaPlanetas = "";
            for (var i=0; i<planets.length; i++ ) {
                var cord = getElementsByClass("planet-koords", planets[i]);
                var nombre = getElementsByClass("planet-name", planets[i]); 
                listaPlanetas += cord[0].innerHTML + ";";
                options.set(cord[0].innerHTML + "_nombre", nombre[0].innerHTML);
            }
                      
            options.set("lista", listaPlanetas);
            
            // --- calcular total ---
            var metalTH = 0;
            var cristalTH = 0;
            var deuTH = 0;
			var metalTHamp = 0;
            var cristalTHamp = 0;
            var deuTHamp = 0;
            var msgErr = "";
            var sep = listaPlanetas.split(";");
        
            for(var k = 0; k < sep.length; k++){
                if(sep[k].length > 3) {
                    metal = options.get(sep[k] + "_metal");
                    cristal = options.get(sep[k] + "_cristal");
                    deu = options.get(sep[k] + "_deu");
					amp_metal = options.get(sep[k] + "_ampli_metal");
                    amp_cristal = options.get(sep[k] + "_ampli_cristal");
                    amp_duty = options.get(sep[k] + "_ampli_duty");
                    
					if(typeof metal == 'undefined') {
                        msgErr += '<font color="#FF0000"><b> ** {FALTA_REC} ' + sep[k] + '</b></font><br>';
                    } else {						
						if(typeof amp_metal != 'undefined') {
							metalTHamp += parseInt(amp_metal);
						}else{
							metalTHamp += parseInt(metal);
						}
						if(typeof amp_cristal != 'undefined') {
							cristalTHamp += parseInt(amp_cristal);
						} else{
							cristalTHamp += parseInt(cristal);
						}
						if(typeof amp_duty != 'undefined') {
							deuTHamp += parseInt(amp_duty);
						} 	else{
							deuTHamp += parseInt(deu);
						}	
							metalTH += parseInt(metal);
							cristalTH += parseInt(cristal);
							deuTH += parseInt(deu);
						
                    }
                }   
            }
			 

            
            // --- crea la tabla ---

                         
            var main = getElementsByClass("mainRS")[0];
            
                        
            var divErr = document.createElement('div');
            var divPorPlanetas = document.createElement('div');
            var divAlmacen = document.createElement('div');
            var divRecursos = document.createElement('div');
            var divBB = document.createElement('div');
            var divBorrarCookie = document.createElement('div');
            var divFlotas = document.createElement('div');
            var divDefensas = document.createElement('div');
            
            var tabla = "";
            var textoBB = "";
            
            var metalD = metalTH*24;
            var metalS = metalD*7;
            var metalM = metalD*30;
            
            var cristalD = cristalTH*24;
            var cristalS = cristalD*7;
            var cristalM = cristalD*30;
            
            var deuD = deuTH*24;
            var deuS = deuD*7;
            var deuM = deuD*30;
			
			var metalDamp = metalTHamp*24;
            var metalSamp = metalDamp*7;
            var metalMamp = metalDamp*30;
            
            var cristalDamp = cristalTHamp*24;
            var cristalSamp = cristalDamp*7;
            var cristalMamp = cristalDamp*30;
            
            var deuDamp = deuTHamp*24;
            var deuSamp = deuDamp*7;
            var deuMamp = deuDamp*30;
            
             // --- tabla con los recursos diarios por planetas
             
            var tablaPlanetas = "";
            tablaPlanetas += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;">';
            tablaPlanetas += '<tr height="50"><td></td><td></td><td></td><td></td></tr>';
            tablaPlanetas += '<tr><td align="center" colspan="4"><font size="4" color="#FF6600"><b>* {RECURSOS_PLANETAS} *</b></font></td></tr>';
            tablaPlanetas += '<tr><td colspan="4"></td></tr>';
            tablaPlanetas += '<tr><td></td><td class="label">{METAL}</td><td class="label">{CRISTAL}</td><td class="label">{DEUTERIO}</td></tr>';
            
            //var sep = listaPlanetas.split(";");
            for(var k = 0; k < sep.length; k++){
                if(sep[k].length > 3) {
                    p_metal = options.get(sep[k] + "_metal");
                    p_cristal = options.get(sep[k] + "_cristal");
                    p_deu = options.get(sep[k] + "_deu");
                    if(typeof p_metal == 'undefined') {
                        p_metal = p_cristal = p_deu = "-";
                    }
                    else {
                        p_metal = mostrarNumero(parseInt(p_metal)*24);
                        p_cristal = mostrarNumero(parseInt(p_cristal)*24);
                        p_deu = mostrarNumero(parseInt(p_deu)*24);
                    }
                    
                    var tr = ((k % 2)==0)?'<tr class="alt">':'<tr>';
                    tablaPlanetas += tr + '<td class="label">' + (getPosActual() == sep[k]?'<font color="red"><b> >> </b></font>':'') + options.get(sep[k] + "_nombre")  + ' ' + sep[k] + '</td><td class="undermark">' + p_metal + '</td><td class="undermark">' + p_cristal + '</td><td class="undermark">' + p_deu + '</td></tr>';
                }   
            }
            
            tablaPlanetas += '<tr><td colspan="4"></td></tr>';
            tablaPlanetas += '</table>';
      
            
            // --- tabla con los almacenes
             
            var tablaAlmacen = "";
            tablaAlmacen += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;">';
            tablaAlmacen += '<tr height="50"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
            tablaAlmacen += '<tr><td align="center" colspan="7"><font size="4" color="#FF6600"><b>* {ALMACEN_TIEMPO} * </b></font></td></tr>';
            tablaAlmacen += '<tr><td colspan="4"></td></tr>';
            tablaAlmacen += '<tr><td></td><td class="label">{METAL}</td><td class="label"></td><td class="label">{CRISTAL}</td><td class="label"></td><td class="label">{DEUTERIO}</td><td class="label"></td></tr>';
            
            for(var k = 0; k < sep.length; k++){
                if(sep[k].length > 3) {
                    p_metal = options.get(sep[k] + "_metal");
                    p_cristal = options.get(sep[k] + "_cristal");
                    p_deu = options.get(sep[k] + "_deu");
                    if(typeof p_metal == 'undefined') {
                        p_metal = p_cristal = p_deu = "-";
                    }
                    else {
                        p_metal = parseInt(p_metal)*24;
                        p_cristal = parseInt(p_cristal)*24;
                        p_deu = parseInt(p_deu)*24;
                    }

                    a_metal = options.get(sep[k] + "_almacen_metal");
                    a_cristal = options.get(sep[k] + "_almacen_cristal");
                    a_deu = options.get(sep[k] + "_almacen_deu");
                    
                    var tr;((k % 2)==0)?'<tr class="alt">':'<tr>';
					
                    tablaAlmacen += tr + '<td class="label">' + (getPosActual() == sep[k]?'<font color="red"><b> >> </b></font>':'') + options.get(sep[k] + "_nombre") + ' ' + sep[k] + '</td><td class="undermark">' + A(a_metal) + '</td><td><p align="center">' + getTiempoLlenado(p_metal,a_metal) +  '</p></td><td class="undermark">' + A(a_cristal) + '</td><td><p align="center">' + getTiempoLlenado(p_cristal,a_cristal) + '</p></td><td class="undermark">' + A(a_deu) + '</td><td><p align="center">' + getTiempoLlenado(p_deu,a_deu) + '</p></td></tr>';
                }   
            }
            tablaAlmacen += '<tr><td colspan="4"></td></tr>';
            tablaAlmacen += '</table>';
                                

            // --- tabla con los recursos diarios/semanales/mensuales

            tabla += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;">';
            tabla += '<tr height="50"><td width="20%"></td><td width="20%"></td><td width="20%"></td><td width="20%"></td><td width="20%"></td></tr>';
            tabla += '<tr><td align="center" colspan="5"><font size="4" color="#FF6600"><b>* {PRODUCCION_IMPERIAL} ' + getNombreJugador() + ' * </b></font></td></tr>';
            tabla += '<tr><td colspan="4"></td></tr>';
            tabla += '<tr><td></td><td class="label">{HORA}</td><td class="label">{DIARIA}</td><td class="label">{SEMANAL}</td><td class="label">{MENSUAL}</td></tr>';
            

            
            if(geologoActivo()) {
                tabla += '<tr class="alt"><td class="label">{METAL_GEO}</td><td class="undermark">' + mostrarNumero(metalD/24) + '</td><td class="undermark">' + mostrarNumero(metalD) + '</td><td class="undermark">' + mostrarNumero(metalS) + '</td><td class="undermark">' + mostrarNumero(metalM) + '</td></tr>';
                tabla += '<tr class=""><td class="label">{CRISTAL_GEO}</td><td class="undermark">' + mostrarNumero(cristalD/24) + '</td><td class="undermark">' + mostrarNumero(cristalD) + '</td><td class="undermark">' + mostrarNumero(cristalS) + '</td><td class="undermark">' + mostrarNumero(cristalM) + '</td></tr>';
                tabla += '<tr class="alt"><td class="label">{DEUTERIO_GEO}</td><td class="undermark">' + mostrarNumero(deuD/24) + '</td><td class="undermark">' + mostrarNumero(deuD) + '</td><td class="undermark">' + mostrarNumero(deuS) + '</td><td class="undermark">' + mostrarNumero(deuM) + '</td></tr>';                
            } else {
                tabla += '<tr class="alt"><td class="label">{METAL}</td><td class="undermark">' + mostrarNumero(metalD/24) + '</td><td class="undermark">' + mostrarNumero(metalD) + '</td><td class="undermark">' + mostrarNumero(metalS) + '</td><td class="undermark">' + mostrarNumero(metalM) + '</td></tr>';
                tabla += '<tr class=""><td class="label">{CRISTAL}</td><td class="undermark">' + mostrarNumero(cristalD/24) + '</td><td class="undermark">' + mostrarNumero(cristalD) + '</td><td class="undermark">' + mostrarNumero(cristalS) + '</td><td class="undermark">' + mostrarNumero(cristalM) + '</td></tr>';
                tabla += '<tr class="alt"><td class="label">{DEUTERIO}</td><td class="undermark">' + mostrarNumero(deuD/24) + '</td><td class="undermark">' + mostrarNumero(deuD) + '</td><td class="undermark">' + mostrarNumero(deuS) + '</td><td class="undermark">' + mostrarNumero(deuM) + '</td></tr>';
				
				if(metalD<metalDamp){
				tabla += '<tr class="alt"><td class="label">{METAL} con ampli</td><td class="undermark">' + mostrarNumero(metalDamp/24) + '</td><td class="undermark">' + mostrarNumero(metalDamp) + '</td><td class="undermark">' + mostrarNumero(metalS) + '</td><td class="undermark">' + mostrarNumero(metalMamp) + '</td></tr>';
                }
				if(cristalD<cristalDamp){
				tabla += '<tr class=""><td class="label">{CRISTAL} con ampli</td><td class="undermark">' + mostrarNumero(cristalDamp/24) + '</td><td class="undermark">' + mostrarNumero(cristalDamp) + '</td><td class="undermark">' + mostrarNumero(cristalS) + '</td><td class="undermark">' + mostrarNumero(cristalMamp) + '</td></tr>';
                }
				if(deuD<deuDamp){
				tabla += '<tr class="alt"><td class="label">{DEUTERIO} con ampli</td><td class="undermark">' + mostrarNumero(deuDamp/24) + '</td><td class="undermark">' + mostrarNumero(deuDamp) + '</td><td class="undermark">' + mostrarNumero(deuS) + '</td><td class="undermark">' + mostrarNumero(deuMamp) + '</td></tr>';				
				}
		  }
            
            tabla += '<tr><td colspan="4"></td></tr>';
            tabla += '<tr class=""><td class="label">{TOTAL}</td><td class="nomark">' + mostrarNumero((metalD/24)+(cristalD/24)+(deuD/24)) + '</td><td class="nomark">' + mostrarNumero(metalD+cristalD+deuD) + '</td><td class="nomark">' + mostrarNumero(metalS+cristalS+deuS) + '</td><td class="momark">' + mostrarNumero(metalM+cristalM+deuM) + '</td></tr>';
            tabla += '<tr class=""><td class="label">{EN_METAL}</td><td class="nomark">' + mostrarNumero((metalD/24)+((cristalD/24)*1.5)+((deuD/24)*3)) + '</td><td class="nomark">' + mostrarNumero(metalD+(cristalD*1.5)+(deuD*3)) + '</td><td class="nomark">' + mostrarNumero(metalS+(cristalS*1.5)+(deuS*3)) + '</td><td class="momark">' + mostrarNumero(metalM+(cristalM*1.5)+(deuM*3)) + '</td></tr>';
            tabla += '<tr class="" height="50"><td colspan="5">' + numPlanets + ' {PLANETAS}:   ' + listaPlanetas.replace(/;/g, "  ") + '</td></tr></form>';
            tabla += '</table>';
            
            // --- textarea con el BBCode
            
            if(geologoActivo()) {
                
                textoBB += '[size=14][u][b]{PRODUCCION_DIARIA_DE} ' + getNombreJugador() + '[/b][/u] [/size][size=8](' + getFecha() + ') {CON_GEOLOGO}[/size]\n\n';
				textoBB +=  numPlanets + ' {PLANETAS}\n\n';
                textoBB += '[size=12]{METAL}: [color=#9999ff]' + mostrarNumero(metalD) + '[/color]\n';
                textoBB += '{CRISTAL}: [color=#00ff00]' + mostrarNumero(cristalD) + '[/color]\n';
                textoBB += '{DEUTERIO}: [color=#ff00ff]' + mostrarNumero(deuD) + '[/color][/size]\n\n';
                textoBB += '[size=12]{TOTAL}: [color=#999900][size=14]' + mostrarNumero(metalD+cristalD+deuD) + '[/size][/color]\n';
                textoBB += '{EN_METAL}: [color=#ffff00][size=14]' + mostrarNumero(metalD+(cristalD*1.5)+(deuD*3)) + '[/size][/color][/size]\n\n';
                textoBB += "[url='http://userscripts.org/scripts/show/73101']OGameRediseño Recursos Ampliados[/url]\n";
                
                var produccionBB = ""; 
                produccionBB += '<table border="0" width="100%"><tr><td width="50%"><p align="center"><textarea name="txtBB" style="background-color:#767F88;width:200px;height:80px;border: 2px solid #990000;" rows="5" cols="20" onFocus="javascript:this.select()">';
                produccionBB += translate(textoBB);
                produccionBB += '</textarea><br>{BBCODE_CON}</p></td><td width="50%"><p align="center">';
                			
	
	
				metalDS = cristalDS = deuDS = 0;
	
				for(var k = 0; k < sep.length; k++){
					if(sep[k].length > 3) {
						tmp_metal = options.get(sep[k] + "_metal");
						tmp_cristal = options.get(sep[k] + "_cristal");
						tmp_deu = options.get(sep[k] + "_deu");
						if(typeof metal == 'undefined') {
							//
						} else {
							metalDS += parseInt((Math.floor(tmp_metal-30)/1.1)+30)*24;
							cristalDS += parseInt(((tmp_cristal-15)/1.1)+15)*24;
							deuDS += parseInt(tmp_deu/1.1)*24;
						}
					}   
				}
				
				
                
                textoBB = "";
                textoBB += '[size=14][u][b]{PRODUCCION_DIARIA_DE} ' + getNombreJugador() + '[/b][/u] [/size][size=8](' + getFecha() + ') {SIN_GEOLOGO}[/size]\n\n';
				textoBB +=  numPlanets + ' {PLANETAS}\n\n';
                textoBB += '[size=12]{METAL}: [color=#9999ff]' + mostrarNumero(metalDS) + '[/color]\n';
                textoBB += '{CRISTAL}: [color=#00ff00]' + mostrarNumero(cristalDS) + '[/color]\n';
                textoBB += '{DEUTERIO}: [color=#ff00ff]' + mostrarNumero(deuDS) + '[/color][/size]\n\n';
                textoBB += '[size=12]{TOTAL}: [color=#999900][size=14]' + mostrarNumero(metalDS+cristalDS+deuDS) + '[/size][/color]\n';
                textoBB += '{EN_METAL}: [color=#ffff00][size=14]' + mostrarNumero(metalDS+(cristalDS*1.5)+(deuDS*3)) + '[/size][/color][/size]\n\n';
                textoBB += "[url='http://userscripts.org/scripts/show/73101']OGameRediseño Recursos Ampliados[/url]\n";
             
                produccionBB += '<textarea name="txtBB" style="background-color:#767F88;width:200px;height:80px;border: 2px solid #990000;" rows="5" cols="20" onFocus="javascript:this.select()">';
                produccionBB += translate(textoBB);
                produccionBB += '</textarea><br>{BBCODE_SIN}</p></td></tr></table>';
                
            } else {
                textoBB += '[size=14][u][b]{PRODUCCION_DIARIA_DE} ' + getNombreJugador() + '[/b][/u] [/size][size=8](' + getFecha() + ') {SIN_GEOLOGO}[/size]\n\n';
				textoBB +=  numPlanets + ' {PLANETAS}\n\n';
                textoBB += '[size=12]{METAL}: [color=#9999ff]' + mostrarNumero(metalD) + '[/color]\n';
                textoBB += '{CRISTAL}: [color=#00ff00]' + mostrarNumero(cristalD) + '[/color]\n';
                textoBB += '{DEUTERIO}: [color=#ff00ff]' + mostrarNumero(deuD) + '[/color][/size]\n\n';
                textoBB += '[size=12]{TOTAL}: [color=#999900][size=14]' + mostrarNumero(metalD+cristalD+deuD) + '[/size][/color]\n';
                textoBB += '{EN_METAL}: [color=#ffff00][size=14]' + mostrarNumero(metalD+(cristalD*1.5)+(deuD*3)) + '[/size][/color][/size]\n\n';
                textoBB += "[size=8][url='http://userscripts.org/scripts/show/133297']OGameRediseño Recursos Ampliados[/url][/size]\n";
                
                var produccionBB = '<p align="center"><br><textarea name="txtBB" style="background-color:#767F88;width:600px;height:100px;border: 2px solid #990000;" rows="5" cols="20" onFocus="javascript:this.select()">';
                produccionBB += translate(textoBB);
                produccionBB += '</textarea><br>{BBCODE}<br></p>';
            }        
                        
            // --- tabla de produccion de flotas ---
            var txtTablaFlotas = "";
            txtTablaFlotas += '<br><br><table cellspacing="0" cellpadding="0" style="margin-top: 0px;">';
            txtTablaFlotas += '<tr><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td></tr>'
            txtTablaFlotas += '<tr><td colspan="6"><font size="4" color="#FF6600"><b>* {PRODUCCION_FLOTA} *</b></font><br><br></tr>'
            txtTablaFlotas += '<tr><td></td><td class="label">{PRODUCCION}</td><td></td><td></td><td class="label">{EXCEDENTES_DIA}</td><td></td></tr>'
            txtTablaFlotas += '<tr><td></td><td class="label">{DIA}</td><td class="label">{SEMANA}</td><td class="label">{METAL}</td><td class="label">{CRISTAL}</td><td class="label">{DEUTERIO}</td></tr>'
            txtTablaFlotas += generarFilaProduccion("{P_CARGA}", metalD, cristalD, deuD, 2000, 2000, 0, "alt");
            txtTablaFlotas += generarFilaProduccion("{G_CARGA}", metalD, cristalD, deuD, 6000, 6000, 0);
            txtTablaFlotas += generarFilaProduccion("{C_LIGERO}", metalD, cristalD, deuD, 3000, 1000, 0, "alt");
            txtTablaFlotas += generarFilaProduccion("{C_PESADO}", metalD, cristalD, deuD, 6000, 4000, 0);
            txtTablaFlotas += generarFilaProduccion("{CRUCERO}", metalD, cristalD, deuD, 20000, 7000, 2000, "alt");
            txtTablaFlotas += generarFilaProduccion("{NBATALLA}", metalD, cristalD, deuD, 45000, 15000, 0);
            txtTablaFlotas += generarFilaProduccion("{COLONIZADOR}", metalD, cristalD, deuD, 10000, 20000, 10000, "alt");
            txtTablaFlotas += generarFilaProduccion("{RECICLADOR}", metalD, cristalD, deuD, 10000, 6000, 2000);
            txtTablaFlotas += generarFilaProduccion("{SONDA}", metalD, cristalD, deuD, 0, 1000,0, "alt");
            txtTablaFlotas += generarFilaProduccion("{BOMBARDERO}", metalD, cristalD, deuD, 50000, 25000, 15000);
            txtTablaFlotas += generarFilaProduccion("{DESTRUCTOR}", metalD, cristalD, deuD, 60000, 50000, 15000, "alt");
            txtTablaFlotas += generarFilaProduccion("{EDLM}", metalD, cristalD, deuD, 5000000, 4000000, 1000000);
            txtTablaFlotas += generarFilaProduccion("{ACORAZADO}", metalD, cristalD, deuD, 30000, 40000, 15000, "alt");
            txtTablaFlotas += generarFilaProduccion("{SATELITE}", metalD, cristalD, deuD, 0, 2000, 500, "");
            txtTablaFlotas += '</table>';
                             
            // --- tabla de produccion de defensas ---
            var txtTablaDef = "";
            txtTablaDef += '<br><br><table cellspacing="0" cellpadding="0" style="margin-top: 0px;">';
            txtTablaDef += '<tr><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td></tr>'
            txtTablaDef += '<tr><td colspan="6"><font size="4" color="#FF6600"><b>* {PRODUCCION_DEFENSAS} *</b></font><br><br></tr>'
            txtTablaDef += '<tr><td></td><td class="label">{PRODUCCION}</td><td></td><td></td><td class="label">{EXCEDENTES_DIA}</td><td></td></tr>'
            txtTablaDef += '<tr><td></td><td class="label">{DIA}</td><td class="label">{SEMANA}</td><td class="label">{METAL}</td><td class="label">{CRISTAL}</td><td class="label">{DEUTERIO}</td></tr>'
            txtTablaDef += generarFilaProduccion("{LANZAMISILES}", metalD, cristalD, deuD, 2000, 0, 0, "alt");
            txtTablaDef += generarFilaProduccion("{LASER_PEQ}", metalD, cristalD, deuD, 1500, 500, 0);
            txtTablaDef += generarFilaProduccion("{LASER_GRA}", metalD, cristalD, deuD, 6000, 2000, 0, "alt");
            txtTablaDef += generarFilaProduccion("{C_GAUS}", metalD, cristalD, deuD, 20000, 15000, 2000);
            txtTablaDef += generarFilaProduccion("{C_IONICO}", metalD, cristalD, deuD, 2000, 6000, 0, "alt");
            txtTablaDef += generarFilaProduccion("{C_PLASMA}", metalD, cristalD, deuD, 50000, 50000, 30000);
            txtTablaDef += generarFilaProduccion("{M_ANTI}", metalD, cristalD, deuD, 8000, 0, 2000, "alt");
            txtTablaDef += generarFilaProduccion("{M_PLAN}", metalD, cristalD, deuD, 15500, 2500, 10000);
            txtTablaDef += '</table>';
                        
            var txtBorrarC = '<p align="center"><br><br><br><font size="1"><br><br><a href="http://board.ogame.com.es/index.php?page=Thread&threadID=1097445" target="_blank">Foro (enlace)</a><br><br><br><a href="http://userscripts.org/scripts/source/133297.user.js" target="_blank">OGame-Rediseño Recursos Ampliados by HoChiChaos - update by jhonf</a> [version: ' + UPDATE.version +  ']<br><br>{TRANSLATE_BY}<BR></font></p>';
            
            divBorrarCookie.innerHTML = translate(txtBorrarC);
             
            // ---
            divRecursos.innerHTML = translate(tabla);
            divPorPlanetas.innerHTML = translate(tablaPlanetas);
            divAlmacen.innerHTML = translate(tablaAlmacen);
            divErr.innerHTML = translate(msgErr);
            divBB.innerHTML = translate(produccionBB);
            divFlotas.innerHTML = translate(txtTablaFlotas);
            divDefensas.innerHTML = translate(txtTablaDef);
            
            main.appendChild(divRecursos).appendChild(divErr).appendChild(divBB).appendChild(divPorPlanetas).appendChild(divAlmacen).appendChild(divFlotas).appendChild(divDefensas).appendChild(divBorrarCookie); 

	   }
            
    }
    
	
}) ()
