Tasks = new Meteor.Collection("tasks");

Tasks.allow({
	insert: function (userId, task) {
		return userId && task.userId === userId;
	},
	remove: function (userId, task) {
		return userId && task.userId === userId;
	}
});

Meteor.methods({
	"markAsDone": function (taskId) {
		var selector = {
			_id: taskId,
			userId: this.userId
		};
		var modifier = {
			$set: {
				status: "done"
			}
		};
		Tasks.update(selector, modifier);
	}
});
