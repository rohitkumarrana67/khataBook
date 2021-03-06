var CustomersView = Backbone.View.extend({
    model: CustomerModel,
    collection: customer_collection,
    template: _.template($('#main-customers-template').html()),
    events: {
        'click #create': 'createCustomer',
        'click #create-customer' : 'closemodal'
    },
    closemodal : function(){
        $("#create-customer-error").html("")
    },
    createCustomer: function (e) {
        $("#create-customer-error").html("")
        e.preventDefault()
        var customer_name = $('#name').val();
        var email = $('#email').val();
        var mobile_number = $('#mob_num').val();
        var address = $('#address').val()
        var customer = new CustomerModel({ customer_name, email, mobile_number, address });
        var self = this;
        customer.save(null, {
            url: "http://localhost:3060/users/customers",
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                self.render();
            },
            error: function (error, response) {
                var error = getUIMessage( response.responseJSON.messages)
                var view = new ErrorView({model: error })
                self.$el.find("#create-customer-error").html(view.render().$el)
            }
        })
    },

    render: function () {
        this.$el.html(this.template());
        var $customers_list = $('.customers-list');

        this.collection.fetch({
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                response.each(customer => {
                    $customers_list.append((new CustomerView({ model: customer })).render().$el);
                });

            },
            error: function (err) {
                console.log(err);
            }
        });
    }

});

