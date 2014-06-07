// ==UserScript==
// @name           Krautchan /b/ackwash & more Krautchan edition
// @namespace      krautchanbackandmore
// @version        V1103205
// @include        http://krautchan.net/*
// @include        http://www.krautchan.net/*
// @include        https://krautchan.net/*
// @include        https://www.krautchan.net/*
// @match          http://krautchan.net/*
// @match          http://www.krautchan.net/*
// @match          https://krautchan.net/*
// @match          https://www.krautchan.net/*
// @exclude        *.jpg
// @exclude        *.png
// @exclude        *.gif
// @exclude        *.css
// @exclude        *.js
// ==/UserScript==

if(localStorage.getItem('showQuotes') == null)
{
	localStorage.setItem('showQuotes', 'true');
	localStorage.setItem('showQuotesInline', 'true');
	localStorage.setItem('showReplies', 'true');
	localStorage.setItem('delay', '0');
	localStorage.setItem('fadeDelay', '200');
	localStorage.setItem('autoPasswort', '');
	localStorage.setItem('showImages', 'true');
	localStorage.setItem('verticalAlign', 'true');
	localStorage.setItem('jumpToImage', 'true');
	localStorage.setItem('expandAll', 'true');
	localStorage.setItem('showGifs', 'true');
	localStorage.setItem('loadNextPage', 'true');
	localStorage.setItem('showSpoiler', 'true');
	localStorage.setItem('convertLinks', 'true');
	localStorage.setItem('ytEmbed', 'true');
	localStorage.setItem('ytEmbedSmall', 'false');
	localStorage.setItem('viewInline', 'true');
	localStorage.setItem('quickReply', 'true');
	localStorage.setItem('showBigform', 'true');
	localStorage.setItem('normalReply', 'true');
	localStorage.setItem('allLinks', 'true');
	localStorage.setItem('removeShiPainter', 'false');
	localStorage.setItem('showSearch', 'true');
	localStorage.setItem('removeRadio', 'false');
	localStorage.setItem('smallThumbs', 'false');
	localStorage.setItem('hidePostform', 'false');
	localStorage.getItem('newThreads', 'true');
	localStorage.getItem('showNewThreads', 'true');
	localStorage.getItem('newPostings', 'true');
	localStorage.getItem('newPostingsPage', 'true');
	localStorage.getItem('moveNewPostings', 'true');
	localStorage.getItem('krautzip', 'true');
	localStorage.getItem('fadeAutosage', 'false');
	localStorage.getItem('fixWidth', 'false');
	localStorage.setItem('language', 'de');
	localStorage.setItem('replaceOpenClose', 'false');
}
if(localStorage.getItem("shadow") == null){
    localStorage.setItem("shadow", 0);
}
if(localStorage.getItem("borderRadius") == null){
    localStorage.setItem("borderRadius", 0);
}
if(localStorage.getItem("zipThreshold") == null){
    localStorage.setItem("zipThreshold", 2);
}
if(localStorage.getItem("removeWordfilter") == null){
    localStorage.setItem("removeWordfilter", 'true');
}
if(localStorage.getItem("removeNameInsults") == null){
    localStorage.setItem("removeNameInsults", 'false');
}

kc_addJQuery=function(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
};

kc_main=function() {
	$.noConflict();

	kc_lang = function(name)
	{
		var language = localStorage.getItem('language');
		var lang=[];
		lang[language]=[];
		lang['en']=[];
		lang['en']['Einstellungen'] = 'Settings';
		lang['en']['filtern'] = 'filter';
		lang['en']['Zitate bei Mouseover anzeigen'] = 'Show quotes on mouseover';
		lang['en']['Zitate einfügen bei Klick'] = 'Insert quotes on click';
		lang['en']['Antworten anzeigen'] = 'Show replies';
		lang['en']['Verzögerung bei Einblendung'] = 'Delay before fade in';
		lang['en']['Dauer der Animation'] = 'Fade in time';
		lang['en']['Passwort automatisch setzen'] = 'Set passwort';
		lang['en']['Links automatisch umwandeln'] = 'Convert links';
		lang['en']['Youtube Videos einblenden'] = 'Show Youtube videos';
		lang['en']['Bilder direkt anzeigen'] = 'Show Images as overlay';
		lang['en']['Bilder vertikal zentrieren'] = 'Vertical align images';
		lang['en']['Zu geöffnetem Bild springen'] = 'Jump to open image';
		lang['en']['Thumbnails/Bilder pro Thread umschalten'] = 'Switch Thumbnails/Images per Thread';
		lang['en']['Animierte Gifs automatisch laden'] = 'Show animated gifs';
		lang['en']['Spoiler immer anzeigen'] = 'Always show spoiler';
		lang['en']['Suchfeld anzeigen'] = 'Show filter field';
		lang['en']['Shi Painter entfernen'] = 'Remove Shi Painter';
		lang['en']['Radio entfernen'] = 'Remove Radio';
		lang['en']['Nächste Seite automatisch laden'] = 'Infinitive scroll';
		lang['en']['Geladene Seite automatisch entfernen'] = 'Remove loaded pages automatically';
		lang['en']['Beiträge in Übersicht aktualisieren'] = 'Load thread inline';
		lang['en']['Schnellantwort anzeigen'] = 'Show quick reply link';
		lang['en']['Antwortlink anzeigen'] = 'Show reply link';
		lang['en']['Linkübersicht anzeigen'] = 'Show Filelist link';
		lang['en']['Nach neuen Themen suchen'] = 'Search for new threads';
		lang['en']['Neue Themen sofort anzeigen'] = 'Show new threads';
		lang['en']['Nach neuen Beiträgen suchen'] = 'Search for new postings';
		lang['en']['Themen nach oben verschieben'] = 'Move threads with new posts up';
		lang['en']['Postformular ausblenden'] = 'Hide Postform';
		lang['en']['kleine Vorschaubilder'] = 'Small thumbnails';
		lang['en']['Einstellungen übernehmen'] = 'Apply settings';
		lang['en']['Dateiliste'] = 'Filelist';
		lang['en']['Thumbnails/Bilder'] = 'Thumbnails/Images';
		lang['en']['Schnellantwort'] = 'QuickReply';
		lang['en']['Antworten'] = 'Reply';
		lang['en']['Alles anzeigen'] = 'Show all';
		lang['en']['Beiträge aktualisieren'] = 'Reload posts';
		lang['en']['Es gibt 1 Thema mit neuen Beiträgen. Klicke hier, um ihn einzublenden.'] = 'There is 1 thread with new postings. Click here to make it visible';
		lang['en']['Es gibt'] = 'There are';
		lang['en']['Themen mit neuen  Beiträgen. Klicke hier, um sie einzublenden.'] = 'threads with new postings. Click here to make them visible.';
		lang['en']['Krautzip (Spamkontrolle) benutzen']  = 'Use Krautzip (Spamcontrol)';
		lang['en']['Autosäge blasser anzeigen']  = 'Fade Autosage';
		lang['en']['Antworten auf voller Breite anzeigen']  = 'Show fullwidth replies';
		lang['en']['Immer großes Formular anzeigen']  = 'Always show big form';
		lang['en']['Youtube Videos minimieren']  = 'Show Youtube videos on click';
		lang['en']['Neues Thema eröffnen']  = 'Start a new thread';
		lang['en']['Pfeil links <= Ein Bild zurück'] = 'Arrow left <= Previous Image';
		lang['en']['Ein Bild vor => Pfeil rechts'] = 'Next Image => Arrow right';
		lang['en']['Bild'] = 'Image';
		lang['en']['von'] = 'of';
		lang['en']['Nur neue Beiträge anzeigen'] = 'Show only new postings';
		lang['en']['Nur letzte Beiträge anzeigen'] = 'Show only last postings';
		lang['en']['Neue Beiträge anzeigen'] = 'Show new postings';
		lang['en']['Auf Einzelseiten autmatisch laden'] = 'Add on single pages automatically';
		lang['en']['Goldaccount löschen'] = 'Delete Goldaccount';
		lang['en']['Klick hier, um die Zitate zu lösen'] = 'Click here, to remove quote from text';

		if(typeof lang[language][name] != "undefined")
			return lang[language][name];
		
		return name;
	}

	kc_linkify=function()
	{
		jQuery('blockquote>p:not(.linkify)').each(function(){
			var n = jQuery(this);
			var html = n.html();
			html = html.replace(/(^|\s|\>)(www\..+?\..+?)(\s|$)/g, '$1<a href="http://anonym.to/?http://$2">$2</a>$3').replace(/(^|\s|\>)(((https?|ftp):\/\/|mailto:).+?)(<|\s|$)/g, '$1<a href="http://anonym.to/?$2">$2</a>$5');
			jQuery(n).html(html).addClass('linkify');
		});
	}
	
	kc_youtubify=function()
	{
		jQuery('blockquote>p:not(.youtubify)').each(function(){
			var n = jQuery(this);
			var html = n.html();

			if(localStorage.getItem('ytEmbedSmall') == 'true')
				var html = html.replace(/(^|\s|\>)(http:\/\/|)(www\.|)youtube\.com\/[^v]+v.(.{11})(.*)/g, '$1<div><a class="kc_youtube_show" href="http://anonym.to/?http://youtube.com/watch?v=$4">Youtube Video abspielen</a></div><div class="kc_youtube" style="display:none;height:390px;width:480px;background:#000;"><iframe title="YouTube video player" width="480" height="390" src="http://anonym.to?http://www.youtube.com/embed/$4" frameborder="0" allowfullscreen></iframe></div>$5');
			else
				var html = html.replace(/(^|\s|\>)(http:\/\/|)(www\.|)youtube\.com\/[^v]+v.(.{11})(.*)/g, '$1<div class="kc_youtube" style="display:inline-block;height:390px;width:480px;background:#000;"><iframe title="YouTube video player" width="480" height="390" src="http://anonym.to?http://www.youtube.com/embed/$4" frameborder="0" allowfullscreen></iframe></div>$5');

			jQuery(n).html(html).addClass('youtubify');
		});
	}
	
	kc_show_gifs=function()
	{
		jQuery('img[id^=thumbnail_]:not(.gif)').each(function(e){
			if(jQuery(this).attr('src').substr(-4) == '.gif')
			{
				jQuery(this).addClass('gif').attr('src', jQuery(this).attr('src').replace(/\/thumbnails\//, '/files/'));
			}
		});
	}

	kc_show_replies=function()
	{
		jQuery('.thread:not(.kc_showReplies)').each(function(){
			var id = jQuery(this).find('a:first').attr('name');
			var text = jQuery(this).find(".postreply:contains('>>"+id+"')").map(function(){
				var id = jQuery(this).find('.postnumber:first').find('a:last').text();
				var link = jQuery(this).find('.postnumber:first').find('a:first').attr('href');
				if(localStorage.getItem('showQuotesInline') == 'true')
					return '<a href="' + link + '">'+id+'</a>';
				else
					return '<a href="' + link + '" onclick="highlightPost(\''+id+'\')">'+id+'</a>';
			}).get().join(' ');
			if (text != '')
			{
				if(jQuery(this).find('.replies').length==0)
					jQuery(this).addClass('kc_showReplies').find('.postnumber:first').after(' <span class="replies">Re: '+text+'</span> ');
				else
					jQuery(this).addClass('kc_showReplies').find('.replies').html(' <span class="replies">Re: '+text+'</span> ');
			}
		});
		jQuery('.postreply:not(.kc_showReplies)').each(function(){
			var id = jQuery(this).find('.postnumber:first').find('a:last').text();
			var text = jQuery(this).parents('.thread').find(".postreply:contains('>>"+id+"')").map(function(){
				var id = jQuery(this).find('.postnumber:first').find('a:last').text();
				var link = jQuery(this).find('.postnumber:first').find('a:first').attr('href');
				if(localStorage.getItem('showQuotesInline') == 'true')
					return '<a href="' + link + '">'+id+'</a>';
				else
					return '<a href="' + link + '" onclick="highlightPost(\''+id+'\')">'+id+'</a>';
			}).get().join(' ');
			if (text != '')
			{
				if(jQuery(this).find('.replies').length==0)
					jQuery(this).addClass('kc_showReplies').find('.postnumber:first').after(' <span class="replies">Re: '+text+'</span> ');
				else
					jQuery(this).addClass('kc_showReplies').find('.replies').html(' <span class="replies">Re: '+text+'</span> ');
			}
		});
	}
	
	// the following function was taken from jsolait <http://jsolait.net/>
	// LZW-compress a string
	krautzip=function(s)
	{
		if(s == '') return '';
		var dict = {};
		var data = (s + "").split("");
		var out = [];
		var currChar;
		var phrase = data[0];
		var code = 256;
		for (var i=1; i<data.length; i++) {
			currChar=data[i];
			if (dict[phrase + currChar] != null) {
				phrase += currChar;
			}
			else {
				out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
				dict[phrase + currChar] = code;
				code++;
				phrase=currChar;
			}
		}
		out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
		for (var i=0; i<out.length; i++) {
			out[i] = String.fromCharCode(out[i]);
		}
// 		return out.join("");
		if((s.length/out.join('').length) > localStorage.getItem("zipThreshold"))
			return '<div class="krautzip_hidden" style="color:#f00;font-weight:bold;cursor:pointer;">(ZIP)</div><div style="display:none;font-weight:normal;color:#000">'+s+'</div>';
	}
	
	kc_sage=function(){
		jQuery('.sage:not(.kc_sage):contains(AUTO)').parents('.thread').addClass('kc_sage').css({"opacity":".2"}).bind("mouseover mousemove", function(){
			jQuery(this).css({"opacity":"1"});
		}).bind("mouseout", function(){
			jQuery(this).css({"opacity":".2"});
		});
	}

	kc_fixWidth=function(){
		jQuery('.thread table').css({'width':'100%'});
		jQuery('.inline').css({'width':'100%'});
		jQuery('.thread td:first-child').css({'width':'20px'});
		jQuery('.postreply').css({'float':'none'});
	}

	kc_smallThumbs=function(){
		jQuery('img[id^=thumbnail_]').each(function(){
			if(jQuery(this).attr('src').indexOf('/thumbnails') == 0 || jQuery(this).is('.gif'))
				jQuery(this).css({'max-width':'98px','height':'auto','max-height':'200px'});
			else
				jQuery(this).css({'max-width':'999999px','height':'auto','max-height':'999999px'});
		});
	}
	
	kc_quoteInfo=function(){
		jQuery('blockquote>p>a').each(function(){
            //wenn schon Markierung vorhanden, dann gibt es nichts zu tun.
            if(jQuery(this, "a:contains('OP')"))return;
            if(jQuery(this, "a:contains('Duckroll')"))return;
			var id = jQuery(this).attr('href').split('#')[1];

			if(jQuery(this).parents('#thread_'+id).length>0)
				jQuery(this).append(' (OP)');

			else if(jQuery(this).attr('href').indexOf('resolve') > 0)
				jQuery(this).append(' (Duckroll?)');
		});
	}

    removeWordfilter=function(input)
    {
        if(input==null)return "null";
        //idealerweise in der umgekehrten Reihenfolge wie auf Krautchan gefiltert wird
        return input.
            replace(/(Jassir Arafat|Annette von Droste-Hülshoff|Heinz Sielmann|Paul Breitner|Jodie Foster|Sexy Cora|Ludwig Boltzmann)/g, "<abbr title='$1'>Steve Krömer</abbr>").
            replace(/(Skeletor|Aquaman|Danger Mouse|Tank Girl|Morpheus|Professor X|Flash Gordon|Radioactive Man|Doctor Octopus)/g, "<abbr title='$1'>stevinho</abbr>").
            replace(/(P([^a-zA-Z<]*)e([^a-zA-Z<]*)s([^a-zA-Z<]*)t)/gi, "<abbr title='$1'>M$2a$3r$4a</abbr>").
            replace(/(Sören)/gi, "<abbr title='$1'>Kevin</abbr>").
            replace(/(Ansgar)/gi, "<abbr title='$1'>Justin</abbr>").
            replace(/(PENIS)/g, "<abbr title='$1'>xD</abbr>").
            replace(/(Vagina-Style)/g, "<abbr title='$1'>gnihihi</abbr>").
            replace(/(Dwight D.)/g, "<abbr title='$1'>Sascha</abbr>").
            replace(/(Eisenhower)/g, "<abbr title='$1'>Lobo</abbr>").
            replace(/(Liechtenstein)/g, "<abbr title='$1'>lachschon</abbr>").
            replace(/(Arbeitsamt)/g, "<abbr title='$1'>4fuckr</abbr>").
            replace(/(Lepra)/g, "<abbr title='$1'>Lena</abbr>").
            replace(/(Turing-vollständig)/g, "<abbr title='$1'>schwul</abbr>").
            replace(/(Süleyman der Prächtige)/g, "<abbr title='$1'>Sarrazin</abbr>").
            replace(/(Harkonnen)/g, "<abbr title='$1'>Guttenberg</abbr>").
            replace(/(harkonnen)/g, "<abbr title='$1'>guttenberg</abbr>").
            replace(/(Dissertation)/gi, "<abbr title='$1'>Kopierpaste</abbr>").
            replace(/(Thales von Milet)/g, "<abbr title='$1'>Enke</abbr>").
            replace(/(Arschbürger)/gi, "<abbr title='$1'>Asperger</abbr>").
            replace(/(Arschberger)/gi, "<abbr title='$1'>Asperger</abbr>").
            replace(/(Arschburger)/gi, "<abbr title='$1'>Asperger</abbr>").
            replace(/(Assburger)/gi, "<abbr title='$1'>Asperger</abbr>").
            replace(/(Ich lutsche übrigens gerne Schwänze)/g, "<abbr title='$1'>als ob</abbr>");
    }
    removeInsults=function(input){
        name_regex=/,( |)(Abraham|Absalom|Achim|Achmed|Adalbert|Adalbrecht|Adam|Adamina|Adamo|Adelaide|Adelbert|Adele|Adelgard|Adelheid|Adeltraud|Adi|Adloff|Ado|Adolf|Adolphus|Adrian|Aemilius|Agnes|Agnesa|Agneta|Ahmad|Ahmet|Akim|Albert|Alberto|Albertus|Albin|Albina|Albinus|Albrecht|Alec|Alejandro|Aleko|Aleksandr|Alessandra|Alessandro|Alessia|Alex|Alexa|Alexander|Alexandra|Alexandre|Alexandria|Alexandrina|Alf|Alfie|Alfons|Alfonso|Alfred|Ali|Alica|Alice|Alicia|Alicja|Alisia|Alison|Alissa|Alix|Alla|Alma|Alois|Alonso|Alosius|Alouis|Aloys|Aloysius|Alphons|Alphonse|Alvin|Alvina|Alwin|Alwina|Amanda|Amandus|Amelia|Amélie|Amely|Ana|Andi|Andra|André|Andrea|Andreas|Andrej|Andrew|Andy|Anette|Angela|Angèle|Angelica|Angelika|Angelina|Angelique|Angelo|Angelus|Angie|Aniela|Anita|Anja|Anjana|Anjette|Anjuscha|Anjutha|Anka|Anke|Ankea|Ann|Anna|Annalisa|Anne|Annecke|Annegret|Annelie|Anneliese|Annelise|Annemarie|Annerose|Annette|Anni|Annlis|Anthony|Antje|Antoine|Antoinette|Anton|Antonia|Antonie|Antonio|Antonius|Anuschka|Armand|Armando|Armin|Arminio|Arminius|Arnaldo|Arnauld|Arnd|Arne|Arno|Arnold|Arthur|Artur|Arturo|Ashley|Asta|Astrid|August|Augusta|Auguste|Augustin|Augustina|Augustinus|Augustus|Ava|Axel|Azzo|Babetta|Babetta|Babette|Babsi|Babsi|Barb|Barb|Barbara|Barbe|Bärbel|Barbi|Barbla|Barbla|Barbli|Barbro|Basti|Bastian|Bastl|Bathe|Bea|Beate|Beatrice|Beatrix|BeatrixaAli|Beatriz|Bedrich|Ben|Benedetta|Benedetto|Benedict|Benedicta|Benedikt|Bengt|Benita|Benito|Benjamin|Bennet|Benno|Benny|Bent|Berenice|Berit|Bernard|Bernardo|Bernd|Bernhard|Berni|Bernice|Bert|Berta|Berthilde|Berthold|Bertram|Bertrud|Bettina|Betty|Bianca|Bianka|Biggi|Bill|Birgid|Birgita|Björn|Bodo|Bogdan|Boris|Borislav|Bridget|Brigida|Brigitta|Brigitte|Britt|Britta|Brun|Brunhild|Bruni|Bruno|Burkhart|Cäcilie|Carl|Carla|Carlene|Carlo|Carlos|Carlotta|Carmel|Carmelina|Carmelita|Carmella|Carmen|Carmilla|Carola|Carolin|Carolina|Carolyn|Carsten|Caterina|Catherine|Cecil|Cecile|Cecilia|Cerstin|Charleen|Charlene|Charles|Charlie|Charlotta|Charlotte|Charlotte|Charly|Chiara|Chloe|Christa|Christel|Christian|Christiana|Christiane|Christina|Christof|Christoph|Christopher|Christophorus|Claire|Clara|Clarice|Clarissa|Clarisse|Clarita|Claude|Claudette|Claudi|Claudia|Claudine|Claudius|Claus|Clemency|Clemens|Clement|Clementia|Clementine|Conny|Conrad|Constantin|Constantine|Cora|Cordula|Corinna|Corinne|Cornel|Cornelia|Cornelio|Cornelius|Cornell|Cristiano|Dagmar|Dana|Danela|Danella|Dani|Daniel|Daniela|Daniele|Daniella|Danila|Danilo|Danni|Danny|Dano|Dany|Dave|Daveen|Davelle|David|Davida|Davide|Davina|Davis|Davut|Davy|Dayana|Dedit|Demetrius|Denis|Denise|Dennis|Denny|Derek|Derrick|Detlef|Detlev|Diana|Diane|Dierck|Dieter|Dietleib|Dietlind|Dietmar|Dietrich|Dijana|Dimitri|Dimitrios|Dionysia|Dionysius|Dirck|Dirk|Dirko|Ditmar|Dmiti|Domenic|Domenico|Domenicus|Domingo|Domini|Dominicus|Dominik|Dominikus|Dominique|Dora|Doreen|Dorena|Dorene|Dorette|Doris|Dorothea|Dorothee|Dorothy|Dorrit|Dörte|Eamon|Ebbert|Eberhard|Eckart|Eckehart|Eckhard|Ed|Edda|Eddie|Edelgard|Edeltraud|Edgar|Edgitha|Edi|Edit|Edith|Edmond|Edmund|Edoardo|Edouard|Eduard|Eduardo|Edvard|Edward|Edwin|Edwina|Egino|Egon|Elena|Eleonora|Eleonore|Elfi|Elfride|Elfriede|Elia|Eliah|Elias|Elija|Elijah|Elinor|Elisa|Elisabet|Elisabeta|Elisabeth|Elisabetta|Elise|Eliza|Elizabeth|Elke|Ella|Elle|Ellen|Elli|Elmar|Elmo|Elsa|Elsbeth|Else|Elvi|Elvira|Emanouel|Emanuel|Emely|Emil|Emile|Emilia|Emilie|Emilio|Emily|Emma|Emmanuel|Emmi|Engelbert|Enrico|Enriko|Enrique|Enzio|Eppo|Erdt|Erhard|Erhardt|Eric|Erich|Erik|Erika|Erna|Ernest|Ernesta|Ernestina|Ernesto|Ernestus|Erno|Ernö|Ernst|Ervin|Erwein|Erwin|Esteban|Ester|Estevan|Esther|Estrid|Eszter|Ethan|Etienne|Eugen|Eugene|Eugenio|Eugenius|Eva|Eve|Eveke|Eveleen|Evelin|Evelina|Evelyn|Evelyne|Everd|Everhard|Evi|Evon|Evonne|Ewald|Ezzo|Fabia|Fabian|Fabiana|Fabien|Fabienne|Fabio|Fabius|Falco|Falk|Falko|Federico|Fedora|Felicia|Felicity|Felix|Felizia|Ferdi|Ferdinand|Fernando|Ferry|Filip|Filippa|Filippo|Finn|Fjodor|Fjodora|Flora|Florence|Florenz|Floria|Florian|Florin|Florina|Frances|Francesca|Francesco|Francetta|Francette|Francine|Francis|François|Françoise|Frank|Franz|Franziska|Franziskus|Frauke|Fred|Freddy|Frederic|Frederick|Frederik|Fredi|Fridericus|Fridlin|Fridolin|Frieda|Friedel|Frieder|Friederich|Friederike|Friedhelm|Friedrich|Fritz|Fynn|Gabi|Gabriel|Gabriele|Gabriella|Gary|Gebhard|Geerda|Gela|Georg|George|Georges|Gerald|Geralde|Geraldine|Gérard|Gerardo|Gerd|Gerda|Gerdi|Gerhard|Gerlinde|Gernot|Gero|Gerold|Gerrard|Gerry|Gert|Gerta|Gertraud|Gertraude|Gertrud|Gertrude|Gerwald|Giacomo|Gila|Giovanni|Gisa|Gisbert|Gisel|Gisela|Giselbert|Giséle|Gisla|Gitta|Giuseppe|Gottfried|Gotthard|Grace|Gratian|Grazia|Greg|Gregor|Gregoria|Gregorios|Gregory|Greta|Grete|Gretel|Grigorij|Grit|Gritt|Gudela|Gudrun|Jeannetta|Jeip|Jekaterina|Jelena|Jennifer|Jens|Jerald|Jerold|Jerrard|Jerry|Jessica|Jim|Jimmy|Joachim|Joanna|Jochen|Joe|Joel|Joella|Joelle|Joellen|Joey|Johann|Johanna|Johannata|Johannes|John|Jonah|Jonas|Jonny|Jörg|Jorge|Jörgen|Jörn|Joschka|Joschua|José|Josef|Josefa|Josefine|Joseph|Josephine|Josh|Joshua|Jóska|Josua|Juan|Juana|Juanita|Judit|Judith|Juditha|Juditta|Judy|Jules|Julia|Julian|Juliana|Juliane|Julien|Julienne|Julius|Jupp|Jürgen|Juri|Juris|Jutta|Kai|Kanut|Karel|Karen|Karin|Karina|Karl|Karla|Karlheinz|Karola|Karsten|Karyn|Kata|Katalin|Katharina|Käthe|Kathinka|Kathrein|Kathrin|Katja|Katka|Katrin|Kay|Kersti|Kerstin|Kerstina|Kirsten|Kirstin|Kirsty|Klara|Klaus|Klemens|Klementine|Klodwig|Knud|Knut|Konrad|Konstantin|Konstantina|Konstantine|Kora|Korinna|Kornel|Kornelia|Kornelius|Kristian|Kristjan|Kuno|Kunz|Kurt|Kyle|Kylie|Ladewig|Lara|Larry|Lars|Laura|Laureen|Laurence|Laurene|Laurentius|Lauretta|Laurina|Laux|Lea|Leah|Leana|Leeann|Lena|Lenette|Leni|Lenka|Lennart|Lennert|Lenny|Leo|Leon|Leona|Leonard|Leonhard|Leonie|Leopold|Lex|Liam|Liana|Liane|Lianne|Liddy|Lidia|Liesbeth|Liese|Lieselotte|Lil|Lilian|Lilli|Lily|Lina|Linda|Linde|Line|Lisa|Lisamaria|Lisanne|Lise|Lisette|Lissa|Liutpold|Liz|Lodewijk|Lois|Loisl|Lora|Lorant|Lorena|Lorenz|Lorenzo|Lotar|Lothar|Lothario|Lotte|Lou|Louis|Louisa|Louise|Loy|Luca|Lucas|Luci|Lucia|Lucian|Luciana|Lucien|Lucienne|Lucilla|Lucius|Lucy|Lüder|Ludewig|Ludger|Ludwig|Luis|Luise|Lukas|Lutz|Lydia|Maddie|Madeleine|Madeline|Madison|Madlyn|Mads|Magda|Magdalena|Maggie|Maggy|Maia|Maik|Maika|Maike|Maja|Mandie|Mandy|Manfred|Manfredo|Manfried|Manoel|Manolito|Manolo|Manuel|Manuela|Manuele|Manuella|Marc|Marcel|Marcella|Marcello|Marcellus|Marco|Marcus|Marek|Maren|Maret|Maretta|Marga|Margaret|Margareta|Margaretha|Margarita|Margherita|Margit|Margitta|Margot|Margret|Margrit|Marguerite|Maria|Mariam|Marian|Marianne|Marie|Mariechen|Mariena|Marija|Marilyn|Marina|Marine|Marinus|Mario|Marion|Marit|Marita|Marius|Mark|Markus|Marla|Marlaine|Marlen|Marlene|Marlies|Marlyn|Marta|Marten|Martha|Marthe|Martin|Martina|Martine|Marty|Martyn|Mary|Marzella|Mateus|Mathes|Mathew|Mathias|Mathilde|Mathis|Matilda|Matteo|Mattes|Matthäus|Matthias|Matthieu|Matti|Matz|Maurice|Mauricio|Maurine|Maurizio|Mauro|Maurus|Max|Maxim|Maximilian|Maya|Mechthild|Meggie|Mehmet|Mel|Melanie|Melany|Melina|Melony|Mendel|Merline|Meta|Mia|Michael|Michaela|Michaele|Michail|Michel|Michelle|Mickey|Miguel|Mika|Mike|Miklos|Minkes|Miranda|Miriam|Mirjam|Mirka|Mirko|Miroslav|Miroslava|Mohammed|Mona|Monica|Monika|Monique|Moritz|Moriz|Morris|Murad|Murat|Mustafa|Nada|Nadine|Nadja|Nadjana|Nadjeschda|Nadya|Nancy|Nanna|Nannette|Natalia|Natalie|Nathalie|Neele|Nehle|Nela|Nele|Nelli|Nellie|Nelly|Nick|Nicol|Nicola|Nicolas|Nicole|Niels|Niklas|Niko|Nikolaj|Nikolas|Nikolaus|Nils|Nina|Noa|Noah|Nora|Norbert|Oda|Odila|Odilia|Odilo|Odo|Olaf|Olav|Oleg|Olga|Olivarius|Oliver|Olivia|Olivier|Olof|Olrich|Oluf|Orlando|Oscar|Oskar|Osman|Oswald|Otmar|Ott|Otte|Ottilia|Ottmar|Otto|Ottomar|Ove|Owe|Paavo|Pablo|Pal|Paola|Paolo|Pat|Patrice|Patricia|Patricius|Patrick|Patrizia|Paul|Paula|Pauleen|Paulette|Pauline|Paulo|Pawel|Pedro|Peggie|Peggy|Peter|Petra|Phil|Philipp|Philippine|Philippus|Pia|Piera|Piero|Pierre|Pius|Pjotr|Radolf|Raimo|Raimonda|Raimondo|Raimund|Raimunde|Rainald|Rainer|Rainhard|Rainhold|Ralf|Ramon|Ramona|Raoul|Raul|Ray|Raymond|Reenold|Regina|Reginald|Regine|Reimo|Reimund|Reinar|Reinard|Reiner|Reinhard|Reinhart|Reinhold|Reinold|Renald|Renata|Renate|Renato|Renatus|René|Resi|Reynold|Ricardo|Richard|Richie|Rick|Ricky|Rinaldo|Rita|Robert|Roberto|Rodolfo|Roger|Rolan|Roland|Rolando|Rolf|Romain|Romaine|Roman|Romana|Romano|Romanus|Romi|Romy|Ronald|Ronette|Ronna|Ronnie|Ronny|Rosa|Rosemaria|Rosemarie|Rosemary|Rosemie|Rosimarie|Rosmarie|Roswitha|Rotger|Ruby|Rüdeger|Rudi|Rüdiger|Rudolf|Rudolph|Ruggero|Ruggiero|Rupert|Ruprecht|Rut|Rütger|Ruth|Sabina|Sabine|Sabreena|Sabrina|Sahra|Salvador|Salvator|Salvatore|Sam|Samantha|Sammy|Samuel|Sander|Sandra|Sandrina|Sandy|Sara|Sarah|Sascha|Sasha|Savina|Schorsch|Schura|Sebastian|Sebastiano|Sébastien|Sepp|Serge|Sergej|Sergio|Sergius|Sibilla|Sibille|Sibyl|Sibylla|Sibylle|Siegbert|Siegesmund|Siegfried|Sieglinde|Siegmar|Siegmund|Siegrid|Siemon|Siggi|Sigmar|Sigrid|Silja|Silka|Silke|Silvia|Silvio|Silvius|Simeon|Simo|Simon|Simone|Sofia|Solveig|Solveigh|Solvej|Solvey|Sonia|Sonja|Sonya|Sophia|Sophie|Stefan|Stefanie|Stefano|Steffen|Steffi|Stephan|Stephanie|Stephen|Steve|Steven|Stoffel|Stoffer|Susa|Susan|Susanna|Susanne|Susi|Suzy|Sven|Svend|Swen|Sybille|Sylke|Sylvia|Tamar|Tamara|Tania|Tanija|Tanja|Tanya|Tatius|Tatjana|Ted|Terena|Teresa|Terina|Terrence|Terrie|Terry|Tess|Tessa|Tessie|Tewes|Thea|Theo|Theodor|Theodora|Theodore|Thera|Theresa|Therese|Theresia|Thies|Thietmar|Thijs|Thilo|Thomas|Thorstein|Thorsten|Till|Tilo|Tim|Timmy|Timo|Timothea|Timotheus|Timothy|Tina|Tino|Tobia|Tobias|Tobit|Toby|Tom|Tomasz|Tomek|Tommaso|Tommi|Tommy|Toni|Tönnies|Torsten|Tracy|Traude|Traudel|Trischa|Trish|Trude|Udo|Ulf|Uli|Ulin|Ulla|Ulli|Ullrich|Ulrica|Ulrich|Ulrico|Ulrik|Ulrike|Ulv|Ursel|Ursi|Ursula|Uschi|Uta|Ute|Uthman|Uve|Uwe|Valentin|Valentina|Valentine|Valentino|Valentinus|Valtin|Veit|Vera|Verena|Verica|Verona|Veronica|Veronika|Veronique|Victor|Victoria|Victorio|Viet|Viktor|Viktoria|Viktorio|Vince|Vincent|Vincenz|Vincenzo|Vinzent|Vinzenz|Viola|Violet|Violetta|Violette|Vittorio|Vitus|Vlad|Vladimir|Volker|Volkmar|Waldemar|Walli|Walter|Walther|Waltraud|Warwara|Wastl|Werner|Wido|Widukind|Wilfred|Wilfried|Wilhelm|Wilhelma|Wilhelmina|Wilhelmine|Willi|William|Willibald|Willie|Willy|Wilm|Wilma|Wim|Winfried|Wlad|Wladimir|Woldemar|Wolf|Wolfgang|Wolfram|Wolter|Xander|Xaver|Xaveria|Xaverius|Xavier|Xaviera|Yanek|Yannek|Yannick|Yannicka|Yannig|Yannika|Yasemin|Yusuf|Yvon|Yvonne|Zarah|Sören|Helge|Sönke|Heinz|Aaron|Malte)(| )([.\?!]|$)/gi;
        if(input==null)return "null";
        return input.replace(name_regex, ", Bernd")
    }
    apply_RegexActions=function(){
        if(localStorage.getItem('removeNameInsults')=='true'){
            jQuery('blockquote>p:not(.insultsRemoved)').each(function(){
                jQuery(this).html(removeInsults(jQuery(this).html()));
            }).addClass('insultsRemoved');
        }
        if(localStorage.getItem('removeWordfilter')=='true'){
            jQuery('blockquote>p:not(.unfiltered)').each(function(){
                jQuery(this).html(removeWordfilter(jQuery(this).html()));
            }).addClass('unfiltered');
        }
    }

	kc_position=function(next)
	{
		var ts = jQuery('.postreply');
		for(var k=1; k<ts.length; k++)
		{
			if(jQuery(ts[k]).offset().top > jQuery(window).scrollTop() && jQuery(window).scrollTop() > 100)
			{
				if(jQuery(ts[k]).offset().top-jQuery(window).scrollTop() > 500 && typeof next == 'undefined') k = k-1;
				return new Array(jQuery(ts[k]), (jQuery(ts[k]).offset().top-jQuery(window).scrollTop()));
			}
		}
	}

	kc_correct=function(val)
	{
		if(typeof val != 'object' || val[0]==false || jQuery(val[0]).length == 0) return;
		var targett = jQuery(window).scrollTop()+Math.round(jQuery(val[0]).offset().top-jQuery(window).scrollTop()-val[1]);
		//// jQuery(window).scrollTop(targett);
		if(jQuery('#kc_post').css('position') == 'absolute')
			jQuery('#kc_post').hide();
	}

	kc_open_close=function()
	{
		jQuery('.postreply,.postreply_highlighted,.thread').each(function(){
			jQuery(this).find('.postheader img').remove();
			jQuery(this).find('.kc_open_close').remove();
			jQuery(this).find('.postsubject').before('<img class="kc_open_close" src="/images/button-close.gif" style="margin:0 5px 0 0;cursor:pointer" />');

			if(localStorage.getItem('hiddenPosts') != null)
				var hposts = localStorage.getItem('hiddenPosts').split('|||');
			else
				var hposts = [''];

			var id = jQuery(this).attr('id');
			if(hposts.indexOf(id) != -1)
			{
				jQuery('#'+id+'>div:not(.postheader)').hide();
				if(id.substr(0,6) == 'thread')
				{
					jQuery('#'+id+' .omittedinfo, #'+id+' table, #'+id+' .all, #'+id+' .inline, #'+id+' .expandAll, #'+id+' .kc_reply, #'+id+' .kc_nreply').hide();
				}
				jQuery('#'+id+' .kc_open_close').attr('src', '/images/button-open.gif');
			}
		});
	}
	
	jQuery('div:nth(2):contains("RSS")').prepend('[<a id="kc_settings" href="#">'+kc_lang('Einstellungen')+'</a>] ');

	if(localStorage.getItem('showSearch')=='true')
		jQuery('div:nth(2):contains("RSS")').append('<br /><input type="text" id="kc_search" placeholder="'+kc_lang('filtern')+'" style="position:absolute;" title="Gib den Begriff oder die Phrase an, die Du sehen möchtest. Du kannst dies umkehren, indem Du die Suche mit ! startest, also !pony" />');

	if(localStorage.getItem('removeRadio')=='true')
		jQuery('div:nth(5):contains("Radio")').remove();

	var goldaccount = '';
	if(localStorage.getItem('showGoldP') == 'true') {
		goldaccount = '<label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;"><input type="checkbox" id="kc_showGoldP" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Goldaccount löschen')+'</label>'
	}

	jQuery('#kc_settings').toggle(function(){
		jQuery(this).parent().next().after('\
        <div id="kc_change_settings" style="display:none;clear:both;border:1px solid #444;color:#444;margin:30px 0;">\
            <h2 style="height:30px;line-height:30px;padding:0 10px;">\
                <span style="float:right">\
                <label><input id="kc_language1" type="radio" name="language" val="de" /> deutsch</label>\
                <label><input id="kc_language2" type="radio" name="language" val="en" /> englisch</label></span>\
                Krautchan '+kc_lang('Einstellungen')+'\
            </h2>\
            <div style="display:block;float:left;width:31%;padding:10px;">\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                <input type="checkbox" id="kc_showQuotes" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Zitate bei Mouseover anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_showQuotesInline" style="position:absolute;margin:0 0 0 -40px;" /> - '+kc_lang('Zitate einfügen bei Klick')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="text" id="kc_delay" style="position:absolute;margin:0 0 0 -40px;width:30px;" /> - '+kc_lang('Verzögerung bei Einblendung')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="text" id="kc_shadow" style="position:absolute;margin:0 0 0 -40px;width:30px;" /> - '+kc_lang('Schatten (z.B. 10px)')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="text" id="kc_borderRadius" style="position:absolute;margin:0 0 0 -40px;width:30px;" /> - '+kc_lang('Rundung der Ecken (z.B. 5px)')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="text" id="kc_zipThreshold" style="position:absolute;margin:0 0 0 -40px;width:30px;" /> - '+kc_lang('Anti-Spam Threshold')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="text" id="kc_fadeDelay" style="position:absolute;margin:0 0 0 -40px;width:30px;" /> - '+kc_lang('Dauer der Animation')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_showReplies" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Antworten anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="password" id="kc_autoPassword" style="position:absolute;margin:0 0 0 -40px;width:30px;" /> '+kc_lang('Passwort automatisch setzen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_convertLinks" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Links automatisch umwandeln')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_ytEmbed" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Youtube Videos einblenden')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_ytEmbedSmall" style="position:absolute;margin:0 0 0 -40px;" /> - '+kc_lang('Youtube Videos minimieren')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_fixWidth" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Antworten auf voller Breite anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_fadeAutosage" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Autosäge blasser anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_krautzip" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Krautzip (Spamkontrolle) benutzen')+'\
                </label>\
                '+goldaccount+'</div><div style="display:block;float:left;width:31%;padding:10px;"><label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_showImages" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Bilder direkt anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_verticalAlign" style="position:absolute;margin:0 0 0 -40px;" /> - '+kc_lang('Bilder vertikal zentrieren')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_jumpToImage" style="position:absolute;margin:0 0 0 -40px;" /> - '+kc_lang('Zu geöffnetem Bild springen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_expandAll" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Thumbnails/Bilder pro Thread umschalten')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_allLinks" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Linkübersicht anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_showGifs" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Animierte Gifs automatisch laden')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_showSpoiler" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Spoiler immer anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_showSearch" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Suchfeld anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_removeShiPainter" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Shi Painter entfernen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_removeRadio" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Radio entfernen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_hidePostform" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Postformular ausblenden')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_smallThumbs" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('kleine Vorschaubilder')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_removeNameInsults" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Namensbeleidigungen entfernen')+'\
                </label>\
            </div>\
            <div style="display:block;float:left;width:31%;padding:10px;">\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_loadNextPage" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Nächste Seite automatisch laden')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_removePagesOnTop" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Geladene Seite automatisch entfernen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_viewInline" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Beiträge in Übersicht aktualisieren')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_quickReply" style="position:absolute;margin:0 0 0 -40px;" /> - '+kc_lang('Schnellantwort anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_showBigform" style="position:absolute;margin:0 0 0 -40px;" /> - - '+kc_lang('Immer großes Formular anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_normalReply" style="position:absolute;margin:0 0 0 -40px;" /> - '+kc_lang('Antwortlink anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_newThreads" style="position:absolute;margin:0 0 0 -40px;" /> '+kc_lang('Nach neuen Themen suchen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_showNewThreads" style="position:absolute;margin:0 0 0 -40px;" /> - '+kc_lang('Neue Themen sofort anzeigen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_newPostings" style="position:absolute;margin:0 0 0 -40px;" /> - '+kc_lang('Nach neuen Beiträgen suchen')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_newPostingsPage" style="position:absolute;margin:0 0 0 -40px;" /> - - '+kc_lang('Auf Einzelseiten autmatisch laden')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_moveNewPostings" style="position:absolute;margin:0 0 0 -40px;" /> - - '+kc_lang('Themen nach oben verschieben')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_replaceOpenClose" style="position:absolute;margin:0 0 0 -40px;" />'+kc_lang('Themen/Beiträge ausblenden')+'\
                </label>\
                <label style="display:block;height:30px;line-height:15px;padding:0 0 0 45px;">\
                    <input type="checkbox" id="kc_removeWordfilter" style="position:absolute;margin:0 0 0 -40px;" />'+kc_lang('Wortfilter entfernen')+'\
                </label>\
                <label style="display:block;height:30px;padding:0 0 0 45px;text-align:right;"><a href="http://userscripts.org/scripts/show/98624">HP</a> \
                    <input id="kc_submit_settings" type="button" value="'+kc_lang('Einstellungen übernehmen')+'" />\
                </label>\
            </div>\
            <div style="clear:both;"></div>\
        </div>');

		if(localStorage.getItem('showQuotes')=='true')
			jQuery('#kc_showQuotes').attr('checked', true);

		if(localStorage.getItem('showQuotes')=='true' && localStorage.getItem('showQuotesInline')=='true')
			jQuery('#kc_showQuotesInline').attr('checked', true);

		if(localStorage.getItem('showReplies')=='true')
			jQuery('#kc_showReplies').attr('checked', true);

		if(localStorage.getItem('showImages')=='true')
			jQuery('#kc_showImages').attr('checked', true);
		
		if(localStorage.getItem('showImages')=='true' && localStorage.getItem('jumpToImage')=='true')
			jQuery('#kc_jumpToImage').attr('checked', true);
		
		if(localStorage.getItem('showImages')=='true' && localStorage.getItem('verticalAlign')=='true')
			jQuery('#kc_verticalAlign').attr('checked', true);

		if(localStorage.getItem('expandAll')=='true')
			jQuery('#kc_expandAll').attr('checked', true);
		
		if(localStorage.getItem('showGifs')=='true')
			jQuery('#kc_showGifs').attr('checked', true);

		if(localStorage.getItem('loadNextPage')=='true')
			jQuery('#kc_loadNextPage').attr('checked', true);

		if(localStorage.getItem('removePagesOnTop')=='true')
			jQuery('#kc_removePagesOnTop').attr('checked', true);

		if(localStorage.getItem('showSpoiler')=='true')
			jQuery('#kc_showSpoiler').attr('checked', true);

		if(localStorage.getItem('convertLinks')=='true')
			jQuery('#kc_convertLinks').attr('checked', true);

		if(localStorage.getItem('ytEmbed')=='true')
			jQuery('#kc_ytEmbed').attr('checked', true);

		if(localStorage.getItem('ytEmbed')=='true' && localStorage.getItem('ytEmbedSmall')=='true')
			jQuery('#kc_ytEmbedSmall').attr('checked', true);

		if(localStorage.getItem('viewInline')=='true')
			jQuery('#kc_viewInline').attr('checked', true);

		if(localStorage.getItem('viewInline')=='true' && localStorage.getItem('quickReply')=='true')
			jQuery('#kc_quickReply').attr('checked', true);

		if(localStorage.getItem('viewInline')=='true' && localStorage.getItem('quickReply')=='true' && localStorage.getItem('showBigform')=='true')
			jQuery('#kc_showBigform').attr('checked', true);

		if(localStorage.getItem('viewInline')=='true' && localStorage.getItem('normalReply')=='true')
			jQuery('#kc_normalReply').attr('checked', true);

		if(localStorage.getItem('allLinks')=='true')
			jQuery('#kc_allLinks').attr('checked', true);

		if(localStorage.getItem('removeShiPainter')=='true')
			jQuery('#kc_removeShiPainter').attr('checked', true);
		
		if(localStorage.getItem('removeRadio')=='true')
			jQuery('#kc_removeRadio').attr('checked', true);

		if(localStorage.getItem('hidePostform')=='true')
			jQuery('#kc_hidePostform').attr('checked', true);

		if(localStorage.getItem('smallThumbs')=='true')
			jQuery('#kc_smallThumbs').attr('checked', true);

		if(localStorage.getItem('removeNameInsults')=='true')
			jQuery('#kc_removeNameInsults').attr('checked', true);

		if(localStorage.getItem('showSearch')=='true')
			jQuery('#kc_showSearch').attr('checked', true);

		if(localStorage.getItem('newThreads')=='true')
			jQuery('#kc_newThreads').attr('checked', true);

		if(localStorage.getItem('newThreads')=='true' && localStorage.getItem('showNewThreads')=='true')
			jQuery('#kc_showNewThreads').attr('checked', true);
		
		if(localStorage.getItem('newThreads')=='true' && localStorage.getItem('newPostings')=='true')
			jQuery('#kc_newPostings').attr('checked', true);

		if(localStorage.getItem('newThreads')=='true' && localStorage.getItem('newPostings')=='true' && localStorage.getItem('moveNewPostings')=='true')
			jQuery('#kc_moveNewPostings').attr('checked', true);

		if(localStorage.getItem('newThreads')=='true' && localStorage.getItem('newPostings')=='true' && localStorage.getItem('newPostingsPage')=='true')
			jQuery('#kc_newPostingsPage').attr('checked', true);

		if(localStorage.getItem('krautzip')=='true')
			jQuery('#kc_krautzip').attr('checked', true);
			
		if(localStorage.getItem('fadeAutosage')=='true')
			jQuery('#kc_fadeAutosage').attr('checked', true);

		if(localStorage.getItem('fixWidth')=='true')
			jQuery('#kc_fixWidth').attr('checked', true);

		if(localStorage.getItem('replaceOpenClose')=='true')
			jQuery('#kc_replaceOpenClose').attr('checked', true);

		if(localStorage.getItem('removeWordfilter')=='true')
			jQuery('#kc_removeWordfilter').attr('checked', true);

		if(localStorage.getItem('showGoldP')=='true')
			jQuery('#kc_showGoldP').attr('checked', true);

		if(localStorage.getItem('language')=='en')
			jQuery('#kc_language2').attr('checked', true);
		else
			jQuery('#kc_language1').attr('checked', true);

		jQuery('#kc_submit_settings').click(function(){
			window.location.reload();
		});

		jQuery('#kc_delay').val(localStorage.getItem('delay'));
		jQuery('#kc_shadow').val(localStorage.getItem('shadow'));
		jQuery('#kc_borderRadius').val(localStorage.getItem('borderRadius'));
		jQuery('#kc_zipThreshold').val(localStorage.getItem('zipThreshold'));
		jQuery('#kc_fadeDelay').val(parseInt(localStorage.getItem('fadeDelay')));
		jQuery('#kc_autoPassword').val(localStorage.getItem('autoPassword'));

		jQuery('#kc_change_settings input').bind("change keyup keypress", function(){
			var id=jQuery(this).attr('id').replace(/kc_/, '');

			if(jQuery(this).is(':checkbox') && jQuery(this).is(':checked'))
				var val=true;
			else if(jQuery(this).is(':checkbox'))
				var val=false;
			else if(jQuery(this).is('#kc_language1'))
			{
				var id='language';
				var val='de';
			}
			else if(jQuery(this).is('#kc_language2'))
			{
				var id='language';
				var val='en';
			}
			else
				var val=jQuery(this).val();

			localStorage.removeItem(id);
			localStorage.setItem(id, val);
		});
		jQuery('#kc_change_settings').fadeIn(parseInt(localStorage.getItem('fadeDelay')));
	}, function(){
		jQuery('#kc_change_settings').fadeOut(parseInt(localStorage.getItem('fadeDelay')), function(){
			jQuery(this).remove();
		});
	});

	if(localStorage.getItem('showQuotes') == 'true')
	{
		jQuery('body').mousemove(function(e){
			jQuery('#kc_post').css({"left":(e.pageX+10)+"px","top":(e.pageY-10-jQuery('#kc_post').height())+"px"});

			if(e.pageY-10-jQuery('#kc_post').height()-jQuery(document).scrollTop() < 0)
			{
				jQuery('#kc_post').css({"top":(e.pageY+10)+"px"});
			}
			jQuery('body').css({"overflow-x":"hidden"});
			if(jQuery('#kc_post').width()+e.pageX+10 > jQuery('body').width())
			{
				jQuery('#kc_post').css({"left":(e.pageX-10-jQuery('#kc_post').width())+"px"});
			}
		});
		jQuery('blockquote>p>a').each(function(){
			var id = jQuery(this).attr('href').split('#')[1];

			if(jQuery(this).parents('#thread_'+id).length>0)
				jQuery(this).append(' (OP)');

			else if(jQuery(this).attr('href').indexOf('resolve') > 0)
				jQuery(this).append(' (Duckroll?)');
		});
		if(localStorage.getItem('showQuotesInline') == 'true')
			var actions = "mouseover click dblclick";
		else
			var actions = "mouseover";
		jQuery('blockquote>p a:not(.kc_allowhtml), .replies a').live(actions,function(e){
            s=localStorage.getItem("shadow");
            r=localStorage.getItem("borderRadius");
			if(jQuery('#kc_post').length == 0) jQuery('body').append('<div class="postreply" id="kc_post" style="border:1px solid #666;position:absolute;top:0;left:0;max-width:60%;-moz-box-shadow:0 0 '+s+' #000;-webkit-box-shadow:0 0 '+s+' #000;box-shadow:0 0 '+s+' #000;-moz-border-radius:'+r+';-webkit-border-radius:'+r+';border-radius:'+r+';display:none;"></div>');

			var fixed,stop = false;
			if((jQuery(this).attr('href').indexOf('/') != 0 && jQuery(this).attr('href').indexOf('#') != 0) || jQuery(this).is('.kc_newPass'))
				return;

			if(e.type == 'click')
			{
				fixed = jQuery(this).attr('href').split('#')[1];
				if(jQuery('#kc_post').css('position') == 'absolute')
				{
					jQuery(this).addClass('opened').append(kc_lang('<span> ('+kc_lang('Klick hier, um die Zitate zu lösen')+')</span>'));
					jQuery(this).css({'clear':'both'}).after(jQuery('#kc_post').css({'max-width':'99999px','width':'100%','margin':'10px 0','position':'static','float':'left'}));
				}
				else if(jQuery(this).is('.opened') || jQuery(this).parents('[id$='+fixed+']').length > 0)
				{
					jQuery('.opened').removeClass('opened').find('span').remove();
					jQuery(this).css({'clear':'none'});
					jQuery('#kc_post').css({'max-width':'60%','width':'auto','position':'absolute','float':'left','clear':'none','margin':'0'}).hide();
					var stop = true;
					var fixed = false;
				}
			}
			if(e.type == 'dblclick')
			{
				jQuery('.opened').css({'clear':'none'}).removeClass('opened').find('span').remove();
				jQuery('#kc_post').css({'max-width':'60%','width':'auto','position':'absolute','float':'left','clear':'none','margin':'0'}).hide();
				var stop = true;
				var fixed = false;
			}
			if(fixed == false) jQuery('.kc_youtube>iframe').stop(true).fadeOut(parseInt(localStorage.getItem('fadeDelay')));
			if(jQuery('#kc_post').css('position') != 'absolute' && e.type == 'mouseover' || stop == true)
			{
				e.preventDefault();
				return;
			}
			jQuery('#kc_post').empty();
			if(jQuery(this).attr('href')[0]=='#')
			{
				var id = jQuery(this).attr('href').split('#')[1];
				if(jQuery('#post-'+id).length > 0)
				{
					jQuery('#kc_post').html(jQuery('#post-'+id).html()).show().stop(true).delay(localStorage.getItem('delay')).fadeTo(parseInt(localStorage.getItem('fadeDelay')), .97);
				}
				else if(jQuery('#thread_'+id).length > 0)
				{
					var sec = jQuery(this).parents('.thread').find('.file_thread:nth(1)').length > 0 ? '<div class="file_thread">'+jQuery(this).parents('.thread').find('.file_thread:nth(1)').html()+'</div>' : '';
					var tri = jQuery(this).parents('.thread').find('.file_thread:nth(2)').length > 0 ? '<div class="file_thread">'+jQuery(this).parents('.thread').find('.file_thread:nth(2)').html()+'</div>' : '';
					var quad = jQuery(this).parents('.thread').find('.file_thread:nth(3)').length > 0 ? '<div class="file_thread">'+jQuery(this).parents('.thread').find('.file_thread:nth(3)').html()+'</div>' : '';
					jQuery('#kc_post').html('<div style="float:left;padding:10px;">'+'<div class="file_thread">'+jQuery(this).parents('.thread').find('.file_thread:first').html()+'</div>'+sec+tri+quad+'</div>'+jQuery(this).parents('.thread').find('.postbody').html()).show().stop(true).delay(localStorage.getItem('delay')).fadeTo(parseInt(localStorage.getItem('fadeDelay')), .97);
				}
				else
				{
					jQuery('#kc_post').html('<h1 style="padding:10px;">Wird geladen!</h1>').show().stop(true).delay(localStorage.getItem('delay')).fadeTo(parseInt(localStorage.getItem('fadeDelay')), .97);
					var url = 'http://krautchan.net/resolve/'+window.location.href.split('/')[3]+'/'+jQuery(this).attr('href').split('#')[1];
					var id = window.location.href.split('#')[1];
					if(typeof id == "undefined") id = url.split('/')[5];
					jQuery.ajax({
						url: url.split('#')[0],
						cache:false,
						success: function(data) {
							jQuery('#kc_post').html(jQuery('#post-'+id+',#thread_'+id, data).html());
							if(jQuery('#kc_post').html()=='') jQuery('#kc_post').html('<h1>Beitrag nicht gefunden</h1>');
						}
					});
				}
			}
			else if(jQuery(this).attr('href')[0]=='/')
			{
				jQuery('#kc_post').html('<h1 style="padding:10px;">Wird geladen!</h1>').show().stop(true).delay(localStorage.getItem('delay')).fadeTo(parseInt(localStorage.getItem('fadeDelay')), .97);
				var url = 'http://krautchan.net'+jQuery(this).attr('href');
				var id = url.split('#')[1];
				if(typeof id == "undefined") id = url.split('/')[5];
				jQuery.ajax({
					url: url.split('#')[0],
					cache:false,
					success: function(data) {
						jQuery('#kc_post').html(jQuery('#post-'+id+',#thread_'+id, data).html());
 						if(jQuery('#kc_post').html()=='') jQuery('#kc_post').html('<h1>Beitrag nicht gefunden</h1>');
					}
				});
			}
			if(localStorage.getItem('showGifs') == 'true') kc_show_gifs();
			if(localStorage.getItem('smallThumbs') == 'true') kc_smallThumbs();
			if(localStorage.getItem('ytEmbed') == 'true') kc_youtubify();
			if(localStorage.getItem('convertLinks') == 'true') kc_linkify();
			if(localStorage.getItem('showQuotes') == 'true') kc_quoteInfo();
			if(localStorage.getItem('showReplies')=='true') kc_show_replies();
			if(localStorage.getItem('showSpoiler') == 'true') jQuery('#kc_post .spoiler').css({"color":"#ccc"});
			e.preventDefault();
		}).live("mouseout",function(e){
			if(jQuery('#kc_post').css('position') == 'absolute')
			{
				jQuery('#kc_post').stop(true).fadeTo(parseInt(localStorage.getItem('fadeDelay')), 0, function(){jQuery(this).hide();});
				jQuery('.kc_youtube>iframe').stop(true).fadeIn(parseInt(localStorage.getItem('fadeDelay')));
			}
		});
	}

	if(localStorage.getItem('showImages') == 'true')
	{
		if(localStorage.getItem('verticalAlign') == 'true' && !jQuery.browser.mozilla && !jQuery.browser.opera)
		{
			window.setInterval(function(){
				jQuery('#kc_overlay_img').animate({'margin-top':Math.round((jQuery('#kc_overlay').height()-jQuery('#kc_overlay_img').height()-Math.round(jQuery('#kc_overlay').height()/100*2))/2)+'px'}, 200);
			}, 200);
		}
		else if(localStorage.getItem('verticalAlign') == 'true')
		{
			window.setInterval(function(){
				jQuery('#kc_overlay_img').css({'margin-top':Math.round((jQuery('#kc_overlay').height()-jQuery('#kc_overlay_img').height()-Math.round(jQuery('#kc_overlay').height()/100*2))/2)+'px'});
			}, 200);
		}

		jQuery('img[id^=thumbnail_]').live("click",function(e){
			var fileid = jQuery(this).attr('id').replace('thumbnail_', 'filename_');
			var filename = jQuery('#'+fileid).html();

			if(localStorage.getItem('jumpToImage') == 'true')
				window.location.hash = fileid.replace('filename_', 'button_expand_image_');

			jQuery('.kc_youtube>iframe').fadeOut(parseInt(localStorage.getItem('fadeDelay')));
			jQuery('body').append('<div id="kc_overlay" style="background:rgba(0,0,0,.75);text-align:center;padding:1% 1% 3% 1%;height:96%;width:98%;position:fixed;top:0;left:0;"><div style="background:rgba(255,255,255,.9);border:1px slid red;padding:5px;color:#444;position:absolute;bottom:20px;left:50%;text-align:center;width:450px;margin:0 0 0 -225px;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;">'+kc_lang('Pfeil links <= Ein Bild zurück')+' | <span id="kc_img_count"></span> | '+kc_lang('Ein Bild vor => Pfeil rechts')+'</div><img src="http://krautchan.net'+jQuery(this).parent().attr('href').replace('/files/', '/download/')+'/'+filename+'" id="kc_overlay_img" style="background:#fff;padding:1px;border:1px solid #000;max-width:98%;max-height:96%;" /></div>');

			var url = jQuery('#kc_overlay_img').attr('src');
			var imgs = jQuery('img[id^=thumbnail_]:visible');
			for(var i=0; i<imgs.length; i++)
			{
				if(url == 'http://krautchan.net'+jQuery(imgs[i]).parent().attr('href').replace('/files/', '/download/')+'/'+filename)
				{
					var imgc = i+1;
					jQuery('#kc_img_count').html(kc_lang('Bild')+' '+imgc+' '+kc_lang('von')+' '+imgs.length);
				}
			}

			jQuery(window).bind("keyup", function (e) {
				var url = jQuery('#kc_overlay_img').attr('src');
				var imgs = jQuery('img[id^=thumbnail_]:visible');
				for(var i=0; i<imgs.length; i++)
				{
					var fileid = jQuery(imgs[i]).attr('id').replace('thumbnail_', 'filename_');
					var filename = jQuery('#'+fileid).html();

					if(e.keyCode == 37 && url == 'http://krautchan.net'+jQuery(imgs[i]).parent().attr('href').replace('/files/', '/download/')+'/'+filename && imgs[(i-1)])
					{
						var fileid = jQuery(imgs[(i-1)]).attr('id').replace('thumbnail_', 'filename_');
						var filename = jQuery('#'+fileid).html();
						jQuery('#kc_img_count').html(kc_lang('Bild')+' '+i+' '+kc_lang('von')+' '+imgs.length);
						if(localStorage.getItem('jumpToImage') == 'true') window.location.hash = fileid.replace('filename_', 'button_expand_image_');
						jQuery('#kc_overlay_img').remove();
						jQuery('#kc_overlay').append('<img src="http://krautchan.net'+jQuery(imgs[(i-1)]).parent().attr('href').replace('/files/', '/download/')+'/'+filename+'" id="kc_overlay_img" style="background:#fff;padding:1px;border:1px solid #000;max-width:98%;max-height:96%;" />');
						break;
					}
					else if((e.keyCode == 39 || e.keyCode == 32) && url == 'http://krautchan.net'+jQuery(imgs[i]).parent().attr('href').replace('/files/', '/download/')+'/'+filename && imgs[(i+1)])
					{
						var fileid = jQuery(imgs[(i+1)]).attr('id').replace('thumbnail_', 'filename_');
						var filename = jQuery('#'+fileid).html();
						var imgc = i+2;
						jQuery('#kc_img_count').html(kc_lang('Bild')+' '+imgc+' '+kc_lang('von')+' '+imgs.length);
						if(localStorage.getItem('jumpToImage') == 'true') window.location.hash = fileid.replace('filename_', 'button_expand_image_');
						jQuery('#kc_overlay_img').remove();
						jQuery('#kc_overlay').append('<img src="http://krautchan.net'+jQuery(imgs[(i+1)]).parent().attr('href').replace('/files/', '/download/')+'/'+filename+'" id="kc_overlay_img" style="background:#fff;padding:1px;border:1px solid #000;max-width:98%;max-height:96%;" />');
						break;
					}
					else if(e.keyCode == 13)
					{
						jQuery('#kc_overlay').remove();
						break;
					}
				}
			});
			e.preventDefault();
		});
		jQuery('#kc_overlay_img').live("click", function(e){
			e.stopPropagation();
		});
		jQuery('#kc_overlay').live("click", function(e){
			if(localStorage.getItem('jumpToImage') == 'true') window.location.hash='_closed';
			jQuery('.kc_youtube>iframe').fadeIn(parseInt(localStorage.getItem('fadeDelay')));
			jQuery(this).remove();
			jQuery(window).unbind("keyup");
			e.preventDefault();
		});
	}

	if(localStorage.getItem('autoPassword') != '')
	{
		jQuery('input[type=password]').val(localStorage.getItem('autoPassword'));
	}

	if(localStorage.getItem('showGifs') == 'true') kc_show_gifs();

	if(localStorage.getItem('loadNextPage') == 'true' && window.location.href.split('#')[0].substr(-1) == '/')
	{
		jQuery('.thread').addClass('page0');
		var page=1;
		var last = false;
		jQuery(window).scroll(function(){
			if (localStorage.getItem('removePagesOnTop') == 'true' && jQuery(window).scrollTop() == '0')
			{
				window.setTimeout(function(){
					if(jQuery(window).scrollTop() == '0')
					{
						jQuery('.page1,.page2,.page3,.page4,.page5,.page6,.page7,.page8,.page9').remove();
						page=1;
						last=false;
					}
				}, 10000);
			}
			if (jQuery(window).scrollTop() == jQuery(document).height()-jQuery(window).height() && last != page && page<10)
			{
				var ids=[];
				jQuery('.thread').each(function(){
					ids.push(jQuery(this).attr('id').split('_')[1]);
				});
				last=page;
				jQuery('.thread:last').after('<h1 style="clear:both;float:none;text-align:center;" id="loading">Lade nächste Seite</h1>');
				jQuery.ajax({
					url: window.location.href.split('#')[0]+page+'.html',
					cache:false,
					success: function(data) {
						var threads = jQuery('.thread', data);
						for(var j=0; j<threads.length; j++)
						{
							var id = jQuery(threads[j]).attr('id').split('_')[1];
							if(ids.toString().indexOf(id) < 0)
							{
								jQuery('.thread:last').after('<div class="thread page'+page+'" style="clear:both" id="thread_'+id+'">'+jQuery(threads[j]).html()+'</div>');
							}
						}
						var x = parseInt(page)+1;
						jQuery('.page'+page+':first').before('<h1 class="page'+page+'">Seite '+x+'</h1>');
						jQuery('#loading').remove();
                        apply_RegexActions();
						if(localStorage.getItem('krautzip')=='true')
						{
							jQuery('blockquote>p:not(.krautzip)').each(function(){
								jQuery(this).html(krautzip(jQuery(this).html()));
							}).addClass('krautzip');
						}
						if(localStorage.getItem('showSpoiler') == 'true') jQuery('.spoiler').css({"color":"#ccc"});
						if(localStorage.getItem('fadeAutosage') == 'true') kc_sage();
						if(localStorage.getItem('smallThumbs') == 'true') kc_smallThumbs();
						if(localStorage.getItem('fixWidth') == 'true') kc_fixWidth();
						if(localStorage.getItem('showGifs') == 'true') kc_show_gifs();
						if(localStorage.getItem('ytEmbed') == 'true') kc_youtubify();
						if(localStorage.getItem('convertLinks') == 'true') kc_linkify();
						if(localStorage.getItem('showQuotes') == 'true') kc_quoteInfo();
						if(localStorage.getItem('showReplies')=='true') kc_show_replies();
						if(localStorage.getItem('viewInline') == 'true') {
							jQuery('.inline').remove();
							jQuery('.thread').each(function(){
								var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
								jQuery(this).find('.omittedinfo').after(' <span class="inline">[<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>]</span>');
								jQuery(this).append(' <span class="inline">>> [<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>] [<a href="#n'+id+'">'+kc_lang('Nur neue Beiträge anzeigen')+'</a>] [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span> ');

								if(localStorage.getItem('quickReply') == 'true' && jQuery(this).find('.kc_reply').length == 0)
								{
									jQuery('#thread_'+id+' .kc_reply','#thread_'+id+' .kc_nreply').remove();
									jQuery('#thread_'+id+' .postnumber').each(function(){
										var hash = jQuery(this).parent().parent().attr('id').split('-')[1];
										if(typeof hash == 'undefined') hash = id;
										if(localStorage.getItem('quickReply') == 'true') {
											if(typeof hash == 'undefined') hash = id;
											jQuery(this).after(' <span class="kc_reply">[<a href="'+window.location.href.split('#')[0]+'thread-'+id+'.html#q'+hash+'_quick">'+kc_lang('Schnellantwort')+'</a>]</span>');
										}
										if(localStorage.getItem('normalReply') == 'true' && jQuery(this).parent().is(':not(:contains("Antworten"))')) {
											jQuery(this).after(' <span class="kc_nreply">[<a href="'+window.location.href.split('#')[0]+'thread-'+id+'.html#q'+hash+'">'+kc_lang('Antworten')+'</a>]</span>');
										}
									});
								}
							});
						}
						if(localStorage.getItem('expandAll') == 'true')
						{
							jQuery('.expandAll').remove();
							jQuery('.thread').each(function(){
								var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
								jQuery('#thread_'+id+' .postnumber:first').after(' <span class="expandAll">[<a href="#'+id+'">'+kc_lang('Thumbnails/Bilder')+'</a>]</span> ');
							});
						}
						if(localStorage.getItem('allLinks') == 'true')
						{
							jQuery('.thread').each(function(){
								var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
								if(jQuery(this).find('.all').length==0)
									jQuery('#thread_'+id+' .postnumber:first').after(' <span class="all">[<a href="#'+id+'">'+kc_lang('Dateiliste')+'</a>]</span> ');
								else
									jQuery('#thread_'+id+' .all').html(' <span class="all">[<a href="#'+id+'">'+kc_lang('Dateiliste')+'</a>]</span> ');
							});
						}
						if(localStorage.getItem('replaceOpenClose') == 'true') kc_open_close();
						else hideThreads();
						page++;
					}
				});
			}
		});
	}

	if(localStorage.getItem('showSpoiler') == 'true') jQuery('.spoiler').css({"color":"#ccc"});
	if(localStorage.getItem('fadeAutosage') == 'true') kc_sage();
	if(localStorage.getItem('smallThumbs') == 'true') kc_smallThumbs();
	if(localStorage.getItem('fixWidth') == 'true') kc_fixWidth();
	
	if(localStorage.getItem('showGifs') == 'true') kc_show_gifs();
	if(localStorage.getItem('ytEmbed') == 'true') kc_youtubify();
	if(localStorage.getItem('convertLinks') == 'true') kc_linkify();
	if(localStorage.getItem('showQuotes') == 'true') kc_quoteInfo();
	if(localStorage.getItem('showReplies') == 'true') kc_show_replies();
	
	if(localStorage.getItem('viewInline') == 'true') {
		jQuery('.inline').remove();
		jQuery('.thread').each(function(){
			var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
			jQuery(this).find('.omittedinfo').after(' <span class="inline">[<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>]</span>');
			if(window.location.href.split('#')[0].substr(-1) == '/') jQuery('#thread_'+id).append(' <span class="inline">>> [<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>] [<a href="#n'+id+'">'+kc_lang('Nur neue Beiträge anzeigen')+'</a>]  [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span> ');
			else jQuery('.quotelink').live("click",function(){
				if(jQuery(this).attr('href').indexOf('javascript') == 0 && jQuery('img[src*=banner]').length == 0)
				{
					jQuery('center:first').css({'opacity':'1','height':'auto'});
					jQuery('#postform_comment').focus();
				}
			});
		});
		if(localStorage.getItem('quickReply') == 'true' && window.location.href.split('#')[0].substr(-1) == '/') {
			jQuery('.thread .postnumber').each(function(){
				var hash = jQuery(this).parent().parent().attr('id').split('_')[0].split('-')[1];
				var id = jQuery(this).parents('.thread').find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
				if(typeof hash == 'undefined') hash = id;
				jQuery(this).after(' <span class="kc_reply">[<a href="'+window.location.href.split('#')[0]+'thread-'+id+'.html#q'+hash+'_quick">'+kc_lang('Schnellantwort')+'</a>]</span>');
			});

			jQuery('.kc_reply>a').live("click", function(e){
				var id = jQuery(this).parents('.thread').find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
				jQuery('.kc_youtube>iframe').fadeOut(parseInt(localStorage.getItem('fadeDelay')));
				jQuery('body').append('<div id="kc_overlay" style="background:rgba(0,0,0,.75);text-align:center;padding:2%;height:96%;width:96%;position:fixed;top:0;left:0;"><iframe class="c_'+id+'" id="kc_overlay_iframe" src="'+jQuery(this).attr('href')+'" style="background:#fff;padding:1px;border:1px solid #000;width:96%;height:96%;" /></div>');

				jQuery('#kc_overlay_iframe').one('load', function(){
					jQuery('#kc_overlay_iframe').one('load', function(){
						jQuery('#kc_overlay_iframe').remove();
						jQuery('#kc_overlay').remove();

						if(window.location.href.split('#')[0].substr(-1) == '/') var imgurl=window.location.href.split('#')[0]+'thread-'+id+'.html';
						else var imgurl=window.location.href.split('#')[0];
						jQuery.ajax({
							url: imgurl,
							cache:false,
							success: function(data) {
								var onlynew = !jQuery('#thread_'+id).is('.kc_expanded');

								if(onlynew == true)
								{
									var last_post1 = jQuery('#thread_'+id).find('.quotelink:last').html();
									var posts = jQuery('.thread table', data);
									
									for(var i=0; i<posts.length; i++)
									{
										var this_id1=jQuery(posts[i]).find('.quotelink:last').html();

										if(parseInt(last_post1)-parseInt(this_id1) < 0)
										{
											jQuery('#thread_'+id).append('<a name="'+this_id1+'"></a><table>'+jQuery(posts[i]).html()+'</table>');
										}
									}
									
								}
								else
								{
									jQuery('#thread_'+id).html(jQuery('.thread', data).html());
								}
                                apply_RegexActions();
								if(localStorage.getItem('krautzip')=='true')
								{
									jQuery('blockquote>p:not(.krautzip)').each(function(){
										jQuery(this).html(krautzip(jQuery(this).html()));
									}).addClass('krautzip');
								}
								if(localStorage.getItem('showSpoiler') == 'true') jQuery('.spoiler').css({"color":"#ccc"});
								if(localStorage.getItem('fadeAutosage') == 'true')	kc_sage();
								if(localStorage.getItem('smallThumbs') == 'true') kc_smallThumbs();
								if(localStorage.getItem('fixWidth') == 'true') kc_fixWidth();
								
								if(localStorage.getItem('showGifs') == 'true') kc_show_gifs();
								if(localStorage.getItem('ytEmbed') == 'true') kc_youtubify();
								if(localStorage.getItem('convertLinks') == 'true') kc_linkify();
								if(localStorage.getItem('showQuotes') == 'true') kc_quoteInfo();
								if(localStorage.getItem('showReplies') == 'true') kc_show_replies();

								if(window.location.href.split('#')[0].substr(-1) == '/')
								{
									jQuery('#thread_'+id+' .kc_reply,#thread_'+id+' .kc_nreply').remove();
									jQuery('#thread_'+id+' .postnumber').each(function(){
										var hash = jQuery(this).parent().parent().attr('id').split('-')[1];
										if(localStorage.getItem('quickReply') == 'true') {
											if(typeof hash == 'undefined') hash = id;
											jQuery(this).after(' <span class="kc_reply">[<a href="'+window.location.href.split('#')[0]+'thread-'+id+'.html#q'+hash+'_quick">'+kc_lang('Schnellantwort')+'</a>]</span>');
										}
										if(localStorage.getItem('normalReply') == 'true') {
											jQuery(this).after(' <span class="kc_nreply">[<a href="'+window.location.href.split('#')[0]+'thread-'+id+'.html#q'+hash+'">'+kc_lang('Antworten')+'</a>]</span>');
										}
									});
								}
								jQuery('#thread_'+id+' .inline').remove();
								if(onlynew == false) jQuery('#thread_'+id).append(' <span class="inline">>> [<a href="#x'+id+'">'+kc_lang('Nur letzte Beiträge anzeigen')+'</a>] [<a href="#'+id+'">'+kc_lang('Beiträge aktualisieren')+'</a>] [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span>');
								else jQuery('#thread_'+id).append(' <span class="inline">>> [<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>] [<a href="#n'+id+'">'+kc_lang('Nur neue Beiträge anzeigen')+'</a>]  [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span>');

								if(localStorage.getItem('expandAll') == 'true')
								{
									jQuery('.expandAll').remove();
									jQuery('.thread').each(function(){
										var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
										jQuery('#thread_'+id+' .postnumber:first').after(' <span class="expandAll">[<a href="#'+id+'">'+kc_lang('Thumbnails/Bilder')+'</a>]</span> ');
									});
								}
								if(localStorage.getItem('allLinks') == 'true')
								{
									jQuery('.thread').each(function(){
										var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
										if(jQuery(this).find('.all').length==0)
											jQuery('#thread_'+id+' .postnumber:first').after(' <span class="all">[<a href="#'+id+'">'+kc_lang('Dateiliste')+'</a>]</span> ');
										else
											jQuery('#thread_'+id+' .all').html(' <span class="all">[<a href="#'+id+'">'+kc_lang('Dateiliste')+'</a>]</span> ');
									});
								}
							}
						});
					});
					
				});
				e.preventDefault();
			});
		}
		jQuery('span.inline>a:not(.kc_first)').live("click", function(e){
			var id = jQuery(this).attr('href').split('#')[1];

			if(id[0] == 'x')
			{
				var tmp = kc_position(true);
				jQuery(this).parents('.thread').find('table').slice(0,-4).each(function(){
					jQuery(this).remove().prev().remove();
				});
				var id = jQuery(this).parents('.thread').attr('id').split('_')[1];
				jQuery('#thread_'+id+' .inline').remove();
				jQuery('#thread_'+id).find('table:first').before('<span class="omittedinfo"></span>').prev().after(' <span class="inline">[<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>]</span>');
				jQuery('#thread_'+id).removeClass('kc_expanded').append(' <span class="inline">>> [<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>] [<a href="#n'+id+'">'+kc_lang('Nur neue Beiträge anzeigen')+'</a>] [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span>');
				if(localStorage.getItem('replaceOpenClose') == 'true') kc_open_close();
				kc_correct(tmp);
				e.preventDefault();
				return;
			}
			if(id[0] == 'n')
			{
				var onlynew = true;
				var id = jQuery(this).attr('href').split('n')[1];
			}
			else var onlynew = false;

			jQuery(this).parent().fadeOut(parseInt(localStorage.getItem('fadeDelay')));
			if(window.location.href.split('#')[0].substr(-1) == '/') var imgurl=window.location.href.split('#')[0]+'thread-'+id+'.html';
			else var imgurl=window.location.href.split('#')[0];
			jQuery.ajax({
				url: imgurl,
				cache:false,
				success: function(data) {
					var tmp = kc_position();
					if(onlynew == true)
					{
						var last_post2 = jQuery('#thread_'+id).find('.quotelink:not(div.postreply a):last').html();
						var posts = jQuery('.thread table', data);
						
						for(var i=0; i<posts.length; i++)
						{
							var this_id2=jQuery(posts[i]).find('.quotelink:last').html();
							if(parseInt(last_post2)-parseInt(this_id2) < 0)
							{
								jQuery('#thread_'+id).append('<a name="'+this_id2+'"></a><table>'+jQuery(posts[i]).html()+'</table>');
							}
						}
					}
					else
					{
						jQuery('#thread_'+id).addClass('kc_expanded').html(jQuery('.thread', data).html());
					}
                    apply_RegexActions();
					if(localStorage.getItem('krautzip')=='true')
					{
						jQuery('blockquote>p:not(.krautzip)').each(function(){
							jQuery(this).html(krautzip(jQuery(this).html()));
						}).addClass('krautzip');
					}
					if(localStorage.getItem('showSpoiler') == 'true') jQuery('.spoiler').css({"color":"#ccc"});
					if(localStorage.getItem('fadeAutosage') == 'true') kc_sage();
					if(localStorage.getItem('smallThumbs') == 'true') kc_smallThumbs();
					if(localStorage.getItem('fixWidth') == 'true') kc_fixWidth();
					
					if(localStorage.getItem('showGifs') == 'true') kc_show_gifs();
					if(localStorage.getItem('ytEmbed') == 'true') kc_youtubify();
					if(localStorage.getItem('convertLinks') == 'true') kc_linkify();
					if(localStorage.getItem('showQuotes') == 'true') kc_quoteInfo();
					if(localStorage.getItem('showReplies') == 'true') kc_show_replies();
					if(window.location.href.split('#')[0].substr(-1) == '/')
					{
						jQuery('#thread_'+id+' .kc_reply,#thread_'+id+' .kc_nreply').remove();
						jQuery('#thread_'+id+' .postnumber').each(function(){
							var hash = jQuery(this).parent().parent().attr('id').split('-')[1];
							if(localStorage.getItem('quickReply') == 'true') {
								if(typeof hash == 'undefined') hash = id;
								jQuery(this).after(' <span class="kc_reply">[<a href="'+window.location.href.split('#')[0]+'thread-'+id+'.html#q'+hash+'_quick">'+kc_lang('Schnellantwort')+'</a>]</span>');
							}
							if(localStorage.getItem('normalReply') == 'true') {
								jQuery(this).after(' <span class="kc_nreply">[<a href="'+window.location.href.split('#')[0]+'thread-'+id+'.html#q'+hash+'">'+kc_lang('Antworten')+'</a>]</span>');
							}
						});
					}
					jQuery('#thread_'+id+' .inline').remove();
					if(window.location.href.split('#')[0].substr(-1) == '/')
					{
						if(onlynew == false) jQuery('#thread_'+id).append(' <span class="inline">>> [<a href="#x'+id+'">'+kc_lang('Nur letzte Beiträge anzeigen')+'</a>] [<a href="#'+id+'">'+kc_lang('Beiträge aktualisieren')+'</a>] [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span> ');
						else 
						{
							jQuery('#thread_'+id).find('.omittedinfo').after(' <span class="inline">[<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>]</span>');
							jQuery('#thread_'+id).append(' <span class="inline">>> [<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>] [<a href="#n'+id+'">'+kc_lang('Nur neue Beiträge anzeigen')+'</a>] [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span>');
						}
					}
					else
					{
						jQuery('.inline').remove();
						jQuery('#thread_'+id).append(' <span class="inline">>> [<a href="#n'+id+'">'+kc_lang('Neue Beiträge anzeigen')+'</a>] [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span> ');
					}

					if(localStorage.getItem('expandAll') == 'true')
					{
						jQuery('.expandAll').remove();
						jQuery('.thread').each(function(){
							var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
							jQuery('#thread_'+id+' .postnumber:first').after(' <span class="expandAll">[<a href="#'+id+'">'+kc_lang('Thumbnails/Bilder')+'</a>]</span> ');
						});
					}
					if(localStorage.getItem('allLinks') == 'true')
					{
						jQuery('.thread').each(function(){
							var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
							if(jQuery(this).find('.all').length==0)
								jQuery('#thread_'+id+' .postnumber:first').after(' <span class="all">[<a href="#'+id+'">'+kc_lang('Dateiliste')+'</a>]</span> ');
							else
								jQuery('#thread_'+id+' .all').html(' <span class="all">[<a href="#'+id+'">'+kc_lang('Dateiliste')+'</a>]</span> ');

						});
					}
					if(localStorage.getItem('replaceOpenClose') == 'true') kc_open_close();
					kc_correct(tmp);
				}
			});
			e.preventDefault();
		});
	}

	if(localStorage.getItem('expandAll') == 'true')
	{
		jQuery('.expandAll').remove();
		jQuery('.thread').each(function(){
			var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
			jQuery('#thread_'+id+' .postnumber:first').after(' <span class="expandAll">[<a href="#'+id+'">'+kc_lang('Thumbnails/Bilder')+'</a>]</span> ');
		});

		jQuery('.expandAll>a').live("click", function(e){
			jQuery(this).parents('.thread').find('img[id^=button_expand_image_]').each(function(){
				eval(jQuery(this).attr('onclick').toString().substring(27, (jQuery(this).attr('onclick').toString().length-1)));
			});
			if(localStorage.getItem('smallThumbs') == 'true') kc_smallThumbs();
			e.preventDefault();
		});
	}

	if(localStorage.getItem('allLinks') == 'true')
	{
		jQuery('.thread').each(function(){
			var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
			if(jQuery(this).find('.all').length==0)
				jQuery('#thread_'+id+' .postnumber:first').after(' <span class="all">[<a href="#'+id+'">'+kc_lang('Dateiliste')+'</a>]</span> ');
			else
				jQuery('#thread_'+id+' .all').html(' <span class="all">[<a href="#'+id+'">'+kc_lang('Dateiliste')+'</a>]</span> ');

		});
		jQuery('#allurls').live("dblclick", function(e){
			jQuery('#allurls').remove();
		});
		jQuery('.all>a').live("click", function(e){
			if(jQuery('#allurls').length > 0)
			{
				jQuery('#allurls').remove();
			}
			else
			{
				var id = jQuery(this).attr('href').split('#')[1];
	
				if(window.location.href.split('#')[0].substr(-1) == '/') var imgurl=window.location.href.split('#')[0]+'thread-'+id+'.html';
				else var imgurl=window.location.href.split('#')[0];
					
				jQuery.ajax({
					url: imgurl,
					cache:false,
					success: function(data) {
						var imgs = jQuery('.filename>a', data);
						var urls = '';
						for(var i=0; i<imgs.length; i++)
						{
							urls += '<a href="http://krautchan.net/'+jQuery(imgs[i]).attr('href')+'">http://krautchan.net/'+jQuery(imgs[i]).attr('href')+'</a><br />';
						}
						jQuery('#thread_'+id+' hr:first').after('<div id="allurls" style="background:#fff;border:1px dashed #666;color:#666;padding:10px;">'+urls+'</div>')
					}
				});
			}
			e.preventDefault();
		});
	}
	if(localStorage.getItem('removeShiPainter') == 'true')
	{
		jQuery('form:nth(1)').remove();
	}

	if(localStorage.getItem('showGoldP') == 'true')
		jQuery('img[src*=banner]:not(.banner)').css({'margin':'0 0 0 30px'}).before('<div id="kc_gold" style="background:#000;position:absolute;font:bold 30px/1 Georgia, serif;color:#FFD700;-moz-transform:rotate(-90deg);-webkit-transform:rotate(-90deg);-o-transform:rotate(-90deg);margin:36px 0 0 -201px;width:102px;left:50%;text-align:center;text-shadow:#FFFF00 0 0 5px;-moz-shadow:#FFFF00 0 0 5px;-webkit-shadow:#FFFF00 0 0 5px;z-index:-1;">GOLD</div>');
	if (jQuery.browser.mozilla) {
		jQuery('#kc_gold').css({'margin':'36px 0 0 -201px'});
	}

	if(window.location.href.split('_')[1] == 'quick')
	{
		jQuery('form').unwrap().hide();
		jQuery('body>*:visible').remove();
		jQuery('form').fadeIn(parseInt(localStorage.getItem('fadeDelay')));
		jQuery('ul').remove();
		var bg = jQuery('body').css('background-color');
		jQuery('form:first').wrap('<center style="background:'+bg+';top:0;width:100%;position:fixed;z-index:1000;opacity:.97;"></center>');
		jQuery('center:first').bind('mouseout', function(){
			if(jQuery(document).scrollTop() > jQuery(this).height())
				jQuery(this).css({'opacity':'0','height':'30px','overflow':'hidden'});
		}).bind('mouseover mousemove', function(){
			jQuery(this).css({'opacity':'.97','height':'auto'}).stop(true);
		});
		jQuery(window).scroll(function(){
			if(jQuery(document).scrollTop() > jQuery('center:first').height())
				jQuery('center:first').css({'opacity':'0','height':'20px','overflow':'hidden'});
			else
				jQuery('center:first').css({'opacity':'1','height':'auto'});
		});

		jQuery('#postform_comment').focus();
		if(localStorage.getItem('showBigform')=='true')
			toggleTextareaSize('postform_comment', 48, 4, 75, 12);
		var fh = jQuery('form:first').height()+10;
		jQuery('form:nth(1)').css("margin-top",fh+"px");
		window.location.href = window.location.href.split('_')[0];
	}

	if(localStorage.getItem('showSearch')=='true')
	{
		window.setInterval(function(){
			if(typeof jQuery("#kc_search").val() != 'undefined' && jQuery("#kc_search").val().length > 2)
			{
				var invert = jQuery("#kc_search").val()[0]=='!';
				var search = jQuery("#kc_search").val().toLowerCase();
				if(invert == true) search = search.substr(1);

				jQuery('.thread:not(.kc_hidden)').each(function(){
					var text = jQuery(this).html().toLowerCase();
					if(text.indexOf(search)<0)
					{
						if(invert == true)
						{
							if(jQuery('#hidden_'+jQuery(this).attr('id')).length == 0)
								jQuery(this).show();
						}
						else  jQuery(this).hide();
					}
					else
					{
						if(invert == true) jQuery(this).hide();
						else 
						{
							if(jQuery('#hidden_'+jQuery(this).attr('id')).length == 0)
								jQuery(this).show();
						}
					}
				});
			}
			else
			{
				jQuery('.thread:not(.kc_hidden)').each(function(){
					if(jQuery('#hidden_'+jQuery(this).attr('id')).length == 0)
						jQuery(this).show();
				});
			}
		}, 1000);
	}

	if(localStorage.getItem('newThreads') == 'true' && window.location.href.split('#')[0].substr(-1) == '/')
	{
        var DATA_LAMP='data:image/gif;base64,R0lGODlhEAAQAPefAPbhdP787/bgcvbhc//++f/+/e7Ff/HSlP331teDLfz0yf342/752+mzaeqza/351teBLOyjTPvxyvvDUf351Pz2zfXiXUZGRf320qKlpuymTOu5bPnnxP334e+0Y/flcvfiy92VPouPlO/Ii/rrw/e+S/354P3lQbu8vGBZUpiZneapUP3mR6OVevbhdfvv0uzAf/DIgO7Gfv788P789+iRFvz0x/zwxIx/NdiJMvPUpf358/fo1fbhu5+ho9OIPfjjtPPVRvfkgv787OWqb/HOrJiKOvvz5vCuZfvx4/777PXcWVBNRlxXT958FvbkaszMze/DnPLSlf776/331ZWOg/npye+1aP/+/P765PvxuPz00/31wP3531hELvjmwfz06Pfhd++xYPXdt/354u/o3/vsx+zl2/vxtIyGeXZuYOaGCfDLh/jqlvbitfXeaEJCQPv14vjftubf1PbdqPrrit/Wyerq6/jkt/npyPzyz/jly/PTpqKiqPvyuvvz6v787peDZv744u27a21lWtqPOfzw2PXgyfDMheGvcOuhOPLKkOazef304v/97fz1yP754OadRv766/323/zz1/765fjlhv7+3PvxqOzCiOqZL/bgcf763PfjfP32z////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJ8ALAAAAAAQABAAAAjbAD8J/BTnC50DiGKw6TFwIA0OeMxQ6iDIkJxBG8AMxOKGBBkTVDwpsPFA0qIVOwTmAVJpQZYZBAgEwIDGkYNMAqW8YNBFCaAAAaZA0oJpTwiBMiY9qoBgix4JN/y0+dAoh0ADVih0siTmigcNQpbUAVFI4JgRQ8JocgHgzYA1QS4RYSSwAAwdnBQBeGJBQA0uRRL8GXikAR8kAAYI2BQhCoRDDT8lSRSpBIsTE5z84BFZ4JlALYzgUOOlTOeBaTL0USEixemBVVDcgeKD0GuBc5pcgMPEzu3fAgMCADs%3D';
		window.setInterval(function(){
			var ids=[];
			jQuery('.thread').each(function(){
				ids.push(jQuery(this).attr('id').split('_')[1]);
			});
			jQuery.ajax({
				url: window.location.href.split('#')[0],
				cache:false,
				success: function(data) {
					var threads = jQuery('.thread', data);
					for(var j=0; j<threads.length; j++)
					{
						var x = jQuery(threads[j]).attr('id').split('_')[1];
						if(localStorage.getItem('newPostings'))
						{
							var new_post = jQuery(threads[j]).find('.quotelink:last').attr('href').split('#q')[1];
							var last_post3 = jQuery('#thread_'+x).find('.quotelink:not(div.postreply a):last').html();
							if(jQuery('#thread_'+x+' .omittedinfo').length > 0)
								jQuery('#thread_'+x+' .omittedinfo').html(jQuery(threads[j]).find('.omittedinfo').html());

							if(parseInt(last_post3)-parseInt(new_post) < 0)
							{
								if(jQuery('#thread_'+x+' .kc_newpostings').length == 0)
								{
									jQuery('#thread_'+x).find('.inline:last').append(' '+kc_lang('<strong class="kc_newpostings">Es gibt neue Beiträge in diesem Thema</strong>'))
								}
							}
						}

						if(ids.toString().indexOf(x) < 0)
						{
							jQuery('.thread:first').before('<div class="thread kc_hidden" id="thread_'+x+'" style="clear:both;">'+jQuery(threads[j]).html()+'</div>');
							jQuery('#thread_'+x).fadeOut(parseInt(localStorage.getItem('fadeDelay')));

							if(localStorage.getItem('viewInline') == 'true') {
								jQuery('.inline').remove();
								jQuery('.thread').each(function(){
									var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
									jQuery(this).find('.omittedinfo').after(' <span class="inline">[<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>]</span>');

									if(jQuery(this).is('.kc_expanded'))
										jQuery('#thread_'+id).append(' <span class="inline">>> [<a href="#x'+id+'">'+kc_lang('Nur letzte Beiträge anzeigen')+'</a>] [<a href="#'+id+'">'+kc_lang('Beiträge aktualisieren')+'</a>] [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span>');
									else
										jQuery('#thread_'+id).append(' <span class="inline">>> [<a href="#'+id+'">'+kc_lang('Alles anzeigen')+'</a>] [<a href="#n'+id+'">'+kc_lang('Nur neue Beiträge anzeigen')+'</a>]  [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span> ');

									if(localStorage.getItem('quickReply') == 'true' && jQuery(this).find('.kc_reply').length == 0)
									{
										jQuery('#thread_'+id+' .kc_reply','#thread_'+id+' .kc_nreply').remove();
										jQuery('#thread_'+id+' .postnumber').each(function(){
											var hash = jQuery(this).parent().parent().attr('id').split('-')[1];
											if(typeof hash == 'undefined') hash = id;
											if(localStorage.getItem('quickReply') == 'true') {
												jQuery(this).after(' <span class="kc_reply">[<a href="'+window.location.href.split('#')[0]+'thread-'+id+'.html#q'+hash+'_quick">'+kc_lang('Schnellantwort')+'</a>]</span>');
											}
											if(localStorage.getItem('normalReply') == 'true' && jQuery(this).parent().is(':not(:contains("Antworten"))')) {
												jQuery(this).after(' <span class="kc_nreply">[<a href="'+window.location.href.split('#')[0]+'thread-'+id+'.html#q'+hash+'">'+kc_lang('Antworten')+'</a>]</span>');
											}
										});
									}
								});
							}

							if(localStorage.getItem('expandAll') == 'true')
							{
								jQuery('.expandAll').remove();
								jQuery('.thread').each(function(){
									var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
									jQuery('#thread_'+id+' .postnumber:first').after(' <span class="expandAll">[<a href="#'+id+'">'+kc_lang('Thumbnails/Bilder')+'</a>]</span> ');
								});
							}
							if(localStorage.getItem('allLinks') == 'true')
							{
								jQuery('.thread').each(function(){
									var id = jQuery(this).find('.postnumber:first').find('a:last').html().replace (/^\s+/, '').replace (/\s+$/, '');
									if(jQuery(this).find('.all').length==0)
										jQuery('#thread_'+id+' .postnumber:first').after(' <span class="all">[<a href="#'+id+'">'+kc_lang('Dateiliste')+'</a>]</span> ');
									else
										jQuery('#thread_'+id+' .all').html(' <span class="all">[<a href="#'+id+'">'+kc_lang('Dateiliste')+'</a>]</span> ');

								});
							}

                            apply_RegexActions();
							if(localStorage.getItem('krautzip')=='true')
							{
								jQuery('blockquote>p:not(.krautzip)').each(function(){
									jQuery(this).html(krautzip(jQuery(this).html()));
								}).addClass('krautzip');
							}
							if(localStorage.getItem('showSpoiler') == 'true') jQuery('.spoiler').css({"color":"#ccc"});
							if(localStorage.getItem('fadeAutosage') == 'true') kc_sage();
							if(localStorage.getItem('smallThumbs') == 'true') kc_smallThumbs();
							if(localStorage.getItem('fixWidth') == 'true') kc_fixWidth();
							
							if(localStorage.getItem('showGifs') == 'true') kc_show_gifs();
							if(localStorage.getItem('ytEmbed') == 'true') kc_youtubify();
							if(localStorage.getItem('convertLinks') == 'true') kc_linkify();
							if(localStorage.getItem('showQuotes') == 'true') kc_quoteInfo();
							if(localStorage.getItem('showReplies')=='true') kc_show_replies();
							jQuery('#thread_'+x+' .inline').remove();
							jQuery('#thread_'+x).append(' <span class="inline">>> [<a href="#'+x+'">'+kc_lang('Alles anzeigen')+'</a>] [<a href="#n'+x+'">'+kc_lang('Nur neue Beiträge anzeigen')+'</a>]  [<a href="#thread_'+id+'" class="kc_first">'+kc_lang('zum ersten Beitrag')+'</a>]</span> ');
							jQuery('#kc_newthreads').remove();
							if(jQuery('.kc_hidden').length == 1)
								var threadtext = kc_lang('Es gibt 1 Thema mit neuen Beiträgen. Klicke hier, um ihn einzublenden.');
							else
								var threadtext = kc_lang('Es gibt')+' '+jQuery('.kc_hidden').length+' '+kc_lang('Themen mit neuen  Beiträgen. Klicke hier, um sie einzublenden.');
							jQuery('body').prepend('<a id="kc_newthreads" style="background:#ffffe1 url('+DATA_LAMP+') no-repeat;background-position:3px 2px;border-bottom:2px ridge #a2a28e;color:#000;cursor:default;font-family:Arial,sans-serif;font-size:11px;height:17px;left:0;line-height:15px;margin:0;padding:2px 0 0 22px;position:fixed;text-align:left;top:0;overflow:hidden;width:100%;z-index:32767;font-weight:bold;opacity:.97;display:block;">'+threadtext+'</a>');
							jQuery('#kc_newthreads').click(function(e){
								jQuery('#kc_newthreads').remove();
								var tmp = kc_position();
								jQuery('.kc_hidden').fadeIn(parseInt(localStorage.getItem('fadeDelay'))).removeClass('kc_hidden');
								kc_correct(tmp);
								e.preventDefault();
							});
						}
					}
					if(localStorage.getItem('moveNewPostings') == 'true')
					{
						var tmp = kc_position();
						jQuery('.kc_newpostings:not(.moved)').each(function(){
							jQuery('.thread:first').before(jQuery(this).parents('.thread'));
							jQuery(this).addClass('moved');
						});
						kc_correct(tmp);
					}
					if(localStorage.getItem('showNewThreads') == 'true')
					{
						var tmp = kc_position();
						jQuery('.kc_hidden').each(function(){
							jQuery(this).fadeIn(parseInt(localStorage.getItem('fadeDelay'))).removeClass('kc_hidden');
						});
						kc_correct(tmp);
						jQuery('#kc_newthreads').remove();
					}
				}
			});
			if(localStorage.getItem('replaceOpenClose') == 'true') kc_open_close();
		}, 30000);
	}

	if(localStorage.getItem('newThreads') == 'true' && localStorage.getItem('newPostingsPage') != 'true' && window.location.href.split('#')[0].substr(-1) != '/')
	{
		var id = jQuery('.thread').attr('id').split('_')[1];
		jQuery('.thread').append('<span class="inline">>> [<a href="#n'+id+'">'+kc_lang('Neue Beiträge anzeigen')+'</a>]</span> ');
	}

	if(localStorage.getItem('newThreads') == 'true' && localStorage.getItem('newPostingsPage') == 'true' && window.location.href.split('#')[0].substr(-1) != '/')
	{
		window.setInterval(function(){
			var old_posts=[];
			jQuery('.postreply,.postreply_highlighted').each(function(){
				old_posts.push(jQuery(this).attr('id').split('-')[1]);
			});
			jQuery.ajax({
				url: window.location.href.split('#')[0],
				cache:false,
				success: function(data) {
					var posts = jQuery('.thread table', data);
					for(var i=0; i<posts.length; i++)
					{
						var this_id4=jQuery(posts[i]).find('.quotelink:last').html();
						if(old_posts.toString().indexOf(this_id4) < 0)
						{
							jQuery('.thread').append('<a name="'+this_id4+'"></a><table>'+jQuery(posts[i]).html()+'</table>');
						}
					}
                    apply_RegexActions();
					if(localStorage.getItem('krautzip')=='true')
					{
						jQuery('blockquote>p:not(.krautzip)').each(function(){
							jQuery(this).html(krautzip(jQuery(this).html()));
						}).addClass('krautzip');
					}
					if(localStorage.getItem('showSpoiler') == 'true') jQuery('.spoiler').css({"color":"#ccc"});
					if(localStorage.getItem('fadeAutosage') == 'true') kc_sage();
					if(localStorage.getItem('smallThumbs') == 'true') kc_smallThumbs();
					
					if(localStorage.getItem('fixWidth') == 'true') kc_fixWidth();
					if(localStorage.getItem('showGifs') == 'true') kc_show_gifs();
					if(localStorage.getItem('ytEmbed') == 'true') kc_youtubify();
					if(localStorage.getItem('convertLinks') == 'true') kc_linkify();
					if(localStorage.getItem('showQuotes') == 'true') kc_quoteInfo();
					if(localStorage.getItem('showReplies')=='true') kc_show_replies();
				}
			});
			if(localStorage.getItem('replaceOpenClose') == 'true') kc_open_close();
		}, 15000);
	}

	if(localStorage.getItem('ytEmbedSmall') == 'true')
	{
		jQuery('.kc_youtube_show').live('click', function(e){
			if(jQuery(this).parent().next().is(':visible'))
				jQuery(this).parent().next().hide();
			else
				jQuery(this).parent().next().css({'display':'inline-block'});
			e.preventDefault();
		});
	};

    apply_RegexActions();
	if(localStorage.getItem('krautzip')=='true')
	{
		jQuery('blockquote>p:not(.krautzip)').each(function(){
			jQuery(this).html(krautzip(jQuery(this).html()));
		}).addClass('krautzip');
		
		jQuery('.krautzip_hidden').live('click', function(e){
			if(jQuery(this).next().is(':visible'))
				jQuery(this).next().fadeOut(parseInt(localStorage.getItem('fadeDelay')));
			else
				jQuery(this).next().fadeIn(parseInt(localStorage.getItem('fadeDelay')));
		});
	};

	if(localStorage.getItem('hidePostform') == 'true' && window.location.href.split('#')[0].substr(-1) == '/') {
		jQuery('#postform').hide().after('<span id="kc_newThread">[<a href="#">'+kc_lang('Neues Thema eröffnen')+'</a>]</span>');
		jQuery('#postform_submit').after(' [<a id="kc_newThreadCancel" href="#">'+kc_lang('abbrechen')+'</a>]')
		jQuery('#kc_newThread>a').click(function(e){
			jQuery(this).parent().hide();
			jQuery('#postform').fadeIn(parseInt(localStorage.getItem('fadeDelay')));;
			e.preventDefault();
		});
		jQuery('#kc_newThreadCancel').click(function(e){
			jQuery('#kc_newThread').show();
			jQuery('#postform').fadeOut(parseInt(localStorage.getItem('fadeDelay')));;
			e.preventDefault();
		});
	}
	
	if(localStorage.getItem('showBigform')=='true' && window.location.href.split('#')[0].substr(-1) == '/')
		toggleTextareaSize('postform_comment', 48, 4, 75, 12);

	jQuery('p[id^=post_truncated_]').live('click',function(){
		kc_tmp_truncate=function(elem){
			if(jQuery(elem).is(':visible') == true)
			{
				window.setTimeout(function(){kc_tmp_truncate(elem);}, 100);
			}
			else
			{
				jQuery(elem).parents('.thread').find('blockquote>p').removeClass('linkify youtubify');
				if(localStorage.getItem('ytEmbed') == 'true') kc_youtubify();
				if(localStorage.getItem('convertLinks') == 'true') kc_linkify();
			}
		}
		kc_tmp_truncate(this);
	});

	if(localStorage.getItem('showGoldP') != 'true')
	{
		var kkeys = [];
		jQuery(window).bind('keydown', function (e) {
			var code = "38,38,40,40,37,39,37,39,66,65";
			kkeys.push(e.keyCode);
			if (kkeys.toString().indexOf(code) >= 0) {
				alert('Goldaccount!');
				localStorage.setItem('showGoldP', 'true');
				window.location.reload();
			}
		});
	}
	jQuery('#postform_comment').before('<div id="kc_bbcode"><button name="b" data-title="'+kc_lang('Fett')+'" style="padding:3px 5px;"><span style="font-weight:bold;">B</span></button><button name="i" data-title="'+kc_lang('Kursiv')+'" style="padding:3px 5px;"><span style="font-style: italic">I</span></button><button name="s" data-title="'+kc_lang('Durchgestrichen')+'" style="padding:3px 5px;"><span style="text-decoration: line-through">S</span></button><button name="spoiler" data-title="'+kc_lang('Spoiler')+'" style="padding:3px 5px;"><span style="background:#000;color:#000">'+kc_lang('Spoiler')+'</span></button><button name="&gt;" data-title="'+kc_lang('Zitieren')+'" style="padding:3px 5px;"><span>&gt;</span></button><span style="margin:0 0 0 10px;font-style:italic;font-weight:bold;padding:3px 5px;" id="kc_bbcode_info"></span></div>');
	jQuery('#kc_bbcode>button').each(function(){
		jQuery(this)
		.mouseover(function(){
			jQuery('#kc_bbcode_info').html(jQuery(this).data('title'));
		})
		.mouseout(function(){
			jQuery('#kc_bbcode_info').html('');
		})
		.click(function(e){
			e.preventDefault();
			var name = jQuery(jQuery(this)).attr('name');
			var value = jQuery('#postform_comment').val();
			var start = '['+name+']';
			var end = '[/'+name+']';
			var sel1 = jQuery('#postform_comment')[0].selectionStart;
			var sel2 = jQuery('#postform_comment')[0].selectionEnd;

			if (window.getSelection) var sel = window.getSelection();
			else if (document.getSelection) var sel = document.getSelection();
			if(sel=='') sel = value.substring(sel1, sel2);

			if(name == '>') {
				start = '';
				end = '';

				sel = escape(sel);
				if(sel.indexOf('%0D%0A') > -1) re_nlchar = /%0D%0A/g;
				else if(sel.indexOf('%0A') > -1) re_nlchar = /%0A/g;
				else if(sel.indexOf('%0D') > -1) re_nlchar = /%0D/g;
				if(typeof re_nlchar != 'undefined') sel = sel.replace(re_nlchar, "\n> ");
				sel = '> '+unescape(sel);
			}
			jQuery('#postform_comment').val(value.substr(0, sel1) + start + sel + end + value.substr(sel2));
			var pos = sel1 + start.length + sel.length + end.length;
			jQuery('#postform_comment').focus();
			jQuery('#postform_comment')[0].selectionStart = pos;
			jQuery('#postform_comment')[0].selectionEnd = pos;
		});
	});
    jQuery("#postform").submit(function(){jQuery("#kc_bbcode").remove()});
	jQuery('.kc_newPass').live('click', function(e){
		e.preventDefault();
		jQuery(this).remove();
		password = prompt('Bitte gib Dein Passwort ein', '');

		if(localStorage.getItem('passwords') != null)
			var passwords = localStorage.getItem('passwords').split('|||');
		else
			var passwords = ['B3rndL4u3rt'];

		passwords.push(password);
		localStorage.setItem('passwords', passwords.join('|||'));
		jQuery('.spoiler').show();
	});
	jQuery('.kc_allowhtml').live('click', function(e){
		e.preventDefault();
		jQuery(this).prev().html(jQuery(this).prev().html().replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
		jQuery(this).remove();
	});

	if(localStorage.getItem('replaceOpenClose') == 'true')
	{
		jQuery('.kc_open_close').live('click', function(e){
			e.preventDefault();
			if(localStorage.getItem('hiddenPosts') != null)
				var hposts = localStorage.getItem('hiddenPosts').split('|||');
			else
				var hposts = [''];
			
			var id = jQuery(this).parents('.postreply,.postreply_highlighted,.thread').attr('id');

			if(jQuery('#'+id+'>div:not(.postheader)').is(':visible'))
			{
				jQuery('#'+id+'>div:not(.postheader)').hide();
				if(id.substr(0,6) == 'thread') jQuery('#'+id+' .omittedinfo, #'+id+' table, #'+id+' .inline, #'+id+' .all, #'+id+' .expandAll, #'+id+' .kc_reply, #'+id+' .kc_nreply').hide();
				jQuery('#'+id+' .kc_open_close').attr('src', '/images/button-open.gif');
				hposts.push(id);
				localStorage.setItem('hiddenPosts', hposts.join('|||'));
			}
			else
			{
				jQuery('#'+id+'>div:not(.postheader)').show();
				jQuery('#'+id+' .omittedinfo, #'+id+' table, #'+id+' .inline, #'+id+' .all, #'+id+' .expandAll, #'+id+' .kc_reply, #'+id+' .kc_nreply').fadeIn();
				jQuery('#'+id+' .kc_open_close').attr('src', '/images/button-close.gif');
				var remove = hposts.indexOf(id);
				if(remove!=-1) hposts.splice(remove, 1);
				localStorage.setItem('hiddenPosts', hposts.join('|||'));
			}
		});
		kc_open_close();
	}
};
kc_addJQuery(kc_main);

/* http://userscripts.org/scripts/review/20145 */
//SUC_script_num = 98624;
//try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
