// ==UserScript==
// @name Vladenia Money Checker
// @namespace vladenia
// @description Checks money in vkontakte.ru Vladenia app
// @include *
// @exclude http://map.artch.ru*
// @exclude http://*adwolf.ru*
// @author Mr_Mig
// ==/UserScript==

// Нравится кнопка?? Попробуйте Mig[vk]Script!
// http://userscripts.org/scripts/show/54446

//Первым делом зайдите на страницу приложения http://vkontakte.ru/app1896352
// Скрипт определит ваш код авторизации


//=========================Значения ниже можно менять================================================


var TIMEOUT = 1*60*1000; //Таймаут между запросами    1 минута

var BG_ALERT = "red"; // Цвет фона при изменении баланса. При нажатии на кнопку цвет будет изменен на первоначальный. 
var TXT_COLOR = "#FFF557"; // Цвет текста
var ALERT = true; // Нужно ли выводить окошко при изменении баланса. Если не нужно, ставьте var ALERT = false;
var DIFF = 100; // При какой минимальной разнице баланса выводить окошко. Используйте как фильтр

//===========================Укажите данные ниже, если кнопка не работает===========================================
//===========================Если вы зайдёте на страницу игры, скрипт должен автоматически определить эти данные====
var AUTH_CODE = "8c65eЁ2113eeс8d4с9486e1d25675d8a";//код авторизации. 
// Как узнать этот код - спросите у автора скрипта.	
// ВНИМАНИЕ!!!
// Никогда не давайте свой код авторизации ДРУГИМ ЛЮДЯМ!!!!

var ID = 4518704; // ваш ID вконтакте. ОБРАТИТЕ ВНИМАНИЕ, здесь должен быть номер, а не имя.
 
 
 
 
 
 
 
 
 
//================================Не меняйте ничего ниже этого разделителя!==============================================================================
if (top != self) {
	return;
}
var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn%2FAACA6QAAdTAAAOpgAAA6mAAAF2%2BSX8VGAAAC3ElEQVR42qSTS28bZRSGn7n4Or7EDiNyUWMnLi0JgaRUbYjogkWIUroJP6HsWFeCX5E1O9puithUVUEQtYuyQKoESE2UpHGjRtRxExs7Tn2b8fiby8eCYJUFq77S2R09es7ROYqUkjeJDvBwTUdTQVMBOANcAc4D8dM%2BG3gG%2FAqU%2FQD8AD694f0DeC0r4djQ8vh7y%2FNmYXE6arw1DOBYx436%2FuPdw50Hl0Sv%2BQBY%2F4%2FBaT6LpsdW51a%2BXtX0pNlrvcI%2BLhMEHoqmj2TPXBkZzl2e3Xq4lrCbFRX4CUAFCAIm1HD62gcrX616rm626zUiyRSZ3ATD%2BUnimQyNyhH1w7%2FMdxa%2FWFX05LUgYGJg4HpyaWpmaV5RDbN7coSZy%2FN8ewtfCALfA0VlbDJPeb%2BIbSummbs4%2F2Ln0RLwrQogPC68XVg4d1wuYWSyOO021fIBMwsfMb2wyOjUFNt%2F%2FIaRSlGrHhJNj50THhcGI%2FQF2XAkNtSoV9FCOseVA1qtJq7oc%2FfWGjEjTqvVoNdrIgMXVVOH%2BoLsAOAIosJqK53uK6xOk0bjCNu26Fltlj%2B%2FTmlvG9%2Fvg2cRCoGqeIojiA520HelaNZKXU0N0vXqAYEUgIceCvPjd7dQFDg7mSKiCYyYiu9a3b4rxcBACDafFzdqw9kEzfpLkkYMXVdY%2F%2F42YV3h40sm4yMG0hdkh8K8PCjVhGBzYCB87u1sblzNFwpjqYRm9O0TLl8cJx6RhDRJEEDH8kgaKoEqra0nxYrwuffaHchit9O78%2FP9H%2FYSyZCdzURx%2Bw6drkur4%2BEIn1RSB03a9%2B8%2B2ut0eneCQBYBFCkliqIwOQqfzPPldD56fe7DmdF3Z3PZTDoeVZE0211n92np5Mnvzyq7L5ybv2zwzZ8VkFIOACqQAFJzBWYXZ7g6kuV9IHV65u3qCVuPn7K%2Buc820AIsKaX%2FL0ABwkDktEL%2F870e0AccwJVSBn8PACAlT6JHZqXBAAAAAElFTkSuQmCC";
var bg = "data:image/gif;base64,R0lGODlhEQAtANUAAMTExMPDw8LCwsHBwcDAwL%2B%2Fv76%2Bvr29vby8vLu7u7q6urm5ubi4uLe3t7a2trW1tbOzs7KysrGxsbCwsK%2Bvr62traurq6qqqqmpqaioqKampqWlpaSkpKOjo6KioqCgoJ%2Bfn56enp2dnZubm5qampmZmZeXlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEQAtAAAG90CAcEgsGo%2FGgHLJbCoF0Kh0Ch1Yr9isdqsleL%2FgsLdALpvPZIN6zW6rD%2FC4fA5H2O%2F4vD3B7%2Fv%2FfAqCg4SFgguIiYqLiAyOj5CRjg2UlZaXlA6am5ydmg%2BgoaKjoBCmp6ipphGsra6vrBKys7S1shO4ubq7uBS%2Bv8DBvhXExcbHxBbKy8zNyhfQ0dLT0BjW19jZ1hnc3d7f3Bri4%2BTl4hvo6err6Bzu7%2FDx7h309fb39B76%2B%2Fz9%2Bh8AAwocSLAgQRAIEypciDCEw4cQIzoUQbGixYsUR2jcyLGjx48eSYgcSbKkyBIoU6pcybIlSxMwY8qcSbMmzSAAOw%3D%3D";
var APP_URL = "http://vkontakte.ru/app1896352";

var stack = eval("("+GM_getValue("stack","[]")+")");
var scriptId = 0;

if (stack.length > 0){
	scriptId = stack.length;
}
	if(stack.indexOf(null) != -1){
		scriptId = stack.indexOf(null);
	}else {
		scriptId = stack.length;
	}
	if(stack.indexOf(1) != -1){
		stack[stack.indexOf(1)] = 0;
	}
	stack[scriptId] = 1;

GM_setValue("stack",uneval(stack));

unsafeWindow.addEventListener("beforeunload",function(){
	killScript();
}, false);

function killScript(){
	stack = eval("("+GM_getValue("stack","[]")+")");
	stack[scriptId] = null;
	if (scriptId != 0){
		stack.lastIndexOf(0) = 1;
	}
	GM_setValue("stack",uneval(stack));
}

var date = (new Date()).getDate();
var testDate = GM_getValue("date",0);

var dayDiff = GM_getValue("ddiff",0);
if (date != testDate){
	dayDiff = 0;
	GM_setValue("date",date);
}

AUTH_CODE = GM_getValue("code",AUTH_CODE);
ID = GM_getValue("id",ID);

if(/app1896352/.test(window.location.href)){
	try{
		AUTH_CODE = window.document.body.innerHTML.match(/auth_key=(.+)\&language/)[1];
		GM_setValue("code",AUTH_CODE);
		ID = window.document.body.innerHTML.match(/viewer_id=(\d+)/)[1];
		GM_setValue("id",ID);
	}catch(e){};
}

var URL = "http://map.artch.ru/get_money.php?auth_key="+AUTH_CODE+"&viewer_id="+ID+"&user_id="+ID;
console.log(URL);

GM_addStyle(".vvm_button{color:"+TXT_COLOR+"!important; text-decoration: none;} .vvm_button:hover{color:"+TXT_COLOR+"!important;text-decoration: underline!important;}");

function isActive(){
	return (stack[scriptId] == 1);
}

function addDayDiff(diff){
	if (isActive() && !isNaN(diff)){
		dayDiff += diff;
		GM_setValue("ddiff",dayDiff);
	}
}

function get(url, handle) {
	GM_xmlhttpRequest({
		method : "GET",
		url : url,
		onload : function(o) {
			handle(o.responseText);
		}
	});
}

var chainAjax = function(url, array, loop, timeout) {
	if (!url && !array) {
		return;
	}
	var i = 0;
	get(url,handle);

	function handle(d) {
		if (loop === true) {
			if (typeof array !== 'function') {
				if (i >= array.length) {
					i = 0;
				}
				array[i++](d);
			} else {
				array(d);
			}
			if (timeout > 0) {
				setTimeout(function() {
							get(url, handle)
						}, timeout);
			} else {
				get(url, handle);
			}
		} else {
			if (typeof array !== 'function') {
				if (i >= array.length) {
					return;
				}
				array[i++](d);
				if (typeof timeout === 'number' && timeout > 0) {
					setTimeout(function() {
								get(url, handle)
							}, timeout);
				} else {
					get(url, handle);
				}
			} else {
				array(d);
			}
		}
	};
}

function setMoney(o){
	try{
		var num = parseInt(eval("("+o+")").money);
		GM_setValue("money",num);
		
		var prev = parseInt(money.innerHTML.match(/(\d+).\|/)[1]); 
		var diff = parseInt(num - prev);
		
		addDayDiff(diff);
		
		money.innerHTML = "<a class='vvm_button' href='"+APP_URL+"'>"+num+" | "+dayDiff+"</a>";
		updateWidth();
		
		if (num != prev){
		
			if (diff >= DIFF){
				holder.style.backgroundColor = BG_ALERT;
				GM_setValue("color",BG_ALERT);
			}
			
			if (ALERT){
				if (isActive()){
					if(diff >= DIFF){
						alert("Баланс в Владениях изменился!\n\n Было: \t\t"+prev+"\nСтало: \t\t"+num + "\nРазница: \t"+diff);
					}
				}
			}
		}
	} catch(e){
		money.innerHTML = "error!";
		updateWidth();
		console.log(e);
	}
}

function resetColor(){
	holder.style.background = "url("+bg+")";
	GM_setValue("color","bg");
}

function updateWidth(){
	holder.style.left = document.body.width || document.documentElement.width || document.width - holder.offsetWidth + "px";
}

var holder = document.createElement("div");
holder.id = "v_money_checker";
holder.style.width = "auto";
holder.style.padding = "0px 10px";
holder.style.height = "30px";
holder.style.position = "fixed";
if (GM_getValue("color","bg") == "bg"){
	holder.style.background = "url("+bg+")";
} else {
	holder.style.backgroundColor = BG_ALERT;
}
holder.style.textAlign = "center";
holder.style.MozBorderRadius = "7px";
holder.style.lineHeight = "30px";
holder.style.fontSize = "18px";
holder.style.fontFamily = "Lucida Grande, sans-serif";
holder.style.top = window.innerHeight - 30 + "px";


var money = document.createElement("span");
money.style.color = TXT_COLOR;
money.innerHTML = "<a class='vvm_button' href='"+APP_URL+"'>"+GM_getValue("money",0)+" | "+dayDiff+"</a>";
money.style.paddingLeft = "20px";
money.style.background = "url("+img+") no-repeat scroll 0 2px";
money.style.fontWeight = "bold";


holder.addEventListener("click",function(){resetColor();},false);
holder.appendChild(money);

document.body.appendChild(holder);
updateWidth();

chainAjax(URL,function(o){setMoney(o);}, true,TIMEOUT);