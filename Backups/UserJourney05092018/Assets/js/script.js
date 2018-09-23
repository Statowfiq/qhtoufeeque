$(window).on('load', function () {
    if ($("body").attr("data-newUser") == 'true') {
        $('#myTopics').modal('show');
    }
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
                htmlData = ' <div><img src="' + userResponse.data[i].profileUrl + '" alt="Avatar" style="width:30px" class="displayInline">';
                htmlData += '<h4 class="displayInline secondaryColor pl-1">' + userResponse.data[i].firstName + '</h4>';
                htmlData += '<button id="' + userResponse.data[i].uid + '" type="button" class="btn btn-default displayInline pull-right follow-btn">Follow</button></div>';
                $('#modalBody').append(htmlData);
            }
        }
    });

    var topicResponse = {
        "status": "success",
        "data": [
            { "id": "1211", "name": "topic1", "profileUrl": "https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png" },
            { "id": "1213", "name": "topic2", "profileUrl": "https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png" }
        ]

    };

    var topicHtml = null;
    if (topicResponse) {
        if (topicResponse.status == "success") {
            for (var i = 0; i < topicResponse.data.length; i++) {
                topicHtml = '<div class="col-md-3 commonPadding imageButton">';
                topicHtml += '<div id="imageContainer" class="imageStyle">';
                topicHtml += '<p class="text-light"> ' + topicResponse.data[i].name + '</p>';
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


$(document).on('click', '#topicSubmit,#skipTopicModal', function () {
    $('#userModal').modal('show');
})

