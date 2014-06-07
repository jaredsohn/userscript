// ==UserScript==
// @name           New account webskin 
// @version	0.3
// @namespace      0
// @description	parse and edit templates on UserPage. 
// 
// @include        http://www.furaffinity.net/user/*
// ==/UserScript==


// FAParser - get originals info in page
// and test
// not all!!! 
// @todo add new groub
allGroups = [
    '-hyenaden-',
    '360furries',
    '420furs',

    'aamp',
    'aceo-trading',
    'actfuronair',
    'adlm_daily_spotlight',
    'african_american_furs',
    'aggressive_furs',
    'airforcefurs',
    'airsoft-furs',
    'alabamafurs',
    'alaskanfurs',
    'albafurs',
    'albertafurries',
    'americanfur',
    'american_furs',
    'androgyny',
    'androidos',
    'anime_furs',
    'anti-drama_llama_movement',
    'apophysis_user',
    'arabfurs',
    'argentinafurs',
    'arizona-furs',
    'arkansasfurs',
    'armyfurs',
    'asafurs',
    'asexual_furry',
    'asians',
    'assassinscreedfurs',
    'atheistfurs',
    'austria',
    'avianhouse',
    'aviationfurs',

    'babyfurartist',
    'babyfurs_united',
    'balloonwolves',
    'bavarianfurs',
    'bcfurries',
    'beastkings---pride_of_lions',
    'beetlejuicefans',
    'bellylovers',
    'betterbowserclub',
    'birminghamfurgroup',
    'bisexual_furs',
    'bjd',
    'blackfurs',
    'bluefurs',
    'boliviafurs',
    'bottomless',
    'bottomlessgirls',
    'bowserfan',
    'brasil',
    'brotherhoodofwerebears',
    'brother_luv',
    'brownfurs',
    'bunnies',
    'bunnyfoxes_united',

    'c-boys_of_fa',
    'californiafurs',
    'canadianfurs',
    'canids',
    'carnivorefurs',
    'carolinafurs',
    'catsoffa',
    'ccfurs',
    'ceara',
    'ceofurs',
    'cgfurs',
    'cheesecakelovers',
    'chevroletfurs',
    'chibi_furs',
    'child_of_sound',
    'chilefurs',
    'chnfur',
    'chocolatefurs',
    'christian-furs',
    'chubby_furs_forever',
    'cifa',
    'clan-of-werewolves',
    'classicalenthusiasts',
    'cleanartist',
    'coastguardfurs',
    'collies_united',
    'colombiafur',
    'coloradofurs',
    'communistfurs',
    'composers',
    'confederatefurs',
    'confuzzled',
    'connecticutfurs',
    'consolemodderz',
    'coonhoundfurries',
    'costaricafurs',
    'cows-of-fa',
    'creative_furs',
    'croatianfurs',
    'cublovers',
    'cub_luvers',
    'curiouscreatorsclub',
    'cutepatrol',

    'd20',
    'dalmatians',
    'dancerfurs',
    'dancingfurrieslabel',
    'danishfurs',
    'dark_art_furs',
    'dcff',
    'dependent_furs',
    'demfurs',
    'desert_knights',
    'diaper-fur',
    'diaper_furries',
    'dirtyfurs',
    'dirty_furs_4wd_team',
    'discordianfurs',
    'dnb_lovers',
    'doberman_pinscher_furs',
    'dominant_furs',
    'druidfurs',
    'dsfurs',
    'dubstepfurs',

    'earthlingfurs',
    'easternfurmeets',
    'eastpafurs',
    'electronic_furs',
    'enigma-furs',
    'equines',
    'estonianfurs',
    'europeanfurs',
    'experimentalmusic',

    'fa-werewolf-pack',
    'faccc',
    'facebook',
    'fachakats',
    'fadragons',
    'fahyenas',
    'fapaws',
    'faps',
    'fasergal',
    'faunited',
    'fazombies',
    'fa_glowstringers',
    'fa_hoofers',
    'fa_writers',
    'female',
    'femboy',
    'feralfurs',
    'ferret_furs',
    'finlandfurs',
    'fishfurs',
    'fitnessaffinity',
    'flh',
    'floridafurs',
    'floridakeysfurs',
    'fordfurs',
    'fort_wayne_furs',
    'fpc',
    'francofur',
    'frenchfurs',
    'froogleartistguild',
    'fur-felines',
    'furbuy',
    'furfright',
    'furientals',
    'furity',
    'furquebec',
    'furries-against-noob-tubes',
    'furries-from-outer-space',
    'fursuitchannel',
    'furrydialogue',
    'furryfemmefatale',
    'furryfiesta',
    'furrymusicians',
    'furrypinos',
    'furrysingers',
    'furry_libertarians',
    'furry_musicians',
    'fursfurchrist',
    'furststate',
    'furs_around_belgium',
    'furs_of_faith',
    'fur_fighters',
    'fur_punx_unite',

    'g-shepsquad',
    'ganjaarmy',
    'gassygobblers',
    'gayfurries',
    'gayzombiefurrys',
    'gearheadfurs',
    'geckos',
    'georgiafurs',
    'germanfurs',
    'ghostbusters',
    'girlyfurs',
    'gleek_furs',
    'glee_furs',
    'glowfurs',
    'gold-dragons',
    'gopfurs',
    'gothfurs',
    'grayfurs',
    'greenfield_in-furs',
    'greenfurs',


    'greenlandfurs',
    'guild_of_calamitous_intent',
    'guineapigfurs',
    'guy_fur',

    'habitat',
    'halloweenfurs',
    'hamfurs',
    'hardcorefurs',
    'hawaiifurs',
    'hdr',
    'healthcarefurs',
    'helptoimprove',
    'hermfurs',
    'hesse_furs',
    'hetero_furry',
    'hiphopmilitia',
    'history_furs',
    'hockeyfurs',
    'hollywood_furs',
    'hondaacurafurs',
    'hooray_plushies',
    'hospitality_furs',
    'howlers',
    'huskiesoffa',
    'huskyclub-fa',
    'hybrid_furs',
    'hypnofurs',

    'i-luv-tentacles',
    'icelandfurs',
    'idaho_furs',
    'illinoisfurs',
    'ilovehiphop',
    'iloveyiff',
    'indianafurs',
    'inflatingfurssociety',
    'iowafurs',
    'irken-zim',
    'iruinedthemagic',
    'isleofyoshi',
    'israelifurs',
    'italianfurs',
    'iwanttobeheard',
    'i_h8critique',
    'i_hate_critique',
    'i_love_critique',
    'i_love_gimp',
    'i_love_reggae',
    'i_love_tea',

    'jackal_connection',
    'japanesefur',
    'japanfur',
    'jdmfurs',
    'jeepfurs',
    'jerseyfurs',
    'jewfurs',
    'juggalo_furries',
    'juggler_furs',

    'kangaroo_mob',
    'kansasfurs',
    'kentuckyfurs',
    'killing-time',
    'kingdom_heart_furs',
    'kitsunearchives',
    'koreanfur',

    'ladies-of-pinup',
    'lamplight_labs',
    'lanternfurs',
    'laveyanfurs',
    'lazy_furs',
    'leftfurdead',
    'lesbianfurs',
    'linux-furs',
    'lithuanianfurries',
    'little_monsters_unite',
    'long-earfurs',
    'longboardfurs',
    'louisiana_furs',
    'loyalfurs',
    'lutrinae-ottah',
    'luvthemcurves',
    'lynxoffa',

    'macabre_furs',
    'macfurs',
    'macrofurries',
    'mad23',
    'maine_furs',
    'malaysia_furs',
    'malefurs',
    'maltesefur',
    'manitobafurs',
    'maroon-steel-furs',
    'married_furries',
    'marylandfurs',
    'masochists_of_fa',
    'massfurs',
    'mastersoffa',
    'mecha-furs',
    'memphis-furs',
    'men-of-pinup',
    'metalfurs',
    'metalfursunited',
    'metalheadfurs',
    'mexicanfurs',
    'michiganfurs',
    'midfur',
    'military-furs',
    'militaryspouses',
    'minas-gerais',
    'minnesotafurs',
    'mississippifurs',
    'missourifurs',
    'missourisfurries',
    'mitsubishifurs',
    'mnfurs',
    'mobiansunited',
    'monsterfurs',
    'monstersoffa',
    'montanafurs',
    'moparfurs',
    'mormonfurries',
    'morphicon',
    'mspaintfurs',
    'musclegutfurs',
    'musicfur',
    'muslim_furs',
    'mustelids',
    'mx_furs',

    'navyfield_furs',
    'navyfurs',
    'nebraska_furs',
    'neofurs',
    'neopets',
    'nevadafurs',
    'newbrunswickfurs',
    'newcastlefurs',
    'newfoundlandfurs',
    'newhampshirefurs',
    'newjerseyfurs',
    'newyorkfurs',
    'nissan_furs',
    'nintendofurs',
    'nlfurs',
    'nmfurs',
    'nocalfurs',
    'nonfurs',
    'nonononogunsonfa',
    'nononononogunsonfa',
    'nonotes',
    'northwestfurs',
    'norwayfurs',
    'norwegianfurs',
    'notafoxclub',
    'notyiffy',
    'novascotiafurs',
    'nrafurs',
    'ny_furs',
    'nzfurs',

    'ohiofurs',
    'oklahomafurs',
    'oldschoolgamers',
    'ontariofurs',
    'open_arms',
    'operationoverlord',
    'opossums-of-fa',
    'orangefurs',
    'order_chiroptera',
    'oregonfur',
    'oregonfurs',
    'orlandofurs',
    'outgoing_furs',
    'overlooked',
    'ozfurs',
    'ozgamers',

    'pacifier_furry',
    'paganfurs',
    'paintball_furs',
    'pangolin_in_pants',
    'pansexual_furry',
    'paraguayfurs',
    'parentfurs',
    'parkourfurs',
    'pcfurs',
    'peeweefans',
    'pennsylvania_furs',
    'peru-furs',
    'phillyfurs',
    'photografurs',
    'photographyfurs',
    'pierced',
    'pinkfurs',
    'pirates',
    'playful_furs',
    'playstation3furs',
    'pmcfurs',
    'poets-guild',
    'poisonfurs',
    'pokecombatacademy',
    'pokemonfurries',
    'pokestarrangers',
    'policefurs',
    'polishfurs',
    'polyamorous',

    'portuguesefur',
    'pow-mia',
    'procrastinatorfurs',
    'projectgirllove',
    'protective_furs',
    'ps3furs',
    'pspfurs',
    'punkfurs',
    'purplefurs',
    'purple_collar_club',

    'qatarfur',

    'rabbit-breeders-club',
    'railwayfurs',
    'rainbowfurs',
    'rainfurrest',
    'rawrschach',
    'rbw',
    'realgangstersclub',
    'redfurs',
    'retrieversoffa',
    'rhein-furmeet',
    'rhodeislandfurs',
    'ricanfurs',
    'rmfc',
    'rockabillyfurs',
    'rocketinc',
    'rodentfurs',
    'rottweilers',
    'rubber-furs',
    'russfurs',
    'russian-furs',

    's4leaguefurs',
    'sacfursdotcom',
    'sac_furs',
    'salamanders',
    'saopaulo',
    'sardiniafurs',
    'saskatchewanfurs',
    'saskfurries',
    'scaliesoffa',
    'scat',
    'scent-marks',
    'sciencefurs',
    'scottishfur',
    'secondlife',
    'selfreliant_furs',
    'shamanfurs',
    'sharks-of-fa',
    'shuttershades',
    'shy_furs',
    'ska_furz',
    'skunkfurs',
    'slaves_of_fa',
    'sledpullersoffa',
    'slofurs',
    'snakekeepers',
    'socalfurs',
    'sodapups',
    'sodaroos',
    'souleaterfurs',
    'soundstyles',
    'southdakotafurs',
    'spain',
    'species_x_change',
    'spotcatsoffa',
    'squirrelsoffa',
    'squishyfrogstudios',
    'starbucksfurs',
    'steamfurries',
    'steamfurs',
    'steampunkfurs',
    'stockingsforfun',
    'straightfurs',
    'straight_furries',
    'stuckfan',
    'studious_furs',
    'subaru_furs',
    'subeta',
    'submissive_furs',
    'survivor_furs',
    'swaggadawgs',
    'swedishfur',
    'swissfurs',
    'synthpopfurs',

    'tacobellclub',
    'taiwanfur',
    'tampafurs',
    'tattoo-artists',
    'teamrocket',
    'team_magma_furs',
    'team_tf',
    'texas-furry',
    'texasfurs',
    'tf2furs',
    'tf_furs',
    'the_furry_clan',
    'the-humbled-option',
    'thebearden',
    'thebeastsofthejungle',
    'thefloridafurs',
    'thefurrychat',
    'thejokerclub',
    'themetamorkeepguild',
    'themogsquad',
    'theshowcaseclub',
    'the_chocobo_cartel',
    'the_flock',
    'the_furry_art_academy',
    'the_huskybutt_brotherhood',
    'the_rising_dawn',
    'the_sex_college',
    'thuringiafurs',
    'tnfurs',
    'tolerant-furs',
    'torontofurs',
    'toyotafurries',
    'toysoldiersunite',
    'traditionalartists',
    'traditional_media',
    'transformersfanclub',
    'transfurs',
    'transgenderedfurs',
    'trekfurs-ufop',
    'triangle_furs',
    'truckerfurs',
    'twitter',
    'twlohafurs',

    'ukfurs',
    'umbrella-corp',
    'unitednations',
    'united_musclefurs',
    'uruguay',
    'usmcfurs',
    'utah-furs',
    'utahfurs',

    'vagfurs',
    'vegetarianfurs',
    'venezuelanfurs',
    'vermont_furs',
    'vietfur',
    'vietnamesefurries',
    'virginiafurs',
    'virgin_furs',
    'volvofurs',
    'vore-furs',

    'wajas',
    'washingtonstatefurs',
    'waterworks',
    'welovefelines',
    'welshfurs',
    'werefurs',
    'westpafurs',
    'whitefurs',
    'whoozfur',
    'wildlife_warriors',
    'wisconsin_furs',
    'wowfurs',
    'wrestling_furs',
    'writersblock',
    'wvfurs',
    'wyomingfurs',

    'xtremesportfur',

    'yakifur',
    'yellowfurs',
    'yiffindor',
    'yoopers',
    'yuri-genre',

    'za-fur',
    'zebra_fan',
    'zeldafurs',
    'zeonfurs',
    'zombie-furs',
    'zoofonics'
    
    ];
    
    
function getFAVars(_var){
    if((typeof  unsafeWindow ) == 'undefined'){
        return  self[_var] ;
    }
    
    return  self[_var] = unsafeWindow[_var];
}

FAParser = {
    
    _parsers:[],
   
    registred: function(addClass){
        FAParser._parsers.push(addClass)
    }, 
   
    run: function( ){
   
        FAParser._parsers.each(function(objParse ){
            // for( var i in this._parsers){
            //  objParse = this._parsers[i];
        
            objParse.parse();
            objParse.test();
        }
        );
    },
    
    _waitParse: function(){

console.log(FAParser._parsers);
        FAParser._parsers.each(function(objParse ){
            if(!objParse.parseComplited){
                return true;  
            }
        }
        );
         
        return false;
    },
    
    view: function(){
     
    
      
        var t ;
        t = new  gs_tpl() ;
        t.setTpl(__tpl);
        FAParser._parsers.each(function(objParse ){
            t.setFetch(objParse.vars);
              
        } );
        
        document.body.innerHTML = t.getTpl();
  
    }     
    
}
_getFirstElemm = function(e){
    if(!e.length){
        return false;
    }
    return e[0];
        
};
_getFirstInnerHtmlElemm = function(e){
    if(!e.length){
        return false;
    }
    return e[0].innerHTML;
        
};



_UserTopInfo={
    // regexp urls
    url:[''],
    parseComplited:false,
    vars:{
       
        
    },
   

    // get info from pages 
    parse: function(){
    
        // user login or no ?
    
        if($$('td.alt1 font a')[0].innerHTML=='Guest'){
            this.vars.MyNoAuth = true;
        
        
        }else{
            this.vars.MyNoAuth = false;
            // $$('td.alt1 p a') //4825 new messages ( 170S, 275C, 4365J, 15W ) 
            // $$('td.alt1 p a')[0] // all messages
            // $$('td.alt1 p a')[1] //  170S
            //  275C
            //   4365J
            //   15W 


            this.vars.MyNameA =   $$('td.alt1 font a')[0] ;     // user name link
            this.vars.MyLogin = this.vars.MyNameA.getAttribute('href').match(/\/user\/(.*?)\//)[1]; // lottir
            this.vars.MyName = this.vars.MyNameA.innerHTML; // Lottir
        
            this.vars.MyAllMess = $$('td.alt1 p a')[0].innerHTML;
            this.vars.MyS = $$('td.alt1 p a')[1].innerHTML;   
            this.vars.MyCJM = $$('td.alt1 p a')[2].innerHTML;   
      
        /*    this.vars.MyS = $$('td.alt1 p a')[1].innerHTML;       
        this.vars.MyC = $$('td.alt1 p a')[2].innerHTML;     
        this.vars.MyJ = $$('td.alt1 p a')[3].innerHTML;     
        this.vars.MyW = $$('td.alt1 p a')[4].innerHTML;     
         
    */                             
        
        }
        this.parseComplited=true;
    },
    // see vars and alerts error parse
    test: function(){
        
     
    } ,    
    
    // parse user info 
    _parseUserInfo: function(){
        // 
        this.vars.UaccInfo ={};
        /*
          Full Name: Canadians Furs
        Artist Type: Photographer
        Registered since: March 16th, 2009 07:06
        Current mood: accomplished
        Artist Profile:
 
  **/
        var re = /<b>(.*?)<\/b>(.*?)</g;
        while ( (  res =  re.exec( this.vars.UabouteFull)) != null) {
            // res[1] = res[1].substr(0,res[1].length-1 );
      
            if(res[1]=='Artist Profile:'){
                this.vars.UaccInfo[res[1]] = this.vars.UabouteFull.substr(re.lastIndex-1, this.vars.UabouteFull.length )  ;
                break;
            }  
            this.vars.UaccInfo[res[1]] = res[2];
       

        }
        
        
    } 
}

FAParser.registred(_UserTopInfo);


/*
 User Info tags

COMMISSIONS: CLOSED
COMMISSIONS: OPEN 

@todo add new tags
 */
_UserMain={
    // regexp urls
    url:[''],
    parseComplited:false,
    vars:{
       
    },
    _getFirstElemm:function(e){
        if(!e.length){
            return false;
        }
        return e[0];
        
    },
    _getFirstInnerHtmlElemm:function(e){
        if(!e.length){
            return false;
        }
        return e[0].innerHTML;
        
    },

    // get info from pages 
    parse: function(){
        var p;
        
        this.vars.Uname = $$('td.addpad b')[0].innerHTML ; // user name
        this.vars.UAvatarImg = $$('td.addpad a img')[0].getAttribute('src') ; // img avatar;
        this.vars.Ulogin =this.vars.UAvatarImg.match(/\/([^\/]*?)\.gif/)[1] ; // img avatar;
        
        this.vars.UabouteFull = $$('table.maintable tbody td.ldot')[0].innerHTML; // about;
        this._parseUserInfo();
        
        this.vars.UinfoFull = $$('table.maintable tbody tr td.alt1 table tbody tr td.ldot table tbody tr td')[1].innerHTML // info  Pageviews: 10272 Submissions: 1
        this._parseInfo();
             
             
        // featured-submission   OR-NOT
        this.vars.UIfeatImg = this._getFirstElemm( $$('#featured-submission a img')); 
         
        if(this.vars.UIfeatImg ){
            this.vars.UIfeatHref=  $$('#featured-submission a')[0].getAttribute('href');
            this.vars.UIfeatSrc = this.vars.UIfeatImg .getAttribute('src');
            this.vars.UIfeatTitle = $$('#featured-submission')[0].innerHTML.match(/<br>(.*?)$/)[1];
        }else{
            UIfeatSrc  = UIfeatTitle = false;
            
        }
        //0 first 1..9 small   
        /// url https://t.facdn.net/6890510@75-1321839041.jpg
        /// https://t.facdn.net/6890510@WIDTH-1321839041.jpg
            
        getFAVars( 'submission_data'); 
      
        this.vars.UIlastsubImg_arr = $$('#latest-submissions dd a');
        this.vars.UIlastsubImgs ={};
     
        if(this.vars.UIlastsubImg_arr.length){
            var e, i;
            i=0;
            _UserMain.vars.UIlastsubImg_arr.each( function(a){
             
                e =  a.innerHTML.match(/\/(\d*?)@/)[1];
                _UserMain.vars.UIlastsubImgs[i]={};
                _UserMain.vars.UIlastsubImgs[i].href =   '/view/'+e+'/';
                _UserMain.vars.UIlastsubImgs[i].src =   'https://t.facdn.net/'+e+'@75-'+submission_data[e].date+'.jpg'
                _UserMain.vars.UIlastsubImgs[i].title =   submission_data[e].title;
                _UserMain.vars.UIlastsubImgs[i].fullSrc = 'https://t.facdn.net/'+e+'@300-'+submission_data[e].date+'.jpg' ;
                _UserMain.vars.UIlastsubImgs[i].dateHtml = submission_data[e].html_date ;                
                i++;
            }
            );
        }else{
            UIlastsubImgs = false;
        }
    
        this.vars.UIlastfavImg_arr = $$('#latest-favorites dd a');
        this.vars.UIlastfavImgs ={};
        if(this.vars.UIlastfavImg_arr.length){
            var e, i;
            i=0;
            _UserMain.vars.UIlastfavImg_arr.each( function(a){
                
                e =  a.innerHTML.match(/\/(\d*?)@\d*?-(\d*?)\./);
            
                _UserMain.vars.UIlastfavImgs[i]={};
                _UserMain.vars.UIlastfavImgs[i].href =   '/view/'+e[1]+'/';
                _UserMain.vars.UIlastfavImgs[i].src =   'https://t.facdn.net/'+e[1]+'@75-'+(e[2])+'.jpg'
                _UserMain.vars.UIlastfavImgs[i].title =   submission_data[e[1]].title;
                _UserMain.vars.UIlastfavImgs[i].fullSrc = 'https://t.facdn.net/'+e[1]+'@300-'+(e[2])+'.jpg' ;
                _UserMain.vars.UIlastfavImgs[i].dateHtml =submission_data[e[1]].html_date ;                               
                i++;
            }
            );
        }else{
            UIlastfavImgs = false;
        }                
        
         

        /* */
 
        this.vars.UlastJourTitleA =  this._getFirstElemm( $$('table.maintable tbody tr td.cat div.no_overflow a')) ; // last jornal title;
        
        if(  this.vars.UlastJourTitleA != false){
            this.vars.UlastJourTitleHref = this.vars.UlastJourTitleA.getAttribute('href');
            this.vars.UlastJourTitle = this.vars.UlastJourTitleA.innerHTML;
                
            this.vars.UlastJourDate  =  $$('table.maintable tbody tr td.alt1 table tbody tr td.alt1 table tbody tr td span.popup_date')[0]; 
            this.vars.UlastJourDateText = this.vars.UlastJourDate.innerHTML;
   
            this.vars.UlastJourText   = $$('table.maintable tbody tr td.alt1 table tbody tr td.addpad div.no_overflow')[0].innerHTML; 
         
            // last jornal  11 days ago;
       
            this.vars.UlastJourCommA =   $$('table.maintable tbody tr td.alt1 table tbody tr td.alt1 table tbody tr td a')[0] ;// last jornal comments;
            this.vars.UlastJourCommText =    this.vars.UlastJourCommA.innerHTML;
        
            this.vars.UlastJourCommHref =    this.vars.UlastJourCommA.getAttribute('href');
        }else{
            this.vars.UlastJourDate =     this.vars.UlastJourText = this.vars.UlastJourCommA =  UlastJourTitle = false;
        }

        // Favorites
         
        //this.vars.UIfavImg_arr =   $$('#profilepic-submission a img');
           
        this.vars.UpeopInfoFull = this._getFirstInnerHtmlElemm($$('table.maintable tbody tr td.user-info')) ; // user-info; Age: 19
        this._parsePeopInfo();
        
        this.vars.UcontactsFull = this._getFirstInnerHtmlElemm($$('table.maintable tbody tr td.user-contacts')); // contacts;
        this._parseContacts();
 
        this.vars.UlastWatchA_arr =  $$('#watched-by.alt1 table tbody tr td.padding_left a'); /// last watches;
        
        // if user not login not 
        
        this.vars.UwatchTrigerFull = this._getFirstElemm( $$('tr.innertable td table tbody tr td table tbody tr td div.tab b a') ) ; //-Watch or  +Watch;
        this.vars.UwatchTrigerText =this._getFirstInnerHtmlElemm( $$('tr.innertable td table tbody tr td table tbody tr td div.tab b a font'));
        
        if(this.vars.UwatchTrigerText){
            this.vars.UwatchTrigerA  =   this.vars.UwatchTrigerFull.getAttribute('href');
        }else{
            this.vars.UwatchTrigerA  = this.vars.UwatchTrigerText = this.vars.UwatchTrigerFull = false;
        }
        
        if(!_UserTopInfo.vars.MyNoAuth) {
            this.vars.UmainComments_skey = $$('#JSForm input[name=key]')[0].getAttribute('value');
            
        }

           
        this.vars.UmainComments_arr   = $$('table tbody tr td table.maintable');
        this._parseMainComments();
        
        this.parseComplited=true;
        
    },
    // see vars and alerts error parse
    test: function(){
        
     
    } ,    
    
    // parse user info 
    _parseUserInfo: function(){
        // 
        this.vars.UaccInfo ={};
        this.vars.UartistProfile ='';
        /*
          Full Name: Canadians Furs
        Artist Type: Photographer
        Registered since: March 16th, 2009 07:06
        Current mood: accomplished
        Artist Profile:
 
  **/
        var re = /<b>(.*?)<\/b>(.*?)</g;
        while ( (  res =  re.exec( this.vars.UabouteFull)) != null) {
            // res[1] = res[1].substr(0,res[1].length-1 );
      
            if(res[1]=='Artist Profile:'){
                this.vars.UartistProfile = this.vars.UabouteFull.substr(re.lastIndex-1, this.vars.UabouteFull.length )  ;
                break;
            }  
            this.vars.UaccInfo[res[1]] = res[2].replace(/<br>/g, '');
        }
        
        this._parseUserInfoProfile()
        
    } ,
     
    // parse user info 
    _parseUserInfoProfile: function(){
        // OPEN / CLOSED
        this.vars.UcommisStat ='';
        if( /COMMISSIONS: CLOSED/.test(this.vars.UartistProfile) ){
            this.vars.UcommisStat = 'CLOSED';
        }else if(/COMMISSIONS: OPEN/.test(this.vars.UartistProfile) ){
            this.vars.UcommisStat = 'OPEN';  
        }else{
            this.vars.UcommisStat = false;
        }
        // parse groups 
        
        this.vars.Ugroups =[];
 

    

        this.vars.UartistProfile = this.vars.UartistProfile.replace(/<a href="\/user\/([^>]*?)" class="iconusername">[\s\S]*?<\/a>/g, _UserMain._serchGroupsReplacer);
       
        
    } ,  
    
    _serchGroupsReplacer:  function (s, m0, o){
    
        allGroups.each(function(g ){
            if(g==m0){
              
                _UserMain.vars.Ugroups.push(m0);
                return '';
            }
        });
        return s;
 
    }
    ,
    _parseInfo: function(){
        // 
        this.vars.UInfo ={};
        /*
        Pageviews: 1376
        Submissions: 14
        Comments Received: 727
        Comments Given: 1026
        Journals: 22
        Favorites: 115
      */
        var re = /<b>([\s\S]*?)<\/b>([\s\S]*?)</g;
        while ( (  res =  re.exec( this.vars.UinfoFull)) != null) {
            //   res[1] = res[1].substr(0,res[1].length-1 );
            this.vars.UInfo[res[1]] = res[2];     
        }
      
    },
    
    _parsePeopInfo: function(){
        // 
        this.vars.UpeopInfo ={};
        /*
    Species: Wolfie
    Age: 2
    Operating system: Vista/psp
    Personal quote: Friends Come And Go But Some Friends Become Part Of You
    Music type/genre: Almost anything but Screamo and Country
    Favorite movie: Twister (1996)
    Favorite game: Call Of Duty Black Ops/Parasite Eve 2
    Favorite game platform: Xbox 360,Play Station Portable
    Music player of choice: Play Station Portable/Youtube
      **/
   
        var re = /<span>(.*?)<\/span>(.*?)</g;
        while ( (  res =  re.exec( this.vars.UpeopInfoFull)) != null) {
            //   res[1] = res[1].substr(0,res[1].length-1 );
            this.vars.UpeopInfo[res[1]] = res[2];     
        }
    } ,  
    
     
    _parseContacts: function(){
        // 
        this.vars.Ucontacts ={};
               
      
        /*
    MSN: 	Bio_Hazzerd@Hotmail.com
    Yahoo: 	Camo019@Yahoo.com
    Skype: 	xxelvarxx
    XBox Live: 	xELVARx
      **/
 
        var re = /<strong>(.*?)<\/strong>\s*?<\/th><td>(.*?)<\/td>/mg;
        while ( (  res =  re.exec( this.vars.UcontactsFull)) != null) {
            //   res[1] = res[1].substr(0,res[1].length-1 );
            this.vars.Ucontacts[res[1]] = res[2];     
        }
    },    
    
        
    _parseMainComments: function(){
        // 
        this.vars.UmainComments ={};
               
      
        /*
    MSN: 	Bio_Hazzerd@Hotmail.com
    Yahoo: 	Camo019@Yahoo.com
    Skype: 	xxelvarxx
    XBox Live: 	xELVARx
      **/
        var elem, r;
        var  i=0;
        var t = this.vars;
        //for(var i in UmainComments_arr){
        _UserMain.vars.UmainComments_arr.each(function(elem ){
            i++;

            // elem = this.vars.UmainComments_arr[i];
            elem_html = elem.innerHTML;
            if(!( /shout-\d+/.test(elem.getAttribute('id') ) )){
                return;
            //        continue
            }
            r =  elem_html.match(/<a href="\/user\/(.*?)\/">([^>]*?)<\/a>/);
            _UserMain.vars.UmainComments[i]={};
            
            _UserMain.vars.UmainComments[i]['AutorImg'] = 'https://a.furaffinity.net/'+ r[1]+'.gif';
           _UserMain.vars.UmainComments[i]['Autor'] =r[1];
            _UserMain.vars.UmainComments[i]['AutorName'] =r[2]; 
            //<span title="March 14th, 2012 06:22 AM" class="popup_date">2 days ago</span>
            r =  elem_html.match(/class="popup_date".*?>(.*?)<\/span>/); 
             _UserMain.vars.UmainComments[i]['date'] =r[1];
            r =  elem_html.match(/<div class="no_overflow alt1">([\s\S]*?)<\/div>/); 
             _UserMain.vars.UmainComments[i]['text'] =r[1];  
        });
    //     );
     
    }    
    
}
 
FAParser.registred(_UserMain);

 
 
/*
 UabouteFull.replace(/<span class="bbcode" style="color:[^>]*?">[^>]*?<\/span>(<span class="bbcode" style="color:[^>]*?">[^>]*?<\/span>)* /g,  _serchGroupsReplacer);
 
// main user morda
 
*/

if (!Array.prototype.each)
{
    Array.prototype.each = function(fun /*, thisp*/)
    {
        var len = this.length;
        if (typeof fun != "function")
            throw new TypeError();

        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in this)
                fun.call(thisp, this[i], i, this);
        }
    };
}

if(!Object.prototype.each){
    Object.prototype.each = function(f) {
        for(var prop in this) {
            if (Object.prototype.hasOwnProperty(prop)) continue // filter
            var value = this[prop]
            f.call(value,  value, prop) 
        }
    }

}   
__tpl='<style>    body{        font-family: arial,sans-serif;        background: #2E3B41;        font-style: normal;        font-variant: normal;        margin: 0;        padding: 0;       }    a, A:link , a:hover, .auto_link, .auto_link:link, .auto_link:visited{        text-decoration: none;        font-weight: bold;        color:#FFB73B;    }    TABLE, TR, TD, TH {        font-family: arial,sans-serif;        font-size: 12px;    }    table  {        border:0;        padding:0;        border-collapse:collapse;    }    table td  {        padding:0;    }     .lTitle{        background:#333333;        color: #fff;        font-size: 12px;        padding:8px;        /*  margin:3px;*/    }    .avname{        font-size: 16px;        font-weight: bold;        padding:4px;    }    .lBody, .lBody div {        background:#1B1E21;        color: #fff;        font-size: 13px;        padding:8px;        max-width: 200px;        width: 200px;        white-space: pre; /* CSS 2.0 */       white-space: pre-wrap; /*  CSS 2.1 */        white-space: pre-line; /* CSS 3.0 */        /*white-space: -pre-wrap;  /* Opera 4-6 */      /* white-space: -o-pre-wrap;  /* Opera 7 */        white-space: -moz-pre-wrap; /* Mozilla */        white-space: -hp-pre-wrap; /* HP Printers */        word-wrap: break-word; /* IE 5+ */        /*  margin:3px;*/    }         .lBody div {        max-width: 180px;        width: 180px;     }      .lTitle span, .lBody span{        font-size: 14px;        font-weight: bold;        padding:0 0 4px 0;    }    .user_info{        padding:4px;    }    .user_info a{        color: #fff;        font-family: arial,sans-serif;        font-size: 13px;        font-weight: bold;    }             .addwatch a{        color: #FFB73B;        font-style:italic;    }               .user_info p{        padding: 0 0 3px 5px;        margin: 0;    }    .comissStatOpen{        color:#27D928;        font-size: 14px;        font-weight: bold;        text-transform:uppercase;    }    .comissStatClosed{        color:red;        font-size: 14px;        font-weight: bold;        text-transform:uppercase;    }    .groups{        padding: 5px;        font-size: 10px;        font-weight: bold;    }    .groups  a img{        max-height: 70px;        max-width: 70px;        padding: 5px;    }    .groups a  {        color: #fff;    }             .u_gallery{        margin: 0 10px 0 10px;    }    .u_gallery td {        text-align: center;    }    .ug_title {        font-size: 16px;        font-weight: bold;         background:#1B1E21;        padding: 7px;        color: #fff;    }    .ug_img {        padding: 10px    }    .ug_imgTitle {         font-size: 14px;        font-weight: bold;        color:#FFB73B;        padding: 7px;    }			    .ug_imgTitle  .date {         font-size: 11px;        font-weight: bold;        color:#fff;    }    .rSearch{        background: #515151;        color: #fff;        font-size: 13px;        /*padding:5px 5px 0 5px;   */                }    .journal{        background: #666666;        color: #fff;        font-size: 13px;        padding:10px 5px 5px 5px;    }    .journal .jDate{        font-size: 10px;        background: #000;        margin-top: 3px;         padding: 3px;    }            .journal .jTitle a, .journal .jTitle a:hover{        font-size: 16px;        font-weight: bold;        color: #fff;    }     .journal .jText,  .journal .jText div{        max-width: 330px;        width: 330px;                padding: 3px;        white-space: pre; /* CSS 2.0 */       white-space: pre-wrap; /*  CSS 2.1 */        white-space: pre-line; /* CSS 3.0 */        /*white-space: -pre-wrap;  /* Opera 4-6 */      /* white-space: -o-pre-wrap;  /* Opera 7 */        white-space: -moz-pre-wrap; /* Mozilla */        white-space: -hp-pre-wrap; /* HP Printers */        word-wrap: break-word; /* IE 5+ */    }           .journal .jText div{        max-width: 320px;        width: 320px;        }                  .usersImages{        margin:35px auto;         width: 90%;    }    .comments{        padding:  10px;        background: LightSlateGrey;        font-size: 13px;         color: #fff;        max-width: 330px;        white-space: pre; /* CSS 2.0 */        white-space: pre-wrap;/*  CSS 2.1 */        white-space: pre-line; /* CSS 3.0 */       /* white-space: -pre-wrap;  Opera 4-6 */    /*    white-space: -o-pre-wrap;  Opera 7 */        white-space: -moz-pre-wrap; /* Mozilla */        white-space: -hp-pre-wrap; /* HP Printers */        word-wrap: break-word; /* IE 5+ */    }    .commImg{        background:#2E3B41;        float: left;        padding: 5px;    }    .commName{        background:#1B1E21;        color: #fff;        font-size: 18px;        padding: 10px 20px 10px 0 ;        text-align: right;    }      .commName a ,   .commName a:hover,  .commName a:link{             color: #fff;        font-size: 18px;             }      .commDate{        font-size: 10px;         color: #fff;        background: #000;        padding: 3px;        margin-bottom: 5px;        text-align: right    }    .userLBlock{        position: absolute;         left: 15px;        top: 160px;    }    .userRBlock{              margin-bottom: 0;        margin-left: auto;        margin-right: 0;        margin-top: 0;        position: absolute;               top: 160px;        width: 350px;    }    .fhead{        height: 125px;    }    .hidden{        display: none;    }    .q_input{        background: #1B1E21;        width: 270px;        height: 55px;        float:  left;    }    #q{        background: #1B1E21;         border: 0;        color: #fff;        padding-left: 20px;        width: 250px;        height: 50px;        font-size: 18px;       }    .listbox{        width: 80px;        height: 55px;        font-size: 14px;       }    .userMainbar{        position: absolute;        top: 0;        right: 0px;        width: 400px;    }    .userMainbar .barB{        background: #333333;        /*     border:5px   solid #1B1E21 ;        border-top: 0;          */        width: 80px;        height: 50px;        text-align: center;    }    .userMainbar .barB a{        color: #BFBFBF;        font-size: 13px;    }       .userMainbar .myNotice {        width: 90px;        text-align: center;        background: #1B1E21;    }    .userMainbar .myNotice a{        color: #fff;        font-size: 14px;    }                    .userMainbar .LoginOut {        width: 120px;        text-align: center;        /*  padding-top: 10px;  height: 50px; */    }    .userMainbar .LoginOut a{        color: #EBEBEB;        font-size: 16px;    }             .userMainbar .uMessage  {        text-align: right;    }               .userMainbar .uMessage a{        color: #fff;        font-size: 13px;    }                  .Jcomm{        background-color: #333333;        float: right;        font-size: 19px;        font-weight: lighter;        height: 46px;        line-height: 45px;        text-align: center;        width: 165px;        margin: 6px;    }        .Jcomm a{        background-color: #333333;        color: #fff;    }                 /*  #search-form{                    position: absolute;          top: 100px;          right: 10px;      }*/    .commImgPadd{        width: 15px;        height: 35px;        float: left;    }    #JSForm .button{        background: #666666;        border: 1px #666666 solid;        color: #FFFFFF;        font-size: 16px;        font-family: arial,sans-serif;        letter-spacing: 2px;        padding: 10px  ;        margin: 0;        cursor: pointer;    }    .AddcommImgBody{        padding-top: 20px;    }    .addCommTextarea {        text-align: center;        padding: 10px 0 10px 0;        background: #666666;    }          .addCommTextarea textarea{        background: #666666;        border: 1px #666666 solid;        width: 310px;    }                   .addCommSmiles img{        float: nome;        padding: 3px;    }    .ug_imgs img{        padding: 3px;    }</style> <table class="fhead" border="0" width="100%">    <tr>        <td width="525"><img src="http://www.furaffinity.net/img/banners/logo/2012_02_leeden.jpg"> </td>        <td >            <div class="userMainbar">                <% if(MyNoAuth) { %>                <table border="0" width="100%">                    <tr>                        <td class="LoginOut" ><a href="/logout/"> ~Guest </a></td>	                        <td class="barB"><a href="/submit/">Login</a></td>                        <td class="myNotice"><a href="/controls/journal/">Register</a></td>                    </tr>                </table>                                       <% }else{ %>                <table border="0" width="100%">                    <tr>                        <td class="barB"><a href="/submit/">Submit</a></td>                        <td class="barB"><a href="/controls/journal/">Journal</a></td>                        <td class="barB"><a href="/controls/">Settings</a></td>                        <td class="myNotice"><a href="/msg/pms/">Notice</a></td>                        <td class="LoginOut" ><a href="/logout/">Login out</a></td>		                    </tr>                    <tr>                        <td  class="uMessage" colspan="4"> <a href="/controls/messages/"><%=  MyAllMess  %></a> (                            <a title="Submissions" href="/msg/submissions/"><%=   MyS  %></a>,                            <a title="Comments, Journals, Favorites, and Watches" href="/msg/others/">                                <%= MyCJM %></a> )                          </td>                    </tr>                                          </table>                <% } %>            </div>        </td>    </tr></table><table  width="100%">    <tr>        <td width="200">            <table class="userLBlock"  width="200">                <tr >                    <td class="avname lTitle"><%= Uname  %> </td>                </tr>                <tr>                    <td class="lBody">                        <table width="100%">                            <tr>                                <td width="100"><img src="https://a.furaffinity.net/<%= Ulogin  %>.gif"></td>                                <td class="user_info">                                    <p><a href="/gallery/<%= Ulogin  %>/">Gallery</a></p>                                    <p><a href="/scraps/<%= Ulogin  %>/">Scraps</a></p>						                                    <p><a href="/journals/<%= Ulogin  %>/">Journals</a></p>                                    <p><a href="/favorites/<%= Ulogin  %>/">favorites</a></p>	                                    <p><a href="/newpm/<%= Ulogin  %>/">Send Note</a></p>                                    <% if (UwatchTrigerFull){ %>                                      <p class="addwatch"><a href="<%= UwatchTrigerA  %>/">                                            <% if (UwatchTrigerText ==\'+Watch\'){ %>                                              +Watch                                            <% }else{ %>                                            -Watch                                            <% } %>                                        </a></p>                                    <% } %>                                </td>                            </tr>                            <% if (UcommisStat){ %>                              <tr>                                <% if (UcommisStat ==\'OPEN\'){ %>                                  <td class="comissStatOpen" colspan="2">Commissions Open</td>                                <% }else{ %>                                <td class="comissStatClosed" colspan="2">Commissions Closed</td>                                <% } %>                                                                    </tr>                            <% } %>                               </table>                    </td>                </tr>                <tr>                    <td class="lTitle">                        <% UaccInfo.each(function(v, infoName){  %>                        <b><%= infoName%></b>  <%= UaccInfo[infoName] %><br>                        <% }); %>                    </td>                </tr>                <tr>                    <td class="lBody"><span>Artist Profile:</span><%= UartistProfile %></td>                </tr>                <tr>                    <td class="lTitle"><span>Contacts</span>                         <% Ucontacts.each(function(v, infoName){  %>                        <b><%= infoName%></b>  <%= Ucontacts[infoName] %><br>                        <% }); %>                </tr>                <tr>                    <td class="lBody"><span>Statisrtic</span> <br>                        <% UInfo.each(function(v, infoName){  %>                        <b><%= infoName%></b>  <%= UInfo[infoName] %><br>                        <% }); %>                     </td>                </tr>		                <tr>                    <td class="groups">                        <% if(Ugroups){ %>                        <% Ugroups.each(function(v, infoName){ %>                        <a class="iconusername" href="http://www.furaffinity.net/user/<%= v %>">                            <img src="https://a.furaffinity.net/<%= v %>.gif" title="<%= v %>" alt="<%= v %>" align="middle"><%= v %></a><br>                        <% });  %>                        <% } %>                    </td>                </tr>	            </table>        </td>        <td>            <table class="usersImages" >                <% if (UIfeatSrc){ %>                <tr>                    <td>                        <table class="u_gallery" border="0" width="100%">                            <tr>                                <td class="ug_title">Featured</td>                            </tr>                            <tr>                                <td class="ug_img"><a href="<%=UIfeatHref %>" ><img  src="<%=UIfeatSrc %>"></a></td>                            </tr>                            <tr>                                <td class="ug_imgTitle"><a href="<%=UIfeatHref %>" ><%=UIfeatTitle %></a></td>                            </tr>                        </table>                    </td>                </tr>                <% } %>                <tr>                    <td>                        <% if (UIlastsubImgs){ %>                        <table class="u_gallery" border="0" width="100%">                            <tr>                                <td class="ug_title">Last Sub</td>                            </tr>                            <tr>                                <td class="ug_img"><a id="u_galleryLastSubHref" href="<%= UIlastsubImgs[0].href %>" ><img id="u_galleryLastSub" src="<%= UIlastsubImgs[0].fullSrc %>"></a></td>                            </tr>                            <tr>                                <td class="ug_imgTitle"><%= UIlastsubImgs[0].title %> <p class="date"><%= UIlastsubImgs[0].dateHtml %></p> </td>                            </tr>                            <tr>                                <td class="ug_imgs">                                    <% UIlastsubImgs.each(function(img, infoName){  %>                                    <a href="<%= img.href %>" onMouseOver="document.getElementById(\'u_galleryLastSub\').setAttribute(\'src\', \'<%= img.fullSrc %>\' );  document.getElementById(\'u_galleryLastSubHref\').setAttribute(\'href\', \'<%= img.href %>\' ); " class=""><img src="<%= img.src %>"></a>                                    <% } ); %>                                 </td>                            </tr>					                        </table>                        <% } %>                    </td>                </tr>                <tr>                    <td>                        <% if (UIlastfavImgs){ %>                        <table class="u_gallery" border="0" width="100%">                            <tr>                                <td class="ug_title">Last Fav</td>                            </tr>                            <tr>                                <td class="ug_img"><a id="u_galleryFavSubHref" href="<%= UIlastfavImgs[0].href %>" ><img id="u_galleryFavSub" src="<%= UIlastfavImgs[0].fullSrc %>"></a></td>                            </tr>                            <tr>                                <td class="ug_imgTitle"><%= UIlastfavImgs[0].title %> <p class="date"><%= UIlastfavImgs[0].dateHtml %></p> </td>                            </tr>                            <tr>                                <td class="ug_imgs">                                    <% UIlastfavImgs.each(function(img, infoName){ %>                                    <a href="<%= img.href %>"  onMouseOver="document.getElementById(\'u_galleryFavSub\').setAttribute(\'src\', \'<%= img.fullSrc %>\' ); document.getElementById(\'u_galleryFavSubHref\').setAttribute(\'href\', \'<%= img.href %>\' );" class=""><img src="<%= img.src %>"></a>                                    <% }); %>                                 </td>                            </tr>					                        </table>                        <% } %>                    </td>                </tr>                <tr>                    <td>&nbsp;</td>                </tr>            </table>        </td>        <td width="350px">            <table class="userRBlock">                <tr>                    <td class="rSearch">                        <form action="/search/" method="post" id="search-form">                            <div class="q_input"> <input type="text" value="search..." id="q" name="q" class="textbox"></div>                            <input type="submit" value="Search" name="do_search" class="listbox">                            <div class="hidden" id="section-help">					                                &nbsp;&nbsp;&nbsp;&nbsp;                                <select class="listbox" name="perpage">                                    <option value="24">24</option>                                    <option selected="selected" value="36">36</option>                                    <option value="48">48</option>                                    <option value="60">60</option>                                </select> results per page,                                sort by <select class="listbox" name="order-by">                                    <option selected="selected" value="relevancy">relevancy</option>                                    <option value="date">date</option>                                    <option value="popularity">popularity</option>                                </select>                        in the <select class="listbox" name="order-direction">                                    <option value="asc">asc</option>                                    <option selected="selected" value="desc">desc</option>                                </select> order                                &nbsp;&nbsp;&nbsp;&nbsp;                                <br>                                <br>                                <fieldset>                                    <legend><strong>Extended mode</strong> search query help</legend>                                    <p>                                        Search understands <strong>basic boolean</strong> operators:                                    </p><ul>                                        <li><u>AND</u>: hello &amp; world</li>                                        <li><u>OR&nbsp;</u>: hello | world</li>                                        <li><u>NOT</u>: hello -world <u>-or-</u> hello !world</li>                                        <li><u>Grouping</u>: (hello world)</li>                                    </ul>                                    <u>Example:</u> ( cat -dog ) | ( cat -mouse)                                    <p></p>                                    <p>                                        It also supports the following <strong>extended matching capabilities</strong>:                                    </p><ul>                                        <li><u>Field searching</u>: @title hello @message world</li>                                        <li><u>Phrase searching</u>: "hello world"</li>                                        <li><u>Word proximity searching</u>: "hello world"~10</li>                                        <li><u>Quorum matching</u>: "the world is a wonderful place"/3</li>                                    </ul>                                    <u>Example</u>: "hello world" @title "example program"~5 @message python -(php|perl)                                    <p>                                        <b>List of available fields:</b>                                    </p><ul>                                        <li>@title</li>                                        <li>@message</li>                                        <li>@filename</li>                                        <li>@lower (artist name as it appears in their userpage URL)</li>                                        <li>@keywords</li>                                    </ul>                                    <u>Example: </u> fender @title fender -dragoneer -ferrox @message -rednef -dragoneer                                    <p></p>                                    <p></p>                                </fieldset>                                <br>                                <br>                            </div>                            <div class="hidden" id="section-extended">                                <fieldset>                                    <legend>Time range</legend>                                    <label><input type="radio" value="day" name="range"> A Day </label><br>                                    <label><input type="radio" value="3days" name="range"> 3 Days </label><br>                                    <label><input type="radio" value="week" name="range"> A Week </label><br>                                    <label><input type="radio" value="month" name="range"> A Month </label><br>                                    <label><input type="radio" checked="checked" value="all" name="range"> All time </label><br>                                </fieldset>                                <br>                                <br>                                <fieldset>                                    <legend>Rating</legend>                                    <label><input type="checkbox" checked="checked" name="rating-general"> General </label><br>                                    <label><input type="checkbox" checked="checked" name="rating-mature"> Mature </label><br>                                    <label><input type="checkbox" checked="checked" name="rating-adult"> Adult </label><br>                                </fieldset>                                <br>                                <br>                                <fieldset>                                    <legend>Type</legend>                                    <label><input type="checkbox" checked="checked" name="type-art"> Art </label><br>                                    <label><input type="checkbox" checked="checked" name="type-flash"> Flash </label><br>                                    <label><input type="checkbox" checked="checked" name="type-photo"> Photography </label><br>                                    <label><input type="checkbox" checked="checked" name="type-music"> Music </label><br>                                    <label><input type="checkbox" checked="checked" name="type-story"> Story </label><br>                                    <label><input type="checkbox" checked="checked" name="type-poetry"> Poetry </label><br>                                </fieldset>                                <br>                                <br>                                <fieldset>                                    <legend>Match mode</legend>                                    <label><input type="radio" value="all" name="mode"> All of the  words </label><br>                                    <label><input type="radio" value="any" name="mode"> Any of the words </label><br>                                    <label><input type="radio" checked="checked" value="extended" name="mode"> Extended (see help [?])</label><br>                                </fieldset>                                <br>                                <br>                            </div>                        </form>                    </td>                </tr>                 <% if(UlastJourTitleA!=false){ %>                <tr>                    <td class="journal">                        <div class="jTitle"><a href="<%= UlastJourTitleHref %>"> <%= UlastJourTitle %> </a></div>                        <div class="jDate"> <%= UlastJourDateText %></div>                        <div class="jText"><%= UlastJourText %></div>                        <div class="Jcomm"  ><a href="<%= UlastJourCommHref %>"> <%= UlastJourCommText %></a> </div>                    </td>                </tr>                <% } %>                <% if(!MyNoAuth) { %>                <tr>                                           <td class="addComments">                        <div class="AddcommImgBody">                            <form action="/user/<%= Ulogin %>/" method="post" id="JSForm" name="JSForm">                                <input type="hidden" value="shout" name="action">                                <input type="hidden" value="<%= UmainComments_skey %>" name="key">                                <input type="hidden" value="<%= Ulogin %>" name="name">                                <!--        <div class="addCommName">                                                                Lottir                                                            </div>                                                                                                                                                  <img onclick="performInsert($(\'JSMessage\'), \'[b]\', \'[/b]\');" alt="Bold" src="http://www.furaffinity.net/img/bbcode/b.gif" class="hand">                            <img onclick="performInsert($(\'JSMessage\'), \'[i]\', \'[/i]\');" alt="Italic" src="http://www.furaffinity.net/img/bbcode/i.gif" class="hand">                            <img onclick="performInsert($(\'JSMessage\'), \'[u]\', \'[/u]\');" alt="Underlined" src="http://www.furaffinity.net/img/bbcode/u.gif" class="hand">                            &nbsp;&nbsp;&nbsp;                            <img onclick="performInsert($(\'JSMessage\'), \'[left]\', \'[/left]\');" alt="Align Left" src="http://www.furaffinity.net/img/bbcode/align_left.gif" class="hand">                            <img onclick="performInsert($(\'JSMessage\'), \'[center]\', \'[/center]\');" alt="Align Center" src="http://www.furaffinity.net/img/bbcode/align_center.gif" class="hand">                            <img onclick="performInsert($(\'JSMessage\'), \'[right]\', \'[/right]\');" alt="Align Right" src="http://www.furaffinity.net/img/bbcode/align_right.gif" class="hand">                                                        &nbsp;&nbsp;&nbsp;                            <img class="hand" src="http://www.furaffinity.net/img/bbcode/url.gif" alt="URL" onclick="bbtag(\'[url] [/url]\');"/>                            <img class="hand" src="http://www.furaffinity.net/img/bbcode/email.gif" alt="Email" onclick="bbtag(\'[email] [/email]\');"/>                            <img class="hand" src="http://www.furaffinity.net/img/bbcode/img.gif" alt="Image" onclick="bbtag(\'[IMG] [/IMG]\');"/>                            <img class="hand" src="http://www.furaffinity.net/img/bbcode/icon.gif" alt="Icon" onclick="bbtag(\':icon$_USER[lower]:\');"/>                                                                <input type="text" value="222" class="button" id="chars_left" name="chars_left" readonly="readonly" maxlength="3" size="3">                                --> <input type="submit" value="Submit" name="submit" class="button">                                 <div class="addCommTextarea">                                    <textarea onrowsdelete="updateCounter()" onkeyup="updateCounter()" onkeydown="updateCounter()" cols="30" rows="9" name="shout" id="JSMessage"></textarea><br>                                </div>			                                 <div class="addCommSmiles">                                    <img onclick="bbtag(\':-p\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/tongue.png" alt=""><img onclick="bbtag(\':cool:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/cool.png" alt="">                                    <img onclick="bbtag(\';-)\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/wink.png" alt=""><img onclick="bbtag(\':-o\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/oooh.png" alt="">                                    <img onclick="bbtag(\':-)\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/smile.png" alt=""><img onclick="bbtag(\':evil:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/evil.png" alt="">                                    <img onclick="bbtag(\':huh:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/huh.png" alt=""><img onclick="bbtag(\':whatever:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/dunno.png" alt="">                                    <img onclick="bbtag(\':angel:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/angel.png" alt=""><img onclick="bbtag(\':badhair:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/badhairday.png" alt="">                                    <img onclick="bbtag(\':lmao:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/lmao.png" alt=""><img onclick="bbtag(\':cd:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/cd.png" alt="">                                    <img onclick="bbtag(\':cry:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/crying.png" alt=""><img onclick="bbtag(\':idunno:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/dunno.png" alt="">                                    <img onclick="bbtag(\':embarrassed:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/embarrassed.png" alt=""><img onclick="bbtag(\':gift:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/gift.png" alt="">                                    <img onclick="bbtag(\':coffee:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/coffee.png" alt=""><img onclick="bbtag(\':love:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/love.png" alt="">                                    <img onclick="bbtag(\':isanerd:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/nerd.png" alt=""><img onclick="bbtag(\':note:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/note.png" alt="">                                    <img onclick="bbtag(\':derp:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/derp.png" alt=""><img onclick="bbtag(\':sarcastic:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/sarcastic.png" alt="">                                    <img onclick="bbtag(\':serious:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/serious.png" alt=""><img onclick="bbtag(\':-(\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/sad.png" alt="">                                    <img onclick="bbtag(\':sleepy:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/sleepy.png" alt=""><img onclick="bbtag(\':teeth:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/teeth.png" alt="">                                    <img onclick="bbtag(\':veryhappy:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/veryhappy.png" alt=""><img onclick="bbtag(\':yelling:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/yelling.png" alt="">                                    <img onclick="bbtag(\':zipped:\');" style="cursor: pointer;" src="http://www.furaffinity.net/img/smilies/zipped.png" alt="">                                </div>                            </form>                        </div>                    </td>                                          </tr>                <% } %>                <% if(UmainComments){ %>                <% UmainComments.each(function(comm, infoName){   %>                <tr>                    <td class="comments">                        <div class="commImg">                            <a href="/user/<%= comm.Autor %>/"><img src="<%= comm.AutorImg %>" /></a>                        </div>                        <div class="commName">                            <a href="/user/<%= comm.Autor %>/"><%= comm.AutorName %></a>                        </div>                                     <div class="commDate">                            <%= comm.date %>                        </div>                        <div class="commImgPadd"></div>                        <%= comm.text %>                    </td>                                          </tr>                <% } ); %>                <% } %>                                    </table>        </td>    </tr></table> ';


function _wait(){
 //   __tpl = getFAVars('__tpl');
    if (FAParser._waitParse() || (typeof  __tpl) == 'undefined' ) {  
        window.setTimeout(_wait, 1000);
       // console.log(FAParser._waitParse(),  typeof  __tpl);
        return;
    }  
    FAParser.view();
}
    
window.addEventListener('load', function(event) {
  
    if((typeof  unsafeWindow ) != 'undefined'){
        $=  unsafeWindow.$; 
        $$ = unsafeWindow.$$;
    
        if(unsafeWindow.console){
            var GM_log = unsafeWindow.console.log;
        }   
    }
 
     
    
    FAParser.run();
    //console.log(FAParser );
    /*  var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://localhost/proekt/fa/i.php';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
   */
      window.setTimeout(_wait, 300);
    //wait for parse
  //  _wait();
      
    
//  FAParser.view();
      
//IB.searchAllSub();
}, 'false');
function addslashes( str ) {	// Quote string with slashes
 

    return str = str.replace(/\\?("|')/g, '\\$1');
}
function gs_tpl() {
    
    this.parse=function() {
        var str='html=\'\';\n';
        var parts=[];
        var tpl=this.tpl;
        var j, i;
        j=i=0;
        var js='';
        tpl = tpl.replace(/\n/g, '');
        do {
            j=tpl.indexOf('<%');
            if(j>=0) {
                str+='html+=\''+addslashes(tpl.substring(0,j))+'\';\n';
                tpl=tpl.substring(j+2);

                i=tpl.indexOf('%>');
                if(i>=0){
                    js=tpl.substring(0,i);
                    if(js[0]=='=') str+='html+='+js.substring(1)+';\n';
                    else str+=js+'\n';

                    tpl=tpl.substring(i+2);
                }
            }
        }while(j>=0);

        str+='html+=\''+addslashes(tpl)+'\';\n';

        this.html=str;
    }
    this.setFetch=function(data){
        for(var key in data) {
            self[key]=data[key];  
        }
         
    }
    this.setTpl=function(html){
        this.tpl=html;
    }      
    this.getTpl=function(){
        this.parse();
        return eval(this.html);
    }   
    this.fetch=function(data){
        for(key in data) self[key]=data[key];
        return eval(this.html);
    }
    this.load=function(filename){
        $.ajax({
            type: "GET",
            url: filename,
            dataType: "html",
            async: false,
            success: function(ans){
                this.tpl=ans;
          
            }.bind(this)
        });

    }
 
}
 