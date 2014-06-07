// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Kaixin001 Assistant
// @namespace       http://cuimingda.com
// @description     Enhance features in the "Parking Game" and "Slave Game".
// @include         http://*.kaixin001.tld/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require         http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.js
// ==/UserScript==
//
// 1.00 @ 2008/12/06 # Initial Release
// 1.01 @ 2008/12/06 # 如果朋友在线，点击在线图标可以直接进入发消息页面。
// 1.02 @ 2008/12/07 # 在所有名字链接前面增加直接可以发消息的@链接。
// 1.03 @ 2008/12/07 # 增加功能：在我的汽车列表中显示每辆车的单价及总价。
// 1.04 @ 2008/12/07 # 增加功能：在朋友买卖游戏中，自动选择讨好主人、安抚奴隶和整奴隶的方式。
// 1.05 @ 2008/12/09 # 在访问记录页面，点击头像直接删除访问记录。
// 1.06 @ 2008/12/12 # 增加了文字版争车位。
// 1.07 @ 2008/12/12 # 修正了添加好友界面布局的问题。
// 1.08 @ 2008/12/13 # 修正了部分车速值。
// 1.09 @ 2008/12/13 # 争车位增加了购车建议。
// 1.10 @ 2008/12/13 # 在我的汽车列表中点击车型，直接可以在车市中显示该车。
// 1.11 @ 2008/12/14 # 增加表格式换车指南。
// 1.12 @ 2008/12/14 # 重写了停车位游戏部分的代码，效率高一点。
// 1.13 @ 2008/12/15 # 修正了停车部分的逻辑，不会出现判断错误的情况。
// 1.14 @ 2008/12/15 # 争车位游戏，新增文字版排行榜。
// 1.15 @ 2008/12/15 # 在拉力赛首页，点击正在进行比赛的好友名称可以直接加油。
// 1.16 @ 2008/12/15 # 为加油的好友做个标记/修正没有停车位的车显示上的误差。
// 1.17 @ 2008/12/15 # 解决相册不能翻页/日记不能点名/相册不能留言/不能上传头像等和图像有关的问题。
// 1.18 @ 2008/12/15 # 修正在获取车队时的逻辑错误。
// 1.19 @ 2008/12/16 # 修正加油和捣乱颠倒的问题；加油以后点确定不会跳到比赛窗口。
// 1.20 @ 2008/12/16 # 增加车市以旧换新文字版。
// 1.21 @ 2008/12/17 # 修正了加油时的一个小bug，导致加油后会多刷新一次页面。
// 1.22 @ 2008/12/17 # 增加快速切换马甲功能，但不推荐使用。
// 1.23 @ 2008/12/18 # 为几个数据表格增加整行选择和排序功能。
// 1.30 @ 2008/12/19 # 利用Greasemonkey 0.8新增加的require，改进加载脚本的机制。1.3以下版本需要卸载以后重新安装。
// 1.31 @ 2008/12/24 # 车市数据增加荣威550；停车列表把漂泊中排在倒数第二位；按ESC关闭对话框。
//
// Tested on Firefox 3.05 and Greasemonkey 0.8
// --------------------------------------------------------------------------------

;(function() {
    $(document).ready(function() {
        if($(this).attr("title") === '') return;
        
        externalStyleSheets.load();
        
        if(currentPage.isParking)       parkingGame.createSimpleList();
        if(currentPage.isParking)       parkingGame.createUpgradeList();
        if(currentPage.isParking)       parkingGame.sortFriendsList();
        if(currentPage.isSelectCar)     parkingGame.simpleCarsMode();
        if(currentPage.isMarket)        parkingGame.viewSpeedInMarket();
        if(currentPage.isTeam)          parkingGame.directOilMode();
        if(currentPage.isOil)           parkingGame.replaceOilOkButton();
        if(currentPage.isRank)          parkingGame.simpleRank();
        if(currentPage.isUpdateCar)     parkingGame.createUpdatingCarList();
        if(currentPage.isAll)           parkingGame.raceMenu();
        
        if(currentPage.isPain)          slaveGame.autoSelectPainType();
        if(currentPage.isComfort)       slaveGame.autoSelectComfortType();
        if(currentPage.isFawn)          slaveGame.autoSelectFawnType();
        
        if(currentPage.isVisitor)       friendsGame.clickToDelete(true);
        if(currentPage.isVisited)       friendsGame.clickToDelete(false);
        if(currentPage.isNew)           friendsGame.newPage()
        if(currentPage.isFriend)        friendsGame.showStrangerFriends();
        if(currentPage.isAll)           friendsGame.friendShortcut();
        
        if(currentPage.isAll)           escapeToCloseDialog();
    });

    var settings = {
        friendMark  : "★",
        messageMark : "☆",
        friendMessage : '*^_^*',
        reHome      : /\/home\/(\?t=\d+)?$/,
        reFriend    : /\/home\/\?uid=(\d+)$/,
        reAvatar    : /logo\/\d+\/\d+\/\d+_(\d+)_\d+\.jpg$/,
        reTrim      : /^\s+|\s+$/g
    };
    
    var currentPage = {
        isHome          : settings.reHome.test(location.href),
        isFriend        : settings.reFriend.test(location.href),
        isSlave         : location.href === "http://www.kaixin001.com/app/app.php?aid=1028" || location.href.indexOf("aid=1028&url=index.php") !== -1,
        isParking       : location.href === "http://www.kaixin001.com/app/app.php?aid=1040" || location.href.indexOf("aid=1040&url=index.php") !== -1,
        isVisitor       : location.href.indexOf('/friend/visitor.php')          !== -1,
        isVisited       : location.href.indexOf('/friend/visited.php')          !== -1,
        isNew           : location.href.indexOf('/friend/new.php')              !== -1,
        isFawn          : location.href.indexOf('/slave/fawn_dialog.php')       !== -1,
        isComfort       : location.href.indexOf('/slave/comfort_dialog.php')    !== -1,
        isPain          : location.href.indexOf('/slave/pain_dialog.php')       !== -1,
        isSelectCar     : location.href.indexOf('/parking/selcar.php')          !== -1,
        isOil           : location.href.indexOf('/parking/teamoil.php')         !== -1,
        isUpdateCar     : location.href.indexOf('/parking/updatecar.php')       !== -1,
        isMarket        : location.href.indexOf('aid=1040&url=market.php')      !== -1,
        isTeam          : location.href.indexOf('aid=1040&url=myteam.php')      !== -1,
        isRank          : location.href.indexOf('aid=1040&url=rank.php')        !== -1,
        isAll           : true
    };
    
    var externalStyleSheets = {
        links : ['http://oragg.com/scripts/38206/ka.css'],
        
        load : function() {
            for (i in this.links) {
                var link = document.createElement('link');
                link.href = this.links[i];
                link.type = 'text/css';
                link.rel = 'stylesheet';
                document.getElementsByTagName('head')[0].appendChild(link);
            }        
        }
    };
    
    // 所有的Dialog，没有执行操作的前提下，都可以直接按ESC关闭。
    var escapeToCloseDialog = function() {
        $(document).keyup(function(event) {
            if(event.keyCode === 27 && $("#dialogClose").length === 1) {
                var mouseEvent = document.createEvent('MouseEvents');        
                mouseEvent.initEvent('click', true, true);        
                $("#dialogClose").find("a:first").get(0).dispatchEvent(mouseEvent);         
            }
        });  
    };
   
    // --------------------------------------------------------------------------------
    // 好友管理
    // --------------------------------------------------------------------------------
    var friendsGame = {};
    
    // 加好友时，自动添加内容
    friendsGame.newPage = function() {
        $('#content').text(settings.friendMessage);
    };
    
    // 删除访问记录
    friendsGame.clickToDelete = function(isVisitor) {
        $('img[width=50][height=50]').each(function() {
            $(this).click(function(event) {
                if(!settings.reAvatar.test($(this).attr('src'))) return;

                var id = $(this).attr('src').match(settings.reAvatar)[1];
                var div = $(this).parent().parent().parent().parent();
                var parameters = isVisitor ? {start:"0",vuid:id} : {start:"0",from:"1",vuid:id};
                
                $.post("/friend/delvisitor.php", parameters, function(data) { div.hide(); });
                
                event.preventDefault();
            });
        });
    };
    
    // 快速发消息、快速加好友
    friendsGame.friendShortcut = function() {
        $("a:not(:has(img))").each(function() {
            if(!settings.reFriend.test($(this).attr('href'))) return;
            if($(this).text().replace(settings.trim, "") === '') return;
            
            var id = $(this).attr('href').match(settings.reFriend)[1];
            
            $("<a href='/msg/write.php?uids=" + id + "'>" + settings.messageMark + "</a>").insertBefore($(this));
            $("<a href=''>" + settings.friendMark + "</a>").insertBefore($(this)).click(function(event) {
                event.preventDefault();
                unsafeWindow.openWindow('/friend/new.php?touid=' + id, 430, 250, '加为好友');
            });
        });
    };
    
    // 为非好友的好友列表增加访问链接
    friendsGame.showStrangerFriends = function() {
        $('div>img[height=50][width=50]').each(function() {
            if(!settings.reAvatar.test($(this).attr('src'))) return;
            
            var id = $(this).attr('src').match(settings.reAvatar)[1];
            
            $(this).wrap("<a href='/home/?uid=" + id + "'></a>");
            $(this).parent().parent().next().contents().not("[nodeType=1]").wrap("<a class='s1' href='/home/?uid=" + id + "' />");
        });
    };
    
    // --------------------------------------------------------------------------------
    // 朋友买卖游戏
    // --------------------------------------------------------------------------------
    var slaveGame = {};
    
    slaveGame.comfortType=[{value:'1',text:'给她泡菊花茶'},{value:'2',text:'请她吃西餐'},{value:'3',text:'带她去公园散步'},{value:'4',text:'给她做足底按摩'},{value:'5',text:'带她去泡温泉'},{value:'6',text:'给她穿漂亮的新衣服'},{value:'7',text:'未知'},{value:'8',text:'未知'},{value:'9',text:'给她暖被窝'},{value:'10',text:'自定义安抚手段'},{value:'11',text:'未知'},{value:'12',text:'给她洗头'},{value:'13',text:'给她搓背'},{value:'14',text:'未知'},{value:'15',text:'带她逛夜店'},{value:'16',text:'带她到香港玩一天'},{value:'17',text:'请她喝酒'},{value:'18',text:'任命她为贴身丫环'},{value:'19',text:'未知'},{value:'20',text:'背她上楼'},{value:'21',text:'给她准备洗澡水'},{value:'22',text:'未知'},{value:'23',text:'帮她穿衣服'},{value:'24',text:'带她去学游泳'},{value:'25',text:'带她去郊外别墅度周末'}];
    slaveGame.painType=[{value:'1',text:'在冰冷小黑屋关一天'},{value:'2',text:'痛扁一顿'},{value:'3',text:'饿一天不给饭吃'},{value:'4',text:'在大街上当马骑'},{value:'5',text:'许配给大她60岁的老黑奴'},{value:'6',text:'去黑煤窑挖煤'},{value:'7',text:'去扫厕所'},{value:'8',text:'去歌厅卖唱'},{value:'9',text:'去酒吧陪酒'},{value:'10',text:'给我洗脚'},{value:'11',text:'给我唱个小曲'},{value:'12',text:'给我洗衣服'},{value:'13',text:'给我擦皮鞋'},{value:'14',text:'给我铺床'},{value:'15',text:'自定义整人手段'},{value:'16',text:'倒插门给芙蓉大姐'},{value:'17',text:'去当小保姆'},{value:'18',text:'去挑大粪'},{value:'19',text:'给我煮夜宵吃'},{value:'20',text:'去刷马桶'},{value:'21',text:'拿鞭子抽'},{value:'22',text:'跪半天搓衣板'},{value:'23',text:'给我跳一段钢管舞'}];
    slaveGame.fawnType=[{value:'1',money:0,text:'给她请安'},{value:'2',money:0,text:'给她剪指甲'},{value:'3',money:0,text:'给她揉腿'},{value:'4',money:0,text:'给她捶背'},{value:'5',money:0,text:'未知'},{value:'6',money:0,text:'称颂她的魅力'},{value:'7',money:0,text:'未知'},{value:'8',money:0,text:'称颂她的才华'},{value:'9',money:0,text:'给她做SPA'},];
    
    slaveGame.autoSelectFawnType = function() {
        $('input[name=fawntype]:first').attr('checked', 'checked');
    };
    
    slaveGame.autoSelectComfortType = function() {
        $('input[name=comforttype]:first').attr('checked', 'checked');
    };
    
    slaveGame.autoSelectPainType = function() {
        $("li:contains('去当小保姆')>input").attr('checked', 'checked').parent().parent().parent().animate({scrollTop: 400}, 0);
        $("li:contains('去黑煤窑挖煤')>input").attr('checked', 'checked').parent().parent().parent().animate({scrollTop: 400}, 0);
    };
    
    // --------------------------------------------------------------------------------
    // 停车位游戏
    // --------------------------------------------------------------------------------
    var parkingGame = {};
    
    parkingGame.carData=[{id:'1',name:'二手奥拓',price:16000,speed:0},{id:'2',name:'奥拓小王子',price:20000,speed:0},{id:'3',name:'奇瑞QQ',price:36000,speed:0},{id:'4',name:'宝来',price:116000,speed:0},{id:'5',name:'冒牌警车',price:130000,speed:0},{id:'6',name:'甲壳虫',price:250000,speed:112},{id:'7',name:'路虎',price:1280000,speed:130},{id:'8',name:'劳斯莱斯',price:6200000,speed:150},{id:'9',name:'夏利',price:32000,speed:0},{id:'10',name:'吉利自由舰',price:48000,speed:0},{id:'11',name:'富康',price:62000,speed:0},{id:'12',name:'桑塔纳',price:80000,speed:0},{id:'13',name:'POLO',price:91000,speed:0},{id:'14',name:'别克凯越',price:105000,speed:0},{id:'15',name:'卡罗拉',price:132000,speed:0},{id:'16',name:'速腾',price:138000,speed:0},{id:'17',name:'本田CIVIC',price:140000,speed:0},{id:'18',name:'马自达6',price:178000,speed:0},{id:'19',name:'帕萨特',price:186000,speed:0},{id:'20',name:'迈腾',price:198000,speed:0},{id:'21',name:'雅阁',price:199000,speed:0},{id:'22',name:'奥迪A4',price:280000,speed:112},{id:'23',name:'Mini Cooper',price:320000,speed:114},{id:'24',name:'宝马320',price:330000,speed:114},{id:'25',name:'切诺基',price:420000,speed:118},{id:'26',name:'奥迪A6',price:620000,speed:122},{id:'27',name:'宝马730',price:1080000,speed:130},{id:'28',name:'保时捷911',price:1500000,speed:132},{id:'29',name:'奔驰S600',price:2000000,speed:134},{id:'30',name:'标致206',price:78000,speed:0},{id:'31',name:'斯巴鲁翼豹',price:239800,speed:110},{id:'32',name:'法拉利F430',price:3200000,speed:138},{id:'33',name:'悍马',price:800000,speed:126},{id:'34',name:'现代酷派',price:190000,speed:0},{id:'35',name:'雪铁龙C2',price:79000,speed:0},{id:'36',name:'雨燕',price:69000,speed:0},{id:'37',name:'福特福克斯',price:128000,speed:0},{id:'38',name:'标致307',price:110000,speed:0},{id:'39',name:'兰博基尼',price:3980000,speed:140},{id:'40',name:'布加迪威龙',price:25000000,speed:150},{id:'41',name:'奥迪TT',price:645000,speed:122},{id:'42',name:'宝马X5',price:1336000,speed:130},{id:'43',name:'途胜',price:241800,speed:110},{id:'44',name:'玛莎拉蒂',price:1790000,speed:132},{id:'45',name:'迈巴赫62',price:6180000,speed:150},{id:'46',name:'S-MAX',price:219800,speed:110},{id:'47',name:'宝马Z4',price:568000,speed:120},{id:'48',name:'雅致728',price:13880000,speed:150},{id:'49',name:'骐达',price:149800,speed:0},{id:'50',name:'蒙迪欧-致胜',price:239800,speed:110},{id:'51',name:'高尔夫',price:139000,speed:0},{id:'52',name:'朗逸',price:149800,speed:0},{id:'53',name:'新毕加索',price:157800,speed:0},{id:'54',name:'赛拉图',price:127800,speed:0},{id:'55',name:'帕加尼',price:12990000,speed:150},{id:'56',name:'沃尔沃XC90',price:1138000,speed:130},{id:'57',name:'途锐',price:1580000,speed:132},{id:'58',name:'奥迪Q7',price:1232000,speed:130},{id:'59',name:'奥迪R8',price:1599000,speed:132},{id:'60',name:'凯迪拉克',price:878000,speed:126},{id:'61',name:'飞度',price:129800,speed:0},{id:'62',name:'SPARK乐驰',price:45800,speed:0},{id:'63',name:'雷克萨斯LS600',price:1598000,speed:132},{id:'64',name:'本田CRV',price:239800,speed:110},{id:'65',name:'牧马人',price:525000,speed:120},{id:'66',name:'哈雷摩托',price:300000,speed:114},{id:'67',name:'福田欧马可',price:98800,speed:0},{id:'68',name:'奔驰豪华大巴',price:2500000,speed:136},{id:'69',name:'名爵3SW',price:79800,speed:0},{id:'70',name:'林肯加长',price:1380000,speed:0},{id:'71',name:'RIMOR奔驰房车',price:1500000,speed:132},{id:'72',name:'保时捷卡宴',price:1520000,speed:132},{id:'73',name:'布加迪威航',price:43000000,speed:150},{id:'74',name:'指南者',price:290000,speed:112},{id:'75',name:'PT漫步者',price:239900,speed:110},{id:'76',name:'阿斯顿马丁',price:3620000,speed:140},{id:'77',name:'斯柯达明锐',price:139000,speed:0},{id:'78',name:'捷豹XK',price:1520000,speed:132},{id:'79',name:'别克新一代君威',price:245900,speed:0},{id:'80',name:'雅致R',price:4380000,speed:0},{id:'81',name:'世爵 C8 Spyker',price:4880000,speed:0},{id:'82',name:'劳斯莱斯幻影',price:5650000,speed:0},{id:'83',name:'奥迪A8',price:1935000,speed:132},{id:'84',name:'新BMW 320i',price:375000,speed:130},{id:'85',name:'讴歌MDX3.7',price:830000,speed:0},{id:'86',name:'雷克萨斯SC430',price:1120000,speed:132},{id:'87',name:'萨博9-3',price:635000,speed:0},{id:'88',name:'宝马X6',price:970000,speed:0},{id:'89',name:'凯迪拉克 CTS',price:588000,speed:0},{id:'90',name:'莲花跑车Elise',price:880000,speed:0},{id:'91',name:'林肯领航员',price:738000,speed:0},{id:'92',name:'迈巴赫57',price:5380000,speed:147},{id:'93',name:'空',price:100000000,speed:0},{id:'94',name:'英菲尼迪 FX45',price:808000,speed:0},{id:'95',name:'荣威550',price:126800,speed:0}]
        .sort(function(a,b){return a.price-b.price;});
    
    parkingGame.mapData = [
        ['1', '全国拉力赛', '3506'],
        ['2', '环塔赛 ', '3770'],
        ['3', '中警拉力赛', '3849'],
        ['4', '达喀尔赛 ', '8421'],
        ['5', '东盟国际赛', '8475'],
        ['6', '世界拉力赛', '18734']
    ];
    
    // 按索引获取指定的汽车
    parkingGame.getCarByIndex = function(index) {
        var id = parkingGame.carData[index].id;
        var name = parkingGame.carData[index].name;
        var price = parkingGame.carData[index].price;
        var speed = parkingGame.carData[index].speed;
        var marketIndex = index;
        
        return { 
            'id' : id, 
            'name' : name, 
            'nameLink' : "<a href='/app/app.php?aid=1040&url=market.php&start=" + marketIndex + "'>" + name + "</a>",
            'price' : parkingGame.formatPrice(price),
            'priceValue' : price, 
            'teamPrice' : parkingGame.formatPrice(price * 6),
            'teamPriceValue' : price * 6, 
            'speed' : parkingGame.formatSpeed(speed),
            'speedValue' : speed
        };
    };
    
    // 按名称获取指定的汽车
    parkingGame.getCar = function(carName) {
        for(var i=0; i<parkingGame.carData.length; i++) {
            if(parkingGame.carData[i].name === carName) {
                return parkingGame.getCarByIndex(i);
            }
        }    
    };
    
    // 按编号获取指定的汽车
    parkingGame.getCarById = function(id) {
        for(var i=0; i<parkingGame.carData.length; i++) {
            if(parkingGame.carData[i].id === id) {
                return parkingGame.getCarByIndex(i);
            }
        }    
    };
    
    // 按名称获取指定汽车的索引
    parkingGame.getCarIndex = function(carName) {
        for(var i=0; i<parkingGame.carData.length; i++) {
            if(parkingGame.carData[i].name === carName) {
                return i;
            }
        }
    }
        
    // 获取当前汽车可以组建的车队
    parkingGame.getTeam = function(userdata) {
        var lastCount = 0;
        var lastName = '';
        var maxCount = 0;
        var maxName = '';
        var cars = [];
        var totalPrice = 0;
        
        userdata.car.sortBy(function(car) {
            return car.car_name;
        }).each(function(car) {
            if(car.car_name !== lastName) {
                lastCount = 1;
                lastName = car.car_name;
            } else {
                lastCount++;
            }
            
            if(lastCount > maxCount) {
                maxCount = lastCount;
                maxName = lastName;
            }
            totalPrice += parseInt(car.price);
            
            var sameCount = 0;
            userdata.car.each(function(tempCar) {
                if(car.park_uid == tempCar.park_uid && parseInt(car.park_profit) >= 150) {
                    sameCount++;
                }
            });
            car.sameCount = sameCount === 0 ? -1 : sameCount;
        });

        userdata.car.sortBy(function(car) {
            if(car.park_uid === 0) {
                return 5;
            }
            else {
                return 5 - car.sameCount;
            }
        }).each(function(car) {
            var newCar = parkingGame.getCar(car.car_name);
            newCar.id = car.carid;
            newCar.trademark = car.car_trademarkname;
            newCar.parkWage = car.park_uid === 0 ? '未知' : car.park_moneyminute + "元/分钟";
            newCar.parkProfit = car.park_uid === 0 ? '未知' : car.park_profit + "元";
            newCar.parkName = car.park_real_name;
            newCar.parkId = car.park_uid;
            newCar.parkRemain = car.park_uid === 0 ? '未知' : parkingGame.formatRemain(car.park_profit, car.park_moneyminute);
            newCar.parkName = car.park_uid === 0 ? '漂流中' : car.park_real_name;
            newCar.parkNameLink = car.park_uid === 0 ? '漂流中' : "<a href='javascript:gotouser(" + car.park_uid + ");'>" + car.park_real_name + "</a>"
            newCar.exchangeLink = "<a href='javascript:exchangeCar(" + car.carid + ");'>换购</a>";
            newCar.giveLink = "<a href='javascript:giveFriend(" + car.carid + ");'>送人</a>";
            
            cars.push(newCar);
        });
        
        var teamCar = parkingGame.getCar(maxName);
        var cash = parseInt(userdata.user.cash);
        var asset = cash + totalPrice;
        
        return { 
            'cars' : cars,
            'count' : cars.length + '辆',
            'countValue' : cars.length,
            'totalPrice' : parkingGame.formatPrice(totalPrice),
            'totalPriceValue' : totalPrice,
            'teamCar': teamCar, 
            'teamCount': maxCount + '辆',
            'teamCountValue': maxCount,
            'canRace': teamCar.priceValue > 200000 && maxCount === 6,
            'teamPrice': parkingGame.formatPrice(teamCar.priceValue * maxCount),
            'teamPriceValue': teamCar.priceValue * maxCount,
            'cash' : parkingGame.formatPrice(cash),
            'cashValue' : cash,
            'asset' : parkingGame.formatPrice(asset)
        };
    };
    
    // 获取可以用来升级的汽车列表
    parkingGame.getUpgradeCars = function(carName) {
        var result = [];
        
        var smaxCarIndex = parkingGame.getCarIndex('S-MAX');
        var topCarIndex = parkingGame.getCarIndex('布加迪威航');
        var emptyCarIndex = parkingGame.getCarIndex('空');
        var carIndex = parkingGame.getCarIndex(carName);
        
        if(carIndex < smaxCarIndex) {
            carIndex = smaxCarIndex - 1;
        }
        
        var minIndex = carIndex - 5;
        if(minIndex < smaxCarIndex - 1) {
            minIndex = smaxCarIndex - 1;
        }
        
        var maxIndex = carIndex + 4;
        
        for(var i=0; i<parkingGame.carData.length; i++) {
            if((i > minIndex && i <= maxIndex && i !== carIndex && i !== emptyCarIndex) || i === topCarIndex) {
                result.push(parkingGame.getCarByIndex(i));
            }
        }
        return result;
    };
    
    // 格式化汽车的价格
    parkingGame.formatPrice = function(val, isTT) {
        val = parseInt(val);
        
        if(isTT) {
            return (val / 10000).toFixed(1);
        }
        else {
            if(val <= 10000) {
                return val.toString() + '元';
            }
            else if(val / 100000000 >= 1) {
                return (val / 100000000).toFixed(2) + '亿元';
            }
            else {
                return (val / 10000).toFixed(1) + '万元';
            }
        }
    };

    // 格式化汽车的速度
    parkingGame.formatSpeed = function(val) {
        val = parseInt(val);
        return val === 0 ? '未知' : val + 'KM/H';
    };
    
    // 格式化停车剩余时间
    parkingGame.formatRemain = function(profit, unit) {
        var totalMinutes = (7200 - parseInt(profit)) / parseInt(unit);
        var hours = Math.floor(totalMinutes / 60);
        var minutes = Math.floor(totalMinutes % 60);
        
        hours = (hours === 0 ? '' : hours + '小时');
        minutes = (minutes === 0 ? '' : minutes + '分钟');
        
        return hours + minutes === '' ? '时间到' : hours + minutes;
    };
    
    // 对好友列表进行重新排序
    parkingGame.sortFriendsList = function() {
        unsafeWindow.v_frienddata.sortBy(function(friend) {
            var sceneMoney = parseInt(friend.scenemoney);
            switch(friend.full) {
                case '0': return 0 + (20 - sceneMoney); break;
                case '2': return 100 + (20 - sceneMoney); break;
                case '1': return 200 + (20 - sceneMoney); break;
                default: return -1; break;
            }
        }).each(function(friend) {
            $('.hytc a[href*=' + friend.uid + ']:first').parent().parent().insertAfter($('.hytc:last'));
        });    
    };
    
    // 我的汽车列表的文字版
    parkingGame.createSimpleList = function() {
        $('#mycar').hide().prev().hide();
        $('#mycar').before("<h3 class='wdqc' style='margin-top: 5px;'></h3>").before("<table style='width:100%;' id='newcars'></table>");
        $('#newcars').append("<thead><tr><th>品牌</th><th>车型</th><th>价格</th><th>速度</th><th>位置</th><th>费率</th><th>累计</th><th>剩余时间</th><th colspan='2'>操作</th></tr></thead>");
        
        var team = parkingGame.getTeam(unsafeWindow.v_userdata);
        var cars = team.cars;
        
        for(var i=0; i<cars.length; i++) {
            $('#newcars').append("<tr>" 
                + "<td>" + cars[i].trademark + "</td>" 
                + "<td>" + cars[i].nameLink + "</td>" 
                + "<td>" + cars[i].price + "</td>" 
                + "<td>" + cars[i].speed + "</td>" 
                + "<td id='parkname" + cars[i].id + "'>" + cars[i].parkNameLink + "</td>" 
                + "<td id='parkunit" + cars[i].id + "'>" + cars[i].parkWage + "</td>" 
                + "<td id='parkprofit" + cars[i].id + "'>" + cars[i].parkProfit + "</td>" 
                + "<td id='parkremain" + cars[i].id + "'>" + cars[i].parkRemain + "</td>"
                + "<td>" + cars[i].exchangeLink + "</td>" 

                + "<td>" + cars[i].giveLink + "</td>" 
                + "</tr>");
        }
        
        $('#newcars').prev().html("<span style='color:red;'>车辆总值：" + team.totalPrice + "</span>"
            + "&nbsp;&nbsp;&nbsp;&nbsp;现金：" + team.cash
            + "&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:blue;'>总资产：" + team.asset + "</span>"
            + "&nbsp;&nbsp;&nbsp;&nbsp;最新空位：<span style='color:blue;' id='lastPark'></span>");
    };
    
    // 汽车升级参考意见
    parkingGame.createUpgradeList = function() {
        $('#mycar').before("<h3 id='upgradecarstitle' class='wdqc' style='margin-top: 5px;'></h3>").before("<table style='width:100%;' id='upgradecars'></table>");
        $('#upgradecars').append("<tr><th>车型</th><th>单价</th><th>速度</th><th>总价</th><th>资金缺口</th></tr>");
            
        var team = parkingGame.getTeam(unsafeWindow.v_userdata);
        
        if(team.canRace) {
            $('#upgradecarstitle').html("当前组车队车型：" + team.teamCar.nameLink + "（" + team.teamCar.speed + "，" + team.teamCar.price + "，共有" + team.teamCount + "，" + "总计" + team.teamPrice + "）");
        }
        else {
            $('#upgradecarstitle').html("现有汽车无法用来组建车队，有" + team.teamCount + team.teamCar.name + "可以用来升级。");
        }
            
        var upgradeCars = parkingGame.getUpgradeCars(team.teamCar.name);
        
        for(var i=0; i<upgradeCars.length; i++) {
            var moneyNeeded = upgradeCars[i].teamPriceValue - (team.teamPriceValue + team.cashValue);
            
            if(moneyNeeded > 0) {
                moneyNeeded = '还差' + parkingGame.formatPrice(moneyNeeded);
            }
            else if(upgradeCars[i].teamPriceValue <= team.teamPriceValue) {
                moneyNeeded = '返还' + parkingGame.formatPrice(team.teamPriceValue - upgradeCars[i].teamPriceValue);
            }
            else {
                moneyNeeded = '升级后剩余' + parkingGame.formatPrice(Math.abs(moneyNeeded));
            }
            
            $('#upgradecars').append("<tr>" 
                + "<td>" + upgradeCars[i].nameLink + "</td>"
                + "<td>" + upgradeCars[i].price + "</td>"
                + "<td>" + upgradeCars[i].speed + "</td>"
                + "<td>" + upgradeCars[i].teamPrice + "</td>"
                + "<td>" + moneyNeeded + "</td>"
                + "</tr>");
        }
    };
    
    // 在车市界面显示汽车的拉力赛初始速度
    parkingGame.viewSpeedInMarket = function() {
        $('.cs_pic>img').each(function() {
           $(this).parent().next().next().after("<div class='tac'>速度：" + parkingGame.getCar($(this).attr('alt')).speed + "</div>"); 
        });
        
        
        $('.cs_pic>a>img').each(function() {
            if($(this).attr('alt') !== '') {
                $(this).parent().parent().next().next().after("<div class='tac'>速度：" + parkingGame.getCar($(this).attr('alt')).speed + "</div>"); 
            }
        });
    };
    
    // 在选择汽车列表中，改成文字界面
    parkingGame.simpleCarsMode = function() {
        $('form[name=carform]').empty()
        .append("<table style='width:100%;' id=mycars></table>");
        
        var team = parkingGame.getTeam(unsafeWindow.parent.v_userdata);
        var cars = team.cars;
        
        for(var i=0; i<cars.length; i++) {
            if(cars[i].parkId != unsafeWindow.parent.g_curuid) {
                $('#mycars').append("<tr>"
                    + "<td><input type='radio' name='car' value='" + cars[i].id + "' park_uid='" + cars[i].parkId + "' /></td>"
                    + "<td>" + cars[i].name + "</td>"
                    + "<td>" + cars[i].parkName + "</td>"
                    + "<td>" + cars[i].parkWage + "</td>"
                    + "<td>" + cars[i].parkProfit + "</td>"
                    + "</tr>");
            }
        }
        $("#mycars tr").click(function() {
            $(this).find("td:first input").attr("checked", "checked");
        });
        
        $(':radio:first').attr('checked', 'checked');
        
        $('#btn_sc').click(function() {
            var parkuid = $(':checked').attr('park_uid');
            
            $(unsafeWindow.parent.document.getElementById('lastPark'))
                .html("<a href='javascript:gotouser(" + parkuid + ");'>" + $(':checked').parent().next().next().text() + "</a>");
            
            var carid = $(':checked').attr('value');
            $(unsafeWindow.parent.document.getElementById('parkname' + carid))
                .html("<a href='javascript:gotouser(" + unsafeWindow.parent.g_curuid + ");'>" + unsafeWindow.parent.g_curreal_name + "</a>");
                
            $(unsafeWindow.parent.document.getElementById('parkunit' + carid))
                .text($(':checked').parent().next().next().next().text());
                
            $(unsafeWindow.parent.document.getElementById('parkprofit' + carid))
                .text('0元');
                
            var friend = unsafeWindow.parent.v_frienddata.find(function(v) {
                return v.uid == parkuid;
            });
            
            $(unsafeWindow.parent.document.getElementById('parkremain' + carid))
                .text(parkingGame.formatRemain(0, friend.scenemoney));
        });
    };
    
    parkingGame.simpleRank = function() {
        var html = "<table id='simplerank' style='width: 620px;'>";
        
        html += "<thead><tr><th>姓名</th><th style='text-align:right;'>现金(万元)</th><th style='text-align:right;'>车价(万元)</th><th style='text-align:right;'>总数</th><th style='text-align:right;'>总资产</th><th style='text-align:center;'>车队</th><th style='text-align:right;'>单价</th><th style='text-align:right;'>数量</th><th style='text-align:right;'>车队价值</th></tr></thead>";
        
        $('.ph_list2').each(function() {
            var totalPrice = 0;
            var count = 0;
            
            var maxName = '';
            var maxCount = 0;
            var maxPrice = 0;
            
            var lastName = '';
            var lastCount = 0;
            var lastPrice = 0;
            
            $(this).find('.pt10 img').each(function() {
                var name = $(this).attr('title').match(/^(.+)\s\d+元$/)[1];
                var price = parseInt($(this).attr('title').match(/(\d+)元$/)[1]);
                
                if(name !== lastName) {
                    lastCount = 1;
                    lastName = name;
                    lastPrice = price;
                } else {
                    lastCount ++;
                }
                
                if(lastCount > maxCount) {
                    maxCount = lastCount;
                    maxName = lastName;
                    maxPrice = lastPrice;
                }
                
                totalPrice += price
                count ++;
            });
            var cash = parseInt($(this).find('div>div>div>strong').text().match(/(\d+)元$/)[1]);
            
            html += '<tr>';
            html += '<td>' + $(this).find('div>div>strong>a').text() + '</td>';
            html += "<td style='text-align:right;'>" + parkingGame.formatPrice(cash, true) + '</td>';
            html += "<td style='text-align:right;'>" + parkingGame.formatPrice(totalPrice) + '</td>';
            html += "<td style='text-align:right;'>" + count + '辆</td>';
            html += "<td style='text-align:right;'>" + parkingGame.formatPrice(cash + totalPrice) + '</td>';
            html += "<td style='text-align:center;'>" + maxName + '</td>';
            html += "<td style='text-align:right;'>" + parkingGame.formatPrice(maxPrice) + '</td>';
            html += "<td style='text-align:right;'>" + maxCount + '辆</td>';
            html += "<td style='text-align:right;'>" + parkingGame.formatPrice(maxPrice * maxCount) + '</td>';
            
            html += '</tr>';
            $(this).hide();
        });
        html += '</table>';
        
        $('.ph_list:first').after(html);
    };
    
    // 在拉力赛首页，点击正在进行比赛的好友名称可以直接加油。
    parkingGame.directOilMode = function() {
        $('#matchinglist a[href*=team]').each(function() {
            $(this).click(function(event) {
                var touid = $(this).attr('href').match(/team\((\d+)/)[1];
                $.get("/parking/team.php?verify=" + unsafeWindow.g_verify + "&touid=" + touid, function(data){
                    var result = data.match(/javascript:teamUni\((\d+),(\d+)\);/);
                    if(result) {
                        unsafeWindow.openWindow("/parking/teamoil.php?verify="+unsafeWindow.g_verify+"&teamuid="+touid+"&teamid="+result[2]+"&type=1", 460, 500, '加油');
                    }
                    else {
                        alert('要点队长才能加油哟！');
                    }
                    event.target.childNodes[0].nodeValue += "@";
                });
                event.preventDefault();
            });
        });
    };
    
    // 加油以后的确认按钮，会返回到比赛页面，替换之
    parkingGame.replaceOilOkButton = function() {
        $(":button:first").replaceWith($(":button:eq(3)").clone(true));
        $(":button:eq(2)").replaceWith($(":button:eq(3)").clone(true));
    };
    
    // 车市以旧换新窗口，修改为文字版列表
    parkingGame.createUpdatingCarList = function() {
        var carid = location.href.match(/carid=(\d+)/);
        if(carid && unsafeWindow.v_userdata) {
            var newCar = parkingGame.getCarById(carid[1]);
            var cars = parkingGame.getTeam(unsafeWindow.v_userdata).cars;
            
            $('#action0>div:first strong').replaceWith('请选择要更新为<strong>' + newCar.name + '（' + newCar.price + '，' + newCar.speed + '）</strong>的汽车');
            $("#action0 form[name=carform]").empty().append("<table style='width:100%;' id='action0_mycars'></table>");
            
            for(var i=0; i<cars.length; i++) {
                $('#action0_mycars').append("<tr>"
                    + "<td><input type='radio' index='" + i + "' name='car' value='" + cars[i].id + "' /></td>"
                    + "<td>" + cars[i].name + "</td>"
                    + "<td>" + cars[i].price + "</td>"
                    + "<td>" + cars[i].speed + "</td>"
                    + "</tr>");
            }
            
            $("#action0_mycars tr").click(function() {
                $(this).find("td:first input").attr("checked", "checked");
            });
        }
    };
    
    // 如果导航栏中有争车位按钮，那在后面添加一个拉力赛按钮
    parkingGame.raceMenu = function() {
        $("#head_applist a[href*=1040]").parent().parent().after("<div class='m15'><div class='l'><img width='28' height='24' align='absmiddle' src='http://img.kaixin001.com.cn/i2/park/ico_park.gif'/>&nbsp;<a title='拉力赛' class='sl' href='/app/app.php?aid=1040&url=myteam.php'><b class='f14'>拉力赛</b></a></div><div class='c' /></div>");
    };
})();