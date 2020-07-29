define(['jquery', 'underscore', 'backbone', 'models/customer', 'collections/customer'], function ($, _, Backbone, CustomerModel, CustomerCollection) {


    var CustomerView = Backbone.View.extend({
        model: CustomerModel,
        tagName: "tr",
        template: _.template($('#customer-template').html()),
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        }
    });

    return CustomerView;
});