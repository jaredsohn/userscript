// ==UserScript==
// @version	       1.37.7
// @name           OGameRediseño Recursos Ampliados
// @author         HoChiChaos
// @date           2010-05-01
// @namespace      OGame
// @updateURL      http://userscripts.org/scripts/source/73101.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/73101.user.js
// @description    OGameRediseño Recursos Ampliados. Enlarged Display resources for OGame version 1.x 
// @include        http://*/game/index.php?page=*
// @require        http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==

(function () {
    
    var SCRIPT_VERSION = "1.37.7";
    
    var unsafe = (typeof unsafeWindow) != "undefined" ? unsafeWindow : window;
    
    const openImg  = "data:image/gif;base64," + 
        "R0lGODlhEgAQALMAACQuNxsiKRsiKBgcIxccHxYbH2B3ghccICMtNmN5hSUvOBYbHhggJAAAAAAAA" + 
        "AAAACH5BAAAAAAALAAAAAASABAAAARFMKhJq1WS6c07m164gWJIlt2JjgqXvPBrsF0McwpyLDxv94" + 
        "sDQgf0vYpCYnGRWCZ3y+gzKh1CqUACAlDAFgcAAeBCVoQjADs=";
    
    const closeImg = "data:image/gif;base64," +
        "R0lGODlhEgAQALMAACQuNxsiKRsiKBgcIxccHxYbH2B3ghccICMtNmN5hSUvOBYbHhggJAAAAAAAA" +
        "AAAACH5BAAAAAAALAAAAAASABAAAARFUABFq7VAjsW79wWAEF/ZHQhymCaqsqW7fkmbzl2ix7en/x" +
        "+UgkFk/I5FIqVoOCKLy6R0Gp1aGdWrNKuFDrvbwGV8CUQAADs=";
    
    
    var patron_basico;
    var patron_completo;
    
    
    function addEvent (el, evt, fxn)
    {
        if (el.addEventListener)
            el.addEventListener (evt, fxn, false);
        else if (el.attachEvent)
            el.attachEvent ("on" + evt, fxn);
            else
            el ['on' + evt] = fxn;
    }
    
    
    var LANG_ES = {
        domain: ".ogame.com.es || .ogame.es"
        ,produccion_imp: "Producción imperial de "
        ,recplaneta: "Recursos diarios por planeta "
        ,almacen_tiempo: "Almacén y tiempo de llenado"
        ,metal: "Metal"
        ,cristal: "Cristal"
        ,deuterio: "Deuterio"
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
        ,produccion_flota: "Producción estimada de flota"
        ,produccion_def: "Producción estimada de defensas"
        ,producc_diaria: "Producción diaria de"
        ,translate_by: ""
        ,bbcode: "BBCode"
        ,almacenes: "Almacenes"
        ,flota: "Flota"
        ,defensa: "Defensas"
        ,produccion_basica: "Producción básica"
        ,produccion_completa: "Producción completa"
        ,geologo: "Geólogo"
        
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
        domain: "*"
        ,produccion_imp: "Imperial Production for "
        ,recplaneta: "Daily resources per planet"
        ,almacen_tiempo: "Storage and filling time"
        ,metal: "Metal"
        ,cristal: "Crystal"
        ,deuterio: "Deuterium"
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
        ,produccion_flota: "Estimated fleet production"
        ,produccion_def: "Estimated defense production"
        ,producc_diaria: "Daily Production"
        ,bbcode: "BBCode"
        ,almacenes: "Storage"
        ,flota: "Fleet"
        ,defensa: "Defense"
        ,produccion_basica: "Basic production"
        ,produccion_completa: "Complete production"
        ,geologo: "Geologist"
        ,translate_by: ""
        
        
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
        domain: ".ogame.fr"
        ,produccion_imp: "Production Empire de "
        ,recplaneta: "Ressources par planète"
        ,almacen_tiempo: "Délai de remplissage des hangars"
        ,metal: "Métal"
        ,cristal: "Cristal"
        ,deuterio: "Deutérium"
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
        ,produccion_flota: "Production de Flotte"
        ,produccion_def: "Production de Défense"
        ,producc_diaria: "Production quotidienne"
        ,translate_by: "Traduit par Carlton2001"
        ,bbcode: "BBCode"
        ,almacenes: "Hangars"
        ,flota: "Flotte"
        ,defensa: "Défense"
        ,produccion_basica: "production base"
        ,produccion_completa: "production complète"
        ,geologo: "Géologue"
        
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
        domain: "*"
        ,produccion_imp: "Производство на империята, "
        ,recplaneta: "Ресурси на планетите"
        ,almacen_tiempo: "Време до запълване на складовете"
        ,metal: "Метал"
        ,cristal: "Кристали"
        ,deuterio: "Деутериум"
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
        ,produccion_flota: "Могат да се произведат следните кораби"
        ,produccion_def: "Могат да се произведат следните защити"
        ,producc_diaria: "Дневно производство"
        ,translate_by: "Български превод: Веселин Бончев"
        ,bbcode: "BBCode"
        ,almacenes: "Storage"
        ,flota: "Fleet"
        ,defensa: "Defense"
        ,produccion_basica: "Basic production"
        ,produccion_completa: "Complete production"
        ,geologo: "Geologist"
        
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
        domain: "*"
        ,produccion_imp:  "Выработка империи "
        ,recplaneta: "Выработка в сутки"
        ,almacen_tiempo: "Обьем и время заполнения хранилищ"
        ,metal: "Металл"
        ,cristal: "Кристалл"
        ,deuterio:  "Дейтерий"
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
        ,produccion_flota:  "Предположительное производство флота"
        ,produccion_def:  "Предположительное производство обороны"
        ,producc_diaria:  "Дневная производительность"
        ,translate_by: "Перевод: Hao и ImperatorT"
        ,bbcode: "BBCode"
        ,almacenes: "Storage"
        ,flota: "Fleet"
        ,defensa: "Defense"
        ,produccion_basica: "Basic production"
        ,produccion_completa: "Complete production"
        ,geologo: "Geologist"
        
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
        domain: "*" 
        ,produccion_imp: "帝國生產量, " 
        ,recplaneta: "行星產量" 
        ,almacen_tiempo: "距離儲存槽滿的時間" 
        ,metal: "金屬" 
        ,cristal: "晶體" 
        ,deuterio: "重氫" 
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
        ,produccion_flota: "預估生產艦隊" 
        ,produccion_def: "預估生產防禦" 
        ,producc_diaria: "日產" 
        ,translate_by: "" 
        ,bbcode: "BBCode"
        ,almacenes: "Storage"
        ,flota: "Fleet"
        ,defensa: "Defense"
        ,produccion_basica: "Basic production"
        ,produccion_completa: "Complete production"
        ,geologo: "Geologist"
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
        domain: "*"
        ,produccion_imp: "Παραγωγή αυτοκρατορίας για "
        ,recplaneta: "Πόροι ημερησίως ανά πλανήτη"
        ,almacen_tiempo: "Αποθήκες και χρόνος γεμίσματος"
        ,metal: "Μέταλλο"
        ,cristal: "Κρύσταλλο"
        ,deuterio: "Δευτέριο"
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
        ,produccion_flota: "Εκτιμώμενη παραγωγή στόλου"
        ,produccion_def: "Εκτιμώμενη παραγωγή άμυνας"
        ,producc_diaria: "Ημερήσια παραγωγή"
        ,translate_by: "Μετάφραση στα Ελληνικά: MasterMind33"
        ,bbcode: "BBCode"
        ,almacenes: "Storage"
        ,flota: "Fleet"
        ,defensa: "Defense"
        ,produccion_basica: "Basic production"
        ,produccion_completa: "Complete production"
        ,geologo: "Geologist"
        
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
        domain: "*"
        ,produccion_imp: "Rigets Produktion, "
        ,recplaneta: "Daglig produktion"
        ,almacen_tiempo: "Lager og tid til de er fyldte"
        ,metal: "Metal"
        ,cristal: "Krystal"
        ,deuterio: "Deuterium"
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
        ,produccion_flota: "Estimeteret produktion af flåde"
        ,produccion_def: "Estimeteret produktion af forsvar"
        ,producc_diaria: "Daglig Produktion"
        ,translate_by: "Bangsholt"
        ,bbcode: "BBCode"
        ,almacenes: "Storage"
        ,flota: "Fleet"
        ,defensa: "Defense"
        ,produccion_basica: "Basic production"
        ,produccion_completa: "Complete production"
        ,geologo: "Geologist"
        
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
        domain: ".ogame.it" 
        ,produccion_imp: "Produzione impero di " 
        ,recplaneta: "Risorse giornaliere per pianeta" 
        ,almacen_tiempo: "Depositi e tempi di riempimento" 
        ,metal: "Metallo" 
        ,cristal: "Cristallo" 
        ,deuterio: "Deuterio" 
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
        ,produccion_flota: "Produzione stimata navi" 
        ,produccion_def: "Produzione stimata difese" 
        ,producc_diaria: "Produzione giornaliera" 
        ,translate_by: "Traduzione italiana a cura di: " 
        ,bbcode: "BBCode"
        ,almacenes: "Storage"
        ,flota: "Fleet"
        ,defensa: "Defense"
        ,produccion_basica: "Basic production"
        ,produccion_completa: "Complete production"
        ,geologo: "Geologist"
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
        domain: ".ogame.com.pt"  
        ,produccion_imp: "Produção no Império de "  
        ,recplaneta: "Produção diária"  
        ,almacen_tiempo: "Armazéns e tempo restante para ficarem cheios"  
        ,metal: "Metal"  
        ,cristal: "Cristal"  
        ,deuterio: "Deutério"  
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
        ,produccion_flota: "Produção de Frota "  
        ,produccion_def: "Produção de Defesa"  
        ,producc_diaria: "Produção Diária"  
        ,translate_by: "Tradução Portuguesa por: WDFOX"  
        ,bbcode: "BBCode"
        ,almacenes: "Storage"
        ,flota: "Fleet"
        ,defensa: "Defense"
        ,produccion_basica: "Basic production"
        ,produccion_completa: "Complete production"
        ,geologo: "Geologist"
        
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
        produccion_imp: "Wydobycie w imperium "  
        ,recplaneta: "Dzienne wydobycie planet"  
        ,almacen_tiempo: "pojemność i czas wypełnienia magazynów"  
        ,metal: "Metal"  
        ,cristal: "Kryształ"  
        ,deuterio: "Deuter"   
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
        ,produccion_flota: "Szacowana produkcja floty"  
        ,produccion_def: "Szacowana budowa obrony"  
        ,producc_diaria: "Dzienna produkcja"  
        ,translate_by: "Polskie tłumaczenie: pomylony"
        ,bbcode: "BBCode"
        ,almacenes: "Storage"
        ,flota: "Fleet"
        ,defensa: "Defense"
        ,produccion_basica: "Basic production"
        ,produccion_completa: "Complete production"
        ,geologo: "Geologist"
        
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
        domain: "*"
        ,produccion_imp: "Gesamt-Produktion für "
        ,recplaneta: "Tägliche Resourcenproduktion pro Planet"
        ,almacen_tiempo: "Speicherkapazität | Zeit bis Speicher voll"
        ,metal: "Metall"
        ,cristal: "Kristall"
        ,deuterio: "Deuterium"
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
        ,produccion_flota: "Mögliche Flottenproduktion"
        ,produccion_def: "Mögliche Produktion Verteidigungsanlagen"
        ,producc_diaria: "Tägliche Produktion"
        ,translate_by: "Deutsche Übersetzung von Killercorny"
        ,bbcode: "BBCode"
        ,almacenes: "Storage"
        ,flota: "Fleet"
        ,defensa: "Defense"
        ,produccion_basica: "Basic production"
        ,produccion_completa: "Complete production"
        ,geologo: "Geologist"
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
    
    var LANG_NL = {
        domain: "*"  
        ,produccion_imp: "Imperium productie voor "
        ,recplaneta: "Dagelijks inkomsten per planeet"  
        ,almacen_tiempo: "Opslag en vultijd"  
        ,metal: "Metaal"  
        ,cristal: "Kristal"  
        ,deuterio: "Deuterium"   
        ,total: "Totaal (M+K+D)"
        ,en_metal: "In metaal (3x2x1 ratio)"  
        ,diaria: "Dagelijks"  
        ,semanal: "Wekelijks"  
        ,mensual: "Maandelijks"  
        ,planetas: "planeten"  
        ,produccion: "Productie"  
        ,excedentes: "Overschot per dag"  
        ,dia: "Dag"  
        ,semana: "Week"  
        ,hora: "Per uur"
        ,produccion_flota: "Geschatte vloot productie"  
        ,produccion_def: "Geschatte Verdediging productie"
        ,producc_diaria: "Dagelijkse Productie"  
        ,translate_by: "Dutch Translation by: Sanctuary" 
        ,bbcode: "BBCode"
        ,almacenes: "Opslag"
        ,flota: "Vloot"
        ,defensa: "Verdediging"
        ,produccion_basica: "Basis productie"
        ,produccion_completa: "Complete productie"
        ,geologo: "Geoloog"
        
        ,p_carga: "Klein vrachtschip"  
        ,g_carga: "Groot vrachtschip"  
        ,c_ligero: "Licht gevechtsschip"  
        ,c_pesado: "Zwaar gevechtsschip"  
        ,crucero: "Kruiser"  
        ,nbatalla: "Slagschip"  
        ,colonizador: "Kolonisatieschip"  
        ,reciclador: "Recycler"  
        ,sonda: "Spionagesonde"  
        ,bombardero: "Bommenwerper"  
        ,destructor: "Vernietiger"  
        ,edlm: "Ster des Doods"  
        ,acorazado: "Interceptor"  
        ,satelite: "Zonne-energiesatelliet"  
        
        ,lanzamisiles: "Raketlanceerder"  
        ,laser_peq: "Kleine laser"  
        ,laser_gra: "Grote laser"  
        ,c_gaus: "Gausskanon"  
        ,c_ionico: "Ionkanon"  
        ,c_plasma: "Plasmakanon"  
        ,m_anti: "Anti-ballistische raketten."  
        ,m_plan: "Interplanetaire raketten"  
        
        ,h_hora: "h"  
        ,d_dia: "d"  
        ,s_semana: "w"
    };
    
    
    
    var op = function () {
        this.set = function(key, value) {
            return localStorage.setItem ("ogres_" + getServer() + "_" + key, value);
        }
        
        this.get = function(key){
            var def = 0;
            return localStorage.getItem ("ogres_" + getServer() + "_" + key) || def;
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
        num = parseInt(num);
        var neg = "";
        
        if(num<0) {
            neg = "-";
            num *= -1;
        }
        
        var nNmb = String(parseInt(num)); 
        var sRes = "";
        for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
            sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
        
        return neg + sRes;
    }
    
    
    function getPosActual () {
        return "[" + document.getElementsByName("ogame-planet-coordinates")[0].content + "]";
    }
    
    
    function getNombreJugador () {
        return document.getElementsByName("ogame-player-name")[0].content;
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
    
    function equipoComandoActivo() {
        var salida = true;
        var oficiales = document.getElementById("officers").getElementsByTagName("a");
        
        var i = 0;
        for(i = 0; i < 5; i++) {
            var oficial = oficiales[i].className;
            if(oficial.indexOf(" on ") == -1) {
                salida = false;
            }
        }
        return salida;
    }
    
    
    function getFecha()  {
        var fecha=new Date();
        return fecha.getFullYear() + "/" + (fecha.getMonth()+1) + "/" + fecha.getDate() ;
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
        
        salida += '<tr class="' + c + '" align="right"><td class="label">' + nombre + '</td><td class="undermark"><b>'
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
        var tdValue = rowElem.cells[col];
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
    
    
    function getNivelMina(tipo, sep, pos) {
        
        var ret = "";
        var mediana = 0;
        var nivel = 0;
        
        switch(tipo)
        {
            case 1:
                var lista = new Array(sep.length);
                
                for(var k = 0; k < sep.length; k++){
                    var planeta = new ObjPlaneta();
                    planeta.load(options.get(sep[k] + "_objplanet"));
                    lista[k]  = planeta.metal_nivel_mina*10;
                    if(k == pos) {
                        nivel = planeta.metal_nivel_mina*10;
                    }
                }
                lista.sort(sortNumerico);
                var mitad = parseInt(sep.length/2)
                mediana = lista[mitad-1];
                break;
            case 2:
                var lista = new Array(sep.length);
                
                for(var k = 0; k < sep.length; k++){
                    var planeta = new ObjPlaneta();
                    planeta.load(options.get(sep[k] + "_objplanet"));
                    lista[k]  = planeta.cristal_nivel_mina*10;
                    if(k == pos) {
                        nivel = planeta.cristal_nivel_mina*10;
                    }
                }
                lista.sort(sortNumerico);
                var mitad = parseInt(sep.length/2)
                mediana = lista[mitad-1];
                break;
            case 3: 
                var lista = new Array(sep.length);
                
                for(var k = 0; k < sep.length; k++){
                    var planeta = new ObjPlaneta();
                    planeta.load(options.get(sep[k] + "_objplanet"));
                    lista[k]  = planeta.deuterio_nivel_mina*10;
                    if(k == pos) {
                        nivel = planeta.deuterio_nivel_mina*10;
                    }
                }
                lista.sort(sortNumerico);
                var mitad = parseInt(sep.length/2)
                mediana = lista[mitad-1];
                break;
            default:
                break;
        }
        
        
        
        if(nivel < mediana) {
            ret = ' <font color="#FF0000"><b>[' + nivel/10 + ']</b></font>';
        } else {
            if(nivel == mediana) {
                ret = ' <font color="#A9BCF5"><b>[' + nivel/10 + ']</b></font>';
            } else {
                ret = ' <font color="#5858FA"><b>[' + nivel/10 + ']</b></font>';
            }
        }	
        
        return ret;
    }
    
    
    
    function getStrNiveles(tipo, sep) {
        
        var ret = "";
        var lista = new Array(sep.length);
        
        switch(tipo)
        {
            case 1:
                for(var k = 0; k < sep.length; k++){
                    var planeta = new ObjPlaneta();
                    planeta.load(options.get(sep[k] + "_objplanet"));
                    lista[k] = planeta.metal_nivel_mina*10;
                }
                break;
            case 2:
                for(var k = 0; k < sep.length; k++){
                    var planeta = new ObjPlaneta();
                    planeta.load(options.get(sep[k] + "_objplanet"));
                    lista[k] = planeta.cristal_nivel_mina*10;
                }
                break;
            case 3: 
                for(var k = 0; k < sep.length; k++){
                    var planeta = new ObjPlaneta();
                    planeta.load(options.get(sep[k] + "_objplanet"));
                    lista[k] = planeta.deuterio_nivel_mina*10;
                }
                break;
            default:
                break;
        }
        
        
        lista.sort(sortNumerico);
        
        for(var k = 0; k < lista.length-1; k++) {
            ret += lista[k]/10 + " ";
        }
        
        return ret;
    }
    
    
    
    function sortNumerico(a,b){
        if (a < b) return 1;
        if (a > b) return -1;
        if (a = b) return 0;
    }
    
    
    function mostrarDetallesRecursos(id) {
        var asig;
        
        var img = document.getElementById("img_" + id);
        var fila = document.getElementById(id + "_1");
        
        if (fila.style.display != "none") {
            asig = "none";
            img.setAttribute ("src", openImg);
        } else {
            asig = "";
            img.setAttribute ("src", closeImg);
        }
        
        for(var i = 1; (fila = document.getElementById(id + "_" + i)) != null; i++) {
            fila.style.display = asig;
        }
    }
    
    
    function mostrarSeccion(id) {
        var div = document.getElementById("sec_" + id);
        var anterior = div.style.display;
        var img;
        
        
        for(var i = 1; (div = document.getElementById("sec_" + i)) != null; i++) {
            div.style.display = "none";
            img = document.getElementById("img_sec" + i);
            img.setAttribute("src", openImg);
        }
        
        for(var i = 1; (fila = document.getElementById("mostrar_sec" + i)) != null; i++) {
            fila.parentNode.style.backgroundColor = "#240B3B";
        }
        
        
        div = document.getElementById("sec_" + id);
        img = document.getElementById("img_sec" + id);
        
        if (anterior != "none") {
            div.style.display = "none";
            img.setAttribute("src", openImg);
            document.getElementById("mostrar_sec" + id).parentNode.style.backgroundColor = "#240B3B";
        } else {
            div.style.display = "";
            img.setAttribute("src", closeImg);
            document.getElementById("mostrar_sec" + id).parentNode.style.backgroundColor = "#4C0B5F";
        }
        
        
    }
    
    // ============================================================
    // ============================================================
    
    
    function translate(text) {
        
        text = text.replace(/{RECURSOS_PLANETAS}/gi, LANG.recplaneta)
        text = text.replace(/{PRODUCCION_IMPERIAL}/gi, LANG.produccion_imp)
        text = text.replace(/{METAL}/gi, LANG.metal)
        text = text.replace(/{CRISTAL}/gi, LANG.cristal)
        text = text.replace(/{DEUTERIO}/gi, LANG.deuterio)
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
        text = text.replace(/{TRANSLATE_BY}/gi, LANG.translate_by)
        text = text.replace(/{EN_METAL}/gi, LANG.en_metal)
        
        text = text.replace(/{BBCODE}/gi, LANG.bbcode)
        text = text.replace(/{ALMACENES}/gi, LANG.almacenes)
        text = text.replace(/{FLOTA}/gi, LANG.flota)
        text = text.replace(/{DEFENSA}/gi, LANG.defensa)
        text = text.replace(/{PRODUCCION_BASICA}/gi, LANG.produccion_basica)
        text = text.replace(/{PRODUCCION_COMPLETA}/gi, LANG.produccion_completa)
        text = text.replace(/{GEOLOGO}/gi, LANG.geologo)
        
        
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
    
    
    function codificar(patron, tipo) {
        var marcas = new Array();
        
        var colores = [
            [/{COLOR_METAL}/gi, '#9999ff'],
            [/{COLOR_CRISTAL}/gi, '#00ff00'],
            [/{COLOR_DEUTERIO}/gi, '#ff00ff'],
            [/{COLOR_TOTAL1}/gi, '#999900'], 
            [/{COLOR_TOTAL2}/gi, '#ffff00']];
        
        
        if(tipo == "html") {
            
            marcas = [
                [/{B}/gi, '<b>'],
                [/{\/B}/gi, '</b>'],
                [/{U}/gi, '<u>'],
                [/{\/U}/gi, '</u>'],
                [/{NL}/gi, '<br>\n'],
                [/{SIZE_PEQ}/gi, '<font style="font-size:8pt;">'],
                [/{SIZE_MED}/gi, '<font style="font-size:8pt;">'],
                [/{SIZE_GRA}/gi, '<font style="font-size:11pt;">'],
                [/{\/SIZE}/gi, '</font>'],
                [/{\/COLOR}/gi, '</font>'] ];
            
            patron = patron.replace(/{URL_SCRIPT}/gi, '<a href="http://userscripts.org/scripts/show/73101">OGameRediseño Recursos Ampliados ' + SCRIPT_VERSION.substr(0,SCRIPT_VERSION.lastIndexOf(".")) + '</a>');
            
            for(var i = 0; i < colores.length; i++)
                patron = patron.replace(colores[i][0],'<font color="' + colores[i][1] + '">');
        }
        
        
        if(tipo == "phpbb") {
            
            marcas = [
                [/{B}/gi, '[b]'],
                [/{\/B}/gi, '[/b]'],
                [/{U}/gi, '[u]'],
                [/{\/U}/gi, '[/u]'],
                [/{NL}/gi, '\n'],
                [/{SIZE_PEQ}/gi, '[size=9]'],
                [/{SIZE_MED}/gi, '[size=12]'],
                [/{SIZE_GRA}/gi, '[size=14]'],
                [/{\/SIZE}/gi, '[/size]'],
                [/{\/COLOR}/gi, '[/color]'] ];
            
            patron = patron.replace(/{URL_SCRIPT}/gi, '[url=http://userscripts.org/scripts/show/73101]OGameRediseño Recursos Ampliados ' + SCRIPT_VERSION.substr(0,SCRIPT_VERSION.lastIndexOf(".")) + '[/url]');
            
            for(var i = 0; i < colores.length; i++)
                patron = patron.replace(colores[i][0],'[color=' + colores[i][1] + ']');
        }
        
        
        for(var i = 0; i < marcas.length; i++)
            patron = patron.replace(marcas[i][0],marcas[i][1]);
        
        
        return patron;
    }
    
    
    function setTxtBBCode(tipo) {
        
        if(tipo == 0) {
            document.getElementById("txtBB").value = codificar(bbcode_basico, "phpbb");
            document.getElementById("preview").innerHTML = codificar(bbcode_basico, "html");
        } else {
            document.getElementById("txtBB").value = codificar(bbcode_completo, "phpbb");
            document.getElementById("preview").innerHTML = codificar(bbcode_completo, "html");
        }
        
    }
    
    
    function getNivelPlasma() {
        var lista = getElementsByClass("list")[0];
        var nivel_plasma = getContenido(lista, 9,0).innerHTML;
        nivel_plasma = parseInt(nivel_plasma.replace(/\D/g,''));
        return nivel_plasma;
    }
    
    
    function ObjPlaneta() {
        var metal_base;
        var metal_produccion_mina;
        var metal_produccion_amplificador;
        var metal_nivel_mina;
        
        var cristal_base;
        var cristal_produccion_mina;
        var cristal_produccion_amplificador;
        var cristal_nivel_mina;
        
        var deuterio_base;
        var deuterio_produccion_mina;
        var deuterio_produccion_amplificador;
        var deuterio_nivel_mina;
        var deuterio_gasto_fusion;
        
        var almacen_metal;
        var almacen_cristal;
        var almacen_deuterio;
        
        var nombre;
        var coordenadas;
        var actualizado;
        
        this.save = function() {
            var ret = "";
            var separador = "|#";
            
            ret += this.metal_base + separador;
            ret += this.metal_produccion_mina + separador;
            ret += this.metal_produccion_amplificador + separador;
            ret += this.metal_nivel_mina + separador;
            
            ret += this.cristal_base + separador;
            ret += this.cristal_produccion_mina + separador;
            ret += this.cristal_produccion_amplificador + separador;
            ret += this.cristal_nivel_mina + separador;
            
            ret += this.deuterio_base + separador;
            ret += this.deuterio_produccion_mina + separador;
            ret += this.deuterio_produccion_amplificador + separador;
            ret += this.deuterio_nivel_mina + separador;
            ret += this.deuterio_gasto_fusion + separador;
            
            ret += this.almacen_metal + separador;
            ret += this.almacen_cristal + separador;
            ret += this.almacen_deuterio + separador;
            
            ret += this.nombre + separador;
            ret += this.coordenadas + separador;
            
            ret += this.actualizado + separador;
            
            return ret;
        }
        
        this.load = function(saved) {
            var str = saved + "  ";
            var partes = str.split("|#");
            
            this.metal_base = partes[0] || 0;
            this.metal_produccion_mina = partes[1] || 0;
            this.metal_produccion_amplificador = partes[2] || 0;
            this.metal_nivel_mina = partes[3] || 0;
            
            this.cristal_base = partes[4] || 0;
            this.cristal_produccion_mina = partes[5] || 0;
            this.cristal_produccion_amplificador = partes[6] || 0;
            this.cristal_nivel_mina = partes[7] || 0;
            
            this.deuterio_base = partes[8] || 0;
            this.deuterio_produccion_mina = partes[9] || 0;
            this.deuterio_produccion_amplificador = partes[10] || 0;
            this.deuterio_nivel_mina = partes[11] || 0;
            this.deuterio_gasto_fusion = partes[12] || 0;
            
            this.almacen_metal = partes[13] || 0;
            this.almacen_cristal = partes[14] || 0;
            this.almacen_deuterio = partes[15] || 0;
            
            this.nombre = partes[16] || "-";
            this.coordenadas = partes[17] || "-";
            
            this.actualizado = new Date(partes[18] || "");
            
        }
        
        this.getTotalM = function() {
            var total = 0;
            var geo = 0;
            
            var base = parseInt(this.metal_base || 0);
            var mina = parseInt(this.metal_produccion_mina || 0);
            var plasma = (this.metal_produccion_mina || 0) * getNivelPlasma() / 100;
            var amplificador = parseInt(this.metal_produccion_amplificador || 0);
            
            if(equipoComandoActivo()) {
                geo = (this.metal_produccion_mina || 0) * 0.12;
            } else {
                
                if(geologoActivo()) {
                    geo = (this.metal_produccion_mina ||0) * 0.10;
                }
            }
            return base + mina + geo + plasma + amplificador;
        }
        
        this.getTotalC = function() {
            var total = 0;
            var geo = 0;
            
            var base = parseInt(this.cristal_base || 0);
            var mina = parseInt(this.cristal_produccion_mina || 0);
            var plasma = (this.cristal_produccion_mina || 0) * (getNivelPlasma() * 0.66) / 100;
            var amplificador = parseInt(this.cristal_produccion_amplificador || 0);
            
            if(equipoComandoActivo()) {
                geo = (this.cristal_produccion_mina ||0) * 0.12;
            } else {
                
                if(geologoActivo()) {
                    geo = (this.cristal_produccion_mina ||0) * 0.10;
                }
            }
            return base + mina + geo + plasma + amplificador;
        }
        
        this.getTotalD = function() {
            var total = 0;
            var geo = 0;
            
            var mina = parseInt(this.deuterio_produccion_mina || 0);
            var amplificador = parseInt(this.deuterio_produccion_amplificador || 0);
            var fusion = parseInt(this.deuterio_gasto_fusion || 0);
            
            if(equipoComandoActivo()) {
                geo = (this.deuterio_produccion_mina ||0) * 0.12;
            } else {
                
                if(geologoActivo()) {
                    geo = (this.deuterio_produccion_mina ||0) * 0.10;
                }
            }
            return mina + geo + amplificador - fusion;
        }
        
        this.getActualizado = function() {
            var str = "  ";
            var ahora = new Date();
            var dif = (ahora - this.actualizado) || -1;
            
            if(dif == -1) {
                return "";
            }
            
            var dias = Math.floor(dif / 86400000);
            dif -= dias * 86400000;
            var horas = Math.floor(dif / 3600000);
            dif -= horas * 3600000;
            var minutos = Math.floor(dif / 60000);
            dif -= minutos * 60000;
            var segundos = Math.floor(dif / 1000);
            
            if(dias > 0) {
                str += '<font color="#FF0000">(' + dias + 'd' + horas + 'h)</font>';
            }
            else {
                if(horas < 3) {
                    if(horas == 0 && minutos < 60) {
                        str += '<font color="#01DF01">(' + minutos + 'm)</font>';
                        if(minutos == 0 && segundos < 5) {
                            str += '<font color="red"><b> <<-- updated -->> </b></font>';
                        }
                    } else {
                        str += '<font color="#01DF01">(' + horas + 'h' + minutos + 'm)</font>';
                    }
                }
                else {
                    str += '<font color="#FFFF00">(' + horas + 'h' + minutos + 'm)</font>';
                }
            }
            
            return str;
        }
        
        
        
    }
    
    function getStrSummary(str) {
        var lista = getElementsByClass("list")[0];
        var ret = "";
        
        if(str.toUpperCase() == "BASICO") {
            ret = getContenido(lista, 2,0).innerHTML;
        }
        
        if(str.toUpperCase() == "METAL") {
            ret = getContenido(lista, 3,0).innerHTML;
            ret = ret.substring(0, ret.indexOf("("));
            ret = ret.replace(/\./g, "").replace(/\,/g, "").trim();
        }
        
        if(str.toUpperCase() == "CRISTAL") {
            ret = getContenido(lista, 4,0).innerHTML;
            ret = ret.substring(0, ret.indexOf("("));
            ret = ret.replace(/\./g, "").replace(/\,/g, "").trim();
        }
        
        if(str.toUpperCase() == "DEUTERIO") {
            ret = getContenido(lista, 5,0).innerHTML;
            ret = ret.substring(0, ret.indexOf("("));
            ret = ret.replace(/\./g, "").replace(/\,/g, "").trim();
        }
        
        if(str.toUpperCase() == "FUSION") {
            ret = getContenido(lista, 7,0).innerHTML;
            ret = ret.substring(0, ret.indexOf("("));
            ret = ret.replace(/\./g, "").replace(/\,/g, "").trim();
        }
        
        if(str.toUpperCase() == "PLASMA") {
            ret = getContenido(lista, 9,0).innerHTML;
            ret = ret.substring(0, ret.indexOf("("));
            ret = ret.replace(/\./g, "").replace(/\,/g, "").trim();
        }
        
        if(str.toUpperCase() == "AMPLIFICADOR") {
            ret = getContenido(lista, 10,0).innerHTML;
            ret = ret.replace(/\./g, "").replace(/\,/g, "").trim();
        }
        
        if(str.toUpperCase() == "TOTAL_DIA") {
            ret = getContenido(lista, 13,0).innerHTML;
            ret = ret.replace(/\./g, "").replace(/\,/g, "").trim();
            ret = ret.replace("<em>","").replace("</em>","");
        }
        
        
        
        return ret;
    }
    
    
    
    function getDatosSummary() {
        
        
        var tipo = document.getElementsByName("ogame-planet-type")[0].content;
        
        if(tipo.indexOf("planet") != -1) {
            
            var parcial = 0;
            
            var planeta = new ObjPlaneta();
            
            planeta.nombre = document.getElementsByName("ogame-planet-name")[0].content;
            planeta.coordenadas = "[" + document.getElementsByName("ogame-planet-coordinates")[0].content + "]"; 
            planeta.actualizado = new Date();
            
            
            var metal = 0;
            var cristal = 0;
            var deu = 0;
            
            var almM = 0;
            var almC = 0;
            var almD = 0;
            
            var baseM = baseC = baseD = 0;
            var minaM = minaC = minaD = 0;
            var plasmaM = plasmaC = 0;
            
            var lista = getElementsByClass("list")[0];
            
            
            // ------- metal --------------------
            
            // produccion base
            parcial = getContenido(lista, 2,1).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.replace(/\./g, "").replace(/\,/g, "").trim();
            planeta.metal_base = parseInt(parcial);
            
            // produccion minas
            parcial = getContenido(lista, 3,2).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.replace(/\./g, "").replace(/\,/g, "").trim();
            planeta.metal_produccion_mina = parseInt(parcial);
            
            // nivel de mina
            parcial = getContenido(lista, 3,0).innerHTML;
            parcial = parcial.replace(/\D/g,'');
            planeta.metal_nivel_mina = parseInt(parcial)
            
            // amplificador
            parcial = getContenido(lista, 10,2).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.replace(/\./g, "").replace(/\,/g, "").trim();
            planeta.metal_produccion_amplificador = parseInt(parcial);
            
            
            
            
            // ---------- cristal ---------------------
            
            // produccion base
            parcial = getContenido(lista, 2,2).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.replace(/\./g, "").replace(/\,/g, "").trim();
            planeta.cristal_base = parseInt(parcial);
            
            // produccion minas
            parcial = getContenido(lista, 4,3).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.replace(/\./g, "").replace(/\,/g, "").trim();
            planeta.cristal_produccion_mina = parseInt(parcial);
            
            // nivel de mina
            parcial = getContenido(lista, 4,0).innerHTML;
            parcial = parcial.replace(/\D/g,'');
            planeta.cristal_nivel_mina = parseInt(parcial);
            
            // amplificador
            parcial = getContenido(lista, 10,3).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.replace(/\./g, "").replace(/\,/g, "").trim();
            planeta.cristal_produccion_amplificador = parseInt(parcial);
            
            
            // ------- deuterio ------------------------------
            
            planeta.deuterio_base = 0;
            
            // deuterio produccion minas
            parcial = getContenido(lista, 5,4).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.replace(/\./g, "").replace(/\,/g, "").trim();
            planeta.deuterio_produccion_mina = parseInt(parcial);
            
            // deuterio nivel de mina
            parcial = getContenido(lista, 5,0).innerHTML;
            parcial = parcial.replace(/\D/g,'');
            planeta.deuterio_nivel_mina = parseInt(parcial);
            
            // deuterio resta el gasto de la planta de fusion
            parcial = getContenido(lista, 7,4).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.replace(/\./g, "").replace(/\,/g, "").trim();
            planeta.deuterio_gasto_fusion = parseInt(parcial);
            
            // amplificador
            parcial = getContenido(lista, 10,4).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.replace(/\./g, "").replace(/\,/g, "").trim();
            planeta.deuterio_produccion_amplificador = parseInt(parcial);
            
            
            // ----- almacenes ------------------------------------------------------------
            
            // almacen de metal
            parcial = getContenido(lista, 11,1).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.trim();
            if(parcial.indexOf(unsafe.LocalizationStrings.unitMega) != -1) {
                parcial = parcial.replace(unsafe.LocalizationStrings.unitMega,'').replace(',', '.');
                parcial = parseFloat(parcial);
                parcial *= 1000000;
            }
            else  {
                parcial = parcial.replace('.', '');
            }
            planeta.almacen_metal = parseInt(parcial);
            
            
            // almacen de cristal
            parcial = getContenido(lista, 11,2).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.trim();
            if(parcial.indexOf(unsafe.LocalizationStrings.unitMega) != -1) {
                parcial = parcial.replace(unsafe.LocalizationStrings.unitMega,'').replace(',', '.');
                parcial = parseFloat(parcial);
                parcial *= 1000000;
            }
            else  {
                parcial = parcial.replace('.', '');
            }
            planeta.almacen_cristal = parseInt(parcial);
            
            
            // almacen de deuterio
            parcial = getContenido(lista, 11,3).innerHTML;
            parcial = parcial.substring(parcial.indexOf('">')+2, parcial.indexOf("</span>"));
            parcial = parcial.trim();
            if(parcial.indexOf(unsafe.LocalizationStrings.unitMega) != -1) {
                parcial = parcial.replace(unsafe.LocalizationStrings.unitMega,'').replace(',', '.');
                parcial = parseFloat(parcial);
                parcial *= 1000000;
            }
            else  {
                parcial = parcial.replace('.', '');
            }
            planeta.almacen_deuterio = parseInt(parcial);
            
            
            
            
            // ----------- geologo ------------------------------------------
            // resta el bonus del geologo de la produccion base de la mina
            
            if(equipoComandoActivo()) {
                planeta.metal_produccion_mina = parseInt((planeta.metal_produccion_mina/112)*100);
                planeta.cristal_produccion_mina = parseInt((planeta.cristal_produccion_mina/112)*100);
                planeta.deuterio_produccion_mina = parseInt((planeta.deuterio_produccion_mina/112)*100);
            } else {
                if(geologoActivo()) {
                    planeta.metal_produccion_mina = parseInt((planeta.metal_produccion_mina/110)*100);
                    planeta.cristal_produccion_mina = parseInt((planeta.cristal_produccion_mina/110)*100);
                    planeta.deuterio_produccion_mina = parseInt((planeta.deuterio_produccion_mina/110)*100);
                }
            }
            
            
            options.set(getPosActual() + "_objplanet", planeta.save());
            
        }
        
    }
    
    
    // ============================================================
    // ============================================================
    // ============================================================
    
    
    
    if ( location.href.indexOf('/game/index.php?page=resourceSettings') != -1 ) {
        
        getDatosSummary(); 
        
        
        var LANG = LANG_EN;
        
        
        if (location.href.indexOf('-es.ogame.gameforge.com') != -1) { LANG = LANG_ES; } 
        if (location.href.indexOf('-ar.ogame.gameforge.com') != -1) { LANG = LANG_ES; } 
        if (location.href.indexOf('-mx.ogame.gameforge.com') != -1) { LANG = LANG_ES; } 
        if (location.href.indexOf('-bg.ogame.gameforge.com') != -1) { LANG = LANG_BG; } 
        if (location.href.indexOf('-pt.ogame.gameforge.com') != -1) { LANG = LANG_PT; } 
        if (location.href.indexOf('-br.ogame.gameforge.com') != -1) { LANG = LANG_PT; } 
        if (location.href.indexOf('-dk.ogame.gameforge.com') != -1) { LANG = LANG_DA; } 
        if (location.href.indexOf('-ru.ogame.gameforge.com') != -1) { LANG = LANG_RU; } 
        if (location.href.indexOf('-tw.ogame.gameforge.com') != -1) { LANG = LANG_TW; } 
        if (location.href.indexOf('-fr.ogame.gameforge.com') != -1) { LANG = LANG_FR; } 
        if (location.href.indexOf('-gr.ogame.gameforge.com') != -1) { LANG = LANG_GR; } 
        if (location.href.indexOf('-it.ogame.gameforge.com') != -1) { LANG = LANG_IT; } 
        if (location.href.indexOf('-pl.ogame.gameforge.com') != -1) { LANG = LANG_PL; } 
        if (location.href.indexOf('-de.ogame.gameforge.com') != -1) { LANG = LANG_DE; } 
        if (location.href.indexOf('-nl.ogame.gameforge.com') != -1) { LANG = LANG_NL; }
        
        
        var nivel_plasma = getNivelPlasma();
        
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
            var sep = listaPlanetas.split(";");
            
            var plasmaM = plasmaC = plasmaD = 0;
            var baseM = baseC = baseD = 0;
            var minaM = minaC = minaD = 0;
            var geoM = geoC = geoD = 0;
            var amplificadoresM = amplificadoresC = amplificadoresD = 0;
            
            var geoSTR = " (+0%)";
            var plasmaSTR_metal = " (+" + nivel_plasma + "%)";
            var plasmaSTR_cristal = " (+" + (Math.round((nivel_plasma*0.66)*100)/100)  + "%)";
            
            var gastoFusion = 0;
            
            var totalM = totalC = totalD = 0;
            
            
            
            for(var k = 0; k < sep.length; k++){
                if(sep[k].length > 3) {
                    var planeta = new ObjPlaneta();
                    planeta.load(options.get(sep[k] + "_objplanet"));
                    
                    baseM += parseInt(planeta.metal_base || 0);
                    baseC += parseInt(planeta.cristal_base || 0);
                    baseD += parseInt(planeta.deuterio_base || 0);
                    
                    minaM += parseInt(planeta.metal_produccion_mina || 0);
                    minaC += parseInt(planeta.cristal_produccion_mina || 0);
                    minaD += parseInt(planeta.deuterio_produccion_mina || 0);
                    
                    plasmaM += (planeta.metal_produccion_mina || 0) * nivel_plasma / 100;
                    plasmaC += (planeta.cristal_produccion_mina || 0) * (nivel_plasma * 0.66) / 100;
                    
                    amplificadoresM += parseInt(planeta.metal_produccion_amplificador || 0);
                    amplificadoresC += parseInt(planeta.cristal_produccion_amplificador || 0);
                    amplificadoresD += parseInt(planeta.deuterio_produccion_amplificador || 0);
                    
                    gastoFusion += parseInt(planeta.deuterio_gasto_fusion || 0); 
                    
                    
                    if(equipoComandoActivo()) {
                        geoM += (planeta.metal_produccion_mina ||0) * 0.12;
                        geoC += (planeta.cristal_produccion_mina ||0) * 0.12;
                        geoD += (planeta.deuterio_produccion_mina ||0) * 0.12;
                        geoSTR = " (+12%)";
                    } else {
                        
                        if(geologoActivo()) {
                            geoM += (planeta.metal_produccion_mina ||0) * 0.10;
                            geoC += (planeta.cristal_produccion_mina ||0) * 0.10;
                            geoD += (planeta.deuterio_produccion_mina ||0) * 0.10;
                            geoSTR = " (+10%)";
                        }
                    }
                    
                    
                    
                    totalM = baseM + minaM + geoM + plasmaM + amplificadoresM;
                    totalC = baseC + minaC + geoC + plasmaC + amplificadoresC;
                    totalD = baseD + minaD + geoD + plasmaD + amplificadoresD - gastoFusion;
                    
                    
                }   
            }
            
            
            // --- crea la tabla ---
            
            
            var main = getElementsByClass("mainRS")[0];
            
            
            var divPorPlanetas = document.createElement('div');
            var divAlmacen = document.createElement('div');
            var divRecursos = document.createElement('div');
            var divBB = document.createElement('div');
            var divFlotas = document.createElement('div');
            var divDefensas = document.createElement('div');
            var divFinal = document.createElement('div');
            
            var tabla = "";
            var textoBB = "";
            
            // --- tabla con los recursos diarios por planetas
            
            var tablaPlanetas = "";
            tablaPlanetas += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;" width="100%">';
            tablaPlanetas += '<tr><td></td><td></td><td></td><td></td></tr>';
            tablaPlanetas += '<tr><td class="" align="right" colspan="4"><font color="#FF4000"><p style="font-size:23px">';
            tablaPlanetas += ' {RECURSOS_PLANETAS} </p></font></td></tr>';
            tablaPlanetas += '<tr><td colspan="4"></td></tr>';
            tablaPlanetas += '<tr align="right"><td></td><td>{METAL}</td><td>{CRISTAL}</td><td>{DEUTERIO}</td></tr>';
            
            //var sep = listaPlanetas.split(";");
            for(var k = 0; k < sep.length; k++){
                if(sep[k].length > 3) {
                    var planeta = new ObjPlaneta()
                    planeta.load(options.get(sep[k] + "_objplanet"));
                    
                    var tr = ((k % 2)==0)?'<tr class="alt">':'<tr>';
                    tablaPlanetas += tr + '<td class="label">';
                    tablaPlanetas += (getPosActual() == sep[k]?'<font color="#FF4000"><b>' + planeta.coordenadas + '</b></font>': planeta.coordenadas) + "  " + planeta.nombre;
                    tablaPlanetas += planeta.getActualizado();
                    tablaPlanetas += '</td><td class="undermark">' + mostrarNumero(planeta.getTotalM()*24) + getNivelMina(1, sep, k);
                    tablaPlanetas += '</td><td class="undermark">' + mostrarNumero(planeta.getTotalC()*24) + getNivelMina(2, sep, k);
                    tablaPlanetas += '</td><td class="undermark">' + mostrarNumero(planeta.getTotalD()*24) + getNivelMina(3, sep, k);
                    tablaPlanetas += '</td></tr>';
                    
                }
            }
            
            tablaPlanetas += '<tr><td colspan="4"></td></tr>';
            tablaPlanetas += '</table>';
            
            
            // --- tabla con los almacenes
            
            var tablaAlmacen = "";
            tablaAlmacen += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;" width="100%">';
            tablaAlmacen += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
            tablaAlmacen += '<tr><td align="center" colspan="7"><font color="#FF4000"><p style="font-size:23px">{ALMACEN_TIEMPO} </p></font></td></tr>';
            tablaAlmacen += '<tr><td colspan="7"></td></tr>';
            tablaAlmacen += '<tr align="right"><td></td><td>{METAL}</td><td></td><td>{CRISTAL}</td><td></td><td>{DEUTERIO}</td><td></td></tr>';
            
            for(var k = 0; k < sep.length; k++){
                if(sep[k].length > 3) {
                    var planeta = new ObjPlaneta()
                    planeta.load(options.get(sep[k] + "_objplanet"));
                    
                    var tr = ((k % 2)==0)?'<tr class="alt" align="right">':'<tr align="right">';
                    
                    tablaAlmacen += tr + '<td class="label">';
                    tablaAlmacen += (getPosActual() == sep[k]?'<font color="#FF4000"><b>' + planeta.coordenadas + '</b></font>': planeta.coordenadas) + "  " + planeta.nombre;
                    tablaAlmacen += planeta.getActualizado() + '</td><td class="undermark">';
                    tablaAlmacen += A(planeta.almacen_metal) + '</td><td><p align="center">' + getTiempoLlenado(planeta.getTotalM()*24,planeta.almacen_metal);
                    tablaAlmacen += '</p></td><td class="undermark">' + A(planeta.almacen_cristal) + '</td><td><p align="center">';
                    tablaAlmacen += getTiempoLlenado(planeta.getTotalC()*24,planeta.almacen_cristal) + '</p></td><td class="undermark">' + A(planeta.almacen_deuterio);
                    tablaAlmacen += '</td><td><p align="center">' + getTiempoLlenado(planeta.getTotalD()*24, planeta.almacen_deuterio) + '</p></td></tr>';
                }   
            }
            tablaAlmacen += '<tr><td colspan="7"></td></tr>';
            tablaAlmacen += '</table>';
            
            
            // --- tabla con los recursos diarios/semanales/mensuales
            
            tabla += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;" width="100%">';
            tabla += '<tr height="50"><td width="28%"></td><td width="18%"></td><td width="18%"></td><td width="18%"></td><td width="18%"></td></tr>';
            tabla += '<tr><td align="center" colspan="5"><font color="#FF4000"><p style="font-size:23px"> {PRODUCCION_IMPERIAL} ' + getNombreJugador() + ' </p></font></td></tr>';
            tabla += '<tr><td colspan="5"></td></tr>';
            tabla += '<tr align="right"><td></td><td>{HORA}</td><td>{DIARIA}</td><td>{SEMANAL}</td><td>{MENSUAL}</td></tr>';
            
            tabla += '<tr class="alt" align="right"><td class="label"><b><a id="mostrarDM" href="javascript:void(0)"><img src ="" id="img_detalleMetal"> {METAL}</a></b></td><td class="undermark"><b>' + mostrarNumero(totalM) + '</b></td><td class="undermark"><b>' + mostrarNumero(totalM*24) + '</b></td><td class="undermark"><b>' + mostrarNumero(totalM*168) + '</b></td><td class="undermark"><b>' + mostrarNumero(totalM*720) + '</b></td></tr>';
            tabla += '<tr class="" align="right" id="detalleMetal_1" style="display:none"><td class="label">' + getStrSummary("basico") + '</td><td class="">' + mostrarNumero(baseM) + '</td><td class="">' + mostrarNumero(baseM*24) + '</td><td class="">' + mostrarNumero(baseM*168) + '</td><td class="">' + mostrarNumero(baseM*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleMetal_2" style="display:none"><td class="label">' + getStrSummary("metal") + '</td><td class="">' + mostrarNumero(minaM) + '</td><td class="">' + mostrarNumero(minaM*24) + '</td><td class="">' + mostrarNumero(minaM*168) + '</td><td class="">' + mostrarNumero(minaM*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleMetal_3" style="display:none"><td class="label">' + getStrSummary("plasma") + ' ' + plasmaSTR_metal + '</td><td class="">' + mostrarNumero(plasmaM) + '</td><td class="">' + mostrarNumero(plasmaM*24) + '</td><td class="">' + mostrarNumero(plasmaM*168) + '</td><td class="">' + mostrarNumero(plasmaM*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleMetal_4" style="display:none"><td class="label">{GEOLOGO}' + geoSTR + '</td><td class="">' + mostrarNumero(geoM) + '</td><td class="">' + mostrarNumero(geoM*24) + '</td><td class="">' + mostrarNumero(geoM*168) + '</td><td class="">' + mostrarNumero(geoM*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleMetal_5" style="display:none"><td class="label">' + getStrSummary("amplificador") + '</td><td class="">' + mostrarNumero(amplificadoresM) + '</td><td class="">' + mostrarNumero(amplificadoresM*24) + '</td><td class="">' + mostrarNumero(amplificadoresM*168) + '</td><td class="">' + mostrarNumero(amplificadoresM*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleMetal_6" style="display:none"><td class="label"></td><td class=""></td><td class=""></td><td class=""></td><td class=""></td></tr>';
            
            tabla += '<tr class="alt" align="right"><td class="label"><b><a id="mostrarDC" href="javascript:void(0)"><img src ="" id="img_detalleCristal"> {CRISTAL}</a></b></td><td class="undermark"><b>' + mostrarNumero(totalC) + '</b></td><td class="undermark"><b>' + mostrarNumero(totalC*24) + '</b></td><td class="undermark"><b>' + mostrarNumero(totalC*168) + '</b></td><td class="undermark"><b>' + mostrarNumero(totalC*720) + '</b></td></tr>';
            tabla += '<tr class="" align="right" id="detalleCristal_1" style="display:none"><td class="label">' + getStrSummary("basico") + '</td><td class="">' + mostrarNumero(baseC) + '</td><td class="">' + mostrarNumero(baseC*24) + '</td><td class="">' + mostrarNumero(baseC*168) + '</td><td class="">' + mostrarNumero(baseC*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleCristal_2" style="display:none"><td class="label">' + getStrSummary("cristal") + '</td><td class="">' + mostrarNumero(minaC) + '</td><td class="">' + mostrarNumero(minaC*24) + '</td><td class="">' + mostrarNumero(minaC*168) + '</td><td class="">' + mostrarNumero(minaC*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleCristal_3" style="display:none"><td class="label">' + getStrSummary("plasma") + ' ' + plasmaSTR_cristal + '</td><td class="">' + mostrarNumero(plasmaC) + '</td><td class="">' + mostrarNumero(plasmaC*24) + '</td><td class="">' + mostrarNumero(plasmaC*168) + '</td><td class="">' + mostrarNumero(plasmaC*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleCristal_4" style="display:none"><td class="label">{GEOLOGO}' + geoSTR + '</td><td class="">' + mostrarNumero(geoC) + '</td><td class="">' + mostrarNumero(geoC*24) + '</td><td class="">' + mostrarNumero(geoC*168) + '</td><td class="">' + mostrarNumero(geoC*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleCristal_5" style="display:none"><td class="label">' + getStrSummary("amplificador") + '</td><td class="">' + mostrarNumero(amplificadoresC) + '</td><td class="">' + mostrarNumero(amplificadoresC*24) + '</td><td class="">' + mostrarNumero(amplificadoresC*168) + '</td><td class="">' + mostrarNumero(amplificadoresC*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleCristal_6" style="display:none"><td class="label"></td><td class=""></td><td class=""></td><td class=""></td><td class=""></td></tr>';
            
            tabla += '<tr class="alt" align="right"><td class="label"><b><a id="mostrarDD" href="javascript:void(0)"><img src ="" id="img_detalleDeuterio"> {DEUTERIO}</a></b></td><td class="undermark"><b>' + mostrarNumero(totalD) + '</b></td><td class="undermark"><b>' + mostrarNumero(totalD*24) + '</b></td><td class="undermark"><b>' + mostrarNumero(totalD*168) + '</b></td><td class="undermark"><b>' + mostrarNumero(totalD*720) + '</b></td></tr>';
            tabla += '<tr class="" align="right" id="detalleDeuterio_1" style="display:none"><td class="label">' + getStrSummary("deuterio") + '</td><td class="">' + mostrarNumero(minaD) + '</td><td class="">' + mostrarNumero(minaD*24) + '</td><td class="">' + mostrarNumero(minaD*168) + '</td><td class="">' + mostrarNumero(minaD*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleDeuterio_2" style="display:none"><td class="label">{GEOLOGO}' + geoSTR + '</td><td class="">' + mostrarNumero(geoD) + '</td><td class="">' + mostrarNumero(geoD*24) + '</td><td class="">' + mostrarNumero(geoD*168) + '</td><td class="">' + mostrarNumero(geoD*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleDeuterio_3" style="display:none"><td class="label">' + getStrSummary("amplificador") + '</td><td class="">' + mostrarNumero(amplificadoresD) + '</td><td class="">' + mostrarNumero(amplificadoresD*24) + '</td><td class="">' + mostrarNumero(amplificadoresD*168) + '</td><td class="">' + mostrarNumero(amplificadoresD*720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleDeuterio_4" style="display:none"><td class="label">' + getStrSummary("fusion") + '</td><td class="">' + mostrarNumero(gastoFusion*-1) + '</td><td class="">' + mostrarNumero(gastoFusion*-24) + '</td><td class="">' + mostrarNumero(gastoFusion*-168) + '</td><td class="">' + mostrarNumero(gastoFusion*-720) + '</td></tr>';
            tabla += '<tr class="" align="right" id="detalleDeuterio_5" style="display:none"><td class="label"></td><td class=""></td><td class=""></td><td class=""></td><td class=""></td></tr>';
            
            tabla += '<tr><td colspan="5"></td></tr>';
            tabla += '<tr class="" align="right"><td class="label">{TOTAL}</td><td class="nomark">' + mostrarNumero((totalM+totalC+totalD)) + '</td><td class="nomark">' + mostrarNumero((totalM+totalC+totalD)*24) + '</td><td class="nomark">' + mostrarNumero((totalM+totalC+totalD)*168) + '</td><td class="momark">' + mostrarNumero((totalM+totalC+totalD)*720) + '</td></tr>';
            tabla += '<tr class="" align="right"><td class="label">{EN_METAL}</td><td class="nomark">' + mostrarNumero((totalM)+((totalC)*1.5)+((totalD)*3)) + '</td><td class="nomark">' + mostrarNumero((totalM*24)+((totalC*24)*1.5)+((totalD*24)*3)) + '</td><td class="nomark">' + mostrarNumero((totalM*168)+((totalC*168)*1.5)+((totalD*168)*3)) + '</td><td class="momark">' + mostrarNumero((totalM*720)+((totalC*720)*1.5)+((totalD*720)*3))+ '</td></tr>';
            tabla += '<tr class="" align="right" height="50"><td colspan="5">' + numPlanets + ' {PLANETAS}:   ' + listaPlanetas.replace(/;/g, "  ") + '</td></tr></form>';
            tabla += '</table><br><br>';
            
            tabla += '<table class="" width="100%">';
            tabla += '<tr>'
            tabla += '<td width="20%" style="text-align:center;" bgcolor="#240B3B"><a style="color: #FFFFFF; font-size: 10pt" id="mostrar_sec1" href="javascript:void(0)"><img src ="" id="img_sec1">{PLANETAS}</a></td>';
            tabla += '<td width="20%" style="text-align:center;" bgcolor="#240B3B"><a style="color: #FFFFFF; font-size: 10pt" id="mostrar_sec2" href="javascript:void(0)"><img src ="" id="img_sec2">{BBCODE}</a></td>';
            tabla += '<td width="20%" style="text-align:center;" bgcolor="#240B3B"><a style="color: #FFFFFF; font-size: 10pt" id="mostrar_sec3" href="javascript:void(0)"><img src ="" id="img_sec3">{ALMACENES}</a></td>';
            tabla += '<td width="20%" style="text-align:center;" bgcolor="#240B3B"><a style="color: #FFFFFF; font-size: 10pt" id="mostrar_sec4" href="javascript:void(0)"><img src ="" id="img_sec4">{FLOTA}</a></td>';
            tabla += '<td width="20%" style="text-align:center;" bgcolor="#240B3B"><a style="color: #FFFFFF; font-size: 10pt" id="mostrar_sec5" href="javascript:void(0)"><img src ="" id="img_sec5">{DEFENSA}</a></td';
            tabla += '</tr></table>';
            
            // --- textarea con el BBCode
            // produccion basica
            textoBB = '{SIZE_GRA}{U}{B}{PRODUCCION_DIARIA_DE} ' + getNombreJugador() + '{/B}{/U} {/SIZE}{SIZE_PEQ}( ' + getFecha() + ' ){/SIZE}{NL}{NL}';
            textoBB += getStrSummary("basico") + " (" + numPlanets + " {PLANETAS}): {COLOR_METAL}" + mostrarNumero((baseM+minaM)*24) + "{/COLOR} {METAL}, {COLOR_CRISTAL}" + mostrarNumero((baseC+minaC)*24) + "{/COLOR} {CRISTAL}, {COLOR_DEUTERIO}" + mostrarNumero((baseD+minaD-gastoFusion)*24) + "{/COLOR} {DEUTERIO}{NL}";
            textoBB += getStrSummary("plasma") +  ": {COLOR_METAL}" + mostrarNumero(plasmaM*24) + "{/COLOR} " + plasmaSTR_metal + " {METAL}, {COLOR_CRISTAL}" + mostrarNumero(plasmaC*24) + "{/COLOR} " + plasmaSTR_cristal + " {CRISTAL}{NL}{NL}";
            textoBB += "{SIZE_GRA}{B}" + getStrSummary("total_dia") + " {COLOR_METAL}" + mostrarNumero((baseM+minaM+plasmaM)*24) + "{/COLOR} {METAL}, {COLOR_CRISTAL}" + mostrarNumero((baseC+minaC+plasmaC)*24) + "{/COLOR} {CRISTAL}, {COLOR_DEUTERIO}" + mostrarNumero((baseD+minaD-gastoFusion+plasmaD)*24) + "{/COLOR} {DEUTERIO}{/B}{/SIZE}{NL}{NL}";
            textoBB += "{TOTAL}: {COLOR_TOTAL1}" + mostrarNumero(((baseM+minaM+plasmaM)*24)+((baseC+minaC+plasmaC)*24)+((baseD+minaD-gastoFusion+plasmaD)*24)) + "{/COLOR}{NL}";
            textoBB += "{EN_METAL}: {COLOR_TOTAL2}" + mostrarNumero(((baseM+minaM+plasmaM)*24)+((baseC+minaC+plasmaC)*24*3/2)+((baseD+minaD+plasmaD-gastoFusion)*24*3)) + "{/COLOR}{NL}{NL}";
            textoBB += "{SIZE_PEQ}{METAL}: " + getStrNiveles(1,sep) + "{/SIZE}{NL}";
            textoBB += "{SIZE_PEQ}{CRISTAL}: " + getStrNiveles(2,sep) + "{/SIZE}{NL}";
            textoBB += "{SIZE_PEQ}{DEUTERIO}: " + getStrNiveles(3,sep) + "{/SIZE}{NL}{NL}";
            textoBB += "{SIZE_PEQ}{URL_SCRIPT}{/SIZE}{NL}";
            bbcode_basico = translate(textoBB);
            
            // produccion completa
            textoBB = '{SIZE_GRA}{U}{B}{PRODUCCION_DIARIA_DE} ' + getNombreJugador() + '{/B}{/U} {/SIZE}{SIZE_PEQ}( ' + getFecha() + ' ){/SIZE}{NL}{NL}';
            textoBB += getStrSummary("basico") + " (" + numPlanets + " {PLANETAS}): {COLOR_METAL}" + mostrarNumero((baseM+minaM)*24) + "{/COLOR} {METAL}, {COLOR_CRISTAL}" + mostrarNumero((baseC+minaC)*24) + "{/COLOR} {CRISTAL}, {COLOR_DEUTERIO}" + mostrarNumero((baseD+minaD-gastoFusion)*24) + "{/COLOR} {DEUTERIO}{NL}";
            textoBB += getStrSummary("plasma") +  ": {COLOR_METAL}" + mostrarNumero(plasmaM*24) + "{/COLOR} " + plasmaSTR_metal + " {METAL}, {COLOR_CRISTAL}" + mostrarNumero(plasmaC*24) + "{/COLOR} " + plasmaSTR_cristal + " {CRISTAL}{NL}";
            textoBB += '{GEOLOGO}' + geoSTR + ": {COLOR_METAL}" + mostrarNumero(geoM*24) + "{/COLOR} {METAL}, {COLOR_CRISTAL}" + mostrarNumero(geoC*24) + "{/COLOR} {CRISTAL}, {COLOR_DEUTERIO}" + mostrarNumero(geoD*24) + "{/COLOR} {DEUTERIO}{NL}";
            textoBB += getStrSummary("amplificador") + ": {COLOR_METAL}" + mostrarNumero(amplificadoresM*24) + "{/COLOR} {METAL}, {COLOR_CRISTAL}" + mostrarNumero(amplificadoresC*24) + "{/COLOR} {CRISTAL}, {COLOR_DEUTERIO}" + mostrarNumero(amplificadoresD*24) + "{/COLOR} {DEUTERIO}{NL}{NL}";
            textoBB += "{SIZE_GRA}{B}" + getStrSummary("total_dia") + " {COLOR_METAL}" + mostrarNumero(totalM*24) + "{/COLOR} {METAL}, {COLOR_CRISTAL}" + mostrarNumero(totalC*24) + "{/COLOR} {CRISTAL}, {COLOR_DEUTERIO}" + mostrarNumero(totalD*24) + "{/COLOR} {DEUTERIO}{/B}{/SIZE}{NL}{NL}";
            textoBB += "{TOTAL}: {COLOR_TOTAL1}" + mostrarNumero((totalM*24)+(totalC*24)+(totalD*24)) + "{/COLOR}{NL}";
            textoBB += "{EN_METAL}: {COLOR_TOTAL2}" + mostrarNumero((totalM*24)+(totalC*24*3/2)+(totalD*24*3)) + "{/COLOR}{NL}{NL}";
            textoBB += "{SIZE_PEQ}{METAL}: " + getStrNiveles(1,sep) + "{/SIZE}{NL}";
            textoBB += "{SIZE_PEQ}{CRISTAL}: " + getStrNiveles(2,sep) + "{/SIZE}{NL}";
            textoBB += "{SIZE_PEQ}{DEUTERIO}: " + getStrNiveles(3,sep) + "{/SIZE}{NL}{NL}";
            textoBB += "{SIZE_PEQ}{URL_SCRIPT}{/SIZE}{NL}";
            bbcode_completo = translate(textoBB);
            
            
            produccionBB = '<p align="center"><br><textarea id="txtBB" name="txtBB" style="background-color:##0000FF;width:600px;height:100px;border: 2px solid #990000;" rows="5" cols="20" onclick="this.focus();this.select()" readonly="readonly">';
            produccionBB += codificar(bbcode_basico, "phpbb")
            produccionBB += '</textarea><br>';
            produccionBB += '<input id="op_p_bas" type="radio" name="tipo_bbc" value="basica" checked="checked">{PRODUCCION_BASICA}</input><br>';
            produccionBB += '<input id="op_p_comp" type="radio" name="tipo_bbc" value="completa">{PRODUCCION_COMPLETA}</input><br></p>';
            produccionBB += '<br><br><div id="preview" style="margin:25px">' + codificar(bbcode_basico, "html") + '</div>';
            
            
            var metalD = totalM * 24;
            var cristalD = totalC * 24;
            var deuD = totalD * 24;
            
            
            // --- tabla de produccion de flotas ---
            var txtTablaFlotas = "";
            txtTablaFlotas += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;" width="100%">';
            txtTablaFlotas += '<tr align="right"><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td></tr>'
            txtTablaFlotas += '<tr align="right"><td colspan="6"><font color="#FF4000"><p style="font-size:23px"> {PRODUCCION_FLOTA} </p></font><br><br></tr>'
            txtTablaFlotas += '<tr align="right"><td></td><td>{PRODUCCION}</td><td></td><td></td><td>{EXCEDENTES_DIA}</td><td></td></tr>'
            txtTablaFlotas += '<tr align="right"><td></td><td>{DIA}</td><td>{SEMANA}</td><td>{METAL}</td><td>{CRISTAL}</td><td>{DEUTERIO}</td></tr>'
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
            txtTablaDef += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;" width="100%">';
            txtTablaDef += '<tr align="right"><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td></tr>'
            txtTablaDef += '<tr align="right"><td colspan="6"><font color="#FF4000"><p style="font-size:23px"> {PRODUCCION_DEFENSAS} </p></font><br><br></tr>'
            txtTablaDef += '<tr align="right"><td></td><td>{PRODUCCION}</td><td></td><td></td><td>{EXCEDENTES_DIA}</td><td></td></tr>'
            txtTablaDef += '<tr align="right"><td></td><td>{DIA}</td><td>{SEMANA}</td><td>{METAL}</td><td>{CRISTAL}</td><td>{DEUTERIO}</td></tr>'
            txtTablaDef += generarFilaProduccion("{LANZAMISILES}", metalD, cristalD, deuD, 2000, 0, 0, "alt");
            txtTablaDef += generarFilaProduccion("{LASER_PEQ}", metalD, cristalD, deuD, 1500, 500, 0);
            txtTablaDef += generarFilaProduccion("{LASER_GRA}", metalD, cristalD, deuD, 6000, 2000, 0, "alt");
            txtTablaDef += generarFilaProduccion("{C_GAUS}", metalD, cristalD, deuD, 20000, 15000, 2000);
            txtTablaDef += generarFilaProduccion("{C_IONICO}", metalD, cristalD, deuD, 2000, 6000, 0, "alt");
            txtTablaDef += generarFilaProduccion("{C_PLASMA}", metalD, cristalD, deuD, 50000, 50000, 30000);
            txtTablaDef += generarFilaProduccion("{M_ANTI}", metalD, cristalD, deuD, 8000, 0, 2000, "alt");
            txtTablaDef += generarFilaProduccion("{M_PLAN}", metalD, cristalD, deuD, 15500, 2500, 10000);
            txtTablaDef += '</table>';
            
            
            var txtFinal = '<p align="center"><br><br><br><font size="1"><br><br>';
            txtFinal += '<a href="http://userscripts.org/scripts/discuss/73101" target="_blank">Userscripts discussions</a><br><br><br>';
            txtFinal += '<a href="http://userscripts.org/scripts/show/73101" target="_blank">OGame-Rediseño Recursos Ampliados by HoChiChaos/trustux</a><br>';
            txtFinal += '[version: ' + SCRIPT_VERSION +  ']<br><br>{TRANSLATE_BY}<BR></font>';
            txtFinal += '<a href="javascript:localStorage.clear();location.reload();" target="">Reset-Data</a><br></p>';
            
            
            var obj;
            
            // produccion imperial
            divRecursos.innerHTML = translate(tabla);
            main.appendChild(divRecursos);
            
            // recursos por planetas
            divPorPlanetas.innerHTML = translate(tablaPlanetas);
            divPorPlanetas.id = "sec_1";
            divPorPlanetas.style.display = "";
            main.appendChild(divPorPlanetas);
            obj = document.getElementById("mostrar_sec1");
            addEvent(obj.parentNode, "click", function(){mostrarSeccion(1)});
            obj = document.getElementById("img_sec1");
            obj.setAttribute ("src", closeImg);
            
            
            // bb-code
            divBB.innerHTML = translate(produccionBB);
            divBB.id = "sec_2";
            divBB.style.display = "none";
            main.appendChild(divBB);
            obj = document.getElementById("mostrar_sec2");
            addEvent(obj.parentNode, "click", function(){mostrarSeccion(2)});
            obj = document.getElementById("img_sec2");
            obj.setAttribute ("src", openImg);
            
            
            // almacenes
            divAlmacen.innerHTML = translate(tablaAlmacen);
            divAlmacen.id = "sec_3";
            divAlmacen.style.display = "none";
            main.appendChild(divAlmacen);
            obj = document.getElementById("mostrar_sec3");
            addEvent(obj.parentNode, "click", function(){mostrarSeccion(3)});
            obj = document.getElementById("img_sec3");
            obj.setAttribute ("src", openImg);
            
            // produccion flotas
            divFlotas.innerHTML = translate(txtTablaFlotas);
            divFlotas.id = "sec_4";
            divFlotas.style.display = "none";
            main.appendChild(divFlotas);
            obj = document.getElementById("mostrar_sec4");
            addEvent(obj.parentNode, "click", function(){mostrarSeccion(4)});
            obj = document.getElementById("img_sec4");
            obj.setAttribute ("src", openImg);
            
            // produccion defensas
            divDefensas.innerHTML = translate(txtTablaDef);
            divDefensas.id = "sec_5";
            divDefensas.style.display = "none";
            main.appendChild(divDefensas);
            obj = document.getElementById("mostrar_sec5");
            addEvent(obj.parentNode, "click", function(){mostrarSeccion(5)});
            obj = document.getElementById("img_sec5");
            obj.setAttribute ("src", openImg);
            
            // div final (firma y enlace)
            divFinal.innerHTML = translate(txtFinal);
            main.appendChild(divFinal); 
            
            
            
            // detalles de recursos
            obj = document.getElementById("mostrarDM");
            addEvent(obj.parentNode, "click", function(){mostrarDetallesRecursos("detalleMetal")});
            
            obj = document.getElementById("mostrarDC");
            addEvent(obj.parentNode, "click", function(){mostrarDetallesRecursos("detalleCristal")});
            
            obj = document.getElementById("mostrarDD");
            addEvent(obj.parentNode, "click", function(){mostrarDetallesRecursos("detalleDeuterio")});
            
            obj = document.getElementById("img_detalleMetal");
            obj.setAttribute ("src", openImg);
            
            obj = document.getElementById("img_detalleCristal");
            obj.setAttribute ("src", openImg);
            
            obj = document.getElementById("img_detalleDeuterio");
            obj.setAttribute ("src", openImg);
            
            
            // opciones para el bbcode con la produccion basica o completa
            obj = document.getElementById("op_p_bas");
            addEvent(obj, "click", function(){setTxtBBCode(0)});
            
            obj = document.getElementById("op_p_comp");
            addEvent(obj, "click", function(){setTxtBBCode(1)});
            
            
        }
        
    }
    
    
}) ()
