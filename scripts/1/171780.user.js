// ==UserScript==
// @name       Read post FEDS
// @namespace  http://decor-d.com/
// @version    0.3
// @description  Small script that enable you see which posts to already read 
// @match      http://www.facebook.com/groups/FEDS.IL/
// @copyright  2013+, Oren Roth
// ==/UserScript==


var markRead = {
	el:{
		stories   	: document.getElementsByClassName('uiStreamStory'),
		storyStream : document.getElementById('group_mall_162799240418674'),
		btns 		: document.getElementsByClassName('markBtn')
	},
	readOpacity: 0.4,
	//we use only with 70 last stories, no need for more
	stories: JSON.parse( localStorage["stories"] || '[]' ).slice(-70),
	init: function(){
        //we add min height for the stories ul in order that it doesn't load more stories for nothing
        if(markRead.stories.length >= 12)
			markRead.el.storyStream.style['min-height'] = window.innerHeight * 4 +'px'
		
        //add click (and right-click) Listener for all the stories 
        markRead.el.storyStream.onclick = markRead.markStoryRead;
        markRead.el.storyStream.oncontextmenu = markRead.markStoryRead;
        
        //listen to load more stories
        markRead.el.storyStream.addEventListener('DOMSubtreeModified',function(e){
	        if(e.target == markRead.el.storyStream){
	         	markRead.hideReadStories();
	        }
        });

		//add the css rules for making the magic
		document.styleSheets[ document.styleSheets.length - 1 ].addRule('li.readStory','opacity:0.4;max-height: 100px !important;overflow: hidden;-webkit-transition: 1s;  transition-delay: 300ms;');
		document.styleSheets[ document.styleSheets.length - 1 ].addRule('li.readStory:hover','opacity:1;max-height:2000px !important;');


		markRead.hideReadStories();
	},
    markStoryRead: function(e){
		var clickEl = e.target;
		var story = markRead.findParentStory( e.target );
		//only if the user click on storyLI and it's already marked as read
		if(story && !story.className.match(/\breadStory\b/)){
			story.onmouseout = function(){
				this.className += ' readStory';
			}
        	//add max height in order to make the animation smooth 
        	story.style['max-height'] = '2000px';
			markRead.addToReadStories(story.id);	
		}
	},
	findParentStory: function(clickEl){
		while(!clickEl.className.match(/\buiStream\b/)){
			if( clickEl.className.match(/\buiStreamStory\b/) ){
				return clickEl;
			}
			else
			  clickEl = clickEl.parentElement;
		}
		return false;
	},
	hideReadStories: function(){
		for( i=0; i < markRead.stories.length; i++ )
		{
            try{
			document.getElementById(markRead.stories[i]).className += ' readStory';
            }
            catch(e){
            }
		}
	},
	addToReadStories: function(newStoryId){

		//save to local storage
		markRead.stories.push(newStoryId);
		localStorage["stories"] = JSON.stringify(markRead.stories);
	}
}
markRead.init();
