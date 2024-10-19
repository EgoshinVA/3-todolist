import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {useRef, useState} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const onAddTaskCLickHandler = () => {
        if (inputRef.current) {
            addTask(inputRef.current.value)
			inputRef.current.value = ''
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={inputRef} onKeyUp={event => event.key === 'Enter' && onAddTaskCLickHandler()}/>
                <Button onClick={onAddTaskCLickHandler} title={'+'}/>
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={() => removeTask(task.id)}/>
                                </li>
                            )
                        })}
                    </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}
