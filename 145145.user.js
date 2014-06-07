// ==UserScript==
// @name        vk.com audio download
// @namespace   vk.com
// @description Place download link to audio files on vk.com/audio
// @include     http://vk.com/audio*
// @include     https://vk.com/audio*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.8
// ==/UserScript==

//Download button for use in further version
const savePicBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41Ljg3O4BdAAAAZ0lEQVQ4T2OIr537HxkfO3bsPz4MU+sXX/CfAQTQDfiPBcjKSv8HYRBAVg82hBIDQHrpYwCyr9BdjOECdAWE+MPJAGzxj0sMOVzgYUA1A2CpDplGN5z+LkDOC7D8AKOpFwaEUhwueQC7L+Hzo7kEIwAAAABJRU5ErkJggg==";

const dwnLinkContainerClass = "vk_download_link_container";
const dwnLinkElementAClass = "vk_download_link_audio";
const dwnLinkText = "[DL]";

function appendAudioDownloadLinks()
{
	var mp3ContainersCollection=document.getElementsByClassName("audio  fl_l");
	//alert(mp3ContainersCollection.length);
	for (var i=0; i<mp3ContainersCollection.length; i++)
	{
		//Global DIV block containing all information about one audio file
		var current_block = mp3ContainersCollection[i];
		
		//Get raw id of the audio file
		var mp3id_raw = current_block.getAttribute("id",0);
		//Remove substring "audio" from id
		var mp3id = mp3id_raw.replace(/audio/g, "");
		
		//Get tag with link to mp3 file
		var mp3link_container = current_block.getElementsByTagName("input");
		//Get raw link to mp3 file with additional symbols after ".mp3"
		var mp3link_raw = mp3link_container[0].getAttribute("value");
		//Remove symbols after ".mp3"
		var mp3link = mp3link_raw.replace(/\,[0-9]+$/g, "");
		
		//For Debug
		//if (i==0) { alert(mp3link); };
		
		//Node with titleWrapper
		var titleWrapper;
		//Collection to store results of <div class="title_wrap fl_l"...>
		var titleWrappersCollection = current_block.getElementsByClassName("title_wrap fl_l");
		for (var j=0; j<titleWrappersCollection.length; j++)
		{
			if ( titleWrappersCollection[j].className == "title_wrap fl_l" ) { titleWrapper = titleWrappersCollection[j]; };
		}
			
		//This flag is defined true if download link has been already appended
		var downloadLinkExists = false;
		//Check for inner <a> tags
		var innerDownloadLinkContainers = titleWrapper.getElementsByTagName("span");
		for (var k=0; k<innerDownloadLinkContainers.length; k++)
		{
			if (innerDownloadLinkContainers[k].getAttribute("class") == dwnLinkContainerClass) { downloadLinkExists = true; }
		}
		
		var titleWrapperFirstChild = titleWrapper.firstChild;
		
		//If download link is not present append it
		if ( !downloadLinkExists )
		{		
			//Download link container (<span> block)
			var mp3downloadLinkContainer = document.createElement("span");
			mp3downloadLinkContainer.setAttribute("class",dwnLinkContainerClass);
			mp3downloadLinkContainer.setAttribute("text-align","center");			
			
			//Node <a> with link to download
			var tagAMp3downloadLink = document.createElement("a");
			tagAMp3downloadLink.setAttribute("href",mp3link);
			tagAMp3downloadLink.setAttribute("class",dwnLinkElementAClass);
			
			//Do not start playing after clicking on download link (sometimes work, sometimes doesn't)
			tagAMp3downloadLink.setAttribute("onclick","none");
			//Text of node <a>
			tagAMp3downloadLink.appendChild( document.createTextNode(dwnLinkText) );

			mp3downloadLinkContainer.appendChild(tagAMp3downloadLink);
			
			//Add some space to delimmit download link and artist name
			mp3downloadLinkContainer.appendChild( document.createTextNode(" ") );
			
			titleWrapper.insertBefore(mp3downloadLinkContainer, titleWrapperFirstChild );
			
			//For Debug
			//if (i==0) { alert(titleWrapper.innerHTML); };
		};
		
    };
};

appendAudioDownloadLinks();

//For Debug
//alert("SCRIPT IS RUNNING!");

window.addEventListener('scroll', appendAudioDownloadLinks, false);
window.addEventListener('keyup', appendAudioDownloadLinks ,false);