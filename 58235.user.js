// ==UserScript==
// @name           TranslateText
// @version        0.5
// @namespace      xeoos
// @description    Translate selected text using Google translation API ; no size limitation
// @include        *
// ==/UserScript==
/**
* ChangeLog : 
* 0.1 : 09-22-09 creation
* 0.2 : 09-22-09 bugfixes
* 0.3 : 09-22-09 Added Lang from detection
* 0.4 : 09-22-09 Translations inverted
* 0.5 : 11-09-09 Opera10.1 compatibility
*/

var w = (typeof unsafeWindow !=="undefined")?unsafeWindow:window;

function detectLang(lngDef){
  var lang = window.navigator.language;
  if (lang.indexOf('-')>0){
    lang = lang.split('-')[0];
  }
  return lang;
}

function TranslateText(){
    this.name = 'TranslateText';
    this.version = '0.4';
    //http://code.google.com/p/google-ajax-apis/issues/detail?id=18
    this.limit = 1000;//Size limitation
    this.to = detectLang() ||'fr'; //Custom value here
    this.init();
}

TranslateText.prototype.init = function(){
    if (w.google) {
        if (!w.google.language) {
            this.onAfterload();
        }
        else {
            this.onLangLoaded();
        }
    }
    
    //create the hidden translation box adn set its style
    this.div = document.createElement("div");
    this.div.setAttribute("id", "translatetext");
    this.div.setAttribute("style", "display:none;border: 1px solid #000;color:#000;max-width:500px;padding:6px;background:#fff;position:absolute;z-index: 99999;-moz-border-radius:4px;font-size:13px;font-family:Arial");
    
    this.divClose = document.createElement("div");
    this.divClose.setAttribute("style", "float:right;padding:0px 2px;border: 1px solid #AFAFAF;color:#AFAFAF;");
    this.divClose.innerHTML = "<a href='#' style='color:#AFAFAF !important;text-decoration: none;'>x</a>";
    this.divClose.click = function(){
        this.div.style.display = "none";
    };
    this.div.appendChild(this.divClose);
    
    this.divTrad = document.createElement("div");
    this.div.appendChild(this.divTrad);
    
    this.divLink = document.createElement("div");
    this.divLink.setAttribute("style", "text-align:right;");
    this.div.appendChild(this.divLink);
    
    document.body.appendChild(this.div);
};
TranslateText.prototype.onAfterload = function(){
    if (!w['google']['language']) {
        w.google.load('language', '1', {
            "callback": this.onLangLoaded.scop(this)
        });
    }
    else {
        this.onLangLoaded();
    }
};
TranslateText.prototype.onLangLoaded = function(){
    w.addEventListener("mouseup", this.onMouseup.scop(this), false);
};
//the mouseup event get the highlighted text and pass the text to window.detectLanguage function
TranslateText.prototype.onMouseup = function(e){

    //Let focus on div
    if (e.target == this.divTrad || e.target == this.div) {
        return;
    }
    
    this.div.style.display = "none";
    var text = window.getSelection().toString();
    if (text !== "" && e.altKey) {
        var para = text.substr(0, this.limit);
        w.google.language.detect(para, this.onAfterLangDetected.scop(this, [text, {
            x: e.clientX + window.scrollX,
            y: e.clientY + window.scrollY
        }], true));
    }
};
//detect the language of the hightlighted text and translate it
TranslateText.prototype.onAfterLangDetected = function(result, text, pos){
    var from = result.language;
    this.divTrad.innerHTML = '';
    this.translate(text, from, this.to, pos, this.onAfterTranslate, '');
};
TranslateText.prototype.getPhrase = function(text){
    
    return para;
};
TranslateText.prototype.translate = function(text, from, to, pos, callback, translation){
    from = from || '';
    translation = translation || '';
    var para = text.substr(0, this.limit);
    var p = para.lastIndexOf('.');
    if (p>0) {
        para = para.substr(0, p+1);
    }else{
      p = para.lastIndexOf(' ');
      if (p>0) {
          para = para.substr(0, p+1);
      }
    }
    if (para !== '') {
        w.google.language.translate(para, from, to, function(result){
            if (!result.error) {
                //intermediate update callback
                translation += result.translation;
                callback.call(this, para, result.translation, pos, from);
                var tt = text.substr(para.length);
                if (p > 0){
                  this.translate(tt, from, to, pos, callback, translation);
                }
            }
            else {
                //error : goes out
                this.translate('**Error**', from, to, pos, callback, translation);
            }
        }.scop(this));
    }
    else {
        //Final translation
        //callback.call(this, '', translation, pos, from);
    }
};
TranslateText.prototype.detect = function(text, callback){
    google.language.detect(text, function(result){
        if (!result.error) {
            var language = 'unknown';
            for (l in google.language.Languages) {
                if (google.language.Languages[l] == result.language) {
                    language = l;
                    break;
                }
            }
            callback.call(this, language);
        }
    });
};
//if translation exists, display the translation box with the translation
TranslateText.prototype.onAfterTranslate = function(text, result, pos, from){
    if (result) {
        this.divTrad.innerHTML += result;
        if (this.div.style.display !== "inline") {
            var e = (document.charset || document.characterSet);
            var url = 'http://translate.google.com/translate_t?text=' + text + '&hl=en&langpair=' + from + '|' + this.to + '&tbb=1&ie=' + e;
            this.divLink.innerHTML = "<a title='Change languages' href='" + url + "' target='_blank'>" + from + " -> " + this.to + "</a>";
            if (!pos){
              pos= {x:200, y:200};
            }
            this.div.style.left = pos.x + 10 + "px";
            this.div.style.top = pos.y + 10 + "px";
            this.div.style.display = "inline";
        }
    }
};

//GM_registerMenuCommand("Translate selection", function(){ translateText.translateDocument() });

Function.prototype.scop = function(obj, args, appendArgs){
    var method = this;
    return function(){
        var cargs = args || arguments;
        if (typeof appendArgs === "undefined" || appendArgs === true) {
            cargs = Array.prototype.slice.call(arguments, 0);
            cargs = cargs.concat(args);
        }
        return method.apply(obj || w, cargs);
    };
};

//w.translateText = new TranslateText();

//include the google ajax language api script
w.doneLoadingJSAPI = function(){
    w.translateText = new TranslateText();
};
var script = document.createElement('script');
script.src = 'http://www.google.com/jsapi?callback=doneLoadingJSAPI';
script.type = "text/javascript";
document.getElementsByTagName('head')[0].appendChild(script);
