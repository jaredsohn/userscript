// ==UserScript==
// @name           Iransong.com
// @namespace      http://iransong.com/*
// @namespace      https://iransong.com/*
// @namespace      http://www.iransong.com/*
// @namespace      https://www.iransong.com/*
// @include        http://iransong.com/*

// ==/UserScript==
function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}
loadjscssfile("http://chromium.ir/screen.css", "css") ////dynamically load and add this .css file
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// One word, the forced usage of Mona. Thread Over.
addGlobalStyle('body { direction:rtl ; font-family: tahoma,tahoma,\'tahoma\',tahoma  !important }'),('right { padding-right: 20px; display: inline; float:left ; width: 310px ; border-radius:5px ; !important }');


(function() {

 var replacements, regex, key, textnodes, node, s;

 replacements = {
   "بخاطر اينکه وب براي شماست": "بخاطر اينکه وب براي شماست",
   "اسکريپت": "اسکريپت",
   "تگ": "تگ",
   "انجمن گفتگو": "انجمن گفتگو",
   "کاربران": "کاربران",
   "وبلاگ": "وبلاگ",
   "گروه": "گروه",
   "آمورش ها": "آمورش ها",
   "اسکریپت های پرطرفدار": "اسکریپت های پرطرفدار",
   "فارسي سازي شده توسط کروميوم فارسي ": "فارسي سازي شده توسط کروميوم فارسي ",
   "ايمن ": "ايمن ",
  "نامحدود ": "نامحدود ",
    "Name": "نام",
    "رای": "رای",
    "پست": "پست",
    "طرفدار": "طرفدار",
    "دریافت": "دریافت",
    "آخرین":  "آخرین",
	    "بروزرسانی": "بروزرسانی",
    "محبوب ترین": "محبوب ترین",
    "دیدگاه": "دیدگاه",
    "پیش": "پیش",
    "ساعت": "ساعت",
    "جستجو اسکریپت ها": "جستجو اسکریپت ها",
    "جستجو": "جستجو",
    "خروج": "خروج",
    "کاربران": "کاربران",
	    "بعد": "بعد",
    "قبل": "قبل",
    " ایجاد گروه": " ایجاد گروه",
    " ایجاد گروه": " ایجاد گروه",

	    " نمایش همه": " نمایش همه",

			    " کاربران": " کاربران",
			    " انجمن": " انجمن",
			    " پاسخ": " پاسخ",
			    " نمایش": " نمایش",
			    " بحث و گفتگو پیرامون اسکریپت های فعال": " بحث و گفتگو پیرامون اسکریپت های فعال",

			    " پیام  خوانده نشده": " پیام  خوانده نشده",
			    " پیام  خوانده نشده": " دیدگاه ها",

							    " پیام  خوانده نشده": " پیام  خوانده نشده",
			    " اسکریپت های منتخب": " اسکریپت های منتخب",
			    " مرور تاپیک ها": " مرور تاپیک ها",
			    " مدیریت اسکریپت ها": " مدیریت اسکریپت ها",
			    " تنظیمات": " تنظیمات",

			    " ابزارک": " ابزارک",
			    " حریم شخصی": " حریم شخصی",
			   			    " از منوی سمت راست انتخاب کنید": " از منوی سمت راست انتخاب کنید",







	"اگر برای ایجاد گروه اقدام نکردید همین حالا ثبت کنید ": "اگر برای ایجاد گروه اقدام نکردید همین حالا ثبت کنید "};
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

}


)();
