//action on page load
var ansDescTemp = [];
var relDocstatus = false;
$( window ).load(function() {
	// get user's notification count - end
	showClosableAlertMessage('data');
}); //end load ready document

// Set the transparent button border
$('body').on('click', '.btn-transparent', function(e) { 
	$('.btn-transparent').css('border','0px solid grey');
	$(this).css('border','1px solid grey');
}); 

//  jquery to flip flop news right side panel 
$(document).on('click', '.panel-heading span.clickable', function(e){
    var $this = $(this);
	if(!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('span').removeClass('ion-minus-round').addClass('ion-plus-round');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('span').removeClass('ion-plus-round').addClass('ion-minus-round');
	}
});

 
// method to report a post as abuse
$('.rpt-abs').click(function() {
	 var pid = this.id;
	 console.log('pid: ' + pid);
		if (! isValidUser()) {
	 		return toggleLoginModal();
		} else {	 
	 
	 $.post("/post/report/abuse",
				{ pid:pid},
				   function(data, status){
					console.log('status: '+status);
		});
		}
});

 
$("input[type=passwordxx]").keyup(function(){
    var ucase = new RegExp("[A-Z]+");
	var lcase = new RegExp("[a-z]+");
	var num = new RegExp("[0-9]+");
	
	if($("#password1").val().length >= 8){
		$("#8char").removeClass("glyphicon-remove");
		$("#8char").addClass("glyphicon-ok");
		$("#8char").css("color","#00A41E");
	}else{
		$("#8char").removeClass("glyphicon-ok");
		$("#8char").addClass("glyphicon-remove");
		$("#8char").css("color","#FF0004");
	}
	
	if(ucase.test($("#password1").val())){
		$("#ucase").removeClass("glyphicon-remove");
		$("#ucase").addClass("glyphicon-ok");
		$("#ucase").css("color","#00A41E");
	}else{
		$("#ucase").removeClass("glyphicon-ok");
		$("#ucase").addClass("glyphicon-remove");
		$("#ucase").css("color","#FF0004");
	}
	
	if(lcase.test($("#password1").val())){
		$("#lcase").removeClass("glyphicon-remove");
		$("#lcase").addClass("glyphicon-ok");
		$("#lcase").css("color","#00A41E");
	}else{
		$("#lcase").removeClass("glyphicon-ok");
		$("#lcase").addClass("glyphicon-remove");
		$("#lcase").css("color","#FF0004");
	}
	
	if(num.test($("#password1").val())){
		$("#num").removeClass("glyphicon-remove");
		$("#num").addClass("glyphicon-ok");
		$("#num").css("color","#00A41E");
	}else{
		$("#num").removeClass("glyphicon-ok");
		$("#num").addClass("glyphicon-remove");
		$("#num").css("color","#FF0004");
	}
	
	if($("#password1").val() == $("#password2").val()){
		$("#pwmatch").removeClass("glyphicon-remove");
		$("#pwmatch").addClass("glyphicon-ok");
		$("#pwmatch").css("color","#00A41E");
	}else{
		$("#pwmatch").removeClass("glyphicon-ok");
		$("#pwmatch").addClass("glyphicon-remove");
		$("#pwmatch").css("color","#FF0004");
	}
});

//search js start
// $('.searchpopup').click(function () { 
// 	var title = this.id;
// 	console.log('id: ' + title);			
// 	return $('#myModal').html().replace('#postTitle', title);  			
// }); 

 

//ajax  post call when user add a topic from search suggestion
$('.postview').click(function () {
 	//alert('postview called');
 	//alert(arr[0] + " :: " + arr[1] );
 	//var newUrl = "/"+arr[1];
 	//var url = "/"+this.id;
    $.get("/"+ this.id ,
 		    { },
 		    	function(data, status){
 		    });
 });



//ajax  post call when user add/remove a topic from from the post
$('.topic-ar').click(function () {
	///post/{pid}/topic/{tname}/{status}
	console.log('id: ' +  this.id );
	var pid = this.id.split('#')[0];
	var aid = this.id.split('#')[1];
	var cnt = $('#post-stats-follower').text().split(' ')[0];
	console.log('cnt: ' + cnt);
	var arr = this.id.split('#');
	//var isValidUser =  arr[4].indexOf('true') != -1? true:false;
//	var isValidUser = true;
	if (!isValidUser()) {
		return toggleLoginModal();
	} else { 
		var index = arr[3].indexOf('true') != -1 ? true: false;
	 	if (index){ $(this).html('Follow'); cnt = +cnt - 1;} 
	 	else { $(this).html('<strong>Following</strong>');  //
	 	cnt = +cnt + 1;
	 	}
	    $.post("/post/topic",
			    { pid:pid, tid:tid, status:status },
			 	   function(data, status){
			    	console.log(data);
			    });
		
	}
});

//post call when user click on ansaction
///post/ans/act?id=1&fstatus=on&fname=th
//		Upvote#${post.titleSeo}#${isValidUser}
var status;
//ajax call when click on Follow button on post id
$('.psts-srh-act').click(function () {
	var arr = this.id.split('#');
	console.log('arr: ' + arr); 
	var fname =  arr[0];
	var id = arr[1];
	var tname = arr[2];
	var ustatus = arr[3];
	//var tid = aid;
	var pidTxt =  $(this).html();
	console.log('pidTxt: ' + pidTxt);
	var cnt = 0;
	var tid = "#" + fname + id;
	cnt = $(this).text().trim().split(' ')[0];
	//cnt = $(tid).text();
	console.log('cnt: ' + cnt);
	var usatus = ustatus.indexOf('true') != -1? true:false;
	var status = $(this).html().indexOf('strong') != -1? true:false;
	console.log('status: ' + status);
	if (!isValidUser()) {
 		return toggleLoginModal();
	} else {
			if (pidTxt.indexOf('strong') != -1){
				status = true;
			}  else { status = false; }
			
			if (fname == 'upvote'){
				if (status){
					$(this).html('Upvote');
					$(tid).text(+cnt - 1);
				} else {
					$(this).html('<strong>Upvote</strong>'); 
					$(tid).text(+cnt + 1);				
				}
			} 
			else if (fname == 'follow'){
				if (status){
					$(this).html((+cnt - 1) +' '+'Follower');
					//$(tid).text(+cnt - 1);
				} else {
					$(this).html((+cnt + 1) +' '+'<strong>Following</strong>'); 
					//$(tid).text(+cnt + 1);				
				}
			} 
	} //end else	
	var url = "/post/update/action";
	//var data = { id:id, fname:fname, status:status, tname:tname };
	var data = new FormData();
	data.append("id", id);
	data.append("fname", fname);
	data.append("status", status);
	data.append("tname", tname);
				
	getAndSetDataForAjaxCall(url, "dummy", data);
	
}); 
//search js end



	$('.flw-rel-act').click(function () {
		console.log('.flw-rel-act called');
	 	var arr = this.id.split('#');
	 	var fname;
	 	if ($(this).text().indexOf( $('follow').text()) != '-1' ){ fname='follow';}
	 	if ($(this).text().indexOf( $('Upvote').text()) != '-1' ){ fname='upvote';}
	 	if ($(this).text().indexOf($('Favorite').text() ) != '-1' ){ fname='favorite';}
	 	if ($(this).text().indexOf($('Report').text() ) != '-1' ){ fname='report';}
	 	if ($(this).text().indexOf($('Save').text() ) != '-1' ){ fname='save';}
	 	
	 	//var tid = aid;c

	 	var cnt = $(this).html().trim().split('&nbsp;')[1];
	 	if (! isValidUser()) {
	 		return toggleLoginModal();
	 	} 
	 	else {
		 		var status = $(this).html().indexOf('strong') != -1? true:false;
		 		if (fname == 'upvote'){if (status){$(this).html('&nbsp;'+(+cnt - 1) +'&nbsp;Upvote');
		 		} else {$(this).html('&nbsp;'+(+cnt + 1) +'&nbsp;<strong>Upvote</strong>'); }} 
		 		
		 		else if (fname == 'follow'){if (status){$(this).html('&nbsp;'+(+cnt - 1) +'&nbsp;Follower');
					} else {	$(this).html('&nbsp;'+(+cnt + 1) +'&nbsp;<strong>Following</strong>');  }}  
		 		else if (fname == 'save'){if (status){$(this).html('&nbsp;'+(+cnt - 1) +'&nbsp;Save for later');
				} else {	$(this).html('&nbsp;'+(+cnt + 1) +'&nbsp;<strong>Save for later</strong>');  }}
		 		else if (fname == 'favorite'){if (status){$(this).html('&nbsp;'+(+cnt - 1) +'&nbsp;My Favorite');
				} else {	$(this).html('&nbsp;'+(+cnt + 1) +'&nbsp;<strong>My Favorite</strong>');  }   }
				else if (fname == 'report'){if (status){$(this).html((+cnt - 1) +'&nbsp;Report Abuse');
				} else {	$(this).html('&nbsp;'+(+cnt + 1) +'&nbsp;<strong>Report Abuse</strong>');  }   }
	 		
	 		} //end else	
	 		
	 		var url = "/update/follow/rel";
	 		console.log(arr[0] +"<>" + fname +"<>" + status + "<>" + arr[1]);
	 		$.post(url,
	 			    { id:arr[0], fname:fname, status:status, tname:arr[1] },
	 			 	   function(data, status){
	 			    });
	 });

$('.postviewtopic').click(function () {
	//alert(this.id);
	window.location.href="/"+ this.id;
  });  
  
 $('#topicae').click(function () {
		console.log('inside topicae');
		//alert('Sorry, you need more points to Add/Edit topics');
		return $('#myModal').html();
 });
 $('.titlee').click(function () {
		var id = this.id.split('_')[1];
		console.log(id + '<>' + $(this).text().trim());
		var title = $(this).text().trim().replace(/\s+/g, '-').toLowerCase() ;
		var url = '/question/'+id;
	// 	$.get(url,
//			    { gpid:id},
//			 	   function(data, status){
//			 	   // processAjaxData(data, url);
//			 	   console.log('data: ' + data);
//			 	   window.history.pushState("object or string", "Title", url);
//		 });
		 window.location.href='/question/'+id;
});

// ajax call when user type for search
//$('.searchBarInput').keyup(


// when user click on search button
$('body').on('click', '.btn-search', function(e) { 
	console.log(' btn-search called');
	$('.search-result-lst').hide();
	if ( $('.searchBarInput').val() == null ) {		
        return;						
	}
     window.location.href = "/search?q=" + $('.searchBarInput').val() ;
});
	 
	// jquery to change the text on selection
	$(".dd-post-type li").click(function() {
		$("#post-type").text($(this).text().split(' ')[0]);
		$("#post-type").data("txt", $(this).data('txt') );
		//$('#btn-search-add').text('Search / Add ' +$("#post-type").html());
	});
	

	 $('.reset-postEditorModal').keypress(function() {
			$('#save-post').text('Save Changes');
			$('#add-post').text('Add Question');
			$('#post-qs-lnk').html('');
			$('.modal-pst-status').css("display","none");
	 });
	//ajax call when user select a stext to get the result
	//str.replace(/\s+/g, '-').toLowerCase();
	
	$('div#search-text-btn').click(
			function() {
				var url = "/search?q="
						+ $('textarea#search-text').text().replace('/[\. ,:-]+/g', "-");
				window.location.href = url;
			});
	
	$("#search-clear").click(function() {
		console.log('clear called');
		$(".searchBarInput").html('');
	});

	$('.searchBarInput').on('input propertychange', function() {
		var $this = $(this);
		var visible = Boolean($this.text());
		$this.siblings('.form-control-clear').toggleClass('hidden', !visible);
	}).trigger('propertychange');

	$('.form-control-clear').click(
			function() {
				console.log('clear called xx');
				$(this).siblings('.searchBarInput').html('').trigger(
						'propertychange').focus();
				$('.search-result-lst').html('');
		});

 	
$('.modalc').click(function (e) {
 var key = e.which;
 console.log('keypress');
 if(e.which == 13)   { // the enter key code
  	console.log('keypress 13');
  	$('#myModal11').modal('hide');
  }
}); 

// prevent the default behaviour of return key pressed for enter key  while searching
$('body').on('keydown', '.searchBarInput', function(e) { 
//$('.searchBarInput').keydown(function(e) {
    if (e.keyCode === 13) {
     // document.execCommand('insertHTML', false, '<br><br>');
      return false;
    }
});

$('.close-topic-bar').click(function() {
   	 console.log( 'close-topic-bar inside');
	 $('#topic-bar').remove();
	 //  if ($('#ivu').text().indexOf('true') == -1) {
// 	 		alert($('#msg-lgn-fst').text());
// 		} else {	 
// 		 	$.post("/user/update/pref",
// 			 { type:type, name:name},
// 			   function(data, status){
// 				console.log('status: '+status);
// 			 });
// 		}
});

// $('.clickable').click(function() {
//    	 console.log('clickable inside');
// 	 var ws = $(this).data('ws');
// 	  console.log('ws: ' + ws);
// 	 if(ws){
// 		$(this).data('ws', false);
// 	 } else {
// 		$(this).data('ws', true);	 
// 	 }
// 	 console.log('ws later: ' + $(this).data('ws'));
// 
// //	 $('#addEditPostModel').data('pu-desc', '');
// });



	$('.lft-menu').click(function () {
	console.log('lft-menu inside');
	if (! isValidUser()) {
 		return toggleLoginModal();
	} else {
		  $.get("/user/contents",
	   			{ tab: this.id, ajax:'true' },
  			   	 function(data, status){
  			   	 $('#contents-post').html('');
 			  	  $('#contents-post').append(data);
 			  	  $('#contents-post').append('<script type="text/javascript" src="/_ui/js/custom-qh.js"></script>');
	   			 	// e.preventDefault();
				 	 $(this).addClass('active');
				 	// window.location.href="/"+ this.id;
				 	//	$(this).tab('show');
				 	$('ul.labels-info > li > a').css('color','#fff');	  
				 	$('ul.labels-info > li > a').css('color','#6a6a6a');	  
			     });
		}
 });
 
 
 
//JQuery to active/inactive tab
// $('#tab-post a').click(function (e) {
// 	  e.preventDefault();
// 	  $('li').removeClass('active');
// 	  $(this).tab('show');
// })

 
$('body').on('click', '.add-answer-btn', function() { 
	console.log('add-answer inside xv');
	if (! isValidUser()) {		toggleLoginModal();	} 
	else {
	//var pid = this.id.split('_')[1];
	var pid = $(this).data('pid');
	console.log('id x: ' +pid);
	openEditorInModalAndSetValues(pid, "", $('#title_'+ $(this).data('pid') ).text().trim(), "", "answer", "add", "" );
	$('#edtr-save-answer').hide();		
 //   console.log('txt: ' + txt);
 }

});



/*ajax call when user upvote or thanks an answer */
//$('.ans-act-btn').click(function () {
$('body').on('click', '.ans-act-btn', function() { 
	 	console.log('ans-act called');
	 	var arr = this.id.split('#');
	 	console.log('arr: ' + arr); 
	 
	 	var fname = $(this).data('txt').split('#')[0];
	 	var cnt = $(this).data('txt').split('#')[1];
	 	var status = $(this).data('status');
	 	cnt = getPostActionCount(status, cnt);
	 	
	 	if (fname.indexOf('upvote') != '-1' ){ fname='upvote';}
	 	if (fname.indexOf('thanks') != '-1' ){ fname='thanks';}
	 	
	 	if (! isValidUser()) {
	 		return toggleLoginModal();
	 	} 
	 	else {		 	 	
			$(this).html( getPostActionString(fname, status, cnt) ); // set post action string like 2 upvotes
			$(this).data('status', !status); //set  status opposite like true/false
			$(this).data('txt', fname+'#' + cnt); // set data for action name and count
	
			console.log( cnt+ '<>' + status);
		
			var data = { "id":arr[0], "action":fname, "status":status, "type": "answer", "uid" : $('body').data('uid') };	
			getAndSetDataForAjaxCall("/post/ans/action", "dummy", data);
	
	    } //end else	
	 			 	
});//end ans-act




$('.panel-google-plus > .panel-footer > .input-placeholder, .post-footer > .input-placeholder, .panel-google-plus >  .panel-google-plus-textarea > button[type="reset"]').on('click', function(event) {
		$('.panel-google-plus-comment').toggle();
    var $panel = $(this).closest('.panel-google-plus');
        $comment = $panel.find('.panel-google-plus-comment');
        
    $comment.find('.btn:first-child').addClass('disabled');
    $comment.find('textarea').val('');
    
    $panel.toggleClass('panel-google-plus-show-comment');
    
    if ($panel.hasClass('panel-google-plus-show-comment')) {
        $comment.find('textarea').focus();
    }
});
$('.panel-google-plus-comment > .panel-google-plus-textarea > textarea').on('keyup', function(event) {
    var $comment = $(this).closest('.panel-google-plus-comment');
    
    $comment.find('button[type="submit"]').addClass('disabled');
    if ($(this).val().length >= 1) {
        $comment.find('button[type="submit"]').removeClass('disabled');
    }
});

//AJAX JQUERY CALL TO ADDANSWER
$(this).keyup(function(e) {
	 $('.pst-cmt').text('Add Answer');
});

//display post editor for first time user
//firstansweruser
//$('.btn-first-person').click(function () {
$('body').on('click', '.btn-first-person', function() { 
	console.log('btn-first-person inside');
if (! isValidUser()) {
		toggleLoginModal();
	} else {
	var pid = this.id.split('_')[1];
	openEditorInModalAndSetValues(pid, "", $('#title_'+pid).text().trim() , "", "answer", "add", "" );
	$('#edtr-save-answer').hide();		
 //   console.log('txt: ' + txt);
 }

});

/* clear contents from answer editor textarea */
$('.panel-google-plus-textarea > button[type="reset"]').on('click', function(event) {
		console.log('reset called' + this.id);
		$('#p_'+this.id).html('');
});






 $('#mediaModal').on('click', '.pst-act', function(e){
   console.log('.pst-act called');
 	var arr = this.id.split('#');
 	var status = $(this).data('status');
 	var fname;
 	var follow = $('#follow').text();
 	var follower = $('#follower').text();
 	var following = $('#following').text();
 	var upvote = $('#upvote').text();
 	var favorite = $('#favorite').text();
 	var report = $('#report').text();
 	var save = $('#save').text();
 	var saveforLater = $('#save-for-later').text();
 	var myFavorite = $('#my-favorite').text();
 	var reportAbuse = $('#report-abuse').text();
 	
 	console.log(status + '<>' + $(this).text());
 	if ($(this).data('txt').indexOf('upvote') != '-1' ){ fname='upvote';} 	
 	if ($(this).data('txt').indexOf('follow') != '-1' ){ fname='follow';}
 	if ($(this).data('txt').indexOf('favorite') != '-1' ){ fname='favorite';}
 	if ($(this).data('txt').indexOf('report') != '-1' ){ fname='report';}
 	if ($(this).data('txt').indexOf('save') != '-1' ){ fname='save';}
 	
 	//var tid = aid;
 	var cnt = $(this).data('txt').split('#')[1];
 	if (! isValidUser()) {
 		return toggleLoginModal();
 	} 
 	else {
	 		//var status = $(this).html().indexOf('strong') != -1? true:false;
	 		if (fname == 'upvote'){if (status){cnt =(+cnt - 1); $(this).html(cnt +'&nbsp;'+ upvote);
	 		} else {cnt =(+cnt + 1); $(this).html(cnt+'&nbsp;<strong>' +upvote+'</strong>'); }} 	 		
	 		else if (fname == 'follow'){if (status){cnt =(+cnt - 1); $(this).html(cnt +'&nbsp;'+ follower);
				} else {cnt =(+cnt + 1);	$(this).html(cnt +'&nbsp;<strong>' +following+ '</strong>');  }}  
	 		else if (fname == 'save'){if (status){cnt =(+cnt - 1); $(this).html((cnt) +'&nbsp;'+ saveforLater);
			} else {cnt =(+cnt + 1);	$(this).html(cnt +'&nbsp;<strong>'+saveforLater+'</strong>');  }}
	 		else if (fname == 'favorite'){if (status){cnt =(+cnt - 1);$(this).html(cnt +'&nbsp;'+myFavorite);
			} else {cnt =(+cnt + 1);	$(this).html(cnt +'&nbsp;<strong>' +myFavorite+'</strong>');  }   }
			else if (fname == 'report'){if (status){cnt =(+cnt - 1); $(this).html(cnt +'&nbsp;'+reportAbuse);
			} else {cnt =(+cnt + 1);	$(this).html(cnt +'&nbsp;<strong>'+reportAbuse+'</strong>');  }   }

 		$(this).data('status', !status); //set  status opposite
 		$(this).data('txt', fname+'#'+cnt);
 		
 		} //end else	
 		
 		var url = "/post/update/action";
 		console.log('action: ' +  fname);
	var data = { "id":arr[0], "action":fname, "status":status, "type":arr[1] };
	getAndSetDataForAjaxCall(url, "dummy", data);
});



// post action
$('body').on('click', '.save-btn', function() { 
	console.log('.save-btn  called');
 	if (! isValidUser()) { 		return toggleLoginModal(); 	} 
 	else {
 			var status = $(this).data('status');
		 	var cnt = $(this).data('count');

	 		if (status){ cnt =(+cnt - 1); $(this).css('opacity', '.55'); } 
			else { cnt =(+cnt + 1);	$(this).css('opacity', '1') }
	 
 			$(this).data('status', !status); //set  status opposite
	 		$(this).data('count', cnt);
	 		$(this).find('.count').html(cnt) ;
 		} //end else	
 		
		var data = { "id": $(this).attr('id'), "action": $(this).data('action'), "status": status, "type": $(this).data('type') };
		getAndSetDataForAjaxCall("/post/update/action", "dummy", data);
 });
$('body').on('click', '.favorite-btn', function() { 
	console.log('.favorite-btn called: ' );
 	if (! isValidUser()) { 		return toggleLoginModal(); 	} 
 	else {
 			var status = $(this).data('status');
		 	var cnt = $(this).data('count');

	 		if (status){ cnt =(+cnt - 1); $(this).css('opacity', '.55'); } 
			else { cnt =(+cnt + 1);	$(this).css('opacity', '1') }
	 
 			$(this).data('status', !status); //set  status opposite
	 		$(this).data('count', cnt);
	 		$(this).find('.count').html(cnt) ;
 		} //end else	
 		
		var data = { "id": $(this).attr('id'), "action": $(this).data('action'), "status": status, "type": $(this).data('type') };
		getAndSetDataForAjaxCall("/post/update/action", "dummy", data);
 });
 $('body').on('click', '.upvote-btn', function() { 
	console.log('.upvote-btn called');
 	if (! isValidUser()) { 		return toggleLoginModal(); 	} 
 	else {
 			var status = $(this).data('status');
		 	var cnt = $(this).data('count');

	 		if (status){ cnt =(+cnt - 1); $(this).css('opacity', '.55'); } 
			else { cnt =(+cnt + 1);	$(this).css('opacity', '1') }
	 
 			$(this).data('status', !status); //set  status opposite
	 		$(this).data('count', cnt);
	 		$(this).find('.count').html(cnt) ;
 		} //end else	
 		
		var data = { "id": $(this).attr('id'), "action": $(this).data('action'), "status": status, "type": $(this).data('type') };
		getAndSetDataForAjaxCall("/post/update/action", "dummy", data);
 });

// jquery when user clicks on follow btn
$('body').on('click', '.follow-btn', function() { 
	console.log('.follow-btn called');
 	if (! isValidUser()) { 		return toggleLoginModal(); 	} 
 	else {
 			var status = $(this).data('status');
		 	var cnt = $(this).data('count');

	 		if (status){ cnt =(+cnt - 1); $(this).css('opacity', '.55'); } 
			else { cnt =(+cnt + 1);	$(this).css('opacity', '3.00')	 }
	 
 			$(this).data('status', !status); //set  status opposite
	 		$(this).data('count', cnt);
	 		$(this).find('.count').html(cnt) ;
//			$(this).html(' Follow' + $(this).data('count') );
 		} //end else	
		var data = { "id": $(this).attr('id'), "action": "follow", "status": status, "type": $(this).data('type') };
		getAndSetDataForAjaxCall("/post/update/action", "dummy", data);
 });
 
 




// Request for expert users list 
$('body').on('click', '.request-expert-btn', function() { 
	if (! isValidUser()) { 		return toggleLoginModal(); 	} 
	console.log('.request-expert-btn called');
 	if (! isValidUser()) { 		return toggleLoginModal(); 	} 
 	else 
 	{
 			var status = $(this).data('status');
 			$(this).data('status', !status); //set  status opposite
			var dataid = '#post_ext'+$(this).attr('id');
	 		if (status){ 
		 			$(this).html('<span class="icons" title="">Request answer </span>'); 
		 			$(dataid).hide();
		 	} 
			else 
				{ 
					$(this).html('<strong title=""><span class="icons">Request answer </span> </strong>'); 
					
					if( $(dataid).html().indexOf('user') != -1) {
							$(dataid).show();	
					} else {
						//var data = { "pid": $(this).attr('id'), "uid",  $(this).data('uid')};
 						getAndSetDataForPostCall("/post/request/answers/ajax", dataid, $(this).attr('id'));
					} 						
				}
 	} //end else			
 });
// Request for answer
$('body').on('click', '.request-answer-btn', function() { 
	console.log('.request-answer-btn called');
 	if (! isValidUser()) { 		return toggleLoginModal(); 	} 
 	else {
 			var status = $(this).data('status');
		 	 
	 		if (status){ 
	 		 	$(this).html('<span class=" " title="Click to follow the post">Request for answer</span>'); 
	 		 } 
			else {  
				$(this).html('<strong title="You are following the post"><span class="">Answer requested</span> </strong>'); 
			}
			$(this).data('status', !status); //set  status opposite
//	 		$(this).data('count', cnt);
 		} //end else	
 		
		var data = {"uid": $('body').data('uid'), "id": $(this).data('uid'),   "subId": $(this).attr('id'), "action": $(this).data('action'), "status": status, "type": "user" };
		getAndSetDataForAjaxCall("/post/update/action", "dummy", data);
 });
 
// related document for the post
$('body').on('click', '#rel-doc', function() {
	if (! isValidUser()) { 		return toggleLoginModal(); 	} 
	 var id = $(this).data('id');
	 if( $(this).data('status') == 'off' ) { 
  	   $(this).data('status', 'on'); // set status
  	   if( $(this).data('avail') == 'on') {		$('#post_ext'+ id ).show();  return;	} // return if data already there
	   $('#post_ext'+ id ).css('background','white');	   $('#post_ext'+ id ).css('padding','10px');
	   $.post("/post/related/document", { "text": $(this).data('title')  },
			function(data, status){	
			var html = '';
			$.each(data, function(index, content) {  	
			 	html = html + '<div style="padding: 4px;"><a target="_blank" href=/'+content.type+'/'+ content.titleSeo +'>'+content.title+'</a></div>';
			});			
			$('#post_ext'+ id ).addClass('border-top');
			$('#post_ext'+ id ).html('<h4>Related Posts</h4><div class="border-top">' + html + "</div>");
			$('#post_ext'+ id ).show();
			$(this).data('avail','on');
	   });
	 } else {
		$('#post_ext'+ id ).hide();	 
		$(this).data('status', 'off'); //set status
	 }
});// end related doc 

// post action
$('body').on('click', '.pst-act', function() { 
	if (! isValidUser()) { 		return toggleLoginModal(); 	} 
	console.log('.pst-act x called');
 	var arr = this.id.split('#');
 	var status = $(this).data('status');
 	var fname;
 	var follow = $('#follow').text();
 	var follower = $('#follower').text();
 	var following = $('#following').text();
 	var upvote = $('#upvote').text();
 	var favorite = $('#favorite').text();
 	var report = $('#report').text();
 	var save = $('#save').text();
 	var saveforLater = $('#save-for-later').text();
 	var myFavorite = $('#my-favorite').text();
 	var reportAbuse = $('#report-abuse').text();
 	
 	console.log(status + '<>' + $(this).text());
 	if ($(this).data('txt').indexOf('upvote') != '-1' ){ fname='upvote';} 	
 	if ($(this).data('txt').indexOf('follow') != '-1' ){ fname='follow';}
 	if ($(this).data('txt').indexOf('favorite') != '-1' ){ fname='favorite';}
 	if ($(this).data('txt').indexOf('report') != '-1' ){ fname='report';}
 	if ($(this).data('txt').indexOf('save') != '-1' ){ fname='save';}
 	
 	
 	//var tid = aid;
 	var cnt = $(this).data('txt').split('#')[1];
 	if (! isValidUser()) {
 		return toggleLoginModal();
 	} 
 	else {
	 		//var status = $(this).html().indexOf('strong') != -1? true:false;
	 		if (fname == 'upvote'){if (status){cnt =(+cnt - 1); $(this).html(cnt +'&nbsp;'+ upvote);
	 		} else {cnt =(+cnt + 1); $(this).html(cnt+'&nbsp;<strong>' +upvote+'</strong>'); }} 	 		
	 		else if (fname == 'follow'){if (status){cnt =(+cnt - 1); $(this).html(cnt +'&nbsp;'+ follower);
				} else {cnt =(+cnt + 1);	$(this).html(cnt +'&nbsp;<strong>' +following+ '</strong>');  }}  
	 		else if (fname == 'save'){if (status){cnt =(+cnt - 1); $(this).html(saveforLater +'&nbsp;' + (cnt));
			} else {cnt =(+cnt + 1);	$(this).html(cnt +'&nbsp;<strong>'+saveforLater+'</strong>');  }}
	 		else if (fname == 'favorite'){if (status){cnt =(+cnt - 1);$(this).html(cnt +'&nbsp;'+myFavorite);
			} else {cnt =(+cnt + 1);	$(this).html(cnt +'&nbsp;<strong>' +myFavorite+'</strong>');  }   }
			else if (fname == 'report'){if (status){cnt =(+cnt - 1); $(this).html(cnt +'&nbsp;'+reportAbuse);
			} else {cnt =(+cnt + 1);	$(this).html(cnt +'&nbsp;<strong>'+reportAbuse+'</strong>');  }   }

 		$(this).data('status', !status); //set  status opposite
 		$(this).data('txt', fname+'#'+cnt);
 		
 		} //end else	
 		
 		var url = "/post/update/action";
 		console.log('action: ' +  fname);
	var data = { "id":arr[0], "action":fname, "status":status, "type":arr[1] };
	getAndSetDataForAjaxCall(url, "dummy", data);
 });


$('.edit-post-tobeuselater').click(function() {
// 	 console.log('inside edit post x');
// 	 var id = this.id;
// 	 var status =  $(this).is(':checked');
// 	 console.log(id + '<>' + $('#post-desc-show-more_'+id).text());
// 		
// 	  if ($('#post-desc-show-more_'+id).text().indexOf('More') != '-1'){ 
// 		     $('#post-desc-show-more_'+id).html('Show Less');
// 			 $('#short_'+id).hide();
// 			 $('#long_'+id).show();
// 	  }
// 
// 	  var $div=$('#long_'+id), isEditable=$div.is('.editable');
// 	  $div.prop('contenteditable',isEditable).toggleClass('editable')
// 	   	   
// 	   $('#long_'+id).css('border',"1px solid #ccc");
// 	   $('#save-post_'+id).toggleClass('display-none');
// 	   $('#exit-edit_'+id).toggleClass('display-none');
// 	   
// 	  var $div=$('#t_'+id), isEditable=$div.is('.editable');
// 	  $div.prop('contenteditable',isEditable).toggleClass('editable')
// 	  $('#t_'+id).css('border',"1px solid #ccc");
}); 


$('.sch-for-quiz').click(function() {
	toggleWaitModal( );

});
 
// duplicate save-post	 
$('#save-post').click(function() {
	console.log('save-post xy');
	var id=	$('#addEditPostModel').data('pid');
	var type = $('#addEditPostModel').data('type');
	console.log(id + '<>' + type);

	// var id = this.id.split('_')[1];
	var title = $.trim($('#post-title').text());
	console.log('title: ' + title);
	var desc =  $('.note-editable').html();
	console.log('desc : ' + desc);

	$('#save-post_'+id).toggleClass('display-none');
	$('#exit-edit_'+id).toggleClass('display-none');
	$('#long_'+id).css('border', "0px solid #ccc");
	var $div=$('#long_'+id), isEditable=$div.is('.editable');
	$div.prop('contenteditable',isEditable).toggleClass('editable');
	$('input:checkbox[name=editpost]').attr('checked',false);

	var $div=$('#t_'+id), isEditable=$div.is('.editable');
	  $div.prop('contenteditable',isEditable).toggleClass('editable')
	  $('#t_'+id).css('border',"0px solid #ccc");
});

// Show Closable alert message
function showClosableAlertMessage(data) {
		console.log('called showClosableAlertMessage');
		$('#status-message-alert').css('visibility','visible');
		//$('#status-message-alert').html(data);
		$('.alert').fadeIn();
		setTimeout(function(){
			  $('.alert').fadeOut()
		}, 51000); 	
}

function triggerBottomRightAlertMessage(html) {
		//var alerted = localStorage.getItem('alerted') || '';
//         if (alerted != 'yes') {
//           $('#bottom-message-alert').css('visibility','visible');
//   		 $('#bottom-message-alert').html(html);
// 		 $('.alert').fadeIn();
//  		 setTimeout(function(){			  $('.alert').fadeOut() 		}, 3000); 	
//          localStorage.setItem('alerted','yes');
//         }   	

}


$('.act-post-add').click(function() {
	 console.log('act-post-add called');
	var id = this.id.split('_')[1];
	var title = $('#t_'+id).text().trim();
	console.log('title: ' + title);
	var desc = $('#long_'+id).html();
	console.log('desc : ' + desc);
	 		$.get("/post/user/add",
				    { id:id, title:title, desc:desc, ajax:'true'},
				 	   function(data, status){
				    	console.log(status   + "<>" + data);
				    	$('#pw_'+id).remove();
			});
});

$('.exit-edit').click(function() {
	console.log('exit edit');
	var id = this.id.split('_')[1];
	var $div=$('#long_'+id), isEditable=$div.is('.editable');
	$div.prop('contenteditable',isEditable).toggleClass('editable');
	$('#long_'+id).css('border',"0px solid #ccc");

	$('input:checkbox[name=editpost]').attr('checked',false);
    $('#save-post_'+id).toggleClass('display-none');
    $('#exit-edit_'+id).toggleClass('display-none');
  
    var $div=$('#t_'+id), isEditable=$div.is('.editable');
    $div.prop('contenteditable',isEditable).toggleClass('editable')
    $('#t_'+id).css('border',"0px solid #ccc");
});

// .hover(function() {
// 	 console.log('inside edit ans');
// 	 var id = this.id.split('_')[1];
// 	 if (! ($('#ad_'+id).html().indexOf('summernote') != '-1') ){ 
// 		$('#ad_'+id).addClass('editor-border');
// 	 }
// 	$('#g_'+id).toggleClass('hidden', false);
//  })
 $('.edit-ans').click(function() {
	console.log('edit-ans action: ' + this.id);
	//var pid = this.id.split('_')[1];
	var aid = this.id.split('_')[1];

// 	if (! ($('#ad_'+id).html().indexOf('summernote') != '-1') ){ 
// 	var desc = $.trim($('#ad_'+id).html());
 	var editorHtml = $('.post-editor-block').html();	
// 	$('#g_'+id).hide();
// 	$('#ad_'+id).html(editorHtml + "<script>$('#summernote').summernote();</script>");
// 	$('.note-editable').html(desc);
//  	$('#save-ans_'+id).show();
// 	$('#exit-edit-ans_'+id).show();	
// 	 
 	// ansDescTemp[id] = $('.note-editable').html();
	// $('#ad_'+id).toggleClass('editor-border', false);	 
	 	console.log('text: ' + $('#title_'+ $(this).data('pid') ).text());
	openEditorInModalAndSetValues( "", aid,   $('#title_'+ $(this).data('pid') ).text().trim() , $(this).html(), "answer", "edit", "" ); 
	 
  //}   	
});
$('.edit-ans').hover(
	       function () {
                if (! ($(this).html().indexOf('summernote') != '-1') ){ 
					 $(this).toggleClass('editor-border', true);
				 }
               }, 
	           function () {
                 console.log('inside focusout');
       			 $(this).toggleClass('editor-border', false);
               }
);
                            	 
$('.exit-edit-ans').click(function() {
  console.log('exit edit');
  var id = this.id.split('_')[1];
  //var $div=$('#ad_'+id), isEditable=$div.is('.editable');
//  $div.prop('contenteditable', isEditable).toggleClass('editable');
  $('#ad_'+id).removeClass('border');
  $('#g_'+id).toggleClass('hidden', true);
  $('#save-ans_'+id).hide();
  $('#exit-edit-ans_'+id).hide();
  
  $('#ad_'+id).html(ansDescTemp[id]);
});//end exit-edit-ans


// toggle post Description when user click on show more
// $('.post-desc-show-more').click(function () {
$('body').on('click', '.post-desc-show-more', function(e){
 	 var id = $(this).data('id');
 	 var txt = $(this).text();
 	console.log('id: ' +id);
if (! isValidUser()) {
	 		return toggleLoginModal();
	} else {

	if ($(this).text().indexOf('more') != '-1' ){
		 $(this).data('text','less');
		 $(this).text($('#show-less').text());
		 $('#short_'+id).hide();
		 $('#long_'+id).show();
	 } else {
		 $(this).data('text','more');
		 $(this).text($('#show-more').text());
 		 $('#short_'+id).show();
		 $('#long_'+id).hide();
	 }
	 
// 	if ($(this).text().indexOf($('#show-more').text()) != '-1'){
// 		 $(this).text($('#show-less').text());
// 		 $('#short_'+id).hide();
// 		 $('#long_'+id).show();
// 	 } else {
// 		 $(this).text($('#show-more').text());
//  		 $('#short_'+id).show();
// 		 $('#long_'+id).hide();
// 	 }
	 }
 });
 
//update user feedback
 $('#feedback-user').click(function() {
		console.log('feedback-user called');
		if (! isValidUser()) {
	 		return toggleLoginModal();
		} else {	
		var q1 = $("input[name='q1']:checked"). val();
		var q2 = $("input[name='q2']:checked"). val();
		var q3 = $("input[name='q3']:checked"). val();
		var q4 = $("input[name='q4']:checked"). val();
		var q5 = $("input[name='q5']:checked"). val();
	 	var cmt = $("#uf-comment").html();
	 	console.log('cmt: ' + cmt);
		$.get("/user/feedback/update",
					    { q1: q1,  q2:q2, q3:q3, q4:q4, q5:q5, comment: cmt, ajax:'true'},
					 	   function(data, status){
					    	console.log(status);
					    	console.log(data);
					    	$('.feedback').remove();
					    	$('#uf-status').html('Thanks For your Feedback');
					    	
				});
		}
});// end feedback-user

$('.add-topic').click(function () { 
	$('#mt-ttl').html($(this).data('title'));	
	$('#addTopicModel').data('postid', $(this).data('postid'));
	var topics = $(this).data('topics');
	var postId = $(this).data('postid');
	//console.log('topics: ' + topics);
	//add all topics on popup model
// 	$.each(topics, function(index, val) {
//   	  console.log(val.category);
  // 	  $('.md-topic-list').append('  <span id="'+topics+'">'+topics+'</span>   ');
   	  var listItems = $("."+postId+" li a");
		listItems.each(function(idx, li) {
  	 $('.md-topic-list').append(' <br> <span id="'+$(li).text()+'">'+$(li).text()+'</span>   ');
  		  // and the rest of your code
	 });
// 	});

	$('#addTopicModel').modal('toggle');
});
 
$('.act-add-topic').click(function() { 
  	 console.log('act-add-topic called: '+this.id) ;
  	 var pid = $('#addTopicModel').data('postid');
  	 var tid = this.id;
  	 var status = $(this).html().indexOf('Added') != -1 ? true: false;
	if(status){
		$(this).html('Add');
		$( "ul li" ).filter('#'+tid ).remove();
	} else {
		$(this).html('<strong>Added</strong>');
		$('.md-topic-list').append('<li id="'+tid+'">'+tid+'</li>');
	}
  	$.get("/post/topic",
			{ pid: pid, tid:tid, status: status },
			  function(data, status){
			  console.log(status);
		  });
});


// jQuery when editing the Post
$('body').on('click', '.edit-post', function() { 
	if (! isValidUser()) { 		return toggleLoginModal(); 	} 
	else{
		var pid = this.id;
		var title = $('#title_'+pid).text().trim();
		var desc = $('#long_'+pid).html();
		var type = $('#post-type_'+pid).text();
	
		openEditorInModalAndSetValues(pid, "", title, desc, type, "edit", "" ); 
	}
}); 



$('.news-act-btn').click(function() { 
	console.log('news-act-btn called');
	$('.news-act-btn').css('color', '#ccc');
	$(this).css('color', 'black');
}); 
 
 
// post slider - not in use
$('body').on('click', '.pst-lst-imgxxx', function() { 
	console.log('pst-lst-img inside');
	var id = $(this).parent().closest('div').data('id');
	 var activMediaUrl = $(this).attr('src');
     var count = 0;
      console.log( id + '<>'+activMediaUrl);
     $('#custom_carousel > .carousel-inner').html('');
	 $('#custom_carousel > .controls > .nav').html('');
		
     // iterate on all img tags
     var imgId = 'long_'+id  + '.pst-lst-img';
     console.log('test 1');
 
 	var $imagemain = '<div id="image-main" style="display:none; visibility: hidden;"><div class="item"> <div class="container-fluid"> <div class="row"> <div class="col-md-12"><img style="width:580px; height:420px;" src="data:image/png;base64,iVBORw0" class="img-responsive"></div>   </div>   </div>  </div> </div>';
//	var $imagethumb = '<div id="image-thumb" style="display:none; visibility: hidden; ">            	<li data-target="#custom_carousel" data-slide-to="#count"><a href="#"><img style="width:120px;" src="data:image/png;base64,iVBORw0"></a></li>            </div>';
 	 $('#long_'+id  + ' .pst-lst-img').each(function(){
		var mediaurl = $(this).attr('src');
		 console.log('mediaurl : ' + mediaurl);
		var imagemain = $imagemain.replace("data:image/png;base64,iVBORw0", mediaurl); 
		if(activMediaUrl == mediaurl){
			imagemain = $(imagemain).addClass('active');	
		}		
		$('#custom_carousel > .carousel-inner').append(imagemain);
		
		var $imagethumb = '<div id="image-thumb" style="display:none; visibility: hidden; ">            	<li data-target="#custom_carousel" data-slide-to="'+count+'"><a href="#"><img style="width:120px;" src="'+mediaurl+'"></a></li>            </div>';
		
		// $imagethumb = $imagethumb.replace('data:image/png;base64,iVBORw0', mediaurl);
//  		$imagethumb = $imagethumb.replace('#count', count);
		 	
		$('#custom_carousel > .controls > .nav').append($imagethumb);
	    count =  count + 1;					
	});
//	var contents = $('#pw_' + id).('img').remove();
//	$('.bjqs-caption').siblings('img').remove();
//	$('.pst-lst-img').addClass('hidden');
	$('#slider-contents .row .col-md-12').html(  $('#pw_' + id).html() );	
 	console.log('open mediaModal 2');
 
//	$('#mediaModal').modal('toggle');
	
	
	$('#login-modal-header').html($('#close-btn').html() );
	$('#login-modal-body').html( $('#pw_' + id).html() );
	 
	$('#loginModal').modal('toggle');

//	toggleDynamicModal(  'title' , $('#pw_' + id).html()  ); 

	
	
	//toggleWaitModal('#loginModal' , '', $('#pw_' + id).html() );
});

// post slider
$('body').on('click', '.pst-lst-img', function() { 
	console.log('pst-lst-img inside');
	var id = $(this).parent().closest('div').data('id');
	 var activMediaUrl = $(this).attr('src');
     var $css = '<style>.primary,.thumbnail-image{background-size:cover;background-position:center center;background-repeat:no-repeat}.image-gallery{margin:0 auto;display:table}.primary,.thumbnails{display:table-cell}.thumbnails{width:300px;padding: 10px;}.primary{width:100%;background-color:#ccc}.selected .thumbnail-image,.thumbnail:hover .thumbnail-image{border:2px solid #1ade1a;}.thumbnail-image{width:100px;height:100px;margin:20px auto;border:4px solid transparent}.thumbnail{border: 0px;}.</style>';
     var $template = $css + '<div class="image-gallery"> <main class="primary" style="background-image: url(#primaryImage);"></main><div class="thumbnails"> #thumbnails</div></div>';
	 // Loop in for all images
	 var $thumbnails = "";
 	// $( $('#post-desc-panel-'+id).data('medias') ).each(function(){
 	$('#long_'+id  + ' .pst-lst-img').each(function(){
 		var $selected ="";
		var mediaurl = $(this).attr('src');
		if(activMediaUrl == mediaurl){
			$template = $template.replace('#primaryImage', mediaurl);
			$selected = "selected";
			//console.log('active media set done : ' );
		}	
		 console.log('mediaurl : ' + mediaurl);
		  $thumbnails = $thumbnails + '<a href="#" class=" '+ $selected +' thumbnail" data-big="'+mediaurl+'"> <div class="thumbnail-image" style="background-image: url('+mediaurl+')"></div>    </a>';
		// Set active media url
		
	});
	$template = $template.replace('#thumbnails', $thumbnails);
	// console.log('html : ' + $template);
	toggleDynamicModal( '' , $template ); 
}); // end .pst-lst-img

// Call this method when clicks on thumbnail
$('body').on('click', '.thumbnail', function() { 
//$('.thumbnail').on('click',function(){
var clicked=$(this);var newSelection=clicked.data('big');var $img=$('.primary').css("background-image","url("+newSelection+")");clicked.parent().find('.thumbnail').removeClass('selected');clicked.addClass('selected');
}); // end .thumbnail
    

// Related answers
$('body').on('click', '.post-ans-view', function() { 
	 if (! isValidUser()) {	 		return toggleLoginModal();     } 
	 var id = this.id;
	 if( $(this).data('status') == 'off' ) { 
//  	   if( $(this).data('avail') == 'true') {		$('#post_ext'+ id ).show();  return;	} // return if data already there
	   $('#post_ext'+ id ).css('background','white');	   $('#post_ext'+ id ).css('padding','10px');
	    $.post("/post/get/answers/ajax",
				    { pid: id},
				 	   function(data, status){				    	
				    	$('#post_ext'+id).show();
				    	$('#post_ext'+id).html(data);
				    //	$(this).data('avail','true');  
				    	$(this).data('status', 'on'); // set status
				    }); 
	 } else {
		$('#post_ext'+ id ).hide();	 
		$(this).data('status', 'off'); //set status
	 }
});// end Related answers



 // newsdata for widget
$(".dd-news-type li").click(function() {
		$("#news-type").html( $(this).html() );	
//		$.post("/widgets/news",
//				
//				{ id: this.id },
//				  function(data, status){
//				  $('.news-contents').html(data + $('#show-more-script').html() );
//		});	
		
		var data = new FormData();
		data.append("id", this.id ); 
		//data.append("type", $('#post-type').data('txt') );
		//var jsonData = { "text": encodeURIComponent(text), "type": $('#post-type').data('txt') };
		getAndSetFormDataForAjaxCall("/widgets/news", '.news-contents', data);
		
});



/*
 * reset notification count to 0 and get back notification list
 */
$('#notifblk').click(function() {
		console.log('notifblk called');
		$("#notifcnt").hide();
		var url = "/user/resetnotif";
		setCsrfToken();
		$.post(url, function(data, status) {
			var html =  "";
		 	$.each(data.notificationDatas, function(i, item) {
		  		  html = html + '<li style="margin: 2px; padding:4px; "> <img style="width: 17%" class="img-circle" src=" '+ item.notificationUser.profilePic +'">	<a style="width: 80%; float: right; font-size: 12px; padding-left: 1px;" href="/' + item.typeName + '/' + item.titleSeo + '"> <div><strong>' + item.firstName + '</strong> <span class="pull-right text-muted"><em>'+  item.creationTimeFormatted + '</em></span></div> <div> ' + item.message + '<div style="font-size: 11px; float: right"></div></div> </a></li>';
			});
			html = html + '<li class="divider"></li><li><a class="text-center" href="">Read all Notifications</a></li>';
			$('.notif-message').html(html);			
		});
});

 

$('.btn-search-add-qs').click(function() {
						console.log('btn-search-add called xx');
						if (!isValidUser()) {
							return toggleLoginModal();
						} else {
								return openEditorInModalAndSetValues("", "",$(".searchBarInput").text(), "", $('#btn-search-add').text(), "add", "" ); 
						}						
});

$('#contact-form').bootstrapValidator({
//        live: 'disabled',
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Name: {
                validators: {
                    notEmpty: {
                        message: 'Add your name here'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The email address is not valid'
                    }
                }
            },
            Message: {
                validators: {
                    notEmpty: {
                        message: 'Add your question here'
                    }
                }
            }
        }
    });

	$(document).ready(function() {
		$('#myCarousel').carousel({
			interval : 400000
		});

		var clickEvent = false;
		$('#myCarousel').on('click', '.nav a', function() {
			clickEvent = true;
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');
		}).on('slid.bs.carousel', function(e) {
			if (!clickEvent) {
				var count = $('.nav').children().length - 1;
				var current = $('.nav li.active');
				current.removeClass('active').next().addClass('active');
				var id = parseInt(current.data('slide-to'));
				if (count == id) {
					$('.nav li').first().addClass('active');
				}
			}
			clickEvent = false;
		});
	});


$('#add-post-short').click(function() {	
	 var title = $('#post-title-short').val().trim();
	 if ( title.length < '15') {
		alert('Post title is too short, please add more ...');
			return;
	 }
var jsonData = { "status":"open", "title": title,  "type":"question" , "source": "queshub", "isAnonymous":"false", "creationTime" : $.now() };
 $('#add-post-short').text('Adding post, please wait...');
if (!isValidUser()) {
							return toggleLoginModal();
						} else {
	$.ajax({
							        url: '/post/addorupdate',
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
							       		console.log('data' + data.status);
								     	$('#post-title-short').val('');
								     	showClosableAlertMessage(data.message);
								     	 $('#add-post-short').text('Question posted');
							        },
							        error: function(jqXHR, textStatus, errorThrown)
							        {
							            console.log(errorThrown);
							            $('#edtr-add-post').text('Error, Try again later..');
							        }
						});	
			}			
	});		//end add-post-short			
	$('#post-title-short').keypress(function() {
		if($('#add-post-short').text() != 'Ask your question' ) {
			$('#add-post-short').text('Ask your question');
		}
	});


 {
}

$('#navbar-lnk').click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");


    if( $('#navbar-lnk > span').hasClass('ion-navicon-round') ){
    	    $('#navbar-lnk > span').removeClass('ion-navicon-round').addClass('ion-close-round');
    	    	// $('#contents-area').css('margin-left', '13%'); // shit main contents to left
    } else {
        	$('#navbar-lnk > span').removeClass('ion-close-round').addClass('ion-navicon-round');
        	//	$('#contents-area').css('margin-left', '0%'); // shit main contents to left
    }    	
});


$('body').on('click', '.sch-quiz-modal', function() { 
if (! isValidUser()) {
		  toggleLoginModal( );
		  $('.alert').alert('close'); 
	} 
	else 
	{
	  console.log('sch-quiz-modal called');
	  toggleWaitModal( );    	
	   $('.alert').alert('close'); 
   
   }
//	setTimeout(function(){			  $('.alert').fadeOut() 		}, 100); 
});
// setTimeout(function() { $('#myModal').modal();   toggleWaitModal('#loginModal' , '#sch-quiz-hdr', '#sch-quiz-body'); }, 2000);


// var timeoutId = 2000;
// $(function() {
// 	timeoutId = setTimeout(function() {  toggleWaitModal('#loginModal' , '#sch-quiz-hdr', '#sch-quiz-body');  }, 3000);	 
// });

$('.demo-closex').click(function(){	  		console.log('stop timeout');	  clearTimeout(timeoutId);   	});
 

// setTimeout( function() { triggerBottomRightAlertMessage( $('#msg-alert-quiz').html() ); }, 1000); // trigger message alert 
//setTimeout("     $('#loginModal').modal('toggle');  ", 3000);
 //toggleWaitModal('#loginModal' , '#sch-quiz-hdr', '#sch-quiz-body');  	

// Schedule Quiz 
$('body').on('click', '#sch-quiz', function() { 
	if (! isValidUser()) { toggleLoginModal( );	} 
	else 
	{	     	
        console.log('scheduling quiz<>'   + $('#datetimepicker4').val());
        toggleWaitModal(  );
		setCsrfToken();
		$.post("/quiz/request",
		{ stime: $('#datetimepicker4').val() },
		function(data, status){
			if(data.status) {
				toggleSuccessModal('Congratulations !!!' , data.message);
			} else {				
				toggleSuccessModal('Error : ' , data.message);
			}
			toggleWaitModal(  );
		});
	} // end else
});	       

$('body').on('click', '#datetimepicker4', function() { 
    $('#datetimepicker4').datetimepicker({  daysOfWeekDisabled: [0, 6] });
});

$(document).ready(function(ev){
    $('#custom_carousel').on('slide.bs.carousel', function (evt) {
      $('#custom_carousel .controls li.active').removeClass('active');
      $('#custom_carousel .controls li:eq('+$(evt.relatedTarget).index()+')').addClass('active');
    })
});

$('body').on('click', '.manage-widget', function() { 
	  console.log('.manage-widget called');
if (! isValidUser()) { toggleLoginModal( );	} 
	else 
	{	
		$.post("/widgets/widget/all",
		function(data, status){
			 console.log(data+ "<>" + status);
			 var html = '<div class="row">';			    	  
			$.each(data.widgets, function(i, item) {
			//console.log(i+ "<>" + item.isFollowing);
					if( item.isFollowing  == 'true'){							 			 
					 	html = html + item.miniBody.replace( '#action#' , ' <button data-status="' +item.isFollowing+ '" data-id="' +item.id+ '" class="btn btn-default btn-success follow-widget">Following</button>' );
					} 
					else {
					    html = html + item.miniBody.replace( '#action#' , ' <button data-status="' +item.isFollowing+ '" data-id="' +item.id+ '" class="btn btn-default follow-widget">Follow</button>' );
					}
				});
				html = html + '	</div> '; 
			  toggleDynamicModal(  '' , html );   
			});
		}
});	          

$('body').on('click', '.manage-topic-modal', function() { 
	$('#post-type').data('txt','topic')
	
	setCsrfToken();
	$.post("/user/topics",	  
		function(data, status){	 	
			var html  = $('.search-bar-block').html() + '<ol>';			
			$.each(data, function(index, content) {  
			html = html + '<li style="width: 100%; float:left"><a href="/topic/'+ content.titleSeo +'"> <div class="item">  <img class="img-circle" src="http://via.placeholder.com/50x50"> <span class="item-info"> '+ content.title +'</span>    </div> </a></li>  ';
		 });	
		 html += '</ol> ';
// 		   html = html + '<li class="divider" style="width:100%"></li><li><div class="text-center manage-topic-modal" >Add Topics</div></li>';		  
//	   	$('.search-result-lst').html(html);
//		$('.search-result-lst').show();		
		
	 // open modal
	 toggleDynamicModal( '' , html ); 
	 
	 });	  
	 
	
});


$('body').on('click', '.follow-widget', function() { 
if (! isValidUser()) { toggleLoginModal( );	} 
	else 
	{		
	var url = "/widgets/aor/";
	var id = $(this).data('id');
	console.log( $(this).data('status'));
	
	if (! $(this).data('status') ) {
		url = url +'add';	
		$(this).text('Following');
		$(this).addClass('btn-success');
		$(this).data('status', 'true' );
	} 
	else {
		url = url + 'remove';
		$(this).text('Follow');
		$(this).removeClass('btn-success');
		$(this).data('status' ,'false' );
	}

	console.log( url +'<>'+ $(this).data('status'));
	$.post( url ,
		{ "wid":  id } ,
		function(data, status){
			console.log(data+ "<>" + status);
	   });
	}
});



$('body').on('click', '.post-job-modal', function() { 
	toggleMsgModal("#jobModal");
});

$('body').on('click', '#post-job', function() { 
if (! isValidUser()) { toggleLoginModal( );	} 
	else 
	{
		console.log('inside post-job');
		if( $('#jobTitle').val() != ''  ||  ( $('#employerName').val() != '' && $('#employerContact').val() != ''  ) ) {
			var jsonData = { title : $('#jobTitle').val(), location:$('#location').val(), jobType:$( "#jobType option:selected" ).text() , description:$('#jobDescription').val(), companyName:$('#employerName').val(), contact: $('#employerContact').val(),  jobUrl:$('#jobUrl').val(), experience: $('#experience').val(), aboutCompany:$('#aboutEmployer').val(), creationTime: $.now(), modifiedTime:$.now()  };
			console.log('jsonData: '  + JSON.stringify(jsonData ) );
			getAndSetDataForAjaxCall("/jobs/save", "", jsonData) ;	
		} else {
			$('.job-form-msg').html('Required all mandatory fields ( marked * ) ');
		}
	}
});
$('body').on('click', '.job-apply', function() { 
		console.log('inside job-apply');
		var jsonData = { id: $('#job-block').data('id'), uid:$('body').data('uid') , creationTime: $.now(), modifiedTime:$.now()  };
		console.log('jsonData: '  + JSON.stringify(jsonData ) );
		getAndSetDataForAjaxCall("/jobs/apply", "", jsonData) ;	
		$('.job-apply').html('Applied For job!');
});		


// get answered or latest post for main contents
		
	

// show - less contents
$('.read-more-content').addClass('hide');
$('.read-more-show, .read-more-hide').removeClass('hide');
		
		// Set up the toggle effect:
$('.read-more-show').on('click', function(e) {
		  $(this).next('.read-more-content').removeClass('hide');
		  $(this).addClass('hide');
		  e.preventDefault();
		});
		
		// Changes contributed by @diego-rzg
$('.read-more-hide').on('click', function(e) {
		  var p = $(this).parent('.read-more-content');
		  p.addClass('hide');
		  p.prev('.read-more-show').removeClass('hide'); // Hide only the preceding "Show More"
		  e.preventDefault();
});
		

        	
// FUNCTION START 	
function isValidUser (){
	console.log('valid: ' + $('#ivu').data('text') );
	return $('#ivu').data('text');
}

// function to set values for Post editor Modal and open it
function openEditorInModalAndSetValues(pid, aid, title, desc, type, action, status ){
	console.log('inside openEditorInModalAndSetValues');
	title = title != undefined ? title : "";
	console.log(pid+'<>'+aid+'<>'+title+'<>'+type +'<>'+action+'<>'+status);
	
	// Set editor contents like title, description etc
	$('#post-title').text(title);  // post title
	$('.note-editable').html(desc); // post description
	$('.edtr-post-type').text(type);
	
	// Set data attribute
	$('#addEditPostModel').data('pid', pid);
	$('#addEditPostModel').data('aid', aid);
	$('#addEditPostModel').data('type', type);
	
	// Reset button text
    $('#edtr-add-post').html("<span class='glyphicon glyphicon-plus'></span> Add");
     $('#edtr-add-post').html("<span class='glyphicon glyphicon-plus'></span> Add");
	$('#edtr-add-answer').html("<span class='glyphicon glyphicon-plus'></span> Add");			
	$('.modal-header > div> div> textarea').prop('disabled', false);
	
	// hide all buttons
	$('#edtr-post-type').hide(); 
	$('button#edtr-add-post').hide();
	$('button#edtr-save-post').hide(); 
	$('#edtr-add-answer').hide();
	$('#edtr-save-answer').hide();
	$('#edtr-cancel').show();    //set to show as it's required to close modal			
	$('.modal-header').show();
	   
	if(action == 'add') {
		console.log('action: ' + action);		
		if(type == 'answer'){
			$('.modal-header').show();
			$('.modal-header > div> div> textarea').prop('disabled', true);
			$('#edtr-add-answer').show();
			// $('#edtr-save-answer').show();
		} else {	
			 $('#edtr-post-type').show(); 
			 $('button#edtr-add-post').show();
			//  $('button#edtr-save-post').show(); 			
		}
	}	
	if(action == 'edit') {
		$('button#edtr-add-post').hide();
		if(type == 'answer'){			
			$('.modal-header').show();
			$('.modal-header > div> div> textarea').prop('disabled', true);
			$('#edtr-save-answer').show();			
		} else {
			 $('#edtr-post-type').show(); 
			 $('button#edtr-save-post').show();
		}
	}
	
	$('#addEditPostModel').modal('show').focus();
//	   $( ".note-editable" ).focus();
} // end openEditorInModalAndSetValues()

var searchBarInput = $(".searchBarInput");
var clearSearchBtn = $(".clearSearchBarField");
 
$('body').on('keyup', '.searchBarInput', function(e) {	 if( $(this).val().length === 0 ) {			$(".clearSearchBarField").hide()		} else {			$(".clearSearchBarField").show()		}	  });
 
function resetInput() {	$(".clearSearchBarField").hide();	$('.search-result-lst').html(''); $(".searchBarInput").val('').focus(); 	 }
 
$('body').on('keyup', '.searchBarInput', function(e) {			 	 
	 	console.log('key code: ' + e.keyCode  + "<>" + $(this).val() );
//	 	var stxt = $(this).val();
	 	e.stopPropagation();
		if (e.keyCode === 0 || e.keyCode === 32 || e.keyCode == 91 || e.keyCode == 49) {						e.preventDefault();
			return;
		}
		var text = $(this).val();
		var type = $('#post-type').text();
		if ( e.keyCode == 13 ) {
						console.log('enter key pressed');
						// search text based on search  text
						if(isValidUser()) {
							if ( text.length < '2' ) { return;						 }
						     window.location.href = "/search?q=" + text.replace(/\s+/g, '-').toLowerCase() ;
			} else { return toggleLoginModal(); }						
		}
 					
 		 $('#post-title').text(text);					
						console.log(encodeURIComponent(text) + '<x>'+ $('#post-type').data('txt'));
 						setCsrfToken();
						$.post("/search/suggestion", {"type": $('#post-type').data('txt'), "text":  text }, 
							function(data, status) {
							    var html = "";
						 		$.each(data, function(i, item) {
						 			if( item != undefined ){							 			 
							 			var url = item.type.toLowerCase()+'/'+ item.titleSeo;
							 			if(item.type == 'user') {	 url = item.type+'/profile/'+ item.titleSeo;	}
							 			 html = html + '<li class="list-group-item"><div id="'+item.id+'" data-type="'+item.type+'" data-status="'+item.isFollowing+'" data-count="'+item.followerCount+'" class="follow-btn follow-btn-srch" title="Click to follow" >'+item.followerCount+' Follower </div><span class="pad-lt-5" style="text-transform:capitalize;" ><a href="/' +url+ '" ><b>' + item.title + '</b></a></span><div><span class="post-stats pad-rt-5" style="text-transform: capitalize">' +item.type+ '</span><span class="post-stats"> '+item.viewCount+' View </span> <span class="post-stats">'+ item.answerCount +' Answer </span> </div></li>'
									 }
								});
							$('.search-result-lst').html(html);
							$('.search-result-lst').show();		
						});					 
}); // end 


// method to report a post as abuse
$('.question-tabs').click(function() {
	  
 	 $.post("/post/get/latest",
				{ pid:"111"},
				   function(data, status){
					console.log(data + 'status: '+ status);
	 });
		 
});


$(function() {
    var names = [];
     var contents = [];
     console.log('loading files');

    $('body').on('change', '.picupload', function(event) {
        var getAttr = $(this).attr('click-type');
        var files = event.target.files;
        var output = document.getElementById("media-list");
        var z = 0
        if (getAttr == 'type1') {

            $('#media-list').html('');
            $('#media-list').html('<li class="myupload"><span><i class="fa fa-plus" aria-hidden="true"></i><input type="file" click-type="type2" id="picupload" class="picupload" multiple></span></li>');
            $('#hint_brand').modal('show');

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                names.push($(this).get(0).files[i].name);
                if (file.type.match('image')) {
                    var picReader = new FileReader();
                    picReader.fileName = file.name
                    picReader.addEventListener("load", function(event) {
                        var picFile = event.target;
                        var div = document.createElement("li");

                        div.innerHTML = "<img src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'/><div  class='post-thumb'><div class='inner-post-thumb'><a href='javascript:void(0);' data-id='" + event.target.fileName + "' class='remove-pic'><i class='fa fa-times' aria-hidden='true'></i></a><div></div>";
                        $("#media-list").prepend(div);
                    });
                   //console.log( picFile.result );
                } else {
                    var picReader = new FileReader();
                    picReader.fileName = file.name
                    picReader.addEventListener("load", function(event) {
                        var picFile = event.target;
                        var div = document.createElement("li");
                        div.innerHTML = "<video src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'></video><div id='" + z + "'  class='post-thumb'><div  class='inner-post-thumb'><a data-id='" + event.target.fileName + "' href='javascript:void(0);' class='remove-pic'><i class='fa fa-times' aria-hidden='true'></i></a><div></div>";
                        $("#media-list").prepend(div);
					//console.log('picFile.result: ' + picFile.result);
                    });
                }
               picReader.readAsDataURL(file);
              // console.log( picFile.result );
            }
//            console.log(names);
        } else if (getAttr == 'type2') {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                names.push($(this).get(0).files[i].name);
                if (file.type.match('image')) {

                    var picReader = new FileReader();
                    picReader.fileName = file.name
                    picReader.addEventListener("load", function(event) {

                        var picFile = event.target;
                        var div = document.createElement("li");
						console.log('picFile.name : ' +picFile.name);
//						console.log('picFile.result: ' +picFile.result);
                        div.innerHTML = "<img width=\"50%\" src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'/><div  class='post-thumb'><div class='inner-post-thumb'><a href='javascript:void(0);' data-id='" + event.target.fileName + "' class='remove-pic'><i class='fa fa-times' aria-hidden='true'></i></a><div></div>";
						$('.modal-title').prepend(div.innerHTML);
			            $("#media-list").prepend(div);
                        contents.push(picFile.result);
   					
                    });
                } else {
                    var picReader = new FileReader();
                    picReader.fileName = file.name
                    picReader.addEventListener("load", function(event) {

                        var picFile = event.target;

                        var div = document.createElement("li");

                        div.innerHTML = "<video src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'></video><div class='post-thumb'><div  class='inner-post-thumb'><a href='javascript:void(0);' data-id='" + event.target.fileName + "' class='remove-pic'><i class='fa fa-times' aria-hidden='true'></i></a><div></div>";

                        $("#media-list").prepend(div);
						console.log('picFile.name : ' +picFile.name);
						//console.log('picFile.result: ' +picFile.result);
						contents.push(picFile.result);
		            });
                }
                
                $('#conv-file').html('Convert For Free');
                picReader.readAsDataURL(file);

            }
            // return array of file name
        }
    });


$('body').on('click', '.remove-pic', function() {
		//console.log('remove-pic called');
        $(this).parent().parent().parent().remove();
        var removeItem = $(this).attr('data-id');
        var yet = names.indexOf(removeItem);
        if (yet != -1) {
            names.splice(yet, 1);
        }
    });
    $('#hint_brand').on('hidden.bs.modal', function(e) {
        names = [];        z = 0;
    });
    
//AJAX JQUERY CALL TO POST QUESTION
$('#edtr-add-post').click(function() {
						//console.log('add-post yy called x');
						var id = $('#postEditorModal-pid').text();
						var btn = $(this).text();
						var txt = $("#input-search").html();
						var title = $('#post-title').val();
						var desc = $('.note-editable').html();
						var type = $('.post-type-selected').val();
						console.log('type xx: ' + type);
						
			 
						var anon = false;
						if ($('#anon').is(":checked")) { anon = true;						}
						if ( title.length < '5') {
							alert("It's too short to be a post's title, please add more ...");
							return;
						}
						
						//var isValidUser = $('#ivu').text().indexOf('true') != -1 ? true : false;
						if (!isValidUser()) {
							return toggleLoginModal();
						} else {
							$('#add-post').text('Adding post, please wait...');
						 
							 var jsonData = { "status":"open", "title": title, "description":desc, "type":type , "source": "queshub", "isAnonymous":anon, "creationTime" : $.now() };

							 $('#edtr-cancel').hide();
							 $('#edtr-save-post').hide();
							 $('#edtr-add-post').text('Adding post, please wait...');
							$.ajax({
							        url: '/post/addorupdate',
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
//							       		showClosableAlertMessage(data.message);
								        $('.search-result-lst').html('');
										$("#input-search").html('');
										$('#myModalLabel').html('');
										$('.modal-pst-status').css("display","block");
										$('#post-dtl-hnt').html('');
										$('.edit-post').data('pu-desc', '');
										$('.note-editable').html('');
										$('#post-title').html('');
										addEditPostModalToggle('#addEditPostModel');
										  // show alert message
										 $('#add-edit-modal-msg').html(data.message);
										 // increase count
										 // $('#area-post').html( +($('#area-post').text()) +1 );
										 window.location.href = data.redirectUrl; // redirect to post detail page
							        },
							        error: function(jqXHR, textStatus, errorThrown)
							        {
							            console.log(errorThrown);
							            $('#edtr-add-post').text('Error, Try again later..');
							        }
						});		
					}
});

//AJAX JQUERY to convert file
$('#conv-file').click(function() {
							var cnvto = $('#cnvto :selected').text();
							
							if(contents.length < 1) { return;}
							
							if (!isValidUser()) {
								return toggleLoginModal();
							} else {
									var data = new FormData();
									data.append("desc", contents); 
									data.append("cnvto", cnvto);
									//console.log('data: ' + data);
									$('#conv-file').text('Converting file...');
			
									$.ajax({
									        url: '/file/media/convert',
									        type: 'POST',
									        data: data,
									       // cache: false,
									        dataType: 'text',
									        processData: false, // Don't process the files
									        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
									        headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') },
									        success: function(data, textStatus, jqXHR)
									        {
										       //console.log('data: ' + data);
										       $('#conv-file').html("<a target='_blank' href='/medias/processed/" +  data + "'>Download Now </a>");										       	
												var div = document.createElement("li");
												div.className = "myupload";
												var html = $('#media-list > .myupload').html();
					            				div.innerHTML = html;
					            				$('#media-list').html('');
					            			     $("#media-list").prepend(div);
		        							     
		        							     contents.splice(0,contents.length); // clear contents array
									        },
									        error: function(jqXHR, textStatus, errorThrown)
									        {
									        	console.log('error');
									        	$('#conv-file').text('Failed, try again');									           
									        }
								});		
// 					  
							}
 });
 
 
 

// Starting functions
function insertData(myValue) {
        if (document.selection) {
                this.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
        }
        else if (this.selectionStart || this.selectionStart == '0') {
            var startPos = this.selectionStart;
            var endPos = this.selectionEnd;
            var scrollTop = this.scrollTop;
            this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
            this.focus();
            this.selectionStart = startPos + myValue.length;
            this.selectionEnd = startPos + myValue.length;
            this.scrollTop = scrollTop;
        } else {
            this.value += myValue;
            this.focus();
        }
    }
}); // end function()

// login start
var locd=false;
$(document).ready(function(){
if(!locd) {
console.log('calling geoip');
$.ajax({
           url: "https://geoip-db.com/jsonp",
           jsonpCallback: "callback",
           dataType: "jsonp",
           cache: true,
           success: function( location ) {
            getFormDataAndReturnForAjaxCall("/user/locale/setting", location);  			// set data
           }         
});  
} 

$('body').on('click', '.verify-email', function(e) { 
	console.log('verify-email log');
	$('.verify-email-msg-block').html('<strong>Sending a verification email, please wait...</strong>');
	 $.post("/user/send/verification/email",
			{ },
			function(data, status){
			$('.verify-email-msg-block').html('<strong>We have sent you a verification email, please check a QuesHub Message "Confirm your email Id", Thanks! </strong>');
			console.log('message: '+data.message);
	  });
});


$(function(){
				$('body').on('click', 'button[type="submit"]', function(e) { 
	            	console.log('button pressed: ' + $(this).text());
	                //e.preventDefault();
	               if($(this).text().indexOf('Register') != -1 ) {
	               		e.preventDefault();
	                	if($('#username').val() == null || $('#passwordfield').val() == null) return;
	                	 if( !validateEmail($('#username').val()) ) { $(".stats-msg").html($('#msg-wrng-eml').html());	  return;  }
	                
	                	if ( $('#regst-plc').is(":checked") )  { 
	                	$(this).html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Please wait');   

        				toggleWaitModal(); // open message modal
        				$.ajaxSetup({  headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') }  });
	     	            $.post("/user/register",
							{ "uid": "", email: $('#username').val(), pwd: $('#passwordfield').val()},
				   		 	 function(data, status){
				   		 	 console.log('data: ' + data);
				   		 	 if (data == 'true'){
				   		 	 	$('#status-msg').html('<span class="success">You have successfully registered, please login now</span>');
				   		 	 	$('.login').html('Login');
				   		 	 } else {
				   		 	 	$('#status-msg').html('<span class="error">* Please try different email id</span>');
				   		 	 	$('.login').html('Register');				   		 	 	
				   		 	 }
				   		 	 toggleMsgModal('#waitModal');								
						 });  	
					  } else {
					  		$('.stats-msg').html('<span class="error">* Please select privacy policy</span>');					  		
					  }						  
	                }
	                // Reset password
	                else if($(this).text().indexOf('Reset') != -1 ) {
	                
	                	toggleWaitModal();
	                	
	                	e.preventDefault();
	                	console.log('reset password btn called 1');
	                	$.ajaxSetup({  headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') }  });
	                	$.post("/user/password/reset/process",
						{ email: $('#username').val()},
					   		function(data, status){
							console.log('status: '+status);
							if(status == 'success') {
								$('#status-msg').html('<strong>* Please check your email for reset password link</strong>');
								$('#username').val('');
							} else {
								$('#status-msg').html('Please try after sometime');
							}
							 
						 toggleWaitModal(); // close wait
						});
	                }	  
	                else if($(this).text().indexOf('Login') != -1 ) {         
						//openMsgModal('#infoModal' , '#msg-wait-hdr', '#msg-wait-body');
	                 }  
	            });  
	                
}); // end document

$('.forgot-pass').click(function(event) {
   $(".pr-wrap").toggleClass("show-pass-reset");
}); 

$('.pass-reset-submit').click(function(event) {
  $(".pr-wrap").removeClass("show-pass-reset");
});

	
$('.continue').click(function(event) {
  	$.get("/ttt",
	    		{  },
	 	   function(data, status){
	 });
});	 
    
$("#passwordfield").on("keyup",function(){
	    if($(this).val())
	        $(".glyphicon-eye-open").show();
	    else
	        $(".glyphicon-eye-open").hide();
});
	
	
$(".glyphicon-eye-open").mousedown(function(){
          $("#passwordfield").attr('type','text');
           }).mouseup(function(){
	            	$("#passwordfield").attr('type','password');
           }).mouseout(function(){
          	$("#passwordfield").attr('type','password');
});
 
 			 
$("input[type='text']").keyup(function(e) {
	console.log('login form');
    $("#error-msg").html('');
 
  	var email = $.trim( $("input[type='text']").val() );
 		if( !validateEmail(email) ) {	    
	    	 return;
  	}
	if(! (email.indexOf('@')!= -1)) {return;}                
	var btnstatus = $('.register-block').text().indexOf('Register') != '-1' ? true : false;
	// validate email whether it is exist
	// $.post("/user/exist",
// 				{ email : email},
// 				   function(data, status){
// 				   var isTrueSet = (data == 'true');
// 				   
// 				   if(btnstatus ){
// 					   	isTrueSet = !isTrueSet;
// 				   } 
// 				   
// 				   if(isTrueSet){
// 				  		$('span#username-status').html('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');				  		
// 				   } else {
// 				  		$('span#username-status').html('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
// 				   }
// 	});
	
	
	//	var data = new FormData();
//		data.append("email", email ); 
		var jsonData = { "email" : email};
		 
		// $.ajax({  
// 		  	url: "/user/exist",
// 	        type: 'POST',
// 	        async: true,
// 	        data: JSON.stringify(jsonData),
// 	        cache: false,
// 	        dataType: 'json',
// 	        processData: false, // Don't process the files
// 	        contentType: 'application/json', // Set content type to false as jQuery will tell the server its a query string request
// 	        headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') },
// 		 success: function(data, textStatus, jqXHR) {
// 			console.log('data: ' + data.isExist );
// 			 var isTrueSet = (data.isExist == 'true');
// 				   if(btnstatus ){
// 					   	isTrueSet = !isTrueSet;
// 				   } 
// 				   
// 				   if(data.isExist){
// 					   	$('#username-status').html('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
// 				   } else {
//   				  		$('#username-status').html('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');				  		
// 				  		
// 				   }
// 		},
// 		statusCode : {
// 			404 : function(content) {
// 				console.log('404 error');
// 			},
// 			500 : function(content) {
// 				console.log('500 error');
// 			}
// 		},
// 		error : function(req, status, errorObj) {
// 			console.log(status  + '<>' + errorObj );
// 		}
// 	});
	
});  

$('body').on('click', '#login-register', function() { 
	console.log('register called');
	$(".register-block").hide();
	$(".login").text('Register');
	$('#go-back').removeClass('hide');
	$('.regst-plcy-blk').css('display','block');
});
  
$('body').on('click', '#reset-password', function() { 
	console.log('reset password called');
	$(".register-block").hide();
	$(".password-block").hide();	
	$(".login").text('Reset Password');
	$('#go-back').removeClass('hide');
	$(".lgn-scl-blk").css('display','none');
	$(".sv-prfl").css('display','none');	

});
 
$('body').on('click', '#go-back', function() { 
	 	console.log('go-back');
		$("#error-msg").html('');
//		$("#form-login").show();
		$(".register-block").show();
		$('.login').html("Login");
		$('span#username-status').html('');
		$(".password-block").show();
		$('#username-status').html('');
		$('#go-back').addClass('hide');		
		$('.regst-plcy-blk').css('display','none');
		$(".lgn-scl-blk").css('display','block');
		$(".sv-prfl").css('display','block');
		$(".stats-msg").html('');
	 });	
}); //end function
$('body').on('click', '#username', function() { 
	    $('.stats-msg').html('');
});

$(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');       
        }
    );
});

// function start
function validateEmail(sEmail) {    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;    if (filter.test(sEmail)) {        return true;    }    else {        return false;	}}
// login end
function addEditPostModalToggle(modalId){	$(modalId).modal('toggle');}
// this method will generate a string based on count, status and action name 
function getPostActionString(action, status, cnt) {
	console.log('getPostActionString:' + firstCapChar(action));
	if (status){ if(cnt > 1) { return ('&nbsp;' +firstCapChar(action) +'s'+' ' +cnt ); } else {return ('&nbsp;' +action + ' ' + cnt );}
	} else { if(cnt > 1) { return ('&nbsp;'+'<strong>' + action +'s' + ' ' + cnt + '</strong>' ); } else { return ('&nbsp;'+'<strong>' + action + ' '+ cnt +'</strong>')}  }	
}
// Get counts of a post
function getPostActionCount(status, cnt) {	if (status){ return  +cnt - 1}	 else {return  +cnt + 1 }  		}
// first letter in Cap like upvote to Upvote
function firstCapChar(name) {	return	name.charAt(0).toUpperCase() + name.slice(1);}
function setCsrfToken() {	$.ajaxSetup({  headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') }  });}
// verify user email check
function isVerifiedUser() {	if ( $('body').data('veri') ) {		return true;	} else {		return false;	}}
// Open msg modal
// Open msg modal
function toggleWaitModal ( ) {	$('#wait-modal-header').html( $('#msg-wait-hdr').html() );	$('#wait-modal-body').html( $('#msg-wait-body').html() ); 	$('#waitModal').modal('toggle'); }
function toggleSuccessModal ( hdr, body) {	$('#success-modal-header').html( hdr );		$('#success-modal-body').html( body );	$('#infoModal').modal('toggle'); }
function toggleDynamicModal ( hdr, body) {	$('#dynamic-modal-header').html( hdr );	$('#dynamic-modal-body').html( body ); 		$('#dynamicModal').modal('toggle'); }
function toggleLoginModal ( ) {  $('#login-modal-header').html( $('#login-msg-hdr').html() );	$('#login-modal-body').html( $('#login-msg-body').html() );		$('#loginModal').modal('toggle');}
function toggleMsgModal (modalId) {	$(modalId).modal('toggle');}
// function end
//un comment below line disable console logs
console.log = function() {}
