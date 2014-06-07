// ==UserScript==
// @name Youtube Ripper
// @author Kayo <kayo@illumium.org>
// @version 0.1
// @description The collection of prohibited and dangerous tools to work with youtube.com
// @icon http://s3.amazonaws.com/uso_ss/icon/168185/large.png?1369300120
// @unwrap
// @run-at document-start
// @include http://*.youtube.com/watch*
// @include https://*.youtube.com/watch*
// @match http://*.youtube.com/watch*
// @match https://*.youtube.com/watch*
// ==/UserScript==

(function(window){
  var document = window.document,
      slice = Array.prototype.slice,
      hooks = {
        force_html5: {
          defaults: true,
          widget: function(opts){
            var button = document.createElement('button');
            button.setAttribute('class', 'yt-uix-button yt-uix-button-default yt-uix-tooltip');
            button.innerHTML = '<span class="yt-uix-button-content"><span>HTML5</span></span>';
            button.setAttribute('title', t('Use HTML5 always'));
            button.addEventListener('click', function(){ // toggle
              opts.force_html5 = !opts.force_html5;
              fixClass(button, 'yt-uix-button-toggled', opts.force_html5);
            });
            fixClass(button, 'yt-uix-button-toggled', opts.force_html5);
            return button;
          },
          ready: function(opts){
            if(!opts.force_html5){
              return;
            }
            var config = window.ytplayer.config,
                args = config.args;

            if(!config.html5 || args.html5_unavailable){
              for(var n in args){
                if(/^(?:html5_unavailable|ad|afv|aftv|cafe_experiment_id|cid|dclk|disable_non_adsense_ssl_companions|gut_tag|host_language|inactive_skippable_threshold|invideo|loeid|loudness|mpu|mpvid|no_afv_instream|oid|prefetch_ad_live_stream|ptchn|pyv_in_related_cafe_experiment_id|sffb|trueview|video_wall|yt_pt|as_launched_in_country|storyboard_spec)/.test(n)){
                  delete args[n];
                }
              }

              args.csi_page_type = 'watch7_html5';
              args.feature = 'player_embedded';
              args.resume = '1';
              args.start = 7;
              //args.watch7_html5 = 'start';
              config.html5 = true;

              document.getElementById('player-api').innerHTML = '';

              (function(){
                try{
                  new window.yt.player.Application("player-api", config);
                }catch(e){
                  setTimeout(arguments.callee, 0);
                }
              })();
            }
          }
        },
        download_stream: {
          widget: function(){
            var button = document.createElement('button');
            button.setAttribute('class', 'yt-uix-button yt-uix-button-default yt-uix-tooltip');
            button.setAttribute('title', t('Download stream'));
            button.innerHTML = '<span class="yt-uix-button-content"><span>V</span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"><ul class="youtube-ripper-menu yt-uix-button-menu hid"><li class="yt-uix-button-menu-item">'+t('No streams found')+'</li></ul>';
            this.links = button.childNodes[2];
            return button;
          },
          ready: function(){
            var self = this,
                i, j,
                links = self.links,
                vars,
                kv,
                stream,
                streams = window.ytplayer.config.args.url_encoded_fmt_stream_map.split(','),
                fexts = {
                  'video/webm': 'webm',
                  'video/mp4': 'mp4',
                  'video/x-flv': 'flv',
                  'video/3gpp': '3gp'
                },
                quals = {
                  small: '240p',
                  medium: '360p',
                  large: '480p',
                  hd720: '720p',
                  hd1080: '1080p',
                  hires: '2k'
                },
                lds = {
                  small: 1,
                  medium: 1,
                  large: 1
                },
            // stereo3d: "1"
                info = einfo();

            for(i = 0; i < streams.length; i++){ /* parse streams */
              stream = {};
              vars = streams[i].split('&');
              for(j = 0; j < vars.length; j++){
                kv = vars[j].split('=');
                stream[kv[0]] = decodeURIComponent(kv[1]);
              }
              streams[i] = stream;
            }

            links.innerHTML = '';

            for(j in quals){
              var item = [
                lds[j] ? '<span style="opacity:0;">HD</span>' : 'HD',
                quals[j]
              ], fext = '';

              for(kv in fexts){
                for(i = 0; i < streams.length; i++){ /*  */
                  stream = streams[i];
                  if(stream.quality == j && kv == stream.type.split(';')[0]){
                    fext = fexts[kv];
                    item.push('[<a download="'+fname(info, quals[j], fext)+'" target="_new" href="'+
                              stream.url+'&signature='+stream.sig+'">'+fext+(stream.stereo3d?' 3D':'')+'</a>]');
                  }
                }
              }

              if(fext){
                links.innerHTML = '<li class="yt-uix-button-menu-item">'+item.join(' ')+'</li>' + links.innerHTML;
              }
            }
          }
        },
        download_title: {
          widget: function(){
            var button = document.createElement('button');
            button.setAttribute('class', 'yt-uix-button yt-uix-button-default yt-uix-tooltip');
            button.setAttribute('title', t('Download subtitle'));
            button.innerHTML = '<span class="yt-uix-button-content"><span>S</span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"><ul class="youtube-ripper-menu yt-uix-button-menu hid"><li class="yt-uix-button-menu-item">'+t('No subtitles found')+'</li></ul>';
            this.links = button.childNodes[2];
            return button;
          },
          ready: function(){
            var self = this,
                url = window.yt.getConfig('TTS_URL');
            if(!url){
              return;
            }
            var doc = new window.XMLHttpRequest();
            doc.onreadystatechange = function(){
              if(doc.readyState == XMLHttpRequest.DONE){
                var i,
                    links = self.links,
                    node,
                    nodes = doc.responseXML.documentElement.childNodes,
                    info = einfo(),
                    builtins = [],
                    formats = {
                      /* code: default */
                    };
                for(i = 0; i < nodes.length; i++){ /* collect formats */
                  node = nodes[i];
                  if('format' === node.nodeName){
                    formats[node.getAttribute('fmt_code')] = 'true' == node.getAttribute('default');
                  }
                  if('track' === node.nodeName){
                    builtins.push(node.getAttribute('lang_code'));
                  }
                }

                links.innerHTML = '';

                function passItems(title, name, pref){
                  links.innerHTML += '<li class="yt-uix-button-menu-item yt-uix-button-menu-item-highlight"><strong>'+title+'</strong></li>';
                  for(i = 0; i < nodes.length; i++){ /* collect languages */
                    var node = nodes[i],
                        lang_code = 'track' == node.nodeName ? node.getAttribute('lang_code') : builtins[0],
                        tlang_code = 'track' == node.nodeName ? '' : node.getAttribute('lang_code'),
                        lang_name = node.getAttribute('lang_translated');
                    if(name && name === node.nodeName || pref && 'true' == node.getAttribute('lang_default')){
                      var item = [],
                          code,
                          def;

                      for(code in formats){
                        def = formats[code];
                        item.push((def?'':'[')+'<a download="'+fname(info, tlang_code || lang_code, '1'!=code?code:'xml')+'" target="_new" href="'+url+
                                  '&type=track&lang='+lang_code+(tlang_code?'&tlang='+tlang_code:'')+'&name&kind=asr&fmt='+code+'">'+
                                  (def?lang_name:code)+'</a>'+(def?'':']'));
                      }
                      links.innerHTML += '<li class="yt-uix-button-menu-item">'+item.join(' ')+'</li>';
                    }
                  }
                }

                passItems(t('Builtin'), 'track');

                passItems(t('Preferred'), null, true);

                passItems(t('Translated'), 'target');
              }
            };
            doc.open('get', url+'&type=list&tlangs=1&fmts=1&asrs=1', true);
            doc.send(null);
          }
        }
      };

  var self = {
    hooks: hooks,
    start: function(){
      var name,
          self = this,
          opts,
          hooks = self.hooks;
      try{
        opts = JSON.parse(localStorage.youtube_ripper);
      }catch(e){}
      self.opts = opts || self.invoke('defaults');
      self.invoke('start', self.opts);
    },
    ready: function(){
      var self = this,
          name,
          widgets,
          main = self.main = document.createElement('span'),
          info = document.getElementById('watch7-views-info'),

          style = document.createElement('style');

      /* make links on selected menu-item looks clear */
      style.innerText = '.youtube-ripper-menu .yt-uix-button-menu-item:hover a { color:#fff; }';
      document.head.appendChild(style);

      main.setAttribute('id', 'watch7-youtube-ripper');
      main.setAttribute('class', 'yt-uix-button-group');
      widgets = self.invoke('widget', self.opts);

      self.invoke('ready', self.opts);

      document.getElementById('watch7-user-header').insertBefore(main, info);
      for(name in widgets){
        main.appendChild(widgets[name]);
      }
    },
    stop: function(){
      self.invoke('stop', self.opts);
      try{
        localStorage.youtube_ripper = JSON.stringify(this.opts);
      }catch(e){
        //delete localStorage.youtube_ripper;
      }
    },
    invoke: function(type){
      var name,
          self = this,
          hooks = self.hooks,
          owner,
          hook,
          args = slice.call(arguments, 1),
          ret = {};

      for(name in hooks){
        owner = hooks[name];
        hook = owner[type];
        if('function' === typeof hook){
          ret[name] = hook.apply(owner, args);
        }else{
          if(0 === args.length){
            ret[name] = hook;
          }else if(1 === args.length){
            owner[type] = args[1];
          }
        }
      }
      return ret;
    }
  };

  function fixClass(element, class_, state){
    var classes = element.getAttribute('class').split(' ').filter(function(value){
      return value != class_;
    });
    if(state){
      classes.push(class_);
    }
    element.setAttribute('class', classes.join(' '));
  }

  function clean(src){
    return src.replace(/\//gi, "")
           .replace(/\\/gi, "")
           .replace(/"/gi, "'")
           .replace(/\+/gi, "and")
           .replace(/&/gi, "and")
           .replace(/:/gi, "")
           .replace(/\*/gi, "")
           .replace(/#/gi, "")
           .replace(/\./gi, "");
  }

  function einfo(){
    var args = window.ytplayer.config.args;
    return {
      vid: args.video_id,
      title: clean(args.title || t('Unknown title')),
      author: (author() || t('Unknown author'))
    };
  }

  function author(){
    var element;
    if((element = document.getElementById("watch7-user-header"))){
      return element.getElementsByTagName('a')[1].innerText;
    }
    return '';
  }

  function fname(info, fmt, ext){
    return info.author + ' - ' + info.title + ' [' + info.vid + ']' + (fmt?' ['+fmt+']':'') + (ext?'.'+ext:'');
  }

  window.addEventListener('load', function(){
    self.ready();
  }, false);

  window.addEventListener('unload', function(){
    self.stop();
  }, false);

  var l10n = {
    _: [
      "Use HTML5 always",
      "Download stream",
      "No streams found",
      "Download subtitle",
      "No subtitles found",
      "Builtin",
      "Preferred",
      "Translated"
    ],
    sq:[
      "Përdorni gjithmonë HTML5",
      "Download lumë",
      "Asnjë streams gjetur",
      "Shkarko subtitle",
      "Asnjë titra gjetur",
      "nis akt shtypjeje",
      "preferuar",
      "përkthyer"
    ],
    en:[
      "Use HTML5 always",
      "Download stream",
      "No streams found",
      "Download subtitle",
      "No subtitles found",
      "Builtin",
      "Preferred",
      "Translated"
    ],
    ar:[
      "استخدام HTML5 دائما",
      "تحميل تيار",
      "لم يتم العثور على تيارات",
      "تحميل الترجمة",
      "لم يتم العثور على ترجمة",
      "مدمج",
      "المفضل",
      "مترجم"
    ],
    af:[
      "Gebruik HTML5 altyd",
      "laai stroom",
      "Geen strome gevind",
      "laai subtitel",
      "Geen onderskrifte gevind",
      "ingeboude",
      "voorkeur",
      "vertaal"
    ],
    be:[
      "Выкарыстанне HTML5 заўсёды",
      "Спампаваць паток",
      "Няма патокаў не знойдзена",
      "Спампаваць субтытры",
      "Субтытры не знойдзеныя",
      "Убудаваныя",
      "прывілеяваны",
      "перакладзены"
    ],
    bg:[
      "Използвайте винаги HTML5",
      "Изтеглете поток",
      "Не са намерени потоци",
      "Изтегли субтитрите",
      "Не са намерени субтитри",
      "Вграден",
      "предпочитан",
      "Преведено"
    ],
    cy:[
      "Defnyddio HTML5 bob amser",
      "Download ffrwd",
      "Dim nentydd gael",
      "Download Isdeitl",
      "Dim is-deitlau dod o hyd",
      "builtin",
      "Ffefrir",
      "Cyfieithwyd"
    ],
    hu:[
      "Használja a HTML5 mindig",
      "Letöltés patak",
      "Nem található patakok",
      "Felirat letöltése",
      "Nem található felirat",
      "beépített",
      "előnyben részesített",
      "lefordított"
    ],
    vi:[
      "Sử dụng HTML5 luôn luôn",
      "tải về dòng",
      "Không tìm thấy suối",
      "tải về phụ đề",
      "Không có phụ đề tìm thấy",
      "dựng sẵn",
      "ưa thích",
      "dịch"
    ],
    ht:[
      "Sèvi ak HTML5 toujou",
      "Download kouran",
      "Pa gen sous dlo yo te jwenn",
      "Download subtitles",
      "Pa gen tradiksyon an yo te jwenn",
      "Builtin",
      "Prefere",
      "Tradui"
    ],
    gl:[
      "Use sempre HTML5",
      "Descargar fluxo",
      "Non hai fluxos atopou",
      "Lenda",
      "Non se atoparon subtítulos",
      "embutida",
      "preferido",
      "traducido"
    ],
    nl:[
      "Gebruik HTML5 altijd",
      "Download stroom",
      "Geen streams gevonden",
      "Download ondertiteling",
      "Geen ondertitels gevonden",
      "Builtin",
      "Voorkeur",
      "vertaald"
    ],
    el:[
      "Χρησιμοποιήστε HTML5 πάντα",
      "Κατεβάστε το ρεύμα",
      "Δεν βρέθηκαν ρεύματα",
      "Download υπότιτλος",
      "Δεν βρέθηκαν υπότιτλοι",
      "builtin",
      "Προτεινόμενα",
      "Μεταφράστηκε"
    ],
    da:[
      "Brug HTML5 altid",
      "Hent stream",
      "Ingen vandløb fundet",
      "Hent undertekster",
      "Ingen undertekst fundet",
      "indbygget",
      "foretrukket",
      "oversat"
    ],
    iw:[
      "השתמש תמיד HTML5",
      "הורד זרם",
      "לא מצאו זרמים",
      "הורד כתוביות",
      "לא מצא תרגום לעברי",
      "builtin",
      "מועדף",
      "מתורגם"
    ],
    yi:[
      "ניצן הטמל5 שטענדיק",
      "דאַונלאָוד טייַך",
      "ניט סטרימז געפונען",
      "דאַונלאָוד סובטיטלע",
      "ניט סאַבטייטאַלז געפונען",
      "בוילטין",
      "בילכער",
      "איבערגעזעצט"
    ],
    id:[
      "Gunakan selalu HTML5",
      "mendownload streaming",
      "Tidak ada aliran ditemukan",
      "Ambil subtitle",
      "Tidak ada judul ditemukan",
      "builtin",
      "Preferred",
      "diterjemahkan"
    ],
    ga:[
      "Úsáid HTML5 i gcónaí",
      "Íosluchtaigh sruth",
      "Uimh sruthanna fuair",
      "Íosluchtaigh fotheideal",
      "Uimh fotheidil le fáil",
      "builtin",
      "Rogha",
      "aistrithe"
    ],
    is:[
      "Nota HTML5 alltaf",
      "download straum",
      "Engar vatnsföll finna",
      "download undirtitli",
      "Engin texti fundust",
      "builtin",
      "Æskileg",
      "þýtt"
    ],
    es:[
      "Utilice HTML5 siempre",
      "Descarga corriente",
      "No hay corrientes encontradas",
      "Descarga subtítulos",
      "No hay subtítulos encontrados",
      "Builtin",
      "Preferred",
      "traducido"
    ],
    it:[
      "Utilizzare HTML5 sempre",
      "Scarica flusso",
      "Nessun flusso trovato",
      "Scarica sottotitoli",
      "Senza sottotitoli trovati",
      "builtin",
      "preferito",
      "Tradotto"
    ],
    ca:[
      "Utilitzeu HTML5 sempre",
      "descàrrega corrent",
      "No hi ha corrents trobades",
      "descàrrega subtítols",
      "No hi ha subtítols trobats",
      "Builtin",
      "Preferred",
      "Traduït"
    ],
    zh:[
      "总是使用HTML5",
      "下载流",
      "没有找到流",
      "下载字幕",
      "没有字幕",
      "内置",
      "首选",
      "翻译"
    ],
    ko:[
      "항상 HTML5 를 사용하여",
      "스트림 다운로드",
      "더 스트림 을 찾을 수 없습니다",
      "자막 을 다운로드",
      "어떤 자막 이 없습니다",
      "내장",
      "선호",
      "번역"
    ],
    lv:[
      "Izmantojiet HTML5 vienmēr",
      "Lejupielādēt plūsma",
      "Nav plūsmas atrasti",
      "Lejupielādēt apakšvirsraksts",
      "Nav subtitri atrasti",
      "builtin",
      "Vēlamā",
      "Tulkotā"
    ],
    lt:[
      "Naudokite HTML5 visada",
      "parsisiųsti srautas",
      "Nėra srautai rasti",
      "parsisiųsti subtitrus",
      "Nėra subtitrai rasti",
      "builtin",
      "Pageidautina",
      "Išvertus"
    ],
    mk:[
      "Го користите HTML5 секогаш",
      "преземете поток",
      "Нема потоци се најде",
      "преземете превод",
      "Нема преводи најде",
      "вградениот светлосен",
      "префериран",
      "Превод"
    ],
    ms:[
      "Gunakan HTML5 sentiasa",
      "Muat aliran",
      "Tiada sungai yang terdapat",
      "Muat turun sari kata",
      "Tiada sarikata ditemui",
      "builtin",
      "pilihan",
      "Terjemahan"
    ],
    mt:[
      "Użu HTML5 dejjem",
      "download nixxiegħa",
      "Nru flussi sabet",
      "Niżżel sottotitolu",
      "Nru sottotitoli sabet",
      "builtin",
      "Preferred",
      "tradotti"
    ],
    de:[
      "Mit HTML5 immer",
      "Download-Datenstrom",
      "Keine Streams gefunden",
      "Download subtitle",
      "Keine Untertitel gefunden",
      "Builtin",
      "Bevorzugte",
      "Übersetzt"
    ],
    no:[
      "Bruk HTML5 alltid",
      "Last ned stream",
      "Ingen bekker funnet",
      "Last ned undertittel",
      "Ingen undertekster funnet",
      "innebygd",
      "foretrukne",
      "oversatt"
    ],
    fa:[
      "استفاده از HTML5 همیشه",
      "دانلود جریان",
      "جریان یافت نشد",
      "دانلود زیرنویس",
      "زیرنویس یافت نشد",
      "Builtin",
      "مرجح",
      "ترجمه"
    ],
    pl:[
      "Używaj zawsze HTML5",
      "Pobierz strumień",
      "Nie znaleziono strumieni",
      "Pobierz napisy",
      "Nie znaleziono napisów",
      "wbudowane",
      "Preferred",
      "przetłumaczony"
    ],
    pt:[
      "Use sempre HTML5",
      "baixar fluxo",
      "Não há fluxos encontrado",
      "legenda",
      "Não foram encontradas legendas",
      "embutida",
      "preferido",
      "traduzido"
    ],
    ro:[
      "Folosiți întotdeauna HTML5",
      "Descărcați flux",
      "Nu fluxuri de gasit",
      "Descarca subtitrarea",
      "Nu subtitrari gasit",
      "încorporat",
      "preferat",
      "tradus"
    ],
    ru:[
      "Использование HTML5 всегда",
      "Скачать поток",
      "Потоки не найдены",
      "Скачать субтитры",
      "Субтитры не найдены",
      "Встроенные",
      "Предпочтительные",
      "Переведённые"
    ],
    sr:[
      "Коришћење ХТМЛ5 увек",
      "Довнлоад стреам",
      "Нема потоци фоунд",
      "Довнлоад субтитле",
      "Нема пронађених титлова",
      "Уграђени",
      "приоритетан",
      "Преведено"
    ],
    sk:[
      "Použite HTML5 vždy",
      "stiahnuť prúd",
      "Žiadne prúdy nájdených",
      "stiahnuť titulky",
      "Bez titulkov nájdených",
      "vstavané",
      "preferované",
      "preklad"
    ],
    sl:[
      "Uporaba HTML5 vedno",
      "prenesti tok",
      "Ni najdenih tokovi",
      "Prenesi podnapis",
      "Ni najdenih podnapisov",
      "vgrajeno",
      "Želeni",
      "prevedeni"
    ],
    sw:[
      "Matumizi HTML5 daima",
      "download mkondo",
      "Hakuna mito kupatikana",
      "download Subtitle",
      "Hakuna subtitles kupatikana",
      "builtin",
      "preferred",
      "Tafsiri"
    ],
    th:[
      "ใช้ HTML5 เสมอ",
      "ดาวน์โหลด กระแส",
      "ลำธาร ไม่พบ",
      "ดาวน์โหลด คำบรรยาย",
      "คำบรรยาย ไม่พบ",
      "builtin",
      "ที่ต้องการ",
      "แปล"
    ],
    tr:[
      "Her zaman HTML5 kullanın",
      "akışı indir",
      "Hiçbir akarsu bulunamadı",
      "altyazı indir",
      "Hiçbir alt bulunamadı",
      "yerleşik",
      "tercihli",
      "Çeviri"
    ],
    uk:[
      "Використання HTML5 завжди",
      "Завантажити потік",
      "Немає потоків не знайдено",
      "скачати субтитри",
      "Субтитри не знайдені",
      "вбудовані",
      "привілейований",
      "перекладений"
    ],
    fil:[
      "Gamitin lagi HTML5",
      "I-download ang stream",
      "Walang nahanap na mga stream",
      "I-download ang subtitle",
      "Walang nahanap na mga subtitle",
      "Builtin",
      "mas gusto",
      "pagsasalin"
    ],
    fi:[
      "Käytä HTML5 aina",
      "Lataa stream",
      "Ei puroihin löytynyt",
      "Lataa tekstitys",
      "Tekstityksiä ei löydetty",
      "sisäänrakennettu",
      "Suositut",
      "käännetty"
    ],
    fr:[
      "Utilisez toujours HTML5",
      "Télécharger flux",
      "Aucun flux trouvés",
      "Télécharger sous-titres",
      "Pas de sous-titres trouvés",
      "builtin",
      "Preferred",
      "traduit"
    ],
    hi:[
      "हमेशा एचटीएमएल 5 का प्रयोग करें",
      "धारा डाउनलोड",
      "कोई धारा नहीं पाया",
      "उपशीर्षक डाउनलोड करें",
      "कोई उपशीर्षक पाया",
      "अंतर्निहित",
      "पसंदीदा",
      "अनूदित"
    ],
    hr:[
      "Koristite HTML5 uvijek",
      "Preuzmite tok",
      "Nema struje naći",
      "Preuzmite titl",
      "Niti jedan titl nije pronađen",
      "Ugrađen",
      "Željena",
      "Prevedeno"
    ],
    cs:[
      "Použijte HTML5 vždy",
      "stáhnout proud",
      "Žádné proudy nalezeno",
      "stáhnout titulky",
      "Bez titulků nalezeno",
      "vestavěné",
      "Preferované",
      "Překlad"
    ],
    sv:[
      "Använd HTML5 alltid",
      "Ladda ström",
      "Inga strömmar hittades",
      "ladda undertext",
      "Inga undertexter hittades",
      "Builtin",
      "föredragna",
      "Översatt"
    ],
    eo:[
      "Uzu HTML5 ĉiam",
      "Elŝutu rivereto",
      "Neniu rojoj trovita",
      "Elŝutu subtitolo",
      "Neniu subtitoloj trovita",
      "Builtin",
      "preferita",
      "Tradukita"
    ],
    et:[
      "Kasuta HTML5 alati",
      "Lae oja",
      "No voolu leitud",
      "Lae alapealkiri",
      "No subtiitrid leitud",
      "builtin",
      "Eelistatud",
      "tõlgitud"
    ],
    ja:[
      "常にHTML5を使用してください",
      "ストリームをダウンロード",
      "いいえストリームが見つかりませんでした",
      "字幕をダウンロード",
      "いいえ字幕が見つかりませんでした",
      "組み込み",
      "望ましい",
      "翻訳"
    ]
  };

  function t(src){
    var lang = (window.yt.getConfig('HL_LOCALE') || window.ytplayer.config.args.hl || navigator.language).toLowerCase().split(/[\-\_]/),
        msgs = l10n[lang[1] || lang[0]],
        args = arguments;
    return (msgs && msgs[l10n._.indexOf(src)] || src).replace(/\$(\d+)/g, function(_, n){
             return args[n];
           });
  }

  self.start();

})((function(){ /* only unsafe, hardcore only */
      var dummy = document.createElement('p');
      dummy.setAttribute('onclick', 'return window;');
      return dummy.onclick();
    })());
