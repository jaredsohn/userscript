// ==UserScript==
// @name           eRepublik Kor Patch v0.2
// @namespace      edited by Gabriel
// @description    eRepublik Kor Patch
// @version        0.2
// @include        http://*.erepublik.com/*
                   
// ==/UserScript==
var strings = {

//표준형식 "" : "",

"(change)" : "(변경)",

//_/_/_/_/_/_/_/
//　카테고리　_/
//_/_/_/_/_/_/_/

//전장
	"Republic of China (Taiwan) Campaigns":"Republic of China (Taiwan) Campaigns",
	"Republic of China (Taiwan) is not involved in any active battles.":"Republic of China (Taiwan) is not involved in any active battles.",
	"See other campaigns":"다른 캠페인들 보기",
	"Enemy Defeated":"적 패배",
	"War influence":"전쟁 영향력",
	"Rank points":"순위 점수",
	"Add influence":"지속 영향력",
	"Total influence":"총 전쟁 영향력",
	"No weapon":"무기 없음",
	"Battlefield":"전장",
	//"Battleground":"전장",//D1065일부터 무효?
	"Battles I can fight in":"참가 가능한 전장들",
	"Battle statistics":"전투 통계",
	"Overall results":"총합 결과",
	"View battle stats":"전투통계 보기",
	"Kills":"킬 스코어",
	"Congratulations, your rank is now":"축하합니다! 당신의 랭크는 이제",
	"Rank Bonus on attack":"랭크로 인한 추가데미지",
	"Free health refill":"체력 재충전",
	"Health refill needed":"체력 충전이 필요합니다.",
//기타
	"Experience":"경험",
	"Guest":"손님",
	"Search citizen":"시민 검색",
	"No citizens found that match your criteria.":"해당하는 시민을 찾을 수 없습니다.",
	"Good job! You are on the way to a Hardworker Medal. Please prove you are human." : "수고하셨습니다! 하드워커 메달을 향해 한걸음 다가가셨네요. 죄송하지만, 당신이 매크로가 아니라는 것을 증명해주세요.",
	"Good job! Please prove you are human.":"수고하셨어요! 이제 당신이 매크로나 봇이 아니라는 것을 증명해주세요.",//오류발생여부 체크안함
	"Continue":"계속",
//_/_/_/_/_/_/_/
//　게임 홈　 _/(확인 완료)
//_/_/_/_/_/_/_/
	"Ambient on/off":"배경 on/off",
	"active citizens today":"오늘의 접속 유저",
	"Welcome to the New World" : "새로운 세계에 오신걸 환영합니다!",
	"Enter the new world" : "접속하기",
	"Citizen name" : "시민 이름",
	"Password" : "비밀번호",
	"Forgot password?" : "비밀번호를 잊어버리셨나요?",
	"Become a citizen" : "가입하기",
	"Remember me" : "시민 기억하기",
	"Top countries in eRepublik" : "eRepublik 국가 랭킹",
	"top countries in eRepublik" : "eRepublik 국가 랭킹",
	"citizens":"시민",
	"What others are saying about eRepublik":"eRepublik에 대한 코멘트들",
//_/_/_/_/_/_/_/
//　하단 링크 _/
//_/_/_/_/_/_/_/
	"Forum" : "포럼",
	"Wiki" : "위키",
	"Blog" : "블로그",
	"Press": "보도자료",
	"Contact": "어드민 문의",
	"Jobs": "구직",
	"Terms of Service": "서비스 약관",
	"Privacy": "개인 정보",
	"Affiliates":"제휴 기업",
	"eRepublik Laws": "eRepublik 규칙",

//_/_/_/_/_/_/_/
//　로그인 페이지　_/
//_/_/_/_/_/_/_/
	"Login":"로그인",
	"Please type in your citizen name":"시민 이름을 입력해주세요.",
	"Wrong citizen name":"잘못된 시민 이름입니다.",
	"Please type in your password":"비밀번호를 입력해주세요.",
	"Wrong password":"잘못된 비밀번호입니다.",
	"Complete the catpcha challenge:":"확인 코드를 입력해주세요.:",
	"Take the tour" : "게임 미리보기",
	"Join now" : "지금 가입하세요.",
	"It's free" : "무료입니다!",

//_/_/_/_/_/_/_/
//　계정 생성　_/
//_/_/_/_/_/_/_/
	"Create your citizen":"새로운 시민 생성",
	"Location":"시작 지점",
	"Select a country":"국가를 선택하세요.",
	"Select a region":"지역을 선택하세요.",
	"Next":"다음으로",
	"or register using Facebook Connect":"페이스북을 연동해 가입할 수도 있습니다.",
	"Welcome to the New World! I'm Carla, your eRepublik advisor. Let's get acquainted, then I'll show you around.":"환영합니다! 제 이름은 카를라에요, 당신을 위한 조언자에요. 제가 지금부터 당신을 안내하겠습니다.", //새로고침으로 정상화 가능
	"Email address":"이메일 주소",	
	//이하 인증
	"Email validation":"이메일 인증",
	"An email with your passport has been sent to":"당신의 여권이 이메일 주소로 발송되었습니다.",
	"Check your email":"이메일을 확인하세요.",
	"Reward:":"결과:",
	"Not the right address? Change it now.":"잘못된 이메일 주소라면 지금 변경하세요.",
	"Resend email":"이메일 재전송",
	//인증 후
	"Congratulations!":"축하합니다!",
	"Start playing":"게임 시작",
//_/_/_/_/_/_/_/
//　게임 메인　_/
//_/_/_/_/_/_/_/
	"Advertise here":"광고하기",
	"yesterday" : "어제",
	"Logout" : "로그아웃",
//Daily tasks
	"Daily tasks":"하루 일과",
	"Work":"일하기",
	"Train":"훈련",
	"Get reward":"완료 보상",
	"Completed!":"완료!",
	"work skill":"직업 기술",
	"strength":"힘",//Day1081변경
	"experience points":"경험치",
//Latest Events	//（해당하지 않나?）
	"National" : "국내",
	"International" : "전세계",	//뉴스로 변경됨
	"one hour ago" : "한시간 이내",
	"more events" : "뉴스 더보기",
	"Place your Congress candidature" : "국회의원 후보를 선정하세요.",
	"Party Presidents choose final Congress candidates today" : "당 대표는 오늘 국회의원 최종 후보를 선정해야 합니다.",
	"Congress election day. Vote for your favorite!" : "국회의원 선거일입니다. 투표하세요!",
	//다음은 확실
	"Party election day. Vote for your favorite!" : "당 대표 선거일입니다. 투표하세요!",
	"The proposal for a new welcoming message for new citizens was rejected." : "새로운 환영메시지가 거부되었습니다.",
	"The president impeachment proposal has been rejected" : "탄핵이 거부되었습니다.",
	"The campaign goals of the presidential candidates are now final" : "대선 후보들의 공약이 결정되었습니다.",
	"A new citizen fee was proposed" : "새로운 시민 보조금 법안이 발의돼었습니다.",
//Military campaigns
	"Allies' Campaigns":"동맹국들의 캠페인들",
	"Victory":"승리",
	"More military campaigns":"캠페인 더 보기",
	"Campaign of the day":"오늘의 캠페인",
//News
	"Top" : "화제의",
	"Latest" : "최신의",
	"more news" : "뉴스 더보기",
//Shouts
//	"Friends" : "친구들",
//	"Official" : "공식적인",
//	"Everyone" : "모두에게",
	"Report shout":"Shout 신고하기",
	"Shout":"Shout",
//_/_/_/_/_/_/_/
//　유저메뉴　_/
//_/_/_/_/_/_/_/
	"No shouts posted by this citizen yet":"이 시민은 아직 Shout를 등록하지 않았습니다.",//실패?
	"Dead citizen":"죽은 시민",
	"Permanently banned":"영구 추방됨",
	"Location:":"거주지:",
	"(change)":"(변경)",
	"Citizenship:":"국적:",
	"eRepublik birthday":"eRepublik 생일",
	"National rank:":"국가 랭킹:",
	"Activity":"활동 내역",
	"Unemployed":"직장 없음",
	"No economical activity" : "경제 활동 없음",
	"No political activity":"정당에 참여하지 않음",
	"Party Member":"정당 회원",
	"No media activity":"언론 활동 없음",
	"Create newspaper":"신문 만들기",
	"Press director":"신문 발행인",
	"Forfeit points:": "벌점:",
	"view all":"전부 보기",
//메뉴
	"Overview":"시민 정보",
	"Accounts":"계좌",
	"Inventory":"인벤토리",
	"edit profile":"프로필 고치기",
//시민정보 Overview
	"Health":"체력",
	"Experience level":"경험치",
	"About me":"About me",
	"Achievements":"Achievements（업적）",
	"Level":"레벨",
	"Military Skills":"군사 스킬",
	"Strength":"힘",//Day1081추가
	"Super soldier:":"슈퍼 솔져:",//Day1081추가
	"Military rank":"계급",
	//"Rank points:":"랭킹 점수",//Day1081추가，다른곳에 쓰일지 불확실
	"Skill":"스킬",//Day1081추가，다른곳에 쓰일지 불확실
	"Progress":"진행도",
//프로필 고치기 edit profile
	"Edit Profile":"프로필 고치기",
	"Your description":"자기 소개",
	"Citizen Avatar" : "유저 이미지",
	"only":"오직 ",
	"pictures allowed" : " 형식의 이미지만 허용됩니다.",
	"Your birthday" : "생일",
	"Your email here" : "이메일",
	"Email must be valid for registration, so do not cheat" : "이메일은 등록 확인을 거치므로, 거짓으로 작성하지 마세요.",
	"Your password":"비밀번호 입력",
	"Enter your current password in order to change your profile settings":"변경된 프로필을 적용하시려면 확인을 위해 비밀번호를 다시 한번 입력해주세요.",
	"Change password" : "비밀번호 변경",
	"Make changes":"변경내용 적용",
	"You have succesfully edited your profile":"프로필 변경이 완료되었습니다.",
//비밀번호 변경
	"Current password":"기존 비밀번호",
	"Please type your old password":"기존의 비밀번호를 입력해주세요.",
	"New password":"새로운 비밀번호",
	"New password again":"새로운 비밀번호 확인",
//거주지 변경
	"Change residence":"거주지 옮기기",
	//"You will not be able to change residence outside the country as long as you are a member of the Congress.":"국회의원인 상태에서는 국외로 거주지를 옮길 수 없습니다.",
	//"You will not be able to change residence outside the country while being an employee.":"해당 국가의 기업에 취직한 상태에서 타국으로 거주지를 옮길 수 없습니다.",
	//"You will not be able to change residence outside the country while being a party member.":"정당의 회원인 상태에서는 국외로 거주지를 옮길 수 없습니다.",
	"Current location" : "현재 거주지",
	"New location":"옮겨 갈 거주지",
	"Do you wish to apply for citizenship in your new country?":"거주지를 옮기면서 해당 국가의 국적을 취득하시겠습니까?",
	"Apply for citizenship":"귀화하기",
	"No, thanks":"귀화하지 않음",
//토지 land
	"Visit":"방문",
	"Enter":"들어가기",
//성취 achievements
	"Hard Worker":"하드 워커",
	"Work for 30 days in a row" : "30일 연속으로 일하세요.",
	"Worked 30 days in a row" : "30일 연속으로 일했습니다.",
	"Congress Member" : "국회의원",
	"Win the Congress elections": "국회의원 선거에서 승리하세요.",
	"Won the Congress elections":"국회의원 선거에서 승리했습니다.",
	"Country President" : "대통령",
	"Win the Presidential elections": "대통령 선거에서 승리하세요.",
	"Media Mogul" : "거물 언론인",
	"Reach 1000 subscribers to your newspaper": "신문에 1000명의 구독자를 얻으세요.",
	"Battle Hero" : "전투 영웅",
	"Reach the highest war influence in a battle": "한 전투에서 최고의 전쟁 영향력을 달성하세요.",
	"Reached the highest war influence in a battle": "한 전투에서 최고의 전쟁 영향력을 달성했습니다.",
	"Campaign hero":"캠페인 영웅",
	"Reach the highest war influence in a campaign":"한 캠페인에서 최고의 전쟁 영향력을 달성하세요.",
	"Resistance Hero" : "독립 영웅",
	"Start a resistance war and liberate that region": "저항 전쟁을 시작하고, 지역을 해방시키세요.",
	"Super Soldier" : "슈퍼 솔져",
	"Advance 250 strength points": "힘을 250 상승시키세요.",
	"Society Builder" : "사회 건설자",
	"Invite 10 people to eRepublik and help them reach level 10": "10명의 시민을 초대하고 그들이 10레벨을 달성하도록 도와주세요.",
	"Invited 10 people to eRepublik and helped them reach level 10":"10명의 시민을 초대하고 그들이 10레벨을 달성하도록 도와줬습니다.",
//기부하기 donate
	"Items":"물품",
	"Drag and drop items from your inventory to the donation area":"기부할 물건을 인벤토리에서 기부 물품으로 드래그 앤 드랍 하세요.",
	"Your inventory":"당신의 인벤토리",
	"Donation":"기부하기",
	"Donate items":"기부 물품",
//인벤토리
	"Edit inventory":"인벤토리 수정",
	"Save inventory":"인벤토리 저장",
	"Cancel":"취소",
//============================================================================

//_/_/_/_/_/_/_/
//　게임메뉴　_/Day1175 주요변경사항
//_/_/_/_/_/_/_/

//"未分類
	"Company" : "기업",
	"Training grounds":"훈련소",
	"Newspaper" : "신문",
//	"Organization":"조직",
//	"Chat rooms":"채팅방",//신문 바깥= ="
//	"Advertising Agency":"광고",//Citizen Ads
	"Citizen Ads":"광고",
	"Country stats" : "국가 정보",
	"Wars list" : "전쟁 목록",
	"Laws":"법안들",
//Day1175개정됨-----------------------
//Market
	"Market":"시장",
	"Marketplace" : "시장",
	"Monetary market" : "외환 시장",
	"Job market" : "인력 시장",
	"Companies for sale" : "기업체 거래소",
		
//Community	
	"World Map":"세계 지도",
	"News":"뉴스",
	"My Party" : "나의 정당",
	"Elections" : "선거",
	"Rankings" : "랭킹",
	"Country administration" : "국가 행정센터",
	"Invite friends" : "친구 초대하기",
	"My Organizations" : "나의 조직",
	"Badges":"뱃지",
//	"Tools":"도구",//전쟁화면 나올 예정=..=

        
//============================================================================
//_/_/_/_/_/_/_/
//　나의 토지　_/
//_/_/_/_/_/_/_/
"Buy Land":"토지 구입",
"New land":"새로운 토지",
"Cost:":"가격:",
"Not enough local currency!":"해당 국가의 화폐가 부족합니다!",
"Expand":"확장",


//_/_/_/_/_/_/_/
//　회사사진　_/
//_/_/_/_/_/_/_/
//없는 경우
"You do not have a job":"당신은 직업이 없습니다.",
"The best way to earn money fast is to find a job and work for a company. The company will pay you by the hour. And the higher your skill is, the more money you will earn.":"돈을 버는 가장 빠른 방법은 직장에 취직하는 것입니다. 당신이 기업에서 일하면 기업은 당신에게 급여를 지급하게 됩니다. 당신의 경제 스킬이 높을수록 임금은 높아질 것입니다.",
"Find a job":"직업 찾기",
"Run your own company":"기업 만들기",
"Running a company is a great way to become rich in eRepublik. But be careful: Before your company becomes profitable you need to pay your employees on a daily basis and know the market you are in.":"기업을 운영하는 것은 eRepublik에서 부자가 되는 좋은 길중 하나입니다. 하지만 기업은 직원들에게 급여를 지급해야 한다는 것을 잊지 마세요.",
//"My places > Company" : "기업",
	"Workplace":"직장",
	"Own a company":"소유 기업",
	"Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt.":"기업은 자본의 원천이긴 합니다만, 그 전에 직원들에게 지급할 급여가 충분히 확보되었는지 확인하세요. 급여가 확보되어야 회사가 파산하지 않습니다.",
	"work":"일하기",
	"company details":"기업 상세정보",
	"Find out more":"더 찾아보기",
	"Buy from market" : "시장에서 구입하기",
	"Create new" : "새로 만들기",
//work
	"Choose a booster":"부스터 선택",//D1065 변경되었으나 아직 예전의 그림표시
	"Choose an action to boost your Economy skill and Productivity":"부스터는 업무 능력과 생산성을 향상시켜 일의 능률을 높여줍니다.",//D1065 문자열 추가
	"Single Espr...":"싱글 에스프레소",
	"Double Espr...":"더블 에스프레소",
	"Brainstorm ...":"브레인 스토밍",
	"After work ...":"After work ...",
	"Choose 2 invited friends to boost your Economy skill and Productivity":"당신이 초대한 친구를 2명까지 선택해 작업 능률을 높일 수 있습니다.",//D1065 문자열 추가
	"Start working":"작업 시작",
	"Please choose a booster":"부스터를 선택해주세요.",
	"You have already worked today. Come back tomorrow.":"오늘은 이미 일하셨습니다. 내일 다시 돌아와주세요.",
	"Resign":"사직",
	"Salary:":"일당:",
	"View work results":"결과 보기",
	"Where do you want to go next?":"다음엔 어디로 가실래요?",
//Workday results
	"Workday results":"작업 결과",

	"Today's salary":"오늘의 일당",
	"You are working as manager, no salary is needed.":"당신은 매니저입니다. 그러므로 일당은 없습니다.",//D1150 문자열 추가
	"Salary details":"일당 상세정보",//D1106 문자열 추가
	"Gross salary":"총 일당",//D1106 문자열 변경

	"Economy Skill":"직업 스킬",
	"Economy skill details":"직업 스킬 정보",//D1106 문자열 추가
	"skill points":"스킬포인트",

	"Productivity:":"생산성:",
	"Productivity details":"생산성 상세",
	"Work booster":"작업 부스터",
	"Friend bonus":"친구 보너스",//D1065 문자열 추가
	"Citizenship bonus":"국적 보너스",
	"Resource bonus":"원료 보너스",

	"You worked":"당신은 ",
	"days in a row.":"일 연속으로 일하셨습니다.",
	"day in a row.":"일 연속으로 일하셨습니다.",
	"You need to work":"하드 워커 메달 달성까지 ",
	"more days to receive your 'Hard Worker' Medal":"일 남으셨습니다.",
	"Congratulations, you’ve been promoted to":"직업 스킬 레벨이 올랐습니다! - ",
//회사 설립
	"The company will be located in":"회사는 당신이 시민권을 가진 국가인",
	", your citizenship country":"에 설립될 것입니다.",
	"Funding fee":"설립 요금",
	"Free Land":"여분의 토지",
	"Not Passed":"부족!",
	"Passed":"통과",
	"Industry":"산업 종류",
	"Company Identity":"기업 정보",
	"Company name":"기업 명칭",
	"6-30 characters max":"6-30 글자 이내",
	"Company logo":"기업 로고",
	"Upload picture":"사진 업로드",
	"Create company":"기업 만들기",
    //오류메시지
//	"Please select an industry.":"산업 종류를 선택해주세요.",//영향없음
//	"Please enter a valid company name between 6 and 30 characters.":"기업 명칭은 6-30글자 이내로 해주세요.",//영향없음
//	"You cannot own two companies in the same industry.":"같은 산업의 기업을 2개 운영할 수는 없습니다.",//영향없음
//기업 세부사항
	"Raw materials":"원자재",
	"Grain stock":"곡물 재고",
	"Moving Tickets stock":"무빙티켓 재고",
	"Your company":"기업의 직원",
	"Recommended":"적정 인원",
	"Having a number of employees higher than the recommended value can result in reduced productivity.":"적정 인원보다 많은 직원을 고용하면 모든 작업의 생산성이 떨어지게 됩니다.",
	"employees":"명의 직원들",
	"Show Employees":"직원들 보기",
	"Market offers":"시장 매물",
	"Price with taxes":"가격(세금 포함)",
	"The company offers no products in this market":"이 시장에 내놓은 상품이 없습니다.",
	"The company cannot trade with this country due to a trading embargo.":"무역 금지령(트레이딩 엠바고)로 인해 이 시장과는 거래할 수 없습니다.",
//직원 세부정보
	"Employee":"직원",
	"Productivity":"생산성",
	"Offers":"구인",    //다른곳과 충돌
	"link":"link",
//Manage employees
	"Manage employees":"직원 관리",
	"Units produced:":"물품 생산량:",
	"Worker state":"직원 상태",
	"Mo":"월","Tu":"화","We":"수","Th":"목","Fr":"금","Sa":"토","Su":"일", 
	"This company has no job offers at the moment":"기업에 현재 진행중인 구인이 없습니다.",
//_/_/_/_/_/_/_/
//　훈련화면　_/
//_/_/_/_/_/_/_/
//Training grounds
	"Start training":"훈련 시작",
	"You have already trained today":"오늘은 이미 훈련하셨습니다.",
	"Improve your Strength level:":"Improve your Strength level:",//Day1081 애미없는 업뎃 ㅅㅂ
	"Your current Strength level:":"현재 힘 레벨:",
//	"Select skill to enhance:":"강화 능력 선택:",	//Day1081 제거
	"Choose an action to boost your strength":"훈련의 능률을 높이기 위한 부스터를 선택해주세요.",//D1081 문자열 업데이트
	"Choose 2 invited friends to boost your strength":"당신이 초대한 친구를 2명까지 선택해 훈련 능률을 높일 수 있습니다.",//D1081 문자열 업데이트
	"View train results":"훈련 결과 보기",
	"Train results":"훈련 결과",
	"Strength:":"힘:",
	"Training details":"훈련 상세내용",
	"Basic training":"기본 훈련",
	"Train booster":"훈련 부스터",
	"Friends bonus":"친구 보너스",
	"Natural enemy bonus":"국가 주적 보너스",
	"Please select a booster.":"부스터를 선택해주세요.",

//_/_/_/_/_/_/_/
//　정　　당　_/
//_/_/_/_/_/_/_/
//Community > My Party
	"Report party":"Report party",
	"You are not a member of a party" : "당신은 정당의 회원이 아닙니다.",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "당신은 정당에 가입할 수도 있고, 당신에게 맞은 정당을 찾으실 수 없다면 당신이 직접 정당을 만드실 수도 있습니다. 정당에 가입하여 회원들과 당 대표에 의해 당의 선거인으로 선출된다면, 당신은 국회의원이나 대통령 선거에 출마할 수 있습니다.",
	"Join a party" : "정당 가입",
	"Name":"이름",
//정보
	"Info":"정보",
	"Members"  : "회원들",
	"Orientation" : "성향",
	"Join party" : "정당 가입",
	"Show all members":"모든 회원 보기",
//계좌
	"Donate Gold":"골드 기부하기",
	"Show all donations":"모든 기부들 보기",
	"All donations":"모든 기부들",
//선거
	"Party presidency":"당 대표직",
	"Party President":"당 대표",
	"Congress":"국회",
	"congress members":"국회의원",
	"of Congress":"의회 좌석",
	"Next elections in" : "다음 선거일:",
	"one day":"1 일",
	"Election day":"선거일",
	"Vote":"투표",
	"Show candidate list" : "후보자 목록 보기",
	"Show proposed members":"제안된 후보자들 보기","of congress":"",
	"Edit presentation":"발표물 수정",
	"Resign candidacy":"선거 포기",
	"Country presidency":"대통령",
	"Show candidates list" : "후보자 목록 보기",
	"Our next candidate" : "우리의 다음 후보",
	"no goals selected":"목표가 선택되지 않음",
//정당 만들기
"Party details" : "정당 세부사항",
 "Party name" : "정당명",
 "Economical orientation" : "경제 정책 지향방향",
 "Choose economical orientation":"경제 정책의 지향 방향을 고르세요",
 "Far-left" : "좌파",
 "Center-left" : "중도좌파",
 "Center" : "중도파",
 "Center-right" : "중도우파",
 "Far-right" : "우파",
 "Social orientation" : "사회 정책 지향 방향",
 "Choose social orientation":"사회 정책의 지향 방향을 고르세요",
 "Totalitarian" : "전체주의자",
 "Authoritarian" : "독재주의자",
 "Libertarian" : "자유주의자",
 "Anarchist" : "무정부주의자",
 "Party logo" : "정당 로고",
 "Disscusion area" : "논의 장소",
 "Create":"설립",
//국회의원 후보
 "Party Page":"정당 지면",
 "Congress member candidates":"국회의원 후보자",
 "Party members can apply for congressional candidature each month between the 16th and 23rd.":"정당 소속인들은 매달 16일에서 23일중에 국회의원 후보자에 지원할 수 있습니다",
 "Party president can modify the final list only on the 24th of each month":"당 대표인은 매달 24일에만 최종 목록을 수정할 수 있습니다",
 "Choose region":"지역 선택",
 "No presentation":"소개 없음",
 "Presentation":"소개",
//대통령 후보
 "Edit campaign goals":"정책 목표 설정",
 "Reset campaign":"정책 재설정",
 "Add Goal":"목표 추가",
 "Activate campaign":"정책 실행",
 "Back to Party":"정당으로 돌아가기",
 "Goal type":"목표의 종류",
 "Mission":"임무",
 //"Ammount":"수량", 충돌함
 "Edit":"설정",
//당 대표
 "Edit party details":"정당 세부내용 설정",
 "Resign party presidency":"당 대표자 사퇴",
 "Propose candidate":"후보자 제안",
 "Run for presidency":"대표자 입후보",
 "Click the Update button to save the changes":"변화된 내용을 저장하기 위해서는 확인을 누르세요",
 "Update":"확인",
 "Replace":"취소",
//정당 가입 후
 "Congratulations, you are now a party member!":"축하합니다, 이제 당신은 정당의 일원입니다!",
 "Candidate":"후보자",
 "Run for congress":"국회의원 입후보",
 "Run for Congress":"국회의원 입후보",
 "Edit  the link to your presentation where you explain why citizens should vote for you in the Congress elections":"시민들이 왜 당신에게 투표를 해야하는지에 대한 설명이 담긴 발표의 링크를 설정하세요.",
 "Provide a link to your presentation where you explain why citizens should vote for you in the congressional elections":"시민들이 왜 당신에게 투표를 해야하는지에 대한 설명이 담긴 발표의 링크를 설정하세요.",
 "link to an external web address or a":"외부 웹주소를 링크합니다 또는",
 "private forum":"개인 포럼",
 "Agree":"동의",
 "Cancel":"취소",
//_/_/_/_/_/_/_/
//　신　　문　_/
//_/_/_/_/_/_/_/
//My places > Newspaper
 "You do not have a newspaper" : "당신은 신문을 가지고 있지 않습니다.",
 "A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "신문은 eRepublik 세계와 뉴스로 소통할수 있는 가장 효과적인 방법입니다. eRepublik 위키에서 자세한 내용을 참고하세요. 자신의 신문을 만드세요.",
    //신문 제작
 "Newspaper details" : "신문 세부내용",
 "Newspaper name" : "신문 이름",
 "6-25 characters max":"6-25 캐릭터 최대치",
 "Newspaper Avatar" : "신문 아바타",
 "only JPG files allowed":"JPG 파일만이 사용 가능합니다",
 //신문 구독
 "today":"금일",
 "Subscribe":"구독",
 "Unsubscribe":"구독 취소",
 "ShareThis" : "공유",
 "Report article":"보도",
 "Report comments":"코멘트 보도",
 "Subscribe to comments" : "코멘트 구독",
 "Your comment" : "당신의 코멘트",
 "Post a comment" : "코멘트 게재",

//신문 관리
"You do not have any articles, if you want to write an article you should enter here:":"아직 쓰여진 기사가 없습니다. 기사를 쓰고싶으시면 여기에 입력하세요:",
"Write article":"기사 쓰기",
"Edit newspaper details":"신문 세부정보",
	//쓰기
"Title":"제목",
"Article":"내용",
"Publish":"출판",
	//신문 세부정보
"Description":"설명",
"Change the location of your newspaper":"신문의 위치 변경하기",
"Newspaper logo":"신문 로고",
//_/_/_/_/_/_/_/
//　조　　직　_/
//_/_/_/_/_/_/_/
//My places > Organizations
//	"My Organizations" : "나의 조직",
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "조직에 로그인하려면, 먼저 시민 계정에서 로그아웃 하신 후 조직용 유저네임과 패스워드로 다시 로그인하셔야 합니다.",
	"Organizations created by you:" : "조직 설립자:",
	"You have not created any organization yet." : "당신은 아직 어떠한 조직도 만들지 않았습니다.",
//페이지 작성
	"Your account":"계정",
	"Requirements" : "필요 사항",
	"Cost" : "가격",
	"Organization details" : "조직 정보",
	"Organization name" : "조직명",
	"4-30 characters max":"4-30글자 이내",
	"Your email address:" : " 이메일:",
	"Retype password":"비밀번호 재확인",
	"Please select a country":"국가를 선택하세요.",
	"eRepublik region" : "eRepublik 지역",
	"Organization logo" : "조직 로고",
	"Complete the challenge:":"확인 코드를 입력하세요:",
	"Register":"등록",
//데이터 수정
	"Your managers (":"관리자 (",
	"Add managers":"관리자 등록",
	"Organization Avatar":"조직 이미지",
//_/_/_/_/_/_/_/
//　상태관리　_/
//_/_/_/_/_/_/_/
//관리
	"Hello, Congress Member":"안녕하십니까, 국회의원님.",
	"You are not a president or a congress member in this country.":"당신은 대통령이나 국회의원이 아닙니다.",
	"Law proposals" : "발의된 법안들",
	//발의 내용
	"Propose a law":"법안 발의",
	"Minimum wage":"최저 임금 법안",
	"President Impeachment":"대통령 탄핵안",
	"Provide citizenship":"시민권 제공",
	"details" : "자세히",
	"Accepted" : "수락됨",
	"Rejected" : "거절됨",
	"Pending" : "보류중",
    //관련 기사
	"Country Administration":"상태 관리",
//회원 발의
	"Debate location (optional)":"토론 장소(선택적)",
	"Propose":"발의",
	"Ammount":"총액",
	"Amount":"총계",
	"Set new":"Set new",
	"Choose industry":"산업 선택",
	"Value Added Tax":"부가가치세",
//_/_/_/_/_/_/_/
//　광고대행　_/
//_/_/_/_/_/_/_/
	"1. Create your ad":"1. 建立您的廣告",
	"Easily create your ad - no design or coding skills needed.":"輕鬆創建您的廣告 - 不用設計或編碼所需的技能。",
	"Include both graphical and text-based content, all within a live preview.":"包括圖形和文字內容，全部都可即時預覽。",
	"Easily edit the content of your ad to increase results.":"輕鬆編輯您的廣告內容，以增加效果。",
	"2. Target your ad":"2. 定位您的廣告",
	"Target by type of location and/or citizen.":"選擇服務對象類別的位置/或公民",
	"Choose to display your ad in the entire New World or within a very specific country or region.":"選擇顯示您的廣告在整個新的世界或在特定的國家或地區。",
	"Choose to display your ad to all citizens of the New World or to a very specific group of citizens - from regular employees to congressmen.":"選擇向新世界所有公民或一個非常特定群體的公民顯示您的廣告 - 從正式員工到國會議員均可。",
	"3. Budget your ad":"3. 您的廣告預算",
	"Use your citizen's Gold account, as well as your company or party's accounts.":"用您的公民的黃金帳戶，也可以是您的公司或黨的帳戶。",
	"View real time statistics regarding impressions, budget spent and clicks":"查看即時統計有關的資料，預算支出和點擊",
	"Fund your decisions on increasing or decreasing budget.":"決定增加或減少預算的基金。",
	"Create an ad":"建立廣告",
//建立頁面
	"Create your ad":"建立您的廣告",
	"Live preview":"即時預覽",
	"Will refresh when content is added.":"隨時更新廣告的預覽畫面",
	"You may only advertise content located on erepublik.com.":"您只能在eRepublik.com宣傳您的廣告內容。",
	"Language:":"語言:",
	"Only citizens using eRepublik in this language will be viewing this ad":"只有選擇該語言的eRepublik公民才看的到這個廣告",
	"Title:":"標題:",
	"Content:":"內容:",
	"Picture:":"圖片:",
	"Upload photo":"上傳圖像",
	"Link:":"連結:",
	"Only internal eRepublik links are allowed":"只允許eRepublik內部的鏈接",
	"Target your ad":"定位您的廣告",

//============================================================================

//_/_/_/_/_/_/_/
//　시장　_/
//_/_/_/_/_/_/_/
 "Durability":"내구성",
 "Fire Power":"화력",
 "Fire power":"화력",
 "Moving Distance":"거리 이동",
 "Search for product":"검색 제품",
// "Select minimum requirements":"최소 요구 사항을 선택하십시오",
 "Select minimum quality":"최소 품질 선택",
 "Show results":"결과표시",
 "There are no market offers matching you search.":"검색한 제품이 시장에 존재하지 않습니다.",
 "Cancel":"취소",
 "Change":"변경",
 "Product":"제품",
 "Provider":"공급자",
 "Stock":"재고",
 "Price":"가격",
 "Quantity":"양",
 "Buy":"구매",
//_/_/_/_/_/_/_/
//　외환시장　_/
//_/_/_/_/_/_/_/
 "Sell":"판매",
 "Show my offers" : "내 매물 보기",
 "Show all offers" : "모든 매물 보기",
 "Post new offer" : "새 매물 게시",
 "Rec exchange rate" : "권장환율",
 "Amount":"총액",
 "Exchange rate":"환율",    
 "Amount to buy":"구매 가격",
 "Prev":"뒤로",
 "Get Gold" : "황금 구매",
//_/_/_/_/_/_/_/
//　고용시장　_/
//_/_/_/_/_/_/_/
 "Skill level":"기술 수준",
 "Sorry, there are no jobs available at the moment that match your search criteria!":"죄송합니다. 귀하의 검색 기준과 일치하는 직업이 존재하지 않습니다.",
 "Daily salary":"일일 급여",
 "Apply":"적용",
    //동의
 "Congratulations, you are now working for this company.":"축하합니다. 당신은 이제부터 회사에서 근무하실 수 있습니다.",
//_/_/_/_/_/_/_/
//　회사 양도　_/
//_/_/_/_/_/_/_/
 "Product details":"제품 세부 사항",
 "There are no companies for sale matching you search.":"귀하의 검색 기준과 일치하는 기업이 존재하지 않습니다.",
 "You can not buy a company from another country.":"당신은 다른 나라에서 회사를 살 수 없습니다.",
//============================================================================
//_/_/_/_/_/_/_/
//　게임랭킹　_/
//_/_/_/_/_/_/_/
//시민
//회사소개
 "Companies":"회사",
 "Sort by" : "정렬",
 "No. of Employees" : "고용자 수",
 "Select industry":"산업 선택",
 "All industries":"모든 산업",
//신문사
 "Newspapers" : "신문",
 "Subscribers" : "구독자",
//국가
 "Countries":"국가",
 "Experience points":"경험치",
 "( Average Experience )":"(평균 경험치)",
 "Population number" : "인구",
//정당
 "Parties" : "정당",
//_/_/_/_/_/_/_/
//　상태 데이터　_/
//_/_/_/_/_/_/_/
 "Select":"선택",
 "Donate" : "기증",
 "On the Map":"지도에서",
//메뉴
 "National Goals" : "국가 목표",
 "Society":"사회",
 "Economy":"경제",
 "Politics":"정치",
 "Military":"군사",
 "Administration":"관리",
//국가목표
 "Current national goals" : "현재 국가 목표",
 "The elected president has not set any national goals for this month." : "대통령이 이번 달에 대한 국가 목표를 설정하지 않았습니다.",
 "check current status":"현재 상태 확인",
 "At least one national goal needs to be achieved each month in order to receive a monument.":"국가 기념비를 얻기 위해선 적어도 하나의 목표를 달성해야합니다.",
 "Monuments achieved":"기념물 달성",
//사회
 "National Chat Room" : "국가 채팅방",
 "Join":"가입",
 "Citizens":"시민",
 "Total citizens" : "총 시민",
 "New citizens today" : "오늘자 새로운 시민",
 "Citizenship requests":"시민권 요청",
 "View requests":"상태 보기",
 "Average citizen level" : "평균 시민 레벨",
 "Online now": "현재 접속자",
 "Who" : "누구",
 "Citizen fee" : "시민지원금",
    //접속자 보기
     "Region":"지역",
     "All regions":"모든 지역",
    //상세정보
     "Country - Society":"국가 - 사회",
     "Population":"인구",
     "Constructions":"건설",
     "Resource":"자원",
     "Resistance War" : "저항전쟁",
     "You cannot start a resistance war in this region because it already belongs to its original owner country." : "이곳은 이미 원소유자에 속해있기 때문에 저항 전쟁을 할 수 없습니다.",
     "Neighbors" : "이웃나라",
    //새 도착
     "Approved":"승인",
     "There are no pending citizenship applications.":"대기중인 시민권 신청서가 있습니다.",
     "Citizen":"시민",
     "Details":"내용",
     "Citizenship passes":"시민권을 전달합니다.",
     "Accept":"동의",
     "Resident since:":" 거주 시작일 :",
  "Expires:":"승인 :",
     "Approved on":"승인",
     "Approved by":"승인",
//경제
 "Resource list":"자원 목록",
 "Regions":"지역",
 "Not available":"사용할 수 없음",
 "Treasury":"재무부",
 "All accounts":"모든 계정",
 "Taxes":"세금",
 "Income Tax":"소득세",
 "Import Tax":"관세",
 "VAT":"부가 가치세",
 "Country trading embargoes":"국가 무역 금지",
 "This country can trade with any other country in eRepublik.":"이 나라는 eRepublik의 다른 국가와 무역할 수 있습니다.",
 "Salary":"급여",
 "Minimum":"최소",
 "Average":"평균",
 "Gross domestic product (GDP)":"국내총생산（GDP）",
 "Monthly exports":"월 수출",
 "Monthly imports":"월 수입",
 "Inflation":"인플레이션",
//정치
 "President":"대통령",
 "Election results":"선거 결과",
 "Next elections":"다음 선거",
//군사
 "Natural enemy":"적성국",
 "The citizens of this country will be provided with a +10% war influence bonus in the military campaigns against the Natural Enemy.":"시민들은 주적으로 설정된 적성국과의 전쟁에서 +10%의 전쟁 영향력을 가지게 됩니다.",
 "No current Natural Enemy":"현재 적성국이 없습니다.",
 "This country is not involved in any war.":"이 나라는 어떠한 전쟁에도 관여하지 않습니다.",
 "All wars" : "모든 전쟁들",
 "There are no resistance wars in this country." : "이 나라엔 저항전쟁이 없습니다.",
 "All resistance wars" : "모든 저항 전쟁",
 "Alliances":"동맹",
 "All Alliances" : "모든 동맹국",
//대만
"Active wars in Republic of China (Taiwan)":"대만과의 전쟁",
"Active resistance wars in Republic of China (Taiwan)":"대만의 저항 전쟁",
//_/_/_/_/_/_/_/
//　전쟁 목록　_/
//_/_/_/_/_/_/_/
 "War types":"전쟁 유형",
 "Conquest wars":"정복 전쟁",
 "Resistance wars":"저항 전쟁",
 "War status" : "전쟁 상태",
 "Active wars" : "지속적인 전쟁",
 "Ended wars" : "종료된 전쟁",
 "Countries involved" : "관여 국가",
 "no allies" : "동맹없음",
 "no active battles" : "진행중인 전투 없음",
//_/_/_/_/_/_/_/
//　세계지도　_/
//_/_/_/_/_/_/_/
 "Go to eRepublik":"eRepublik으로 이동",

//============================================================================

//_/_/_/_/_/_/_/
//　친구초대　_/
//_/_/_/_/_/_/_/
	"status":"당신이 초대한 친구들의",
	"of the friends you invited.":"상태",
	"Your personal invitation link":"당신의 친구 초대(추천인) 주소",
	"Post this link on forums, blogs, messenger status or send it by yourself via email.":"이 링크를 포럼, 블로그 또는 메신저 프로필에 띄우거나 이메일로 직접 보내세요. WGSC 카페에는 올리지 마세요, 그곳에서 추천인 주소는 영구 추방의 사유가 됩니다.",
	"Send via :":"전달 수단:",
	"Invites status":"초대 상태",
	"View the status of your invites and bonuses":"친구 초대와 그로 인한 보너스 상황을 볼 수 있습니다.",
	"Track invites":"초대 추적하기",
	"Send email invite":"초대 이메일 보내기",
	"You are allowed to create and administrate ONLY one eRepublik citizen.":"eRepublik에서는 한 사람당 단 하나의 시민만을 만들고 관리할 수 있습니다.",
	"Breaking this rule you will face the risk of having all your citizen accounts suspended.":"이 규칙을 어기실 경우에는 당신의 모든 계정이 이용 정지될 수 있음에 유의하세요.",
	"Your name:":"당신의 이름:",
	"Import your contacts:":"이메일 불러오기:",
	"Invitations left:":"남은 초대회수:",
	"Invite your friends and get 10% of all Gold they will receive in eRepublik from Treasure Maps and purchases.":"친구를 초대하면 그들이 보물 지도와 골드 구입 등에 의해 벌어들인 모든 골드의 10%를 얻을 수 있습니다.",
	"Facebook invite":"페이스북 초대",

//_/_/_/_/_/_/_/
//　선　　거　_/
//_/_/_/_/_/_/_/
	"Election":"선거",
	"Presidential elections" : "대통령 선거",
	"Congressional elections" : "국회의원 선거",
	"Party elections" : "정당 선거",
	"Official Results":"공식 결과",
	"Goals":"목표",
	"Total votes:":"총 투표수:",
	"Presence:":"참석수:",
	"No information available":"정보 이용 불가",
	"Month/Year":"월/년",
	//투표
	"Select a party":"후보자들을 보기 위해",
	"to show it's candidates":"정당을 선택하세요.",
	//대통령 후보
	"Supporting parties":"후원하는 정당",
	
//_/_/_/_/_/_/_/
//　뉴　　스　_/
//_/_/_/_/_/_/_/
	"Top rated news" : "주요 뉴스",
	"Latest news" : "최근의 뉴스",
	"Latest events" : "최근의 사건",
		
//_/_/_/_/_/_/_/
// 이미지링크 _/
//_/_/_/_/_/_/_/
	"Invite your friends and get 10% of all Gold they will receive in eRepublik from Treasure Maps and purchases by adding a badge to your e-mail signature, website, blog and more! It’s easy:":"친구를 초대하고 친구가 얻는 모든 골드의 10%를 얻어보세요! 초대를 위해 이 이미지들을 이메일, 웹사이트, 블로그 등에 올릴 수 있습니다. 과정은 간단합니다：",
	"1. Pick your favorite badge":"1. 마음에 드는 뱃지를 선택하고",
	"2. Copy the code from the box next to it. Use Ctrl + C if you’re on a PC, Cmd + C if you’re on a Mac.":"2. 그 옆에 있는 박스칸에서 코드를 복사하세요. PC일경우 Ctrl + C 사용하고, 맥일 경우 Cmd + C 를 사용하세요.",
	"3. Paste the code anywhere you want your badge to appear.":"3. 아무곳에나 붙여넣기 하면, 뱃지가 나타날겁니다.",

//_/_/_/_/_/_/_/
//　규　　정　_/
//_/_/_/_/_/_/_/
	"New eRepublik Laws":"새로운 eRepublik의 법",
	"Dear citizen of the New world, here are the eRepublik Laws. Breaking in any way these rules will result in immediate fearsome penalties that can range from forgotten secret bronze age torture techniques to permanent bans.":"새로운 세계의 시민들에게 알립니다. 여기에는 eRepublik의 법들이 있습니다. 이 규칙들을 어길 시에는 청동시 시대에나 있을법한 원시적 고문부터 영구적인 계정 정지까지, 다양한 처벌들이 기다리고 있음을 알립니다.",//
	"Thou shall not contaminate the New World with filth such as External advertising, Spam, Insults, Pornography, Vulgarity or Racism.":"당신은 음란물이나, 인종 차별, 모욕, 외부 광고 등으로 이 세상을 오염시켜선 안됩니다.",
	"Thou shall not obtain any properties or gains through illegal means such as cheating, betting, bugs or exploits.":"당신은 그 어떠한 버그, 속임수, 불법적 수단도 사용해서는 안됩니다.",
	"Thou shall not create or administrate multiple accounts.":"당신은 복수의 계정을 만들거나 관리해서는 안됩니다.",
	"Read more in the":"더 많은 정보 -","eRepublik Enciclopedy":"eRepublik 법규",
	"Read more about":"숙지하세요 -","penalties":"제재들","laws":"법",
	"eRepublik Penalties":"eRepublik의 처벌들",
//============================================================================

//_/_/_/_/_/_/_/
//　골드메뉴　_/
//_/_/_/_/_/_/_/
	"Gold":"골드",
	"Special Offer:":"특별 판매:",
	"Extra Gold":"추가 골드!",
	"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to buy additional features within eRepublik." : " eRepublik에서 골드는 아주 중요한 재화 단위로써, 이것은 매우 다양한 용도로 사용됩니다.",
	"Select amount " : "수량 선택",
	"Payments can be made in US Dollar as well." : "달러 결제도 가능합니다.",
	"Select payment option":"결제수단 선택",
	"Please choose a payment option":"결제 수단을 선택해주세요.",
	"is a fictional currency used only in the eRepublik World." : "이 가상의 화폐는 eRepublik 세계 내에서만 사용 가능합니다.", 
	"Buy now" : "구입하기",

//_/_/_/_/_/_/_/
//　추가창고　_/
//_/_/_/_/_/_/_/
	"Extra Storage": "추가 창고",

//_/_/_/_/_/_/_/
//　보물지도　_/
//_/_/_/_/_/_/_/
	"Treasure" : "보물","Maps":"지도",
	"no maps" : "지도 없음",
	"Use a Treasure Map":"보물지도 사용",
	"Use the Treasure Map":"보물지도 사용",
	"Centuries ago, citizens buried their Gold for safekeeping, using Treasure Maps to mark the treasure site. If you have a map use it wisely and you may keep whatever you find. If you are extremely lucky you could even unearth part of the legendary Treasure of Kings." : "오래 전, 시민들은 그들의 골드를 어딘가에 감추어두고 보물지도에 그 위치를 표시해 두었습니다. 만약 그 지도를 얻어 보물을 찾아낸다면 당신은 골드를 얻을 수 있을 것입니다. 그리고 정말 운이 좋다면, 전설로 전해지는 왕의 유물을 찾아낼 수도 있습니다.",
	"within 30 days they become unreadable." : "30일 안에 사용할 수 없게 됩니다.",
	"Treasure Maps are awarded for:" : "Treasure Maps are awarded for:",
	"Gaining an achievement":"Gaining an achievement",

//_/_/_/_/_/_/_/
//　골드보너스　_/
//_/_/_/_/_/_/_/
	"Track your gold bonus":"골드 보너스 습득",
	"Each Gold Bonus needs to be collected within 30 days or you will lose it. We recommend you collect the Gold at least twice per month.":"골드 보너스를 30일 안에 받아가지 않으면 보너스는 사라집니다. 한달에 최소한 두번은 골드 보너스에 관한 안내 메시지가 갈 것입니다.",
	"Collected Gold":"골드 얻기",
	"Invite your friends":"친구를 초대하세요.",
	"Invite more friends and boost your chances to get more Gold!":"친구를 더 초대해서 더 많은 보너스를 얻어보세요.",
//_/_/_/_/_/_/_/
//　體力恢復　_/
//_/_/_/_/_/_/_/
	"Health:":"체력:",

//============================================================================

//_/_/_/_/_/_/_/
//　系統訊息　_/
//_/_/_/_/_/_/_/
//Inbox
 "Inbox":"받은 편지함",
 "Select all":"전체 선택",
 "Delete":"삭제",
//Sent
 "Sent":"보낸 편지함",
 "Subject":"제목",
 "Message":"메세지 내용",
 "Send":"보내기",
 "No messages found.":"메세지를 찾을 수 없습니다.",
//Alerts
 "Alerts":"알림 메세지",
// "Congratulations, you have reached experience level 2. To reach level 3 you need 4 experience points.":"축하합니다! 레벨 2가 되셨습니다. 레벨 3까지는 4의 경험치가 필요합니다.",
// "Congratulations, you have reached experience level 3. To reach level 4 you need 6 experience points.":"축하합니다! 레벨 3이 되셨습니다. 레벨 4까지는 6의 경험치가 필요합니다.",
// "Congratulations, you have reached experience level 4. To reach level 5 you need 8 experience points.":"축하합니다! 레벨 4가 되셨습니다. 레벨 5까지는 8의 경험치가 필요합니다.",
// "Congratulations, you have reached experience level 5. To reach level 6 you need 10 experience points.":"축하합니다! 레벨 5가 되셨습니다. 레벨 6까지는 10의 경험치가 필요합니다.",
/*
 "Congratulations, you have reached experience level 6. Now you have the possibility to fight in wars. To reach level 7 you need 15 experience points.":"축하합니다! 레벨 6이 되셨습니다. 당신은 이제 전투에 참여할 수 있습니다. 레벨 7까지는 15의 경험치가 필요합니다.",
 "Congratulations, you have reached experience level 7. Now you have the possibility to change your location and citizenship. To reach level 8 you need 20 experience points.":"축하합니다! 레벨 7이 되셨습니다. 당신은 이제 이주와 시민권 획득이 가능합니다. 레벨 8까지는 20의 경험치가 필요합니다.",
 "Congratulations, you have reached experience level 8. Now you have the possibility to collect Gold from friends you have invited in eRepublik. To reach level 9 you need 30 experience points.":"축하합니다! 레벨 8이 되셨습니다. 당신은 이제 당신이 초대한 친구로부터 도착한 골드를 얻을 수 있습니다. 레벨 8까지는 30의 경험치가 필요합니다.",
 "Congratulations, you have reached experience level 9. Now you have the possibility to create a newspaper. To reach level 10 you need 70 experience points.":"축하합니다! 레벨 9가 되셨습니다. 당신은 이제 신문을 낼 수 있습니다. 레벨 10까지는 70의 경험치가 필요합니다.",
// "Congratulations, you have reached experience level 10. Now you have the possibility to create ads and you also have received a Gold Treasure Map. You have until day 1,093 before the markings on the brittle paper will have faded away. To reach level 11 you need 50 experience points. ":"축하합니다! 레벨 10이 되셨습니다. 당신은 이제 광고를 만드실수 있고, 보물지도를 획득하셨습니다. 허나, 그 보물지도는 낡고 얇은 종이이기 떄문에, 지금으로부터 30일 후에는 형체를 구분할 수 없습니다.레벨 11까지는 110의 경험치가 필요합니다.",
 "Congratulations, you have reached experience level 11. Now you have the possibility to create a chat room. To reach level 12 you need 60 experience points.":"축하합니다! 레벨 11이 되셨습니다. 당신은 이제 채팅방을 만들 수 있습니다. 레벨 12까지는 60의 경험치가 필요합니다.",
 "Congratulations, you have reached experience level 12. Now you have the possibility to create companies and organizations. To reach level 13 you need 70 experience points.":"축하합니다! 레벨 12가 되셨습니다. 당신은 이제 회사와 조직을 만들 수 있습니다. 레벨 13까지는 70의 경험치가 필요합니다.",
 "Congratulations, you have reached experience level 13. Now you have the possibility to join a party. To reach level 14 you need 80 experience points.":"축하합니다! 레벨 13이 되셨습니다. 당신은 이제 정당에 입당할 수 있습니다. 레벨 14까지는 80의 경험치가 필요합니다.",
 "Congratulations, you have reached experience level 14. Now you have the possibility to vote in the elections. To reach level 15 you need 100 experience points.":"축하합니다! 레벨 14가 되셨습니다. 당신은 이제 투표를 할 수 있습니다. 레벨 15까지는 100의 경험치가 필요합니다.",
//
 "Congratulations, you have reached experience level 16. Now you have the possibility to create your own party or to be a candidate for the party president seat. To reach level 17 you need 150 experience points.":"축하합니다! 레벨 16이 되셨습니다. 당신은 이제 당을 창당할 수 있습니다. 레벨 17까지는 150의 경험치가 필요합니다.",
 "Congratulations, you have reached experience level 17. Now you have the possibility to start resistance wars. To reach level 18 you need 200 experience points.":"축하합니다! 레벨 17이 되셨습니다. 당신은 이제 저항전쟁을 시작 할 수 있습니다. 레벨 18까지는 200의 경험치가 필요합니다.",
 "Congratulations, you have reached experience level 18. Now you have the possibility to be a candidate for the country president seat. To reach level 19 you need 300 experience points.":"축하합니다! 레벨 18이 되셨습니다. 당신은 이제 대통령후보에 출마 할 수 있습니다. 레벨 19까지는 300의 경험치가 필요합니다.",
*/
 "Select All":"전체 선택",
 "After 5 days the alerts are automatically deleted":"알림 메세지는 5일이 지나면 삭제됩니다.",
 "Gold Treasure Map":"보물지도",
 "donations list":"기부 리스트",
//Subscriptions
 "Subscriptions":"구독",
 "new article" : "새 문장",
 "Weekly news":"이주의 소식",
 "Weekly mail presenting the top rated news, active wars, military events and top five countries in eRepublik":"이주의 소식은 이 주에 있었던 전쟁, 전투, 흥미로운 뉴스들과 Top 5 국가들을 알려드립니다.",
 "show example":"미리보기",
 "Turn ON":"설정",
 "Turn OFF":"해제",
 "Newer":"새글 보기",
 "Older":"예전글 보기",
//_/_/_/_/_/_/_/
//　초보임무　_/
//_/_/_/_/_/_/_/
"Hint:":"힌트:",
"Reward":"상",
/*
//We are all warriors
"We are all warriors":"우리 모두가 병사!",
"In this new and dangerous world your country needs the strongest warriors in order to defend itself or conquer new territories. All must help now and the strength of a warrior is measured first of all by his Military Skill.":"새롭고 위험한 이 세계에서 국가는 안보를 지키기 위해 강한 병사들을 필요로 합니다. 강한 병사를 구분하는 방법은, 바로 군사 스킬입니다.",
"Train for the first time":"첫 훈련을 실행하세요",
"Unlock for 3":"3 으로 언락",
"You can build up your Military Skill by going daily to the":"당신은 매일 당신의 군사 스킬을 올릴수 있습니다.",
"Training Area":"훈련장",

//Food is scarce
 "Food is scarce":"음식 부족",
//"The more food you have in your inventory the more you are protected against hard times when your health will be low and market supplies depleted.":"당신의 인벤토리에 음식이 많이 있으면 있을수록 당신이 체력이 낮고 빵공급이 적을때와 같은 어려운 시간을 버틸기가 쉽습니다."
 "Have 3 food in inventory.":"3개의 음식이 당신의 인벤토리에 있어야 합니다.",
 "New companies have emerged and they should have food for sale in the":"새로운 회사들이 생겨났습니다, 그 회사들은 음식을 어디에 팔아야 합니다.",

//Join the rebuilding effort
 "Join the rebuilding effort":"직장을 구하세요",
 "The economy is in turmoil and new companies have emerged. Getting a job allows you to work daily, receive a constant salary and helps strengthen your country's economy.":"경제가 혼란스럽고 새로운 회사들이 출현하고 있습니다, 직장을 찾는것은 당신에게 매일 월급이 나오고, 그 월급은 국가의 경제를 활성화 시키는데 도움을 줄 것입니다.",
 "Have a job.":"직장 구하세요",
 "Unlock for 1":"언락에 들어가는 돈 1",
 "Work at least once.":"일을 한번 하세요",
 "You should first find a job in the":"당신은 직장을 구해야 합니다",
 "Job Market":"잡마켓에서",
 "and then Work in your new Company.":"그후에 당신의 직장에서 일을 해야 합니다.",

//Image matters
	"Image matters":"형상문제",
	"When interacting with the citizens of the new world (friends, co-workers, comrades, voters, etc) your image will be worth a thousand words.":"이 새로운 세계에서 시민들이과 말을 할때 당신의 이미지는 천개의 말보다 중요할 것입니다.",
	"Have a profile picture.":"프로필 사진을 구하세요",
	"Upload a photo or image that will define how your citizen looks from the":"당신을 구분할수 있는 사진을 업로드 하세요",
	"Edit profile page":"프로필 페이지 수정",

//Offense is the best defense 공격이 최선의 방어
	"Offense is the best defense":"공격이 최선의 방어",
	"It's easier to take down enemies when you have a good weapon than with your bare hands.":"맨손일 때 보다는 좋은 무기를 들고 있을 때 적을 쓰러트리기가 더 쉽습니다.", //感謝PTT_RJJ提供修正
	"Have 3 weapons in your inventory.":"3개의 무기를 당신의 인벤토리에 보유하세요.",
	"The":"", //感覺衝突性很高...
	"offers a great variety of weapons.":"많은 무기들을 제공합니다.",

//A future Hero 미래의 영웅
	"A future Hero":"미래의 영웅",
	"Take down 5 opponents.":"5명의 적들을 쓰러트리세요.",

//Working days 일하는 날들
	"Working days":"일하는 나날들",
	"A strong nation can survive only based on a strong economy. A strong economy is based on a productive and efficient workforce.":"튼튼한 경제력은 강한 국가의 기반이 되고, 경제력의 기반은 바로 효과적이고 생산적인 일꾼들입니다.",
	"Work for 5 days in a row.":"5일 연속으로 일하세요.", //感謝PTT_RJJ提供修正

//Society builder 사회 건설자
	"Society builder":"사회 건설자",
	"You can be really powerful only by having your friends near you.":"가까운 곳에 친구들이 있을 때, 당신은 진정으로 강해질 수 있습니다.",
	"Get the Society Builder Achievement.":"사회 건설자 업적을 달성하세요.",
	"Invite":"10명을",
	"10 people to eRepublik and help them reach level 10.":"Erepublik에 초대하고 그들이 10레벨을 달성하도록 도와주세요.",
		
//Find El Dorado - Prepare for the journey
	"Find El Dorado - Prepare for the journey":"엘도라도를 찾아서 - 여행 준비",
	"Train 5 days in a row.":"5일 연속으로 훈련하세요.",
	"Have 5 weapons in your inventory.":"5개의 무기를 당신의 인벤토리에 보유하세요.",
	"Have 8 moving tickets in your inventory":"8개의 무빙티켓을 당신의 인벤토리에 보유하세요.",
*/
//_/_/_/_/_/_/_/
//　국　　회　_/
//_/_/_/_/_/_/_/
//발의된 법안
	"ACCEPTED":"통과됨",
	"REJECTED":"거절됨",
	"The law voting process takes 24 hours.":"법안 투표 과정에는 24시간이 소요됩니다.",
	"Yes":"찬성",
	"No":"반대",
	"Only congress members and country presidents have the right to vote.":"대통령이나 국회 구성원들에게만 투표 자격이 있습니다.",
	"For this law to be considered accepted it needs 66% of the Congress votes.":"법안이 통과되기 위해서는 국회에서 66% 이상의 지지를 얻어야 합니다.",
	"Show all law proposals":"발의된 모든 법안 보기",
	//추가
	"Value added tax (VAT)" : "부가가치세 (VAT)",
	"New":"새것",
	"Old":"예전",
	"Attention: No VAT tax for raw materials":"주의 : 원자재에 대해서는 부가가치세가 없습니다.",
	"Debate Area":"토론 장소",
		
//_/_/_/_/_/_/_/
//　세금관련　_/
//_/_/_/_/_/_/_/
 "Buy Constructions":"건물 구입",
 "Peace Proposal":"평화협정 제의",
 "Natural Enemy":"적",
 "Alliance" : "동맹",
 "New Citizen Message":"신규 시민 메세지",
 "New Citizen Fee" : "새로운 시민 지원금",
 "New citizen fee":"새로운 시민 지원금",
 "Issue Money":"화폐 발행",
 "Minimum Wage" : "최저 임금",
 "Tax change: Food":"세율 조정: 음식",
 "Tax change: Moving Tickets":"세율 조정: 무빙 티켓",
// "Tax change: Tank":"세율 조정: 탱크",
// "Tax change: Air Unit":"세율 조정: 기체",
// "Tax change: Rifle":"세율 조정: 소총",
// "Tax change: Artillery":"세율 조정: 자주포",
 "Tax change: Weapons":"세율 조정: 무기",
 "Tax change: House":"세율 조정: 가옥",
 "Tax change: Defense System":"세율 조정: 방어 체계",
 "Tax change: Hospital":"세율 조정: 병원",
 "Tax change: Stone":"세율 조정: 석재",
 "Tax change: Oil":"세율 조정: 석유",
 "Tax change: Grain":"세율 조정: 농작물",
// "Tax change: Titanium":"세율 조정: 티타늄",
 "Tax change: Iron":"세율 조정: 철재",

//_/_/_/_/_/_/_/
//　기업경영　_/
//_/_/_/_/_/_/_/
"Your companies":"당신의 기업",
"Migrate industry":"산업 변경",
"work as Manager":"관리자로 일함",//D1150 추가
"work as employee":"직원으로 일함",
"resign":"사직",
"view work results":"업무 결과 보기",//D1150 추가
"view results":"결과 보기",
"Transfer to citizen":"시민으로 전환",
"Manager's citizenship bonus":"관리자의 국적 보너스",
"Owner":"사장",
"New owner":"새로운 사장",
"Transfer company":"이직",
"New industry":"신규 산업",
"Check resources":"원자재 확인",
"Productivity bonus:":"생산성 보너스:",
"Raw material bonus":"원자재 보너스",
"Edit details":"세부 사항 조정",
"Company description":"회사 설명",
"Sell company":"회사 판매",
"Company profile":"회사 프로필",
"Finances":"재정",
"Buy raw materials":"원자재 구입",
"Manage":"관리",
"Sell products here":"제품을 이곳에 판매합니다",
"Buy market license":"해외 판권 구매",
//이전
"Transfers":"전환",
"Your accounts":"당신의 계좌",
"Company accounts":"회사의 계좌",
"Invest":"기업으로",
"Collect":"계정으로",
 
//계정 잔액
"Account balance":"잔고",
"Account:":"장부:",
"Cash reserves:":"여분의 돈",
//gold
"Incomes":"수입",
"Investments:":"투자:",
"Monetary market exchange:":"화폐 시장 전환:",
"QL downgrade:":"퀄리티 다운그레이드:",
"Expenses":"지출",
"Export licenses:":"수출 라이센스:",
"QL upgrade:":"퀄리티 업그레이드:",
"Collect profit:":"이윤 집산:",
"Total:":"총계:",
"Profit/loss:":"수익/손실:",
//자금
//(수입)
"Product sales:":"제품 판매량:",
//(지출)
"Salaries:":"임금 지출:",
"Raw materials:":"원자재:",
"Taxes:":"세금:",
"- VAT:":"- 부가가치세:",
"- Income taxes:":"- 직접세:",
"- Import taxes:":"- 관세:",

"Sales history":"판매 기록",
"Sold products":"팔린 물품",
"Price:":"가격:",
"Income:":"수입",
//직원 관리
"This company has no employees at the moment":"이 회사에는 현재 구인 광고가 없습니다.",
"Add a job offer":"구인 광고 추가",
"Select skill":"기술 레벨 선택",
"Save":"결정",

//_/_/_/_/_/_/_/
//　 ＰＩＮ 　_/
//_/_/_/_/_/_/_/
"Generate pin code":"PIN코드 생성",
"Generate security PIN":"보안PIN 생성",
"In order to ensure a better and safer experience in the New World, we have implemented a new security measure: Personal Security PIN. First, please enter your password below, so that you can generate your security PIN..":"새로운 세상에서의 더욱 안전하고 나은 경험을 위해, 저희는 새로운 보안 체계를 시행하고 있습니다. 그것은 바로 개인 보안 PIN코드 입니다. 먼저, 당신의 비밀번호를 밑에 적어주시기 바랍니다. 그것으로 당신은 안전 PIN코드를 생성할 수 있습니다.",
"Generate PIN":"產生PIN碼",
"Your account security is very important! Please go to your":"당신의 계정 보안은 매우 중요합니다! 당신의",
"profile":"프로필",
"and generate your security PIN for a better protection of your account details.":"로 가셔서 당신의 계정을 더 잘 보호할 수 있도록 보안 PIN코드를 만들어주세요",
"Please insert your Personal Security PIN":"당신의 개인 보안 PIN코드를 입력해주세요.",
"Unlock":"해제",
//_/_/_/_/_/_/_/
//　 클래스 　_/
//_/_/_/_/_/_/_/

//직업스킬 레벨 - 국가까지 민츠 제공
"Apprentice":"견습생",
 "Assistant":"조수",
 "Junior":"신입 사원",
 "Senior":"사원",
 "Coordinator":"중견 사원",
 "Specialist":"숙련공",
 "Expert":"전문가",
 "Master":"장인",
 "Guru":"대가",
 "Guru*":"대가*",
 "Guru**":"대가**",
 "Guru***":"대가***",
//당 성향
 "Center, Libertarian":"중도, 자유주의자",
 "Far-left, Anarchist":"좌파, 무정부주의자",
 "Far-left, Libertarian":"좌파, 자유주의자",
 "Center-right, Libertarian":"중도 우파, 자유주의자",
//_/_/_/_/_/_/_/
//　   월   　_/
//_/_/_/_/_/_/_/
 "Month":"월",
 "January":"1월",
 "February":"2월",
 "March":"3월",
 "April":"4월",
 "May":"5월",
 "June":"6월",
 "July":"7월",
 "August":"8월",
 "September":"9월",
 "October":"10월",
 "November":"11월",
 "December":"12월",

 "Jan":"1월",
 "Feb":"2월",
 "Mar":"3월",
 "Apr":"4월",
 "May":"5월",
 "Jun":"6월",
 "Jul":"7월",
 "Aug":"8월",
 "Sep":"9월",
 "Oct":"10월",
 "Nov":"11월",
 "Dec":"12월",

//_/_/_/_/_/_/_/
//　카테고리　_/
//_/_/_/_/_/_/_/
 "Food":"식품",
 "Moving Tickets" : "여행 티켓",
 "Weapons":"무기",
 "Tank":"탱크",
 "Air Unit":"헬기",
 "Rifle":"소총",
 "Artillery":"자주포",
 "House":"집",
 "Defense System" : "방어 체계",
 "Hospital" : "병원",
 "Stone":"석재",
 "Oil":"석유",
 "Grain" : "농작물",
// "Titanium":"티타늄",
 "Iron":"철강",
//_/_/_/_/_/_/_/
//　자원종류　_/
//_/_/_/_/_/_/_/
 "Fish":"어패류",
 "Rubber":"고무",
// "Grain" : "농작물",
 "Fruits":"과일",
 "Cattle":"가축",
 "Deer":"사슴",
//  "Iron":"철강",
 "Saltpeter":"초석",
 "Aluminum":"알루미늄",
  
//_/_/_/_/_/_/_/
//　국가이름　_/
//_/_/_/_/_/_/_/
 "All countries" : "모든 국가",
 "Country":"국가",
 "World":"세계",
 "Argentina" : "아르헨티나",
 "Australia" : "호주",
 "Austria" : "오스트리아",
 "Belarus":"벨로루시",
 "Belgium":"벨기에",
 "Bolivia":"볼리비아",
 "Bosnia and Herzegovina" : "보스니아헤르체고비나",
 "Brazil" : "브라질",
 "Bulgaria" : "불가리아",
 "Canada" : "캐나다",
 "Chile" : "칠레",
 "China" : "중국",
 "Colombia" : "콜롬비아",
 "Croatia" : "크로아티아",
 "Cyprus" : "키프러스",
 "Czech Republic" : "체코",
 "Denmark" : "덴마크",
 "Estonia" : "에스토니아",
 "Finland" : "핀란드",
 "France" : "프랑스",
 "Germany" : "독일",
 "Greece" : "그리스",
 "Hungary" : "헝가리",
 "India" : "인도",
 "Indonesia" : "인도네시아",
 "Iran" : "이란",
 "Ireland" : "아일랜드",
 "Israel" : "이스라엘",
 "Italy" : "이탈리아",
 "Japan" : "일본",
 "Latvia" : "라트비아",
 "Lithuania" : "리투아니아",
 "Malaysia" : "말레이시아",
 "Mexico" : "멕시코",
 "Montenegro" : "몬테네그로",
 "Netherlands" : "네덜란드",
 "New Zealand" : "뉴질랜드",
 "North Korea" : "북한",
 "Norway" : "노르웨이",
 "Pakistan" : "파키스탄",
 "Paraguay" : "파라과이",
 "Peru" : "페루",
 "Philippines" : "필리핀",
 "Poland" : "폴란드",
 "Portugal" : "포르투갈",
 "Republic of China (Taiwan)" : "대만",
 "Republic of Macedonia (FYROM)":"마케도니아",
 "Republic of Moldova":"몰디브",
 "Romania" : "루마니아",
 "Russia" : "러시아",
 "Serbia" : "세르비아",
 "Singapore" : "싱가포르",
 "Slovakia" : "슬로바키아",
 "Slovenia" : "슬로베니아",
 "South Africa" : "남아프리카공화국",
 "South Korea" : "대한민국",
 "Spain" : "스페인",
 "Sweden" : "스웨덴",
 "Switzerland" : "스위스",
 "Thailand" : "타이",
 "Turkey":"터키",
 "USA" : "미국",
 "Ukraine" : "우크라이나",
 "United Kingdom" : "영국",
 "Uruguay" : "우루과이",
 "Venezuela" : "베네주엘라",
 //新國家
 "Egypt":"이집트",
 "Saudi Arabia":"사우디아라비아",
 "United Arab Emirates":"아랍에미레이트연합",



};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};


var regexps = {};
//게임 홈
regexps["eRepublik creates multiplayer global strategy game"] ="eRepublik은 글로벌 멀티 플레이어 전략 게임입니다.";
regexps["eRepublik offers a real second life"] ="eRepublik은 진정한 세컨드 라이프를 제공합니다.";
regexps["eRepublik takes strategy games to the Web"] ="eRepublik은 웹에서 즐기는 전략 게임입니다.";
//시장
regexps["(\\d*) free slots"] = "$1칸 남음";
regexps["You have succesfully bought (\\d+) product(s)? for (.*)(\\.)?$"] = "$1의 구매를 완료했습니다. 총 비용은 $3 입니다. ";
regexps["^You do not have enough money in your account.$"] = "구입 비용이 부족합니다.";
//기업
regexps["(.*)I'm Emma, the company's secretary. You look like you will be very productive today!"] = "$1 제 이름은 엠마, 이 회사의 비서에요. 오늘 컨디션 상당히 좋아보이시네요!";
regexps["Basic productivity"] = "기본 생산성";
//훈련
regexps["Strength level: (.*) / (.*) for the next Super Soldier Medal"] = "힘 레벨: 다음 슈퍼솔져 메달까지 $1 / $2 남았습니다.";
//인력 시장
regexps["You already have a job at (.*)(\\.) To apply for this job you have to quit your current job."] = "당신은 이미 $1 에 직장을 가지고 있습니다. 일자리를 얻기 위해서는 현재 직장에서 사직하셔야 합니다.";
//유저 메뉴
regexps["^General Manager$"] = "본부장";
regexps["^Friends\\((\\d*)\\)"] = "친구 ($1)";

//국가 목표
regexps["\\((.*) increase\\)"] = "(성장 속도：$1)";//인구
regexps["On day (.*) have a population of (.*) citizens"] = "Day $1 현재 인구수는 $2 명 입니다.";//인구
regexps["On day (.*) have a GDP of (.*) Gold"] = "Day $1 현재 GDP는 $2 골드 입니다.";//경제
regexps["On day (.*) keep control of the following regions:"] = "Day $1 현재 보유중인 영토:";//군사
//국가 통계 / 사회
regexps["Regions \\((\\d*)\\)"] = "지역 ($1)";

regexps["Citizens"] = "시민";
//뉴스
regexps["(\\d*) months ago"] = "$1달 전";
regexps["(\\d*) days ago"] = "$1일 전";
regexps["(\\d*) hours ago"] = "$1시간 전";
regexps["(\\d*) minutes ago$"] = "$1분 전";
regexps["(.*) attacked (.*),(.*). Fight for your ally \\((.*)\\)!"] = "$1이(가) $3의 $2을(를) 공격했습니다. 동맹 $4 을(를) 위해 싸우세요!";
regexps["(.*) signed an alliance with (.*)"] = "$1가 $2와(과)의 동맹에 서명했습니다.";
regexps["A congress donation to (.*) was proposed"] = "$1 으로의 기부 법안이 발의되었습니다.";
regexps["(.*) made a donation to (.*)"] = "$1 이(가) $2 에게 기부했습니다.";
regexps["New taxes for (.*) were proposed"] = "$1에 대한 새로운 세금 법안이 발의되었습니다.";
regexps["Taxes for (.*) changed"] = "$1에 대한 세금이 변경되었습니다.";
regexps["A money issuing of (.*) was proposed"] = "$1에 대한 화폐 발행 법안이 발의되었습니다. ";
regexps["(.*) issued (.*)"] = "$1 통화 발행 $2";
//신문
regexps["^(\\d*) comments$"] = "$1개의 코멘트";
regexps["^Comments(.*)"] = "댓글 $1개";
regexps["^Trackbacks(.*)"] = "트랙백 $1개";
//내셔널 리그
regexps["(\\s*)Expires in (\\d*) days"] = " $2일 안에 만료됩니다.";
regexps["(\\s*)Expires in (\\d*) hours"] = " $2시간 안에 만료됩니다.";
regexps["(\\s*)Expires in (\\d*) months"] = " $2달 안에 만료됩니다.";
//전쟁 목록
regexps["(\\d*) allies"] = "$1 동맹들";
regexps["(\\d+) active battle(s)?"] = "$1 진행중인 전투";
regexps["Resistance Force of (.*)"] = "독립 저항군 $1";
regexps["Resistance Force Of (.*)"] = "독립 저항군 $1";
//골드 구매
regexps["I have read and agree with the(.*)"] = "나는 $1을(를) 모두 읽었으며 이에 동의합니다.";
//기업
regexps["Employee list \\((\\d*)\\)"] = "직원 목록 ($1)";
regexps["Job offers \\((\\d*)\\)"] = "구인 정보 ($1)";
//정당
regexps["Do you agree to represent your party in the congress election in (.*)(\\?)"] = "$1 의 국회의원 선거 후보를 이와 같이 결정하시겠습니까??";
regexps["Increase population (.*)"] = "성장 인구수 $1";
regexps["Each party can propose a maximum number of (\\d*) candidates per region."] = "각 정당은 한 지역에서 최대 $1명의 후보자를 낼 수 있습니다.";
//친구 초대
regexps["Invite your friends and get 10% of all Gold they will receive in eRepublik from Treasure Maps and purchases. Check the"] = "당신의 친구를 초대하고 친구가 얻는 모든 골드의 10%를 보너스로 얻어보세요.";
//선거
regexps["You only have (\\d*) experience points. To access this feature you need at least 80 experience points \\(experience level 14\\)."]="당신의 경험치는 $1 입니다，이 기능을 이용하기 위해서는 80의 경험치가 더 필요합니다. (현재 Lv.14)"; //다른 메시지들과 유사할지도
//의회 안건
regexps["Proposed by"] = "발안자：";
regexps["Proposing presidential impeachment is not possible in the last (\\d*) days of the presidential mandate."] = "대통령 탄핵안은 대통령 임기가 $1일 남은 상태에서는 발의할 수 없습니다.";
regexps["Citizen fee change from (.*) to (.*)"] = "시민 지원금이 $1에서 $2로 변경되었습니다.";
regexps["Minimum wage change from (.*) to (.*)"] = "최저 임금이 $1에서 $2로 변경되었습니다. ";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)\\?"] = "$1을 국고에서 $2으로 전송하는 것에 동의하십니까?";
regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD\\?"] = "$1 만큼의 화폐를 $2 의 골드를 사용하여 발행하는데 동의하십니까?";
regexps["(.*) has been proposed as Natural Enemy."] = "$1이(가) 적성국으로 설정되었습니다.";
regexps["(.*) has declared (.*) as a Natural Enemy"] = "$1이(가) $2을(를) 적성국으로 설정하였습니다.";
//보물 지도
regexps["The last Treasure Map was found on day 1157."] ="마지막 보물지도는 Day 1157일에 발견되었습니다.";
regexps["There are no other Treasure Maps to be found."] ="이제 보물 지도는 더이상 찾아볼 수 없습니다.";
//골드 보너스
if (document.location.toString().indexOf("/gold-bonus/")!=-1) {regexps["Collect(.*)Gold"] ="$1골드를 수집했습니다.";}
//시스템 메시지
if (document.location.toString().indexOf("/messages/alerts/")!=-1) {
regexps["The General Manager of"] = "The General Manager of";
regexps["has modified your salary from (.*) to (.*)"] = "이 당신의 월급을 $1에서 $2로 변경했습니다.";
regexps["^is no longer a congress member.$"] = "은(는) 더이상 국회의원이 아닙니다.";
regexps["^Good news! You just made (.*) Gold because your friend (.*) was awarded with an amount of Gold from eRepublik.$"] = "좋은 소식입니다! 당신이 초대한 친구 $1이(가) 골드를 얻어서 $2골드가 당신의 골드 보너스에 입금되었습니다. ";
regexps["^Collect your Gold$"] = "30일 안에 당신의 골드 보너스들을";
regexps["^bonus within 30 days!$"] = "받아 가세요.";
regexps["^has transfered (.*) to your account.$"] = "이(가) $1을(를) 당신의 계좌로 입금시켰습니다.";
regexps["^has transfered (.*) products to your inventory. Check your$"] = "이(가) $1을(를) 당신의 인벤토리로 보냈습니다. 체크해보세요.";
}

//기부
//Successfuly transfered (\\d*) item(s) to (.*).
//You have successfully donated (.*) GOLD. This amount will appear shortly in the citizen/organization account.
//기업 경영
regexps["^Manage accounts(.*)\\((\\d*)\\)$"] = "계좌 관리 ($2)";
//============================================================================

//_/_/_/_/_/_/_/
//　계　　급　_/
//_/_/_/_/_/_/_/ 
//데이터 from http://wiki.erepublik.com/index.php/Military_rank/%E4%B8%AD%E6%96%87%28%E7%B9%81%E9%AB%94%29

var mr = undefined;
if (document.location.toString().indexOf("citizen/profile")!=-1) {
regexps["Recruit"] = "신병";
regexps["Private"] = "이등병";
regexps["Corporal"] = "상병";
regexps["Sergeant"] = "병장";
regexps["Lieutenant"] = "소위";
regexps["Captain"] = "대위";
regexps["Major"] = "소령";
regexps["Commander"] = "지휘관";
regexps["Lt Colonel"] = "중령";
regexps["Colonel"] = "대령";
regexps["General"] = "대장";
regexps["Field Marshal"] = "육군 원수";
regexps["Supreme Marshal"] = "최고 사령관";
regexps["National Force"] = "내셔널 포스";
regexps["World class Force"] = "월드 클래스 포스";
regexps["Legendary Force"] = "레전더리 포스";
regexps["God of War"] = "전쟁의 신";
}

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