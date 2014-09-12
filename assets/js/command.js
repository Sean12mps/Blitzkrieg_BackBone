

var Statuses        =   function(){};

Statuses.prototype.add          =   function( options ){

                                        $.ajax({
                                                    url:        'bone/spine.php'
                                                ,   type:       'POST'
                                                ,   dataType:   'json'
                                                ,   data:   {   
                                                                text: options.text
                                                    }
                                                ,   success: options.success

                                        });
                                    };



var NewStatusView   =   function(options ){

                            var statuses    =   options.statuses;

                            $('#theForm').submit( function(e){

                                    e.preventDefault();

                                    statuses.add({
                                                    text: $('#newstatus').val()
                                                ,   success: function(data) {

                                                        /*          *\
                                                        *   CUSTOM   *
                                                        \*          */ 
                                                        var alertS      =   $('#statuses').find('.alert');

                                                        if( alertS.length == 5 ){

                                                            $(alertS[0]).hide('slow');

                                                            setTimeout( function(){
                                                                $(alertS[0]).remove();
                                                            },1000 );
                                                        }
                                                        /*          *\
                                                         *  CUSTOM  *
                                                        \*          */ 


                                                        $('#statuses').append('<div class="alert alert-success">' + data.text + '</div>');
                                                        $('#newstatus').val('');
                                                    }
                                    });
                            });
                        };



$(document).ready(function() {


    var statuses    =   new Statuses();

    new NewStatusView({ statuses: statuses });

});


// Now we only bootstrap our application when the DOM is loaded, 