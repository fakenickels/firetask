Tasks = new Meteor.Collection('tasks');

Tasks.allow({
	insert: function(userID, task){
		return userID && task.owner == userID;
	},

	update: function(userID, task){
		if( task.owner != userID ) return false;
		else if( task.owner == userID ) return true;
	},

	remove: function( userID, task ){
		if( task.owner != userID ) return false;
		else if( task.owner == userID ) return true;
	}
})