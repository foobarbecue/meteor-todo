Meteor.subscribe("tasks");

Template.taskList.helpers({
	tasks: function () {
		return Tasks.find();
	}
});

Template.addTask.events({
	"click button": function () {
		Tasks.insert({
			userId: Meteor.userId(),
			name: Meteor.user().profile.name,
			description: $("input").val(),
			status: "todo"
		});
		$("input").val("");
	}
});

Template.task.events({
	"click #done": function () {
		Meteor.call("markAsDone", this._id);
	},
	"click #delete": function () {
		Tasks.remove(this._id);
	}
});

Template.task.helpers({
	done: function () {
		return this.status === "done";
	}
});

Template.login.events({
	"click a": function () {
		Meteor.loginWithTwitter();
	}
});
