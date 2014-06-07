// ==UserScript==
// @name            eRepublik Persian Translation + Plus
// @author          Par30web
// @version         1.0
// @description   eRepublik Persian Translation + lots of tools
// @include         http://*.erepublik.com/*
// @include        http://*.erepublik.com/*/messages/*
// @include       http://ww*.erepublik.com/*/organization/donate/items/*
// @include       http://ww*.erepublik.com/*/citizen/donate/items/*
// @include       http://ww*.erepublik.com/*/company/*/donate/items
// ==/UserScript==
var strings = {
// translations
	"+10 Wellness / 2 Gold" : "افزايش 10 سلامتي با دو طلا",
	"% of votes" : "% راي ها",
	"6-30 characters max" : "حداکثر 6 تا 30 کاراکتر",
	"1-80 characters max" : "حداکثر يک تا 80 کاراکتر",
	"ACCEPTED" : "پذيرفته شد",
	"Accepted" : "پذيرفته شد",
	"Accepted invites" : "دعوت نامه هاي قبول شده",
	"Accounts" : "اکانت ها",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "روزنامه مکانيست کي مي توانيد اخبار ايريپابليک را منتشر کنيد. براي اطلاعات بيشتر به ويکي سايت مراجعه کنيد. روزنامه خود را بسازيد",
	"Achievements" : "دستاوردها",
	"active battles " : "نبردهاي فعال",
	"Active wars list" : "ليست جنگ هاي فعال",
	"Add a job offer" : "افزودن پيشنهاد کار",
	"Add as a friend" : "اضافه کردن در ليست دوستان",
	"Administration" : "مديريت",
	"ADMINISTARATION CENTER" : "مرکز مديريت",
	"Advanced 5 strength levels" : "رد کردن 5 امتياز قدرت بدني",
	"Advance 5 strength levels" : "رد کردن 5 امتياز قدرت بدني",
	"Advertising Department" : "بخش تبليغات",
	"Affiliates" : "وابستگي ها",
	"Add from address book" : "از ليست دفتر شماره اضافه کن",
	"Add contacts:" : "افزودن راه تماس:",
	"Add" : "اضافه",
	"Alerts" : "هشدارها",
	"All accounts"  : "همه اکانت ها",
	"All Alliances" : "تمامي دوستان",
	"All countries" : "تمامي کشورها",
	"All donations" : "همه بخشش ها",
	"all donations" : "همه بخشش ها",
	"All employees" : "همه کارمندان",
	"All levels" : "تمامي سطوح",
	"All regions" : "همه مناطق",
	"All resistance wars" : "تمامي انقلاب ها",
	"All skills" : "همه تجربه ها",
	"All invites" : "همه دعوت ها",
	"All industries" : "همه صنايع",
	"All wars" : "تمامي جنگ ها",
	"Alliance" : "اتحاد",
	"Alliances" : "متحدين",
	"Amazing fight" : "مبارزه شگفت انگيزي بود",
	"Amazing fight, Private!" : "مبارزه شگفت انگيزي بود، سرباز!",
	"Amazing fight, Corporal!" : "مبارزه شگفت انگيزي بود، سرجوخه!",
	"Amazing fight, Sergeant!" : "مبارزه شگفت انگيزي بود، گروهبان!",
	"Amazing fight, Lieutenant!" : "مبارزه شگفت انگيزي بود، ستوان!",
	"Amazing fight, Captain!" : "مبارزه شگفت انگيزي بود،فرمانده!",
	"Amazing fight, Colonel!" : "مبارزه شگفت انگيزي بود، سرهنگ!",
	"Amazing fight, General!" : "مبارزه شگفت انگيزي بود، ژنرال!",
	"Amazing fight, Field Marshall!" : "مبارزه شگفت انگيزي بود، سپهبد!!",
	"Ambassador" : "سفير",
	"Amount" : "مقدار",
	"Amount to buy" : "مقدار خريد",
	"Anarchist" : "آشوبگر",
	"Apply" : "اجرا کن",
	"Approved" : "تصويب شد",
	"Approved on" : "تصويب شد در",
	"Approved by" : "تصويب شد توسط",
	"Argentina" : "آرژانتين",
	"Army" : "ارتش",
	"Article" : "مقاله",
	"Article RSS" : "آر.اس.اس مقاله",
	"Assets" : "دارايي",
	"A taste of what you can do in eRepublik" : "گوشه اي از کارهايي که مي توانيد در ايريپابليک انجام دهيد.",
	"Attackable on President's decision" : "با فرمان رئيس جمهور حمله صورت خواهد پذيرفت",
	"Attention: NO VAT tax for Raw materials" : "توجه: ماليات بر ارزش افزوده اي نيست",
	"August" : "آگوست",
	"Australia" : "استراليا",
	"Austria" : "اتريش",
	"Average" : "متوسط",
	"Average Citizen level" : "متوسط لول شهروندي",
	"Average citizen level" : "متوسط لول شهروندي",
	"Average strength" : "متوسط قدرت بدني",
	"Back" : "بازگشت",
	"Basic productivity" : "توليد پايه",
	"Back to army" : "بازگشت به صفحه ارتش",
	"Back to company" : "بازگشت به صفحه کارخانه",
	"Back to battlefield" : "بازگشت به صحنه نبرد",
	"Barbaric fight, Private!" : "مبارزه وحشيانه اي بود، سرباز!",
	"Barbaric fight, Corporal!" : "مبارزه وحشيانه اي بود، سرجوخه!",
	"Barbaric fight, Sergeant!" : "مبارزه وحشيانه اي بود، گروهبان!",
	"Barbaric fight, Lieutenant!" : "مبارزه وحشيانه اي بود، ستوان!",
	"Barbaric fight, Captain!" : "مبارزه وحشيانه اي بود، سروان!",
	"Barbaric fight, Colonel!" : "مبارزه وحشيانه اي بود، سرهنگ!",
	"Barbaric fight, General!" : "مبارزه وحشيانه اي بود، ژنرال!",
	"Barbaric fight, Field Marshall!" : "مبارزه وحشيانه اي بود، سپهبد!",
	"Basic damage" : "ضربه پايه",
	"Battle Hero" : "قهرمان نبرد",
	"Battle hero" : "قهرمان نبرد",
	"Battle History" : "تاريخ نبرد",
	"Battle history" : "تاريخ نبرد",
	"Battles you can fight in" : "نبردهايي که مي توانيد در آن بجنگيد",
	"Belgium" : "بلژيک",
	"Be a chat room owner" : "صاحب اتاق گفتمان خود شويد!",
	"Bio" : "بيوگرافي",
	"Bolivia" : "بوليوي",
	"BORDER AREA" : "منطقه مرزي",
	"Bosnia and Herzegovina" : "بوسني و هرزگويين",
	"Brazil" : "برزيل",
	"Bulgaria" : "بلغارستان",
	"Buy" : "خريد",
	"Buy Constructions" : " خريد سازه و ساخت ",
	"Buy Constructions: Defense System" : " خريد سازه و ساخت : سيستم دفاعي ",
	"Buy Constructions: Hospital" : " خريد سازه و ساخت : بيمارستان ",
	"Buy export license" : " خريد مجوز صادرات ",
	"Get Extra Storage" : "دريافت ظرفيت بيشتر",
	"Buy from market" : " خريد از بازار ",
	"Buy market license" : " مجوز خريد بازار ",
	"Buy raw materials" : " خريد مواد خام ",
	"Buy wellness" : " خريد سلامتي ",
	"Buy Wellness Box" : " خريد جعبه سلامتي ",
	"builder" : "سازنده",
	"BY SALES" : "فروش توسط",
	"Canada" : " کانادا ",
	"Candidate" : " کانديد ",
	"CAPITAL" : "پايتخت",
	"Captain" : " سروان ",
	"CAPTURED" : "تسخير شده ",
	"Career" : "حرفه",
	"Career path" : " مسير شغلي ",
	"Center" : "مرکز",
	"candidate" : "کانديدا",
	"Center, Authoritarian" : "ديکتاتوري بي طرف",
	"Center-left, Libertarian" : "ليبرال چپ گرا",
	"Center, Libertarian" : "ليبرال بي طرف",
	"Center-right, Libertarian" : "ليبرال راست گرا",
	"Chat rooms" : "اتاق هاي گفتمان",
	"Chat room" : "اتاق گفتمان",
	"Change" : "تغيير",
	"Change the location of your newspaper" : " تغيير كشور روزنامه شما ",
	"Change password" : " تغيير رمز عبور ",
	"Change residence" : " تغيير محل اقامت ",
	"Check your unlocked features" : " ويژگي هاي باز شده خودرا بررسي کنيد ",
	"Check rankings" : "چک کردن رتبه",
	"Choose a training program" : "انتخاب برنامه تمرين",
	"Choose industry" : "انتخاب صنعت",
	"Chile" : "شيلي",
	"China" : "چين",
	"Citizen" : "شهروند",
	"Citizen Avatar" : "تصوير شهروند",
	"Citizen name" : "نام شهروند",
	"Citizen fee" : "هزينه پايه شهروند",
	"Citizen permanently suspended for multiple accounts." : "شهروند ، بطور دائم براي داشتن حسابهاي متعدد به حالت تعليق درامده.",
	"Citizens" : "شهروندان",
	"Citizenship" : "تابعيت",
	"Citizenship applications" : "برنامه تابعيت",
	"Citizenship requests" : "درخواست تابعيت",
	"CITY" : "شهر",
	"Collect" : "جمع کن",
	"Colombia" : "کلمبيا", 
	"Colonel" : "سرهنگ",
	"Come back tomorrow." : "فردا برگرديد.",
	"Companies" : "کارخانه ها",
	"Companies for sale" : "کارخانه هاي فروشي",
	"Company" : "کارخانه", 
	"Company accounts" : "اکانت کارخانه",
	"Company details" : "اطلاعات کارخانه", 
	"Company page" : "صفحه کارخانه",
	"Company market" : "بازار کارخانه",
	"Company name" : "نام کارخانه",
	"Company logo" : "برند کارخانه",
	"Community" : "جامعه",
	"Conquer" : "فتح شدن",
	"Continue" : "ادامه بده",
	"Congress" : " مجلس ",
	"Congress Elections" : " انتخابات مجلس ",
	"Congress Member" : " عضو مجلس ",
	"Congress member candidates" : " کانديداهاي عضو مجلس ",
	" congress members" : "اعضاي مجلس",
	"Constructions": "ساخت و ساز",
	"Contact": "تماس",
	"Copyright" : "حق انتشار",
	"Corporal" : "سرجوخه",
	"Corporate career" : "مهارت هاي مشترک",
	"Cost" : "بها", 
	"Countries" : "کشورها",
	"Country" : "کشورها",
	"Country stats" : "وضعيت کشورها",
	"Country - Society" : "کشور - جامعه",
	"Country Administration" : "مديريت کشور",
	"Country administration" : "مديريت کشور",
	"Country Presidency" : "رياست جمهوري",
	"Country presidency" : "رياست جمهوري",
	"Country President" : "رئيس جمهور",
	"Country trading embargoes" : "تحريم اقتصادي کشور",
	"Create" : "ساخت",
	"Create company" : "تاسيس کارخانه",
	"Create chat room" : "ايجاد اتاق گفتمان",
	"Create new" : "ساختن جديد",
	"Create new company" : "تاسيس کارخانه جديد",
	"Create newspaper" : "ساخت روزنامه",
	"Croatia" : "کرواسي",
	"Current location" : "مکان کنوني",
	"Current password" : "رمز عبور کنوني",
	"Current national goals" : "وعده هاي انتخاباتي کنوني",
	"Czech Republic" : "جمهوري چک",
	"Day" : "روز ",
	"days ago" : "روز پيش",
	"Date sent" : "تاريخ ارسال",
	"Daily salary" : "حقوق روزانه",
	"Dead citizen" : "شهروند مرده",
	"Debate Area" : "محل بحث",
	"December" : "دسامبر",
	"Declare War" : "اعلام جنگ صورت گرفت",
	"Defense Points" : "امتياز دفاعي",
	"Defense System" : "سيستم دفاعي",
	"Defense system" : "سيستم دفاعي",
	"defense system" : "سيستم دفاعي",
	"Description" : "توضيح",
	"Delete" : "حذف",
	"Denmark" : "دانمارک",
	"details" : "اطلاعات",
	"Diamonds" : "الماس",
	"diamonds" : "الماس",
	"Disscusion Area" : "محل بحث",
	"Discussion area" : "محل بحث",
	"Do you want the current president of Iran to end this office?" : "آيا مايل به استيضاح رئيس جمهوري کنوني ايران هستيد؟",
	"Donate" : "اهدا",
	"Donate Gold" : "اهداي طلا",
	"Donate raw materials" : "اهداي مواد اوليه",
	"Donation" : "اهدا",
	"Donations list" : "ليست اهداها",
	"Drag and drop items from your inventory to the donation area" : "اقلام مورد نظر را از كالاهاي خود به مكان اهدا كشيده و رها كنيد.",
	"Economic stats" : "وضعيت اقتصادي",
	"Economical orientation" : "جهت گيري اقتصادي",
	"Economy" : "اقتصاد",
	"Emails to be invited: " : "دعوت از طريق نامه:",
	"Email" : "پست الکترونيکي",
	"Edit" : "ويرايش",
	"Edit details" : "ويرايش اطلاعات",
	"Edit newspaper details" : "ويرايش اطلاعات روزنامه",
	"edit profile" : "ويرايش پروفايل",
	"Edit profile" : "ويرايش پروفايل",
	"Edit Profile" : "ويرايش پروفايل",
	"Election results" : "نتايج انتخابات",
	"Election" : "انتخابات",
	"Elections" : "انتخابات ها",
	"Email must be valid for registration, so do not cheat." : "ايميلي که براي عضويت استفاده مي کنيد بايد واقعي باشد بنابر اين تقلب نکنيد.",
	"Employee" : "کارمند",
	"Employees" : "کارمندان",
	"eRepublik Birthday" : "روز تولد ايريپابليکي",
	"Erepublik Age" : "سن ايريپابليکي",
	"eRepublik Laws" : "قوانين ايريپابليک",
	"Estonia" : "استوني",
	"Everyone" : "همه",
	"Exchange rate" : "نرخ معامله",
	"Experience" : "تجربه",
	"Experience points" : "ميزان تجربه",
	"Experience level" : "سطح تجربه",
	"Experience gain" : "تجربه بدست آمده",
	"Expires tomorrow" : "فردا منقضي مي شود",
	"Expires in one month" : "يک ماه بعد منقضي مي شود",
	"Exports" : "صادرات",
	"Far-right, Authoritarian" : "ديکتاتوري راست گراي افراطي",
	"Far-left, Libertarian" : "ليبرال چپ گراي افراطي",
	"Favorites" : "علاقه منديها",
	"Featured Chat Room" : "اتاق هاي گفتمان مورد علاقه",
	"Featured rooms" : "اتاق هاي منتخب",
	"Field Marshal" : "سپهبد",
	"Field Marshall" : "سپهبد",
	"Fight" : "مبارزه",
	"Fights" : "مبارزه ها",
	"Fight Again" : "دوباره مبارزه کن",
	"Fight bonus" : "پاداش مبارزه",
	"Finances" : "دارايي ها",
	"Final Results" : "نتايج نهايي",
	"Find out more" : "بيشتر بدانيد",
	"Find a job" : "شغلي بيابيد",
	"Find a job or own a company. Having a job will allow you to get a salary each day you go to work (don't worry, in eRepublik it is much more fun and faster to go to work than in real life)." : "کار کن يا کارخانه اي تاسيس کن. شغل به شما اجازه مي دهد هر روز حقوقي بگيريد.(نگران نباشيد، در ايريپابليک کار زودتر از زمان واقعي به پايان مي رسد)",
	"Finland" : "فنلاند",
	"Follow us" : "به دنبال ما بياييد",
	"Food" : "غذا",
	"food" : "غذا",
	"For the law to be considered accepted it needs 66% of the Congress votes" : "براي تصويب لايحه به بيش از دو سوم آوا نياز است (66%)",
	"For this law to be considered accepted it needs 66% of the Congress votes." : "براي تصويب اين لايحه به بيش از دو سوم آوا نياز است (66%)",
	"Force" : "نيرو",
	"Forfeit Points:" : "امتياز منفي:",
	"Forfeit Points" : "امتياز منفي:",
	"forum" : "تالار گفتمان",
	"Forum" : "تالار گفتمان",
	"France" : "فرانسه",
	"Friends" : "دوستان",
	"From" : "فرم",
	"Gain instant access to all features with" : "دسترسي به تمام امکانات با:",
	"General" : "ژنرال",
	"General Manager" : "مدير",
	"General manager" : "مدير",
	"Germany" : "آلمان",
	"Get Extra Storage" : "دريافت ظرفيت بيشتر",
	"Get Gold" : "طلا بخر",
	"Get gold & extras" : "دريافت طلا و امکانات",
	"Get Wellness" : "دريافت سلامتي",
	"Gift" : "هديه",
	"gift" : "هديه",
	"Go to Battlefield" : "وارد صحنه نبرد شو",
	"Go to marketplace" : "به مغازه برو",
	"GOLD" : "طلا",
	"Gold" : " طلا",
	"Good fight, Private!" : "مبارزه خوبي بود, سرباز!",
	"Good fight, Corporal!" : " مبارزه خوبي بود, سرجوخه!",
	"Good fight, Sergeant!" : " مبارزه خوبي بود, گروهبان!",
	"Good fight, Lieutenant!" : " مبارزه خوبي بود, ستوان!",
	"Good fight, Captain!" : " مبارزه خوبي بود, سروان!",
	"Good fight, Colonel!" : " مبارزه خوبي بود, سرهنگ!",
	"Good fight, General!" : " مبارزه خوبي بود, ژنرال!",
	"Good fight, Field Marshall!" : " مبارزه خوبي بود, سپهبد!",
	"Goals" : "اهداف",
	"Grain" : "گندم",
	"grain" : "گندم",
	"Great fight" : "مبارزه عالي بود",
	"Greece" : "يونان",
	"Greece:" : "يونان:",
	"Gross domestic product (GDP)" : "توليد خالص داخلي",
	"Guest" : "ميهمان",
	"has been secured by" : "حفظ شده توسط",
	"Hard Worker" : "سخت کوش",
	"Hard worker" : "سخت کوش",
	"Having your own chat room allows you to administrate the discussions, assign moderators and provide an environment where citizens can socialize, interact and discuss upon the interesting topics of the New World." : "داشتن تالارگفتمان به شما اجازه مي دهد بحث هاي تالار خود را ويرايش کنيد.",
	"Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt." : "داشتن کارخانه شخصي مي تواند شما را ثروتمند کنيد، البته به شرطي که پول کافي براي دادن حقوق ها داشته باشيد تا ورشکست نشويد.",
	"Heal" : "درمان",
	"Hero" : "قهرمان",
	"hero" : "قهرمان",
	"High": "بالا",
	"Home" : "خانه",
	"Hospital" : "بيمارستان",
	"hospital" : "بيمارستان",
	"hours ago" : "ساعت پيش",
	"House" : "خانه",
	"house" : "خانه",
	"Hungary" : "مجارستان",
	"I have nothing more to say at the moment" : "چيزي براي گفتن ندارم!",
	"Import Tax" : "ماليات واردات",
	"Imports" : "واردات",
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "براي ورود به اکانت شرکت خود بايد ابتدا از اکانت شهرونديتان خارج شده و با نام کاربري و رمز عبور اکانت شرکتتان وارد شويد.",
	"Inbox" : "جعبه پيام ها",
	"Info" : "اطلاعات",
	"If you’ve sent an invitation to a Yahoo! email address, please note that we are currently experiencing difficulties with Yahoo! email delivery" : "اگر از آدرس پستي ياهو براي دعوت استفاده کرده ايد ممکن است پيام دير برسد چون سيستم ما با ياهو مشکاتي دارد!",
	"If an invite has not been received, you may want to consider the following:" : "اگر دعوت نامه شما ارسال نشد بايد راهکار هاي زير را در نظر بگيريد:",
	"Income Tax" : "ماليات بر درآمد",
	"India" : "هند",
	"Indonesia" : "اندونزي",
	"Industry" : "صنعت",
	"Inflation" : "تورم",
	"International" : "بين المللي",
	"Inventory" : "موجودي",
	"Invest" : "سرمايه گذاري",
	"Invite friends" : "دعوت دوستان",
	"Invite 10 people to eRepublik and help them reach level 6" : "ده نفر از مردم را دعوت کن و به آنها کمک کنيد تا به سطح 6 برسند:",
	"Impressive fight, Private!" : " سرباز!, مبارزه عالي بود ",
	"Impressive fight, Corporal!" : "سرجوخه!, مبارزه عالي بود ",
	"Impressive fight, Sergeant!" : "گروهبان!, مبارزه عالي بود ",
	"Impressive fight, Lieutenant!" : "ستوان!, مبارزه عالي بود  ",
	"Impressive fight, Captain!" : "سروان!, مبارزه عالي بود  ",
	"Impressive fight, Colonel!" : "سرهنگ!, مبارزه عالي بود  ",
	"Impressive fight, General!" : "ژنرال!, مبارزه عالي بود  ",
	"Impressive fight, Field Marshall!" : "سپهبد!, مبارزه عالي بود  ",
	"Iran" : "ايران",
	"Iran:" : ":ايران",
	"Invites status" : "وضعيت دعوت ها",
	"Ireland" : "ايرلند",
	"Invitations left: " : "دعوت نامه هاي مانده:",
	"invited via refferer link" : "دعوت با لينک شخصي",
	"Invites" : "دعوت ها",
	"Iron" : "آهن",
	"iron" : "آهن",
	"Israel" : "فلسطين اشغالي",
	"Issue Money" : "چاپ پول",
	"Italy" : "ايتاليا",
	"Items" : "موارد",
	"items" : "موارد",
	"Japan" : "ژاپن",
	"Job market" : "بازار کار",
	"Jobs" : "شغل ها",
	"Jobs available in this company" : "کارهاي موجود در اين کارخانه",
	"Join" : "پيوستن",
	"Join another featured room" : "به اتاق گفتمان ديگري بپيوند",
	"Join a party" : "پيوستن به حزب",
	"Join party" : "به حزب بپيوند",
	"Jul" : "جولاي",
	"Land" : "کشاورزي",
	"Land skill" : "تجربه کشاورزي",
	"Last presence" : "آخرين حضور",
	"Latest" : "جديدترين ها",
	"Latest Events" : "آخرين وقايع",
	"Latest events" : "آخرين وقايع",
	"Latest news" : "آخرين اخبار",
	"Latvia" : "لاتويا",
	"Law proposals" : "لايحه پيشنهاد شده",
	"leader" : "رهبر",
	"Level 1" : "سطح 1",
	"Level" : "سطح",
	"Level 2" : "سطح 2",
	"Level 3" : "سطح 3",
	"Level 4" : "سطح 4",
	"Level 5" : "سطح 5",
	"Lithuania" : "لتوني",
	"Lieutenant" : "ستوان",
	"Location" : "مکان",
	"Login" : "ورود",
	"Logout" : "خروج",
	"logout" : "خروج",
	"Make changes" : "تغيير ده",
	"Make sure you check the rankings and see what user generated rooms are \"on fire\"." : "",
	"Make sure your friend checks their spam folder" : "اطمينان حاصل کنيد که دوستتان جعبه هرزنامه هاي خود را کنترل مي کند.",
	"Malaysia" : "مالزي",
	"Manufacturing" : "صنعتي",
	"Market" : "بازار",
	"Markets" : "بازارها",
	"Market offers" : "پيشنهادات بازار",
	"Market place" : "بازار",
	"Marketplace" : "بازار",
	"manager" : "مدير",
	"Media career" : "مهارت رسانه اي",
	"Media Mogul" : "رسانه پرنفوذ",
	"Media mogul" : "رسانه پرنفوذ",
	"Medium" : "متوسط",
	"Member of" : "اعضاي",
	"Members"  : "اعضاي",
	"My places" : "مکان هاي من",
	"My places > Army"  : "ارتش",
	"My places > Training grounds"  : "زمين تمرين",
	"My places > Party"  : "حزب",
	"My places > Newspaper"  : "روزنامه",
	"My places > Organizations" : "اکانت شرکت",
	"My places > Company" : "کارخانه",
	"Mexico" : "مکزيک",
	"Military" : "ارتشي",
	"Military achievements" : "دستاوردهاي نظامي",
	"Military career" : "مهارت نظامي",
	"Military force" : "نيروي نظامي",
	"Military rank" : "رتبه نظامي",
	"Military stats" : "وضعيت نظامي",
	"Minimum" : "حداقل",
	"Minimum country wage :" : "کمترين حقوق کشور",
	"Minimum skill" : "حداقل تجربه",
	"Minimum Skill" : "حداقل تجربه",
	"Minimum Wage" : "حداقل درآمد",
	"Moldavia" : "مولديوي",
	"Monetary market" : "بازار بورس",
	"Monetary Market" : "بازار بورس",
	"Money" : "پول",
	"Month/Year" : "ماه/سال",
	"Monthly exports" : "صادرات ماهانه",
	"Monthly imports" : "واردات ماهانه",
	"Monuments achieved" : "يادبود گرفتن",
	"more events" : "وقايع بيشتر",
	"More news" : "اخبار بيشتر",
	"more news" : "اخبار بيشتر",
	"more than a year" : "بيش از يک سال",
	"more than a year ago" : "بيش از يک سال پيش",
	"Moving Tickets" : "بليط",
	"moving tickets" : "بليط",
	"Moving tickets" : "بليط",
	"Mutual Protection Pact" : "پيمان دفاعي مشترک",
	"My Chat Rooms" : "اتاق هاي گفتگوي من",
	"My favorite rooms" : "اتاق هاي مورد علاقه من",
	"My Organizations" : "اکانتهاي شرکت من",
	"My places" : "مکان هاي من",
	"Name" : "نام",
	"National Goals" : "اهداف",
	"National" : "ملي",
	" National Rank" : "رتبه ملي",
	"National Rank" : "رتبه ملي",
	"Neighbors" : "همسايه ها",
	"Netherlands" : "هلند",
	"New" : "جديد",
	"new article" : "مقالات جديد",
	"New Citizen Fee" : "پول اوليه شهروندان جديد",
	"New Citizen Message" : "پيام خوش آمد جديد شهروندان",
	"New Citizens today" : "شهروندان تازه وارد امروز",
	"New citizens today" : "شهروندان تازه وارد امروز",
	"New location:" : "مکان جديد:",
	"New password" : "رمز عبور جديد:",
	"New password again" : "تکرار",
	"news" : "اخبار",
	"News" : "اخبار",
	"Newspaper" : "روزنامه ها",
	"Newspaper logo" : "برند روزنامه",
	"Newspaper details" : "اطلاعات روزنامه",
	"Newspaper name" : "نام روزنامه",
	"Newspaper Avatar" : "برند روزنامه",
	"Newspapers" : "روزنامه ها",
	"Next" : "بعدي",
	"Next elections" : "انتخابات بعدي",
	"Next election in " : "انتخابات بعدي در",
	"Next elections in" : "انتخابات هاي بعدي در",
	"No" : "خير",
	"No." : "خير",
	"no active battles " : "نبرد فعالي نيست",
	"no active battles " : "نبرد فعالي نيست",
	"No activity" : "فعاليتي ندارد",
	"no allies" : "متحدي ندارد",
	"NO MAN'S LAND" : "سرزمين بي صاحب",
	"No. of votes" : "تعدا آرا",
	"No. of Employees" : "تعدا کارمندان",
	"No. of chatrooms" : "تعداد اتاق هاي گفتمان",
	"No. of newspapers" : "تعداد روزنامه ها",
	"No. of companies" : "تعداد شرکت ها",
	"No political activity" : "فعاليت سياسي ندارد",
	"No products in this market" : "محصولي در بازار نيست",
	"No shouts posted by this Citizen yet" : "پيام کوتاهي توسط اين شهروند ارسال نشده است",
	"No shouts posted by this citizen yet" : "پيام کوتاهي توسط اين شهروند ارسال نشده است",
	"No more shouts for today" : "فريادهاي شما تمام شد!",
	"No presentation" : "پيزي ارائه نشده است",
	"North Korea" : "کره شمالي",
	"Norway" : "نروژ",
	"Not qualified" : "انتخاب نشد",
	"November" : "نوامبر",
	"Now you can visit the " : "هم اکنون مي توانيد مشاهده کنيد",
	"October" : "اکتبر",
	"of the New World" : " دنياي جديد",
	"Offer a gift" : "اهداي هديه",
	"Office" : "دفتر",
	"Official" : "رسمي",
	"Official candidates" : "نامزدهاي اصلي",
	"Oil"  : "نفت",
	"oil"  : "نفت",
	"Ok, thanks, next tip" : "ممنون× بعدي",
	"Old"  : "قديمي",
	"On the Map" : "روي نقشه",
	"one hour ago" : "يک ساعت پيش",
	"one minute ago" : "يک دقيقه پيش",
	"one month ago" : "يک ماه پيش",
	"online": "برخط",
	"Online now": "برخط است",
	"Once you join a room and click the \"add as favorite\" icon, that specific room will be added to the list of favorite chat rooms. This way it will be easier for you to access a specific room you are interested in." : "با اضافه کردن اتاق گفتمان به ليست علاقه مندي هاي خود سريع تر مي توانيد به آن دسترسي پيدا کنيد.",
	"only ": "تنها", 
	" pictures allowed": " تصاوير مجاز",
	"only .jpeg pictures allowed": "تنها فرمت .جي.پي.جي مجاز است",
	"only JPG files allowed": "تنها فرمت .جي.پي.جي مجاز است",
	"Only congressmen and country presidents have the right to vote" : "تنها مجلسي ها و رييس جمهور حق راي دادن دارند",
	"Only congress members and country presidents have the right to vote." : "تنها مجلسي ها و رييس جمهور حق راي دادن دارند",
	" or read the  " : " يا بخوانيد",
	"Organization Avatar": "تصوير اکانت شرکت",
	"Organizations created by you:" : "اکانت هاي شرکت شما:",
	"Organizations" : "اکانت هاي شرکت",
	"Orientation" : "جهت گيري:",
	"Our next candidate" : "نامزد بعدي ما",
	"Owner" : "صاحب",
	"Own a company" : "صاحب کارخانه شو",
	"Pakistan" : "پاکستان",
	"Paraguay" : "پاراگوئه",
	"Parties" : "احزاب",
	"Party" : "حزب",
	"Party details" : "اطلاعات حزب",
	"Party founder" : "موسس حزب",
	"Party Elections" : "انتخابات درون حزبي",
	"Party elections" : "انتخابات درون حزبي",
	"Party logo" : "برند حزب",
	"Party name" : "نام حزب",
	"Party Member" : "عضو حزب",
	"Party members" : "اعضاي حزب",
	"Party presidency" : "رياست حزب",
	"Party President" : "رئيس حزب",
	"Party president" : "رئيس جزب",
	"Peace Proposal" : "لايحه صلح",
	"Pending" : "در حال بررسي",
	"PENDING" : "در حال بررسي",
	"Pending invites" : "دعوت هاي در حال بررسي",
	"Philippines" : "فيليپين",
	"Picture" : "تصوير",
	"Place your Congress candidature" : " کانديد هاي منتخب خود براي مجلس را انتخاب کنيد",
	"Please choose a country you want to live in." : "لطفا کشور مورد نظر خود براي زندگي را انتخاب کنيد.",
	"Please choose the region you want to live in" : "لطفا منطقه مورد نظر خود براي زندگي را انتخاب کنيد.",
	"Please choose the country you want to live in" : " لطفا کشور مورد نظر خود براي زندگي را انتخاب کنيد.",
	"Please choose the industry" : "لطفا صنعت مورد نظر خود را انتخاب کنيد",
	"Please select an Industry to see the marketplace offers" : "لطفا محصول مورد نظر براي ديدن پيشنهادات بازار انتخاب کنيد",
	"Please type your old password" : "لطفا رمز عبور قديمي خود را وارد کنيد",
	"Poland" : "لهستان",
	"Politic stats" : "وضعيت سياست",
	"Political career" : "وضعيت سياسي",
	"Political stats" : "وضعيت سياسي",
	"Politics" : "سياست ها",
	"Population": "جمعيت",
	"Population number": "جمعيت",
	"Portugal" : "پرتغال",
	"Post" : "بفرست",
	"Post this link on forums, blogs, messenger status or send it by yourself via email. People that register using your personal link will get you 5 Gold when they reach level 6." : "اين لينک را در وبلاگ و پيام هاي خود به ديگران بفرستيد. هر کس که با اين لينک عضو شد و به سطح 6 رسيد شما 5 طلا دريافت خواهيد کرد.",
	"Post a comment" : "ارسال نظر",
	"Post new offer" : "پشنهاد جديد",
	"Post new offers" : "ايجاد پيشنهادات جديد",
	"Presence:" : "وضعيت:",
	"Presence:  " : "وضعيت:",
	"President" : "رئيس جمهور",
	"President Elections" : "انتخاب رئيس جمهور",
	"Presidential elections" : "انتخابات رياست جمهوري",
	"President Impeachment" : "استيضاح رئيس جمهور",
	"Presidential candidates" : "نامزدهاي رياست جمهوري",
	"Press" : "مطبوعات",
	"Press director" : "مدير خبرنامه",
	"Prev" : "قبلي",
	"Presentation" : "برنامه",
	"Price" : "قيمت",
	"Price with taxes" : "قيمت با ماليات",
	"Privacy" : "پنهاني",
	"Private" : "سرباز",
	"Productivity" : "قابليت توليد",
	"Products" : "توليدات",
	"Profile":"پروفايل",
	"Proposed by": "ارائه شده توسط:",
	"Provider" : "آماده کننده",
	"Publish" : "منتشر کردن",
	"Quality" : "کيفيت",
	"Quality Level" : "سطح کيفيت",
	"Rank" : "رتبه",
	"Rank Private" : "رتبه خصوصي",
	"Ranked" : "رتبه بندي شده",
	"Rankings" : "رتبه بندي",
	"Raw materials" : "مواد اوليه",
	"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization" : "مواد اوليه تنها با اکانت کارخانه مي توانند خريداري شوند.",
	"Reach 1000 subscribers to your newspaper" : "روزنامه تان را به 1000 اشتراک برسانيد",
	"Reach the highest total damage in one battle" : "بيشترين مجموع ضربه را در نبرد وارد کن",
	"Reached 1000 subscribers to your newspaper" : "روزنامه تان به 1000 اشتراک رسيد",
	"Reached strength level 5" : "پنج سطح قدرت بدني بدست آورديد",
	"Reached the highest total damage in one battle" : "بيشترين ضربه را در يک نبرد زده ايد",
	"Rec exchange rate" : "نرخ معامله",
	"Region" : "منطقه",
	"Recruit" : "عضو جديد",
	"REJECTED" : "رد شد",
	"Rejected" : "رد شد",
	"Remove" : "حذف",
	"Remove friend" : "حذف کردن دوست",
	"Report abuse" : "گزارش سواستفاده",
	"report abuse" : "گزارش سواستفاده",
	"Represent your country (or eNation) in the real world" : "کشور خود را در دنياي جديد تمثيل کن",
	"Requirements" : "شرايط",
	"Retire" : "بازنشسته شو",
	"Resign" : "استعفا بده",
	"Resistance" : "انقلاب",
	"Resistance Hero" : "قهرمان انقلاب",
	"Resistance hero" : "قهرمان انقلاب",
	"Resistance War" : "انقلاب",
	"Resistance wars" : "انقلاب ها",
	"Resistance War Active" : "انقلاب هاي فعال",
	"Romania" : "روماني",
	"Run for congress" : "نامزد مجلس شو",
	"RURAL AREA" : "منطقه روستايي",
	"Russia" : "روسيه",
	"Salary" : "حقوق",
	"Sales" : "فروش",
	"See all donations" : "ديدن همه اهداها",
	"See all employees" : "ديدن همه کارمندان",
	"See all law proposals" : "ديدن همه لايحه ها",
	"See all members" : "ديدن همه اعضا",
	"see finished battles" : "ديدن نبردهاي پايان يافته",
	"See results" : "نمايش نتايج",
	"Send email invite" : "ارسال دعوت نامه با ايميل",
	"Select" : "انتخاب",
	"Select industry" : "انتخاب صنعت",
	"Secure" : "امن",
	"Sell" : "بفروش",
	"Sell company" : "فروش کارخانه",
	"Send message" : "ارسال پيام",
	"Send via: " : "ارسال با:",
	"Sent" : "بفرست",
	"September" : "سپتامبر",
	"Serbia" : "صربستان",
	"Sergeant" : "گروهبان",
	"Send invitation" : "ارسال دعوتنامه",
	"Shop" : "مغازه",
	"Shouts" : "فريادها",
	"Shout something:" : "فرياد بزن:",
	"Show active wars" : "جنگ هاي فعال را نشان بده",
	"show all accounts" : "نشان دادن همه اکانت ها",
	"Show all members" : "نشان دادن همه اعضا",
	"Show all donations" : "نشان دادن همه اعطايي ها",
	"Show all employees" : "نشان دادن همه کارمندان",
	"Show all law proposals" : "نشان دادن همه لايحه ها",
	"Show candidate list:" : "نشان دادن ليست نامزدها:",
	"Show candidate list" : "نشان دادن ليست نامزدها:",
	"Show candidates list" : "نشان دادن ليست نامزدها:",
	"show finished battles" : "نشان دادن نبردهاي پايان يافته",
	"show less" : "خلاصه",
	"Show my offers" : "پيشنهاد هاي من",
	"Show proposed members" : "نمايش اعضاي انتخاب شده",
	"of congress" : " مجلس",
	"of Congress" : " مجلس",
	"Show results" : "نمايش نتايج",
	"Singapore" : "سنگاپور",
	"Skill" : "تجربه",
	"Skill level" : "سطح تجربه",
	"Skills:" : "تجربه ها:",
	"Skills" : "تجربه ها",
	"Slovakia" : "اسلواکي",
	"Slovenia" : "اسلووني",
	"Social orientation" : "جهت گيري اجتماعي",
	"Soldier" : "سرباز",
	"soldier" : "سرباز",
	"Sort by" : "چينش بر اساس",
	"Social stats" : "وضعيت اجتماعي",
	"Society" : "اجتماع",
	"Society Builder" : "سازنده اجتماعي",
	"South Africa" : "افريقاي جنوبي",
	"South Korea" : "کره جنوبي",
	"Spain" : "اسپانيا",
	"Start a resistance war and liberate that region" : "يک انقلاب شروع کن و منطقه را بگير",
	"Started a resistance war and liberated " : "انقلاب آغاز شد و به پيروزي رسيد",
	"Started by" : "آغاز شده توسط",
	"started by" : "آغاز شده توسط",
	"started on" : "آغاز شد در",
	"Status" : "وضعيت",
	"Standard Training effect" : "تمرين عادي",
	"Strength gained" : "قدرت بدست آمده",
	"Still active " : "هنوز فعال است",
	"Stock" : "ذخيره",
	"Strength" : "قدرت",
	"Subscribe" : "اشتراک",
	"Subscribers" : "مشترکان",
	"Subscribe to comments" : "اشتراک نظرات",
	"Subscriptions" : "اشتراک",
	"SUBURBIA" : "حومه نشيني",
	"Super Soldier" : "سرباز فوق العاده",
	"Super soldier" : "سرباز فوق العاده",
	"supported by" : "پشتيباني شده توسط",
	"Supporting parties" : "احزاب پشتيبان",
	"Sweden" : "سوئد",
	"Switzerland" : "سوئيس",
	"Tax change: Defense System" : "تغيير ماليات: سيستم دفاعي",
	"Tax change: Diamonds" : "تغيير ماليات: الماس",
	"Tax change: Food" : "تغيير ماليات: غذا",
	"Tax change: Gift" : "تغيير ماليات: هديه",
	"Tax change: Grain" : "تغيير ماليات: گندم",
	"Tax change: Hospital" : "تغيير ماليات: بيمارستان",
	"Tax change: House" : "تغيير ماليات: خانه",
	"Tax change: Iron" : "تغيير ماليات: آهن",
	"Tax change: Moving Tickets" : "تغيير ماليات: بليط",
	"Tax change: Weapon" : "تغيير ماليات: اسلحه",
	"Tax change: Wood" : "تغيير ماليات: چوب",
	"Taxes" : "ماليات",
	"Terms of Service" : "شرايط سرويس",
	"Translate" : "ترجمه",
	"Thailand" : "تايلند",
	"The company offers no products in this market" : "کارخانه هيچ کالايي براي فروش نگذاشته است",
	"The skill of producing food, weapons, gifts and moving tickets." : "تجربه توليد غذا، اسلحه، هديه و بليط",
	"The law voting process takes 24 hours." : "پروسه راي گيري قانون 24 ساعت زمان مي برد.",
	"There are no active battles in this war" : "هيچ نبرد فعالي در اين جنگ وجود ندارد",
	"There are no discovered resources in this region yet" : "هيچ منابع اوليه اي در اين منطقه يافت نشده است",
	"There are no pending citizenship applications." : "هيچ درخواست تابعيتي وجود ندارد.",
	"There are no resistance wars in this country." : "هيچ انقلابي در اين کشور وجود ندارد.",
	"This citizen does not have any donations sent or received." : "شهروند هيچ اهدايي دريافت يا ارسال نکرده است.",
	"This country can trade with any other country in eRepublik." : "کشور مي تواند با ديگر کشور هاي ايريپابليک تجارت کند.",
	"To" : "به",
	"Title" : "عنوان",
	" to stay in touch with what happens on eRepublik." : "براي در جريان بودن از آنچه در ايريپابليک اتفاق مي افتد",
	"today" : "امروز",
	"Today" : "امروز",
	"Track invites" : "تعقيب دعوت شده ها",
	"Track Invites" : "تعقيب دعوت شده ها",
	"Tools" : "ابزار",
	"Top Rated" : "برترين ها",
	"Top rated" : "برترين ها",
	"Top rated news" : "داغ ترين اخبار",
	"Top Countries" : "برترين کشورها",
	"Top Chat Rooms" : "برترين اتاق هاي گفتگو",
	"Top Companies" : "برترين کارخانه ها",
	"Top News" : "برترين اخبار",
	"Top Citizens" : "برترين شهروندان",
	"Top Parties" : "برترين احزاب",
	"Total Citizens" : "مجموع شهروندان",
	"Total citizens" : "مجموع شهروندان",
	"Total damage:" : "مجموع ضربه ها",
	"Total damage" : "مجموع ضربه ها",
	"Total votes: " : "مجموع آرا: ",
	"Total votes:" : "مکموع آرا:",
	"Total productivity" : "توليد کل",
	"Train" : "تمرين",
	"Train bonus" : "پاداش تمرين",
	"Training" : "تمرين",
	"Training grounds" : "زمين تمرين",
	"Training effect" : "تاثير تمرين",
	"Treasury" : "هزينه",
	"Turkey" : "ترکيه",
	"Tutorials" : "کلاسهاي ويژه",
	"Ukraine" : "اوکراين",
	"UNDERGROUND" : "زيرزمين",
	"Unemployed" : "بيکار",
	"Unemployment rate" : "تعداد بيکاران",
	"Unlock Features" : "بازکردن امکانات",
	"United Kingdom" : "بريتانيا",
	"Unsubscribe" : "حذف اشتراک",
	"Unsubscribe to comments" : "حذف اشتراک نظرات",
	"until the region can be occupied or secured" : "تا اشغال يا حفظ منطقه",
	"Update" : "بروزرساني",
	"Upgrade quality level" : "ارتقا سطح کيفيت",
	"Uruguay" : "اروگوئه",
	"USA" : "امريکا",
	"Value added tax (VAT)" : "ماليات بر کالا",
	"VAT" : "ماليات بر کالا",
	"View the status of your invites and bonuses" : "ديدن پاداش و وضعيت دعوتهاي شما",
	"Venezuela" : "ونزوئلا",
	"Vicious fight, Private!" : "مبارزه بي رحمانه اي بود، سرباز!",
	"Vicious fight, Corporal!" : "مبارزه بي رحمانه اي بود، سرجوخه!",
	"Vicious fight, Sergeant!" : "مبارزه بي رحمانه اي بود،گروهبان!",
	"Vicious fight, Lieutenant!" : "مبارزه بي رحمانه اي بود، ستوان!",
	"Vicious fight, Captain!" : "مبارزه بي رحمانه اي بود، سروان!",
	"Vicious fight, Colonel!" : "مبارزه بي رحمانه اي بود، سرهنگ!",
	"Vicious fight, General!" : "مبارزه بي رحمانه اي بود، ژنرال!",
	"Vicious fight, Field Marshall!" : "مبارزه بي رحمانه اي بود، سپهبد!",
	"View requests" : "نمايش درخواست کنندگان",
	"View all comments" : "نمايش همه نظرات",
	"votes" : "آرا",
	"Vote" : "راي",
	"Voter" : "راي دهندگان",
	"War" : "جنگ",
	"Wars" : "جنگ ها",
	"Wars list" : "ليست جنگ ها",
	"Weak fight, Private!" : "مبارزه ضعيفي بود، سرباز!",
	"Weak fight, Corporal!" : "مبارزه ضعيفي بود، سرجوخه!",
	"Weak fight, Sergeant!" : "مبارزه ضعيفي بود، گروهبان!",
	"Weak fight, Lieutenant!" : "مبارزه ضعيفي بود، ستوان!",
	"Weak fight, Captain!" : "مبارزه ضعيفي بود، سروان!",
	"Weak fight, Colonel!" : "مبارزه ضعيفي بود، سرهنگ!",
	"Weak fight, General!" : "مبارزه ضعيفي بود، ژنرال!",
	"Weak fight, Field Marshall!" : "خسته نباشيد!!؟",
	"Weapon" : "اسلحه",
	"weapon" : "اسلحه",
	"Weapon quality" : "کيفيت اسلحه",
	"Wellness" : "سلامتي",
	"Wellness loss" : "از دست دادن سلامتي",
	"Winner" : "برنده",
	"Who" : "چه کسي",
	"Wildcards" : "علل بدل ها",
	"Win the Congress elections": "پيروز انتخابات مجلس شو",
	"Win the Presidential elections": "پيروز انتخابات رياست جمهوري شود",
	"Won the Presidential elections": "پيروز انتخابات رياست جمهوري شديد",
	"Wood" : "چوب",
	"World Map" : "نقشه",
	"wood" : "پوب",
	"Worked 30 days in a row" : "30 روز متوالي کار کرديد",
	"Work for 30 days in a row" : "30 روز متوالي کار کنيد",
	"Work Bonus" : "پاداش کار",
	"World" : "جهان",
	"Write article" : "مقاله بنويس",
	" xp points " : " امتياز تجربه ",
	" xp points" : " امتياز تجربه",
	"Yes" : "بله",
	"yesterday" : "ديروز",
	"You are allowed to create and administrate ONLY one eRepublik citizen. Breaking this rule you will face the risk of having all your citizen accounts suspended." : "شما مجاز به ساختن تنها يک اکانت شهروندي هستيد. زير پا گذاشتن اين قانون مي تواند موجب بسته شدن همه اکانت هاي شما شود.",
	"You are already an employee. To get this job please quit your current job." : "شما کارمند هستيد. براي انتخاب اين شغل از شغل کنوني خود خارج شويد.",
	"You are not a member of a party" : "شما عضو حزب هستيد",
	"You cannot resign from your job until" : "شما نمي توانيد از شغل خود استعفا دهيد تا",
	"You can't become a soldier" : "شما نمي توانيد سرباز شويد",
	"You cannot join this fight because your wellness must be at least 40. Your current wellness is" : "شما نمي توانيد بجنگيد چون سلامتي شما نبايد از 40 کمتر باشد. سلامتي  شما اکنون اين مقدار است",
	"You cannot join this fight because your wellness must be at least 40. You can get wellness from"  : "شما نمي توانيد بجنگيد چون سلامتي شما نبايد از 40 کمتر باشد، شما مي توانيد سلامتي دريافت کنيد از",
	"You cannot join this fight because your wellness must be at least 40." : "شما نمي توانيد بجنگيد چون سلامتي شما نبايد از 40 کمتر باشد.",
	"You are not a president or a congress member in this country" : "شما رئيس جمهور يا نماينده مجلس اين کشور نيستيد",
	"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "اگر شهروندي که شما دعوت کرده ايد به سطح 6 برسد شما 5 طلا دريافت خواهيد کرد.",
	"You can exchange money at the" : "شما مي توانيد پول تبديل کنيد در",
	"You can get wellness from:" : "شما مي توانيد سلامتي بدست بياوريد در:",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "شما مي توانيد عضو يک حزب شويد يا حزب خودتان را تاسيس کنيد. وقتي شما عضو يک حزب مي شويد شانس اين را داريد که نماينده مجلس يا حتي رئيس جمهوري شويد.",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "شما نمي توانيد در اين منطقه انقلاب راه بياندازيد چون اين منطقه اصلي اين کشور است.",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "شما نمي توانيد در اين منطقه انقلاب راه بياندازيد چون اين منطقه اصلي اين کشور است.",
	"You cannot trade with this country as you are at war with it" : "شما نمي توانيد با اين کشور که با آن در جنگ هستيد تجارت کنيد.",
	"You didn't specify the amount of products you wish to buy" : "شما مقدار خريد را تعيين نکرده ايد.",
	"You do not own a moving ticket. You can buy moving tickets from Marketplace" : "شما بليطي نداريد. شما بايد از بازار بليط بخريد.",
	"You do not have a newspaper" : "شما روزنامه نداريد.",
	"You don't have a newspaper" : "شما روزنامه نداريد.",
	"You do not have any articles, if you want to write an article you should enter here:" : "شما هيچ مقاله اي ارسال نکرده ايد، اگر مي خواهيد مقاله اي بنويسيد بايد وارد اين بخش شويد:",
	"You do not have a job" : "شما شغلي نداريد",
	"You don't have any active job offers" : "شما پيشنهاد شغلي فعالي نداريد",
	"You do not have any active job offers" : "شما پيشنهاد شغلي فعالي نداريد",
	"You have already worked today." : "شما امروز کار کرده ايد.",
	"You have not worked today." : "شما امروز کار نکرده ايد.",
	"You have not trained today" : "شما امروز تمرين نکرده ايد",
	"You have no favorite chat rooms" : "شما اتاق گفتمان مورد علاقه اي نداريد",
	"You have not created any organization yet." : "شما تا کنون اکانت شرکتي درست نکرده ايد.",
	"You received 50 wellness from hospital" : "شما 50 سلامتي از بيمارستان دريافت کرده ايد",
	"You have succesfully edited your profile" : "پروفايل شما ويرايش شد",
	"You have trained today. You can train again tomorrow." : "شما امروز تمرين کرده ايد. مي توانيد فردا دوباره تمرين کنيد.",
	"Your personal invitation link" : "لينک دعوت نامه شخصي شما",
	"You must be at least level 2 to be able to train. Now, you can:" : "شما بايد حداقل سطح 2 باشيد تا بتوانيد تمرين کنيد، شما مي توانيد:",
	"Your account" : "اکانت شما",
	"Your name:" : "نام شما:",
	"You need at least 25 Experience Points to join this fight" : "شما براي جنگيدن حداقل 25 تجربه نياز داريد",
	"Your accounts" : "اکانت هاي شما",
	"Your birthday" : "تولد شما",
	"Your comment" : "نظر شما",
	"Your companies" : "کارخانه هاي شما",
	"Your email here" : "محل ايميل شما",
	"Your inventory" : "انبار شما",
	"Your offer has been updated" : "پيشنهاد شما بروز شد",
	"Your strength:" : "قدرت بدني شما:",
	"Work" : "کار",
	"War > Battlefield" : "صحنه نبرد",
	"Aegean Islands" : "جزاير آژن",
	"Attica" : "آتيکا",
	"Central Greece" : "يونان مرکزي",
	"Crete" : "گيريت",
	"Epirus" : "اپيروس",
	"Ionian Islands" : "جزاير ايونيا",
	"Macedonia" : "مقدونيه",
	"Free" : "رايگان",
	"Become a citizen" : "شهروند شويد",
	"Top countries in eRepublik" : "کشورهاي برتر ايريپابليک",
	"Forum discussions" : "مباحث تالارگفتمان",
	"Forgot password?" : "فراموشي رمز عبور",
	"Password" : "رمز عبور",
	"Remember me" : "به خاطر بسپار",
	"top countries in eRepublik" : "کشورهاي برتر در ايريپابليک",
	"more discussions" : "مباحث بيشتر",
	"It's 100% free and only takes a minute or two" : "کاملا رايگان است و تنها يک يا دو دقيقه وقت مي برد",
	"Take the 4 step tour and find out why it's such a great game":"يک گشت و گذاري قبل از عضويت داشته باشيد",
	"Citizen Name" : "نام شهروند",
	"Retype" : "تکرار کنيد",
	"Please choose the country you want to live in" : "کشوري را که مي خواهيد در آن زندگي کنيد انتخاب کنيد",
	"Birthday" : "روز تولد",
	"I agree with the" : "قبول مي کنم",
	"Sign up for the weekly newsletter" : "عضويت خبرنامه هفتگي",
	"Gender" : "جنسيت",
	"for 10 shouts/day and more" : "براي روزانه 10 فرياد بيشتر",
	"Jan" : "ژوئن",
	"Forfeit points" : "امتياز منفي",
	"Gold" : "طلا",
	"Move" : "جابجايي",
	"This message will be displayed to the members of Congress who will be able to accept or deny your citizenship request." : "اين پيام براي نمايندگان مجلسي که مي توانند درخواست شما را انجام دهند نمايش مي يابد.",
	"Apply for citizenship" : "درخواست تابعيت",
	"Please type in a short description why you are applying for citizenship" : "لطفا توضيح کوتاهي براي درخواست تابعيت خود بنويسيد",
	"Chat room details" : "اطلاعات اتاق گفتمان",
	"Room name" : "نام اتاق",
	"Public" : "عمومي",
	"Private" : "خصوصي",
	"Room type" : "نوع اتاق",
	"Create room" : "اتاق بسازيد",
	"days ago" : "روز پيش",
	"Report company" : "گزارش کارخانه",
	"Show more details" : "بيشتر",
	"Show less details" : "کمتر",
	"Products" : "توليدات",
	"Market offers" : "پيشنهادات بازار",
	"Interactive Map" : "نقشه هم کنش",
	"Report law" : "گزارش لايحه",
	"Report" : "گزارش",
	"No chat rooms" : "اتاق گفتگويي موجود نيست",
	"Organization details" : "اطلاعات اکانت شرکت",
	"Organization name" : "نام اکانت شرکت",
	"Your email address:" : "آدرس پست الکترونيکي شما",
	"Retype password" : "تکرار",
	"Minimum number of characters is 6" : "حداقل 6 حرف",
	"eRepublik region" : "منطقه",
	"Organization logo" : "برند اکانت شرکت",
	"Copy" : "کپي" ,
	"Republic of Moldova" : "جمهوري مولديوي",
	"Buy" : "بخر",
	"The skill of producing food, weapons, gifts and moving tickets." : "تجربه توليد غذا، اسلحه، هديه و بليط",
	"You cannot buy a company that belongs to someone outside your country." : "شما نمي توانيد کارخانه خارج از کشورتان را بخريد.",
	"In order to own a company you have to resign from your job." : "براي تاسيس کارخانه از شغل فعلي خود استعفا دهيد.",
	"Official candidates" : "نامزدهاي رسمي" ,
	"Wildcards" : "علل بدل ها",
	"Not qualified" : "انتخاب نشده ها",
	"Total votes:" : "آراي کل:",
	"Presence:" : "حضور" ,
	"Wiki" : "ويکي" ,
	"wiki" : "ويکي" ,
	"Blog" : "وبلاگ" ,
	"eRepublik Shop" : "مغازه ايريپابليک" ,
	"Your title should not exceed 80 characters" : "عنوان نبايد بيشتر از 80 حرف باشد",
        "Esfahan" : "اصفهان",
        "Fars" : "فارس",
        "Hormozgan" : "هرمزگان",
        "Kerman Province" : "کرمان",
        "Mazandaran and Golistan" : "مازندران و گلستان",
        "Northwestern Iran" : "استان شمال غربي",
		"Razavi Khorasan" : "خراسان رضوي",
		"Semnan" : "سمنان",
		"South Khorasan" : "خراسان جنوبي",
		"Southwestern Iran" : "استان جنوب غربي",
		"Yazd" : "يزد",
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 متفقين";
regexps["^Active wars in (.*)$"] = "جنگ هاي فعال $1:";
regexps["^Active resistance wars in (.*)$"] = "انقلاب هاي فعال $1:";
regexps["(\\s*)Expires in (\\d*) days"] = "بعد $2 منقضي مي شود";
regexps["(\\s*)Expires in (\\d*) hours"] = "بعد $2 ساعت منقضي مي شود";
regexps["^(\\d*) comments$"] = "$1 نظرات";
regexps["^(\\d*) hours ago$"] = "$1 ساعت پيش";
regexps["^(\\d*) minutes ago$"] = "$1 دقيقه پيش";
regexps["^(\\d*) days ago$"] = "$1 روز پيش";
regexps["^(\\d*) months ago$"] = "$1 ماه پيش";
regexps["^Regions \\((\\d*)\\)"] = "مناطق ($1)";
regexps["^Friends \\((\\d*)\\)"] = "دوستان ($1)";
regexps["^(\\d*) months"] = "$1 ماه";
regexps["^Comments(.*)"] = "نظرات $1";
regexps["^Trackbacks(.*)"] = "متن هاي قديمي $1";

matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
//	GM_log("check '"+key+"'");
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
//		GM_log("match "+reg+" -> "+ rrrr+ " : "+result);
		if (key.match(rrrr)!==null) {
//			GM_log("match "+reg+" in "+key);
			return key.replace(rrrr,regexps[reg]);
		}
	}
	return undefined;
};

translate = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return undefined;
};

translateWithRegexp = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return matchRegexps(key);
};

var allTrans = {
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":""
//  "a":"" 
};

militaryPage = function() {
  var _nodes = document.getElementsByTagName("p");
  var _node;
  for (var _key in _nodes) {
    if (_nodes[_key]!==null) {
      _node = _nodes[_key];
      if (_node.childNodes.length==2 && _node.childNodes[1].tagName=="A") {
        var tr = matchRegexps(_node.childNodes[0].nodeValue);
        if (tr!==undefined) {
          _node.childNodes[0].nodeValue = tr;
        }
      }
    }
  }
};

fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        /* 
        var newVal = flashVars.replace(/txt=(.*)&&(.*)/,"txt="+trValue+"&&$2");
        alert("flashvars = "+flashVars + " -> "+txtValue + " -> "+trValue+ " : "+newVal);
        node.attributes.getNamedItem("flashvars").nodeValue = newVal;*/
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}

translateWholePage = function(e) {
  if (document.location.toString().indexOf("/country/military")!=-1) {
    militaryPage();
  }

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
//GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('tbody, .dotted, .core { font-size: 12px ! important; }');
addGlobalStyle('.quarterhead { font-size: 11px ! important; }');
addGlobalStyle('.x { font-size: 24px ! important; }');
addGlobalStyle('#menu ul li#menu1 a, #menu ul li#menu2 a, #menu ul li#menu3 a, #menu ul li#menu4 a, #menu ul  li#menu5 a, #menu ul  li#menu6 a, #logo a { background-image: url(http://kimag.es/share/46248301.png); }');
addGlobalStyle('.btnGetExtraStorage { font-size: 10px; }');

window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(500, translateWholePage)
}, false
);

//version 1 added (jadid)

//eIran ORDER
//Uses GDocs as a backup if the forum is down
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://docs.google.com/View?id=d64b7wc_0ft3wvqdv',

    onload:function(response){
        output_orders(generate_order_string(response.responseText, "//div[@id='doc-contents']"));
    }       
});

function generate_order_string(responseText, path_to_target)
{
    //Take the responseText and return the orders string using XPath.
    //Returns a string and assumes the XPath is unique (returns only text from
    //first found element)
    
    var doc = document.createElement('div');
    doc.innerHTML = responseText;
    var results = document.evaluate(path_to_target, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    order_string = results.snapshotItem(0).textContent.match('.*?#')[0];
    //Trim it by a character to remove the hash and return it
    return order_string.substring(0, order_string.length - 1);
}

function output_orders(order_string)
{
    //Takes a string, splits it, and adds it to the eRep page

    var tags = order_string.split('|');
    var orders = tags[0];
    var region = tags[1];
    var link = tags[2];
    var date_issued = tags[3];

    latest = document.getElementById('latestnews');

    var orders_box = document.createElement("div");
    orders_box.innerHTML = '<h3>' + orders + ' ' + region + '</h3>' +
                           ' <a href="' + link + '">' + link + '</a>'+ 
                           '<h3>آخرين به روز رساني : ' + date_issued + '</h3>'

    //Insert elements on page
    if(order_string.length) {   //Only insert if string is uncommented
        latest.parentNode.insertBefore(orders_box, latest);
    }
}
//finish
//military tracker
var html = '<embed width="500" height="30" src="/flash/delicious.swf" quality="best" flashvars="txt=سيستم نمايشگر اطلاعات شهروندان&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"/>'
var nCitizens
var count = 0
var CitizensMap = new Array();

function fetchCitizensWellness (ids)
{
	nCitizens = ids.length
	html += '<table style="color: rgb(153, 153, 153);"><tr><th style="background: rgb(220,220,220);padding:2px">نام</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">سلامتي</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">مکان</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">قدرت</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">رتبه</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">ضربه</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">دونيت</th><th style="text-align:center;background: rgb(220,220,220);">&nbsp;پيام</th><th style="text-align:center;background: rgb(220,220,220);">'+
		'&nbsp;حذف</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">اسلحه</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">ضربه در هر مبارزه</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">مبارزه ها</th><th style="text-align:center;background: rgb(220,220,220);padding:2px">مجموع ضربات</th></tr>'
	for(var i=0;i<ids.length;i++) {
		fetchCitizenWellness(ids[i])
	}
}

function addCitizen(e) {
    e.stopPropagation( );
	e.preventDefault( );
	var fo = GM_getValue("Citizens", null);
	var f = null
	if (fo==null) {
		f = new Array()
	} else {
		f = eval(fo)
	}
	f.push(document.getElementById('newCitizen').value)
	GM_setValue("Citizens", uneval(f))
   	f = eval(GM_getValue("Citizens", null))
   	window.location.reload()
}

function removeCitizen(e) {
    e.stopPropagation( )
	e.preventDefault( )
	var ids = this.toString().split("/")
	removeFromArray(ids[ids.length-1])
	window.location.reload()
	return false
}

function removeFromArray(id) {
	var f = eval(GM_getValue("Citizens", null))
	var index = f.indexOf(id)
	f.splice(index,1)
	GM_setValue("Citizens", uneval(f));
}

function fetchCitizenWellness(id)
{
	var Citizen = null
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://api.erepublik.com/v1/feeds/citizens/'+escape(id)+'.json',
            onload:function(response)
            {

				try {
					Citizen = eval('(' + response.responseText + ')')
					html += '<tr><td><a href="/en/citizen/profile/'+Citizen.id+'">'+Citizen.name+'</a></td><td style="text-align:center">'+Citizen.wellness+
					'</td><td style="text-align:center">'+Citizen.country+'</td><td style="text-align:center">'+Citizen.strength+
					'</td><td style="padding-left: 4px">'+Citizen.military_rank+'</td><td style="padding-left: 4px">'+Citizen.damage+
					'</td><td style="text-align:center"><a id="Donate" href="/en/citizen/donate/items/'+Citizen.id+'"><img src="/images/parts/icon-gold.gif" width="14" height="16"</a></td><td style="text-align:center"><div id="miniprofile" style="width: 25px"><a class="msg" href="/en/messages/compose/'+Citizen.id+'"></a></div>'+
					'</td><td style="text-align:center"><a id="'+id+'_id" href="'+id+'" style="padding-left: 4px">X</a>'+
					'</td><select  style="text-align:center" id="weapon_'+id+'"><option value="0">None</option><option value="1">Q1</option><option value="2">Q2</option>'+
					'<option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option></select>'+
					'</td><td style="text-align:center" id="dam_'+id+'" style="padding-left: 4px; color:#000;text-align:right;">0'+
					'</td><select style="text-align:center"  id="amm_'+id+'"><option value="0">0</option><option value="1">1</option><option value="2">2</option>'+
					'<option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option></select>'+
					'</td><td  style="text-align:center" id="tdam_'+id+'" style="padding: 0 4px 0 4px; color:#000;text-align:right;">0'+
					'</td></tr>'
					CitizensMap[id]=Citizen
				} catch(err) {

					removeFromArray(id)
				}
				if (++count==nCitizens) {
					html+='<td colspan="10" style="text-align: right">مجموع ضربه اين يونيت نظامي: </td><td id="unittotal" style="font-size:1.1em;padding-left: 4px; color:#000;text-align:right;">0</td>'
                                        html+= '</table>'
					html+= '<form id="CitizenForm" action="#">'+
						'<input type="text" name="fname" id="newCitizen" /><input type="submit" value="add more"/>آپديت: از کد فرد استفاده کنيد نه از نام</form> '
					var displayEl = document.createElement("div");
					displayEl.setAttribute('class', 'core');
				    displayEl.setAttribute('style', 'padding-bottom:10px;');
				    displayEl.innerHTML = html;
				    latest=document.getElementById('content');
				    latest.parentNode.insertBefore(displayEl, latest);


					$('CitizenForm').addEventListener('submit', addCitizen, true);
					var fo = GM_getValue("Citizens", null)
					if (fo!=null) {
						var f = eval(fo)
						for (var i=0;i<f.length;i++) {
							if ( $(f[i]+"_id") != null) {
								$(f[i]+"_id").addEventListener("click", removeCitizen, true)
							}
						}
					}

				}
				changePop()
            }
        }
    );
}

function $(A) {return document.getElementById(A);}

function Main(e) {
   var fo = GM_getValue("Citizens", null)
   var f = null
   if (fo!=null) {
		f = eval(fo)
   } else {
	f = new Array();
	GM_setValue("Citizens", uneval(f))
   }
   if (f.length==0) {
		f.push('xsxsxsxsxsxsxs')
   }
   fetchCitizensWellness (f)
}

var ranks = ['سرباز','سرجوخه','گروهبان','ستوان','فرمانده','سرهنگ','ژنرال','سپهبد']
function changePop() {
	var unittotal=0
	for (var id in CitizensMap) {
		var R = 1+(ranks.indexOf(CitizensMap[id].military_rank)+1)/5.0
		var weap = ($('weapon_'+id).value)
		var Q=0.5
		if (weap>0) {
			Q=1+(weap/5.0)
		}
		var S=CitizensMap[id].strength
		var W = 1 + ((CitizensMap[id].wellness - 25) / 100.0)
		var damage = R*Q*S*W*2

		$('dam_'+id).innerHTML = Math.round(damage)

		var We = CitizensMap[id].wellness
		var tdamage = 0
		var x = ($('amm_'+id).value)
		for(var y=0;y<x;y++){
		var Re = 1+(ranks.indexOf(CitizensMap[id].military_rank)+1)/5.0
		var weape = ($('weapon_'+id).value)
		var Qe=0.5
		if (weape>0) {
			Qe=1+(weap/5.0)
		}
		var Se=CitizensMap[id].strength
		var Wx = 1 + ((We - 25) / 100.0)
		var xdamage = Re*Qe*Se*Wx*2
		tdamage = tdamage + xdamage
		We = We - 10
		$('tdam_'+id).innerHTML = Math.round(tdamage)
		}
                unittotal+=Math.round(tdamage)
	}
        $('unittotal').innerHTML = unittotal

}

window.addEventListener('load', Main, false);
window.addEventListener('change', changePop, true);
//finished
//start
// Add 'missing' trim to the String class
String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, '');
}

// URL Setup
var CURR_URL = location.href;
var arrURL = CURR_URL.split('/');
var BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';

// Constants
var VERSION = '1.0';
var LOCALE = 'en/';
var RANKS = ['سرباز','سرجوخه','گروهبان','ستوان','فرمانده','سرهنگ','ژنرال','سپهبد'];
var INDUSTRIES = ['', 'Food', 'Gift', 'Weapon', 'Moving Tickets'];
var SKILLS = ['all', 'manufacturing', 'land', 'constructions'];
var sCitizenId = '';

function monetaryMarketDivider(){
    $("[id^=form_amount_accept_]").live('click', function(){
        var id = $(this).attr("id");
        var tmp = id.split("_");
        id = tmp[tmp.length - 1];
        
        var ammount = $("#sell_currency_account_float_amount").val();
        var rate = $("#exchange_value_amount_" + id).text();
        var possible = $("#initial_amount_" + id).text();
        var buy = ammount / rate;
        
        buy = buy * 100;
        buy = buy + "a";
        var stuff = buy.split("\.");
        buy = stuff[0] / 100;
        
        if (buy > 0) {
            if (buy > possible) 
                $(this).val(possible);
            else 
                $(this).val(buy);
        }
    });
}

function simplyClickTransfer(){
    $('#small .sortItem').live('click', function(){
        $('#big').append($(this).clone());
        $(this).remove();
    });
    
    $('#big .sortItem').live('click', function(){
        $('#small').append($(this).clone());
        $(this).remove();
    });
}

function quickHealButton(){
    var sHref = $('.buttonalign .padded .dotted').attr('href');
    if (sHref != null) {
        $.getScript("/js/country/countryPage.js", function(){
        });
        
        $(".buttonalign .padded a").after('</br><span id="loading">صبر کنيد</span>');
        $('#loading').load(sHref + ' #heal_form');
    }
}

function init(e){
    initVariables(e);
    initUI(e);
}

function initVariables(e){
    try {
        sCitizenId = $('div.core div.avatarholder a').attr('href').split('/')[4] + '_';
    } 
    catch (e) {
    }
    
    if (typeof unsafeWindow == 'undefined') 
        unsafeWindow = window;
    
    var subURL = CURR_URL.substr(BASE_URL.length);
    LOCALE = subURL.substring(0, 2) + '/';
    BASE_URL += LOCALE;
}

function initUI(e){
    $.each(UI.Init, function(strFnName){
        this.once();
    });
    
    var subURL = CURR_URL.substr(BASE_URL.length);
    
    var pagesFunctions = [{
        page: 'exchange[/,?]',
        once: monetaryMarketDivider
    }, {
        page: 'donate/items/',
        once: simplyClickTransfer
    }, {
        page: 'battles/show/',
        once: quickHealButton
    }];
    
    pagesFunctions.forEach(function(pf){
        if ((subURL.match(pf.page))) 
            pf.once();
    });
}

window.addEventListener('load', function(){
    var checker = setInterval(function(){
        if (typeof($ = jQuery.noConflict()) != 'undefined') {
            clearInterval(checker);
            init();
        }
    }, 100);
}, false);

UI = {
    addStyle: function(strStyle){
        $('<style type="text/css">' + strStyle + '</style>').prependTo('head');
    }
}

UI.Init = {
    addMainStyle: {
        page: ['all', 'special'],
        once: function(){
            UI.addStyle(' \
        				#quickbuttondisplay { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#F0F0F0 none repeat scroll 0 0; display:block; float:left; margin:12px 0; padding:0; width:69px; } \
						#quickbuttondisplay .item { -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; background:#FFFFFF none repeat scroll 0 0; display:block; float:left; margin:0 0 1px; padding:3px; width:63px; } \
            ');
        }
    },
    modifyExistingStyle: {
        page: ['all', 'special'],
        once: function(){
        }
    },
    addQuickButtonDiv: {
        page: ['all', 'special'],
        once: function(){
            return;
            $('#miniprofile').append(' \
				<span id="id_round_button_ajax" class="round_btt-start"> \
					<span class="round_btt-end"> \
						<input type="submit" id="dailyWork" style="cursor: pointer;" class="round_btt-core" value="Work" onclick="javascript:alert(\'Work clicked\');return;"> \
					</span> \
				</span> \
			');
        }
    }
}
//finished
//donater starts
var MyNumberToDonate = 5;
var junk = document.getElementById("donationlink");

// Retrieve Number, mult by 1 to make sure it IS a number(major bug otherwise)

	MyNumberToDonate = GM_getValue("MyNumberToDonate","5") * 1;


// Creates input boxes

if (junk) {
    var stuff = document.createElement('div');
	stuff.innerHTML = '<div> مقدار: <input type="text" id="NumberToDonate" value="' + MyNumberToDonate + '" size="2" /><br/>واقعي: <span id="Num"></span><br/><br/><input type="button" id="AutoDonateButton" value="آپديت موجودي" class="vround-btn-core" style="color: green" /></div>';
	junk.parentNode.insertBefore(stuff, junk);
}

	var button = document.getElementById("دکمه انتقال خودکار");	
	button.addEventListener("click", update, true);

	var matches = document.getElementById("small").innerHTML.match(/<li style\="-moz-user-select\: none;" class\="sortItem" id\="user_([0-9]*)">/g);
	var output = "";

	var url = document.location.href;
	var isCompany = url.match("/company/");

	if (isCompany){
		MyNumberToDonate = matches.length;
	}


if (MyNumberToDonate <= 10){

	if (MyNumberToDonate > document.getElementById("available_items").value){
	MyNumberToDonate = document.getElementById("available_items").value;
	}

}

if (MyNumberToDonate > matches.length){
		MyNumberToDonate = matches.length;
	}

if (MyNumberToDonate > document.getElementById("available_items").value){

if (document.getElementById("available_items").value < 10){
MyNumberToDonate = document.getElementById("available_items").value;
}

}

document.getElementById("Num").innerHTML = MyNumberToDonate;

for (i = 0; i < MyNumberToDonate; i++){
	id = matches[i].split('<li style="-moz-user-select: none;" class="sortItem" id="user_')[1].split('">')[0];
	output = output + '<input id="products_'+id+'" type="hidden" value="'+id+'" name="products[]"/>';
}

document.getElementById("big").innerHTML = output;

function update(e) {	
	
	var NumberToDonate = document.getElementById("تعداد براي انتقال").value;

	GM_setValue("تعداد براي انتقال", NumberToDonate);
window.location = url;

}
//finished
// hamuun!
//Default settings:
const fix_wiki_links = true;
const search_redirect = false;
const auto_subscribe = true; // Not to be confused with autoSubscribe or AutoSubscribe (confusing, I know)
const comment_sub = true;
const no_presentation = false;
const in_game_settings = false;
const next_train = false;
const next_work = true;
const next_hw = true;
const comments_link = true;
const autoSubscribe = true;
const HWDaysToGo = false;
var citizenID;

// re: Which page(s) the function should be executed on
// fu: Function to execute
// en: The name of the default settings variable (and greasemonkey value)
// name, desc: Shown on the tools page
// loggedout: Whether it should run if the user is logged out
var features = [
{"re":/.*/, "fu":FixWikiLinks, "en":"fix_wiki_links", "name":"Fix Wiki Links", "desc":"Fixes the in-game links to the eRepublik Wiki.", "loggedout":true},
{"re":/^\/search/, "fu":SearchRedirect, "en":"search_redirect", "name":"Search Redirect", "desc":"If there is only one search result, you will automatically be redirected to that player/org.", "loggedout":true},
{"re":/^\/(newspaper|article)\//, "fu":AutoSubscribe, "en":"auto_subscribe", "name":"Auto-Subscribe", "desc":"Viewing a newspaper or article will subscribe you to that newspaper. This can be switched on/off while viewing a newspaper by clicking the Auto Sub button beneath the Subscribe button."},
{"re":/^\/article\//, "fu":CommentsSubscribe, "en":"comment_sub", "name":"Comments Subscribe", "desc":"By leaving a comment on an article, you will automatically be subscribed to the comments of the article."},
{"re":/^\/elections\/country-\d+-election-congress-(\d+-)?date-\d+-\d+-region-\d+/, "fu":NoPresentation, "en":"no_presentation", "name":"Fix Presentation Links", "desc":"Fixes an eRepublik bug on the elections page which shows links to congress candidates' presentations even if they don't have one."},
{"re":/^\/(badges|rss_menu)/, "fu":GoGoGadgetSettings, "en":"in_game_settings", "loggedout":true},
{"re":/^\/my-places\/army/, "fu": NextTrain, "en":"next_train", "name":"Strength After Next Train", "desc":"Displays on the army page what your strength will be after the next time you train."},
{"re":/^\/company/, "fu": NextWork, "en":"next_work", "name":"Skill After Next Work", "desc":"Displays on the company page what your skill will be after the next time you work."},
{"re":/^\/company/, "fu": NextHW, "en":"next_hw", "name":"Next Hard Worker medal", "desc":"Displays on the company page how many more days you must work until you receive a hard worker medal. Also shows when you're viewing your profile and you hover the cursor over your hard worker medal."},
{"re":/^\/citizen\/profile/, "fu": NextHW2, "en":"next_hw", "name":"", "desc":""},
{"re":/^\/article\//, "fu": CommentsLink, "en":"comments_link", "name":"Fix #comments", "desc":"Fixes an eRepublik bug where the page doesn't scroll to the comments section when you're viewing an article and the URL ends in '#comments' (e.g. when you click the 'xx comments' link below the article title).", "loggedout":true}
];
var countries = [, 'Romania',,,,,,,, 'Brazil', 'Italy', 'France', 'Germany', 'Hungary', 'China', 'Spain',,,,,,,, 'Canada', 'USA',, 'Mexico', 'Argentina', 'Venezuela', 'United-Kingdom', 'Switzerland', 'Netherlands', 'Belgium', 'Austria', 'Czech-Republic', 'Poland', 'Slovakia', 'Norway', 'Sweden', 'Finland', 'Ukraine', 'Russia', 'Bulgaria', 'Turkey', 'Greece', 'Japan',, 'South-Korea', 'India', 'Indonesia', 'Australia', 'South-Africa', 'Moldavia', 'Portugal', 'Ireland', 'Denmark', 'Iran', 'Pakistan', 'Israel', 'Thailand',, 'Slovenia',, 'Croatia', 'Chile', 'Serbia', 'Malaysia', 'Philippines', 'Singapore', 'Bosnia-Herzegovina', 'Estonia', 'Latvia', 'Lithuania', 'North-Korea', 'Uruguay', 'Paraguay', 'Bolivia', 'Peru', 'Colombia'];
var industries = [,'Food','Gift','Weapon','Moving-Tickets','Grain','Diamonds','Iron','Oil','Wood','House','Hospital','Defense-System'];

var skill;

function subscribe(comments) //if comments==true, subscribe to comments - if not, subscribe to newspaper
{
 var newScript = document.createElement("script");
 newScript.type = "application/javascript";
 newScript.innerHTML = (comments?"subscribeToComments('subscribe');":"getSubscribers('subscribe', 0);");
 document.body.appendChild(newScript);
}

function getGMVal (name)
{
 return ((GM_getValue(citizenID+"."+name) == undefined) ? eval(name) : (GM_getValue(citizenID+"."+name)));
}

function setGMVal (name, value)
{
 GM_setValue(citizenID+"."+name, value);
}

function deleteGMVal (name)
{
 GM_deleteValue(citizenID+"."+name);
}


function FixWikiLinks()
{
 var links = document.getElementsByTagName("a");
 var reu = /^http:\/\/wiki.erepublik.com\/index.php\/(Citizen|Company|Country|Newspaper|Party|Region)_/;
 for (x in links)
 {
  if (!reu.test(links[x].href)) continue;
  var newhref;
  if (/\/Region_/.test(links[x].href)) newhref = "http://wiki.erepublik.com/index.php/" + document.title.replace("eRepublik Region | ","");
  else newhref = links[x].href.replace(reu,"http://wiki.erepublik.com/index.php/");
  links[x].href = newhref.replace(/\s|%20/g,"_").replace(/^\s*|\s*$/g,"");
 }
}

function SearchRedirect()
{
 var entities = document.getElementsByClassName("entity")
 if (entities.length==1)
 {
  entities[0].parentNode.parentNode.parentNode.innerHTML += "<tr><td colspan='4' style='text-align:center;padding:10px'>Redirecting...</td></tr>"
  location.assign(entities[0].getElementsByTagName("a")[0].href);
 }
}

function AutoSubscribe()
{
 if(document.getElementsByClassName("subscribeToNewspaper").length)
 {
  if (getGMVal("autoSubscribe")&&document.getElementsByClassName("subscribeToNewspaper")[0].style.display != "none") subscribe(false);
  var coolStory = document.createElement("a");
  coolStory.href = "#";
  coolStory.className = "goright";
  coolStory.id = "autosuba";
  coolStory.innerHTML = "Auto Sub is O" + (getGMVal("autoSubscribe")?"n":"ff");
  coolStory.addEventListener("click",
   function() //Toggle autosubscribe on/off
   {
    setGMVal("autoSubscribe", !getGMVal("autoSubscribe"));
    this.innerHTML = "Auto Sub is O" + (getGMVal("autoSubscribe")?"n":"ff");
    if (getGMVal("autoSubscribe")&&document.getElementsByClassName("subscribeToNewspaper")[0].style.display != "none") subscribe(false);
   },
   false);
  document.getElementById("subscribers").parentNode.appendChild(coolStory);
 }
}

function CommentsSubscribe()
{
 document.getElementsByClassName("submitpost")[0].addEventListener("submit", function(){subscribe(true)}, false);
}


function NoPresentation()
{
 var links = document.getElementsByTagName("a");
 for (x in links)
 {
  if (links[x].href==window.location&&links[x].innerHTML=='<span class="smalldotted">Presentation</span>')
  {
   links[x].firstChild.innerHTML = "No presentation";
   links[x].parentNode.insertBefore(links[x].firstChild,links[x]);
   links[x].innerHTML = "";
  }
 }
}

///// In-game settings /////
function savesettings()
{
 for(x in features)
 {
  if(!features[x].name||(!features[x].loggedout&&citizenID=="logged_out")) continue;
  enabled = (document.getElementById("togglebutton"+x).title=="Enabled");
  setGMVal(features[x].en, enabled);
 }
}
// Switch feature on/off
function togglefeature(ID)
{
 enabled = (document.getElementById(ID).title=="Enabled");
 if (enabled)
 {
  document.getElementById(ID).style.backgroundImage = "url(/images/parts/btn-weekly_off.gif)";
  document.getElementById(ID).title="Disabled";
 }
 else
 {
  document.getElementById(ID).style.backgroundImage = "url(/images/parts/btn-weekly_on.gif)";
  document.getElementById(ID).title="Enabled";
 }
}

// Show more/less info about a feature
function toggleinfo(x)
{
 moreinfo = document.getElementById("moreinfo"+x);
 infohere = document.getElementById("infohere"+x);
 if (moreinfo.innerHTML == "بيشنر")
 {
  moreinfo.innerHTML = "کمتر";
  infohere.innerHTML = features[x].desc;
 }
 else
 {
  moreinfo.innerHTML = "بيشتر";
  infohere.innerHTML = "";
 }
}

function ScriptReset(resetindex)
{
 for(x in features)
 {
  if(!features[x].name) continue;
  deleteGMVal(features[x].en);
  if(eval(features[x].en))
  {
   document.getElementById("togglebutton"+x).style.backgroundImage = "url(/images/parts/btn-weekly_on.gif)";
   document.getElementById("togglebutton"+x).title="Enabled";
  }
  else
  {
   document.getElementById("togglebutton"+x).style.backgroundImage = "url(/images/parts/btn-weekly_off.gif)";
   document.getElementById("togglebutton"+x).title="Disabled";
  }
 }
 if(resetindex==0) return;
 GMVals = GM_listValues();
 if(resetindex==1)
 {
  for(x in GMVals)
   if(GMVals[x].indexOf(citizenID)==0) // If the value's name begins with citizenID
    GM_deleteValue(GMVals[x]);
 }
 else if(resetindex==2)
  for(x in GMVals)
   GM_deleteValue(GMVals[x]);
}

// Select tab
function TabClick()
{
 dada = document.getElementsByClassName("tabs")[0].parentNode;
 document.getElementsByClassName("on")[0].className = "";
 document.getElementById("partab").className = "on";

 while(dada.getElementsByClassName("bordersep").length)
  dada.removeChild(dada.getElementsByClassName("bordersep")[0]);
 while(dada.getElementsByClassName("holder").length)
  dada.removeChild(dada.getElementsByClassName("holder")[0]);

 newdiv = document.createElement("div");
 newdiv.className = "bordersep";
 newdiv.style.textAlign = "center";
 newinput = document.createElement("input");
 newinput.type = "button";
 newinput.value = "Save settings";
 newdiv.appendChild(newinput);
 dada.appendChild(newdiv);
 newinput.addEventListener("click",savesettings,false);

 for (x in features)
 {
  if (!features[x].name||(!features[x].loggedout&&citizenID=="logged_out")) continue;
  enabled = getGMVal(features[x].en);
  newdiv = document.createElement("div");
  newdiv.className = "bordersep";
  if (enabled) HTML = '<div id="togglebutton'+x+'" style="background: transparent url(/images/parts/btn-weekly_on.gif) no-repeat scroll 0pt 0pt; cursor: pointer; float: left; height: 25px; width: 25px;" title="Enabled"></div>';
  else HTML = '<div id="togglebutton'+x+'" style="background: transparent url(/images/parts/btn-weekly_off.gif) no-repeat scroll 0pt 0pt; cursor: pointer; float: left; height: 25px; width: 25px;" title="Disabled"></div>';
  HTML += '<div style="line-height: 25px;">&nbsp;&nbsp;&nbsp;' + features[x].name;
  
  //If a feature needs more inputs, they go here

  HTML += '&nbsp;(<a id="moreinfo' + x + '" style="cursor:pointer">More info</a>)</div><div style="margin-left:12px;padding-left:13px;font-size: 11px;border-left: 1px solid #666;" id="infohere' + x + '"></div>';
  newdiv.innerHTML = HTML;
  dada.appendChild(newdiv);
  document.getElementById("togglebutton"+x).addEventListener("click", function(){togglefeature(this.id)}, false);
  eval('document.getElementById("moreinfo"+x).addEventListener("click", function(){toggleinfo('+x+')}, false);'); //without eval(), x will always equal the number of the last feature
 }

 newdiv = document.createElement("div");
 newdiv.className = "bordersep";
 newdiv.style.textAlign = "center";
 newinput = document.createElement("input");
 newinput.type = "button";
 newinput.value = "Save settings";
 newdiv.appendChild(newinput);
 dada.appendChild(newdiv);
 newinput.addEventListener("click",savesettings,false);

 newdiv = document.createElement("div");
 newdiv.className = "holder";
 newdiv.innerHTML = '<select id="resetselect"><option>تنظيمات پيشفرض</option><option>ريست براي اين کاربر</option><option>ريست همه</option></select><input type="button" id="resetbutton" value="Reset script"/>';
 dada.appendChild(newdiv);
 document.getElementById("resetbutton").addEventListener("click",function(){
  ScriptReset(document.getElementById("resetselect").selectedIndex);
  },false);
}

// Show tab
function GoGoGadgetSettings()
{
 newli = document.createElement("li");
 newli.innerHTML = "<a id='partab' href='#'><span>Persian eRepublik</span></a>";
 document.getElementsByClassName("tabs")[0].appendChild(newli);
 document.getElementById("partab").addEventListener('click', TabClick, false);
}

function NextTrain()
{
 strength = parseFloat(document.getElementsByClassName("display-strenght-core")[0].innerHTML);
 if (strength < 2) strengthplus = 0.5;
 else if (strength < 3) strengthplus = 0.2;
 else if (strength < 4) strengthplus = 0.1;
 else strengthplus = 0.04;

 tbody = document.getElementsByClassName("offers")[0].tBodies[0];
 newtr = document.createElement("tr");
 newtd = document.createElement("td");
 newtd.vAlign = "middle";
 newtd.innerHTML = "قدرت در تمرين بعدي";
 newtr.appendChild(newtd);

 newtd = document.createElement("td");
 newtd.vAlign = "middle";
 newtd.innerHTML = '<div class="entity"><span class="new-strength-start"><span class="new-strength-end"><span class="new-strength-core">' + (strength+strengthplus).toFixed(2) + "</span></span></span></div>";
 newtr.appendChild(newtd);
 tbody.appendChild(newtr);

 newstyle = ".new-strength-start{background:transparent url(/images/parts/map-erepublik-logged.png) no-repeat scroll -140px -194px;display:block;float:left;padding-left:2px;} ";
 newstyle += ".new-strength-end{background:transparent url(/images/parts/map-erepublik-logged.png) no-repeat scroll -139px -194px;display:block;padding-right:2px;} ";
 newstyle += ".new-strength-core{background-color:#EEE;color:#666;display:block;font-size:18px;padding:7px 0 7px 0;text-align:center;width:47px;border-top:1px solid #E2E2E2;border-bottom:1px solid #E2E2E2;}";
 GM_addStyle(newstyle);//#F3F3F3
}

function DispNextWork(skills)
{
 industry = document.getElementsByClassName("special")[1].innerHTML;
 for (x in industries)
 {
  if (industries[x]==industry)
  {
   if (x > 9) domain = "constructions";
   else if (x > 4) domain = "land";
   else if (x > 0) domain = "manufacturing";
   else return;
  }
 }

 var skill = 0;
 for (x in skills)
  if (skills[x].domain == domain)
   skill = skills[x].value;

 elem = document.getElementsByClassName("infoholder-indent")[0].parentNode;
 newdiv = document.createElement("div");
 newdiv.id = "whatsmyskilldawg";
 newdiv.innerHTML = "<div class='regular'>تجربه در کار بعدي:</div>";
 elem.appendChild(newdiv);
 
 if (skill < 1) skillincrease = 0.50;
 else if (skill < 2) skillincrease = 0.25;
 else if (skill < 3) skillincrease = 0.10;
 else if (skill < 4) skillincrease = 0.05;
 else skillincrease = 0.02;

 newdiv = document.createElement("div");
 newdiv.innerHTML = '<div class="entity"><span class="new-strength-start"><span class="new-strength-end"><span class="new-strength-core">' + (skill + skillincrease).toFixed(2) + "</span></span></span></div><div class='regular' style='float:right;margin:11px 2px;'>(+" + skillincrease + ")</div>";
 newdiv.style.marginTop = "7px";
 newdiv.style.cssFloat = "right";
 elem.appendChild(newdiv);

 newstyle = "#whatsmyskilldawg{float:left;padding:15px 0 15px 50px;margin:5px 0 0;background:transparent url(/images/parts/icon_skill_"+domain+".gif) no-repeat scroll -6px center;}";
 newstyle += ".new-strength-start{background:transparent url(/images/parts/map-erepublik-logged.png) no-repeat scroll -140px -194px;display:block;float:left;padding-left:2px;} ";
 newstyle += ".new-strength-end{background:transparent url(/images/parts/map-erepublik-logged.png) no-repeat scroll -139px -194px;display:block;padding-right:2px;} ";
 newstyle += ".new-strength-core{background-color:#EEE;color:#666;display:block;font-size:18px;padding:7px 0 7px 0;text-align:center;width:47px;border-top:1px solid #E2E2E2;border-bottom:1px solid #E2E2E2;}";
 GM_addStyle(newstyle);
}

function NextWork()
{
 if (!document.getElementsByClassName("infoholder-indent").length) return;

 GM_xmlhttpRequest({
  method: 'GET',
  url: "http://api.erepublik.com/v1/feeds/citizens/" + citizenID + ".json",
  onload: function (res) {
  eval("json = " + res.responseText);
  DispNextWork(json.skills);
  },
 });
}

function NextHW()
{
 if (!document.getElementsByClassName("infoholder-indent").length) return;
 workP = document.getElementsByClassName("infoholder-indent")[0].getElementsByTagName("p")[0].innerHTML;

 if (/^You worked \d+/.test(workP))
 {
  if(workP.match(/\d+/)=="29") setGMVal("HWDaysToGo",1);
  else setGMVal("HWDaysToGo",parseInt(workP.replace(/(^You worked \d+ |\D+)/g,"")));
 }
 else if (/^You worked 30 days in a row./.test(workP)&&getGMVal("HWDaysToGo"))
  setGMVal("HWDaysToGo",30);
 else if (/^You have already worked today.$/.test(workP)&&getGMVal("HWDaysToGo"))
  document.getElementsByClassName("infoholder-indent")[0].getElementsByTagName("p")[1].innerHTML = "You have " + getGMVal("HWDaysToGo") + " day" + (getGMVal("HWDaysToGo")==1?"":"s") + " until you receive a Hard Worker medal.";
 else if (/^You have not worked today.$/.test(workP)&&getGMVal("HWDaysToGo"))
 {
  newp = document.createElement("p");
  newp.innerHTML = "You have " + getGMVal("HWDaysToGo") + " روز تا اينکه مدال هاردورکر را بگيريد";
  document.getElementsByClassName("infoholder-indent")[0].appendChild(newp);
 }
}
function NextHW2()
{
 if(location.pathname.match("/"+citizenID)&&getGMVal("HWDaysToGo")) document.getElementById("achievment").getElementsByTagName("p")[1].innerHTML += ".<br/>روز تا مدال بعد<strong>" + getGMVal("HWDaysToGo") + "</strong>";
}

function CommentsLink()
{document.getElementsByClassName("holder")[0].insertBefore(document.getElementsByName("comments")[0], document.getElementById("comments_div"));
}

function main()
{
 url = location.pathname.replace(/^\/e[ns]/,"");
 try
 {
  citizenID = document.getElementsByClassName("avatarholder")[0].getElementsByTagName("a")[0].href.match(/\d+/);
 }
 catch(err)
 {
  citizenID = "logged_out";
  for (x in features)
  {
   enabled = getGMVal(features[x].en);
   if (features[x].loggedout&&features[x].re.test(url)&&enabled) features[x].fu();
  }
  return;
 }

 for (x in features)
 {
  enabled = getGMVal(features[x].en);
  if (features[x].re.test(url)&&enabled) features[x].fu();
 }
}
window.addEventListener("load", main, false);


// Get the current time
timeDiff  =  {
	setStartTime: function () {
		d = new Date();
		time = d.getTime();
	},

	getDiff: function () {
		d = new Date();
		return (d.getTime()-time);
	}
};
timeDiff.setStartTime();

// Add the Prototype functions and objects to the script

$			      = unsafeWindow.$;
$$			      = unsafeWindow.$$;
$H			      = unsafeWindow.$H;
Prototype	      = unsafeWindow.Prototype;
Element		      = unsafeWindow.Element;
Event		      = unsafeWindow.Event;
Ajax		      = unsafeWindow.Ajax;
Form		      = unsafeWindow.Form;
document.viewport = unsafeWindow.document.viewport;

// Get eRepublik Time
stpos = document.body.innerHTML.indexOf('live_clock("live_time",')+23;
ndpos = document.body.innerHTML.indexOf(')', stpos-23);
liveClock = document.body.innerHTML.substring(stpos, ndpos).split(',');
eRepHour = liveClock[0]*1;
eRepMin = liveClock[1]*1;
eRepDay = $$('.eday strong')[0].innerHTML*1;

// Load UserName & Language
User = $$('.citizen_name')[0].innerHTML;
UserID = $$('.citizen_name')[0].readAttribute('href');
UserID = UserID.substring( UserID.indexOf('profile/') + 8);
CurrentLang = location.href.substr(25, 2);
Section = location.href.substr(27);

ExpTable = [
	null, 0, 7, 10, 15, 25, 35, 40, 50, 65, 80, 90, 100, 125, 200, 300, 500, 750, 1000, 1500,
	2000, 3000, 5000, 7000, 10000, 15000, 20000, 25000, 30000, 40000, 50000
];

// Get the Cookie or set a new one
var Cookie = getCookie(User);

defaultInventory = {
	food:0, gift:0, weapon:0, movingtickets:0, grain:0, diamonds:0,
	iron:0, oil:0, wood:0, house:0, hospital:0, defensesystem:0
};

if (Cookie == null) {
	Cookie = {
		misc:	{
			day: 0,
			hour: 0,
			minute: 0,
			update: {
				remembered: 0,
				checked: {
					day: 0,
					hour: 0
				}
			},
			version: 0,
			foughtToday: 0,
			healedToday: false
		},
		config:	{
			DamageCalc: {},
			SkillShow:	{skill:'auto'}
		},
		data:	{
			level: 0,
			wellness: 0,
			accounts: {GOLD: {amount:0, image:null}},
			skill: {
				manufacturing: 0,
				land: 0,
				constructions: 0
			},
			strength: 0,
			workIn: null,
			exp: {
				current: 0,
				total: 0
			},
			damage: {
				current: 0,
				total: null
			},
			militarRank: {
				name: 'Private',
				num: 1,
			},
			country: null,
			region: null,
			inventory: defaultInventory,
		},
		modules:	[
			{name: 'ولنس کوچک',		params: []},
			{name: 'ارزها',		params: []},
			{name: 'انبار کوچک',		params: []},
			{name: 'محاسبه ضربه',		params: []}
		],
		redirect:	[
			//{time: 100, link: 'citizen/profile/'+UserID}
		]
	}
}

if (VerNum > Cookie.misc.version) {
	
}

// Images
ProductMiniImages = {
	food:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAPcAAAAAAP///6Gjpvb4+/T2+cPGysHEyNHU1/L09tTW2Pz9/vb3+PT19vj8/9bZ2/z+' +
		'//v9/tbY2f3///7///z9/efo6OXm5uTl5f7//vv8+/7+/Pj49/746f/vzv/57fz26vDLivLQk/XWnfTV' +
		'ne7PmfvlvPrlvfrmwf7x2fvv2fzw2/fu3dmjTN6nT9qkT92oUt2oU92oVN6qVd2oVd6qVuKuWeCtWeOw' +
		'W+KwXuGvXuGwYOa1ZOa3ZuW1Z+S3bee+fu3HievJkvLcuPjmyc+QNM6SPdKYQNWaQ9mgSNWbRtSaRtad' +
		'SNigStifS9WcStqiTNukT9iiTtafTdmiUNqlVN+tX9+xa+C5gOvLm+vMnOnLnvPWqfDauf7158F/KsuH' +
		'L82MMsWEMM2KM8yMN8yNOMmKN8uMOdGSO8yOOsuMOsuOOsyQPcmOPtGVQdKYRtaqcN23guHDnObJovDi' +
		'z757Jr16KcWCLMKDNrB3M7mAPcWPS82wjd7EpP359JtkJZllK6xzMpFjMZ1yQ5l3UruqmbWroc/Eufv6' +
		'+fX084RrU7Sll454ZZKPjcnGxbe0s6Wjo5mXl+Xj4+De3v7+/vj4+PX19fT09P///wAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACH5BAEAAJcALAAAAAAQABAAAAjLAAMIHEiwoMGDCAtOmHAoYQANXOBkSbFCyxyDXTh4EOLmSA0TWLzw' +
		'USDwwxUnPUCgGOKChY4tYfJICjBBRRAqUGDsKPHjyRQraQA16kNCRIcTOWjE4AHESJs1dgYdkAOmyY0Q' +
		'I2TQiCLFjJovfx5ZeIMExwsmPqooKUJmDJ1AjCJsiEOkhY0ZS5KcEVPHTyIBCSwFQLRHDxs0Ze7gEbQI' +
		'koELlCYEeNAgkiFCigo5KuCgQqVJBCdRgDCAAAIGCzJIPohhAgYJDmMTDAgAOw==',
	
	gift:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAPcAAAAAAP///8MpLOk4OdU2Ods4OulAQdo8PdA7PcA5O7s4Ot5KTNFGR5w6O9x3eM11' +
		'd8aWl80wNdU4PfXa2/bn6Prq7MC5uv35+9jY2vb29/f4+fDx8ufo6eDm6Pj7/NXc3sbLzM7V1snS07O+' +
		'v9jl5rbBwur3+M/a2+j09d3o6dfh4rnJycLPz7C8vODt7b/Kys/a2sLMzN7o6Nvj4/f//+319eTs7Pj/' +
		'/9/m5t7l5d3k5Nrh4dLY2NDW1uPp6dfd3d/k5Nzh4czQ0Pz///v+/vH09PDz8+ns7P3///j5+fLz8+7v' +
		'77u8vLjMy7vIx8vX1sbS0bnCweHr6vH6+czX1cTJyMHDwra3tqqqqP///vj497y7uunn5v328/7w6/3B' +
		'rf+/rf7JvP7w7fDj4P98Y+N6Z/6Oe/bBuP/LwfbEu/l5ZvuJefyUg+7Szvx5a/x/cfqXiuDFwuDGw+3S' +
		'z7qxsPpRRPtiVvhnW/ttYupnXNBfVf2EePuIf+iBefeakfCZkvCln+u9ueXLyfXp6M7Ew/lTR/hRR/VW' +
		'TP9jWfdjWP9pXv9rYP9rYuhjWv9tZOZya/aCeu+GgPaLhfWQifyXkNuMiNCXk9Oal9ObmNOdmsCfnenI' +
		'xv7d2+7S0LGjovhRSfZTTfVTTvBSTfBSTr5JRK9CP8pfWuN2c+qVkuWTj+qYleiYldmcmdWmpMysq905' +
		'OfJBQOc/Pt08POdAQNQ+PvFNSuFLScFCQPFUUeJWVOhfXdFcWtdmZb96eb14eOmamduXltWXlsaNjMuT' +
		'ksaSktCgn9msrPHOzsC6uvr29tXR0evo6Ovp6f/+/vr5+fj39+Lh4dva2v7+/vv7+/n5+fX19fLy8vDw' +
		'8O/v7+rq6ufn5729vf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACH5BAEAANwALAAAAAAQABAAAAj/AAMIDNAsAJIhYsJ8STPhwsAAWbxwqsDMxhkzZUg9oPCwCxg2kyL9' +
		'4ZPnlgAHgwRK8zBmDRk1h0DhYhBhgTEXRaZV67BM0h09pRLQslUrV7EQQrRh+8DFzygFDUz1cYMolC4I' +
		'LX5sUCHoTaJTj/aggSPKwKteI3YYIbFJkR1AlCDFacVLAgJhL3QokTGH0adfxwJZKGHpAIFhUHBYk9LJ' +
		'kSFVNKbEaJJJVoFgVHJcS9FmUaFVzzSIcIIp1gBgT2YsOSEHTx1U1KqBWMEK1ixiLHxoCUKoUqNUyTJU' +
		'iXJply9kQJIEcHYEgytNyjhYweKJDowaDwPcQNFjG5MrW3iYDUCSfSCRbNGgWcuSPSAAOw==',

	weapon:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAOYAAAAAAP////z8/e/v8MXFxjc4OFFSUktMTFxdXdDR0bq7u6eoqIyNjf7+/v39/fj4' +
		'+Pf39/X19fDw8O3t7ezs7Ofn5+Xl5ePj493d3dvb29bW1tTU1NLS0s3NzcDAwLy8vLu7u7i4uLe3t7W1' +
		'tbOzs7Gxsa+vr6urq6mpqaWlpZ6enpycnJubm5aWlpCQkIyMjIeHh4aGhoODg4KCgoGBgX19fXx8fHt7' +
		'e3p6enh4eHd3d3Z2dm9vb21tbWtra2pqamRkZGNjY2FhYV5eXlxcXFtbW1lZWVhYWFZWVlRUVE5OTkxM' +
		'TEVFRURERENDQ0JCQkFBQT8/Pz4+Pj09PTo6OjY2NjU1NTMzMzIyMjExMTAwMCwsLCsrKygoKCMjIx8f' +
		'Hx4eHhwcHBcXFxYWFhAQEP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGUALAAAAAAQABAAAAeegAGC' +
		'g4SFhoeIhw4aF4mCEgQpLkIkiRQqNjpDU0cdhRMeCyckPAZPUQcogxUiLTE9SUtUVVJMHIIbLDIzmgdR' +
		'W1dQTVogARg4PzA2RE1YWTVGXVViCAIlNiY7SlheV0EBN1pXX14fIDRFBVxWMQkMHDpOVV5jOhoxQkA5' +
		'GoIDCiE+noAh8yJABAsPDD1YgSRMDAiOGmRYMcKRxYsBAgEAOw==',
		
	movingtickets:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAOYAAAAAAP////X1+f7+//X19u/w9Ovs7v3+//v8/fLz86ytrcHCwfT07vPz7v39+tHR' +
		'zv7+/N7e3f388f/1ourin//0rP/2tf/+99/UmP/zsvbsrfTprfj26/Ty59jLjrCmd/zwsv/ytfjss+ff' +
		'uurjwrSvlufjz9bGgf/tnNfHiNDDjNPGj+TWnNLGkqWcc8q+jtPHlu/iqujbpf/yt9jPptrSrrSule3n' +
		'zOfhx/r36tXU0P79+fv69vr59fDv69nY1PvjkcW0de7ZkdXEh56SZOnXlamdb8i7ici7iruvgdnMmtzP' +
		'nbOogr2yjJKKbs3Cm7ixmN/Xu+7r4NK8ddfBetzGfrSiZ8u3dezWi/vildfCf8u4efrilv/om+7Zks67' +
		'f+XRj8i4hKqccJeLZpaLZrKlesO1itfMp8G4muHZvr63oe3mz9rXzfHu5OzVkKaWZp2OYbakcsi2gLir' +
		'hMm9mb22oenj0u7p2q6spoJ4Xs7Ht7GtpP78+Obk4P79+////yH5BAEAAH8ALAAAAAAQABAAAAedgAGC' +
		'g4SFhoQQO4eGDjcjEouDPDgtKmkIkR01KyAxaD8MHBeEPSZIJxUWIktPNEokgn5SZ0FXKRQsMjMhGy9Q' +
		'fG1RYVNAQmN5LhgZGjAlC2tlVlVZXV5GZB8eRUdqEQF2THNmcm5gQxNfREl6CYMNOg91cVwoWFtNbAeF' +
		'AwF3b1RaxNjoEykHHThO8BiIJMjHHgUFGA4SQECixQCBAAA7',
	
	grain:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAPcAAAAAAP////T09fPz9Ons8ff5/PL09/T3+vDx8ubn5+Tl5fLz8uzt7P///f7+/P//' +
		'/vf39uXl5P79+f/++/38+fz7+P78+P379//+/P79+/z7+fr59/X08v/68ffy6f358vXkyfbmzfnr1ffp' +
		'0/305ffw5Pv06fny5+/p3/v27vz59M6ZSduiTtujTtmjU+GqWN+pWNuoW9ypXeOvYdWkW+WwZOGuYuGv' +
		'Y9+sYt+sY96sYuWzZt6tY9mpYeSyaN2tZtGlZeKzbuGybtuua9mubOK2c9uwcNasbeq9e+K3d+O5eduz' +
		'ddevc+K6fu3Eh+jBheO9gunBh+jCh+rEieW/hurEi+zIkebDjuzIk+3JlezJlOvIlvPRne7Mm+rMnu/S' +
		'punNpPTYru3Sq/DYs/LatezVs+nTsvfjxObTt/jlyfflyu/exPLhx/fmzfXn0vLk0Pbq2Pz27fXx6//9' +
		'+v78+f37+Pz69/Xz8OjIm+fVvfru3v/8+P779/359Pr28fz28P37+fn39f/+/f38+/X08//+/v7+/vb2' +
		'9vHx8e3t7enp6f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACH5BAEAAIsALAAAAAAQABAAAAjMAAMIHEgwQKEADgoqDJBC0Ac6Cwm20UKGTcSBamrouPLnYoAzN34g' +
		'GRMgTgaFD8LAGLJjiogsUUCcICiISwsmNqB4kZFDiBgVAzFgYXEEhxE0RHj4+HLhwUASK4DMKGKGhgsq' +
		'cBT2WfIiCJgYTd4YCtCA4AM9T3rgSVJlDQo/cyxIOBigRIgtSrqkMdFhDx9AFC5gCDDCipMycgocQCBg' +
		'wIBDEOpgcCMlDwMCCRREUJRoAaENg5x6uGMAEYdAGjRUsENngtOFTh/IVhgQADs=',
	
	diamonds:		'data:image/gif;base64,' +
		'R0lGODlhEAAQAPcAAAAAAP////Ht7vz5+uvl6Onj5vz6+/r4+fj29/f19vb09fXz9O7s7ene5NrU2Pr3' +
		'+eLZ4NPO0tjS2O3q7enm6ebj5vz6/Pj2+PXz9e/t7+nn6f79/v38/fn4+ff299bO2NDM0cbByfv6/O3q' +
		'88XD0c3N2vDw9Pj4+/7+//v7/Kiswebo8sLG1r7E2XSJzMHK47vD2dve5/Hz+fHy9ePo9K6/5LHB5b/L' +
		'58fS68fS6uTp9Ovv+Ojs9YWi29Ha7dff7+Lo9PP1+dbY3M7Z7Nnh8LzN6N/n9N7l8eXr9ejt9afA5sfW' +
		'7Nrj8dfg7ubs9eXr9O3x97HI59/l7eTq8sfW6fP3/PH1+vD0+cHU6s7c7LfO5c/T1/X4+/v8/Yi2377V' +
		'6dzp8+fv9fD1+ajM5rvX6snf7src6cnb593r9dXj7e71+tXo9LnY6r7c7eXw9onD4Lnb7J6vuN/t9OTx' +
		'+PP5/Pr8/bLX5rfY5rTb6bjf7dPq8orF2I3D1ZvO3rDX5Mvm79rt82y91K7d6pi3wMHv+sro8OD0+Z7G' +
		'z9ji5Lfj65zAx8To78jd4ZbCycjq7+Dz9nursJPK0aHX3czd377n6ub2967Oz9jv8NLo6ZvIx7XQ0Pj/' +
		'/7/l5Mvl4Ozn5vv5+fr4+P79/fz7+/r5+f7+/v39/fz8/P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACH5BAEAAKcALAAAAAAQABAAAAjcAAMIHEiwoMGBXbgcJIjiSRYzZ9KEqXNQzBEqWr5I8TRHjcErTJC4' +
		'KYMmgJw7awpWcQLECBgybfT88cOG4AkeVposwTLmDZ5CgOwQlJEEio8iUbzAebSoDx+CO3TQwFGjhxI6' +
		'jigF2jOAg8AVP4bksOGCCCZOiQjlEXCgVKkGLV4EOXGDUSdJhjZN0eCh1KcYMD6YGGEpUyRBlyopClFh' +
		'QQoGLFTMQHSo0SRNkAbFkVBhwgZQFEiU2CLEAYgIEAoQyHDBQoBQBg4geIBAAYYEIkyN6iAq1EBSCwkG' +
		'BAA7',
	
	iron:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAPcAAAAAAP////Pz9Ozs7fX29/P09ePk5eLj5Pr8/fv9/f7///3+/vz9/fv8/Pj5+ff4' +
		'+PP09O7v7+3u7tzd3djZ2dLT07O0tKusrKmqqpGSko6Pj+vq6tTT08/OzsLBwYuKiv39/fz8/Pr6+vj4' +
		'+Pf39/b29vT09PLy8u7u7u3t7erq6unp6ejo6Obm5uTk5OPj4+Li4uHh4dvb29ra2tfX19bW1tXV1dLS' +
		'0s/Pz87OzsvLy8jIyMPDw8LCwsHBwcDAwL+/v76+vru7u7q6uri4uLe3t7a2trW1tbS0tLGxsbCwsK+v' +
		'r62traysrKqqqqmpqaampqWlpaSkpKCgoJ+fn56enp2dnZubm5WVlZSUlJKSko+Pj4yMjIuLi4eHh4OD' +
		'g4CAgH9/f319fXx8fHl5eXV1dXR0dHJycnBwcG5ubmtra2pqamdnZ2VlZWJiYmFhYWBgYF5eXlxcXFdX' +
		'V1VVVVRUVFNTU1BQUEVFRUBAQD8/Pz4+Pjs7Ozk5OTg4ODIyMjExMTAwMC8vLy0tLSsrKyoqKikpKSgo' +
		'KCYmJiUlJSQkJCIiIh8fHx4eHhUVFRISEg8PDw0NDQkJCQcHB////wAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACH5BAEAAJQALAAAAAAQABAAAAjuAAMIHEiwoMGCBrpoIHFwIA0yg/x0MdEQhxpDeKCcGEGBAcEQOtoY' +
		'omMkAYEhaNKMGFiiiZ03PUBEeMImj6ExBG84yRFgxRQ4fQopetSIicADTI4k4eGmD6FFjyYhKlMjgAkl' +
		'UpZcWYOIESRJgLa0KCCkAo0jQZKYCRTJkR4rKVI0acPnwoQiUap8+ZBhB4oYVeT0ObTnyIslW8QcAeKA' +
		'RRY6fxIVqkNFhgoiYeIkwWBBzR9Eh+54QcIhhQkYPrBoiXImkaA5XIp0cCEAwYIHG3RYAUOHTRUeNFpA' +
		'SKBgoIgBMzz8sPFCAokGxQUGBAA7',
	
	oil:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAOYAAAAAAP///7Cysmxtbbu8vIiJiTo5OfHw8P7+/vv7+/b29vT09PLy8vDw8O/v7+7u' +
		'7u3t7ezs7Onp6eXl5eTk5OHh4d/f39vb29fX19LS0s/Pz87OzsjIyMfHx8TExMLCwsDAwLm5ubW1taio' +
		'qJ+fn56enpqampaWlpSUlJOTk46Ojo2NjYqKin5+fn19fXt7e3p6enl5eXh4eHd3d3V1dXNzc21tbWtr' +
		'a2lpaWhoaGdnZ2NjY2JiYmBgYF9fX15eXl1dXVxcXFhYWFVVVVBQUE5OTk1NTUxMTEpKSklJSUhISEdH' +
		'R0VFRUJCQkBAQDg4ODQ0NDMzMzExMS8vLy0tLScnJyYmJiUlJSQkJCMjIyEhISAgIB8fHx0dHRUVFRER' +
		'EQwMDAUFBQQEBAICAv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAeagAGC' +
		'gwECJoSIiDk/C4mJHEw7IY6ECThHLDIVlIIEUUMjOCUJlA8DSEQgLT0ZlCQ2QT4XIkUrDIkXOidGLxAR' +
		'MEIeiAgqOClSNAoJKFAuEoQNQDcxW1AfHT5dTsKDE0lAPFpiT01XXlaTgwpLBkpcAABjYWBUGIgFYVlf' +
		'8PwzCIgHlPDj94SCIwc1qnDBMiWHBU4BKGzQ8BBRIAA7',
	
	wood:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAPcAAAAAAP///+vt8f3+//r7/PHy86yur/v+//3+/vf4+PT19f///unp6PDv6/79+5GM' +
		'gzwrDp2YkOfg1c/Jv93TxMW8r6Gdl/j28189D31RGGlFFkkzFHtWJmpLI4RlPaN+TpSBaNC2lJmIccu4' +
		'n5iLedfPxOHe2nRNG4BXJLB6NoFaKKV0OHZUKsuRS5NrOJNrO510Q5BsQMKSWNqlZtSjaei7hea6htq0' +
		'h9Sxhdu6kd3Bn9W9n9rLuNbIt/bn1dinb8maZ8KWZOy2e96rdK2GW+q2ftSmcsOYaeu4f+GwetOlc+26' +
		'g+e2gOW0f+a2ge69h+e4hO29iey8iPPFlLyZcum/kevBk/DLo+jGoc21muLIq/Tavvfm0/fp2vvz6um3' +
		'gu+8h+67hu26huy6hey6h+y7h+++iuu8iu+/je29jOy9jO6/kPPElfPFlfLElPHDlO7Akua6jvXImuq/' +
		'k+W7kPbKnPPHmu7EmPDFmunAlty1juzEm/PLo/HLo+7Lp/HVuPjizPXhzPfk0Pfm1f369/z6+P79/PbO' +
		'qPbWt/79/f7+/v39/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACH5BAEAAIwALAAAAAAQABAAAAi5AAMIHEiwoMGDCAsu6LJFEKGEiQb1CSOkSJU/Xgoa8rFHDJgxTGpA' +
		'GUJjYCEuV5wsmUImSRobM1rgCEAoEJ8oUti0cVPnzo8UH0ocAGSlDJozcN7IyXNkRQYIBggoujFnzRcz' +
		'dugE4XBCxQYLiwTy2KHDjx4iKDS8kNEhwgCCFyiE8IAhhhEkLB4gKOgAURMgSp6ocUEigUEJObAcwhMH' +
		'hggFBxv0GJFFCxUQAhIGKGBiQgUGmkMPDAgAOw==',
	
	house:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAPcAAAAAAP///ysqKz08Pf78/np5enZ1dm1sbf38/eno6drZ3WlncXp5f5KSl7KytZGR' +
		'k0VFRn5+f21tbmZmZ/T09e7u7+zs7dLS08jIyby8vaioqaSkpZiYmZaWl4KCg9rc42prbYSFh+nq7HV4' +
		'fYGDhru9wMfJy2NkZXx9fnp7fGlqa4WGh8TFxsDBwre4uaytrvX3+PP19tbY2Xt8fHd4eHR1dWVmZvb3' +
		'9/T19ezt7err68/Q0MLDw7O0tJOUlIWGhikqKTIzMjs8O/T19NfY14yNi76/vZ2hmIaQcWyOH4WsI3KK' +
		'MLPfOJe7M6fMP3yIWLO0rk5QOGNnI4SFZC8vLlFRUOLi4Pf39uHh4LW1tK+vroyMi4CAf1RHFmhnZOHe' +
		'2NnY1ktIQ4aEgWlfUqaNb7+0p6Wdk6GakWllYH97dnlSJ4leL3VWNJNzUGlUPIZrTamQdaeTfW5iVEEs' +
		'FlM5H0UwG2hPNSIbFLigh4t5ZpeGdXVrYaOXi1lWU3d2dXZ1dGhnZpKRkMLBwGBCJ1VIPLmrnpuPhHhc' +
		'RKeck3VwbIFvYiglIzQtKW5sa+fl5A8FAWFcWoV7eggAACUkJP/9/ePh4W1sbP79/fn4+Ojn5+Tj4+Pi' +
		'4tbV1auqqpaVlf39/fj4+Pb29vLy8vDw8O7u7u3t7efn5+Dg4Nra2tbW1tTU1MnJycfHx8PDw7y8vLOz' +
		's66urqysrISEhICAgHJycl1dXVxcXENDQz8/Pzw8PDs7OzU1NSUlJSEhIQwMDP///wAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACH5BAEAAL8ALAAAAAAQABAAAAjwAAMIHEiwoMEAnAIJonBQ4CdWNHABESLhxalQBEfFssFrUi8BunIN' +
		'mMDjAqkAolJZonJAS6daQSB40OBjFpYAm4hUWPWA1itTrjZ0+CNri6gACbLs6GHLABcWFgqoAFEE1pAA' +
		'OGr42nVrxYxFfsLc6eOJA6pLmVoBYpSIQQM0dNjsSREiAgYdlVRdMbLgCZIPX8SMaAQJhQsZpX6cIFHF' +
		'yZJILbwQmlNnjBxEjtJIeiSFiZIug9zk0WNHzZo3mMCcUTSlSZIoh/CUKQSnjaEMAS7dyKEAyhEHJczE' +
		'IcPHhAhQBQkgoHQJhiYrMRpKFxgQADs=',
	
	hospital:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAPcAAAAAAP///9kND6M6PNBaXdFmaeOYm+Ocn+K/wMuVmIxFSs7DxdHIy5qXmebk5tLR' +
		'0r++v5aVlo+MkbGus5qYnM3MzuDe5OTk59fX2I6Oj6muvMnKzdHS1Ojq7M3Oz5OjrrnM2M7V2enr7MjK' +
		'y3mQmoWao9Pd4cDHytne4GmLl8bW3N/t8tnh5J63v8Pg6a60tquur6HQ3a/T3bjT25+0uqe5vtTq8Jag' +
		'o93r79fi5eXw8+Xv8u/2+He7y3CquYa8yqze6rHa5Ji6wqzIz+f3++Ly9vP7/efv8XjH2H3I13/H1nW4' +
		'xnu/zovJ1oy+yYy8x6HV4aTU36HP2aTS3MPm7cns88bd4rbJzd/x9bbAwufx85zV4JnP2HGRl7Lj7K/b' +
		'46vW3s7m6qnS2KXCxrvJy93k5aC4u67GyYubncnf4YuRkcXMzOrw8Nfd3fr9/YmLi/b3997f3+Tt7OTo' +
		'53yWhPDy8KGloH2Yb+Lj4XKWQHiBa6jBfa+7mI+jYoqXbImvJavFZ52+NLS1r8fHwf7+/Pz8+u3t6///' +
		'/v7+/f39/Pz8+/j49/b29fT08+rq6eXl5KurqqmpqPj39fLx79nW0/Xz8aGgn//+/fPy8eXk4+Tj4tzY' +
		'1s/NzOnm5enf3KmlpP3z8aeiocq+vP/5+PtXVqpGRejn583MzP7+/vT09PHx8e/v7+vr69/f393d3dDQ' +
		'0Lm5ubi4uP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACH5BAEAALIALAAAAAAQABAAAAjkAAMIHEiwoMGBqA4ahNMqkypFCgO44XGEBYo4c9gsKliEio0VO3Tg' +
		'CMMAgRxHqQJgMpSmSRIoX6KA8ZLgwIIRpwKUWeMJFBYgSJRsEVOAlIEanAIQCTKkzagARqpwGSCAwBgY' +
		'FQKIUCGDyZQcnUR1SaGg1JkXgxBpmWHCyo8lGD6pQSOhBQg+gC50cBFDyhUyHEKR8GHmhoY9fwRJMhXi' +
		'SQ8nHijcoVOCxgk7eiAFSDSJUhYhGzIEyvMhlqUIE14RrLQJwps+fhpEgvXAFSuDdfBYcKDp0apGjApF' +
		'PESI0KVDAgMCADs=',
	
	defensesystem:	'data:image/gif;base64,' +
		'R0lGODlhEAAQAPcAAAAAAP///6tvcOTFxqOhoikoKT08PTU0NTQzNIKAgmloae3s7ejn6NHQ0b28va6t' +
		'rqyrrKqpqqCfoHNxdKqpqz09Pjw8PX19fnp6e3NzdGJiY2BgYV9fYPPz9O/v8OLi497e39zc3dnZ2s7O' +
		'z8bGx7m5uqenqKCgoYiIieTl5oWKi+zx8qSpqUFDQ6eqqn1+fnp7e3R1dW1ubmtsbGJjY15fX11eXvv8' +
		'/L/AwLu8vLS1tY+QkIeIiH+AgExNTOHi4dna2cvMy8fIx76/vr2+vYmKiYiJiFRUU3JycVhYV1dXVtTU' +
		'083NzLCwr9DOzeDLysx+ftm1tYB3d/Hl5bm0tDk4ODg3N1NSUkFAQMLAwGhnZ11cXFhXV//+/v79/fn4' +
		'+Pb19e/u7ry7u4qJiYmIiIB/f/7+/v39/fv7+/r6+vj4+Pf39/Hx8ezs7Ovr6+rq6unp6ejo6OXl5ePj' +
		'4+Dg4N/f393d3dLS0tHR0dDQ0M7OzsDAwLy8vLm5ubW1tbS0tLOzs6ysrKmpqaKioqCgoJ+fn56enpub' +
		'm5mZmZKSkpGRkZCQkI2NjYyMjIuLi4eHh3l5eXh4eHFxcWZmZmJiYmBgYF9fX1JSUlFRUUpKSklJSUdH' +
		'R0VFRUREREJCQv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'ACH5BAEAAJ8ALAAAAAAQABAAAAjbAAMIHBiATZ43BBMOpPMnUidFYRQO1IPihYYYFxDdUDhAgAoWkggE' +
		'UkDhjMIpT5xAkdLCwAE6ElO4yBKFyg5LVpgoRAMkh4gVJsTw8IRkT5qBZkD8iDOHxJAxM2RUQUCCICBC' +
		'I+rIibPEj6MtSoIQHDShyIM7IeAw0IKJkxCBanBIcGAoQoITJQptyuSDiJkAbXhkSNREEJkyNioduZTE' +
		'SAMwAdTwYbSoUaMeGCZxuaKpAAc7A7+40XMIEowaWCxU2AABjkIPfXhQovFIx4c1XiQGWIAnRIcuAwMC' +
		'ADs='
};

SkillMiniImages = {
	strength: 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACfElE' +
		'QVR42oSTu2tTcRzFPzf3kaQ3zyZN0tr0ZVutFEt1EATXgquDCP4FTv4PboKbk5uOOjgpCloXsRWLCC3Y' +
		'on1oDNY8mtsk95Xcx89NkVJ79vPh8D3fIwkhBCdK0NvfASQkNYakaih6BklRkU4CmEaDvbdPyHgW+elL' +
		'SDGdSHSAUFVR0nmU44yueUhz6z27K89o7W+TyQ3TMhogSaTyY+QmFyAiHU0QhiFfVp5zsL7MoBpBiw3g' +
		'KRrZC1ep1/Z5/OAupWjAjZu30Ocu/wswjSZrT+/Tr35manKW3MgMcqrIwOQ86lAZAKNZp7Kxytn5i2jZ' +
		'wl+AUauy+ugOiaDLxPQ8ydwYcqpArDyHVhw79kYKQM+x+PjkHmkcxs8somdKSFocLVtEK5T/209ECMH6' +
		'i4eI5jdGytPEkzmIqMj6ILaawDKaBI71xxA4Ft5hncDuIkIfZevDa7bePGZqYhwtqiNJMpFogtb+V+RG' +
		'hVj5HLbvIYSHEksR2G3kWAolW0CEAmVnbZlcJk08niAiKyAEVqtK2GmQGhrD/blJGArwBYGeQFI1Qr+P' +
		'8ByUdBGlMDlP9fsnZASOZSBFJBRZZWB4hsBzcTsNROgTTQ4R9k2Cjkm/Z+HaNrHCOMri0nV8+5DK5juU' +
		'A4PBZIKR0dMEnotttTlst7BNk2y6QSZfIjk0Tmh18I06Vrf5t8b2QY1mdYet1Zd09zYopOOcKo0S15NY' +
		'VhfHNtGiUVL5UUoLS3hmC6ddO/qJAtjZ3GB77RVya5d44IAI8Psujm1Sq/+iMDLBlWu3UfX0/8fUcx3a' +
		'tQqdXxXazZ/0XIduT4DwKco2s+evnLzG49S3u7g/Nvk9ANryOY5E+94iAAAAAElFTkSuQmCC',

	all: 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABnElE' +
		'QVR42tyTwU4TURSGv3vvdIDRtiEl0ElQSNyAe0x4ABf1IfTRDHufARPdo2KoRVTSGZ3O1GqhnbmdYab3' +
		'uigsTFyYsDDx35/vz/lyjrDWWm4RyS3zXwKunZq/dCsB8jzHWoupKqIgwFjLi4MDBlH0x6G5sTc9OABZ' +
		'lpHnOWVVMdYafz6nnqYEJye4QtDy/d8Aw0/PUUqx/uDZAqC1JooisizF8zyMlFxubKCTIY3Vb7R8n16v' +
		'RxD0uZxe4d85537jFeXW0wXAGMP6Wou338fkxYSroqDMcy4yjZYLTTWnRhwn7O09YmfnMeGHLZS8XiEM' +
		'Q16//0xUuOxvNxj//MF0mjKZTHlzdEQcDeg86dAP+iwtuQixjL3bQUqxAEzSjC+6RiVdlHIoipzRaIQQ' +
		'krOPZ5z2Ttl9uEtZVtxcvmC+kGitpSpLRoOvZKXhYm2bOI45Pn6HUoqiKPA8j8PDl6ysLNNut9FaM5vN' +
		'MMYgwjC03W6XOBkipaBer6OEJBkmSCmRUiKEoNlsUnMcpFK4rosxhs3Ne4h//o2/BgB0Lc7+72naWQAA' +
		'AABJRU5ErkJggg==',


	manufacturing: 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACIElE' +
		'QVR42nySzU4TURiGn/krbbFS0NIGXFgtcAMQjBsSkbgQSGQnW6/By1A3mOhtcAPEBSsjbUKb2AjFYkqj' +
		'Le0MnaHMT+dzQSQ2DDzLk/c8eb/vHCSCMAzl6GddtrY+SqP5W25DJwLf9zg5rrFXLLKy8BDbncDrW4S+' +
		'S3Bu4tst1ESa6adviBSI2+WktE2308apbnNUHTAIQTXiiKLTc/okMgWmIVrw59TmS7lNKCr5lbeMJEbR' +
		'Y0k0I46oOoKKpl5mIwX3sg94sf6akZhBOvcYLwg5dxx8x2ZsLIVhqFdZRURkqL4Ivu/jeR6e7+PYDrbd' +
		'w7YdRISJ8TSFmZmrvPrfVVqtFmdnZ3ieh2VZHB4coGkquq4zOprk8PAHqbupobZXAtd1qVQqlMsV2u02' +
		'RixGfCROr9ejXq/z6dNnJiezZLO5IYEiIjIYDAjDAaBQLBbZ39+n1WqRz+fRNI3d3V2Wl5+zuvry2r4U' +
		'EZEgCKjVarTbp1iWSf+8jx8EXFxcUK1+Z35+gY2NV1H7vhxB13XuZzIoyuUonu8h4QAQxtLjrK+tcRPX' +
		'XuEfzWaTnZ0dADY3N28UqFGHpmnS7ZpkMhlKpRLv3n+gXC5HCoY+kgCB79NoNKgf/wIJyeVyfP22h2lZ' +
		'zM7NETOM2xoInU4HESF1J4nrumiaxmzhEc+WltA09fYGiJBMJjAMA03T0XWdqakpFhefMDNbQFWUa4K/' +
		'AwDsgTGqRnljDQAAAABJRU5ErkJggg==',

	land: 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACYklE' +
		'QVR42pTSS08TURjG8f85086lFzptKRQhiGBQLpVEtJEYoxJWbFgZ134Dv4TuXRiNG4xx4coYY+LKjYlu' +
		'IC4gQUFBIhIJtJbS0um0M3NckFgwJuK7OslJfnnPeR6hlFIAgVem8P05cTuHZY8DguOMbB0VmiiytnAb' +
		'pTyOOyEApRrIkGB1ZR5dmggR/j+g6azSrL5lfeU15f0ss6/uMjNzjeGhQTo72hHiH0Cj9omdjTd0pl2K' +
		'9TFWV9eZffwMO2GTOzdMbmQIIRXJRBvdPVli0chvQCil1Obne2yv3SEUssldf4ev0uzsFCiVyjx89ITF' +
		'hSUmJi7h1OtMT08yNXn56AZ6bIJi5STn87dAZtCAbLaDTKadfP4impSMj48wPT2F+COdEECmK09q4Cki' +
		'3nXksrxXob//FH19vQS+h27oB7GpAIQE1AEAEIuHsSLmEcBxXJpNHyU00skYpfU5THcdvfMCmpVC6vEW' +
		'ABKlgiNAzQ3wA5/uaIlUdZHqx/c4RgzLcUiN3gAhW8Dfooo11uguv8AqbFITAjOaQO8Yo230JkILt/4A' +
		'IKRpyENKce4B+8svEeE2GjKEGbPRkqcRoQi78/exMmeweq8efsKhUvt1fn6bQ9NtDMtExAfwwmkqWx+Q' +
		'bgEZjlCr1Ugnzh4ChERoBqpZw939iqlLgiCKtAdx9zYob8/hhZP41ijSzJI8cQWiPQdFAviyvETKX8Hb' +
		'/0HDqVKrFPEw8Jt1Ko5HkMgRzY6iR9NYlkEyEScej7WAytYyuAUCox20CE1h0PQCGm4D5bsYYUmbncSM' +
		'JpGyVadfAwBCqNwu/tyhCgAAAABJRU5ErkJggg==',
		
	constructions: 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACHUlE' +
		'QVR42rSTz08TURSFv3kzMO1Q25k6LYgBQaWIBHf+ESZuXJkYN8rOxLX/FnHlxqUs3AgkBqOCllL6I6Z0' +
		'2imdvr55z0UTo0GjCfEs7z05ubn5jmWMMVxAggvq/wfEg5gkSf64d343NMYQxzGdTocojtBGk/fylMtl' +
		'crncL17r5ydqrRkOh3S7Xfr9PkopnCkHpRXJICFqd8nN51nfWOfsuE8QFicXaK2J4xilFKPRCCklQghc' +
		'10VrTafV4eDjZ94mO+znq1yRC0wPLV7o55OAsZQ0m02ymSyWsBBCYIyhWq1Sq9aI4ohX1de8u7xPMZin' +
		'fyapHh4w+74wCTCWIU1Ton7EWI5JkoTtN9tEvYism8HNZ8jc95nqZRl/G9FodPH3PR4/eIgzlpJBfMZY' +
		'SuJ+jFIpR/UjDr8cEpZC8n6BS1M5Kr0l6ldbtD41WRVLPLv7hFvlCk6tVkPYNgXfRzg2w+GQVKVcW7rG' +
		'3OwcSZKw82GXYq3Io6/3GNmS9cXbLHoLKDvFSbVmJCXaaGxh02w0UUpRKpWwLAt32qVULjHtTlO5UeHO' +
		'xgap0QRFHy+bxVGpIh4MwBi6p6fs7e4x481QCAqEYYhSiq2XW6zcXGHz6SZ+oQDGgDVh0JJyZE5OGjQa' +
		'Der1Y5rtFmurayxfXybwfZRK6fV6BEFAEATnoPsBUhz3abXbCCEohSGe5yGE/dcuWOfrbADrn8v0fQBU' +
		'ZA+oftzH7wAAAABJRU5ErkJggg=='
};
		
ImageSqrBg = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAGQAAAAZCAYAAADHXotLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAc0lE' +
		'QVR42uza0Q2AIAxAwdbFxcnrjyNgtOm9hAHgCP0hq6pCv+lwBED0AcgVETlgtQC5ImINudDbUfKFoZ7D' +
		'Xpnq8GQJCBABASIgQAREQIAICBABAaLuIGvQ+a0OIOcQlPXsdWvp14kZIiB9ugEAAP//AwDnkxHeq4aG' +
		'FwAAAABJRU5ErkJggg==';

ImageSqrBorder = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAGQAAAAZCAYAAADHXotLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAqklE' +
		'QVR42uzawQ3CMAxG4b8VO7CIhzIsUbEEeCgvwhThkjOnWKLmvQEixZ8iH9ptjDFEP9POCAChL12qDs5M' +
		'ZWb7Abr70vO2ih0yMV6SHu7+7ooREU9Jt5Uoe9Xr6I4xX8f9NDukOwZLHRAChAABhAABhAABhAABhAAB' +
		'pKiIuHYfXsUdS0DMTJKOzijzbse867K2qp8c/uGLoZnpNCDEUgeE1vcBAAD//wMAGmw6nF9QrrwAAAAA' +
		'SUVORK5CYII=';
		
ImageExpTooltip = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAMgAAAAPCAYAAAChtYCSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAo0lE' +
		'QVR42uzasQ2DMBBAURtRsEZmyRipwhSpUETFFFAxRmbJGnROGUeKgd7vlUB1ui9hQUwphVw/dL8XoFLz' +
		'uMWYB9IPXbrdHyYDIYR1mUJbunm9PE2IKr3e391vxAHl/W+MA8oa5w84CEQcUAhEHLATyDxucV0mk4DS' +
		'K5ZI4OCQLhLYCQQ4GUj+JRFqk+9/e+YhqFX0Ny/8N49b/AAAAP//AwAeqTYadG7bYwAAAABJRU5ErkJg' +
		'gg==';
ImageDamageTooltip = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAMgAAAAPCAYAAAChtYCSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAkklE' +
		'QVR42uzasQqAIBRG4d8QfGHHGzg4+szZFEl0xd3zTUFOFw8oFc6U9NEFQJJClKRSqySpmPXnGdhdMevR' +
		'e3nkzISwpau1twPiAPz9fzAOYBLLeN7i/gH8BEIcgB8IcQCTQEIxYxKAe8SqlUiA6SWdSAA/EACLgYxf' +
		'EoHdjPs/riwCdhX4mxfw+7gBAAD//wMAhPUoTQgf8XcAAAAASUVORK5CYII=';

ImageWarModTooltip = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAZAAAAAdCAYAAACE5jp+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAA6UlE' +
		'QVR42uzcsQmDQACGUU+cIEMEUttYZY9M4AIZwwWcwD2sbKwFh3CFSxEIKkTUJgTeq+TO6m++7kKMMZnL' +
		'6255AAArfVmEMA9IXnfxeb9aBoBNVTsm2bfLx+1iIQAWmmH6fKfiAcBe8z6k5gDgDAEBQEAAEBAABAQA' +
		'AQEAAQFAQAD4XUA8YwLA4YCIBwCHAyIeAJwKSF8WoWpHSwBwLCBJ8n7XXUQAOBwQEQHgdEAAQEAAEBAA' +
		'BAQAAQFAQABAQAAQEAD+LyDNMFkGgM0+ZHt+AoC1EGNcHOR1F80CwJa+LMILAAD//wMAV2A3MuNUVvgA' +
		'AAAASUVORK5CYII=';
		
ImageHeal = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
		'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAADX0lE' +
		'QVR42rSWT2gcZRjGfzszm5nZf5NNtmbjtklD05qWFhHpLeBBAjk4kUqkoJSipdqLeOllED1osCCVehB6' +
		'0AhaqoiBQEogJ0HoQfBQxNRJoCXpmiabJpkkm92d/ZPJetjZMbG727XBBwZmvvl43nmf5/3ed3x9n07Q' +
		'AD3AWWAA6AJ63fVZIAlMAWOmoSfrEfjqBOgFPhNblDOBaAw53IrYIiPJCgDbBRunWCCfXsfeWMMpFr4H' +
		'jFqBagUYBr7TEj1q6JlnaQZbywukFx9kgNdNQ59qFOADtbV9JBjrRA5r3uJAQub5qMTpA34AflspcXu5' +
		'yK8rJW9PftMiu5oin15/zzT0L2sFeCMQPXAzkjiM6G8B4FJfgOHDSsOv//aezY17dkW6fI5l844DvGoa' +
		'+iSAsEvzr4OxuEc+/nL0ieQA53tVRvsr2UpKgPYjJ0Tg5vErtxIAkrvvcy3Ro7aEIgBMDkSRRd8eorfv' +
		'fLLn+ZsXPvTuu0Mil08GuTqdRYlEiXR2a+mlByPAWwLQK8nKUNXQS32Bx8ibweBBmbM9lYzDHQmAc8ev' +
		'3IoLwLDaGvunhJqQpR4uPhdwnfURjMVF4IwADMqRVq9a9ouT0YrqSiQKMCgBp/xqEIBXDsl1Nf836nky' +
		'1KUwvZ7BrwYATgn4fG2CWIkaV4V9Z3AoWOHwiX6ANoFymf8TAmDtONsApOydfRPeTzsA7GyXAFYk4I+S' +
		'nX1JDmn8cN9m5MXwY3X+pHOwG2Pzee9UA38KwER+0wLY01ueFvOZSgb2xhrAuACMZR4tOlUvvprNPTX5' +
		'tbtZAMrlMjnrURGYENzBcWNr+SEAP87lWcr9dy+mFgpM/lWotO9UEuC6aehWtZsmgJn2IydC7gFhtF+j' +
		'OyQ2TX51OutJY83NWMBR09CtauE/BN7MrqbYLlRa74Xbm03Jde1u1iMv5TJYczOOO3isWgPnfSUS/SIY' +
		'i6Nobd7iMU2iv8PP6Zif4g78bpX4ebHoGQpgr69izc86wLumoY82GpmDwE+Rzq5QuOMg+Bp31nK5zFYq' +
		'yVZqwQJeMw39l93vpVqSAkfTS8mP0kvJd4KxuKhobYiSH1FWgTJOIY9TKmJvrFWr5TrwcVWWZv4qqogD' +
		'Q+4VdyefA8y5vo0Dk6ahr9Qj+HsA4zc/E6Veb4YAAAAASUVORK5CYII=';

ImageOptUp = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABymlD' +
		'Q1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjalZHPS1RRFMc/94kKYYPIcxZBcIkQFyYPx4UrG8fFZLgY' +
		'HsL8oM3Mm9covBlv970x29mmZUEL3SgUtQn8A0SCpqXiToiirUWrEARRangtbjkQqfSFA9/z5RzOvd8v' +
		'dMmyUoEF1BuRdrMZWSiWZO9HrnCNQW7SX/ZCNZXLzXIujj8gAPZvlZUKvvY82zk4bbWfvB99kZzd+sLF' +
		'uKoLxRIICdg1w8cBu2L4HcB+GKkIxD3A9ubLVRAKGNFz7jSIdSBRM3wTSFQMfwsklrxaBGIPcBrVhQaI' +
		'n8BE1Q89sMaBx57SEVhbQLpeX6yCdQIMF4olaZ65/B1uvwRrraPlV2FzEgbfdLQhF+xJ2D7oaEdJBCCS' +
		'u+H91BgAok9D90kcH12H3m1o6zj+sRHH7dfQ9QlaD7ymXvrtkbBScFlv/ml6kweYu//mxgsAHHjVgjxw' +
		'Nw0bKzCUh4HPkAPm0lip1J8yvpnsQjebkZWg6SvtnAVKiEuWDJIKAU18FBrn3I3/R+QvRwDTi+qRXqjN' +
		'R3JKqcCXMw1vdESOOc7ExfsmY4Cefnh+w1rpe/qu+e3w77lfMCGEep+nbswAAAAEZ0FNQQAAsZ5hTEH3' +
		'AAAAIGNIUk0AAG11AABzoAAA9rEAAIWZAABsxQAA6Y4AADF9AAAXvFuht3UAAAJFSURBVHjalJLLS1RR' +
		'HMe/v3PPPXPvjI95liIRumpri2hbIZRRaeYiohIdF+6FdoLgDAT9DS3axYibIhCCKIVZuvFFkFa4KcUx' +
		'5uF9nEeLYWZQp6Lv8ne+53O+53sOGWMw+OQFTisIwuS5dPdzizH82D96xm1+eNqz9moWDG0kpYxHo05u' +
		'dGJkYnD4xgQXdk4pFW/nPQOQYZhwnUh+eHIsq8/38i86yvuvX8u6EZFXUib+CtBSJR3XyV19dG/Kz/Tw' +
		'as1Dterhq9XJL94cmnJcJ6eVSrYF6FDGhSMWLo3fmS6lekTl2AcDYDGgXPPx3U2JgZHb0xFHLKhQxk8A' +
		'tFR9zInkk3eHsztdGV6uerCodQonoFz1sNuR4f0PRrK26+RVKPuagM7u2Nzl8VszJpOxk8o3UYtgTAtg' +
		'AMQ4IaE9I3p77KGnozPd8c45AOAA4Pnh8ua7D8cykBUyZqDv8dg4YgneBDALae3J0us3hUNgZzdid/h+' +
		'+KkJkFItBUflJQIArSdtmIen2xYWuFervdegl17tGIzV6+MAQEBzAIAM1WcnZAjEGBEIhNZ624/0P6on' +
		'sGwQEbQK/72DCMyy0WiZAcDG4jz2igUwLgD6UygDEAPjAnvFAjYW51sJgkoJ+9urMES4cOU+tKn7tQGU' +
		'AZQx0IbAmIVvxQIOtldPXqGhg60VRGJJnk5Mg7pcpGxCustFWVtIpVysbX7kB1srZztovBQAEdaOKutv' +
		'l9eJgX0m0r+qPhxl2E/BdVApVQDEAIQAAgD4PQC/pN8zYUBrigAAAABJRU5ErkJggg==';

ImageOptDn = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABymlD' +
		'Q1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjalZHPS1RRFMc/94kKYYPIcxZBcIkQFyYPx4UrG8fFZLgY' +
		'HsL8oM3Mm9covBlv970x29mmZUEL3SgUtQn8A0SCpqXiToiirUWrEARRangtbjkQqfSFA9/z5RzOvd8v' +
		'dMmyUoEF1BuRdrMZWSiWZO9HrnCNQW7SX/ZCNZXLzXIujj8gAPZvlZUKvvY82zk4bbWfvB99kZzd+sLF' +
		'uKoLxRIICdg1w8cBu2L4HcB+GKkIxD3A9ubLVRAKGNFz7jSIdSBRM3wTSFQMfwsklrxaBGIPcBrVhQaI' +
		'n8BE1Q89sMaBx57SEVhbQLpeX6yCdQIMF4olaZ65/B1uvwRrraPlV2FzEgbfdLQhF+xJ2D7oaEdJBCCS' +
		'u+H91BgAok9D90kcH12H3m1o6zj+sRHH7dfQ9QlaD7ymXvrtkbBScFlv/ml6kweYu//mxgsAHHjVgjxw' +
		'Nw0bKzCUh4HPkAPm0lip1J8yvpnsQjebkZWg6SvtnAVKiEuWDJIKAU18FBrn3I3/R+QvRwDTi+qRXqjN' +
		'R3JKqcCXMw1vdESOOc7ExfsmY4Cefnh+w1rpe/qu+e3w77lfMCGEep+nbswAAAAEZ0FNQQAAsZ5hTEH3' +
		'AAAAIGNIUk0AAG11AABzoAAA9rEAAIWZAABsxQAA6Y4AADF9AAAXvFuht3UAAAI/SURBVHjarFNNSFRR' +
		'GD3ffe++medM5jCjKBY5KRglxAjirk1iRAgtW7WVamtREoIgGKGLdrWsbX+LFooVWgipmxLSwDGlCTJ1' +
		'zPlxfDPz7rtfC3XUdFUduLvznXu/c84lZkbs6gD2oD16Ktpv+n3CIuh0roC8YmFB6x8LiTsARnaIH590' +
		'wQQA3jvOHG1sP9dsRSKolsD4zBKSKRcNQY2lhURUYz9MHIRK5woQPgeWJCQzDlYzBURIAID6kywOEQAR' +
		'ILaPQQSTCIJwKAT+EQIA6C8G6X+9YCsFZnieB2IAzJqYD7mRoZXSmgHNDFOauwI+v6+zLBy6mC+6Gyah' +
		'skjC9TNkKVkAjhZueU3VFQ06H7CtYHp5bQjAIxMADELDsdazHT+P1wtRdJExGH7PK6VM2kNSlMmKjsvt' +
		'tdUhhL/F9dTz4XjJg1zO6Z1+OtQjZr9kFAnkFYNov2GO0nDJQO7TdObt4xc92Q2nt7SCtIMbrPX91ZFR' +
		'r1GiO9B05ojn7XZGMVBbbqMyMZf9OjLWL32BQTKEWxJYmRkDs3ZDdbGBueFxbrHk7XCsqcIrFqE0o+po' +
		'AJHlRGrx/Yd7yi0OrscnFJEAcGNL4PvEMwDA6uw7FapvHRjfTLsXpHn3ZPPpUGWFjbL5xfW50Td9yfmp' +
		'B7/mJ71Cdm3v3+EDxRLSlnVt12/2vY6nul5+TkXbrt0Slm1tc4ydHjEziJlBW475AIQABAGApF1zouVS' +
		'pyEEL06+eqhdZ2VbYBPAOoA8M+vfAwBEFPPpR2AAVAAAAABJRU5ErkJggg==';

ImageOptDel = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADDklEQVQ4jVWRTWhcZRSGn3O/O3cmmbmT' +
		'6cyQhklB0BRtbtWWIgkNRiYWSmNDNoWCTTe6CtKVQqEIbiJxrZSCUCGIihupkraKJZJiFoEGF8lCFxNb' +
		'YQyjYSYz1fm79/s+F/khHniXz8M57xGANxIJ3jt16ppKJqd7lLp+eWlpbTOKODw+cL9YfF5c95Oo2fzp' +
		'i/X1+U8bDRiPx1k5e/bDLwcH7YLv28WhIbs5PT3ygucdwFngt8nJ4PsTJ+znvm+/KhTsz2Njty6n08iN' +
		'QiE46bob7UaDuFIooC+bZTgIRl+/e3e1EoasXbwY/LG5uVHd2kK7Lp0wJJZMUovHX5Vrvp8/rdTfohRK' +
		'BE8ER2v8XI7B48dfaYXh06fl8q+1SgWjFJHWRECkNX9a+5ykRbiZzY6H1i4rwHUclAiiNal83riu261t' +
		'bSVEKbTIrkAEX2Tq3Wp1UQAye5IuLDvWohwHRwRrDGItohTGWrQx6D34eq22WNIa2S8q4zh8nMmMd7Ve' +
		'dl0X9kQAdg/UxuA7ztSNnZ3FktYAOPuCHWOYbzQe9h87NtuJIrS1hPsRIdSa/NGj73/Wbh/A/xP4wK1i' +
		'Mah3uzejw/Ch1DuduQ/Gx0eeVepAIAAp4Ntz54LHpdLGTqVCzPMQQKzdPQEwIugwJJnLcXJ4ePTKgwer' +
		'j6MISQLfTEwEm6XSRq1SwfU8lLWI4+wXZA2IGIMRIQxDUrkcLw4Pj765tLQq7wwOpgPPq1fKZTzPwzkE' +
		'ezAZQl1gxQAawFrCbpcj/f00EomC26pWh7atRWIxQmN2Vw9DUjD1Ubt9vwbMJRKvhbBsHAcNSCxGdXub' +
		'f5QKVCeKtl6Oome0tadFBNNqkUilLtwbGLi3nU6TzGT4va/vyUvwY6def9tRChtFuN3unYdhOC+XZma4' +
		'dP78QHlh4c6/a2sj+ZmZr/uKxe/ijnPEhR52V291YKexsjLx1+3bb/UGwXrh6tULPzx6VHZNs4nq7e0f' +
		'mJ2dE6V82+lkbbNZaO8+x+59KwX0+GfO/JIeG7titW64kDetVvk/ir1yHAuHTIIAAAAASUVORK5CYII=';


// Language
LangStrings = {
	en: {
		gYes:			'بله',
		gNo:			'خبر',
	
		gWellness:		'سلامتي',
		gStrength:		'قدرت بدني',
		gMilitarRank:	'قدرت نظامي',
	
		mCore:	{options: 'تنظيمات'},
		mMiniInventory:	'انبار',
		mDamageCalc:	{
			button:'ضربه', noWeap:'بدون اسلحه', weapQ:'کيفيت', tbNoWeap:'هيچ',
			showButton:'نمايش در ستون کناري'
		},
		mSkillShow:		{
			prompt: 'Select an option from the following:\n0: Show your active skill\n1: Manufacturing\n2: Land Resources\n3: Constructions\n ',
		},
		mWarMod:	{
			fought: ['You haven\'t fought today', 'You have fought ', ' time today', ' times today'],
			healed: ['You haven\'t healed yourself today', 'You have already healed yourself today ']
		},
		
		oAddModule:    'اضافه کردن',
		oSelectModule: 'انتخاب کردن',
		
		cReset:		'ريست کوکي ها',
		cSave:		'ذخيره کوکي ها',
		cShow:		'نمايش کوکي ها (JSON)',
		cMod:		'ويرايش کوکي ها'
	},
	es: {
		gYes:			'بله',
		gNo:			'خبر',
	
		gWellness:		'سلامتي',
		gStrength:		'قدرت بدني',
		gMilitarRank:	'قدرت نظامي',
	
		mCore:	{options: 'تنظيمات'},
		mMiniInventory:	'انبار',
		mDamageCalc:	{
			button:'ضربه', noWeap:'بدون اسلحه', weapQ:'کيفيت', tbNoWeap:'هيچ',
			showButton:'نمايش در ستون کناري'
		},
		mSkillShow:		{
			prompt: 'Select an option from the following:\n0: Show your active skill\n1: Manufacturing\n2: Land Resources\n3: Constructions\n ',
		},
		mWarMod:	{
			fought: ['You haven\'t fought today', 'You have fought ', ' time today', ' times today'],
			healed: ['You haven\'t healed yourself today', 'You have already healed yourself today ']
		},
		
		oAddModule:    'اضافه کردن',
		oSelectModule: 'انتخاب کردن',
		
		cReset:		'ريست کوکي ها',
		cSave:		'ذخيره کوکي ها',
		cShow:		'نمايش کوکي ها (JSON)',
		cMod:		'ويرايش کوکي ها'
	}
};

marketNums = [ null,
	'غذا', 'هديه', 'اسلحه', 'بليط', 'گندم', 'الماس',
	'آهن', 'نفت', 'چوب', 'خانه', 'بيمارستان', 'سيستم دفاعي'
];
marketNames = {
	food: 1,   gift: 2,   weapon: 3,   movingticket: 4,   grain: 5,       diamonds:6,
	iron: 7,   oil: 8,    wood: 9,     house: 10,         hospital: 11,   defensesystem:12
};

if (LangStrings[CurrentLang] !== undefined) {
	Lang = LangStrings[CurrentLang];
} else {
	Lang = LangStrings.en;
}


// Register the commands
GM_registerMenuCommand('jR: ' + Lang.cShow, function(){alert(JSON.stringify(getCookie(User)))});
GM_registerMenuCommand('jR: ' + Lang.cSave, function(){setCookie(User, Cookie);});
GM_registerMenuCommand('jR: ' + Lang.cReset, function(){Cookie=null; setCookie(User, Cookie);});
GM_registerMenuCommand('jR: ' + Lang.cMod, function(){Cookie=null; setCookie(User, Cookie);});

// Create the Modules object and the ModuleList array
Modules = {
	DamageCalc:     {name: 'Damage Calculator',	Or: false, params: []},
	ExactMoney:     {name: 'Exact Money',       Or: true,  params: []},
	//ExpShow:        {name: 'Experience Show',   Or: false, params: []},
	ExtraAccount:   {name: 'Extra Account',     Or: true,  params: ['Currency name']},
	//GoldenMarket:   {name: 'Golden Market',     Or: true,  params: []},
	MiniInventory:  {name: 'Mini Inventory',    Or: true,  params: []},
	SkillShow:      {name: 'Skill Show',        Or: false, params: []},
	SmallWellness:  {name: 'Smaller Wellness',  Or: false, params: []},
	//TitleUnflasher: {name: 'Title Unflasher',   Or: true,  params: []},
	WarMod:         {name: 'War Module',        Or: false, params: []}
};
	
// Check for the page in which you are
inOptions = Section.indexOf('plusfa/options') > -1;
inProfile = Section.indexOf('citizen/profile/'+UserID) > -1;
inFight = Section.indexOf('battles/fight') > -1;
inArmy = Section.indexOf('my-places/army') > -1;
inMarket = Section.indexOf('/market/') > -1;
inWork = Section.indexOf('do_work') > -1;
inTrain = Section.indexOf('my-places/train') > -1;
inRegion = Section.indexOf('region/') > -1;

// Grab info from the page and pass it to the cookie
Cookie.data.level = $$('.xprank')[0].innerHTML *1;
isOr = $$('.xprank')[0].innerHTML == 'Or';
if (!isOr) {
	Cookie.data.wellness = $('wellnessvalue').innerHTML *1;
}

// Substract 1 food at day starting
if (Cookie.misc.day < eRepDay && Cookie.data.inventory.food > 0) {
	Cookie.data.inventory.food--;
	Cookie.misc.foughtToday = 0;
	Cookie.misc.healedToday = false;
}
	
if (Cookie.misc.hour < eRepHour)
	grabWorkData(UserID);

if (inOptions) {
	alert('inOptions');
} else if (inProfile) {
	quarters = $$('.quarter');
	Cookie.data.skill.manufacturing	= quarters[4].select('.special')[0].innerHTML *1;
	Cookie.data.skill.land			= quarters[5].select('.special')[0].innerHTML *1;
	Cookie.data.skill.constructions	= quarters[6].select('.special')[0].innerHTML *1;
	Cookie.data.strength				= quarters[7].select('.special')[0].innerHTML *1;

	currentExp = $$('.xppoints strong')[0].innerHTML;
	totalExp = $$('.xppoints strong')[1].innerHTML;
	Cookie.data.exp = {
		current: parseInt(currentExp),
		total: parseInt(totalExp)
	};
	
	damagehold = $$('.padded .goright')[1];
	damagetext = damagehold.innerHTML.replace(/[ \n\t]*/g, '');
	if (damagetext.indexOf('/') > -1) {
		damagesplit = damagetext.split('/');
		Cookie.data.damage = {
			current: parseInt(damagesplit[0]),
			total: parseInt(damagesplit[1])
		}
	} else {
		Cookie.data.damage = {
			current: parseInt(damagetext),
			total: null
		}
	}
	
	console.log(Cookie);

	accounts = $('allaccounts').getElementsByClassName('accountdisplay');
	for (i=0; i<accounts.length; i++) {
		account = accounts[i].select('.push_left')[0].innerHTML;
		value = accounts[i].select('.push_right')[0].innerHTML;
		flag = null;
		
		if (account.indexOf('flags/M') > -1) {
			flag = account.substring(account.indexOf('flags/M')+8, account.indexOf('.gif'));
		}
		
		if (account.indexOf('alt="Gold"') > -1) {
			account = 'GOLD';
		} else {
			account = account.substring(account.indexOf('title="')+7, account.indexOf('" alt="'));
		}
		
		point = value.indexOf('.');
		before = value.substring(0, point);
		after = value.substring(point);
		value = (before.substring(before.lastIndexOf(' ')+1) + after.substring(0, after.indexOf(' '))) *1;
		
		Cookie.data.accounts[account] = {
			amount: value,
			flag: flag
		};
	}
	
	var smdot = $$('.smalldotted');
	Cookie.data.country = smdot[2].innerHTML
	Cookie.data.region = smdot[3].innerHTML
	
	Cookie.data.inventory = defaultInventory;
	listItems = $$('li');
	for (i=0; i<listItems.length; i++) {
		if (listItems[i].select('.tooltip').length == 1 && listItems[i].select('.qlsmalllevel').length == 1) {
			invItImage = listItems[i].select('img')[0];
			type = invItImage.src;
			type = type.substring(type.indexOf('icon_industry_')+14, type.indexOf('.gif'));
			
			Cookie.data.inventory[type]++;
		}
	}
	
	militarConversion = {'private':1,corporal:2,sergeant:3,lieutenant:4,captain:5,colonel:6,general:7,fieldmarshal:8};
	careericon = $$('.quarterhead .avatarholder img')[3];
	Cookie.data.militarRank.name = careericon.getAttribute('src').substring(
		careericon.getAttribute('src').lastIndexOf('_')+1,
		careericon.getAttribute('src').indexOf('.gif')
	);
	Cookie.data.militarRank.num = militarConversion[Cookie.data.militarRank.name];
} else if (inFight) {
	if (Cookie.data.inventory.weapon > 0) {
		Cookie.data.inventory.weapon--;
	}
	Cookie.data.exp.current += 2;
	Cookie.misc.foughtToday ++;
} else if (inMarket) {
	buttons = $$('input.marketbtn[name="commit"]');
	for (var i=0; i<buttons.length; i++) {
		buttons[i].observe('click', function(e){
			var amount = this.parentNode.parentNode.getElementsByTagName('input')[0].value *1;
			var tdprice = this.parentNode.parentNode.getElementsByTagName('td')[3];
			var priceint = tdprice.getElementsByTagName('span')[0].innerHTML;
			var pricedec = tdprice.getElementsByTagName('sup')[0].innerHTML;
			var pricecur = tdprice.getElementsByTagName('span')[1].innerHTML;
			
			var posindustry = location.href.indexOf('industry-')+9;
			var posindustryend = location.href.indexOf('-', posindustry);
			var market = location.href.substring(posindustry, posindustryend);
			
			Cookie.data.inventory[marketNums[market]] += amount;
			Cookie.data.accounts[pricecur].amount -= ((priceint + pricedec) *1)*amount;
			
			setCookie(User, Cookie);
		});
	}
} else if (inWork) {
	var spanmanu = $$('.icon-manufacturing');
	var spanland = $$('.icon-land');
	var spanconst = $$('.icon-constructions');
	
	if (spanmanu.length>0)
		Cookie.data.workIn = 'manufacturing';
	else if (spanland.length>0)
		Cookie.data.workIn = 'land';
	else if (spanconst.length>0)
		Cookie.data.workIn = 'constructions';
		
	var ems = $$('em');
	for (var i=0; i<ems.length; i++) {
		var inem = ems[i].innerHTML;
		if (inem.indexOf('(+') > -1) {
			var up = inem.substring(inem.indexOf('(+')+2, inem.indexOf(')'));
			if (Math.round(up) != up*1) {
				Cookie.data.skill[Cookie.data.workIn] += up*1;
				Cookie.data.exp.current ++;
			}
		}
	}
} else if (inTrain) {
	var ems = $$('.green_bg');
	for (var i=0; i<ems.length; i++) {
		var inem = ems[i].innerHTML;
		if (inem.indexOf('>+') > -1) {
			var up = inem.substring(inem.indexOf('>+')+2, inem.indexOf('</strong>'));
			if (Math.round(up) != up*1) {
				Cookie.data.strength += up*1;
				Cookie.data.exp.current += 2;
			}
		}
	}
} else if (inRegion) {
	if (healBut = $('submit_ajax_heal_id')) {
		healBut.observe('click', function(Ev){
			Cookie.misc.healedToday = true;
			setCookie(User, Cookie);
		});
	}
}

// Create the Module Function Handler
ModuleHandler = {
	
	DamageCalc: function (params) {
		var baseDamage = Cookie.data.strength * (1+((Cookie.data.wellness-25)/100)) * (1 + (Cookie.data.militarRank.num/5)) * 2;
		var baseDamage100 = Cookie.data.strength * 1.75 * (1 + (Cookie.data.militarRank.num/5)) * 2;
		if (Cookie.config.DamageCalc.showButton) {
			PDamageCalc = getGlobalPanel();
			var but = (new Element('a')).observe('click', function(){alert(
				Lang.gStrength + ': ' + Cookie.data.strength + '\n' + 
				Lang.gMilitarRank + ': ' + Cookie.data.militarRank.num + '\n' + 
				Lang.gWellness + ': ' + Cookie.data.wellness + '\n' + 
				'\n' + 
				Lang.mDamageCalc.noWeap + ': ' + Math.round(baseDamage * 0.5) + '\n' + 
				Lang.mDamageCalc.weapQ + '1: ' + Math.round(baseDamage * 1.2) + '\n' + 
				Lang.mDamageCalc.weapQ + '2: ' + Math.round(baseDamage * 1.4) + '\n' + 
				Lang.mDamageCalc.weapQ + '3: ' + Math.round(baseDamage * 1.6) + '\n' + 
				Lang.mDamageCalc.weapQ + '4: ' + Math.round(baseDamage * 1.8) + '\n' + 
				Lang.mDamageCalc.weapQ + '5: ' + Math.round(baseDamage * 2) + '\n' + 
				'_____________\n\n' + 
				Lang.gWellness + ': 100\n' + 
				'\n' + 
				Lang.mDamageCalc.noWeap + ': ' + Math.round(baseDamage100 * 0.5) + '\n' + 
				Lang.mDamageCalc.weapQ + '1: ' + Math.round(baseDamage100 * 1.2) + '\n' + 
				Lang.mDamageCalc.weapQ + '2: ' + Math.round(baseDamage100 * 1.4) + '\n' + 
				Lang.mDamageCalc.weapQ + '3: ' + Math.round(baseDamage100 * 1.6) + '\n' + 
				Lang.mDamageCalc.weapQ + '4: ' + Math.round(baseDamage100 * 1.8) + '\n' + 
				Lang.mDamageCalc.weapQ + '5: ' + Math.round(baseDamage100 * 2) + '\n'
			);}).update(Lang.mDamageCalc.button).setStyle({
				fontFamily: 'Tahoma',
				fontSize: '9px',
				fontWeight: 'bold',
			});
			but.setAttribute('href', 'javascript:void(0)');
			addPanelItem(PDamageCalc, but, {textAlign:'center', padding:'2px'});
		}
		if (inArmy) {
			var table = $$('.offers')[0];
			var row = new Element('tr');
			var cell = new Element('td');
			cell.wrap(row).wrap(table);
			cell.update(
				'<table id="damagecalc">' +
				'<tr id="titlesrow"><th>'+Lang.gWellness+'</th><th>'+Lang.mDamageCalc.tbNoWeap+'</th>' +
				'<th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th><th>Q5</th></tr>' +
				'<tr id="wncurrentrow"><td><div id="wncurrentspan">'+Cookie.data.wellness+'</span>' +
				'</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
				'<tr id="wn100row"><td><div id="wn100span">100</span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
				'<tr id="wninputrow"><td>' +
				'<span id="wninputspan"><input type="text" name="wninputinput" id="wninputinput" value="' + 
				(Cookie.config.DamageCalc.wnLastInput ? Cookie.config.DamageCalc.wnLastInput : 0) + 
				'"/></span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
				'</table>'
			);
			var weapMult = [0.5, 1.2, 1.4, 1.6, 1.8, 2];
			var wnCurrent = $$('#wncurrentrow td');
			for (var i=1; i<wnCurrent.length; i++) {
				wnCurrent[i].update(Math.round(baseDamage * weapMult[i-1]));
			}
			var wn100 = $$('#wn100row td');
			for (var i=1; i<wn100.length; i++) {
				wn100[i].update(Math.round(baseDamage100 * weapMult[i-1]));
			}
			wnInput = $$('#wninputrow td');
			for (var i=1; i<wn100.length; i++) {
				wnInput[i].update(Math.round((baseDamage100/100)*$('wninputinput').getValue() * weapMult[i-1]));
			}
			
			if ( !('damagecalc') ) {
				$('damagecalc').setStyle({width: '601px'});
				var ths = $('damagecalc').select('th');
				for (var i=0; i<ths.length; i++) {
					ths[i].setStyle({
						borderBottom: '1px solid silver', borderRight: (i==0?'1px solid silver':0), fontSize: '12px', fontWeight: 'bold',
						width: '14.28%', textAlign: 'center', padding: '4px'
					});
				}
				var tds = $('damagecalc').select('td');
				for (var i=0; i<tds.length; i++) {
					tds[i].setStyle({
						border: 0, borderRight: (i%7==0?'1px solid silver':0), fontSize: '12px', fontWeight: 'bold', width: '85px',
						textAlign: 'center', padding: '4px', color: '#99C74A'}
					);
				}
				
				$('wncurrentspan').setStyle({
					color:'white',background:'#43B7ED url('+ImageSqrBg+') center center',padding:'2px',width:'60px', marginLeft:'6px'
				});
				$('wn100span').setStyle({
					color:'white',background:'#99C74A url('+ImageSqrBg+') center center',padding:'2px',width:'60px', marginLeft:'6px'
				});
				$('wninputinput').setStyle({
					border: 0, background: 'white url('+ImageSqrBorder+') -21px center', height: '19px', width: '60px', paddingTop: '3px',
					textAlign: 'center', color: 'grey', fontWeight: 'bold', fontFamily: 'arial', fontSize: '12px'
				}).observe('keyup', function(){
					for (var i=1; i<wn100.length; i++) {
						Cookie.config.DamageCalc.wnLastInput = $('wninputinput').getValue()*1;
						wnInput[i].update(Math.round((baseDamage100/100)*Cookie.config.DamageCalc.wnLastInput * weapMult[i-1]));
						setCookie(User, Cookie);
					}
				});
				
				var optdiv = new Element('div');
				optdiv.update('<input type="checkbox" name="dcshowbutton" id="dcshowbutton"> ' + Lang.mDamageCalc.showButton);
				optdiv.wrap(cell);
				$('dcshowbutton').setValue(Cookie.config.DamageCalc.showButton);
				$('dcshowbutton').observe('change', function(){
					Cookie.config.DamageCalc.showButton = !!$('dcshowbutton').getValue();
					setCookie(User, Cookie);
				});
			}
			
		}
	},
	
	ExactMoney: function () {
		
		// For GOLD:
		actualGold = $('side_bar_gold_account_value').innerHTML *1;
		exactGold = Cookie.data.accounts.GOLD.amount;
		if (Math.floor(exactGold) == actualGold) {
			$('side_bar_gold_account_value').update(moneyFormat(exactGold));
		}
		
		// For the Other CUR:
		completeCur = $$('.core .item')[1].innerHTML;
		nameCur = completeCur.substring(completeCur.indexOf('alt="')+5, completeCur.indexOf('" title="'));
		imgEnd = completeCur.indexOf('>')+1;
		actualCur = completeCur.substring(imgEnd) *1;
		if (typeof Cookie.data.accounts[nameCur] != 'undefined') {
			exactCur = Cookie.data.accounts[nameCur].amount;
			if (Math.floor(exactCur) == actualCur) {
				$$('.core .item')[1].update(completeCur.substring(0, imgEnd) + moneyFormat(exactCur));
			}
		}
	},
	
	ExpShow: function () {
		/*var expPerc = Math.round(
			((Cookie.data.exp.current-ExpTable[Cookie.data.level]) / (Cookie.data.exp.total-ExpTable[Cookie.data.level])) * 10000
		)/100;
		
		var coremenu = $$('#miniprofile .core')[0];
		
		var holder = (new Element('div')).setStyle({
			paddingTop:    '10px',
			marginBottom: '15px',
			clear:        'both'
		});
		holder.wrap(coremenu);
		coremenu.insertBefore(
			holder,
			coremenu.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
		);
		
		var cell = (new Element('div')).addClassName('item').setStyle({
			background:  'white',
			height:      '15px',
			width:       '69px',
			margin:      '1px 0 0 0',
			padding:     '0',
			position:    'absolute',
		});
		
		var text = (new Element('div')).update( expPerc + '%' ).setStyle({
			position:    'absolute',
			width:       '100%',
			top:         '0',
			left:        '0',
			height:      '14px',
			textAlign:   'center',
			fontSize:    '10px',
			fontWeight:  'bold',
			color:       '#617D07',
			fontFamily:  'Tahoma',
			paddingTop:  '1px',
			paddingLeft: '3px',
			zIndex:      '40'
		});
		
		var prog = (new Element('div')).setStyle({
			width:       Math.round( expPerc ) + '%',
			height:      '15px',
			background:  '#BCDE7F',
			position:    'absolute',
			top:         '0',
			left:        '0',
			zIndex:      '20',
		});
		
		text.wrap(cell);
		prog.wrap(cell);
		cell.wrap(holder);
		
		var tooltipHolder = (new Element('div')).absolutize().setStyle({
			padding: 0, width: 'auto'
		});
		document.body.appendChild(tooltipHolder);
		
		var tooltipTxt = (new Element('div')).update(Cookie.data.exp.current + ' / ' + Cookie.data.exp.total);
		tooltipTxt.setStyle({
			color: '#617D07', fontWeight: 'bold', width: 'auto', height: '15px', cssFloat: 'left',
			textAlign: 'center', fontSize: '10px', fontFamily: 'Tahoma', padding: '1px 3px', paddingLeft: '8px',
			background: 'url('+ImageExpTooltip+') 0 0 no-repeat'
		}).wrap(tooltipHolder);
		
		(new Element('div')).setStyle({
			padding: 0, width: '3px', height: '15px', background: 'url('+ImageExpTooltip+') center right no-repeat', cssFloat: 'left'
		}).wrap(tooltipHolder);
		
		tooltipHolder.hide();
		
		cell.observe('mouseover', function(Ev){
			var offset = cell.cumulativeOffset();
			tooltipHolder.setStyle({
				left: ( offset[0] + 72) + 'px',
				top:  ( offset[1] ) +'px',
			});
			tooltipHolder.show()
		});
		cell.observe('mouseout',  function(Ev){ tooltipHolder.hide() });
		//*/
	},
	
	ExtraAccount: function (params) {
		account = params[0];
		if (typeof Cookie.data.accounts[account] != 'undefined') {
			money = Cookie.data.accounts[account].amount;
			flag = Cookie.data.accounts[account].flag;
		} else {
			money = 0;
			flag = null;
		}
		
		if ($$('img[src="/images/flags/S/'+flag+'.gif"]').length>=1) {
			return;
		}
		
		holder = new Element('div');
		holder.addClassName('item');
		holder.wrap($('accountdisplay'));
		holder.update('<img class="flag" alt="'+account+'" title="'+account+'" src="/images/flags/S/'+flag+'.gif" />'+moneyFormat(money)+'</div>');
	},
	
	MiniInventory: function () {
		itemList = {};
		
		PInventory = createPanel();
		addPanelItem(PInventory, Lang.mMiniInventory, {
			padding: '3px',
			
			fontFamily: 'Verdana',
			fontSize: '10px',
			fontWeight: 'bold',
			
			textAlign: 'center'
		});
		for (var i in Cookie.data.inventory) {
			if (Cookie.data.inventory[i] != 0) {
				var url = '/'+CurrentLang+'/market/country-0-industry-'+marketNames[i]+'-quality-0';
				addPanelItem(PInventory, '<!-- [URL]' + url + '[/URL] -->' + Cookie.data.inventory[i], {
						backgroundImage: 'url(' + ProductMiniImages[i.toLowerCase()] + ')',
						backgroundPosition: '6px 2px',
						backgroundRepeat: 'no-repeat',
						paddingLeft: '30px',
						textAlign: 'left',
						cursor: 'pointer'
				}).observe('click', innerCommentUrl);
			}
		}
	},
	
	SkillShow: function () {
		var holder = (new Element('div')).setStyle({paddingTop: '10px', clear:'both'});
		var coremenu = $$('#miniprofile .core')[0];
		holder.wrap(coremenu);
		coremenu.insertBefore(
			holder,
			coremenu.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
		);
		
		var urlcom = '<!-- [URL]/'+CurrentLang+'/my-places/army[/URL] -->';
		var strdisp = (new Element('div')).addClassName('item').update(urlcom + Math.round(Cookie.data.strength*100)/100).setStyle({
			color: 'grey',
			backgroundColor: 'white',
			padding: '3px',
			margin: '1px 0 0 0',
			
			fontFamily: 'Arial',
			fontSize: '12px',
		
			verticalAlign: 'middle',
			
			backgroundImage: 'url(' + SkillMiniImages.strength + ')',
			backgroundPosition: '6px 2px',
			backgroundRepeat: 'no-repeat',
			paddingLeft: '30px',
			textAlign: 'left',
			
			cursor: 'pointer'
		});
		strdisp.wrap(holder);
		strdisp.observe('click', innerCommentUrl);

		var tooltipDamHolder = (new Element('div')).absolutize().setStyle({
			padding: 0, width: 'auto'
		});
		tooltipDamHolder.wrap(strdisp);
		
		var damageShow = Cookie.data.damage.current + (Cookie.data.damage.total !== null ? (' / ' + Cookie.data.damage.total) : '');
		var tooltipDamTxt = (new Element('div')).update(damageShow);
		tooltipDamTxt.setStyle({
			color: '#990000', fontWeight: 'bold', width: 'auto', height: '15px', cssFloat: 'left',
			textAlign: 'center', fontSize: '10px', fontFamily: 'Tahoma', padding: '1px 3px', paddingLeft: '8px',
			background: 'url('+ImageDamageTooltip+') 0 0 no-repeat'
		}).wrap(tooltipDamHolder);
		
		(new Element('div')).setStyle({
			padding: 0, width: '3px', height: '15px', background: 'url('+ImageDamageTooltip+') center right no-repeat', cssFloat: 'left'
		}).wrap(tooltipDamHolder);
		
		tooltipDamHolder.hide();
		
		strdisp.observe('mouseover', function(Ev){ 
			offset = strdisp.cumulativeOffset();
			tooltipDamHolder.setStyle({
				left: ( offset[0] + 72 ) + 'px',
				top:  ( offset[1] + 4 )  + 'px',
			});
			tooltipDamHolder.show()
		});
		strdisp.observe('mouseout', function(Ev){tooltipDamHolder.hide()});
		
		if (Cookie.config.SkillShow.skill==undefined)
			Cookie.config.SkillShow.skill = 'auto';
		
		var showSkill = (Cookie.config.SkillShow.skill=='auto') ? Cookie.data.workIn : Cookie.config.SkillShow.skill;
		var imgSkill = showSkill==undefined ? SkillMiniImages.all : SkillMiniImages[showSkill];
		var dataSkill = showSkill==undefined ? 'N / A' : Cookie.data.skill[showSkill];
			
		if (showSkill==undefined) {
			grabWorkData(UserID);
		}
		
		urlcom = '<!-- [URL]/' + CurrentLang + '/my-places/company/' + UserID + '[/URL] -->';
		var skldisp = (new Element('div')).addClassName('item').update(urlcom + Math.round(dataSkill*100)/100).setStyle({
			color: 'grey',
			backgroundColor: 'white',
			padding: '3px',
			margin: '1px 0 0 0',
			
			fontFamily: 'Arial',
			fontSize: '12px',
		
			verticalAlign: 'middle',
			
			backgroundImage: 'url(' + imgSkill + ')',
			backgroundPosition: '6px 2px',
			backgroundRepeat: 'no-repeat',
			paddingLeft: '30px',
			textAlign: 'left',
			
			cursor: 'pointer'
		});
		skldisp.wrap(holder);
		skldisp.observe('click', innerCommentUrl);
	},
	
	SmallWellness: function () {
		$('wellnessmeter').setStyle({height: 0, padding: 0});
	},
	
	TitleUnflasher: function () {
		/*setTimeout( function () {
			var headers = $$('h1');
			for ( var i = 0; i < headers.length; i ++ ) {
				var alternate = headers[i].select('span')[0];
				headers[i].update();
				headers[i].setStyle(
					fontFamily: 'Georgia',
					position:   'absolute',
					width:      '120px'
				});
			}
		}, 5000);
		/**/
	},
	
	WarMod: function () {
		var wn = $('wellnessvalue');
		
		
		var tooltip = (new Element('div')).absolutize().setStyle({
			width:      'auto',
			height:     '29px',
			textAlign:  'left',
			fontFamily: 'Tahoma',
			fontSize:   '11px',
			color:      '#3298C7',
		}).hide();
		tooltip.wrap(wn);
		tooltip.id = 'WarModTooltip';
		
		var textHold = (new Element('div')).setStyle({
			cssFloat:    'left',
			background:  'url(' + ImageWarModTooltip + ') no-repeat',
			paddingLeft: '8px',
			paddingTop:  '1px',
			height:      '28px'
		});
		textHold.wrap(tooltip);
		
		var msgFought = null;
		switch (Cookie.misc.foughtToday) {
			case 0:		msgFought = Lang.mWarMod.fought[0];	break;
			case 1:		msgFought = Lang.mWarMod.fought[1] + Cookie.misc.foughtToday + Lang.mWarMod.fought[2];	break;
			default:	msgFought = Lang.mWarMod.fought[1] + Cookie.misc.foughtToday + Lang.mWarMod.fought[3];	break;
		}
		
		(new Element('div')).update(msgFought).wrap(textHold);
		(new Element('div')).update(Lang.mWarMod.healed[Cookie.misc.healedToday ? 1 : 0]).wrap(textHold);
		
		(new Element('div')).setStyle({
			cssFloat:   'left',
			background: 'url(' + ImageWarModTooltip + ') right no-repeat',
			width:      '4px',
			height:     '29px'
		}).wrap(tooltip);
		
		if (!Cookie.misc.healedToday && Cookie.misc.foughtToday > 0) {
			var wnPos = $('wellnessvalue').cumulativeOffset();
			var imgLink = ((new Element('img')).writeAttribute('src', ImageHeal)).wrap(new Element('a')).setStyle({
				position: 'absolute', left: (wnPos[0]-12)+'px', top: (wnPos[1]-10)+'px'
			}).writeAttribute('href', 'javascript:void(0)').observe('click', function(Ev){
				Cookie.redirect.push({time:300, link:'javascript:doHeal_onClick();'});
				Cookie.redirect.push({time:1500, link:location.pathname.substr(4)});
				Cookie.misc.healedToday = true;
				setCookie(User, Cookie);
				location.pathname = '/'+CurrentLang+'/region/'+Cookie.data.region.replace( / /g, '-' );
			});
			
			imgLink.wrap($('wellnessvalue'));
		}
		
		wn.observe('mouseover', function(Ev){
			var offset = $('wellnessvalue').cumulativeOffset();
			$('WarModTooltip').setStyle({
				left: ( offset[0] + 71 ) + 'px',
				top:  ( offset[1] - 3 )  + 'px',
			});
			$('WarModTooltip').show()
		});
		wn.observe('mouseout', function(Ev){ $('WarModTooltip').hide() });
	},
};

// Load all the modules stored in the cookie
for (var i=0; i<Cookie.modules.length; i++) {
	if (!isOr ||Cookie.modules[i].Or && typeof ModuleHandler[Cookie.modules[i].name]=='function') {
		if (typeof Cookie.config[Cookie.modules[i].name] == 'undefined') {
			Cookie.config[Cookie.modules[i].name] = {};
		}
		ModuleHandler[Cookie.modules[i].name](Cookie.modules[i].params);
	}
}

// DefaultModule
PMain = createPanel();

addPanelItem(PMain, 'plusfa', {
	padding: '3px 3px 0 3px',
	margin: '0',
	
	fontFamily: 'Verdana',
	fontSize: '10px',
	fontWeight: 'bold',
	
	textAlign: 'center'
});

addPanelItem(PMain, 'v' + Version.major + '.' + Version.minor + '.' + Version.build, {color: 'silver',
	backgroundColor: 'white',
	padding: '0 0 3px 0',
	margin: '0 0 1px 0',
	
	fontFamily: 'Verdana',
	fontSize: '9px',
	fontWeight: 'bold',
	
	textAlign: 'center'
});

OptionsLink = (new Element('a')).update(Lang.mCore.options).setStyle({
	fontFamily: 'Verdana',
	fontSize: '9px',
	fontWeight: 'bold',
})
OptionsLink.href = 'javascript:void(0)';
OptionsLink.observe('click', optgrLaunch);//optSelect);
addPanelItem(PMain, OptionsLink, {textAlign: 'center', padding: '1px'});


// If it is an Or, delete every module not meant for Or's
if (isOr) {
	var forOr = [];
	for (var i=0; i<Cookie.modules.length; i++) {
		if (Modules[Cookie.modules[i].name].Or) {
			forOr.push(Cookie.modules[i]);
		}
	}
	Cookie.modules = forOr;
}

// Do the redirects
if (Cookie.redirect === undefined)
	Cookie.redirect = [];

for (r=0; r<Cookie.redirect.length; r++) {
	var time = Cookie.redirect[r].time;
	var link = Cookie.redirect[r].link;
	var willBreak = false;
	if (link.indexOf('javascript:') != 0) {
		link = 'http://www.erepublik.com/' + CurrentLang + (link.length ? ('/' + link) : '');
		willbreak = true;
	}
	
	setTimeout(function(link){
		Cookie.redirect.shift();
		setCookie(User, Cookie);
		location.href = link;
	}, time, link);
	
	if (willBreak) {
		break;
	}
}

// Set the cookie
Cookie.misc.hour = eRepHour;
Cookie.misc.minute = eRepMin;
Cookie.misc.day = eRepDay;
Cookie.misc.version = VerNum;

setCookie(User, Cookie);


// Functions
function moneyFormat (money) {
	money = Math.round(money*100)/100;
	dot = money.toString().indexOf('.');
	if (dot > -1) {
		return money.toString().substring(0, dot) + '<sup>' + money.toString().substring(dot) + '</sup>';
	}
	return money;
}

function setCookie (name, value) {
	setTimeout(function(a,b){
		GM_setValue(a, b);
	}, 0, 'eRT_'+name, JSON.stringify(value));
}

function getCookie (name) {
	return JSON.parse(GM_getValue('eRT_'+name, null));
}

function innerCommentUrl (Ev) {
	var delimStart = Ev.findElement('div').innerHTML.indexOf('<!-- [URL]') + 10;
	var delimEnd = Ev.findElement('div').innerHTML.indexOf('[/URL] -->');
	var url = Ev.findElement('div').innerHTML.substring(delimStart, delimEnd);
	window.location.pathname = url;
}

function addPanelItem (panel) {				addPanelItem(panel, '')				} // 1 param overloading
function addPanelItem (panel, content) {	addPanelItem(panel, content, {})	} // 2 param overloading
function addPanelItem (panel, content, style) {
	var item = new Element('div');
	item.update(content);
	item.setStyle({
		color: 'grey',
		backgroundColor: 'white',
		padding: '3px',
		margin: '1px 0 0 0',
		
		fontFamily: 'Arial',
		fontSize: '12px',
	
		verticalAlign: 'middle'
	}).setStyle(style);
	item.wrap(panel);
	return item;
}

function createPanel () {
	var Panel = new Element('div');
	Panel.wrap($('miniprofile'));
	
	var pGap = new Element('div');
	pGap.setStyle({height: '10px', clear: 'both'});
	pGap.wrap(Panel);
	
	var pStart = new Element('div');
	pStart.addClassName('start');
	pStart.wrap(Panel);
	
	var pCore = new Element('div');
	pCore.addClassName('core');
	pCore.wrap(Panel);
	
	var pEnd = new Element('div');
	pEnd.addClassName('end');
	pEnd.wrap(Panel);
	
	return pCore;
}

function getGlobalPanel () {
	if (PGlobal === null) {
		PGlobal = createPanel();
	}
	return PGlobal;
}


function grabWorkData (id) {
	GM_xmlhttpRequest({url: 'http://api.erepublik.com/v1/feeds/citizens/'+id+'.json', method: 'GET', onload:function(h){
		var data = JSON.parse(h.responseText);
		GM_xmlhttpRequest({url: 'http://api.erepublik.com/v1/feeds/companies/'+data.employer_id+'.json', method: 'GET', onload:function(hh){
			var data = JSON.parse(hh.responseText);
			Cookie.data.workIn = data.domain;
			setCookie(User, Cookie);
		}});
	}});
}

/**
 * Men? de opciones gr?fico (por fin,se?ores, POR FIN)
 */
function optgrLaunch () {
	var vpOffset = document.viewport.getScrollOffsets();
	
	Event.observe(document, 'scroll', function(){
		var vpOffset = document.viewport.getScrollOffsets();
		$( '__greyLayer' ).setStyle({
			left:       vpOffset.left + 'px',
			top:        vpOffset.top  + 'px',
		});
		$('__optContainer').setStyle({
			left:       ( vpOffset.left + ( document.viewport.getWidth() / 2 ) - 200 ) + 'px',
			top:        ( vpOffset.top + ( document.viewport.getHeight() / 2 ) - 250 ) + 'px',
		});
	});
	
	// Capa negra
	if ( !$( '__greyLayer' ) ) {
		greyLayer = new Element('div');
		greyLayer.id = '__greyLayer';
		document.body.appendChild(greyLayer);
		greyLayer.absolutize();
		greyLayer.setStyle({
			left:       vpOffset.left + 'px',
			top:        vpOffset.top  + 'px',
			width:      '100%',
			height:     '100%',
			background: 'black',
			opacity:    '0.7',
			zIndex:     20000
		});
	}
	
	// Contenedor
	if ( !$('__optContainer') ) {
		optCont = new Element('div');
		optCont.id = '__optContainer';
		document.body.appendChild(optCont);
		optCont.absolutize();
		optCont.setStyle({
			left:       ( vpOffset.left + ( document.viewport.getWidth() / 2 ) - 200 ) + 'px',
			top:        ( vpOffset.top + ( document.viewport.getHeight() / 2 ) - 250 ) + 'px',
			width:      '400px',
			height:     'auto',
			border:     '1px solid white',
			background: '#679',
			padding:    '3px',
			//opacity:    '0.8',
			zIndex:     25000
		});
		
		optTitle = new Element('div');
		optTitle.id = '__optTitle';
		optTitle.wrap(optCont);
		optTitle.update(
		    '<div id="__optClose" style="cursor:pointer;float:right;color:white;background:red;font-size:10px;'
		  + 'font-family:Tahoma;font-weight:bold;padding:0 3px 1px 3px;">X</div>'
		  + '<div style="font-weight:bold;font-size:11px;font-family:Tahoma;color:#CDF">Persian+ Options</div>'
		);
		optTitle.setStyle({
			background: '#346',
			margin:     '3px',
			padding:    '3px 3px 3px 5px',
		});
		
		$('__optClose').observe('click', optgrClose);
		
		optCore = new Element('div');
		optCore.id = '__optCore';
		optCore.wrap(optCont);
		optCore.setStyle({
			background: 'white',
			margin:     '3px',
			padding:    '3px',
		});
		
		optFoot = new Element('div');
		optFoot.id = '__optFoot';
		optFoot.wrap(optCont);
		optFoot.setStyle({
			background: 'white',
			margin:     '3px',
			padding:    '3px',
		});
		
		divMenu = new Element('div');
		divMenu.wrap( optFoot );
		divMenu.setStyle({
			textAlign:  'center',
			fontWeight: 'bold',
			fontFamily: 'Tahoma',
			fontSize:   '10px',
			margin:     '3px',
			padding:    '3px',
			color:      '#346',
			background: '#CDF',
		});
		divMenu.update( Lang.oSelectModule + ': ' );
		
		modMenu = new Element('select');
		modMenu.id = '__modMenu';
		modMenu.wrap( divMenu );
		modMenu.observe('change', function ( ev ) {
			elem = ev.findElement('select');
			if ( elem.getValue() == '-' ) {
				$('__modAddBut').disable();
			} else {
				$('__modAddBut').enable();
			}
			
			pDivs = $$('.__paramDiv');
			for ( var i = 0; i < pDivs.length; i ++ ) {
				pDivs[i].remove();
			}
			
			for ( var i = 0; i < Modules[ elem.getValue() ].params.length; i ++ ) {
				var pDiv = new Element('div');
				pDiv.addClassName('__paramDiv');
				optFoot.insertBefore( pDiv, $('__divButton') );
				pDiv.update( Modules[ elem.getValue() ].params[ i ] + ': ');
				pDiv.setStyle({
					textAlign:  'center',
					fontWeight: 'bold',
					fontFamily: 'Tahoma',
					fontSize:   '10px',
					margin:     '3px',
					padding:    '3px',
					color:      '#346',
					background: '#CDF',
				});

				pText = (new Element('input')).writeAttribute('type', 'text');
				pText.id = '__paramInput_' + i;
				pText.setStyle({
					textalign: 'center',
					margin:    '0 2px',
					border:    '1px solid #346',
					width:     '100px',
				});
				pText.wrap( pDiv );
			}
		});
		modMenu.setStyle({
			textalign: 'center',
			margin:    '0 2px',
			border:    '1px solid #346',
			width:     '100px',
		});
		
		(new Element('option')).writeAttribute( 'value', '-' ).update( '- - - - -' ).setStyle({ paddingLeft: '3px' }).wrap( $('__modMenu') );
		for ( i in Modules ) {
			(new Element('option')).writeAttribute( 'value', i ).update( i ).setStyle({ paddingLeft: '3px' }).wrap( $('__modMenu') );
		}
		
		divBut = new Element('div');
		divBut.wrap( optFoot );
		divBut.id = '__divButton';
		divBut.setStyle({
			textAlign:  'center',
			margin:     '3px',
			padding:    '3px',
			background: '#CDF',
		});
		
		modAddBut = (new Element('input')).writeAttribute('type', 'button');
		modAddBut.setValue( Lang.oAddModule );
		modAddBut.id = '__modAddBut';
		modAddBut.wrap( divBut );
		modAddBut.disable();
		modAddBut.setStyle({
			border:     '1px solid #346',
			background: '#ABD',
			fontWeight: 'bold',
			fontFamily: 'Tahoma',
			fontSize:   '10px',
			textAlign:  'center',
			width:      '100px'
		});
		modAddBut.observe('click', function ( ev ) {
			var modName   = $('__modMenu').getValue();
			var modParams = [];
			
			for ( var i = 0; i < Modules[ modName ].params.length; i ++ ) {
				modParams.push( $('__paramInput_' + i).getValue() );
			}
			
			Cookie.modules.push({
				name:   modName,
				params: modParams
			});
			
			$('__modMenu').setValue('-');
			
			pDivs = $$('.__paramDiv');
			for ( var i = 0; i < pDivs.length; i ++ ) {
				pDivs[i].remove();
			}
			
			optgrLoadModules();
			setCookie(User, Cookie);
		});
	}
	
	$('__greyLayer').show();
	$('__optContainer').show();
	optgrLoadModules();
}

function optgrClose () {
	if ( $('__greyLayer') ) {
		$('__greyLayer').hide()
	}
	
	if ( $('__optContainer') ) {
		$('__optContainer').hide();
	}
	
	document.location.reload();
}

function optgrLoadModules () {
	if ( $('__optCore') ) {
		optCore = $('__optCore');
		optCore.update();
	
		len = Cookie.modules.length;
		for ( var i = 0; i < len; i ++ ) {
			newRow = new Element('div');
			newRow.wrap( optCore );
			newRow.setStyle({
				margin:     '3px',
				padding:    '3px',
				background: '#CDF',
			});
			newRow.addClassName('__row');
			(new Element('input')).writeAttribute('type', 'hidden').setValue( i ).wrap(newRow);
			
			newNCont = new Element('div');
			newNCont.wrap( newRow );
			newNCont.update( Cookie.modules[i].name );
			newNCont.setStyle({
				textAlign:  'center',
				fontFamily: 'Tahoma',
				fontSize:   '10px',
				fontWeight: 'bold',
				margin:     '3px',
				padding:    '3px',
				color:      'white',
				background: '#235',
				width:      '100px',
				cssFloat:   'left',
			});
			
			pLen = Cookie.modules[i].params.length
			for ( var j = 0; j < pLen; j ++ ) {
				var paramDiv = new Element('div');
				paramDiv.update( Cookie.modules[i].params[j] );
				paramDiv.wrap( newRow );
				paramDiv.setStyle({
					fontFamily: 'Tahoma',
					fontSize:   '10px',
					fontWeight: 'bold',
					margin:     '3px',
					padding:    '3px 5px',
					color:      '#235',
					background: '#ABD',
					cssFloat:   'left',
				});
			}
			
			var rgtButsStl = {
				width:      '16px',
				height:     '16px',
				cssFloat:   'right',
				padding:    '3px',
				margin:     '1px 2px',
				background: '#ABD',
			};
			
			iDel = (new Element('img')).writeAttribute('src', ImageOptDel);
			iDn  = (new Element('img')).writeAttribute('src', ImageOptDn);
			iUp  = (new Element('img')).writeAttribute('src', ImageOptUp);
			
			dDel = new Element('div');
			dDel.wrap( newRow );
			dDel.setStyle( rgtButsStl ).setStyle({ cursor: 'pointer' });
			dDel.update( iDel );
			dDel.observe('click', function ( ev ) {
				var row = ev.findElement('.__row');
				var rowNum = parseInt( row.select('input')[0].getValue() );
				
				Cookie.modules.splice( rowNum, 1 );
				
				optgrLoadModules();
					
				setCookie(User, Cookie);
			});
			
			dDn = new Element('div');
			dDn.wrap( newRow );
			dDn.setStyle( rgtButsStl );
			dDn.update( iDn );
			if ( i == len-1 ) {
				iDn.setStyle({ opacity: '0.3' });
			} else {
				dDn.setStyle({ cursor: 'pointer' }).observe('click', function ( ev ) {
					var row = ev.findElement('.__row');
					var rowNum = parseInt( row.select('input')[0].getValue() );
					
					tmp = Cookie.modules[ rowNum ];
					Cookie.modules[ rowNum ] = Cookie.modules[ rowNum + 1 ];
					Cookie.modules[ rowNum + 1 ] = tmp;
					
					optgrLoadModules();
					
					setCookie(User, Cookie);
				});
			}
			
			dUp = new Element('div');
			dUp.wrap( newRow );
			dUp.setStyle( rgtButsStl );
			dUp.update( iUp );
			if ( i == 0 ) {
				iUp.setStyle({ opacity: '0.3' });
			} else {
				dUp.setStyle({ cursor: 'pointer' }).observe('click', function ( ev ) {
					var row = ev.findElement('.__row');
					var rowNum = parseInt( row.select('input')[0].getValue() );
					tmp = Cookie.modules[ rowNum ];
					Cookie.modules[ rowNum ] = Cookie.modules[ rowNum - 1 ];
					Cookie.modules[ rowNum - 1 ] = tmp;
					optgrLoadModules();
					setCookie(User, Cookie);
				});
			}
			(new Element('div')).setStyle({ clear: 'both' }).wrap( newRow );
		}
	}
}