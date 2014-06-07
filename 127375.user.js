// ==UserScript==
// @name           cmded_smilies_simple
// @description    cmded自定制分页化表情
// @include        http://cmded.net/*
// @include        https://cmded.net/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @author         congxz6688
// @version        2012.8.25
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==


//编辑此处可修改表情种类名称。多余种类可删除，比如，可以把“其它”全部删掉，与之对应的allSmile[4][5]也将不会被显示。
var smileName=["常用","洋葱头","阿狸","兔斯基","混合","游嬉猴","黄蛋"];

//下面是对应的几组表情地址，分别对应上面的各种表情，可增减，但上下要一一对应。增添的地址需用""包起来，相互间用“,”隔开。
var allSmile=new Array;//这句不能修改
allSmile[0]=["http://files.myopera.com/congxz6688/albums/11129852/yxh16.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh13.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh30.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh20.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji08.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji09.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji22.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji16.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh01.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh29.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh05.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh15.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji11.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji18.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji19.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji44.gif","http://files.myopera.com/congxz6688/albums/11129812/frog03.gif","http://files.myopera.com/congxz6688/albums/11129812/frog15.gif","http://files.myopera.com/congxz6688/albums/11129812/frog16.gif","http://files.myopera.com/congxz6688/albums/11129812/frog05.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan01.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan02.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan05.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan07.gif","http://files.myopera.com/congxz6688/albums/11129812/frog06.gif","http://files.myopera.com/congxz6688/albums/11129812/frog10.gif","http://files.myopera.com/congxz6688/albums/11129812/frog12.gif","http://files.myopera.com/congxz6688/albums/11129812/frog07.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan18.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan25.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan29.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan31.gif","http://files.myopera.com/congxz6688/albums/11138902/yct04.gif","http://files.myopera.com/congxz6688/albums/11138902/yct03.gif","http://files.myopera.com/congxz6688/albums/11138902/yct08.gif","http://files.myopera.com/congxz6688/albums/11138902/yct10.gif","http://files.myopera.com/congxz6688/albums/11153692/ali20.gif","http://files.myopera.com/congxz6688/albums/11153692/ali17.gif","http://files.myopera.com/congxz6688/albums/11153692/ali01.gif","http://files.myopera.com/congxz6688/albums/11153692/ali28.gif","http://files.myopera.com/congxz6688/albums/11138902/yct35.gif","http://files.myopera.com/congxz6688/albums/11138902/yct11.gif","http://files.myopera.com/congxz6688/albums/11138902/yct37.gif","http://files.myopera.com/congxz6688/albums/11138902/yct25.gif","http://files.myopera.com/congxz6688/albums/11153692/ali16.gif","http://files.myopera.com/congxz6688/albums/11153692/ali13.gif","http://files.myopera.com/congxz6688/albums/11153692/ali15.gif","http://files.myopera.com/congxz6688/albums/11153692/ali11.gif","http://files.myopera.com/congxz6688/albums/11138902/yct14.gif","http://files.myopera.com/congxz6688/albums/11138902/yct16.gif","http://files.myopera.com/congxz6688/albums/11138902/yct45.gif","http://files.myopera.com/congxz6688/albums/11138902/yct30.gif","http://files.myopera.com/congxz6688/albums/11153692/ali27.gif","http://files.myopera.com/congxz6688/albums/11153692/ali05.gif","http://files.myopera.com/congxz6688/albums/11153692/ali22.gif","http://files.myopera.com/congxz6688/albums/11153692/ali06.gif","http://files.myopera.com/congxz6688/albums/11129812/am41.gif","http://files.myopera.com/congxz6688/albums/11129812/am47.gif","http://files.myopera.com/congxz6688/albums/11129812/am44.gif","http://files.myopera.com/congxz6688/albums/11129812/am45.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb07.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb06.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb02.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb05.gif"];
allSmile[1]=["http://files.myopera.com/congxz6688/albums/11138902/yct01.gif","http://files.myopera.com/congxz6688/albums/11138902/yct02.gif","http://files.myopera.com/congxz6688/albums/11138902/yct03.gif","http://files.myopera.com/congxz6688/albums/11138902/yct04.gif","http://files.myopera.com/congxz6688/albums/11138902/yct05.gif","http://files.myopera.com/congxz6688/albums/11138902/yct06.gif","http://files.myopera.com/congxz6688/albums/11138902/yct07.gif","http://files.myopera.com/congxz6688/albums/11138902/yct08.gif","http://files.myopera.com/congxz6688/albums/11138902/yct09.gif","http://files.myopera.com/congxz6688/albums/11138902/yct10.gif","http://files.myopera.com/congxz6688/albums/11138902/yct11.gif","http://files.myopera.com/congxz6688/albums/11138902/yct12.gif","http://files.myopera.com/congxz6688/albums/11138902/yct13.gif","http://files.myopera.com/congxz6688/albums/11138902/yct14.gif","http://files.myopera.com/congxz6688/albums/11138902/yct15.gif","http://files.myopera.com/congxz6688/albums/11138902/yct16.gif","http://files.myopera.com/congxz6688/albums/11138902/yct17.gif","http://files.myopera.com/congxz6688/albums/11138902/yct18.gif","http://files.myopera.com/congxz6688/albums/11138902/yct19.gif","http://files.myopera.com/congxz6688/albums/11138902/yct20.gif","http://files.myopera.com/congxz6688/albums/11138902/yct21.gif","http://files.myopera.com/congxz6688/albums/11138902/yct22.gif","http://files.myopera.com/congxz6688/albums/11138902/yct23.gif","http://files.myopera.com/congxz6688/albums/11138902/yct24.gif","http://files.myopera.com/congxz6688/albums/11138902/yct25.gif","http://files.myopera.com/congxz6688/albums/11138902/yct26.gif","http://files.myopera.com/congxz6688/albums/11138902/yct27.gif","http://files.myopera.com/congxz6688/albums/11138902/yct28.gif","http://files.myopera.com/congxz6688/albums/11138902/yct29.gif","http://files.myopera.com/congxz6688/albums/11138902/yct30.gif","http://files.myopera.com/congxz6688/albums/11138902/yct31.gif","http://files.myopera.com/congxz6688/albums/11138902/yct32.gif","http://files.myopera.com/congxz6688/albums/11138902/yct33.gif","http://files.myopera.com/congxz6688/albums/11138902/yct34.gif","http://files.myopera.com/congxz6688/albums/11138902/yct35.gif","http://files.myopera.com/congxz6688/albums/11138902/yct36.gif","http://files.myopera.com/congxz6688/albums/11138902/yct37.gif","http://files.myopera.com/congxz6688/albums/11138902/yct38.gif","http://files.myopera.com/congxz6688/albums/11138902/yct39.gif","http://files.myopera.com/congxz6688/albums/11138902/yct40.gif","http://files.myopera.com/congxz6688/albums/11138902/yct41.gif","http://files.myopera.com/congxz6688/albums/11138902/yct42.gif","http://files.myopera.com/congxz6688/albums/11138902/yct43.gif","http://files.myopera.com/congxz6688/albums/11138902/yct44.gif","http://files.myopera.com/congxz6688/albums/11138902/yct45.gif","http://files.myopera.com/congxz6688/albums/11138902/yct46.gif","http://files.myopera.com/congxz6688/albums/11138902/yct47.gif","http://files.myopera.com/congxz6688/albums/11138902/yct48.gif","http://files.myopera.com/congxz6688/albums/11138902/yct49.gif","http://files.myopera.com/congxz6688/albums/11138902/yct50.gif","http://files.myopera.com/congxz6688/albums/11138902/yct51.gif","http://files.myopera.com/congxz6688/albums/11138902/yct52.gif","http://files.myopera.com/congxz6688/albums/11138902/yct53.gif","http://files.myopera.com/congxz6688/albums/11138902/yct54.gif","http://files.myopera.com/congxz6688/albums/11138902/yct55.gif","http://files.myopera.com/congxz6688/albums/11138902/yct56.gif","http://files.myopera.com/congxz6688/albums/11138902/yct57.gif","http://files.myopera.com/congxz6688/albums/11138902/yct58.gif","http://files.myopera.com/congxz6688/albums/11138902/yct59.gif","http://files.myopera.com/congxz6688/albums/11138902/yct60.gif","http://files.myopera.com/congxz6688/albums/11138902/yct61.gif","http://files.myopera.com/congxz6688/albums/11138902/yct62.gif","http://files.myopera.com/congxz6688/albums/11138902/yct63.gif","http://files.myopera.com/congxz6688/albums/11138902/yct64.gif"];
allSmile[2]=["http://files.myopera.com/congxz6688/albums/11153692/ali01.gif","http://files.myopera.com/congxz6688/albums/11153692/ali02.gif","http://files.myopera.com/congxz6688/albums/11153692/ali03.gif","http://files.myopera.com/congxz6688/albums/11153692/ali04.gif","http://files.myopera.com/congxz6688/albums/11153692/ali05.gif","http://files.myopera.com/congxz6688/albums/11153692/ali06.gif","http://files.myopera.com/congxz6688/albums/11153692/ali07.gif","http://files.myopera.com/congxz6688/albums/11153692/ali08.gif","http://files.myopera.com/congxz6688/albums/11153692/ali09.gif","http://files.myopera.com/congxz6688/albums/11153692/ali10.gif","http://files.myopera.com/congxz6688/albums/11153692/ali11.gif","http://files.myopera.com/congxz6688/albums/11153692/ali12.gif","http://files.myopera.com/congxz6688/albums/11153692/ali13.gif","http://files.myopera.com/congxz6688/albums/11153692/ali14.gif","http://files.myopera.com/congxz6688/albums/11153692/ali15.gif","http://files.myopera.com/congxz6688/albums/11153692/ali16.gif","http://files.myopera.com/congxz6688/albums/11153692/ali17.gif","http://files.myopera.com/congxz6688/albums/11153692/ali18.gif","http://files.myopera.com/congxz6688/albums/11153692/ali19.gif","http://files.myopera.com/congxz6688/albums/11153692/ali20.gif","http://files.myopera.com/congxz6688/albums/11153692/ali21.gif","http://files.myopera.com/congxz6688/albums/11153692/ali22.gif","http://files.myopera.com/congxz6688/albums/11153692/ali23.gif","http://files.myopera.com/congxz6688/albums/11153692/ali24.gif","http://files.myopera.com/congxz6688/albums/11153692/ali25.gif","http://files.myopera.com/congxz6688/albums/11153692/ali26.gif","http://files.myopera.com/congxz6688/albums/11153692/ali27.gif","http://files.myopera.com/congxz6688/albums/11153692/ali28.gif","http://files.myopera.com/congxz6688/albums/11153692/ali29.gif","http://files.myopera.com/congxz6688/albums/11153692/ali30.gif","http://files.myopera.com/congxz6688/albums/11153692/ali31.gif","http://files.myopera.com/congxz6688/albums/11153692/ali32.gif","http://files.myopera.com/congxz6688/albums/11153692/ali33.gif","http://files.myopera.com/congxz6688/albums/11153692/ali34.gif","http://files.myopera.com/congxz6688/albums/11153692/ali35.gif","http://files.myopera.com/congxz6688/albums/11153692/ali36.gif","http://files.myopera.com/congxz6688/albums/11153692/ali37.gif","http://files.myopera.com/congxz6688/albums/11153692/ali38.gif","http://files.myopera.com/congxz6688/albums/11153692/ali39.gif","http://files.myopera.com/congxz6688/albums/11153692/ali40.gif","http://files.myopera.com/congxz6688/albums/11153692/ali41.gif","http://files.myopera.com/congxz6688/albums/11153692/ali42.gif","http://files.myopera.com/congxz6688/albums/11153692/ali43.gif","http://files.myopera.com/congxz6688/albums/11153692/ali44.gif","http://files.myopera.com/congxz6688/albums/11153692/ali45.gif","http://files.myopera.com/congxz6688/albums/11153692/ali46.gif","http://files.myopera.com/congxz6688/albums/11153692/ali47.gif","http://files.myopera.com/congxz6688/albums/11153692/ali48.gif","http://files.myopera.com/congxz6688/albums/11153692/ali49.gif","http://files.myopera.com/congxz6688/albums/11153692/ali50.gif","http://files.myopera.com/congxz6688/albums/11153692/ali51.gif","http://files.myopera.com/congxz6688/albums/11153692/ali52.gif","http://files.myopera.com/congxz6688/albums/11153692/ali53.gif","http://files.myopera.com/congxz6688/albums/11153692/ali54.gif","http://files.myopera.com/congxz6688/albums/11153692/ali55.gif","http://files.myopera.com/congxz6688/albums/11153692/ali56.gif","http://files.myopera.com/congxz6688/albums/11153692/ali57.gif","http://files.myopera.com/congxz6688/albums/11153692/ali58.gif","http://files.myopera.com/congxz6688/albums/11153692/ali59.gif","http://files.myopera.com/congxz6688/albums/11153692/ali60.gif","http://files.myopera.com/congxz6688/albums/11153692/ali61.gif","http://files.myopera.com/congxz6688/albums/11153692/ali62.gif","http://files.myopera.com/congxz6688/albums/11153692/ali63.gif","http://files.myopera.com/congxz6688/albums/11153692/ali64.gif"];
allSmile[3]=["http://files.myopera.com/congxz6688/albums/11129762/tusiji01.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji02.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji03.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji04.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji05.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji06.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji07.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji08.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji09.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji10.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji11.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji12.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji13.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji14.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji15.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji16.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji17.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji18.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji19.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji20.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji21.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji22.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji23.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji24.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji25.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji26.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji27.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji28.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji29.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji30.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji31.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji32.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji33.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji34.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji35.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji36.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji37.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji38.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji39.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji40.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji41.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji42.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji43.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji44.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji45.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji46.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji47.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji48.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji49.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji50.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji51.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji52.gif","http://files.myopera.com/congxz6688/albums/11129762/tusiji53.gif"];
allSmile[4]=["http://files.myopera.com/congxz6688/albums/11129812/am41.gif","http://files.myopera.com/congxz6688/albums/11129812/am42.gif","http://files.myopera.com/congxz6688/albums/11129812/am43.gif","http://files.myopera.com/congxz6688/albums/11129812/am44.gif","http://files.myopera.com/congxz6688/albums/11129812/am45.gif","http://files.myopera.com/congxz6688/albums/11129812/am46.gif","http://files.myopera.com/congxz6688/albums/11129812/am47.gif","http://files.myopera.com/congxz6688/albums/11129812/am48.gif","http://files.myopera.com/congxz6688/albums/11129812/frog01.gif","http://files.myopera.com/congxz6688/albums/11129812/frog02.gif","http://files.myopera.com/congxz6688/albums/11129812/frog03.gif","http://files.myopera.com/congxz6688/albums/11129812/frog04.gif","http://files.myopera.com/congxz6688/albums/11129812/frog05.gif","http://files.myopera.com/congxz6688/albums/11129812/frog06.gif","http://files.myopera.com/congxz6688/albums/11129812/frog07.gif","http://files.myopera.com/congxz6688/albums/11129812/frog08.gif","http://files.myopera.com/congxz6688/albums/11129812/frog09.gif","http://files.myopera.com/congxz6688/albums/11129812/frog10.gif","http://files.myopera.com/congxz6688/albums/11129812/frog11.gif","http://files.myopera.com/congxz6688/albums/11129812/frog12.gif","http://files.myopera.com/congxz6688/albums/11129812/frog13.gif","http://files.myopera.com/congxz6688/albums/11129812/frog14.gif","http://files.myopera.com/congxz6688/albums/11129812/frog15.gif","http://files.myopera.com/congxz6688/albums/11129812/frog16.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb01.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb02.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb03.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb04.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb05.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb06.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb07.gif","http://files.myopera.com/congxz6688/albums/11129812/xbb08.gif"];
allSmile[5]=["http://files.myopera.com/congxz6688/albums/11129852/yxh01.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh02.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh03.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh04.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh05.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh06.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh07.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh08.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh09.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh10.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh11.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh12.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh13.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh14.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh15.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh16.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh17.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh18.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh19.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh20.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh21.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh22.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh23.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh24.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh25.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh26.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh27.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh28.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh29.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh30.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh31.gif","http://files.myopera.com/congxz6688/albums/11129852/yxh32.gif"];
allSmile[6]=["http://files.myopera.com/congxz6688/albums/11573672/huangdan01.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan02.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan03.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan04.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan05.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan06.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan07.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan08.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan09.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan10.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan11.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan12.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan13.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan14.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan15.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan16.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan17.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan18.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan19.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan20.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan21.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan22.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan23.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan24.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan25.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan26.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan27.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan28.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan29.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan30.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan31.gif","http://files.myopera.com/congxz6688/albums/11573672/huangdan32.gif"];

/**********************************以下部分就不要随便动了。*****************************************/
GM_addStyle('div{overflow:hidden !important;}#fastsmilies{display:none}ap:hover,.inliness:hover {color: #008B8B} #pages{font-size:12px}ap {display:inline-block; text-align:center; cursor:pointer; } #kindUl{border-bottom-style:double;border-width:3px;border-color:gray} #gifList{padding:1px; border-bottom-style:double;border-width:3px;border-color:gray} .inliness{text-align:center;cursor:pointer; font-size:15px; display:inline-block; border-right-style:solid;border-width:1px;border-color:gray} .curr{color:blue;} .defaultpost{min-height:130px !important;} [valign="bottom"]>img{max-height:80px !important}');

var whiSm = Math.floor(Math.random() * (smileName.length));
var logoN = Math.floor(Math.random() * (allSmile[whiSm].length));
var gifUrl = allSmile[whiSm][logoN];

var oldsmily = document.evaluate('//td/a[contains(@onclick,"surroundText")]', document, null, 9, null);
if (oldsmily.singleNodeValue != null) {
	$('<img>', {
		id : "smLogo",
		src : gifUrl,
		click : fillit,
		style : "cursor:pointer"
	}).css({
		"height" : "28px",
		"margin" : "0 5px 0 5px"
	}).appendTo(oldsmily.singleNodeValue.parentNode);
} else if ($("textarea").length > 0) {
	$("#quickReplyOptions>.windowbg:eq(0)").css({
		"width" : "16%"
	})
	$('<img>', {
		id : "smLogo",
		src : gifUrl,
		click : fillit,
		style : "cursor:pointer"
	}).css({
		"max-width" : "28px",
		"max-height" : "28px",
		"margin" : "0px 5px 70px -2px"
	}).insertBefore($("textarea"));
}

function fillit() {
	var logoRect = $("#smLogo")[0].getClientRects()[0];
	var Listdiv = $("<div>", {
			id : "smilieList",
			width : "368",
			height : "182"
		}).mouseleave(function () {
			$('#smilieList').detach()
		}).css({
			"background-color" : "white",
			"position" : "fixed",
			"left" : logoRect.left - 182 + logoRect.width / 2,
			"top" : (((logoRect.top - 182 + logoRect.height) < 0) ? 0 : (logoRect.top - 182 + logoRect.height)),
			"border-style" : "double",
			"border-width" : "4px",
			"border-color" : "gray"
		}).appendTo(document.body);
	createHeadDiv($("#smilieList")[0], "Smile")
	var gifList = $("<div>", {
			id : "gifList",
			width : "368",
			height : "136"
		}).css("background-color","LightGray").appendTo(Listdiv);
	var pages = $("<div>", {
			id : "pages",
			height : "20"
		}).appendTo(Listdiv);
	if (GM_getValue("current_smilies") == null || GM_getValue("current_page") == null) {
		GM_setValue("current_smilies", 0);
		GM_setValue("current_page", 1);
	}
	$("#Smile" + GM_getValue("current_smilies")).addClass("curr");
	var maxpage = Math.ceil(allSmile[GM_getValue("current_smilies")].length / 32);
	pload(GM_getValue("current_smilies"), GM_getValue("current_page"));
	$("<ap>", {
		html : "上一页",
		width : "45"
	}).click(function () {
		var page = GM_getValue("current_page") - 1;
		pload($(".curr").val(), page)
	}).appendTo(pages);
	$("<ap>", {
		html : "下一页",
		width : "45"
	}).click(function () {
		var page = GM_getValue("current_page") + 1;
		pload($(".curr").val(), page)
	}).appendTo(pages);
	$("<spam>", {
		id : "pagespam",
		html : GM_getValue("current_page") + "/" + maxpage + "&nbsp;"
	}).css({
		"float" : "right"
	}).appendTo(pages)
}
function pload(smileKind, p) {
	var smileKind = Number(smileKind);
	GM_setValue("current_smilies", smileKind);
	var maxer = Math.ceil(allSmile[smileKind].length / 32);
	if (p < 1) {
		p = maxer;
	}
	if (p > maxer) {
		p = 1;
	}
	GM_setValue("current_page", p);
	$('#gifList').empty();
	$("#pagespam").html(p + "/" + maxer + "&nbsp;");
	for (i = (0 + (p - 1) * 32); i < ((p < maxer) ? p * 32 : allSmile[smileKind].length); i++) {
		var newvix = $("<div>").css({
				"display" : "inline-block",
				"width" : "46px",
				"height" : "34px"
			}).appendTo($("#gifList"));
		$("<img>", {
			src : allSmile[smileKind][i]
		}).click(function () {
			var wl = 0;
			if ($('textarea').length > 1) {
				wl = 1;
			};
			$("textarea")[wl].value = $("textarea")[wl].value.slice(0, $("textarea")[wl].selectionStart) + '[img]' + this.src + '[/img]' + $("textarea")[wl].value.slice($("textarea")[wl].selectionEnd);
		}).css({
			"cursor" : "pointer",
			"width" : "30px",
			"height" : "30px",
			"margin" : "2px 8px"
		}).mouseover(function () {
			var rect = $("#smilieList")[0].getClientRects()[0];
			var floatDiv = $("<div>", {
					id : "floatDiv",
				}).css({
					"position" : "fixed",
					"left" : rect.left + rect.width,
					"top" : rect.top,
					"border-style" : "solid",
					"border-width" : "1px"
				}).appendTo(document.body);
			$("<img>", {
				src : this.src,
			}).css({
				"background-color" : "#FFFFFF"
			}).appendTo(floatDiv);
		}).mouseout(function () {
			$('#floatDiv').detach()
		}).appendTo(newvix);
	}
}
function createHeadDiv(dive, idd) {
	var listRect = dive.getClientRects()[0];
	var kindUl = $("<div>", {
			id : "kindUl"
		}).appendTo(dive);
	for (i = 0; i < smileName.length; i++) {
		$("<div>", {
			id : idd + i,
			class : "inliness",
			width : ((listRect.width - 8) / smileName.length - 2),
			html : smileName[i],
			val : i
		}).click(function () {
			$(".curr").removeClass("curr");
			$(this).addClass("curr");
			pload($(this).val(), 1)
		}).appendTo(kindUl);
	}
}