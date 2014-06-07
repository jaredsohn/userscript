// ==UserScript==
// @name           Miner helper
// @namespace      botva.ru
// @description    Pomosch' kuznecam i samo-kovatelyam, v poiske min.
// @include        http://g*.botva.ru/smith.php?a=owngame&start=2*
// @include        http://g*.botva.ru/smith.php?a=traingame&start=2*
// @include        http://g*.botva.ru/smith.php?a=leasegame&start=2*
// @include        http://g*.botva.mail.ru/smith.php?a=owngame&start=2*
// @include        http://g*.botva.mail.ru/smith.php?a=traingame&start=2*
// @include        http://g*.botva.mail.ru/smith.php?a=leasegame&start=2*
// ==/UserScript==

var url = location.protocol + '//' + location.host;

f_size = 4;
f_mine = 2;

//	расшариваем сет_валуе, для обработчика кнопки.
unsafeWindow.set_value = function (key,value){
	window.setTimeout(function() {GM_setValue(key,value)}, 0);
};

//	изврат, но приходится (
unsafeWindow.com_clicker = function (){
	lf1 = document.getElementById('input_m1');
	lf2 = document.getElementById('input_m2');
	f_mine = parseInt(lf1.value,10);
	f_size = parseInt(lf2.value,10);
	unsafeWindow.set_value('f_size',f_size);
	unsafeWindow.set_value('f_mine',f_mine);
};

work = function(){
	at = document.getElementById('action_top');
	if (at) at.parentNode.removeChild(at);

	f1 = document.getElementById('input_m1');
	f2 = document.getElementById('input_m2');
	gf = document.getElementById('gameField');

	if (!f1){
		f_size = parseInt(GM_getValue('f_size',6),10);
		f_mine = parseInt(GM_getValue('f_mine',7),10);
		var block = document.createElement('div');
		gf.parentNode.insertBefore(block, gf);
		var qsize_tips = document.createElement('span');
		block.appendChild(qsize_tips);
		qsize_tips.textContent = 'Размер поля (одно число):';
		var size_value = document.createElement('input');
		size_value.setAttribute('id','input_m2');
		size_value.setAttribute('type','text');
		size_value.setAttribute('size','3');
		size_value.setAttribute('value',f_size);
		size_value.setAttribute('style','-moz-user-select:text; margin:5px 20px 5px 5px;')
		block.appendChild(size_value);
		var qmine_tips = document.createElement('span');
		block.appendChild(qmine_tips);
		qmine_tips.textContent = 'Число мин на поле:';
		var mine_value = document.createElement('input');
		mine_value.setAttribute('id','input_m1');
		mine_value.setAttribute('type','text');
		mine_value.setAttribute('size','3');
		mine_value.setAttribute('value',f_mine);
		mine_value.setAttribute('style','-moz-user-select:text; margin:5px 20px 5px 5px;')
		block.appendChild(mine_value);
		var submit_command = document.createElement('input');
		submit_command.setAttribute('id','input_m3');
		submit_command.setAttribute('type','button');
		pic = url + '/images/RU/buttons/b_accept2_p.png';
		
		submit_command.setAttribute('style','margin:5px; width: 104px; height: 34px; background-image:url("'+pic+'")');
		block.appendChild(submit_command);
		submit_command.addEventListener ('click', unsafeWindow.com_clicker, false);
	}
	setTimeout(work2,200);
};


next_hint = function(){
	setTimeout(work2,200);
};



function test_near(i1, i2){
	if (i1===i2) return false;
	x1 = i1 % f_size;
	x2 = i2 % f_size;
	y1 = (i1 - x1) / f_size;
	y2 = (i2 - x2) / f_size;
	if (Math.abs(x1-x2)>1) return false;
	if (Math.abs(y1-y2)>1) return false;
	return true;
	
}



work2 = function(){
	cd = document.getElementById('countdown1');
	if (cd) {return};	//	Вроде бы уже идёт получение смеси

	lf1 = document.getElementById('input_m1');
	lf2 = document.getElementById('input_m2');
	f_mine = parseInt(lf1.value,10);
	f_size = parseInt(lf2.value,10);
	// определились с введёнными значениями.

	mess = document.getElementsByClassName('message');
	if (mess.length>0){
		if (mess[0].textContent==='Вы получили Ядрёную Смесь, которую можно использовать в кузнечном деле.'){
			return;
		}
		if (mess[0].textContent==='Тырь-тырь… Ну вот, кристалл безвозвратно утерян. Ты попал прямо в уязвимое место.'){
			mess[0].textContent='Это ботвинский рандом, приятель.';
			return;
		}

	}

	cell_open=0;
	cell_mine=0;
	cell_undef=f_size*f_size;
	dsize = f_size*f_size;

	ce=[];
	for (ii = 1; ii <=dsize; ++ii){
		ce[ii] = document.getElementById('i'+ii);
	}

	arr = [];
	for (i = 0; i < f_size; ++i)
		arr[i]=[];

	for (i = 0; i < dsize; ++i){
		ind = i + 1;
		arr[i] = 'u';
		if (ce[ind].className==='c_B_0') arr[i] = 0;
		if (ce[ind].className==='c_B_1') arr[i] = 1;
		if (ce[ind].className==='c_B_2') arr[i] = 2;
		if (ce[ind].className==='c_B_3') arr[i] = 3;
		if (ce[ind].className==='c_B_4') arr[i] = 4;
		if (ce[ind].className==='c_B_5') arr[i] = 5;
		if (ce[ind].className==='c_B_6') arr[i] = 6;
		if (ce[ind].className==='c_B_7') arr[i] = 7;
		if (ce[ind].className==='c_B_8') arr[i] = 8;
		if (arr[i]!=='u'){
			++cell_open;
			--cell_undef;
		}
	};

	oracle = [];

	oracle[0] = {mine: f_mine, len: 0, list: []};
	for (index = 0; index < dsize; ++index){
		if (isNaN(arr[index])||(arr[index]===9)){
			oracle[0].list[oracle[0].len]=index;
			oracle[0].len++;
		}
	}


	for (i = 0; i < dsize; ++i){
		if (isNaN(arr[i])||(arr[i]===9)) continue;
		index = oracle.length;
		oracle[index]={mine: arr[i], len: 0, list: []};
		oracle[index+1]={mine: f_mine - arr[i], len: 0,list: []};
		for (ii = 0; ii < dsize; ++ii){
			if (isNaN(arr[ii])||(arr[ii]===9)){
				if (test_near(i,ii)){
					oracle[index].list[oracle[index].len]=ii;
					oracle[index].len++;
				}
				else{
					oracle[index+1].list[oracle[index+1].len]=ii;
					oracle[index+1].len++;
				}
			}
		}
		if (oracle[index].len===0) oracle[index]=null;
		if (oracle[index+1].list.len===0) oracle[index+1]=null;
	}
	
	change = true;
	while (change){
		change = false;
		for (j = 0; j < oracle.length; ++j){
			if (!oracle[j]) continue;
			if (oracle[j].len===1){
				for (k = 0; k < oracle.length; ++k){
					if (!oracle[k]||(k===j)) continue;
					for (l = 0; l < oracle[k].len; ++l){
						if (oracle[k].list[l]===oracle[j].list[0]){
							change = true;
							oracle[k].mine -= oracle[j].mine;
							for (; l < oracle[k].len - 1; ++l){
								oracle[k].list[l] = oracle[k].list[l+1];
							}
							oracle[k].list[oracle[k].len-1]=null;
							oracle[k].len--;
							l++;
						}
					}
					if (oracle[k].len===0) {oracle[k].list=null; oracle[k]=null;}
				}
			}
			else if (oracle[j].mine===0){
				for (i = 0; i < oracle[j].len; ++i){
					index = oracle.length;
					oracle[index] = {mine: 0, len: 1, list: []};
					oracle[index].list[0] = oracle[j].list[i];
				}
				oracle[j].list = null;
				oracle[j] = null;
				change = true;
			}
			else if (oracle[j].mine===oracle[j].len){
				for (i = 0; i < oracle[j].len; ++i){
					index = oracle.length;
					oracle[index] = {mine: 1, len: 1, list: []};
					oracle[index].list[0] = oracle[j].list[i];
				}
				oracle[j].list = null;
				oracle[j] = null;
				change = true;
			}
			else{
				for (k = 0; k < oracle.length; ++k){
					if (!oracle[k]||(j===k)||(oracle[k].len===1)) continue;
					i1 = 0;
					i2 = 0;
					m = 0;
					while ((i1 < oracle[j].len)&&(i2 < oracle[k].len)){
						if (oracle[j].list[i1] === oracle[k].list[i2]){
							++m; ++i1; ++i2
						}
						else if (oracle[j].list[i1] < oracle[k].list[i2]){
							++i1;
						}
						else if (oracle[j].list[i1] > oracle[k].list[i2]){
							++i2;
						}
					}
					lst = [];
					ln = 0;
					mn = 0;
					if ((m===oracle[j].len)&&(m===oracle[k].len)){
						oracle[k].list = null;
						oracle[k] = null;
						change = true;
					}
					else if (m===0){
						i1 = 0; i2 = 0;
						while ((i1 < oracle[j].len)&&(i2 < oracle[k].len)){
							if (oracle[j].list[i1] < oracle[k].list[i2]){
								lst[lst.length] = oracle[j].list[i1];
								++i1;
							}
							else{
								lst[lst.length] = oracle[k].list[i2];
								++i2;
							}
						}
						for (; i1 < oracle[j].len; ++i1){
							lst[lst.length] = oracle[j].list[i1];
						}
						for (; i2 < oracle[k].len; ++i2){
							lst[lst.length] = oracle[k].list[i2];
						}
						ln = oracle[j].len + oracle[k].len;
						mn = oracle[j].mine + oracle[k].mine;
					}
					else if (m===oracle[j].len){
						i1 = 0; i2 = 0;
						while ((i1 < oracle[j].len)&&(i2 < oracle[k].len)){
							if (oracle[j].list[i1] > oracle[k].list[i2]){
								lst[lst.length] = oracle[k].list[i2];
								++i2;
							}
							else{	// ===
								++i1; ++i2;
							}
						}
						for (; i2 < oracle[k].len; ++i2){
							lst[lst.length] = oracle[k].list[i2];
						}
						ln = oracle[k].len - oracle[j].len;
						mn = oracle[k].mine - oracle[j].mine;
					}
					else if (m===oracle[k].len){
						i1 = 0; i2 = 0;
						while ((i1 < oracle[j].len)&&(i2 < oracle[k].len)){
							if (oracle[j].list[i1] < oracle[k].list[i2]){
								lst[lst.length] = oracle[j].list[i1];
								++i1;
							}
							else{	// ===
								++i1; ++i2;
							}
						}
						for (; i1 < oracle[j].len; ++i1){
							lst[lst.length] = oracle[j].list[i1];
						}
						ln = oracle[j].len - oracle[k].len;
						mn = oracle[j].mine - oracle[k].mine;
					}
					if (ln > 0){
						cmp = false;
						for (n = 0; !cmp && (n < oracle.length); ++n){
							if (!oracle[n]) continue;
							comp = true;
							if (ln !== oracle[n].len) comp = false;
							for (l = 0; comp && (l < ln); ++l){
								if (lst[l] !== oracle[n].list[l])
									comp = false;
							}
							cmp = comp;
						}
						if (!cmp){
							change = true;
							index = oracle.length;
							oracle[index] = {mine: mn, len: ln, list: []};
							for (l = 0; l < ln; ++l){
								oracle[index].list[l] = lst[l];
							}
						}
					}
				}
			}
		}
	}
	
	for (i = 0; i < oracle.length; ++i){
		if (!oracle[i]) continue;
		min_index = i;
		if (oracle[i].len > 1) continue;
		if (oracle[i].mine === 0) arr[oracle[i].list[0]] = 9;
		if (oracle[i].mine === 1) arr[oracle[i].list[0]] = 'm';
	}

	for (i = 0; i < oracle.length; ++i){
		if (!oracle[i]) continue;
		if (oracle[i].mine/oracle[i].len < oracle[min_index].mine/oracle[min_index].len)
			min_index = i;
		if ((oracle[i].mine/oracle[i].len == oracle[min_index].mine/oracle[min_index].len)&&(oracle[i].len > oracle[min_index].len))
			min_index = i;
	}

	for (i = 0; i < dsize; ++i){
		if (arr[i]==='m')
			ce[i+1].className = 'c_A';
	}	

	around = dsize;
	ql = 0;
	lst = [];
	for (l = 0; l < oracle[min_index].len; ++l){
		ca = 0;
		il = oracle[min_index].list[l]; 
		for (i = 0; i < dsize; ++i){
			if (isNaN(arr[i])){
				if (test_near(i,il)) ++ca;
			}
		}
		if (ca < around){
			ql = 0;
			around = ca;
		}
		if (ca == around){
			lst[ql] = il;
			++ql;
		}
	}

	for (i = 0; i <ql; ++i){
		ce[lst[i]+1].className='hover';
	}
//	rnd = Math.floor(Math.random()*ql);
//	if (rnd == ql) rnd = 0;
//	ce[lst[rnd]+1].className='hover';
	next_hint();
	
};


document.addEventListener( "DOMContentLoaded", function(){work()}, false );
