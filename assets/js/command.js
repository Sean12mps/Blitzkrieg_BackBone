

var Status          =   Backbone.Model.extend({
                                url     :   'bone/spine.php'
                        });


var Statuses        =   Backbone.Collection.extend({
                                model   :   Status
                        });


var NewStatusView   =   Backbone.View.extend({

                                events          :   {

                                                        'submit form'   :   'addStatus'
                                                    ,   'enter'         :   'addStatus'
                                }

                            ,   initialize      :   function(  ){

                                                        this.collection.on( "add", this.clearInput, this );
                                                    }

                            ,   addStatus       :   function( e ){

                                    e.preventDefault();

                                    this.collection.create( { 
                                                                text    :   this.$('#newstatus').val()
                                                            ,   message :   this.$('.alert').length
                                    } );
                                }

                            ,   clearInput      :   function(){

                                    this.$('#newstatus').val('');
                                    this.$('#newstatus').focus();
                                }

                        });




var StatusesView        =   Backbone.View.extend({
                                    initialize  :   function(  ){

                                        this.collection.on( "add", this.removeStatus, this )
                                        this.collection.on( "add", this.appendStatus, this )
                                    }

                                ,   appendStatus:   function( status ){

                                        setTimeout( function(){
                                            this.$('#statuses').append('<div class="alert alert-success">' + status.escape('text') + '</div>');
                                        },200 );
                                    }

                                ,   removeStatus:   function( status ){

                                        var count       =   status.escape('message');

                                        var alertS      =   this.$('.alert');

                                        var countKill   =   count - 3;

                                            console.log(countKill);

                                        if( countKill >= 0 ){

                                            for( var x = 0; x < countKill+1; x++ ){

                                                $(alertS[x]).hide('fast');

                                                setTimeout( function(){
                                                    $(alertS[x]).remove();
                                                },500 );
                                            };

                                        };
                                    }

                            });




$(document).ready(function() {

    $('#newstatus').keyup(function(e){

        if( e.keyCode == 13 ){
            $(this).trigger('enter');
        }
    });

    $('#newstatus').focus();


    var statuses    =   new Statuses();

    new NewStatusView( { 
                            el          :   $('#new-status')
                        ,   collection  :   statuses 
        } );

    new StatusesView( {     
                            el          :   $('#new-status')
                        ,   collection  :   statuses
        } );

});


// Handling several models