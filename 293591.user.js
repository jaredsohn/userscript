// ==UserScript==
// @name           玻璃心
// @namespace      http://www.renren.com/285202016/profile?
// @description    
// @include        http://zhjw.cic.tsinghua.edu.cn/cj.cjCjbAll.do?m=bks_yxkccj*
// @include        http://zhjw.cic.thu.edu.cn/cj.cjCjbAll.do?m=bks_yxkccj*
// @include        http://zhjw.cic.tsinghua.edu.cn/cj.cjCjbAll.do?m=yjs_yxkccj*
// @include        http://zhjw.cic.thu.edu.cn/cj.cjCjbAll.do?m=yjs_yxkccj*
// @include        https://sslvpn.tsinghua.edu.cn:11001/cj.cjCjbAll.do?m=bks_yxkccj*
// @include        https://sslvpn.tsinghua.edu.cn:11001/cj.cjCjbAll.do?m=yjs_yxkccj*
// ==/UserScript==

var hwnd_Move=0;
var hwnd_Opacity=0;
var t=0;
var gt=new Array(0,0,0);
var tscore=0;
var tname='';

function main()
{
    var htm, i;
    var j = [0,0,0];
    
    var tbls = document.getElementsByTagName("table");
    var tbl1;
    for (i=0; i<tbls.length; i++) {
        tbl1 = tbls[i];
        if (tbl1.textContent.indexOf('课程号')>0) {
            break;
        }
    }
    var trs = tbl1.getElementsByTagName("TR");

	openEx("guess");
	htm = '<table cellspacing="2px" style="border:dashed 1px grey; background-color:#F8F8F8"><tr><td>';
	htm +='<p><b>猜猜看</b><div style="position: absolute; right: 0px; top: 0px;"><a onclick="var b=document.getElementsByName(\'blackbox\');for(var i = 0; i < b.length; i++)b[i].style.backgroundColor=\'\';   document.getElementById(\'guess\'\).style.display=\'none\';">不玩了</a></div></p>';
	htm +='<p>预期分数：<input type="text" size="3" id="targetscore" style="width:30px"/></p>';
	htm +='<p><button type="button" onclick="if(parseInt(document.getElementById(\'tscore\').value)<60&&parseInt(document.getElementById(\'targetscore\').value)>parseInt(document.getElementById(\'tscore\').value))alert([\'我们不必为平凡悲叹，因为平凡，也是一种美丽！平凡是荒原，孕育着崛起，只要你鹤岗开拓；平凡是泥土，只要你肯耕耘；平凡是细流，孕育着深邃，只要你肯积累。平凡是一场惊险搏击之后的小憩，是一次辉煌追求之后的沉思。平凡是告诉了无知的炫耀的狂妄之后的深沉。\',\'人生的十二种财富：积极的精神态度；良好的体格；人际关系的和谐；脱离恐惧；未来成功的希望；信念的容量；与人分享自己的幸福的愿望；热爱自己的工作；对所有的事物有开放的内心；严于自律；理解人的能力；经济保障。\',\'世上种种纷争，或是为了财富，或是为了教义，不外乎利益之争和观念之争。当我们身在其中时，我们不免看重。但是，我们每一个人都迟早要离开这个世界，并且绝对没有返回的希望。在这个意义上，我们不妨也用鲁滨逊的眼光来看一看世界，这会帮助我们分清本末。\',\'只有使自己自卑的心灵自信起来，弯曲的身躯才能挺直；只有使自己懦弱的体魄健壮起来，束缚的脚步才能迈开；只有使自己狭隘的心胸开阔起来，短视的眼光才能放远；只有使自己愚昧的头脑聪明起来，愚昧的幻想才能抛弃！\',\'对社会的简单形容就是：全是人、全是人、全是人——但社会肯定会分出层次，只有一个办法，那就是竞争。你必须努力，必须使自己成为社会的强者，强者才能拥有一切，而不是金钱可以买到的一切，否则结局就是被亚在社会的底层。\',\'亲情是一种深度，友情是一种广度，而爱情是一种纯度。亲情是没有条件、不求回报的阳光沐浴，友情是浩荡巨大、可以随时安然栖息的堤岸；而爱情则是神秘无边、可以使歌至到忘情泪至潇洒的心灵照射。人生一世，亲情、友情、爱情；三者缺一，已为遗憾，三者缺二，实为可怜；三者皆缺，活而如亡。\',\'读书，我们不仅能够掌握一定的专业技能，更重要的是，能够解决自己面临的各种各样的人生问题。人终其一生，无非就是在不断探知自己的人生到底应当有什么样的意义而已。\',\'如果你心中有阳光，就不会恐惧前方的坎坷；如果你心中有勇气，就不会畏缩不前；无论前方风多大，雨多大，闯过去就是一片海阔天空！女孩别忧伤，生命的美丽就是坚强的走过坎坷！\',\'成功必备：亲和力：亲和即人脉；决断力：果断决策，拒绝犹豫；执行力：执行是决策的接续；创造力：把普通变成平凡。前瞻力：洞悉先机，引领潮流，领先半步。凝聚力：像磁石凝聚进取的团队。辐射力：用品位和诚信征服市场和消费者。影响力：超越时间和空间。\',\'人生的最大遗憾莫过于错误地坚持了不该坚持的东西，轻易地放弃了不该放弃的东西，每一个人都有自己的理想，都有那个期望达到的目标，或许有这么一天我恩男狗狗成为一名教师，或许有那么一天我能实现自己的理想，达到自己的目标！生活还在继续！不要忘记微笑的对待每一天，不要忘记珍惜余下的每一天！\',\'人生有很多路要选择，选中一条，走下去，便会碰见这条路上的人和风景；而选择另一条，则是完全不同的风景与人。有的人可能与你一起走，有的人留在原地，一起走的人，也可能在下个路口与你分开。没什么可哀叹的，这是人生的必然，珍惜身边与你一起看风景的人，并在下一个分开路口，洒脱的用力的挥挥手。\',\'多读书以养胆气，少忧虑以养心气，戒发怒以养肝气，薄滋味以养胃气，惟谨慎以养神气，顺时令以养元气，须慷慨以养浩气，胸豁达以养正气，傲冰雪以养骨气，当忍让以养和气，应谦恭以养锐气，莫懈怠以养志气。\'][Math.floor(Math.random() * 12)]+\'你挂科了\');';
	htm +='else if(parseInt(document.getElementById(\'targetscore\').value)>parseInt(document.getElementById(\'tscore\').value))alert(';
	htm +='[\'胜败乃兵家常事，大侠请重新来过。\',\'胜败兵家事不期，包羞忍耻是男儿。\',\'江东子弟多才俊，卷土重来未可知。\',\'千古兴亡多少事？悠悠。不尽长江滚滚流。\',\'雄关漫道真如铁，而今迈步从头越。\',\'一壶浊酒喜相逢。古今多少事，都付笑谈中。\',\'是非成败转头空。青山依旧在，几度夕阳红？\',\'长风破浪会有时，直挂云帆济苍海！\',\'快刀不磨要生锈，胸膛不挺背要驼。--闻一多\',\'不是一番寒彻骨，怎得梅花扑鼻香？\',\'路漫漫其修远兮，吾将上下而求索。\',\'拼的十万头颅血，敢叫日月换新天。\',\'有志者，事竟成，破釜沉舟，百二秦关终属楚。\',\'苦心人，天不负，卧薪尝胆，三千越甲可吞吴。\',\'天生我才必有用 千金散尽还复来。\',\'莫愁前路无知己，天下谁人不识君。\',\'人生自古谁无死，留取丹心照汗青。\',\'沉舟侧畔千帆过，病树前头万木春。\',\'自信人生二百年，会当击水三千里。\',\'大雪压竹低，竹低欲沾泥；明朝红日起，依旧与天齐。\',\'自许封侯在万里。有谁知，鬓虽残，心未死！\',\'拼着一切代价，奔你的前程。——巴尔扎克\',\'当时间的主人，命运的主宰，灵魂的舵手。——罗斯福\',\'当你将信心放在自己身上时，你将永远充满力量。\',\'做了好事受到指责而仍坚持下去，这才是奋斗者的本色。——巴尔扎克\',\'停止奋斗，生命也就停止了。——卡莱尔\',\'吃别人所不能吃的苦，忍别人所不能忍的气，做别人所不能做的事，就能享受别人所不能享受的一切。\',\'对真理和知识的追求并为之奋斗，是人的最高品质之一。——爱因斯坦\',\'作了好事受到职责而坚持下去，这才是奋斗的本色。——巴尔扎克\',\'凡事欲其成功，必要付出代价：奋斗。——爱默生\',\'脚跟立定以后，你必须拿你的力量和技能，自己奋斗。——萧伯纳\',\'对于学者获得的成就，是恭维还是挑战？我需要的是后者，因为前者只能使人陶醉、而后者却是鞭策。——巴斯德\',\'必须在奋斗中求生存，求发展。——茅盾\',\'不要抱着过去不放，拒绝新的观念和挑战。\',\'如果你过分珍爱自己的羽毛，不使它受一点损伤，那麽你将失去两只翅膀，永远不再能够凌空飞翔。——雪莱\',\'形成天才的决定因素应该是勤奋。——郭沫若\',\'如果我们能够为我们所承认的伟大目标去奋斗，而不是一个狂热的、自私的肉体在不断地抱怨为什么这个世界不使自己愉快的话，那么这才是一种真正的乐趣。——萧伯纳\',\'人的大脑和肢体一样，多用则灵，不用则废。——茅以升\',\'奋斗是万物之父。——陶行知\',\'无论做什麽事情，只要肯努力奋斗，是没有不成功的。——牛顿\',\'发明的秘诀在不断的努力。——牛顿\',\'业精于勤而荒于嬉，行成于思而毁于随。——韩愈\',\'想象你自己对困难作出的反应，不是逃避或绕开它们，而是面对它们，同它们打交道，以一种进取的和明智的方式同它们奋斗。——马克斯威尔·马尔兹\',\'一个人必须经过一番刻苦奋斗，才会有所成就。——安徒生\',\'奋斗以求改善生活，是可敬的行为。——茅盾\',\'你应将心思精心专注于你的事业上。日光不经透镜屈折，集于焦点，绝不能使物体燃烧。——毛姆\',\'富就富在不知足，贵就贵在能脱俗。贫就贫在少见识，贱就贱在没骨气。\',\'发明家全靠一股了不起的信心支持，才有勇气在不可知的天地中前进。——巴尔扎克\',\'与其战胜敌人一万次，不如战胜自己一次。\',\'人类要在竞争中求生存，更要奋斗。——孙中山\',\'在这个并非尽善尽美的世界上，勤奋会得到报偿，而游手好闲则要受到惩罚。——毛姆\',\'聪明的资质、内在的干劲、勤奋的工作态度和坚韧不拔的精神，这些都是科学研究成功所需要的条件。——贝弗里奇\',\'一个人必须面向未来，想着要着手做的事情。但这并不容易做到。一个人的过去是一种日益加重的负担。——罗素\',\'无论头上是怎样的天空，我准备承受任何风暴。——拜伦\',\'聪明出于勤奋，天才在于积累。——华罗庚\',\'我宁愿靠自己的力量打开我的前途，而不求权势者垂青。——雨果\',\'进步，意味着目标不断前移，阶段不断更新，它的视影不断变化。——雨果\',\'我们应当努力奋斗，有所作为。这样，我们就可以说，我们没有虚度年华，并有可能在时间的沙滩上留下我们的足迹。——拿破伦一世\',\'奋斗这一件事是自有人类以来天天不息的。——孙中山\',\'你想成为幸福的人吗？但愿你首先学会吃得起苦。——屠格涅夫\',\'勤劳一日，可得一夜安眠；勤劳一生，可得幸福长眠。——达·芬奇\',\'一件事被所有人都认为是机会的时候，其实它已不是机会了。\',\'天才就是无止境刻苦勤奋的能力。——卡莱尔\',\'活鱼会逆流而上，死鱼才会随波逐流。\',\'好学而不勤问非真好学者。\',\'只有这样的人才配生活和自由，假如他每天为之而奋斗。——歌德\',\'奋斗之心人皆有之。——李叔同\',\'人生在勤，不索何获。——张衡\',\'一无所有是一种财富，它让穷人产生改变命运的行动。\',\'书山有路勤为径，学海无涯苦作舟。（励志格言）\',\'智者创造机会，强者把握机会，弱者等待机会。\',\'只有勤勉、毅力才会使我们成功……而勤勉一毅力又来源于为达到成功所需要的手段。——史密斯\',\'了解生命而且热爱生命的人是幸福的。（佚名)\',\'生命不可能有两次，但是许多人连一次也不善于度过。(吕凯特)\',\'我的一生始终保持着这样一个信念生命的意义在于付出，在于给予，而不是接受，也不是在于争取。(巴金)\',\'尊重生命、尊重他人也尊重自己的生命，是生命进程中的伴随物，也是心理健康的一个条件。(弗洛姆)\',\'人生有两出悲剧：一是万念俱灰，另一是踌躇满志。(肖伯纳)\',\'我要扼住命运的咽喉，它决不能使我完全屈服。（贝多芬）\',\'我总觉得，生命本身应该有一种意义，我们绝不是白白来一场的。（席慕蓉）\',\'我们一步一步走下去，踏踏实实地去走，永不抗拒生命交给我们的重负，才是一个勇者。到了蓦然回首的那一瞬间，生命必然给我们公平的答案和又一次乍喜的心情，那时的山和水，又回复了是山是水，而人生已然走过，是多么美好的一个秋天。（三毛）\',\'生命象一粒种籽，藏在生活的深处，在黑土层和人类胶泥的混合物中，在那里，多少世代都留下他们的残骸。一个伟大的人生，任务就在于把生命从泥土中分离开。这样的生育需要整整一辈子。(罗曼·罗兰)\',\'生命的路是进步的，总是沿着无限的精神三角形的斜面向上走，什么都阻止他不得。（鲁迅）\',\'动则生，静则乐。（杨万里）\',\'生命如流水，只有在他的急流与奔向前去的时候，才美丽，才有意义。（张闻天）\',\'视死若生者，烈士之勇也。（庄周）\',\'本来，生命只有一次，对于谁都是宝贵的。（瞿秋白）\',\'得其志，虽死犹生，不得其志，虽生犹死。（无名氏）\',\'鱼生于水，死于水；草木生于土，死于土；人生于道，死于道。（胡宏）\',\'莫道桑榆晚，为霞尚满天。(刘禹锡)\',\'只是通往死亡的一次旅行。(塞内加)\',\'生命是一种语言，它为我们转达了某种真理；如果以另一种方式学习它，我们将不能生存。(叔本华)\',\'生命的全部奥秘就在于为了生存而放弃生存。(歌德)\',\'“生命是获取知识的工具”，只要秉持这个原则，我们不仅会勇气百倍，同时还能尽情生活和开怀大笑！(尼采)\',\'生命会给你所需要的东西，只要你不断地向它要，只要你在向它要地时候说得一清二楚。(爱因斯坦)\',\'人的生命短得可笑。怎样生活？一些人千方百计逃避生活，另外一些人把自己整个身心献给了它。前一种人在晚年时精神空虚，无所回忆；后一种人------精神和回忆都是丰富的。(高尔基)\',\'当我们误用生命的时候，生命并无价值。(狄更斯)\'][Math.floor(Math.random() * 95)]';
	htm +=');else{document.getElementById(document.getElementById(\'tname\').value).style.backgroundColor=\'\';document.getElementById(\'guess\'\).style.display=\'none\';}">试试？</button>';
	htm +='<button type="button" onclick="document.getElementById(document.getElementById(\'tname\').value).style.backgroundColor=\'\';document.getElementById(\'guess\'\).style.display=\'none\';">直接看吧</button></p>';
	htm +='</td></tr>';
    htm +='</table>';
    document.getElementById("guess").innerHTML = htm;
	setTimeout(function () {opacityEx("guess")}, 50);
    document.getElementById("guess").style.display='none';
	
	var field1=document.createElement("input");
	var field2=document.createElement("input");
	field1.setAttribute("type","hidden");
	field2.setAttribute("type","hidden");
	field1.setAttribute("id","tname");
	field2.setAttribute("id","tscore");
	document.body.appendChild(field1);
	document.body.appendChild(field2);
	
    for (i=1; i<trs.length; i++) {
        var tds = trs[i].getElementsByTagName("TD");
        if (tds.length != 11) continue;
		var s = tds[5].textContent;

        var   x,y,w,h;
        oRect   =   tds[5].getBoundingClientRect();
        x=oRect.left;
        y=oRect.top;
        w=oRect.width;
        h=oRect.height;
		if (s.indexOf('***') >= 0) tds[5].innerHTML = '<small>嘤嘤嘤</small>';
		else if(isNaN(parseInt(s)));
		else{
			var div = document.createElement("div");
			div.setAttribute("style","background-color:#000; top:"+0+"px; left:"+0+"px; width:100%; height:100%; border:none");
			div.setAttribute("id","div"+i);
			div.setAttribute("name","blackbox");
			div.setAttribute("onmouseover",'document.getElementById(\'guess\'\).style.display=\'\';document.getElementById(\'guess\'\).style.opacity=\'2\';document.getElementById(\'guess\'\).style.top=\''+y+'px\';document.getElementById(\'guess\'\).style.left=\''+(x+w+10)+'px\';document.getElementById(\'tname\').value=\'div'+i+'\';document.getElementById(\'tscore\').value=\''+parseInt(s)+'\';document.getElementById(\'targetscore\'\).value=\'\';');
			//document.body.appendChild(div);
			var text=document.createElement("p");
			text.innerHTML="<font color='#000'>"+parseInt(s)+"</font>";
			div.appendChild(text);
			tds[5].innerHTML="";
			tds[5].appendChild(div);
		}
    }
    
}

function openEx(name)
{
    var newwin = document.createElement("div");
    newwin.setAttribute("id", name);
    newwin.style.position = "absolute";
//    newwin.style.width = "100px";
//    newwin.style.height = "100px";
    newwin.style.opacity = 0.85;

    window.addEventListener("scroll", function() {
        var newpos = document.body.scrollTop + 10;
        newwin.setAttribute("tarpos", newpos);
        setTimeout(function () {if (!hwnd_Move) moveEx(name)}, 50);
    },false);
    
    var newpos = document.body.scrollTop + 10;
    newwin.setAttribute("tarpos", newpos);
    setTimeout(function () {if (!hwnd_Move) moveEx(name)}, 50);
    var htm="";
    
    document.body.appendChild(newwin);

    newwin.setAttribute("taropc", 0.1)
    newwin.addEventListener("mouseover", function() {
        this.style.opacity = 2;
		newwin.style.display='';
        newwin.setAttribute("taropc", 2)
    }, false);
    newwin.addEventListener("mouseout", function() {
        this.style.opacity = 2;
        newwin.setAttribute("taropc", 0.1)
    }, false);
}

function opacityEx(name)
{
    var target = document.getElementById(name);
    var newpos = target.getAttribute("taropc");
    var curr_pos = parseFloat(target.style.opacity);
    if (curr_pos < newpos) {
        if (curr_pos-newpos<-0.2)
            curr_pos += 0.2;
        else
            curr_pos = newpos;
        target.style.opacity = curr_pos;
    }else if (curr_pos > newpos) {
        if (curr_pos-newpos>0.02)
            curr_pos -= 0.02;
        else
            curr_pos = newpos;
        target.style.opacity = curr_pos;
		if(target.style.opacity<=0.1)target.style.display='none';
    }
    hwnd_Opacity = setTimeout(function () {opacityEx(name)}, 50);
}

function moveEx(name)
{
    var target = document.getElementById(name);
    var newpos = target.getAttribute("tarpos");
    var curr_pos = parseInt(target.style.top);
    if (curr_pos < newpos) {
        if (curr_pos-newpos<-8)
            curr_pos -= (curr_pos-newpos)/4;
        else
            curr_pos +=1;
        target.style.top = curr_pos;
        hwnd_Move = setTimeout(function () {moveEx(name)}, 50);
    }else if (curr_pos > newpos) {
        if (curr_pos-newpos>8)
            curr_pos -= (curr_pos-newpos)/4;
        else
            curr_pos -=1;
        target.style.top = curr_pos;
        hwnd_Move = setTimeout(function () {moveEx(name)}, 50);
    }else
        hwnd_Move = 0;
}
//window.addEventListener("load", main, false);
main();
