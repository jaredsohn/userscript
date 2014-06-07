// ==UserScript==
// @name           MediaFire Farsi
// @namespace      http://userscripts.org/*
// @namespace      https://userscripts.org/*
// @namespace      http://www.userscripts.org/*
// @namespace      https://www.userscripts.org/*
// @include        http://userscripts.org/*
// ==/UserScript==





(function() {


 var replacements, regex, key, textnodes, node, s;

 replacements = {
   "Because it's your web": "بخاطر اينکه وب براي شماست",
   "Scripts": "اسکريپت",
   "Tags": "تگ",
   "Forums": "انجمن گفتگو",
   "People": "کاربران",
   "Blog": "وبلاگ",
   "Groups": "گروه",
   "Guides": "آمورش ها",
   "Popular scripts": "اسکريپت هاي پر ظرفدار",
   "Powered by monkeys and unicorns with the help of many": "فارسي سازي شده توسط کروميوم فارسي ",
   "Trusted": "ايمن ",
  "Unlimited": "نامحدود ",
    "Free": "رايگان",

   "Policy & Guidelines": ""};
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