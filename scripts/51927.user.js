// ==UserScript==
// @name           DragonCave 汉化补丁
// @namespace      http://www.dsyqt.com
// @include        http://*.dragcave.net/*
// @include        http://dragcave.net/*
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         CarlKuang
// @version        1.6.0
/* @reason  
2009年6月22日
1.6.0   又翻译了挺多东西。
   @end*/
// ==/UserScript==

var thisScript = {
name: "DragonCave 汉化补丁",
id: "51927",
version:"1.6.0"
}
var updater = new Updater(thisScript);
updater.check();

var mhtml = document.body.innerHTML;
var torep = new Array();
var repby = new Array();

//图片
torep = torep.concat('style="margin-left: -11.5px;"');
repby = repby.concat('style="margin-left: -11.5px;" id="gonnarem"');

torep = torep.concat('/layout/header.gif');
repby = repby.concat('http://kuanghao04.googlepages.com/header.png');

torep = torep.concat('/layout/link-cave.png');
repby = repby.concat('http://kuanghao04.googlepages.com/link-cave.png');

torep = torep.concat('/layout/link-scroll.png');
repby = repby.concat('http://kuanghao04.googlepages.com/link-scroll.png');

torep = torep.concat('/layout/link-shop.png');
repby = repby.concat('http://kuanghao04.googlepages.com/link-shop.png');

torep = torep.concat('/layout/link-logout.png');
repby = repby.concat('http://kuanghao04.googlepages.com/link-logout.png');

torep = torep.concat('/layout/link-reg.png');
repby = repby.concat('http://kuanghao04.googlepages.com/link-reg.png');

torep = torep.concat('/layout/link-login.png');
repby = repby.concat('http://kuanghao04.googlepages.com/link-login.png');

//长句子
torep = torep.concat('<a href="http://portfolio.technoized.com/">Techno.Dev</a>.');
repby = repby.concat('<a href="http://portfolio.technoized.com/">Techno.Dev</a>, <a href="http://www.dsyqt.com/">木是伊</a> 翻译.');

torep = torep.concat('Use of this site is subject to the');
repby = repby.concat('使用本网站必须遵守');

torep = torep.concat('You enter the cave and see many large dragons scattered about, some with hatchlings, sleeping on piles of gold.');
repby = repby.concat('您已进入洞穴，看到了许多分散开来的大龙吧？有一些还和幼龙在黄金堆旁睡觉呢！');

torep = torep.concat('Near the entrance to the cave, there are three eggs.');
repby = repby.concat('另外，在洞的入口处，有三个龙蛋。');

torep = torep.concat('You also see a pile of scrolls on the ground.');
repby = repby.concat('地上还有一堆卷轴。');

torep = torep.concat('Having been here before, you have started <a href="/account">a scroll</a> to record information about the growth and progress of your eggs.');
repby = repby.concat('你已用一张 <a href="/account">卷轴</a> 记录了你的龙蛋的成长进程。');

torep = torep.concat('A scroll labeled "<a href="http://forums.dragcave.net">Forum</a>" also catches your eye.');
repby = repby.concat('还有一张标记为 "<a href="http://forums.dragcave.net">论坛</a>" 的卷轴同样吸引了你的眼球。');

torep = torep.concat('If you\'d like, you can <a href="/register">take one</a> to record your travels on, or if you already have one, you can <a href="/login">get yours</a>.');
repby = repby.concat('如果喜欢，你可以 <a href="/register">拿一张</a> 来记录你的进程，如果你已经有一张了，你可以 <a href="/login">取出来</a>。');

torep = torep.concat('The entrance to the cave is blocked by a huge pile of abandoned eggs.');
repby = repby.concat('洞口被一大堆遗弃的龙蛋堵住了。');

torep = torep.concat('Maybe you should help clear it out by <a href="./abandoned">taking one</a>.');
repby = repby.concat('也许你可以 <a href="./abandoned">拿掉一个</a> 来帮我们减轻负担。');

torep = torep.concat('Near the entrance to the cave, there are some abandoned eggs. If you don\'t want the dragons inside to die, you can <a href="./abandoned">take one of those</a> instead.');
repby = repby.concat('在洞口旁边有一些被遗弃的龙蛋。如果你不想他们死去，那么你可以 <a href="./abandoned">拿一个</a> 去。');

torep = torep.concat('You don\'t want to disturb the dragons by touching their gold, but the eggs in front are far enough away that you could steal one. Which do you take?');
repby = repby.concat('你不会想去打扰那些龙的，但摆在面前的龙蛋离他们很远，你可以偷一个哦！你想要哪个呢？');

torep = torep.concat('If you would like to create an account, please fill out the following information and click "Join."');
repby = repby.concat('如果你想要建立一个新帐号，请填写以下信息，并点击“加入”。');

torep = torep.concat('You will then have to verify your e-mail address before you can access your account.');
repby = repby.concat('然后你会收到一封激活信，激活后才能使用您的账号。');

torep = torep.concat('Usernames must be between 4 and 20 characters and can contain only letters, numbers, hyphens, and underscores.');
repby = repby.concat('账号长度必须在4至20字符之内，只能包含字母，数字，连接符与下划线。');

torep = torep.concat('Passwords must be at least 6 characters long and can contain any combination of letters, numbers, and symbols.');
repby = repby.concat('密码不得短于6个字符，可以包含字母，数字，以及符号。');

torep = torep.concat('They <i>are</i> case sensitive');
repby = repby.concat('<i>区分</i>大小写');

torep = torep.concat('E.X. "Password" is different from "PaSsWoRd"');
repby = repby.concat('例如：“Abc”与“aBc”不同');

torep = torep.concat('Re-enter the above password to confirm that you entered it correctly.');
repby = repby.concat('重新输入以上密码，确保您输入的是正确的密码。');

torep = torep.concat('E-mail addresses must be properly formated');
repby = repby.concat('电邮地址必须按照指定格式');

torep = torep.concat('. You will be sent an email to confirm this address.');
repby = repby.concat('。 你会收到一封激活信件。');

torep = torep.concat('I agree that I am 13 years of age or older or have a parent\'s permission.');
repby = repby.concat('我在13岁以上或已获取家长的同意。');

torep = torep.concat('I agree to the <a href="/terms">site terms and conditions</a>.');
repby = repby.concat('我同意 <a href="/terms">网站条款和条件</a>。');

torep = torep.concat('Type the two words');
repby = repby.concat('输入两个单词');

torep = torep.concat('To reset your password, please enter your account\'s e-mail address below.');
repby = repby.concat('要重设密码，请填写您的电子信箱。');

torep = torep.concat('An e-mail will be sent containing instructions for resetting your password.');
repby = repby.concat('一封带有重设密码步骤的邮件将会发送至您的信箱。');

torep = torep.concat('Please provide your username and password to log into your account.');
repby = repby.concat('请填写帐号和密码以登录您的账户。');

torep = torep.concat('Users viewing this page');
repby = repby.concat('正在浏览本页的用户数');

torep = torep.concat('New to the site?');
repby = repby.concat('刚来本站？');

torep = torep.concat('Click here to register');
repby = repby.concat('点击注册');

torep = torep.concat('Forgot your password?');
repby = repby.concat('忘了密码？');

torep = torep.concat('If you would like to show this page to others, give them the following link');
repby = repby.concat('如果你想将本页给朋友看，请复制以下链接');

torep = torep.concat('You have stolen the following dragons');
repby = repby.concat('您已偷窃到以下龙');

torep = torep.concat('Ok, just insert the following code somewhere, and try to get as many unique views, repeat views, and clicks as you can');
repby = repby.concat('复制并粘贴以下代码到随便什么地方，尽量得到更多的有效查看，重复查看，还有点击');

torep = torep.concat('BBCode');
repby = repby.concat('BB代码');

torep = torep.concat('for forum signatures');
repby = repby.concat('可用于论坛签名');

torep = torep.concat('You return your scroll to the pile.');
repby = repby.concat('你将卷轴放回去了。');

torep = torep.concat('Sorry, this egg has already been taken by somebody else.');
repby = repby.concat('抱歉，这个龙蛋已被人捷足先登了。');

torep = torep.concat('You already have too many eggs and decide not to overburden yourself by taking this egg.');
repby = repby.concat('你已经有太多龙蛋了，为了不让自己的负担太重，您决定不拿这颗蛋。');

torep = torep.concat('Egg will die if it doesn\'t hatch in:([ ][0-9]*[ ][a-z]*[ ][a-z]*[ ][0-9]*[ ][a-z]*)');
repby = repby.concat('龙蛋在$1内没有孵出就会死掉');

torep = torep.concat('Egg will die if it doesn\'t hatch in:([ ][0-9]*[ ][a-z]*)');
repby = repby.concat('龙蛋在$1内没有孵出就会死掉');

torep = torep.concat('Hatchling will die if it doesn\'t grow up in:([ ][0-9]*[ ][a-z]*[ ][a-z]*[ ][0-9]*[ ][a-z]*)');
repby = repby.concat('幼龙在$1内没有长大就会死掉');

torep = torep.concat('Hatchling will die if it doesn\'t grow up in:([ ][0-9]*[ ][a-z]*)');
repby = repby.concat('幼龙在$1内没有长大就会死掉');

torep = torep.concat('Your dragon, unfortunately, has died.');
repby = repby.concat('很不幸，你的龙已经死了。');

torep = torep.concat('You can kill ([0-9]) more eggs before you must wait for a few weeks');
repby = repby.concat('你再杀死 $1 只后就得等上几星期才可继续。');

torep = torep.concat('In order to <b>kill</b> this dragon, please provide your account password below');
repby = repby.concat('要<b>杀死</b>这头龙，您必须输入您的密码');

torep = torep.concat('In order to <b>kill</b> this hatchling, please provide your account password below');
repby = repby.concat('要<b>杀死</b>这头龙，您必须输入您的密码');

torep = torep.concat('In order to <b>freeze</b> this hatchling, please provide your account password below');
repby = repby.concat('要<b>冻结</b>这头龙，您必须输入您的密码');

torep = torep.concat('<b>Warning</b>: Any inappropriate names <b>will</b> result in the death of your hatchling.');
repby = repby.concat('<b>警告</b>: 任何不适当的名字<b>都会</b>使您的幼龙死亡。');

torep = torep.concat('In order to <b>release</b> this dragon, please provide your account password below');
repby = repby.concat('要<b>释放</b>这头龙，您必须输入您的密码');

torep = torep.concat('You cannot name your egg because only hatchlings and adults can be named.');
repby = repby.concat('你不能命名这只蛋，因为只有幼龙和成年龙才可被命名。');

torep = torep.concat('You cannot give your egg a description because only adults and frozen hatchlings can be described.');
repby = repby.concat('你不能描述这只蛋，因为只有成年龙和冻结幼龙才可被描述。');

torep = torep.concat('You cannot give your hatchling a description because only adults and frozen hatchlings can be described.');
repby = repby.concat('你不能描述这只幼龙，因为只有成年龙和冻结幼龙才可被描述。');

torep = torep.concat('Abandon the egg to die. Others may claim the abandoned egg and take it as their own.');
repby = repby.concat('遗弃这只龙蛋。其他人可以检回去并据为己有。');

torep = torep.concat('Abandon the hatchling to die. Others may claim the abandoned hatchling and take it as their own.');
repby = repby.concat('遗弃这只幼龙。其他人可以检回去并据为己有。');

torep = torep.concat('Hide the egg, preventing it from being viewed.');
repby = repby.concat('隐藏这只蛋，防止它被查看。');

torep = torep.concat('Hide the hatchling, preventing it from being viewed.');
repby = repby.concat('隐藏这只龙，防止它被查看。');

torep = torep.concat('Kill the egg.');
repby = repby.concat('杀死这只蛋。');

torep = torep.concat('Kill the hatchling.');
repby = repby.concat('杀死这只幼龙。');

torep = torep.concat('In order to <b>abandon</b> this egg, please provide your account password below');
repby = repby.concat('要<b>遗弃</b>这只蛋，您必须输入您的密码');

torep = torep.concat('In order to <b>abandon</b> this hatchling, please provide your account password below');
repby = repby.concat('要<b>遗弃</b>这只幼龙，您必须输入您的密码');

torep = torep.concat('You hide the egg in a thick cloud of fog');
repby = repby.concat('你将这只蛋藏于厚厚的云雾中');

torep = torep.concat('You hide the hatchling in a thick cloud of fog');
repby = repby.concat('你将这只幼龙藏于厚厚的云雾中');

torep = torep.concat('Unhide the egg, allowing it to be viewed.');
repby = repby.concat('显示这只蛋，允许它被查看。');

torep = torep.concat('Unhide the hatchling, allowing it to be viewed.');
repby = repby.concat('显示这只幼龙，允许它被查看。');

torep = torep.concat('You dispell the fog around the egg');
repby = repby.concat('你将云雾驱散开来了');

torep = torep.concat('You dispell the fog around the hatchling');
repby = repby.concat('你将云雾驱散开来了');

torep = torep.concat('Give the hatchling a name. Can only be done once.');
repby = repby.concat('给这只幼龙命名。 只能命名一次。');

torep = torep.concat('Prevent the hatchling from maturing into an adult. Irreversible.');
repby = repby.concat('防止幼龙长成为成年龙。 不可逆操作。');

torep = torep.concat('You pick up the scroll labeled "(.*?)," and see small sketches of dragons as well as information about them.');
repby = repby.concat('你选择了带有“$1”标记的卷轴，并查看上面龙的缩略画以及部分信息。');

torep = torep.concat('If you would like your own dragons, you\'ll have to go to the <a href="/">Cave Entrance</a>.');
repby = repby.concat('如果你想看看自己的龙，你可能需要去<a href="/">龙洞入口</a>。');

torep = torep.concat('Once an egg has been touched by a human, the human\'s scent rubs off onto the egg.');
repby = repby.concat('一旦有人碰了龙蛋，此人的气息就和龙蛋共存了。');

torep = torep.concat('The mother dragon then will reject the egg and no longer be able to tell that it is her own.');
repby = repby.concat('母龙则就会排斥这只蛋，并认不出这是自己的蛋。');

torep = torep.concat('That\'s why these abandoned eggs and hatchlings are just sitting outside the cave, dying, and the mother dragon isn\'t doing anything about them.');
repby = repby.concat('这就是为什么这些被遗弃的蛋和幼龙仅仅是呆在这儿，而那些母龙却坐视不管。');

torep = torep.concat('Try as you might, you can not seem to find the egg you are looking for in the abandoned area.');
repby = repby.concat('你尝试着，但在这弃蛋之地找不到你所寻找的龙蛋。');

torep = torep.concat('Please note that it is against the site rules to give aid to a user without their permission.');
repby = repby.concat('请注意，未经用户允许对其进行援助是违反网站条例的。');

torep = torep.concat('Unborn dragons are actually ready to hatch early on in their development cycle.');
repby = repby.concat('按照龙发育周期未出生的龙其实早就可以被孵出来。');

torep = torep.concat('However, they choose to remain in the safety of their own egg rather than leave it.');
repby = repby.concat('但它们为了自身安全选择不出来而继续呆在蛋中。');

torep = torep.concat('If a developed dragon is forced out of its egg prematurely, it will usually run away or hide immediately.');
repby = repby.concat('如果一只成熟龙过早的被迫出壳，它通常会立即跑掉或藏起来。');

torep = torep.concat('Dragons are creatures with nearly unlimited life spans.');
repby = repby.concat('龙基本上都能永生。');

torep = torep.concat('They can survive for long periods of time, and no one has found a dragon that has died of old age.');
repby = repby.concat('他们可以活很久，没人找到过老死的龙。');

torep = torep.concat('Hatchlings spend a relatively long period of time as hatchlings, from 100 to 200 years, before they mature.');
repby = repby.concat('龙在成熟之前的幼龙阶段相对较长，大约在100至200年左右。');

torep = torep.concat('Adolescence is usually marked by a hatchling\'s wings growing in, but not all breeds of dragons grow wings.');
repby = repby.concat('翅膀的长成一般意味着龙的青年期到了，但不是所有种类的龙都能长翅膀。');

torep = torep.concat('Baby dragons all look very similar, but once they hit adolescence, they change very fast, they mature to their full forms in only 2 years.');
repby = repby.concat('幼龙看起来都差不多，但一旦进入青年期它们就会迅速的改变样貌，它们成熟并完型之需要2年的时间。');

torep = torep.concat('Dragons don\'t communicate with each other verbally, but they will growl to scare off predators and frighten prey.');
repby = repby.concat('龙不会互相口头交流，但它们会用咆哮吓退敌人以及吓唬猎物。');

torep = torep.concat('Young dragons will emit an extremely high-pitched squeal when they are frightened.');
repby = repby.concat('青年龙在害怕时通常会发出高音的尖叫。');

torep = torep.concat('To communicate, they use telepathy with each other and to speak to other creatures.');
repby = repby.concat('它们会互相使用感应交流，但对于其他物种，它们则会开口交流。');

torep = torep.concat('([A-Z][a-z][a-z]) ([0-9][0-9]), ([0-9][0-9][0-9][0-9])');
repby = repby.concat('$3年$1$2日');

torep = torep.concat('You cannot revive this egg because only hatchlings and adults can be revived.');
repby = repby.concat('你不能复活这只龙蛋，因为只有因为只有幼龙和成年龙才可被复活。');

torep = torep.concat('You cannot abandon this egg because it has died.');
repby = repby.concat('你不能遗弃这只龙蛋，因为它已经死了。');

torep = torep.concat('Art created by Dovealove, Hawaiianbabidoll, Lyssie, Lythiaren, Pokemonfan13, Shiro Shitoro, Vicats, moonsfire');
repby = repby.concat('图画创作：Dovealove, Hawaiianbabidoll, Lyssie, Lythiaren, Pokemonfan13, Shiro Shitoro, Vicats, moonsfire');

torep = torep.concat('<a href="#" onmouseover="javascript:this.href=\'mailto:tj09\'+\'&#64;\'+\'dragcave&#46;net\';">T.J. Lipscomb</a> and <a href="http://portfolio.technoized.com/">Techno.Dev</a>');
repby = repby.concat('<a href="#" onmouseover="javascript:this.href=\'mailto:tj09\'+\'&#64;\'+\'dragcave&#46;net\';">T.J. Lipscomb</a> 与 <a href="http://portfolio.technoized.com/">Techno.Dev</a>');

torep = torep.concat('30 dragons with normal tiles, 60 with small tiles');
repby = repby.concat('一般大小缩略图上能放30只，大缩略图上能放60只');

torep = torep.concat('60 dragons with normal tiles, 132 with small tiles');
repby = repby.concat('一般大小缩略图上能放60只，大缩略图上能放132只');

torep = torep.concat('You must save the image and upload it on your own');
repby = repby.concat('您必须保存这张图并上传至其他地方');

torep = torep.concat('Provides bbCode and HTML, URL doesn\'t change when updating');
repby = repby.concat('给出BB代码以及HTML代码，更新后URL地址不改变');

torep = torep.concat('Provides bbCode and HTML');
repby = repby.concat('给出BB代码以及HTML代码');

torep = torep.concat('Show username on incubator');
repby = repby.concat('在孵化箱中显示账号');

torep = torep.concat('Your incubator has been generated.');
repby = repby.concat('你的孵化箱已经生成。');

torep = torep.concat('Please download the following image and upload it to your own image host in order to use it.');
repby = repby.concat('要使用这张图片，请先下载然后上传至其他网站。');

torep = torep.concat('Please note that hotlinking is disabled for this image.');
repby = repby.concat('请注意这张图片的防盗链已被关闭。');

torep = torep.concat('An incubator is an image that displays your eggs/hatchlings/dragons.');
repby = repby.concat('孵化箱是一张能显示您所有龙蛋、幼龙、成年龙的图片。');

torep = torep.concat('It doesn\'t serve any actual purpose, but it provides a nice image that you can place in forum signatures to show off all of your dragons at once.');
repby = repby.concat('它没有任何实际用处，但是能一次性在一张漂亮的图片上显示您所有的龙，可以放置于论坛签名。');

torep = torep.concat('If you would like an incubator, please choose your settings then click the "Create Incubator!" button');
repby = repby.concat('如果您喜欢，那就设置完信息后点击“创建孵化箱！”按钮');

torep = torep.concat('and uploaded to <a href="http://tinypic.com/">TinyPic</a>.');
repby = repby.concat('并上传至<a href="http://tinypic.com/">TinyPic</a>。');

torep = torep.concat('You may access it below');
repby = repby.concat('以下是你的孵化箱');

torep = torep.concat('type="radio"> Breed');
repby = repby.concat('type="radio"> 种类');

torep = torep.concat('You have already generated an incubator in the past hour.');
repby = repby.concat('您在一小时内生成过一个孵化箱。');

torep = torep.concat('You cannot generate a new incubator until an hour has passed, so any attempts to create a new incubator will still display the old one.');
repby = repby.concat('不能在同一小时内多次生成孵化箱，所以再次生成孵化箱还是会显示老孵化箱。');

torep = torep.concat('<b>Warning:</b> If you have posted your CDN incubator somewhere, it may take time until it updates to the newest version shown below.');
repby = repby.concat('<b>警告:</b> 如果你在其他地方张贴过你的 CDN 孵化箱，请耐心等待孵化箱更新（最新版本列于下方）。');

torep = torep.concat('Aww... It\'s a cute baby dragon...');
repby = repby.concat('啊…真是一只可爱的龙宝宝啊…');

torep = torep.concat('Young dragons are relatively defenseless.');
repby = repby.concat('龙宝宝的保护能力相对较弱。');

torep = torep.concat('Their scales don\'t grow in until right before they mature, and they have almost no strength.');
repby = repby.concat('他们的大小在成熟之前不会改变，而且他们也没什么特长。');

torep = torep.concat('Once a hatchling\'s wings grow in, it marks the beginning of maturation.');
repby = repby.concat('一旦龙宝宝的翅膀开始成长了，就代表着它即将成熟了。');

torep = torep.concat('At this point they are usually left alone by their mother and begin to hunt and survive on their own.');
repby = repby.concat('这时候它们就会被母亲扔在一旁，让它们自己捕食与生存。');

torep = torep.concat('Name your hatchling');
repby = repby.concat('给幼龙命名');

torep = torep.concat('Please make sure this is the name you wish to give your hatchling');
repby = repby.concat('请确认这是您想要的名字（请勿使用中文名）');

torep = torep.concat('Please remember, once the name has been set, it can NOT be changed.');
repby = repby.concat('请记住，命名一旦成功，就不可被更改。');

torep = torep.concat('You try to write the name, but the ink disappears as you write, so you decide to try something else.');
repby = repby.concat('你写名字的过程中墨迹在逐渐消失，所以你决定试试写其他的东西。');

//龙蛋的描述
torep = torep.concat('This light egg is floating in the air.');
repby = repby.concat('这只轻龙蛋漂浮在空中。');

torep = torep.concat('This egg is sitting in a pile of small pebbles.');
repby = repby.concat('这只龙蛋坐在一堆鹅卵石上。');

torep = torep.concat('It\'s bright. And pink.');
repby = repby.concat('它是粉红色的，并发光。');

torep = torep.concat('This egg is hidden behind the others, as if it is shy.');
repby = repby.concat('这只龙蛋藏在其它蛋后面，好像挺害羞。');

torep = torep.concat('This egg is rather warm.');
repby = repby.concat('这只龙蛋相当温暖。');

torep = torep.concat('Wow, purple isn\'t a color of egg you expected to see.');
repby = repby.concat('哇，紫色并不是你想要的颜色。');

torep = torep.concat('This egg has a faint green glow around it.');
repby = repby.concat('这只龙蛋周围有微弱的绿光。');

torep = torep.concat('This egg is sitting on a cloud.');
repby = repby.concat('这只龙蛋坐在云上。');

torep = torep.concat('This egg is surrounded by fog.');
repby = repby.concat('这只龙蛋被云雾缠绕。');

torep = torep.concat('This egg has strange markings on it.');
repby = repby.concat('这只龙蛋上有奇怪的记号。');

torep = torep.concat('The markings on this egg match the weather outside.');
repby = repby.concat('这只龙蛋上的记号和外面天气相符。');

torep = torep.concat('This egg is sitting in a shallow puddle.');
repby = repby.concat('这只蛋坐在一滩水上。');

torep = torep.concat('This egg is split down the middle into two colors.');
repby = repby.concat('这只蛋从中被分为两种颜色。');

torep = torep.concat('This egg is sitting in a patch of grass and small flowers even though there\'s no sun in the cave.');
repby = repby.concat('这只蛋坐在花草中，虽然龙洞里没有太阳。');

torep = torep.concat('This egg shakes from time to time, as if it is eager to hatch.');
repby = repby.concat('这只蛋一直在颤抖，好像挺怕孵化的。');

torep = torep.concat('This egg has an orange aura radiating from it.');
repby = repby.concat('这只蛋周围有橙色光环。');

torep = torep.concat('This egg is sitting in front of the others.');
repby = repby.concat('这只蛋列于其他蛋之前。');

//继续句子
torep = torep.concat('The following actions are available');
repby = repby.concat('以下动作可用');

torep = torep.concat('Kill the dragon.');
repby = repby.concat('杀死这头龙。');

torep = torep.concat('Release the dragon. It will still be alive, but will no longer be owned by you. This action is irreversible, and will cause the dragon to lose its name.');
repby = repby.concat('释放这头龙。它还会活着，但不会是你的龙了。此操作不可逆转，并会使其丢失名字。');

torep = torep.concat('Give the dragon a description.');
repby = repby.concat('描述这头龙。');

torep = torep.concat('This dragon cannot breed because it last bred less than ([0-9]) day([|s]) ago.');
repby = repby.concat('这头龙不能繁殖，因为上次繁殖时间距今不过 $1 天。');

torep = torep.concat('You must enter your current password to make any changes to your account settings');
repby = repby.concat('您必须输入当前密码以保存账户设定');

torep = torep.concat('Display Username on Dragon Info Page');
repby = repby.concat('在龙信息页上显示账号');

torep = torep.concat('Accept aid from others');
repby = repby.concat('接受其他人的辅助');

torep = torep.concat('Actions Security Method');
repby = repby.concat('动作安全处理方法');

torep = torep.concat('Display TinyURL Codes');
repby = repby.concat('显示 TinyURL 代码');

torep = torep.concat('Require Password Verification');
repby = repby.concat('需要密码验证');

torep = torep.concat('Require Action Name');
repby = repby.concat('需要动作名');

torep = torep.concat('Checking this option will give others permission to post your eggs, hatchlings, and adults in order to help them grow');
repby = repby.concat('勾上则会给其他人权限发布您龙蛋、幼龙、成年龙的链接，帮助成长');

torep = torep.concat('This option determines what type of verification will be required to use actions such as kill or abandon');
repby = repby.concat('此选项可选杀死或遗弃龙时使用哪种方式验证');

torep = torep.concat('Error: You must enter your current password correctly to change any account settings. Please go back and try again.');
repby = repby.concat('错误: 你必须输入正确的当前密码来改变账户设置。请返回重试。');

//词组
torep = torep.concat('Select a poll');
repby = repby.concat('选择一个投票');

torep = torep.concat('Results only');
repby = repby.concat('仅查看结果');

torep = torep.concat('HTML code');
repby = repby.concat('HTML 代码');

torep = torep.concat('users online.');
repby = repby.concat('在线用户');

torep = torep.concat('Dragon Cave Copyright');
repby = repby.concat('龙之洞（&#68;&#114;&#97;&#103;&#111;&#110;&#32;&#67;&#97;&#118;&#101;） 版权所有');

torep = torep.concat('Dragon Cave');
repby = repby.concat('龙之洞');

torep = torep.concat('Desired Username');
repby = repby.concat('理想账号');

torep = torep.concat('Desired Password');
repby = repby.concat('理想密码');

torep = torep.concat('Re-enter Password');
repby = repby.concat('验证密码');

torep = torep.concat('E-mail Address');
repby = repby.concat('电子信箱');

torep = torep.concat('Security Image');
repby = repby.concat('验证图片');

torep = torep.concat('Reset Password');
repby = repby.concat('重设密码');

torep = torep.concat('Welcome back.');
repby = repby.concat('欢迎回来。');

torep = torep.concat('Account Settings');
repby = repby.concat('账户设置');

torep = torep.concat('Generate Incubator');
repby = repby.concat('生成器');

torep = torep.concat('Site Polls');
repby = repby.concat('站点投票');

torep = torep.concat('Unique Views');
repby = repby.concat('有效查看');

torep = torep.concat('Get Code');
repby = repby.concat('获取代码');

torep = torep.concat('day([|s]) left');
repby = repby.concat('天剩余');

torep = torep.concat('day([|s]) and');
repby = repby.concat('天');

torep = torep.concat('hour([|s]) left');
repby = repby.concat('小时剩余');

torep = torep.concat('Overall Views');
repby = repby.concat('总查看');

torep = torep.concat('Egg Stolen on');
repby = repby.concat('龙蛋偷得');

torep = torep.concat('Egg Laid on');
repby = repby.concat('龙蛋放置');

torep = torep.concat('Died on');
repby = repby.concat('死亡日');

torep = torep.concat('Last Bred');
repby = repby.concat('上次产卵');

torep = torep.concat('Hatched on');
repby = repby.concat('孵出日');

torep = torep.concat('Grew up on');
repby = repby.concat('长成日');

torep = torep.concat('Get your own');
repby = repby.concat('你也来养一个吧');

torep = torep.concat('Current Password');
repby = repby.concat('当前密码');

torep = torep.concat('Change Password');
repby = repby.concat('修改密码');

torep = torep.concat('Confirm New Password');
repby = repby.concat('确认新密码');

torep = torep.concat('New Password');
repby = repby.concat('新密码');

torep = torep.concat('Sort By');
repby = repby.concat('排序');

torep = torep.concat('Reverse Sort');
repby = repby.concat('反向排序');

torep = torep.concat('Use Account Setting');
repby = repby.concat('使用账号设置');

torep = torep.concat('Back to actions');
repby = repby.concat('返回动作');

torep = torep.concat('Site Advertisements');
repby = repby.concat('站点广告');

torep = torep.concat('Sprite Replacement');
repby = repby.concat('精灵替换(?)');

torep = torep.concat('Dragon Naming');
repby = repby.concat('龙的命名');

torep = torep.concat('Posting Others\' Eggs');
repby = repby.concat('张贴别人的龙蛋');

torep = torep.concat('Merchandise');
repby = repby.concat('商品交易');

torep = torep.concat('Curiosity');
repby = repby.concat('好奇心');

torep = torep.concat('Terms and Conditions');
repby = repby.concat('条款和条件');

torep = torep.concat('Show Eggs');
repby = repby.concat('显示龙蛋');

torep = torep.concat('Show Hatchlings');
repby = repby.concat('显示幼龙');

torep = torep.concat('Show Frozen Hatchlings');
repby = repby.concat('显示冻结幼龙');

torep = torep.concat('Show Adults');
repby = repby.concat('显示成年龙');

torep = torep.concat('Hide Duplicates');
repby = repby.concat('隐藏重复龙');

torep = torep.concat('Tile Size');
repby = repby.concat('缩略图大小');

torep = torep.concat('Incubator Size');
repby = repby.concat('孵化箱大小');

torep = torep.concat('Do not Upload');
repby = repby.concat('不需上传');

torep = torep.concat('Upload to');
repby = repby.concat('上传至');

torep = torep.concat('Create Incubator!');
repby = repby.concat('创建孵化箱！');

//单词
torep = torep.concat('Agreements');
repby = repby.concat('用户协议');

torep = torep.concat('Join!');
repby = repby.concat('加入！');

torep = torep.concat('E-Mail');
repby = repby.concat('电子信箱');

torep = torep.concat('Login!');
repby = repby.concat('登录！');

torep = torep.concat('Username');
repby = repby.concat('帐号');

torep = torep.concat('Password');
repby = repby.concat('密码');

torep = torep.concat('Updated');
repby = repby.concat('已更新');

torep = torep.concat('Name');
repby = repby.concat('命名');

torep = torep.concat('Type');
repby = repby.concat('属性');

torep = torep.concat('Manage');
repby = repby.concat('管理');

torep = torep.concat('View([|s])');
repby = repby.concat('查看');

torep = torep.concat('Click([|s])');
repby = repby.concat('点击');

torep = torep.concat('<th>Dragon</th>');
repby = repby.concat('<th>龙</th>');

torep = torep.concat('Adult');
repby = repby.concat('成年龙');

torep = torep.concat('Dead Egg');
repby = repby.concat('死蛋');

torep = torep.concat('Egg');
repby = repby.concat('龙蛋');

torep = torep.concat('Action([|s])');
repby = repby.concat('动作');

torep = torep.concat('Children');
repby = repby.concat('子女');

torep = torep.concat('Gender');
repby = repby.concat('性别');

torep = torep.concat('Male');
repby = repby.concat('雄性');

torep = torep.concat('Female');
repby = repby.concat('雌性');

torep = torep.concat('Father');
repby = repby.concat('父亲');

torep = torep.concat('Mother');
repby = repby.concat('母亲');

torep = torep.concat('Owner');
repby = repby.concat('主人');

torep = torep.concat('Date');
repby = repby.concat('日期');

torep = torep.concat('Default');
repby = repby.concat('默认');

torep = torep.concat('Growth');
repby = repby.concat('成长');

torep = torep.concat('Hatchling');
repby = repby.concat('幼龙');

torep = torep.concat('Custom');
repby = repby.concat('自定义');

torep = torep.concat('Edit');
repby = repby.concat('编辑');

torep = torep.concat('Save!');
repby = repby.concat('保存！');

torep = torep.concat('Sort');
repby = repby.concat('排序');

torep = torep.concat('Kill');
repby = repby.concat('杀死');

torep = torep.concat('Release');
repby = repby.concat('释放');

torep = torep.concat('Describe');
repby = repby.concat('描述');

torep = torep.concat('Breed');
repby = repby.concat('繁殖');

torep = torep.concat('Abandon');
repby = repby.concat('遗弃');

torep = torep.concat('Hide');
repby = repby.concat('隐藏');

torep = torep.concat('Revive');
repby = repby.concat('复活');

torep = torep.concat('hour([|s])');
repby = repby.concat('小时');

torep = torep.concat('Unhide');
repby = repby.concat('显示');

torep = torep.concat('Unkown');
repby = repby.concat('未知');

torep = torep.concat('Display');
repby = repby.concat('显示');

torep = torep.concat('Automatic');
repby = repby.concat('自动');

torep = torep.concat('Uploading');
repby = repby.concat('上传');

torep = torep.concat('Other');
repby = repby.concat('其他');

torep = torep.concat('Normal');
repby = repby.concat('一般');

torep = torep.concat('Small');
repby = repby.concat('小');

torep = torep.concat('Large');
repby = repby.concat('大');

torep = torep.concat('Unnamed');
repby = repby.concat('未命名');

torep = torep.concat('Freeze');
repby = repby.concat('冻结');

torep = torep.concat('day([|s])');
repby = repby.concat('天');

torep = torep.concat('Jan([0-9])','Feb([0-9])','Mar([0-9])','Apr([0-9])','May([0-9])','Jun([0-9])','Jul([0-9])','Aug([0-9])','Sep([0-9])','Oct([0-9])','Nov([0-9])','Dec([0-9])');
repby = repby.concat('1月$1','2月$1','3月$1','4月$1','5月$1','6月$1','7月$1','8月$1','9月$1','10月$1','11月$1','12月$1');

for (var i=0; i<torep.length; i++) {
	var regex = new RegExp(torep[i],'g');
	mhtml = mhtml.replace(regex, repby[i]);
}

document.body.innerHTML = mhtml;

//去广告
document.getElementById("gonnarem").parentNode.removeChild(document.getElementById("gonnarem"));
document.getElementById("google_ads_frame1").parentNode.removeChild(document.getElementById("google_ads_frame1"));