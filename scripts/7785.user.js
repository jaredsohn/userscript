// ==UserScript==
// @name Charazay - Traducción de comentarios al español
// @description Traduce los comentarios de partidos de Charazay al español.
// @include http://www.charazay.com/index.php?act=match&*
// ==/UserScript==

var ingles=new Array(
					" wins the jump ball.",
					//Asistencias
					"The assist is credited to ",
					" gets credit for the assist.",
					" read the defense perfectly for the assist.",
					" made a tremendous pass for the assist.",
					"What a pass by ",
					", who gets the assist.",
					"Credit for the beautiful setup goes to ",
					"The shot was set up by ",
					" gets the assist on the nice pass.",
					"A perfect pass by ",
					" set up the score.",
					"Give the assist to ",
					"The assist goes to ",
					" records the assist.",
					//Rebotes
					" snags the rebound.",
					" fights off two others to secure the board.",
					"The ball is tipped out to ",
					" rebounds the ball with authority.",
					" rips down the missed shot.",
					" comes up with the missed shot.",
					" bulls his way inside for the rebound.",
					" grabs the rebound.",
					" rips down the rebound.",
					" winds up with rebound.",
					" overpowered his opponent for the rebound.",
					"The missed shot falls to ",
					"The rebound is corralled in by ",
					" grabs the long rebound.",
					" is a beast on the boards, snagging the missed shot.",
					" pulls down the board.",
					" pulls down the rebound.",
					"The rebound is snagged by ",
					" pulls down the missed shot.",
					" skies to pull in the rebound.",
					"The rebound falls into the hands of ",
					"The missed shot is rebounded by ",
					"The wayward shot is grabbed by ",
					" grabs the loose ball.",
					" grabs the missed shot.",
					" snags the board.",
					"The rebound is pulled in by ",
					//Perdidas de balon (no robos)
					"A horrible pass by ",
					", resulting in the turnover.The ball goes to ",
					", resulting in the turnover.Possession goes to ",
					", resulting in the turnover.",
					" tries to bounce the ball between the legs and loses it out of bounds.The ball goes to ",
					" tries to bounce the ball between the legs and loses it out of bounds.Possession goes to ",
					" tries to bounce the ball between the legs and loses it out of bounds.",
					"The ball goes out of bounds, off the foot of ",
					" throws the ball away.The ball goes to ",
					" throws the ball away.Possession goes to ",
					" throws the ball away.",
					" can't handle the pressure and loses the ball.The ball goes to ",
					" can't handle the pressure and loses the ball.Possession goes to ",
					" can't handle the pressure and loses the ball.",
					"Traveling is called on ",
					" mishandles the ball, turning the ball over.The ball goes to ",
					" mishandles the ball, turning the ball over.Possession goes to ",
					" mishandles the ball, turning the ball over.",
					" is called for traveling.The ball goes to ",
					" is called for traveling.Possession goes to ",
					" is called for traveling.",
					"The ball is thrown out of bounds by ",
					"Carrying the ball is called on ",
					" tries to make a move and steps out of bounds.The ball goes to ",
					" tries to make a move and steps out of bounds.Possession goes to ",
					" tries to make a move and steps out of bounds.",
					" is called for carrying the ball, turning the ball over.The ball goes to ",
					" is called for carrying the ball, turning the ball over.Possession goes to ",
					" is called for carrying the ball, turning the ball over.",
					" makes a careless pass that goes out of bounds.The ball goes to ",
					" makes a careless pass that goes out of bounds.Possession goes to ",
					" makes a careless pass that goes out of bounds.",
					" loses control of the ball.The ball goes to ",
					" loses control of the ball.Possession goes to ",
					" loses control of the ball.",
					"Suffocating defense by ",
					"Smothering defense by ",
					"Terrific defense by ",
					" results in a shot-clock violation.",
					"Overly unselfish play results in a shotclock violation for ",
					" pressures the offense into a shot-clock violation.",
					" looks lost on offense and is called for the shot-clock violation.",
					" cannot get a shot off in time, resulting in a shot-clock violation.",
					" lost sight of the shot clock and are called for the shot-clock violation.",
					//Cambios de posesion
					".The ball goes to ",
					"The ball goes to ",
					" takes control of the ball.",
					" gains possession.",
					".Possession goes to ",
					"Possession goes to ",
					" has the ball.",
					" goes on offense.",
					//Falta de tiro
					" gets called for the shooting foul.",
					" to shoot two free throws.",
					" to shoot three free throws.",
					" fouls the shooter.",
					"A shooting foul is called on ",
					" results in the shooting foul.",
					" tried to avoid contact but is called for the\nshooting foul.",
					" takes a foul to avoid giving up the easy shot.",
					" gets a piece of the shooter on the way up.",
					" gets caught fouling the shooter.",
					//Falta sin tiro
					" fouls the ball-handler.",
					"A foul is called on ",
					" tried to avoid contact but is called for the foul.",
					"Nothing but arm on that defensive effort, and ",
					"A poor defensive effort by ",
					" results in the foul.",
					" gets called for the foul.",
					" tries for the steal but is called for the foul.",
					" tries for the block but is called for the foul.",
					" is called for a non-shooting foul.",
					" gets caught fouling the player with the ball.",
					" is called for the foul.",
					"called for the foul.",
					//Falta en ataque
					" cleared out with his off hand for the offensive foul.",
					"An offensive foul is called on ",
					" is called for the offensive foul.",
					" charges into the defender for the offensive foul.",
					" gets called for an offensive foul.",
					" throws an elbow and is hit with an offensive foul.",
					//Pases (no asistencias)
					" passes to an open teammate.",
					" makes a pass to the open man.",
					" delivers the ball to a teammate.",
					" spots an open man and makes a pass.",
					"The ball is thrown by ",
					" to an open man.",
					" makes a pass.",
					" dishes to a teammate.",
					"A pass is made by ",
					" passes the ball.",
					"A nice pass is made by ",
					" hands the ball off.",
					"The ball is passed by ",
					" gets rid of the ball to a teammate.",
					" gives the ball up to a teammate.",
					//Mates con exito
					" powers his way inside for a two-handed jam. ",
					" drives in along the baseline and delivers a vicious two-handed reverse dunk. ",
					" soars high above the defense and jams it home with authority. ",
					" rolls into the paint and throws down a vicious two-handed dunk. ",
					" turns in mid-air and throws down a nasty 180 degree dunk. ",
					" throws down a two-handed dunk. ",
					" drives into the lane and throws down a powerful one-handed jam. ",
					" powers in for the reverse jam. ",
					" slams home a one-handed tomahawk dunk. ",
					" drives in along the baseline and delivers a two-handed reverse dunk. ",
					" slips into the lane and posterizes the opposing center with a vicious dunk. ",
					" loses the defender on the drive and finishes with a two-handed windmill slam. ",
					" crosses over the defender to get into the lane and slams one home. ",
					//Mates fallados
					" tries a two-handed dunk that rims out. ",
					" loses control of the ball and misses the dunk attempt. ",
					" blows the easy dunk.",
					//Mates taponados
					" throws the shot back in the face of ",
					" on the layup attempt.",
	 				//Tiros de 1 con exito
					" makes the first free throw. ",
					" makes the second free throw. ",
					" makes the third free throw. ",
					" makes first free throw. ",
					" makes second free throw. ",
					" makes third free throw. ",
					//Tiros de 1 fallados
					" misses the first free throw.",
					" misses the second free throw.",
					" misses the third free throw.",
					" misses first free throw.",
					" misses second free throw.",
					" misses third free throw.",
					//Tiros de 2 con exito
					" sinks the jumper from the top of key. ",
					" spins and drains a running one-hander from the left side. ",
					" spins and drains a running one-hander from the right side. ",
					" drains the short bank shot from the left angle. ",
					" shakes the defender on the crossover and nails the jump shot. ",
					" scores on the short runner in the lane. ",
					" gets past his defender and scores on a reverse layup. ",
					" slams the ball home. ",
					" knocks home a jumper from the left elbow. ",
					" knocks home a jumper from the right elbow. ",
					" connects on a long jumper from just inside the three-point line. ",
					" scores on a short jump shot from the left side. ",
					" scores on a short jump shot from the right side. ",
					" powers in for the layup. ",
					" loses his defender and drains the wide-open jump shot. ",
					" shakes his defender with a spin move and sinks the wide-open jumper. ",
					" drives the lane and hits the running jumper. ",
					" has plenty of room and nails the open jump shot. ",
					" spins and drains a running one-hander from the left side. ",
					" spins and drains a running one-hander from the right side. ",
					" is left wide open at the elbow and sinks the open jumper. ",
					" pulls up and sinks a long jump shot. ",
					" wheels his way inside for the layup. ",
					" hits the turnaround jumper. ",
					" drains the short bank shot from the left angle. ",
					" drains the short bank shot from the right angle. ",
					" is left wide open at the left angle and sinks the open jumper. ",
					" is left wide open at the right angle and sinks the open jumper. ",
					" shakes his defender and sinks the long jumper. ",
					" drains the wide-open jumper from the left side. ",
					" drains the wide-open jumper from the right side. ",
					" splits the defense and scores an easy layup. ",
					" knocks home a jumper from the left side. ",
					" knocks home a jumper from the right side. ",
					" shakes the defender on the crossover and drains the jumper. ",
					//Tiros de 2 fallados
					" is short on the shot attempt.",
					" is way off on the shot attempt.",
					" is left wide open at the left angle, but misses the shot badly.",
					" is left wide open at the right angle, but misses the shot badly. ",
					" misses the turnaround jumper.",
					" misses short on the shot attempt.",
					" can't convert the short jumper.",
					" misses long on the shot attempt.",
					" can't convert the long jumper.",
					" is all alone on the left side but can't make the open shot. ",
					" is all alone on the right side but can't make the open shot. ",
					" is long on the shot attempt.",
					" can't find the rim on a difficult shot attempt.",
					" somehow manages to miss the wide-open jumper from just inside the arc.",
					" tries a difficult shot in traffic and misses badly.",
					" somehow manages to miss the wide-open jumper from the free-throw line.",
					" is all alone underneath but can't make the layup.",
					" launches a fallaway jumper that is strongly contested and misses long.",
					" is forced into a difficult shot and isn't able to convert.",
					//Tiros de 2 taponados
					" tries a long jumper, but ",
					" blocks the shot with authority.",
					" tries the turnaround jumper, but ",
					" thought he was clear for the open jumper, but ",
					" timed the shot perfectly for the block.",
					" shoots from the left angle, but ",
					" shoots from the right angle, but ",
					" tips the shot.",
					" attempts to pull up for the jump shot, but ",
					" was wide open on the shot attempt, but takes too much time in releasing and ",
					" tries a short jumper, but ",
					" tries an open jumper, but ",
					" manages to tip the shot.",
					//Tiros de 3 con exito
					" is left open at the top of the key and sinks the three-pointer.",
					" sinks the jumper from the top of key. ",
					" spots up for the wide-open three-pointer that touches nothing but the bottom of the net. ",
					" is left open in the corner and sinks the three-pointer. ",
					" sinks a long three-point attempt. ",
					" shakes the defender on the crossover and drains the three-pointer. ",
					" steps out and drains the wide-open three-point attempt. ",
					" buries the three-point attempt from the left side. ",
					" buries the three-point attempt from the right side. ",
					" is left open on the left side and sinks the three-pointer. ",
					" is left open on the right side and sinks the three-pointer. ",
					" loses his defender with a drive fake and drains the three-point attempt. ",
					" spots up at the three-point line and nails the three ball. ",
					" steps out to the three-point line and drains the trey. ",
					" pulls up and sinks a long three ball from the top of the key. ",
					//Tiros de 3 fallados
					" is way off on a three-point attempt from the left side.",
					" steps out to the three-point line but misses the shot.",
					" spots up at the three-point line but can't find the distance on the three ball. ",
					" has an open three-pointer but misses badly.",
					" has too much time on the open three-pointer and can't convert.",
					" bricks the three-point attempt from the right side.",
					" launches an open three-point shot, but can't get it to go.",
					" misses a long three-point attempt.",
					" is left open on the right side and sinks the three-pointer.",
					" has defense draped all over him and misses an ill-advised three-point attempt.",
					//Tiros de 3 taponados
					" launches from the three-point line, but ",
					" swats the ball away.",
					" shoots a three-ball from the right side but ",
					" blocks the ball cleanly.",
					" steps out for the open three-pointer, but ",
					" attempts a three-pointer, but ",
					" tries a three-pointer from the top of the circle, but ",
					" has an open look at three-point line, but ",
					" somehow manages to tip the shot.",
					//Tiros desde el centro de la cancha con exito
					" tries a last second half-court long-shot and the ball hits the goal. ",
					//Tiros desde el centro de la cancha fallados
					" tries a last second half-court long-shot, but isn't even close.",
					//Lesiones ligeras
					" comes up holding his hand, but it doesn't look serious. ",
					" comes into the game.",
					//Lesiones medias
					" limps over to the sideline, and is replaced by ",
					" is holding his knee in pain. ",
					" comes in for him.",
					" is writhing in pain on the floor. ",
					" will replace him.",
					//Lesiones graves
					" is holding his ankle, and it looks serious. ",
					" comes in to replace him.",
					//5a falta
					" draws his fifth and final foul, and will be replaced by ",
					" has fouled out of the game. ", 
					" will come into the game.",
					" picks up his fifth foul. ",
					" will replace him in the lineup.",
					//Robos
					" strips ",
					" of the ball.",
					" takes the ball away from ",
					" steals the ball from ",
					"A beautiful steal is made by ",
					" turns the ball over to ",
					" swipes the ball away from ",
					" picks the ball away from ",
					" is stripped by ",
					"What a defensive play by ",
					" makes a steal on ",
					" is picked by ",
					" loses the ball to ",
					" has the ball stolen away by ",
					"The ball is stolen from ",
					"The ball is stolen cleanly from ",
					"The ball is stripped away from ",
					" rips the ball from the hands of ",
					" could have been called for the foul, but winds up with the steal on ",
					" on ",
					" by "
			 );



var espanol=new Array(
					" gana el salto inicial.",
					//Asistencias
					"La asistencia es mérito de ",
					" marcó el ritmo de la jugada y la culminó con una gran asistencia.",
					" leyó perfectamente la defensa para dar la asistencia.",
 					" hizo un tremendo pase para darle la asistencia.",
					"¡¡Qué magnífica asistencia le dio ",
					"!!. Hoy está inspirado.",
					"¡¡Extraordinaria asistencia!! Una más de las que acostumbra a hacer ",
					"Sensacional asistencia desde el poste alto de ",
					" amagó el tiro y asistió a su compañero.",
					"Con asistencias como ésta, anotar es muy fácil. ",
					" le regaló los dos puntos.",
					"El defensor estuvo muy lento, y facilitó la asistencia de ",
					"La asistencia se la anota ",
					" le dio la asistencia.",
					//Rebotes
					" captura el rebote.",
					" lucha entre dos contrarios para asegurar el rebote.",
					"El balón le cae a ",
					" captura el rebote con autoridad.",
					" agarra el tiro fallado.",
					" se hace con el tiro fallado.",
					" gana la posición y se hace con el rebote.",
					" agarra el rebote.",
					" entra al rebote con mucha fuerza, y lo captura sin dificultades.",
					" logra capturar el rebote, aunque casi pierde el equilibrio al hacerlo. La lucha bajo los aros es muy fuerte.",
					" consigue hacerse con el balón, superando a su rival.",
					"Rebote suelto que le acaba cayendo a ",
					"Entró al rebote con mucha determinación. No hay quien pare a ",
					" captura el rebote largo.",
					" es una auténtica bestia reboteando, y lo acaba de demostrar haciéndose con ese balón.",
					" gana en la lucha bajo el tablero por ese balón.",
					" gana la lucha por ese rebote.",
					"El rebote es para ",
					" capturó el rebote, cubriéndolo con los brazos para evitar que se lo robasen.",
					" vuela para capturar el rebote.",
					"El rebote cae en las manos de ",
					"¡¡Se lleva el rebote!! Qué gran salto de ",
					"El tiro no encuentra el aro y acaba en las manos de ",
					" rebotea, sacando los codos para intimidar al rival.",
					" se lleva el rebote.",
					" domina bajo el tablero. Es un reboteador nato.",
					"El rebote es capturado por ",
					//Perdidas de balon (no robos)
					"Un pase horrible de ",
					", provoca la pérdida del balón. La bola es para ",
					", provoca la pérdida del balón. Posesión para ",
					", provoca la pérdida del balón. ",
					" intenta pasarse el balón entre las piernas, y al final lo acaba perdiendo. La bola es para ",
					" intenta pasarse el balón entre las piernas, y al final lo acaba perdiendo. Posesión para ",
					" intenta pasarse el balón entre las piernas, y al final lo acaba perdiendo. ",
					"El balón sale fuera, tras golpear en el pie de ",
					" envía el balón directamente fuera. La bola es para ",
					" envía el balón directamente fuera. Posesión para ",
					" envía el balón directamente fuera. ",
					" no puede superar la presión y pierde el balón. La bola es para ",
					" no puede superar la presión y pierde el balón. Posesión para ",
					" no puede superar la presión y pierde el balón. ",
					"Pasos de ",
					" intenta un pase demasiado arriesgado, que se acaba perdiendo por la línea de fondo. La bola es para ",
					" intenta un pase demasiado arriesgado, que se acaba perdiendo por la línea de fondo. Posesión para ",
					" intenta un pase demasiado arriesgado, que se acaba perdiendo por la línea de fondo. ",
					" ha hecho pasos. La bola es para ",
					" ha hecho pasos. Posesión para ",
					" ha hecho pasos. ",
					"El balón se va fuera, tras escaparsele de las manos a ",
					"Dobles de ",
					" intenta fintar a su defensor, pero el balón se le escapa y se va fuera. La bola es para ",
					" intenta fintar a su defensor, pero el balón se le escapa y se va fuera. Posesión para ",
					" intenta fintar a su defensor, pero el balón se le escapa y se va fuera.",
					" comete dobles, perdiendo el balón. La bola es para ",
					" comete dobles, perdiendo el balón. Posesión para ",
					" comete dobles, perdiendo el balón.",
					" hace un pase cuidadoso, que sin embargo se va fuera. La bola es para ",
					" hace un pase cuidadoso, que sin embargo se va fuera. Posesión para ",
					" hace un pase cuidadoso, que sin embargo se va fuera.",
					" pierde el control del balón. La bola es para ",
					" pierde el control del balón. Posesión para ",
					" pierde el control del balón.",
					"La férrea defensa de ",
					"La asfixiante defensa de ",
					"La gran defensa de ",
					" provoca que al rival se le acabe la posesión.",
					"El desconcierto atacante hace que se le acabe el tiempo de posesión a ",
					" presionó muy bien en conjunto, provocando que al equipo rival se le acabe el tiempo de posesión.",
					" no encuentra opciones en ataque y se le acaba la posesión.",
					" no es capaz de encontrar un tiro claro, y se le acaba el tiempo de posesión.",
					" pierde de vista el reloj, y se le acaba la posesión sin tirar.",
					//Cambios de posesion
					". La bola es para ",
					"La bola es para ",
					" controla el balón",
					" recupera la posesión.",
					". La posesión es para ",
					"La posesión es para ",
					" tiene el balón.",
					" inicia el ataque.",
					//Falta de tiro
					" comete falta sobre el lanzador.",
					" lanzará dos tiros libres.",
					" lanzará tres tiros libres.",
					" ha hecho falta, habrá tiros libres.",
					"Estaba tirando, por lo que habrá tiros libres. La falta ha sido de ",
					" acaba en falta. Habrá tiros libres.",
					" intentó evitar el contacto, pero aún así le pitan falta. Tiros libres.",
					" hace falta para evitar un tiro fácil.",
					" le dio un manotazo al jugador que entraba a canasta. Eso es falta.",
					" ha hecho falta al jugador que estaba tirando, y los árbitros lo han visto.",
					//Falta sin tiro
					"  hace falta sobre el jugador que lleva el balón.",
					"Los árbitros pitan falta de ",
					" intentó evitar el contacto, pero aún así le pitan falta.",
					"Tocó en el brazo del contrario en su esfuerzo defensivo, y ",
					"Una mala defensa de ",
					" acaba en falta.",
					" salió tarde del bloqueo. Eso es falta.",
					" intenta robar el balón, pero le pitan falta.",
					" intenta el tapón, pero le pitan falta.",
					" ha hecho falta, pero no habrá tiros libres.",
					" ha sujetado del brazo al jugador que llevaba el balón. La falta no admite discusión.",
					" comete falta.",
					" comete falta.",
					//Falta en ataque
					" empujó con el brazo libre. Falta en ataque.",
					"Falta en ataque de ",
					" se movió en el bloqueo para empujar a su defensor, y por tanto es falta en ataque.",
					" choca contra su defensor y lo derriba. Es falta en ataque.",
					" comete falta en ataque.",
					" suelta el codo y golpea a un rival. Los árbitros lo han visto, y pitan falta en ataque.",
					//Pases (no asistencias)
					" pasa a un compañero desmarcado.",
					" hace un pase al hombre desmarcado.",
					" le envía el balón a un compañero.",
					" encuentra a un compañero solo y le pasa el balón.",
					"Pase picado de ",
					" hacia un compañero.",
					" pasa la bola.",
					" se la deja a un compañero.",
					"Pase de ",
					" pasa el balón.",
					"Buen pase de ",
					" saca el balón de la zona.",
					"El balón es pasado por ",
					" pasa el balón en cuanto lo recibe.",
					" finta el tiro y le pasa el balón a un compañero.",
					//Mates con exito
					" demuestra su poder con un mate a dos manos. ",
					" remonta la línea de fondo y mete un tremendo mate de espaldas!!! ",
					" salta más que la defensa y machaca con autoridad. ",
					" recibe en la pintura y machaca a dos manos sin oposición. ",
					" realiza una puerta atrás buscando el alley-hoop... ¡¡¡¡Sensacional!!!!. Llegó al pase de su compañero, la cogió en pleno vuelo y la hundió en el aro espectacularmente.  ",
					" se cuelga del aro a dos manos. ",
					" se va hasta la línea de fondo y mete un espectacular mate a una mano!!!. ",
					" machaca de espaldas. ¡¡Qué gran jugada!! ",
					" se cuelga del aro a una mano! ¡Vaya mate!. ",
					" penetra por el medio y machaca de espaldas a dos manos!! ",
					" se mete hasta la cocina y humilla al pívot rival con un mate tras gritarle ¡in your face! ",
					" deja atrás a su defensor y acaba la jugada con un mate a dos manos con giro de 360º. ",
					" atraviesa la defensa para llegar a la línea de fondo y machacar a dos manos. ",
					//Mates fallados
					" intenta un mate a dos manos que se sale de dentro!!! ",
					" pierde el control del balón y falla el intento de mate!!! ",
					" se confía, intenta hacerlo bonito, y lo único que consigue es fallar el mate. ¡El público no puede contener la risa!",
					//Mates taponados
					" le pone un tapón su cara a ",
					". ¡Vaya gorro!",
					//Tiros de 1 con exito
					" convierte el primer tiro libre. ",
					" convierte el segundo tiro libre. ",
					" convierte el tercer tiro libre. ",
					" encesta el primer tiro libre. ¡Un punto más para él! ",
					" encesta el segundo tiro libre. ¡Otro punto en su casillero! ",
					" encesta el tercer tiro libre. ¡Un punto más en su marcador! ",
					//Tiros de 1 fallados
					" falla el primer tiro libre.",
					" falla el segundo tiro libre.",
					" falla el tercer tiro libre.",
					" falla el primer tiro libre. Debería aprovechar los tiros libres.",
					" falla el segundo tiro libre. ¡Atentos al rebote!",
					" falla el tercer tiro libre. ¡Los pívots saltan a por el rebote!",
					//Tiros de 2 con exito
					" convierte el tiro en suspensión desde la zona. ",
					" gira y encesta el gancho desde la izquierda. ",
					" gira y encesta el gancho desde la derecha. ",
					" lanza a tablero desde el poste bajo y encesta. ",
					" recibe bajo canasta, finta al defensor y anota a aro pasado. ",
					" encesta el tiro de dos desde la línea de personal. ",
					" se va de su defensor y deja una bandeja para sumar dos puntos. ",
					" tira con suavidad y anota una bonita canasta. ",
					" se levanta desde el lado izquierdo y encesta de dos. ",
					" se levanta desde el lado derecho y encesta de dos. ",
					" lanza desde la línea de triple y anota. Sin embargo, estaba pisando la línea, con lo que la canasta es de dos puntos. ",
					" encesta un tiro fácil desde el lado izquierdo. ",
					" encesta un tiro fácil desde el lado derecho. ",
					" penetra y deja la bandeja. ¡Adentro! ",
					" finta a su defensor, lanza a tablero y encesta. ",
					" se da media vuelta, encara a su defensor y anota. ",
					" remonta la línea de fondo y anota ante la pasividad de los pívots rivales. ",
					" tiene espacio y no falla un tiro completamente solo. ",
					" gira y lanza en carrera con una sola mano desde la izquierda. ¡Dos puntos! ",
					" gira y lanza en carrera con una sola mano desde la derecha. ¡Dos puntos! ",
					" se queda solo en el 4,70 y no falla el tiro en suspensión. ",
					" se levanta y encesta un tiro lejano. ",
					" lanza un gancho que toca el aro pero acaba entrando. ",
					" encuentra el hueco para penetrar. ",
					" lanza a tablero desde el lado izquierdo y encesta. ",
					" lanza a tablero desde el lado derecho y encesta. ",
					" encuentra un buen ángulo de tiro en el lado izquierdo y encesta el tiro sin oposición. ",
					" encuentra un buen ángulo de tiro en el lado derecho y encesta el tiro sin oposición. ",
					" dribla a su defensor y encesta desde lejos. ",
					" clava el tiro abierto desde el lado izquierdo. ",
					" clava el tiro abierto desde el lado derecho. ",
					" parte la defensa en dos con un movimiento, y encesta una bandeja fácil. ",
					" encesta en suspensión desde el lado izquierdo. ",
					" encesta en suspensión desde el lado derecho. ",
					" deja al defensor en el bloqueo y anota el tiro en suspensión. ",
					//Tiros de 2 fallados
					" se queda corto en el tiro.",
					" falla el lanzamiento.",
					" estaba solo en el lado izquierdo, pero inexplicablemente falla el tiro.",
					" estaba solo en el lado derecho, pero inexplicablemente falla el tiro.",
					" falla el tiro a la media vuelta.",
					" intenta el tiro, pero se queda corto.",
					" no puede convertir un lanzamiento desde cerca.",
					" se pasa en el tiro.",
					" no consigue encestar el tiro lejano.",
					" está completamente solo en el lado izquierdo, pero falla ese tiro tan fácil. ",
					" está completamente solo en el lado derecho, pero falla ese tiro tan fácil. ",
					" tira, pero se pasa de largo.",
					" no encuentra el aro con un tiro difícil.",
					" tenía un tiro fácil desde un ángulo abierto, justo dentro de la línea de tres, pero falla.",
					" intenta un difícil tiro en carrera y falla.",
					" de alguna manera consigue fallar un tiro facilísimo desde la línea de personal.",
					" se queda solo bajo la canasta, pero es incapaz de encestar la bandeja.",
					" lanza una pedrada que sale despedida tras rebotar en el tablero.",
					" se ve obligado a tirar forzado, y no consigue encestar. ¡Era un tiro muy difícil!",
					//Tiros de 2 taponados
					" intenta un tiro lejano, pero ",
					" tapona el tiro con autoridad.",
					" intenta el tiro en suspensión, pero ",
					" se confía pensando que tiene un tiro fácil, pero ",
					" calcula el salto perfectamente para taponar el tiro.",
					" lanza desde el lado izquierdo, pero ",
					" lanza desde el lado derecho, pero ",
					" tapona el lanzamiento.",
					" se levanta e intenta el tiro, pero ",
					" se queda solo para tirar, pero tarda demasiado en ejecutar el lanzamiento y ",
					" intenta el tiro cerca del aro, pero ",
					" intenta un tiro solo, pero ",
					" consigue taponarlo.",
					//Tiros de 3 con exito
					" recibe desmarcado en la línea de tres y clava el triple! ",
					" lanza en suspensión desde la línea de 6,25 y encesta. ",
					" finta al defensor, se levanta y lanza un triple que entra limpio! ",
					" se queda solo en la esquina y encesta el triple. ",
					" encesta un triple desde más de 7 metros! ",
					" se queda solo tras el bloqueo y anota el triple sin oposición. ",
					" da un paso atrás, encuentra un buen ángulo y encesta de tres!. ",
					" clava el triple desde el lado izquierdo. ",
					" clava el triple desde el lado derecho. ",
					" se queda solo tras el bloqueo en el lado izquierdo, y no falla el tiro de tres. ",
					" se queda solo tras el bloqueo en el lado derecho, y no falla el tiro de tres. ",
					" amaga el pase para despistar a su defensor, intenta el triple y lo consigue!. ",
					" se cuadra en la línea de tres, se levanta y consigue el triple. ",
					" se para en la línea de tres, tira... ¡y suma tres puntos! ",
					" se levanta en una posición centrada desde casi ocho metros y convierte el triple. ",
					//Tiros de 3 fallados
					" busca el triple desde la esquina, pero no anota.",
					" da un paso atrás para lanzar de tres, pero falla el tiro.",
					" se levanta desde la línea de tres, pero no consigue acertar desde esa distancia. ",
					" tira el triple sin oposición, pero el balón no toca ni el aro.",
					" se lo piensa demasiado antes de tirar el triple, tira sin confianza y falla.",
					" sale del bloqueo y se levanta de tres, pero el balón da en el hierro.",
					" se queda solo y lanza de tres, pero no consigue encestar.",
					" lanza desde siete metros y falla. No ha hecho una buena selección de tiro.",
					" se queda solo tras un gran pase, pero estropea la jugada con un pésimo lanzamiento de tres.",
					" tenía varios defensas rodeándolo y falla el triple. Muy mala selección de tiro por su parte.",
					//Tiros de 3 taponados
					" lanza desde la línea de tres, pero ",
					" tapona el tiro.",
					" lanza de tres desde el lado derecho, pero ",
					" tapona el tiro limpiamente.",
					" da un paso atrás para tirar de tres, pero ",
					" intenta el triple, pero ",
					" intenta el triple desde una posición centrada, pero ",
					" tiene una posición clara para el triple, pero ",
					", de alguna manera, se las arregla para taponar el tiro.",
					//Tiros desde el centro de la cancha con exito
					" intenta un tiro de media cancha sobre la bocina, y consigue encestarlo. ",
					//Tiros desde el centro de la cancha fallados
					" intenta un tiro de media cancha sobre la bocina, pero ni siquiera se acerca al aro.",
					//Lesiones ligeras
					" se va doliéndose de la mano, aunque no parece grave. ",
					" entra en el partido en su lugar.",
					//Lesiones medias
					" se queda tumbado en la línea de fondo, y tendrá que ser sustituido por ",
					" se queja de su rodilla, parece dolerle mucho. ",
					" entra en cancha para sustituirle.",
					" se revuelve de dolor en el suelo. ",
					" entrará en su lugar.",
					//Lesiones graves
					" se lleva la mano al tobillo, parece una lesión grave. ",
					" entrará en la cancha en su lugar.",
					//5a falta
 					" comete su quinta y última falta, y será reemplazado por ",
					" queda eliminado por cinco faltas. ", 
					" entrará en su lugar.",
					" ha hecho la quinta falta. ",
					" lo reemplazará en el cinco.",
					//Robos
					" se anticipa muy bien a ",
					" para robarle el balón.",
					" presiona y acaba quitándole el balón a ",
					" le roba la bola a ",
					"Precioso robo de balón de ",
					" pierde el balón frente a ",
					" se anticipa y corta el pase de ",
					" se lleva el balón, aprovechándose del error de ",
					" no ha escondido bien el balón, y lo pierde. Recupera ",
					"Vaya jugada defensiva de ",
					" se la roba a ",
					" la pierde ante ",
					" duda, y eso es aprovechado para robarle el balón por ",
					" pierde el balón ante ",
					"Robo de balón a ",
					"Limpio robo de balón a ",
					"Balón robado a ",
					" agarra el balón de las manos de ",
					" está a punto de hacer falta, pero consigue quitársela a ",
					" sobre ",
					" por "
			 );

var inglesextra=new Array(
						  "That was an outstanding play!",
						  "The crowd goes wild after that great play.",
						  "Oh what a play!",
						  "That play has highlight reel written all over it.",
						  "That was a play people will talk about for a long time.",
						  "That was a superb play",
						  "That's one for the highlight reel!"
						  );
var espanolextra=new Array(
						   "¡Ésta ha sido una jugada extraordinaria!",
						   "La multitud enloquece tras esta gran jugada.",
						   "¡Qué jugadón tan increíble!",
						   "¡Mañana los periódicos pondrán en su portada esta jugada!",
						   "¡Ésa fue una jugada sobre la que la gente hablará durante mucho tiempo!",
						   "¡Qué jugada! Merece la pena pagar la entrada sólo por esto.",
						   "¡Ésta jugada saldrá en todos los resúmenes de la televisión!"
						   );

(function()
{
	//if (document.getElementsbyId('').firstChild.nodeValue=='')
	if (document.getElementById('text')!=null)
	{ //Partido en directo
		//paragraf=document.getElementById('text');
//    	var report = paragraf;
//		var numnodes=report.childNodes.length-1;

//    	for(var i=0;i<numnodes;i++)
//	    {
//			elem=report.childNodes[i];
//			if (elem.nodeName=='#text')
//				_Reemplazar(elem);
//		}
//		var midiv=document.getElementById('middle-column');
//		var scripts=midiv.getElementsByTagName('script');
//		var miscript=scripts[0];
	}
	else
	{	// Partido terminado
		// El primer cuarto está dentro de un <p>
		paragraf=document.getElementsByTagName('p');
    	var report = paragraf[4];
		var numnodes=report.childNodes.length-1;

    	for(var i=0;i<numnodes;i++)
	    {
			elem=report.childNodes[i];
			if (elem.nodeName=='#text' && elem.textContent.length>3)
				_Reemplazar(elem);
	    }

		// El resto, dentro de un <div>
		paragraf=document.getElementsByTagName('div');
    	var report = paragraf[8];
		var numnodes=report.childNodes.length-1;
    	for(var i=0;i<numnodes;i++)
	    {
			elem=report.childNodes[i];
			if (elem.nodeName=='#text' && elem.textContent.length>3)
				_Reemplazar(elem);
	    }
	}
	
	// Jugadas extraordinarias
	paragraf=document.getElementsByTagName('b');
	var numnodes=paragraf.length-1;
    for(var i=0;i<numnodes;i++)
    {
		elem=paragraf[i];
		_ReemplazarExtraordinarias(elem);
    }

})();

function _Reemplazar(elem)
{
	for (var i=0; i<ingles.length; i++)
	{
		if (elem.textContent.indexOf(ingles[i])!=-1)
		{
			obj=document.createTextNode(espanol[i]);
			elem.parentNode.insertBefore(obj, elem); 
	    	elem.parentNode.removeChild(elem); 
			break;
		}
	}
 }
 
function _ReemplazarExtraordinarias(elem)
{
	for (var i=0; i<inglesextra.length; i++)
	{
		if (elem.textContent.indexOf(inglesextra[i])!=-1)
		{
			obj=document.createElement('b');
			texto=document.createTextNode(espanolextra[i]);
			obj.appendChild(texto);
			elem.parentNode.insertBefore(obj, elem); 
	    	elem.parentNode.removeChild(elem); 
			break;
		}
	}
 }