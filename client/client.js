Meteor.subscribe('tasks');

if (Meteor.isClient) {
  Template.tasks.waiting = function (){
	return Tasks.find({ type: 'waiting' });
  };
  
  Template.tasks.running = function(){
	return Tasks.find({ type: 'running' });
  };
  
  Template.tasks.finished = function(){
	return Tasks.find({ type: 'finished' })
  };
  
  Template.edit_form.task_types = function(){
  	return ['waiting', 'running', 'finished'];
  };
  	
  	Meteor.defer(function(){
  		if( !Meteor.user() ){
  			$('input, button, select', '#task-editor').attr('disabled', 'true')
  		}
  	})

	Template.tasks.events({
		'click .task-destroy': function(){
			$('#' + this._id).slideUp(600,function(){ $(this).remove(); });
			Tasks.remove( this._id );
		},

		'click .task-edit': function(){
			$('#task-editor input[name=id]').val( this._id );
			$('#task-editor input[name=desc]').val( this.desc );
			$('#task-editor select').val( this.type );
		},

		'click #task-editor button': function(e){
			var id = $('#task-editor input[name=id]').val(),
				desc = $('#task-editor input[name=desc]').val(),
				type = $('#task-editor select').val();

			if( !id ){
				Tasks.insert({
					owner: Meteor.userId(),
					desc: desc,
					type: type
				});
			} else {
				Tasks.update( id, { $set: { owner: Meteor.userId(), desc: desc, type: type } } );
			}
		}
	})
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
