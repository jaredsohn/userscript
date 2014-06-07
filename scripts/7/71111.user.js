// ==UserScript==
// @name           eRepublik zh-TW
// @namespace      edited by CW
// @description    eRepublik 中文版 (原作者：jiqimaono2 / 繁中化：acedia0915, josesun)
// @version        9.20a
// @include        http://www.erepublik.com/*
// ==/UserScript==
var strings = {

//標準格式"" : "",

//
"Send email invite" : "發送郵件邀請",
"Your personal invitation link" : "您的邀請連結 (可讓被邀請人直接輸入此網址)",
"Citizenship passes" : "可批准人數",
"Citizenship applications" : "國籍申請",
"Approved" : "已批准",
"Your offer has been updated" : "您的報價已更新",
"Our next candidate" : "下屆選舉候選人",
"Employees details" : "員工詳細資料",
"Show all accounts" : "顯示所有帳戶",
"Minimum wage" : "最低工資",
"Provide citizenship" : "批准公民權",
"New citizen fee" : "新人安家費",
"Hello, Congress Member" : "您好，議員",
"Debate location (optional)" : "討論地點 (選用)",
"Transfers" : "流通",
"Account balance" : "帳戶明細",
"Sales history" : "銷售歷史",
"Your accounts" : "您的帳戶",
"Company accounts" : "公司帳戶",
"Invest" : "投資 (捐給公司)",
"Collect" : "領取 (需扣所得稅)",
"New feature" : "新功能",
"You cannot join this fight because your country is not involved in the war" : "您不能參與這場戰鬥，因為您的國家沒有捲入這場戰爭",
"Upgrade quality level" : "提升公司星級",
"VAT" : "消費稅 (VAT, 公司販賣產品時扣除)",
"Income Tax" : "所得稅 (從工資或公司領錢時扣除)",
"New Citizen Message" : "新公民訊息",
"Alliance" : "結盟",
"Buy from market" : "去公司轉讓市場",
"General Manager" : "總經理",
"congress members" : "國會成員",
"Election day" : "選舉日",
"Citizenship requests" : "國籍申請",
"View requests" : "檢視申請",
"Tutorials" : "遊戲教學",
"of Congress" : "國會",
"Citizenship": "國籍",
"Forfeit points": "違規點數",
"all donations": "捐獻列表",
"Run for congress": "參加議員競選",
"World Map":"世界地圖",
"Advertising Department": "廣告業務",
"Report": "回報",
"citizen ads beta": "公民廣告測試版",
"Advertise here": "按這裡刊登廣告",


// footer
"Shop": "商城",
"Press": "新聞發佈",
"Contact": "聯絡資訊",
"Jobs": "事求人",
"Terms of Service": "服務條款",
"Privacy": "隱私政策",
"eRepublik Laws": "遊戲規則",
"Affiliates": "合作夥伴",

//top
"Extra storage": "額外儲存空間",
"Wellness Box": "體力盒子",
"Guest": "訪客",
"Day": "第 ",
"of the New World": " 天 (新世界)",
"Take the": "只需要",
"tour and find out why it's such a great game" : " 來看看為什麼說這是一款偉大的遊戲",
"4 step" : " 四個步驟",
"It's" : " 絕對",
"Please type in your password" : "請輸入您的密碼",
"Wrong password" : "密碼錯誤",
"login" : "登入",
"Complete the catpcha challenge:" : "請輸入驗證碼：",
"Type the two words" : "請輸入上圖顯示的兩個單字：",
"Incorrect. Try again." : "輸入錯誤，請再次一次。",
"The challenge solution was incorrect." : "您輸入的驗證碼錯誤。",
"Buy Wellness Box" : "購買體力盒子",
"Basic damage" : "基本傷害值",
"for 10 shouts/day and more" : "獲得每天 10 次的發言機會",
"no active battles" : "無進行中的戰役",
"Buy extra storage" : "購買額外空間",
"Buy wellness" : "購買體力",
"days" : "日",
"months" : "月",
"years" : "年",
"online" : "在線",
"Check your unlocked features" : "查看您的已解鎖功能",
"No shouts posted by this citizen yet" : "該公民尚未發表任何言論",
"Fights" : "參與戰爭",
"Total damage:" : "總傷害值：",
"Damage" : "傷害值",
"See all donations" : "查看捐贈列表",
"Show all donations" : "顯示捐贈列表",
"Price with taxes" : "含稅價格",
"Show candidate list" : "顯示候選人名單",
"Show candidates list" : "顯示候選人名單",
"See candidate list" : "查看候選人名單",
"No candidate proposed" : "無候選人被提名",
"Candidate" : "繳交 2G 成為候選人",
"candidates" : "全部候選人",
"be a candidate for congress" : "成為議員候選人",
"You haven't worked today." : "您今天尚未工作",
"You have not worked today." : "您今天尚未工作",
"Skill" : "技能",
"Apply" : "申請",
"You are already an employee. To get this job please quit your current job." : "您目前已經在一家公司就職. 要接受新工作，請您先辭去當前的工作.",
"Work" : "工作",
"Back to company" : "回到公司",
"Back to army" : "回到軍隊",
"You haven't trained today" : "您今天尚未訓練",
"You have not trained today" : "您今天尚未訓練",
"Train" : "訓練",
"Training" : "訓練點數",
"Train bonus" : "訓練獎勵",
"Strength gained" : "獲得力量",
"Show my offers" : "顯示我的報價",
"Post new offer" : "張貼新的報價",
"Exchange rate" : "匯率",
"Job market" : "就業市場",
"Get Wellness" : "購買體力",
"eRepublik Birthday" : "eRepublik 生日",
"Get Extra Storage" : "購買額外空間",
"Show all employees" : "顯示所有員工",
"Show active wars" : "顯示進行中的戰爭",
"Basic productivity" : "基本生產力",
"Total productivity" : "總生產力",
"Work Bonus" : "工作獎勵",
"more events" : "更多事件",
"National" : "國內",
"International" : "國際",
"Top" : "熱門",
"Latest" : "最新",

"Apr" : "四月",

//新增翻譯 By Acedia0915 2010/02/02

"Training grounds" : "訓練場",
"Chat rooms" : "聊天室",
"Featured rooms" : "精選聊天室",
"Join another featured room" : "加入其他精選聊天室",
"Chat rooms created by you" : "自己建立聊天室",
"Be a chat room owner" : "當個聊天室的主人",
"Having your own chat room allows you to administrate the discussions, assign moderators and provide an environment where citizens can socialize, interact and discuss upon the interesting topics of the New World." : "在自己的聊天室裡您具有管理討論，並提供指定主持人的功能，公民可以在新的世界裡，社交、互動和討論有趣的話題。",
"Create chat room" : "創立聊天室",
"My favorite rooms" : "最愛的聊天室",
"Owner" : "擁有者",
"Chat room" : "聊天室名稱",
"Description" : "聊天室描述",
"Copy and post this link on eRepublik forum and articles, or shout it. People that click on it will join the chatroom." : "複製並發布此eRepublik鏈結，在論壇、文章，或留言中。人們透過點擊連結，將直接加入聊天室。",
"Check rankings" : "查看排名",
"Make sure you check the rankings and see what user generated rooms are" : "從查看排名連結，可以看到其他的玩家聊天室，哪個最",
"on fire" : "著火（熱門）",
"Country stats" : "國家統計資料",
"National Chat Room" : "國家聊天室",
"National Goals" : "國家目標",
"Current national goals" : "當前的國家目標",
"The elected president has not set any national goals for this month." : "總統並未設置本月的國家目標",




//"Shouts" : "公民之聲",
"Shout" : "發話",
"Shout something:" : "大喊一聲：",
"Official" : "官方",
"Everyone" : "所有人",
"Daily salary" : "日薪",
"Last presence" : "最後上線",
"Salary / day" : "薪水 / 日",
"Never worked" : "從未工作",
"Today" : "今天",
"Yesterday" : "昨天",
"Minimum country wage :" : "國家最低工資保障:",
"Company page" : "公司頁面",
"Search citizen" : "搜索公民",
"Rec exchange rate" : "參考匯率",
"Sell" : "出售",
"Industry" : "產業",
"Create new company" : "建立新的公司",
"Create company" : "建立公司",
"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to buy additional features within eRepublik." : " eRepublik 中的黃金為遊戲中的虛擬貨幣，僅用於購買 eRepublik 中的額外功能。譯者向您推薦 10€20G",
"Select amount" : "選擇數量",
"Go to eRepublik" : "前往 eRepublik ",
"Citizen fee" : "公民費",
"Gross domestic product (GDP)" : "國內生產毛額 (GDP)",
"Monthly exports" : "月出口量",
"Monthly imports" : "月進口量",
"Inflation" : "通貨膨脹",
"Country President" : "國家元首",
"General" : "總",
"Send message" : "發送消息",
"Add as a friend" : "加為好友",
"Remove friend" : "刪除好友",
"Offer a gift" : "贈送禮物",
"Pending" : "未確定",
"Accepted" : "已通過",
"Rejected" : "己否決",
"ACCEPTED" : "己通過",
"REJECTED" : "己否決",
"You are not a president or a congress member in this country." : "您不是該國的總統或議員。",
"Law proposals" : "法律提案",
"War status" : "戰況",
"Active wars" : "進行中戰爭",
"Ended wars" : "已結束戰爭",
"Countries involved" : "參與國家",
"All countries" : "所有國家",
"Company market" : "公司轉讓",
"Buy" : "購買",
"buy" : "購買",
"Apply" : "申請",
"Show all members" : "顯示所有成員",
"Show results" : "顯示結果",
"Final Results" : "最終結果",
"Member of" : "成員",
"No. of votes" : "獲得選票",
"Total votes" : "總票數",
"You cannot work today because the company does not have enough raw materials for products. We have just sent an alert to the general manager about this issue." : "因該公司的製造所需的原物料不足,導致無法工作.我們已就此事向總經理發出警告訊息",
"Become a citizen" : "註冊賬號",
"It's 100% free and only takes a minute or two" : "100% 免費、每天只需花一、兩分鐘",
"100% free" : "100% 免費",
"and" : " ",
"only takes a minute or two" : "每天只需花一、兩分鐘",
"Enter the new world" : "進入遊戲",
"Citizen name" : "公民名稱",
"Citizen Name" : "公民名稱",
"Investigation Day" : "調查日",
"4-30 characters" : "4-30 個字元",
"Password" : "密碼",
"Retype" : "確認密碼",
"Retype password" : "重新輸入密碼",
"Location" : "所在位置",
"Email must be valid for registration, so do not cheat" : "此Email地址用於註冊遊戲帳號，所以必須真實有效。",
"Birthday" : "生日",
"Gender" : "性別",
"I agree with the" : "我已接受",
"Sign up for the weekly newsletter" : "訂閱每週電子報",
"Please choose your eRepublik citizen name" : "請選擇您的 eRepublik 公民名稱",
"Minimum number of characters is 6" : "最少 6 個字元",
"Please type in a password here" : "請輸入密碼",
"Please retype your password" : "請重新輸入您的密碼",
"Info" : "資訊",
"Congress member candidates" : "議員候選人",
"Back" : "返回",
"Party members can apply for congressional candidature each month between the 16th and 23rd." : "政黨成員可在每月的16日和23日之間申請成為議員候選人",
"Party president should decide the final list each month on the 24th" : "黨主席應於每月24日確定最終的候選人名單",
"Each party can propose a maximum number of 3 candidates per region." : "每個政黨在每個地區最多只能提出3名議員候選人",
"Forgot password?" : "忘記密碼?",
"Remember me" : "記住密碼",
"Land skill" : "開採技能",
"Manufacturing skill" : "製造技能",
"Constructions skill" : "建築技能",
"Debate Area" : "討論地點",
"New" : "最新",
"Old" : "過去",
"Value added tax (VAT)" : "消費稅 (VAT, 公司販賣商品時另扣)",
"Import Tax" : "進口稅",
"Export Tax" : "出口稅",
"The law voting process takes 24 hours." : "法律投票程序需要 24 小時。",
"Only congress members and country presidents have the right to vote." : "只有議員和總統才有資格投票.",
"Show all law proposals" : "顯示所有法律提案",
"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "您可以從政黨頁面加入某一政黨，如果您找不到適合您的政黨，您也可以自己建立一個政黨。成為政黨成員可以使您有機會成為議員，甚至總統。",
"You do not have a newspaper" : "您尚未開辦報紙",
"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "一份報紙是在 eRepublik 的世界中溝通聯絡訊息的最有效途徑。想瞭解更多相關訊息請閱讀 eRepublik 百科。建立您自己的報紙。",
"Weapon" : "武器",
"Items" : "物品",
"Money" : "金錢",
"Drag and drop items from your inventory to the donation area" : "從您的倉庫拖曳要送的物品到捐贈區",
"Your inventory" : "您的倉庫",
"Donation" : "捐贈",
"Minimum Wage" : "最低工資",
"Defense System" : "防禦系統",
"President Impeachment" : "彈劾總統",
"New Citizen Fee" : "新公民安家費",
"Trading Embargo" : "貿易禁運",
"Issue Money" : "發行貨幣",
"Mutual Protection Pact" : "共同防禦條約",
"Peace Proposal" : "停戰協定",
"Declare War" : "宣戰",
"Buy Constructions" : "購買設施",
"All donations" : "捐贈列表",
"My Organizations" : "我的組織",
"Conquer" : "攻下",
"Secure" : "守住",
"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "為了登錄組織帳號，您必須先退出您的公民帳號，然後用您的組織帳號和密碼重新登陸。",
"If your citizen account represents an organization (SO) created in the eRepublik beta version, please send us a message using the Contact form (category: Others) so that we can officially change it to an organization."
: "如果您的公民帳號代表了一個在 eRepublik beta版本中建立的組織(SO)，請通過使用聯繫表格（問題種類：其它）發送給我們相關的情況，以便我們能夠正式地將其更改為組織帳號。",
"After 15th of December 2008 all SO's not transferred to Organizations will be considered fake accounts and will be banned."  : "2008年12月15日以後，所有未轉為組織帳號的的SO帳號將被視為非法帳號並予以封禁。",
"After 5 days the alerts are automatically deleted" : "5 天後系統提示將被自動刪除",
"Select All" : "全選",
"change your location" : "變更您的位置",
"train" : "訓練",
"send initiations to your friends to join eRepublik" : "邀請您的朋友加入 eRepublik",
"Name" : "名字",
"Country" : "國家",
"Experience points" : "經驗值",
"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization" : "Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization",
"There are no offers on the marketplace for this industry" : "There are no offers on the marketplace for this industry",
"Minimum skill" : "最低技能",
"Minimum Skill" : "最低技能",
"You do not have the required skill for this position" : "您沒有這個職位所需的技能",
"Country - Society" : "國家 - 社會",
"There are no discovered resources in this region yet" : "這個地區尚未發現資源",
"You can get wellness from:" : "您可以獲得體力來自: ",
"Defense system" : "防禦系統",
"Select a party" : "選擇政黨",
"to show it's Candidates" : "to show it's Candidates",
"Permanently banned" : "永久性黑名單",
"There are no active battles in this war" : "在這場戰爭裡,沒有進行中的戰事",
"You are now an employee of this company" : "您現在是這家公司的員工",
"Do you agree?" : "您同意嗎？",
"One more thing..." : "再一件事...",
"Complete the captcha challenge in order to prove you are human" : "請輸入驗證碼,防止自動註冊.",
"War > Battlefield" : "戰爭 > 戰場",
"Weak fight, Private!" : "戰績黯淡，一等兵！",
"Weak fight, Corporal!" : "戰績黯淡，下士！",
"Weak fight, Sergeant!" : "戰績黯淡，上士！",
"Weak fight, Lieutenant!" : "戰績黯淡，少尉！",
"Weak fight, Captain!" : "戰績黯淡，上尉！",
"Weak fight, Colonel" : "戰績黯淡，上校！",
"Weak fight, General" : "戰績黯淡，上將！",
"Weak fight, Field Marshal!" : "戰績黯淡，元帥！",
"Good fight, Private!" : "戰績不錯，一等兵！",
"Good fight, Corporal!" : "戰績不錯，下士！",
"Good fight, Sergeant!" : "戰績不錯，上士！",
"Good fight, Lieutenant!" : "戰績不錯，少尉！",
"Good fight, Captain!" : "戰績不錯，上尉！",
"Good fight, Colonel" : "戰績不錯，上校！",
"Good fight, General" : "戰績不錯，上將！",
"Good fight, Field Marshal!" : "戰績不錯，元帥！",
"Weapon quality" : "武器質量",
"You do not have any active job offers" : "目前沒有職位空缺",
"National Rank" : "全國排名",
"Forfeit Points:" : "違規點數",
"Unlock Features" : "解鎖全部功能",
"Continue" : "繼續",
"Experience level" : "經驗等級",
"A taste of what you can do in eRepublik" : "您可以在 eRepublik 經歷的全部過程",

"Hard worker" : "模範員工",
"economics" : "經濟",
"politics" : "政治",
"military" : "軍事",
"media" : "媒體",
"manager" : "經理",
"Recruit" : "招募",
"Soldier" : "士兵",
"Super Soldier" : "超級大兵",
"Ranked" : "上級",
"soldier" : "士兵",
"Battle Hero" : "戰爭英雄",
"Resistance" : "抗戰",
"leader" : "領袖",
"Resistance Hero" : "抗戰英雄",
"Society" : "社會",
"Society Builder" : "社交巨擘",
"Voter" : "選民",
"Party Member" : "黨員",
"Parlament candidate" : "議會候選人",
"Congress Member" : "議員",
"Party president candidate" : "黨主席候選人",
"Party founder" : "創黨元老",
"President candidate" : "總統候選人",
"Country<br /> President" : "國家元首",
"Media Mogul" : "媒體大亨",
"You have succesfully edited your profile" : "您已成功修改個人資料",
"All industries" : "所有產業",
"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "每個您邀請的公民達到Lv6 時,您將獲得5枚黃金的獎勵.",
"Your name:" : "您的名字：",
"Your friend's email:" : "您朋友的電子郵件地址：",
"Use commas to separate multiple email addresses" : "用逗號分隔每個電子郵件地址",
"Add from adress Book" : "從通訊錄加入",
"Send invitation" : "發送邀請",
"Invites sent:" : "邀請已發送：",
"Please type your friend email address" : "請輸入您朋友的電子郵件地址",
"Your friendship request has been sent." : "您的好友要求已發送。",
"No activity" : "沒有活動",
"You can login and start playing. Have fun!" : "您可以登入並開始遊玩了，祝您玩的愉快！",
"Click here to login now" : "按這裡登入",
"Remember me" : "記住我",
"Not a citizen yet?" : "還沒成為公民？",
"Take the tour" : "遊戲預覽",
"Join now" : "立即註冊",
"It's free" : "免費",
"Login" : "登入",
"My places > Company" : "公司",
"You do not have a job" : "您目前沒有工作",
"Find a job or own a company. Having a job will allow you to get a salary each day you go to work (don't worry, in eRepublik it is much more fun and faster to go to work than in real life)." : "尋找工作或自己建立一家公司.您每天工作的時候都會得到薪水(別擔心,在 eRepublik 裡工作遠比現實中輕鬆愉快.",
"Find a job" : "尋找工作",
"Own a company" : "購買公司!",
"Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt." : "Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt.",
"Conquest wars" : "征服戰爭",
"Resistance wars" : "起義戰爭",
"Lieutenant" : "少尉",
"Captain" : "上尉",
"Colonel" : "上校",
"Field Marshall" : "元帥",
"Field Marshal" : "元帥",
"You do not have the necessary amount of Gold to start a resistance war." : "You do not have the necessary amount of Gold to start a resistance war.",
"Start a Resistance War" : "發動起義戰爭",
"Please enter a valid amount value with at most 2 decimals." : "請輸入一個有效的價值數額至多兩位數.",
"The company cannot trade with this country due to a trade embargo decided by Congress." : "The company cannot trade with this country due to a trade embargo decided by Congress.",
"The company offers no products in this market" : "該公司目前未向市場提供任何產品",
"News" : "新聞",
"more news" : "更多新聞",
"Supporting parties" : "支持政黨",
"% of votes" : "得票比例",
"Presidential candidates" : "總統候選人",
"No candidates applied yet" : "尚無候選人申請",
"Badges" : "徽章",
"RSS Feed" : "RSS 消息來源",
"Debates concerning economic activities." : "Debates concerning economic activities.",
"Sharing opinions concerning social interactions." : "Sharing opinions concerning social interactions.",
"The place for those who are interested in political activities." : "The place for those who are interested in political activities.",
"Keeping in touch with other citizen regarding the eRepublik warfare." : "Keeping in touch with other citizen regarding the eRepublik warfare",
"Discussions" : "討論",
"Help" : "說明",
"Contracts" : "合同",
"Rules" : "規則",
"Guidelines for a better New World." : "Guidelines for a better New World",
"Suggestions" : "建議",
"Imagination is the only limit for changing the future." : "Imagination is the only limit for changing the future",
"Open letters" : "開啟信件",
"Contests" : "Contests",
"Announcements" : "公告",
"Buy or sell companies" : "買賣公司",
"Topics" : "主題",
"Posts" : "Posts",
"Last Message" : "最新訊息",
"The New World" : "新世界",
"Join party" : "加入政黨",
"Congratulations, you are now a party member! " : "恭喜，您是該黨的黨員了！",
"Create newspaper" : "建立報紙",
"Requirements" : "要求",
"Cost" : "費用",
"Newspaper details" : "報紙訊息",
"Newspaper name" : "報紙名稱",
"Newspaper Avatar" : "報紙標誌",
"only JPG files allowed" : "只允許JPG格式",
" Create " : "建立",
"Your account" : "您的帳戶",
"Organizations created by you:" : "您建立的組織:",
"You have not created any organization yet." : "您尚未建立任何組織.",
"Create organization" : "建立組織",
"Organization details" : "組織訊息",
"Organization name" : "組織名稱",
"Organization logo" : "組織標誌",
"Your email address:" : " 您的Email地址:",
"eRepublik region" : "選擇地區",
"Complete the challenge:" : "請輸入驗證碼:",
"Register" : "註冊",
"Countries" : "國家",
"Companies" : "公司",
"Parties" : "政黨",
"Newspapers" : "報紙",
"Sales" : "銷售",
"Subscribers" : "訂閱讀者",
"Region" : "地區",
"All regions" : "所有地區",
"Sort by" : "排序",
"No. of Employees" : "員工人數",
"Top Citizens" : "公民排行榜",
"Top Companies" : "企業排行榜",
"Top Countries" : "國家排行榜",
"Top countries in eRepublik" : " eRepublik 國家排行榜",
"top countries in eRepublik" : " eRepublik 國家排行榜",
"What's happening in eRepublik?" : " eRepublik 每日要聞",
"more discussions" : "更多討論",
"Top Parties" : "政黨列表",
"Top News" : "熱門新聞",
"( Average Experience )" : "( 平均經驗 )",
"Population number" : "人口數量",
"Unemployment rate" : "失業率",
"Exports" : "出口",
"Imports" : "進口",
"No. of companies" : "公司數量",
"No. of newspapers" : "報紙數量",
"GDP" : "國內生產毛額",
"No citizen found that match your criteria." : "找不到相符的公民。",
"Select industry" : "選擇產業",
"Top rated news" : "熱門新聞",
"Latest news" : "最新新聞",
"Latest events" : "最新事件",
"Skip" : "忽略",
"eRepublik Shop" : "eRepublik 商城",
"Wiki" : "遊戲百科",
"Blog" : "官方部落格",
"Make changes" : "進行變更",
"Company for sale" : "出售公司",
"Fire" : "解雇",
"Finances" : "財政",
"Buy raw materials" : "購買原物料",
"Donate raw materials" : "捐贈原物料",
"Update" : "升級",
"Remove" : "移除",
"Buy market license" : "購買市場許可證",
"Add a job offer" : "新增職位",
"Edit details" : "編輯詳情",
"Sell company" : "出售公司",
"Your offer was removed" : "Your offer was removed",
"Newer" : "上一頁",
"Older" : "下一頁",
"new comment" : "新的評論",
"Show proposed members of congress" : "顯示議員提案",
"Winner" : "當選者",
"One" : "One",
"Buy food!" : "購買食物！",
"No food means starvation. Hurry up and buy some." : "沒有食物會餓死，趕快去買些吃的吧。",
"has conquered this region" : "已佔領此地區",
"has secured this region" : "已守住此地區",
"Tax change: Moving Tickets" : "稅率變更：機票",
"Tax change: Food" : "稅率變更：食物",
"Tax change: Iron" : "稅率變更：鋼鐵",
"Tax change: Defense System:" : "稅率變更：防禦系統",
"Tax change: Weapon" : "稅率變更：武器",
"Tax change: Gift" : "稅率變更：禮品",
"Tax change: Grain" : "稅率變更：穀物",
"Proposed by" : "提案人：",
"I have nothing more to say at the moment" : "我暫時沒有任何話要說",
"I have something to say" : "我有話要說",
"Show proposed members" : "顯示參選議員",
"of congress" : "的候選人",
"Resign Candidacy" : "退出議員競選",
"Edit Presentation" : "編輯競選演說",
"Presentation" : "競選演說",
"Edit Presentation" : "編輯競選演說",
"No presentation" : "尚無競選演說",
"Citizens" : "公民",
"Yes" : "贊成",
"No" : "反對",
"Partial Results" : "部份結果",
"Official candidates" : "正式候選人",
"Wildcards" : "外卡",
"Not qualified" : "未當選",

//place name
"Anhui" : "安徽",
"Beijing" : "北京",
"Hainan" : "海南",
"Henan" : "河南",
"Inner Mongolia" : "內蒙古",
"Jammu and Kashmir" : "查謨和克什米爾",
"Jiangsu" : "江蘇",
"Ningxia" : "寧夏",
"Shandong" : "山東",
"Shanghai" : "上海",
"Tibet" : "西藏",
"Yunnan" : "雲南",
"Argentine Northwest" : "阿根廷西北部",
"Cuyo" : "庫約",
"Gran Chaco" : "大廈谷",
"Pampas" : "潘帕斯",
"Patagonia" : "巴塔哥尼亞",
"Orissa" : "奧裡薩邦",
"Tamil Nadu" : "泰米爾納德邦",
"Alentejo" : "阿連特茹",
"Algarve" : "阿爾加威",
"Azores" : "亞速爾群島",
"Centro" : "中部",
"Lisboa" : "里斯本",
"Madeira" : "馬德拉",
"Norte" : "波爾圖",
"New South Wales" : "新南威爾士",
"Northern Territory" : "北領地",
"Queensland" : "昆士蘭",
"Victoria" : "維多利亞",
"Andhra Pradesh" : "安得拉邦",
"Chhattisgarh" : "恰蒂斯加爾邦",
"Chongqing" : "重慶",
"East Siberian Region" : "東西伯利亞",
"Fujian" : "福建",
"Gansu" : "甘肅",
"Guangdong" : "廣東",
"Guangxi" : "廣西",
"Guizhou" : "貴州",
"Gujarat" : "古吉拉特邦",
"Hubei" : "湖北",
"Hunan" : "湖南",
"Java" : "爪哇",
"Jiangxi" : "江西",
"Kalimantan" : "加裡曼丹",
"Karnataka" : "卡納塔克邦",
"Kerala" : "卡拉拉邦",
"Lesser Sunda Islands" : "小巽它群島",
"Madhya Pradesh" : "中央邦",
"Maharashtra" : "馬哈拉施特拉邦",
"Maluku islands" : "馬魯古群島",
"North-East India" : "印度東北部",
"Papua" : "巴布亞新幾內亞",
"Punjab" : "旁遮普",
"Qinghai" : "青海",
"Rajasthan" : "拉賈斯坦邦",
"Shaanxi" : "陝西",
"Shanxi" : "山西",
"Sichuan" : "四川",
"Sindh" : "信德文",
"South Australia" : "南澳洲",
"Sulawesi" : "蘇拉威西",
"Sumatra" : "蘇門答臘島",
"Tasmania" : "塔斯馬尼亞",
"West Siberian Region" : "西西伯利亞",
"Western Australia" : "西澳洲",
"Western Cape" : "西開普",
"Xinjiang" : "新疆",
"Zhejiang" : "浙江",
"Banat" : "巴納特",
"Bassarabia" : "比薩拉比亞",
"Bucovina" : "布科維納",
"Chisinau" : "基希訥烏",
"Crisana" : "克裡沙納",
"Dobrogea" : "多布羅加",
"Maramures" : "馬拉穆列什",
"Moldova" : "摩爾多瓦",
"Muntenia" : "蒙特尼亞",
"Oltenia" : "歐達尼亞",
"Southern Basarabia" : "南比薩拉比亞",
"Transilvania" : "川西凡尼亞",
"Urals Region" : "烏拉爾地區",
"Styria" : "思提瑞亞",
"Balochistan" : "俾路支省",
"Bihar" : "比哈爾邦",
"Esfahan" : "伊斯法罕",
"Fars" : "法爾斯",
"Heilongjiang" : "黑龍江",
"Hormozgan" : "霍爾木茲甘",
"Jharkhand" : "加爾克漢德邦",
"Jilin" : "吉林",
"Kerman Province" : "克爾曼省",
"Liaoning" : "遼寧",
"North India" : "北印度",
"North Region" : "北方地區",
"North-West Frontier Province" : "西北邊境省",
"Northwest Region" : "西北地區",
"Razavi Khorasan" : "拉扎維.呼羅珊",
"Semnan" : "塞姆南",
"Sistan and Baluchistan" : "錫斯坦和俾路支斯坦省",
"South Khorasan" : "南呼羅珊",
"Southwest Region" : "西南地區",
"Uttar Pradesh" : "北方邦",
"West Bengal" : "西孟加拉國邦",
"Yazd" : "雅茲德",
"Far Eastern Region" : "遠東地區",
"Kaliningrad Region" : "卡裡寧格勒州",
"North Caucasus Region" : "北高加索地區",
"Northern Region" : "北部地區",
"Volga-Vyatka Region" : "伏爾加-維亞特經濟區",
"Cork and Kerry" : "科克和克裡",
"Dublin" : "都柏林",
"South Serbia" : "南塞爾維亞",
"Sumadija" : "舒馬迪亞",
"Brčko District" : "布爾奇科",
"Federation of Bosnia and Herze" : "波斯尼亞和黑塞哥維那",
"Singapore City" : "新加坡市",
"Eastern Cape" : "東開普省",
"KwaZulu-Natal" : "誇祖魯",
"Mesopotamia" : "美索不達米亞",
"Northern Cape" : "北開普省",
"Abruzzo" : "阿布魯佐",
"Aosta Valley" : "奧斯塔山谷",
"Apulia" : "阿普利亞",
"Basilicata" : "巴西利卡塔",
"Calabria" : "卡拉布裡亞",
"Campania" : "坎帕尼亞",
"Emilia-Romagna" : "艾米利亞—羅馬涅",
"Lazio" : "拉齊奧",
"Liguria" : "利古裡亞",
"Marche" : "馬爾凱",
"Molise" : "莫利塞",
"Piedmont" : "皮埃蒙特",
"Salzburg" : "薩爾茨堡",
"Sardinia" : "撒丁島",
"Sicily" : "西西里島",
"Trentino-South Tyrol" : "特倫蒂諾-上阿迪傑",
"Tuscany" : "托斯卡納",
"Tyrol" : "蒂羅爾州",
"Umbria" : "翁布裡亞",
"Veneto" : "威尼托",
"Bratislava Region" : "布拉提斯拉瓦州",
"Burgas" : "布爾加斯",
"Plovdiv" : "普羅夫迪夫",
"Ruse" : "魯塞",
"Sofia" : "索菲亞",
"Varna" : "瓦爾納",
"Vidin" : "維丁",
"Chubu"  : "丘布特",
"Chugoku" : "中國",
"Chungcheongbuk-do" : "忠清北道",
"Gangwon-do" : "江原道",
"Gyeongsangbuk-do" : "慶尚北道",
"Hokkaido" : "北海道",
"Jeju" : "濟州",
"Jeollabuk-do" : "全羅北道",
"Jeollanam-do" : "全羅南道",
"Kanto" : "京都",
"Kinki" : "近畿",
"Kyushu" : "九州島",
"Shikoku" : "四國",
"Tohoku" : "東北",
"Carinthia" : "克恩頓州",
"Inner Carniola" : "卡爾尼奧拉",
"Alberta" : "亞伯達",
"British Columbia" : "不列顛哥倫比亞",
"Manitoba" : "曼尼托巴",
"New Brunswick" : "新伯倫瑞克省",
"Newfoundland and Labrador" : "紐芬蘭-拉布拉多",
"Nova Scotia" : "新斯科細亞省",
"Nunavut" : "努勒維特",
"Ontario" : "安大略",
"Prince Edward Island" : " 愛德華王子島",
"Quebec" : "魁北克",
"Saskatchewan" : "薩斯喀徹溫",
"Yukon" : "育空",
"Gauteng" : "豪登省",
"Limpopo" : "林波波省",
"Mpumalanga" : "姆普馬蘭加",
"Chungcheongnam-do" : "忠清南道",
"Gyeonggi-do" : "京畿道",
"Gyeongsangnam-do" : "慶尚南道",
"Peninsular Malaysia" : "馬來半島",
"Sabah" : "沙巴",
"Sarawak" : "沙撈越",
"Andalucia" : "	安達魯西亞",
"Aragon" : "阿拉貢",
"Asturias" : "阿斯圖裡亞斯",
"Balearic Islands" : "巴利阿里群島",
"Basque Country" : "巴斯克地區",
"Canary Islands" : "加那利群島",
"Cantabria" : "坎塔布利亞",
"Castilla La Mancha" : "卡斯蒂利亞-拉曼查",
"Castilla y Leon" : "卡斯蒂利亞-萊昂",
"Catalonia" : "加泰羅尼亞",
"Extremadura" : "埃斯特雷馬杜拉",
"Galicia" : "加利西亞",
"La Rioja" : "拉裡奧哈",
"Madrid" : "馬德里",
"Murcia" : "穆爾西亞",
"Navarra" : "納瓦拉",
"Oaxaca" : "瓦哈卡",
"Valencian Community" : "瓦倫西亞",
"Baja" : "巴哈",
"The Central Highlands" : "中部高原",
"The Gulf" : "墨西哥灣",
"The Pacific Coast" : "太平洋沿岸",
"Bohus" : "布胡斯",
"Gotaland" : "哥得蘭",
"Gotland" : "哥特蘭島",
"Jamtland Harjedalen" : "耶姆特蘭和海裡耶達倫",
"Midtjylland" : "米迪蘭特",
"Nordjylland" : "北日德蘭",
"Norrland and Sameland" : "諾蘭德和薩米",
"Scania" : "斯堪尼亞",
"Smaland" : "斯馬蘭德",
"Svealand" : "斯韋阿蘭",
"Syddanmark" : "南丹麥",
"Moravia" : "摩拉維亞",
"Northern Bohemia" : "北波希米亞",
"Southern Bohemia" : "南波希米亞",
"Transnistria" : "德涅斯特",
"Sjaelland" : "西蘭島",
"Brussels-Capital Region" : "布魯塞爾首都區",
"Flemish Region" : "佛蘭芒區",
"Walloon Region" : "瓦隆區",
"Central Thailand" : "泰國中部",
"Eastern Thailand" : "泰國東部",
"North-Eastern Thailand" : "泰國東北部",
"Northern Thailand" : "泰國北部",
"Southern Thailand" : "泰國南部",
"Pohja-Eesti" : "波赫亞-愛沙尼亞",
"Chagang" : "慈江",
"Hamgyong" : "鹹鏡",
"Hwangae" : "黃海",
"Kangwon" : "江原道",
"Pyong" : "平壤",
"Ryanggang" : "兩江道",
"Aegean Islands" : "愛琴海島嶼",
"Aegean Region" : "愛琴海區",
"Attica" : "阿提卡",
"Black Sea Region" : "黑海地區",
"Central Anatolia Region" : "安納托利亞中部地區",
"Crete" : "克里特島",
"Eastern Anatolia Region" : "安納托利亞東部地區",
"Epirus" : "伊皮魯斯",
"Haifa district" : "海法區",
"Ionian Islands" : "愛奧尼亞群島",
"Jerusalem district" : "耶路撒冷區",
"Macedonia" : "馬其頓",
"Marmara Region" : "馬爾馬拉地區",
"Mediterranean Region" : "地中海地區",
"Peloponnese" : "伯羅奔尼薩半島",
"Southeastern Anatolia Region" : "東南安納托利亞地區",
"Thessaly" : "塞薩利",
"Aland" : "奧蘭群島",
"Eastern Finland" : "東芬蘭",
"Lapland" : "拉普蘭",
"Leningrad Oblast" : "列寧格勒州",
"Moscow Region" : "莫斯科地區",
"Nord-Norge" : "北諾爾格",
"Oulu" : "奧盧",
"Southern Finland" : "芬蘭南部",
"Western Finland" : "芬蘭西部",
"Ostlandet" : "東挪威",
"Sorlandet" : "南挪威",
"Svalbard & Jan Mayen" : "斯瓦爾巴群島和揚馬延",
"Trondelag" : "德拉格",
"Vestlandet" : "西挪威",
"Sloboda" : "斯洛波達",
"Volhynia" : "沃裡尼亞",
"Alsace" : "阿爾薩斯",
"Aquitaine" : "阿奎坦",
"Auvergne" : "奧弗涅",
"Brittany" : "布列塔尼",
"Burgundy" : "勃艮第",
"Champagne-Ardenne" : "香檳-阿登",
"Corsica" : "科西嘉",
"Franche-comte" : "弗朗什孔泰",
"Languedoc-Roussillon" : "朗格多克-魯西永",
"Limousin" : "利穆贊",
"Lorraine" : "洛林",
"Lower-Normandy" : "下諾曼底",
"Midi-Pyrenees" : "比利牛斯",
"North-Calais" : "北加萊",
"Pays-de-la-Loire" : "盧瓦爾河區",
"Picardy" : "庇卡底",
"Poitou-Charentes" : "普瓦圖-夏朗德",
"Provence-Alpes-Azur" : "普羅旺斯及藍色海岸",
"Rhone-Alps" : "羅納-阿爾卑斯",
"Upper-Normandy" : "上諾曼底",
"East Midlands" : "東米德蘭茲",
"East of England" : "東英格蘭",
"London" : "倫敦",
"Northern Ireland" : "北愛爾蘭",
"Scotland" : "蘇格蘭",
"Wales" : "威爾斯",
"West Midlands" : "西米德蘭茲",
"Yorkshire & Humberside" : "約克郡和亨伯",
"Baden-Wurttemberg" : "巴登-符騰堡州",
"Bavaria" : "巴伐利亞",
"Brandenburg" : "布蘭登堡",
"Hesse" : "黑森",
"Lower Saxony" : "下薩克森",
"Mecklenburg-Western Pomerania" : "梅克倫堡-前波美拉尼亞州",
"North Rhine-Westphalia" : "北威州",
"Rhineland-Palatinate" : "萊茵蘭-巴拉丁",
"Saarland" : "薩爾蘭",
"Saxony" : "薩克遜",
"Saxony-Anhalt" : "薩克遜-安哈爾特",
"Schleswig-Holstein" : "什列斯威-霍爾斯坦",
"Thuringia" : "圖林根",
"Vorarlberg" : "福拉爾貝格州",
"Luzon" : "呂宋",
"Mindanao" : "棉蘭老島",
"Palawan" : "巴拉望",
"Visayas" : "維薩亞斯",
"Alabama" : "阿拉巴馬州",
"Alaska" : "阿拉斯加州",
"Arizona" : "亞利桑那州",
"Arkansas" : "阿肯色州",
"California" : "加利福尼亞州",
"Colorado" : "科羅拉多州",
"Connecticut" : "康涅狄格州",
"Delaware" : "特拉華州",
"District of Columbia" : "哥倫比亞特區",
"Florida" : "佛羅里達州",
"Georgia" : "喬治亞",
"Hawaii" : "夏威夷",
"Idaho" : "愛達荷州",
"Illinois" : "伊利諾伊州",
"Indiana" : "印第安納州",
"Iowa" : "愛荷華州",
"Kansas" : "堪薩斯州",
"Kentucky" : "肯塔基州",
"Louisiana" : "路易斯安那州",
"Maine" : "緬因州",
"Maryland" : "馬里蘭州",
"Massachusetts" : "馬薩諸塞州",
"Michigan" : "密歇根州",
"Minnesota" : "明尼蘇達州",
"Mississippi" : "密西西比州",
"Missouri" : "密蘇里州",
"Montana" : "蒙大拿州",
"Nebraska" : "內布拉斯加州",
"Nevada" : "內華達州",
"New Hampshire" : "新罕布什爾州",
"New Jersey" : "新澤西州",
"New Mexico" : "新墨西哥州",
"New York" : "紐約州",
"North Carolina" : "北卡羅來納州",
"North Dakota" : "北達科他州",
"Ohio" : "俄亥俄州",
"Oklahoma" : "俄克拉何馬州",
"Oregon" : "俄勒岡州",
"Pennsylvania" : "賓夕法尼亞州",
"Rhode Island" : "羅得島州",
"South Carolina" : "南卡羅來納州",
"South Dakota" : "南達科他州",
"Tennessee" : "田納西州",
"Texas" : "得克薩斯州",
"Utah" : "猶他州",
"Vermont" : "佛蒙特州",
"Virginia" : "弗吉尼亞州",
"Washington" : "華盛頓",
"West Virginia" : "西弗吉尼亞州",
"Wisconsin" : "威斯康星州",
"Wyoming" : "懷俄明州",
"Thrace" : "色雷斯",
"Great Poland" : "大波蘭區",
"Little Poland" : "小波蘭",
"Mazovia" : "馬佐維亞",
"Pomerania" : "波美拉尼亞",
"Silesia" : "西裡西亞",
"Subcarpathia" : "喀爾巴阡山省",
"Andean" : "安第斯",
"Guayana" : "圭亞那",
"Llanos" : "拉諾斯",
"Bukovina" : "布科維納",
"Burgenland" : "布爾根蘭州",
"Central Hungary" : "匈牙利中部",
"Central Transdanubia" : "中特蘭斯達努比亞",
"Western Transdanubia" : "西特蘭斯達努比亞",
"Dnipro" : "迪尼普",
"Donbas" : "頓巴斯",
"Northern Basarabia" : "北比薩拉比亞",
"Northern Hungary" : "匈牙利北部",
"Podolia" : "波多里亞",
"Siveria" : "西伯利亞",
"Volga Region" : "伏爾加地區",



	


// menu
	"Home" : "首頁",
	"Donate" : "捐贈",
	"Rank"   : "軍階",
	"Company" : "公司", 
	"Profile" : "個人", 
	"Party" : "政黨", 
	"Newspaper" : "報紙",
	"Army" : "軍隊",
	"Country administration" : "國家管理",
	"Country Administration" : "國家管理",
	"Organizations" : "組織",
	"Market place" : "市場",
	"Monetary market" : "外匯市場",
	"Human Resources" : "人力資源",
	"Companies for sale" : "公司轉讓",
	"Get Gold &amp; Extras" : "購買黃金",
	"Rankings" : "玩家排名",
	"Social stats" : "社會狀況",
	"Economic stats" : "經濟狀況",
	"Political stats" : "政治狀況",
	"Military stats" : "軍事狀況",
	"Tools" : "網頁工具",
	"Forum" : "遊戲論壇",
	"News" : "新聞",
	"Invite friends" : "邀請朋友",
	"Career path" : "職業發展",
	"Ok, thanks, next tip" : "ok, 感謝, 下個提示",
	"Select" : "選擇",
	"Marketplace" : "購物市場",
	"Wars" : "戰爭",


// country page
	"On the Map" : "查看地圖",
    "Interactive Map" : "互動地圖",
	"Total citizens" : "公民總數",
	"New citizens today" : "今日新公民",
	"Average citizen level" : "平均公民等級",
	"Online now": "正在線上",
	"Citizens" : "公民",
	"Who" : "誰",
	"details" : "詳細資訊",
	"Society" : "社會",
	"Economy" : "經濟",
	"Politics" : "政治",
	"Military" : "軍事",
	"Administration" : "國家管理",
	
// countries
	"Argentina" : "阿根廷",
	"Australia" : "澳大利亞",
	"Austria" : "奧地利",
	"Bosnia and Herzegovina" : "波士尼亞與赫塞哥維納",
	"Brazil" : "巴西",
	"Bulgaria" : "保加利亞",
	"China" : "中國",
	"Croatia" : "克羅埃西亞",
	"Canada" : "加拿大",
	"Czech Republic" : "捷克共和國",
	"Denmark" : "丹麥",
	"Estonia" : "愛沙尼亞",
	"Finland" : "芬蘭",
	"France" : "法國",
	"Germany" : "德國",
	"Greece" : "希臘",
	"Hungary" : "匈牙利",
	"Indonesia" : "印尼",
	"Ireland" : "愛爾蘭",
	"Israel" : "以色列",
	"Italy" : "義大利",
	"Iran" : "伊朗",
	"Japan" : "日本",
	"Latvia" : "拉脫維亞",
	"Lithuania" : "立陶宛",
	"Malaysia" : "馬來西亞",
	"Mexico" : "墨西哥",
	"Netherlands" : "荷蘭",
	"Norway" : "挪威",
	"Pakistan" : "巴基斯坦",
	"Philippines" : "菲律賓",
	"Poland" : "波蘭",
	"Portugal" : "葡萄牙",
	"Romania" : "羅馬尼亞",
	"Serbia" : "塞爾維亞",
	"Singapore" : "新加坡",
	"South Africa" : "南非",
	"South Korea" : "韓國",
	"Slovakia" : "斯洛伐克",
	"Slovenia" : "斯洛維尼亞",
	"Switzerland" : "瑞士",
	"Spain" : "西班牙",
	"Sweden" : "瑞典",
	"Russia" : "俄羅斯",
	"Thailand" : "泰國",
	"United Kingdom" : "英國",
	"Ukraine" : "烏克蘭",
	"USA" : "美國",
	"Turkey" : "土耳其",
    "India" : "印度",
    "Belgium" : "比利時",
    "Chile" : "智利",
	"North Korea" : "北韓",
	"Venezuela" : "委內瑞拉",
	"World" : "世界",
	"North Korea" : "北韓",
	"Colombia" : "哥倫比亞",
	"Bolivia" : "玻利維亞",
	"Paraguay" : "巴拉圭",
	"Peru" : "秘魯",
	"Uruguay" : "烏拉圭",
	"Republic of Moldova ": "摩爾多瓦共和國",

// economy
	"GOLD" : "黃金",
	"Gold" : "黃金",
	"Treasury" : "國庫",
	"All accounts" : "所有帳戶",
	"Country trading embargoes" : "貿易禁運",
	"Taxes" : "稅率",
	"food" : "食物",
	"gift" : "禮物",
	"weapon" : "武器",
	"moving tickets" : "機票",
	"Moving tickets" : "機票",
	"grain" : "穀物",
	"diamonds" : "鑽石",
	"iron" : "鋼鐵",
	"oil"  : "石油",
	"wood" : "木材",
	"house" : "房屋",
	"hospital" : "醫院",
	"defense system" : "防禦系統",
    "CNY" : " 人民幣",
	"Salary" : "薪水",
	"Minimum" : "最低",
	"Average" : "平均",
		
// company
	"Office" : "辦公室",
	"You have already worked today." : "您今天已經工作過了。",
	"Come back tomorrow." : "請明天再來吧。",
	"Resign" : "辭職",
	"Employees" : "員工",
	"Raw materials" : "原物料",
	"See all employees" : "查看所有員工",
	"Go to marketplace" : "前往購物市場",
	"Products" : "產品",

	"Grain" : "穀物",
	"Food" : "食物",
	"Gift" : "禮物",
	"Weapon" : "武器",
	"Moving Tickets" : "機票",
	"Diamonds" : "鑽石",
	"Iron" : "鋼鐵",
	"Oil"  : "石油",
	"Wood" : "木材",
	"House" : "房屋",
	"Hospital" : "醫院",
	"Defense System" : "防禦系統",
// market
	// market
	"Quality Level" : "品質等級",
	"All levels" : "全部",
	"Level 1" : "1 級",
	"Level 2" : "2 級",
	"Level 3" : "3 級",
	"Level 4" : "4 級",
	"Level 5" : "5 級",

	"Provider" : "供貨公司",
	"Quality" : "質量等級",
	"Stock" : "庫存",
	"Buy" : "購買",
	"Market" : "市場",

	"Market offers" : "市場報價",
	"Amount" : "數量",
	"Price" : "價格",
	"Next" : "下一頁",
	"Prev" : "前一頁",
	"No products in this market" : "沒有任何產品在這個市場上",
	// "Go to marketplace" : "前往購物市場",
	"Jobs available in this company" : "該公司的職位空缺",
	"You don't have any active job offers" : "You don't have any active job offers",
	"You didn't specify the amount of products you wish to buy" : "您還沒有指定您想買多少",
	"You cannot trade with this country as you are at war with it" : "無法跟交戰國家進行交易",

// region
	"Heal" : "治療",
	"Constructions": "建築",
	"Population": "人口",
	"Productivity" : "生產力",
	"Resistance War" : "起義戰爭",
	"Resistance War Active" : "進行中的起義戰爭",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "您不能在這個地區發動起義,該地區已屬於其原有的國家",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "您不能在這個地區發動起義戰爭,該地區已屬於其原有的國家.",
	"Medium" : "中",
	"High": "高",
	"Neighbors" : "鄰國",
// marketplace
	"Please select an Industry to see the marketplace offers" :	"請選擇產業來查看購物市場的產品",
	"Skill Level" : "技能等級",
	"All skills" : "全等級",
	"All" : "全部",
// politics
	"President" : "總統",
	"Congress" : "國會",
// wars
	"no allies" : "沒有盟國",
	"All wars" : "所有戰爭",
	"All resistance wars" : "所有起義戰爭",
	"All Alliances" : "所有盟國",
	"Alliances" : "盟國",
	"Military force" : "軍隊",
	"Average strength" : "平均力量",
// army
	
	"You have trained today. You can train again tomorrow." : "您今天已經訓練過了，明天再來吧。",
	"My strength" : "我的力量",
	"Force" : "實力",
	"Military rank" : "軍階",
	"Military achievements" : "軍事成就",
	"Active wars list" : "進行中的戰爭列表",
	"Sergeant" : "上士",
	"Corporal" : "下士",
	"Private" : "一等兵",

	"There are no resistance wars in this country." : "該國家沒有任何起義戰爭。",
    "This country has no allies." : "這個國家沒有任何盟國",
    "This country is not involved in any war." : "沒有參與任何戰役",
	"until the region can be occupied or secured" : "決定該地區被佔領或被守住的期限",
	"Attackable on President's decision" : "由總統決定是否進攻",
	"Defense Points" : "防禦點數",
	"Go to Battlefield" : "到戰場",
	"see finished battles" : "查看已結束的戰役",
	"show finished battles" : "顯示已結束的戰役",
	"Wars list" : "戰爭列表",
	"War" : "戰爭",
	"Battle history" : "戰役歷史記錄",
	"Fight" : "戰鬥",
	"Hero" : "英雄",
	"started by" : "發起者",
	"Still active" : "仍在進行中",
		
	"Fight for resistance" : "為起義軍而戰",
	"Fight for defenders" : "為政府軍而戰",
	"No." : "編號",


// party
	"You are not a member of a party" : "您目前並非政黨成員",
	"Join a party" : "加入政黨",
	"Create new" : "建立新的",
	"Join" : "加入",
	"See all members" : "查看所有成員",
	"Donate Gold" : "捐贈黃金",
	"Members"  : "成員",
	"Orientation" : "傾向",
	"Far-left" : "極左派",
	"Far-right" : "極右派",
	"Center-left" : "中間偏左派",
	"Center-right" : "中間偏左派",
	"Center" : "中間派",
	"Libertarian" : "自由意志主義",
	"Totalitarian" : "極權主義",
	"Anarchist" : "無政府主義",
	"Authoritarian" : "威權主義",

	
	"Accounts" : "帳戶",
	"Election" : "選舉",
	"Elections" : "選舉",
	"Election results" : "選舉結果",
	"Next elections" : "下次選舉",
	"Next elections in" : "下次選舉：",
	"Next election in" : "下次選舉：",

	"Country Presidency" : "國家元首",
	"Country presidency" : "國家元首",
	"Party Presidency" : "黨主席",
	"Party presidency" : "黨主席",
	"Party President" : "黨主席",
	"See results" : "查看結果",
	"Expires tomorrow" : "明日到期",
	
	"Presidential elections" : "總統選舉",
	"Congressional elections" : "議員選舉",
	"Party elections" : "黨主席選舉",

// Create party

	"Create party" : "建立政黨",
	"Party details" : "政黨訊息",
	"Party name" : "政黨名稱",
	"Economical orientation" : "經濟傾向性",
"Social orientation" : "社會傾向性",
	"Party logo" : "政黨標誌",
	"Disscusion area" : "討論網址",
"Create" : "建立",

// articles
    "ShareThis" : "分享此篇文章",
	"Report abuse" : "舉報違規內容",
	"yesterday" : "昨日",
	"one hour ago" : "一個小時前",
	"Unsubscribe" : "取消訂閱",
	"Subscribe" : "訂閱",
	"Article RSS" : "Article RSS",
	"Your comment" : "您的評論",
	"View all comments" : "查看全部評論",
	"Subscribe to comments" : "訂閱此評論",
	"Unsubscribe to comments" : "取消訂閱此評論",
	"Post a comment" : "發佈評論",
// news
	"You don't have a newspaper" : "您尚未建立報紙",

// profiles
	"Friends" : "好友",
	"Assets" : "資產",
	"Press director" : "報社主編",
	"Inventory" : "倉庫",
	"Get Gold" : "購買黃金",
	"Career" : "職業發展",
	"Bio" : "個人簡歷",
	"Employee" : "員工",
	"No political activity" : "無政黨",
	"Wellness" : "體力",
	"Level" : "等級",
	"Strength" : "力量",
	"Experience" : "經驗",
	"Skills" : "技能",
	"Land" : "開採",
	"Manufacturing" : "製造",
	"Erepublik Age" : "Erepublik 年齡",
	"Achievements" : "成就",
	"edit profile" : "修改資料",
	"Edit Profile" : "修改資料",
	"Change residence" : "移居住地",
	"Donations list" : "捐贈記錄",
	"xp points" : "經驗值",


	"Your email here" : "電子郵件",
	"Your birthday" : "出生日期",
	"Citizen Avatar" : "公民頭像",
	"Change password" : "修改密碼",
    "Make changes" : "完成修改",
    "pictures allowed" : "格式圖片允許上傳",
	"You do not own a moving ticket. You can buy moving tickets from the marketplace." : "您目前尚無機票。您可以從購物市場購買機票。",
	"Current location" : "當前位置",
	"New location:" : "新的位置",
	"Please choose a country you want to live in." : "請選擇您要居住的國家",
	"Please choose the region you want to live in" : "請選擇您要居住的地區",

	"Work for 30 days in a row" : "連續工作30天",
	"Win the Congress elections": "贏得國會選舉",
    "Win the Presidential elections": "贏得總統大選",
    "Reach 1000 subscribers to your newspaper": "訂閱您報紙的讀者達到 1000 人",
    "Reach the highest total damage in one battle": "在一場戰鬥中綜合傷害值達到最高",
    "Start a resistance war and liberate that region": "發動一場起義戰爭並成功解放該地區",
	"Advance 5 strength levels": "力量超過 5 級",
	"Invite 10 people to eRepublik and help them reach level 6": "邀請 10 人加入 eRepublik 並且幫助他們達到 Lv6",


// fight
	"Back to battlefield" : "回到戰場",
	"Fight Again" : "再次參戰",
	"Fight bonus" : "戰鬥獎勵",
	"You are wounded. Access" : "您受傷了，",
	"the hospital" : "醫院",
	"in order to recover up to 50 wellness lost today in battles." : "可回復於戰役中損失的最多 50 點體力",
	"You have already been healed today." : "您今天已經治療過了，無法再次治療。",

// messages
	"Inbox" : "收件匣",
	"Sent" : "寄件匣",
    "Sent messages" : "寄件訊息",
	"Alerts" : "系統提示",
	"Subscriptions" : "報紙訂閱",
	"new article" : "新文章",
	"Delete" : "刪除",
	"Read Message" : "閱讀訊息",
	"Reply" : "回覆",
	"From" : "寄件人",
// flash menu
	"My places > Army" : "軍事",
	"My places > Newspaper" : "報紙",
	"My places > Organizations" : "組織",

	"Size:" : "大小：",
	"Code:" : "代碼：",
	"Badges" : "圖片",
	"Please insert an amount to buy." : "請輸入買入量.",
	"Payments can be done in USD as well." : "亦可用美元支付.",
	"Buy now" : "立即購買",
	"eRepublik Gold" : " eRepublik 黃金", 
	"is a fictional currency used only in the eRepublik World." : "為虛擬貨幣，只能在 eRepublik 遊戲世界中使用。", 
	"You can buy Gold only once every 7 days, in order to avoid Gold inflation. Therefore, be sure to get the appropriate pack to suit your needs for a whole week." : "為避免黃金的通貨膨脹，您每 7 天才能購買一次黃金。因此，請一次就買足您一週所需的黃金數量。", 
	"Additionally, you can get another 3 Gold via sms in case of emergency." : "另外，在緊急情況下您可以利用簡訊多買 3G 黃金。", 
	"Expires in one month" : "1 個月後到期", 
	"Presence:" : "投票率",

// menu	
	"Find out more" : "瞭解更多",
	"logout" : "登出",
	"Logout" : "登出",

	"Good job! You are on the way to a Hardworker Medal. Please prove you are human." : "做的好！您正邁向「模範員工」獎章之路。請先證明您確實是人類。",
	"Days until 'Hard Worker' medal" : "還需幾天才能獲得「模範員工」獎章",

// goals
	"increase" : "成長率",
	
	
// treasure map
	"Centuries ago, citizens buried their Gold for safekeeping, using Treasure Maps to mark the treasure site. If you have a map use it wisely and you may keep whatever you find. If you are extremely lucky you could even unearth part of the legendary Treasure of Kings." : "好幾個世紀以前，公民們為了安全起見會將黃金埋藏在某個地方，並畫出藏寶圖來標示埋藏地點。若你擁有藏寶圖而又夠聰明，那麼你發現的寶藏將可據為己有。如果你夠幸運，甚至可以挖到一部分傳說中的國王寶藏。",
	"Treasure Maps are printed on very brittle paper, " : "藏寶圖印在非常脆弱的紙張上，",
	"within 30 days they become unreadable." : "經過 30 天後就再也無法閱讀。",
	"no maps" : "沒有藏寶圖",
	"Treasure Maps are awarded for:" : "下列成就能獲得藏寶圖：",


// events by josesun
	"Party election day. Vote for your favorite!" : "黨主席選舉日，快投下您神聖的一票！",
	"The proposal for a new welcoming message for new citizens was rejected." : "修改給新公民的歡迎訊息的提案已否決。",
	"The president impeachment proposal has been rejected" : "總統彈劾案已否決",
	"Place your Congress candidature" : "接受議員競選登記",
	"Party Presidents choose final Congress candidates today" : "今日為黨主席選擇議員候選人的最終期限",
	"Congress election day. Vote for your favorite!" : "議員選舉日，投下您神聖的一票！",
	"The campaign goals of the presidential candidates are now final" : "總統候選人已提出政見及國家目標",
	"A new citizen fee was proposed" : "已提案修改新公民安家費",

};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};


var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 盟國";
regexps["^Active wars in (.*)$"] = "進行中的戰爭 $1";
regexps["(\\s*)Expires in (\\d*) days"] = " $2 天後到期";
regexps["(\\s*)Expires in (\\d*) hours"] = " $2 小時後到期";
regexps["(\\s*)Expires in (\\d*) months"] = " $2 個月後到期";
regexps["^(\\d*) comments$"] = "$1 評論";
regexps["^(\\d*) hours ago$"] = "$1 小時前";
regexps["^(\\d*) minutes ago$"] = "$1 分鐘前";
regexps["^(\\d*) days ago$"] = "$1 日前";
regexps["^Regions \\((\\d*)\\)"] = "地區 ($1)";
regexps["^Friends \\((\\d*)\\)"] = "好友 ($1)";
regexps["^(\\d*) months ago"] = "$1 月前";
regexps["^(\\d*) months"] = "$1 月";
regexps["^Comments(.*)"] = "評論 $1";
regexps["^You worked (\\d*) days in a row\\.You have (\\d+) more days until you receive a 'Hard Worker' Medal"] = "您已經連續工作 $1 天,再工作 $2 天時間, 您將會獲得 '模範員工' 勳章";
regexps["^You worked( )+one day in a row\\.You have (\\d+) more days until you receive a 'Hard Worker' Medal"] = "You worked( )+one day in a row. 再工作 $2 天時間, 您將會獲得'模範員工'勳章";
regexps["^Next election in (\\d*) day\\."] = "下屆選舉將於 $1 天到期.";
regexps["^(\\d) congress (.*) members"] = "國會 $1 成員.";
regexps["^(\\d)% of Congress"] = "國會人數: $1";
regexps["^Amount to buy$"] = "買入量$";
regexps["(\\d*)\\.(\\d*)\\.(\\d*) - "] = "$3.$2.$1 - ";
regexps["(.*)Day (\\d+) of the New World(.*)"] = "$1 新世界 $2. 日期$3";
regexps["^All employees \\((\\d*)\\)"] = "所有員工 ($1)";
regexps["^Active resistance wars in (.*)"] = "進行中的起義戰爭 $1 ";
regexps["^Official candidates \\((\\d*)\\)"] = "正式候選人 ($1)";
regexps["^Wildcards \\((\\d*)\\)"] = "外卡 ($1)";
regexps["^Not qualified \\((\\d*)\\)"] = "未當選 ($1)";
regexps["Presence:  (\\d*)\\.(\\d*)%"] = "投票率：$1.$2";
regexps["^(\\d+) candidate(s)?$"] = "$1 候選人";
regexps["^(\\d+) citizen(s)?$"] = "$1 公民";
regexps["^You cannot resign from your job until (.*)"] = "直到 $1 您才可以辭職";
regexps["^Proposed by (.*), (.*) hours ago"] = "提案的 $1 , $2 小時前";
regexps["^Tax change:(.*)"] = "稅率變更:$1";
regexps["^Successfuly transfered (.*) item\\(s\\) to (.*)\\."] = "成功轉移 $1 個物品給 $2。";
regexps["^You have successfuly offered a quality (\\d+) gift\\."] = "您已成功送出了一個 $1 禮物.";
regexps["Your friend (.+) that you invited reached level 6 and for that you have received 5 Gold\\."] = "您邀請的朋友 $1 已經達到了等級6, 因此您獲得了5 枚黃金的獎勵";
regexps["You have successfully donated (.*)\\. This amount will appear shortly in the citizen/organization account\\."] = "您己成功捐贈 $1 . 這筆款項將很快會出現在公民/組織的帳戶.";
regexps["The General Manager of (.+) has modified your salary from (.*) to (.*)\\."] = " $1 的總經理對您的薪水作出調整, 由 $2 調整到 $3 ";
regexps["We are sorry to inform you that the General Manager of (.*) has decided to fire you! But don't worry, you can get a new job or you can even buy a company\\."] = "我們很遺憾地通知您, $1 的總經理決定將您解雇了. 不要擔心, 您可以從就業市場找尋新的工作或者購買一家屬於自己的公司.";
regexps["Congratulations, you(r)? have reached experience level (\\d+)\\. Now you have the possibility to (.*)\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "恭喜, 您已經達到等級 $2 ! 現在 $3 功能已激活. 要達到等級 $4 , 您需要 $5 經驗值.";
regexps["Congratulations, you(r)? have reached experience level (\\d+)\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "恭喜, 您已經達到等級 $1 ! 要達到等級 $2 , 您需要 $3 經驗值.";
regexps["^Inbox \\(d+\\)"] = "收件箱 ($1)";
regexps["There is no more food in your inventory\\. Without food to eat your Citizen loses (\\d+) wellness each day until he dies\\. To avoid death by starvation we advise you to buy food from the (.*)"] = "您的倉庫已經沒有食物了，公民若沒有進食每日將會損失 $1 點體力直到死亡。為了避免被餓死，我們建議您到購物市場上購買食物：";
regexps["You have succesfully bought (\\d+) product(s)? for (.*)(\\.)?$"] = "您成功購買 $1 個物品 for $3 .";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\. Your current wellness is (.*)"] = "您目前不能參戰，您必須至少擁有 $1 體力，而您的目前體力為 $2。";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\."] = "您目前不能參戰，您必須至少擁有 $1 體力。";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\. You can get wellness from (.*)"] = "您目前不能參戰，您必須至少擁有 $1 體力，您可以到 $2 接受治療。";
regexps["(\\d+) Citizens"] = "$1 公民";
regexps["You received (\\d+) wellness from hospital\\."] = "您經過醫院治療獲得 $1 體力。";
regexps["You need at least (\\d+) Experience Points to join this fight"] = "您需要至少 $1 經驗, 才能參戰";
regexps["Citizen fee change from (.*) to (.*)"] = "公民費用從 $1 調整到 $2 ";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)\\?"] = "您是否同意從國庫轉移 $1 到 $2？";
regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD\\?"] = "您是否同意以 $2 黃金發行 $1 貨幣的提案？";
regexps["You have received (\\d+) gift of quality (\\d+) from (.*)\\. Your wellness has been increased with (\\d+)(\\.)"] = "您已收到 $1 件來自 $3 寄送的等級 $2 禮物，您的體力已增加 $4。";
regexps["(.*) has accepted your friendship request"] = "$1 己接受您的添加好友請求.";
regexps["Now you can visit the (.*) or read the (.*) to stay in touch with what happens on eRepublik."] = "現在您可以訪問 $1 或者閱讀 $2 來瞭解 eRepublik 中發生的事情.";
regexps["supported by (\\d+) parties"] = "得到 $1 政黨的支持";
// regexps["Next election in (\\d+)"] = "下次選舉將於 $1 天後進行";
// regexps["(\\d+) candidates"] = "$1 位候選人";
regexps["(\\d+)-(\\d+) characters max"] = "最多. $1-$2 字元";
regexps[" has transfered (\\d+) product(s)? to your inventory\\. Check your"] = " 已贈送 $1 物品到您的倉庫. 請查看 ";
regexps["donations list"] = " 捐贈記錄";
regexps[" has transfered (.*) to your account\\."] = " 已轉移 $1 到您的帳戶。";
regexps["(\\d+) active battles"] = "$1 進行中的戰役";
regexps["I have read and agree with the (.*)"] = "我已閱讀並接受 $1";
regexps["Copyright (.*) eRepublik"] = "版權所有 $1 eRepublik";
regexps["(.*)Remember me"] = "記住密碼";
regexps["Male"] = "男性";
regexps["Female"] = "女性";
// regexps["May"] = "五月";
// regexps["Copyright"] = "版權所有"; 
regexps["Top countries in eRepublik"] = " eRepublik 國家排行榜";
// regexps["Official candidates"] = "正式候選人";
regexps["Reaching experience level (\\d+) (requires (\\d+) experience points)"] = "達到經驗等級 $1（需要 $2 點經驗值）";
regexps["On day (\\d+) have a GDP of (\\d+) Gold"] = "於第 $1 天時 GDP 達到 $2 黃金";
regexps["On day (\\d+) have a population of (\\d+) citizens"] = "於第 $1 天時人口達到 $2 黃金";
regexps["On day (\\d+) own control of the following regions:"] = "於第 $1 天時佔領下列地區：";
regexps["You have recovered (\\d+) wellness lost today in battles.."] = "您已回復 $1 點於戰鬥中損失的體力..";
regexps["(.*) has fulfilled two national goal"] = "$1 已達成兩項國家目標";


// events by josesun
regexps["(.*) attacked (.*). Fight for your ally \\((.*)\\)!"] = "$1 正對 $2 發起攻擊，為您的盟國 $3 戰鬥吧！";
regexps["(.*) attacked (.*). Fight for your country"] = "$1 正對 $2 發起攻擊，為您的國家戰鬥吧";
regexps["(.*) attacked (.*)"] = "$1 正對 $2 發起攻擊";
regexps["(.*) declared war on (.*)"] = "$1 正式對 $2 宣戰";
regexps["A resistance has started in (.*)"] = "$1 發生了武裝起義";
regexps["(.*) was secured by (.*) in the war versus the Resistance Force"] = "$2 在與起義軍之戰中守住了 $1";
regexps["(.*) was conquered by the Resistance Force in the war versus (.*)"] = "起義軍在與 $2 之戰中攻下了 $1";
regexps["(.*) was secured by (.*) in the war versus (.*)"] = "$2 在與 $3 中守住了 $1";
regexps["(.*) was conquered by (.*) in the war versus (.*)"] = "$2 在與 $3 之戰中攻下了 $1";
regexps["President of (.*) proposed a new welcome message for new citizens."] = "$1 總統提案修改給新公民的歡迎訊息。";
regexps["(.*) stopped trading with (.*)"] = " $1 已停止與 $2 的貿易";
regexps["(.*) now has a new welcoming message for new citizens."] = " $1 已修改了給新公民的歡迎訊息。";
regexps["New taxes for gift were proposed"] = "已提案變更 $1 的稅率";
regexps["Taxes for (.*) changed"] = "$1 的稅率已變更";
regexps["A congress donation to (.*) was proposed"] = "國會已提案捐贈到 $1";
regexps["(.*) made a donation to (.*)"] = "$1 已捐贈到 $2";
regexps["A money issuing of (.*) was proposed"] = "已提案發行貨幣 $1";
regexps["(.*) issued (.*)"] = "$1 已發行貨幣 $2";
regexps["President of (.*) proposed an alliance with (.*)."] = "$1 總統提案與 $2 結盟。";
regexps["(.*) signed an alliance with (.*)"] = "$1 簽署了與 $2 的結盟條約";
regexps["Do you want the current president of (.*) to end this office\\?"] = "您是否同意結束 $1 總統的任期？";
regexps["For this law to be considered accepted it needs (\\d+)% of the Congress votes."] = "這項法律需要國會 $1% 以上的贊成票方能通過。";
regexps["A president impeachment against (.*) was proposed"] = "已提案彈劾總統 $1";
regexps["(.*) signed a peace treaty with (.*)"] = "$1 已與 $2 簽署和平條約";
	
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
        /* sajnos nem mukodik ...
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



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(500, translateWholePage)
}, false);