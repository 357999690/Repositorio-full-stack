import React from "react";
import Header from "./Header";
import Content from "./Content";
import TotalOfExercises from "./TotalOfExercises";

const Course = ({course}) => {
    return(
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <TotalOfExercises course={course.parts}/>
        </div>
    )
}

export default Course