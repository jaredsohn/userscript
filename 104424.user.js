// ==UserScript==
// @name           Dropbox Plus
// @version	   	   2.2
// @namespace      RJ
// @description    Add some improvements to Dropbox interface
// @include        https://www.dropbox.com/home*
// ==/UserScript==
// Written by Rafael Jafferali

function CreateTV(){
		// Create the treeview of the folders on the left of the screen
		TreeView.reset({
				onSuccess: function () {
					var MyTV = $("copy-move-treeview").cloneNode(true);
					MyTV.id = "MyTV";
					TreeView.tv["MyTV"] = TreeView.tv["copy-move-treeview"];
					MyTV.style.border = "0";
					MyTV.style.width = "240px";
					MyTV.style.height = (window.innerHeight - 330) + "px";
					MyTV.style.whiteSpace = "nowrap";
					MyTV.querySelector("#first-treeview-link").rel = "";
					MyTV.addEventListener("click", function() {
							// Timer required because it takes a few milliseconds to call the TreeView
							// function which highlights the folder on which it was clicked
							window.setTimeout(function() {
									var selectedFolder = $("MyTV").querySelector(".highlight .treeview-folder")
										|| $("MyTV").querySelector(".highlight #first-treeview-link");
									if (selectedFolder) {
										selectedFolder.parentNode.removeClassName("highlight");
										BrowseURL.set_path_url(null, selectedFolder.rel);
									}									
							}, 250);
					}, true);
					// Styling options
					$("outer-frame").style.width = "1060px";
					$("page-content").style.paddingLeft = "260px";
					// $("main-nav").querySelector("br").remove();
					// Create the tree
					$("page-sidebar").appendChild(MyTV);
				},
            	user: Browse.active_user
		});
}

// Wait for TreeView function to load in main page
function TestTV() {
    if (typeof TreeView != 'undefined') {
        CreateTV();
    }
    else {
        window.setTimeout(TestTV, 250);
    }
}

// === MAIN ===
TestTV();