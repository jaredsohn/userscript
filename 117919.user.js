// ==UserScript==
// @name           UserScript.org Farsi
// @namespace      http://userscripts.org/*
// @namespace      https://userscripts.org/*
// @namespace      http://www.userscripts.org/*
// @namespace      https://www.userscripts.org/*
// @include        http://userscripts.org/*

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
				"Because it's your web": "بخاطر اينکه وب براي شماست",
				"Scripts": "اسکريپت",
				"Tags": "تگ",
				"Forums": "انجمن گفتگو",
				"People": "کاربران",
				"Blog": "وبلاگ",
				"Groups": "گروه",
				"Guides": "آمورش ها",
				"Popular scripts": "اسکریپت های پرطرفدار",
				"Powered by monkeys and unicorns with the help of many": "فارسي سازي شده توسط کروميوم فارسي ",
				"Trusted": "ايمن ",
				"Unlimited": "نامحدود ",
				"Rating": "رای",
				"Posts": "پست",
				"Fans": "طرفدار",
				"Installs": "دریافت",
				"Last":  "آخرین",
				"Updated": "بروزرسانی",
				"Popular": "محبوب ترین",
				"reviews": "دیدگاه",
				"ago": "پیش",
				"hours": "ساعت",
				"Script Search": "جستجو اسکریپت ها",
				"Search": "جستجو",
				"Logout": "خروج",
				"Members": "کاربران",
				"Next": "بعد",
				"Previous": "قبل",
				"New version created": " ایجاد گروه",
				"create one": " ایجاد گروه",
				"browse all": " نمایش همه",
			    "members": " کاربران",
			    "Topic": " انجمن",
			    "Replies": " پاسخ",
			    "Views": " نمایش",
			    "Active Script Threads": " بحث و گفتگو پیرامون اسکریپت های فعال",
			    "Unread Messages": " پیام  خوانده نشده",
			    "comments": " دیدگاه ها",
				"comments": " پیام  خوانده نشده",
			    "favorite scripts": " اسکریپت های منتخب",
			    "monitored topics": " مرور تاپیک ها",
			    "script management": " مدیریت اسکریپت ها",
			    "settings": " تنظیمات",
			    "widgets": " ابزارک",
			    "public profile": " حریم شخصی",
				"Check out tabs over <---": " از منوی سمت راست انتخاب کنید",
			    "Web Browser News": " اخبار مرورگر ها",
			    "Privacy Policy": " مشاهده ",
			    "DMCA": " متن باز ",
			    "Policy & Guidelines": " حقوق سایت ",
			    "Your Favorite": "محبوبترین ",
				"posts found": "مطلب پبدا شد ",
				"Upload a new script": "ارسال اسکریپت جدید ",
				"copy and paste this html into your blog": "کپی و برش در بلاگ شما  ",
				"Widgets for you!": "ابزارک برای شما ",
	"If the group you want to join doesn't exist, you can": "اگر برای ایجاد گروه اقدام نکردید همین حالا ثبت کنید "};
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
