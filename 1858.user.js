// ==UserScript==
// @name          Google Translate Video Links
// @namespace     Hans Schmucker (hansschmucker@gmail.com)
// @description	  Changes Links to Google Videos directly to the Flash Player Swf
// @include       http://video.google.*/*
// ==/UserScript==

function IsLinkPlayButton(linktobecheckednum){
	var linktobechecked=document.links[linktobecheckednum].href;
	var clickonlinktobechecked=document.links[linktobecheckednum].getAttribute("onclick");
		if( linktobechecked.match( /void/ ) && clickonlinktobechecked.match( /switchflash/ )  ){
			return 1;
		}else{
			return 0;
		}

}

function GeneratePlayerUrl(linktobecheckednum){
				var SourceJS=document.links[linktobecheckednum].getAttribute("onclick")
				var id=SourceJS.replace( /.*\%3Fid\%3D(\w*).*/, '$1' );
				var docid=SourceJS.replace( /.*docid\%3D(\w*).*/ , '$1' );
				var itag=SourceJS.replace( /.*itag\%3D(\w*).*/ , '$1' );
				var urlcreated=SourceJS.replace( /.*urlcreated\%3D(\w*).*/ , '$1' );
				var sigh=SourceJS.replace( /.*sigh\%3D(\w*).*/ , '$1' );
				return "http://video.google.com/googleplayer.swf?videoUrl=http%3A%2F%2Fvp.video.google.com%2Fvideoplayback%3Fid%3D"+id+"%26docid%3D"+docid+"%26itag%3D"+itag+"%26urlcreated%3D"+urlcreated+"%26sigh%3D"+sigh+"&autoPlay=true";

}

function GenerateFileUrl(linktobecheckednum){
				var SourceJS=document.links[linktobecheckednum].getAttribute("onclick")
				var id=SourceJS.replace( /.*\%3Fid\%3D(\w*).*/, '$1' );
				var docid=SourceJS.replace( /.*docid\%3D(\w*).*/ , '$1' );
				var itag=SourceJS.replace( /.*itag\%3D(\w*).*/ , '$1' );
				var urlcreated=SourceJS.replace( /.*urlcreated\%3D(\w*).*/ , '$1' );
				var sigh=SourceJS.replace( /.*sigh\%3D(\w*).*/ , '$1' );
				return "http://vp.video.google.com/videoplayback?id="+id+"&docid="+docid+"&itag="+itag+"&urlcreated="+urlcreated+"&sigh="+sigh;

}

function FindLink(StartNum,LinkName){
		for(i=(StartNum+1);i<document.links.length;i++){
			var curhref=document.links[i].href;
			if((curhref==LinkName)){
				return i;
			}
		}
		return -1;
}

function NextWithDocID(CurrentLinkNum,TypeOfLink){
	var inhref=document.links[CurrentLinkNum].href;
	var inonclick=document.links[CurrentLinkNum].getAttribute("onclick");
	var indocid=inonclick.replace( /.*docid\%3D(\w*).*/ , '$1' );
	for(i=(0);i<document.links.length;i++){
		var curhref=document.links[i].href;
		var curdocid=curhref.replace( /.*docid\=(\w*).*/ , '$1' );

		if((curdocid==indocid) && ( document.links[i].firstChild.nodeType!=TypeOfLink )){
			return i;
		}
	}
	return 0;
}


function main(){
	for(mi=0;mi<document.links.length;mi++){
		if( IsLinkPlayButton(mi) ){
			var NewUrl=GeneratePlayerUrl(mi);
			var TextLinkID=NextWithDocID(mi,3);

			document.links[TextLinkID].href=GenerateFileUrl(mi);

			document.links[mi].href=NewUrl;

			document.links[mi].setAttribute("onclick","");


		}
	}

	var NumOfVidAboutLink=FindLink(0,"http://video.google.com/video_about.html");
	if( NumOfVidAboutLink!= (-1) ){
		var AboutLinkParent=document.links[NumOfVidAboutLink].parentNode;

		var SWFLink=document.createElement("a");
			SWFLink.href="javascript:var PlayerURL='http://video.google.com/googleplayer.swf?videoUrl=';top.location=PlayerURL+document.getElementById('playfile').value;";

		var LinkFont=document.createElement("font");
			LinkFont.setAttribute("size","2");
			LinkFont.value="c:\examplefile.flv";
			LinkFont.setAttribute("face","Tahoma,Verdana,Arial");
			LinkFont.appendChild(document.createTextNode('Play Saved File'));

		SWFLink.appendChild(LinkFont);

		var SelectFileForm=document.createElement("form");
			SelectFileForm.setAttribute("enctype","multipart/form-data");
			SelectFileForm.setAttribute("action","");

		var SelectFileField=document.createElement("input");
			SelectFileField.setAttribute("maxlength","1024000000");
			SelectFileField.setAttribute("type","file");
			SelectFileField.setAttribute("size","50");
			SelectFileField.setAttribute("id","playfile");

		SelectFileForm.appendChild(SelectFileField);



		document.getElementsByTagName("body")[0].insertBefore(SelectFileForm, AboutLinkParent);
		document.getElementsByTagName("body")[0].insertBefore(SWFLink, AboutLinkParent);
		document.getElementsByTagName("body")[0].insertBefore(document.createElement("br"), AboutLinkParent);
	}

}

main();