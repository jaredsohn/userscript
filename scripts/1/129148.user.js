// ==UserScript==
// @name           OLX Paginator
// @namespace      http://userscripts.org/users/442183
// @description    Auto Load Paginator for olx.com
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
// @include        http://*.olx.com.*/*
// @include        http://*.olx.com/*
// ==/UserScript==

(function($){
	var instances = [];

	//Load product images
	function replaceDelayedSrc($list){
		$list.find('img').each(function(){
			if($(this).attr('delayedsrc')=='') return;
			$(this).attr('src', $(this).attr('delayedsrc'));
			$(this).removeAttr('delayedsrc');
		});
	}

	$.fn.paginator = function(conf){
		// already constructed --> return API
		var elem = this.data("paginator");
		if (elem){return elem;}

		//Creates an object for each element and adds them to instances and data
		this.each(function(){
			elem = new Paginator($(this), conf);
			instances.push(elem);
			$(this).data("paginator", elem);
		});
		return elem; 
	}

	function Paginator($list, conf){
		//Private vars
		var $this = this;       								// the main list
		    $this.loading = false; 								// prevent from loadding many times the same content
			$this.paginator = $(conf.paginator);  				// the jquery paginator
			$this.autoCounter = conf.autoCounter;		 		// loads only 'count' pages automaticallythe jquery paginator
			$this.nextLink = "";								// next page link

		//Constructor
		var create = function(){
			$this.nextLink = getNextLink($this.paginator);			// get next page link

			//hide links and put the MORE button
			var $nextButton = $("<a href='' class='next'>More</a>");
			$nextButton.bind('click',function(){
				$this.loadMoreItems();
				return false;
			});
			$this.paginator.find('.i3').html($nextButton);

			//Attach a handler for scrolling to the bottom
			$(window).scroll(function() {

			   if(!$this.loading && $this.autoCounter > 0 && $(window).scrollTop()  > $(document).height() - $(window).height() - 800) {
					$this.autoCounter--;
					$this.loadMoreItems();
			   }
			});

			//Atach a handler for loading/loaded event
			//TODO: attach a animation loading....
			$list.bind('loading', function(){
				$this.loading = true;
			});
			$list.bind('loaded', function(){
				$this.loading = false;
			});
		}

		//Private function that extract the next link					
		var getNextLink = function($obj){
			//get next link		
			var next = $obj.find('a.next');
			if (next)
				return next.attr('href');
			else
				return false;
		}

		//API methods
		$.extend($this, {
			loadMoreItems: function(){		
				//no more pages
				if (!$this.nextLink) return;

				//indicates is loadding
				$list.trigger('loading');

				if($this.paginator.length!=0){
					$.ajax({
						url: $this.nextLink, 
						dataType: 'html'
					}).success(function(html, status){

						//indicates is loaded
						$list.trigger('loaded');
	
						//get new items	
						var $response = $(html).find('#'+$list[0].id);
				
						//replace the src of the new images
						replaceDelayedSrc($response);

						//append to the list
						//TODO: update google Ads based on the response
						//TODO: update the items showed autoCounter
						$list.append($response.html());

						//update next link		
						$this.nextLink = getNextLink($(html).find('#' + $this.paginator[0].id));
						//remove paginator if there's not more pages to show
						if(!$this.nextLink) $this.paginator.remove();
						
					});
				}
			}
		});
		
		//Run the constructor
		create();
	}
})(jQuery);

//creates an auto-paginator out of the list and the paginator
$('#the-list').paginator({paginator: '#paginator', autoCounter: 1});

//you can call this
//   $('#the-list').data("paginator").loadMoreImages()



