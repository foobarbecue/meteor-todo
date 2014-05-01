Meteor.subscribe("tasks");

Template.taskList.helpers({
	tasks: function () {
		return Tasks.find();
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

Template.login.events({
	"click a": function () {
		Meteor.loginWithGithub();
	}
});

Template.task.helpers({
	done: function () {
		return this.status === "done";
	},
	ownsTask: function () {
		return this.userId === Meteor.userId();
	}
});

Template.addTask.events({
	"click button": function () {
		var task = {};
		task.userId = Meteor.userId();
		task.name = Meteor.user().profile.name;
		task.description = $("input").val();
		task.status = "todo";
		Tasks.insert(task);
		$("input").val("");
	}
});
