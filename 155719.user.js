// ==UserScript==
// @name           Google Search Better Privacy
// @description    Delete unnecessary params and add useful params on Google Search.
// @version        0.0.4
// @include        http://*.google.*/search*
// @include        http://*.google.*/imgres*
// @include        https://*.google.*/search*
// @include        https://*.google.*/imgres*
// @exclude        http://play.google.com/*
// @exclude        http://mail.google.com/*
// @exclude        https://play.google.com/*
// @exclude        https://mail.google.com/*
// @author         nodaguti
// @license        MIT License
// @run-at         document-start
// ==/UserScript==

(function(){

//--- Config ---
//For more information about parameters, please see
//http://www.blueglass.com/blog/google-search-url-parameters-query-string-anatomy/ or
//http://www.seomoz.org/ugc/the-ultimate-guide-to-the-google-search-parameters
var addParams = [
    'safe=off',       //Disable safe search
    'newwindow=1',    //Open links in new tab
    'pws=0',          //Disable personalized search
    'complete=0',     //Disable instant search
    'as_qdr=y15',     //Display when sites released
//    'adtest=on',    //Turn off AdWords database connection
                      //See https://developers.google.com/custom-search-ads/docs/reference#adtest for detail
];

var deleteParams = [
    //--- Tracking Params ---
    //Thx: http://www.blueglass.com/blog/google-search-url-parameters-query-string-anatomy/

    'client',         //Browser Name
    'sclient',        //Browser Name
    'sourceid',       //Source of the query
    'source',         //Source of the query
    'oq',             //What you typed before you made a selection
                      //from the suggestions
    'aq',             //Google Suggest Tracking (Shows which suggestion you choose)
    'pq',             //Previous Query
    'sa',             //Google SERPs navigation behavior tracking
    'swrnum',         //The number of results the initial query returned
    'as_q',           //When searching within results, the query is added as_q
    'oi',             //Universal search: Group name
    'resnum',         //Universal search: Number of a result within the group

    //--- Maybe Tracking Params, but details unknown ---
    'gs_l',           //Location?
    'bav',
    'bvm',
    'bpcl',
    'biw',            //Client display width?
    'bih',            //Client display height?
    'w',
    'h',
    'tbnh',
    'tbnw',
    'fp',
    'ei',
    'usg',
    'sig2',
    'tbs',
    'ved',

    //--- Appearance Setting Params (default: Disabled) ---
    // If you want to delete these params, please reveal the comment out.
//   'tbo',            //tbo=1: Display search toolbar
//   'prmdo',          //prmdo=1: Expand 'services' in toolbar
//   'sout',           //sout=1: Change UI of Google Image Search to old version
//   'esrch',          //esrch=instantpreviews: Enable instant preview
//   'filter',         //filter=1: Filter similar pages
//   'hl',             //Interface language
//   'lr',             //Search target language
//   'ie',             //Query encoding
//   'oe',             //Search result encoding
//   'noj',            //noj=1: No JavaScript

    //--- Unknown Params ---
    'pdx',
    'ech',
    'psi',
    'emsg',
    'facrc',
    'imgdii',
    'iact',
    'ndsp',
    'tx',
    'ty',
];
// --- /Config ---


var delParamReg = new RegExp('&(?:' + deleteParams.join('=[^&#]*|') + '=[^&#]*)', 'g');
var overwriteParamReg = new RegExp('&(?:' + addParams.map(function(i){return i.split('=')[0];}).join('=[^&#]*|') + '=[^&#]*)', 'g');


//Delete and add params
function urlFix(url){
    var _url = url;

    //delete params
    _url = url.replace(delParamReg, '');

    //overwrite and add params
    _url = _url.replace(overwriteParamReg, '').replace(/&$/, '');
    _url += '&' + addParams.join('&') + '&urlfixed=1';

    return _url;
}

//Reload page when hash is changed (when search from textbox on result page)
function hashChange(){
    //Exclude Image Search
    if(location.search.indexOf('tbm=isch') !== -1) return;

    var newURL = ('https://' +
               location.host + '/search' +
               location.search + '&' +
               location.hash.substr(1));

    newURL = urlFix(newURL);

    location.replace(newURL);
}


if(location.href.indexOf('urlfixed=1') === -1){
    location.replace(urlFix(location.href));
}

window.addEventListener('hashchange', hashChange, false);

})();