$( window ).load(function() {

	if($('body').data('subscribe')) {		$("#sub_1").prop("checked", true);	} 
	else {		$("#sub_2").prop("checked", true);	}
	
	//$('#timezone option[value='+$('body').data('timezone')+']').attr('selected','selected');
	// set user's address data	
	$("div.inputGroupContainer select").val($('body').data('timezone'));
	$("div.countryGroupContainer select").val($('body').data('countryid'));	

	// Set City Data
	$("#city").append('<option value="'+$('body').data('cityid')+'"  selected>' + $('body').data('cityname') +'</option>' );
	//var id = $('body').data('cityid');
	//$('#city').val(id).click();
	//	$('#state').val('1').change();
	//$('#city').trigger("change");
 
    
	$("#state").append('<option value="'+$('body').data('stateid')+'" selected>' + $('body').data('statename') +'</option>' );
		
}); //end window load function

$(document).ready(function() {
  
	$('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            firstName: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
            lastName: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please supply a vaild phone number with area code'
                    }
                }
            },
            address: {
                validators: {
                    stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please supply your street address'
                    }
                }
            },
            city: {
                validators: {
                    stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply your city'
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: 'Please select your state'
                    }
                }
            },
            country: {
                validators: {
                    notEmpty: {
                        message: 'Please select your country'
                    }
                }
            },
            jobTitle: {
                validators: {
                    notEmpty: {
                        message: 'Please select your job title'
                    }
                }
            },
            
            zipCode: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                    zipCode: {
                        country: 'US',
                        message: 'Please supply a vaild zip code'
                    }
                }
            },
            aboutMe: {
                validators: {
                    stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please add about your self'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
            $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
    $('a[href="#profile"]').click(function () {
        $('.common-search').fadeOut();
    });
    $('.nav-tabs.row li:nth-child(-n + 4)').click(function () {
        $('.common-search').fadeIn();
    });
  //  $(document).on('click','.bio .follow', function () {
//         $(this).html(function(i, v){
//             if($(this).text().trim() != "Follow") {
//                 return '<span class="glyphicon glyphicon-plus"></span>Follow';
//             }
//             else{
//                 return '<span class="glyphicon glyphicon-ok"></span>Following';
//             }
//         });
//     });
   
    


 	 $(document).on('click','#upvote .col-md-3 .footer, #upvote .col-md-3 .glyphicon-chevron-right',function () {
 	    console.log(' follow action called');
        $(this).closest('#upvote .col-md-3').toggleClass('flipped');
    });

//     user card hover start 
   // $(".onhover").mouseenter(function(){
   $('body').on('mouseenter', '.onhover', function() { 
    	var id = $(this).data('id');
    	 if( $(this).siblings('.usercard').text() != '') {
         	$(this).siblings('.usercard').css('display',"block");
   	    } 
   	    else {
   	     	var data = $('body').data('ucard'+id);
			if(  $('body').data('ucard'+id) != undefined) {
	           $(this).parent().append( $('body').data('ucard'+id));
	       } else {
	    
	 var jsonData = { "id": id, "email": ""};
	 $.ajax({  
		  	url: "/user/card/info",
	        type: 'POST',
	        async: false,
	        data: JSON.stringify( jsonData ),
	        cache: false,
	        dataType: 'json',
	        processData: false, // Don't process the files
	        contentType: 'application/json', // Set content type to false as jQuery will tell the server its a query string request
	        headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') },
		 success: function(data, textStatus, jqXHR) {
			//console.log('data: ' + data );
		    
		    $('body').data('ucard'+id , data.message );
		},
		statusCode : {
			404 : function(content) {
				console.log('404 error');
			},
			500 : function(content) {
				console.log('500 error');
			}
		},
		error : function(req, status, errorObj) {
			console.log(status  + '<x>' + errorObj );
		}
	});
		$(this).parent().append( $('body').data('ucard'+id) ).css('display',"block");
      }
    }
       
   	 }); 
$('body').on('mouseleave', '.onhover', function() {         
	if (!isValidUser()) {
		return toggleLoginModal();
	} else { 
      setTimeout(function () {
            if ( $(this).siblings('.usercard').length != 0) {
                $(this).siblings('.usercard').css('display','block');
            }
            else {
                $(this).siblings('.usercard').css('display', "none");
            }
        },500);
      }
 });
 $('body').on('mouseleave', '.usercard', function() { 
        $('.usercard').css('display', "none");
 });
    
    function userProfileData(id) { 
    	  var htmlData;
//	      var jsonData = {"id": "1114"};
	      
	      var jsonData = { "id":"1114", "email": "title"};
	      
		  htmlData = getFormDataAndReturnForAjaxCall("/user/uprofile/info", jsonData);
	//	});
		return htmlData;
	}
	 
 
    //     user card hover end
    
    // when user clicks on tab
	$('.nav.nav-tabs.row li.loadData').click(function(){
		var currclick = $(this).find('a').text().toLowerCase().trim();
		console.log('currclick:>' + currclick + '<');
	
		var jsonData = {"id" : $('body').data('id') , "tab" : currclick};
			$.ajax({
			        url: '/user/profile/ajax',
			        type: 'POST',
			        async: true,
			        data: JSON.stringify(jsonData),
			        cache: false,
			        dataType: 'json',
			        processData: false, // Don't process the files
			        contentType: 'application/json', // Set content type to false as jQuery will tell the server its a query string request
			        headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') },
			        success: function(data, textStatus, jqXHR)
			        {
			       		console.log('data x: ' + data.userResponse);
     	 $.each(data.userResponse , function( key, value ) {
             console.log( key + ": " + value.id ); // Key : 10
             var row = "";
             $.each(value , function(i, val ) {
               var list = "";
                 var DOM = '<div class="col-md-3"><div class="bio"><div class="profile-pic"><a href="#" class="profile-link"><img class="profile-img medium-xl" src=" '+val.profilePic+' " /></a></div><div class="description"><a href="/user/profile/' + val.id+ '" class="name">' +  val.firstName  + '&nbsp;'+val.lastName+'</a> <div class="skills"><span class="icon ion-happy-outline">&nbsp;'  +val.aoi + '</span></div><div class="location"><span class="icon ion-location">&nbsp;</span>' +  val.addressData.cityData.name  + ' , ' + val.addressData.countryData.name + '</div></div><div class="stats"><div class="followers"><div class="num">' + val.followerCount  + '</div><span class="">Followers</span></div><div class="following"><div class="num">' +  val.followingCount  + '</div><span>Following</span></div><div class="sites"><div class="num">' + val.postCount   + '</div><span class="">Posts</span></div> <div class="sites"><div class="num">' + val.answerCount   + '</div><span class="">Answers</span></div> </div> <div class="follow  not-following"><div class=""><span class="glyphicon glyphicon-plus"></span>Follow</div></div></div></div>';
//			     DOM = DOM.replace('#src', val.profilePic);
                  row += DOM;                                ;
                $('#'+currclick+' .row-'+i).html(row);
             });
         });
        
         },
			 error: function(jqXHR, textStatus, errorThrown)
			 {
				 console.log(errorThrown);
			     $('#edtr-add-post').text('Error, Try again later..');
			 }
		});	
	         
	});
	
	// this method will call when user save the profile from dashboard
	$("#contact_form" ).submit(function( e ) {
		e.preventDefault();
		console.log('contact_form called');	
//		var data = $(this).serialize()
		var jsonData = JSON.stringify(jQuery('#contact_form').serializeArray());
		var url = $(this).attr("action");
		$.ajax({
		        url: url,
		        type: 'POST',
		        data: JSON.stringify(jQuery('#contact_form').serializeArray()),
		       // cache: false,
		        dataType: 'json',
		        processData: false, // Don't process the files
		        contentType: 'application/json', // Set content type to false as jQuery will tell the server its a query string request
		        headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') },
		        success: function(data, textStatus, jqXHR)
		        {
			       console.log('data: ' + data);
			       $('#save-profile').html('<span class="icon ion-checkmark"></span> Saved ');
			       $("#save-profile").prop("disabled", false);
			       
		        },
		        error: function(jqXHR, textStatus, errorThrown)
		        {
		        	console.log(jqXHR + '<>' + textStatus + '<>'+errorThrown);
		        }
	});		
 }); 
	
// jQuery to change the button text on text change in form save-profile
$('.form-group').keypress(function() {
	$('#save-profile').html('<span class="glyphicon glyphicon-send"></span>  Save Changes');
});

// post action
$(document).on('click','.usr-act', function () {
	//$('.form-group').keypress(function() {
     console.log('.follow act called<>' + $(this).data('id')  +'<>'+ $(this).data('status'));
     if (!isValidUser()) {
		return toggleLoginModal();
	} else { 
		 var status = $(this).data('status');
	 
		 if(status){
		 		$(this).html('<span class="glyphicon glyphicon-plus"></span>&nbsp;Follow');
 		 		$(this).data('status', false);
			 } else {
				 $(this).html('<span class="glyphicon glyphicon-ok"></span>&nbsp;Following');
		 		$(this).data('status', true)
			 }
		var url = "/post/update/action"; 		
		var data = { "id": $(this).data('id') , "action":"follow", "status": status, "type": "user" };
		getAndSetDataForAjaxCall(url, "dummy", data); 		
	} // end if
 });
	 
}); // end of document		
