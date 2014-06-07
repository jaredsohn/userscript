// ==UserScript==
// @name           tsadult - common
// @namespace      http://tsadult.s7.x-beat.com/
// @description    parses and restructures the HTML which is on the TSF image BBS. If you aren't developer, you aren't need to install this script directly.
// @version        1
// @include        http://tsadult.s7.x-beat.com/cgi-bin/picbbs*/*
// @exclude        http://tsadult.s7.x-beat.com/cgi-bin/picbbs*/textbbs.htm
// @exclude        http://tsadult.s7.x-beat.com/cgi-bin/picbbs01/*
// ==/UserScript==

TSAdult = new function(){};
Utils = new function(){};

(function() {
   // UTILITY FUNCTIONS
   Utils.XPath = function(xpath, context, resolver)
   {
     var doc = context ? (context.evaluate ? context : context.ownerDocument) : document;
     var result = doc.evaluate(xpath, context||doc, resolver, XPathResult.ANY_TYPE, null);

     switch (result.resultType) {
     case result.STRING_TYPE: return result.stringValue;
     case result.NUMBER_TYPE: return result.numberValue;
     case result.BOOLEAN_TYPE: return result.booleanValue;
     default:
       var ret = [], next;
       while ((next = result.iterateNext())) ret.push(next);
       return ret;
     }
   };

   Utils.XPath_single = function(xpath, root, resolver)
   {
     var results = Utils.XPath(xpath, root, resolver);
     return results instanceof Array ? results[0] : results;
   };

   $X = Utils.XPath;
   $x = Utils.XPath_single;
   
   TSAdult.Thread = function(element) {
     this._init(element);
   };

   TSAdult.Thread.prototype._init = function(element) {
     this.id = element.id;
     this.element = element;
     var comments = this.comments = [];
     comments.push(new TSAdult.Comment(element)); // thread master comment
     $X('table//td[2]', element).forEach (function(elem) {
       comments.push(new TSAdult.Comment(elem));
     });

     this.total_point = comments.map(function(a){return a.point;}).reduce(function(a,b){ return a+b; });
   };

   TSAdult.Thread.prototype.hide = function() {
     this.element.style.display = "none";
   };

   TSAdult.Thread.prototype.show = function() {
     this.element.style.display = "block";
   };
   TSAdult.Thread.prototype.is_shown = function() {
     return !this.element.style.display || this.element.style.display == "block";
   };

   TSAdult.Thread.prototype.toggle = function() {
     if (this.is_shown()) {
       this.hide();
     } else {
       this.show();
     }
   };

   TSAdult.Comment = function(element) {
     this._init(element);
   };

   TSAdult.Comment.prototype._init = function(elem) {
     try {
       this.title = $x('font[@color="#cc1105"]/b', elem).textContent;
       this.name = $x('font[@color="#117743"]/b', elem).textContent;
       var info = $x('font[@color="#117743"]', elem).nextSibling.textContent;
       this.no = 0;
       if (/No\.\s*(\d+)/.test(info)) {
         this.no = parseInt(RegExp.$1);
       }
       this.point = 0;
       if (/^\(([-\d]+)\s*pts\.\)/.test($x('font[@color="orange"]/small', elem).innerHTML)){
         this.point = parseInt(RegExp.$1);
       }
       this.content = $x('blockquote', elem).innerHTML;
       this.text_content = $x('blockquote', elem).textContent;
     } catch (e) {
       alert(elem +" :: "+ e);
     }
   };

   TSAdult.Threads = new function() {
     wrapThreadNode();

     this.getInfo = getInfo;
     this.getInfoById = getInfoById;
     this.getThreadNodes = getThreadNodes;
     this.forEach = forEach;

     var _cache = {};                 
     
     function wrapThreadNode () {
       if (!document._wrappedThreadNode) {
         var root = $x("/html/body/form");

         // Both root.innerHTML.split("<hr>") and root.cloneNode(true).childNodes do not works as expected.
         var threads = new Array();

         var thread = new Array();
         threads.push(thread);
         while (root.firstChild) {
           var fc = root.firstChild;
           if (fc.tagName && fc.tagName.toLowerCase() == 'hr') {
             thread = new Array();
             threads.push(thread);
           } else {
             thread.push(fc);
           }
           root.removeChild(fc);
         };
         var navi = threads.pop(); //< remove last value, because it's not user comments but the navigation.
         threads.forEach(function(elems, i) {
           var id = "thread-wrapper-"+i;
           var wrapper = document.createElement('div');
           wrapper.id = id;
           elems.forEach(function(elem){ wrapper.appendChild(elem); });
           root.appendChild(wrapper);
           var hr = document.createElement('hr');
           hr.style.clear = 'both';
           root.appendChild(hr);
         });
         navi.forEach(function(elem){ root.appendChild(elem); });
         document._wrappedThreadNode = true;
       }
     }

     function getInfo(elem) {
       if (!_cache[elem.id]) {
         _cache[elem.id] = new TSAdult.Thread(elem);
       }
       return _cache[elem.id];
     }

     function getInfoById(id) {
       return getInfo(document.getElementById(id));
     }

     function getThreadNodes() {
       return $X('/html/body/form/div[starts-with(@id, "thread-wrapper-")]');
     }

     function threads() {
       return getThreadNodes().map(function(elem){return new TSAdult.Thread(elem);});
     }

     function forEach(functor) {
       getThreadNodes().map(function(elem){return new TSAdult.Thread(elem);}).forEach(functor);
     }
   };
 })();