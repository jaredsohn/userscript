// ==UserScript==
// @name           Display Feed Favicons
// @namespace      red.october
// @include        htt*://www.google.*/reader/view*

// @author red.october
// @description Displays site favicons for each feed inside Reader (incompatible with OS X skin)
// @homepage  http://userscripts.org/scripts/show/24371
// @enabledbydefault true
// ==/UserScript==

jQuery(document).ready(function() {
				jQuery('.image_picker').click(function() {
					jQuery('.image_picker').removeClass('picker_active');
					jQuery(this).addClass('picker_active');
				});
				jQuery('.cancel-edit').click(function() {
					jQuery.fancybox.close();
				});
				var areaSelection;
				jQuery('.save-text').click(function() {
					//console.log(jQuery(this).attr('id'));
					var newText = tinyMCE.activeEditor.save();
					jQuery('#view-' + jQuery(this).attr('id')).html(newText);
					jQuery('#textarea-' + jQuery(this).attr('id')).html(newText);
					jQuery.fancybox.close();
				});
				
				setTimeout(function() {
						jQuery.each(jQuery('.inline'), function() {
						var self = this;
						jQuery(this).fancybox({'scrolling':'no', 'autoDimensions':'false', 'padding': 0,
						onClosed: cancelSelection, 
						onCleanup : function() {
							if(jQuery('#fancybox-content div > div > textarea').length > 0)
							{
								tinyMCE.activeEditor.remove();
							}
						},
						onClosed: cancelSelection, 
						onComplete : function() {
								if(jQuery('#fancybox-content div > div > textarea').length > 0)
								{
									tinyMCE.init({
										height : "250",
										width : "775",
										mode : "exact",
										elements : jQuery('#fancybox-content div > div > textarea').attr('id'),
										theme : "simple"
									});
								}
							}
						});
						wrapHeight = jQuery(self).children("div:first").height()-40;
						wrapWidth  = jQuery(self).children("div:first").width();
                        console.log(wrapWidth + '-' + wrapHeight +  ': ' + jQuery(this).attr('id'));
						id = jQuery(self).children("div:first").attr('class');
						jQuery('#' + id).css('height', wrapHeight);
						jQuery('#' + id).css('width', wrapWidth);
					});
					
					/*jQuery('.button').live('click', function(){
                        console.log(jQuery(this).next('input')+'9');
                        jQuery(this).next('input').trigger('click');
                    });*/
					
					jQuery.each(jQuery('.button-file'),  function() {
                    
					wrapHeight = jQuery('#wraper-'+(jQuery(this).attr('id'))).height();
					wrapWidth = jQuery('#wraper-'+(jQuery(this).attr('id'))).width();

					jQuery.ajax_upload(this, {
						action : '/index.php?option=com_pressreleases&view=files&format=raw',
						dataType : "json",
						name : 'myfile',
						height: wrapHeight,
						width: wrapWidth,
						onSubmit : function(file, ext) {
							this.disable();
						},
						onComplete : function(file, response) {
							cancelSelection();
							// снова включаем кнопку
							this.enable();
							console.log(response);
                            if(response==0)
                            {
                                alert('such type not support');
                            }
                            else
                            {
                                if(response!='')
                                {
                                    var obj = jQuery.parseJSON(response);
                                    var id = jQuery(self).attr('id');
                                    console.log('id');
                                    console.log(id);
                                    jQuery('#wraper-'+ id).css('height', 'auto');
                                    var thumbnail_id = 'thumbnail_' + jQuery(this).attr('id');
                                    var image = jQuery('<img />')
                                        .attr({
                                            'id' : thumbnail_id,
                                            'src': '/' + obj.name
                                        });
                                    jQuery('#wraper-'+ id).html(image);
                                    //jQuery('#fancybox-wrap').css('width', obj.imageWidth);
                                    //jQuery('#fancybox-wrap').css('height', obj.height);
									//jQuery('#fancybox-outer').css('padding', 0);
                                    //jQuery('#fancybox-content').css('width', obj.imageWidth);
                                    //jQuery('#fancybox-content').css('width', obj.width);
                                    jQuery('#fancybox-content').css('height', obj.imageHeight+270);
                                    jQuery.fancybox.center();
                                    areaSelection = StartCrop(obj.wraperWidth, obj.wraperHeight, obj.width, obj.height, jQuery.fancybox, id);
                                }
                                else
                                {
                                    history.back(-1);
                                }
                            }
						}
					});
				});
				}, 600);

				function cancelSelection()
				{
					if(areaSelection)
					{
						areaSelection.cancelSelection();
					}
				}

				var position = ["top", "left", "right"];
                jQuery.each(position, function(i, id){
                    jQuery('#crop-'+id).live('click',function() {
                       // console.log("id =" + id);
                        var wraperWidth =  jQuery('#image-wraper-'+id).width();
                        var image = jQuery('#wraper-' + id + ' > img');
                        var src = jQuery(image).attr('src').substring(1, jQuery(image).attr('src').length);
                        var data ={
                            x1:						jQuery('#x1').val(),
                            y1:						jQuery('#y1').val(),
                            x2:						jQuery('#x2').val(),
                            y2:						jQuery('#y2').val(),
                            w:						jQuery('#w').val(),
                            h:						jQuery('#h').val(),
                            image:					src,
                            action:					'ResizeThumbnailImage',
                            _token:					jQuery('#token').val(),
                            width:					wraperWidth
                        };
                        data[jQuery('#token').val()] = '1';
                        jQuery.ajax({
                                type:       "post",
                                url:        "/index.php?option=com_pressreleases&view=files&format=raw",
                                data: data,
                                success:
                                    function(data)
                                    {
                                        var thumbImg = jQuery('<img />')
                                            .attr({
                                                'src': '/' + data + '?rand=' + Math.random()
                                            });
                                        jQuery('#image-wraper-' + id).html();
                                        jQuery('#image-wraper-' + id).html(thumbImg);
                                       // console.log('#image-wraper-' + id);
                                        jQuery('input[name="data_image_'+id+'"]').val(data);
                                        jQuery.fancybox.close();
                                    }
                        });
                    });
                });
			
			jQuery('.delete-image').click(function(){
                //jQuery(this).parent('.image-block').css('display', 'none')
                console.log(jQuery(this).parent('.image-block').children('a.inline').children('div').children('img').attr('src',
                                                            jQuery('input[name="default_'+jQuery(this).attr('id')+'"]').val()));
                //console.log(jQuery('input[name="default_'+jQuery(this).attr('id')+'"]').val());
                //console.log(jQuery(this).attr('id'));
                jQuery('input[name="'+jQuery(this).attr('id')+'"]').val('');
            });
		});

function StartCrop(wraperWidth, wraperHeight, imageWidth, imageHeight, fancybox, id)
{
//	jQuery('#image').val(jQuery(image).attr('src'));
	jQuery('#x1').val(0);
	jQuery('#y1').val(0);
	jQuery('#x2').val(wraperWidth);
	jQuery('#y2').val(wraperHeight);
	jQuery('#w').val(wraperWidth);
	jQuery('#h').val(wraperHeight);

	function preview(img, selection) {
		jQuery('#x1').val(selection.x1);
		jQuery('#y1').val(selection.y1);
		jQuery('#x2').val(selection.x2);
		jQuery('#y2').val(selection.y2);
		jQuery('#w').val(selection.width);
		jQuery('#h').val(selection.height);
	} 
	jQuery('.window').css('display', 'block');
	ias = jQuery('#thumbnail_'+ id).imgAreaSelect({ aspectRatio: wraperWidth + ':' + wraperHeight, onSelectChange: preview, x1: 0, y1: 0, x2: wraperWidth, y2: wraperHeight, instance: true}); 
	return ias;
}


function SetTeaser(image)
{
	jQuery('#image-teaser').val(image);
}

