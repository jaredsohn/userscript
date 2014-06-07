// ==UserScript==
// @name           Google Notebook for Small Screens
// @namespace
// @description    Maximize notebook area and toggle sidebar for netbooks
// @include        http://www.google.com/notebook/#*
// ==/UserScript==

// Change the button to a toggle button
window.setButton = function()
{
   // set up some vars
   sidebar = document.getElementById('gn0_5');
   sidebarHidden = false;
   toggleButton = document.getElementById('search_web_submit');
   notebook = document.getElementById('gn0_6');
   initWidth = notebook.style.width;
   notebkscroll = document.getElementById('gn3_0');
   initHeight = notebkscroll.style.height;

   // change search web button to sidebar toggle
   toggleButton.setAttribute('value', "Toggle Sidebar");
   toggleButton.setAttribute('onclick', '');
}
window.addEventListener('load', window.setButton, true);


// function to toggle the sidebar and notebook size
window.toggleSidebar = function(e)
{
   if (e.target.id == "search_web_submit")
   {
      // Toggle display state of sidebar div and notebook width
      if (sidebar) sidebar.style.display = (sidebarHidden ? '' : 'none');
      if (notebook) notebook.style.width = (sidebarHidden ? initWidth : '900px');
      if (notebkscroll) notebkscroll.style.height = (sidebarHidden ? initHeight : '330px');
      sidebarHidden = !sidebarHidden;
   }
}
window.addEventListener("click", window.toggleSidebar, true);