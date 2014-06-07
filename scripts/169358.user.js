// ==UserScript==
// @name        dz论坛自动灌水机_非刷新版
// @description 实现dz论坛下自动灌水功能
// @include     *read*tid*
// @include     *forum*fid*
// @include	*thread*
// @include	*forum*viewthread*
// @version     1.2.1
// ==/UserScript==


// ------------------------------ Read Me ------------------------------ //
// 间隔时间如果设置过小，会导致回复无效；其实间隔时间也不准
// 一次只能在一个url里面灌水，不能同时作用于不同的两个url


// ------------------------------ To Learn ------------------------------ //

// ------------------------------ Update Log ------------------------------ //
// first created on May 22, 2013


/////不可刷新版本
var norefresh=true;

var norefresh_flag=false;
var text_Area,count,count_now,interval;


/////初始化。。。。。。。
if((!norefresh)&&(GM_getValue("start_flag")==null))
		GM_setValue("start_flag", false);


console.log("灌水模式初始化<<<<<");

//随机时间
//var radom_time =true;
var radom_s = 0;

//回复次数
var rept=2;

//间隔时间/秒
var intet=10;


//开启/关闭倒计时
var Timer_flag=true;
var myTc;

water();

function water() {

var wBtn_f=Id("wBtn");
var wStn_f=Id("wStn");
var curDiv = Id("f_pst");
var newDiv = document.createElement("div");

	if(norefresh?(norefresh_flag):(GM_getValue("start_flag")))
	{
		if(wBtn_f!=null)
			{
				Id("wBtn").style.display="none";
			}
		else if(wStn_f==null){					//刷新页面
			newDiv.innerHTML = '\
		<button id = "wBtn" class = "pn pnc vm" style = "float : right; display:none; margin-right:200px"> <strong> 开启灌水模式 </strong> </button>\
		<b>回复内容</b>\
		<input id = "textArea1" type = "text" style = "width : 400px" class = "tedt mtn">\
		<b>回复次数</b>\
		<input id = "textArea2" type = "text" style = "width : 30px" value="' + GM_getValue("count") + '" class = "tedt mtn">\
		<b>间隔时间(秒)</b>\
		<input id = "textArea3" type = "text" style = "width : 30px" value="' + GM_getValue("interval")/1000 + '" class = "tedt mtn" >\
		<button id = "wStn" class = "pn pnc vm" style = "float : right;margin-right : 200px"> <strong> 关闭灌水模式 </strong> </button>\
		';
		curDiv.parentNode.appendChild(newDiv);
		console.log("关闭灌水模式按钮<<<<<1");
		wStn_f=Id("wStn");
		if(Timer_flag &&(GM_getValue("url") == window.location.href)){ Id("textArea3").value=GM_getValue("interval")/1000; TimeCount(true);}
		}

		if(Id("wStn").style.display=="none"){ 
			Id("wStn").style.display="block";
			if(Timer_flag &&(GM_getValue("url") == window.location.href)){ Id("textArea3").value=GM_getValue("interval")/1000; TimeCount(true);}
		}
		var the_wStn = document.getElementById("wStn");
		the_wStn.addEventListener("click", stopWater);	//按键监听关闭
		
	}
	else{
		if(wStn_f!=null)
			{Id("wStn").style.display="none";
			}
		if(wBtn_f==null) 
		{newDiv.innerHTML = '\
		<button id = "wStn" class = "pn pnc vm" style = "float : right; display:none; margin-right:200px"> <strong> 关闭灌水模式 </strong> </button>\
		<b>回复内容</b>\
		<input id = "textArea1" type = "text" style = "width : 400px" class = "tedt mtn">\
		<b>回复次数</b>\
		<input id = "textArea2" type = "text" style = "width : 30px" value="' + rept + '" class = "tedt mtn">\
		<b>间隔时间(秒)</b>\
		<input id = "textArea3" type = "text" style = "width : 30px" value="' + intet + '" class = "tedt mtn" >\
		<b>开启随机时间</b>\
		<input id = "rd_time" type="checkbox" name="bike" checked />\
		<button id = "wBtn" class = "pn pnc vm" style = "float : right; margin-right : 200px"> <strong> 开启灌水模式 </strong> </button>\
		';
		curDiv.parentNode.appendChild(newDiv);
		console.log("灌水模式初始化完成<<<<<");
		
		}
		if(Id("wBtn").style.display=="none"){ 
			Id("wBtn").style.display="block";
//			if(Timer_flag &&(GM_getValue("url") == window.location.href)){ Id("textArea3").value=GM_getValue("interval")/1000; TimeCount(false);}
			if(norefresh) { Id("textArea3").value=interval/1000; TimeCount(false);}
			else if(Timer_flag &&(GM_getValue("url") == window.location.href)){ Id("textArea3").value=GM_getValue("interval")/1000; TimeCount(false);}
		}
		var the_wBtn = document.getElementById("wBtn");
		the_wBtn.addEventListener("click", startWater);	//按键监听开启
	
		return;

	}

	
if(!norefresh &&(GM_getValue("url") !== window.location.href)) { console.log("灌水模式已开，不是本页面。");	return;	}//不允许出现新的灌水页面



if(norefresh?(count_now):(GM_getValue("count")) )
{
	if(Id("rd_time").checked) radom_s = parseInt(Math.random()*20);		//1-20
	else radom_s=0;
	
	norefresh?count_now-=1:GM_setValue("count", GM_getValue("count") - 1);
	var textArea = Id("fastpostmessage");
	var wBtn = Id("fastpostsubmit");

	if(textArea.value=="")
		if(Id("textArea1").value=="") textArea.value = radtextArea()+'\n\n'+radtextArea();
		else textArea.value = radtextArea();
	
	wBtn.click();
	Id("textArea2").value=norefresh?count_now:GM_getValue("count");
//	Id("textArea3").value=norefresh?interval/1000:GM_getValue("interval")/1000;
	Id("textArea3").value=norefresh?(interval/1000+radom_s):GM_getValue("interval")/1000;
	
	console.log(Id("textArea2").value);
	console.log("Interval:"+ radom_s +"s");
	
	if(norefresh?(count_now):(GM_getValue("count")) )
	{
				//window.setTimeout(function() {water()}, GM_getValue("interval"));
//		window.setTimeout(function() {water()}, norefresh?interval:GM_getValue("interval"));
		window.setTimeout(function() {water()}, norefresh?(interval+1000*radom_s):GM_getValue("interval"));
	}
	else {stopWater();}
	
	window.setTimeout(function() {document.getElementById("wStn").scrollIntoView(true);}, 5000)
	
	}
else {	//灌水结束
	stopWater();
	}
}	


/////////////////////////---函数---//////////////////////////
function Id(a) {
	return document.getElementById(a);
}

/////////////开启灌水模式////////////
function startWater() {
	if(norefresh){
	norefresh_flag=true;
	text_Area=Id("textArea1").value;
	count=parseInt(Id("textArea2").value);
	count_now=count;
	interval=Id("textArea3").value * 1000;
	} else {
	
	GM_setValue("start_flag", true);
	GM_setValue("url", window.location.href);	//设定灌水页面url
	GM_setValue("textArea", Id("textArea1").value);	
	GM_setValue("count", parseInt(Id("textArea2").value));
	GM_setValue("interval", Id("textArea3").value * 1000);
	}
	console.log("灌水模式开启！");
	if(Timer_flag) TimeCount(true);
	water();
	
}

/////////////关闭灌水模式////////////
function stopWater() {
	if(Timer_flag) TimeCount(false);
	
	if(Id("textArea2").value==0)
		Id("textArea2").value=rept;
//	Id("textArea3").value=GM_getValue("interval")/1000;
	Id("textArea3").value=norefresh?interval/1000:GM_getValue("interval")/1000;
	
	if(norefresh){
	norefresh_flag=false;
	count_now=count;
	} else {
	
		GM_setValue("start_flag", false);
		//GM_deleteValue("start_flag");
		GM_deleteValue("url");
		GM_deleteValue("textArea");
		GM_deleteValue("count");
		GM_deleteValue("interval");	
	}	
	console.log("灌水模式关闭！");
	water();
}

///////////倒计时///////
function TimeCount(TorF) {
	if(TorF){
		if(!myTc) myTc=self.setInterval(function(){Id("textArea3").value-=1;},1000);
		console.log("倒计时开启！");
	}
	else{
//		Id("textArea3").value=GM_getValue("interval")/1000;
		myTc=window.clearInterval(myTc);
		console.log("倒计时关闭！");
	}
	return;
}

///////////刷新页面///////
function fun() {
	window.location.reload();
}

/////////////随机内容////自定义修改////////////
function radtextArea() {
	if(Id("textArea1").value!="")
	
	{return Id("textArea1").value;}
	
	var textArea= new Array(
		'数组示例---不用---',
		'[img]http://static.bbs.maxthon.cn/data/attachment/forum/201305/10/151444oyo7axyeww9wa0xp.jpg[/img]',
		'[img]http://static.bbs.maxthon.cn/data/attachment/forum/201305/09/143026mk1yzq6ek4c1kyp6.jpg[/img]',
		'[catsoul=1]直到我膝盖中了一箭[/catsoul]',
		'[catsoul=2]我擦！[/catsoul]',
		'[catsoul=3]你懂的。[/catsoul]',
		'[catsoul=4]这真是极好的[/catsoul]',
		'[catsoul=5]给力！[/catsoul]',
		'[catsoul=6]你妹。[/catsoul]',
		'[catsoul=7]感觉不会再爱了[/catsoul]',
		'[catsoul=8]楼下怎么看？[/catsoul]',
		'[catsoul=9]呵呵。[/catsoul]',
		'[catsoul=4]有人否？？？[/catsoul]',
		'[catsoul=9]一个人，默默地灌着水[/catsoul]',
		'用你的2B铅笔描绘出你的2B人生',
		'机息时,便有月到风来,不必苦海人世;心远处,自无车尘马迹,何须痼疾丘山。',
		'无论今天发生多么糟糕的事，都不应该感到悲伤。因为今天是你往后日子里最年轻的一天了……',
		'生活将我磨圆，是为了让我滚得更远。。。',
		'你复杂的五官掩饰不了你朴素的智商！',
		'奈何，七尺之躯，已许国，再难许卿',
		'一朝春去红颜老，花落人亡两不知。',
		'静水流深，沧笙踏歌；三生阴晴圆缺，一朝悲欢离合。',
		'灯火星星，人声杳杳，歌不尽乱世烽火。',
		'如花美眷，似水流年，回得了过去，回不了当初。',
		'乌云蔽月，人迹踪绝，说不出如斯寂寞。',
		'这次我离开你，是风，是雨，是夜晚；你笑了笑，我摆一摆手，一条寂寞的路便展向两头了。',
		'天不老，情难绝。心似双丝网，中有千千结。',
		'似此星辰非昨夜，为谁风露立中宵。',
		'十年生死两茫茫，不思量，自难忘，千里孤坟，无处话凄凉。',
		'蝴蝶很美，终究蝴蝶飞不过沧海。',
		'终于为那一身江南烟雨覆了天下，容华谢后，不过一场，山河永寂。',
		'风华是一指流砂，苍老是一段年华。',
		'用我三生烟火，换你一世迷离。',
		'我自是年少，韶华倾负。',
		'长街长，烟花繁，你挑灯回看，',
		'短亭短，红尘辗，我把萧再叹。',
		'终是谁使弦断，花落肩头，恍惚迷离。',
		'多少红颜悴，多少相思碎，唯留血染墨香哭乱冢。',
		'苍茫大地一剑尽挽破，何处繁华笙歌落。斜倚云端千壶掩寂寞，纵使他人空笑我。',
		'任他凡事清浊，为你一笑间轮回甘堕。',
		'寄君一曲，不问曲终人聚散。',
		'谁将烟焚散，散了纵横的牵绊。',
		'听弦断，断那三千痴缠。坠花湮，湮没一朝风涟。花若怜，落在谁的指尖。',
		'山有木兮木有枝，心悦君兮君不知。',
		'相忘谁先忘，倾国是故国。泠泠不肯弹，蹁跹影惊鸿。',
		'昔有朝歌夜弦之高楼，上有倾城倾国之舞袖。',
		'待浮花浪蕊俱尽，伴君幽独。',
		'一朝春去红颜老，花落人亡两不知。',
		'静水流深，沧笙踏歌；三生阴晴圆缺，一朝悲欢离合。',
		'灯火星星，人声杳杳，歌不尽乱世烽火。',
		'如花美眷，似水流年，回得了过去，回不了当初。',
		'乌云蔽月，人迹踪绝，说不出如斯寂寞。',
		'这次我离开你，是风，是雨，是夜晚；',
		'你笑了笑，我摆一摆手，一条寂寞的路便展向两头了。',
		'天不老，情难绝。心似双丝网，中有千千结。',
		'似此星辰非昨夜，为谁风露立中宵。',
		'十年生死两茫茫，不思量，自难忘，千里孤坟，无处话凄凉。',
		'蝴蝶很美，终究蝴蝶飞不过沧海。',
		'终于为那一身江南烟雨覆了天下，容华谢后，不过一场，山河永寂。',
		'风华是一指流砂，苍老是一段年华。',
		'山河拱手，为君一笑。',
		'几段唏嘘几世悲欢可笑我命由我不由天。',
		'经流年梦回曲水边看烟花绽出月圆。',
		'雾散，梦醒，我终于看见真实，那是千帆过尽的沉寂。',
		'生生的两端，我们彼此站成了岸。',
		'缘聚缘散缘如水，背负万丈尘寰，只为一句，等待下一次相逢。',
		'看那天地日月，恒静无言；青山长河，世代绵延；',
		'就像在我心中，你从未离去，也从未改变。',
		'就这样吧，从此山水不相逢。',
		'既不回头，何必不忘。既然无缘，何须誓言。',
		'今日种种，似水无痕。明夕何夕，君已陌路。',
		'心微动奈何情己远，物也非，人也非，事事非，往日不可追。',
		'也许是前世的姻也许是来生的缘错在今生相见徒增一段无果的恩怨。',
		'一年老一年，一日没一日，一秋又一秋，一辈催一辈一聚一离别，一喜一伤悲，一榻一身卧，一生一梦里寻一夥相识，他一会咱一会那一般相知，吹一会唱一会。',
		'总在不经意的年生。回首彼岸。纵然发现光景绵长。',
		'有一种隐忍其实是蕴藏着的一种力量，有一种静默其实是惊天的告白。',
		'只缘感君一回顾，使我思君朝与暮。',
		'举杯独醉，饮罢飞雪，茫然又一年岁。',
		'转身，一缕冷香远，逝雪深，笑意浅。来世你渡我，可愿？',
		'一花一世界，一叶一追寻。一曲一场叹，一生为一人。',
		'尘缘从来都如水，罕须泪，何尽一生情？莫多情，情伤己。',
		'谁应了谁的劫谁又变成了谁的执念。',
		'你若撒野今生我把酒奉陪。',
		'人生若只如初见当时只道是寻常。',
		'心有猛虎，细嗅蔷薇。盛宴之后，泪流满面。',
		'花开再谢、人来又走。假若注定是过客，起初又何必招惹。',
		'说好就此放手，说好不为彼此停留，可回忆说走又不走。',
		'心里有一些牵挂，有些爱却不得不各安天涯…',
		'今生今世，但愿岁月静好，现世安稳，每天都能看见他的笑颜。',
		'试着放手，走与不走，留与不留，我不想懂？',
		'在什么都不确定的年代，我们总是爱得太早、放弃得太快，轻易付出承诺，又不想等待结果。',
		'相识，总是那么美丽；分手，总是优雅不起。',
		'知道真相又如何？青涩年华里，我们都怀揣着各自的秘密，原谅了彼此的心机。',
		'我们在放弃，涂白了记忆，以为就可以伪装无邪的美丽。',
		'一种游戏，一种规则。玩得起，继续；玩不起，出局。',
		'潮起潮落，冲不走沙滩记忆的贝壳；云卷云舒，留不住她远去的背影；人来人往，挡不住初识的那份快乐。',
		'有多少永远值得坚持，有多少永远配得上永远。',
		'绘一场生死契阔的游戏，为我们的故事写下一个结局。',
		'不想用爱情来渲染悲伤，不想看你如此疲惫，低着头不理会，说我冷漠？无所谓！',
		'我不想做你生命的插曲，只想做你生命最完美的结局。',
		'过去的故事总归成为回忆，会痛、会哭、会想起。',
		'我，不怕路太远找不到终点，就怕两个世界画不成一个圆。',
		'为你落下一滴泪，故事到最后总会落幕，我真心的付出却不是你要的幸福。',
		'我落日般的忧伤就像惆怅的飞鸟，惆怅的飞鸟飞成我落日般的忧伤。',
		'我站得太久说的太久我自己都累了，你怎么还是听不懂？我写的太多了写的太久了我自己都累了，你怎么还是看不懂？',
		'谁给我波澜不惊的爱情，谁陪我看透流年的风景。',
		'曾经的海枯石烂，终究抵不过一句好聚好散。',
		'能给你的全都给你我都舍得，除了让你知道我心如刀割。',
		'暧昧过头，友谊终究酿不成爱情。就像旋转木马，因为你在追、我在逃，我再追，你又跑……',
		'伤口再痛痛不过背叛的伤痛，泪水再多多不过你给的冷漠',
		'青春，让我们学会了悲伤、逞强、强颜欢笑。',
		'有一点累，有一点灰，有一点点执著；全世界不懂都无所谓，对错也无所谓！',
		'所有的疼痛、都被隐藏在乖戾的微笑里，越是笑，就越疼。	越是疼，就越是没心没肺的笑。',
		'宿命给每个人都安排了位置，即使短暂的错位，也终要回归本位。',
		'那些流年、那些颠狂、那些悲伤，在某个十字路口、已经尘埃落定。',
		'我们的青春如此无奈。太多的回忆变成了伤怀。',
		'是因我们太年轻，不能够坚持自己，还是诺言太软弱，经不起闲言碎语？',
		'有些人不必说再见，因为只是路过而已。遗忘就是我们给彼此最好的纪念。',
		'一念起，万水千山；一念灭，沧海桑田。',
		'记忆流成河。我在岸边经过，闭上眼睛，悲欢交错。',
		'谢谢你曾让我勇敢。静静的看你牵起她的手，从我面前高调地走过…若无其事。',
		'那一世，转山转水转佛塔，不为修来世，只为途中与你相见。',
		'你说的永远，不过是永不可能得到的长远。',
		'喜欢的歌，静静地听；喜欢的人，远远地看。',
		'我目送沿海的日落，紧抱一个醉生梦死的枕头，游不出回忆却学不会放手、怎么走？',
		'感情有时候只是一个人的事情，和任何人无关。爱、或者不爱，自行了断。',
		'人生就像一场舞会，教会你最初舞步的人却未必能陪你走到散场……',
		'谁的眼角触得了谁的眉？谁的笑容抵得了谁的泪？谁的心脏载得了谁的轮回？谁的掌纹赎得回谁的罪？',
		'低吟、浅唱，那一段不为人知的伤，没落繁华的过往是谁的歌声在回荡。',
		'如果参透沧海桑田，谁还会用一生等待；如果彼此不曾经伤害，泪水就不会澎湃。',
		'青春年华，谁许谁地老天荒；髦耋岁月，谁知谁擦肩而过。',
		'在这世间，有一些无法抵达的地方。无法靠近的人。无法完成的事。无法占有的感情。无法修复的缺陷。',
		'忘掉岁月，忘掉痛苦，忘掉你的坏，我们永不永不说再见。',
		'逝去的岁月怎么找得回来？你曾经的微笑，在回忆里却散不开。',
		'当我最想说些什么的时候，往往也是我最沉默的时候。',
		'若爱，请深爱；放弃，请彻底；等待本身就是一个错误。',
		'为谁唱离歌，对谁说情话，给谁写天涯。',
		'街角遇见爱，转角没未来。',
		'为什么路的後面还是路？为什么故事结束还有那么多的假如？只有你能打破黑夜的企图，什么时候我的梦境能有太阳居住？',
		'青春是如此忧伤，在这个季节我们学会了感伤。身后曾经有一双翅膀，努力飞翔却是别人的力量。',
		'心总在最痛时复苏；爱总在最深时，落下帷幕。',
		'年少的爱慕是可以安静的，只是在以后的岁月里，我将永远走在少了你的风景里。',
		'原来岁月太长，可以丰富，可以荒凉。能忘掉结果，未能忘记遇上。',
		'堕落其实本无罪，只是美的太颓废。',
		'谁动听了整个夏季的蝉鸣，谁渲染了一个秋天的凋零。下一次天亮，谁来给我春暖花开的心情。',
		'青春的花开花谢只是我思念的日历。没有首页，没有尾页。',
		'说太多，不如沉默；想太多，我会难过。滚……Ok?',
		'祝福是一泓清泉中的花开，花开四季，季季都有我芬芳淡淡的叮咛。叮咛是一世漂泊中的风雨，风雨几缕，缕缕都有我随花凋谢的心情。',
		'你们幸福的姿态，请别在我面前炫耀，我会疯掉~',
		'谁寂寞了繁华，埋葬了天涯，散尽一身的戎甲。',
		'流年浅唱，记忆被瞬间遗忘，我的思念汇聚成河，流淌在天涯尽头……',
		'谁和谁错肩 谁和谁永远 谁在残阳如血的时光中等待花落。',
		'想尽办法挽回所有，却找不到重归于好的理由。再不想多说什么，一切的一切自己回忆就可。',
		'谁的爱放在假日的市场，讨价还价拍卖着它的重量。',
		'我为谁而来？茫茫人海，谁来安排，美丽的意外。',
		'谁静静地聆听我的诉说，又是谁.残忍的割痛着我的心。',
		'我在此岸，你在彼岸。两两相望，两两相忘。',
		'你就象场戏剧，随时随地转换面具。',
		'自此，鞠躬鸣谢，感谢你的出现。从此、华丽落幕，你、不再属于我的世界。',
		'时间不是让人不痛，也不是让人忘记痛，而是让人习惯痛。',
		'我不说、你不懂，我们互相在假装。这就是我们的距离。',
		'一个人的寂寞，成就不朽的情歌；全民一起寂寞，成就如此多的哥。',
		'也许我还不够能力把你彻底忘记，至少我懂得适当离去。',
		'话已说尽，情已割舍，爱已不在，后会无期。',
		'天地何用?不能席被,风月何用?不能饮食.纤尘何用?万物其中,变化何用?道法自成,面壁何用?不见滔滔,棒喝何用?一头大包.生我何用?不能欢笑,灭我何用,不减狂骄.从何而来?同生世上,齐乐而歌,行遍大道.万里千里,总找不到,不如与我,相逢一笑.芒鞋斗笠千年走,万古长空一朝游,踏歌而行者,物我两忘间。',
		'我颠覆了整个世界，只为摆正你的倒影。',
		'我们有什么好怕哒，我们来到这个世上，就没打算活着回去！！！',
		'如果我带着醉意出生，或许我能够忘记所有的哀伤。',
		'夜未央，夏已至，暖风习习，梦中影，摇摇晃晃，风曳情殇，辗转红尘，相思成垢，谈往事如烟，流年似水，若枕黄粱，原是浮生一梦。几何哀愁，月如勾，立于窗前，看人世浮沉，乱了心绪。',
		'风雨难洗心痕，沧桑不灭情伤；莫要轻言亘古，离散才看荒凉……长忆山盟海誓，宁求地久天长；一场春梦今生，看君轻舞飞扬；三生路，情根吟唱；一世苦，伴卿分享；莫相许，心伤神断',
		'苍茫大地一剑尽挽破，何处繁华笙歌落。斜倚云端千壶掩寂寞，纵使他人空笑我。',
		'九幽阴灵，诸天神魔，以我血躯，奉为牺牲。三生七世，永堕阎罗，只为灌水，虽死不悔！'
		
	);
	
	//随机数
	var N=textArea.length-1;
	var radom_num = 0;
		radom_num = parseInt(Math.random()*N+1);	//1-N

//	if(Id("rd_time").checked) radom_s = parseInt(Math.random()*20);		//1-20
//	else radom_s=0;
	return textArea[radom_num];	
}

////////////////////////////--END--//////////////////////////////