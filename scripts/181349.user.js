// ==UserScript==
// @name            TW-Collections - GR Translation
// @description     Ελληνική μετάφραση για το script -TW- Collections
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/181349*
// @version         1.0.2
// @grant       none 

// ==/UserScript==

(function(e){var t=document.createElement("script");t.type="application/javascript";t.textContent="("+e+")();";document.body.appendChild(t);t.parentNode.removeChild(t)})(function(){
if(window.location.href.indexOf(".the-west.")>0){ 
	
	TWT_ADDLANG = {
			translator : 'SfaGeaS 319',
			idscript : '181349',
			version : '1.0.2',
			short_name : 'gr',
			name : 'Ελληνικά',
			translation : {
				description : "<center><BR /><b>TW-Collections</b><br><b>Tips and reporting missing items collections <br>list of collection needed items<BR> Bank fees on mouseover <br> Various shortcuts"
					+ "<br>All reports deletion<br> Fees in bank <br> Additional buttons in inventory (duplicates,useables, recipes, sets) <br>etc ...</b>",
			Options : {
				tab : {
					setting : 'Ρυθμίσεις'
				},
				checkbox_text : {
					box : {
						title : 'Λειτουργίες / Μενού',
						options : {
							goHome : 'Κίνηση στην πόλη',
							goToDaily1 : 'Πόλη Φάντασμα',
							goToDaily2 : 'Το Ινδιάνικο χωριό του Waupee',
							ownSaloon : 'Άνοιξε σαλούν πόλης',
							openMarket : 'Άνοιξε την Αγορά',
							mobileTrader : 'Άνοιξε τον έμπορο',
							listNeeded : 'Αντικείμενα για σετ Συλλέκτη'
						}
					},
					collection : {
						title : 'Συλλογές',
						options : {
							patchsell : 'Σύμβολο για αντικείμενα που λείπουν στα Αποθέματα',
							patchtrader : 'Σύμβολο για αντικείμενα που λείπουν στον Έμπορο',
							patchmarket : 'Σύμβολο για αντικείμενα που λείπουν στην Αγορά',
							showmiss : 'Δείξε λίστα από τα αντικείμενα που λείπουν πάνω στο σύμβολο',
							filterMarket : 'Φίλτρο Αγοράς : Εμφάνισε μόνο τα αντικείμενα που σου λείπουν (συλλογές)'

						}
					},
					inventory : {
						title : 'Κουμπιά στα Αποθέματα',
						doublons : 'Επιπρόσθετα κουμπιά στα Αποθέματα (διπλά αντικείμενα, χρησιμοποιήσιμα, συνταγές, σετάκια)',
						options : {
							doublons : 'Πρόσθεσε κουμπί για αναζήτηση των διπλών αντικειμένων',
							useables : 'Πρόσθεσε κουμπί για αναζήτηση των χρησιμοποιήσιμων',
							recipe : 'Πρόσθεσε κουμπί για αναζήτηση των συνταγών',
							sets : 'Πρόσθεσε κουμπί για λίστα από τα Σετ',
							sum : 'Εμφάνισε το συνολικό κέρδος της τιμής πώλησης των αντικειμένων'

						}
					},
					miscellaneous : {
						title : 'Διάφορα',
						options : {
							lang : 'Γλώσσα',
							logout : 'Πρόσθεσε κουμπί Αποσύνδεσης',
							deleteAllReports : 'Πρόσθεσε επιλογή για διαγραφή όλων των αναφορών',
							showFees : 'Πρόσθεσε τραπεζικά έξοδα με το πέρασμα του ποντικιού'

						}
					},
					twdbadds : {
						title : 'Πρόσθετο του Clothcalc',
						options : {
							filterBuyMarket : 'Φίλτρο Αγοράς : Εμφάνισε μόνο τα αντικείμενα που σου λείπουν (tw-db add)'
						}
					}
				},
				message : {
					title : 'Πληροφορίες',
					message : 'Οι αλλαγές αποθηκεύτηκαν',
					reloadButton : 'Αναναίωση σελίδας',
					gameButton : 'Επιστροφή στο παιχνίδι',
					indispo : 'Ρύθμιση μη διαθέσιμη (Ολοκληρωμένες συλλογές ή το script δεν είναι διαθέσιμο)',
					more : 'More?',
					moreTip : 'Ανοίγει την σελίδα μεταφράσεων'
				},
				update : {
					title : 'Ενημέρωση του script',
					upddaily : 'Κάθε μέρα',
					updweek : 'Κάθε βδομάδα',
					updnever : 'Ποτέ',
					checknow : 'Έλεγχος για ενημερώσεις τώρα?',
					updok : "Το script του TW Collection Ενημερώθηκε",
					updlangmaj : 'Μια ενημέρωση είναι διαθέσιμη για μια ή περισσότερες γλώσσες του TW Collections script.<BR>Κάνε κλικ στους συνδέσμους παρακάτω για ενημέρωση.',
					updscript : 'Μια ενημέρωση είναι διαθέσιμη για το script TW Collections<br/>Ενημέρωση?',
					upderror : 'Αδύνατη η αναβάθμιση, πρέπει να εγκαταστήσεις το script ή την γλώσσα χειροκίνητα'
				},
				saveButton : 'Σώσε'

			},
			ToolBox : {
				title : 'Λειτουργίες',
				list : {
					openOptions : 'Ρυθμίσεις',
				    errorLog:"Σφάλμα κονσόλας"
				}
			},
			Doublons : {
				tip : 'Εμφάνιση μόνο διπλών αντικειμένων',
				tipuse : 'Εμφάνιση μόνο χρησιμοποιήσιμων',
				tiprecipe : 'Εμφάνιση μόνο συνταγών',
				tipsets : 'Εμφάνιση αντικειμένων από σετ',
				sellGain : '$ συνολική τιμή πώλησης'
			},
			Logout : {
				title : 'Αποσύνδεση'
			},
			AllReportsDelete : {
				button : 'Διαγραφή όλων',
				title : 'Διαγραφή όλων των αναφορών',
				work : 'Δουλειά',
				progress : 'Πρόοδος',
				userConfirm : 'Επιβεβαίωση',
				loadPage : 'Φόρτωμα σελίδας',
				deleteReports : 'Διαγραφή αναφορών',
				confirmText : 'Διαγραφή όλων - Είσαι σίγουρος;',
				deleteYes : 'Ναι, διαγραφή',
				deleteNo : 'Όχι, μην τις διαγράφεις',
				status : {
					title : 'Κατάσταση',
					wait : 'Αναμονή',
					successful : 'R&eacute;ussi',
					fail : 'Σφάλμα',
					error : 'Σφάλμα'
				}
			},
			fees : {
				tipText : '%1/% Έξοδα: $%2'

			},
			twdbadds : {
				buyFilterTip : 'Εμφανίζει μόνο τα αντικείμενα που λείπουν',
				buyFilterLabel : 'Ελλείποντα αντικείμενα'
			},
			collection : {
				miss : "Λείπουν: ",
				thText : '%1 ελλείποντα αντικείμενα',
				thEncours : 'Έχεις προσφορά γι\' αυτό το αντικείμενο',
				thFetch : 'Μπορείτε να ανακτήσετε αυτό το αντικείμενο στην αγορά της πόλης %1',
				allOpt : 'Όλα',
				collectionFilterTip : 'Εμφάνισε μόνο αντικείμενα για Συλλογή',
				collectionFilterLabel : 'Για συλλογή μόνο',
				select : 'Επιλογή >>',
				listText : 'Αντικείμενα για Συλλογή',
				patchsell : {
					title : "Αντικείμενα για Συλλογή",
					style : "position:relative;top:0px;left:0px;width:12px;height:12px;padding:0px;border:0px;margin:0px;",
					styleT : "position:absolute;top:4px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;"
				}
			}
		  },
			// DO NOT CHANGE BELOW THIS LINE
			init : function() {
				var that = this;
				if (typeof window.TWT == 'undefined' || window.TWT == null) {
					EventHandler.listen('twt.init', function() {
						TWT.addPatchLang(that);
						return EventHandler.ONE_TIME_EVENT; // Unique
					});
				} else {
					EventHandler.signal('twt_lang_started_' + that.short_name);
					TWT.addPatchLang(that);

				}
			}

		}.init();
	}	
});