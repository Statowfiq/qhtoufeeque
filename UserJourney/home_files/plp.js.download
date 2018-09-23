// all js specific to plp page

// method to get the posts data for main contents
$('body').on('click', '.post-filter-tabs', function() {
//      console.log('inside post-filter-tabs ');
var tab = $(this).data('tab');
if (! isValidUser()) {
                        return toggleLoginModal();
                } else {
         $.post("/post/get/"+tab,

                                   function(data, status){
                                        if( tab == 'latest' ) {
                                                $('#tab_latest').html(data);
                                        } else if(tab == 'unanswered' ) {
                                                $('#tab_unanswered').html(data);
                                        }
         });
}
});