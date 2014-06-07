(function (unsafeWindow) {
// ==UserScript==
// @name                                          Grooveshark ADS Remover
// @description                                   Remove ADS From Grooveshark
// @include                                       http://grooveshark.com/*
// @include                                       http://*.grooveshark.com/*
// @author                                        RamTech
// @version                                       1.3
// @license                                       Unknown
// ==/UserScript==
//

function removeAds()
{
                var Content = document.getElementById('content');
		var HomeAds = document.getElementById('capitalSidebar');
		var SearchTopAds = document.getElementById('searchCapitalWrapper_728');
		var SearchRightAds = document.getElementById('searchCapitalWrapper_300');
		var MyMusicAds = document.getElementById('musicCapitalWrapper_160');
		var MusicTopAds = document.getElementById('exploreCapitalWrapper_728');
		var MusicRightAds = document.getElementById('exploreCapitalWrapper_300');
		var CommunityRightAds = document.getElementById('commCapitalWrapper_300');
		var ArtistTopAds = document.getElementById('artistCapitalWrapper_728');
		var ArtistRightAds = document.getElementById('artistCapitalWrapper_300');
		
                if (Content != null && HomeAds != null) {
			Content.removeChild(HomeAds);
                }
				
				if(SearchTopAds != null){
				var parent = SearchTopAds.parentNode;
				parent.removeChild(SearchTopAds);
				}
				
				if(SearchRightAds != null){
				var Parent = SearchRightAds.parentNode;
				Parent.removeChild(SearchRightAds);
				}
				
				if(MyMusicAds != null){
				Parent = MyMusicAds.parentNode;
				ParentParent = Parent.parentNode;
				ParentParent.removeChild(Parent);
				}
				
				if(MusicTopAds != null){
				var Parent = MusicTopAds.parentNode;
				Parent.removeChild(MusicTopAds);
				}
				
				if(MusicRightAds != null){
				var Parent = MusicRightAds.parentNode;
				Parent.removeChild(MusicRightAds);
				}
				
				if(CommunityRightAds != null){
				var Parent = CommunityRightAds.parentNode;
				Parent.removeChild(CommunityRightAds);
				}

				if(ArtistTopAds != null){
				var Parent = ArtistTopAds.parentNode;
				Parent.removeChild(ArtistTopAds);
				}

				if(ArtistRightAds != null){
				var Parent = ArtistTopAds.ArtistRightAds;
				Parent.removeChild(ArtistRightAds);
				}
}
document.addEventListener('load', removeAds, true);
})(window);