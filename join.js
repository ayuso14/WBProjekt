// POST Request

var $ime = $('#ime');
var $pass = $('#pass');



$('#signtobtn').on('click', function(){

var inpt = {
    ime: $ime.val(),
    pass: $pass.val,
}; 
$.ajax({
    type: 'POST',
    url: '#',
    data: inpt,
    success: function(newInpt) {
        $inpts.append('USPJEH');
     },
     error: function() {
         alert('error');
     }
})

});
