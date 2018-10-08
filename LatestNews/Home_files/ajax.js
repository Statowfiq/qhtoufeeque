//Trigger an Ajax call, get data from server then set it in html page
function getAndSetDataForAjaxCall(url, rid, jsonData) {
	// console.log('getAndSetDataForAjaxCall<>'+ url + '<>' + rid + '<>'+ jsonData );
	$.ajax({  
		  	url: url,
	        type: 'POST',
	        async: true,
	        data: JSON.stringify(jsonData),
	        cache: false,
	        dataType: 'json',
	        processData: false, // Don't process the files
	        contentType: 'application/json', // Set content type to false as jQuery will tell the server its a query string request
	        headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') },
		 success: function(data, textStatus, jqXHR) {
			//console.log('data: ' + data );
			$(rid).html(data);
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
			console.log(status  + '<>' + errorObj );
		}
	});
}//end getAndSetDataForAjaxCall


function getAndSetFormDataForAjaxCall(url, rid, data) {
	
	$.ajax({  
		  	url: url,
	        type: 'POST',
	        async: true,
	        data: data,
	        cache: false,
	        dataType: 'text',
	        processData: false, // Don't process the files
	        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	        headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') },
		 success: function(data, textStatus, jqXHR) {
			$(rid).html(data).show();
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
			console.log(status  + '<>' + errorObj );
		}
	});
}//end getAndSetFormDataForAjaxCall


function getFormDataAndReturnForAjaxCall(url, jsonData) {
	 
	$.ajax({  
		  	url: url,
	        type: 'POST',
	        async: false,
	        data: JSON.stringify( jsonData),
	        cache: false,
	        dataType: 'json',
	        processData: false, // Don't process the files
	        contentType: 'application/json', // Set content type to false as jQuery will tell the server its a query string request
	        headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') },
		 success: function(data, textStatus, jqXHR) {
			return data;
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
	
	 
}//end getAndSetFormDataForAjaxCall


function getAndSetDataForPostCall (url, rid, data) { 
	console.log('getAndSetDataForPostCall<>'+ url + '<>' + rid + '<>'+ data );
	$.ajaxSetup({  headers: { 'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content') }  });
	$.post(url,
						{ pid: data},
					   		function(data, status){
							$(rid).html(data);					
							
	});
}						
												