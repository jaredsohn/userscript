// ==UserScript==
// @name           FlickrBackgroundTagDelete
// @namespace      vispillo
// @include        http://www.flickr.com/photos/*/alltags/
// @include        http://www.flickr.com/photos/*/alltags
// @require        http://userscripts.org/scripts/source/78952.user.js
// ==/UserScript==

var spinner = 'data:image/gif;base64,R0lGODlhEAAIAMQTAGI9rp0mnsIYlD1LuI8ronA4qsJiuOhUrmKI0oh5yHCo4P9wuv%2FC4sLa8v9is2Kf3f8AhABjyP%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJCgATACwAAAAAEAAIAAAFJqAkjozjMGOaLlALLWrKuC4aSw7dOjeuQ7zbTGe7sVywnqh0ioUAACH5BAkKABMALAAAAAAQAAgAAAUuoCSKzZMcDjOuohIRUAwtLBkNsqyyTxTkMUet9wMKWY0bELJjuWAyWo1kQjVFIQAh%2BQQJCgATACwAAAAAEAAIAAAFM6AkSs3zNIzjMGOrRDABzdDSknA00DQ7PrkAb%2BZoAWHCYXHUyO2GvtErxrPdSCaUKioJAQAh%2BQQJCgATACwAAAAAEAAIAAAFN6AkNs%2FTiIzjMGKrRHCkLFANLW0Tw4Nts5LHLhLw1Rwi4a5oREp0u54RKHnFZj5c61k6SVKrVggAIfkECRQAEwAsAAAAABAACAAABTmgJDXP04gi4zgMqkRwpIgLZEPLGMcNc9%2BMxw72cPxsDuGweIQ4GsNIr9l6xWaS2i0nIplQEhVLFAIAIfkECQoAEwAsAAAAABAACAAABTegJDbP04iM4zBiq0RwpCxQDS1tE8eCXbOSxw4G8EEcIuGw6ENKdMOeDyh5xWY%2BXOtZOklSq1YIACH5BAkKABMALAAAAAAQAAgAAAU0oCRKzfM0jOMwY6tEcFRA9NKScSzQEDs%2BORiA52gBg0NacdQIRnY03%2BgVm9VuotIptWqFAAAh%2BQQJCgATACwAAAAAEAAIAAAFLqAkis2DGA4zrqISvVEBLSwJwwKkss%2F9AhBHrecDClkNXyS3Y7lgMlqNZEI1RSEAIfkECQoAEwAsAAAAABAACAAABSagJI7N8zRjmipRGylq2rguGksP3T43rke820xnu7FcsJ6odIqFAAAh%2BQQJCgATACwAAAAAEAAIAAAFLqAkioxjIE8zruICFVEcKSwJCbKssg4E5LFHrfcDClmMGzCyY7lgMlqNZEI1RSEAIfkECQoAEwAsAAAAABAACAAABTOgJEqM4zDN8zRju0BwEc2R0pIwJNA0Ozo5AG%2F2aAFhwmFxxMjthr7RK8az3UgmlCoqCQEAIfkECQoAEwAsAAAAABAACAAABTegJDKOw4jN8zRiu0AwtChRHSktE8OCbbMSxw4C8NUeIuGuaERKdLueESh5xWY%2BXOtZOklSq1YIACH5BAkUABMALAAAAAAQAAgAAAU5oCQxjsOIYvM8DbpAMLSISmRHyhjHTHPfDccO5nj8bA%2FhsHiMPBhDSK%2FZesVmktotJyKZUBIVSxQCACH5BAkKABMALAAAAAAQAAgAAAU3oCQyjsOIzfM0YrtAMLQoUR0pLRPHg12zEscOFvBFHiLhsOhDSnTDng8oecVmPlzrWTpJUqtWCAAh%2BQQJCgATACwAAAAAEAAIAAAFNKAkSozjMM3zNGO7QDBERLTSknE80BE7OjlYgPdoAYNDWnHECEJ2NN%2FoFZvVbqLSKbVqhQAAIfkECQoAEwAsAAAAABAACAAABS6gJIqMcyRPM67iAr0QESksCcNDpLLO%2FQaRR63nAwpZDB8kt2O5YDJajWRCNUUhADs%3D'


$('table.AllTagList tr').each(function(i,data) { 
  $(data).find('td:last a').click(function(e) {
    e.preventDefault();
    var tag = e.target.href.split('/')[6];
    var link = e.target.href;
    if (confirm("Are you sure you want to delete all occurrences of the tag \""+tag+"\"?")) {
      $(e.target).html('<img src="'+spinner+'" />');
      $.post(link,{'confirm':'true','old_tag':tag,'Submit':'DELETE'},function ( data ) {
        $(e.target).parent().parent().slideUp();
      });
    }
  });
});
