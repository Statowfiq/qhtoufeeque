$(document).ready(function () {    

});



// Add more option textbox
var counter = 3;
    $(document).on('click', '#addOption', function () {
    
    if (counter > 4) {
        //alert("Only 2 textboxes allow");
        return false;
    }
    var moreOptiondiv = $(document.createElement('div'))
        .attr("class", 'form-group');

    moreOptiondiv.after().html('<input type="text" id="option' + counter + '" class="form-control" value="" placeholder="Enter the option" >');


    moreOptiondiv.appendTo("#moreOption");


    counter++;

});

function validate() {
    var quizName = $('#quizName').val();
    var question = $('#question').val();
    var input1 = $('#option1').val();
    var input2 = $('#option2').val();
    var input3 = $('#option3').val();
    var input4 = $('#option4').val();
    var description = $('#ansDescription').val();

    if (question == "" && input1 == "" && input2 == "") {
        alert("All the fields are mandatory.");
        return false;
    }
    if(quizName == ""){
        alert("Quiz name cannot be empty");
        return false;
    }
    if (question == "" ) {
        alert("Question cannot be empty");
        return false;
    }
    if (input1 == "" ) {
        alert("Answer cannot be empty");
        return false;
    }
    if (input2 == "" ) {
        alert("option cannot be empty");
        return false;
    }
    if (input3 == "" ) {
        alert("option cannot be empty");
        return false;
    }
    if (input4 == "" ) {
        alert("option cannot be empty");
        return false;
    }
    return true;
}

$(document).on('click', '#submitQuestion', function () {

    var donateQuestionReq;
    var validateinput =  validate();
    if(validateinput)
    {
    var quizName = $('#quizName').val();
    var question = $('#question').val();
    var input1 = $('#option1').val();
    var input2 = $('#option2').val();
    var input3 = $('#option3').val();
    var input4 = $('#option4').val();
    donateQuestionReq = {
        "title": question,
        "option": [input1, input2, input3, input4],
        "quizname": quizName
    }
        //console.log(JSON.stringify(donateQuestionReq));
        donateQuestion(donateQuestionReq);
        $('#donateQuesModal').modal('hide');
    }
    
    
    
});


function donateQuestion(donateQuestionReq) {
    console.log(JSON.stringify(donateQuestionReq));
    $('#thanks').modal('show'); //need to remove this line
     /*  $.ajax({
         type: "POST",
         url: "/webservices/PodcastService.asmx/CreateMarkers",
         // The key needs to match your method's input parameter (case-sensitive).
         data: JSON.stringify(donateQuestionReq),
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data) { 
             alert(data); 
            $('#thanks').modal('show');
            },
         failure: function (errMsg) {
             alert(errMsg);
         }
     }); */
}
