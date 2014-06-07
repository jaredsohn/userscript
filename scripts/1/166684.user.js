// ==UserScript==
// @name            Battle Stars
// @description     Script statistiques de BDF
// @include         http://*.the-west.*/game.php*
// @include         http://*.the-west.*/forum.php*
// @version     1.0.9
// @history     1.0.9 correction
// @history     1.0.8 formatage pour forum
// @history     1.0.7 ajout fenetre de resultat et compatibilité 2.0.5
// @history     1.0.6 passage en 2.0.4
// @history     1.0.5 compatibilite Chrome
// @history     1.0.4 bug maj
// @history     1.0.3 corrections
// @history     1.0.2 ajout stats globales
// @history     1.0.1 debut correction bugs
// @history     1.0.0 initial 
// @grant       none 
// ==/UserScript==
(function(fn) {
	var script = document.createElement('script');
	script.type = "application/javascript";
	script.textContent = '(' + fn + ')();';
	document.body.appendChild(script);
	script.parentNode.removeChild(script);
})
		(function() {
			
			function calcul(pType, pLibelle, pTexte, pForm, pHead, pVariables,
					pConstr, pTError, pCompare, pSort, pPos, pNull, pFloat) {
				this.globalHeader = new Array("#", "Nom");
				this.help = pTexte;
				this.type = pType;
				this.formule = pForm;
				this.header = pHead;
				this.libelle = pLibelle;
				this.variables = pVariables;
				this.sort = pSort;
				this.compare = pCompare, this.shouldBePos = pPos;
				this.shouldBeNull = pNull;
				this.contrainte = pConstr;
				this.isFloating = pFloat;
				this.testError = pTError;
				if (this.compare.indexOf(">") > -1) {
					this.limite = '0';
				} else {
					this.limite = '9999999999';
				}

			}
			;
			calcul.prototype.init = function() {
				this.type = '';
				this.help = '';
				this.formule = '';
				this.header = '';
				this.libelle = '';
				this.variables = {};
				this.sort = true;
				this.shouldBePos = false;
				this.shouldBeNull = true;
				this.contrainte = '';
			};
			calcul.prototype.getLigne = function(val) {
				var cellules = {};

				var css = 'tw_blue';
				if (val.battle_type == "attacker") {
					css = 'tw_red';
				}

				if ((!this.shouldBePos)
						|| (this.shouldBePos && val[this.type] > 0)) {
					cellules['battle_num'] = val.ind;
					cellules['battle_nam'] = val.name;

					$.each(this.variables, function(ind, td) {
						if (td.indexOf('.') > 0) {

							arTd = td.split('.');
							var cible = val;
							$.each(arTd, function(ind, value) {
								cible = cible[value];
							});

							var det = cible
						} else {
							var det = val[td];
						}

						cellules["battle_cls" + ind] = det;

					})

					Stats.tableClassement.buildRow('battlestat ' + css,
							cellules, withMod(this, val));
				}

			};
			calcul.prototype.getShortLigne = function(val) {

				try {
					var header = this.header;

					var lig = '';

					$.each(this.variables, function(ind, td) {
						if (td.indexOf('.') > 0) {
							arTd = td.split('.');
							var cible = val;
							$.each(arTd, function(ind, value) {
								cible = cible[value];
							});

							var det = cible// val[arTd[0]][arTd[1]]
						} else {
							var det = val[td];
						}
						// console.log( det );
						lig += header[ind] + ' : ' + det + ' ';
					});

					return lig;
				} catch (execption) {
					console.log(execption);

					return '';
				}

			};
			calcul.prototype.getHeader = function() {
				var title = '';

				var header = this.globalHeader.concat(this.header);

				var wdth = Math.round((74) / (this.header.length));
				$('#battle_stat', CemeteryWindow.DOM).attr('id',
						'battle_statStar');

				$('#battle_statStar', CemeteryWindow.DOM).remove();
				$('#battle_stat', CemeteryWindow.DOM).text('details');

				Stats.tableClassement =  new west.gui.Table(false)
						.setId('battle_stat')

				Stats.tableClassement.createEmptyMessage('Battle Stars')
						.addColumn("battle_num", {
							sortBy : 'name'
						}).addColumn("battle_nam", {
							sortBy : 'name'
						}).appendToThCell("head", "battle_num", header[0],
								header[0]).appendToThCell("head", "battle_nam",
								header[1], header[1])

				$.each(this.header, function(ind, th) {
					Stats.tableClassement.addColumn("battle_cls" + ind, {
						sortBy : th
					}).appendToThCell("head", "battle_cls" + ind, th, th);
					Stats.tableClassement.getCell("head", "battle_cls" + ind)
							.css('width', wdth + '%');
				});

				$('div.cemetery-content', CemeteryWindow.DOM).append(
						Stats.tableClassement.getMainDiv());

				return title;

			};
			calcul.prototype.sortArray = function(arr) {
				var type = this.type;
				var sortable = this.sort;

				arr.sort(function(a, b) {
					var x = a[type];
					var y = b[type];
					if ($.isNumeric(x) && $.isNumeric(y)) {

						if (sortable) {
							return ((x < y) ? -1 : ((x > y) ? 1 : 0));
						} else {
							return ((x > y) ? -1 : ((x < y) ? 1 : 0));
						}
					} else {
						throw ('Tri impossible sur du non numerique ');
					}
					;

				});
				return arr;
			};
			calcul.prototype.getTaux = function(val) {
				if (eval(this.contrainte)) {
					taux = eval(this.formule);
				} else {
					taux = eval(this.testError);
				}
				if (this.isFloating) {
					taux = parseFloat(taux.toFixed(2));
				}
				return taux;// .toFixed(2);
			};
			var withMod = function(calc, val) {
				return function(row) {
					var wdth = Math.round((74) / (calc.header.length));

					$.each(calc.header, function(ind, td) {

						$('.battle_cls' + ind, row).css('width', wdth + '%');

					})

					row.attr('title', val.townname + " - " + val.weaponname
							+ " (Max : " + val.weaponmaxdmg + ", Min : "
							+ val.weaponmindmg + ")");

					return row;
				}
			};
			var modifStarsRow = function(val) {
				return function(row) {
					$('.stat_dtl', row).css({
						'width' : '60%',
						'text-align' : 'left'
					});
					$('.battle_nam', row).attr(
							'title',
							val.obj.townname + " - " + val.obj.weaponname
									+ " (Max : " + val.obj.weaponmaxdmg
									+ ", Min : " + val.obj.weaponmindmg + ")");
					$('.battle_tow', row).css('cursor', 'pointer');
					$('.battle_tow', row).attr('title',
							Stats.getFormule(val.type).help);

					return row;
				}
			};
			Stats = {
				tauxLim : {},
				formules : [],
				stars : [],

				attaquants : {

				},
				defenseurs : {

				},
				init : function() {
					Stats.stars = [];
					Stats.attaquants = {

					};
					Stats.initFormule();

					Stats.defenseurs = {

					};
				},
				initFormule : function() {
					try {
						Stats.formules = [];
						// pType, pForm, pHead, pLibelle, pVariables, pSort,
						// pPos,
						// pNull,pConstr, pTError,
						// pFloat
						Stats.formules
								.push(new calcul(
										'heros',
										'Héros',
										'Taux du nombre de tirs ciblés (évités + reçus) par rapport aux PV de départ',
										'(((val.takenhits + val.dodgecount) *1000) / (val.starthp))',
										[ /* 'Rang', 'Nom', 'Taux', */
										'Taux', 'Tir réussis', 'Tirs Evités',
												'PV' ],

										[ /* 'val.ind', 'val.obj.name', */
										'heros', 'takenhits', 'dodgecount',
												'starthp' ],

										'$.isNumeric( val.starthp) && ( val.starthp) > 0',
										'0', '>', false, false, false, true));
						/*
						 * Stats.formules.push(new calcul('roger', 'Roger
						 * Rabbit', 'val.takenhits + val.dodgecount', [ 'Tirs',
						 * 'Tirs reçus', 'Tir évité' ], [
						 * 'roger','takenhits','dodgecount' ], ' val.takenhits +
						 * val.dodgecount > 0', '0', '>', false, false, false,
						 * true));
						 */
						Stats.formules.push(new calcul('survivant', 'Survivor',
								'Celui qui finit avec le moins de pv',
								'val.finishedhp', [ 'PV restants' ],
								[ 'finishedhp' ], '  val.finishedhp  > 0', '0',
								'<', true, true, false, false));

						Stats.formules
								.push(new calcul(
										'hitmachine',
										'Hit Machine',
										'Pourcentage de tirs réussis par rapport aux total de tirs effectués',
										'(val.hitcount /(val.hitcount + val.misscount))*100',
										[ 'Taux (%)', 'Tirs réussis',
												'Tirs ratés' ],

										[ 'hitmachine', 'hitcount', 'misscount' ],

										'$.isNumeric(val.hitcount + val.misscount) && (val.hitcount + val.misscount) > 0',
										'0', '>', false, false, false, true));

						// Tirs esquivé / (Tirs esquivés + tirs reçus)
						Stats.formules
								.push(new calcul(
										'matrix',
										'Matrix',
										'Pourcentage de tirs évités par rapport aux total de tirs ciblés (pondération 1/tirs évités)',
										'parseFloat((( val.dodgecount / (val.takenhits + val.dodgecount))*100 )- (1/val.dodgecount))',
										[ 'Taux (%)', 'Tirs reçus',
												'Tirs évités' ],
										[ 'matrix', 'takenhits', 'dodgecount' ],

										'$.isNumeric(val.dodgecount + val.takenhits) &&  (val.takenhits + val.dodgecount) > 0 &&   val.dodgecount  > 0',
										'0', '>', false, false, false, true));
						Stats.formules
								.push(new calcul(
										'headshot',
										'HeadShot',
										'Pourcentage du nombre de ko par rapport aux total des tirs touchés',
										'(val.ko_shots.length / val.hitcount)*100',
										[ 'Taux (%)', 'Ko effectués',
												'Tirs réussis' ],

										[ 'headshot', 'ko_shots.length',
												'hitcount' ],

										'$.isNumeric(val.hitcount) && val.hitcount > 0',
										'0', '>', false, false, false, true));

					} catch (e) {
						console.log(e);
					}

				},
				getFormule : function(type) {

					for ( var s = 0; s < this.formules.length; s++) {
						calc = this.formules[s];
						if (type == calc.type) {

							return calc;
						}

					}

					throw ("Aucune formule correspondante à " + type);
				},
				getAll : function(type) {
					var ligTot = '';
					$('#route', CemeteryWindow.DOM).text('details');

					var calc = this.getFormule(type);
					$('.info', CemeteryWindow.DOM).text('');
					$('.info', CemeteryWindow.DOM)
							.append(
									'<span>Classement '
											+ calc.libelle
											+ '</span><span style="font-size:12px;"><BR/><i>'
											+ calc.help + '</i></span>');

					var stars = calc.sortArray(CemeteryWindow.currentStats);

					var header = calc.getHeader();

					var shunt = 0;

					$.each(stars, function(ind, stat) {

						if (calc.shouldBePos && stat[type] <= 0) {
							shunt++;
						}

						stat.ind = (ind + 1) - shunt;
						calc.getLigne(stat);

					});

				},
				getStatByPerso : function(name) {
					for ( var s = 0; s < this.stars.length; s++) {
						val = this.stars[s];

						if (name == val.name) {

							return val;
						}

					}
				},
				getLigne : function(stat, index) {

					if (!isDefined(stat)) {
						return '';
					}

					var type = stat.type;
					var nom = stat.name;
					var val = stat.obj;
					var calc = this.getFormule(type);

					var css = 'tw_blue';
					if (val.battle_type == "attacker") {
						css = 'tw_red';
					}

					var cellules = {};

					cellules['battle_tow'] = '<span onclick="javascript:Stats.getAll(\''
							+ type + '\')">' + calc.libelle + '</span>';
					cellules['battle_nam'] = nom;
					cellules['stat_dtl'] = calc.getShortLigne(val);

					Stats.table.buildRow('battlestat ' + css, cellules,
							modifStarsRow(stat));

				},
				addStyle : function() {
				
					var css = ".window_Stats .window_inside { width:580px;height:380 position:absolute; left:5px; top:2px;-webkit-user-select: text !important; -khtml-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important;height:270px; }"
							+ ".window_Stats .window_footer { text-align:right;} "
							+ ".window_Stats .cell_stat { width:150px;font-weight:800;text-shadow:1px 0 0 white; } "
							+ ".window_Stats .cell_att { width:120px; text-align:center;} "
							+ ".window_Stats .cell_def { width:120px;text-align:center; } "
						    + ".window_Stats .cell_dif { width:120px; text-align:center;} "
							+ ".window_Stats .tbody .cell_stat { padding-left:6px; text-align:left;width:150px;font-weight:800;text-shadow:1px 0 0 white; } .window_Stats .tbody .row { left:0px; }"
							+ ".window_Stats .tbody .cell_att { text-align:center; color:#8A0000;width:120px;font-weight:800;text-shadow:1px 0 0 white; }"
							+ ".window_Stats .tbody .cell_def { text-align:center; color:#00008A;width:120px;font-weight:800;text-shadow:1px 0 0 white; }"
							+ ".window_Stats .tbody .cell_dif { text-align:center;width:120px;font-weight:800;text-shadow:1px 0 0 white; }"
							+".zone {-webkit-user-select: text !important; -khtml-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important;height:270px; }"
				
                      if(!$('#STAT_BDF_CSS').length){

					$(
							'<style id="STAT_BDF_CSS" type="text/css" >'
									+ css + '</style>')
							.appendTo('head');
							}
				},
				openWindow : function(original){
				
				 
				 
				 var statWindow =	wman.open(
							'window_Stats',
							'Statistiques de la bataille').setSize(
							650, 400);
					 
				 
			
 
					 var table_window =	new west.gui.Table();	
					 table_window.appendTo(
									$(
											'<div class="window_inside"></div>')
											.appendTo(
													statWindow
															.getContentPane()))
							.addColumns(
									[ 'cell_stat', 'cell_att', 'cell_def', 'cell_dif' ])
							.appendToCell('head', 'cell_stat',
									'Stat')
							.appendToCell('head', 'cell_att',
									"Attaque")
							.appendToCell('head', 'cell_def',
									"Défense")
							.appendToCell('head', 'cell_dif',
									"Différence")
							.appendRow();
				 
					
					var verif="<form><textarea style='height: 250px;width: 600px;'>[code]Statistique\t\t\tAttaque\t\tDéfense\t\tDifférence\n--------------------------------------------------------------------------\n";
					
					$
					.each(
					   
							Stats.results,
							function(ind, val) {
							try{
							
							var cssStr="";
							var dif=0;
							var att=parseFloat(val.attack);
							var def=parseFloat(val.defend);
							
							if(att > val.defend){
									 cssStr="#8A0000";
							         dif = (att -def).toFixed(2);
							}else{
							    cssStr="#00008A";
							    dif =  (def - att).toFixed(2) ;
							}
							
							 
							verif+= val.titre+att+"\t\t"+def+"\t\t"+dif+"\n";
							
						    
						    table_window.appendToCell(
									-1,
									'cell_stat',
									val.titre.trim())
							.appendToCell(
									-1,
									'cell_att',
									'<div>'+att+'</div>')
							.appendToCell(
									-1,
									'cell_def',
									'<div>'+def+'</div>')
							 .appendToCell(
									-1,
									'cell_dif',
									'<div style="color:'+cssStr+';">'+dif+'</div>')
							.appendRow();
							
							
							}catch(e){ 
							 console.log(val);
							    console.log(e);
							}
							});
							verif+="[/code]</textarea></form>";
							var affButton = new west.gui.Button("Format forum", function () {
							
                                 
                                 var cur=$(".window_inside").html();
                                 
                                 if(cur.indexOf("[code]")>-1){
                                            $(".window_inside").html( Stats.current);
                                            
                                       affButton.setCaption("Format forum");  
                                          $("#thetong").css(	{'display': 'none','position':'absolute'});
                                           
                                 }else{
                                            $(".window_inside").html(verif);
                                            Stats.current= cur;
                                            $("#thetong").css(	{'display':'block','position':'absolute'});
                                             affButton.setCaption("Retour");
                                 }
                               
                                 
                                 
                            });
                         
							
				        	$('<div class="window_footer"></div>')
											.appendTo(
													statWindow
															.getContentPane())
															.append(
												'<img id="thetong" style="display:none;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAiCAMAAAAga9RKAAAAB3RJTUUH3QkPDRwqAhPQrgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAwBQTFRFCAgIEBAACBAIEBAICBgIEBAUBiAOCiMNFBQUGBgQIRgIIRgQECEIGCEIECEYGCMQEBghGBAYGBgYGBghGCEYIRgYGBgpIRglISEYECEhGCEhISEhECkYGCkYGCkhGCkpMRAYKRgIKRgQKxsVISkQISkYKSkYISkhKSEhKSkhISEpISkpKRgpKSEpKSkpKSExNSEQMxgbMSEcMSkYORghOSElMSkhOSkhQiUQTyANRiEYTCYYViUUViUcYCYhiSkeDDEUHjEUITElJSkxKTEYKTEpMSkpMSkxCj8QEDkgDkcfF08nLTEtMTExKTk5I0wuNTEgOS4uOTk1QjUxNUIrQjk9NkwpOUpCSjkhTEQuQkJCS0hHV09KVVZSeD4xXlpWFGcnEnMrFn41EJI4Om02PIdDWmdFYGVeEKdCG6s1GaRGFrNKJa8zI69BOrM0Pa5Ga3FGcWtda2tjd3FndXlzf39vhH9viX54fpJcjIh7db81h7dZhISEjoyGkJCMlKCQnCkhpTkhpTkptTEpzjkcyjUp1jEY1jEh1jkQ3jEQ3jkQ1jkY1jEp1jkh1jkp4jUcpTkxvUIY1kIIxj0x1koI2k4M2k4Q2EcbxloYsYg13loh22ge52MQ52sb4nsl5IkpnJQ5tZQ5rZRCrMMxnM5CpdJCr9BCvc5C3qUx2rE9xs5C0M48ztYxxtZCztZC1tZC55Qp75Qp75wh76Ut3rUx7601960x/70198Y5584x784598453s5C79Yx79Y599Y5lM5KnIyEnJSEnJSMnJxKnJxSnJxanMZrpZxKpZyMpZyUpaWUpcZKpc5KrZyMrbVjtaVjta1axblWraWMtcV31rVry8OB1sZr3s5S3tZC59ZC785C79ZC961C985C/8ZKraWUtaWUta2UnJycraWcra2crcactaWcta2cvbWcxrWcpaWltaWlvbWlvb2lxrWlxr2lzr2ltcatvbWtxrWtxr2txsatzr2tzsat1sat596tva211sa159a979693t7G/UjiYQAAAP50Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wDY2QxxAAAFBElEQVR42u3WfWwTZRwHcOJitonZzNHGY083o5Pcbpc9gQZroOyFjbtu7d3GHRtou/O6Nw67N7jWbi3XBYUZAjLRmSkiDBTQDRKIhPCiIVoJMNSgiKgUI3FIIDpBjQ40U5+7KxuwDfgD//Pb3P119+nvefu1E4buXib8b/131iW/UHHxTqzBaFARRTEYujzOo0F4L5ZQXi5duY0VlTnIcoIeTlD6Rpek4Dg2KUlpPbp0TvBWVohnaZZlOU679LCelsHrnvpIAjkkANkAX/zVupPz6ei4VqX2shEIIcsKbkmUZXecu9LiAVpwXLulzj++7svFJnEcK8RzpRyvabBCUtsCar/cFmlTFdXNeoIhN4YEDEm6BXBT2ZE3Txyeq4xtlbOapVUFAhFFFv2qX+A4JeAXBJbEAYYCsDgFwIP47NYTm48vHNP6w2VhSzlWq0tAljugBlRR7RfcENVjBDm42TxJt7LxVEvtkaOfnfp7DKu12WmCDK1NO+RgJCKKiiJBVAuOJaEPGiInBVStOKDfsnNyQEbdkc9PjWEtXNpcVWCiaGQ5YItfafvrp0BhstmoCQBWkPv7VVl3Qr/H3/q5tq710J+jrSWHwg0+rynLZqPpQgJQlCii1yYZg2NVNRLxsMZUIY8UJH/ww+gPv56vqzs52ro65+sd4UZfVQGeBUkIK8RSLMmMGRZG/ihAcEP0xUhOTn20rlUQJf8zob7BEWsoaO853Yu0aqcJUIU8A5LuSUhOSNKDodVDe25E0r4ATaM50364towupBkGUrSgROPWL/NmvLYntj3cVO/zpqdkQEeOOUGLboGbYzbrBZufOFzrIh0Mz6Ajw/GMcMnY95c9uS91vRvbuaWpobHGVZABqLS0B5I0DTM2FYkCSfIal4YC7mstnz2Xd+hnj+d5Womfx4vStOdWv7JrHxpqE5q54lQcHT1jB2gSjIfUOAKALEBQpBW3QZIpKkSHDpWVXlD2z7U+sSRz1tr2VRv2xPZvCzc0+rwlJoIg4gg7nGEUXUUUhSAHyXAsBInF1XXnh/tX1GO157c/39W91xgrWgkL8qAj3jd4dNE0DaHNNlwkSTIQEiAl0VntqylbcF0vjFTaHp71bMea9bvfO7D9g+aGp301Vc70KYAgSW0fswzPOxyoniKKKCQgRINzsESaKaW4alF9tWty6Rc39OjBEDl1Rn7nC6vW7zlw4P1tYVQeqs9bkg4A9RAJ6aIilmEoCNE+gFRWTnY2Zin21vh8VbMnuluGRvX7s0syp+Yta1/98hu79sZO79y2tLmxUQddJRZLRhqYYgTHTaZE3fFVOe/HF3x/fY8eSZ/fnWXNW9bZvqJr4+59Bw/u3/FWuEmrEImIdJagOF3e6kWL6utrvCWJk9OEY1eHxra0Thq0TZtmz1/e8eLKrvXd334XO3P6m94tYW3M9fWNRpqba12WySmE4BblQNv4lr6ubjzTmvvU2s6OFSu7NnTv3hc7E0OD7n370y1bt36yaeFcfCIAzLwKT6WkBCK/3dJCK/FxiHls+nR7Xv7y9o41a159fWP3Oz09mzctfnJOqonMIiArCEiS/S2Rc0O3sfScC0HSZrXOtOfm5dpnTs18BJ+ImiwB0c+f21MpykpAbTs3MHRHFsrA2agkVMx73Ga1Mdop4HRHlJDTEhmB7sgyluPC2b6QX5YlWZYVJRBQI8cuDAzc9NDd/G/yL7ACKdQGuia/AAAAAElFTkSuQmCC" />'
				                            );
															
						    
						$('.window_footer').append(affButton.getMainDiv());
				            
				 
				 
				// 	$('.window_footer').css('text-align:right;')
														
					 
									//statWindow.getContentPane().append(table_window.getMainDiv());
//					 
				},
				createStarsTable : function() {
					$('.info', CemeteryWindow.DOM).text(
							'Les Stars de la bataille');

					Stats.table = new west.gui.Table(false).setId('battle_stat')
					Stats.table.createEmptyMessage('Battle Stars').addColumn(
							"battle_nam", {
								sortBy : 'name'
							}).addColumn("battle_tow", {
						sortBy : 'name'
					}).addColumn("stat_dtl", {
						sortBy : 'starthp'
					}).appendToThCell("head", "battle_nam", 'Titre',
							'Titre de star').appendToThCell("head",
							"battle_tow", 'Nom', 'Nom').appendToThCell("head",
							"stat_dtl", 'Détails', 'Détails');
					Stats.table.getCell("head", "stat_dtl").css({
						'width' : '60%',
						'text-align' : 'left'
					});
					$('#route', CemeteryWindow.DOM).remove();
					$('.cemetery-content', CemeteryWindow.DOM).append(
									'<div id="route" style="display:none">global</div>')
							.append(Stats.table.getMainDiv());
					
					$('.footer', CemeteryWindow.DOM).empty();
						var titleAtt = 'Total PV Attaque - Début : '
							+ Stats.original.startAttPV
							+ ' - Fin : '
							+ Stats.original.finishedAttPV
							+ ' - Total perte : '
							+ (Stats.original.startAttPV - Stats.original.finishedAttPV) +' - Moy PV : ' + Stats.original.moyatt.toFixed(2) 
							;
					var titleDef = 'Total PV Défense - Début : '
							+ Stats.original.startDefPV
							+ ' - Fin : '
							+ Stats.original.finishedDefPV
							+ ' - Total perte : '
							+ (Stats.original.startDefPV - Stats.original.finishedDefPV)  +' - Moy PV : ' + Stats.original.moydef.toFixed(2) 
							;
					$('.footer', CemeteryWindow.DOM).append(
							'<span title="' + titleAtt
									+ '" class="tw_red text_bold">' + titleAtt
									+ '</span>');
					$('.footer', CemeteryWindow.DOM).append(
							'<br><span title="' + titleDef
									+ '" class="tw_blue text_bold">' + titleDef
									+ '</span>');
 											
				 
					
		      $('.footer', CemeteryWindow.DOM).addClass('zone');
			  $('.cemetery-content', CemeteryWindow.DOM).addClass('zone');	
				},
				calculStars : function() {
					var attaquer = {};
					var defenseurs = {};
					Stats.results = [];
					Stats.original.countAtt=0;
					Stats.original.countDef=0;
					Stats.original.startDefPV = 0;
					Stats.original.finishedDefPV = 0;
					Stats.original.startAttPV = 0;
					Stats.original.finishedAttPV = 0;
					Stats.original.degAtt = 0;
					Stats.original.degDef = 0;
					Stats.original.moyatt = 0;
		            Stats.original.moydef = 0;
		            Stats.original.att={};
		            Stats.original.def={};
		            Stats.original.att.dodgecount= 0;
		            Stats.original.att.hitcount= 0;
		            Stats.original.att.maxdamage= 0;
		            Stats.original.att.avg_damage=0
		            Stats.original.att.misscount= 0;
		            Stats.original.att.takenhits= 0;
		            Stats.original.att.weaponmaxdmg= 0;
		            Stats.original.att.weaponmindmg= 0;
		            
		            Stats.original.def.dodgecount= 0;
		            Stats.original.def.hitcount= 0;
		            Stats.original.def.maxdamage= 0;
		            Stats.original.def.avg_damage=0
		            Stats.original.def.misscount= 0;
		            Stats.original.def.takenhits= 0;
		            Stats.original.def.weaponmaxdmg= 0;
		            Stats.original.def.weaponmindmg= 0;
                    
                     var countDef=0;
					$
							.each(
									CemeteryWindow.currentStats,
									function(ind, val) {
									if (val.battle_type == "attacker") {
										       Stats.original.startAttPV += val.starthp;
										       Stats.original.finishedAttPV += val.finishedhp;
											   Stats.original.degAtt += val.totalcauseddamage;
											    Stats.original.att.dodgecount+= val.dodgecount;
							                    Stats.original.att.hitcount+= val.hitcount;
							                    Stats.original.att.avg_damage+= val.avg_damage;
							                    Stats.original.att.maxdamage+= val.maxdamage;
							                    Stats.original.att.misscount+= val.misscount;
							                    Stats.original.att.takenhits+= val.takenhits;
							                    Stats.original.att.weaponmaxdmg+= val.weaponmaxdmg;
							                    Stats.original.att.weaponmindmg+= val.weaponmindmg;
											   
											   
											   
											   Stats.original.countAtt++;
										 }else{
										          Stats.original.startDefPV += val.starthp;
												Stats.original.finishedDefPV += val.finishedhp;
												Stats.original.degDef+=val.totalcauseddamage;
												Stats.original.countDef++;
											    Stats.original.def.dodgecount+= val.dodgecount;
							                    Stats.original.def.hitcount+= val.hitcount;
							                    Stats.original.def.avg_damage+= val.avg_damage;
							                    Stats.original.def.maxdamage+= val.maxdamage;
							                    Stats.original.def.misscount+= val.misscount;
							                    Stats.original.def.takenhits+= val.takenhits;
							                    Stats.original.def.weaponmaxdmg+= val.weaponmaxdmg;
							                    Stats.original.def.weaponmindmg+= val.weaponmindmg;
																							
												
										 }
										$
												.each(
														Stats.formules,
														function(indStac, calc) {

															val[calc.type] = calc
																	.getTaux(val);

															if (!calc.shouldBePos
																	|| (calc.shouldBePos && val[calc.type] > 0)) {

																if (val.battle_type == "attacker") {
																	

																	if (!isDefined(attaquer[calc.type])) {
																		attaquer[calc.type] = calc.limite;
																	}
																	if (eval(val[calc.type]
																			+ calc.compare
																			+ attaquer[calc.type])) {

																		attaquer[calc.type] = val[calc.type];

																		Stats.attaquants[calc.type] = {
																			'type' : calc.type,
																			'name' : val.name,
																			'obj' : val
																		};

																	}
																} else {
																	
																	if (!isDefined(defenseurs[calc.type])) {
																		defenseurs[calc.type] = calc.limite;
																	}

																	if (eval(val[calc.type]
																			+ calc.compare
																			+ defenseurs[calc.type])) {

																		defenseurs[calc.type] = val[calc.type];

																		Stats.defenseurs[calc.type] = {
																			'type' : calc.type,
																			'name' : val.name,
																			'obj' : val
																		};

																	}
																}

															}
														});

									});
									  
									Stats.original.moyatt =	Stats.original.startAttPV / Stats.original.countAtt;		
									Stats.original.moydef = Stats.original.startDefPV / Stats.original.countDef;
									Stats.original.degDef =	Stats.original.degDef / Stats.original.countAtt;		
									Stats.original.degAtt = Stats.original.degAtt / Stats.original.countDef;
									
									var fort = CemeteryWindow.fortId;
									
								 	
									Stats.results.push({titre : "Total PV Début\t\t\t",attack:Stats.original.startAttPV, defend:Stats.original.startDefPV});
									 
									Stats.results.push({titre : 'Total PV Fin\t\t\t',attack:Stats.original.finishedAttPV, defend:Stats.original.finishedDefPV});
									Stats.results.push({titre : 'Total perte\t\t\t',attack: (Stats.original.startAttPV - Stats.original.finishedAttPV) , defend:(Stats.original.startDefPV - Stats.original.finishedDefPV)});
									Stats.results.push({titre : 'Moyenne PV\t\t\t' ,attack: Stats.original.moyatt.toFixed(2) , defend:Stats.original.moydef.toFixed(2) });
								 
									Stats.results.push({titre : "Moyenne dégats\t\t\t" ,attack: (Stats.original.degAtt).toFixed(2) , defend:(Stats.original.degDef).toFixed(2)});
									Stats.results.push({titre : "Moyenne tirs evités\t\t",attack:	 (Stats.original.att.dodgecount / Stats.original.countAtt).toFixed(2), 
										defend:(Stats.original.def.dodgecount / Stats.original.countDef).toFixed(2)});
									Stats.results.push({titre : "Moyenne tirs réussis\t\t" ,attack:(Stats.original.att.hitcount / Stats.original.countAtt).toFixed(2),
										defend:(Stats.original.def.hitcount / Stats.original.countDef).toFixed(2)});
									Stats.results.push({titre : "Moyenne tir ratés\t\t" ,attack: (Stats.original.att.misscount / Stats.original.countAtt).toFixed(2),
										defend:(Stats.original.def.misscount / Stats.original.countDef).toFixed(2)});
									Stats.results.push({titre : "Moyenne tir recus\t\t" ,attack:(Stats.original.att.takenhits / Stats.original.countAtt).toFixed(2), 
										defend:(Stats.original.def.takenhits / Stats.original.countDef).toFixed(2)});
							    	Stats.results.push({titre : "Dommages moyen\t\t\t" ,attack:(Stats.original.att.avg_damage / Stats.original.countAtt).toFixed(2), 
									defend:	(Stats.original.def.avg_damage / Stats.original.countDef).toFixed(2)});
									Stats.results.push({titre : "Dommages max moyen\t\t" ,attack: (Stats.original.att.maxdamage / Stats.original.countAtt).toFixed(2), 
										defend:(Stats.original.def.maxdamage / Stats.original.countDef).toFixed(2)});
									Stats.results.push({titre : "Dommages arme min\t\t" ,attack:(Stats.original.att.weaponmindmg / Stats.original.countAtt).toFixed(2), 
										defend:(Stats.original.def.weaponmindmg / Stats.original.countDef).toFixed(2)});
									Stats.results.push({titre : "Dommage arme max\t\t" ,attack:(Stats.original.att.weaponmaxdmg / Stats.original.countAtt).toFixed(2) ,
										defend:(Stats.original.def.weaponmaxdmg / Stats.original.countDef).toFixed(2)});
				                 
				       
				 
				       
				       
				                    
				},
				 
				launch : function() {
					  
					Stats.interval = setInterval(function() {

						try {
							var loading = false;

							if (!isDefined(CemeteryWindow)) {
								loading = false;
							} else {
								loading = true;
							}
							if (loading) {
								clearInterval(Stats.interval);
								Stats.inject();

							}
						} catch (e) {
							console.log(e);
							clearInterval(Stats.interval);
							
						}
					}, 500);
				},
				inject : function() {
					Stats.init();
					CemeteryWindow.showStatInit = function(battle_id, data) {
						var newfunction = CemeteryWindow.showStatInit;
						return function(battle_id, data) {
							try {
								newfunction.bind(this)(battle_id, data);

								$(this.window.getMainDiv()).children().find(
										".TWTStatButton").remove();

								$(this.window.getMainDiv())
										.find('div.tw2gui_window_content_pane')
										.append(
												'<span onclick=\'Stats.vasy()\'  class="TWTStatButton"><img '
														+ 'style="'
														+ 'position:absolute;top:4px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;cursor:pointer;"'
														+ ' src="/images/icons/achv_points.png" /></span>');

							} catch (e) {
								console.log(e);
							}

						};

					}();
				},
				vasy : function() {
					var route = $('#route', CemeteryWindow.DOM);
					if (route.length == 0 || (route.text() != 'global')) {

						if (route.length == 0) {

							Stats.original = {};

							Stats.original["saveTitle"] = $('.info',
									CemeteryWindow.DOM).text();
							Stats.original["saveFoot"] = $('.footer',
									CemeteryWindow.DOM).html();
							$('#battle_stat', CemeteryWindow.DOM).attr('id',
									'battle_statOri');
							$('#battle_statOri', CemeteryWindow.DOM).css(
									'display', 'none');
							 
							Stats.calculStars();
							Stats.openWindow();
							 
						} else {
							if (route.text() == 'original') {

								$('#battle_stat', CemeteryWindow.DOM).attr(
										'id', 'battle_statOri');
								$('#battle_statOri', CemeteryWindow.DOM).css(
										'display', 'none');
								
									Stats.openWindow();

							} else {

								$('#battle_stat', CemeteryWindow.DOM).attr(
										'id', 'battle_statDetail');
								$('#battle_statDetail', CemeteryWindow.DOM)
										.remove();

							}
						}
						Stats.createStarsTable();

						$.each(Stats.defenseurs, function(ind, star) {
							Stats.getLigne(star, ind);
						});
						$.each(Stats.attaquants, function(ind, star) {
							Stats.getLigne(star, ind);
						});

					} else {
						route.text('original');

						$('.info', CemeteryWindow.DOM).text(
								Stats.original["saveTitle"]);
						$('.footer', CemeteryWindow.DOM).html( 
								Stats.original["saveFoot"]);
						$('#battle_stat', CemeteryWindow.DOM).attr('id',
								'battle_statStats');
						$('#battle_statStats', CemeteryWindow.DOM).remove();

						$('#battle_statOri', CemeteryWindow.DOM).attr('id',
								'battle_stat');
						$('#battle_stat', CemeteryWindow.DOM).css('display',
								'block');
					}
					 
					

				}
			};

		    Stats.addStyle();
			Stats.launch();

		});

    
    