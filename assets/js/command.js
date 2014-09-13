

var Status                          =   Backbone.Model.extend({
                                            url     :   'bone/spine.php'
                                        });


var Statuses                        =   Backbone.Collection.extend({
                                            // add     :   function( text ){
                                                            
                                            //                 var that    =   this;
                                            //                 var status  =   new Status;

                                            //                 status.save({ text:text }, {
                                            //                     success     :   function( model , data ){
                                            //                                         that.trigger("add", data.text);
                                            //                                     }
                                            //                 });
                                            //             }
                                            model   :   Status
                                        });





var NewStatusView                   =   Backbone.View.extend({

                                                events          :   {

                                                                        'submit form'   :   'addStatus'
                                                }

                                            ,   initialize      :   function(  ){

                                                                        this.collection.on( "add", this.clearInput, this );

                                                                        // var add         =   $.proxy(this.addStatus, this);

                                                                        // this.$('#theForm').submit(add);
                                                                    }

                                            ,   addStatus       :   function( e ){

                                                    e.preventDefault();

                                                    this.collection.create( { text: this.$('textarea').val() } );
                                                }

                                            ,   clearInput      :   function(){

                                                    this.$('textarea').val('');
                                                    this.$('textarea').focus();
                                                }

                                        });




var StatusesView                    =   Backbone.View.extend({
                                                initialize  :   function(  ){

                                                    this.collection.on( "add", this.appendStatus, this )
                                                    this.collection.on( "add", this.removeStatus, this )
                                                }

                                            ,   appendStatus:   function( status ){

                                                    this.$('#statuses').append('<div class="alert alert-success">' + status.escape('text') + '</div>');
                                                }

                                            ,   removeStatus:   function(){

                                                    var alertS      =   this.$('.alert');

                                                    if( alertS.length > 3 ){

                                                        $(alertS[0]).hide('fast');

                                                        setTimeout( function(){
                                                            $(alertS[0]).remove();
                                                        },500 );
                                                    }
                                                }

                                        });




$(document).ready(function() {


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