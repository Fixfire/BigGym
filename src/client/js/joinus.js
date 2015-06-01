$(document).ready(documentReady);

function documentReady(){
    $("#joinus").submit(function(event){
        alert( "Handler for .submit() called." );
        /* stop form from submitting normally */
        event.preventDefault();
        
        /* get some values from elements on the page: */
        var $form = $( this ),
        url = $form.attr( 'action' );
        
        /* Send the data using post */
        var posting = $.post( url, { appellative: $('#appellative').val(), 
                                    surname: $('#surname').val(),
                                    name: $('#name').val(),
                                    birthdate: $('#birthdate').val(),
                                    address: $('#address').val(),
                                    city: $('#city').val(),
                                    zip: $('#zip').val(),
                                    country: $('#country').val(),
                                    state: $('#state').val(),
                                    phone: $('#phone').val(),
                                    email: $('#email').val(),
                                    weight: $('#weight').val(),
                                    height: $('#height').val(),
                                    paymentType: $('#paymentType').val(),
                                    acceptance: $('#acceptance').val()
                                   });
        
    
    });
}