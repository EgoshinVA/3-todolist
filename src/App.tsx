import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => setTasks(tasks.filter((task) => task.id !== taskId))

    const addTask = (title: string) => setTasks([{id: v1(), title: title, isDone: false}, ...tasks])

    const completeTask = (id: string) => setTasks(tasks.map(task => task.id === id ? {
        ...task,
        isDone: !task.isDone
    } : task))

    const changeFilter = (filter: FilterValuesType) => setFilter(filter)

    let tasksForTodolist = tasks

    switch (filter) {
        case "completed":
            tasksForTodolist = tasks.filter(task => task.isDone)
            break
        case "active":
            tasksForTodolist = tasks.filter(task => !task.isDone)
            break
        default:
            tasksForTodolist = tasks
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      addTask={addTask}
                      completeTask={completeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
