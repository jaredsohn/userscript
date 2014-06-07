// ==UserScript==
// @name           Test
// @namespace      Hardt
// @include        http://reidocrime.com/?q=map*
// ==/UserScript==
nostop = true;
actions = ["manager.rob","manager.steal","taxi.rob","drugdealer.police","newcar.rob","skater.robphone","punk.rob","businesslady.hello","dog.help","mother.help","postman.help"];
actEst = [80,75,75,30,75,65,70,10,5,30,0];
function iniciar(){
	x = prompt("[1]roubar laptop /gerente\n[2]roubar telefore /gerente\n[3]roubar lucro /taxi\n[4]envie os policiais /traficante\n"+
	"[5]roubar cd player /carro brilhante\n[6]roubar o celular /skatista\n[7]esvaziar os bolsos /torcedor\n"+
	"[8]fazer um elogio /mulher de negocios\n[9]enviar p/ abrigo /cao\n[10]ajudar /mae\n[11] carteiro","1");
	if(x.match(/^([1-9]|1[0-1])$/)){
		x = x*1;
		GM_setValue("rob",x);
		location.reload();
	};
};
function parar(){
	GM_setValue("rob",0);
	location.reload();
};

num = GM_getValue("rob",0);
if(num){
	if(document.getElementsByName("chatForm")[0]){
		GM_setValue("rob",0);
	}else{
		if(document.getElementsByName("cop[escape]")[0]){
			GM_setValue("rob",0);
		}else{
			mapz = GM_getValue("numb3",0);
			if(mapz != 20){
				mapz++;
			}else{
				if(!(nostop)){
					if(confirm("deseja parar agora?"))parar();
				};
				mapz = 0;
			};
			GM_setValue("numb3",mapz);
			z = GM_getValue("number",1);
			num2 = -110;
			req = document.getElementsByClassName("logout")[0].href.match(/z=[a-zA-Z0-9]{4}/);
			if(req == null){
				location.reload();
			}else{
				stamina = document.getElementById("svalue").innerHTML*1;
				num1 = GM_getValue("numb1",-100);
				if(stamina < actEst[num-1]){
					location.href = "http://reidocrime.com/?q=map/"+num1+"~"+num2+"/cofemachine.drink-cafe/5&"+req;
				}else{
					if(z == 1){
						num1++;
						if(num1 == 101){
							num1 = -100;
						};
						GM_setValue("numb1",num1);
						GM_setValue("number",2);
						location.href = "http://reidocrime.com/?q=map/"+num1+"~"+num2+"/";
					}else if(z == 2){
						GM_setValue("number",1);
						location.href = "http://reidocrime.com/?q=map/"+num1+"~"+num2+"/"+actions[num-1]+
						"&"+req;
					};
				};
			};
		};
	};
}else{
	maps = GM_getValue("numb2",20);
	if(maps != 20){
		maps++;
	}else{
		iniciar();
		maps = 0;
	};
	GM_setValue("numb2",maps);
};