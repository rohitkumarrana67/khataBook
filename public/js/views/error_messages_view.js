var ErrorView = Backbone.View.extend({
    className:'text-danger',
    initialize: function(data){
        this.template = _.template($("#errors-template").html())
    },
    render:function(){
        this.$el.html(this.template(this.model))
        return this
    }
})