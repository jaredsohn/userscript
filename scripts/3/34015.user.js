
// Vimeo Resize Video
//
// ==UserScript==
// @name          Vimeo Resize Video
// @include       http://vimeo.com/*
// @include       http://www.vimeo.com/*
// ==/UserScript==

function resizeVideo()
{
	everything = document.getElementById("everything");
	everything.style.width = "100%";
	
	// This is the code for the video page
	videolist = document.getElementsByClassName("video");
	if(videolist.length>0)
	{
		video=videolist[0];
		player = video.getElementsByClassName("player")[0];
		new_size_x = window.innerWidth-50;
		new_size_y = window.innerHeight < new_size_x*3/4 ? window.innerHeight : new_size_x*3/4;
		player.style.width =  new_size_x + "px";
		player.style.height = new_size_y + "px";		

		window.scrollTo(0,video.offsetTop);
		//window.scrollTo(0,player.getPosition().y);
	}

        // This is the code for the channel page
	//player = this.parentNode.parentNode.parentNode.getElementsByClassName("player")[0];
	player = this.parentNode.getElementsByClassName("player")[0];
	if(player)
	{
		new_size_x = window.innerWidth-50;
		new_size_y = window.innerHeight < new_size_x*3/4 ? window.innerHeight : new_size_x*3/4;
		player.style.width =  new_size_x + "px";
		player.style.height = new_size_y + "px";

		window.scrollTo(0,player.getPosition().y);	
	}

}

function createButton(target1, func1, title1, width1, height1, src1) 
{
    var img, button;
    img = document.createElement('img');
    img.width = width1;
    img.height = height1;
    img.style.borderTop = img.style.borderLeft = "1px solid #ccc";
    img.style.borderRight = img.style.borderBottom = "1px solid #888";
    img.style.marginRight = "2px";
    img.src = src1;
    button = document.createElement('a');
    button._target = target1;
    button.title = title1;
    //button.href = '#';
    //button.onclick = func1;
    button.addEventListener('click', func1, true);
    button.appendChild(img);
    return button;
}

function insertZoomButtonBefore(descs)
{
  var button;

  datazoomin = 'data:image/gif;base64,'+
	'R0lGODlhFAAUAOYAANPS1tva3uTj52NjY2JiY7KxtPf3%2BLOys6WkpmJiYvDw8fX19vb'+
	'296Wlpre3uEZFR%2B%2Fv8aqpq9va3a6tr6Kho%2Bjo6bKytZqZml5eYMLBxNra21JSU3'+
	'Jxc3RzdXl4emJhZOvq7KamppGQkr29vba2uGBgYdLR1dLS0lBPUVRTVYB%2Fgvj4%2BYK'+
	'Bg6SjptrZ3cPDxb69wG1tbsXFxsrJy29vccDAwfT09VJRU6uqrFlZW6moqo2Mj4yLjLKy'+
	's%2Fj4%2BK%2Busu7t783Nz3l4e19fX7u6vaalqNPS1MjHylZVV318ftfW2UhHSG9uccv'+
	'KzfHw8qqqrNPS1eXk5tvb3K%2BvsHNydeLi40pKS2JhY2hnalpZWlVVVtDQ0URDRJmZm5'+
	'mYm11dXp2cnm9vcFxcXaOjo0pJSsC%2FwuXk6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC'+
	'H5BAAAAAAALAAAAAAUABQAAAeagGaCg4SFhoeIiYqKTSQUFwgwi4JlB0pOCkEiRQKKRxM'+
	'gKwMGDFEqBYpPRj4GAwwLCkQsijwQBAQJCUNSW1mKSUALNiVVJzIvSIo7GRUaGzUOPTpC'+
	'igUeMyNTIWMHGC2KAl5hCBENYDlcWC7gOB1LDzRdWlZMAZOEJl83VPb3ggAfUnDo5w%2F'+
	'AFRQxJPj7J4aMhYWCoPyASFFRIAA7';


  datazoomout = 'data:image/gif;base64,'+
	'R0lGODlhFAAUAOYAANPS1uTj59va3vDw8bKxtGJiYrOys6Wkpvj4%2BPb29%2FX19mJiY'+
	'%2Ff3%2BKqqrLe3uLKytURDRFpZWqmoqllZW9va3aOjo6Kho4KBg729vWJhZK%2BuskZF'+
	'R4B%2FgsLBxHNydY2Mj%2Ff396amptLS0l9fX9fW2dDQ0W1tbpmZm8DAwfT09fHw8n18f'+
	'uLi49LR1V5eYOjo6VBPUa6tr769wEhHSNra20pJStPS1KuqrNPS1ZmYm%2B7t77Kys8rJ'+
	'y%2Fj4%2BaSjpm9uca%2BvsMjHyqalqHRzdVJRU8PDxVRTVcvKzc3Nz0pKS9rZ3evq7MC'+
	'%2FwsXFxp2cnnl4e1VVVu%2Fv8ba2uM7Oz29vcbu6vZqZmnJxc9vb3PHx8uXk5mhnamJh'+
	'Y1xcXZGQklZVV29vcHl4eoyLjKqpq6Wlpl1dXuXk6AAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
	'AAACH5BAAAAAAALAAAAAAUABQAAAeZgGaCg4SFhoeIiYqKR1IWVgcyi4JMBiQqA0heQgG'+
	'KQTFLPQgMCVocBIoNNqMgCQoDVReKYlELCwUFI1glEYorOgopWSwiTUVfih8dLzRTKA47'+
	'Ek%2BKBGE8GEAhFQYuPooBOWAHY2ROExBbSt83QzMbVCdQST8Ck4QtZUQe9faCABlGrvD'+
	'rB4ALDBMU%2BvnrUuOBQkE4NDycqCgQADs%3D';

  button = createButton(descs,resizeVideo,'Zoom',20,20,datazoomin);

  descs.parentNode.insertBefore(button, descs);
}

// There is a scrollbar made in flash which is over the video. remove it. 
scrolly=document.getElementsByClassName("video_stuff")[0];
if(scrolly) scrolly.parentNode.removeChild(scrolly);

// remove lefty, TODO move somewhere else
lefty = document.getElementById("lefty");
if(lefty) 
{
leftyparent = lefty.parentNode;
leftyparent.parentNode.removeChild(leftyparent);
}

// insert zoom button
desc = document.getElementById("description");
 if (desc) 
 {
 	insertZoomButtonBefore(desc);
 }

// For the channel page
// click on description to increase video size in channel view. 
//descs = document.getElementsByClassName("clip_description");
descs = document.getElementsByClassName("clip_details");
for (var i = 0; i < descs.length ; i++) 
{
	insertZoomButtonBefore(descs[i]);
}

// init page
resizeVideo();

