import React from 'react';
import { TaskList } from '../interface/index';

const TaskListComponent: React.FC<{ taskList: TaskList }> = ({ taskList }) => {
    return (
        <div>
            <p>{taskList.description}</p>
        </div>
    );
};

export default TaskListComponent;
