import React from "react";

const TotalOfExercises = ({course}) => {
    const exercises = []
    course.forEach((part) => exercises.push(part.exercises))
    const total = exercises.reduce((a,b) => a + b)

    return(
        <>
        <p>Total of {total} exercises</p>
        </>
    )
    
}

export default TotalOfExercises