/*$(window).on('load', function () {
    if ($("body").attr("data-newUser") == 'true') {
        
        // $('#myTopics').modal('show');
       
        
    }
});*/

$(window).on('load', function () {
    $('#myTopics').modal({
        backdrop: 'static',
        keyboard: false
    });
}); 

$(document).ready(function () {

    // if(('body').data('firstTime') eq true) { 

    var hmtlData = null;
    var userResponse = {
        "status": "success",
        "data": [
            {
                "uid": "12131",
                "firstName": "Towfeeque",
                "profileUrl": "https://www.w3schools.com/howto/img_avatar.png"
            },
            {
                "uid": "12133",
                "firstName": "Nasim",
                "profileUrl": "https://www.w3schools.com/howto/img_avatar2.png"
            },
        ]
    };
    $.ajax({
        url: "http://rest-service.guides.spring.io/greeting" // TODO: Change the link to whatever
    }).then(function (data) { // TODO: change the 'data' to userResponse
        if (userResponse.status === 'success') {
            for (var i = 0; i < userResponse.data.length; i++) {
                htmlData = ' <div><img src="' + userResponse.data[i].profileUrl + '" class="userImg" alt="Avatar" style="width:30px" class="displayInline">';
                htmlData += '<h4 class="displayInline secondaryColor pl-1">' + userResponse.data[i].firstName + '</h4>';
                htmlData += '<button id="' + userResponse.data[i].uid + '" type="button" class="btn btn-default displayInline pull-right follow-btn">Follow</button></div>';
                $('#modalBody').append(htmlData);
            }
        }
    });

    var topicResponse = {
        "status": "success",
        "data": [
            { "id": "1212", "name": "Art", "profileUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5QyESEPa5Y23i4oMUFqWZQy7Xi6vJPn2Sw_YvhPcBbD-HdQcq" },
            { "id": "1213", "name": "Technology", "profileUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuVk0S5hAFiK5TaP7cNhiyMEyxEY6kpQswth10zoDTyWZKEBRPqQ" },
            { "id": "1214", "name": "Coding", "profileUrl": "https://images.yourstory.com/2018/03/coding-job.png?auto=compress" },
            { "id": "1215", "name": "Food and drink", "profileUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9AyVCSf_qRYUL_UuWkIk3H7ofFgfmR-AfoVo84D4dFMk_QJPB" },
                       
            
        ]

    };

    var topicHtml = null;
    if (topicResponse) {
        if (topicResponse.status == "success") {
            for (var i = 0; i < topicResponse.data.length; i++) {
                topicHtml = '<div class="col-md-3 commonPadding imageButton">';
                topicHtml += '<div id="imageContainer" class="imageStyle" style="background-image: url('+ topicResponse.data[i].profileUrl +');">';
                topicHtml += '<p class="text-light topicName"> ' + topicResponse.data[i].name + '</p>';
                topicHtml += '<div id="' + topicResponse.data[i].id + '" class="overlay">';
                // topicHtml += '<img class="imgSelected" src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png" /></div></div></div>';
                $('#imageDiv').append(topicHtml);
            }
        }
    }
});

function toggleLoginModal() {
    $('#login-modal-header').html($('#login-msg-hdr').html());
    $('#login-modal-body').html($('#login-msg-body').html());
    $('#loginModal').modal('toggle');
}


$(document).on('click', '.follow-btn', function () {
    //$(this.id).
    var id = this.id;
    if ($('#' + id).text() == 'Follow') {
        $('#' + id).html('Following');
        $('#' + id).addClass("btn-success");
        followOrFollowing(id, 'Follow');
    } else {
        $('#' + id).html('Follow');
        followOrFollowing(id, 'UnFollow');
        $('#' + id).removeClass("btn-success");
    }
    // console.log(text);
    // $this.toggleClass('SeeMore2');

});
$(document).on('click', '.overlay', function () {
    // alert("hey there !");
    var id = this.id;
    $('#' + id).toggleClass('opaque');
    if ($('#' + id).hasClass('opaque')) {
        console.log('its checked');
        followTopic(id, "follow");
    } else {
        console.log('its unchecked')
        followTopic(id, "unfollow");
    }
    // alert(id)

});

function followTopic(id, status) {
    var input = { "uid": id, "action": status };
    console.log(JSON.stringify(input))
    /*  $.ajax({
         type: "POST",
         url: "/webservices/PodcastService.asmx/CreateMarkers",
         // The key needs to match your method's input parameter (case-sensitive).
         data: JSON.stringify(input),
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data) { alert(data); },
         failure: function (errMsg) {
             alert(errMsg);
         }
     }); */
}

function followOrFollowing(id, status) {
    var input = { "uid": id, "action": status };
    console.log(JSON.stringify(input))
    /*  $.ajax({
         type: "POST",
         url: "/webservices/PodcastService.asmx/CreateMarkers",
         // The key needs to match your method's input parameter (case-sensitive).
         data: JSON.stringify(input),
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data) { alert(data); },
         failure: function (errMsg) {
             alert(errMsg);
         }
     }); */
}


$(document).on('click', '#topicSubmit', function () {
    // $('#userModal').modal('show');
    $('#userModal').modal({
        backdrop: 'static',
        keyboard: false
    });
})
$(document).on('click', '#userSubmit', function () {
    // $('#dynamicModal').modal('show');
    $('#dynamicModal').modal({
        backdrop: 'static',
        keyboard: false
    });
})

