import React from "react";
import "./App.css";

class TaskApp extends React.Component {
    //set up the app
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            content: ""
        };

        this.addTask = this.addTask.bind(this);
        this.changeText = this.changeText.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    //This is called when the app loads
    componentDidMount() {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            this.setState({ tasks: tasks });
        }
    }

    //function for adding a task
    addTask() {
        if (this.state.content.length > 0) {
            let id = Math.max(...this.state.tasks.map(task => task.id));
            this.setState({ tasks: [...this.state.tasks, { id: id > 0 ? id + 1 : 1, content: this.state.content, completed: 0 }], content: "" }, () => {
                localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
            });
        }
    }

    //function called when we type something
    changeText(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    //function called when we complete a task
    completeTask(id) {
        let newTasks = this.state.tasks.filter(task => {
            if (task.id === id) {
                task.completed = 1 - task.completed;
                return task;
            }

            return task;
        });

        this.setState({ tasks: newTasks }, () => {
            localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
        });
    }

    //function called when we delete a task
    deleteTask(id) {
        let newTasks = this.state.tasks.filter(task => {
            if (task.id !== id) {
                return task;
            } else {
                return null;
            }
        });

        this.setState({ tasks: newTasks }, () => {
            localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
        });
    }

    //show the app
    render() {
        return (
            <div className="App">
                <h2>📝 Tasks app</h2>

                <p>
                    You have{" "}
                    {
                        this.state.tasks.filter(function(task) {
                            return task.completed !== 1;
                        }).length
                    }{" "}
                    uncompleted and {this.state.tasks.length} total tasks
                </p>
                <div>
                    {this.state.tasks.map((task, index) => {
                        return (
                            <p key={task.id} className={task.completed ? "completed" : "uncompleted"}>
                                {task.content}{" "}
                                <span className="complete" onClick={() => this.completeTask(task.id)}>
                                    ✅
                                </span>{" "}
                                <span className="delete" onClick={() => this.deleteTask(task.id)}>
                                    ❌
                                </span>
                            </p>
                        );
                    })}
                </div>
                <textarea value={this.state.content} name="content" onChange={this.changeText}></textarea>
                <br />
                <button onClick={this.addTask}>Add</button>
            </div>
        );
    }
}

export default TaskApp;
