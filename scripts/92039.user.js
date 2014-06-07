// ==UserScript==
// @name           TheCrims Plus
// @namespace      http://userscripts.org/scripts/show/31066
// @description    TheCrims Plus is a calculator, beta
// @include        *.beta7.thecrims.com/*
// ==/UserScript==


<table width="100%" border="0" cellspacing="0" cellpadding="0" class="infotext" align="center">
  <tr>
    <td>
    	    	<h4>Crimes solo:</h4>
		<form action="robbery.php" method="post" name="7cc064f09696" onSubmit="showWait(); return checkBox(this.form.crime_id.value);">
		<input type="hidden" name="action" value="perform_single_crime">
		<input type="hidden" name="prepvalue" value="884-100">
		<input type="hidden" name="06f3014fefc7a26ce8e17b5fa1b5299d" value="zGjIwsTIzMbCcGJgwmTKxsZqxGZwzMZscMjEcMJkZGiGZZaak5qWmJNxYw==">
		<input type="hidden" name="skey" value="3adce37e1cb158197aa4b8a7d4ec2edc">
    		<table width="100%" border="0" cellspacing="4" cellpadding="0" class="infotext">
			  <tr>
				<td>
								  <select name="crime_id" onChange="showhide(this.form.crime_id.options[this.form.crime_id.selectedIndex].value, new Array('1', '2', '3', '4', '5', '6', '28', '7', '25', '8', '9', '10', '11', '26', '12', '13', '14', '15', '16', '17', '29', '19', '20', '21', '18', '27'), false);">
					<option value="-">[Escolha...]</option>
					<option value="1" style="color: green">Loja de 1,99</option>
<option value="2" style="color: red">Velhinha na rua</option>
<option value="3" style="color: red">Rádio de carro</option>
<option value="4" style="color: red">Taxi</option>
<option value="5" style="color: red">Jogo de Cartas</option>
<option value="6" style="color: red">Roubar uma casa</option>
<option value="28" style="color: red">Pizzaria</option>
<option value="7" style="color: red">Posto de gasolina</option>
<option value="25" style="color: red">Cinema</option>
<option value="8" style="color: red">Tabacaria</option>
<option value="9" style="color: red">Carrefour</option>
<option value="10" style="color: red">Sequestro</option>
<option value="11" style="color: red">Joalheria</option>
<option value="26" style="color: red">Depósito de Segurança</option>
<option value="12" style="color: red">Banco Pequeno</option>
<option value="13" style="color: red">Chefe local da Máfia</option>
<option value="14" style="color: red">Concessionária</option>
<option value="15" style="color: red">Paypal</option>
<option value="16" style="color: red">Bandidos locais</option>
<option value="17" style="color: red">Traficante local</option>
<option value="29" style="color: red">Loja de informática</option>
<option value="19" style="color: red">Boate</option>
<option value="20" style="color: red">Casas Bahia</option>
<option value="21" style="color: red">Museu Nacional</option>
<option value="18" style="color: red">Cassino</option>
<option value="27" style="color: red">Russo, Rei das Drogas</option>
				  </select>
				</td>
				<td width="200" rowspan="2">
										
						<div id="id1" style="display: none;">
							<b>Loja de 1,99</b><br>
							Estamina requerida: 5<br>
							Dificuldade: 3<br>
						</div>
											
						<div id="id2" style="display: none;">
							<b>Velhinha na rua</b><br>
							Estamina requerida: 10<br>
							Dificuldade: 10<br>
						</div>
											
						<div id="id3" style="display: none;">
							<b>Rádio de carro</b><br>
							Estamina requerida: 10<br>
							Dificuldade: 15<br>
						</div>
											
						<div id="id4" style="display: none;">
							<b>Taxi</b><br>
							Estamina requerida: 10<br>
							Dificuldade: 25<br>
						</div>
											
						<div id="id5" style="display: none;">
							<b>Jogo de Cartas</b><br>
							Estamina requerida: 10<br>
							Dificuldade: 40<br>
						</div>
											
						<div id="id6" style="display: none;">
							<b>Roubar uma casa</b><br>
							Estamina requerida: 12<br>
							Dificuldade: 45<br>
						</div>
											
						<div id="id28" style="display: none;">
							<b>Pizzaria</b><br>
							Estamina requerida: 12<br>
							Dificuldade: 55<br>
						</div>
											
						<div id="id7" style="display: none;">
							<b>Posto de gasolina</b><br>
							Estamina requerida: 14<br>
							Dificuldade: 65<br>
						</div>
											
						<div id="id25" style="display: none;">
							<b>Cinema</b><br>
							Estamina requerida: 15<br>
							Dificuldade: 70<br>
						</div>
											
						<div id="id8" style="display: none;">
							<b>Tabacaria</b><br>
							Estamina requerida: 16<br>
							Dificuldade: 100<br>
						</div>
											
						<div id="id9" style="display: none;">
							<b>Carrefour</b><br>
							Estamina requerida: 18<br>
							Dificuldade: 170<br>
						</div>
											
						<div id="id10" style="display: none;">
							<b>Sequestro</b><br>
							Estamina requerida: 20<br>
							Dificuldade: 250<br>
						</div>
											
						<div id="id11" style="display: none;">
							<b>Joalheria</b><br>
							Estamina requerida: 25<br>
							Dificuldade: 300<br>
						</div>
											
						<div id="id26" style="display: none;">
							<b>Depósito de Segurança</b><br>
							Estamina requerida: 27<br>
							Dificuldade: 370<br>
						</div>
											
						<div id="id12" style="display: none;">
							<b>Banco Pequeno</b><br>
							Estamina requerida: 30<br>
							Dificuldade: 480<br>
						</div>
											
						<div id="id13" style="display: none;">
							<b>Chefe local da Máfia</b><br>
							Estamina requerida: 35<br>
							Dificuldade: 570<br>
						</div>
											
						<div id="id14" style="display: none;">
							<b>Concessionária</b><br>
							Estamina requerida: 40<br>
							Dificuldade: 640<br>
						</div>
											
						<div id="id15" style="display: none;">
							<b>Paypal</b><br>
							Estamina requerida: 45<br>
							Dificuldade: 770<br>
						</div>
											
						<div id="id16" style="display: none;">
							<b>Bandidos locais</b><br>
							Estamina requerida: 50<br>
							Dificuldade: 880<br>
						</div>
											
						<div id="id17" style="display: none;">
							<b>Traficante local</b><br>
							Estamina requerida: 60<br>
							Dificuldade: 980<br>
						</div>
											
						<div id="id29" style="display: none;">
							<b>Loja de informática</b><br>
							Estamina requerida: 65<br>
							Dificuldade: 1150<br>
						</div>
											
						<div id="id19" style="display: none;">
							<b>Boate</b><br>
							Estamina requerida: 70<br>
							Dificuldade: 1430<br>
						</div>
											
						<div id="id20" style="display: none;">
							<b>Casas Bahia</b><br>
							Estamina requerida: 75<br>
							Dificuldade: 2700<br>
						</div>
											
						<div id="id21" style="display: none;">
							<b>Museu Nacional</b><br>
							Estamina requerida: 80<br>
							Dificuldade: 3000<br>
						</div>
											
						<div id="id18" style="display: none;">
							<b>Cassino</b><br>
							Estamina requerida: 85<br>
							Dificuldade: 3450<br>
						</div>
											
						<div id="id27" style="display: none;">
							<b>Russo, Rei das Drogas</b><br>
							Estamina requerida: 90<br>
							Dificuldade: 4000<br>
						</div>
										</td>
			  </tr>
			  <tr>
				<td>
					<div style="color: #464646">Coloque O Código:</div>					<input type="submit" name="e0768b" value="Roubar!" style="width:130px; margin-top: 5px">
				</td>
			  </tr>
		</table>
		</form>
		    </td>