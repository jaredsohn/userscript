// coding: utf-8
// ==UserScript==
// @name           Ikariam kChen Overview
// @namespace      Ikariam
// @author         kChen
// @description    Ikariam kChen Overview for v.0.3.0
// @version        v0.3.0.032
// @include        http://*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/
// @require        http://www.csie.ntu.edu.tw/~d96030/kchenoverview/config.js
// @require        http://www.csie.ntu.edu.tw/~d96030/kchenoverview/lang.js
// @require        http://www.csie.ntu.edu.tw/~d96030/kchenoverview/tools.js
// @require        http://www.csie.ntu.edu.tw/~d96030/kchenoverview/lib.js
// @require        http://www.csie.ntu.edu.tw/~d96030/kchenoverview/data.js
// @require        http://www.csie.ntu.edu.tw/~d96030/kchenoverview/view.js
// @require        http://www.csie.ntu.edu.tw/~d96030/kchenoverview/scoreinfo.js
// @require        http://www.csie.ntu.edu.tw/~d96030/kchenoverview/table.js
// @require        http://www.csie.ntu.edu.tw/~d96030/kchenoverview/kc.js
// @resource icon_speed         http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_speed.gif
// @resource icon_academy       http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_academy.gif
// @resource icon_warehouse     http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_warehouse.gif
// @resource icon_wall          http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_wall.gif
// @resource icon_palaceColony  http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_palaceColony.gif
// @resource icon_forester      http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_forester.gif
// @resource icon_stonemason    http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_stonemason.gif
// @resource icon_glassblowing  http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_glassblowing.gif
// @resource icon_winegrower    http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_winegrower.gif
// @resource icon_alchemist     http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_alchemist.gif
// @resource icon_carpentering  http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_carpentering.gif
// @resource icon_architect     http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_architect.gif
// @resource icon_optician      http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_optician.gif
// @resource icon_vineyard      http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_vineyard.gif
// @resource icon_fireworker    http://www.csie.ntu.edu.tw/~d96030/kchenoverview/pic/icon_fireworker.gif
// ==/UserScript==
// Summary:
//   1.This script automatically refreshes the page in Ikariam (5 minutes to 10 minutes per time)
//   2.New message or attack will give warning by sound
//   3.List all information of towns
//
// Patch Content:
//   2008.02.03 v0.3.0.032
//    - 新增：建築總覽表支援 v0.3.0
//            building table support v0.3.0
//    - 新增：軍分計算支援 v0.3.0
//            military score support v0.3.0
//    - 新增：倉庫資料支援 v0.3.0
//            warehouse support v0.3.0
//    - 新增：積分資訊表
//            add score information table
//    - 新增：資源計數器開關，這功能可減少CPU使用率
//            add resources counter switch (reduce the CPU utilization)
//    - 更新：美化城鎮總覽表
//            beautify cities table
//    - 更新：美化資源總覽表
//            beautify resource table
//    - 更新：將建築總覽表的標題改成圖示
//            change title to icon in building table
//    - 新增：荷蘭語系
//            Dutch translation by Makomedia
//    - 新增：立陶宛語系
//            Lithuanian translation by HaxLi
//    - 更新：阿拉伯語系
//            update Arabic translation by hanoveel and wa7d
//    - 更新：波蘭語系
//            update Polish translation by mudi
//    - 修正：修正：在排名畫面中，友好聯盟和敵對聯盟用不同顏色提示
//            highlight own alliance, friendly alliances, hostile alliances in highscore
//
// History:
//    2009.01.12 v0.2.8.031
//      - 新增：在"建築總覽表"中，顯示 3.0 的建築物。
//      - 更新：在"建築總覽表"中，沒有蓋的建築物將不會顯示。
//      - 更新：將"資源總覽表"中的"目前正建設"欄位與"城市總覽表"的"動作"欄位互換。
//      - 更新：將"軍隊總覽表"的標題改成圖示，並且當滑鼠指向圖示時，能顯示出該部隊的資訊。
//      - 更新："軍隊總覽表"中分數計算改變。
//      - 新增：羅馬尼亞語系
//              Romania translation by RaVeN4IS
//      - 更新：希臘文語系
//              update Greek translation
//      - 更新：土耳其語系
//              update Turkish translation
//    2009.01.09 v0.2.8.030
//      - 新增：在城市總覽表新增間諜欄位
//      - 新增：越南語系
//              Vietnamese translation by quochuy
//      - 更新：希伯來文語系
//              update Hebrew translation
//      - 更新：法文語系
//              update French translation
//      - 修正：當刪除建築物後，建築總覽表仍保留舊有資料
//      - 修正：運輸船總覽表資料不正確
//      - 修正：部份因 Corsairs Tools - Ika-core 所造成顯示不正確
//    2008.12.26 v0.2.8.029
//      - 新增：城市總覽表，內容包含島嶼資訊、人口資訊和運送資訊、部署軍隊、部署艦隊等快速鍵
//      - 新增：波蘭語系
//              Polish translation by bOmBeL
//      - 更新：葡萄牙語系
//              update Portuguese translation
//      - 更新：俄文語系
//              update Russian translation
//      - 更新：土耳其語系
//              update Turkish translation
//    2008.12.14 v0.2.8.028
//      - 新增：美化 Tooltip 的格式，如淡出、淡入
//      - 新增：德文語系
//              German translation by frechi
//      - 更新：希臘文語系
//              update Greek translation
//      - 更新：葡萄牙語系
//              update Portuguese translation
//      - 修正：總覽表的樣式，使得某些是由右到左的語系，能正常顯示
//    2008.12.09 v0.2.8.027
//      - 新增：在建築總覽表中，增加各建築物資源需要的提示，和資源不夠時無法升級
//      - 新增：葡萄牙語系
//              Portuguese translation by japax
//    2008.11.30 v0.2.8.026
//      - 新增：阿拉伯語系
//              Arabic translation by wa7d
//      - 新增：法文語系
//              French translation by Chirel
//      - 新增：在運輸畫面中，所運送的資源自動展開 (預設的是資源需要用滑鼠點一下才會拉下來顯示)
//      - 新增：在hk server，自動顯示為繁體中文
//    2008.11.25 v0.2.8.025
//      - 新增：玩家和城市總覽的格式做了些變更，加入可對城鎮的所有指令，排序更改成玩家的總分
//      - 新增：土耳其語系
//              Turkish translation by Segwarg
//      - 新增：希臘語系
//              Greek translation by rdaniel
//      - 新增：西班牙語系
//              Spanish translation by lew87
//      - 修正：當沒有酒館時，市政府畫面無法顯示總覽表
//      - 修正：在玩家個人設置，資源總覽表會被拉長
//      - 修正：葡萄酒剩餘時間顯示為多語系 (原來為中文)
//      - 修正：在接受售價、接受出價的畫面，插件設定的表格會被拉長
//      - 更改：將提醒的聲音檔存在不同主機 (為了降低單一主機的流量，若有好的空間請告訴我，謝謝)
//      - 更改：點擊城市名稱指令下達的方式 (原來的寫法，似乎會有問題，但我一直沒遇到，所以這裡試著改別種方式，看看是否還會有問題)
//    2008.11.19 v0.2.8.024
//      - 修正：自動更新網頁時，將輪流顯示所有城鎮
//      - 修正：封鎖港口時，無法顯示出總覽表
//    2008.11.12 v0.2.8.023
//      - 新增：在玩家和城市總覽裡，加入刪除、外交、掠奪、封鎖港口和派出間諜的按鈕
//      - 修正：當資源總覽表或建築總覽表關掉時，顯示設定的按鈕會失消的問題
//    2008.11.11 v0.2.8.022
//      - 新增：俄文語系
//              Russian translation by Гуляка
//      - 修正：自動更新腳本的網址
//    2008.11.10 v0.2.8.021
//      - 新增：在玩家和城市總覽裡，將i羊、封鎖、假期的玩家用顏色區分出來
//      - 新增：希伯來文語系
//              Hebrew translation by MindTwister
//      - 修正：軍事積分計算錯誤
//    2008.11.10 v0.2.8.020
//      - 新增：自動更新通知，當插件有新版時自動通知
//      - 修正：當尚未研發出"財富"時，資源總覽表的特殊資源名稱只能是英文，無法自動隨Server語系而變更名稱語系
//    2008.11.08 v0.2.8.018
//      - 新增：在資源總覽表中的座標欄，可直接連至該島並且選擇該城 (此功能包含 "玩家和城市總覽" 裡的所有座標)
//              click the link of coordinate in the resource table, the page will be redirected to the island and the town will be selected.
//              (The link included the coordinate in the player and twon table)
//      - 修正：自動更新網頁時，維持顯示選所擇的城鎮畫面 (先前自動更新網頁後，會變成顯示成世界地圖，此功能是為了支援某些插件而改)
//              When refresh the page automatically, the page will stay in the selected town. (For supporting some scripts)
//      - 修正：刪除多餘的座標顯示 (此功能是為了在遊戲的設置裡面，未將顯示城鎮詳情改成"奢侈資源"的玩家而修改，若已經設定過的玩家不影嚮)
//              Deleted redundancy coordinates.
//              (It's modified for the player who didn't set the display of the town detail by "Tradegoods". It doesn't affect the player who already set it.)
//      - 修正：當城鎮座標是個位數或百位數時，資源總覽表無法更新資料 (此功能是為了在遊戲的設置裡面，未將顯示城鎮詳情改成"奢侈資源"的玩家而修改，若已經設定過的玩家不影嚮)
//              (It's modified for the player who didn't set the display of the town detail by "Tradegoods". It doesn't affect the player who already set it.)
//      - 修正：勾選加值畫面選項後，當被攻擊的時候，軍事指導者的警告圖示無法顯示
//    2008.11.05 v0.2.8.017
//      - 修正：特殊資源的全滿天數計算錯誤
//              Caculation error of the full filled day of special resource
//    2008.11.05 v0.2.8.016
//      - 修正：在世界、排名、收支表等等畫面皆可顯示
//              fix world, highscore, balances page display error
//    2008.11.04 v0.2.8.015
//      - 新增：在資源總覽表，新增葡萄酒存量天數 (可不需要 Kronos Utils 支援)
//              show wine remaing time in resource table (without Kronos Utils)
//      - 新增：在資源總覽表，新增各資源全滿天數、空閒人口數、行動點數
//              show resource fullness of warehouse time, idle citizens, action points
//      - 修正：點擊城鎮名稱，自動切換至所點擊的城鎮，並且顯示城鎮畫面
//              click city name will change to the city and it
//      - 修正：倉庫17級木材最大容量錯誤
//              fix level 17 warehouse wood storage capacity error
//    2008.11.02 v0.2.8.014
//      - 新增：在建築總覽表，點擊升級快速鍵後，自動切換至所點擊的城鎮
//              add building level up button, change the city when press button in building table
//      - 新增：在資源總覽表，點擊伐木場和資源場後，自動切換至所點擊的城鎮
//              change the city when press sawmill or resource in resource table
//      - 新增：在城鎮指導者、軍事指導者、研究指導者和外交指導者，點擊其它城鎮連結，自動切換至所點擊的城鎮
//              change the city when click city-link in four advisors
//      - 修正：執行查看軍隊時，在觀看軍事畫面，軍隊資料無法更新。 (注意：目前在軍事畫面中，軍分無法計算)
//      - 修正：當Kronos Utils執行時，使得軍隊名字過長
//              fix unit's name too long bug, when Kronos Utils is runing
//    2008.10.31 v0.2.8.013
//      - 新增：加值畫面 (此為購買plus後的畫面)
//              add PLUS display option
//      - 修正：千位符號由 "." 改成 ","
//              comma replace point in thousand display
//    2008.10.29 v0.2.8.010
//      - 新增：建築物總覽的升級按鈕
//              add building level up button
//    2008.10.28 v0.2.8.009
//      - 修正：在書寫訊息畫面無法顯示
//              fix display error in write message page
//      - 新增：支援多國語言
//              add multi-language support
//    2008.10.28 v0.2.8.008
//      - 修正：博物館顯示異常
//              fix Museum display error
//    2008.10.27 v0.2.8.007
//      - 修正：在城鎮指導者、軍事指導者、研究指導者、外交指導者等畫面無法顯示
//              fix advisors display error
//    2008.10.27 v0.2.8.006
//      - 修正：等待裝載船隻無法顯示
//              fix cargo ship display error when loading
//    2008.10.27 v0.2.8.004
//      - 修正：部署軍隊與部署艦隊無法顯示
//              fix units display bug in deploy troops and deploy fleets
//    2008.10.26 v0.2.8.003
//      - 新增：建築物總覽的快速連結，可直接點進建築物畫面
//              add building link in building table
//      - 新增：學院總覽
//              add research table
//      - 新增：港口總覽，包含來訪的運輸船，裝載運輸船
//              add transporters table to display trading cargo shit and loading cargo shit
//      - 新增：在運輸畫面的記錄常用目的地之儲存按鈕
//              add destination button in trade page
//      - 新增：在港口畫面顯示所記錄常用目的地
//              add destination-link in trading port page
//      - 修正：玩家總覽表格顯示異常
//              fix players table display error
//    2008.10.24 v0.2.8.002
//      - 修正：伐木場與資源場無法正常顯示
//              fix sawmill and resources display bug
//    2008.10.23 v0.2.8.001
//      - 修正：將文字翻譯成繁體中文
//              support Traditional Chinese (TW)
//      - 修正：設定介面美化
//              beautify the setting interface
//      - 修正：倉庫前六級最大值顯示錯誤
//              fix warehouse storage capacity error
//      - 修正：座標個位數時，資料無法正常讀取
//              fix bug when coordinate is less than ten
//      - 修正：學院畫面無法正常顯示
//              fix Academy display bug

var server = /\/\/([a-z._0-9]+)\//.exec(document.URL)[1];
var config     = getConfig();
var players    = getPlayers();
var _startTime    = new Date().getTime();
var scriptversion = "v0.3.0.032";


kChenOverview();

// You can merge other scripts in here.