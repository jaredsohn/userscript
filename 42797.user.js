// ==UserScript==
// @name           Ikariam Alliance Sorter
// @namespace      http://userscripts.org/scripts/show/42797
// @author         Martynius (http://userscripts.org/users/68307)
// @license        GNU General Public License v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/42797
// @description    Adds links in the Embassy and Diplomacy Advisor to sorts the Alliance Members by inactive date, name, rank, points and number of towns.
// @version        1.2.6
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Time.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php?*view=embassy*
// @include        http://s*.ikariam.*/index.php?*view=diplomacyAdvisor*&watch=4*
// @include        http://s*.ikariam.*/index.php?*view=diplomacyAdvisorAlly*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

// Version - 1.0.0 - 20/02/2009
// Version - 1.1.0 - 13/04/2009 (Feature: Updated graphics,
//				 Bugfix: improved UI creation & event handling)
// Version - 1.1.1 - 14/04/2009 (Feature: Added option to switch how users display activity)
// Version - 1.1.2 - 06/05/2009 (Bugfix: Fixed include pages for v0.3.1)
// Version - 1.2.0 - 17/05/2009 (Feature: Changed to jQuery, updated parsing method,
//				 Feature: enabled score checkpoint,
//				 Feature: added extensibility to deal with adding columns)
// Version - 1.2.1 - 19/05/2009 (Feature: Added International Language support)
// Version - 1.2.2 - 22/05/2009 (Bugfix: Fixed typo in code that broke replacing inactive image with (i),
//				 Bugfix: Fixed sorting for negative percentage increases,
//				 Bugfix: Fixed reformatting of numbers over 1 million,
//				 Bugfix: Fixed coloured background stripes,
//				 Feature: Updated vietnamese translation,
//				 Feature: Added option to show last saved score instead of change in points)
// Version - 1.2.3 - 25/05/2009 (Bugfix: Fixed initial checkpoint)
// Version - 1.2.4 - 31/05/2009 (Feature: changed time stamp display to display number of days/hours/minutes since update
//				 Feature: Added auto-update checker)
// Version - 1.2.5 - 02/06/2009 (Bugfix: Changed to run once script loads to ensure it runs after other scripts
//				 Bugfix: Updated Russian translation)
// Version - 1.2.5a- 04/06/2009 (Bugfix: Updated number parsing - non-numbers will return negative infinity)
// Version - 1.2.5b- 13/06/2009 (Bugfix: updated pages the script runs on)
// Version - 1.2.5c- 17/06/2009 (Feature: updated Italian translation)
// Version - 1.2.6 - 06/07/2009 (Feature: added functionality to change decimal point and number group separator)
//

const PAGE_ID = {
	diplomacyAdvisor:	true,
	diplomacyAdvisorAlly:	true,
	embassy:		true
}[ $("body").attr("id") ];

if ( PAGE_ID === undefined ) return;

/**
 * Check for a later version of the script
 * IkariamUserScriptUpdater object is in AutoUpdater.js
 */
new IkariamUserScriptUpdater( 42797, "Ikariam Alliance Sorter" );

const DEBUG = false;

/**
 * Set up Greasemonkey Cache Variables.
 * getServerWorld() and getServerDomain() are in IkariamHostDetection.js
 */
const cache_key		= getServerDomain() + '.' + getServerWorld();
const cache_variables	= {
	ACTIVITY:	cache_key + '.Activity',
	CHECKPOINT:	cache_key + '.Checkpoint',
	SCORE:		cache_key + '.Score',
	LANGUAGE:	cache_key + '.Language'
};

/**
 * getLanguage() is in IkariamLanguageDetection.js
 */
const lang = getLanguage( cache_variables.LANGUAGE );
const language = {
	"arabic":	{	ltr: false,	ds: ',', dp: '.', change: 'تغيير', online: 'على الخط', inactive: 'غير النشطين', i: '(ط)',	edit: 'تكوين تحالف تحرير الفارز', activity: 'النشاط التهيئة',	activity1: 'الصورة الافتراضية', activity2: 'الصورة الافتراضية ، أو ط', activity3: 'الصورة أو النص الافتراضي',	activity4: 'النص فقط',	title: 'التهيئة', score: 'سجل التهيئة',	score1: 'بلا', score2: 'زيادة مطلقة', score3:'النسبة المئوية للزيادة',	score4: 'نقاط تفتيش', checkpoint: 'آخر حاجز',	reset: 'إعادة', scoreCP: 'سجل حاجز', msg: 'إعادة تحميل الصفحة بعد تغيير التشكيل' },
	"bulgarian":	{	ltr: true,	ds: ',', dp: '.', change: 'Променям', online: 'ONLINE', inactive: 'НЕАКТИВЕН', i: '(I)',	edit: 'Редактиране на Алианса сортировач Конфигурация', activity: 'Дейност Конфигурация',	activity1: 'По подразбиране Image', activity2: 'По подразбиране Image или (и)', activity3: 'По подразбиране изображение или текст',	activity4: 'Само текст',	title: 'Конфигурация', score: 'Оценка за конфигурация',	score1: 'Никой', score2: 'Абсолютни Увеличение', score3:'Процентното увеличение',	score4: 'CheckPoint рейтинг', checkpoint: 'Последно контролно-пропускателен пункт',	reset: 'Нулиране', scoreCP: 'Рейтинг на контролно-пропускателен пункт', msg: 'Презареждане на страницата след смяна на конфигурацията.' },
	"chinese":	{	ltr: true,	ds: ',', dp: '.', change: '更改', online: '在線', inactive: '無效', i: '(無效)', edit: '編輯聯盟分揀機配置', activity: '活動配置', activity1: '默認圖片', activity2: '默認圖片或 (無效)', activity3: '默認的圖片或文字', activity4: '純文字', title: '配置', score: '分數配置', score1: '毫無', score2: '絕對增長', score3: '增長百分比', score4: '檢查分數', checkpoint: '上次檢查', reset: '重置', scoreCP: '評分點', msg: '重新載入網頁後，改變配置。' },
	"czech":	{	ltr: true,	ds: ',', dp: '.', change: 'Změna', online: 'ONLINE', inactive: 'NEAKTIVNÍ', i: '(i)', edit: 'Upravit aliance Sorter Konfigurace', activity: 'Aktivita Konfigurace', activity1: 'Výchozí Image', activity2: 'Výchozí Image nebo (i)', activity3: 'Výchozí Obrázek nebo Text', activity4: 'Text Only', title: 'Konfigurace', score: 'Skóre Konfigurace', score1: 'Žádný', score2: 'Absolutní Zvýšit', score3: 'Procentní růst', score4: 'Checkpoint Skóre', checkpoint: 'Poslední Checkpoint', reset: 'Reset', scoreCP: 'Skóre Checkpoint', msg: 'Aktualizuj stránky po změně nastavení.' },
	"danish":	{	ltr: true,	ds: ',', dp: '.', change: 'Ændre', online: 'ONLINE', inactive: 'ERHVERVSINAKTIVE', i: '(i)', edit: 'Rediger Alliance Sorter Configuration', activity: 'Aktivitet Configuration', activity1: 'Standardbilledet', activity2: 'Standardbilledet eller (i)', activity3: 'Standardbilledet eller Tekst', activity4: 'Kun tekst', title: 'Konfiguration', score: 'Score Configuration', score1: 'Ingen', score2: 'Absolut stigning', score3: 'Procentvise stigning', score4: 'Checkpoint Score', checkpoint: 'Seneste Checkpoint', reset: 'Nulstil', scoreCP: 'Score Checkpoint', msg: 'Genindlæse siden efter at ændre konfigurationen.' },
	"dutch":	{	ltr: true,	ds: ',', dp: '.', change: 'Veranderen', online: 'ONLINE', inactive: 'INACTIEVEN', i: '(i)', edit: 'Bewerken Alliantie Sorter Configuratie', activity: 'Activiteit Configuratie', activity1: 'Default Image', activity2: 'Default Image of (i)', activity3: 'Standaard afbeelding of tekst', activity4: 'Alleen tekst', title: 'Configuratie', score: 'Score Configuratie', score1: 'Geen', score2: 'Absolute stijging', score3: 'Procentuele stijging', score4: 'Checkpoint Score', checkpoint: 'Laatste Checkpoint', reset: 'Reset', scoreCP: 'Score Checkpoint', msg: 'Herlaad de pagina na het wijzigen van de configuratie.' },
	"english":	{	ltr: true,	ds: ',', dp: '.', change: 'Change', online: 'ONLINE', inactive: 'INACTIVE', i: '(i)',	edit: 'Edit Alliance Sorter Configuration', activity: 'Activity Configuration',	activity1: 'Default Image', activity2: 'Default Image or (i)', activity3: 'Default Image or Text',	activity4: 'Text Only',	title: 'Configuration', score: 'Score Configuration',	score1: 'None', score2: 'Absolute Increase', score3:'Percentage Increase', score4: 'Checkpoint Score',	checkpoint: 'Last Checkpoint',	reset: 'Reset', scoreCP: 'Score Checkpoint', msg: 'Reload the page after changing the configuration.' },
	"filipino":	{	ltr: true,	ds: ',', dp: '.', change: 'Palitan', online: 'ONLINE', inactive: 'Hindi aktibo', i: '(i)', edit: 'I-edit ang Alliance Sorter Configuration', activity: 'Aktibidad Configuration', activity1: 'Default na Imahe', activity2: 'Default na Imahe o (i)', activity3: 'Default na Imahe o ng Teksto', activity4: 'Tanging ang text', title: 'Configuration', score: 'Kalidad Configuration', score1: 'Wala', score2: 'Ganap na Palakihin', score3: 'Porsiyento Palakihin', score4: 'Magsiyasat ng Kalidad', checkpoint: 'Huling tsekpoint', reset: 'I-reset', scoreCP: 'Kalidad tsekpoint', msg: 'I-reload ang pahina pagkatapos palitan ang configuration.' },
	"finish":	{	ltr: true,	ds: ',', dp: '.', change: 'Muuta', online: 'ONLINE', inactive: 'PASSIIVINEN', i: '(i)', edit: 'Muokkaa Alliance lajittelija Kokoonpanoasetukset', activity: 'Toiminto Kokoonpanoasetukset', activity1: 'Oletus Image', activity2: 'Oletus Image tai (i)', activity3: 'Oletus Kuva tai Teksti', activity4: 'Vain teksti', title: 'Kokoonpano', score: 'Pisteet Kokoonpanoasetukset', score1: 'Ei mitään', score2: 'Absoluuttinen lisäys', score3: 'Prosentuaalista kasvua', score4: 'Checkpoint Pisteet', checkpoint: 'Viimeisin Checkpoint', reset: 'Nollaa', scoreCP: 'Pisteet Checkpoint', msg: 'Päivitä sivu vaihtamisen jälkeen määrityksistä.' },
	"french":	{	ltr: true,	ds: ',', dp: '.', change: 'Changer', online: 'EN LIGNE', inactive: 'INACTIF', i: '(i)', edit: 'Modifier la configuration Alliance Trieuse', activity: 'Activité de configuration', activity1: 'Image par défaut', activity2: 'Image par défaut ou (i)', activity3: 'Image ou texte par défaut', activity4: 'Texte seulement', title: 'Configuration', score: 'Score de configuration', score1: 'Aucun', score2: 'Augmentation en valeur absolue', score3: 'Pourcentage d\'augmentation', score4: 'Checkpoint Score', checkpoint: 'Mise à Checkpoint', reset: 'Reset', scoreCP: 'Score Checkpoint', msg: 'Recharger la page après avoir changé la configuration.' },
	"german":	{	ltr: true,	ds: '.', dp: ',', change: 'Ändern', online: 'ONLINE', inactive: 'INACTIVE', i: '(i)', edit: 'Bearbeiten Alliance Sorter Konfiguration', activity: 'Aktivitätsart Konfiguration', activity1: 'Default Image', activity2: 'Standard-Image oder (i)', activity3: 'Standard-Bild oder Text', activity4: 'Nur Text', title: 'Konfiguration', score: 'Ergebnis Konfiguration', score1: 'Keine', score2: 'Absolute Zunahme', score3: 'Erhöhung', score4: 'Checkpoint Ergebnis', checkpoint: 'Letzte Checkpoint', reset: 'Reset', scoreCP: 'Ergebnis Checkpoint', msg: 'Reload der Seite nach dem Ändern der Konfiguration.' },
	"greek":	{	ltr: true,	ds: ',', dp: '.', change: 'Αλλαγή', online: 'ONLINE', inactive: 'Ανενεργό', i: '(i)', edit: 'Επεξεργασία Συμμαχία ταξινόμος Διαμόρφωση', activity: 'Δραστηριότητα Διαμόρφωση', activity1: 'Προκαθορισμένος εικόνας', activity2: 'Προκαθορισμένος εικόνας ή (θ)', activity3: 'Προεπιλεγμένη εικόνα ή Κείμενο', activity4: 'Κείμενο', title: 'Διαμόρφωση', score: 'Αποτέλεσμα Διαμόρφωση', score1: 'Δεν υφίσταται', score2: 'Απόλυτη Αύξηση', score3: 'Ποσοστό αύξησης', score4: 'Αποτέλεσμα Checkpoint', checkpoint: 'Τελευταία Checkpoint', reset: 'Επαναφορά', scoreCP: 'Αποτέλεσμα Checkpoint', msg: 'Επαναφόρτωση σελίδας μετά την αλλαγή της ρύθμισης.' },
	"hebrew":	{	ltr: false,	ds: ',', dp: '.', change: 'שנה',	online: 'מחובר',	inactive: 'לא פעיל',	i: '(אני)',	edit: 'ערוך הגדרות סקריפט',	activity: 'הגדרות פעילות',	activity1: 'תמונת מחדל',	activity2: 'תמונת מחדל או (אני)',	activity3: 'תמונת מחדל או טקסט',	activity4: 'טקסט בלבד',	title: 'הגדרות',	score: 'הגדרות ניקוד',	score1: 'ריק',	score2: 'גידול מוחלט',	score3: 'גידול באחוזים',	score4: "צ 'ק פוינט ציון", checkpoint: 'נקודות ביקורת אחרונה',	reset: 'איפוס',	scoreCP: 'נקודת ביקורת של הניקוד',	msg: 'טען את העמוד לאחר שינוי ההגדרות.' },
	"hungarian":	{	ltr: true,	ds: ',', dp: '.', change: 'Változás', online: 'ONLINE', inactive: 'INAKTÍV', i: '(i)', edit: 'Edit Szövetség Sorter Konfiguráció', activity: 'Tevékenységi Konfiguráció', activity1: 'Alapértelmezett kép', activity2: 'Alapértelmezett kép vagy (i)', activity3: 'Alapértelmezett kép vagy szöveg', activity4: 'Csak szöveg', title: 'Konfiguráció', score: 'Pontszám Konfiguráció', score1: 'Semmi', score2: 'Abszolút növelése', score3: 'Százalékos növekedés', score4: 'Checkpoint pontszám', checkpoint: 'Utolsó Checkpoint', reset: 'Reset', scoreCP: 'Pontszám Checkpoint', msg: 'Az oldal újratöltése után a konfigurációs.' },
	"italian":	{	ltr: true,	ds: ',', dp: '.', change: 'Cambiamento', online: 'ONLINE', inactive: 'INATTIVO', i: '(i)', edit: 'Configura Alliance Sorter', activity: 'Configurazione', activity1: 'Immagine predefinita', activity2: 'Immagine predefinita o (i)', activity3: 'Immagine predefinita o Testo', activity4: 'Solo Testo', title: 'Configurazione', score: 'Configurazione Punteggio', score1: 'Nessuno', score2: 'Aumento assoluto', score3: 'Percentuale di aumento', score4: 'Punteggio ottenuto al Checkpoint', checkpoint: 'Ultimo Checkpoint', reset: 'Reset', scoreCP: 'Punteggio ottenuto al Checkpoint', msg: 'Ricarica la pagina dopo aver cambiato la configurazione.' },
	"korean":	{	ltr: true,	ds: ',', dp: '.', change: '변경', online: '온라인', inactive: '비활성', i: '은 (i)', edit: '편집 얼라이언스 선별기 구성', activity: '활동 구성', activity1: '기본 이미지', activity2: '기본적으로 이미지 또는은 (i)', activity3: '기본적으로 이미지 또는 텍스트', activity4: '텍스트 전용', title: '구성', score: '평가 점수를 구성', score1: '없음', score2: '앱솔루트 증대', score3: '비율 증대', score4: '세키쇼 곡집', checkpoint: '마지막 세키쇼', reset: '재설정', scoreCP: '평가 점수 세키쇼', msg: '구성을 변경한 후 페이지를 새로 고침합니다' },
	"latvian":	{	ltr: true,	ds: ',', dp: '.', change: 'Mainīt', online: 'ONLINE', inactive: 'EKONOMISKI NEAKTĪVĀM', i: '(i)', edit: 'Edit Alliance Šķirotājs Konfigurācija', activity: 'Activity Konfigurācija', activity1: 'Default Image', activity2: 'Default Image vai (i)', activity3: 'Default Attēls vai Teksts', activity4: 'Text Only', title: 'Konfigurācija', score: 'Score Konfigurācija', score1: 'Neviens', score2: 'Absolūtais pieaugums', score3: 'Percentage Palielināt', score4: 'Kontrolpunkts Score', checkpoint: 'Pēdējā kontrolpunkts', reset: 'Reset', scoreCP: 'Score kontrolpunkts', msg: 'Pārlādēt lapu pēc mainot konfigurāciju.' },
	"lithuanian":	{	ltr: true,	ds: ',', dp: '.', change: 'Pakeisti', online: 'ONLINE', inactive: 'Neaktyvus', i: '(i)', edit: 'Redaguoti Aljansas Rūšiuoti konfigūracijos', activity: 'Veikla konfigūracijos', activity1: 'Numatytasis vaizdas', activity2: 'Numatytasis vaizdas arba (i)', activity3: 'Numatytasis vaizdas arba tekstas', activity4: 'Tik tekstas', title: 'Konfigūracija', score: 'Balą konfigūracijos', score1: 'Nė vienas', score2: 'Absoliutinis padidėjimas', score3: 'Procentas Padidinti', score4: 'Checkpoint balas', checkpoint: 'Paskutinis Checkpoint', reset: 'Atstatyti', scoreCP: 'Balą Checkpoint', msg: 'Perkrauti šį puslapį po to, kai keičiant konfigūraciją.' },
	"norwegian":	{	ltr: true,	ds: ',', dp: '.', change: 'Endring', online: 'ONLINE', inactive: 'INACTIVE', i: '(i)', edit: 'Rediger Alliansen Sorter Configuration', activity: 'Aktivitet Configuration', activity1: 'Standardbildet', activity2: 'Standardbildet eller (i)', activity3: 'Standardbildet eller Tekst', activity4: 'Bare Tekst', title: 'Konfigurering', score: 'Score Configuration', score1: 'Ingen', score2: 'Absolute Øk', score3: 'Prosentvise økningen', score4: 'Checkpoint Poeng', checkpoint: 'Sist Checkpoint', reset: 'Tilbakestill', scoreCP: 'Score Checkpoint', msg: 'Oppdater siden etter at du endrer konfigurasjonen.' },
	"pinoy":	{	ltr: true,	ds: ',', dp: '.', change: 'Palitan', online: 'ONLINE', inactive: 'Hindi aktibo', i: '(i)', edit: 'I-edit ang Alliance Sorter Configuration', activity: 'Aktibidad Configuration', activity1: 'Default na Imahe', activity2: 'Default na Imahe o (i)', activity3: 'Default na Imahe o ng Teksto', activity4: 'Tanging ang text', title: 'Configuration', score: 'Kalidad Configuration', score1: 'Wala', score2: 'Ganap na Palakihin', score3: 'Porsiyento Palakihin', score4: 'Magsiyasat ng Kalidad', checkpoint: 'Huling tsekpoint', reset: 'I-reset', scoreCP: 'Kalidad tsekpoint', msg: 'I-reload ang pahina pagkatapos palitan ang configuration.' },
	"polish":	{	ltr: true,	ds: ',', dp: '.', change: 'Zmiana', online: 'ONLINE', inactive: 'Nieaktywna', i: '(i)', edit: 'Edycja Sojuszu Sortowanie Konfiguracja', activity: 'Aktywność Konfiguracja', activity1: 'Domyślny obraz', activity2: 'Domyślny obraz lub (i)', activity3: 'Domyślny obraz lub Tekst', activity4: 'Tylko tekst', title: 'Konfiguracja', score: 'Ocena Konfiguracja', score1: 'Żaden', score2: 'Absolute Zwiększenie', score3: 'Wzrostem', score4: 'Ocena Checkpoint', checkpoint: 'Ostatnia Checkpoint', reset: 'Resetuj', scoreCP: 'Ocena Checkpoint', msg: 'Przeładuj stronę po zmianie konfiguracji.' },
	"portuguese":	{	ltr: true,	ds: ',', dp: '.', change: 'Alterar', online: 'ONLINE', inactive: 'INATIVO', i: '(i)', edit: 'Editar Aliança Classificador Configuração', activity: 'Atividade Configuração', activity1: 'Imagem padrão', activity2: 'Imagem padrão ou (i)', activity3: 'Padrão imagem ou texto', activity4: 'Somente Texto', title: 'Configuração', score: 'Pontuação Configuração', score1: 'Nenhum', score2: 'Aumento absoluto', score3: 'Aumento percentual', score4: 'Checkpoint Pontuação', checkpoint: 'Última Checkpoint', reset: 'Redefinir', scoreCP: 'Pontuação Checkpoint', msg: 'Recarregar a página após alterar a configuração.' },
	"romanian":	{	ltr: true,	ds: ',', dp: '.', change: 'Schimba', online: 'ONLINE', inactive: 'INACTIVE', i: '(i)', edit: 'Editare Alliance Sortare Configurare', activity: 'Activitatea de configurare', activity1: 'Implicit Image', activity2: 'Implicit sau Imagine (i)', activity3: 'Implicit Imagine sau Text', activity4: 'Text Only', title: 'Configurare', score: 'Scorul de configurare', score1: 'Niciunul', score2: 'Absolute Creşterea', score3: 'Creşterea procentuală', score4: 'Checkpoint Scor', checkpoint: 'Ultima Checkpoint', reset: 'Resetare', scoreCP: 'Scor Checkpoint', msg: 'Reîncărcaţi pagina de după schimbarea de configurare.' },
	"russian": 	{ 	ltr: true, 	ds: ',', dp: '.', change: 'Изменение', online: 'В СЕТИ', inactive: 'НЕАКТИВНЫЙ', i: '(i)', edit: 'Настройка сортировки альянса', activity: 'Статус онлайн', activity1: 'По-умолчанию', activity2: 'По-умолчанию или (i)', activity3: 'По-умолчанию или текст', activity4: 'Только текст', title: 'Конфигурация', score: 'Рейтинг', score1: 'Выключить', score2: 'Общий прирост', score3: 'Процентное соотношение', score4: 'Предыдущее сохранение', checkpoint: 'Последний сброс', reset: 'Создать', scoreCP: 'Сохранение', msg: 'Обновите страницу после изменения настроек.' },
	"serbian":	{	ltr: true,	ds: ',', dp: '.', change: 'Промена', online: 'Онлине', inactive: 'Неактивно', i: '(и)', edit: 'Уреди Савез конфигурацију разврстач', activity: 'Активност Цонфигуратион', activity1: 'Дефаулт Имаге', activity2: 'Дефаулт Слика или (и)', activity3: 'Дефаулт Слика или Текст', activity4: 'Само текст', title: 'Цонфигуратион', score: 'Оцена Цонфигуратион', score1: 'Без', score2: 'Абсолуте Повећање', score3: 'Проценат Повећање', score4: 'Прелаз Оцјена', checkpoint: 'Посљедњи прелаз', reset: 'Ресет', scoreCP: 'Оцена прелаз', msg: 'Поново учитај страницу након мијењање конфигурације.' },
	"slovak":	{	ltr: true,	ds: ',', dp: '.', change: 'Zmena', online: 'ONLINE', inactive: 'NEAKTÍVNYCH', i: '(i)', edit: 'Upraviť aliancia Sorter Konfigurace', activity: 'Aktivita Konfigurace', activity1: 'Predvolená Image', activity2: 'Predvolená Image alebo (i)', activity3: 'Predvolený Obrázok alebo Text', activity4: 'Text Only', title: 'Konfigurácia', score: 'Skóre Konfigurace', score1: 'Žiadny', score2: 'Absolútna Zvýšiť', score3: 'Percentuálny rast', score4: 'Checkpoint Skóre', checkpoint: 'Posledná Checkpoint', reset: 'Reset', scoreCP: 'Skóre Checkpoint', msg: 'Aktualizuj stránky po zmene nastavenia.' },
	"slovene":	{	ltr: true,	ds: ',', dp: '.', change: 'Spremeniti', online: 'ONLINE', inactive: 'NEAKTIVNE', i: '(i)', edit: 'Uredi zavezništva Sortirka Configuration', activity: 'Dejavnost Configuration', activity1: 'Privzeta slika', activity2: 'Privzeta slike ali (i)', activity3: 'Privzeta Slika ali Besedilo', activity4: 'Text Only', title: 'Konfiguracija', score: 'Ocena konfiguracije', score1: 'Nič', score2: 'Absolutnega povečanja', score3: 'Odstotek povečanja', score4: 'Kontrolirati Score', checkpoint: 'Zadnja Kontrolirati', reset: 'Ponastavi', scoreCP: 'Ocena Kontrolirati', msg: 'Osveži stran po spreminjanje konfiguracije.' },
	"spanish":	{	ltr: true,	ds: ',', dp: '.', change: 'Cambiar', online: 'EN LÍNEA', inactive: 'INACTIVO', i: '(i)', edit: 'Editar configuración Alianza Clasificador', activity: 'Configuración de actividad', activity1: 'Imagen por defecto', activity2: 'Imagen predeterminada o (i)', activity3: 'Por defecto de imagen o de texto', activity4: 'Solo texto', title: 'Configuración', score: 'Puntuación de configuración', score1: 'Ninguno', score2: 'Aumento absoluto', score3: 'Aumentar el porcentaje', score4: 'Puntuación de control', checkpoint: 'Último punto', reset: 'Restablecer', scoreCP: 'Punto de puntuación', msg: 'Volver a cargar la página después de cambiar la configuración.' },
	"swedish":	{	ltr: true,	ds: ',', dp: '.', change: 'Ändra', online: 'ONLINE', inactive: 'INAKTIV', i: '(i)', edit: 'Redigera alliansen Sortering Konfiguration', activity: 'Aktivitet Konfiguration', activity1: 'Standardbilden', activity2: 'Standardbilden eller (i)', activity3: 'Standardbilden eller Text', activity4: 'Endast text', title: 'Konfiguration', score: 'Värdering Konfiguration', score1: 'Ingen', score2: 'Absolut Ökning', score3: 'Procentuell ökning', score4: 'Checkpoint Värdering', checkpoint: 'Senaste Checkpoint', reset: 'Återställ', scoreCP: 'Värdering Checkpoint', msg: 'Uppdatera sidan efter att ha ändrat inställningen.' },
	"turkish":	{	ltr: true,	ds: ',', dp: '.', change: 'Değiştirmek', online: 'ONLINE', inactive: 'ETKİN DEĞİL', i: '(i)', edit: 'Düzenle İttifak Sorter Yapılandırma', activity: 'Etkinlik Yapılandırma', activity1: 'Varsayılan Resim', activity2: 'Varsayılan görüntü veya (i)', activity3: 'Varsayılan Resim veya Metin', activity4: 'Salt Metin', title: 'Yapılandırma', score: 'Puan Yapılandırma', score1: 'Hiçbiri', score2: 'Mutlak artırın', score3: 'Yüzde artış', score4: 'Checkpoint Puan', checkpoint: 'Son Checkpoint', reset: 'Sıfırla', scoreCP: 'Puan Checkpoint', msg: 'Yapılandırma değiştirdikten sonra yeniden yükle sayfa.' },
	"ukranian":	{	ltr: true,	ds: ',', dp: '.', change: 'Зміна', online: 'ONLINE', inactive: 'Неактивні', i: '(I)', edit: 'Змінити Альянс сортіровщік Конфігурація', activity: 'Захід Конфігурація', activity1: 'Зображення за замовчуванням', activity2: 'За замовчуванням зображення або (I)', activity3: 'За замовчуванням зображення або текст', activity4: 'Text Only', title: 'Конфігурація', score: 'Оцінка конфігурації', score1: 'Ніякої', score2: 'Абсолютний приріст', score3: 'Відсоткове збільшення', score4: 'Чекпойнт Оцінку', checkpoint: 'Останнє Чекпойнт', reset: 'Скинути', scoreCP: 'Всього Чекпойнт', msg: 'Перезавантажити сторінку після зміни конфігурації.' },
	"urdu": 	{	ltr: false,	ds: ',', dp: '.', change: 'Change', online: 'ONLINE', inactive: 'INACTIVE', i: '(i)',	edit: 'Edit Alliance Sorter Configuration', activity: 'Activity Configuration',	activity1: 'Default Image', activity2: 'Default Image or (i)', activity3: 'Default Image or Text',	activity4: 'Text Only',	title: 'Configuration', score: 'Score Configuration',	score1: 'None', score2: 'Absolute Increase', score3:'Percentage Increase',	score4: 'Checkpoint Score', checkpoint: 'Last Checkpoint',	reset: 'Reset', scoreCP: 'Score Checkpoint', msg: 'Reload the page after changing the configuration.' },
	"vietnamese":	{	ltr: true,	ds: ',', dp: '.', change: 'Thay đổi', online: 'TRỰC TUYẾN', inactive: 'Không hoạt động', i: '(i)', edit: 'Tuỳ chỉnh cấu hình trình sắp xếp', activity: 'Cách hiển thị trạng thái trực tuyến', activity1: 'Hình ảnh mặc định', activity2: 'Hình ảnh mặc định hoặc hiện: (i)', activity3: 'Hình hoặc chữ mặc định', activity4: 'Chỉ hiện chữ', title: 'Cấu hình', score: 'Tuỳ chỉnh so sánh điểm', score1: 'Không chọn', score2: 'Hiện điểm thay đổi', score3: 'Hiện phần trăm thay đổi', score4: 'Điểm Checkpoint', checkpoint: 'Lần cuối thiết lập', reset: 'Thiết lập lại', scoreCP: 'Điểm xác nhận', msg: 'Tải lại trang sau khi thay đổi cấu hình.' }
}[ lang ];
language.time = language_time[lang];

const rmap	= {
	'.': '\\.',
	',': ','
};

const left	= language.ltr?'left':'right';
const right	= language.ltr?'right':'left';

var activity		= parseInt( GM_getValue( cache_variables.ACTIVITY, 1 ) );
var savedData		= eval( GM_getValue( cache_variables.CHECKPOINT, false ) );
var displayScoreInc	= eval( GM_getValue( cache_variables.SCORE, 1 ) );
var columns		= [ 'lastActive', 'name', 'towns', 'rank', 'points' ];
var columnMap		= { lastActive: 0, name: 1, towns: 2, rank: 3, points: 4, action: 5 };

function getSavedData() {
	savedData = eval( GM_getValue( cache_variables.CHECKPOINT, false ) );
}

function saveData() {
	savedData = {date: new Date().getTime(), data:{} };
	$("table#memberList").each( function() {
		$("tbody tr", this).each( function() {
			var p = toNumber( $("td:eq("+columnMap.points+")", this) );
			var n = $("td:eq("+columnMap.name+")", this).text();
			savedData.data[n] = p;
		});
	});
	GM_setValue( cache_variables.CHECKPOINT, savedData.toSource() );
	if ( DEBUG ) GM_log( 'Save data: ' + savedData.toSource() );
}

function generateHeaderCell( cell, column ) { //dataType ) {
	$(cell)	.prepend( '<span class="AMI_SortAsc">▲</span>' )
		.append( '<span class="AMI_SortDes">▼</span>' );
	$( "span.AMI_SortAsc", cell ).click( function() { sortByColumn( column, true ); } );
	$( "span.AMI_SortDes", cell ).click( function() { sortByColumn( column, false ); } );
}

function reformatNumber( n ) {
	var text = new String( n );
	var match;
	while ( match = /^(\D*)(\d+)(\d{3})(.*)$/.exec( text ) )
		text = (match[1]?match[1]:'') + match[2] + language.ds + match[3] + (match[4]?match[4]:'');
	return text;
}

function toDate( cell ) {
	var p	= /(\d+)\.(\d+)\.(\d+)/.exec( cell.attr('title') );
	var d	= new Date();
	d.setHours( 0, 0, 0, 0 );
	d.setFullYear( p[3], p[2] - 1, p[1] );
	return d;
}
function toNumber( cell ) {
	var	text	= cell.text().replace( new RegExp( rmap[language.ds], 'g'), '' ),
		n	= new RegExp( '(-?\\d+' + rmap[language.dp] + '\\d+)%' ).exec( text );
	if ( n )
		return Number( n[1] );
	var	v	= Number( text );
	if ( isNaN( v ) )
		return Number.NEGATIVE_INFINITY;
	return v;
}
function toText( cell )	{	return cell.text(); }
function toTowns( cell ) {	return Number( /:\s*(\d+)/.exec( cell.text() )[1] ); }
function toIndex( cell ) {	return Number( cell.parent().attr('_index') ); }
function compareFunction( a, b ) {
	if ( a.data < b.data ) return -1;
	if ( a.data > b.data ) return 1;
	return 0;
}
function compareText( a, b ) {
	var aS = a.data.toLowerCase();
	var bS = b.data.toLowerCase();
	if ( aS < bS ) return -1;
	if ( aS > bS ) return 1;
	return 0;
}

const fnMap = {
	lastActive:	{	parser: toDate,
				sorter: function( a, b ) {
					var oA = a.cell.hasClass( '_online' );
					var oB = b.cell.hasClass( '_online' );
					if ( oA && oB ) return 0;
					if ( oA ) return -1;
					if ( oB ) return 1;
					if ( a.data < b.data ) return 1;
					if ( a.data > b.data ) return -1;
					return 0;
				} },
	name:		{	parser: toText,
				sorter: compareText },
	towns:		{	parser: toTowns,
				sorter: compareFunction },
	rank:		{	parser: toText,
				sorter: compareText },
	points:		{	parser: toNumber,
				sorter: compareFunction },
	action:		{	parser: toIndex,
				sorter: compareFunction },
	normal:		{	parser: toNumber,
				sorter: compareFunction }
};

function sortByColumn( column, asc ) {
	$("table#memberList tbody").each( function() {
		var rows	= $("tr", this);
		var data	= [];
		var fns		= fnMap[ columns[column] ] || fnMap[ 'normal' ];
		var parser	= fns.parser;
		var sorter	= fns.sorter;
		for ( var i = 0; i < rows.length; i++ ) {
			if ( $("td", rows[i]).length >= 6 ) {
				var c = $("td:eq("+column+")", rows[i]);
				data.push( { row: rows[i], cell: c, data: parser(c) } );
			}
		}	
		data.sort( asc?sorter:function(a, b) {return sorter(b, a);} );
		for ( var i = 0; i < data.length; i++ ) {
			$(this).append( data[i].row );
			if ( i % 2 == 1 )
				$( data[i].row )	.removeClass( 'default' )
							.addClass( 'alt' ); 
			else
				$( data[i].row )	.addClass( 'default' )
							.removeClass( 'alt' ); 
		}
	});
}

function parsePage() {
	var needToSave = false;
	if ( savedData === false )
		saveData();

	GM_addStyle(
		'span.AMI_SortAsc { cursor: pointer }' +
		'span.AMI_SortDes { cursor: pointer }' +
		'span.AMI_Absolute { display: none }' +
		'span.AMI_Relative { display: none }'
	);

	$( "table#memberList" ).each( function() {
		var i = 0;
		if ( displayScoreInc > 1 ) {
			$( "thead tr th", this ).each( function() {
				if ( !$(this).attr('class') ) {
					if ( columns[i] == 'points' )
						$(this).after("<th class='sorter_Change'>" + language.change + "</th>");
					i++;
				}
			});
		}
		var i = 0;
		$( "thead tr th", this ).each( function() {
			var className = $(this).attr('class');
			if ( className )
				columns.splice( i, 0, className );
			columnMap[columns[i]] = i;
			generateHeaderCell( this, i++ );
		});

		var now		= new Date();
		now.setHours( 0, 0, 0, 0 );
		now.setDate( now.getDate() - 7 );
		var index = 0;
		$("tbody tr", this).each( function() {
			if ( $(this).hasClass("highlight") || $(this).hasClass("1") )
				$(this).addClass( 'highlight' );
			var onlineCell	= $("td:eq("+columnMap.lastActive+")", this);
			var online	= onlineCell.hasClass( 'online' );
			var lastActive	= /(\d+)\.(\d+)\.(\d+)/.exec( onlineCell.attr( 'title' ) );
			var then	= new Date();
			then.setHours( 0, 0, 0, 0 );
			then.setFullYear( lastActive[3], lastActive[2] - 1, lastActive[1] )
			var inactive	= then < now;
			if ( activity == 4 ) {
				onlineCell.attr( 'class', online?'_online':'' );
				if ( online ) {
					onlineCell.html( '<strong>' + language.online + '</strong>' );
					onlineCell.css( 'color', 'green' );
				} else if ( inactive ) {
					onlineCell.html( '<strong>' + language.inactive + '</strong>' );
					onlineCell.css( 'color', 'red' );
				} else {
					onlineCell.html( '<strong>' + lastActive[1] + '/' + lastActive[2] + '/' + lastActive[3] + '</strong>' );
					var days = ( then.getTime() - now.getTime() ) / (24 * 60 * 60 * 1000);
					if ( days > 5 )		onlineCell.css( 'color', 'green' );
					else if ( days > 2 )	onlineCell.css( 'color', '#FFCC00' );
					else			onlineCell.css( 'color', '#FF6600' );
				}
			} else if ( inactive ) {
				if ( activity != 1 )
					onlineCell.attr( 'class', online?'_online':'' );
				if ( activity == 2 )
					onlineCell.html( '<strong>' + language.i + '</strong>' );
				else if ( activity == 3 )
					onlineCell.html( '<strong>' + lastActive[1] + '/' + lastActive[2] + '/' + lastActive[3] + '</strong>' );
			}
			$(this).attr('_index', index++ );
			if ( displayScoreInc > 1 ) {
				var name	= $("td:eq("+columnMap.name+")", this).text();
				var pointsCell	= $("td:eq("+columnMap.points+")", this);
				var points	= toNumber( pointsCell );
				if ( savedData.data[name] === undefined ) {
					savedData.data[name] = points;
					needToSave = true;
				}
				var savedPoints	= savedData.data[name];
				if ( displayScoreInc < 4 ) {
					var diff	= points - savedPoints;
					var display	= reformatNumber( displayScoreInc == 2?diff:((diff*100/points).toFixed(2) + '%') );
					pointsCell.after( "<td>" + display + "</td>");
				} else {
					pointsCell.after( "<td>" + reformatNumber( savedPoints ) + "</td>");
				}
			}
		});
		
	});

	GM_addStyle(
		"table#memberList tfoot tr th div#sorter_openConfig	{ position: relative; width: 100%; height: 100%; cursor: pointer; text-align: " + right + "; }" +
		"table#memberList tfoot tr th div#sorter_configBox	{ position: absolute; " + right + ": 0px; bottom: 30px; background: #e4b873; border: 1px solid brown; padding: 0px 0px 0px 1px; display: none; cursor: auto; }"
	);

	if ( $("table#memberList tfoot").length == 0 )
		$("table#memberList").append( "<tfoot />" );
	var update = "?";
	if ( savedData ) {
		var diff = new Date().getTime() - savedData.date;
		var m = Math.floor( ( diff % 3600000 ) / 60000 );
		if ( !isNaN(m) ) {
			var h = Math.floor( ( diff % 86400000 ) / 3600000 );
			var d = Math.floor( diff / 86400000 );
			update = (d > 0?d + language.time.d + ' ':'') + (h > 0?h + language.time.h + ' ':'') + m + language.time.m;
		}
	}

	$("table#memberList tfoot").append(
		"<tr><th colspan='" + columns.length + "'><div id='sorter_openConfig'>" +
		language.edit +
		"<div id='sorter_configBox'>" +
		"<table cellspacing='0' cellpadding='0' border='1' style='margin:0px; text-align: " + left + "'>" +
		"<thead><tr><th colspan='2'>" + language.title + "</th></tr></thead>" +
		"<tbody>" +
		"<tr><th>" + language.activity + ":</th><td><select id='sorter_configActivity' style='width: 100%'><option value='1'>" + language.activity1 + "</option><option value='2'>" + language.activity2 + "</option><option value='3'>" + language.activity3 + "</option><option value='4'>" + language.activity4 + "</option></select></td></tr>" +
		"<tr><th>" + language.score + ":</th><td><select id='sorter_configScore' style='width: 100%'><option value='1'>" + language.score1 + "</option><option value='2'>" + language.score2 + "</option><option value='3'>" + language.score3 + "</option><option value='4'>" + language.score4 + "</option></select></td></tr>" +
		"<tr><th>" + language.checkpoint + ":</th><td style='text-align: center'>" + update + "</td></tr>" +
		"<tr><th>" + language.scoreCP + ":</th><td style='text-align: center'><input type='button' id='sorter_configCheckpoint' value='" + language.reset + "' /></td></tr>" +
		"<tr><th /><td><select id='sorter_language'>" + populateLanguageSelect( lang ) + "</select></td></tr>" +
		"</tbody>" +
		"<tfoot><tr><th colspan='2' style='text-align: center'><i>" + language.msg + "</i></th></tr></tfoot>" +
		"</table>" +
		"</div>" +
		"</div></th></tr>"
	);
	$("div#sorter_openConfig").click( function () { $("div#sorter_configBox").toggle(); } );
	$("div#sorter_configBox").click( function( e ) { e.stopPropagation(); } );
	$("select#sorter_configActivity")
		.val( activity )
		.change( function() {
			var value = $("option:selected", this).attr('value');
			GM_setValue( cache_variables.ACTIVITY, value );
			if ( DEBUG ) GM_log( 'Config activity: ' + value );
		});
	$("select#sorter_configScore")
		.val( displayScoreInc )
		.change( function() {
			var value = $("option:selected", this).attr('value');
			GM_setValue( cache_variables.SCORE, value );
			if ( DEBUG ) GM_log( 'Config score: ' + value );
		});
	$("select#sorter_language")
		.change( function() {
			var value = $("option:selected", this).attr('value');
			GM_setValue( cache_variables.LANGUAGE, value );
			if ( DEBUG ) GM_log( 'Config language: ' + value );
		});
	$("input#sorter_configCheckpoint").click( function() { saveData(); } );

	if ( needToSave )
		GM_setValue( cache_variables.CHECKPOINT, savedData.toSource() );
}

$( parsePage );