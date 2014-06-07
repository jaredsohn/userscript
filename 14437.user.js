// ==UserScript==
// @name           Hebrew Facebook
// @namespace      http://www.eliram.com
// @description    Translate Facebook into Hebrew
// @include        http://*.facebook.com/*
// @credit         Eliram
// ==/UserScript==
//
// Enter longer search strings BEFORE shorter ones
// Enter <> brackets into the search (and replace) strings whenever possible


function r(dd,s,t) { // Replace search string with translation
	if (s==t) {
		return (dd);
	} else {
		var RegExpr = new RegExp(s,"g");
		return (dd.replace(RegExpr,t));
		// document.body.innerHTML = document.body.innerHTML.replace(RegExpr,t);
	}
}

d=document.body.innerHTML;
//document.body.dir="rtl";
//alert(document.innerHTML);
//document.innerHTML=r(document.innerHTML,'<body ','<body dir="rtl" ');


// Main menu
d=r(d,'>Profile<','>פרופיל<');
d=r(d,'>edit<','>עריכה<');
d=r(d,'>Friends<','>חברים<');
d=r(d,'>Networks<','>רשתות<');
d=r(d,'>Inbox<','> דואר <');
d=r(d,'>home<','>דף הבית<');
d=r(d,'>account<','>חשבון<');
d=r(d,'>Privacy<','>פרטיות<');
d=r(d,'>privacy<','>פרטיות<');
d=r(d,'>logout<','>יציאה<');
d=r(d,'>About<','>אודות<');

d=r(d,'>Message<','>שליחת דואר<');
d=r(d,'>Poke<','>נדנוד<');


// Sub Menus
d=r(d,'>Message Inbox<','> דואר&nbsp;נכנס <');
d=r(d,'>Sent Messages<','> הודעות שנשלחו <');
d=r(d,'>Notifications<','> התראות <');
d=r(d,'>Updates<','>עדכונים<');
d=r(d,'>Compose Message<','>כתוב הודעה חדשה<');
d=r(d,'>Browse All Networks<','>עיון בכל הרשתות<');
d=r(d,'>Join a Network<','>הצטרפות לרשת<');
d=r(d,'>Status Updates<','>עדכוני מצב<');
d=r(d,'>Online Now<','>מחוברים כעת<');
d=r(d,'>Recently Updated<','>עדכנו לאחרונה<');
d=r(d,'>Recently Added<','>נוספו לאחרונה<');
d=r(d,'>All Friends<','>כל החברים<');
d=r(d,'>Invite Friends<','>הזמנת חברים<');
d=r(d,'>Find Friends<','>מציאת חברים<');

// Left Column
d=r(d,'>Search<','>חיפוש<');
d=r(d,'>Applications<','>ישומים<');
d=r(d,'>more<','>עוד<');
d=r(d,'>Less<','>פחות<');
d=r(d,'>Photos<','>תמונות<');
d=r(d,'>Groups<','>קבוצות<');
d=r(d,'>Events<','>אירועים<');
d=r(d,'>Marketplace<','>שוק<');
d=r(d,'>My Questions<','>השאלות שלי<');
d=r(d,'>Developer<','>מפתחים<');
d=r(d,'>Posted Items<','>פריטים שפורסמו<');
d=r(d,' of <',' מתוך <');
d=r(d,'posted items<','פריטים שפורסמו<');
d=r(d,'>Notes<','>רשומות<');
d=r(d,'>Video<','>וידאו<');

// Right Column
d=r(d,'>hide friend updates<','>החבא עדכוני חברים<');
d=r(d,'>show friend updates<','>הראה עדכוני חברים<');
d=r(d,'>Birthdays<','>ימי הולדת<');
d=r(d,'>Invite Your Friends<','>הזמנת חברים<');
d=r(d,'>New Stuff<','>דברים חדשים<');
d=r(d,'>The Next Step<','>הצעד הבא<');
d=r(d,'>Find Your Friends<','>מציאת חברים<');
d=r(d,'>see all<','>הצג הכל<');
d=r(d,'>hide<','>החבא<');
d=r(d,'>close<','>סגור<');

// Bottom line
d=r(d,'>About Facebook<','>אודות פייסבוק<');
d=r(d,'>Facebook<','>פייסבוק<');
d=r(d,'>Advertisers<','>מפרסמים<');
d=r(d,'>Businesses<','>עסקים<');
d=r(d,'>Developers<','>מפתחים<');
d=r(d,'>Terms<','>תנאי שימוש<');
d=r(d,'>Help<','>עזרה<');

// Profile Page
d=r(d,'>Networks:<','>רשתות:<');
d=r(d,'>Hello ','>שלום ');
d=r(d,'>Hometown:<','>עיר מגורים:<'); 
d=r(d,'>Send<','>שליחה<');
d=r(d,'>Cancel<','>ביטול<');
d=r(d,'>Today<','>היום<');
d=r(d,'>Yesterday<','>אתמול<');
d=r(d,'>Sex:<','>מין:<');
d=r(d,'>Relationship&nbsp;Status:<','>מצב&nbsp;משפחתי:<');
d=r(d,'>Birthday:<','>יום הולדת:<');

d=r(d,'>Mini-Feed<','>מקבץ ידיעות<');
d=r(d,'>Displaying ','>מציג ');
d=r(d,' stories<',' ידיעות<');
d=r(d,' wrote on the wall for the group ',' כתב/ה על קיר הקבוצה ');
d=r(d,' joined the group ',' הצטרף לקבוצה ');
d=r(d,' wrote on the wall for the event ',' כתב/ה על קיר האירוע ');
d=r(d,' and ',' ו ');
d=r(d,' are now friends.',' הם עכשיו חברים');
d=r(d,'  has received a new ',' קיבל/ה ');
d=r(d,' commented on ',' העיר/ה על ');

d=r(d,'>See All<','>הצג הכל<');
d=r(d,'>Updated ','>עודכן ');
d=r(d,'just a moment ago','לפני רגע');
d=r(d,'> is (?=[אבגדהוזחטיכלמנסעפצקרשת])','> ');
d=r(d,'>Information<','>מידע כללי<');
d=r(d,'>Contact Info<','>יצירת קשר<');
d=r(d,'>Email:<','>אימייל:<');
d=r(d,'>Current Town:<','>עיר מגורים:<');
d=r(d,'>Website:<','>אתר:<');
d=r(d,'>Personal Info<','>מידע אישי:<');
d=r(d,'>Activities<','>פעילויות<');
d=r(d,'>You are online now.<','>אתם מחוברים כעת.<');

d=r(d,'>Friends in Other Networks<','>חברים ברשתות אחרות<');
d=r(d,'>Networks with the most friends<','>הרשתות עם הכי הרבה חברים<');
d=r(d,'>Networks you belong to<','>הרשתות שלך<');
d=r(d,'>Show All Networks<','>הצגת כל הרשתות<');
d=r(d,'>View All Friends<','>צפיה בכל החברים<');
d=r(d,'> Friends<','> חברים<');
d=r(d,' friends<',' חברים<');

d=r(d,'>Education and Work<','>השכלה ותעסוקה<');
d=r(d,'>Education Info<','>השכלה<');
d=r(d,'>Grad Schools:<','>מכללות ואוניברסיטאות:<');
d=r(d,'>Work Info<','>עבודה<');
d=r(d,'>Employer:<','>חברה:<');
d=r(d,'>Position:<','>תפקיד:<');
d=r(d,'>Time Period:<','>תקופת עבודה:<');
d=r(d,'>Description:<','>תיאור:<');
d=r(d,' groups<',' קבוצות<');

d=r(d,'>Feedheads<','>כותרות<');
d=r(d,'>your shared items<','>פריטים ששיתפת<');
d=r(d,'>Update Shared Items<','>עדכון פריטים ששותפו<');
d=r(d,'>App Profile<','>פרופיל אפליקציה<');
d=r(d,'>Top Shared<','>מצעד הפריטים המשותפים<');

d=r(d,'>Gifts<','>מתנות<');

// Photos
d=r(d,'>Created ','>נוצר ב');
d=r(d,'>Back to Album','>חזרה אל האלבום');
d=r(d,'>From the album:','>מתוך האלבום');

// Wall
d=r(d,'>Back to ','>חזרה אל ');
d=r(d,'>Displaying the only post.<','>הפוסט היחיד מוצג.<');
d=r(d,'>Delete<','>מחיקה<');

// News Feed
d=r(d,'>News Feed<','>מקבץ חדשות<');
d=r(d,'>Preferences<','>העדפות<');
d=r(d,'>I like this<','>אני מרוצה מזה<');
d=r(d,'>I don\'t like this<','>אני לא מרוצה מזה<');
d=r(d,' is attending ',' מגיע/ה אל ');
d=r(d,' attended ',' הגיע/ה אל ');

d=r(d,'>You ignored a request from ','>התעלמת מבקשה מאת ');
d=r(d,'>Updated:','>עודכן:');
d=r(d,' of your ',' מתוך ה ');
d=r(d,' added the ',' הוסיפו את ה ');
d=r(d,' application.<',' (יישום).<');




// Mail page
d=r(d,'>next<','>הבא<');
d=r(d,'>From: ','>מאת: ');

d=r(d,'Facebook','פייסבוק');
/*
d=r(d,'><','><');
d=r(d,'><','><');
d=r(d,'><','><');
d=r(d,'><','><');
d=r(d,'><','><');
d=r(d,'><','><');
d=r(d,'><','><');
*/

// Months
d=r(d,'January','ינואר');
d=r(d,'February','פברואר');
d=r(d,'March','מרץ');
d=r(d,'April','אפריל');
d=r(d,'May','מאי');
d=r(d,'June','יוני');
d=r(d,'July','יולי');
d=r(d,'August','אוגוסט');
d=r(d,'September','ספטמבר');
d=r(d,'October','אוקטובר');
d=r(d,'November','נובמבר');
d=r(d,'December','דצמבר');

document.body.innerHTML=d;
