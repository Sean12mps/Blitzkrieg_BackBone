
var events = _.clone(Backbone.Events);

var Status                          =   Backbone.Model.extend({
                                            url     :   'bone/spine.php'
                                        });

var Statuses                        =   function(){};

Statuses.prototype.add              =   function( text ){

                                            var status  =   new Status();

                                            status.save({ text:text }, { 
                                                            success   :   function( model,  data ){

                                                                events.trigger('status:add', data.text);
                                                            }
                                            });
                                        };




var NewStatusView                   =   Backbone.View.extend({

                                                initialize      :   function( options ){

                                                                        this.statuses   =   options.statuses;

                                                                        events.on('status:add', this.clearInput, this);

                                                                        var add         =   $.proxy(this.addStatus, this);

                                                                        this.$('#theForm').submit(add);

                                                                    }

                                            ,   addStatus       :   function( e ){

                                                    e.preventDefault();

                                                    this.statuses.add( this.$('textarea').val() );
                                                }

                                            ,   clearInput      :   function(){

                                                    this.$('textarea').val('');
                                                    this.$('textarea').focus();
                                                }

                                        });




var StatusesView                    =   Backbone.View.extend({
                                                initialize  :   function( options ){

                                                    events.on('status:add', this.appendStatus, this)
                                                    events.on('status:add', this.removeStatus, this)
                                                }

                                            ,   appendStatus:   function( text ){

                                                    this.$('#statuses').append('<div class="alert alert-success">' + text + '</div>');
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
                        ,   statuses    :   statuses 
        } );

    new StatusesView( {     
                            el          :   $('#new-status')  
        } );

});


// Handling several models