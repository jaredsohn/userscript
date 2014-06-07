// ==UserScript==
// @name        TW-FriendsEvents
// @description   Add a easter button for filtering friends who wants hearts
// @include     http://*.the-west.*/game.php*
// @version     1.2
// @nocompat Chrome
// @grant       none
// ==/UserScript==
(function(e) {
	var t = document.createElement("script");
	t.type = "application/javascript";
	t.textContent = "(" + e + ")();";
	document.body.appendChild(t);
	t.parentNode.removeChild(t);
})
		(function() {
			if (/http:\/\/.+\.the-west\..*\/game\.php.*/
					.test(window.location.href)) {
                
                FriendsEvents = {
						interval :0,
						ready:false,
						create : function(){
					    	 try{
					    	WestUi.FriendsBar.friendsBarUi.inLine = function() {  
					    	    
					    	    WestUi.FriendsBar.friendsBarUi.changeEvents_('unlisten');
					            $('.filter_event').css({'opacity': '1'});
					            WestUi.FriendsBar.friendsBarUi.friendsBar.setFilter('easter',true);
					      
					        }; 
					    	WestUi.FriendsBar.friendsBarUi.friendsBar.filterTypes_.easter = function(player){
					    	    
					    	    if(player.name ===Character.name) return false;
					    	    
					    	           var term = this.activeFilters_['easter'];
					    	        
					    	          var ev = Game.sesData['Easter'];
					    	  
					    	         var   lastActivation = WestUi.FriendsBar.friendsBarUi.friendsBar.getEventActivation('Easter', player.player_id);
					    	         var   diff = lastActivation + parseInt(ev.friendsbar.cooldown, 10) - new ServerDate().getTime() / 1000;
					    	         return (diff < 0)  ;
					    	          
					    	} ;
					    	 var  img = $('<img class="fbar-event-img filter_event" '+
					    			 'src="/images/interface/friendsbar/events/Easter.png" />');
					    	 
					    	 var here = $('div.toggler-left');
					    	 here.append('<div />').before(img); 
					    	 img.click(function(e){
					    	     if(!isDefined(WestUi.FriendsBar.friendsBarUi.friendsBar.activeFilters_.easter)){
					    	            
					    	           WestUi.FriendsBar.friendsBarUi.inLine();
					    	     } else{ 
					    	          WestUi.FriendsBar.friendsBarUi.friendsBar.setFilter('easter',null); 
					    	          $('.filter_event').css({'opacity': '0.43'});
					    	          WestUi.FriendsBar.friendsBarUi.changeEvents_('listen');
					    	     }
					    	     }
					    	     
					    	 );    
					    	 img.css({'opacity': '0.43', 'cursor':'pointer'});
					    	 FriendsEvents.ready = true;
					     }
                             catch(e){
                            	 ErrorLog.log('Erreur de creation du button : ', e);
						}
						}
						
					}
			 
				
				try {
 
					var that = this;
					var timeout = 0;
					FriendsEvents.interval = setInterval(
							function() {

								var loading = false;

								if (isDefined(WestUi.FriendsBar.friendsBarUi) ){
									loading = true;
									 

								} else {
									
									 

								}
								if (loading) {
									clearInterval(FriendsEvents.interval);
									FriendsEvents.create();
									
								}

							}, 500);

				} catch (e) {
					ErrorLog.log("Erreur d'initialisation", e);
				 
					FriendsEvents.ready = false;
				}
				
				
                
            }
				
				
         
			});