// ==UserScript==
// @name           Facebook translate
// @author         Anil Kumar
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @description    Help Facebook user to translate text from within facebook itself.
// ==/UserScript==

document.getElementsByTagName('head')[0].innerHTML += "<style type='text/css'>"
+"#leftcol{padding-left:10px;background:white;}"
+"#rightcol{background:white;text-align: center;margin-left:280px;position: absolute;top:50px;}"
+"#my_main_container{z-index:9999454;background:rgba(82,82,82,.7);position:fixed;padding:10px;top:50%;right:-740px; width:730px;"
+"border-radius:8px;-webkit-transition: right .35 ease 1s;-moz-transition: right .35s ease 1s;"
+"transition: right .35s ease-in .70s;}"
+"#my_main_container:hover{right:0%;}"
+"#results{left: 515px;position: absolute;top: 75px;}"
+"#heading{text-align:Left;color:white;background-color: #3B5998;display:block;margin-top:0px;padding:5px;font-weight: bold;font-size: 22px;}"
+"textarea{resize:none;word-wrap:break-word;}"
+"</style>";

document.getElementsByTagName('body')[0].innerHTML += '<div id="my_main_container">'
+'<span id="heading">Translator</span>'
+ '<div id="leftcol">'
+'<div style="margin-bottom:5px;padding-top:5px;">'
+'<select id="langdetect">'
+'<option value="af">AFRIKAANS</option>'
+'<option value="sq">ALBANIAN</option>'
+'<option value="am">AMHARIC</option>'
+'<option value="ar">ARABIC</option>'
+'<option value="hy">ARMENIAN</option>'
+'<option value="az">AZERBAIJANI</option>'
+'<option value="eu">BASQUE</option>'
+'<option value="be">BELARUSIAN</option>'
+'<option value="bn">BENGALI</option>'
+'<option value="bh">BIHARI</option>'
+'<option value="br">BRETON</option>'
+'<option value="bg">BULGARIAN</option>'
+'<option value="my">BURMESE</option>'
+'<option value="ca">CATALAN</option>'
+'<option value="chr">CHEROKEE</option>'
+'<option value="zh">CHINESE</option>'
+'<option value="zh-CN">CHINESE_SIMPLIFIED</option>'
+'<option value="zh-TW">CHINESE_TRADITIONAL</option>'
+'<option value="co">CORSICAN</option>'
+'<option value="hr">CROATIAN</option>'
+'<option value="cs">CZECH</option>'
+'<option value="da">DANISH</option>'
+'<option value="dv">DHIVEHI</option>'
+'<option value="nl">DUTCH</option>'
+'<option value="en">ENGLISH</option>'
+'<option value="eo">ESPERANTO</option>'
+'<option value="et">ESTONIAN</option>'
+'<option value="fo">FAROESE</option>'
+'<option value="tl">FILIPINO</option>'
+'<option value="fi">FINNISH</option>'
+'<option value="fr">FRENCH</option>'
+'<option value="fy">FRISIAN</option>'
+'<option value="gl">GALICIAN</option>'
+'<option value="ka">GEORGIAN</option>'
+'<option value="de">GERMAN</option>'
+'<option value="el">GREEK</option>'
+'<option value="gu">GUJARATI</option>'
+'<option value="ht">HAITIAN_CREOLE</option>'
+'<option value="iw">HEBREW</option>'
+'<option value="hi">HINDI</option>'
+'<option value="hu">HUNGARIAN</option>'
+'<option value="is">ICELANDIC</option>'
+'<option value="id">INDONESIAN</option>'
+'<option value="iu">INUKTITUT</option>'
+'<option value="ga">IRISH</option>'
+'<option value="it">ITALIAN</option>'
+'<option value="ja">JAPANESE</option>'
+'<option value="jw">JAVANESE</option>'
+'<option value="kn">KANNADA</option>'
+'<option value="kk">KAZAKH</option>'
+'<option value="km">KHMER</option>'
+'<option value="ko">KOREAN</option>'
+'<option value="ku">KURDISH</option>'
+'<option value="ky">KYRGYZ</option>'
+'<option value="lo">LAO</option>'
+'<option value="la">LATIN</option>'
+'<option value="lv">LATVIAN</option>'
+'<option value="lt">LITHUANIAN</option>'
+'<option value="lb">LUXEMBOURGISH</option>'
+'<option value="mk">MACEDONIAN</option>'
+'<option value="ms">MALAY</option>'
+'<option value="ml">MALAYALAM</option>'
+'<option value="mt">MALTESE</option>'
+'<option value="mi">MAORI</option>'
+'<option value="mr">MARATHI</option>'
+'<option value="mn">MONGOLIAN</option>'
+'<option value="ne">NEPALI</option>'
+'<option value="no">NORWEGIAN</option>'
+'<option value="oc">OCCITAN</option>'
+'<option value="or">ORIYA</option>'
+'<option value="ps">PASHTO</option>'
+'<option value="fa">PERSIAN</option>'
+'<option value="pl">POLISH</option>'
+'<option value="pt">PORTUGUESE</option>'
+'<option value="pt-PT">PORTUGUESE_PORTUGAL</option>'
+'<option value="pa">PUNJABI</option>'
+'<option value="qu">QUECHUA</option>'
+'<option value="ro">ROMANIAN</option>'
+'<option value="ru">RUSSIAN</option>'
+'<option value="sa">SANSKRIT</option>'
+'<option value="gd">SCOTS_GAELIC</option>'
+'<option value="sr">SERBIAN</option>'
+'<option value="sd">SINDHI</option>'
+'<option value="si">SINHALESE</option>'
+'<option value="sk">SLOVAK</option>'
+'<option value="sl">SLOVENIAN</option>'
+'<option value="es">SPANISH</option>'
+'<option value="su">SUNDANESE</option>'
+'<option value="sw">SWAHILI</option>'
+'<option value="sv">SWEDISH</option>'
+'<option value="syr">SYRIAC</option>'
+'<option value="tg">TAJIK</option>'
+'<option value="ta">TAMIL</option>'
+'<option value="tt">TATAR</option>'
+'<option value="te">TELUGU</option>'
+'<option value="th">THAI</option>'
+'<option value="bo">TIBETAN</option>'
+'<option value="to">TONGA</option>'
+'<option value="tr">TURKISH</option>'
+'<option value="uk">UKRAINIAN</option>'
+'<option value="ur">URDU</option>'
+'<option value="uz">UZBEK</option>'
+'<option value="ug">UIGHUR</option>'
+'<option value="vi">VIETNAMESE</option>'
+'<option value="cy">WELSH</option>'
+'<option value="yi">YIDDISH</option>'
+'<option value="yo">YORUBA</option>'
+'</select>'
+'</div>'
+'<textarea rows="3" cols ="30" id="src" autocomplete="off" spellcheck="false" ></textarea><br>'
+'<input type="button" value="Detect Language" id="detect_button"/>'
+'</div>'
+'<div id="rightcol">'
+'<img src="http://static.ak.fbcdn.net/rsrc.php/v1/y9/r/jKEcVPZFk-2.gif" id="loadGif" style="visibility:hidden"><br>'
+'  To<br>'
+'<select id="lang" style="margin:10px;">'
+'<option value="af">AFRIKAANS</option>'
+'<option value="sq">ALBANIAN</option>'
+'<option value="am">AMHARIC</option>'
+'<option value="ar">ARABIC</option>'
+'<option value="hy">ARMENIAN</option>'
+'<option value="az">AZERBAIJANI</option>'
+'<option value="eu">BASQUE</option>'
+'<option value="be">BELARUSIAN</option>'
+'<option value="bn">BENGALI</option>'
+'<option value="bh">BIHARI</option>'
+'<option value="br">BRETON</option>'
+'<option value="bg">BULGARIAN</option>'
+'<option value="my">BURMESE</option>'
+'<option value="ca">CATALAN</option>'
+'<option value="chr">CHEROKEE</option>'
+'<option value="zh">CHINESE</option>'
+'<option value="zh-CN">CHINESE_SIMPLIFIED</option>'
+'<option value="zh-TW">CHINESE_TRADITIONAL</option>'
+'<option value="co">CORSICAN</option>'
+'<option value="hr">CROATIAN</option>'
+'<option value="cs">CZECH</option>'
+'<option value="da">DANISH</option>'
+'<option value="dv">DHIVEHI</option>'
+'<option value="nl">DUTCH</option>'
+'<option value="en">ENGLISH</option>'
+'<option value="eo">ESPERANTO</option>'
+'<option value="et">ESTONIAN</option>'
+'<option value="fo">FAROESE</option>'
+'<option value="tl">FILIPINO</option>'
+'<option value="fi">FINNISH</option>'
+'<option value="fr">FRENCH</option>'
+'<option value="fy">FRISIAN</option>'
+'<option value="gl">GALICIAN</option>'
+'<option value="ka">GEORGIAN</option>'
+'<option value="de">GERMAN</option>'
+'<option value="el">GREEK</option>'
+'<option value="gu">GUJARATI</option>'
+'<option value="ht">HAITIAN_CREOLE</option>'
+'<option value="iw">HEBREW</option>'
+'<option value="hi">HINDI</option>'
+'<option value="hu">HUNGARIAN</option>'
+'<option value="is">ICELANDIC</option>'
+'<option value="id">INDONESIAN</option>'
+'<option value="iu">INUKTITUT</option>'
+'<option value="ga">IRISH</option>'
+'<option value="it">ITALIAN</option>'
+'<option value="ja">JAPANESE</option>'
+'<option value="jw">JAVANESE</option>'
+'<option value="kn">KANNADA</option>'
+'<option value="kk">KAZAKH</option>'
+'<option value="km">KHMER</option>'
+'<option value="ko">KOREAN</option>'
+'<option value="ku">KURDISH</option>'
+'<option value="ky">KYRGYZ</option>'
+'<option value="lo">LAO</option>'
+'<option value="la">LATIN</option>'
+'<option value="lv">LATVIAN</option>'
+'<option value="lt">LITHUANIAN</option>'
+'<option value="lb">LUXEMBOURGISH</option>'
+'<option value="mk">MACEDONIAN</option>'
+'<option value="ms">MALAY</option>'
+'<option value="ml">MALAYALAM</option>'
+'<option value="mt">MALTESE</option>'
+'<option value="mi">MAORI</option>'
+'<option value="mr">MARATHI</option>'
+'<option value="mn">MONGOLIAN</option>'
+'<option value="ne">NEPALI</option>'
+'<option value="no">NORWEGIAN</option>'
+'<option value="oc">OCCITAN</option>'
+'<option value="or">ORIYA</option>'
+'<option value="ps">PASHTO</option>'
+'<option value="fa">PERSIAN</option>'
+'<option value="pl">POLISH</option>'
+'<option value="pt">PORTUGUESE</option>'
+'<option value="pt-PT">PORTUGUESE_PORTUGAL</option>'
+'<option value="pa">PUNJABI</option>'
+'<option value="qu">QUECHUA</option>'
+'<option value="ro">ROMANIAN</option>'
+'<option value="ru">RUSSIAN</option>'
+'<option value="sa">SANSKRIT</option>'
+'<option value="gd">SCOTS_GAELIC</option>'
+'<option value="sr">SERBIAN</option>'
+'<option value="sd">SINDHI</option>'
+'<option value="si">SINHALESE</option>'
+'<option value="sk">SLOVAK</option>'
+'<option value="sl">SLOVENIAN</option>'
+'<option value="es">SPANISH</option>'
+'<option value="su">SUNDANESE</option>'
+'<option value="sw">SWAHILI</option>'
+'<option value="sv">SWEDISH</option>'
+'<option value="syr">SYRIAC</option>'
+'<option value="tg">TAJIK</option>'
+'<option value="ta">TAMIL</option>'
+'<option value="tt">TATAR</option>'
+'<option value="te">TELUGU</option>'
+'<option value="th">THAI</option>'
+'<option value="bo">TIBETAN</option>'
+'<option value="to">TONGA</option>'
+'<option value="tr">TURKISH</option>'
+'<option value="uk">UKRAINIAN</option>'
+'<option value="ur">URDU</option>'
+'<option value="uz">UZBEK</option>'
+'<option value="ug">UIGHUR</option>'
+'<option value="vi">VIETNAMESE</option>'
+'<option value="cy">WELSH</option>'
+'<option value="yi">YIDDISH</option>'
+'<option value="yo">YORUBA</option>'
+'</select> <br>'
+'<input type="button" value="Translate" id="translate_button"/>'
+'</div>'
+'<textarea rows="3" cols="30" id="results"></textarea></div>';


document.getElementById('translate_button').addEventListener('click', Translate, true);
document.getElementById('detect_button').addEventListener('click', DetectLang, true);


var apiKey ='AIzaSyD24A-czAdTj8pPc5ugo0bYiPRx8Rc2pXo';
function request(code_url,fname){
document.getElementById('loadGif').style.visibility='visible';
GM_xmlhttpRequest({
  method: "GET",
  url: code_url,
  onload: function(response) {
    decodeRes(response,fname);
  },
  onerror: function(response){
  alert('Something Bad has happened Try Again');
  },
  });
 }

function decodeRes(res,fname){
document.getElementById('loadGif').style.visibility='hidden';
try{
var err = JSON.parse(res.responseText);
if(err.error.errors[0].reason=="badRequest"){
    alert("Cannot translate to that language.");
}
}catch(e){
if(fname =='Translate'){
jResponse = JSON.parse(res.responseText);
document.getElementById('results').value = jResponse.data.translations[0].translatedText;
document.getElementById('langdetect').value =jResponse.data.translations[0].detectedSourceLanguage;
}
if(fname =='DetectLang'){
    dResponse = JSON.parse(res.responseText);
    document.getElementById('langdetect').value = dResponse.data.detections[0][0].language;

}
}
}

function Translate(){
    var srcText = document.getElementById('src').value;
    var targetLang = document.getElementById('lang').value;
    url= 'https://www.googleapis.com/language/translate/v2?key='+apiKey+'&target='+targetLang+'&q='+srcText;
    request(url,'Translate');
}
function DetectLang(){
    var srcText = document.getElementById('src').value;
    durl='https://www.googleapis.com/language/translate/v2/detect?key='+apiKey+'&q='+srcText;
    request(durl,'DetectLang');
}

