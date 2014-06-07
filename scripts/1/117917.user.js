// ==UserScript==
// @name           MediaFire Farsi
// @namespace      http://www.mediafire.com/*
// @include        http://www.mediafire.com/*
// ==/UserScript==



(function() {


 var replacements, regex, key, textnodes, node, s;

 replacements = {
   "Free and secure file sharing made simple.": "انتقال فایل آسان با سایت مدیا فایر",
   "©2011 MediaFire": "حقوق سایت",
   "Login": "ورود",
   "Sign Up": "ثبت نام",
   "About Us": "درباره ما",
   "Contact": "ارتباط با ما",
   "Help": "راهنما",
   "Terms of Service": "سازندگان",
   "About Us": "درباره ما",
   "Want to learn more": "آموزش استفاده از سایت ",
   "Trusted": "ایمن ",
  "Unlimited": "نامحدود ",
    "Free": "رایگان",

   "Take the tour.": ""};
regex = {};
for (key in replacements) {
   regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
   node = textnodes.snapshotItem(i);
   s = node.data;
   for (key in replacements) {
       s = s.replace(regex[key], replacements[key]);
   }
   node.data = s;
}

})();