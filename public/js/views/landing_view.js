
var router = new AppRouter();
var LandingView = Backbone.View.extend({

    events: {
        'click': 'onClick',
    },
    onClick: function (e) {
        var $li = $(e.target);
        router.navigate($li.attr("data-url"), { trigger: true });
    },
    initialize: function () {
        this.template = _.template($('#home-template').html())
        this.render()
    },
    render: function(){
        this.$el.parent().parent().find('#content').html(this.template())
    }

});


