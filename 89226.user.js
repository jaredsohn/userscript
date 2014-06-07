// ==UserScript==
// @name		eRepublik_CHS
// @namespace		edited by CW
// @description		eRepublik 简体中文版 Ver 11.1114.1800
// @version		11.1114.1800
// @include		http://*.erepublik.com/*


// ==/UserScript==
/*
原作者：jiqimaono2
历次更新：acedia0915、josesun、蓝色小鼠BSM
本次更新：YaHoo.CN

最后更新时间：Ver 11.1114.1800

感谢原版作者jiqimaono2以及蓝色小鼠BSM的更新
本次更新在蓝色小鼠BSM的基础上进行了正体与简体之间的转换。
并根据简体中文习惯修改了部分内容。
*/

var strings = {
//标准格式"" : "",

//_/_/_/_/_/_/_/
//　尚未分类　_/
//_/_/_/_/_/_/_/

//战场
	"Enemy Defeated":"胜利！",
	"War influence":"伤害",
	"Rank points":"军衔",
	"Add influence":"确认",
	"Total influence":"总伤害",
	"No weapon":"没有武器",
	"Battlefield":"战场",
    "Battleground":"战场",//D1065好像拿掉了?
    "Battles I can fight in":"我可以参加的战役",
    	
//其他
    "Experience":"经验",
    "Guest":"访客",
    "Search citizen":"公民搜索",
    "No citizens found that match your criteria.":"找不到相符的公民。",
    "Good job! You are on the way to a Hardworker Medal. Please prove you are human." : "做的好！您正迈向「模范员工」的成就之路。请先证明您确实是人类。",
    "Good job! Please prove you are human.":"做的好！请输入验证码证明您确实是人类。",//有跑出这验证 会出现错误呢...
    "Continue":"继续",
//_/_/_/_/_/_/_/
//　游戏首页　_/(核对完成)
//_/_/_/_/_/_/_/
    "Ambient on/off":"背景 on/off",
    "active citizens today":"位活跃的公民",
    "Welcome to the New World" : "欢迎来到电子共和国",
    "Enter the new world" : "进入游戏",
    "Citizen name" : "公民名称",
    "Password" : "密码",
    "Forgot password?" : "忘记密码?",
    "Become a citizen" : "注册新公民",
    "Remember me" : "记住我",
    "Top countries in eRepublik" : "eRepublik 热门国家排行榜",
    "top countries in eRepublik" : "查看 eRepublik 国家排行榜",
    "citizens":"公民",
    "What others are saying about eRepublik":"eRepublik相关评论",

//_/_/_/_/_/_/_/
//　底下连结　_/(核对完成)
//_/_/_/_/_/_/_/
    "Forum" : "游戏论坛",
    "Wiki" : "游戏百科",
    "Blog" : "官方博客",
    "Press": "新闻发布",
    "Contact": "联系我们",
    "Jobs": "工作机会",
    "Terms of Service": "服务条款",
    "Privacy": "隐私政策",
    "Affiliates":"合作伙伴",
    "eRepublik Laws": "游戏规则",

//_/_/_/_/_/_/_/
//　登入页面　_/(核对完成)
//_/_/_/_/_/_/_/
    "Wrong password":"密码错误",
    "Login":"登录",//按钮无效?
    "Please type in your citizen name":"请输入您的公民名称",
    "Please type in your password":"请输入您的密码",
    "Complete the catpcha challenge:":"请输入验证码:",
    "Take the tour" : "游戏预览",
	"Join now" : "加入我们",
	"It's free" : "免费注册",

//_/_/_/_/_/_/_/
//　创立账户　_/
//_/_/_/_/_/_/_/
    "Create your citizen":"创建您的公民",
    "Location":"地点",
    "Select a country":"请选择一个国家",
    "Select a region":"请选择一个地区",
    "Next":"下一页",
    "or register using Facebook Connect":"或使用Facebook Connect来注册",
	"Required Input":"请输入",//暂时无解..研究中
	"Welcome to the New World! I'm Carla, your eRepublik advisor. Let's get acquainted, then I'll show you around.":"欢迎来到新世界！我是卡拉，您eRepublik的顾问。让我们彼此认识，我会带您四处看看。", //重新整理就会正常 怪事了...
	"Email address":"电子邮件地址",	
	//底下都未确认
	"Email validation":"电子邮件认证",
	"An email with your passport has been sent to":"一封内含您的护照的电子邮件已被送往",
	"Check your email":"检查您的电子邮件",
	"Reward:":"奖励:",
	"Not the right address? Change it now.":"不是正确的地址？现在就来更改。",
	"Resend email":"重新寄送",
	//认证完成后
	"Congratulations!":"恭喜!",
	"Start playing":"开始进行游戏",
//_/_/_/_/_/_/_/
//　游戏MAIN　_/
//_/_/_/_/_/_/_/
    "Advertise here":"在此刊登广告",
    "yesterday" : "昨天",
    "Logout" : "注销",
    "Eat food" : "补充<br>体力",
    
    "Experience level":"等级",
    "Experience points":"经验", 
    "Next level at":"下一级",
    "Health left to recover today:":"下一级",







//日常任务Daily tasks
    "Daily tasks":"<b>日常任务</b>",
    "Work":"工作",
    "Train":"训练",
    "Get reward":"获得奖励",
    "Completed!":"<b>完成!</b>",
    "work skill":"工作技能",
    "military skill":"军事技能",
    "experience points":"经验",
//最新事件Latest Events
    "National" : "国内事件",
    "International" : "聚焦国际",
    "one hour ago" : "一小时前",
    "more events" : "更多",
    "Place your Congress candidature" : "议员竞选报名",
    "Party Presidents choose final Congress candidates today" : "党主席确认议员候选人",
	"Congress election day. Vote for your favorite!" : "议员选举日，点这里投下您神圣的一票！",
	//以下未确认
	"Party election day. Vote for your favorite!" : "党主席选举日，点这里投下您神圣的一票！",
    "The proposal for a new welcoming message for new citizens was rejected." : "新人信修改提案已否决。",
    "The president impeachment proposal has been rejected" : "总统弹劾案已否决",
    "The campaign goals of the presidential candidates are now final" : "总统候选人已提出政见及国家目标",
    "A new citizen fee was proposed" : "已提案修改新公民费",
//My Battles
"China battles":"本国战争",
"Allies' battles":"盟国战争",
"All my battles":"战争列表",
//新闻News
    "Top" : "热点新闻",
    "Latest" : "最新报导",
    "more news" : "更多",
//留言Shouts
	"Shout something:":"签名内容:", //无作用
    "Friends" : "好友签名",
    "Official" : "其他签名",
    "Everyone" : "所有签名",
    "Report shout":"举报",
    "Get Extra Storage" : "仓库付费升级",
	"Shout":"更换签名",
//_/_/_/_/_/_/_/
//　角色概况　_/
//_/_/_/_/_/_/_/
    "No shouts posted by this citizen yet":"这个家伙很懒，什么都没有留下",
    "Location:":"现居地:",
    "(change)":"(移动)",
    "Citizenship:":"国籍:",
    "eRepublik birthday":"生日",
    "National rank:":"国家排名:",
    "Activity":"社交活动",
    "Unemployed":"无业游民",
    "No political activity":"无党人士",
    "Party Member":"党内成员",
    "No media activity":"普通读者",
    "Press director":"报社社长",
    "Forfeit points:": "违规点数:",
    "view all":"查看全部",
//选单
    "Overview":"公民概况",
    "Accounts":"账户资金",
    "Inventory":"个人仓库",
    "edit profile":"编辑",
//公民概况Overview
	"Health":"体力",
    "Experience level":"经验",
    "Achievements":"公民成就",
    "Level":"等级",
    "Military Skills":"军事技能",
    "Military rank":"军衔等级    ",
    "Super solider:":"力量点数",
    "Rank points:":"军衔点数",
    "Strength":"力量",
    "Progress":"进展",
    "About me":"个人简介",
//更改数据edit profile
    "Edit Profile":"修改",
    "Your password":"密码",
    "Enter your current password in order to change your profile settings":"输入当前密码",
    "Your email here" : "邮件",
    "Email must be valid for registration, so do not cheat" : "此Email地址用于注册游戏账号，所以必须真实有效。",
    "Your birthday" : "出生日期",
    "Citizen Avatar" : "公民头像",
    "only":"只有",
    "pictures allowed" : "格式图片允许上传",
    "Change password" : "修改密码",
//修改密码
    "Current password":"当前密码",
    "Please type your old password":"请输入旧的密码",
    "New password":"新的密码",
    "New password again":"重新输入新的密码",
//更改居住地点
	"Change residence":"更改居住地",
	"You will not be able to change residence outside the country while being an employee.":"需先到公司辞职方可出入境",
	"Current location" : "当前位置",
	"New location":"新的位置",
//成就
	"Hard Worker":"劳动模范",
    "Work for 30 days in a row" : "连续工作30天",
    "Worked 30 days in a row" : "连续工作30天",
    "Congress Member" : "政界精英",
    "Win the Congress elections": "赢得国会选举",
    "Won the Congress elections":"赢得国会选举",
    "Country President" : "一国之首",
    "Win the Presidential elections": "赢得总统大选",
    "Media Mogul" : "媒体大亨",
    "Reach 1000 subscribers to your newspaper": "订阅您报纸的读者达到 1000 人",
    "Battle Hero" : "战斗英雄",
    "Reach the highest total damage in one battle": "在一场战斗中总伤害值达到最高",
    "Reached the highest total damage in one battle": "在一场战斗中总伤害值达到最高",
    "Resistance Hero" : "带头大哥",
    "Start a resistance war and liberate that region": "发动一场起义战争并成功解放该地区",
    "Super Soldier" : "超能勇士",
    "Advance 100 strength points": "力量提升100点",
    "Advanced 5 strength levels":"力量超过5点",
    "Society Builder" : "交际大师",
    "Invite 10 people to eRepublik and help them reach level 10": "邀请10人加入eRepublik并且帮助他们达到Lv10",
//捐赠
	"Items":"物品",
	"Drag and drop items from your inventory to the donation area":"将您的物品拖动到捐赠区内",
	"Your inventory":"物品栏",
	"Donation":"赠送栏",
	"Donate items":"捐赠物品",
//============================================================================

//_/_/_/_/_/_/_/
//　游戏选单　_/
//_/_/_/_/_/_/_/

//"My places
    "Company" : "公        司",
    "Training grounds":"训        练",
    "Party" : "政        党",
    "Newspaper" : "报        纸",
    "Organization":"组        织",
    "Country administration" : "国        家",
    "Chat rooms":"聊        天",
    "Citizen Ads":"广        告",
//Market
    "Market":"市        场",
    "Marketplace" : "市        场",
    "Monetary market" : "外        汇",
    "Job market" : "就        业",
    "Companies for sale" : "转        让",
//Info
    "Rankings" : "游戏排名",
    "Country stats" : "国家资料",
    "Wars list" : "战争列表",
    "World Map":"世界地图",
//Community
    "Invite friends" : "邀请好友",
    "Elections" : "选举概况",
    "News":"新闻一览",
    "Badges":"宣传图样",
    "Tools":"附带工具",//战争画面会跑出来=..=
        
//============================================================================

//_/_/_/_/_/_/_/
//　公司画面　_/
//_/_/_/_/_/_/_/
//"My places > Company" : "公司",
    "Workplace":"<b>工作场所</b>",
    "Own a company":"<b>开办公司</b>",
    "Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt.":"企业有风险，投资需谨慎",
    "work":"工作",
    "company details":"公司详情",
    "Find out more":"了解更多",
    "Buy from market" : "收购二手企业",
    "Create new" : "创办新的企业",
//work
	"Choose a booster":"选择道具",//D1065好像被改了?只是旧画面还是会有显示
    "Choose an action to boost your Economy skill and Productivity":"选择道具来提高您的生产技能和生产力",//D1065新增的字符串
    "Single Espr...":"免费咖啡",
    "Double Espr...":"超浓咖啡",
    "Brainstorm ...":"头脑风暴",
    "After work ...":"欢乐派对",
    "Choose 2 invited friends to boost your Economy skill and Productivity":"选择2个朋友来帮助您提高生产技能和生产力",//D1065新增的字符串
    "Start working":"工作！！！",
    "Please choose a booster":"请选择一种道具",
    "You have already worked today. Come back tomorrow.":"下班啦~明儿见！",
    "Basic productivity":"初始生产力",
    "Resign":"辞职",
    "Salary:":"工资:",
    "View work results":"工作绩效",
    "Where do you want to go next?":"去别处逛逛",
//Workday results
    "Workday results":"工作成果",
    "Today's salary":"今日工资",
    "Economy Skill":"生产技能",
    "Gross salary:":"工资总额:",
    "Taxes:":"税:",
    "skill points":"技能",
    "Congratulations, you’ve been promoted to":"恭喜您，您的生产技能升级至",
    "Productivity:":"生产力:",
    "Work booster":"道具增益",
    "Friends bonus":"好友增益",//D1065新增的字符串
//建立公司
    "Funding fee":"手续费",
    "Starting capital":"初始资金",
    "Not Passed":"未通过",
    "Passed":"已通过",
    "Industry":"产业",
    "Company Identity":"公司资料",
    "Company name":"公司名称",
    "6-30 characters max":"6-30个字符",
    "Company logo":"公司LOGO",
    "Create company":"创建公司",
    //错误讯息
//    "Please select an industry.":"请选择一种产业。",//无作用
//    "Please enter a valid company name between 6 and 30 characters.":"请输入一个介于6-30个字符内且有效的公司名称。",//无作用
//公司详细资料
    "Grain stock":"谷物库存",
    "employees":"员工",
    "Show Employees":"查看雇员",
    "Market offers":"市场提供",
    "Price with taxes":"税后价格",
    "The company offers no products in this market":"没有货物上市",
//员工详细
    "Employee":"雇员",
    "Productivity":"生产力",
    "Offers":"提供",    //可能会跟其他地方有冲突
    "link":"链接",

//_/_/_/_/_/_/_/
//　训练画面　_/
//_/_/_/_/_/_/_/
//Training grounds
    "Start training":"开始训练",
    "You have already trained today":"立正！稍息！近天训练就到这里，解散！",
    "Select skill to enhance:":"选择要训练的技能:",
    "Choose an action to boost your Military skill":"选择一种道具来提高您的军事技能",//D1065新增的字符串
    "Choose 2 invited friends to boost your Military skill":"选择2个朋友来帮助您提高军事技能",//D1065新增的字符串
    "View train results":"查看训练成果",
    "Train results":"训练成果",
    "Rifle skill":"步枪技能",
    "Basic training:":"基础训练值",
    "Train booster":"道具增益",

//_/_/_/_/_/_/_/
//　政　　党　_/
//_/_/_/_/_/_/_/
//My places > Party
	"Report party":"举报政党",
    "You are not a member of a party" : "<b>您目前并非政党成员</b>",
    "You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "您可以从政党页面加入某一政党，如果您找不到适合您的政党，也可以自己建立一个政党。<br>成为政党成员可以使您有机会成为议员，甚至总统。",
    "Join a party" : "加入政党",
    "Name":"名字",
//信息
    "Info":"信息",
    "Members"  : "成员",
    "Orientation" : "倾向",
    "Join party" : "加入政党",
    "Show all members":"显示所有成员",
//账户
    "Donate Gold":"捐赠",
    "Show all donations":"显示所有捐赠",
    "All donations":"所有捐赠",
//选举
    "Party presidency":"党主席",
    "Party President":"党主席",
    "Congress":"国会",
    "congress members":"国会议员",
	"of Congress":"国会席次",
    "Next elections in" : "距离下次选举：",
    "one day":"<b>1 天</b>",
    "Election day":"选举日",
    "Vote":"投票",
    "Show candidate list" : "显示候选人名单",
    "Show proposed members":"显示议员候选人名单","of congress":"",
    "Country presidency":"国家元首",
    "Show candidates list" : "显示候选人名单",
    "Our next candidate" : "下届选举候选人",
    "no goals selected":"没有选择目标",
//创立政党
	"Party details" : "政党讯息",
	"Party name" : "政党名称",
	"Economical orientation" : "经济倾向",
    "Far-left" : "极左翼",
    "Center-left" : "左翼",
	"Center" : "中立",
    "Center-right" : "右翼",
    "Far-right" : "极右翼",
	"Social orientation" : "社交倾向",
    "Totalitarian" : "极权主义",
    "Authoritarian" : "独裁主义",
    "Libertarian" : "自由主义",
    "Anarchist" : "无政府主义",
	"Party logo" : "政党标志",
	"Disscusion area" : "论坛",
	"Create":"建立",
//国会议员候选人
	"Party Page":"回政党画面",
    "Congress member candidates":"国会议员候选人",
    "Party members can apply for congressional candidature each month between the 16th and 23rd.":" 党员可以在每月的16日和23日之间申请参选国会议员。",
    "Party president can modify the final list only on the 24th of each month":" 党主席只有在每月24日可以修改最终的名单",
    "Each party can propose a maximum number of 9 candidates per region.":" 在每个地区，每一方最多可以提出9名候选人。",
    "Choose region":"选择地区",
    "No presentation":"没有任何介绍",
    "Presentation":"介绍",
//加入政党后
	"Congratulations, you are now a party member!":"恭喜您，成为本党成员！",
	"Candidate":"登记成为候选人",
	"Run for congress":"竞选国会议员",
	"Run for Congress":"<b>竞选国会议员</b>",
	"Provide a link to your presentation where you explain why citizens should vote for you in the congressional elections":"替您的政见演说给一个连结，解释给公民们说为什么要在国会议员选举中投您一票",
	"link to an external web address or a":"可链接到外部网站地址或是",
	"private forum":"私人论坛",
	"Agree":"同意",
	"Cancel":"取消",
//_/_/_/_/_/_/_/
//　报　　纸　_/
//_/_/_/_/_/_/_/
//My places > Newspaper
    "You do not have a newspaper" : "<b>您尚未开办报纸</b>",
    "A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "开办报纸是您在 eRepublik 的世界中沟通联络讯息的最有效途径。<br>想了解更多相关讯息请阅读 eRepublik 百科。建立您自己的报纸。",
    //开办报纸
    "Newspaper details" : "报纸详情",
    "Newspaper name" : "报纸名称",
    "6-25 characters max":"6-25个字符",
    "Newspaper Avatar" : "报纸标志",
    "only JPG files allowed":"只允许*.JPG格式",
	//阅读报纸
	"today":"今日",
	"Subscribe":"订阅",
	"ShareThis" : "分享",
	"Report article":"举报文章",
	"Report comments":"举报回复",
	"Subscribe to comments" : "订阅此回复",
	"Your comment" : "您的回复",
	"Post a comment" : "发表回复",
	
//_/_/_/_/_/_/_/
//　组　　织　_/
//_/_/_/_/_/_/_/
//My places > Organizations
    "My Organizations" : "<b>我的组织</b>",
    "In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "您必须先退出您的公民账号，然后才能用您的组织账号和密码重新登录。组织号是没有体力和经验的个人号，方便于开设公司及境外走私。",
    "Organizations created by you:" : "<b>您建立的组织:</b>",
    "You have not created any organization yet." : "您尚未建立任何组织.",
//建立页面
    "Your account":"您的账户",
    "Requirements" : "需求",
    "Cost" : "费用",
    "Organization details" : "<b>组织讯息</b>",
    "Organization name" : "组织名称",
    "4-30 characters max":"4-30个字符",
    "Your email address:" : " 您的Email地址:",
    "Retype password":"重新输入密码",
    "Please select a country":"请选择国家",
    "eRepublik region" : "选择地区",
    //"Select your eRepublik region":"选择您eRepublik的地区", //无动作...
    "Organization logo" : "组织标志",
    "Complete the challenge:":"请输入验证码:",

//_/_/_/_/_/_/_/
//　国家管理　_/
//_/_/_/_/_/_/_/
	"Select":"选择",
	"Donate" : "捐赠",
	"On the Map":"查看地图",
//选单
    "National Goals" : "国家目标",
    "Society":"社会",
    "Economy":"经济",
    "Politics":"政治",
    "Military":"军事",
    "Administration":"管理",
//国家目标
    "Current national goals" : "当前的国家目标",
    "The elected president has not set any national goals for this month." : "总统并未设置本月的国家目标。",
    "At least one national goal needs to be achieved each month in order to receive a monument.":"每月至少有一个国家需要实现的目标，以获得一个纪念碑。",
//社会
    "National Chat Room" : "国家聊天室",
    "Join":"加入",
    "Citizens":"公民",
    "Total citizens" : "公民总数",
    "New citizens today" : "今日新公民",
    "Average citizen level" : "平均公民等级",
    "Online now": "在线",
    "Who" : "详情",
    "Citizen fee" : "新人费",
    //查看在线玩家
    	"Region":"地区",
    	"All regions":"所有地区",
    //地区详细
        "Country - Society":"国家 - 社会",
        "Population":"人口",
        "Constructions":"建设",
        "Low":"低",
        "Medium" : "中",
        "High": "高",
        "Resistance War" : "起义战争",
        "You cannot start a resistance war in this region because it already belongs to its original owner country." : "您不能在这个地区发动起义战争，该地区已属于其原有的国家。",
        "Neighbors" : "邻近国家",
//经济
	"Treasury":"国库",
	"All accounts":"所有账户",
	"Taxes":"税率",
	"Income Tax":"所得税",
	"Import Tax":"进口税",
	"VAT":"增值税",
	"Country trading embargoes":"国家贸易禁运",
	"This country can trade with any other country in eRepublik.":"这个国家可以在eRepublik与任何一个国家贸易。",
	"Salary":"薪资",
	"Minimum":"最低",
	"Average":"平均",
	"Gross domestic product (GDP)":"国内生产总值（GDP）",
	"Monthly exports":"每月出口",
	"Monthly imports":"每月进口",
	"Inflation":"通货膨胀",
//政治
	"President":"总统",
	"Election results":"选举结果",
	"Next elections":"下届选举",
//军事
	"All wars" : "所有战争",
	"There are no resistance wars in this country." : "该国家没有任何起义战争。",
	"All resistance wars" : "所有起义战争",
	"Alliances":"盟国",
	"All Alliances" : "所有盟国",
//管理
	
    "You are not a president or a congress member in this country.":"您不是该国的总统或是议员。",
    "Law proposals" : "法律提案",
    "details" : "详情",
    "Alliance" : "结盟",
    "Accepted" : "已通过",
    "Pending" : "未决定",
    //法条
    "Country Administration":"国家管理",
    "New Citizen Fee" : "新公民费",
	"Issue Money":"发行货币",
    "Tax change: Defense System":"更改税率:防御系统",
//_/_/_/_/_/_/_/
//　聊天室　　_/
//_/_/_/_/_/_/_/
    "Featured rooms" : "精选聊天室",
    "Join another featured room" : "加入其他精选聊天室",
    "Select room":"选择聊天室",
    "Chat rooms created by you" : "自己建立聊天室",
    "Be a chat room owner" : "<b>当个聊天室的主人</b>",
    "Having your own chat room allows you to administrate the discussions, assign moderators and provide an environment where citizens can socialize, interact and discuss upon the interesting topics of the New World." : "在自己的聊天室里您具有管理讨论，并提供指定主持人的功能，公民可以在新的世界里，社交、互动和讨论有趣的话题。",
    "Create chat room" : "创立聊天室",
    "My favorite rooms" : "最爱的聊天室",
    "You have no favorite chat rooms":"您没有最爱的聊天室",
    "Once you join a room and click the \"add as favorite\" icon, that specific room will be added to the list of favorite chat rooms. This way it will be easier for you to access a specific room you are interested in.":"一旦您加入一个房间，点击“加为收藏夹”图标，即特定的房间将被添加到列表的最爱的聊天室。这样会更容易为您访问一个您感兴趣的特定房间。",


//_/_/_/_/_/_/_/
//　广告代理　_/
//_/_/_/_/_/_/_/
	"1. Create your ad":"1. 建立您的广告",
	"Easily create your ad - no design or coding skills needed.":"轻松创建您的广告 - 不用设计或编码所需的技能。",
	"Include both graphical and text-based content, all within a live preview.":"包括图形和文字内容，全部都可实时预览。",
	"Easily edit the content of your ad to increase results.":"轻松编辑您的广告内容，以增加效果。",
	"2. Target your ad":"2. 定位您的广告",
	"Target by type of location and/or citizen.":"选择服务对象类别的位置/或公民",
	"Choose to display your ad in the entire New World or within a very specific country or region.":"选择显示您的广告在整个新的世界或在特定的国家或地区。",
	"Choose to display your ad to all citizens of the New World or to a very specific group of citizens - from regular employees to congressmen.":"选择向新世界所有公民或一个非常特定群体的公民显示您的广告 - 从正式员工到国会议员均可。",
	"3. Budget your ad":"3. 您的广告预算",
	"Use your citizen's Gold account, as well as your company or party's accounts.":"用您的公民的黄金账户，也可以是您的公司或党的账户。",
	"View real time statistics regarding impressions, budget spent and clicks":"查看实时统计有关的数据，预算支出和点击",
	"Fund your decisions on increasing or decreasing budget.":"决定增加或减少预算的基金。",
	"Create an ad":"建立广告",
//建立页面
	"Create your ad":"建立您的广告",
	"Live preview":"实时预览",
	"Will refresh when content is added.":"随时更新广告的预览画面",
	"You may only advertise content located on erepublik.com.":"您只能在eRepublik.com宣传您的广告内容。",
	"Language:":"语言:",
	"Only citizens using eRepublik in this language will be viewing this ad":"只有选择该语言的eRepublik公民才看的到这个广告",
	"Title:":"标题:",
	"Content:":"内容:",
	"Picture:":"图片:",
	"Upload photo":"上传图像",
	"Link:":"连结:",
	"Only internal eRepublik links are allowed":"只允许eRepublik内部的链接",
	"Target your ad":"定位您的广告",

//============================================================================

//_/_/_/_/_/_/_/
//　交易市场　_/
//_/_/_/_/_/_/_/
    "Search for product":"搜寻产品",
    "Select minimum requirements":"设置产品规格",
    "Show results":"显示结果",
    "Cancel":"取消",
    "Change":"更改",
    "Product":"产品",
    "Provider":"供货商",
    "Stock":"库存",
    "Price":"价格",
    "Quantity":"数量",
    "Buy":"购买",

//_/_/_/_/_/_/_/
//　外汇市场　_/
//_/_/_/_/_/_/_/
    "Sell":"贩卖",
    "Show my offers" : "显示我的报价",
    "Show all offers" : "显示全部报价",
    "Post new offer" : "添加新的报价",
    "Rec exchange rate" : "参考汇率",
    "Amount":"金额",
    "Exchange rate":"汇率",    
    "Amount to buy":"购买金额",
    "Prev":"上一页",
    "Get Gold" : "购买黄金",
        
//_/_/_/_/_/_/_/
//　就业市场　_/
//_/_/_/_/_/_/_/
    "Skill level":"技能等级",
    "Sorry, there are no jobs available at the moment that match your search criteria!":"对不起，没有符合您搜寻的工作条件。",
    "Daily salary":"日薪",
    "Apply":"同意",
    //同意后
    "Congratulations, you are now working for this company.":"恭喜您，您现在可以在这家公司工作了。",

//_/_/_/_/_/_/_/
//　公司转让　_/
//_/_/_/_/_/_/_/
    "Product details":"产业详情",
    "There are no companies for sale matching you search.":"您搜寻的产业没有公司要出售。",
    "You can not buy a company from another country.":"您不可以从别的国家购买公司。",
//============================================================================

//_/_/_/_/_/_/_/
//　游戏排行　_/
//_/_/_/_/_/_/_/

//公民
//公司
    "Companies":"公司",
    "Sort by" : "排序",
    "Sales" : "销售",
    "No. of Employees" : "员工人数",
    "Select industry":"选择产业",
    "All industries":"所有产业",
//报纸
    "Newspapers" : "报纸",
    "Subscribers" : "订阅读者",
//国家
    "Countries":"国家",
    "Experience points":"经验值",
    "( Average Experience )":"(平均经验)",
    "Population number" : "人口数量",
    "Unemployment rate" : "失业率",
    //"GDP" : "国内生产总值",
    "Gross Domestic Product":"国内生产总值",
    "Exports" : "出口",
    "Imports" : "进口",
    "No. of companies" : "公司数量",
    "No. of newspapers" : "报纸数量",
    "No. of chatrooms" : "聊天室数量",
    "Join National Chatroom":"加入国家聊天室",
//政党
    "Parties" : "政党",
//聊天室
    "Chat room":"聊天室",
    "Owner" : "拥有者",
    "Description" : "描述",
    "Favorites":"我的最爱",

//_/_/_/_/_/_/_/
//　国家数据　_///己乎同国家管理
//_/_/_/_/_/_/_/

//_/_/_/_/_/_/_/
//　战争列表　_/
//_/_/_/_/_/_/_/
	"War types":"战争类型",
	"Conquest wars":"入侵",
	"Resistance wars":"起义",
	"War status" : "战况",
	"Active wars" : "进行中的战争",
	"Ended wars" : "已结束的战争",
	"Countries involved" : "涉及国家",
	"no allies" : "没有盟国",
	"no active battles" : "无进行中的战役",

//_/_/_/_/_/_/_/
//　世界地图　_/
//_/_/_/_/_/_/_/
	"Go to eRepublik":"返回主页",

//============================================================================

//_/_/_/_/_/_/_/
//　邀请朋友　_/
//_/_/_/_/_/_/_/
	"status":"状态",
	"of the friends you invited.":"。",
	"Your personal invitation link":"您的个人邀请连结",
	"Post this link on forums, blogs, messenger status or send it by yourself via email.":"将此连结张贴到论坛、BLOG、MSN状态栏，或是自行用电子邮件来散发。",
	"Send via :":"发送透过:",
	"Invites status":"邀请的状况",
	"View the status of your invites and bonuses":"查看您邀请的状况跟奖金",
	"Track invites":"追踪邀请",
	"Send email invite":"发送电子邮件邀请",
	"You are allowed to create and administrate ONLY one eRepublik citizen.":"您只能注册与管理一个eRepublik公民。",
	"Breaking this rule you will face the risk of having all your citizen accounts suspended.":"违反此规定，系统将视情节对您进行短期警告或永久封号。",
	"Your name:":"您的名字:",
	"Import your contacts:":"邀请您的联络人:",
	"Invitations left:":"邀请函:",
	"Invite your friends and get 10% of all Gold they will receive in eRepublik from Treasure Maps and purchases.":"",
	"Facebook invite":"从Facebook邀请",

//_/_/_/_/_/_/_/
//　选　　举　_/
//_/_/_/_/_/_/_/
	"Election":"选举",
	"Presidential elections" : "总统选举",
    "Congressional elections" : "议员选举",
    "Party elections" : "党主席选举",
    "Official Results":"<b>正式结果</b>",
    "No information available":"没有相关讯息",
	"Month/Year":"月份/年",
	//进行投票
	"Select a party":"选择一个政党",
	"to show it's candidates":"显示他的候选人",
	
//_/_/_/_/_/_/_/
//　新　　闻　_/
//_/_/_/_/_/_/_/
	"Top rated news" : "热门新闻",
	"Latest news" : "最新新闻",
	"Latest events" : "最新事件",
		
//_/_/_/_/_/_/_/
//　图　　样　_/
//_/_/_/_/_/_/_/
	"Invite your friends and get 10% of all Gold they will receive in eRepublik from Treasure Maps and purchases by adding a badge to your e-mail signature, website, blog and more! It’s easy:":"您的下线每开启一张藏宝图或进行充值，您本人都能获得额外的金币奖励，数值想当于下线获取金币数量的10%：",
	"1. Pick your favorite badge":"1. 挑选自己喜欢的图样。",
	"2. Copy the code from the box next to it. Use Ctrl + C if you’re on a PC, Cmd + C if you’re on a Mac.":"2. 从框内复制原始码，若是PC用户可使用Ctrl + C来复制，若是Mac用户可使用Cmd + C复制。",
	"3. Paste the code anywhere you want your badge to appear.":"3. 在您想出现图样的地方贴上原始码。",

//============================================================================

//_/_/_/_/_/_/_/
//　购买黄金　_/
//_/_/_/_/_/_/_/
	"Gold":"黄金",
	"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to buy additional features within eRepublik." : " eRepublik中的黄金为游戏中的虚拟货币，仅用于购买eRepublik中的额外功能。",
	"Select amount" : "选择数量",
	"Payments can be made in US Dollar as well." : "亦可用美元支付.",
	"Select payment option":"选择付款方式",
	"Please choose a payment option":"请选择付款方式",
	"is a fictional currency used only in the eRepublik World." : "为虚拟货币，只能在 eRepublik 游戏世界中使用。", 
	"Buy now" : "立即购买",

//_/_/_/_/_/_/_/
//　储存空间　_/
//_/_/_/_/_/_/_/
	"Extra Storage": "额外仓储空间",

//_/_/_/_/_/_/_/
//　藏宝地图　_/
//_/_/_/_/_/_/_/
	"Treasure" : "藏宝","Maps":"地图",
    "no maps" : "没有藏宝图",
    "Use a Treasure Map":"使用藏宝图",
    "Use the Treasure Map":"使用藏宝图",
    "Centuries ago, citizens buried their Gold for safekeeping, using Treasure Maps to mark the treasure site. If you have a map use it wisely and you may keep whatever you find. If you are extremely lucky you could even unearth part of the legendary Treasure of Kings." : "好几个世纪以前，公民们为了安全起见会将黄金埋藏在某个地方，并画出藏宝图来标示埋藏地点。若您拥有藏宝图而又够聪明，那么您发现的宝藏将可据为己有。<br>如果您够幸运，甚至可以挖到一部分传说中的国王宝藏。",
    "within 30 days they become unreadable." : "30 天后藏宝图就再也无法阅读。",
    "Treasure Maps are awarded for:" : "完成下列成就能获得藏宝图：",
    "Gaining an achievement":"取得的成就",

//_/_/_/_/_/_/_/
//　黄金奖励　_/
//_/_/_/_/_/_/_/
	"Track your gold bonus":"<b>关注您的黄金奖励</b>",
	"Collected Gold":"收集到的黄金",
	"Invite your friends":"<b>邀请您的朋友</b>",
	"Invite more friends and boost your chances to get more Gold!":"邀请更多的朋友<br>提升您获得黄金的机会！",

//_/_/_/_/_/_/_/
//　体力恢复　_/
//_/_/_/_/_/_/_/
	"Health:":"体力:",

//============================================================================

//_/_/_/_/_/_/_/
//　系统讯息　_/
//_/_/_/_/_/_/_/
//Inbox
	"Inbox":"收件箱",
	"Select all":"选择全部",
	"Delete":"删除",

//Sent
	"Sent":"发件箱",
	"Subject":"主旨",
	"Message":"讯息内容",
	"Send":"传送",
	"No messages found.":"没有发现邮件",

//Alerts 系统提示
	"Alerts":"系统提示",
	"Congratulations, you have reached experience level 2. To reach level 3 you need 4 experience points.":"恭喜您，您已经达到LV 2级的经验。距离达到LV 3级，您至少需要达4点经验。",
	"Congratulations, you have reached experience level 3. To reach level 4 you need 6 experience points.":"恭喜您，您已经达到LV 3级的经验。距离达到LV 4级，您至少需要达6点经验。",
	"Congratulations, you have reached experience level 4. To reach level 5 you need 8 experience points.":"恭喜您，您已经达到LV 4级的经验。距离达到LV 5级，您至少需要达8点经验。",
	"Congratulations, you have reached experience level 5. To reach level 6 you need 10 experience points.":"恭喜您，您已经达到LV 5级的经验。距离达到LV 6级，您至少需要达10点经验。",
	"Congratulations, you have reached experience level 6. Now you have the possibility to fight in wars. To reach level 7 you need 15 experience points.":"恭喜您，您已经达到LV 6级的经验。现在您可以开始参战。距离达到LV 7级，您至少需要达15点经验。",
	"Congratulations, you have reached experience level 7. Now you have the possibility to change your location and citizenship. To reach level 8 you need 20 experience points.":"恭喜您，您已经达到LV 7级。现在您可以改变您的位置和国籍。距离达到LV 8级，您至少需要达20点经验。",
	"Congratulations, you have reached experience level 8. Now you have the possibility to collect Gold from friends you have invited in eRepublik. To reach level 9 you need 30 experience points.":"恭喜您，您已经达到LV 8级。现在您可以在eRepublik从邀请到的朋友那收集黄金。距离达到LV 9级，您至少需要达30点经验。",
	"Congratulations, you have reached experience level 9. Now you have the possibility to create a newspaper. To reach level 10 you need 40 experience points.":"恭喜您，您已经达到LV 9级。现在您可以建立自己的报纸。距离达到LV 10级，您至少需要达40点经验。",
//	"Congratulations, you have reached experience level 10. Now you have the possibility to create ads and you also have received a Gold Treasure Map. You have until day 1,093 before the markings on the brittle paper will have faded away. To reach level 11 you need 50 experience points. ":"",
	"Congratulations, you have reached experience level 11. Now you have the possibility to create a chat room. To reach level 12 you need 60 experience points.":"恭喜您，您已经达到LV 11级。现在您可以建立一个聊天室。距离达到LV 12级，您至少需要达60点经验。",
	"Congratulations, you have reached experience level 12. Now you have the possibility to create companies and organizations. To reach level 13 you need 70 experience points.":"恭喜您，您已经达到LV 12级。现在您可以建立公司和组织。距离达到LV 13级，您至少需要达70点经验。",
	"Congratulations, you have reached experience level 13. Now you have the possibility to join a party. To reach level 14 you need 80 experience points.":"恭喜您，您已经达到LV 13级。现在您可以加入政党。距离达到LV 14级，您至少需要达80点经验。",
	"Congratulations, you have reached experience level 14. Now you have the possibility to vote in the elections. To reach level 15 you need 100 experience points.":"恭喜您，您已经达到LV 13级。现在您可以在选举中投票。距离达到LV 15级，您至少需要达100点经验。",
	"Select All":"选择全部",
	"After 5 days the alerts are automatically deleted":"讯息在5天后会自动删除",
		
//Subscriptions 报纸订阅
	"Subscriptions":"报纸订阅",
	"Weekly news":"每周新闻",
	"Weekly mail presenting the top rated news, active wars, military events and top five countries in eRepublik":"每周邮报提供eRepublik最精彩的新闻，包括主动战争，军事事件和前五位的国家",
	"show example":"显示范例",
	"Turn ON":"开启",
	"Turn OFF":"关闭",
//_/_/_/_/_/_/_/
//　新手任务　_/
//_/_/_/_/_/_/_/
	"Hint:":"提示:",
		
//We are all warriors
	"We are all warriors":"新兵报到",
	"In this new and dangerous world your country needs the strongest warriors in order to defend itself or conquer new territories. All must help now and the strength of a warrior is measured first of all by his Military Skill.":"立正！欢迎来到这个战火纷飞的年代。每天你的祖国，你的盟友都在为保卫国土和征服敌国而进行着战斗！前线需要每一名战士！赶快投入到日常训练中去吧！",
	"Train for the first time":"进行一次训练",
	"Unlock for 3":"解锁 需要花费3",
	"You can build up your Military Skill by going daily to the":"您可以训练您的军事技能在",
	"Training Area":"训练区",

//Food is scarce
	"Food is scarce":"我饿了",
	//"The more food you have in your inventory the more you are protected against hard times when your health will be low and market supplies depleted.":"市场价格每天都会浮动。记得时常关注市场，看到低价面包不要手软，立即购入！"
	"Have 3 food in inventory.":"至少购买3个食物",
	"New companies have emerged and they should have food for sale in the":"点击这里购买食物",

//Join the rebuilding effort
	"Join the rebuilding effort":"养家糊口",
	"The economy is in turmoil and new companies have emerged. Getting a job allows you to work daily, receive a constant salary and helps strengthen your country's economy.":"这年头没工作可怎么活？年轻人，赶紧去找份工作养家糊口吧！",
	"Have a job.":"找到一份工作。",
	"Unlock for 1":"解锁 需要花费1",
	"Work at least once.":"至少工作一次。",
	"You should first find a job in the":"您可以先从",
	"Job Market":"就业市场",
	"and then Work in your new Company.":"找到一份工作，然后在新公司工作。",

//Image matters
	"Image matters":"形象问题",
	"When interacting with the citizens of the new world (friends, co-workers, comrades, voters, etc) your image will be worth a thousand words.":"只有矬人才会没有头像。",
	"Have a profile picture.":"拥有个人头像",
	"Upload a photo or image that will define how your citizen looks from the":"您可以上传专属于您的个人图像在",
	"Edit profile page":"修改数据页面",

//Offense is the best defense
	"Offense is the best defense":"装备压制",
	"It's easier to take down enemies when you have a good weapon than with your bare hands.":"银鳞胸甲，蓝色品质，一件5G...这位兄台相貌堂堂，衣冠楚楚，出手大方，赶紧来买件趁手的兵器吧！", 
	"Have 3 weapons in your inventory.":"至少购买3个武器",
	"The":"在", 
	"offers a great variety of weapons.":"可以购买到各色武器。",

//A future Hero 
	"A future Hero":"M-m-m-monster kill",
	"Take down 5 opponents.":"进入战场并完成5人斩(推荐高级别后再去完成)！",

//Working days
	"Working days":"劳模之路",
	"A strong nation can survive only based on a strong economy. A strong economy is based on a productive and efficient workforce.":"持续工作是个良好的习惯，每连续工作一个月后将能获得藏宝图一张",
	"Work for 5 days in a row.":"连续工作至少五天", 

//Society builder
	"Society builder":"交际大师",
	"You can be really powerful only by having your friends near you.":"这不是传销，这不是传销，这不是传销...",
	"Get the Society Builder Achievement.":"获得 交际大师 的成就",
	"Invite":"邀请",
	"10 people to eRepublik and help them reach level 10.":" 10 人加入 eRepublik 并且帮助他们达到 Lv10",

//El Dorado - Prepare for the journey
         "El Dorado":"黄金城",
         "Prepare for the journey":"旅途准备",
         "Acquire 5 weapons":"需要5件武器",
         "Acquire 8 Moving Tickets":"需要8张机票",
         "Train 5 days in a row":"连续训练5天",


//El Dorado - The Search

         "The Search":"开始寻宝",
         "Move to South America":"飞往南美任意国家",
         "Invite 2 Friends":"拥有2名下线",
         "Society builder":"交际大师",
         "Possess an unused treasure map":"一张未开封的藏宝图",
        
//El Dorado - Now or Never

 "Now or Never":"机不可失(不推荐完成)",

 "Defeat 30 enemies in 24 hours":"24小时内完成30次击杀",

 "Defeat an enemy in 3 different South American battles":"在3个不同的南美战场上完成击杀",

 "Own 100 units of local currency":"拥有100单位的当地货币",


//La Resistance
 "La Resistance":"抗争到底",
 "Defeat 30 enemies in 24 hours":"24小时内完成30人斩",
 "Defeat an enemy in 3 different resistance wars":"在三场不同的起义中完成击杀",
 "Become a Captain":"荣升至上尉以上军衔",


//Healthy Hard Worker
 "Healthy Hard Worker":"健康工作五十年",
 "Work 5 days in a row with 90+ wellness":"连续保持90以上体力工作5天以上",

//True Mercenary
 "True Mercenary":"真·佣兵无双",
 "Defeat 40 enemies in 14 hours":"14小时内完成40人斩",
 "Defeat an enemy in battles for 4 different countries":"在四场不同战场中完成击杀",
"Be a battle hero":"拥有「战斗英雄」成就",


//_/_/_/_/_/_/_/
//　国　　会　_/
//_/_/_/_/_/_/_/
//法律提案
	"ACCEPTED":"已通过",
	"The law voting process takes 24 hours.":"该法的投票过程需要24小时。",
	"Yes":"赞成",
	"No":"反对",
	"Only congress members and country presidents have the right to vote.":"只有国会议员和总统才有投票权。",
	"Show all law proposals":"显示所有法律提案",
//_/_/_/_/_/_/_/
//　阶　　级　_/
//_/_/_/_/_/_/_/

//工作	感谢PTT_RJJ、josesun提供部分修正
    "Apprentice":"临时工",
    "Assistant":"学徒",
    "Junior":"新手",
    "Senior":"资深",
    "Coordinator":"主管",
    "Specialist":"行家",
    "Expert":"专家",
    "Master":"达人",
    "Guru":"初阶大师",
    "Guru*":"一阶大师",
    "Guru**":"二阶大师",
    "Guru***":"三阶大师",
//训练 感谢josesun提供部分修正
    "Greenhorn":"生手",
    "Rookie":"新手",
    "Hotshot":"初学",
    "Marksman":"熟练",
    "Sharp Shooter":"老手",
    "Sharp Sh...":"老手",
    "Professional":"精通",
    "Professio...":"精通",
    "Ranger":"突击队员",
    "Nemesis":"复仇使者",
    "Veteran":"初阶战神",
    "Veteran*":"一星级战神",
    "Veteran**":"二星级战神",
    "Veteran***":"三星级战神",

//军阶 
//资料来自http://wiki.erepublik.com/index.php/Military_rank
//感谢josesun提供部分修正
        "recruit":"新兵",  
      
        "Private":"列兵",       
        "Private*":"列兵*",  
        "Private*":"列兵**",  
        "Private***":"列兵**",  

	"Corporal" : "下士",
	"Corporal*" : "下士*",
	"Corporal**" : "下士**",
	"Corporal***" : "下士***",

        "Sergeant" : "中士",
        "Sergeant*" : "中士*",
        "Sergeant**" : "中士**",
        "Sergeant***" : "中士***",

	"Lieutenant":"少尉",
	"Lieutenant*":"少尉*",
	"Lieutenant**":"少尉**",
	"Lieutenant***":"少尉***",

	"Captain":"上尉",
	"Captain*":"上尉*",
	"Captain**":"上尉**",
	"Captain***":"上尉***",


	"Major":"准校",
	"Major*":"    准校*",
	"Major**":"    准校**",
	"Major***":"    准校***",

	"Commander":"    少校",
	"Commander*":"    少校*",
	"Commander**":"    少校**",
	"Commander***":"    少校***",

	"Lt Colonel":"    中校",
	"Lt Colonel*":"    中校*",
	"Lt Colonel**":"    中校**",
	"Lt Colonel***":"    中校***",

        "Colonel":"    上校",
        "Colonel*":"    上校*",
        "Colonel**":"    上校**",
        "Colonel***":"    上校***",

        "General":"    将军",
        "General*":"    将军*",
        "General**":"    将军**",
        "General***":"    将军***",

	"Field Marshal":"    元帅",
	"Field Marshal*":"    元帅*",
	"Field Marshal**":"    元帅**",
	"Field Marshal***":"    元帅***",

        "Supreme Marshal":"    高阶元帅",
        "Supreme Marshal*":"    高阶元帅*",
        "Supreme Marshal**":"    高阶元帅**",
        "Supreme Marshal***":"    高阶元帅***",

        "National Force":"    国家元首",
        "National Force*":"    国家元首*",
        "National Force**":"    国家元首**",
        "National Force***":"    国家元首***",

        "World Class Force":"    世界元首",
        "World Class Force*":"    世界元首*",
        "World Class Force**":"    世界元首**",
        "World Class Force***":"    世界元首***",

        "Legendary Force":"    传奇元首",
        "Legendary Force*":"    传奇元首*",
        "Legendary Force**":"    传奇元首**",
        "Legendary Force***":"    传奇元首***",

        "God of War":"    战争之王",

//_/_/_/_/_/_/_/
//　月　　份　_/
//_/_/_/_/_/_/_/
    "Month":"月份",
    "January":"一月",
    "February":"二月",
    "March":"三月",
    "April":"四月",
    "May":"五月",
    "June":"六月",
    "July":"七月",
    "August":"八月",
    "September":"九月",
    "October":"十月",
    "November":"十一月",
    "December":"十二月",

    "Jan":"一月",
    "Feb":"二月",
    "Mar":"三月",
    "Apr":"四月",
    "May":"五月",
    "Jun":"六月",
    "Jul":"七月",
    "Aug":"八月",
    "Sep":"九月",
    "Oct":"十月",
    "Nov":"十一月",
    "Dec":"十二月",

//_/_/_/_/_/_/_/
//　类　　别　_/
//_/_/_/_/_/_/_/
    "Food":"食物",
    "Moving Tickets" : "机票",
    "Tank":"坦克",
    "Air Unit":"战机",
    "Rifle":"步枪",
    "Artillery":"火炮",
    "House":"房屋",
    "Defense System" : "地堡",
    "Hospital" : "医院",
    "Stone":"石料",
    "Oil":"石油",
    "Grain" : "小麦",
    "Titanium":"钛",
    "Iron":"铁",

//_/_/_/_/_/_/_/
//　国家名称　_/
//_/_/_/_/_/_/_/
    "All countries" : "所有国家",
    "Country":"国家",
    "World":"世界",
    "Argentina" : "阿根廷",
    "Australia" : "澳大利亚",
    "Austria" : "奥地利",
    "Belarus":"白俄罗斯",
    "Belgium":"比利时",
    "Bolivia":"玻利维亚",
    "Bosnia and Herzegovina" : "波黑",
    "Brazil" : "巴西",
    "Bulgaria" : "保加利亚",
    "Canada" : "加拿大",
    "Chile" : "智利",
    "China" : "中国",
    "Colombia" : "哥伦比亚",
    "Croatia" : "克罗地亚",
    "Cyprus" : "塞浦路斯",
    "Czech Republic" : "捷克共和国",
    "Denmark" : "丹麦",
    "Estonia" : "爱沙尼亚",
    "Finland" : "芬兰",
    "France" : "法国",
    "Germany" : "德国",
    "Greece" : "希腊",
    "Hungary" : "匈牙利",
    "India" : "印度",
    "Indonesia" : "印度尼西亚",
    "Iran" : "伊朗",
    "Ireland" : "爱尔兰",
    "Israel" : "以色列",
    "Italy" : "意大利",
    "Japan" : "日本",
    "Latvia" : "拉脱维亚",
    "Lithuania" : "立陶宛",
    "Malaysia" : "马来西亚",
    "Mexico" : "墨西哥",
    "Montenegro" : "黑山",//又名黑山?
    "Netherlands" : "荷兰",
    "New Zealand" : "纽西兰",
    "North Korea" : "朝鲜",
    "Norway" : "挪威",
    "Pakistan" : "巴基斯坦",
    "Paraguay" : "巴拉圭",
    "Peru" : "秘鲁",
    "Philippines" : "菲律宾",
    "Poland" : "波兰",
    "Portugal" : "葡萄牙",
    "Republic of China (Taiwan)" : "中华民国(台湾)",
    "Republic of Macedonia (FYROM)":"马其顿共和国",
    "Republic of Moldova":"摩尔多瓦共和国",
    "Romania" : "罗马尼亚",
    "Russia" : "俄罗斯",
    "Serbia" : "塞尔维亚",
    "Singapore" : "新加坡",
    "Slovakia" : "斯洛伐克",
    "Slovenia" : "斯洛维尼亚",
    "South Africa" : "南非",
    "South Korea" : "韩国",
    "Spain" : "西班牙",
    "Sweden" : "瑞典",
    "Switzerland" : "瑞士",
    "Thailand" : "泰国",
    "Turkey":"土耳其",
    "USA" : "美国",
    "Ukraine" : "乌克兰",
    "United Kingdom" : "英国",
    "Uruguay" : "乌拉圭",
    "Venezuela" : "委内瑞拉",

//_/_/_/_/_/_/_/
//　地区名称　_/
//_/_/_/_/_/_/_/

//阿根廷
   
//澳大利亚
	
//奥地利
	
//白俄罗斯


//比利时
	
//玻利维亚
	
//波斯尼亚与赫塞哥维纳
	
//巴西
	
//保加利亚

//加拿大

//智利

//中国
	"Anhui":"安徽",
	"Fujian":"福建",
	"Gansu":"甘肃",
	"Guangdong":"广东",
	"Heilongjiang":"黑龙江",
	"Hubei":"湖北",
	"Hunan":"湖南",
	"Jiangsu":"江苏",
	"Jiangxi":"江西",
	"Liaoning":"辽宁",
	"Shaanxi":"陕西",
	"Shandong":"山东",
	"Shanxi":"山西",
	"Sichuan":"四川",
	"Yunnan":"云南",
	"Zhejiang":"浙江",
	"Guizhou":"贵州",
	"Hainan":"海南",
	"Henan":"河南",
	"Jilin":"吉林",
	"Qinghai":"青海",
	"Guangxi":"广西",
	"Inner Mongolia":"内蒙古",
	"Ningxia":"宁夏",
	"Xinjiang":"新疆",
	"Tibet":"西藏",
	"Beijing":"北京",
	"Chongqing":"重庆",
	"Shanghai":"上海",
//哥伦比亚

//克罗埃西亚

//塞浦路斯
//捷克共和国
//丹麦
//爱沙尼亚
//芬兰
//法国
//德国
//希腊
//匈牙利
//印度
//印度尼西亚
//伊朗
//爱尔兰
//以色列
//意大利
//日本
//拉脱维亚
//立陶宛
//马来西亚
//墨西哥
//蒙特内哥罗
//荷兰
//纽西兰
//朝鲜
    "Kangwon":"江原道",
    "Ryanggang":"两江道",
    "Chagang":"慈江道",
    "Hamgyong":"咸镜道",
    "Pyongan":"平安道",
    "Hwangae":"黄海道",
//挪威
//巴基斯坦
//巴拉圭
//秘鲁
//菲律宾
//波兰
//葡萄牙
//中华民国(台湾)
    "Northern Taiwan":"台湾北部",
    "Central Taiwan":"台湾中部",
    "Eastern Taiwan":"台湾东部",
    "Southern Taiwan":"台湾南部",
//马其顿共和国
//摩尔多瓦共和国
//罗马尼亚
//俄罗斯
    "Eastern Siberia":"东部西伯拉亚",
//塞尔维亚
//新加坡
//斯洛伐克
//斯洛维尼亚
//南非
//南韩
//西班牙
//瑞典
//瑞士
//泰国
//土耳其
//美国
	
//乌克兰
//英国
//乌拉圭
//委内瑞拉
};//到这里结束

//============================================================================

//_/_/_/_/_/_/_/
//　长字符串区　_/
//_/_/_/_/_/_/_/
//说明：
//
var regexps = {};
//============
//游戏首页
//交易市场
regexps["You have succesfully bought (\\d+) product(s)? for (.*)(\\.)?$"] = "您已成功购买了 $1 个产品共花费 $3 ";
//公司工作NPC
regexps["(.*)I'm Emma, the company's secretary. You look like you will be very productive today!"] = "$1 我是埃玛，是公司的秘书。您今天看起来感觉会非常有效率！";
//就业市场
regexps["You already have a job at (.*)(\\.) To apply for this job you have to quit your current job."] = "您已经有一份工作在 $1 。若要申请工作，您必须放弃您目前的工作。";
//角色概况
regexps["^Friends\\((\\d*)\\)"] = "好友 ($1)";
//国家统计资料/社会
regexps["^Regions \\((\\d*)\\)"] = "地区 ($1)";
//新闻
regexps["^(\\d*) months ago$"] = "$1 个月前";
regexps["^(\\d*) days ago$"] = "$1 天前";
regexps["^(\\d*) hours ago$"] = "$1 小时前";
regexps["^(\\d*) minutes ago$"] = "$1 分钟前";
regexps["(.*) attacked (.*),(.*). Fight for your ally \\((.*)\\)!"] = "$1 正对 $3 的 $2 发起攻击，为您的盟国 $4 战斗吧！";
regexps["(.*) signed an alliance with (.*)"] = "$1 签署了与 $2 的结盟条约";
regexps["A congress donation to (.*) was proposed"] = "国会已提案捐赠资金到 $1";
//报纸
regexps["^(\\d*) comments$"] = "$1 则评论";
regexps["^Comments(.*)"] = "评论 $1";
regexps["^Trackbacks(.*)"] = "引用 $1";
//国家同盟
regexps["(\\s*)Expires in (\\d*) days"] = " $2 天后到期";
regexps["(\\s*)Expires in (\\d*) hours"] = " $2 小时后到期";
regexps["(\\s*)Expires in (\\d*) months"] = " $2 个月后到期";
//战争列表
regexps["(\\d*) allies"] = "$1 盟国";
regexps["(\\d+) active battle(s)?"] = "$1 进行中的战役";
//购买黄金
regexps["I have read and agree with the (.*)"] = "我已阅读并接受 $1";
//建立公司
regexps["Not Passed(.*)"] = "未通过 (会转移到您的公司账户。)"; //不知道会不会跟其他"Not Passed"冲突...
//政党
regexps["Do you agree to represent your party in the congress election in (.*)(\\?)"] = "您是否同意代表政党去参选 $1 的议员?";
//邀请朋友
regexps["Invite your friends and get 10% of all Gold they will receive in eRepublik from Treasure Maps and purchases. Check the"] = "邀请您的朋友并获得从朋友那开启的藏宝图、或是储值黄金的10%回馈。查看您邀请的";
//选举
regexps["You only have (\\d*) experience points. To access this feature you need at least 80 experience points \\(experience level 14\\)."]="您目前只有$1点经验值，使用这功能，您至少需要达80点经验值(等级Lv 14)。"; //不知道其他地方会不会出现类似的讯息
//
//法案
regexps["Citizen fee change from (.*) to (.*)"] = "公民费从 $1 调整到 $2 ";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)\\?"] = "您是否同意从国库转移 $1 到 $2？";
//============================================================================

//去除字符串左右空白
trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};


//关于match()及replace()函数的相关教学
//http://www.w3schools.com/jsref/jsref_obj_regexp.asp
//http://ops01.pixnet.net/blog/post/20990542

//更换regexps字符串(最吃速度......想办法优化orz)
matchRegexps = function(key) {
    if (key===null) {
        return undefined;
    }
    
    for (var reg in regexps) {
        var rrrr = new RegExp(reg);	//var txt=new RegExp(pattern,modifiers);
        var result = key.match(rrrr);

        if (key.match(rrrr)!==null) {
            return key.replace(rrrr,regexps[reg]);	//string.replace(/\要寻找的字/g, '被取代的字');
        }
    }
    return undefined;
};


//翻译字符串("":"",) 
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


//tagName取得列表
var allTrans = {
    "span":"",
    "a":"",
    "h1":"","h2":"","h3":"","h4":"","h5":"",
    "th":"","td":"",
    "p":"",
    "b":"",
    "small":"","big":"",
    "strong":"",
    "div":"",
    "label":"",
    "input":"",
    "li":"",
    "em":"",
    "option":"",
    };

/*军事页 用意不明
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
*/

/*暂时不打算翻译Flash保护下的字符串
fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}
*/

//整页翻译
translateWholePage = function(e) {
// if (document.location.toString().indexOf("/country/military")!=-1) {
//   militaryPage();
//  }

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      
	if ( node.tagName == "INPUT" && node.type == "submit" || node.type == "button" ||node.type == "text" )
      {
        //GM_log( node.value );查看错误履历用
        var trans = translateWithRegexp(node.value);
        //GM_log( trans ); 查看错误履历用
        if (trans!==undefined) {
          node.value = trans;
        }
      }
      
      else if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
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


//更改特定CSS
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('tbody, .dotted, .core { font-size: 13px ! important; }');
addGlobalStyle('.quarterhead { font-size: 12px ! important; }');
//addGlobalStyle('.x { color: #4d4d4d; font-size: 24px; ! important; }');
addGlobalStyle('.btnGetExtraStorage { font-size: 11px; }');



window.addEventListener("load", function(e) {
  translateWholePage(e);
// fixFlash();
// SetTimeout("translateWholePage(e)",500);
}, false);






